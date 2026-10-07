# Log export (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute कॉल लॉग्स का किसी बाहरी एनालिटिक्स स्टोर में निरंतर, वृद्धिशील निर्यात।

Logs डैशबोर्ड टैब अनुरोध इतिहास को SQLite (`call_logs`) में रखता है, जो रोटेशन और
रिटेंशन द्वारा सीमित होता है। लॉग निर्यात उसी रिकॉर्ड सेट को निर्धारित समय-सारणी पर बाहर भेजता है, ताकि वह
स्थानीय डेटाबेस से अधिक समय तक बना रह सके और अन्य डेटा के साथ जोड़ा जा सके। BigQuery पहला गंतव्य है;
पाइपलाइन एक रजिस्ट्री है, इसलिए और गंतव्य आसानी से जोड़े जा सकते हैं।

---

## 1. यह कैसे काम करता है

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (Logs टैब का फ़ील्ड सेट)
      → गंतव्य client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **समय-सारणी** — एक `JobRegistry` cron जॉब, `log_export`, जिसका डिफ़ॉल्ट `0 * * * *` (हर घंटे,
  UTC) है। `src/lib/initCloudSync.ts` में पंजीकृत; `OMNIROUTE_LOG_EXPORT_CRON` से ओवरराइड किया जा सकता है।
  प्रत्येक टिक हर **सक्षम** गंतव्य को क्रमिक रूप से पूरा खाली करता है।
- **कर्सर** — SQLite का अंतर्निहित `call_logs.rowid`, जो प्रत्येक गंतव्य के लिए
  `log_export_destinations.cursor_row_id` में स्थायी रूप से रखा जाता है। `timestamp` को जानबूझकर कर्सर नहीं बनाया गया है: कॉलर
  अपना स्वयं का मान दे सकते हैं, इसलिए कोई धीमा अनुरोध बाद में शुरू हुए किसी तेज़ अनुरोध के बाद लिखा जा सकता है,
  और टाइमस्टैम्प कर्सर उसे छोड़ देगा।
- **बैचिंग** — प्रति अनुरोध `batch_size` पंक्तियाँ (डिफ़ॉल्ट 500), प्रति रन
  `max_rows_per_run` पंक्तियाँ (डिफ़ॉल्ट 10000), ताकि बड़ा बैकलॉग किसी एक रन को अवरुद्ध करने के बजाय कई टिक में निकले।
- **डिलीवरी** — कर्सर केवल `send()` के पूरा होने के बाद आगे बढ़ता है। विफल बैच कर्सर को
  उसी स्थान पर छोड़ देता है, इसलिए अगली बार चलने पर उन्हीं पंक्तियों का फिर से प्रयास किया जाता है। गारंटी
  कम-से-कम-एक-बार डिलीवरी और गंतव्य-पक्षीय डुप्लिकेट हटाने की है, वास्तविक ठीक-एक-बार डिलीवरी की नहीं: BigQuery प्रत्येक
  पंक्ति को कॉल-लॉग आईडी के आधार पर कुंजी देता है, जिसका वह अपनी डीडुप्लिकेशन विंडो के भीतर यथासंभव सम्मान करता है।
- **ओवरलैप सुरक्षा** — cron टिक और `POST .../run` एक साथ सक्रिय हो सकते हैं। जो गंतव्य
  पहले से खाली किया जा रहा है, उसे दूसरी बार खाली करने के बजाय छोड़ दिया जाता है (रन परिणाम में `skipped: true`),
  इसलिए कोई समवर्ती रन बैच को दोबारा नहीं भेज सकता या कर्सर को पीछे नहीं लिख सकता।
- **पर्ज रिकवरी** — यदि `cursor_row_id`, `MAX(rowid)` से ऊपर पहुँच जाता है (पूरी तालिका
  पर्ज कर दी गई और rowid फिर से शुरू हुए), तो रनर स्थायी रूप से डेटा न देख पाने के बजाय वापस 0 पर लौट जाता है।

### पेलोड (प्रॉम्प्ट और पूर्णताएँ)

