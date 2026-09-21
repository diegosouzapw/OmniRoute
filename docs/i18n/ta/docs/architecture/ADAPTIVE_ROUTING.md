# Adaptive Routing: Routing Events, Quality Feedback & Explainability (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

இந்த ஆவணம் OmniRoute-இல் சேர்க்கப்பட்ட, பின்னூட்டத்தால் இயக்கப்படும் தகவமைப்பு வழித்தட அடித்தளத்தை விவரிக்கிறது. இது திட்டமிட்டே சிறியதாக வைக்கப்பட்டுள்ளது: வகையிடப்பட்ட வழித்தட-விளைவு சேனல், ஏற்கனவே உள்ள auto-combo மதிப்பீட்டாளருக்கு உள்ளீடாக அமையும் நிகழ்நேரத் தரச் சமிக்ஞை, விருப்பத்திற்குரிய OpenTelemetry ஏற்றுமதியாளர் மற்றும் விளக்கத்தன்மை முனைப்புள்ளி ஆகியவற்றை இது அறிமுகப்படுத்துகிறது. இது ஏற்கனவே உள்ள மீள்திறன் அடுக்கை (circuit breaker, இணைப்பு cooldown, மாதிரி lockout, health matrix, autopilot) மாற்றுவதில்லை — அதனை நிறைவு செய்கிறது.

## 1. கட்டமைப்புச் சூழல்

OmniRoute என்பது **கோரிக்கை அதிவேகப் பாதை** மற்றும் **கட்டுப்பாடு/நுண்ணறிவுத் தளம்** ஆகியவற்றைக் கொண்ட ஒரு தரவுத் தளமாகும். அதிவேகப் பாதை விரைவானதாகவும், நினைவகச் சிக்கனமுடையதாகவும், ஒத்திசைவற்றதாகவும், மீள்திறன் கொண்டதாகவும், முன்னறியக்கூடியதாகவும் இருக்க வேண்டும். மதிப்பீடு, தர மதிப்பெண்களிடல், பரிசோதனைகள் மற்றும் வரலாற்றுப் பகுப்பாய்வு ஆகியவை கட்டுப்பாட்டுத் தளத்திற்குரியவை.

```
AI முகவர் / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   தரவுத் தளம் (வேகமானது, ஒத்திசைவானது, நினைவகத்தில் உள்ளது)
│  வழித்தடம் / தோல்விமாற்று │
│  ஆரோக்கியம் / பாதுகாப்புக் கட்டுப்பாடு │
│  தேக்ககம் / ஸ்ட்ரீமிங் │
└──────────┬──────────┘
           │ RoutingEvent (அனுப்பிவிட்டு மறத்தல், ~0.2µs)
           ▼
┌─────────────────────┐
│  பின்னூட்ட ஏற்பிகள்   │   கட்டுப்பாட்டுத் தளம் (ஒத்திசைவற்றது, இயன்றவரை சிறப்பாக)
│  தரக் கண்காணிப்பான்  │
│  OTel ஏற்றுமதியாளர் │
│  விளக்கச் சேமிப்பகம் │
└──────────┬──────────┘
           ▼  தர மதிப்பெண்
      auto-combo மதிப்பீட்டாளர்
```

### ஏற்கனவே இருந்தவை (தணிக்கை செய்யப்பட்டவை, நகலெடுக்கப்படாதவை)

| கருத்து                                                  | ஏற்கனவே உள்ள செயலாக்கம்                                                                                        |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| கிடைப்புத்தன்மை (போக்குவரத்தை அனுப்ப முடியுமா?)          | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, DB-இல் நிலைநிறுத்தப்பட்டது), இணைப்பு cooldown, மாதிரி lockout |
| ஆரோக்கிய அறிக்கையிடல்                                    | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                        |
| நிழல் போக்குவரத்து                                       | `open-sse/services/combo/shadowRouting.ts`                                                                     |
| பாதுகாப்புக் கட்டுப்பாடுகள்                              | `src/lib/guardrails/` (முன்/பின் hooks)                                                                        |
| துல்லியத் தேக்ககம்                                       | `src/lib/semanticCache.ts` (signature-அடிப்படையிலானது)                                                         |
| மதிப்பீட்டாளர்கள் / மதிப்பீட்டால் இயக்கப்படும் வழித்தடம் | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                           |
| Combo முடிவின் விளக்கத்தன்மை                             | `open-sse/services/combo/decisionTrace.ts`                                                                     |
| Dashboard நிகழ்நேர நிகழ்வுகள்                            | `src/lib/events/eventBus.ts` (UI அறிவிப்பு சேனல், `unknown` payloads, 100-பதிவு வரலாறு)                        |

