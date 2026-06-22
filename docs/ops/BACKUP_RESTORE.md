---
title: "Backup & Restore Procedures"
version: 3.8.16
lastUpdated: 2026-06-08
---

# Backup & Restore Procedures

> **TL;DR**: OmniRoute's backup system automatically creates versioned SQLite snapshots, supports manual exports via CLI/API, and integrates with S3-compatible storage. This guide covers operational runbooks for backup, restore, and disaster recovery.

**Source:** `src/lib/db/backup.ts` (607 LOC) — full backup/restore implementation

**Related:**

- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — base schema and operations
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — backup health monitoring
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — pre-release backup

---

## Overview

OmniRoute has **3 layers of backup**:

| Layer                   | Trigger                                            | Location                         | Retention          |
| ----------------------- | -------------------------------------------------- | -------------------------------- | ------------------ |
| **Auto** (DB snapshots) | Every state-mutating request (throttled to 1/hour) | `${DATA_DIR}/db_backups/db_*.db` | 20 files OR N days |
| **Manual** (CLI/API)    | `omniroute backup create` or `PUT /api/db-backups` | User-specified path              | User-controlled    |
| **Export/Import**       | `GET/POST /api/db-backups/{export,import}`         | User-specified path              | User-controlled    |

```
┌────────────────────────────────────────────────────────────┐
│                    Backup Strategy                          │
│                                                              │
│   Request mutates DB ──▶ backup throttle (1h)              │
│                                  │                          │
│                                  ▼                          │
│                          db_backups/db_<timestamp>.db       │
│                                  │                          │
│                          Retain: 20 files OR N days          │
│                                  │                          │
│   Export/Import  ──▶  API: GET /api/db-backups/export       │
│   Manual trigger ──▶  CLI: omniroute backup create            │
│   Manual trigger ──▶  API: PUT /api/db-backups               │
│                                  │                          │
│   SQLite hot ──▶  sqlite3 storage.sqlite ".backup"           │
│                          ──▶ raw SQLite snapshot              │
└────────────────────────────────────────────────────────────┘
```

---

## Auto Backups (DB Snapshots)

### How It Works

`backup.ts` runs a **throttled auto-backup** on every state-mutating request:

```ts
// src/lib/db/backup.ts
const BACKUP_THROTTLE_MS = 60 * 60 * 1000; // 60 minutes
```

This means:

- First request mutates DB → backup created
- Subsequent requests within 60 minutes → **no new backup** (throttled)
- After 60 minutes → next mutation triggers a new backup

This balances safety (backups are recent) with disk usage (max 1 backup/hour).

### Configuration

| Env var                    | Default        | Purpose                                                       |
| -------------------------- | -------------- | ------------------------------------------------------------- |
| `DB_BACKUP_MAX_FILES`      | `20`           | Max number of backup files to retain                          |
| `DB_BACKUP_RETENTION_DAYS` | `0` (disabled) | Delete backups older than N days; 0 = no time-based retention |

### Backup File Format

Each backup is a **complete SQLite file** (with `-wal` and `-shm` siblings):

```
db_backups/
├── db_2026-06-08T10-00-00_pre-write.sqlite
├── db_2026-06-08T11-00-00_pre-write.sqlite
...
```

The filename format is `db_<ISO-timestamp>_<reason>.sqlite`, where colons (`:`) and periods (`.` in the timestamp) are replaced with hyphens for filesystem compatibility. The `reason` suffix indicates what triggered the backup (e.g., `pre-write`, `pre-migration`).

### Cleanup Algorithm

`backup.ts` runs cleanup after each new backup:

1. **Count-based**: Keep at most `DB_BACKUP_MAX_FILES` most recent
2. **Time-based**: Delete backups older than `DB_BACKUP_RETENTION_DAYS`
3. **Family-based**: A backup's `.db`, `.db-wal`, and `.db-shm` files are deleted together

### Monitoring

Check auto-backup health and list backups:

```bash
GET /api/db-backups
```

Response:

```json
{
  "enabled": true,
  "lastBackupAt": "2026-06-08T11:00:00Z",
  "backupCount": 18,
  "maxFiles": 20,
  "retentionDays": 0,
  "oldestBackup": "2026-05-25T11:00:00Z",
  "newestBackup": "2026-06-08T11:00:00Z",
  "throttledUntil": "2026-06-08T12:00:00Z"
}
```

