# Reasoning Replay Cache (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇧🇦 [bs](../../../bs/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **منبع حقیقت:** `src/lib/db/reasoningCache.ts`، `open-sse/services/reasoningCache.ts`
> **آخرین بهروزرسانی:** 2026-06-28 — v3.8.40

OmniRoute مقدار `reasoning_content` تولیدشده توسط مدلهای حالت تفکر را ثبت میکند و در درخواستهای چندمرحلهای، زمانی که ارائهدهنده بالادستی به آن نیاز دارد، بهصورت شفاف بازپخش میکند. این کار خطاهای HTTP 400 را که ارائهدهندگان سختگیر در صورت نبود استدلال مرحله قبلی در تاریخچه مکالمه کلاینت ایجاد میکنند، برطرف میسازد.

## دلیل وجود این قابلیت

چندین ارائهدهنده حالت تفکر، مرحله بعدی را رد میکنند مگر اینکه **پیام قبلی دستیار شامل `reasoning_content` اصلی باشد**. سرویس بالادستی خطای 400 را با پیامهایی مانند زیر برمیگرداند:

```
پارامتر نادرست است: reasoning_content در حالت تفکر باید دوباره به API ارسال شود.
```

اما کلاینتهای رایج (Cursor، Cline، Roo Code، OpenAI SDK) هنگام بازپخش تاریخچه، `reasoning_content` را حذف میکنند. OmniRoute آن را از یک کش سمت سرور بازیابی میکند تا درخواستی که سرویس بالادستی مشاهده میکند سازگار باشد. Issue #1628 قابلیت ماندگاری ترکیبی حافظه/SQLite را معرفی کرد تا کش پس از راهاندازی مجدد فرایند نیز حفظ شود.

## معماری

```
نوبت N (دستیار تولید میکند):
  → پاسخ شامل reasoning_content + tool_calls است
  → اگر requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      مینویسد (حافظه + پایگاه داده)، با کلیدی مبتنی بر هر tool_call.id
  → پاسخ را به کلاینت ارسال میکند (که ممکن است reasoning را نگه دارد یا ندارد)

نوبت N+1 (کلاینت پیام پیگیری را ارسال میکند):
  → مترجم تشخیص میدهد: requiresReasoningReplay(provider, model) === true
  → برای هر پیام دستیار که دارای tool_calls و فاقد reasoning_content است:
      lookupReasoning(toolCalls[0].id) → حافظه → پایگاه داده
      یافت شد  → msg.reasoning_content = cached; recordReplay()
      یافت نشد → msg.reasoning_content = "" (راهکار بازگشت قدیمی برای نسخههای قدیمیتر DeepSeek)
  → سرویس بالادستی تاریخچهای سازگار میبیند → بدون خطای 400
```

ثبت در `open-sse/handlers/chatCore.ts` انجام میشود (در دو محل، یعنی دو محل فراخوانی `cacheReasoningFromAssistantMessage`). بازپخش در `open-sse/translator/index.ts`، پس از اجبار به انطباق با طرحواره اما پیش از ارسال، انجام میشود.

نوبتهای معمولی دستیار (بدون فراخوانی ابزار) بهشکل متفاوتی کلیدگذاری میشوند: `buildAssistantMessageCacheKey()` از محدودهٔ نشست بههمراه رونوشت نرمالشده با قالب OpenAI تا آن نوبت، چکیدهای تولید میکند، زیرا DeepSeek پس از وجود `tools` به reasoning مربوط به _تمام_ نوبتهای قبلی نیاز دارد. برای مقصدهای Responses-API (برای مثال `opencode-go/deepseek-v4-flash` که به `/responses` هدایت میشود)، بدنهٔ ارسالی به سرویس بالادستی بهجای `messages` دارای `input` است؛ بنابراین `translateRequest()` (`open-sse/translator/index.ts`) رونوشت محوریای را که چکیده کرده است از طریق یک گزینهٔ callback گزارش میدهد و محلهای ثبت نیز از همان رونوشت چکیده تولید میکنند. مرحلهٔ بازپخش Responses برای تمام قالبهای مبدأ روی محور OpenAI اجرا میشود؛ بنابراین بازپخش برای کلاینتهای Anthropic Messages (Claude → OpenAI → Responses) نیز انجام میشود.

## ذخیرهسازی — ترکیب حافظه + SQLite

مسیر پرتکرار از یک `Map` درونحافظهای (LRU بر اساس زمان ایجاد) استفاده میکند که یک جدول SQLite برای بازیابی پس از خرابی و نمایش در داشبورد، پشتیبان آن است.

| لایه  | پیادهسازی                                      | هدف                                        |
| ----- | ---------------------------------------------- | ------------------------------------------ |
| حافظه | `Map` در `open-sse/services/reasoningCache.ts` | جستوجوی سریع؛ حذف قدیمیترین مورد در 200    |
| DB    | جدول `reasoning_cache` (`src/lib/db/`)         | ماندگاری پس از راهاندازی مجدد و تأمین آمار |