வழித்தட-நிகழ்வு அடுக்கு `eventBus`-இன் மறுசெயலாக்கம் **அல்ல**: அந்த bus என்பது dashboard-இன் நிகழ்நேர அறிவிப்பு சேனல் (வகையிடப்பட்ட _நிகழ்வுப் பெயர்கள்_, ஒளிபுகா payloads, UI நுகர்வோர்). `RoutingEvent` என்பது கட்டுப்பாட்டுத் தளத்தின் பின்னூட்ட ஏற்பிகளால் (தரக் கண்காணிப்பான், OTel ஏற்றுமதியாளர், விளக்கச் சேமிப்பகம்) பயன்படுத்தப்படும், வகையிடப்பட்ட _விளைவு_ struct (தாமதம்/tokens/செலவு/விளைவு/நிறைவு-காரணம்) ஆகும்.

### இல்லாமல் இருந்து, இங்கு சேர்க்கப்பட்டவை

1. ஒரு **வகையிடப்பட்ட வழித்தட-விளைவு நிகழ்வு + ஏற்பி அருவமாக்கம்** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` என்பது combo-விற்குள் மட்டும் வரையறுக்கப்பட்டதும், நினைவகத்தில் மட்டுமே இருப்பதும் ஆகும்;
   `comboMetrics` என்பவை ஒட்டுமொத்தக் கணக்கிகள்; `call_logs` என்பது மூல ஒத்திசைவற்ற நிலைநிறுத்தம்.
   இவற்றில் எதுவும் தரக் கண்காணிப்பான், OTel ஏற்றுமதியாளர் அல்லது Future-AGI-போன்ற மதிப்பீட்டாளர் சந்தாதாரராக இணையக்கூடிய வகையிடப்பட்ட, ஏற்பி-அடிப்படையிலான விளைவு சேனல் அல்ல.
2. வெளியீட்டுத் தரத்திற்கான ஒரு **நிகழ்நேரத் தரச் சமிக்ஞை** (EWMA) — இதற்கு முன்பு மதிப்பீட்டாளர் நிலையான பணிப் பொருத்தம் மற்றும் விருப்பத் தேர்விலான eval தேர்ச்சி விகிதங்கள் வழியாக மட்டுமே "தரத்தை" மறைமுகமாக மதிப்பிட்டது.
3. GenAI பொருள்சார் மரபுகளைப் பயன்படுத்தும் **விருப்பத்திற்குரிய, சார்புநிலையற்ற OTel ஏற்றுமதியாளர்**.
4. உண்மையான வழித்தட முடிவுகள் + தர நிலையைக் கொடுக்கும் ஒரு **விளக்கத்தன்மை முனைப்புள்ளி**.

## 2. வழிசெலுத்தல் நிகழ்வுகள் (பின்னூட்ட அடித்தளம்)

கோப்புகள்: `open-sse/services/routing/events.ts`, `.../index.ts`

ஒரு `RoutingEvent`, வழிசெலுத்தல் மெட்டாதரவை மட்டுமே கொண்டுள்ளது:

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
  outcome: RoutingOutcome; // அனுமதிப்பட்டியலில் உள்ள ஒன்றியம்
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` என்பது TypeScript-இல் ஒரு `Send+Sync`-பாணி trait ஆகும்:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // O(1) ஆக இருக்க வேண்டும், ஒத்திசைவு I/O கூடாது
}
```

ஒவ்வொரு நிறைவடைந்த கோரிக்கைக்கும் hot path ஒருமுறை `emitRoutingEvent(event)`-ஐ
அழைக்கிறது (`handleChatCore`-இல் streaming நிறைவு callback, non-streaming வெற்றிப்
பாதை மற்றும் malformed-200 தோல்விப் பாதை). பதிவுசெய்யப்பட்ட sinks-க்கு அனுப்புதல்
ஒத்திசைவான fan-out ஆகும்; ஆனால் ஒவ்வொரு sink-உம் வரிசையில் சேர்ப்பது அல்லது
நினைவக நிலையைக் புதுப்பிப்பது மட்டுமே செய்கிறது. **Hot path-இல் ஒத்திசைவான
தரவுத்தள எழுதுதல்களோ, பிணைய I/O-வோ இல்லை.**

இயல்புநிலை sinks:

- `MemoryRoutingEventStore` — விளக்க endpoint-க்காக வரம்பிடப்பட்ட (500)
  ring buffer, மிகப் புதியவை முதலில்.
- `QualityTracker` நுகர்வி — EWMA தர மதிப்பீட்டைப் புதுப்பிக்கிறது.
- `OtlpHttpsEventSink` — விருப்பத்திற்குரியது; `OMNIROUTE_OTEL_ENDPOINT`
  (அல்லது `OTEL_EXPORTER_OTLP_ENDPOINT`) அமைக்கப்பட்டிருக்கும்போது மட்டுமே
  இயக்கப்படும்.

### அளவிடப்பட்ட மேலதிகச் செலவு (நேர்மையான ஒப்பீடு)

இந்த workstation-இல் `npm run bench:routing-events` (100k சுழற்சிகள்; ஒவ்வொரு
செயல்பாட்டுக்குமான percentiles, `performance.now()` timer resolution-ஐவிடக்
குறைவாக இருப்பதால், sub-µs செயல்பாடுகள் மொத்த µs/op ஆக அளவிடப்பட்டன):

| சூழல்                             | µs/op  | ops/s  |
| --------------------------------- | ------ | ------ |
| அடிப்படை (scoring மட்டும்)        | ~0.045 | ~22 M  |
| அடிப்படை + RoutingEvent (2 sinks) | ~0.168 | ~5.9 M |
| அடிப்படை + event + OTel enqueue   | ~0.163 | ~6.1 M |
| ஒரேநேரம் (8 interleaved bursts)   | ~0.18  | —      |

அடிப்படை scoring-ஐவிட event-dispatch-இன் கூடுதல் செலவு ~0.12 µs/request; OTel
sink வரிசையில் மட்டுமே சேர்ப்பதால் (O(1) buffer push), அளவிடக்கூடிய எந்தச்
செலவையும் சேர்ப்பதில்லை. இந்த எண்கள் இயந்திரத்திற்கே உரியவை மற்றும்
ஒப்பீட்டளவிலானவை — இவை production உத்தரவாதமல்ல. v1-இன் "~0.2 µs" மதிப்பு
ஒரு மொத்த மதிப்பீடாக இருந்தது; இந்த வழிமுறை scoring அடிப்படையை
event-dispatch செலவிலிருந்து பிரிக்கிறது.

## 3. தரச் சிக்னல் (பின்னூட்டத்தால் இயக்கப்படும் provider நிலை)

கோப்புகள்: `open-sse/services/routing/quality.ts`

v2, **செயல்பாட்டு** தரத்தை **சொற்பொருள் சார்ந்த** தரத்திலிருந்து பிரிக்கிறது:

- **செயல்பாட்டு** — வழிசெலுத்தல் hot path-இலிருந்து பெறப்படுகிறது (HTTP 4xx/5xx,
  இணைப்புத் தோல்விகள், 429s, தவறான வடிவமைப்புடைய பதில்கள், stream தடங்கல்கள்,
  `finish_reason=length`, பூஜ்ஜிய-output வெற்றிகள், latency/TTFT EWMA).
  200 என்பது சொற்பொருள் சார்ந்த தரமாகக் கருதப்படுவதில்லை.
- **சொற்பொருள் சார்ந்தது** — உருவாக்கப்பட்ட output-இன் உண்மையான மதிப்பு.
  `setSemanticQuality()` வழியாக evaluator-ஆல் மட்டுமே எப்போதும் உருவாக்கப்படும்.
  ஒன்று அதை வழங்கும் வரை இது `null` ஆக இருக்கும்; மேலும், இது செயல்பாட்டு
  score-க்குள் ஒருபோதும் கசியாது.

ஒவ்வொரு (provider, model)-க்குமான நிலை (EWMA + வரம்பிடப்பட்ட counters):

- `successEwma` — முடிவு வெற்றியின் EWMA (α=0.2).
- `latencyEwma` / `ttftEwma` — latency-இன் EWMA (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — model கடைசியாக எவ்வளவு அண்மையில் காணப்பட்டது.

### நம்பகத்தன்மை / மாதிரி விழிப்புணர்வு

`confidence = clamp01(samples / 50)`, மேலும் scorer-க்குத் திருப்பியளிக்கப்படும்
score, நடுநிலையான நடுப்புள்ளியை நோக்கிக் கலக்கப்படுகிறது:

```
score = 0.5 + confidence * (operational - 0.5)
```

விளைவுகள் (சோதனைகளால் சரிபார்க்கப்பட்டவை):

- ஒரு cold provider (0 மாதிரிகள்) **0.5** score பெறுகிறது — நியாயமற்ற முறையில்
  தண்டிக்கப்படுவதில்லை; ஆனால் ஆயிரக்கணக்கான உறுதியான அவதானிப்புகளைக் கொண்ட
  provider-ஐ ஆதிக்கம் செலுத்த முடியாது.
- அதிர்ஷ்டவசமாக 7 வெற்றிகளைப் பெற்ற provider, 0.5-ஐ நோக்கி இழுக்கப்படுகிறது
  (நம்பிக்கைவாத initialization மூலம் ஒருபோதும் ஆதிக்கம் செலுத்தாது).
- 50+ மாதிரிகளைக் கொண்ட provider அதன் உண்மையான செயல்பாட்டு score-ஐ நோக்கி
  ஒருங்கிணைகிறது.
- சீரழிவும் மீட்சியும் படிப்படியாக நிகழ்கின்றன (EWMA); தனித்த ஒரு தோல்வி
  ஆரோக்கியமான provider-ஐ அழித்துவிடாது.

`ProviderQuality`, `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`-ஐ வெளிப்படுத்துகிறது.

இது `quality` scoring factor ஆக auto-combo scorer-க்கு உள்ளீடாகிறது:

- `open-sse/services/autoCombo/scoring.ts`-இல் `ScoringFactors.quality` /
  `ScoringWeights.quality`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. கூட்டுத்தொகை
  1.0 ஆகவே இருக்கும்.
- `buildAutoCandidates`, tracker-இலிருந்து `candidate.quality`-ஐ நிரப்புகிறது;
  தரவு இல்லாத candidates இயல்பாக நடுநிலையான **0.5**-ஐப் பெறும் (ஒரு cold
  candidate ஊக்குவிக்கப்படுவதுமில்லை, தண்டிக்கப்படுவதுமில்லை).

மூடிய சுற்று:

```
RoutingEvent → QualityTracker → getQualityScore → auto-combo quality factor
      ↑                                                    │
      └────── கோரிக்கை முடிவு (handleChatCore) ←────────────┘
