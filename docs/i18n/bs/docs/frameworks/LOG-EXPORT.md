# Log export (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

# Izvoz logova

Kontinuirani, inkrementalni izvoz OmniRoute logova poziva u vanjsko skladište za analitiku.

Kartica Logs na kontrolnoj ploči čuva historiju zahtjeva u SQLite (`call_logs`), koja je ograničena rotacijom i zadržavanjem. Izvoz logova šalje isti skup zapisa prema rasporedu kako bi mogao nadživjeti lokalnu bazu podataka i biti povezan s drugim podacima. BigQuery je prvo odredište; cjevovod (pipeline) je registar, tako da su dodatna odredišta aditivna.

---

## 1. Kako to radi

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (skup polja kartice Logs)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Raspored** — jedan `JobRegistry` cron posao, `log_export`, sa zadanim vremenom `0 * * * *` (svaki sat, UTC). Registriran u `src/lib/initCloudSync.ts`; može se nadjačati pomoću `OMNIROUTE_LOG_EXPORT_CRON`. Svaki "tick" prazni svako **omogućeno** odredište, sekvencijalno.
- **Kursor** — implicitni `call_logs.rowid` u SQLite-u, koji se čuva po odredištu u `log_export_destinations.cursor_row_id`. `timestamp` namjerno nije kursor: pozivatelji mogu dostaviti vlastitu vrijednost, pa se spori zahtjev može zapisati nakon bržeg koji je započeo kasnije, a kursor zasnovan na vremenskoj oznaci bi ga preskočio.
- **Grupisanje (Batching)** — `batch_size` redova po zahtjevu (zadano 500), `max_rows_per_run` redova po pokretanju (zadano 10000) tako da se veliki zaostatak prazni kroz nekoliko "tickova" umjesto da blokira jedan.
- **Dostava** — kursor napreduje tek nakon što se `send()` izvrši. Neuspjela serija ostavlja kursor tamo gdje je bio, tako da se isti redovi ponovo pokušavaju u sljedećem pokretanju. Garancija je "at-least-once" (najmanje jednom) uz deduplikaciju na strani odredišta, a ne "exactly-once" (tačno jednom): BigQuery ključira svaki red prema ID-u loga poziva, što poštuje na bazi najboljeg napora unutar vlastitog prozora za deduplikaciju.
- **Zaštita od preklapanja** — cron "tick" i `POST .../run` se mogu aktivirati istovremeno. Odredište koje se već prazni se preskače umjesto da se prazni dvaput (`skipped: true` u rezultatu pokretanja), tako da istovremeno pokretanje ne može ponovo poslati seriju ili napisati kursor unazad.
- **Oporavak od brisanja** — ako `cursor_row_id` završi iznad `MAX(rowid)` (cijela tabela je obrisana i rowid-ovi su ponovo pokrenuti), pokretač se vraća na 0 umjesto da trajno ostane "slijep".

### Payloads (promptovi i završeci)

Prema zadanim postavkama, izvoz prenosi samo polja sažetka koja prikazuje **lista** logova. Uključivanje opcije **Export prompts and responses** (`includeBodies`) dodatno šalje ono što **okno s detaljima** logova prikazuje za svaki poziv:

| Polje                            | Šta sadrži                                                      |
| -------------------------------- | --------------------------------------------------------------- |
| `request_body` / `response_body` | Sadržaji poziva onako kako ih kontrolna ploča prikazuje         |
| `pipeline_route_decision`        | Koju metu i model je ruter odabrao                              |
| `pipeline_client_request`        | Sirovi zahtjev tačno onako kako ga je klijent poslao            |
| `pipeline_openai_request`        | Nakon prijevoda u interni OpenAI oblik                          |
| `pipeline_provider_request`      | Kako je zapravo poslano uzvodno, u dijalektu provajdera         |
| `pipeline_provider_response`     | Sirovi uzvodni odgovor                                          |
| `pipeline_client_response`       | Šta je vraćeno pozivatelju                                      |
| `pipeline_error`                 | Detalji greške na nivou cjevovoda za neuspjeli poziv            |
| `bodies_truncated`               | Tačno (True) kada bilo koje polje iznad dostigne `maxBodyBytes` |

Ovo je sadržaj prompta, pa je **isključeno prema zadanim postavkama** i namjerno je izbor po odredištu. Ono što se šalje je ono što kontrolna ploča prikazuje, jer oba čitaju kroz `getCallLogById`: sadržaji su već očišćeni od PII (ličnih podataka) i tajni kada se zapisuju, a poziv napravljen s `noLog` API ključem uopće ne pohranjuje sadržaj, tako da nema šta za izvoziti.

Sadržaji se čitaju po redu iz artefakta datotečnog sistema, tako da se hidratacija pokreće samo za odredišta koja su to tražila. Red čiji artefakt nedostaje ili je oštećen izvozi svoj sažetak s null sadržajima umjesto da ne uspije serija i "nasuče" kursor.

