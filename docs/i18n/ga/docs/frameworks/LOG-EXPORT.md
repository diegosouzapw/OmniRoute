# Log export (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Easpórtáil leanúnach, incriminteach de logaí glaonna OmniRoute chuig stór anailísíochta seachtrach.

Coinníonn cluaisín an deais Logs stair na n-iarratas in SQLite (`call_logs`), agus tá teorainn léi de bharr
uainíochta agus coinneála. Seolann easpórtáil logaí an tacar céanna taifead amach de réir sceidil ionas gur féidir leis maireachtáil níos faide ná
an bunachar sonraí áitiúil agus a bheith ceangailte le sonraí eile. Is é BigQuery an chéad cheann scríbe; is
clárlann í an phíblíne, mar sin is féidir tuilleadh ceann scríbe a chur léi.

---

## 1. Conas a oibríonn sé

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (tacar réimsí chluaisín Logs)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Sceideal** — jab cron amháin de chuid `JobRegistry`, `log_export`, a úsáideann `0 * * * *` mar réamhshocrú (gach uair an chloig,
  UTC). Cláraítear é in `src/lib/initCloudSync.ts`; is féidir é a shárú le `OMNIROUTE_LOG_EXPORT_CRON`.
  Ag gach ticeáil, draenálann sé gach ceann scríbe atá **cumasaithe**, ceann i ndiaidh a chéile.
- **Cúrsóir** — `call_logs.rowid` intuigthe SQLite, arna bhuanú do gach ceann scríbe in
  `log_export_destinations.cursor_row_id`. Ní úsáidtear `timestamp` mar chúrsóir d'aon ghnó: féadfaidh glaoiteoirí
  a luach féin a sholáthar, mar sin d'fhéadfaí iarratas mall a scríobh tar éis iarratais níos tapúla a thosaigh
  níos déanaí, agus d'fhágfadh cúrsóir stampa ama ar lár é.
- **Baisceáil** — `batch_size` ró in aghaidh an iarratais (500 mar réamhshocrú), `max_rows_per_run` ró in aghaidh gach rite
  (10000 mar réamhshocrú), ionas go ndraenálfar riaráiste mór thar roinnt ticeáil seachas ceann amháin a bhlocáil.
- **Seachadadh** — ní théann an cúrsóir ar aghaidh ach amháin tar éis do `send()` réiteach. Fágann baisc ar theip uirthi an
  cúrsóir san áit a raibh sé, mar sin déantar iarracht eile ar na rónna céanna sa chéad rith eile. Is é an ráthaíocht
  seachadadh uair amháin ar a laghad mar aon le dí-dhúbláil ar thaobh an chinn scríbe, seachas seachadadh díreach uair amháin: úsáideann BigQuery aitheantas loga an ghlao mar eochair do gach
  ró, rud a urramaíonn sé ar bhonn díchill réasúnta laistigh dá thréimhse dhí-dhúblála féin.
- **Cosaint ar fhorluí** — is féidir leis an ticeáil cron agus `POST .../run` tarlú ag an am céanna. Déantar ceann scríbe
  atá á dhraenáil cheana féin a scipeáil seachas é a dhraenáil faoi dhó (`skipped: true` i dtoradh an rite),
  mar sin ní féidir le rith comhthráthach baisc a athsheoladh ná an cúrsóir a scríobh siar.
- **Athshlánú tar éis glanta** — má chríochnaíonn `cursor_row_id` os cionn `MAX(rowid)` (glanadh an tábla ar fad
  agus atosaíodh na haitheantais ró), athchasann an riteoir go 0 seachas fanacht dall go buan.

### Ualaí pá (leideanna agus comhlánuithe)

De réir réamhshocraithe, ní iompraíonn an easpórtáil ach na réimsí achoimre a thaispeántar i **liosta** Logs. Má chuirtear
**Easpórtáil leideanna agus freagraí** (`includeBodies`) ar siúl, seoltar freisin a dtaispeánann pána **mionsonraí**
Logs do gach glao:

| Réimse                           | A bhfuil ann                                                       |
| -------------------------------- | ------------------------------------------------------------------ |
| `request_body` / `response_body` | Ualaí pá an ghlao mar a rindreálann an deais iad                   |
| `pipeline_route_decision`        | Cén sprioc agus samhail a roghnaigh an ródaire                     |
| `pipeline_client_request`        | An t-iarratas amh díreach mar a sheol an cliant é                  |
| `pipeline_openai_request`        | Tar éis a aistrithe go cruth inmheánach OpenAI                     |
| `pipeline_provider_request`      | Mar a seoladh suas an sruth é i ndáiríre, i gcanúint an tsoláthraí |
| `pipeline_provider_response`     | An freagra amh ó thuas an sruth                                    |
| `pipeline_client_response`       | An méid a tugadh ar ais don ghlaoiteoir                            |
| `pipeline_error`                 | Mionsonraí earráide ar leibhéal na píblíne do ghlao ar theip air   |
| `bodies_truncated`               | Fíor nuair a shroich aon réimse thuas `maxBodyBytes`               |

Is ábhar leid é seo, mar sin tá sé **múchta de réir réamhshocraithe** agus is rogha in aghaidh an chinn scríbe é d'aon ghnó.
Is é an méid a sheoltar an méid a thaispeánann an deais, toisc go léann an dá cheann trí `getCallLogById`: déantar PII a
shláintiú agus rúin a cheilt sna hualaí pá cheana féin nuair a scríobhtar iad, agus ní stórálann glao a dhéantar le
heochair API `noLog` aon ualach pá ar chor ar bith, mar sin níl aon rud le heaspórtáil.

Léitear ualaí pá in aghaidh an ró ó dhéantán an chórais comhad, mar sin ní ritheann hiodráitiú ach amháin do na cinn scríbe
a d'iarr é. Má tá déantán ró ar iarraidh nó truaillithe, easpórtáiltear a achoimre le hualaí pá nialasacha
seachas teip a chur ar an mbaisc agus an cúrsóir a fhágáil sáinnithe.

Cuireann `maxBodyBytes` (262144 mar réamhshocrú) uasteorainn le gach réimse. Déantar ualaí pá níos faide a **theascadh seachas
a ligean ar lár** — freagraíonn leid ghearrtha fós an cheist "cad a fiafraíodh" — agus marcáiltear an ró le
`bodies_truncated`. Ní easpórtáiltear deilteanna sruthaithe píosa ar phíosa; tá an freagra cóimeáilte
in `pipeline_provider_response` agus `pipeline_client_response` cheana féin.

---

## 2. Comhaid

| Comhpháirt              | Suíomh                                       |
| ----------------------- | -------------------------------------------- |
| Conradh cinn scríbe     | `src/lib/logExport/types.ts`                 |
| Clárlann                | `src/lib/logExport/registry.ts`              |
| Láimhseáil rún          | `src/lib/logExport/secrets.ts`               |
| Riteoir (lúb cúrsóra)   | `src/lib/logExport/runner.ts`                |
| Teilgean API            | `src/lib/logExport/presenter.ts`             |
| Ceann scríbe BigQuery   | `src/lib/logExport/destinations/bigquery.ts` |
| Fíordheimhniú SA Google | `src/lib/logExport/googleServiceAccount.ts`  |
| Foinse loga glaonna     | `src/lib/usage/callLogExportSource.ts`       |
| Marthanacht             | `src/lib/db/logExportDestinations.ts`        |
| Tasc cron               | `src/lib/jobs/logExportJob.ts`               |
| Sraith REST             | `src/app/api/log-export/`                    |
| Leathanach an deais     | `src/app/(dashboard)/dashboard/log-export/`  |

Scéimre: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Déantar gach bealach a fhíordheimhniú ó thaobh bainistíochta de (`requireManagementAuth`). Ní chuirtear rúin ar ais choíche:
tagann rún stóráilte ar ais mar an luach litriúil `__stored__`, agus má sheoltar an luach sin ar ais i nuashonrú,
coimeádtar an dintiúr stóráilte.

Chun ceann scríbe a chruthú nó a nuashonrú a bhfuil rún dearbhaithe ag a chineál, **tá
`STORAGE_ENCRYPTION_KEY` riachtanach**. Gan é, ní dhéanann `encrypt()` ach an luach a chur tríd gan athrú, mar sin
diúltaítear don scríobh le 400 seachas dintiúr a chur isteach in SQLite mar ghnáth-théacs (an chosaint chéanna a
úsáideann crúca gréasáin Telegram).

