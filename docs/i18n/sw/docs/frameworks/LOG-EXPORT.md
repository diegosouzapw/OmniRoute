# Log export (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Uhamishaji endelevu na wa hatua kwa hatua wa kumbukumbu za simu za OmniRoute kwenda kwenye hifadhi ya nje ya uchanganuzi.

Kichupo cha dashibodi ya Logs huhifadhi historia ya maombi katika SQLite (`call_logs`), ambayo inawekewa kikomo kupitia
uzungushaji na muda wa kuhifadhi. Uhamishaji wa kumbukumbu husafirisha seti hiyo hiyo ya rekodi kwa ratiba ili iweze kudumu zaidi ya
hifadhidata ya ndani na kuunganishwa na data nyingine. BigQuery ndilo lengwa la kwanza; mfumo huu ni sajili, kwa hivyo
malengo zaidi yanaweza kuongezwa.

---

## 1. Jinsi inavyofanya kazi

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (seti ya sehemu za kichupo cha Logs)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Ratiba** — kazi moja ya cron ya `JobRegistry`, `log_export`, ambayo chaguo-msingi ni `0 * * * *` (kila saa,
  UTC). Imesajiliwa katika `src/lib/initCloudSync.ts`; inaweza kubadilishwa kwa `OMNIROUTE_LOG_EXPORT_CRON`.
  Kila utekelezaji ulioratibiwa huchakata kila lengwa **lililowezeshwa**, moja baada ya jingine.
- **Kielekezi** — `call_logs.rowid` fiche ya SQLite, inayohifadhiwa kwa kila lengwa katika
  `log_export_destinations.cursor_row_id`. `timestamp` haitumiki kimakusudi kama kielekezi: wapigaji
  wanaweza kutoa thamani yao wenyewe, kwa hivyo ombi la polepole linaweza kuandikwa baada ya ombi la haraka lililoanza
  baadaye, na kielekezi cha muhuri wa muda kingeliruka ombi hilo.
- **Uchakataji kwa mafungu** — safu `batch_size` kwa kila ombi (chaguo-msingi ni 500), safu `max_rows_per_run` kwa kila utekelezaji
  (chaguo-msingi ni 10000), ili mlundikano mkubwa uchakatwe katika utekelezaji kadhaa badala ya kuzuia utekelezaji mmoja.
- **Uwasilishaji** — kielekezi husogezwa mbele tu baada ya `send()` kukamilika. Fungu lililoshindwa huacha
  kielekezi kilipokuwa, kwa hivyo safu zilezile hujaribiwa tena katika utekelezaji unaofuata. Dhamana ni
  uwasilishaji angalau mara moja pamoja na uondoaji wa nakala katika upande wa lengwa, wala si uwasilishaji halisi wa mara moja tu: BigQuery hutambulisha kila
  safu kwa kitambulisho cha kumbukumbu ya simu, ambacho huheshimu kadiri iwezekanavyo ndani ya kipindi chake cha kuondoa nakala.
- **Kizuizi cha mwingiliano** — utekelezaji wa cron na `POST .../run` vinaweza kuanzishwa kwa wakati mmoja. Lengwa
  ambalo tayari linachakatwa hurukwa badala ya kuchakatwa mara mbili (`skipped: true` katika matokeo ya utekelezaji),
  kwa hivyo utekelezaji wa wakati mmoja hauwezi kutuma tena fungu au kurudisha kielekezi nyuma.
- **Urejeshaji baada ya ufutaji** — ikiwa `cursor_row_id` itakuwa juu ya `MAX(rowid)` (jedwali lote
  lilifutwa na rowid zikaanza upya), kiendeshaji hurudisha kielekezi hadi 0 badala ya kuacha kutambua rekodi mpya kabisa.

### Data zinazotumwa (vidokezo na majibu yaliyokamilishwa)

Kwa chaguo-msingi, uhamishaji hubeba tu sehemu za muhtasari zinazoonyeshwa na orodha ya Logs. Kuwasha
**Hamisha vidokezo na majibu** (`includeBodies`) husafirisha pia kile kinachoonyeshwa na kidirisha cha **maelezo**
cha Logs kwa kila simu:

| Sehemu                           | Inachohifadhi                                                        |
| -------------------------------- | -------------------------------------------------------------------- |
| `request_body` / `response_body` | Data za simu jinsi dashibodi inavyozionyesha                         |
| `pipeline_route_decision`        | Lengwa na modeli ambazo kipanga njia kilichagua                      |
| `pipeline_client_request`        | Ombi ghafi kama lilivyotumwa na kiteja                               |
| `pipeline_openai_request`        | Baada ya kutafsiriwa kuwa muundo wa ndani wa OpenAI                  |
| `pipeline_provider_request`      | Kama lilivyotumwa kwa mtoa huduma, katika lahaja ya mtoa huduma      |
| `pipeline_provider_response`     | Jibu ghafi la mtoa huduma                                            |
| `pipeline_client_response`       | Kilichorejeshwa kwa mpigaji                                          |
| `pipeline_error`                 | Maelezo ya hitilafu ya mtiririko wa uchakataji kwa simu iliyoshindwa |
| `bodies_truncated`               | True ikiwa sehemu yoyote hapo juu ilifikia `maxBodyBytes`            |

Haya ni maudhui ya kidokezo, kwa hivyo kipengele hiki **kimezimwa kwa chaguo-msingi** na kimakusudi huchaguliwa kwa kila lengwa.
Kinachosafirishwa ndicho kinachoonyeshwa na dashibodi, kwa sababu vyote husoma kupitia `getCallLogById`: data zinazotumwa huwa
tayari zimesafishwa dhidi ya PII na siri zimefichwa zinapoandikwa, na simu inayopigwa kwa
ufunguo wa API wa `noLog` haihifadhi data zozote zinazotumwa, kwa hivyo hakuna cha kuhamisha.

Data zinazotumwa husomwa kwa kila safu kutoka kwenye faili ya artefakti, kwa hivyo ujazaji wa data huendeshwa tu kwa malengo
yaliyouomba. Safu ambayo artefakti yake haipo au imeharibika huhamisha muhtasari wake ikiwa na
data batili za null badala ya kusababisha fungu lishindwe na kukwaza kielekezi.

`maxBodyBytes` (chaguo-msingi ni 262144) huweka kikomo kwa kila sehemu. Data ndefu zaidi **hukatwa badala ya
kuondolewa** — kidokezo kilichokatwa bado hujibu "nini kiliulizwa" — na safu huwekewa alama ya
`bodies_truncated`. Tofauti zinazotiririshwa kipande kwa kipande hazihamishwi; jibu lililounganishwa
tayari liko katika `pipeline_provider_response` na `pipeline_client_response`.

---

## 2. Faili

| Sehemu                            | Mahali                                       |
| --------------------------------- | -------------------------------------------- |
| Mkataba wa lengwa                 | `src/lib/logExport/types.ts`                 |
| Sajili                            | `src/lib/logExport/registry.ts`              |
| Ushughulikiaji wa siri            | `src/lib/logExport/secrets.ts`               |
| Kiendeshaji (kitanzi cha kishale) | `src/lib/logExport/runner.ts`                |
| Uwasilishaji wa API               | `src/lib/logExport/presenter.ts`             |
| Lengwa la BigQuery                | `src/lib/logExport/destinations/bigquery.ts` |
| Uthibitishaji wa Google SA        | `src/lib/logExport/googleServiceAccount.ts`  |
| Chanzo cha kumbukumbu za miito    | `src/lib/usage/callLogExportSource.ts`       |
| Hifadhi endelevu                  | `src/lib/db/logExportDestinations.ts`        |
| Kazi ya Cron                      | `src/lib/jobs/logExportJob.ts`               |
| Tabaka la REST                    | `src/app/api/log-export/`                    |
| Ukurasa wa dashibodi              | `src/app/(dashboard)/dashboard/log-export/`  |

Skima: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API ya REST

Njia zote zinahitaji uthibitishaji wa usimamizi (`requireManagementAuth`). Siri hazirejeshwi kamwe:
siri iliyohifadhiwa hurudishwa kama thamani halisi `__stored__`, na kutuma thamani hiyo tena wakati wa kusasisha
huhifadhi kitambulisho kilichopo.

Kuunda au kusasisha lengwa ambalo aina yake imetangaza siri **kunahitaji
`STORAGE_ENCRYPTION_KEY`**. Bila hiyo, `encrypt()` hupitisha thamani kimyakimya bila kuibadilisha, kwa hiyo uandishi
hukataliwa kwa 400 badala ya kuweka kitambulisho katika SQLite kama maandishi wazi (ulinzi uleule
unaotumiwa na webhook ya Telegram).

