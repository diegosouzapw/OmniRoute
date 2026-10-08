# Log export (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

የOmniRoute ጥሪ ምዝግቦችን ወደ ውጫዊ የትንታኔ ማከማቻ በተከታታይ እና በየደረጃው መላክ።

የLogs ዳሽቦርድ ትር የጥያቄ ታሪክን በSQLite (`call_logs`) ውስጥ ያስቀምጣል፤ ይህም
በማዞር እና በማቆያ ፖሊሲ የተገደበ ነው። የምዝግብ መላክ ተመሳሳዩን የመዝገብ ስብስብ በጊዜ ሰሌዳ መሠረት
ወደ ውጭ ይልካል፤ በዚህም ከአካባቢያዊው የውሂብ ጎታ በላይ ለረጅም ጊዜ እንዲቆይ እና ከሌሎች ውሂቦች ጋር እንዲጣመር ያደርጋል። BigQuery የመጀመሪያው መድረሻ ነው፤
የማስኬጃ መስመሩ መዝገብ ቤት ስለሆነ፣ ተጨማሪ መድረሻዎችን መጨመር ይቻላል።

---

## 1. እንዴት እንደሚሠራ

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (የLogs ትር የመስኮች ስብስብ)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **የጊዜ ሰሌዳ** — አንድ `JobRegistry` cron ሥራ፣ `log_export`፣ ነባሪው `0 * * * *` (በየሰዓቱ፣
  UTC) ነው። በ`src/lib/initCloudSync.ts` ውስጥ ይመዘገባል፤ በ`OMNIROUTE_LOG_EXPORT_CRON` ሊቀየር ይችላል።
  እያንዳንዱ ዙር ሁሉንም **የነቁ** መድረሻዎች በቅደም ተከተል ሙሉ በሙሉ ያስኬዳል።
- **ጠቋሚ** — የSQLite ስውር `call_logs.rowid`፣ ለእያንዳንዱ መድረሻ በ
  `log_export_destinations.cursor_row_id` ውስጥ ዘላቂ ሆኖ ይቀመጣል። `timestamp` ሆን ተብሎ እንደ ጠቋሚ አይጠቀምም፦ ጠሪዎች
  የራሳቸውን እሴት ሊያቀርቡ ስለሚችሉ፣ ዘገምተኛ ጥያቄ ከእሱ በኋላ ከተጀመረ ፈጣን ጥያቄ በኋላ
  ሊጻፍ ይችላል፤ በጊዜ ማህተም ላይ የተመሠረተ ጠቋሚም ይህን ይዘለዋል።
- **በጥቅል ማስኬድ** — በእያንዳንዱ ጥያቄ `batch_size` ረድፎች (ነባሪ 500)፣ በእያንዳንዱ ዙር
  `max_rows_per_run` ረድፎች (ነባሪ 10000) ይስተናገዳሉ፤ በዚህም ትልቅ የተጠራቀመ ሥራ አንድን ዙር ከማገድ ይልቅ በበርካታ ዙሮች ውስጥ ይጠናቀቃል።
- **ማድረስ** — ጠቋሚው የሚራመደው `send()` በተሳካ ሁኔታ ከተጠናቀቀ በኋላ ብቻ ነው። ያልተሳካ ጥቅል
  ጠቋሚውን ባለበት ይተወዋል፤ ስለዚህ ተመሳሳይ ረድፎች በሚቀጥለው ዙር እንደገና ይሞከራሉ። የሚሰጠው ዋስትና
  ቢያንስ-አንድ-ጊዜ ማድረስ ከመድረሻ-ወገን የተባዙ መዝገቦችን ማስወገድ ጋር እንጂ እውነተኛ በትክክል-አንድ-ጊዜ ማድረስ አይደለም፦ BigQuery እያንዳንዱን
  ረድፍ በጥሪ ምዝግቡ id ይመድባል፤ ይህንንም በራሱ የተባዙ መዝገቦችን ማስወገጃ የጊዜ መስኮት ውስጥ በሚቻለው መጠን ያከብራል።
