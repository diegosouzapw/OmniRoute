---
title: "Log Export"
version: 3.8.51
lastUpdated: 2026-08-29
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
call_logs (SQLite)
  → callLogExportSource.getCallLogsForExport(cursor, batchSize)
    → LogExportRecord[]  (the Logs-tab field set)
      → destination client.send(batch)
        → advanceLogExportCursor(id, lastRowId, count)
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
What ships is what the dashboard shows, because both read through `getCallLogById`: payloads are
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
| Runner (cursor loop) | `src/lib/logExport/runner.ts`                |
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

## 5. Adding a destination

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

## 6. Operating it

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
