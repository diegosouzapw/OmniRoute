# Log export (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute ඇමතුම් ලොග් බාහිර විශ්ලේෂණ ගබඩාවකට අඛණ්ඩව, වර්ධක ලෙස අපනයනය කිරීම.

Logs උපකරණ පුවරු ටැබය ඉල්ලීම් ඉතිහාසය SQLite (`call_logs`) තුළ තබා ගනී; එය භ්රමණය සහ රඳවාගැනීම මඟින් සීමා වේ.
ලොග් අපනයනය එම වාර්තා කට්ටලයම කාලසටහනකට අනුව පිටතට යවන බැවින්, එයට දේශීය දත්ත සමුදායට වඩා දිගු කලක් පැවතිය හැකි අතර වෙනත් දත්ත සමඟ සම්බන්ධ කළ හැක. BigQuery පළමු ගමනාන්තය වේ; මෙම
නලමාර්ගය රෙජිස්ට්රියක් බැවින් තවත් ගමනාන්ත එකතු කළ හැක.

---

## 1. එය ක්රියා කරන ආකාරය

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (Logs ටැබයේ ක්ෂේත්ර කට්ටලය)
      → ගමනාන්ත සේවාලාභියා.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **කාලසටහන** — එක් `JobRegistry` cron කාර්යයක් වන `log_export`, පෙරනිමියෙන් `0 * * * *` (පැයකට වරක්,
  UTC). `src/lib/initCloudSync.ts` තුළ ලියාපදිංචි කර ඇත; `OMNIROUTE_LOG_EXPORT_CRON` මඟින් අභිබවා සැකසිය හැක.
  සෑම ක්රියාත්මක වීමකදීම **සක්රිය කර ඇති** සෑම ගමනාන්තයක්ම අනුක්රමිකව සම්පූර්ණයෙන් සකසයි.
- **කර්සරය** — SQLite හි ව්යංග `call_logs.rowid`, එක් එක් ගමනාන්තය සඳහා
  `log_export_destinations.cursor_row_id` තුළ රඳවා තබයි. `timestamp` හිතාමතාම කර්සරය ලෙස භාවිත නොකරයි: ඇමතුම්කරුවන්ට
  තමන්ගේම අගයක් සැපයිය හැකි බැවින්, පසුව ආරම්භ වූ වේගවත් ඉල්ලීමකට පසු මන්දගාමී ඉල්ලීමක් ලිවිය හැකි අතර,
  කාලමුද්රා කර්සරයක් එය මඟ හරිනු ඇත.
- **කාණ්ඩගත කිරීම** — එක් ඉල්ලීමකට පේළි `batch_size` බැගින් (පෙරනිමිය 500), එක් ධාවනයකට පේළි `max_rows_per_run`
  බැගින් (පෙරනිමිය 10000), එබැවින් විශාල පසුබැසීමක් එක් ධාවනයක් අවහිර කිරීම වෙනුවට ක්රියාත්මක වීම් කිහිපයක් පුරා අවසන් වේ.
- **බෙදාහැරීම** — කර්සරය ඉදිරියට යන්නේ `send()` විසඳුණු පසුව පමණි. අසාර්ථක කාණ්ඩයක් කර්සරය තිබූ තැනම තබන බැවින්,
  එම පේළිම ඊළඟ ධාවනයේදී නැවත උත්සාහ කෙරේ. සහතිකය සැබෑ exactly-once එකක් නොව,
  අවම වශයෙන් එක් වරක් බෙදාහැරීම සහ ගමනාන්ත පාර්ශ්වයේ අනුපිටපත් ඉවත් කිරීමයි: BigQuery සෑම
  පේළියක්ම ඇමතුම්-ලොග් හැඳුනුම්කාරකයෙන් යතුරුගත කරන අතර, තමන්ගේම අනුපිටපත් ඉවත් කිරීමේ කාල කවුළුව තුළ එය හැකි උපරිමයෙන් පිළිපදියි.
