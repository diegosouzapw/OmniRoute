# Log export (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute کال لاگز کو مسلسل اور تدریجی طور پر ایک بیرونی اینالیٹکس اسٹور میں برآمد کرنا۔

Logs ڈیش بورڈ ٹیب درخواستوں کی تاریخ SQLite (`call_logs`) میں رکھتا ہے، جو
روٹیشن اور برقرار رکھنے کی پالیسی کے باعث محدود ہوتی ہے۔ لاگ ایکسپورٹ اسی ریکارڈ سیٹ کو ایک شیڈول کے مطابق باہر بھیجتا ہے تاکہ یہ
مقامی ڈیٹابیس سے زیادہ عرصے تک محفوظ رہ سکے اور اسے دوسرے ڈیٹا کے ساتھ جوڑا جا سکے۔ BigQuery پہلی منزل ہے؛
پائپ لائن ایک رجسٹری ہے، اس لیے مزید منزلیں اضافی طور پر شامل کی جا سکتی ہیں۔

---

## 1. یہ کیسے کام کرتا ہے

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (Logs ٹیب کے فیلڈز کا مجموعہ)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **شیڈول** — ایک `JobRegistry` cron جاب، `log_export`، جو بطور ڈیفالٹ `0 * * * *` (ہر گھنٹے،
  UTC) پر چلتی ہے۔ یہ `src/lib/initCloudSync.ts` میں رجسٹرڈ ہے؛ اسے `OMNIROUTE_LOG_EXPORT_CRON` کے ذریعے اوور رائیڈ کیا جا سکتا ہے۔
  ہر ٹِک ہر **فعال** منزل کو یکے بعد دیگرے مکمل طور پر پراسیس کرتی ہے۔
- **کرسر** — SQLite کا ضمنی `call_logs.rowid`، جو ہر منزل کے لیے
  `log_export_destinations.cursor_row_id` میں محفوظ رہتا ہے۔ جان بوجھ کر `timestamp` کو کرسر نہیں بنایا گیا: کالرز
  اپنی قدر فراہم کر سکتے ہیں، اس لیے ایک سست درخواست کو اس تیز درخواست کے بعد لکھا جا سکتا ہے جو
  بعد میں شروع ہوئی تھی، اور timestamp کرسر اسے چھوڑ دے گا۔
- **بیچنگ** — ہر درخواست میں `batch_size` قطاریں (ڈیفالٹ 500)، اور ہر رن میں
  `max_rows_per_run` قطاریں (ڈیفالٹ 10000)، تاکہ ایک بڑا بیک لاگ کسی ایک رن کو بلاک کرنے کے بجائے کئی ٹِکس میں مکمل ہو۔
- **ترسیل** — کرسر صرف `send()` کے resolve ہونے کے بعد آگے بڑھتا ہے۔ ناکام بیچ
  کرسر کو اسی مقام پر چھوڑ دیتا ہے، لہٰذا اگلے رن میں انہی قطاروں کی دوبارہ کوشش کی جاتی ہے۔ ضمانت
  کم از کم ایک بار ترسیل کے ساتھ منزل کی جانب ڈی ڈپلیکیشن کی ہے، حقیقی exactly-once کی نہیں: BigQuery ہر
  قطار کو call-log id کے ذریعے کلید دیتا ہے، جسے وہ اپنی ڈی ڈپلیکیشن ونڈو کے اندر best-effort بنیاد پر ملحوظ رکھتا ہے۔
- **اوورلیپ گارڈ** — cron ٹِک اور `POST .../run` ایک ساتھ چل سکتے ہیں۔ جو منزل
  پہلے ہی پراسیس ہو رہی ہو، اسے دو بار پراسیس کرنے کے بجائے چھوڑ دیا جاتا ہے (رن کے نتیجے میں `skipped: true`)،
  لہٰذا ایک متوازی رن نہ تو بیچ کو دوبارہ بھیج سکتا ہے اور نہ کرسر کو پیچھے لکھ سکتا ہے۔
- **پرج ریکوری** — اگر `cursor_row_id`، `MAX(rowid)` سے زیادہ ہو جائے (پوری ٹیبل
  پرج ہو گئی ہو اور rowids دوبارہ شروع ہوئے ہوں)، تو رنر مستقل طور پر بے خبر رہنے کے بجائے واپس 0 پر آ جاتا ہے۔

