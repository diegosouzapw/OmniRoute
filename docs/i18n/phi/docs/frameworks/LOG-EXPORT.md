# Log export (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Tuloy-tuloy at inkremental na pag-export ng mga call log ng OmniRoute patungo sa isang panlabas na analytics store.

Pinapanatili ng tab na Logs dashboard ang kasaysayan ng request sa SQLite (`call_logs`), na nililimitahan ng
rotation at retention. Ipinapadala ng log export ang parehong hanay ng mga record ayon sa iskedyul upang manatili
ang mga ito nang mas matagal kaysa sa lokal na database at maiugnay sa iba pang data. BigQuery ang unang destinasyon; ang
pipeline ay isang registry, kaya maaaring magdagdag ng higit pang mga destinasyon.

---

## 1. Paano ito gumagana

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (ang hanay ng mga field sa tab na Logs)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Iskedyul** — isang `JobRegistry` cron job, `log_export`, na may default na `0 * * * *` (bawat oras,
  UTC). Nakarehistro sa `src/lib/initCloudSync.ts`; maaaring i-override gamit ang `OMNIROUTE_LOG_EXPORT_CRON`.
  Sa bawat tick, sunod-sunod na inuubos ang data para sa bawat **naka-enable** na destinasyon.
- **Cursor** — ang implicit na `call_logs.rowid` ng SQLite, na pinapanatili para sa bawat destinasyon sa
  `log_export_destinations.cursor_row_id`. Sadyang hindi ginagamit bilang cursor ang `timestamp`: maaaring
  magbigay ang mga caller ng sarili nilang value, kaya maaaring maisulat ang isang mabagal na request pagkatapos
  ng mas mabilis na request na mas huling nagsimula, at lalampasan ito ng isang timestamp cursor.
- **Batching** — `batch_size` na row sa bawat request (default na 500), `max_rows_per_run` na row sa bawat run
  (default na 10000), upang maubos ang malaking backlog sa ilang tick sa halip na ma-block ang isang tick.
- **Paghahatid** — sumusulong lamang ang cursor pagkatapos mag-resolve ang `send()`. Kapag pumalya ang isang batch,
  nananatili ang cursor sa dating posisyon nito, kaya muling susubukan ang parehong mga row sa susunod na run. Ang garantiya ay
  at-least-once kasama ang pag-aalis ng duplikasyon sa panig ng destinasyon, hindi tunay na exactly-once: itinatakda ng BigQuery ang key ng bawat
  row ayon sa call-log id, na sinusunod nito sa best-effort na paraan sa loob ng sarili nitong dedup window.
- **Proteksyon sa overlap** — maaaring sabay na mangyari ang cron tick at `POST .../run`. Ang isang destinasyong
  kasalukuyang inuubos ay nilalampasan sa halip na ubusin nang dalawang beses (`skipped: true` sa resulta ng run),
  kaya hindi maaaring muling ipadala ng isang kasabay na run ang isang batch o ibalik sa mas mababang posisyon ang cursor.
- **Pag-recover mula sa purge** — kung mapunta ang `cursor_row_id` sa itaas ng `MAX(rowid)` (na-purge ang buong table
  at nagsimula muli ang mga rowid), ibinabalik ng runner sa 0 ang cursor sa halip na tuluyan itong mawalan ng nakikitang data.

### Mga payload (mga prompt at completion)

Bilang default, dala lamang ng export ang mga summary field na ipinapakita ng **listahan** ng Logs. Kapag in-on ang
**I-export ang mga prompt at tugon** (`includeBodies`), karagdagang ipinapadala ang ipinapakita ng **detail**
pane ng Logs para sa bawat call:

| Field                            | Nilalaman nito                                                        |
| -------------------------------- | --------------------------------------------------------------------- |
| `request_body` / `response_body` | Mga payload ng call gaya ng pag-render sa mga ito ng dashboard        |
| `pipeline_route_decision`        | Aling target at model ang pinili ng router                            |
| `pipeline_client_request`        | Ang raw request kung paano mismo ito ipinadala ng client              |
| `pipeline_openai_request`        | Pagkatapos isalin sa internal na anyo ng OpenAI                       |
| `pipeline_provider_request`      | Gaya ng aktuwal na ipinadala upstream, sa dialect ng provider         |
| `pipeline_provider_response`     | Ang raw na upstream response                                          |
| `pipeline_client_response`       | Ang ibinalik sa caller                                                |
| `pipeline_error`                 | Detalye ng error sa antas ng pipeline para sa pumalyang call          |
| `bodies_truncated`               | True kapag umabot sa `maxBodyBytes` ang alinman sa mga field sa itaas |

