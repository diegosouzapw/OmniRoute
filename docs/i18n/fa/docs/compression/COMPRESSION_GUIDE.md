# 🗜️ Prompt Compression Guide — OmniRoute (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> بهصورت خودکار 15-95٪ در زمینهٔ واجد شرایط صرفهجویی کنید. برای مروری سریع، بخش [فشردهسازی README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically) را ببینید.

## نمای کلی

OmniRoute یک خط لولهٔ ماژولار برای فشردهسازی پرامپت پیادهسازی میکند که **بهصورت پیشدستانه**، پیش از رسیدن درخواستها به ارائهدهندگان بالادستی اجرا میشود. این یعنی صرفهجویی در توکنها بهشکلی شفاف انجام میشود — نیازی به تغییر گردش کار شما نیست.

```
درخواست کلاینت
  → انتخابگر راهبرد فشردهسازی
    → بازنویسی با ترکیب؟ → استفاده از تنظیم ترکیب
    → آستانهٔ فعالسازی خودکار؟ → استفاده از حالت خودکار
    → حالت پیشفرض؟ → استفاده از تنظیم سراسری
    → خاموش؟ → رد شدن از فشردهسازی
  → حالت فشردهسازی انتخابشده
    → خاموش: بدون فشردهسازی
    → سبک: پاکسازی ایمن فاصلههای خالی/قالببندی (~15%)
    → استاندارد: حذف کلمات زائد به سبک Caveman (~30%)
    → تهاجمی: قدیمیسازی تاریخچه + خلاصهسازی (~50%)
    → فوقفشرده: هرس ابتکاری + تنکسازی بلوکهای کد (~75%)
    → RTK: پالایش آگاه از فرمان برای خروجی ترمینال/ابزار (بازهٔ بالادستی 60-90%)
    → پشتهای: خط لولهٔ مرتبشدهٔ چندموتوره، معمولاً ابتدا RTK و سپس Caveman (بازهٔ واجد شرایط 78-95%)
  → درخواست فشردهشده → ارائهدهنده
```

---

## حالتهای فشردهسازی

### خاموش

هیچ فشردهسازیای اعمال نمیشود. همهٔ پیامها بدون تغییر عبور میکنند.

### حالت سبک (~15% صرفهجویی، <1ms تأخیر)

ایمنترین حالت — بدون هیچ تغییر معنایی و تنها با پاکسازی قالببندی:

| روش                      | توضیحات                                       |
| ------------------------ | --------------------------------------------- |
| `collapseWhitespace`     | ادغام خطوط خالی متوالی و فاصلههای انتهای خطوط |
| `dedupSystemPrompt`      | حذف پیامهای سیستمی تکراری                     |
| `compressToolResults`    | فشردهسازی خروجیهای طولانی ابزار/تابع          |
| `removeRedundantContent` | حذف دستورالعملهای تکراری                      |
| `replaceImageUrls`       | کوتاهسازی URIهای دادهٔ base64 تصاویر          |

**مناسب برای:** استفادهٔ همیشگی و گردشهای کاری حساس به ایمنی.

### حالت استاندارد (~30% صرفهجویی)

