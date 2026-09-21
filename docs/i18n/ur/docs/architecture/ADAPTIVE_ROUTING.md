# Adaptive Routing: Routing Events, Quality Feedback & Explainability (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

یہ دستاویز OmniRoute میں شامل کی گئی فیڈبیک سے چلنے والی موافق روٹنگ کی بنیاد بیان کرتی ہے۔
یہ جان بوجھ کر مختصر رکھی گئی ہے: یہ ایک ٹائپ شدہ روٹنگ-نتیجہ
چینل، ایک آن لائن معیار سگنل جو موجودہ auto-combo اسکورر کو فیڈ کرتا ہے، ایک
اختیاری OpenTelemetry ایکسپورٹر، اور ایک قابلِ توضیح endpoint متعارف کراتی ہے۔ یہ موجودہ
لچک پذیری کے مجموعے (circuit breaker، connection cooldown،
model lockout، health matrix، autopilot) کو تبدیل **نہیں** کرتی — بلکہ اس کی تکمیل کرتی ہے۔

## 1. معماری سیاق و سباق

OmniRoute ایک ڈیٹا پلین ہے جس میں ایک **درخواست کا ہاٹ پاتھ** اور ایک **کنٹرول/انٹیلیجنس
پلین** ہے۔ ہاٹ پاتھ کو تیز، میموری کے مؤثر استعمال کا حامل، غیر ہم وقت، لچک پذیر اور
قابلِ پیش گوئی رہنا چاہیے۔ جانچ، معیار کی اسکورنگ، تجربات اور تاریخی تجزیہ
کنٹرول پلین سے تعلق رکھتے ہیں۔

```
AI ایجنٹ / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   ڈیٹا پلین (تیز، ہم وقت، اِن میموری)
│  روٹنگ / فیل اوور   │
│  صحت / حفاظتی حد    │
│  کیش / اسٹریمنگ     │
└──────────┬──────────┘
           │ RoutingEvent (فائر اینڈ فارگیٹ، ~0.2µs)
           ▼
┌─────────────────────┐
│  فیڈبیک سنکس        │   کنٹرول پلین (غیر ہم وقت، بہترین کوشش)
│  معیار ٹریکر        │
│  OTel ایکسپورٹر     │
│  وضاحت اسٹور        │
└──────────┬──────────┘
           ▼  معیار اسکور
      auto-combo اسکورر
```

### جو پہلے سے موجود تھا (آڈٹ شدہ، نقل نہیں کیا گیا)

| تصور                                  | موجودہ نفاذ                                                                                        |
| ------------------------------------- | -------------------------------------------------------------------------------------------------- |
| دستیابی (کیا ہم ٹریفک بھیج سکتے ہیں؟) | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN، DB میں محفوظ)، connection cooldown، model lockout |
| صحت کی رپورٹنگ                        | `providerHealthMatrix.ts`، `providerHealthAutopilot.ts`                                            |
| شیڈو ٹریفک                            | `open-sse/services/combo/shadowRouting.ts`                                                         |
| حفاظتی حدود                           | `src/lib/guardrails/` (پری/پوسٹ ہکس)                                                               |
| عین کیش                               | `src/lib/semanticCache.ts` (دستخط پر مبنی)                                                         |
| جائزہ کار / جائزہ سے چلنے والی روٹنگ  | `src/lib/evals/`، `open-sse/services/evalRouting.ts`                                               |
| Combo فیصلے کی قابلِ توضیحیت          | `open-sse/services/combo/decisionTrace.ts`                                                         |
| ڈیش بورڈ کے حقیقی وقت کے واقعات       | `src/lib/events/eventBus.ts` (UI اطلاعاتی چینل، `unknown` پے لوڈز، 100 اندراجات کی تاریخ)          |

