---
title: "Database Schema & Operations Guide"
version: 3.8.16
lastUpdated: 2026-06-08
---

# Database Schema & Operations Guide

> **TL;DR**: OmniRoute uses **SQLite with WAL journaling** as its primary store, with **AES-256-GCM** encryption at rest for sensitive fields. This guide covers the schema, migrations, backup/recovery, and operational runbooks.

**Sources:**
- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 base tables)
- `src/lib/db/migrationRunner.ts` — versioned migrations
- `src/lib/db/migrations/` — 94 versioned SQL files
- `src/lib/db/encryption.ts` — encryption helpers
- `src/lib/db/backup.ts` — backup export/import
- `src/lib/db/healthCheck.ts` — health diagnostics

---

## Why SQLite?

OmniRoute chose SQLite over PostgreSQL/MySQL for several reasons:

| Factor | SQLite | PostgreSQL |
|--------|--------|-----------|
| **Deployment** | Embedded — no separate server | Requires server setup |
| **Encryption** | Application-layer (AES-256-GCM) | Built-in TDE |
| **Performance** | Faster for small/medium workloads | Better for huge concurrent writes |
| **Concurrency** | WAL mode allows concurrent reads | Full MVCC |
| **Backup** | Single-file copy | `pg_dump` or filesystem snapshot |
| **Use case** | Per-user install, embedded | Multi-tenant SaaS |

For **single-user, single-instance** deployments (the primary OmniRoute use case), SQLite is simpler and faster.

### WAL Journaling

`core.ts` opens the database with **WAL (Write-Ahead Logging) mode**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
// Settings > System & Storage > Cache Size is applied as KiB.
db.pragma("cache_size = -16384");
```

WAL allows **concurrent reads** during writes — important for the dashboard, which queries while requests are being recorded.

---

## Database Location

The SQLite file is stored at:

| OS | Path |
|----|------|
| Linux | `~/.omniroute/storage.sqlite` |
| macOS | `~/.omniroute/storage.sqlite` |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite` |
| Docker | `/app/data/storage.sqlite` (configurable via `DATA_DIR`) |

Companion files:

- `storage.sqlite-wal` — write-ahead log
- `storage.sqlite-shm` — shared memory file
- `call_logs/` — request payload artifacts (if enabled)

**Override the location:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Domain Module Architecture

OmniRoute's database has **76 domain modules** in `src/lib/db/`. Each module:

- Owns one or more specific tables
- Exports typed CRUD functions
- Never touches another module's tables
- Uses `getDbInstance()` from `core.ts` to access the DB

### The 76 DB Modules

OmniRoute has **76 module files** in `src/lib/db/`. Below is a sampling of core modules; see the directory listing for the complete list:

| Module | Tables | Responsibility |
|--------|--------|----------------|
| `providers.ts` | `provider_connections` | OAuth/API key provider registration and credentials |
| `models.ts` | `key_value` (model data) | Model definitions, capabilities, pricing |
| `combos.ts` | `combos` | Combo routing configs and ordering |
| `apiKeys.ts` | `api_keys` | API key lifecycle, scopes, quota tracking |
| `settings.ts` | `key_value`, `api_keys`, `combos` | System configuration and shared KV store |
| `backup.ts` | — | Backup export/import operations |
| `proxies.ts` | `proxy_registry`, `proxy_assignments`, `provider_connections` | Proxy configs and routing rules |
| `prompts.ts` | `prompt_templates` | Reusable prompt templates, versioning |
| `webhooks.ts` | `webhooks` | Event-driven webhook subscriptions and logs |
| `detailedLogs.ts` | `request_detail_logs` | Per-request audit logging (optional, high volume) |
| `domainState.ts` | `domain_*` (5 tables) | Domain budgets, circuit breakers, lockouts, fallback chains, cost history |
| `registeredKeys.ts` | `registered_keys`, `account_key_limits`, `provider_key_limits` | Whitelisted API keys for MCP/A2A |
| `quotaSnapshots.ts` | `quota_snapshots` | Historical quota usage |
| `modelComboMappings.ts` | `model_combo_mappings` | Map models to combo defaults |
| `cliToolState.ts` | `cli_tool_state` | CLI-specific persistent state |
| `encryption.ts` | — | Helpers for encrypting/decrypting fields |
| `readCache.ts` | — | In-memory cache for read-heavy ops |
| `secrets.ts` | `key_value` (encrypted entries) | Encrypted secret storage |
| `stateReset.ts` | — | Wipe/reset DB state for testing |
| `contextHandoffs.ts` | `context_handoffs` | Session context for agent handoff |
| `usage*.ts` | `usage_history`, `call_logs`, `proxy_logs` | Usage tracking |
| `compression*.ts` | `compression_settings`, `compression_combos` | Compression config |