- **අතිච්ඡාදන ආරක්ෂකය** — cron ක්රියාත්මක වීම සහ `POST .../run` එකවර සිදුවිය හැක. දැනටමත් සකසමින් පවතින ගමනාන්තයක්
  දෙවරක් සැකසීම වෙනුවට මඟ හරිනු ලැබේ (ධාවන ප්රතිඵලයේ `skipped: true`), එබැවින් සමකාලීන ධාවනයකට
  කාණ්ඩයක් නැවත යැවීමට හෝ කර්සරය පසුපසට ලිවීමට නොහැක.
- **මකාදැමීමෙන් ප්රතිසාධනය** — `cursor_row_id` අගය `MAX(rowid)` ට වඩා ඉහළ ගියහොත් (මුළු වගුවම
  මකා දමා rowid නැවත ආරම්භ වී ඇත්නම්), සදහටම දත්ත නොපෙනෙන තත්ත්වයකට පත්වීම වෙනුවට ධාවකය 0 වෙත ආපසු යයි.

### පේලෝඩ් (ප්රේරක සහ සම්පූර්ණ කිරීම්)

පෙරනිමියෙන් අපනයනය රැගෙන යන්නේ Logs **ලැයිස්තුවේ** පෙන්වන සාරාංශ ක්ෂේත්ර පමණි. **ප්රේරක සහ ප්රතිචාර අපනයනය කරන්න** (`includeBodies`) සක්රිය කිරීමෙන් එක් එක් ඇමතුම සඳහා Logs **විස්තර**
කවුළුව පෙන්වන දෑද අමතරව යවයි:

| ක්ෂේත්රය                         | එහි අඩංගු දේ                                             |
| -------------------------------- | -------------------------------------------------------- |
| `request_body` / `response_body` | උපකරණ පුවරුව නිරූපණය කරන ආකාරයේ ඇමතුම් පේලෝඩ්            |
| `pipeline_route_decision`        | රවුටරය තෝරාගත් ඉලක්කය සහ ආකෘතිය                          |
| `pipeline_client_request`        | සේවාලාභියා යැවූ ආකාරයටම ඇති අමු ඉල්ලීම                   |
| `pipeline_openai_request`        | අභ්යන්තර OpenAI හැඩයට පරිවර්තනය කිරීමෙන් පසු             |
| `pipeline_provider_request`      | සැපයුම්කරුගේ ව්යවහාරයෙන්, සැබැවින්ම ඉහළධාරාවට යැවූ ආකාරය |
| `pipeline_provider_response`     | අමු ඉහළධාරා ප්රතිචාරය                                    |
| `pipeline_client_response`       | ඇමතුම්කරුට ආපසු ලබා දුන් දේ                              |
| `pipeline_error`                 | අසාර්ථක ඇමතුමක් සඳහා නලමාර්ග-මට්ටමේ දෝෂ විස්තර           |
| `bodies_truncated`               | ඉහත ක්ෂේත්රයකට `maxBodyBytes` සීමාව බලපෑ විට True        |

මෙය ප්රේරක අන්තර්ගතයක් බැවින්, එය පෙරනිමියෙන් **අක්රිය** වන අතර හිතාමතාම එක් එක් ගමනාන්තය සඳහා වෙන වෙනම තෝරාගත හැක.
යවනු ලබන්නේ උපකරණ පුවරුව පෙන්වන දේමයි, මන්ද දෙකම `getCallLogById` හරහා කියවන බැවිනි: පේලෝඩ්
ලියන අවස්ථාවේදීම PII ඉවත් කර සංවේදී දත්ත සඟවා ඇති අතර, `noLog` API යතුරකින් සිදු කළ ඇමතුමක්
කිසිදු පේලෝඩයක් ගබඩා නොකරන බැවින් අපනයනය කිරීමට කිසිවක් නොමැත.