- **የመደራረብ መከላከያ** — የcron ዙሩ እና `POST .../run` በአንድ ጊዜ ሊነሱ ይችላሉ። አስቀድሞ
  እየተስተናገደ ያለ መድረሻ ሁለት ጊዜ ከመስተናገድ ይልቅ ይዘለላል (በዙሩ ውጤት ውስጥ `skipped: true`)፤
  ስለዚህ በአንድ ጊዜ የሚካሄድ ዙር ጥቅልን እንደገና መላክ ወይም ጠቋሚውን ወደኋላ መጻፍ አይችልም።
- **ከማጽዳት ማገገም** — `cursor_row_id` ከ`MAX(rowid)` በላይ ከሆነ (ሙሉው ሰንጠረዥ
  ተጠርጎ እና rowids እንደገና ከጀመሩ)፣ አስኬጁ በቋሚነት ውሂቡን ማየት እንዳይሳነው ወደ 0 ይመለሳል።

### የሚላኩ ይዘቶች (ጥያቄዎች እና ምላሾች)

በነባሪነት የሚላከው ውሂብ የLogs **ዝርዝር** የሚያሳያቸውን የማጠቃለያ መስኮች ብቻ ይይዛል።
**ጥያቄዎችን እና ምላሾችን ላክ** (`includeBodies`)ን ማብራት፣ የLogs **ዝርዝር መረጃ**
ፓነል ለእያንዳንዱ ጥሪ የሚያሳየውን ይዘት በተጨማሪ ይልካል፦

| መስክ                              | የሚይዘው ነገር                                         |
| -------------------------------- | ------------------------------------------------- |
| `request_body` / `response_body` | ዳሽቦርዱ በሚያሳያቸው መልኩ የጥሪው ይዘቶች                       |
| `pipeline_route_decision`        | ራውተሩ የመረጠው ዒላማ እና ሞዴል                             |
| `pipeline_client_request`        | ደንበኛው በላከው ትክክለኛ መልክ ያለው ጥሬ ጥያቄ                   |
| `pipeline_openai_request`        | ወደ ውስጣዊው የOpenAI ቅርጽ ከተተረጎመ በኋላ                   |
| `pipeline_provider_request`      | በአቅራቢው ዘዬ፣ በትክክል ወደ ላይኛው አገልግሎት እንደተላከው           |
| `pipeline_provider_response`     | ከላይኛው አገልግሎት የተገኘው ጥሬ ምላሽ                         |
| `pipeline_client_response`       | ወደ ጠሪው የተመለሰው ይዘት                                 |
| `pipeline_error`                 | ላልተሳካ ጥሪ የማስኬጃ መስመር-ደረጃ የስህተት ዝርዝር                |
| `bodies_truncated`               | ከላይ ካሉት መስኮች አንዱ `maxBodyBytes` ላይ ሲደርስ እውነት ይሆናል |

ይህ የጥያቄ ይዘት ስለሆነ፣ በነባሪነት **ጠፍቶ ነው**፤ ሆን ተብሎም ለእያንዳንዱ መድረሻ በተናጠል የሚመረጥ ነው።
የሚላከው ዳሽቦርዱ የሚያሳየው ነው፤ ምክንያቱም ሁለቱም በ`getCallLogById` በኩል ያነባሉ፦ ይዘቶች
ሲጻፉ አስቀድመው PII ተወግዶላቸዋል እና ሚስጥሮች ተሸፍነውባቸዋል፤ እንዲሁም
`noLog` API ቁልፍን በመጠቀም የተደረገ ጥሪ ምንም ይዘት አያከማችም፣ ስለዚህ የሚላክ ምንም ነገር የለም።

ይዘቶች ከፋይል ስርዓቱ አርቲፋክት በየረድፉ ይነበባሉ፤ ስለዚህ ሙሉ መረጃውን የመጫን ሂደት የሚከናወነው
ይህን ለጠየቁ መድረሻዎች ብቻ ነው። አርቲፋክቱ የጠፋ ወይም የተበላሸ ረድፍ፣
ጥቅሉን ከማሳካት እና ጠቋሚውን ከማስቆም ይልቅ፣ ማጠቃለያውን ከnull ይዘቶች ጋር ይልካል።

