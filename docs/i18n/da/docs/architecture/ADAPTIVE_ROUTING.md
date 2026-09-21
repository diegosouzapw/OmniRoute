# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Dette dokument beskriver det feedbackdrevne fundament for adaptiv routing, der er føjet til
OmniRoute. Det er bevidst lille: Det introducerer en typet kanal til routingresultater,
et online kvalitetssignal, der føder den eksisterende auto-combo-scorer, en
valgfri OpenTelemetry-eksportør og et endpoint til forklarbarhed. Det **erstatter ikke**
den eksisterende resiliens-stack (circuit breaker, connection cooldown,
model lockout, health matrix, autopilot) — det supplerer den.

## 1. Arkitektonisk kontekst

OmniRoute er et dataplan med en **kritisk request-sti** og et **kontrol-/intelligensplan**.
Den kritiske sti skal forblive hurtig, hukommelseseffektiv, asynkron, robust og
forudsigelig. Evaluering, kvalitetsscoring, eksperimenter og historisk analyse hører
til i kontrolplanet.

```
AI-agent / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   dataplan (hurtigt, synkront, i hukommelsen)
│  routing / failover │
│  sundhed / værn     │
│  cache / streaming  │
└──────────┬──────────┘
           │ RoutingEvent (send-og-glem, ~0.2µs)
           ▼
┌─────────────────────┐
│  Feedback-sinks     │   kontrolplan (asynkront, efter bedste evne)
│  kvalitetstracker   │
│  OTel-eksportør     │
│  forklaringslager   │
└──────────┬──────────┘
           ▼  kvalitetsscore
      auto-combo-scorer
```

### Hvad der allerede fandtes (gennemgået, ikke duplikeret)

| Koncept                                 | Eksisterende implementering                                                                            |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Tilgængelighed (kan vi sende trafik?)   | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, persisteret i DB), connection cooldown, model lockout |
| Sundhedsrapportering                    | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                |
| Skyggetrafik                            | `open-sse/services/combo/shadowRouting.ts`                                                             |
| Værn                                    | `src/lib/guardrails/` (før-/efter-hooks)                                                               |
| Eksakt cache                            | `src/lib/semanticCache.ts` (signaturbaseret)                                                           |
| Evaluatorer / evalueringsdrevet routing | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                   |
| Forklarbarhed af combo-beslutninger     | `open-sse/services/combo/decisionTrace.ts`                                                             |
| Dashboard-hændelser i realtid           | `src/lib/events/eventBus.ts` (UI-notifikationskanal, `unknown`-payloads, historik med 100 poster)      |

Routing-hændelseslaget er **ikke** en genimplementering af `eventBus`: Denne bus er
dashboardets notifikationskanal i realtid (typede _hændelsesnavne_, uigennemsigtige
payloads, UI-forbrugere). `RoutingEvent` er en typet _resultat_-struktur
(latens/tokens/omkostning/resultat/afslutningsårsag), som forbruges af kontrolplanets
feedback-sinks (kvalitetstracker, OTel-eksportør, forklaringslager).

### Hvad der manglede (tilføjet her)