පේලෝඩ් එක් එක් පේළිය සඳහා ගොනු පද්ධති ආටිෆැක්ට් එකෙන් කියවනු ලබන බැවින්, සම්පූර්ණ දත්ත පිරවීම ක්රියාත්මක වන්නේ
එය ඉල්ලා ඇති ගමනාන්ත සඳහා පමණි. ආටිෆැක්ට් එක අස්ථානගතව හෝ දූෂිතව ඇති පේළියක්, කාණ්ඩය අසාර්ථක කර
කර්සරය සිර කිරීම වෙනුවට null පේලෝඩ් සමඟ එහි සාරාංශය අපනයනය කරයි.

`maxBodyBytes` (පෙරනිමිය 262144) එක් එක් ක්ෂේත්රය සීමා කරයි. දිගු පේලෝඩ් ඉවත් කිරීම වෙනුවට
**කප්පාදු කෙරේ** — කෙටි කළ ප්රේරකයක් තවමත් "විමසුවේ කුමක්ද" යන්නට පිළිතුරු සපයයි — සහ පේළිය
`bodies_truncated` ලෙස සලකුණු කෙරේ. කොටසින් කොටස ප්රවාහනය වූ වෙනස්කම් අපනයනය නොකෙරේ; එකලස් කළ ප්රතිචාරය
දැනටමත් `pipeline_provider_response` සහ `pipeline_client_response` තුළ ඇත.

---

## 2. ගොනු

| කොටස                 | ස්ථානය                                       |
| -------------------- | -------------------------------------------- |
| ගමනාන්ත ගිවිසුම      | `src/lib/logExport/types.ts`                 |
| ලියාපදිංචිය          | `src/lib/logExport/registry.ts`              |
| රහස් හැසිරවීම        | `src/lib/logExport/secrets.ts`               |
| ධාවකය (කර්සර ලූපය)   | `src/lib/logExport/runner.ts`                |
| API ප්රක්ෂේපණය       | `src/lib/logExport/presenter.ts`             |
| BigQuery ගමනාන්තය    | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA සත්යාපනය   | `src/lib/logExport/googleServiceAccount.ts`  |
| ඇමතුම්-ලොග් මූලාශ්රය | `src/lib/usage/callLogExportSource.ts`       |
| ස්ථායී ගබඩාකරණය      | `src/lib/db/logExportDestinations.ts`        |
| Cron කාර්යය          | `src/lib/jobs/logExportJob.ts`               |
| REST ස්තරය           | `src/app/api/log-export/`                    |
| උපකරණ පුවරු පිටුව    | `src/app/(dashboard)/dashboard/log-export/`  |

යෝජනා ක්රමය: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

සියලුම මාර්ග කළමනාකරණ-සත්යාපිතයි (`requireManagementAuth`). රහස් කිසි විටෙක ආපසු ලබා නොදේ:
ගබඩා කළ රහසක් `__stored__` යන වචනාර්ථ අගය ලෙස ආපසු ලැබෙන අතර, යාවත්කාලීන කිරීමකදී එම අගයම නැවත යැවීමෙන්
ගබඩා කළ අක්තපත්රය එලෙසම තබා ගනී.

රහසක් ප්රකාශ කරන වර්ගයක ගමනාන්තයක් සෑදීම හෝ යාවත්කාලීන කිරීම සඳහා **`STORAGE_ENCRYPTION_KEY`
අවශ්ය වේ**. එය නොමැතිව `encrypt()` නිහඬව වෙනසක් නොකර අගය හරහා යවන බැවින්, අක්තපත්රයක්
සරල පෙළ ලෙස SQLite තුළ තැබීම වෙනුවට ලිවීම 400 සමඟ ප්රතික්ෂේප කෙරේ (Telegram webhook එක යොදන ආරක්ෂණයමයි).