روٹنگ-ایونٹ پرت `eventBus` کا دوبارہ نفاذ **نہیں** ہے: وہ بس
ڈیش بورڈ کا حقیقی وقت کا اطلاعاتی چینل ہے (ٹائپ شدہ _ایونٹ نام_، مبہم
پے لوڈز، UI صارفین)۔ `RoutingEvent` ایک ٹائپ شدہ _نتیجہ_ اسٹرکٹ
(تاخیر/ٹوکنز/لاگت/نتیجہ/اختتامی-وجہ) ہے، جسے کنٹرول پلین کے
فیڈبیک سنکس (معیار ٹریکر، OTel ایکسپورٹر، وضاحت اسٹور) استعمال کرتے ہیں۔

### جو موجود نہیں تھا (یہاں شامل کیا گیا)

1. ایک **ٹائپ شدہ روٹنگ-نتیجہ ایونٹ + سنک تجرید** (`RoutingEvent` /
   `RoutingEventSink`)۔ `decisionTrace` صرف combo تک محدود اور صرف اِن میموری ہے؛
   `comboMetrics` مجموعی شمارندے ہیں؛ `call_logs` خام غیر ہم وقت مستقل ذخیرہ ہے۔
   ان میں سے کوئی بھی ایسا ٹائپ شدہ، سنک پر مبنی نتیجہ چینل نہیں ہے جسے معیار ٹریکر، OTel
   ایکسپورٹر، یا Future-AGI طرز کا جائزہ کار سبسکرائب کر سکے۔
2. آؤٹ پٹ معیار کے لیے ایک **آن لائن معیار سگنل** (EWMA) — اسکورر اس سے پہلے
   "معیار" کی نمائندگی صرف جامد ٹاسک موزونیت اور اختیاری جائزہ پاس شرحوں کے ذریعے کرتا تھا۔
3. GenAI معنوی اصولوں کو استعمال کرنے والا ایک **اختیاری، انحصار سے پاک OTel ایکسپورٹر**۔
4. حقیقی روٹنگ فیصلے + معیار کی حالت واپس کرنے والا ایک **قابلِ توضیح endpoint**۔

## 2. روٹنگ ایونٹس (فیڈبیک کی بنیاد)

فائلیں: `open-sse/services/routing/events.ts`، `.../index.ts`

ایک `RoutingEvent` صرف روٹنگ میٹا ڈیٹا رکھتا ہے:

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
  outcome: RoutingOutcome; // اجازت یافتہ یونین
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink`، TypeScript میں ایک `Send+Sync` طرز کا ٹریٹ ہے:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // لازماً O(1) ہو، کوئی ہم وقت I/O نہ ہو
}
```

ہاٹ پاتھ ہر مکمل شدہ درخواست پر ایک بار `emitRoutingEvent(event)` کو کال کرتا ہے
(اسٹریمنگ تکمیل کا کال بیک، نان اسٹریمنگ کامیابی کا راستہ، اور
`handleChatCore` میں ناقص ساخت والی 200 ناکامی کا راستہ)۔ ڈسپیچ رجسٹرڈ سِنکس
تک ہم وقت fan-out ہے، مگر ہر سِنک صرف قطار میں شامل کرتا یا اِن میموری حالت
اپ ڈیٹ کرتا ہے۔ **ہاٹ پاتھ پر کوئی ہم وقت ڈیٹا بیس رائٹس نہیں، اور کوئی نیٹ ورک
I/O نہیں۔**

ڈیفالٹ سِنکس:

- `MemoryRoutingEventStore` — محدود (500) رِنگ بفر، جدید ترین پہلے، explain
  اینڈ پوائنٹ کے لیے۔
- `QualityTracker` کنزیومر — EWMA معیار کے تخمینے کو اپ ڈیٹ کرتا ہے۔
- `OtlpHttpsEventSink` — اختیاری، صرف تب فعال ہوتا ہے جب
  `OMNIROUTE_OTEL_ENDPOINT` (یا `OTEL_EXPORTER_OTLP_ENDPOINT`) سیٹ ہو۔

### ناپا گیا اوورہیڈ (دیانت دارانہ موازنہ)

