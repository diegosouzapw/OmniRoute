---
title: "Log Export"
version: 3.8.52
lastUpdated: 2026-10-13
---

# Log export

Continuous, incremental export of OmniRoute call logs to an external analytics store.

The Logs dashboard tab keeps request history in SQLite (`call_logs`), which is bounded by
rotation and retention. Log export ships the same record set out on a schedule so it can outlive
the local database and be joined against other data. BigQuery is the first destination; the
pipeline is a registry, so more destinations are additive.

---

## 1. How it works

```
server (decrypt + validate config, reconcile cursor)
  → start IPC → isolated exportChild OS process
    → read-only storage.sqlite → shared call-log query/mapping
      → async artifact hydration → destination prepare()/send()
        → batch IPC → server persists cursor → ack IPC
          → next batch; done IPC → server records success
```

- **Schedule** — one `JobRegistry` cron job, `log_export`, defaulting to `0 * * * *` (hourly,
  UTC). Registered in `src/lib/initCloudSync.ts`; overridable with `OMNIROUTE_LOG_EXPORT_CRON`.
  Each tick drains every **enabled** destination, sequentially.
- **Cursor** — SQLite's implicit `call_logs.rowid`, persisted per destination in
  `log_export_destinations.cursor_row_id`. `timestamp` is deliberately not the cursor: callers
  may supply their own value, so a slow request can be written after a faster one that started
  later, and a timestamp cursor would skip it.
- **Batching** — `batch_size` rows per request (default 500), `max_rows_per_run` rows per run
  (default 10000) so a large backlog drains over several ticks instead of blocking one.
- **Delivery** — the cursor advances only after `send()` resolves. A failed batch leaves the
  cursor where it was, so the same rows are retried on the next run. The guarantee is
  at-least-once plus destination-side de-duplication, not true exactly-once: BigQuery keys each
  row by the call-log id, which it honours on a best-effort basis within its own dedup window.
- **Overlap guard** — the cron tick and `POST .../run` can fire together. A destination
  already draining is skipped rather than drained twice (`skipped: true` in the run result),
  so a concurrent run cannot re-send a batch or write the cursor backwards.
- **Purge recovery** — if `cursor_row_id` ends up above `MAX(rowid)` (the whole table was
  purged and rowids restarted), the runner rewinds to 0 rather than going permanently blind.

### Isolated runner and limits

Every destination run on Node starts a separate, short-lived OS child process (`child_process`
with IPC, not `worker_threads`). Body reads, payload JSON parsing/serialization, destination
`prepare()` and destination network I/O all run there, not on the server's event loop.
Only configuration and small progress messages cross IPC; exported records never return to
the server. The cron job and Run now route keep the same public result and overlap guard.

The child opens the server's resolved `DATA_DIR/storage.sqlite` read-only using `node:sqlite`,
with `busy_timeout=5000` and `query_only=ON`. It imports no DB singleton and performs no
migrations, backups or SQLite updates. Missing/corrupt artifact bookkeeping (including the
corrupt-artifact UPDATE) remains in the dashboard detail path only. Both paths share a pure
detail resolver; export uses asynchronous filesystem reads and the same artifact → legacy
inline → legacy disk → none resolution order. A run snapshots the maximum insertion rowid
when the child opens its reader; later inserts wait for the next run. This is an insertion
boundary, not a long-lived SQLite transaction: WAL writers and checkpoints remain free during
network waits. Updates/deletions of existing rows are not frozen by this boundary.

After each accepted batch, the child waits for an acknowledgement. The server first persists
the cursor with `advanceLogExportCursor`, then sends `ack`; no next batch starts before it.
A send failure, crash or timeout records failure without advancing that batch. Previously
acknowledged batches stay committed; at most the one unacknowledged batch can be re-sent.
Success is recorded only after `done` and a clean child exit. Failures terminate the child
with SIGTERM, escalating to SIGKILL after 500 ms, and the runner waits for process closure.

| Environment variable                          | Default | Purpose                          |
| --------------------------------------------- | ------- | -------------------------------- |
| `OMNIROUTE_LOG_EXPORT_RUN_TIMEOUT_MS`         | 900000  | Per-destination wall-clock limit |
| `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB` | 1024    | Child V8 old-space limit in MB   |

