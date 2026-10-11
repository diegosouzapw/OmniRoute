# Resilience Guide (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute میں لچک پذیری کے تین الگ مگر باہم متعلقہ طریقۂ کار ہیں۔ ہر ایک کا دائرۂ کار اور مقصد مختلف ہے۔ روٹنگ کے رویے کو ڈیبگ کرتے وقت انہیں الگ رکھیں۔

![3-سطحی لچک پذیری کا ماڈل](../diagrams/exported/resilience-3layers.svg)

> ماخذ: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. پرووائیڈر سرکٹ بریکر

**دائرۂ کار:** پورا پرووائیڈر (مثلاً، `glm`، `openai`، `anthropic`)۔

**مقصد:** ایسے پرووائیڈر کو ٹریفک بھیجنا روکنا جو اپ اسٹریم/سروس کی سطح پر بار بار ناکام ہو رہا ہو۔

**عمل درآمد:**

- بنیادی کلاس: `src/shared/utils/circuitBreaker.ts`
- وائرنگ: `src/sse/handlers/chatHelpers.ts`، `src/sse/handlers/chat.ts`
- اسٹیٹس API: `GET /api/monitoring/health`
- ری سیٹ API: `POST /api/resilience/reset`
- ریپرز: `open-sse/services/accountFallback.ts`
- DB ٹیبل: `domain_circuit_breakers`

**حالتیں:**

- `CLOSED` — معمول کی ٹریفک کی اجازت ہے
- `DEGRADED` — ٹریفک کی اب بھی اجازت ہے، لیکن پرووائیڈر کی بڑھی ہوئی ناکامیوں کو ٹریک کیا جا رہا ہے
- `OPEN` — پرووائیڈر عارضی طور پر بلاک ہے؛ کومبو روٹنگ اسے چھوڑ دیتی ہے
- `HALF_OPEN` — ری سیٹ ٹائم آؤٹ گزر چکا ہے؛ آزمائشی درخواست کی اجازت ہے

**قابلِ ترتیب ڈیفالٹس (`open-sse/config/constants.ts`، Dashboard → Settings → Resilience میں دستیاب):**

| کلاس    | ان ناکامیوں پر تنزلی | ان ناکامیوں پر کھلتا ہے | ری سیٹ ٹائم آؤٹ |
| ------- | -------------------- | ----------------------- | --------------- |
| OAuth   | 5 ناکامیاں           | 8 ناکامیاں              | 60s             |
| API-key | 7 ناکامیاں           | 12 ناکامیاں             | 30s             |
| مقامی   | اخذ کردہ             | 2 ناکامیاں              | 15s             |

`degradationThreshold` یہ کنٹرول کرتا ہے کہ پرووائیڈر کب `DEGRADED` حالت میں داخل ہوتا ہے؛ `failureThreshold` یہ کنٹرول کرتا ہے کہ وہ کب کھلتا ہے اور اسے چھوڑ دیا جاتا ہے۔ مقامی پرووائیڈر پروفائلز ابھی Resilience ترتیبات کے صفحے پر دستیاب نہیں ہیں۔

**ٹرِپ کوڈز:** صرف پرووائیڈر کی سطح کے اسٹیٹس `[408, 500, 502, 503, 504]`۔ اکاؤنٹ کی سطح کی خرابیوں (زیادہ تر 401/403/429 — یہ کول ڈاؤن یا لاک آؤٹ سے متعلق ہیں) پر ٹرِپ **نہ کریں**۔

**سست بازیابی:** جب `OPEN` کی مدت ختم ہوتی ہے، تو `getStatus()`، `canExecute()`، `getRetryAfterMs()` حالت کو `HALF_OPEN` پر ریفریش کرتے ہیں۔ کسی پسِ منظر ٹائمر کی ضرورت نہیں۔

---

### اختیاری عالمی پرووائیڈر کول ڈاؤن (ونڈو گیٹ)

ایک چوتھی، **اختیاری** تہہ (`PROVIDER_COOLDOWN_ENABLED`، ڈیفالٹ طور پر **بند**) ناکام ہونے والے پرووائیڈرز کی بین درخواست حافظہ
`open-sse/services/providerCooldownTracker.ts` میں برقرار رکھتی ہے، جس سے کومبو ہدف
کے تعین کے دوران رجوع کیا جاتا ہے، تاکہ مسلسل کومبو درخواستیں اس پرووائیڈر کو دوبارہ آزمانا بند کر دیں جو ابھی
ناکام ہوا ہے۔ پرووائیڈر کی سطح کی اندراجات `PROVIDER_PROFILES` ونڈو گیٹ کی پابندی کرتی ہیں:

| پروفائل | اتنی بار کے بعد ٹرِپ (`providerFailureThreshold`) | اس مدت کے اندر (`providerFailureWindowMs`) | اتنی مدت کے لیے کول ڈاؤن (`providerCooldownMs`) |
| ------- | ------------------------------------------------: | -----------------------------------------: | ----------------------------------------------: |
| OAuth   |                                              `10` |                                    `15min` |                                          `5min` |
| API key |                                              `15` |                                    `30min` |                                         `10min` |

حد سے نیچے پرووائیڈر کو کول ڈاؤن میں **نہیں** سمجھا جاتا؛ کامیابی
ونڈو کو صاف کر دیتی ہے۔ کنکشن کی سطح کی اندراجات (`provider:connectionId`) اس کے بجائے
اسی ایکسپونینشل `minRetryCooldownMs → maxRetryCooldownMs` بیک آف کو برقرار رکھتی ہیں۔ اوور رائیڈز:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`۔
ریگریشن گارڈ: `tests/unit/provider-cooldown-window-gate.test.ts`۔

## 2. کنکشن کول ڈاؤن

**دائرۂ کار:** ایک فراہم کنندہ کا واحد کنکشن/اکاؤنٹ/کلید۔

**مقصد:** ایک خراب کلید کو چھوڑ دینا، جبکہ اسی فراہم کنندہ کے دیگر کنکشنز سروس فراہم کرتے رہیں۔

**نفاذ:**

- غیر دستیاب نشان زد کرنا: `src/sse/services/auth.ts::markAccountUnavailable()`
- انتخاب: اسی فائل میں `getProviderCredentials*`
- کول ڈاؤن کا حساب: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ترتیبات: `src/lib/resilience/settings.ts`

**ہر کنکشن کے فیلڈز:**

- `rateLimitedUntil` — وہ ٹائم اسٹیمپ جس تک کول ڈاؤن ختم ہوگا
- `testStatus: "unavailable"`
- `lastError`، `lastErrorType`، `errorCode`
- `backoffLevel` — ایکسپونینشل بیک آف کاؤنٹر

**ڈیفالٹ کول ڈاؤنز:**

- OAuth کی بنیادی مدت: 5s
- API-key کی بنیادی مدت: 3s
- API-key 429: اپ اسٹریم `Retry-After`/ری سیٹ ہیڈرز/قابلِ پارسنگ ری سیٹ متن کو ترجیح دیتا ہے
- بیک آف: `baseCooldownMs * 2 ** failureIndex`

**اینٹی تھنڈرنگ ہرڈ حفاظتی بندوبست:** بیک وقت ہونے والی ناکامیوں کو کول ڈاؤن ضرورت سے زیادہ بڑھانے یا `backoffLevel` کو دو مرتبہ بڑھانے سے روکتا ہے۔

**اسٹریم کے مواد میں تعطل اکاؤنٹ کو کول ڈاؤن نہیں کرتا۔** جب مواد کے تعطل پر نظر رکھنے والا واچ ڈاگ
(`open-sse/utils/streamHandler.ts`) ایسی اسٹریم کو ترک کر دیتا ہے جس نے مقررہ وقت میں کوئی ماڈل آؤٹ پٹ نہیں بھیجا،
تو `markAccountUnavailable()` کنکشن پر خرابی ریکارڈ کرتا ہے، مگر کوئی کول ڈاؤن مقرر نہیں کرتا:
تعطل اسی درخواست سے متعلق ہوتا ہے، اور عموماً یہ طویل استدلالی مرحلہ ہوتا ہے جس نے ابھی تک کوئی
آؤٹ پٹ نہیں دیا۔ آپریٹرز `resilienceSettings.streamStallCooldown.enabled`
(ڈیفالٹ `false`) کے ذریعے اسے دوبارہ فعال کر سکتے ہیں۔

**استدلالی فریمز مواد کے تعطل کا بجٹ دوبارہ شروع کرتے ہیں۔** کوئی استدلالی ماڈل اپنے پہلے نظر آنے والے
ٹوکن سے قبل کئی منٹ سوچ سکتا ہے: Claude ایسے `thinking_delta` فریمز اسٹریم کرتا ہے جن کا
سوچ کا متن خالی ہو سکتا ہے، اور Responses API یکے بعد دیگرے استدلالی آئٹمز اسٹریم کرتا ہے۔
`isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) ان فریمز کو پہچانتا ہے،
اور واچ ڈاگ ٹرن منسوخ کرنے کے بجائے ہر فریم پر اپنا بجٹ دوبارہ شروع کرتا ہے۔
یہ اب بھی ماڈل آؤٹ پٹ نہیں ہیں، اس لیے جو ٹرن صرف استدلال کے ساتھ ختم ہو وہ اب بھی
خالی رپورٹ کیا جاتا ہے، اور جو ٹرن استدلال روک کر صرف ہارٹ بیٹس بھیجتا رہے وہ اب بھی
واچ ڈاگ کو متحرک کر دیتا ہے۔

غیر خالی دستخط والے Kiro کے بائنری `reasoningContentEvent` فریمز، ایگزیکیوٹر کے ذریعے اس
استدلالی سرگرمی کو ایک خالی `reasoning_content` ڈیلٹا کے طور پر برقرار رکھتے ہیں۔ دستخط
آگے نہیں بھیجا جاتا۔ میٹا ڈیٹا، نامکمل فریمز، اور خالی دستخط مواد کا بجٹ دوبارہ شروع نہیں کرتے؛
آزاد فعال اسٹریم ٹائم آؤٹ اور کلائنٹ کی منسوخی بدستور لاگو رہتے ہیں
(`open-sse/executors/kiro/reasoning.ts`)۔

**اختتامی حالتیں (کول ڈاؤنز نہیں):**

