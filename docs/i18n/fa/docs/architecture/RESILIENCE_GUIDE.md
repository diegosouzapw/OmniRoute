# Resilience Guide (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute سه سازوکار تابآوری متمایز اما مرتبط دارد. هرکدام دامنه و هدف متفاوتی دارند. هنگام اشکالزدایی رفتار مسیریابی، آنها را از یکدیگر تفکیک کنید.

![مدل سهلایه تابآوری](../diagrams/exported/resilience-3layers.svg)

> منبع: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. قطعکننده مدار ارائهدهنده

**دامنه:** کل ارائهدهنده (برای مثال، `glm`، `openai`، `anthropic`).

**هدف:** توقف ارسال ترافیک به ارائهدهندهای که بهطور مکرر در سطح سرویس/بالادستی دچار خطا میشود.

**پیادهسازی:**

- کلاس اصلی: `src/shared/utils/circuitBreaker.ts`
- سیمکشی: `src/sse/handlers/chatHelpers.ts`، `src/sse/handlers/chat.ts`
- API وضعیت: `GET /api/monitoring/health`
- API بازنشانی: `POST /api/resilience/reset`
- پوششدهندهها: `open-sse/services/accountFallback.ts`
- جدول پایگاه داده: `domain_circuit_breakers`

**وضعیتها:**

- `CLOSED` — ترافیک عادی مجاز است
- `DEGRADED` — ترافیک همچنان مجاز است، اما افزایش خطاهای ارائهدهنده ردیابی میشود
- `OPEN` — ارائهدهنده موقتاً مسدود است؛ مسیریابی ترکیبی آن را نادیده میگیرد
- `HALF_OPEN` — مهلت بازنشانی سپری شده است؛ درخواست آزمایشی مجاز است

**مقادیر پیشفرض قابل پیکربندی (`open-sse/config/constants.ts`، ارائهشده در Dashboard → Settings → Resilience):**

| کلاس    | ورود به حالت تنزلیافته در | باز شدن در | مهلت بازنشانی |
| ------- | ------------------------- | ---------- | ------------- |
| OAuth   | 5 خطا                     | 8 خطا      | 60s           |
| API-key | 7 خطا                     | 12 خطا     | 30s           |
| محلی    | مشتقشده                   | 2 خطا      | 15s           |

`degradationThreshold` تعیین میکند یک ارائهدهنده چه زمانی وارد وضعیت `DEGRADED` شود؛ `failureThreshold` تعیین میکند چه زمانی مدار باز شود و ارائهدهنده نادیده گرفته شود. نمایههای ارائهدهندگان محلی هنوز در صفحه تنظیمات Resilience نمایش داده نمیشوند.

**کدهای فعالسازی:** فقط وضعیتهای سطح ارائهدهنده `[408, 500, 502, 503, 504]`. برای خطاهای سطح حساب (اغلب 401/403/429 — این خطاها به دوره انتظار یا قفلشدن تعلق دارند) مدار را فعال نکنید.

**بازیابی تنبل:** وقتی وضعیت `OPEN` منقضی میشود، `getStatus()`، `canExecute()` و `getRetryAfterMs()` وضعیت را به `HALF_OPEN` بهروزرسانی میکنند. به تایمر پسزمینه نیازی نیست.

---

### دوره انتظار سراسری و اختیاری ارائهدهنده (دروازه پنجرهای)

یک لایه چهارم و **اختیاری** (`PROVIDER_COOLDOWN_ENABLED`، بهطور پیشفرض **خاموش**) حافظهای بیندرخواستی از ارائهدهندگان خطادار را در
`open-sse/services/providerCooldownTracker.ts` نگه میدارد که هنگام تعیین اهداف ترکیبی بررسی میشود تا درخواستهای ترکیبی متوالی، ارائهدهندهای را که بهتازگی خطا داده است دوباره پیمایش نکنند. ورودیهای سطح ارائهدهنده از دروازه پنجرهای `PROVIDER_PROFILES` پیروی میکنند:

| نمایه    | فعالسازی پس از (`providerFailureThreshold`) | در بازه (`providerFailureWindowMs`) | دوره انتظار بهمدت (`providerCooldownMs`) |
| -------- | ------------------------------------------: | ----------------------------------: | ---------------------------------------: |
| OAuth    |                                        `10` |                             `15min` |                                   `5min` |
| کلید API |                                        `15` |                             `30min` |                                  `10min` |

پایینتر از آستانه، ارائهدهنده در وضعیت **دوره انتظار** در نظر گرفته نمیشود؛ یک موفقیت پنجره را پاک میکند. در عوض، ورودیهای سطح اتصال (`provider:connectionId`) پسروی نمایی `minRetryCooldownMs → maxRetryCooldownMs` را حفظ میکنند. بازنویسیها:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
محافظ رگرسیون: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. وقفهٔ اتصال

**دامنه:** یک اتصال/حساب/کلید ارائهدهنده.

**هدف:** نادیده گرفتن یک کلید معیوب، درحالیکه سایر اتصالهای همان ارائهدهنده همچنان به درخواستها سرویس میدهند.

**پیادهسازی:**

- علامتگذاری بهعنوان دردسترسنبودن: `src/sse/services/auth.ts::markAccountUnavailable()`
- انتخاب: `getProviderCredentials*` در همان فایل
- محاسبهٔ وقفه: `open-sse/services/accountFallback.ts::checkFallbackError()`
- تنظیمات: `src/lib/resilience/settings.ts`

**فیلدهای هر اتصال:**

- `rateLimitedUntil` — برچسب زمانی تا پایان وقفه
- `testStatus: "unavailable"`
- `lastError`، `lastErrorType`، `errorCode`
- `backoffLevel` — شمارندهٔ عقبنشینی نمایی

**وقفههای پیشفرض:**

- پایهٔ OAuth: ۵ ثانیه
- پایهٔ API-key: ۳ ثانیه
- API-key با خطای 429: سرآیندهای بالادستی `Retry-After`/بازنشانی یا متن قابلتجزیهٔ بازنشانی را ترجیح میدهد
- عقبنشینی: `baseCooldownMs * 2 ** failureIndex`

**محافظ جلوگیری از هجوم همزمان:** مانع میشود خطاهای همزمان، وقفه را بیشازحد تمدید کنند یا `backoffLevel` را دو بار افزایش دهند.

**وضعیتهای نهایی (وقفه نیستند):**

- `banned` — با تشخیص کلیدواژهٔ مسدودسازی / مسدودشدن حساب تنظیم میشود (به [BAN_DETECTION](../security/BAN_DETECTION.md) مراجعه کنید) و همچنین پس از سه رد متوالی هر درخواست از سمت بالادست (`request_rejected`، برای مثال پاسخ 403 مربوط به Anthropic OAuth با پیام «Request not allowed» — `open-sse/services/requestRejectedStreak.ts`)؛ یک رد منفرد فقط اتصال را وارد وقفه میکند
- `expired` (پس از تعداد محدودی تلاش مجدد به وضعیت نهایی منتقل میشود — `EXPIRED_RETRY_MAX = 3` همراه با عقبنشینی نمایی — تا خطاهای موقتی OAuth بتوانند پیش از غیرفعالشدن دائمی حساب، خودبهخود رفع شوند)
- `credits_exhausted`

این وضعیتها تا زمان تغییر اعتبارنامهها یا بازنشانی آنها توسط اپراتور پابرجا میمانند. وضعیتهای نهایی را با وضعیت وقفهٔ موقت بازنویسی نکنید.

**بازیابی تنبل:** وقتی زمان `rateLimitedUntil` گذشته باشد، اتصال دوباره واجد شرایط میشود. پس از استفادهٔ موفق، `clearAccountError()` همهٔ فیلدهای خطا را پاک میکند.

### دیوار مصرف Claude OAuth: مسیر با اولویت پایینتر + بازنشانی محدودیت نشست

**دامنه:** یک اتصال اشتراک Claude ‏(OAuth). هر دو قابلیت بهصورت **اختیاری برای هر
اتصال** فعال میشوند (ویرایش اتصال ← بخش Claude ← گزینههای `lowPriorityMode` / `autoLimitReset` در
`providerSpecificData` که هر دو بهطور پیشفرض خاموشاند) و معادل فرمانهای `/low-priority` و
`/limit-reset` در Claude Code هستند (قرارداد ارتباطی ثبتشده از Claude Code 2.1.263).

**پیادهسازی:**

