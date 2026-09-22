# Log export (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Neprekinjen, inkrementalen izvoz dnevnikov klicev OmniRoute v zunanjo analitično shrambo.

Zavihek nadzorne plošče Dnevniki hrani zgodovino zahtev v SQLite (`call_logs`), njena velikost pa je omejena z
rotacijo in obdobjem hrambe. Izvoz dnevnikov po urniku pošilja isti nabor zapisov drugam, da se lahko ohranijo
dlje od lokalne podatkovne zbirke in združujejo z drugimi podatki. BigQuery je prvi cilj; cevovod
uporablja register, zato je mogoče dodajati nove cilje.

---

## 1. Kako deluje

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (nabor polj zavihka Dnevniki)
      → ciljni client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Urnik** — eno opravilo cron v `JobRegistry`, `log_export`, s privzeto vrednostjo `0 * * * *` (vsako uro,
  UTC). Registrirano je v `src/lib/initCloudSync.ts`; preglasiti ga je mogoče z `OMNIROUTE_LOG_EXPORT_CRON`.
  Ob vsakem zagonu zaporedno izprazni vsak **omogočen** cilj.
- **Kazalec** — implicitni `call_logs.rowid` zbirke SQLite, trajno shranjen za vsak cilj v
  `log_export_destinations.cursor_row_id`. `timestamp` namenoma ni kazalec: klicatelji
  lahko podajo lastno vrednost, zato se lahko počasna zahteva zapiše za hitrejšo zahtevo, ki se je začela
  pozneje, kazalec na podlagi časovnega žiga pa bi jo preskočil.
- **Paketna obdelava** — `batch_size` vrstic na zahtevo (privzeto 500), `max_rows_per_run` vrstic na zagon
  (privzeto 10000), tako da se velika količina čakajočih podatkov izprazni v več zagonih, namesto da bi blokirala enega.
- **Dostava** — kazalec se premakne naprej šele, ko se `send()` uspešno zaključi. Neuspešen paket pusti
  kazalec na prejšnjem mestu, zato se iste vrstice znova poskusijo poslati ob naslednjem zagonu. Zagotovilo je
  vsaj enkratna dostava skupaj z odstranjevanjem dvojnikov na strani cilja, ne pa resnična natanko enkratna dostava: BigQuery vsako
  vrstico označi z ID-jem dnevnika klica, ki ga po najboljših močeh upošteva znotraj lastnega časovnega okna za odstranjevanje dvojnikov.
- **Zaščita pred prekrivanjem** — sprožilec cron in `POST .../run` se lahko izvedeta hkrati. Cilj,
  ki se že prazni, je preskočen, namesto da bi bil izpraznjen dvakrat (`skipped: true` v rezultatu zagona),
  zato sočasni zagon ne more znova poslati paketa ali premakniti kazalca nazaj.
- **Obnovitev po čiščenju** — če `cursor_row_id` postane večji od `MAX(rowid)` (celotna tabela je bila
  izbrisana in številčenje vrstic se je znova začelo), izvajalnik ponastavi kazalec na 0, namesto da bi trajno izgubil pregled nad podatki.

### Koristni tovori (pozivi in dokončanja)

Izvoz privzeto vsebuje samo polja s povzetki, prikazana na **seznamu** zavihka Dnevniki. Če omogočite
**Izvoz pozivov in odgovorov** (`includeBodies`), se dodatno pošlje tudi vsebina, ki jo podokno s **podrobnostmi**
zavihka Dnevniki prikazuje za vsak klic:

| Polje                            | Kaj vsebuje                                                       |
| -------------------------------- | ----------------------------------------------------------------- |
| `request_body` / `response_body` | Koristne tovore klica, kot jih prikaže nadzorna plošča            |
| `pipeline_route_decision`        | Cilj in model, ki ju je izbral usmerjevalnik                      |
| `pipeline_client_request`        | Neobdelano zahtevo natanko tako, kot jo je poslal odjemalec       |
| `pipeline_openai_request`        | Zahtevo po pretvorbi v interno obliko OpenAI                      |
| `pipeline_provider_request`      | Zahtevo, kot je bila dejansko poslana navzgor v narečju ponudnika |
| `pipeline_provider_response`     | Neobdelan odgovor ponudnika                                       |
| `pipeline_client_response`       | Vsebino, ki je bila vrnjena klicatelju                            |
| `pipeline_error`                 | Podrobnosti o napaki na ravni cevovoda za neuspešen klic          |
| `bodies_truncated`               | Vrednost True, ko katero koli zgornje polje doseže `maxBodyBytes` |

To je vsebina pozivov, zato je možnost **privzeto izklopljena** in namenoma nastavljiva za vsak cilj posebej.
Pošlje se vsebina, ki jo prikazuje nadzorna plošča, ker obe uporabljata `getCallLogById`: iz koristnih tovorov so
že odstranjeni osebno določljivi podatki in skrivnosti, ko so zapisani, klic z
API-ključem `noLog` pa ne shrani nobenega koristnega tovora, zato ni ničesar za izvoz.

Koristni tovori se za vsako vrstico preberejo iz artefakta v datotečnem sistemu, zato se dopolnjevanje izvede samo za cilje,
ki so ga zahtevali. Vrstica, katere artefakt manjka ali je poškodovan, izvozi svoj povzetek z ničelnimi
koristnimi tovori, namesto da bi paket spodletel in kazalec obstal.

`maxBodyBytes` (privzeto 262144) omejuje vsako polje. Daljši koristni tovori so **skrajšani, ne pa
izpuščeni** — odrezan poziv še vedno odgovarja na vprašanje »kaj je bilo zahtevano« — vrstica pa je označena z
`bodies_truncated`. Pretočno poslani delni fragmenti niso izvoženi; sestavljeni odgovor je
že v `pipeline_provider_response` in `pipeline_client_response`.

---

## 2. Datoteke

| Del                              | Lokacija                                     |
| -------------------------------- | -------------------------------------------- |
| Pogodba cilja                    | `src/lib/logExport/types.ts`                 |
| Register                         | `src/lib/logExport/registry.ts`              |
| Obravnava skrivnosti             | `src/lib/logExport/secrets.ts`               |
| Izvajalnik (zanka kazalca)       | `src/lib/logExport/runner.ts`                |
| Projekcija API-ja                | `src/lib/logExport/presenter.ts`             |
| Cilj BigQuery                    | `src/lib/logExport/destinations/bigquery.ts` |
| Preverjanje pristnosti Google SA | `src/lib/logExport/googleServiceAccount.ts`  |
| Vir dnevnika klicev              | `src/lib/usage/callLogExportSource.ts`       |
| Trajna hramba                    | `src/lib/db/logExportDestinations.ts`        |
| Opravilo cron                    | `src/lib/jobs/logExportJob.ts`               |
| Plast REST                       | `src/app/api/log-export/`                    |
| Stran nadzorne plošče            | `src/app/(dashboard)/dashboard/log-export/`  |

Shema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Vse poti zahtevajo upravljavsko preverjanje pristnosti (`requireManagementAuth`). Skrivnosti se nikoli ne vrnejo:
shranjena skrivnost se vrne kot dobesedna vrednost `__stored__`, pošiljanje te vrednosti nazaj pri posodobitvi
pa ohrani shranjeno poverilnico.

Ustvarjanje ali posodabljanje cilja, katerega vrsta deklarira skrivnost, **zahteva
`STORAGE_ENCRYPTION_KEY`**. Brez njega je `encrypt()` tih prepust, zato je zapis
zavrnjen z napako 400, namesto da bi bila poverilnica v SQLite shranjena kot navadno besedilo (enako varovalo
uporablja spletni kavelj Telegram).

