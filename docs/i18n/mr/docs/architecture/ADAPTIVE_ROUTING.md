# Adaptive Routing: Routing Events, Quality Feedback & Explainability (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

हा दस्तऐवज OmniRoute मध्ये जोडलेल्या अभिप्राय-चालित अनुकूली रूटिंगच्या पायाभूत सुविधांचे वर्णन करतो. याची व्याप्ती हेतुपुरस्सर लहान ठेवली आहे: यात प्रकारबद्ध रूटिंग-परिणाम चॅनेल, विद्यमान auto-combo स्कोअररला इनपुट देणारा ऑनलाइन गुणवत्ता संकेत, पर्यायी OpenTelemetry एक्सपोर्टर आणि स्पष्टीकरणक्षमता एंडपॉइंट समाविष्ट केले आहेत. हे विद्यमान लवचिकता स्टॅकची (सर्किट ब्रेकर, कनेक्शन कूलडाउन, मॉडेल लॉकआउट, आरोग्य मॅट्रिक्स, ऑटोपायलट) जागा **घेत नाही** — तर त्याला पूरक ठरते.

## 1. आर्किटेक्चरल संदर्भ

OmniRoute हा **विनंती हॉट पाथ** आणि **नियंत्रण/बुद्धिमत्ता प्लेन** असलेला डेटा प्लेन आहे. हॉट पाथ जलद, मेमरी-कार्यक्षम, असिंक्रोनस, लवचिक आणि अंदाज करता येण्याजोगा राहिला पाहिजे. मूल्यमापन, गुणवत्ता स्कोअरिंग, प्रयोग आणि ऐतिहासिक विश्लेषण हे नियंत्रण प्लेनमध्ये असतात.

```
AI एजंट / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   डेटा प्लेन (जलद, सिंक, इन-मेमरी)
│  रूटिंग / फेलओव्हर  │
│  आरोग्य / संरक्षक   │
│  कॅशे / स्ट्रीमिंग  │
└──────────┬──────────┘
           │ RoutingEvent (फायर-अँड-फरगेट, ~0.2µs)
           ▼
┌─────────────────────┐
│  अभिप्राय सिंक्स    │   नियंत्रण प्लेन (असिंक्रोनस, सर्वोत्तम-प्रयत्न)
│  गुणवत्ता ट्रॅकर    │
│  OTel एक्सपोर्टर    │
│  स्पष्टीकरण स्टोअर  │
└──────────┬──────────┘
           ▼  गुणवत्ता स्कोअर
      auto-combo स्कोअरर
```

### आधीपासून उपलब्ध असलेले घटक (लेखापरीक्षण केलेले, पुनरावृत्ती न केलेले)

| संकल्पना                              | विद्यमान अंमलबजावणी                                                                              |
| ------------------------------------- | ------------------------------------------------------------------------------------------------ |
| उपलब्धता (आपण ट्रॅफिक पाठवू शकतो का?) | सर्किट ब्रेकर (CLOSED/DEGRADED/OPEN/HALF_OPEN, DB मध्ये टिकवलेला), कनेक्शन कूलडाउन, मॉडेल लॉकआउट |
| आरोग्य अहवाल                          | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                          |
| शॅडो ट्रॅफिक                          | `open-sse/services/combo/shadowRouting.ts`                                                       |
| संरक्षक                               | `src/lib/guardrails/` (पूर्व/उत्तर हुक्स)                                                        |
| अचूक कॅशे                             | `src/lib/semanticCache.ts` (स्वाक्षरी-आधारित)                                                    |
| मूल्यमापक / मूल्यमापन-चालित रूटिंग    | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                             |
| कॉम्बो निर्णय स्पष्टीकरणक्षमता        | `open-sse/services/combo/decisionTrace.ts`                                                       |
| डॅशबोर्ड रिअल-टाइम इव्हेंट्स          | `src/lib/events/eventBus.ts` (UI सूचना चॅनेल, `unknown` पेलोड्स, 100-नोंदींचा इतिहास)            |