Nilalaman ng prompt ito, kaya **naka-off bilang default** at sadyang pinipili nang hiwalay para sa bawat destinasyon.
Ang ipinapadala ay kung ano ang ipinapakita ng dashboard, dahil parehong nagbabasa ang mga ito sa pamamagitan ng `getCallLogById`: ang mga payload ay
na-sanitize na para sa PII at na-redact na ang mga secret kapag isinulat ang mga ito, at ang isang call na ginawa gamit ang
`noLog` API key ay hindi nag-iimbak ng anumang payload, kaya walang mae-export.

Binabasa ang mga payload sa bawat row mula sa filesystem artifact, kaya tumatakbo lamang ang hydration para sa mga destinasyong
humiling nito. Ang isang row na nawawala o corrupt ang artifact ay nag-e-export ng summary nito na may mga null na
payload sa halip na pumalya ang batch at maipit ang cursor.

Nililimitahan ng `maxBodyBytes` (default na 262144) ang bawat field. Ang mas mahahabang payload ay **pinuputol sa halip na
inaalis** — masasagot pa rin ng isang pinutol na prompt ang "ano ang itinanong" — at minamarkahan ang row gamit ang
`bodies_truncated`. Hindi ine-export ang mga delta na ini-stream nang chunk-by-chunk; nasa
`pipeline_provider_response` at `pipeline_client_response` na ang binuong response.

---

## 2. Mga File

| Bahagi                  | Lokasyon                                     |
| ----------------------- | -------------------------------------------- |
| Kontrata ng destinasyon | `src/lib/logExport/types.ts`                 |
| Registry                | `src/lib/logExport/registry.ts`              |
| Pangangasiwa ng secret  | `src/lib/logExport/secrets.ts`               |
| Runner (cursor loop)    | `src/lib/logExport/runner.ts`                |
| Projection ng API       | `src/lib/logExport/presenter.ts`             |
| Destinasyong BigQuery   | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA auth          | `src/lib/logExport/googleServiceAccount.ts`  |
| Pinagmulan ng call-log  | `src/lib/usage/callLogExportSource.ts`       |
| Persistence             | `src/lib/db/logExportDestinations.ts`        |
| Cron job                | `src/lib/jobs/logExportJob.ts`               |
| REST layer              | `src/app/api/log-export/`                    |
| Pahina ng dashboard     | `src/app/(dashboard)/dashboard/log-export/`  |

Schema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Lahat ng route ay nangangailangan ng management authentication (`requireManagementAuth`). Hindi kailanman ibinabalik ang mga secret:
ang nakaimbak na secret ay ibinabalik bilang literal na `__stored__`, at ang pagpapadala muli ng halagang iyon sa isang update
ay nagpapanatili sa nakaimbak na credential.

Ang paggawa o pag-update ng destinasyon na ang uri ay nagdedeklara ng secret ay **nangangailangan ng
`STORAGE_ENCRYPTION_KEY`**. Kung wala ito, tahimik na passthrough ang `encrypt()`, kaya
tinatanggihan ang pagsusulat gamit ang 400 sa halip na maglagay ng credential sa SQLite bilang plaintext (ang parehong guard na
ginagamit ng Telegram webhook).

| Paraan   | Path                                     | Layunin                                                      |
| -------- | ---------------------------------------- | ------------------------------------------------------------ |
| `GET`    | `/api/log-export/types`                  | Mga uri ng destinasyon + listahan ng config field            |
| `GET`    | `/api/log-export/destinations`           | Ilista ang mga destinasyon (nakatago ang mga secret)         |
| `POST`   | `/api/log-export/destinations`           | Gumawa ng destinasyon                                        |
| `GET`    | `/api/log-export/destinations/{id}`      | Basahin ang isa                                              |
| `PUT`    | `/api/log-export/destinations/{id}`      | I-update ang pangalan / enabled / config / batching          |
| `DELETE` | `/api/log-export/destinations/{id}`      | Burahin                                                      |
| `POST`   | `/api/log-export/destinations/{id}/test` | Subukan ang mga credential, walang isusulat                  |
| `POST`   | `/api/log-export/destinations/{id}/run`  | I-drain ngayon, kaparehong path ng nakaiskedyul na run       |
| `GET`    | `/api/log-export/status`                 | Kalagayan ng cron, mga kamakailang run, backlog bawat target |

