# Adaptive Routing: Routing Events, Quality Feedback & Explainability (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

यो दस्तावेजले OmniRoute मा थपिएको प्रतिक्रिया-सञ्चालित अनुकूली राउटिङको आधार वर्णन गर्छ। यसलाई जानाजानी सानो राखिएको छ: यसले टाइप गरिएको राउटिङ-परिणाम च्यानल, विद्यमान auto-combo स्कोररलाई इनपुट दिने अनलाइन गुणस्तर सङ्केत, वैकल्पिक OpenTelemetry निर्यातक, र व्याख्येयता endpoint प्रस्तुत गर्छ। यसले विद्यमान resilience stack (circuit breaker, connection cooldown, model lockout, health matrix, autopilot) लाई प्रतिस्थापन **गर्दैन** — बरु त्यसलाई परिपूरक बनाउँछ।

## 1. वास्तुकलागत सन्दर्भ

OmniRoute एउटा data plane हो जसमा **request hot path** र **control/intelligence plane** छन्। hot path छिटो, मेमोरी-कुशल, asynchronous, resilient र पूर्वानुमानयोग्य रहनुपर्छ। मूल्याङ्कन, गुणस्तर स्कोरिङ, प्रयोगहरू र ऐतिहासिक विश्लेषण control plane अन्तर्गत पर्छन्।

```
AI Agent / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   data plane (छिटो, sync, in-memory)
│  राउटिङ / failover  │
│  health / guardrail │
│  cache / streaming  │
└──────────┬──────────┘
           │ RoutingEvent (fire-and-forget, ~0.2µs)
           ▼
┌─────────────────────┐
│  प्रतिक्रिया sinks  │   control plane (async, best-effort)
│  गुणस्तर tracker    │
│  OTel exporter      │
│  explain store      │
└──────────┬──────────┘
           ▼  गुणस्तर स्कोर
      auto-combo scorer
```

### पहिले नै उपलब्ध रहेका कुराहरू (लेखापरीक्षण गरिएका, दोहोर्याएर कार्यान्वयन नगरिएका)

| अवधारणा                                  | विद्यमान कार्यान्वयन                                                                                       |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| उपलब्धता (के हामी traffic पठाउन सक्छौँ?) | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, DB मा persist गरिएको), connection cooldown, model lockout |
| Health reporting                         | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                    |
| Shadow traffic                           | `open-sse/services/combo/shadowRouting.ts`                                                                 |
| Guardrails                               | `src/lib/guardrails/` (pre/post hooks)                                                                     |
| Exact cache                              | `src/lib/semanticCache.ts` (signature मा आधारित)                                                           |
| Evaluators / eval-सञ्चालित राउटिङ        | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                       |
| Combo निर्णयको व्याख्येयता               | `open-sse/services/combo/decisionTrace.ts`                                                                 |
| Dashboard का real-time events            | `src/lib/events/eventBus.ts` (UI notification channel, `unknown` payloads, 100-entry history)              |

routing-event तह `eventBus` को पुनःकार्यान्वयन **होइन**: त्यो bus dashboard को real-time notification channel हो (टाइप गरिएका _event names_, अपारदर्शी payloads, UI consumers)। `RoutingEvent` control plane का feedback sinks (quality tracker, OTel exporter, explain store) ले प्रयोग गर्ने टाइप गरिएको _outcome_ struct (latency/tokens/cost/outcome/finish-reason) हो।

### अभाव रहेका कुराहरू (यहाँ थपिएका)

1. एउटा **टाइप गरिएको routing-outcome event + sink abstraction** (`RoutingEvent` /
   `RoutingEventSink`)। `decisionTrace` combo मा सीमित र in-memory मात्र छ;
   `comboMetrics` सञ्चित counters हुन्; `call_logs` raw async persistence हो।
   यीमध्ये कुनै पनि quality tracker, OTel exporter, वा Future-AGI-जस्तो evaluator ले subscribe गर्न सक्ने टाइप गरिएको, sink-आधारित outcome channel होइन।