रूटिंग-इव्हेंट स्तर हा `eventBus` ची पुनर्अंमलबजावणी **नाही**: तो बस म्हणजे डॅशबोर्डचे रिअल-टाइम सूचना चॅनेल आहे (प्रकारबद्ध _इव्हेंट नावे_, अपारदर्शक पेलोड्स, UI ग्राहक). `RoutingEvent` हा प्रकारबद्ध _परिणाम_ स्ट्रक्ट आहे (विलंब/टोकन्स/खर्च/परिणाम/समाप्ती-कारण), जो नियंत्रण प्लेनच्या अभिप्राय सिंक्सद्वारे (गुणवत्ता ट्रॅकर, OTel एक्सपोर्टर, स्पष्टीकरण स्टोअर) वापरला जातो.

### जे उपलब्ध नव्हते (येथे जोडलेले)

1. एक **प्रकारबद्ध रूटिंग-परिणाम इव्हेंट + सिंक अॅब्स्ट्रॅक्शन** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` हे कॉम्बो-व्याप्तीपुरते आणि फक्त इन-मेमरी आहे;
   `comboMetrics` हे संचयी काउंटर आहेत; `call_logs` हे कच्चे असिंक्रोनस पर्सिस्टन्स आहे.
   यापैकी कोणतेही असे प्रकारबद्ध, सिंक-आधारित परिणाम चॅनेल नाही ज्याची गुणवत्ता ट्रॅकर, OTel
   एक्सपोर्टर किंवा Future-AGI-शैलीतील मूल्यमापक सदस्यता घेऊ शकेल.
2. आउटपुट गुणवत्तेसाठी एक **ऑनलाइन गुणवत्ता संकेत** (EWMA) — यापूर्वी स्कोअरर
   "गुणवत्तेचे" अप्रत्यक्ष मापन केवळ स्थिर कार्य-योग्यता आणि ऑप्ट-इन मूल्यमापन उत्तीर्ण-दरांद्वारे करत होता.
3. GenAI सिमॅंटिक कन्व्हेन्शन्स वापरणारा **पर्यायी, अवलंबित्व-मुक्त OTel एक्सपोर्टर**.
4. वास्तविक रूटिंग निर्णय + गुणवत्ता स्थिती परत करणारा **स्पष्टीकरणक्षमता एंडपॉइंट**.

## 2. राउटिंग इव्हेंट्स (फीडबॅकचा पाया)

फाइल्स: `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent` मध्ये केवळ राउटिंग मेटाडेटा असतो:

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
  outcome: RoutingOutcome; // अनुमत-सूचीतील युनियन
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` हा TypeScript मधील `Send+Sync`-शैलीचा ट्रेट आहे:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // O(1) असणे आवश्यक, समकालिक I/O नाही
}
```

हॉट पाथ प्रत्येक पूर्ण झालेल्या विनंतीसाठी एकदा `emitRoutingEvent(event)` कॉल करतो
(स्ट्रीमिंग-पूर्णत्व कॉलबॅक, नॉन-स्ट्रीमिंग यशस्वी पाथ आणि
`handleChatCore` मधील विकृत-200 अपयश पाथ). नोंदणीकृत सिंक्सकडे डिस्पॅच हा समकालिक
फॅन-आउट असतो, परंतु प्रत्येक सिंक केवळ रांगेत भर घालतो/इन-मेमरी स्थिती अपडेट करतो.
**हॉट पाथवर समकालिक डेटाबेस लेखन किंवा नेटवर्क I/O नाही.**

डीफॉल्ट सिंक्स:

- `MemoryRoutingEventStore` — एक्सप्लेन एंडपॉइंटसाठी मर्यादित (500) रिंग बफर,
  सर्वांत नवीन नोंदी आधी.
- `QualityTracker` ग्राहक — EWMA गुणवत्ता अंदाज अपडेट करतो.
- `OtlpHttpsEventSink` — पर्यायी; केवळ `OMNIROUTE_OTEL_ENDPOINT`
  (किंवा `OTEL_EXPORTER_OTLP_ENDPOINT`) सेट केलेले असताना सक्षम केला जातो.

### मोजलेला ओव्हरहेड (प्रामाणिक तुलना)

या वर्कस्टेशनवर `npm run bench:routing-events` (100k पुनरावृत्ती; प्रति-ऑपरेशन
पर्सेंटाइल्स `performance.now()` टाइमर रिझोल्यूशनपेक्षा कमी असल्यामुळे
सब-µs ऑपरेशन्स एकत्रित µs/op म्हणून मोजले आहेत):

| परिस्थिती                         | µs/op  | ops/s  |
| --------------------------------- | ------ | ------ |
| बेसलाइन (केवळ स्कोअरिंग)          | ~0.045 | ~22 M  |
| बेसलाइन + RoutingEvent (2 सिंक्स) | ~0.168 | ~5.9 M |
| बेसलाइन + इव्हेंट + OTel एनक्यू   | ~0.163 | ~6.1 M |
| समवर्ती (8 इंटरलीव्ह्ड बर्स्ट्स)  | ~0.18  | —      |

बेसलाइन स्कोअरिंगच्या तुलनेत इव्हेंट-डिस्पॅचमधील फरक ~0.12 µs/request आहे; OTel
सिंक केवळ एनक्यू करतो (O(1) बफर पुश), त्यामुळे मोजण्याजोगी कोणतीही भर पडत नाही.
हे आकडे मशीन-विशिष्ट आणि सापेक्ष आहेत — उत्पादन वातावरणाची हमी नाही. v1 मधील
"~0.2 µs" हा आकडा एकत्रित अंदाज होता; ही पद्धत स्कोअरिंग बेसलाइनला
इव्हेंट-डिस्पॅच खर्चापासून वेगळे करते.

## 3. गुणवत्ता संकेत (फीडबॅक-चालित प्रोव्हायडर स्थिती)

फाइल्स: `open-sse/services/routing/quality.ts`

v2 मध्ये **ऑपरेशनल** गुणवत्ता **सिमॅंटिक** गुणवत्तेपासून वेगळी केली आहे:

- **ऑपरेशनल** — राउटिंग हॉट पाथवरून प्राप्त केलेली (HTTP 4xx/5xx, कनेक्शन
  अपयश, 429s, विकृत प्रतिसाद, स्ट्रीम व्यत्यय, `finish_reason=length`,
  शून्य-आउटपुट यश, लेटन्सी/TTFT EWMA). 200 ला सिमॅंटिक गुणवत्ता मानले जात
  **नाही**.
- **सिमॅंटिक** — जनरेट केलेल्या आउटपुटचे प्रत्यक्ष मूल्य. ते केवळ
  `setSemanticQuality()` द्वारे एव्हॅल्युएटरकडूनच निर्माण केले जाते. एव्हॅल्युएटर
  मूल्य देईपर्यंत ते `null` असते आणि ऑपरेशनल स्कोअरमध्ये कधीही मिसळत नाही.

प्रत्येक (प्रोव्हायडर, मॉडेल) स्थिती (EWMA + मर्यादित काउंटर्स):

- `successEwma` — परिणामाच्या यशाचा EWMA (α=0.2).
- `latencyEwma` / `ttftEwma` — लेटन्सीचा EWMA (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — मॉडेलचे शेवटचे निरीक्षण किती अलीकडे झाले.

### कॉन्फिडन्स / नमुना-जागरूकता

`confidence = clamp01(samples / 50)`, आणि स्कोअररला परत केला जाणारा स्कोअर
तटस्थ मध्यबिंदूकडे मिश्रित केला जातो:

```
score = 0.5 + confidence * (operational - 0.5)
```

परिणाम (चाचण्यांद्वारे सत्यापित):

- कोल्ड प्रोव्हायडरला (0 नमुने) **0.5** स्कोअर मिळतो — त्याला अन्यायकारक दंड
  होत नाही, पण हजारो ठोस निरीक्षणे असलेल्या प्रोव्हायडरवर तो वर्चस्वही गाजवू
  शकत नाही.
- योगायोगाने 7 यश मिळालेल्या प्रोव्हायडरचा स्कोअर 0.5 कडे खेचला जातो
  (आशावादी प्रारंभीकरणामुळे तो कधीही वर्चस्व गाजवत नाही).
- 50+ नमुने असलेला प्रोव्हायडर त्याच्या वास्तविक ऑपरेशनल स्कोअरकडे अभिसरित
  होतो.
- अवनती आणि पुनर्प्राप्ती हळूहळू होतात (EWMA), आणि एखादे वेगळे अपयश निरोगी
  प्रोव्हायडरला उद्ध्वस्त करत नाही.

`ProviderQuality` हे `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }` उघड करते.

हे `quality` स्कोअरिंग घटक म्हणून ऑटो-कॉम्बो स्कोअररला पुरवले जाते:

- `open-sse/services/autoCombo/scoring.ts` मधील `ScoringFactors.quality` /
  `ScoringWeights.quality`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. बेरीज 1.0 राहते.
- `buildAutoCandidates`, ट्रॅकरमधून `candidate.quality` भरते; डेटा नसलेले
  उमेदवार डीफॉल्टनुसार तटस्थ **0.5** वर असतात (कोल्ड उमेदवाराला ना बूस्ट केले
  जाते ना दंडित).

बंद लूप:

```
RoutingEvent → QualityTracker → getQualityScore → ऑटो-कॉम्बो गुणवत्ता घटक
      ↑                                                    │
      └────── विनंतीचा परिणाम (handleChatCore) ←──────────┘
