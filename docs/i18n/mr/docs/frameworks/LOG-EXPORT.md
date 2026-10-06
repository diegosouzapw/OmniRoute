# Log export (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute कॉल लॉग्सचे बाह्य विश्लेषण स्टोअरमध्ये सतत, क्रमवर्धी निर्यात.

Logs डॅशबोर्ड टॅब विनंती इतिहास SQLite (`call_logs`) मध्ये ठेवतो, ज्याचा आकार
रोटेशन आणि धारणा यांद्वारे मर्यादित केला जातो. लॉग निर्यात त्याच नोंदसंचाला नियोजित वेळापत्रकानुसार बाहेर पाठवते, जेणेकरून तो
स्थानिक डेटाबेसपेक्षा अधिक काळ टिकू शकेल आणि इतर डेटासोबत जोडला जाऊ शकेल. BigQuery हे पहिले गंतव्य आहे;
पाइपलाइन ही एक रजिस्ट्री असल्यामुळे अधिक गंतव्ये सहजपणे जोडता येतात.

---

## 1. हे कसे कार्य करते

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (Logs टॅबचा फील्ड संच)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **वेळापत्रक** — एक `JobRegistry` cron जॉब, `log_export`, ज्याचे डीफॉल्ट मूल्य `0 * * * *` (दर तासाला,
  UTC) आहे. `src/lib/initCloudSync.ts` मध्ये नोंदणीकृत; `OMNIROUTE_LOG_EXPORT_CRON` वापरून बदलता येते.
  प्रत्येक टिकमध्ये प्रत्येक **सक्षम केलेले** गंतव्य क्रमाने पूर्णपणे रिकामे केले जाते.
- **कर्सर** — SQLite चा अप्रत्यक्ष `call_logs.rowid`, प्रत्येक गंतव्यासाठी
  `log_export_destinations.cursor_row_id` मध्ये कायमस्वरूपी साठवला जातो. `timestamp` मुद्दाम कर्सर म्हणून वापरला जात नाही: कॉलर
  स्वतःचे मूल्य देऊ शकतात, त्यामुळे नंतर सुरू झालेल्या वेगवान विनंतीनंतर एखादी संथ विनंती लिहिली जाऊ शकते
  आणि timestamp कर्सर ती वगळेल.
- **बॅचिंग** — प्रत्येक विनंतीमागे `batch_size` पंक्ती (डीफॉल्ट 500), प्रत्येक रनमध्ये
  `max_rows_per_run` पंक्ती (डीफॉल्ट 10000), जेणेकरून मोठा अनुशेष एकाच रनला अडवण्याऐवजी अनेक टिकमध्ये रिकामा होईल.
- **वितरण** — `send()` यशस्वीरीत्या पूर्ण झाल्यानंतरच कर्सर पुढे सरकतो. अयशस्वी बॅचमुळे
  कर्सर त्याच ठिकाणी राहतो, त्यामुळे पुढील रनमध्ये त्याच पंक्तींचा पुन्हा प्रयत्न केला जातो. याची हमी
  किमान-एकदा वितरण आणि गंतव्य-बाजूवरील डि-डुप्लिकेशन अशी आहे, खरे exactly-once वितरण नाही: BigQuery प्रत्येक
  पंक्तीला call-log id द्वारे कळ देतो आणि स्वतःच्या डि-डुप्लिकेशन कालमर्यादेत शक्य तितक्या सर्वोत्तम पद्धतीने त्याचे पालन करतो.
- **ओव्हरलॅप प्रतिबंध** — cron टिक आणि `POST .../run` एकाच वेळी सुरू होऊ शकतात. आधीपासून
  रिकामे होत असलेले गंतव्य दुसऱ्यांदा रिकामे करण्याऐवजी वगळले जाते (रन निकालात `skipped: true`),
  त्यामुळे समांतर रन एखादी बॅच पुन्हा पाठवू शकत नाही किंवा कर्सर मागे लिहू शकत नाही.
- **पर्ज पुनर्प्राप्ती** — `cursor_row_id` चे मूल्य `MAX(rowid)` पेक्षा जास्त झाल्यास (संपूर्ण तक्ता
  पर्ज केला गेला आणि rowids पुन्हा सुरू झाले), रनर कायमचा निष्क्रिय होण्याऐवजी 0 वर परत जातो.