---

## Manual Backups (CLI)

### Create a Backup Snapshot

```bash
# Create a DB snapshot
omniroute backup create

# With a name
omniroute backup create --name pre-deploy
```

### Restore from Backup

```bash
# Interactively select and restore a backup
omniroute backup restore

# Restore a specific backup by ID
omniroute backup restore db_2026-06-08T10-00-00_pre-write.sqlite

# Skip confirmation prompt
omniroute backup restore --yes db_2026-06-08T10-00-00_pre-write.sqlite
```

> **Stop all clients first** — running clients will have stale data.

### View Backup Status

```bash
omniroute backup status
```

### CLI Reference

```bash
omniroute backup --help
```

````
Usage: omniroute backup <command> [options]

Commands:
  create               Create a DB snapshot
  auto                 Enable/configure automatic backups
  restore [backupId]   Restore from a backup
  enable               Enable automatic backup schedule
  disable              Disable automatic backup schedule
## Manual Backups (API)

### Export (JSON)

```bash
curl -X GET http://localhost:20128/api/db-backups/export \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  --output backup.json
````

### Import (JSON)

```bash
curl -X POST http://localhost:20128/api/db-backups/import \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d @backup.json
```

### Export All (Unrestricted)

For exporting all data without filters:

```bash
curl -X GET http://localhost:20128/api/db-backups/exportAll \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  --output backup-full.json
```

### List Auto-Backups

```bash
GET /api/db-backups
```

Response:

```json
{
  "backups": [
    {
      "filename": "db_2026-06-08T11-00-00_pre-write.sqlite",
      "sizeBytes": 4567890,
      "createdAt": "2026-06-08T11:00:00Z",
      "ageHours": 2.5
    }
  ]
}
```

---

## SQLite Hot Backup

For zero-downtime backup of a **live** database, use SQLite's online backup API:

```bash
# Built-in sqlite3
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"

# With compression
sqlite3 ~/.omniroute/storage.sqlite ".backup '/backups/omniroute-hot.db'"
# Then: gzip /backups/omniroute-hot.db
```

This creates a **consistent snapshot** even if OmniRoute is actively writing.

### Automated Hot Backup Script

```bash
#!/bin/bash
# /usr/local/bin/omniroute-hot-backup.sh
set -euo pipefail

BACKUP_DIR="/backups/omniroute"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_FILE="$BACKUP_DIR/hot-$TIMESTAMP.db"

mkdir -p "$BACKUP_DIR"

# Hot backup (safe to run while OmniRoute is live)
sqlite3 ~/.omniroute/storage.sqlite ".backup '$BACKUP_FILE'"

# Compress
gzip "$BACKUP_FILE"

# Keep last 7 days
find "$BACKUP_DIR" -name "hot-*.db.gz" -mtime +7 -delete

echo "Hot backup created: $BACKUP_FILE.gz"
```

Add to cron:

```cron
0 * * * * /usr/local/bin/omniroute-hot-backup.sh
```

### Restore from Hot Backup

```bash
# Stop OmniRoute
omniroute stop

# Replace the DB
cp /backups/omniroute/hot-20260608-100000.db ~/.omniroute/storage.sqlite
# Or: gunzip -c hot-20260608-100000.db.gz > ~/.omniroute/storage.sqlite

# Restart
omniroute
```

---

## Offsite Backup (S3-Compatible Storage)

### Configuration

```bash
# .env
BACKUP_S3_ENABLED=true
BACKUP_S3_BUCKET=my-omniroute-backups
BACKUP_S3_REGION=us-east-1
BACKUP_S3_ACCESS_KEY=...
BACKUP_S3_SECRET_KEY=...
BACKUP_S3_ENDPOINT=https://s3.amazonaws.com  # For non-AWS providers
```

### Upload Script

```bash
#!/bin/bash
# Upload daily JSON backup to S3
set -euo pipefail

BACKUP_FILE="/tmp/omniroute-$(date +%Y%m%d).json.gz"
S3_PATH="s3://my-omniroute-backups/$(date +%Y/%m/%d)/"

# Generate backup via API
curl -s -X GET http://localhost:20128/api/db-backups/export -H "Authorization: Bearer $MANAGEMENT_KEY" | gzip > "$BACKUP_FILE"