`maxBodyBytes` (ነባሪ 262144) ለእያንዳንዱ መስክ ከፍተኛ ገደብ ያስቀምጣል። ረዘም ያሉ ይዘቶች
ከመጣል ይልቅ **ይቆረጣሉ** — የተቆረጠ ጥያቄም ቢሆን “ምን ተጠየቀ” የሚለውን ይመልሳል — እና ረድፉ
በ`bodies_truncated` ምልክት ይደረግበታል። በዥረት የተላኩ ክፍል-በክፍል ልዩነቶች አይላኩም፤ የተገጣጠመው ምላሽ
አስቀድሞ በ`pipeline_provider_response` እና `pipeline_client_response` ውስጥ ይገኛል።

---

## 2. ፋይሎች

| ክፍል             | መገኛ                                          |
| --------------- | -------------------------------------------- |
| መድረሻ ኮንትራት      | `src/lib/logExport/types.ts`                 |
| መዝገብ            | `src/lib/logExport/registry.ts`              |
| የሚስጥር አያያዝ      | `src/lib/logExport/secrets.ts`               |
| አስኬጅ (የጠቋሚ ዙር)  | `src/lib/logExport/runner.ts`                |
| የAPI ውክልና       | `src/lib/logExport/presenter.ts`             |
| BigQuery መድረሻ   | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA ማረጋገጫ | `src/lib/logExport/googleServiceAccount.ts`  |
| የጥሪ ሎግ ምንጭ      | `src/lib/usage/callLogExportSource.ts`       |
| ቋሚ ማከማቻ         | `src/lib/db/logExportDestinations.ts`        |
| Cron ሥራ         | `src/lib/jobs/logExportJob.ts`               |
| REST ንብርብር      | `src/app/api/log-export/`                    |
| የዳሽቦርድ ገጽ       | `src/app/(dashboard)/dashboard/log-export/`  |

መርሐግብር፦ `src/lib/db/migrations/170_log_export_destinations.sql`።

---

## 3. REST API

ሁሉም መስመሮች በአስተዳደር ማረጋገጫ (`requireManagementAuth`) የተጠበቁ ናቸው። ሚስጥሮች ፈጽሞ አይመለሱም፦
የተከማቸ ሚስጥር እንደ ቃል በቃል `__stored__` ይመለሳል፤ በማዘመን ጊዜ ያንን እሴት መልሶ መላክ
የተከማቸውን ማረጋገጫ መረጃ እንዳለ ያቆየዋል።

ዓይነቱ ሚስጥር እንዳለው የሚገልጽ መድረሻን መፍጠር ወይም ማዘመን **`STORAGE_ENCRYPTION_KEY`
ያስፈልገዋል**። ያለዚህ `encrypt()` ምንም ሳይለውጥ በዝምታ ያሳልፋል፤ ስለዚህ የማረጋገጫ መረጃን
በSQLite ውስጥ እንደ ግልጽ ጽሑፍ ከማስቀመጥ ይልቅ ጽሑፉ በ400 ውድቅ ይደረጋል (ይህም የTelegram
webhook የሚተገብረው ተመሳሳይ መከላከያ ነው)።

