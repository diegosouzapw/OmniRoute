# Account-Ban / Banned-Keyword Detection (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute پاسخهای خطای بالادستی را برای یافتن نشانههایی بررسی میکند که بیانگر این هستند که **حساب ارائهدهنده برای همیشه از کار افتاده است** (تعلیقشده / غیرفعالشده / مسدودشده بهدلیل نقض شرایط استفاده) و در صورت تطبیق، آن اتصال را به **وضعیت نهایی `banned`** منتقل میکند تا دیگر برای درخواستها انتخاب نشود. این همان چیزی است که کارت تنظیمات **Security → Banned Keywords** پیکربندی میکند («کلیدواژههای اضافی که تشخیص مسدودسازی دائمی حساب را فعال میکنند. کلیدواژههای داخلی همیشه اعمال میشوند.»).

این صفحه فهرست داخلی، جریان تشخیص، دامنهٔ اثر آن، نحوهٔ افزودن ایمن کلیدواژههای سفارشی و چگونگی بازیابی یک اتصال علامتگذاریشده را مستند میکند. خود وضعیت نهایی بخشی از مدل تابآوری است — به
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) («وضعیتهای نهایی») مراجعه کنید.

**منبع حقیقت:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`، `getMergedBannedSignals()`، `isAccountDeactivated()`).

## کلیدواژههای داخلی

این ۸ زیررشته، صرفنظر از هر فهرست سفارشی، همیشه اعمال میشوند (بدون حساسیت به حروف بزرگ و کوچک):

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> این فهرست همزمان با تغییر عبارتهای مسدودسازی توسط ارائهدهندگان تکامل مییابد. نسخهٔ
> معتبر، `ACCOUNT_DEACTIVATED_SIGNALS` در `open-sse/services/accountFallback.ts` است؛
> بلوک بالا را یک تصویر لحظهای در نظر بگیرید.

دو جدول سیگنال مجاور اما **مجزا** در همان فایل قرار دارند و بخشی از تشخیص کلیدواژههای مسدودسازی _نیستند_:

- `CREDITS_EXHAUSTED_SIGNALS` — اتمام اعتبار/سهمیه (`insufficient_quota`،
  `credit_balance_too_low`، `payment required`، …) → وضعیت نهایی `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **غیرنهایی**؛ نوسازی توکن میتواند وضعیت را بازیابی کند.

توجه: عبارتهای گذرای رایج مانند **`rate limit`** / `429` توسط مسیر محدودیت نرخ / زمان انتظار اتصال مدیریت میشوند و سیگنال مسدودسازی **نیستند**.

## جریان تشخیص

```
پاسخ خطای بالادستی
  → تبدیل بدنه به رشته + تبدیل به حروف کوچک
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [تطبیق زیررشته]
  → تطبیق؟
      → connection testStatus = "banned"      (دائمی — زمان انتظار ۱ساله، بدون بازیابی خودکار)
      → اگر تنظیم `autoDisableBannedAccounts` فعال باشد و `autoDisableBannedScope`
        این اتصال را شامل شود (`all`، یا `subscription` برای OAuth/cookie/session)
        → همچنین isActive = false. کلیدهای API پیشپرداختشده هنگامی که دامنه
        `subscription` باشد، فعال باقی میمانند.
      → اتصال هنگام انتخاب حساب نادیده گرفته میشود (وضعیتهای ترکیبی QUOTA_BLOCKING)
```

- تطبیق بهصورت جستوجوی **زیررشتهای بدون حساسیت به حروف بزرگ و کوچک** در **بدنهٔ** پاسخ انجام میشود
  (`isAccountDeactivated`، `accountFallback.ts`).
- نهاییسازی دائمی با وضعیت `banned` در صورت وجود بدنهای حاوی سیگنال مسدودسازی، در **هر
  وضعیت HTTP** فعال میشود (از طریق `markAccountUnavailable` → `checkFallbackError`). برچسب محدودتر **`deactivated`** (`isActive=false` هنگامی که اتصال هیچ
  کلید API ذخیرهای ندارد) توسط مسیر درونخطی `chatCore.ts` برای **HTTP 401 / 403**
  نوشته میشود (طبقهبندیشده از طریق `classifyProviderError` → `ACCOUNT_DEACTIVATED`). توجه کنید که
  مسیر `markAccountUnavailable()` برای همان سیگنال `ACCOUNT_DEACTIVATED` (از طریق
  `resolveTerminalConnectionStatus`) یک وضعیت نهایی _متفاوت_ — **`expired`** — مینویسد؛ بنابراین یک مسدودسازی یکسان، بسته به اینکه کدام مسیر پاسخ را مدیریت کرده باشد، ممکن است بهصورت
  `deactivated` یا `expired` ظاهر شود. (توضیح قدیمیتر کد میگوید «هنگامی که بدنهٔ 401 شامل این رشتهها باشد» — این عبارت رفتار فعلی را کمتر از گسترهٔ واقعی آن توصیف میکند.)
