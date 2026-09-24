# Adaptive Routing: Routing Events, Quality Feedback & Explainability (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

ឯកសារនេះពិពណ៌នាអំពីមូលដ្ឋានគ្រឹះនៃការកំណត់ផ្លូវសម្របខ្លួនដែលជំរុញដោយមតិត្រឡប់ ដែលត្រូវបានបន្ថែមទៅក្នុង
OmniRoute។ វាត្រូវបានរៀបចំឱ្យមានទំហំតូចដោយចេតនា៖ វាណែនាំឆានែលលទ្ធផលនៃការកំណត់ផ្លូវដែលមានប្រភេទច្បាស់លាស់
សញ្ញាគុណភាពតាមពេលវេលាជាក់ស្តែងដែលផ្តល់ទិន្នន័យទៅឱ្យកម្មវិធីដាក់ពិន្ទុ auto-combo ដែលមានស្រាប់ កម្មវិធីនាំចេញ
OpenTelemetry ដែលអាចជ្រើសប្រើបាន និង endpoint សម្រាប់ការពន្យល់អំពីការសម្រេចចិត្ត។ វា **មិន**
ជំនួសស្រទាប់ភាពធន់ដែលមានស្រាប់ទេ (circuit breaker, connection cooldown,
model lockout, health matrix, autopilot) — វាបំពេញបន្ថែមលើស្រទាប់ទាំងនោះ។

## 1. បរិបទស្ថាបត្យកម្ម

OmniRoute គឺជា data plane ដែលមាន **ផ្លូវសំខាន់សម្រាប់សំណើ** និង **ផ្នែកគ្រប់គ្រង/បញ្ញា
**។ ផ្លូវសំខាន់ត្រូវតែរក្សាភាពលឿន ប្រើអង្គចងចាំប្រកបដោយប្រសិទ្ធភាព ដំណើរការអសមកាល មានភាពធន់ និង
អាចព្យាករបាន។ ការវាយតម្លៃ ការដាក់ពិន្ទុគុណភាព ការពិសោធន៍ និងការវិភាគប្រវត្តិសាស្ត្រ ស្ថិតនៅក្នុង
ផ្នែកគ្រប់គ្រង។

```
AI Agent / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   data plane (លឿន, សមកាល, ក្នុងអង្គចងចាំ)
│  កំណត់ផ្លូវ / ប្ដូរពេលបរាជ័យ │
│  សុខភាព / របាំងការពារ │
│  ឃ្លាំងសម្ងាត់ / ស្ទ្រីម  │
└──────────┬──────────┘
           │ RoutingEvent (បញ្ជូនហើយមិនរង់ចាំ, ~0.2µs)
           ▼
┌─────────────────────┐
│  ចំណុចទទួលមតិត្រឡប់ │   ផ្នែកគ្រប់គ្រង (អសមកាល, ប្រឹងប្រែងតាមដែលអាចធ្វើបាន)
│  កម្មវិធីតាមដានគុណភាព │
│  កម្មវិធីនាំចេញ OTel │
│  ឃ្លាំងការពន្យល់     │
└──────────┬──────────┘
           ▼  ពិន្ទុគុណភាព
      កម្មវិធីដាក់ពិន្ទុ auto-combo
```

### អ្វីដែលមានរួចហើយ (បានធ្វើសវនកម្ម មិនបានអនុវត្តស្ទួន)

| គោលគំនិត                                               | ការអនុវត្តដែលមានស្រាប់                                                                                 |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| ភាពអាចប្រើបាន (តើយើងអាចបញ្ជូនចរាចរណ៍បានទេ?)            | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, រក្សាទុកក្នុង DB), connection cooldown, model lockout |
| ការរាយការណ៍សុខភាព                                      | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                |
| ចរាចរណ៍ស្រមោល                                          | `open-sse/services/combo/shadowRouting.ts`                                                             |
| របាំងការពារ                                            | `src/lib/guardrails/` (hook មុន/ក្រោយ)                                                                 |
| ឃ្លាំងសម្ងាត់ត្រឹមត្រូវដាច់ខាត                         | `src/lib/semanticCache.ts` (ផ្អែកលើ signature)                                                         |
| កម្មវិធីវាយតម្លៃ / ការកំណត់ផ្លូវដែលជំរុញដោយការវាយតម្លៃ | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                   |
| សមត្ថភាពពន្យល់ការសម្រេចចិត្ត Combo                     | `open-sse/services/combo/decisionTrace.ts`                                                             |
| ព្រឹត្តិការណ៍តាមពេលវេលាជាក់ស្តែងរបស់ Dashboard         | `src/lib/events/eventBus.ts` (ឆានែលជូនដំណឹង UI, payload `unknown`, ប្រវត្តិ 100 ធាតុ)                  |