Invalid/non-positive/non-integer values use the defaults. The heap setting is not a total
RSS limit; very large batches can still exhaust child memory and fail the run safely.
The 1024 MB default leaves headroom for the default 500-row batch of 512 KiB artifacts with
bodies enabled, including BigQuery's byte-chunked JSON serialization. It does not make a
10000-row bodies batch safe. V8 heap exhaustion records an actionable failure: lower batch
size or raise `OMNIROUTE_LOG_EXPORT_CHILD_MAX_OLD_SPACE_MB`; the cursor stays at the last
acknowledged batch. Historical inline/disk bodies are not covered by the modern artifact cap.
Operators must budget RSS separately, especially inside memory-limited containers.

The child inherits only the resolved `DATA_DIR`, `NODE_ENV`, explicit `TZ` (legacy filename
local-time resolution), `ELECTRON_RUN_AS_NODE` when present, and the following outbound inputs:
`HTTP_PROXY`, `HTTPS_PROXY`, `ALL_PROXY`, `NO_PROXY` (and their lowercase forms),
`OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `SSL_CERT_DIR`.
A global Undici dispatcher shares the server's pure environment-proxy resolution and local-host
bypass rules, including `NO_PROXY`; it does not import `proxyFetch.ts` or its DB/feature flags.
Proxy credentials are redacted from forwarded output and recorded errors. Destination credentials
travel only in one start IPC message, never argv or environment; output/error forwarding is
prefixed and sanitized. Only `ExperimentalWarning` is disabled in child exec arguments to avoid
repeating Node's SQLite warning each cron run; other warning types remain visible.

Destination modules must be importable without Next.js/server-only dependencies. The existing
BigQuery implementation already meets that contract. Access-token caches last only for the child
run, not across runs. Node is the supported runtime (`package.json` engines), but README's Bun
installation section and `Dockerfile.bun` also advertise a production compatibility path using
`bun:sqlite` (`src/lib/db/core.ts` / adapters). Under Bun, exports therefore retain the previous
in-process path and emit a one-time warning: child heap/timeout isolation is unavailable. Use
Node for event-loop and OOM isolation; Bun is not treated as dev-only here.

When `includeBodies` is enabled, prefer a minute-level cadence such as
`OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` rather than accumulating an hourly payload backlog.
Batch and row limits still bound each run. Process startup is paid per destination per run;
this trades a small startup cost for server event-loop isolation, not reduced total CPU use.

### Payloads (prompts and completions)

By default the export carries only the summary fields the Logs **list** shows. Turning on
**Export prompts and responses** (`includeBodies`) additionally ships what the Logs **detail**
pane shows for each call:

| Field                            | What it holds                                      |
| -------------------------------- | -------------------------------------------------- |
| `request_body` / `response_body` | The call payloads as the dashboard renders them    |
| `pipeline_route_decision`        | Which target and model the router picked           |
| `pipeline_client_request`        | The raw request exactly as the client sent it      |
| `pipeline_openai_request`        | After translation into the internal OpenAI shape   |
| `pipeline_provider_request`      | As actually sent upstream, in the provider dialect |
| `pipeline_provider_response`     | The raw upstream response                          |
| `pipeline_client_response`       | What was handed back to the caller                 |
| `pipeline_error`                 | Pipeline-level error detail for a failed call      |
| `bodies_truncated`               | True when any field above hit `maxBodyBytes`       |

This is prompt content, so it is **off by default** and deliberately a per-destination choice.
What ships is what the dashboard shows, because export and `getCallLogById` share detail
resolution: payloads are
already PII-sanitised and secret-redacted when they are written, and a call made with a
`noLog` API key stores no payload at all, so there is nothing to export.

Payloads are read per row from the filesystem artifact, so hydration only runs for destinations
that asked for it. A row whose artifact is missing or corrupt exports its summary with null
payloads rather than failing the batch and stranding the cursor.

`maxBodyBytes` (default 262144) caps each field. Longer payloads are **truncated rather than
dropped** — a clipped prompt still answers "what was asked" — and the row is flagged with
`bodies_truncated`. Streamed chunk-by-chunk deltas are not exported; the assembled response is
already in `pipeline_provider_response` and `pipeline_client_response`.

---

## 2. Files

| Piece                | Location                                     |
| -------------------- | -------------------------------------------- |
| Destination contract | `src/lib/logExport/types.ts`                 |
| Registry             | `src/lib/logExport/registry.ts`              |
| Secret handling      | `src/lib/logExport/secrets.ts`               |
| Runner (parent IPC)  | `src/lib/logExport/runner.ts`                |
| Process lifecycle    | `src/lib/logExport/childRunner.ts`           |
| Child entry          | `src/lib/logExport/exportChild.ts`           |
| Read-only opener     | `src/lib/db/logExportReadOnly.ts`            |
| Shared query/mapping | `src/lib/usage/callLogExportQueries.ts`      |
| Detail resolver      | `src/lib/usage/callLogDetailResolver.ts`     |
| API projection       | `src/lib/logExport/presenter.ts`             |
| BigQuery destination | `src/lib/logExport/destinations/bigquery.ts` |
| Google SA auth       | `src/lib/logExport/googleServiceAccount.ts`  |
| Call-log source      | `src/lib/usage/callLogExportSource.ts`       |
| Persistence          | `src/lib/db/logExportDestinations.ts`        |
| Cron job             | `src/lib/jobs/logExportJob.ts`               |
| REST layer           | `src/app/api/log-export/`                    |
| Dashboard page       | `src/app/(dashboard)/dashboard/log-export/`  |

Schema: `src/lib/db/migrations/170_log_export_destinations.sql`.

---

## 3. REST API

All routes are management-authenticated (`requireManagementAuth`). Secrets are never returned:
a stored secret comes back as the literal `__stored__`, and sending that value back on an update
keeps the stored credential.

Creating or updating a destination whose type declares a secret **requires
`STORAGE_ENCRYPTION_KEY`**. Without it `encrypt()` is a silent passthrough, so the write is
refused with a 400 rather than putting a credential into SQLite in plaintext (the same guard the
Telegram webhook applies).

| Method   | Path                                     | Purpose                                     |
| -------- | ---------------------------------------- | ------------------------------------------- |
| `GET`    | `/api/log-export/types`                  | Destination types + their config field list |
| `GET`    | `/api/log-export/destinations`           | List destinations (secrets redacted)        |
| `POST`   | `/api/log-export/destinations`           | Create a destination                        |
| `GET`    | `/api/log-export/destinations/{id}`      | Read one                                    |
| `PUT`    | `/api/log-export/destinations/{id}`      | Update name / enabled / config / batching   |
| `DELETE` | `/api/log-export/destinations/{id}`      | Delete                                      |
| `POST`   | `/api/log-export/destinations/{id}/test` | Probe credentials, write nothing            |
| `POST`   | `/api/log-export/destinations/{id}/run`  | Drain now, same path as the scheduled run   |
| `GET`    | `/api/log-export/status`                 | Cron state, recent runs, backlog per target |

`GET /api/log-export/types` is what makes the UI generic: the dashboard form is rendered from
the returned field descriptors, so a new destination needs no UI change.

---

## 4. BigQuery destination

Config keys (`type: "bigquery"`):

| Key                  | Notes                                                             |
| -------------------- | ----------------------------------------------------------------- |
| `projectId`          | GCP project holding the dataset                                   |
| `datasetId`          | `[A-Za-z0-9_]+`                                                   |
| `tableId`            | `[A-Za-z0-9_]+`                                                   |
| `location`           | Only used when the dataset has to be created (default `EU`)       |
| `serviceAccountJson` | Service-account key. Secret: encrypted at rest, never returned    |
| `autoCreate`         | Create the dataset and table on the first export (default `true`) |

The service account needs `bigquery.tables.updateData` on the target table, plus
`bigquery.datasets.create` / `bigquery.tables.create` when `autoCreate` is on.

A configured batch is a **cursor** unit, not an HTTP one: `send()` chunks it into insertAll
calls of at most 500 rows, so a large `batch_size` cannot trip BigQuery's 10 MB request cap.
Transient statuses (408/429/500/502/503/504) are retried up to three times with exponential
backoff, reusing the same insertIds; auth and schema failures throw on the first attempt rather
than burning the run.

A table created moments ago is not yet visible to the streaming endpoint, which answers
404 for a few seconds. That 404 is retried, but **only when this run created the table** —
a genuinely missing table still fails fast. Note that re-creating a table under a name that
was recently deleted makes BigQuery refuse streaming inserts for several minutes; that is a
property of delete-then-recreate, so prefer a new table name over dropping and re-adding one.

**A partial failure arrives as HTTP 200 with a non-empty `insertErrors[]`.** That is treated as
a failure and throws, which is what stops the cursor from advancing past rows BigQuery never
accepted; `tests/unit/log-export-bigquery.test.ts` pins the behaviour.

Transport is plain REST — a self-signed RS256 assertion is exchanged for an access token at
`https://oauth2.googleapis.com/token`, then rows go to `tabledata.insertAll`. No Google SDK is
pulled in. Access tokens are cached in-process per (service account, scope).