### पेलोड्स (प्रॉम्प्ट्स आणि पूर्णत्वे)

डीफॉल्टनुसार निर्यातीत फक्त Logs **यादीत** दिसणारी सारांश फील्ड्स असतात. **प्रॉम्प्ट्स आणि प्रतिसाद निर्यात करा**
(`includeBodies`) सुरू केल्यास प्रत्येक कॉलसाठी Logs **तपशील** पॅनमध्ये दिसणारी माहितीही पाठवली जाते:

| फील्ड                            | त्यामध्ये काय असते                                              |
| -------------------------------- | --------------------------------------------------------------- |
| `request_body` / `response_body` | डॅशबोर्ड जसे रेंडर करतो तसे कॉलचे पेलोड्स                       |
| `pipeline_route_decision`        | राउटरने कोणते लक्ष्य आणि मॉडेल निवडले                           |
| `pipeline_client_request`        | क्लायंटने पाठवलेली हुबेहूब कच्ची विनंती                         |
| `pipeline_openai_request`        | अंतर्गत OpenAI स्वरूपात रूपांतर केल्यानंतर                      |
| `pipeline_provider_request`      | प्रत्यक्षात अपस्ट्रीम पाठवलेली, प्रदात्याच्या बोलीतील विनंती    |
| `pipeline_provider_response`     | कच्चा अपस्ट्रीम प्रतिसाद                                        |
| `pipeline_client_response`       | कॉलरला परत दिलेली माहिती                                        |
| `pipeline_error`                 | अयशस्वी कॉलसाठी पाइपलाइन-स्तरीय त्रुटीचा तपशील                  |
| `bodies_truncated`               | वरील कोणतेही फील्ड `maxBodyBytes` मर्यादेपर्यंत पोहोचल्यास सत्य |

ही प्रॉम्प्ट सामग्री आहे, त्यामुळे ती **डीफॉल्टनुसार बंद** असते आणि मुद्दाम प्रत्येक गंतव्यनिहाय निवडता येते.
जे पाठवले जाते तेच डॅशबोर्ड दाखवतो, कारण दोन्ही `getCallLogById` द्वारे वाचतात: पेलोड्स
लिहिले जातानाच त्यांतील PII स्वच्छ केलेली आणि गुपिते लपवलेली असतात, तसेच
`noLog` API की वापरून केलेल्या कॉलसाठी कोणताही पेलोड साठवला जात नाही, त्यामुळे निर्यात करण्यास काहीच नसते.

पेलोड्स प्रत्येक पंक्तीसाठी फाइलसिस्टम आर्टिफॅक्टमधून वाचले जातात, त्यामुळे हायड्रेशन फक्त त्याची विनंती केलेल्या गंतव्यांसाठी
चालते. ज्या पंक्तीचा आर्टिफॅक्ट गहाळ किंवा दूषित आहे, तिचा सारांश null
पेलोड्ससह निर्यात केला जातो; त्यामुळे बॅच अयशस्वी होऊन कर्सर अडकत नाही.

`maxBodyBytes` (डीफॉल्ट 262144) प्रत्येक फील्डवर मर्यादा घालते. मोठे पेलोड्स **वगळण्याऐवजी
छाटले जातात** — छाटलेला प्रॉम्प्ट तरीही "काय विचारले होते" याचे उत्तर देतो — आणि पंक्तीला
`bodies_truncated` ने चिन्हांकित केले जाते. भागा-भागाने प्रवाहित केलेले डेल्टा निर्यात केले जात नाहीत; एकत्रित प्रतिसाद
आधीच `pipeline_provider_response` आणि `pipeline_client_response` मध्ये असतो.

---

## 2. फाइल्स

| भाग                  | स्थान                                        |
| -------------------- | -------------------------------------------- |
| गंतव्य करार          | `src/lib/logExport/types.ts`                 |
| रजिस्ट्री            | `src/lib/logExport/registry.ts`              |
| गुपित हाताळणी        | `src/lib/logExport/secrets.ts`               |
| रनर (कर्सर लूप)      | `src/lib/logExport/runner.ts`                |
| API प्रोजेक्शन       | `src/lib/logExport/presenter.ts`             |
| BigQuery गंतव्य      | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA प्रमाणीकरण | `src/lib/logExport/googleServiceAccount.ts`  |
| कॉल-लॉग स्रोत        | `src/lib/usage/callLogExportSource.ts`       |
| स्थायित्व            | `src/lib/db/logExportDestinations.ts`        |
| Cron जॉब             | `src/lib/jobs/logExportJob.ts`               |
| REST स्तर            | `src/app/api/log-export/`                    |
| डॅशबोर्ड पृष्ठ       | `src/app/(dashboard)/dashboard/log-export/`  |

