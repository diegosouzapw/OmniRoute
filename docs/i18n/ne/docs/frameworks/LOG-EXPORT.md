# Log export (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute कल लगहरूलाई बाह्य एनालिटिक्स भण्डारमा निरन्तर, क्रमिक रूपमा निर्यात गर्ने।

Logs ड्यासबोर्ड ट्याबले अनुरोध इतिहास SQLite (`call_logs`) मा राख्छ, जुन
रोटेसन र रिटेन्सनद्वारा सीमित हुन्छ। लग निर्यातले उही रेकर्ड सेटलाई तालिकाअनुसार बाहिर पठाउँछ, ताकि यो
स्थानीय डेटाबेसभन्दा लामो समयसम्म कायम रहन र अन्य डेटासँग जोडिन सकोस्। BigQuery पहिलो गन्तव्य हो;
पाइपलाइन एउटा रजिस्ट्री भएकाले थप गन्तव्यहरू सजिलै थप्न सकिन्छ।

---

## 1. यसले कसरी काम गर्छ

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (Logs ट्याबको फिल्ड सेट)
      → गन्तव्य client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **तालिका** — एउटा `JobRegistry` cron कार्य, `log_export`, जसको पूर्वनिर्धारित मान `0 * * * *` (हरेक घण्टा,
  UTC) हो। `src/lib/initCloudSync.ts` मा दर्ता गरिएको; `OMNIROUTE_LOG_EXPORT_CRON` मार्फत परिवर्तन गर्न सकिन्छ।
  प्रत्येक टिकले हरेक **सक्षम गरिएको** गन्तव्यलाई क्रमिक रूपमा पूर्ण रूपमा प्रशोधन गर्छ।
- **कर्सर** — SQLite को अन्तर्निहित `call_logs.rowid`, प्रत्येक गन्तव्यका लागि
  `log_export_destinations.cursor_row_id` मा कायम राखिन्छ। `timestamp` लाई जानाजानी कर्सर बनाइएको छैन:
  कल गर्ने पक्षले यसको आफ्नै मान दिन सक्छ, त्यसैले ढिलो अनुरोध आफूभन्दा पछि सुरु भएको छिटो अनुरोधपछि लेखिन सक्छ,
  र टाइमस्ट्याम्प कर्सरले त्यसलाई छुटाउनेछ।
- **ब्याचिङ** — प्रति अनुरोध `batch_size` पङ्क्तिहरू (पूर्वनिर्धारित 500), प्रति रन
  `max_rows_per_run` पङ्क्तिहरू (पूर्वनिर्धारित 10000), ताकि ठूलो ब्याकलग एउटै रनलाई अवरुद्ध गर्नुको सट्टा
  धेरै टिकहरूमा प्रशोधन होस्।
- **डेलिभरी** — `send()` पूरा भएपछि मात्र कर्सर अगाडि बढ्छ। असफल ब्याचले
  कर्सरलाई जहाँ थियो त्यहीँ छोड्छ, त्यसैले उही पङ्क्तिहरू अर्को रनमा पुनः प्रयास गरिन्छ। प्रत्याभूति
  कम्तीमा-एक-पटक डेलिभरी र गन्तव्य-पक्षीय डि-डुप्लिकेसनको हो, वास्तविक ठ्याक्कै-एक-पटकको होइन: BigQuery ले प्रत्येक
  पङ्क्तिलाई कल-लग id द्वारा कुञ्जीबद्ध गर्छ, जसलाई यसले आफ्नै डि-डुप विन्डोभित्र सम्भव भएसम्म पालना गर्छ।
- **ओभरल्याप सुरक्षा** — cron टिक र `POST .../run` एकैसाथ चल्न सक्छन्। पहिले नै
  प्रशोधन भइरहेको गन्तव्यलाई दुईपटक प्रशोधन गर्नुको सट्टा छोडिन्छ (रन परिणाममा `skipped: true`),
  त्यसैले समवर्ती रनले कुनै ब्याच पुनः पठाउन वा कर्सरलाई पछाडि लेख्न सक्दैन।
- **पर्ज रिकभरी** — यदि `cursor_row_id`, `MAX(rowid)` भन्दा माथि पुग्यो भने (पूरै तालिका
  पर्ज गरियो र rowids पुनः सुरु भए), रनरले स्थायी रूपमा अनभिज्ञ रहनुको सट्टा 0 मा फर्काउँछ।

