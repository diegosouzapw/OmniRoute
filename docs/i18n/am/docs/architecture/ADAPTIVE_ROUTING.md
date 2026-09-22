# Adaptive Routing: Routing Events, Quality Feedback & Explainability (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

ይህ ሰነድ ወደ OmniRoute የታከለውን በግብረመልስ የሚመራ መላመድ የሚችል የማዘዋወር መሠረት ይገልጻል።
ሆን ተብሎ አነስተኛ እንዲሆን ተደርጓል፦ ዓይነቱ የተገለጸ የማዘዋወር ውጤት
ቻናል፣ ነባሩን የauto-combo ነጥብ ሰጪ የሚመግብ ቀጣይነት ያለው የጥራት ምልክት፣
አማራጭ OpenTelemetry ላኪ እና የማብራሪያ መጨረሻ ነጥብ ያስተዋውቃል። ነባሩን
የመቋቋም ስብስብ (circuit breaker፣ connection cooldown፣
model lockout፣ health matrix፣ autopilot) **አይተካም** — ያሟላዋል።

## 1. የሥነ ሕንፃ አውድ

OmniRoute **የጥያቄ ፈጣን መንገድ** እና **የቁጥጥር/ብልህነት
ፕሌን** ያለው የውሂብ ፕሌን ነው። ፈጣን መንገዱ ፈጣን፣ በማስታወሻ አጠቃቀም ቆጣቢ፣ አልተመሳሰለ፣ ተቋቋሚ እና
ሊገመት የሚችል ሆኖ መቆየት አለበት። ግምገማ፣ የጥራት ነጥብ አሰጣጥ፣ ሙከራዎች እና ታሪካዊ ትንተና
የቁጥጥር ፕሌኑ አካል ናቸው።

```
AI Agent / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   የውሂብ ፕሌን (ፈጣን፣ የተመሳሰለ፣ በማስታወሻ ውስጥ)
│  ማዘዋወር / failover │
│  ጤና / guardrail    │
│  cache / streaming  │
└──────────┬──────────┘
           │ RoutingEvent (ልኮ መርሳት፣ ~0.2µs)
           ▼
┌─────────────────────┐
│  የግብረመልስ sinks  │   የቁጥጥር ፕሌን (ያልተመሳሰለ፣ በተቻለ መጠን)
│  የጥራት tracker   │
│  OTel exporter      │
│  explain store      │
└──────────┬──────────┘
           ▼  የጥራት ነጥብ
      auto-combo scorer
```

### አስቀድሞ የነበረው (የተመረመረ፣ ያልተደገመ)

| ጽንሰ-ሐሳብ                      | ነባር ትግበራ                                                                                        |
| ---------------------------- | ----------------------------------------------------------------------------------------------- |
| የመገኘት አቅም (ትራፊክ መላክ እንችላለን?) | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN፣ በDB የተከማቸ)፣ connection cooldown፣ model lockout |
| የጤና ሪፖርት                     | `providerHealthMatrix.ts`፣ `providerHealthAutopilot.ts`                                         |
| የጥላ ትራፊክ                     | `open-sse/services/combo/shadowRouting.ts`                                                      |
| Guardrails                   | `src/lib/guardrails/` (የቅድመ/ድህረ hooks)                                                          |
| ትክክለኛ cache                  | `src/lib/semanticCache.ts` (በsignature ላይ የተመሠረተ)                                               |
| ገምጋሚዎች / በግምገማ የሚመራ ማዘዋወር    | `src/lib/evals/`፣ `open-sse/services/evalRouting.ts`                                            |
| የCombo ውሳኔ ማብራሪያ             | `open-sse/services/combo/decisionTrace.ts`                                                      |
| የDashboard ቅጽበታዊ ክስተቶች       | `src/lib/events/eventBus.ts` (የUI ማሳወቂያ ቻናል፣ `unknown` payloads፣ የ100 ግቤቶች ታሪክ)                 |

