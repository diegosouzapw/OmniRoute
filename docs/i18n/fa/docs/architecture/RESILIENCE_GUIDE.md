# Resilience Guide (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute سه مکانیزم تابآوری متمایز اما مرتبط به هم دارد. هر کدام دامنه و هدف متفاوتی دارند. هنگام اشکالزدایی رفتار مسیریابی، آنها را از یکدیگر جدا نگه دارید.

![مدل تابآوری سهلایه](../diagrams/exported/resilience-3layers.svg)

> منبع: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## ۱. قطعکنندهٔ مدار ارائهدهنده (Circuit Breaker)

**دامنه:** کل ارائهدهنده (مثلاً `glm`، `openai`، `anthropic`).

**هدف:** توقف ارسال ترافیک به ارائهدهندهای که بهطور مکرر در سطح آپاستریم/سرویس دچار خطا میشود.

**پیادهسازی:**

- کلاس اصلی: `src/shared/utils/circuitBreaker.ts`
- نقاط اتصال: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API وضعیت: `GET /api/monitoring/health`
- API بازنشانی: `POST /api/resilience/reset`
- Wrapperها: `open-sse/services/accountFallback.ts`
- جدول پایگاه داده: `domain_circuit_breakers`

**وضعیتها:**

- `CLOSED` — ترافیک عادی مجاز است
- `DEGRADED` — ترافیک همچنان مجاز است، اما خطاهای فزایندهٔ ارائهدهنده ردیابی میشوند؛ در صورت تعداد کافی موفقیت، یک تست اتصال معتبر، یا پس از سپری شدن طولانیترین مدت نگهداشت `OPEN` برای آخرین نوع خطا (مقدار `cooldownByKind` مربوط به آن، در غیر این صورت `resetTimeout`، × `maxBackoffMultiplier`، حداقل به اندازهٔ یک کولداون) بدون رخ دادن خطای جدید، به `CLOSED` بازمیگردد
- `OPEN` — ارائهدهنده بهطور موقت مسدود است؛ مسیریابی combo آن را رد میکند
- `HALF_OPEN` — مهلت بازنشانی سپری شده است؛ درخواست probe مجاز است

**مقادیر پیشفرض قابل پیکربندی (`open-sse/config/constants.ts`، در Dashboard → Settings → Resilience در دسترس است):**

| کلاس     | ورود به DEGRADED پس از | باز شدن پس از | مهلت بازنشانی |
| -------- | ---------------------- | ------------- | ------------- |
| OAuth    | ۵ خطا                  | ۸ خطا         | 60s           |
| کلید API | ۷ خطا                  | ۱۲ خطا        | 30s           |
| محلی     | مشتقشده                | ۲ خطا         | 15s           |

`degradationThreshold` تعیین میکند ارائهدهنده چه زمانی وارد `DEGRADED` شود؛ `failureThreshold` تعیین میکند چه زمانی باز شود و رد شود. پروفایلهای ارائهدهندهٔ محلی هنوز در صفحهٔ تنظیمات Resilience در دسترس نیستند.

**کدهای فعالسازی (trip):** فقط وضعیتهای سطح ارائهدهنده `[408, 500, 502, 503, 504]`. برای خطاهای سطح حساب فعال **نمیشود** (بیشتر 401/403/429 — آنها مربوط به کولداون یا قفلشدن (lockout) هستند).

**بازیابی تنبل (lazy):** وقتی `OPEN` منقضی میشود، `getStatus()`، `canExecute()`، `getRetryAfterMs()` وضعیت را به `HALF_OPEN` تازهسازی میکنند. همین خواندنها (و خطای بعدی) یک `DEGRADED` کهنه را به `CLOSED` بازمیگردانند. نیازی به تایمر پسزمینه نیست.

---

### کولداون سراسری اختیاری ارائهدهنده (دروازهٔ پنجره)

یک لایهٔ چهارم **اختیاری** (`PROVIDER_COOLDOWN_ENABLED`، پیشفرض **خاموش**) حافظهای بیندرخواستی از ارائهدهندگانِ خطاکار را در `open-sse/services/providerCooldownTracker.ts` نگه میدارد که هنگام تعیین مقصد combo به آن مراجعه میشود تا درخواستهای combo متوالی دیگر ارائهدهندهای را که هماکنون خطا داده است دوباره مرور نکنند. ورودیهای سطح ارائهدهنده از دروازهٔ پنجرهٔ `PROVIDER_PROFILES` پیروی میکنند:

| پروفایل  | فعالسازی پس از (`providerFailureThreshold`) | در بازهٔ (`providerFailureWindowMs`) | مدت کولداون (`providerCooldownMs`) |
| -------- | ------------------------------------------: | -----------------------------------: | ---------------------------------: |
| OAuth    |                                        `10` |                              `15min` |                             `5min` |
| کلید API |                                        `15` |                              `30min` |                            `10min` |

پایینتر از آستانه، ارائهدهنده در حال کولداون محسوب **نمیشود**؛ یک موفقیت پنجره را پاک میکند. ورودیهای سطح اتصال (`provider:connectionId`) در عوض همان عقبنشینی نمایی `minRetryCooldownMs → maxRetryCooldownMs` را حفظ میکنند. موارد بازنویسی: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. محافظ رگرسیون: `tests/unit/provider-cooldown-window-gate.test.ts`.

## ۲. کولداون اتصال (Connection Cooldown)

**دامنه:** یک اتصال/حساب/کلید منفردِ provider.

**هدف:** رد کردن یک کلید معیوب در حالی که اتصالهای دیگر همان provider به سرویسدهی ادامه میدهند.

**پیادهسازی:**

- علامتگذاری بهعنوان unavailable: `src/sse/services/auth.ts::markAccountUnavailable()`
- انتخاب: `getProviderCredentials*` در همان فایل
- محاسبهٔ کولداون: `open-sse/services/accountFallback.ts::checkFallbackError()`
- تنظیمات: `src/lib/resilience/settings.ts`

**فیلدهای هر اتصال:**

- `rateLimitedUntil` — مهر زمانیِ پایان کولداون
- `testStatus: "unavailable"`
- `lastError`، `lastErrorType`، `errorCode`
- `backoffLevel` — شمارندهٔ backoff نمایی

**کولداونهای پیشفرض:**

- پایهٔ OAuth: ‏5 ثانیه
- پایهٔ API-key: ‏3 ثانیه
- ‏API-key با 429: ترجیح با هدرهای `Retry-After`/reset بالادست یا متن reset قابلپارس است
- Backoff: ‏`baseCooldownMs * 2 ** failureIndex`

**محافظ anti-thundering-herd:** جلوگیری میکند از اینکه خرابیهای همزمان کولداون را بیش از حد طولانی کنند یا `backoffLevel` را دو بار افزایش دهند.

