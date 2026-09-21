# Log export (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Kontinuirani, inkrementalni izvoz OmniRoute evidencije poziva u eksterno skladište analitičkih podataka.

Kartica Logs na kontrolnoj tabli čuva istoriju zahteva u SQLite bazi (`call_logs`), koja je ograničena
rotacijom i periodom čuvanja. Izvoz evidencije šalje isti skup zapisa prema rasporedu kako bi oni
mogli da nadžive lokalnu bazu podataka i da se povezuju sa drugim podacima. BigQuery je prvo odredište;
cevovod predstavlja registar, pa se dodatna odredišta mogu naknadno dodavati.

---

## 1. Kako funkcioniše

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (skup polja kartice Logs)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Raspored** — jedan `JobRegistry` cron zadatak, `log_export`, sa podrazumevanom vrednošću `0 * * * *` (svakog sata,
  UTC). Registrovan je u `src/lib/initCloudSync.ts`; može se zameniti pomoću `OMNIROUTE_LOG_EXPORT_CRON`.
  Svako pokretanje redom obrađuje svako **omogućeno** odredište.
- **Kursor** — SQLite implicitni `call_logs.rowid`, koji se čuva zasebno za svako odredište u
  `log_export_destinations.cursor_row_id`. `timestamp` namerno nije kursor: pozivaoci
  mogu da zadaju sopstvenu vrednost, pa spor zahtev može biti upisan nakon bržeg zahteva koji je
  pokrenut kasnije, a kursor zasnovan na vremenskoj oznaci bi ga preskočio.
- **Grupisanje** — `batch_size` redova po zahtevu (podrazumevano 500), `max_rows_per_run` redova po pokretanju
  (podrazumevano 10000), tako da se veliki zaostatak obrađuje tokom više pokretanja umesto da blokira jedno.
- **Isporuka** — kursor napreduje tek nakon što se `send()` uspešno završi. Neuspela grupa ostavlja
  kursor na prethodnom mestu, pa se isti redovi ponovo pokušavaju poslati pri sledećem pokretanju. Garancija je
  „najmanje jednom“, uz deduplikaciju na strani odredišta, a ne stvarna isporuka „tačno jednom“: BigQuery određuje ključ svakog
  reda prema ID-u evidencije poziva, što poštuje po principu najvećeg truda unutar sopstvenog vremenskog okvira za deduplikaciju.
- **Zaštita od preklapanja** — cron pokretanje i `POST .../run` mogu se izvršiti istovremeno. Odredište
  koje se već obrađuje preskače se umesto da bude obrađeno dvaput (`skipped: true` u rezultatu pokretanja),
  tako da istovremeno pokretanje ne može ponovo poslati grupu niti pomeriti kursor unazad.
- **Oporavak nakon brisanja** — ako `cursor_row_id` završi iznad `MAX(rowid)` (cela tabela je
  obrisana, a brojevi redova su ponovo počeli od početka), izvršilac vraća kursor na 0 umesto da trajno izgubi uvid u nove redove.

### Sadržaji (promptovi i dovršeci)

Izvoz podrazumevano obuhvata samo sažeta polja koja prikazuje **lista** na kartici Logs. Uključivanje opcije
**Izvezi promptove i odgovore** (`includeBodies`) dodatno šalje ono što okno sa **detaljima**
na kartici Logs prikazuje za svaki poziv:

| Polje                            | Šta sadrži                                                   |
| -------------------------------- | ------------------------------------------------------------ |
| `request_body` / `response_body` | Sadržaje poziva onako kako ih kontrolna tabla prikazuje      |
| `pipeline_route_decision`        | Koje je odredište i model ruter izabrao                      |
| `pipeline_client_request`        | Neobrađeni zahtev, tačno onako kako ga je klijent poslao     |
| `pipeline_openai_request`        | Nakon prevođenja u interni OpenAI format                     |
| `pipeline_provider_request`      | Onako kako je zaista poslato uzvodno, u dijalektu dobavljača |
| `pipeline_provider_response`     | Neobrađeni odgovor uzvodnog sistema                          |
| `pipeline_client_response`       | Ono što je vraćeno pozivaocu                                 |
| `pipeline_error`                 | Detalji greške na nivou cevovoda za neuspešan poziv          |
| `bodies_truncated`               | Tačno kada je bilo koje polje iznad dostiglo `maxBodyBytes`  |

Ovo je sadržaj prompta, pa je **podrazumevano isključeno** i namerno se bira zasebno za svako odredište.
Šalje se ono što prikazuje kontrolna tabla, jer oba čitaju preko `getCallLogById`: sadržaji su
već očišćeni od PII podataka i poverljivi podaci su redigovani prilikom upisa, a poziv obavljen pomoću
`noLog` API ključa uopšte ne čuva sadržaj, tako da nema šta da se izveze.

