---
title: "ADR: Pluggable persistence boundary"
status: proposed
lastUpdated: 2026-07-23
---

# ADR: Pluggable persistence boundary

- **Status:** Proposed — requires maintainer approval before runtime work begins
- **Tracking issue:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Scope:** Persistence architecture only; this decision does not add or select an external database

## Context

OmniRoute currently presents domain-oriented persistence functions from `src/lib/db/`, while the
shared connection returned by `src/lib/db/core.ts` implements the synchronous `SqliteAdapter`
contract in `src/lib/db/adapters/types.ts`. That adapter supports several SQLite runtimes, but its
surface remains SQLite-shaped: synchronous prepared statements, `pragma`, deferred and immediate
transactions, native/file-copy backup, checkpoint, and a local database handle.

The current startup and recovery path also owns the SQLite file lifecycle. `src/lib/db/core.ts`
resolves `storage.sqlite`, maintains one process-global adapter, checkpoints WAL, preserves selected
tables during recovery, and removes SQLite companion files when rebuilding a database. Driver
selection in `src/lib/db/adapters/driverFactory.ts` chooses among the supported SQLite runtimes; it
is not an external-backend abstraction.

Schema evolution is similarly coupled. `src/lib/db/migrationRunner.ts` applies numbered SQL files,
probes `sqlite_master` and `PRAGMA table_info`, detects optional FTS5 support, and runs migration
work in SQLite transactions. Operational modules such as `src/lib/db/backup.ts` and
`src/lib/db/optimizationSettings.ts` use backup, `PRAGMA`, WAL, page-size, auto-vacuum, and `VACUUM`
semantics directly.

These are valid properties of the embedded SQLite deployment. They should remain available without
forcing PostgreSQL or MySQL to emulate a SQLite API.

## Decision

Adopt a two-level persistence boundary for portable durable state:

1. **Domain repository contracts** define the persistence operations needed by business and routing
   code. Callers depend on domain behavior and domain data, not SQL text, prepared statements,
   database files, or dialect objects.
2. **An internal asynchronous backend contract** supports repository implementations with
   transaction contexts, health/readiness, migration coordination, backend capabilities, and
   classified errors. The exact TypeScript surface will be proposed with the first implementation
   PR and proven by conformance tests; this ADR intentionally does not freeze a speculative API.

SQLite remains the default implementation. The existing SQLite driver cascade and synchronous
`SqliteAdapter` stay behind the SQLite repository implementation while domains are migrated in
small vertical slices. No user is required to configure an external service.

PostgreSQL is the first proposed external implementation after the repository boundary is proven
against SQLite. MySQL follows as a peer implementation against the same conformance suite rather
than as a second business-logic fork.

## Boundary rules

### Portable repository surface

A portable repository may expose:

- domain reads and writes;
- explicit atomic operations and transaction-scoped repository access;
- compare/update or lease operations where concurrency semantics are part of the domain;
- backend-neutral pagination, ordering, and constraint errors.

Backend health, readiness, and migration coordination belong to the internal backend/operational
contract rather than to individual domain repositories.

A portable repository must not expose:

- `prepare`, `get`, `all`, `run`, or raw driver handles;
- `PRAGMA`, WAL checkpoint modes, `VACUUM`, or page/cache tuning;
- SQLite file paths, companion files, or file-copy backup;
- `lastInsertRowid` as a cross-backend domain contract;
- FTS5 or `sqlite-vec` syntax;
- a generic dialect escape hatch used by normal business code.

### Backend capability surface

Backend-specific behavior remains explicit and discoverable. SQLite-only maintenance stays behind
its own implementation and operational interface, including:

- runtime driver selection;
- WAL checkpoint and SQLite shutdown behavior;
- page-size, cache-size, and auto-vacuum settings;
- database-file backup, restore, and recovery;
- SQLite schema introspection;
- FTS5 and `sqlite-vec` integration.

An external backend is not required to imitate those features. Repositories must either use a
portable capability, provide a backend-specific implementation with documented behavior, or report
that a capability is unavailable.

## Transaction and migration model

Repository APIs define the atomic business operation; callers do not select a SQL transaction mode.
Each operation must define its observable concurrency guarantees: protected invariants, conflict
detection, retry classification, idempotency expectations, and transaction-context propagation.
Implementations may use different transaction and isolation mechanisms only when those observable
guarantees remain equivalent. SQLite may continue using its current deferred or immediate
transaction behavior internally where it satisfies the operation's contract.

External backends require explicit migration ownership so multiple application replicas cannot race
the same schema change. Backend migration histories may share logical milestones, but SQLite SQL
files are not assumed to be portable or reusable as another dialect.

## Cross-backend conformance semantics

Conformance tests must cover behavior, not only repository method signatures. Each migrated domain
must define and verify:

- timestamp timezone, precision, and serialization;
- `NULL` ordering, collation, and case-sensitivity expectations;
- JSON representation and comparison behavior;
- integer, decimal, and monetary precision;
- stable ordering and deterministic tie-breakers for pagination;
- ID generation without relying on SQLite row IDs;
- uniqueness and foreign-key violation classification;
- affected-row behavior for no-op, compare/update, and delete operations;
- concurrent-write outcomes, retryable conflicts, and idempotent retries.

If a domain cannot state equivalent observable semantics, it is not yet portable and must remain
backend-specific until that contract is designed.

## Compatibility requirements

Any implementation following this ADR must preserve these properties:

- SQLite remains the zero-configuration default.
- Existing SQLite files and migration history remain readable.
- npm, Electron, Docker, and restricted-runtime SQLite fallbacks retain their current startup path.
- Stored provider credentials continue to use the existing application encryption behavior.
- A repository migration does not silently change routing, quota, API-key, or audit semantics.
- Backup and recovery behavior is documented per backend rather than presented as universal.
- A clean SQLite-only installation does not load or require an external database driver.

## Delivery sequence

1. Publish a reproducible SQLite coupling inventory as a separate review artifact.
2. Introduce the first domain repository contracts and conformance tests.
3. Adapt the existing SQLite implementation behind those contracts without changing defaults.
4. Subject to maintainer approval, add PostgreSQL as the first external implementation for one
   bounded control-plane slice.
5. Extend shared state only after concurrent-write and migration-ownership tests exist.
6. Add an offline, validated SQLite-to-external migration path before advertising database switching.
7. Add MySQL against the proven repository and backend contracts.

Each runtime step is a separate, reviewable PR. A later step must not be used to justify merging an
unproven abstraction in an earlier step.

## First implementation slice

The first runtime slice should be selected after the coupling inventory is reviewed. Provider
connections, API keys, combos, and routing configuration are candidates because their base tables
are visible in `src/lib/db/core.ts`, but this ADR does not approve a table list or a migration PR.
The slice must include:

- SQLite behavior-preservation tests;
- repository conformance tests;
- explicit transaction boundaries;
- encryption and redaction verification for stored credentials;
- no change to the default startup configuration.

## Alternatives considered

### Add PostgreSQL beneath `SqliteAdapter`

Rejected. `SqliteAdapter` is a compatibility layer for SQLite runtimes and exposes SQLite-specific
operations. Emulating that surface would leak synchronous and dialect-specific assumptions into a
new backend.

### Expose a generic query/execute API to all domains

Rejected as the primary boundary. It would centralize connection handling but leave SQL dialect,
transaction, and table coupling in business modules. A low-level backend primitive may exist inside
repository implementations, not as the application-facing persistence API.

### Rewrite all persistence before validating one slice

Rejected. The current persistence surface is broad and includes file lifecycle, recovery, search,
and operational settings. Vertical slices provide reviewable behavior and rollback boundaries.

### Replace SQLite as the default

Rejected. Embedded and desktop deployments depend on the current zero-service startup model. An
external backend is opt-in.

### Use Redis as the durable authority

Rejected. Redis may support explicitly ephemeral coordination, cache, or counters, but it does not
replace the durable repository contract described here.

## Consequences

### Positive

- Business code gains a stable persistence seam independent of database dialect.
- SQLite behavior is tested before an external backend defines the abstraction.
- PostgreSQL and MySQL share contracts and tests instead of duplicating domain logic.
- SQLite-only capabilities remain first-class rather than becoming leaky compatibility shims.
- Multi-replica migration and transaction behavior becomes an explicit design concern.

### Costs and risks

- Repository extraction requires incremental call-site migration.
- Async boundaries may propagate through currently synchronous service code.
- Cross-backend semantics require conformance tests beyond SQL syntax compatibility.
- Backup, search, vector storage, and maintenance remain capability-specific.
- Running more than one persistence implementation increases CI and operational support cost.

## Non-goals

This ADR does not:

- add a database dependency, environment variable, schema, or migration;
- change the live SQLite singleton or driver cascade;
- promise PostgreSQL or MySQL support in a specific release;
- make FTS5, `sqlite-vec`, backup files, or SQLite maintenance portable;
- define active-active readiness before shared-state and coordination tests exist;
- approve a one-shot rewrite of `src/lib/db/`.

## Open questions for maintainer approval

1. Is the repository plus internal async backend boundary the preferred direction, or should
   external persistence live behind a separate control-plane service?
2. Is PostgreSQL acceptable as the first external implementation after SQLite conformance?
3. Which domain should be the first bounded repository slice?
4. Which state must be shared for the first multi-replica milestone, and which remains node-local?
5. What compatibility window is required for an interrupted or rolled-back repository migration?

Until these questions are resolved, this document is a proposal and no runtime refactor is implied.
