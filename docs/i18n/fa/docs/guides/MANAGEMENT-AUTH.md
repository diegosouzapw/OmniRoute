# Management Authentication (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute دارای **چهار خانواده اعتبارنامه** است که میتوانند مسیرهای مدیریتی را احراز هویت کنند.
آنها قابل تعویض نیستند. کلیدهای API استنتاجی (`sk-…`) سرور را **مدیریت نمیکنند** مگر اینکه صراحتاً دامنه `manage` یا `admin` به آنها اعطا شده باشد.

پیادهسازی متعارف: `src/lib/api/requireManagementAuth.ts`.

| اعتبارنامه           | فرم معمول                          | محل ایجاد                                           | کاربرد مورد نظر             | قابلیت مدیریت                                                               |
| :------------------- | :--------------------------------- | :-------------------------------------------------- | :-------------------------- | :-------------------------------------------------------------------------- |
| نشست JWT داشبورد     | `auth_token` کوکی                  | ورود به داشبورد                                     | رابط کاربری مرورگر          | مدیریت کامل داشبورد، مشروط به CSRF، محلیت، و قوانین مسیرهای همیشه محافظتشده |
| توکن شناسه ماشین CLI | داخلی / محلی                       | راهاندازی CLI (`omniroute` روی همان ماشین)          | CLI محلی                    | فقط مدیریت محلی                                                             |
| توکن دسترسی محدود    | `oma_live_…`                       | **تنظیمات ← توکنهای دسترسی** یا `omniroute connect` | CLI از راه دور و API مدیریت | باید دامنه `read`، `write` یا `admin` مورد نیاز مسیر را برآورده کند         |
| کلید API استنتاجی    | `sk-…` (و سایر پیشوندهای کلید API) | **مدیر API / کلیدهای API**                          | استنتاج `/v1/*`             | **هیچکدام** مگر اینکه فراداده کلید شامل `manage` یا `admin` باشد            |

اعتبارنامههای `oma_` اعتبارنامههای مدیریتی/CLI هستند. آنها کلیدهای API استنتاجی **نیستند**.

اگر احراز هویت با ورود/کلید API برای سرور غیرفعال باشد، برخی مسیرهای مدیریتی ممکن است تماسهای احراز هویت نشده را بپذیرند. مسیرهای فقط محلی و همیشه محافظتشده همچنان قوانین خود را اعمال میکنند. بنابراین، ارائه یکی از این اعتبارنامهها به طور جهانی اجباری نیست، و داشتن یکی از آنها بدون دامنه مورد نیاز و محلیت مسیر به طور جهانی کافی نیست.

مرتبط: [حالت از راه دور](./REMOTE-MODE.md) (نحوه ایجاد `oma_live_…` برای یک CLI از راه دور).

---

## ماتریسهای اسکوپ

اسکوپهای مدیریت کلید API و اسکوپهای توکن دسترسی، واژگان متفاوتی هستند.
اسکوپهای ابزار MCP یک واژگان سوم هستند که با `scopeMatches` بررسی میشوند، نه با هیچ یک از توابع موجود در جداول زیر.
مقایسه جانبی: [سه فضای نام اسکوپ](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### اسکوپهای توکن دسترسی (`oma_live_…`)

| اسکوپ   | عملیات معمول                                                                        |
| ------- | ----------------------------------------------------------------------------------- |
| `read`  | دریافتهای (GET) لیست/وضعیت که توکن مجاز به مشاهده آنها است                          |
| `write` | تغییرات (ایجاد/بهروزرسانی/حذف) پایینتر از سطح ادمین                                 |
| `admin` | توکن کامل CLI از راه دور / اتصال (پیشفرضهای راهاندازی رمز عبور در اینجا قرار دارند) |

یک توکن با `read` نمیتواند یک مسیر `write` را فراخوانی کند. شکل پیام زمان اجرا:
`Access token scope '<have>' is insufficient; '<need>' required.`

### اسکوپهای مدیریت کلید API

| اسکوپ     | معنی                                                                                 |
| --------- | ------------------------------------------------------------------------------------ |
| (هیچکدام) | فقط استنتاج. مسیرهای مدیریتی کد 403 را برمیگردانند.                                  |
| `manage`  | API مدیریتی (همان دروازه شاخه کلید API `requireManagementAuth`)                      |
| `admin`   | همچنین `hasManageScope` را برآورده میکند (به عنوان قابلیت مدیریت در نظر گرفته میشود) |

اسکوپ `manage` را روی کلید در رابط کاربری API Keys / API Manager فعال کنید. کلید یک کلاینت چت را برای اتوماسیون مجدداً استفاده نکنید، مگر اینکه عمداً آن اسکوپ را اعطا کرده باشید.

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

## خطاهای زمان اجرا فعلی (اسرار را بازتاب ندهید)

| وضعیت                                       | وضعیت معمول | پیام (پاکسازی شده)                                                          |
| :------------------------------------------ | :---------- | :-------------------------------------------------------------------------- |
| عدم وجود اعتبارنامه                         | 401         | `احراز هویت لازم است`                                                       |
| `oma_live_…` نامعتبر/منقضی شده              | 401         | `توکن دسترسی نامعتبر یا منقضی شده`                                          |
| کلید API معتبر بدون دسترسی `manage`/`admin` | 403         | `کلید API فاقد دامنه 'manage' است. آن را در داشبورد کلیدهای API فعال کنید.` |
| کلید API عادی نامعتبر در یک مسیر مدیریتی    | 403         | `توکن مدیریتی نامعتبر`                                                      |
| دامنه توکن دسترسی بسیار پایین است           | 403         | `دامنه توکن دسترسی '<have>' کافی نیست؛ '<need>' لازم است.`                  |

"توکن مدیریتی نامعتبر" به این معنی است که حامل به عنوان یک اعتبارنامه مدیریتی **پذیرفته نشده است**. این به شما نمیگوید که کدام خانواده را ایجاد کنید. از جدول بالا استفاده کنید: کلیدهای استنتاج به دامنه `manage` نیاز دارند؛ CLI از راه دور به `oma_live_…` نیاز دارد؛ داشبورد از کوکی نشست استفاده میکند.

---

## انتخاب توصیه شده با حداقل امتیاز

| فراخواننده                                      | کاربرد                                    |
| :---------------------------------------------- | :---------------------------------------- |
| مرورگر                                          | نشست داشبورد                              |
| CLI روی میزبان سرور                             | توکن ماشین                                |
| CLI روی لپتاپ در حال ارتباط با سرور راه دور     | `oma_live_…` از `omniroute connect`       |
| CI / اسکریپتها (فقط مدیریت)                     | `oma_live_…` با کوچکترین دامنه کاری       |
| CI که باید هر دو `/v1` و `/api` را فراخوانی کند | کلید API با `manage` **یا** دو اعتبارنامه |