با الهام از [Caveman](https://github.com/JuliusBrussee/caveman) — کلمات زائد و عبارتهای طولانی را با حفظ معنا حذف میکند:

- حذف کلمات زائد («لطفاً»، «فکر میکنم»، «اساساً»، «در واقع»)
- خلاصهسازی عبارتهای طولانی («بهمنظور» ← «برای»، «در نتیجهٔ» ← «زیرا»)
- حذف عبارات مؤدبانهٔ محتاطانه («ممکن است لطف کنید...»، «اگر امکان دارد...»)
- بیش از 30 قاعدهٔ regex تنظیمشده برای پرامپتهای کدنویسی

**مناسب برای:** گردشهای کاری روزمرهٔ کدنویسی و تیمهای حساس به هزینه.

### حالت تهاجمی (~50% صرفهجویی)

مدیریت هوشمند تاریخچه برای نشستهای طولانی:

- **قدیمیسازی پیامها** — پیامهای قدیمیتر بهصورت تدریجی بیشتر فشرده میشوند
- **خلاصهسازی نتایج ابزار** — خروجیهای طولانی ابزار با خلاصه جایگزین میشوند
- **محافظهای یکپارچگی ساختاری** — سازگاری جفتهای `tool_use` + `tool_result` را تضمین میکند
- **آگاهی از پنجرهٔ زمینه** — محدودیت توکن هر مدل را رعایت میکند

**مناسب برای:** نشستهای طولانی اشکالزدایی و کدبیسهای بزرگ.

### حالت فوقفشرده (~75% صرفهجویی)

حداکثر فشردهسازی برای سناریوهای حساس به تعداد توکن:

- **هرس ابتکاری** — پیامهای پایینتر از آستانهٔ مرتبطبودن را حذف میکند
- **تنکسازی بلوکهای کد** — نمونهکدهای تکراری را فشرده میکند
- **برش با جستوجوی دودویی** — نقطهٔ بهینهٔ برش را برای پنجرهٔ زمینه پیدا میکند
- شامل تمام قابلیتهای حالت تهاجمی

**مناسب برای:** زمانی که بهطور مکرر به محدودیتهای زمینه میرسید.

### حالت RTK (بازهٔ بالادستی 60-90%)

حالت RTK برای خروجیهای طولانی ابزار که در نشستهای عامل کدنویسی ظاهر میشوند، بهینه شده است:

- کلاسهای فرمان/خروجی مانند `git status`، `git diff`، `git log`، اجراکنندههای آزمون،
  ساختهای TypeScript/Vite/Webpack، ابزارهای ESLint/Biome/Prettier، ممیزیها/نصبهای npm، گزارشهای Docker، خروجی
  زیرساخت و خروجی عمومی پوسته را تشخیص میدهد
- بستههای پالایش JSON را از `open-sse/services/compression/engines/rtk/filters/` اعمال میکند
- پالایشهای RTK TOML schema v1 را از فایلهای پروژه یا سراسری `filters.toml` وارد میکند و برای فایلهای پروژه،
  اعتبارسنجی آزمون درونخطی و کنترل مبتنی بر اعتماد را بهکار میگیرد
- همراه با 49 پالایش داخلی و نمونههای تأیید درونخطی عرضه میشود
- دنبالههای کنترلی ANSI، نوارهای پیشرفت، خطوط تکراری و نویزهای غیرقابلاقدام را حذف میکند
- شکستها، خطاها، هشدارها، فایلهای تغییریافته، خلاصهها و بخش انتهایی خروجیهای طولانی را حفظ میکند
- از پالایشهای پروژه مبتنی بر اعتماد، پالایشهای سراسری و بازیابی اختیاری خروجی خامِ ویرایششده پشتیبانی میکند

**مناسب برای:** نشستهای عامل شامل رونوشتهای پوسته، ساخت، آزمون، git، grep و خروجی فایل.

### حالت پشتهای (بازهٔ واجد شرایط 78-95%)

حالت پشتهای چندین موتور فشردهسازی را با ترتیبی قطعی اجرا میکند. خط لولهٔ پیشفرض بهشکل زیر است:

```txt
RTK -> Caveman
```

این ترتیب ابتدا خروجی ترمینال/ابزار را فشرده نگه میدارد و سپس چگالش معنایی Caveman را روی
بخش باقیماندهٔ پرامپت زبان طبیعی اعمال میکند. خط لولههای پشتهای را میتوان بهصورت سراسری یا از طریق
ترکیبهای فشردهسازی تخصیصیافته به ترکیبهای مسیریابی پیکربندی کرد.

**مناسب برای:** زمینهٔ ترکیبی شامل گزارشهای حجیم ابزار همراه با دستورالعملهای انسانی یا خلاصههای دستیار.

---

## محاسبات صرفهجویی بالادستی

OmniRoute صرفهجویی ناشی از فشردهسازی را بر اساس دو منبع مستند میکند: بنچمارکهای پروژههای بالادستی و
ترکیب موتورهای خود OmniRoute.

| منبع    | عدد README بالادستی استفادهشده در اینجا                                                                       |
| ------- | ------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` توکن خروجی کمتر، `65%` میانگین صرفهجویی خروجی در بنچمارک، بازه `22-87%` و ابزار فشردهسازی ورودی `~46%` |
| RTK     | صرفهجویی `60-90%` در خروجی فرمان؛ نشست نمونه با `~118,000 -> ~23,900` توکن، یا `79.7%` صرفهجویی (`~80%`)      |

برای بارهای همپوشان ابزار/زمینه، ترکیب پیشفرض OmniRoute موتورها را بهصورت پشتهای اجرا میکند:

```txt
RTK -> Caveman
```

صرفهجویی ترکیبی، ضربی است، نه جمعی:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

عدد `78-95%` زمانی صدق میکند که هم RTK و هم Caveman بتوانند همان بار ورودی/زمینه را کاهش دهند.
حالت خروجی پاسخ Caveman جداگانه است: وقتی فعال باشد، از صرفهجویی خروجی خود Caveman استفاده کنید (میانگین `65%`،
عدد شاخص `~75%` و بازه `22-87%`). صرفهجویی کل در هزینه به ترکیب پرامپت/خروجی شما بستگی دارد.

### منظور واقعی از «واجد شرایط» چیست

بازه شاخص 15-95% واقعی است، اما فقط برای محتوای **تکراری یا پرحجم** کاربرد دارد — خطوط خطای تکراری،
گزارش ساختی که همان هشدار را پشتسرهم تکرار میکند، یا خروجی بیشازحد بزرگ `grep`/خواندن فایل. این
به این معنا **نیست** که هر درخواست همینقدر صرفهجویی دارد.

بهصورت تجربی تأیید شده است (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): یک
اجرای `stacked` (RTK + Caveman) روی یک بلوک `tool_result` با ساختار Anthropic که شامل 300 خط خطای یکسان بود،
**95.93% صرفهجویی توکن / 96.26% صرفهجویی کاراکتر** ایجاد کرد — دقیقاً در محدوده اعلامشده.
اما اجرای همان خط لوله روی خروجی عادی و غیرتکراری ابزار (فهرست تطبیقهای تمیز `grep`،
خواندن یک فایل کوتاه، متن مکالمهای معمولی) بهدرستی **صرفهجویی نزدیک به صفر** ایجاد میکند، زیرا
هیچ محتوای تکراری برای حذف وجود ندارد و `validateCompression()` (`validation.ts`) اجازه ارسال
بازنویسیای را نمیدهد که بلوکهای کد، URLها، عنوانها، نسخهها یا شناسههای ثابت تماماً با حروف بزرگ را حذف یا تغییر دهد.

این رفتاری مورد انتظار و ایمن است، نه یک باگ: یک نشست کدنویسی که عمدتاً فایلهای تمیز را میخواند یا در آنها
`grep` اجرا میکند، حتی با فعالبودن کامل فشردهسازی نیز صرفهجویی کلی محدودی خواهد داشت؛ درحالیکه نشستی که با یک حلقه
ناموفق یا یک لینتر پرحرف مواجه میشود، روی آن ترافیک از بازه کامل 78-95% بهره میبرد. درصد پایین
صرفهجویی تجمیعی یک نشست را بهتنهایی نشانه پیکربندی نادرست فشردهسازی ندانید — ابتدا بررسی کنید که آیا
خروجی ابزار واقعاً تکراری بوده است یا نه.

---

## نمایش تصویری صرفهجویی توکن

```
بدون فشردهسازی: 47K توکن ارسالشده به LLM
با Lite:         40K توکن ارسالشده          (15% صرفهجویی — ایمن، همیشه فعال)
با Standard:     33K توکن ارسالشده          (30% صرفهجویی — قواعد caveman-speak)
با Aggressive:   24K توکن ارسالشده          (50% صرفهجویی — کهنهسازی + خلاصهسازی)
با Ultra:        12K توکن ارسالشده          (75% صرفهجویی — هرس اکتشافی)
با RTK:          19K-5K توکن ارسالشده       (60-90% صرفهجویی در خروجی فرمان/ابزار)
با Stacked:      10K-2.5K توکن ارسالشده     (بازه 78-95% برای محتوای واجد شرایط RTK+Caveman)
```

---

## پیکربندی

### داشبورد

به `Dashboard → Context & Cache` بروید:

- **Caveman** — انتخاب حالت، بستههای زبان، پیشنمایش و پیشفرضهای سراسری
- **RTK** — پیشنمایش فیلتر دستور، تنظیمات ایمنی RTK و کاتالوگ فیلتر
- **Compression Combos** — خطوط لوله موتور نامگذاری شده اختصاص داده شده به ترکیبهای مسیریابی
- **Auto-Trigger Threshold** — فشردهسازی را به طور خودکار زمانی که تعداد توکن از آستانه فراتر رود، فعال میکند

### بازنویسی به ازای هر ترکیب

در `Dashboard → Context & Cache → Compression Combos`، یک ترکیب فشردهسازی را به یک ترکیب مسیریابی اختصاص دهید:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

این به شما امکان میدهد از فشردهسازی پشتهای در ارائهدهندگان رایگان/کدنویسی استفاده کنید در حالی که حالت لایت را در اشتراکهای پولی حفظ میکنید.

این تخصیص "بازنویسی به ازای هر ترکیب" یک کنترل متفاوت از بازنویسی **حالت فشردهسازی ترکیب مسیریابی** (Default/Off/Lite/Standard/Aggressive/Ultra) است — آن بازنویسی یک خط لوله ترکیب فشردهسازی نامگذاری شده را انتخاب نمیکند؛ فقط فیلد `compressionMode` را که توسط `resolveCompressionPlan` بررسی میشود، تنظیم میکند. این میتواند هم در کارت ترکیب (`Dashboard → Combos`) و هم، از زمان #6760، به ازای هر ترکیب مسیریابی در لیست "Assign to routing" در `Dashboard → Context & Cache → Compression Combos`، درست در کنار کادر انتخاب تخصیص خط لوله که در بالا مستند شده است، تنظیم شود. هر دو سطح از طریق همان نقطه پایانی `PUT /api/combos/{id}` پایدار میمانند.

### بازنویسی به ازای هر درخواست

هدر درخواست `x-omniroute-compression` را برای بازنویسی طرح فشردهسازی برای یک درخواست واحد ارسال کنید. این بالاترین اولویت را دارد — بازنویسی ترکیب مسیریابی، پروفایل فعال، فعالسازی خودکار و پیشفرض پنل را نادیده میگیرد. مقادیر ناشناخته نادیده گرفته میشوند (درخواست هرگز رد نمیشود) و سوئیچ اصلی سراسری هنوز همه چیز را کنترل میکند: وقتی فشردهسازی به صورت سراسری خاموش است، هدر نمیتواند آن را روشن کند. مقادیر:

| مقدار         | اثر                                                                                                               |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| `off`         | بدون فشردهسازی برای این درخواست.                                                                                  |
| `default`     | پروفایل پیشفرض مشتق شده از پنل (پروفایل فعال را نادیده میگیرد). موتورهای از دست دهنده خاموش میمانند.              |
| `safe`        | مشابه حذف هدر: فقط حذف تکرار و تاشو فضای خالی.                                                                    |
| `allow-lossy` | طرح اپراتور این درخواست را حفظ کنید، از جمله خلاصهها، فیلترهای مرتبط و بازنویسیهای سبک.                           |
| `engine:<id>` | یک موتور واحد در صورت فعال بودن، به عنوان مثال `engine:rtk`. این انتخاب به ازای هر درخواست برای آن موتور است.     |
| `<combo>`     | یک ترکیب نامگذاری شده، ابتدا بر اساس نام (بدون حساسیت به حروف بزرگ و کوچک) و سپس بر اساس شناسه مطابقت داده میشود. |

بدون `allow-lossy`، `engine:<id>` یا یک ترکیب نامگذاری شده، موتورهای از دست دهنده اعمال نمیشوند. درخواست همچنان حذف تکرار جلسه و تاشو فضای خالی را دریافت میکند زمانی که فشردهسازی روشن است.

طرح اعمال شده در هدر پاسخ `X-OmniRoute-Compression: <mode>; source=<source>` بازتاب داده میشود، که در آن `<source>` یکی از `request-header`، `routing-override`، `active-profile`، `auto-trigger`، `default` یا `off` است.

### API

```bash
# Get compression settings
curl http://localhost:20128/api/settings/compression

# Update compression settings
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Preview a specific RTK/stacked payload
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# List RTK filter packs
curl http://localhost:20128/api/context/rtk/filters

# Test RTK directly with optional command metadata
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## چه چیزهایی محافظت میشوند

موتور فشردهسازی **همیشه موارد زیر را حفظ میکند:**

- ✅ بلوکهای کد (محصور و درونخطی)
- ✅ نشانیهای URL و مسیرهای فایل
- ✅ ساختارهای JSON و دادههای ساختیافته
- ✅ شناسهها و توکنهای فنی محافظتشده
- ✅ عبارتهای ریاضی
- ✅ تعریف فراخوانی ابزار/تابع
- ✅ پرامپتهای سیستمی (در حالت lite)

بازیابی خروجی خام RTK، کلیدهای API رایج، توکنهای bearer، توکنهای Slack، کلیدهای دسترسی AWS،
گذرواژهها، توکنها و اسرار را پیش از ذخیرهشدن هر چیزی حذف میکند.

---

## آمار فشردهسازی

هر درخواست فشردهشده شامل آماری در لاگهای سرور است:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## نقشه راه فازها

| فاز    | حالتها                                                                                                                                        | وضعیت        |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| فاز 1  | Off, Lite                                                                                                                                     | ✅ ارسال شده |
| فاز 2  | Standard, Aggressive, Ultra                                                                                                                   | ✅ ارسال شده |
| فاز 3  | RTK, Stacked, Compression Combos                                                                                                              | ✅ ارسال شده |
| فاز 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                   | ✅ ارسال شده |
| فاز 4C | Adaptive context-budget ("dial") — compute engine + API (`contextBudget` on `PUT /api/settings/compression`) + dashboard mode/policy controls | ✅ ارسال شده |

---

## قدردانیها

قواعد فشردهسازی حالت Standard از **[Caveman](https://github.com/JuliusBrussee/caveman)**، ساخته **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+)، الهام گرفته شدهاند — پروژه فراگیر «چرا وقتی توکن کم کار را انجام میدهد، از توکن زیاد استفاده کنیم». Caveman کاهش `~75%` در توکنهای خروجی، میانگین `65%` صرفهجویی خروجی در بنچمارک، بازه `22-87%` برای خروجی و یک ابزار فشردهسازی ورودی با نرخ `~46%` را گزارش میکند.

حالت RTK از **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**، ساخته **[RTK AI](https://github.com/rtk-ai)**، الهام گرفته شده است — پروژهای با کارایی بالا برای فشردهسازی خروجی فرمانها در ترمینال، فرایند ساخت، آزمایش، git و پالایش خروجی ابزارها. RTK صرفهجویی `60-90%` را گزارش میکند و نشست نمونه در README آن، صرفهجویی `~80%` را نشان میدهد.

---

## سیستمهای فشردهسازی پیشرفته

فراتر از ۷ حالت استاندارد، OmniRoute شامل چندین سیستم فشردهسازی پیشرفته است که به طور خودکار بر اساس زمینه عمل میکنند.

### فشردهسازی آگاه به کش (Cache-Aware)

برخی از ارائهدهندگان (مانند Anthropic با کش کردن پرامپت) از **کش کردن پرامپت** پشتیبانی میکنند، که به آنها امکان میدهد بخشهایی از پرامپت را کش کنند تا هزینهها و تأخیر را کاهش دهند. هنگامی که کش فعال است، فشردهسازی تهاجمی در واقع میتواند به عملکرد **آسیب برساند** زیرا توکنهای کش شده را تغییر داده و کش را نامعتبر میکند.

ماژول `cachingAware.ts` این مشکل را با **تشخیص زمینه کش** و **تنظیم استراتژی فشردهسازی** بر این اساس حل میکند.

#### نحوه عملکرد

1.  **تشخیص زمینه کش** — بدنه درخواست را برای نشانگرهای `cache_control` اسکن میکند.
2.  **شناسایی ارائهدهندگان کش** — بررسی میکند که آیا ارائهدهنده هدف از کش پشتیبانی میکند یا خیر.
3.  **تنظیم استراتژی** — برای ارائهدهندگان کش، حالتهای `aggressive`/`ultra` را به `standard` کاهش میدهد.
4.  **رد کردن پرامپت سیستمی** — پرامپتهای سیستمی معمولاً کش میشوند، بنابراین آنها را فشرده نمیکند.
5.  **استفاده از تبدیلهای قطعی** — فقط از تبدیلهایی استفاده میکند که خروجی سازگار تولید میکنند.

#### مثال کد

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← نشانگر کش
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### زمان استفاده

فشردهسازی آگاه به کش **همیشه فعال است** — نیازی به پیکربندی نیست. این قابلیت فقط زمانی فعال میشود که:

- درخواست دارای نشانگرهای `cache_control` باشد.
- ارائهدهنده هدف از کش کردن پرامپت پشتیبانی کند (Anthropic, OpenAI و غیره).

### کهنسازی تدریجی (Progressive Aging)

مکالمات طولانی، نوبتهای پیام زیادی را انباشته میکنند، اما نوبتهای قدیمیتر کمتر مرتبط میشوند. ماژول `progressiveAging.ts` **پیامها را بر اساس فاصله نوبت کاهش میدهد**:

- **نوبتهای اخیر (۰-۳)**: به صورت کلمهبهکلمه حفظ میشوند (جزئیات کامل).
- **نوبتهای میانی (۴-۸)**: فشردهسازی سبک (فضاهای خالی، پاکسازی قالببندی).
- **نوبتهای قدیمی (۹+)**: فشردهسازی غارنشینی (حذف کلمات پرکننده، خلاصهسازی).
- **نوبتهای بسیار قدیمی (۲۰+)**: به شدت خلاصهسازی یا حذف میشوند.

#### مثال کد

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 نوبت دیگر ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 3 نوبت اول: کلمهبهکلمه
  light: 8, // نوبتهای 4-8: فشردهسازی سبک
  moderate: 20, // نوبتهای 9-20: فشردهسازی غارنشینی
  // نوبتهای 21+: خلاصهسازی سنگین
});

// saved = تعداد توکنهای ذخیره شده
```

#### زمان استفاده

کهنسازی تدریجی برای حالتهای `aggressive` و `ultra` **همیشه فعال است**. این قابلیت به ویژه برای موارد زیر مؤثر است:

- جلسات کدنویسی طولانیمدت
- مکالمات چند روزه
- جریانهای کاری عاملمحور با فراخوانیهای ابزاری زیاد

### حالت خروجی غارنشینی (Caveman Output Mode)

ماژول `outputMode.ts` **دستورالعملهای پرامپت سیستمی** را تزریق میکند تا خود مدل خروجی فشرده و مختصر (به سبک "غارنشینی") تولید کند.

#### نحوه عملکرد

به جای فشردهسازی ورودی، این حالت یک پرامپت سیستمی مانند زیر اضافه میکند:

> "با کمترین کلمات پاسخ دهید. از تعارفات بپرهیزید. از جملات کوتاه استفاده کنید."

این روش به ویژه برای موارد زیر خوب عمل میکند:

- تولید کد (خروجی مختصرتر = توکنهای کمتر)
- پرسش و پاسخ سریع (نیازی به توضیحات مفصل نیست)
- پردازش دستهای (به حداکثر رساندن توان عملیاتی)

#### زمان استفاده

حالت خروجی غارنشینی **اختیاری است** — آن را از طریق پیکربندی ترکیبی تنظیم کنید:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### سبکهای خروجی (کاتالوگ)

حالت خروجی غارنشینی که در بالا ذکر شد، **مسیر تکسبکی قدیمی** است. فاز ۴ آن را به یک کاتالوگ از سبکهای خروجی قابل ترکیب تعمیم داد: `OUTPUT_STYLE_CATALOG` در `open-sse/services/compression/outputStyles/catalog.ts`. هر سبک یک دستورالعمل پرامپت سیستمی است که باعث میشود خود مدل خروجی ارزانتری تولید کند؛ سبکها میتوانند با هم فعال شوند و به ترتیب کاتالوگ تزریق میشوند.

| سبک | `id` | کاری که انجام میدهد bona.  
Terse prose | `terse-prose` | Drop filler/articles/hedging; keep technical substance exact. Same text as the legacy caveman output mode (referenced, not re-typed). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Less code | `less-code` | YAGNI ladder: smallest working change, no unrequested abstractions. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ponytail (lazy senior dev) | `ponytail` | "The best code is the code never written": reuse > rewrite, root cause > symptom, shortest working diff. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| I have ADHD (action-first) | `i-have-adhd` | Action first (command/path/snippet before prose), numbered bounded steps, ONE concrete next step, no preamble/recap/closers. Adapted from [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Terse CJK (文言) | `terse-cjk` | Classical-Chinese ultra-terse style. | zh (locale-gated: only offered when the resolved language is `zh`) |

هر سبک دارای سه سطح شدت است — `lite`، `full`، `ultra` — و هر سطح
با بند مرزهای مشترک به پایان میرسد، که بلوکهای کد، مسیرهای فایل، دستورات،
رشتههای خطا، URLها و شناسهها را بدون تغییر نگه میدارد.

#### نحوه عملکرد تزریق

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) انتخاب را در برابر کاتالوگ حل میکند (شناسههای ناشناخته و سبکهای نامتناسب با زبان محلی
نادیده گرفته میشوند، هرگز خطا نیستند)، دستورالعملهای انتخاب شده را به ترتیب کاتالوگ به هم متصل میکند،
بند مرزها را **یک بار** اضافه میکند، و نتیجه را در ابتدای اعلان سیستم
پشت یک نشانگر یکسانسازی (`[OmniRoute Output Styles]`) قرار میدهد — اعمال مجدد
عملیاتی بیاثر است. هنگامی که زبان درخواست شناسایی شده دارای ترجمه باشد،
دستورالعمل محلی به جای انگلیسی تزریق میشود.

#### نحوه فعالسازی

در داشبورد: **Context → Settings → Compression** — یک ردیف برای هر سبک با یک
کلید روشن/خاموش و یک انتخابگر سطح. به صورت برنامهنویسی، پیکربندی فشردهسازی
انتخاب را به صورت زیر حفظ میکند:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

سازگاری با نسخههای قبلی: تنظیم ترکیبی قدیمی `outputMode: "caveman"` همچنان کار میکند و به
`terse-prose` نگاشت میشود، که از نظر بایت با تزریق قدیمی در هر زبان قدیمی یکسان است.

انتخاب زبان: با فعال بودن `languageConfig.enabled`، `autoDetect`
زبان آخرین پیام کاربر را انتخاب میکند (همان آشکارساز موتورهای ورودی)؛
غیرفعال کردن `autoDetect` زبان پیشفرض را ثابت میکند. غیرفعال → انگلیسی.

ماتریس سبک × زبان توسط
`tests/unit/compression/output-styles-i18n-matrix.test.ts` ثابت شده است: یک سبک جدید نمیتواند
بدون حداقل یک ترجمه pt-BR (یا یک استثنای ردیابی شده صریح) منتشر شود، و یک
سبک موجود نمیتواند بیصدا یک زبان محلی را از دست بدهد. برای افزودن یک سبک، به
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style) مراجعه کنید.

### فشردهسازی نتایج ابزار

ماژول `toolResultCompressor.ts` **5 استراتژی فشردهسازی تخصصی**
برای نتایج ابزار (فراخوانی توابع، خروجیهای عامل، نتایج جستجو و غیره) ارائه میدهد:

1.  **فشردهسازی نتایج جستجو** — نتایج اضافی را حذف میکند، N-بالا را نگه میدارد
2.  **فشردهسازی خواندن فایل** — فایلهای بزرگ را کوتاه میکند، سرصفحهها/واردات را حفظ میکند
3.  **فشردهسازی اجرای کد** — فقط stdout/stderr ضروری را نگه میدارد
4.  **فشردهسازی پرس و جوی پایگاه داده** — ردیفها را محدود میکند، فرادادههای پرحرف را حذف میکند
5.  **فشردهسازی پاسخ API** — فیلدهای null را حذف میکند، آرایهها را فشرده میکند

#### زمان استفاده

فشردهسازی نتایج ابزار **همیشه روشن است** هنگامی که فراخوانی ابزار وجود دارد.
نیازی به پیکربندی نیست.

### خط لوله پشتهای

حالت پشتهای **چندین موتور را به صورت متوالی** اجرا میکند — معمولاً RTK ابتدا
(60-90% صرفهجویی در خروجی ابزار)، سپس Caveman (30% صرفهجویی اضافی در
متن باقیمانده). این به **78-95% صرفهجویی کلی** دست مییابد.

#### نحوه عملکرد

```
ورودی (1000 توکن)
  → RTK (فیلتر آگاه به دستور) → 200 توکن
    → Caveman (حذف پرکننده) → 140 توکن
  → خروجی (140 توکن، 86% صرفهجویی)
```

#### زمان استفاده

از حالت پشتهای برای موارد زیر استفاده کنید:

- گردشهای کاری سنگین ابزار (کدنویسی عامل، تحقیق)
- پردازش دستهای حساس به هزینه
- هنگامی که به حداکثر صرفهجویی در توکن نیاز دارید

از طریق ترکیب پیکربندی کنید:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## بازنویسیهای ترکیبی فشردهسازی

میتوانید حالت سراسری فشردهسازی را **برای هر ترکیب** بازنویسی کنید تا رفتار آن را برای موارد استفاده مختلف بهدقت تنظیم کنید:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

این قابلیت برای موارد زیر مفید است:

- **ترکیبهای کدنویسی**: برای نشستهای طولانی از حالت `aggressive` استفاده کنید
- **ترکیبهای پرسشوپاسخ سریع**: برای پاسخهای سریع از حالت `lite` استفاده کنید
- **ترکیبهای متکی بر ابزار**: برای حداکثر صرفهجویی از حالت `stacked` استفاده کنید
- **ترکیبهای محیط عملیاتی**: برای ارائهدهندگان دارای قابلیت کش از حالت `cache-aware` استفاده کنید

---

## همچنین ببینید

- [پیکربندی محیط](../reference/ENVIRONMENT.md) — متغیرهای محیطی فشردهسازی
- [راهنمای معماری](../architecture/ARCHITECTURE.md) — جزئیات داخلی خط لوله فشردهسازی
- [راهنمای کاربر](../guides/USER_GUIDE.md) — شروع کار با فشردهسازی
- [فشردهسازی RTK](./RTK_COMPRESSION.md) — فیلترهای RTK، مدل اعتماد، دروازه تأیید و بازیابی خروجی خام
- [موتورهای فشردهسازی](./COMPRESSION_ENGINES.md) — Caveman، RTK، حالت انباشته، APIها، MCP و داشبورد
- [قالب قوانین فشردهسازی](./COMPRESSION_RULES_FORMAT.md) — قالب بسته قوانین JSON
- [بستههای زبانی فشردهسازی](./COMPRESSION_LANGUAGE_PACKS.md) — قوانین مختص زبان Caveman