**خطاهای 429 مربوط به محدودیت همزمانی در نردبان backoff بالا نمیروند.** یک `429` که بدنهاش
محدودیت همزمانی را گزارش میدهد ("too many concurrent requests"، "concurrency limit"، "parallel request
limit"، GLM `并发数过高`) یعنی حساب سالم اما مشغول است.
تابع `checkFallbackError()` دلیل `concurrency_limited` را برمیگرداند: همین حالا به اتصال بعدی
failover کنید، این اتصال را برای مدت ثابت `CONCURRENCY_LIMIT_COOLDOWN_MS` (‏1 ثانیه) یا بر اساس
راهنمای retry بالادست سرد کنید، `backoffLevel` را بدون تغییر نگه دارید و `skipProviderBreaker` را تنظیم کنید.
بدنهٔ صریح مربوط به سهمیه همچنان اولویت دارد، پس بدنهای که با الگوی سهمیه هم مطابقت داشته باشد، حکم
سهمیه باقی میماند. تشخیص: `looksLikeConcurrencyLimit()` در `src/shared/utils/classify429.ts`؛
حکم: `open-sse/services/accountFallback/concurrencyLimit429.ts`. تابع `classify429()` (یعنی
`FailureKind` مربوط به breaker) تغییر نکرده و برای این بدنهها همچنان `rate_limit` برمیگرداند.

**توقفهای محتوای استریم، حساب را سرد نمیکنند.** وقتی نگهبان توقف محتوا
(`open-sse/utils/streamHandler.ts`) از استریمی که بهموقع هیچ خروجی مدلی نفرستاده دست میکشد،
`markAccountUnavailable()` خطا را روی اتصال ثبت میکند اما هیچ کولداونی
تنظیم نمیکند: توقف متعلق به همان درخواست است و بیشتر اوقات یک نوبت استدلال طولانی است که
هنوز خروجیای نداشته است. اپراتورها میتوانند با `resilienceSettings.streamStallCooldown.enabled`
(پیشفرض `false`) دوباره آن را فعال کنند.

**فریمهای استدلال، بودجهٔ توقف محتوا را از نو شروع میکنند.** یک مدل استدلالی میتواند پیش از
اولین توکن قابلمشاهدهاش دقیقهها فکر کند: Claude فریمهای `thinking_delta` را استریم میکند که
متن استدلالشان ممکن است خالی باشد، و Responses API یک آیتم استدلال پشت سر
دیگری را استریم میکند. تابع `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) این
فریمها را تشخیص میدهد و نگهبان بودجهاش را با هر یک از سر میگیرد بهجای اینکه
نوبت را لغو کند. این فریمها هنوز خروجی مدل محسوب نمیشوند، پس نوبتی که فقط با استدلال تمام شود
همچنان خالی گزارش میشود، و نوبتی که استدلال را متوقف کند و فقط heartbeat بفرستد همچنان
نگهبان را فعال میکند.

فریمهای باینری `reasoningContentEvent` در Kiro که امضای غیرخالی دارند، این فعالیت استدلال را
از میان executor بهصورت یک دلتای `reasoning_content` خالی حفظ میکنند. امضا
فوروارد نمیشود. متادیتا، فریمهای ناقص و امضاهای خالی بودجهٔ محتوا را از سر نمیگیرند؛
timeout مستقل استریم فعال و لغو از سمت کلاینت همچنان اعمال میشوند
(`open-sse/executors/kiro/reasoning.ts`).

**وضعیتهای نهایی (نه کولداون):**

- `banned` — توسط تشخیص کلیدواژهٔ ممنوعه / بن حساب تنظیم میشود (به [BAN_DETECTION](../security/BAN_DETECTION.md) مراجعه کنید)، و همچنین توسط سه ردّ متوالیِ درخواست از سوی بالادست (`request_rejected`، مثلاً خطای 403 «Request not allowed» در Anthropic OAuth — `open-sse/services/requestRejectedStreak.ts`)؛ یک ردّ تکی فقط اتصال را سرد میکند
- `expired` (پس از تلاشهای مجددِ محدود — `EXPIRED_RETRY_MAX = 3` با backoff نمایی — به وضعیت نهایی تبدیل میشود تا خطاهای گذرای OAuth فرصت خودترمیمی داشته باشند پیش از آنکه حساب برای همیشه غیرفعال شود)
- `credits_exhausted`

این وضعیتها تا وقتی credentials تغییر کنند یا اپراتور آنها را بازنشانی کند باقی میمانند. وضعیتهای نهایی را با وضعیت کولداون گذرا بازنویسی نکنید.

**بازیابی تنبل (Lazy recovery):** وقتی `rateLimitedUntil` گذشت، اتصال دوباره واجد شرایط میشود. پس از استفادهٔ موفق، `clearAccountError()` همهٔ فیلدهای خطا را پاک میکند.

### دیوار مصرف Claude OAuth: خط اولویتپایینتر + بازنشانی محدودیت نشست

**دامنه:** یک اتصال اشتراک Claude ‏(OAuth). هر دو قابلیت **opt-in و بهازای هر
اتصال** هستند (ویرایش اتصال → بخش Claude → `lowPriorityMode` / `autoLimitReset` در
`providerSpecificData`، هر دو بهصورت پیشفرض خاموش) و معادل دستورهای `/low-priority` و
`/limit-reset` در Claude Code هستند (قرارداد wire از Claude Code 2.1.263 استخراج شده است).

**پیادهسازی:**

- ماشین حالت + دستهبندی پاسخ: `open-sse/services/claudeLowPriority.ts`
- کلاینت وضعیت/ادعای بازنشانی: `open-sse/services/claudeLimitReset.ts`
- قلاب executor (تزریق هدر + تلاش مجدد با همان حساب): `open-sse/executors/base.ts::execute()`
- پایداری opt-in: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**محرک:** دیوار مصرف ۵ ساعته — یک `429` که هدرهایش
`anthropic-ratelimit-unified-status: rejected` را حمل میکنند و، وقتی حساب واجد شرایط است،
`anthropic-ratelimit-unified-slow-offer: treatment`. پیش از آن اولین 429 دیوار، هیچ چیزی ارسال
نمیشود؛ یک 429 آنی بدون هدرهای unified از مسیر کولداون عادی عبور میکند.

**خط اولویتپایینتر** (`lowPriorityMode`):

- در دیوار 429، مجری پیشنهاد را میپذیرد و بلافاصله **همان** حساب را با `anthropic-usage-limit: slow` دوباره تلاش میکند؛ مسیر تا زمان `anthropic-ratelimit-unified-reset` اعلامشده (+۶۰ ثانیه مهلت اضافی) فعال میماند و هر درخواستی در آن بازه این هدر را همراه دارد. خطای 429 رهگیریشده هرگز به `handleChatCore` نمیرسد، بنابراین اتصال وارد کولداون **نمیشود** و از چرخه خارج نمیشود.
- `anthropic-ratelimit-unified-slow-status` در پاسخهای بعدی: `active` / `not_needed` مسیر را حفظ میکند؛ `slot_busy` (429) یا یک `529` به اندازهٔ `anthropic-ratelimit-unified-slow-retry-after` سرور (پیشفرض ۲۰ ثانیه، محدود به بازهٔ ۵–۶۰۰ ثانیه، با جیتر ±۳۰٪) صبر میکند و دوباره تلاش میکند، که این انتظار توسط `anthropic-ratelimit-unified-slow-max-wait` (پیشفرض ۲۰ دقیقه، محدود به بازهٔ ۱ دقیقه تا ۶ ساعت) کراندار است — پس از آن مسیر پایان مییابد و یک دورهٔ سرد شدن ۱۰ دقیقهای جلوی پذیرش مجدد را میگیرد. این انتظار علاوه بر این، توسط زمان باقیمانده از مهلت شروع آپاستریم خودِ درخواست (`resolveFetchStartTimeout`، بهطور پیشفرض ۱۰ دقیقه) منهای ۵ ثانیه حاشیهٔ امن سقف میخورد: بدون آن سقف، حداکثر انتظار پیشفرض ۲۰ دقیقهای از عمر درخواست فراتر میرفت و خواب در میانهٔ انتظار لغو میشد، که بهجای پایان نرم `max_wait` + دورهٔ سرد شدن، یک `TimeoutError` نمایان میکرد.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`، یک گردش پنجرهٔ ۵ ساعته، یا `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (که آن را در هر وضعیتی بهعنوان `extra_usage` پایان میدهد، چون اکنون اضافهمصرف پولی دیوار را پوشش میدهد) مسیر را پایان میدهند؛ سپس پاسخ وارد مسیر عادی کولداون میشود. `budget_exhausted` تا زمان بازنشانی اعلامشدهٔ بودجه (≤ ۸ روز) به خاطر سپرده میشود.
- بررسی دیوار پس از تلاشهای مجدد درونتلاشیِ مبتنی بر 400 خودِ مجری اجرا میشود (context editing، thinking/effort clamps، param auto-learn)، بنابراین یک دیوار 429 که فقط در یکی از آن تلاشهای مجدد ظاهر میشود همچنان رهگیری میشود، بهجای اینکه به مسیر کولداون برسد.
- وضعیت بهصورت درونحافظهای و بهازای هر اتصال نگهداری میشود (یک راهاندازی مجدد، هزینهاش یک دیوار 429 اضافی برای پذیرش دوباره است).

**بازنشانی محدودیت نشست** (`autoLimitReset`، که وقتی هر دو روشن هستند پیش از مسیر امتحان میشود):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → بلوک `juniper_tide`؛ وقتی `arm: "reset"` و `available: true` باشد، `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` با `{ "program": "juniper_tide" }` (شناسهٔ UUID سازمان از `providerSpecificData.organizationUUID`، با fallback به bootstrap).
- `result: reset|not_limited` → درخواست با سرعت کامل دوباره تلاش میشود (بدون هدر slow). `already_used` / `not_offered` مقدار `next_available_at` را به خاطر میسپارند (پیشفرض یک هفته)؛ هر خطایی ۱۵ دقیقه عقبنشینی (backoff) میکند. بازنشانی هفتهای یکبار است و همچنان در محدودیت هفتگی حساب میشود.

نگهبانهای رگرسیون: `tests/unit/claude-low-priority-mode.test.ts`،
`tests/unit/claude-limit-reset.test.ts`، `tests/unit/claude-low-priority-executor.test.ts`.

### قرابت نشست (#7274)

**محدوده:** یک نشست کلاینت (هدر `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) که به یک اتصال پین میشود، برای **هر** ارائهدهنده.

**هدف:** نگهداشتن یک ایجنت چندنوبتی (Claude Code، aider، ایجنتهای سفارشی) روی همان حساب در طول درخواستها، برای کاهش از دست رفتن کانتکست بین حسابها و تکرار خطاهای 429 شروع سرد در ارائهدهندگانی که وضعیت نشست بهازای هر حساب دارند.

**پیادهسازی:**

- تعیین TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- انتخاب/ایجاد پین: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- استخراج هدر (عمومی، برای هر ارائهدهنده): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- جدول ماندگار پینها: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- تنظیم: `sessionAffinityTtlMs` (TTL سراسری بر حسب میلیثانیه، `0` آن را غیرفعال میکند) — `src/lib/db/settings.ts`. این نام با مهاجرت `124_generic_session_affinity_ttl.sql` از `codexSessionAffinityTtlMs` مخصوص Codex تغییر کرده است؛ مهاجرتی که هر TTL قبلاً پیکربندیشدهٔ Codex را بهعنوان پیشفرض جدید منتقل میکند.

پیش از #7274، تابع `resolveSessionAffinityTtlMs()` برای هر ارائهدهنده بهجز `codex` بهطور مستقیم با `0` خارج میشد، بنابراین تنظیم TTL (و هدرهای نشست) هیچ اثری در جای دیگری نداشت، حتی با اینکه مکانیزم پینکردن و استخراج هدر از قبل مستقل از ارائهدهنده بودند. این اصلاح، آن بازگشت زودهنگام را حذف کرد؛ اکنون TTL بهمحض اینکه بهصورت سراسری بالای `0` تنظیم شود، بهطور یکنواخت برای هر ارائهدهنده اعمال میشود.

هر سه هدر قرابت نشست هرگز به آپاستریم فوروارد نمیشوند — مجریان هدرهای آپاستریم خود را از ابتدا میسازند بهجای اینکه هدرهای کلاینت را عبور دهند، بنابراین این صرفاً یک شناسهٔ همبستگی داخلی باقی میماند.

### اجارههای انحصاری اتصال نشست مدیریتشده

**محدوده:** یک کلاینت/نشست HTTP مدیریتشدهٔ فعال، مالک یک اتصال واجد شرایط OmniRoute است.

**هدف:** فراهمکردن مالکیت انحصاری و ماندگار اتصال برای کلاینتهایی که به یک حصار سخت مسیریابی در طول درخواستها نیاز دارند. این با قرابت نشست متفاوت است که صرفاً یک ترجیح نرم برای تداوم است: یک اجارهٔ انحصاری وضعیت چرخهٔ حیات را در SQLite ماندگار میکند، یکتایی مالکِ فعال و اتصالِ فعال را در سطح سراسری اعمال میکند، و یک نسل کهنه را پیش از توزیع به ارائهدهنده رد میکند.

این قابلیت برای هر کلید API بهصورت opt-in (اختیاری) است. یک کلید مدیریتشده باید اسکوپ `lease:exclusive` و یک فهرست `allowedConnections` صریح و غیرخالی داشته باشد. هر کلاینت HTTP میتواند از اندپوینت چرخهٔ حیات استفاده کند؛ هیچ نام کلاینت، user-agent، ارائهدهنده، روش OAuth یا مدلی الزامی نیست. اجاره مالک یک اتصال است، نه یک مدل، بنابراین تغییر مدل پیوند را حفظ میکند، تا زمانی که اتصال همچنان بهطور معمول واجد شرایط بماند. قواعد معمول مدل، سهمیه، سلامت، کولداون و لیست سفید همچنان مرجع نهایی هستند و ممکن است همان نسل را به یک اتصال آزادِ واجد شرایط دیگر منتقل کنند.

چرخهٔ حیات عبارت است از `POST /api/v1/session-leases` با اقدامهای JSON یعنی `acquire`، `renew` و `release`.
درخواستهای استنتاج مدیریتشده مقدار غیرشفاف `X-OmniRoute-Lease-Owner` و مقدار دقیق
`X-OmniRoute-Lease-Generation` را ارائه میدهند. مالک از `vlo_` و پس از آن ۴۳ نویسهٔ base64url استفاده میکند؛ تنها
هش SHA-256 آن ذخیره میشود. هر حصار اعزام نهایی همچنین شناسهٔ کلید API احرازهویتشده و
شناسهٔ اتصال فعال را نیز پیوند میزند. سرایندهای کنترل اجاره از لاگها، اسنپشاتهای نگهداریشدهٔ درخواست و
سرایندهای اجراکنندهٔ بالادست حذف میشوند.

اگر مسیریابی معمولی کاندیدهای مدیریتشدهٔ واجد شرایط داشته باشد اما همهٔ کاندیدهای آزاد توسط یک
اجارهٔ فعال خارجی اشغال شده باشند، OmniRoute پاسخ HTTP `429`، کد عدم دسترسبودن ظرفیت اجاره،
وضعیت در انتظار ظرفیت و یک `Retry-After` کراندار مشتقشده از زودترین انقضای مرتبط را برمیگرداند.
واجدشرایطبودن خالیِ معمولی، رقابت بر سر اجاره محسوب نمیشود و معناشناسی خطای مسیریابی موجود خود را حفظ میکند.

سازوکارهای مرتبط همچنان مجزا باقی میمانند:

- اشغال جلسهٔ OAuth، توزیع نرم محلی در سطح فرایند برای حسابهای OAuth است.
- سمافورهای حساب، مجوزهای همزمانی درخواست را اعطا میکنند و با تکمیل درخواست پایان مییابند.
- اجارههای انحصاری جلسهٔ مدیریتشده، مالکیت پایدار چرخهٔ حیات با یک حصار نسل هستند.

---

## 3. قفل مدل (Model Lockout)

**دامنه:** سهتایی provider + connection + model.

