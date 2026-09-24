# Log export (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

تصدير مستمر وتزايدي لسجلات مكالمات OmniRoute إلى مخزن تحليلات خارجي.

تحتفظ علامة تبويب لوحة معلومات السجلات بسجل الطلبات في SQLite (`call_logs`)، ويكون هذا السجل مقيّدًا بالتدوير وسياسة الاحتفاظ. يرسل تصدير السجلات مجموعة السجلات نفسها وفق جدول زمني حتى تظل محفوظة بعد انتهاء عمر قاعدة البيانات المحلية، ويمكن ربطها ببيانات أخرى. تُعد BigQuery الوجهة الأولى؛ وخط الأنابيب عبارة عن سجل، لذا يمكن إضافة المزيد من الوجهات.

---

## 1. آلية العمل

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (مجموعة حقول علامة تبويب السجلات)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **الجدولة** — مهمة cron واحدة في `JobRegistry` باسم `log_export`، وقيمتها الافتراضية `0 * * * *` (كل ساعة، بتوقيت UTC). تُسجَّل في `src/lib/initCloudSync.ts`؛ ويمكن تجاوزها باستخدام `OMNIROUTE_LOG_EXPORT_CRON`. في كل تشغيل، تُفرَّغ كل وجهة **مُمكَّنة** بالتتابع.
- **المؤشر** — قيمة `call_logs.rowid` الضمنية في SQLite، وتُحفظ لكل وجهة في `log_export_destinations.cursor_row_id`. لا يُستخدم `timestamp` مؤشرًا عن قصد: فقد يزوّد المستدعون قيمتهم الخاصة، لذا قد يُكتب طلب بطيء بعد طلب أسرع بدأ لاحقًا، وعندها سيتخطاه مؤشر يعتمد على الطابع الزمني.
- **التجميع على دفعات** — عدد `batch_size` من الصفوف لكل طلب (القيمة الافتراضية 500)، وعدد `max_rows_per_run` من الصفوف لكل تشغيل (القيمة الافتراضية 10000)، بحيث يُفرَّغ التراكم الكبير على عدة عمليات تشغيل بدلًا من حجب عملية واحدة.
- **التسليم** — لا يتقدم المؤشر إلا بعد اكتمال `send()`. تترك الدفعة الفاشلة المؤشر في موضعه، بحيث يُعاد إرسال الصفوف نفسها في التشغيل التالي. الضمان هو التسليم مرة واحدة على الأقل مع إزالة التكرار في جانب الوجهة، وليس التسليم مرة واحدة فقط فعليًا: تستخدم BigQuery معرّف سجل المكالمة مفتاحًا لكل صف، وتلتزم به على أساس بذل أفضل جهد ضمن نافذة إزالة التكرار الخاصة بها.
- **الحماية من التداخل** — قد يحدث تشغيل cron و`POST .../run` معًا. تُتخطى الوجهة التي يجري تفريغها بالفعل بدلًا من تفريغها مرتين (`skipped: true` في نتيجة التشغيل)، وبذلك لا يمكن لتشغيل متزامن إعادة إرسال دفعة أو إرجاع المؤشر إلى الخلف.
- **الاسترداد بعد المسح** — إذا أصبحت قيمة `cursor_row_id` أعلى من `MAX(rowid)` (بعد مسح الجدول بالكامل وإعادة بدء معرّفات الصفوف)، يُرجع المشغّل المؤشر إلى 0 بدلًا من فقدان الرؤية نهائيًا.

### الحمولات (الموجّهات والإكمالات)

بشكل افتراضي، لا يتضمن التصدير سوى حقول الملخص التي تعرضها **قائمة** السجلات. يؤدي تفعيل **تصدير الموجّهات والاستجابات** (`includeBodies`) إلى إرسال ما يعرضه أيضًا جزء **التفاصيل** في السجلات لكل مكالمة:

| الحقل                            | ما يحتويه                                                   |
| -------------------------------- | ----------------------------------------------------------- |
| `request_body` / `response_body` | حمولات المكالمة كما تعرضها لوحة المعلومات                   |
| `pipeline_route_decision`        | الهدف والنموذج اللذان اختارهما الموجّه                      |
| `pipeline_client_request`        | الطلب الخام كما أرسله العميل تمامًا                         |
| `pipeline_openai_request`        | الطلب بعد ترجمته إلى صيغة OpenAI الداخلية                   |
| `pipeline_provider_request`      | الطلب كما أُرسل فعليًا إلى المنبع، بلهجة المزوّد            |
| `pipeline_provider_response`     | الاستجابة الخام من المنبع                                   |
| `pipeline_client_response`       | ما أُعيد إلى المستدعي                                       |
| `pipeline_error`                 | تفاصيل خطأ على مستوى خط الأنابيب لمكالمة فاشلة              |
| `bodies_truncated`               | تكون القيمة صحيحة عندما يبلغ أي حقل أعلاه حد `maxBodyBytes` |

