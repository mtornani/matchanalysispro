import json
B="https://www.matchanalysispro.online"
TASKS={
"it":{"poss":{
 "d-c":["Si offre vicino al portatore per una linea di passaggio corta","Uno resta dietro la linea della palla come appoggio sicuro","Chi riceve orientato cerca di superare la prima linea di pressione"],
 "d-w":["Si apre per allargare il primo pressing avversario","Accorcia verso la palla se il compagno è chiuso","Tiene la linea per non lasciare spazio alle spalle"],
 "m-c":["Riceve tra le linee, tra centrocampo e difesa avversaria","Si avvicina al portatore per creare superiorità vicino alla palla","Chi non è coinvolto copre lo spazio in caso di palla persa"],
 "m-w":["Dà ampiezza per allungare la linea avversaria","Si scambia la posizione con chi viene incontro","Offre un appoggio esterno per cambiare lato"],
 "a-c":["Attacca la profondità alle spalle della difesa","Occupa l'area con presenze su primo palo, secondo palo e dischetto","Uno resta fuori area per la seconda palla"],
 "a-w":["Punta l'uomo uno contro uno quando il lato è isolato","Sovrapposizione o sottoposizione del compagno vicino","Cerca il cross basso o il passaggio all'indietro"]},
"lost":{
 "d-c":["Chi è più vicino aggredisce subito il portatore","Gli altri chiudono il centro e proteggono la porta","Si accorcia la distanza tra i reparti"],
 "d-w":["Scivola verso il centro per coprire la profondità","Impedisce il cross o accompagna verso l'esterno","Comunica la marcatura dell'uomo libero"],
 "m-c":["Primo pressing immediato sul portatore","Chiusura delle linee di passaggio centrali","Chi è lontano rientra sotto la linea della palla"],
 "m-w":["Chiude la linea di passaggio verso il lato debole","Accompagna il portatore verso la linea laterale","Si riposiziona in fretta se il pressing è superato"],
 "a-c":["Contro-pressing di chi ha perso palla","Taglia il passaggio di uscita verso il centro","Se la pressione non riesce, si rientra compatti"],
 "a-w":["Pressa verso l'interno per chiudere l'uscita sicura","Impedisce il cambio di gioco","Rientra per ridare densità a centrocampo"]},
"won":{
 "d-c":["Prima giocata verso chi è libero, non verso chi è marcato","Se c'è spazio, conduzione per attirare un avversario","Mettere la palla al sicuro se la pressione è alta"],
 "d-w":["Si apre subito per dare una via d'uscita laterale","Attacca lo spazio libero lasciato dall'avversario","Offre un appoggio per uscire dalla zona di recupero"],
 "m-c":["Primo passaggio in avanti se c'è un compagno in profondità","Chi è vicino si stacca per offrire un'uscita","Gli altri accompagnano l'azione per non restare isolati"],
 "m-w":["Corsa in profondità sul lato lasciato scoperto","Allarga il campo per la ripartenza","Si propone come riferimento per il cambio di lato"],
 "a-c":["Attacca subito la porta, la difesa non è ancora schierata","Chi arriva da dietro occupa l'area","Scelta rapida: tiro, rifinitura o mantenere palla"],
 "a-w":["Punta la porta in diagonale","Si accentra per aprire la corsia a chi arriva","Gioca semplice se la superiorità è sparita"]}},
"en":{"poss":{
 "d-c":["Offers close to the ball carrier for a short passing line","One player stays behind the ball as a safe option","A player receiving on the half-turn tries to beat the first line of pressure"],
 "d-w":["Moves wide to stretch the opponent's first press","Comes closer to the ball if the teammate is closed down","Holds the line so no space opens behind"],
 "m-c":["Receives between the lines, between the opponent's midfield and defence","Moves close to the ball carrier to create an overload near the ball","Players not involved cover space in case the ball is lost"],
 "m-w":["Gives width to stretch the opponent's line","Swaps positions with the player coming short","Offers a wide option to switch play"],
 "a-c":["Attacks depth behind the defence","Fills the box: near post, far post, penalty spot","One player stays outside the box for the second ball"],
 "a-w":["Takes on the defender one-on-one when the side is isolated","Overlap or underlap from the nearest teammate","Looks for the low cross or the cut-back"]},
"lost":{
 "d-c":["The nearest player presses the ball carrier immediately","The others close the centre and protect the goal","Distances between the lines shrink"],
 "d-w":["Tucks inside to cover depth","Blocks the cross or shows the carrier outside","Calls out the free player"],
 "m-c":["Immediate first press on the ball carrier","Central passing lines are closed","Players further away recover below the line of the ball"],
 "m-w":["Closes the passing line to the weak side","Shows the carrier towards the touchline","Recovers position quickly if the press is beaten"],
 "a-c":["Counter-press by whoever lost the ball","Cuts the exit pass into the centre","If the press fails, the team drops back compact"],
 "a-w":["Presses inward to close the safe exit","Prevents the switch of play","Tracks back to restore numbers in midfield"]},
"won":{
 "d-c":["First pass to the free player, not the marked one","If there is space, carries the ball to draw an opponent","Secures the ball if the pressure is high"],
 "d-w":["Moves wide at once to give a side exit","Attacks the space the opponent left","Offers support to get out of the recovery area"],
 "m-c":["First pass forward if a teammate is running in behind","The nearest player breaks free to offer an exit","The others support the move so nobody is isolated"],
 "m-w":["Runs in behind on the side left open","Stretches the pitch for the counter","Offers a reference point for the switch"],
 "a-c":["Attacks the goal at once, before the defence is set","Players arriving from behind fill the box","Quick decision: shoot, final pass or keep the ball"],
 "a-w":["Drives diagonally at goal","Cuts inside to open the lane for a runner","Keeps it simple if the overload has gone"]}}}