2. output quality का लागि एउटा **अनलाइन गुणस्तर सङ्केत** (EWMA) — यसअघि scorer ले स्थिर task fitness र opt-in eval pass-rates मार्फत मात्र "quality" को proxy प्रयोग गर्थ्यो।
3. GenAI semantic conventions प्रयोग गर्ने एउटा **वैकल्पिक, dependency-रहित OTel exporter**।
4. वास्तविक routing decisions + quality state फर्काउने एउटा **व्याख्येयता endpoint**।

## 2. राउटिङ इभेन्टहरू (प्रतिक्रियाको आधार)

फाइलहरू: `open-sse/services/routing/events.ts`, `.../index.ts`

एउटा `RoutingEvent` ले राउटिङ मेटाडेटा मात्र बोक्छ:

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
  outcome: RoutingOutcome; // अनुमति-सूचीमा राखिएको युनियन
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink`, TypeScript मा `Send+Sync`-शैलीको ट्रेट हो:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // O(1) हुनैपर्छ, कुनै सिंक I/O हुनु हुँदैन
}
```

हट पाथले प्रत्येक पूरा भएको अनुरोधका लागि एक पटक `emitRoutingEvent(event)` कल गर्छ
(स्ट्रिमिङ-समापन कलब्याक, गैर-स्ट्रिमिङ सफलताको पाथ, र `handleChatCore` मा रहेको
विकृत-200 विफलता पाथ)। डिस्प्याच दर्ता गरिएका सिंकहरूतर्फको सिंक्रोनस फ्यान-आउट हो,
तर प्रत्येक सिंकले इन-मेमोरी अवस्था मात्र क्यूमा राख्छ/अद्यावधिक गर्छ। **हट पाथमा
कुनै सिंक्रोनस डेटाबेस राइट हुँदैन, कुनै नेटवर्क I/O हुँदैन।**

पूर्वनिर्धारित सिंकहरू:

- `MemoryRoutingEventStore` — व्याख्या एन्डपोइन्टका लागि सीमित (500) रिङ बफर,
  सबैभन्दा नयाँ पहिले।
- `QualityTracker` उपभोक्ता — EWMA गुणस्तर अनुमान अद्यावधिक गर्छ।
- `OtlpHttpsEventSink` — वैकल्पिक, `OMNIROUTE_OTEL_ENDPOINT`
  (वा `OTEL_EXPORTER_OTLP_ENDPOINT`) सेट गरिएको बेलामा मात्र सक्षम हुन्छ।

### मापन गरिएको ओभरहेड (इमानदार तुलना)

यस वर्कस्टेसनमा `npm run bench:routing-events` (100k पुनरावृत्ति; प्रति-अपरेसन
प्रतिशतकहरू `performance.now()` टाइमर रिजोल्युसनभन्दा तल भएकाले sub-µs अपरेसनहरू
समग्र µs/op का रूपमा मापन गरिएका छन्):

| परिदृश्य                               | µs/op  | ops/s  |
| -------------------------------------- | ------ | ------ |
| आधाररेखा (स्कोरिङ मात्र)               | ~0.045 | ~22 M  |
| आधाररेखा + RoutingEvent (2 सिंक)       | ~0.168 | ~5.9 M |
| आधाररेखा + इभेन्ट + OTel क्यूमा राख्ने | ~0.163 | ~6.1 M |
| समवर्ती (8 अन्तरमिश्रित बर्स्ट)        | ~0.18  | —      |

आधाररेखा स्कोरिङमाथिको इभेन्ट-डिस्प्याच अन्तर ~0.12 µs/अनुरोध हो; OTel सिंकले
क्यूमा मात्र राख्छ (O(1) बफर पुश), जसले मापन गर्न सकिने केही पनि थप्दैन। यी सङ्ख्याहरू
मेसिन-विशिष्ट र सापेक्ष हुन् — उत्पादनसम्बन्धी प्रत्याभूति होइनन्। v1 को "~0.2 µs"
आँकडा एउटा समग्र अनुमान थियो; यस पद्धतिले स्कोरिङ आधाररेखालाई इभेन्ट-डिस्प्याच
लागतबाट अलग गर्छ।