هذا محتوى موجّهات، لذلك يكون **معطّلًا افتراضيًا** ويُختار عمدًا لكل وجهة على حدة. ما يُرسل هو ما تعرضه لوحة المعلومات، لأن كليهما يقرأ عبر `getCallLogById`: تكون الحمولات قد خضعت بالفعل لتنقية معلومات تحديد الهوية الشخصية وتنقيح الأسرار عند كتابتها، كما أن المكالمة التي تُجرى باستخدام مفتاح API من نوع `noLog` لا تخزّن أي حمولة أصلًا، ولذلك لا يوجد ما يمكن تصديره.

تُقرأ الحمولات لكل صف من ملف الأثر في نظام الملفات، لذا لا تحدث عملية الإثراء إلا للوجهات التي طلبتها. إذا كان ملف أثر أحد الصفوف مفقودًا أو تالفًا، يُصدَّر ملخصه بحمولات فارغة بدلًا من إفشال الدفعة وتعطيل المؤشر.

يضع `maxBodyBytes` (القيمة الافتراضية 262144) حدًا أقصى لكل حقل. تُقتطع الحمولات الأطول **بدلًا من إسقاطها** — إذ يظل الموجّه المقتطع يجيب عن سؤال «ما الذي طُلب؟» — ويُعلَّم الصف باستخدام `bodies_truncated`. لا تُصدَّر الفروق المتدفقة جزءًا تلو الآخر؛ فالاستجابة المجمّعة موجودة بالفعل في `pipeline_provider_response` و`pipeline_client_response`.

---

## 2. الملفات

| الجزء                   | الموقع                                       |
| ----------------------- | -------------------------------------------- |
| عقد الوجهة              | `src/lib/logExport/types.ts`                 |
| السجل                   | `src/lib/logExport/registry.ts`              |
| معالجة الأسرار          | `src/lib/logExport/secrets.ts`               |
| المشغّل (حلقة المؤشر)   | `src/lib/logExport/runner.ts`                |
| إسقاط API               | `src/lib/logExport/presenter.ts`             |
| وجهة BigQuery           | `src/lib/logExport/destinations/bigquery.ts` |
| مصادقة حساب خدمة Google | `src/lib/logExport/googleServiceAccount.ts`  |
| مصدر سجل الاستدعاءات    | `src/lib/usage/callLogExportSource.ts`       |
| الاستمرارية             | `src/lib/db/logExportDestinations.ts`        |
| مهمة Cron               | `src/lib/jobs/logExportJob.ts`               |
| طبقة REST               | `src/app/api/log-export/`                    |
| صفحة لوحة المعلومات     | `src/app/(dashboard)/dashboard/log-export/`  |

المخطط: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. واجهة REST API

تخضع جميع المسارات لمصادقة الإدارة (`requireManagementAuth`). لا تُعاد الأسرار مطلقًا:
إذ يُعاد السر المخزّن على هيئة القيمة الحرفية `__stored__`، وإرسال هذه القيمة مجددًا في عملية تحديث
يُبقي بيانات الاعتماد المخزّنة.

يتطلب إنشاء وجهة أو تحديثها عندما يصرّح نوعها بوجود سر **توفير
`STORAGE_ENCRYPTION_KEY`**. من دونه، تكون `encrypt()` عملية تمرير صامتة دون تغيير، ولذلك تُرفض
الكتابة بحالة 400 بدلًا من وضع بيانات اعتماد في SQLite كنص صريح (وهو الحاجز نفسه الذي يطبّقه
خطاف Telegram).

| الطريقة  | المسار                                   | الغرض                                                     |
| -------- | ---------------------------------------- | --------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | أنواع الوجهات + قائمة حقول الإعداد الخاصة بها             |
| `GET`    | `/api/log-export/destinations`           | سرد الوجهات (مع تنقيح الأسرار)                            |
| `POST`   | `/api/log-export/destinations`           | إنشاء وجهة                                                |
| `GET`    | `/api/log-export/destinations/{id}`      | قراءة وجهة واحدة                                          |
| `PUT`    | `/api/log-export/destinations/{id}`      | تحديث الاسم / حالة التفعيل / الإعداد / التجميع            |
| `DELETE` | `/api/log-export/destinations/{id}`      | الحذف                                                     |
| `POST`   | `/api/log-export/destinations/{id}/test` | اختبار بيانات الاعتماد دون كتابة أي شيء                   |
| `POST`   | `/api/log-export/destinations/{id}/run`  | التفريغ الآن، باستخدام المسار نفسه للتشغيل المجدول        |
| `GET`    | `/api/log-export/status`                 | حالة Cron وعمليات التشغيل الأخيرة والعمل المتراكم لكل هدف |

