# Log export (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Priebežný, inkrementálny export protokolov volaní OmniRoute do externého analytického úložiska.

Karta informačného panela Logs uchováva históriu požiadaviek v SQLite (`call_logs`), pričom jej rozsah je obmedzený
rotáciou a dobou uchovávania. Export protokolov odosiela rovnakú množinu záznamov podľa plánu, aby pretrvala
dlhšie než lokálna databáza a mohla sa prepájať s ďalšími údajmi. BigQuery je prvým cieľom;
pipeline používa register, takže ďalšie ciele možno jednoducho pridávať.

---

## 1. Ako to funguje

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (množina polí karty Logs)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Plán** — jedna cron úloha `JobRegistry`, `log_export`, s predvolenou hodnotou `0 * * * *` (každú hodinu,
  UTC). Registruje sa v `src/lib/initCloudSync.ts`; možno ju prepísať pomocou `OMNIROUTE_LOG_EXPORT_CRON`.
  Pri každom spustení postupne vyprázdni každý **povolený** cieľ.
- **Kurzor** — implicitné `call_logs.rowid` databázy SQLite, uchovávané pre každý cieľ v
  `log_export_destinations.cursor_row_id`. `timestamp` zámerne nie je kurzorom: volajúci
  môžu zadať vlastnú hodnotu, takže pomalá požiadavka môže byť zapísaná až po rýchlejšej požiadavke, ktorá sa začala
  neskôr, a kurzor založený na časovej pečiatke by ju preskočil.
- **Dávkovanie** — `batch_size` riadkov na požiadavku (predvolene 500), `max_rows_per_run` riadkov na jedno spustenie
  (predvolene 10000), aby sa veľký počet čakajúcich záznamov spracoval počas viacerých spustení namiesto blokovania jedného.
- **Doručenie** — kurzor sa posunie až po úspešnom dokončení `send()`. Neúspešná dávka ponechá
  kurzor na pôvodnom mieste, takže rovnaké riadky sa pri ďalšom spustení odošlú znova. Zárukou je
  doručenie aspoň raz spolu s deduplikáciou na strane cieľa, nie skutočné doručenie presne raz: BigQuery identifikuje každý
  riadok pomocou ID protokolu volania, ktoré rešpektuje podľa možností v rámci vlastného deduplikačného okna.
- **Ochrana pred súbehom** — spustenie cez cron a `POST .../run` môžu nastať súčasne. Cieľ,
  ktorý sa už spracúva, sa preskočí namiesto druhého súbežného spracovania (`skipped: true` vo výsledku spustenia),
  takže súbežné spustenie nemôže znova odoslať dávku ani posunúť kurzor späť.
- **Obnova po vyčistení** — ak sa `cursor_row_id` ocitne nad `MAX(rowid)` (celá tabuľka bola
  vyčistená a číslovanie riadkov sa začalo odznova), mechanizmus spustenia vráti kurzor na hodnotu 0, aby natrvalo neprestal vidieť nové záznamy.

### Prenášané údaje (prompty a dokončenia)

Export predvolene obsahuje iba súhrnné polia zobrazované v **zozname** na karte Logs. Zapnutím
možnosti **Exportovať prompty a odpovede** (`includeBodies`) sa navyše odošlú údaje zobrazované na paneli
**podrobností** karty Logs pre každé volanie:

| Pole                             | Čo obsahuje                                                            |
| -------------------------------- | ---------------------------------------------------------------------- |
| `request_body` / `response_body` | Prenášané údaje volania v podobe zobrazovanej na paneli                |
| `pipeline_route_decision`        | Cieľ a model vybrané smerovačom                                        |
| `pipeline_client_request`        | Nespracovaná požiadavka presne tak, ako ju klient odoslal              |
| `pipeline_openai_request`        | Po transformácii do interného formátu OpenAI                           |
| `pipeline_provider_request`      | Podoba skutočne odoslaná poskytovateľovi v jeho dialekte               |
| `pipeline_provider_response`     | Nespracovaná odpoveď poskytovateľa                                     |
| `pipeline_client_response`       | Obsah odovzdaný späť volajúcemu                                        |
| `pipeline_error`                 | Podrobnosti o chybe pipeline pri neúspešnom volaní                     |
| `bodies_truncated`               | Hodnota True, ak ktorékoľvek pole vyššie dosiahlo limit `maxBodyBytes` |

