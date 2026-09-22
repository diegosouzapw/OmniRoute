# Compression Engines (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

فشردهسازی OmniRoute بر پایه قراردادهای موتور ساخته شده است. هر حالت میتواند مستقیماً یک موتور
(`caveman` یا `rtk`) یا یک خط لوله پشتهای قطعی را اجرا کند که چندین موتور را بهترتیب اجرا میکند.

## حالتها

| حالت         | مسیر موتور                          | ورودی موردنظر                                      |
| ------------ | ----------------------------------- | -------------------------------------------------- |
| `off`        | هیچکدام                             | حفظ دقیق پرامپت                                    |
| `lite`       | ابزارهای کمکی سبک Caveman           | پاکسازی کمریسک و همیشه فعال                        |
| `standard`   | Caveman                             | فشردهسازی پرامپت زبان طبیعی                        |
| `aggressive` | Caveman + خلاصهسازهای تاریخچه/ابزار | نشستهای طولانی گفتگو                               |
| `ultra`      | Caveman + ابزارهای کمکی هرس         | بازیابی از محدودیت زمینه                           |
| `rtk`        | RTK                                 | خروجی ترمینال، پوسته، ساخت، آزمون و git            |
| `omniglyph`  | OmniGlyph                           | زمینه بهصورت تصویر در مسیر ارتباطی ارائهدهنده بومی |
| `stacked`    | خط لوله، پیشفرض `rtk -> caveman`    | گزارشهای ترکیبی ابزار و نثر، بیشترین صرفهجویی      |

### پروفایلهای فشردهسازی OmniGlyph

موتور `omniglyph` (بسته `omniglyph`، 1.4.0+) یک پروفایل معنایی نامگذاریشده میپذیرد که
بهصورت سراسری از طریق `omniglyph.profile` در تنظیمات فشردهسازی یا برای هر گام از طریق
پیکربندی گام در خط لوله پشتهای تنظیم میشود:

| پروفایل       | محدوده                                                                                                                 |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | پیشفرض. سیاستی که رسیدهای منتشرشده اندازهگیری کردهاند — سامانه، مستندات ابزار و تاریخچه متراکم را به تصویر تبدیل میکند |
| `balanced`    | وضعیت زنده را بومی نگه میدارد، از ۸ نوبت آخر محافظت میکند و تاریخچه بسته قدیمیتر را فرومیریزد                          |
| `coding-safe` | مرجعیت، شِماهای ابزار و خروجی زنده ابزار را بومی نگه میدارد و از ۱۲ نوبت آخر محافظت میکند                              |
| `passthrough` | بدون تبدیل مسیریابی میکند؛ موتور نادیده گرفته میشود                                                                    |

پروفایل یک **سقف است، نه کف**: تابع `mergeCompressionProfileOptions` در بسته
اجازه نمیدهد بازنویسی فراخواننده، مسیر اتلافیای را که پروفایل بسته است دوباره باز کند؛ بنابراین تنظیم
`preserveSystemPrompt: false` برای هر گام نمیتواند فشردهسازی سامانه را تحت `coding-safe` دوباره فعال کند.

اندازهگیریشده روی این کدبیس: `coding-safe` و `balanced` مقدار `minCompressChars` را به
حداکثر میرسانند و سامانه، شِماهای ابزار و نتایج ابزار را بومی نگه میدارند؛ بنابراین نشستی که هنوز
تاریخچهای انباشته نکرده است، در `below_min_chars` متوقف میشود و موتور هیچ چیزی را تبدیل نمیکند. به
همین دلیل، حالت پیشفرض بهجای امنترین پروفایل، `aggressive` است.

بسته، دامنه مدل و پروفایل خود را از پیکربندی محیطیاش تعیین میکند.
OmniRoute هرگز این تصمیم را واگذار نمیکند: آداپتور دروازه مدل را به محدودکنندهترین دامنه بسته
مقید میکند؛ بنابراین تنظیمات محیط میزبان فقط میتوانند فهرست مجاز را محدودتر کنند و هرگز نمیتوانند
آن را فراتر از رسیدهای اندازهگیریشده OmniRoute گسترش دهند.

## رجیستری موتور

