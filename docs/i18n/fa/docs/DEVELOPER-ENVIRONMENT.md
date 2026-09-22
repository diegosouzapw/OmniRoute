# Developer environment notes (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

این صفحه رفتار محلی `.env` پروژه و نحوه مدیریت فایلهای محیطی و اسرار هنگام توسعه OmniRoute را توضیح میدهد.

## رفتار postinstall برای .env

ممکن است پروژه برای راحتی توسعهدهندگان، هنگام اجرای `npm install` / `postinstall` یک فایل محلی `.env` ایجاد کند. این فایل فقط برای توسعه و آزمایش محلی در نظر گرفته شده است و هرگز نباید در سامانه کنترل نسخه ثبت شود.

نکات کلیدی:

- فایل `.gitignore` مخزن از قبل فایلهای `.env*` را نادیده میگیرد (به ورودی مربوطه در `.gitignore` مراجعه کنید). این قاعده را حذف یا تغییر ندهید، مگر اینکه عمداً قصد داشته باشید یک فایل نمونه مشخص را ثبت کنید و برای آن فرایندی مستند داشته باشید.
- اگر یک راز واقعی بهطور تصادفی در مخزن ثبت شد، اعتبارنامه را فوراً تعویض/لغو کنید و آن را از تاریخچه مخزن حذف کنید (برای مثال، با استفاده از `git filter-repo` یا یک فرایند اصلاحی مشابه). اگر به کمک نیاز دارید، با مسئول امنیت/تماس ارتباط برقرار کنید.
- برای CI و محیط عملیاتی، بهجای ثبت اسرار در فایلها، از اسرار CI یا یک مدیر اسرار (GitHub Actions Secrets، Azure Key Vault، HashiCorp Vault و غیره) استفاده کنید.

## گردش کار محلی پیشنهادی

- فایل `.env` را فقط در فضای کاری محلی خود نگه دارید. برای مستندسازی متغیرهای الزامی و مقادیر نمونه قابلقبول، از `.env.example` (که از قبل ردیابی میشود) استفاده کنید.
- هنگام اجرای محلی آزمونهایی که به مقادیر شبیه راز نیاز دارند، بهجای اعتبارنامههای واقعی، از مقادیر جایگزین ساختگی یا کلیدهای موقتی که هنگام اجرا تولید میشوند استفاده کنید.
- در آزمونهایی که از مقادیر جایگزین استفاده میکنند، توضیح کوتاهی اضافه کنید تا بازبینان متوجه شوند که داده آزمایشی ساختگی است.

## نکات مربوط به اسکنر

- برخی داراییهای کامپایلشده یا دودویی (برای مثال، دادههای دودویی WASM جاسازیشده با کدگذاری base64) ممکن است شامل زیررشتههای ASCII باشند که شبیه اعتبارنامه به نظر میرسند و اسکنرهای متنی اسرار را فعال میکنند. اگر این داراییها معتبر هستند، آنها را در فهرست مجاز اسکنر علامتگذاری کنید یا دایرکتوریهای مربوطه را در پیکربندی اسکنر مستثنی کنید.

## اگر نشت اطلاعاتی پیدا کردید

1. کلید را فوراً تعویض/لغو کنید.
2. راز را از تاریخچه حذف کنید و در صورت لزوم، شاخه پاکسازیشده را با اجبار push کنید.
3. به نگهدارندگان اطلاع دهید و چکلیست واکنش به رخداد سازمان خود را دنبال کنید.
