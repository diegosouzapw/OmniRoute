# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Det här dokumentet beskriver den feedbackdrivna grunden för adaptiv routning som lagts till i
OmniRoute. Den är avsiktligt liten: den introducerar en typad kanal för
routningsutfall, en kontinuerlig kvalitetssignal som matar den befintliga poängsättaren
för automatiska kombinationer, en valfri OpenTelemetry-exportör och en slutpunkt för
förklarbarhet. Den ersätter **inte** den befintliga resiliensstacken (circuit breaker,
anslutnings-cooldown, modellspärr, hälsomatris, autopilot) — den kompletterar den.

## 1. Arkitektonisk kontext

OmniRoute är ett dataplan med en **kritisk sökväg för begäranden** och ett **styrnings-/intelligensplan**.
Den kritiska sökvägen måste förbli snabb, minneseffektiv, asynkron, resilient och
förutsägbar. Utvärdering, kvalitetspoängsättning, experiment och historisk analys hör
hemma i styrningsplanet.

```
AI-agent/IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   dataplan (snabbt, synkront, i minnet)
│  routning/failover  │
│  hälsa/skyddsräcke  │
│  cache/strömning    │
└──────────┬──────────┘
           │ RoutingEvent (aktivera och glöm, ~0.2µs)
           ▼
┌─────────────────────┐
│  Feedbackmottagare  │   styrningsplan (asynkront, efter bästa förmåga)
│  kvalitetsspårare   │
│  OTel-exportör      │
│  förklaringslager   │
└──────────┬──────────┘
           ▼  kvalitetspoäng
      poängsättare för automatiska kombinationer
```

### Det som redan fanns (granskat, inte duplicerat)

| Koncept                                 | Befintlig implementation                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Tillgänglighet (kan vi skicka trafik?)  | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, lagrad i DB), anslutnings-cooldown, modellspärr  |
| Hälsorapportering                       | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                           |
| Skuggtrafik                             | `open-sse/services/combo/shadowRouting.ts`                                                        |
| Skyddsräcken                            | `src/lib/guardrails/` (för-/efter-hookar)                                                         |
| Exakt cache                             | `src/lib/semanticCache.ts` (signaturbaserad)                                                      |
| Utvärderare/utvärderingsdriven routning | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                              |
| Förklarbarhet för kombinationsbeslut    | `open-sse/services/combo/decisionTrace.ts`                                                        |
| Realtidshändelser på kontrollpanelen    | `src/lib/events/eventBus.ts` (UI-aviseringskanal, `unknown`-nyttolaster, historik med 100 poster) |

Lagret för routningshändelser är **inte** en återimplementering av `eventBus`: den bussen är
kontrollpanelens kanal för realtidsaviseringar (typade _händelsenamn_, ogenomskinliga
nyttolaster, UI-konsumenter). `RoutingEvent` är en typad _utfallsstruktur_
(latens/token/kostnad/utfall/avslutningsorsak) som används av styrningsplanets
feedbackmottagare (kvalitetsspårare, OTel-exportör, förklaringslager).

### Det som saknades (tillagt här)