| Metoda   | Pot                                      | Namen                                                         |
| -------- | ---------------------------------------- | ------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Vrste ciljev in seznam njihovih polj konfiguracije            |
| `GET`    | `/api/log-export/destinations`           | Seznam ciljev (skrivnosti so zakrite)                         |
| `POST`   | `/api/log-export/destinations`           | Ustvari cilj                                                  |
| `GET`    | `/api/log-export/destinations/{id}`      | Prebere en cilj                                               |
| `PUT`    | `/api/log-export/destinations/{id}`      | Posodobi ime / omogočenost / konfiguracijo / paketno obdelavo |
| `DELETE` | `/api/log-export/destinations/{id}`      | Izbriše cilj                                                  |
| `POST`   | `/api/log-export/destinations/{id}/test` | Preveri poverilnice brez zapisovanja                          |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Izprazni zdaj, po isti poti kot načrtovani zagon              |
| `GET`    | `/api/log-export/status`                 | Stanje opravila cron, nedavni zagoni, zaostanek po ciljih     |

`GET /api/log-export/types` omogoča generičnost uporabniškega vmesnika: obrazec na nadzorni plošči se izriše iz
vrnjenih opisnikov polj, zato nov cilj ne zahteva spremembe uporabniškega vmesnika.

---

## 4. Cilj BigQuery

Ključi konfiguracije (`type: "bigquery"`):

| Ključ                | Opombe                                                                      |
| -------------------- | --------------------------------------------------------------------------- |
| `projectId`          | Projekt GCP, ki vsebuje nabor podatkov                                      |
| `datasetId`          | `[A-Za-z0-9_]+`                                                             |
| `tableId`            | `[A-Za-z0-9_]+`                                                             |
| `location`           | Uporabi se le, ko je treba ustvariti nabor podatkov (privzeto `EU`)         |
| `serviceAccountJson` | Ključ storitvenega računa. Skrivnost: šifrirana v mirovanju, nikoli vrnjena |
| `autoCreate`         | Ob prvem izvozu ustvari nabor podatkov in tabelo (privzeto `true`)          |

Storitveni račun potrebuje dovoljenje `bigquery.tables.updateData` za ciljno tabelo ter
`bigquery.datasets.create` / `bigquery.tables.create`, ko je možnost `autoCreate` omogočena.

Konfigurirani paket je enota **kazalca**, ne enota HTTP: `send()` ga razdeli na klice insertAll
z največ 500 vrsticami, zato velik `batch_size` ne more preseči omejitve BigQuery za zahtevo velikosti 10 MB.
Pri prehodnih stanjih (408/429/500/502/503/504) se poskus ponovi do trikrat z eksponentnim
podaljševanjem premora in ponovno uporabo istih insertIds; napake preverjanja pristnosti in sheme sprožijo izjemo že ob prvem poskusu,
namesto da bi po nepotrebnem porabile zagon.

Tabela, ustvarjena pred nekaj trenutki, še ni vidna pretočni končni točki, ki
nekaj sekund vrača 404. Ta odgovor 404 se poskusi znova, vendar **le, ko je tabela ustvarjena v tem zagonu** —
dejansko manjkajoča tabela še vedno takoj povzroči napako. Upoštevajte, da BigQuery ob ponovnem ustvarjanju tabele z imenom,
pod katerim je bila tabela nedavno izbrisana, več minut zavrača pretočno vstavljanje; to je
lastnost postopka brisanja in ponovnega ustvarjanja, zato namesto brisanja in ponovnega dodajanja raje uporabite novo ime tabele.

**Delna napaka prispe kot HTTP 200 z nepraznim `insertErrors[]`.** Obravnava se kot
napaka in sproži izjemo, kar prepreči, da bi kazalec napredoval prek vrstic, ki jih BigQuery ni
sprejel; `tests/unit/log-export-bigquery.test.ts` zagotavlja to vedenje.

Prenos uporablja navaden REST — samopodpisana trditev RS256 se zamenja za žeton za dostop na
`https://oauth2.googleapis.com/token`, nato pa se vrstice pošljejo v `tabledata.insertAll`. Noben Google SDK
ni vključen. Žetoni za dostop se predpomnijo znotraj procesa za vsak par (storitveni račun, obseg).