### Module Boundaries

A core architectural rule: **modules don't access each other's tables directly**. To work with another module's data, import the function from that module.

```ts
// ❌ WRONG: direct SQL from another module
db.prepare("SELECT * FROM provider_connections").all();

// ✅ RIGHT: use the providers module function
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

This rule is enforced by code review — there's no static check, but violations are flagged.

---

## Base Schema (17 tables)

`core.ts` defines the 17 base tables in `SCHEMA_SQL`. These are created by migration `001_initial_schema.sql` and form the core schema.

### Core Tables (created in initial migration)

| Table | Purpose | Key columns |
|-------|---------|-------------|
| `provider_connections` | Provider credentials (encrypted) | `id`, `provider`, `auth_type`, `api_key`, `is_active` |
| `provider_nodes` | Provider node routing info | `id`, `type`, `name`, `base_url`, `created_at` |
| `key_value` | General KV store | `namespace`, `key`, `value` |
| `combos` | Routing combo definitions | `id`, `name`, `data`, `sort_order` |
| `api_keys` | API keys for the gateway | `id`, `name`, `key`, `machine_id`, `allowed_models` |
| `db_meta` | Database metadata | `key`, `value` |
| `usage_history` | Request usage records | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs` | Request payloads & responses | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms` |
| `proxy_logs` | Proxy request logs | `id`, `timestamp`, `proxy_type`, `status`, `provider` |
| `domain_fallback_chains` | Model-to-provider chains | `model`, `chain` |
| `domain_budgets` | Per-domain spend budgets | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval` |
| `domain_budget_reset_logs` | Budget reset history | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at` |
| `domain_cost_history` | Per-domain cost tracking | `id`, `api_key_id`, `cost`, `timestamp` |
| `domain_lockout_state` | Domain rate-limit state | `identifier`, `attempts`, `locked_until` |
| `domain_circuit_breakers` | Circuit breaker state per domain | `name`, `state`, `failure_count`, `last_failure_time` |
| `semantic_cache` | LLM response cache | `id`, `signature`, `model`, `prompt_hash`, `response` |
| `quota_snapshots` | Historical quota snapshots | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Additional Tables (added by later migrations)

Subsequent migrations add tables such as:
- `cli_tool_state` (migration 011) — CLI tool state
- `mcp_*` tables — MCP server audit
- `a2a_*` tables — A2A task state
- `usage_*` tables — usage tracking
- `plugin_*` tables — plugin system
- `skill_executions` — skill execution history
- `memory_*` tables — memory system
- `compression_*` tables — compression system
- `webhook_*` tables — webhook delivery log
- `acp_*` tables — Agent Client Protocol
- `oneproxy_*` tables — 1proxy marketplace
- `proxy_assignments` — proxy scope bindings
- `detailed_call_artifacts` — call log artifacts metadata
- `quota_alert_history` — quota alert audit
- `command_code_auth_sessions` — Command Code OAuth sessions

The full list of ~30+ tables is in `src/lib/db/migrations/`.

---

## Migrations

OmniRoute uses **versioned, idempotent migrations** in `src/lib/db/migrations/`. Each migration is a single SQL file named `NNN_description.sql`.

### Migration Naming

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### How Migrations Run

At startup, `migrationRunner.ts`:

1. Creates `_omniroute_migrations` table if not exists
2. Queries for already-applied migrations
3. Applies any new migrations in order, each in a transaction
4. Records each applied migration with timestamp

```ts
// src/lib/db/migrationRunner.ts (simplified)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### Idempotency

