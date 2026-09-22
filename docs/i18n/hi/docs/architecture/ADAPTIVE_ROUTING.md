# Adaptive Routing: Routing Events, Quality Feedback & Explainability (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

यह दस्तावेज़ OmniRoute में जोड़े गए फ़ीडबैक-संचालित अनुकूली रूटिंग आधार का वर्णन करता है। इसे जानबूझकर छोटा रखा गया है: यह एक टाइप्ड रूटिंग-परिणाम चैनल, मौजूदा auto-combo स्कोरर को इनपुट देने वाला एक ऑनलाइन गुणवत्ता संकेत, एक वैकल्पिक OpenTelemetry एक्सपोर्टर और एक व्याख्यात्मकता एंडपॉइंट प्रस्तुत करता है। यह मौजूदा रेज़िलिएंस स्टैक (सर्किट ब्रेकर, कनेक्शन कूलडाउन, मॉडल लॉकआउट, हेल्थ मैट्रिक्स, ऑटोपायलट) को **प्रतिस्थापित नहीं** करता — बल्कि उसका पूरक है।

## 1. आर्किटेक्चरल संदर्भ

OmniRoute एक डेटा प्लेन है जिसमें एक **रिक्वेस्ट हॉट पाथ** और एक **कंट्रोल/इंटेलिजेंस प्लेन** है। हॉट पाथ को तेज़, मेमोरी-कुशल, एसिंक्रोनस, रेज़िलिएंट और पूर्वानुमेय बने रहना चाहिए। मूल्यांकन, गुणवत्ता स्कोरिंग, प्रयोग और ऐतिहासिक विश्लेषण कंट्रोल प्लेन में आते हैं।

```
AI एजेंट / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   डेटा प्लेन (तेज़, सिंक, इन-मेमोरी)
│  रूटिंग / फेलओवर   │
│  हेल्थ / गार्डरेल   │
│  कैश / स्ट्रीमिंग   │
└──────────┬──────────┘
           │ RoutingEvent (फायर-एंड-फॉरगेट, ~0.2µs)
           ▼
┌─────────────────────┐
│  फ़ीडबैक सिंक       │   कंट्रोल प्लेन (एसिंक, सर्वोत्तम-प्रयास)
│  गुणवत्ता ट्रैकर    │
│  OTel एक्सपोर्टर    │
│  स्पष्टीकरण स्टोर   │
└──────────┬──────────┘
           ▼  गुणवत्ता स्कोर
      auto-combo स्कोरर
```

### जो पहले से मौजूद था (ऑडिट किया गया, दोहराया नहीं गया)

| अवधारणा                                   | मौजूदा कार्यान्वयन                                                                          |
| ----------------------------------------- | ------------------------------------------------------------------------------------------- |
| उपलब्धता (क्या हम ट्रैफ़िक भेज सकते हैं?) | सर्किट ब्रेकर (CLOSED/DEGRADED/OPEN/HALF_OPEN, DB में स्थायी), कनेक्शन कूलडाउन, मॉडल लॉकआउट |
| हेल्थ रिपोर्टिंग                          | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                     |
| शैडो ट्रैफ़िक                             | `open-sse/services/combo/shadowRouting.ts`                                                  |
| गार्डरेल                                  | `src/lib/guardrails/` (प्री/पोस्ट हुक)                                                      |
| एग्ज़ैक्ट कैश                             | `src/lib/semanticCache.ts` (सिग्नेचर-आधारित)                                                |
| इवैल्यूएटर / इवैल्यू-संचालित रूटिंग       | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                        |
| कॉम्बो निर्णय व्याख्यात्मकता              | `open-sse/services/combo/decisionTrace.ts`                                                  |
| डैशबोर्ड रियल-टाइम इवेंट                  | `src/lib/events/eventBus.ts` (UI नोटिफ़िकेशन चैनल, `unknown` पेलोड, 100-एंट्री हिस्ट्री)    |

