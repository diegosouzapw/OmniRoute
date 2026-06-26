# Runbook 07 — SQLite WAL Bloat

**Severity**: SEV-2 if disk > 90% full; SEV-1 if writes are failing with `SQLITE_FULL`.
**Owner**: data on-call.
**Last verified**: 2026-06-25.
**Related**: `docs/ops/DATABASE_GUIDE.md`; `src/lib/db/storage.ts`; `src/lib/monitoring/dbHealthCheck.ts`.

OmniRoute uses sql.js (an in-process WASM build of SQLite) by default,
with the data file at `~/.omniroute/storage.sqlite` and the
write-ahead-log at `~/.omniroute/storage.sqlite-wal`. Under sustained
write load — bulk imports, large `usage_logs` batches, or a long-running
audit-log gap — the WAL file can grow to many gigabytes if checkpoints
fall behind.

A bloated WAL is not a corruption risk; it's a **disk-fill** risk. The
`-wal` file is normally < 100 MB but can spike to > 1 GB during heavy
imports. The fix is a `PRAGMA wal_checkpoint(TRUNCATE)` which writes the
WAL contents back into the main DB and truncates the WAL to zero bytes.

> **Important**: do not delete `storage.sqlite-wal` manually. SQLite will
> silently corrupt the DB on the next write if the WAL is removed without
> a checkpoint.

---

## 1. Detect

### 1.1 Alert payload

```
Alert:  DiskFillImminent
Labels: { volume="/var/lib/omniroute", used_pct=92 }
Value:  used 92%, threshold 85%
```

Or, more specifically:

```
Alert:  SqliteWalSizeAnomaly
Labels: { db_path="~/.omniroute/storage.sqlite" }
Value:  wal_size_bytes = 1.4 GB (threshold: 500 MB)
```

### 1.2 Confirm via filesystem

```bash
ls -lh ~/.omniroute/storage.sqlite*
# Sample output (problem):
# -rw------- 1 omniroute omniroute 12M  storage.sqlite
# -rw------- 1 omniroute omniroute 1.4G storage.sqlite-wal   <- bloat
# -rw------- 1 omniroute omniroute 96K storage.sqlite-shm
```

If `storage.sqlite-wal` is > 500 MB, the WAL is bloated. If
`storage.sqlite-shm` is also large (> 1 MB), an active connection is
holding it.

### 1.3 Confirm via health endpoint

```bash
curl -s http://localhost:20128/api/monitoring/health | jq '.checks.database'
```

Sample healthy response:

```json
{
  "status": "pass",
  "latency_ms": 2,
  "wal_size_bytes": 4194304,
  "wal_pages": 1024
}
```

Sample failing response:

```json
{
  "status": "fail",
  "wal_size_bytes": 1503238553,
  "wal_pages": 367001,
  "error": "wal_size_above_threshold"
}
```

The `wal_size_bytes` field is computed in `src/lib/monitoring/dbHealthCheck.ts`
by `stat()`-ing the WAL file size.

### 1.4 Confirm via integrity

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Expect: ok
```

If this returns anything other than `ok`, **stop OmniRoute** and follow
the disaster-recovery path in `docs/ops/DATABASE_GUIDE.md#disaster-recovery`.
This runbook assumes integrity is intact.

---

## 2. Classify

| Symptom | Cause | Go to |
|---|---|---|
| WAL is bloated but `active_sessions` is high | Many concurrent writers; checkpoint can't keep up | § 3 (passive checkpoint) |
| WAL is bloated and `active_sessions` is low | A long-running import left a giant transaction | § 4 (active checkpoint + identify hot table) |
| WAL is bloated and writes are failing | Disk actually full | § 5 (free disk first) |

---

## 3. Mitigate (passive checkpoint)

