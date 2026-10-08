# Log export (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute കോൾ ലോഗുകൾ ഒരു ബാഹ്യ അനലിറ്റിക്സ് സ്റ്റോറിലേക്ക് തുടർച്ചയായും ഇൻക്രിമെന്റലായും എക്സ്പോർട്ട് ചെയ്യുന്നു.

Logs ഡാഷ്ബോർഡ് ടാബ് അഭ്യർത്ഥനാ ചരിത്രം SQLite (`call_logs`)-ൽ സൂക്ഷിക്കുന്നു; റൊട്ടേഷനും റിട്ടൻഷനും അതിന്റെ പരിധി നിർണ്ണയിക്കുന്നു. ഷെഡ്യൂൾ പ്രകാരം അതേ റെക്കോർഡ് സെറ്റ് പുറത്തേക്ക് അയയ്ക്കുന്ന ലോഗ് എക്സ്പോർട്ട്, പ്രാദേശിക ഡാറ്റാബേസിന്റെ കാലാവധിക്കപ്പുറം അവ നിലനിർത്താനും മറ്റ് ഡാറ്റയുമായി ചേർക്കാനും സഹായിക്കുന്നു. BigQuery ആണ് ആദ്യ ഡെസ്റ്റിനേഷൻ; പൈപ്പ്ലൈൻ ഒരു രജിസ്ട്രിയായതിനാൽ കൂടുതൽ ഡെസ്റ്റിനേഷനുകൾ കൂട്ടിച്ചേർക്കാം.

---

## 1. ഇത് എങ്ങനെ പ്രവർത്തിക്കുന്നു

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (Logs ടാബിലെ ഫീൽഡ് സെറ്റ്)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **ഷെഡ്യൂൾ** — `log_export` എന്ന ഒറ്റ `JobRegistry` cron ജോബ്; ഡിഫോൾട്ടായി `0 * * * *` (ഓരോ മണിക്കൂറിലും, UTC). `src/lib/initCloudSync.ts`-ൽ രജിസ്റ്റർ ചെയ്തിരിക്കുന്നു; `OMNIROUTE_LOG_EXPORT_CRON` ഉപയോഗിച്ച് മാറ്റാം. ഓരോ ടിക്കിലും **പ്രവർത്തനക്ഷമമാക്കിയ** എല്ലാ ഡെസ്റ്റിനേഷനുകളും ഒന്നിനു പിന്നാലെ ഒന്നായി പൂർണ്ണമായി പ്രോസസ് ചെയ്യുന്നു.
- **കർസർ** — SQLite-ന്റെ ഇംപ്ലിസിറ്റ് `call_logs.rowid`; ഓരോ ഡെസ്റ്റിനേഷനുമായി ബന്ധപ്പെട്ട് `log_export_destinations.cursor_row_id`-ൽ നിലനിർത്തുന്നു. `timestamp` മനഃപൂർവം കർസറായി ഉപയോഗിക്കുന്നില്ല: കോളർമാർക്ക് സ്വന്തം മൂല്യം നൽകാൻ കഴിയുന്നതിനാൽ, പിന്നീട് ആരംഭിച്ച വേഗമേറിയ അഭ്യർത്ഥനയ്ക്കുശേഷം മന്ദഗതിയിലുള്ള ഒരു അഭ്യർത്ഥന എഴുതപ്പെടാം; അപ്പോൾ timestamp കർസർ അതിനെ ഒഴിവാക്കും.
- **ബാച്ചിംഗ്** — ഓരോ അഭ്യർത്ഥനയ്ക്കും `batch_size` വരികൾ (ഡിഫോൾട്ട് 500), ഓരോ റണ്ണിനും `max_rows_per_run` വരികൾ (ഡിഫോൾട്ട് 10000); അതിനാൽ വലിയൊരു ബാക്ക്ലോഗ് ഒറ്റ റൺ തടസ്സപ്പെടുത്താതെ പല ടിക്കുകളിലായി തീരും.
- **ഡെലിവറി** — `send()` പരിഹരിച്ചതിനുശേഷം മാത്രമാണ് കർസർ മുന്നോട്ട് നീങ്ങുന്നത്. പരാജയപ്പെട്ട ബാച്ച് കർസറിനെ അതേ സ്ഥാനത്ത് നിലനിർത്തുന്നതിനാൽ അടുത്ത റണ്ണിൽ അതേ വരികൾ വീണ്ടും ശ്രമിക്കും. ഉറപ്പ് യഥാർത്ഥ exactly-once അല്ല; കുറഞ്ഞത് ഒരിക്കലെങ്കിലും ഡെലിവറിയും ഡെസ്റ്റിനേഷൻ വശത്തെ ഡീ-ഡ്യൂപ്ലിക്കേഷനുമാണ്: BigQuery ഓരോ വരിക്കും call-log id ഉപയോഗിച്ച് കീ നൽകുന്നു; അതിന്റെ സ്വന്തം dedup window-നുള്ളിൽ best-effort അടിസ്ഥാനത്തിലാണ് അത് പാലിക്കുന്നത്.
- **ഓവർലാപ്പ് ഗാർഡ്** — cron ടിക്കും `POST .../run`-ഉം ഒരേ സമയം പ്രവർത്തിക്കാം. ഇതിനകം പ്രോസസ് ചെയ്തുകൊണ്ടിരിക്കുന്ന ഡെസ്റ്റിനേഷൻ രണ്ടാമതും പ്രോസസ് ചെയ്യുന്നതിന് പകരം ഒഴിവാക്കുന്നു (റൺ ഫലത്തിൽ `skipped: true`); അതിനാൽ സമകാലിക റണ്ണിന് ഒരു ബാച്ച് വീണ്ടും അയയ്ക്കാനോ കർസർ പിന്നോട്ട് എഴുതാനോ കഴിയില്ല.
- **പർജ് റിക്കവറി** — `cursor_row_id`, `MAX(rowid)`-നേക്കാൾ മുകളിലായാൽ (മുഴുവൻ ടേബിളും പർജ് ചെയ്ത് rowid-കൾ പുനരാരംഭിച്ചാൽ), റണ്ണർ സ്ഥിരമായി പുതിയ വരികൾ കാണാതാകുന്നതിന് പകരം കർസർ 0-ലേക്ക് റിവൈൻഡ് ചെയ്യുന്നു.

