# Log export (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Kontinuerlig, trinvis eksport af OmniRoute-opkaldslogfiler til et eksternt analyselager.

Fanen Logs i dashboardet gemmer anmodningshistorikken i SQLite (`call_logs`), som er begrænset af
rotation og opbevaring. Logeksport sender det samme datasæt ud efter en tidsplan, så det kan bevares
længere end den lokale database og kombineres med andre data. BigQuery er den første destination;
pipelinen er et register, så flere destinationer kan tilføjes.

---

## 1. Sådan fungerer det

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (feltsættet fra fanen Logs)
      → destinationsklient.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Tidsplan** — ét `JobRegistry`-cronjob, `log_export`, som som standard er indstillet til `0 * * * *` (hver time,
  UTC). Registreret i `src/lib/initCloudSync.ts`; kan tilsidesættes med `OMNIROUTE_LOG_EXPORT_CRON`.
  Hver kørsel tømmer alle **aktiverede** destinationer sekventielt.
- **Markør** — SQLites implicitte `call_logs.rowid`, gemt pr. destination i
  `log_export_destinations.cursor_row_id`. `timestamp` bruges bevidst ikke som markør: klienter
  kan angive deres egen værdi, så en langsom anmodning kan blive skrevet efter en hurtigere anmodning, der startede
  senere, og en tidsstempelmarkør ville springe den over.
- **Batchbehandling** — `batch_size` rækker pr. anmodning (standard 500), `max_rows_per_run` rækker pr. kørsel
  (standard 10000), så et stort efterslæb behandles over flere kørsler i stedet for at blokere én.
- **Levering** — markøren flyttes kun frem, efter at `send()` er fuldført. En mislykket batch efterlader
  markøren, hvor den var, så de samme rækker forsøges igen ved næste kørsel. Garantien er
  mindst én levering plus deduplikering på destinationssiden, ikke ægte præcis én levering: BigQuery identificerer hver
  række med opkaldslog-id'et, som tjenesten anvender efter bedste evne inden for sit eget deduplikeringsvindue.
- **Beskyttelse mod overlap** — cron-kørslen og `POST .../run` kan blive udløst samtidig. En destination,
  der allerede tømmes, springes over i stedet for at blive tømt to gange (`skipped: true` i kørselsresultatet),
  så en samtidig kørsel ikke kan gensende en batch eller flytte markøren baglæns.