रूटिंग-इवेंट लेयर `eventBus` का पुनः कार्यान्वयन **नहीं** है: वह बस डैशबोर्ड का रियल-टाइम नोटिफ़िकेशन चैनल है (टाइप्ड _इवेंट नाम_, अपारदर्शी पेलोड, UI उपभोक्ता)। `RoutingEvent` एक टाइप्ड _परिणाम_ स्ट्रक्ट है (लेटेंसी/टोकन/लागत/परिणाम/समापन-कारण), जिसका उपयोग कंट्रोल प्लेन के फ़ीडबैक सिंक (गुणवत्ता ट्रैकर, OTel एक्सपोर्टर, स्पष्टीकरण स्टोर) करते हैं।

### जो मौजूद नहीं था (यहाँ जोड़ा गया)

1. एक **टाइप्ड रूटिंग-परिणाम इवेंट + सिंक एब्स्ट्रैक्शन** (`RoutingEvent` /
   `RoutingEventSink`)। `decisionTrace` कॉम्बो-स्कोप्ड और केवल इन-मेमोरी है;
   `comboMetrics` संचयी काउंटर हैं; `call_logs` कच्चा एसिंक स्थायित्व है।
   इनमें से कोई भी ऐसा टाइप्ड, सिंक-आधारित परिणाम चैनल नहीं है जिसकी सदस्यता कोई गुणवत्ता ट्रैकर, OTel
   एक्सपोर्टर या Future-AGI-शैली का इवैल्यूएटर ले सके।
2. आउटपुट गुणवत्ता के लिए एक **ऑनलाइन गुणवत्ता संकेत** (EWMA) — इससे पहले स्कोरर
   "गुणवत्ता" का अनुमान केवल स्थिर कार्य उपयुक्तता और ऑप्ट-इन इवैल्यू पास-दरों के माध्यम से लगाता था।
3. GenAI सिमेंटिक कन्वेंशनों का उपयोग करने वाला एक **वैकल्पिक, निर्भरता-मुक्त OTel एक्सपोर्टर**।
4. वास्तविक रूटिंग निर्णय + गुणवत्ता स्थिति लौटाने वाला एक **व्याख्यात्मकता एंडपॉइंट**।

## 2. रूटिंग इवेंट्स (फ़ीडबैक का आधार)

फ़ाइलें: `open-sse/services/routing/events.ts`, `.../index.ts`

एक `RoutingEvent` केवल रूटिंग मेटाडेटा रखता है:

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
  outcome: RoutingOutcome; // अनुमत-सूचीबद्ध यूनियन
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink`, TypeScript में एक `Send+Sync`-शैली का trait है:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // O(1) होना चाहिए, कोई सिंक्रोनस I/O नहीं
}
```

हॉट पाथ प्रत्येक पूर्ण हुए अनुरोध के लिए `emitRoutingEvent(event)` को एक बार कॉल करता है
(स्ट्रीमिंग-पूर्णता कॉलबैक, नॉन-स्ट्रीमिंग सफलता पाथ, और
`handleChatCore` में विकृत-200 विफलता पाथ)। प्रेषण पंजीकृत sinks को सिंक्रोनस fan-out
है, लेकिन प्रत्येक sink केवल इन-मेमोरी स्थिति को क्यू/अपडेट करता है। **हॉट पाथ पर
कोई सिंक्रोनस डेटाबेस लेखन नहीं, कोई नेटवर्क I/O नहीं।**

डिफ़ॉल्ट sinks:

- `MemoryRoutingEventStore` — सीमित (500) रिंग बफ़र, नवीनतम-पहले क्रम में, explain
  endpoint के लिए।
- `QualityTracker` उपभोक्ता — EWMA गुणवत्ता अनुमान को अपडेट करता है।
- `OtlpHttpsEventSink` — वैकल्पिक, केवल तभी सक्षम होता है जब `OMNIROUTE_OTEL_ENDPOINT`
  (या `OTEL_EXPORTER_OTLP_ENDPOINT`) सेट हो।

### मापा गया ओवरहेड (ईमानदार तुलना)