ស្រទាប់ព្រឹត្តិការណ៍កំណត់ផ្លូវ **មិនមែន** ជាការអនុវត្ត `eventBus` ឡើងវិញទេ៖ bus នោះគឺជា
ឆានែលជូនដំណឹងតាមពេលវេលាជាក់ស្តែងរបស់ dashboard (ឈ្មោះ _ព្រឹត្តិការណ៍_ ដែលមានប្រភេទច្បាស់លាស់
payload ស្រអាប់ អ្នកប្រើប្រាស់ UI)។ `RoutingEvent` គឺជា struct _លទ្ធផល_ ដែលមានប្រភេទច្បាស់លាស់
(latency/tokens/cost/outcome/finish-reason) ដែលត្រូវបានប្រើដោយ
ចំណុចទទួលមតិត្រឡប់របស់ផ្នែកគ្រប់គ្រង (កម្មវិធីតាមដានគុណភាព កម្មវិធីនាំចេញ OTel ឃ្លាំងការពន្យល់)។

### អ្វីដែលខ្វះ (ត្រូវបានបន្ថែមនៅទីនេះ)

1. **អរូបីកម្មព្រឹត្តិការណ៍លទ្ធផលនៃការកំណត់ផ្លូវ + ចំណុចទទួលដែលមានប្រភេទច្បាស់លាស់** (`RoutingEvent` /
   `RoutingEventSink`)។ `decisionTrace` ត្រូវបានកំណត់ត្រឹម combo និងរក្សាទុកតែក្នុងអង្គចងចាំប៉ុណ្ណោះ;
   `comboMetrics` គឺជាបញ្ជរបូកសរុប; `call_logs` គឺជាការរក្សាទុកទិន្នន័យអសមកាលដើម។
   គ្មានមួយណាជាឆានែលលទ្ធផលដែលមានប្រភេទច្បាស់លាស់ និងផ្អែកលើ sink ដែលកម្មវិធីតាមដានគុណភាព កម្មវិធីនាំចេញ OTel
   ឬកម្មវិធីវាយតម្លៃបែប Future-AGI អាចជាវទទួលបានទេ។
2. **សញ្ញាគុណភាពតាមពេលវេលាជាក់ស្តែង** (EWMA) សម្រាប់គុណភាពលទ្ធផល — ពីមុន កម្មវិធីដាក់ពិន្ទុ
   បានប្រើសមត្ថភាពសមស្របនឹងភារកិច្ចថេរ និងអត្រាឆ្លងការវាយតម្លៃដែលត្រូវជ្រើសចូលប៉ុណ្ណោះ ជាតំណាងឱ្យ "គុណភាព"។
3. **កម្មវិធីនាំចេញ OTel ដែលអាចជ្រើសប្រើបាន និងគ្មាន dependency** ដោយប្រើអនុសញ្ញាសេម៉ង់ទិក GenAI។
4. **endpoint សម្រាប់ការពន្យល់អំពីការសម្រេចចិត្ត** ដែលត្រឡប់ការសម្រេចចិត្តកំណត់ផ្លូវពិតប្រាកដ + ស្ថានភាពគុណភាព។

## 2. ព្រឹត្តិការណ៍កំណត់ផ្លូវ (មូលដ្ឋានគ្រឹះសម្រាប់មតិត្រឡប់)

ឯកសារ៖ `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent` ផ្ទុកតែទិន្នន័យមេតានៃការកំណត់ផ្លូវប៉ុណ្ណោះ៖

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
  outcome: RoutingOutcome; // union ដែលបានអនុញ្ញាតក្នុងបញ្ជី
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` គឺជា trait បែប `Send+Sync` នៅក្នុង TypeScript៖

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // ត្រូវតែជា O(1) និងគ្មាន I/O សមកាលកម្ម
}
```