- ماشین حالت + طبقهبندی پاسخ: `open-sse/services/claudeLowPriority.ts`
- کارخواه وضعیت/درخواست بازنشانی: `open-sse/services/claudeLimitReset.ts`
- هوک اجراکننده (تزریق سرآیند + تلاش مجدد با همان حساب): `open-sse/executors/base.ts::execute()`
- ماندگاری انتخاب فعالسازی: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**محرک:** دیوار مصرف ۵ ساعته — یک پاسخ `429` که سرآیندهای آن شامل
`anthropic-ratelimit-unified-status: rejected` و، در صورت واجد شرایط بودن حساب،
`anthropic-ratelimit-unified-slow-offer: treatment` باشند. پیش از نخستین پاسخ 429 مربوط به دیوار
هیچچیز ارسال نمیشود؛ یک پاسخ 429 انفجاری بدون سرآیندهای یکپارچه، از مسیر معمول وقفه عبور میکند.

**مسیر با اولویت پایینتر** (`lowPriorityMode`):

- هنگام دریافت پاسخ 429 مربوط به دیوار، اجراکننده پیشنهاد را میپذیرد و بلافاصله همان
  حساب را با `anthropic-usage-limit: slow` دوباره امتحان میکند؛ این مسیر تا زمان اعلامشده در
  `anthropic-ratelimit-unified-reset` (بهاضافهٔ ۶۰ ثانیه مهلت) فعال میماند و هر درخواست در این بازه
  سرآیند را حمل میکند. پاسخ 429 رهگیریشده هرگز به `handleChatCore` نمیرسد، بنابراین اتصال
  وارد **وقفه نمیشود** و با اتصال دیگری جایگزین نمیگردد.
- مقدار `anthropic-ratelimit-unified-slow-status` در پاسخهای بعدی: `active` / `not_needed`
  مسیر را حفظ میکنند؛ `slot_busy` ‏(429) یا یک پاسخ `529` بهاندازهٔ مقدار
  `anthropic-ratelimit-unified-slow-retry-after` اعلامشده از سوی سرور منتظر میماند (پیشفرض ۲۰ ثانیه، محدودشده به ۵ تا ۶۰۰ ثانیه، با نوسان تصادفی ±۳۰٪)
  و دوباره تلاش میکند؛ این فرایند به مقدار `anthropic-ratelimit-unified-slow-max-wait` محدود است (پیشفرض ۲۰ دقیقه، محدودشده به
  ۱ دقیقه تا ۶ ساعت) — پس از آن مسیر پایان مییابد و یک دورهٔ استراحت ۱۰ دقیقهای مانع پذیرش مجدد میشود. علاوه بر این،
  زمان انتظار به مقدار باقیمانده از مهلت آغاز بالادستی خود درخواست
  (`resolveFetchStartTimeout`، با پیشفرض ۱۰ دقیقه) منهای حاشیهٔ ۵ ثانیهای محدود میشود: بدون این محدودیت،
  حداکثر زمان انتظار پیشفرض ۲۰ دقیقهای از عمر درخواست بیشتر میشد و خواب در میانهٔ انتظار لغو میگردید،
  در نتیجه بهجای پایان مطلوب `max_wait` و دورهٔ استراحت، یک `TimeoutError` نمایان میشد.
- مقادیر `weekly_limit` / `budget_exhausted` / `off` / `ineligible`، تغییر پنجرهٔ ۵ ساعته، یا
  `ineligible` همراه با `anthropic-ratelimit-unified-overage-in-use: true` (که در هر وضعیتی آن را با
  `extra_usage` پایان میدهد، زیرا مصرف مازاد پولی اکنون دیوار را پوشش میدهد) مسیر را خاتمه میدهند؛ سپس
  پاسخ به مسیر معمول وقفه میرود. وضعیت `budget_exhausted` تا بازنشانی بودجهٔ اعلامشده (≤ ۸ روز) به خاطر سپرده میشود.
- بررسی دیوار پس از تلاشهای مجدد درونمرحلهای اجراکننده که با پاسخ 400 هدایت میشوند انجام میگیرد (ویرایش
  زمینه، محدودسازی تفکر/تلاش، یادگیری خودکار پارامتر)، بنابراین پاسخ 429 مربوط به دیوار که فقط در
  یکی از آن تلاشهای مجدد ظاهر شود نیز، بهجای رسیدن به مسیر وقفه، رهگیری میشود.
- وضعیت برای هر اتصال در حافظه نگهداری میشود (راهاندازی مجدد باعث میشود برای پذیرش مجدد، یک پاسخ 429 اضافی مربوط به دیوار دریافت شود).

**بازنشانی محدودیت نشست** (`autoLimitReset`، وقتی هر دو قابلیت روشن باشند پیش از مسیر امتحان میشود):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` ← بلوک `juniper_tide`؛
  وقتی `arm: "reset"` و `available: true` باشند،
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` با
  `{ "program": "juniper_tide" }` ارسال میشود (UUID سازمان از
  `providerSpecificData.organizationUUID`، با جایگزین راهاندازی اولیه).
- `result: reset|not_limited` ← درخواست با سرعت کامل دوباره امتحان میشود (بدون سرآیند slow).
  مقادیر `already_used` / `not_offered`، مقدار `next_available_at` را به خاطر میسپارند (پیشفرض یک هفته)؛ هر
  خطایی باعث ۱۵ دقیقه عقبنشینی میشود. بازنشانی هفتهای یک بار انجام میشود و همچنان جزو
  محدودیت هفتگی محسوب میگردد.

محافظهای رگرسیون: `tests/unit/claude-low-priority-mode.test.ts`،
`tests/unit/claude-limit-reset.test.ts`، `tests/unit/claude-low-priority-executor.test.ts`.

### وابستگی نشست (#7274)