```

### கடினமான விலக்கு vs மென்மையான தண்டனை

தரச் சிக்னல் ஒரு **மென்மையான தகவமைப்பு விருப்பம்** மட்டுமே. கடினமான விலக்கு,
ஏற்கெனவே உள்ள resilience stack-இடமே தொடர்கிறது: circuit breaker OPEN, quota
தீர்ந்துவிட்டது, auth failure, model lockout — இவற்றில் எதுவும் quality score-ஆல்
பாதிக்கப்படுவதில்லை. தற்காலிகமாக quality score குறையும் provider-க்கு முன்னுரிமை
குறைக்கப்படும்; அது ஒருபோதும் முற்றிலுமாக முடக்கப்படாது.

## 3b. நியமப்படுத்தப்பட்ட ஸ்ட்ரீம் நேர அளவீடு (TTFT / ITL)

கோப்புகள்: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` என்பது ஸ்ட்ரீமிங் பாதைக்கான ஒற்றை கருவியாக்க இடைமுகமாகும்;
இது `createSSEStream`-இல் இணைக்கப்பட்டுள்ளது (open-sse/utils/stream.ts):

- `markByte()` — முதல் upstream chunk பெறப்பட்டது.
- `markForward()` — client-க்கு அனுப்பப்பட்ட முதல் chunk (TTFT-க்குப் பயன்படுத்தப்படுகிறது).
- `markInterrupted()` — முறையான நிறைவுக்கு முன் ஏற்பட்ட ஸ்ட்ரீம் timeout/abort/error.
- `ttft()` = முதலில் அனுப்பப்பட்ட SSE chunk-இன் தாமதம். **இது token-நிலை TTFT அல்ல** —
  ஒரு SSE chunk பூஜ்யம்/ஒன்று/பல tokens-ஐக் கொண்டிருக்கலாம். இது துல்லியமாக ஆவணப்படுத்தப்பட்டுள்ளது.
