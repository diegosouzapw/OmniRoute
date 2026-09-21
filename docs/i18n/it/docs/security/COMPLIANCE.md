# Compliance & Audit (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Fonte autorevole:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Ultimo aggiornamento:** 2026-06-28 — v3.8.40

OmniRoute registra le azioni amministrative, gli eventi di autenticazione, le modifiche al ciclo di vita delle credenziali dei provider e le invocazioni degli strumenti MCP in tabelle di audit basate su SQLite. Questa pagina descrive cosa viene registrato, dove risiedono i dati, per quanto tempo vengono conservati, come le chiavi API possono disattivare la registrazione e come interrogare i dati.

L'implementazione si trova in `src/lib/compliance/index.ts` (T-43 — "Controlli di conformità") e `src/lib/compliance/providerAudit.ts`. Le scritture di audit non generano mai eccezioni: in caso di errore, la chiamata viene ignorata silenziosamente, in modo che la registrazione di audit non possa interrompere il flusso della richiesta principale.

## Cosa viene registrato

### Eventi di audit amministrativi (`audit_log`)

Ogni chiamata a `logAuditEvent({ action, actor, target, details, ... })` produce una riga. Le stringhe delle azioni seguono uno schema `domain.verb` (o `domain.verb.outcome`). I tipi di azione confermati nel codice sorgente includono:

| Azione                               | Origine                                 |
| ------------------------------------ | --------------------------------------- |
| `auth.login.success`                 | `src/app/api/auth/login/route.ts`       |
| `auth.login.failed`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.locked`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.error`                   | `src/app/api/auth/login/route.ts`       |
| `auth.login.misconfigured`           | `src/app/api/auth/login/route.ts`       |
| `auth.login.setup_required`          | `src/app/api/auth/login/route.ts`       |
| `auth.logout.success`                | `src/app/api/auth/logout/route.ts`      |
| `provider.credentials.created`       | `src/app/api/providers/route.ts`        |
| `provider.credentials.updated`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.revoked`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.batch_revoked` | `src/app/api/providers/route.ts`        |
| `sync.token.created`                 | `src/app/api/sync/tokens/route.ts`      |
| `sync.token.revoked`                 | `src/app/api/sync/tokens/[id]/route.ts` |
| `compliance.cleanup`                 | `src/lib/compliance/index.ts`           |

