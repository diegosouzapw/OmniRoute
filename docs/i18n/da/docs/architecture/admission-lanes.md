# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute har **to** proceslokale banesystemer med forskellige anvendelsesområder. De er
komplementære; operatører bør vide, hvilket af dem de ser på.

## 1. Bytebaseret adgangskontrol på procesniveau (`chatBodyAdmission.ts`)

- **Omfang:** stien for bufferlagrede bodies/heap for `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` og de øvrige chatlignende ruter. Beskytter
  mod heap-forstærkning fra store bodies fra kodeagenter (#4380).
- **Én procesglobal controller, ikke baner pr. nøgle (#10110).** Hver API-nøgle
  (hashed) eller `anonymous`-session får adgang ud fra det **samme** delte budget —
  det hashede sessions-id bruges KUN som en planlægningsnøgle til fairness
  (round-robin-fordeling blandt ventende), aldrig som en kapacitetsshard. En tidligere
  version af dette dokument beskrev baner pr. nøgle med uafhængig kapacitet; den model
  blev fjernet i #10110, fordi den gjorde det muligt for falske, ikke-godkendte
  legitimationsoplysninger at multiplicere den procesomfattende grænse.
- **Gate (#503-fanout): et automatisk afledt BYTE-budget til indlæsning, ikke et fast
  antal requests.** Det ældre request-antalsloft `CHAT_MAX_HEAVY_IN_FLIGHT` (standard `1`
  før denne rettelse) reducerede fan-out for kodeagenter (flere underagenter/CLI'er,
  bodies rutinemæssigt > 256 KB) til en effektiv samtidighed på ~1, hvilket gav
  503-fejl under helt normal belastning. Det er nu kun bindende, når en operatør eksplicit
  angiver `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Hvis det ikke er angivet, styres adgangen
  i stedet af `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — et budget, der automatisk afledes af
  processens reelle hukommelsesgrænse (`src/shared/middleware/admissionBudget.ts`):
  25 % af den laveste grænse mellem V8-heapgrænsen og en eventuel cgroup-/containergrænse,
  divideret med en faktor på 8x for midlertidig forstærkning og begrænset til mellem 8 MiB og
  2 GiB. Eksplicitte tilsidesættelser bruger de samme grænser. Dette skalerer automatisk fra en
  container på 512 MB til en desktop med 32 GB uden tilpasning af miljøvariabler. En body, der
  ikke kan rummes inden for det effektive budget, afvises straks med `413 body_exceeds_budget`;
  kun konkurrence mellem bodies, der hver især kan håndteres, placeres i den begrænsede
  fairness-kø. En aktiv ressourcepres-tracker med flere signaler (V8-heapforhold,
  cgroup, PSI, OOM-hændelser — `open-sse/utils/resourcePressurePolicy.ts`) forkorter
  den begrænsede ventetid under `high` pres og afviser straks med
  `503 resource_pressure` under `critical` pres, før nogen bytes overhovedet
  indlæses. PSI læses fra denne enheds cgroup `memory.pressure`, når den findes
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` gælder
  for hele værten og bruges kun som fallback på bare metal / cgroup v1, så en vært,
  der swapper, ikke kan udløse en 503-fejl i en inaktiv container.
- **Justering:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — tilsidesættelse af det automatisk afledte bytebudget
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — ældre request-antalsloft, kun ved tilvalg
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — køventetid før 503 (standard 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — heap-ventil for bytes i kø (standard 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — forældede
    no-ops siden #10110 (accepteres af hensyn til konfigurationskompatibilitet, ignoreres)
- **Rapporter:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — inklusive
  tilføjelserne fra #503-fanout: `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` og `countCapEnabled`
  (false i en standardinstallation — bekræfter, at bytebudgettet, og ikke det ældre
  antalsloft, er det, der faktisk er bindende).

## 2. Adaptive virtuelle lanes ved kørsel (`open-sse/services/admission`)

- **Omfang:** adgangskontrol pr. tenant-nøgle til provider-dispatch — køomkostning, latenstidsstyret
  grænsetilpasning, lane-kødannelse og lane-metrics.
- **Aktivering:** **tilvalg.** Deaktiveret, medmindre `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Uden dette
  bevarer den adaptive controller funktionsmåden med den delte kø (kriterium 1 i #9654 er kun
  opfyldt, når en operatør aktiverer lanes).
- **Justering:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + adaptiv konfiguration (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Rapportering:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (uigennemsigtige lane-id'er, aldrig rå
  nøgler) og `virtualLanes` — det autoritative flag i snapshot'et for, at "lanes er slået til".

## 3. Fan-out-probes — adgangskontrol pr. mål for combo/fusion (#9654 Wave 2)

Combo (prioritet / round-robin) og fusion fordeler til N modelmål under én overordnet
anmodning. Siden #9654 Wave 2 bliver **hvert fan-out-mål adgangskontrolleret før dispatch** af en
probe pr. mål (`PerTargetAdmissionHook`, oprettet af `createPerTargetAdmissionHook`)
mod den **overordnede anmodnings** tenant-lane.

- **Omfang:** hvert fan-out-mål, der dispatches af combo, fusion og chaos-motoren.
  System 1 (på byte-niveau) påvirkes ikke — det prober aldrig fan-out-mål.
- **Aktivering:** **tilvalg sammen med system 2.** En no-op, når `OMNIROUTE_CHAT_VIRTUAL_LANES`
  ikke er angivet — den overordnede anmodning har allerede leasen til den delte kø i denne tilstand,
  så probing ville dobbelttælle og afvise combo-mål.
- **Semantik:**
  - **Strengt ikke-blokerende — spring over, sæt aldrig i kø.** `maxWaitMs 0`: en fuld lane
    får målet til at blive sprunget over, hvorefter comboens fallback-mekanisme (eller fusions
    panel af overlevende) håndterer anmodningen i stedet. Dette er bevidst: et fan-out-mål er
    redundant arbejde, og kødannelse for det lægger mere belastning på præcis den overbelastning,
    som lanes skal forhindre. `defaultMaxWaitMs` gælder derfor kun for **den overordnede anmodning**;
    fan-out-probes venter aldrig, og der findes bevidst **ingen indstilling**, der kan få
    dem til at vente (historikken for issuet viser, at venteindstillinger frembragte den klasse
    af massevise 502/504-fejl, som #9654 forhindrer — genovervej kun dette, hvis en operatør rapporterer,
    at oversprungne fan-out-mål forringer svarkvaliteten).
  - **Frigivelse ved godkendelse.** En godkendt probe frigiver straks sin lease: den er
    en kapacitetskontrol, ikke en reservation. Den overordnede anmodnings lease dækker fan-out-processen;
    at holde N yderligere ville øge den delte aktive omkostning og afvise andre tenants. Best-effort,
    ikke en reservation: lanen kan blive fyldt igen mellem probe og dispatch, så kontrollen under
    høj konkurrence kan godkende adgang til en lane, der er fuld igen, når
    målet dispatches.
  - **Prissat ud fra den faktiske fan-out-body.** Proben estimerer omkostningen ud fra
    målets faktiske body — inklusive anmodningsklassen, der er afledt af dets `stream`-
    flag, præcis som i den overordnede sti — så medlemmer af fusion-panelet (`stream: false`)
    prissættes efter den ikke-streamende klasse, de reelt vil optage, og prioritets-/RR-
    mål efter det, brugeren har anmodet om.
- **Rapportering:** hvis en probe springes over efter det første mål, øges comboens
  `fallbackCount` pr. anmodning (i overensstemmelse med den eksisterende fallback-semantik; synligt i combo-
  logs); fusion returnerer 503, når hvert panelmedlem springes over. Der er
  **ingen aggregeret tæller** (f.eks. `virtualFanoutSkipped`) i snapshot'et i dag —
  hvis en operatør rapporterer, at vedkommende ikke kan se, hvor ofte lane-kontrollen springer fan-out-
  mål over, er det udløsende faktor for at tilføje en.

## Hvilken der vises i et dashboard

- `adaptiveAdmission.laneCount` / `laneTenants` → **adaptive virtuelle baner** (system 2).
- `adaptiveAdmission.virtualLanes === true` → fan-out-proberne fra afsnit 3 er
  også aktive. En payload, hvor `virtualLanes` mangler eller er `false`, betyder,
  at `OMNIROUTE_CHAT_VIRTUAL_LANES` ikke er angivet — banerne på byte-niveau (system 1)
  er stadig aktive, men intet under `adaptiveAdmission` (og ingen fan-out-adgangskontrol)
  er i kraft, før det aktiveres.

## Hvorfor begge findes

Banerne på byte-niveau begrænser den hukommelseskrævende parse-/komprimeringssti; de adaptive baner
begrænser afsendelsesomkostningen pr. tenant. Kriterium 1 i #9654 ("én sessions belastningsspids medfører ikke en 503-fejl
for en anden") håndhæves ubetinget af system 1 og af system 2, når tilvalg er aktiveret.

## 4. Langvarig `/v1/responses` i én proces (sund reservekapacitet)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) tilføjede
`tryAcquireHealthyHeadroom`, så endnu en strukturelt tung request tillades,
når heapen er under `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. BYTE-stien,
som bruges af `admitChatRequest` (request bodies ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
som standard 256 KiB, herunder `POST /v1/responses`), bruger den **samme** undtagelse.

Dette er den understøttede opskrift med **én proces** til mere end to samtidige,
langvarige SSE-requests til `/v1/responses`: Hæv kun den primære kapacitet og den sunde
reservekapacitet så meget, som heapen og det procesomfattende budget for bytes under
behandling (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) tillader. Titusindvis af
langvarige SSE-klienter (40–50) er et spørgsmål om dette hukommelsesbudget, ikke en
fast produktgrænse på "maks. 2". En belastet heap afviser stadig requests med en
`503`-fejl, der kan forsøges igen, så #7849 ikke vender tilbage.

Hvis heap-kapaciteten skal **mangedobles**, skal der køres N uafhængige `DATA_DIR`-instanser
(#11024). Brug aldrig `replicas > 1` med én SQLite-fil (#10350). Dette afsnit
genåbner ikke opskriften til skalering via DATA_DIR.
