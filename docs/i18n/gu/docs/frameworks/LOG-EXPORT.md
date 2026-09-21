# Log export (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute કૉલ લૉગ્સનું બાહ્ય એનાલિટિક્સ સ્ટોરમાં સતત, ઇન્ક્રિમેન્ટલ નિકાસ.

Logs ડૅશબોર્ડ ટૅબ વિનંતી ઇતિહાસને SQLite (`call_logs`)માં રાખે છે, જે રોટેશન અને રિટેન્શન દ્વારા
મર્યાદિત હોય છે. લૉગ નિકાસ એ જ રેકોર્ડ સેટને નિર્ધારિત સમયપત્રક મુજબ બહાર મોકલે છે, જેથી તે
સ્થાનિક ડેટાબેઝ કરતાં વધુ સમય સુધી જળવાઈ શકે અને અન્ય ડેટા સાથે જોડી શકાય. BigQuery પ્રથમ ગંતવ્ય છે;
પાઇપલાઇન એક રજિસ્ટ્રી છે, તેથી વધુ ગંતવ્યો ઉમેરવા સરળ છે.

---

## 1. તે કેવી રીતે કાર્ય કરે છે

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (Logs ટૅબનું ફીલ્ડ સેટ)
      → ગંતવ્ય client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **સમયપત્રક** — એક `JobRegistry` cron જોબ, `log_export`, જેનું ડિફૉલ્ટ `0 * * * *` (દર કલાકે,
  UTC) છે. `src/lib/initCloudSync.ts`માં નોંધાયેલ; `OMNIROUTE_LOG_EXPORT_CRON` વડે ઓવરરાઇડ કરી શકાય છે.
  દરેક ટિક દરેક **સક્ષમ** ગંતવ્યને ક્રમશઃ સંપૂર્ણ રીતે નિકાસ કરે છે.
- **કર્સર** — SQLiteનું ઇમ્પ્લિસિટ `call_logs.rowid`, જે દરેક ગંતવ્ય માટે
  `log_export_destinations.cursor_row_id`માં સંગ્રહિત રહે છે. `timestamp`ને ઇરાદાપૂર્વક કર્સર તરીકે
  ઉપયોગમાં લેવાતું નથી: કૉલર્સ પોતાનું મૂલ્ય આપી શકે છે, તેથી ધીમી વિનંતી તેના કરતાં મોડે શરૂ થયેલી
  ઝડપી વિનંતી પછી લખાઈ શકે છે, અને timestamp કર્સર તેને છોડી દેશે.
- **બૅચિંગ** — દરેક વિનંતી દીઠ `batch_size` પંક્તિઓ (ડિફૉલ્ટ 500), દરેક રન દીઠ
  `max_rows_per_run` પંક્તિઓ (ડિફૉલ્ટ 10000), જેથી મોટો બૅકલૉગ એક રનને અવરોધવાને બદલે
  અનેક ટિક દરમિયાન ખાલી થાય.
- **ડિલિવરી** — `send()` રિઝૉલ્વ થયા પછી જ કર્સર આગળ વધે છે. નિષ્ફળ બૅચ કર્સરને તેની હાલની
  સ્થિતિમાં જ રાખે છે, જેથી આગામી રનમાં એ જ પંક્તિઓનો ફરી પ્રયાસ થાય. આ ગૅરંટી
  ઓછામાં ઓછી એકવારની ડિલિવરી તથા ગંતવ્ય તરફના ડી-ડુપ્લિકેશનની છે, વાસ્તવિક exactly-onceની નહીં:
  BigQuery દરેક પંક્તિને call-log id દ્વારા કી કરે છે, જેને તે પોતાની ડિડુપ વિન્ડોમાં શ્રેષ્ઠ પ્રયાસના
  ધોરણે માન્ય રાખે છે.