- `avgItlMs()` = chunk-களுக்கு இடையிலான சராசரி இடைவெளி (ITL-க்கான chunk-தாமதப் பதிலி அளவீடு).

TTFT/ITL/interrupted மதிப்புகள் `RoutingEvent`-க்குள் (`ttftMs`, `itlMs`) செலுத்தப்பட்டு,
OTel sink மூலம் GenAI/OmniRoute span பண்புக்கூறுகளாக ஏற்றுமதி செய்யப்படுகின்றன.

## 4. OpenTelemetry / GenAI கண்காணிப்புத் திறன்

கோப்புகள்: `open-sse/services/routing/otel.ts`

- Dependency இல்லாத OTLP/HTTP JSON exporter (global `fetch`-ஐப் பயன்படுத்துகிறது;
  `@opentelemetry/*` SDK இல்லை).
- Spans, GenAI semantic conventions (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) மற்றும் OmniRoute routing
  பண்புக்கூறுகளை (outcome, status, ttft, retries, fallback) பின்பற்றுகின்றன.
- `record()` ஒரு வரம்புள்ள buffer-க்குள் மட்டும் வரிசைப்படுத்துகிறது (O(1)); பின்னணி timer
  ஒன்று `POST {endpoint}/v1/traces` வழியாக asynchronous முறையில் flush செய்கிறது. அதிக சுமையின் கீழ்,
  பழமையான events கைவிடப்படுகின்றன (`dropped` counter) — data plane-க்கு ஒருபோதும் backpressure
  வழங்கப்படாது.
