# Adaptive Routing: Routing Events, Quality Feedback & Explainability (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

این سند، زیرساخت مسیریابی تطبیقی مبتنی بر بازخورد را که به
OmniRoute افزوده شده است، توصیف میکند. این زیرساخت عمداً کوچک نگه داشته شده است: یک کانال
نوعدار برای نتیجهٔ مسیریابی، یک سیگنال کیفیت برخط که امتیازدهندهٔ موجود auto-combo را تغذیه
میکند، یک صادرکنندهٔ اختیاری OpenTelemetry و یک نقطهٔ پایانی توضیحپذیری را معرفی میکند. این
زیرساخت پشتهٔ تابآوری موجود (مدارشکن، دورهٔ انتظار اتصال،
قفلکردن مدل، ماتریس سلامت، autopilot) را **جایگزین نمیکند**
— بلکه مکمل آن است.

## 1. زمینهٔ معماری

OmniRoute یک صفحهٔ داده با یک **مسیر داغ درخواست** و یک **صفحهٔ کنترل/هوشمندی**
است. مسیر داغ باید سریع، بهینه از نظر حافظه، ناهمگام، تابآور و
پیشبینیپذیر باقی بماند. ارزیابی، امتیازدهی کیفیت، آزمایشها و تحلیل تاریخی
به صفحهٔ کنترل تعلق دارند.

```
عامل هوش مصنوعی / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   صفحهٔ داده (سریع، همگام، درونحافظهای)
│  مسیریابی / جایگزینی │
│  سلامت / حفاظ کنترلی │
│  کش / استریمسازی    │
└──────────┬──────────┘
           │ RoutingEvent (ارسال و فراموشی، ~0.2µs)
           ▼
┌─────────────────────┐
│  مقصدهای بازخورد    │   صفحهٔ کنترل (ناهمگام، با حداکثر تلاش)
│  ردیاب کیفیت        │
│  صادرکنندهٔ OTel    │
│  مخزن توضیحات       │
└──────────┬──────────┘
           ▼  امتیاز کیفیت
      امتیازدهندهٔ auto-combo
```

### آنچه از قبل وجود داشت (ممیزیشده، بدون پیادهسازی تکراری)

| مفهوم                                        | پیادهسازی موجود                                                                                 |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| دسترسپذیری (آیا میتوانیم ترافیک ارسال کنیم؟) | مدارشکن (CLOSED/DEGRADED/OPEN/HALF_OPEN، ذخیرهشده در DB)، دورهٔ انتظار اتصال، قفلکردن مدل       |
| گزارشدهی سلامت                               | `providerHealthMatrix.ts`، `providerHealthAutopilot.ts`                                         |
| ترافیک سایهای                                | `open-sse/services/combo/shadowRouting.ts`                                                      |
| حفاظهای کنترلی                               | `src/lib/guardrails/` (قلابهای پیش/پس)                                                          |
| کش دقیق                                      | `src/lib/semanticCache.ts` (مبتنی بر امضا)                                                      |
| ارزیابها / مسیریابی مبتنی بر ارزیابی         | `src/lib/evals/`، `open-sse/services/evalRouting.ts`                                            |
| توضیحپذیری تصمیم Combo                       | `open-sse/services/combo/decisionTrace.ts`                                                      |
| رویدادهای بیدرنگ داشبورد                     | `src/lib/events/eventBus.ts` (کانال اعلان رابط کاربری، محمولههای `unknown`، تاریخچهٔ 100 ورودی) |

لایهٔ رویداد مسیریابی، پیادهسازی مجدد `eventBus` **نیست**: آن گذرگاه،
کانال اعلان بیدرنگ داشبورد است (دارای _نام رویدادهای_ نوعدار،
محمولههای مبهم و مصرفکنندگان رابط کاربری). `RoutingEvent` یک ساختار _نتیجهٔ_ نوعدار
(تأخیر/توکنها/هزینه/نتیجه/دلیل پایان) است که توسط مقصدهای
بازخورد صفحهٔ کنترل (ردیاب کیفیت، صادرکنندهٔ OTel و مخزن توضیحات) مصرف میشود.

### آنچه وجود نداشت (در اینجا افزوده شده است)