**دامنه:** یک نشست کارخواه (سرآیند `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) که برای **هر** ارائهدهندهای به یک اتصال سنجاق شده است.

**هدف:** نگهداشتن یک عامل چندمرحلهای (Claude Code، aider، عاملهای سفارشی) روی یک حساب یکسان در درخواستهای مختلف، برای کاهش از دست رفتن زمینه در اثر جابهجایی بین حسابها و کاهش خطاهای تکراری 429 ناشی از شروع سرد در ارائهدهندگانی که وضعیت نشست را بهازای هر حساب نگه میدارند.

**پیادهسازی:**

- تعیین TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- انتخاب/ایجاد پین: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- استخراج هدر (عمومی، برای هر ارائهدهنده): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- جدول پین پایدارشده: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- تنظیم: `sessionAffinityTtlMs` (TTL سراسری برحسب میلیثانیه، مقدار `0` آن را غیرفعال میکند) — `src/lib/db/settings.ts`. نام آن از `codexSessionAffinityTtlMs` که فقط مخصوص Codex بود، بهوسیله مهاجرت `124_generic_session_affinity_ttl.sql` تغییر کرده است؛ این مهاجرت هر TTL ازپیشپیکربندیشده Codex را بهعنوان مقدار پیشفرض جدید منتقل میکند.

پیش از #7274، تابع `resolveSessionAffinityTtlMs()` برای همه ارائهدهندگان بهجز `codex` فوراً مقدار `0` را برمیگرداند؛ بنابراین تنظیم TTL (و هدرهای نشست) در هیچ جای دیگری اثری نداشت، با اینکه سازوکار پینکردن و استخراج هدر از قبل مستقل از ارائهدهنده بودند. این اصلاح، آن بازگشت زودهنگام را حذف کرد؛ اکنون TTL پس از تنظیم سراسری روی مقداری بیشتر از `0`، بهطور یکسان برای همه ارائهدهندگان اعمال میشود.

سه هدر وابستگی نشست هرگز به بالادست ارسال نمیشوند — اجراکنندهها هدرهای بالادست خود را از ابتدا میسازند و هدرهای کلاینت را عبور نمیدهند؛ بنابراین این مقدار فقط یک شناسه همبستگی داخلی باقی میماند.

### اجارههای انحصاری اتصال برای نشست مدیریتشده

**دامنه:** یک کلاینت/نشست HTTP مدیریتشده فعال، مالک یک اتصال واجد شرایط OmniRoute است.

**هدف:** فراهمکردن مالکیت انحصاری و بادوام اتصال برای کلاینتهایی که به یک مرز سخت مسیریابی میان درخواستها نیاز دارند. این سازوکار با وابستگی نشست، که یک ترجیح نرم برای تداوم است، تفاوت دارد: یک اجاره انحصاری، وضعیت چرخه عمر را در SQLite پایدار میکند، یکتایی سراسری مالک فعال و اتصال فعال را اعمال میکند و نسل منقضیشده را پیش از ارسال به ارائهدهنده رد میکند.

این قابلیت برای هر کلید API بهصورت اختیاری فعال میشود. یک کلید مدیریتشده باید دامنه `lease:exclusive` و یک فهرست صریح و غیرخالی `allowedConnections` داشته باشد. هر کلاینت HTTP میتواند از نقطه پایانی چرخه عمر استفاده کند؛ نیازی به نام کلاینت، user-agent، ارائهدهنده، روش OAuth یا مدل نیست. اجاره، مالک یک اتصال است نه یک مدل؛ بنابراین تغییر مدل تا زمانی که اتصال طبق روال معمول واجد شرایط باقی بماند، اتصال برقرارشده را حفظ میکند. قواعد عادی مدل، سهمیه، سلامت، دوره انتظار و فهرست مجاز همچنان تعیینکننده هستند و ممکن است همان نسل را به اتصال آزاد و واجد شرایط دیگری منتقل کنند.

چرخه عمر از `POST /api/v1/session-leases` با کنشهای JSON شامل `acquire`، `renew` و `release` استفاده میکند. درخواستهای استنتاج مدیریتشده، مقدار مبهم `X-OmniRoute-Lease-Owner` و مقدار دقیق `X-OmniRoute-Lease-Generation` را ارائه میکنند. شناسه مالک با `vlo_` آغاز میشود و پس از آن 43 نویسه base64url قرار میگیرد؛ فقط هش SHA-256 آن ذخیره میشود. هر مرز نهایی ارسال، شناسه کلید API احراز هویتشده و شناسه اتصال فعال را نیز مقید میکند. هدرهای کنترل اجاره از گزارشها، نماهای ذخیرهشده درخواست و هدرهای اجراکننده بالادست حذف میشوند.

اگر مسیریابی عادی دارای گزینههای مدیریتشده واجد شرایط باشد، اما همه گزینههای آزاد توسط اجارههای فعال متعلق به دیگران اشغال شده باشند، OmniRoute پاسخ HTTP `429`، کد عدم دسترسی به ظرفیت اجاره، وضعیت انتظار برای ظرفیت و یک `Retry-After` محدودشده را برمیگرداند که از نزدیکترین زمان انقضای مرتبط محاسبه میشود. خالیبودن عادی مجموعه گزینههای واجد شرایط بهمعنای رقابت بر سر اجاره نیست و معناشناسی خطای مسیریابی موجود خود را حفظ میکند.

سازوکارهای مرتبط همچنان مجزا باقی میمانند:

- اشغال نشست OAuth، توزیع نرم و محلیِ فرایند برای حسابهای OAuth است.
- سمافورهای حساب، مجوزهای همزمانی درخواست را اعطا میکنند و با تکمیل درخواست پایان مییابند.
- اجارههای انحصاری نشست مدیریتشده، مالکیت بادوام چرخه عمر را همراه با مرز نسل فراهم میکنند.

---

## 3. قفل مدل

**دامنه:** سهتایی ارائهدهنده + اتصال + مدل.

**دامنه کلید بر اساس وضعیت:** وضعیت خطا مشخص میکند که قفل در کدام کلید نوشته شود
(`resolveLockoutScope()` در `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — نشانهای از سهمیه یا مجوز دسترسی — **خانواده سهمیه** را قفل میکند:
  برای codex، کل دامنه `codex` / `spark` (همه مدلهای `gpt-5*` اتصال) و برای سایر ارائهدهندگان، `getQuotaScopedModelForProvider()`.
- `404` خود مدل را قفل میکند (`getModelLockKey()` دامنه `not_found` را محدود میکند).
- هر وضعیت دیگری — خطاهای انتقال/سرور `5xx` و پاسخ `502` تولیدشده توسط خود OmniRoute در اعتبارسنجی کیفیت — فقط سهتایی **دقیق**
  ارائهدهنده/اتصال/مدل را قفل میکند. یک جریان معیوب در یک مدل، مدرکی درباره سهمیه حساب نیست؛ پیش از این قانون، یک پاسخ خالی در
  `codex/gpt-5.6-luna` تمام مدلهای `gpt-5*` آن اتصال را برای 2 تا 30 دقیقه (بهصورت تصاعدی) از مسیریابی حذف میکرد، در حالی که سهمیه آن دستنخورده باقی مانده بود.
- گزینه صریح `scope` از سوی فراخواننده همیشه اولویت دارد (Antigravity مقدار `"exact"` را ارسال میکند).

**هدف:** جلوگیری از غیرفعال شدن کل یک اتصال، هنگامی که فقط یک مدل در دسترس نیست یا با محدودیت سهمیه مواجه شده است.

**مثالها:**

- ارائهدهندگان دارای سهمیه بهازای هر مدل که 429 برمیگردانند
- ارائهدهندگان محلی که برای یک مدل موجودنبودن آن، 404 برمیگردانند
- خطاهای مجوز مختص ارائهدهنده برای حالت/مدل (برای مثال، حالتهای Grok)

**پیادهسازی:** `open-sse/services/accountFallback.ts` — `lockModel()`، `clearModelLock()`، `getAllModelLockouts()`.

### داشبورد دورههای انتظار مدل (v3.8.0)

رابط کاربری: تنظیمات ← دورههای انتظار مدل (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

قفلهای فعال را همراه با این موارد فهرست میکند: ارائهدهنده، اتصال، مدل، دلیل، expiresAt. اپراتورها میتوانند از طریق کارت، یک مدل را بهصورت دستی دوباره فعال کنند.

**REST API:**

- `GET /api/resilience/model-cooldowns` — فهرست کردن قفلهای فعال
- `DELETE /api/resilience/model-cooldowns` — فعالسازی مجدد بهصورت دستی. بدنه: `{provider, connection, model}`. احراز هویت: مدیریتی.

### رابط کاربری تنظیمات قفل + بازیابی با کاهش بر اثر موفقیت (v3.8.23)

قفل مدل از یک رفتار کدنویسیشده و همیشه فعال، به قابلیتی کاملاً قابلپیکربندی و انتخابی تبدیل شد که کارت تنظیمات و مسیر بازیابی خودترمیمگر مخصوص خود را دارد.

**کارت تنظیمات:** تنظیمات ← قفل مدل
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
این کارت با `ModelCooldownsCard` فقطخواندنی بالا (که صرفاً قفلهای فعال را _فهرست_ میکند) **متفاوت** است — کارت جدید _پارامترها را پیکربندی میکند_. مقادیر پیشفرض در `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) قرار دارند:

| تنظیمات                 | مقدار پیشفرض                     | مفهوم                                                                   |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------------- |
| `enabled`               | `false`                          | کلید اصلی — قفل مدل **بهطور پیشفرض غیرفعال است**.                       |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | وضعیتهای بالادستی که بهعنوان خطای مختص مدل محسوب میشوند.                |
| `baseCooldownMs`        | `120_000` (120 ثانیه)            | مدت قفل اولیه برای نخستین خطا.                                          |
| `maxCooldownMs`         | `1_800_000` (30 دقیقه)           | سقف دوره انتظار افزایشیافته.                                            |
| `maxBackoffSteps`       | `10`                             | حداکثر تعداد گامهای افزایش پسروی نمایی.                                 |
| `useExponentialBackoff` | `true`                           | اینکه آیا خطاهای تکراری دوره انتظار را بهصورت نمایی افزایش دهند یا خیر. |

تنظیمات از طریق مخزن عادی تنظیمات ماندگار میشوند و بهوسیله شِمای تنظیمات تابآوری اعتبارسنجی میشوند؛ کارت مقادیر `baseCooldownMs`/`maxCooldownMs`
(با شرط `maxCooldownMs ≥ baseCooldownMs`) و `maxBackoffSteps` را در محدوده مجاز نگه میدارد.

**بازیابی با کاهش بر اثر موفقیت:** بازیابی صرفاً بر پایه انقضای زمانسنج **نیست**. یک پاسخ سالم، شمارش خطای مدل را کاهش میدهد تا مدلی که در میانه بازه بازیابی شده است، پیش از رسیدن زمانسنج به پایان، افزایش تصاعدی را متوقف کند (و قفل آن پاک شود). در صورت موفقیت یک مقصد ترکیبی، `open-sse/services/combo.ts` تابع `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) را فراخوانی میکند که مقدار ذخیرهشده `failureCount` را **نصف** میکند (`Math.floor(failureCount / 2)`)؛ هنگامی که این مقدار به `0` برسد، ورودی قفل بهطور کامل حذف میشود. تابع متناظر `recordModelLockoutFailure()`
در صورت وقوع خطا در بازه افزایش، شمارش را بیشتر میکند (و دوره انتظار را افزایش میدهد). این کاهش بر اثر موفقیت، علاوه بر انقضای معمول زمانسنج عمل میکند — هر یک از این دو مسیر میتواند یک مدل را دوباره فعال کند.

**وضعیت:** قفلها **در حافظه** نگهداری میشوند (`Map`های مختص هر پردازش از
`ModelLockoutEntry` که با `provider:connectionId:model` کلیدگذاری شدهاند؛ قفلهای دارای دامنه دقیق نیز با
`provider:connectionId:exact:model` کلیدگذاری میشوند) و در
پایگاه داده ماندگار نمیشوند — با راهاندازی مجدد از بین میروند. _تنظیمات_ ماندگار هستند؛ _وضعیت_ قفل فعال موقتی است.

---

## 4. کنترل همزمانی Quota-Share (v3.8.36)

حسابهای اشتراکی (GLM، MiniMax و غیره) اغلب فقط حدود ۱ تا ۳ درخواست همزمان را میپذیرند؛ عبور از این حد باعث بروز خطاهای 429 و دورههای انتظار میشود. این مسئله بهویژه در ترکیبهای **quota-share** (`qtSd/…`) حاد است؛ جایی که چند کلید API یک حساب بالادستی را به اشتراک میگذارند. سه لایه از سرازیر شدن درخواستها به یک حساب مشترک جلوگیری میکنند.

### سقف همزمانی بهازای هر اتصال (`max_concurrent`)

هر اتصال ارائهدهنده میتواند یک سقف `max_concurrent` تعریف کند
(`provider_connections.max_concurrent` که در پنجره اتصال / API / DB تنظیم میشود).
برای نداشتن محدودیت، آن را خالی بگذارید. این تنها تنظیمی است که لایه سریسازی زیر را کنترل میکند — آن را برابر با همزمانی واقعی حساب تنظیم کنید (برای مثال GLM حدود ۱ و MiniMax حدود ۲).

### سریسازی درخواستهای Quota-share

هنگامی که یک ارسال quota-share اتصالی را هدف میگیرد که یک مقدار مثبت برای
`max_concurrent` تعریف کرده است، درخواستهای همزمان به آن **حساب** از طریق یک
سمافور بهازای هر اتصال (کلید `qsconn:<connectionId>`) سریسازی میشوند: درخواستهای اضافی، بهجای سرازیر شدن به حساب، **در صف منتظر میمانند**. این سازوکار **fail-open** است — در صورت اشباع صف یا پایان مهلت زمانی، درخواست بدون دریافت اسلات ادامه مییابد و هیچگاه یک درخواست قابلارسال رد نمیشود. این قابلیت را از مسیر **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`، بهطور پیشفرض فعال) تغییر دهید. بدون سقف `max_concurrent`، رفتار تغییری نمیکند.

> دروازه مسیریابی quota-share (`selectQuotaShareTarget`، ‏DRR + P2C) نیز
> fail-open است و فقط اولویت اتصالی را که به سقف رسیده _کاهش میدهد_ — در یک
> مجموعه تکاتصالی نمیتواند محدودیت سختی اعمال کند؛ بنابراین، این سمافور است که عملاً
> هجوم درخواستها را مهار میکند.

### تلاش مجدد آگاه از دوره انتظار Combo

برای هر راهبرد combo (در صورت فعال بودن)، درخواستی که در غیر این صورت یک خطای 429
را برای یک دوره انتظار گذرای کوتاه تثبیت میکرد، تا پایان آن منتظر میماند و بهجای
بازگرداندن 429 دوباره ارسال میشود — این رفتار پنجرههای TPM/RPM در سطح Gemini
(حدود ۶۰ ثانیه `retry-after`) را در comboهای چندمدلی پوشش میدهد؛ برای مثال زمانی که هر دو مقصد یک combo دومدلی به محدودیت نرخ بهازای هر مدل برخورد کنند.
این رفتار توسط `comboCooldownWait` (`enabled`، `maxWaitMs`، `maxAttempts`،
`budgetMs`) در **Settings → Resilience** محدود میشود. این سازوکار هرگز برای
`quota_exhausted` (قفلشده تا نیمهشب) یا دلایل احراز هویت/یافتنشدن منتظر نمیماند.

---

## 5. کنترل پذیرش صف درخواست (v3.8.49 · مسئله #6593)

**دامنه**: صف محلی محدودسازی نرخ بهازای هر ارائهدهنده+اتصال (`open-sse/services/rateLimitManager.ts`،
با پشتوانه Bottleneck)، یک لایه پایینتر از سه سازوکار بالا.

**`maxWaitMs` انتظار در صف را محدود میکند؛ `executionMaxWaitMs` اجرا را محدود میکند.**
این دو عمداً از یکدیگر جدا هستند و هیچکدام روی دیگری اثر نمیگذارد.

`resilienceSettings.requestQueue.maxWaitMs` **بودجه انتظار در صف** است: این
مقدار، انتظار برای آزاد شدن یک جایگاه ارائهدهنده و سپس ماندن در وضعیت QUEUED را
پوشش میدهد و تایمر آن بهمحض خروج کار از وضعیت QUEUED و آغاز اجرا پاک میشود
(`rateLimitManager.ts`، `wrappedFn`). درخواستی که از این مقدار فراتر رود هرگز
به سرویس بالادستی نمیرسد. مقدار پیشفرض 30000ms است که توسط
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` در `src/lib/resilience/settings.ts` ارائه
میشود و در `tests/unit/ratelimit-admission-control-6593.test.ts` تثبیت شده است؛
بنابراین تغییر آن، بهجای اینکه بیسروصدا باعث منسوخ شدن این بند شود، آن آزمون را
ناموفق میکند.

`resilienceSettings.requestQueue.executionMaxWaitMs` مقداری است که Bottleneck
بهعنوان `expiration` کار دریافت میکند و تایمر آن تنها پس از اعزام آغاز میشود. این
مقدار یک سازوکار پشتیبان برای اجراکنندههایی است که مهلت زمانی بالادستی مختص خود
ندارند و وقتی مهلت زمانی شروع واکشی خود اجراکننده بیشتر باشد، تا آن مقدار افزایش
مییابد تا نتواند یک پاسخ سالمِ در حال پردازش را قطع کند. مقدار پیشفرض 600000ms
(10 دقیقه) است.

وارد کردن بودجه صف در `expiration` همان چیزی بود که پیشتر دروازههای
غیرافزایشی را حین پردازش متوقف میکرد — آنها بهطور مجاز چند دقیقه پیش از رسیدن
اولین بایتها اجرا میشوند — و به همین دلیل، انقضای اجرا بهصورت `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ارائه میشود، درحالیکه بودجه صف
کد مهلت زمانی صف را حمل میکند. هرکدام را از طریق
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (متغیر محیطی)
یا داشبورد (**Settings → Resilience**) بازنویسی کنید. هر دو هنگام نرمالسازی
به بازه 1ms–24h محدود میشوند.

**اولویت برای هر دو:** متغیر محیطی فقط مقدار _پیشفرض_ را تأمین میکند. مقداری
که در `resilienceSettings.requestQueue` ماندگار شده باشد (از طریق داشبورد /
وصله API و ذخیرهشده در `key_value`) بر آن اولویت دارد و مقدار
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` مختص هر اتصال نیز بر
آن اولویت دارد. بنابراین تنظیم متغیر محیطی در استقراری که از قبل مقداری ماندگار
دارد، هیچ تغییری ایجاد نمیکند — در عوض، تنظیم ماندگار را پاک یا بهروزرسانی کنید.

مدت حضور در صف توسط `maxWaitMs` محدود میشود؛ `maxQueueDepth` در ادامه تعداد
فراخوانندههایی را که میتوانند همزمان در صف باشند محدود میکند.

**`maxQueueDepth` — سقف پذیرش اختیاری (جدید).** `resilienceSettings.requestQueue.maxQueueDepth`
تعداد درخواستهایی را که میتوانند بهطور همزمان برای یک
ارائهدهنده+اتصال در صف بمانند (و هنوز اعزام نشده باشند) محدود میکند. وقتی صف
از قبل شامل `maxQueueDepth` درخواست باشد، یک درخواست جدید با خطای نوعدار
`code: "RATE_LIMIT_QUEUE_FULL"` و **پیش از** آنکه هرگز به `limiter.schedule()`
برسد، بهسرعت رد میشود — بنابراین رد کردن کمهزینه است و پیش از هرگونه کار
پاییندستی فشردهسازی پرامپت / ترجمه برای آن درخواست رخ میدهد. مقدار پیشفرض
`0` = غیرفعال است و رفتار فعلی صف نامحدود را حفظ میکند؛ بازه مجاز 0–100000
است. از طریق `RATE_LIMIT_MAX_QUEUE_DEPTH` (متغیر محیطی) یا
`resilienceSettings.requestQueue.maxQueueDepth` (وصله داشبورد/API) بازنویسی
کنید.

خود بررسی پذیرش یک تابع خالص است
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) تا
بدون یک محدودکننده واقعی Bottleneck نیز قابل آزمون واحد باشد.

