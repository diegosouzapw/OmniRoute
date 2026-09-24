# Log export (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

OmniRoute'i kõnelogide pidev, inkrementaalne eksport välisesse analüütikaandmehoidlasse.

Logide töölaua vahekaart säilitab päringute ajaloo SQLite'is (`call_logs`), mille mahtu piiravad
rotatsioon ja säilitusperiood. Logide eksport saadab sama kirjete kogumi ajakava alusel välja, et see säiliks
kohalikust andmebaasist kauem ja seda saaks muude andmetega ühendada. BigQuery on esimene sihtkoht;
konveier kasutab registrit, seega saab sihtkohti juurde lisada.

---

## 1. Kuidas see töötab

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (logide vahekaardi väljade kogum)
      → sihtkoha client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Ajakava** — üks `JobRegistry` cron-töö, `log_export`, mille vaikeväärtus on `0 * * * *` (kord tunnis,
  UTC). Registreeritud failis `src/lib/initCloudSync.ts`; muudetav muutujaga `OMNIROUTE_LOG_EXPORT_CRON`.
  Iga käivitus töötleb järjest lõpuni kõiki **lubatud** sihtkohti.
- **Kursor** — SQLite'i implitsiitne `call_logs.rowid`, mida säilitatakse iga sihtkoha kohta väljal
  `log_export_destinations.cursor_row_id`. `timestamp` ei ole teadlikult kursoriks valitud: kutsujad
  võivad anda sellele oma väärtuse, mistõttu aeglane päring võidakse kirjutada pärast kiiremat päringut, mis algas
  hiljem, ning ajatemplil põhinev kursor jätaks selle vahele.
- **Pakktöötlus** — `batch_size` rida päringu kohta (vaikimisi 500), `max_rows_per_run` rida käivituse kohta
  (vaikimisi 10000), et suur mahajäämus töödeldaks mitme käivituse jooksul ega blokeeriks ühte käivitust.
- **Edastus** — kursor liigub edasi alles pärast `send()` edukat lõppemist. Nurjunud pakk jätab
  kursori endisesse asukohta, mistõttu samu ridu proovitakse järgmisel käivitusel uuesti saata. Garantii on
  vähemalt üks kord edastamine koos sihtkohapoolse duplikaatide eemaldamisega, mitte tegelik täpselt üks kord edastamine: BigQuery määrab iga
  rea võtmeks kõnelogi ID, mida see oma duplikaatide eemaldamise ajavahemikus võimaluste piires arvestab.
- **Kattuvuse kaitse** — cron-käivitus ja `POST .../run` võivad toimuda samal ajal. Juba töödeldav
  sihtkoht jäetakse teistkordse töötlemise asemel vahele (käivitustulemuses `skipped: true`),
  mistõttu samaaegne käivitus ei saa pakki uuesti saata ega kursorit tagasi liigutada.
- **Taaste pärast kustutamist** — kui `cursor_row_id` satub väärtusest `MAX(rowid)` suuremaks (kogu tabel
  kustutati ja rea-ID-d alustasid uuesti algusest), lähtestab käitaja kursori väärtusele 0, selle asemel et jääda püsivalt uusi kirjeid eirama.

### Lastid (viibad ja vastused)

Vaikimisi sisaldab eksport ainult kokkuvõttevälju, mida kuvatakse logide **loendis**. Valiku
**Ekspordi viibad ja vastused** (`includeBodies`) sisselülitamisel saadetakse lisaks see, mida kuvatakse logide **üksikasjade**
paanil iga kõne kohta:

| Väli                             | Mida see sisaldab                                             |
| -------------------------------- | ------------------------------------------------------------- |
| `request_body` / `response_body` | Kõne lastid sellisel kujul, nagu töölaud neid kuvab           |
| `pipeline_route_decision`        | Millise sihtmärgi ja mudeli ruuter valis                      |
| `pipeline_client_request`        | Toorpäring täpselt sellisel kujul, nagu klient selle saatis   |
| `pipeline_openai_request`        | Pärast teisendamist sisemisse OpenAI vormingusse              |
| `pipeline_provider_request`      | Tegelikult ülesvoolu saadetud kujul, teenusepakkuja dialektis |
| `pipeline_provider_response`     | Töötlemata ülesvoolu vastus                                   |
| `pipeline_client_response`       | Kutsujale tagastatud sisu                                     |
| `pipeline_error`                 | Konveieri taseme vea üksikasjad nurjunud kõne korral          |
| `bodies_truncated`               | Tõene, kui mõni ülaltoodud väli saavutas `maxBodyBytes` piiri |

