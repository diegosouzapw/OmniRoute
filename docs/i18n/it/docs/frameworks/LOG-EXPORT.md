# Log export (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/LOG-EXPORT.md) · 🇪🇹 [am](../../../am/docs/frameworks/LOG-EXPORT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/LOG-EXPORT.md) · 🇦🇿 [az](../../../az/docs/frameworks/LOG-EXPORT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/LOG-EXPORT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/LOG-EXPORT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/LOG-EXPORT.md) · 🇩🇰 [da](../../../da/docs/frameworks/LOG-EXPORT.md) · 🇩🇪 [de](../../../de/docs/frameworks/LOG-EXPORT.md) · 🇬🇷 [el](../../../el/docs/frameworks/LOG-EXPORT.md) · 🇪🇸 [es](../../../es/docs/frameworks/LOG-EXPORT.md) · 🇪🇪 [et](../../../et/docs/frameworks/LOG-EXPORT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/LOG-EXPORT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/LOG-EXPORT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/LOG-EXPORT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/LOG-EXPORT.md) · 🇮🇱 [he](../../../he/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/LOG-EXPORT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/LOG-EXPORT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/LOG-EXPORT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/LOG-EXPORT.md) · 🇮🇩 [id](../../../id/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/LOG-EXPORT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/LOG-EXPORT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/LOG-EXPORT.md) · 🇰🇭 [km](../../../km/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/LOG-EXPORT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/LOG-EXPORT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/LOG-EXPORT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/LOG-EXPORT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/LOG-EXPORT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/LOG-EXPORT.md) · 🇲🇲 [my](../../../my/docs/frameworks/LOG-EXPORT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/LOG-EXPORT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/LOG-EXPORT.md) · 🇳🇴 [no](../../../no/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [or](../../../or/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/LOG-EXPORT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/LOG-EXPORT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/LOG-EXPORT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/LOG-EXPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/LOG-EXPORT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/LOG-EXPORT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/LOG-EXPORT.md) · 🇱🇰 [si](../../../si/docs/frameworks/LOG-EXPORT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/LOG-EXPORT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/LOG-EXPORT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/LOG-EXPORT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/LOG-EXPORT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/LOG-EXPORT.md) · 🇮🇳 [te](../../../te/docs/frameworks/LOG-EXPORT.md) · 🇹🇭 [th](../../../th/docs/frameworks/LOG-EXPORT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/LOG-EXPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/LOG-EXPORT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/LOG-EXPORT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/LOG-EXPORT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/LOG-EXPORT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/LOG-EXPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/LOG-EXPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/LOG-EXPORT.md)

---

Esportazione continua e incrementale dei log delle chiamate di OmniRoute verso un archivio di analisi esterno.

La scheda Logs della dashboard conserva la cronologia delle richieste in SQLite (`call_logs`), con limiti imposti da
rotazione e conservazione. L'esportazione dei log invia periodicamente lo stesso insieme di record all'esterno, affinché possa sopravvivere
al database locale ed essere correlato con altri dati. BigQuery è la prima destinazione; la
pipeline usa un registro, quindi è possibile aggiungere altre destinazioni.

---

## 1. Come funziona

```
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (l'insieme di campi della scheda Logs)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
```

- **Pianificazione** — un processo cron `JobRegistry`, `log_export`, con valore predefinito `0 * * * *` (ogni ora,
  UTC). Registrato in `src/lib/initCloudSync.ts`; può essere sovrascritto con `OMNIROUTE_LOG_EXPORT_CRON`.
  A ogni esecuzione vengono svuotate in sequenza tutte le destinazioni **abilitate**.
- **Cursore** — il `call_logs.rowid` implicito di SQLite, persistito per ogni destinazione in
  `log_export_destinations.cursor_row_id`. `timestamp` non viene deliberatamente usato come cursore: i chiamanti
  possono specificare un proprio valore, quindi una richiesta lenta può essere scritta dopo una richiesta più veloce avviata
  successivamente, e un cursore basato sul timestamp la salterebbe.
- **Elaborazione in batch** — `batch_size` righe per richiesta (valore predefinito 500), `max_rows_per_run` righe per esecuzione
  (valore predefinito 10000), in modo che un arretrato consistente venga smaltito nell'arco di diverse esecuzioni anziché bloccarne una.
