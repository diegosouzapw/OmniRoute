# Log export (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Esportazzjoni kontinwa u inkrementali tar-reġistri tas-sejħiet ta’ OmniRoute lejn maħżen estern tal-analitika.

It-tab tad-dashboard Logs iżomm l-istorja tat-talbiet f’SQLite (`call_logs`), li hija limitata mir-
rotazzjoni u ż-żamma. L-esportazzjoni tar-reġistri tibgħat l-istess sett ta’ rekords skont skeda sabiex ikun jista’ jibqa’ jeżisti lil hinn
mid-database lokali u jingħaqad ma’ data oħra. BigQuery hija l-ewwel destinazzjoni; il-
pipeline huwa reġistru, għalhekk jistgħu jiżdiedu aktar destinazzjonijiet.

---

## 1. Kif jaħdem

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (is-sett ta’ fields tat-tab Logs)
      → il-klijent tad-destinazzjoni.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Skeda** — job cron wieħed ta’ `JobRegistry`, `log_export`, bil-valur predefinit `0 * * * *` (kull siegħa,
  UTC). Irreġistrat f’`src/lib/initCloudSync.ts`; jista’ jinbidel b’`OMNIROUTE_LOG_EXPORT_CRON`.
  Kull tick ibattal kull destinazzjoni **attivata**, waħda wara l-oħra.
- **Cursor** — il-`call_logs.rowid` impliċitu ta’ SQLite, ippersistit għal kull destinazzjoni f’
  `log_export_destinations.cursor_row_id`. `timestamp` deliberatament mhuwiex il-cursor: min jagħmel is-sejħa
  jista’ jipprovdi l-valur tiegħu stess, għalhekk talba bil-mod tista’ tinkiteb wara waħda aktar mgħaġġla li bdiet
  aktar tard, u cursor ibbażat fuq timestamp jaqbiżha.
- **Tqassim f’lottijiet** — `batch_size` ringieli għal kull talba (valur predefinit 500), `max_rows_per_run` ringieli għal kull eżekuzzjoni
  (valur predefinit 10000) sabiex ammont kbir ta’ xogħol pendenti jitbattal fuq diversi ticks minflok jimblokka eżekuzzjoni waħda.
- **Konsenja** — il-cursor javvanza biss wara li `send()` jiġi riżolt. Lott li jfalli jħalli l-
  cursor fejn kien, sabiex l-istess ringieli jerġgħu jiġu ppruvati fl-eżekuzzjoni li jmiss. Il-garanzija hija
  ta’ mill-inqas darba flimkien mat-tneħħija tad-duplikati min-naħa tad-destinazzjoni, mhux eżattament darba tassew: BigQuery jidentifika kull
  ringiela bl-id tar-reġistru tas-sejħa, li jirrispetta fuq bażi tal-aħjar sforz possibbli fi ħdan it-tieqa tiegħu stess għat-tneħħija tad-duplikati.
- **Protezzjoni kontra sovrappożizzjoni** — it-tick cron u `POST .../run` jistgħu jiġu attivati flimkien. Destinazzjoni
  li tkun diġà qed titbattal tinqabeż minflok titbattal darbtejn (`skipped: true` fir-riżultat tal-eżekuzzjoni),
  sabiex eżekuzzjoni konkorrenti ma tkunx tista’ terġa’ tibgħat lott jew tikteb il-cursor lura.
- **Irkupru wara t-tindif** — jekk `cursor_row_id` jispiċċa ’l fuq minn `MAX(rowid)` (it-tabella kollha tkun
  tnaddfet u r-rowids reġgħu bdew mill-bidu), ir-runner jirritorna għal 0 minflok jibqa’ permanentement ma jistax jara rekords ġodda.

### Payloads (prompts u completions)

B’mod predefinit, l-esportazzjoni ġġorr biss il-fields tas-sommarju li turi l-**lista** ta’ Logs. Meta tiġi attivata
**Esporta prompts u responses** (`includeBodies`) jintbagħat ukoll dak li juri l-pane tad-**dettalji**
ta’ Logs għal kull sejħa:

| Field                            | X’fih                                                             |
| -------------------------------- | ----------------------------------------------------------------- |
| `request_body` / `response_body` | Il-payloads tas-sejħa kif jirrendihom id-dashboard                |
| `pipeline_route_decision`        | Liema target u model għażel ir-router                             |
| `pipeline_client_request`        | It-talba mhux ipproċessata eżatt kif bagħatha l-klijent           |
| `pipeline_openai_request`        | Wara t-traduzzjoni għall-forma interna ta’ OpenAI                 |
| `pipeline_provider_request`      | Kif intbagħtet fil-fatt upstream, fid-djalett tal-provider        |
| `pipeline_provider_response`     | Ir-response upstream mhux ipproċessata                            |
| `pipeline_client_response`       | Dak li ngħata lura lil min għamel is-sejħa                        |
| `pipeline_error`                 | Dettalji dwar żball fil-livell tal-pipeline għal sejħa li falliet |
| `bodies_truncated`               | Veru meta xi field hawn fuq laħaq `maxBodyBytes`                  |