| ක්රමය    | මාර්ගය                                   | අරමුණ                                                         |
| -------- | ---------------------------------------- | ------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | ගමනාන්ත වර්ග + ඒවායේ වින්යාස ක්ෂේත්ර ලැයිස්තුව                |
| `GET`    | `/api/log-export/destinations`           | ගමනාන්ත ලැයිස්තුගත කිරීම (රහස් සඟවා ඇත)                       |
| `POST`   | `/api/log-export/destinations`           | ගමනාන්තයක් සෑදීම                                              |
| `GET`    | `/api/log-export/destinations/{id}`      | එකක් කියවීම                                                   |
| `PUT`    | `/api/log-export/destinations/{id}`      | නම / සක්රීය තත්ත්වය / වින්යාසය / කාණ්ඩකරණය යාවත්කාලීන කිරීම   |
| `DELETE` | `/api/log-export/destinations/{id}`      | මකා දැමීම                                                     |
| `POST`   | `/api/log-export/destinations/{id}/test` | අක්තපත්ර පරීක්ෂා කිරීම, කිසිවක් නොලියයි                       |
| `POST`   | `/api/log-export/destinations/{id}/run`  | දැන් හිස් කිරීම, කාලසටහන්ගත ධාවනයේ මාර්ගයම භාවිත කරයි         |
| `GET`    | `/api/log-export/status`                 | Cron තත්ත්වය, මෑත ධාවන, එක් එක් ඉලක්කයේ පසුබැසුණු වැඩ ප්රමාණය |

UI එක සාමාන්යකරණය කරන්නේ `GET /api/log-export/types` ය: උපකරණ පුවරුවේ පෝරමය
ආපසු ලැබෙන ක්ෂේත්ර විස්තරකවලින් නිර්මාණය වන බැවින්, නව ගමනාන්තයක් සඳහා UI වෙනසක් අවශ්ය නොවේ.

---

## 4. BigQuery ගමනාන්තය

වින්යාස යතුරු (`type: "bigquery"`):

| යතුර                 | සටහන්                                                                         |
| -------------------- | ----------------------------------------------------------------------------- |
| `projectId`          | දත්ත කට්ටලය අඩංගු GCP ව්යාපෘතිය                                               |
| `datasetId`          | `[A-Za-z0-9_]+`                                                               |
| `tableId`            | `[A-Za-z0-9_]+`                                                               |
| `location`           | දත්ත කට්ටලය සෑදිය යුතු විට පමණක් භාවිත වේ (පෙරනිමිය `EU`)                     |
| `serviceAccountJson` | සේවා-ගිණුම් යතුර. රහසකි: ගබඩා කිරීමේදී සංකේතනය කරයි, කිසි විටෙක ආපසු ලබා නොදේ |
| `autoCreate`         | පළමු අපනයනයේදී දත්ත කට්ටලය සහ වගුව සාදන්න (පෙරනිමිය `true`)                   |

සේවා ගිණුමට ඉලක්ක වගුව මත `bigquery.tables.updateData` අවශ්ය වන අතර,
`autoCreate` සක්රීය විට `bigquery.datasets.create` / `bigquery.tables.create` ද අවශ්ය වේ.

වින්යාස කළ කාණ්ඩයක් HTTP ඒකකයක් නොව **කර්සර** ඒකකයකි: `send()` එය උපරිම පේළි 500 බැගින් වූ
insertAll ඇමතුම්වලට බෙදන බැවින්, විශාල `batch_size` අගයකට BigQuery හි 10 MB ඉල්ලීම් සීමාව ඉක්මවා යා නොහැක.
තාවකාලික තත්ත්ව (408/429/500/502/503/504) ඝාතීය ප්රමාදයක් සමඟ උපරිම වාර තුනක් නැවත උත්සාහ කරයි,
එම insertIds ම නැවත භාවිත කරමින්; සත්යාපන සහ යෝජනා ක්රම දෝෂ ධාවනය නාස්ති කිරීම වෙනුවට පළමු උත්සාහයේදීම
ව්යතිරේකයක් නිකුත් කරයි.