የማዘዋወር ክስተት ንብርብሩ የ`eventBus` ዳግም ትግበራ **አይደለም**፦ ያ ባስ
የdashboard ቅጽበታዊ ማሳወቂያ ቻናል ነው (ዓይነታቸው የተገለጸ _የክስተት ስሞች_፣ ውስጣቸው የማይታይ
payloads፣ የUI ተጠቃሚዎች)። `RoutingEvent` በቁጥጥር ፕሌኑ
የግብረመልስ sinks (የጥራት tracker፣ OTel exporter፣ explain store) የሚጠቀሙበት፣ ዓይነቱ የተገለጸ _ውጤት_ struct
(latency/tokens/cost/outcome/finish-reason) ነው።

### የጎደለው (እዚህ የታከለ)

1. **ዓይነቱ የተገለጸ የማዘዋወር ውጤት ክስተት + sink abstraction** (`RoutingEvent` /
   `RoutingEventSink`)። `decisionTrace` በcombo ላይ የተወሰነ እና በማስታወሻ ውስጥ ብቻ ነው፤
   `comboMetrics` ድምር ቆጣሪዎች ናቸው፤ `call_logs` ጥሬ ያልተመሳሰለ ማከማቻ ነው።
   አንዳቸውም የጥራት tracker፣ OTel
   exporter ወይም Future-AGI-ቅጥ ገምጋሚ ሊመዘገብበት የሚችል፣ ዓይነቱ የተገለጸ በsink ላይ የተመሠረተ የውጤት ቻናል አይደለም።
2. ለውጤት ጥራት **ቀጣይነት ያለው የጥራት ምልክት** (EWMA) — ነጥብ ሰጪው ከዚህ በፊት
   "ጥራትን" በቋሚ የተግባር ተስማሚነት እና በፈቃድ በሚነቁ የግምገማ ማለፊያ ምጣኔዎች ብቻ በተዘዋዋሪ ይወክል ነበር።
3. የGenAI semantic conventionsን የሚጠቀም **አማራጭ፣ ከጥገኝነት ነጻ የሆነ OTel exporter**።
4. ትክክለኛዎቹን የማዘዋወር ውሳኔዎች + የጥራት ሁኔታ የሚመልስ **የማብራሪያ መጨረሻ ነጥብ**።

## 2. የራውቲንግ ክስተቶች (የግብረመልስ መሠረት)

ፋይሎች፦ `open-sse/services/routing/events.ts`፣ `.../index.ts`

አንድ `RoutingEvent` የሚይዘው የራውቲንግ ሜታዳታን ብቻ ነው፦

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
  outcome: RoutingOutcome; // በተፈቀደላቸው ዝርዝር የተገደበ union
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` በTypeScript ውስጥ `Send+Sync`-ዓይነት trait ነው፦

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // O(1) መሆን አለበት፣ sync I/O የለም
}
```

hot path ለእያንዳንዱ የተጠናቀቀ ጥያቄ `emitRoutingEvent(event)`ን አንድ ጊዜ ይጠራል
(የstreaming ማጠናቀቂያ callback፣ streaming ያልሆነው የስኬት መንገድ፣ እና
በ`handleChatCore` ውስጥ ያለው malformed-200 የውድቀት መንገድ)። Dispatch ወደ
ተመዘገቡ sinks በማመሳሰል fan-out ያደርጋል፣ ነገር ግን እያንዳንዱ sink
በማስታወሻ ውስጥ ያለን ሁኔታ ወደ ወረፋ ያስገባል/ያዘምናል ብቻ። **በhot path ላይ
የተመሳሰሉ የውሂብ ጎታ ጽሑፎች ወይም የአውታረ መረብ I/O የሉም።**

ነባሪ sinks፦

- `MemoryRoutingEventStore` — የተገደበ (500) ring buffer፣ አዲሶቹን በመጀመሪያ
  የሚያሳይ፣ ለexplain endpoint።
- `QualityTracker` consumer — የEWMA የጥራት ግምትን ያዘምናል።
- `OtlpHttpsEventSink` — አማራጭ፣ `OMNIROUTE_OTEL_ENDPOINT`
  (ወይም `OTEL_EXPORTER_OTLP_ENDPOINT`) ሲዋቀር ብቻ የነቃ።

### የተለካ ተጨማሪ ወጪ (ታማኝ ንጽጽር)

በዚህ workstation ላይ `npm run bench:routing-events` (100k ድግግሞሾች፤ sub-µs ops
በእያንዳንዱ op ያሉ percentiles ከ`performance.now()` timer resolution በታች
ስለሆኑ እንደ aggregate µs/op ተለክተዋል)፦

