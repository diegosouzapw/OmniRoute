# Subscription-first routing (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> دو شناسهٔ جدید `auto/*` — یعنی `auto/subscription` و `auto/thrifty`. هر دو فقط با درخواست صریح فعال میشوند:
> هیچ درخواستی از آنها عبور نمیکند، مگر اینکه فراخواننده شناسه را با نام درخواست کند، و هیچ
> pool، strategy یا مقدار پیشفرض موجودی تغییر نمیکند.

## دلیل وجود این قابلیت

OmniRoute از قبل به دو پرسش دربارهٔ هزینه پاسخ میدهد، اما هیچکدام همان پرسشی نیست که بیشتر اپراتورها مطرح میکنند.

| سازوکار موجود                                            | پرسشی که پاسخ میدهد                                         |
| -------------------------------------------------------- | ----------------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | «آیا این مدل در کاتالوگ بهعنوان رایگان ثبت شده است؟»        |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | «آیا ممکن است این connection هرگز برای من هزینه ایجاد کند؟» |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | «آیا این connection به سقف خود نزدیک شده است؟»              |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | «هزینه را محدود کن و به ارزانترین گزینه تنزل بده»           |

تمام سازوکارهای مختص گزینههای رایگان **بهصورت بسته شکست میخورند** — یک pool رایگانِ تمامشده، یک pool خالی است و هرگز
به گزینهای پولی ارتقا نمییابد — و تمام سازوکارهای سمت پولی نسبت به رده بیتفاوتاند. هیچکدام به این پرسش پاسخ نمیدهند:

> «از سهمیهای استفاده کن که از قبل هزینهاش را میپردازم. وقتی تمام شد، یا متوقف شو، یا هر بار
> یک پله از میان ارزانترین گزینههای پولی بالاتر برو — و بهمحض بازنشانی سهمیه، به آن بازگرد.»

## صورتحساب ویژگی یک connection است، نه یک مدل

`classifyTier()` (`open-sse/services/tierResolver.ts`) بر اساس `(provider, model)` کلیدگذاری میکند و با توجه به قیمتگذاری
کاتالوگ، یکی از مقادیر `free | cheap | premium` را برمیگرداند. اما اینکه یک درخواست هزینهٔ افزایشی ایجاد میکند یا نه،
به **connectionای که آن را سرویس میدهد** بستگی دارد: همان مدل از طریق یک connection مبتنی بر Claude Code
OAuth در طرح اشتراک گنجانده شده است، اما از طریق یک connection مبتنی بر API-key بهازای هر token صورتحساب میشود.

`provider_connections.auth_type` در هیچیک از دو جهت شاخص قابلاعتمادی نیست — connectionهای OAuth دارای محاسبهٔ مصرف
وجود دارند و connectionهای API-key گنجاندهشده در طرح نیز وجود دارند (یک token مربوط به جایگاه Copilot، یک
API key دارای محاسبهٔ مصرف نیست). بنابراین کلاس صورتحساب از یک **کاتالوگ گزینششده** به نام
`open-sse/config/connectionBillingCatalog.ts` به دست میآید که بر اساس شرایط منتشرشدهٔ هر provider بهصورت دستی تنظیم
میشود — همان الگویی که `FreeModelBudget.hardStopGuaranteed` از قبل برای مدلهای رایگان پایهگذاری کرده است.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

ترتیب تفکیک (`autoCombo/connectionBilling.ts`) چنین است: sentinel مصنوعیِ بدون احراز هویت ←
`keyless`؛ یک ورودی کاتالوگ که هم با provider **و هم** با `authType` مطابقت دارد؛ یک ورودی سراسری برای provider؛
و در غیر این صورت `unknown`. **گزینشنشده بهمعنای رایگان نیست** — مقدار `unknown` در همهجا مانند `metered`
مصرف میشود؛ بنابراین providerی که فردا اضافه شود، کار خود را خارج از پلهٔ subscription آغاز میکند و باید
عمداً در کاتالوگ گنجانده شود.

