# Public Credentials Handling (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **منبع حقیقت:** `open-sse/utils/publicCreds.ts`
> **آزمونها:** `tests/unit/publicCreds.test.ts`
> **آخرین بهروزرسانی:** 2026-08-07 — v3.8.50
> **مخاطبان:** مهندسانی که ارائهدهندگانی را یکپارچه میکنند که مقادیر عمومی OAuth مانند client_id / client_secret / کلیدهای Firebase Web API را در CLIهای عمومی خود عرضه میکنند.
> **وضعیت:** برای تمام کدهای جدیدی که شناسههای بالادستی را تعبیه میکنند، **الزامی** است.

## دلیل وجود این راهکار

- [OAuth 2.0 برای برنامههای بومی (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — مقادیر OAuth مانند client_id / client_secret برای برنامههای نصبشده عمومی هستند؛ PKCE امنیت واقعی را فراهم میکند.
- [کلیدهای Firebase API](https://firebase.google.com/docs/projects/api-keys) — شناسههای کلاینت وب ذاتاً عمومی هستند.

OmniRoute باید این مقادیر را تعبیه کند تا کاربرانی که `.env` را پیکربندی نمیکنند نیز بدون نیاز به تنظیمات اضافی، یک جریان OAuth عملیاتی داشته باشند. بدون یک مقدار جایگزین تعبیهشده، ارائهدهندگان Gemini / Antigravity برای هر کاربری که مسیر «فقط clone و اجرا کن» را دنبال میکند، از کار میافتند.

بااینحال، مقادیر تحتاللفظی مانند `AIzaSy…`، `GOCSPX-…` و `…apps.googleusercontent.com` توسط **GitHub Secret Scanning**، **Semgrep** و اسکنرهای الگویی مشابه شناسایی میشوند. هر انتشار به جریانی پرسروصدا از موارد مثبت کاذب تبدیل میشود، محافظت از push، commitهای معتبر را مسدود میکند و اپراتورها دیگر به جریان هشدارها اعتماد نمیکنند.

ابزار کمکی `open-sse/utils/publicCreds.ts` هر دو محدودیت را همزمان برطرف میکند:

- شناسه عمومی را بهشکل یک **دنباله بایتی پوشاندهشده با XOR** تعبیه میکند (بدون وجود الگوی قابلشناسایی برای اسکنر در کد منبع).
- در زمان اجرا از طریق `decodePublicCred` / `resolvePublicCred` آن را رمزگشایی میکند.
- مقادیر خامی را که از قبل از پیشوندهای شناختهشده (`AIza`، `GOCSPX-`، `<digits>-<32hex>.apps.googleusercontent.com`، `Iv1.<hex>`) پیروی میکنند، شناسایی کرده و بدون تغییر عبور میدهد؛ بنابراین مقادیر خام موجود در `.env` کاربران بدون **هیچگونه مهاجرتی** به کار خود ادامه میدهند.

این **مبهمسازی است، نه رمزنگاری.** هر کسی که کد منبع را بخواند میتواند مقدار را بازیابی کند — و این مشکلی ندارد، زیرا این مقدار ذاتاً عمومی است. تنها هدف، جلوگیری از تطبیق با regexهای اسکنرها است.

## الگوی الزامی

### 1. افزودن یک اعتبارنامه عمومی جدید

هنگامی که لازم است مقدار جدیدی را که توسط ارائهدهنده بالادستی عرضه شده است تعبیه کنید و آن مقدار:

- از یک CLI عمومی / برنامه دسکتاپ / بسته مرورگر میآید، **و**
- ارائهدهنده بالادستی آن را بهعنوان یک شناسه عمومی کلاینت مستند کرده است (یا با آن چنین رفتاری دارد)، **و**
- در غیر این صورت توسط یک اسکنر الگویی شناسایی میشود (`AIza…`، `GOCSPX-…`، `<digits>-…apps.googleusercontent.com` و غیره)،

…این چکلیست را دنبال کنید:

1. دنباله بایتی پوشاندهشده را تولید کنید:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. یک ورودی جدید با **نام کلید خنثی** (`<provider>_id`، `<provider>_alt`، `<provider>_fb` و غیره) به `EMBEDDED_DEFAULTS` در `open-sse/utils/publicCreds.ts` اضافه کنید. در این ابزار کمکی از نامهایی مانند `client_secret` یا `api_key` استفاده **نکنید** — این واژهها قواعد عمومی تشخیص راز در Semgrep را فعال میکنند.

3. یک `keyof typeof EMBEDDED_DEFAULTS` به اجتماع نوع عمومی اضافه کنید (این مورد بهصورت خودکار استنتاج میشود).

4. در کد مصرفکننده، مقدار تحتاللفظی hardcodeشده را با موارد زیر جایگزین کنید:

   ```ts
   // یک بازنویسی محیطی
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // چندین نام مستعار محیطی (اولین مقدار غیرخالی برنده است)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // بدون بازنویسی محیطی (همیشه از مقدار پیشفرض تعبیهشده استفاده میشود)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. مقدار تحتاللفظی را از `.env.example` حذف کنید (و آن را با مستنداتی صرفاً شامل توضیحات جایگزین کنید که خوانندگان را به اینجا ارجاع میدهد):

   ```dotenv
   # ── ارائهدهنده (Google / Firebase / غیره) ──
   # اعتبارنامههای عمومی OAuth از طریق فایل زیر در کد تعبیه شدهاند:
   # open-sse/utils/publicCreds.ts. این متغیرها را فقط برای استفاده از مقادیر خودتان تنظیم کنید.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. فایل `tests/unit/publicCreds.test.ts` را بهروزرسانی کنید تا یک assertion مربوط به شکل برای کلید جدید اضافه شود (قالب را بررسی کنید، نه مقدار تحتاللفظی را — برای مشاهده الگو به آزمونهای موجود مراجعه کنید).

7. **هرگز** مقادیر تحتاللفظی `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` را به فایلهای آزمون اضافه نکنید. از ثابتهای `FAKE_*` ساختهشده از قطعههای `.join("")` استفاده کنید (به آزمونهای موجود مراجعه کنید).

### 2. مصرفکنندگان

- **فقط از `resolvePublicCred()` / `resolvePublicCredMulti()` بخوانید** — هرگز بیرون از ابزار کمکی، `decodePublicCredBytes()` را مستقیماً فراخوانی نکنید.
- این ابزار کمکی عمداً کمهزینه است (XOR خطی بایتها) و میتوان با خیال راحت آن را هنگام بارگذاری ماژول فراخوانی کرد؛ مقادیر پیشفرض فقط یکبار محاسبه میشوند.
- بازنویسی محیطی همیشه اولویت دارد. اگر کاربری `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` را تنظیم کند، ابزار کمکی آن مقدار خام را بدون تغییر عبور میدهد.

### 3. الگوهای ممنوع

❌ در کد محیط عملیاتی (`src/`، `open-sse/`، `electron/`، `bin/`) **هرگز** هیچیک از موارد زیر را انجام ندهید:

```ts
// بد: مقدار تحتاللفظی، Secret Scanning و Semgrep را فعال میکند
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// بد: base64 مقدار تحتاللفظی — GitHub از Feb/2025 همچنان آن را شناسایی میکند
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// بد: الحاق رشتهای که الگو را هنگام اجرا دوباره مونتاژ میکند
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// بد: رمزگذاری hex/ROT13 — مبهمسازی متفاوت، اما با همان خطر شناسایی
clientSecret: hexDecode("474f4353..."),
```

همه این موارد در نهایت یک اسکنر را فعال میکنند. از `resolvePublicCred()` استفاده کنید.

❌ **هرگز** اعتبارنامههای تحتاللفظی را به `.env.example` اضافه نکنید. کاربرانی که به مقادیر واقعی بالادستی نیاز دارند، میتوانند خودشان آنها را از CLI عمومی استخراج کنند یا از ثبت OAuth خودشان استفاده کنند.

❌ **هرگز** یک هشدار جدید اسکن اسرار را بدون آنکه ابتدا بررسی کنید آیا اعتبارنامه باید به این ابزار کمکی منتقل شود یا نه، رد نکنید.

## کنترلهای مرتبط

- `RAW_VALUE_PATTERN` در `publicCreds.ts` پیشوندهایی را فهرست میکند که باعث عبور بدون تغییر میشوند (سازگاری با نسخههای قدیمی). آن را فقط برای قالبهای مستندشدهٔ اعتبارنامههای عمومی گسترش دهید، و هرگز برای اسرار اختصاصی این کار را نکنید.
- `.env.example` در اسکریپت `check-env-doc-sync` مربوط به CI قرار دارد — وقتی متغیری را از اینجا حذف میکنید، مطمئن شوید مستندات نیز با آن مطابقت دارند.
- مجموعهآزمونهای `npm run test:vitest` و `node --import tsx/esm --test tests/unit/publicCreds.test.ts` باید هر دو همچنان با موفقیت اجرا شوند.

## چه زمانی نباید از این تابع کمکی استفاده کرد

این تابع کمکی **فقط** برای اعتبارنامههایی است که:

1. ارائهدهندهٔ بالادستی آنها را بهصورت عمومی توزیع میکند (فایل اجرایی CLI، بستهٔ مرورگر، مستندات رسمی).
2. مستند شده یا بهطور جدی چنین برداشت میشود که محرمانه نیستند (محافظتشده با PKCE، کلید Firebase Web یا موارد مشابه).

برای هر مورد دیگری — توکنهای صادرشده توسط اپراتور، اسرار مختص هر مستأجر، `client_secret` برنامهٔ OAuth خودتان، کلیدهای رمزنگاری، اسرار JWT، گذرواژههای پایگاه داده — **فقط از متغیرهای محیطی** استفاده کنید (`process.env.FOO`، با `||` برای بازگشت به مقدار خالی / خطای صریح). جای این موارد در `.env` و [مخزن رمزنگاریشدهٔ اعتبارنامهها](./COMPLIANCE.md) است، نه در کد منبع.

## منابع

- [Google: OAuth 2.0 برای برنامههای بومی](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: کلیدهای API برای شناسایی کلاینت](https://firebase.google.com/docs/projects/api-keys)
- [اسرار پشتیبانیشده توسط GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: تشخیص base64 برای توکنها (فوریهٔ 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- کامیتی که این تابع کمکی را معرفی کرد: `1a39c31f` — _fix(security): پوشاندن اعتبارنامههای عمومی بالادستی + متمرکزسازی پاکسازی خطاها_
