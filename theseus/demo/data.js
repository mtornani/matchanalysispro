const ASSET_DATA = {
    "macro": {
        domainLabel: "CORPORATE_&_MACRO",
        color: "#3b82f6", // sys-blue
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
                metrics: {
                    primary: "Gov Contracts +300%",
                    secondary: "Subsidies Unlocked",
                    context: "Defense Solutions",
                },
                valuation: {
                    institutional: 150,
                    real: 850,
                    unit: "M€"
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
        domainLabel: "SPORTS_ASSETS",
        color: "#00ff41", // sys-green
        metrics: {
            primary: "Goals / Assists",
            secondary: "Minutes Played",
            context: "League Context"
        },
        items: [
            {
                id: "neiser-villarreal",
                name: "Neiser Villarreal",
                entityGroup: "Cruzeiro (ex Millonarios)",
                scale: "Age: 19",
                region: "Colombia",
                status: "CONFIRMED",
                asymmetryScore: 92,
                metrics: {
                    primary: "8 / 2",
                    secondary: "1240",
                    context: "Regional/U20",
                },
                valuation: {
                    institutional: 1.8,
                    real: 51.0,
                    unit: "M€"
                },
                trajectory: {
                    performance: [10, 25, 45, 85, 90],
                    market: [5, 10, 12, 15, 18],
                    labels: ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024", "Q1 2025"]
                },
                validation: "Signal detected: Sep 2025 -> Market corrected: Jan 2026 -> Multiplier: 28x"
            },
            {
                id: "claudio-echeverri",
                name: "Claudio Echeverri",
                entityGroup: "Man City (ex River Plate)",
                scale: "Age: 19",
                region: "Argentina",
                status: "CONFIRMED",
                asymmetryScore: 45,
                metrics: {
                    primary: "6 / 4",
                    secondary: "1100",
                    context: "Elite/U20",
                },
                valuation: {
                    institutional: 15.0,
                    real: 18.5,
                    unit: "M€"
                },
                trajectory: {
                    performance: [30, 50, 70, 80, 85],
                    market: [20, 45, 75, 90, 95],
                    labels: ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024", "Q1 2025"]
                },
                validation: "Benchmark: Valuation follows performance tightly. Brand bias eliminated expected asymmetry."
            },
            {
                id: "ryan-evaristo",
                name: "Ryan Evaristo",
                entityGroup: "Corinthians U20",
                scale: "Age: 18",
                region: "Brazil",
                status: "GHOST",
                asymmetryScore: 100,
                metrics: {
                    primary: "12 / 5",
                    secondary: "980",
                    context: "State/U20",
                },
                valuation: {
                    institutional: 0.25,
                    real: 12.0,
                    unit: "M€"
                },
                trajectory: {
                    performance: [5, 15, 40, 75, 95],
                    market: [2, 2, 2, 3, 3],
                    labels: ["Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025", "Current"]
                },
                validation: "STATUS: GHOST. Zero institutional coverage. Expected global breakout Q3 2026."
            },
            {
                id: "andre-maia",
                name: "Andre Maia",
                entityGroup: "Copa Sao Paulo",
                scale: "Age: 17",
                region: "Brazil",
                status: "TRACKING",
                asymmetryScore: 95,
                metrics: {
                    primary: "7 / 1",
                    secondary: "450",
                    context: "Tournament/U20",
                },
                valuation: {
                    institutional: 0.1,
                    real: 4.5,
                    unit: "M€"
                },
                trajectory: {
                    performance: [0, 5, 20, 60, 90],
                    market: [1, 1, 1, 1, 1],
                    labels: ["M1", "M2", "M3", "M4", "Current"]
                },
                validation: "High volatility. Early detection stage. Active surveillance engaged."
            }
        ]
    }
};

const SIGNAL_FEED_MESSAGES = [
    { type: "SCRAPE", text: "Global OSINT nodes synched — 14,029 new data points acquired." },
    { type: "ANALYZE", text: "AeroShield Systems: Contract volume delta +300% vs Q3 baseline." },
    { type: "DETECT", text: "ASYMMETRY FLAGGED: Defense sector — Institutional latency identified." },
    { type: "REPORT", text: "Signal pushed to Level 3 Human Filter for macro validation." },
    { type: "VALIDATE", text: "Cross-referencing sovereign defense budgets & subsidy pipelines..." },
    { type: "CALIBRATE", text: "Model recalibrated for Eastern Europe. Alpha window: 12-18 weeks." },

    { type: "SCRAPE", text: "Copa Sao Paulo U20 feed parsed — 412 player logs updated." },
    { type: "ANALYZE", text: "Andre Maia: xG delta +2.1 vs institutional projection trajectory." },
    { type: "DETECT", text: "ASYMMETRY FLAGGED: Score 95 — Brand bias suppressing valuation." },
    { type: "REPORT", text: "Signal pushed to Evidence Log — Target locked." },
    { type: "VALIDATE", text: "Cross-referencing OB1 Global Radar historical latency metrics..." },
    { type: "CALIBRATE", text: "Model recalibrated for Brazilian Youth tournaments." },

    { type: "SCRAPE", text: "Global Patent Database synched — stealth tech filings scraped." },
    { type: "ANALYZE", text: "Project Q-Core: 14 new hardware patents filed under holding company." },
    { type: "DETECT", text: "ASYMMETRY FLAGGED: Score 98 — Zero VC median coverage detected." },
    { type: "REPORT", text: "Private Equity alert generated. Tracking foundational AI shifts." },

    { type: "SCRAPE", text: "Commodities physical delivery logs scraped via satellite API." },
    { type: "ANALYZE", text: "Structural Copper Deficit: Physical hoarding exceeds futures pricing by 22%." },
    { type: "DETECT", text: "ASYMMETRY FLAGGED: Systemic latency in futures market pricing." },
    { type: "CALIBRATE", text: "Cycle complete. Loop restarted. Continuously extracting..." }
];