स्कीमा: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

सर्व मार्ग व्यवस्थापन-प्रमाणीकृत (`requireManagementAuth`) आहेत. गुपिते कधीही परत केली जात नाहीत:
साठवलेले गुपित अक्षरशः `__stored__` म्हणून परत येते आणि अद्यतन करताना तेच मूल्य परत पाठवल्यास
साठवलेली क्रेडेन्शियल कायम राहते.

ज्या गंतव्याचा प्रकार गुपित घोषित करतो, असे गंतव्य तयार करण्यासाठी किंवा अद्यतनित करण्यासाठी **`STORAGE_ENCRYPTION_KEY`
आवश्यक आहे**. त्याशिवाय `encrypt()` कोणताही इशारा न देता मूल्य जसेच्या तसे पुढे पाठवते, त्यामुळे SQLite मध्ये
क्रेडेन्शियल साध्या मजकुरात ठेवण्याऐवजी लेखन 400 प्रतिसादासह नाकारले जाते (Telegram वेबहुकमध्येही हाच
प्रतिबंध लागू केला आहे).

| पद्धत    | मार्ग                                    | उद्देश                                               |
| -------- | ---------------------------------------- | ---------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | गंतव्य प्रकार + त्यांच्या कॉन्फिग फील्डची यादी       |
| `GET`    | `/api/log-export/destinations`           | गंतव्यांची यादी (गुपिते लपवलेली)                     |
| `POST`   | `/api/log-export/destinations`           | गंतव्य तयार करणे                                     |
| `GET`    | `/api/log-export/destinations/{id}`      | एक गंतव्य वाचणे                                      |
| `PUT`    | `/api/log-export/destinations/{id}`      | नाव / सक्षम स्थिती / कॉन्फिग / बॅचिंग अद्यतनित करणे  |
| `DELETE` | `/api/log-export/destinations/{id}`      | हटवणे                                                |
| `POST`   | `/api/log-export/destinations/{id}/test` | क्रेडेन्शियलची चाचणी करणे, काहीही न लिहिणे           |
| `POST`   | `/api/log-export/destinations/{id}/run`  | आत्ताच रिकामे करणे, नियोजित रनसारखाच मार्ग           |
| `GET`    | `/api/log-export/status`                 | Cron स्थिती, अलीकडील रन, प्रत्येक लक्ष्यासाठी अनुशेष |

`GET /api/log-export/types` मुळेच UI सर्वसामान्य पद्धतीने कार्य करते: परत आलेल्या फील्ड वर्णनांवरून
डॅशबोर्ड फॉर्म रेंडर केला जातो, त्यामुळे नवीन गंतव्यासाठी UI मध्ये कोणताही बदल आवश्यक नसतो.

---

## 4. BigQuery गंतव्य

कॉन्फिग की (`type: "bigquery"`):

| की                   | नोंदी                                                                           |
| -------------------- | ------------------------------------------------------------------------------- |
| `projectId`          | डेटासेट असलेला GCP प्रकल्प                                                      |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                 |
| `tableId`            | `[A-Za-z0-9_]+`                                                                 |
| `location`           | डेटासेट तयार करावे लागते तेव्हाच वापरले जाते (डीफॉल्ट `EU`)                     |
| `serviceAccountJson` | सेवा-खाते की. गुपित: संग्रहित असताना एन्क्रिप्ट केलेली, कधीही परत केली जात नाही |
| `autoCreate`         | पहिल्या निर्यातीवेळी डेटासेट आणि टेबल तयार करा (डीफॉल्ट `true`)                 |

सेवा खात्यास लक्ष्य टेबलवर `bigquery.tables.updateData` आणि `autoCreate` सुरू असताना
`bigquery.datasets.create` / `bigquery.tables.create` या परवानग्या आवश्यक असतात.