| ዘዴ       | መንገድ                                     | ዓላማ                                               |
| -------- | ---------------------------------------- | ------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | የመድረሻ ዓይነቶች + የውቅር መስኮቻቸው ዝርዝር                    |
| `GET`    | `/api/log-export/destinations`           | መድረሻዎችን ይዘርዝሩ (ሚስጥሮች ተሸፍነዋል)                      |
| `POST`   | `/api/log-export/destinations`           | መድረሻ ይፍጠሩ                                         |
| `GET`    | `/api/log-export/destinations/{id}`      | አንዱን ያንብቡ                                         |
| `PUT`    | `/api/log-export/destinations/{id}`      | ስም / የነቃ ሁኔታ / ውቅር / በጥቅል ማስኬድን ያዘምኑ              |
| `DELETE` | `/api/log-export/destinations/{id}`      | ይሰርዙ                                              |
| `POST`   | `/api/log-export/destinations/{id}/test` | የማረጋገጫ መረጃን ይፈትሹ፣ ምንም አይጻፉ                        |
| `POST`   | `/api/log-export/destinations/{id}/run`  | አሁን ያስወግዱ፣ ከታቀደው አሂድ ጋር ተመሳሳይ መንገድ                |
| `GET`    | `/api/log-export/status`                 | የCron ሁኔታ፣ የቅርብ ጊዜ አሂዶች፣ በእያንዳንዱ ዒላማ ያልተከናወኑ ሥራዎች |

`GET /api/log-export/types` UIውን አጠቃላይ እንዲሆን የሚያደርገው ነው፦ የዳሽቦርድ ቅጹ
ከተመለሱት የመስክ ገላጮች ይሳላል፤ ስለዚህ አዲስ መድረሻ ምንም የUI ለውጥ አያስፈልገውም።

---

## 4. BigQuery መድረሻ

የውቅር ቁልፎች (`type: "bigquery"`)፦

| ቁልፍ                  | ማስታወሻዎች                                                   |
| -------------------- | --------------------------------------------------------- |
| `projectId`          | የውሂብ ስብስቡን የያዘው GCP ፕሮጀክት                                 |
| `datasetId`          | `[A-Za-z0-9_]+`                                           |
| `tableId`            | `[A-Za-z0-9_]+`                                           |
| `location`           | የውሂብ ስብስቡ መፈጠር ሲኖርበት ብቻ ጥቅም ላይ ይውላል (ነባሪ `EU`)            |
| `serviceAccountJson` | የአገልግሎት መለያ ቁልፍ። ሚስጥር፦ በማከማቻ ጊዜ የተመሰጠረ፣ ፈጽሞ የማይመለስ        |
| `autoCreate`         | በመጀመሪያው ወደ ውጭ መላክ ላይ የውሂብ ስብስቡንና ሰንጠረዡን ይፍጠሩ (ነባሪ `true`) |

የአገልግሎት መለያው በዒላማው ሰንጠረዥ ላይ `bigquery.tables.updateData`፣ በተጨማሪም
`autoCreate` ከነቃ `bigquery.datasets.create` / `bigquery.tables.create` ያስፈልገዋል።

የተዋቀረ ጥቅል የHTTP ሳይሆን የ**ጠቋሚ** አሃድ ነው፦ `send()` እስከ 500 ረድፎች ብቻ ወዳሏቸው
insertAll ጥሪዎች ይከፋፍለዋል፤ ስለዚህ ትልቅ `batch_size` የBigQueryን የ10 MB የጥያቄ ገደብ ሊያልፍ
አይችልም። ጊዜያዊ ሁኔታዎች (408/429/500/502/503/504) በኤክስፖነንሺያል መዘግየት እስከ ሦስት
ጊዜ ድረስ፣ ተመሳሳይ insertIdsን እንደገና በመጠቀም ይሞከራሉ፤ የማረጋገጫና የመርሐግብር ውድቀቶች
አሂዱን በከንቱ ከማባከን ይልቅ በመጀመሪያው ሙከራ ላይ ስህተት ይጥላሉ።

ከጥቂት ጊዜ በፊት የተፈጠረ ሰንጠረዥ ለዥረት መጨረሻ ነጥቡ ገና አይታይም፤ ስለዚህም ለጥቂት
ሰከንዶች 404 ይመልሳል። ያ 404 እንደገና ይሞከራል፣ ነገር ግን **ይህ አሂድ ሰንጠረዡን
ሲፈጥር ብቻ** ነው — በእርግጥ የሌለ ሰንጠረዥ ግን ወዲያውኑ ይወድቃል። በቅርቡ በተሰረዘ ስም ስር
ሰንጠረዥን እንደገና መፍጠር BigQuery ለብዙ ደቂቃዎች የዥረት ማስገባቶችን ውድቅ እንዲያደርግ
እንደሚያደርገው ያስተውሉ፤ ይህ የመሰረዝ-ከዚያም-እንደገና-የመፍጠር ባህሪ ስለሆነ፣ ሰንጠረዥን
ከማስወገድና እንደገና ከማከል ይልቅ አዲስ የሰንጠረዥ ስም መጠቀም ይመረጣል።