- `banned` — ممنوعہ کلیدی لفظ / اکاؤنٹ پر پابندی کی شناخت کے ذریعے مقرر ہوتی ہے (دیکھیے [BAN_DETECTION](../security/BAN_DETECTION.md))، اور مسلسل تین اپ اسٹریم فی درخواست انکار (`request_rejected`، مثلاً Anthropic OAuth 403 "درخواست کی اجازت نہیں" — `open-sse/services/requestRejectedStreak.ts`) کے ذریعے بھی؛ ایک انکار صرف کنکشن کو کول ڈاؤن کرتا ہے
- `expired` (محدود تعداد میں دوبارہ کوششوں کے بعد اختتامی حالت میں منتقل ہوتی ہے — ایکسپونینشل بیک آف کے ساتھ `EXPIRED_RETRY_MAX = 3` — تاکہ عارضی OAuth خرابیاں اکاؤنٹ کو مستقل طور پر غیر فعال کیے جانے سے پہلے خود بخود درست ہو سکیں)
- `credits_exhausted`

یہ حالتیں اس وقت تک برقرار رہتی ہیں جب تک اسناد تبدیل نہ ہوں یا کوئی آپریٹر انہیں ری سیٹ نہ کرے۔ اختتامی حالتوں کو عارضی کول ڈاؤن حالت سے اوور رائٹ نہ کریں۔

**لیزی بحالی:** جب `rateLimitedUntil` گزر جائے تو کنکشن دوبارہ اہل ہو جاتا ہے۔ کامیاب استعمال پر، `clearAccountError()` خرابی کے تمام فیلڈز صاف کر دیتا ہے۔

### Claude OAuth استعمال کی حد: کم ترجیحی لین + سیشن کی حد کا ری سیٹ

**دائرۂ کار:** Claude سبسکرپشن کا ایک (OAuth) کنکشن۔ دونوں خصوصیات **ہر کنکشن کے لیے آپٹ اِن
ہیں** (کنکشن میں ترمیم کریں → Claude سیکشن → `providerSpecificData` میں `lowPriorityMode` /
`autoLimitReset`، دونوں ڈیفالٹ طور پر بند ہیں) اور Claude Code کی `/low-priority` اور
`/limit-reset` کمانڈز کی عکاسی کرتی ہیں (وائر کنٹریکٹ Claude Code 2.1.263 سے حاصل کیا گیا ہے)۔

**نفاذ:**

- اسٹیٹ مشین + رسپانس کی درجہ بندی: `open-sse/services/claudeLowPriority.ts`
- ری سیٹ اسٹیٹس/کلیم کلائنٹ: `open-sse/services/claudeLimitReset.ts`
- ایگزیکیوٹر ہُک (ہیڈر شامل کرنا + اسی اکاؤنٹ سے دوبارہ کوشش): `open-sse/executors/base.ts::execute()`
- آپٹ اِن کا برقرار رہنا: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ٹرگر:** 5 گھنٹے کی استعمال کی حد — ایسا `429` جس کے ہیڈرز میں
`anthropic-ratelimit-unified-status: rejected` موجود ہو اور، جب اکاؤنٹ اہل ہو،
`anthropic-ratelimit-unified-slow-offer: treatment` بھی موجود ہو۔ اس پہلی حد والے
429 سے پہلے کچھ نہیں بھیجا جاتا؛ یونیفائیڈ ہیڈرز کے بغیر برسٹ 429 معمول کے کول ڈاؤن راستے سے گزرتا ہے۔

**کم ترجیحی لین** (`lowPriorityMode`):

- وال 429 پر executor پیشکش قبول کرتا ہے اور فوری طور پر **اسی**
  اکاؤنٹ کے ساتھ `anthropic-usage-limit: slow` استعمال کرتے ہوئے دوبارہ کوشش کرتا ہے؛ اعلان کردہ
  `anthropic-ratelimit-unified-reset` (+60s رعایتی مدت) تک lane فعال رہتی ہے اور اس وقفے میں ہر درخواست
  یہ header لے کر جاتی ہے۔ intercept شدہ 429 کبھی `handleChatCore` تک نہیں پہنچتا، لہٰذا connection کو
  cooldown میں **نہیں** ڈالا جاتا اور نہ ہی اسے rotate کرکے ہٹایا جاتا ہے۔
- بعد کے responses پر `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  lane کو برقرار رکھتے ہیں؛ `slot_busy` (429) یا `529` کی صورت میں server کے
  `anthropic-ratelimit-unified-slow-retry-after` کا انتظار کیا جاتا ہے (ڈیفالٹ 20s، 5–600s تک clamp، ±30% jitter)
  اور دوبارہ کوشش کی جاتی ہے، جو `anthropic-ratelimit-unified-slow-max-wait` تک محدود ہے (ڈیفالٹ 20 منٹ، 1 منٹ–6 گھنٹے تک clamp)
  — اس سے آگے lane ختم ہو جاتی ہے اور 10 منٹ کا cool-off دوبارہ قبولیت کو روکتا ہے۔ انتظار مزید اس مقدار تک محدود
  کیا جاتا ہے جو درخواست کے اپنے upstream-start timeout میں باقی ہو
  (`resolveFetchStartTimeout`، ڈیفالٹ طور پر 10 منٹ)، منفی 5 s margin: اس حد کے بغیر
  20 منٹ کا ڈیفالٹ max-wait درخواست سے زیادہ جاری رہتا اور sleep انتظار کے درمیان
  abort ہو جاتی، جس کے نتیجے میں خوش اسلوبی سے `max_wait` اختتام + cool-off کے بجائے
  `TimeoutError` سامنے آتا۔
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`، 5h-window rollover، یا
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (جو کسی بھی status پر اسے
  `extra_usage` کے طور پر ختم کرتا ہے، کیونکہ ادا شدہ overage اب وال کو cover کرتا ہے) lane کو ختم کرتے ہیں؛ پھر
  response معمول کے cooldown path میں چلا جاتا ہے۔ `budget_exhausted` کو اعلان کردہ budget reset
  (≤ 8 دن) تک یاد رکھا جاتا ہے۔
- وال کی جانچ executor کی اپنی 400 سے چلنے والی intra-attempt retries (context
  editing، thinking/effort clamps، param auto-learn) کے بعد چلتی ہے، اس لیے ایسا وال 429 جو صرف
  ان retries میں سے کسی ایک پر ظاہر ہو، cooldown path تک پہنچنے کے بجائے پھر بھی intercept ہو جاتا ہے۔
- state فی connection in-memory ہوتی ہے (restart کی صورت میں دوبارہ قبول کرنے کے لیے ایک اضافی وال 429 درکار ہوتا ہے)۔