### പേലോഡുകൾ (പ്രോംപ്റ്റുകളും കംപ്ലീഷനുകളും)

ഡിഫോൾട്ടായി, Logs **ലിസ്റ്റ്** കാണിക്കുന്ന സംഗ്രഹ ഫീൽഡുകൾ മാത്രമാണ് എക്സ്പോർട്ടിൽ ഉൾപ്പെടുന്നത്. **Export prompts and responses** (`includeBodies`) പ്രവർത്തനക്ഷമമാക്കിയാൽ, ഓരോ കോളിനും Logs **ഡീറ്റെയിൽ** പെയ്ൻ കാണിക്കുന്ന വിവരങ്ങളും അധികമായി അയയ്ക്കുന്നു:

| ഫീൽഡ്                            | അതിൽ അടങ്ങിയിരിക്കുന്നത്                                      |
| -------------------------------- | ------------------------------------------------------------- |
| `request_body` / `response_body` | ഡാഷ്ബോർഡ് റെൻഡർ ചെയ്യുന്ന കോൾ പേലോഡുകൾ                        |
| `pipeline_route_decision`        | റൂട്ടർ തിരഞ്ഞെടുത്ത ടാർഗറ്റും മോഡലും                          |
| `pipeline_client_request`        | ക്ലയന്റ് അയച്ച അതേ രൂപത്തിലുള്ള റോ അഭ്യർത്ഥന                  |
| `pipeline_openai_request`        | ആന്തരിക OpenAI രൂപത്തിലേക്കുള്ള പരിവർത്തനത്തിനുശേഷമുള്ളത്     |
| `pipeline_provider_request`      | പ്രൊവൈഡർ ഡയലക്ടിൽ യഥാർത്ഥത്തിൽ അപ്സ്ട്രീമിലേക്ക് അയച്ചത്      |
| `pipeline_provider_response`     | റോ അപ്സ്ട്രീം പ്രതികരണം                                       |
| `pipeline_client_response`       | കോളറിന് തിരികെ നൽകിയതു                                        |
| `pipeline_error`                 | പരാജയപ്പെട്ട കോളിന്റെ പൈപ്പ്ലൈൻ തലത്തിലുള്ള പിശക് വിശദാംശം    |
| `bodies_truncated`               | മുകളിലെ ഏതെങ്കിലും ഫീൽഡ് `maxBodyBytes` പരിധിയിലെത്തിയാൽ True |

