# Log export (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Kontinuerlig, trinnvis eksport av OmniRoute-anropslogger til et eksternt analyselager.

Fanen Logger i kontrollpanelet lagrer forespørselshistorikken i SQLite (`call_logs`), som er begrenset av
rotasjon og oppbevaring. Loggeksport sender det samme postsettet ut etter en tidsplan, slik at det kan bevares
lenger enn den lokale databasen og kobles sammen med andre data. BigQuery er den første destinasjonen;
pipelinens register gjør det enkelt å legge til flere destinasjoner.

---

## 1. Slik fungerer det

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (feltsettet i fanen Logger)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Tidsplan** — én `JobRegistry`-cronjobb, `log_export`, med `0 * * * *` som standard (hver time,
  UTC). Registreres i `src/lib/initCloudSync.ts`; kan overstyres med `OMNIROUTE_LOG_EXPORT_CRON`.
  Hver kjøring tømmer alle **aktiverte** destinasjoner sekvensielt.
- **Markør** — SQLites implisitte `call_logs.rowid`, lagret per destinasjon i
  `log_export_destinations.cursor_row_id`. `timestamp` brukes bevisst ikke som markør: anropere
  kan angi sin egen verdi, slik at en treg forespørsel kan bli skrevet etter en raskere forespørsel som startet
  senere, og en tidsstempelmarkør ville ha hoppet over den.
- **Gruppering** — `batch_size` rader per forespørsel (standard 500), `max_rows_per_run` rader per kjøring
  (standard 10000), slik at et stort etterslep tømmes over flere kjøringer i stedet for å blokkere én enkelt kjøring.
- **Levering** — markøren flyttes bare fremover etter at `send()` er fullført. En mislykket gruppe lar
  markøren bli stående, slik at de samme radene forsøkes på nytt ved neste kjøring. Garantien er
  minst én levering kombinert med deduplisering på destinasjonssiden, ikke reell nøyaktig én levering: BigQuery bruker
  anropslogg-ID-en som nøkkel for hver rad, noe som håndheves etter beste evne innenfor BigQuerys eget dedupliseringsvindu.
- **Beskyttelse mot overlapp** — cronkjøringen og `POST .../run` kan utløses samtidig. En destinasjon
  som allerede tømmes, hoppes over i stedet for å tømmes to ganger (`skipped: true` i kjøringsresultatet),
  slik at en samtidig kjøring ikke kan sende en gruppe på nytt eller flytte markøren bakover.
- **Gjenoppretting etter sletting** — hvis `cursor_row_id` ender over `MAX(rowid)` (hele tabellen ble
  tømt og rad-ID-ene startet på nytt), tilbakestiller kjøreren markøren til 0 i stedet for å bli permanent blind.

### Nyttelaster (prompt og fullføringer)

Som standard inneholder eksporten bare sammendragsfeltene som **listevisningen** i Logger viser. Hvis du aktiverer
**Eksporter prompter og svar** (`includeBodies`), sendes i tillegg det som **detaljruten** i Logger
viser for hvert anrop:

| Felt                             | Hva det inneholder                                             |
| -------------------------------- | -------------------------------------------------------------- |
| `request_body` / `response_body` | Anropsnyttelastene slik de gjengis i kontrollpanelet           |
| `pipeline_route_decision`        | Hvilket mål og hvilken modell ruteren valgte                   |
| `pipeline_client_request`        | Den rå forespørselen nøyaktig slik klienten sendte den         |
| `pipeline_openai_request`        | Etter oversettelse til det interne OpenAI-formatet             |
| `pipeline_provider_request`      | Slik den faktisk ble sendt oppstrøms, på leverandørens dialekt |
| `pipeline_provider_response`     | Det rå svaret fra oppstrøms                                    |
| `pipeline_client_response`       | Det som ble returnert til anroperen                            |
| `pipeline_error`                 | Feildetaljer på pipeline-nivå for et mislykket anrop           |
| `bodies_truncated`               | Sann når et felt ovenfor har nådd `maxBodyBytes`               |

Dette er promptinnhold, så det er **deaktivert som standard** og er bevisst et valg per destinasjon.
Det som sendes, er det samme som kontrollpanelet viser, fordi begge leser gjennom `getCallLogById`: nyttelastene blir
allerede renset for PII og hemmeligheter når de skrives, og et anrop som gjøres med en
`noLog`-API-nøkkel, lagrer ingen nyttelast, så det finnes ingenting å eksportere.

Nyttelaster leses per rad fra filsystemartefakten, slik at innlasting bare kjøres for destinasjoner
som har bedt om det. En rad med en manglende eller skadet artefakt eksporterer sammendraget med nullverdier
for nyttelastene i stedet for å gjøre at gruppen mislykkes og markøren blir stående fast.