- **ઓવરલૅપ ગાર્ડ** — cron ટિક અને `POST .../run` એકસાથે ફાયર થઈ શકે છે. પહેલેથી નિકાસ થઈ રહેલા
  ગંતવ્યને બે વાર નિકાસ કરવાને બદલે છોડી દેવામાં આવે છે (રન પરિણામમાં `skipped: true`), જેથી
  સમકાલીન રન કોઈ બૅચ ફરી મોકલી ન શકે અથવા કર્સરને પાછળ ન લખી શકે.
- **પર્જ રિકવરી** — જો `cursor_row_id`, `MAX(rowid)` કરતાં ઉપર પહોંચી જાય (આખું ટેબલ
  પર્જ થયું હોય અને rowids ફરી શરૂ થયા હોય), તો રનર કાયમ માટે ડેટા જોવાનું ચૂકી જવાને બદલે
  0 પર પાછું જાય છે.

### પેલોડ્સ (પ્રોમ્પ્ટ્સ અને કમ્પ્લીશન્સ)

ડિફૉલ્ટ રૂપે નિકાસમાં માત્ર એ સમરી ફીલ્ડ્સ હોય છે જે Logs **સૂચિ**માં દેખાય છે. **પ્રોમ્પ્ટ્સ અને પ્રતિસાદો નિકાસ કરો**
(`includeBodies`) ચાલુ કરવાથી દરેક કૉલ માટે Logs **વિગત** પેન જે બતાવે છે તે પણ મોકલવામાં આવે છે:

| ફીલ્ડ                            | તેમાં શું હોય છે                                                |
| -------------------------------- | --------------------------------------------------------------- |
| `request_body` / `response_body` | ડૅશબોર્ડ જે રીતે રેન્ડર કરે છે તે મુજબના કૉલ પેલોડ્સ            |
| `pipeline_route_decision`        | રાઉટરે કયું લક્ષ્ય અને મોડેલ પસંદ કર્યું                        |
| `pipeline_client_request`        | ક્લાયન્ટે મોકલેલી બિલકુલ મૂળ વિનંતી                             |
| `pipeline_openai_request`        | આંતરિક OpenAI સ્વરૂપમાં અનુવાદ કર્યા પછીની વિનંતી               |
| `pipeline_provider_request`      | પ્રોવાઇડર ડાયલેક્ટમાં, ખરેખર અપસ્ટ્રીમ મોકલાયેલી વિનંતી         |
| `pipeline_provider_response`     | મૂળ અપસ્ટ્રીમ પ્રતિસાદ                                          |
| `pipeline_client_response`       | કૉલરને પાછું આપવામાં આવેલું                                     |
| `pipeline_error`                 | નિષ્ફળ કૉલ માટેની પાઇપલાઇન-સ્તરની ભૂલની વિગત                    |
| `bodies_truncated`               | ઉપરના કોઈપણ ફીલ્ડે `maxBodyBytes` મર્યાદા વટાવી હોય ત્યારે True |

આ પ્રોમ્પ્ટ કન્ટેન્ટ છે, તેથી તે **ડિફૉલ્ટ રૂપે બંધ** છે અને ઇરાદાપૂર્વક દરેક ગંતવ્ય માટે અલગ પસંદગી છે.
જે મોકલાય છે તે જ ડૅશબોર્ડ બતાવે છે, કારણ કે બંને `getCallLogById` મારફતે વાંચે છે: પેલોડ્સ લખાય
ત્યારે જ તેમાંથી PII દૂર કરવામાં આવે છે અને સિક્રેટ્સ રેડેક્ટ કરવામાં આવે છે, તેમજ `noLog` API કી
વડે કરાયેલ કૉલ કોઈ પેલોડ સંગ્રહિત કરતો નથી, તેથી નિકાસ કરવા માટે કશું હોતું નથી.

દરેક પંક્તિ માટે પેલોડ્સ ફાઇલસિસ્ટમ આર્ટિફેક્ટમાંથી વાંચવામાં આવે છે, તેથી હાઇડ્રેશન માત્ર તે
ગંતવ્યો માટે જ ચાલે છે જેણે તેની વિનંતી કરી હોય. જે પંક્તિનો આર્ટિફેક્ટ ગુમ થયેલો અથવા કરપ્ટ હોય,
તે બૅચને નિષ્ફળ બનાવી કર્સરને અટકાવવાને બદલે null પેલોડ્સ સાથે પોતાની સમરી નિકાસ કરે છે.