इस वर्कस्टेशन पर `npm run bench:routing-events` (100k पुनरावृत्तियाँ; sub-µs
ऑपरेशंस को समेकित µs/op के रूप में मापा गया, क्योंकि प्रति-ऑपरेशन प्रतिशतक
`performance.now()` टाइमर रिज़ॉल्यूशन से कम हैं):

| परिदृश्य                         | µs/op  | ops/s  |
| -------------------------------- | ------ | ------ |
| बेसलाइन (केवल स्कोरिंग)          | ~0.045 | ~22 M  |
| बेसलाइन + RoutingEvent (2 sinks) | ~0.168 | ~5.9 M |
| बेसलाइन + इवेंट + OTel enqueue   | ~0.163 | ~6.1 M |
| समवर्ती (8 इंटरलीव्ड बर्स्ट)     | ~0.18  | —      |

बेसलाइन स्कोरिंग की तुलना में इवेंट-डिस्पैच का अंतर ~0.12 µs/request है; OTel sink
केवल क्यू में डालता है (O(1) बफ़र push), जिससे मापने योग्य कुछ भी नहीं जुड़ता। ये
संख्याएँ मशीन-विशिष्ट और सापेक्ष हैं — उत्पादन की गारंटी नहीं। v1 का "~0.2 µs"
आँकड़ा एक समेकित अनुमान था; यह कार्यप्रणाली स्कोरिंग बेसलाइन को
इवेंट-डिस्पैच लागत से अलग करती है।

## 3. गुणवत्ता संकेत (फ़ीडबैक-संचालित प्रदाता स्थिति)

फ़ाइलें: `open-sse/services/routing/quality.ts`

v2 **संचालनात्मक** गुणवत्ता को **अर्थगत** गुणवत्ता से अलग करता है:

- **संचालनात्मक** — रूटिंग हॉट पाथ से प्राप्त (HTTP 4xx/5xx, कनेक्शन
  विफलताएँ, 429s, विकृत प्रतिक्रियाएँ, स्ट्रीम अवरोध, `finish_reason=length`,
  शून्य-आउटपुट सफलताएँ, latency/TTFT EWMA)। 200 को अर्थगत गुणवत्ता नहीं माना
  जाता।
- **अर्थगत** — जनरेट किए गए आउटपुट का वास्तविक मूल्य। यह केवल किसी evaluator
  द्वारा `setSemanticQuality()` के माध्यम से ही उत्पन्न होता है। जब तक कोई इसे
  प्रदान नहीं करता, तब तक यह `null` रहता है और संचालनात्मक स्कोर में कभी लीक
  नहीं होता।

प्रति-(provider, model) स्थिति (EWMA + सीमित काउंटर):

- `successEwma` — परिणाम की सफलता का EWMA (α=0.2)।
- `latencyEwma` / `ttftEwma` — विलंबता का EWMA (α=0.1)।
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`।
- `recencyMs` — मॉडल को अंतिम बार कितने समय पहले देखा गया था।

### विश्वसनीयता / नमूना-जागरूकता

`confidence = clamp01(samples / 50)`, और स्कोरर को लौटाया गया स्कोर तटस्थ
मध्य-बिंदु की ओर मिश्रित किया जाता है:

```
score = 0.5 + confidence * (operational - 0.5)
```

परिणाम (परीक्षणों द्वारा सत्यापित):

- एक cold provider (0 samples) का स्कोर **0.5** होता है — उसे अनुचित रूप से
  दंडित नहीं किया जाता, लेकिन वह हज़ारों ठोस अवलोकनों वाले provider पर हावी भी
  नहीं हो सकता।
- 7 भाग्यशाली सफलताओं वाला provider 0.5 की ओर खींचा जाता है (आशावादी
  initialization के कारण कभी हावी नहीं होता)।
- 50+ samples वाला provider अपने वास्तविक संचालनात्मक स्कोर की ओर अभिसरित
  होता है।
- गिरावट और पुनर्प्राप्ति क्रमिक होती हैं (EWMA), और एक अकेली विफलता किसी
  स्वस्थ provider को नष्ट नहीं करती।

`ProviderQuality`, `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }` को उजागर करता है।

यह auto-combo scorer को `quality` स्कोरिंग फ़ैक्टर के रूप में इनपुट देता है:

- `open-sse/services/autoCombo/scoring.ts` में
  `ScoringFactors.quality` / `ScoringWeights.quality`।
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03। कुल योग 1.0 रहता है।
- `buildAutoCandidates`, tracker से `candidate.quality` भरता है; डेटा-विहीन
  candidates का डिफ़ॉल्ट तटस्थ **0.5** होता है (एक cold candidate को न तो बढ़ावा
  दिया जाता है, न दंडित किया जाता है)।

बंद लूप:

```
RoutingEvent → QualityTracker → getQualityScore → auto-combo गुणवत्ता फ़ैक्टर
      ↑                                                    │
      └────── अनुरोध परिणाम (handleChatCore) ←──────────────┘