**Session-limit reset** (`autoLimitReset`، جب دونوں آن ہوں تو lane سے پہلے آزمایا جاتا ہے):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  block؛ جب `arm: "reset"` اور `available: true` ہوں،
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` کو
  `{ "program": "juniper_tide" }` کے ساتھ بھیجا جاتا ہے (organization UUID
  `providerSpecificData.organizationUUID` سے، bootstrap fallback کے ساتھ)۔
- `result: reset|not_limited` → درخواست کو مکمل رفتار سے دوبارہ آزمایا جاتا ہے (کوئی slow header نہیں)۔
  `already_used` / `not_offered`، `next_available_at` کو memoise کرتے ہیں (ڈیفالٹ ایک ہفتہ)؛ کوئی بھی
  ناکامی 15 منٹ کا backoff کرتی ہے۔ reset ہفتے میں ایک بار ہوتا ہے اور پھر بھی
  weekly limit میں شمار ہوتا ہے۔

Regression guards: `tests/unit/claude-low-priority-mode.test.ts`،
`tests/unit/claude-limit-reset.test.ts`، `tests/unit/claude-low-priority-executor.test.ts`۔

### Session affinity (#7274)

**دائرۂ کار:** ایک client session (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) کو **کسی بھی** provider کے لیے ایک connection سے pin کیا جاتا ہے۔

**مقصد:** ایک multi-turn agent (Claude Code، aider، custom agents) کو تمام requests میں اسی اکاؤنٹ پر برقرار رکھنا، تاکہ cross-account context کا ضیاع اور per-account session state رکھنے والے providers پر بار بار cold-start 429s کم ہوں۔

**نفاذ:**

- TTL resolution: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin selection/creation: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header extraction (generic، کسی بھی provider کے لیے): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persisted pin table: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Setting: `sessionAffinityTtlMs` (عالمی TTL ملی سیکنڈ میں، `0` غیر فعال کرتا ہے) — `src/lib/db/settings.ts`۔ اسے صرف Codex کے لیے مخصوص `codexSessionAffinityTtlMs` سے migration `124_generic_session_affinity_ttl.sql` کے ذریعے rename کیا گیا، جو پہلے سے configure کردہ کسی بھی Codex TTL کو نئے ڈیفالٹ کے طور پر منتقل کرتا ہے۔

#7274 سے پہلے، `resolveSessionAffinityTtlMs()`، `codex` کے علاوہ ہر provider کے لیے فوراً `0` واپس کر دیتا تھا، لہٰذا TTL setting (اور session headers) کا کہیں اور کوئی اثر نہیں ہوتا تھا، حالانکہ pinning mechanism اور header extraction پہلے ہی provider-agnostic تھے۔ fix نے وہ early-return ہٹا دیا؛ عالمی طور پر `0` سے زیادہ مقرر ہونے کے بعد TTL اب ہر provider پر یکساں طور پر لاگو ہوتا ہے۔

تینوں session-affinity headers کو کبھی upstream forward نہیں کیا جاتا — executors، client headers کو pass-through کرنے کے بجائے اپنے upstream headers ابتدا سے بناتے ہیں، اس لیے یہ صرف ایک داخلی correlation id رہتا ہے۔

### Exclusive managed session connection leases

**دائرۂ کار:** ایک فعال managed HTTP client/session ایک eligible OmniRoute connection کا مالک ہوتا ہے۔

**مقصد:** ان clients کے لیے پائیدار exclusive connection ownership فراہم کرنا جنہیں requests کے درمیان ایک سخت routing
fence درکار ہو۔ یہ session affinity سے مختلف ہے، جو continuity کی ایک نرم ترجیح ہے:
ایک exclusive lease lifecycle state کو SQLite میں برقرار رکھتی ہے، عالمی active-owner اور
active-connection uniqueness نافذ کرتی ہے، اور provider dispatch سے پہلے stale generation کو
مسترد کرتی ہے۔

یہ feature فی API key opt-in ہے۔ managed key کے پاس `lease:exclusive` scope اور ایک
واضح non-empty `allowedConnections` list ہونی چاہیے۔ کوئی بھی HTTP client lifecycle endpoint استعمال کر سکتا ہے؛ کسی
client name، user-agent، provider، OAuth method، یا model کی ضرورت نہیں۔ lease ایک connection کی مالک ہوتی ہے،
model کی نہیں، اس لیے model کی تبدیلی binding کو برقرار رکھتی ہے جب تک connection معمول کے مطابق
eligible رہے۔ معمول کے model، quota، health، cooldown، اور allowlist rules بدستور حتمی اختیار رکھتے ہیں اور
اسی generation کو کسی دوسرے آزاد eligible connection پر منتقل کر سکتے ہیں۔

لائف سائیکل `POST /api/v1/session-leases` ہے، جس میں JSON ایکشنز `acquire`، `renew`، اور `release` شامل ہیں۔
منظم inference درخواستیں غیر شفاف `X-OmniRoute-Lease-Owner` ویلیو اور عین
`X-OmniRoute-Lease-Generation` پیش کرتی ہیں۔ owner میں `vlo_` کے بعد 43 base64url حروف ہوتے ہیں؛ صرف
اس کا SHA-256 ہیش محفوظ کیا جاتا ہے۔ ہر حتمی dispatch fence توثیق شدہ API key ID اور
فعال connection ID کو بھی پابند کرتا ہے۔ lease control headers کو logs، محفوظ کردہ request snapshots، اور
upstream executor headers سے ہٹا دیا جاتا ہے۔

اگر معمول کی routing میں اہل managed candidates موجود ہوں لیکن ہر دستیاب candidate پر کسی
غیر متعلق فعال lease کا قبضہ ہو، تو OmniRoute HTTP `429`، `lease-capacity-unavailable` کوڈ،
`waiting-for-capacity` حالت، اور متعلقہ قریب ترین میعاد ختم ہونے کے وقت سے اخذ کردہ ایک محدود `Retry-After` واپس کرتا ہے۔
اہلیت کا معمول کے مطابق خالی ہونا lease contention نہیں ہے اور اپنی موجودہ routing error semantics برقرار رکھتا ہے۔

متعلقہ mechanisms الگ رہتے ہیں:

- OAuth session occupancy، OAuth accounts کے لیے process-local soft distribution ہے۔
- Account semaphores درخواستوں کی concurrency کے permits دیتے ہیں اور درخواست مکمل ہونے پر ختم ہو جاتے ہیں۔
- Exclusive managed session leases، generation fence کے ساتھ پائیدار lifecycle ownership ہیں۔

---

## 3. ماڈل لاک آؤٹ

**دائرۂ کار:** provider + connection + model کا مجموعہ۔

**اسٹیٹس کے لحاظ سے کلید کا دائرۂ کار:** ناکام ہونے والا اسٹیٹس طے کرتا ہے کہ لاک آؤٹ کس کلید پر لکھا جائے
(`open-sse/services/accountFallback/exactModelLock.ts` میں `resolveLockoutScope()`):

- `429` / `403` / `402` — quota یا entitlement کا اشارہ — **quota family** کو لاک کرتے ہیں:
  codex کے لیے مکمل `codex` / `spark` دائرۂ کار (connection کا ہر `gpt-5*` ماڈل)،
  دیگر providers کے لیے `getQuotaScopedModelForProvider()`۔
- `404` صرف بنیادی ماڈل کو لاک کرتا ہے (`getModelLockKey()`، `not_found` کا دائرہ محدود کرتا ہے)۔
- کوئی بھی دوسرا اسٹیٹس — `5xx` transport/server ناکامیاں اور quality validation سے پیدا کردہ
  OmniRoute کا اپنا `502` — صرف **عین**
  provider/connection/model مجموعے کو لاک کرتا ہے۔ کسی ایک ماڈل پر خراب stream اکاؤنٹ کے
  quota کے بارے میں ثبوت نہیں ہے؛ اس اصول سے پہلے
  `codex/gpt-5.6-luna` پر ایک خالی response، اس connection کے ہر `gpt-5*` ماڈل کو
  2–30 منٹ (بتدریج بڑھتے ہوئے) کے لیے routing سے ہٹا دیتا تھا، حالانکہ اس کا quota متاثر نہیں ہوا ہوتا تھا۔
- caller کا واضح `scope` آپشن ہمیشہ ترجیح رکھتا ہے (Antigravity `"exact"` پاس کرتا ہے)۔

**مقصد:** جب صرف ایک ماڈل دستیاب نہ ہو یا quota کی حد کا شکار ہو تو مکمل connection کو غیر فعال کرنے سے بچنا۔

**مثالیں:**

- فی ماڈل quota والے providers جو 429 واپس کرتے ہیں
- Local providers جو کسی ایک غیر موجود ماڈل کے لیے 404 واپس کرتے ہیں
- Provider-specific mode/model permission کی ناکامیاں (مثلاً Grok modes)

**نفاذ:** `open-sse/services/accountFallback.ts` — `lockModel()`، `clearModelLock()`، `getAllModelLockouts()`۔

### ماڈل کول ڈاؤنز ڈیش بورڈ (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

فعال lockouts کو ان معلومات کے ساتھ درج کرتا ہے: provider، connection، model، reason، expiresAt۔ Operators کارڈ سے کسی ماڈل کو دستی طور پر دوبارہ فعال کر سکتے ہیں۔

**REST API:**

- `GET /api/resilience/model-cooldowns` — فعال lockouts کی فہرست
- `DELETE /api/resilience/model-cooldowns` — دستی طور پر دوبارہ فعال کرنا۔ Body: `{provider, connection, model}`۔ Auth: management۔

### کول ڈاؤن مینیجر

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)۔

ہر اس connection کے لیے ایک ہی صفحہ جو کسی عارضی وجہ سے routing سے باہر ہو، بجائے اس کے کہ
ہر provider کا صفحہ الگ کھولا جائے۔ یہ connection cooldowns، model lockouts اور terminal
states درج کرتا ہے، انہیں فی connection، کسی selection، یا کسی provider کے تمام connections کے لیے
صاف کرتا ہے، اور سب سے زیادہ استعمال ہونے والے cooldown rules میں ترمیم کرتا ہے: `streamStallCooldown.enabled` اور OAuth / API-key
`connectionCooldown` کا بنیادی cooldown اور زیادہ سے زیادہ backoff steps (جنہیں
`PATCH /api/resilience` کے ذریعے محفوظ کیا جاتا ہے)۔ Terminal states (`banned`، `expired`، `credits_exhausted`) یہاں
درج کیے جاتے ہیں مگر کبھی صاف نہیں کیے جاتے۔

**REST API** (`src/lib/resilience/cooldownManager.ts`، auth: management):

- `GET /api/resilience/cooldowns[?provider=]` — status، باقی cooldown،
  backoff level، آخری error type اور model lockouts کے ساتھ connections (کوئی credentials نہیں)
- `POST /api/resilience/cooldowns` — body `{connectionIds: string[]}` یا
  `{all: true, provider?}`؛ `{cleared, unchanged, skippedTerminal, lockoutsCleared}` واپس کرتا ہے

### لاک آؤٹ سیٹنگز UI + کامیابی پر بتدریج بحالی (v3.8.23)

Model lockout ہمیشہ فعال رہنے والے hardcoded رویے سے بدل کر مکمل طور پر قابلِ ترتیب،
اختیاری feature بن گیا ہے، جس کا اپنا settings card اور خودکار بحالی کا راستہ ہے۔

**سیٹنگز کارڈ:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)۔
یہ اوپر موجود صرف پڑھنے کے قابل `ModelCooldownsCard` (جو صرف فعال lockouts کی
_فہرست_ دکھاتا ہے) سے **الگ** ہے — نیا کارڈ _parameters کو ترتیب دیتا ہے_۔ Defaults
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) میں موجود ہیں:

| سیٹنگ                   | ڈیفالٹ                           | مطلب                                                              |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------- |
| `enabled`               | `false`                          | بنیادی toggle — model lockout **بطور ڈیفالٹ بند** ہے۔             |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | وہ upstream statuses جو model-scoped failure شمار ہوتے ہیں۔       |
| `baseCooldownMs`        | `120_000` (120 سیکنڈ)            | پہلی ناکامی کے لیے ابتدائی lockout کا دورانیہ۔                    |
| `maxCooldownMs`         | `1_800_000` (30 منٹ)             | بتدریج بڑھے ہوئے cooldown کی بالائی حد۔                           |
| `maxBackoffSteps`       | `10`                             | exponential-backoff میں اضافے کے زیادہ سے زیادہ مراحل۔            |
| `useExponentialBackoff` | `true`                           | آیا بار بار ہونے والی ناکامیاں cooldown کو exponentially بڑھائیں۔ |

Settings معمول کے settings store کے ذریعے برقرار رہتی ہیں اور resilience settings schema کے ذریعے
validate ہوتی ہیں؛ کارڈ `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` کے ساتھ) اور `maxBackoffSteps` کو حدود کے اندر رکھتا ہے۔

**کامیابی پر بتدریج بحالی:** بحالی **صرف** timer ختم ہونے پر منحصر نہیں ہے۔ ایک صحت مند
response ماڈل کی failure count کو بتدریج کم کرتا ہے، تاکہ دورانِ مدت بحال ہونے والا ماڈل
اپنا timer ختم ہونے سے پہلے مزید escalation روک دے (اور lockout صاف کر دے)۔ کسی کامیاب
combo target پر، `open-sse/services/combo.ts`، `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) کو call کرتا ہے، جو محفوظ شدہ
`failureCount` کو **نصف** کر دیتا ہے (`Math.floor(failureCount / 2)`)؛ جب یہ `0` تک پہنچتا ہے تو lockout
entry مکمل طور پر delete کر دی جاتی ہے۔ اس کا counterpart `recordModelLockoutFailure()`
escalation window کے اندر ہونے والی ناکامیوں پر count بڑھاتا ہے (اور cooldown میں اضافہ کرتا ہے)۔
کامیابی پر ہونے والی یہ تدریجی کمی، timer کے معمول کے expiry کے علاوہ ہے —
دونوں میں سے کوئی بھی راستہ ماڈل کو دوبارہ فعال کر سکتا ہے۔

