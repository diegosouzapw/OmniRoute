# Resilience Guide (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute میں تین الگ لیکن باہم مربوط لچک (resilience) کے طریقہ کار موجود ہیں۔ ہر ایک کا دائرہ کار اور مقصد مختلف ہے۔ روٹنگ کے رویّے کی ڈیبگنگ کرتے وقت انہیں الگ الگ رکھیں۔

![تین پرتوں والا لچک ماڈل](../diagrams/exported/resilience-3layers.svg)

> ماخذ: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. پرووائیڈر سرکٹ بریکر

**دائرہ کار:** پورا پرووائیڈر (مثلاً `glm`، `openai`، `anthropic`)۔

**مقصد:** ایسے پرووائیڈر کو ٹریفک بھیجنا روکنا جو اپ اسٹریم/سروس کی سطح پر بار بار ناکام ہو رہا ہو۔

**عمل درآمد:**

- بنیادی کلاس: `src/shared/utils/circuitBreaker.ts`
- وائرنگ: `src/sse/handlers/chatHelpers.ts`، `src/sse/handlers/chat.ts`
- اسٹیٹس API: `GET /api/monitoring/health`
- ری سیٹ API: `POST /api/resilience/reset`
- ریپرز: `open-sse/services/accountFallback.ts`
- ڈیٹابیس ٹیبل: `domain_circuit_breakers`

**حالتیں:**

- `CLOSED` — عام ٹریفک کی اجازت ہے
- `DEGRADED` — ٹریفک اب بھی جاری ہے، لیکن پرووائیڈر کی بڑھتی ہوئی ناکامیوں کو ٹریک کیا جا رہا ہے؛ کافی کامیابیوں پر، کسی درست کنکشن ٹیسٹ پر، یا آخری ناکامی کی قسم کے لیے سب سے طویل `OPEN` ہولڈ (اس کی `cooldownByKind` قیمت، ورنہ `resetTimeout`، × `maxBackoffMultiplier`، کم از کم ایک کول ڈاؤن) کے بعد بغیر کسی نئی ناکامی کے `CLOSED` پر واپس آ جاتا ہے
- `OPEN` — پرووائیڈر عارضی طور پر بلاک؛ کومبو روٹنگ اسے نظرانداز کر دیتی ہے
- `HALF_OPEN` — ری سیٹ ٹائم آؤٹ پورا ہو چکا؛ جانچ (probe) کی درخواست کی اجازت ہے

**قابلِ ترتیب ڈیفالٹ اقدار (`open-sse/config/constants.ts`، ڈیش بورڈ → ترتیبات → لچک میں ظاہر شدہ):**

| کلاس    | DEGRADED ہونے کی حد | OPEN ہونے کی حد | ری سیٹ ٹائم آؤٹ |
| ------- | ------------------- | --------------- | --------------- |
| OAuth   | 5 ناکامیاں          | 8 ناکامیاں      | 60s             |
| API-key | 7 ناکامیاں          | 12 ناکامیاں     | 30s             |
| Local   | اخذ شدہ             | 2 ناکامیاں      | 15s             |

`degradationThreshold` یہ طے کرتا ہے کہ پرووائیڈر کب `DEGRADED` میں داخل ہوتا ہے؛ `failureThreshold` یہ طے کرتا ہے کہ وہ کب `OPEN` ہو کر نظرانداز ہوتا ہے۔ مقامی (Local) پرووائیڈر پروفائلز ابھی لچک کی ترتیبات کے صفحے پر ظاہر نہیں کیے گئے۔

**ٹرپ کوڈز:** صرف پرووائیڈر سطح کے اسٹیٹس `[408, 500, 502, 503, 504]`۔ اکاؤنٹ سطح کی خرابیوں (زیادہ تر 401/403/429 — وہ کول ڈاؤن یا لاک آؤٹ سے متعلق ہیں) پر ٹرپ نہ ہوں۔

**لیزی ریکوری:** جب `OPEN` کی مدت ختم ہو جاتی ہے تو `getStatus()`، `canExecute()`، `getRetryAfterMs()` حالت کو `HALF_OPEN` پر تازہ کر دیتے ہیں۔ یہی ریڈز (اور اگلی ناکامی) باسی `DEGRADED` کو آہستہ آہستہ `CLOSED` پر لوٹا دیتی ہیں۔ کسی بیک گراؤنڈ ٹائمر کی ضرورت نہیں۔

---

### اختیاری (opt-in) عالمی پرووائیڈر کول ڈاؤن (ونڈو گیٹ)

ایک چوتھی، **اختیاری** پرت (`PROVIDER_COOLDOWN_ENABLED`، ڈیفالٹ **آف**) ناکام ہوتے پرووائیڈرز کی درخواستوں کے درمیانی یادداشت `open-sse/services/providerCooldownTracker.ts` میں محفوظ رکھتی ہے، جس سے کومبو ٹارگٹ ریزولوشن رجوع کرتی ہے تاکہ مسلسل کومبو درخواستیں کسی حال ہی میں ناکام ہوئے پرووائیڈر کو بار بار دوبارہ نہ آزمائیں۔ پرووائیڈر سطح کی انٹریاں `PROVIDER_PROFILES` ونڈو گیٹ کی پابند ہوتی ہیں:

| پروفائل | کتنی ناکامیوں کے بعد ٹرپ (`providerFailureThreshold`) | کس ونڈو کے اندر (`providerFailureWindowMs`) | کتنی دیر کول ڈاؤن (`providerCooldownMs`) |
| ------- | ----------------------------------------------------: | ------------------------------------------: | ---------------------------------------: |
| OAuth   |                                                  `10` |                                     `15min` |                                   `5min` |
| API key |                                                  `15` |                                     `30min` |                                  `10min` |

حد سے کم رہنے پر پرووائیڈر کو کول ڈاؤن میں **نہیں** سمجھا جاتا؛ ایک کامیابی ونڈو کو صاف کر دیتی ہے۔ کنکشن سطح کی انٹریاں (`provider:connectionId`) اس کے بجائے ایکسپونینشل `minRetryCooldownMs → maxRetryCooldownMs` بیک آف برقرار رکھتی ہیں۔ اووررائیڈز: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`۔ ریگریشن گارڈ: `tests/unit/provider-cooldown-window-gate.test.ts`۔

## 2. کنکشن کول ڈاؤن

**دائرہ:** ایک پرووائیڈر کنکشن/اکاؤنٹ/کلید۔

**مقصد:** ایک خراب کلید کو نظرانداز کرنا، جبکہ اسی پرووائیڈر کے دیگر کنکشنز سروس فراہم کرتے رہیں۔

**نفاذ:**

- غیر دستیاب نشان زد کرنا: `src/sse/services/auth.ts::markAccountUnavailable()`
- انتخاب: اسی فائل میں `getProviderCredentials*`
- کول ڈاؤن کا حساب: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ترتیبات: `src/lib/resilience/settings.ts`

**ہر کنکشن کے فیلڈز:**

- `rateLimitedUntil` — وہ ٹائم اسٹیمپ جب تک کول ڈاؤن ختم ہوتا ہے
- `testStatus: "unavailable"`
- `lastError`، `lastErrorType`، `errorCode`
- `backoffLevel` — ایکسپونینشل بیک آف کاؤنٹر

**طے شدہ کول ڈاؤنز:**

- OAuth بنیادی: 5s
- API-key بنیادی: 3s
- API-key 429: اپ اسٹریم `Retry-After`/ری سیٹ ہیڈرز/قابلِ تجزیہ ری سیٹ متن کو ترجیح دیتا ہے
- بیک آف: `baseCooldownMs * 2 ** failureIndex`

**اینٹی تھنڈرنگ ہرڈ گارڈ:** بیک وقت ناکامیوں کو کول ڈاؤن کو حد سے بڑھانے یا `backoffLevel` کو دو دفعہ بڑھانے سے روکتا ہے۔

**کنکرنسی لیمیٹ 429s بیک آف کی سیڑھی نہیں چڑھتے۔** ایک `429` جس کا باڈی کنکرنسی لیمیٹ
کی اطلاع دیتا ہو ("too many concurrent requests"، "concurrency limit"، "parallel request
limit"، GLM `并发数过高`) اس کا مطلب ہے کہ اکاؤنٹ صحت مند ہے لیکن مصروف ہے۔
`checkFallbackError()` وجہ `concurrency_limited` واپس کرتا ہے: ابھی اگلے کنکشن پر فیل اوور
کریں، اس کنکشن کو مقررہ `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) یا اپ اسٹریم ری ٹرائی
اشارے کے لیے کول کریں، `backoffLevel` کو غیر تبدیل شدہ رکھیں، اور `skipProviderBreaker` سیٹ کریں۔
واضح کوٹہ باڈی پھر بھی غالب رہتی ہے، لہٰذا وہ باڈی جو کسی کوٹہ پیٹرن سے بھی میل کھاتی ہو، کوٹہ
فیصلہ ہی رہتی ہے۔ شناخت: `src/shared/utils/classify429.ts` میں `looksLikeConcurrencyLimit()`؛
فیصلہ: `open-sse/services/accountFallback/concurrencyLimit429.ts`۔ `classify429()` (بریکر کی
`FailureKind`) غیر تبدیل شدہ ہے اور ان باڈیز کے لیے اب بھی `rate_limit` پڑھتی ہے۔

**اسٹریم کانٹینٹ اسٹال اکاؤنٹ کو کول نہیں کرتے۔** جب کانٹینٹ اسٹال واچ ڈاگ
(`open-sse/utils/streamHandler.ts`) کسی ایسی اسٹریم سے دستبردار ہو جائے جس نے وقت پر کوئی
ماڈل آؤٹ پٹ نہیں بھیجی، تو `markAccountUnavailable()` کنکشن پر خرابی ریکارڈ کرتا ہے لیکن کوئی
کول ڈاؤن سیٹ نہیں کرتا: اسٹال اسی درخواست سے متعلق ہے، جو اکثر ایک لمبی ریزننگ ٹرن ہوتی ہے
جس کی ابھی تک کوئی آؤٹ پٹ نہیں آئی۔ آپریٹرز `resilienceSettings.streamStallCooldown.enabled`
کے ذریعے دوبارہ شامل ہو سکتے ہیں (طے شدہ `false`)۔

**ریزننگ فریمز کانٹینٹ اسٹال بجٹ کو دوبارہ شروع کرتے ہیں۔** ایک ریزننگ ماڈل اپنے پہلے
مرئی ٹوکن سے پہلے منٹوں تک سوچ سکتا ہے: Claude ایسے `thinking_delta` فریمز اسٹریم کرتا ہے جن کا
ریزننگ متن خالی ہو سکتا ہے، اور Responses API ایک کے بعد ایک ریزننگ آئٹم اسٹریم کرتا ہے۔
`isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) ان فریمز کو پہچانتا ہے،
اور واچ ڈاگ ٹرن منسوخ کرنے کے بجائے ہر ایک پر اپنا بجٹ دوبارہ شروع کرتا ہے۔ یہ پھر بھی ماڈل
آؤٹ پٹ نہیں ہوتے، لہٰذا وہ ٹرن جو صرف ریزننگ کے ساتھ ختم ہوتی ہے اب بھی خالی رپورٹ ہوتی ہے،
اور وہ ٹرن جو ریزننگ بند کر کے صرف ہارٹ بیٹس بھیجتی ہے، پھر بھی واچ ڈاگ کو متحرک کر دیتی ہے۔

غیر خالی دستخط والے Kiro کے بائنری `reasoningContentEvent` فریمز اس ریزننگ سرگرمی کو ایکزیکیوٹر کے
ذریعے خالی `reasoning_content` ڈیلٹا کے طور پر محفوظ رکھتے ہیں۔ دستخط آگے نہیں
بھیجا جاتا۔ میٹا ڈیٹا، نامکمل فریمز اور خالی دستخط کانٹینٹ بجٹ کو دوبارہ شروع نہیں
کرتے؛ آزاد ایکٹو اسٹریم ٹائم آؤٹ اور کلائنٹ منسوخی پھر بھی لاگو رہتی ہے
(`open-sse/executors/kiro/reasoning.ts`)۔

**حتمی حالتیں (کول ڈاؤنز نہیں):**

- `banned` — پابندی شدہ کلیدی الفاظ / اکاؤنٹ بین شناخت کے ذریعے سیٹ ہوتی ہے (دیکھیں [BAN_DETECTION](../security/BAN_DETECTION.md))، اور تین مسلسل اپ اسٹریم فی درخواست انکاروں سے (`request_rejected`، مثلاً Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`)؛ ایک واحد انکار صرف کنکشن کو کول ڈاؤن کرتا ہے
- `expired` (محدود ری ٹرائز کے بعد حتمی حالت میں منتقل ہوتی ہے — `EXPIRED_RETRY_MAX = 3` ایکسپونینشل بیک آف کے ساتھ — تاکہ عبوری OAuth خرابیاں اکاؤنٹ کے مستقل طور پر غیر فعال ہونے سے پہلے خود بحال ہو سکیں)
- `credits_exhausted`

یہ اس وقت تک برقرار رہتی ہیں جب تک اسناد تبدیل نہ ہوں یا کوئی آپریٹر انہیں ری سیٹ نہ کرے۔ حتمی حالتوں کو عبوری کول ڈاؤن حالت سے اوور رائٹ نہ کریں۔

**سست بازیابی:** جب `rateLimitedUntil` گزر جائے، کنکشن دوبارہ اہل ہو جاتا ہے۔ کامیاب استعمال پر، `clearAccountError()` تمام خرابی فیلڈز صاف کر دیتا ہے۔

### Claude OAuth استعمال کی دیوار: کم ترجیحی لین + سیشن لیمیٹ ری سیٹ