```

### पूर्ण बहिष्करण बनाम हल्का दंड

गुणवत्ता संकेत केवल एक **हल्की अनुकूली प्राथमिकता** है। पूर्ण बहिष्करण मौजूदा
resilience stack के पास ही रहता है: circuit breaker OPEN, quota समाप्त,
auth failure, model lockout — इनमें से कोई भी गुणवत्ता स्कोर से प्रभावित नहीं
होता। जिस provider का गुणवत्ता स्कोर अस्थायी रूप से गिरता है, उसकी प्राथमिकता
कम की जाती है; उसे कभी पूर्णतः अक्षम नहीं किया जाता।

## 3b. कैनोनिकल स्ट्रीम टाइमिंग (TTFT / ITL)

फ़ाइलें: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` स्ट्रीमिंग पथ के लिए एकमात्र इंस्ट्रूमेंटेशन सीम है,
जिसे `createSSEStream` (`open-sse/utils/stream.ts`) में जोड़ा गया है:

- `markByte()` — पहला अपस्ट्रीम चंक प्राप्त हुआ।
- `markForward()` — क्लाइंट को फ़ॉरवर्ड किया गया पहला चंक (TTFT के लिए उपयोग किया जाता है)।
- `markInterrupted()` — सुचारु समापन से पहले स्ट्रीम टाइमआउट/अबॉर्ट/त्रुटि।
- `ttft()` = पहले-फ़ॉरवर्ड-किए-गए-SSE-चंक की लेटेंसी। **यह टोकन-स्तरीय TTFT नहीं है** —
  एक SSE चंक में शून्य/एक/कई टोकन हो सकते हैं। इसे सटीक रूप से प्रलेखित किया गया है।
- `avgItlMs()` = औसत अंतर-चंक अंतराल (ITL के लिए चंक-लेटेंसी प्रॉक्सी)।

TTFT/ITL/interrupted, `RoutingEvent` (`ttftMs`, `itlMs`) में प्रवाहित होते हैं और
OTel सिंक द्वारा GenAI/OmniRoute स्पैन एट्रिब्यूट के रूप में एक्सपोर्ट किए जाते हैं।

## 4. OpenTelemetry / GenAI ऑब्ज़र्वेबिलिटी

फ़ाइलें: `open-sse/services/routing/otel.ts`

- डिपेंडेंसी-मुक्त OTLP/HTTP JSON एक्सपोर्टर (ग्लोबल `fetch` का उपयोग करता है,
  `@opentelemetry/*` SDK का नहीं)।
- स्पैन GenAI सिमेंटिक कन्वेंशन (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) के साथ OmniRoute रूटिंग
  एट्रिब्यूट (परिणाम, स्थिति, ttft, पुनः प्रयास, फ़ॉलबैक) का पालन करते हैं।
- `record()` केवल एक सीमित बफ़र में एनक्यू करता है (O(1)); एक बैकग्राउंड टाइमर
  एसिंक्रोनस रूप से `POST {endpoint}/v1/traces` के माध्यम से फ़्लश करता है। ओवरलोड के दौरान
  सबसे पुराने इवेंट हटा दिए जाते हैं (`dropped` काउंटर) — डेटा
  प्लेन पर कभी बैकप्रेशर नहीं डाला जाता।
