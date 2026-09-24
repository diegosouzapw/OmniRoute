# CLI Machine-ID Token (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## نمای کلی

دستورهای CLI در OmniRoute با استفاده از توکن
`HMAC-SHA256(machine-id, salt)` که از طریق هدر درخواست
`x-omniroute-cli-token` ارسال میشود، در برابر API مدیریت محلی احراز هویت
میشوند.

این سازوکار به زیردستورهای CLI (`omniroute status`، `omniroute providers` و غیره)
اجازه میدهد بدون نیاز به ارائه JWT یا گذرواژه توسط کاربر در هر بار اجرا، نقاط
پایانی مدیریت را فراخوانی کنند.

## نحوه عملکرد

1. `getMachineTokenSync()` شناسه سختافزاری ماشین را از طریق `node-machine-id`
   میخواند (در صورت شکست، به رشتهای خالی بازمیگردد و احراز هویت CLI را
   غیرفعال میکند).
2. این تابع `HMAC-SHA256(machine_id, salt)` را محاسبه میکند و هش کامل
   هگزادسیمال ۶۴ کاراکتری را برمیگرداند — توکنی قطعی و غیرقابلبازگشت که به این
   ماشین وابسته است.
3. CLI تنها زمانی توکن را بهصورت `x-omniroute-cli-token` ارسال میکند که مقصد
   حلشده، یک URL صریحاً loopback باشد (`localhost`، `127.0.0.0/8` یا IPv6
   از نوع loopback). درخواستهای حامل توکن از `redirect: error` استفاده میکنند
   تا یک تغییر مسیر محلی نتواند آن را به مبدأ دیگری هدایت کند. contextهای راه دور
   در عوض از توکنهای دسترسی محدود به دامنه استفاده میکنند. اگر استخراج توکن
   امکانپذیر نباشد، CLI هدر را حذف میکند و `omniroute doctor` بهجای معتبر
   تلقیکردن یک توکن خالی، خطا را گزارش میدهد.
4. سرور (`src/server/authz/policies/management.ts`) توکن مورد انتظار را با همان
   salt دوباره محاسبه کرده و برای جلوگیری از استخراج مبتنی بر زمان، آن را از
   طریق `timingSafeEqual` مقایسه میکند.

## ویژگیهای امنیتی

| ویژگی                           | جزئیات                                                                                                                                                                                                          |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **فقط loopback**                | تنها زمانی پذیرفته میشود که نشانگر مورد اعتماد سرور برای محلیبودن همتا (که از آدرس واقعی همتای TCP استخراج میشود) loopback را نشان دهد. برای تعیین محلیبودن، هرگز به هدر `Host` تحت کنترل کلاینت اعتماد نمیشود. |
| **مقایسه با زمان ثابت**         | `crypto.timingSafeEqual` از حملات زمانبندی جلوگیری میکند.                                                                                                                                                       |
| **غیرقابلبازگشت**               | از خروجی HMAC نمیتوان machine-id را بازیابی کرد.                                                                                                                                                                |
| **بدون دور زدن حفاظت `always`** | `isAlwaysProtectedPath()` پیش از بررسی توکن CLI ارزیابی میشود. `/api/shutdown` و `/api/settings/database` همیشه به JWT نیاز دارند.                                                                              |
| **غیرقابلاستخراج**              | توکن هرگز روی دیسک نوشته یا ثبت نمیشود.                                                                                                                                                                         |

## salt پیشفرض (تصادفی برای هر نصب)