1. En **typad abstraktion för routningsutfallshändelser och mottagare** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` är begränsad till kombinationer och finns endast i minnet;
   `comboMetrics` är kumulativa räknare; `call_logs` är obearbetad asynkron lagring.
   Ingen av dem är en typad, mottagarbaserad utfallskanal som en kvalitetsspårare, en OTel-
   exportör eller en utvärderare i Future-AGI-stil kan prenumerera på.
2. En **kontinuerlig kvalitetssignal** (EWMA) för utdatakvalitet — poängsättaren
   approximerade tidigare ”kvalitet” enbart genom statisk uppgiftslämplighet och frivilligt aktiverade
   godkännandefrekvenser för utvärderingar.
3. En **valfri, beroendefri OTel-exportör** som använder GenAI:s semantiska konventioner.
4. En **slutpunkt för förklarbarhet** som returnerar de faktiska routningsbesluten och kvalitetstillståndet.

## 2. Routningshändelser (grund för återkoppling)

Filer: `open-sse/services/routing/events.ts`, `.../index.ts`

En `RoutingEvent` innehåller endast metadata för routning:

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // "auto" | "priority" | "direct" | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // union med tillåtna värden
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` är ett trait av typen `Send+Sync` i TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // måste vara O(1), ingen synkron I/O
}
```

Den kritiska exekveringsvägen anropar `emitRoutingEvent(event)` en gång per slutförd begäran
(callbacken när strömningen slutförs, framgångsvägen utan strömning och
felvägen för felaktiga 200-svar i `handleChatCore`). Distributionen är synkron fan-out
till registrerade mottagare, men varje mottagare köar endast eller uppdaterar tillstånd i minnet. **Inga
synkrona databasskrivningar och ingen nätverks-I/O i den kritiska exekveringsvägen.**

Standardmottagare:

- `MemoryRoutingEventStore` — begränsad ringbuffert (500), nyaste först, för
  förklarings-endpointen.
- `QualityTracker`-konsument — uppdaterar EWMA-uppskattningen av kvalitet.
- `OtlpHttpsEventSink` — valfri, aktiveras endast när `OMNIROUTE_OTEL_ENDPOINT`
  (eller `OTEL_EXPORTER_OTLP_ENDPOINT`) har angetts.

### Uppmätt overhead (rättvisande jämförelse)

`npm run bench:routing-events` på den här arbetsstationen (100 000 iterationer; operationer
under en µs mättes som aggregerade µs/op eftersom percentilerna per operation ligger under
timerupplösningen för `performance.now()`):

| Scenario                              | µs/op  | op/s   |
| ------------------------------------- | ------ | ------ |
| baslinje (endast poängsättning)       | ~0.045 | ~22 M  |
| baslinje + RoutingEvent (2 mottagare) | ~0.168 | ~5.9 M |
| baslinje + händelse + OTel-köning     | ~0.163 | ~6.1 M |
| samtidigt (8 sammanflätade skurar)    | ~0.18  | —      |

Skillnaden för händelsedistribution jämfört med baslinjens poängsättning är ~0,12 µs/begäran; OTel-mottagaren
köar endast (O(1)-bufferttillägg) och tillför inget mätbart. Dessa siffror är
maskinspecifika och relativa — inte en garanti för produktion. Siffran ”~0,2 µs” i v1
var en aggregerad uppskattning; den här metodiken skiljer poängsättningens baslinje
från kostnaden för händelsedistribution.

## 3. Kvalitetssignal (leverantörstillstånd baserat på återkoppling)

Filer: `open-sse/services/routing/quality.ts`

v2 separerar **driftsmässig** kvalitet från **semantisk** kvalitet:

- **Driftsmässig** — härleds från routningens kritiska exekveringsväg (HTTP 4xx/5xx, anslutningsfel,
  429-svar, felaktiga svar, avbrott i strömmar, `finish_reason=length`,
  lyckade svar utan utdata, EWMA för latens/TTFT). Ett 200-svar behandlas INTE som semantisk
  kvalitet.
- **Semantisk** — det faktiska värdet hos genererade utdata. Produceras ENDAST av
  en utvärderare via `setSemanticQuality()`. Värdet är `null` tills en sådan tillhandahåller det och
  påverkar aldrig den driftsmässiga poängen.

Tillstånd per (leverantör, modell) (EWMA + begränsade räknare):

- `successEwma` — EWMA (α=0,2) för framgångsrikt utfall.
- `latencyEwma` / `ttftEwma` — EWMA för latens (α=0,1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — hur nyligen modellen senast observerades.

### Medvetenhet om konfidens och antal mätvärden

`confidence = clamp01(samples / 50)`, och poängen som returneras till poängsättaren
blandas mot den neutrala mittpunkten:

```
score = 0.5 + confidence * (operational - 0.5)
```

Konsekvenser (verifierade genom tester):

- En kall leverantör (0 mätvärden) får poängen **0,5** — den missgynnas inte orättvist, men
  kan inte dominera en leverantör med tusentals stabila observationer.
- En leverantör med 7 lyckosamma framgångar dras mot 0,5 (den dominerar aldrig till följd
  av optimistisk initiering).
- En leverantör med minst 50 mätvärden konvergerar mot sin verkliga driftsmässiga poäng.
- Försämring och återhämtning sker gradvis (EWMA), och ett enstaka isolerat fel
  förstör inte en välfungerande leverantör.

`ProviderQuality` exponerar `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Detta matas in i auto-combo-poängsättaren som poängfaktorn `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` i
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0,1905 → 0,1605, `quality` 0,03. Summan förblir 1,0.
- `buildAutoCandidates` fyller i `candidate.quality` från spåraren; kandidater
  utan data får det neutrala standardvärdet **0,5** (en kall kandidat varken gynnas eller
  missgynnas).