`maxBodyBytes` (standard 262144) begrenser hvert felt. Lengre nyttelaster blir **avkortet i stedet for
utelatt** — en avkortet prompt gir fortsatt svar på «hva ble spurt om» — og raden merkes med
`bodies_truncated`. Strømmede delinger som sendes bit for bit, eksporteres ikke; det sammensatte svaret finnes
allerede i `pipeline_provider_response` og `pipeline_client_response`.

---

## 2. Filer

| Del                     | Plassering                                   |
| ----------------------- | -------------------------------------------- |
| Destinasjonskontrakt    | `src/lib/logExport/types.ts`                 |
| Register                | `src/lib/logExport/registry.ts`              |
| Hemmelighetshåndtering  | `src/lib/logExport/secrets.ts`               |
| Kjører (markørløkke)    | `src/lib/logExport/runner.ts`                |
| API-projeksjon          | `src/lib/logExport/presenter.ts`             |
| BigQuery-destinasjon    | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA-autentisering | `src/lib/logExport/googleServiceAccount.ts`  |
| Kilde for anropslogg    | `src/lib/usage/callLogExportSource.ts`       |
| Persistens              | `src/lib/db/logExportDestinations.ts`        |
| Cron-jobb               | `src/lib/jobs/logExportJob.ts`               |
| REST-lag                | `src/app/api/log-export/`                    |
| Kontrollpanelside       | `src/app/(dashboard)/dashboard/log-export/`  |

Skjema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST-API

Alle rutene er autentisert for administrasjon (`requireManagementAuth`). Hemmeligheter returneres aldri:
En lagret hemmelighet returneres som den bokstavelige verdien `__stored__`, og hvis denne verdien sendes tilbake i en oppdatering,
beholdes den lagrede legitimasjonen.

Opprettelse eller oppdatering av en destinasjon med en type som deklarerer en hemmelighet, **krever
`STORAGE_ENCRYPTION_KEY`**. Uten denne er `encrypt()` en stille passthrough, så skrivingen
avvises med 400 i stedet for å lagre legitimasjon i SQLite som klartekst (samme beskyttelse som
Telegram-webhooken bruker).

| Metode   | Bane                                     | Formål                                               |
| -------- | ---------------------------------------- | ---------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Destinasjonstyper + listen over konfigurasjonsfelter |
| `GET`    | `/api/log-export/destinations`           | Vis destinasjoner (hemmeligheter skjult)             |
| `POST`   | `/api/log-export/destinations`           | Opprett en destinasjon                               |
| `GET`    | `/api/log-export/destinations/{id}`      | Les én                                               |
| `PUT`    | `/api/log-export/destinations/{id}`      | Oppdater navn / aktivert / konfigurasjon / batching  |
| `DELETE` | `/api/log-export/destinations/{id}`      | Slett                                                |
| `POST`   | `/api/log-export/destinations/{id}/test` | Test legitimasjon uten å skrive noe                  |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Tøm nå, samme flyt som den planlagte kjøringen       |
| `GET`    | `/api/log-export/status`                 | Cron-status, nylige kjøringer, etterslep per mål     |

`GET /api/log-export/types` er det som gjør brukergrensesnittet generisk: kontrollpanelskjemaet gjengis fra
de returnerte feltbeskrivelsene, slik at en ny destinasjon ikke krever noen endring i brukergrensesnittet.

---

## 4. BigQuery-destinasjon

Konfigurasjonsnøkler (`type: "bigquery"`):

| Nøkkel               | Merknader                                                                |
| -------------------- | ------------------------------------------------------------------------ |
| `projectId`          | GCP-prosjektet som inneholder datasettet                                 |
| `datasetId`          | `[A-Za-z0-9_]+`                                                          |
| `tableId`            | `[A-Za-z0-9_]+`                                                          |
| `location`           | Brukes bare når datasettet må opprettes (standardverdi `EU`)             |
| `serviceAccountJson` | Tjenestekontonøkkel. Hemmelighet: kryptert ved lagring, returneres aldri |
| `autoCreate`         | Opprett datasettet og tabellen ved første eksport (standardverdi `true`) |

Tjenestekontoen trenger `bigquery.tables.updateData` på måltabellen, i tillegg til
`bigquery.datasets.create` / `bigquery.tables.create` når `autoCreate` er slått på.

En konfigurert batch er en **markørenhet**, ikke en HTTP-enhet: `send()` deler den opp i insertAll-kall
med maksimalt 500 rader, slik at en stor `batch_size` ikke kan utløse BigQuery-grensen på 10 MB per forespørsel.
Midlertidige statuser (408/429/500/502/503/504) forsøkes på nytt opptil tre ganger med eksponentiell
ventetid, med gjenbruk av de samme insertIds-verdiene. Autentiserings- og skjemafeil kaster ved første forsøk i stedet
for å sløse bort kjøringen.