`maxBodyBytes` (zadano 262144) ograničava svako polje. Duži sadržaji se **skraćuju umjesto da se odbacuju** — isječeni prompt i dalje odgovara na "šta je traženo" — a red je označen s `bodies_truncated`. Streamovane delte po komadima se ne izvoze; sastavljeni odgovor je već u `pipeline_provider_response` i `pipeline_client_response`.

---

## 2. Datoteke

| Komponenta                 | Lokacija                                     |
| -------------------------- | -------------------------------------------- |
| Kontrakt odredišta         | `src/lib/logExport/types.ts`                 |
| Registar                   | `src/lib/logExport/registry.ts`              |
| Rukovanje tajnama          | `src/lib/logExport/secrets.ts`               |
| Izvršilac (petlja kursora) | `src/lib/logExport/runner.ts`                |
| API projekcija             | `src/lib/logExport/presenter.ts`             |
| BigQuery odredište         | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA autentifikacija  | `src/lib/logExport/googleServiceAccount.ts`  |
| Izvor dnevnika poziva      | `src/lib/usage/callLogExportSource.ts`       |
| Perzistencija              | `src/lib/db/logExportDestinations.ts`        |
| Cron zadatak               | `src/lib/jobs/logExportJob.ts`               |
| REST sloj                  | `src/app/api/log-export/`                    |
| Stranica kontrolne ploče   | `src/app/(dashboard)/dashboard/log-export/`  |

Šema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Sve rute su autentifikovane upravljačkim pristupom (`requireManagementAuth`). Tajne se nikada ne vraćaju: pohranjena tajna se vraća kao literal `__stored__`, a slanje te vrijednosti nazad prilikom ažuriranja zadržava pohranjene vjerodajnice.

Kreiranje ili ažuriranje odredišta čiji tip deklariše tajnu **zahtijeva `STORAGE_ENCRYPTION_KEY`**. Bez njega, `encrypt()` je tihi prolaz (passthrough), pa se upis odbija sa 400 umjesto stavljanja vjerodajnica u SQLite u čistom tekstu (ista zaštita koju primjenjuje Telegram webhook).

| Metoda   | Putanja                                  | Svrha                                                   |
| -------- | ---------------------------------------- | ------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Tipovi odredišta + njihova lista konfiguracijskih polja |
| `GET`    | `/api/log-export/destinations`           | Lista odredišta (tajne redigovane)                      |
| `POST`   | `/api/log-export/destinations`           | Kreiraj odredište                                       |
| `GET`    | `/api/log-export/destinations/{id}`      | Čitaj jedno                                             |
| `PUT`    | `/api/log-export/destinations/{id}`      | Ažuriraj naziv / omogućeno / konfiguraciju / grupisanje |
| `DELETE` | `/api/log-export/destinations/{id}`      | Izbriši                                                 |
| `POST`   | `/api/log-export/destinations/{id}/test` | Provjeri vjerodajnice, ne upisuj ništa                  |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Isprazni odmah, ista putanja kao i zakazano izvršavanje |
| `GET`    | `/api/log-export/status`                 | Cron stanje, nedavna izvršavanja, zaostatak po meti     |

`GET /api/log-export/types` je ono što čini korisnički interfejs generičkim: forma kontrolne ploče se renderuje iz vraćenih deskriptora polja, tako da novo odredište ne zahtijeva promjenu korisničkog interfejsa.

---

## 4. BigQuery odredište

Konfiguracijski ključevi (`type: "bigquery"`):

| Ključ                | Napomene                                                                   |
| -------------------- | -------------------------------------------------------------------------- |
| `projectId`          | GCP projekat koji sadrži skup podataka                                     |
| `datasetId`          | `[A-Za-z0-9_]+`                                                            |
| `tableId`            | `[A-Za-z0-9_]+`                                                            |
| `location`           | Koristi se samo kada se skup podataka mora kreirati (podrazumijevano `EU`) |
| `serviceAccountJson` | Ključ servisnog naloga. Tajna: šifrovano u mirovanju, nikada se ne vraća   |
| `autoCreate`         | Kreiraj skup podataka i tabelu pri prvom izvozu (podrazumijevano `true`)   |

Servisni nalog treba `bigquery.tables.updateData` na ciljnoj tabeli, plus `bigquery.datasets.create` / `bigquery.tables.create` kada je `autoCreate` uključen.

Konfigurisana serija (batch) je **kursor** jedinica, a ne HTTP jedinica: `send()` je dijeli na insertAll pozive od najviše 500 redova, tako da veliki `batch_size` ne može premašiti BigQuery ograničenje zahtjeva od 10 MB. Prolazni statusi (408/429/500/502/503/504) se ponovo pokušavaju do tri puta uz eksponencijalno čekanje (backoff), ponovo koristeći iste insertIds; greške autentifikacije i šeme bacaju izuzetak pri prvom pokušaju umjesto da troše izvršavanje.

