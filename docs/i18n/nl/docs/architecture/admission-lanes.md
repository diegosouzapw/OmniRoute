# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute heeft **twee** proceslokale lane-systemen met verschillende bereiken. Ze zijn
complementair; operators moeten weten naar welk systeem ze kijken.

## 1. Procesbrede toelating op byteniveau (`chatBodyAdmission.ts`)

- **Bereik:** het pad voor gebufferde bodies/heap voor `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` en de andere chatachtige routes. Beschermt
  tegen heap-amplificatie door grote bodies van coding-agents (#4380).
- **Eén procesglobale controller, geen lanes per sleutel (#10110).** Elke API-sleutel
  (gehasht) of `anonymous`-sessie wordt toegelaten op basis van hetzelfde
  gedeelde budget — de gehashte sessie-id wordt ALLEEN gebruikt als sleutel voor
  eerlijke planning (round-robinverwerking van wachtenden), nooit als capaciteitsshard.
  Een eerdere versie van dit document beschreef lanes per sleutel met onafhankelijke
  capaciteit; dat model is in #10110 verwijderd omdat niet-geverifieerde
  nepcredentials daarmee de procesbrede limiet konden vermenigvuldigen.
- **Poort (#503-fanout): een automatisch afgeleid BYTE-budget voor ingestie, geen vast
  aantal requests.** De verouderde limiet voor het aantal requests
  `CHAT_MAX_HEAVY_IN_FLIGHT` (standaard `1` vóór deze correctie) reduceerde
  fan-out van coding-agents (meerdere subagents/CLI's, bodies doorgaans > 256 KB)
  tot een effectieve gelijktijdigheid van ~1, wat bij volkomen normale belasting
  tot 503-responses leidde. Deze limiet is nu alleen van toepassing wanneer een
  operator `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` expliciet instelt. Als deze niet
  is ingesteld, wordt toelating in plaats daarvan begrensd door
  `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — een budget dat automatisch wordt afgeleid
  van de werkelijke geheugenlimiet van het proces
  (`src/shared/middleware/admissionBudget.ts`): 25% van de laagste waarde van de
  V8-heaplimiet en een eventuele cgroup-/containerlimiet, gedeeld door een
  factor 8 voor tijdelijke amplificatie en begrensd tussen 8 MiB en 2 GiB.
  Expliciete overrides gebruiken dezelfde begrenzingen. Dit schaalt zichzelf van
  een container van 512 MB tot een desktop met 32 GB, zonder afstemming via
  omgevingsvariabelen. Een body die niet binnen het effectieve budget past,
  mislukt onmiddellijk met `413 body_exceeds_budget`; alleen concurrentie tussen
  bodies die afzonderlijk verwerkt kunnen worden, komt in de begrensde wachtrij
  met eerlijke planning terecht. Een live tracker voor resourcebelasting op basis
  van meerdere signalen (V8-heapverhouding, cgroup, PSI, OOM-events —
  `open-sse/utils/resourcePressurePolicy.ts`) verkort de begrensde wachttijd bij
  `high` belasting en weigert onmiddellijk met `503 resource_pressure` bij
  `critical` belasting, nog voordat er bytes worden ingelezen. PSI wordt, indien
  aanwezig, uit `memory.pressure` van de cgroup van deze unit gelezen
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` geldt
  voor de hele host en wordt alleen als fallback gebruikt op bare metal / cgroup
  v1, zodat een host die aan het swappen is geen 503 kan veroorzaken voor een
  inactieve container.
- **Afstemming:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — override voor het automatisch afgeleide bytebudget
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — verouderde limiet voor het aantal requests, uitsluitend opt-in
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — wachttijd in de wachtrij vóór 503 (standaard 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — heapklep voor bytes in de wachtrij (standaard 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — verouderde
    no-ops sinds #10110 (geaccepteerd voor configuratiecompatibiliteit, genegeerd)
- **Rapportage:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — inclusief
  de toevoegingen uit #503-fanout: `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` en `countCapEnabled`
  (false bij een standaardimplementatie — bevestigt dat het bytebudget, en niet
  de verouderde limiet op het aantal requests, daadwerkelijk de begrenzende
  factor is).

## 2. Adaptieve virtuele runtimelanes (`open-sse/services/admission`)

- **Bereik:** toelating op basis van tenantsleutels voor providerdispatch — wachtrijkosten, latentieg gestuurde
  limietaanpassing, lane-wachtrijen en lane-metrieken.
- **Schakelaar:** **opt-in.** Uitgeschakeld tenzij `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Zonder deze instelling
  behoudt de adaptieve controller het gedrag van de gedeelde wachtrij (criterium 1 van #9654 geldt alleen
  zodra een beheerder lanes inschakelt).
- **Afstemming:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + adaptieve configuratie (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Rapportage:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (ondoorzichtige lane-ID's, nooit onbewerkte
  sleutels) en `virtualLanes` — de gezaghebbende vlag in de momentopname die aangeeft dat lanes zijn ingeschakeld.

## 3. Fan-out-probes — toelating per target voor combo/fusion (#9654 Wave 2)

Combo (prioriteit / round-robin) en fusion voeren een fan-out uit naar N modeltargets binnen één bovenliggende
request. Sinds #9654 Wave 2 wordt **elk fan-out-target vóór dispatch gecontroleerd** door een
probe per target (`PerTargetAdmissionHook`, opgebouwd door `createPerTargetAdmissionHook`)
tegen de tenantlane van de **bovenliggende request**.

- **Bereik:** elk fan-out-target dat door combo, fusion en de chaos-engine wordt gedispatcht.
  Systeem 1 (op byteniveau) blijft ongewijzigd — dit voert nooit probes op fan-out-targets uit.
- **Schakelaar:** **opt-in met systeem 2.** Een no-op wanneer `OMNIROUTE_CHAT_VIRTUAL_LANES`
  niet is ingesteld — de bovenliggende request houdt in die modus al de lease voor de gedeelde wachtrij vast,
  waardoor probes dubbel zouden tellen en combo-targets zouden afwijzen.
- **Semantiek:**
  - **Strikt niet-blokkerend — overslaan, nooit in de wachtrij plaatsen.** `maxWaitMs 0`: een volle lane
    slaat het target over, waarna het fallbackmechanisme van combo (of het paneel met overblijvende
    targets van fusion) het overneemt. Dit is opzettelijk: een fan-out-target is redundant
    werk, en door dit in de wachtrij te plaatsen wordt de exacte congestie die lanes moeten
    voorkomen alleen maar verder belast. `defaultMaxWaitMs` geldt daarom uitsluitend voor de **bovenliggende request**;
    fan-out-probes wachten nooit en er is bewust **geen configuratieoptie** om
    ze te laten wachten (de issuegeschiedenis laat zien dat wachtopties de klasse van grootschalige 502/504-fouten
    veroorzaakten die #9654 voorkomt — alleen heroverwegen als een beheerder meldt dat overgeslagen fan-out-targets
    de kwaliteit van responses schaden).
  - **Vrijgeven bij toelating.** Een toegelaten probe geeft de lease onmiddellijk vrij: het is
    een capaciteitspoort, geen vasthoudmechanisme. De lease van de bovenliggende request dekt de fan-out; N
    extra leases vasthouden zou de gedeelde actieve kosten opblazen en andere tenants afwijzen. Best-effort,
    geen reservering: de lane kan tussen de probe en dispatch opnieuw vollopen, waardoor
    de poort bij zware concurrentie een target kan toelaten in een lane die weer vol is tegen de
    tijd dat het target wordt gedispatcht.
  - **Geprijsd op basis van de daadwerkelijke fan-out-body.** De probe schat de kosten op basis van de
    daadwerkelijke body van het target — inclusief de requestklasse die van de `stream`-vlag is afgeleid,
    precies zoals bij het bovenliggende pad — zodat leden van het fusionpaneel (`stream: false`)
    worden geprijsd volgens de niet-streamende klasse die ze daadwerkelijk zullen innemen, en prioriteits-/RR-
    targets volgens wat de gebruiker heeft aangevraagd.
- **Rapportage:** wanneer een probe na het eerste target wordt overgeslagen, wordt de `fallbackCount`
  per request van combo verhoogd (conform de bestaande fallbacksemantiek; zichtbaar in combo-
  logs); fusion retourneert 503 wanneer elk paneellid wordt overgeslagen. Er is
  momenteel **geen geaggregeerde teller** (bijv. `virtualFanoutSkipped`) in de momentopname —
  als een beheerder meldt niet te kunnen zien hoe vaak de lanepoort fan-out-
  targets overslaat, is dat het signaal om er een toe te voegen.

## Welke in een dashboard wordt weergegeven

- `adaptiveAdmission.laneCount` / `laneTenants` → **adaptieve virtuele lanes** (systeem 2).
- `adaptiveAdmission.virtualLanes === true` → de fan-out-probes uit sectie 3 zijn
  ook actief. Een payload waarin `virtualLanes` ontbreekt of `false` is, betekent
  dat `OMNIROUTE_CHAT_VIRTUAL_LANES` niet is ingesteld — de lanes op byteniveau
  (systeem 1) zijn nog steeds actief, maar niets onder `adaptiveAdmission` (en
  geen fan-out-begrenzing) is van kracht totdat dit wordt ingeschakeld.

## Waarom beide bestaan

De lanes op byteniveau begrenzen het geheugenzware parseer-/compressiepad; de adaptieve lanes
begrenzen de dispatchkosten per tenant. Criterium 1 van #9654 ("de piekbelasting van één sessie leidt niet tot een 503
voor een andere") wordt onvoorwaardelijk afgedwongen door systeem 1 en door systeem 2 zodra opt-in is ingeschakeld.

## 4. Langdurige `/v1/responses` in één proces (gezonde headroom)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) heeft
`tryAcquireHealthyHeadroom` toegevoegd, zodat een tweede structureel zware aanvraag wordt toegelaten
wanneer de heap zich onder `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` bevindt. Het BYTE-pad
dat wordt gebruikt door `admitChatRequest` (bodies ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
standaard 256 KiB, inclusief `POST /v1/responses`) gebruikt **dezelfde** uitwijkmogelijkheid.

Dit is de ondersteunde aanpak voor **één proces** om meer dan twee gelijktijdige, langdurige
SSE-verbindingen met `/v1/responses` af te handelen: verhoog de primaire capaciteit + gezonde headroom slechts zover als de heap
en het procesbrede budget voor bytes van lopende aanvragen (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110) toelaten. Tientallen langdurige SSE-clients (40–50) zijn een kwestie van
dat geheugenbudget, niet van een harde productlimiet van “maximaal 2”. Een heap onder druk blijft aanvragen
afwijzen met een opnieuw te proberen `503`, zodat #7849 niet terugkeert.

Om het aantal **heaps te vermenigvuldigen**, voert u N onafhankelijke `DATA_DIR`s uit (#11024). Gebruik nooit
`replicas > 1` voor één SQLite-bestand (#10350). Deze sectie heropent niet
de scale-out-aanpak met DATA_DIR.