En tabell som ble opprettet for bare noen øyeblikk siden, er ennå ikke synlig for strømmingsendepunktet, som svarer
med 404 i noen sekunder. Denne 404-feilen forsøkes på nytt, men **bare når denne kjøringen opprettet tabellen** —
en tabell som faktisk mangler, feiler fortsatt umiddelbart. Merk at hvis en tabell opprettes på nytt under et navn som
nylig ble slettet, vil BigQuery avvise strømmingsinnsettinger i flere minutter. Dette er en
egenskap ved slett-og-opprett-på-nytt, så bruk helst et nytt tabellnavn fremfor å slette og legge til den samme på nytt.

**En delvis feil returneres som HTTP 200 med en ikke-tom `insertErrors[]`.** Dette behandles som
en feil og kaster et unntak, slik at markøren ikke flyttes forbi rader som BigQuery aldri
godtok. `tests/unit/log-export-bigquery.test.ts` låser denne oppførselen.

Transporten bruker ren REST — en selvsignert RS256-påstand byttes mot et tilgangstoken på
`https://oauth2.googleapis.com/token`, og deretter sendes radene til `tabledata.insertAll`. Ingen Google-SDK
inkluderes. Tilgangstokener bufres i prosessen per (tjenestekonto, omfang).

Den opprettede tabellen har én kolonne per felt i Logger-fanen samt `exported_at`, og er strukturert etter
hvordan anropslogger faktisk blir spurt mot:

- **Dagspartisjonert på `timestamp`**, slik at en spørring avgrenset etter dato bare skanner disse dagene.
- **Klynget etter `api_key_name`, `provider`, `model`, `status`** (i den rekkefølgen), slik at filtrering etter
  hvem som kjørte den, hvor den ble sendt, eller om den feilet, utelater blokker i hver partisjon. BigQuery
  tillater maksimalt fire klyngekolonner, og rekkefølgen er viktig: Et filter bare på `api_key_name`
  utelater blokker, mens et filter bare på `status` ikke gjør det.
- **Valgfri oppbevaringstid for partisjoner** via `partitionExpirationDays` (0 beholder alt), brukt
  når tabellen opprettes.

Begge innstillingene gjelder på opprettelsestidspunktet. En eksisterende tabell beholder oppsettet den allerede har, så
pek destinasjonen mot en ny tabell-ID hvis du vil ta dem i bruk.

`tests/unit/log-export-bigquery.test.ts` kontrollerer at mapperen og tabellskjemaet forblir
synkronisert, slik at en ny kolonne i anropsloggen ikke kan utelates i det stille under eksporten.

Bunker deles opp etter **både** antall rader og serialiserte byte. Antall rader alene er ikke nok
når nyttelaster eksporteres: 500 rader med prompter kan utgjøre flere titalls megabyte, og insertAll
avviser en forespørsel på over 10 MB. Hver del avsluttes ved 500 rader eller 9 MB, avhengig av hva som inntreffer først.

---

## 5. Legge til en destinasjon

1. Opprett `src/lib/logExport/destinations/<name>.ts` som eksporterer en `LogExportDestinationType`:
   et Zod-`configSchema`, en `fields`-deskriptormatrise for brukergrensesnittet, `secretFields` og en
   `createClient(config)` som returnerer `test()` / `prepare()` / `send(records)`.
2. Legg den til i `DESTINATIONS`-matrisen i `src/lib/logExport/registry.ts`.
3. Skriv tester under `tests/unit/`.

Det er hele endringen: persistens, cron-jobben, REST-laget, hemmelighetskrypteringen og
dashboardskjemaet leser alle registeret.

To regler for en ny destinasjon:

- `send()` **må utløse et unntak** ved delvis feil. En vellykket retur betyr «destinasjonen har disse radene»,
  og markøren flyttes permanent forbi dem.
- En destinasjon som tar imot en brukeroppgitt URL, må validere den gjennom
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) før forespørselen sendes,
  på samme måte som webhooks gjør. BigQuery trenger ikke dette: vertene er konstanter.

---

## 6. Bruk

- **Dashboard**: Integrasjoner → Loggeksport. Legg til en destinasjon, kjør **Test** for å kontrollere
  legitimasjonen uten å skrive rader, og aktiver den deretter.
- **Restanse**: hvert destinasjonskort viser ventende rader og markøren; `GET
/api/log-export/status` returnerer de samme tallene samt de siste 20 jobbkjøringene.
- **En destinasjon med feil påvirker ikke de andre** — kjøringssammendraget registrerer status
  per destinasjon i `last_status` / `last_error`, og jobbkjøringshistorikken beholder aggregatet.
- **Når en destinasjon slettes, slettes også markøren.** Hvis den legges til på nytt, starter den
  fra den eldste bevarte anropsloggen, noe som sender rader på nytt som destinasjonen kanskje allerede har.
  I BigQuery absorberer `insertId` per rad dette bare innenfor BigQuery sitt eget dedupliseringsvindu,
  så det er bedre å deaktivere en destinasjon enn å slette den.