Ide o obsah promptov, preto je táto možnosť **predvolene vypnutá** a zámerne sa nastavuje osobitne pre každý cieľ.
Odosiela sa to, čo zobrazuje informačný panel, pretože oba mechanizmy čítajú prostredníctvom `getCallLogById`: prenášané údaje sú
už pri zápise anonymizované z hľadiska osobných údajov a sú z nich odstránené tajné údaje. Volanie vykonané pomocou
kľúča API s nastavením `noLog` neukladá žiadne prenášané údaje, takže nie je čo exportovať.

Prenášané údaje sa pre každý riadok čítajú z artefaktu v súborovom systéme, takže ich načítanie prebieha iba pre ciele,
ktoré si ho vyžiadali. Ak artefakt riadka chýba alebo je poškodený, exportuje sa jeho súhrn s hodnotami
null pre prenášané údaje namiesto zlyhania dávky a zablokovania kurzora.

`maxBodyBytes` (predvolene 262144) obmedzuje veľkosť každého poľa. Dlhšie prenášané údaje sa **skrátia namiesto
zahodenia** — skrátený prompt stále odpovedá na otázku „čo bolo zadané“ — a riadok sa označí pomocou
`bodies_truncated`. Dielčie zmeny streamované po jednotlivých blokoch sa neexportujú; zostavená odpoveď je
už uložená v `pipeline_provider_response` a `pipeline_client_response`.

---

## 2. Súbory

| Časť                       | Umiestnenie                                  |
| -------------------------- | -------------------------------------------- |
| Cieľová služba             | `src/lib/logExport/types.ts`                 |
| Register                   | `src/lib/logExport/registry.ts`              |
| Správa tajomstiev          | `src/lib/logExport/secrets.ts`               |
| Spúšťač (slučka kurzora)   | `src/lib/logExport/runner.ts`                |
| Projekcia API              | `src/lib/logExport/presenter.ts`             |
| Cieľ BigQuery              | `src/lib/logExport/destinations/bigquery.ts` |
| Autentifikácia Google SA   | `src/lib/logExport/googleServiceAccount.ts`  |
| Zdroj záznamov volaní      | `src/lib/usage/callLogExportSource.ts`       |
| Perzistencia               | `src/lib/db/logExportDestinations.ts`        |
| Úloha cron                 | `src/lib/jobs/logExportJob.ts`               |
| Vrstva REST                | `src/app/api/log-export/`                    |
| Stránka ovládacieho panela | `src/app/(dashboard)/dashboard/log-export/`  |

Schéma: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

Všetky trasy sú autentifikované pre správu (`requireManagementAuth`). Tajomstvá sa nikdy nevracajú:
uložené tajomstvo sa vráti ako literál `__stored__` a odoslanie tejto hodnoty späť pri aktualizácii
zachová uložené prihlasovacie údaje.

Vytvorenie alebo aktualizácia cieľa, ktorého typ deklaruje tajomstvo, **vyžaduje
`STORAGE_ENCRYPTION_KEY`**. Bez neho je `encrypt()` tichým prechodom bez zmeny, preto sa zápis
odmietne s kódom 400 namiesto uloženia prihlasovacích údajov do SQLite ako obyčajného textu (rovnakú ochranu
používa webhook Telegramu).

| Metóda   | Cesta                                    | Účel                                                                    |
| -------- | ---------------------------------------- | ----------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Typy cieľov + zoznam ich konfiguračných polí                            |
| `GET`    | `/api/log-export/destinations`           | Zoznam cieľov (tajomstvá sú začiernené)                                 |
| `POST`   | `/api/log-export/destinations`           | Vytvorenie cieľa                                                        |
| `GET`    | `/api/log-export/destinations/{id}`      | Načítanie jedného cieľa                                                 |
| `PUT`    | `/api/log-export/destinations/{id}`      | Aktualizácia názvu / povolenia / konfigurácie / dávkovania              |
| `DELETE` | `/api/log-export/destinations/{id}`      | Odstránenie                                                             |
| `POST`   | `/api/log-export/destinations/{id}/test` | Overenie prihlasovacích údajov bez zápisu                               |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Okamžité spracovanie, rovnakou cestou ako naplánované spustenie         |
| `GET`    | `/api/log-export/status`                 | Stav cronu, nedávne spustenia, počet čakajúcich záznamov pre každý cieľ |

