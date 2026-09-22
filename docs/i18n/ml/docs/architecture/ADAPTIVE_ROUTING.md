# Adaptive Routing: Routing Events, Quality Feedback & Explainability (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

ഈ പ്രമാണം OmniRoute-ലേക്ക് ചേർത്ത feedback-driven adaptive routing അടിസ്ഥാനസൗകര്യത്തെ വിവരിക്കുന്നു.
ഇത് മനപ്പൂർവം ചെറുതായി നിലനിർത്തിയിരിക്കുന്നു: typed routing-outcome
channel, നിലവിലുള്ള auto-combo scorer-ലേക്ക് നൽകുന്ന online quality signal,
ഐച്ഛികമായ OpenTelemetry exporter, explainability endpoint എന്നിവയാണ് ഇത് അവതരിപ്പിക്കുന്നത്. നിലവിലുള്ള resilience stack-നെ (circuit breaker, connection cooldown,
model lockout, health matrix, autopilot) ഇത് **മാറ്റിസ്ഥാപിക്കുന്നില്ല** — മറിച്ച് അതിനെ പൂരകമാക്കുന്നു.

## 1. ആർക്കിടെക്ചറൽ പശ്ചാത്തലം

OmniRoute എന്നത് **request hot path**, **control/intelligence
plane** എന്നിവയുള്ള ഒരു data plane ആണ്. hot path വേഗതയേറിയതും, മെമ്മറി കാര്യക്ഷമമായി ഉപയോഗിക്കുന്നതും, asynchronous-ഉം, പ്രതിരോധശേഷിയുള്ളതും,
പ്രവചനീയവുമായിരിക്കണം. Evaluation, quality scoring, experiments, historical analysis എന്നിവ
control plane-ന്റെ ഭാഗമാണ്.

```
AI Agent / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   data plane (വേഗതയേറിയത്, sync, in-memory)
│  routing / failover │
│  health / guardrail │
│  cache / streaming  │
└──────────┬──────────┘
           │ RoutingEvent (fire-and-forget, ~0.2µs)
           ▼
┌─────────────────────┐
│  Feedback sinks     │   control plane (async, best-effort)
│  quality tracker    │
│  OTel exporter      │
│  explain store      │
└──────────┬──────────┘
           ▼  quality score
      auto-combo scorer
```

### മുമ്പേ ഉണ്ടായിരുന്നത് (ഓഡിറ്റ് ചെയ്തത്, തനിപ്പകർപ്പ് സൃഷ്ടിച്ചിട്ടില്ല)

| ആശയം                                    | നിലവിലുള്ള നടപ്പാക്കൽ                                                                                  |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| ലഭ്യത (നമുക്ക് traffic അയയ്ക്കാനാകുമോ?) | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, DB-യിൽ persisted), connection cooldown, model lockout |
| Health reporting                        | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                |
| Shadow traffic                          | `open-sse/services/combo/shadowRouting.ts`                                                             |
| Guardrails                              | `src/lib/guardrails/` (pre/post hooks)                                                                 |
| Exact cache                             | `src/lib/semanticCache.ts` (signature-based)                                                           |
| Evaluators / eval-driven routing        | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                   |
| Combo decision explainability           | `open-sse/services/combo/decisionTrace.ts`                                                             |
| Dashboard real-time events              | `src/lib/events/eventBus.ts` (UI notification channel, `unknown` payloads, 100-entry history)          |

routing-event layer, `eventBus`-ന്റെ പുനർനടപ്പാക്കൽ **അല്ല**: ആ bus
dashboard-ന്റെ real-time notification channel ആണ് (typed _event names_, opaque
payloads, UI consumers). `RoutingEvent` എന്നത് control plane-ന്റെ
feedback sinks (quality tracker, OTel exporter, explain store) ഉപയോഗിക്കുന്ന typed _outcome_ struct
(latency/tokens/cost/outcome/finish-reason) ആണ്.

### ഇല്ലാതിരുന്നതും ഇവിടെ ചേർത്തതും

