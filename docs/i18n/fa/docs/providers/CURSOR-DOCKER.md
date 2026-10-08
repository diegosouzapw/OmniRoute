# Cursor Provider in Docker Environments (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

وقتی OmniRoute داخل Docker اجرا میشود، جریانهای قدیمی **وارد کردن از Cursor IDE** /
`cursor-agent` با شکست مواجه میشوند، زیرا کانتینر نمیتواند نصب Cursor روی میزبان را ببیند.
در عوض از **ورود با Cursor** (deep-control PKCE) استفاده کنید.

## چرا وارد کردن از IDE / CLI در Docker شکست میخورد

1. **جداسازی سیستم فایل** — وارد کردن خودکار بهدنبال مسیرهای Linux مانند
   `~/.config/Cursor/User/globalStorage/state.vscdb` در _داخل_ کانتینر میگردد.
   در Docker Desktop برای macOS، پایگاه دادهٔ IDE میزبان بهصورت پیشفرض mount نشده است و
   سیستمعامل کانتینر Linux است، حتی اگر میزبان Darwin باشد.
2. **نبود فایل اجرایی `cursor-agent`** — ایمیجهای رسمی OmniRoute شامل
   `cursor-agent` نیستند. بخش مدلهای موجود پیشتر
   `cursor-agent --list-models` را از طریق shell اجرا میکرد و در صورت شکست، به یک کاتالوگ ایستا
   بازمیگشت.
3. **فایل اجرایی اشتباه** — یک `cursor-agent` مربوط به macOS را با bind mount وارد کانتینر
   Linux **نکنید**. این فایل اجرا نخواهد شد.

## توصیهشده: ورود با Cursor

1. **داشبورد ← ارائهدهندگان ← Cursor** را باز کنید.
2. زبانهٔ **ورود با Cursor** را انتخاب کنید.
3. روی **ورود با Cursor** کلیک کنید — OmniRoute آدرس
   `https://cursor.com/loginDeepControl?…` را در مرورگر **میزبان** شما باز میکند.
4. ورود را در مرورگر تأیید کنید و سپس به داشبورد بازگردید. OmniRoute
   بهصورت دورهای `api2.cursor.sh/auth/poll` را بررسی میکند تا توکنها دریافت شوند.
5. OmniRoute توکنهای **دسترسی + نوسازی** را ذخیره میکند و آنها را از طریق
   `https://api2.cursor.sh/auth/exchange_user_api_key` نوسازی میکند.

این مسیر به Cursor IDE یا `cursor-agent` در داخل کانتینر نیاز ندارد.

## کشف مدل

با یک اتصال واردشده، **مدلهای موجود / همگامسازی خودکار** کاتالوگ HTTP
`AiService/AvailableModels` متعلق به Cursor را با استفاده از توکن Bearer اتصال ترجیح میدهد.
اگر این کار شکست بخورد، OmniRoute همچنان `cursor-agent` میزبان را امتحان میکند (در صورت وجود)
و سپس از دادهٔ اولیهٔ رجیستری ایستا استفاده میکند.

OmniRoute همیشه **`auto`** را در کاتالوگ نمایش میدهد (با عنوان «خودکار»)، بههمراه
حالتهای مسیریاب به سبک OpenCodex یعنی **`auto-cost`**، **`auto-balance`** و
**`auto-intelligence`**. در ارتباط شبکهای، این موارد به مدل `default` متعلق به Cursor نگاشت
میشوند (با یک `optimization` ModelParameter برای سه گونهٔ یادشده). وقتی سهمیهٔ استفاده از
مدلهای پریمیوم تمام شده است، `cu/auto` را ترجیح دهید — حالت خودکار اغلب هنوز بودجه دارد.

### کاتالوگ زنده هنگام همگامسازی انحصاری است

پس از همگامسازی موفق مدلهای Cursor (`cursor-agent --list-models` ← کاتالوگ
همگامشدهٔ ماندگار، یا واکشی `AvailableModels` با احراز هویت Bearer که در بالا ذکر شد)،
**داشبورد**، **`/v1/models`** و فهرست **آزمایش همه** شامل موارد زیر هستند:

1. مدلهای بازگرداندهشده توسط همگامسازی زنده
2. شناسههای مسیریاب خودکار تزریقشده: `auto`، `auto-cost`، `auto-balance`، `auto-intelligence`
3. مدلهای **سفارشی** اپراتور (واردشده / دستی) — هرگز توسط همگامسازی حذف نمیشوند