**ከፊል ውድቀት ባዶ ያልሆነ `insertErrors[]` ይዞ እንደ HTTP 200 ይመጣል።** ይህ እንደ
ውድቀት ተቆጥሮ ስህተት ይጥላል፤ ይህም BigQuery ካልተቀበላቸው ረድፎች አልፎ ጠቋሚው እንዳይራመድ
ያስቆመዋል፤ `tests/unit/log-export-bigquery.test.ts` ባህሪውን ያረጋግጣል።

መጓጓዣው ተራ REST ነው — በራስ የተፈረመ RS256 ማረጋገጫ በ
`https://oauth2.googleapis.com/token` የመዳረሻ ቶከን ለማግኘት ይለወጣል፣ ከዚያም ረድፎቹ ወደ
`tabledata.insertAll` ይሄዳሉ። ምንም Google SDK አይጨመርም። የመዳረሻ ቶከኖች በእያንዳንዱ
(የአገልግሎት መለያ፣ ወሰን) በሂደቱ ውስጥ በመሸጎጫ ይቀመጣሉ።

የተፈጠረው ሰንጠረዥ ለእያንዳንዱ የLogs ትር መስክ አንድ ዓምድ ከ`exported_at` ጋር ይይዛል፤
እንዲሁም የጥሪ ሎጎች በተግባር ለሚጠየቁበት መንገድ ተዘጋጅቷል፦

- **በ`timestamp` ላይ በቀን የተከፋፈለ**፣ ስለዚህ በቀን የተወሰነ ጥያቄ እነዚያን ቀናት ብቻ ይቃኛል።
- **በ`api_key_name`፣ `provider`፣ `model`፣ `status` የተከማቸ** (በዚያ ቅደም ተከተል)፣ ስለዚህ
  ማን እንዳስኬደው፣ ወዴት እንደሄደ ወይም እንደወደቀ መሰረት ማጣራት በእያንዳንዱ ክፍል ውስጥ
  ያሉ ጥቅሎችን ይቀንሳል። BigQuery ቢበዛ አራት የክላስተሪንግ ዓምዶችን ይፈቅዳል፣ እና ቅደም
  ተከተሉ አስፈላጊ ነው፦ በ`api_key_name` ብቻ ማጣራት ይቀንሳል፣ በ`status` ብቻ ማጣራት ግን
  አይቀንስም።
- በ`partitionExpirationDays` በኩል **አማራጭ የክፍል ማቆያ** (0 ሁሉንም ያቆያል)፣ ሰንጠረዡ
  ሲፈጠር ይተገበራል።

ሁለቱም ቅንብሮች በመፍጠር ጊዜ ተግባራዊ ይሆናሉ። ነባር ሰንጠረዥ ቀድሞውኑ ያለውን አቀማመጥ ይዞ ይቆያል፤ ስለዚህ
እነዚህን መተግበር ከፈለጉ መድረሻውን ወደ አዲስ የሰንጠረዥ id ያመልክቱ።

`tests/unit/log-export-bigquery.test.ts` ማፐሩና የሰንጠረዡ መርሐግብር በተመሳሳይ ሁኔታ
እንዲራመዱ ያረጋግጣል፤ በመሆኑም አዲስ የጥሪ ምዝግብ ዓምድ ወደ ውጭ በሚላክበት ሂደት ያለማስጠንቀቂያ ሊተው አይችልም።