1. یک **رویداد نوعدار نتیجهٔ مسیریابی + انتزاع مقصد** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` محدود به combo و فقط درونحافظهای است؛
   `comboMetrics` شمارندههای تجمعی هستند؛ `call_logs` ذخیرهسازی ناهمگام دادهٔ خام است.
   هیچکدام کانال نتیجهای نوعدار و مبتنی بر مقصد نیستند که یک ردیاب کیفیت، یک
   صادرکنندهٔ OTel یا یک ارزیاب به سبک Future-AGI بتواند در آن مشترک شود.
2. یک **سیگنال کیفیت برخط** (EWMA) برای کیفیت خروجی — امتیازدهنده قبلاً
   «کیفیت» را فقط از طریق تناسب ایستای وظیفه و نرخهای قبولی ارزیابیِ اختیاری
   تقریب میزد.
3. یک **صادرکنندهٔ OTel اختیاری و بدون وابستگی** که از قراردادهای معنایی GenAI استفاده میکند.
4. یک **نقطهٔ پایانی توضیحپذیری** که تصمیمهای واقعی مسیریابی + وضعیت کیفیت را بازمیگرداند.

## 2. رویدادهای مسیریابی (زیربنای بازخورد)

فایلها: `open-sse/services/routing/events.ts`، `.../index.ts`

یک `RoutingEvent` فقط فرادادههای مسیریابی را حمل میکند:

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
  outcome: RoutingOutcome; // اجتماع مجازشده
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` یک trait به سبک `Send+Sync` در TypeScript است:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // باید O(1) باشد، بدون I/O همگام
}
```

مسیر داغ برای هر درخواست تکمیلشده، یکبار `emitRoutingEvent(event)` را فراخوانی میکند
(callback تکمیل استریم، مسیر موفقیت غیراستریمی و مسیر شکست malformed-200
در `handleChatCore`). توزیع بهصورت fan-out همگام میان sinkهای ثبتشده انجام
میشود، اما هر sink فقط داده را در صف قرار میدهد یا وضعیت درونحافظهای را
بهروزرسانی میکند. **هیچ نوشتن همگام در پایگاه داده و هیچ I/O شبکهای در مسیر
داغ انجام نمیشود.**

sinkهای پیشفرض:

- `MemoryRoutingEventStore` — بافر حلقوی محدود (500)، با جدیدترین مورد در ابتدا،
  برای endpoint توضیح.
- مصرفکننده `QualityTracker` — تخمین کیفیت EWMA را بهروزرسانی میکند.
- `OtlpHttpsEventSink` — اختیاری؛ فقط زمانی فعال میشود که
  `OMNIROUTE_OTEL_ENDPOINT` (یا `OTEL_EXPORTER_OTLP_ENDPOINT`) تنظیم شده باشد.

### سربار اندازهگیریشده (مقایسهای صادقانه)

`npm run bench:routing-events` روی این workstation (با 100k تکرار؛ عملیات زیر
µs بهصورت تجمیعی بر حسب µs/op اندازهگیری شدند، زیرا صدکهای هر عملیات پایینتر
از دقت زمانی تایمر `performance.now()` هستند):

| سناریو                          | µs/op  | ops/s  |
| ------------------------------- | ------ | ------ |
| خط پایه (فقط امتیازدهی)         | ~0.045 | ~22 M  |
| خط پایه + RoutingEvent (2 sink) | ~0.168 | ~5.9 M |
| خط پایه + رویداد + صف OTel      | ~0.163 | ~6.1 M |
| همزمان (8 burst درهمتنیده)      | ~0.18  | —      |

اختلاف dispatch رویداد نسبت به امتیازدهی خط پایه حدود ~0.12 µs/request است؛
sink مربوط به OTel فقط داده را در صف قرار میدهد (push در بافر با O(1)) و هیچ
سربار قابلاندازهگیریای اضافه نمیکند. این اعداد مختص این ماشین و نسبی هستند
— نه تضمینی برای محیط production. مقدار "~0.2 µs" در v1 یک تخمین تجمیعی بود؛
این روش، خط پایه امتیازدهی را از هزینه dispatch رویداد جدا میکند.

## 3. سیگنال کیفیت (وضعیت provider مبتنی بر بازخورد)

فایلها: `open-sse/services/routing/quality.ts`

v2 کیفیت **عملیاتی** را از کیفیت **معنایی** جدا میکند:

- **عملیاتی** — از مسیر داغ مسیریابی بهدست میآید (HTTP 4xx/5xx، شکستهای
  اتصال، 429ها، پاسخهای malformed، وقفههای استریم، `finish_reason=length`،
  موفقیتهای بدون خروجی و EWMA تأخیر/TTFT). پاسخ 200 بهعنوان کیفیت معنایی
  در نظر گرفته نمیشود.
- **معنایی** — ارزش واقعی خروجی تولیدشده. فقط و فقط توسط یک ارزیاب و از طریق
  `setSemanticQuality()` تولید میشود. تا زمانی که ارزیابی آن را فراهم نکند،
  مقدارش `null` است و هرگز به امتیاز عملیاتی نشت نمیکند.

وضعیت هر جفت (provider، model) (EWMA + شمارندههای محدود):

- `successEwma` — EWMA (α=0.2) موفقیت نتیجه.
- `latencyEwma` / `ttftEwma` — EWMA تأخیر (α=0.1).
- `samples`، `anomalies`، `rateLimited`، `semantic`، `semanticConfidence`.
- `recencyMs` — مدتزمان سپریشده از آخرین مشاهده مدل.

### آگاهی از اطمینان / تعداد نمونه

`confidence = clamp01(samples / 50)`، و امتیاز بازگرداندهشده به scorer بهسمت
نقطه میانی خنثی ترکیب میشود:

```
score = 0.5 + confidence * (operational - 0.5)
```

پیامدها (تأییدشده توسط تستها):

- یک provider سرد (0 نمونه) امتیاز **0.5** میگیرد — ناعادلانه جریمه نمیشود،
  اما نمیتواند بر providerای با هزاران مشاهده معتبر غلبه کند.
- providerای با 7 موفقیت خوششانس بهسمت 0.5 کشیده میشود (و هرگز بهدلیل
  مقداردهی اولیه خوشبینانه غالب نمیشود).
- providerای با 50+ نمونه به امتیاز عملیاتی واقعی خود همگرا میشود.
- افت و بازیابی تدریجی هستند (EWMA) و یک شکست منفرد، provider سالم را نابود
  نمیکند.

`ProviderQuality` مقادیر `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }` را ارائه میکند.

این داده بهعنوان عامل امتیازدهی `quality` به scorer مربوط به auto-combo وارد
میشود:

- `ScoringFactors.quality` / `ScoringWeights.quality` در
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: مقدار `health` از 0.1905 به 0.1605 و `quality` برابر 0.03
  است. مجموع همچنان 1.0 باقی میماند.
- `buildAutoCandidates` مقدار `candidate.quality` را از tracker پر میکند؛
  candidateهای بدون داده بهطور پیشفرض مقدار خنثی **0.5** را میگیرند
  (یک candidate سرد نه تقویت میشود و نه جریمه).

حلقه بسته:

```
RoutingEvent → QualityTracker → getQualityScore → عامل کیفیت auto-combo
      ↑                                                    │
      └────── نتیجه درخواست (handleChatCore) ←─────────────┘
