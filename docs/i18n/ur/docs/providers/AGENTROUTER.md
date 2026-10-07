# AgentRouter Setup Guide (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) ایک Anthropic سے مطابقت رکھنے والا ریلے ہے جو
Claude اور دیگر ماڈلز کو دوبارہ فروخت کرتا ہے، اکثر براہِ راست Anthropic API سے کم قیمتوں پر۔ اسے
آفیشل Claude Code کلائنٹ کے لیے ایک ڈراپ اِن `ANTHROPIC_BASE_URL` متبادل کے طور پر
ڈیزائن کیا گیا ہے، اس لیے یہ صرف ایسی ٹریفک قبول کرتا ہے جو Claude Code وائر امیج سے مطابقت رکھتی ہو (مخصوص
User-Agent، `anthropic-beta` فلیگز، Stainless SDK ہیڈرز وغیرہ)۔

## فوری آغاز — مقامی `agentrouter` پرووائیڈر استعمال کریں (تجویز کردہ)

زیادہ تر صارفین کے لیے **کسی خاص سیٹ اپ کی ضرورت نہیں ہے**۔ OmniRoute ایک بلٹ اِن
`agentrouter` پرووائیڈر کے ساتھ آتا ہے جس میں مکمل Claude Code وائر امیج پہلے ہی شامل ہے (دیکھیں
`open-sse/config/providerRegistry.ts` → `agentrouter`)۔ اسے استعمال کرنے کے لیے:

1. **Dashboard → Providers → Add Provider** کھولیں۔
2. فہرست سے **AgentRouter** منتخب کریں۔
3. اپنی `sk-...` API کلید پیسٹ کریں اور محفوظ کریں۔

بس اتنا ہی — نہ کسی انوائرمنٹ ویری ایبل کی ضرورت ہے، نہ کسی کسٹم پرووائیڈر ٹائپ کی۔ بلٹ اِن ماڈلز میں
`claude-opus-4-6`، `claude-haiku-4-5-20251001`، `glm-5.1`، اور
`deepseek-v3.2` شامل ہیں۔

اس گائیڈ کا باقی حصہ **ایڈوانسڈ طریقے** کا احاطہ کرتا ہے: یعنی
`anthropic-compatible-cc-*` پرووائیڈر ٹائپ کا استعمال۔ اسے اس وقت استعمال کریں جب آپ کو وائر امیج پر زیادہ کنٹرول
درکار ہو — مثلاً جب آپ AgentRouter طرز کے ایسے دیگر ریلے سے منسلک ہو رہے ہوں
جو ابھی مقامی پرووائیڈر رجسٹری میں موجود نہ ہوں، یا جب آپ
بیس URL، چیٹ پاتھ، یا ہیڈر سیٹ کو اوور رائیڈ کرنا چاہتے ہوں۔

---

## ایڈوانسڈ: Claude Code سے مطابقت رکھنے والی پرووائیڈر ٹائپ کے ذریعے منسلک ہونا

OmniRoute، AgentRouter (اور اسی طرح کے ریلے) کو **Claude Code
سے مطابقت رکھنے والی** پرووائیڈر ٹائپ (`anthropic-compatible-cc-*`) کے ذریعے بھی سپورٹ کرتا ہے، جو درست
وائر امیج کے ساتھ Anthropic Messages API استعمال کرتی ہے۔ `https://agentrouter.org` کی طرف اشارہ کرنے والا عمومی
`openai-compatible-chat` پرووائیڈر **کام نہیں کرے گا** — اپ اسٹریم WAF ایسی درخواستوں کو مسترد کر دیتا ہے جو Claude
Code جیسی نظر نہ آئیں۔

---

## پیشگی تقاضے

- ایک AgentRouter اکاؤنٹ اور API کلید۔ نئے سائن اپس کو پروجیکٹ کی [README](../README.md) میں موجود افیلی ایٹ
  لنک کے ذریعے مفت کریڈٹس ملتے ہیں۔
- OmniRoute کا `ENABLE_CC_COMPATIBLE_PROVIDER` فیچر فلیگ فعال کر کے چلنا
  (ذیل میں دیکھیں)۔

## 1. CC سے مطابقت رکھنے والی پرووائیڈر ٹائپ فعال کریں