The created table carries one column per Logs-tab field plus `exported_at`, and is laid out for
how call logs are actually queried:

- **Day-partitioned on `timestamp`**, so a query bounded by date only scans those days.
- **Clustered by `api_key_name`, `provider`, `model`, `status`** (in that order), so filtering by
  who ran it, where it went, or whether it failed prunes blocks inside each partition. BigQuery
  allows at most four clustering columns and the order matters: a filter on `api_key_name` alone
  prunes, a filter on `status` alone does not.
- **Optional partition retention** via `partitionExpirationDays` (0 keeps everything), applied
  when the table is created.

Both settings apply at creation time. An existing table keeps whatever layout it already has, so
point the destination at a new table id if you want to adopt them.

`tests/unit/log-export-bigquery.test.ts` asserts the mapper and the table schema stay in
lockstep, so a new call-log column cannot be silently dropped on the way out.

Batches are chunked by **both** row count and serialised bytes. Row count alone is not enough
once payloads are exported: 500 rows carrying prompts can be tens of megabytes, and insertAll
rejects a request over 10 MB. Chunks close at 500 rows or 9 MB, whichever comes first.

---

## 5. OTLP/HTTP traces destination

Config uses `type: "otlp-http"`. This is a scheduled, cursor-backed export of persisted
call logs, not the best-effort live routing-event sink in
`open-sse/services/routing/otel.ts`. It does not read or change that sink's environment
variables, timers or buffers. Enabling both can produce two independent kinds of spans;
use the `omniroute.log-export` instrumentation scope to distinguish these call-log spans.