- **कॉन्फ़िगर किए बिना अक्षम रहता है।** `OMNIROUTE_OTEL_ENDPOINT` (या
  `OTEL_EXPORTER_OTLP_ENDPOINT`) सेट होना चाहिए; अन्यथा सिंक
  रजिस्टर नहीं होता और कोई OTel कोड नहीं चलता।

## 5. व्याख्येयता

- `GET /v1/explain/routing` हाल के `RoutingEvent`s (वास्तविक
  निर्णय, नवीनतम पहले) और प्रति-प्रोवाइडर/मॉडल क्वालिटी स्नैपशॉट लौटाता है।
- ऑथ `/v1/combos` के समान है (Bearer API कुंजी या डैशबोर्ड सेशन; ऐसे
  एकल-उपयोगकर्ता लोकल डिप्लॉयमेंट में अनाम पहुँच, जहाँ `REQUIRE_API_KEY=false` है)।
- कॉम्बो-स्तरीय प्रति-इनवोकेशन ट्रेस मौजूदा
  `decisionTrace.ts` (हेडर `X-OmniRoute-Combo-Trace`) के माध्यम से उपलब्ध रहते हैं।
- सुरक्षा: इवेंट में केवल रूटिंग मेटाडेटा होता है, कभी भी प्रॉम्प्ट/बॉडी/क्रेडेंशियल नहीं होते।

## 6. इवैल्यूएशन-प्लेन इंटीग्रेशन (Future AGI तत्परता)

OmniRoute, Future AGI (या किसी भी इवैल्यूएटर) को **एक संभावित
इंटेलिजेंस/इवैल्यूएशन बैकएंड मानता है, डिपेंडेंसी नहीं**। इंटीग्रेशन सीम:

- एक `RoutingEventSink` इवेंट को एसिंक्रोनस रूप से इवैल्यूएटर को फ़ॉरवर्ड कर सकता है।
- `MemoryRoutingEventStore` + क्वालिटी स्नैपशॉट इवैल्यूएटर को अपरिष्कृत
  निर्णय स्ट्रीम प्रदान करते हैं।
- भविष्य का एक `Evaluator` (डिटरमिनिस्टिक, लोकल जज, HTTP, WASM) इवेंट/ट्रेस का उपयोग
  करेगा और एक `QualityScore` लौटाएगा, जो उसी
  `getQualityScore`/क्वालिटी-फ़ैक्टर पथ में फ़ीड होगा।
- मौजूदा इवैल-चालित रूटिंग (`open-sse/services/evalRouting.ts`) सक्षम होने पर
  पहले से ही `eval_runs` पास-रेट के आधार पर कॉम्बो टारगेट को फिर से क्रमबद्ध करती है।

रिक्वेस्ट पथ पर कोई इवैल्यूएशन सिंक्रोनस रूप से नहीं चलता, और इवैल्यूएटर की
अनुपस्थिति में भी गेटवे पूरी तरह काम करता है।

## 7. अंतिम आर्किटेक्चरल समीक्षा

1. **सिंक्रोनस हॉट पथ पर क्या शेष रहता है?** रूटिंग/स्कोरिंग, गार्डरेल
   प्री-चेक, कैश लुकअप और इन-मेमोरी सिंक के लिए एक `emitRoutingEvent` फ़ैन-आउट
   (बेसलाइन स्कोरिंग से ~0.12 µs अधिक)।
2. **एसिंक्रोनस प्रोसेसिंग में क्या स्थानांतरित किया गया?** OTel एक्सपोर्ट (टाइमर + fetch),
   `call_logs`/उपयोग परसिस्टेंस, सिमेंटिक-कैश राइट; क्वालिटी इन-मेमोरी
   और O(1) है (एसिंक की आवश्यकता नहीं)।
3. **रूटिंग परिणाम फ़ीडबैक कैसे बनता है?** `handleChatCore` एक
   `RoutingEvent` एमिट करता है → `QualityTracker` EWMA स्टेट अपडेट करता है → `getQualityScore`
   ऑटो-कॉम्बो के `quality` फ़ैक्टर में फ़ीड होता है।