## مدل پلهای

پنج پله بهترتیب ارتقا وجود دارد. تفاوت آنها صرفاً در قیمت نیست — هرکدام سیگنال **اتمام**
مختص به خود را دارد؛ به همین دلیل، این سازوکار صرفاً یک مرتبسازی نیست.

| #   | پله            | عضویت                                                         | زمان اتمام                             |
| --- | -------------- | ------------------------------------------------------------- | -------------------------------------- |
| 0   | `subscription` | `billing: "subscription"` گزینششده                            | رسیدن پنجرهٔ سهمیه به cutoff یا کمتر   |
| 1   | `keyless`      | مسیر مصنوعیِ بدون احراز هویت                                  | cooldown / breaker مربوط به connection |
| 2   | `free`         | connection دارای محاسبهٔ مصرف، `classifyTier() === "free"`    | اتمام سهمیهٔ رایگان                    |
| 3   | `cheap`        | connection دارای محاسبهٔ مصرف، `classifyTier() === "cheap"`   | مصرفشدن بودجهٔ هر پله                  |
| 4   | `premium`      | connection دارای محاسبهٔ مصرف، `classifyTier() === "premium"` | مصرفشدن بودجهٔ هر پله                  |

پلههای 0 تا 2 بر اثر اتمام **سهمیه** تمام میشوند؛ چیزی که قابل مشاهده است و از قبل ردیابی میشود. پلههای 3 تا 4
سهمیهای ندارند — یک connection پولی میتواند برای همیشه سرویس ارائه کند — بنابراین تنها سیگنال معقول برای اتمام آنها،
**بودجهای** مختص هر پله است. بدون چنین بودجهای، عبارت «وقتی cheap تمام شد، ارتقا بده» هیچ محرکی ندارد.

## `auto/subscription` — بستهماندن در حالت خطا

مخزن = فقط پلهٔ 0، محدود به اتصالهایی که مازاد مصرف آنها بهصورت مستند `hard-stop` است و برای هرکدام بهطور زنده تأیید شده که ظرفیت سهمیهٔ کافی دارند. هر مورد مبهمی کنار گذاشته میشود: ارائهدهندهای که گزینش و بررسی نشده، خوانش سهمیهای که قابل تأیید نیست، خوانشی قدیمی، یا مازاد مصرفی که به استفادهٔ پولی محاسبه میشود.

خالیبودن مخزن، پاسخ **مورد انتظار** است، نه یک نقص — مسیر فعلی مخزن خالی در فراخواننده، آن را به خطایی روشن تبدیل میکند، نه یک بازگشت بیسروصدا و هزینهزا. این تمام تضمین این شناسه است.

`keyless` عمداً واجد شرایط **نیست**: این گروهبندی بهمعنای «طرحی که بابتش پول میپردازم» است، بنابراین یک بکاند بدون احراز هویت به آن تعلق ندارد. برای آن از `auto/thrifty` (یا `auto/best-free`) استفاده کنید.

### ایمنی اتصال

یک کاندیدا همیشه به یک اتصال واحد وابسته نیست — یک کاندیدای منطقی دارای فهرست مجاز `allowedConnectionIds` است و حسابی که واقعاً استفاده میشود بعداً، هنگام ارسال، توسط `open-sse/services/combo/autoStrategy.ts` انتخاب میشود. بنابراین هر دو گروهبندی، **هر اتصال را جداگانه** تأیید میکنند و `allowedConnectionIds` را طوری بازنویسی میکنند که دقیقاً تنها شامل زیرمجموعهٔ باقیمانده باشد — نه هیچگاه کل فهرست اصلی و نه یک عضو انتخابشده بهصورت دلخواه. ازآنجاکه `autoStrategy.ts` از قبل این آرایه را بهعنوان یک فهرست مجاز سختگیرانه اعمال میکند، بازنویسی آن در اینجا باعث میشود مجموعهٔ «تأییدشده» و «واقعاً استفادهشده» ذاتاً یکسان باشند. این همان ناوردایی و همان استدلال [STRICT_ZERO_COST](./STRICT_ZERO_COST.md) است.