| Mbinu    | Njia                                     | Kusudi                                                                 |
| -------- | ---------------------------------------- | ---------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Aina za lengwa + orodha ya sehemu zake za usanidi                      |
| `GET`    | `/api/log-export/destinations`           | Orodhesha malengwa (siri zimefichwa)                                   |
| `POST`   | `/api/log-export/destinations`           | Unda lengwa                                                            |
| `GET`    | `/api/log-export/destinations/{id}`      | Soma lengwa moja                                                       |
| `PUT`    | `/api/log-export/destinations/{id}`      | Sasisha jina / kuwezeshwa / usanidi / uwekaji katika makundi           |
| `DELETE` | `/api/log-export/destinations/{id}`      | Futa                                                                   |
| `POST`   | `/api/log-export/destinations/{id}/test` | Jaribu vitambulisho, usiandike chochote                                |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Hamisha sasa, kwa njia sawa na utekelezaji ulioratibiwa                |
| `GET`    | `/api/log-export/status`                 | Hali ya Cron, utekelezaji wa hivi karibuni, mlundikano kwa kila lengwa |

`GET /api/log-export/types` ndiyo inayofanya UI iwe ya jumla: fomu ya dashibodi huonyeshwa kutokana na
vifafanuzi vya sehemu vinavyorejeshwa, kwa hiyo lengwa jipya halihitaji mabadiliko ya UI.

---

## 4. Lengwa la BigQuery

Vifunguo vya usanidi (`type: "bigquery"`):

| Ufunguo              | Maelezo                                                                                        |
| -------------------- | ---------------------------------------------------------------------------------------------- |
| `projectId`          | Mradi wa GCP unaohifadhi seti ya data                                                          |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                                |
| `tableId`            | `[A-Za-z0-9_]+`                                                                                |
| `location`           | Hutumiwa tu wakati seti ya data inapaswa kuundwa (chaguo-msingi `EU`)                          |
| `serviceAccountJson` | Ufunguo wa akaunti ya huduma. Siri: umesimbwa kwa njia fiche unapohifadhiwa, haurejeshwi kamwe |
| `autoCreate`         | Unda seti ya data na jedwali wakati wa uhamishaji wa kwanza (chaguo-msingi `true`)             |

Akaunti ya huduma inahitaji `bigquery.tables.updateData` kwenye jedwali lengwa, pamoja na
`bigquery.datasets.create` / `bigquery.tables.create` wakati `autoCreate` imewashwa.

Kundi lililosanidiwa ni kitengo cha **kishale**, si cha HTTP: `send()` huligawanya katika miito ya insertAll
yenye upeo wa safu mlalo 500, kwa hiyo `batch_size` kubwa haiwezi kuzidi kikomo cha ombi cha MB 10 cha BigQuery.
Hali za muda (408/429/500/502/503/504) hujaribiwa tena hadi mara tatu kwa ucheleweshaji unaoongezeka
kwa kasi ya kielelezo, huku insertIds zilezile zikitumiwa tena; hitilafu za uthibitishaji na skima hutupa hitilafu katika jaribio la kwanza
badala ya kupoteza utekelezaji.

Jedwali lililoundwa muda mfupi uliopita bado halionekani kwa kituo cha utiririshaji, ambacho hujibu
404 kwa sekunde chache. 404 hiyo hujaribiwa tena, lakini **ikiwa tu utekelezaji huu uliunda jedwali** —
jedwali ambalo kwa kweli halipo bado hushindwa mara moja. Kumbuka kuwa kuunda upya jedwali kwa jina ambalo
lilifutwa hivi karibuni hufanya BigQuery ikatae uingizaji wa kutiririsha kwa dakika kadhaa; hiyo ni
sifa ya kufuta-kisha-kuunda-upya, kwa hiyo ni bora kutumia jina jipya la jedwali badala ya kuliondoa na kuliongeza tena.

**Hitilafu ya sehemu huwasili kama HTTP 200 yenye `insertErrors[]` isiyo tupu.** Hiyo huchukuliwa kama
hitilafu na hutupa hitilafu, jambo linalozuia kishale kusonga mbele kupita safu mlalo ambazo BigQuery
haikukubali; `tests/unit/log-export-bigquery.test.ts` huthibitisha tabia hiyo.

Usafirishaji hutumia REST ya kawaida — dai la RS256 lililotiwa saini kibinafsi hubadilishwa kuwa tokeni ya ufikiaji katika
`https://oauth2.googleapis.com/token`, kisha safu mlalo hutumwa kwa `tabledata.insertAll`. Hakuna SDK ya Google
inayoongezwa. Tokeni za ufikiaji huhifadhiwa kwa muda ndani ya mchakato kwa kila jozi ya (akaunti ya huduma, upeo).