See on viiba sisu, seega on see **vaikimisi välja lülitatud** ja teadlikult iga sihtkoha jaoks eraldi valitav.
Saadetakse see, mida töölaud kuvab, sest mõlemad loevad funktsiooni `getCallLogById` kaudu: lastid
on nende kirjutamise ajaks juba isikuandmetest puhastatud ja saladused on eemaldatud ning võtmega
`noLog` API tehtud kõne ei salvesta üldse lasti, seega pole midagi eksportida.

Lastid loetakse iga rea kohta failisüsteemi artefaktist, mistõttu rikastamine käivitatakse ainult nende sihtkohtade jaoks,
mis seda taotlesid. Rida, mille artefakt puudub või on rikutud, ekspordib oma kokkuvõtte nullväärtusega
lastidega, selle asemel et pakk nurjata ja kursor kinni jätta.

`maxBodyBytes` (vaikimisi 262144) piirab iga välja suurust. Pikemad lastid **kärbitakse, mitte ei
jäeta välja** — kärbitud viip vastab siiski küsimusele „mida küsiti“ — ja rida märgistatakse väljaga
`bodies_truncated`. Tükikaupa voogedastatud deltaväärtusi ei ekspordita; koostatud vastus on
juba väljadel `pipeline_provider_response` ja `pipeline_client_response`.

---

## 2. Failid

| Osa                      | Asukoht                                      |
| ------------------------ | -------------------------------------------- |
| Sihtkoha leping          | `src/lib/logExport/types.ts`                 |
| Register                 | `src/lib/logExport/registry.ts`              |
| Saladuste käsitlemine    | `src/lib/logExport/secrets.ts`               |
| Käitaja (kursoritsükkel) | `src/lib/logExport/runner.ts`                |
| API-projektsioon         | `src/lib/logExport/presenter.ts`             |
| BigQuery sihtkoht        | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA autentimine    | `src/lib/logExport/googleServiceAccount.ts`  |
| Kõnelogi allikas         | `src/lib/usage/callLogExportSource.ts`       |
| Püsimälu                 | `src/lib/db/logExportDestinations.ts`        |
| Croni töö                | `src/lib/jobs/logExportJob.ts`               |
| REST-kiht                | `src/app/api/log-export/`                    |
| Töölaua leht             | `src/app/(dashboard)/dashboard/log-export/`  |

Skeem: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Kõik marsruudid nõuavad haldusautentimist (`requireManagementAuth`). Saladusi ei tagastata kunagi:
salvestatud saladus tagastatakse literaalina `__stored__` ning selle väärtuse saatmine uuendamisel
säilitab salvestatud pääsuteabe.

Sihtkoha loomine või uuendamine, kui selle tüüp deklareerib saladuse, **nõuab
`STORAGE_ENCRYPTION_KEY`**. Ilma selleta on `encrypt()` vaikne läbivoperatsioon, mistõttu
keeldutakse kirjutamisest veakoodiga 400, selle asemel et talletada pääsuteave SQLite'i lihttekstina
(sama kaitset rakendab Telegrami veebihaak).