- **கட்டமைக்கப்படாத வரை முடக்கப்பட்டிருக்கும்.** `OMNIROUTE_OTEL_ENDPOINT` (அல்லது
  `OTEL_EXPORTER_OTLP_ENDPOINT`) அமைக்கப்பட வேண்டும்; இல்லையெனில் sink
  பதிவுசெய்யப்படாது, மேலும் எந்த OTel code-உம் இயங்காது.

## 5. விளக்கத்திறன்

- `GET /v1/explain/routing` சமீபத்திய `RoutingEvent`-களையும் (உண்மையான
  முடிவுகள், புதியவை முதலில்) ஒவ்வொரு provider/model-க்குமான quality snapshot-ஐயும் வழங்குகிறது.
- Auth, `/v1/combos`-ஐப் போலவே செயல்படுகிறது (Bearer API key அல்லது dashboard session;
  `REQUIRE_API_KEY=false` கொண்ட single-user local deployment-களில் anonymous அணுகல்).
- ஒவ்வொரு invocation-க்குமான combo-நிலை traces, ஏற்கனவே உள்ள
  `decisionTrace.ts` வழியாக தொடர்ந்து கிடைக்கும் (header `X-OmniRoute-Combo-Trace`).
- பாதுகாப்பு: events routing metadata-வை மட்டுமே கொண்டிருக்கும்; prompts/bodies/credentials-ஐ
  ஒருபோதும் கொண்டிருக்காது.