اس ورک اسٹیشن پر `npm run bench:routing-events` (100k iterations؛ sub-µs
آپریشنز کو مجموعی µs/op کے طور پر ناپا گیا کیونکہ فی آپریشن صدکیے
`performance.now()` ٹائمر کی ریزولوشن سے کم ہیں):

| منظرنامہ                                | µs/op  | ops/s  |
| --------------------------------------- | ------ | ------ |
| بیس لائن (صرف اسکورنگ)                  | ~0.045 | ~22 M  |
| بیس لائن + RoutingEvent (2 سِنکس)       | ~0.168 | ~5.9 M |
| بیس لائن + ایونٹ + OTel قطار میں شمولیت | ~0.163 | ~6.1 M |
| ہم عصر (8 باہم ملی ہوئی برسٹس)          | ~0.18  | —      |

بیس لائن اسکورنگ کے مقابلے میں ایونٹ ڈسپیچ کا فرق ~0.12 µs/request ہے؛ OTel سِنک
صرف قطار میں شامل کرتا ہے (O(1) بفر push)، اس لیے کوئی قابل پیمائش اضافہ نہیں
کرتا۔ یہ اعداد مشین کے لحاظ سے مخصوص اور نسبتی ہیں — یہ پروڈکشن کی ضمانت نہیں۔
v1 کا "~0.2 µs" عدد ایک مجموعی تخمینہ تھا؛ یہ طریقۂ کار اسکورنگ بیس لائن کو
ایونٹ ڈسپیچ کی لاگت سے الگ کرتا ہے۔

## 3. معیار کا سگنل (فیڈبیک سے چلنے والی پرووائیڈر حالت)

فائلیں: `open-sse/services/routing/quality.ts`

v2 **آپریشنل** معیار کو **معنوی** معیار سے الگ کرتا ہے:

- **آپریشنل** — روٹنگ ہاٹ پاتھ سے اخذ کردہ (HTTP 4xx/5xx، کنکشن
  ناکامیاں، 429s، ناقص ساخت والے جوابات، اسٹریم میں تعطل، `finish_reason=length`،
  صفر آؤٹ پٹ کامیابیاں، latency/TTFT EWMA)۔ 200 کو معنوی معیار نہیں سمجھا
  جاتا۔
- **معنوی** — تیار کردہ آؤٹ پٹ کی حقیقی قدر۔ یہ صرف ایک evaluator کے ذریعے
  `setSemanticQuality()` سے ہی پیدا ہوتی ہے۔ جب تک کوئی evaluator اسے فراہم نہ
  کرے، یہ `null` رہتی ہے اور کبھی آپریشنل اسکور میں شامل نہیں ہوتی۔

فی-(provider, model) حالت (EWMA + محدود کاؤنٹرز):

- `successEwma` — نتیجے کی کامیابی کا EWMA (α=0.2)۔
- `latencyEwma` / `ttftEwma` — latency کا EWMA (α=0.1)۔
- `samples`، `anomalies`، `rateLimited`، `semantic`، `semanticConfidence`۔
- `recencyMs` — ماڈل کو آخری بار کتنی دیر پہلے دیکھا گیا تھا۔

### اعتماد / نمونوں سے آگاہی

`confidence = clamp01(samples / 50)`، اور اسکورر کو لوٹایا جانے والا اسکور
غیر جانب دار وسطی نقطے کی طرف آمیزش کے ساتھ لایا جاتا ہے:

```
score = 0.5 + confidence * (operational - 0.5)
```

نتائج (ٹیسٹس سے تصدیق شدہ):

- ایک کولڈ پرووائیڈر (0 samples) کا اسکور **0.5** ہوتا ہے — اسے غیر منصفانہ طور
  پر جرمانہ نہیں کیا جاتا، مگر یہ ہزاروں مضبوط مشاہدات رکھنے والے پرووائیڈر پر
  غالب بھی نہیں آ سکتا۔
