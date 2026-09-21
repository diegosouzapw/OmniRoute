# Log export (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Fitar da rajistan kiran OmniRoute zuwa ma'ajiyar nazari ta waje secara ci gaba kuma a matakai.

Shafin dashboard na Logs yana adana tarihin buƙatu a SQLite (`call_logs`), wanda ake iyakancewa ta hanyar
juyawa da tsare bayanai. Fitar da rajista tana aika wannan tarin bayanan a kan jadawali domin ya daɗe fiye da
ma'ajiyar bayanai ta gida kuma a iya haɗa shi da wasu bayanai. BigQuery ita ce manufa ta farko;
bututun sarrafawar rajista ne, don haka za a iya ƙara ƙarin wuraren manufa.

---

## 1. Yadda yake aiki

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (tarin filayen shafin Logs)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Jadawali** — aikin cron guda ɗaya na `JobRegistry`, `log_export`, wanda tsohon saitinsa shi ne `0 * * * *` (kowace awa,
  UTC). Ana yi masa rajista a `src/lib/initCloudSync.ts`; ana iya sauya shi da `OMNIROUTE_LOG_EXPORT_CRON`.
  Kowane zagaye yana kwashe bayanan kowace manufa da aka **kunna**, ɗaya bayan ɗaya.
- **Manunin matsayi** — `call_logs.rowid` na ɓoye na SQLite, wanda ake adanawa ga kowace manufa a
  `log_export_destinations.cursor_row_id`. Da gangan ba a amfani da `timestamp` a matsayin manunin matsayi: masu kira
  na iya samar da ƙimarsu da kansu, don haka ana iya rubuta buƙata mai jinkiri bayan wata mai sauri da ta fara
  daga baya, kuma manunin matsayi na timestamp zai tsallake ta.
- **Rarrabawa rukuni-rukuni** — layukan `batch_size` a kowace buƙata (tsohon saiti 500), layukan `max_rows_per_run` a kowane aiki
  (tsohon saiti 10000) domin a kwashe babban tarin bayanan da suka jira a zagaye da dama maimakon ya toshe guda ɗaya.
- **Isarwa** — manunin matsayi yana matsawa ne kawai bayan `send()` ya kammala. Rukuni da ya gaza yana barin
  manunin matsayi a inda yake, don haka za a sake gwada waɗannan layuka a aiki na gaba. Tabbacin shi ne
  isarwa-aƙalla-sau-ɗaya tare da cire maimaituwa a ɓangaren manufa, ba ainihin isarwa-sau-ɗaya-takal ba: BigQuery yana sanya wa kowane
  layi maɓalli ta amfani da id na rajistan kiran, wanda yake mutuntawa bisa ƙoƙarin da ya fi dacewa a cikin tazarar cire maimaituwarsa.
- **Kariyar cinkoso** — zagayen cron da `POST .../run` na iya faruwa tare. Ana tsallake manufa
  da ake kan kwashewa maimakon a kwashe ta sau biyu (`skipped: true` a sakamakon aikin),
  don haka aikin da ke gudana a lokaci guda ba zai iya sake aika rukuni ko mayar da manunin matsayi baya ba.
- **Farfadowa bayan gogewa** — idan `cursor_row_id` ya kasance sama da `MAX(rowid)` (an
  goge dukan teburin kuma rowids suka sake farawa), mai gudanarwar yana mayar da shi zuwa 0 maimakon ya daina ganin bayanai har abada.

### Abubuwan da ake aikawa (umarnin shigarwa da amsoshi)

A tsohon saiti, fitarwar tana ɗauke ne kawai da filayen taƙaitawa da **jerin** Logs yake nunawa. Kunna
**Fitar da umarnin shigarwa da amsoshi** (`includeBodies`) yana kuma aika abin da sashen **cikakkun bayanai**
na Logs yake nunawa ga kowane kira:

| Fili                             | Abin da yake ƙunshe da shi                                      |
| -------------------------------- | --------------------------------------------------------------- |
| `request_body` / `response_body` | Bayanan kiran kamar yadda dashboard yake nuna su                |
| `pipeline_route_decision`        | Manufa da samfurin da na'urar zaɓar hanya ta zaɓa               |
| `pipeline_client_request`        | Ainihin buƙatar yadda abokin ciniki ya aiko ta                  |
| `pipeline_openai_request`        | Bayan fassara zuwa tsarin OpenAI na ciki                        |
| `pipeline_provider_request`      | Yadda aka aika ta zuwa sama a zahiri, cikin tsarin mai samarwa  |
| `pipeline_provider_response`     | Ainihin amsar daga sama                                         |
| `pipeline_client_response`       | Abin da aka mayar wa mai kira                                   |
| `pipeline_error`                 | Cikakken kuskuren matakin bututun sarrafawa na kiran da ya gaza |
| `bodies_truncated`               | Gaskiya idan wani fili a sama ya kai `maxBodyBytes`             |