1. **typed routing-outcome event + sink abstraction** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` combo-യിൽ മാത്രം പരിമിതപ്പെട്ടതും in-memory മാത്രമായതുമാണ്;
   `comboMetrics` cumulative counters ആണ്; `call_logs` raw async persistence ആണ്.
   quality tracker, OTel
   exporter, അല്ലെങ്കിൽ Future-AGI-style evaluator എന്നിവയ്ക്ക് subscribe ചെയ്യാനാകുന്ന typed, sink-based outcome channel ഇവയിലൊന്നുമല്ല.
2. Output quality-ക്കായുള്ള **online quality signal** (EWMA) — മുമ്പ് scorer,
   static task fitness, opt-in eval pass-rates എന്നിവയിലൂടെ മാത്രമാണ് "quality"-യെ പരോക്ഷമായി കണക്കാക്കിയിരുന്നത്.
3. GenAI semantic conventions ഉപയോഗിക്കുന്ന **ഐച്ഛികവും dependency-free-യുമായ OTel exporter**.
4. യഥാർഥ routing decisions + quality state തിരികെ നൽകുന്ന **explainability endpoint**.

## 2. റൂട്ടിംഗ് ഇവന്റുകൾ (ഫീഡ്ബാക്ക് അടിത്തറ)

ഫയലുകൾ: `open-sse/services/routing/events.ts`, `.../index.ts`

ഒരു `RoutingEvent` റൂട്ടിംഗ് മെറ്റാഡാറ്റ മാത്രം വഹിക്കുന്നു:

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
  outcome: RoutingOutcome; // അനുവദനീയമായ മൂല്യങ്ങളുടെ യൂണിയൻ
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` എന്നത് TypeScript-ലെ ഒരു `Send+Sync`-ശൈലിയിലുള്ള ട്രെയ്റ്റാണ്:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // O(1) ആയിരിക്കണം, സമകാലിക I/O പാടില്ല
}
```

ഹോട്ട് പാത്ത്, പൂർത്തിയായ ഓരോ അഭ്യർത്ഥനയ്ക്കും ഒരിക്കൽ `emitRoutingEvent(event)` വിളിക്കുന്നു
(`handleChatCore`-ലെ സ്ട്രീമിംഗ് പൂർത്തീകരണ കോൾബാക്ക്, നോൺ-സ്ട്രീമിംഗ് വിജയ പാത്ത്,
വികലമായ-200 പരാജയ പാത്ത് എന്നിവയിൽ). രജിസ്റ്റർ ചെയ്ത സിങ്കുകളിലേക്കുള്ള ഫാൻ-ഔട്ട്
സമകാലികമാണ്, എന്നാൽ ഓരോ സിങ്കും ഇൻ-മെമ്മറി സ്റ്റേറ്റ് ക്യൂവിൽ ചേർക്കുകയോ
അപ്ഡേറ്റ് ചെയ്യുകയോ മാത്രമാണ് ചെയ്യുന്നത്. **ഹോട്ട് പാത്തിൽ സമകാലിക ഡാറ്റാബേസ്
റൈറ്റുകളോ നെറ്റ്വർക്ക് I/O-യോ ഇല്ല.**

ഡിഫോൾട്ട് സിങ്കുകൾ:

- `MemoryRoutingEventStore` — എക്സ്പ്ലെയിൻ എൻഡ്പോയിന്റിനായി, പരിധിയുള്ള (500)
  റിംഗ് ബഫർ, ഏറ്റവും പുതിയത് ആദ്യം.
- `QualityTracker` ഉപഭോക്താവ് — EWMA ഗുണനിലവാര എസ്റ്റിമേറ്റ് അപ്ഡേറ്റ് ചെയ്യുന്നു.
- `OtlpHttpsEventSink` — ഐച്ഛികം; `OMNIROUTE_OTEL_ENDPOINT`
  (അല്ലെങ്കിൽ `OTEL_EXPORTER_OTLP_ENDPOINT`) സജ്ജീകരിച്ചിരിക്കുമ്പോൾ മാത്രം പ്രവർത്തനക്ഷമമാകും.

### അളന്ന ഓവർഹെഡ് (സത്യസന്ധമായ താരതമ്യം)

ഈ വർക്ക്സ്റ്റേഷനിൽ `npm run bench:routing-events` (100k ആവർത്തനങ്ങൾ; ഓരോ
ഓപ്പറേഷന്റെയും പെർസെന്റൈലുകൾ `performance.now()` ടൈമർ റെസല്യൂഷനേക്കാൾ
താഴെയായതിനാൽ, sub-µs ഓപ്പറേഷനുകൾ സംഗ്രഹിച്ച µs/op ആയി അളന്നു):

| സാഹചര്യം                             | µs/op  | ops/s  |
| ------------------------------------ | ------ | ------ |
| ബേസ്ലൈൻ (സ്കോറിംഗ് മാത്രം)           | ~0.045 | ~22 M  |
| ബേസ്ലൈൻ + RoutingEvent (2 സിങ്കുകൾ)  | ~0.168 | ~5.9 M |
| ബേസ്ലൈൻ + ഇവന്റ് + OTel ക്യൂ ചേർക്കൽ | ~0.163 | ~6.1 M |
| സമകാലികം (8 ഇടകലർന്ന ബർസ്റ്റുകൾ)     | ~0.18  | —      |

ബേസ്ലൈൻ സ്കോറിംഗിനെ അപേക്ഷിച്ചുള്ള ഇവന്റ്-ഡിസ്പാച്ച് വ്യത്യാസം
~0.12 µs/request ആണ്; OTel സിങ്ക് ക്യൂവിൽ ചേർക്കുക മാത്രം ചെയ്യുന്നതിനാൽ
(O(1) ബഫർ പുഷ്), അളക്കാവുന്ന അധിക ചെലവൊന്നും ചേർക്കുന്നില്ല. ഈ സംഖ്യകൾ
മെഷീൻ-നിർദ്ദിഷ്ടവും ആപേക്ഷികവുമാണ് — ഇവ പ്രൊഡക്ഷൻ ഉറപ്പല്ല. v1-ലെ
"~0.2 µs" എന്ന കണക്ക് ഒരു സംഗ്രഹ എസ്റ്റിമേറ്റായിരുന്നു; ഈ രീതിശാസ്ത്രം
സ്കോറിംഗ് ബേസ്ലൈനിനെ ഇവന്റ്-ഡിസ്പാച്ച് ചെലവിൽനിന്ന് വേർതിരിക്കുന്നു.

## 3. ഗുണനിലവാര സിഗ്നൽ (ഫീഡ്ബാക്ക് നയിക്കുന്ന പ്രൊവൈഡർ സ്റ്റേറ്റ്)

ഫയലുകൾ: `open-sse/services/routing/quality.ts`

v2, **പ്രവർത്തനപരമായ** ഗുണനിലവാരത്തെയും **സെമാന്റിക്** ഗുണനിലവാരത്തെയും
വേർതിരിക്കുന്നു:

- **പ്രവർത്തനപരം** — റൂട്ടിംഗ് ഹോട്ട് പാത്തിൽനിന്ന് നിർണ്ണയിക്കുന്നത് (HTTP 4xx/5xx,
  കണക്ഷൻ പരാജയങ്ങൾ, 429-കൾ, വികലമായ പ്രതികരണങ്ങൾ, സ്ട്രീം തടസ്സങ്ങൾ,
  `finish_reason=length`, ഔട്ട്പുട്ട് ഇല്ലാത്ത വിജയങ്ങൾ, ലേറ്റൻസി/TTFT EWMA).
  ഒരു 200-നെ സെമാന്റിക് ഗുണനിലവാരമായി കണക്കാക്കുന്നില്ല.
- **സെമാന്റിക്** — ജനറേറ്റ് ചെയ്ത ഔട്ട്പുട്ടിന്റെ യഥാർത്ഥ മൂല്യം. ഒരു ഇവാലുവേറ്റർ
  `setSemanticQuality()` വഴി മാത്രമേ ഇത് എപ്പോഴും സൃഷ്ടിക്കുകയുള്ളൂ. ഒന്ന്
  നൽകുന്നതുവരെ ഇത് `null` ആയിരിക്കും; പ്രവർത്തനപരമായ സ്കോറിലേക്ക് ഇത് ഒരിക്കലും
  ചോർന്നുകയറുകയുമില്ല.

ഓരോ (provider, model)-നുമുള്ള സ്റ്റേറ്റ് (EWMA + പരിധിയുള്ള കൗണ്ടറുകൾ):

- `successEwma` — ഫലത്തിന്റെ വിജയത്തിനായുള്ള EWMA (α=0.2).
- `latencyEwma` / `ttftEwma` — ലേറ്റൻസിയുടെ EWMA (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — മോഡൽ അവസാനമായി നിരീക്ഷിക്കപ്പെട്ടത് എത്ര അടുത്തകാലത്താണെന്ന്.

### ആത്മവിശ്വാസം / സാമ്പിൾ അവബോധം

`confidence = clamp01(samples / 50)`, കൂടാതെ സ്കോററിലേക്ക് നൽകുന്ന സ്കോർ
നിഷ്പക്ഷ മധ്യബിന്ദുവിലേക്ക് ബ്ലെൻഡ് ചെയ്യപ്പെടുന്നു:

```
score = 0.5 + confidence * (operational - 0.5)
```

അനന്തരഫലങ്ങൾ (ടെസ്റ്റുകളിലൂടെ സ്ഥിരീകരിച്ചത്):

- ഒരു കോൾഡ് പ്രൊവൈഡർ (0 സാമ്പിളുകൾ) **0.5** സ്കോർ നേടുന്നു — അന്യായമായി
  പിഴ ചുമത്തപ്പെടുന്നില്ല, എന്നാൽ ശക്തമായ ആയിരക്കണക്കിന് നിരീക്ഷണങ്ങളുള്ള ഒരു
  പ്രൊവൈഡറിനെ മറികടക്കാനും കഴിയില്ല.
- ഭാഗ്യകരമായ 7 വിജയങ്ങളുള്ള ഒരു പ്രൊവൈഡറിന്റെ സ്കോർ 0.5-ലേക്ക് അടുപ്പിക്കപ്പെടുന്നു
  (ശുഭാപ്തിവിശ്വാസപരമായ ഇനിഷ്യലൈസേഷനിൽനിന്ന് ഒരിക്കലും ആധിപത്യം നേടുന്നില്ല).
- 50+ സാമ്പിളുകളുള്ള ഒരു പ്രൊവൈഡർ അതിന്റെ യഥാർത്ഥ പ്രവർത്തനപരമായ സ്കോറിലേക്ക്
  കൺവർജ് ചെയ്യുന്നു.
- നിലവാരത്തകർച്ചയും വീണ്ടെടുക്കലും ക്രമേണയാണ് (EWMA); ഒറ്റപ്പെട്ട ഒരു പരാജയം
  ആരോഗ്യകരമായ ഒരു പ്രൊവൈഡറെ തകർക്കുന്നില്ല.

`ProviderQuality`, `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }` വെളിപ്പെടുത്തുന്നു.

ഇത് `quality` സ്കോറിംഗ് ഘടകമായി auto-combo സ്കോററിലേക്ക് നൽകപ്പെടുന്നു:

- `open-sse/services/autoCombo/scoring.ts`-ലെ `ScoringFactors.quality` /
  `ScoringWeights.quality`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. ആകെ തുക 1.0 ആയി തുടരുന്നു.
- `buildAutoCandidates`, ട്രാക്കറിൽനിന്ന് `candidate.quality` പൂരിപ്പിക്കുന്നു;
  ഡാറ്റയില്ലാത്ത കാൻഡിഡേറ്റുകൾക്ക് ഡിഫോൾട്ടായി നിഷ്പക്ഷമായ **0.5** ലഭിക്കുന്നു
  (ഒരു കോൾഡ് കാൻഡിഡേറ്റിന് ബൂസ്റ്റോ പിഴയോ ലഭിക്കുന്നില്ല).

ക്ലോസ്ഡ് ലൂപ്പ്:

```
RoutingEvent → QualityTracker → getQualityScore → auto-combo ഗുണനിലവാര ഘടകം
      ↑                                                    │
      └────── അഭ്യർത്ഥനാ ഫലം (handleChatCore) ←────────────┘