**اسٹیٹ:** lockouts **in-memory** رکھے جاتے ہیں (ہر process کے `Map`s، جن میں
`ModelLockoutEntry` کی کلید `provider:connectionId:model` ہوتی ہے، جبکہ exact-scope locks کی کلید
`provider:connectionId:exact:model` ہوتی ہے)، اور DB میں persist نہیں کیے جاتے —
restart پر یہ ضائع ہو جاتے ہیں۔ _settings_ persist ہوتی ہیں؛ فعال
lockout _state_ عارضی ہے۔

---

## 4. کوٹا-شیئر کنکرنسی کنٹرول (v3.8.36)

سبسکرپشن اکاؤنٹس (GLM، MiniMax وغیرہ) اکثر بیک وقت صرف ~1–3
درخواستیں قبول کرتے ہیں؛ اس حد سے تجاوز کرنے پر 429s اور کول ڈاؤنز متحرک ہو جاتے ہیں۔ یہ مسئلہ
**quota-share** (`qtSd/…`) کومبوز میں زیادہ شدید ہوتا ہے، جہاں کئی API کیز ایک ہی اپ اسٹریم
اکاؤنٹ شیئر کرتی ہیں۔ تین تہیں کسی مشترکہ اکاؤنٹ کو درخواستوں سے بھر جانے سے روکتی ہیں۔

### فی کنکشن کنکرنسی حد (`max_concurrent`)

ہر پرووائیڈر کنکشن ایک `max_concurrent` بالائی حد مقرر کر سکتا ہے
(`provider_connections.max_concurrent`، جسے کنکشن موڈل / API / DB میں سیٹ کیا جاتا ہے)۔
کوئی حد نہ رکھنے کے لیے اسے خالی چھوڑ دیں۔ یہی واحد سیٹنگ ذیل کی سیریلائزیشن
تہہ کو چلاتی ہے — اسے اکاؤنٹ کی حقیقی کنکرنسی کے مطابق سیٹ کریں (مثلاً GLM ~1، MiniMax ~2)۔

### فی ماڈل کنکرنسی حدود (`modelConcurrency`)

کوئی کنکشن اپنی `rateLimitOverrides` میپ کے اندر فی ماڈل درست کنکرنسی
حدود بھی مقرر کر سکتا ہے:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

اسے کنکشن موڈل میں (**شرح کی حد میں تبدیلیاں → فی ماڈل
کنکرنسی حدود**، ہر سطر میں ایک `model=cap`) یا اسی JSON ساخت کے ساتھ
`PATCH /api/providers/[id]` کے ذریعے سیٹ کریں۔ کلیدی اصول:

- **پورے کنکشن کی حد بمقابلہ ماڈل کی مخصوص حد:** `maxConcurrent` مشترکہ
  پورے کنکشن کی بالائی حد رہتی ہے۔ جب دونوں لاگو ہوں تو دونوں گیٹس کو
  اسی جامع گیٹ میں اٹامک طور پر حاصل کیا جاتا ہے
  (`global → provider → account → model`)؛ مؤثر طرزِ عمل زیادہ
  سخت قابلِ اطلاق حد کے مطابق ہوتا ہے۔
- **ماڈل کی کا عین مماثل ہونا:** کلید وہ ماڈل اسٹرنگ ہے جو روٹنگ ریزولیوشن
  کے بعد ایگزیکیوٹر کو دی جاتی ہے — عموماً سادہ اپ اسٹریم ماڈل id
  (`glm-5`)، نہ کہ کلائنٹ سائیڈ `provider/model` عرف (`zai/glm-5`،
  `glm-5` سے مماثل نہیں ہوتا)۔ قدریں بیک وقت درخواستوں کی مثبت صحیح عددی بالائی حدود ہیں۔
- **مقامی قطاربندی، کوئی دریافت نہیں:** زائد درخواستیں موجودہ
  قطار/ٹائم آؤٹ اصولوں کے مطابق مقامی طور پر قطار میں لگتی ہیں (ٹائپ شدہ `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` داخلہ خامیاں)۔ OmniRoute اپ اسٹریم پالیسی دریافت یا
  اخذ نہیں کرتا — یہ آپریٹر کی ترتیب کردہ عین حدود نافذ کرتا ہے۔
  مکمل طور پر مصروف ماڈل گیٹ کبھی پرووائیڈر کو غیر فعال نہیں کرتا اور نہ ہی
  ماڈل کو مستقل طور پر مقفل کرتا ہے؛ اپ اسٹریم 429/کول ڈاؤن/فال بیک طرزِ عمل
  بدستور خامیوں کے لیے آخری حفاظتی سہارا رہتا ہے۔
- **فی کنکشن، فی پراسیس دائرۂ کار:** حدود ہر ڈیٹابیس کنکشن کے لیے الگ ہیں
  اور میموری میں رکھی جاتی ہیں، لہٰذا ایک ہی اپ اسٹریم API کی دوبارہ استعمال کرنے والے
  دو کنکشنز آپس میں ہم آہنگی نہیں کرتے۔
- **غیر مرتب شدہ کا مطلب کوئی تبدیلی نہیں:** میپ کو شامل نہ کرنے (یا
  ڈیش بورڈ فیلڈ خالی چھوڑنے) سے کوئی ماڈل گیٹ شامل نہیں ہوتا۔ کسی بھی
  عمومی پرووائیڈر حد کا دعویٰ کیے بغیر مثالی کنفیگریشن:

```text
glm-5=1
glm-4.7=3
```

### کوٹا-شیئر درخواستوں کی سیریلائزیشن

جب کوٹا-شیئر ڈسپیچ کسی ایسے کنکشن کو ہدف بناتا ہے جو مثبت
`max_concurrent` مقرر کرتا ہے، تو اس **اکاؤنٹ** کے لیے بیک وقت درخواستیں
فی کنکشن سیمیفور (کلید `qsconn:<connectionId>`) کے ذریعے سیریلائز کی جاتی ہیں: زائد درخواستیں
اکاؤنٹ کو درخواستوں سے بھرنے کے بجائے **قطار میں انتظار کرتی ہیں**۔ یہ **fail-open** ہے — مکمل
قطار یا ٹائم آؤٹ کی صورت میں درخواست کسی سلاٹ کے بغیر آگے بڑھتی ہے، بجائے اس کے کہ کبھی کسی
قابلِ ڈسپیچ درخواست کو مسترد کیا جائے۔ اسے **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`، بطور ڈیفالٹ
فعال) میں ٹوگل کریں۔ `max_concurrent` حد کے بغیر طرزِ عمل میں کوئی تبدیلی نہیں ہوتی۔

> کوٹا-شیئر روٹنگ گیٹ (`selectQuotaShareTarget`، DRR + P2C) بذاتِ خود
> fail-open ہے اور حد تک پہنچے ہوئے کنکشن کی ترجیح صرف _کم_ کرتا ہے — ایک
> واحد کنکشن والے پول میں یہ سخت حد نافذ نہیں کر سکتا، اس لیے یہی سیمیفور درحقیقت
> درخواستوں کے سیلاب کو قابو میں رکھتا ہے۔

### کومبو کول ڈاؤن سے آگاہ ری ٹرائی

ہر کومبو حکمتِ عملی کے لیے (فعال ہونے کی صورت میں)، ایسی درخواست جو مختصر
عارضی کول ڈاؤن کے لیے 429 کو حتمی بنا دیتی، 429 واپس کرنے کے بجائے اس کے ختم ہونے کا
انتظار کرتی اور دوبارہ ڈسپیچ ہوتی ہے — اس میں کثیر ماڈل کومبوز پر Gemini-کلاس TPM/RPM
ونڈوز (~60s retry-after) شامل ہیں، مثلاً 2 ماڈل والے کومبو کے دونوں اہداف کا فی ماڈل
شرح کی حد سے ٹکرانا۔ یہ **Settings → Resilience** میں موجود `comboCooldownWait`
(`enabled`، `maxWaitMs`، `maxAttempts`، `budgetMs`) کے ذریعے محدود ہے۔ یہ
`quota_exhausted` (نصف شب تک مقفل) یا تصدیق/نہ ملنے کی وجوہات پر کبھی انتظار نہیں کرتا۔

---

## 5. درخواست قطار کا داخلہ کنٹرول (v3.8.49 · مسئلہ #6593)

**دائرۂ کار**: مقامی، فی provider+connection شرح-محدود قطار (`open-sse/services/rateLimitManager.ts`،
جسے Bottleneck کی پشت پناہی حاصل ہے)، اوپر بیان کردہ تین میکانزموں سے ایک سطح نیچے۔

**`maxWaitMs` قطار کے انتظار کو محدود کرتا ہے؛ `executionMaxWaitMs` عمل درآمد کو محدود کرتا ہے۔**
دونوں کو دانستہ طور پر الگ رکھا گیا ہے، اور کوئی بھی دوسرے کو اپنی قدر فراہم نہیں کرتا۔

`resilienceSettings.requestQueue.maxWaitMs` **قطار کے انتظار کا بجٹ** ہے: یہ
provider سلاٹ کے انتظار اور پھر QUEUED حالت میں رہنے، دونوں کا احاطہ کرتا ہے، اور
جس لمحے job، QUEUED حالت چھوڑ کر عمل درآمد شروع کرتا ہے، اس کا timer صاف کر دیا
جاتا ہے (`rateLimitManager.ts`، `wrappedFn`)۔ اس حد سے تجاوز کرنے والی درخواست
کبھی upstream تک نہیں پہنچتی۔ ڈیفالٹ 30000ms ہے، جو
`src/lib/resilience/settings.ts` میں `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
کے ذریعے فراہم کیا جاتا ہے اور
`tests/unit/ratelimit-admission-control-6593.test.ts` کے ذریعے مقرر ہے، لہٰذا
اسے تبدیل کرنے پر یہ test ناکام ہو جاتا ہے، بجائے اس کے کہ یہ پیراگراف خاموشی
سے فرسودہ رہ جائے۔

