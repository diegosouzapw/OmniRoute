# Log export (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Kontinuerlig, inkrementell export av OmniRoute-anropsloggar till ett externt analyslager.

Fliken Logs i instrumentpanelen lagrar förfrågningshistorik i SQLite (`call_logs`), vars storlek begränsas genom
rotation och kvarhållning. Loggexport skickar regelbundet ut samma postuppsättning så att den kan leva längre än
den lokala databasen och sammanfogas med andra data. BigQuery är den första destinationen;
pipelinen är ett register, så fler destinationer kan läggas till.

---

## 1. Så fungerar det

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (fältuppsättningen för fliken Logs)
      → destinationsklient.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Schema** — ett `JobRegistry`-cronjobb, `log_export`, med standardvärdet `0 * * * *` (varje timme,
  UTC). Registreras i `src/lib/initCloudSync.ts`; kan åsidosättas med `OMNIROUTE_LOG_EXPORT_CRON`.
  Vid varje körning töms varje **aktiverad** destination sekventiellt.
- **Markör** — SQLites implicita `call_logs.rowid`, beständigt lagrad per destination i
  `log_export_destinations.cursor_row_id`. `timestamp` används avsiktligt inte som markör: anropare
  kan ange sitt eget värde, så en långsam förfrågan kan skrivas efter en snabbare som startade
  senare, och en tidsstämpelmarkör skulle hoppa över den.
- **Batchbearbetning** — `batch_size` rader per förfrågan (standardvärde 500), `max_rows_per_run` rader per körning
  (standardvärde 10000), så att en stor eftersläpning töms under flera körningar i stället för att blockera en enda.
- **Leverans** — markören flyttas fram först efter att `send()` har slutförts. En misslyckad batch lämnar
  markören där den var, så samma rader försöks igen vid nästa körning. Garantin är
  minst en gång plus deduplicering på destinationssidan, inte verklig exakt en gång: BigQuery identifierar varje
  rad med anropsloggens id, vilket respekteras enligt bästa förmåga inom dess eget dedupliceringsfönster.
- **Överlappningsskydd** — cronkörningen och `POST .../run` kan utlösas samtidigt. En destination
  som redan töms hoppas över i stället för att tömmas två gånger (`skipped: true` i körresultatet),
  så en samtidig körning kan inte skicka om en batch eller skriva tillbaka markören bakåt.
- **Återställning efter rensning** — om `cursor_row_id` hamnar över `MAX(rowid)` (hela tabellen har
  rensats och rad-ID:n har börjat om), återställer köraren markören till 0 i stället för att permanent bli blind.

### Nyttolaster (prompter och slutföranden)

Som standard innehåller exporten endast de sammanfattningsfält som **listan** i Logs visar. Om
**Export prompts and responses** (`includeBodies`) aktiveras skickas dessutom det som **detaljpanelen**
i Logs visar för varje anrop:

| Fält                             | Vad det innehåller                                               |
| -------------------------------- | ---------------------------------------------------------------- |
| `request_body` / `response_body` | Anropets nyttolaster så som instrumentpanelen visar dem          |
| `pipeline_route_decision`        | Vilket mål och vilken modell routern valde                       |
| `pipeline_client_request`        | Den råa förfrågan exakt så som klienten skickade den             |
| `pipeline_openai_request`        | Efter översättning till det interna OpenAI-formatet              |
| `pipeline_provider_request`      | Så som den faktiskt skickades uppströms, i leverantörens dialekt |
| `pipeline_provider_response`     | Det råa uppströmssvaret                                          |
| `pipeline_client_response`       | Det som returnerades till anroparen                              |
| `pipeline_error`                 | Felinformation på pipelinenivå för ett misslyckat anrop          |
| `bodies_truncated`               | Sant när något av fälten ovan nådde `maxBodyBytes`               |

Detta är promptinnehåll, så det är **inaktiverat som standard** och är avsiktligt ett val per destination.
Det som skickas är det som instrumentpanelen visar, eftersom båda läser via `getCallLogById`: nyttolaster är
redan PII-sanerade och hemligheter har maskerats när de skrivs, och ett anrop som görs med en
`noLog`-API-nyckel lagrar ingen nyttolast alls, så det finns inget att exportera.

Nyttolaster läses per rad från filsystemsartefakten, så hydrering körs endast för destinationer
som har begärt det. En rad vars artefakt saknas eller är skadad exporterar sin sammanfattning med null-värden
för nyttolasterna i stället för att batchen misslyckas och markören blir stående.

