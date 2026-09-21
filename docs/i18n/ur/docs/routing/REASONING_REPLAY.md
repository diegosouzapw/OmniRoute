# Reasoning Replay Cache (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **مستند ماخذ:** `src/lib/db/reasoningCache.ts`، `open-sse/services/reasoningCache.ts`
> **آخری بار اپ ڈیٹ کیا گیا:** 2026-06-28 — v3.8.40

OmniRoute، سوچنے والے موڈ کے ماڈلز کے تیار کردہ اسسٹنٹ `reasoning_content` کو محفوظ کرتا ہے اور متعدد باریوں والی درخواستوں میں اسے شفاف طور پر دوبارہ شامل کرتا ہے، جب اپ اسٹریم فراہم کنندہ اس کا تقاضا کرے۔ اس سے وہ HTTP 400 خرابیاں ختم ہو جاتی ہیں جو سخت فراہم کنندگان اس وقت دیتے ہیں جب کلائنٹ کی گفتگو کی سرگزشت میں پچھلی باری کی استدلالی معلومات موجود نہ ہوں۔

## اس کی ضرورت کیوں ہے

سوچنے والے موڈ کے متعدد فراہم کنندگان اگلی باری کو مسترد کر دیتے ہیں، جب تک کہ **پچھلے اسسٹنٹ پیغام میں اصل `reasoning_content` شامل نہ ہو**۔ اپ اسٹریم اس طرح کے پیغامات کے ساتھ 400 واپس کرتا ہے:

```
Param Incorrect: سوچنے والے موڈ میں reasoning_content کو API کو واپس بھیجنا ضروری ہے۔
```

لیکن عام کلائنٹس (Cursor، Cline، Roo Code، OpenAI SDK) دوبارہ بھیجی جانے والی سرگزشت سے `reasoning_content` ہٹا دیتے ہیں۔ OmniRoute اسے سرور سائیڈ کیش سے بحال کرتا ہے تاکہ اپ اسٹریم کو موصول ہونے والی درخواست ہم آہنگ ہو۔ مسئلہ #1628 میں ہائبرڈ میموری/SQLite استقامت متعارف کرائی گئی، تاکہ پراسیس دوبارہ شروع ہونے کے بعد بھی کیش برقرار رہے۔

## فنِ تعمیر

```
باری N (اسسٹنٹ تیار کرتا ہے):
  → جواب میں reasoning_content + tool_calls شامل ہوتے ہیں
  → اگر requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      ہر tool_call.id کو کلید بنا کر (میموری + DB) میں لکھتا ہے
  → جواب کلائنٹ کو بھیجتا ہے (جو استدلال کو برقرار رکھ بھی سکتا ہے اور نہیں بھی)

باری N+1 (کلائنٹ اگلی درخواست بھیجتا ہے):
  → مترجم شناخت کرتا ہے: requiresReasoningReplay(provider, model) === true
  → tool_calls رکھنے والے مگر reasoning_content کے بغیر ہر اسسٹنٹ پیغام کے لیے:
      lookupReasoning(toolCalls[0].id) → میموری → DB
      دستیاب  → msg.reasoning_content = cached; recordReplay()
      غیر دستیاب → msg.reasoning_content = "" (پرانے DeepSeek کے لیے سابقہ فال بیک)
  → اپ اسٹریم کو ہم آہنگ سرگزشت نظر آتی ہے → کوئی 400 نہیں
```

محفوظ کرنے کا عمل `open-sse/handlers/chatCore.ts` میں ہوتا ہے (دو مقامات پر، یعنی `cacheReasoningFromAssistantMessage` کو کال کرنے والی دونوں جگہوں پر)۔ دوبارہ شامل کرنے کا عمل اسکیما کی جبری تبدیلی کے بعد، مگر ڈسپیچ سے پہلے، `open-sse/translator/index.ts` میں ہوتا ہے۔

## اسٹوریج — ہائبرڈ میموری + SQLite

ہاٹ پاتھ ایک ان-میموری `Map` (تخلیق کے لحاظ سے LRU) استعمال کرتا ہے، جس کے پس منظر میں کریش سے بازیابی اور ڈیش بورڈ میں مرئیت کے لیے SQLite ٹیبل موجود ہے۔

| تہہ    | نفاذ                                            | مقصد                                                                 |
| ------ | ----------------------------------------------- | -------------------------------------------------------------------- |
| میموری | `open-sse/services/reasoningCache.ts` میں `Map` | تیز تلاش، 200 پر قدیم ترین اندراج نکال دیتا ہے                       |
| DB     | `reasoning_cache` ٹیبل (`src/lib/db/`)          | دوبارہ شروع ہونے کے بعد بھی برقرار رہتا ہے، اعدادوشمار فراہم کرتا ہے |

تحریری کارروائیاں دونوں میں کی جاتی ہیں۔ پڑھنے کی کارروائیاں پہلے میموری دیکھتی ہیں، پھر DB کو فال بیک کے طور پر استعمال کرتی ہیں (DB میں ملنے والے نتائج کو دوبارہ میموری میں منتقل کر دیا جاتا ہے)۔ DB کی ناکامیاں مہلک نہیں ہوتیں — ان-میموری کیش ہاٹ پاتھ کو بدستور خدمات فراہم کرتا رہتا ہے۔

