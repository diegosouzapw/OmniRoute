# Log export (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

خروجیگیری پیوسته و افزایشی از گزارشهای تماس OmniRoute به یک مخزن تحلیلی خارجی.

زبانه داشبورد Logs تاریخچه درخواستها را در SQLite (`call_logs`) نگه میدارد که با چرخش و سیاست نگهداری محدود میشود. خروجیگیری گزارشها، همان مجموعه رکوردها را طبق یک زمانبندی به بیرون ارسال میکند تا عمر آنها از پایگاه داده محلی بیشتر باشد و بتوان آنها را با دادههای دیگر پیوند داد. BigQuery نخستین مقصد است؛ خط لوله بهصورت یک رجیستری طراحی شده است، بنابراین افزودن مقصدهای بیشتر امکانپذیر است.

---

## 1. نحوه کار

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (مجموعه فیلدهای زبانه Logs)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **زمانبندی** — یک کار cron در `JobRegistry` با نام `log_export` که مقدار پیشفرض آن `0 * * * *` است (هر ساعت، UTC). این کار در `src/lib/initCloudSync.ts` ثبت میشود و با `OMNIROUTE_LOG_EXPORT_CRON` قابل بازنویسی است. در هر اجرا، تمام مقصدهای **فعال** بهترتیب تخلیه میشوند.
- **مکاننما** — `call_logs.rowid` ضمنی SQLite که برای هر مقصد بهطور جداگانه در `log_export_destinations.cursor_row_id` ذخیره میشود. عمداً از `timestamp` بهعنوان مکاننما استفاده نمیشود: فراخوانها ممکن است مقدار دلخواه خود را ارائه کنند، بنابراین ممکن است یک درخواست کند پس از درخواست سریعتری نوشته شود که دیرتر آغاز شده است؛ در این حالت، مکاننمای مبتنی بر زمان آن را نادیده میگیرد.
- **دستهبندی** — در هر درخواست، `batch_size` ردیف (پیشفرض 500) و در هر اجرا، `max_rows_per_run` ردیف (پیشفرض 10000) پردازش میشود تا یک صف عقبافتاده بزرگ، بهجای مسدود کردن یک اجرا، طی چندین اجرا تخلیه شود.
- **تحویل** — مکاننما تنها پس از تکمیل موفق `send()` جلو میرود. در صورت شکست یک دسته، مکاننما در جای خود باقی میماند تا همان ردیفها در اجرای بعدی دوباره ارسال شوند. تضمین ارائهشده، تحویل حداقل یکباره همراه با حذف موارد تکراری در سمت مقصد است، نه تحویل دقیقاً یکباره واقعی: BigQuery هر ردیف را با شناسه گزارش تماس کلیدگذاری میکند و در محدوده زمانی حذف موارد تکراری خود، آن را بر مبنای بهترین تلاش رعایت میکند.
- **محافظ همپوشانی** — اجرای زمانبندیشده cron و `POST .../run` ممکن است همزمان رخ دهند. مقصدی که از قبل در حال تخلیه است، بهجای تخلیه دوباره نادیده گرفته میشود (`skipped: true` در نتیجه اجرا)؛ بنابراین اجرای همزمان نمیتواند یک دسته را دوباره ارسال کند یا مکاننما را به عقب برگرداند.
- **بازیابی پس از پاکسازی** — اگر `cursor_row_id` از `MAX(rowid)` بیشتر شود (کل جدول پاک شده و شناسههای ردیف از نو آغاز شده باشند)، اجراکننده بهجای اینکه برای همیشه از دادهها بیخبر بماند، مکاننما را به 0 بازمیگرداند.

### محمولهها (پرامپتها و تکمیلها)

بهطور پیشفرض، خروجی فقط شامل فیلدهای خلاصهای است که فهرست **Logs** نمایش میدهد. فعال کردن **خروجیگیری پرامپتها و پاسخها** (`includeBodies`) علاوه بر این، اطلاعاتی را نیز ارسال میکند که پنل جزئیات **Logs** برای هر تماس نمایش میدهد:

| فیلد                             | محتوای آن                                                                 |
| -------------------------------- | ------------------------------------------------------------------------- |
| `request_body` / `response_body` | محمولههای تماس، همانطور که داشبورد آنها را نمایش میدهد                    |
| `pipeline_route_decision`        | مقصد و مدلی که مسیریاب انتخاب کرده است                                    |
| `pipeline_client_request`        | درخواست خام، دقیقاً همانطور که کلاینت آن را ارسال کرده است                |
| `pipeline_openai_request`        | پس از تبدیل به قالب داخلی OpenAI                                          |
| `pipeline_provider_request`      | همانطور که واقعاً با گویش ارائهدهنده به بالادست ارسال شده است             |
| `pipeline_provider_response`     | پاسخ خام بالادست                                                          |
| `pipeline_client_response`       | آنچه به فراخواننده بازگردانده شده است                                     |
| `pipeline_error`                 | جزئیات خطای سطح خط لوله برای یک تماس ناموفق                               |
| `bodies_truncated`               | اگر هر یک از فیلدهای بالا به `maxBodyBytes` رسیده باشد، مقدار آن True است |