Ang `GET /api/log-export/types` ang dahilan kung bakit generic ang UI: nire-render ang form ng dashboard mula sa
mga ibinalik na field descriptor, kaya hindi nangangailangan ng pagbabago sa UI ang isang bagong destinasyon.

---

## 4. Destinasyong BigQuery

Mga config key (`type: "bigquery"`):

| Key                  | Mga Tala                                                                     |
| -------------------- | ---------------------------------------------------------------------------- |
| `projectId`          | GCP project na naglalaman ng dataset                                         |
| `datasetId`          | `[A-Za-z0-9_]+`                                                              |
| `tableId`            | `[A-Za-z0-9_]+`                                                              |
| `location`           | Ginagamit lamang kapag kailangang gawin ang dataset (default na `EU`)        |
| `serviceAccountJson` | Service-account key. Secret: naka-encrypt habang nakaimbak, hindi ibinabalik |
| `autoCreate`         | Gawin ang dataset at table sa unang export (default na `true`)               |

Kailangan ng service account ang `bigquery.tables.updateData` sa target na table, kasama ang
`bigquery.datasets.create` / `bigquery.tables.create` kapag naka-on ang `autoCreate`.

Ang naka-configure na batch ay isang **cursor** unit, hindi HTTP unit: hinahati ito ng `send()` sa mga insertAll
call na may hindi hihigit sa 500 row, kaya hindi maaaring lumampas ang malaking `batch_size` sa 10 MB request limit ng BigQuery.
Ang mga pansamantalang status (408/429/500/502/503/504) ay muling sinusubukan nang hanggang tatlong beses gamit ang exponential
backoff, habang ginagamit muli ang parehong mga insertId; ang mga pagkabigo sa auth at schema ay nagti-throw sa unang pagtatangka sa halip
na ubusin ang run.

Hindi pa nakikita ng streaming endpoint ang isang table na kagagawa lang ilang sandali ang nakalipas, kaya sumasagot ito ng
404 sa loob ng ilang segundo. Muling sinusubukan ang 404 na iyon, ngunit **kapag ginawa lamang ng run na ito ang table** —
mabilis pa ring nabibigo ang isang table na talagang wala. Tandaan na kapag muling gumawa ng table gamit ang pangalang
kamakailan lang binura, tatanggihan ng BigQuery ang mga streaming insert sa loob ng ilang minuto; katangian ito ng
delete-then-recreate, kaya mas mainam ang bagong pangalan ng table kaysa mag-drop at muling magdagdag ng table.

**Dumarating ang partial failure bilang HTTP 200 na may `insertErrors[]` na hindi empty.** Itinuturing itong
pagkabigo at nagti-throw, na siyang pumipigil sa cursor na lumampas sa mga row na hindi kailanman
tinanggap ng BigQuery; itinatakda ng `tests/unit/log-export-bigquery.test.ts` ang gawi na ito.

Plain REST ang transport — ipinagpapalit ang self-signed RS256 assertion para sa access token sa
`https://oauth2.googleapis.com/token`, pagkatapos ay ipinapadala ang mga row sa `tabledata.insertAll`. Walang
idinadagdag na Google SDK. Naka-cache ang mga access token sa loob ng proseso para sa bawat (service account, scope).

Ang ginawang table ay may tig-isang column para sa bawat field ng Logs tab kasama ang `exported_at`, at nakaayos ito ayon sa
aktuwal na paraan ng pag-query sa mga call log:

- **Naka-day partition sa `timestamp`**, kaya ang query na nililimitahan ayon sa petsa ay ang mga araw na iyon lamang ang sini-scan.
- **Naka-cluster ayon sa `api_key_name`, `provider`, `model`, `status`** (sa ayos na iyon), kaya ang pag-filter ayon sa
  kung sino ang nagpatakbo nito, kung saan ito ipinadala, o kung nabigo ito ay nagpa-prune ng mga block sa loob ng bawat partition. Pinapayagan ng BigQuery
  ang hindi hihigit sa apat na clustering column at mahalaga ang pagkakasunod-sunod: nagpa-prune ang filter sa `api_key_name` lamang,
  ngunit hindi ang filter sa `status` lamang.
- **Opsyonal na retention ng partition** sa pamamagitan ng `partitionExpirationDays` (pinapanatili ng 0 ang lahat), na inilalapat
  kapag ginawa ang table.

Nalalapat ang parehong setting sa oras ng paggawa. Pinananatili ng isang umiiral na table ang kasalukuyan nitong layout, kaya
ituro ang destinasyon sa isang bagong table id kung gusto mong gamitin ang mga ito.

Tinitiyak ng `tests/unit/log-export-bigquery.test.ts` na nananatiling magkatugma ang mapper at ang schema ng table,
kaya hindi maaaring tahimik na maalis ang isang bagong column ng call-log habang inilalabas ito.

Hinahati ang mga batch ayon sa **parehong** bilang ng row at mga na-serialize na byte. Hindi sapat ang bilang ng row lamang
kapag ine-export ang mga payload: ang 500 row na naglalaman ng mga prompt ay maaaring umabot sa sampu-sampung megabyte, at tinatanggihan ng insertAll
ang isang request na lampas sa 10 MB. Isinasara ang mga chunk kapag umabot sa 500 row o 9 MB, alinman ang mauna.

---

## 5. Pagdaragdag ng destinasyon

1. Gumawa ng `src/lib/logExport/destinations/<name>.ts` na nag-e-export ng `LogExportDestinationType`:
   isang Zod `configSchema`, isang array ng descriptor na `fields` para sa UI, `secretFields`, at isang
   `createClient(config)` na nagbabalik ng `test()` / `prepare()` / `send(records)`.
2. Idagdag ito sa array na `DESTINATIONS` sa `src/lib/logExport/registry.ts`.
3. Sumulat ng mga test sa ilalim ng `tests/unit/`.

Iyon lang ang buong pagbabago: binabasa ng persistence, cron job, REST layer, pag-encrypt ng secret, at
form ng dashboard ang registry.

Dalawang panuntunan para sa bagong destinasyon:

- Ang `send()` ay **dapat mag-throw** kapag may bahagyang pagkabigo. Ang matagumpay na pag-resolve ay nangangahulugang "nasa destinasyon ang mga row na ito",
  at permanenteng uusad ang cursor lampas sa mga ito.
- Ang destinasyong tumatanggap ng URL na ibinigay ng user ay dapat i-validate ito sa pamamagitan ng
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) bago mag-fetch,
  tulad ng ginagawa ng mga webhook. Hindi ito kailangan ng BigQuery: hindi nagbabago ang mga host nito.

---

## 6. Pagpapatakbo nito

- **Dashboard**: Integrations → Log export. Magdagdag ng destinasyon, patakbuhin ang **Test** upang suriin ang mga credential
  nang hindi nagsusulat ng mga row, pagkatapos ay i-enable ito.
- **Backlog**: ipinapakita ng bawat card ng destinasyon ang mga nakabinbing row at ang cursor; ibinabalik ng `GET
/api/log-export/status` ang parehong mga bilang pati ang huling 20 pagpapatakbo ng job.
- **Ang pumalyang destinasyon ay hindi nagpapabagsak sa iba** — itinatala ng buod ng pagpapatakbo ang status ng bawat destinasyon
  sa `last_status` / `last_error`, at pinananatili ng kasaysayan ng pagpapatakbo ng job ang pinagsama-samang resulta.
- **Kapag binura ang isang destinasyon, nabubura rin ang cursor nito.** Kapag idinagdag itong muli, magsisimula ito sa pinakalumang naka-retain na
  call log, kaya muling ipapadala ang mga row na maaaring nasa destinasyon na. Sa BigQuery, inaasikaso lamang iyon ng bawat-row na
  `insertId` sa loob ng sariling de-duplication window ng BigQuery, kaya mas mainam na i-disable ang isang destinasyon kaysa burahin ito.