CTX={"it":{"poss":"In possesso","lost":"Palla persa","won":"Palla recuperata"},"en":{"poss":"In possession","lost":"Ball lost","won":"Ball won"}}
THIRD={"it":{"d":"Terzo difensivo","m":"Terzo centrale","a":"Terzo offensivo"},"en":{"d":"Defensive third","m":"Middle third","a":"Final third"}}
LANE={"it":{"l":"sinistra","c":"centro","r":"destra"},"en":{"l":"left","c":"centre","r":"right"}}
LANE_SHORT={"it":{"l":"Sx","c":"Centro","r":"Dx"},"en":{"l":"L","c":"Centre","r":"R"}}
T={
"it":dict(home="/",v2="/v2/",about="/about/",nav=("Metodo","Chi sono","EN"),alt="/en/v2/",
kicker="Mirko Tornani · allenatore UEFA B · San Marino",
h1="Non vendo uno strumento: trovo i problemi che il calcio ha lasciato scoperti e costruisco soluzioni che si possono verificare.",
lead="Un esempio concreto: quando una squadra perde un giocatore, cosa va sostituito davvero? Non il ruolo, ma i compiti che svolgeva, zona per zona e a seconda del momento.",
pitch_h="Il metodo Theseus in pratica: tocca una zona, cambia il momento",title="Mirko Tornani — Metodo Theseus: calcio relazionale per compiti di zona",meta="Il metodo Theseus di Mirko Tornani: sostituire un giocatore per compiti di zona e contesto, non per ruolo. Calcio relazionale e scouting di talenti a bassa visibilità da fonti pubbliche, Lega Pro e dilettanti.",
pitch_hint="Lo stesso spazio chiede compiti diversi a seconda del momento. Chi li svolge può cambiare: è questo che rende la squadra la stessa.",
illus="Esempio illustrativo con compiti generici di calcio relazionale. Non descrive una squadra reale e non contiene dati.",
fallback_h="Compiti per zona e momento (versione statica)",
attack="Direzione d'attacco",
s=[("Il problema",["Quando una squadra perde un giocatore, di solito si cerca qualcuno con lo stesso ruolo. Ma il ruolo descrive una posizione sulla lavagna, non ciò che il giocatore faceva davvero in campo."]),
("Il paradosso di Teseo, applicato a una squadra",["Se sostituisci una tavola alla volta, la nave resta la stessa? Applicato a una squadra: resta la stessa quando restano gli stessi compiti e le stesse relazioni tra i giocatori, non gli stessi nomi."]),
("Calcio relazionale: dal ruolo al compito di zona",["Nel calcio relazionale i giocatori non occupano ruoli fissi: svolgono compiti per zona e contesto. Chi si avvicina al portatore, chi dà ampiezza, chi attacca la profondità, chi copre la palla persa. L'identità della squadra vive in questa rete di compiti."])],
m=("Il metodo Theseus in quattro passi",["Mappare i compiti di una squadra per zona e momento, da video ed eventi.","Descrivere il giocatore uscente come insieme di compiti, non come ruolo.","Cercare candidati che svolgono quei compiti in contesti simili.","L'allenatore valida: i dati propongono, il campo decide."]),
art=("Cosa si può verificare",[("Mappa interattiva dei compiti","Questa pagina, sopra. Il codice è statico e leggibile.","Disponibile"),("Profilo per compiti su dati pubblici","Un esempio su una partita di dati evento aperti, con dataset, ID partita e script pubblici, così che ogni passaggio sia riproducibile.","In preparazione")]),
lim=("Limiti",["I dati evento pubblici sono incompleti.","Il contesto conta: la stessa azione ha un senso diverso in squadre diverse.","Il metodo supporta la decisione, non la sostituisce."]),
cta="Se lavori in un club e hai un problema di questo tipo, scrivimi:",status_label="Stato"),
"en":dict(home="/en/",v2="/en/v2/",about="/en/about/",nav=("Method","About","IT"),alt="/v2/",
kicker="Mirko Tornani · UEFA B coach · San Marino",
h1="I don't sell a tool: I find the problems football has left uncovered and build solutions that can be verified.",
lead="A concrete example: when a team loses a player, what actually needs replacing? Not the role, but the tasks the player carried out, zone by zone and depending on the moment.",
pitch_h="The Theseus method in practice: tap a zone, change the moment",title="Mirko Tornani — The Theseus method: relational football by zone tasks",meta="Mirko Tornani's Theseus method: replace a player by zone and context tasks, not by role. Relational football and low-visibility talent scouting from public sources, Italian Serie C and amateur level.",
pitch_hint="The same space asks for different tasks depending on the moment. Who carries them out can change: that is what keeps the team the same.",
illus="Illustrative example with generic relational-football tasks. It does not describe a real team and contains no data.",
fallback_h="Tasks by zone and moment (static version)",
attack="Direction of attack",
s=[("The problem",["When a team loses a player, the usual search is for someone in the same role. But a role describes a position on the whiteboard, not what the player actually did on the pitch."]),
("The Theseus paradox, applied to a team",["If you replace one plank at a time, is it still the same ship? Applied to a team: it stays the same when the same tasks and relationships between players remain, not the same names."]),
("Relational football: from role to zone task",["In relational football players do not hold fixed roles: they carry out tasks by zone and context. Who moves close to the ball carrier, who gives width, who attacks depth, who covers the lost ball. A team's identity lives in this network of tasks."])],
m=("The Theseus method in four steps",["Map a team's tasks by zone and moment, from video and event data.","Describe the outgoing player as a set of tasks, not a role.","Look for candidates who perform those tasks in similar contexts.","The coach validates: data proposes, the pitch decides."]),
art=("What can be checked",[("Interactive task map","This page, above. The code is static and readable.","Available"),("Task profile on public data","An example on one match of open event data, with dataset, match ID and public scripts, so every step can be reproduced.","In preparation")]),
lim=("Limits",["Public event data is incomplete.","Context matters: the same action means different things in different teams.","The method supports the decision, it does not replace it."]),
cta="If you work at a club and have a problem like this, write to me:",status_label="Status")}
SVG='''<svg viewBox="0 0 68 105" aria-hidden="true" focusable="false"><g fill="none" stroke="#9aa59f" stroke-width=".4"><rect x="1" y="1" width="66" height="103" fill="#eef1ec"/><line x1="1" y1="52.5" x2="67" y2="52.5"/><circle cx="34" cy="52.5" r="9.15"/><rect x="13.84" y="1" width="40.32" height="16.5"/><rect x="24.84" y="1" width="18.32" height="5.5"/><rect x="13.84" y="87.5" width="40.32" height="16.5"/><rect x="24.84" y="98.5" width="18.32" height="5.5"/></g><g stroke="#c9cfc9" stroke-width=".3" stroke-dasharray="1 1"><line x1="1" y1="35.33" x2="67" y2="35.33"/><line x1="1" y1="69.67" x2="67" y2="69.67"/><line x1="23" y1="1" x2="23" y2="104"/><line x1="45" y1="1" x2="45" y2="104"/></g></svg>'''
def page(k,title,path,alt_it,alt_en,body,extra=""):
    d=T[k]
    return f'''<!DOCTYPE html>
<html lang="{k}"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title><meta name="description" content="{d['meta']}">
<meta property="og:title" content="{title}"><meta property="og:description" content="{d['meta']}"><meta property="og:type" content="profile"><meta property="og:url" content="{B}{path}"><meta property="og:locale" content="{'it_IT' if k=='it' else 'en_GB'}"><meta name="twitter:card" content="summary">
<script type="application/ld+json">{json.dumps(ld(k,path),ensure_ascii=False)}</script>
<link rel="canonical" href="{B}{path}"><link rel="alternate" hreflang="it" href="{B}{alt_it}"><link rel="alternate" hreflang="en" href="{B}{alt_en}"><link rel="alternate" hreflang="x-default" href="{B}{alt_it}">
<link rel="stylesheet" href="/v2/v2.css"></head><body>
<header class="top"><div class="wrap"><a href="{d['home']}">Mirko Tornani</a><span><a href="{d['v2']}" aria-current="page">{d['nav'][0]}</a><a href="{d['about']}">{d['nav'][1]}</a><a href="{d['alt']}" lang="{'en' if k=='it' else 'it'}">{d['nav'][2]}</a></span></div></header>
<main>{body}</main>
<footer><div class="wrap">Mirko Tornani · San Marino · <a href="mailto:mirkotornani@gmail.com">mirkotornani@gmail.com</a> · <a href="https://www.linkedin.com/in/mirkotornani">LinkedIn</a></div></footer>{extra}</body></html>
'''
def ld(k,path):
    return {"@context":"https://schema.org","@graph":[{"@type":"Person","@id":B+"/#mirko","name":"Mirko Tornani","jobTitle":"Football analyst / scout","url":B+"/","address":{"@type":"PostalAddress","addressLocality":"San Marino","addressCountry":"SM"},"hasCredential":{"@type":"EducationalOccupationalCredential","name":"UEFA B"},"sameAs":["https://www.linkedin.com/in/mirkotornani"],"knowsAbout":KA[k]},{"@type":"WebPage","url":B+path,"inLanguage":k,"about":{"@id":B+"/#mirko"}}]}
