# Log export (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Nuolatinis, laipsniškas „OmniRoute“ skambučių žurnalų eksportavimas į išorinę analizės duomenų saugyklą.

Žurnalų valdymo skydelio skirtuke užklausų istorija saugoma SQLite (`call_logs`), o jos apimtį
riboja rotacija ir saugojimo laikotarpis. Žurnalų eksportavimo funkcija pagal tvarkaraštį išsiunčia
tą patį įrašų rinkinį, kad jis galėtų būti saugomas ilgiau nei vietinėje duomenų bazėje ir susietas
su kitais duomenimis. Pirmoji paskirties vieta yra BigQuery; duomenų perdavimo kanalas pagrįstas
registru, todėl galima papildomai pridėti daugiau paskirties vietų.

---

## 1. Kaip tai veikia

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (Žurnalų skirtuko laukų rinkinys)
      → paskirties vietos client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Tvarkaraštis** — viena `JobRegistry` cron užduotis `log_export`, kurios numatytoji reikšmė yra `0 * * * *` (kas valandą,
  UTC). Ji registruojama faile `src/lib/initCloudSync.ts`; jos reikšmę galima pakeisti naudojant `OMNIROUTE_LOG_EXPORT_CRON`.
  Kiekvieno vykdymo metu nuosekliai apdorojama kiekviena **įjungta** paskirties vieta.
- **Žymeklis** — numanomas SQLite `call_logs.rowid`, saugomas atskirai kiekvienai paskirties vietai lauke
  `log_export_destinations.cursor_row_id`. `timestamp` sąmoningai nenaudojamas kaip žymeklis: iškviečiantieji
  gali pateikti savo reikšmę, todėl lėta užklausa gali būti įrašyta po greitesnės užklausos, kuri buvo pradėta
  vėliau, o naudojant laiko žymos žymeklį ji būtų praleista.
- **Paketinis apdorojimas** — `batch_size` eilučių vienai užklausai (numatytoji reikšmė 500), `max_rows_per_run` eilučių vienam vykdymui
  (numatytoji reikšmė 10000), kad didelė sankaupa būtų apdorojama per kelis vykdymus, o ne blokuotų vieną vykdymą.
- **Pristatymas** — žymeklis perkeliamas pirmyn tik sėkmingai užbaigus `send()`. Jei paketo išsiųsti nepavyksta,
  žymeklis lieka ankstesnėje vietoje, todėl tos pačios eilutės pakartotinai bandomos išsiųsti kito vykdymo metu. Užtikrinamas
  bent vienas pristatymas ir dublikatų šalinimas paskirties vietoje, o ne tikras tiksliai vienkartinis pristatymas: BigQuery kiekvienai
  eilutei kaip raktą naudoja skambučių žurnalo ID ir, kiek įmanoma, į jį atsižvelgia savo dublikatų šalinimo laikotarpio ribose.
- **Persidengimo apsauga** — cron vykdymas ir `POST .../run` gali įvykti vienu metu. Jau apdorojama paskirties vieta
  praleidžiama, užuot apdorojus ją du kartus (`skipped: true` vykdymo rezultate),
  todėl lygiagretus vykdymas negali pakartotinai išsiųsti paketo ar perkelti žymeklio atgal.
- **Atkūrimas po išvalymo** — jei `cursor_row_id` tampa didesnis už `MAX(rowid)` (visa lentelė buvo
  išvalyta, o eilučių ID pradėti skaičiuoti iš naujo), vykdymo priemonė grąžina žymeklį į 0, užuot visam laikui nustojusi aptikti įrašus.

### Naudingieji duomenys (užklausos ir atsakymai)

Pagal numatytąsias nuostatas eksportuojami tik suvestinės laukai, rodomi Žurnalų **sąraše**. Įjungus
**Eksportuoti užklausas ir atsakymus** (`includeBodies`), papildomai siunčiama tai, ką Žurnalų **išsamios informacijos**
sritis rodo apie kiekvieną skambutį:

| Laukas                           | Kas jame saugoma                                                                  |
| -------------------------------- | --------------------------------------------------------------------------------- |
| `request_body` / `response_body` | Skambučio naudingieji duomenys, kaip juos pateikia valdymo skydelis               |
| `pipeline_route_decision`        | Kurį tikslą ir modelį parinko maršruto parinkimo priemonė                         |
| `pipeline_client_request`        | Neapdorota užklausa, tiksliai tokia, kokią ją išsiuntė klientas                   |
| `pipeline_openai_request`        | Užklausa po konvertavimo į vidinį OpenAI formatą                                  |
| `pipeline_provider_request`      | Faktiškai aukštesnio lygmens paslaugai išsiųsta užklausa teikėjo dialektu         |
| `pipeline_provider_response`     | Neapdorotas aukštesnio lygmens paslaugos atsakymas                                |
| `pipeline_client_response`       | Kas buvo grąžinta iškvietusiajam                                                  |
| `pipeline_error`                 | Duomenų perdavimo kanalo lygmens klaidos informacija apie nepavykusį skambutį     |
| `bodies_truncated`               | Teigiama reikšmė, kai kuris nors anksčiau nurodytas laukas pasiekė `maxBodyBytes` |

Tai yra užklausų turinys, todėl ši funkcija pagal numatytąsias nuostatas yra **išjungta** ir sąmoningai pasirenkama atskirai kiekvienai paskirties vietai.
Išsiunčiama tai, ką rodo valdymo skydelis, nes abu duomenis gauna per `getCallLogById`: naudingieji duomenys
jau būna nuasmeninti pašalinant asmenį identifikuojančią informaciją ir paslaptys būna paslėptos juos įrašant, o skambučio, atlikto naudojant
`noLog` API raktą, naudingieji duomenys visai nesaugomi, todėl nėra ko eksportuoti.

Kiekvienos eilutės naudingieji duomenys skaitomi iš failų sistemos artefakto, todėl jų užpildymas atliekamas tik toms paskirties vietoms,
kurioms jų reikia. Jei eilutės artefakto nėra arba jis sugadintas, eksportuojama jos suvestinė su nuliniais
naudingaisiais duomenimis, užuot nutraukus paketo apdorojimą ir užblokavus žymeklį.

`maxBodyBytes` (numatytoji reikšmė 262144) riboja kiekvieno lauko dydį. Ilgesni naudingieji duomenys **sutrumpinami, o ne
atmetami** — apkarpyta užklausa vis tiek atsako į klausimą „ko buvo klausiama“ — ir eilutė pažymima
`bodies_truncated`. Dalimis srautiniu būdu perduodami pokyčiai neeksportuojami; surinktas atsakymas
jau yra laukuose `pipeline_provider_response` ir `pipeline_client_response`.

---

## 2. Failai

| Dalis                      | Vieta                                        |
| -------------------------- | -------------------------------------------- |
| Paskirties vietos sutartis | `src/lib/logExport/types.ts`                 |
| Registras                  | `src/lib/logExport/registry.ts`              |
| Paslapčių tvarkymas        | `src/lib/logExport/secrets.ts`               |
| Vykdyklė (žymeklio ciklas) | `src/lib/logExport/runner.ts`                |
| API projekcija             | `src/lib/logExport/presenter.ts`             |
| BigQuery paskirties vieta  | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA autentifikavimas | `src/lib/logExport/googleServiceAccount.ts`  |
| Skambučių žurnalo šaltinis | `src/lib/usage/callLogExportSource.ts`       |
| Nuolatinis saugojimas      | `src/lib/db/logExportDestinations.ts`        |
| Cron užduotis              | `src/lib/jobs/logExportJob.ts`               |
| REST sluoksnis             | `src/app/api/log-export/`                    |
| Valdymo skydelio puslapis  | `src/app/(dashboard)/dashboard/log-export/`  |

Schema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Visiems maršrutams taikomas valdymo autentifikavimas (`requireManagementAuth`). Paslaptys niekada negrąžinamos:
išsaugota paslaptis grąžinama kaip pažodinė reikšmė `__stored__`, o siunčiant šią reikšmę atgal atnaujinimo metu
išsaugoti prisijungimo duomenys paliekami nepakeisti.

Norint sukurti arba atnaujinti paskirties vietą, kurios tipas deklaruoja paslaptį, **būtinas
`STORAGE_ENCRYPTION_KEY`**. Be jo `encrypt()` tyliai praleidžia duomenis nepakeistus, todėl įrašymas
atmetamas su 400 klaida, užuot įrašius prisijungimo duomenis į SQLite kaip paprastąjį tekstą (tokia pati apsauga
taikoma Telegram webhook).