| Key               | Default / purpose                                                    |
| ----------------- | -------------------------------------------------------------------- |
| `endpoint`        | Required full HTTP(S) traces URL; no `/v1/traces` suffix is appended |
| `headers`         | Optional `Name: value` lines or JSON object of strings; encrypted    |
| `serviceName`     | `omniroute`; resource `service.name`                                 |
| `langfuseMapping` | `false`; adds Langfuse generation/session/user attributes            |
| `identity`        | `pseudonymous`, `keyName`, or `none`                                 |
| `paths`           | `/v1/chat/completions`, `/v1/responses`, `/v1/messages`              |
| `timeoutMs`       | `30000` per HTTP attempt                                             |
| `environment`     | Unset; optional `langfuse.environment`                               |

The generic dashboard renders these fields. `paths` accepts an API array or a textarea
with exact paths separated by newlines/commas. Embeddings, rerank and other paths are
skipped unless explicitly allowed. Skipped rows still advance the cursor; the existing
runner's `exported`/`exportedTotal` counters count processed source rows, including filtered
rows, rather than accepted spans. Filtering is done in the child, without changing its
IPC/cursor contract.

URL validation uses the DB-free `parseAndValidateNonMetadataUrl` helper from
`src/shared/network/outboundUrlGuard.ts`: the `block-metadata` policy. It has the same
unconditional metadata/protocol/embedded-credential checks as the webhook validator with
private URLs opted in, but deliberately permits localhost/LAN targets without a global
feature-flag override. This allows self-hosted Langfuse, Phoenix, Tempo and Collector
endpoints, including private HTTP endpoints. Cloud-metadata hosts are always blocked.
Redirects are not followed, so a collector cannot redirect credentials to a different host.
Like the existing lexical URL guard, this does not pin DNS resolution; only configure
operator-controlled hosts. Prefer HTTPS whenever the endpoint is not on a trusted network.

### Payload and delivery