මොහොතකට පෙර සෑදූ වගුවක් තවමත් ප්රවාහ අන්ත ලක්ෂ්යයට දෘශ්ය නොවන බැවින්, එය තත්පර කිහිපයක්
404 ප්රතිචාර දෙයි. එම 404 සඳහා නැවත උත්සාහ කරයි, නමුත් **මෙම ධාවනය වගුව සෑදූ විට පමණි** —
සැබවින්ම නොමැති වගුවක් තවමත් වහාම අසාර්ථක වේ. මෑතකදී මකා දැමූ නමක් යටතේ වගුවක් නැවත සෑදීමෙන්
BigQuery මිනිත්තු කිහිපයක් ප්රවාහ ඇතුළත් කිරීම් ප්රතික්ෂේප කරන බව සලකන්න; එය මකා-ඉන්පසු-නැවත-සෑදීමේ
ලක්ෂණයක් වන බැවින්, එකක් ඉවත් කර නැවත එක් කිරීම වෙනුවට නව වගු නමක් භාවිත කිරීමට ප්රමුඛත්වය දෙන්න.

**අර්ධ අසාර්ථකත්වයක් හිස් නොවන `insertErrors[]` එකක් සහිත HTTP 200 ලෙස ලැබේ.** එය අසාර්ථකත්වයක් ලෙස
සලකා ව්යතිරේකයක් නිකුත් කරයි; එමඟින් BigQuery කිසිදා පිළි නොගත් පේළි පසුකර කර්සරය ඉදිරියට යාම නවතී;
`tests/unit/log-export-bigquery.test.ts` මෙම හැසිරීම ස්ථිර කරයි.

ප්රවාහනය සරල REST වේ — ස්වයං-අත්සන් කළ RS256 ප්රකාශයක්
`https://oauth2.googleapis.com/token` හි ප්රවේශ ටෝකනයක් සඳහා හුවමාරු කර, ඉන්පසු පේළි `tabledata.insertAll` වෙත යවයි. කිසිදු Google SDK එකක්
ඇතුළත් කර නොගනී. ප්රවේශ ටෝකන එක් එක් (සේවා ගිණුම, විෂය පථය) සඳහා ක්රියාවලිය තුළ හැඹිලිගත කරයි.

සාදන ලද වගුවේ Logs පටිත්තේ එක් එක් ක්ෂේත්රයට තීරුවක් සහ `exported_at` ඇතුළත් වන අතර,
ඇමතුම් ලොග් සැබවින්ම විමසන ආකාරයට එය සකසා ඇත:

- **`timestamp` මත දින අනුව කොටස් කර ඇත**, එබැවින් දිනයෙන් සීමා කළ විමසුමක් පරිලෝකනය කරන්නේ එම දින පමණි.
- **`api_key_name`, `provider`, `model`, `status` අනුව සමූහගත කර ඇත** (එම අනුපිළිවෙළට), එබැවින්
  එය ධාවනය කළේ කවුද, එය ගියේ කොතැනටද, හෝ එය අසාර්ථක වූයේද යන්න අනුව පෙරීමෙන් එක් එක් කොටස තුළ ඇති කොටස් ඉවත් කරයි. BigQuery
  උපරිම සමූහකරණ තීරු හතරක් පමණක් ඉඩ දෙන අතර අනුපිළිවෙළ වැදගත් වේ: `api_key_name` මත පමණක් පෙරහනක්
  කොටස් ඉවත් කරයි, `status` මත පමණක් පෙරහනක් එසේ නොකරයි.
- **විකල්ප කොටස් රඳවාගැනීම** `partitionExpirationDays` හරහා (0 සියල්ල තබා ගනී), වගුව
  සාදන විට යොදනු ලැබේ.

සැකසුම් දෙකම නිර්මාණය කරන අවස්ථාවේදී අදාළ වේ. පවතින වගුවක් එයට දැනටමත් ඇති පිරිසැලසුම එලෙසම තබා ගනී, එබැවින්
ඒවා භාවිතයට ගැනීමට අවශ්ය නම් ගමනාන්තය නව වගු id එකකට යොමු කරන්න.

`tests/unit/log-export-bigquery.test.ts` මඟින් mapper එක සහ වගු schema එක එකිනෙකට සමපාතව පවතින බව තහවුරු කරන බැවින්, නව call-log තීරුවක් පිටතට යන අතරතුර නිහඬව ඉවත් විය නොහැක.