4. **क्वालिटी भविष्य की रूटिंग को कैसे प्रभावित करती है?** कम क्वालिटी स्कोर
   `scoreAutoTargets` में उस प्रोवाइडर/मॉडल के वेटेड स्कोर को कम करता है, जिससे खराब प्रदर्शन
   करने वाले मॉडलों की प्राथमिकता धीरे-धीरे कम होती है और उनके EWMA में सुधार के साथ वे रिकवर होते हैं।
5. **Future AGI डिपेंडेंसी बने बिना कैसे इंटीग्रेट हो सकता है?**
   `RoutingEventSink` इंटरफ़ेस / भविष्य के `Evaluator` अडैप्टर के माध्यम से — कोई हार्डकोडेड
   डिपेंडेंसी नहीं।
6. **इवैल्यूएटर अनुपलब्ध होने पर क्या होता है?** रूटिंग अप्रभावित रहती है;
   जिन मॉडलों के लिए कोई अवलोकित सिग्नल नहीं है, उनके लिए क्वालिटी न्यूट्रल (1.0) पर फ़ॉलबैक करती है।
7. **टेलीमेट्री अनुपलब्ध होने पर क्या होता है?** OTel सिंक
   रजिस्टर ही नहीं होता; शेष रूटिंग लेयर बिना बदलाव के चलती रहती है।
8. **ओवरलोड की स्थिति में क्या होता है?** OTel बफ़र सबसे पुराने इवेंट हटा देता है; क्वालिटी
   और रिंग बफ़र संरचनात्मक रूप से सीमित हैं; कोई बैकप्रेशर नहीं।
9. **गिरावट के बाद प्रोवाइडर स्टेट कैसे रिकवर होता है?** सफलताएँ
   संचित होने पर EWMA फिर से अभिसरित होता है; वार्मअप नए मॉडलों को न्यूट्रल रखता है; सर्किट ब्रेकर
   स्वतंत्र रूप से HALF_OPEN प्रोब के माध्यम से रिकवर होता है।
10. **कौन-से प्रस्तावित फ़ीचर जानबूझकर लागू नहीं किए गए, और क्यों?**
    - शैडो ट्रैफ़िक / प्रयोग — पहले से लागू हैं
      (`combo/shadowRouting.ts`); इन्हें दोबारा नहीं बनाया गया।
    - गार्डरेल — पहले से लागू हैं (`src/lib/guardrails/`); इन्हें दोहराया नहीं गया।
    - सिमेंटिक कैश — पहले से लागू है (`src/lib/semanticCache.ts`); इसे
      दोहराया नहीं गया।
    - एक पूर्ण प्रयोग-प्रबंधन प्लेटफ़ॉर्म, डेटासेट टूलिंग, प्रॉम्प्ट-ऑप्टिमाइज़ेशन
      प्लेटफ़ॉर्म, वेक्टर DB या अनिवार्य बाहरी OTel इंफ़्रास्ट्रक्चर — एक
      लीन डेटा प्लेन के दायरे से बाहर हैं।
    - एक Rust `RoutingEvent` स्ट्रक्ट — डेटा प्लेन TypeScript में है; TS टाइप
      इसका अनुकूलित समकक्ष है।

## 8. कॉन्फ़िगरेशन संदर्भ

| वेरिएबल                       | डिफ़ॉल्ट    | प्रभाव                                                                                |
| ----------------------------- | ----------- | ------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | सेट नहीं    | सेट होने पर, OTLP/HTTP ट्रेस एक्सपोर्टर सक्षम करता है (उदा. `http://collector:4318`)। |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | सेट नहीं    | OTLP एंडपॉइंट के लिए फ़ॉलबैक उपनाम।                                                   |
| `OTEL_SERVICE_NAME`           | `omniroute` | `service.name` रिसोर्स एट्रिब्यूट।                                                    |

## 9. परीक्षण

