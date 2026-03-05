// ============================================================
// THESEUS PROTOCOL — Scanner Logic (v3.0)
// Reads ASSET_DATA + SYSTEM_META from data.js
// ============================================================

let currentChart = null;
let activeDomain = "sports"; // Default: sports (for Marcolini demo)

function rgba(hex, alpha) {
    let c = hex.substring(1).split('');
    if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
}

// ── SYSTEM META ──────────────────────────────────────────────
function updateSystemMeta() {
    if (typeof SYSTEM_META === 'undefined') return;
    const m = SYSTEM_META;
    const el = (id) => document.getElementById(id);
    if (el('meta-last-scan')) el('meta-last-scan').textContent = m.lastScanLabel;
    if (el('meta-assets')) el('meta-assets').textContent = m.assetsMonitored;
    if (el('meta-anomalies')) el('meta-anomalies').textContent = m.anomaliesActive;
    if (el('meta-tracked')) el('meta-tracked').textContent = m.tracked;
    if (el('meta-confirmed')) el('meta-confirmed').textContent = m.confirmed;
    if (el('meta-hitrate')) el('meta-hitrate').textContent = m.hitRate;
}

// ── THEME ────────────────────────────────────────────────────
function updateTheme() {
    const domainData = ASSET_DATA[activeDomain];
    const baseColor = domainData.color;
    const lightColor = rgba(baseColor, 0.15);

    document.body.style.setProperty('--theme-color', baseColor);
    document.body.style.setProperty('--theme-color-light', lightColor);

    // Update labels
    document.getElementById('lbl-metric-primary').textContent = domainData.metrics.primary + ":";
    document.getElementById('lbl-metric-secondary').textContent = domainData.metrics.secondary + ":";
    document.getElementById('lbl-metric-context').textContent = domainData.metrics.context + ":";

    // Update badge
    document.getElementById('domain-badge').textContent = domainData.domainLabel;

    const sysStatus = document.getElementById('system-status');
    if (activeDomain === 'macro') {
        sysStatus.textContent = "System Live: Scanning Global Nodes";
    } else {
        sysStatus.textContent = "System Live: Scanning Sports Assets";
    }

    populateSelector();
}

// ── SELECTOR ─────────────────────────────────────────────────
function populateSelector() {
    const selector = document.getElementById('entity-selector');
    selector.innerHTML = "";

    const items = ASSET_DATA[activeDomain].items;
    const sortedItems = [...items].sort((a, b) => b.asymmetryScore - a.asymmetryScore);

    sortedItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        const statusTag = item.status === 'GHOST' ? ' [GHOST]' : item.status === 'CONFIRMED' ? ' [CONFIRMED]' : '';
        option.textContent = `[${item.asymmetryScore}] ${item.name}${statusTag}`;
        selector.appendChild(option);
    });

    if (sortedItems.length > 0) {
        updateUI(sortedItems[0].id);
    }
}

// ── MAIN UI UPDATE ───────────────────────────────────────────
function updateUI(entityId) {
    const items = ASSET_DATA[activeDomain].items;
    const entity = items.find(p => p.id === entityId);
    if (!entity) return;

    // Headings
    document.getElementById('display-name').textContent = entity.name;
    document.getElementById('display-entityGroup').textContent = entity.entityGroup;
    document.getElementById('display-scale').textContent = entity.scale;
    document.getElementById('display-region').textContent = entity.region;

    // Detection date
    const detectedEl = document.getElementById('display-detected');
    if (detectedEl && entity.detectedAt) {
        detectedEl.textContent = "Detected: " + entity.detectedAt;
        detectedEl.classList.remove('hidden');
    } else if (detectedEl) {
        detectedEl.classList.add('hidden');
    }

    // Score Animation
    animateScore(entity.asymmetryScore);

    // Status Badge
    const statusEl = document.getElementById('display-status');
    statusEl.textContent = entity.status;
    statusEl.className = 'px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider';

    if (entity.status === 'GHOST') {
        statusEl.classList.add('bg-purple-600', 'text-white');
    } else if (entity.status === 'TRACKING' || entity.status === 'MONITORING') {
        statusEl.classList.add('bg-yellow-500', 'text-black');
    } else if (entity.status === 'CONFIRMED' || entity.status === 'COMPLETED') {
        statusEl.classList.add('bg-green-600', 'text-white');
    } else {
        statusEl.classList.add('bg-gray-600', 'text-white');
    }

    // Wearable Badge
    const wearableEl = document.getElementById('wearable-badge');
    if (wearableEl) {
        if (entity.needsWearable) {
            wearableEl.classList.remove('hidden');
            wearableEl.textContent = "VALIDATION: PENDING WEARABLE DATA";
        } else {
            wearableEl.classList.add('hidden');
        }
    }

    // Metrics
    document.getElementById('metric-primary').textContent = entity.metrics.primary;
    document.getElementById('metric-secondary').textContent = entity.metrics.secondary;
    document.getElementById('metric-context').textContent = entity.metrics.context;

    // Valuation — handle "?" for unknown real values
    document.getElementById('val-institutional').textContent =
        `${entity.valuation.institutional} ${entity.valuation.unit}`;

    const realVal = entity.valuation.real;
    const realEl = document.getElementById('val-real');
    if (realVal === "?" || realVal === null || realVal === undefined) {
        realEl.textContent = "SIGNAL: UNDERPRICED";
        realEl.style.fontSize = "1rem"; // smaller for text
    } else {
        realEl.textContent = `${realVal} ${entity.valuation.unit}`;
        realEl.style.fontSize = ""; // reset to default (text-2xl from class)
    }

    // Validation text
    document.getElementById('display-validation').textContent = entity.validation;

    // Dynamic progress bars
    updateProgressBars(entity);

    // Chart
    renderAsymmetryChart(entity);

    // Cross-Domain Proof
    updateCrossDomainAnalog(entity);
}