Migrations must be **idempotent** — running them twice should be a no-op:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Use `IF NOT EXISTS`, `IF EXISTS`, and `OR IGNORE` / `OR REPLACE` clauses liberally.

### Adding a New Migration

1. **Identify the next number**: `ls src/lib/db/migrations/ | tail -1`
2. **Create the file**: `NNN_my_change.sql`
3. **Use safe DDL**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Backfill data carefully**: use `UPDATE ... WHERE ...` to handle existing rows
5. **Test on a copy**: never run untested migrations on production

Example:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Backwards-incompatible changes** (e.g., dropping columns) are tricky. OmniRoute does NOT support downgrade — once a migration is applied, the schema change is permanent. Plan accordingly.

---

## Encryption at Rest

Sensitive fields (API keys, OAuth tokens, connection strings) are encrypted at rest using **AES-256-GCM**.

### How It Works

```ts
// src/lib/db/encryption.ts (simplified)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Where It's Used

- `provider_connections.api_key` — encrypted at application level
- `provider_connections.access_token`, `refresh_token`, `id_token` — encrypted at application level
- `key_value` entries with `namespace = "secrets"` — encrypted at application level
- `proxy_registry.auth` — encrypted at application level (if present)

### Encryption Key

The encryption key is derived from a **passphrase** (set via `STORAGE_ENCRYPTION_KEY` env var) and a **salt** (stored in the DB). Both are required to decrypt data.

```bash
# Generate a secure passphrase
openssl rand -hex 32

# Set in .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Critical**: Losing the encryption key means losing access to all encrypted data. **Back up the key separately from the database**.

### What's NOT Encrypted

For performance reasons, the following are stored in plaintext:

- Provider display names
- Model definitions (already public)
- Routing rules
- Usage records (no PII)

---

## Encryption Caveats (v3.8.16+)

OmniRoute uses **`migrateLegacyEncryptedString()`** to handle two encryption schemes transparently:

- **Legacy** (pre-v3.5.0): XOR-based "encryption" (not real crypto)
- **Current**: AES-256-GCM with proper IV and auth tag

The migration helper detects the legacy format and re-encrypts with the new scheme on first read. This means you can upgrade an old database without losing credentials.

---

## Read Cache

For frequently-read data (models, providers, settings), `readCache.ts` provides an **in-memory cache**:

```ts
// Cached at startup, invalidated on write
const providers = await getCachedProviders();  // Fast, in-memory
const fresh = await listProviders();           // Slow, hits DB
```

| Cached entity | Cache key | TTL |
|---------------|-----------|-----|
| `models` | `models:v1` | Until write |
| `provider_connections` | `providers:v1` | Until write |
| `settings` | `settings:v1` | Until write |
| `combos` | `combos:v1` | Until write |

Cache is invalidated on every write to the corresponding table.

---

## Backup and Recovery

### Manual Backup

```bash
# Use the CLI to create a local backup
omniroute backup create --name pre-migration

# Or via the API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

The backup file includes:

- All DB tables (serialized to JSON)
- Call log artifacts (base64-encoded, optional)
- Settings + secrets (encrypted)
- Plugin configuration

### Restore

```bash
# Via CLI
omniroute restore pre-migration

# Via API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Warning**: Restore overwrites the entire DB. Stop all clients first.

### Automated Backups