### पेलोडहरू (प्रम्प्ट र कम्प्लिसनहरू)

पूर्वनिर्धारित रूपमा निर्यातले Logs **सूची** मा देखिने सारांश फिल्डहरू मात्र समावेश गर्छ। **प्रम्प्ट र प्रतिक्रियाहरू निर्यात गर्नुहोस्** (`includeBodies`)
सक्रिय गर्दा प्रत्येक कलका लागि Logs **विवरण** प्यानमा देखिने सामग्री पनि पठाइन्छ:

| Field                            | यसमा के हुन्छ                                                   |
| -------------------------------- | --------------------------------------------------------------- |
| `request_body` / `response_body` | ड्यासबोर्डले रेन्डर गरेअनुसारका कल पेलोडहरू                     |
| `pipeline_route_decision`        | राउटरले रोजेको टार्गेट र मोडेल                                  |
| `pipeline_client_request`        | क्लाइन्टले ठ्याक्कै पठाएअनुसारको कच्चा अनुरोध                   |
| `pipeline_openai_request`        | आन्तरिक OpenAI स्वरूपमा अनुवाद गरेपछिको अनुरोध                  |
| `pipeline_provider_request`      | प्रदायकको डायलेक्टमा, अपस्ट्रिममा वास्तवमै पठाइएअनुसारको अनुरोध |
| `pipeline_provider_response`     | कच्चा अपस्ट्रिम प्रतिक्रिया                                     |
| `pipeline_client_response`       | कल गर्ने पक्षलाई फिर्ता दिइएको सामग्री                          |
| `pipeline_error`                 | असफल कलको पाइपलाइन-स्तरीय त्रुटि विवरण                          |
| `bodies_truncated`               | माथिका कुनै फिल्ड `maxBodyBytes` सीमामा पुगेमा True             |

यो प्रम्प्ट सामग्री भएकाले, यो **पूर्वनिर्धारित रूपमा बन्द** हुन्छ र जानाजानी प्रत्येक गन्तव्यअनुसार छनोट गर्न मिल्छ।
पठाइने सामग्री ड्यासबोर्डले देखाउने सामग्री नै हो, किनभने दुवैले `getCallLogById` मार्फत पढ्छन्: पेलोडहरू
लेखिँदा नै PII-स्यानिटाइज र गोप्य सामग्री हटाइएका हुन्छन्, र
`noLog` API कुञ्जी प्रयोग गरी गरिएको कलले कुनै पेलोड नै भण्डारण गर्दैन, त्यसैले निर्यात गर्न केही हुँदैन।

पेलोडहरू फाइलसिस्टम आर्टिफ्याक्टबाट प्रत्येक पङ्क्तिअनुसार पढिन्छन्, त्यसैले हाइड्रेसन यसको अनुरोध गरेका गन्तव्यहरूका लागि मात्र
चल्छ। आर्टिफ्याक्ट हराएको वा बिग्रिएको पङ्क्तिले ब्याच असफल बनाएर कर्सरलाई अड्काउनुको सट्टा null
पेलोडहरूसहित आफ्नो सारांश निर्यात गर्छ।

`maxBodyBytes` (पूर्वनिर्धारित 262144) ले प्रत्येक फिल्डको सीमा तोक्छ। अझ लामा पेलोडहरू **हटाइनुको सट्टा
छोट्याइन्छन्** — काटिएको प्रम्प्टले अझै पनि "के सोधिएको थियो" भन्ने उत्तर दिन्छ — र पङ्क्तिलाई
`bodies_truncated` द्वारा चिन्ह लगाइन्छ। स्ट्रिम गरिएका खण्ड-खण्ड डेल्टाहरू निर्यात गरिँदैनन्; संयोजित प्रतिक्रिया
पहिल्यै `pipeline_provider_response` र `pipeline_client_response` मा हुन्छ।

---

## 2. फाइलहरू

