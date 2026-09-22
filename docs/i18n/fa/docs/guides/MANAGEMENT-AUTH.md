# Management Authentication (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute دارای **چهار خانوادهٔ اعتبارنامه** است که میتوانند مسیرهای مدیریتی را مجاز کنند.
این اعتبارنامهها قابلجایگزینی با یکدیگر نیستند. کلیدهای API استنتاج (`sk-…`) سرور را مدیریت **نمیکنند**، مگر اینکه صراحتاً دامنهٔ `manage` یا `admin` به آنها اعطا شده باشد.

پیادهسازی مرجع: `src/lib/api/requireManagementAuth.ts`.

| اعتبارنامه               | شکل متداول                         | محل ایجاد                                           | کاربرد موردنظر           | قابلیت مدیریتی                                                               |
| ------------------------ | ---------------------------------- | --------------------------------------------------- | ------------------------ | ---------------------------------------------------------------------------- |
| نشست JWT داشبورد         | کوکی `auth_token`                  | ورود به داشبورد                                     | رابط کاربری مرورگر       | مدیریت کامل داشبورد، مشروط به قوانین CSRF، محلیبودن و مسیرهای همیشهمحافظتشده |
| توکن machine-id برای CLI | داخلی / محلی                       | راهاندازی اولیهٔ CLI (`omniroute` روی همان دستگاه)  | CLI محلی                 | فقط مدیریت محلی                                                              |
| Access Token دامنهدار    | `oma_live_…`                       | **Settings → Access Tokens** یا `omniroute connect` | CLI راهدور و API مدیریتی | باید دامنهٔ الزامی مسیر، یعنی `read`، `write` یا `admin` را برآورده کند      |
| کلید API استنتاج         | `sk-…` (و سایر پیشوندهای کلید API) | **API Manager / API Keys**                          | استنتاج `/v1/*`          | **هیچکدام**، مگر اینکه فرادادهٔ کلید شامل `manage` یا `admin` باشد           |

اعتبارنامههای `oma_` مخصوص مدیریت/CLI هستند. آنها کلیدهای API استنتاج **نیستند**.

اگر احراز هویت از طریق ورود/کلید API برای سرور غیرفعال باشد، برخی مسیرهای مدیریتی ممکن است درخواستهای بدون احراز هویت را بپذیرند. مسیرهای صرفاً محلی و همیشهمحافظتشده همچنان قوانین خود را اعمال میکنند. بنابراین ارائهٔ یکی از این اعتبارنامهها در همهجا الزامی نیست و داشتن آن نیز بدون دامنهٔ موردنیاز و رعایت محلیبودن مسیر، در همهجا کافی نیست.

مرتبط: [حالت راهدور](./REMOTE-MODE.md) (نحوهٔ صدور `oma_live_…` برای یک CLI راهدور).

---

## ماتریسهای دامنه

این دو واژگان دامنه **متفاوتاند**. آنها را با هم ترکیب نکنید.

### دامنههای Access Token (`oma_live_…`)

| دامنه   | عملیات متداول                                                                                            |
| ------- | -------------------------------------------------------------------------------------------------------- |
| `read`  | درخواستهای GET برای فهرست/وضعیت که توکن اجازهٔ مشاهدهٔ آنها را دارد                                      |
| `write` | تغییرات سطح پایینتر از مدیر (ایجاد/بهروزرسانی/حذف)                                                       |
| `admin` | دسترسی کامل CLI راهدور / توکن اتصال (راهاندازی اولیه با گذرواژه بهطور پیشفرض از این دامنه استفاده میکند) |

توکنی با دامنهٔ `read` نمیتواند یک مسیر `write` را فراخوانی کند. قالب پیام زمان اجرا:
`دامنهٔ توکن دسترسی '<have>' کافی نیست؛ '<need>' الزامی است.`

### دامنههای مدیریتی کلید API

| دامنه     | معنا                                                                       |
| --------- | -------------------------------------------------------------------------- |
| (هیچکدام) | فقط استنتاج. مسیرهای مدیریتی کد 403 را برمیگردانند.                        |
| `manage`  | API مدیریتی (همان دروازهٔ شاخهٔ کلید API در `requireManagementAuth`)       |
| `admin`   | شرط `hasManageScope` را نیز برآورده میکند (دارای قابلیت مدیریت تلقی میشود) |

`manage` را برای کلید در رابط کاربری API Keys / API Manager فعال کنید. از کلید یک کلاینت چت برای خودکارسازی مجدداً استفاده نکنید، مگر اینکه عمداً آن دامنه را به کلید اعطا کرده باشید.

---

## نحوهٔ ایجاد و لغو

### نشست JWT داشبورد

1. `/login` را باز کنید و با گذرواژهٔ مدیریتی وارد شوید (`INITIAL_PASSWORD` در نخستین راهاندازی).
2. کوکی `auth_token` از نوع HttpOnly است. داشبورد مرورگر بهطور خودکار از آن استفاده میکند.
3. از طریق `/api/auth/logout` خارج شوید. هیچ راز بلندمدتی برای کپیکردن وجود ندارد.