Ustvarjena tabela vsebuje po en stolpec za vsako polje zavihka Dnevniki in še `exported_at`, razporejena pa je glede na
dejanski način poizvedovanja po dnevnikih klicev:

- **Dnevno particionirana po `timestamp`**, zato poizvedba, omejena z datumom, pregleda samo te dni.
- **Gručenje po `api_key_name`, `provider`, `model`, `status`** (v tem vrstnem redu), zato filtriranje glede na
  izvajalca, cilj ali uspešnost obreže bloke znotraj vsake particije. BigQuery
  dovoljuje največ štiri stolpce za gručenje, pri čemer je vrstni red pomemben: filter samo po `api_key_name`
  obrezuje, filter samo po `status` pa ne.
- **Izbirna hramba particij** prek `partitionExpirationDays` (0 ohrani vse), ki se uporabi
  ob ustvarjanju tabele.

Obe nastavitvi se uporabita ob ustvarjanju. Obstoječa tabela ohrani svojo trenutno postavitev, zato
cilj usmerite na nov ID tabele, če ju želite uporabiti.

`tests/unit/log-export-bigquery.test.ts` preverja, da preslikovalnik in shema tabele ostajata
usklajena, zato novega stolpca dnevnika klicev pri izvozu ni mogoče neopazno izpustiti.

Paketi se razdelijo glede na **oboje**: število vrstic in število bajtov serializiranih podatkov. Zgolj število vrstic ni dovolj,
ko se izvažajo koristne vsebine: 500 vrstic s pozivi lahko zavzame več deset megabajtov, insertAll
pa zavrne zahtevo, večjo od 10 MB. Paketi se zaključijo pri 500 vrsticah ali 9 MB, odvisno od tega, katera meja je dosežena prej.

---

## 5. Dodajanje cilja

1. Ustvarite `src/lib/logExport/destinations/<name>.ts`, ki izvaža `LogExportDestinationType`:
   Zodovo `configSchema`, tabelo opisnikov `fields` za uporabniški vmesnik, `secretFields` in
   `createClient(config)`, ki vrne `test()` / `prepare()` / `send(records)`.
2. Dodajte ga v tabelo `DESTINATIONS` v `src/lib/logExport/registry.ts`.
3. Napišite teste v `tests/unit/`.

To je celotna sprememba: trajna hramba, opravilo cron, plast REST, šifriranje skrivnosti in
obrazec nadzorne plošče vsi uporabljajo register.

Za nov cilj veljata dve pravili:

- `send()` **mora sprožiti izjemo** ob delnem neuspehu. Uspešen zaključek pomeni »cilj ima te vrstice«,
  kazalec pa se trajno premakne prek njih.
- Cilj, ki sprejema URL, ki ga vnese uporabnik, ga mora pred pridobivanjem preveriti s
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`),
  enako kot spletni kavlji. BigQuery tega ne potrebuje, saj so njegovi gostitelji nespremenljive vrednosti.

---

## 6. Upravljanje

- **Nadzorna plošča**: Integracije → Izvoz dnevnikov. Dodajte cilj, za preverjanje poverilnic
  brez zapisovanja vrstic zaženite **Preizkus**, nato pa ga omogočite.
- **Zaostanek**: vsaka kartica cilja prikazuje čakajoče vrstice in kazalec; `GET
/api/log-export/status` vrne iste podatke ter zadnjih 20 izvajanj opravila.
- **Nedelujoč cilj ne povzroči neuspeha drugih** — povzetek izvajanja beleži stanje posameznega cilja
  v `last_status` / `last_error`, zgodovina izvajanj opravila pa hrani skupni rezultat.
- **Z izbrisom cilja se izbriše tudi njegov kazalec.** Če ga znova dodate, začne pri najstarejšem
  ohranjenem dnevniku klicev, zato znova pošlje vrstice, ki jih cilj morda že vsebuje. V BigQueryju
  `insertId` posamezne vrstice to odpravi le znotraj BigQueryjevega lastnega časovnega okna za
  odstranjevanje dvojnikov, zato cilj raje onemogočite, kot da ga izbrišete.