Sadržaji se za svaki red čitaju iz artefakta u sistemu datoteka, pa se popunjavanje izvršava samo za odredišta
koja su ga zatražila. Red čiji artefakt nedostaje ili je oštećen izvozi svoj sažetak sa null
sadržajima umesto da izazove neuspeh cele grupe i zaglavi kursor.

`maxBodyBytes` (podrazumevano 262144) ograničava svako polje. Duži sadržaji se **skraćuju umesto da budu
odbačeni** — skraćeni prompt i dalje odgovara na pitanje „šta je zatraženo“ — a red se označava pomoću
`bodies_truncated`. Delte strimovane deo po deo ne izvoze se; sastavljeni odgovor se
već nalazi u `pipeline_provider_response` i `pipeline_client_response`.

---

## 2. Датотеке

| Део                       | Локација                                     |
| ------------------------- | -------------------------------------------- |
| Уговор одредишта          | `src/lib/logExport/types.ts`                 |
| Регистар                  | `src/lib/logExport/registry.ts`              |
| Руковање тајнама          | `src/lib/logExport/secrets.ts`               |
| Извршилац (петља курсора) | `src/lib/logExport/runner.ts`                |
| API пројекција            | `src/lib/logExport/presenter.ts`             |
| BigQuery одредиште        | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA аутентификација | `src/lib/logExport/googleServiceAccount.ts`  |
| Извор евиденције позива   | `src/lib/usage/callLogExportSource.ts`       |
| Перзистенција             | `src/lib/db/logExportDestinations.ts`        |
| Cron посао                | `src/lib/jobs/logExportJob.ts`               |
| REST слој                 | `src/app/api/log-export/`                    |
| Страница контролне табле  | `src/app/(dashboard)/dashboard/log-export/`  |

Шема: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Све руте су заштићене управљачком аутентификацијом (`requireManagementAuth`). Тајне се никада не враћају:
сачувана тајна се враћа као литерал `__stored__`, а слање те вредности назад приликом ажурирања
задржава сачувани акредитив.

Прављење или ажурирање одредишта чији тип декларише тајну **захтева
`STORAGE_ENCRYPTION_KEY`**. Без њега је `encrypt()` тихи пролаз без измена, па се упис
одбија статусом 400 уместо да се акредитив стави у SQLite као обичан текст (исту заштиту
примењује Telegram webhook).

| Метод    | Путања                                   | Сврха                                                       |
| -------- | ---------------------------------------- | ----------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Типови одредишта + листа њихових конфигурационих поља       |
| `GET`    | `/api/log-export/destinations`           | Листа одредишта (тајне су редиговане)                       |
| `POST`   | `/api/log-export/destinations`           | Прављење одредишта                                          |
| `GET`    | `/api/log-export/destinations/{id}`      | Читање једног одредишта                                     |
| `PUT`    | `/api/log-export/destinations/{id}`      | Ажурирање назива / омогућености / конфигурације / груписања |
| `DELETE` | `/api/log-export/destinations/{id}`      | Брисање                                                     |
| `POST`   | `/api/log-export/destinations/{id}/test` | Провера акредитива, без уписивања                           |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Пражњење одмах, истом путањом као заказано извршавање       |
| `GET`    | `/api/log-export/status`                 | Стање Cron-а, недавна извршавања, заостатак по циљу         |

`GET /api/log-export/types` чини кориснички интерфејс генеричким: образац контролне табле се приказује на основу
враћених дескриптора поља, тако да ново одредиште не захтева измену корисничког интерфејса.

---

## 4. BigQuery одредиште

Конфигурациони кључеви (`type: "bigquery"`):

| Кључ                 | Напомене                                                                   |
| -------------------- | -------------------------------------------------------------------------- |
| `projectId`          | GCP пројекат који садржи скуп података                                     |
| `datasetId`          | `[A-Za-z0-9_]+`                                                            |
| `tableId`            | `[A-Za-z0-9_]+`                                                            |
| `location`           | Користи се само када скуп података мора да се направи (подразумевано `EU`) |
| `serviceAccountJson` | Кључ услужног налога. Тајна: шифрована у мировању, никада се не враћа      |
| `autoCreate`         | Прављење скупа података и табеле при првом извозу (подразумевано `true`)   |

Услужном налогу је потребна дозвола `bigquery.tables.updateData` над циљном табелом, као и
`bigquery.datasets.create` / `bigquery.tables.create` када је `autoCreate` укључен.

Конфигурисана група је јединица **курсора**, а не HTTP-а: `send()` је дели на `insertAll`
позиве од највише 500 редова, тако да велика вредност `batch_size` не може да премаши BigQuery ограничење захтева од 10 MB.
Привремени статуси (408/429/500/502/503/504) покушавају се поново до три пута уз експоненцијално
одлагање, при чему се поново користе исти insertIds; грешке аутентификације и шеме изазивају изузетак при првом покушају,
уместо да непотребно троше извршавање.