If the system is under load, ask SQLite to checkpoint more aggressively
**without** blocking writes. The default checkpoint is `PASSIVE`, which
lets writers continue. Force a passive checkpoint:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(PASSIVE);"
# Output: 0 1024 1024
#         ^  ^wal-pages ^checkpointed-pages
```

If the second number (pages still in WAL) is much smaller than the
third, the checkpoint made progress. Repeat in a loop:

```bash
while true; do
  out=$(sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(PASSIVE);")
  echo "$(date -Is) $out"
  pages=$(echo "$out" | awk '{print $2}')
  if [ "$pages" -lt 100 ]; then break; fi
  sleep 5
done
```

When the WAL drops below 100 pages, the bloat is resolved.

### 3.1 Lower the auto-checkpoint threshold

The auto-checkpoint fires when the WAL reaches `journal_size_limit` (default
1 MB, set at boot in `src/lib/db/storage.ts`). Lower it temporarily to
make auto-checkpoints more frequent:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA journal_size_limit = 524288;"
# 512 KB
```

The change is in-memory only and resets when the DB connection closes.

---

## 4. Mitigate (active checkpoint + identify hot table)

If passive checkpoint doesn't make progress (the WAL is too large to
drain in 5 s windows), do an **active** checkpoint. This blocks writes
for the duration.

> **Caveat**: active checkpoint takes a write lock. Schedule a
> maintenance window or do this during low-traffic hours.

### 4.1 Stop OmniRoute cleanly

```bash
# Drain in-flight requests
docker exec omniroute-replica-1 \
  curl -X POST http://localhost:20128/__admin/drain \
  -H "Content-Type: application/json" -d '{"drainSeconds":60}'
sleep 65

# Stop the container
docker compose -f docker-compose.prod.yml stop omniroute
```

### 4.2 Force a TRUNCATE checkpoint

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
# Output: 0 0 367001
#         ^  ^remaining ^checkpointed
# A successful TRUNCATE leaves 0 remaining pages.
```

Confirm the WAL file is now zero bytes:

```bash
ls -lh ~/.omniroute/storage.sqlite-wal
# Expect: 0 bytes (or the file is gone entirely)
```

### 4.3 Identify the hot table

The bloated WAL means one table has heavy write traffic. Find it:

```bash
sqlite3 ~/.omniroute/storage.sqlite <<'SQL'
SELECT name, (SELECT count(*) FROM pragma_table_info(name)) AS cols
  FROM sqlite_schema
  WHERE type='table'
  ORDER BY name;