# Upload
aws s3 cp "$BACKUP_FILE" "$S3_PATH" --storage-class STANDARD_IA

# Cleanup local
rm "$BACKUP_FILE"

echo "Backup uploaded to $S3_PATH"
```

### Restore from S3

```bash
# Download
aws s3 cp s3://my-omniroute-backups/2026/06/08/omniroute-20260608.json.gz /tmp/

# Restore
gunzip -c /tmp/omniroute-20260608.json.gz | curl -s -X POST http://localhost:20128/api/db-backups/import -H "Authorization: Bearer $MANAGEMENT_KEY" -H "Content-Type: application/json" -d @-
```

### S3-Compatible Providers

Compatible with any S3-compatible storage (MinIO, Wasabi, Backblaze B2, Cloudflare R2):

```bash
BACKUP_S3_ENDPOINT=https://s3.wasabisys.com
BACKUP_S3_ENDPOINT=https://minio.example.com
BACKUP_S3_ENDPOINT=https://<account>.r2.cloudflarestorage.com
```

---

## Encryption at Rest (Backup Files)

JSON exports contain **encrypted** secrets (using the same AES-256-GCM as the DB), but the rest of the data is plaintext. For offsite storage, encrypt the file:

```bash
# Encrypt with GPG
curl -s -X GET http://localhost:20128/api/db-backups/export -H "Authorization: Bearer $MANAGEMENT_KEY" | gzip | gpg --symmetric --cipher-algo AES256 > backup.gpg

# Decrypt and restore via API
gpg --decrypt backup.gpg | gunzip | curl -s -X POST http://localhost:20128/api/db-backups/import -H "Authorization: Bearer $MANAGEMENT_KEY" -H "Content-Type: application/json" -d @-

```

Or use S3 server-side encryption (SSE-S3, SSE-KMS) — the bucket handles encryption.

---

## Backup Runbooks

### Runbook 1: Daily Automated Backup

**Schedule**: 2 AM UTC daily

```bash
# /usr/local/bin/omniroute-daily-backup.sh
#!/bin/bash
set -euo pipefail

TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="/backups/omniroute/daily"
S3_BUCKET="s3://my-company-backups/omniroute"

# 1. Generate local backup via API
curl -s -X GET http://localhost:20128/api/db-backups/export -H "Authorization: Bearer $MANAGEMENT_KEY" | gzip > "$BACKUP_DIR/backup-$TIMESTAMP.json.gz"


# 2. Upload to S3
aws s3 cp "$BACKUP_DIR/backup-$TIMESTAMP.json.gz" "$S3_BUCKET/daily/" \
  --storage-class STANDARD_IA

# 3. Keep last 14 days locally
find "$BACKUP_DIR" -name "backup-*.json.gz" -mtime +14 -delete

# 4. Alert on failure
if [ $? -ne 0 ]; then
  curl -X POST "$ALERT_WEBHOOK_URL" \
    -d '{"text":"⚠️ OmniRoute daily backup failed"}'
fi
```

Cron: `0 2 * * * /usr/local/bin/omniroute-daily-backup.sh`

### Runbook 2: Pre-Migration Backup

**Before** upgrading OmniRoute to a new version:

````bash
# 1. Stop OmniRoute
omniroute stop

# 2. Snapshot the DB
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/pre-upgrade.sqlite"

# 3. Compress the snapshot immediately (before restarting)
gzip /backups/pre-upgrade.sqlite

# 4. Start OmniRoute briefly to allow API export
omniroute start

# 5. Export as JSON via API
curl -X GET http://localhost:20128/api/db-backups/export \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  --output /backups/pre-upgrade.json
omniroute stop

# 6. Compress and archive the JSON export
gzip /backups/pre-upgrade.json
mv /backups/pre-upgrade.json.gz /backups/pre-upgrade-$(date +%Y%m%d).json.gz
mv /backups/pre-upgrade.sqlite.gz /backups/pre-upgrade-$(date +%Y%m%d).sqlite.gz

# 7. Now safe to upgrade
npm install -g omniroute@latest
omniroute start

### Runbook 3: Restore from Corruption

If SQLite integrity check fails:

```bash
# 1. Stop OmniRoute
omniroute stop

# 2. Run integrity check
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# If NOT "ok" — proceed to restore