## 3. गुणस्तर सङ्केत (प्रतिक्रियाद्वारा सञ्चालित प्रदायक अवस्था)

फाइलहरू: `open-sse/services/routing/quality.ts`

v2 ले **सञ्चालनगत** गुणस्तरलाई **अर्थगत** गुणस्तरबाट अलग गर्छ:

- **सञ्चालनगत** — राउटिङ हट पाथबाट व्युत्पन्न (HTTP 4xx/5xx, कनेक्सन
  विफलताहरू, 429s, विकृत प्रतिक्रियाहरू, स्ट्रिम अवरोधहरू, `finish_reason=length`,
  शून्य-आउटपुट सफलताहरू, विलम्बता/TTFT EWMA)। 200 लाई अर्थगत
  गुणस्तर मानिँदैन।
- **अर्थगत** — उत्पन्न आउटपुटको वास्तविक मूल्य। मूल्याङ्कनकर्ताद्वारा
  `setSemanticQuality()` मार्फत मात्र कहिल्यै उत्पादन हुन्छ। कसैले उपलब्ध
  नगराएसम्म यो `null` हुन्छ र सञ्चालनगत स्कोरमा कहिल्यै मिसिँदैन।

प्रति-(प्रदायक, मोडेल) अवस्था (EWMA + सीमित काउन्टरहरू):

- `successEwma` — परिणाम सफलताको EWMA (α=0.2)।
- `latencyEwma` / `ttftEwma` — विलम्बताको EWMA (α=0.1)।
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`।
- `recencyMs` — मोडेल अन्तिम पटक कति हालसालै अवलोकन गरिएको थियो।

### आत्मविश्वास / नमुना सचेतता

`confidence = clamp01(samples / 50)`, र स्कोररलाई फर्काइने स्कोरलाई तटस्थ
मध्यबिन्दुतर्फ मिश्रण गरिन्छ:

```
score = 0.5 + confidence * (operational - 0.5)
```

परिणामहरू (परीक्षणहरूद्वारा प्रमाणित):

- एउटा कोल्ड प्रदायक (0 नमुना) ले **0.5** स्कोर गर्छ — अनुचित रूपमा दण्डित हुँदैन,
  तर हजारौँ ठोस अवलोकन भएको प्रदायकलाई उछिन्न पनि सक्दैन।
- 7 वटा भाग्यमानी सफलता भएको प्रदायकलाई 0.5 तर्फ तानिन्छ (आशावादी
  इनिसियलाइजेसनका कारण कहिल्यै हाबी हुँदैन)।
- 50+ नमुना भएको प्रदायक आफ्नो वास्तविक सञ्चालनगत स्कोरमा अभिसरण गर्छ।
- ह्रास र पुनःप्राप्ति क्रमिक हुन्छन् (EWMA), र एउटा छुट्टै विफलताले स्वस्थ
  प्रदायकलाई नष्ट गर्दैन।

`ProviderQuality` ले `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }` एक्सपोज गर्छ।

यसले auto-combo स्कोररलाई `quality` स्कोरिङ कारकका रूपमा इनपुट दिन्छ:

- `open-sse/services/autoCombo/scoring.ts` मा `ScoringFactors.quality` /
  `ScoringWeights.quality`।
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03। योगफल 1.0 नै रहन्छ।
- `buildAutoCandidates` ले ट्र्याकरबाट `candidate.quality` भर्छ; डेटा नभएका
  उम्मेदवारहरू पूर्वनिर्धारित रूपमा तटस्थ **0.5** हुन्छन् (कोल्ड उम्मेदवारलाई न
  बढावा दिइन्छ, न दण्डित गरिन्छ)।

बन्द लूप:

```
RoutingEvent → QualityTracker → getQualityScore → auto-combo गुणस्तर कारक
      ↑                                                    │
      └────── अनुरोध परिणाम (handleChatCore) ←────────────┘