```bash
# Enable automated daily backups via CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

### SQLite Hot Backup

For zero-downtime backup of a live DB:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

This uses SQLite's online backup API — safe to run while OmniRoute is running.

---

## Performance Tuning

### WAL Mode

WAL is enabled by default. For high-write workloads, consider:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
PRAGMA journal_size_limit = 67108864;  -- 64MB WAL cap
```

### Indexes

Key indexes for performance (auto-created by migrations):

- `idx_models_provider` — model lookups by provider
- `idx_combo_targets_combo_id` — combo target expansion
- `idx_usage_history_api_key_timestamp` — usage analytics
- `idx_quota_snapshots_api_key_window` — quota tracking
- `idx_call_logs_timestamp` — call log queries

To add a new index, create a migration:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Memory-Mapped I/O

For very large databases (>10GB), memory mapping can be adjusted via SQLite pragma:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Compaction

Long-running OmniRoute instances benefit from occasional `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Run monthly during low-traffic windows. (WAL mode reduces the need, but doesn't eliminate it.)

---

## Health Check

`src/lib/db/healthCheck.ts` provides **DB-level health diagnostics**:

```bash
GET /api/db/health

Returns:

```json
{
  "status": "healthy",
  "checks": {
    "writable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "orphaned_artifacts": { "status": "warn", "count": 12 },
    "table_sizes": {
      "usage_history": { "rows": 12345, "size_mb": 12.3 },
      "call_logs": { "rows": 567, "size_mb": 2.1 }
    }
  }
}
```

Run `PRAGMA integrity_check` to detect corruption:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Should print: ok
```

If it returns anything other than `ok`, **stop using the database immediately** and restore from backup.

---

## Disaster Recovery

### Scenario 1: WAL File Lost

The `-wal` file is missing but `-shm` and main DB are intact:

```bash
# Recovers automatically on next open
omniroute
```

If SQLite can't auto-recover:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenario 2: Main DB File Corrupted

Restore from backup:

```bash
omniroute sync pull --merge   # or: omniroute backup restore <backup-id>
```

### Scenario 3: Encryption Key Lost

**No recovery possible** without the key. The encrypted fields are unreadable. Re-add all providers manually with new credentials.

> **Mitigation**: Always back up the encryption key separately, ideally in a password manager or KMS.

### Scenario 4: Disk Full

SQLite will return `SQLITE_FULL` errors. Free disk space, then:

```bash
# Checkpoint WAL to free up space
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Common Operations

### Inspect a Table

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Count Rows in All Tables

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```


### Reset (Wipe) All Data

```bash
# Stop OmniRoute first
omniroute stop

# Delete the DB file
rm ~/.omniroute/storage.sqlite*

# Restart (will recreate empty DB)
omniroute
```

For a **selective** reset (keep providers, wipe usage):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Export Single Table

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Troubleshooting

### "Database is locked"

Another process is holding a write lock. Either:

- Wait for the other process to finish (check `lsof | grep storage.sqlite`)
- Kill the other process
- If persistent, restart OmniRoute

### "Foreign key constraint failed"

A domain module is violating referential integrity. Check:

- Orphaned rows in dependent tables
- Cascading deletes that didn't propagate
- Recent migration that changed a foreign key

Run `PRAGMA foreign_key_check;` to find violations.

### "Out of memory"

SQLite's memory-mapped I/O is exceeding the OS limit. Reduce via SQLite pragma:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB instead of 256MB
```

Or disable:

```sql
PRAGMA mmap_size = 0;
```

### "Migration failed mid-way"

The migration ran in a transaction, so it should have rolled back. If not:

1. **Stop OmniRoute** (prevent further attempts)
2. **Check the DB state** with `sqlite3`
3. **Manually fix** the partial migration
4. **Re-run** OmniRoute (the migration will be retried)

To prevent this, always test migrations on a copy first.

---

## See Also

- [USAGE_QUOTA_GUIDE.md](../features/USAGE_QUOTA_GUIDE.md) — usage tables
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — health monitoring
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — release flow
- Source: `src/lib/db/` (80+ files, ~25K LOC)
