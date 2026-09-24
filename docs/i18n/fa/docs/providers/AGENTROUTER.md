# AgentRouter Setup Guide (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) یک رله سازگار با Anthropic است که Claude و مدلهای دیگر را، اغلب با قیمتهایی پایینتر از API مستقیم Anthropic، بازفروش میکند. این سرویس بهعنوان جایگزینی مستقیم برای `ANTHROPIC_BASE_URL` در کلاینت رسمی Claude Code طراحی شده است؛ بنابراین فقط ترافیکی را میپذیرد که با الگوی ارتباطی Claude Code مطابقت داشته باشد (User-Agent مشخص، فلگهای `anthropic-beta`، هدرهای Stainless SDK و غیره).

## شروع سریع — استفاده از ارائهدهنده بومی `agentrouter` (توصیهشده)

برای اکثر کاربران، **هیچ راهاندازی ویژهای لازم نیست**. OmniRoute با یک ارائهدهنده داخلی `agentrouter` عرضه میشود که الگوی ارتباطی کامل Claude Code از قبل در آن تعبیه شده است (`open-sse/config/providerRegistry.ts` ← `agentrouter`). برای استفاده از آن:

1. به **داشبورد ← ارائهدهندگان ← افزودن ارائهدهنده** بروید.
2. از فهرست، **AgentRouter** را انتخاب کنید.
3. کلید API خود با قالب `sk-...` را وارد کرده و ذخیره کنید.

تمام شد — نیازی به متغیر محیطی یا نوع ارائهدهنده سفارشی نیست. مدلهای داخلی شامل `claude-opus-4-6`، `claude-haiku-4-5-20251001`، `glm-5.1` و `deepseek-v3.2` هستند.

ادامه این راهنما، **روش پیشرفته** را پوشش میدهد: استفاده از نوع ارائهدهنده `anthropic-compatible-cc-*`. زمانی از آن استفاده کنید که به کنترل بیشتری روی الگوی ارتباطی نیاز دارید — برای مثال، هنگام اتصال به رلههای دیگری مشابه AgentRouter که هنوز در رجیستری بومی ارائهدهندگان وجود ندارند، یا زمانی که میخواهید URL پایه، مسیر چت یا مجموعه هدرها را بازنویسی کنید.

---

## پیشرفته: اتصال از طریق نوع ارائهدهنده سازگار با Claude Code

OmniRoute همچنین از AgentRouter (و رلههای مشابه) از طریق نوع ارائهدهنده **سازگار با Claude Code** (`anthropic-compatible-cc-*`) پشتیبانی میکند که با الگوی ارتباطی صحیح، از Anthropic Messages API استفاده میکند. یک ارائهدهنده عمومی `openai-compatible-chat` که به `https://agentrouter.org` اشاره کند، **کار نخواهد کرد** — WAF بالادستی درخواستهایی را که شبیه Claude Code نباشند رد میکند.

---

## پیشنیازها

- یک حساب AgentRouter و کلید API. ثبتنامهای جدید از طریق لینک همکاری در [README](../README.md) اعتبار رایگان دریافت میکنند.
- اجرای OmniRoute با فعال بودن فلگ قابلیت `ENABLE_CC_COMPATIBLE_PROVIDER` (بخش زیر را ببینید).

## 1. فعالسازی نوع ارائهدهنده سازگار با CC

نوع ارائهدهنده سازگار با Claude Code پشت یک فلگ قابلیت قرار دارد، زیرا ترافیکی ارسال میکند که شباهت زیادی به کلاینت رسمی Claude Code دارد. برای فعالسازی آن، پیش از شروع OmniRoute یک متغیر محیطی تنظیم کنید:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

نمونه Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

پس از راهاندازی مجدد، داشبورد علاوه بر فرایندهای موجودِ سازگار با OpenAI و سازگار با Anthropic، گزینه **افزودن ارائهدهنده سازگار با Claude Code** را نیز نمایش میدهد.

## 2. ایجاد ارائهدهنده در داشبورد