```

### कडा बहिष्करण बनाम नरम दण्ड

गुणस्तर सङ्केत **नरम अनुकूलनशील प्राथमिकता** मात्र हो। कडा बहिष्करण विद्यमान
लचिलोपन स्ट्याकमै रहन्छ: circuit breaker OPEN, कोटा समाप्त, प्रमाणीकरण विफलता,
मोडेल लकआउट — यीमध्ये कुनै पनि गुणस्तर स्कोरबाट प्रभावित हुँदैन। अस्थायी रूपमा
गुणस्तर स्कोर घटेको प्रदायकको प्राथमिकता घटाइन्छ, कहिल्यै कडाइका साथ
अक्षम पारिँदैन।

## 3b. क्यानोनिकल स्ट्रिम टाइमिङ (TTFT / ITL)

फाइलहरू: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` स्ट्रिमिङ पाथका लागि एकमात्र इन्स्ट्रुमेन्टेसन सीम हो,
जसलाई `createSSEStream` (`open-sse/utils/stream.ts`) मा जडान गरिएको छ:

- `markByte()` — पहिलो अपस्ट्रिम चङ्क प्राप्त भयो।
- `markForward()` — क्लाइन्टतर्फ फर्वार्ड गरिएको पहिलो चङ्क (TTFT का लागि प्रयोग गरिन्छ)।
- `markInterrupted()` — सफा रूपमा समाप्त हुनुअघि स्ट्रिम टाइमआउट/अबोर्ट/त्रुटि।
- `ttft()` = पहिलो पटक फर्वार्ड गरिएको SSE चङ्कको विलम्बता। **यो टोकन-स्तरको TTFT होइन** —
  एउटै SSE चङ्कले शून्य/एक/धेरै टोकन बोक्न सक्छ। यसलाई सटीक रूपमा दस्तावेजीकरण गरिएको छ।
- `avgItlMs()` = चङ्कहरूबीचको औसत अन्तराल (ITL का लागि चङ्क-विलम्बता प्रोक्सी)।

TTFT/ITL/अवरोधित स्थिति `RoutingEvent` (`ttftMs`, `itlMs`) मा प्रवाहित हुन्छन् र
OTel सङ्कद्वारा GenAI/OmniRoute स्प्यान एट्रिब्युटका रूपमा निर्यात गरिन्छन्।

## 4. OpenTelemetry / GenAI अवलोकनीयता

फाइलहरू: `open-sse/services/routing/otel.ts`

- निर्भरता-रहित OTLP/HTTP JSON एक्सपोर्टर (ग्लोबल `fetch` प्रयोग गर्छ,
  `@opentelemetry/*` SDK प्रयोग गर्दैन)।
- स्प्यानहरूले GenAI सिमान्टिक कन्भेन्सनहरू (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) का साथै OmniRoute राउटिङ
  एट्रिब्युटहरू (नतिजा, स्थिति, ttft, पुनःप्रयास, फलब्याक) पालना गर्छन्।
- `record()` ले सीमित बफरमा मात्र क्यु गर्छ (O(1)); ब्याकग्राउन्ड टाइमरले
  `POST {endpoint}/v1/traces` मार्फत एसिन्क्रोनस रूपमा फ्लस गर्छ। ओभरलोड हुँदा
  सबैभन्दा पुराना इभेन्टहरू हटाइन्छन् (`dropped` काउन्टर) — डेटा प्लेनमा कहिल्यै
  ब्याकप्रेसर दिइँदैन।
- **कन्फिगर नगरिएसम्म असक्षम हुन्छ।** `OMNIROUTE_OTEL_ENDPOINT` (वा
  `OTEL_EXPORTER_OTLP_ENDPOINT`) सेट गरिएको हुनुपर्छ; अन्यथा सङ्क दर्ता हुँदैन
  र कुनै पनि OTel कोड चल्दैन।

## 5. व्याख्यायोग्यता

- `GET /v1/explain/routing` ले हालैका `RoutingEvent` हरू (वास्तविक
  निर्णयहरू, सबैभन्दा नयाँ पहिले) र प्रत्येक प्रदायक/मोडेलको गुणस्तर स्न्यापसट फर्काउँछ।