## 6. மதிப்பீட்டுத் தள ஒருங்கிணைப்பு (Future AGI தயார்நிலை)

OmniRoute, Future AGI-ஐ (அல்லது எந்த evaluator-ஐயும்) ஒரு **சாத்தியமான
intelligence/evaluation backend-ஆகவே கருதுகிறது; dependency-ஆக அல்ல**. அதற்கான இணைப்பு இடங்கள்:

- ஒரு `RoutingEventSink`, events-ஐ asynchronous முறையில் evaluator-க்கு அனுப்ப முடியும்.
- `MemoryRoutingEventStore` + quality snapshot ஆகியவை evaluator-க்கு மூல
  decision stream-ஐ வழங்குகின்றன.
- எதிர்கால `Evaluator` (deterministic, local judge, HTTP, WASM), events/traces-ஐப் பெற்று,
  அதே `getQualityScore`/quality-factor பாதைக்குள் செலுத்தப்படும் `QualityScore`-ஐத்
  திருப்பி வழங்கும்.
- தற்போதுள்ள eval-driven routing (`open-sse/services/evalRouting.ts`), இயக்கப்பட்டிருக்கும்போது
  `eval_runs` pass-rates அடிப்படையில் combo targets-ஐ ஏற்கனவே மறுவரிசைப்படுத்துகிறது.

Request பாதையில் எந்த evaluation-உம் synchronous முறையில் இயங்காது; evaluator இல்லாவிட்டாலும்
gateway முழுமையாகச் செயல்படும்.

## 7. இறுதிக் கட்டமைப்பு மதிப்பாய்வு

1. **Synchronous hot path-இல் எது மீதமுள்ளது?** Routing/scoring, guardrail
   முன்சோதனைகள், cache lookup மற்றும் in-memory sinks-க்கான ஒரு `emitRoutingEvent`
   fan-out (அடிப்படை scoring-ஐ விட ~0.12 µs கூடுதல்).
2. **Asynchronous processing-க்கு எது நகர்த்தப்பட்டது?** OTel export (timer + fetch),
   `call_logs`/usage persistence, semantic-cache writes; quality என்பது in-memory
   மற்றும் O(1) என்பதால் async தேவையில்லை.
3. **ஒரு routing outcome எவ்வாறு feedback-ஆக மாறுகிறது?** `handleChatCore` ஒரு
   `RoutingEvent`-ஐ emit செய்கிறது → `QualityTracker` EWMA state-ஐப் புதுப்பிக்கிறது →
   `getQualityScore`, auto-combo `quality` factor-க்கு உள்ளீடாகிறது.
4. **எதிர்கால routing-ஐ quality எவ்வாறு பாதிக்கிறது?** குறைந்த quality score,
   `scoreAutoTargets`-இல் அந்த provider/model-இன் weighted score-ஐக் குறைக்கிறது; எனவே
   தரம் குறைந்த models படிப்படியாகக் குறைவாக முன்னுரிமைப்படுத்தப்பட்டு, அவற்றின் EWMA
   மேம்படும்போது மீள்கின்றன.
5. **Dependency-ஆக மாறாமல் Future AGI எவ்வாறு ஒருங்கிணைய முடியும்?**
   `RoutingEventSink` interface / எதிர்கால `Evaluator` adapter வழியாக — hardcoded
   dependency எதுவும் இல்லை.
6. **Evaluator கிடைக்காதபோது என்ன நடக்கும்?** Routing பாதிக்கப்படாது;
   கவனிக்கப்பட்ட signal இல்லாத models-க்கு quality நடுநிலை மதிப்பான (1.0)-க்கு மாறும்.