1. به **داشبورد ← ارائهدهندگان ← افزودن ارائهدهنده** بروید.
2. گزینه **افزودن ارائهدهنده سازگار با Claude Code** را انتخاب کنید (فقط زمانی قابل مشاهده است که فلگ بالا تنظیم شده باشد).
3. فیلدها را تکمیل کنید:

| فیلد     | مقدار                                                                     |
| -------- | ------------------------------------------------------------------------- |
| نام      | `AgentRouter` (یا هر برچسب دیگری)                                         |
| پیشوند   | `agentrouter` (نام مستعار خوانا که در گزارشها و داشبورد نمایش داده میشود) |
| URL پایه | `https://agentrouter.org`                                                 |
| مسیر چت  | `/v1/messages?beta=true` (پیشفرض — بدون تغییر باقی بگذارید)               |

> شناسه متعارف مدل همچنان از شناسه کامل گره ارائهدهنده استفاده میکند
> (`anthropic-compatible-cc-{uuid}/{model}`). **پیشوند** صرفاً یک نام مستعار نمایشی
> است که برای خواناتر شدن خروجی گزارشها توسط `src/lib/usage/callLogs.ts` تفکیک میشود.

4. (اختیاری) کلید API خود را در فیلد **اعتبارسنجی** وارد کرده و روی **بررسی** کلیک کنید تا پیش از ذخیره، اتصال تأیید شود.
5. روی **افزودن** کلیک کنید.

پس از ایجاد، ارائهدهنده را باز کرده و با کلید API مربوط به AgentRouter خود (`sk-...`) یک **اتصال** اضافه کنید. مقدار `test_status` اتصال باید به `active` تغییر کند.

## 3. استفاده از آن از طریق یک ترکیب یا بهصورت مستقیم

با استفاده از پیشوند ارائهدهندهتان بهعنوان فضای نام، به مدل ارجاع دهید:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

شناسهٔ متعارف مدل `anthropic-compatible-cc-{uuid}/claude-opus-4-6` نیز کار میکند
و همان چیزی است که در پایگاه داده و پیکربندی ترکیب نمایش داده میشود.

یا آن را مانند هر ارائهدهندهٔ دیگری برای مسیریابی، جایگزینی در صورت خطا و مدیریت سهمیه
به یک ترکیب اضافه کنید.

---

## جزئیات الگوی ترافیک شبکه

برای مرجع، پل سازگار با cc در هر درخواست بالادستی موارد زیر را ارسال میکند
(به `open-sse/services/claudeCodeCompatible.ts` مراجعه کنید):

| هدر                                         | مقدار                                                                                                         |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `Authorization`                             | `Bearer <api-key>`                                                                                            |
| `User-Agent`                                | `claude-cli/2.1.258 (external, sdk-cli)`                                                                      |
| `anthropic-version`                         | `2023-06-01`                                                                                                  |
| `anthropic-beta`                            | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                      |
| کلید بتای redact-thinking برای هر اتصال     | برای بالادستهایی که مشخصاً به جریانهای تفکر ویرایششده نیاز دارند، `redact-thinking-2026-02-12` را اضافه میکند |
| کلید تفکر خلاصهشده برای هر اتصال            | به درخواستهای تفکر CC Compatible که از قبل حالت نمایش تعیین نکردهاند، `display: "summarized"` را اضافه میکند  |
| `anthropic-dangerous-direct-browser-access` | `true`                                                                                                        |
| `x-app`                                     | `cli`                                                                                                         |
| `X-Stainless-*`                             | هدرهای گوناگون SDK مربوط به Stainless (زبان، نسخهٔ بسته، سیستمعامل، معماری و غیره)                            |

این همان چیزی است که به درخواستها اجازه میدهد از WAF / فهرست مجاز کلاینتِ بالادست عبور کنند.

---

## عیبیابی