कॉन्फिगर केलेली बॅच हे **कर्सर** एकक आहे, HTTP एकक नाही: `send()` तिला जास्तीत जास्त 500 ओळींच्या
insertAll कॉलमध्ये विभागते, त्यामुळे मोठे `batch_size` BigQuery ची 10 MB विनंती मर्यादा ओलांडू शकत नाही.
तात्पुरत्या स्थितींवर (408/429/500/502/503/504) त्याच insertIds चा पुनर्वापर करून, एक्स्पोनेन्शियल
बॅकऑफसह जास्तीत जास्त तीन वेळा पुन्हा प्रयत्न केला जातो; प्रमाणीकरण आणि स्कीमा अपयशांसाठी रन वाया
जाऊ नये म्हणून पहिल्याच प्रयत्नात त्रुटी फेकली जाते.

काही क्षणांपूर्वी तयार केलेले टेबल स्ट्रीमिंग एंडपॉइंटला लगेच दिसत नाही, त्यामुळे तो काही सेकंदांसाठी
404 प्रतिसाद देतो. त्या 404 साठी पुन्हा प्रयत्न केला जातो, पण **फक्त या रनने टेबल तयार केले असल्यास** —
खरोखरच अस्तित्वात नसलेल्या टेबलसाठी प्रक्रिया त्वरित अपयशी होते. लक्षात ठेवा की अलीकडे हटवलेल्या
टेबलच्या नावाखाली टेबल पुन्हा तयार केल्यास BigQuery अनेक मिनिटांसाठी स्ट्रीमिंग इन्सर्ट नाकारते;
हे हटवून-पुन्हा-तयार करण्याचे वैशिष्ट्य आहे, त्यामुळे टेबल हटवून पुन्हा जोडण्याऐवजी नवीन टेबल नावाला
प्राधान्य द्या.

**अंशतः अपयश HTTP 200 म्हणून, रिकामी नसलेली `insertErrors[]` घेऊन येते.** त्यास अपयश मानून त्रुटी
फेकली जाते, ज्यामुळे BigQuery ने कधीही स्वीकारल्या नाहीत अशा ओळींच्या पुढे कर्सर सरकत नाही;
`tests/unit/log-export-bigquery.test.ts` हे वर्तन निश्चित करते.

वाहतूक साध्या REST द्वारे होते — स्वयं-स्वाक्षरी केलेले RS256 assertion
`https://oauth2.googleapis.com/token` येथे access token साठी अदलाबदल केले जाते, त्यानंतर ओळी
`tabledata.insertAll` कडे जातात. कोणतेही Google SDK समाविष्ट केलेले नाही. Access token प्रत्येक
(service account, scope) साठी प्रक्रियेमध्ये कॅश केले जातात.

तयार केलेल्या टेबलमध्ये Logs टॅबमधील प्रत्येक फील्डसाठी एक कॉलम आणि त्यासोबत `exported_at` असतो,
आणि कॉल लॉग प्रत्यक्षात ज्या प्रकारे क्वेरी केले जातात त्यानुसार त्याची रचना केली जाते:

- **`timestamp` वर दिवसानुसार विभाजन केलेले**, त्यामुळे तारखेनुसार मर्यादित केलेली क्वेरी फक्त तेच दिवस स्कॅन करते.
- **`api_key_name`, `provider`, `model`, `status` यांनुसार क्लस्टर केलेले** (याच क्रमाने), त्यामुळे कोणी ते
  चालवले, ते कुठे गेले किंवा ते अयशस्वी झाले का यावर आधारित फिल्टरिंग प्रत्येक विभाजनातील ब्लॉक वगळते. BigQuery
  जास्तीत जास्त चार क्लस्टरिंग कॉलमना अनुमती देते आणि क्रम महत्त्वाचा असतो: केवळ `api_key_name` वरील फिल्टर
  ब्लॉक वगळतो, पण केवळ `status` वरील फिल्टर तसे करत नाही.
- **`partitionExpirationDays` द्वारे पर्यायी विभाजन धारणा** (`0` सर्वकाही कायम ठेवते), जी टेबल तयार केले
  जाते तेव्हा लागू केली जाते.

दोन्ही सेटिंग्ज निर्मितीच्या वेळी लागू होतात. विद्यमान टेबलची आधीपासून असलेली मांडणी तशीच राहते, त्यामुळे
तुम्हाला त्या स्वीकारायच्या असल्यास गंतव्यस्थानासाठी नवीन टेबल id निर्दिष्ट करा.