| अंश                    | स्थान                                        |
| ---------------------- | -------------------------------------------- |
| गन्तव्य कन्ट्र्याक्ट   | `src/lib/logExport/types.ts`                 |
| रजिस्ट्री              | `src/lib/logExport/registry.ts`              |
| गोप्य विवरण ह्यान्डलिङ | `src/lib/logExport/secrets.ts`               |
| रनर (कर्सर लूप)        | `src/lib/logExport/runner.ts`                |
| API प्रोजेक्सन         | `src/lib/logExport/presenter.ts`             |
| BigQuery गन्तव्य       | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA प्रमाणीकरण   | `src/lib/logExport/googleServiceAccount.ts`  |
| कल-लग स्रोत            | `src/lib/usage/callLogExportSource.ts`       |
| स्थायी भण्डारण         | `src/lib/db/logExportDestinations.ts`        |
| Cron कार्य             | `src/lib/jobs/logExportJob.ts`               |
| REST तह                | `src/app/api/log-export/`                    |
| ड्यासबोर्ड पृष्ठ       | `src/app/(dashboard)/dashboard/log-export/`  |

स्किमा: `src/lib/db/migrations/170_log_export_destinations.sql`।

---

## 3. REST API

सबै रुटहरू व्यवस्थापन-प्रमाणीकृत (`requireManagementAuth`) छन्। गोप्य विवरणहरू कहिल्यै फर्काइँदैनन्:
भण्डारण गरिएको गोप्य विवरण लिटरल `__stored__` का रूपमा फर्किन्छ, र अद्यावधिक गर्दा त्यही मान फिर्ता पठाएमा
भण्डारण गरिएको क्रेडेन्सियल यथावत् रहन्छ।

गोप्य विवरण घोषणा गर्ने प्रकारको गन्तव्य सिर्जना वा अद्यावधिक गर्न **`STORAGE_ENCRYPTION_KEY`
आवश्यक हुन्छ**। यो नभएमा `encrypt()` ले कुनै परिवर्तन नगरी चुपचाप मान पारित गर्छ, त्यसैले क्रेडेन्सियललाई
SQLite मा प्लेनटेक्स्टका रूपमा राख्नुको सट्टा लेखनलाई 400 सहित अस्वीकार गरिन्छ (Telegram webhook ले
प्रयोग गर्ने समान सुरक्षा-जाँच)।

| विधि     | पथ                                       | उद्देश्य                                              |
| -------- | ---------------------------------------- | ----------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | गन्तव्यका प्रकारहरू + तिनका कन्फिग फिल्डहरूको सूची    |
| `GET`    | `/api/log-export/destinations`           | गन्तव्यहरू सूचीबद्ध गर्ने (गोप्य विवरण लुकाइएका)      |
| `POST`   | `/api/log-export/destinations`           | गन्तव्य सिर्जना गर्ने                                 |
| `GET`    | `/api/log-export/destinations/{id}`      | एउटा गन्तव्य पढ्ने                                    |
| `PUT`    | `/api/log-export/destinations/{id}`      | नाम / सक्षम स्थिति / कन्फिग / ब्याचिङ अद्यावधिक गर्ने |
| `DELETE` | `/api/log-export/destinations/{id}`      | मेटाउने                                               |
| `POST`   | `/api/log-export/destinations/{id}/test` | क्रेडेन्सियल जाँच्ने, केही नलेख्ने                    |
| `POST`   | `/api/log-export/destinations/{id}/run`  | अहिले नै निकासी गर्ने, निर्धारित रनकै समान पथ         |
| `GET`    | `/api/log-export/status`                 | Cron स्थिति, हालैका रनहरू, प्रत्येक लक्ष्यको ब्याकलग  |

`GET /api/log-export/types` ले नै UI लाई जेनेरिक बनाउँछ: ड्यासबोर्ड फारम फर्काइएका
फिल्ड डिस्क्रिप्टरहरूबाट रेन्डर गरिन्छ, त्यसैले नयाँ गन्तव्यका लागि UI परिवर्तन आवश्यक पर्दैन।

---

## 4. BigQuery गन्तव्य

कन्फिग कुञ्जीहरू (`type: "bigquery"`):

| कुञ्जी               | टिप्पणी                                                                             |
| -------------------- | ----------------------------------------------------------------------------------- |
| `projectId`          | डेटासेट रहेको GCP प्रोजेक्ट                                                         |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                     |
| `tableId`            | `[A-Za-z0-9_]+`                                                                     |
| `location`           | डेटासेट सिर्जना गर्नुपर्ने अवस्थामा मात्र प्रयोग हुन्छ (पूर्वनिर्धारित `EU`)        |
| `serviceAccountJson` | सर्भिस-अकाउन्ट कुञ्जी। गोप्य: भण्डारण अवस्थामा इन्क्रिप्ट गरिएको, कहिल्यै नफर्काइने |
| `autoCreate`         | पहिलो निर्यातमा डेटासेट र टेबल सिर्जना गर्ने (पूर्वनिर्धारित `true`)                |