- `tests/unit/routing-events.test.ts` — इवेंट नॉर्मलाइज़ेशन, स्थिति
  वर्गीकरण, सीमित रिंग बफ़र, सिंक फ़ैन-आउट + आइसोलेशन।
- `tests/unit/routing-quality.test.ts` — EWMA वार्मअप, विफलता/सफलता रिकवरी,
  विसंगति पेनल्टी, 429 अस्थायी हैंडलिंग, स्नैपशॉट, रीसेट।
- `tests/unit/routing-scoring-quality.test.ts` — वेट अखंडता, तटस्थ
  डिफ़ॉल्ट, गुणवत्ता कारक रैंकिंग।
- `tests/unit/routing-otel.test.ts` — सक्षम करने की गेटिंग, GenAI स्पैन पेलोड, एसिंक
  फ़्लश, ओवरलोड होने पर ड्रॉप।
- `tests/unit/routing-events-concurrency.test.ts` — हज़ारों इवेंट, रिंग
  बफ़र की सीमितता, त्रुटि फेंकने वाले सिंक का आइसोलेशन, इंटरलीव्ड एसिंक बर्स्ट,
  इन्सर्ट के दौरान रीसेट।
- `tests/unit/routing-adaptive-e2e.test.ts` — वास्तविक `scoreAutoTargets` स्कोरर के माध्यम से
  नियतात्मक एंड-टू-एंड लूप: स्वस्थ → अवनति → रिकवरी → क्षणिक गड़बड़ी, साथ ही
  कोल्ड-स्टार्ट और भाग्यशाली-कोल्ड-प्रोवाइडर परिदृश्य।
- `tests/unit/stream-timing.test.ts` — TTFT (पहला-फ़ॉरवर्ड-किया-गया-चंक), ITL,
  पहला-बाइट बनाम पहला-फ़ॉरवर्ड, व्यवधान, विकृत/खाली चंक सुरक्षा।

## 10. पहले से मौजूद समस्याओं की स्थिति (चरण 18)

| समस्या                                               | स्थिति                             | टिप्पणियाँ                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniglyph` एक्सपोर्ट असंगति                         | **ठीक किया गया (पर्यावरण-संबंधी)** | `node_modules`, `package-lock.json` के साथ सिंक से बाहर था (इंस्टॉल किया गया 1.3.1 बनाम लॉक किया गया 1.4.0)। `npm install omniglyph@1.4.0` चलाने से लॉक किया गया संस्करण बहाल हुआ; टाइप त्रुटियाँ घटकर 0 हो गईं। मैनिफ़ेस्ट अपरिवर्तित रहे।                                                             |
| पुराने `getKnownContextOverflow` परीक्षण             | **ज्ञात — ठीक नहीं किया गया**      | `combo-context-overflow-compression-probe.test.ts` एक ऐसे फ़ंक्शन को इंपोर्ट करता है जो अब `open-sse/services/combo.ts` में मौजूद नहीं है (केवल टिप्पणियाँ उसका संदर्भ देती हैं)। इसे ठीक करने के लिए उन परीक्षणों को फिर से लागू करना या दोबारा लिखना आवश्यक है — यह असंबंधित आर्किटेक्चरल बदलाव होगा। |
| `combo-runtime-unit-concurrency.test.ts` DB आइसोलेशन | **ज्ञात — ठीक नहीं किया गया**      | सीधे चलाए जाने पर टेस्ट-हार्नेस SQLite-आइसोलेशन अभिकथन विफल होता है; बेस ब्रांच पर भी समान रूप से विफल होता है।                                                                                                                                                                                         |
| i18n `llm.txt` विचलन                                 | **ज्ञात — ठीक नहीं किया गया**      | `docs/i18n/*/llm.txt`, रूट से भिन्न हैं; यह पहले से मौजूद समस्या है और docs-sync प्री-कमिट गेट को अवरुद्ध करती है।                                                                                                                                                                                      |

पर्यावरण-संबंधी और कोड-संबंधी समस्याओं को अलग रखा गया है; बदले हुए परीक्षण फ़िल्टरों के
पीछे कोई असंबंधित विफलताएँ छिपाई नहीं गई हैं।