```

### കർശനമായ ഒഴിവാക്കലും മൃദുവായ പിഴയും

ഗുണനിലവാര സിഗ്നൽ ഒരു **മൃദുവായ അഡാപ്റ്റീവ് മുൻഗണന** മാത്രമാണ്. കർശനമായ
ഒഴിവാക്കൽ നിലവിലുള്ള റെസിലിയൻസ് സ്റ്റാക്കിൽ തന്നെ തുടരുന്നു: circuit breaker
OPEN, ക്വോട്ട തീർന്നത്, ഓത്ത് പരാജയം, മോഡൽ ലോക്കൗട്ട് — ഇവയൊന്നും ഗുണനിലവാര
സ്കോറിനാൽ ബാധിക്കപ്പെടുന്നില്ല. ഗുണനിലവാര സ്കോർ താൽക്കാലികമായി താഴുന്ന ഒരു
പ്രൊവൈഡറിന് മുൻഗണന കുറയ്ക്കുക മാത്രമാണ് ചെയ്യുന്നത്; ഒരിക്കലും കർശനമായി
പ്രവർത്തനരഹിതമാക്കുന്നില്ല.

## 3b. കാനോണിക്കൽ സ്ട്രീം ടൈമിംഗ് (TTFT / ITL)

ഫയലുകൾ: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` എന്നത് സ്ട്രീമിംഗ് പാത്തിനുള്ള ഏക ഇൻസ്ട്രുമെന്റേഷൻ സീമാണ്,
ഇത് `createSSEStream`-ലേക്ക് വയർ ചെയ്തിരിക്കുന്നു (open-sse/utils/stream.ts):

