# Log export (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇮🇹 [it](../../../it/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Continue, incrementeel exporteren van OmniRoute-aanroeplogboeken naar een externe analyticsopslag.

Het tabblad Logs van het dashboard bewaart de aanvraaggeschiedenis in SQLite (`call_logs`), die wordt begrensd door rotatie en retentie. Logexport verzendt dezelfde recordset volgens een schema, zodat deze langer kan worden bewaard dan in de lokale database en kan worden gecombineerd met andere gegevens. BigQuery is de eerste bestemming; de pipeline is een register, zodat meer bestemmingen eenvoudig kunnen worden toegevoegd.

---

## 1. Werking

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (de veldenset van het tabblad Logs)
      → bestemmingsclient.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Schema** — één cronjob in `JobRegistry`, `log_export`, standaard ingesteld op `0 * * * *` (elk uur, UTC). Geregistreerd in `src/lib/initCloudSync.ts`; kan worden overschreven met `OMNIROUTE_LOG_EXPORT_CRON`. Bij elke uitvoering worden alle **ingeschakelde** bestemmingen achtereenvolgens geleegd.
- **Cursor** — de impliciete `call_logs.rowid` van SQLite, per bestemming opgeslagen in `log_export_destinations.cursor_row_id`. `timestamp` wordt bewust niet als cursor gebruikt: aanroepers kunnen zelf een waarde opgeven, waardoor een trage aanvraag kan worden opgeslagen na een snellere aanvraag die later is gestart; met een tijdstempelcursor zou die trage aanvraag worden overgeslagen.
- **Batchverwerking** — `batch_size` rijen per aanvraag (standaard 500), `max_rows_per_run` rijen per uitvoering (standaard 10000), zodat een grote achterstand over meerdere uitvoeringen wordt verwerkt in plaats van één uitvoering te blokkeren.
- **Levering** — de cursor gaat pas verder nadat `send()` is voltooid. Bij een mislukte batch blijft de cursor ongewijzigd, zodat dezelfde rijen bij de volgende uitvoering opnieuw worden geprobeerd. De garantie is ten minste één levering, gecombineerd met deduplicatie aan de bestemmingszijde, niet werkelijk exact één levering: BigQuery geeft elke rij een sleutel op basis van de aanroeplogboek-id en respecteert deze naar beste vermogen binnen het eigen deduplicatievenster.
- **Beveiliging tegen overlap** — de cronuitvoering en `POST .../run` kunnen gelijktijdig worden geactiveerd. Een bestemming die al wordt geleegd, wordt overgeslagen in plaats van tweemaal geleegd (`skipped: true` in het uitvoeringsresultaat), zodat een gelijktijdige uitvoering niet opnieuw een batch kan verzenden of de cursor kan terugzetten.
- **Herstel na opschoning** — als `cursor_row_id` hoger komt te liggen dan `MAX(rowid)` (de volledige tabel is opgeschoond en de rij-id's zijn opnieuw begonnen), wordt de runner teruggezet naar 0 in plaats van permanent geen nieuwe rijen meer te detecteren.

### Payloads (prompts en voltooiingen)

Standaard bevat de export alleen de samenvattingsvelden die in de **lijst** van Logs worden weergegeven. Als **Prompts en antwoorden exporteren** (`includeBodies`) wordt ingeschakeld, worden daarnaast de gegevens verzonden die voor elke aanroep in het **detailvenster** van Logs worden weergegeven:

| Veld                             | Inhoud                                                                   |
| -------------------------------- | ------------------------------------------------------------------------ |
| `request_body` / `response_body` | De aanroeppayloads zoals het dashboard ze weergeeft                      |
| `pipeline_route_decision`        | Welk doel en model door de router zijn gekozen                           |
| `pipeline_client_request`        | De onbewerkte aanvraag, exact zoals de client deze heeft verzonden       |
| `pipeline_openai_request`        | Na omzetting naar de interne OpenAI-vorm                                 |
| `pipeline_provider_request`      | Zoals daadwerkelijk upstream verzonden, in het dialect van de provider   |
| `pipeline_provider_response`     | Het onbewerkte upstreamantwoord                                          |
| `pipeline_client_response`       | Wat aan de aanroeper is teruggestuurd                                    |
| `pipeline_error`                 | Foutdetails op pipelineniveau voor een mislukte aanroep                  |
| `bodies_truncated`               | True wanneer een van de bovenstaande velden `maxBodyBytes` heeft bereikt |

Dit is promptinhoud en staat daarom **standaard uit**; bovendien is dit bewust een keuze per bestemming. Wat wordt verzonden, is wat het dashboard weergeeft, omdat beide gegevens lezen via `getCallLogById`: payloads zijn al ontdaan van PII en geheimen wanneer ze worden opgeslagen, en bij een aanroep met een `noLog`-API-sleutel wordt helemaal geen payload opgeslagen, zodat er niets te exporteren is.

Payloads worden per rij uit het bestandssysteemartefact gelezen, zodat hydratatie alleen wordt uitgevoerd voor bestemmingen die hierom hebben gevraagd. Als het artefact van een rij ontbreekt of beschadigd is, wordt de samenvatting geëxporteerd met null-payloads, in plaats van dat de batch mislukt en de cursor vastloopt.

`maxBodyBytes` (standaard 262144) begrenst elk veld. Langere payloads worden **afgekapt in plaats van verwijderd** — een afgekapte prompt geeft nog steeds antwoord op de vraag "wat werd gevraagd" — en de rij wordt gemarkeerd met `bodies_truncated`. Chunk-voor-chunk gestreamde delta's worden niet geëxporteerd; het samengestelde antwoord staat al in `pipeline_provider_response` en `pipeline_client_response`.

---

## 2. Bestanden

| Onderdeel          | Locatie                                      |
| ------------------ | -------------------------------------------- |
| Doelcontract       | `src/lib/logExport/types.ts`                 |
| Register           | `src/lib/logExport/registry.ts`              |
| Geheimenbeheer     | `src/lib/logExport/secrets.ts`               |
| Runner (cursorlus) | `src/lib/logExport/runner.ts`                |
| API-projectie      | `src/lib/logExport/presenter.ts`             |
| BigQuery-doel      | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA-auth     | `src/lib/logExport/googleServiceAccount.ts`  |
| Aanroeplogbron     | `src/lib/usage/callLogExportSource.ts`       |
| Persistentie       | `src/lib/db/logExportDestinations.ts`        |
| Cron-taak          | `src/lib/jobs/logExportJob.ts`               |
| REST-laag          | `src/app/api/log-export/`                    |
| Dashboardpagina    | `src/app/(dashboard)/dashboard/log-export/`  |

Schema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST-API

Alle routes zijn beveiligd met beheerauthenticatie (`requireManagementAuth`). Geheimen worden nooit geretourneerd:
een opgeslagen geheim wordt teruggegeven als de letterlijke waarde `__stored__`, en als die waarde bij een update
wordt teruggestuurd, blijft de opgeslagen referentie behouden.

Voor het aanmaken of bijwerken van een doel waarvan het type een geheim declareert, is
**`STORAGE_ENCRYPTION_KEY` vereist**. Zonder deze sleutel voert `encrypt()` stilzwijgend niets uit, waardoor de
schrijfbewerking met een 400 wordt geweigerd in plaats van een referentie als platte tekst in SQLite op te slaan
(dezelfde beveiliging die de Telegram-webhook toepast).

| Methode  | Pad                                      | Doel                                                    |
| -------- | ---------------------------------------- | ------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Doeltypen + hun lijst met configuratievelden            |
| `GET`    | `/api/log-export/destinations`           | Doelen weergeven (geheimen geredigeerd)                 |
| `POST`   | `/api/log-export/destinations`           | Een doel aanmaken                                       |
| `GET`    | `/api/log-export/destinations/{id}`      | Eén doel lezen                                          |
| `PUT`    | `/api/log-export/destinations/{id}`      | Naam / ingeschakeld / configuratie / batching bijwerken |
| `DELETE` | `/api/log-export/destinations/{id}`      | Verwijderen                                             |
| `POST`   | `/api/log-export/destinations/{id}/test` | Referenties testen, niets schrijven                     |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Nu leegmaken, hetzelfde pad als de geplande uitvoering  |
| `GET`    | `/api/log-export/status`                 | Cron-status, recente uitvoeringen, achterstand per doel |

`GET /api/log-export/types` maakt de gebruikersinterface generiek: het dashboardformulier wordt opgebouwd uit
de geretourneerde veldbeschrijvingen, zodat voor een nieuw doel geen wijziging aan de gebruikersinterface nodig is.

---

## 4. BigQuery-doel

Configuratiesleutels (`type: "bigquery"`):

| Sleutel              | Opmerkingen                                                                |
| -------------------- | -------------------------------------------------------------------------- |
| `projectId`          | GCP-project dat de dataset bevat                                           |
| `datasetId`          | `[A-Za-z0-9_]+`                                                            |
| `tableId`            | `[A-Za-z0-9_]+`                                                            |
| `location`           | Alleen gebruikt wanneer de dataset moet worden aangemaakt (standaard `EU`) |
| `serviceAccountJson` | Serviceaccountsleutel. Geheim: versleuteld opgeslagen, nooit geretourneerd |
| `autoCreate`         | De dataset en tabel bij de eerste export aanmaken (standaard `true`)       |

Het serviceaccount heeft `bigquery.tables.updateData` nodig voor de doeltabel, plus
`bigquery.datasets.create` / `bigquery.tables.create` wanneer `autoCreate` is ingeschakeld.

Een geconfigureerde batch is een **cursor**-eenheid, geen HTTP-eenheid: `send()` splitst deze op in `insertAll`-
aanroepen van maximaal 500 rijen, zodat een grote `batch_size` de BigQuery-limiet van 10 MB per verzoek niet kan
overschrijden. Tijdelijke statussen (408/429/500/502/503/504) worden maximaal drie keer opnieuw geprobeerd met
exponentiële back-off, waarbij dezelfde insertIds opnieuw worden gebruikt; authenticatie- en schemafouten
genereren bij de eerste poging een fout in plaats van de uitvoering te verspillen.

Een tabel die enkele ogenblikken geleden is aangemaakt, is nog niet zichtbaar voor het streaming-eindpunt, dat
gedurende enkele seconden met 404 antwoordt. Die 404 wordt opnieuw geprobeerd, maar **alleen wanneer deze
uitvoering de tabel heeft aangemaakt** — een werkelijk ontbrekende tabel faalt nog steeds onmiddellijk. Houd er
rekening mee dat BigQuery streaming-invoegingen enkele minuten weigert als een tabel opnieuw wordt aangemaakt
onder een naam die onlangs is verwijderd; dit is inherent aan verwijderen en vervolgens opnieuw aanmaken, dus
gebruik bij voorkeur een nieuwe tabelnaam in plaats van een tabel te verwijderen en opnieuw toe te voegen.

**Een gedeeltelijke fout wordt geretourneerd als HTTP 200 met een niet-lege `insertErrors[]`.** Dit wordt als
een fout behandeld en genereert een uitzondering, waardoor wordt voorkomen dat de cursor voorbij rijen gaat die
BigQuery nooit heeft geaccepteerd; `tests/unit/log-export-bigquery.test.ts` legt dit gedrag vast.

Het transport verloopt via gewone REST — een zelfondertekende RS256-assertie wordt bij
`https://oauth2.googleapis.com/token` ingewisseld voor een toegangstoken, waarna de rijen naar
`tabledata.insertAll` worden verzonden. Er wordt geen Google SDK toegevoegd. Toegangstokens worden tijdens het
proces gecachet per combinatie van serviceaccount en scope.

De aangemaakte tabel bevat één kolom per veld van het tabblad Logs plus `exported_at`, en is ingericht op de
manier waarop aanroeplogboeken daadwerkelijk worden opgevraagd:

- **Per dag gepartitioneerd op `timestamp`**, zodat een op datum begrensde query alleen die dagen scant.
- **Geclusterd op `api_key_name`, `provider`, `model`, `status`** (in die volgorde), zodat filteren op
  wie de uitvoering startte, waar deze naartoe ging of of deze mislukte, blokken binnen elke partitie uitsluit.
  BigQuery staat maximaal vier clusterkolommen toe en de volgorde is belangrijk: een filter op alleen
  `api_key_name` sluit blokken uit, terwijl een filter op alleen `status` dat niet doet.
- **Optionele bewaartermijn voor partities** via `partitionExpirationDays` (0 bewaart alles), toegepast
  wanneer de tabel wordt aangemaakt.

Beide instellingen worden toegepast op het moment van aanmaken. Een bestaande tabel behoudt de bestaande indeling, dus
laat de bestemming naar een nieuwe tabel-id verwijzen als u deze instellingen wilt gebruiken.

`tests/unit/log-export-bigquery.test.ts` controleert of de mapper en het tabelschema synchroon blijven,
zodat een nieuwe kolom in het aanroeplogboek niet ongemerkt kan wegvallen tijdens de export.

Batches worden opgesplitst op basis van **zowel** het aantal rijen als het aantal geserialiseerde bytes. Alleen het aantal rijen is niet voldoende
wanneer payloads worden geëxporteerd: 500 rijen met prompts kunnen tientallen megabytes groot zijn, en insertAll
weigert een aanvraag van meer dan 10 MB. Chunks worden afgesloten bij 500 rijen of 9 MB, afhankelijk van welke limiet het eerst wordt bereikt.

---

## 5. Een bestemming toevoegen

1. Maak `src/lib/logExport/destinations/<name>.ts` aan die een `LogExportDestinationType` exporteert:
   een Zod-`configSchema`, een `fields`-descriptorarray voor de UI, `secretFields` en een
   `createClient(config)` die `test()` / `prepare()` / `send(records)` retourneert.
2. Voeg deze toe aan de `DESTINATIONS`-array in `src/lib/logExport/registry.ts`.
3. Schrijf tests onder `tests/unit/`.

Dat is de volledige wijziging: persistentie, de cron-taak, de REST-laag, versleuteling van geheimen en het
dashboardformulier lezen allemaal het register.

Twee regels voor een nieuwe bestemming:

- `send()` **moet een fout genereren** bij een gedeeltelijke mislukking. Als de functie succesvol wordt afgehandeld, betekent dit: "de bestemming bevat deze rijen",
  en de cursor wordt er permanent voorbij verplaatst.
- Een bestemming die een door de gebruiker opgegeven URL accepteert, moet deze vóór het ophalen valideren met
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`),
  op dezelfde manier als webhooks. Voor BigQuery is dit niet nodig: de hosts zijn constanten.

---

## 6. Beheer

- **Dashboard**: Integraties → Logboekexport. Voeg een bestemming toe, voer **Testen** uit om de referenties te controleren
  zonder rijen te schrijven en schakel de bestemming vervolgens in.
- **Achterstand**: elke bestemmingskaart toont de wachtende rijen en de cursor; `GET
/api/log-export/status` retourneert dezelfde cijfers, plus de laatste 20 taakuitvoeringen.
- **Een falende bestemming laat de andere niet falen** — het uitvoeringsoverzicht registreert de status per bestemming
  in `last_status` / `last_error`, en de taakuitvoeringsgeschiedenis bewaart het totaaloverzicht.
- **Als een bestemming wordt verwijderd, wordt ook de cursor verwijderd.** Als u de bestemming opnieuw toevoegt, wordt begonnen bij het oudste bewaarde
  oproeplogboek, waardoor rijen die de bestemming mogelijk al bevat opnieuw worden verzonden. In BigQuery voorkomt de `insertId` per rij dit alleen
  binnen het eigen deduplicatievenster van BigQuery. Schakel een bestemming daarom bij voorkeur uit in plaats van deze te verwijderen.
