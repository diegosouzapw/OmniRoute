# 🌐 OmniRoute Proxy Guide (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **محدودیتهای جغرافیایی را دور بزنید، از هویت خود محافظت کنید و ترافیک هوش مصنوعی را از طریق هر پراکسی مسیریابی کنید — بدون هیچگونه پیچیدگی در پیکربندی.**

OmniRoute شامل یک سیستم مدیریت پراکسی با امکانات کامل است که به شما اجازه میدهد ترافیک ارائهدهندگان بالادستی هوش مصنوعی را از طریق پراکسیهای HTTP، HTTPS یا SOCKS5 مسیریابی کنید. چه در منطقهای مسدودشده باشید، چه به چرخش IP نیاز داشته باشید یا بخواهید از انگشتنگاری مخفیانه استفاده کنید — این راهنما همهچیز را پوشش میدهد.

---

## فهرست مطالب

- [چرا از پراکسیها استفاده کنیم؟](#why-use-proxies)
- [نمای کلی معماری](#architecture-overview)
- [سیستم پراکسی ۴سطحی](#4-level-proxy-system)
- [رجیستری پراکسی (CRUD)](#proxy-registry-crud)
- [بازار رایگان 1proxy](#1proxy-free-proxy-marketplace)
- [چرخش پراکسی](#proxy-rotation)
- [ضدشناسایی و حالت مخفی](#anti-detection--stealth)
- [حالتهای پراکسی بالادستی](#upstream-proxy-modes)
- [رابط کاربری داشبورد](#dashboard-ui)
- [مرجع API](#api-reference)
- [متغیرهای محیطی](#environment-variables)
- [عیبیابی](#troubleshooting)

---

## چرا از پراکسیها استفاده کنیم؟

بسیاری از ارائهدهندگان هوش مصنوعی، دسترسی را بر اساس منطقه جغرافیایی محدود میکنند. توسعهدهندگان در **روسیه، چین، ایران، کوبا، ترکیه** و سایر کشورها با خطاهایی مانند مورد زیر مواجه میشوند:

```
unsupported_country_region_territory
```

حتی خارج از مناطق مسدودشده نیز پراکسیها برای موارد زیر مفید هستند:

| مورد استفاده                  | توضیحات                                                           |
| ----------------------------- | ----------------------------------------------------------------- |
| **دور زدن محدودیت جغرافیایی** | دسترسی به OpenAI، Anthropic، Codex و Copilot از کشورهای مسدودشده  |
| **چرخش IP**                   | توزیع درخواستها میان چندین IP برای جلوگیری از محدودیت نرخ درخواست |
| **حریم خصوصی**                | پنهانکردن IP واقعی شما از ارائهدهندگان بالادستی                   |
| **انطباق**                    | مسیریابی ترافیک از طریق حوزههای قضایی مشخص                        |
| **آزمایش**                    | شبیهسازی درخواستها از مناطق مختلف                                 |

---

## نمای کلی معماری

```
┌───────────────────────────────────────────────────────────────┐
│                       سرور OmniRoute                          │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ رجیستری     │    │ توزیعکننده  │    │ واکشی            │  │
│  │ پراکسی      │───▶│ پراکسی       │───▶│ (undici)         │  │
│  │ (SQLite)    │    │ (کششده)     │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ همگامسازی  │                        │ API ارائهدهنده  │  │
│  │ 1proxy      │                        │ بالادستی         │  │
│  │ (مخزن رایگان)│                       │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### مؤلفههای کلیدی

| مؤلفه                  | فایل                                         | نقش                                                                |
| ---------------------- | -------------------------------------------- | ------------------------------------------------------------------ |
| **رجیستری پراکسی**     | `src/lib/db/proxies.ts`                      | عملیات CRUD برای ورودیهای پراکسی و تخصیص محدودهها                  |
| **توزیعکننده پراکسی**  | `open-sse/utils/proxyDispatcher.ts`          | ایجاد توزیعکنندههای ProxyAgent/SOCKS مربوط به `undici` همراه با کش |
| **واکشی پراکسی**       | `open-sse/utils/proxyFetch.ts`               | پوششدهی `fetch()` همراه با تزریق توزیعکننده پراکسی                 |
| **مسیر تنظیمات**       | `src/app/api/settings/proxy/route.ts`        | API قدیمی پیکربندی پراکسی (GET/PUT/DELETE)                         |
| **مسیر مدیریت**        | `src/app/api/v1/management/proxies/route.ts` | API عملیات CRUD رجیستری (GET/POST/PATCH/DELETE)                    |
| **پایگاه داده 1proxy** | `src/lib/db/oneproxy.ts`                     | ذخیرهسازی پایدار بازار پراکسی رایگان                               |

---

## سیستم پروکسی ۴ سطحی

OmniRoute از پیکربندی پروکسی در **چهار محدوده مستقل** پشتیبانی میکند که بهترتیب اولویت تعیین میشوند:

```
ترتیب تعیین اولویت (بالاترین → پایینترین):

  1. 🔵 پروکسی حساب/اتصال         →  برای هر کلید API / اتصال OAuth
  2. 🟡 پروکسی ارائهدهنده         →  برای هر ارائهدهنده (برای مثال، تمام ترافیک OpenAI)
  3. 🟠 پروکسی ترکیبی              →  برای هر پیکربندی ترکیبی/مسیریابی
  4. 🟢 پروکسی سراسری              →  تمام ترافیک، همه ارائهدهندگان
```

### نحوه تعیین پروکسی

هنگامی که OmniRoute درخواستی را به یک ارائهدهنده بالادستی ارسال میکند، تابع `resolveProxyForConnectionFromRegistry()` را فراخوانی میکند که هر سطح را بهترتیب بررسی میکند:

1. **سطح حساب** — آیا پروکسیای به این شناسه اتصال خاص اختصاص داده شده است؟
2. **سطح ارائهدهنده** — آیا پروکسیای به این ارائهدهنده (برای مثال، `openai`) اختصاص داده شده است؟
3. **سطح سراسری** — آیا یک پروکسی سراسری پیکربندی شده است؟
4. **بدون پروکسی** — اتصال مستقیم به ارائهدهنده.

اولین مورد منطبق انتخاب میشود. این یعنی میتوانید یک پروکسی سراسری را بهعنوان گزینه جایگزین تنظیم کنید، اما آن را برای ارائهدهندگان یا اتصالهای خاص بازنویسی کنید.

### چه ترافیکی از پروکسی عبور میکند

| نوع ترافیک       | از پروکسی عبور میکند؟ | توضیحات                                                    |
| ---------------- | --------------------- | ---------------------------------------------------------- |
| تکمیلهای چت      | ✅                    | تمام درخواستهای `/v1/chat/completions`                     |
| تعبیهسازیها      | ✅                    | `/v1/embeddings`                                           |
| تولید تصویر      | ✅                    | `/v1/images/generations`                                   |
| صوت (TTS/STT)    | ✅                    | `/v1/audio/*`                                              |
| تبادل توکن OAuth | ✅                    | خطای `unsupported_country_region_territory` را برطرف میکند |
| آزمایش اتصالها   | ✅                    | دکمه «آزمایش اتصال» از پروکسی استفاده میکند                |
| نوسازی توکن      | ✅                    | تمدید OAuth در پسزمینه                                     |
| همگامسازی مدل    | ✅                    | فهرستکردن و شناسایی مدل                                    |

---

## رجیستری پروکسی (CRUD)

رجیستری پروکسی یک جدول SQLite با نام (`proxy_registry`) است که تمام پروکسیهای شما را ذخیره میکند. هر پروکسی دارای فیلدهای زیر است:

| فیلد       | نوع      | توضیحات                                           |
| ---------- | -------- | ------------------------------------------------- |
| `id`       | UUID     | شناسه یکتا                                        |
| `name`     | رشته     | برچسب خوانا برای انسان                            |
| `type`     | رشته     | پروتکل: `http`، `https`، `socks5`                 |
| `host`     | رشته     | نام میزبان یا IP پروکسی                           |
| `port`     | عدد صحیح | شماره درگاه                                       |
| `username` | رشته     | نام کاربری احراز هویت (رمزگذاریشده در حالت ذخیره) |
| `password` | رشته     | گذرواژه احراز هویت (رمزگذاریشده در حالت ذخیره)    |
| `region`   | رشته     | برچسب منطقه جغرافیایی                             |
| `notes`    | رشته     | یادداشتهای متنی آزاد                              |
| `status`   | رشته     | `active` یا `inactive`                            |
| `source`   | رشته     | `manual` یا `oneproxy`                            |

### ایجاد یک پروکسی

**از طریق داشبورد:**

1. به **تنظیمات → پروکسی** بروید
2. روی **افزودن پروکسی** کلیک کنید
3. نوع، میزبان، درگاه و اطلاعات اختیاری احراز هویت را وارد کنید
4. ذخیره کنید

**از طریق API:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### بهروزرسانی یک پروکسی

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **توجه:** اطلاعات احراز هویت حفظ میشوند، مگر اینکه صراحتاً مقادیر جایگزین غیرخالی ارسال کنید. ارسال رشتههای خالی برای `username`/`password` باعث حفظ مقادیر ذخیرهشده میشود.

### حذف یک پروکسی

```bash
# اگر پروکسی به هر محدودهای اختصاص داده شده باشد، ناموفق خواهد بود
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# حذف اجباری (اختصاصها را نیز حذف میکند)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### فهرستکردن پروکسیها

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### اختصاص پروکسیها به محدودهها

```bash
# اختصاص به محدوده سراسری
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# اختصاص به یک ارائهدهنده خاص
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# اختصاص به یک اتصال/کلید خاص
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### تعیین پروکسی مؤثر

بررسی کنید که برای یک اتصال مشخص از کدام پروکسی استفاده خواهد شد:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

پروکسی تعیینشده را بههمراه سطح آن (`account`، `provider` یا `global`) و منبع بازمیگرداند.

### اختصاص گروهی

یک پروکسی را بهطور همزمان به چند ارائهدهنده یا اتصال اختصاص دهید:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### واردکردن/صادرکردن

پروکسیها در سیستم **پشتیبانگیری/بازیابی** گنجانده میشوند. هنگامی که پیکربندی OmniRoute خود را صادر میکنید:

1. به **داشبورد → تنظیمات → پشتیبانگیری** بروید
2. روی **صدور** کلیک کنید — رجیستری پروکسی و اختصاصها نیز گنجانده میشوند
3. برای بازیابی، روی **ورود** کلیک کرده و فایل پشتیبان را بارگذاری کنید

رجیستری پروکسی همچنین از **upsert بر اساس host+port** پشتیبانی میکند — اگر پروکسیای را وارد کنید که از قبل وجود دارد (با میزبان و درگاه یکسان)، بهجای ایجاد یک مورد تکراری، همان پروکسی بهروزرسانی میشود.

### مهاجرت قدیمی

اگر پراکسیها را در نسخهای قدیمیتر (پیش از رجیستری) پیکربندی کردهاید، OmniRoute آنها را بهطور خودکار مهاجرت میدهد:

```
ذخیرهساز قدیمی key_value → proxy_registry + proxy_assignments
```

این فرایند پس از ارتقا، هنگام اولین راهاندازی فقط یکبار انجام میشود. برای اجرای مجدد، از `migrateLegacyProxyConfigToRegistry({ force: true })` استفاده کنید.

---

## بازار پراکسی رایگان 1proxy

> 🆕 **مشارکت توسط [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (Issue [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute با پلتفرم جامعهمحور **[1proxy](https://1proxy-api.aitradepulse.com)** یکپارچه میشود تا دسترسی به **صدها پراکسی رایگان و اعتبارسنجیشده** از سراسر جهان را فراهم کند. این قابلیت برای کاربرانی که زیرساخت پراکسی اختصاصی ندارند، ایدئال است.

### نحوه عملکرد

```
┌─────────────┐  همگامسازی  ┌─────────────────┐    چرخش      ┌──────────┐
│  1proxy API │ ────────────▶ │  proxy_registry  │ ────────────▶ │ ارائهدهنده │
│   (خارجی)   │  تا ۵۰۰       │  source=oneproxy │ بر اساس کیفیت │    API     │
└─────────────┘    پراکسی     └─────────────────┘               └──────────┘
```

1. **همگامسازی** — OmniRoute پراکسیهای اعتبارسنجیشده را از 1proxy API دریافت میکند
2. **ذخیرهسازی** — پراکسیها در همان جدول `proxy_registry` و با `source = 'oneproxy'` ذخیره میشوند
3. **فیلتر** — فیلتر بر اساس پروتکل، کشور و امتیاز کیفیت
4. **چرخش** — انتخاب بهترین پراکسی با استفاده از راهبردهای مبتنی بر کیفیت، تصادفی یا ترتیبی
5. **تنزل خودکار** — امتیاز کیفیت پراکسیهای ناموفق کاهش مییابد؛ پایینتر از آستانه ← بهعنوان غیرفعال علامتگذاری میشوند

### همگامسازی پراکسیها

**از طریق داشبورد:**

1. به زبانه **Settings → 1proxy** بروید
2. روی **"Sync Now"** کلیک کنید
3. آمار را مشاهده کنید: تعداد کل پراکسیها، تعداد فعالها، میانگین کیفیت و تفکیک بر اساس کشور

**از طریق API:**

```bash
# آغاز همگامسازی
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# پاسخ:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### فیلترکردن پراکسیها

```bash
# فیلتر بر اساس پروتکل
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# فیلتر بر اساس کشور
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# فیلتر بر اساس حداقل امتیاز کیفیت
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# ترکیب فیلترها
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### امتیازهای کیفیت پراکسی

هر پراکسی 1proxy دارای فرادادههای زیر است:

| فیلد            | توضیحات                                                 |
| --------------- | ------------------------------------------------------- |
| `qualityScore`  | امتیاز 0-100 حاصل از اعتبارسنجی 1proxy                  |
| `latencyMs`     | تأخیر اندازهگیریشده شبکه                                |
| `anonymity`     | `transparent`، `anonymous` یا `elite`                   |
| `googleAccess`  | آیا پراکسی میتواند به سرویسهای Google دسترسی داشته باشد |
| `countryCode`   | کد دوحرفی ISO کشور                                      |
| `lastValidated` | مُهر زمانی آخرین اعتبارسنجی                             |

امتیازهای کیفیت بهصورت پویا تنظیم میشوند:

- **درخواستهای ناموفق** امتیاز را ۱۰ واحد کاهش میدهند
- **کاهش امتیاز به ≤10** ← پراکسی بهعنوان `inactive` علامتگذاری میشود
- پراکسیهای غیرفعال از چرخش کنار گذاشته میشوند

### راهبردهای چرخش

```bash
# چرخش بر اساس کیفیت (ابتدا بهترین پراکسی) — پیشفرض
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# چرخش تصادفی
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# ترتیبی (ابتدا پراکسیای که مدت بیشتری از آخرین اعتبارسنجی آن گذشته است)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### قطعکننده مدار

همگامسازی 1proxy دارای یک قطعکننده مدار داخلی است:

- پس از **۵ شکست متوالی در همگامسازی**، تلاشهای بعدی برای همگامسازی مسدود میشوند
- بازنشانی با `resetOneproxyCircuitBreaker()` یا راهاندازی مجدد سرور
- وضعیت همگامسازی در `GET /api/settings/oneproxy?action=status` در دسترس است

### پاککردن پراکسیهای 1proxy

```bash
# حذف یک پراکسی 1proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# پاککردن همه پراکسیهای 1proxy (پراکسیهای دستی دستنخورده باقی میمانند)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## مقابله با شناسایی و پنهانکاری

OmniRoute صرفاً ترافیک را از طریق یک پروکسی مسیریابی نمیکند — بلکه کاری میکند ترافیک معتبر به نظر برسد:

### جعل اثر انگشت TLS

از `wreq-js` برای ایجاد اثر انگشتهای TLS مشابه مرورگر استفاده میکند و بدین ترتیب سامانههای تشخیص ربات را که دستدهیهای TLS غیرمرورگری را علامتگذاری میکنند، دور میزند.

### تطبیق اثر انگشت CLI

**کلید تغییر وضعیت اثر انگشت CLI** (`Settings → Security`) سرآیندهای HTTP و فیلدهای بدنه JSON را مجدداً مرتب میکند تا دقیقاً با امضای باینریهای بومی CLI (Claude Code، Codex و غیره) مطابقت داشته باشند. این قابلیت **علاوه بر** پروکسی عمل میکند:

```
IP شما (مسدودشده) → IP پروکسی (US) → API ارائهدهنده
                    + جعل TLS
                    + اثر انگشت CLI
```

بهصورت همزمان هم از **پنهانسازی IP** و هم از **اصالت درخواست** بهرهمند میشوید.

### حفظ IP پروکسی

نشانهای رنگی در داشبورد مشخص میکنند که کدام سطح پروکسی فعال است:

| نشان | سطح        | مفهوم                                          |
| ---- | ---------- | ---------------------------------------------- |
| 🟢   | سراسری     | تمام ترافیک از طریق این پروکسی عبور میکند      |
| 🟡   | ارائهدهنده | فقط ترافیک این ارائهدهنده از پروکسی عبور میکند |
| 🔵   | اتصال      | این کلید/حساب مشخص از این پروکسی استفاده میکند |

این نشان همچنین IP نهایی پروکسی را برای تأیید نمایش میدهد.

---

## حالتهای پروکسی بالادستی

برای ارائهدهندگانی که از الگوی CLIProxyAPI استفاده میکنند، OmniRoute از سه حالت پروکسی بالادستی پشتیبانی میکند:

| حالت          | توضیحات                                                                 |
| ------------- | ----------------------------------------------------------------------- |
| `native`      | OmniRoute مسیریابی پروکسی را مستقیماً مدیریت میکند (پیشفرض)             |
| `cliproxyapi` | مدیریت را به یک نمونه خارجی CLIProxyAPI واگذار میکند                    |
| `fallback`    | ابتدا حالت بومی را امتحان میکند و در صورت شکست به CLIProxyAPI بازمیگردد |

پیکربندی برای هر ارائهدهنده:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## رابط کاربری داشبورد

### تنظیمات → زبانه پروکسی

- پیکربندی **پروکسی سراسری** (یکبار برای تمام ترافیک تنظیم میشود)
- بازنویسیهای **پروکسی مختص هر ارائهدهنده**
- تخصیصهای **پروکسی مختص هر اتصال**
- **آزمایش اتصال** از طریق پروکسی پیکربندیشده
- **نشانهای رنگی** برای نمایش سطح پروکسی فعال

### تنظیمات → زبانه 1proxy

- دکمه **همگامسازی اکنون** برای دریافت پروکسیهای رایگان
- **کارتهای آمار**: مجموع، فعال، میانگین کیفیت، آخرین همگامسازی
- **فیلترها**: پروتکل، کد کشور، حداقل کیفیت
- **جدول پروکسی** شامل میزبان، پروتکل، کشور، امتیاز کیفیت، تأخیر، ناشناسبودن و دسترسی به Google
- پنل **وضعیت همگامسازی** با ردیابی موفقیت/شکست و تعداد شکستهای متوالی
- گزینه **پاککردن همه** برای حذف تمام ورودیهای 1proxy

---

## مرجع API

### API تنظیمات پروکسی

| متد      | نقطه پایانی                                    | توضیحات                     |
| -------- | ---------------------------------------------- | --------------------------- |
| `GET`    | `/api/settings/proxy`                          | دریافت پیکربندی کامل پروکسی |
| `GET`    | `/api/settings/proxy?level=global`             | دریافت پروکسی سراسری        |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | دریافت پروکسی ارائهدهنده    |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | تعیین پروکسی مؤثر           |
| `PUT`    | `/api/settings/proxy`                          | بهروزرسانی پیکربندی پروکسی  |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | حذف پروکسی در این سطح       |

### API رجیستری پروکسی

| متد      | نقطه پایانی                                       | توضیحات                    |
| -------- | ------------------------------------------------- | -------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | فهرست تمام پروکسیها        |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | دریافت پروکسی براساس شناسه |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | دریافت تخصیصهای پروکسی     |
| `POST`   | `/api/v1/management/proxies`                      | ایجاد پروکسی               |
| `PATCH`  | `/api/v1/management/proxies`                      | بهروزرسانی پروکسی          |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | حذف پروکسی                 |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | حذف اجباری                 |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | تخصیص گروهی                |
| `GET`    | `/api/v1/management/proxies/assignments`          | فهرست تخصیصها              |
| `GET`    | `/api/v1/management/proxies/health`               | آمار سلامت پروکسی          |

### API تونلها

برای در معرض اینترنت عمومی قرار دادن نمونه OmniRoute خود (Cloudflare/ngrok/Tailscale)، بهجای مسیریابی ترافیک خروجی از طریق پروکسی، به [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md) مراجعه کنید. API مبتنی بر REST تونل در مسیر `/api/tunnels/{cloudflared,ngrok,tailscale}/*` قرار دارد و از زنجیره پروکسی خروجی مستندسازیشده در بالا مستقل است.

### API مربوط به 1proxy

| متد      | نقطه پایانی                            | توضیحات                       |
| -------- | -------------------------------------- | ----------------------------- |
| `GET`    | `/api/settings/oneproxy`               | فهرست پروکسیهای 1proxy        |
| `GET`    | `/api/settings/oneproxy?action=stats`  | دریافت آمار و وضعیت همگامسازی |
| `GET`    | `/api/settings/oneproxy?action=status` | فقط دریافت وضعیت همگامسازی    |
| `POST`   | `/api/settings/oneproxy`               | آغاز همگامسازی                |
| `POST`   | `/api/settings/oneproxy/rotate`        | چرخش به پروکسی بعدی           |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | حذف یک مورد                   |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | پاککردن همه                   |

### API پروکسی بالادستی

| متد      | نقطه پایانی                       | توضیحات                         |
| -------- | --------------------------------- | ------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | دریافت پیکربندی پروکسی بالادستی |
| `PUT`    | `/api/upstream-proxy/:providerId` | تنظیم حالت پروکسی بالادستی      |
| `DELETE` | `/api/upstream-proxy/:providerId` | حذف پیکربندی پروکسی بالادستی    |

---

## متغیرهای محیطی

| متغیر                 | پیشفرض | توضیحات                                                                           |
| --------------------- | ------ | --------------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true` | فعالکردن پشتیبانی از پروکسی SOCKS5 (پیشفرض در `.env.example` برابر با `true` است) |

---

## عیبیابی

### «پروکسی SOCKS5 غیرفعال است»

در فایل `.env` خود مقدار `ENABLE_SOCKS5_PROXY=true` را تنظیم کنید و سرویس را مجدداً راهاندازی کنید.

### خطاهای «socket hang up» هنگام استفاده از پروکسی

این رفتار در پروکسیهای ارزانقیمتی که اتصالهای بیکار را قطع میکنند، طبیعی است. OmniRoute از قبل این وضعیت را به روشهای زیر مدیریت میکند:

- غیرفعالکردن keep-alive در اتصالهای پروکسی (`keepAliveTimeout: 1`)
- غیرفعالکردن پایپلاینسازی (`pipelining: 0`)
- ذخیرهسازی dispatcherها در کش برای جلوگیری از handshakeهای تکراری

اگر مشکل ادامه داشت، پروکسی دیگری را امتحان کنید یا از قابلیت چرخش 1proxy استفاده کنید.

### خطای «unsupported_country_region_territory» هنگام OAuth

مطمئن شوید که پروکسی را **پیش از** آغاز جریان OAuth پیکربندی کردهاید. OmniRoute تبادل توکن OAuth را از طریق پروکسی پیکربندیشده هدایت میکند. ابتدا یک پروکسی سراسری یا در سطح ارائهدهنده تنظیم کنید و سپس متصل شوید.

### پروکسی استفاده نمیشود

ترتیب تفکیک را بررسی کنید:

1. با `GET /api/settings/proxy?resolve=your-connection-id` بررسی کنید
2. بررسی کنید که `status` پروکسی برابر با `active` باشد (نه `inactive`)
3. مطمئن شوید که دامنه تخصیص پروکسی با اتصال شما مطابقت دارد

### شکست همگامسازی 1proxy

وضعیت همگامسازی را بررسی کنید:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

اگر `consecutiveFailures >= 5` باشد، مدارشکن فعال شده است. برای بازنشانی، سرور را مجدداً راهاندازی کنید یا منتظر بازنشانی دستی بمانید.

---

## شِمای پایگاه داده

### جدول `proxy_registry`

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' یا 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (فقط 1proxy)
  latency_ms INTEGER,                        -- میلیثانیه (فقط 1proxy)
  anonymity TEXT,                            -- transparent/anonymous/elite
  google_access INTEGER DEFAULT 0,           -- آیا میتواند به Google دسترسی داشته باشد؟ (1proxy)
  last_validated TEXT,                       -- برچسب زمانی ISO (1proxy)
  country_code TEXT,                         -- کد دوحرفی ISO (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### جدول `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global'، 'provider'، 'account'، 'combo'
  scope_id TEXT,              -- شناسه ارائهدهنده، شناسه اتصال یا شناسه combo
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## بررسی سلامت پروکسی (v3.8.16+)

سازوکار **شکست سریع پروکسی** در OmniRoute (`src/lib/proxyHealth.ts`) با یک بررسی سریع اتصال TCP، پروکسیهای ازکارافتاده را در کمتر از 2 ثانیه شناسایی میکند و سپس برای جلوگیری از سربار در هر درخواست، **نتیجه را در کش ذخیره میکند**.

### نحوه کار

```
درخواست ──▶ ProxyHealthCache.get(url)
             │
             ├─ اصابت به کش + تازه؟  ──▶ بازگرداندن وضعیت ذخیرهشده در کش
             │
             └─ عدم اصابت به کش / منقضی؟  ──▶ اتصال TCP به host:port
                                                (مهلت زمانی: FAST_FAIL_TIMEOUT_MS)
                                                ──▶ ذخیره در کش بهمدت HEALTH_CACHE_TTL_MS
                                                ──▶ بازگرداندن نتیجه
```

بدون این سازوکار، یک پروکسی ازکارافتاده پیش از شکست، هر درخواست را برای تمام مدت `PROXY_TIMEOUT_MS` (پیشفرض 30 ثانیه) مسدود میکند.

### متغیرهای محیطی قابل تنظیم

| متغیر                        | پیشفرض  | کاربرد                                   |
| ---------------------------- | ------- | ---------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`  | مهلت زمانی اتصال TCP برای هر بررسی سلامت |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000` | مدتزمان نگهداری نتیجه سلامت در کش        |

**مقادیر پیشنهادی:**

| سناریو                          | مهلت شکست سریع | TTL کش  | دلیل                                                                     |
| ------------------------------- | -------------- | ------- | ------------------------------------------------------------------------ |
| دروازه API با توان عملیاتی بالا | 1500ms         | 60000ms | شکست سریع تهاجمی و کش طولانیتر برای کاهش تعداد بررسیها                   |
| گرههای توزیعشده جغرافیایی       | 3000ms         | 15000ms | شبکههای کندتر به زمان بیشتری نیاز دارند؛ کش کوتاهتر برای تغییر مسیر سریع |
| توسعه / آزمایش                  | 1000ms         | 10000ms | تکرار سریع روی پروکسیهای محلی                                            |
| مخفیکاری / مقابله با شناسایی    | 2500ms         | 45000ms | جلوگیری از کاوش سریع که ممکن است محدودیت نرخ را فعال کند                 |

### بررسی سلامت پروکسی

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// بررسی مجدد اجباری یک پروکسی مشخص
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

پرچم `stale` زمانی برابر با `true` است که ورودی کش از `HEALTH_CACHE_TTL_MS` فراتر رفته باشد و درخواست بعدی یک بررسی تازه را فعال کند.

### پیشفرضهای مختص هر نوع پروکسی

بررسی سلامت بر اساس طرح URL از پیشفرضهای معقول استفاده میکند:

| طرح                        | پورت پیشفرض |
| -------------------------- | ----------- |
| `http://`                  | 8080        |
| `https://`                 | 443         |
| `socks5://` / `socks5h://` | 1080        |

پورتهای سفارشی در URL (`http://host:9999`) همیشه بر مقدار پیشفرض طرح اولویت دارند.

---

## تحلیل و مشاهدهپذیری پروکسی

OmniRoute میزان استفاده از هر پروکسی را ردیابی میکند تا به اپراتورها در تشخیص الگوهای مسیریابی، جهشهای تأخیر و خرابیهای تکرارشونده کمک کند.

### موارد ردیابیشده

OmniRoute برای هر درخواستی که از طریق یک پروکسی پیکربندیشده ارسال میشود، موارد زیر را ثبت میکند:

| معیار        | توضیحات                                              |
| ------------ | ---------------------------------------------------- |
| `proxy_url`  | URL کامل پروکسی (با پنهانسازی اطلاعات احراز هویت)    |
| `provider`   | شناسه ارائهدهنده بالادستی (openai، anthropic و غیره) |
| `latency_ms` | کل زمان رفتوبرگشت، شامل دستدهی پروکسی                |
| `connect_ms` | فقط زمان اتصال TCP                                   |
| `status`     | کد وضعیت HTTP دریافتی از سرویس بالادستی              |
| `error`      | کلاس خطا، در صورت ناموفق بودن درخواست                |
| `timestamp`  | زمان UTC با قالب ISO 8601                            |

### دسترسی به دادهها

```bash
# رویدادهای اخیر پروکسی
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

اندپوینت واقعی `/api/usage/proxy-logs` است (`src/app/api/usage/proxy-logs/route.ts` را ببینید). این اندپوینت از موارد زیر پشتیبانی میکند:

- `GET /api/usage/proxy-logs` — دریافت لاگهای پروکسی
- `DELETE /api/usage/proxy-logs` — پاککردن تمام لاگهای پروکسی

در صورت نیاز، آمار تجمیعی را میتوان مستقیماً با استفاده از SQL از جدول `proxy_logs` دریافت کرد. رابط کاربری داشبورد نیز ممکن است نماهای تجمیعی ارائه دهد.

### الگوهای رایج

**تشخیص یک پروکسی ناپایدار** (که بهطور متناوب موفق و ناموفق میشود):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**یافتن پروکسیهای کند** (تأخیر p95 بیشتر از ۲ ثانیه):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## درخت تصمیم راهبرد چرخش

هنگامی که چند پروکسی به یک محدوده اختصاص داده شده باشند، OmniRoute از یک **راهبرد چرخش** برای انتخاب پروکسی مورد استفاده در هر درخواست استفاده میکند. این راهبرد در سطح محدوده پیکربندی میشود (سراسری، بهازای هر ارائهدهنده، بهازای هر حساب یا بهازای هر ترکیب).

### راهبردهای موجود

| راهبرد             | زمان استفاده                               | موازنه                                                                                        |
| ------------------ | ------------------------------------------ | --------------------------------------------------------------------------------------------- |
| `quality` (پیشفرض) | محیط عملیاتی با پروکسیهایی با کیفیت متفاوت | پروکسیهای با امتیاز بالا را ترجیح میدهد؛ ممکن است پروکسیهای با امتیاز پایین کمتر استفاده شوند |
| `random`           | توزیع بار، حفظ حریم خصوصی                  | توزیع یکنواخت؛ سیگنالهای کیفیت را نادیده میگیرد                                               |
| `sequential`       | اشکالزدایی، آزمایش قطعی                    | پروکسیها را بهترتیب پیمایش میکند؛ تحلیل آن آسان است                                           |

### درخت تصمیم

```
                    آیا برای پروکسیهای خود امتیاز کیفیت دارید؟
                    │
        ┌───────────┴───────────┐
        │                       │
       بله                     خیر
        │                       │
   آیا کیفیت همه                │
   پروکسیها تقریباً            │
   برابر است؟                   │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  بله       خیر              استفاده از
   │         │              `random`
   │         │              (توزیع یکنواخت
   │         │              بهمرور دادههای
   │         │              کیفیت را میسازد)
   │         │
   │    استفاده از `quality`
   │    (بهترین گزینه برای
   │    کیفیتهای متفاوت)
   │
استفاده از `random`
(توزیع یکنواخت
بار)
```

## حذف خودکار پراکسیهای ناموفق متعلق به خودتان

مجموعه بازار 1proxy از قبل پراکسیهای ناموفق خود را بهصورت خودکار تنزل میدهد (به
[امتیازهای کیفیت پراکسی](#proxy-quality-scores) مراجعه کنید). برای
پراکسیهایی که **خودتان** به رجیستری اضافه کردهاید، زمانبند پسزمینه بررسی سلامت
(`src/lib/proxyHealth/scheduler.ts`) همان رفتار «حذف خودکار یک عضو ازکارافتاده از
زنجیره» را بدون حذف دائمی چیزی ارائه میدهد:

```bash
# .env — پس از 3 بررسی ناموفق متوالی، یک پراکسی را بهصورت نرم غیرفعال کنید و
# بهمحض اینکه دوباره به بررسیها پاسخ داد، آن را بهطور خودکار فعال کنید.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

نحوه عملکرد آن در یک زنجیره چندپراکسی:

1. زمانبند هر پراکسی ثبتشده را در هر بازه `PROXY_HEALTH_INTERVAL_MS`
   بررسی میکند (پیشفرض 10 دقیقه؛ حداقل 1 دقیقه).
2. پس از `PROXY_AUTO_REMOVE_AFTER` شکست **قطعی** متوالی (یک شکست واقعی
   اتصال — وقفه زمانی یا خطای 5xx متعلق به خود مقصد بررسی هرگز محاسبه نمیشود؛ به
   [بررسی سلامت پراکسی](#proxy-health-checking-v3816) مراجعه کنید)، مقدار `status`
   پراکسی روی `dead` تنظیم میشود.
3. `dead` یکی از وضعیتهایی است که فیلتر وضعیت فعالِ مورد استفاده در تفکیک
   مجموعه/چرخش آن را کنار میگذارد؛ بنابراین چرخش یک محدوده (نوبتی / تصادفی / چسبنده /
   تأخیر — به [درخت تصمیم راهبرد چرخش](#rotation-strategy-decision-tree)
   مراجعه کنید) بلافاصله از تخصیص آن پراکسی به درخواستهای جدید خودداری میکند. هیچیک
   از پراکسیهای دیگر مجموعه تحت تأثیر قرار نمیگیرند و کل مجموعه نیز هرگز بدون اطلاع
   به اتصال مستقیم بازنمیگردد — به محافظ بستهماندن در برابر خطای
   [سامانه پراکسی 4 سطحی](#4-level-proxy-system) مراجعه کنید.
4. زمانبند بررسی پراکسیهای `dead` را با همان فاصله زمانی ادامه میدهد. بررسی
   موفق بعدی، `status` را دوباره به `active` تغییر میدهد و پراکسی مجدداً وارد چرخش
   میشود — نیازی به افزودن مجدد دستی نیست.

این قابلیت عمداً **اختیاری و غیرمخرب** است: زمانبند بهطور پیشفرض فقط
شکستها را میشمارد و ثبت میکند (به سیاست C در `decision.ts` مراجعه کنید) و
`PROXY_AUTO_DISABLE` هرگز ردیفی را حذف نمیکند — پرچم جداگانه و تهاجمیتر
`PROXY_AUTO_REMOVE` برای همین منظور است. اگر هر دو روی `true` تنظیم شوند،
`PROXY_AUTO_REMOVE` اولویت دارد (پراکسیای که در آستانه حذفشدن است، نیازی به
غیرفعالسازی نرم در این میان ندارد). برای مشاهده فهرست کامل متغیرها، به مرجع
[پیکربندی محیط](../reference/ENVIRONMENT.md) مراجعه کنید.

---

> 📖 **مستندات مرتبط:**
>
> - [راهنمای کاربر](../guides/USER_GUIDE.md) — راهاندازی و پیکربندی عمومی
> - [مرجع API](../reference/API_REFERENCE.md) — مستندات کامل API
> - [پیکربندی محیط](../reference/ENVIRONMENT.md) — همه متغیرهای محیطی