**طے شدہ قدریں:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- میموری میں اندراجات کی زیادہ سے زیادہ تعداد: `200` (`MAX_MEMORY_ENTRIES`)
- اخراج: سب سے پرانا `createdAt` پہلے

## ڈیٹابیس اسکیما

مائیگریشن: `src/lib/db/migrations/033_create_reasoning_cache.sql`

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

انڈیکسز: `expires_at`، `provider`، `model`، `created_at`۔ `expires_at` کو Unix epoch سیکنڈز کی صورت میں محفوظ کیا جاتا ہے؛ SELECT تہہ `EXPIRES_AT_EPOCH_SQL` کے ذریعے سابقہ متنی قدروں کو معمول کے مطابق بناتی ہے۔

## پرووائیڈر / ماڈل کی شناخت

ری پلے اس وقت فعال ہوتا ہے جب `requiresReasoningReplay(provider, model)` سے `true` واپس آتا ہے۔ یہ فنکشن `open-sse/services/reasoningCache.ts` میں موجود دو فہرستوں کی جانچ کرتا ہے۔

**پرووائیڈر IDs (بالکل یکساں، حروف کی نوعیت سے غیر حساس):**

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

**ماڈل کے regex پیٹرنز (حروف کی نوعیت سے غیر حساس):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` اور `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro، اختیاری `-free` لاحقے کے ساتھ)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

نیا سخت پرووائیڈر/ماڈل شامل کرنے کا مطلب ان فہرستوں میں سے کسی ایک میں اس کا اضافہ کرنا اور ری پلے انجیکشن کی تصدیق کرنے والا یونٹ ٹیسٹ لکھنا ہے۔ PR کی تفصیل میں وہ عین upstream 400 اسٹرنگ درج ہونی چاہیے جس نے اس تبدیلی کی ضرورت پیدا کی۔

## REST API

کیش `src/app/api/cache/reasoning/route.ts` کے تحت دو اینڈ پوائنٹس فراہم کرتا ہے۔ دونوں کو مینجمنٹ توثیق (`@/shared/utils/apiAuth` سے `isAuthenticated`) درکار ہے۔

| طریقہ  | اینڈ پوائنٹ                                               | تفصیل                                                          |
| ------ | --------------------------------------------------------- | -------------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | اعداد و شمار + صفحات میں منقسم اندراجات                        |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | فلٹر شدہ فہرست (`limit` کو `[1, 200]` تک محدود کیا جاتا ہے)    |
| DELETE | `/api/cache/reasoning`                                    | سب کچھ صاف کریں (میموری + DB) اور ہٹ/مس شمار ازسرِنو مقرر کریں |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | صرف ایک پرووائیڈر کے اندراجات صاف کریں                         |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | ایک اندراج حذف کریں                                            |

**GET جواب کی ساخت:**

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

## آپریشنل نوٹس

- **صفائی:** `cleanupReasoningCache()` میموری کے زائد المیعاد اندراجات صاف کرتا ہے اور `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')` چلاتا ہے۔ ہیلتھ چیک ورکرز اسے وقتاً فوقتاً چلاتے ہیں۔
- **کریش سے بازیابی:** ری اسٹارٹ کے بعد میموری خالی ہوتی ہے، لیکن DB میں غیر زائد المیعاد اندراجات موجود رہتے ہیں۔ کسی مخصوص `tool_call_id` کی پہلی تلاش DB ہٹ ہوتی ہے؛ بعد کی تلاشیں میموری ہٹس ہوتی ہیں۔
- **ریزننگ نہیں، کیش نہیں:** جب اسسٹنٹ پیغام میں `reasoning_content` / `reasoning` فیلڈ موجود نہ ہو تو `cacheReasoningFromAssistantMessage` سے `0` واپس آتا ہے، اس لیے غیر تفکری جوابات پر کوئی لاگت نہیں آتی۔
- **لکھنے کا عمل بھی مشروط ہے:** `chatCore.ts` میں دونوں کال سائٹس (نان اسٹریمنگ اور اسٹریمنگ) صرف اس وقت `cacheReasoningFromAssistantMessage()` کو کال کرتی ہیں جب `requiresReasoningReplay(provider, model)` سے `true` واپس آئے — یہی پریڈیکیٹ پڑھنے والے حصے میں بھی جانچا جاتا ہے۔ وہ انسٹالیشنز جو کبھی کسی ری پلے پرووائیڈر کو استعمال نہیں کرتیں، ہر ریزننگ رکھنے والے جواب پر رائٹ، انڈیکس اپ ڈیٹ، اور try/catch کی لاگت سے بچتی ہیں۔
- **غیر سخت پرووائیڈرز:** جب `requiresReasoningReplay` سے `false` واپس آئے اور ہدفی فارمیٹ OpenAI ہو، تو ٹرانسلیٹر باہر جانے والے پیغامات سے ہر `reasoning_content` فیلڈ **ہٹا دیتا ہے** — OpenAI Chat Completions اسے قبول نہیں کرتا۔

## مزید دیکھیے

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — سرکٹ بریکرز، کول ڈاؤنز، ماڈل لاک آؤٹس
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — اپ اسٹریم 400 خرابیوں کی تشخیص
- ماخذ: `src/lib/db/reasoningCache.ts`، `open-sse/services/reasoningCache.ts`، `open-sse/translator/index.ts`
- مائیگریشن: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API روٹ: `src/app/api/cache/reasoning/route.ts`
- اصل مسئلہ: #1628
