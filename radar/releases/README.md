# Uscite

Ogni uscita è una cartella `YYYY-MM-<ambito>/` con:

- `release.json` — metadati e scelte con id stabili, validato da `radar/schema/release.schema.json`
- eventuali CSV di pool e di errata, come per ottobre 2026

Qui stanno solo le uscite pubbliche. Le uscite a pagamento stanno fuori dal repo, in `$RADAR_PRIVATE_DIR/releases/` (vedi `radar/HARNESS.md`): `build.py` fallisce se ne trova una qui. Non inventare mesi futuri e non mettere HTML pubblico completo per quelle private (solo la vetrina).

L’Uscita 01 è `2026-10-girone-d`.
L’Uscita 02 (`2026-11-girone-d`) è riservata agli abbonati: nel repo c’è solo la vetrina `radar/uscita-02/`.