सर्भिस अकाउन्टलाई लक्षित टेबलमा `bigquery.tables.updateData` आवश्यक हुन्छ, साथै
`autoCreate` सक्रिय हुँदा `bigquery.datasets.create` / `bigquery.tables.create` पनि आवश्यक हुन्छ।

कन्फिगर गरिएको ब्याच HTTP एकाइ नभई **कर्सर** एकाइ हो: `send()` ले यसलाई बढीमा 500 पङ्क्तिका
insertAll कलहरूमा विभाजन गर्छ, त्यसैले ठूलो `batch_size` ले BigQuery को 10 MB अनुरोध सीमा नाघ्न
सक्दैन। अस्थायी स्थितिहरू (408/429/500/502/503/504) मा समान insertIds पुनः प्रयोग गर्दै
एक्सपोनेन्सियल ब्याकअफसहित बढीमा तीन पटक पुनः प्रयास गरिन्छ; प्रमाणीकरण र स्किमा विफलताहरूले रन
व्यर्थमा खर्च गर्नुको सट्टा पहिलो प्रयासमै त्रुटि फ्याँक्छन्।

केही क्षणअघि सिर्जना गरिएको टेबल स्ट्रिमिङ एन्डपोइन्टमा अझै देखिँदैन, जसले केही सेकेन्डसम्म
404 उत्तर दिन्छ। उक्त 404 मा पुनः प्रयास गरिन्छ, तर **यो रनले टेबल सिर्जना गरेको अवस्थामा मात्र** —
वास्तवमै हराएको टेबल भने तुरुन्तै विफल हुन्छ। ध्यान दिनुहोस्, हालै मेटाइएको नामअन्तर्गत टेबल पुनः
सिर्जना गर्दा BigQuery ले केही मिनेटसम्म स्ट्रिमिङ इन्सर्टहरू अस्वीकार गर्छ; यो मेटाएर-पुनः-सिर्जना
गर्ने प्रक्रियाको गुण हो, त्यसैले टेबल हटाएर पुनः थप्नुको सट्टा नयाँ टेबल नाम प्रयोग गर्नुहोस्।

**आंशिक विफलता HTTP 200 सँगै खाली नभएको `insertErrors[]` का रूपमा आउँछ।** यसलाई विफलता मानिन्छ
र त्रुटि फ्याँकिन्छ, जसले BigQuery ले कहिल्यै स्वीकार नगरेका पङ्क्तिहरूभन्दा अगाडि कर्सर बढ्न रोक्छ;
`tests/unit/log-export-bigquery.test.ts` ले यो व्यवहार सुनिश्चित गर्छ।

ट्रान्सपोर्ट साधारण REST हो — स्व-हस्ताक्षरित RS256 assertion लाई
`https://oauth2.googleapis.com/token` मा access token सँग साटिन्छ, त्यसपछि पङ्क्तिहरू
`tabledata.insertAll` मा जान्छन्। कुनै Google SDK समावेश गरिएको छैन। Access token हरू प्रत्येक
(service account, scope) का लागि प्रक्रियाभित्र क्यास गरिन्छन्।

सिर्जना गरिएको टेबलमा Logs-tab का प्रत्येक फिल्डका लागि एउटा स्तम्भ र थप `exported_at` हुन्छ, र
कल लगहरूलाई वास्तवमा कसरी क्वेरी गरिन्छ भन्नेअनुसार यसको संरचना बनाइएको छ:

- **`timestamp` का आधारमा दिनगत विभाजन गरिएको**, जसले गर्दा मितिद्वारा सीमित क्वेरीले ती दिनहरू मात्र स्क्यान गर्छ।
- **`api_key_name`, `provider`, `model`, `status` अनुसार क्लस्टर गरिएको** (यही क्रममा), जसले गर्दा
  कसले चलायो, कहाँ गयो, वा विफल भयो कि भएन भन्ने आधारमा फिल्टर गर्दा प्रत्येक पार्टिसनभित्रका ब्लकहरू
  छाँटिन्छन्। BigQuery ले बढीमा चारवटा क्लस्टरिङ स्तम्भ अनुमति दिन्छ र क्रम महत्त्वपूर्ण हुन्छ:
  `api_key_name` मात्रको फिल्टरले छाँट्छ, तर `status` मात्रको फिल्टरले छाँट्दैन।
