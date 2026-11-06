# Prove extra

Cartella per evidenze successive agganciate a un id di scelta (per esempio `E01-009`).

Formato: un file JSON per prova, validato da `radar/schema/evidence.schema.json`.

Campi: `player_id`, `type` (`video`, `note` o `source`), `date`, e poi `url` o `path` (per una `note` basta il testo). Facoltativi: `partner` (es. `k-sport`), `start`, `end`, `note`.

Un partner può aggiungere una clip o un time-code. Non può cambiare metodo, punteggi o scelte già pubblicate.

Non commettere qui uscite private né file video pesanti senza una decisione esplicita. Questa cartella è solo il gancio.