`maxBodyBytes` (ડિફૉલ્ટ 262144) દરેક ફીલ્ડને મર્યાદિત કરે છે. લાંબા પેલોડ્સને **ડ્રૉપ કરવાને બદલે
ટ્રન્કેટ કરવામાં આવે છે** — ક્લિપ કરાયેલ પ્રોમ્પ્ટ પણ "શું પૂછવામાં આવ્યું હતું" તેનો જવાબ આપે છે — અને
પંક્તિને `bodies_truncated` વડે ચિહ્નિત કરવામાં આવે છે. સ્ટ્રીમ કરાયેલા ચંક-બાય-ચંક ડેલ્ટા નિકાસ થતા નથી;
એસેમ્બલ થયેલો પ્રતિસાદ પહેલેથી જ `pipeline_provider_response` અને `pipeline_client_response`માં હોય છે.

---

## 2. ફાઇલો

| ભાગ                    | સ્થાન                                        |
| ---------------------- | -------------------------------------------- |
| ડેસ્ટિનેશન કોન્ટ્રાક્ટ | `src/lib/logExport/types.ts`                 |
| રજિસ્ટ્રી              | `src/lib/logExport/registry.ts`              |
| સિક્રેટ હેન્ડલિંગ      | `src/lib/logExport/secrets.ts`               |
| રનર (કર્સર લૂપ)        | `src/lib/logExport/runner.ts`                |
| API પ્રોજેક્શન         | `src/lib/logExport/presenter.ts`             |
| BigQuery ડેસ્ટિનેશન    | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA ઑથ           | `src/lib/logExport/googleServiceAccount.ts`  |
| કૉલ-લૉગ સ્રોત          | `src/lib/usage/callLogExportSource.ts`       |
| પર્સિસ્ટન્સ            | `src/lib/db/logExportDestinations.ts`        |
| Cron જૉબ               | `src/lib/jobs/logExportJob.ts`               |
| REST સ્તર              | `src/app/api/log-export/`                    |
| ડૅશબોર્ડ પેજ           | `src/app/(dashboard)/dashboard/log-export/`  |

સ્કીમા: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

બધા રૂટ્સ મેનેજમેન્ટ-ઑથેન્ટિકેટેડ (`requireManagementAuth`) છે. સિક્રેટ્સ ક્યારેય પરત કરવામાં આવતાં નથી:
સંગ્રહિત સિક્રેટ શાબ્દિક મૂલ્ય `__stored__` તરીકે પરત આવે છે, અને અપડેટ વખતે એ મૂલ્ય પાછું મોકલવાથી
સંગ્રહિત ક્રેડેન્શિયલ જળવાઈ રહે છે.

જે ડેસ્ટિનેશનના પ્રકારમાં સિક્રેટ જાહેર કરવામાં આવ્યું હોય તેને બનાવવા અથવા અપડેટ કરવા માટે
**`STORAGE_ENCRYPTION_KEY` આવશ્યક છે**. તેના વિના `encrypt()` કોઈ સૂચના આપ્યા વગર પાસથ્રૂ કરે છે,
તેથી SQLiteમાં ક્રેડેન્શિયલને પ્લેઇનટેક્સ્ટમાં મૂકવાને બદલે રાઇટને 400 સાથે નકારવામાં આવે છે (Telegram
વેબહૂક પણ આ જ સુરક્ષા લાગુ કરે છે).