ഇത് പ്രോംപ്റ്റ് ഉള്ളടക്കമായതിനാൽ, ഇത് **ഡിഫോൾട്ടായി ഓഫാണ്**; മനഃപൂർവം ഓരോ ഡെസ്റ്റിനേഷനും പ്രത്യേകം തിരഞ്ഞെടുക്കാവുന്ന രീതിയിലാണ് ഇത് ക്രമീകരിച്ചിരിക്കുന്നത്. ഡാഷ്ബോർഡ് കാണിക്കുന്നതു തന്നെയാണ് അയയ്ക്കുന്നത്, കാരണം രണ്ടും `getCallLogById` വഴിയാണ് വായിക്കുന്നത്: പേലോഡുകൾ എഴുതുമ്പോൾ തന്നെ PII നീക്കം ചെയ്യുകയും രഹസ്യങ്ങൾ മറയ്ക്കുകയും ചെയ്തിട്ടുണ്ട്; കൂടാതെ `noLog` API കീ ഉപയോഗിച്ച് നടത്തിയ കോൾ ഒരു പേലോഡും സൂക്ഷിക്കാത്തതിനാൽ എക്സ്പോർട്ട് ചെയ്യാൻ ഒന്നുമുണ്ടാകില്ല.

ഓരോ വരിയുടെയും പേലോഡുകൾ ഫയൽസിസ്റ്റം ആർട്ടിഫാക്റ്റിൽനിന്ന് വായിക്കുന്നു; അതിനാൽ അത് ആവശ്യപ്പെട്ട ഡെസ്റ്റിനേഷനുകൾക്കായി മാത്രമേ ഹൈഡ്രേഷൻ പ്രവർത്തിക്കൂ. ആർട്ടിഫാക്റ്റ് നഷ്ടപ്പെട്ടതോ കേടായതോ ആയ ഒരു വരി, ബാച്ച് പരാജയപ്പെടുത്തി കർസറിനെ തടഞ്ഞുനിർത്തുന്നതിനുപകരം null പേലോഡുകളോടൊപ്പം അതിന്റെ സംഗ്രഹം എക്സ്പോർട്ട് ചെയ്യുന്നു.

`maxBodyBytes` (ഡിഫോൾട്ട് 262144) ഓരോ ഫീൽഡിനും പരിധി നിശ്ചയിക്കുന്നു. ദൈർഘ്യമേറിയ പേലോഡുകൾ ഒഴിവാക്കുന്നതിനുപകരം **ട്രങ്കേറ്റ് ചെയ്യുന്നു** — ക്ലിപ്പ് ചെയ്ത പ്രോംപ്റ്റ് പോലും "എന്താണ് ചോദിച്ചത്" എന്നതിന് ഉത്തരം നൽകുന്നു — കൂടാതെ വരി `bodies_truncated` ഉപയോഗിച്ച് അടയാളപ്പെടുത്തുന്നു. ഓരോ ചങ്കായി സ്ട്രീം ചെയ്ത ഡെൽറ്റകൾ എക്സ്പോർട്ട് ചെയ്യില്ല; അസംബിൾ ചെയ്ത പ്രതികരണം ഇതിനകം `pipeline_provider_response`-ലും `pipeline_client_response`-ലും ഉണ്ട്.