`resilienceSettings.requestQueue.executionMaxWaitMs` وہ قدر ہے جو Bottleneck
کو job کے `expiration` کے طور پر ملتی ہے، اور اس کا timer صرف dispatch کے بعد
شروع ہوتا ہے۔ یہ ایسے executors کے لیے حفاظتی آخری حد ہے جن کا اپنا upstream
timeout نہیں ہوتا، اور جب executor کا اپنا fetch-start timeout اس سے زیادہ ہو
تو اسے اتنا بڑھا دیا جاتا ہے، تاکہ یہ صحت مند in-flight response کو منقطع نہ
کر سکے۔ ڈیفالٹ 600000ms (10 منٹ) ہے۔

قطار کے بجٹ کو `expiration` میں دینا ہی پہلے non-incremental gateways کو
درمیانِ پرواز ختم کر دیتا تھا — پہلی bytes آنے سے پہلے ان کا کئی منٹ چلنا
بالکل جائز ہے — اور اسی لیے expiration کو `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) کے طور پر ظاہر کیا جاتا ہے، جبکہ
قطار کے بجٹ کے ساتھ queue-timeout code ہوتا ہے۔ دونوں میں سے کسی کو بھی
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) یا dashboard
(**Settings → Resilience**) کے ذریعے override کریں۔ normalize کیے جانے پر
دونوں کو 1ms–24h کی حدود میں محدود کیا جاتا ہے۔

**دونوں کے لیے ترجیح:** env var صرف _ڈیفالٹ_ فراہم کرتا ہے۔
`resilienceSettings.requestQueue` میں محفوظ کردہ قدر (dashboard / API patch،
جو `key_value` میں محفوظ ہوتی ہے) اس پر غالب آتی ہے، اور فی connection
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` اس پر بھی غالب آتی ہے۔
لہٰذا کسی ایسی deployment پر env var مقرر کرنے سے، جس میں پہلے ہی کوئی قدر
محفوظ ہو، کچھ تبدیل نہیں ہوتا — اس کے بجائے محفوظ شدہ setting کو صاف یا update
کریں۔

قطار میں قیام `maxWaitMs` کے ذریعے محدود ہوتا ہے؛ ذیل میں موجود
`maxQueueDepth` یہ محدود کرتا ہے کہ ایک وقت میں کتنے callers قطار میں ہو سکتے
ہیں۔

**`maxQueueDepth` — اختیاری داخلہ حد (نئی)۔** `resilienceSettings.requestQueue.maxQueueDepth`
اس تعداد کو محدود کرتا ہے کہ ایک provider+connection کے لیے ایک وقت میں کتنی
درخواستیں قطار میں (ابھی dispatch ہوئے بغیر) رہ سکتی ہیں۔ جب قطار میں پہلے ہی
`maxQueueDepth` درخواستیں موجود ہوں، تو نئی درخواست کو typed
`code: "RATE_LIMIT_QUEUE_FULL"` error کے ساتھ فوری طور پر مسترد کر دیا جاتا ہے،
**اس سے پہلے** کہ وہ کبھی `limiter.schedule()` تک پہنچے — اس لیے یہ rejection
کم خرچ ہے اور اس درخواست کے لیے کسی بھی downstream prompt-compression /
translation کے کام سے پہلے ہو جاتی ہے۔ ڈیفالٹ `0` = غیر فعال، جس سے موجودہ
غیر محدود قطار کا رویہ برقرار رہتا ہے؛ حد 0–100000 ہے۔
`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) یا
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch) کے ذریعے
override کریں۔

داخلہ جانچ بذاتِ خود ایک pure function ہے
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`)، اس لیے
اسے حقیقی Bottleneck limiter کے بغیر unit-test کیا جا سکتا ہے۔

> #6593 شروع کرنے والے RFC نے `bypassCompressionOnRateLimit`
> flag بھی تجویز کیا تھا۔ اس repo کی `open-sse/services/compression/` pipeline،
> outbound LLM درخواست (`chatCore.ts` میں
> `resolveCompressionSettings`/`selectCompressionStrategy` block کے آس پاس)
> پر prompt/context compression کرتی ہے، synthesized 429 bodies پر HTTP
> response compression نہیں — ایک حقیقی bypass flag کے لیے کوئی مماثل code
> path موجود نہیں ہے۔ prompt-compression کا یہ مرحلہ فی الحال request pipeline
> میں `withRateLimit()` سے _پہلے_ بھی چلتا ہے، اس لیے queue-full rejection کی
> صورت میں اسے چھوڑنے کے لیے ترتیب بدلنا، اس مسئلے کے دائرۂ کار سے الگ اور کہیں
> بڑی تبدیلی ہے؛ اسے دانستہ طور پر یہاں نافذ **نہیں** کیا گیا، اور اگر CPU کی
> بچت ترتیب بدلنے کے خطرے کے قابل ہو تو اسے follow-up کے طور پر چھوڑ دیا گیا ہے۔

---

## 6. سست اسٹریم تھروپُٹ واچ ڈاگ (#9709)

اختیاری `resilienceSettings.streamRecovery.throughputWatchdog` حفاظتی نظام ایسے اپ اسٹریم کا پتہ لگاتا ہے جو اب بھی چنکس بھیج رہا ہو، لیکن اسسٹنٹ آؤٹ پٹ کی رفتار ترتیب شدہ مفید آؤٹ پٹ شرح سے کم ہو۔ اسے دانستہ طور پر آئیڈل ٹائم آؤٹ سے الگ رکھا گیا ہے: ہارٹ بیٹس اور میٹا ڈیٹا کسی بھی ٹائمر کو ری سیٹ نہیں کرتے اور نہ ہی پیش رفت شمار ہوتے ہیں۔ یہ ہارڈ اٹیمپٹ ڈیڈ لائن (#9153) سے بھی الگ ہے، جو آؤٹ پٹ کے معیار سے قطع نظر ایک قطعی حفاظتی حد برقرار رہتی ہے۔

واچ ڈاگ کے ابارٹ کرنے سے پہلے ایک وارم اَپ مدت، اور اس کے بعد ایک مکمل رولنگ ونڈو درکار ہوتی ہے۔ یہ Chat Completions اور Responses API کے آؤٹ پٹ ایونٹس سے ٹیکسٹ ڈیلٹاز شمار کرتا ہے (UTF-8 بائٹس کا ایک محتاط تخمینہ)، صرف usage والے اور خالی ایونٹس کو نظر انداز کرتا ہے، اور ٹول کال یا ریزننگ ایونٹس زیرِ عمل ہونے کے دوران فیصلہ معطل رکھتا ہے۔ یہ بطور ڈیفالٹ غیر فعال ہے اور اسے `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` کے ذریعے فعال کیا جا سکتا ہے؛ ونڈو، وارم اَپ، کم از کم شرح، اور کم از کم قابلِ پیمائش آؤٹ پٹ کو معمول کی resilience-settings نارملائزیشن لیئر محدود کرتی ہے۔

فعال ہونے پر، واچ ڈاگ ابارٹ صرف زیرِ عمل اپ اسٹریم اٹیمپٹ پر لاگو ہوتا ہے۔ کلائنٹ کو دکھائی دینے والی کوئی بائٹ بھیجنے سے پہلے، موجودہ اسی اکاؤنٹ کا ابتدائی ریکوری پاتھ اٹیمپٹ کو دوبارہ کھول سکتا ہے۔ کمٹ کے بعد، اسٹریم کو کبھی بھی بلا سوچے سمجھے دوبارہ نہیں چلایا جاتا؛ صرف موجودہ محفوظ مڈ-اسٹریم کنٹینیوایشن کانٹریکٹ ہی لاحقہ جوڑ سکتا ہے۔ فائنلائزیشن سنگل شاٹ رہتی ہے، اس لیے usage اکاؤنٹنگ اور سیمی فور ریلیز کی نقل نہیں بنتی۔

---

## 7. اپ اسٹریم اسٹیٹس کی ازسرِنو تعیین (غلط طور پر ظاہر کردہ کوٹا ایررز)

**دائرۂ کار:** ایک ایسا اپ اسٹریم گیٹ وے جو عارضی کوٹا ختم ہونے کی اطلاع غلط HTTP اسٹیٹس کے ساتھ دیتا ہے۔

**مقصد:** درجہ بندی سے پہلے گمراہ کن اسٹیٹس کو درست کرنا، تاکہ ڈاؤن اسٹریم صارفین (فال بیک انجن، کومبو ایگریگیشن، کلائنٹ کے سامنے آنے والا ریسپانس) ناکامی کی حقیقی، دوبارہ کوشش کے قابل نوعیت دیکھ سکیں۔

کچھ گیٹ ویز عارضی کوٹا ختم ہونے کی اطلاع ناقابلِ تکرار HTTP
اسٹیٹس سے دیتے ہیں۔ `agentrouter.org` معیاری `429` کے بجائے چینی باڈی
(`用户额度不足` / `额度不足`) کے ساتھ `403` (کبھی کبھار `400`) واپس کرتا ہے۔ Claude
Code جیسے کلائنٹس `403` کو مستقل سمجھتے ہیں اور سیشن ختم کر دیتے ہیں، اور تصحیح
کے بغیر فال بیک انجن اسے کوٹا ایونٹ کے بجائے `AUTH_ERROR` کے طور پر درجہ بند
کرے گا۔

**نفاذ:**

- رجسٹری + میچر: `open-sse/config/upstreamStatusRestatement.ts` — قواعد کی
  فی پرووائیڈر فہرست (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`)، جس کی میچنگ `applyStatusRestatement()` کے ذریعے ہوتی ہے۔
- کال سائٹ: `open-sse/handlers/chatCore.ts` میں `providerFailure:` بلاک
  (تقریباً لائن 3654)، `parseUpstreamError()` کے ایک ایرر HTTP اسٹیٹس
  (`!providerResponse.ok`) والے اپ اسٹریم ریسپانس کو پارس کرنے کے فوراً بعد، اور کسی بھی
  درجہ بندی کے چلنے سے پہلے، تاکہ ہر ڈاؤن اسٹریم صارف تصحیح شدہ
  اسٹیٹس دیکھے۔ `200` SSE اسٹریم کے اندر شامل ایررز ایک الگ،
  بعد کے اسٹریم پارسنگ پاتھ کی پیروی کرتے ہیں اور آج اس ہک میں **شامل نہیں** ہیں — یہ
  ایک معلوم حد ہے، جو agentrouter کے غلط اسٹیٹس کے لیے ابھی درکار نہیں (کیونکہ
  وہ ایرر HTTP اسٹیٹس کے طور پر ظاہر ہوتا ہے)۔
- دوبارہ کوشش کی اہلیت: `429`، `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) میں شامل ہے، لہٰذا ازسرِنو متعین کردہ ایرر
  ایک غیر مؤثر `403` کے طور پر ظاہر ہونے کے بجائے حقیقی ری ٹرائی ونڈو رکھتا ہے۔
- مصنوعی `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  صرف وہ قدر ہے جو ازسرِنو متعین کردہ ریسپانس **کلائنٹ** کو بتاتا ہے؛ یہ بذاتِ خود
  کنکشن کے اندرونی کول ڈاؤن/لاک آؤٹ کی مدت نہیں — اس کا تعین
  الگ سے اس میکانزم کے ذریعے ہوتا ہے جو حقیقتاً ازسرِنو متعین کردہ ایرر کو سنبھالتا ہے
  (Connection Cooldown کا بڑھتا ہوا بیک آف، §2، API-key
  پرووائیڈرز کے لیے بنیادی `3s`؛ یا agentrouter جیسے فی ماڈل کوٹا پرووائیڈرز کے لیے
  Model Lockout، §3)۔ راؤٹر اندرونی طور پر دوبارہ کوشش کے لیے اس 60s ونڈو سے پہلے اہل
  ہو سکتا ہے جس کا وہ کلائنٹ کو اعلان کرتا ہے — یہ دانستہ اضافی گنجائش ہے،
  بگ نہیں۔

مستقل ایررز (agentrouter کا `无权访问模型` — اس ماڈل تک رسائی نہیں) کو
کبھی بھی ازسرِنو متعین نہیں کیا جاتا: `textMarkers` کے میچ ہونے پر بھی `excludeMarkers` قاعدے کو ویٹو کرتا ہے،
اس لیے ایرر اپنا اصل اسٹیٹس برقرار رکھتا ہے اور کوئی چیز اس پر ہمیشہ کے لیے دوبارہ کوشش نہیں کرتی۔ متعلقہ
پرووائیڈر درجہ بندی کا قاعدہ
(`open-sse/config/providerErrorRules.ts` میں `agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`، اعلان کردہ بنیادی کول ڈاؤن `6h`) سے
`checkFallbackError` (`open-sse/services/accountFallback.ts`) کے ذریعے
عمومی apikey-زمرے کے `FORBIDDEN` ابتدائی ریٹرن سے _پہلے_ رجوع کیا جاتا ہے، اور اسے
`honorsRuleLockScope(provider)` پر گیٹ کیا گیا ہے (#10334 — فی الحال
`providerErrorRules.ts` میں موجود `HONORS_RULE_LOCK_SCOPE_PROVIDERS` الاؤ لسٹ کے ذریعے
صرف agentrouter کے لیے)۔ قاعدے کا اعلان کردہ 6h کول ڈاؤن
`fallbackResult.baseCooldownMs` کے طور پر آگے منتقل ہوتا ہے، لیکن پھر بھی پہلے سے موجود
فی ماڈل کوٹا لاک آؤٹ پاتھ (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`، جسے #10334 نے کول ڈاؤن
ماخذ کے سوا تبدیل نہیں کیا) میں جاتا ہے: ہر دوسرے ماڈل لاک آؤٹ کی طرح، اسے آپریٹر کے
`mlSettings.maxCooldownMs` (ڈیفالٹ `1_800_000ms` / 30min) تک کم کر دیا جاتا ہے، اور
_محفوظ شدہ لاک آؤٹ وجہ_ پہلے سے موجود ہارڈ کوڈڈ `"forbidden"` ہی رہتی ہے،
قاعدے کی `"auth_error"` نہیں — صرف کول ڈاؤن کی مدت ابتدا سے انتہا تک لاگو ہوتی ہے،
وجہ کی اسٹرنگ نہیں۔ کنکشن خود فعال رہتا ہے؛
اسی کنکشن پر موجود دوسرے ماڈلز متاثر نہیں ہوتے۔