```

### कठोर वगळणे विरुद्ध सौम्य दंड

गुणवत्ता संकेत हा केवळ एक **सौम्य अनुकूली प्राधान्य** आहे. कठोर वगळणे विद्यमान
रेझिलियन्स स्टॅककडेच राहते: सर्किट ब्रेकर OPEN, कोटा संपलेला, प्रमाणीकरण अपयश,
मॉडेल लॉकआउट — यांपैकी कशावरही गुणवत्ता स्कोअरचा परिणाम होत नाही. ज्या
प्रोव्हायडरचा गुणवत्ता स्कोअर तात्पुरता घसरतो त्याचे प्राधान्य कमी केले जाते;
त्याला कधीही कठोरपणे अक्षम केले जात नाही.

## 3b. कॅनॉनिकल स्ट्रीम टाइमिंग (TTFT / ITL)

फाइल्स: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` हा स्ट्रीमिंग मार्गासाठीचा एकमेव इन्स्ट्रुमेंटेशन सीम आहे,
जो `createSSEStream` (`open-sse/utils/stream.ts`) मध्ये जोडलेला आहे:

- `markByte()` — पहिला अपस्ट्रीम चंक प्राप्त झाला.
- `markForward()` — क्लायंटकडे फॉरवर्ड केलेला पहिला चंक (TTFT साठी वापरला जातो).
- `markInterrupted()` — स्वच्छरीत्या पूर्ण होण्यापूर्वी स्ट्रीम टाइमआउट/रद्द/त्रुटी.
- `ttft()` = फॉरवर्ड केलेल्या पहिल्या SSE चंकची विलंबता. **हा टोकन-स्तरीय TTFT नाही** —
  एका SSE चंकमध्ये शून्य/एक/अनेक टोकन असू शकतात. याचे अचूक दस्तऐवजीकरण केले आहे.