- `markByte()` — ആദ്യ അപ്സ്ട്രീം ചങ്ക് ലഭിച്ചു.
- `markForward()` — ക്ലയന്റിലേക്ക് ഫോർവേഡ് ചെയ്ത ആദ്യ ചങ്ക് (TTFT-ക്കായി ഉപയോഗിക്കുന്നു).
- `markInterrupted()` — കൃത്യമായ ഫിനിഷിന് മുമ്പുള്ള സ്ട്രീം ടൈംഔട്ട്/അബോർട്ട്/പിശക്.
- `ttft()` = ആദ്യം ഫോർവേഡ് ചെയ്ത SSE ചങ്കിന്റെ ലേറ്റൻസി. **ഇത് ടോക്കൺ-ലെവൽ TTFT അല്ല** —
  ഒരൊറ്റ SSE ചങ്കിൽ പൂജ്യം/ഒന്ന്/നിരവധി ടോക്കണുകൾ ഉണ്ടായേക്കാം. ഇത് കൃത്യമായി രേഖപ്പെടുത്തിയിരിക്കുന്നു.
- `avgItlMs()` = ശരാശരി ഇന്റർ-ചങ്ക് ഇടവേള (ITL-നുള്ള ഒരു ചങ്ക്-ലേറ്റൻസി പ്രോക്സി).

TTFT/ITL/interrupted എന്നിവ `RoutingEvent`-ലേക്ക് (`ttftMs`, `itlMs`) ഒഴുകുകയും
OTel സിങ്ക് വഴി GenAI/OmniRoute സ്പാൻ ആട്രിബ്യൂട്ടുകളായി എക്സ്പോർട്ട് ചെയ്യപ്പെടുകയും ചെയ്യുന്നു.

## 4. OpenTelemetry / GenAI നിരീക്ഷണക്ഷമത

ഫയലുകൾ: `open-sse/services/routing/otel.ts`

- ഡിപ്പൻഡൻസി-രഹിത OTLP/HTTP JSON എക്സ്പോർട്ടർ (ഗ്ലോബൽ `fetch` ഉപയോഗിക്കുന്നു,
  `@opentelemetry/*` SDK ഉപയോഗിക്കുന്നില്ല).
- സ്പാനുകൾ GenAI സെമാന്റിക് കൺവെൻഷനുകൾ (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) പാലിക്കുന്നു; കൂടാതെ OmniRoute റൂട്ടിംഗ്
  ആട്രിബ്യൂട്ടുകളും (ഫലം, സ്റ്റാറ്റസ്, ttft, റീട്രൈകൾ, ഫോൾബാക്ക്) ഉൾപ്പെടുന്നു.