```

### حذف سخت در برابر جریمه نرم

سیگنال کیفیت فقط یک **ترجیح تطبیقی نرم** است. حذف سخت همچنان بر عهده پشته
تابآوری موجود است: circuit breaker در حالت OPEN، اتمام quota، شکست auth و
قفلشدن model — هیچیک از این موارد تحت تأثیر امتیاز کیفیت قرار نمیگیرند.
providerای که امتیاز کیفیتش موقتاً افت میکند، فقط اولویت کمتری میگیرد و هرگز
بهطور سخت غیرفعال نمیشود.

## 3b. زمانبندی استاندارد جریان (TTFT / ITL)

فایلها: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` تنها نقطهٔ ابزارگذاری برای مسیر استریم است که به
`createSSEStream` متصل شده است (open-sse/utils/stream.ts):

- `markByte()` — دریافت نخستین قطعه از بالادست.
- `markForward()` — ارسال نخستین قطعه به کلاینت (برای TTFT استفاده میشود).
- `markInterrupted()` — پایان زمان انتظار/لغو/خطای استریم پیش از اتمام صحیح.
- `ttft()` = تأخیر نخستین قطعهٔ SSE ارسالشده. **این TTFT در سطح توکن نیست** —
  یک قطعهٔ SSE ممکن است شامل صفر، یک یا چند توکن باشد. این موضوع با دقت مستند شده است.