وقتی `OMNIROUTE_CLI_SALT` تنظیم نشده باشد، salt یک رشته هگزادسیمال تصادفی
۶۴ کاراکتری است که یکبار تولید شده و در `<DATA_DIR>/cli-token-salt.json`
(با حالت `0600`) ذخیره میشود — نه مقدار ثابت `omniroute-cli-auth-v1` که در
مخزن ثبت شده است. هم `getActiveSalt()` در `src/lib/machineToken.ts` و هم نسخه
همتای آن در `bin/cli/utils/cliToken.mjs` همان فایل را میخوانند؛ بنابراین سرور
و هر بار اجرای CLI در این نصب، به مقدار یکسانی میرسند. مقدار ثابت ثبتشده در
مخزن تنها زمانی بهعنوان آخرین راهحل استفاده میشود که هنوز امکان ایجاد salt
ذخیرهشده یا محیطی وجود نداشته باشد (برای مثال، در یک نصب تازه و صرفاً شامل CLI،
پیش از آنکه سرور حتی یکبار اجرا شده باشد). این کار یک ضعف مربوط به مقدار ثابت
پیشفرض قدیمی را برطرف میکند: `/etc/machine-id` معمولاً برای همه قابلخواندن
است؛ بنابراین در غیر این صورت، هر کاربر محلی میتوانست برای تمام نصبهایی که
هرگز `OMNIROUTE_CLI_SALT` را تنظیم نکردهاند، همان توکن را استخراج کند.

## چرخش salt

برای چرخش توکن مشتقشده بدون تغییر کد، `OMNIROUTE_CLI_SALT` را تنظیم کنید — این متغیر
همیشه بر salt ذخیرهشدهٔ مختص هر نصب اولویت دارد. پس از چرخش، همهٔ فرایندهای CLI
روی این دستگاه بهطور خودکار از توکن جدید استفاده خواهند کرد. این کار پس از افشای
فهرست فرایندها که ممکن است مقدار مشتقشدهٔ قبلی را آشکار کرده باشد، مفید است.

```bash
# چرخش پایدار (به پروفایل shell اضافه کنید)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# بررسی کنید که توکن جدید در حال استفاده است
omniroute status
```

## قالب قدیمی (SHA-256، ۳۲ نویسهای) — همچنان پذیرفته میشود

پیش از قالب HMAC بالا، CLI توکن خود را بهصورت
`SHA-256(machineId + salt).hex[0..32]` (یک پیشوند ۳۲ نویسهای) در
`bin/cli/utils/cliToken.mjs` مشتق میکرد (`getLegacyCliTokenSync` در `src/lib/machineToken.ts`).

برای سازگاری با نسخههای پیشین، سرور **هر دو** قالب را میپذیرد: اعتبارسنج
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` را میسازد و
هدر ورودی را با استفاده از `timingSafeEqual` با هرکدام مقایسه میکند
(`src/server/authz/policies/management.ts` و `src/lib/middleware/cliTokenAuth.ts`).
بنابراین، یک توکن در صورتی معتبر است که با **یکی** از این دو مورد مطابقت داشته باشد:
خلاصهٔ HMAC با ۶۴ نویسه یا پیشوند قدیمی SHA-256 با ۳۲ نویسه.

**انصراف:** برای غیرفعالکردن کامل سازوکار توکن CLI، مقدار
`OMNIROUTE_DISABLE_CLI_TOKEN=true` را (در محیط یا `.env`) تنظیم کنید؛ پس از آن،
تمام دسترسیها به یک کلید API صریح نیاز خواهند داشت. این کار در میزبانهای
چندکاربره توصیه میشود، زیرا `machine-id` به هر دستگاه اختصاص دارد (نه به هر
کاربر) و کاربر دیگری روی همان میزبان میتواند همان توکن را محاسبه کند.

## فایلها

| فایل                                      | هدف                                      |
| ----------------------------------------- | ---------------------------------------- |
| `src/lib/machineToken.ts`                 | مشتقسازی توکن (`getMachineTokenSync`)    |
| `bin/cli/utils/cliToken.mjs`              | پیادهسازی متناظر مشتقسازی در سمت CLI     |
| `<DATA_DIR>/cli-token-salt.json`          | salt تصادفی ذخیرهشدهٔ مختص هر نصب        |
| `src/server/authz/headers.ts`             | ثابت `CLI_TOKEN_HEADER`                  |
| `src/server/authz/policies/management.ts` | اعتبارسنجی در سمت سرور                   |
| `src/server/authz/routeGuard.ts`          | بررسی میزبان loopback (`isLoopbackHost`) |

## همچنین ببینید

- `docs/security/ROUTE_GUARD_TIERS.md` — سطوح محافظت از مسیر
- `docs/architecture/AUTHZ_GUIDE.md` — خط لولهٔ کامل مجوزدهی