این دادهها محتوای پرامپت هستند؛ بنابراین بهطور پیشفرض **غیرفعالاند** و عمداً برای هر مقصد بهصورت جداگانه انتخاب میشوند. آنچه ارسال میشود همان چیزی است که داشبورد نمایش میدهد، زیرا هر دو از طریق `getCallLogById` دادهها را میخوانند: محمولهها هنگام نوشته شدن از قبل از نظر PII پاکسازی و اسرار آنها حذف شدهاند، و تماسی که با یک کلید API دارای `noLog` انجام شود اصلاً هیچ محمولهای ذخیره نمیکند؛ بنابراین چیزی برای خروجیگیری وجود ندارد.

محمولههای هر ردیف از آرتیفکت موجود در سیستم فایل خوانده میشوند؛ بنابراین هیدراتهسازی فقط برای مقصدهایی انجام میشود که آن را درخواست کردهاند. اگر آرتیفکت یک ردیف موجود نباشد یا خراب باشد، خلاصه آن ردیف با محمولههای null صادر میشود، نه اینکه کل دسته شکست بخورد و مکاننما متوقف شود.

`maxBodyBytes` (پیشفرض 262144) اندازه هر فیلد را محدود میکند. محمولههای طولانیتر بهجای **حذف شدن، کوتاه میشوند** — یک پرامپت بریدهشده همچنان به پرسش «چه چیزی درخواست شده بود» پاسخ میدهد — و ردیف با `bodies_truncated` علامتگذاری میشود. دلتاهای استریمشده قطعهبهقطعه صادر نمیشوند؛ پاسخ مونتاژشده از قبل در `pipeline_provider_response` و `pipeline_client_response` قرار دارد.

---

## 2. فایلها

| بخش                      | محل                                          |
| ------------------------ | -------------------------------------------- |
| قرارداد مقصد             | `src/lib/logExport/types.ts`                 |
| رجیستری                  | `src/lib/logExport/registry.ts`              |
| مدیریت اسرار             | `src/lib/logExport/secrets.ts`               |
| اجراکننده (حلقه مکاننما) | `src/lib/logExport/runner.ts`                |
| نمایش API                | `src/lib/logExport/presenter.ts`             |
| مقصد BigQuery            | `src/lib/logExport/destinations/bigquery.ts` |
| احراز هویت SA گوگل       | `src/lib/logExport/googleServiceAccount.ts`  |
| منبع گزارش تماس          | `src/lib/usage/callLogExportSource.ts`       |
| ماندگاری                 | `src/lib/db/logExportDestinations.ts`        |
| وظیفه Cron               | `src/lib/jobs/logExportJob.ts`               |
| لایه REST                | `src/app/api/log-export/`                    |
| صفحه داشبورد             | `src/app/(dashboard)/dashboard/log-export/`  |

شِما: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API مبتنی بر REST

همه مسیرها با احراز هویت مدیریتی (`requireManagementAuth`) محافظت میشوند. اسرار هرگز بازگردانده نمیشوند:
یک راز ذخیرهشده بهصورت مقدار ثابت `__stored__` بازگردانده میشود و ارسال مجدد همین مقدار هنگام بهروزرسانی،
اعتبارنامه ذخیرهشده را حفظ میکند.

ایجاد یا بهروزرسانی مقصدی که نوع آن دارای یک راز است، **به
`STORAGE_ENCRYPTION_KEY` نیاز دارد**. بدون آن، `encrypt()` بدون هیچ هشداری داده را بدون تغییر عبور میدهد؛ بنابراین عملیات نوشتن
با خطای 400 رد میشود تا اعتبارنامه بهصورت متن ساده در SQLite قرار نگیرد (همان حفاظی که
وبهوک Telegram اعمال میکند).

| متد      | مسیر                                     | هدف                                             |
| -------- | ---------------------------------------- | ----------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | انواع مقصد بههمراه فهرست فیلدهای پیکربندی آنها  |
| `GET`    | `/api/log-export/destinations`           | فهرست مقصدها (با اسرار پوشاندهشده)              |
| `POST`   | `/api/log-export/destinations`           | ایجاد یک مقصد                                   |
| `GET`    | `/api/log-export/destinations/{id}`      | خواندن یک مقصد                                  |
| `PUT`    | `/api/log-export/destinations/{id}`      | بهروزرسانی نام / فعالبودن / پیکربندی / دستهبندی |
| `DELETE` | `/api/log-export/destinations/{id}`      | حذف                                             |
| `POST`   | `/api/log-export/destinations/{id}/test` | بررسی اعتبارنامهها، بدون نوشتن چیزی             |
| `POST`   | `/api/log-export/destinations/{id}/run`  | تخلیه فوری، از همان مسیر اجرای زمانبندیشده      |
| `GET`    | `/api/log-export/status`                 | وضعیت Cron، اجراهای اخیر و عقبماندگی هر مقصد    |