| Modh     | Conair                                   | Cuspóir                                                       |
| -------- | ---------------------------------------- | ------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Cineálacha cinn scríbe + liosta a réimsí cumraíochta          |
| `GET`    | `/api/log-export/destinations`           | Cinn scríbe a liostú (rúin folaithe)                          |
| `POST`   | `/api/log-export/destinations`           | Ceann scríbe a chruthú                                        |
| `GET`    | `/api/log-export/destinations/{id}`      | Ceann amháin a léamh                                          |
| `PUT`    | `/api/log-export/destinations/{id}`      | Ainm / cumasú / cumraíocht / baisceáil a nuashonrú            |
| `DELETE` | `/api/log-export/destinations/{id}`      | Scriosadh                                                     |
| `POST`   | `/api/log-export/destinations/{id}/test` | Dintiúir a thástáil, gan aon rud a scríobh                    |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Taoscadh anois, an chonair chéanna leis an rith sceidealaithe |
| `GET`    | `/api/log-export/status`                 | Staid cron, rití le déanaí, riaráiste de réir sprice          |

Is é `GET /api/log-export/types` a fhágann go bhfuil an comhéadan úsáideora cineálach: rindreáiltear foirm an deais ó
na tuairisceoirí réimse a chuirtear ar ais, mar sin ní theastaíonn aon athrú ar an gcomhéadan úsáideora le haghaidh ceann scríbe nua.

---

## 4. Ceann scríbe BigQuery

Eochracha cumraíochta (`type: "bigquery"`):

| Eochair              | Nótaí                                                                                           |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| `projectId`          | Tionscadal GCP ina bhfuil an tacar sonraí                                                       |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                 |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                 |
| `location`           | Ní úsáidtear é ach amháin nuair is gá an tacar sonraí a chruthú (`EU` de réir réamhshocraithe)  |
| `serviceAccountJson` | Eochair cuntais seirbhíse. Rún: criptithe agus é stóráilte, ní chuirtear ar ais choíche é       |
| `autoCreate`         | Cruthaigh an tacar sonraí agus an tábla ar an gcéad easpórtáil (`true` de réir réamhshocraithe) |

Teastaíonn `bigquery.tables.updateData` ón gcuntas seirbhíse ar an spriocthábla, chomh maith le
`bigquery.datasets.create` / `bigquery.tables.create` nuair atá `autoCreate` ar siúl.

Is aonad **cúrsóra** é baisc chumraithe, ní aonad HTTP: roinneann `send()` í ina glaonna insertAll
nach mó ná 500 ró an ceann, mar sin ní féidir le `batch_size` mór teorainn iarratais 10 MB BigQuery a shárú.
Déantar atriail suas le trí huaire ar staideanna sealadacha (408/429/500/502/503/504), le tréimhsí feithimh
easpónantúla, agus na insertIds céanna á n-athúsáid; caitear earráidí fíordheimhnithe agus scéimre ar an gcéad iarracht
seachas an rith a chur amú.

Ní bhíonn tábla a cruthaíodh cúpla nóiméad ó shin infheicthe don chríochphointe sruthaithe fós, agus freagraíonn sé
le 404 ar feadh cúpla soicind. Déantar atriail ar an 404 sin, ach **ní dhéantar sin ach amháin nuair a chruthaigh an rith seo an tábla** —
teipeann go tapa fós má tá tábla ar iarraidh i ndáiríre. Tabhair faoi deara go ndiúltaíonn BigQuery d'ionsáiteacha sruthaithe
ar feadh cúpla nóiméad nuair a athchruthaítear tábla faoi ainm a scriosadh le déanaí; is airí de scriosadh-agus-athchruthú é sin,
mar sin b'fhearr ainm tábla nua a úsáid ná ceann a bhaint agus a chur leis arís.

**Tagann teip pháirteach mar HTTP 200 le `insertErrors[]` nach bhfuil folamh.** Caitear leis sin mar
theip agus caitear earráid, rud a chuireann stop leis an gcúrsóir dul ar aghaidh thar rónna nár ghlac BigQuery leo riamh;
socraíonn `tests/unit/log-export-bigquery.test.ts` an t-iompar sin.

Is REST simplí é an t-iompar — malartaítear dearbhú RS256 féin-sínithe ar chomhartha rochtana ag
`https://oauth2.googleapis.com/token`, agus ansin téann rónna chuig `tabledata.insertAll`. Ní chuirtear aon SDK Google
san áireamh. Cuirtear comharthaí rochtana i dtaisce laistigh den phróiseas de réir (cuntas seirbhíse, scóip).

Tá colún amháin sa tábla cruthaithe do gach réimse i gcluaisín na Logaí, chomh maith le `exported_at`, agus tá sé leagtha amach de réir
an chaoi a ndéantar logaí glaonna a cheistiú i ndáiríre:

- **Deighilte de réir lae ar `timestamp`**, mar sin ní scanann ceist atá teorannaithe de réir dáta ach na laethanta sin.
- **Cnuasaithe de réir `api_key_name`, `provider`, `model`, `status`** (san ord sin), ionas go ndéanann scagadh de réir
  cé a rith é, cá ndeachaigh sé, nó ar theip air bloic laistigh de gach deighilt a bhearradh. Ceadaíonn BigQuery
  ceithre cholún cnuasaithe ar a mhéad agus tá tábhacht leis an ord: déanann scagaire ar `api_key_name` amháin
  bearradh, ach ní dhéanann scagaire ar `status` amháin é.
- **Coinneáil roghnach deighilte** trí `partitionExpirationDays` (coinníonn 0 gach rud), a chuirtear i bhfeidhm
  nuair a chruthaítear an tábla.

Cuirtear an dá shocrú i bhfeidhm tráth cruthaithe. Coinníonn tábla atá ann cheana cibé leagan amach atá aige cheana féin, mar sin
dírigh an ceann scríbe ar aitheantas tábla nua más mian leat iad a ghlacadh.

Dearbhaíonn `tests/unit/log-export-bigquery.test.ts` go bhfanann an mapálaí agus scéimre an tábla ar aon dul
lena chéile, ionas nach féidir colún nua de loga glaonna a fhágáil ar lár go ciúin le linn an easpórtála.

Roinntear baisceanna ina smutáin de réir líon na rónna **agus** líon na mbeart srathaithe araon. Ní leor líon na rónna amháin
nuair a easpórtáiltear pálastaí: d’fhéadfadh na deicheanna meigibheart a bheith i 500 ró ina bhfuil leideanna, agus diúltaíonn insertAll
d’iarratas os cionn 10 MB. Dúntar smutáin ag 500 ró nó 9 MB, cibé acu a tharlaíonn ar dtús.

---

## 5. Ceann scríbe a chur leis

1. Cruthaigh `src/lib/logExport/destinations/<name>.ts` a easpórtálann `LogExportDestinationType`:
   `configSchema` Zod, eagar tuairisceoirí `fields` don Chomhéadain, `secretFields`, agus
   `createClient(config)` a thugann `test()` / `prepare()` / `send(records)` ar ais.
2. Cuir leis an eagar `DESTINATIONS` é in `src/lib/logExport/registry.ts`.
3. Scríobh tástálacha faoi `tests/unit/`.

Sin é an t-athrú iomlán: léann an bhuanseasmhacht, an jab cron, an tsraith REST, criptiú rún agus
foirm an deais an chlárlann uile.

Dhá riail do cheann scríbe nua:

- **Ní mór do** `send()` **eisceacht a chaitheamh** má tharlaíonn teip pháirteach. Má réitítear é, ciallaíonn sé sin "tá na rónna seo ag an gceann scríbe",
  agus bogann an cúrsóir tharstu go buan.
- Ní mór do cheann scríbe a ghlacann URL a sholáthraíonn úsáideoir é a bhailíochtú trí
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) sula ndéantar iarratas,
  ar an mbealach céanna a dhéanann crúcaí gréasáin é. Ní gá é seo do BigQuery: is tairisigh iad a óstaigh.

---

## 6. É a oibriú

- **Deais**: Comhtháthuithe → Easpórtáil loga. Cuir ceann scríbe leis, rith **Tástáil** chun na dintiúir a sheiceáil
  gan rónna a scríobh, agus ansin cumasaigh é.
- **Riaráiste**: taispeánann gach cárta ceann scríbe na rónna atá ar feitheamh agus an cúrsóir; tugann `GET
/api/log-export/status` na figiúirí céanna ar ais chomh maith leis na 20 rith dheireanacha den jab.
- **Ní chuireann ceann scríbe a dteipeann air na cinn eile ó mhaith** — taifeadann achoimre an rite stádas gach cinn scríbe
  in `last_status` / `last_error`, agus coimeádann stair rite an jab an comhiomlán.
- **Má scriostar ceann scríbe, scriostar a chúrsóir.** Má chuirtear leis arís é, tosaíonn sé ón loga glaonna coinnithe is sine,
  rud a athsheolann rónna a d'fhéadfadh a bheith ag an gceann scríbe cheana féin. Ar BigQuery, ní ionsúnn an `insertId`
  in aghaidh an ró é sin ach laistigh d'fhuinneog dhí-dhúblála BigQuery féin, mar sin b'fhearr ceann scríbe a dhíchumasú
  seachas é a scriosadh.