**دائرہ:** ایک Claude سبسکرپشن (OAuth) کنکشن۔ دونوں خصوصیات **فی کنکشن آپٹ اِن** ہیں
(کنکشن میں ترمیم → Claude سیکشن → `providerSpecificData` میں `lowPriorityMode` / `autoLimitReset`،
دونوں طے شدہ طور پر بند) اور Claude Code کے `/low-priority` اور `/limit-reset` کمانڈز
کی عکاسی کرتی ہیں (وائر کنٹریکٹ Claude Code 2.1.263 سے حاصل شدہ)۔

**نفاذ:**

- اسٹیٹ مشین + رسپانس درجہ بندی: `open-sse/services/claudeLowPriority.ts`
- ری سیٹ اسٹیٹس/کلیم کلائنٹ: `open-sse/services/claudeLimitReset.ts`
- ایکزیکیوٹر ہک (ہیڈر انجیکشن + اسی اکاؤنٹ کی ری ٹرائی): `open-sse/executors/base.ts::execute()`
- آپٹ اِن کی پائیداری: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ٹریگر:** 5 گھنٹے کی استعمال کی دیوار — ایک `429` جس کے ہیڈرز میں
`anthropic-ratelimit-unified-status: rejected` اور، جب اکاؤنٹ اہل ہو،
`anthropic-ratelimit-unified-slow-offer: treatment` موجود ہو۔ اس پہلی دیوار والے 429 سے پہلے
کچھ نہیں بھیجا جاتا؛ یونیفائیڈ ہیڈرز کے بغیر ایک برسٹ 429 عام کول ڈاؤن راستے سے گزرتا ہے۔

**کم ترجیحی لین** (`lowPriorityMode`):

- وال 429 پر ایگزیکیوٹر پیشکش قبول کرتا ہے اور فوراً **اسی**
  اکاؤنٹ کے ساتھ `anthropic-usage-limit: slow` لگا کر دوبارہ کوشش کرتا ہے؛ لین اعلان شدہ
  `anthropic-ratelimit-unified-reset` (+60 سیکنڈ گریس) تک فعال رہتی ہے اور اس ونڈو میں ہر درخواست
  یہ ہیڈر ساتھ لے کر چلتی ہے۔ روکا گیا 429 کبھی `handleChatCore` تک نہیں پہنچتا، اس لیے کنکشن
  کول ڈاؤن میں **نہیں** ڈالا جاتا اور نہ ہی گھما کر تبدیل کیا جاتا ہے۔
- بعد کے جوابات پر `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  لین کو برقرار رکھتے ہیں؛ `slot_busy` (429) یا `529` سرور کے
  `anthropic-ratelimit-unified-slow-retry-after` (پہلے سے طے شدہ 20 سیکنڈ، حد 5–600 سیکنڈ، ±30% جِٹر)
  کا انتظار کر کے دوبارہ کوشش کرتے ہیں، جو `anthropic-ratelimit-unified-slow-max-wait` (پہلے سے طے شدہ 20 منٹ، حد
  1 منٹ–6 گھنٹے) سے بندھا ہوتا ہے — اس سے آگے لین ختم ہو جاتی ہے اور 10 منٹ کا کول آف دوبارہ قبولیت کو روک دیتا ہے۔
  انتظار پر مزید یہ حد بھی عائد ہوتی ہے: درخواست کے اپنے اپ اسٹریم آغاز ٹائم آؤٹ
  (`resolveFetchStartTimeout`، پہلے سے طے شدہ 10 منٹ) میں سے جو وقت باقی بچتا ہے، منفی 5 سیکنڈ کا مارجن:
  اس حد کے بغیر 20 منٹ کی پہلے سے طے شدہ max-wait درخواست سے زیادہ عرصہ تک جاری رہتی اور
  sleep انتظار کے درمیان منسوخ کر دی جاتی، جس سے نرم `max_wait` اختتام + کول آف کے بجائے
  `TimeoutError` سامنے آتا۔
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`، 5 گھنٹے کی ونڈو کا رول اوور، یا
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (جو کسی بھی اسٹیٹس پر اسے
  `extra_usage` کے طور پر ختم کر دیتا ہے، کیونکہ ادا شدہ اووریج اب وال کا احاطہ کرتی ہے) لین کو ختم کر دیتے ہیں؛
  اس کے بعد جواب عام کول ڈاؤن راستے کی طرف بڑھتا ہے۔ `budget_exhausted` کو اعلان شدہ
  بجٹ ری سیٹ (≤ 8 دن) تک یاد رکھا جاتا ہے۔
- وال چیک ایگزیکیوٹر کی اپنی 400 پر مبنی اندرونی کوشش کی دوبارہ کوششوں (سیاق کی ترمیم،
  thinking/effort کی حد بندی، پیرامیٹر کی خودکار آموخت) کے بعد چلتا ہے، اس لیے وہ وال 429
  جو صرف انہی میں سے کسی دوبارہ کوشش پر ظاہر ہو، پھر بھی روک لیا جاتا ہے بجائے اس کے کہ
  کول ڈاؤن راستے تک پہنچے۔
- اسٹیٹ فی کنکشن میموری میں ہوتی ہے (ری اسٹارٹ کے بعد دوبارہ قبولیت کے لیے ایک اضافی وال 429 کی قیمت لگتی ہے)۔

**سیشن لیمٹ ری سیٹ** (`autoLimitReset`، جب دونوں فعال ہوں تو لین سے پہلے آزمایا جاتا ہے):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  بلاک؛ جب `arm: "reset"` اور `available: true` ہو تو
  `{ "program": "juniper_tide" }` کے ساتھ
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` (تنظیمی UUID
  `providerSpecificData.organizationUUID` سے، bootstrap فال بیک)۔
- `result: reset|not_limited` → درخواست پوری رفتار سے دوبارہ کی جاتی ہے (کوئی slow ہیڈر نہیں)۔
  `already_used` / `not_offered` `next_available_at` کو یاد رکھتے ہیں (پہلے سے طے شدہ ایک ہفتہ)؛
  کوئی بھی ناکامی 15 منٹ کا بیک آف لیتی ہے۔ ری سیٹ ہفتے میں ایک بار ہوتا ہے اور پھر بھی
  ہفتہ وار حد میں شمار ہوتا ہے۔

ریگریشن گارڈز: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### سیشن افینٹی (#7274)

**دائرہ کار:** ایک کلائنٹ سیشن (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ہیڈر) ایک کنکشن سے پن کیا ہوا، **کسی بھی** پرووائیڈر کے لیے۔

**مقصد:** کثیر مرحلہ گفتگو کرنے والے ایجنٹ (Claude Code، aider، حسبِ ضرورت ایجنٹس) کو درخواستوں کے درمیان ایک ہی اکاؤنٹ پر رکھنا، جس سے کراس اکاؤنٹ سیاق کے ضیاع اور فی اکاؤنٹ سیشن اسٹیٹ رکھنے والے پرووائیڈرز پر بار بار کے کولڈ اسٹارٹ 429 کم ہوتے ہیں۔

**نفاذ:**

- TTL کی تحديد: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- پن کا انتخاب/تخلیق: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- ہیڈر نکالنے کا عمل (عمومی، کسی بھی پرووائیڈر کے لیے): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- محفوظ شدہ پن ٹیبل: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- سیٹنگ: `sessionAffinityTtlMs` (ملی سیکنڈ میں عالمی TTL، `0` اسے غیر فعال کرتی ہے) — `src/lib/db/settings.ts`۔ مائیگریشن `124_generic_session_affinity_ttl.sql` کے ذریعے صرف Codex کے لیے مخصوص `codexSessionAffinityTtlMs` سے نیا نام دیا گیا، جو پہلے سے ترتیب شدہ کسی بھی Codex TTL کو نئے پہلے سے طے شدہ کے طور پر منتقل کر دیتی ہے۔

#7274 سے پہلے، `resolveSessionAffinityTtlMs()` `codex` کے سوا ہر پرووائیڈر کے لیے فی الفور `0` لوٹا دیتا تھا، اس لیے TTL سیٹنگ (اور سیشن ہیڈرز) کا کہیں اور کوئی اثر نہیں پڑتا تھا، اگرچہ پننگ میکانزم اور ہیڈر نکالنے کا عمل پہلے ہی پرووائیڈر سے آزاد تھے۔ اصلاح نے وہ ابتدائی واپسی ہٹا دی؛ اب TTL جب عالمی طور پر `0` سے اوپر سیٹ کیا جائے تو ہر پرووائیڈر پر یکساں طور پر لاگو ہوتا ہے۔

سیشن افینٹی کے تینوں ہیڈرز کبھی اپ اسٹریم فارورڈ نہیں کیے جاتے — ایگزیکیوٹرز کلائنٹ ہیڈرز کو جوں کا توں آگے بڑھانے کے بجائے اپنے اپ اسٹریم ہیڈرز شروع سے بناتے ہیں، اس لیے یہ صرف ایک اندرونی باہمی تعلق کی آئی ڈی کے طور پر رہتا ہے۔

### خصوصی منیجڈ سیشن کنکشن لیزز

**دائرہ کار:** ایک فعال منیجڈ HTTP کلائنٹ/سیشن ایک اہل OmniRoute کنکشن کا مالک ہوتا ہے۔

**مقصد:** ان کلائنٹس کے لیے پائیدار خصوصی کنکشن ملکیت فراہم کرنا جنہیں درخواستوں کے درمیان سخت
روٹنگ کی باڑ درکار ہوتی ہے۔ یہ سیشن افینٹی سے مختلف ہے، جو تسلسل کی ایک نرم ترجیح ہے:
خصوصی لیز SQLite میں لائف سائیکل اسٹیٹ محفوظ رکھتی ہے، عالمی سطح پر فعال مالک اور
فعال کنکشن کی انفرادیت نافذ کرتی ہے، اور پرووائیڈر ڈسپیچ سے پہلے پرانی جنریشن کو مسترد کر دیتی ہے۔

یہ فیچر فی API key آپٹ اِن ہے۔ منیجڈ key کے پاس `lease:exclusive` اسکوپ اور ایک
واضح، غیر خالی `allowedConnections` فہرست ہونی چاہیے۔ کوئی بھی HTTP کلائنٹ لائف سائیکل اینڈ پوائنٹ
استعمال کر سکتا ہے؛ کسی کلائنٹ نام، user-agent، پرووائیڈر، OAuth طریقہ، یا ماڈل کی ضرورت نہیں ہوتی۔
لیز کنکشن کی مالک ہوتی ہے، ماڈل کی نہیں، اس لیے ماڈل کی تبدیلی بائنڈنگ کو برقرار رکھتی ہے جب تک
کہ کنکشن عام طور پر اہل بنا رہتا ہے۔ عام ماڈل، کوٹہ، صحت، کول ڈاؤن، اور اجازت فہرست کے اصول
حتمی حیثیت رکھتے ہیں اور وہی جنریشن کسی دوسرے فارغ اہل کنکشن پر منتقل کر سکتے ہیں۔

لائف سائیکل `POST /api/v1/session-leases` ہے، جس میں JSON ایکشنز `acquire`، `renew`، اور `release` شامل ہیں۔
مینیجڈ انفرینس درخواستیں مبہم `X-OmniRoute-Lease-Owner` ویلیو اور عین درست
`X-OmniRoute-Lease-Generation` پیش کرتی ہیں۔ مالک `vlo_` کے بعد 43 base64url کریکٹرز پر مشتمل ہوتا ہے؛ صرف
اس کا SHA-256 ہیش محفوظ کیا جاتا ہے۔ ہر فائنل ڈسپیچ فینس مستند API key ID اور
فعال کنکشن ID کو بھی بائنڈ کرتا ہے۔ لیز کنٹرول ہیڈرز کو لاگز، محفوظ شدہ درخواست کے اسنیپ شاٹس، اور
اپ اسٹریم ایگزیکیوٹر ہیڈرز سے ہٹا دیا جاتا ہے۔

اگر عام روٹنگ کے پاس اہل مینیجڈ امیدوار موجود ہوں مگر ہر آزاد امیدوار کسی اجنبی فعال لیز کے قبضے میں ہو،
تو OmniRoute HTTP `429`، lease-capacity-unavailable کوڈ، waiting-for-capacity حالت، اور
سب سے جلد ختم ہونے والی متعلقہ میعاد سے ماخوذ ایک محدود `Retry-After` واپس کرتا ہے۔
عام خالی اہلیت لیز تنازعہ نہیں ہوتی اور اپنی موجودہ روٹنگ ایرر سیمانٹکس برقرار رکھتی ہے۔

متعلقہ میکانزم الگ رہتے ہیں:

- OAuth سیشن آکپینسی OAuth اکاؤنٹس کے لیے پراسیس لوکل سافٹ ڈسٹریبیوشن ہے۔
- اکاؤنٹ سیما فورز درخواست کی کنکرنسی پرمٹ عطا کرتے ہیں اور درخواست مکمل ہونے پر ختم ہو جاتے ہیں۔
- خصوصی مینیجڈ سیشن لیزز جنریشن فینس کے ساتھ پائیدار لائف سائیکل مالکیت ہیں۔

---

## 3. ماڈل لاک آؤٹ

**دائرہ کار:** پرووائیڈر + کنکشن + ماڈل کا ثلاثی امتزاج۔

**حیثیت کے لحاظ سے کلیدی دائرہ کار:** ناکام ہونے والی حیثیت طے کرتی ہے کہ لاک آؤٹ کس کلید پر لکھا جائے گا (`resolveLockoutScope()` میں `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — کوٹہ یا استحقاق کا اشارہ — **quota family** کو لاک کرتے ہیں:
  codex کے لیے پورا `codex` / `spark` دائرہ کار (اس کنکشن کے ہر `gpt-5*` ماڈل)،
  دیگر پرووائیڈرز کے لیے `getQuotaScopedModelForProvider()`۔
