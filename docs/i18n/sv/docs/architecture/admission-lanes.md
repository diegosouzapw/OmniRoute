# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute har **två** processlokala körfältssystem med olika omfång. De är
kompletterande; operatörer bör veta vilket av dem de tittar på.

## 1. Bytebaserad processövergripande åtkomstkontroll (`chatBodyAdmission.ts`)

- **Omfång:** sökvägen för buffrade kroppar/heap-minne för `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` och de andra chattliknande routterna. Skyddar
  mot heap-amplifiering från stora kroppar från kodningsagenter (#4380).
- **En processglobal styrenhet, inte körfält per nyckel (#10110).** Varje API-nyckel
  (hashad) eller `anonymous`-session får åtkomst mot **samma** delade budget —
  det hashade sessions-id:t används ENDAST som en schemaläggningsnyckel för rättvisa
  (round-robin-fördelning mellan väntande), aldrig som en kapacitetspartition. En tidigare
  version av det här dokumentet beskrev körfält per nyckel med oberoende kapacitet; den modellen
  togs bort i #10110 eftersom den gjorde det möjligt för oautentiserade falska autentiseringsuppgifter
  att multiplicera den processövergripande gränsen.
- **Grind (#503-fanout): en automatiskt härledd BYTE-budget för inläsning, inte ett fast antal
  förfrågningar.** Det äldre taket `CHAT_MAX_HEAVY_IN_FLIGHT` för antalet förfrågningar (standardvärde `1`
  före den här korrigeringen) reducerade fan-out för kodningsagenter (flera underagenter/CLI:er,
  kroppar regelmässigt > 256 KB) till en faktisk samtidighet på ~1, vilket orsakade
  503-svar vid helt normal belastning. Det är nu endast bindande när en operatör uttryckligen
  anger `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Om det inte anges styrs åtkomsten i stället
  av `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — en budget som automatiskt härleds från
  processens faktiska minnesgräns (`src/shared/middleware/admissionBudget.ts`):
  25 % av den snävare gränsen av V8-heap-gränsen och en eventuell cgroup-/containergräns,
  dividerat med en faktor på 8x för tillfällig amplifiering, begränsat till mellan 8 MiB och
  2 GiB. Explicita åsidosättningar använder samma gränser. Detta skalas automatiskt från en
  container på 512 MB till en stationär dator med 32 GB utan justering av miljövariabler. En kropp som inte
  ryms inom den effektiva budgeten misslyckas omedelbart med `413 body_exceeds_budget`;
  endast resurskonkurrens mellan kroppar som var och en kan hanteras placeras i den begränsade
  rättvisekön. En aktiv resursbelastningsövervakare med flera signaler (V8-heap-kvot,
  cgroup, PSI, OOM-händelser — `open-sse/utils/resourcePressurePolicy.ts`) förkortar
  den begränsade väntetiden vid `high` belastning och avvisar omedelbart med
  `503 resource_pressure` vid `critical` belastning, innan några byte ens
  läses in.
- **Konfiguration:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — åsidosättning av den automatiskt härledda bytebudgeten
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — äldre tak för antalet förfrågningar, endast efter aktivt val
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — kötid före 503 (standardvärde 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — heap-ventil för köade byte (standardvärde 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — föråldrade
    no-op-inställningar sedan #10110 (godtas för konfigurationskompatibilitet men ignoreras)
- **Rapporter:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — inklusive
  tilläggen från #503-fanout: `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` och `countCapEnabled`
  (false i en standarddistribution — bekräftar att det är bytebudgeten, inte det äldre
  antalsgränstaket, som faktiskt är bindande).

## 2. Adaptiva virtuella körfält under körning (`open-sse/services/admission`)

- **Omfattning:** klientnyckelbaserad tillträdeskontroll för leverantörsdistribution — kökostnad, latensstyrd
  gränsanpassning, köbildning per körfält och mätvärden för körfält.
- **Aktivering:** **valfri.** Inaktiverad om inte `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Utan detta
  behåller den adaptiva styrenheten beteendet med en gemensam kö (kriterium 1 i #9654
  uppfylls först när en operatör aktiverar körfält).
- **Justering:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + adaptiv konfiguration (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Rapportering:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (ogenomskinliga körfälts-ID:n, aldrig råa
  nycklar) och `virtualLanes` — den auktoritativa flaggan i ögonblicksbilden för att ”körfält är aktiverade”.

## 3. Fan-out-prober — tillträdeskontroll per mål för combo/fusion (#9654 Wave 2)

Combo (prioritet/rundgång) och fusion förgrenar till N modellmål under en överordnad
begäran. Sedan #9654 Wave 2 **kontrolleras varje fan-out-mål före distribution** av en
prob per mål (`PerTargetAdmissionHook`, skapad av `createPerTargetAdmissionHook`)
mot den **överordnade begärans** klientkörfält.

- **Omfattning:** varje fan-out-mål som distribueras av combo, fusion och chaos-motorn.
  System 1 (på bytenivå) påverkas inte — det provar aldrig fan-out-mål.
- **Aktivering:** **valfri tillsammans med system 2.** Gör ingenting när `OMNIROUTE_CHAT_VIRTUAL_LANES`
  inte har angetts — den överordnade begäran innehar redan den gemensamma köns låsning i det läget,
  så sondering skulle dubbelräkna och avvisa combo-mål.
- **Semantik:**
  - **Strikt icke-blockerande — hoppa över, köa aldrig.** `maxWaitMs 0`: ett fullt körfält
    gör att målet hoppas över och combos reservmekanism (eller fusions överlevande
    panel) används i stället. Detta är avsiktligt: ett fan-out-mål är redundant
    arbete, och att köa det lägger ytterligare belastning på exakt den överbelastning som körfält
    är avsedda att stoppa. `defaultMaxWaitMs` gäller därför **endast den överordnade begäran**;
    fan-out-prober väntar aldrig, och det finns avsiktligt **ingen inställning** för att få
    dem att vänta (ärendehistoriken visar att vänteinställningar orsakade den typ av omfattande 502/504-fel
    som #9654 förhindrar — ompröva endast om en operatör rapporterar att överhoppade fan-out-mål
    försämrar svarskvaliteten).
  - **Frisläpp vid godkännande.** En godkänd prob frisläpper sin låsning omedelbart: den är
    en kapacitetsgrind, inte en reservation. Den överordnade begärans låsning täcker fan-out-processen; att behålla N
    ytterligare skulle blåsa upp den gemensamma aktiva kostnaden och avvisa andra klienter. Detta sker enligt bästa förmåga,
    inte som en reservation: körfältet kan fyllas igen mellan proben och distributionen, så vid
    hög konkurrens kan grinden släppa igenom till ett körfält som är fullt igen när
    målet distribueras.
  - **Prissatt utifrån det verkliga fan-out-innehållet.** Proben uppskattar kostnaden utifrån
    målets faktiska innehåll — inklusive begärandeklassen som härleds från dess `stream`-
    flagga, precis som för den överordnade sökvägen — så att medlemmar i fusionspanelen (`stream: false`)
    prissätts enligt den icke-strömmande klass de faktiskt kommer att belasta, och prioritets-/RR-
    mål enligt vad användaren begärde.
- **Rapportering:** när en prob hoppar över ett mål efter det första ökas combos `fallbackCount`
  per begäran (i linje med den befintliga reservsemantiken; synligt i combo-
  loggar); fusion returnerar 503 när varje panelmedlem hoppas över. Det finns
  **ingen aggregerad räknare** (t.ex. `virtualFanoutSkipped`) i ögonblicksbilden i nuläget —
  om en operatör rapporterar att det inte går att avgöra hur ofta körfältsgrinden hoppar över fan-out-
  mål är det utlösaren för att lägga till en sådan.

## Vilken som visas i en instrumentpanel

- `adaptiveAdmission.laneCount` / `laneTenants` → **adaptiva virtuella körfält** (system 2).
- `adaptiveAdmission.virtualLanes === true` → fan-out-proberna i avsnitt 3 är
  också aktiva. En nyttolast där `virtualLanes` saknas eller är `false` innebär
  att `OMNIROUTE_CHAT_VIRTUAL_LANES` inte är angiven – körfälten på bytenivå
  (system 1) är fortfarande aktiva, men inget under `adaptiveAdmission` (och
  ingen fan-out-begränsning) träder i kraft förrän funktionen aktiveras.

## Varför båda finns

Körfälten på bytenivå begränsar den minneskrävande sökvägen för parsning/komprimering,
medan de adaptiva körfälten begränsar dispatchkostnaden per klientorganisation. Kriterium
1 i #9654 (”en sessions trafikspik leder inte till 503 för en annan”) upprätthålls
ovillkorligen av system 1 och av system 2 när det uttryckligen har aktiverats.

## 4. Lång `/v1/responses` i en process (healthy-headroom)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) lade till
`tryAcquireHealthyHeadroom` så att en andra strukturellt tung begäran släpps
igenom när heapen ligger under `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`.
BYTE-sökvägen som används av `admitChatRequest` (meddelandetexter ≥
`OMNIROUTE_CHAT_LARGE_BODY_BYTES`, standardvärde 256 KiB, inklusive
`POST /v1/responses`) använder **samma** undantag.

Det här är den stödda lösningen med **en process** för fler än två samtidiga,
långvariga SSE-anslutningar till `/v1/responses`: höj den primära gränsen +
healthy-headroom endast så långt som heapen och den processomfattande budgeten
för antal byte under behandling (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110)
tillåter. Tiotals långvariga SSE-klienter (40–50) är en fråga om denna
minnesbudget, inte en hård produktgräns på ”max 2”. En hårt belastad heap
avvisar fortfarande begäranden med ett återförsökbart `503`, så att #7849
inte återkommer.

För att **multiplicera heapar** kör du N oberoende `DATA_DIR`:er (#11024).
Kör aldrig `replicas > 1` mot en och samma SQLite-fil (#10350). Det här
avsnittet innebär inte att lösningen för utskalning med DATA_DIR tas upp på
nytt.
