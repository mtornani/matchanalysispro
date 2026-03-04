let currentChart = null;
let activeDomain = "macro"; // "macro" or "sports"

function rgba(hex, alpha) {
    let c = hex.substring(1).split('');
    if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
}

function updateTheme() {
    const domainData = ASSET_DATA[activeDomain];
    const baseColor = domainData.color;
    const lightColor = rgba(baseColor, 0.15); // Used for gradients, backgrounds, lines

    document.body.style.setProperty('--theme-color', baseColor);
    document.body.style.setProperty('--theme-color-light', lightColor);

    // Update static labels based on domain
    document.getElementById('lbl-metric-primary').textContent = domainData.metrics.primary + ":";
    document.getElementById('lbl-metric-secondary').textContent = domainData.metrics.secondary + ":";
    document.getElementById('lbl-metric-context').textContent = domainData.metrics.context + ":";

    // Update badge / status text
    document.getElementById('domain-badge').textContent = domainData.domainLabel;

    const sysStatus = document.getElementById('system-status');
    if (activeDomain === 'macro') {
        sysStatus.textContent = "System Live: Scanning Global Nodes";
    } else {
        sysStatus.textContent = "System Live: Scanning Sports Assets";
    }

    populateSelector();
}

function populateSelector() {
    const selector = document.getElementById('entity-selector');
    selector.innerHTML = ""; // Clear existing

    const items = ASSET_DATA[activeDomain].items;

    // Sort by Asymmetry Score (desc)
    const sortedItems = [...items].sort((a, b) => b.asymmetryScore - a.asymmetryScore);

    sortedItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = `[Score: ${item.asymmetryScore}] ${item.name}`;
        selector.appendChild(option);
    });

    if (sortedItems.length > 0) {
        updateUI(sortedItems[0].id);
    }
}

function updateUI(entityId) {
    const items = ASSET_DATA[activeDomain].items;
    const entity = items.find(p => p.id === entityId);
    if (!entity) return;

    // Headings
    document.getElementById('display-name').textContent = entity.name;
    document.getElementById('display-entityGroup').textContent = entity.entityGroup;
    document.getElementById('display-scale').textContent = entity.scale;
    document.getElementById('display-region').textContent = entity.region;

    // Score Animation
    animateScore(entity.asymmetryScore);

    // Status Badge
    const statusEl = document.getElementById('display-status');
    statusEl.textContent = entity.status;
    statusEl.className = `px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider`;

    if (entity.status === 'GHOST') {
        statusEl.classList.add('bg-purple-600', 'text-white');
    } else if (entity.status === 'TRACKING') {
        statusEl.classList.add('bg-yellow-500', 'text-black');
    } else if (entity.status === 'CONFIRMED') {
        statusEl.classList.add('bg-sys-border-high', 'text-white');
    } else {
        statusEl.classList.add('bg-gray-600', 'text-white');
    }

    // Metrics
    document.getElementById('metric-primary').textContent = entity.metrics.primary;
    document.getElementById('metric-secondary').textContent = entity.metrics.secondary;
    document.getElementById('metric-context').textContent = entity.metrics.context;

    // Valuation
    document.getElementById('val-institutional').textContent = `${entity.valuation.institutional} ${entity.valuation.unit}`;
    document.getElementById('val-real').textContent = `${entity.valuation.real} ${entity.valuation.unit}`;

    // Validation
    document.getElementById('display-validation').textContent = entity.validation;

    // Render Chart
    renderAsymmetryChart(entity);

    // Cross-Domain Proof
    updateCrossDomainAnalog(entity);
}

function updateCrossDomainAnalog(entity) {
    const oppDomain = activeDomain === 'macro' ? 'sports' : 'macro';
    const oppItems = ASSET_DATA[oppDomain].items;

    // Find closest score
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

    // Quick flash effect
    const card = document.getElementById('cross-domain-card');
    if (card) {
        card.style.borderColor = 'white';
        setTimeout(() => { card.style.borderColor = ''; }, 300);
    }
}

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

let feedInterval = null;
let feedIndex = 0;

function initSignalFeed() {
    const feedContainer = document.getElementById('signal-feed');
    if (!feedContainer || typeof SIGNAL_FEED_MESSAGES === 'undefined') return;

    if (feedInterval) clearInterval(feedInterval);
    feedContainer.innerHTML = '';
    feedIndex = 0;

    const colors = ["#00ff41", "#3b82f6"]; // Alternate conceptually

    feedInterval = setInterval(() => {
        const msg = SIGNAL_FEED_MESSAGES[feedIndex];
        const div = document.createElement('div');
        div.className = 'feed-msg';

        const time = new Date().toISOString().substring(11, 19);
        const col = (feedIndex % 2 === 0) ? colors[0] : colors[1];

        div.innerHTML = `<span class="text-sys-muted">[${time}]</span> <span style="color:${col};" class="font-bold">${msg.type}</span> <span class="text-sys-muted">//</span> <span class="text-gray-300">${msg.text}</span>`;

        feedContainer.appendChild(div);

        // Auto scroll
        feedContainer.scrollTop = feedContainer.scrollHeight;

        feedIndex = (feedIndex + 1) % SIGNAL_FEED_MESSAGES.length;

        if (feedContainer.children.length > 30) {
            feedContainer.removeChild(feedContainer.firstChild);
        }
    }, 2500);
}

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
                    label: 'True Output (Signal)',
                    data: performanceData,
                    borderColor: themeColor,
                    backgroundColor: themeLight,
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: themeColor,
                    pointBorderColor: '#0a0a0a',
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'Market Pricing Latency',
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
                legend: { display: false }, // Handled via HTML
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
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += context.parsed.y;
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100, // Normalized 0-100 scale for visual simplicity
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

function init() {
    const selector = document.getElementById('entity-selector');
    const toggle = document.getElementById('domain-toggle');

    // Default state: Macro/Checked
    toggle.checked = true;
    activeDomain = "macro";
    updateTheme();

    toggle.addEventListener('change', (e) => {
        activeDomain = e.target.checked ? "macro" : "sports";
        updateTheme();
    });

    selector.addEventListener('change', (e) => {
        updateUI(e.target.value);
    });

    initSignalFeed();
}

document.addEventListener('DOMContentLoaded', init);