- `404` صرف بنیادی ماڈل کو لاک کرتا ہے (`getModelLockKey()` `not_found` کو محدود کرتا ہے)۔
- کوئی بھی دیگر حیثیت — `5xx` ٹرانسپورٹ/سرور ناکامیاں اور OmniRoute کی جانب سے کوالٹی توثیق سے تیار کردہ `502` — صرف **exact**
  پرووائیڈر/کنکشن/ماڈل امتزاج کو لاک کرتی ہے۔ ایک ماڈل پر خراب اسٹریم اس اکاؤنٹ کے کوٹہ کے بارے میں ثبوت نہیں ہے؛ اس اصول سے پہلے
  `codex/gpt-5.6-luna` پر ایک خالی جواب نے اس کنکشن کے ہر `gpt-5*` ماڈل کو 2–30 منٹ (بڑھتے ہوئے) تک روٹنگ سے ہٹا دیا تھا
  جبکہ اس کا کوٹہ اچھوتا تھا۔
- کال کرنے والے کا واضح `scope` آپشن ہمیشہ غالب رہتا ہے (Antigravity `"exact"` پاس کرتا ہے)۔

**مقصد:** جب صرف ایک ماڈل دستیاب نہ ہو یا کوٹہ محدود ہو تو پورے کنکشن کو غیر فعال کرنے سے بچنا۔

**مثالیں:**

- فی ماڈل کوٹہ فراہم کرنے والے پرووائیڈرز کا 429 واپس کرنا
- لوکل پرووائیڈرز کا ایک غائب ماڈل کے لیے 404 واپس کرنا
- پرووائیڈر کے مخصوص موڈ/ماڈل اجازت کی ناکامیاں (مثلاً، Grok موڈز)

**عمل درآمد:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`۔

### ماڈل کول ڈاؤنز ڈیش بورڈ (v3.8.0)

UI: سیٹنگز → ماڈل کول ڈاؤنز (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

فعال لاک آؤٹس کی فہرست دیتا ہے، ساتھ: پرووائیڈر، کنکشن، ماڈل، وجہ، expiresAt۔ آپریٹرز کارڈ سے کسی ماڈل کو دستی طور پر دوبارہ فعال کر سکتے ہیں۔

**REST API:**

- `GET /api/resilience/model-cooldowns` — فعال لاک آؤٹس کی فہرست
- `DELETE /api/resilience/model-cooldowns` — دستی طور پر دوبارہ فعال کرنا۔ باڈی: `{provider, connection, model}`۔ تصدیق: management۔

### کول ڈاؤن مینیجر

UI: مانیٹرنگ → کول ڈاؤن مینیجر (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)۔

ہر اس کنکشن کے لیے ایک صفحہ جو کسی عارضی وجہ سے روٹنگ سے باہر ہے، بجائے اس کے کہ
ہر پرووائیڈر کا صفحہ کھولا جائے۔ یہ کنکشن کول ڈاؤنز، ماڈل لاک آؤٹس اور ٹرمینل
حالات کی فہرست دیتا ہے، انہیں فی کنکشن، کسی انتخاب کے لیے، یا کسی پرووائیڈر کے تمام کنکشنز کے لیے صاف کرتا ہے،
اور سب سے زیادہ ایڈجسٹ کیے جانے والے کول ڈاؤن اصولوں میں ترمیم کرتا ہے: `streamStallCooldown.enabled` اور OAuth / API-key
`connectionCooldown` بنیادی کول ڈاؤن اور زیادہ سے زیادہ بیک آف مراحل (جو `PATCH /api/resilience` کے ذریعے محفوظ ہوتے ہیں)۔ ٹرمینل حالات (`banned`, `expired`, `credits_exhausted`)
کی فہرست دی جاتی ہے لیکن یہاں کبھی صاف نہیں کیے جاتے۔

**REST API** (`src/lib/resilience/cooldownManager.ts`، تصدیق: management):

- `GET /api/resilience/cooldowns[?provider=]` — حیثیت، باقی کول ڈاؤن،
  بیک آف لیول، آخری ایرر قسم اور ماڈل لاک آؤٹس کے ساتھ کنکشنز (کوئی اسناد نہیں)
- `POST /api/resilience/cooldowns` — باڈی `{connectionIds: string[]}` یا
  `{all: true, provider?}`؛ واپس کرتا ہے `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### لاک آؤٹ سیٹنگز UI + success-decay بحالی (v3.8.23)

ماڈل لاک آؤٹ ہمیشہ فعال رہنے والے ہارڈ کوڈڈ رویے سے ایک مکمل طور پر قابلِ ترتیب،
اختیاری فیچر بن گیا ہے، جس کا اپنا سیٹنگز کارڈ اور خود سے بحال ہونے والا راستہ ہے۔

**سیٹنگز کارڈ:** سیٹنگز → ماڈل لاک آؤٹ
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)۔
یہ اوپر دیے گئے صرف پڑھنے کے قابل `ModelCooldownsCard` سے **الگ** ہے (جو صرف
فعال لاک آؤٹس کی _فہرست دیتا ہے_) — نیا کارڈ _پیرامیٹرز ترتیب دیتا ہے_۔ ڈیفالٹس
`DEFAULT_MODEL_LOCKOUT_SETTINGS` میں موجود ہیں
(`src/lib/resilience/modelLockoutSettings.ts`):

| سیٹنگ                   | ڈیفالٹ                           | مطلب                                                            |
| ----------------------- | -------------------------------- | --------------------------------------------------------------- |
| `enabled`               | `false`                          | ماسٹر ٹوگل — ماڈل لاک آؤٹ **ڈیفالٹ طور پر بند** ہے۔             |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | اپ اسٹریم حیثیتیں جو ماڈل کے دائرہ کار کی ناکامی شمار ہوتی ہیں۔ |
| `baseCooldownMs`        | `120_000` (120 سیکنڈ)            | پہلی ناکامی کے لیے ابتدائی لاک آؤٹ دورانیہ۔                     |
| `maxCooldownMs`         | `1_800_000` (30 منٹ)             | بڑھتے ہوئے کول ڈاؤن پر حد۔                                      |
| `maxBackoffSteps`       | `10`                             | زیادہ سے زیادہ exponential-backoff بڑھنے کے مراحل۔              |
| `useExponentialBackoff` | `true`                           | آیا بار بار ناکامیاں کول ڈاؤن کو exponentially بڑھاتی ہیں۔      |

سیٹنگز عام سیٹنگز اسٹور کے ذریعے محفوظ ہوتی ہیں اور
resilience سیٹنگز اسکیما کے ذریعے توثیق ہوتی ہیں؛ کارڈ `baseCooldownMs`/`maxCooldownMs`
(بشرطیکہ `maxCooldownMs ≥ baseCooldownMs`) اور `maxBackoffSteps` کو محدود کرتا ہے۔

**success-decay بحالی:** بحالی **صرف** ٹائمر کے ختم ہونے پر نہیں ہوتی۔ ایک صحت مند
جواب ماڈل کی ناکامیوں کی گنتی کو بتدریج کم کرتا ہے تاکہ جو ماڈل درمیانی وقفے میں بحال ہو گیا ہو،
وہ اپنے ٹائمر سے پہلے بڑھنا روک دے (اور صاف ہو جائے)۔ کامیاب
کومبو ہدف پر، `open-sse/services/combo.ts` `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) کو کال کرتا ہے، جو محفوظ `failureCount` کو **آدھا** کرتا ہے
(`Math.floor(failureCount / 2)`)؛ جب یہ `0` تک پہنچ جائے تو لاک آؤٹ اندراج مکمل طور پر حذف ہو جاتا ہے۔ اس کا ہم منصب `recordModelLockoutFailure()`
بڑھنے کی ونڈو کے اندر ناکامیوں پر گنتی بڑھاتا ہے (اور کول ڈاؤن کو بڑھاتا ہے)۔ یہ success-decay سادہ ٹائمر ختم ہونے کے علاوہ ہے —
دونوں میں سے کوئی بھی راستہ ماڈل کو دوبارہ فعال کر سکتا ہے۔

**حالت:** لاک آؤٹس **in-memory** رکھے جاتے ہیں (فی پروسیس `Map`s برائے
`ModelLockoutEntry` جن کی کلید `provider:connectionId:model` ہے، exact-scope لاک کے لیے
`provider:connectionId:exact:model`)، DB میں محفوظ نہیں ہوتے — ری اسٹارٹ پر ضائع ہو جاتے ہیں۔ _سیٹنگز_ محفوظ رہتی ہیں؛ فعال
لاک آؤٹ _حالت_ عارضی ہے۔

---

## 4. کوٹا-شیئر کنکرنسی کنٹرول (v3.8.36)

سبسکرپشن اکاؤنٹس (GLM، MiniMax وغیرہ) اکثر صرف ~1–3 متوازی درخواستیں قبول
کرتے ہیں؛ اس سے تجاوز کرنے پر 429 ایررز اور کول ڈاؤن شروع ہو جاتے ہیں۔ یہ مسئلہ
**quota-share** (`qtSd/…`) کومبوز میں خاص طور پر شدید ہوتا ہے، جہاں متعدد API کیز
ایک ہی اپ اسٹریم اکاؤنٹ شیئر کرتی ہیں۔ تین تہیں شیئرڈ اکاؤنٹ کو فلڈ ہونے سے بچاتی ہیں۔

### فی-کنکشن کنکرنسی کیپ (`max_concurrent`)

ہر پرووائیڈر کنکشن ایک `max_concurrent` حد متعین کر سکتا ہے
(`provider_connections.max_concurrent`، جو کنکشن موڈل / API / DB میں سیٹ کی جاتی ہے)۔
لاٹ محدود رکھنے کے لیے اسے خالی چھوڑ دیں۔ یہی واحد کنٹرول ہے جو نیچے دی گئی سیریلائزیشن
لیئر کو چلاتا ہے — اسے اکاؤنٹ کی اصل کنکرنسی پر سیٹ کریں (مثلاً GLM ~1، MiniMax ~2)۔

### فی-ماڈل کنکرنسی کیپس (`modelConcurrency`)

ایک کنکشن اپنے `rateLimitOverrides` میپ کے اندر عین فی-ماڈل کنکرنسی حدود بھی متعین کر سکتا ہے:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

اسے کنکشن موڈل میں سیٹ کریں (**Rate limit overrides → Per-model
concurrency caps**، ہر لائن پر ایک `model=cap`) یا
`PATCH /api/providers/[id]` کے ذریعے اسی JSON شکل کے ساتھ۔ اہم سیمینٹکس:

- **کنکشن-وائیڈ بمقابلہ ماڈل-مخصوص:** `maxConcurrent` مشترک کنکشن-وائیڈ
  حد ہی رہتی ہے۔ جب دونوں لاگو ہوں تو دونوں گیٹس ایک ہی کمپوزٹ گیٹ میں
  ایٹمی طور پر حاصل کیے جاتے ہیں
  (`global → provider → account → model`)؛ مؤثر رویہ وہی ہوتا ہے جو
  قابلِ اطلاق سخت ترین حد ہو۔
- **عین ماڈل-کی میچ:** کی وہی ماڈل اسٹرنگ ہے جو روٹنگ ریزولوشن کے بعد
  ایگزیکیوٹر کو دی جاتی ہے — عام طور پر ننگی اپ اسٹریم ماڈل آئی ڈی
  (`glm-5`)، نہ کہ کلائنٹ-سائیڈ `provider/model` عرف (`zai/glm-5` کا
  `glm-5` سے میچ نہیں ہوتا)۔ ویلیوز مثبت-انٹیجر متوازی-درخواست حدود ہیں۔
- **مقامی قطار، کوئی ڈسکوری نہیں:** اضافی درخواستیں موجودہ queue/timeout
  سیمینٹکس کے ساتھ مقامی طور پر قطار میں لگتی ہیں (ٹائپ شدہ `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` ایڈمشن ایررز)۔ OmniRoute اپ اسٹریم پالیسی دریافت یا
  اندازہ نہیں لگاتا — وہ صرف وہی عین حدود نافذ کرتا ہے جو آپریٹر نے کنفیگر کی ہوں۔
  سیر شدہ ماڈل گیٹ کبھی بھی پرووائیڈر کو غیر فعال نہیں کرتا اور نہ ہی کوئی
  مستقل ماڈل لاک آؤٹ بناتا ہے؛ اپ اسٹریم 429/کول ڈاؤن/فال بیک رویہ
  بطور ایرر بیک اسٹاپ برقرار رہتا ہے۔
- **فی-کنکشن، فی-پراسیس اسکوپ:** کیپس فی ڈیٹابیس کنکشن ہیں اور اِن-میموری رکھی
  جاتی ہیں، لہٰذا ایک ہی اپ اسٹریم API کی دوبارہ استعمال کرنے والے دو کنکشنز
  آپس میں کوآرڈینیٹ نہیں کرتے۔
- **غیر کنفیگرڈ کا مطلب غیر تبدیل شدہ:** میپ کو شامل نہ کرنا (یا ڈیش بورڈ
  فیلڈ کو خالی چھوڑنا) کوئی ماڈل گیٹ شامل نہیں کرتا۔ کسی بھی عالمگیر پرووائیڈر
  حد کے دعوے کے بغیر مثالی کنفیگریشن:

```text
glm-5=1
glm-4.7=3
```

### کوٹا-شیئر درخواست سیریلائزیشن

جب کوئی کوٹا-شیئر ڈسپیچ کسی ایسے کنکشن کو ہدف بناتا ہے جو مثبت
`max_concurrent` کا اعلان کرتا ہے، تو اس **اکاؤنٹ** کو جانے والی متوازی درخواستیں
فی-کنکشن سیمافور (کی `qsconn:<connectionId>`) کے ذریعے سیریلائز کی جاتی ہیں: اضافی
درخواستیں اکاؤنٹ کو فلڈ کرنے کے بجائے **قطار میں انتظار کرتی ہیں**۔ یہ **fail-open** ہے —
سیر شدہ قطار یا ٹائم آؤٹ کی صورت میں درخواست سلاٹ کے بغیر آگے بڑھ جاتی ہے، بجائے اس کے کہ
کسی قابلِ ڈسپیچ درخواست کو کبھی مسترد کیا جائے۔ **Settings → Resilience → Quota-share
per-connection concurrency** میں ٹوگل کریں
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`، ڈیفالٹ آن)۔ `max_concurrent`
کیپ کے بغیر رویہ غیر تبدیل شدہ رہتا ہے۔