- یک اتصال `banned` در هر جایی که وضعیتهای نهایی فیلتر میشوند، از فرایند انتخاب کنار گذاشته میشود
  (`isTerminalConnectionStatus`، مجموعهٔ `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## دامنه — کدام ارائهدهندگان اسکن میشوند

**همهٔ ارائهدهندگان.** این بررسی در خط لولهٔ عمومی مدیریت خطا اجرا میشود که
تمام درخواستهای ناموفق بالادستی از آن عبور میکنند — این بررسی **فقط** به
اسکرپرهای OAuth/اشتراک محدود نشده است. وضعیت نهایی حاصل بهازای هر **اتصال**
تعیین میشود، نه بهازای هر ارائهدهنده.

بااینحال، _رشتههای_ داخلی برای ارائهدهندگان اشتراکی/OAuth که واقعاً در معرض
خطر مسدودشدن هستند تنظیم شدهاند (ChatGPT Web Codex، Claude Web، Codex، Muse Spark،
Antigravity). یک ارائهدهندهٔ مبتنی بر کلید API فقط زمانی آشکارساز را فعال
میکند که بدنهٔ خطای آن عیناً شامل یکی از زیررشتهها باشد.

`autoDisableBannedScope` (`all` | `subscription`، پیشفرض `all`) کنترل میکند که
آیا یک تطابق، `isActive=false` را نیز اعمال کند یا نه. `subscription` به معنای
جایگاههای ورودمحور است (اشتراکهای پولی و حسابهای رایگان، از جمله نشستهای
مبتنی بر کوکی وب). این گزینه همچنان `testStatus=banned` را برای کلیدهای API
پیشپرداخت ثبت میکند، اما آنها را در مخزن مسیریابی نگه میدارد. طراحی پایدار،
استفاده از بازنویسی بهازای هر ارائهدهنده و هر حساب است؛ enum سراسری نخستین
پیادهسازی است.

## کلیدواژههای سفارشی مسدودشدن

کلیدواژهها را در **Security → Banned Keywords** اضافه یا حذف کنید (که از طریق
`PATCH /api/settings` بهعنوان تنظیم سراسری `customBannedSignals` ماندگار
میشوند). این کلیدواژهها به فهرست داخلی **افزوده میشوند** — هرگز جایگزین آن
نمیشوند — و هنگام ذخیرهسازی (و هنگام راهاندازی) از طریق
`setCustomBannedSignals()` بدون نیاز به راهاندازی مجدد بارگذاری میشوند. هر
کلیدواژه حداکثر میتواند 200 نویسه داشته باشد؛ برای طول آرایه محدودیتی وجود
ندارد.

**⚠ خطر مثبت کاذب — عبارتهای مشخص انتخاب کنید.** تشخیص بر اساس تطابق خام
زیررشته در کل بدنهٔ پاسخ انجام میشود و هر تطابق **دائمی** است (دورهٔ انتظار
یکساله و بازیابی دستی). یک کلیدواژهٔ کلی میتواند اتصالی کاملاً سالم را مسدود
کند:

- **بد:** `quota`، `limit`، `error`، `denied` — در بسیاری از خطاهای موقت ظاهر میشوند.
- **خوب:** جملههای کامل مربوط به مسدودشدن، مانند `your account has been suspended for`،
  `account permanently banned`، `violation of our terms`.

طولانیترین عبارت بدون ابهامی را ترجیح دهید که ارائهدهنده هنگام مسدودشدن واقعی
برمیگرداند. در صورت تردید، ابتدا `lastError` اتصال را زیر نظر بگیرید و سپس عبارت
دقیق را اضافه کنید.

## بازیابی اتصال علامتگذاریشده

وضعیتهای نهایی `banned` / `deactivated` **هرگز بهطور خودکار بازیابی نمیشوند**
(آنها از چرخهٔ بازیابی پیشدستانه کنار گذاشته شدهاند — فقط دورههای انتظار
`unavailable` خودبهخود بازیابی میشوند). اپراتور باید آنها را صراحتاً پاک کند:

1. **آزمایش مجدد اتصال** — کنش **Test** در داشبورد
   (`POST /api/providers/{id}/test`)؛ یک کاوش موفق، `testStatus` را به
   `active` بازنشانی کرده و فیلدهای خطا را پاک میکند.
2. **احراز هویت مجدد / ویرایش اعتبارنامهها** — برای ارائهدهندگان OAuth،
   جریان ورود / تازهسازی را دوباره اجرا کنید؛ مسیرهای ایجاد/واردکردن
   ارائهدهنده، `isActive = true` را تنظیم میکنند.
3. **فعالسازی مجدد اتصال** — اگر غیرفعالسازی خودکار، `isActive = false` را
   تنظیم کرده است (دامنهٔ `all`، یا `subscription` برای یک اتصال
   OAuth/کوکی/نشست)، پس از رفع مشکل حساب آن را دوباره فعال کنید.

دکمهٔ جداگانهای برای «پاککردن پرچم مسدودشدن» وجود ندارد — بازیابی از طریق
آزمایش مجدد، احراز هویت مجدد یا فعالسازی مجدد انجام میشود که با قاعدهٔ عمومی
وضعیت نهایی در
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) مطابقت دارد.

## جداسازی کاوش (آزمایش همهٔ مدلها)

یک **شکست ناشی از کاوش** (ارسالهای آزمایش همهٔ مدلها / بررسی سلامت که درون
`runAsProbe` اجرا میشوند) هرگز اتصالی را از مخزن حذف نمیکند (#9817): این شکست
**برای مشاهدهپذیری ثبت میشود** (`last_error`، `last_error_type`، `error_code`،
`last_error_at`)، اما از **تمام** تغییرات مسیریابی صرفنظر میکند — دورههای
انتظار، وضعیت نهایی (`banned` / `deactivated` / `credits_exhausted`)، قفلهای
مختص مدل، قطعکنندهٔ مدار ارائهدهنده، کش پنجدقیقهای سهمیه، تازهسازی توکن
OAuth و غیرفعالسازی خودکار. فقط یک شکست در مسیر درخواست واقعی باعث غیرفعالسازی
میشود. خطای ثبتشده باعث میشود حساب علامتگذاریشده در داشبورد قابل مشاهده
باشد، درحالیکه همچنان به ترافیک سرویس میدهد.

نقطهٔ تصمیمگیری واحد، `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`) است که در **تمام** محلهایی بررسی میشود که
ممکن است وضعیت مسیریابی را بر اثر یک شکست ناشی از کاوش تغییر دهند:

- `markAccountUnavailable` (`auth.ts`) — فقط ثبت (`lastError` با متن خام،
  `lastErrorType`، `errorCode`، `lastErrorAt`؛ عمداً **بدون**
  `backoffLevel`، زیرا باعث زوال خودکار هنگام انتخاب شده و رکورد را پاک
  میکند)
- `maybeAutoDisableBannedAccount` — بدون غیرفعالسازی خودکار
- `chatCore` — `FORBIDDEN`، `ACCOUNT_DEACTIVATED`، `QUOTA_EXHAUSTED` (فقط ثبت،
  بدون وضعیت نهایی `credits_exhausted`)، `GEO_BLOCKED` (بدون حذف 24ساعته)،
  `MODEL_NOT_FOUND` (بدون `lockModel`)، جایگزینی چرخشی حساب برای codex 429
  (بدون `markCodexScopeRateLimited`، بدون `rate_limited_until` ماندگارشده،
  بدون پاکسازی وابستگی نشست)، `persistCodexQuotaState` (بدون نوشتن وضعیت
  سهمیه و بدون بیاعتبارسازی کش)، `recordKeyHealthStatus` (چرخانندهٔ سلامت
  کلید دستنخورده باقی میماند)
- تازهسازی OAuth — هم تازهسازی پیشدستانه در پایهٔ اجراکننده
  (`base.ts` `execute()`، بدون مصرف چرخش توکن تازهسازی) و هم مسیر واکنشی
  401/403 در `chatCore` (بدون غیرفعالسازی `expired`)
- `chat.ts` — قطعکنندهٔ مدار ارائهدهنده و کش پنجدقیقهای سهمیه
  (`markAccountExhaustedFrom429`) هرگز تضعیف نمیشوند

خطای ثبتشده باعث میشود حساب علامتگذاریشده در داشبورد قابل مشاهده باشد،
درحالیکه همچنان به ترافیک سرویس میدهد. توجه: رکورد کاوش، متن خطای **خام**
(برشنخورده) را ذخیره میکند؛ برخلاف کوتاهسازی مسیر واقعی با
`slice(0,100)`.

اپراتورهایی که از آزمایش همه بهعنوان ابزار نگهداری استفاده میکنند، میتوانند
رفتار تاریخی را (که در آن کاوش مانند یک تولید واقعی محسوب میشود) از یکی از
روشهای زیر بازیابی کنند:

- تنظیم `probeCanDisable` (`POST /api/settings` با
  `{"probeCanDisable": true}`، یا ویرایش مستقیم پایگاه دادهٔ `key_value`)، یا
- پرچم قابلیت **`PROBE_CAN_DISABLE=true`** (بازنویسی از طریق محیط یا پایگاه
  داده؛ بر تنظیم اولویت دارد).

حالت امن در برابر خطا: اگر جستوجوی پرچم یا تنظیمات با خطا مواجه شود، جداسازی
همچنان روشن باقی میماند.

## فایلهای منبع

| موضوع                                  | فایل                                                                                                          |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| جدولهای سیگنال + تطبیق                 | `open-sse/services/accountFallback.ts`                                                                        |
| نهاییسازی / ماندگارسازی                | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| دامنه غیرفعالسازی خودکار               | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| طبقهبندی درونخطی                       | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| مستثنیسازی بازیابی از وضعیت نهایی      | `src/lib/quota/connectionRecovery.ts`                                                                         |
| بارگذاری زمان اجرای کلیدواژههای سفارشی | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| رابط کاربری تنظیمات                    | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