---

## 2. ഫയലുകൾ

| ഘടകം                      | സ്ഥാനം                                       |
| ------------------------- | -------------------------------------------- |
| ഡെസ്റ്റിനേഷൻ കോൺട്രാക്ട്  | `src/lib/logExport/types.ts`                 |
| രജിസ്ട്രി                 | `src/lib/logExport/registry.ts`              |
| സീക്രട്ട് കൈകാര്യം ചെയ്യൽ | `src/lib/logExport/secrets.ts`               |
| റണ്ണർ (കർസർ ലൂപ്പ്)       | `src/lib/logExport/runner.ts`                |
| API പ്രൊജക്ഷൻ             | `src/lib/logExport/presenter.ts`             |
| BigQuery ഡെസ്റ്റിനേഷൻ     | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA ഓത്ത്           | `src/lib/logExport/googleServiceAccount.ts`  |
| കോൾ-ലോഗ് സോഴ്സ്           | `src/lib/usage/callLogExportSource.ts`       |
| പെർസിസ്റ്റൻസ്             | `src/lib/db/logExportDestinations.ts`        |
| Cron ജോലി                 | `src/lib/jobs/logExportJob.ts`               |
| REST ലെയർ                 | `src/app/api/log-export/`                    |
| ഡാഷ്ബോർഡ് പേജ്            | `src/app/(dashboard)/dashboard/log-export/`  |

സ്കീമ: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

എല്ലാ റൂട്ടുകളിലും മാനേജ്മെന്റ് ഓതന്റിക്കേഷൻ (`requireManagementAuth`) ആവശ്യമാണ്. സീക്രട്ടുകൾ ഒരിക്കലും തിരികെ നൽകില്ല:
സംഭരിച്ച സീക്രട്ട് ലിറ്ററൽ മൂല്യമായ `__stored__` ആയി തിരികെ ലഭിക്കും; അപ്ഡേറ്റിൽ ആ മൂല്യം തന്നെ തിരികെ അയച്ചാൽ
സംഭരിച്ച ക്രെഡൻഷ്യൽ നിലനിർത്തും.

സീക്രട്ട് നിർവചിച്ചിട്ടുള്ള തരത്തിലുള്ള ഡെസ്റ്റിനേഷൻ സൃഷ്ടിക്കുന്നതിനോ അപ്ഡേറ്റ് ചെയ്യുന്നതിനോ **`STORAGE_ENCRYPTION_KEY`
ആവശ്യമാണ്**. അതില്ലെങ്കിൽ `encrypt()` നിശ്ശബ്ദമായ പാസ്ത്രൂ ആയതിനാൽ, ക്രെഡൻഷ്യൽ SQLite-ൽ പ്ലെയിൻടെക്സ്റ്റായി
ഇടുന്നതിനു പകരം റൈറ്റ് 400 ഉപയോഗിച്ച് നിരസിക്കും (Telegram webhook പ്രയോഗിക്കുന്ന അതേ ഗാർഡ്).

| മെത്തഡ്  | പാത്ത്                                   | ഉദ്ദേശ്യം                                                     |
| -------- | ---------------------------------------- | ------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | ഡെസ്റ്റിനേഷൻ തരങ്ങൾ + അവയുടെ കോൺഫിഗ് ഫീൽഡ് പട്ടിക             |
| `GET`    | `/api/log-export/destinations`           | ഡെസ്റ്റിനേഷനുകളുടെ പട്ടിക (സീക്രട്ടുകൾ മറച്ചത്)               |
| `POST`   | `/api/log-export/destinations`           | ഒരു ഡെസ്റ്റിനേഷൻ സൃഷ്ടിക്കുക                                  |
| `GET`    | `/api/log-export/destinations/{id}`      | ഒരെണ്ണം വായിക്കുക                                             |
| `PUT`    | `/api/log-export/destinations/{id}`      | പേര് / പ്രവർത്തനക്ഷമത / കോൺഫിഗ് / ബാച്ചിംഗ് അപ്ഡേറ്റ് ചെയ്യുക |
| `DELETE` | `/api/log-export/destinations/{id}`      | ഇല്ലാതാക്കുക                                                  |
| `POST`   | `/api/log-export/destinations/{id}/test` | ക്രെഡൻഷ്യലുകൾ പരിശോധിക്കുക, ഒന്നും റൈറ്റ് ചെയ്യരുത്           |
| `POST`   | `/api/log-export/destinations/{id}/run`  | ഇപ്പോൾ ഡ്രെയിൻ ചെയ്യുക, ഷെഡ്യൂൾ ചെയ്ത റണ്ണിന്റെ അതേ പാത്ത്    |
| `GET`    | `/api/log-export/status`                 | Cron നില, സമീപകാല റണ്ണുകൾ, ഓരോ ടാർഗറ്റിലെയും ബാക്ക്ലോഗ്       |