| પદ્ધતિ   | પાથ                                      | હેતુ                                              |
| -------- | ---------------------------------------- | ------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | ડેસ્ટિનેશનના પ્રકારો + તેમની કૉન્ફિગ ફીલ્ડની સૂચિ |
| `GET`    | `/api/log-export/destinations`           | ડેસ્ટિનેશન્સની સૂચિ (સિક્રેટ્સ ઢાંકેલા)           |
| `POST`   | `/api/log-export/destinations`           | ડેસ્ટિનેશન બનાવવું                                |
| `GET`    | `/api/log-export/destinations/{id}`      | એક ડેસ્ટિનેશન વાંચવું                             |
| `PUT`    | `/api/log-export/destinations/{id}`      | નામ / સક્ષમ સ્થિતિ / કૉન્ફિગ / બૅચિંગ અપડેટ કરવું |
| `DELETE` | `/api/log-export/destinations/{id}`      | કાઢી નાખવું                                       |
| `POST`   | `/api/log-export/destinations/{id}/test` | ક્રેડેન્શિયલ્સ ચકાસવાં, કશું લખવું નહીં           |
| `POST`   | `/api/log-export/destinations/{id}/run`  | હમણાં ડ્રેઇન કરવું, શેડ્યૂલ્ડ રન જેવો જ પાથ       |
| `GET`    | `/api/log-export/status`                 | Cron સ્થિતિ, તાજેતરના રન્સ, દરેક ટાર્ગેટનો બૅકલૉગ |

`GET /api/log-export/types` UIને સામાન્ય બનાવે છે: ડૅશબોર્ડ ફોર્મ પરત મળેલા
ફીલ્ડ ડિસ્ક્રિપ્ટર્સ પરથી રેન્ડર થાય છે, તેથી નવા ડેસ્ટિનેશન માટે UIમાં કોઈ ફેરફાર જરૂરી નથી.

---

## 4. BigQuery ડેસ્ટિનેશન

કૉન્ફિગ કીઝ (`type: "bigquery"`):

| કી                   | નોંધો                                                                   |
| -------------------- | ----------------------------------------------------------------------- |
| `projectId`          | ડેટાસેટ ધરાવતો GCP પ્રોજેક્ટ                                            |
| `datasetId`          | `[A-Za-z0-9_]+`                                                         |
| `tableId`            | `[A-Za-z0-9_]+`                                                         |
| `location`           | ડેટાસેટ બનાવવો પડે ત્યારે જ વપરાય છે (ડિફૉલ્ટ `EU`)                     |
| `serviceAccountJson` | સર્વિસ-એકાઉન્ટ કી. સિક્રેટ: સંગ્રહ વખતે એન્ક્રિપ્ટેડ, ક્યારેય પરત ન થાય |
| `autoCreate`         | પ્રથમ એક્સપોર્ટ વખતે ડેટાસેટ અને ટેબલ બનાવવાં (ડિફૉલ્ટ `true`)          |

સર્વિસ એકાઉન્ટને ટાર્ગેટ ટેબલ પર `bigquery.tables.updateData`ની જરૂર છે, તેમજ
`autoCreate` ચાલુ હોય ત્યારે `bigquery.datasets.create` / `bigquery.tables.create`ની જરૂર છે.

કૉન્ફિગર કરેલ બૅચ એ **કર્સર** યુનિટ છે, HTTP યુનિટ નહીં: `send()` તેને વધુમાં વધુ 500 રોની
insertAll કૉલ્સમાં વહેંચે છે, તેથી મોટું `batch_size` BigQueryની 10 MB રિક્વેસ્ટ મર્યાદાને વટાવી શકતું
નથી. અસ્થાયી સ્ટેટસ (408/429/500/502/503/504) માટે, એ જ insertIds ફરી વાપરીને એક્સ્પોનેન્શિયલ
બૅકઑફ સાથે વધુમાં વધુ ત્રણ વખત ફરી પ્રયાસ કરવામાં આવે છે; ઑથ અને સ્કીમાની નિષ્ફળતાઓ પ્રથમ પ્રયાસે
જ થ્રો થાય છે, જેથી રન બિનજરૂરી રીતે વેડફાતો નથી.