- `avgItlMs()` = میانگین فاصلهٔ زمانی میان قطعهها (شاخص تقریبی تأخیر قطعه برای ITL).

مقادیر TTFT/ITL/interrupted وارد `RoutingEvent` (`ttftMs`, `itlMs`) میشوند و
توسط مقصد OTel بهعنوان ویژگیهای span مربوط به GenAI/OmniRoute صادر میشوند.

## 4. مشاهدهپذیری OpenTelemetry / GenAI

فایلها: `open-sse/services/routing/otel.ts`

- صادرکنندهٔ JSON مستقل از وابستگی برای OTLP/HTTP (از `fetch` سراسری استفاده
  میکند و به SDKهای `@opentelemetry/*` وابسته نیست).
- spanها از قراردادهای معنایی GenAI (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) بههمراه ویژگیهای مسیریابی
  OmniRoute (نتیجه، وضعیت، ttft، تلاشهای مجدد، fallback) پیروی میکنند.
- `record()` فقط داده را در یک بافر با اندازهٔ محدود در صف قرار میدهد (O(1))؛ یک تایمر
  پسزمینه از طریق `POST {endpoint}/v1/traces` بهصورت ناهمگام تخلیه را انجام
  میدهد. هنگام بار بیشازحد، قدیمیترین رویدادها حذف میشوند (شمارندهٔ
  `dropped`) — هیچگاه به صفحهٔ داده فشار برگشتی وارد نمیشود.
- **تا زمان پیکربندی غیرفعال است.** باید `OMNIROUTE_OTEL_ENDPOINT` (یا
  `OTEL_EXPORTER_OTLP_ENDPOINT`) تنظیم شود؛ در غیر این صورت، مقصد ثبت نمیشود
  و هیچ کد OTel اجرا نخواهد شد.

## 5. توضیحپذیری

- `GET /v1/explain/routing` جدیدترین `RoutingEvent`ها (تصمیمهای واقعی، ابتدا
  جدیدترینها) و نمای لحظهای کیفیت بهازای هر ارائهدهنده/مدل را برمیگرداند.
- احراز هویت مشابه `/v1/combos` است (کلید API از نوع Bearer یا نشست داشبورد؛
  دسترسی ناشناس در استقرارهای محلی تککاربره با `REQUIRE_API_KEY=false`).
- ردگیریهای سطح combo برای هر فراخوانی همچنان از طریق
  `decisionTrace.ts` موجود قابل دسترسیاند (هدر `X-OmniRoute-Combo-Trace`).
- ایمنی: رویدادها فقط شامل فرادادهٔ مسیریابی هستند و هرگز promptها، bodyها یا
  اطلاعات اعتباری را حمل نمیکنند.

## 6. یکپارچهسازی صفحهٔ ارزیابی (آمادگی برای Future AGI)

OmniRoute با Future AGI (یا هر ارزیاب دیگری) بهعنوان یک **بکاند بالقوهٔ
هوشمندی/ارزیابی، نه یک وابستگی** رفتار میکند. نقاط اتصال عبارتاند از:

- یک `RoutingEventSink` میتواند رویدادها را بهصورت ناهمگام به یک ارزیاب ارسال کند.
- `MemoryRoutingEventStore` بههمراه نمای لحظهای کیفیت، جریان خام تصمیمها را در
  اختیار ارزیاب قرار میدهد.
- یک `Evaluator` آتی (قطعی، داور محلی، HTTP، WASM) رویدادها/ردگیریها را مصرف
  میکند و یک `QualityScore` برمیگرداند که وارد همان مسیر
  `getQualityScore`/ضریب کیفیت میشود.
- مسیریابی مبتنی بر ارزیابی موجود (`open-sse/services/evalRouting.ts`) از
  هماکنون، در صورت فعال بودن، اهداف combo را بر اساس نرخ موفقیت `eval_runs`
  دوباره مرتب میکند.