> RFCای که #6593 را ایجاد کرد، یک پرچم `bypassCompressionOnRateLimit` را نیز
> پیشنهاد داده بود. خط لوله `open-sse/services/compression/` این مخزن برای
> فشردهسازی پرامپت/زمینه در درخواست خروجی LLM است (`chatCore.ts`،
> پیرامون بلوک `resolveCompressionSettings`/`selectCompressionStrategy`)،
> نه فشردهسازی پاسخ HTTP روی بدنههای 429 تولیدشده — هیچ مسیر کدی مطابق با
> یک پرچم دور زدن صریح وجود ندارد. آن مرحله فشردهسازی پرامپت نیز در حال حاضر
> در خط لوله درخواست _پیش از_ `withRateLimit()` اجرا میشود؛ بنابراین تغییر
> ترتیب برای صرفنظر کردن از آن هنگام رد شدن بهدلیل پر بودن صف، تغییری جداگانه
> و بزرگتر از دامنه این مسئله است؛ این تغییر عمداً در اینجا پیادهسازی **نشد**
> و اگر صرفهجویی CPU ارزش ریسک تغییر ترتیب را داشته باشد، بهعنوان کاری برای
> پیگیری بعدی باقی مانده است.

---

## 6. ناظر توان عملیاتی جریان کند (#9709)