- प्रमाणीकरणले `/v1/combos` लाई अनुसरण गर्छ (Bearer API कुञ्जी वा ड्यासबोर्ड सत्र;
  `REQUIRE_API_KEY=false` भएका एकल-प्रयोगकर्ता स्थानीय डिप्लोयमेन्टमा बेनामी पहुँच)।
- प्रत्येक आह्वानका कम्बो-स्तरीय ट्रेसहरू विद्यमान `decisionTrace.ts`
  (हेडर `X-OmniRoute-Combo-Trace`) मार्फत उपलब्ध रहन्छन्।
- सुरक्षा: इभेन्टहरूमा राउटिङ मेटाडेटा मात्र हुन्छ, प्रम्प्ट/बडी/क्रेडेन्सियलहरू कहिल्यै हुँदैनन्।

## 6. मूल्याङ्कन-प्लेन एकीकरण (Future AGI तत्परता)

OmniRoute ले Future AGI (वा कुनै पनि मूल्याङ्कनकर्तालाई) **सम्भावित
इन्टेलिजेन्स/मूल्याङ्कन ब्याकएन्डका रूपमा लिन्छ, निर्भरताका रूपमा होइन**। एकीकरणका सीमहरू:

- `RoutingEventSink` ले इभेन्टहरू एसिन्क्रोनस रूपमा मूल्याङ्कनकर्तातर्फ फर्वार्ड गर्न सक्छ।
- `MemoryRoutingEventStore` + गुणस्तर स्न्यापसटले मूल्याङ्कनकर्तालाई कच्चा
  निर्णय स्ट्रिम उपलब्ध गराउँछन्।
- भावी `Evaluator` (डिटर्मिनिस्टिक, स्थानीय जज, HTTP, WASM) ले
  इभेन्ट/ट्रेसहरू उपभोग गरेर `QualityScore` फर्काउनेछ, जसले उही
  `getQualityScore`/गुणस्तर-फ्याक्टर पाथमा इनपुट दिन्छ।
- विद्यमान मूल्याङ्कन-सञ्चालित राउटिङ (`open-sse/services/evalRouting.ts`) ले सक्षम हुँदा
  `eval_runs` पास-दरका आधारमा कम्बो लक्ष्यहरू पहिले नै पुनःक्रमबद्ध गर्छ।

अनुरोध पाथमा कुनै पनि मूल्याङ्कन सिंक्रोनस रूपमा चल्दैन, र मूल्याङ्कनकर्ता अनुपस्थित हुँदा पनि
गेटवे पूर्ण रूपमा सञ्चालन हुन्छ।

## 7. अन्तिम आर्किटेक्चरल समीक्षा

1. **सिंक्रोनस हट पाथमा के बाँकी रहन्छ?** राउटिङ/स्कोरिङ, गार्डरेल
   पूर्व-जाँचहरू, क्यास लुकअप, र इन-मेमोरी सङ्कहरूमा एउटा `emitRoutingEvent`
   फ्यान-आउट (आधारभूत स्कोरिङभन्दा ~0.12 µs बढी)।
2. **एसिन्क्रोनस प्रशोधनमा के सारियो?** OTel निर्यात (टाइमर + fetch),
   `call_logs`/प्रयोगको स्थायी भण्डारण, सिमान्टिक-क्यास राइटहरू; गुणस्तर इन-मेमोरी
   र O(1) छ (एसिन्क आवश्यक छैन)।
3. **राउटिङ नतिजा कसरी फिडब्याक बन्छ?** `handleChatCore` ले
   `RoutingEvent` उत्सर्जन गर्छ → `QualityTracker` ले EWMA स्थिति अद्यावधिक गर्छ →
   `getQualityScore` ले स्वतः-कम्बो `quality` फ्याक्टरलाई इनपुट दिन्छ।