هیچ ارزیابیای بهصورت همگام در مسیر درخواست اجرا نمیشود و gateway در نبود
ارزیاب نیز بهطور کامل کار میکند.

## 7. بازبینی نهایی معماری

1. **چه مواردی در مسیر داغ همگام باقی میمانند؟** مسیریابی/امتیازدهی، بررسیهای
   اولیهٔ guardrail، جستوجو در cache و یک fan-out مربوط به `emitRoutingEvent`
   (حدود 0.12 µs بیشتر از امتیازدهی پایه) به مقصدهای درونحافظهای.
2. **چه مواردی به پردازش ناهمگام منتقل شدند؟** صدور OTel (تایمر + fetch)،
   ماندگارسازی `call_logs`/مصرف، نوشتن در semantic-cache؛ کیفیت در حافظه
   نگهداری میشود و O(1) است (نیازی به پردازش ناهمگام ندارد).
3. **چگونه نتیجهٔ مسیریابی به بازخورد تبدیل میشود؟** `handleChatCore` یک
   `RoutingEvent` منتشر میکند → `QualityTracker` وضعیت EWMA را بهروزرسانی
   میکند → `getQualityScore` ضریب `quality` در auto-combo را تغذیه میکند.
4. **کیفیت چگونه بر مسیریابیهای آینده اثر میگذارد؟** امتیاز کیفیت پایین،
   امتیاز وزندار آن ارائهدهنده/مدل را در `scoreAutoTargets` کاهش میدهد؛
   بنابراین اولویت مدلهای افتکرده بهتدریج کم میشود و با بهبود EWMA آنها
   دوباره بازیابی میشود.
5. **Future AGI چگونه میتواند بدون تبدیلشدن به یک وابستگی یکپارچه شود؟** از
   طریق رابط `RoutingEventSink` / یک آداپتور آتی `Evaluator` — بدون وابستگی
   هاردکدشده.
6. **وقتی ارزیاب در دسترس نباشد چه اتفاقی میافتد؟** مسیریابی تحت تأثیر قرار
   نمیگیرد؛ برای مدلهایی که هیچ سیگنال مشاهدهشدهای ندارند، کیفیت به مقدار
   خنثی (1.0) بازمیگردد.
7. **وقتی تلهمتری در دسترس نباشد چه اتفاقی میافتد؟** مقصد OTel بهسادگی ثبت
   نمیشود؛ باقی لایهٔ مسیریابی بدون تغییر اجرا میشود.
8. **هنگام بار بیشازحد چه اتفاقی میافتد؟** بافر OTel قدیمیترین رویدادها را
   حذف میکند؛ کیفیت و ring buffer ذاتاً محدود هستند؛ هیچ فشار برگشتیای وجود ندارد.
9. **وضعیت ارائهدهنده پس از افت چگونه بازیابی میشود؟** با انباشتهشدن
   موفقیتها، EWMA دوباره همگرا میشود؛ warmup مدلهای سرد را خنثی نگه میدارد؛
   circuit breaker نیز بهطور مستقل از طریق probeهای HALF_OPEN بازیابی میشود.
10. **کدام قابلیتهای پیشنهادی عمداً پیادهسازی نشدند و چرا؟**
    - ترافیک سایه / آزمایشها — از قبل پیادهسازی شدهاند
      (`combo/shadowRouting.ts`)؛ دوباره ساخته نشدند.
    - Guardrailها — از قبل پیادهسازی شدهاند (`src/lib/guardrails/`)؛ تکرار نشدند.
    - Semantic cache — از قبل پیادهسازی شده است (`src/lib/semanticCache.ts`)؛
      تکرار نشد.
    - یک پلتفرم کامل مدیریت آزمایش، ابزارهای dataset، پلتفرم بهینهسازی prompt،
      vector DB یا زیرساخت خارجی و اجباری OTel — خارج از محدودهٔ یک صفحهٔ دادهٔ
      سبک هستند.
    - یک struct به نام `RoutingEvent` در Rust — صفحهٔ داده با TypeScript نوشته
      شده است؛ type متناظر در TS معادل سازگارشدهٔ آن است.

## 8. مرجع پیکربندی