- **Consegna** — il cursore avanza solo dopo la risoluzione di `send()`. Un batch non riuscito lascia il
  cursore nella posizione precedente, quindi le stesse righe vengono ritentate all'esecuzione successiva. La garanzia è di
  consegna almeno una volta, con deduplicazione sul lato della destinazione, non di consegna esattamente una volta: BigQuery identifica ogni
  riga tramite l'id del log della chiamata, rispettandolo secondo il principio del massimo impegno entro la propria finestra di deduplicazione.
- **Protezione dalle sovrapposizioni** — l'esecuzione cron e `POST .../run` possono attivarsi contemporaneamente. Una destinazione
  già in fase di svuotamento viene saltata anziché essere svuotata due volte (`skipped: true` nel risultato dell'esecuzione),
  così un'esecuzione simultanea non può reinviare un batch né riportare indietro il cursore.
- **Ripristino dopo l'eliminazione** — se `cursor_row_id` risulta superiore a `MAX(rowid)` (l'intera tabella è stata
  eliminata e i rowid sono ripartiti), il runner torna a 0 anziché rimanere definitivamente cieco.

### Payload (prompt e completamenti)

Per impostazione predefinita, l'esportazione include solo i campi di riepilogo mostrati nell'**elenco** della scheda Logs. L'attivazione di
**Esporta prompt e risposte** (`includeBodies`) invia inoltre ciò che il pannello dei **dettagli**
di Logs mostra per ogni chiamata:

| Campo                            | Contenuto                                                                   |
| -------------------------------- | --------------------------------------------------------------------------- |
| `request_body` / `response_body` | I payload delle chiamate così come vengono visualizzati dalla dashboard     |
| `pipeline_route_decision`        | La destinazione e il modello scelti dal router                              |
| `pipeline_client_request`        | La richiesta grezza esattamente come è stata inviata dal client             |
| `pipeline_openai_request`        | Dopo la conversione nel formato OpenAI interno                              |
| `pipeline_provider_request`      | Come effettivamente inviata al servizio upstream, nel dialetto del provider |
| `pipeline_provider_response`     | La risposta upstream grezza                                                 |
| `pipeline_client_response`       | Ciò che è stato restituito al chiamante                                     |
| `pipeline_error`                 | Dettagli dell'errore a livello di pipeline per una chiamata non riuscita    |
| `bodies_truncated`               | Vero quando uno dei campi precedenti ha raggiunto `maxBodyBytes`            |

Si tratta di contenuto dei prompt, quindi è **disattivato per impostazione predefinita** ed è deliberatamente configurabile per ciascuna destinazione.
Viene inviato ciò che mostra la dashboard, perché entrambi leggono tramite `getCallLogById`: i payload vengono
già privati delle PII e i segreti vengono oscurati al momento della scrittura; inoltre, una chiamata effettuata con una
chiave API `noLog` non memorizza alcun payload, quindi non vi è nulla da esportare.

I payload vengono letti riga per riga dall'artefatto nel filesystem, quindi l'idratazione viene eseguita solo per le destinazioni
che l'hanno richiesta. Se l'artefatto di una riga è mancante o danneggiato, viene esportato il relativo riepilogo con payload
null anziché causare il fallimento del batch e bloccare il cursore.

`maxBodyBytes` (valore predefinito 262144) limita ogni campo. I payload più lunghi vengono **troncati anziché
scartati** — un prompt tagliato consente comunque di capire "cosa è stato chiesto" — e la riga viene contrassegnata con
`bodies_truncated`. I delta trasmessi in streaming blocco per blocco non vengono esportati; la risposta assemblata è
già presente in `pipeline_provider_response` e `pipeline_client_response`.

---

## 2. File

| Componente                     | Posizione                                    |
| ------------------------------ | -------------------------------------------- |
| Contratto destinazione         | `src/lib/logExport/types.ts`                 |
| Registro                       | `src/lib/logExport/registry.ts`              |
| Gestione dei segreti           | `src/lib/logExport/secrets.ts`               |
| Esecutore (ciclo del cursore)  | `src/lib/logExport/runner.ts`                |
| Proiezione API                 | `src/lib/logExport/presenter.ts`             |
| Destinazione BigQuery          | `src/lib/logExport/destinations/bigquery.ts` |
| Autenticazione SA Google       | `src/lib/logExport/googleServiceAccount.ts`  |
| Origine dei log delle chiamate | `src/lib/usage/callLogExportSource.ts`       |
| Persistenza                    | `src/lib/db/logExportDestinations.ts`        |
| Processo cron                  | `src/lib/jobs/logExportJob.ts`               |
| Livello REST                   | `src/app/api/log-export/`                    |
| Pagina della dashboard         | `src/app/(dashboard)/dashboard/log-export/`  |