થોડી ક્ષણો પહેલાં બનાવેલું ટેબલ હજી સ્ટ્રીમિંગ એન્ડપોઇન્ટને દેખાતું નથી, જે થોડી સેકન્ડ માટે
404નો જવાબ આપે છે. તે 404 માટે ફરી પ્રયાસ થાય છે, પરંતુ **ફક્ત જ્યારે આ રનમાં ટેબલ બનાવવામાં આવ્યું હોય** —
ખરેખર ગેરહાજર ટેબલ માટે તરત નિષ્ફળતા થાય છે. નોંધો કે તાજેતરમાં કાઢી નાખેલા નામ હેઠળ ટેબલ ફરી
બનાવવાથી BigQuery કેટલાંક મિનિટ સુધી સ્ટ્રીમિંગ ઇન્સર્ટ્સ નકારે છે; આ delete-then-recreateની
લાક્ષણિકતા છે, તેથી ટેબલને કાઢીને ફરી ઉમેરવાને બદલે નવું ટેબલ નામ વાપરવાનું પસંદ કરો.

**આંશિક નિષ્ફળતા HTTP 200 તરીકે, ખાલી ન હોય તેવા `insertErrors[]` સાથે આવે છે.** તેને નિષ્ફળતા
ગણીને થ્રો કરવામાં આવે છે, જેના કારણે BigQueryએ ક્યારેય સ્વીકારી ન હોય તેવી રોઝથી આગળ કર્સર વધતો
અટકે છે; `tests/unit/log-export-bigquery.test.ts` આ વર્તનને નિશ્ચિત કરે છે.

ટ્રાન્સપોર્ટ સાદો REST છે — સ્વ-હસ્તાક્ષરિત RS256 અસર્શનને
`https://oauth2.googleapis.com/token` પર ઍક્સેસ ટોકન માટે એક્સચેન્જ કરવામાં આવે છે, ત્યારબાદ રોઝ
`tabledata.insertAll` પર જાય છે. કોઈ Google SDK સામેલ કરવામાં આવ્યું નથી. ઍક્સેસ ટોકન્સ દરેક
(સર્વિસ એકાઉન્ટ, સ્કોપ) માટે ઇન-પ્રોસેસ કૅશ થાય છે.

બનાવેલા ટેબલમાં Logs-ટૅબના દરેક ફીલ્ડ માટે એક કૉલમ ઉપરાંત `exported_at` હોય છે, અને કૉલ લૉગ્સ
વાસ્તવમાં કેવી રીતે ક્વેરી કરવામાં આવે છે તેના માટે તેને આ પ્રમાણે ગોઠવવામાં આવે છે:

- **`timestamp` પર દિવસ મુજબ પાર્ટિશન કરેલું**, જેથી તારીખની મર્યાદામાં બંધાયેલી ક્વેરી માત્ર તે દિવસો જ સ્કૅન કરે.
- **`api_key_name`, `provider`, `model`, `status` દ્વારા ક્લસ્ટર કરેલું** (આ ક્રમમાં), જેથી કોણે તેને
  ચલાવ્યું, તે ક્યાં ગયું, અથવા તે નિષ્ફળ થયું કે નહીં તેના આધારે ફિલ્ટર કરવાથી દરેક પાર્ટિશનની અંદરના
  બ્લૉક્સ પ્રૂન થાય. BigQuery વધુમાં વધુ ચાર ક્લસ્ટરિંગ કૉલમ્સની મંજૂરી આપે છે અને ક્રમ મહત્વનો છે:
  ફક્ત `api_key_name` પરનું ફિલ્ટર પ્રૂન કરે છે, જ્યારે ફક્ત `status` પરનું ફિલ્ટર કરતું નથી.
- **વૈકલ્પિક પાર્ટિશન રિટેન્શન** `partitionExpirationDays` દ્વારા (`0` બધું જાળવી રાખે છે), જે
  ટેબલ બનાવતી વખતે લાગુ થાય છે.

બંને સેટિંગ્સ બનાવવાના સમયે લાગુ થાય છે. હાલનું ટેબલ તેની પાસે પહેલેથી જે લેઆઉટ છે તે જાળવી રાખે છે, તેથી
જો તમે તેમને અપનાવવા માંગતા હો, તો ગંતવ્યને નવા ટેબલ id તરફ નિર્દેશ કરો.