`GET /api/log-export/types` ആണ് UI-യെ പൊതുവായതാക്കുന്നത്: തിരികെ ലഭിക്കുന്ന ഫീൽഡ് ഡിസ്ക്രിപ്റ്ററുകളിൽ നിന്നാണ്
ഡാഷ്ബോർഡ് ഫോം റെൻഡർ ചെയ്യുന്നത്, അതിനാൽ പുതിയ ഡെസ്റ്റിനേഷനായി UI മാറ്റേണ്ടതില്ല.

---

## 4. BigQuery ഡെസ്റ്റിനേഷൻ

കോൺഫിഗ് കീകൾ (`type: "bigquery"`):

| കീ                   | കുറിപ്പുകൾ                                                                                    |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `projectId`          | ഡാറ്റാസെറ്റ് ഉൾക്കൊള്ളുന്ന GCP പ്രോജക്റ്റ്                                                    |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                               |
| `tableId`            | `[A-Za-z0-9_]+`                                                                               |
| `location`           | ഡാറ്റാസെറ്റ് സൃഷ്ടിക്കേണ്ടിവരുമ്പോൾ മാത്രം ഉപയോഗിക്കുന്നു (ഡിഫോൾട്ട് `EU`)                    |
| `serviceAccountJson` | സർവീസ്-അക്കൗണ്ട് കീ. സീക്രട്ട്: സംഭരിക്കുമ്പോൾ എൻക്രിപ്റ്റ് ചെയ്യും, ഒരിക്കലും തിരികെ നൽകില്ല |
| `autoCreate`         | ആദ്യ എക്സ്പോർട്ടിൽ ഡാറ്റാസെറ്റും ടേബിളും സൃഷ്ടിക്കുക (ഡിഫോൾട്ട് `true`)                       |

സർവീസ് അക്കൗണ്ടിന് ടാർഗറ്റ് ടേബിളിൽ `bigquery.tables.updateData` ആവശ്യമാണ്; കൂടാതെ
`autoCreate` ഓണായിരിക്കുമ്പോൾ `bigquery.datasets.create` / `bigquery.tables.create` എന്നിവയും ആവശ്യമാണ്.

കോൺഫിഗർ ചെയ്ത ബാച്ച് ഒരു **കർസർ** യൂണിറ്റാണ്, HTTP യൂണിറ്റല്ല: `send()` അതിനെ പരമാവധി 500 റോകളുള്ള
insertAll കോളുകളായി വിഭജിക്കുന്നു, അതിനാൽ വലിയ `batch_size` BigQuery-യുടെ 10 MB റിക്വസ്റ്റ് പരിധി ലംഘിക്കില്ല.
താൽക്കാലിക സ്റ്റാറ്റസുകൾ (408/429/500/502/503/504), അതേ insertIds വീണ്ടും ഉപയോഗിച്ചുകൊണ്ട്, എക്സ്പോണൻഷ്യൽ
ബാക്ക്ഓഫോടെ പരമാവധി മൂന്ന് തവണ റീട്രൈ ചെയ്യും; റൺ പാഴാക്കുന്നതിനു പകരം ഓത്ത്, സ്കീമ പരാജയങ്ങൾ ആദ്യ ശ്രമത്തിൽ
തന്നെ എറർ ത്രോ ചെയ്യും.