1. En **typet routingresultat-hændelse + sink-abstraktion** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` er afgrænset til combo og findes kun i hukommelsen;
   `comboMetrics` er kumulative tællere; `call_logs` er rå asynkron persistens.
   Ingen af dem er en typet, sink-baseret resultatkanal, som en kvalitetstracker, en OTel-
   eksportør eller en Future-AGI-lignende evaluator kan abonnere på.
2. Et **online kvalitetssignal** (EWMA) for outputkvalitet — scoreren repræsenterede tidligere
   kun "kvalitet" indirekte gennem statisk opgaveegnethed og tilvalgte evalueringsbeståelsesrater.
3. En **valgfri OTel-eksportør uden afhængigheder**, som bruger semantiske GenAI-konventioner.
4. Et **endpoint til forklarbarhed**, der returnerer de faktiske routingbeslutninger + kvalitetstilstanden.

## 2. Routinghændelser (grundlag for feedback)

Filer: `open-sse/services/routing/events.ts`, `.../index.ts`

En `RoutingEvent` indeholder kun routingmetadata:

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
  outcome: RoutingOutcome; // union på tilladelseslisten
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` er et `Send+Sync`-lignende trait i TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // skal være O(1), ingen synkron I/O
}
```

Den kritiske sti kalder `emitRoutingEvent(event)` én gang pr. fuldført anmodning
(callbacket ved fuldførelse af streaming, successtien uden streaming og
fejlstien for ugyldige 200-svar i `handleChatCore`). Distributionen sker som
synkron fan-out til registrerede sinks, men hver sink sætter kun data i kø eller
opdaterer tilstanden i hukommelsen. **Ingen synkrone databaseskrivninger og ingen
netværks-I/O på den kritiske sti.**

Standardsinks:

- `MemoryRoutingEventStore` — afgrænset ringbuffer (500), nyeste først, til
  forklaringsendepunktet.
- `QualityTracker`-forbruger — opdaterer EWMA-kvalitetsestimatet.
- `OtlpHttpsEventSink` — valgfri og kun aktiveret, når `OMNIROUTE_OTEL_ENDPOINT`
  (eller `OTEL_EXPORTER_OTLP_ENDPOINT`) er angivet.

### Målt overhead (ærlig sammenligning)

`npm run bench:routing-events` på denne arbejdsstation (100k iterationer;
operationer under ét µs målt som aggregeret µs/op, fordi percentiler pr. operation
ligger under timeropløsningen for `performance.now()`):

| Scenarie                          | µs/op  | ops/s  |
| --------------------------------- | ------ | ------ |
| baseline (kun scoring)            | ~0.045 | ~22 M  |
| baseline + RoutingEvent (2 sinks) | ~0.168 | ~5.9 M |
| baseline + event + OTel-kø        | ~0.163 | ~6.1 M |
| samtidig (8 indflettede bursts)   | ~0.18  | —      |

Forskellen mellem hændelsesdistribution og baseline-scoring er ~0.12
µs/anmodning; OTel-sinken sætter kun data i kø (O(1)-bufferindsættelse) og
tilføjer intet målbart. Disse tal er maskinspecifikke og relative — ikke en
produktionsgaranti. v1-tallet på "~0.2 µs" var et aggregeret estimat; denne
metode adskiller scoringens baseline fra omkostningen ved hændelsesdistribution.

## 3. Kvalitetssignal (feedbackdrevet udbydertilstand)

Filer: `open-sse/services/routing/quality.ts`

v2 adskiller **operationel** kvalitet fra **semantisk** kvalitet:

- **Operationel** — afledt af den kritiske routingsti (HTTP 4xx/5xx,
  forbindelsesfejl, 429-svar, ugyldige svar, afbrudte streams,
  `finish_reason=length`, succeser uden output, EWMA for latenstid/TTFT). Et
  200-svar behandles IKKE som semantisk kvalitet.
- **Semantisk** — den faktiske værdi af det genererede output. Produceres
  UDELUKKENDE af en evaluator via `setSemanticQuality()`. Den er `null`, indtil
  en evaluator angiver den, og påvirker aldrig den operationelle score.

Tilstand pr. (udbyder, model) (EWMA + afgrænsede tællere):

- `successEwma` — EWMA (α=0.2) for vellykkede resultater.
- `latencyEwma` / `ttftEwma` — EWMA for latenstid (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — hvor nyligt modellen sidst blev observeret.

### Bevidsthed om konfidens og antal samples

`confidence = clamp01(samples / 50)`, og den score, der returneres til scoreren,
blandes i retning af det neutrale midtpunkt:

```
score = 0.5 + confidence * (operational - 0.5)
```

Konsekvenser (bekræftet af tests):

- En kold udbyder (0 samples) scorer **0.5** — den straffes ikke uretfærdigt,
  men kan heller ikke overgå en udbyder med tusindvis af solide observationer.
- En udbyder med 7 heldige succeser trækkes mod 0.5 (og dominerer aldrig på
  grund af optimistisk initialisering).
- En udbyder med 50+ samples konvergerer mod sin reelle operationelle score.
- Forringelse og genopretning sker gradvist (EWMA), og én isoleret fejl
  ødelægger ikke en sund udbyder.

`ProviderQuality` eksponerer `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Dette føres ind i auto-combo-scoreren som scoringfaktoren `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` i
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Summen forbliver 1.0.
- `buildAutoCandidates` udfylder `candidate.quality` fra trackeren; kandidater
  uden data bruger som standard den neutrale værdi **0.5** (en kold kandidat
  favoriseres eller straffes ikke).

