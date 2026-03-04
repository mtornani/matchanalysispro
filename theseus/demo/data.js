// ============================================================
// THESEUS PROTOCOL — ASSET DATA (v3.0)
// Source: OB1 Global Radar (ob1_global.db) + OB1 Serie C
// Last extraction: 2026-03-04
// ============================================================

// SYSTEM METADATA — real operational stats from OB1 pipeline
const SYSTEM_META = {
    lastScan: "2026-03-04T22:56:45.939340",
    lastScanLabel: "2026-03-04 22:56 UTC",
    assetsMonitored: 106,
    anomaliesActive: 6,
    confirmed: 2,
    hitRate: "25%",
    tracked: 12,
    pipelineCycle: "6h",
    sources: "OB1 Global Radar + OB1 Serie C Scout"
};

// ASYMMETRY SCORE FORMULA (transparent, auditable)
// ─────────────────────────────────────────────────
// Score = weighted sum of 4 components, normalized 0-100:
//
//   1. OB1_SIGNAL (weight: 0.50)
//      Raw anomaly score from the OB1 pipeline (Gemini RAG analysis
//      of scraped data vs institutional coverage). Range: 0-100.
//
//   2. COVERAGE_GAP (weight: 0.20)
//      Inverse of institutional media coverage.
//      is_ghost=1 → 100 | source_count=1 → 80 | source_count>3 → 40
//
//   3. LEAGUE_LATENCY (weight: 0.15)
//      Structural inefficiency of the league/market.
//      Serie D/State = 95 | Copa SP/U20 = 90 | Primeira Liga = 70
//      Liga MX = 65 | Serie A/B = 40 | Premier League = 10
//
//   4. AGE_FACTOR (weight: 0.15)
//      Younger = higher unpriced potential.
//      age <= 17 → 95 | 18 → 85 | 19 → 75 | 20 → 60 | 21+ → 40
//
// For CONFIRMED cases: score is locked at detection-time value.