`GET /api/log-export/types` همان چیزی است که رابط کاربری را عمومی میکند: فرم داشبورد بر اساس
توصیفگرهای فیلد بازگرداندهشده رندر میشود؛ بنابراین افزودن یک مقصد جدید به هیچ تغییری در رابط کاربری نیاز ندارد.

---

## 4. مقصد BigQuery

کلیدهای پیکربندی (`type: "bigquery"`):

| کلید                 | توضیحات                                                                     |
| -------------------- | --------------------------------------------------------------------------- |
| `projectId`          | پروژه GCP که مجموعهداده را نگه میدارد                                       |
| `datasetId`          | `[A-Za-z0-9_]+`                                                             |
| `tableId`            | `[A-Za-z0-9_]+`                                                             |
| `location`           | فقط زمانی استفاده میشود که مجموعهداده باید ایجاد شود (پیشفرض `EU`)          |
| `serviceAccountJson` | کلید حساب سرویس. راز: در حالت ذخیره رمزگذاری میشود و هرگز بازگردانده نمیشود |
| `autoCreate`         | ایجاد مجموعهداده و جدول در نخستین خروجیگیری (پیشفرض `true`)                 |

حساب سرویس به `bigquery.tables.updateData` روی جدول مقصد نیاز دارد و وقتی `autoCreate` فعال است،
به `bigquery.datasets.create` / `bigquery.tables.create` نیز نیاز دارد.

یک دسته پیکربندیشده، واحد **مکاننما** است، نه واحد HTTP: تابع `send()` آن را به فراخوانیهای insertAll
با حداکثر 500 ردیف تقسیم میکند؛ بنابراین یک `batch_size` بزرگ نمیتواند از سقف درخواست 10 MB در BigQuery عبور کند.
وضعیتهای موقت (408/429/500/502/503/504) حداکثر سه بار با تأخیر تصاعدی
و با استفاده مجدد از همان insertIds تلاش میشوند؛ خطاهای احراز هویت و شِما در همان تلاش نخست استثنا پرتاب میکنند
تا اجرای جاری بیهوده مصرف نشود.

جدولی که چند لحظه پیش ایجاد شده، هنوز برای نقطه پایانی استریم قابل مشاهده نیست و آن نقطه پایانی
برای چند ثانیه پاسخ 404 میدهد. این 404 دوباره تلاش میشود، اما **فقط وقتی همین اجرا جدول را ایجاد کرده باشد** —
جدولی که واقعاً وجود ندارد همچنان سریعاً باعث شکست میشود. توجه داشته باشید که ایجاد مجدد جدولی با نامی که
اخیراً حذف شده است، باعث میشود BigQuery درجهای استریم را برای چند دقیقه رد کند؛ این یکی از ویژگیهای
حذف و سپس ایجاد مجدد است، بنابراین بهجای حذف و افزودن دوباره جدول، استفاده از نامی جدید را ترجیح دهید.

**شکست جزئی بهصورت HTTP 200 همراه با `insertErrors[]` غیرخالی دریافت میشود.** این وضعیت بهعنوان
شکست در نظر گرفته شده و باعث پرتاب استثنا میشود؛ همین موضوع مانع از آن میشود که مکاننما از ردیفهایی که BigQuery هرگز
نپذیرفته عبور کند؛ `tests/unit/log-export-bigquery.test.ts` این رفتار را تثبیت میکند.

انتقال داده از طریق REST ساده انجام میشود — یک گزاره RS256 خودامضاشده در
`https://oauth2.googleapis.com/token` با یک توکن دسترسی مبادله میشود، سپس ردیفها به `tabledata.insertAll` ارسال میشوند. هیچ SDK گوگل
اضافه نمیشود. توکنهای دسترسی بهازای هر جفت (حساب سرویس، دامنه دسترسی) در حافظه فرایند کش میشوند.

جدول ایجادشده برای هر فیلد زبانه Logs یک ستون، بهعلاوه `exported_at`، دارد و متناسب با
شیوه واقعی پرسوجوی گزارشهای تماس چیدمان شده است:

- **بر اساس روز و روی `timestamp` پارتیشنبندی شده است**؛ بنابراین پرسوجویی که با تاریخ محدود شده باشد فقط همان روزها را اسکن میکند.
- **بر اساس `api_key_name`، `provider`، `model`، `status` خوشهبندی شده است** (به همین ترتیب)؛ بنابراین فیلترکردن بر اساس
  اینکه چه کسی آن را اجرا کرده، به کجا رفته یا آیا شکست خورده است، بلوکهای داخل هر پارتیشن را هرس میکند. BigQuery
  حداکثر چهار ستون خوشهبندی را مجاز میداند و ترتیب اهمیت دارد: فیلتر روی `api_key_name` بهتنهایی
  هرس را انجام میدهد، اما فیلتر روی `status` بهتنهایی چنین نمیکند.
- **نگهداری اختیاری پارتیشنها** از طریق `partitionExpirationDays` (`0` همهچیز را نگه میدارد) که
  هنگام ایجاد جدول اعمال میشود.

هر دو تنظیم هنگام ایجاد اعمال میشوند. یک جدول موجود همان چیدمانی را که از قبل دارد حفظ میکند؛ بنابراین
اگر میخواهید این تنظیمات اعمال شوند، مقصد را به یک شناسهٔ جدول جدید ارجاع دهید.

`tests/unit/log-export-bigquery.test.ts` تضمین میکند که نگاشتگر و طرحوارهٔ جدول کاملاً همگام باقی بمانند،
تا هیچ ستون جدیدی از گزارش فراخوانی هنگام خروج بیسروصدا حذف نشود.

بستهها بر اساس **هر دو** معیار تعداد ردیفها و حجم بایتهای سریالسازیشده تقسیم میشوند. پس از صادر شدن
بارهای داده، تعداد ردیف بهتنهایی کافی نیست: 500 ردیف حاوی پرامپتها میتواند دهها مگابایت حجم داشته باشد، و insertAll
درخواستهای بیش از 10 MB را رد میکند. بستهها با رسیدن به 500 ردیف یا 9 MB، هرکدام که زودتر رخ دهد، بسته میشوند.

---

## 5. افزودن یک مقصد

1. فایل `src/lib/logExport/destinations/<name>.ts` را ایجاد کنید که یک `LogExportDestinationType` صادر میکند:
   یک `configSchema` از نوع Zod، آرایهٔ توصیفگر `fields` برای رابط کاربری، `secretFields`، و یک
   `createClient(config)` که `test()` / `prepare()` / `send(records)` را برمیگرداند.
2. آن را به آرایهٔ `DESTINATIONS` در `src/lib/logExport/registry.ts` اضافه کنید.
3. آزمونها را در `tests/unit/` بنویسید.

کل تغییر همین است: ماندگاری دادهها، وظیفهٔ cron، لایهٔ REST، رمزنگاری اطلاعات محرمانه و
فرم داشبورد، همگی رجیستری را میخوانند.

دو قاعده برای یک مقصد جدید:

- `send()` در صورت شکست جزئی **حتماً باید خطا پرتاب کند**. resolve شدن یعنی «مقصد این ردیفها را در اختیار دارد»،
  و مکاننما برای همیشه از آنها عبور میکند.
- مقصدی که یک URL ارائهشده توسط کاربر را دریافت میکند، باید پیش از fetch کردن، آن را از طریق
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) اعتبارسنجی کند؛
  دقیقاً همانطور که webhookها انجام میدهند. BigQuery به این کار نیازی ندارد، زیرا میزبانهای آن ثابت هستند.

---

## 6. راهبری آن

- **داشبورد**: Integrations ← Log export. یک مقصد اضافه کنید، برای بررسی اعتبارنامهها
  بدون نوشتن ردیفها، **Test** را اجرا کنید و سپس آن را فعال کنید.
- **صف معوقه**: هر کارت مقصد، ردیفهای در انتظار و مکاننما را نشان میدهد؛ `GET
/api/log-export/status` نیز همین ارقام را بههمراه ۲۰ اجرای آخر وظیفه برمیگرداند.
- **خرابی یک مقصد باعث خرابی مقصدهای دیگر نمیشود** — خلاصهٔ اجرا وضعیت هر مقصد را در
  `last_status` / `last_error` ثبت میکند و تاریخچهٔ اجرای وظیفه، نتیجهٔ تجمیعی را نگه میدارد.
- **حذف یک مقصد، مکاننمای آن را نیز حذف میکند.** افزودن دوبارهٔ آن از قدیمیترین
  گزارش تماس نگهداریشده آغاز میشود و در نتیجه ممکن است ردیفهایی که مقصد از قبل در اختیار دارد، دوباره ارسال شوند. در BigQuery، مقدار
  `insertId` هر ردیف تنها در بازهٔ حذف موارد تکراری خود BigQuery این وضعیت را مدیریت میکند؛ بنابراین غیرفعال کردن
  یک مقصد را به حذف آن ترجیح دهید.