**دامنه کلید بر اساس وضعیت:** وضعیت ناموفق تعیین میکند که قفل به کدام کلید نوشته میشود (`resolveLockoutScope()` در `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — سیگنال سهمیه یا حق دسترسی — **خانواده سهمیه** قفل میشود:
  برای codex کل دامنه `codex` / `spark` (هر مدل `gpt-5*` متعلق به آن
  connection)، و برای سایر ارائهدهندگان `getQuotaScopedModelForProvider()`.
- `404` خود مدل را قفل میکند (`getModelLockKey()` حالت `not_found` را محدود میکند).
- هر وضعیت دیگر — خطاهای انتقال/سرور `5xx` و `502` مصنوعیِ خود OmniRoute که از
  اعتبارسنجی کیفیت تولید میشود — فقط تاپل **دقیق**
  provider/connection/model را قفل میکند. یک استریم معیوب روی یک مدل، مدرکی درباره
  سهمیه حساب نیست؛ پیش از این قاعده، یک پاسخ خالی روی
  `codex/gpt-5.6-luna` تمام مدلهای `gpt-5*` آن connection را
  برای 2 تا 30 دقیقه (بهصورت تصاعدی) از مسیریابی خارج میکرد، در حالی که سهمیهاش دستنخورده بود.
- گزینه صریح `scope` از سوی فراخواننده همیشه اولویت دارد (Antigravity مقدار `"exact"` را ارسال میکند).

**هدف:** جلوگیری از غیرفعال شدن کل یک connection وقتی فقط یک مدل در دسترس نیست یا محدودیت سهمیه دارد.

**مثالها:**

- ارائهدهندگانی با سهمیه per-model که 429 برمیگردانند
- ارائهدهندگان محلی که برای یک مدل گمشده 404 برمیگردانند
- خطاهای مجوز حالت/مدل مختص یک ارائهدهنده (مثلاً حالتهای Grok)

**پیادهسازی:** `open-sse/services/accountFallback.ts` — `lockModel()`، `clearModelLock()`، `getAllModelLockouts()`.

### داشبورد Model Cooldowns (v3.8.0)

رابط کاربری: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

قفلهای فعال را همراه با این موارد فهرست میکند: provider، connection، model، reason، expiresAt. اپراتورها میتوانند از روی همین کارت، یک مدل را بهصورت دستی دوباره فعال کنند.

**REST API:**

- `GET /api/resilience/model-cooldowns` — فهرست کردن قفلهای فعال
- `DELETE /api/resilience/model-cooldowns` — فعالسازی مجدد دستی. بدنه: `{provider, connection, model}`. احراز هویت: management.

### مدیریت Cooldown (Cooldown Manager)

رابط کاربری: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

یک صفحه واحد برای همه connectionهایی که به دلیلی گذرا از مسیریابی خارج شدهاند، بهجای
باز کردن صفحه هر ارائهدهنده. این صفحه کولداونهای connection، قفلهای مدل و وضعیتهای نهایی
را فهرست میکند، آنها را برای هر connection، برای یک مجموعه انتخابشده، یا برای همه
connectionهای یک ارائهدهنده پاک میکند، و پرتنظیمترین قواعد کولداون را ویرایش میکند:
`streamStallCooldown.enabled` و کولداون پایه `connectionCooldown` برای OAuth / API-key
و حداکثر گامهای backoff (که از طریق
`PATCH /api/resilience` ذخیره میشوند). وضعیتهای نهایی (`banned`، `expired`، `credits_exhausted`)
فهرست میشوند اما هرگز در اینجا پاک نمیشوند.

**REST API** (`src/lib/resilience/cooldownManager.ts`، احراز هویت: management):

- `GET /api/resilience/cooldowns[?provider=]` — connectionها همراه با وضعیت، کولداون باقیمانده،
  سطح backoff، نوع آخرین خطا و قفلهای مدل (بدون اطلاعات احراز هویت)
- `POST /api/resilience/cooldowns` — بدنه `{connectionIds: string[]}` یا
  `{all: true, provider?}`؛ بازمیگرداند `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### رابط کاربری تنظیمات قفل + بازیابی success-decay (v3.8.23)

قفل مدل از یک رفتار همیشهفعالِ هاردکدشده به یک قابلیت کاملاً قابل پیکربندی و
اختیاری (opt-in) تبدیل شد که کارت تنظیمات مخصوص خود و یک مسیر بازیابی خودترمیمگر دارد.

**کارت تنظیمات:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
این کارت **متفاوت** از `ModelCooldownsCard` فقطخواندنی بالا است (که فقط قفلهای
فعال را _فهرست_ میکند) — کارت جدید _پارامترها را پیکربندی میکند_. مقادیر پیشفرض
در `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) قرار دارند:

| تنظیم                   | پیشفرض                           | معنی                                                          |
| ----------------------- | -------------------------------- | ------------------------------------------------------------- |
| `enabled`               | `false`                          | کلید اصلی — قفل مدل **بهصورت پیشفرض خاموش است**.              |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | وضعیتهای آپاستریم که بهعنوان خطای در سطح مدل محسوب میشوند.    |
| `baseCooldownMs`        | `120_000` (120 s)                | مدت قفل اولیه برای نخستین خطا.                                |
| `maxCooldownMs`         | `1_800_000` (30 min)             | سقف کولداون تصعیدشده.                                         |
| `maxBackoffSteps`       | `10`                             | حداکثر گامهای تصعید backoff نمایی.                            |
| `useExponentialBackoff` | `true`                           | اینکه آیا خطاهای تکراری کولداون را بهصورت نمایی تصعید میکنند. |

تنظیمات از طریق ذخیرهساز عادی تنظیمات ماندگار میشوند و از طریق
اسکیمای تنظیمات resilience اعتبارسنجی میشوند؛ کارت مقادیر `baseCooldownMs`/`maxCooldownMs`
(با شرط `maxCooldownMs ≥ baseCooldownMs`) و `maxBackoffSteps` را محدود (clamp) میکند.

**بازیابی success-decay:** بازیابی صرفاً انقضای تایمر **نیست**. یک پاسخ
سالم، شمارش خطای مدل را به تدریج پایین میآورد، بنابراین مدلی که در میانه پنجره
بهبود یافته، پیش از سررسید تایمر از تصعید میایستد (و آزاد میشود). هنگام موفقیت
یک هدف combo، فایل `open-sse/services/combo.ts` تابع `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) را فرا میخواند که `failureCount`
ذخیرهشده را **نصف** میکند (`Math.floor(failureCount / 2)`)؛ وقتی به `0` برسد،
ورودی قفل بهطور کامل حذف میشود. تابع متقابل `recordModelLockoutFailure()`
هنگام خطاهایی درون پنجره تصعید، شمارش را افزایش میدهد (و کولداون را
تصعید میکند). این success-decay علاوه بر انقضای ساده تایمر است —
هر کدام از این دو مسیر میتواند یک مدل را دوباره فعال کند.

**وضعیت:** قفلها **در حافظه** نگهداری میشوند (`Map`های per-process از
`ModelLockoutEntry` با کلید `provider:connectionId:model`، و قفلهای با دامنه exact با
کلید `provider:connectionId:exact:model`) و در پایگاه داده
ماندگار نمیشوند — با راهاندازی مجدد از دست میروند. _تنظیمات_ ماندگار میشوند؛
_وضعیت_ فعالِ قفلها زودگذر است.

---

## 4. کنترل همروندی سهمیهاشتراکی (v3.8.36)

حسابهای اشتراکی (GLM، MiniMax و غیره) اغلب تنها حدود ~1–3 درخواست همزمان را میپذیرند؛ عبور از این حد موجب خطاهای 429 و cooldown میشود. این مسئله در کامبوهای **سهمیهاشتراکی** (`qtSd/…`) حادتر است، جایی که چند کلید API یک حساب بالادستی را به اشتراک میگذارند. سه لایه جلوی سیلآسا شدن یک حساب اشتراکی را میگیرند.

### سقف همروندی هر اتصال (`max_concurrent`)

هر اتصال ارائهدهنده میتواند یک سقف `max_concurrent` اعلام کند
(`provider_connections.max_concurrent`، که در مودال اتصال / API / DB تنظیم میشود).
برای نداشتن محدودیت، آن را خالی بگذارید. این تنها دستگیرهای است که لایه
سریالیسازی زیر را هدایت میکند — آن را برابر همروندی واقعی حساب تنظیم کنید
(مثلاً GLM حدود ~1، MiniMax حدود ~2).

### سقفهای همروندی هر مدل (`modelConcurrency`)

یک اتصال علاوه بر این میتواند سقفهای دقیق همروندی برای هر مدل را درون
نگاشت `rateLimitOverrides` خود اعلام کند:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

آن را در مودال اتصال تنظیم کنید (**بازنویسیهای محدودیت نرخ → سقفهای همروندی
هر مدل**، در هر خط یک `model=cap`) یا از طریق
`PATCH /api/providers/[id]` با همان ساختار JSON. معناشناسی کلیدها:

- **در سطح اتصال در برابر مختص مدل:** `maxConcurrent` همچنان سقف مشترک
  در سطح کل اتصال است. وقتی هر دو اعمال میشوند، هر دو دروازه
  بهصورت اتمی در همان دروازه ترکیبی گرفته میشوند
  (`global → provider → account → model`)؛ رفتار مؤثر، همان
  محدودیت سختگیرانهترِ قابلاعمال است.
- **تطابق دقیق کلید مدل:** کلید، همان رشته مدلی است که پس از تعیین مسیر
  به اجراکننده داده میشود — معمولاً شناسه خالص مدل بالادستی
  (`glm-5`)، نه نام مستعار `provider/model` در سمت کلاینت (`zai/glm-5`
  با `glm-5` تطابق ندارد). مقادیر، سقفهای عدد صحیح مثبت برای
  درخواستهای همزمان هستند.
- **صف محلی، بدون کشف خودکار:** درخواستهای مازاد بهصورت محلی و با
  همان معناشناسی صف/مهلت موجود در صف میمانند (خطاهای پذیرش تایپدار
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL`). OmniRoute سیاست بالادستی را
  کشف یا استنباط نمیکند — دقیقاً همان سقفهایی را اعمال میکند که
  اپراتور پیکربندی کرده است. یک دروازه مدل اشباعشده هرگز ارائهدهنده را
  غیرفعال نمیکند و هرگز قفل دائمی مدل ایجاد نمیکند؛ رفتار
  429/cooldown/fallback بالادستی همچنان پشتیبان خطا باقی میماند.
- **دامنه هر اتصال و هر فرایند:** سقفها برای هر اتصال دیتابیس
  است و در حافظه نگه داری میشود، بنابراین دو اتصالی که از یک کلید API
  بالادستی یکسان استفاده میکنند، با یکدیگر هماهنگ نمیشوند.
- **پیکربندینشده یعنی بدون تغییر:** حذف نگاشت (یا خالی گذاشتن
  فیلد داشبورد) هیچ دروازه مدلی اضافه نمیکند. نمونه پیکربندی بدون
  ادعای هیچ محدودیت سراسری ارائهدهنده:

```text
glm-5=1
glm-4.7=3
```

### سریالیسازی درخواستهای سهمیهاشتراکی

وقتی یک دیسپچ سهمیهاشتراکی اتصالی را هدف میگیرد که `max_concurrent`
مثبت اعلام کرده است، درخواستهای همزمان به آن **حساب** از طریق یک
سمافور هر اتصال (کلید `qsconn:<connectionId>`) سریالی میشوند: درخواستهای
مازاد بهجای سیلآسا کردن حساب، **در صف منتظر میمانند**. این مکانیزم
**fail-open** است — صف اشباعشده یا timeout بهجای اینکه هرگز درخواست
قابلدیسپچ را رد کند، بدون گرفتن slot ادامه میدهد. فعال/غیرفعالسازی در
**تنظیمات → تابآوری → همروندی هر اتصال
سهمیهاشتراکی** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`،
بهصورت پیشفرض روشن). بدون سقف `max_concurrent` رفتار تغییری نمیکند.