> کوٹا-شیئر روٹنگ گیٹ (`selectQuotaShareTarget`، DRR + P2C) خود بھی
> fail-open ہے اور کیپ پر پہنچے کنکشن کو صرف _ترجیح سے کم_ کرتا ہے —
> واحد-کنکشن پول کے ساتھ وہ ہارڈ لیمٹ نہیں لگا سکتا، لہٰذا اصل میں فلڈ کو روکنے
> والا یہی سیمافور ہے۔

### کومبو کول ڈاؤن-آویئر ریٹرائی

ہر کومبو اسٹریٹیجی کے لیے (جب فعال ہو)، ایسی درخواست جو SHORT عارضی کول ڈاؤن کے لیے
429 پیدا کرنے والی ہو، اسے واپس کرنے کے بجائے اس کا انتظار کر کے دوبارہ ڈسپیچ کرتی ہے —
یہ ملٹی-ماڈل کومبوز پر Gemini-کلاس TPM/RPM ونڈوز (~60s retry-after) کو بھی
کور کرتا ہے، مثلاً 2-ماڈل کومبو کے دونوں ٹارگٹس کا فی-ماڈل ریٹ لیمٹ سے ٹکرانا۔
یہ `comboCooldownWait` (`enabled`، `maxWaitMs`، `maxAttempts`،
`budgetMs`) کے ذریعے **Settings → Resilience** میں محدود ہے۔ یہ کبھی بھی
`quota_exhausted` (آدھی رات تک لاک) یا auth/not-found وجوہات پر انتظار نہیں کرتا۔

یہی گیٹ پری-ڈسپیچ کیس (#16319) کو بھی کور کرتا ہے: جب کومبو کے تمام ٹارگٹس
کوئی بھی کوشش کیے بغیر اس لیے اسکپ کر دیے جائیں کہ ان کا ماڈل کسی مختصر عارضی
لاک آؤٹ میں ہو، تو زیرو-اٹیمپٹ راستہ اسی حدود کے تحت لاک کے ختم ہونے کا انتظار
کر کے دوبارہ ڈسپیچ کرتا ہے، بجائے اس کے کہ بغیر اشارے والا
`503 ALL_TARGETS_SKIPPED` جواب دے۔ جب انتظار کی اجازت نہ ہو (حد، کوشش یا بجٹ
ختم، یا فیچر بند)، تو حتمی جواب `429 rate_limit_error` میں اپ گریڈ ہو جاتا ہے
جو سب سے جلد ختم ہونے والی عارضی لاک سے `retry_after` / `reset_at` ساتھ
لے کر آتا ہے؛ کوٹا، auth اور not-found لاکس بغیر اشارے والے 503 کو برقرار رکھتے ہیں۔

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. درخواست کی قطار کے داخلے کا کنٹرول (v3.8.49 · issue #6593)

**دائرہ**: مقامی فی-پرووائیڈر+کنکشن ریٹ-لمٹ قطار (`open-sse/services/rateLimitManager.ts`، جو Bottleneck پر مبنی ہے)، اوپر بیان کردہ تین میکانزمز سے ایک پرت نیچے۔

**`maxWaitMs` قطار کے انتظار کی حد مقرر کرتا ہے؛ `executionMaxWaitMs` عمل درآمد کی حد مقرر کرتا ہے۔**
یہ دونوں جان بوجھ کر الگ الگ ہیں، اور ان میں سے کوئی بھی دوسرے کو فیڈ نہیں کرتا۔

`resilienceSettings.requestQueue.maxWaitMs` **قطار-انتظار کا بجٹ** ہے: یہ پرووائیڈر سلاٹ کے انتظار اور پھر QUEUED حالت میں بیٹھے رہنے کا احاطہ کرتا ہے، اور اس کا ٹائمر اسی لمحے صاف کر دیا جاتا ہے جس لمحے جاب QUEUED سے نکل کر عمل درآمد شروع کرتا ہے (`rateLimitManager.ts`، `wrappedFn`)۔ جو درخواست اس حد سے تجاوز کر جائے وہ کبھی اپ اسٹریم تک نہیں پہنچتی۔ ڈیفالٹ 30000ms، جو `src/lib/resilience/settings.ts` میں `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` فراہم کرتا ہے اور `tests/unit/ratelimit-admission-control-6593.test.ts` اسے مقرر رکھتا ہے، لہذا اس میں کوئی تبدیلی اس ٹیسٹ کو ناکام (سرخ) کر دے گی بجائے اس کے کہ یہ پیراگراف خاموشی سے پرانا ہوتا رہے۔

`resilienceSettings.requestQueue.executionMaxWaitMs` وہ قیمت ہے جو Bottleneck کو جاب `expiration` کے طور پر موصول ہوتی ہے، جس کا ٹائمر صرف ڈسپیچ کے بعد شروع ہوتا ہے۔ یہ ان ایگزیکیوٹرز کے لیے ایک آخری حفاظتی تدبیر ہے جن کا اپنا اپ اسٹریم ٹائم آؤٹ نہیں ہوتا، اور جب ایگزیکیوٹر کا اپنا fetch-start ٹائم آؤٹ اس سے لمبا ہو تو اسے اُس تک بڑھا دیا جاتا ہے، تاکہ یہ کسی صحت مند، جاری (in-flight) جواب کو منقطع نہ کر سکے۔ ڈیفالٹ 600000ms (10 منٹ)۔

قطار کے بجٹ کو `expiration` میں ڈالنا وہی چیز تھی جو غیر-تدریجی (non-incremental) گیٹ ویز کو درمیانِ پرواز مار دیا کرتی تھی — یہ بجائے خود پہلے بائٹس آنے سے پہلے منٹوں تک چلتے ہیں — اور یہی وجہ ہے کہ expiration `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) کے طور پر ظاہر ہوتی ہے جبکہ قطار کا بجٹ قطار-ٹائم آؤٹ کوڈ رکھتا ہے۔ دونوں میں سے کسی کو بھی `RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) یا ڈیش بورڈ (**ترتیبات → لچک**) کے ذریعے اووررائیڈ کیا جا سکتا ہے۔ نارملائز کیے جانے پر دونوں کو 1ms–24h کے درمیان محدود (کلیمپ) کیا جاتا ہے۔

**ترجیح، دونوں کے لیے:** env متغیر صرف _ڈیفالٹ_ فراہم کرتا ہے۔ `resilienceSettings.requestQueue` میں محفوظ شدہ قیمت (ڈیش بورڈ / API patch، جو `key_value` میں ذخیرہ ہوتی ہے) اس پر غالب آتی ہے، اور فی-کنکشن `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` اس پر غالب آتی ہے۔ لہذا ایسی ڈیپلائیمنٹ پر env متغیر سیٹ کرنا جس میں پہلے سے محفوظ شدہ قیمت موجود ہو، کچھ بھی تبدیل نہیں کرتا — اس کے بجائے محفوظ شدہ سیٹنگ کو صاف یا اپڈیٹ کریں۔

قطار میں قیام کی حد `maxWaitMs` سے مقرر ہے؛ نیچے بیان شدہ `maxQueueDepth` اس بات کی حد مقرر کرتا ہے کہ ایک وقت میں کتنے کالرز قطار میں ہو سکتے ہیں۔

**باڈی میں بتائی گئی ریٹرائز: پیسنگ بمقابلہ لاک آؤٹ۔** 429 کی باڈی اپنا انتظار خود بتا سکتی ہے (Gemini `RetryInfo.retryDelay`، "retry after Ns" متن)، جسے `updateFromResponseBody` پڑھتا ہے۔ جو انتظار کنکشن کے `maxWaitMs` میں سما جائے وہ پیسنگ ہے: لیمیٹر اتنے عرصے کے لیے اپنا ریزروائر خالی کر دیتا ہے اور قطار میں موجود کالز اس کے دوبارہ بھرنے پر ڈسپیچ ہوتی ہیں۔ `maxWaitMs` سے لمبا انتظار ایسی چیز نہیں جسے قطار گزار سکے — Gemini ختم شدہ روزانہ کوٹے کا جواب `retryDelay: "86399s"` کے ساتھ دیتا ہے۔ دوبارہ بنائے گئے 429 پر منتقل شدہ `Retry-After` (#16528) پہلے ہی فال بیک انجن سے اس مدت کے لیے ماڈل لاک کروا دیتا ہے، لیکن لیمیٹر کو بھی اس کے لیے روک دینا اس بات کا سبب بنتا کہ کوئی بھی کال جو کلید (key) تک جلدی پہنچ جائے (مثلاً resilience ری سیٹ کے بعد) پورے `maxWaitMs` کے لیے رک جائے۔ جب ایسا انتظار کسی ٹائپ شدہ Google `RetryInfo` تفصیل سے آتا ہے (`google_rpc_retry_info` ماخذ) اور کلید کا لیمیٹر پہلے ہی ماڈل تک محدود (scoped) ہو (دیکھیں `getLimiterKey`)، تو 429 اس کے بجائے اس کنکشن پر ماڈل لاک آؤٹ بن جاتا ہے (`open-sse/services/rateLimitManager/bodyRetryPause.ts` میں `lockModelForLongBodyRetry`، زیادہ سے زیادہ 24h)، اور لیمیٹر غیر-متوقف چھوڑ دیا جاتا ہے۔ اکاؤنٹ انتخاب اس لاک پر `isModelLocked()` کے ذریعے نظرانداز (skip) کرتا ہے، اور کنکشن سے پِن کردہ اہداف کے لیے کومبو پری-ڈسپیچ گیٹ بھی ایسا ہی کرتا ہے۔ antigravity پر، جہاں لیمیٹر فی کوٹہ خاندان ہوتا ہے، لاک عین ماڈل پر ہوتا ہے، بالکل اس کے دیگر کوٹہ لاکس کی طرح۔ کلائنٹ نے جو نام مانگا تھا وہ بھی لاک ہو جاتا ہے جب کوئی alias اسے اس ماڈل پر حل کرے، کیونکہ یہ جانچیں مطلوبہ نام استعمال کرتی ہیں؛ یہ عین مطابق لاک ہوتا ہے (`lockExactModel`)، لہذا ایسا alias جو antigravity کوٹہ خاندان یا codex اسکوپ کو عبور کرے، کبھی اپنے آپ کو لاک نہیں کرتا۔ نثری اشارہ (prose hint)، غیر-ٹائپ شدہ `retryDelay`، یا پورے کنکشن میں مشترک لیمیٹر، توقف (pause) کو برقرار رکھتے ہیں۔ جب وہ لیمیٹر جسے 429 پاتھ نے ابھی دوبارہ بنایا ہے واقعی متوقف ہوتا ہے، تو ایسا کالر جس کا باقی قطار کا وقت توقف کے ختم ہونے سے پہلے ختم ہو جاتا ہے، اسے فوراً قطار-ٹائم آؤٹ کوڈ (`checkLimiterPause`) کے ساتھ لوٹا دیا جاتا ہے بجائے اس کے کہ وہ وقت پورا ہونے کا انتظار کرے؛ ریکارڈ شدہ اختتام لیمیٹر بننے سے پہلے لنگر انداز (anchor) کیا جاتا ہے، جہاں Bottleneck اپنی ریفریش گھڑی شروع کرتا ہے، اور ریزروائر میں بعد کی کوئی تبدیلی اسے بھلا دیتی ہے۔ اس کا احاطہ `tests/unit/rate-limit-long-body-retry-lockout.test.ts` اور `tests/unit/rate-limit-body-retry-pause.test.ts` کرتے ہیں۔

**`maxQueueDepth` — اختیاری (opt-in) داخلے کی حد (نئی)۔** `resilienceSettings.requestQueue.maxQueueDepth` اس بات کی حد مقرر کرتا ہے کہ ایک پرووائیڈر+کنکشن کے لیے ایک وقت میں کتنی درخواستیں قطار میں (ابھی ڈسپیچ نہیں ہوئیں) رہ سکتی ہیں۔ جب قطار میں پہلے ہی `maxQueueDepth` درخواستیں موجود ہوں، تو نئی درخواست کو ٹائپ شدہ `code: "RATE_LIMIT_QUEUE_FULL"` ایرر کے ساتھ فوری طور پر مسترد کر دیا جاتا ہے **اس سے پہلے** کہ وہ کبھی `limiter.schedule()` تک پہنچے — لہذا مسترد ہونا کم لاگت کا ہوتا ہے اور اس درخواست کے لیے کسی بھی بعد کے پرامپٹ-کمپریشن / ترجمے کے کام سے پہلے ہو جاتا ہے۔ ڈیفالٹ `0` = غیر فعال، جو موجودہ غیر-محدود قطار کے رویے کو برقرار رکھتا ہے؛ حد 0–100000۔ `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) یا `resilienceSettings.requestQueue.maxQueueDepth` (ڈیش بورڈ/API patch) کے ذریعے اووررائیڈ کریں۔

داخلے کی جانچ خود ایک خالص فنکشن (pure function) ہے (`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) لہذا اسے حقیقی Bottleneck لیمیٹر کے بغیر یونٹ-ٹیسٹ کیا جا سکتا ہے۔

> وہ RFC جس نے #6593 کھولا تھا، اس نے ایک `bypassCompressionOnRateLimit`
> فلیگ بھی تجویز کیا تھا۔ اس ریپو کی `open-sse/services/compression/` پائپ لائن
> آؤٹ باؤنڈ LLM درخواست پر پرامپٹ/کانٹیکسٹ کمپریشن ہے (`chatCore.ts`،
> `resolveCompressionSettings`/`selectCompressionStrategy` بلاک کے گرد)،
> نہ کہ بنائی گئی 429 باڈیز پر HTTP رسپانس کمپریشن — لہٰذا کسی لفظی bypass فلیگ
> کے لیے کوئی مماثل کوڈ پاتھ موجود نہیں ہے۔ یہ پرامپٹ-کمپریشن مرحلہ بھی فی الحال
> درخواست کی پائپ لائن میں `withRateLimit()` سے _پہلے_ چلتا ہے، لہٰذا
> قطار بھر جانے پر ردّ ہونے والے موقع پر اسے نظرانداز کرنے کے لیے دوبارہ ترتیب دینا
> اس ایشو کے دائرے سے الگ اور بڑی تبدیلی ہے؛ اسے یہاں جان بوجھ کر **نہیں**
> لاگو کیا گیا اور اگر CPU کی بچت کا فائدہ دوبارہ ترتیب دینے کے خطرے کے
> برابر ہو تو اسے بعد کے کام (follow-up) کے طور پر چھوڑ دیا گیا ہے۔

### Rate-Limit خودکار فعال سازی سیفٹی نیٹ اور کنکشن پروٹیکشن (`rateLimitProtection`)

**خودکار فعال سازی سیفٹی نیٹ** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`، ڈیفالٹ `true`):
ڈیفالٹ کے مطابق، OmniRoute تمام فعال API-key پرووائیڈر کنکشنز (`getProviderCategory(provider) === "apikey"`) کے لیے rate-limit قطار پروٹیکشن خودکار طور پر فعال کر دیتا ہے۔ اس سے یہ یقینی بنتا ہے کہ rate-sensitive اپ اسٹریم API keys کو بھیجی جانے والی درخواستیں Bottleneck کے ذریعے قطار میں لگائی اور تھروٹل کی جائیں، بجائے اس کے کہ وہ اچانک اپ اسٹریم 429 ایررز میں تبدیل ہو جائیں۔ اس سیفٹی نیٹ کو `RATE_LIMIT_AUTO_ENABLE` انوائرنمنٹ ویری ایبل کے ذریعے اوور رائڈ کیا جا سکتا ہے (`false`/`0`/`off` غیر فعال کرتا ہے، `true`/`1`/`on` جبراً فعال کرتا ہے)، جو محفوظ شدہ ڈیش بورڈ سیٹنگ (**ترتیبات → استحکام** / `PATCH /api/resilience`) پر فوقیت رکھتا ہے۔

**فی-کنکشن `rateLimitProtection` کی سیمینٹکس:**
فی-کنکشن rate-limit پروٹیکشن کو پرووائیڈر کنکشنز پر موجود `rateLimitProtection` بولین فیلڈ کے ذریعے ٹریک کیا جاتا ہے (SQLite میں `rate_limit_protection` کے نام سے محفوظ):

- **واضح فعال (`rateLimitProtection === true`)**: اس کنکشن کے لیے rate-limit پروٹیکشن واضح طور پر فعال ہے، قطع نظر اس کے کہ پرووائیڈر کیٹیگری کیا ہے یا خودکار فعال سازی سیفٹی نیٹ چالو ہے یا نہیں۔
- **واضح غیر فعال (`rateLimitProtection === false`)**: واضح پروٹیکشن کو غیر فعال کرتا ہے، لیکن کسی فعال API-key کنکشن کو گلوبل خودکار فعال سازی سیفٹی نیٹ سے آپٹ-آؤٹ **نہیں** کراتا۔ `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) میں، `false` اور `undefined` مترادف ہیں: صرف `rateLimitProtection === true` کو واضح اوور رائڈ کے طور پر شمار کیا جاتا ہے۔ اگر `rateLimitProtection` کی قیمت `false` ہو (یا سیٹ نہ ہو)، تو ایک فعال API-key کنکشن پھر بھی خودکار فعال سازی کی شرط پر پورا اترتا ہے اور rate-limit سے محفوظ رہتا ہے۔
- **کوئی فی-کنکشن آپٹ-آؤٹ نہیں**: کوئی آپریٹر فی الحال یہ بات بیان نہیں کر سکتا کہ "یہ واحد فعال API-key کنکشن rate-limit قطار پروٹیکشن کے بغیر چلے" جبکہ دیگر کنکشنز کے لیے خودکار فعال سازی فعال رہے۔ API-key کنکشنز کو مکمل طور پر rate-limit قطاروں کے بغیر چلانے کے لیے، سیفٹی نیٹ کو گلوبل طور پر بند کرنا ضروری ہے (`RATE_LIMIT_AUTO_ENABLE=false` یا `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`)۔

