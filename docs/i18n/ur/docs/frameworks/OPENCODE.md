# OpenCode Integration (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/OPENCODE.md) · 🇪🇹 [am](../../../am/docs/frameworks/OPENCODE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/OPENCODE.md) · 🇦🇿 [az](../../../az/docs/frameworks/OPENCODE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/OPENCODE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/OPENCODE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/OPENCODE.md) · 🇩🇰 [da](../../../da/docs/frameworks/OPENCODE.md) · 🇩🇪 [de](../../../de/docs/frameworks/OPENCODE.md) · 🇬🇷 [el](../../../el/docs/frameworks/OPENCODE.md) · 🇪🇸 [es](../../../es/docs/frameworks/OPENCODE.md) · 🇪🇪 [et](../../../et/docs/frameworks/OPENCODE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/OPENCODE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/OPENCODE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/OPENCODE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/OPENCODE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/OPENCODE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/OPENCODE.md) · 🇮🇱 [he](../../../he/docs/frameworks/OPENCODE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/OPENCODE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/OPENCODE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/OPENCODE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/OPENCODE.md) · 🇮🇩 [id](../../../id/docs/frameworks/OPENCODE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/OPENCODE.md) · 🇮🇹 [it](../../../it/docs/frameworks/OPENCODE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/OPENCODE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/OPENCODE.md) · 🇰🇭 [km](../../../km/docs/frameworks/OPENCODE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/OPENCODE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/OPENCODE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/OPENCODE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/OPENCODE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/OPENCODE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/OPENCODE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/OPENCODE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/OPENCODE.md) · 🇲🇲 [my](../../../my/docs/frameworks/OPENCODE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/OPENCODE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/OPENCODE.md) · 🇳🇴 [no](../../../no/docs/frameworks/OPENCODE.md) · 🇮🇳 [or](../../../or/docs/frameworks/OPENCODE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/OPENCODE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/OPENCODE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/OPENCODE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/OPENCODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/OPENCODE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/OPENCODE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/OPENCODE.md) · 🇱🇰 [si](../../../si/docs/frameworks/OPENCODE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/OPENCODE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/OPENCODE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/OPENCODE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/OPENCODE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/OPENCODE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/OPENCODE.md) · 🇮🇳 [te](../../../te/docs/frameworks/OPENCODE.md) · 🇹🇭 [th](../../../th/docs/frameworks/OPENCODE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/OPENCODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/OPENCODE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/OPENCODE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/OPENCODE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/OPENCODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/OPENCODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/OPENCODE.md)

---

> **حیثیت:** عمومی طور پر دستیاب۔
> **مخاطبین:** وہ آپریٹرز جو OpenCode کو OmniRoute کی تعیناتی سے مربوط کر رہے ہیں۔
> **حتمی ماخذ (کنفیگ اسکیما):** `src/shared/services/opencodeConfig.ts`
> **حتمی ماخذ (npm پیکیج):** `@omniroute/opencode-provider/` (شائع کیے جانے کے قابل workspace)