| متغیر                         | مقدار پیشفرض | تأثیر                                                                                            |
| ----------------------------- | ------------ | ------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_OTEL_ENDPOINT`     | تنظیمنشده    | در صورت تنظیم، صادرکنندهٔ ردیابیهای OTLP/HTTP را فعال میکند (برای مثال `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | تنظیمنشده    | نام مستعار جایگزین برای نقطهٔ پایانی OTLP.                                                       |
| `OTEL_SERVICE_NAME`           | `omniroute`  | ویژگی منبع `service.name`.                                                                       |

## 9. آزمونها

- `tests/unit/routing-events.test.ts` — نرمالسازی رویداد، طبقهبندی وضعیت،
  بافر حلقوی با ظرفیت محدود، توزیع به مقصدها + جداسازی.
- `tests/unit/routing-quality.test.ts` — گرمشدن EWMA، بازیابی از شکست/موفقیت،
  جریمههای ناهنجاری، مدیریت گذرای 429، اسنپشات، بازنشانی.
- `tests/unit/routing-scoring-quality.test.ts` — صحت وزنها، مقدار پیشفرض
  خنثی، رتبهبندی عامل کیفیت.
- `tests/unit/routing-otel.test.ts` — کنترل فعالسازی، محتوای span مربوط به GenAI، تخلیهٔ
  ناهمگام، حذف در زمان بار بیشازحد.
- `tests/unit/routing-events-concurrency.test.ts` — هزاران رویداد، محدودبودن
  بافر حلقوی، جداسازی مقصد خطادهنده، فورانهای ناهمگام درهمآمیخته،
  بازنشانی حین درجها.
- `tests/unit/routing-adaptive-e2e.test.ts` — حلقهٔ قطعی سرتاسری از طریق
  امتیازدهندهٔ واقعی `scoreAutoTargets`: سالم → افت → بازیابی → اختلال کوتاه، بهعلاوهٔ
  سناریوهای شروع سرد و ارائهدهندهٔ سردِ خوششانس.
- `tests/unit/stream-timing.test.ts` — TTFT (نخستین قطعهٔ ارسالشده)، ITL،
  نخستین بایت در برابر نخستین ارسال، وقفه، ایمنی در برابر قطعهٔ معیوب/خالی.

## 10. وضعیت مشکلات ازپیشموجود (فاز 18)

| مشکل                                                   | وضعیت                   | یادداشتها                                                                                                                                                                                                                                         |
| ------------------------------------------------------ | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ناهماهنگی خروجی `omniglyph`                            | **رفعشده (محیطی)**      | `node_modules` با `package-lock.json` همگام نبود (نسخهٔ نصبشده 1.3.1 در برابر نسخهٔ قفلشدهٔ 1.4.0). اجرای `npm install omniglyph@1.4.0` نسخهٔ قفلشده را بازیابی کرد؛ خطاهای نوع به 0 رسیدند. مانیفستها بدون تغییر باقی ماندند.                    |
| آزمونهای قدیمی `getKnownContextOverflow`               | **شناختهشده — رفعنشده** | `combo-context-overflow-compression-probe.test.ts` تابعی را وارد میکند که دیگر در `open-sse/services/combo.ts` وجود ندارد (فقط در توضیحات به آن اشاره شده است). رفع آن به پیادهسازی مجدد یا بازنویسی آن آزمونها نیاز دارد — تغییر معماری نامرتبط. |
| جداسازی DB در `combo-runtime-unit-concurrency.test.ts` | **شناختهشده — رفعنشده** | بررسی جداسازی SQLite در ابزار آزمون هنگام اجرای مستقیم شکست میخورد؛ در شاخهٔ پایه نیز بهطور یکسان شکست میخورد.                                                                                                                                    |
| ناهمگامی i18n در `llm.txt`                             | **شناختهشده — رفعنشده** | فایلهای `docs/i18n/*/llm.txt` با فایل ریشه تفاوت دارند؛ این مشکل از قبل وجود داشته و دروازهٔ pre-commit همگامسازی مستندات را مسدود میکند.                                                                                                         |

مشکلات محیطی و مشکلات کد از یکدیگر متمایز نگه داشته میشوند؛ هیچ شکست نامرتبطی
پشت فیلترهای تغییریافتهٔ آزمون پنهان نمیشود.