ባቾች በ**ሁለቱም** የረድፍ ብዛትና ተከታታይ ተደርገው በተቀመጡ ባይቶች መጠን ይከፋፈላሉ። የውሂብ ጭነቶች ወደ ውጭ መላክ ከጀመሩ በኋላ የረድፍ ብዛት ብቻ በቂ አይደለም፤ መጠየቂያዎችን የያዙ 500 ረድፎች በአስር ሜጋባይቶች ሊለኩ ይችላሉ፣ እና insertAll
ከ10 MB በላይ የሆነ ጥያቄን አይቀበልም። ክፍሎቹ 500 ረድፎች ወይም 9 MB ሲደርሱ፣ ከሁለቱ ቀድሞ የደረሰው ላይ ይዘጋሉ።

---

## 5. መድረሻ ማከል

1. `LogExportDestinationType` የሚያስወጣ `src/lib/logExport/destinations/<name>.ts` ይፍጠሩ፦
   የZod `configSchema`፣ ለUI የሚያገለግል የ`fields` መግለጫ ድርድር፣ `secretFields`፣ እና
   `test()` / `prepare()` / `send(records)` የሚመልስ `createClient(config)`።
2. በ`src/lib/logExport/registry.ts` ውስጥ ወዳለው `DESTINATIONS` ድርድር ያክሉት።
3. በ`tests/unit/` ስር ሙከራዎችን ይጻፉ።

ለውጡ በሙሉ ይህ ብቻ ነው፦ የውሂብ ማቆያው፣ የcron ሥራው፣ የREST ንብርብሩ፣ የሚስጥር ምስጠራው እና
የdashboard ቅጹ ሁሉም registryውን ያነባሉ።

ለአዲስ መድረሻ ሁለት ደንቦች አሉ፦

- በከፊል ሲወድቅ `send()` **የግድ ስህተት መወርወር አለበት**። በስኬት መጠናቀቁ “መድረሻው እነዚህን ረድፎች ይዟል” ማለት ሲሆን፣
  cursorውም እነሱን በቋሚነት አልፎ ይሄዳል።
- ተጠቃሚው ያቀረበውን URL የሚቀበል መድረሻ፣ ልክ webhooks እንደሚያደርጉት፣ fetch ከማድረጉ በፊት
  በ`parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) በኩል ማረጋገጥ አለበት።
  BigQuery ይህን አያስፈልገውም፦ hostsዎቹ ቋሚዎች ናቸው።

---

## 6. ማስኬድ

- **Dashboard**፦ Integrations → Log export። መድረሻ ያክሉ፣ ረድፎችን ሳይጽፉ credentialsን ለማረጋገጥ
  **Test**ን ያስኪዱ፣ ከዚያም ያንቁት።
- **Backlog**፦ የእያንዳንዱ መድረሻ ካርድ በመጠባበቅ ላይ ያሉ ረድፎችን እና cursorውን ያሳያል፤ `GET
/api/log-export/status` ተመሳሳይ አኃዞችን ከመጨረሻዎቹ 20 የሥራ አስኬዶች ጋር ይመልሳል።
- **የአንድ መድረሻ ውድቀት ሌሎቹን አያወድቅም** — የአስኬዱ ማጠቃለያ የእያንዳንዱን መድረሻ
  ሁኔታ በ`last_status` / `last_error` ውስጥ ይመዘግባል፣ የሥራ አስኬድ ታሪኩም ድምር ውጤቱን ያቆያል።
- **መድረሻን መሰረዝ cursorውንም ይሰርዛል።** እንደገና ማከል ከቆየው እጅግ ጥንታዊው
  የጥሪ log ይጀምራል፤ ይህም መድረሻው አስቀድሞ የያዛቸውን ረድፎች እንደገና ይልካል። በBigQuery ላይ የእያንዳንዱ ረድፍ
  `insertId` ይህን የሚያስወግደው በBigQuery የራሱ የድግግሞሽ ማስወገጃ ጊዜ መስኮት ውስጥ ብቻ ነው፤ ስለዚህ መድረሻን
  ከመሰረዝ ይልቅ ማሰናከልን ይምረጡ።