Schema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. API REST

Tutte le route richiedono l'autenticazione di gestione (`requireManagementAuth`). I segreti non vengono mai restituiti:
un segreto memorizzato viene restituito come valore letterale `__stored__` e, se tale valore viene reinviato durante un aggiornamento,
la credenziale memorizzata viene mantenuta.

La creazione o l'aggiornamento di una destinazione il cui tipo dichiara un segreto **richiede
`STORAGE_ENCRYPTION_KEY`**. In sua assenza, `encrypt()` esegue silenziosamente un passthrough, quindi la scrittura viene
rifiutata con un errore 400 anziché memorizzare una credenziale in chiaro in SQLite (la stessa protezione applicata
dal webhook di Telegram).

| Metodo   | Percorso                                 | Scopo                                                                               |
| -------- | ---------------------------------------- | ----------------------------------------------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Tipi di destinazione + elenco dei relativi campi di configurazione                  |
| `GET`    | `/api/log-export/destinations`           | Elenca le destinazioni (segreti oscurati)                                           |
| `POST`   | `/api/log-export/destinations`           | Crea una destinazione                                                               |
| `GET`    | `/api/log-export/destinations/{id}`      | Legge una destinazione                                                              |
| `PUT`    | `/api/log-export/destinations/{id}`      | Aggiorna nome / abilitazione / configurazione / batch                               |
| `DELETE` | `/api/log-export/destinations/{id}`      | Elimina                                                                             |
| `POST`   | `/api/log-export/destinations/{id}/test` | Verifica le credenziali senza scrivere nulla                                        |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Esegue subito lo svuotamento, usando lo stesso percorso dell'esecuzione pianificata |
| `GET`    | `/api/log-export/status`                 | Stato del cron, esecuzioni recenti, arretrato per destinazione                      |

`GET /api/log-export/types` è ciò che rende generica l'interfaccia utente: il modulo della dashboard viene generato
dai descrittori dei campi restituiti, quindi una nuova destinazione non richiede modifiche all'interfaccia utente.

---

## 4. Destinazione BigQuery

Chiavi di configurazione (`type: "bigquery"`):

| Chiave               | Note                                                                             |
| -------------------- | -------------------------------------------------------------------------------- |
| `projectId`          | Progetto GCP che contiene il dataset                                             |
| `datasetId`          | `[A-Za-z0-9_]+`                                                                  |
| `tableId`            | `[A-Za-z0-9_]+`                                                                  |
| `location`           | Usata solo quando è necessario creare il dataset (valore predefinito `EU`)       |
| `serviceAccountJson` | Chiave dell'account di servizio. Segreto: crittografata a riposo, mai restituita |
| `autoCreate`         | Crea il dataset e la tabella alla prima esportazione (valore predefinito `true`) |

L'account di servizio necessita di `bigquery.tables.updateData` sulla tabella di destinazione, oltre a
`bigquery.datasets.create` / `bigquery.tables.create` quando `autoCreate` è attivo.

Un batch configurato è un'unità del **cursore**, non un'unità HTTP: `send()` lo suddivide in chiamate insertAll
da un massimo di 500 righe, quindi un valore `batch_size` elevato non può superare il limite di 10 MB per richiesta
di BigQuery. Gli stati transitori (408/429/500/502/503/504) vengono ritentati fino a tre volte con backoff
esponenziale, riutilizzando gli stessi insertIds; gli errori di autenticazione e di schema generano un'eccezione al primo tentativo,
senza sprecare l'esecuzione.

Una tabella creata pochi istanti prima non è ancora visibile all'endpoint di streaming, che restituisce
404 per alcuni secondi. Tale 404 viene ritentato, ma **solo quando la tabella è stata creata da questa esecuzione** —
una tabella effettivamente mancante continua a causare un errore immediato. Si noti che ricreare una tabella con un nome
eliminato di recente impedisce a BigQuery di accettare inserimenti in streaming per diversi minuti; questa è una
caratteristica dell'eliminazione seguita dalla ricreazione, quindi è preferibile usare un nuovo nome di tabella anziché eliminarne
e aggiungerne nuovamente una.

**Un errore parziale viene restituito come HTTP 200 con un array `insertErrors[]` non vuoto.** Questa condizione viene trattata come
un errore e genera un'eccezione, impedendo così al cursore di avanzare oltre le righe che BigQuery non ha mai
accettato; `tests/unit/log-export-bigquery.test.ts` garantisce questo comportamento.

