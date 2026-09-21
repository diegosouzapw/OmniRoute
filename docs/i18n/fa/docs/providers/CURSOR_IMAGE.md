# Cursor Image Generation (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute قابلیت **تولید تصویر** در پلن Cursor را از طریق `POST /v1/images/generations` و با همان شناسه ارائهدهنده چت ارائه میکند: `cursor` (نام مستعار `cu`).

| فیلد                    | مقدار                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------- |
| شناسه `IMAGE_PROVIDERS` | `cursor`                                                                                      |
| قالب                    | `cursor-agent-image`                                                                          |
| احراز هویت              | همان اتصال OAuth / کلید API مورد استفاده برای چت (`provider_connections.provider = "cursor"`) |
| مدلها                   | `cursor/auto`، `cursor/composer-2`، `cursor/composer-2.5`                                     |

## چرا Agent CLI

چت Cursor در OmniRoute از `agent.v1.AgentService/Run` (protobuf) استفاده میکند. این مسیر ابزارهای داخلی کلاینت (shell، write، …) را **رد میکند**. تولید تصویر یک ابزار بومی Cursor است که توسط **CLI به نام `agent`** و با استفاده از seat اجرا میشود. بنابراین، هندلر تصویر `agent` را با یک پرامپت قفلشده و یک فضای کاری موقت برای هر درخواست اجرا میکند (با همان ساختار بریجهای seat جامعه) و سپس `b64_json` سازگار با OpenAI را برمیگرداند.

## محدودیت دسترسی (قواعد قطعی #15 + #17)

این تنها قالب `IMAGE_PROVIDERS` است که یک فرایند فرزند (باینری `agent`) را اجرا میکند. از آنجا که `POST /v1/images/generations` بین حدود ۴۰ ارائهدهنده دیگر تصویر که فرایند اجرا نمیکنند و فراخوانهای راهدور بهطور مجاز از آنها استفاده میکنند مشترک است، کل این مسیر در دسته `LOCAL_ONLY` طبقهبندی **نمیشود** — در عوض، `handleCursorAgentImageGeneration` گیت اختصاصی خود را با استفاده از نتیجه قابلاعتماد `AUTHZ_HEADER_PEER_LOCALITY` اعمال میکند که پایپلاین authz روی هر درخواست درج میکند (بر اساس همتای واقعی TCP، نه هدر جعلپذیر `Host`): فقط فراخوانهای `loopback` و `lan` میتوانند به اجرای فرایند دسترسی پیدا کنند؛ تمام موارد دیگر (از جمله کلید API افشاشدهای که از طریق یک تونل عمومی بازپخش شده باشد) پیش از هرگونه جستوجوی اعتبارنامه یا اجرای فرایند، پاسخ `403` دریافت میکنند. برای مشاهده همین سیاست که بر سایر بخشهای سطح `LOCAL_ONLY` اعمال شده است، به `src/server/authz/policies/management.ts` مراجعه کنید.

## گیت همزمانی در سطح ماژول است (محدودیت تکنمونهای)

`CURSOR_IMG_MAX_CONCURRENT` توسط یک شمارنده/صف درونحافظهای و محدود به نمونه ماژول Node (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`) اعمال میشود. این سازوکار تعداد اجرای همزمان `agent` را درون یک فرایند OmniRoute بهدرستی محدود میکند، اما بین چندین فرایند/نمونه که از یک seat مشترک Cursor استفاده میکنند (برای مثال، یک استقرار چندرپلیکایی) هماهنگی ایجاد **نمیکند** — هر نمونه محدودیت مستقل خود را اعمال میکند. برای استقرار تکنمونهای (حالت پیشفرض)، این محدودیت دقیق است؛ استقرارهای مقیاسپذیریافته افقی باید مقدار `CURSOR_IMG_MAX_CONCURRENT` را در هر نمونه محافظهکارانه نگه دارند یا ترافیک تصویر Cursor را به یک نمونه واحد هدایت کنند.

## الزامات

1. یک حساب Cursor متصلشده در داشبورد (OAuth یا کلید API با قالب `crsr_…`).
2. در دسترس بودن باینری Cursor Agent برای فرایند OmniRoute:
   - متغیر محیطی `CURSOR_AGENT_BIN=/path/to/agent`، یا
   - `~/.local/bin/agent`، یا
   - `providerSpecificData.agentBin` در اتصال Cursor.

تنظیمات اختیاری:

| متغیر محیطی                 | پیشفرض                 | مفهوم                             |
| --------------------------- | ---------------------- | --------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`               | محدودیت زمانی واقعی برای هر تصویر |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                    | گیت همزمانی برای seat مشترک       |
| `CURSOR_IMG_MODEL`          | (مدل درخواست / `auto`) | بازنویسی `--model` در CLI         |

## مثال

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

تولید تصویر معمولاً ۱ تا ۲ دقیقه طول میکشد. استفاده از یک مسیر شبکه داخلی توصیه میشود؛ پراکسیهای لبه با مهلت زمانی حدود ۱۰۰ ثانیه ناموفق خواهند بود.

## LiteLLM

یک مدل تصویر را با `mode: image_generation`،‏ `api_base: http://omniroute:20128/v1` و `model: openai/cursor/auto` (یا صرفاً `cursor/auto`، بسته به نسخه LiteLLM شما) ثبت کنید.