- `avgItlMs()` = चंकमधील सरासरी अंतर (ITL साठी चंक-विलंबता प्रॉक्सी).

TTFT/ITL/व्यत्ययाची माहिती `RoutingEvent` (`ttftMs`, `itlMs`) मध्ये जाते आणि
OTel सिंकद्वारे GenAI/OmniRoute स्पॅन अॅट्रिब्यूट्स म्हणून एक्सपोर्ट केली जाते.

## 4. OpenTelemetry / GenAI निरीक्षणक्षमता

फाइल्स: `open-sse/services/routing/otel.ts`

- अवलंबित्व-मुक्त OTLP/HTTP JSON एक्सपोर्टर (ग्लोबल `fetch` वापरतो,
  `@opentelemetry/*` SDK नाही).
- स्पॅन्स GenAI सिमॅंटिक कन्व्हेन्शन्स (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) तसेच OmniRoute राउटिंग
  अॅट्रिब्यूट्स (निकाल, स्थिती, ttft, पुनर्प्रयत्न, फॉलबॅक) यांचे पालन करतात.
- `record()` केवळ मर्यादित बफरमध्ये नोंद जोडते (O(1)); पार्श्वभूमीतील टाइमर
  `POST {endpoint}/v1/traces` द्वारे असिंक्रोनसरीत्या फ्लश करतो. अतिभाराच्या वेळी
  सर्वांत जुन्या इव्हेंट्स वगळल्या जातात (`dropped` काउंटर) — डेटा प्लेनवर कधीही
  बॅकप्रेशर लागू केले जात नाही.