Il trasporto usa esclusivamente REST: un'asserzione RS256 autofirmata viene scambiata con un token di accesso presso
`https://oauth2.googleapis.com/token`, dopodiché le righe vengono inviate a `tabledata.insertAll`. Non viene inclusa
alcuna SDK di Google. I token di accesso vengono memorizzati nella cache del processo per ciascuna coppia (account di servizio, ambito).

La tabella creata contiene una colonna per ogni campo della scheda Logs, oltre a `exported_at`, ed è strutturata
in base al modo in cui vengono effettivamente interrogati i log delle chiamate:

- **Partizionamento giornaliero su `timestamp`**, affinché una query delimitata per data scansioni solo quei giorni.
- **Clustering per `api_key_name`, `provider`, `model`, `status`** (in quest'ordine), affinché i filtri relativi a
  chi ha eseguito la chiamata, dove è stata indirizzata o se ha avuto esito negativo escludano blocchi all'interno di ciascuna partizione. BigQuery
  consente al massimo quattro colonne di clustering e l'ordine è importante: un filtro solo su `api_key_name`
  consente l'esclusione, mentre un filtro solo su `status` no.
- **Conservazione facoltativa delle partizioni** tramite `partitionExpirationDays` (0 conserva tutto), applicata
  al momento della creazione della tabella.

Entrambe le impostazioni vengono applicate al momento della creazione. Una tabella esistente mantiene il layout che possiede già, quindi
indica come destinazione un nuovo ID tabella se vuoi adottarle.

`tests/unit/log-export-bigquery.test.ts` verifica che il mapper e lo schema della tabella rimangano
sincronizzati, in modo che una nuova colonna del log delle chiamate non possa essere omessa silenziosamente durante l'esportazione.

I batch vengono suddivisi sia in base al numero di righe sia in base ai byte serializzati. Il solo numero di righe non è sufficiente
quando vengono esportati i payload: 500 righe contenenti prompt possono occupare decine di megabyte e insertAll
rifiuta una richiesta superiore a 10 MB. I chunk vengono chiusi al raggiungimento di 500 righe o 9 MB, a seconda di quale limite venga raggiunto per primo.

---

## 5. Aggiunta di una destinazione

1. Creare `src/lib/logExport/destinations/<name>.ts` esportando un `LogExportDestinationType`:
   uno `configSchema` Zod, un array di descrittori `fields` per l'interfaccia utente, `secretFields` e un
   `createClient(config)` che restituisca `test()` / `prepare()` / `send(records)`.
2. Aggiungerlo all'array `DESTINATIONS` in `src/lib/logExport/registry.ts`.
3. Scrivere i test in `tests/unit/`.

Questa è l'intera modifica: la persistenza, il processo cron, il livello REST, la crittografia dei segreti e il
modulo della dashboard leggono tutti il registro.

Due regole per una nuova destinazione:

- `send()` **deve generare un'eccezione** in caso di errore parziale. La risoluzione indica che «la destinazione contiene queste righe»
  e il cursore le supera definitivamente.
- Una destinazione che accetta un URL fornito dall'utente deve convalidarlo tramite
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) prima di eseguire il recupero,
  come avviene per i webhook. BigQuery non ne ha bisogno: i suoi host sono costanti.

---

## 6. Gestione

- **Dashboard**: Integrazioni → Esportazione dei log. Aggiungere una destinazione, eseguire **Test** per verificare le credenziali
  senza scrivere righe, quindi abilitarla.
- **Backlog**: ogni scheda di destinazione mostra le righe in sospeso e il cursore; `GET
/api/log-export/status` restituisce gli stessi dati insieme alle ultime 20 esecuzioni del processo.
- **Una destinazione in errore non causa l'errore delle altre** — il riepilogo dell'esecuzione registra lo stato di ciascuna destinazione
  in `last_status` / `last_error`, mentre la cronologia delle esecuzioni del processo conserva il risultato aggregato.
- **L'eliminazione di una destinazione elimina il relativo cursore.** Se viene aggiunta nuovamente, riparte dal log delle chiamate meno recente ancora conservato,
  reinviando righe che la destinazione potrebbe già contenere. In BigQuery, l'`insertId` di ogni riga gestisce questa situazione solo entro la finestra
  di deduplicazione di BigQuery, quindi è preferibile disabilitare una destinazione anziché eliminarla.