[OpenCode](https://opencode.ai) ایک ایجنٹ پر مبنی CLI/desktop AI کلائنٹ ہے۔ یہ اپنا provider catalog `~/.config/opencode/opencode.json` (یا `opencode.jsonc`) سے پڑھتا ہے اور `https://opencode.ai/config.json` پر موجود اسکیما کی پیروی کرتا ہے۔ OmniRoute خود کو OpenCode کے سامنے ان providers میں سے ایک کے طور پر پیش کرتا ہے — ہر درخواست OmniRoute کے معیاری OpenAI-compatible `/v1` انٹرفیس سے گزرتی ہے، اس لیے OpenCode خودکار طور پر Auto-Combo routing، circuit breakers، key policies، observability وغیرہ سے فائدہ اٹھاتا ہے۔

انضمام کے **دو معاونت یافتہ طریقے** ہیں۔ کسی ایک کو منتخب کریں — دونوں ایک جیسا کنفیگ تیار کرتے ہیں۔

---

## طریقہ 1 — CLI generator (npm install کے بغیر)

آخری صارفین کے لیے تجویز کردہ۔ OmniRoute کے ساتھ شامل ہوتا ہے۔ `opencode.json` کو اسی جگہ تحریر کرتا ہے۔

```bash
# OmniRoute انسٹال کرنے کے بعد (npm i -g @omniroute/cli یا local clone)
omniroute config opencode \
  --base-url http://localhost:20128 \
  --api-key "$OMNIROUTE_API_KEY"
```

پسِ پردہ CLI، `mergeOpenCodeConfigText()` (`src/shared/services/opencodeConfig.ts:104`) کو کال کرتا ہے، لہٰذا موجودہ `opencode.json` اپنے دیگر providers اور comments برقرار رکھتا ہے۔ OmniRoute entry کو یک جوہری انداز میں شامل/تبدیل کیا جاتا ہے۔

نتیجے میں بننے والی فائل (ڈیفالٹ model catalog):

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "<your-key>",
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

## طریقہ 2 — npm پیکیج `@omniroute/opencode-provider`

اس وقت تجویز کردہ جب آپ Node/TS سے کنفیگ کو اسکرپٹ کر رہے ہوں (CI pipelines، monorepos، حسبِ ضرورت installer flows)۔

```bash
npm install --save-dev @omniroute/opencode-provider
```

```ts
import { writeFileSync } from "node:fs";
import { buildOmniRouteOpenCodeConfig } from "@omniroute/opencode-provider";

const config = buildOmniRouteOpenCodeConfig({
  baseURL: "http://localhost:20128",
  apiKey: process.env.OMNIROUTE_API_KEY ?? "sk_omniroute",
  // اختیاری: OpenCode کے سامنے پیش کیے جانے والے model catalog کو override کریں
  models: ["auto", "claude-opus-4-7", "gpt-5.5"],
  modelLabels: { auto: "Auto-Combo" },
});

writeFileSync("opencode.json", JSON.stringify(config, null, 2));
```

موجودہ فائل کے ساتھ غیر تباہ کن merge کے لیے، `opencodeConfig.ts` سے `mergeOpenCodeConfigText()` کو نقل کریں یا CLI generator کو کال کریں۔

مکمل API کے لیے [پیکیج README](../../@omniroute/opencode-provider/README.md) دیکھیں۔

---

## runtime درحقیقت کیا کرتا ہے

دونوں طریقے ایک ہی `provider.omniroute.npm: "@ai-sdk/openai-compatible"` تیار کرتے ہیں۔ runtime پر، OpenCode، `@ai-sdk/openai-compatible` کو لوڈ کرتا ہے (جو پہلے ہی OpenCode کی ایک transitive dependency ہے) اور اسے `baseURL` + `apiKey` کے ساتھ کنفیگر کرتا ہے۔ اس کے بعد:

```
OpenCode UI/agent
   → @ai-sdk/openai-compatible
      → HTTP POST {baseURL}/chat/completions          (OmniRoute کا OpenAI انٹرفیس)
         → OmniRoute /v1/chat/completions handler     (open-sse/handlers/chatCore.ts)
            → combo routing / Auto-Combo / executor
               → upstream provider
```

plugin کبھی بھی HTTP سے براہِ راست تعامل نہیں کرتا۔ یہ صرف configuration خارج کرتا ہے۔

---

## ماڈل کیٹلاگ کی طے شدہ اقدار

```ts
export const OMNIROUTE_DEFAULT_OPENCODE_MODELS = [
  "claude-opus-4-5-thinking",
  "claude-sonnet-4-5-thinking",
  "gemini-3.1-pro-high",
  "gemini-3-flash",
] as const;
```

آپ `models: [...]` کے ذریعے انہیں تبدیل کر سکتے ہیں۔ تجویز کردہ اضافے:

- `"auto"` — OmniRoute کا [Auto-Combo](../routing/AUTO-COMBO.md) بغیر کنفیگریشن والا راؤٹر دستیاب کرتا ہے۔ یہ آپ کو کیٹلاگ کو ہارڈ کوڈ کیے بغیر OpenCode کو "بہترین دستیاب ماڈل" منتخب کرنے دیتا ہے۔
- `"<combo-name>"` — کوئی بھی کومبو جس کی آپ نے ڈیش بورڈ میں تعریف کی ہو؛ OmniRoute اسے شفاف طریقے سے حل کرتا ہے۔

---

## URL کی نارملائزیشن

یہ ہیلپر دونوں صورتیں قبول کرتا ہے اور بالکل ایک `/v1` بناتا ہے:

| ان پٹ                          | آؤٹ پٹ (`options.baseURL`)  |
| ------------------------------ | --------------------------- |
| `http://localhost:20128`       | `http://localhost:20128/v1` |
| `http://localhost:20128/`      | `http://localhost:20128/v1` |
| `http://localhost:20128/v1`    | `http://localhost:20128/v1` |
| `http://localhost:20128/v1///` | `http://localhost:20128/v1` |

یہ تکرار ختم کرنا پرانی کنفیگریشنز میں نظر آنے والی **سب سے عام خرابی** ہے۔ اگر آپ کے پاس v3.8.0 سے پہلے کی کوئی `opencode.json` فائل ہے جو `/v1/v1/...` کی طرف اشارہ کرتی ہے، تو جنریٹر دوبارہ چلائیں یا `createOmniRouteProvider` کو دوبارہ کال کریں۔

---

## توثیق کے طریقے

| OmniRoute کی ترتیب                           | تجویز کردہ `apiKey` قدر                                  |
| -------------------------------------------- | -------------------------------------------------------- |
| `REQUIRE_API_KEY=false` (لوکل کے لیے طے شدہ) | `sk_omniroute` (لفظی پلیس ہولڈر)                         |
| `REQUIRE_API_KEY=true`                       | ڈیش بورڈ → API Keys سے حاصل کردہ حقیقی فی صارف API کلید۔ |

Anthropic طرز کے ایسے کلائنٹس کے لیے جو `x-api-key` + `anthropic-version` بھیجتے ہیں، OmniRoute کا `extractApiKey` بھی `x-api-key` سے کلید قبول کرتا ہے۔ OpenCode، OpenAI انٹرفیس استعمال کرتا ہے، اس لیے یہ ہمیشہ `Authorization: Bearer ${apiKey}` بھیجے گا — یہاں Anthropic کے لیے کوئی خصوصی صورت لاگو نہیں ہوتی۔

---

## خرابیوں کا ازالہ

| علامت                                                | وجہ                                                                       | حل                                                                                                        |
| ---------------------------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `/v1/v1/` والے URL کی ہر درخواست پر `404`            | v3.8 سے پہلے کے پلگ اِن کی فرسودہ کنفیگریشن، جس نے `/v1` دو بار شامل کیا۔ | طریقہ 1 یا 2 کے ذریعے دوبارہ جنریٹ کریں۔                                                                  |
| `401 Invalid API key`                                | OmniRoute میں `REQUIRE_API_KEY=true` ہے اور کلید نامعلوم ہے۔              | ڈیش بورڈ میں کلید بنائیں، یا `REQUIRE_API_KEY=false` (صرف لوکل) سیٹ کریں اور `sk_omniroute` استعمال کریں۔ |
| OpenCode UI میں ماڈلز کی فہرست خالی ہے               | تمام 4 طے شدہ ماڈلز OmniRoute کی پرووائیڈر ویزیبلٹی میں پوشیدہ ہیں۔       | اپنے فعال کردہ ماڈلز ظاہر کرنے کے لیے `models: ["auto", ...]` پاس کریں۔                                   |
| `cannot read property 'models'` کے ساتھ OpenCode 500 | پرانے OpenCode (< 0.1.x) میں اِن لائن `models` قبول نہیں کیے جاتے تھے۔    | OpenCode کو ایسے ورژن پر اپ گریڈ کریں جو v1 اسکیما (`opencode.ai/config.json`) کی پیروی کرتا ہو۔          |

---

## مزید دیکھیں

- [API حوالہ](../reference/API_REFERENCE.md) — مکمل OmniRoute REST سطح
- [Auto-Combo](../routing/AUTO-COMBO.md) — `model: "auto"` کا مطلب
- [`@omniroute/opencode-provider` README](../../@omniroute/opencode-provider/README.md)
- ماخذ: `src/shared/services/opencodeConfig.ts`، `src/lib/cli-helper/config-generator/opencode.ts`، `@omniroute/opencode-provider/src/index.ts`