OTLP/HTTP JSON (`ExportTraceServiceRequest`, `Content-Type: application/json`) carries one
CLIENT span per allowed row, named by its exact request path. Path naming distinguishes
Chat Completions, Responses and Messages without embedding model or identity data in the
span name. Resource attributes include `service.name` and the package's `service.version`.

The normal chat attempt logger (`open-sse/handlers/chatCore/attemptLogging.ts`) writes
`duration = Date.now() - startTime` at completion and does not supply a timestamp;
`saveCallLogOperation` in `src/lib/usage/callLogs.ts` defaults the timestamp to the write
(completion) time. Export therefore sets end = row timestamp and start = end − duration
(milliseconds, converted to decimal nanoseconds). Caller-supplied historical timestamps
are preserved as the end time as well; there is no per-row start/completion discriminator.
A null duration becomes zero. Invalid/missing timestamps fail the batch rather than create
non-deterministic spans. `ttftMs` is nullable and maps to `omniroute.ttft_ms`.

Attributes include `gen_ai.operation.name="chat"`, provider, requested/response model,
input/output tokens, optional cache-read/cache-creation/reasoning tokens, HTTP status,
combo, cache source, session tag and correlation id. Integer OTLP values and timestamps
are decimal strings; strings, booleans and fractional numbers use their native OTLP value
variants. Error spans have ERROR status and a sanitized status message. The canonical
record has no upstream host URL, so `server.address` is omitted rather than incorrectly
identifying the collector as the model server. Cost is not exported.

Only `includeBodies=true` hydrates content. With `langfuseMapping=false`,
`gen_ai.input.messages` / `gen_ai.output.messages` carry the sanitized request/response
body JSON as stored by OmniRoute (canonicalized when parseable), not a re-shaped semconv
messages array. Clipped/non-JSON bodies remain raw text. With `langfuseMapping=true`,
bodies are emitted only as `langfuse.observation.input` / `langfuse.observation.output`;
the `gen_ai.*.messages` attributes are omitted so each body is sent once. Both modes
inherit `maxBodyBytes` from the existing hydration path;
`omniroute.bodies_truncated=true` marks clipping.
No extra pipeline snapshots or unsanitized artifact reads are added by this destination.
Use a minute-level cadence such as `OMNIROUTE_LOG_EXPORT_CRON="*/5 * * * *"` when exporting
bodies, rather than accumulating an hourly backlog.

Requests are bounded to 500 spans and 4 MiB of UTF-8 JSON, including the envelope.
Every allowed span is size-checked before the first request of a cursor batch. An individual
span larger than the limit sends no part of that batch and fails with guidance to lower
`maxBodyBytes`; it is not silently dropped. Preflight retains only record references and
byte counts, discarding each temporary span/JSON; spans are rebuilt for bounded chunks
rather than holding a second serialized copy of the batch. HTTP 408/429/5xx, network failures and timeouts get at most
three attempts, with 250/500 ms exponential backoff. `Retry-After` seconds or HTTP dates
can extend a delay up to 5 seconds. Other statuses fail immediately. OTLP 2xx partial rejection also throws instead of
acknowledging a lost span; empty or valid JSON acknowledgements are accepted, with a
64 KiB response-read cap.

Errors contain only exporter-owned facts: HTTP status, retry class, attempts and sent span
counts, or fixed acknowledgement/network failure wording. Collector response bodies,
partial-success counts and response headers are never copied into errors, logs or the
dashboard. A failed or partially accepted batch is not acknowledged: the destination shows
Failing with that status, the cursor stays at the last acknowledged batch, and the next run
resends the same rows. Permanent statuses keep failing until the collector or configuration
is fixed. Use the collector's own logs for response details. Call-log error summaries retain
their separate redaction.
`prepare()` provisions nothing; Test posts exactly `{"resourceSpans":[]}` and reports
HTTP status without writing call-log spans.

Trace ids and span ids are the first 32/16 hex digits of SHA-256 over
`"omniroute.trace\\0" + callLogId` and `"omniroute.span\\0" + callLogId`. Re-sends carry
identical ids. This is not a deduplication guarantee: some backends, including Langfuse
v4 ingestion, do not deduplicate same-id spans. A crash or partial chunk failure can
re-send at most the one unacknowledged cursor batch; that entire batch may be duplicated,
not just its last HTTP chunk. Choose the cursor batch size with that tradeoff in mind.

### Langfuse example

Configure these fields for a self-hosted Langfuse instance:

```json
{
  "endpoint": "https://langfuse.example.com/api/public/otel/v1/traces",
  "headers": "Authorization: Basic <base64-of-public-key:secret-key>",
  "serviceName": "omniroute",
  "langfuseMapping": true,
  "identity": "pseudonymous",
  "environment": "production"
}
```

Build the Authorization value locally as Base64 of the literal `public-key:secret-key`
string (for example with `Buffer.from(publicKey + ":" + secretKey).toString("base64")`).
Do not paste real credentials into logs, screenshots or issues. The mapping automatically
sets `x-langfuse-ingestion-version: 4`; Authorization is still supplied in `headers`.
Both headers and the generated identity salt use the existing encrypted secret-field
mechanism and API placeholders; `STORAGE_ENCRYPTION_KEY` is required.

Mapping adds generation type/model, JSON usage details (input/output/total and available
cache keys), JSON input/output snapshots, ERROR/DEFAULT level, sanitized status message,
trace name, session id, optional environment and filterable
`langfuse.observation.metadata.<key>` for provider, requested model, path, combo, cache
source and status. `langfuse.observation.completion_start_time` is ISO 8601 at
start + TTFT only when TTFT is known and within the duration. No cost attributes are sent.

Identity modes apply to `langfuse.user.id`:

- `pseudonymous` (default): HMAC-SHA256 of the API key's internal id with a random
  per-destination 32-byte salt. The salt is generated on creation if absent, encrypted
  as `identitySalt`, never returned, and retained during edits. Raw key ids are never
  put into span attributes. Recreating/rotating a destination's salt changes identities.
- `keyName`: the configured API key name, intentionally revealing that operator label.
- `none`: no user id. Session tags are still exported when present; these modes do not
  anonymize arbitrary prompt content or operator-supplied session/correlation labels.

### Starting without a backfill

On creation only, enable **Start from current position (skip existing logs)** or pass
`startFromCurrentPosition: true` at the top level of the create API payload. It initializes
`cursor_row_id` to the current maximum retained call-log rowid using the existing cursor
helpers, without a migration. The default is false (cursor 0 and retained-history backfill).
It is not an update-time cursor reset setting.

The shared `ttftMs` addition also adds a nullable `ttft_ms` column to the BigQuery mapper
and new-table schema: its schema test requires every canonical record field to have a
column. Existing tables keep exporting unchanged: `prepare()` reads the table schema and
omits only `ttft_ms` when that column is absent. Add the nullable INT64 column to get TTFT
on the next run, or use a new table. No PATCH, automatic schema alteration or additional
permissions are required; all other row fields retain strict schema checking.

---

## 6. Adding a destination

1. Create `src/lib/logExport/destinations/<name>.ts` exporting a `LogExportDestinationType`:
   a Zod `configSchema`, a `fields` descriptor array for the UI, `secretFields`, and a
   `createClient(config)` returning `test()` / `prepare()` / `send(records)`.
2. Add it to the `DESTINATIONS` array in `src/lib/logExport/registry.ts`.
3. Write tests under `tests/unit/`.

That is the whole change: persistence, the cron job, the REST layer, secret encryption and the
dashboard form all read the registry.

Two rules for a new destination:

- `send()` **must throw** on a partial failure. Resolving means "the destination has these rows",
  and the cursor moves past them permanently.
- A destination that takes a user-supplied URL must validate it through
  `parseAndValidateWebhookUrl` (`src/shared/network/outboundUrlGuardPolicy.ts`) before fetching,
  the same way webhooks do. BigQuery does not need this: its hosts are constants.

---

## 7. Operating it

- **Dashboard**: Integrations → Log export. Add a destination, run **Test** to check credentials
  without writing rows, then enable it.
- **Backlog**: each destination card shows pending rows and the cursor; `GET
/api/log-export/status` returns the same figures plus the last 20 job runs.
- **A failing destination does not fail the others** — the run summary records per-destination
  status in `last_status` / `last_error`, and the job run history keeps the aggregate.
- **Deleting a destination deletes its cursor.** Re-adding it starts from the oldest retained
  call log, which re-sends rows the destination may already hold. On BigQuery the per-row
  `insertId` absorbs that only inside BigQuery's own de-duplication window, so prefer disabling
  a destination over deleting it.