- 7 اتفاقی کامیابیوں والے پرووائیڈر کو 0.5 کی طرف کھینچا جاتا ہے (یہ خوش بین
  ابتدائی قدر کی وجہ سے کبھی غالب نہیں آتا)۔
- 50+ samples والا پرووائیڈر اپنے حقیقی آپریشنل اسکور کی طرف مرتکز ہو جاتا ہے۔
- تنزلی اور بحالی بتدریج ہوتی ہیں (EWMA)، اور ایک الگ تھلگ ناکامی کسی صحت مند
  پرووائیڈر کو تباہ نہیں کرتی۔

`ProviderQuality`، `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }` فراہم کرتا ہے۔

یہ auto-combo اسکورر کو `quality` اسکورنگ فیکٹر کے طور پر فیڈ کرتا ہے:

- `open-sse/services/autoCombo/scoring.ts` میں `ScoringFactors.quality` /
  `ScoringWeights.quality`۔
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605، `quality` 0.03۔ مجموعہ 1.0 رہتا ہے۔
- `buildAutoCandidates`، ٹریکر سے `candidate.quality` کو پُر کرتا ہے؛ ڈیٹا کے بغیر
  امیدواروں کی ڈیفالٹ قدر غیر جانب دار **0.5** ہوتی ہے (کولڈ امیدوار کو نہ تقویت
  دی جاتی ہے، نہ جرمانہ کیا جاتا ہے)۔

بند چکر:

```
RoutingEvent → QualityTracker → getQualityScore → auto-combo معیار کا فیکٹر
      ↑                                                    │
      └────── درخواست کا نتیجہ (handleChatCore) ←────────────┘
```

### سخت اخراج بمقابلہ نرم جرمانہ

معیار کا سگنل صرف ایک **نرم موافق ترجیح** ہے۔ سخت اخراج موجودہ resilience
اسٹیک کے پاس ہی رہتا ہے: circuit breaker OPEN، quota exhausted،
auth failure، model lockout — ان میں سے کوئی بھی معیار کے اسکور سے متاثر نہیں
ہوتا۔ جس پرووائیڈر کا معیار اسکور عارضی طور پر گرتا ہے، اس کی ترجیح کم کی جاتی
ہے، اسے کبھی مکمل طور پر غیر فعال نہیں کیا جاتا۔

## 3b. معیاری اسٹریم ٹائمنگ (TTFT / ITL)