`maxBodyBytes` (standardvärde 262144) begränsar varje fält. Längre nyttolaster **trunkeras i stället för
att tas bort** — en avklippt prompt besvarar fortfarande frågan ”vad efterfrågades?” — och raden flaggas med
`bodies_truncated`. Strömmade deltan, bit för bit, exporteras inte; det sammansatta svaret finns
redan i `pipeline_provider_response` och `pipeline_client_response`.

---

## 2. Filer

| Del                     | Plats                                        |
| ----------------------- | -------------------------------------------- |
| Destinationskontrakt    | `src/lib/logExport/types.ts`                 |
| Register                | `src/lib/logExport/registry.ts`              |
| Hemlighetshantering     | `src/lib/logExport/secrets.ts`               |
| Körning (markörloop)    | `src/lib/logExport/runner.ts`                |
| API-projektion          | `src/lib/logExport/presenter.ts`             |
| BigQuery-destination    | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA-autentisering | `src/lib/logExport/googleServiceAccount.ts`  |
| Källa för anropsloggar  | `src/lib/usage/callLogExportSource.ts`       |
| Persistens              | `src/lib/db/logExportDestinations.ts`        |
| Cron-jobb               | `src/lib/jobs/logExportJob.ts`               |
| REST-lager              | `src/app/api/log-export/`                    |
| Instrumentpanelsida     | `src/app/(dashboard)/dashboard/log-export/`  |

Schema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST-API

Alla rutter är autentiserade för hantering (`requireManagementAuth`). Hemligheter returneras aldrig:
en lagrad hemlighet returneras som den litterala strängen `__stored__`, och om det värdet skickas tillbaka vid en uppdatering
behålls de lagrade autentiseringsuppgifterna.

Att skapa eller uppdatera en destination vars typ deklarerar en hemlighet **kräver
`STORAGE_ENCRYPTION_KEY`**. Utan den utför `encrypt()` en tyst direktvidarebefordran, så skrivningen
avvisas med 400 i stället för att autentiseringsuppgifter placeras i SQLite som klartext (samma skydd som
Telegram-webbhooken använder).

| Metod    | Sökväg                                   | Syfte                                                   |
| -------- | ---------------------------------------- | ------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Destinationstyper + deras lista över konfigurationsfält |
| `GET`    | `/api/log-export/destinations`           | Lista destinationer (hemligheter maskerade)             |
| `POST`   | `/api/log-export/destinations`           | Skapa en destination                                    |
| `GET`    | `/api/log-export/destinations/{id}`      | Läs en destination                                      |
| `PUT`    | `/api/log-export/destinations/{id}`      | Uppdatera namn / aktiverad / konfiguration / batchning  |
| `DELETE` | `/api/log-export/destinations/{id}`      | Ta bort                                                 |
| `POST`   | `/api/log-export/destinations/{id}/test` | Testa autentiseringsuppgifterna, skriv ingenting        |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Töm nu, samma flöde som den schemalagda körningen       |
| `GET`    | `/api/log-export/status`                 | Cron-status, senaste körningar, kö per mål              |

`GET /api/log-export/types` är det som gör användargränssnittet generiskt: formuläret i instrumentpanelen renderas från
de returnerade fältbeskrivningarna, så en ny destination kräver ingen ändring av användargränssnittet.

---

## 4. BigQuery-destination

Konfigurationsnycklar (`type: "bigquery"`):

| Nyckel               | Anmärkningar                                                                   |
| -------------------- | ------------------------------------------------------------------------------ |
| `projectId`          | GCP-projektet som innehåller datauppsättningen                                 |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                |
| `tableId`            | `[A-Za-z0-9_]+`                                                                |
| `location`           | Används endast när datauppsättningen måste skapas (standard `EU`)              |
| `serviceAccountJson` | Nyckel för tjänstekonto. Hemlig: krypterad vid lagring, returneras aldrig      |
| `autoCreate`         | Skapa datauppsättningen och tabellen vid den första exporten (standard `true`) |

Tjänstekontot behöver `bigquery.tables.updateData` för måltabellen, samt
`bigquery.datasets.create` / `bigquery.tables.create` när `autoCreate` är aktiverat.

En konfigurerad batch är en **markör**-enhet, inte en HTTP-enhet: `send()` delar upp den i insertAll-anrop
med högst 500 rader, så ett stort `batch_size` kan inte överskrida BigQuery-gränsen på 10 MB per begäran.
Tillfälliga statuskoder (408/429/500/502/503/504) återförsöks upp till tre gånger med exponentiell
fördröjning och återanvänder samma insertIds; autentiserings- och schemafel kastar ett fel vid det första försöket i stället
för att förbruka körningen.