### پے لوڈز (پرامپٹس اور تکمیلات)

بطور ڈیفالٹ، ایکسپورٹ صرف وہ خلاصہ فیلڈز لے جاتا ہے جو Logs کی **فہرست** دکھاتی ہے۔ **پرامپٹس اور جوابات ایکسپورٹ کریں** (`includeBodies`) کو فعال کرنے سے اس کے علاوہ وہ معلومات بھی بھیجی جاتی ہیں جو Logs کا **تفصیلی**
پین ہر کال کے لیے دکھاتا ہے:

| فیلڈ                             | اس میں کیا ہوتا ہے                                            |
| -------------------------------- | ------------------------------------------------------------- |
| `request_body` / `response_body` | کال کے پے لوڈز، جیسے ڈیش بورڈ انہیں دکھاتا ہے                 |
| `pipeline_route_decision`        | روٹر نے کون سا ہدف اور ماڈل منتخب کیا                         |
| `pipeline_client_request`        | اصل درخواست، بالکل اسی طرح جیسے کلائنٹ نے بھیجی               |
| `pipeline_openai_request`        | اندرونی OpenAI ساخت میں ترجمے کے بعد                          |
| `pipeline_provider_request`      | جیسا حقیقتاً upstream بھیجا گیا، provider dialect میں         |
| `pipeline_provider_response`     | خام upstream جواب                                             |
| `pipeline_client_response`       | جو کالر کو واپس دیا گیا                                       |
| `pipeline_error`                 | ناکام کال کے لیے پائپ لائن سطح کی خرابی کی تفصیل              |
| `bodies_truncated`               | True، جب اوپر دیا گیا کوئی فیلڈ `maxBodyBytes` کی حد تک پہنچے |

یہ پرامپٹ کا مواد ہے، اس لیے یہ بطور ڈیفالٹ **غیر فعال** ہوتا ہے اور جان بوجھ کر ہر منزل کے لیے الگ انتخاب ہے۔
جو کچھ بھیجا جاتا ہے وہی ڈیش بورڈ دکھاتا ہے، کیونکہ دونوں `getCallLogById` کے ذریعے پڑھتے ہیں: پے لوڈز کو
لکھتے وقت ہی PII سے صاف اور رازوں سے منقح کر دیا جاتا ہے، اور `noLog` API کلید کے ساتھ کی گئی کال
کوئی پے لوڈ محفوظ ہی نہیں کرتی، اس لیے ایکسپورٹ کرنے کے لیے کچھ نہیں ہوتا۔

پے لوڈز ہر قطار کے لیے فائل سسٹم آرٹیفیکٹ سے پڑھے جاتے ہیں، اس لیے hydration صرف انہی منزلوں کے لیے چلتی ہے
جنہوں نے اس کی درخواست کی ہو۔ جس قطار کا آرٹیفیکٹ غائب یا خراب ہو، اس کا خلاصہ null
پے لوڈز کے ساتھ ایکسپورٹ ہوتا ہے، بجائے اس کے کہ بیچ ناکام ہو اور کرسر وہیں پھنس جائے۔

`maxBodyBytes` (ڈیفالٹ 262144) ہر فیلڈ کی حد مقرر کرتا ہے۔ طویل پے لوڈز کو حذف کرنے کے بجائے **مختصر کیا جاتا ہے**
— ایک کٹا ہوا پرامپٹ پھر بھی "کیا پوچھا گیا تھا" کا جواب دیتا ہے — اور قطار کو
`bodies_truncated` کے ساتھ نشان زد کیا جاتا ہے۔ chunk-by-chunk اسٹریم کیے گئے deltas ایکسپورٹ نہیں ہوتے؛ مکمل جوڑا گیا جواب
پہلے ہی `pipeline_provider_response` اور `pipeline_client_response` میں موجود ہوتا ہے۔

---

## 2. فائلیں