> دروازه مسیریابی سهمیهاشتراکی (`selectQuotaShareTarget`، DRR + P2C) خودش
> fail-open است و یک اتصال پرشده را فقط _کماولویت_ میکند — با یک
> استخر تکاتصالی نمیتواند محدودیت سخت اعمال کند، بنابراین این سمافور است که
> عملاً جلوی سیل را میگیرد.

### تلاش مجدد آگاه از cooldown در کامبو

برای هر استراتژی کامبو (وقتی فعال باشد)، درخواستی که قرار است بهخاطر یک
cooldown گذرای کوتاه به خطای 429 تبدیل شود، مدت آن را صبر میکند و بهجای
برگرداندن 429 دوباره دیسپچ میشود — این حالت پنجرههای TPM/RPM از جنس
Gemini (حدود ~60 ثانیه retry-after) را در کامبوهای چندمدله پوشش میدهد،
مثلاً وقتی هر دو هدف یک کامبوی دومدله به محدودیت نرخ هر مدل برمیخورند.
محدودشده توسط `comboCooldownWait` (`enabled`، `maxWaitMs`، `maxAttempts`،
`budgetMs`) در **تنظیمات → تابآوری**. هرگز روی `quota_exhausted`
(قفل تا نیمهشب) یا دلایل auth/not-found صبر نمیکند.

همین دروازه حالت پیش از دیسپچ (#16319) را هم پوشش میدهد: وقتی همه اهداف
یک کامبو پیش از هر تلاشی رد میشوند چون مدلشان در یک قفل گذرای کوتاه
قرار دارد، مسیر صفر-تلاش با همان سقفها مدت قفل را صبر میکند و دوباره
دیسپچ میکند، بهجای اینکه با `503 ALL_TARGETS_SKIPPED` بدون سرنخ پاسخ
دهد. وقتی هیچ صبری مجاز نباشد (سقف، تعداد تلاش یا بودجه تمام شده، یا
قابلیت خاموش است)، پاسخ نهایی به `429 rate_limit_error` ارتقا مییابد که
`retry_after` / `reset_at` را از نزدیکترین انقضای قفل گذرا حمل میکند؛
قفلهای quota، auth و not-found همان 503 بدون سرنخ را حفظ میکنند.

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

## 5. کنترل پذیرش صف درخواست (v3.8.49 · issue #6593)

**دامنه**: صف محدودکردن نرخ محلیِ بهازای هر ارائهدهنده+اتصال (`open-sse/services/rateLimitManager.ts`، که توسط Bottleneck پشتیبانی میشود)، یک لایه پایینتر از سه مکانیزم بالا.

**`maxWaitMs` انتظار در صف را محدود میکند؛ `executionMaxWaitMs` اجرا را محدود میکند.**
این دو عمداً از یکدیگر جدا هستند و هیچکدام به دیگری تغذیه نمیشود.

`resilienceSettings.requestQueue.maxWaitMs` **بودجهٔ انتظار در صف** است: شامل
انتظار برای یک اسلات ارائهدهنده و سپس نشستن در وضعیت QUEUED میشود، و تایمر آن
همان لحظهای که کار از QUEUED خارج و اجرایش آغاز میشود پاک میشود
(`rateLimitManager.ts`، `wrappedFn`). درخواستی که از آن فراتر رود هرگز به
upstream نمیرسد. مقدار پیشفرض 30000ms است که توسط `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
در `src/lib/resilience/settings.ts` تأمین و توسط
`tests/unit/ratelimit-admission-control-6593.test.ts` پین شده است، بنابراین تغییر آن
آن تست را قرمز میکند بهجای اینکه این پاراگراف بیصدا کهنه بماند.

`resilienceSettings.requestQueue.executionMaxWaitMs` همان چیزی است که Bottleneck
بهعنوان `expiration` کار دریافت میکند، که تایمرش تنها پس از dispatch شروع میشود.
این یک سپر پشتیبان برای executorهایی است که timeout مخصوص خود برای upstream ندارند،
و وقتی timeout شروعِ fetch خودِ executor طولانیتر باشد به همان مقدار افزایش مییابد،
بنابراین نمیتواند یک پاسخ سالمِ در حال انتقال را قطع کند. مقدار پیشفرض 600000ms (۱۰ دقیقه).

تغذیهٔ بودجهٔ صف به درون `expiration` همان چیزی بود که قبلاً gatewayهای غیرافزایشی
را در میانهٔ راه میکشت — آنها بهطور قانونی پیش از نخستین بایتها دقایقی اجرا
میشوند — و به همین دلیل است که یک expiration با `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ظاهر میشود در حالی که بودجهٔ صف کد
queue-timeout را حمل میکند. هر یک را میتوان از طریق `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (متغیر محیطی) یا داشبورد
(**Settings → Resilience**) بازنویسی کرد. هر دو هنگام نرمالسازی به بازهٔ 1ms تا
۲۴ ساعت clamp میشوند.

**تقدم، برای هر دو:** متغیر محیطی فقط _پیشفرض_ را تأمین میکند. مقداری که در
`resilienceSettings.requestQueue` پایدار شده است (داشبورد / API patch، ذخیرهشده
در `key_value`) بر آن غلبه میکند، و `rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` بهازای هر اتصال بر آن غلبه میکند. بنابراین تنظیم متغیر
محیطی روی استقراری که از قبل مقدار پایداری دارد هیچ چیزی را تغییر نمیدهد —
بهجای آن، تنظیم پایدار را پاک یا بهروزرسانی کنید.

مدت اقامت در صف توسط `maxWaitMs` محدود میشود؛ `maxQueueDepth` در ادامه محدود
میکند چه تعداد فراخواننده میتوانند همزمان در صف باشند.

**تلاشهای مجدد اعلامشده در بدنه: pacing در برابر lockout.** بدنهٔ یک 429 میتواند
زمان انتظار خودش را اعلام کند (`RetryInfo.retryDelay` در Gemini، متن "retry after Ns")،
که `updateFromResponseBody` آن را میخواند. انتظاری که در `maxWaitMs` اتصال جا شود
pacing است: محدودکننده مخزنش را برای همان مدت خالی میکند و فراخوانهای
صفگرفته وقتی دوباره پر شد dispatch میشوند. انتظاری طولانیتر از `maxWaitMs`
چیزی نیست که صف بتواند تا پایانش بنشیند — Gemini به سهمیهٔ روزانهٔ تمامشده با
`retryDelay: "86399s"` پاسخ میدهد. `Retry-After` بازارسالشده روی 429 بازسازیشده
(#16528) از هماکنون باعث میشود موتور fallback مدل را برای آن پنجره قفل کند،
اما مکثکردن محدودکننده برای آن نیز همچنان هر فراخوانی را که زودتر به کلید برسد
(مثلاً پس از یک بازنشانی resilience) برای تمام `maxWaitMs` متوقف خواهد کرد. وقتی
چنین انتظاری از یک detail تایپدارِ `RetryInfo` گوگل (منشأ `google_rpc_retry_info`)
برسد و محدودکنندهٔ کلید از قبل در قلمروی مدل باشد (به `getLimiterKey` نگاه کنید)،
آن 429 در عوض به یک lockout مدل روی همان اتصال تبدیل میشود
(`lockModelForLongBodyRetry` در
`open-sse/services/rateLimitManager/bodyRetryPause.ts`، با سقف ۲۴ ساعت)، و
محدودکننده بدون مکث رها میشود. انتخاب حساب از طریق `isModelLocked()` بهخاطر آن
قفل رد میشود، و دروازهٔ پیش از dispatch کامبو نیز برای اهداف پینشده به اتصال
همینطور. در antigravity، که محدودکنندهاش بهازای هر خانوادهٔ سهمیه است، قفل روی
مدلِ دقیق است، مانند سایر قفلهای سهمیهایاش. نامی که کلاینت خواسته است نیز وقتی
یک alias آن را به آن مدل resolve کرده باشد قفل میشود، زیرا آن بررسیها از نام
درخواستشده استفاده میکنند؛ دقیقاً همان قفل میشود (`lockExactModel`)، بنابراین یک
alias که از یک خانوادهٔ سهمیهٔ antigravity یا یک قلمروی codex میگذرد هرگز نام
خودش را قفل نمیکند. یک سرنخ نثری، یک `retryDelay` بدون تایپ، یا محدودکنندهای که
کل اتصال در آن شریک است، مکث را حفظ میکند. وقتی محدودکنندهای که مسیر 429
همینحالا بازسازی کرده واقعاً مکث میکند، فراخوانندهای که زمانِ باقیماندهٔ صفش
پیش از پایان مکث تمام شود بلافاصله با کد queue-timeout (`checkLimiterPause`)
برگردانده میشود بهجای آنکه آن زمان را تا پایان صبر کند؛ پایانِ ثبتشده پیش از
ساختهشدن محدودکننده مهار میشود، همانجایی که Bottleneck ساعت تازهسازیاش را
شروع میکند، و هر تغییر بعدی در مخزن آن را فراموش میکند. پوشش دادهشده توسط
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` و
`tests/unit/rate-limit-body-retry-pause.test.ts`.

**`maxQueueDepth` — سقف پذیرش با فعالسازی صریح (جدید).** `resilienceSettings.requestQueue.maxQueueDepth`
محدود میکند چه تعداد درخواست میتوانند همزمان برای یک ارائهدهنده+اتصال در صف
بنشینند (هنوز dispatch نشدهاند). وقتی صف از قبل `maxQueueDepth` درخواست را در خود
دارد، درخواست جدید با یک خطای تایپدار `code: "RATE_LIMIT_QUEUE_FULL"` **پیش از**
آنکه اصلاً به `limiter.schedule()` برسد، بهسرعت رد میشود — بنابراین رد کردن
ارزان است و پیش از هر کار فشردهسازی پرامپت / ترجمهٔ پاییندست برای آن درخواست
رخ میدهد. پیشفرض `0` = غیرفعال، که رفتار موجودِ صفِ نامحدود را حفظ میکند؛
محدود به ۰ تا ۱۰۰۰۰۰. بازنویسی از طریق `RATE_LIMIT_MAX_QUEUE_DEPTH` (متغیر محیطی)
یا `resilienceSettings.requestQueue.maxQueueDepth` (داشبورد / API patch).

خودِ بررسی پذیرش یک تابع خالص است
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) بنابراین
بدون یک محدودکنندهٔ واقعی Bottleneck قابل تست واحد است.

> RFC که موجب باز شدن #6593 شد، همچنین فلگی با نام `bypassCompressionOnRateLimit`
> را پیشنهاد میکرد. پایپلاین `open-sse/services/compression/` در این مخزن،
> فشردهسازی پرامپت/کانتکست روی درخواست خروجی LLM است (`chatCore.ts`،
> حوالی بلاک `resolveCompressionSettings`/`selectCompressionStrategy`)،
> نه فشردهسازی پاسخ HTTP روی بدنههای 429 ساختگی — هیچ مسیر کد منطبقی
> برای یک فلگ bypass تحتاللفظی وجود ندارد. آن مرحلهٔ فشردهسازی پرامپت
> همچنین در حال حاضر _قبل_ از `withRateLimit()` در پایپلاین درخواست اجرا میشود،
> بنابراین تغییر ترتیب برای رد کردن آن هنگام رد شدن به دلیل پر بودن صف،
> تغییری جداگانه و بزرگتر از محدودهٔ این issue است؛ این کار عمداً در اینجا
> پیادهسازی **نشد** و در صورتی که صرفهجویی در CPU ارزش ریسک تغییر ترتیب را
> داشته باشد، بهعنوان کار بعدی باقی مانده است.

### شبکهٔ امنی فعالسازی خودکار محدودیت نرخ و محافظت از اتصال (`rateLimitProtection`)