محافظ اختیاری `resilienceSettings.streamRecovery.throughputWatchdog` یک بالادست را تشخیص میدهد که همچنان قطعهها را ارسال میکند، اما خروجی دستیار را با نرخی کمتر از نرخ پیکربندیشدهٔ خروجی مفید تولید میکند. این محافظ عمداً از مهلت عدم فعالیت متمایز است: ضربانهای حیات و فرادادهها هیچیک از تایمرها را بازنشانی نمیکنند و بهعنوان پیشرفت محسوب نمیشوند. همچنین با مهلت قطعی تلاش (#9153) متفاوت است؛ مهلتی که صرفنظر از کیفیت خروجی، همچنان سقف ایمنی مطلق باقی میماند.

ناظر پیش از آنکه بتواند عملیات را متوقف کند، به یک دورهٔ آمادهسازی و پس از آن یک پنجرهٔ لغزان کامل نیاز دارد. این ناظر دلتاهای متنی را از رویدادهای خروجی Chat Completions و Responses API میشمارد (بهعنوان یک تقریب محافظهکارانه بر مبنای بایت UTF-8)، رویدادهای صرفاً شامل میزان مصرف و رویدادهای خالی را نادیده میگیرد و تا زمانی که رویدادهای فراخوانی ابزار یا استدلال در جریاناند، ارزیابی را معلق میکند. این قابلیت بهطور پیشفرض غیرفعال است و میتوان آن را با `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` فعال کرد؛ پنجره، دورهٔ آمادهسازی، حداقل نرخ و حداقل خروجی قابلاندازهگیری، توسط لایهٔ عادی نرمالسازی تنظیمات تابآوری محدود میشوند.

هنگامی که این قابلیت فعال باشد، توقف ناشی از ناظر فقط بر تلاش فعال بالادست اعمال میشود. پیش از ارسال هر بایتی که برای کلاینت قابلمشاهده باشد، مسیر موجود بازیابی زودهنگام در همان حساب ممکن است تلاش را دوباره باز کند. پس از commit، جریان هرگز کورکورانه بازپخش نمیشود؛ فقط قرارداد امن و موجود ادامهٔ میانجریانی میتواند یک پسوند را به جریان متصل کند. نهاییسازی همچنان فقط یکبار انجام میشود، بنابراین حسابداری میزان مصرف و آزادسازی semaphore تکرار نمیشوند.

---

## 7. بازبیان وضعیت بالادست (خطاهای سهمیه با وضعیت نادرست)

**دامنه:** یک درگاه بالادست که اتمام موقت سهمیه را با وضعیت HTTP نادرست گزارش میکند.

**هدف:** اصلاح یک وضعیت گمراهکننده پیش از طبقهبندی، تا مصرفکنندگان پاییندست (موتور fallback، تجمیع combo و پاسخ ارائهشده به کلاینت) ماهیت واقعی و قابلتلاشمجدد خطا را مشاهده کنند.

برخی درگاهها اتمام موقت سهمیه را با یک وضعیت HTTP غیرقابلتلاشمجدد اعلام میکنند. `agentrouter.org` بهجای وضعیت استاندارد `429`، وضعیت `403` (و گاهی `400`) را با یک بدنهٔ چینی (`用户额度不足` / `额度不足`) برمیگرداند. کلاینتهایی مانند Claude Code، وضعیت `403` را دائمی در نظر میگیرند و نشست را متوقف میکنند؛ همچنین بدون اصلاح، موتور fallback آن را بهجای یک رویداد سهمیه، بهصورت `AUTH_ERROR` طبقهبندی میکند.

**پیادهسازی:**

- رجیستری + تطبیقدهنده: `open-sse/config/upstreamStatusRestatement.ts` — فهرستی از قواعد مختص هر ارائهدهنده (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`) که از طریق `applyStatusRestatement()` تطبیق داده میشوند.
- محل فراخوانی: بلوک `providerFailure:` در `open-sse/handlers/chatCore.ts`
  (حدود خط 3654)، بلافاصله پس از آنکه `parseUpstreamError()` یک پاسخ بالادست با وضعیت HTTP خطا (`!providerResponse.ok`) را تجزیه میکند و پیش از اجرای هرگونه طبقهبندی، تا همهٔ مصرفکنندگان پاییندست وضعیت اصلاحشده را مشاهده کنند. خطاهای تعبیهشده درون یک جریان SSE با وضعیت `200`، مسیر مجزا و دیرتری را برای تجزیهٔ جریان طی میکنند و **در حال حاضر** تحت پوشش این hook نیستند — این یک محدودیت شناختهشده است که هنوز برای وضعیت نادرست agentrouter لازم نیست (زیرا آن وضعیت بهصورت یک وضعیت HTTP خطا ظاهر میشود).
- واجد شرایط بودن برای تلاش مجدد: وضعیت `429` در `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) قرار دارد؛ بنابراین یک خطای بازبیانشده، بهجای آنکه بهشکل یک `403` بیاثر ظاهر شود، دارای یک پنجرهٔ واقعی تلاش مجدد است.
- مقدار مصنوعی `60s` برای `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) فقط چیزی است که پاسخ بازبیانشده به **کلاینت** اعلام میکند؛ این مقدار، مدت cooldown/lockout داخلی خود اتصال نیست — آن مدت بهطور جداگانه توسط سازوکاری تعیین میشود که عملاً خطای بازبیانشده را مدیریت میکند (افزایش تدریجی زمان انتظار در Connection Cooldown، §2، با مقدار پایهٔ `3s` برای ارائهدهندگان مبتنی بر API-key؛ یا Model Lockout، §3، برای ارائهدهندگان سهمیهٔ مختص مدل مانند agentrouter). روتر ممکن است از نظر داخلی زودتر از پنجرهٔ 60s اعلامشده به کلاینت، واجد شرایط تلاش مجدد شود — این حاشیهٔ اطمینان عمدی است، نه یک باگ.

خطاهای دائمی (`无权访问模型` در agentrouter — عدم دسترسی به این مدل) **هرگز** بازبیان نمیشوند: `excludeMarkers` حتی در صورت تطبیق `textMarkers` نیز قاعده را وتو میکند؛ بنابراین خطا وضعیت اصلی خود را حفظ میکند و هیچ چیزی آن را تا ابد مجدداً امتحان نمیکند. قاعدهٔ متناظر طبقهبندی ارائهدهنده
(`agentrouter-model-access-denied` در `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`، `scope: "model"`، با cooldown پایهٔ اعلامشدهٔ `6h`) توسط `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_پیش از_ بازگشت زودهنگام عمومی `FORBIDDEN` برای دستهٔ apikey بررسی میشود و تحت کنترل `honorsRuleLockScope(provider)` قرار دارد (#10334 — در حال حاضر از طریق allowlist با نام `HONORS_RULE_LOCK_SCOPE_PROVIDERS` در `providerErrorRules.ts`، منحصراً برای agentrouter فعال است). cooldown اعلامشدهٔ 6h این قاعده بهصورت `fallbackResult.baseCooldownMs` منتقل میشود، اما همچنان وارد مسیر ازپیشموجود lockout سهمیهٔ مختص مدل (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`، که بهجز منبع cooldown توسط #10334 تغییری نکرده است) میشود: مانند تمام lockoutهای دیگر مدل، مقدار آن تا `mlSettings.maxCooldownMs` تنظیمشده توسط اپراتور (مقدار پیشفرض `1_800_000ms` / 30min) کاهش مییابد و _دلیل lockout ذخیرهشده_ همان مقدار سختکدشدهٔ ازپیشموجود `"forbidden"` باقی میماند، نه مقدار `"auth_error"` این قاعده — فقط مدت cooldown بهصورت سرتاسری رعایت میشود، نه رشتهٔ دلیل. خود اتصال فعال باقی میماند؛ مدلهای همسطح روی همان اتصال تحت تأثیر قرار نمیگیرند.

خطاهای بازبیانشدهٔ سهمیه (`额度不足`) در محیط production با یک قانون provider تطبیق پیدا میکنند
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`، `scope:
"connection"`، بدون cooldown اعلامشدهٔ مختص به خود — مقدار پیشفرض scaled
backoff در persistence layer اعمال میشود). از #10334 به بعد، `scope` در
`ProviderErrorRuleMatch` بهصورت end-to-end مصرف میشود، اما **فقط** برای providerهای
موجود در allowlist با نام `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
در حال حاضر فقط `"agentrouter"`، با کنترل از طریق `honorsRuleLockScope()`). برای همهٔ
providerهای دیگر، `scope` دقیقاً مانند قبل از #10334 صرفاً جنبهٔ اطلاعرسانی دارد.
`checkFallbackError` دامنهٔ قانون تطبیقیافته را بهصورت
`fallbackResult.ruleScope` ارائه میکند؛ `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) guard مشترکی است که تأیید میکند یک
`ruleScope` واقعاً برای درنظرگرفتن بهعنوان سیگنالی سراسری در سطح connection و
خودبازیاب ایمن است (scope برابر با `"connection"`، reason برابر با
`quota_exhausted`، هرگز `permanent` نیست و هرگز `creditsExhausted` نیست — دفاعی
در برابر قانونی احتمالی در آینده که scope برابر با `"connection"` را با یک وضعیت
دائمی account جفت کند). دو مصرفکننده آن را فراخوانی میکنند:

- **Persistence** (`markAccountUnavailable()`، `src/sse/services/auth.ts`):
  بهجای افتادن در شاخهٔ lockout **بهازای هر model** برای passthrough-provider
  (مقدار `passthroughModels` برای agentrouter برابر با `true` است → تابع
  `hasPerModelQuota()` مقدار `true` را برمیگرداند)، یک **cooldown موقت connection**
  اعمال میکند — `testStatus: "unavailable"` بههمراه `rateLimitedUntil`، و هرگز
  یک وضعیت پایانی (`credits_exhausted`/`banned`/`expired`) اعمال نمیشود — تا
  connection پس از پایان cooldown خودبهخود بازیابی شود، نه اینکه به reset دستی
  credential نیاز داشته باشد. این کار برای connectionهایی با `disableCooling: true`
  انجام نمیشود (#2997): آن opt-out در عوض به lockout بهازای هر model منتقل میشود
  (یک موازنهٔ مستندشده — comment کد در بالای این شاخه را ببینید).
- **مسیریابی combo در همان request** (`applyComboTargetExhaustion()`،
  `open-sse/services/combo/targetExhaustion.ts`): همان guard، connection را در Set
  درونحافظهای `exhaustedConnections` با کلید `${provider}:${connectionId}` علامتگذاری
  میکند. این کار فقط target باقیماندهای در **همان request** را رد میکند که _خودش
  از قبل دقیقاً همان `connectionId` را_ در object مربوط به target خود داشته باشد
  (`getExhaustedTargetSkipReason()`،
  `open-sse/services/combo/comboPredicates.ts`، شرط `if (provider &&
connectionId)` پیش از lookup در `exhaustedConnections`) — یک combo سادهٔ
  model-list که در آن targetهای همسطح هیچ `connectionId` تثبیتشدهای از خود ندارند
  و یکی از آنها فقط در هر dispatch از header با نام
  `X-OmniRoute-Selected-Connection-Id` در response resolve میشود، هرگز با آن کلید
  تطبیق پیدا نمیکند. برای این حالت رایج، محافظت واقعی در برابر استفادهٔ مجدد یک leg
  باقیمانده از accountای که همین حالا exhaust شده، این Set **نیست** — بلکه
  persistence layer بالا است (اکنون `rateLimitedUntil` مربوط به connection در آینده
  قرار دارد) که با جلوگیری همین guard از ثبت `transientRateLimitedProviders` برای
  failure ترکیب میشود (بخش «طراحی دومرحلهای» و comment کد در شاخهٔ
  `isAgentrouterConnectionQuotaScope` در `targetExhaustion.ts` را ببینید): با
  علامتگذارینشدن آن Set، مجوز اجباری `allowRateLimitedConnection` در `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`، `:2734-2738`) برای legهای باقیماندهٔ
  provider فعال **نمیشود**؛ بنابراین filter مربوط به `rateLimitedUntil` در انتخاب
  credential (`src/sse/services/auth.ts:1238`) بهطور معمول رعایت میشود و یک leg
  باقیمانده یا یک connection متفاوت و همچنان واجد شرایط agentrouter را انتخاب
  میکند، یا با نبود credential قابلاستفاده شکست میخورد — و بهاجبار دوباره به
  connectionای که این شاخه همین حالا وارد cooldown کرده است بازنمیگردد.

### طراحی دومرحلهای: بازبیان status، سپس classification

بازبیان status (`upstreamStatusRestatement.ts`) و قوانین classification مربوط به
provider (`open-sse/config/providerErrorRules.ts`،
`providerRuleRegistry`) registryهای جداگانهای هستند که هر دو بر اساس provider id
و text markerها کلیدگذاری میشوند، اما در محلهای متفاوت اجرا میشوند و اهداف متفاوتی
دارند: restatement در ابتدای `chatCore.ts`، HTTP status را بازنویسی میکند؛
قوانین classification درون `checkFallbackError()`
(`open-sse/services/accountFallback.ts`)، `reason` مربوط به fallback و `scope`
قفل (`model` / `provider` / `connection`) را انتخاب میکنند.

قوانین classification فقط برای providerهایی که در allowlist با نام
`FULL_TEXT_RULE_PROVIDERS` در `providerErrorRules.ts` فهرست شدهاند، **متن** کامل
error را میبینند (که برای تطبیق markerهای body مانند `额度不足` لازم است) — در
حال حاضر فقط `"agentrouter"`. برای هر provider دیگر در **catalog داخلی**،
`checkFallbackError` فقط error ساختاریافته (`{code, type}`) را به
`getProviderErrorRuleMatch` میدهد؛ این داده برای قوانین مبتنی بر
header/status/code کافی است، اما markerهای متنی body را نمیبیند.
helper با نام `resolveRuleMatchBody()` این انتخاب را انجام میدهد: متن کامل error
برای providerهای موجود در allowlist و error ساختاریافته برای سایر موارد. افزودن یک
provider **داخلی** به `FULL_TEXT_RULE_PROVIDERS` یک opt-in صریح بهازای هر provider
است — این سازوکار وجود دارد تا مسیر پیشفرض برای هر provider خارج از فهرست،
بایتبهبایت بدون تغییر باقی بماند.

`scope` یک قانون (`model` / `provider` / `connection`) یک opt-in جداگانه از
`FULL_TEXT_RULE_PROVIDERS` است: `checkFallbackError` فقط آن را بهصورت
`fallbackResult.ruleScope` ارائه میکند و مصرفکنندگان downstream تنها برای
providerهای موجود در allowlist با نام `HONORS_RULE_LOCK_SCOPE_PROVIDERS` در همان
فایل، آن را چیزی بیش از یک label اطلاعرسانی در نظر میگیرند (`gated via
honorsRuleLockScope()` — در حال حاضر فقط `"agentrouter"`). برای آگاهی از اینکه
یک تطبیق با `scope: "connection"` پس از قرارگرفتن provider در آن allowlist عملاً
چه میکند، بخش «خطاهای بازبیانشدهٔ سهمیه» در بالا را ببینید.

**#11104 — قوانین اعلامشده توسط اپراتور هر دو allowlist را دور میزنند.** یک اپراتور میتواند
در زمان اجرا از طریق `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
و بدون ویرایش این فایل، یک قانون مختص هر provider تعریف کند. مشروطکردن یک قانون اپراتور به
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — allowlistهایی
که برای محافظت از رفتار **پیشفرض** قوانین کاتالوگ داخلی در نظر گرفته شدهاند —
مکانیسم تنظیمات را برای همه providerها بهجز مواردی که از قبل در آنجا
فهرست شدهاند، بلااستفاده میکند؛ زیرا تعریف قانون، خود بهمنزلهٔ opt-in صریح
اپراتور است. `resolveRuleMatchBody()` و `honorsRuleLockScope()` هر دو ابتدا
`hasOperatorRuleForProvider()` را بررسی میکنند: providerای که دارای قانون اپراتور است،
متن خام خطا را دریافت میکند و `scope` تعریفشدهٔ آن رعایت میشود، صرفنظر از
اینکه در یکی از allowlistها نیز وجود داشته باشد یا نه.

**شکاف شناختهشده — برای HTTP 400 هرگز به `providerRuleRegistry` مراجعه نمیشود.**
شاخهٔ `BAD_REQUEST` در `checkFallbackError` وضعیت 400 را بهطور کامل
از طریق آرایههای الگوی خودش (`MODEL_ACCESS_DENIED_PATTERNS`،
`CONTEXT_OVERFLOW_PATTERNS` و موارد دیگر در `accountFallback.ts`) طبقهبندی میکند و پیش از
رسیدن به شاخهٔ `configuredRule`/`getProviderErrorRuleMatch` در بالای آن بازمیگردد.
یک قانون کاتالوگ داخلی (یا قانون اپراتور) با `status: 400` از نظر نحوی
معتبر است، اما هرگز اجرا نخواهد شد. در حال حاضر هیچ قانون موجودی 400 را هدف قرار نمیدهد،
بنابراین چیزی در محیط production تحت تأثیر نیست — اما یک قانون 400 در آینده ابتدا نیازمند
تغییر این شاخه است؛ تغییری که از افزودن یک قانون گستردهتر است (زیرا 400 را برای همهٔ
providerهایی که از قبل به رفتار آرایههای الگو متکی هستند دوباره طبقهبندی میکند)
و خارج از محدودهٔ افزودن یک قانون برای یک provider منفرد است.

### افزودن یک gateway جدید که سهمیه را نادرست گزارش میکند

1. یک آرایهٔ قانون در `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`) ثبت کنید. `textMarkers` را
   مختص provider نگه دارید؛ هرگز از عبارتهای عمومی انگلیسی که با
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`)
   تداخل دارند، دوباره استفاده نکنید.
2. در صورت نیاز، قوانین طبقهبندی را در
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) ثبت کنید تا
   محدودهٔ قفل درست انتخاب شود (`connection` برای سهمیهٔ سراسری حساب و `model` برای
   خطاهای مختص هر مدل). این مرحله در production فقط برای providerهایی اثر میگذارد
   که قوانینشان به متن کامل خطا نیاز دارد (نشانگرهای body): شناسهٔ provider را در همان فایل به
   `FULL_TEXT_RULE_PROVIDERS` اضافه کنید — در غیر این صورت
   `checkFallbackError` فقط خطای ساختیافتهٔ
   `{code, type}` را به قانون تحویل میدهد و یک قانون مبتنی بر متن body هرگز با ترافیک واقعی
   مطابقت نخواهد داشت. قوانینی که صرفاً بر اساس `status`/`headers` مطابقت مییابند
   (مانند قوانین Opencode یا Minimax) به این opt-in نیاز ندارند. جدا از این، اگر قانون
   `scope: "connection"` را تعریف میکند و هدف، یک cooldown واقعی در سراسر connection
   بههمراه ردکردن combo در همان درخواست است (نه صرفاً یک برچسب اطلاعرسانی)، شناسهٔ
   provider را در همان فایل به `HONORS_RULE_LOCK_SCOPE_PROVIDERS` اضافه کنید — این
   همان چیزی است که مصرف به سبک `isAgentrouterConnectionQuotaScope()` را در
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) و
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) کنترل میکند؛ بدون آن، `scope`
   همچنان از طریق `fallbackResult.ruleScope` جریان مییابد، اما هیچچیز بر اساس آن عمل نمیکند.
3. تستهای واحدی مشابه `tests/unit/upstream-status-restatement.test.ts`
   و `tests/unit/agentrouter-error-rules.test.ts` اضافه کنید (از جمله guardهای
   not-permanent / not-creditsExhausted و — اگر provider به allowlist نیاز دارد —
   تستی که تأیید کند `resolveRuleMatchBody()` فقط برای همان provider متن کامل را
   بازمیگرداند).

هیچ تغییری در `chatCore.ts`، `classifyError` یا combo لازم نیست.

#### قفل مبتنی بر باکت خروجی (#10880)

providerهای موجود در `EGRESS_BUCKETED_LOCK_PROVIDERS` (خانوادهٔ opencode) بهعنوان
upstream مبتنی بر باکت IP در نظر گرفته میشوند (سطح رایگان opencode بر اساس IP باکتبندی
میشود، نه بر اساس حساب — به #9611 مراجعه کنید): وضعیت 429 که بهصورت `quota_exhausted`
**یا** `rate_limit_exceeded` طبقهبندی شده باشد، برای هر connection از خانوادهٔ موجود در
allowlist که آخرین IP خروجی شناختهشدهٔ آن با IP connection ناموفق مطابقت دارد، cooldown
اعمال میکند؛ این کار پیش از آن انجام میشود که rotation بتواند آنها را امتحان کند
— و از N-1 فراخوانی upstream با شکست تضمینشده جلوگیری میکند (همان الگوی
#10460/#10525). `rate_limit_exceeded` عمداً گنجانده شده است: در مسیر
`markAccountUnavailable` قوانین مختص opencode هرگز مطابقت پیدا نمیکنند (هیچ header/bodyای
به `checkFallbackError` تحویل داده نمیشود و opencode در `FULL_TEXT_RULE_PROVIDERS`
نیست)، بنابراین یک 429 که body آن حاوی متن سهمیهٔ اشتراک ("monthly usage limit
reached") باشد، پیش از آنکه قانون `status_429` اصلاً بررسی شود، توسط fallback متن سهمیه
(`buildSubscriptionQuotaFallback`، `accountFallback.ts`؛ cooldown یکساعته) بهصورت
`quota_exhausted` طبقهبندی میشود — درحالیکه یک 429 فاقد متن سهمیه (محدودسازی نرخ ساده)
از طریق قانون `status_429` بهصورت `rate_limit_exceeded` طبقهبندی میشود و همچنان
برای خانوادهٔ IP cooldown اعمال میکند. برای یک provider موجود در allowlist، محدودیت نرخ
مبتنی بر IP همان سیگنال سهمیهٔ تمامشده است. محدودیتهای واقعی:

- **حداکثر تلاش**: قفل، آخرین `egress_ip` شناختهشدهٔ اتصال را
  از `proxy_logs` پیدا میکند (بازهٔ 24h، همگام، بدون کش). در صورت سرد بودن کش (IP خروجی
  هرگز بررسی نشده باشد) یا نبود هیچ ردیفی → اتصال ناموفق همچنان توسط این
  شاخه وارد دورهٔ انتظار میشود (مانند وضعیت فعلی ثبت میشود)، فقط هیچ اتصال همخانوادهای قفل نمیشود.
- **هرگز نهایی نیست**: دورهٔ انتظار یک پنجرهٔ سهمیهای تمدیدشونده است
  (`testStatus: "unavailable"`)، و هیچگاه از یک سیگنال در سطح IP، وضعیت دائمی
  استنتاج نمیشود. اتصالهای `disableCooling` این شاخه را کاملاً نادیده میگیرند.
- **ریزدانگی قفل برای خانوادهٔ موجود در فهرست مجاز تغییر میکند**: این یک تغییر
  دامنه است، نه صرفاً یک بهینهسازی برای اتصالهای همخانواده. opencode یک ارائهدهندهٔ
  `passthroughModels` است، بنابراین پیش از این شاخه، خطای 429 باعث قفلشدن
  در سطح هر MODEL میشد؛ اکنون باعث ورود اتصال به دورهٔ انتظار میشود — حتی
  برای اپراتوری که تنها یک اتصال و هیچ اتصال همخانوادهای ندارد. این همان ریزدانگیای است
  که جدول قوانین opencode از قبل صحیح اعلام کرده است (`scope: "connection"`,
  `providerErrorRules.ts`)؛ اما تاکنون هرگز رعایت نشده، زیرا opencode در
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` نیست. این شاخه دورهٔ انتظار اتصال
  ناموفق + `backoffLevel` آن را مستقیماً مینویسد، مشابه شاخهٔ agentrouter
  با دامنهٔ اتصال، و سپس بازمیگردد — بلوک در سطح مدل و مسیر عمومی پایینتر
  هرگز اجرا نمیشوند.