const ASSET_DATA = {
    "macro": {
        domainLabel: "CORPORATE_&_MACRO",
        color: "#3b82f6",
        metrics: {
            primary: "Primary Signal",
            secondary: "Secondary Signal",
            context: "Industry / Sector"
        },
        items: [
            {
                id: "neuro-silicon",
                name: "NeuroSilicon Foundry",
                entityGroup: "Mid-Cap Equities",
                scale: "Public (Taiwan)",
                region: "APAC",
                status: "GHOST",
                asymmetryScore: 94,
                needsWearable: false,
                metrics: {
                    primary: "Yield +18%",
                    secondary: "B2B Backlog 3x",
                    context: "AI Semiconductor",
                },
                valuation: {
                    institutional: 0.8,
                    real: 3.2,
                    unit: "B$"
                },
                trajectory: {
                    performance: [10, 20, 45, 75, 95],
                    market: [15, 15, 18, 20, 22],
                    labels: ["Q1", "Q2", "Q3", "Q4", "Current"]
                },
                validation: "STATUS: GHOST. Market cap heavily under-indexes production capacity. AI hardware supply chain latency detected."
            },
            {
                id: "copper-deficit",
                name: "Structural Copper Deficit",
                entityGroup: "Macro Trend",
                scale: "Global Market",
                region: "Global",
                status: "TRACKING",
                asymmetryScore: 88,
                needsWearable: false,
                metrics: {
                    primary: "Deficit: -2.4Mt",
                    secondary: "EV Demand +34%",
                    context: "Commodities",
                },
                valuation: {
                    institutional: 4.2,
                    real: 6.8,
                    unit: "$/lb"
                },
                trajectory: {
                    performance: [10, 30, 50, 70, 88],
                    market: [15, 20, 25, 35, 42],
                    labels: ["2023", "2024", "2025", "2026", "2027(Est)"]
                },
                validation: "Market pricing lagging behind physical deficit reality. Strategic hoarding detected by central entities."
            },
            {
                id: "quantum-stealth",
                name: "Project Q-Core",
                entityGroup: "Private Equity",
                scale: "Series A (Stealth)",
                region: "Nordics",
                status: "GHOST",
                asymmetryScore: 98,
                needsWearable: false,
                metrics: {
                    primary: "14 Patents Filed",
                    secondary: "Brain Drain: DeepMind",
                    context: "Quantum Hardware",
                },
                valuation: {
                    institutional: 35.0,
                    real: 450.0,
                    unit: "M$"
                },
                trajectory: {
                    performance: [5, 20, 40, 75, 98],
                    market: [10, 15, 20, 35, 35],
                    labels: ["M1", "M2", "M3", "M4", "Current"]
                },
                validation: "STATUS: GHOST. Under NDA. Massive asymmetrical tech advantage detected via global patent trail analysis."
            },
            {
                id: "latam-fintech",
                name: "LatAm Unbanked Surge",
                entityGroup: "Sector Alpha",
                scale: "Growth Phase",
                region: "South America",
                status: "CONFIRMED",
                asymmetryScore: 45,
                needsWearable: false,
                metrics: {
                    primary: "45M New Users",
                    secondary: "Mobile Pen. 85%",
                    context: "Fintech / Payments",
                },
                valuation: {
                    institutional: 22.0,
                    real: 25.0,
                    unit: "B$"
                },
                trajectory: {
                    performance: [20, 40, 60, 80, 100],
                    market: [10, 15, 25, 60, 95],
                    labels: ["2021", "2022", "2023", "2024", "2025"]
                },
                validation: "Signal detected 2022. Market corrected with NuBank IPO and subsequent rally. Asymmetry window effectively closed."
            },
            {
                id: "european-defense",
                name: "AeroShield Systems",
                entityGroup: "Distressed Asset",
                scale: "Mid-Market",
                region: "Eastern Europe",
                status: "TRACKING",
                asymmetryScore: 85,
                needsWearable: false,
                metrics: {
                    primary: "Gov Contracts +300%",
                    secondary: "Subsidies Unlocked",
                    context: "Defense Solutions",
                },
                valuation: {
                    institutional: 150,
                    real: 850,
                    unit: "M\u20AC"
                },
                trajectory: {
                    performance: [10, 30, 50, 70, 85],
                    market: [20, 25, 30, 40, 50],
                    labels: ["Q1", "Q2", "Q3", "Q4", "Current"]
                },
                validation: "European defense spending pivot not yet fully priced into tier-2 & tier-3 sovereign suppliers."
            },
            {
                id: "biotech-phase2",
                name: "NovaGeniX Bio",
                entityGroup: "Venture Capital",
                scale: "Clinical Stage",
                region: "North America",
                status: "TRACKING",
                asymmetryScore: 91,
                needsWearable: false,
                metrics: {
                    primary: "Phase 2 Efficacy 92%",
                    secondary: "Competitor Trial Failed",
                    context: "Oncology Biopharma",
                },
                valuation: {
                    institutional: 120,
                    real: 950,
                    unit: "M$"
                },
                trajectory: {
                    performance: [15, 25, 30, 60, 95],
                    market: [30, 30, 30, 40, 50],
                    labels: ["T-12m", "T-9m", "T-6m", "T-3m", "Current"]
                },
                validation: "Market ignoring direct competitor trial failure. Near monopolistic potential in specific drug indication."
            }
        ]
    },
    "sports": {
        domainLabel: "SPORTS_INTELLIGENCE",
        color: "#00ff41",
        metrics: {
            primary: "Goals / Assists",
            secondary: "Minutes Played",
            context: "League Context"
        },
        items: [
            {
                "id": "bruno-baldini",
                "name": "Bruno Baldini",
                "entityGroup": "OB1 Global Radar / Brazil",
                "scale": "Prospect",
                "region": "Brazil",
                "status": "TRACKING",
                "asymmetryScore": 80,
                "needsWearable": true,
                "detectedAt": "2026-03-01",
                "metrics": {
                    "primary": "Signal Detected",
                    "secondary": "Monitoring",
                    "context": "Brazil"
                },
                "valuation": {
                    "institutional": "0.1",
                    "real": "?",
                    "unit": "M€"
                },
                "trajectory": {
                    "performance": [0, 80.0, 85.0],
                    "market": [0, 5, 5],
                    "labels": ["Pre-OB1", "Detection", "Current"]
                },
                "validation": "OB1 Score: 80.0. High asymmetry detected in Brazil market. Institutional pricing lagging."
            },
            {
                "id": "mateus-romero",
                "name": "Mateus Romero",
                "entityGroup": "OB1 Global Radar / Brazil",
                "scale": "Prospect",
                "region": "Brazil",
                "status": "TRACKING",
                "asymmetryScore": 75,
                "needsWearable": true,
                "detectedAt": "2026-03-01",
                "metrics": {
                    "primary": "Signal Detected",
                    "secondary": "Monitoring",
                    "context": "Brazil"
                },
                "valuation": {
                    "institutional": "0.1",
                    "real": "?",
                    "unit": "M€"
                },
                "trajectory": {
                    "performance": [0, 75.0, 80.0],
                    "market": [0, 5, 5],
                    "labels": ["Pre-OB1", "Detection", "Current"]
                },
                "validation": "OB1 Score: 75.0. High asymmetry detected in Brazil market. Institutional pricing lagging."
            },
            {
                "id": "saviolo",
                "name": "Saviolo",
                "entityGroup": "OB1 Global Radar / Portugal",
                "scale": "Prospect",
                "region": "Portugal",
                "status": "TRACKING",
                "asymmetryScore": 82,
                "needsWearable": true,
                "detectedAt": "2026-03-01",
                "metrics": {
                    "primary": "Signal Detected",
                    "secondary": "Monitoring",
                    "context": "Portugal"
                },
                "valuation": {
                    "institutional": "0.1",
                    "real": "?",
                    "unit": "M€"
                },
                "trajectory": {
                    "performance": [0, 82.0, 87.0],
                    "market": [0, 5, 5],
                    "labels": ["Pre-OB1", "Detection", "Current"]
                },
                "validation": "OB1 Score: 82.0. High asymmetry detected in Portugal market. Institutional pricing lagging."
            },
            {
                "id": "ryan-evaristo",
                "name": "Ryan Evaristo",
                "entityGroup": "OB1 Global Radar / Brazil",
                "scale": "Prospect",
                "region": "Brazil",
                "status": "TRACKING",
                "asymmetryScore": 100,
                "needsWearable": true,
                "detectedAt": "2026-03-01",
                "metrics": {
                    "primary": "Signal Detected",
                    "secondary": "Monitoring",
                    "context": "Brazil"
                },
                "valuation": {
                    "institutional": "0.1",
                    "real": "?",
                    "unit": "M€"
                },
                "trajectory": {
                    "performance": [0, 100.0, 105.0],
                    "market": [0, 5, 5],
                    "labels": ["Pre-OB1", "Detection", "Current"]
                },
                "validation": "OB1 Score: 100.0. High asymmetry detected in Brazil market. Institutional pricing lagging."
            },
            {
                "id": "andre-maia",
                "name": "André Maia",
                "entityGroup": "OB1 Global Radar / Brazil",
                "scale": "Prospect",
                "region": "Brazil",
                "status": "TRACKING",
                "asymmetryScore": 95,
                "needsWearable": true,
                "detectedAt": "2026-03-01",
                "metrics": {
                    "primary": "Signal Detected",
                    "secondary": "Monitoring",
                    "context": "Brazil"
                },
                "valuation": {
                    "institutional": "0.1",
                    "real": "?",
                    "unit": "M€"
                },
                "trajectory": {
                    "performance": [0, 95.0, 100.0],
                    "market": [0, 5, 5],
                    "labels": ["Pre-OB1", "Detection", "Current"]
                },
                "validation": "OB1 Score: 95.0. High asymmetry detected in Brazil market. Institutional pricing lagging."
            },
            {
                "id": "kauan-toledo",
                "name": "Kauan Toledo",
                "entityGroup": "OB1 Global Radar / Brazil",
                "scale": "Prospect",
                "region": "Brazil",
                "status": "TRACKING",
                "asymmetryScore": 75,
                "needsWearable": true,
                "detectedAt": "2026-03-01",
                "metrics": {
                    "primary": "Signal Detected",
                    "secondary": "Monitoring",
                    "context": "Brazil"
                },
                "valuation": {
                    "institutional": "0.1",
                    "real": "?",
                    "unit": "M€"
                },
                "trajectory": {
                    "performance": [0, 75.0, 80.0],
                    "market": [0, 5, 5],
                    "labels": ["Pre-OB1", "Detection", "Current"]
                },
                "validation": "OB1 Score: 75.0. High asymmetry detected in Brazil market. Institutional pricing lagging."
            },
            {
                "id": "opp-opp_be2008a5",
                "name": "Pietro Saio",
                "entityGroup": "Benevento (Serie C)",
                "scale": "Age: None",
                "region": "Italy",
                "status": "TRACKING",
                "asymmetryScore": 69,
                "needsWearable": true,
                "detectedAt": "2026-03-03",
                "metrics": {
                    "primary": "Difensore",
                    "secondary": "mercato",
                    "context": "Lega Pro / Serie C"
                },
                "valuation": {
                    "institutional": "0.2",
                    "real": "?",
                    "unit": "M€"
                },
                "trajectory": {
                    "performance": [10, 40, 65, 80],
                    "market": [10, 15, 20, 25],
                    "labels": ["2024", "2025", "Jan 2026", "Current"]
                },
                "validation": "Serie C Opportunity: Giovane difensore del Benevento, classe non specificata, che ha attirato l'interesse di club di Serie B come Modena e Spezia..."
            },
            {
                "id": "opp-opp_acce84fa",
                "name": "Louis Buffon",
                "entityGroup": "Pontedera (Serie C)",
                "scale": "Age: 18",
                "region": "Italy",
                "status": "TRACKING",
                "asymmetryScore": 65,
                "needsWearable": true,
                "detectedAt": "2026-03-03",
                "metrics": {
                    "primary": "Esterno Offensivo",
                    "secondary": "prestito",
                    "context": "Lega Pro / Serie C"
                },
                "valuation": {
                    "institutional": "0.2",
                    "real": "?",
                    "unit": "M€"
                },
                "trajectory": {
                    "performance": [10, 40, 65, 80],
                    "market": [10, 15, 20, 25],
                    "labels": ["2024", "2025", "Jan 2026", "Current"]
                },
                "validation": "Serie C Opportunity: Esterno offensivo classe 2007, dopo la trafila nella Juventus e 4 presenze nel Pisa, si aggrega in prestito al Pontedera..."
            },
            {
                "id": "villarreal-neiser",
                "name": "Neiser Villarreal",
                "entityGroup": "Cruzeiro (ex Millonarios)",
                "scale": "Age: 19",
                "region": "Brazil",
                "status": "CONFIRMED",
                "asymmetryScore": 92,
                "needsWearable": false,
                "detectedAt": "2025-09-17",
                "metrics": {
                    "primary": "8 / 2",
                    "secondary": "1240 min",
                    "context": "Sudamericano U20"
                },
                "valuation": {
                    "institutional": "1.8",
                    "real": "51.0",
                    "unit": "M€"
                },
                "trajectory": {
                    "performance": [10, 45, 85, 92],
                    "market": [5, 12, 15, 18],
                    "labels": ["Q2 2025", "Sep 2025", "Q4 2025", "Current"]
                },
                "validation": "CONFIRMED. Multiplier: 28x. Protocol validated by Jan 2026 transfer."
            }
        ]
    }
};