Claude Code سے مطابقت رکھنے والی پرووائیڈر ٹائپ کو ایک فیچر فلیگ کے پیچھے رکھا گیا ہے کیونکہ یہ
ایسی ٹریفک بھیجتی ہے جو آفیشل Claude Code کلائنٹ سے بہت زیادہ مشابہت رکھتی ہے۔ OmniRoute شروع کرنے سے پہلے
ایک انوائرمنٹ ویری ایبل سیٹ کر کے اسے فعال کریں:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker کی مثال:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

دوبارہ شروع کرنے کے بعد، ڈیش بورڈ موجودہ OpenAI سے مطابقت رکھنے والے اور Anthropic سے مطابقت رکھنے والے فلو کے
علاوہ **Add Claude Code Compatible** کا آپشن دکھاتا ہے۔

## 2. ڈیش بورڈ میں پرووائیڈر بنائیں

1. **Dashboard → Providers → Add Provider** کھولیں۔
2. **Add Claude Code Compatible** منتخب کریں (صرف اس وقت نظر آتا ہے جب اوپر دیا گیا فلیگ سیٹ ہو)۔
3. فیلڈز پُر کریں:

| فیلڈ     | قدر                                                             |
| -------- | --------------------------------------------------------------- |
| نام      | `AgentRouter` (یا کوئی بھی لیبل)                                |
| سابقہ    | `agentrouter` (لاگز اور ڈیش بورڈ میں دکھایا جانے والا آسان عرف) |
| بیس URL  | `https://agentrouter.org`                                       |
| چیٹ پاتھ | `/v1/messages?beta=true` (ڈیفالٹ — اسے جوں کا توں رہنے دیں)     |

> بنیادی ماڈل شناخت کنندہ اب بھی مکمل پرووائیڈر نوڈ ID استعمال کرتا ہے
> (`anthropic-compatible-cc-{uuid}/{model}`)۔ **سابقہ** صرف ایک ڈسپلے
> عرف ہے جسے `src/lib/usage/callLogs.ts` زیادہ آسان لاگ آؤٹ پٹ کے لیے ریزولو کرتا ہے۔

4. (اختیاری) محفوظ کرنے سے پہلے کنیکٹیویٹی کی تصدیق کرنے کے لیے اپنی API کلید **Validate** فیلڈ میں پیسٹ کریں اور **Check** پر
   کلک کریں۔
5. **Add** پر کلک کریں۔

بن جانے کے بعد، پرووائیڈر کھولیں اور اپنی AgentRouter API
کلید (`sk-...`) کے ساتھ ایک **Connection** شامل کریں۔ کنکشن کا `test_status` بدل کر `active` ہو جانا چاہیے۔

## 3. اسے کومبو کے ذریعے یا براہِ راست استعمال کریں

اپنے فراہم کنندہ کے سابقے کو namespace کے طور پر استعمال کرتے ہوئے ماڈل کا حوالہ دیں:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