| ሁኔታ                               | µs/op  | ops/s  |
| --------------------------------- | ------ | ------ |
| baseline (scoring ብቻ)             | ~0.045 | ~22 M  |
| baseline + RoutingEvent (2 sinks) | ~0.168 | ~5.9 M |
| baseline + event + OTel enqueue   | ~0.163 | ~6.1 M |
| concurrent (8 interleaved bursts) | ~0.18  | —      |

ከbaseline scoring በላይ ያለው የevent-dispatch ልዩነት ~0.12 µs/request ነው፤ OTel sink
ወደ ወረፋ የሚያስገባው ብቻ ሲሆን (O(1) buffer push)፣ ሊለካ የሚችል ምንም ነገር
አይጨምርም። እነዚህ ቁጥሮች ለማሽኑ የተለዩ እና አንጻራዊ ናቸው — የproduction
ዋስትና አይደሉም። የv1 "~0.2 µs" ቁጥር ድምር ግምት ነበር፤ ይህ methodology
የscoring baselineን ከevent-dispatch ወጪ ይለያል።

## 3. የጥራት ምልክት (በግብረመልስ የሚመራ የprovider ሁኔታ)

ፋይሎች፦ `open-sse/services/routing/quality.ts`

v2 **የአሠራር** ጥራትን ከ**ትርጉማዊ** ጥራት ይለያል፦

- **የአሠራር** — ከrouting hot path የሚመነጭ (HTTP 4xx/5xx፣ የconnection
  ውድቀቶች፣ 429s፣ malformed responses፣ የstream መቋረጦች፣ `finish_reason=length`፣
  ዜሮ-output ስኬቶች፣ latency/TTFT EWMA)። 200 እንደ ትርጉማዊ ጥራት
  **አይቆጠርም**።
- **ትርጉማዊ** — የተፈጠረው ውጤት ትክክለኛ እሴት። የሚፈጠረው
  በevaluator በኩል `setSemanticQuality()`ን በመጠቀም **ብቻ** ነው። አንድ
  evaluator እስኪያቀርበው ድረስ `null` ሆኖ ይቆያል፣ እና ወደ operational score
  ፈጽሞ አይገባም።

የእያንዳንዱ (provider, model) ሁኔታ (EWMA + የተገደቡ counters)፦

- `successEwma` — የውጤት ስኬት EWMA (α=0.2)።
- `latencyEwma` / `ttftEwma` — የlatency EWMA (α=0.1)።
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`።
- `recencyMs` — model ለመጨረሻ ጊዜ ከታየበት ጊዜ አንስቶ ያለፈው ጊዜ።

### የእርግጠኝነት / sample ግንዛቤ

`confidence = clamp01(samples / 50)`፣ እና ወደ scorer የሚመለሰው score
ወደ ገለልተኛው መካከለኛ ነጥብ ይዋሃዳል፦

```
score = 0.5 + confidence * (operational - 0.5)
```

ውጤቶች (በtests የተረጋገጡ)፦

- አዲስ provider (0 samples) **0.5** ያስመዘግባል — ያለአግባብ አይቀጣም፣ ነገር
  ግን በሺዎች የሚቆጠሩ ጠንካራ ምልከታዎች ያሉትን provider ማሸነፍ አይችልም።
- 7 እድለኛ ስኬቶች ያሉት provider ወደ 0.5 ይሳባል (በተስፈኛ
  initialization ምክንያት ፈጽሞ የበላይ አይሆንም)።
- 50+ samples ያሉት provider ወደ እውነተኛው operational score ይቀርባል።
- መበላሸት እና ማገገም ቀስ በቀስ ናቸው (EWMA)፣ እና አንድ የተነጠለ ውድቀት
  ጤናማ providerን አያወድም።

`ProviderQuality` `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`ን ያቀርባል።

ይህ እንደ `quality` scoring factor ሆኖ auto-combo scorerን ይመግባል፦

- `ScoringFactors.quality` / `ScoringWeights.quality` በ
  `open-sse/services/autoCombo/scoring.ts` ውስጥ።
- `DEFAULT_WEIGHTS`፦ `health` 0.1905 → 0.1605፣ `quality` 0.03። ድምሩ 1.0 ሆኖ
  ይቆያል።
- `buildAutoCandidates` `candidate.quality`ን ከtracker ይሞላል፤ ውሂብ የሌላቸው
  candidates በነባሪ ገለልተኛውን **0.5** ይወስዳሉ (አዲስ candidate አይጠናከርምም
  አይቀጣምም)።

ዝግ ዑደቱ፦

```
RoutingEvent → QualityTracker → getQualityScore → auto-combo quality factor
      ↑                                                    │
      └────── የጥያቄ ውጤት (handleChatCore) ←──────────────┘
