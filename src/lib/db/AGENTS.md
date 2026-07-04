# src/lib/db/ — SQLite Persistence Layer

**Purpose**: Domain-driven SQLite persistence. Each module owns a specific table set. Schema migrations are versioned and idempotent. No raw SQL in routes — all ops go through `src/lib/db/` modules.

Live count: `ls src/lib/db/*.ts | wc -l` (currently 95). Migrations: `ls src/lib/db/migrations/*.sql | wc -l` (currently 110).

---

## Core Infrastructure

- **`core.ts`** — `getDbInstance()` returns singleton `better-sqlite3` with WAL journaling. Exports `rowToCamel()` (snake_case → camelCase), `encryptConnectionFields()` for provider credentials at rest. `SCHEMA_SQL` defines **17 base tables** (verify: `grep -c "CREATE TABLE" src/lib/db/core.ts` minus 1 for `_omniroute_migrations`).
- **`migrationRunner.ts`** — Applies versioned SQL files from `db/migrations/` inside transactions. Tracks applied migrations in `_omniroute_migrations`. Each migration is idempotent.
- **`db/migrations/`** — 110 SQL files (`001_initial_schema.sql` → `110_*.sql`). Each runs in a transaction, never fails partially.
- **`localDb.ts`** — Re-export layer only. Never add logic here.

## Key Domain Modules

| Module                 | Tables / Scope            | Responsibility                                      |
| ---------------------- | ------------------------- | --------------------------------------------------- |
| `providers.ts`         | `provider_connections`    | OAuth/API key provider registration and credentials |
| `models.ts`            | `models`                  | Model definitions, capabilities, pricing            |
| `combos.ts`            | `combos`, `combo_targets` | Combo routing configs, target ordering              |
| `apiKeys.ts`           | `api_keys`                | API key lifecycle, scopes, quota tracking           |
| `settings.ts`          | `settings`                | KV store for system configuration                   |
| `secrets.ts`           | `secrets`                 | Encrypted secret storage (API keys at rest)         |
| `quotaSnapshots.ts`    | `quota_snapshots`         | Historical quota usage for analytics                |
| `quotaPools.ts`        | `quota_pools`             | Quota-Share pool management                         |
| `creditBalance.ts`     | `credit_balance`          | Per-provider credit tracking                        |
| `compression.ts`       | compression settings      | Prompt compression pipeline config                  |
| `compressionCombos.ts` | `compression_combos`      | Per-combo compression pipeline assignments          |
| `evals.ts`             | eval tables               | Eval framework persistence                          |
| `webhooks.ts`          | `webhooks`                | Event-driven webhook subscriptions and logs         |
| `reasoningCache.ts`    | reasoning cache           | Hybrid in-memory + SQLite reasoning replay          |
| `skills.ts`            | `skills`                  | Skill registration and metadata                     |
| `plugins.ts`           | `plugins`                 | Plugin marketplace state                            |
| `gamification.ts`      | gamification tables       | Levels, badges, leaderboard                         |
| `notion.ts`            | notion tables             | Notion integration state                            |
| `obsidian.ts`          | obsidian tables           | Obsidian vault integration state                    |
| `files.ts`             | file storage              | Uploaded file management                            |
| `batches.ts`           | batch processing          | Batch job tracking                                  |
| `featureFlags.ts`      | feature flags             | Runtime feature flag overrides                      |
| `backup.ts`            | backup ops                | Serialize/deserialize entire DB state               |
| `cleanup.ts`           | cleanup ops               | Stale data purging                                  |
| `healthCheck.ts`       | health ops                | DB health monitoring                                |
| `databaseSettings.ts`  | database settings         | DB-level configuration                              |

Full list: `ls src/lib/db/*.ts | wc -l` (95 files). Drift detection: `npm run check:docs-counts`.

## Encryption & Security

- **Sensitive fields** (API keys, OAuth tokens, connection strings) encrypted at rest using AES-256-GCM
- **`encryptConnectionFields()`** in `core.ts` — automatic encryption when storing provider credentials
- **`secrets.ts`** — dedicated encrypted store for long-term secret handling
- **Never log** SQLite encryption keys or raw secrets; always use redacted values in logs

## Adding a New Domain Module

1. Create `src/lib/db/[module].ts` with CRUD functions
2. Export from `src/lib/localDb.ts` (add re-export)
3. If new tables: create migration in `db/migrations/NNN_[description].sql`
4. Migration runs automatically at startup via `migrationRunner.ts`
5. Add unit tests in `tests/unit/db/`

## Anti-Patterns

- Raw SQL in routes — always use domain module functions
- Direct `prepare()` statements outside `db/` — breaks modularity
- Adding logic to `localDb.ts` — re-export layer only
- Barrel-importing from `localDb.ts` — import specific modules instead
- Skipping migrations for schema changes — all changes go through `db/migrations/`