**شبکهٔ امنی فعالسازی خودکار** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`، پیشفرض `true`):
بهطور پیشفرض، OmniRoute بهطور خودکار محافظت صف محدودیت نرخ را برای همهٔ اتصالهای فعال ارائهدهندهٔ کلید API (`getProviderCategory(provider) === "apikey"`) فعال میکند. این کار تضمین میکند که درخواستهای ورودی به کلیدهای API بالادستِ حساس به نرخ، بهجای منجر شدن به موجی از خطاهای 429 بالادستی، از طریق Bottleneck در صف قرار گرفته و مهار شوند. این شبکهٔ امنی را میتوان از طریق متغیر محیطی `RATE_LIMIT_AUTO_ENABLE` بازنویسی کرد (`false`/`0`/`off` آن را غیرفعال میکند، `true`/`1`/`on` آن را بهزور فعال میکند)، که بر تنظیم ذخیرهشدهٔ داشبورد (**تنظیمات ← تابآوری** / `PATCH /api/resilience`) اولویت دارد.

**معناشناسی `rateLimitProtection` در سطح هر اتصال:**
محافظت محدودیت نرخ در سطح هر اتصال از طریق فیلد بولی `rateLimitProtection` روی اتصالهای ارائهدهنده ردیابی میشود (در SQLite بهصورت `rate_limit_protection` ذخیره میشود):

- **فعالسازی صریح (`rateLimitProtection === true`)**: محافظت محدودیت نرخ بهصراحت برای این اتصال فعال است، صرفنظر از دستهٔ ارائهدهنده یا اینکه شبکهٔ امنی فعالسازی خودکار روشن باشد یا نه.
- **غیرفعالسازی صریح (`rateLimitProtection === false`)**: محافظت صریح را غیرفعال میکند، اما یک اتصال فعال کلید API را از شبکهٔ امنی سراسری فعالسازی خودکار خارج **نمیکند**. در `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`)، `false` و `undefined` معادل یکدیگر هستند: فقط `rateLimitProtection === true` بهعنوان بازنویسی صریح در نظر گرفته میشود. اگر `rateLimitProtection` برابر `false` باشد (یا تنظیم نشده باشد)، یک اتصال فعال کلید API همچنان با شرط فعالسازی خودکار منطبق است و تحت محافظت محدودیت نرخ باقی میماند.
- **عدم وجود امکان خروج در سطح هر اتصال**: یک اپراتور در حال حاضر نمیتواند بیان کند «این اتصال فعال کلید API بهتنهایی باید بدون محافظت صف محدودیت نرخ اجرا شود» و همزمان فعالسازی خودکار را برای بقیه فعال نگه دارد. برای اجرای کامل اتصالهای کلید API بدون صفهای محدودیت نرخ، شبکهٔ امنی باید بهصورت سراسری خاموش شود (`RATE_LIMIT_AUTO_ENABLE=false` یا `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**مسیرهای نوشتن پشتیبانیشده:**