කණ්ඩායම් **පේළි ගණන** සහ අනුක්රමිකකරණය කළ බයිට් යන දෙකම අනුව කොටස්වලට බෙදේ. payload අපනයනය කරන විට පේළි ගණන පමණක් ප්රමාණවත් නොවේ: prompts රැගෙන යන පේළි 500ක් මෙගාබයිට් දස ගණනක් විය හැකි අතර, 10 MB ඉක්මවන ඉල්ලීමක් insertAll මඟින් ප්රතික්ෂේප කරයි. පේළි 500ක් හෝ 9 MB සීමාවට ළඟා වූ විට—පළමුව සිදුවන අවස්ථාවේදී—කොටස් අවසන් කෙරේ.

---

## 5. ගමනාන්තයක් එක් කිරීම

1. `LogExportDestinationType` එකක් export කරන `src/lib/logExport/destinations/<name>.ts` සාදන්න:
   Zod `configSchema` එකක්, UI සඳහා `fields` විස්තරකාරක array එකක්, `secretFields`, සහ
   `test()` / `prepare()` / `send(records)` ආපසු ලබා දෙන `createClient(config)` එකක්.
2. එය `src/lib/logExport/registry.ts` හි `DESTINATIONS` array එකට එක් කරන්න.
3. `tests/unit/` යටතේ පරීක්ෂණ ලියන්න.

සම්පූර්ණ වෙනස එපමණයි: දත්ත ස්ථීරව ගබඩා කිරීම, cron job එක, REST ස්තරය, රහස් සංකේතනය සහ
dashboard පෝරමය යන සියල්ල registry එක කියවයි.

නව ගමනාන්තයක් සඳහා නීති දෙකක්:

- අර්ධ අසාර්ථකත්වයකදී `send()` **අනිවාර්යයෙන්ම throw කළ යුතුය**. එය සාර්ථකව resolve වීම යනු "ගමනාන්තය සතුව මෙම පේළි ඇත" යන්නයි,
  එවිට cursor එක ඒවා පසුකර ස්ථිරවම ඉදිරියට යයි.
- පරිශීලකයා සපයන URL එකක් භාවිත කරන ගමනාන්තයක්, fetch කිරීමට පෙර,
  webhooks කරන ආකාරයටම `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) හරහා එය වලංගු කළ යුතුය.
  BigQuery සඳහා මෙය අවශ්ය නොවේ: එහි hosts නියත අගයන් වේ.

---

## 6. එය ක්රියාත්මක කිරීම

- **Dashboard**: Integrations → Log export. ගමනාන්තයක් එක් කර, පේළි නොලියා credentials පරීක්ෂා කිරීමට **Test** ක්රියාත්මක කර,
  ඉන්පසු එය සක්රිය කරන්න.
- **Backlog**: සෑම ගමනාන්ත card එකකම pending පේළි සහ cursor එක පෙන්වයි; `GET
/api/log-export/status` මඟින් එම සංඛ්යා සහ අවසන් job runs 20 ද ලබා දෙයි.
- **එක් ගමනාන්තයක් අසාර්ථක වීමෙන් අනෙක් ඒවා අසාර්ථක නොවේ** — run summary එක `last_status` / `last_error` තුළ එක් එක් ගමනාන්තයේ
  status එක සටහන් කරන අතර, job run history එක සමස්ත ප්රතිඵලය තබා ගනී.
- **ගමනාන්තයක් මකා දැමීමෙන් එහි cursor එකද මැකේ.** එය නැවත එක් කළ විට, රඳවා තබා ඇති පැරණිතම
  call log එකෙන් ආරම්භ වන අතර, ගමනාන්තය සතුව දැනටමත් තිබිය හැකි පේළි නැවත යවයි. BigQuery තුළ එක් එක් පේළියේ
  `insertId` මඟින් එය අවශෝෂණය කරන්නේ BigQuery හිම de-duplication කාල කවුළුව තුළ පමණක් බැවින්, ගමනාන්තයක් මකා දැමීමට වඩා
  එය අක්රිය කිරීම වඩාත් සුදුසුය.