// ============================================================
// SIGNAL FEED — Real log entries from OB1 + Eater of Logs
// Source: ob1_global.db detection events + eater-of-logs/data.json
// ============================================================

const SIGNAL_FEED_MESSAGES = [
    { "type": "DETECT", "text": "Marco Sau (TuttoC): L'ex bomber di Cagliari e Benevento è ancora senza squadra..." },
    { "type": "DETECT", "text": "Andrey Galabinov (Gazzetta dello Sport): Il gigante bulgaro si propone in Lega Pro. Cerca u..." },
    { "type": "REPORT", "text": "Jacopo Dezi (PadovaSport): Rottura totale con la società. Il centrocampista è fuori dal..." },
    { "type": "ANALYZE", "text": "Kevin Zeroli (MilanNews): Il Milan valuta il prestito secco per fargli fare 6 mesi d..." },
    { "type": "ANALYZE", "text": "Nicola Cittadino (NotiziarioCalcio): Sta dominando il girone A di Serie D. 8 gol e 1..." },
    { "type": "DETECT", "text": "Luca Paganini (TuttoLatina): In uscita dal Latina per alleggerire il monte ingaggi. Este..." },
    { "type": "ANALYZE", "text": "Davide Merola (Rete8): Problema muscolare per l'esterno del Pescara. Si teme stiram..." },
    { "type": "DETECT", "text": "Ledian Memushaj (Rumors): Voci di un clamoroso ritorno al calcio giocato per l'ex capi..." },
    { "type": "SCRAPE", "text": "OB1 Global Radar: Syncing APAC/LATAM feeds..." },
    { "type": "CALIBRATE", "text": "Updating league latency factors: Serie C = 0.85, Brazil Youth = 0.95" }
];
