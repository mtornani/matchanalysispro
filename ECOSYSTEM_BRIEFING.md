# Briefing Tecnico — Ecosistema Match Analysis Pro

> Da girare a qualsiasi collaboratore (AI o umano) che lavora su copy, design o strategia.
> Ultimo aggiornamento: 2026-03-02

---

## Stato attuale: cosa esiste e funziona

### Siti live

| Sito | URL | Scopo |
|------|-----|-------|
| **Match Analysis Pro** | `matchanalysispro.online` | Homepage personale + hub dell'ecosistema (IT + EN) |
| **OB1 Global Radar** | `mtornani.github.io/ob1-scout/` | Radar scouting globale — operativo |
| **OB1 Serie C Scout** | `mtornani.github.io/ob1-serie-c/` | Radar Lega Pro italiana — operativo |
| **Ship of Theseus Protocol** | `matchanalysispro.online/theseus/` | Whitepaper pubblico sulla metodologia |

Tutti i siti sono gia interconnessi con link reciproci (card, footer, CTA).

---

## Gerarchia del brand (gia implementata)

```
MATCH_ANALYSIS_PRO (Mirko Tornani — persona/pratica)
  |
  +-- Ouroboros Protocol (principio operativo / marchio di fabbrica)
  |     Il ciclo: SCRAPE > ANALYZE > DETECT > REPORT > VALIDATE > CALIBRATE > LOOP
  |     |
  |     +-- OB1 Global Radar (implementazione globale)
  |     +-- OB1 Serie C Scout (implementazione locale)
  |
  +-- Ship of Theseus Protocol (framework intellettuale / whitepaper)
  |     "Powered by Ouroboros" — il whitepaper spiega il PERCHE,
  |     l'Ouroboros e il COME
  |
  +-- The Field (15 anni di coaching giovanile, UEFA B, Bologna)
```

---

## Design system (vincolante, non modificabile)

### Colori
- Background: `#0a0a0a` (nero profondo)
- Accent primario: `#00ff41` (verde neon) — UNICO per tutto l'ecosistema
- Giallo: `#fbbf24` (badge, warning)
- Blu: `#3b82f6` (badge, info)
- Viola: `#a855f7` (status GHOST)
- Testo principale: `#e2e8f0`
- Testo secondario: `#64748b`
- Pannelli: `#111` / `#1a1a1a`
- Bordi: `#222` / `#333`

**NON usare colori diversi per siti diversi.** L'uniformita e intenzionale: un sistema, un colore.

### Tipografia
- Sans-serif: `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`
- Monospace: `'SF Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace`

**NON usare Google Fonts** (Inter, Roboto, Montserrat, ecc.). Zero dipendenze esterne. Scelta deliberata per velocita, privacy, estetica terminale.

### Stile UI
- Titoli sezione: `> NOME_SEZIONE` (stile terminale, monospace, verde)
- Card: sfondo `#111`, bordo `#333`, hover verde
- Badge: pill con font monospace (`OPERATIONAL`, `BETA`, `TRACKING`, `GHOST`)
- Tone of voice: diretto, tecnico, zero filler. Niente emoji. Niente superlatives vuoti.

---

## Vincoli tecnici

| Regola | Motivo |
|--------|--------|
| Zero cookie, zero tracking, zero analytics | Dichiarato nel footer. Scelta etica. |
| CSS inline (homepage) | Single-file HTML, nessun stylesheet esterno |
| Niente JS framework | Vanilla JS solo per smooth scroll |
| Theseus usa Tailwind CDN + Chart.js CDN | Unica eccezione alle dipendenze esterne |
| GitHub Pages hosting | Statico, no backend, no database |

---

## Chi e Mirko Tornani (per il copy)

- Allenatore UEFA B, laurea in Scienze Motorie (Universita di Bologna)
- 15+ anni di coaching giovanile (U8-U17), FSGC (San Marino)
- Costruisce sistemi di intelligence calcistica con AI
- Personalita (Big Five): alta apertura, bassa amabilita, alta coscienziosita
- **Tradotto in tone of voice**: diretto, niente convenevoli, orientato ai fatti, contrarian

**NON scrivere copy che:**
- Usa buzzword vuoti ("rivoluzionario", "game-changer", "all'avanguardia")
- Promette risultati senza prove
- Parla in terza persona pomposa
- Usa scarsita artificiale o urgenza falsa

**SI scrivere copy che:**
- Mostra prove concrete (nomi, date, numeri)
- Spiega il metodo, non solo il risultato
- Ammette limiti (il whitepaper ha una sezione "Limiti")
- Parla come un tecnico a un altro tecnico

---

## Il Theseus Protocol NON e un segreto

Il whitepaper e pubblico. Il footer dice: *"This document is public. Share it."*

L'approccio e **trasparenza radicale**, non scarsita artificiale. Il vantaggio competitivo non sta nel nascondere il metodo, ma nell'eseguirlo meglio degli altri.

NON trattarlo come:
- Un "segreto" da svelare gradualmente
- Un'area riservata o premium
- Un trigger di scarsita/FOMO

SI trattarlo come:
- Prova di competenza (chi pubblica il metodo e sicuro che funzioni)
- Filtro: chi lo legge e non capisce non e il target
- Strumento di trust: mostra il ragionamento, non solo il risultato

---

## Dove servono contributi

### Copy OB1 radar
Le landing page dei due radar (`ob1-scout`, `ob1-serie-c`) hanno UI funzionali ma il copy puo essere affinato per parlare al target.

### Target audience
Direttori Sportivi, responsabili scouting, match analyst, allenatori.
Gente sotto pressione, poco tempo, cerca vantaggio informativo.

### Microcopy di conversione
CTA, tagline, frasi brevi. Devono essere coerenti con il tone of voice (diretto, tecnico, zero filler).

### SEO / Content strategy
Articoli, case study, contenuti che portano traffico organico. Basati su prove reali, non su hype.

---

## Cosa NON fare (checklist)

- [ ] NON cambiare il sistema colori
- [ ] NON aggiungere font esterni
- [ ] NON aggiungere cookie/tracking/analytics
- [ ] NON trattare Theseus come segreto
- [ ] NON proporre mockup senza conoscere il codice
- [ ] NON usare emoji nel sito
- [ ] NON aggiungere complessita non necessaria