4. **गुणस्तरले भावी राउटिङलाई कसरी प्रभाव पार्छ?** न्यून गुणस्तर स्कोरले
   `scoreAutoTargets` मा त्यस प्रदायक/मोडेलको भारित स्कोर घटाउँछ, जसले गर्दा कमजोर भएका
   मोडेलहरूको प्राथमिकता क्रमशः घट्छ र तिनको EWMA सुधारिँदै जाँदा पुनःस्थापित हुन्छ।
5. **Future AGI निर्भरता नबनी कसरी एकीकृत हुन सक्छ?** `RoutingEventSink`
   इन्टरफेस / भावी `Evaluator` एडाप्टरमार्फत — कुनै हार्डकोड गरिएको निर्भरता छैन।
6. **मूल्याङ्कनकर्ता अनुपलब्ध हुँदा के हुन्छ?** राउटिङ अप्रभावित रहन्छ;
   कुनै अवलोकित सङ्केत नभएका मोडेलहरूका लागि गुणस्तर तटस्थ (1.0) मा फलब्याक हुन्छ।
7. **टेलिमेट्री अनुपलब्ध हुँदा के हुन्छ?** OTel सङ्क दर्ता नै हुँदैन;
   बाँकी राउटिङ तह अपरिवर्तित रूपमा चल्छ।
8. **ओभरलोड हुँदा के हुन्छ?** OTel बफरले सबैभन्दा पुराना इभेन्टहरू हटाउँछ; गुणस्तर
   र रिङ बफर संरचनागत रूपमा सीमित छन्; कुनै ब्याकप्रेसर हुँदैन।
9. **गिरावटपछि प्रदायकको स्थिति कसरी पुनःस्थापित हुन्छ?** सफलताहरू सञ्चित हुँदै जाँदा
   EWMA पुनः अभिसरण हुन्छ; वार्मअपले कोल्ड मोडेलहरूलाई तटस्थ राख्छ; सर्किट ब्रेकर
   स्वतन्त्र रूपमा HALF_OPEN प्रोबहरूमार्फत पुनःस्थापित हुन्छ।
10. **कुन प्रस्तावित सुविधाहरू जानाजानी कार्यान्वयन गरिएनन्, र किन?**
    - स्याडो ट्राफिक / प्रयोगहरू — पहिले नै कार्यान्वयन गरिएको छ
      (`combo/shadowRouting.ts`); पुनः निर्माण गरिएन।
    - गार्डरेलहरू — पहिले नै कार्यान्वयन गरिएको छ (`src/lib/guardrails/`); दोहोर्याइएन।
    - सिमान्टिक क्यास — पहिले नै कार्यान्वयन गरिएको छ (`src/lib/semanticCache.ts`); दोहोर्याइएन।
    - पूर्ण प्रयोग-व्यवस्थापन प्लेटफर्म, डेटासेट टुलिङ, प्रम्प्ट-अनुकूलन
      प्लेटफर्म, भेक्टर DB, वा अनिवार्य बाह्य OTel पूर्वाधार — हल्का डेटा प्लेनको
      कार्यक्षेत्रबाहिर।
    - Rust `RoutingEvent` स्ट्रक्ट — डेटा प्लेन TypeScript मा छ; TS टाइप
      त्यसको अनुकूलित समकक्ष हो।

## 8. कन्फिगरेसन सन्दर्भ

| भेरिएबल                       | पूर्वनिर्धारित | प्रभाव                                                                                 |
| ----------------------------- | -------------- | -------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | सेट नगरिएको    | सेट गरिँदा, OTLP/HTTP ट्रेस निर्यातकर्ता सक्षम गर्छ (उदाहरण: `http://collector:4318`)। |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | सेट नगरिएको    | OTLP एन्डपोइन्टका लागि वैकल्पिक फल्ब्याक नाम।                                          |
| `OTEL_SERVICE_NAME`           | `omniroute`    | `service.name` स्रोत विशेषता।                                                          |

## 9. परीक्षणहरू

- `tests/unit/routing-events.test.ts` — इभेन्ट सामान्यीकरण, स्थिति
  वर्गीकरण, सीमित रिङ बफर, सङ्क फ्यान-आउट + पृथकीकरण।