کینونیکل ماڈل ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6` بھی کام کرتی ہے
اور یہی database اور combo configuration میں دکھائی دیتی ہے۔

یا دیگر تمام فراہم کنندگان کی طرح routing، fallback، اور quota management کے لیے
اسے کسی combo میں شامل کریں۔

---

## وائر امیج کی تفصیلات

حوالے کے لیے، cc-compatible bridge ہر upstream درخواست کے ساتھ درج ذیل بھیجتا ہے
(`open-sse/services/claudeCodeCompatible.ts` دیکھیں):

| Header                                      | Value                                                                                                               |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                             | `Bearer <api-key>`                                                                                                  |
| `User-Agent`                                | `claude-cli/2.1.258 (external, sdk-cli)`                                                                            |
| `anthropic-version`                         | `2023-06-01`                                                                                                        |
| `anthropic-beta`                            | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                            |
| فی connection redact-thinking beta toggle   | ان upstreams کے لیے `redact-thinking-2026-02-12` شامل کرتا ہے جنہیں بالخصوص redacted thinking streams درکار ہوں     |
| فی connection summarized thinking toggle    | ان CC Compatible thinking درخواستوں میں `display: "summarized"` شامل کرتا ہے جن میں پہلے سے display mode مقرر نہ ہو |
| `anthropic-dangerous-direct-browser-access` | `true`                                                                                                              |
| `x-app`                                     | `cli`                                                                                                               |
| `X-Stainless-*`                             | مختلف Stainless SDK headers (زبان، package version، OS، architecture وغیرہ)                                         |

یہی درخواستوں کو upstream WAF / client whitelist سے گزرنے کے قابل بناتا ہے۔

---

## خرابیوں کا ازالہ

**`{"error":{"message":"unauthorized client detected, ..."}}`** — آپ کی درخواست
Claude Code وائر امیج سے مطابقت نہیں رکھتی تھی۔ ایسا اس وقت ہوتا ہے جب فراہم کنندہ کو
`anthropic-compatible-cc` کے بجائے `openai-compatible-chat` کے طور پر configure کیا
گیا ہو، یا startup کے وقت `ENABLE_CC_COMPATIBLE_PROVIDER=true` flag مقرر نہ کیا گیا ہو۔

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"غلط token"۔ وائر امیج درست ہے لیکن API key مسترد کر دی گئی ہے۔ AgentRouter
dashboard میں نئی key بنائیں اور connection کو update کریں۔

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter کے moderation hook نے درخواست کا مواد مسترد کر دیا، یا
key کا plan مطلوبہ ماڈل کی اجازت نہیں دیتا۔ کوئی مختلف prompt یا model آزمائیں؛
اگر کوئی بے ضرر prompt مسلسل block ہو رہا ہو تو AgentRouter support سے رابطہ کریں۔

**صرف مخصوص ماڈلز پر `[400]: content-blocked`** — زیادہ تر AgentRouter plans صرف
ماڈلز کے ایک ذیلی مجموعے (مثلاً `claude-opus-4-6`) کی اجازت دیتے ہیں۔ دیگر model IDs
درست key کے باوجود `unauthorized_client_error` واپس کرتی ہیں۔ AgentRouter
dashboard میں دیکھیں کہ آپ کے plan میں کون سے ماڈلز شامل ہیں۔

**omniroute logs سے `Invalid JSON response from provider (reset after Ns)`** —
upstream نے non-JSON body واپس کی (عموماً WAF کی جانب سے HTML error page)۔
اس کا عام طور پر مطلب ہے کہ درخواست کبھی AgentRouter backend تک پہنچی ہی نہیں — دوبارہ
تصدیق کریں کہ provider ID کا آغاز `anthropic-compatible-cc-` سے ہوتا ہے (آخر میں آنے
والے dash پر توجہ دیں — `open-sse/services/claudeCodeCompatible.ts` میں
`CLAUDE_CODE_COMPATIBLE_PREFIX` دیکھیں) اور feature flag فعال ہے۔

**AgentRouter provider پہلے سے موجود ہونے کے باوجود `unauthorized client detected`
/ HTML error page** — ممکنہ طور پر آپ کے پاس **ایک سے زیادہ** AgentRouter providers
ہیں اور آپ کی درخواست غلط provider تک پہنچ رہی ہے۔ اگر `agentrouter` prefix کے ساتھ
کوئی بچا ہوا دستی طور پر بنایا گیا `anthropic-compatible-*` (غیر-`cc`) یا
`openai-compatible-chat-*` provider موجود ہے، تو وہ `agentrouter/<model>` model
IDs کا مالک بن سکتا ہے (اور combos اسے node ID کے ذریعے refer کر سکتے ہیں)، لہٰذا
traffic built-in `agentrouter` provider کے بجائے اس provider کی طرف route ہوتا ہے —
جو عمومی User-Agent بھیجتا ہے اور مسترد ہو جاتا ہے — جبکہ built-in provider پہلے ہی
درست وائر امیج فراہم کرتا ہے۔ omniroute logs میں دیکھیں کہ model حقیقتاً کہاں resolve
ہوتا ہے (`ROUTING` tag میں
`agentrouter/<model> → <providerId>/<model>` دکھایا جاتا ہے)؛ اگر `<providerId>`
`agentrouter` نہیں ہے، تو native provider پر یکجا کریں: combos کو
`agentrouter/<model>` (providerId `agentrouter`) کی طرف point کریں اور duplicate
compatible providers حذف کر دیں۔ native provider کو کسی wire-image configuration
یا `customUserAgent` کی ضرورت نہیں ہے۔

---

## مزید دیکھیں

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web فراہم کنندہ کے انضمام سے متعلق نکات
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — مفت درجے کے فراہم کنندگان کی
  فہرست
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — وائر امیج کا نفاذ