دوبارہ بیان کردہ کوٹا کی خرابیاں (`额度不足`) پروڈکشن میں ایک فراہم کنندہ کے اصول تک پہنچتی ہیں
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`، اس کا اپنا کوئی اعلان کردہ cooldown نہیں — persistence layer کا
scaled backoff ڈیفالٹ لاگو ہوتا ہے)۔ #10334 کے بعد سے،
`ProviderErrorRuleMatch` پر موجود `scope` شروع سے آخر تک استعمال **ہوتا ہے**، لیکن
**صرف** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist میں شامل فراہم کنندگان کے لیے
(`providerErrorRules.ts` — فی الحال صرف `"agentrouter"`، جسے
`honorsRuleLockScope()` کے ذریعے gated کیا گیا ہے)۔ ہر دوسرے فراہم کنندہ کے لیے
`scope` بدستور صرف معلوماتی ہے، بالکل اسی طرح جیسے #10334 سے پہلے تھا۔
`checkFallbackError` مماثل اصول کے scope کو
`fallbackResult.ruleScope` کے طور پر ظاہر کرتا ہے؛
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) مشترکہ guard ہے جو تصدیق کرتا ہے کہ کوئی
`ruleScope` واقعی connection-wide، خود بحال ہونے والے signal کے طور پر اپنانے کے
لیے محفوظ ہے (`scope` `"connection"`، reason `quota_exhausted`، کبھی
`permanent` نہیں، کبھی `creditsExhausted` نہیں — کسی مستقبل کے اصول کے خلاف
دفاع، جو scope `"connection"` کو اکاؤنٹ کی مستقل حالت کے ساتھ جوڑ دے)۔ دو
consumers اسے کال کرتے ہیں:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider کی **per-model** lockout branch میں جانے کے بجائے
  (agentrouter میں `passthroughModels: true` ہے → `hasPerModelQuota()`
  `true` واپس کرتا ہے)، یہ ایک **عارضی connection cooldown** لاگو کرتا ہے —
  `testStatus: "unavailable"` + `rateLimitedUntil`، اور کبھی terminal status
  (`credits_exhausted`/`banned`/`expired`) نہیں — تاکہ cooldown ختم ہونے کے
  بعد connection خود بحال ہو جائے، بجائے اس کے کہ manual credential reset
  درکار ہو۔ `disableCooling: true` والے connections کے لیے اسے چھوڑ دیا جاتا
  ہے (#2997): اس صورت میں opt-out واپس per-model lockout پر چلا جاتا ہے
  (یہ ایک دستاویزی trade-off ہے — branch کے اوپر موجود code comment دیکھیں)۔
- **اسی درخواست کی combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): یہی guard اس
  connection کو in-memory `exhaustedConnections` set میں نشان زد کرتا ہے،
  جس کی key `${provider}:${connectionId}` ہوتی ہے۔ یہ صرف اسی باقی ماندہ
  SAME-REQUEST target کو چھوڑتا ہے جو _خود اپنے target object پر بعینہٖ وہی
  `connectionId` رکھتا ہو_ (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`، `if (provider &&
connectionId)` کو `exhaustedConnections` lookup سے پہلے) — ایک سادہ
  model-list combo، جس میں sibling targets کا اپنا کوئی pinned
  `connectionId` نہیں ہوتا اور ہر dispatch کے لیے صرف response کے
  `X-OmniRoute-Selected-Connection-Id` header سے ایک resolve ہوتا ہے، کبھی اس
  key match تک نہیں پہنچتا۔ اس عام صورت میں، باقی leg کو ابھی ختم شدہ اکاؤنٹ
  دوبارہ استعمال کرنے سے بچانے والا حقیقی تحفظ یہ Set **نہیں** — بلکہ اوپر
  بیان کردہ persistence layer ہے (connection کا `rateLimitedUntil` اب مستقبل
  میں ہے)، اور اس کے ساتھ یہی guard failure کے لیے
  `transientRateLimitedProviders` کو suppress کرتا ہے (دیکھیے "دو مرحلوں والا
  ڈیزائن" اور `targetExhaustion.ts` میں
  `isAgentrouterConnectionQuotaScope` branch پر code comment): جب اس Set کو
  unmarked چھوڑا جاتا ہے تو `combo.ts` کا `allowRateLimitedConnection`
  force-allow (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) فراہم
  کنندہ کی باقی legs کے لیے فعال **نہیں** ہوتا، اس لیے credential selection کا
  `rateLimitedUntil` filter (`src/sse/services/auth.ts:1238`) معمول کے مطابق
  برقرار رہتا ہے اور باقی leg یا تو کوئی مختلف، اب بھی eligible agentrouter
  connection منتخب کرتی ہے یا دستیاب credentials نہ ہونے کی وجہ سے ناکام ہو
  جاتی ہے — یہ زبردستی اس connection پر واپس نہیں جاتی جسے اس branch نے ابھی
  cooldown میں ڈالا ہے۔

### دو مرحلوں والا ڈیزائن: status کی دوبارہ پیش کش، پھر classification

Status کی دوبارہ پیش کش (`upstreamStatusRestatement.ts`) اور فراہم کنندہ کے
classification rules (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) الگ registries ہیں، اور دونوں provider id اور text
markers کے لحاظ سے key کرتے ہیں، لیکن یہ مختلف مقامات پر چلتے ہیں اور مختلف
مقاصد پورے کرتے ہیں: restatement، `chatCore.ts` میں ابتدائی طور پر HTTP status
کو دوبارہ لکھتا ہے؛ classification rules، `checkFallbackError()` کے اندر
fallback کا `reason` اور lock کا `scope`
(`model` / `provider` / `connection`) منتخب کرتے ہیں
(`open-sse/services/accountFallback.ts`)۔