- **`partitionExpirationDays` मार्फत वैकल्पिक पार्टिसन अवधारण** (0 ले सबै राख्छ), जुन टेबल सिर्जना
  गर्दा लागू गरिन्छ।

दुवै सेटिङ सिर्जना गर्ने समयमा लागू हुन्छन्। अवस्थित तालिकाले आफूसँग भएको लेआउट नै कायम राख्छ, त्यसैले
तिनलाई अपनाउन चाहनुहुन्छ भने गन्तव्यलाई नयाँ table id तर्फ देखाउनुहोस्।

`tests/unit/log-export-bigquery.test.ts` ले mapper र तालिका schema एकअर्कासँग
पूर्ण रूपमा समक्रमित रहेको सुनिश्चित गर्छ, त्यसैले नयाँ call-log स्तम्भ बाहिर पठाउने क्रममा चुपचाप हट्न सक्दैन।

ब्याचहरूलाई **दुवै** पङ्क्ति सङ्ख्या र serialised bytes का आधारमा खण्डित गरिन्छ। payloads निर्यात भएपछि
पङ्क्ति सङ्ख्या मात्र पर्याप्त हुँदैन: prompts भएका 500 पङ्क्तिहरू दसौँ megabytes का हुन सक्छन्, र insertAll ले
10 MB भन्दा ठूलो अनुरोध अस्वीकार गर्छ। जुन पहिले पुग्छ, त्यसअनुसार खण्डहरू 500 पङ्क्ति वा 9 MB मा बन्द हुन्छन्।

---

## ५. गन्तव्य थप्ने

1. `LogExportDestinationType` export गर्ने `src/lib/logExport/destinations/<name>.ts` सिर्जना गर्नुहोस्:
   एउटा Zod `configSchema`, UI का लागि `fields` वर्णनकर्ता array, `secretFields`, र
   `test()` / `prepare()` / `send(records)` फर्काउने `createClient(config)`।
2. यसलाई `src/lib/logExport/registry.ts` को `DESTINATIONS` array मा थप्नुहोस्।
3. `tests/unit/` अन्तर्गत परीक्षणहरू लेख्नुहोस्।

परिवर्तन यति नै हो: persistence, cron job, REST layer, secret encryption र
dashboard form सबैले registry पढ्छन्।

नयाँ गन्तव्यका लागि दुई नियम:

- आंशिक विफलतामा `send()` ले **अनिवार्य रूपमा throw गर्नुपर्छ**। Resolve हुनुको अर्थ "गन्तव्यमा यी rows छन्" भन्ने हो,
  र cursor स्थायी रूपमा तिनलाई पार गरेर अगाडि बढ्छ।
- प्रयोगकर्ताले उपलब्ध गराएको URL लिने गन्तव्यले fetch गर्नुअघि त्यसलाई
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) मार्फत validate गर्नुपर्छ,
  ठीक webhooks ले गरेजस्तै। BigQuery लाई यो आवश्यक पर्दैन: यसका hosts constants हुन्।

---

## ६. यसलाई सञ्चालन गर्ने

- **Dashboard**: Integrations → Log export। एउटा गन्तव्य थप्नुहोस्, rows नलेखी credentials जाँच्न
  **Test** चलाउनुहोस्, त्यसपछि यसलाई enable गर्नुहोस्।
- **Backlog**: प्रत्येक गन्तव्य card ले pending rows र cursor देखाउँछ; `GET
/api/log-export/status` ले उही तथ्याङ्कका साथै पछिल्ला २० job runs फर्काउँछ।
- **एउटा गन्तव्य विफल हुँदा अरू विफल हुँदैनन्** — run summary ले प्रत्येक गन्तव्यको
  status `last_status` / `last_error` मा record गर्छ, र job run history ले aggregate राख्छ।
- **गन्तव्य मेटाउँदा त्यसको cursor पनि मेटिन्छ।** यसलाई पुनः थप्दा सबैभन्दा पुरानो retained
  call log बाट सुरु हुन्छ, जसले गन्तव्यमा पहिले नै हुन सक्ने rows पुनः पठाउँछ। BigQuery मा प्रत्येक row को
  `insertId` ले यसलाई BigQuery कै de-duplication window भित्र मात्र सम्हाल्छ, त्यसैले गन्तव्य मेटाउनुभन्दा
  disable गर्नु उपयुक्त हुन्छ।