رجیستری در `open-sse/services/compression/engines/registry.ts` قرار دارد. موتورها یک قرارداد مشترک ارائه میکنند:

- `id`: شناسهٔ پایدار موتور، مانند `caveman` یا `rtk`
- `apply(text, config)`: مسیر اجرای قدیمی که توسط پایپلاینهای پشتهای استفاده میشود
- `compress(input, config)`: مسیر اجرای اصلی که متن + آمار را برمیگرداند
- `getConfigSchema()`: ساختاری مشابه JSON-Schema از پیکربندی معتبر را برمیگرداند
- `validateConfig(config)`: مقدار `{ valid, errors[] }` را برمیگرداند

ثبت با استفاده از `registerCompressionEngine(engine)` (یا برای موارد پیشرفته، `registerEngine`) انجام میشود که پیش از پذیرش، `assertValidEngine()` و `validateConfig(defaultConfig)` را فراخوانی میکند.
برای حذف یک موتور در زمان اجرا، از `unregisterCompressionEngine(id)` استفاده کنید.

`strategySelector.ts` موتورهای داخلی را پیش از اجرای فشردهسازی ثبت میکند. این کار باعث میشود پیشنمایش، فشردهسازی زمان اجرا، حالت پشتهای، آزمونها و موتورهای آینده همگی از مسیر اجرای یکسانی استفاده کنند.

### فشردهسازی توضیحات MCP (مرتبط)

یک رجیستری جداگانه، فرادادهٔ توضیحات ابزار MCP را در سطح رجیستری فشرده میکند — به
`open-sse/mcp-server/descriptionCompressor.ts` و [MCP-SERVER.md](../frameworks/MCP-SERVER.md) مراجعه کنید. این رجیستری از قوانین Caveman استفادهٔ مجدد میکند، اما بهجای محتوای درخواستها روی فرادادهٔ ابزار عمل میکند.

### موتورهای داخلی بیشتر

علاوه بر Caveman، RTK و LLMLingua-2، رجیستری شامل چندین موتور تخصصی بدون اتلاف /
ساختاری است (که توسط پایپلاینهای پشتهای، محیط آزمایشی و آزمونها استفاده میشوند):

| موتور         | شناسه           | کاری که انجام میدهد                                                                                                                                                                          |
| ------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): بلوکهای بزرگ و پیوستهٔ متن را با ارجاعهای مبتنی بر آدرس محتوا جایگزین میکند تا بلوکهای تکراری/بزرگ یکبار ارسال شوند و پس از آن با ارجاع به آنها استفاده شود. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): فشردهسازی جدولی هوشمند و بدون اتلاف برای محتوای آرایههای JSON همگن در قالب ستونی `[N rows]`.                                                                         |
| ionizer       | `ionizer`       | نمونهبرداری از ردیفهای ابتدا/میانه/انتها برای بلوکهای همگن بسیار بزرگ که بخش میانی حذفشده را بهعنوان یک ارجاع CCR مبتنی بر آدرس محتوا ذخیره میکند.                                           |
| session-dedup | `session-dedup` | حذف تکرار مبتنی بر آدرس محتوا میان نوبتها (با الهام از TokenMizer): متنی را که پیشتر در نوبتهای قبلی همان نشست دیده شده است، حذف میکند.                                                      |

