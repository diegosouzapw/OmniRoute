# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute dispone di **due** sistemi di corsie locali al processo con ambiti differenti. Sono
complementari; gli operatori devono sapere quale dei due stanno osservando.

## 1. Ammissione a livello di byte per l'intero processo (`chatBodyAdmission.ts`)

- **Ambito:** il percorso del body memorizzato nel buffer/heap per `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` e le altre route strutturate come chat. Protegge
  dall'amplificazione dell'heap causata dai body di grandi dimensioni degli agenti di programmazione (#4380).
- **Un unico controller globale per processo, non corsie per chiave (#10110).** Ogni chiave API
  (sottoposta a hash) o sessione `anonymous` viene ammessa rispetto allo **stesso** budget condiviso:
  l'ID sessione sottoposto a hash viene usato SOLO come chiave di pianificazione equa (invio round-robin
  tra le richieste in attesa), mai come partizione della capacità. Una versione precedente di questo
  documento descriveva corsie per chiave con capacità indipendente; quel modello è stato
  rimosso in #10110 perché consentiva a credenziali false non autenticate di moltiplicare
  il limite dell'intero processo.
- **Controllo (#503-fanout): un budget di acquisizione in BYTE derivato automaticamente, non un conteggio
  fisso delle richieste.** Il limite precedente basato sul conteggio delle richieste
  `CHAT_MAX_HEAVY_IN_FLIGHT` (valore predefinito `1` prima di questa correzione) riduceva il fan-out
  degli agenti di programmazione (più sottoagenti/CLI, con body abitualmente > 256 KB) a una concorrenza
  effettiva di ~1, causando risposte 503 con un carico del tutto normale. Ora viene applicato solo quando
  un operatore imposta esplicitamente `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Se non impostato, l'ammissione
  è invece controllata da `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, un budget derivato automaticamente dal
  limite di memoria reale del processo (`src/shared/middleware/admissionBudget.ts`):
  il 25% del più restrittivo tra il limite dell'heap V8 e qualsiasi limite di cgroup/container,
  diviso per un fattore di amplificazione transitoria pari a 8x, con un valore compreso tra 8 MiB e
  2 GiB. Le sostituzioni esplicite usano gli stessi limiti. Il budget si ridimensiona automaticamente
  da un container da 512 MB a un desktop da 32 GB senza configurare variabili di ambiente. Un body che
  non può rientrare nel budget effettivo genera immediatamente `413 body_exceeds_budget`;
  solo la contesa tra body gestibili singolarmente entra nella coda di equità limitata.
  Un sistema attivo di monitoraggio della pressione sulle risorse basato su più segnali (rapporto dell'heap V8,
  cgroup, PSI, eventi OOM — `open-sse/utils/resourcePressurePolicy.ts`) riduce
  l'attesa limitata in condizioni di pressione `high` e rifiuta immediatamente le richieste con
  `503 resource_pressure` in condizioni di pressione `critical`, prima ancora che venga acquisito
  qualsiasi byte. Quando disponibile, PSI viene letto dal file `memory.pressure` del cgroup di questa unità
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` si riferisce
  all'intero host e viene usato solo come fallback su bare metal/cgroup v1, affinché un host
  che usa lo swap non possa causare risposte 503 in un container inattivo.
- **Configurazione:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — sostituzione del budget in byte derivato automaticamente
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — limite precedente basato sul conteggio delle richieste, solo con attivazione esplicita
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — attesa in coda prima di una risposta 503 (valore predefinito: 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — valvola dell'heap per i byte in coda (valore predefinito: 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — deprecate
    e senza effetto da #10110 (accettate per compatibilità della configurazione, ma ignorate)
- **Report:** `GET /api/monitoring/health` → `chatAdmission` (#11244), incluse
  le aggiunte di #503-fanout `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` e `countCapEnabled`
  (false in una distribuzione predefinita: conferma che a essere effettivamente vincolante è il budget
  in byte, non il precedente limite basato sul conteggio).

## 2. Corsie virtuali adattive a runtime (`open-sse/services/admission`)

- **Ambito:** ammissione basata sulla chiave del tenant per l'inoltro ai provider — costo della coda, adattamento dei limiti guidato dalla latenza, accodamento nelle corsie e metriche delle corsie.
- **Abilitazione:** **opt-in.** Disabilitate a meno che `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Senza questa impostazione,
  il controller adattivo mantiene il comportamento della coda condivisa (il criterio 1 di #9654
  è soddisfatto solo dopo che un operatore abilita le corsie).
- **Configurazione:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + configurazione adattiva (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Report:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (ID di corsia opachi, mai chiavi
  non elaborate) e `virtualLanes` — il flag autorevole "le corsie sono attive" nello snapshot.

## 3. Probe fan-out — ammissione per destinazione per combo/fusion (#9654 Wave 2)

Combo (priorità / round-robin) e fusion eseguono il fan-out su N destinazioni di modello nell'ambito di un'unica richiesta
padre. A partire da #9654 Wave 2, **ogni destinazione del fan-out viene sottoposta a controllo prima dell'inoltro** tramite un
probe per destinazione (`PerTargetAdmissionHook`, creato da `createPerTargetAdmissionHook`)
rispetto alla corsia del tenant della richiesta **padre**.

- **Ambito:** ogni destinazione del fan-out inoltrata da combo, fusion e dal motore chaos.
  Il sistema 1 (a livello di byte) non è interessato: non esegue mai probe sulle destinazioni del fan-out.
- **Abilitazione:** **opt-in con il sistema 2.** Non esegue alcuna operazione quando `OMNIROUTE_CHAT_VIRTUAL_LANES`
  non è impostata: in tale modalità, la richiesta padre detiene già il lease della coda condivisa,
  quindi l'esecuzione del probe comporterebbe un doppio conteggio e il rifiuto delle destinazioni combo.
- **Semantica:**
  - **Rigorosamente non bloccante: ignora, senza mai accodare.** `maxWaitMs 0`: una corsia piena
    fa ignorare la destinazione e al suo posto interviene il meccanismo di fallback di combo
    (o il pannello dei sopravvissuti di fusion). Si tratta di una scelta intenzionale: una destinazione del fan-out rappresenta
    lavoro ridondante e accodarla aggiunge ulteriore carico proprio alla congestione che le corsie sono state
    introdotte per arrestare. `defaultMaxWaitMs` si applica pertanto **solo alla richiesta padre**;
    i probe del fan-out non attendono mai e intenzionalmente **non esiste alcun parametro** che consenta
    loro di attendere (la cronologia del problema mostra che i parametri di attesa hanno prodotto la classe di errori 502/504 di massa
    che #9654 previene: rivalutare solo se un operatore segnala che le destinazioni del fan-out ignorate
    compromettono la qualità della risposta).
  - **Rilascio all'ammissione.** Un probe ammesso rilascia immediatamente il proprio lease: è
    un controllo di capacità, non un blocco della capacità. Il lease della richiesta padre copre il fan-out; trattenerne altri N
    gonfierebbe il costo attivo condiviso e causerebbe il rifiuto di altri tenant. È un controllo best-effort,
    non una prenotazione: la corsia può riempirsi nuovamente tra il probe e l'inoltro, quindi, in condizioni
    di forte contesa, il controllo può concedere l'ammissione in una corsia che risulta nuovamente piena nel
    momento in cui la destinazione viene inoltrata.
  - **Costo calcolato dal corpo reale del fan-out.** Il probe stima il costo a partire dal
    corpo effettivo della destinazione, inclusa la classe della richiesta derivata dal relativo flag `stream`,
    esattamente come nel percorso padre, quindi ai membri del pannello fusion (`stream: false`)
    viene attribuito il costo della classe non streaming che occuperanno realmente, mentre alle destinazioni priority/RR
    viene attribuito il costo corrispondente a quanto richiesto dall'utente.
- **Report:** un probe ignorato dopo la prima destinazione incrementa il `fallbackCount` per richiesta
  di combo (rispecchiando la semantica di fallback esistente; visibile nei log di combo);
  fusion restituisce 503 quando ogni membro del pannello viene ignorato. Attualmente
  **non esiste alcun contatore aggregato** (ad es. `virtualFanoutSkipped`) nello snapshot:
  se un operatore segnala di non riuscire a determinare con quale frequenza il controllo della corsia ignori le destinazioni del fan-out,
  questo costituisce il motivo per aggiungerne uno.

## Quale sistema viene mostrato in una dashboard

- `adaptiveAdmission.laneCount` / `laneTenants` → **corsie virtuali adattive** (sistema 2).
- `adaptiveAdmission.virtualLanes === true` → sono attivi anche i probe fan-out della sezione 3. Un payload in cui `virtualLanes` è assente o impostato su `false` indica che `OMNIROUTE_CHAT_VIRTUAL_LANES` non è impostata: le corsie a livello di byte (sistema 1) sono ancora attive, ma nulla sotto `adaptiveAdmission` (e nessun gating fan-out) è operativo finché non viene abilitato.

## Perché esistono entrambi

Le corsie a livello di byte limitano il percorso di parsing/compressione ad alto consumo di memoria; le corsie adattive limitano il costo di dispatch per tenant. Il criterio 1 di #9654 ("il picco di una sessione non causa un errore 503 per un'altra") viene applicato incondizionatamente dal sistema 1 e dal sistema 2 una volta abilitato tramite opt-in.

## 4. `/v1/responses` di lunga durata in un singolo processo (margine di capacità in condizioni normali)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) ha aggiunto `tryAcquireHealthyHeadroom`, affinché una seconda richiesta strutturalmente pesante venga accettata quando l'heap è al di sotto di `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Il percorso BYTE utilizzato da `admitChatRequest` (corpi ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`, valore predefinito 256 KiB, incluso `POST /v1/responses`) usa lo **stesso** meccanismo di deroga.

Questa è la procedura supportata per un **singolo processo** per gestire più di due connessioni SSE `/v1/responses` di lunga durata simultanee: aumentare il limite primario e il margine di capacità in condizioni normali solo nella misura consentita dall'heap e dal budget dei byte in transito a livello di processo (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). La gestione di decine di client SSE di lunga durata (40–50) dipende da tale budget di memoria, non da un limite rigido del prodotto pari a “massimo 2”. Un heap sotto pressione continua a rifiutare richieste con un errore `503` ritentabile, impedendo il ripresentarsi di #7849.

Per **moltiplicare gli heap**, eseguire N `DATA_DIR` indipendenti (#11024). Non usare mai `replicas > 1` su un unico file SQLite (#10350). Questa sezione non riapre la procedura di scalabilità orizzontale basata su DATA_DIR.