| Metodas  | Kelias                                   | Paskirtis                                                                              |
| -------- | ---------------------------------------- | -------------------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Paskirties vietų tipai ir jų konfigūracijos laukų sąrašas                              |
| `GET`    | `/api/log-export/destinations`           | Paskirties vietų sąrašas (paslaptys užmaskuotos)                                       |
| `POST`   | `/api/log-export/destinations`           | Sukurti paskirties vietą                                                               |
| `GET`    | `/api/log-export/destinations/{id}`      | Nuskaityti vieną                                                                       |
| `PUT`    | `/api/log-export/destinations/{id}`      | Atnaujinti pavadinimą / įjungimo būseną / konfigūraciją / paketavimą                   |
| `DELETE` | `/api/log-export/destinations/{id}`      | Ištrinti                                                                               |
| `POST`   | `/api/log-export/destinations/{id}/test` | Patikrinti prisijungimo duomenis nieko neįrašant                                       |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Išsiųsti dabar tuo pačiu keliu kaip suplanuoto vykdymo metu                            |
| `GET`    | `/api/log-export/status`                 | Cron būsena, naujausi vykdymai, kiekvienos paskirties vietos neišsiųstų duomenų kiekis |

`GET /api/log-export/types` leidžia UI būti bendriniu: valdymo skydelio forma generuojama pagal
grąžintus laukų aprašus, todėl naujai paskirties vietai nereikia jokių UI pakeitimų.

---

## 4. BigQuery paskirties vieta

Konfigūracijos raktai (`type: "bigquery"`):

| Raktas               | Pastabos                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `projectId`          | GCP projektas, kuriame yra duomenų rinkinys                                              |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                          |
| `tableId`            | `[A-Za-z0-9_]+`                                                                          |
| `location`           | Naudojama tik tada, kai reikia sukurti duomenų rinkinį (numatytoji reikšmė `EU`)         |
| `serviceAccountJson` | Paslaugos paskyros raktas. Paslaptis: užšifruojama saugykloje, niekada negrąžinama       |
| `autoCreate`         | Sukurti duomenų rinkinį ir lentelę pirmojo eksportavimo metu (numatytoji reikšmė `true`) |

Paslaugos paskyrai reikia `bigquery.tables.updateData` teisės paskirties lentelėje, taip pat
`bigquery.datasets.create` / `bigquery.tables.create`, kai `autoCreate` yra įjungta.

Sukonfigūruotas paketas yra **žymeklio**, o ne HTTP vienetas: `send()` suskaido jį į insertAll
užklausas, kurių kiekvienoje yra ne daugiau kaip 500 eilučių, todėl didelė `batch_size` reikšmė negali viršyti BigQuery 10 MB užklausos ribos.
Gavus laikinas būsenas (408/429/500/502/503/504), užklausa kartojama iki trijų kartų, taikant eksponentiškai
didėjančią delsą ir pakartotinai naudojant tuos pačius insertIds; autentifikavimo ir schemos klaidos išmetamos per pirmąjį bandymą,
užuot eikvojus vykdymą.

Prieš akimirką sukurta lentelė dar nėra matoma srautinio perdavimo galiniam taškui, kuris kelias
sekundes grąžina 404. Tokiu atveju 404 užklausa kartojama, bet **tik kai lentelė buvo sukurta šio vykdymo metu** —
jei lentelės iš tiesų nėra, operacija nedelsiant nutraukiama su klaida. Atkreipkite dėmesį, kad pakartotinai sukūrus lentelę tuo pačiu pavadinimu,
kuriuo neseniai ištrinta lentelė, BigQuery kelias minutes neleidžia srautinio įterpimo; tai yra
ištrynimo ir pakartotinio sukūrimo ypatybė, todėl užuot pašalinus ir vėl pridėjus lentelę, geriau naudoti naują jos pavadinimą.

**Dalinė klaida pateikiama kaip HTTP 200 su netuščiu `insertErrors[]`.** Tai laikoma
klaida ir išmetama išimtis, todėl žymeklis neperkeliamas už eilučių, kurių BigQuery nepriėmė;
`tests/unit/log-export-bigquery.test.ts` įtvirtina šią elgseną.

Perdavimui naudojamas paprastas REST — savarankiškai pasirašytas RS256 patvirtinimas iškeičiamas į prieigos atpažinimo ženklą adresu
`https://oauth2.googleapis.com/token`, tada eilutės siunčiamos į `tabledata.insertAll`. Joks Google SDK
neįtraukiamas. Prieigos atpažinimo ženklai proceso atmintyje kaupiami podėlyje pagal (paslaugos paskyros, aprėpties) porą.

Sukurtoje lentelėje yra po vieną stulpelį kiekvienam skirtuko „Logs“ laukui ir `exported_at`; ji išdėstyta
atsižvelgiant į tai, kaip iš tikrųjų vykdomos skambučių žurnalų užklausos:

- **Suskirstyta dienomis pagal `timestamp`**, todėl pagal datą apribota užklausa nuskaito tik tas dienas.
- **Sugrupuota pagal `api_key_name`, `provider`, `model`, `status`** (tokia tvarka), todėl filtravimas pagal
  tai, kas vykdė užklausą, kur ji buvo siunčiama arba ar ji nepavyko, leidžia praleisti blokus kiekviename skaidinyje. BigQuery
  leidžia naudoti daugiausia keturis grupavimo stulpelius, o jų tvarka yra svarbi: vien tik filtras pagal `api_key_name`
  leidžia praleisti blokus, o vien tik filtras pagal `status` — ne.
- **Pasirenkamas skaidinių saugojimo laikotarpis** per `partitionExpirationDays` (0 išsaugo viską), taikomas
  kuriant lentelę.

Abu nustatymai taikomi kūrimo metu. Esama lentelė išlaiko jau turimą struktūrą, todėl, jei norite juos pritaikyti, nurodykite naują paskirties lentelės ID.

`tests/unit/log-export-bigquery.test.ts` užtikrina, kad susiejimo logika ir lentelės schema išliktų sinchronizuotos, todėl naujas skambučių žurnalo stulpelis negali būti nepastebimai praleistas eksportuojant.

Paketai skaidomi atsižvelgiant **ir** į eilučių skaičių, **ir** į serializuotų duomenų dydį baitais. Eksportuojant naudingąsias apkrovas, vien eilučių skaičiaus nepakanka: 500 eilučių su užklausomis gali užimti dešimtis megabaitų, o insertAll atmeta didesnes nei 10 MB užklausas. Paketai užbaigiami pasiekus 500 eilučių arba 9 MB, atsižvelgiant į tai, kuri riba pasiekiama pirmiau.

---

## 5. Paskirties vietos pridėjimas

1. Sukurkite `src/lib/logExport/destinations/<name>.ts`, kuris eksportuoja `LogExportDestinationType`:
   „Zod“ `configSchema`, naudotojo sąsajai skirtą `fields` aprašų masyvą, `secretFields` ir
   `createClient(config)`, grąžinantį `test()` / `prepare()` / `send(records)`.
2. Pridėkite jį prie `DESTINATIONS` masyvo faile `src/lib/logExport/registry.ts`.
3. Parašykite testus kataloge `tests/unit/`.

Tai ir yra visas pakeitimas: išsaugojimo mechanizmas, „cron“ užduotis, REST sluoksnis, slaptųjų
duomenų šifravimas ir valdymo skydelio forma naudoja registrą.

Dvi naujos paskirties vietos taisyklės:

- `send()` **privalo išmesti klaidą**, jei įvyko dalinė triktis. Sėkmingas užbaigimas reiškia „ši
  paskirties vieta turi šias eilutes“, o žymeklis negrįžtamai perkeliamas už jų.
- Paskirties vieta, naudojanti naudotojo pateiktą URL, prieš siųsdama užklausą privalo jį patikrinti
  per `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) taip pat, kaip
  tai daro „webhook“ iškvietos. „BigQuery“ to nereikia, nes jos pagrindinių kompiuterių vardai yra
  konstantos.

---

## 6. Naudojimas

- **Valdymo skydelis**: Integracijos → Žurnalų eksportavimas. Pridėkite paskirties vietą, paleiskite
  **Testą**, kad patikrintumėte prisijungimo duomenis neįrašydami eilučių, tada ją įjunkite.
- **Neapdorotų įrašų eilė**: kiekvienoje paskirties vietos kortelėje rodomos laukiančios eilutės ir
  žymeklis; `GET /api/log-export/status` grąžina tuos pačius rodiklius ir 20 paskutinių užduoties
  vykdymų.
- **Vienos paskirties vietos triktis nesutrikdo kitų** — vykdymo suvestinėje kiekvienos paskirties
  vietos būsena įrašoma į `last_status` / `last_error`, o užduoties vykdymų istorijoje išsaugomas
  bendras rezultatas.
- **Ištrynus paskirties vietą, ištrinamas ir jos žymeklis.** Pridėjus ją iš naujo, pradedama nuo
  seniausio išsaugoto iškvietimų žurnalo įrašo, todėl pakartotinai siunčiamos eilutės, kurias
  paskirties vieta galbūt jau turi. „BigQuery“ atveju kiekvienos eilutės `insertId` tai kompensuoja
  tik per pačios „BigQuery“ dublikatų šalinimo laikotarpį, todėl paskirties vietą geriau išjungti,
  o ne ištrinti.