## `auto/thrifty` — هر بار یک پله بالاتر بروید

مخزن = همهٔ پلهها، مرتبشده بر اساس شاخص پله، با حذف کاندیداهای دارای سهمیهٔ تمامشده. موتور `auto` همچنان **درون** مخزن باقیمانده امتیازدهی میکند: نردبان تعیین میکند کدام پلهها فعال باشند و امتیازدهی مشخص میکند کدام کاندیدا درون آنها برنده شود. ترتیب درون هر پله پایدار است، بنابراین این لایه هرگز رتبهبندی خودِ امتیازدهنده را جابهجا نمیکند.

این یک لایهٔ ترتیبدهی + دروازهبانی است، **نه** یک ارسالگر جدید: حلقهٔ گمانهزن `combo.ts` از قبل هدفها را بهترتیب پیمایش میکند و در صورت شکست به هدف بعدی میرود؛ بنابراین اگر سهمیه هنگام اجرا تمام شود و بررسی اولیه آن را تشخیص نداده باشد، همچنان در همان درخواست به پلهٔ بعدی ارتقا مییابد.

درحالیکه `auto/subscription` در حالت خطا **بسته** میماند، `auto/thrifty` **باز** میماند: اتصالی که در طرح گنجانده شده اما خوانش سهمیهٔ قابلاستفادهای ندارد، همچنان ابتدا امتحان میشود. امتحانکردن آن هیچ هزینهای ندارد و اگر مشخص شود سهمیهاش تمام شده، مسیر جایگزین در هر صورت به پلهٔ بعدی میرسد — درحالیکه خودداری از امتحانکردن آن باعث میشود در صورت نبود دادههای تلهمتری، درخواست به یک پلهٔ پولی ارسال شود؛ دقیقاً همان پیامدی که این گروهبندی برای جلوگیری از آن وجود دارد.

## بازگشت به طرح پس از بازنشانی

پیش از آنکه مسیریابی به پلهٔ 0 بازگردد، سه مورد مستقل باید منقضی شوند. اصلاح فقط یکی از آنها باعث میشود نردبان مدتها پس از پرشدن مجدد طرح، همچنان روی پلههای پولی گیر کند.

1. **کش وضعیت سهمیه** — `freeAccessQuota.ts` برای هر `(provider, connection)` با TTL برابر با 180s کش میکند. ورودی کشی که `resetAt` خودش گذشته باشد، پنجرهای را توصیف میکند که دیگر وجود ندارد؛ بنابراین اکنون **صرفنظر از عمرش** قدیمی تلقی شده و بهروزرسانی اجباری میشود. بدون این رفتار، طرحی که نیمهشب دوباره پر شده تا زمانی که TTL بهطور اتفاقی منقضی شود، همچنان تمامشده خوانده میشود.
2. **وضعیت خود نردبان** — بنا بر طراحی، چنین وضعیتی وجود ندارد. واجد شرایط بودن پلهها در هر بار ساخت مخزن، از روی وضعیت زندهٔ سهمیه دوباره محاسبه میشود؛ هیچ رکورد ماندگاری با عنوان «اکنون روی پلهٔ 3» وجود ندارد که بتواند پس از بازنشانی باقی بماند و مسیریابی را قفل کند.
3. **دورهٔ انتظار اتصال** — خطای 429 ناشی از اتمام سهمیه، `rateLimitedUntil` را بر اساس عقبنشینی نمایی تنظیم میکند که برای اتصال یک طرح میتواند از زمان بازنشانی واقعی فراتر رود. `clampCooldownToReset()` (`subscriptionLadder.ts`) دورهٔ انتظار را به لحظهٔ بازنشانی خودِ بالادست محدود میکند و هرگز نمیتواند آن را طولانیتر کند. **این قابلیت پیادهسازی و آزمایش شده، اما هنوز متصل نشده است**: کش سهمیه در `src/sse/services/auth.ts` _پیش از_ نوشتهشدن هرگونه دورهٔ انتظار نامعتبر میشود، بنابراین `resetAt` باید زودتر در همان تابع ثبت شود — تغییری در مسیر حساس تابآوری که باید در PR بازبینیشدهٔ جداگانهای انجام شود. تا آن زمان، ورود مجدد تا پایان دورهٔ انتظار اتصال صبر میکند (که در صورت ارسال راهنمای `Retry-After` توسط ارائهدهنده، از قبل آن را ترجیح میدهد).

