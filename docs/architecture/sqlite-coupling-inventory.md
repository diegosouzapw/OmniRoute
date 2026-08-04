---
title: "SQLite coupling inventory"
status: measured-snapshot
lastUpdated: 2026-07-23
---

# SQLite coupling inventory

- **Tracking issue:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Snapshot revision:** `9a3b605f3420ae3ab08bd93d6443034f03a1bcbc`
- **Scanned-corpus SHA-256:** `72334620a7a18a42bcede1643fb2fdf95da6eae9ffa66a891ae14ed633ad43f6`
- **Purpose:** Measure the current persistence cut lines before proposing repository interfaces
- **Runtime impact:** None; this document and its audit script do not change database behavior

## How to reproduce

From the repository root:

```bash
node scripts/check/audit-sqlite-coupling.mjs
node scripts/check/audit-sqlite-coupling.mjs --json
node --test scripts/check/audit-sqlite-coupling.test.mjs
```

The script reads tracked files from Git, scans non-test source under `src/`, `open-sse/`,
`electron/`, and `bin/`, and scans migration SQL under `src/lib/db/migrations/`. It excludes the
top-level test tree, co-located test directories, test/spec source files, and paths outside those
configured source roots (including documentation and scripts).

The script refuses to run if tracked files in those source roots differ from `HEAD`. It reports
both the audit-tool revision and a SHA-256 over the ordered path/content corpus. The snapshot above
was taken from the listed source revision; this PR changes only excluded documentation and script
paths, so rerunning from the clean PR branch produces the same corpus digest.

This is a **lexical inventory**, not a TypeScript or SQL semantic analysis:

- counts are occurrences of defined patterns, not counts of distinct SQL statements;
- adapter-call and direct-singleton patterns mask comments and literal contents first;
- template-literal contents, including embedded expressions, are excluded from those code-syntax
  counts;
- the lightweight masker is not a JavaScript parser, so unusual regular-expression literal syntax
  can still require manual review;
- comments and string literals can contribute to dialect-signal counts, which intentionally search
  raw text for embedded SQL;
- a `.prepare()` match outside `src/lib/db/` is a review lead, not proof that the call should move;
- calls hidden behind a differently named wrapper may not be counted;
- file counts are deduplicated, while occurrence counts are not.

The JSON output includes every matching path so reviewers can inspect or reclassify individual
results rather than trusting totals alone.

## Snapshot scope

At the recorded revision, the script scanned:

- 3,830 tracked non-test source files;
- 129 migration SQL files.

The source-file count is intentionally broad because the goal is to find persistence coupling that
has escaped the nominal database directory, including CLI and proxy/runtime code.

## Boundary signals

| Signal                                                                           | Files | Occurrences |
| -------------------------------------------------------------------------------- | ----: | ----------: |
| Direct `getDbInstance()` call syntax outside comments/literals and `src/lib/db/` |    45 |         150 |
| `localDb` import consumers                                                       |   211 |           — |
| `SqliteAdapter` type consumers outside comments/literals and `src/lib/db/`       |     3 |           — |

The `localDb` barrel already gives many callers a domain-function seam, but
`src/lib/localDb.ts` remains a re-export layer rather than a backend contract. The 45 direct
singleton consumers are the clearest first review set because they bypass that logical seam and
hold an adapter-shaped handle directly.

The three non-test source files outside `src/lib/db/` that mention the `SqliteAdapter` type in code
syntax are:

- `src/app/api/db-backups/import/route.ts`;
- `src/lib/compliance/index.ts`;
- `src/lib/compliance/noLog.ts`.

These are not equivalent migration tasks. Backup import is capability-specific; compliance
persistence may be portable domain state. The future boundary should classify them rather than
moving all three mechanically.

## Adapter-shaped call syntax

| Signal            | Occurrences | Files | Outside `src/lib/db/` occurrences | Outside files |
| ----------------- | ----------: | ----: | --------------------------------: | ------------: |
| `.prepare()`      |       1,219 |   163 |                               252 |            52 |
| `.transaction()`  |          62 |    40 |                                12 |            10 |
| `.immediate()`    |           3 |     3 |                                 0 |             0 |
| `.pragma()`       |          39 |    11 |                                 6 |             4 |
| `.backup()`       |           6 |     5 |                                 3 |             3 |
| `.checkpoint()`   |           0 |     0 |                                 0 |             0 |
| `lastInsertRowid` |          15 |     7 |                                 1 |             1 |

This table shows why `SqliteAdapter` is a SQLite runtime compatibility layer rather than a portable
backend abstraction. Its synchronous statement and transaction shape is widely used, and some of
that shape is visible outside the nominal database layer.

The top direct `getDbInstance()` consumers outside `src/lib/db/` at this revision are:

| File                                               | Occurrences |
| -------------------------------------------------- | ----------: |
| `src/lib/proxySubscription/subscriptionService.ts` |          12 |
| `src/lib/semanticCache.ts`                         |          10 |
| `src/lib/usage/callLogs.ts`                        |           9 |
| `src/lib/cloudAgent/db.ts`                         |           8 |
| `src/lib/memory/store.ts`                          |           8 |
| `src/lib/memory/vectorStore.ts`                    |           8 |
| `src/lib/modelsDevSync.ts`                         |           8 |
| `src/lib/gamification/badges.ts`                   |           5 |
| `src/lib/memory/retrieval.ts`                      |           5 |
| `src/lib/pricingSync.ts`                           |           5 |
| `src/lib/skills/registry.ts`                       |           5 |
| `src/lib/usage/usageHistory.ts`                    |           5 |

The list spans control-plane configuration, usage/audit data, cache, memory/vector search, skills,
gamification, and CLI/provider support. A single generic SQL adapter would preserve this spread;
domain repositories provide a way to reduce it slice by slice.

## SQLite dialect and lifecycle signals

| Signal                | Occurrences | Files |
| --------------------- | ----------: | ----: |
| `PRAGMA` text         |          97 |    41 |
| `sqlite_master`       |          14 |    11 |
| `BEGIN IMMEDIATE`     |           2 |     2 |
| `INSERT OR REPLACE`   |          83 |    45 |
| `AUTOINCREMENT`       |          34 |    24 |
| `datetime('now')`     |         171 |    68 |
| `VACUUM`              |          39 |    10 |
| `wal_checkpoint`      |          13 |     7 |
| `fts5`                |          43 |     8 |
| `vec0`                |           7 |     1 |
| `last_insert_rowid()` |           1 |     1 |

These values are text signals and include comments where present. They are useful for locating
portability work, not for estimating implementation effort by multiplication.

Verified high-coupling areas include:

- `src/lib/db/core.ts`: singleton lifecycle, SQLite file paths, WAL checkpoint, recovery, schema,
  compaction, and backup creation;
- `src/lib/db/migrationRunner.ts`: numbered SQL migration execution, `sqlite_master`,
  `PRAGMA table_info`, transaction behavior, and optional FTS5 handling;
- `src/lib/db/optimizationSettings.ts`: page/cache settings, auto-vacuum, WAL transitions, and
  `VACUUM`;
- `src/lib/db/backup.ts`: database backup and restore lifecycle;
- `src/lib/db/schemaColumns.ts`: SQLite schema introspection and compatibility columns;
- `src/lib/memory/vectorStore.ts` and `src/lib/memory/retrieval.ts`: `vec0` and FTS5 behavior;
- `src/lib/db/adapters/`: compatibility implementations for the supported SQLite runtimes.

These areas should not be forced through a lowest-common-denominator repository interface. They
need explicit SQLite capabilities or separate backend implementations.

## Migration coupling

The snapshot contains 129 tracked migration SQL files. `src/lib/db/migrationRunner.ts` does more
than execute ordered files: it owns migration discovery, version history, duplicate-version safety,
schema probes, FTS5 capability checks, pre-migration safety, and SQLite transaction execution.

Consequently:

- another SQL dialect cannot safely reuse the migration files unchanged;
- external backends need their own migration implementation and schema history;
- logical migration milestones may be shared, but physical SQL and capability probes remain
  backend-specific;
- multi-replica operation requires migration ownership or locking before an external backend is
  considered ready.

## Recommended cut lines

### 1. Keep SQLite runtime compatibility intact

Do not replace `SqliteAdapter` or the driver cascade in the first repository PR. Keep file recovery,
WAL, backup, optimization, FTS5, and vector behavior behind the current SQLite implementation.

### 2. Start with direct singleton consumers

Use the 45-file direct-consumer list as the initial review queue. Classify each file as:

- portable domain state;
- backend-specific maintenance or search;
- process-local or rebuildable state;
- legacy access that should call an existing domain module.

Classification must precede interface design. A path appearing in the inventory is not, by itself,
a mandate to create a repository.

### 3. Prove repositories with SQLite first

For one bounded domain:

1. define behavior-oriented repository operations;
2. adapt current SQLite queries behind that repository;
3. run behavior and transaction conformance tests against SQLite;
4. migrate callers without changing the default runtime;
5. only then implement the same repository for an external backend.

### 4. Separate portable control-plane state from capability-specific data

Provider connections, API keys, combos, and routing configuration are candidates for the first
portable slice, subject to maintainer approval and a table-ownership review. Memory vector search,
SQLite file backup/recovery, and database optimization are poor first slices because their behavior
is deliberately SQLite-specific.

### 5. Treat usage, quota, affinity, and audit as a later coordination slice

These domains have concurrency and volume semantics beyond CRUD. Their repository contracts should
be designed together with multi-replica transaction, lease, retention, and failure-mode tests rather
than copied mechanically from current SQL.

## What this inventory does not decide

This inventory does not:

- approve PostgreSQL or MySQL support;
- define repository TypeScript interfaces;
- choose the first table or domain to migrate;
- claim every lexical match is a defect;
- claim the current module boundaries are ineffective;
- change SQLite, migrations, backup, search, or runtime behavior.

Its purpose is to make the next design discussion evidence-based and reproducible.