- **Genoprettelse efter sletning** — hvis `cursor_row_id` ender over `MAX(rowid)` (hele tabellen blev
  ryddet, og række-id'erne startede forfra), nulstiller runneren markøren til 0 i stedet for permanent at miste data af syne.

### Payloads (prompter og fuldførelser)

Som standard indeholder eksporten kun de oversigtsfelter, som **listevisningen** i Logs viser. Aktivering af
**Eksportér prompter og svar** (`includeBodies`) medtager desuden det, som **detaljeruden** i Logs
viser for hvert opkald:

| Felt                             | Hvad det indeholder                                       |
| -------------------------------- | --------------------------------------------------------- |
| `request_body` / `response_body` | Opkaldets payloads, som dashboardet gengiver dem          |
| `pipeline_route_decision`        | Hvilket mål og hvilken model routeren valgte              |
| `pipeline_client_request`        | Den rå anmodning, præcis som klienten sendte den          |
| `pipeline_openai_request`        | Efter oversættelse til det interne OpenAI-format          |
| `pipeline_provider_request`      | Som den faktisk blev sendt upstream, i udbyderens dialekt |
| `pipeline_provider_response`     | Det rå upstream-svar                                      |
| `pipeline_client_response`       | Det, der blev returneret til klienten                     |
| `pipeline_error`                 | Fejldetaljer på pipeline-niveau for et mislykket opkald   |
| `bodies_truncated`               | Sand, når et af felterne ovenfor nåede `maxBodyBytes`     |

Dette er promptindhold, så det er **deaktiveret som standard** og er bevidst et valg pr. destination.
Det, der sendes, er det, som dashboardet viser, fordi begge læser via `getCallLogById`: payloads bliver
allerede renset for PII og hemmeligheder, når de skrives, og et opkald foretaget med en
`noLog`-API-nøgle gemmer slet ingen payload, så der er intet at eksportere.

Payloads læses pr. række fra filsystemartefaktet, så hydrering kun udføres for destinationer,
der har anmodet om det. En række, hvis artefakt mangler eller er beskadiget, eksporteres med sin oversigt og null-
payloads i stedet for at få batchen til at mislykkes og blokere markøren.

`maxBodyBytes` (standard 262144) begrænser hvert felt. Længere payloads bliver **afkortet i stedet for
udeladt** — en afkortet prompt besvarer stadig spørgsmålet "hvad blev der spurgt om" — og rækken markeres med
`bodies_truncated`. Streamede deltas opdelt i bidder eksporteres ikke; det samlede svar findes
allerede i `pipeline_provider_response` og `pipeline_client_response`.

---

## 2. Filer

| Del                    | Placering                                    |
| ---------------------- | -------------------------------------------- |
| Destinationskontrakt   | `src/lib/logExport/types.ts`                 |
| Register               | `src/lib/logExport/registry.ts`              |
| Hemmelighedshåndtering | `src/lib/logExport/secrets.ts`               |
| Kørsel (cursor-løkke)  | `src/lib/logExport/runner.ts`                |
| API-projektion         | `src/lib/logExport/presenter.ts`             |
| BigQuery-destination   | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA-godkendelse  | `src/lib/logExport/googleServiceAccount.ts`  |
| Kilde til kaldslog     | `src/lib/usage/callLogExportSource.ts`       |
| Persistens             | `src/lib/db/logExportDestinations.ts`        |
| Cron-job               | `src/lib/jobs/logExportJob.ts`               |
| REST-lag               | `src/app/api/log-export/`                    |
| Dashboard-side         | `src/app/(dashboard)/dashboard/log-export/`  |

Skema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST-API

Alle ruter er beskyttet af administrationsgodkendelse (`requireManagementAuth`). Hemmeligheder returneres aldrig:
En gemt hemmelighed returneres som den bogstavelige værdi `__stored__`, og hvis denne værdi sendes tilbage ved en opdatering,
bevares den gemte legitimationsoplysning.

Oprettelse eller opdatering af en destination, hvis type deklarerer en hemmelighed, **kræver
`STORAGE_ENCRYPTION_KEY`**. Uden den er `encrypt()` en lydløs passthrough, så skrivningen
afvises med en 400-fejl i stedet for at gemme en legitimationsoplysning i SQLite som klartekst (den samme beskyttelse, som
Telegram-webhooken anvender).

| Metode   | Sti                                      | Formål                                                    |
| -------- | ---------------------------------------- | --------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Destinationstyper + deres liste over konfigurationsfelter |
| `GET`    | `/api/log-export/destinations`           | Vis destinationer (hemmeligheder maskeret)                |
| `POST`   | `/api/log-export/destinations`           | Opret en destination                                      |
| `GET`    | `/api/log-export/destinations/{id}`      | Hent én                                                   |
| `PUT`    | `/api/log-export/destinations/{id}`      | Opdater navn / aktiveret / konfiguration / batching       |
| `DELETE` | `/api/log-export/destinations/{id}`      | Slet                                                      |
| `POST`   | `/api/log-export/destinations/{id}/test` | Test legitimationsoplysninger uden at skrive noget        |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Tøm nu via samme forløb som den planlagte kørsel          |
| `GET`    | `/api/log-export/status`                 | Cron-status, seneste kørsler og backlog pr. destination   |

`GET /api/log-export/types` er det, der gør brugergrænsefladen generisk: dashboard-formularen gengives ud fra
de returnerede feltbeskrivelser, så en ny destination ikke kræver nogen ændring af brugergrænsefladen.

---

## 4. BigQuery-destination

Konfigurationsnøgler (`type: "bigquery"`):

| Nøgle                | Bemærkninger                                                             |
| -------------------- | ------------------------------------------------------------------------ |
| `projectId`          | GCP-projektet, som indeholder datasættet                                 |
| `datasetId`          | `[A-Za-z0-9_]+`                                                          |
| `tableId`            | `[A-Za-z0-9_]+`                                                          |
| `location`           | Bruges kun, når datasættet skal oprettes (standard: `EU`)                |
| `serviceAccountJson` | Servicekontonøgle. Hemmelighed: krypteret ved lagring, returneres aldrig |
| `autoCreate`         | Opret datasættet og tabellen ved første eksport (standard: `true`)       |

Servicekontoen skal have `bigquery.tables.updateData` på måltabellen samt
`bigquery.datasets.create` / `bigquery.tables.create`, når `autoCreate` er aktiveret.

En konfigureret batch er en **cursor**-enhed, ikke en HTTP-enhed: `send()` opdeler den i insertAll-kald
med højst 500 rækker, så en stor `batch_size` ikke kan overskride BigQuerys grænse på 10 MB pr. anmodning.
Midlertidige statuskoder (408/429/500/502/503/504) forsøges igen op til tre gange med eksponentiel
backoff og genbrug af de samme insertIds; godkendelses- og skemafejl udløser en fejl ved første forsøg i stedet
for at spilde kørslen.

En tabel, der blev oprettet for få øjeblikke siden, er endnu ikke synlig for streaming-slutpunktet, som svarer
med 404 i nogle få sekunder. Denne 404-fejl forsøges igen, men **kun når denne kørsel oprettede tabellen** —
en tabel, der reelt mangler, fejler stadig med det samme. Bemærk, at hvis en tabel genoprettes under et navn, som
for nylig blev slettet, afviser BigQuery streaming-indsættelser i flere minutter; dette er en egenskab ved
slet-og-genopret, så brug helst et nyt tabelnavn frem for at fjerne og tilføje den samme igen.

**En delvis fejl ankommer som HTTP 200 med en ikke-tom `insertErrors[]`.** Dette behandles som
en fejl og udløser en exception, hvilket forhindrer cursoren i at rykke forbi rækker, som BigQuery aldrig
accepterede; `tests/unit/log-export-bigquery.test.ts` fastholder denne adfærd.

Transporten foregår via ren REST — en selvsigneret RS256-erklæring udveksles med et adgangstoken på
`https://oauth2.googleapis.com/token`, hvorefter rækker sendes til `tabledata.insertAll`. Der inkluderes
ingen Google-SDK. Adgangstokens caches i processen pr. (servicekonto, scope).

Den oprettede tabel har én kolonne pr. felt på fanen Logs plus `exported_at` og er struktureret efter,
hvordan kaldslogge faktisk forespørges:

- **Dagspartitioneret efter `timestamp`**, så en forespørgsel, der er afgrænset efter dato, kun scanner disse dage.
- **Klynget efter `api_key_name`, `provider`, `model`, `status`** (i denne rækkefølge), så filtrering efter,
  hvem der kørte kaldet, hvor det blev sendt hen, eller om det mislykkedes, frasorterer blokke i hver partition. BigQuery
  tillader højst fire klyngekolonner, og rækkefølgen har betydning: Et filter alene på `api_key_name`
  frasorterer blokke, mens et filter alene på `status` ikke gør.
- **Valgfri opbevaringsperiode for partitioner** via `partitionExpirationDays` (0 beholder alt), som anvendes,
  når tabellen oprettes.

Begge indstillinger anvendes på oprettelsestidspunktet. En eksisterende tabel beholder det layout, den allerede har, så
peg destinationen på et nyt tabel-id, hvis du vil anvende dem.

`tests/unit/log-export-bigquery.test.ts` sikrer, at mapperen og tabelskemaet forbliver
synkroniserede, så en ny kolonne i kaldeloggen ikke ubemærket kan blive udeladt under eksporten.

Batches opdeles efter **både** antal rækker og serialiserede bytes. Antallet af rækker alene er ikke nok,
når payloads eksporteres: 500 rækker med prompts kan fylde adskillige megabyte, og insertAll
afviser en anmodning på over 10 MB. Chunks afsluttes ved 500 rækker eller 9 MB, alt efter hvad der indtræffer først.

---

## 5. Tilføjelse af en destination

1. Opret `src/lib/logExport/destinations/<name>.ts`, der eksporterer en `LogExportDestinationType`:
   et Zod-`configSchema`, et `fields`-deskriptorarray til brugergrænsefladen, `secretFields` og en
   `createClient(config)`, der returnerer `test()` / `prepare()` / `send(records)`.
2. Føj den til `DESTINATIONS`-arrayet i `src/lib/logExport/registry.ts`.
3. Skriv tests under `tests/unit/`.

Det er hele ændringen: persistens, cron-jobbet, REST-laget, kryptering af hemmeligheder og
dashboardformularen læser alle fra registreringsdatabasen.

To regler for en ny destination:

- `send()` **skal udløse en fejl** ved delvis fejl. Hvis funktionen returnerer normalt, betyder det, at "destinationen har disse rækker",
  og markøren flyttes permanent forbi dem.
- En destination, der accepterer en brugerangivet URL, skal validere den via
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) før hentning,
  på samme måde som webhooks gør. BigQuery behøver ikke dette: dens værter er konstanter.

---

## 6. Drift

- **Dashboard**: Integrationer → Logeksport. Tilføj en destination, kør **Test** for at kontrollere legitimationsoplysningerne
  uden at skrive rækker, og aktivér den derefter.
- **Efterslæb**: Hvert destinationskort viser ventende rækker og markøren; `GET
/api/log-export/status` returnerer de samme tal samt de seneste 20 jobkørsler.
- **En destination med fejl får ikke de andre til at fejle** — kørselsoversigten registrerer status pr. destination
  i `last_status` / `last_error`, og jobkørselshistorikken gemmer det samlede resultat.
- **Hvis en destination slettes, slettes dens markør også.** Hvis den tilføjes igen, starter den fra den ældste bevarede
  opkaldslog, hvilket sender rækker igen, som destinationen muligvis allerede indeholder. I BigQuery håndterer `insertId`
  pr. række kun dette inden for BigQuerys eget deduplikeringsvindue, så deaktivering af en destination er at foretrække
  frem for sletning.