നിമിഷങ്ങൾക്ക് മുമ്പ് സൃഷ്ടിച്ച ടേബിൾ സ്ട്രീമിംഗ് എൻഡ്പോയിന്റിൽ ഉടൻ ദൃശ്യമാകില്ല, അതിനാൽ ഏതാനും സെക്കൻഡുകൾ
അത് 404 നൽകും. ആ 404 റീട്രൈ ചെയ്യും, എന്നാൽ **ഈ റൺ ടേബിൾ സൃഷ്ടിച്ചപ്പോൾ മാത്രം** —
യഥാർത്ഥത്തിൽ ടേബിൾ ഇല്ലെങ്കിൽ ഉടൻ പരാജയപ്പെടും. അടുത്തിടെ ഇല്ലാതാക്കിയ ടേബിളിന്റെ അതേ പേരിൽ വീണ്ടും ടേബിൾ
സൃഷ്ടിക്കുന്നത് ഏതാനും മിനിറ്റുകൾ സ്ട്രീമിംഗ് ഇൻസേർട്ടുകൾ നിരസിക്കാൻ BigQuery-യെ പ്രേരിപ്പിക്കുമെന്നത് ശ്രദ്ധിക്കുക;
ഇത് ഡിലീറ്റ്-ചെയ്ത്-വീണ്ടും-സൃഷ്ടിക്കുന്നതിന്റെ സ്വഭാവമാണ്, അതിനാൽ ഒരെണ്ണം ഡ്രോപ്പ് ചെയ്ത് വീണ്ടും ചേർക്കുന്നതിനേക്കാൾ
പുതിയ ടേബിൾ പേര് തിരഞ്ഞെടുക്കുക.

**ഭാഗിക പരാജയം, ശൂന്യമല്ലാത്ത `insertErrors[]` സഹിതം HTTP 200 ആയി ലഭിക്കും.** അതിനെ പരാജയമായി
കണക്കാക്കി എറർ ത്രോ ചെയ്യും; BigQuery ഒരിക്കലും സ്വീകരിക്കാത്ത റോകൾക്ക് അപ്പുറത്തേക്ക് കർസർ നീങ്ങുന്നത് ഇതാണ്
തടയുന്നത്; `tests/unit/log-export-bigquery.test.ts` ഈ സ്വഭാവം ഉറപ്പിക്കുന്നു.

ട്രാൻസ്പോർട്ട് പ്ലെയിൻ REST ആണ് — സ്വയം സൈൻ ചെയ്ത RS256 അസർഷൻ
`https://oauth2.googleapis.com/token`-ൽ ഒരു ആക്സസ് ടോക്കണായി എക്സ്ചേഞ്ച് ചെയ്യുന്നു, തുടർന്ന് റോകൾ
`tabledata.insertAll`-ലേക്ക് പോകുന്നു. Google SDK ഉൾപ്പെടുത്തുന്നില്ല. ഓരോ (സർവീസ് അക്കൗണ്ട്, സ്കോപ്പ്)
ജോഡിക്കും ആക്സസ് ടോക്കണുകൾ ഇൻ-പ്രോസസായി കാഷ് ചെയ്യുന്നു.

സൃഷ്ടിച്ച ടേബിളിൽ Logs-ടാബിലെ ഓരോ ഫീൽഡിനും ഓരോ കോളവും കൂടാതെ `exported_at`-ഉം ഉണ്ടായിരിക്കും; കോൾ ലോഗുകൾ
യഥാർത്ഥത്തിൽ ക്വറി ചെയ്യുന്ന രീതിക്കനുസരിച്ചാണ് അത് ക്രമീകരിച്ചിരിക്കുന്നത്:

- **`timestamp` അടിസ്ഥാനമാക്കി ദിവസം തിരിച്ചുള്ള പാർട്ടീഷനിംഗ്**, അതിനാൽ തീയതിയാൽ പരിമിതപ്പെടുത്തിയ ക്വറി ആ ദിവസങ്ങൾ മാത്രം സ്കാൻ ചെയ്യും.
- **`api_key_name`, `provider`, `model`, `status` എന്നിവയാൽ ക്ലസ്റ്റർ ചെയ്തത്** (ആ ക്രമത്തിൽ), അതിനാൽ
  ആരാണ് അത് റൺ ചെയ്തത്, അത് എവിടേക്കാണ് പോയത്, അല്ലെങ്കിൽ അത് പരാജയപ്പെട്ടോ എന്നിവ ഉപയോഗിച്ചുള്ള ഫിൽട്ടറിംഗ് ഓരോ
  പാർട്ടീഷനിലെയും ബ്ലോക്കുകൾ പ്രൂൺ ചെയ്യും. BigQuery പരമാവധി നാല് ക്ലസ്റ്ററിംഗ് കോളങ്ങൾ അനുവദിക്കുന്നു, കൂടാതെ ക്രമം
  പ്രധാനമാണ്: `api_key_name` മാത്രം ഉപയോഗിച്ചുള്ള ഫിൽട്ടർ പ്രൂൺ ചെയ്യും, `status` മാത്രം ഉപയോഗിച്ചുള്ള ഫിൽട്ടർ പ്രൂൺ ചെയ്യില്ല.
- **`partitionExpirationDays` വഴിയുള്ള ഓപ്ഷണൽ പാർട്ടീഷൻ നിലനിർത്തൽ** (0 എല്ലാം നിലനിർത്തും), ടേബിൾ
  സൃഷ്ടിക്കുമ്പോൾ പ്രയോഗിക്കുന്നു.

ഈ രണ്ട് ക്രമീകരണങ്ങളും സൃഷ്ടിക്കുന്ന സമയത്താണ് ബാധകമാകുന്നത്. നിലവിലുള്ള ഒരു പട്ടിക അതിന് ഇതിനകം ഉള്ള ലേഔട്ട് നിലനിർത്തും, അതിനാൽ
ഇവ സ്വീകരിക്കണമെങ്കിൽ ലക്ഷ്യസ്ഥാനം ഒരു പുതിയ പട്ടിക id-ലേക്ക് ചൂണ്ടുക.

മാപ്പറും പട്ടിക സ്കീമയും ഒരേ ക്രമത്തിൽ തുടരുന്നുവെന്ന് `tests/unit/log-export-bigquery.test.ts` ഉറപ്പാക്കുന്നു,
അതിനാൽ പുറത്തേക്ക് അയയ്ക്കുന്നതിനിടെ ഒരു പുതിയ call-log കോളം നിശ്ശബ്ദമായി ഒഴിവാക്കാനാവില്ല.

ബാച്ചുകൾ **രണ്ടും**—വരി എണ്ണവും സീരിയലൈസ് ചെയ്ത ബൈറ്റുകളും—അടിസ്ഥാനമാക്കി ചങ്കുകളായി വിഭജിക്കുന്നു. പേലോഡുകൾ എക്സ്പോർട്ട് ചെയ്തുകഴിഞ്ഞാൽ
വരി എണ്ണം മാത്രം മതിയാകില്ല: പ്രോംപ്റ്റുകൾ ഉൾക്കൊള്ളുന്ന 500 വരികൾക്ക് പതിനായിരക്കണക്കിന് മെഗാബൈറ്റുകൾ വലുപ്പമുണ്ടാകാം, കൂടാതെ 10 MB-യിൽ കൂടുതലുള്ള
ഒരു അഭ്യർത്ഥന insertAll നിരസിക്കും. ആദ്യം ഏത് പരിധിയിലെത്തുന്നുവോ അതനുസരിച്ച്, 500 വരികളിലോ 9 MB-യിലോ ചങ്കുകൾ അവസാനിപ്പിക്കും.

---