7. **Telemetry கிடைக்காதபோது என்ன நடக்கும்?** OTel sink பதிவுசெய்யப்படாது;
   routing layer-இன் மீதிப் பகுதி மாற்றமின்றி இயங்கும்.
8. **அதிக சுமையின் கீழ் என்ன நடக்கும்?** OTel buffer பழமையான events-ஐக் கைவிடும்; quality
   மற்றும் ring buffer ஆகியவை வடிவமைப்பிலேயே வரம்பிடப்பட்டுள்ளன; backpressure இல்லை.
9. **தரம் குறைந்த பிறகு provider state எவ்வாறு மீள்கிறது?** வெற்றிகள் சேரும்போது EWMA
   மீண்டும் ஒன்றிணைகிறது; warmup, cold models-ஐ நடுநிலையில் வைத்திருக்கும்; circuit breaker
   தனியாக HALF_OPEN probes வழியாக மீள்கிறது.
10. **முன்மொழியப்பட்ட எந்த அம்சங்கள் திட்டமிட்டே செயல்படுத்தப்படவில்லை, ஏன்?**
    - Shadow traffic / experiments — ஏற்கனவே செயல்படுத்தப்பட்டுள்ளது
      (`combo/shadowRouting.ts`); மீண்டும் உருவாக்கப்படவில்லை.
    - Guardrails — ஏற்கனவே செயல்படுத்தப்பட்டுள்ளது (`src/lib/guardrails/`); நகலாக்கப்படவில்லை.
    - Semantic cache — ஏற்கனவே செயல்படுத்தப்பட்டுள்ளது (`src/lib/semanticCache.ts`);
      நகலாக்கப்படவில்லை.
    - முழுமையான experiment-management platform, dataset tooling, prompt-optimization
      platform, vector DB அல்லது கட்டாயமான வெளிப்புற OTel infrastructure — எளிமையான
      data plane-இன் வரம்பிற்கு அப்பாற்பட்டவை.
    - ஒரு Rust `RoutingEvent` struct — data plane TypeScript-இல் உள்ளது; TS type
      அதற்கேற்ப மாற்றியமைக்கப்பட்ட இணையான வடிவமாகும்.

## 8. உள்ளமைவு குறிப்பு