| Meetod   | Tee                                      | Eesmärk                                                           |
| -------- | ---------------------------------------- | ----------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Sihtkohatüübid ja nende konfiguratsiooniväljade loend             |
| `GET`    | `/api/log-export/destinations`           | Sihtkohtade loend (saladused peidetud)                            |
| `POST`   | `/api/log-export/destinations`           | Sihtkoha loomine                                                  |
| `GET`    | `/api/log-export/destinations/{id}`      | Ühe sihtkoha lugemine                                             |
| `PUT`    | `/api/log-export/destinations/{id}`      | Nime / lubatuse / konfiguratsiooni / paketeerimise uuendamine     |
| `DELETE` | `/api/log-export/destinations/{id}`      | Kustutamine                                                       |
| `POST`   | `/api/log-export/destinations/{id}/test` | Pääsuteabe kontrollimine ilma midagi kirjutamata                  |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Kohene tühjendamine, sama tee nagu ajastatud käitusel             |
| `GET`    | `/api/log-export/status`                 | Croni olek, hiljutised käitused, iga sihtmärgi ootel kirjete hulk |

`GET /api/log-export/types` muudab kasutajaliidese üldiseks: töölaua vorm renderdatakse
tagastatud väljadeskriptorite põhjal, seega ei vaja uus sihtkoht kasutajaliidese muudatust.

---

## 4. BigQuery sihtkoht

Konfiguratsioonivõtmed (`type: "bigquery"`):

| Võti                 | Märkused                                                                  |
| -------------------- | ------------------------------------------------------------------------- |
| `projectId`          | GCP projekt, mis sisaldab andmestikku                                     |
| `datasetId`          | `[A-Za-z0-9_]+`                                                           |
| `tableId`            | `[A-Za-z0-9_]+`                                                           |
| `location`           | Kasutatakse ainult siis, kui andmestik tuleb luua (vaikimisi `EU`)        |
| `serviceAccountJson` | Teenusekonto võti. Saladus: puhkeolekus krüpteeritud, ei tagastata kunagi |
| `autoCreate`         | Andmestiku ja tabeli loomine esimesel eksportimisel (vaikimisi `true`)    |

Teenusekonto vajab sihttabelis õigust `bigquery.tables.updateData` ning juhul, kui `autoCreate`
on sisse lülitatud, õigusi `bigquery.datasets.create` / `bigquery.tables.create`.

Konfigureeritud pakk on **kursori** ühik, mitte HTTP ühik: `send()` jagab selle `insertAll`
kutseteks, milles on kuni 500 rida, mistõttu suur `batch_size` ei saa ületada BigQuery 10 MB
päringupiirangut. Ajutiste olekukoodidega (408/429/500/502/503/504) päringuid proovitakse
eksponentsiaalse viivitusega kuni kolm korda uuesti, kasutades samu insertIds-väärtusi;
autentimis- ja skeemitõrked annavad vea juba esimesel katsel, selle asemel et käitust asjatult jätkata.

Äsja loodud tabel ei ole voogedastuse lõpp-punktile veel nähtav, mistõttu vastab see mõne sekundi
jooksul koodiga 404. Seda 404 vastust proovitakse uuesti, kuid **ainult siis, kui tabel loodi selle
käituse käigus** — tegelikult puuduv tabel nurjub endiselt kohe. Pange tähele, et hiljuti kustutatud
tabeli sama nime all uuesti loomisel keeldub BigQuery mitme minuti jooksul voogedastatavaid lisamisi
vastu võtmast; see tuleneb kustutamisele järgnevast taasloomisest, seega eelistage tabeli eemaldamisele
ja uuesti lisamisele uut tabelinime.

**Osaline tõrge saabub HTTP 200 vastusena, mille `insertErrors[]` pole tühi.** Seda käsitletakse
tõrkena ja visatakse erind, mis takistab kursoril liikumast mööda ridadest, mida BigQuery kunagi
vastu ei võtnud; `tests/unit/log-export-bigquery.test.ts` fikseerib selle käitumise.

Transport kasutab tavalist REST-i — ise allkirjastatud RS256-väide vahetatakse pääsutõendi vastu
aadressil `https://oauth2.googleapis.com/token`, seejärel saadetakse read meetodile
`tabledata.insertAll`. Ühtegi Google'i SDK-d ei kaasata. Pääsutõendid puhverdatakse protsessisiseselt
iga paari (teenusekonto, ulatus) kohta.

Loodud tabel sisaldab üht veergu iga vahekaardi Logs välja kohta ning lisaks veergu `exported_at`
ja selle paigutus vastab kõnelogide tegelikule päringukasutusele:

- **Päevade kaupa partitsioneeritud välja `timestamp` alusel**, mistõttu kuupäevaga piiratud päring
  skannib ainult neid päevi.
- **Klastriteks jaotatud väljade `api_key_name`, `provider`, `model`, `status` järgi** (selles
  järjekorras), mistõttu käitaja, sihtkoha või nurjumise järgi filtreerimine kõrvaldab iga
  partitsiooni sees ebaolulised plokid. BigQuery lubab kuni nelja klasterdamisveergu ja järjekord on
  oluline: ainult välja `api_key_name` filter kõrvaldab plokke, ainult välja `status` filter mitte.
- **Valikuline partitsioonide säilitusaeg** võtme `partitionExpirationDays` kaudu (0 säilitab kõik),
  mida rakendatakse tabeli loomisel.

Mõlemad sätted rakenduvad loomise ajal. Olemasolev tabel säilitab oma senise paigutuse, seega
nende kasutuselevõtuks suunake sihtkoht uuele tabeli ID-le.

`tests/unit/log-export-bigquery.test.ts` kontrollib, et vastendaja ja tabeli skeem püsiksid
sünkroonis, nii et uut kõnelogi veergu ei saaks eksportimisel märkamatult kõrvale jätta.

Paketid tükeldatakse **nii** ridade arvu kui ka serialiseeritud baitide järgi. Ainult ridade arvust ei piisa,
kui eksporditakse kasulikke andmeid: 500 viipasid sisaldavat rida võib moodustada kümneid megabaite ning insertAll
lükkab tagasi üle 10 MB suuruse päringu. Tükid suletakse 500 rea või 9 MB täitumisel, olenevalt sellest, kumb saabub varem.

---

## 5. Sihtkoha lisamine

1. Loo `src/lib/logExport/destinations/<name>.ts`, mis ekspordib tüübi `LogExportDestinationType`:
   Zodi `configSchema`, kasutajaliidese jaoks mõeldud `fields`-kirjelduste massiiv, `secretFields` ja
   `createClient(config)`, mis tagastab `test()` / `prepare()` / `send(records)`.
2. Lisa see faili `src/lib/logExport/registry.ts` massiivi `DESTINATIONS`.
3. Kirjuta testid kataloogi `tests/unit/`.

See ongi kogu muudatus: püsiandmete kiht, cron-töö, REST-kiht, saladuste krüptimine ja
töölaua vorm loevad kõik registrit.

Kaks reeglit uue sihtkoha jaoks:

- `send()` **peab osalise nurjumise korral erindi viskama**. Edukas lõpulejõudmine tähendab, et „sihtkohas on need read olemas”,
  ning kursor liigub neist jäädavalt edasi.
- Kasutaja antud URL-i kasutav sihtkoht peab selle enne päringu tegemist valideerima funktsiooniga
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`),
  samamoodi nagu veebihaagid. BigQuery puhul pole see vajalik: selle hostid on konstantsed.

---

## 6. Kasutamine

- **Töölaud**: Integratsioonid → Logide eksport. Lisa sihtkoht, käivita mandaatide kontrollimiseks
  ilma ridu kirjutamata **Test** ja seejärel luba sihtkoht.
- **Tööjärg**: iga sihtkoha kaart näitab ootel ridu ja kursorit; `GET
/api/log-export/status` tagastab samad arvud ning viimase 20 töö käivituse andmed.
- **Ühe sihtkoha nurjumine ei põhjusta teiste nurjumist** — käivituse kokkuvõte salvestab iga sihtkoha
  oleku väljadel `last_status` / `last_error` ning töö käivituste ajalugu säilitab koondtulemuse.
- **Sihtkoha kustutamine kustutab selle kursori.** Selle uuesti lisamisel alustatakse vanimast säilitatud
  kõnelogist, mistõttu saadetakse uuesti read, mis võivad sihtkohas juba olemas olla. BigQuery puhul
  kõrvaldab reapõhine `insertId` duplikaadid ainult BigQuery enda deduplikatsiooniakna piires,
  seega eelista sihtkoha kustutamisele selle keelamist.
