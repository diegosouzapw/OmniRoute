# OpenCode Integration (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **وضعیت:** عموماً در دسترس.
> **مخاطب:** اپراتورهایی که OpenCode را به یک استقرار OmniRoute متصل میکنند.
> **منبع اصلی (طرحوارهٔ پیکربندی):** `src/shared/services/opencodeConfig.ts`
> **منبع اصلی (بستهٔ npm):** `@omniroute/opencode-provider/` (فضای کاری قابل انتشار)

[OpenCode](https://opencode.ai) یک کلاینت هوش مصنوعی عاملمحور برای CLI/دسکتاپ است. این کلاینت کاتالوگ ارائهدهندگان خود را از `~/.config/opencode/opencode.json` (یا `opencode.jsonc`) میخواند و از طرحوارهٔ موجود در `https://opencode.ai/config.json` پیروی میکند. OmniRoute خود را بهعنوان یکی از این ارائهدهندگان به OpenCode معرفی میکند — هر درخواست از سطح استاندارد سازگار با OpenAI در مسیر `/v1` متعلق به OmniRoute عبور میکند؛ بنابراین OpenCode بهطور خودکار از مسیریابی Auto-Combo، مدارشکنها، سیاستهای کلید، مشاهدهپذیری و موارد دیگر بهرهمند میشود.

**دو مسیر ادغام پشتیبانیشده** وجود دارد. یکی را انتخاب کنید — هر دو پیکربندی یکسانی تولید میکنند.

---

## مسیر ۱ — مولد CLI (بدون نصب npm)

برای کاربران نهایی توصیه میشود. همراه OmniRoute ارائه میشود. فایل `opencode.json` را در محل خود مینویسد.

```bash
# پس از نصب OmniRoute (npm i -g @omniroute/cli یا کلون محلی)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

در پشت صحنه، CLI تابع `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`) را فراخوانی میکند؛ بنابراین سایر ارائهدهندگان و توضیحات موجود در یک فایل `opencode.json` حفظ میشوند. ورودی OmniRoute بهصورت اتمی اضافه یا جایگزین میشود.

فایل حاصل (کاتالوگ مدل پیشفرض):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<کلید-شما>",
      },
      "models": {
        "claude-opus-4-5-thinking": { "name": "claude-opus-4-5-thinking" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3.1-pro-high": { "name": "gemini-3.1-pro-high" },
        "gemini-3-flash": { "name": "gemini-3-flash" },
      },
    },
  },
}
```

---

## مسیر ۲ — بستهٔ npm با نام `@omniroute/opencode-provider`

زمانی توصیه میشود که پیکربندی را با Node/TS اسکریپتنویسی میکنید (پایپلاینهای CI، مخازن یکپارچه، جریانهای نصبکنندهٔ سفارشی).

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // اختیاری: بازنویسی کاتالوگ مدل ارائهشده به OpenCode
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

برای ادغام غیرمخرب با یک فایل موجود، `mergeOpenCodeConfigText()` را از `opencodeConfig.ts` بازسازی کنید یا مولد CLI را فراخوانی کنید.

برای API کامل، [README بسته](../../@omniroute/opencode-provider/README.md) را ببینید.

---

## محیط اجرا واقعاً چه کاری انجام میدهد

هر دو مسیر مقدار یکسان `provider.omniroute.npm: "@ai-sdk/openai-compatible"` را تولید میکنند. در زمان اجرا، OpenCode بستهٔ `@ai-sdk/openai-compatible` (که از قبل یکی از وابستگیهای انتقالی OpenCode است) را بارگذاری و آن را با `baseURL` و `apiKey` پیکربندی میکند. از آنجا:

```
رابط کاربری/عامل OpenCode
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (سطح OpenAI متعلق به OmniRoute)
         → کنترلکنندهٔ OmniRoute /v1/chat/completions     (open-sse/handlers/chatCore.ts)
            → مسیریابی ترکیبی / Auto-Combo / اجراکننده
               → ارائهدهندهٔ بالادستی
```

افزونه هرگز مستقیماً با HTTP سروکار ندارد. فقط پیکربندی تولید میکند.

---

## پیشفرضهای کاتالوگ مدل

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

میتوانید با استفاده از `models: [...]` آن را بازنویسی کنید. موارد پیشنهادی برای افزودن:

- `"auto"` — مسیریاب بدون نیاز به پیکربندی [Auto-Combo](../routing/AUTO-COMBO.md) متعلق به OmniRoute را در دسترس قرار میدهد. به OpenCode اجازه میدهد بدون کدنویسی ثابت کاتالوگ، «بهترین مدل موجود» را انتخاب کند.
- `"<combo-name>"` — هر ترکیبی که در داشبورد تعریف کردهاید؛ OmniRoute آن را بهصورت شفاف تفکیک و پردازش میکند.

---

## نرمالسازی URL

این ابزار کمکی هر دو شکل را میپذیرد و دقیقاً یک `/v1` تولید میکند:

| ورودی                          | خروجی (`options.baseURL`)   |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

این حذف موارد تکراری، **رایجترین خرابی** مشاهدهشده در پیکربندیهای قدیمی است. اگر یک `opencode.json` مربوط به قبل از v3.8.0 دارید که به `/v1/v1/...` اشاره میکند، مولد را دوباره اجرا کنید یا بار دیگر `createOmniRouteProvider` را فراخوانی کنید.

---

## حالتهای احراز هویت

| تنظیم OmniRoute                            | مقدار پیشنهادی `apiKey`                                    |
| ------------------------------------------ | ---------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (پیشفرض برای محلی) | `sk_omniroute` (مقدار جاینگهدار تحتاللفظی)                 |
| `REQUIRE_API_KEY=true`                     | یک کلید API واقعی و مختص هر کاربر از Dashboard → API Keys. |

برای کلاینتهای سبک Anthropic که `x-api-key` و `anthropic-version` را ارسال میکنند، `extractApiKey` متعلق به OmniRoute کلید موجود در `x-api-key` را نیز میپذیرد. OpenCode از رابط OpenAI استفاده میکند، بنابراین همیشه `Authorization: Bearer ${apiKey}` را ارسال خواهد کرد — هیچ حالت خاصی برای Anthropic در اینجا اعمال نمیشود.

---

## عیبیابی

| نشانه                                                   | علت                                                                      | راهحل                                                                                                                   |
| ------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| خطای `404` در هر درخواست با URL حاوی `/v1/v1/`          | پیکربندی قدیمی افزونه پیش از v3.8 که `/v1` را دو بار اضافه میکرد.        | از طریق مسیر 1 یا 2 دوباره تولید کنید.                                                                                  |
| `401 Invalid API key`                                   | در OmniRoute مقدار `REQUIRE_API_KEY=true` است و کلید شناخته نمیشود.      | کلید را در داشبورد ایجاد کنید، یا فقط برای محیط محلی `REQUIRE_API_KEY=false` را تنظیم و از `sk_omniroute` استفاده کنید. |
| فهرست مدلها در رابط کاربری OpenCode خالی است            | هر 4 مدل پیشفرض در قابلیت مشاهده ارائهدهنده OmniRoute مخفی هستند.        | برای نمایش مدلهایی که فعال کردهاید، `models: ["auto", ...]` را ارسال کنید.                                              |
| خطای 500 در OpenCode با `cannot read property 'models'` | نسخههای قدیمیتر OpenCode (< 0.1.x) فیلد درونخطی `models` را نمیپذیرفتند. | OpenCode را به نسخهای ارتقا دهید که از طرحواره v1 (`opencode.ai/config.json`) پیروی میکند.                              |

---

## همچنین ببینید

- [مرجع API](../reference/API_REFERENCE.md) — پوشش کامل REST در OmniRoute
- [Auto-Combo](../routing/AUTO-COMBO.md) — معنای `model: "auto"`
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- منبع: `src/shared/services/opencodeConfig.ts`، `src/lib/cli-helper/config-generator/opencode.ts`، `@omniroute/opencode-provider/src/index.ts`