Jedwali linaloundwa huwa na safu wima moja kwa kila sehemu ya kichupo cha Logs pamoja na `exported_at`, na hupangwa kwa
jinsi kumbukumbu za miito zinavyoulizwa:

- **Hugawanywa kwa siku kulingana na `timestamp`**, kwa hiyo hoja iliyowekewa mipaka ya tarehe huchanganua siku hizo pekee.
- **Hupangwa katika makundi kulingana na `api_key_name`, `provider`, `model`, `status`** (kwa mpangilio huo), kwa hiyo kuchuja kulingana na
  nani aliyeiendesha, ilikoenda, au kama ilishindwa huondoa vizuizi visivyohitajika ndani ya kila sehemu. BigQuery
  huruhusu safu wima zisizozidi nne za upangaji katika makundi na mpangilio ni muhimu: kichujio cha `api_key_name` pekee
  huondoa vizuizi visivyohitajika, lakini kichujio cha `status` pekee hakifanyi hivyo.
- **Uhifadhi wa hiari wa sehemu** kupitia `partitionExpirationDays` (0 huhifadhi kila kitu), unaotumika
  jedwali linapoundwa.

Mipangilio yote miwili hutumika wakati wa kuunda. Jedwali lililopo huhifadhi mpangilio wowote ambao tayari linao, kwa hivyo
elekeza lengwa kwenye kitambulisho kipya cha jedwali ikiwa ungependa kuitumia.

`tests/unit/log-export-bigquery.test.ts` huhakikisha kuwa kipangaji na skima ya jedwali zinaendelea
kuwiana, ili safu wima mpya ya kumbukumbu za simu isipotezwe kimyakimya wakati wa kuhamishwa.

Makundi hugawanywa kulingana na **vyote viwili**, idadi ya safu mlalo na baiti zilizobadilishwa kuwa mfuatano. Idadi ya safu mlalo pekee haitoshi
mara tu payload zinaposafirishwa: safu mlalo 500 zenye prompts zinaweza kufikia makumi ya megabaiti, na insertAll
hukataa ombi linalozidi MB 10. Vipande hufungwa vinapofikia safu mlalo 500 au MB 9, chochote kinachotangulia.

---

## 5. Kuongeza lengwa

1. Unda `src/lib/logExport/destinations/<name>.ts` inayohamisha `LogExportDestinationType`:
   `configSchema` ya Zod, safu ya vifafanuzi vya `fields` kwa ajili ya UI, `secretFields`, na
   `createClient(config)` inayorejesha `test()` / `prepare()` / `send(records)`.
2. Iongeze kwenye safu ya `DESTINATIONS` katika `src/lib/logExport/registry.ts`.
3. Andika majaribio chini ya `tests/unit/`.

Hayo ndiyo mabadiliko yote: uhifadhi, kazi ya cron, safu ya REST, usimbaji fiche wa siri na
fomu ya dashibodi zote husoma sajili.

Sheria mbili za lengwa jipya:

- `send()` **lazima itupe hitilafu** ikiwa kuna kutofaulu kwa sehemu. Kukamilika kunamaanisha "lengwa lina safu hizi",
  na kishale husogea mbele yao kabisa.
- Lengwa linalotumia URL iliyotolewa na mtumiaji lazima liithibitishe kupitia
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) kabla ya kuichota,
  kwa njia ileile inayotumiwa na webhooks. BigQuery haihitaji hili: vipangishi vyake ni thabiti.

---

## 6. Kuiendesha

- **Dashibodi**: Integrations → Log export. Ongeza lengwa, tumia **Test** kukagua vitambulisho
  bila kuandika safu, kisha liwashe.
- **Mlundikano**: kila kadi ya lengwa huonyesha safu zinazosubiri na kishale; `GET
/api/log-export/status` hurejesha takwimu hizohizo pamoja na utekelezaji 20 wa mwisho wa kazi.
- **Lengwa linaloshindwa halisababishi mengine yashindwe** — muhtasari wa utekelezaji hurekodi hali ya kila lengwa
  katika `last_status` / `last_error`, na historia ya utekelezaji wa kazi huhifadhi jumla.
- **Kufuta lengwa hufuta kishale chake.** Kuliongeza tena huanzia kwenye kumbukumbu ya zamani zaidi ya simu
  iliyohifadhiwa, jambo ambalo hutuma upya safu ambazo huenda lengwa tayari linazo. Kwenye BigQuery, `insertId`
  ya kila safu hushughulikia hilo ndani tu ya kipindi cha BigQuery chenyewe cha kuondoa nakala, kwa hivyo ni bora
  kuzima lengwa badala ya kulifuta.