Den slutna återkopplingsslingan:

```
RoutingEvent → QualityTracker → getQualityScore → auto-combo-kvalitetsfaktor
      ↑                                                    │
      └────── begärans utfall (handleChatCore) ←────────────┘
```

### Hård exkludering kontra mjuk nedviktning

Kvalitetssignalen är endast en **mjuk adaptiv preferens**. Hård exkludering hanteras fortsatt
av den befintliga resiliensstacken: öppen kretsbrytare, förbrukad kvot,
autentiseringsfel, modellspärr — inget av detta påverkas av kvalitetspoängen.
En leverantör vars kvalitetspoäng tillfälligt sjunker ges lägre prioritet, men
inaktiveras aldrig helt.

## 3b. Kanonisk tidsmätning för strömmar (TTFT / ITL)

Filer: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` är den enda instrumenteringspunkten för strömningsvägen,
integrerad i `createSSEStream` (open-sse/utils/stream.ts):

- `markByte()` — första mottagna uppströmschunk.
- `markForward()` — första chunken som vidarebefordras till klienten (används för TTFT).
- `markInterrupted()` — timeout/avbrott/fel i strömmen före ett korrekt avslut.
- `ttft()` = latens till den första vidarebefordrade SSE-chunken. **Detta är INTE TTFT på tokennivå** —
  en enda SSE-chunk kan innehålla noll/en/flera tokens. Exakt dokumenterat.
- `avgItlMs()` = genomsnittligt intervall mellan chunkar (ett chunklatensmått som approximation för ITL).

TTFT/ITL/avbrottsstatus överförs till `RoutingEvent` (`ttftMs`, `itlMs`) och
exporteras som GenAI/OmniRoute-spanattribut av OTel-sinken.

## 4. OpenTelemetry-/GenAI-observerbarhet

Filer: `open-sse/services/routing/otel.ts`

- Beroendefri OTLP/HTTP JSON-exportör (använder global `fetch`, inget
  `@opentelemetry/*`-SDK).
- Span följer GenAI:s semantiska konventioner (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) samt OmniRoutes
  routningsattribut (utfall, status, ttft, återförsök, reservväg).
- `record()` köar endast i en begränsad buffert (O(1)); en bakgrundstimer
  tömmer den asynkront via `POST {endpoint}/v1/traces`. Vid överbelastning
  tas de äldsta händelserna bort (`dropped`-räknare) — dataplanet utsätts aldrig
  för baktryck.
- **Inaktiverad om den inte konfigureras.** `OMNIROUTE_OTEL_ENDPOINT` (eller
  `OTEL_EXPORTER_OTLP_ENDPOINT`) måste anges; annars registreras inte sinken
  och ingen OTel-kod körs.

## 5. Förklarbarhet

- `GET /v1/explain/routing` returnerar de senaste `RoutingEvent`-händelserna (de faktiska
  besluten, nyaste först) och kvalitetsögonblicksbilden per leverantör/modell.
- Autentiseringen motsvarar `/v1/combos` (Bearer-API-nyckel eller instrumentpanelsession;
  anonym åtkomst i lokala enanvändardistributioner med `REQUIRE_API_KEY=false`).
- Spår på kombinationsnivå per anrop är fortsatt tillgängliga via befintliga
  `decisionTrace.ts` (headern `X-OmniRoute-Combo-Trace`).
- Säkerhet: händelser innehåller endast routningsmetadata, aldrig prompter/kroppar/inloggningsuppgifter.

## 6. Integrering av utvärderingsplanet (beredskap för framtida AGI)

OmniRoute behandlar framtida AGI (eller valfri utvärderare) som en **potentiell
intelligens-/utvärderingsbackend, inte ett beroende**. Integreringspunkterna är:

- En `RoutingEventSink` kan vidarebefordra händelser asynkront till en utvärderare.
- `MemoryRoutingEventStore` + kvalitetsögonblicksbilden ger en utvärderare den råa
  beslutsströmmen.
- En framtida `Evaluator` (deterministisk, lokal bedömare, HTTP, WASM) skulle konsumera
  händelser/spår och returnera en `QualityScore` som matas in i samma
  `getQualityScore`-/kvalitetsfaktorväg.
- Befintlig utvärderingsdriven routning (`open-sse/services/evalRouting.ts`)
  ordnar redan om kombinationsmålen efter godkännandefrekvenser i `eval_runs` när den är aktiverad.

Ingen utvärdering körs synkront i sökvägen för begäranden, och gatewayen fungerar
fullständigt utan någon utvärderare.

## 7. Slutlig arkitekturgranskning

1. **Vad finns kvar i den synkrona kritiska sökvägen?** Routning/poängsättning,
   inledande skyddskontroller, cacheuppslagning och en `emitRoutingEvent`-utspridning
   (~0.12 µs utöver baslinjens poängsättning) till minnesbaserade sinkar.
2. **Vad flyttades till asynkron bearbetning?** OTel-export (timer + fetch),
   persistens av `call_logs`/användning, skrivningar till den semantiska cachen;
   kvalitet hanteras i minnet och i O(1) (ingen asynkronitet behövs).
3. **Hur blir ett routningsutfall återkoppling?** `handleChatCore` avger en
   `RoutingEvent` → `QualityTracker` uppdaterar EWMA-tillståndet → `getQualityScore`
   matar autokombinationens `quality`-faktor.
4. **Hur påverkar kvalitet framtida routning?** Ett lågt kvalitetspoäng minskar
   det viktade poängvärdet för den leverantören/modellen i `scoreAutoTargets`, så att
   försämrade modeller gradvis nedprioriteras och återhämtar sig när deras EWMA förbättras.
5. **Hur kan framtida AGI integreras utan att bli ett beroende?** Via
   gränssnittet `RoutingEventSink` / en framtida `Evaluator`-adapter — inget hårdkodat
   beroende.
6. **Vad händer när utvärderaren inte är tillgänglig?** Routningen påverkas inte;
   kvaliteten faller tillbaka till neutral (1.0) för modeller utan observerad signal.
7. **Vad händer när telemetrin inte är tillgänglig?** OTel-sinken registreras helt enkelt
   inte; resten av routningslagret körs oförändrat.
8. **Vad händer vid överbelastning?** OTel-bufferten tar bort de äldsta händelserna;
   kvaliteten och ringbufferten är begränsade genom sin konstruktion; inget baktryck.
9. **Hur återhämtar sig leverantörens tillstånd efter en försämring?** EWMA konvergerar
   på nytt när lyckade anrop ackumuleras; uppvärmning håller kalla modeller neutrala;
   kretsbrytaren återhämtar sig oberoende via HALF_OPEN-prober.
10. **Vilka föreslagna funktioner implementerades avsiktligt INTE, och varför?**
    - Skuggtrafik/experiment — redan implementerade
      (`combo/shadowRouting.ts`); byggdes inte om.
    - Skyddsmekanismer — redan implementerade (`src/lib/guardrails/`); duplicerades inte.
    - Semantisk cache — redan implementerad (`src/lib/semanticCache.ts`); duplicerades
      inte.
    - En fullständig plattform för experimenthantering, datamängdsverktyg, plattform för
      promptoptimering, vektor-DB eller obligatorisk extern OTel-infrastruktur — ligger
      utanför omfånget för ett slimmat dataplan.
    - En Rust-`RoutingEvent`-struct — dataplanet är TypeScript; TS-typen
      är den anpassade motsvarigheten.

## 8. Konfigurationsreferens

| Variabel                      | Standardvärde | Effekt                                                                                 |
| ----------------------------- | ------------- | -------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | inte angivet  | När den anges aktiveras exportören för OTLP/HTTP-spår (t.ex. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | inte angivet  | Reservalias för OTLP-slutpunkten.                                                      |
| `OTEL_SERVICE_NAME`           | `omniroute`   | Resursattributet `service.name`.                                                       |

## 9. Tester

- `tests/unit/routing-events.test.ts` — händelsenormalisering, statusklassificering,
  begränsad ringbuffert, utspridning till mottagare + isolering.
- `tests/unit/routing-quality.test.ts` — EWMA-uppvärmning, återhämtning efter fel/framgång,
  anomalipåföljder, tillfällig hantering av 429, ögonblicksbild, återställning.
- `tests/unit/routing-scoring-quality.test.ts` — viktintegritet, neutralt
  standardvärde, rangordning efter kvalitetsfaktor.
- `tests/unit/routing-otel.test.ts` — aktiveringsvillkor, nyttolast för GenAI-intervall, asynkron
  tömning, kassering vid överbelastning.
- `tests/unit/routing-events-concurrency.test.ts` — tusentals händelser, ringbuffertens
  begränsning, isolering av mottagare som utlöser fel, sammanflätade asynkrona skurar,
  återställning under infogningar.
- `tests/unit/routing-adaptive-e2e.test.ts` — deterministisk komplett körning via
  den verkliga poängsättaren `scoreAutoTargets`: frisk → försämrad → återhämtad → tillfällig störning, samt
  scenarier för kallstart och en lyckosam kall leverantör.
- `tests/unit/stream-timing.test.ts` — TTFT (första vidarebefordrade datablocket), ITL,
  första byte kontra första vidarebefordran, avbrott, säkerhet vid felaktiga/tomma datablock.

## 10. Status för befintliga problem (fas 18)

| Problem                                                 | Status                        | Anteckningar                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Exportavvikelse i `omniglyph`                           | **ÅTGÄRDAT (miljörelaterat)** | `node_modules` var inte synkroniserad med `package-lock.json` (installerad version 1.3.1 kontra låst version 1.4.0). Genom att köra `npm install omniglyph@1.4.0` återställdes den låsta versionen; antalet typfel sjönk till 0. Manifesten är oförändrade.                        |
| Inaktuella tester för `getKnownContextOverflow`         | **KÄNT — inte åtgärdat**      | `combo-context-overflow-compression-probe.test.ts` importerar en funktion som inte längre finns i `open-sse/services/combo.ts` (endast kommentarer hänvisar till den). En korrigering kräver att testerna implementeras om eller skrivs om — orelaterad arkitekturell omarbetning. |
| DB-isolering i `combo-runtime-unit-concurrency.test.ts` | **KÄNT — inte åtgärdat**      | Testmiljöns kontroll av SQLite-isolering misslyckas vid direkt körning; den misslyckas på identiskt sätt i basgrenen.                                                                                                                                                              |
| Avvikelse i i18n-`llm.txt`                              | **KÄNT — inte åtgärdat**      | `docs/i18n/*/llm.txt` skiljer sig från rotversionen; problemet fanns sedan tidigare och blockerar dokumentationssynkroniseringens pre-commit-kontroll.                                                                                                                             |

Miljö- och kodproblem hålls åtskilda; inga orelaterade fel döljs
bakom ändrade testfilter.