- **شامل Combo**: مانند شاخهٔ agentrouter، این دامنه عمداً تنزل
  `persistUnavailableState`/`isCombo` را که یک فراخوانندهٔ combo برای خطای 429
  اعمال میکند نادیده میگیرد. قفلشدن در سطح مدل شکل ضعیفتری از این دامنه نیست،
  بلکه واحد اشتباهی است: هیچ چیزی دربارهٔ IP با سهمیهٔ تمامشده بیان نمیکند،
  بنابراین چرخش combo به ازای هر اتصال همخانواده همچنان یک فراخوانی با شکست قطعی
  را هدر میدهد.
- **ایمنی اتصالهای همخانواده**: اتصال همخانوادهای که از قبل در وضعیت نهایی
  (banned/credits_exhausted) قرار دارد یا هماکنون دورهٔ انتظار طولانیتری دارد،
  هرگز بازنویسی نمیشود.
- **فهرست مجاز انحصاری**: گسترش `EGRESS_BUCKETED_LOCK_PROVIDERS` یک
  تصمیم صریح مالک است؛ نه سیمکشی عمومی (الگوی #10334/#10419). کوئری
  اتصالهای همخانواده بهجای تکرار همان فهرست مجاز بهصورت یک لیترال SQL، همان
  فهرست را bind میکند؛ بنابراین گسترش آن همچنان تغییری یکخطی باقی میماند.
- **چرخش IP خروجی، در هر دو جهت**: پنجرهٔ جستوجو (24h) بسیار
  بزرگتر از TTL کش IP خروجی (5 min) است، بنابراین «آخرین IP شناختهشده» تاریخچه
  است، نه وضعیت فعلی. اگر پراکسی یک اتصال درون این پنجره چرخیده باشد،
  قفل ممکن است یک IP واقعاً مشترک را **از دست بدهد** (IP ثبتشده، IP جدید
  و دارای سهمیه است) — و بهطور متقارن ممکن است **اتصال همخانوادهای را وارد دورهٔ انتظار کند که از آن زمان
  از IP دارای سهمیهٔ تمامشده فاصله گرفته است**. حالت دوم بهاندازهٔ یک
  پنجرهٔ دورهٔ انتظار برای آن اتصال همخانواده هزینه دارد؛ هر دو بهعنوان محدودیتهای
  حداکثر تلاشِ یک جستوجوی مبتنی بر تاریخچه پذیرفته شدهاند.
- **هزینه**: دو پیمایش محدودشده روی `proxy_logs` (فیلترشده بر اساس پنجره
  از طریق `idx_pl_timestamp`)، فقط با بسامد خطای 429. بدون ایندکس جدید
  (migration 134، اصل YAGNI). روی یک کپی با اندازهٔ متوسط از پایگاه دادهٔ
  ترافیک واقعی اندازهگیری شده است؛ یک نمونهٔ پرترافیک بهتناسب، ردیفهای بیشتری را
  در همان پنجره نگه میدارد.

---

## سایر قابلیتهای تابآوری

- **۱۹ راهبرد مسیریابی** (اولویت، وزندار، نوبتگردشی، انتقال زمینه، پرکردن از ابتدا، p2c، تصادفی، کماستفادهترین، بهینهسازیشده برای هزینه، آگاه از بازنشانی، پنجره بازنشانی، ظرفیت مازاد، تصادفی سختگیرانه، خودکار، lkgp، بهینهسازیشده برای زمینه، بهینهسازیشده برای کش، ادغام، خط لوله) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) را ببینید.
- **مسیریابی آگاه از بازنشانی** (v3.8.0) — اتصالها را بر اساس زمان بازنشانی سهمیه اولویتبندی میکند.
- **تنزل حالت پسزمینه** — `background: true` در Responses API با هشدار به حالت همگام تنزل مییابد.
- **تشخیص پویای محدودیت ابزار** — هنگام رسیدن به محدودیت تعداد ابزارها، ارائهدهندگان را عقب میکشد.
- **بازگشت اضطراری** — توسط `OMNIROUTE_EMERGENCY_FALLBACK` کنترل میشود؛ اپراتورها میتوانند بدون راهاندازی مجدد، آن را از صفحه پرچمهای قابلیت تغییر دهند.