**تعاون یافتہ تحریری راستے:**

- **`POST /api/rate-limits`**: کسی کنکشن کے لیے `rateLimitProtection` ٹوگل کرنے کا تعاون یافتہ انتظامی تحریری راستہ (`{ connectionId: string, enabled: boolean }`)۔ اسے `enabled: true` کے ساتھ کال کرنے سے واضح پروٹیکشن فعال ہو جاتی ہے؛ اسے `enabled: false` کے ساتھ کال کرنے سے واضح پروٹیکشن ہٹ جاتی ہے (حالانکہ اگر خودکار فعال سازی چالو ہو تو فعال API-key کنکشنز گلوبل سیفٹی نیٹ کے دائرے میں ہی رہتے ہیں)۔
- **`PUT /api/providers/[id]`**: جان بوجھ کر `rateLimitProtection` کو قبول یا پلٹتا **نہیں** ہے (#11278)۔ `PUT /api/providers/[id]` کے ذریعے پرووائیڈر کنکشن میٹا ڈیٹا اپڈیٹ کرنے سے محفوظ شدہ rate-limit پروٹیکشن اسٹیٹ کبھی تبدیل نہیں ہوگی۔

---

## 6. سست اسٹریم تھروپٹ نگران (#9709)

اختیاری `resilienceSettings.streamRecovery.throughputWatchdog` محافظ اس اپ اسٹریم کا پتہ لگاتا ہے جو اب بھی چنکس بھیج رہا ہے مگر کنفیگر کی گئی مفید آؤٹ پٹ شرح سے کم معاون آؤٹ پٹ پیدا کر رہا ہے۔ یہ جان بوجھ کر غیر فعال ٹائم آؤٹ سے الگ رکھا گیا ہے: ہارٹ بیٹس اور میٹا ڈیٹا کسی بھی ٹائمر کو ری سیٹ نہیں کرتے اور نہ پیش رفت کے طور پر شمار ہوتے ہیں۔ یہ سخت کوشش کی مقررہ حد (#9153) سے بھی الگ ہے، جو آؤٹ پٹ کے معیار سے قطع نظر ایک مطلق حفاظتی حد باقی رہتی ہے۔

نگران کو منسوخی کر سکنے سے پہلے وارم اپ مدت کے بعد ایک مکمل رولنگ ونڈو درکار ہوتی ہے۔ یہ Chat Completions اور Responses API آؤٹ پٹ ایونٹس سے ٹیکسٹ ڈیلٹاز شمار کرتا ہے (ایک محتاط UTF-8 بائٹ پراکسی)، صرف usage والے اور خالی ایونٹس کو نظر انداز کرتا ہے، اور ٹول کال یا ریزننگ ایونٹس جاری ہونے کے دوران فیصلہ معطل کر دیتا ہے۔ یہ بطور ڈیفالٹ غیر فعال ہے اور `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` کے ذریعے فعال کیا جا سکتا ہے؛ ونڈو، وارم اپ، کم از کم شرح، اور کم از کم قابلِ پیمائش آؤٹ پٹ عام resilience-settings نارملائزیشن لیئر کی حد بندیوں کے تابع ہیں۔

فعال ہونے پر، نگران کی منسوخی صرف فعال اپ اسٹریم کوشش پر لاگو ہوتی ہے۔ کلائنٹ کو نظر آنے والے کسی بھی بائٹس سے پہلے، موجودہ اسی اکاؤنٹ کی ابتدائی بازیابی کا راستہ کوشش کو دوبارہ کھول سکتا ہے۔ کمیٹ کے بعد، اسٹریم کو کبھی بھی اندھا دھند دوبارہ نہیں چلایا جاتا؛ صرف موجودہ محفوظ وسطِ اسٹریم تسلسل کا معاہدہ ہی سفکس جوڑ سکتا ہے۔ حتمی کاری یک بارگی رہتی ہے، اس لیے usage اکاؤنٹنگ اور سیمافور ریلیز ڈپلیکیٹ نہیں ہوتے۔

---

## 7. اپ اسٹریم اسٹیٹس کی دوبارہ وضاحت (غلط بیان کردہ کوٹہ کی خرابیاں)

**دائرہ کار:** ایک اپ اسٹریم گیٹ وے جو عارضی کوٹہ ختم ہونے کی اطلاع غلط HTTP اسٹیٹس کے ساتھ دیتا ہے۔

**مقصد:** کلاسیفیکیشن سے پہلے گمراہ کن اسٹیٹس کی اصلاح کرنا، تاکہ ڈاؤن اسٹریم صارفین (فال بیک انجن، کومبو ایگریگیشن، کلائنٹ کو بھیجا جانے والا ریسپانس) ناکامی کی حقیقی قابلِ دوبارہ کوشش (retryable) نوعیت کو دیکھ سکیں۔

کچھ گیٹ وے عارضی کوٹہ ختم ہونے کا اشارہ غیر قابلِ دوبارہ کوشش HTTP اسٹیٹس کے ساتھ دیتے ہیں۔ `agentrouter.org` معیاری `429` کے بجائے `403` (کبھی کبھی `400`) واپس کرتا ہے جس میں چینی متن (`用户额度不足` / `额度不足`) ہوتا ہے۔ Claude Code جیسے کلائنٹس `403` کو مستقل سمجھ کر سیشن ختم کر دیتے ہیں، اور اصلاح کے بغیر فال بیک انجن اسے کوٹہ ایونٹ کے بجائے `AUTH_ERROR` کے طور پر درجہ بند کر دے گا۔

**نفاذ (Implementation):**

- رجسٹری + میچر: `open-sse/config/upstreamStatusRestatement.ts` — فی پرووائیڈر اصولوں کی فہرست (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`)، جنہیں `applyStatusRestatement()` کے ذریعے ملایا جاتا ہے۔
- کال سائٹ: `open-sse/handlers/chatCore.ts` میں `providerFailure:` بلاک (تقریباً لائن 3654)، بالکل اس وقت جب `parseUpstreamError()` کسی ایسے اپ اسٹریم ریسپانس کو پارس کر لیتا ہے جس میں HTTP ایرر اسٹیٹس ہو (`!providerResponse.ok`)، اور کسی بھی کلاسیفیکیشن کے چلنے سے پہلے، تاکہ ہر ڈاؤن اسٹریم صارف درست شدہ اسٹیٹس دیکھے۔ کسی `200` SSE اسٹریم کے اندر شامل خرابیاں ایک الگ، بعد والی اسٹریم-پارسنگ راہ سے گزرتی ہیں اور آج اس ہک میں **شامل نہیں** ہیں — یہ ایک معلوم حد بندی ہے، جو agentrouter کے غلط اسٹیٹس کے لیے ابھی درکار بھی نہیں (جو HTTP ایرر اسٹیٹس کی صورت میں ظاہر ہوتا ہے)۔
- دوبارہ کوشش کی اہلیت: `429`، `RETRY_AFTER_ELIGIBLE_STATUSES` میں شامل ہے (`open-sse/services/combo/unavailableRetryGate.ts`)، اس لیے دوبارہ بیان کردہ (restated) خرابی ایک مردہ `403` کے طور پر ظاہر ہونے کے بجائے ایک حقیقی retry ونڈو رکھتی ہے۔
- مصنوعی `60s` کی `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) صرف وہی ہے جو دوبارہ بیان کردہ ریسپانس **کلائنٹ** کو بتاتا ہے؛ یہ خود کنکشن کا اندرونی cooldown/lockout دورانیہ نہیں ہے — وہ الگ سے اس میکانزم کے ذریعے کنٹرول ہوتا ہے جو اصل میں دوبارہ بیان کردہ خرابی کو ہینڈل کرتا ہے (Connection Cooldown کا بڑھتا ہوا backoff، §2، API-key پرووائیڈرز کے لیے بنیادی `3s`؛ یا Model Lockout، §3، agentrouter جیسے per-model-quota پرووائیڈرز کے لیے)۔ روٹر اندرونی طور پر اس 60s ونڈو سے پہلے بھی دوبارہ کوشش کے اہل ہو سکتا ہے جو وہ کلائنٹ کو ظاہر کرتا ہے — یہ جان بوجھ کر رکھا گیا اضافی مارجن ہے، کوئی بگ نہیں۔

مستقل خرابیوں (agentrouter کی `无权访问模型` — اس ماڈل تک رسائی نہیں) کو کبھی بھی دوبارہ بیان نہیں کیا جاتا: `excludeMarkers` اس اصول کو ویٹو کر دیتا ہے باوجود اس کے کہ `textMarkers` میچ کر جائیں، لہٰذا خرابی اپنا اصل اسٹیٹس برقرار رکھتی ہے اور کوئی چیز اسے ہمیشہ کے لیے دوبارہ نہیں چلاتی۔ متعلقہ پرووائیڈر کلاسیفیکیشن اصول (`open-sse/config/providerErrorRules.ts` میں `agentrouter-model-access-denied`: `reason: "auth_error"`، `scope: "model"`، ایک `6h` کا declared بنیادی cooldown) کو `checkFallbackError` (`open-sse/services/accountFallback.ts`) عمومی apikey کیٹیگری `FORBIDDEN` کی early-return سے _پہلے_ دیکھتا ہے، اور یہ `honorsRuleLockScope(provider)` پر مشروط ہے (#10334 — فی الحال صرف agentrouter کے لیے، `providerErrorRules.ts` میں `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist کے ذریعے)۔ اصول کا declared 6h cooldown `fallbackResult.baseCooldownMs` کے طور پر آگے بہتا ہے، لیکن یہ پھر بھی پہلے سے موجود per-model-quota lockout راستے کو ہی کھلتا ہے (`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`، #10334 سے غیر متاثر سوائے cooldown کے ماخذ کے): یہ ہر دوسرے model lockout کی طرح آپریٹر کی `mlSettings.maxCooldownMs` (ڈیفالٹ `1_800_000ms` / 30 منٹ) تک گھٹا دیا جاتا ہے، اور _محفوظ شدہ lockout کی وجہ_ پہلے سے موجود ہارڈ کوڈ شدہ `"forbidden"` ہی رہتی ہے، اصول کی `"auth_error"` نہیں — صرف cooldown کا دورانیہ سرتسریم (end-to-end) لاگو ہوتا ہے، وجہ کا سٹرنگ نہیں۔ خود کنکشن فعال رہتا ہے؛ اسی کنکشن پر موجود دیگر ماڈلز غیر متاثر رہتے ہیں۔

دوبارہ بیان کردہ کوٹہ خرابیاں (`额度不足`) پروڈکشن میں کسی پرووائیڈر اصول تک پہنچتی ہیں (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`، `scope: "connection"`، اپنا کوئی declared cooldown نہیں — persistence لیئر کا scaled backoff ڈیفالٹ لاگو ہوتا ہے)۔ #10334 کے بعد سے، `ProviderErrorRuleMatch` پر موجود `scope` کو سرتسریم استعمال کیا جاتا ہے، لیکن **صرف** ان پرووائیڈرز کے لیے جو `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist میں ہیں (`providerErrorRules.ts` — آج صرف `"agentrouter"`، `honorsRuleLockScope()` کے ذریعے گیٹ شدہ)۔ ہر دوسرے پرووائیڈر کے لیے `scope` محض معلوماتی رہتا ہے، بالکل جیسا کہ #10334 سے پہلے تھا۔ `checkFallbackError` میچ شدہ اصول کے scope کو `fallbackResult.ruleScope` کے طور پر ظاہر کرتا ہے؛ `isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) وہ مشترک گارڈ ہے جو تصدیق کرتا ہے کہ کوئی `ruleScope` واقعی کنکشن وائیڈ، خود بازیاب ہونے والے سگنل کے طور پر ماننے کے لیے محفوظ ہے (scope `"connection"`، وجہ `quota_exhausted`، کبھی `permanent` نہیں، کبھی `creditsExhausted` نہیں — یہ اس مستقبل کے اصول کے خلاف دفاع ہے جو scope `"connection"` کو کسی مستقل اکاؤنٹ حالت کے ساتھ جوڑے)۔ دو صارفین اسے کال کرتے ہیں:

- **پرسسٹنس** (`markAccountUnavailable()`، `src/sse/services/auth.ts`):
  passthrough پرووائیڈر کی **فی-ماڈل** لاک آؤٹ برانچ میں گرنے کے بجائے
  (agentrouter میں `passthroughModels: true` ہے → `hasPerModelQuota()`
  قدر `true` لوٹاتا ہے)، یہ ایک **عارضی کنکشن کول ڈاؤن** لاگو کرتا ہے —
  `testStatus: "unavailable"` + `rateLimitedUntil`، کبھی بھی کوئی حتمی اسٹیٹس نہیں
  (`credits_exhausted`/`banned`/`expired`) — تاکہ کنکشن کول ڈاؤن ختم ہوتے ہی
  خود بحال ہو جائے، بجائے اس کے کہ دستی کریڈینشل ری سیٹ کی ضرورت پڑے۔
  `disableCooling: true` والے کنکشنز کے لیے اسے چھوڑ دیا جاتا ہے (#2997): وہ آپٹ آؤٹ
  اس کے بجائے فی-ماڈل لاک آؤٹ میں چلا جاتا ہے (یہ ایک دستاویزی سمجھوتہ ہے —
  برانچ کے اوپر والا کوڈ کمنٹ دیکھیں)۔
- **اسی درخواست کی کومبو روٹنگ** (`applyComboTargetExhaustion()`،
  `open-sse/services/combo/targetExhaustion.ts`): وہی گارڈ کنکشن کو
  اِن-میموری `exhaustedConnections` سیٹ میں نشان زد کرتا ہے، جس کی کلید
  `${provider}:${connectionId}` ہوتی ہے۔ یہ صرف اس باقی SAME-REQUEST ٹارگٹ کو نظرانداز کرتا ہے جو _خود پہلے سے اپنے ٹارگٹ آبجیکٹ پر بالکل وہی `connectionId` اٹھائے ہوئے ہو_
  (`getExhaustedTargetSkipReason()`،
  `open-sse/services/combo/comboPredicates.ts`، `exhaustedConnections` کی تلاش سے پہلے `if (provider &&
connectionId)`) — ایک سادہ model-list کومبو، جہاں ساتھی ٹارگٹس اپنے پاس کوئی پن شدہ `connectionId` نہیں رکھتے اور ایک صرف فی-ڈسپیچ رسپانس کے
  `X-OmniRoute-Selected-Connection-Id` ہیڈر سے حل ہوتا ہے، اس کلیدی مماثلت کو کبھی نہیں پاتا۔ اس
  عام صورت میں، کسی باقی لیگ کے ابھی-ابھی ختم شدہ اکاؤنٹ کو دوبارہ استعمال کرنے کے خلاف
  اصل تحفظ یہ Set نہیں ہے — یہ اوپر والا پرسسٹنس لیئر ہے
  (کنکشن کا `rateLimitedUntil` اب مستقبل میں ہے) ساتھ ہی اسی گارڈ کا اس ناکامی کے لیے `transientRateLimitedProviders` کو دبانا
  ("دو-مرحلہ ڈیزائن" اور
  `targetExhaustion.ts` میں `isAgentrouterConnectionQuotaScope` برانچ پر کوڈ کمنٹ دیکھیں): اس Set کو غیر نشان زد چھوڑے جانے کے ساتھ،
  `combo.ts` کا `allowRateLimitedConnection` فورس-الاؤ
  (`open-sse/services/combo.ts:1005-1013`، `:2734-2738`) پرووائیڈر کی باقی لیگز کے لیے متحرک نہیں ہوتا،
  اس لیے کریڈینشل سلیکشن کا `rateLimitedUntil`
  فلٹر (`src/sse/services/auth.ts:1238`) معمول کے مطابق مانا جاتا ہے اور کوئی باقی لیگ یا تو کوئی مختلف، ابھی بھی اہل agentrouter
  کنکشن منتخب کرتی ہے یا کوئی کریڈینشل دستیاب نہ ہونے کی وجہ سے ناکام ہو جاتی ہے — یہ اس
  کنکشن پر زبردستی واپس نہیں گھستی جسے اس برانچ نے ابھی کول ڈاؤن کیا ہے۔

### دو-مرحلہ ڈیزائن: اسٹیٹس ری-اسٹیٹمنٹ، پھر کلاسیفیکیشن

اسٹیٹس ری-اسٹیٹمنٹ (`upstreamStatusRestatement.ts`) اور پرووائیڈر
کلاسیفیکیشن رولز (`open-sse/config/providerErrorRules.ts`،
`providerRuleRegistry`) الگ الگ رجسٹریاں ہیں جو دونوں پرووائیڈر آئی ڈی
اور ٹیکسٹ مارکرز پر کلید بند ہوتی ہیں، لیکن یہ مختلف جگہوں پر چلتی ہیں اور مختلف
مقاصد پورا کرتی ہیں: ری-اسٹیٹمنٹ `chatCore.ts` میں جلد HTTP اسٹیٹس کو دوبارہ لکھتی ہے؛
کلاسیفیکیشن رولز `checkFallbackError()`
(`open-sse/services/accountFallback.ts`) کے اندر فال بیک `reason` منتخب کرتے ہیں اور `scope`
(`model` / `provider` / `connection`) کو لاک کرتے ہیں۔

کلاسیفیکیشن رولز صرف `providerErrorRules.ts` میں `FULL_TEXT_RULE_PROVIDERS`
الاؤ لسٹ میں درج پرووائیڈرز کے لیے مکمل ایرر **ٹیکسٹ** دیکھتے ہیں (جو `额度不足` جیسے باڈی
مارکرز سے میل کھانے کے لیے درکار ہے) — فی الحال صرف `"agentrouter"`۔ ہر دوسرے
**بلٹ اِن کیٹلاگ** پرووائیڈر کے لیے، `checkFallbackError`
`getProviderErrorRuleMatch` کے حوالے صرف سٹرکچرڈ ایرر (`{code, type}`) کرتا ہے، جو
ہیڈر/اسٹیٹس/کوڈ پر مبنی رولز کے لیے کافی ہے مگر باڈی-ٹیکسٹ مارکرز کے لیے اندھا ہے۔
ہیلپر `resolveRuleMatchBody()` یہ انتخاب انجام دیتا ہے: الاؤ لسٹڈ پرووائیڈرز کے لیے مکمل ایرر ٹیکسٹ،
ورنہ سٹرکچرڈ ایرر۔ `FULL_TEXT_RULE_PROVIDERS` میں کوئی
**بلٹ اِن** پرووائیڈر شامل کرنا ایک واضح فی-پرووائیڈر آپٹ اِن ہے —
یہ اس لیے موجود ہے تاکہ فہرست میں نہ ہونے والے ہر پرووائیڈر کا ڈیفالٹ راستہ بائٹ بہ بائٹ غیر تبدیل شدہ رہے۔

کسی رول کا `scope` (`model` / `provider` / `connection`)
`FULL_TEXT_RULE_PROVIDERS` سے الگ آپٹ اِن ہے: `checkFallbackError` اسے صرف
`fallbackResult.ruleScope` کے طور پر ظاہر کرتا ہے، اور ڈاؤن اسٹریم کنسیومرز اسے
معلوماتی لیبل کے سوا کسی چیز کے طور پر صرف انہی پرووائیڈرز کے لیے مانتے ہیں جو اسی فائل میں
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` الاؤ لسٹ میں ہوں (`honorsRuleLockScope()` کے ذریعے گیٹڈ — فی الحال صرف `"agentrouter"`)۔ اس بات کے لیے کہ `scope: "connection"` میچ اصل میں کیا کرتا ہے
جب کوئی پرووائیڈر اس الاؤ لسٹ پر آ جائے، اوپر "دوبارہ بیان شدہ کوٹہ ایررز" دیکھیں۔

**#11104 — آپریٹر کے متعین کردہ رولز دونوں الاؤ لسٹس کو بائی پاس کرتے ہیں۔** کوئی آپریٹر
اس فائل میں ترمیم کیے بغیر رن ٹائم پر `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) کے ذریعے فی-پرووائیڈر رول
متعین کر سکتا ہے۔ کسی آپریٹر رول کو
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` کے پیچھے گیٹ کرنا — ایسی الاؤ لسٹس
جو بلٹ اِن کیٹلاگ رولز کے **ڈیفالٹ** رویّے کی حفاظت کے لیے ہیں — سیٹنگز میکانزم کو ہر اس پرووائیڈر کے لیے غیر مؤثر بنا دے گا
سوائے ان کے جو پہلے سے وہاں درج ہیں، کیونکہ رول متعین کرنا بذاتِ خود
آپریٹر کا واضح آپٹ اِن ہے۔ `resolveRuleMatchBody()` اور
`honorsRuleLockScope()` دونوں پہلے `hasOperatorRuleForProvider()` چیک کرتے ہیں: جس پرووائیڈر کے پاس آپریٹر رول ہو، اسے
خام ایرر ٹیکسٹ ملتا ہے اور اس کا متعین کردہ `scope` مانا جاتا ہے، قطع نظر اس کے کہ
وہ کسی الاؤ لسٹ میں بھی ہے یا نہیں۔

**معروف خامی — HTTP 400 کے لیے `providerRuleRegistry` سے کبھی رجوع نہیں کیا جاتا۔**
`checkFallbackError` کی `BAD_REQUEST` برانچ اسٹیٹس 400 کی درجہ بندی مکمل طور پر
اپنے ہی پیٹرن اریز (`MODEL_ACCESS_DENIED_PATTERNS`،
`CONTEXT_OVERFLOW_PATTERNS` وغیرہ، `accountFallback.ts` میں) کے ذریعے کرتی ہے اور اس سے پہلے واپس آ جاتی ہے کہ
اوپر والی `configuredRule`/`getProviderErrorRuleMatch` برانچ تک پہنچا جائے۔
`status: 400` والا کوئی بلٹ اِن کیٹلاگ رول (یا آپریٹر رول)
نحوی طور پر درست ہے مگر کبھی فائر نہیں ہوگا۔ آج کوئی موجودہ رول 400 کو ہدف نہیں بناتا،
اس لیے پروڈکشن میں کچھ متاثر نہیں ہوتا — مگر مستقبل کے کسی 400 رول کے لیے
پہلے اس برانچ کو چھونا ضروری ہوگا، جو رول شامل کرنے سے کہیں بڑی تبدیلی ہے (یہ
ان تمام پرووائیڈرز کے لیے 400 کی دوبارہ درجہ بندی کرتی ہے جو پہلے سے
پیٹرن-اری رویّے پر انحصار کر رہے ہیں) اور واحد-پرووائیڈر رول اضافے کے دائرے سے باہر ہے۔

### نیا quota-misstating گیٹ وے شامل کرنا

1. `statusRestatementRegistry` میں ایک rule array رجسٹر کریں
   (`open-sse/config/upstreamStatusRestatement.ts`)۔ `textMarkers` کو
   provider-specific رکھیں؛ عمومی انگریزی فقرے کبھی دوبارہ استعمال نہ کریں جو
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) سے ٹکرائیں۔
2. اختیاری طور پر `open-sse/config/providerErrorRules.ts`
   (`providerRuleRegistry`) میں classification rules رجسٹر کریں تاکہ درست lock
   scope منتخب ہو سکے (اکاؤنٹ-wide quota کے لیے `connection`، per-model
   errors کے لیے `model`)۔ یہ مرحلہ production میں صرف ان providers کے لیے
   اثر انداز ہوتا ہے جن کے rules کو مکمل error text (body markers) درکار ہوتا ہے:
   provider id کو اسی فائل میں `FULL_TEXT_RULE_PROVIDERS` میں شامل کریں — ورنہ
   `checkFallbackError` rule کو ہمیشہ صرف structured `{code, type}` error دیتا
   ہے اور body-text rule live traffic پر کبھی match نہیں کرے گا۔ وہ rules جو
   خالصتاً `status`/`headers` پر match کرتے ہیں (جیسے Opencode کے یا Minimax
   کے) کو اس opt-in کی ضرورت نہیں۔ الگ سے، اگر rule میں `scope: "connection"`
   declared ہے اور مقصد حقیقی connection-wide cooldown اور same-request combo
   skip ہے (صرف ایک informational label نہیں)، تو provider id کو اسی فائل میں
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` میں شامل کریں — یہی چیز
   `isAgentrouterConnectionQuotaScope()`-طرز کی consumption کو
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) اور
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) میں gate کرتی ہے؛ اس کے بغیر
   `scope` اب بھی `fallbackResult.ruleScope` سے ہوکر گزرتا ہے مگر کوئی چیز اس
   پر عمل نہیں کرتی۔
3. `tests/unit/upstream-status-restatement.test.ts` اور
   `tests/unit/agentrouter-error-rules.test.ts` کے طرز پر unit tests شامل کریں
   (not-permanent / not-creditsExhausted guards سمیت، اور — اگر provider کو
   allowlist درکار ہو — ایک ایسا test جو یہ ثابت کرے کہ `resolveRuleMatchBody()`
   مکمل text صرف اسی provider کے لیے واپس کرتا ہے)۔

`chatCore.ts`، `classifyError`، یا combo میں کسی تبدیلی کی ضرورت نہیں۔

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` میں موجود providers (opencode فیملی) کو
IP-bucketed upstream سمجھا جاتا ہے (opencode کا free tier IP-bucketed ہے،
account-bucketed نہیں — دیکھیں #9611): status-429 کے ذریعے classified
`quota_exhausted` **یا** `rate_limit_exceeded` ہر اس allowlisted-family
connection کو cooldown کر دیتا ہے جس کا آخری معلوم egress IP ناکام connection
سے میل کھاتا ہو، اس سے پہلے کہ rotation انہیں آزمائے — اس طرح N-1 یقینی طور
پر ناکام upstream calls سے بچا جاتا ہے (اسی طرز جیسے #10460/#10525)۔
`rate_limit_exceeded` کو جان بوجھ کر شامل کیا گیا ہے: `markAccountUnavailable`
path پر opencode-specific rules کبھی match نہیں کرتے (کوئی headers/body
`checkFallbackError` کو نہیں دیے جاتے، opencode `FULL_TEXT_RULE_PROVIDERS`
میں نہیں ہے)، اس لیے وہ 429 جس کے body میں subscription-quota text ہوتا ہے
("monthly usage limit reached") quota-text fallback کے ذریعے
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`؛ 1h cooldown)
`quota_exhausted` classify ہو جاتا ہے، اس سے پہلے کہ `status_429` rule تک
پہنچا جائے — جبکہ quota-text-free 429 (سادہ rate limiting) `status_429` rule
کے ذریعے `rate_limit_exceeded` classify ہوتا ہے اور پھر بھی IP فیملی کو
cooldown کر دیتا ہے۔ کسی allowlisted provider کے لیے IP-bucketed rate limit
اسی سگنل کے مترادف ہے جو exhausted quota ہے۔ دیانتدارانہ حدود:

- **بہترین کوشش کی بنیاد پر**: لاک کنکشن کے آخری معلوم `egress_ip` کو
  `proxy_logs` سے حل کرتا ہے (24 گھنٹے کی ونڈو، ہم وقت ساز، بغیر کیشے کے)۔ ٹھنڈا
  کیشے (egress IP کبھی probe ہی نہیں ہوا) یا کوئی قطار نہ ہو → ناکام کنکشن کو
  برانچ پھر بھی کول کرتی ہے (آج کی طرح ریکارڈ کیا جاتا ہے)، صرف کوئی sibling
  لاک نہیں ہوتا۔
- **کبھی حتمی نہیں**: کول ڈاؤن ایک تجدید ہوتی رہنے والی کوٹہ ونڈو ہے
  (`testStatus: "unavailable"`)؛ IP کی سطح کے سگنل سے کبھی کوئی مستقل حالت اخذ
  نہیں کی جاتی۔ `disableCooling` والے کنکشن اس برانچ کو مکمل طور پر نظرانداز
  کر دیتے ہیں۔
- **اجازت یافتہ خاندان کے لیے لاک کی گرینولیریٹی تبدیل ہوتی ہے**: یہ دائرہ کار
  کی تبدیلی ہے، صرف sibling کی بہتری نہیں۔ opencode ایک `passthroughModels`
  فراہم کنندہ ہے، اس لیے اس برانچ سے پہلے 429 فی-MODEL لاک آؤٹ پیدا کرتا تھا؛
  اب یہ کنکشن کول ڈاؤن پیدا کرتا ہے — اس آپریٹر کے لیے بھی جو بغیر کسی
  sibling کے صرف ایک کنکشن چلا رہا ہو۔ یہ وہی گرینولیریٹی ہے جسے opencode کے
  اصولوں کی جدول پہلے سے درست قرار دیتی ہے (`scope: "connection"`،
  `providerErrorRules.ts`)، جو اب تک کبھی لاگو نہیں ہوئی کیونکہ opencode
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` میں شامل نہیں ہے۔ برانچ ناکام کنکشن کا
  کول ڈاؤن + `backoffLevel` خود لکھتی ہے، کنکشن کے دائرے والی agentrouter
  برانچ کی عکسی کرتی ہے، اور واپس آ جاتی ہے — فی-ماڈل بلاک اور نیچے والا عمومی
  راستہ کبھی نہیں پہنچتا۔
- **Combo شامل ہے**: agentrouter برانچ کی طرح، یہ دائرہ جان بوجھ کر اس
  `persistUnavailableState`/`isCombo` ڈاؤن گریڈ کو نظرانداز کرتا ہے جو combo
  کالر 429 پر لگاتا ہے۔ فی-ماڈل لاک آؤٹ اس دائرے کی کمزور شکل نہیں، یہ غلط
  اکائی ہے: یہ ختم شدہ IP کے بارے میں کچھ نہیں بتاتی، اس لیے combo روٹیشن ہر
  sibling کے لیے ایک یقینی ناکام کال ضائع کرتا رہے گا۔
- **Sibling کی حفاظت**: وہ sibling جو پہلے سے حتمی حالت میں ہو
  (banned/credits_exhausted) یا پہلے سے کسی طویل کول ڈاؤن میں ہو، کبھی اوور
  رائٹ نہیں ہوتا۔
- **خصوصی اجازت فہرست**: `EGRESS_BUCKETED_LOCK_PROVIDERS` کو وسیع کرنا مالک
  کا واضح فیصلہ ہے؛ کوئی عمومی وائرنگ نہیں (پیٹرن #10334/#10419)۔ sibling کا
  استفسار اسی اجازت فہرست کو بائنڈ کرتا ہے بجائے اسے SQL لِیٹرل کے طور پر
  دہرانے کے، اس لیے اسے وسیع کرنا ایک سطر کی تبدیلی ہی رہتا ہے۔
- **Egress IP کی گردش، دونوں سمتیں**: تلاش کی ونڈو (24 گھنٹے) egress-IP کیشے
  TTL (5 منٹ) سے کہیں زیادہ وسیع ہے، اس لیے "آخری معلوم IP" سرگزشت ہے، موجودہ
  حالت نہیں۔ اگر کسی کنکشن کا proxy ونڈو کے اندر بدل چکا ہو تو لاک کسی حقیقی
  مشترک IP سے **چوک** سکتا ہے (ریکارڈ شدہ IP نیا، غیر ختم شدہ ہے) — اور اسی کے
  بالمقابل یہ کسی ایسے sibling کو **کول** بھی کر سکتا ہے جو اس دوران ختم شدہ
  IP سے ہٹ چکا ہو۔ دوسری صورت میں اس sibling کو ایک کول ڈاؤن ونڈو کی قیمت ادا
  کرنی پڑتی ہے؛ دونوں سرگزشت پر مبنی تلاش کی قبول شدہ بہترین کوشش کی حدود
  ہیں۔
- **لاگت**: `proxy_logs` کے دو محدود اسکین (`idx_pl_timestamp` کے ذریعے ونڈو
  فلٹر شدہ)، صرف 429 کی تعدد پر۔ کوئی نیا انڈیکس نہیں (مائیگریشن 134
  YAGNI)۔ معتدل سائز کی حقیقی ٹریفک DB کاپی پر ماپا گیا؛ زیادہ تھروپٹ والا
  انسٹینس اسی ونڈو میں متناسب طور پر زیادہ قطاریں رکھتا ہے۔

---

## لچک کی دیگر خصوصیات

- **21 روٹنگ حکمت عملیاں** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — دیکھیے [AUTO-COMBO.md](../routing/AUTO-COMBO.md)۔
- **ری سیٹ سے آگاہ روٹنگ** (v3.8.0) — کنکشنز کو کوٹہ ری سیٹ وقت کے مطابق ترجیح دیتی ہے۔
- **بیک گراؤنڈ موڈ ڈیگریڈیشن** — Responses API کی `background: true` کو انتباہ کے ساتھ سنک موڈ پر ڈیگریڈ کر دیا جاتا ہے۔
- **متحرک ٹول حد کی شناخت** — ٹولوں کی تعداد کی حد لگنے پر پرووائیڈرز سے بیک آف کرتی ہے۔
- **ایمرجنسی فال بیک** — `OMNIROUTE_EMERGENCY_FALLBACK` سے کنٹرول ہوتا ہے؛ آپریٹرز اسے دوبارہ اسٹارٹ کیے بغیر فیچر فلیگز صفحے سے اوور رائیڈ کر سکتے ہیں۔

---

## ڈیبگنگ

- ویٹڈ کومبو `503 all_targets_cooling_down` کا جواب دیتا ہے (`Retry-After` سیٹ ہوتا ہے، `diagnostics.excluded` ہر ٹارگٹ کو `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` کے ساتھ فہرست میں دکھاتا ہے) → پول کنفیگر اور منسلک ہے، ہر ٹارگٹ صرف کسی لچک ٹائمر کی وجہ سے خارج ہے؛ `[COMBO] Weighted selection: every target excluded before dispatch — …` انتباہ وجوہات اور باقی سیکنڈز بتاتا ہے۔ اسی کومبو سے `404 no_executable_targets` کا مطلب ہے کہ کوئی لچک ٹائمر شامل نہیں تھا (چلانے کے لیے کچھ نہیں، یا ہر اکاؤنٹ دستیابی پروب میں ناکام ہو گیا)۔ یہ `targetResolution.ts` میں جمع کی گئی خارج شدگیوں سے `open-sse/services/combo/pinRecovery.ts` میں بنایا گیا ہے۔
- کسی پرووائیڈر کی تمام کیز نظر انداز ہو رہی ہیں → سرکٹ بریکر اسٹیٹ اور ہر کنکشن کا `rateLimitedUntil`/`testStatus` دونوں چیک کریں۔
- ری سیٹ ونڈو کے بعد پرووائیڈر مستقل طور پر خارج → کوڈ `getStatus()`/`canExecute()` کے بجائے خام `state` پڑھ رہا ہے۔
- ایک کی ناکام ہو، باقی کو چلنا چاہیے → سرکٹ بریکر کے بجائے کنکشن کول ڈاؤن کو ترجیح دیں۔
- صرف ایک ماڈل ناکام ہو → کنکشن کول ڈاؤن کے بجائے ماڈل لاک آؤٹ کو ترجیح دیں۔
- اسٹیٹ کو خود بحال ہو جانا چاہیے مگر نہیں ہوتی → مستقبل کا ٹائم اسٹیمپ اور وہ ریڈ پاتھ چیک کریں جو میعاد ختم شدہ اسٹیٹ کو تازہ کرتی ہو۔ مستقل اسٹیٹسز کے لیے دستی تبدیلی درکار ہوتی ہے۔

---

## رن ٹائم اسٹیٹ — ایجنٹ کے لیے فوری حوالہ

> `AGENTS.md` سے لفظ بہ لفظ منتقل کیا گیا → "Resilience Runtime State" (PR #12743) تاکہ ایجنٹ
> گائیڈ 40k کانٹیکسٹ بجٹ کے اندر رہے۔ یہ اوپر والے سیکشنز کا مختصر، ایجنٹ کے لیے بنا ہوا
> منظر ہے؛ نمبر دار سیکشنز مکمل حوالہ کے طور پر رہتے ہیں۔

OmniRoute میں عارضی ناکامی کے تین باہم مربوط مگر الگ الگ میکانزم ہیں۔ روٹنگ رویے کی ڈیبگنگ
کرتے وقت ان کے دائرہ کار کو الگ رکھیں۔ ایک نظر میں سمجھ آنے والے نقشے کے لیے
[3-لیئر ریزیلینس ڈایاگرام](../diagrams/exported/resilience-3layers.svg)
(ماخذ: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
دیکھیں۔

### پرووائیڈر سرکٹ بریکر

**دائرہ کار**: پورا پرووائیڈر، مثلاً `glm`، `openai`، `anthropic`۔

**مقصد**: ایسے پرووائیڈر کو ٹریفک بھیجنا بند کرنا جو اپ اسٹریم/سروس کی سطح پر بار بار
ناکام ہو رہا ہو، تاکہ ایک خراب پرووائیڈر ہر درخواست کو سست نہ کرے۔

**عمل درآمد**:

- بنیادی کلاس: `src/shared/utils/circuitBreaker.ts`
- چیٹ گیٹ/ایگزیکیوشن وائرنگ: `src/sse/handlers/chatHelpers.ts`، `src/sse/handlers/chat.ts`
- رن ٹائم اسٹیٹس API: `src/app/api/monitoring/health/route.ts`
- مشترک ریپرز: `open-sse/services/accountFallback.ts`
- مستقل محفوظ شدہ اسٹیٹ ٹیبل: `domain_circuit_breakers`

**اسٹیٹس** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: عام ٹریفک کی اجازت ہے۔
- `DEGRADED`: ابتدائی انتباہی حد — ناکامیاں ڈیگریڈیشن کی حد پار کر چکی ہیں مگر ابھی
  بریکر کی حد نہیں؛ ٹریفک اب بھی جاری رہتی ہے، ڈیش بورڈز انتباہ دکھاتے ہیں۔ کوئی درست کنکشن
  ٹیسٹ یا نئی ناکامی کے بغیر پرسکون ونڈو اسے واپس `CLOSED` کر دیتی ہے
  (`docs/architecture/RESILIENCE_GUIDE.md` میں ونڈو موجود ہے)۔
- `OPEN`: پرووائیڈر عارضی طور پر بلاک ہے؛ کالرز کو provider-circuit-open جواب ملتا ہے
  یا کومبو روٹنگ کسی دوسرے ٹارگٹ پر چلی جاتی ہے۔
- `HALF_OPEN`: ری سیٹ ٹائم آؤٹ گزر چکا ہے؛ ایک پروب درخواست کی اجازت دیں۔ کامیابی بریکر
  بند کر دیتی ہے، ناکامی اسے دوبارہ کھول دیتی ہے۔

**ڈیفالٹس** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`، جو
`src/lib/resilience/settings.ts` میں `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` کے ذریعے استعمال ہوتی ہے →
`src/sse/handlers/chatHelpers.ts` میں `getCircuitBreaker(provider, …)`)۔ پورے پرووائیڈر کا
بریکر `circuitBreakerThreshold` / `circuitBreakerReset` پر چلتا ہے:

| پروفائل | ڈیگریڈ ہونے کی حد | کھلنے کی حد (`circuitBreakerThreshold`) | ری سیٹ (`circuitBreakerReset`) |
| ------- | ----------------: | --------------------------------------: | -----------------------------: |
| OAuth   |               `5` |                                     `8` |                          `60s` |
| API key |               `7` |                                    `12` |                          `30s` |
| مقامی   |         (اخذ شدہ) |                                     `2` |                          `15s` |

`PROVIDER_PROFILES` `providerFailureThreshold` (10/15/2)،
`providerFailureWindowMs` (15/30/5 منٹ) اور `providerCooldownMs` (5/10/1 منٹ) بھی متعین کرتی ہے: یہ
**آپٹ اِن عالمی پرووائیڈر کول ڈاؤن کی ونڈو گیٹ** کو چلاتے ہیں (`PROVIDER_COOLDOWN_ENABLED`، ڈیفالٹ
بند) — `open-sse/services/providerCooldownTracker.ts` میں پرووائیڈر سطح کا اندراج صرف اس وقت
کولنگ شمار ہوتا ہے جب `providerFailureWindowMs` کے اندر `providerFailureThreshold` ناکامیاں ہو جائیں، اور پھر
وہ `providerCooldownMs` کے لیے کول ہوتا ہے۔ یہ لائیو بریکر کی حدیں نہیں ہیں — انہیں
بریکر کے رویے کی توقع رکھتے ہوئے ٹیون نہ کریں۔ ہر ڈیفالٹ کو
`OMNIROUTE_PROVIDER_BREAKER_*` اور `OMNIROUTE_CIRCUIT_BREAKER_*` ماحول متغیرات کے ذریعے اوور رائیڈ کیا جا سکتا ہے؛
رن ٹائم کے مطابق درست حوالہ ٹیبل `docs/architecture/RESILIENCE_GUIDE.md` میں موجود ہے۔