| حصہ             | مقام                                         |
| --------------- | -------------------------------------------- |
| منزل کا کنٹریکٹ | `src/lib/logExport/types.ts`                 |
| رجسٹری          | `src/lib/logExport/registry.ts`              |
| رازوں کا نظم    | `src/lib/logExport/secrets.ts`               |
| رنر (کرسر لوپ)  | `src/lib/logExport/runner.ts`                |
| API پروجیکشن    | `src/lib/logExport/presenter.ts`             |
| BigQuery منزل   | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA توثیق | `src/lib/logExport/googleServiceAccount.ts`  |
| کال لاگ ماخذ    | `src/lib/usage/callLogExportSource.ts`       |
| مستقل ذخیرہ     | `src/lib/db/logExportDestinations.ts`        |
| Cron جاب        | `src/lib/jobs/logExportJob.ts`               |
| REST تہہ        | `src/app/api/log-export/`                    |
| ڈیش بورڈ صفحہ   | `src/app/(dashboard)/dashboard/log-export/`  |

اسکیما: `src/lib/db/migrations/170_log_export_destinations.sql`۔

---

## 3. REST API

تمام روٹس انتظامی توثیق (`requireManagementAuth`) کے تحت ہیں۔ راز کبھی واپس نہیں کیے جاتے:
ذخیرہ شدہ راز لفظ بہ لفظ `__stored__` کی صورت میں واپس آتا ہے، اور اپ ڈیٹ کرتے وقت یہی قدر واپس بھیجنے سے
ذخیرہ شدہ اسناد برقرار رہتی ہیں۔

ایسی منزل بنانا یا اپ ڈیٹ کرنا جس کی قسم کسی راز کی وضاحت کرتی ہو، **`STORAGE_ENCRYPTION_KEY`
کا تقاضا کرتا ہے**۔ اس کے بغیر `encrypt()` خاموشی سے قدر کو جوں کا توں گزار دیتا ہے، اس لیے اسناد کو
سادہ متن میں SQLite میں رکھنے کے بجائے تحریری کارروائی 400 کے ساتھ مسترد کر دی جاتی ہے (یہی حفاظتی شرط
Telegram webhook بھی لاگو کرتا ہے)۔

| طریقہ    | راستہ                                    | مقصد                                               |
| -------- | ---------------------------------------- | -------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | منزل کی اقسام + ان کے کنفیگ فیلڈز کی فہرست         |
| `GET`    | `/api/log-export/destinations`           | منزلوں کی فہرست (راز مخفی کیے گئے)                 |
| `POST`   | `/api/log-export/destinations`           | ایک منزل بنائیں                                    |
| `GET`    | `/api/log-export/destinations/{id}`      | ایک منزل پڑھیں                                     |
| `PUT`    | `/api/log-export/destinations/{id}`      | نام / فعال حالت / کنفیگ / بیچنگ اپ ڈیٹ کریں        |
| `DELETE` | `/api/log-export/destinations/{id}`      | حذف کریں                                           |
| `POST`   | `/api/log-export/destinations/{id}/test` | اسناد کی جانچ کریں، کچھ تحریر نہ کریں              |
| `POST`   | `/api/log-export/destinations/{id}/run`  | ابھی مکمل اخراج کریں، وہی راستہ جو طے شدہ رن کا ہے |
| `GET`    | `/api/log-export/status`                 | Cron حالت، حالیہ رنز، ہر ہدف کا بیک لاگ            |

`GET /api/log-export/types` ہی UI کو عمومی بناتا ہے: ڈیش بورڈ فارم واپس کیے گئے
فیلڈ ڈسکرپٹرز سے رینڈر کیا جاتا ہے، اس لیے نئی منزل کے لیے UI میں کسی تبدیلی کی ضرورت نہیں۔

---

## 4. BigQuery منزل

کنفیگ کیز (`type: "bigquery"`):

| کلید                 | نوٹس                                                                    |
| -------------------- | ----------------------------------------------------------------------- |
| `projectId`          | وہ GCP پروجیکٹ جس میں ڈیٹاسیٹ موجود ہے                                  |
| `datasetId`          | `[A-Za-z0-9_]+`                                                         |
| `tableId`            | `[A-Za-z0-9_]+`                                                         |
| `location`           | صرف اس وقت استعمال ہوتا ہے جب ڈیٹاسیٹ بنانا ہو (ڈیفالٹ `EU`)            |
| `serviceAccountJson` | سروس اکاؤنٹ کلید۔ راز: ذخیرہ شدہ حالت میں مرموز، کبھی واپس نہیں کی جاتی |
| `autoCreate`         | پہلے ایکسپورٹ پر ڈیٹاسیٹ اور ٹیبل بنائیں (ڈیفالٹ `true`)                |