डिफ़ॉल्ट रूप से निर्यात में केवल वे सारांश फ़ील्ड शामिल होते हैं, जिन्हें Logs **सूची** दिखाती है। **प्रॉम्प्ट और प्रतिक्रियाएँ निर्यात करें** (`includeBodies`) चालू करने पर प्रत्येक कॉल के लिए Logs **विवरण**
पेन में दिखाई देने वाली सामग्री भी भेजी जाती है:

| फ़ील्ड                           | इसमें क्या होता है                                             |
| -------------------------------- | -------------------------------------------------------------- |
| `request_body` / `response_body` | कॉल पेलोड, जैसा डैशबोर्ड उन्हें रेंडर करता है                  |
| `pipeline_route_decision`        | राउटर ने कौन-सा लक्ष्य और मॉडल चुना                            |
| `pipeline_client_request`        | मूल अनुरोध, ठीक जैसा क्लाइंट ने भेजा था                        |
| `pipeline_openai_request`        | आंतरिक OpenAI प्रारूप में अनुवाद के बाद                        |
| `pipeline_provider_request`      | जैसा वास्तव में अपस्ट्रीम भेजा गया, प्रोवाइडर की डायलेक्ट में  |
| `pipeline_provider_response`     | मूल अपस्ट्रीम प्रतिक्रिया                                      |
| `pipeline_client_response`       | कॉलर को वापस दिया गया परिणाम                                   |
| `pipeline_error`                 | विफल कॉल के लिए पाइपलाइन-स्तरीय त्रुटि विवरण                   |
| `bodies_truncated`               | जब ऊपर दिया कोई फ़ील्ड `maxBodyBytes` तक पहुँच गया हो, तब True |

यह प्रॉम्प्ट सामग्री है, इसलिए यह **डिफ़ॉल्ट रूप से बंद** है और जानबूझकर प्रत्येक गंतव्य के लिए अलग विकल्प है।
जो भेजा जाता है वही डैशबोर्ड दिखाता है, क्योंकि दोनों `getCallLogById` के माध्यम से पढ़ते हैं: पेलोड लिखे जाते समय
पहले ही PII-सैनिटाइज़ और सीक्रेट-रीडैक्ट किए जाते हैं, और `noLog` API कुंजी से की गई कॉल में
कोई पेलोड संग्रहीत ही नहीं होता, इसलिए निर्यात करने के लिए कुछ नहीं होता।

पेलोड प्रत्येक पंक्ति के लिए फ़ाइलसिस्टम आर्टिफ़ैक्ट से पढ़े जाते हैं, इसलिए हाइड्रेशन केवल उन गंतव्यों के लिए चलता है
जिन्होंने इसका अनुरोध किया है। जिस पंक्ति का आर्टिफ़ैक्ट गायब या दूषित है, उसका सारांश null
पेलोड के साथ निर्यात होता है, न कि बैच को विफल करके कर्सर को अटका देता है।

`maxBodyBytes` (डिफ़ॉल्ट 262144) प्रत्येक फ़ील्ड की सीमा तय करता है। लंबे पेलोड **हटाने के बजाय
छोटे किए जाते हैं** — कटा हुआ प्रॉम्प्ट भी "क्या पूछा गया था" का उत्तर देता है — और पंक्ति को
`bodies_truncated` से चिह्नित किया जाता है। स्ट्रीम किए गए खंड-दर-खंड डेल्टा निर्यात नहीं किए जाते; संयोजित प्रतिक्रिया
पहले से `pipeline_provider_response` और `pipeline_client_response` में होती है।

---

## 2. फ़ाइलें

| घटक                  | स्थान                                        |
| -------------------- | -------------------------------------------- |
| गंतव्य कॉन्ट्रैक्ट   | `src/lib/logExport/types.ts`                 |
| रजिस्ट्री            | `src/lib/logExport/registry.ts`              |
| सीक्रेट प्रबंधन      | `src/lib/logExport/secrets.ts`               |
| रनर (कर्सर लूप)      | `src/lib/logExport/runner.ts`                |
| API प्रोजेक्शन       | `src/lib/logExport/presenter.ts`             |
| BigQuery गंतव्य      | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA प्रमाणीकरण | `src/lib/logExport/googleServiceAccount.ts`  |
| कॉल-लॉग स्रोत        | `src/lib/usage/callLogExportSource.ts`       |
| स्थायित्व            | `src/lib/db/logExportDestinations.ts`        |
| Cron जॉब             | `src/lib/jobs/logExportJob.ts`               |
| REST परत             | `src/app/api/log-export/`                    |
| डैशबोर्ड पेज         | `src/app/(dashboard)/dashboard/log-export/`  |