Dan huwa kontenut tal-prompt, għalhekk huwa **diżattivat b’mod predefinit** u deliberatament huwa għażla għal kull destinazzjoni.
Dak li jintbagħat huwa dak li juri d-dashboard, għax it-tnejn jaqraw permezz ta’ `getCallLogById`: il-payloads ikunu
diġà ġew sanitizzati minn PII u s-sigrieti jkunu ġew moħbija meta jinkitbu, u sejħa magħmula b’
API key `noLog` ma taħżen ebda payload, għalhekk ma jkun hemm xejn x’jiġi esportat.

Il-payloads jinqraw għal kull ringiela mill-artefatt tas-filesystem, għalhekk l-idratazzjoni ssir biss għad-destinazzjonijiet
li talbuha. Ringiela li l-artefatt tagħha jkun nieqes jew korrott tesporta s-sommarju tagħha b’payloads null
minflok ma tfalli l-lott u tħalli l-cursor imwaħħal.

`maxBodyBytes` (valur predefinit 262144) jillimita kull field. Payloads itwal jiġu **maqtugħa minflok
jitħallew barra** — prompt maqtugħ xorta jwieġeb “x’intalab” — u r-ringiela tiġi mmarkata b’
`bodies_truncated`. Deltas streamed biċċa biċċa ma jiġux esportati; ir-response immuntata
tkun diġà f’`pipeline_provider_response` u `pipeline_client_response`.

---

## 2. Fajls

| Biċċa                         | Post                                         |
| ----------------------------- | -------------------------------------------- |
| Kuntratt tad-destinazzjoni    | `src/lib/logExport/types.ts`                 |
| Reġistru                      | `src/lib/logExport/registry.ts`              |
| Ġestjoni tas-sigrieti         | `src/lib/logExport/secrets.ts`               |
| Eżekutur (ċiklu tal-cursor)   | `src/lib/logExport/runner.ts`                |
| Projezzjoni tal-API           | `src/lib/logExport/presenter.ts`             |
| Destinazzjoni BigQuery        | `src/lib/logExport/destinations/bigquery.ts` |
| Awtentikazzjoni Google SA     | `src/lib/logExport/googleServiceAccount.ts`  |
| Sors tar-reġistru tas-sejħiet | `src/lib/usage/callLogExportSource.ts`       |
| Persistenza                   | `src/lib/db/logExportDestinations.ts`        |
| Kompitu cron                  | `src/lib/jobs/logExportJob.ts`               |
| Saff REST                     | `src/app/api/log-export/`                    |
| Paġna tad-dashboard           | `src/app/(dashboard)/dashboard/log-export/`  |

Skema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Ir-rotot kollha huma awtentikati għall-ġestjoni (`requireManagementAuth`). Is-sigrieti qatt ma jintbagħtu lura:
sigriet maħżun jintbagħat lura bħala l-valur litterali `__stored__`, u jekk dan il-valur jerġa' jintbagħat f'aġġornament
il-kredenzjali maħżuna tinżamm.

Il-ħolqien jew l-aġġornament ta' destinazzjoni li t-tip tagħha jiddikjara sigriet **jeħtieġ
`STORAGE_ENCRYPTION_KEY`**. Mingħajrha, `encrypt()` sempliċement jgħaddi l-valur mingħajr tibdil u mingħajr twissija, għalhekk il-kitba
tiġi rrifjutata b'400 minflok ma titqiegħed kredenzjali fi SQLite bħala test mhux kriptat (l-istess protezzjoni li
japplika l-webhook ta' Telegram).