---

## اشکالزدایی

- پاسخ ترکیب وزندار `503 all_targets_cooling_down` است (`Retry-After` تنظیم شده و `diagnostics.excluded` همهٔ هدفها را با یکی از دلایل `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` فهرست میکند) ← استخر پیکربندی و متصل شده است، اما هر هدف صرفاً بهدلیل یک زمانسنج تابآوری کنار گذاشته شده است؛ هشدار `[COMBO] Weighted selection: every target excluded before dispatch — …` دلایل و ثانیههای باقیمانده را مشخص میکند. خطای `404 no_executable_targets` از همان ترکیب به این معناست که هیچ زمانسنج تابآوریای دخیل نبوده است (چیزی برای اجرا وجود ندارد، یا بررسی دسترسپذیری برای همهٔ حسابها ناموفق بوده است). این منطق در `open-sse/services/combo/pinRecovery.ts` و بر پایهٔ موارد کنارگذاری جمعآوریشده در `targetResolution.ts` ساخته شده است.
- همهٔ کلیدهای یک ارائهدهنده نادیده گرفته میشوند ← هم وضعیت قطعکنندهٔ مدار و هم `rateLimitedUntil`/`testStatus` هر اتصال را بررسی کنید.
- ارائهدهنده پس از بازهٔ بازنشانی بهطور دائمی کنار گذاشته میشود ← کد بهجای `getStatus()`/`canExecute()` مستقیماً `state` خام را میخواند.
- یک کلید ناموفق است، اما بقیه باید کار کنند ← وقفهٔ اتصال را به قطعکنندهٔ مدار ترجیح دهید.
- فقط یک مدل ناموفق است ← قفل مدل را به وقفهٔ اتصال ترجیح دهید.
- وضعیت باید خودکار بازیابی شود، اما نمیشود ← وجود مهر زمانی در آینده و مسیر خواندنی را بررسی کنید که وضعیت منقضیشده را تازهسازی میکند. وضعیتهای دائمی به تغییرات دستی نیاز دارند.