- `record()` ഒരു പരിധിയുള്ള ബഫറിലേക്ക് എൻക്യൂ ചെയ്യുക മാത്രമാണ് ചെയ്യുന്നത് (O(1)); ഒരു ബാക്ക്ഗ്രൗണ്ട് ടൈമർ
  `POST {endpoint}/v1/traces` വഴി അസിങ്ക്രണസായി ഫ്ലഷ് ചെയ്യുന്നു. ഓവർലോഡിൽ
  ഏറ്റവും പഴയ ഇവന്റുകൾ ഡ്രോപ്പ് ചെയ്യപ്പെടുന്നു (`dropped` കൗണ്ടർ) — ഡാറ്റാ പ്ലെയിനിൽ ഒരിക്കലും ബാക്ക്പ്രഷർ സൃഷ്ടിക്കില്ല.
- **കോൺഫിഗർ ചെയ്തില്ലെങ്കിൽ പ്രവർത്തനരഹിതമാണ്.** `OMNIROUTE_OTEL_ENDPOINT` (അല്ലെങ്കിൽ
  `OTEL_EXPORTER_OTLP_ENDPOINT`) സജ്ജീകരിച്ചിരിക്കണം; അല്ലാത്തപക്ഷം സിങ്ക്
  രജിസ്റ്റർ ചെയ്യപ്പെടില്ല, കൂടാതെ OTel കോഡൊന്നും പ്രവർത്തിക്കില്ല.

## 5. വിശദീകരണക്ഷമത

- `GET /v1/explain/routing` സമീപകാല `RoutingEvent`-കൾ (യഥാർത്ഥ
  തീരുമാനങ്ങൾ, ഏറ്റവും പുതിയത് ആദ്യം) കൂടാതെ ഓരോ പ്രൊവൈഡർ/മോഡലിന്റെയും ക്വാളിറ്റി സ്നാപ്ഷോട്ടും നൽകുന്നു.
- ഓത്ത് `/v1/combos`-നെ അനുകരിക്കുന്നു (Bearer API കീ അല്ലെങ്കിൽ ഡാഷ്ബോർഡ് സെഷൻ;
  `REQUIRE_API_KEY=false` ഉള്ള സിംഗിൾ-യൂസർ ലോക്കൽ ഡിപ്ലോയ്മെന്റുകളിൽ അനോനിമസ്).
- നിലവിലുള്ള `decisionTrace.ts` വഴി കോംബോ-ലെവൽ ഓരോ ഇൻവൊക്കേഷനിലെയും ട്രേസുകൾ തുടർന്നും ലഭ്യമാണ്
  (ഹെഡർ `X-OmniRoute-Combo-Trace`).
- സുരക്ഷ: ഇവന്റുകളിൽ റൂട്ടിംഗ് മെറ്റാഡാറ്റ മാത്രം ഉൾപ്പെടുന്നു; പ്രോംപ്റ്റുകൾ/ബോഡികൾ/ക്രെഡൻഷ്യലുകൾ ഒരിക്കലും ഉൾപ്പെടുന്നില്ല.

## 6. ഇവാലുവേഷൻ-പ്ലെയിൻ ഇന്റഗ്രേഷൻ (Future AGI സന്നദ്ധത)

OmniRoute, Future AGI-യെ (അല്ലെങ്കിൽ ഏതൊരു ഇവാലുവേറ്ററെയും) ഒരു **സാധ്യതയുള്ള
ഇന്റലിജൻസ്/ഇവാലുവേഷൻ ബാക്കെൻഡായി കണക്കാക്കുന്നു, ഡിപ്പൻഡൻസിയായി അല്ല**. സീമുകൾ:

- ഒരു `RoutingEventSink`-ന് ഇവന്റുകൾ അസിങ്ക്രണസായി ഒരു ഇവാലുവേറ്ററിലേക്ക് ഫോർവേഡ് ചെയ്യാനാകും.
- `MemoryRoutingEventStore` + ക്വാളിറ്റി സ്നാപ്ഷോട്ട്, ഒരു ഇവാലുവേറ്ററിന് അസംസ്കൃത
  തീരുമാന സ്ട്രീം നൽകുന്നു.
- ഭാവിയിലെ ഒരു `Evaluator` (ഡിറ്റർമിനിസ്റ്റിക്, ലോക്കൽ ജഡ്ജ്, HTTP, WASM) ഇവന്റുകൾ/ട്രേസുകൾ ഉപയോഗിക്കുകയും,
  അതേ `getQualityScore`/ക്വാളിറ്റി-ഫാക്ടർ പാത്തിലേക്ക് നൽകപ്പെടുന്ന ഒരു `QualityScore` തിരികെ നൽകുകയും ചെയ്യും.
- നിലവിലുള്ള ഇവാൽ-ഡ്രിവൻ റൂട്ടിംഗ് (`open-sse/services/evalRouting.ts`) പ്രവർത്തനക്ഷമമാക്കിയിരിക്കുമ്പോൾ
  `eval_runs` പാസ്-റേറ്റുകൾ പ്രകാരം കോംബോ ടാർഗെറ്റുകളെ ഇതിനകം തന്നെ പുനഃക്രമീകരിക്കുന്നു.