ផ្លូវប្រតិបត្តិការសំខាន់ហៅ `emitRoutingEvent(event)` ម្តងសម្រាប់សំណើនីមួយៗដែលបានបញ្ចប់
(callback ពេល streaming បានបញ្ចប់, ផ្លូវជោគជ័យដែលមិនមែនជា streaming និងផ្លូវបរាជ័យ
malformed-200 នៅក្នុង `handleChatCore`)។ ការបញ្ជូនគឺជា fan-out សមកាលកម្ម
ទៅកាន់ sink ដែលបានចុះឈ្មោះ ប៉ុន្តែ sink នីមួយៗគ្រាន់តែដាក់ចូលជួរ/ធ្វើបច្ចុប្បន្នភាពស្ថានភាពក្នុងអង្គចងចាំប៉ុណ្ណោះ។ **គ្មាន
ការសរសេរទៅមូលដ្ឋានទិន្នន័យដោយសមកាលកម្ម និងគ្មាន network I/O នៅលើផ្លូវប្រតិបត្តិការសំខាន់ទេ។**

sink លំនាំដើម៖

- `MemoryRoutingEventStore` — ring buffer ដែលមានដែនកំណត់ (500), ថ្មីបំផុតនៅមុនគេ សម្រាប់
  endpoint ពន្យល់។
- consumer `QualityTracker` — ធ្វើបច្ចុប្បន្នភាពការប៉ាន់ស្មានគុណភាព EWMA។
- `OtlpHttpsEventSink` — ជាជម្រើស ហើយត្រូវបានបើកតែនៅពេល `OMNIROUTE_OTEL_ENDPOINT`
  (ឬ `OTEL_EXPORTER_OTLP_ENDPOINT`) ត្រូវបានកំណត់។

### overhead ដែលបានវាស់វែង (ការប្រៀបធៀបដោយត្រង់តាមការពិត)

`npm run bench:routing-events` នៅលើ workstation នេះ (100k iterations; ប្រតិបត្តិការ sub-µs
ត្រូវបានវាស់ជា µs/op សរុប ពីព្រោះ percentile ក្នុងមួយប្រតិបត្តិការទាបជាង
resolution របស់ timer `performance.now()`)៖

| សេណារីយ៉ូ                              | µs/op  | ops/s  |
| -------------------------------------- | ------ | ------ |
| baseline (ការដាក់ពិន្ទុប៉ុណ្ណោះ)       | ~0.045 | ~22 M  |
| baseline + RoutingEvent (2 sinks)      | ~0.168 | ~5.9 M |
| baseline + event + ការដាក់ចូលជួរ OTel  | ~0.163 | ~6.1 M |
| ដំណើរការស្របគ្នា (8 bursts ឆ្លាស់គ្នា) | ~0.18  | —      |

ភាពខុសគ្នានៃការបញ្ជូន event លើសពីការដាក់ពិន្ទុ baseline គឺ ~0.12 µs/request; sink OTel
គ្រាន់តែដាក់ចូលជួរ (ការបន្ថែមទៅ buffer ក្នុង O(1)) ដោយមិនបន្ថែមអ្វីដែលអាចវាស់បានឡើយ។ តួលេខទាំងនេះ
អាស្រ័យលើម៉ាស៊ីនជាក់លាក់ និងមានលក្ខណៈប្រៀបធៀប — មិនមែនជាការធានាសម្រាប់ production ទេ។ តួលេខ
"~0.2 µs" របស់ v1 គឺជាការប៉ាន់ស្មានសរុប; វិធីសាស្ត្រនេះបំបែក baseline នៃការដាក់ពិន្ទុ
ចេញពីថ្លៃចំណាយនៃការបញ្ជូន event។

## 3. សញ្ញាគុណភាព (ស្ថានភាព provider ដែលជំរុញដោយមតិត្រឡប់)

ឯកសារ៖ `open-sse/services/routing/quality.ts`

v2 បំបែកគុណភាព **ប្រតិបត្តិការ** ចេញពីគុណភាព **សេម៉ង់ទិក**៖

- **ប្រតិបត្តិការ** — ទាញយកពីផ្លូវកំណត់ផ្លូវសំខាន់ (HTTP 4xx/5xx, ការតភ្ជាប់
  បរាជ័យ, 429s, response មិនត្រឹមត្រូវ, ការរំខាន stream, `finish_reason=length`,
  ជោគជ័យដែលគ្មាន output, latency/TTFT EWMA)។ 200 មិនត្រូវបានចាត់ទុកជាគុណភាព
  សេម៉ង់ទិកទេ។