KA={"it":["Metodo Theseus","Calcio relazionale per compiti di zona","Scouting Lega Pro e dilettanti da fonti pubbliche","Scouting di talenti a bassa visibilità"],"en":["Theseus method","Relational football by zone tasks","Low-visibility talent scouting","Scouting Italian Serie C and amateur football from public sources"]}
sec=lambda h,ps:f"<h2>{h}</h2>"+"".join(f"<p>{p}</p>" for p in ps)
for k,d in T.items():
    zones={f"{t}-{l}":f"{THIRD[k][t]}, {LANE[k][l]}" for t in "dma" for l in "lcr"}
    data={"tasks":TASKS[k],"ctx":CTX[k],"zones":zones}
    b=f'<div class="wrap"><p class="kicker">{d["kicker"]}</p><h1>{d["h1"]}</h1><p class="lead">{d["lead"]}</p></div>'
    zb="".join(f'<button type="button" data-zone="{t}-{l}" aria-pressed="false" aria-label="{zones[t+"-"+l]}">{LANE_SHORT[k][l] if t=="a" else ""}</button>' for t in "amd" for l in "lcr")
    cb="".join(f'<button type="button" data-ctx="{c}" aria-pressed="false">{n}</button>' for c,n in CTX[k].items())
    fb=f'<div class="fallback"><h3>{d["fallback_h"]}</h3>'+"".join(f'<h3>{CTX[k][c]}</h3><ul>'+"".join(f'<li><b>{THIRD[k][z[0]]}, {"centro" if k=="it" and z[2]=="c" else ("fasce" if k=="it" else ("centre" if z[2]=="c" else "flanks"))}</b>: {"; ".join(v)}</li>' for z,v in TASKS[k][c].items())+'</ul>' for c in CTX[k])+'</div>'
    b+=f'''<section class="wide pitch-section" id="pitch-app" data-lang="{k}" aria-labelledby="ph"><h2 id="ph">{d["pitch_h"]}</h2>
<div class="ctx" role="group" aria-label="{'Momento' if k=='it' else 'Moment'}">{cb}</div>
<div class="pitch-grid"><div><div class="pitch" role="group" aria-label="{'Campo diviso in 9 zone' if k=='it' else 'Pitch split into 9 zones'}">{SVG}<div class="zones">{zb}</div></div><p class="illus">↑ {d["attack"]}</p></div>
<div><div class="panel" aria-live="polite"><p class="panel-title"></p><ul class="panel-list"></ul><p class="hint">{d["pitch_hint"]}</p></div>{fb}<p class="illus">{d["illus"]}</p></div></div></section>'''
    b+='<div class="wrap">'+"".join(sec(*x) for x in d['s'])
    b+=f"<h2>{d['m'][0]}</h2><ol>"+"".join(f"<li>{x}</li>" for x in d['m'][1])+"</ol>"
    b+=f"<h2>{d['art'][0]}</h2><ul class='artifacts'>"+"".join(f"<li><b>{a}</b>{t}<br><span class='status'>{d['status_label']}: {s}</span></li>" for a,t,s in d['art'][1])+"</ul>"
    b+=f"<h2>{d['lim'][0]}</h2><ul>"+"".join(f"<li>{x}</li>" for x in d['lim'][1])+"</ul>"
    b+=f"<p style='margin-top:48px'>{d['cta']} <a href='mailto:mirkotornani@gmail.com'>mirkotornani@gmail.com</a></p></div>"
    extra=f'<script type="application/json" id="pitch-data">{json.dumps(data,ensure_ascii=False)}</script><script src="/v2/pitch.js" defer></script>'
    open(d['v2'].strip('/')+"/index.html","w").write(page(k,d["title"],d['v2'],"/v2/","/en/v2/",b,extra))