سروس اکاؤنٹ کو ہدف ٹیبل پر `bigquery.tables.updateData` کی ضرورت ہے، نیز
`autoCreate` فعال ہونے پر `bigquery.datasets.create` / `bigquery.tables.create` بھی درکار ہیں۔

کنفیگر کردہ بیچ ایک **کرسر** اکائی ہے، HTTP اکائی نہیں: `send()` اسے زیادہ سے زیادہ 500 قطاروں والی
insertAll کالز میں تقسیم کرتا ہے، اس لیے بڑا `batch_size` BigQuery کی 10 MB درخواست کی حد سے تجاوز
نہیں کر سکتا۔ عارضی اسٹیٹسز (408/429/500/502/503/504) کے لیے ایک ہی insertIds دوبارہ استعمال کرتے ہوئے،
ایکسپونینشل بیک آف کے ساتھ تین مرتبہ تک دوبارہ کوشش کی جاتی ہے؛ توثیق اور اسکیما کی ناکامیاں رن کو
ضائع کرنے کے بجائے پہلی ہی کوشش پر خطا دیتی ہیں۔

چند لمحے پہلے بنایا گیا ٹیبل ابھی اسٹریمنگ اینڈ پوائنٹ کو نظر نہیں آتا، جو چند سیکنڈ تک
404 کا جواب دیتا ہے۔ اس 404 پر دوبارہ کوشش کی جاتی ہے، لیکن **صرف اس وقت جب اسی رن نے ٹیبل بنایا ہو** —
حقیقتاً غیر موجود ٹیبل پھر بھی فوراً ناکام ہو جاتا ہے۔ یاد رکھیں کہ حال ہی میں حذف کیے گئے نام کے تحت
ٹیبل دوبارہ بنانے پر BigQuery کئی منٹ تک اسٹریمنگ inserts مسترد کرتا ہے؛ یہ حذف کرکے دوبارہ بنانے
کی خصوصیت ہے، اس لیے ٹیبل کو حذف کرکے دوبارہ شامل کرنے کے بجائے نیا ٹیبل نام استعمال کریں۔

**جزوی ناکامی HTTP 200 کے ساتھ غیر خالی `insertErrors[]` کی صورت میں آتی ہے۔** اسے ناکامی سمجھ کر
خطا دی جاتی ہے، اور یہی چیز کرسر کو ان قطاروں سے آگے بڑھنے سے روکتی ہے جنہیں BigQuery نے کبھی
قبول نہیں کیا؛ `tests/unit/log-export-bigquery.test.ts` اس رویے کو متعین کرتا ہے۔

ٹرانسپورٹ سادہ REST ہے — خود دستخط شدہ RS256 assertion کو
`https://oauth2.googleapis.com/token` پر access token کے بدلے تبدیل کیا جاتا ہے، پھر قطاریں
`tabledata.insertAll` کو بھیجی جاتی ہیں۔ کوئی Google SDK شامل نہیں کیا گیا۔ Access tokens کو
ہر (service account, scope) کے لیے دورانِ عمل کیش کیا جاتا ہے۔

بنائے گئے ٹیبل میں Logs ٹیب کے ہر فیلڈ کے لیے ایک کالم کے علاوہ `exported_at` بھی ہوتا ہے، اور اسے
اس طریقے کے مطابق ترتیب دیا جاتا ہے جس سے کال لاگز عملاً استفسار کیے جاتے ہیں:

- **`timestamp` پر روزانہ کی بنیاد پر تقسیم شدہ**، تاکہ تاریخ کی حد والی استفسار صرف انہی دنوں کو اسکین کرے۔
- **`api_key_name`، `provider`، `model`، `status` کے لحاظ سے کلسٹر شدہ** (اسی ترتیب میں)، تاکہ
  یہ فلٹر کرنا کہ اسے کس نے چلایا، یہ کہاں گیا، یا آیا یہ ناکام ہوا، ہر پارٹیشن کے اندر بلاکس کو محدود کرے۔ BigQuery
  زیادہ سے زیادہ چار کلسٹرنگ کالمز کی اجازت دیتا ہے اور ترتیب اہم ہے: صرف `api_key_name` پر فلٹر
  محدود کرتا ہے، جبکہ صرف `status` پر فلٹر ایسا نہیں کرتا۔
- **`partitionExpirationDays` کے ذریعے اختیاری پارٹیشن برقرار رکھنے کی مدت** (0 ہر چیز محفوظ رکھتا ہے)، جو
  ٹیبل بناتے وقت لاگو کی جاتی ہے۔