- **សេម៉ង់ទិក** — តម្លៃជាក់ស្តែងនៃ output ដែលបានបង្កើត។ ត្រូវបានបង្កើតតែដោយ
  evaluator តាមរយៈ `setSemanticQuality()` ប៉ុណ្ណោះ។ វាជា `null` រហូតដល់មាន evaluator ផ្តល់តម្លៃឱ្យវា ហើយ
  មិនដែលលេចចូលទៅក្នុងពិន្ទុប្រតិបត្តិការឡើយ។

ស្ថានភាពតាម (provider, model) នីមួយៗ (EWMA + counter ដែលមានដែនកំណត់)៖

- `successEwma` — EWMA (α=0.2) នៃភាពជោគជ័យរបស់ outcome។
- `latencyEwma` / `ttftEwma` — EWMA នៃ latency (α=0.1)។
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`។
- `recencyMs` — រយៈពេលថ្មីៗប៉ុណ្ណាដែល model ត្រូវបានសង្កេតឃើញចុងក្រោយ។

### ការយល់ដឹងអំពី confidence / sample

`confidence = clamp01(samples / 50)` ហើយពិន្ទុដែលត្រឡប់ទៅ scorer ត្រូវបានលាយបញ្ចូល
ឆ្ពោះទៅចំណុចកណ្តាលអព្យាក្រឹត៖

```
score = 0.5 + confidence * (operational - 0.5)
```

ផលវិបាក (បានផ្ទៀងផ្ទាត់ដោយ test)៖

- provider ថ្មីដែលគ្មានទិន្នន័យ (0 samples) ទទួលបានពិន្ទុ **0.5** — មិនត្រូវបានដាក់ទណ្ឌកម្មដោយអយុត្តិធម៌ទេ ប៉ុន្តែ
  មិនអាចយកឈ្នះ provider ដែលមានការសង្កេតដ៏រឹងមាំរាប់ពាន់បានឡើយ។
- provider ដែលមានជោគជ័យដោយសំណាង 7 ដង ត្រូវបានទាញឆ្ពោះទៅ 0.5 (មិនដែលយកឈ្នះដោយសារ
  initialization បែបសុទិដ្ឋិនិយមឡើយ)។
- provider ដែលមាន 50+ samples នឹងខិតទៅរកពិន្ទុប្រតិបត្តិការពិតរបស់វា។
- ការធ្លាក់ចុះ និងការស្ដារឡើងវិញកើតឡើងជាបន្តបន្ទាប់ (EWMA) ហើយការបរាជ័យដាច់ដោយឡែកមួយ
  មិនបំផ្លាញ provider ដែលមានសុខភាពល្អនោះទេ។

`ProviderQuality` បង្ហាញ `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`។

វាបញ្ជូនទិន្នន័យទៅ auto-combo scorer ជា factor ដាក់ពិន្ទុ `quality`៖

- `ScoringFactors.quality` / `ScoringWeights.quality` នៅក្នុង
  `open-sse/services/autoCombo/scoring.ts`។
- `DEFAULT_WEIGHTS`៖ `health` 0.1905 → 0.1605, `quality` 0.03។ ផលបូកនៅតែជា 1.0។
- `buildAutoCandidates` បំពេញ `candidate.quality` ពី tracker; candidate
  ដែលគ្មានទិន្នន័យនឹងប្រើតម្លៃអព្យាក្រឹតលំនាំដើម **0.5** (candidate ថ្មីដែលគ្មានទិន្នន័យ មិនត្រូវបានបង្កើនពិន្ទុ ហើយក៏មិនត្រូវបាន
  ដាក់ទណ្ឌកម្មដែរ)។

វដ្តបិទ៖

```
RoutingEvent → QualityTracker → getQualityScore → factor គុណភាព auto-combo
      ↑                                                    │
      └────── លទ្ធផលសំណើ (handleChatCore) ←────────────┘