SQL
```

Then check row counts and write velocity:

```bash
# Recent activity (last 1000 writes)
sqlite3 ~/.omniroute/storage.sqlite <<'SQL'
SELECT 'usage_logs', count(*) FROM usage_logs WHERE created_at > datetime('now','-1 hour')
UNION ALL
SELECT 'audit_log',  count(*) FROM audit_log  WHERE created_at > datetime('now','-1 hour')
UNION ALL
SELECT 'call_logs',  count(*) FROM call_logs  WHERE created_at > datetime('now','-1 hour');
SQL
```

Typical hot tables:

| Table | Typical row size | Why it bloats |
|---|---|---|
| `usage_logs` | ~250 bytes | Per-token usage record on every API call |
| `audit_log` | ~1 KB | Per-action audit record (security-sensitive) |
| `call_logs` | ~2 KB | Full request/response metadata |
| `combo_runs` | ~500 bytes | Per-combo execution trace |

### 4.4 Archive the hot table

If a table has > 90 days of data and is no longer needed for hot reads,
archive it to a side DB:

```bash
# Attach an archive DB
sqlite3 ~/.omniroute/storage.sqlite <<'SQL'
ATTACH DATABASE '~/.omniroute/archive-2026Q2.sqlite' AS archive;
CREATE TABLE archive.usage_logs AS SELECT * FROM main.usage_logs WHERE created_at < datetime('now','-90 day');
DELETE FROM main.usage_logs WHERE created_at < datetime('now','-90 day');
DETACH DATABASE archive;
SQL
```

Verify the archive contains the expected rows:

```bash
sqlite3 ~/.omniroute/archive-2026Q2.sqlite "SELECT count(*) FROM usage_logs;"
```

Then vacuum the live DB to reclaim the space:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

### 4.5 Restart OmniRoute

```bash
docker compose -f docker-compose.prod.yml up -d --no-deps omniroute
```

Verify health:

```bash
curl -s http://localhost:20128/api/monitoring/health | jq '.checks.database'
```

`wal_size_bytes` should be < 1 MB on a fresh boot.

---

## 5. Mitigate (disk actually full)

If `df -h ~/.omniroute/` shows the volume at 100% used, you cannot write
a new checkpoint. The WAL cannot shrink if there's nowhere to write the
checkpointed pages.

```bash
df -h ~/.omniroute/
```

Free disk first:

1. **Move old backups off-host**: `bin/snapshot-data.sh` creates a
   compressed backup under `~/.omniroute/backups/`. The recent ones are
   needed for restore, but anything > 30 days old can be moved to object
   storage:
   ```bash
   find ~/.omniroute/backups -name '*.sqlite.gz' -mtime +30 -delete
   aws s3 sync ~/.omniroute/backups/ s3://omniroute-archives/backups/ --exclude '*' --include '*.sqlite.gz'
   ```
2. **Delete debug logs**: `/var/log/omniroute/*.log.*.gz` files older than 7 days:
   ```bash
   find /var/log/omniroute -name '*.gz' -mtime +7 -delete
   ```
3. **Rotate the call log file**: `tests/unit/call-log-file-rotation.test.ts`
   documents the `CALL_LOG_RETENTION_DAYS` env var. Set it to a smaller
   value (e.g. `3`) and restart.

Once the disk has at least 1 GB free, return to § 3 or § 4.

---

## 6. Investigate (parallel with mitigation)

### 6.1 Find the writer that bloated the WAL

If you have a recent WAL bloating event, the audit log or request log
will show a long-running import or batch. Look for:

```bash
# Bulk import jobs that started in the WAL-bloat window
grep -h 'POST /api/imports' /var/log/omniroute/*.log \
  | jq -r 'select(.status == 200) | .timestamp + " " + .duration_ms + "ms"'
```

Long-running POSTs (> 30 s) that overlap the WAL-bloat alert time are
prime suspects.

### 6.2 Check the journal mode

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA journal_mode;"
# Expect: wal
```

If this returns anything other than `wal`, the DB is in rollback-journal
mode and the WAL file isn't even in use. The `-wal` file you're seeing
is stale — restart OmniRoute to clean it up.

---

## 7. Restore

1. `wal_size_bytes` < 1 MB on the health endpoint.
2. `df -h ~/.omniroute/` shows the volume at < 80% used.
3. Writes succeed (no `SQLITE_FULL` errors in logs):
   ```bash
   grep -h 'SQLITE_FULL' /var/log/omniroute/*.log | tail -5
   # Expect: empty
   ```
4. If you archived data in § 4.4, schedule a recurring archive job (see
   `docs/ops/DATABASE_GUIDE.md` for the cron pattern).

---

## 8. Smoke test (run quarterly)

```bash
# Confirm health endpoint still reports WAL size
curl -s http://localhost:20128/api/monitoring/health | jq '.checks.database.wal_size_bytes'

# Confirm auto-checkpoint is firing
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_autocheckpoint;"
# Expect: a positive integer (default 1000)
```

---

## 9. References

- `src/lib/db/storage.ts` — DB initialization + WAL setup
- `src/lib/monitoring/dbHealthCheck.ts` — `wal_size_bytes` field
- `src/app/api/monitoring/health/route.ts` — health endpoint
- `docs/ops/DATABASE_GUIDE.md` — full DB operations guide
- `bin/snapshot-data.sh` — DB snapshot script
- `bin/restore-data.sh` — restore from snapshot
- `tests/unit/call-log-file-rotation.test.ts` — `CALL_LOG_RETENTION_DAYS` semantics
- `tests/unit/db-backup-extended.test.ts` — backup / restore tests
- SQLite docs: https://www.sqlite.org/wal.html