## 5. ഒരു destination ചേർക്കൽ

1. `LogExportDestinationType` export ചെയ്യുന്ന `src/lib/logExport/destinations/<name>.ts` സൃഷ്ടിക്കുക:
   ഒരു Zod `configSchema`, UI-യ്ക്കായുള്ള ഒരു `fields` descriptor array, `secretFields`, കൂടാതെ
   `test()` / `prepare()` / `send(records)` നൽകുന്ന ഒരു `createClient(config)`.
2. `src/lib/logExport/registry.ts`-ലെ `DESTINATIONS` array-യിലേക്ക് അത് ചേർക്കുക.
3. `tests/unit/`-ന് കീഴിൽ tests എഴുതുക.

മാറ്റം ഇത്രമാത്രമാണ്: persistence, cron job, REST layer, secret encryption, dashboard form എന്നിവയെല്ലാം registry വായിക്കുന്നു.

ഒരു പുതിയ destination-നുള്ള രണ്ട് നിയമങ്ങൾ:

- ഭാഗിക പരാജയം സംഭവിക്കുമ്പോൾ `send()` **നിർബന്ധമായും throw ചെയ്യണം**. Resolve ചെയ്യുന്നത് "destination-ൽ ഈ rows ഉണ്ട്" എന്നാണ് അർത്ഥമാക്കുന്നത്,
  തുടർന്ന് cursor അവയെ ശാശ്വതമായി മറികടന്ന് മുന്നോട്ട് നീങ്ങും.
- ഉപയോക്താവ് നൽകുന്ന URL സ്വീകരിക്കുന്ന destination, fetch ചെയ്യുന്നതിന് മുമ്പ്
  webhooks ചെയ്യുന്നതുപോലെതന്നെ, `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) വഴി അത് validate ചെയ്യണം.
  BigQuery-യ്ക്ക് ഇത് ആവശ്യമില്ല: അതിന്റെ hosts constants ആണ്.

---

## 6. ഇത് പ്രവർത്തിപ്പിക്കൽ

- **Dashboard**: Integrations → Log export. ഒരു destination ചേർക്കുക, rows എഴുതാതെ credentials പരിശോധിക്കാൻ **Test** പ്രവർത്തിപ്പിക്കുക,
  തുടർന്ന് അത് enable ചെയ്യുക.
- **Backlog**: ഓരോ destination card-ഉം pending rows-ഉം cursor-ഉം കാണിക്കുന്നു; `GET
/api/log-export/status` അതേ കണക്കുകൾക്കൊപ്പം അവസാനത്തെ 20 job runs-ഉം നൽകുന്നു.
- **പരാജയപ്പെടുന്ന ഒരു destination മറ്റുള്ളവയെ പരാജയപ്പെടുത്തില്ല** — run summary ഓരോ destination-ന്റെയും
  status `last_status` / `last_error` എന്നിവയിൽ രേഖപ്പെടുത്തുന്നു, കൂടാതെ job run history aggregate സൂക്ഷിക്കുന്നു.
- **ഒരു destination delete ചെയ്യുന്നത് അതിന്റെ cursor-ഉം delete ചെയ്യും.** അത് വീണ്ടും ചേർക്കുമ്പോൾ നിലനിർത്തിയിട്ടുള്ളതിൽ ഏറ്റവും പഴയ
  call log മുതൽ ആരംഭിക്കും; ഇതുവഴി destination-ൽ ഇതിനകം ഉണ്ടായിരിക്കാവുന്ന rows വീണ്ടും അയയ്ക്കപ്പെടും. BigQuery-യിൽ ഓരോ row-യ്ക്കുമുള്ള
  `insertId`, BigQuery-യുടെ സ്വന്തം de-duplication window-യ്ക്കുള്ളിൽ മാത്രമേ ഇത് കൈകാര്യം ചെയ്യൂ; അതിനാൽ destination delete ചെയ്യുന്നതിനെക്കാൾ
  disable ചെയ്യുന്നതാണ് അഭികാമ്യം.