Det lukkede kredsløb:

```
RoutingEvent → QualityTracker → getQualityScore → auto-combo-kvalitetsfaktor
      ↑                                                    │
      └────── anmodningsresultat (handleChatCore) ←─────────┘
```

### Hård eksklusion kontra blød straf

Kvalitetssignalet er udelukkende en **blød, adaptiv præference**. Hård eksklusion
forbliver i den eksisterende robusthedsstak: ÅBEN circuit breaker, opbrugt kvote,
godkendelsesfejl, modellåsning — ingen af disse påvirkes af kvalitetsscoren.
En udbyder, hvis kvalitetsscore falder midlertidigt, nedprioriteres, men
deaktiveres aldrig permanent.

## 3b. Kanonisk streamtiming (TTFT / ITL)

Filer: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` er det eneste instrumenteringspunkt for streamingstien,
integreret i `createSSEStream` (open-sse/utils/stream.ts):

- `markByte()` — første upstream-chunk modtaget.
- `markForward()` — første chunk videresendt til klienten (bruges til TTFT).
- `markInterrupted()` — stream-timeout/-afbrydelse/-fejl før en korrekt afslutning.
- `ttft()` = latenstid indtil første videresendte SSE-chunk. **Dette er IKKE TTFT på tokenniveau** —
  en enkelt SSE-chunk kan indeholde nul/ét/mange tokens. Præcist dokumenteret.
- `avgItlMs()` = gennemsnitligt interval mellem chunks (en chunk-latensproxy for ITL).

TTFT/ITL/afbrydelsesstatus overføres til `RoutingEvent` (`ttftMs`, `itlMs`) og
eksporteres som GenAI/OmniRoute-spanattributter af OTel-sinket.

## 4. OpenTelemetry-/GenAI-observerbarhed

Filer: `open-sse/services/routing/otel.ts`

- Afhængighedsfri OTLP/HTTP JSON-eksportør (bruger global `fetch`, intet
  `@opentelemetry/*`-SDK).
- Spans følger GenAI's semantiske konventioner (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) samt OmniRoute-routingattributter
  (resultat, status, TTFT, genforsøg, fallback).
- `record()` føjer kun til en afgrænset buffer (O(1)); en baggrundstimer
  sender asynkront via `POST {endpoint}/v1/traces`. Ved overbelastning
  kasseres de ældste hændelser (`dropped`-tæller) — dataplanet udsættes aldrig
  for backpressure.
- **Deaktiveret, medmindre det er konfigureret.** `OMNIROUTE_OTEL_ENDPOINT` (eller
  `OTEL_EXPORTER_OTLP_ENDPOINT`) skal være angivet; ellers registreres sinket
  ikke, og ingen OTel-kode kører.

## 5. Forklarbarhed

- `GET /v1/explain/routing` returnerer de seneste `RoutingEvent`s (de faktiske
  beslutninger, nyeste først) og kvalitetsøjebliksbilledet pr. udbyder/model.
- Godkendelse følger `/v1/combos` (Bearer-API-nøgle eller dashboardsession; anonym
  adgang i lokale enkeltbrugerinstallationer med `REQUIRE_API_KEY=false`).
- Sporinger pr. aktivering på combo-niveau er fortsat tilgængelige via den eksisterende
  `decisionTrace.ts` (headeren `X-OmniRoute-Combo-Trace`).
- Sikkerhed: Hændelser indeholder kun routingmetadata, aldrig prompts/brødtekst/legitimationsoplysninger.

## 6. Integration af evalueringsplanet (parathed til Future AGI)

OmniRoute behandler Future AGI (eller enhver anden evaluator) som en **potentiel
intelligens-/evalueringsbackend, ikke en afhængighed**. Integrationspunkterne:

- Et `RoutingEventSink` kan videresende hændelser asynkront til en evaluator.
- `MemoryRoutingEventStore` + kvalitetsøjebliksbilledet giver en evaluator den rå
  beslutningsstrøm.
- En fremtidig `Evaluator` (deterministisk, lokal bedømmer, HTTP, WASM) vil forbruge
  hændelser/sporinger og returnere en `QualityScore`, der føres ind i den samme
  `getQualityScore`-/kvalitetsfaktorsti.
- Eksisterende evalueringsdrevet routing (`open-sse/services/evalRouting.ts`) omordner
  allerede combo-mål efter beståelsesrater fra `eval_runs`, når funktionen er aktiveret.

Ingen evaluering køres synkront i forespørgselsstien, og gatewayen fungerer
fuldt ud uden en evaluator.

## 7. Afsluttende arkitekturgennemgang

1. **Hvad er tilbage i den synkrone hot path?** Routing/scoring, indledende
   guardrail-kontroller, cacheopslag og én `emitRoutingEvent`-fan-out (~0,12 µs ud over
   baseline-scoring) til in-memory-sinks.
2. **Hvad blev flyttet til asynkron behandling?** OTel-eksport (timer + fetch),
   persistens af `call_logs`/forbrug, skrivninger til den semantiske cache; kvalitet
   håndteres in-memory og i O(1) (ingen asynkron behandling nødvendig).
3. **Hvordan bliver et routingresultat til feedback?** `handleChatCore` udsender en
   `RoutingEvent` → `QualityTracker` opdaterer EWMA-tilstanden → `getQualityScore`
   leverer input til auto-comboens `quality`-faktor.
4. **Hvordan påvirker kvalitet fremtidig routing?** En lav kvalitetsscore reducerer
   den vægtede score for den pågældende udbyder/model i `scoreAutoTargets`, så
   forringede modeller gradvist nedprioriteres og genoprettes, efterhånden som deres EWMA forbedres.
5. **Hvordan kan Future AGI integreres uden at blive en afhængighed?** Via
   `RoutingEventSink`-interfacet/en fremtidig `Evaluator`-adapter — ingen hardkodet
   afhængighed.
6. **Hvad sker der, når evaluatoren ikke er tilgængelig?** Routing påvirkes ikke;
   kvalitet falder tilbage til neutral (1,0) for modeller uden et observeret signal.
7. **Hvad sker der, når telemetri ikke er tilgængelig?** OTel-sinket registreres
   ganske enkelt ikke; resten af routinglaget kører uændret.
8. **Hvad sker der ved overbelastning?** OTel-bufferen kasserer de ældste hændelser;
   kvalitet og ringbufferen er afgrænsede som en del af deres konstruktion; ingen backpressure.
9. **Hvordan genoprettes udbydertilstanden efter forringelse?** EWMA konvergerer igen,
   efterhånden som vellykkede kald akkumuleres; warmup holder kolde modeller neutrale;
   circuit breakeren genoprettes uafhængigt via HALF_OPEN-prober.
10. **Hvilke foreslåede funktioner blev bevidst IKKE implementeret, og hvorfor?**
    - Skyggetrafik/eksperimenter — allerede implementeret
      (`combo/shadowRouting.ts`); ikke genimplementeret.
    - Guardrails — allerede implementeret (`src/lib/guardrails/`); ikke duplikeret.
    - Semantisk cache — allerede implementeret (`src/lib/semanticCache.ts`); ikke
      duplikeret.
    - En komplet platform til eksperimentstyring, datasætværktøjer, platform til
      promptoptimering, vektordatabase eller obligatorisk ekstern OTel-infrastruktur —
      uden for rammerne af et slankt dataplan.
    - En Rust-`RoutingEvent`-struct — dataplanet er TypeScript; TS-typen er
      den tilpassede ækvivalent.

## 8. Konfigurationsreference

| Variabel                      | Standardværdi | Effekt                                                                                    |
| ----------------------------- | ------------- | ----------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | ikke angivet  | Når den er angivet, aktiveres eksport af OTLP/HTTP-spor (f.eks. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | ikke angivet  | Alternativt alias for OTLP-slutpunktet.                                                   |
| `OTEL_SERVICE_NAME`           | `omniroute`   | `service.name`-ressourceattribut.                                                         |

## 9. Tests

- `tests/unit/routing-events.test.ts` — hændelsesnormalisering, statusklassifikation,
  begrænset ringbuffer, fan-out til sinks + isolation.
- `tests/unit/routing-quality.test.ts` — EWMA-opvarmning, genopretning efter fejl/succes,
  anomalitetsstraffe, midlertidig håndtering af 429, snapshot, nulstilling.
- `tests/unit/routing-scoring-quality.test.ts` — vægtintegritet, neutral
  standardværdi, rangering efter kvalitetsfaktor.
- `tests/unit/routing-otel.test.ts` — aktiveringskontrol, GenAI-span-payload, asynkron
  tømning, kassering ved overbelastning.
- `tests/unit/routing-events-concurrency.test.ts` — tusindvis af hændelser, ringbufferens
  afgrænsning, isolation af sinks, der udløser fejl, sammenflettede asynkrone serier,
  nulstilling under indsættelser.
- `tests/unit/routing-adaptive-e2e.test.ts` — deterministisk komplet løkke via
  den faktiske `scoreAutoTargets`-scorer: sund → forringet → genoprettet → kortvarig afvigelse, samt
  scenarier med koldstart og en heldig kold udbyder.
- `tests/unit/stream-timing.test.ts` — TTFT (første videresendte del), ITL,
  første byte kontra første videresendelse, afbrydelse, sikker håndtering af fejlformaterede/tomme dele.

## 10. Status for allerede eksisterende problemer (fase 18)

| Problem                                                 | Status                      | Bemærkninger                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Uoverensstemmelse i `omniglyph`-eksport                 | **RETTET (miljørelateret)** | `node_modules` var ikke synkroniseret med `package-lock.json` (installeret 1.3.1 kontra låst til 1.4.0). Kørsel af `npm install omniglyph@1.4.0` gendannede den låste version; antallet af typefejl faldt til 0. Manifesterne er uændrede.                                             |
| Forældede `getKnownContextOverflow`-tests               | **KENDT — ikke rettet**     | `combo-context-overflow-compression-probe.test.ts` importerer en funktion, der ikke længere findes i `open-sse/services/combo.ts` (kun kommentarer henviser til den). En rettelse kræver genimplementering eller omskrivning af disse tests — en ikke-relateret arkitektonisk ændring. |
| DB-isolation i `combo-runtime-unit-concurrency.test.ts` | **KENDT — ikke rettet**     | Testmiljøets kontrol af SQLite-isolation mislykkes ved direkte kørsel; den mislykkes på samme måde på basisgrenen.                                                                                                                                                                     |
| Afvigelse i i18n-`llm.txt`                              | **KENDT — ikke rettet**     | `docs/i18n/*/llm.txt` afviger fra roden; allerede eksisterende og blokerer pre-commit-kontrollen af dokumentationssynkronisering.                                                                                                                                                      |

Miljø- og kodeproblemer holdes adskilt; ingen ikke-relaterede fejl skjules
bag ændrede testfiltre.