En tabell som skapades för några ögonblick sedan är ännu inte synlig för strömningsslutpunkten, som svarar
med 404 i några sekunder. Denna 404 återförsöks, men **endast när den aktuella körningen skapade tabellen** —
en tabell som faktiskt saknas orsakar fortfarande ett omedelbart fel. Observera att om en tabell återskapas med ett namn som
nyligen har tagits bort, vägrar BigQuery strömmande infogningar i flera minuter; detta är en
egenskap hos borttagning följd av återskapande, så använd hellre ett nytt tabellnamn än att ta bort och lägga till samma namn igen.

**Ett partiellt fel returneras som HTTP 200 med en icke-tom `insertErrors[]`.** Detta behandlas som
ett fel och kastar ett undantag, vilket hindrar markören från att flyttas förbi rader som BigQuery aldrig
accepterade; `tests/unit/log-export-bigquery.test.ts` låser fast beteendet.

Transporten använder vanlig REST — ett självsignerat RS256-intyg byts mot en åtkomsttoken på
`https://oauth2.googleapis.com/token`, varefter rader skickas till `tabledata.insertAll`. Ingen Google SDK
inkluderas. Åtkomsttoken cachelagras i processen per (tjänstekonto, omfång).

Den skapade tabellen innehåller en kolumn per fält på fliken Loggar samt `exported_at`, och är utformad efter
hur anropsloggar faktiskt efterfrågas:

- **Dagspartitionerad på `timestamp`**, så att en fråga som avgränsas efter datum endast genomsöker dessa dagar.
- **Klustrad efter `api_key_name`, `provider`, `model`, `status`** (i den ordningen), så att filtrering efter
  vem som körde den, vart den skickades eller om den misslyckades utesluter block inom varje partition. BigQuery
  tillåter högst fyra klustringskolumner och ordningen spelar roll: ett filter enbart på `api_key_name`
  utesluter block, medan ett filter enbart på `status` inte gör det.
- **Valfri kvarhållningstid för partitioner** via `partitionExpirationDays` (0 behåller allt), som tillämpas
  när tabellen skapas.

Båda inställningarna tillämpas när tabellen skapas. En befintlig tabell behåller den layout den redan har, så
peka destinationen mot ett nytt tabell-id om du vill använda dem.

`tests/unit/log-export-bigquery.test.ts` säkerställer att mapparen och tabellschemat förblir
synkroniserade, så att en ny kolumn i anropsloggen inte obemärkt kan utelämnas vid exporten.

Batchar delas upp baserat på **både** antal rader och serialiserad storlek i byte. Enbart antalet rader räcker inte
när nyttolaster exporteras: 500 rader med prompter kan uppgå till tiotals megabyte, och insertAll
avvisar en begäran som överstiger 10 MB. Delbatchar avslutas vid 500 rader eller 9 MB, beroende på vilket som inträffar först.

---

## 5. Lägga till en destination

1. Skapa `src/lib/logExport/destinations/<name>.ts` som exporterar en `LogExportDestinationType`:
   ett Zod-`configSchema`, en `fields`-beskrivningsarray för användargränssnittet, `secretFields` och en
   `createClient(config)` som returnerar `test()` / `prepare()` / `send(records)`.
2. Lägg till den i arrayen `DESTINATIONS` i `src/lib/logExport/registry.ts`.
3. Skriv tester under `tests/unit/`.

Det är hela ändringen: persistens, cron-jobbet, REST-lagret, kryptering av hemligheter och
instrumentpanelens formulär läser alla från registret.

Två regler för en ny destination:

- `send()` **måste utlösa ett undantag** vid ett partiellt fel. Att anropet slutförs innebär att ”destinationen har dessa rader”,
  och markören flyttas permanent förbi dem.
- En destination som tar emot en URL som tillhandahålls av användaren måste validera den via
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) före hämtning,
  på samma sätt som webhooks gör. BigQuery behöver inte detta: dess värdar är konstanta.

---

## 6. Drift

- **Instrumentpanel**: Integrationer → Loggexport. Lägg till en destination, kör **Testa** för att kontrollera autentiseringsuppgifterna
  utan att skriva rader och aktivera den sedan.
- **Eftersläpning**: varje destinationskort visar väntande rader och markören; `GET
/api/log-export/status` returnerar samma siffror plus de senaste 20 jobbkörningarna.
- **En destination som misslyckas gör inte att de andra misslyckas** – körningssammanfattningen registrerar status per destination
  i `last_status` / `last_error`, och jobbkörningshistoriken sparar aggregatet.
- **När en destination tas bort raderas även dess markör.** Om den läggs till igen börjar den från den äldsta sparade
  anropsloggen, vilket skickar om rader som destinationen kanske redan innehåller. I BigQuery absorberar
  `insertId` per rad endast detta inom BigQuerys eget dedupliceringsfönster, så inaktivera
  helst en destination i stället för att ta bort den.