Ogni voce acquisisce `action`, `actor` (il valore predefinito è `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` e `timestamp`. Le chiavi sensibili (`apiKey`, `accessToken`, `refreshToken`, `password`, qualsiasi elemento corrispondente a `*token`/`*secret`/`*apikey`, ecc.) vengono oscurate ricorsivamente con `"[redacted]"` prima della scrittura della riga.

### Chiamate agli strumenti MCP (`mcp_tool_audit`)

Ogni invocazione di uno strumento MCP scrive una riga tramite `open-sse/mcp-server/audit.ts`. Schema (da `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Colonna          | Note                                           |
| ---------------- | ---------------------------------------------- |
| `id`             | incremento automatico                          |
| `tool_name`      | identificatore dello strumento MCP             |
| `input_hash`     | sha256 dell'input (nessun payload memorizzato) |
| `output_summary` | breve riepilogo troncato                       |
| `duration_ms`    | tempo trascorso                                |
| `api_key_id`     | chiamante (può essere null)                    |
| `success`        | `1` / `0`                                      |
| `error_code`     | codice di errore finale in caso di errore      |
| `created_at`     | timestamp ISO                                  |

### Log delle richieste e dell'utilizzo

Si tratta di telemetria operativa (non propriamente di audit amministrativo), ma condivide la stessa pipeline di conservazione:

- `usage_history` — riepilogo dell'utilizzo per richiesta
- `call_logs` — log completo per richiesta (soggetto al limite di righe, vedere sotto)
- `proxy_logs` — log del traffico proxy (soggetto al limite di righe)
- `request_detail_logs` — log dettagliato delle richieste legacy (viene comunque eliminato in base ai criteri di conservazione, se presente)

## Schema di archiviazione

`audit_log` viene creato in modo differito da `ensureAuditLogSchema()` al primo utilizzo:

```sql
CREATE TABLE IF NOT EXISTS audit_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp     TEXT NOT NULL DEFAULT (datetime('now')),
  action        TEXT NOT NULL,
  actor         TEXT NOT NULL DEFAULT 'system',
  target        TEXT,
  details       TEXT,
  ip_address    TEXT,
  resource_type TEXT,
  status        TEXT,
  request_id    TEXT,
  metadata      TEXT
);
```

Vengono creati indici su `timestamp`, `action`, `actor`, `resource_type`,
`status` e `request_id`. Le colonne mancanti nei DB legacy vengono aggiunte tramite
`ALTER TABLE` quando necessario.

## Conservazione e pulizia

Vengono rispettati due intervalli di conservazione distinti:

| Variabile di ambiente       | Predefinito | Si applica a                                                      |
| --------------------------- | ----------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`         | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`         | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`    | Riduzione al limite di righe per `call_logs`                      |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`    | Riduzione al limite di righe per `proxy_logs`                     |

`cleanupExpiredLogs()` esegue la procedura di conservazione. Viene invocato all'avvio del server
da `src/instrumentation-node.ts`. Ogni esecuzione registra un evento di audit
`compliance.cleanup` con il numero di eliminazioni per ciascuna tabella. La riduzione dei log di proxy/chiamate
viene eseguita in batch (`BATCH_SIZE = 5000`) per evitare lunghi lock di scrittura.

La pulizia manuale della cronologia delle richieste è separata dalla conservazione. La pagina Request Logs
chiama `POST /api/settings/purge-request-history`, che elimina `call_logs`,
la tabella legacy `request_detail_logs` e gli artefatti locali delle richieste in
`${DATA_DIR}/call_logs/`.

I valori predefiniti sono definiti in `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Esclusione `noLog` (per chiave API)

Le chiavi API possono essere contrassegnate in modo che il traffico delle chiamate a valle non venga registrato. Il
flag risiede nella tabella `api_keys` (`no_log INTEGER DEFAULT 0`) e viene replicato
in un set in memoria per le ricerche nel percorso critico.

```bash
# Crea una chiave senza registrazione (autenticazione di gestione richiesta)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Funzioni di supporto (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — abilita o disabilita la voce in memoria
- `isNoLog(apiKeyId)` — controllato nel percorso della richiesta; in alternativa esegue una lettura
  da `api_keys.no_log` con cache di 30 s
- `NO_LOG_API_KEY_IDS` (variabile di ambiente, separata da virgole) — precaricata nel set in memoria
  all'avvio; utile quando non è possibile modificare direttamente la colonna

Gli eventi di audit amministrativi (accesso, modifiche ai provider, chiamate agli strumenti MCP, ecc.)
**non** sono interessati da `noLog`: l'esclusione riguarda solo la registrazione del traffico
per richiesta.

## API REST

| Endpoint                    | Metodo | Descrizione                                      | Autorizzazione |
| --------------------------- | ------ | ------------------------------------------------ | -------------- |
| `/api/compliance/audit-log` | `GET`  | Voci di audit amministrative paginate con filtri | management     |
| `/api/mcp/audit`            | `GET`  | Voci di audit paginate degli strumenti MCP       | (open-sse)     |
| `/api/mcp/audit/stats`      | `GET`  | Statistiche aggregate dell'audit MCP             | (open-sse)     |

Attualmente non viene fornito alcun endpoint per l'esportazione CSV: esporta dalla dashboard oppure interroga
direttamente il database SQLite.

### Interrogazione di `/api/compliance/audit-log`

Parametri di query supportati (tutti facoltativi; per i filtri di testo viene
usata la corrispondenza `LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (o `resource_type`),
  `status`, `requestId` (o `request_id`)
- `from` / `since`, `to` / `until` — timestamp ISO
- `limit` (valore predefinito `50`, minimo `1`, massimo `500`)
- `offset` (valore predefinito `0`, massimo `10_000`)

La risposta è un array JSON. I metadati di paginazione vengono restituiti nelle intestazioni:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Dashboard

La dashboard espone i dati di audit all'indirizzo **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). La pagina presenta due schede:

- **Conformità** (`ComplianceTab.tsx`) — eventi di audit amministrativi provenienti da
  `/api/compliance/audit-log`. Filtri per tipo di evento, gravità (informativa / avviso
  / critica, derivata da azione + stato) e intervallo di date. La gravità viene
  calcolata lato client a partire dalle stringhe di azione/stato.
- **MCP** (`McpAuditTab.tsx`) — audit degli strumenti MCP proveniente da `/api/mcp/audit`, con
  filtri per nome dello strumento ed esito positivo/negativo.

Entrambe le schede utilizzano la paginazione con dimensioni di pagina pari a `50` (conformità) e `25` (MCP).

## Funzioni di supporto per le credenziali dei provider

`src/lib/compliance/providerAudit.ts` fornisce funzioni di supporto per la formattazione utilizzate dalle
route di gestione dei provider quando generano eventi relativi alle credenziali:

- `summarizeProviderConnectionForAudit(connection)` — rimuove `apiKey`,
  `accessToken`, `refreshToken`, `idToken` e
  `providerSpecificData.consoleApiKey` prima che l'istantanea della connessione venga
  scritta in `details`.
- `getProviderAuditTarget(connection)` — compone una stringa stabile
  `"<provider>:<name|id>"` per il campo `target`.
- `extractProviderWarnings(...payloads)` — analizza le risposte dei provider alla ricerca di
  avvisi relativi a criteri/sicurezza (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) e
  restituisce fino a 5 corrispondenze, ciascuna troncata a 400 caratteri.

## Procedure consigliate

- Contrassegna le chiavi API che gestiscono dati personali identificabili (legali, medici ecc.) con `noLog: true`.
- Configura `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` in base ai requisiti
  dei criteri di conservazione. I valori predefiniti di 7 giorni sono prudenziali.
- Esporta la tabella di audit al di fuori della piattaforma (`sqlite3 dump`) con la frequenza
  richiesta dal programma di conformità: non esiste alcuna funzionalità di archiviazione integrata.
- Monitora i conteggi di `auth.login.failed` e `auth.login.locked` per rilevare
  attacchi di forza bruta.
- Quando aggiungi nuovi endpoint amministrativi, chiama `logAuditEvent({ ... })` con una stringa di azione
  `domain.verb.outcome` stabile e passa il contesto della richiesta tramite
  `getAuditRequestContext(request)`, affinché l'indirizzo IP e `requestId` vengano acquisiti
  automaticamente.

## Vedi anche

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — Mascheramento dei dati personali (PII), prompt injection
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — Catalogo degli strumenti MCP e ambiti
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — Riferimento completo delle variabili di ambiente
- Codice sorgente: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