---

## اثرانگشت TLS و پنهانکاری

پنهانکاری مختص ارائهدهنده (JA3/JA4، CCH، مبهمسازی) بهصورت جداگانه مستند شده است — `docs/security/STEALTH_GUIDE.md` را ببینید (در git؛ در `/docs` کامپایل نشده است).

---

## آزمایش تابآوری (فاز ۸ · بلوک C)

فراتر از تستهای واحد منطق تابآوری، سه تست، زمان اجرا را تحت
شرایط واقعی فشار/خرابی بررسی میکنند (همگی یکپارچهسازی/شبانه — هیچکدام PRها را مسدود نمیکنند):

| تست               | کارکرد                                                                                                                                                                                                        | اجرا                                   |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| آشوب              | یک گره بالادستی جعلی، تأخیر/بازنشانی/مهلتپایانیافته/503 واقعی تزریق میکند؛ تأیید میکند که قطعکننده مدار باز میشود/بازیابی میشود و `checkFallbackError` خطای 503 را بهعنوان بازگشت قابلبازیابی طبقهبندی میکند. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| رشد هیپ           | حدود ۵۰۰ جریان بهازای هر `createSSEStream` تحت `--expose-gc`؛ اگر هیپ فراتر از سقف رشد کند، ناموفق میشود (محافظ OOM شماره 3069).                                                                              | `npm run test:heap`                    |
| آزمون ماندگاری k6 | بار مداوم روی `/api/monitoring/health`؛ آستانههای p95/خطا.                                                                                                                                                    | `k6 run tests/load/k6-soak.js` (شبانه) |

هماهنگسازی توسط `.github/workflows/nightly-resilience.yml` انجام میشود (cron + dispatch). در
`test:integration` پیشفرض، تستهای آشوب و هیپ خودکار رد میشوند (بدون `RUN_CHAOS_INT`/`--expose-gc`).

---

## همچنین ببینید

- [راهنمای معماری](./ARCHITECTURE.md) — معماری سیستم و جزئیات داخلی
- [راهنمای کاربر](../guides/USER_GUIDE.md) — ارائهدهندگان، ترکیبها و یکپارچهسازی CLI
- [موتور ترکیب خودکار](../routing/AUTO-COMBO.md) — امتیازدهی ۱۶ عاملی و بستههای حالت