### جلوگیری از نوسان

پلهای که بهتازگی بازنشانی شده فقط وقتی دوباره پذیرفته میشود که بالاتر از `reentryMinRemainingPercent` (پیشفرض 5) باشد، درحالیکه اتصالی که از قبل فعال است فقط باید بالاتر از `exitCutoffPercent` (پیشفرض 2، منطبق با `quotaPreflight.defaultThresholdPercent`) باقی بماند. فاصلهٔ میان این دو، باند پسماند است — بدون آن، اتصالی که پیرامون آستانه نوسان میکند، در درخواستهای متوالی بین پلهها جابهجا میشود.

## پیکربندی

فقط برای تنظیم دقیق. عمداً هیچ پرچم `enabled`ای وجود ندارد: کلیدی که بتواند این موارد را غیرفعال کند
باعث میشود `auto/subscription` بیسروصدا کل مجموعه — از جمله مدلهای پولی — را با نامی
ارائه کند که خلاف آن را وعده میدهد.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // مقدار 0 یک پله را کاملاً غیرفعال میکند
  },
}
```

محدودسازی بودجه تا زمانی که یک تحلیلگر هزینه متصل نشده باشد، غیرفعال است: اگر هیچ حسابداریای
در دسترس نباشد، یک پله پولی مرتب میشود اما هرگز محدود نمیشود. از v3.8.51، تنظیم `rungBudgetUsd`
توسط طرحواره پذیرفته میشود، اما هنوز اعمال نمیشود — آن را پیکربندی رزروشده در نظر بگیرید، نه
سقف هزینه فعال. ترتیب پلهها، اتمام مبتنی بر سهمیه و ورود مجدد پس از بازنشانی، همگی بدون آن
کار میکنند.

## ترکیب

`subscription` و `thrifty` مقادیر `AutoTier` هستند، بنابراین با هر دستهای ترکیب میشوند:
`auto/coding:thrifty`، `auto/reasoning:subscription` و به همین ترتیب. دو شناسه تخت
(`auto/subscription` و `auto/thrifty`) در `/v1/models` و داشبورد معرفی میشوند.

هیچیک از این شناسهها متعلق به رده پولی نیستند، بنابراین `isPaidTierAutoId()` برای هر دو
مقدار `false` را برمیگرداند و `auto/subscription` پس از اعمال `hidePaidModels` باقی میماند.

## محل کد

| موضوع                                 | فایل                                                |
| ------------------------------------- | --------------------------------------------------- |
| اطلاعات منتخب صورتحساب                | `open-sse/config/connectionBillingCatalog.ts`       |
| طبقهبندیکننده                         | `open-sse/services/autoCombo/connectionBilling.ts`  |
| پلهها، هر دو گروهبندی و ورود مجدد     | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| اتصال به مجموعه نامزدها               | `open-sse/services/autoCombo/virtualFactory.ts`     |
| کهنگی حافظه نهان با آگاهی از بازنشانی | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| سطح رده                               | `open-sse/services/autoCombo/suffixComposition.ts`  |
| شناسههای معرفیشده                     | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| آزمونها                               | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