Tabela kreirana prije nekoliko trenutaka još nije vidljiva streaming krajnjoj tački, koja odgovara sa 404 nekoliko sekundi. Taj 404 se ponovo pokušava, ali **samo kada je ovo izvršavanje kreiralo tabelu** — tabela koja zaista nedostaje i dalje brzo pada (fails fast). Imajte na umu da ponovno kreiranje tabele pod imenom koje je nedavno izbrisano čini da BigQuery odbija streaming unose nekoliko minuta; to je svojstvo brisanja-pa-ponovnog-kreiranja, pa preferirajte novo ime tabele umjesto brisanja i ponovnog dodavanja iste.

**Djelimični neuspjeh stiže kao HTTP 200 sa nepraznim `insertErrors[]`.** To se tretira kao neuspjeh i baca izuzetak, što zaustavlja kursor da napreduje pored redova koje BigQuery nikada nije prihvatio; `tests/unit/log-export-bigquery.test.ts` definiše to ponašanje.

Transport je običan REST — samopotpisana RS256 tvrdnja se mijenja za pristupni token na `https://oauth2.googleapis.com/token`, a zatim redovi idu na `tabledata.insertAll`. Nema uključenog Google SDK-a. Pristupni tokeni se keširaju u procesu po (servisni nalog, opseg).

Kreirana tabela nosi jednu kolonu po polju Logs-tab plus `exported_at`, i raspoređena je prema tome kako se dnevnici poziva zapravo pretražuju:

- **Dnevno particionisano po `timestamp`**, tako da upit ograničen datumom skenira samo te dane.
- **Klasterisano po `api_key_name`, `provider`, `model`, `status`** (tim redoslijedom), tako da filtriranje po tome ko ga je pokrenuo, kuda je otišlo ili da li nije uspjelo, odbacuje blokove unutar svake particije. BigQuery dozvoljava najviše četiri kolone za klasterisanje i redoslijed je bitan: filter samo na `api_key_name` odbacuje podatke, filter samo na `status` ne.
- **Opciono zadržavanje particija** putem `partitionExpirationDays` (0 zadržava sve), primjenjuje se kada se tabela kreira.

Obje postavke se primjenjuju u vrijeme kreiranja. Postojeća tabela zadržava raspored koji već ima, pa usmjerite odredište na novi ID tabele ako želite da ih usvojite.

`tests/unit/log-export-bigquery.test.ts` potvrđuje da mapper i šema tabele ostaju usklađeni, tako da se nova call-log kolona ne može neprimjetno odbaciti prilikom izlaza.

Serije se segmentiraju prema **oba** kriterijuma: broju redova i serijalizovanim bajtovima. Samo broj redova nije dovoljan kada se payload-ovi izvezu: 500 redova koji nose promptove mogu biti desetine megabajta, a insertAll odbija zahtjev preko 10 MB. Segmenti se zatvaraju na 500 redova ili 9 MB, šta god nastupi prvo.

---

## 5. Dodavanje odredišta

1. Kreirajte `src/lib/logExport/destinations/<name>.ts` koji eksportuje `LogExportDestinationType`:
   Zod `configSchema`, niz `fields` deskriptora za UI, `secretFields`, i `createClient(config)` koji vraća `test()` / `prepare()` / `send(records)`.
2. Dodajte ga u `DESTINATIONS` niz u `src/lib/logExport/registry.ts`.
3. Napišite testove u `tests/unit/`.

To je cijela izmjena: perzistencija, cron zadatak, REST sloj, enkripcija tajni i forma na dashboardu čitaju registar.

Dva pravila za novo odredište:

- `send()` **mora baciti izuzetak** (throw) u slučaju djelimičnog neuspjeha. Razrješavanje (resolving) znači "odredište ima ove redove", a kursor se trajno pomjera preko njih.
- Odredište koje prihvata URL koji unosi korisnik mora ga validirati kroz `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) prije preuzimanja, na isti način kao što to rade webhooks. BigQuery ovo ne treba: njegovi hostovi su konstante.

---

## 6. Upravljanje

- **Dashboard**: Integrations → Log export. Dodajte odredište, pokrenite **Test** da provjerite akreditive bez upisivanja redova, a zatim ga omogućite.
- **Backlog**: svaka kartica odredišta prikazuje redove na čekanju i kursor; `GET /api/log-export/status` vraća iste podatke plus posljednjih 20 pokretanja poslova.
- **Neuspjeh jednog odredišta ne dovodi do neuspjeha ostalih** — rezime pokretanja bilježi status po odredištu u `last_status` / `last_error`, a historija pokretanja poslova čuva agregat.
- **Brisanje odredišta briše njegov kursor.** Ponovno dodavanje počinje od najstarijeg zadržanog dnevnika poziva, što ponovo šalje redove koje odredište možda već posjeduje. Na BigQuery-u, `insertId` po redu to apsorbuje samo unutar BigQuery-evog vlastitog prozora za deduplikaciju, stoga je bolje onemogućiti odredište nego ga obrisati.