- `tests/unit/routing-quality.test.ts` — EWMA वार्मअप, विफलता/सफलता पुनःप्राप्ति,
  विसङ्गति पेनाल्टीहरू, 429 क्षणिक ह्यान्डलिङ, स्न्यापसट, रिसेट।
- `tests/unit/routing-scoring-quality.test.ts` — तौल अखण्डता, तटस्थ
  पूर्वनिर्धारित मान, गुणस्तर कारक श्रेणीकरण।
- `tests/unit/routing-otel.test.ts` — सक्षमता गेटिङ, GenAI स्प्यान पेलोड, एसिङ्क
  फ्लस, ओभरलोडमा ड्रप।
- `tests/unit/routing-events-concurrency.test.ts` — हजारौँ इभेन्टहरू, रिङ
  बफरको सीमितता, अपवाद फ्याँक्ने सङ्कको पृथकीकरण, अन्तरमिश्रित एसिङ्क बर्स्टहरू,
  इन्सर्टको समयमा रिसेट।
- `tests/unit/routing-adaptive-e2e.test.ts` — वास्तविक
  `scoreAutoTargets` स्कोररमार्फत निर्धारणात्मक अन्त्यदेखि-अन्त्यसम्मको लूप: स्वस्थ → ह्रास → पुनःप्राप्ति → क्षणिक समस्या, साथै
  कोल्ड-स्टार्ट र भाग्यमानी-कोल्ड-प्रदायक परिदृश्यहरू।
- `tests/unit/stream-timing.test.ts` — TTFT (पहिलो-फर्वार्ड-गरिएको-चङ्क), ITL,
  पहिलो-बाइट बनाम पहिलो-फर्वार्ड, अवरोध, विकृत/खाली चङ्क सुरक्षा।

## 10. पूर्व-अवस्थित समस्याहरूको स्थिति (चरण 18)

| समस्या                                               | स्थिति                        | टिप्पणीहरू                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniglyph` निर्यात बेमेल                            | **समाधान गरिएको (वातावरणीय)** | `node_modules`, `package-lock.json` सँग समक्रमणमा थिएन (इन्स्टल गरिएको 1.3.1 बनाम लक गरिएको 1.4.0)। `npm install omniglyph@1.4.0` चलाउँदा लक गरिएको संस्करण पुनर्स्थापित भयो; टाइप त्रुटिहरू 0 मा झरे। म्यानिफेस्टहरू अपरिवर्तित छन्।                                            |
| पुराना `getKnownContextOverflow` परीक्षणहरू          | **ज्ञात — समाधान नगरिएको**    | `combo-context-overflow-compression-probe.test.ts` ले `open-sse/services/combo.ts` मा अब अस्तित्वमा नरहेको फङ्सन आयात गर्छ (टिप्पणीहरूले मात्र यसको सन्दर्भ दिन्छन्)। समाधान गर्न ती परीक्षणहरू पुनः कार्यान्वयन वा पुनर्लेखन गर्नुपर्छ — यो असम्बन्धित वास्तुकलात्मक फेरबदल हो। |
| `combo-runtime-unit-concurrency.test.ts` DB पृथकीकरण | **ज्ञात — समाधान नगरिएको**    | सिधै चलाउँदा परीक्षण-हार्नेसको SQLite-पृथकीकरण दाबी विफल हुन्छ; आधार शाखामा पनि उस्तै गरी विफल हुन्छ।                                                                                                                                                                            |
| i18n `llm.txt` विचलन                                 | **ज्ञात — समाधान नगरिएको**    | `docs/i18n/*/llm.txt` मूल फाइलभन्दा फरक छन्; यो पूर्व-अवस्थित हो र docs-sync pre-commit गेटलाई अवरुद्ध गर्छ।                                                                                                                                                                     |

वातावरणीय र कोडसम्बन्धी समस्याहरूलाई अलग राखिएको छ; परिवर्तन गरिएका परीक्षण फिल्टरहरू
पछाडि कुनै पनि असम्बन्धित विफलताहरू लुकाइएका छैनन्।