`GET /api/log-export/types` هو ما يجعل واجهة المستخدم عامة: يُعرض نموذج لوحة المعلومات استنادًا إلى
واصفات الحقول المُعادة، ولذلك لا تتطلب إضافة وجهة جديدة أي تغيير في واجهة المستخدم.

---

## 4. وجهة BigQuery

مفاتيح الإعداد (`type: "bigquery"`):

| المفتاح              | الملاحظات                                                              |
| -------------------- | ---------------------------------------------------------------------- |
| `projectId`          | مشروع GCP الذي يحتوي على مجموعة البيانات                               |
| `datasetId`          | `[A-Za-z0-9_]+`                                                        |
| `tableId`            | `[A-Za-z0-9_]+`                                                        |
| `location`           | يُستخدم فقط عندما يلزم إنشاء مجموعة البيانات (القيمة الافتراضية `EU`)  |
| `serviceAccountJson` | مفتاح حساب الخدمة. سر: مشفّر أثناء التخزين ولا يُعاد مطلقًا            |
| `autoCreate`         | إنشاء مجموعة البيانات والجدول عند أول تصدير (القيمة الافتراضية `true`) |

يحتاج حساب الخدمة إلى `bigquery.tables.updateData` على الجدول المستهدف، بالإضافة إلى
`bigquery.datasets.create` / `bigquery.tables.create` عندما يكون `autoCreate` مفعّلًا.

الدفعة المضبوطة هي وحدة **مؤشر** وليست وحدة HTTP: تقسّمها `send()` إلى استدعاءات insertAll
لا يزيد كل منها على 500 صف، ولذلك لا يمكن لقيمة `batch_size` كبيرة أن تتجاوز حد طلب BigQuery البالغ 10 MB.
تُعاد محاولة الحالات العابرة (408/429/500/502/503/504) حتى ثلاث مرات باستخدام تأخير
أُسّي، مع إعادة استخدام insertIds نفسها؛ أما إخفاقات المصادقة والمخطط فتطرح استثناءً من المحاولة الأولى
بدلًا من استنزاف عملية التشغيل.

لا يكون الجدول الذي أُنشئ قبل لحظات مرئيًا بعد لنقطة نهاية البث، التي تستجيب
بحالة 404 لبضع ثوانٍ. تُعاد محاولة حالة 404 هذه، لكن **فقط عندما تكون عملية التشغيل الحالية قد أنشأت الجدول** —
أما الجدول المفقود فعلًا فيؤدي إلى فشل سريع. لاحظ أن إعادة إنشاء جدول بالاسم نفسه لجدول
حُذف مؤخرًا تجعل BigQuery يرفض عمليات إدراج البث لعدة دقائق؛ وهذه خاصية
للحذف ثم إعادة الإنشاء، لذا يُفضّل استخدام اسم جدول جديد بدلًا من حذف جدول وإضافته من جديد.

**يصل الإخفاق الجزئي على هيئة HTTP 200 مع `insertErrors[]` غير فارغة.** يُعامل ذلك على أنه
إخفاق ويُطرح استثناء، وهو ما يمنع المؤشر من التقدم متجاوزًا صفوفًا لم يقبلها BigQuery؛ ويثبّت
`tests/unit/log-export-bigquery.test.ts` هذا السلوك.

يستخدم النقل REST مباشرةً — إذ يُستبدل تأكيد RS256 موقّع ذاتيًا برمز وصول لدى
`https://oauth2.googleapis.com/token`، ثم تُرسل الصفوف إلى `tabledata.insertAll`. لا تُضاف أي حزمة SDK من Google.
تُخزّن رموز الوصول مؤقتًا داخل العملية لكل زوج من (حساب الخدمة، النطاق).

يحمل الجدول المُنشأ عمودًا لكل حقل في تبويب السجلات، بالإضافة إلى `exported_at`، ويُنظّم
وفقًا لطريقة الاستعلام الفعلية عن سجلات الاستدعاءات:

- **مقسّم حسب اليوم باستخدام `timestamp`**، ولذلك لا يفحص الاستعلام المقيّد بالتاريخ سوى تلك الأيام.
- **مجمّع حسب `api_key_name` و`provider` و`model` و`status`** (بهذا الترتيب)، بحيث تؤدي التصفية حسب
  مَن شغّله أو الوجهة التي أُرسل إليها أو ما إذا كان قد فشل إلى استبعاد الكتل داخل كل قسم. يسمح BigQuery
  بأربعة أعمدة تجميع كحد أقصى، ويؤثر ترتيبها: تؤدي التصفية حسب `api_key_name` وحده
  إلى الاستبعاد، بينما لا تفعل التصفية حسب `status` وحده ذلك.
- **فترة احتفاظ اختيارية بالأقسام** عبر `partitionExpirationDays` (القيمة 0 تحتفظ بكل شيء)، وتُطبّق
  عند إنشاء الجدول.

يُطبَّق كلا الإعدادين عند الإنشاء. يحتفظ الجدول الموجود بتخطيطه الحالي، لذا
وجّه الوجهة إلى معرّف جدول جديد إذا كنت تريد اعتمادهما.

يتحقق `tests/unit/log-export-bigquery.test.ts` من بقاء أداة التعيين ومخطط الجدول
متزامنين، بحيث لا يمكن إسقاط عمود جديد من سجل الاستدعاءات بصمت أثناء التصدير.

تُقسَّم الدُفعات بناءً على **كلٍّ من** عدد الصفوف والحجم بالبايت بعد التسلسل. لا يكفي عدد الصفوف وحده
عند تصدير الحمولات: فقد يصل حجم 500 صف تتضمن مطالبات إلى عشرات الميغابايت، ويرفض insertAll
أي طلب يتجاوز 10 MB. تُغلق الأجزاء عند بلوغ 500 صف أو 9 MB، أيهما يحدث أولًا.

---

## 5. إضافة وجهة

1. أنشئ `src/lib/logExport/destinations/<name>.ts` مع تصدير `LogExportDestinationType`:
   مخطط `configSchema` من Zod، ومصفوفة واصفات `fields` لواجهة المستخدم، و`secretFields`، ودالة
   `createClient(config)` تُعيد `test()` / `prepare()` / `send(records)`.
2. أضفها إلى مصفوفة `DESTINATIONS` في `src/lib/logExport/registry.ts`.
3. اكتب اختبارات ضمن `tests/unit/`.

هذا هو التغيير بالكامل: تعتمد طبقة الاستمرارية ومهمة cron وطبقة REST وتشفير الأسرار ونموذج
لوحة المعلومات جميعها على السجل.

قاعدتان لإضافة وجهة جديدة:

- **يجب على `send()` طرح استثناء** عند حدوث فشل جزئي. ويعني اكتمالها بنجاح أن «الوجهة تحتوي على هذه الصفوف»،
  وأن المؤشر سيتجاوزها نهائيًا.
- يجب على أي وجهة تقبل عنوان URL يقدمه المستخدم التحقق منه من خلال
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) قبل جلبه،
  بالطريقة نفسها التي تتبعها خطافات الويب. لا يحتاج BigQuery إلى ذلك، لأن مضيفيه عبارة عن ثوابت.

---

## 6. التشغيل

- **لوحة المعلومات**: عمليات التكامل → تصدير السجلات. أضف وجهة، ثم شغّل **اختبار** للتحقق من بيانات الاعتماد
  دون كتابة صفوف، وبعد ذلك فعّلها.
- **التراكم**: تعرض بطاقة كل وجهة الصفوف المعلقة والمؤشر؛ ويُرجع `GET
/api/log-export/status` الأرقام نفسها بالإضافة إلى آخر 20 عملية تشغيل للمهمة.
- **لا يؤدي فشل وجهة إلى فشل الوجهات الأخرى** — إذ يسجل ملخص التشغيل حالة كل وجهة
  في `last_status` / `last_error`، بينما يحتفظ سجل تشغيل المهمة بالنتيجة الإجمالية.
- **يؤدي حذف وجهة إلى حذف مؤشرها.** وتؤدي إعادة إضافتها إلى البدء من أقدم سجل مكالمات محتفَظ به،
  ما يعيد إرسال صفوف قد تكون موجودة بالفعل لدى الوجهة. في BigQuery، يمنع `insertId` الخاص بكل صف
  التكرار فقط ضمن نافذة إزالة التكرار الخاصة بـ BigQuery، لذا يُفضّل تعطيل الوجهة بدلًا من حذفها.