دونوں ترتیبات تخلیق کے وقت لاگو ہوتی ہیں۔ موجودہ ٹیبل اپنی موجودہ ترتیب برقرار رکھتا ہے، اس لیے
اگر آپ انہیں اپنانا چاہتے ہیں تو منزل کو کسی نئے ٹیبل id کی طرف اشارہ کریں۔

`tests/unit/log-export-bigquery.test.ts` یقینی بناتی ہے کہ میپر اور ٹیبل اسکیما مکمل ہم آہنگی میں
رہیں، تاکہ کسی نئے کال لاگ کالم کو برآمد کرتے وقت خاموشی سے حذف نہ کیا جا سکے۔

بیچز کو **دونوں**، قطاروں کی تعداد اور سیریلائز شدہ بائٹس، کی بنیاد پر حصوں میں تقسیم کیا جاتا ہے۔ پے لوڈز
برآمد ہونے کی صورت میں صرف قطاروں کی تعداد کافی نہیں ہوتی: پرامپٹس پر مشتمل 500 قطاریں دسیوں میگابائٹس
کی ہو سکتی ہیں، اور insertAll ایسی درخواست مسترد کر دیتا ہے جس کا حجم 10 MB سے زیادہ ہو۔ حصے 500
قطاروں یا 9 MB پر، ان میں سے جو حد پہلے آئے، مکمل کر دیے جاتے ہیں۔

---

## 5. منزل شامل کرنا

1. `src/lib/logExport/destinations/<name>.ts` بنائیں جو ایک `LogExportDestinationType` export کرے:
   ایک Zod `configSchema`، UI کے لیے ایک `fields` descriptor array، `secretFields`، اور ایک
   `createClient(config)` جو `test()` / `prepare()` / `send(records)` واپس کرے۔
2. اسے `src/lib/logExport/registry.ts` میں موجود `DESTINATIONS` array میں شامل کریں۔
3. `tests/unit/` کے تحت tests لکھیں۔

بس یہی مکمل تبدیلی ہے: persistence، cron job، REST layer، secret encryption، اور
dashboard form، سبھی registry کو پڑھتے ہیں۔

نئی منزل کے لیے دو اصول:

- جزوی ناکامی پر `send()` کو **لازماً throw کرنا چاہیے**۔ Resolve ہونے کا مطلب ہے کہ "منزل کے پاس یہ rows موجود ہیں"،
  اور cursor مستقل طور پر ان سے آگے بڑھ جاتا ہے۔
- صارف کا فراہم کردہ URL استعمال کرنے والی منزل کو fetch کرنے سے پہلے
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) کے ذریعے اس کی توثیق کرنی چاہیے،
  بالکل اسی طرح جیسے webhooks کرتے ہیں۔ BigQuery کو اس کی ضرورت نہیں ہے: اس کے hosts مستقل ہیں۔

---

## 6. اسے چلانا

- **Dashboard**: Integrations → Log export۔ ایک منزل شامل کریں، rows لکھے بغیر credentials
  کی جانچ کے لیے **Test** چلائیں، پھر اسے فعال کریں۔
- **Backlog**: ہر منزل کا card زیرِ التوا rows اور cursor دکھاتا ہے؛ `GET
/api/log-export/status` یہی اعداد و شمار، نیز آخری 20 job runs واپس کرتا ہے۔
- **ایک ناکام منزل دوسری منزلوں کو ناکام نہیں کرتی** — run summary ہر منزل کی
  status کو `last_status` / `last_error` میں درج کرتا ہے، اور job run history مجموعی نتیجہ محفوظ رکھتی ہے۔
- **منزل حذف کرنے سے اس کا cursor بھی حذف ہو جاتا ہے۔** اسے دوبارہ شامل کرنے پر عمل قدیم ترین محفوظ شدہ
  call log سے شروع ہوتا ہے، جس سے وہ rows دوبارہ بھیجی جاتی ہیں جو ممکن ہے منزل کے پاس پہلے سے موجود ہوں۔ BigQuery میں ہر row کا
  `insertId` صرف BigQuery کی اپنی de-duplication window کے اندر ہی اسے سنبھالتا ہے، اس لیے
  منزل کو حذف کرنے کے بجائے اسے غیر فعال کرنے کو ترجیح دیں۔