| மாறி                          | இயல்புநிலை       | விளைவு                                                                                                   |
| ----------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | அமைக்கப்படவில்லை | அமைக்கப்படும்போது, OTLP/HTTP தடமறிதல் ஏற்றுமதியாளரைச் செயல்படுத்துகிறது (எ.கா. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | அமைக்கப்படவில்லை | OTLP இறுதிப்புள்ளிக்கான மாற்று மறுபெயர்.                                                                 |
| `OTEL_SERVICE_NAME`           | `omniroute`      | `service.name` வளப் பண்புக்கூறு.                                                                         |

## 9. சோதனைகள்

- `tests/unit/routing-events.test.ts` — நிகழ்வு இயல்பாக்கம், நிலை
  வகைப்பாடு, வரம்பிடப்பட்ட வளைய இடையகம், வெளியீட்டு இலக்குகளுக்குப் பரவல் + தனிமைப்படுத்தல்.
- `tests/unit/routing-quality.test.ts` — EWMA தொடக்கத் தயாராக்கம், தோல்வி/வெற்றி மீட்பு,
  முரண்பாட்டுக்கான அபராதங்கள், 429 தற்காலிகக் கையாளுதல், நிலைப்பதிவு, மீட்டமைப்பு.
- `tests/unit/routing-scoring-quality.test.ts` — எடை ஒருமைப்பாடு, நடுநிலையான
  இயல்புநிலை, தரக் காரணி தரவரிசை.
- `tests/unit/routing-otel.test.ts` — செயலாக்க நிபந்தனை, GenAI span தரவுத்தொகுப்பு, ஒத்தியங்கா
  வெளியேற்றம், அதிகச் சுமையில் கைவிடுதல்.
- `tests/unit/routing-events-concurrency.test.ts` — ஆயிரக்கணக்கான நிகழ்வுகள், வளைய
  இடையகத்தின் வரம்புடைமை, பிழையெழுப்பும் வெளியீட்டு இலக்கின் தனிமைப்படுத்தல், இடையிடையே நிகழும் ஒத்தியங்கா பெருக்கங்கள்,
  செருகல்களின்போது மீட்டமைத்தல்.
- `tests/unit/routing-adaptive-e2e.test.ts` — உண்மையான `scoreAutoTargets` மதிப்பீட்டாளரின் வழியாக
  தீர்மானகரமான முழுமுனைச் சுழற்சி: ஆரோக்கியம் → சீர்கேடு → மீட்பு → தற்காலிகத் தடங்கல், மேலும்
  தொடக்கநிலை மற்றும் அதிர்ஷ்டமான தொடக்கநிலை வழங்குநர் சூழ்நிலைகள்.
- `tests/unit/stream-timing.test.ts` — TTFT (முதலில் அனுப்பப்பட்ட துண்டு), ITL,
  முதல் பைட் மற்றும் முதல் அனுப்புதல், குறுக்கீடு, தவறான வடிவமைப்பு/வெற்றுத் துண்டு பாதுகாப்பு.

## 10. முன்பே இருந்த சிக்கல்களின் நிலை (கட்டம் 18)

| சிக்கல்                                                     | நிலை                                           | குறிப்புகள்                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniglyph` ஏற்றுமதிப் பொருத்தமின்மை                        | **சரிசெய்யப்பட்டது (சுற்றுச்சூழல் சார்ந்தது)** | `node_modules`, `package-lock.json` உடன் ஒத்திசைவின்றி இருந்தது (நிறுவப்பட்டது 1.3.1, பூட்டப்பட்டது 1.4.0). `npm install omniglyph@1.4.0` ஐ இயக்கியதால் பூட்டப்பட்ட பதிப்பு மீட்டமைக்கப்பட்டது; வகைப் பிழைகள் 0 ஆகக் குறைந்தன. மேனிஃபெஸ்ட்கள் மாற்றப்படவில்லை.                                                   |
| காலாவதியான `getKnownContextOverflow` சோதனைகள்               | **அறியப்பட்டது — சரிசெய்யப்படவில்லை**          | `combo-context-overflow-compression-probe.test.ts`, `open-sse/services/combo.ts` இல் இனி இல்லாத ஒரு செயல்பாட்டை இறக்குமதி செய்கிறது (கருத்துரைகள் மட்டுமே அதைக் குறிப்பிடுகின்றன). இதைச் சரிசெய்ய, அந்தச் சோதனைகளை மீண்டும் செயல்படுத்தவோ அல்லது மீண்டும் எழுதவோ வேண்டும் — இது தொடர்பில்லாத கட்டமைப்பு மாற்றம். |
| `combo-runtime-unit-concurrency.test.ts` DB தனிமைப்படுத்தல் | **அறியப்பட்டது — சரிசெய்யப்படவில்லை**          | நேரடியாக இயக்கப்படும்போது, சோதனைச் சூழலின் SQLite-தனிமைப்படுத்தல் உறுதிப்படுத்தல் தோல்வியடைகிறது; அடிப்படைக் கிளையிலும் இதேபோலத் தோல்வியடைகிறது.                                                                                                                                                                 |
| i18n `llm.txt` விலகல்                                       | **அறியப்பட்டது — சரிசெய்யப்படவில்லை**          | `docs/i18n/*/llm.txt`, மூலக் கோப்பிலிருந்து வேறுபடுகிறது; இது முன்பே இருந்தது, மேலும் ஆவண ஒத்திசைவுக்கான pre-commit தடுப்பைத் தடுக்கிறது.                                                                                                                                                                        |

சுற்றுச்சூழல் சார்ந்த சிக்கல்களும் குறியீட்டுச் சிக்கல்களும் தனித்தனியாக வைக்கப்பட்டுள்ளன; தொடர்பில்லாத எந்தத் தோல்விகளும்
மாற்றப்பட்ட சோதனை வடிகட்டிகளுக்குப் பின்னால் மறைக்கப்படவில்லை.