റിക്വസ്റ്റ് പാത്തിൽ ഒരു ഇവാലുവേഷനും സിങ്ക്രണസായി പ്രവർത്തിക്കുന്നില്ല; ഇവാലുവേറ്റർ ഇല്ലാതെയും ഗേറ്റ്വേ
പൂർണ്ണമായി പ്രവർത്തിക്കുന്നു.

## 7. അന്തിമ ആർക്കിടെക്ചറൽ അവലോകനം

1. **സിങ്ക്രണസ് ഹോട്ട് പാത്തിൽ എന്താണ് ശേഷിക്കുന്നത്?** റൂട്ടിംഗ്/സ്കോറിംഗ്, ഗാർഡ്റെയിൽ
   പ്രീ-ചെക്കുകൾ, കാഷ് ലുക്കപ്പ്, ഇൻ-മെമ്മറി സിങ്കുകളിലേക്കുള്ള ഒരു `emitRoutingEvent` ഫാൻ-ഔട്ട്
   (ബേസ്ലൈൻ സ്കോറിംഗിനേക്കാൾ ~0.12 µs അധികം).
2. **അസിങ്ക്രണസ് പ്രോസസ്സിംഗിലേക്ക് എന്താണ് മാറ്റിയത്?** OTel എക്സ്പോർട്ട് (ടൈമർ + fetch),
   `call_logs`/ഉപയോഗ പെർസിസ്റ്റൻസ്, സെമാന്റിക്-കാഷ് റൈറ്റുകൾ; ക്വാളിറ്റി ഇൻ-മെമ്മറിയിലും
   O(1)-ലുമാണ് (അസിങ്ക്രണസ് ആവശ്യമില്ല).
3. **ഒരു റൂട്ടിംഗ് ഫലം എങ്ങനെയാണ് ഫീഡ്ബാക്കായി മാറുന്നത്?** `handleChatCore` ഒരു
   `RoutingEvent` എമിറ്റ് ചെയ്യുന്നു → `QualityTracker` EWMA സ്റ്റേറ്റ് അപ്ഡേറ്റ് ചെയ്യുന്നു → `getQualityScore`
   ഓട്ടോ-കോംബോ `quality` ഫാക്ടറിലേക്ക് നൽകുന്നു.
4. **ഭാവിയിലെ റൂട്ടിംഗിനെ ക്വാളിറ്റി എങ്ങനെ സ്വാധീനിക്കുന്നു?** കുറഞ്ഞ ക്വാളിറ്റി സ്കോർ
   `scoreAutoTargets`-ൽ ആ പ്രൊവൈഡർ/മോഡലിന്റെ വെയ്റ്റഡ് സ്കോർ കുറയ്ക്കുന്നു; അതിനാൽ നിലവാരം കുറഞ്ഞ
   മോഡലുകൾ ക്രമേണ മുൻഗണനയിൽ നിന്ന് താഴേക്ക് മാറുകയും അവയുടെ EWMA മെച്ചപ്പെടുമ്പോൾ വീണ്ടെടുക്കുകയും ചെയ്യുന്നു.
5. **ഒരു ഡിപ്പൻഡൻസിയായി മാറാതെ Future AGI-യ്ക്ക് എങ്ങനെ ഇന്റഗ്രേറ്റ് ചെയ്യാനാകും?**
   `RoutingEventSink` ഇന്റർഫേസ് / ഭാവിയിലെ ഒരു `Evaluator` അഡാപ്റ്റർ വഴി — ഹാർഡ്കോഡ് ചെയ്ത
   ഡിപ്പൻഡൻസി ഇല്ല.
6. **ഇവാലുവേറ്റർ ലഭ്യമല്ലാത്തപ്പോൾ എന്ത് സംഭവിക്കും?** റൂട്ടിംഗിനെ ബാധിക്കില്ല;
   നിരീക്ഷിച്ച സിഗ്നൽ ഇല്ലാത്ത മോഡലുകൾക്ക് ക്വാളിറ്റി ന്യൂട്രൽ മൂല്യമായ (1.0) ഉപയോഗിക്കും.
7. **ടെലിമെട്രി ലഭ്യമല്ലാത്തപ്പോൾ എന്ത് സംഭവിക്കും?** OTel സിങ്ക് രജിസ്റ്റർ ചെയ്യപ്പെടില്ല;
   റൂട്ടിംഗ് ലെയറിന്റെ ശേഷിക്കുന്ന ഭാഗങ്ങൾ മാറ്റമില്ലാതെ പ്രവർത്തിക്കും.
8. **ഓവർലോഡിൽ എന്ത് സംഭവിക്കും?** OTel ബഫർ ഏറ്റവും പഴയ ഇവന്റുകൾ ഡ്രോപ്പ് ചെയ്യും; ക്വാളിറ്റിയും
   റിംഗ് ബഫറും രൂപകൽപ്പനപ്രകാരം പരിധിയുള്ളവയാണ്; ബാക്ക്പ്രഷർ ഉണ്ടാകില്ല.