```

### ጠንካራ ማግለል እና ለስላሳ ቅጣት

የጥራት ምልክቱ **ለስላሳ ተለዋዋጭ ምርጫ** ብቻ ነው። ጠንካራ ማግለል
በነባሩ resilience stack ይቆያል፦ circuit breaker OPEN፣ quota ያለቀ፣
auth failure፣ model lockout — ከእነዚህ አንዳቸውም በquality score አይነኩም።
quality score ለጊዜው የቀነሰበት provider ቅድሚያው ይቀነሳል እንጂ
ፈጽሞ hard-disabled አይደረግም።

## 3b. መደበኛ የዥረት ጊዜ መለኪያ (TTFT / ITL)

ፋይሎች፦ `open-sse/utils/streamTiming.ts`

`createStreamTiming()` ለዥረት መንገዱ ብቸኛው የመለኪያ ማያያዣ ሲሆን፣
በ`createSSEStream` (`open-sse/utils/stream.ts`) ውስጥ ተገናኝቷል፦

- `markByte()` — የመጀመሪያው ከላይኛው ምንጭ የመጣ ቁራጭ ደረሰ።
- `markForward()` — ወደ ደንበኛው የተላለፈ የመጀመሪያ ቁራጭ (ለTTFT ጥቅም ላይ የሚውል)።
- `markInterrupted()` — በንጹሕ ሁኔታ ከመጠናቀቁ በፊት የዥረት ጊዜ ማለፍ/ማቋረጥ/ስህተት።
- `ttft()` = የመጀመሪያው የተላለፈ የSSE ቁራጭ መዘግየት። **ይህ የቶከን ደረጃ TTFT አይደለም** —
  አንድ የSSE ቁራጭ ዜሮ/አንድ/ብዙ ቶከኖችን ሊይዝ ይችላል። በትክክል ተመዝግቧል።
- `avgItlMs()` = አማካይ የቁራጮች መካከል ክፍተት (ለITL የቁራጭ መዘግየት ግምታዊ መለኪያ)።

TTFT/ITL/የመቋረጥ መረጃ ወደ `RoutingEvent` (`ttftMs`, `itlMs`) ይገባል፣ እንዲሁም
በOTel sink እንደ GenAI/OmniRoute span ባህሪያት ይላካል።

## 4. OpenTelemetry / GenAI ታዛቢነት

ፋይሎች፦ `open-sse/services/routing/otel.ts`

- ከጥገኝነት ነጻ የOTLP/HTTP JSON ላኪ (global `fetch`ን ይጠቀማል፤
  `@opentelemetry/*` SDK አይጠቀምም)።
- Spans የGenAI ትርጉማዊ ስምምነቶችን (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) እና የOmniRoute ማዘዋወሪያ
  ባህሪያትን (ውጤት፣ ሁኔታ፣ ttft፣ ድጋሚ ሙከራዎች፣ ተተኪ) ይከተላሉ።
- `record()` ወደ ውስን ቋት ብቻ ያሰልፋል (O(1))፤ የጀርባ ጊዜ ቆጣሪ
  `POST {endpoint}/v1/traces`ን በመጠቀም ያለመመሳሰል ሁኔታ ይልካል። ከአቅም በላይ ጫና ሲኖር
  በጣም የቆዩ ክስተቶች ይጣላሉ (`dropped` ቆጣሪ) — በውሂብ
  መስመሩ ላይ ፈጽሞ የኋላ ግፊት አይፈጠርም።
- **ካልተዋቀረ የተሰናከለ ነው።** `OMNIROUTE_OTEL_ENDPOINT` (ወይም
  `OTEL_EXPORTER_OTLP_ENDPOINT`) መዋቀር አለበት፤ ካልሆነ sink አይመዘገብም
  እና ምንም የOTel ኮድ አይሠራም።

## 5. ሊብራራ የሚችልነት

- `GET /v1/explain/routing` የቅርብ ጊዜ `RoutingEvent`sን (እውነተኛዎቹን
  ውሳኔዎች፣ አዲሱን በቅድሚያ) እና የእያንዳንዱ አቅራቢ/ሞዴል የጥራት ቅጽበታዊ ገጽታን ይመልሳል።
- ማረጋገጫው `/v1/combos`ን ይከተላል (Bearer API key ወይም dashboard session፤
  `REQUIRE_API_KEY=false` በሆነባቸው የአንድ ተጠቃሚ አካባቢያዊ ማሰማሪያዎች ላይ ስም-አልባ)።
- የcombo ደረጃ የእያንዳንዱ ጥሪ መከታተያዎች አሁንም ባለው
  `decisionTrace.ts` (header `X-OmniRoute-Combo-Trace`) በኩል ይገኛሉ።
- ደህንነት፦ ክስተቶች የሚይዙት የማዘዋወሪያ ሜታዳታን ብቻ ነው፤ prompts/bodies/credentialsን ፈጽሞ አይይዙም።

## 6. የግምገማ መስመር ውህደት (ለFuture AGI ዝግጁነት)

OmniRoute Future AGIን (ወይም ማንኛውንም evaluator) እንደ **ሊሆን የሚችል
የብልህነት/ግምገማ backend እንጂ እንደ ጥገኝነት አይመለከተውም**። የማያያዣ ነጥቦቹ፦

- `RoutingEventSink` ክስተቶችን ያለመመሳሰል ሁኔታ ወደ evaluator ሊያስተላልፍ ይችላል።
- `MemoryRoutingEventStore` + የጥራት ቅጽበታዊ ገጽታ evaluatorን ጥሬውን
  የውሳኔ ዥረት ይሰጡታል።
- ወደፊት የሚኖር `Evaluator` (ወሳኝ፣ አካባቢያዊ ዳኛ፣ HTTP፣ WASM) ክስተቶችን/መከታተያዎችን
  ይጠቀማል እና ወደዚያው `getQualityScore`/የጥራት-ምክንያት መንገድ
  የሚገባ `QualityScore` ይመልሳል።
- አሁን ያለው በeval የሚመራ ማዘዋወር (`open-sse/services/evalRouting.ts`) ሲነቃ
  የcombo ዒላማዎችን በ`eval_runs` የማለፍ መጠኖች መሠረት አስቀድሞ እንደገና ያደራጃል።

ምንም ግምገማ በጥያቄው መንገድ ላይ በተመሳሳይ ጊዜ አይሠራም፣ እና gateway ያለ evaluator
ሙሉ በሙሉ ይሠራል።

## 7. የመጨረሻ የሥነ ሕንፃ ግምገማ

1. **በተመሳሳይ ጊዜ በሚሠራው ወሳኝ መንገድ ላይ ምን ቀርቷል?** ማዘዋወር/ነጥብ መስጠት፣ የguardrail
   ቅድመ-ምርመራዎች፣ የcache ፍለጋ እና አንድ `emitRoutingEvent` ወደ
   ውስጠ-ማህደረ ትውስታ sinks የሚደረግ ማከፋፈል (ከመሠረታዊ ነጥብ አሰጣጥ በላይ ~0.12 µs)።
2. **ወደ ያለመመሳሰል ሂደት ምን ተዛወረ?** OTel export (timer + fetch)፣
   `call_logs`/የአጠቃቀም ማከማቻ፣ semantic-cache ጽሑፎች፤ ጥራት በውስጠ-ማህደረ ትውስታ
   የሚቀመጥ እና O(1) ነው (ያለመመሳሰል ሂደት አያስፈልገውም)።
3. **የማዘዋወሪያ ውጤት እንዴት ግብረመልስ ይሆናል?** `handleChatCore`
   `RoutingEvent`ን ያወጣል → `QualityTracker` የEWMA ሁኔታን ያዘምናል → `getQualityScore`
   ለauto-combo `quality` ምክንያት ግብዓት ይሆናል።
4. **ጥራት በወደፊት ማዘዋወር ላይ እንዴት ተጽዕኖ ያሳድራል?** ዝቅተኛ የጥራት ነጥብ
   በ`scoreAutoTargets` ውስጥ የዚያን አቅራቢ/ሞዴል ክብደት የተሰጠውን ነጥብ ይቀንሳል፤ ስለዚህ ጥራታቸው የቀነሰ
   ሞዴሎች ቀስ በቀስ ቅድሚያ ማግኘታቸው ይቀንሳል፣ EWMAቸው ሲሻሻልም ያገግማሉ።
5. **Future AGI ጥገኝነት ሳይሆን እንዴት ሊዋሃድ ይችላል?** በ
   `RoutingEventSink` interface / ወደፊት በሚኖር `Evaluator` adapter በኩል — በቋሚነት የተጻፈ
   ጥገኝነት የለም።
6. **evaluator በማይገኝበት ጊዜ ምን ይከሰታል?** ማዘዋወሩ አይነካም፤
   የታየ ምልክት ለሌላቸው ሞዴሎች ጥራት ወደ ገለልተኛ ነጥብ (1.0) ይመለሳል።
7. **telemetry በማይገኝበት ጊዜ ምን ይከሰታል?** OTel sink በቀላሉ
   አይመዘገብም፤ የተቀረው የማዘዋወሪያ ንብርብር ሳይለወጥ ይሠራል።
8. **ከአቅም በላይ ጫና ሲኖር ምን ይከሰታል?** የOTel ቋት በጣም የቆዩ ክስተቶችን ይጥላል፤ ጥራት
   እና ring buffer በአወቃቀራቸው የተወሰኑ ናቸው፤ የኋላ ግፊት የለም።
9. **ከጥራት መቀነስ በኋላ የአቅራቢው ሁኔታ እንዴት ያገግማል?** ስኬቶች
   እየተከማቹ ሲሄዱ EWMA እንደገና ይጣጣማል፤ warmup አዲስ ሞዴሎችን ገለልተኛ ያደርጋል፤ circuit breaker
   በተናጥል በHALF_OPEN ምርመራዎች ያገግማል።
10. **ከታቀዱት ባህሪያት ሆን ተብሎ ያልተተገበረው የትኛው ነው፣ ለምንስ?**
    - Shadow traffic / experiments — አስቀድሞ ተተግብሯል
      (`combo/shadowRouting.ts`)፤ እንደገና አልተገነባም።
    - Guardrails — አስቀድሞ ተተግብረዋል (`src/lib/guardrails/`)፤ አልተደገሙም።
    - Semantic cache — አስቀድሞ ተተግብሯል (`src/lib/semanticCache.ts`)፤
      አልተደገመም።
    - ሙሉ የexperiment-management platform፣ dataset tooling፣ prompt-optimization
      platform፣ vector DB ወይም አስገዳጅ ውጫዊ የOTel መሠረተ ልማት — ለቀላል የውሂብ መስመር
      ከወሰን ውጭ ናቸው።
    - የRust `RoutingEvent` struct — የውሂብ መስመሩ TypeScript ነው፤ የTS type
      የተስማማ አቻው ነው።

## 8. የውቅር ማጣቀሻ

| ተለዋዋጭ                         | ነባሪ         | ተፅዕኖ                                                          |
| ----------------------------- | ----------- | ------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | አልተዋቀረም     | ሲዋቀር የOTLP/HTTP ዱካዎች ላኪን ያነቃል (ለምሳሌ `http://collector:4318`)። |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | አልተዋቀረም     | ለOTLP መጨረሻ ነጥብ ተተኪ ተለዋጭ ስም።                                   |
| `OTEL_SERVICE_NAME`           | `omniroute` | የ`service.name` ሀብት ባህሪ።                                      |

## 9. ሙከራዎች

- `tests/unit/routing-events.test.ts` — የክስተት ደረጃ ማስተካከያ፣ የሁኔታ
  ምደባ፣ የተገደበ የቀለበት ቋት፣ የመቀበያ ነጥብ ስርጭት + ማግለል።
- `tests/unit/routing-quality.test.ts` — የEWMA ማሟሟቂያ፣ ከውድቀት/ስኬት ማገገም፣
  የአለመደበኛነት ቅጣቶች፣ የ429 ጊዜያዊ አያያዝ፣ ቅጽበታዊ ገጽታ፣ ዳግም ማስጀመር።
- `tests/unit/routing-scoring-quality.test.ts` — የክብደት ትክክለኛነት፣ ገለልተኛ
  ነባሪ፣ የጥራት ምክንያት ደረጃ አሰጣጥ።
- `tests/unit/routing-otel.test.ts` — የማንቃት መግቢያ ቁጥጥር፣ የGenAI ስፋት ውሂብ፣ አልተመሳሰለም
  ማፍሰስ፣ በከባድ ጭነት ጊዜ መጣል።
- `tests/unit/routing-events-concurrency.test.ts` — በሺዎች የሚቆጠሩ ክስተቶች፣ የቀለበት
  ቋት ገደብ፣ ስህተት የሚያስነሳ የመቀበያ ነጥብ ማግለል፣ የተጠላለፉ አልተመሳሰሉ ድንገተኛ ፍሰቶች፣
  በማስገባት ወቅት ዳግም ማስጀመር።
- `tests/unit/routing-adaptive-e2e.test.ts` — በእውነተኛው
  `scoreAutoTargets` ነጥብ ሰጪ በኩል የሚካሄድ ወጥ የጫፍ-እስከ-ጫፍ ዑደት፦ ጤናማ → መበላሸት → ማገገም → ጊዜያዊ መዛባት፣ በተጨማሪም
  የመጀመሪያ ማስነሻ እና የዕድለኛ-ቀዝቃዛ-አቅራቢ ሁኔታዎች።
- `tests/unit/stream-timing.test.ts` — TTFT (መጀመሪያ የተላለፈ ቁራጭ)፣ ITL፣
  የመጀመሪያ ባይት ከመጀመሪያ ማስተላለፍ ጋር ሲነጻጸር፣ መቋረጥ፣ የተበላሸ/ባዶ ቁራጭ ደህንነት።

## 10. ቀድሞ የነበሩ ችግሮች ሁኔታ (ደረጃ 18)

| ችግር                                               | ሁኔታ                  | ማስታወሻዎች                                                                                                                                                                                                             |
| ------------------------------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| የ`omniglyph` ወደ ውጭ መላክ አለመጣጣም                     | **ተስተካክሏል (የአካባቢ)**  | `node_modules` ከ`package-lock.json` ጋር አልተመሳሰለም ነበር (የተጫነው 1.3.1 ሲሆን የተቆለፈው 1.4.0 ነበር)። `npm install omniglyph@1.4.0` ማስኬድ የተቆለፈውን ስሪት መልሷል፤ የዓይነት ስህተቶች ወደ 0 ወርደዋል። መግለጫ ፋይሎች አልተቀየሩም።                             |
| ጊዜ ያለፈባቸው የ`getKnownContextOverflow` ሙከራዎች        | **የታወቀ — አልተስተካከለም** | `combo-context-overflow-compression-probe.test.ts` በ`open-sse/services/combo.ts` ውስጥ ከእንግዲህ የሌለ ፈንክሽን ያስመጣል (የሚጠቅሱት አስተያየቶች ብቻ ናቸው)። ማስተካከሉ ዳግም መተግበርን ወይም እነዚያን ሙከራዎች እንደገና መጻፍን ይጠይቃል — ተዛማጅነት የሌለው የአርክቴክቸር ለውጥ። |
| የ`combo-runtime-unit-concurrency.test.ts` DB ማግለል | **የታወቀ — አልተስተካከለም** | በቀጥታ ሲሄድ የሙከራ ማዕቀፉ የSQLite ማግለል ማረጋገጫ ይወድቃል፤ በመሠረታዊው ቅርንጫፍ ላይም በተመሳሳይ መንገድ ይወድቃል።                                                                                                                                   |
| የi18n `llm.txt` ልዩነት                              | **የታወቀ — አልተስተካከለም** | `docs/i18n/*/llm.txt` ከስር ማውጫው ፋይል ይለያሉ፤ ቀድሞ የነበረ ሲሆን ከመመዝገብ በፊት ያለውን የሰነዶች-ማመሳሰል መግቢያ ይከለክላል።                                                                                                                      |

የአካባቢ እና የኮድ ችግሮች ተለያይተው ይቀመጣሉ፤ ምንም ያልተዛመዱ ውድቀቶች
ከተቀየሩ የሙከራ ማጣሪያዎች ጀርባ አይደበቁም።