// ── PROGRESS BARS ────────────────────────────────────────────
function updateProgressBars(entity) {
    const barSignal = document.getElementById('bar-signal');
    const barMarket = document.getElementById('bar-market');
    if (!barSignal || !barMarket) return;

    // Signal bar = asymmetry score (how strong the signal is)
    barSignal.style.width = entity.asymmetryScore + '%';

    // Market bar = inverse of asymmetry (how much the market has priced in)
    // CONFIRMED with low score = market caught up. GHOST = market at 0.
    let marketCoverage = 100 - entity.asymmetryScore;
    if (entity.status === 'GHOST') marketCoverage = 2;
    if (entity.status === 'CONFIRMED' && entity.asymmetryScore < 50) marketCoverage = 90;
    barMarket.style.width = Math.max(2, marketCoverage) + '%';
}

// ── CROSS-DOMAIN ANALOG ─────────────────────────────────────
function updateCrossDomainAnalog(entity) {
    const oppDomain = activeDomain === 'macro' ? 'sports' : 'macro';
    const oppItems = ASSET_DATA[oppDomain].items;

    let closest = oppItems[0];
    let minDiff = 999;
    oppItems.forEach(item => {
        let diff = Math.abs(item.asymmetryScore - entity.asymmetryScore);
        if (diff < minDiff) {
            minDiff = diff;
            closest = item;
        }
    });

    document.getElementById('analog-name').textContent = `${closest.name} (${closest.entityGroup})`;
    document.getElementById('analog-score').textContent = closest.asymmetryScore;

    let reason = "Institutional latency: identical dynamic.";
    if (activeDomain === 'macro') {
        reason = `Identical latency dynamic found in ${closest.region} sports asset scouting.`;
    } else {
        reason = `Identical pattern found in ${closest.region} ${closest.entityGroup}.`;
    }
    document.getElementById('analog-expl').textContent = reason;

    const card = document.getElementById('cross-domain-card');
    if (card) {
        card.style.borderColor = 'white';
        setTimeout(() => { card.style.borderColor = ''; }, 300);
    }
}

// ── SCORE ANIMATION ──────────────────────────────────────────
function animateScore(targetScore) {
    const el = document.getElementById('display-score');
    let iterations = 0;
    const interval = setInterval(() => {
        if (iterations > 15) {
            clearInterval(interval);
            el.textContent = targetScore;
        } else {
            el.textContent = Math.floor(Math.random() * 100);
            iterations++;
        }
    }, 25);
}

// ── SIGNAL FEED ──────────────────────────────────────────────
let feedInterval = null;
let feedIndex = 0;

