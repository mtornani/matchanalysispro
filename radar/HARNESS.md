# Harness del Radar

Guida per chi (o per quale agente) modifica il Radar. Lo scopo è aggiungere dati senza riscrivere le pagine a mano e senza rompere ciò che è già pubblico.

## Prima di dichiarare finito

Dalla radice del repo:

```
python3 radar/build.py
python3 -m unittest tests.test_radar
```

Entrambi devono uscire senza errori.

## Come si aggiunge un’uscita

1. Crea `radar/releases/YYYY-MM-<ambito>/`.
2. Scrivi `release.json` con lo stesso schema di `radar/schema/release.schema.json`.
3. Ogni scelta ha un id nuovo e stabile (`E02-001`, …). Non riutilizzare id di uscite precedenti.
4. Se le regole sono le stesse, `method_version` resta `v1`. Se cambi un criterio, crea `radar/method/v2.md` datato: vale solo da questa uscita in poi.
5. Non inventare giocatori, fonti o risultati di verifica.
6. Non modificare `radar/accesso/` né i prezzi.

## Cosa non si tocca

- Le scelte già pubblicate non si riscrivono.
- Una correzione è un file datato aggiuntivo (modello: `release_01_errata_20261019.csv`).
- Non cambiare la copia della landing `radar/accesso/` (prezzo, testi, mailto).
- Non pubblicare HTML di un’uscita a pagamento senza ok esplicito.

## Prove extra (video e altro)

Le prove stanno in `radar/evidence/` e usano `radar/schema/evidence.schema.json`. Si agganciano a un `player_id` già esistente. Un partner (per esempio K-Sport) può aggiungere una clip: non cambia punteggi né scelte.

## Pagine pubbliche

Questo mattone non rigenera `radar/index.html`. La prova di ottobre e la landing restano scritte a mano finché un passo successivo non collegherà il generatore alle pagine, senza cambiarne il contenuto visibile.