स्कीमा: `src/lib/db/migrations/170_log_export_destinations.sql`।

---

## 3. REST API

सभी रूट प्रबंधन-प्रमाणीकृत (`requireManagementAuth`) हैं। सीक्रेट कभी लौटाए नहीं जाते:
संग्रहीत सीक्रेट शाब्दिक मान `__stored__` के रूप में वापस आता है, और अपडेट में वही मान वापस
भेजने पर संग्रहीत क्रेडेंशियल यथावत रहता है।

ऐसा गंतव्य बनाना या अपडेट करना, जिसका प्रकार किसी सीक्रेट को घोषित करता है, **`STORAGE_ENCRYPTION_KEY`
की आवश्यकता रखता है**। इसके बिना `encrypt()` बिना किसी सूचना के पासथ्रू करता है, इसलिए क्रेडेंशियल
को SQLite में प्लेनटेक्स्ट के रूप में डालने के बजाय लेखन को 400 के साथ अस्वीकार किया जाता है
(वही सुरक्षा-जाँच जिसे Telegram वेबहुक लागू करता है)।

| विधि     | पथ                                       | उद्देश्य                                          |
| -------- | ---------------------------------------- | ------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | गंतव्य प्रकार + उनकी कॉन्फ़िग फ़ील्ड सूची         |
| `GET`    | `/api/log-export/destinations`           | गंतव्यों की सूची (सीक्रेट संशोधित)                |
| `POST`   | `/api/log-export/destinations`           | गंतव्य बनाएँ                                      |
| `GET`    | `/api/log-export/destinations/{id}`      | एक गंतव्य पढ़ें                                   |
| `PUT`    | `/api/log-export/destinations/{id}`      | नाम / सक्षम स्थिति / कॉन्फ़िग / बैचिंग अपडेट करें |
| `DELETE` | `/api/log-export/destinations/{id}`      | हटाएँ                                             |
| `POST`   | `/api/log-export/destinations/{id}/test` | क्रेडेंशियल जाँचें, कुछ भी न लिखें                |
| `POST`   | `/api/log-export/destinations/{id}/run`  | अभी ड्रेन करें, शेड्यूल किए गए रन वाला ही पथ      |
| `GET`    | `/api/log-export/status`                 | Cron स्थिति, हाल के रन, प्रत्येक लक्ष्य का बैकलॉग |

`GET /api/log-export/types` ही UI को जेनेरिक बनाता है: डैशबोर्ड फ़ॉर्म लौटाए गए फ़ील्ड
डिस्क्रिप्टर से रेंडर होता है, इसलिए नए गंतव्य के लिए UI में कोई बदलाव आवश्यक नहीं है।

---

## 4. BigQuery गंतव्य

कॉन्फ़िग कुंजियाँ (`type: "bigquery"`):

| कुंजी                | टिप्पणियाँ                                                                  |
| -------------------- | --------------------------------------------------------------------------- |
| `projectId`          | डेटासेट रखने वाला GCP प्रोजेक्ट                                             |
| `datasetId`          | `[A-Za-z0-9_]+`                                                             |
| `tableId`            | `[A-Za-z0-9_]+`                                                             |
| `location`           | केवल तब उपयोग होता है जब डेटासेट बनाना हो (डिफ़ॉल्ट `EU`)                   |
| `serviceAccountJson` | सर्विस-अकाउंट कुंजी। सीक्रेट: संग्रहण में एन्क्रिप्टेड, कभी लौटाई नहीं जाती |
| `autoCreate`         | पहले एक्सपोर्ट पर डेटासेट और टेबल बनाएँ (डिफ़ॉल्ट `true`)                   |

सर्विस अकाउंट को लक्ष्य टेबल पर `bigquery.tables.updateData` की आवश्यकता होती है, और
`autoCreate` चालू होने पर `bigquery.datasets.create` / `bigquery.tables.create` की भी।