`tests/unit/log-export-bigquery.test.ts` हे मॅपर आणि टेबल स्कीमा यांच्यातील सुसंगती कायम असल्याचे सुनिश्चित करते,
त्यामुळे नवीन call-log कॉलम बाहेर पाठवताना नकळत वगळला जाऊ शकत नाही.

बॅचेसचे तुकडे **दोन्ही**—रोची संख्या आणि सिरियलाइज केलेले बाइट्स—यांनुसार केले जातात. पेलोड्स एक्सपोर्ट केल्यानंतर
केवळ रोची संख्या पुरेशी नसते: प्रॉम्प्ट्स असलेल्या 500 रो अनेक दहा मेगाबाइट्सच्या असू शकतात, आणि insertAll
10 MB पेक्षा मोठी विनंती नाकारते. 500 रो किंवा 9 MB, यांपैकी जे आधी गाठले जाईल तेव्हा तुकडा पूर्ण केला जातो.

---

## 5. गंतव्य जोडणे

1. `LogExportDestinationType` निर्यात करणारी `src/lib/logExport/destinations/<name>.ts` फाइल तयार करा:
   UI साठी Zod `configSchema`, `fields` वर्णनकर्ता अॅरे, `secretFields`, आणि
   `test()` / `prepare()` / `send(records)` परत करणारे `createClient(config)`.
2. ते `src/lib/logExport/registry.ts` मधील `DESTINATIONS` अॅरेमध्ये जोडा.
3. `tests/unit/` अंतर्गत चाचण्या लिहा.

एवढाच संपूर्ण बदल आवश्यक आहे: पर्सिस्टन्स, cron जॉब, REST स्तर, गुपितांचे एन्क्रिप्शन आणि
डॅशबोर्ड फॉर्म हे सर्व रजिस्ट्रीमधील माहिती वाचतात.

नवीन गंतव्यासाठी दोन नियम:

- आंशिक अपयश आल्यास `send()` ने **अपवाद फेकलाच पाहिजे**. ते यशस्वीरीत्या पूर्ण होणे म्हणजे "गंतव्याकडे या पंक्ती आहेत",
  आणि कर्सर कायमस्वरूपी त्यांच्या पुढे सरकतो.
- वापरकर्त्याने पुरवलेली URL स्वीकारणाऱ्या गंतव्याने डेटा फेच करण्यापूर्वी,
  वेबहुक्सप्रमाणेच, `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) द्वारे तिचे प्रमाणीकरण केले पाहिजे.
  BigQuery साठी याची आवश्यकता नाही: त्याचे होस्ट्स स्थिरांक आहेत.

---

## 6. ते चालवणे

- **डॅशबोर्ड**: Integrations → Log export. गंतव्य जोडा, पंक्ती न लिहिता क्रेडेन्शियल्स तपासण्यासाठी **Test** चालवा,
  आणि नंतर ते सक्षम करा.
- **बॅकलॉग**: प्रत्येक गंतव्य कार्ड प्रलंबित पंक्ती आणि कर्सर दाखवते; `GET
/api/log-export/status` हीच आकडेवारी तसेच शेवटच्या 20 जॉब रनची माहिती परत करते.
- **एका गंतव्याचे अपयश इतर गंतव्यांना अपयशी ठरवत नाही** — रन सारांश प्रत्येक गंतव्याची
  स्थिती `last_status` / `last_error` मध्ये नोंदवतो आणि जॉब रन इतिहास एकत्रित माहिती जतन करतो.
- **गंतव्य हटवल्यास त्याचा कर्सरही हटवला जातो.** ते पुन्हा जोडल्यास सर्वांत जुन्या राखून ठेवलेल्या
  कॉल लॉगपासून सुरुवात होते, ज्यामुळे गंतव्याकडे आधीपासून असलेल्या पंक्ती पुन्हा पाठवल्या जाऊ शकतात. BigQuery मध्ये प्रत्येक पंक्तीचा
  `insertId` हे फक्त BigQuery च्या स्वतःच्या डि-डुप्लिकेशन कालावधीतच हाताळतो, त्यामुळे गंतव्य हटवण्याऐवजी
  ते अक्षम करणे श्रेयस्कर आहे.