`tests/unit/log-export-bigquery.test.ts` ખાતરી કરે છે કે મેપર અને ટેબલ સ્કીમા સુસંગત રહે,
જેથી નવો કૉલ-લૉગ કૉલમ બહાર મોકલતી વખતે ચૂપચાપ છૂટી ન જાય.

બેચને પંક્તિઓની સંખ્યા અને સિરિયલાઇઝ કરેલા બાઇટ્સ **બંને** મુજબ ભાગોમાં વહેંચવામાં આવે છે. પેલોડ્સ એક્સપોર્ટ કરવામાં આવે ત્યારે
માત્ર પંક્તિઓની સંખ્યા પૂરતી નથી: પ્રોમ્પ્ટ્સ ધરાવતી 500 પંક્તિઓ દસેક મેગાબાઇટ્સની હોઈ શકે છે, અને insertAll
10 MBથી મોટી રિક્વેસ્ટને નકારે છે. 500 પંક્તિઓ અથવા 9 MBમાંથી જે મર્યાદા પહેલાં આવે ત્યારે ચંક બંધ થાય છે.

---

## 5. ગંતવ્ય ઉમેરવું

1. `LogExportDestinationType` export કરતી `src/lib/logExport/destinations/<name>.ts` બનાવો:
   UI માટે Zod `configSchema`, `fields` descriptor array, `secretFields`, અને
   `test()` / `prepare()` / `send(records)` પરત કરતું `createClient(config)`.
2. તેને `src/lib/logExport/registry.ts` માંની `DESTINATIONS` array માં ઉમેરો.
3. `tests/unit/` હેઠળ tests લખો.

આટલો જ સમગ્ર ફેરફાર છે: persistence, cron job, REST layer, secret encryption અને
dashboard form—આ બધાં registry વાંચે છે.

નવા ગંતવ્ય માટેના બે નિયમો:

- આંશિક નિષ્ફળતા પર `send()` એ **અવશ્ય throw કરવું જોઈએ**. Resolve થવાનો અર્થ છે કે "ગંતવ્ય પાસે આ rows છે",
  અને cursor કાયમ માટે તેમની આગળ વધી જાય છે.
- User-supplied URL લેતું ગંતવ્ય fetching પહેલાં તેને
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) દ્વારા validate કરવું જ જોઈએ,
  જેમ webhooks કરે છે એ જ રીતે. BigQuery માટે આ જરૂરી નથી: તેના hosts constants છે.

---

## 6. તેનું સંચાલન

- **Dashboard**: Integrations → Log export. ગંતવ્ય ઉમેરો, rows લખ્યા વિના credentials
  ચકાસવા માટે **Test** ચલાવો અને પછી તેને enable કરો.
- **Backlog**: દરેક destination card pending rows અને cursor દર્શાવે છે; `GET
/api/log-export/status` એ જ આંકડાઓ સાથે છેલ્લાં 20 job runs પણ પરત કરે છે.
- **નિષ્ફળ થતું ગંતવ્ય અન્ય ગંતવ્યોને નિષ્ફળ કરતું નથી** — run summary દરેક ગંતવ્યની
  status ને `last_status` / `last_error` માં નોંધે છે, અને job run history aggregate જાળવી રાખે છે.
- **ગંતવ્ય delete કરવાથી તેનો cursor પણ delete થાય છે.** તેને ફરી ઉમેરવાથી સૌથી જૂના જાળવી રાખેલા
  call log થી શરૂઆત થાય છે, જેના કારણે ગંતવ્ય પાસે પહેલેથી હોઈ શકે તે rows ફરી મોકલાય છે. BigQuery માં દરેક row માટેનું
  `insertId` માત્ર BigQuery ની પોતાની de-duplication window ની અંદર જ તેને સંભાળે છે, તેથી ગંતવ્યને delete કરવાને બદલે
  disable કરવાનું વધુ યોગ્ય છે.