function initSignalFeed() {
    const feedContainer = document.getElementById('signal-feed');
    if (!feedContainer || typeof SIGNAL_FEED_MESSAGES === 'undefined') return;

    if (feedInterval) clearInterval(feedInterval);
    feedContainer.innerHTML = '';
    feedIndex = 0;

    feedInterval = setInterval(() => {
        const msg = SIGNAL_FEED_MESSAGES[feedIndex];
        const div = document.createElement('div');
        div.className = 'feed-msg';

        const time = new Date().toISOString().substring(11, 19);

        // Color by step type
        let col = '#00ff41'; // default green
        if (msg.type === 'SCRAPE') col = '#64748b';
        else if (msg.type === 'ANALYZE') col = '#3b82f6';
        else if (msg.type === 'DETECT') col = '#fbbf24';
        else if (msg.type === 'REPORT') col = '#00ff41';
        else if (msg.type === 'VALIDATE') col = '#a855f7';
        else if (msg.type === 'CALIBRATE') col = '#64748b';

        div.innerHTML = `<span class="text-sys-muted">[${time}]</span> <span style="color:${col};" class="font-bold">${msg.type.padEnd(9)}</span> <span class="text-sys-muted">//</span> <span class="text-gray-300">${msg.text}</span>`;

        feedContainer.appendChild(div);
        feedContainer.scrollTop = feedContainer.scrollHeight;

        feedIndex = (feedIndex + 1) % SIGNAL_FEED_MESSAGES.length;

        if (feedContainer.children.length > 30) {
            feedContainer.removeChild(feedContainer.firstChild);
        }
    }, 2500);
}

// ── CHART ────────────────────────────────────────────────────
function renderAsymmetryChart(entity) {
    const ctx = document.getElementById('asymmetryChart').getContext('2d');

    if (currentChart) {
        currentChart.destroy();
    }

    const domainData = ASSET_DATA[activeDomain];
    const themeColor = domainData.color;
    const themeLight = rgba(themeColor, 0.1);

    const performanceData = entity.trajectory.performance;
    const marketData = entity.trajectory.market;
    const labels = entity.trajectory.labels;

    currentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'OB1 Signal Score',
                    data: performanceData,
                    borderColor: themeColor,
                    backgroundColor: themeLight,
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: themeColor,
                    pointBorderColor: '#0a0a0a',
                    pointRadius: 5,
                    pointHoverRadius: 7
                },
                {
                    label: 'Market Pricing',
                    data: marketData,
                    borderColor: '#64748b',
                    borderDash: [5, 5],
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    tension: 0.1,
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#111',
                    titleColor: themeColor,
                    bodyColor: '#e2e8f0',
                    borderColor: '#333',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 4,
                    displayColors: false,
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) label += ': ';
                            if (context.parsed.y !== null) label += context.parsed.y;
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: '#222' },
                    ticks: {
                        color: '#64748b',
                        font: { family: 'SF Mono, monospace', size: 10 },
                        callback: function (value) { return value; }
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        color: '#64748b',
                        font: { family: 'SF Mono, monospace', size: 10 }
                    }
                }
            }
        }
    });

    // Asymmetry window indicator
    const lastPerf = performanceData[performanceData.length - 1];
    const lastMarket = marketData[marketData.length - 1];
    const windowEl = document.getElementById('asymmetry-window-indicator');

    if (windowEl) {
        if (lastPerf > lastMarket + 15) {
            windowEl.classList.remove('hidden');
            windowEl.textContent = `ASYMMETRY: ${Math.round(lastPerf - lastMarket)} PTS DELTA`;
        } else {
            windowEl.classList.add('hidden');
        }
    }
}

// ── K-SPORT TOGGLE ───────────────────────────────────────────
function initKSportToggle() {
    const toggle = document.getElementById('ksport-toggle');
    const content = document.getElementById('ksport-content');
    const chevron = document.getElementById('ksport-chevron');
    if (!toggle || !content || !chevron) return;

    // Desktop: expanded by default | Mobile: collapsed
    if (window.innerWidth >= 768) {
        content.classList.remove('hidden');
        chevron.style.transform = 'rotate(180deg)';
    }

    toggle.addEventListener('click', () => {
        const isHidden = content.classList.contains('hidden');
        if (isHidden) {
            content.classList.remove('hidden');
            chevron.style.transform = 'rotate(180deg)';
        } else {
            content.classList.add('hidden');
            chevron.style.transform = 'rotate(0deg)';
        }
    });
}

// ── INIT ─────────────────────────────────────────────────────
function init() {
    const selector = document.getElementById('entity-selector');
    const toggle = document.getElementById('domain-toggle');

    // Default: Sports (unchecked)
    toggle.checked = false;
    activeDomain = "sports";

    // Populate system meta bar
    updateSystemMeta();

    // Render initial state
    updateTheme();

    // Toggle listener (hidden but functional)
    toggle.addEventListener('change', (e) => {
        activeDomain = e.target.checked ? "macro" : "sports";
        updateTheme();
    });

    selector.addEventListener('change', (e) => {
        updateUI(e.target.value);
    });

    initSignalFeed();
    initKSportToggle();
}

document.addEventListener('DOMContentLoaded', init);