**دستورالعمل پروتکل بازیابی CCR (#8033):** نخستین باری که CCR تعداد ≥1 بلوک را در یک
درخواست جایگزین میکند، موتور یک پیام `system` واحد و ایدمپوتنت را در ابتدای پیامها قرار میدهد (که با
نشانهٔ نگهبان `[CCR protocol]` آغاز میشود) تا قرارداد نشانگر ← ابزار را به فراخواننده آموزش دهد: اینکه نشانگر
`[CCR retrieve hash=<24hex> chars=N]` چه معنایی دارد، هش باید عیناً کپی شود
(هر 24 نویسهٔ هگز — هشهایی که اشتباه کپی شدهاند، علت محتمل خطاهای «بلوک یافت نشد» هستند)،
و نشانگر `[dedup:ref sha=...]` بهمعنای «به تاریخچه رجوع کن» است، نه «ابزار را فراخوانی کن».
این یادداشت **فقط زمانی تزریق میشود که `tools[]` اعلامشده توسط فراخواننده ثابت کند واقعاً میتواند به
`omniroute_ccr_retrieve` دسترسی پیدا کند** (`callerSupportsCcrRetrieve()` در
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — یک فراخوانندهٔ سادهٔ
سازگار با OpenAI که آن ابزار را ندارد، هرگز دستور فراخوانی چیزی را که نمیتواند به آن دسترسی یابد دریافت نمیکند.
ایدِمپوتنسی با اسکن تاریخچهٔ پیامها برای یافتن نشانهٔ نگهبان پیش از تزریق اعمال میشود؛ بنابراین درخواستهای چندنوبتی
(که پیامهای قبلی را بازپخش میکنند) باعث نمیشوند این یادداشت در هر نوبت دوباره روی هم انباشته شود.

## Caveman

حالت Caveman بر فشردهسازی معنایی نثر معمولی تمرکز دارد:

- بلوکهای کد، URLها، JSON، مسیرها و دادههای ساختاریافته را حفظ میکند
- عبارات زائد، تعدیلکنندهها، زمینههای تکراری و عبارتهای پیوندی طولانی را حذف میکند
- از بستههای قواعد فایلِ آگاه از زبان در `open-sse/services/compression/rules/` پشتیبانی میکند
- همچنان از طریق حالتهای قدیمی `standard`، `aggressive` و `ultra` در دسترس است

بخش مربوطه در داشبورد `Dashboard -> Context & Cache -> Caveman` است.

پروژهٔ بالادستی Caveman از کاهش `~75%` توکنهای خروجی، میانگین صرفهجویی `65%` در خروجیِ بنچمارکها
با دامنهٔ `22-87%`، و یک ابزار فشردهسازی ورودی با نرخ `~46%` گزارش میدهد. OmniRoute هنگام مستندسازی
صرفهجوییهای انباشتهٔ پرامپت/زمینه، از رقم سمت ورودی Caveman استفاده میکند؛ حالت خروجی Caveman
همچنان یک قابلیت مجزای مربوط به رفتار پاسخ است.

## RTK

حالت RTK بر خروجی فرمانها و ابزارها تمرکز دارد:

- کلاسهای خروجی مانند `git status`، `git branch`، `git diff`، Vitest/Jest/Pytest،
  آزمونهای Cargo/Go، ساختهای TypeScript/Vite/Webpack، ESLint، ممیزیها/نصبهای npm، لاگهای Docker،
  دستورهای `find`/`grep` پوسته، ردگیریهای پشته و لاگهای عمومی را شناسایی میکند
- 49 فیلتر JSON از `open-sse/services/compression/engines/rtk/filters/` اعمال میکند
- از خط لولهٔ اعلانی به سبک RTK پشتیبانی میکند: حذف ANSI، جایگزینی، میانبُر `match-output`،
  حذف/حفظ خطوط، کوتاهسازی هر خط، کوتاهسازی ابتدا/انتها/حداکثر تعداد خطوط و بازگشت جایگزین هنگام خالیبودن
- از فیلترهای پروژهٔ مبتنی بر اعتماد در `.rtk/filters.json` و فیلترهای سراسری در
  `DATA_DIR/rtk/filters.json` پشتیبانی میکند
- توالیهای ANSI، نویز پیشرفت، خطوط تکراری و متنهای قالبی غیرمفید را حذف میکند
- خطاهای قابل اقدام، هشدارها، خلاصهها، فایلهای تغییرکرده و زمینهٔ انتهایی را حفظ میکند
- میتواند بهصورت اختیاری خروجی خامِ سانسورشده را برای بازیابی/اشکالزدایی از طریق مسیرهای مدیریتی
  احراز هویتشده نگه دارد

بخش مربوطه در داشبورد `Dashboard -> Context & Cache -> RTK` است.

جزئیات عملیاتی فیلترهای سفارشی، اعتماد، راستیآزمایی و بازیابی خروجی خام در
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md) قرار دارد.

پروژهٔ بالادستی RTK از صرفهجویی `60-90%` در فشردهسازی خروجی فرمانها گزارش میدهد. نمونهٔ README آن
نشان میدهد که یک نشست 30 دقیقهای Claude Code از `~118,000` توکن به `~23,900` توکن رسیده است؛
یعنی `79.7%` صرفهجویی.

## LLMLingua-2 (هرس معنایی)

حالت LLMLingua-2 با استفاده از یک طبقهبند کوچک توکن ONNX، **هرس معنایی توکنها** را روی نثر
انجام میدهد و مکمل موتورهای قاعدهمحور Caveman و RTK است:

- نثر را فقط در پیامهای غیرسیستمی فشرده میکند؛ بلوکهای کد محصورشده و دیگر ساختارهای
  حفظشده هرگز تغییر نمیکنند
- بکاند `@atjsh/llmlingua-2` را (ONNX از طریق `@huggingface/transformers`) در یک
  رشتهٔ worker اجرا میکند؛ بنابراین استنتاج مدل هرگز حلقهٔ رویداد درخواست را مسدود نمیکند
- **قابل انباشت** است (`stackPriority` برابر با 35): در یک خط لولهٔ انباشته، پس از
  موتورهای ساختاری (CCR، session-dedup، headroom و Caveman) اما پیش از `ultra` اجرا میشود، زیرا
  هرس معنایی روی متنی که از قبل از نظر ساختاری فشرده شده باشد مؤثرتر است — برای مثال
  `rtk -> caveman -> llmlingua`
- در صورت **بروز هر خطایی بهصورت fail-open عمل میکند** (نبود وابستگیهای اختیاری، ایجاد worker، بارگذاری مدل، استنتاج
  یا پایان مهلت) ← متن اصلی بدون تغییر بازگردانده میشود و هرگز خطایی برگردانده نمیشود

محل موتور: `open-sse/services/compression/engines/llmlingua/`. بخش مربوطه در داشبورد
`Dashboard -> Context & Cache -> LLMLingua` است.

### مدلها

مدل پیشفرض **TinyBERT** است (`atjsh/llmlingua-2-js-tinybert-meetingbank`، حدود 57 MB،
سریع). مدل دقیقتر **BERT-base** (`Arcoldd/llmlingua4j-bert-base-onnx`،
حدود 710 MB) از طریق فیلد `model` در پیکربندی موتور در دسترس است. `@huggingface/transformers`
مدل انتخابشده را هنگام نخستین فراخوانی، بهصورت تنبل از HuggingFace Hub در
`${DATA_DIR}/models/llmlingua` دانلود میکند (`modelStore.ts`)؛ بازنویسی پیکربندی
`modelPath` بهجای آن، مسیر یک نسخهٔ محلی را مشخص میکند (برای نصبهای آفلاین / ایزوله از شبکه).

### وابستگیهای اختیاری و نصب برحسب تقاضا

پشتهٔ همتای زمان اجرای قابلهرس LLMLingua **اختیاری** است. دو بسته در
`package.json` بهعنوان `optionalDependencies` تعریف شدهاند و در ساخت تولید
**خارجی** نگه داشته میشوند (`scripts/build/prepublish.ts` آنها را در باندل قرار نمیدهد):

| بسته                 | نسخه (تثبیتشده) | توضیحات                                             |
| -------------------- | --------------- | --------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`         | بستهٔ ورودی؛ سایر موارد را بهعنوان همتا تعریف میکند |
| `js-tiktoken`        | `^1.0.20`       | توکنساز                                             |

نسخهٔ `@huggingface/transformers` روی `^4.2.0` تثبیت شده است (با مسیر embedding محلی مشترک است و
در باندل مستقل نیز ردیابی میشود)؛ `@atjsh/llmlingua-2@2.0.5` آن را با محدودهٔ
`"^3.5.2 || ^4.0.0"` بهعنوان همتا میپذیرد، بنابراین هم Transformers.js v3 و هم v4 پشتیبانی
میشوند. از نسخهٔ 2.0.4 به بعد، `@atjsh/llmlingua-2` دیگر به `@tensorflow/tfjs` نیاز ندارد؛
این تغییر بزرگترین عامل منفرد افزایش حجم (TensorFlow.js) را از پشتهٔ SLM حذف کرد. فقط دو بستهٔ
بالا همتاهای قابلهرس SLM هستند. یک `npm install` استاندارد (در محیط توسعه)، مگر آنکه وابستگیهای
اختیاری حذف شده باشند، پشتهٔ اختیاری را بهصورت خودکار نصب میکند.

**دلیل نصب برحسب تقاضا:** بستهٔ منتشرشده در npm، باندل مستقل و ایمیج Docker برای کمحجم ماندن،
**بدون** این وابستگیها عرضه میشوند. در صورت نبود آنها، گیت وابستگی worker
(یک بررسی resolve برای `@atjsh/llmlingua-2` در `worker.ts`) ناموفق میشود و موتور
**بیسروصدا بهصورت fail-open عمل میکند** — انتخاب LLMLingua عملاً هیچ عملی انجام نمیدهد
(متن بدون تغییر بازگردانده میشود و هیچ خطایی ثبت نمیشود). برای فعالسازی آن در محیطی که
وابستگیها از آن هرس شدهاند، پشتهٔ اختیاری را نصب کنید:

```bash
# نسخهها را مطابق optionalDependencies تعریفشده در package.json تثبیت کنید
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

حذف `@tensorflow/tfjs` (در نسخهٔ 2.0.4 و بالاتر) عامل غالب قبلی با حجم حدود 800 MB را
از بین میبرد — حجم باقیمانده شامل محیطهای اجرای transformers.js و onnxruntime-node،
بهعلاوهٔ مدل TinyBERT (حدود 57 MB) است که هنگام نخستین استفاده دانلود میشود (نه از طریق npm).

برای هر محیط:

- **توسعه / `npm install`** — بهطور خودکار نصب میشود، مگر اینکه `--omit=optional`
  (یا `--no-optional`) را استفاده کرده باشید. نیازی به اقدام دیگری نیست.
- **npm سراسری (`npm i -g omniroute`) / مستقل** — فرمان نصب بالا را درون
  دایرکتوری پکیج نصبشده اجرا کنید، یا بدون حذف وابستگیهای اختیاری دوباره نصب کنید.
- **Docker** — فرمان نصب را در یک لایهٔ ایمیج مشتقشده اضافه کنید؛ ایمیج منتشرشده
  عمداً بهصورت کمحجم ارائه میشود.
- **VPS (PM2)** — آن را در `node_modules` برنامه نصب کنید، سپس فرایند را مجدداً راهاندازی کنید تا
  worker دوباره gate را بررسی کند.
- **Next مستقل خام (`npm run build` → `.build/next/standalone/server.js`)** — رهگیری
  مستقل نه worker و نه وابستگیهای اختیاری را شامل میشود؛ بنابراین engine بدون اعلام خطا
  به حالت fail-open میرود. `scripts/build/colocate-standalone.mjs` هر دو را دوباره اعمال میکند (esbuild کردن worker +
  بستن مجموعهٔ وابستگیهای اختیاری در درخت مستقل)؛ این اسکریپت پس از هر build، بهطور خودکار از طریق
  hook مربوط به `postbuild` در npm اجرا میشود. اجرای آن idempotent است و در صورت نبود وابستگیها بهشکل fail-soft عمل میکند.

**فعال بودن آن را تأیید کنید:** وقتی LLMLingua انتخاب شده باشد، متن واقعی واقعاً کوتاه میشود (engine
دیگر به حالت fail-open نمیرود) و نخستین درخواست، دانلود مدل در
`${DATA_DIR}/models/llmlingua` را آغاز میکند. gate عمداً فقط `@atjsh/llmlingua-2` را بررسی میکند —
peerهای دیگر فقط ESM هستند و `require.resolve` حتی در صورت وجودشان نیز برای آنها خطا میدهد — بنابراین
اگر هنگام `import()` واقعاً هر یک از peerها موجود نباشد، worker همچنان به حالت fail-open میرود.

## پایپلاینهای پشتهای

حالت پشتهای مراحل پایپلاین را بهترتیب اجرا میکند. حالت پیشفرض عبارت است از:

```txt
rtk -> caveman
```

از این حالت برای نشستهای عامل کدنویسی استفاده کنید که در آنها یک پرامپت، خروجی دستور را با متن نوشتهشده توسط انسان یا دستیار ترکیب میکند. RTK ابتدا گزارشهای پرازدحام ابزار را کاهش میدهد، سپس Caveman زبان طبیعی باقیمانده را فشرده میکند.

مراحل پایپلاین با `stackedPipeline` در تنظیمات فشردهسازی یا از طریق ترکیبهای فشردهسازی پیکربندی میشوند.

وقتی هر دو موتور یک محتوای واجد شرایط را کاهش میدهند، صرفهجوییها بهصورت مرکب محاسبه میشوند:

```txt
combined = 1 - (1 - صرفهجویی RTK) * (1 - صرفهجویی ورودی Caveman)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## فیلتر درخت دسترسپذیری MCP

فیلتر هوشمند درخت دسترسپذیری MCP یک لایه فشردهسازی پس از اجرا است که روی **نتایج ابزار** MCP اجرا میشود، نه روی پرامپتها یا زمینه. این فیلتر، محتوای حجیم درخت دسترسپذیری و اسنپشاتهای مرورگر را هدف قرار میدهد که توسط ابزارهایی مانند Playwright، ابزارهای استفاده از رایانه و سرورهای MCP خودکارسازی مرورگر برگردانده میشوند.

### کاری که انجام میدهد

1. **حذف نویز** — ورودیهای عمومی/متنی خالی (`- generic:`، `- text: ""`) را حذف میکند
2. **جمعکردن همسطحها** — وقتی ≥ `collapseThreshold` (پیشفرض 30) خط متوالی تکرار ساختاری باشند، آنها را به اولین `collapseKeepHead` (پیشفرض 10) خط + خلاصهای از تعداد + آخرین `collapseKeepTail` (پیشفرض 5) خط تبدیل میکند
3. **حفظ ارجاعها** — لنگرهای `[ref=eXX]` موردنیاز Playwright/ابزارهای استفاده از رایانه هرگز تغییر داده نمیشوند
4. **کوتاهسازی سخت** — اگر متن پس از جمعسازی همچنان از `maxTextChars` (پیشفرض 50,000) فراتر برود، آن را همراه با یک راهنمای ناوبری کوتاه میکند تا عامل بتواند به کار ادامه دهد

### محل موتور

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← نقطه ورود smartFilterText()
  collapseRepeated.ts ← الگوریتم جمعکردن همسطحها
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### پیکربندی

این قابلیت از طریق `compression.mcpAccessibility` در تنظیمات سراسری (مهاجرت 056) کنترل میشود. پیکربندی پیشفرض:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

این فیلتر فقط روی محتوای نتایج ابزار اعمال میشود که `type` آنها `"text"` باشد و طولشان از `minLengthToProcess` فراتر رود. این فیلتر بر فشردهسازی پرامپت یا محتوای درخواستها تأثیری ندارد.

### صرفهجویی مورد انتظار

بسته به پیچیدگی صفحه، 60 تا 80٪ برای نتایج ابزار اسنپشات مرورگر. الگوریتم جمعسازی از نظر تعداد خطوط دارای پیچیدگی O(n) است و تأخیری ناچیز اضافه میکند.

### مقایسه این فیلتر با موتورهای فشردهسازی بالا

| جنبه          | Caveman / RTK / پشتهای    | فیلتر دسترسپذیری MCP                   |
| ------------- | ------------------------- | -------------------------------------- |
| هدف           | پرامپتهای درخواست / زمینه | نتایج ابزار MCP                        |
| محرک          | تنظیم حالت فشردهسازی      | `compression.mcpAccessibility.enabled` |
| دامنه         | همه پیامهای SSE           | فقط نتایج ابزار                        |
| لنگرهای ارجاع | نامرتبط                   | بدون هیچ شرطی حفظ میشوند               |

---

## ترکیبهای فشردهسازی

ترکیبهای فشردهسازی، پروفایلهای فشردهسازی نامگذاریشدهای هستند که میتوان آنها را به ترکیبهای مسیریابی اختصاص داد:

- `compression_combos`: حالت، خط لوله، پیکربندی RTK، پیکربندی زبان و نشانگر پیشفرض را ذخیره میکند
- `compression_combo_assignments`: یک ترکیب فشردهسازی را به یک ترکیب مسیریابی نگاشت میکند
- یکپارچهسازی زمان اجرا، پیش از اعمال بازنویسیهای عمومی ترکیب، ترکیب فشردهسازی اختصاصیافته را تشخیص میدهد
- تحلیلها شامل `compression_combo_id` و `engine` هستند

بخش داشبورد: `Dashboard -> Context & Cache -> Compression Combos`.

## سطح API

| مسیر                                   | هدف                                                         |
| -------------------------------------- | ----------------------------------------------------------- |
| `/api/settings/compression`            | تنظیمات سراسری فشردهسازی (شامل پیکربندی `mcpAccessibility`) |
| `/api/compression/preview`             | پیشنمایش هر حالت فشردهسازی                                  |
| `/api/compression/language-packs`      | فهرست بستههای زبانی Caveman موجود                           |
| `/api/context/caveman/config`          | نام مستعار تنظیمات Caveman                                  |
| `/api/context/rtk/config`              | مقادیر پیشفرض و تنظیمات RTK                                 |
| `/api/context/rtk/filters`             | کاتالوگ فیلترهای RTK                                        |
| `/api/context/rtk/test`                | نقطه پایانی پیشنمایش/آزمایش RTK                             |
| `/api/context/rtk/raw-output/[id]`     | بازیابی احراز هویتشده خروجی خام با اطلاعات حساس حذفشده      |
| `/api/context/combos`                  | عملیات CRUD ترکیب فشردهسازی                                 |
| `/api/context/combos/[id]/assignments` | عملیات CRUD تخصیص ترکیب مسیریابی                            |
| `/api/context/analytics`               | نام مستعار تحلیلهای فشردهسازی                               |

مسیرهای مدیریتی به احراز هویت مدیریتی یا بررسیهای خطمشی کلید API نیاز دارند.

## ابزارهای MCP

فشردهسازی پنج ابزار MCP ارائه میدهد:

| ابزار                               | دامنه               | هدف                                |
| ----------------------------------- | ------------------- | ---------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | تنظیمات، تحلیلها و آمار حافظه نهان |
| `omniroute_compression_configure`   | `write:compression` | بهروزرسانی تنظیمات سراسری          |
| `omniroute_set_compression_engine`  | `write:compression` | تنظیم حالت و خط لوله اختیاری       |
| `omniroute_list_compression_combos` | `read:compression`  | فهرست ترکیبهای فشردهسازی           |
| `omniroute_compression_combo_stats` | `read:compression`  | خواندن تحلیلهای ترکیب/موتور        |

## دامنه و استثناها

**تعبیهها هرگز فشرده نمیشوند.** `open-sse/handlers/embeddings.ts` هرگز هیچ
موتور فشردهسازی را فراخوانی نمیکند — بدنههای درخواست/پاسخ بدون هیچ تغییری مستقیماً به اجراکننده منتقل میشوند.
این موضوع در حال حاضر ساختاری است (تعبیهها و تکمیلهای چت کنترلکنندههای مجزایی دارند)، نه یک
بررسی زمان اجرا؛ اما به این معناست که نگرانی مربوط به اعوجاج بردار در #8034 هیچ سطح مواجههای
در مسیر تعبیهها ندارد.

**فیلتر استثنای مبتنی بر مدل/نقطه پایانی (#8034).** برای تکمیلهای چت، اپراتور میتواند
شناسههای مدل / اهداف `provider/model` را مشخص کند که هرگز نباید فشرده شوند — یک محافظ مفید برای
حالتی که فشردهسازی در آینده در نزدیکی مسیری مجاور با تعبیهها متصل شود، و بهطور کلی برای
هر مدلی که پرامپت دقیق و بایتبهبایت آن اهمیت دارد (ارزیابیهای قطعی، پیشوندهای حساس به حافظه نهان
و غیره) کاربردی است.

- فیلد تنظیمات: `exclusions?: string[]` در پیکربندی سراسری فشردهسازی
  (`GET`/`PUT /api/settings/compression`) که از طریق فضای نام موجود `key_value` برای فشردهسازی
  (`src/lib/db/compression.ts`) ماندگار میشود — بدون جدول جدید.
- زبانه داشبورد: **داشبورد ← فشردهسازی ← استثناها**
  (`/dashboard/compression/exclusions`).
- نحو الگو: `*` تنها نویسه عام است. تمام فراتمامنویسههای دیگر عبارت منظم در یک الگو
  پیش از تطبیق escape میشوند؛ بنابراین `gpt-5.6` فقط با رشته تحتاللفظی مطابقت دارد و هرگز با `gpt-5x6`
  مطابقت نمیکند (ایمن در برابر ReDoS، کراندار و بدون کمیتسنجهای تودرتو). الگوها بدون حساسیت به بزرگی و کوچکی حروف
  هم با شناسه خام مدل و هم با مقدار ترکیبی `provider/model` تطبیق داده میشوند — `gpt-5-6`، `openai/gpt-5-6`
  و `openai/*` همگی کار میکنند و `*` بهتنهایی همه مدلها را مستثنا میکند.
- تطبیق: `isCompressionExcluded()` / `normalizeCompressionExclusions()` در
  `open-sse/services/compression/exclusions.ts`. فایل `chatCore.ts` هدف مستثناشده را
  بلافاصله پس از تعیین تنظیمات فشردهسازی، **پیش از اجرای هر موتور**، بررسی میکند و یک تطبیق را
  دقیقاً مانند غیرفعال بودن سراسری فشردهسازی در نظر میگیرد — بدنه درخواست بهطور اثباتپذیر
  بایتبهبایت یکسان باقی میماند. این رد شدن از طریق `writeCompressionSkip(..., "excluded")` برای
  مشاهدهپذیری در تحلیلها ثبت میشود.
- مقدار پیشفرض (فهرست خالی/ناموجود): با رفتار پیش از #8034 یکسان است — هیچچیز مستثنا نمیشود.

## محدودیتهای شناختهشده

- **LLMLingua-2 (SLM) به وابستگیهای اختیاری هممکان نیاز دارد.** worker تنها زمانی در یک
  build عملیاتی اجرا میشود که `@atjsh/llmlingua-2` و peerهای آن بهصورت هممکان در
  `dist/node_modules` قرار گرفته باشند (نگاه کنید به `scripts/build/colocateOptionals.mjs`، #4286). بدون آنها،
  engine بهصورت fail-open عمل میکند (متن اصلی را برمیگرداند). resolution مربوط به worker دیگر به
  `import.meta.url` وابسته نیست (در bundle مستقل از کار میافتد) — و مبنای آن cwd زمان اجرا
  / `argv[1]` است.
- **بستههای زبانی Caveman برای `de` / `fr` / `ja` ناقص هستند.** آنها شامل قواعد `context` +
  `filler` + `structural` هستند، اما بستههای `dedup` / `ultra` را ندارند؛ بنابراین شدت `ultra`
  برای این زبانها از `full` قویتر نیست (آنها فقط از قواعد خودشان استفاده میکنند — هیچ
  بازگشت ضمنی به قواعد انگلیسی `dedup`/`ultra` وجود ندارد، زیرا چنین کاری متن خارجی را بههم میریزد).
  بستههای `en` / `es` / `id` / `pt-BR` کامل هستند. از مشارکت برای افزودن `dedup.json` + `ultra.json`
  به بستههای ناقص استقبال میشود.
- **تلهمتری انباشته فقط engineهایی را فهرست میکند که فشردهسازی انجام دادهاند.** یک مرحله از pipeline انباشته که
  engine آن اجرا شده اما 0 % صرفهجویی ایجاد کرده است، `stats:null` برمیگرداند و بنابراین در
  `engineBreakdown` ظاهر نمیشود — و از مرحلهای که رد شده است قابل تشخیص نیست. تمایز بین
  «اجرا شده، 0 %» و «رد شده» به تغییر در مدل breakdown نیاز دارد و به آینده موکول شده است.

## اعتبارسنجی

gateهای متمرکز برای این بخش عبارتاند از:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