# 3. Find the most recent auto-backup
ls -lt ~/.omniroute/db_backups/ | head -5

# 4. Restore from auto-backup
cp ~/.omniroute/db_backups/db_2026-06-08T11-00-00.db ~/.omniroute/storage.sqlite

# 5. Verify
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Should print: ok

# 6. Restart
omniroute start
````

### Runbook 4: Restore to New Machine

Moving OmniRoute to a new host:

```bash
# ON OLD MACHINE — export via API
curl -s -X GET http://localhost:20128/api/db-backups/export \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  --output /tmp/migration.json
# Copy /tmp/migration.json to new machine (scp, rsync, etc.)

# ON NEW MACHINE (after installing OmniRoute)
# 1. Ensure encryption key matches
echo "OMNIROUTE_ENCRYPTION_KEY=..." >> ~/.omniroute/.env
# (must match the old machine's key!)

# 2. Import via API
curl -s -X POST http://localhost:20128/api/db-backups/import \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d @/tmp/migration.json

# 3. Verify
omniroute status
```

### Runbook 5: Cross-Region Disaster Recovery

```bash
# ON PRIMARY (continuous)
# 1. Hourly backups to S3
0 * * * * /usr/local/bin/omniroute-s3-backup.sh

# ON STANDBY (in another region)
# 1. Cron: pull latest backup every 30 min
*/30 * * * * /usr/local/bin/omniroute-dr-restore.sh

# /usr/local/bin/omniroute-dr-restore.sh
#!/bin/bash
LATEST=$(aws s3 ls s3://my-backups/omniroute/hourly/ | sort | tail -1 | awk '{print $4}')
aws s3 cp "s3://my-backups/omniroute/hourly/$LATEST" /tmp/latest-backup.json.gz
gunzip -c /tmp/latest-backup.json.gz | curl -s -X POST http://localhost:20128/api/db-backups/import -H "Authorization: Bearer $MANAGEMENT_KEY" -H "Content-Type: application/json" -d @-
```

---

## Backup Verification

Always **verify** backups before relying on them:

```bash
# Verify SQLite snapshot
sqlite3 /backups/db_2026-06-08T11-00-00.db "PRAGMA integrity_check;"

# Restore to test DB and query
sqlite3 /tmp/test.db < /backups/db_2026-06-08T11-00-00.db
sqlite3 /tmp/test.db "SELECT COUNT(*) FROM api_keys;"
# Compare count to current production
```

### Automated Verification

```bash
#!/bin/bash
# Daily backup verification
set -euo pipefail
BACKUP_FILE="/backups/omniroute/latest.db"
TEST_DB="/tmp/verify-$(date +%s).db"

# Restore to test DB
sqlite3 "$TEST_DB" < "$BACKUP_FILE"

# Run sanity checks
INTEGRITY=$(sqlite3 "$TEST_DB" "PRAGMA integrity_check;")
KEY_COUNT=$(sqlite3 "$TEST_DB" "SELECT COUNT(*) FROM api_keys;")
PROVIDER_COUNT=$(sqlite3 "$TEST_DB" "SELECT COUNT(*) FROM provider_connections;")

# Alert on issues
if [ "$INTEGRITY" != "ok" ] || [ "$KEY_COUNT" -eq 0 ]; then
  curl -X POST "$ALERT_WEBHOOK_URL" \
    -d "{\"text\":\"⚠️ Backup verification failed: integrity=$INTEGRITY keys=$KEY_COUNT\"}"
fi

# Cleanup
rm "$TEST_DB"
```

---

## Disaster Recovery Scenarios

### Scenario 1: WAL File Lost (auto-recoverable)

```bash
# WAL auto-replays on next open
omniroute
# If not: rm ~/.omniroute/storage.sqlite-shm
# OmniRoute will create a new -shm file
```

### Scenario 2: Main DB File Corrupted (use auto-backup)

```bash
omniroute stop
ls -lt ~/.omniroute/db_backups/ | head -1
# Copy the most recent:
cp ~/.omniroute/db_backups/db_<timestamp>.db ~/.omniroute/storage.sqlite
omniroute start
```

### Scenario 3: Encryption Key Lost (data unrecoverable)

**No recovery possible** without the key. Encrypted fields cannot be decrypted.

**Mitigation**: Always back up the encryption key separately:

- Password manager
- KMS (AWS KMS, GCP Cloud KMS, Azure Key Vault)
- Hardware security module (HSM) for enterprise

```bash
# BACKUP YOUR KEY
echo "$OMNIROUTE_ENCRYPTION_KEY" | gpg --symmetric > omniroute-key.gpg
# Store in a separate secure location
```

### Scenario 4: Disk Full (free space, then checkpoint)

```bash
# Free up disk
rm /tmp/*.log
docker system prune  # if using Docker

# Checkpoint WAL to free space
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

### Scenario 5: Complete Data Loss (restore from S3)

```bash
# 1. Install OmniRoute on new host
npm install -g omniroute

# 2. Set encryption key (from secure backup)
echo "OMNIROUTE_ENCRYPTION_KEY=<key>" >> ~/.omniroute/.env

# 3. Download latest backup
aws s3 cp s3://my-backups/omniroute/hourly/2026-06-08/backup-110000.json.gz /tmp/

# 4. Import
gunzip -c /tmp/backup-110000.json.gz | curl -s -X POST http://localhost:20128/api/db-backups/import -H "Authorization: Bearer $MANAGEMENT_KEY" -H "Content-Type: application/json" -d @-

# 5. Verify
omniroute status
```

---

## Backup Storage Estimation

| Database size | JSON backup size | Compressed (gzip) |
| ------------- | ---------------- | ----------------- |
| 10 MB         | ~15 MB           | ~3 MB             |
| 100 MB        | ~150 MB          | ~30 MB            |
| 1 GB          | ~1.5 GB          | ~300 MB           |
| 10 GB         | ~15 GB           | ~3 GB             |

With call log artifacts: 2-5x the base size.

### Cost Estimation (S3 Standard-IA)

- $0.0125/GB/month storage
- $0.01/GB retrieval

For 100 MB daily compressed backups kept 30 days: ~$0.04/month.

---

## Common Operations

### List All Backups

```bash
curl -s http://localhost:20128/api/db-backups | jq
```

Shows all auto-backups with size and age.

### Clean Old Backups

```bash
# Delete backups older than 7 days
find "$DATA_DIR/db_backups" -name "db_*.db" -mtime +7 -delete
```

### Verify a Backup

```bash
# Verify SQLite snapshot integrity
sqlite3 /backups/db_2026-06-08T11-00-00.db "PRAGMA integrity_check;"
```

Returns exit code 0 on success, non-zero on failure.

### Compare Two Backups

```bash
# Count rows in a table in two backups
for db in /backup1.db /backup2.db; do
  sqlite3 "$db" "SELECT COUNT(*) FROM api_keys;"
done
```
---

## Troubleshooting

### "Backup file is empty"

Check disk space and file permissions:

```bash
df -h ~/.omniroute/
ls -la ~/.omniroute/db_backups/
```

### "Auto-backup not running"

Check the throttling state:

```bash
GET /api/db-backups
# Look at "throttledUntil" in the response
```

If throttled, wait or manually trigger via API.

### "Restore failed: schema mismatch"

The backup was from an older OmniRoute version. Run migrations first:

```bash
omniroute start  # runs migrations
omniroute stop
curl -s -X POST http://localhost:20128/api/db-backups/import -H "Authorization: Bearer $MANAGEMENT_KEY" -H "Content-Type: application/json" -d @backup.json
```

### "Cannot decrypt secrets"

The encryption key on the restore machine doesn't match the source. Verify `OMNIROUTE_ENCRYPTION_KEY` matches.

---

## Best Practices

1. **3-2-1 backup rule**: 3 copies, 2 different media, 1 offsite
2. **Test restores regularly** — a backup you've never restored from isn't a backup
3. **Encrypt offsite backups** — use GPG or S3 SSE
4. **Monitor backup health** — set up alerts on backup failure
5. **Document your RTO/RPO** — Recovery Time/Point Objectives
6. **Automate verification** — daily integrity checks
7. **Retain versioned backups** — keep 30 days, 12 months, 7 years as needed

---

## See Also

- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — schema, migrations, performance
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — backup health checks, alerts
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — pre-release backup procedure
- [SQLITE_RUNTIME.md](./SQLITE_RUNTIME.md) — SQLite internals
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — backup-related env vars
- Source: `src/lib/db/backup.ts` (607 LOC)