कॉन्फ़िगर किया गया बैच एक **कर्सर** इकाई है, HTTP इकाई नहीं: `send()` इसे अधिकतम 500 पंक्तियों
वाली insertAll कॉल में विभाजित करता है, इसलिए बड़ा `batch_size` BigQuery की 10 MB अनुरोध सीमा
को पार नहीं कर सकता। अस्थायी स्थितियों (408/429/500/502/503/504) पर समान insertIds का
पुनः उपयोग करते हुए, एक्सपोनेंशियल बैकऑफ़ के साथ अधिकतम तीन बार पुनः प्रयास किया जाता है;
प्रमाणीकरण और स्कीमा विफलताएँ रन को व्यर्थ करने के बजाय पहले ही प्रयास में थ्रो करती हैं।

कुछ ही क्षण पहले बनाई गई टेबल अभी स्ट्रीमिंग एंडपॉइंट को दिखाई नहीं देती, जो कुछ सेकंड तक
404 लौटाता है। उस 404 पर पुनः प्रयास किया जाता है, लेकिन **केवल तभी जब इस रन ने टेबल बनाई हो** —
वास्तव में अनुपस्थित टेबल फिर भी तुरंत विफल होती है। ध्यान दें कि हाल ही में हटाई गई टेबल के
नाम से ही टेबल को दोबारा बनाने पर BigQuery कई मिनट तक स्ट्रीमिंग इंसर्ट अस्वीकार करता है;
यह हटाने-फिर-दोबारा-बनाने की विशेषता है, इसलिए किसी टेबल को हटाकर दोबारा जोड़ने के बजाय नया
टेबल नाम उपयोग करें।

**आंशिक विफलता HTTP 200 के रूप में, गैर-रिक्त `insertErrors[]` के साथ आती है।** इसे विफलता
माना जाता है और यह थ्रो करती है, जिससे कर्सर उन पंक्तियों से आगे नहीं बढ़ता जिन्हें BigQuery
ने कभी स्वीकार नहीं किया; `tests/unit/log-export-bigquery.test.ts` इस व्यवहार को सुनिश्चित
करता है।

ट्रांसपोर्ट सामान्य REST है — स्वयं-हस्ताक्षरित RS256 अभिकथन को
`https://oauth2.googleapis.com/token` पर एक्सेस टोकन के लिए एक्सचेंज किया जाता है, फिर पंक्तियाँ
`tabledata.insertAll` पर जाती हैं। कोई Google SDK शामिल नहीं किया गया है। एक्सेस टोकन प्रत्येक
(सर्विस अकाउंट, स्कोप) के लिए प्रोसेस के भीतर कैश किए जाते हैं।

बनाई गई टेबल में Logs-टैब के प्रत्येक फ़ील्ड के लिए एक कॉलम और `exported_at` होता है, और इसका
लेआउट इस आधार पर तैयार किया गया है कि कॉल लॉग वास्तव में कैसे क्वेरी किए जाते हैं:

- **`timestamp` पर दिन के अनुसार पार्टिशन किया गया**, इसलिए तारीख से सीमित क्वेरी केवल उन्हीं
  दिनों को स्कैन करती है।
- **`api_key_name`, `provider`, `model`, `status` के अनुसार क्लस्टर किया गया** (इसी क्रम में),
  इसलिए इसे किसने चलाया, यह कहाँ गया, या यह विफल हुआ या नहीं—इनके आधार पर फ़िल्टर करने पर
  प्रत्येक पार्टिशन के भीतर ब्लॉक छँट जाते हैं। BigQuery अधिकतम चार क्लस्टरिंग कॉलम की अनुमति
  देता है और क्रम मायने रखता है: केवल `api_key_name` पर फ़िल्टर छँटाई करता है, केवल `status`
  पर फ़िल्टर ऐसा नहीं करता।
- **`partitionExpirationDays` के माध्यम से वैकल्पिक पार्टिशन अवधारण** (`0` सब कुछ रखता है),
  जिसे टेबल बनाए जाने पर लागू किया जाता है।

दोनों सेटिंग्स निर्माण के समय लागू होती हैं। कोई मौजूदा टेबल अपना वर्तमान लेआउट बनाए रखती है, इसलिए
यदि आप इन्हें अपनाना चाहते हैं, तो गंतव्य को किसी नए टेबल id पर इंगित करें।