9. **നിലവാരത്തകർച്ചയ്ക്ക് ശേഷം പ്രൊവൈഡർ സ്റ്റേറ്റ് എങ്ങനെ വീണ്ടെടുക്കുന്നു?** വിജയങ്ങൾ
   കൂടുന്നതിനനുസരിച്ച് EWMA വീണ്ടും കൺവർജ് ചെയ്യുന്നു; വാംഅപ്പ് കോൾഡ് മോഡലുകളെ ന്യൂട്രലായി നിലനിർത്തുന്നു;
   സർക്യൂട്ട് ബ്രേക്കർ സ്വതന്ത്രമായി HALF_OPEN പ്രോബുകൾ വഴി വീണ്ടെടുക്കുന്നു.
10. **നിർദ്ദേശിച്ച ഏത് ഫീച്ചറുകളാണ് മനഃപൂർവം നടപ്പാക്കാതിരുന്നത്, എന്തുകൊണ്ട്?**
    - ഷാഡോ ട്രാഫിക് / പരീക്ഷണങ്ങൾ — ഇതിനകം നടപ്പാക്കിയിട്ടുണ്ട്
      (`combo/shadowRouting.ts`); വീണ്ടും നിർമ്മിച്ചിട്ടില്ല.
    - ഗാർഡ്റെയിലുകൾ — ഇതിനകം നടപ്പാക്കിയിട്ടുണ്ട് (`src/lib/guardrails/`); ഡ്യൂപ്ലിക്കേറ്റ് ചെയ്തിട്ടില്ല.
    - സെമാന്റിക് കാഷ് — ഇതിനകം നടപ്പാക്കിയിട്ടുണ്ട് (`src/lib/semanticCache.ts`); ഡ്യൂപ്ലിക്കേറ്റ് ചെയ്തിട്ടില്ല.
    - ഒരു സമ്പൂർണ്ണ പരീക്ഷണ-മാനേജ്മെന്റ് പ്ലാറ്റ്ഫോം, ഡാറ്റാസെറ്റ് ടൂളിംഗ്, പ്രോംപ്റ്റ്-ഓപ്റ്റിമൈസേഷൻ
      പ്ലാറ്റ്ഫോം, വെക്റ്റർ DB, അല്ലെങ്കിൽ നിർബന്ധിത ബാഹ്യ OTel ഇൻഫ്രാസ്ട്രക്ചർ — ലളിതമായ ഒരു
      ഡാറ്റാ പ്ലെയിനിന്റെ സ്കോപ്പിന് പുറത്താണ്.
    - ഒരു Rust `RoutingEvent` struct — ഡാറ്റാ പ്ലെയിൻ TypeScript-ലാണ്; TS ടൈപ്പ്
      അതിന്റെ അനുരൂപമാക്കിയ തത്തുല്യമാണ്.

## 8. കോൺഫിഗറേഷൻ റഫറൻസ്