Wannan abun cikin umarnin shigarwa ne, don haka a tsohon saiti yana **kashe**, kuma da gangan zaɓi ne na kowace manufa.
Abin da ake aikawa shi ne abin da dashboard yake nunawa, saboda dukansu suna karantawa ta `getCallLogById`: an riga an
tsabtace bayanan PII kuma an ɓoye sirrika lokacin rubuta su, sannan kiran da aka yi da
maɓallin API na `noLog` ba ya adana wani bayanin da aka aika ko kaɗan, don haka babu abin da za a fitar.

Ana karanta bayanan da ake aikawa na kowane layi daga fayil ɗin artifact na filesystem, don haka cika bayanai yana gudana ne kawai ga wuraren manufa
da suka buƙace shi. Layi wanda artifact ɗinsa ya ɓace ko ya lalace yana fitar da taƙaitawarsa tare da
bayanan da aka aika na null maimakon ya sa rukunin ya gaza ya kuma makale manunin matsayi.

`maxBodyBytes` (tsohon saiti 262144) yana iyakance kowane fili. Ana **datse** bayanai masu tsawo maimakon
watsar da su — umarnin shigarwa da aka datse har yanzu yana amsa "me aka tambaya" — kuma ana yi wa layin alama da
`bodies_truncated`. Ba a fitar da deltas da aka watsa guntu-guntu; haɗaɗɗiyar amsar ta riga ta kasance
a `pipeline_provider_response` da `pipeline_client_response`.

---

## 2. Fayiloli

| Ɓangare                         | Wuri                                         |
| ------------------------------- | -------------------------------------------- |
| Kwangilar manufa                | `src/lib/logExport/types.ts`                 |
| Rajista                         | `src/lib/logExport/registry.ts`              |
| Sarrafa sirri                   | `src/lib/logExport/secrets.ts`               |
| Mai gudanarwa (madaukin cursor) | `src/lib/logExport/runner.ts`                |
| Tsarin fitarwa na API           | `src/lib/logExport/presenter.ts`             |
| Manufar BigQuery                | `src/lib/logExport/destinations/bigquery.ts` |
| Tantancewar Google SA           | `src/lib/logExport/googleServiceAccount.ts`  |
| Tushen rajistan kira            | `src/lib/usage/callLogExportSource.ts`       |
| Adana bayanai                   | `src/lib/db/logExportDestinations.ts`        |
| Aikin Cron                      | `src/lib/jobs/logExportJob.ts`               |
| Matakin REST                    | `src/app/api/log-export/`                    |
| Shafin dashboard                | `src/app/(dashboard)/dashboard/log-export/`  |

Tsarin bayanai: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Duk hanyoyin suna buƙatar tantancewar gudanarwa (`requireManagementAuth`). Ba a taɓa dawo da bayanan sirri:
ana dawo da sirrin da aka adana a matsayin ainihin `__stored__`, kuma aika wannan ƙimar a lokacin sabuntawa
yana riƙe bayanan tantancewar da aka adana.

Ƙirƙira ko sabunta manufa wadda nau'inta ya ayyana sirri **yana buƙatar
`STORAGE_ENCRYPTION_KEY`**. Idan babu shi, `encrypt()` yana wuce bayanin ba tare da wani canji ba, saboda haka
ana ƙin rubutawar da 400 maimakon saka bayanan tantancewa cikin SQLite a matsayin rubutu marar ɓoyewa (irin kariyar da
webhook na Telegram yake amfani da ita).