فائلیں: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` اسٹریمنگ پاتھ کے لیے واحد instrumentation seam ہے،
جسے `createSSEStream` (`open-sse/utils/stream.ts`) میں منسلک کیا گیا ہے:

- `markByte()` — پہلا upstream چنک موصول ہوا۔
- `markForward()` — کلائنٹ کو فارورڈ کیا گیا پہلا چنک (TTFT کے لیے استعمال ہوتا ہے)۔
- `markInterrupted()` — صاف اختتام سے پہلے اسٹریم timeout/abort/error۔
- `ttft()` = پہلے فارورڈ کیے گئے SSE چنک کی latency۔ **یہ token-level TTFT نہیں ہے** —
  ایک SSE چنک میں صفر/ایک/متعدد tokens ہو سکتے ہیں۔ اس کی بالکل درست دستاویز بندی کی گئی ہے۔
- `avgItlMs()` = چنکس کے درمیان اوسط وقفہ (ITL کے لیے chunk-latency proxy)۔

TTFT/ITL/interrupted، `RoutingEvent` (`ttftMs`, `itlMs`) میں شامل ہوتے ہیں اور
OTel sink کے ذریعے GenAI/OmniRoute span attributes کے طور پر export کیے جاتے ہیں۔

## 4. OpenTelemetry / GenAI مشاہدہ پذیری

فائلیں: `open-sse/services/routing/otel.ts`

- dependency سے آزاد OTLP/HTTP JSON exporter (global `fetch` استعمال کرتا ہے،
  کوئی `@opentelemetry/*` SDK نہیں)۔
- Spans، GenAI semantic conventions (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) کے ساتھ OmniRoute routing
  attributes (outcome، status، ttft، retries، fallback) کی پیروی کرتے ہیں۔
- `record()` صرف ایک محدود buffer میں enqueue کرتا ہے (O(1))؛ ایک پسِ منظر timer
  غیر ہم وقت طور پر `POST {endpoint}/v1/traces` کے ذریعے flush کرتا ہے۔ overload کی
  صورت میں قدیم ترین events خارج کر دیے جاتے ہیں (`dropped` counter) — data
  plane پر کبھی backpressure نہیں ڈالا جاتا۔
- **ترتیب دیے بغیر غیر فعال رہتا ہے۔** `OMNIROUTE_OTEL_ENDPOINT` (یا
  `OTEL_EXPORTER_OTLP_ENDPOINT`) کا متعین ہونا ضروری ہے؛ بصورتِ دیگر sink
  register نہیں ہوتا اور کوئی OTel code نہیں چلتا۔

## 5. وضاحت پذیری

- `GET /v1/explain/routing` حالیہ `RoutingEvent`s (حقیقی
  فیصلے، جدید ترین پہلے) اور فی provider/model معیار کا snapshot واپس کرتا ہے۔
- Auth، `/v1/combos` کے طرز پر ہے (Bearer API key یا dashboard session؛
  `REQUIRE_API_KEY=false` والی single-user local deployments پر anonymous رسائی)۔
- Combo-level فی invocation traces موجودہ `decisionTrace.ts` کے ذریعے دستیاب
  رہتے ہیں (header `X-OmniRoute-Combo-Trace`)۔
- حفاظت: events میں صرف routing metadata ہوتا ہے، کبھی prompts/bodies/credentials نہیں ہوتے۔

## 6. Evaluation-plane انضمام (مستقبل کی AGI تیاری)

OmniRoute، Future AGI (یا کسی بھی evaluator) کو ایک **ممکنہ
intelligence/evaluation backend سمجھتا ہے، dependency نہیں**۔ دستیاب seams یہ ہیں:

- ایک `RoutingEventSink` events کو غیر ہم وقت طور پر evaluator تک فارورڈ کر سکتا ہے۔
- `MemoryRoutingEventStore` + معیار کا snapshot، evaluator کو خام
  decision stream فراہم کرتے ہیں۔
- مستقبل کا ایک `Evaluator` (deterministic، local judge، HTTP، WASM)،
  events/traces استعمال کرے گا اور ایک `QualityScore` واپس کرے گا جو اسی
  `getQualityScore`/quality-factor پاتھ میں شامل ہوگا۔
- موجودہ eval-driven routing (`open-sse/services/evalRouting.ts`) فعال ہونے پر
  پہلے ہی `eval_runs` کی pass-rates کے مطابق combo targets کو دوبارہ ترتیب دیتی ہے۔

کوئی evaluation درخواست کے پاتھ پر ہم وقت طور پر نہیں چلتی، اور evaluator کی
عدم موجودگی میں بھی gateway مکمل طور پر کام کرتا ہے۔

## 7. حتمی معماری جائزہ

1. **ہم وقت hot path پر کیا باقی رہتا ہے؟** Routing/scoring، guardrail
   pre-checks، cache lookup، اور in-memory sinks کی طرف ایک `emitRoutingEvent`
   fan-out (baseline scoring کے مقابلے میں تقریباً 0.12 µs)۔
2. **کیا چیز غیر ہم وقت processing میں منتقل ہوئی؟** OTel export (timer + fetch)،
   `call_logs`/usage persistence، semantic-cache writes؛ quality in-memory
   اور O(1) ہے (async کی ضرورت نہیں)۔
3. **routing کا نتیجہ feedback کیسے بنتا ہے؟** `handleChatCore` ایک
   `RoutingEvent` خارج کرتا ہے → `QualityTracker`، EWMA state کو update کرتا ہے →
   `getQualityScore`، auto-combo کے `quality` factor کو معلومات فراہم کرتا ہے۔
4. **quality مستقبل کی routing پر کیسے اثر انداز ہوتی ہے؟** کم quality score،
   `scoreAutoTargets` میں اس provider/model کا weighted score کم کر دیتا ہے،
   اس طرح کمزور ہونے والے models کو بتدریج کم ترجیح ملتی ہے اور EWMA بہتر ہونے
   پر وہ بحال ہو جاتے ہیں۔
5. **Future AGI ایک dependency بنے بغیر کیسے ضم ہو سکتا ہے؟**
   `RoutingEventSink` interface / مستقبل کے `Evaluator` adapter کے ذریعے —
   کوئی hardcoded dependency نہیں۔
6. **evaluator دستیاب نہ ہو تو کیا ہوتا ہے؟** Routing متاثر نہیں ہوتی؛
   جن models کے لیے کوئی مشاہدہ شدہ signal نہیں ہوتا، ان کا quality غیر جانب دار
   قدر (1.0) پر واپس آ جاتا ہے۔
7. **telemetry دستیاب نہ ہو تو کیا ہوتا ہے؟** OTel sink کو صرف register
   نہیں کیا جاتا؛ routing layer کا باقی حصہ بغیر کسی تبدیلی کے چلتا رہتا ہے۔
8. **overload کی صورت میں کیا ہوتا ہے؟** OTel buffer قدیم ترین events خارج
   کر دیتا ہے؛ quality اور ring buffer ساختی طور پر محدود ہیں؛ کوئی backpressure نہیں۔
9. **تنزلی کے بعد provider state کیسے بحال ہوتی ہے؟** کامیابیاں جمع ہونے کے
   ساتھ EWMA دوبارہ converge کرتا ہے؛ warmup، cold models کو غیر جانب دار رکھتا ہے؛
   circuit breaker آزادانہ طور پر HALF_OPEN probes کے ذریعے بحال ہوتا ہے۔
10. **کون سی مجوزہ خصوصیات دانستہ طور پر نافذ نہیں کی گئیں، اور کیوں؟**
    - Shadow traffic / experiments — پہلے ہی نافذ ہیں
      (`combo/shadowRouting.ts`)؛ دوبارہ نہیں بنائے گئے۔
    - Guardrails — پہلے ہی نافذ ہیں (`src/lib/guardrails/`)؛ نقل نہیں بنائی گئی۔
    - Semantic cache — پہلے ہی نافذ ہے (`src/lib/semanticCache.ts`)؛ نقل
      نہیں بنائی گئی۔
    - ایک مکمل experiment-management platform، dataset tooling، prompt-optimization
      platform، vector DB، یا لازمی بیرونی OTel infrastructure — ایک مختصر اور
      مؤثر data plane کے دائرۂ کار سے باہر ہیں۔
    - Rust کا `RoutingEvent` struct — data plane، TypeScript میں ہے؛ TS type
      اس کا موافق مساوی ہے۔

## 8. کنفیگریشن کا حوالہ

| متغیر                         | طے شدہ قدر  | اثر                                                                                 |
| ----------------------------- | ----------- | ----------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | غیر متعین   | سیٹ ہونے پر OTLP/HTTP ٹریسز ایکسپورٹر فعال کرتا ہے (مثلاً `http://collector:4318`)۔ |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | غیر متعین   | OTLP اینڈ پوائنٹ کے لیے متبادل عرف۔                                                 |
| `OTEL_SERVICE_NAME`           | `omniroute` | `service.name` ریسورس وصف۔                                                          |

## 9. ٹیسٹس

- `tests/unit/routing-events.test.ts` — ایونٹ نارملائزیشن، اسٹیٹس
  کی درجہ بندی، محدود رنگ بفر، سنک فین آؤٹ + آئسولیشن۔
- `tests/unit/routing-quality.test.ts` — EWMA وارم اپ، ناکامی/کامیابی کے بعد بحالی،
  بے قاعدگی کی سزائیں، 429 کی عارضی ہینڈلنگ، اسنیپ شاٹ، ری سیٹ۔
- `tests/unit/routing-scoring-quality.test.ts` — وزن کی سالمیت، غیر جانب دار
  ڈیفالٹ، معیار کے عامل کی درجہ بندی۔
- `tests/unit/routing-otel.test.ts` — فعال کرنے کی گیٹنگ، GenAI اسپین پے لوڈ، غیر ہم وقت
  فلش، اوورلوڈ کے دوران ڈراپ۔
- `tests/unit/routing-events-concurrency.test.ts` — ہزاروں ایونٹس، رنگ
  بفر کی محدودیت، ایرر پھینکنے والے سنک کی آئسولیشن، باہم ملی ہوئی غیر ہم وقت برسٹس،
  اندراجات کے دوران ری سیٹ۔
- `tests/unit/routing-adaptive-e2e.test.ts` — حقیقی
  `scoreAutoTargets` اسکورر کے ذریعے متعین اینڈ ٹو اینڈ لوپ: صحت مند → تنزلی → بحالی → عارضی خرابی، نیز
  کولڈ اسٹارٹ اور خوش قسمت کولڈ پرووائیڈر کے منظرنامے۔
- `tests/unit/stream-timing.test.ts` — TTFT (پہلا فارورڈ کیا گیا چنک)، ITL،
  پہلی بائٹ بمقابلہ پہلا فارورڈ، تعطل، خراب ساخت/خالی چنک کی حفاظت۔

## 10. پہلے سے موجود مسائل کی حالت (مرحلہ 18)

| مسئلہ                                                | حالت                          | نوٹس                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniglyph` ایکسپورٹ میں عدم مطابقت                  | **درست شدہ (ماحولیاتی)**      | `node_modules`، `package-lock.json` کے ساتھ ہم آہنگ نہیں تھا (انسٹال شدہ 1.3.1 بمقابلہ لاک شدہ 1.4.0)۔ `npm install omniglyph@1.4.0` چلانے سے لاک شدہ ورژن بحال ہوگیا؛ ٹائپ کی خرابیاں کم ہو کر 0 ہوگئیں۔ مینی فیسٹس میں کوئی تبدیلی نہیں ہوئی۔                                         |
| فرسودہ `getKnownContextOverflow` ٹیسٹس               | **معلوم — درست نہیں کیا گیا** | `combo-context-overflow-compression-probe.test.ts` ایک ایسے فنکشن کو امپورٹ کرتی ہے جو اب `open-sse/services/combo.ts` میں موجود نہیں ہے (صرف تبصروں میں اس کا حوالہ موجود ہے)۔ اسے درست کرنے کے لیے ان ٹیسٹس کو دوبارہ نافذ یا ازسرنو لکھنا ضروری ہے — یہ غیر متعلقہ معماری تبدیلی ہے۔ |
| `combo-runtime-unit-concurrency.test.ts` DB آئسولیشن | **معلوم — درست نہیں کیا گیا** | براہ راست چلانے پر ٹیسٹ ہارنس کی SQLite آئسولیشن کی تصدیق ناکام ہو جاتی ہے؛ بنیادی برانچ پر بھی بالکل اسی طرح ناکام ہوتی ہے۔                                                                                                                                                            |
| i18n `llm.txt` کا انحراف                             | **معلوم — درست نہیں کیا گیا** | `docs/i18n/*/llm.txt` روٹ سے مختلف ہیں؛ یہ پہلے سے موجود مسئلہ ہے اور دستاویزات کی ہم وقت سازی کے pre-commit گیٹ کو روکتا ہے۔                                                                                                                                                           |

ماحولیاتی اور کوڈ کے مسائل کو الگ رکھا گیا ہے؛ تبدیل شدہ ٹیسٹ فلٹرز کے
پیچھے کوئی غیر متعلقہ ناکامی پوشیدہ نہیں رکھی گئی۔