Classification rules کو مکمل error **text** (جو `额度不足` جیسے body markers
سے match کرنے کے لیے درکار ہے) صرف `providerErrorRules.ts` کی
`FULL_TEXT_RULE_PROVIDERS` allowlist میں شامل فراہم کنندگان کے لیے دکھائی دیتا
ہے — فی الحال صرف `"agentrouter"`۔ ہر دوسرے **built-in catalog** فراہم کنندہ
کے لیے، `checkFallbackError`، `getProviderErrorRuleMatch` کو صرف structured
error (`{code, type}`) دیتا ہے، جو header/status/code پر مبنی rules کے لیے کافی
ہے مگر body-text markers نہیں دیکھ سکتا۔ helper `resolveRuleMatchBody()` یہ
انتخاب انجام دیتا ہے: allowlisted فراہم کنندگان کے لیے مکمل error text، اور
باقیوں کے لیے structured error۔ کسی **built-in** فراہم کنندہ کو
`FULL_TEXT_RULE_PROVIDERS` میں شامل کرنا ایک واضح per-provider opt-in ہے — یہ
اس لیے موجود ہے تاکہ فہرست سے باہر ہر فراہم کنندہ کا default path byte-for-byte
بغیر تبدیلی کے برقرار رہے۔

کسی rule کا `scope` (`model` / `provider` / `connection`)،
`FULL_TEXT_RULE_PROVIDERS` سے الگ opt-in ہے: `checkFallbackError` اسے صرف
`fallbackResult.ruleScope` کے طور پر ظاہر کرتا ہے، اور downstream consumers اسے
معلوماتی label کے علاوہ کسی اور حیثیت میں صرف اسی فائل کی
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist میں شامل فراہم کنندگان کے لیے
اپناتے ہیں (`honorsRuleLockScope()` کے ذریعے gated — فی الحال صرف
`"agentrouter"`)۔ جب کوئی فراہم کنندہ اس allowlist میں شامل ہو، تو
`scope: "connection"` کا match عملاً کیا کرتا ہے، اس کے لیے اوپر "دوبارہ بیان
کردہ کوٹا کی خرابیاں" دیکھیں۔

**#11104 — آپریٹر کی اعلان کردہ قواعد دونوں allowlists کو بائی پاس کرتی ہیں۔** ایک آپریٹر
`settings.providerErrorRules` کے ذریعے رن ٹائم پر فی فراہم کنندہ قاعدہ
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
اس فائل میں ترمیم کیے بغیر اعلان کر سکتا ہے۔ کسی آپریٹر قاعدے کو
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — ایسی allowlists
جو بلٹ اِن کیٹلاگ قواعد کے **ڈیفالٹ** رویے کی حفاظت کے لیے بنائی گئی ہیں — کے
پیچھے محدود کرنے سے settings کا طریقۂ کار ان تمام فراہم کنندگان کے لیے غیر مؤثر
ہو جائے گا جو پہلے سے وہاں درج نہیں ہیں، کیونکہ قاعدے کا اعلان کرنا پہلے ہی
آپریٹر کی واضح opt-in ہے۔ `resolveRuleMatchBody()` اور `honorsRuleLockScope()`
دونوں پہلے `hasOperatorRuleForProvider()` کو چیک کرتے ہیں: آپریٹر قاعدہ رکھنے
والے فراہم کنندہ کو خام خرابی کا متن ملتا ہے اور اس کے اعلان کردہ `scope` کا
احترام کیا جاتا ہے، خواہ وہ کسی allowlist میں موجود ہو یا نہ ہو۔

**معلوم خلا — HTTP 400 کے لیے `providerRuleRegistry` سے کبھی رجوع نہیں کیا جاتا۔**
`checkFallbackError` کی `BAD_REQUEST` شاخ status 400 کی مکمل درجہ بندی
اپنی pattern arrays (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` وغیرہ، `accountFallback.ts` میں) کے ذریعے کرتی ہے
اور اس سے اوپر والی `configuredRule`/`getProviderErrorRuleMatch` شاخ تک پہنچنے
سے پہلے واپس آ جاتی ہے۔ `status: 400` والا بلٹ اِن کیٹلاگ قاعدہ (یا آپریٹر
قاعدہ) نحوی طور پر درست ہے، لیکن کبھی فعال نہیں ہوگا۔ آج کوئی موجودہ قاعدہ
400 کو ہدف نہیں بناتا، اس لیے پروڈکشن میں کچھ بھی متاثر نہیں ہوتا — لیکن مستقبل
کے کسی 400 قاعدے کے لیے پہلے اس شاخ میں تبدیلی درکار ہوگی، جو محض قاعدہ شامل
کرنے سے کہیں بڑی تبدیلی ہے (یہ ان تمام فراہم کنندگان کے لیے 400 کی دوبارہ
درجہ بندی کرتی ہے جو پہلے ہی pattern-array رویے پر انحصار کرتے ہیں) اور کسی
ایک فراہم کنندہ کا قاعدہ شامل کرنے کے دائرۂ کار سے باہر ہے۔

### کوٹے کو غلط ظاہر کرنے والا نیا گیٹ وے شامل کرنا

1. `statusRestatementRegistry` میں ایک rule array رجسٹر کریں
   (`open-sse/config/upstreamStatusRestatement.ts`)۔ `textMarkers` کو
   فراہم کنندہ کے لیے مخصوص رکھیں؛ ایسے عمومی انگریزی فقرے کبھی دوبارہ استعمال
   نہ کریں جو `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) سے متصادم ہوں۔