نوشتن در هر دو انجام میشود. عملیات خواندن ابتدا حافظه را بررسی میکند و سپس بهعنوان راهکار جایگزین به DB مراجعه میکند (موارد یافتشده در DB دوباره به حافظه ارتقا داده میشوند). خطاهای DB بحرانی نیستند — کش درونحافظهای همچنان به مسیر پرتکرار سرویس میدهد.

**مقادیر پیشفرض:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- حداکثر ورودیهای حافظه: `200` (`MAX_MEMORY_ENTRIES`)
- حذف: ابتدا قدیمیترین `createdAt`

## طرحواره پایگاه داده

مهاجرت: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

ایندکسها: `expires_at`، `provider`، `model`، `created_at`. مقدار `expires_at` بهصورت ثانیههای Unix epoch ذخیره میشود؛ لایه SELECT مقادیر متنی قدیمی را از طریق `EXPIRES_AT_EPOCH_SQL` نرمالسازی میکند.

## تشخیص ارائهدهنده / مدل

بازپخش زمانی فعال میشود که `requiresReasoningReplay(provider, model)` مقدار `true` را برگرداند. این تابع دو فهرست را در `open-sse/services/reasoningCache.ts` بررسی میکند.

**شناسههای ارائهدهنده (تطبیق دقیق، بدون حساسیت به بزرگی و کوچکی حروف):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**الگوهای عبارت منظم مدل (بدون حساسیت به بزرگی و کوچکی حروف):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` و `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro، با پسوند اختیاری `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

افزودن یک ارائهدهنده/مدل سختگیرانه جدید بهمعنای افزودن آن به یکی از این فهرستها و نوشتن یک آزمون واحد برای تأیید تزریق بازپخش است. توضیحات PR باید دقیقاً رشته خطای 400 بالادستی را که باعث این تغییر شده است، ذکر کند.

## REST API

کش دو نقطه پایانی را در `src/app/api/cache/reasoning/route.ts` ارائه میکند. هر دو به احراز هویت مدیریتی نیاز دارند (`isAuthenticated` از `@/shared/utils/apiAuth`).

| متد    | نقطه پایانی                                               | توضیحات                                                    |
| ------ | --------------------------------------------------------- | ---------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | آمار + ورودیهای صفحهبندیشده                                |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | فهرست فیلترشده (`limit` به بازه `[1, 200]` محدود میشود)    |
| DELETE | `/api/cache/reasoning`                                    | پاککردن همهچیز (حافظه + DB) و بازنشانی شمارندههای hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | پاککردن فقط ورودیهای یک ارائهدهنده                         |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | حذف یک ورودی منفرد                                         |

**ساختار پاسخ GET:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## نکات عملیاتی

- **پاکسازی:** `cleanupReasoningCache()` ورودیهای منقضیشده حافظه را حذف میکند و `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` را اجرا میکند. پردازشگرهای بررسی سلامت، این تابع را بهصورت دورهای فراخوانی میکنند.
- **بازیابی پس از خرابی:** پس از راهاندازی مجدد، حافظه خالی است، اما DB همچنان ورودیهای منقضینشده را نگه میدارد. نخستین جستوجو برای یک `tool_call_id` مشخص، یک hit در DB است؛ جستوجوهای بعدی hit در حافظه هستند.
- **بدون استدلال، بدون کش:** وقتی پیام دستیار فیلد `reasoning_content` / `reasoning` نداشته باشد، `cacheReasoningFromAssistantMessage` مقدار `0` را برمیگرداند؛ بنابراین پاسخهای بدون تفکر هیچ هزینهای ندارند.
- **نوشتن نیز مشروط است:** هر دو محل فراخوانی در `chatCore.ts` (حالت غیرجریانی و جریانی) فقط زمانی `cacheReasoningFromAssistantMessage()` را فراخوانی میکنند که `requiresReasoningReplay(provider, model)` برابر با `true` باشد — همان گزارهای که سمت خواندن بررسی میکند. نصبهایی که هرگز از ارائهدهندهای نیازمند بازپخش استفاده نمیکنند، دیگر هزینه نوشتن، بهروزرسانی ایندکس و try/catch در هر پاسخ دارای استدلال را متحمل نمیشوند.
- **ارائهدهندگان غیرسختگیرانه:** وقتی `requiresReasoningReplay` برابر با `false` و قالب مقصد OpenAI باشد، مترجم هرگونه فیلد `reasoning_content` را از پیامهای خروجی **حذف میکند** — OpenAI Chat Completions آن را نمیپذیرد.

## همچنین ببینید

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — قطعکنندههای مدار، دورههای انتظار، قفلشدن مدل
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — تشخیص خطاهای 400 سرویس بالادستی
- منبع: `src/lib/db/reasoningCache.ts`، `open-sse/services/reasoningCache.ts`، `open-sse/translator/index.ts`
- مهاجرت: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- مسیر API: `src/app/api/cache/reasoning/route.ts`
- مسئله اصلی: #1628