`GET /api/log-export/types` umožňuje všeobecné fungovanie používateľského rozhrania: formulár ovládacieho panela sa vykresľuje z
vrátených deskriptorov polí, takže nový cieľ nevyžaduje žiadnu zmenu používateľského rozhrania.

---

## 4. Cieľ BigQuery

Konfiguračné kľúče (`type: "bigquery"`):

| Kľúč                 | Poznámky                                                                  |
| -------------------- | ------------------------------------------------------------------------- |
| `projectId`          | Projekt GCP obsahujúci množinu údajov                                     |
| `datasetId`          | `[A-Za-z0-9_]+`                                                           |
| `tableId`            | `[A-Za-z0-9_]+`                                                           |
| `location`           | Používa sa iba vtedy, keď treba vytvoriť množinu údajov (predvolene `EU`) |
| `serviceAccountJson` | Kľúč účtu služby. Tajomstvo: zašifrované v úložisku, nikdy sa nevracia    |
| `autoCreate`         | Vytvorenie množiny údajov a tabuľky pri prvom exporte (predvolene `true`) |

Účet služby potrebuje oprávnenie `bigquery.tables.updateData` pre cieľovú tabuľku a navyše
`bigquery.datasets.create` / `bigquery.tables.create`, keď je zapnuté `autoCreate`.

Nakonfigurovaná dávka je jednotkou **kurzora**, nie HTTP: `send()` ju rozdelí na volania insertAll
s najviac 500 riadkami, takže veľká hodnota `batch_size` nemôže prekročiť 10 MB limit požiadavky BigQuery.
Pri prechodných stavoch (408/429/500/502/503/504) sa požiadavka zopakuje najviac trikrát s exponenciálnym
oneskorením, pričom sa opätovne použijú rovnaké insertIds; zlyhania autentifikácie a schémy vyvolajú výnimku pri prvom pokuse
namiesto zbytočného pokračovania spustenia.

Tabuľka vytvorená pred niekoľkými okamihmi ešte nie je viditeľná pre koncový bod streamovania, ktorý
niekoľko sekúnd odpovedá kódom 404. Táto odpoveď 404 sa skúsi znova, ale **iba ak tabuľku vytvorilo toto spustenie** —
skutočne chýbajúca tabuľka naďalej zlyhá okamžite. Upozorňujeme, že opätovné vytvorenie tabuľky pod názvom, ktorý
bol nedávno odstránený, spôsobí, že BigQuery niekoľko minút odmieta streamované vkladanie; ide o
vlastnosť postupu odstránenia a následného opätovného vytvorenia, preto namiesto odstránenia a opätovného pridania uprednostnite nový názov tabuľky.

**Čiastočné zlyhanie prichádza ako HTTP 200 s neprázdnym poľom `insertErrors[]`.** Považuje sa to za
zlyhanie a vyvolá sa výnimka, čo zabráni kurzoru posunúť sa za riadky, ktoré BigQuery nikdy
neprijalo; `tests/unit/log-export-bigquery.test.ts` toto správanie fixuje.

Prenos používa čisté REST — vlastnoručne podpísané tvrdenie RS256 sa vymení za prístupový token na adrese
`https://oauth2.googleapis.com/token` a riadky sa potom odošlú do `tabledata.insertAll`. Nepoužíva sa
žiadne SDK od Googlu. Prístupové tokeny sa ukladajú do vyrovnávacej pamäte v rámci procesu pre každú dvojicu (účet služby, rozsah).

Vytvorená tabuľka obsahuje jeden stĺpec pre každé pole karty Záznamy a navyše `exported_at`, pričom jej usporiadanie
zodpovedá spôsobu, akým sa záznamy volaní skutočne dotazujú:

- **Rozdelenie podľa dní na základe `timestamp`**, takže dotaz ohraničený dátumom prehľadáva iba príslušné dni.
- **Klastrovanie podľa `api_key_name`, `provider`, `model`, `status`** (v tomto poradí), takže filtrovanie podľa toho,
  kto volanie spustil, kam smerovalo alebo či zlyhalo, vyradí bloky v každej partícii. BigQuery
  povoľuje najviac štyri klastrovacie stĺpce a na poradí záleží: filter iba podľa `api_key_name`
  bloky vyradí, zatiaľ čo filter iba podľa `status` nie.
- **Voliteľná doba uchovávania partícií** prostredníctvom `partitionExpirationDays` (0 uchová všetko), ktorá sa použije
  pri vytvorení tabuľky.

Obe nastavenia sa použijú pri vytvorení. Existujúca tabuľka si zachová rozloženie, ktoré už má, takže
ak ich chcete použiť, nastavte cieľ na nové id tabuľky.

`tests/unit/log-export-bigquery.test.ts` overuje, že mapovač a schéma tabuľky zostávajú
zosynchronizované, takže nový stĺpec protokolu volaní nemožno pri exporte nepozorovane vynechať.

Dávky sa rozdeľujú na časti podľa **počtu riadkov** aj počtu bajtov po serializácii. Samotný počet riadkov nestačí,
keď sa exportujú dátové obsahy: 500 riadkov obsahujúcich prompty môže mať desiatky megabajtov a insertAll
odmietne požiadavku väčšiu ako 10 MB. Časti sa uzatvárajú pri 500 riadkoch alebo 9 MB podľa toho, čo nastane skôr.

---

## 5. Pridanie cieľa

1. Vytvorte `src/lib/logExport/destinations/<name>.ts`, ktorý exportuje `LogExportDestinationType`:
   Zod `configSchema`, pole deskriptorov `fields` pre používateľské rozhranie, `secretFields` a
   `createClient(config)`, ktoré vracia `test()` / `prepare()` / `send(records)`.
2. Pridajte ho do poľa `DESTINATIONS` v `src/lib/logExport/registry.ts`.
3. Napíšte testy v `tests/unit/`.

To je celá zmena: perzistencia, úloha cron, vrstva REST, šifrovanie tajných údajov aj formulár
ovládacieho panela používajú register.

Dve pravidlá pre nový cieľ:

- `send()` **musí vyvolať výnimku** pri čiastočnom zlyhaní. Úspešné dokončenie znamená „cieľ obsahuje tieto riadky“
  a kurzor sa natrvalo posunie za ne.
- Cieľ, ktorý prijíma adresu URL zadanú používateľom, ju musí pred načítaním overiť pomocou
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) rovnakým spôsobom
  ako webhooky. BigQuery to nepotrebuje: jeho hostitelia sú konštanty.

---

## 6. Prevádzka

- **Ovládací panel**: Integrácie → Export protokolov. Pridajte cieľ, spustite **Test** na overenie
  prihlasovacích údajov bez zápisu riadkov a potom ho povoľte.
- **Nevybavené záznamy**: každá karta cieľa zobrazuje počet čakajúcich riadkov a kurzor; `GET
/api/log-export/status` vracia rovnaké údaje spolu s poslednými 20 spusteniami úlohy.
- **Zlyhanie jedného cieľa nespôsobí zlyhanie ostatných** — súhrn spustenia zaznamenáva stav
  jednotlivých cieľov v `last_status` / `last_error` a história spustení úlohy uchováva súhrnný stav.
- **Odstránením cieľa sa odstráni aj jeho kurzor.** Po jeho opätovnom pridaní sa začne od najstaršieho
  zachovaného protokolu volaní, čím sa znova odošlú riadky, ktoré už cieľ môže obsahovať. V BigQuery
  dokáže hodnota `insertId` pre jednotlivé riadky zabrániť duplikátom iba v rámci vlastného časového
  okna deduplikácie služby BigQuery, preto cieľ radšej zakážte, než odstráňte.