- **कॉन्फिगर केले नसल्यास अक्षम असते.** `OMNIROUTE_OTEL_ENDPOINT` (किंवा
  `OTEL_EXPORTER_OTLP_ENDPOINT`) सेट करणे आवश्यक आहे; अन्यथा सिंकची नोंदणी
  केली जात नाही आणि कोणताही OTel कोड चालत नाही.

## 5. स्पष्टीकरणक्षमता

- `GET /v1/explain/routing` अलीकडील `RoutingEvent`s (प्रत्यक्ष निर्णय, सर्वांत नवीन
  प्रथम) आणि प्रत्येक प्रोव्हायडर/मॉडेलचा गुणवत्ता स्नॅपशॉट परत करते.
- प्रमाणीकरण `/v1/combos` प्रमाणेच आहे (Bearer API की किंवा डॅशबोर्ड सेशन;
  `REQUIRE_API_KEY=false` असलेल्या एकल-वापरकर्ता स्थानिक डिप्लॉयमेंटवर अनामिक प्रवेश).
- प्रत्येक इन्व्होकेशनचे कॉम्बो-स्तरीय ट्रेसेस विद्यमान `decisionTrace.ts`
  (हेडर `X-OmniRoute-Combo-Trace`) द्वारे उपलब्ध राहतात.
- सुरक्षितता: इव्हेंट्समध्ये केवळ राउटिंग मेटाडेटा असतो; प्रॉम्प्ट्स/बॉडीज/क्रेडेन्शियल्स
  कधीही नसतात.

## 6. मूल्यमापन-प्लेन एकत्रीकरण (Future AGI सज्जता)

OmniRoute हे Future AGI (किंवा कोणतेही मूल्यमापक) **संभाव्य
इंटेलिजन्स/मूल्यमापन बॅकएंड मानते, अवलंबित्व नाही**. एकत्रीकरणाचे सीम:

- `RoutingEventSink` इव्हेंट्स असिंक्रोनसरीत्या मूल्यमापकाकडे फॉरवर्ड करू शकते.
- `MemoryRoutingEventStore` + गुणवत्ता स्नॅपशॉट मूल्यमापकाला कच्चा
  निर्णय प्रवाह देतात.
- भविष्यातील `Evaluator` (निर्धारक, स्थानिक जज, HTTP, WASM) इव्हेंट्स/ट्रेसेस
  वापरेल आणि त्याच `getQualityScore`/गुणवत्ता-घटक मार्गाला पुरवला जाणारा
  `QualityScore` परत करेल.
- विद्यमान मूल्यमापन-चालित राउटिंग (`open-sse/services/evalRouting.ts`) सक्षम
  असताना `eval_runs` पास-दरांनुसार कॉम्बो लक्ष्यांचा क्रम आधीच बदलते.

विनंती मार्गावर कोणतेही मूल्यमापन सिंक्रोनसरीत्या चालत नाही आणि मूल्यमापक
अनुपस्थित असतानाही गेटवे पूर्णपणे कार्यरत राहतो.

## 7. अंतिम आर्किटेक्चरल पुनरावलोकन

1. **सिंक्रोनस हॉट पाथवर काय उरते?** राउटिंग/स्कोअरिंग, गार्डरेल
   पूर्व-तपासण्या, कॅश लुकअप आणि इन-मेमरी सिंक्ससाठी एक `emitRoutingEvent`
   फॅन-आउट (बेसलाइन स्कोअरिंगपेक्षा ~0.12 µs अधिक).
2. **असिंक्रोनस प्रक्रियेकडे काय हलवले गेले?** OTel एक्सपोर्ट (टाइमर + fetch),
   `call_logs`/वापर सातत्यपूर्ण संचयन, सिमॅंटिक-कॅश लेखन; गुणवत्ता इन-मेमरी
   आणि O(1) आहे (असिंक्रोनस प्रक्रियेची गरज नाही).
3. **राउटिंगचा निकाल फीडबॅक कसा बनतो?** `handleChatCore` एक
   `RoutingEvent` उत्सर्जित करते → `QualityTracker` EWMA स्थिती अपडेट करते →
   `getQualityScore` ऑटो-कॉम्बो `quality` घटकाला मूल्य पुरवते.