- **`POST /api/rate-limits`**: مسیر نوشتن مدیریتی پشتیبانیشده برای تغییر وضعیت `rateLimitProtection` یک اتصال (`{ connectionId: string, enabled: boolean }`). فراخوانی آن با `enabled: true` محافظت صریح را روشن میکند؛ فراخوانی آن با `enabled: false` محافظت صریح را حذف میکند (با این حال، در صورت روشن بودن فعالسازی خودکار، اتصالهای فعال کلید API همچنان تحت پوشش شبکهٔ امنی سراسری باقی میمانند).
- **`PUT /api/providers/[id]`**: عمداً `rateLimitProtection` را **نمیپذیرد** و آن را تغییر نمیدهد (#11278). بهروزرسانی فرادادهٔ اتصال ارائهدهنده از طریق `PUT /api/providers/[id]` هرگز وضعیت ذخیرهشدهٔ محافظت محدودیت نرخ را تغییر نخواهد داد.

---

## 6. نگهبان توان عملیاتی جریان کند (#9709)

نگهبان اختیاری `resilienceSettings.streamRecovery.throughputWatchdog` یک upstream را شناسایی میکند که همچنان در حال ارسال chunkهاست اما خروجی assistant را با نرخی پایینتر از نرخ خروجی مفید پیکربندیشده تولید میکند. این نگهبان بهطور آگاهانه از مهلت بیکاری (idle timeout) متمایز است: heartbeatها و متادیتا هیچکدام از این تایمرها را بازنشانی نمیکنند و بهعنوان پیشرفت محسوب نمیشوند. همچنین از مهلت سختگیرانه تلاش (#9153) متمایز است که صرفنظر از کیفیت خروجی، یک سقف ایمنی مطلق باقی میماند.

نگهبان پیش از آنکه بتواند abort کند، به یک دوره warm-up و در ادامه یک rolling window کامل نیاز دارد. این نگهبان دلتاهای متنی حاصل از رویدادهای خروجی Chat Completions و Responses API را میشمارد (یک پراکسی محافظهکارانه از بایتهای UTF-8)، رویدادهای صرفاً usage و رویدادهای خالی را نادیده میگیرد و تا زمانی که رویدادهای tool-call یا reasoning در جریان هستند، قضاوت را به تعلیق درمیآورد. این قابلیت بهطور پیشفرض غیرفعال است و میتوان آن را با `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` فعال کرد؛ window، warm-up، حداقل نرخ و حداقل خروجی قابلاندازهگیری، همگی توسط لایه نرمالسازی معمول تنظیمات resilience محدود میشوند.

هنگامی که فعال باشد، abort نگهبان فقط به تلاش upstream فعال اعمال میشود. پیش از هر بایت قابلمشاهده برای کلاینت، مسیر بازیابی زودهنگام همان حسابِ موجود ممکن است تلاش را دوباره باز کند. پس از commit، جریان هرگز بهصورت کورکورانه بازپخش نمیشود؛ تنها قرارداد ادامه امن میانجریانِ موجود میتواند یک پسوند را بدوزد. نهاییسازی تکمرحلهای باقی میماند، بنابراین محاسبه usage و آزادسازی سمافور تکراری نمیشوند.

---

## 7. بازبیان وضعیت آپاستریم (خطاهای سهمیه با وضعیت گزارششدهی نادرست)

**دامنه:** یک درگاه آپاستریم که اتمام موقت سهمیه را با وضعیت HTTP نادرست گزارش میکند.

**هدف:** اصلاح یک وضعیت گمراهکننده _قبل_ از طبقهبندی، تا مصرفکنندگان پاییندست (موتور fallback، تجمیع combo، پاسخ سمت کلاینت) ماهیت واقعیِ قابلتلاشمجدد بودن خطا را ببینند.

برخی درگاهها اتمام موقت سهمیه را با یک وضعیت HTTP غیرقابلتلاشمجدد علامت میدهند. `agentrouter.org` بهجای `429` استاندارد، کد `403` (گاهی `400`) را با بدنهای به زبان چینی (`用户额度不足` / `额度不足`) برمیگرداند. کلاینتهایی مانند Claude Code کد `403` را دائمی تلقی کرده و نشست را متوقف میکنند، و بدون اصلاح، موتور fallback آن را بهجای یک رویداد سهمیه، بهعنوان `AUTH_ERROR` طبقهبندی میکند.

**پیادهسازی:**

- رجیستری + تطبیقدهنده: `open-sse/config/upstreamStatusRestatement.ts` — فهرستی از قواعد بهازای هر ارائهدهنده (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`) که از طریق `applyStatusRestatement()` تطبیق داده میشود.
- محل فراخوانی: بلوک `providerFailure:` در `open-sse/handlers/chatCore.ts` (حدود خط 3654)، بلافاصله پس از آنکه `parseUpstreamError()` یک پاسخ آپاستریم با وضعیت HTTP خطا (`!providerResponse.ok`) را تجزیه میکند، و پیش از اجرای هر طبقهبندی، تا همه مصرفکنندگان پاییندست وضعیت اصلاحشده را ببینند. خطاهایی که درون یک استریم SSE با کد `200` جاسازی شدهاند، مسیر جداگانه و متأخرتری برای تجزیه استریم را طی میکنند و امروز تحت پوشش این هوک **نیستند** — محدودیتی شناختهشده که هنوز برای وضعیت نادرست agentrouter موردنیاز نیست (چون آن مورد بهصورت یک وضعیت HTTP خطا بروز میکند).
- واجدبودن تلاش مجدد: `429` در `RETRY_AFTER_ELIGIBLE_STATUSES` (`open-sse/services/combo/unavailableRetryGate.ts`) قرار دارد، بنابراین یک خطای بازبیانشده بهجای ظاهرشدن بهعنوان یک `403` مرده، یک پنجره تلاش مجدد واقعی همراه دارد.
- مقدار مصنوعی `60s` برای `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) تنها چیزی است که پاسخ بازبیانشده به **کلاینت** اعلام میکند؛ خودِ آن مدتزمان cooldown/lockout داخلی اتصال نیست — آن بهطور جداگانه توسط هر مکانیزمی که واقعاً خطای بازبیانشده را مدیریت میکند تعیین میشود (بکآف افزایشی Connection Cooldown، §2، با پایه `3s` برای ارائهدهندگان API-key؛ یا Model Lockout، §3، برای ارائهدهندگانی با سهمیه بهازای هر مدل مانند agentrouter). روتر میتواند از نظر داخلی زودتر از پنجره 60 ثانیهای که به کلاینت اعلام میکند، واجد شرایط تلاش مجدد شود — این فضای احتیاطی عمدی است، نه یک باگ.

خطاهای دائمی (`无权访问模型` در agentrouter — یعنی عدم دسترسی به این مدل) هرگز بازبیان نمیشوند: `excludeMarkers` حتی زمانی که `textMarkers` تطبیق پیدا کند، قاعده را وتو میکند، بنابراین خطا وضعیت اصلی خود را حفظ میکند و هیچچیز آن را تا ابد دوباره تلاش نمیکند. قاعده طبقهبندی ارائهدهندهی منطبق
(`agentrouter-model-access-denied` در `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`، `scope: "model"`، با یک cooldown پایه اعلامشده `6h`) توسط `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_قبل_ از بازگشت زودهنگام عمومی `FORBIDDEN` در دسته apikey بررسی میشود، مشروط بر `honorsRuleLockScope(provider)` (#10334 — در حال حاضر منحصر به agentrouter از طریق فهرست مجاز `HONORS_RULE_LOCK_SCOPE_PROVIDERS` در
`providerErrorRules.ts`). cooldown ششساعته اعلامشده قاعده بهصورت
`fallbackResult.baseCooldownMs` جریان مییابد، اما همچنان وارد مسیر ازپیشموجود lockout سهمیه بهازای هر مدل میشود (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`، که بهجز منشأ cooldown توسط #10334 تغییر نکردهاند): مانند هر lockout مدل دیگری، به سقف `mlSettings.maxCooldownMs` اپراتور
(پیشفرض `1_800_000ms` / 30 دقیقه) محدود میشود، و _دلیل lockoutِ ذخیرهشده_ همان `"forbidden"` ازپیشموجودِ هاردکدشده باقی میماند،
نه `"auth_error"` قاعده — فقط مدتزمان cooldown بهصورت سرتاسری لحاظ میشود، نه رشته دلیل. خود اتصال فعال باقی میماند؛
مدلهای همرده روی همان اتصال تحت تأثیر قرار نمیگیرند.

خطاهای سهمیه بازبیانشده (`额度不足`) در پروداکشن به یک قاعده ارائهدهنده میرسند
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`، `scope:
"connection"`، بدون cooldown اعلامشده مخصوص خود — پیشفرض بکآف مقیاسشده لایه persistence اعمال میشود). از #10334 به بعد، `scope` روی
`ProviderErrorRuleMatch` بهصورت سرتاسری مصرف میشود، اما **فقط** برای ارائهدهندگانی که در
فهرست مجاز `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
امروز فقط `"agentrouter"`، کنترلشده از طریق `honorsRuleLockScope()`) هستند. برای هر
ارائهدهنده دیگر، `scope` دقیقاً مانند قبل از #10334 صرفاً اطلاعاتی باقی میماند.
`checkFallbackError` اسکوپ قاعده منطبق را بهصورت
`fallbackResult.ruleScope` در معرض قرار میدهد؛ `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) گارد مشترکی است که تأیید میکند یک
`ruleScope` واقعاً برای لحاظشدن بهعنوان یک سیگنال خودبهبودیابنده در سطح کل اتصال ایمن است (scope برابر `"connection"`، reason برابر `quota_exhausted`، هرگز `permanent` نه،
هرگز `creditsExhausted` نه — دفاعی در برابر قاعدهای احتمالی در آینده که scope
`"connection"` را با یک وضعیت دائمی حساب جفت کند). دو مصرفکننده آن را فراخوانی میکنند:

- **ماندگاری** (`markAccountUnavailable()`، `src/sse/services/auth.ts`):
  بهجای افتادن در شاخه قفلشدگی **per-model** ارائهدهنده passthrough
  (agentrouter دارای `passthroughModels: true` است → `hasPerModelQuota()`
  مقدار `true` برمیگرداند)، یک **دوره خنکسازی موقت اتصال** اعمال میکند —
  `testStatus: "unavailable"` بهعلاوه `rateLimitedUntil`، هرگز نه یک وضعیت
  نهایی (`credits_exhausted`/`banned`/`expired`) — بنابراین اتصال پس از
  سپریشدن دوره خنکسازی بهصورت خودکار بازیابی میشود، بهجای آنکه به
  بازنشانی دستی اعتبارنامه نیاز داشته باشد. برای اتصالهایی با
  `disableCooling: true` (#2997) نادیده گرفته میشود: آن انصراف (opt-out)
  بهجای آن به قفلشدگی per-model سقوط میکند (یک مصالحه مستندشده — کامنت
  کد بالای شاخه را ببینید).
- **مسیریابی combo در همان درخواست** (`applyComboTargetExhaustion()`،
  `open-sse/services/combo/targetExhaustion.ts`): همان گارد، اتصال را در
  مجموعه درونحافظهای `exhaustedConnections` علامت میزند، با کلید
  `${provider}:${connectionId}`. این فقط از یک هدف باقیمانده در همان درخواست
  که _خودش از قبل همان `connectionId` دقیق را روی شیء هدف خود حمل میکند_
  صرفنظر میکند (`getExhaustedTargetSkipReason()`،
  `open-sse/services/combo/comboPredicates.ts`، عبارت `if (provider &&
connectionId)` قبل از جستجوی `exhaustedConnections`) — یک combo ساده از
  فهرست مدلها، که در آن اهداف همرده هیچ `connectionId` سنجاقشدهای از خود
  ندارند و یکی فقط بهازای هر dispatch از هدر
  `X-OmniRoute-Selected-Connection-Id` پاسخ resolve میشود، هرگز به آن تطابق
  کلید برخورد نمیکند. برای آن حالت رایج، حفاظت واقعی در برابر استفاده مجدد
  یک leg باقیمانده از حساب تازه-تمامشده، این Set نیست — بلکه لایه ماندگاری
  بالاست (`rateLimitedUntil` اتصال اکنون در آینده قرار دارد) در ترکیب با همین
  گارد که `transientRateLimitedProviders` را برای این شکست سرکوب میکند (به
  «طراحی دومرحلهای» و کامنت کد روی شاخه `isAgentrouterConnectionQuotaScope`
  در `targetExhaustion.ts` مراجعه کنید): با آن Set که بدون علامت باقی میماند،
  force-allow به نام `allowRateLimitedConnection` در `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`، `:2734-2738`) برای legهای
  باقیمانده ارائهدهنده فعال نمیشود، بنابراین فیلتر `rateLimitedUntil` در
  انتخاب اعتبارنامه (`src/sse/services/auth.ts:1238`) بهطور عادی رعایت میشود
  و یک leg باقیمانده یا یک اتصال agentrouter متفاوت و همچنان-واجد-شرایط را
  برمیگزیند یا به دلیل در دسترس نبودن هیچ اعتبارنامهای شکست میخورد — راه
  خود را به زور به اتصالی که این شاخه تازه خنک کرده باز نمیگرداند.

### طراحی دومرحلهای: بازنویسی وضعیت، سپس طبقهبندی

بازنویسی وضعیت (`upstreamStatusRestatement.ts`) و قوانین طبقهبندی
ارائهدهنده (`open-sse/config/providerErrorRules.ts`، `providerRuleRegistry`)
رجیستریهای جداگانهای هستند که هر دو بر اساس شناسه ارائهدهنده و نشانگرهای
متنی کلید میخورند، اما در مکانهای متفاوتی اجرا میشوند و اهداف متفاوتی
دارند: بازنویسی، وضعیت HTTP را زودهنگام در `chatCore.ts` بازنویسی میکند؛
قوانین طبقهبندی، `reason` جایگزین (fallback) را انتخاب کرده و `scope`
(`model` / `provider` / `connection`) را درون `checkFallbackError()`
(`open-sse/services/accountFallback.ts`) قفل میکنند.

قوانین طبقهبندی فقط **متن** کامل خطا را میبینند (برای تطابق نشانگرهای بدنه
مانند `额度不足` لازم است) و آن هم فقط برای ارائهدهندگان فهرستشده در فهرست
مجاز `FULL_TEXT_RULE_PROVIDERS` در `providerErrorRules.ts` — در حال حاضر فقط
`"agentrouter"`. برای هر ارائهدهنده دیگر **کاتالوگ داخلی**،
`checkFallbackError` به `getProviderErrorRuleMatch` فقط خطای ساختیافته
(`{code, type}`) را میدهد، که برای قوانین مبتنی بر هدر/وضعیت/کد کافی است اما
نسبت به نشانگرهای متن بدنه نابیناست. تابع کمکی `resolveRuleMatchBody()` این
انتخاب را انجام میدهد: متن کامل خطا برای ارائهدهندگان موجود در فهرست مجاز،
و در غیر این صورت خطای ساختیافته. افزودن یک ارائهدهنده **داخلی** به
`FULL_TEXT_RULE_PROVIDERS` یک opt-in صریح بهازای هر ارائهدهنده است — این
وجود دارد تا مسیر پیشفرض برای هر ارائهدهندهای که در فهرست نیست،
بایتبهبایت بدون تغییر بماند.

`scope` یک قانون (`model` / `provider` / `connection`) یک opt-in جدا از
`FULL_TEXT_RULE_PROVIDERS` است: `checkFallbackError` آن را فقط بهصورت
`fallbackResult.ruleScope` آشکار میکند، و مصرفکنندگان downstream آن را فقط
بهعنوان چیزی فراتر از یک برچسب صرفاً اطلاعاتی، برای ارائهدهندگان موجود در
فهرست مجاز `HONORS_RULE_LOCK_SCOPE_PROVIDERS` در همان فایل رعایت میکنند (با
گیت از طریق `honorsRuleLockScope()` — امروز فقط `"agentrouter"`). برای اینکه
بدانید یک تطابق `scope: "connection"` پس از قرارگرفتن یک ارائهدهنده در آن
فهرست مجاز واقعاً چه میکند، به «خطاهای سهمیه بازنویسیشده» در بالا مراجعه
کنید.

**#11104 — قوانین اعلانشده توسط اپراتور از کنار هر دو فهرست مجاز عبور
میکنند.** یک اپراتور میتواند در زمان اجرا از طریق
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
بدون ویرایش این فایل، یک قانون بهازای هر ارائهدهنده اعلان کند. قراردادن یک
قانون اپراتور پشت
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — فهرستهای
مجازی که برای محافظت از رفتار **پیشفرض** قوانین کاتالوگ داخلی در نظر گرفته
شدهاند — سازوکار settings را برای هر ارائهدهنده بهجز آنهایی که از قبل در
آنجا فهرست شدهاند بیاثر میکرد، چون اعلان قانون بهخودیِ خود opt-in صریح
اپراتور است. `resolveRuleMatchBody()` و `honorsRuleLockScope()` هر دو ابتدا
`hasOperatorRuleForProvider()` را بررسی میکنند: ارائهدهندهای با قانون
اپراتور، متن خام خطا را دریافت میکند و `scope` اعلانشدهاش رعایت میشود،
صرفنظر از اینکه آیا در هیچیک از فهرستهای مجاز هم ظاهر میشود یا نه.

**شکاف شناختهشده — `providerRuleRegistry` هرگز برای HTTP 400 بررسی
نمیشود.** شاخه `BAD_REQUEST` در `checkFallbackError` وضعیت 400 را بهطور
کامل از طریق آرایههای الگوی خودش (`MODEL_ACCESS_DENIED_PATTERNS`،
`CONTEXT_OVERFLOW_PATTERNS` و غیره در `accountFallback.ts`) طبقهبندی میکند و
پیش از رسیدن به شاخه `configuredRule`/`getProviderErrorRuleMatch` بالای آن
بازمیگردد. یک قانون کاتالوگ داخلی (یا یک قانون اپراتور) با `status: 400` از
نظر نحوی معتبر است اما هرگز اجرا نخواهد شد. امروز هیچ قانون موجودی 400 را هدف
نمیگیرد، بنابراین هیچ چیزی در production تحت تأثیر نیست — اما یک قانون 400
در آینده ابتدا نیاز به دستکاری این شاخه دارد، که تغییری بزرگتر از افزودن یک
قانون است (400 را برای هر ارائهدهندهای که از قبل بر رفتار آرایه-الگو تکیه
دارد بازطبقهبندی میکند) و خارج از دامنه افزودن یک قانون برای یک ارائهدهنده
منفرد است.

### افزودن یک درگاه جدید با اعلام نادرست سهمیه

1. یک آرایه قاعده در `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`) ثبت کنید. `textMarkers`
   را مختص ارائهدهنده نگه دارید؛ هرگز عبارات عمومی انگلیسی را که با
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`)
   تداخل دارند دوباره استفاده نکنید.