`tests/unit/log-export-bigquery.test.ts` यह सुनिश्चित करता है कि मैपर और टेबल स्कीमा एक-दूसरे के साथ
तालमेल में रहें, ताकि किसी नए कॉल-लॉग कॉलम को निर्यात के दौरान चुपचाप हटाया न जा सके।

बैच को पंक्तियों की संख्या और क्रमबद्ध बाइट्स, **दोनों** के आधार पर खंडों में बाँटा जाता है। पेलोड निर्यात
होने पर केवल पंक्तियों की संख्या पर्याप्त नहीं होती: प्रॉम्प्ट वाली 500 पंक्तियाँ कई दसियों मेगाबाइट की हो सकती हैं, और insertAll
10 MB से अधिक के अनुरोध को अस्वीकार कर देता है। कोई खंड 500 पंक्तियों या 9 MB पर बंद हो जाता है, इनमें से जो भी पहले हो।

---

## 5. डेस्टिनेशन जोड़ना

1. `LogExportDestinationType` निर्यात करने वाली `src/lib/logExport/destinations/<name>.ts` फ़ाइल बनाएँ:
   UI के लिए एक Zod `configSchema`, एक `fields` डिस्क्रिप्टर ऐरे, `secretFields`, और
   `test()` / `prepare()` / `send(records)` लौटाने वाला `createClient(config)`।
2. इसे `src/lib/logExport/registry.ts` में `DESTINATIONS` ऐरे में जोड़ें।
3. `tests/unit/` के अंतर्गत टेस्ट लिखें।

बस इतना ही बदलाव करना है: परसिस्टेंस, cron जॉब, REST लेयर, सीक्रेट एन्क्रिप्शन और
डैशबोर्ड फ़ॉर्म—सभी रजिस्ट्री को पढ़ते हैं।

नए डेस्टिनेशन के लिए दो नियम:

- आंशिक विफलता पर `send()` को **अनिवार्य रूप से थ्रो करना चाहिए**। रिज़ॉल्व होने का अर्थ है, "डेस्टिनेशन में ये पंक्तियाँ मौजूद हैं",
  और कर्सर स्थायी रूप से उनसे आगे बढ़ जाता है।
- उपयोगकर्ता द्वारा दिया गया URL लेने वाले डेस्टिनेशन को फ़ेच करने से पहले
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) के माध्यम से उसे वैलिडेट करना होगा,
  ठीक उसी तरह जैसे वेबहुक करते हैं। BigQuery को इसकी आवश्यकता नहीं है: इसके होस्ट स्थिर हैं।

---

## 6. इसे संचालित करना

- **डैशबोर्ड**: Integrations → Log export। कोई डेस्टिनेशन जोड़ें, पंक्तियाँ लिखे बिना क्रेडेंशियल जाँचने के लिए **Test** चलाएँ,
  फिर उसे सक्षम करें।
- **बैकलॉग**: प्रत्येक डेस्टिनेशन कार्ड लंबित पंक्तियाँ और कर्सर दिखाता है; `GET
/api/log-export/status` वही आँकड़े और अंतिम 20 जॉब रन लौटाता है।
- **किसी एक डेस्टिनेशन की विफलता से अन्य विफल नहीं होते** — रन सारांश `last_status` / `last_error` में प्रत्येक डेस्टिनेशन की
  स्थिति दर्ज करता है, और जॉब रन इतिहास समग्र परिणाम बनाए रखता है।
- **डेस्टिनेशन हटाने से उसका कर्सर भी हट जाता है।** उसे दोबारा जोड़ने पर प्रक्रिया सबसे पुराने उपलब्ध
  कॉल लॉग से शुरू होती है, जिससे वे पंक्तियाँ फिर से भेजी जाती हैं जो डेस्टिनेशन में पहले से मौजूद हो सकती हैं। BigQuery में प्रति-पंक्ति
  `insertId` इसे केवल BigQuery की अपनी डी-डुप्लिकेशन अवधि के भीतर ही संभालता है, इसलिए किसी डेस्टिनेशन को हटाने के बजाय
  उसे अक्षम करना बेहतर है।