4. **गुणवत्ता भविष्यातील राउटिंगवर कसा प्रभाव टाकते?** कमी गुणवत्ता स्कोअर
   `scoreAutoTargets` मधील त्या प्रोव्हायडर/मॉडेलचा भारित स्कोअर कमी करते,
   त्यामुळे खालावलेल्या मॉडेल्सना हळूहळू कमी प्राधान्य दिले जाते आणि त्यांचा
   EWMA सुधारत गेल्यावर ते पूर्ववत होतात.
5. **अवलंबित्व न बनता Future AGI कसे एकत्रित होऊ शकते?**
   `RoutingEventSink` इंटरफेस / भविष्यातील `Evaluator` अॅडॅप्टरद्वारे —
   कोणतेही हार्डकोड केलेले अवलंबित्व नाही.
6. **मूल्यमापक अनुपलब्ध असल्यास काय होते?** राउटिंगवर परिणाम होत नाही;
   कोणताही निरीक्षित सिग्नल नसलेल्या मॉडेल्ससाठी गुणवत्ता तटस्थ (1.0) मूल्यावर
   परत येते.
7. **टेलिमेट्री अनुपलब्ध असल्यास काय होते?** OTel सिंकची नोंदणी केली जात नाही;
   राउटिंग स्तराचा उर्वरित भाग कोणत्याही बदलाशिवाय चालतो.
8. **अतिभाराच्या वेळी काय होते?** OTel बफर सर्वांत जुन्या इव्हेंट्स वगळतो;
   गुणवत्ता आणि रिंग बफर रचनेनुसार मर्यादित आहेत; कोणतेही बॅकप्रेशर नाही.
9. **अधोगतीनंतर प्रोव्हायडरची स्थिती कशी पूर्ववत होते?** यशस्वी परिणाम जमा
   होत असताना EWMA पुन्हा अभिसरित होतो; वॉर्मअपमुळे नवीन मॉडेल्स तटस्थ राहतात;
   सर्किट ब्रेकर स्वतंत्रपणे HALF_OPEN प्रोब्सद्वारे पूर्ववत होतो.
10. **कोणती प्रस्तावित वैशिष्ट्ये जाणीवपूर्वक अंमलात आणली नाहीत आणि का?**
    - शॅडो ट्रॅफिक / प्रयोग — आधीच अंमलात आणले आहेत
      (`combo/shadowRouting.ts`); पुन्हा तयार केले नाहीत.
    - गार्डरेल्स — आधीच अंमलात आणले आहेत (`src/lib/guardrails/`); डुप्लिकेट
      केले नाहीत.
    - सिमॅंटिक कॅश — आधीच अंमलात आणली आहे (`src/lib/semanticCache.ts`);
      डुप्लिकेट केली नाही.
    - संपूर्ण प्रयोग-व्यवस्थापन प्लॅटफॉर्म, डेटासेट टूलिंग, प्रॉम्प्ट-ऑप्टिमायझेशन
      प्लॅटफॉर्म, व्हेक्टर DB किंवा अनिवार्य बाह्य OTel इन्फ्रास्ट्रक्चर — कार्यक्षम
      डेटा प्लेनच्या व्याप्तीबाहेर आहेत.
    - Rust `RoutingEvent` स्ट्रक्ट — डेटा प्लेन TypeScript मध्ये आहे; TS प्रकार
      हा त्याचा अनुकूलित समतुल्य प्रकार आहे.

## 8. कॉन्फिगरेशन संदर्भ