صرف پرووائیڈر سطح کی ناکامی اسٹیٹسز ہی پرووائیڈر بریکر کو ٹرپ کریں:

```ts
(408, 500, 502, 503, 504);
```

عام اکاؤنٹ/کی/ماڈل غلطیوں — جیسے زیادہ تر
`401`، `403` یا `429` کے معاملات — پر پورے پرووائیڈر کا بریکر ٹرپ نہ کریں۔ یہ عموماً کنکشن کول ڈاؤن یا ماڈل
لاک آؤٹ سے تعلق رکھتے ہیں۔ کسی عمومی API کی پرووائیڈر کی `403` قابلِ بحال ہونی چاہیے جب تک
اسے حتمی پرووائیڈر/اکاؤنٹ خرابی کے طور پر درجہ بند نہ کیا جائے۔

بریکر بیک گراؤنڈ ٹائمر کے بجائے سست (lazy) بحالی استعمال کرتا ہے۔ جب `OPEN` کی مدت ختم ہو جائے، تو `getStatus()`، `canExecute()`، اور `getRetryAfterMs()` جیسے ریڈ آپریشنز اسٹیٹ کو `HALF_OPEN` میں تازہ کر دیتے ہیں، تاکہ ڈیش بورڈز اور کومبو امیدوار بنانے والے ٹولز میعاد ختم شدہ پرووائیڈر کو ہمیشہ کے لیے خارج نہ کرتے رہیں۔