### توکن machine-id برای CLI

1. `omniroute` را روی **همان میزبان** سرور (loopback) اجرا کنید.
2. CLI یک توکن machine-id را در `~/.omniroute/` راهاندازی میکند (chmod 600).
3. این روش از دستگاه دیگری کار **نمیکند**. برای CLI راهدور از Access Token استفاده کنید.

### Access Token دامنهدار (`oma_live_…`)

1. داشبورد: **Settings → Access Tokens** → ایجاد (نام + دامنه). **راز فقط یکبار نمایش داده میشود.**
2. یا CLI: `omniroute connect <host>` (گذرواژه ← توکن). به [حالت راهدور](./REMOTE-MODE.md) مراجعه کنید.
3. سرآیند: `Authorization: Bearer oma_live_…`
4. از همان صفحهٔ Access Tokens آن را لغو کنید (یا زمینهٔ CLI را حذف کنید).
5. سرور فقط یک هش را ذخیره میکند. با متن سادهٔ آن مانند گذرواژه رفتار کنید.

### کلید API دارای دامنهٔ manage

1. داشبورد: **API Manager / API Keys** → یک کلید ایجاد یا ویرایش کنید → `manage` (یا `admin`) را فعال کنید.
2. سرآیند: `Authorization: Bearer sk-…` (پیشوند واقعی کلید).
3. کلید را لغو کنید یا `manage` را در همان رابط کاربری از آن بردارید.
4. برای خودکارسازیهایی که CLI نیستند، اصل حداقل سطح دسترسی را رعایت کنید: برای کارهایی که فقط از GET استفاده میکنند، یک Access Token با دامنهٔ `read` را ترجیح دهید؛ تنها زمانی از `manage` روی یک کلید API استفاده کنید که فراخواننده باید هم با `/v1` و هم با بخش مدیریت ارتباط برقرار کند.

---

## قالب هدر

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

اعتبارنامههای مدیریتی را در مسیر URL یا رشتهٔ پرسوجو قرار ندهید. احراز هویت
مدیریتی فقط از طریق هدر/کوکی انجام میشود.

---

## مثالهای آمادهٔ کپی و جایگذاری

فقطخواندنی (فهرستکردن ارائهدهندگان). از یک Access Token با سطح دسترسی `read` استفاده کنید:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

تغییردهنده (ایجاد اتصال به یک ارائهدهنده). از Access Token با سطح دسترسی `write`/`admin` یا یک
کلید API با دامنهٔ `manage` استفاده کنید:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

استنتاج (غیرمدیریتی). کلید API معمولی؛ نیازی به `manage` نیست:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## خطاهای فعلی زمان اجرا (مقادیر محرمانه را بازتاب ندهید)

| وضعیت                                      | کد وضعیت معمول | پیام (پاکسازیشده)                                                            |
| ------------------------------------------ | -------------- | ---------------------------------------------------------------------------- |
| بدون اعتبارنامه                            | 401            | `احراز هویت الزامی است`                                                      |
| `oma_live_…` نامعتبر/منقضیشده              | 401            | `توکن دسترسی نامعتبر یا منقضیشده است`                                        |
| کلید API معتبر بدون `manage`/`admin`       | 403            | `کلید API فاقد دامنهٔ 'manage' است. آن را در داشبورد کلیدهای API فعال کنید.` |
| کلید API معمولی نامعتبر در یک مسیر مدیریتی | 403            | `توکن مدیریتی نامعتبر است`                                                   |
| ناکافیبودن سطح دسترسی Access Token         | 403            | `سطح دسترسی توکن '<have>' کافی نیست؛ سطح '<need>' لازم است.`                 |

«توکن مدیریتی نامعتبر است» یعنی توکن bearer بهعنوان یک اعتبارنامهٔ مدیریتی
پذیرفته **نشده** است. این پیام مشخص نمیکند که باید کدام نوع را ایجاد کنید. از جدول بالا استفاده کنید:
کلیدهای استنتاج به دامنهٔ `manage` نیاز دارند؛ CLI راهدور به `oma_live_…` نیاز دارد؛ و داشبورد
از کوکی نشست استفاده میکند.

---

## انتخاب پیشنهادی با کمترین سطح دسترسی

| فراخواننده                                      | مورد استفاده                               |
| ----------------------------------------------- | ------------------------------------------ |
| مرورگر                                          | نشست داشبورد                               |
| CLI روی میزبان سرور                             | توکن ماشین                                 |
| CLI روی لپتاپی که با سرور راهدور ارتباط دارد    | `oma_live_…` از `omniroute connect`        |
| CI / اسکریپتها (فقط مدیریتی)                    | `oma_live_…` با کمترین سطح دسترسی موردنیاز |
| CI که باید هم `/v1` و هم `/api` را فراخوانی کند | کلید API با `manage` **یا** دو اعتبارنامه  |