2. در صورت تمایل، قواعد طبقهبندی را در
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) ثبت
   کنید تا محدوده قفل درست انتخاب شود (`connection` برای سهمیه سراسری
   حساب، `model` برای خطاهای تکمدلی). این مرحله در محیط production فقط
   برای ارائهدهندگانی اثر میگذارد که قواعدشان به متن کامل خطا
   (نشانگرهای بدنه) نیاز دارند: شناسه ارائهدهنده را به
   `FULL_TEXT_RULE_PROVIDERS` در همان فایل اضافه کنید — در غیر این صورت
   `checkFallbackError` همیشه فقط خطای ساختیافته `{code, type}` را در
   اختیار قاعده قرار میدهد و یک قاعده مبتنی بر متن بدنه هرگز با ترافیک
   واقعی تطبیق پیدا نمیکند. قواعدی که صرفاً بر اساس `status`/`headers`
   تطبیق میکنند (مانند قواعد Opencode یا Minimax) به این opt-in نیازی
   ندارند. جدا از این، اگر قاعده `scope: "connection"` را اعلام میکند و
   مقصود یک cooldown واقعی در سطح کل اتصال بهعلاوه پرش از combo در همان
   درخواست است (نه صرفاً یک برچسب اطلاعاتی)، شناسه ارائهدهنده را به
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` در همان فایل اضافه کنید — این همان
   چیزی است که مصرف به سبک `isAgentrouterConnectionQuotaScope()` را در
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) و
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) کنترل میکند؛ بدون
   آن، `scope` همچنان از مسیر `fallbackResult.ruleScope` عبور میکند اما
   هیچ چیز بر اساس آن عمل نمیکند.
3. تستهای واحدی همالگو با `tests/unit/upstream-status-restatement.test.ts`
   و `tests/unit/agentrouter-error-rules.test.ts` اضافه کنید (شامل
   نگهبانهای not-permanent / not-creditsExhausted، و — اگر ارائهدهنده
   به لیست مجاز نیاز دارد — تستی که تأیید کند `resolveRuleMatchBody()`
   متن کامل را فقط برای آن ارائهدهنده برمیگرداند).

هیچ تغییری در `chatCore.ts`، `classifyError` یا combo لازم نیست.

#### قفل سطلبندیشده بر اساس egress (#10880)

ارائهدهندگان موجود در `EGRESS_BUCKETED_LOCK_PROVIDERS` (خانواده opencode)
بهعنوان upstream با سطلبندی IP رفتار میشوند (سطح رایگان opencode بر
اساس IP سطلبندی میشود، نه بر اساس حساب — به #9611 مراجعه کنید): یک پاسخ
با وضعیت 429 که بهعنوان `quota_exhausted` **یا** `rate_limit_exceeded`
طبقهبندی شده باشد، پیش از آنکه چرخش (rotation) فرصت امتحان آنها را
داشته باشد، هر اتصالِ خانواده موجود در لیست مجاز را که آخرین IP خروجی
(egress) شناختهشدهاش با IP اتصال ناموفق یکی است cooldown میکند — و
بدین ترتیب از N-1 فراخوان upstream که شکستشان تضمینشده است جلوگیری
میشود (همان الگوی #10460/#10525).
`rate_limit_exceeded` بهطور عمدی گنجانده شده است: در مسیر
`markAccountUnavailable` قواعد مختص opencode هرگز تطبیق پیدا نمیکنند
(هیچ header/body به `checkFallbackError` داده نمیشود و opencode در
`FULL_TEXT_RULE_PROVIDERS` نیست)، بنابراین یک 429 که بدنهاش حاوی متن
سهمیه اشتراک است ("monthly usage limit
reached") توسط fallback مبتنی بر متن سهمیه
(`buildSubscriptionQuotaFallback`، `accountFallback.ts`؛ cooldown
یکساعته) و پیش از آنکه قاعده `status_429` اصلاً بررسی شود، بهعنوان
`quota_exhausted` طبقهبندی میشود — در حالی که یک 429 فاقد متن سهمیه
(محدودیت نرخ ساده) از طریق قاعده `status_429` بهعنوان
`rate_limit_exceeded` طبقهبندی میشود و باز هم خانواده IP را cooldown
میکند. برای یک ارائهدهنده موجود در لیست مجاز، محدودیت نرخِ
سطلبندیشده بر اساس IP همان سیگنال سهمیه تمامشده است. محدودیتهای
صادقانه:

- **حداکثر تلاش**: قفل، آخرین `egress_ip` شناختهشدهٔ اتصال را از
  `proxy_logs` بازیابی میکند (پنجرهٔ ۲۴ ساعته، همزمان، بدون کش). کش سرد
  (IP خروجی هرگز کاوش نشده) یا نبود ردیف → اتصال ناموفق همچنان توسط شاخه
  سرد میشود (مثل امروز ثبت میشود)، فقط هیچ اتصال همخانوادهای (sibling)
  قفل نمیشود.
- **هرگز نهایی نیست**: سردسازی (cooldown) یک پنجرهٔ سهمیهٔ تجدیدشونده است
  (`testStatus: "unavailable"`)؛ هرگز یک حالت دائمی از یک سیگنال در سطح IP
  استنتاج نمیشود. اتصالهای `disableCooling` بهکلی از این شاخه عبور
  میکنند.
- **تغییر گرانولاریته قفل برای خانوادهٔ موجود در فهرست مجاز**: این یک تغییر
  دامنه است، نه صرفاً یک بهینهسازی همخانواده. opencode یک ارائهدهندهٔ
  `passthroughModels` است، بنابراین پیش از این شاخه یک 429 منجر به قفل
  بهازای هر MODEL میشد؛ اکنون یک سردسازی در سطح اتصال ایجاد میکند — از
  جمله برای اپراتوری که تنها یک اتصال بدون هیچ همخانوادهای اجرا میکند.
  این همان گرانولاریتهای است که جدول قواعد opencode از پیش آن را صحیح اعلام
  کرده (`scope: "connection"`، `providerErrorRules.ts`) و تاکنون هرگز رعایت
  نشده، چون opencode در `HONORS_RULE_LOCK_SCOPE_PROVIDERS` نیست. این شاخه
  خودش سردسازی اتصال ناموفق + `backoffLevel` را مینویسد، درست مانند شاخهٔ
  agentrouter با دامنهٔ اتصال، و برمیگردد — بلاک بهازای هر مدل و مسیر
  عمومیِ پایین هرگز طی نمیشوند.
- **Combo هم لحاظ شده**: مانند شاخهٔ agentrouter، این دامنه عمداً تنزلِ
  `persistUnavailableState`/`isCombo` را که یک فراخوانِ combo روی 429 اعمال
  میکند نادیده میگیرد. قفل بهازای هر مدل شکل ضعیفتری از این دامنه
  نیست، واحد اشتباهی است: چیزی دربارهٔ IP تمامشده نمیگوید، پس چرخشِ
  combo همچنان بهازای هر همخانواده یک فراخوان با شکستِ حتمی میسوزاند.
- **ایمنی همخانواده**: همخانوادهای که از قبل نهایی است
  (banned/credits_exhausted) یا از قبل در سردسازی طولانیتری قرار دارد،
  هرگز بازنویسی نمیشود.
- **فهرست مجاز انحصاری**: وسیعتر کردن `EGRESS_BUCKETED_LOCK_PROVIDERS` یک
  تصمیم صریحِ مالک است؛ هیچ سیمکشی عمومیای در کار نیست (الگوی
  #10334/#10419). کوئریِ همخانواده همان فهرست مجاز را bind میکند بهجای
  اینکه آن را بهصورت یک لیترال SQL تکرار کند، پس وسیعتر کردن آن همچنان
  یک تغییر تکخطی باقی میماند.
- **چرخش IP خروجی، در هر دو جهت**: پنجرهٔ جستجو (۲۴ ساعت) بسیار پهنتر از
  TTL کشِ IP خروجی (۵ دقیقه) است، پس «آخرین IP شناختهشده» تاریخچه است، نه
  وضعیت فعلی. اگر پروکسی یک اتصال درون پنجره چرخیده باشد، قفل ممکن است یک
  IP واقعاً مشترک را **از دست بدهد** (IP ثبتشده، همان IP جدیدِ
  غیرتمامشده است) — و بهطور متقارن ممکن است **همخانوادهای را که از آن
  زمان از IP تمامشده دور چرخیده است، سرد کند**. حالت دوم برای آن
  همخانواده هزینهٔ یک پنجرهٔ سردسازی دارد؛ هر دو، محدودیتهای
  پذیرفتهشدهٔ حداکثر تلاشِ یک جستجوی مبتنی بر تاریخچهاند.
- **هزینه**: دو اسکن کراندار از `proxy_logs` (با فیلتر پنجره از طریق
  `idx_pl_timestamp`)، فقط با فرکانس وقوع 429. بدون ایندکس جدید (مهاجرت ۱۳۴
  YAGNI). روی یک نسخهٔ کپی DB با ترافیک واقعی و اندازهٔ متوسط سنجیده شده؛
  یک نمونهٔ با توان عملیاتی بالا بهتناسب ردیفهای بیشتری را در همان پنجره
  نگه میدارد.

---

## سایر قابلیتهای تابآوری

- **21 استراتژی مسیریابی** (priority، weighted، round-robin، context-relay، fill-first، p2c، random، least-used، cost-optimized، reset-aware، reset-window، expiry-first، headroom، quota-weighted، strict-random، auto، lkgp، context-optimized، cache-optimized، fusion، pipeline) — به [AUTO-COMBO.md](../routing/AUTO-COMBO.md) مراجعه کنید.
- **مسیریابی آگاه از ریست** (v3.8.0) — اتصالها را بر اساس زمان ریست سهمیه اولویتبندی میکند.
- **تنزل حالت پسزمینه** — در Responses API گزینهی `background: true` همراه با هشدار به حالت همگام (sync) تنزل مییابد.
- **تشخیص پویاي محدودیت ابزار** — وقتی به محدودیت تعداد ابزارها میرسد، از ارائهدهندگان عقبنشینی (back off) میکند.
- **جایگزین اضطراری** — توسط `OMNIROUTE_EMERGENCY_FALLBACK` کنترل میشود؛ اپراتورها میتوانند بدون راهاندازی مجدد، آن را از صفحهی Feature Flags بازنویسی کنند.

---

## اشکالزدایی

- کامبوی وزندار پاسخ `503 all_targets_cooling_down` میدهد (با `Retry-After` تنظیمشده، و `diagnostics.excluded` که همهی اهداف را با `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` فهرست میکند) ← مخزن پیکربندی و متصل شده است، فقط همهی اهداف توسط یک تایمر تابآوری مستثنا شدهاند؛ هشدار `[COMBO] Weighted selection: every target excluded before dispatch — …` دلایل و ثانیههای باقیمانده را ذکر میکند. پاسخ `404 no_executable_targets` از همان کامبو به این معناست که هیچ تایمر تابآوری دخیل نبوده است (چیزی برای اجرا وجود ندارد، یا همهی حسابها در آزمون دسترسپذیری شکست خوردهاند). ساختهشده در `open-sse/services/combo/pinRecovery.ts` بر اساس استثناهای جمعآوریشده در `targetResolution.ts`.
- همهی کلیدهای یک ارائهدهنده نادیده گرفته شدهاند ← هم وضعیت قطعکن مدار (circuit breaker) و هم `rateLimitedUntil`/`testStatus` هر اتصال را بررسی کنید.
- ارائهدهنده پس از پنجرهی ریست بهطور دائم مستثنا شده ← کدی که بهجای `getStatus()`/`canExecute()` مقدار خام `state` را میخواند.
- یک کلید شکست میخورد، بقیه باید کار کنند ← کولداون اتصال را بر قطعکن مدار ترجیح دهید.
- فقط یک مدل شکست میخورد ← قفل مدل (model lockout) را بر کولداون اتصال ترجیح دهید.
- وضعیت باید خودبهخود بازیابی شود اما نمیشود ← وجود مُهر زمانی در آینده و مسیر خواندنی که وضعیت منقضیشده را تازه میکند را بررسی کنید. وضعیتهای دائمی نیازمند تغییر دستی هستند.

---

## وضعیت زمان اجرا — مرجع سریع ایجنت

> بهصورت تحتاللفظی از `AGENTS.md` ← بخش «Resilience Runtime State» منتقل شده است (PR #12743) تا
> راهنمای ایجنت زیر سقف بودجهی 40k کانتکست باقی بماند. این نمای فشرده و روبهروی ایجنت از
> بخشهای بالاست؛ بخشهای شمارهدار همچنان مرجع کامل باقی میمانند.

OmniRoute سه مکانیزم مرتبط اما متمایز برای خطاهای موقت دارد. هنگام اشکالزدایی رفتار مسیریابی،
دامنهی آنها را از یکدیگر جدا نگه دارید. برای نقشهی یکنگر،
[نمودار تابآوری ۳ لایه](../diagrams/exported/resilience-3layers.svg)
(منبع: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
را ببینید.

### قطعکن مدار ارائهدهنده (Provider Circuit Breaker)

**دامنه**: کل ارائهدهنده، مثلاً `glm`، `openai`، `anthropic`.

**هدف**: توقف ارسال ترافیک به ارائهدهندهای که در سطح آپاستریم/سرویس مرتباً در حال شکست است، تا یک ارائهدهندهی ناسالم همهی درخواستها را کند نکند.

**پیادهسازی**:

- کلاس اصلی: `src/shared/utils/circuitBreaker.ts`
- سیمبندی گیت/اجرای چت: `src/sse/handlers/chatHelpers.ts`، `src/sse/handlers/chat.ts`
- API وضعیت زمان اجرا: `src/app/api/monitoring/health/route.ts`
- پوششهای مشترک: `open-sse/services/accountFallback.ts`
- جدول وضعیت پایدار: `domain_circuit_breakers`

**وضعیتها** (4 مورد — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: ترافیک عادی مجاز است.
- `DEGRADED`: باند هشدار زودهنگام — خطاها از آستانهی تنزل عبور کردهاند اما هنوز به آستانهی قطعکن نرسیدهاند؛ ترافیک همچنان جریان دارد، داشبوردها هشدار را نشان میدهند. یک تست اتصال معتبر یا یک پنجرهی آرام بدون خطای جدید، آن را به `CLOSED` بازمیگرداند
  (پنجره در `docs/architecture/RESILIENCE_GUIDE.md` آمده است).
- `OPEN`: ارائهدهنده بهطور موقت مسدود است؛ فراخوانندهها پاسخ provider-circuit-open دریافت میکنند
  یا مسیریابی کامبو به هدف دیگری پرش میکند.
- `HALF_OPEN`: مهلت ریست سپری شده است؛ اجازهی یک درخواست کاوش (probe) داده میشود. موفقیت، قطعکن را میبندد و شکست، آن را دوباره باز میکند.

**پیشفرضها** (`open-sse/config/constants.ts` ← `PROVIDER_PROFILES`، که از طریق
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` در `src/lib/resilience/settings.ts` ←
`getCircuitBreaker(provider, …)` در `src/sse/handlers/chatHelpers.ts` مصرف میشود). قطعکن کل-ارائهدهنده روی `circuitBreakerThreshold` / `circuitBreakerReset` اجرا میشود:

| پروفایل |   تنزل در | باز شدن در (`circuitBreakerThreshold`) | ریست (`circuitBreakerReset`) |
| ------- | --------: | -------------------------------------: | ---------------------------: |
| OAuth   |       `5` |                                    `8` |                        `60s` |
| API key |       `7` |                                   `12` |                        `30s` |
| Local   | (مشتقشده) |                                    `2` |                        `15s` |

`PROVIDER_PROFILES` همچنین `providerFailureThreshold` (10/15/2)،
`providerFailureWindowMs` (15/30/5 دقیقه) و `providerCooldownMs` (5/10/1 دقیقه) را تعریف میکند: اینها موتور
**گیت پنجرهی Provider Cooldown سراسری اختیاری** (`PROVIDER_COOLDOWN_ENABLED`، پیشفرض خاموش) هستند — یک ورودی در سطح ارائهدهنده در `open-sse/services/providerCooldownTracker.ts` تنها پس از `providerFailureThreshold` خطا درون `providerFailureWindowMs` بهعنوان در حال کولداون محسوب میشود و سپس به مدت `providerCooldownMs` سرد میشود. اینها آستانههای قطعکن فعال نیستند — آنها را با انتظار رفتار قطعکن تنظیم نکنید. هر پیشفرضی از طریق
متغیرهای محیطی `OMNIROUTE_PROVIDER_BREAKER_*` و `OMNIROUTE_CIRCUIT_BREAKER_*` قابل بازنویسی است؛ جدول
مرجع دقیقِ زمان اجرا در `docs/architecture/RESILIENCE_GUIDE.md` قرار دارد.

فقط وضعیتهای خطا در سطح ارائهدهنده باید قطعکن ارائهدهنده را فعال کنند:

```ts
(408, 500, 502, 503, 504);
```

قطعکن کل-ارائهدهنده را برای خطاهای عادی حساب/کلید/مدل مانند بیشتر
موارد `401`، `403` یا `429` فعال نکنید. آنها معمولاً متعلق به کولداون اتصال یا قفل
مدل هستند. یک `403` عمومی از ارائهدهندهی API key باید قابل بازیابی باشد، مگر اینکه
بهعنوان خطای نهایی ارائهدهنده/حساب طبقهبندی شده باشد.

بریکر از بازیابی تنبل (lazy) استفاده میکند، نه تایمر پسزمینه. وقتی `OPEN` منقضی میشود،
خواندنهایی مانند `getStatus()`، `canExecute()` و `getRetryAfterMs()` وضعیت را به
`HALF_OPEN` تازهسازی میکنند، بنابراین داشبوردها و سازندگان نامزد ترکیبی (combo) یک
ارائهدهنده منقضیشده را تا ابد حذف نمیکنند.

### کولداون اتصال

**دامنه**: یک اتصال/حساب/کلید ارائهدهنده.

**هدف**: رد کردن موقت یک کلید/حساب معیوب، در حالی که به اتصالهای دیگر همان
ارائهدهنده اجازه داده میشود به سرویسدهی به درخواستها ادامه دهند.

**پیادهسازی**:

- مسیر نوشتن/بهروزرسانی: `src/sse/services/auth.ts::markAccountUnavailable()`
- انتخاب/فیلتر کردن حساب: `src/sse/services/auth.ts::getProviderCredentials...`
- محاسبه کولداون: `open-sse/services/accountFallback.ts::checkFallbackError()`
- تنظیمات: `src/lib/resilience/settings.ts`

فیلدهای مهم روی اتصالهای ارائهدهنده:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

در حین انتخاب حساب، یک اتصال تا زمانی که شرط زیر برقرار باشد رد میشود:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

کولداونها نیز تنبل هستند: وقتی `rateLimitedUntil` در گذشته قرار گیرد، اتصال دوباره
واجد شرایط میشود. پس از استفاده موفق، `clearAccountError()` فیلدهای `testStatus`،
`rateLimitedUntil`، فیلدهای خطا و `backoffLevel` را پاک میکند.

رفتار پیشفرض کولداون اتصال:

- کولداون پایه OAuth: `5s`.
- کولداون پایه کلید API: `3s`.
- برای خطای `429` در کلید API باید در صورت وجود، راهنماییهای تلاش مجدد سمت بالادست
  (`Retry-After`، هدرهای ریست، یا متن ریست قابل تجزیه) ترجیح داده شوند.
- خطاهای تکراری قابل بازیابی از عقبنشینی نمایی استفاده میکنند:

```ts
baseCooldownMs * 2 ** failureIndex;
```

محافظ ضد هجوم گلهای (thundering herd) جلوگیری میکند از اینکه خطاهای همزمان روی یک
اتصال بهطور مکرر کولداون را تمدید کنند یا `backoffLevel` را دو بار افزایش دهند.

وضعیتهای پایانی (terminal) کولداون نیستند. `banned`، `expired` (که تنها پس از N
تلاش مجدد محدود از طریق `EXPIRED_RETRY_MAX` به وضعیت پایانی تبدیل میشود) و
`credits_exhausted` قرار است تا زمانی که اعتبارنامهها/تنظیمات تغییر کنند یا یک
اپراتور آنها را بازنشانی کند، غیرقابل دسترس بمانند. وضعیتهای پایانی را با وضعیت
کولداون گذرا بازنویسی نکنید.

### قفل مدل

**دامنه**: ارائهدهنده + اتصال + مدل.

**هدف**: جلوگیری از غیرفعال شدن کل یک اتصال وقتی فقط یک مدل برای آن اتصال غیرقابل
دسترس یا محدودشده بر اساس سهمیه است.

مثالها:

- ارائهدهندگانی با سهمیه بهازای هر مدل که `429` برمیگردانند.
- ارائهدهندگان محلی که برای یک مدل گمشده `404` برمیگردانند.
- خطاهای مجوز حالت/مدل مخصوص ارائهدهنده، مانند حالتهای منتخب Grok.

قفل مدل در `open-sse/services/accountFallback.ts` قرار دارد و به همان اتصال اجازه
میدهد به سرویسدهی به مدلهای دیگر ادامه دهد.

### راهنمای اشکالزدایی

- اگر همه کلیدهای یک ارائهدهنده رد میشوند، هم وضعیت بریکر ارائهدهنده و هم
  `rateLimitedUntil`/`testStatus` هر اتصال را بررسی کنید.
- اگر یک ارائهدهنده پس از پنجره بازنشانی بهصورت دائمی حذف شده به نظر میرسد، بررسی
  کنید که آیا کد بهجای استفاده از `getStatus()`/`canExecute()` مقدار خام `state` را
  میخواند یا نه.
- اگر یک کلید ارائهدهنده با خطا مواجه میشود اما بقیه باید کار کنند، کولداون اتصال
  را بر بریکر ارائهدهنده ترجیح دهید.
- اگر فقط یک مدل با خطا مواجه میشود، قفل مدل را بر کولداون اتصال ترجیح دهید.
- اگر یک وضعیت باید خودبهخود بازیابی شود، باید یک مهر زمانی آینده/مهلت بازنشانی و یک
  مسیر خواندن داشته باشد که وضعیت منقضیشده را تازهسازی کند. وضعیتهای دائمی به
  تغییرات دستی در اعتبارنامه یا پیکربندی نیاز دارند.

---

## اثر انگشت TLS و پنهانکاری

پنهانکاری مختص ارائهدهنده (JA3/JA4، CCH، مبهمسازی) بهطور جداگانه مستند شده است — به `docs/security/STEALTH_GUIDE.md` مراجعه کنید (در git؛ در `/docs` کامپایل نشده است).

---

## تست تابآوری (فاز ۸ · بلوک C)

فراتر از تستهای واحد برای منطق تابآوری، سه تست، زمان اجرا را تحت شرایط واقعی فشار/خرابی میسنجند (همه یکپارچهسازی/nightly — هیچکدام PRها را مسدود نمیکنند):

| تست         | چه چیزی                                                                                                                                                                                               | اجرا                                     |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | گره upstream ساختگی، تأخیر/ریست/تایماوت/503 واقعی را تزریق میکند؛ اعتبارسنجی میکند که circuit breaker باز/بازیابی میشود و `checkFallbackError` کد 503 را بهعنوان fallback قابلبازیابی طبقهبندی میکند. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | حدود ۵۰۰ استریم برای هر `createSSEStream` تحت `--expose-gc`؛ در صورت رشد heap فراتر از سقف شکست میخورد (محافظ OOM #3069).                                                                             | `npm run test:heap`                      |
| k6 soak     | بار پیوسته در برابر `/api/monitoring/health`؛ آستانههای p95/خطا.                                                                                                                                      | `k6 run tests/load/k6-soak.js` (nightly) |

توسط `.github/workflows/nightly-resilience.yml` هماهنگ میشود (cron + dispatch). در
`test:integration` پیشفرض، chaos و heap خودبهخود رد میشوند (بدون `RUN_CHAOS_INT`/`--expose-gc`).

---

## همچنین ببینید

- [راهنمای معماری](./ARCHITECTURE.md) — معماری سیستم و اجزای داخلی
- [راهنمای کاربر](../guides/USER_GUIDE.md) — ارائهدهندگان، ترکیبها، یکپارچهسازی CLI
- [موتور Auto-Combo](../routing/AUTO-COMBO.md) — امتیازدهی ۱۶عاملی، بستههای حالت