### کنکشن کول ڈاؤن

**دائرہ**: ایک پرووائیڈر کنکشن/اکاؤنٹ/کی۔

**مقصد**: ایک خراب کی/اکاؤنٹ کو عارضی طور پر نظر انداز کرنا جبکہ اسی پرووائیڈر کے دیگر کنکشنز کو درخواستیں فراہم کرتے رہنے دینا۔

**نفاذ**:

- لکھنے/اپڈیٹ کرنے کا راستہ: `src/sse/services/auth.ts::markAccountUnavailable()`
- اکاؤنٹ کا انتخاب/فلٹرنگ: `src/sse/services/auth.ts::getProviderCredentials...`
- کول ڈاؤن کا حساب: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ترتیبات: `src/lib/resilience/settings.ts`

پرووائیڈر کنکشنز پر اہم فیلڈز:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

اکاؤنٹ کے انتخاب کے دوران، ایک کنکشن کو اس وقت تک نظر انداز کیا جاتا ہے جب تک:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

کول ڈاؤن بھی سست (lazy) ہوتے ہیں: جب `rateLimitedUntil` ماضی میں ہو جائے، تو کنکشن دوبارہ اہل ہو جاتا ہے۔ کامیاب استعمال پر، `clearAccountError()` فیلڈ `testStatus`، `rateLimitedUntil`، ایرر فیلڈز، اور `backoffLevel` کو صاف کر دیتا ہے۔

پہلے سے طے شدہ کنکشن کول ڈاؤن طرزِ عمل:

- OAuth بنیادی کول ڈاؤن: `5s`۔
- API-key بنیادی کول ڈاؤن: `3s`۔
- API-key `429` کو دستیاب ہونے پر اپ اسٹریم دوبارہ کوشش کے اشارے (`Retry-After`، ری سیٹ ہیڈرز، یا قابلِ تجزیہ ری سیٹ متن) کو ترجیح دینی چاہیے۔
- بار بار ہونے والی قابلِ بحالی ناکامیاں ایکسپونینشل بیک آف استعمال کرتی ہیں:

```ts
baseCooldownMs * 2 ** failureIndex;
```

اینٹی تھنڈرنگ ہرڈ گارڈ ایک ہی کنکشن پر بیک وقت ناکامیوں کو کول ڈاؤن کو بار بار بڑھانے یا `backoffLevel` کو دو دفعہ بڑھانے سے روکتا ہے۔

حتمی اسٹیٹس کول ڈاؤن نہیں ہوتیں۔ `banned`، `expired` (جو صرف `EXPIRED_RETRY_MAX` کے ذریعے N محدود دوبارہ کوششوں کے بعد حتمی بنتا ہے)، اور `credits_exhausted` کا مقصد یہ ہے کہ وہ اس وقت تک غیر دستیاب رہیں جب تک کہ اسناد/ترتیبات تبدیل نہ ہوں یا کوئی آپریٹر انہیں ری سیٹ نہ کرے۔ حتمی اسٹیٹس کو عارضی کول ڈاؤن اسٹیٹ سے اوور رائٹ نہ کریں۔

### ماڈل لاک آؤٹ

**دائرہ**: پرووائیڈر + کنکشن + ماڈل۔

**مقصد**: پورے کنکشن کو غیر فعال کرنے سے بچنا جب اس کنکشن کے لیے صرف ایک ماڈل غیر دستیاب یا کوٹہ کی حد تک محدود ہو۔

مثالیں:

- فی-ماڈل کوٹہ والے پرووائیڈرز جو `429` واپس کریں۔
- مقامی پرووائیڈرز جو ایک غائب ماڈل کے لیے `404` واپس کریں۔
- پرووائیڈر سے مخصوص موڈ/ماڈل اجازت کی ناکامیاں جیسے منتخب Grok موڈز۔

ماڈل لاک آؤٹ `open-sse/services/accountFallback.ts` میں موجود ہے اور یہ اسی کنکشن کو دوسرے ماڈلز کی خدمت جاری رکھنے دیتا ہے۔

### ڈیبگنگ رہنمائی

- اگر کسی پرووائیڈر کی تمام کیز نظر انداز ہو رہی ہوں، تو پرووائیڈر بریکر اسٹیٹ اور ہر کنکشن کے `rateLimitedUntil`/`testStatus` دونوں کا جائزہ لیں۔
- اگر ری سیٹ ونڈو کے بعد کوئی پرووائیڈر مستقل طور پر خارج نظر آئے، تو چیک کریں کہ آیا کوڈ `getStatus()`/`canExecute()` استعمال کرنے کے بجائے خام `state` پڑھ رہا ہے۔
- اگر ایک پرووائیڈر کی ناکام ہو جائے لیکن باقی کیز کو کام کرنا چاہیے، تو پرووائیڈر بریکر کے بجائے کنکشن کول ڈاؤن کو ترجیح دیں۔
- اگر صرف ایک ماڈل ناکام ہو، تو کنکشن کول ڈاؤن کے بجائے ماڈل لاک آؤٹ کو ترجیح دیں۔
- اگر کسی اسٹیٹ کو خود بحال ہونا چاہیے، تو اس کے پاس مستقبل کا ٹائم اسٹیمپ/ری سیٹ ٹائم آؤٹ اور ایک ایسا ریڈ پاتھ ہونا چاہیے جو میعاد ختم شدہ اسٹیٹ کو تازہ کرے۔ مستقل اسٹیٹس کے لیے دستی اسناد یا کنفگریشن میں تبدیلی درکار ہوتی ہے۔

---

## TLS فنگرپرنٹنگ اور اسٹیلتھ

پرووائیڈر مخصوص اسٹیلتھ (JA3/JA4, CCH, ابفسکیشن) الگ سے دستاویز کی گئی ہے — دیکھیے `docs/security/STEALTH_GUIDE.md` (git؛ `/docs` میں کمپائل نہیں ہوتی)۔

---

## لچکداری جانچ (فیز 8 · بلاک C)

لچکداری منطق کے لیے یونٹ ٹیسٹس کے علاوہ، تین ٹیسٹ رن ٹائم کو حقیقی دباؤ/ناکامی کی حالتوں میں آزماتے ہیں (تمام انٹیگریشن/نائٹلی — ان میں سے کوئی بھی PRs کو بلاک نہیں کرتا):

| ٹیسٹ      | کیا                                                                                                                                                                                                   | چلانے کا طریقہ                          |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| کیاؤس     | جعلی اپ سٹریم نوڈ حقیقی لیٹینسی/ری سیٹ/ٹائم آؤٹ/503 انجیکٹ کرتا ہے؛ تصدیق کرتا ہے کہ سرکٹ بریکر کھلتا/بحال ہوتا ہے اور `checkFallbackError` 503 کو قابلِ بازیابی فال بیک کے طور پر درجہ بندی کرتا ہے۔ | `RUN_CHAOS_INT=1 npm run test:chaos`    |
| ہیپ گروتھ | `--expose-gc` کے تحت ہر `createSSEStream` کے لیے ~500 اسٹریمز؛ اگر ہیپ حد سے بڑھ جائے تو ناکام ہوتا ہے (OOM گارڈ #3069)۔                                                                              | `npm run test:heap`                     |
| k6 سوک    | `/api/monitoring/health` کے خلاف مسلسل بوجھ؛ p95/ایرر تھریشولڈز۔                                                                                                                                      | `k6 run tests/load/k6-soak.js` (نائٹلی) |

`.github/workflows/nightly-resilience.yml` کے ذریعے آرکیسٹریٹ شدہ (cron + dispatch)۔ ڈیفالٹ `test:integration` میں، کیاؤس اور ہیپ خودکار طور پر اسکپ ہو جاتے ہیں (`RUN_CHAOS_INT`/`--expose-gc` کے بغیر)۔

---

## مزید دیکھیے

- [آرکیٹیکچر گائیڈ](./ARCHITECTURE.md) — سسٹم آرکیٹیکچر اور اندرونی کام
- [صارف گائیڈ](../guides/USER_GUIDE.md) — پرووائیڈرز، کمبوز، CLI انٹیگریشن
- [آٹو کمبو انجن](../routing/AUTO-COMBO.md) — 16 فیٹر اسکورنگ، موڈ پیکس