**`{"error":{"message":"unauthorized client detected, ..."}}`** — درخواست شما با
الگوی ترافیک شبکهٔ Claude Code مطابقت نداشت. این اتفاق زمانی رخ میدهد که ارائهدهنده
بهجای `anthropic-compatible-cc` بهصورت `openai-compatible-chat` پیکربندی شده باشد،
یا فلگ `ENABLE_CC_COMPATIBLE_PROVIDER=true` هنگام راهاندازی تنظیم نشده باشد.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
«توکن نامعتبر است». الگوی ترافیک شبکه صحیح است، اما کلید API رد شده است. در داشبورد
AgentRouter یک کلید جدید ایجاد کرده و اتصال را بهروزرسانی کنید.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — هوک نظارت محتوای AgentRouter محتوای درخواست را رد کرده است، یا
طرح کلید اجازهٔ استفاده از مدل درخواستی را نمیدهد. یک پرامپت یا مدل دیگر را امتحان کنید؛
اگر یک پرامپت بیضرر دائماً مسدود میشود، با پشتیبانی AgentRouter تماس بگیرید.

**`[400]: content-blocked` فقط در مدلهای خاص** — بیشتر طرحهای AgentRouter فقط
زیرمجموعهای از مدلها را مجاز میدانند (برای مثال `claude-opus-4-6`). شناسههای مدل دیگر،
با وجود معتبر بودن کلید، `unauthorized_client_error` برمیگردانند. در داشبورد
AgentRouter بررسی کنید که طرح شما کدام مدلها را پوشش میدهد.

**`Invalid JSON response from provider (reset after Ns)` در لاگهای omniroute** —
بالادست بدنهای غیر JSON برگردانده است (معمولاً یک صفحهٔ خطای HTML از WAF).
این وضعیت معمولاً به این معناست که درخواست هرگز به بکاند AgentRouter نرسیده است — دوباره
بررسی کنید که شناسهٔ ارائهدهنده با `anthropic-compatible-cc-` شروع میشود (به خط تیرهٔ
انتهایی توجه کنید — `CLAUDE_CODE_COMPATIBLE_PREFIX` را در
`open-sse/services/claudeCodeCompatible.ts` ببینید) و فلگ قابلیت فعال است.

**`unauthorized client detected` / صفحهٔ خطای HTML با وجود اینکه یک ارائهدهندهٔ
AgentRouter از قبل وجود دارد** — احتمالاً **بیش از یک** ارائهدهندهٔ AgentRouter دارید
و درخواست شما به ارائهدهندهٔ اشتباه میرسد. اگر یک ارائهدهندهٔ دستیِ باقیمانده از نوع
`anthropic-compatible-*` (غیر از `cc`) یا `openai-compatible-chat-*` با پیشوند
`agentrouter` ایجاد شده باشد، ممکن است مالک شناسههای مدل `agentrouter/<model>` شود
(و ترکیبها نیز ممکن است با شناسهٔ گره به آن ارجاع دهند)، بنابراین ترافیک به آن ارائهدهنده
هدایت میشود — که یک User-Agent عمومی ارسال میکند و رد میشود — نه به ارائهدهندهٔ
داخلی `agentrouter` که از قبل با الگوی صحیح ترافیک شبکه ارائه میشود. در لاگهای
omniroute بررسی کنید که مدل واقعاً به کجا نگاشت میشود (تگ `ROUTING` مقدار
`agentrouter/<model> → <providerId>/<model>` را نشان میدهد)؛ اگر `<providerId>`
برابر با `agentrouter` نیست، همهچیز را روی ارائهدهندهٔ بومی یکپارچه کنید: ترکیبها را
به `agentrouter/<model>` (با providerId برابر با `agentrouter`) متصل کرده و
ارائهدهندگان سازگارِ تکراری را حذف کنید. ارائهدهندهٔ بومی به هیچگونه پیکربندی الگوی
ترافیک شبکه و هیچ `customUserAgent` نیاز ندارد.

---

## همچنین ببینید

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — یادداشتهای یکپارچهسازی ارائهدهنده Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — فهرست ارائهدهندگان دارای
  سطح رایگان
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — پیادهسازی انتقال تصویر