رجیستری ایستای بزرگ در
`open-sse/config/providers/registry/cursor/` **فقط برای بازگشت آفلاین** است. وقتی
دادهٔ همگامشده خالی باشد (یا کشف شکست بخورد)، فهرستسازی به آن رجیستری بازمیگردد.

شناسههای دارای پسوند effort (برای مثال `claude-4.6-sonnet-high`) همچنان میتوانند هنگام اجرا
**درخواست شوند**: `resolveRequestedModel` پسوند را حذف کرده و آن را به یک
`ModelParameter` در ارتباط شبکهای تبدیل میکند. فهرستسازی انحصاری عمداً آن گونههای ایستا
را از «آزمایش همه» پنهان میکند تا آزمونها با آنچه Cursor واقعاً بهعنوان مدل موجود برمیگرداند،
مطابقت داشته باشند.

### توابع کمکی

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — ادغام در داشبورد
- `ensureCursorAutoCatalogEntry` — تزریق auto* هنگام کشف + فهرستسازی
- `shouldSuppressStaticModelForExclusiveListing` — حلقهٔ ایستای `/v1/models`

## محدودیتهای ارائهدهنده (سهمیه)

**مصرف ← محدودیتهای ارائهدهنده** برای Cursor پس از PKCE یا وارد کردن توکن، از APIهای Bearer
در `api2.cursor.sh` استفاده میکند (`GetCurrentPeriodUsage` ← خلاصهٔ مصرف ← auth/usage).
مسیر قدیمی داشبورد مبتنی بر cookie/`cursor.com` بهعنوان آخرین گزینهٔ بازگشت برای نشستهای
قدیمیتر واردشده از IDE باقی میماند.

پنجرهها معمولاً شامل **کل**، **خودکار + Composer** و **API** هستند. اگر
محدودیتها خالی به نظر میرسند، **ورود با Cursor** را دوباره اجرا کنید یا توکنها را مجدداً
وارد کنید (دیگر نیازی نیست حتماً فقط از طریق IDE وارد شوند).

## نوبتهای خالی / اتمام سهمیهٔ استفاده

وقتی Cursor یک Run را میپذیرد اما هیچ متنی از دستیار برنمیگرداند (که هنگام تمام شدن
سهمیهٔ پریمیوم رایج است)، OmniRoute یک خطای قابل اقدام **429** (نشانههای سهمیه) یا
**502** همراه با راهنمایی نمایش میدهد — نه صرفاً پیام «ارائهدهنده محتوای خالی برگرداند».
شکستهای استریم مانند `not_found: AI Model Not Found` (اتمام بازهٔ مصرف) بهعنوان
**محدودیت نرخ Cursor / عبور از سهمیهٔ مصرف** طبقهبندی میشوند و این پیام در سراسر
خط لولهٔ SSE حفظ میشود (محافظ مشترک استریم خالی، خطایی را که قبلاً منتشر شده است
بازنویسی نمیکند). محدودیتهای ارائهدهنده را بررسی کنید، مدل **`auto`** را امتحان کنید یا
محدودیتهای طرح Cursor را افزایش دهید.

## نسخهٔ کلاینت (بدون رابط گرافیکی)

بدون نصب محلی `cursor-agent`، OmniRoute مقدار `x-cursor-client-version` را ابتدا از
متغیر محیطی `CURSOR_AGENT_CLI_VERSION`، سپس از یک استخراج ذخیرهشده روی دیسک از
اسکریپت نصب Cursor و در نهایت از یک شناسهٔ build ثابتشده تعیین میکند. در صورت نیاز،
آن را با `CURSOR_AGENT_CLI_VERSION` بازنویسی کنید.

## گزینهٔ بازگشت: وارد کردن دستی توکن

اگر نمیتوانید ورود از طریق مرورگر را تکمیل کنید:

1. روی میزبان، توکنها را از `state.vscdb` متعلق به Cursor استخراج کنید:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. در پنجرهٔ احراز هویت Cursor، **وارد کردن توکن** را باز کنید.
3. **توکن دسترسی** و در صورت موجود بودن، **توکن نوسازی** را وارد کنید (برای
   نوسازی خودکار ضروری است). شناسهٔ ماشین اختیاری است.

وارد کردن فقط توکن دسترسی همچنان کار میکند، اما بدون توکن نوسازی منقضی خواهد شد —
وقتی چت خطاهای احراز هویت برگرداند، آن را دوباره وارد کنید.

## مرتبط

- راهنمای Docker برای Zed: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- مرجع ورود Cursor در OpenCodex (خارجی):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