Табела направљена пре неколико тренутака још није видљива крајњој тачки за стримовање, која
неколико секунди враћа 404. Тај 404 се поново покушава, али **само када је ово извршавање направило табелу** —
табела која заиста недостаје и даље одмах изазива грешку. Имајте у виду да поновно прављење табеле под називом који
је недавно обрисан доводи до тога да BigQuery неколико минута одбија стримоване уносе; то је
својство поступка брисања па поновног прављења, зато радије користите нов назив табеле него да је избришете и поново додате.

**Делимичан неуспех стиже као HTTP 200 са непразним `insertErrors[]`.** То се третира као
неуспех и изазива изузетак, чиме се спречава да курсор напредује преко редова које BigQuery никада није
прихватио; `tests/unit/log-export-bigquery.test.ts` фиксира ово понашање.

Транспорт користи обичан REST — самопотписана RS256 тврдња размењује се за приступни токен на
`https://oauth2.googleapis.com/token`, а затим редови одлазе у `tabledata.insertAll`. Ниједан Google SDK се
не укључује. Приступни токени се кеширају унутар процеса за сваки пар (услужни налог, опсег).

Направљена табела садржи по једну колону за свако поље картице Logs, као и `exported_at`, и организована је
према начину на који се евиденције позива заиста упитују:

- **Партиционисана по дану на основу `timestamp`**, тако да упит ограничен датумом скенира само те дане.
- **Кластерована по `api_key_name`, `provider`, `model`, `status`** (тим редоследом), тако да филтрирање према
  томе ко је извршио позив, куда је отишао или да ли је био неуспешан одбацује блокове унутар сваке партиције. BigQuery
  дозвољава највише четири колоне за кластеровање и редослед је битан: филтер само по `api_key_name`
  одбацује блокове, док филтер само по `status` то не чини.
- **Опционално задржавање партиција** путем `partitionExpirationDays` (0 задржава све), које се примењује
  приликом прављења табеле.

Обе поставке се примењују у тренутку креирања. Постојећа табела задржава распоред који већ има, па
усмерите одредиште на нови ID табеле ако желите да их примените.

`tests/unit/log-export-bigquery.test.ts` проверава да ли мапер и шема табеле остају
усклађени, тако да нова колона евиденције позива не може неприметно да буде изостављена приликом извоза.

Пакети се деле на делове према **оба** критеријума: броју редова и броју бајтова након серијализације. Сам број редова није довољан
када се извозе корисни садржаји: 500 редова који садрже упите могу заузимати десетине мегабајта, а insertAll
одбија захтев већи од 10 MB. Део се затвара када достигне 500 редова или 9 MB, шта год се прво догоди.

---

## 5. Dodavanje odredišta

1. Kreirajte `src/lib/logExport/destinations/<name>.ts` koji izvozi `LogExportDestinationType`:
   Zod `configSchema`, niz deskriptora `fields` za korisnički interfejs, `secretFields` i
   `createClient(config)` koji vraća `test()` / `prepare()` / `send(records)`.
2. Dodajte ga u niz `DESTINATIONS` u datoteci `src/lib/logExport/registry.ts`.
3. Napišite testove u direktorijumu `tests/unit/`.

To je cela izmena: sloj za perzistenciju, cron zadatak, REST sloj, šifrovanje tajnih podataka i
obrazac na kontrolnoj tabli koriste registar.

Dva pravila za novo odredište:

- `send()` **mora da izazove izuzetak** pri delimičnom neuspehu. Uspešno izvršenje znači „odredište ima ove redove“,
  a kursor se trajno pomera iza njih.
- Odredište koje prihvata URL koji je uneo korisnik mora da ga validira pomoću
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) pre slanja zahteva,
  na isti način kao webhook-ovi. BigQuery ovo ne zahteva: njegovi hostovi su konstante.

---

## 6. Upravljanje

- **Kontrolna tabla**: Integracije → Izvoz evidencije. Dodajte odredište, pokrenite **Test** da proverite pristupne podatke
  bez upisivanja redova, a zatim ga omogućite.
- **Zaostali redovi**: svaka kartica odredišta prikazuje redove na čekanju i kursor; `GET
/api/log-export/status` vraća iste podatke, kao i poslednjih 20 izvršavanja zadatka.
- **Neuspeh jednog odredišta ne uzrokuje neuspeh ostalih** — rezime izvršavanja beleži status svakog odredišta
  u `last_status` / `last_error`, dok istorija izvršavanja zadatka čuva zbirne podatke.
- **Brisanjem odredišta briše se i njegov kursor.** Ponovno dodavanje počinje od najstarije sačuvane
  evidencije poziva, čime se ponovo šalju redovi koje odredište možda već sadrži. U BigQuery-ju `insertId`
  svakog reda sprečava duplikate samo unutar BigQuery-jevog sopstvenog vremenskog okvira za uklanjanje duplikata,
  pa je bolje onemogućiti odredište nego ga izbrisati.