```

### ការដកចេញដាច់ខាត ទល់នឹងការដាក់ទណ្ឌកម្មទន់

សញ្ញាគុណភាពគ្រាន់តែជា **ចំណូលចិត្តសម្របខ្លួនបែបទន់** ប៉ុណ្ណោះ។ ការដកចេញដាច់ខាតនៅតែ
ស្ថិតនៅក្នុង resilience stack ដែលមានស្រាប់៖ circuit breaker OPEN, quota អស់,
ការផ្ទៀងផ្ទាត់បរាជ័យ, model lockout — គ្មានចំណុចណាមួយក្នុងចំណោមនេះត្រូវបានប៉ះពាល់ដោយពិន្ទុគុណភាពឡើយ។
provider ដែលពិន្ទុគុណភាពរបស់វាធ្លាក់ចុះជាបណ្ដោះអាសន្ន នឹងត្រូវបានកាត់បន្ថយអាទិភាព ប៉ុន្តែមិនដែល
ត្រូវបានបិទដាច់ខាតឡើយ។

## 3b. ពេលវេលាស្ទ្រីមស្តង់ដារ (TTFT / ITL)

ឯកសារ៖ `open-sse/utils/streamTiming.ts`

`createStreamTiming()` គឺជាចំណុចតែមួយសម្រាប់ដាក់ឧបករណ៍វាស់វែងលើផ្លូវស្ទ្រីម ដែលបានភ្ជាប់ទៅក្នុង `createSSEStream` (`open-sse/utils/stream.ts`)៖

- `markByte()` — បានទទួល chunk ដំបូងពី upstream។
- `markForward()` — chunk ដំបូងត្រូវបានបញ្ជូនបន្តទៅកាន់ client (ប្រើសម្រាប់ TTFT)។
- `markInterrupted()` — ស្ទ្រីម timeout/abort/error មុនពេលបញ្ចប់ដោយត្រឹមត្រូវ។
- `ttft()` = latency រហូតដល់ SSE chunk ដំបូងត្រូវបានបញ្ជូនបន្ត។ **នេះមិនមែនជា TTFT កម្រិត token ទេ** —
  SSE chunk តែមួយអាចផ្ទុក token សូន្យ/មួយ/ច្រើន។ ត្រូវបានចងក្រងជាឯកសារយ៉ាងច្បាស់លាស់។
- `avgItlMs()` = គម្លាតមធ្យមរវាង chunk (តម្លៃប្រហាក់ប្រហែលនៃ latency របស់ chunk សម្រាប់ ITL)។

TTFT/ITL/interrupted ត្រូវបានបញ្ចូលទៅក្នុង `RoutingEvent` (`ttftMs`, `itlMs`) ហើយត្រូវបាននាំចេញជា span attributes របស់ GenAI/OmniRoute ដោយ OTel sink។

## 4. ការសង្កេតតាមដាន OpenTelemetry / GenAI

ឯកសារ៖ `open-sse/services/routing/otel.ts`

- OTLP/HTTP JSON exporter ដែលមិនពឹងផ្អែកលើ dependency (ប្រើ `fetch` សកល ដោយមិនប្រើ
  `@opentelemetry/*` SDK)។
- Spans អនុវត្តតាម GenAI semantic conventions (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) ព្រមទាំង attributes សម្រាប់ routing របស់ OmniRoute
  (outcome, status, ttft, retries, fallback)។
- `record()` គ្រាន់តែបញ្ចូលទៅក្នុង buffer ដែលមានទំហំកំណត់ (O(1)) ប៉ុណ្ណោះ; timer នៅផ្ទៃខាងក្រោយ
  ធ្វើការ flush តាមរយៈ `POST {endpoint}/v1/traces` ដោយអសមកាល។ នៅពេលមានបន្ទុកលើសកម្រិត events
  ចាស់បំផុតត្រូវបានទម្លាក់ (`dropped` counter) — មិនដាក់ backpressure លើ data
  plane ឡើយ។
- **ត្រូវបានបិទ លុះត្រាតែមានការកំណត់រចនាសម្ព័ន្ធ។** ត្រូវតែកំណត់ `OMNIROUTE_OTEL_ENDPOINT` (ឬ
  `OTEL_EXPORTER_OTLP_ENDPOINT`); បើមិនដូច្នោះទេ sink នឹងមិនត្រូវបានចុះឈ្មោះ ហើយគ្មានកូដ OTel
  ណាមួយដំណើរការទេ។

## 5. សមត្ថភាពពន្យល់

- `GET /v1/explain/routing` ត្រឡប់ `RoutingEvent`s ថ្មីៗ (ការសម្រេចចិត្តពិតប្រាកដ ដោយថ្មីបំផុតនៅមុន) និង snapshot គុណភាពតាម provider/model នីមួយៗ។
- Auth អនុវត្តដូច `/v1/combos` (Bearer API key ឬ dashboard session; អនុញ្ញាត anonymous លើ
  single-user local deployments ដែលមាន `REQUIRE_API_KEY=false`)។
- Traces តាម invocation នីមួយៗនៅកម្រិត combo នៅតែអាចប្រើបានតាមរយៈ
  `decisionTrace.ts` ដែលមានស្រាប់ (header `X-OmniRoute-Combo-Trace`)។
- សុវត្ថិភាព៖ events ផ្ទុកតែ routing metadata ប៉ុណ្ណោះ មិនដែលផ្ទុក prompts/bodies/credentials ទេ។

## 6. ការរួមបញ្ចូល evaluation plane (ការត្រៀមខ្លួនសម្រាប់ Future AGI)

OmniRoute ចាត់ទុក Future AGI (ឬ evaluator ណាមួយ) ជា **backend ផ្នែក intelligence/evaluation ដែលអាចមាន មិនមែនជា dependency ទេ**។ ចំណុចតភ្ជាប់មាន៖

- `RoutingEventSink` អាចបញ្ជូន events បន្តទៅ evaluator ដោយអសមកាល។
- `MemoryRoutingEventStore` + quality snapshot ផ្តល់ឱ្យ evaluator នូវលំហូរទិន្នន័យសម្រេចចិត្តដើម។
- `Evaluator` នាពេលអនាគត (deterministic, local judge, HTTP, WASM) នឹងប្រើប្រាស់
  events/traces ហើយត្រឡប់ `QualityScore` ដែលបញ្ចូលទៅក្នុងផ្លូវ
  `getQualityScore`/quality-factor ដដែល។
- Routing ដែលជំរុញដោយ eval មានស្រាប់ (`open-sse/services/evalRouting.ts`) បានរៀបលំដាប់
  combo targets ឡើងវិញរួចហើយ ដោយផ្អែកលើអត្រាជោគជ័យរបស់ `eval_runs` នៅពេលបើកប្រើ។

គ្មាន evaluation ណាមួយដំណើរការដោយសមកាលលើ request path ទេ ហើយ gateway ដំណើរការ
បានពេញលេញ ទោះបីមិនមាន evaluator ក៏ដោយ។

## 7. ការពិនិត្យស្ថាបត្យកម្មចុងក្រោយ

1. **តើអ្វីខ្លះនៅសល់លើ synchronous hot path?** Routing/scoring, guardrail
   pre-checks, cache lookup និង `emitRoutingEvent` fan-out មួយ (~0.12 µs លើស
   baseline scoring) ទៅកាន់ in-memory sinks។
2. **តើអ្វីខ្លះត្រូវបានផ្លាស់ទៅ asynchronous processing?** ការនាំចេញ OTel (timer + fetch),
   ការរក្សាទុក `call_logs`/usage, ការសរសេរ semantic-cache; quality ស្ថិតក្នុង memory
   និងមាន O(1) (មិនត្រូវការ async)។
3. **តើលទ្ធផល routing ក្លាយជាមតិត្រឡប់ដោយរបៀបណា?** `handleChatCore` បញ្ចេញ
   `RoutingEvent` → `QualityTracker` ធ្វើបច្ចុប្បន្នភាពស្ថានភាព EWMA → `getQualityScore`
   ផ្តល់ទិន្នន័យទៅឱ្យ auto-combo `quality` factor។
4. **តើ quality ជះឥទ្ធិពលដល់ routing នាពេលអនាគតដោយរបៀបណា?** ពិន្ទុ quality ទាបនឹងកាត់បន្ថយ
   weighted score របស់ provider/model នោះនៅក្នុង `scoreAutoTargets` ដូច្នេះ models ដែលធ្លាក់ចុះ
   នឹងត្រូវបានកាត់បន្ថយអាទិភាពបន្តិចម្តងៗ ហើយអាចស្ដារឡើងវិញនៅពេល EWMA របស់ពួកវាប្រសើរឡើង។
5. **តើ Future AGI អាចរួមបញ្ចូលដោយមិនក្លាយជា dependency ដោយរបៀបណា?** តាមរយៈ
   interface `RoutingEventSink` / adapter `Evaluator` នាពេលអនាគត — គ្មាន
   dependency ដែល hardcoded ទេ។
6. **តើមានអ្វីកើតឡើងនៅពេល evaluator មិនអាចប្រើបាន?** Routing មិនរងផលប៉ះពាល់ទេ;
   quality ត្រឡប់ទៅតម្លៃអព្យាក្រឹត (1.0) សម្រាប់ models ដែលគ្មានសញ្ញាត្រូវបានសង្កេតឃើញ។
7. **តើមានអ្វីកើតឡើងនៅពេល telemetry មិនអាចប្រើបាន?** OTel sink គ្រាន់តែមិនត្រូវបាន
   ចុះឈ្មោះ; ផ្នែក routing ដែលនៅសល់ដំណើរការដោយមិនផ្លាស់ប្តូរ។
8. **តើមានអ្វីកើតឡើងនៅពេលបន្ទុកលើសកម្រិត?** OTel buffer ទម្លាក់ events ចាស់បំផុត; quality
   និង ring buffer ត្រូវបានកំណត់ទំហំតាំងពីការរចនា; គ្មាន backpressure ទេ។
9. **តើស្ថានភាព provider ស្ដារឡើងវិញក្រោយការធ្លាក់ចុះដោយរបៀបណា?** EWMA រួមតម្លៃឡើងវិញ នៅពេល
   ជោគជ័យកើនឡើង; warmup រក្សា models ដែលទើបចាប់ផ្ដើមឱ្យនៅអព្យាក្រឹត; circuit breaker
   ស្ដារដោយឯករាជ្យតាមរយៈ HALF_OPEN probes។
10. **តើមុខងារដែលបានស្នើណាខ្លះត្រូវបានសម្រេចចិត្តដោយចេតនាថា មិនអនុវត្ត ហើយហេតុអ្វី?**
    - Shadow traffic / experiments — បានអនុវត្តរួចហើយ
      (`combo/shadowRouting.ts`); មិនបានសាងសង់ឡើងវិញ។
    - Guardrails — បានអនុវត្តរួចហើយ (`src/lib/guardrails/`); មិនបានចម្លងស្ទួន។
    - Semantic cache — បានអនុវត្តរួចហើយ (`src/lib/semanticCache.ts`); មិនបាន
      ចម្លងស្ទួន។
    - Platform ពេញលេញសម្រាប់ experiment-management, ឧបករណ៍ dataset, platform សម្រាប់ prompt-optimization,
      vector DB ឬហេដ្ឋារចនាសម្ព័ន្ធ OTel ខាងក្រៅដែលចាំបាច់ — នៅក្រៅ
      វិសាលភាពសម្រាប់ data plane ដែលស្រាល។
    - Rust `RoutingEvent` struct — data plane គឺ TypeScript; TS type
      គឺជាសមមូលដែលបានសម្រប។

## 8. ឯកសារយោងនៃការកំណត់រចនាសម្ព័ន្ធ

| អថេរ                          | លំនាំដើម    | ឥទ្ធិពល                                                                                |
| ----------------------------- | ----------- | -------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | មិនបានកំណត់ | នៅពេលបានកំណត់ វានឹងបើកកម្មវិធីនាំចេញ trace តាម OTLP/HTTP (ឧ. `http://collector:4318`)។ |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | មិនបានកំណត់ | ឈ្មោះជំនួសបម្រុងសម្រាប់ endpoint របស់ OTLP។                                            |
| `OTEL_SERVICE_NAME`           | `omniroute` | គុណលក្ខណៈធនធាន `service.name`។                                                         |

## 9. ការធ្វើតេស្ត

- `tests/unit/routing-events.test.ts` — ការធ្វើឱ្យព្រឹត្តិការណ៍មានទម្រង់ស្តង់ដារ ការចាត់ថ្នាក់ស្ថានភាព
  ring buffer ដែលមានកម្រិត និងការបញ្ជូនចេញទៅ sink ច្រើន + ការដាក់ឱ្យដាច់ដោយឡែក។
- `tests/unit/routing-quality.test.ts` — ការចាប់ផ្ដើម EWMA ការស្ដារឡើងវិញពីភាពបរាជ័យ/ជោគជ័យ
  ពិន័យសម្រាប់ភាពមិនប្រក្រតី ការដោះស្រាយស្ថានភាពបណ្ដោះអាសន្ន 429 snapshot និង reset។
- `tests/unit/routing-scoring-quality.test.ts` — សុចរិតភាពនៃទម្ងន់ លំនាំដើមអព្យាក្រឹត
  និងការរៀបចំណាត់ថ្នាក់តាមកត្តាគុណភាព។
- `tests/unit/routing-otel.test.ts` — លក្ខខណ្ឌបើកដំណើរការ payload របស់ GenAI span ការ
  flush អសមកាល និងការបោះបង់នៅពេលផ្ទុកលើសកម្រិត។
- `tests/unit/routing-events-concurrency.test.ts` — ព្រឹត្តិការណ៍រាប់ពាន់ ភាពមានកម្រិតរបស់ ring
  buffer ការដាក់ sink ដែលបញ្ចេញកំហុសឱ្យដាច់ដោយឡែក burst អសមកាលដែលឆ្លាស់គ្នា
  និង reset អំឡុងពេលបញ្ចូល។
- `tests/unit/routing-adaptive-e2e.test.ts` — រង្វិលជុំចុងដល់ចុងដែលកំណត់លទ្ធផលបាន តាមរយៈ
  scorer `scoreAutoTargets` ពិតប្រាកដ៖ មានសុខភាពល្អ → ធ្លាក់ចុះ → ស្ដារឡើងវិញ → រំខានមួយភ្លែត ព្រមទាំង
  សេណារីយ៉ូចាប់ផ្ដើមត្រជាក់ និងអ្នកផ្ដល់សេវាត្រជាក់ដែលមានសំណាង។
- `tests/unit/stream-timing.test.ts` — TTFT (chunk ដំបូងដែលបានបញ្ជូនបន្ត), ITL,
  byte ដំបូង ធៀបនឹងការបញ្ជូនបន្តដំបូង ការរំខាន និងសុវត្ថិភាពសម្រាប់ chunk ខុសទម្រង់/ទទេ។

## 10. ស្ថានភាពបញ្ហាដែលមានពីមុន (ដំណាក់កាលទី 18)

| បញ្ហា                                                                 | ស្ថានភាព                      | កំណត់សម្គាល់                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ភាពមិនត្រូវគ្នានៃ export របស់ `omniglyph`                             | **បានជួសជុល (បញ្ហាបរិស្ថាន)** | `node_modules` មិនសមកាលជាមួយ `package-lock.json` (បានដំឡើង 1.3.1 ខណៈដែលបានចាក់សោនៅ 1.4.0)។ ការដំណើរការ `npm install omniglyph@1.4.0` បានស្ដារកំណែដែលបានចាក់សោឡើងវិញ ហើយកំហុសប្រភេទបានថយមកត្រឹម 0។ manifest មិនបានផ្លាស់ប្ដូរ។                              |
| តេស្ត `getKnownContextOverflow` ដែលហួសសម័យ                            | **បានដឹង — មិនបានជួសជុល**     | `combo-context-overflow-compression-probe.test.ts` import មុខងារមួយដែលលែងមានក្នុង `open-sse/services/combo.ts` (មានតែ comment ដែលយោងទៅវាប៉ុណ្ណោះ)។ ការជួសជុលតម្រូវឱ្យអនុវត្តឡើងវិញ ឬសរសេរតេស្តទាំងនោះឡើងវិញ — ជាការផ្លាស់ប្ដូរស្ថាបត្យកម្មដែលមិនពាក់ព័ន្ធ។ |
| ការដាក់ DB ឱ្យដាច់ដោយឡែករបស់ `combo-runtime-unit-concurrency.test.ts` | **បានដឹង — មិនបានជួសជុល**     | assertion សម្រាប់ការដាក់ SQLite ឱ្យដាច់ដោយឡែករបស់ test harness បរាជ័យនៅពេលដំណើរការដោយផ្ទាល់ ហើយបរាជ័យដូចគ្នានៅលើ branch មូលដ្ឋាន។                                                                                                                          |
| ភាពខុសគ្នារបស់ i18n `llm.txt`                                         | **បានដឹង — មិនបានជួសជុល**     | `docs/i18n/*/llm.txt` ខុសពី root; វាមានពីមុន និងរារាំង pre-commit gate សម្រាប់ការធ្វើសមកាលកម្មឯកសារ។                                                                                                                                                       |

បញ្ហាបរិស្ថាន និងបញ្ហាកូដត្រូវបានរក្សាឱ្យដាច់ពីគ្នា; គ្មានភាពបរាជ័យដែលមិនពាក់ព័ន្ធណាមួយត្រូវបានលាក់
នៅពីក្រោយ filter តេស្តដែលបានផ្លាស់ប្ដូរឡើយ។