| വേരിയബിൾ                      | ഡിഫോൾട്ട്           | പ്രഭാവം                                                                                                     |
| ----------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | സജ്ജീകരിച്ചിട്ടില്ല | സജ്ജീകരിക്കുമ്പോൾ, OTLP/HTTP ട്രെയ്സസ് എക്സ്പോർട്ടർ പ്രവർത്തനക്ഷമമാക്കുന്നു (ഉദാ. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | സജ്ജീകരിച്ചിട്ടില്ല | OTLP എൻഡ്പോയിന്റിനുള്ള ഫാൾബാക്ക് അപരനാമം.                                                                   |
| `OTEL_SERVICE_NAME`           | `omniroute`         | `service.name` റിസോഴ്സ് ആട്രിബ്യൂട്ട്.                                                                      |

## 9. ടെസ്റ്റുകൾ

- `tests/unit/routing-events.test.ts` — ഇവന്റ് നോർമലൈസേഷൻ, സ്റ്റാറ്റസ്
  വർഗ്ഗീകരണം, പരിധിയുള്ള റിംഗ് ബഫർ, സിങ്ക് ഫാൻ-ഔട്ട് + ഐസൊലേഷൻ.
- `tests/unit/routing-quality.test.ts` — EWMA വാംഅപ്പ്, പരാജയത്തിൽനിന്നുള്ള/വിജയത്തിൽനിന്നുള്ള വീണ്ടെടുക്കൽ,
  അനോമലി പെനാൽറ്റികൾ, 429 താൽക്കാലിക കൈകാര്യംചെയ്യൽ, സ്നാപ്പ്ഷോട്ട്, റീസെറ്റ്.
- `tests/unit/routing-scoring-quality.test.ts` — വെയ്റ്റ് സമഗ്രത, ന്യൂട്രൽ
  ഡിഫോൾട്ട്, ക്വാളിറ്റി ഫാക്ടർ റാങ്കിങ്.
- `tests/unit/routing-otel.test.ts` — പ്രവർത്തനക്ഷമമാക്കൽ ഗേറ്റിങ്, GenAI സ്പാൻ പേലോഡ്, അസിങ്ക്രണസ്
  ഫ്ലഷ്, ഓവർലോഡിൽ ഡ്രോപ്പ് ചെയ്യൽ.
- `tests/unit/routing-events-concurrency.test.ts` — ആയിരക്കണക്കിന് ഇവന്റുകൾ, റിംഗ്
  ബഫറിന്റെ പരിധിബദ്ധത, എറർ എറിയുന്ന സിങ്കിന്റെ ഐസൊലേഷൻ, ഇടകലർന്ന അസിങ്ക്രണസ് ബർസ്റ്റുകൾ,
  ഇൻസേർട്ടുകൾക്കിടയിലെ റീസെറ്റ്.
- `tests/unit/routing-adaptive-e2e.test.ts` — യഥാർഥ
  `scoreAutoTargets` സ്കോറർ വഴിയുള്ള നിർണായക എൻഡ്-ടു-എൻഡ് ലൂപ്പ്: ആരോഗ്യമുള്ളത് → ക്ഷയിക്കൽ → വീണ്ടെടുക്കൽ → താൽക്കാലിക വ്യതിയാനം, കൂടാതെ
  കോൾഡ്-സ്റ്റാർട്ട്, ഭാഗ്യമുള്ള കോൾഡ്-പ്രൊവൈഡർ സാഹചര്യങ്ങൾ.
- `tests/unit/stream-timing.test.ts` — TTFT (ആദ്യം ഫോർവേഡ് ചെയ്ത ചങ്ക്), ITL,
  ഫസ്റ്റ്-ബൈറ്റ് vs ഫസ്റ്റ്-ഫോർവേഡ്, തടസ്സം, വികലമായ/ശൂന്യമായ ചങ്കിന്റെ സുരക്ഷ.

## 10. മുൻനിലവിലുണ്ടായിരുന്ന പ്രശ്നങ്ങളുടെ നില (ഘട്ടം 18)

| പ്രശ്നം                                             | നില                                  | കുറിപ്പുകൾ                                                                                                                                                                                                                                                                                                                          |
| --------------------------------------------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniglyph` എക്സ്പോർട്ട് പൊരുത്തക്കേട്              | **പരിഹരിച്ചു (പരിസ്ഥിതിപരം)**        | `node_modules`, `package-lock.json`-മായി സമന്വയത്തിലായിരുന്നില്ല (ഇൻസ്റ്റാൾ ചെയ്തത് 1.3.1, ലോക്ക് ചെയ്തത് 1.4.0). `npm install omniglyph@1.4.0` പ്രവർത്തിപ്പിച്ചത് ലോക്ക് ചെയ്ത പതിപ്പ് പുനഃസ്ഥാപിച്ചു; ടൈപ്പ് എററുകൾ 0 ആയി കുറഞ്ഞു. മാനിഫെസ്റ്റുകളിൽ മാറ്റമില്ല.                                                                   |
| കാലഹരണപ്പെട്ട `getKnownContextOverflow` ടെസ്റ്റുകൾ  | **അറിയാവുന്നത് — പരിഹരിച്ചിട്ടില്ല** | `combo-context-overflow-compression-probe.test.ts`, `open-sse/services/combo.ts`-ൽ ഇപ്പോൾ നിലവിലില്ലാത്ത ഒരു ഫങ്ഷൻ ഇംപോർട്ട് ചെയ്യുന്നു (കമന്റുകളിൽ മാത്രമാണ് അതിനെ പരാമർശിക്കുന്നത്). ഇത് പരിഹരിക്കുന്നതിന് ആ ടെസ്റ്റുകൾ വീണ്ടും ഇംപ്ലിമെന്റ് ചെയ്യുകയോ തിരുത്തിയെഴുതുകയോ വേണം — ഇതുമായി ബന്ധമില്ലാത്ത ആർക്കിടെക്ചറൽ മാറ്റങ്ങളാണവ. |
| `combo-runtime-unit-concurrency.test.ts` DB ഐസൊലേഷൻ | **അറിയാവുന്നത് — പരിഹരിച്ചിട്ടില്ല** | നേരിട്ട് പ്രവർത്തിപ്പിക്കുമ്പോൾ ടെസ്റ്റ്-ഹാർനെസ് SQLite-ഐസൊലേഷൻ അസർഷൻ പരാജയപ്പെടുന്നു; ബേസ് ബ്രാഞ്ചിലും സമാനമായി പരാജയപ്പെടുന്നു.                                                                                                                                                                                                   |
| i18n `llm.txt` വ്യതിയാനം                            | **അറിയാവുന്നത് — പരിഹരിച്ചിട്ടില്ല** | `docs/i18n/*/llm.txt`, റൂട്ടിലുള്ളതിൽനിന്ന് വ്യത്യസ്തമാണ്; ഇത് മുൻപേ നിലവിലുള്ളതാണ്, കൂടാതെ ഡോക്സ്-സിങ്ക് പ്രീ-കമ്മിറ്റ് ഗേറ്റിനെ തടയുന്നു.                                                                                                                                                                                         |

പരിസ്ഥിതിയുമായി ബന്ധപ്പെട്ട പ്രശ്നങ്ങളും കോഡ് പ്രശ്നങ്ങളും വേർതിരിച്ചാണ് സൂക്ഷിച്ചിരിക്കുന്നത്; മാറ്റം വരുത്തിയ ടെസ്റ്റ് ഫിൽട്ടറുകൾക്ക്
പിന്നിൽ ബന്ധമില്ലാത്ത പരാജയങ്ങളൊന്നും മറച്ചുവെച്ചിട്ടില്ല.