| Metodu   | Mogħdija                                 | Għan                                                                     |
| -------- | ---------------------------------------- | ------------------------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | Tipi ta' destinazzjoni + il-lista tal-oqsma tal-konfigurazzjoni tagħhom  |
| `GET`    | `/api/log-export/destinations`           | Elenka d-destinazzjonijiet (is-sigrieti moħbija)                         |
| `POST`   | `/api/log-export/destinations`           | Oħloq destinazzjoni                                                      |
| `GET`    | `/api/log-export/destinations/{id}`      | Aqra waħda                                                               |
| `PUT`    | `/api/log-export/destinations/{id}`      | Aġġorna l-isem / l-istat attivat / il-konfigurazzjoni / ir-raggruppament |
| `DELETE` | `/api/log-export/destinations/{id}`      | Ħassar                                                                   |
| `POST`   | `/api/log-export/destinations/{id}/test` | Ittestja l-kredenzjali, mingħajr ma tikteb xejn                          |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Battal issa, bl-istess mogħdija bħall-eżekuzzjoni skedata                |
| `GET`    | `/api/log-export/status`                 | Stat tal-cron, eżekuzzjonijiet riċenti, xogħol pendenti għal kull mira   |

`GET /api/log-export/types` huwa dak li jagħmel l-UI ġenerika: il-formola tad-dashboard tiġi rrendjata mid-deskrizzjonijiet
tal-oqsma mibgħuta lura, għalhekk destinazzjoni ġdida ma teħtieġ ebda bidla fl-UI.

---

## 4. Destinazzjoni BigQuery

Ċwievet tal-konfigurazzjoni (`type: "bigquery"`):

| Ċavetta              | Noti                                                                                   |
| -------------------- | -------------------------------------------------------------------------------------- |
| `projectId`          | Il-proġett GCP li fih jinsab id-dataset                                                |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                        |
| `tableId`            | `[A-Za-z0-9_]+`                                                                        |
| `location`           | Tintuża biss meta d-dataset ikollu jinħoloq (valur predefinit `EU`)                    |
| `serviceAccountJson` | Ċavetta tal-kont tas-servizz. Sigriet: kriptata waqt il-ħażna, qatt ma tintbagħat lura |
| `autoCreate`         | Oħloq id-dataset u t-tabella mal-ewwel esportazzjoni (valur predefinit `true`)         |

Il-kont tas-servizz jeħtieġ `bigquery.tables.updateData` fuq it-tabella fil-mira, flimkien ma'
`bigquery.datasets.create` / `bigquery.tables.create` meta `autoCreate` jkun attivat.

Lott ikkonfigurat huwa unità tal-**cursor**, mhux waħda HTTP: `send()` jaqsmu f'sejħiet insertAll
ta' mhux aktar minn 500 ringiela, għalhekk `batch_size` kbir ma jistax jaqbeż il-limitu ta' 10 MB għal talba ta' BigQuery.
L-istatus temporanji (408/429/500/502/503/504) jerġgħu jiġu ppruvati sa tliet darbiet b'dewmien
esponenzjali, bl-istess insertIds jerġgħu jintużaw; il-fallimenti tal-awtentikazzjoni u tal-iskema joħolqu eċċezzjoni mal-ewwel tentattiv minflok
ma jaħlu l-eżekuzzjoni.

Tabella li tkun għadha kemm inħolqot ma tkunx għadha viżibbli għall-endpoint tal-istreaming, li jirrispondi
b'404 għal ftit sekondi. Dak l-404 jerġa' jiġi ppruvat, iżda **biss meta din l-eżekuzzjoni tkun ħolqot it-tabella** —
tabella li tkun tassew nieqsa xorta tfalli minnufih. Innota li l-ħolqien mill-ġdid ta' tabella taħt isem li
reċentement tħassar iwassal biex BigQuery jirrifjuta inserts permezz ta' streaming għal diversi minuti; din hija
karatteristika tat-tħassir segwit mill-ħolqien mill-ġdid, għalhekk ippreferi isem ġdid għat-tabella minflok tħassar u terġa' żżid waħda.

**Falliment parzjali jasal bħala HTTP 200 b'`insertErrors[]` mhux vojt.** Dan jiġi ttrattat bħala
falliment u joħloq eċċezzjoni, li twaqqaf il-cursor milli javvanza lil hinn mir-ringieli li BigQuery qatt ma
aċċetta; `tests/unit/log-export-bigquery.test.ts` jiffissa dan l-aġir.

It-trasport juża REST sempliċi — asserzjoni RS256 iffirmata minnha nnifisha tiġi skambjata għal token ta' aċċess fuq
`https://oauth2.googleapis.com/token`, imbagħad ir-ringieli jintbagħtu lil `tabledata.insertAll`. Ma jiżdied ebda SDK ta'
Google. It-tokens ta' aċċess jinżammu fil-cache fil-proċess għal kull (kont tas-servizz, kamp ta' applikazzjoni).

It-tabella maħluqa jkollha kolonna waħda għal kull qasam fit-tab Logs flimkien ma' `exported_at`, u tkun organizzata skont
kif fil-fatt jiġu kkonsultati r-reġistri tas-sejħiet:

- **Maqsuma skont il-jum fuq `timestamp`**, sabiex mistoqsija limitata bid-data tiskannja biss dawk il-jiem.
- **Miġbura skont `api_key_name`, `provider`, `model`, `status`** (f'dik l-ordni), sabiex l-iffiltrar skont
  min eżegwiha, fejn marret, jew jekk fallietx jeskludi blokok f'kull partizzjoni. BigQuery
  jippermetti mhux aktar minn erba' kolonni ta' raggruppament u l-ordni hija importanti: filtru fuq `api_key_name` waħdu
  jeskludi, filwaqt li filtru fuq `status` waħdu ma jagħmilx dan.
- **Żamma fakultattiva tal-partizzjonijiet** permezz ta' `partitionExpirationDays` (0 iżomm kollox), applikata
  meta tinħoloq it-tabella.

Iż-żewġ settings japplikaw fil-ħin tal-ħolqien. Tabella eżistenti żżomm it-tqassim li diġà għandha, għalhekk
ippunta d-destinazzjoni lejn id ta' tabella ġdida jekk trid tadottahom.

`tests/unit/log-export-bigquery.test.ts` jiżgura li l-mapper u l-iskema tat-tabella jibqgħu
sinkronizzati, sabiex kolonna ġdida tar-reġistru tas-sejħiet ma tkunx tista' titħalla barra fis-skiet waqt l-esportazzjoni.

Il-lottijiet jinqasmu skont **kemm** l-għadd ta' ringieli **kif ukoll** il-bytes serializzati. L-għadd ta' ringieli waħdu mhuwiex biżżejjed
ladarba l-payloads jiġu esportati: 500 ringiela li jġorru prompts jistgħu jammontaw għal għexieren ta' megabytes, u insertAll
jirrifjuta talba ta' aktar minn 10 MB. Il-biċċiet jingħalqu meta jilħqu 500 ringiela jew 9 MB, skont liema jiġi l-ewwel.

---

## 5. Żieda ta' destinazzjoni

1. Oħloq `src/lib/logExport/destinations/<name>.ts` li jesporta `LogExportDestinationType`:
   `configSchema` ta' Zod, array ta' deskritturi `fields` għall-UI, `secretFields`, u
   `createClient(config)` li jirritorna `test()` / `prepare()` / `send(records)`.
2. Żidha mal-array `DESTINATIONS` f'`src/lib/logExport/registry.ts`.
3. Ikteb tests taħt `tests/unit/`.

Din hija l-bidla kollha: il-persistenza, il-job cron, is-saff REST, il-kriptaġġ tas-sigrieti u
l-formola tad-dashboard kollha jaqraw mir-reġistru.

Żewġ regoli għal destinazzjoni ġdida:

- `send()` **għandu joħroġ eċċezzjoni** f'każ ta' falliment parzjali. Jekk jitlesta b'suċċess, dan ifisser "id-destinazzjoni għandha dawn ir-ringieli",
  u l-cursor jgħaddi lil hinn minnhom b'mod permanenti.
- Destinazzjoni li tieħu URL ipprovdut mill-utent trid tivvalidah permezz ta'
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) qabel tagħmel fetch,
  bl-istess mod bħall-webhooks. BigQuery m'għandux bżonn dan: il-hosts tiegħu huma kostanti.

---

## 6. Kif tħaddmu

- **Dashboard**: Integrations → Log export. Żid destinazzjoni, ħaddem **Test** biex tiċċekkja l-kredenzjali
  mingħajr ma tikteb ringieli, imbagħad attivaha.
- **Backlog**: kull karta tad-destinazzjoni turi r-ringieli pendenti u l-cursor; `GET
/api/log-export/status` jirritorna l-istess ċifri flimkien mal-aħħar 20 eżekuzzjoni tal-job.
- **Destinazzjoni li tfalli ma ġġiegħelx lill-oħrajn ifallu** — is-sommarju tal-eżekuzzjoni jirreġistra l-istatus għal kull destinazzjoni
  f'`last_status` / `last_error`, u l-istorja tal-eżekuzzjonijiet tal-job iżżomm ir-riżultat aggregat.
- **Meta tħassar destinazzjoni, jitħassar il-cursor tagħha.** Jekk terġa' żżidha, tibda mill-eqdem
  call log miżmum, u għalhekk jerġgħu jintbagħtu ringieli li d-destinazzjoni jista' jkun li diġà għandha. Fuq BigQuery, il-`insertId`
  għal kull ringiela jassorbi dan biss fil-perjodu ta' deduplikazzjoni ta' BigQuery stess, għalhekk aħjar
  tiddiżattiva destinazzjoni milli tħassarha.