| Hanya    | Tafarki                                  | Manufa                                                             |
| -------- | ---------------------------------------- | ------------------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | Nau'ikan manufa + jerin filayen daidaitawarsu                      |
| `GET`    | `/api/log-export/destinations`           | Jera manufofi (an ɓoye bayanan sirri)                              |
| `POST`   | `/api/log-export/destinations`           | Ƙirƙiri manufa                                                     |
| `GET`    | `/api/log-export/destinations/{id}`      | Karanta guda ɗaya                                                  |
| `PUT`    | `/api/log-export/destinations/{id}`      | Sabunta suna / kunnawa / daidaitawa / haɗa-rukuni                  |
| `DELETE` | `/api/log-export/destinations/{id}`      | Share                                                              |
| `POST`   | `/api/log-export/destinations/{id}/test` | Gwada bayanan tantancewa, kada a rubuta komai                      |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Kwashe yanzu, ta hanya ɗaya da gudanarwar da aka tsara             |
| `GET`    | `/api/log-export/status`                 | Halin Cron, gudanarwa na baya-bayan nan, tarin aikin kowane manufa |

`GET /api/log-export/types` ne yake sa UI ya zama na gama-gari: ana gina fom ɗin dashboard daga
bayanan filaye da aka dawo da su, don haka sabuwar manufa ba ta buƙatar wani canji ga UI.

---

## 4. Manufar BigQuery

Maɓallan daidaitawa (`type: "bigquery"`):

| Maɓalli              | Bayani                                                                          |
| -------------------- | ------------------------------------------------------------------------------- |
| `projectId`          | Aikin GCP da ke ɗauke da dataset                                                |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                 |
| `tableId`            | `[A-Za-z0-9_]+`                                                                 |
| `location`           | Ana amfani da shi ne kawai idan dole ne a ƙirƙiri dataset (tsoho `EU`)          |
| `serviceAccountJson` | Maɓallin service-account. Sirri: an ɓoye shi yayin ajiya, ba a taɓa dawo da shi |
| `autoCreate`         | Ƙirƙiri dataset da table a fitarwa ta farko (tsoho `true`)                      |

Service account yana buƙatar `bigquery.tables.updateData` a kan table ɗin da aka nufa, tare da
`bigquery.datasets.create` / `bigquery.tables.create` lokacin da aka kunna `autoCreate`.

Rukunin da aka daidaita naúrar **cursor** ce, ba ta HTTP ba: `send()` yana raba shi zuwa kiraye-kirayen insertAll
masu layuka aƙalla 500, don haka babban `batch_size` ba zai iya karya iyakar buƙata ta 10 MB ta BigQuery ba.
Ana sake gwada halayen wucin gadi (408/429/500/502/503/504) har sau uku tare da ƙara lokacin jira a hankali,
ana sake amfani da insertIds iri ɗaya; gazawar tantancewa da tsarin bayanai suna jefa kuskure tun a gwajin farko
maimakon ɓata gudanarwar.

Table da aka ƙirƙira ƴan daƙiƙu da suka wuce bai riga ya bayyana ga streaming endpoint ba, wanda ke amsawa da
404 na ƴan daƙiƙu. Ana sake gwada wannan 404, amma **kawai idan wannan gudanarwar ce ta ƙirƙiri table ɗin** —
table da babu shi da gaske zai gaza nan take. Ka lura cewa sake ƙirƙirar table da sunan wanda
aka goge kwanan nan yana sa BigQuery ya ƙi streaming inserts na tsawon mintuna da dama; wannan
siffa ce ta gogewa-sannan-sake-ƙirƙirawa, don haka ya fi kyau a yi amfani da sabon sunan table maimakon gogewa da sake ƙara shi.

**Gazawar wani ɓangare tana zuwa a matsayin HTTP 200 tare da `insertErrors[]` wanda ba fanko ba.** Ana ɗaukar wannan a matsayin
gazawa kuma yana jefa kuskure, wanda ke hana cursor ci gaba ya wuce layukan da BigQuery bai taɓa
karɓa ba; `tests/unit/log-export-bigquery.test.ts` yana tabbatar da wannan halayya.

Hanyar jigilar bayanai REST ce kai tsaye — ana musanya ikirarin RS256 da aka sanya wa hannu da kansa da access token a
`https://oauth2.googleapis.com/token`, sannan layuka su tafi zuwa `tabledata.insertAll`. Ba a haɗa wani Google SDK ba.
Ana adana access tokens na ɗan lokaci a cikin tsarin aiki ga kowane (service account, scope).

Table da aka ƙirƙira yana ɗauke da ginshiƙi ɗaya ga kowane filin shafin Logs tare da `exported_at`, kuma an tsara shi
bisa yadda ake binciken rajistan kira a zahiri:

- **An raba shi bisa rana a kan `timestamp`**, don haka binciken da aka iyakance da kwanan wata yana binciken waɗannan ranakun kawai.
- **An haɗa shi rukuni bisa `api_key_name`, `provider`, `model`, `status`** (a wannan jeri), don haka tacewa bisa
  wanda ya gudanar da shi, inda ya tafi, ko ko ya gaza tana cire tubalan da ba su dace ba a cikin kowane partition. BigQuery
  yana ba da damar ginshiƙan clustering guda huɗu aƙalla kuma tsarin jeri yana da muhimmanci: tacewa bisa `api_key_name` kaɗai
  tana cirewa, amma tacewa bisa `status` kaɗai ba ta yi.
- **Riƙewar partition na zaɓi** ta hanyar `partitionExpirationDays` (0 yana riƙe komai), ana amfani da ita
  lokacin da aka ƙirƙiri table.

Dukkan saitunan biyu suna aiki ne a lokacin ƙirƙirawa. Teburin da yake akwai yana riƙe da tsarin da yake da shi, don haka
ka nuna wurin da za a aika zuwa sabon id na tebur idan kana son amfani da su.

`tests/unit/log-export-bigquery.test.ts` yana tabbatar da cewa mai daidaitawa da tsarin tebur suna ci gaba da
daidaituwa sosai, don haka ba za a iya watsar da sabon ginshiƙin rajistar kira a ɓoye yayin fitarwa ba.

Ana rarraba rukuni-rukuni bisa ga **duka** adadin layuka da kuma bytes da aka serialise. Adadin layuka kaɗai bai isa ba
da zarar an fitar da payloads: layuka 500 masu ɗauke da prompts na iya kaiwa gomman megabytes, kuma insertAll
yana ƙin buƙatar da ta wuce 10 MB. Ana rufe kowane rukuni idan ya kai layuka 500 ko 9 MB, duk wanda ya fara kaiwa.

---

## 5. Ƙara wurin aikawa

1. Ƙirƙiri `src/lib/logExport/destinations/<name>.ts` wanda yake fitar da `LogExportDestinationType`:
   wani `configSchema` na Zod, jerin bayanan `fields` don UI, `secretFields`, da kuma
   `createClient(config)` wanda yake dawo da `test()` / `prepare()` / `send(records)`.
2. Ƙara shi cikin jerin `DESTINATIONS` da ke `src/lib/logExport/registry.ts`.
3. Rubuta gwaje-gwaje a ƙarƙashin `tests/unit/`.

Wannan shi ne duk canjin: ma'ajiyar bayanai, aikin cron, matakin REST, ɓoye sirrika, da fom ɗin
dashboard duk suna karanta rajistar.

Ka'idoji biyu don sabon wurin aikawa:

- `send()` **dole ne ya jefa kuskure** idan an samu gazawar wani ɓangare. Idan ya kammala cikin nasara, hakan yana nufin "wurin aikawa yana da waɗannan layukan",
  kuma siginar matsayi za ta wuce su har abada.
- Wurin aikawa da yake karɓar URL da mai amfani ya bayar dole ne ya tabbatar da ingancinsa ta
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) kafin ɗauko bayanai,
  kamar yadda webhooks suke yi. BigQuery ba ya buƙatar wannan: rundunoninsa tabbatattu ne.

---

## 6. Gudanar da shi

- **Dashboard**: Integrations → Log export. Ƙara wurin aikawa, gudanar da **Test** don bincika bayanan tantancewa
  ba tare da rubuta layuka ba, sannan kunna shi.
- **Jerin jiran aiki**: kowane katin wurin aikawa yana nuna layukan da ke jira da siginar matsayi; `GET
/api/log-export/status` yana dawo da waɗannan alkaluman tare da bayanan gudanuwar ayyuka 20 na ƙarshe.
- **Gazawar wani wurin aikawa ba ta sa sauran su gaza ba** — taƙaitaccen sakamakon gudanuwar yana adana matsayin kowane wurin aikawa
  a `last_status` / `last_error`, yayin da tarihin gudanuwar aikin yake adana sakamakon gaba ɗaya.
- **Share wurin aikawa yana share siginar matsayinsa.** Sake ƙara shi yana farawa daga mafi tsohon
  rajistan kira da aka riƙe, wanda zai sake aika layukan da mai yiwuwa wurin aikawar ya riga ya adana. A BigQuery, `insertId`
  na kowane layi yana hana maimaituwar ne kawai a cikin tazarar lokacin cire maimaituwa ta BigQuery, don haka ya fi kyau a kashe
  wurin aikawa maimakon share shi.