2. درست lock scope منتخب کرنے کے لیے اختیاری طور پر
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) میں
   classification rules رجسٹر کریں (`connection` اکاؤنٹ بھر کے کوٹے کے لیے،
   `model` فی ماڈل خرابیوں کے لیے)۔ یہ مرحلہ پروڈکشن میں صرف ان فراہم کنندگان
   کے لیے مؤثر ہوتا ہے جن کے قواعد کو خرابی کا مکمل متن (body markers) درکار
   ہو: اسی فائل میں فراہم کنندہ کی id کو `FULL_TEXT_RULE_PROVIDERS` میں شامل
   کریں — بصورت دیگر `checkFallbackError` قاعدے کو صرف structured
   `{code, type}` خرابی فراہم کرتا ہے اور body-text قاعدہ لائیو ٹریفک سے کبھی
   match نہیں کرے گا۔ وہ قواعد جو خالصتاً `status`/`headers` پر match کرتے ہیں
   (جیسے Opencode یا Minimax کے قواعد)، انہیں اس opt-in کی ضرورت نہیں۔ الگ طور
   پر، اگر قاعدہ `scope: "connection"` کا اعلان کرتا ہے اور مقصد محض معلوماتی
   لیبل کے بجائے حقیقی connection-wide cooldown اور اسی درخواست میں combo skip
   ہے، تو اسی فائل میں فراہم کنندہ کی id کو
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` میں شامل کریں — یہی
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) اور
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) میں
   `isAgentrouterConnectionQuotaScope()` طرز کے استعمال کو gate کرتا ہے؛ اس کے
   بغیر `scope` بدستور `fallbackResult.ruleScope` کے ذریعے منتقل ہوتا ہے لیکن
   کوئی چیز اس پر عمل نہیں کرتی۔
3. `tests/unit/upstream-status-restatement.test.ts` اور
   `tests/unit/agentrouter-error-rules.test.ts` کی طرز پر unit tests شامل کریں
   (بشمول not-permanent / not-creditsExhausted guards، اور — اگر فراہم کنندہ کو
   allowlist درکار ہو — ایسا test جو تصدیق کرے کہ `resolveRuleMatchBody()` صرف
   اسی فراہم کنندہ کے لیے مکمل متن واپس کرتا ہے)۔

`chatCore.ts`، `classifyError` یا combo میں کسی تبدیلی کی ضرورت نہیں۔

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` میں شامل فراہم کنندگان (opencode family) کو
IP-bucketed upstream سمجھا جاتا ہے (opencode free tier، account-bucketed نہیں
بلکہ IP-bucketed ہے — #9611 دیکھیں): `quota_exhausted` **یا**
`rate_limit_exceeded` کے طور پر درجہ بند status-429، rotation کے ذریعے ان کو
آزمانے سے پہلے، allowlisted-family کے ہر ایسے connection کو cooldown کرتا ہے
جس کا آخری معلوم egress IP ناکام ہونے والے connection کے IP سے match کرتا ہو
— یوں N-1 یقینی طور پر ناکام upstream calls سے بچا جاتا ہے (#10460/#10525
جیسی ہی ساخت)۔ `rate_limit_exceeded` کو دانستہ شامل کیا گیا ہے:
`markAccountUnavailable` کے راستے پر opencode-specific قواعد کبھی match نہیں
کرتے (`checkFallbackError` کو headers/body نہیں دیے جاتے، اور opencode
`FULL_TEXT_RULE_PROVIDERS` میں شامل نہیں)، لہٰذا وہ 429 جس کی body میں
subscription-quota متن ("monthly usage limit reached") موجود ہو، `status_429`
قاعدے تک پہنچنے سے پہلے quota-text fallback
(`buildSubscriptionQuotaFallback`، `accountFallback.ts`؛ 1h cooldown) کے ذریعے
`quota_exhausted` کے طور پر درجہ بند ہو جاتا ہے — جبکہ quota-text سے خالی 429
(سادہ rate limiting) کی درجہ بندی `status_429` قاعدے کے ذریعے
`rate_limit_exceeded` کے طور پر ہوتی ہے اور پھر بھی IP family کو cooldown
کرتی ہے۔ کسی allowlisted فراہم کنندہ کے لیے IP-bucketed rate limit، ختم شدہ
کوٹے ہی کے برابر اشارہ ہے۔ واضح حدود:

- **بہترین ممکنہ کوشش**: لاک `proxy_logs` سے کنکشن کے آخری معلوم `egress_ip`
  کو اخذ کرتا ہے (24 گھنٹے کی ونڈو، synchronous، کوئی cache نہیں)۔ Cold cache (egress
  IP کو کبھی probe نہ کیا گیا ہو) یا کوئی row نہ ہو → ناکام ہونے والے کنکشن کو پھر بھی اس
  branch کے ذریعے cooldown کیا جاتا ہے (جیسے آج record ہوتا ہے)، صرف کسی sibling کو لاک
  نہیں کیا جاتا۔
- **کبھی terminal نہیں**: cooldown تجدید ہونے والی quota window ہے
  (`testStatus: "unavailable"`)؛ IP-level signal سے کبھی permanent state اخذ نہیں
  کی جاتی۔ `disableCooling` کنکشن اس branch کو مکمل طور پر چھوڑ دیتے ہیں۔
- **Allowlisted family کے لیے لاک کی granularity تبدیل ہوتی ہے**: یہ scope
  کی تبدیلی ہے، صرف sibling optimization نہیں۔ opencode ایک `passthroughModels`
  provider ہے، اس لیے اس branch سے پہلے 429 فی-MODEL lockout پیدا کرتا تھا؛ اب یہ
  connection cooldown پیدا کرتا ہے — اس operator کے لیے بھی جو کسی sibling کے بغیر
  صرف ایک connection چلا رہا ہو۔ یہی وہ granularity ہے جسے opencode کی rule
  table پہلے ہی درست قرار دیتی ہے (`scope: "connection"`,
  `providerErrorRules.ts`)، مگر اب تک اس پر کبھی عمل نہیں ہوا کیونکہ opencode
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` میں شامل نہیں ہے۔ یہ branch ناکام ہونے والے
  connection کا cooldown + `backoffLevel` خود لکھتا ہے، connection-scoped
  agentrouter branch کی عکاسی کرتے ہوئے، اور return کر دیتا ہے — ذیل کے per-model block
  اور generic path تک کبھی رسائی نہیں ہوتی۔
- **Combo شامل ہے**: agentrouter branch کی طرح، scope دانستہ طور پر
  `persistUnavailableState`/`isCombo` downgrade کو نظرانداز کرتا ہے جو combo caller
  کسی 429 پر لاگو کرتا ہے۔ Per-model lockout اس scope کی کمزور شکل نہیں بلکہ
  غلط unit ہے: یہ exhausted IP کے بارے میں کچھ نہیں بتاتا، لہٰذا combo
  rotation ہر sibling کے لیے ایک یقینی طور پر ناکام call ضائع کرتا رہے گا۔
- **Sibling کی حفاظت**: جو sibling پہلے ہی terminal (banned/credits_exhausted)
  ہو یا پہلے ہی زیادہ طویل cooldown میں ہو، اسے کبھی overwrite نہیں کیا جاتا۔
- **خصوصی allowlist**: `EGRESS_BUCKETED_LOCK_PROVIDERS` کو وسیع کرنا
  owner کا واضح فیصلہ ہے؛ کوئی generic wiring نہیں (pattern #10334/#10419)۔
  Sibling query اسے SQL literal کے طور پر دہرانے کے بجائے اسی allowlist کو bind
  کرتی ہے، اس لیے اسے وسیع کرنا ایک سطر کی تبدیلی ہی رہتا ہے۔
- **Egress IP rotation، دونوں سمتوں میں**: lookup window (24h)،
  egress-IP cache TTL (5 min) سے کہیں زیادہ وسیع ہے، اس لیے "آخری معلوم IP" موجودہ
  حالت نہیں بلکہ history ہے۔ اگر کسی connection کا proxy اس window کے اندر rotate
  ہوا ہو تو لاک واقعی shared IP کو **چھوڑ** سکتا ہے (record شدہ IP نیا،
  unexhausted IP ہو) — اور اسی طرح یہ ایسے sibling کو **cooldown کر سکتا ہے جو تب سے
  rotate ہو کر** exhausted IP سے دور جا چکا ہو۔ دوسری صورت میں اس sibling کو ایک
  cooldown window کا نقصان ہوتا ہے؛ دونوں کو history-based lookup کی قبول شدہ
  best-effort حدود سمجھا گیا ہے۔
- **لاگت**: `proxy_logs` کے دو محدود scans (window، `idx_pl_timestamp`
  کے ذریعے filter کی گئی)، صرف 429 کی frequency پر۔ کوئی نیا index نہیں (migration 134
  YAGNI)۔ معتدل سائز کی real-traffic DB copy پر پیمائش کی گئی؛
  high-throughput instance اسی window میں متناسب طور پر زیادہ rows رکھتا ہے۔

---

## لچک پذیری کی دیگر خصوصیات

- **19 روٹنگ حکمتِ عملیاں** (ترجیحی، وزنی، راؤنڈ رابن، کانٹیکسٹ ریلے، پہلے پُر کریں، p2c، بے ترتیب، کم ترین استعمال شدہ، لاگت کے لحاظ سے بہتر، ری سیٹ سے باخبر، ری سیٹ ونڈو، اضافی گنجائش، سخت بے ترتیب، خودکار، lkgp، کانٹیکسٹ کے لحاظ سے بہتر، کیش کے لحاظ سے بہتر، فیوژن، پائپ لائن) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) دیکھیں۔
- **ری سیٹ سے باخبر روٹنگ** (v3.8.0) — کوٹہ ری سیٹ ہونے کے وقت کے مطابق کنکشنز کو ترجیح دیتی ہے۔
- **پسِ منظر موڈ کی تنزلی** — Responses API کا `background: true` انتباہ کے ساتھ سنک موڈ میں تبدیل کر دیا جاتا ہے۔
- **ٹول کی حد کی متحرک شناخت** — ٹولز کی تعداد کی حد پوری ہونے پر فراہم کنندگان سے پسپائی اختیار کرتی ہے۔
- **ہنگامی فال بیک** — اسے `OMNIROUTE_EMERGENCY_FALLBACK` کنٹرول کرتا ہے؛ آپریٹرز ری اسٹارٹ کیے بغیر Feature Flags صفحے سے اسے اوور رائیڈ کر سکتے ہیں۔

---

## ڈیبگنگ

- ویٹڈ کومبو `503 all_targets_cooling_down` جواب دیتا ہے (`Retry-After` سیٹ ہوتا ہے، اور `diagnostics.excluded` ہر ہدف کو `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` کے ساتھ درج کرتا ہے) → پول کنفیگر اور منسلک ہے، بس ہر ہدف کسی resilience ٹائمر کے باعث خارج ہے؛ `[COMBO] Weighted selection: every target excluded before dispatch — …` انتباہ وجوہات اور باقی سیکنڈز بتاتا ہے۔ اسی کومبو سے آنے والے `404 no_executable_targets` کا مطلب ہے کہ کوئی resilience ٹائمر شامل نہیں تھا (چلانے کے لیے کچھ نہیں، یا ہر اکاؤنٹ availability probe میں ناکام ہو گیا)۔ یہ `targetResolution.ts` میں جمع کی گئی exclusions سے `open-sse/services/combo/pinRecovery.ts` میں بنایا جاتا ہے۔
- کسی provider کی تمام keys چھوڑ دی جائیں → circuit breaker کی حالت اور ہر connection کے `rateLimitedUntil`/`testStatus`، دونوں چیک کریں۔
- reset window کے بعد provider مستقل طور پر خارج رہے → کوڈ `getStatus()`/`canExecute()` کے بجائے خام `state` پڑھ رہا ہے۔
- ایک key ناکام ہو، مگر باقی کام کرنی چاہییں → circuit breaker کے بجائے connection cooldown کو ترجیح دیں۔
- صرف ایک model ناکام ہو → connection cooldown کے بجائے model lockout کو ترجیح دیں۔
- state کو خود بحال ہونا چاہیے مگر نہیں ہوتا → مستقبل کے timestamp اور اس read path کو چیک کریں جو میعاد ختم ہونے والی state کو refresh کرتا ہے۔ مستقل statuses کے لیے دستی تبدیلیاں درکار ہوتی ہیں۔

---

## TLS فنگر پرنٹنگ اور مخفی طرزِ عمل

فراہم کنندہ کے لیے مخصوص مخفی طرزِ عمل (JA3/JA4، CCH، ابہام کاری) الگ سے دستاویزی شکل میں موجود ہے — `docs/security/STEALTH_GUIDE.md` دیکھیں (git؛ `/docs` میں کمپائل نہیں کیا گیا)۔

---

## لچک پذیری کی ٹیسٹنگ (مرحلہ 8 · بلاک C)

لچک پذیری کی منطق کے یونٹ ٹیسٹس کے علاوہ، تین ٹیسٹس حقیقی دباؤ/ناکامی کی صورتِ حال میں
رن ٹائم کی جانچ کرتے ہیں (سبھی انٹیگریشن/شبینہ ہیں — کوئی بھی PRs کو بلاک نہیں کرتا):

| ٹیسٹ          | کیا جانچتا ہے                                                                                                                                                                                      | چلانے کا طریقہ                         |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| کیاؤس         | جعلی اپ اسٹریم نوڈ حقیقی تاخیر/ری سیٹ/ٹائم آؤٹ/503 داخل کرتا ہے؛ توثیق کرتا ہے کہ سرکٹ بریکر کھلتا/بحال ہوتا ہے اور `checkFallbackError`، 503 کو قابلِ بازیابی فال بیک کے طور پر درجہ بند کرتا ہے۔ | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| ہیپ میں اضافہ | `--expose-gc` کے تحت ہر `createSSEStream` کے لیے تقریباً 500 اسٹریمز؛ اگر ہیپ مقررہ حد سے زیادہ بڑھے تو ناکام ہو جاتا ہے (OOM حفاظتی بندوبست #3069)۔                                               | `npm run test:heap`                    |
| k6 سوک        | `/api/monitoring/health` پر مسلسل لوڈ؛ p95/خرابی کی حدیں۔                                                                                                                                          | `k6 run tests/load/k6-soak.js` (شبینہ) |

اسے `.github/workflows/nightly-resilience.yml` (cron + dispatch) منظم کرتا ہے۔ طے شدہ
`test:integration` میں، کیاؤس اور ہیپ خود بخود چھوڑ دیے جاتے ہیں (`RUN_CHAOS_INT`/`--expose-gc` کے بغیر)۔

---

## مزید دیکھیں

- [آرکیٹیکچر گائیڈ](./ARCHITECTURE.md) — سسٹم آرکیٹیکچر اور اندرونی ساخت
- [صارف گائیڈ](../guides/USER_GUIDE.md) — فراہم کنندگان، کمبوز، CLI انضمام
- [آٹو-کمبو انجن](../routing/AUTO-COMBO.md) — 16-عنصری اسکورنگ، موڈ پیکس