| व्हेरिएबल                     | डीफॉल्ट         | परिणाम                                                                                |
| ----------------------------- | --------------- | ------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | सेट केलेले नाही | सेट केल्यावर, OTLP/HTTP ट्रेसेस एक्सपोर्टर सक्षम होतो (उदा. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | सेट केलेले नाही | OTLP एंडपॉइंटसाठी फॉलबॅक उपनाम.                                                       |
| `OTEL_SERVICE_NAME`           | `omniroute`     | `service.name` रिसोर्स अॅट्रिब्यूट.                                                   |

## 9. चाचण्या

- `tests/unit/routing-events.test.ts` — इव्हेंट सामान्यीकरण, स्थिती
  वर्गीकरण, मर्यादित रिंग बफर, सिंक फॅन-आउट + विलगीकरण.
- `tests/unit/routing-quality.test.ts` — EWMA वॉर्मअप, अपयश/यश पुनर्प्राप्ती,
  विसंगती दंड, 429 तात्पुरती हाताळणी, स्नॅपशॉट, रीसेट.
- `tests/unit/routing-scoring-quality.test.ts` — वेट अखंडता, तटस्थ
  डीफॉल्ट, गुणवत्ता-घटक क्रमवारी.
- `tests/unit/routing-otel.test.ts` — सक्षमकरण गेटिंग, GenAI स्पॅन पेलोड, असिंक्रोनस
  फ्लश, ओव्हरलोडमध्ये ड्रॉप.
- `tests/unit/routing-events-concurrency.test.ts` — हजारो इव्हेंट, रिंग
  बफरची मर्यादितता, अपवाद फेकणाऱ्या सिंकचे विलगीकरण, आंतरमिश्रित असिंक्रोनस बर्स्ट,
  इन्सर्टदरम्यान रीसेट.
- `tests/unit/routing-adaptive-e2e.test.ts` — वास्तविक
  `scoreAutoTargets` स्कोअररद्वारे निर्धारक एंड-टू-एंड लूप: निरोगी → ऱ्हास → पुनर्प्राप्ती → क्षणिक बिघाड, तसेच
  कोल्ड-स्टार्ट आणि अनपेक्षितरीत्या यशस्वी कोल्ड-प्रोव्हायडर परिस्थिती.
- `tests/unit/stream-timing.test.ts` — TTFT (प्रथम-फॉरवर्ड केलेला-चंक), ITL,
  पहिला-बाइट विरुद्ध पहिले-फॉरवर्डिंग, व्यत्यय, विकृत/रिकाम्या चंकची सुरक्षितता.

## 10. आधीपासून अस्तित्वात असलेल्या समस्यांची स्थिती (टप्पा 18)

| समस्या                                               | स्थिती                          | टिपा                                                                                                                                                                                                                                                                                         |
| ---------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniglyph` एक्सपोर्ट विसंगती                        | **निराकरण केले (पर्यावरणीय)**   | `node_modules`, `package-lock.json` शी समक्रमित नव्हते (इन्स्टॉल केलेली आवृत्ती 1.3.1 विरुद्ध लॉक केलेली 1.4.0). `npm install omniglyph@1.4.0` चालवल्याने लॉक केलेली आवृत्ती पुनर्स्थापित झाली; टाइप त्रुटी 0 पर्यंत कमी झाल्या. मॅनिफेस्टमध्ये बदल नाही.                                    |
| कालबाह्य `getKnownContextOverflow` चाचण्या           | **ज्ञात — निराकरण केलेले नाही** | `combo-context-overflow-compression-probe.test.ts`, `open-sse/services/combo.ts` मध्ये आता अस्तित्वात नसलेले फंक्शन इम्पोर्ट करते (फक्त टिप्पण्यांमध्ये त्याचा संदर्भ आहे). निराकरणासाठी त्या चाचण्या पुन्हा अंमलात आणणे किंवा पुन्हा लिहिणे आवश्यक आहे — हा असंबंधित आर्किटेक्चरल बदल ठरेल. |
| `combo-runtime-unit-concurrency.test.ts` DB विलगीकरण | **ज्ञात — निराकरण केलेले नाही** | थेट चालवल्यावर टेस्ट-हार्नेस SQLite-विलगीकरण असेर्शन अयशस्वी होते; बेस ब्रँचवरही ते याच प्रकारे अयशस्वी होते.                                                                                                                                                                                |
| i18n `llm.txt` विचलन                                 | **ज्ञात — निराकरण केलेले नाही** | `docs/i18n/*/llm.txt` रूटपेक्षा भिन्न आहेत; ही आधीपासून अस्तित्वात असलेली समस्या असून ती दस्तऐवज-समक्रमण प्री-कमिट गेट अवरोधित करते.                                                                                                                                                         |

पर्यावरणीय आणि कोडशी संबंधित समस्या वेगळ्या ठेवल्या आहेत; बदललेल्या चाचणी फिल्टर्समागे
कोणतीही असंबंधित अपयशे लपवलेली नाहीत.
