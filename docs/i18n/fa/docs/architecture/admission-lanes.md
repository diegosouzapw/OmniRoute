# Admission lanes (#9654) — two lane systems, what gates each, where each reports (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute دارای **دو** سیستم مسیر محلی در سطح پردازه با دامنههای متفاوت است. این دو
مکمل یکدیگرند؛ اپراتورها باید بدانند که کدامیک را مشاهده میکنند.

## 1. پذیرش سراسری در سطح بایت (`chatBodyAdmission.ts`)

- **دامنه:** مسیر بدنهٔ بافرشده/heap برای `POST /v1/chat/completions`،
  `/v1/messages`، `/v1/responses` و سایر مسیرهای دارای ساختار چت. از تقویت
  مصرف heap بر اثر بدنههای بزرگ عاملهای کدنویسی جلوگیری میکند (#4380).
- **یک کنترلکنندهٔ سراسری برای کل فرایند، نه مسیرهای مجزا برای هر کلید (#10110).** هر کلید API
  (هششده) یا نشست `anonymous` در برابر **همان** بودجهٔ مشترک پذیرش میشود —
  شناسهٔ هششدهٔ نشست فقط بهعنوان کلید زمانبندی منصفانه (ارسال نوبتگردشی
  میان منتظران) استفاده میشود و هرگز نقش بخشبندی ظرفیت را ندارد. نسخهای پیشین از این
  سند، مسیرهای مجزا برای هر کلید با ظرفیت مستقل را توصیف میکرد؛ آن مدل در
  #10110 حذف شد، زیرا به اعتبارنامههای جعلی و احراز هویتنشده اجازه میداد
  کران سراسری فرایند را چند برابر کنند.
- **دروازه (#503-fanout): یک بودجهٔ BYTE برای دریافت داده که بهصورت خودکار محاسبه میشود، نه تعداد ثابتی
  درخواست.** سقف قدیمی مبتنی بر تعداد درخواست، یعنی `CHAT_MAX_HEAVY_IN_FLIGHT` (با مقدار پیشفرض `1`
  پیش از این اصلاح)، توزیع همزمان عاملهای کدنویسی (چندین زیرعامل/CLI،
  با بدنههایی که معمولاً > 256 KB هستند) را به همروندی مؤثر تقریباً ۱ کاهش میداد و
  در بار کاملاً عادی، پاسخ 503 ایجاد میکرد. اکنون این سقف فقط زمانی اعمال میشود که اپراتور
  صراحتاً `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` را تنظیم کند. اگر تنظیم نشده باقی بماند، پذیرش در عوض
  با `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` محدود میشود — بودجهای که بهطور خودکار از
  سقف واقعی حافظهٔ فرایند محاسبه میشود (`src/shared/middleware/admissionBudget.ts`):
  ۲۵٪ از مقدار محدودکنندهتر میان حد heap در V8 و هر حد cgroup/container،
  تقسیم بر ضریب 8x تقویت گذرای حافظه و محدودشده به بازهٔ 8 MiB تا
  2 GiB. مقادیر جایگزین صریح نیز از همین حدود استفاده میکنند. این بودجه بدون نیاز به
  تنظیم متغیرهای محیطی، خود را از یک container با حافظهٔ 512 MB تا یک رایانهٔ رومیزی با حافظهٔ 32 GB
  مقیاس میدهد. بدنهای که در بودجهٔ مؤثر جا نمیگیرد، فوراً با `413 body_exceeds_budget`
  رد میشود؛ تنها رقابت میان بدنههایی که هر یک بهتنهایی قابل پردازشاند وارد صف محدودشدهٔ
  منصفانه میشود. یک ردیاب زندهٔ چندسیگناله برای فشار منابع (نسبت heap در V8،
  cgroup، PSI، رویدادهای OOM — `open-sse/utils/resourcePressurePolicy.ts`) در فشار
  `high` زمان انتظار محدودشده را کاهش میدهد و در فشار `critical`، پیش از آنکه حتی
  یک بایت دریافت شود، بار را فوراً با `503 resource_pressure` دفع میکند.
  در صورت وجود، PSI از `memory.pressure` متعلق به cgroup همین واحد خوانده میشود
  (`open-sse/utils/resourcePressureSampler.ts`)؛ `/proc/pressure/memory` مربوط به
  کل میزبان است و فقط در bare metal / cgroup v1 بهعنوان مسیر جایگزین استفاده میشود، بنابراین یک
  میزبان در حال swapping نمیتواند باعث شود یک container بیکار پاسخ 503 بدهد.
- **تنظیمات:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — مقدار جایگزین برای بودجهٔ بایتی محاسبهشده بهصورت خودکار
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — سقف قدیمی تعداد درخواست، فقط با فعالسازی صریح
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — مدت انتظار در صف پیش از 503 (پیشفرض 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — شیر کنترل heap بر اساس بایتهای صفشده (پیشفرض 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — منسوخشده و
    بدون اثر از #10110 (برای سازگاری پیکربندی پذیرفته میشوند، اما نادیده گرفته میشوند)
- **گزارشها:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — شامل
  افزودههای #503-fanout یعنی `inflightBytes`، `maxInflightBytes`، `budgetSource`
  (`v8_heap` | `cgroup` | `override`)، `pressureSeverity` و `countCapEnabled`
  (در استقرار پیشفرض false است — تأیید میکند که بودجهٔ بایتی، نه سقف قدیمی
  تعداد، محدودیت واقعی اعمالشده است).

## 2. مسیرهای مجازی تطبیقی زمان اجرا (`open-sse/services/admission`)

- **دامنه:** پذیرش بر اساس کلید مستأجر برای ارسال به ارائهدهنده — هزینهٔ صف، تطبیق
  محدودیت با هدایت تأخیر، صفبندی مسیرها و معیارهای مسیر.
- **دروازه:** **با فعالسازی اختیاری.** مگر اینکه `OMNIROUTE_CHAT_VIRTUAL_LANES=true` باشد، غیرفعال است. بدون آن،
  کنترلگر تطبیقی رفتار صف مشترک را حفظ میکند (معیار 1 از #9654 فقط
  پس از فعالکردن مسیرها توسط اپراتور برقرار میشود).
- **تنظیم:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + پیکربندی تطبیقی (`maxQueueCount`،
  `maxQueueCost`، `defaultMaxWaitMs`، …).
- **گزارشها:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`،
  `laneQueuedCount`، `laneQueuedCost`، `laneTenants` (شناسههای مبهم مسیر، هرگز کلیدهای
  خام)، و `virtualLanes` — پرچم مرجع «مسیرها فعالاند» در اسنپشات.

## 3. کاوشگرهای fan-out — پذیرش بهازای هر هدف برای combo/fusion (#9654 Wave 2)

combo (اولویت / round-robin) و fusion، تعداد N هدف مدل را تحت یک درخواست والد
fan-out میکنند. از #9654 Wave 2، **هر هدف fan-out پیش از ارسال تحت کنترل دروازه قرار میگیرد**؛ این کار با یک
کاوشگر بهازای هر هدف (`PerTargetAdmissionHook`، ساختهشده توسط `createPerTargetAdmissionHook`)
در برابر مسیر مستأجر **والد** انجام میشود.

- **دامنه:** هر هدف fan-out که توسط combo، fusion و موتور chaos ارسال میشود.
  سیستم 1 (سطح بایت) تحت تأثیر قرار نمیگیرد — این سیستم هرگز اهداف fan-out را بررسی نمیکند.
- **دروازه:** **فعالسازی اختیاری همراه با سیستم 2.** هنگامی که `OMNIROUTE_CHAT_VIRTUAL_LANES`
  تنظیم نشده باشد، بدون عملیات است — در آن حالت، درخواست والد از قبل lease صف مشترک را در اختیار دارد؛
  بنابراین کاوش باعث شمارش مضاعف و رد اهداف combo میشود.
- **معناشناسی:**
  - **کاملاً غیرمسدودکننده — رد شدن، نه صفبندی.** `maxWaitMs 0`: در صورت پُر بودن یک مسیر،
    هدف رد میشود و در عوض سازوکار fallback مربوط به combo (یا پنل بازماندگان fusion)
    پاسخ میدهد. این رفتار عامدانه است: یک هدف fan-out کاری تکراری
    است و صفبندی آن، بار بیشتری را دقیقاً روی همان نقاط ازدحامی انباشته میکند که مسیرها برای
    متوقفکردنشان ایجاد شدهاند. بنابراین `defaultMaxWaitMs` فقط برای **درخواست والد** اعمال میشود؛
    کاوشگرهای fan-out هرگز منتظر نمیمانند و عمداً **هیچ گزینهٔ تنظیمیای** برای منتظر نگهداشتن
    آنها وجود ندارد (تاریخچهٔ issue نشان میدهد گزینههای انتظار به بروز گستردهٔ خطاهای 502/504 منجر
    شدهاند که #9654 از آنها جلوگیری میکند — فقط در صورتی بازنگری شود که اپراتوری گزارش کند رد شدن اهداف fan-out
    به کیفیت پاسخ آسیب میزند).
  - **آزادسازی هنگام پذیرش.** کاوشگر پذیرفتهشده، lease خود را بلافاصله آزاد میکند: این
    یک دروازهٔ ظرفیت است، نه نگهداری ظرفیت. lease والد fan-out را پوشش میدهد؛ نگهداشتن N
    lease دیگر، هزینهٔ فعال مشترک را بهطور کاذب افزایش میدهد و باعث رد شدن مستأجران دیگر میشود. این سازوکار مبتنی بر بیشترین تلاش است،
    نه رزرو: مسیر میتواند بین کاوش و ارسال دوباره پُر شود؛ بنابراین در شرایط
    رقابت سنگین، ممکن است دروازه هدفی را به مسیری بپذیرد که تا
    زمان ارسال هدف دوباره پُر شده است.
  - **قیمتگذاری بر اساس بدنهٔ واقعی fan-out.** کاوشگر، هزینه را از
    بدنهٔ واقعی هدف برآورد میکند — از جمله کلاس درخواست مشتقشده از پرچم `stream` آن،
    دقیقاً مانند مسیر والد — بنابراین اعضای پنل fusion (`stream: false`)
    با کلاس غیرجریانیای قیمتگذاری میشوند که واقعاً اشغال خواهند کرد، و اهداف priority/RR
    با هر حالتی که کاربر درخواست کرده است.
- **گزارشها:** رد شدن یک کاوشگر پس از هدف اول، مقدار `fallbackCount` بهازای درخواستِ combo را
  افزایش میدهد (همراستا با معناشناسی فعلی fallback؛ در لاگهای combo قابل مشاهده است)؛ اگر همهٔ
  اعضای پنل رد شوند، fusion پاسخ 503 برمیگرداند. در حال حاضر **هیچ شمارندهٔ تجمیعیای**
  (برای مثال `virtualFanoutSkipped`) روی اسنپشات وجود ندارد — اگر اپراتوری گزارش کند
  که نمیتواند تعداد دفعات رد شدن اهداف fan-out توسط دروازهٔ مسیر را تشخیص دهد،
  این گزارش محرک افزودن چنین شمارندهای خواهد بود.

## کدامیک در داشبورد نمایش داده میشود

- `adaptiveAdmission.laneCount` / `laneTenants` → **لاینهای مجازی تطبیقی** (سیستم 2).
- `adaptiveAdmission.virtualLanes === true` → پروبهای fan-out بخش 3 نیز
  فعال هستند. اگر در یک payload، مقدار `virtualLanes` وجود نداشته باشد یا `false` باشد،
  یعنی `OMNIROUTE_CHAT_VIRTUAL_LANES` تنظیم نشده است — لاینهای سطح بایت (سیستم 1)
  همچنان فعالاند، اما تا زمانی که فعالسازی انجام نشود، هیچچیز در
  `adaptiveAdmission` (و هیچ گیتگذاری fan-outی) اعمال نمیشود.

## چرا هر دو وجود دارند

لاینهای سطح بایت، مسیر پرمصرفِ حافظه برای تجزیه/فشردهسازی را محدود میکنند؛ لاینهای تطبیقی
هزینه ارسال بهازای هر tenant را محدود میکنند. معیار 1 در #9654 («جهش بار یک نشست باعث نشود
نشست دیگری پاسخ 503 دریافت کند») بدون قیدوشرط توسط سیستم 1 و پس از فعالسازی اختیاری،
توسط سیستم 2 اعمال میشود.

## 4. `/v1/responses` طولانی در یک پردازه (فضایاضافیِ سالم)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) تابع
`tryAcquireHealthyHeadroom` را اضافه کرد تا هنگامی که heap پایینتر از
`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` است، درخواست دومی با ساختار سنگین
پذیرفته شود. مسیر BYTE که توسط `admitChatRequest` استفاده میشود (بدنههای ≥
`OMNIROUTE_CHAT_LARGE_BODY_BYTES`، با مقدار پیشفرض 256 KiB، از جمله
`POST /v1/responses`) از **همان** راه گریز استفاده میکند.

این دستورالعمل پشتیبانیشده برای اجرای بیش از دو `/v1/responses` طولانی و همزمان
از نوع SSE در **یک پردازه** است: ظرفیت اصلی + فضایاضافیِ سالم را فقط تا حدی افزایش دهید
که heap و بودجه بایتهای درحالپردازش در کل پردازه
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) اجازه میدهند. پشتیبانی از دهها
کلاینت SSE طولانی (40–50) به همین بودجه حافظه مربوط است، نه به یک محدودیت سخت
محصولی با عنوان «حداکثر 2». heap تحت فشار همچنان درخواستها را با پاسخ قابلتلاشمجدد
`503` دفع میکند تا مشکل #7849 بازنگردد.

برای **چندبرابر کردن heapها**، N نمونه مستقل با `DATA_DIR`های جداگانه اجرا کنید
(#11024). هرگز روی یک فایل SQLite مقدار `replicas > 1` را تنظیم نکنید (#10350).
این بخش بازگشایی مجدد دستورالعمل مقیاسافزایی افقی با DATA_DIR نیست.