AB={"it":dict(title="Mirko Tornani — Chi sono: allenatore UEFA B, scouting a bassa visibilità",meta="Mirko Tornani, San Marino: 15 anni da allenatore sul campo, 3-4 anni di tecnologia applicata al calcio. Metodo Theseus, calcio relazionale per compiti di zona, scouting Lega Pro e dilettanti da fonti pubbliche.",
h1="Mirko Tornani",lead="Allenatore UEFA B a San Marino. Lavoro sul metodo Theseus e sullo scouting di talenti a bassa visibilità da fonti pubbliche.",
s=[("Esperienza",["15 anni da allenatore sul campo, 3-4 anni di tecnologia applicata al calcio."]),("Credenziali",["Licenza UEFA B.","Scienze motorie, Università di Bologna."]),("Su cosa lavoro",["Metodo Theseus: come sostituire un giocatore senza perdere l'identità della squadra, partendo dai compiti per zona e contesto invece che dai ruoli fissi.","Calcio relazionale per compiti di zona: leggere la squadra come rete di compiti, non come elenco di posizioni.","Scouting in Lega Pro e nei dilettanti da fonti pubbliche: dove la visibilità è bassa e le informazioni vanno cercate e verificate."])],more="Vedi il metodo Theseus",contact="Contatti"),
"en":dict(title="Mirko Tornani — About: UEFA B coach, low-visibility talent scouting",meta="Mirko Tornani, San Marino: 15 years as a coach on the pitch, 3-4 years of technology applied to football. Theseus method, relational football by zone tasks, low-visibility talent scouting from public sources.",
h1="Mirko Tornani",lead="UEFA B coach based in San Marino. I work on the Theseus method and on low-visibility talent scouting from public sources.",
s=[("Experience",["15 years as a coach on the pitch, 3-4 years of technology applied to football."]),("Credentials",["UEFA B licence.","Sports science, University of Bologna."]),("What I work on",["The Theseus method: how to replace a player without losing the team's identity, starting from tasks by zone and context instead of fixed roles.","Relational football by zone tasks: reading a team as a network of tasks, not a list of positions.","Scouting Italian Serie C and amateur football from public sources: where visibility is low and information has to be found and checked."])],more="See the Theseus method",contact="Contact")}
for k,a in AB.items():
    d=dict(T[k]);d["meta"]=a["meta"];T[k]=d
    b=f'<div class="wrap"><p class="kicker">{"Chi sono" if k=="it" else "About"}</p><h1>{a["h1"]}</h1><p class="lead">{a["lead"]}</p>'+"".join(f"<h2>{h}</h2>"+"".join(f"<p>{p}</p>" for p in ps) for h,ps in a["s"])+f'<p><a href="{d["v2"]}">{a["more"]} →</a></p><h2>{a["contact"]}</h2><p><a href="mailto:mirkotornani@gmail.com">mirkotornani@gmail.com</a><br><a href="https://www.linkedin.com/in/mirkotornani">linkedin.com/in/mirkotornani</a></p></div>'
    h=page(k,a["title"],d["about"],"/about/","/en/about/",b).replace(f'<a href="{d["v2"]}" aria-current="page">',f'<a href="{d["v2"]}">').replace(f'<a href="{d["about"]}">',f'<a href="{d["about"]}" aria-current="page">',1)
    h=h.replace('href="/en/v2/" lang','href="/en/about/" lang') if k=="it" else h.replace('href="/v2/" lang','href="/about/" lang')
    open(d["about"].strip("/")+"/index.html","w").write(h)
