---
title: "MySQL conformance semantics and failure-mode matrix"
status: proposed-test-specification
lastUpdated: 2026-07-30
---

# MySQL conformance semantics and failure-mode matrix

- **Tracking issue:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **Governing proposal:** [Pluggable persistence boundary](persistence-backend-boundary.md)
- **Measured baseline:** [SQLite coupling inventory](sqlite-coupling-inventory.md)
- **Target:** MySQL 8.0 with InnoDB
- **Runtime impact:** None. This document adds no driver, dependency, configuration, schema,
  migration, or support claim.

## 1. Purpose and normative language

The persistence-boundary ADR requires conformance tests to compare observable behavior, not only
repository method signatures. This document turns the MySQL/InnoDB differences that can change
OmniRoute behavior into an implementation-ready specification. It provides:

- a required server and session profile;
- evidence from the current SQLite implementation;
- minimal SQL probes that reviewers can reproduce independently;
- a backend-neutral error and retry taxonomy;
- normative decisions that a repository contract must make;
- executable acceptance specifications for a future shared conformance harness;
- a focused acceptance profile for combo definitions and model-to-combo mappings.

The terms **MUST**, **MUST NOT**, **SHOULD**, and **MAY** are normative. A proposed MySQL adapter is
not conformant merely because its SQL succeeds. It is conformant only when the same repository
fixture produces the same domain result, durable state, atomicity, ordering, and classified failure
as the SQLite implementation.

## 2. Scope and non-goals

### 2.1 In scope

This specification covers portable durable-state behavior for:

- create, read, update, delete, and missing-row results;
- uniqueness, collation, case and accent sensitivity, and `NULL`;
- stable ordering and pagination;
- no-op writes and affected-row reporting;
- insert, identity-preserving upsert, and replacement;
- IDs, JSON, exact numerics, and timestamps;
- transactions, deadlocks, lock waits, disconnects, and retry boundaries;
- foreign keys and atomic related-record changes;
- migration ownership, implicit DDL commits, recovery, and readiness.

### 2.2 Out of scope

This specification does not:

- approve PostgreSQL or MySQL runtime support;
- select a Node.js MySQL driver or pool;
- define a public environment variable or configuration UI;
- define final TypeScript repository interfaces;
- add physical MySQL schema or migration files;
- make SQLite maintenance, FTS5, `sqlite-vec`, backup files, or WAL portable;
- replace domain-specific acceptance criteria;
- permit runtime work while the governing ADR remains unapproved.

## 3. Evidence from the current repository

The current implementation establishes behavior that a portable contract must either preserve or
explicitly revise. These are source-backed observations, not proposed MySQL schema.

### 3.1 Combo identity and lookup

`src/lib/db/migrations/001_initial_schema.sql` defines `combos.id` as the primary key and
`combos.name` as unique. `src/lib/db/combos.ts` currently:

- generates UUIDs in the application;
- generates timestamps with `new Date().toISOString()`;
- performs exact name lookup first;
- provides a separate `COLLATE NOCASE` fallback lookup;
- lists by `sort_order ASC, name COLLATE NOCASE ASC`;
- treats an update of a missing ID as `null`;
- treats deletion of a missing ID as `false`;
- updates the JSON payload and deduplicated columns together;
- reorders all selected rows in one SQLite transaction.

Those choices imply that a future MySQL slice does not need database-generated numeric IDs for
combos, but it must still define Unicode collation, complete tie-breakers, update/delete results, and
reorder concurrency.

### 3.2 Model-to-combo mapping behavior

`src/lib/db/migrations/010_model_combo_mappings.sql` defines a foreign key from
`model_combo_mappings.combo_id` to `combos.id` with `ON DELETE CASCADE`.
`src/lib/db/modelComboMappings.ts` currently:

- generates mapping UUIDs and ISO timestamps in the application;
- lists by `priority DESC, created_at ASC`;
- returns a separate total count for paginated results;
- maps integer `0`/`1` values to booleans;
- treats a missing update as `null` and a missing delete as `false`;
- resolves the first enabled matching pattern;
- skips malformed combo JSON rather than failing resolution.

The current list and resolution order lacks a unique final tie-breaker. The MySQL implementation
MUST NOT preserve that accidental nondeterminism. Before portability is claimed, the contract must
add `id ASC` (or another unique stable key) after `created_at ASC` and the SQLite implementation
must adopt the same order.

### 3.3 Existing SQLite-specific signals

The measured SQLite coupling inventory records widespread use of synchronous prepared statements,
`INSERT OR REPLACE`, `lastInsertRowid`, SQLite transactions, and SQLite lifecycle operations. A
future adapter must not translate those tokens mechanically. In particular:

- `INSERT OR REPLACE` is delete-then-insert conflict handling, not an update;
- `changes` is a driver result, not a portable domain result;
- `COLLATE NOCASE` is not equivalent to a modern MySQL Unicode collation;
- SQLite numbered migration SQL is not reusable as MySQL migration SQL.

## 4. Required MySQL deployment and session profile

A conformance run MUST fail during backend initialization if the effective profile is outside the
supported envelope. Silently inheriting server defaults would make behavior depend on an operator's
installation history.

| Property                 | Required profile                                                                   | Verification                                                                         | Failure class         |
| ------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | --------------------- |
| Server family            | Oracle MySQL 8.0.x until another family passes the same suite                      | `SELECT VERSION()` and server metadata                                               | `unsupported`         |
| Storage engine           | `InnoDB` for every portable table                                                  | `information_schema.tables`                                                          | `schema_incompatible` |
| Character set            | `utf8mb4` for schema, tables, and portable text columns                            | `information_schema.schemata`, `tables`, and `columns`                               | `schema_incompatible` |
| Identity collation       | Explicit per identity column; never inherited                                      | `information_schema.columns.collation_name`                                          | `schema_incompatible` |
| SQL mode                 | Strict mode and the engine-substitution guard; adapter records the effective value | `SELECT @@SESSION.sql_mode`                                                          | `unsupported`         |
| Transaction isolation    | Explicitly selected and verified by the backend                                    | `SELECT @@SESSION.transaction_isolation`                                             | `unsupported`         |
| Session time zone        | UTC                                                                                | `SELECT @@SESSION.time_zone`                                                         | `unsupported`         |
| Autocommit               | Known pool default; repository transactions set boundaries explicitly              | `SELECT @@SESSION.autocommit`                                                        | `unsupported`         |
| Connection character set | `utf8mb4`                                                                          | `SELECT @@character_set_client, @@character_set_connection, @@character_set_results` | `unsupported`         |
| Found-rows behavior      | One fixed pool setting, but repository results remain independent of it            | Driver/pool configuration plus conformance probe                                     | `unsupported`         |
| Foreign-key checks       | Enabled for normal runtime and conformance tests                                   | `SELECT @@SESSION.foreign_key_checks`                                                | `unsupported`         |
| InnoDB page size         | Recorded before validating indexed key lengths                                     | `SELECT @@innodb_page_size`                                                          | `schema_incompatible` |

The backend readiness report SHOULD expose the verified profile without credentials. It MUST NOT
log connection strings or secrets.

### 4.1 Initialization probe

The adapter acceptance suite should run an equivalent of the following read-only probe on a newly
leased connection:

```sql
SELECT
  VERSION() AS server_version,
  @@SESSION.sql_mode AS sql_mode,
  @@SESSION.transaction_isolation AS transaction_isolation,
  @@SESSION.time_zone AS time_zone,
  @@SESSION.autocommit AS autocommit,
  @@SESSION.foreign_key_checks AS foreign_key_checks,
  @@character_set_client AS character_set_client,
  @@character_set_connection AS character_set_connection,
  @@character_set_results AS character_set_results,
  @@innodb_page_size AS innodb_page_size;
```

A pool MUST apply and verify session settings on every newly created physical connection. Applying
settings only to the first connection is insufficient.

## 5. Normative semantic matrix

### 5.0 Observable SQLite/MySQL difference summary

This table is the review index for the detailed rules below. It distinguishes current or common
backend behavior from the portable result the repository must expose. The MySQL column describes
InnoDB under the verified session profile; it must not be read as permission to inherit an
unverified server default.

| Concern                | SQLite-shaped behavior                                                                                                                   | MySQL/InnoDB behavior                                                                                                                      | Required repository contract                                                                                                       |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| Text identity          | Binary comparison by default; current code opts into ASCII-oriented `NOCASE` for selected reads and sorts                                | Equality, uniqueness, and sort order follow the selected column/expression collation                                                       | Declare byte-exact identity separately from named insensitive lookup and display order                                             |
| Nullable unique key    | Multiple SQL `NULL` values can pass a plain unique constraint                                                                            | Multiple SQL `NULL` values can pass a plain unique index                                                                                   | Enforce any "one logical null" invariant atomically outside a plain unique key                                                     |
| Unordered/tied results | No total order without a complete `ORDER BY`                                                                                             | No total order without a complete `ORDER BY`                                                                                               | Define `NULL` position and a unique final tie-breaker for every portable list                                                      |
| No-op update           | Driver change count reflects SQLite's statement behavior                                                                                 | Changed-row count differs from matched-row mode for identical assignments                                                                  | Return domain outcomes independently of raw affected-row counts                                                                    |
| Conflict write         | `INSERT OR REPLACE` can delete then insert                                                                                               | Duplicate-key upsert updates one selected conflict                                                                                         | Classify every operation as insert-only, identity-preserving upsert, or replacement                                                |
| Generated identity     | SQLite row IDs and driver-local last-insert state are connection-bound                                                                   | Generated IDs and last-insert state are connection-bound                                                                                   | Retrieve identity in the insert operation/lease and use stable idempotency identity on retry                                       |
| JSON                   | Existing combo payloads are text and malformed legacy text can be observed                                                               | Native `JSON` validates and normalizes its representation                                                                                  | Choose text or typed JSON deliberately and compare the declared domain representation                                              |
| Exact values/time      | Current modules commonly serialize JavaScript values and ISO UTC text                                                                    | Driver conversion can lose large integers/decimals; temporal types depend on type and session zone                                         | Fix exact representations, UTC policy, and precision across backends                                                               |
| Concurrency/isolation  | Deferred transactions and a database-wide single-writer model shape conflicts; read visibility depends on transaction mode and WAL state | InnoDB defaults to `REPEATABLE READ`, uses MVCC snapshots for consistent reads, and permits concurrent writers on different locked records | Select and verify isolation, then test domain-visible reads, conflicts, and retry boundaries rather than relying on either default |
| DDL/migrations         | SQLite migration sequences can be wrapped according to SQLite transaction rules                                                          | DDL commonly commits implicitly; one atomic DDL statement does not make a multi-step migration atomic                                      | Use distributed ownership, durable phase checkpoints, postcondition inspection, and readiness gating                               |

### 5.1 Text identity, collation, and uniqueness

MySQL equality and unique indexes use the effective collation of the indexed expression. A `_ci`
collation is case-insensitive; an `_ai` collation is also accent-insensitive. SQLite's default text
comparison and `COLLATE NOCASE` do not provide an equivalent Unicode contract.

| Concern          | SQLite-shaped risk                                       | Required portable decision                                                  | MySQL implementation rule                                                           |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| IDs              | Text IDs can inherit an unintended collation             | IDs are byte-exact and case-sensitive                                       | Use an explicit binary collation or binary representation                           |
| Combo names      | Exact lookup and insensitive fallback are separate today | Exact lookup remains exact; insensitive lookup is a named operation         | Exact and insensitive queries use explicit, different collations or normalized keys |
| Unique names     | A server default can collapse case or accents            | The domain declares whether case/accent variants conflict                   | Unique index uses the declared collation, never the database default                |
| Pattern text     | Pattern matching occurs in application code              | Stored pattern bytes round-trip unchanged                                   | Store with an explicit case-sensitive collation                                     |
| User-facing sort | SQLite `NOCASE` order is not portable Unicode order      | List order is defined by a normalized sort key or explicit collation policy | Schema and query use the selected policy and a unique tie-breaker                   |

Minimum probe:

```sql
CREATE TEMPORARY TABLE conformance_text (
  id VARCHAR(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin PRIMARY KEY,
  name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci UNIQUE
) ENGINE=InnoDB;

INSERT INTO conformance_text (id, name) VALUES ('A', 'Résumé');
-- The next statement conflicts under utf8mb4_0900_ai_ci.
INSERT INTO conformance_text (id, name) VALUES ('a', 'resume');
```

The harness MUST repeat the probe for the exact collation selected by the eventual schema; the
example collation above is evidence, not an approval for combo names.

### 5.2 `NULL`, missing rows, and nullable unique keys

MySQL unique indexes permit multiple `NULL` values. SQLite does likewise for unique columns.
However, neither behavior implements a domain invariant such as "only one active row may have no
owner."

Repository contracts MUST distinguish:

- no row found;
- a row found with a nullable field set to SQL `NULL`;
- a JSON document containing JSON `null`;
- a missing JSON member.

Minimum probe:

```sql
CREATE TEMPORARY TABLE conformance_null (
  id VARCHAR(64) PRIMARY KEY,
  optional_key VARCHAR(64) NULL,
  UNIQUE KEY uq_optional_key (optional_key)
) ENGINE=InnoDB;

INSERT INTO conformance_null VALUES ('one', NULL), ('two', NULL);
SELECT COUNT(*) AS row_count FROM conformance_null;
-- Expected: 2.
```

If a domain allows at most one logical `NULL`, it MUST use an explicit atomic invariant rather than
rely on a plain unique index.

### 5.3 Ordering, ties, and pagination

Without `ORDER BY`, result order is undefined. With a non-unique `ORDER BY`, tied rows still have an
undefined relative order. Offset pagination can therefore duplicate or omit records if the complete
order is not stable.

Every portable list MUST specify:

1. every user-visible sort expression;
2. the position of `NULL` values;
3. a unique final tie-breaker;
4. the cursor comparison tuple, if cursor pagination is used;
5. the snapshot/concurrency expectation across pages.

For the proposed combo/mapping slice:

```sql
-- Combo list contract candidate.
ORDER BY sort_order ASC, normalized_name ASC, id ASC

-- Mapping list and resolution contract candidate.
ORDER BY priority DESC, created_at ASC, id ASC
```

The exact `normalized_name` representation remains a contract decision. It MUST NOT be implemented
by relying on an unspecified database default.

For nullable values, use an explicit sort key rather than a backend default:

```sql
ORDER BY nullable_column IS NULL ASC, nullable_column ASC, id ASC
```

### 5.4 Update, no-op, delete, and affected rows

MySQL `UPDATE` reports rows actually changed by default. With the C API found-rows connection flag,
it reports rows matched. `INSERT ... ON DUPLICATE KEY UPDATE` reports 1 for insert, 2 for an actual
update, and 0 for an update to identical values; the found-rows flag changes the last value to 1.
These numbers MUST NOT become repository semantics.

| Repository outcome | Required meaning                                       | Forbidden implementation shortcut             |
| ------------------ | ------------------------------------------------------ | --------------------------------------------- |
| `updated`          | Target existed and the operation's postcondition holds | `affectedRows > 0` alone                      |
| `unchanged`        | Target existed and already satisfied the postcondition | Treating 0 changed rows as missing            |
| `not_found`        | Target identity did not exist                          | Treating every 0 count as unchanged           |
| `conflict`         | Compare/update version or invariant failed             | Returning generic `false`                     |
| delete `true`      | A row existed and was deleted                          | Assuming a successful statement deleted a row |
| delete `false`     | No row existed                                         | Throwing a backend-specific error             |

Minimum probe, run once with each supported connection mode:

```sql
CREATE TEMPORARY TABLE conformance_update (
  id VARCHAR(64) PRIMARY KEY,
  value_text VARCHAR(64) NOT NULL,
  version_no BIGINT NOT NULL
) ENGINE=InnoDB;

INSERT INTO conformance_update VALUES ('row', 'same', 1);
UPDATE conformance_update SET value_text = 'same' WHERE id = 'row';
UPDATE conformance_update SET value_text = 'changed' WHERE id = 'row';
UPDATE conformance_update SET value_text = 'missing' WHERE id = 'missing';
```

The harness asserts repository results and final rows, not raw driver counts. A versioned
compare/update SHOULD use a predicate such as `WHERE id = ? AND version_no = ?`, then distinguish a
missing identity from a stale version according to the domain contract.

### 5.5 Insert, upsert, and replacement

SQLite `INSERT OR REPLACE` deletes rows that conflict with a unique or primary key before inserting
the new row. MySQL `INSERT ... ON DUPLICATE KEY UPDATE` updates one conflicting row. The two forms
differ in foreign-key cascades, triggers, omitted columns, IDs, timestamps, and affected-row counts.

Every write method MUST be classified as exactly one of:

1. **insert-only:** duplicate identity returns `unique_violation`;
2. **identity-preserving upsert:** duplicate identity updates an explicit allowlist of mutable fields;
3. **replacement:** old identity is deleted and a new row is inserted, with cascade effects included
   in the contract.

A generic helper MUST NOT choose among these behaviors based on SQL convenience.

Minimum difference probe. This uses ordinary InnoDB tables because MySQL temporary tables cannot
serve as the parent/child foreign-key fixture. Run it in an isolated conformance schema; cleanup is
included so the probe is repeatable:

```sql
DROP TABLE IF EXISTS conformance_child;
DROP TABLE IF EXISTS conformance_parent;

CREATE TABLE conformance_parent (
  id VARCHAR(64) PRIMARY KEY,
  immutable_value VARCHAR(64) NOT NULL,
  mutable_value VARCHAR(64) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE conformance_child (
  id VARCHAR(64) PRIMARY KEY,
  parent_id VARCHAR(64) NOT NULL,
  CONSTRAINT fk_conformance_child_parent
    FOREIGN KEY (parent_id) REFERENCES conformance_parent(id) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO conformance_parent VALUES ('p', 'keep', 'old');
INSERT INTO conformance_child VALUES ('c', 'p');
INSERT INTO conformance_parent (id, immutable_value, mutable_value)
VALUES ('p', 'replacement', 'new')
ON DUPLICATE KEY UPDATE mutable_value = VALUES(mutable_value);

SELECT immutable_value, mutable_value FROM conformance_parent WHERE id = 'p';
SELECT COUNT(*) AS child_count FROM conformance_child WHERE parent_id = 'p';
-- Expected: immutable_value='keep', mutable_value='new', child_count=1.

DROP TABLE conformance_child;
DROP TABLE conformance_parent;
```

The `VALUES(mutable_value)` form is used here because the target remains MySQL 8.0 as a family and
no minimum 8.0 patch release has been approved. It is deprecated in later MySQL 8.0 releases, so an
adapter that establishes a newer minimum MAY use the supported row-alias form instead. The harness
asserts identity-preserving behavior, not either SQL spelling.

Tables with multiple unique indexes require special care because a duplicate can select an
unexpected conflicting row. Portable upsert schema SHOULD have one unambiguous conflict identity.

### 5.6 Unicode and index-size constraints

`utf8mb4` uses up to four bytes per character. InnoDB's maximum index key is 3072 bytes for common
`DYNAMIC` or `COMPRESSED` row formats with a 16 KiB page, and is lower for smaller page sizes or
legacy row formats. A prefix unique index is not equivalent to full-value uniqueness.

Schema acceptance MUST:

- set bounded lengths for all indexed identity strings;
- calculate the worst-case byte length of every composite index;
- verify the actual page size and row format;
- reject a prefix unique index for a full-identity contract;
- test maximum-length non-ASCII values before migration is accepted;
- classify an incompatible definition as `schema_incompatible`, not `unique_violation`.

Example boundary probe for a 16 KiB/DYNAMIC profile:

```sql
CREATE TEMPORARY TABLE conformance_index (
  value_text VARCHAR(768) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  UNIQUE KEY uq_value_text (value_text)
) ENGINE=InnoDB ROW_FORMAT=DYNAMIC;
```

The exact accepted length MUST be derived from all key parts and the verified deployment profile;
this example is deliberately near a physical boundary and is not a proposed production column.

### 5.7 IDs and connection-local state

The current combo and mapping modules generate UUIDs in the application. A MySQL implementation
SHOULD preserve this strategy for those domains.

If another domain uses a database-generated incrementing ID, the adapter MUST observe these rules:

- ID retrieval is part of the same driver operation and physical connection as the insert;
- callers never issue a later connection-level `LAST_INSERT_ID()` query;
- multi-row inserts define whether one ID or all IDs are returned;
- an error or rollback makes a previously observed `LAST_INSERT_ID()` unsuitable as proof of commit;
- retries use a stable domain idempotency key;
- upsert defines whether it returns an existing or newly generated identity.

MySQL documents `LAST_INSERT_ID()` as per-connection state and leaves it undefined after some errors
or error-driven rollbacks. Pool leases are therefore part of correctness, not merely performance.

### 5.8 JSON representation

Current combo data is JSON text, and malformed JSON is observable: combo reads can skip malformed
rows and mapping resolution skips malformed combo payloads. Switching the MySQL column directly to
native `JSON` would reject malformed rows at write/import time and normalize duplicate keys,
whitespace, and key order.

Before choosing `LONGTEXT` or `JSON`, the combo contract MUST decide:

- whether malformed stored payloads remain representable for compatibility tests;
- whether equality is structural or byte-for-byte;
- whether duplicate object keys are rejected before persistence;
- whether serialization order is stable and application-owned;
- which fields are duplicated into typed columns and which representation is authoritative.

For the first slice, an identity-preserving migration SHOULD keep application serialization as the
domain boundary. If native `JSON` is selected, imports MUST parse and validate before writing, and
tests MUST compare parsed domain values rather than raw JSON text.

Minimum normalization probe:

```sql
CREATE TEMPORARY TABLE conformance_json (id VARCHAR(64) PRIMARY KEY, payload JSON) ENGINE=InnoDB;
INSERT INTO conformance_json VALUES ('j', '{"b": 2, "a": 1, "a": 3}');
SELECT payload FROM conformance_json WHERE id = 'j';
-- The value is normalized; original whitespace/key duplication is not preserved.
```

### 5.9 Exact numerics and timestamps

| Type        | Risk                                                  | Required contract                                                       |
| ----------- | ----------------------------------------------------- | ----------------------------------------------------------------------- |
| `BIGINT`    | Values can exceed JavaScript's safe integer range     | Return a string or validated bigint representation across every backend |
| `DECIMAL`   | Driver options may return strings or lossy numbers    | Fix precision/scale and use an exact domain representation              |
| `TIMESTAMP` | Session time zone conversion and fractional precision | Force UTC session time zone and specify fractional precision            |
| `DATETIME`  | No intrinsic time zone                                | Use only for explicitly zone-free civil time                            |
| ISO text    | Lexical ordering depends on one canonical format      | Validate UTC suffix and exact precision before persistence              |

Combo and mapping timestamps are currently application-generated ISO strings. The first slice SHOULD
preserve their exact domain format rather than introducing server-generated local time.

### 5.10 Transaction isolation and observable concurrency

MySQL InnoDB uses `REPEATABLE READ` as its default isolation level. Within an explicit transaction,
its consistent non-locking reads normally establish and reuse an MVCC snapshot, while locking reads
and writes inspect and lock current index records or ranges. SQLite instead combines snapshot/read
transaction behavior with a database-wide single-writer model; transaction mode and WAL state affect
when a writer is admitted and when a read transaction can be upgraded. These mechanisms are not
interchangeable even when a simple CRUD fixture produces the same final row.

The backend profile MUST select and verify an isolation level rather than silently accept either
backend's default. The repository contract MUST then define observable results for each atomic
operation. It MUST NOT promise the implementation mechanism itself, such as gap locks or a
SQLite-wide writer lock.

| Scenario                          | SQLite-shaped risk                                                                      | InnoDB `REPEATABLE READ` risk                                                                              | Required conformance decision                                                                              |
| --------------------------------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Two reads in one transaction      | Snapshot timing depends on when the read transaction begins and the active journal mode | Consistent reads normally reuse the transaction's first established read view                              | State whether the operation requires one stable snapshot or deliberately performs a current read           |
| Range read plus concurrent insert | A concurrent writer may be serialized by SQLite's writer admission rules                | A plain consistent read can retain its snapshot; a locking range read can lock index gaps                  | Define whether a later read sees the insert and whether the operation requires a locking predicate         |
| Read-modify-write                 | Single-writer serialization can mask an unsafe application sequence                     | Concurrent transactions can read the same value and later contend or overwrite without a version predicate | Require compare/update, a locking read, or another explicit invariant; never rely on backend serialization |
| Writers touching different rows   | SQLite still admits only one writer at a time                                           | InnoDB can execute both until their record/range locks conflict                                            | Do not infer portable throughput or lock order; assert only atomic effects and classified conflicts        |
| Pagination across transactions    | Separate page reads can observe different committed states                              | Separate autocommit reads get separate views; one transaction may retain one view                          | Declare snapshot pagination or documented live pagination and test that policy                             |
| Retry after conflict              | Busy/locked outcomes and transaction upgrade failures are SQLite-shaped                 | Deadlocks and lock timeouts have different rollback scopes                                                 | Normalize the error, discard the failed context, and retry the complete idempotent operation only          |

Minimum two-connection visibility probe for the selected MySQL profile:

```text
Connection A                                      Connection B
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
SELECT value_no FROM conformance_isolation
  WHERE id = 1;  -- establishes read view: 0
                                                  START TRANSACTION;
                                                  UPDATE conformance_isolation
                                                    SET value_no = 1 WHERE id = 1;
                                                  COMMIT;
SELECT value_no FROM conformance_isolation
  WHERE id = 1;  -- same consistent-read view: 0
COMMIT;
SELECT value_no FROM conformance_isolation
  WHERE id = 1;  -- new transaction/view: 1
```

The shared harness MUST NOT assert that every backend reproduces this internal sequence. It must use
it to prove that the chosen repository operation either requests a stable snapshot explicitly or
avoids depending on repeat-read visibility. If an operation uses a current/locking read, that choice
and its conflict behavior need a separate test.

## 6. Transactions, failures, and retry policy

### 6.1 Transaction states

The backend contract should expose only opaque transaction contexts, but its implementation must
maintain the following lifecycle:

```text
idle
  -> active
      -> committed
      -> rolled_back
      -> failed_statement -> rolled_back
      -> failed_transaction -> rolled_back
      -> outcome_unknown -> reconciled | escalated
```

A context in `committed`, `rolled_back`, `failed_transaction`, or `outcome_unknown` MUST reject new
repository work. A context with a failed statement SHOULD be explicitly rolled back before its
connection returns to the pool, even when MySQL would technically permit more statements.

### 6.2 Error classification matrix

Numeric codes and SQLSTATE values below are MySQL 8.0 server signals. A Node.js driver can also
produce transport-specific codes; those MUST be normalized without leaking raw messages to callers.

| Condition                      | MySQL signal                           | Rollback scope                                    | Portable class           | Retry policy                                                   |
| ------------------------------ | -------------------------------------- | ------------------------------------------------- | ------------------------ | -------------------------------------------------------------- |
| Duplicate key                  | `1062`, SQLSTATE `23000`               | Statement                                         | `unique_violation`       | No, unless contract defines idempotent create                  |
| Missing referenced parent      | `1452`, SQLSTATE `23000`               | Statement                                         | `foreign_key_violation`  | No                                                             |
| Parent still referenced        | `1451`, SQLSTATE `23000`               | Statement                                         | `foreign_key_violation`  | No                                                             |
| Deadlock victim                | `1213`, SQLSTATE `40001`               | Entire transaction                                | `transaction_conflict`   | Retry whole atomic operation                                   |
| Lock wait timeout              | `1205`, SQLSTATE `HY000`               | Statement by default; server option can change it | `lock_timeout`           | Roll back explicitly, then retry whole operation if idempotent |
| Invalid JSON text              | `3140`, SQLSTATE `22032`               | Statement                                         | `invalid_data`           | No                                                             |
| Data too long                  | `1406`, SQLSTATE `22001`               | Statement                                         | `invalid_data`           | No                                                             |
| Check constraint               | `3819`, SQLSTATE `HY000`               | Statement                                         | `constraint_violation`   | No                                                             |
| Server gone before request     | Driver/server transport signal         | No operation or unknown                           | `unavailable`            | Retry only if operation definitely was not sent                |
| Connection lost during request | Driver transport signal                | Unknown                                           | `outcome_unknown`        | Reconcile by idempotency key; do not blind retry               |
| Pool acquisition timeout       | Driver/pool signal                     | None                                              | `unavailable`            | Bounded retry outside transaction                              |
| Unsupported profile            | Initialization probe mismatch          | None                                              | `unsupported`            | No; fail readiness                                             |
| Migration lock timeout         | Named-lock acquisition returns timeout | None                                              | `migration_lock_timeout` | Wait/back off according to startup policy                      |
| Migration lock error           | Named-lock acquisition returns error   | None                                              | `migration_lock_failed`  | No blind retry; inspect connection state                       |

The adapter MUST classify by structured code and SQLSTATE where available, never by localized message
text. Public HTTP/SSE/MCP responses must still pass through the repository's existing sanitized error
helpers.

### 6.3 Retry rules

A retryable classification does not automatically make an operation safe to retry.

A retry loop MUST:

1. own the entire repository atomic operation;
2. discard the failed transaction context;
3. acquire a valid connection and begin a new transaction;
4. preserve a stable operation or entity identity;
5. use bounded attempts with jitter;
6. stop on non-retryable classifications;
7. reconcile `outcome_unknown` before issuing another write;
8. emit structured diagnostics without credentials or raw SQL values.

MySQL explicitly recommends retrying the entire transaction after a deadlock. A lock wait timeout
rolls back only the current statement by default, so explicit rollback is required to make the retry
boundary independent of server configuration.

### 6.4 Reproducible two-connection deadlock probe

Use two physical connections, not two logical operations that might share one pool connection:

```sql
CREATE TABLE conformance_deadlock (
  id INT PRIMARY KEY,
  value_no INT NOT NULL
) ENGINE=InnoDB;
INSERT INTO conformance_deadlock VALUES (1, 0), (2, 0);
```

```text
Connection A                         Connection B
START TRANSACTION;                   START TRANSACTION;
UPDATE ... WHERE id = 1;             UPDATE ... WHERE id = 2;
UPDATE ... WHERE id = 2;             UPDATE ... WHERE id = 1;
```

Exactly one transaction should become the deadlock victim. The harness asserts that the victim is
classified as retryable, its whole transaction is retried with a new context, both logical updates
occur once, and no partial result remains.

## 7. Migration ownership and DDL recovery

### 7.1 Why a normal transaction is insufficient

MySQL DDL statements commonly commit the current transaction implicitly before execution and often
afterward. Atomic DDL protects one supported DDL statement; it does not make a sequence of DDL,
data backfill, and schema-history updates one user transaction.

A MySQL migration runner therefore MUST model a migration as recoverable phases:

```text
lock acquired
  -> current schema inspected
  -> intent/checkpoint recorded
  -> DDL phase applied and verified
  -> data phase applied in bounded transactions
  -> postconditions verified
  -> logical milestone recorded
  -> readiness allowed
  -> lock released
```

A process crash at any arrow must have a deterministic resume or stop condition.

### 7.2 Ownership alternatives

| Option                          | Strengths                                                                | Failure modes                                                                             | Decision                                                               |
| ------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Process-local mutex             | Simple and useful for one process                                        | Does not coordinate replicas                                                              | Rejected for external-backend migration ownership                      |
| Row lock held in a transaction  | Uses normal InnoDB locking                                               | DDL implicit commit releases transaction ownership                                        | Rejected as the sole DDL migration lock                                |
| Lease row with owner and expiry | Survives pooled connections and can support takeover                     | Requires clock/expiry/fencing design; stale owner may continue                            | Candidate for scheduled jobs, not first migration mechanism            |
| MySQL named lock                | Server-wide, exclusive, tied to physical session, released on disconnect | Must pin one connection; not transaction-scoped; one-server scope; undefined waiter order | Recommended first MySQL migration mutex, combined with durable history |
| External coordinator            | Can coordinate across database topologies                                | Adds an operational dependency outside the database contract                              | Deferred unless deployment topology requires it                        |

### 7.3 Recommended first mechanism

For a single writable MySQL primary, the migration runner SHOULD:

1. lease and pin one physical connection;
2. acquire one application-and-database-specific named lock of at most 64 characters;
3. distinguish acquired (`1`), timeout (`0`), and error (`NULL`);
4. inspect a durable migration-history table after acquiring the lock;
5. execute idempotent physical phases with explicit postcondition checks;
6. record completion only after all postconditions pass;
7. release the named lock explicitly in `finally`;
8. close/discard the pinned connection if release cannot be confirmed.

Named locks are released when the session ends, not on commit or rollback. They are server-wide on one
`mysqld`; topology and failover behavior must be validated before active-active support is advertised.
A durable history/checkpoint table remains necessary because lock ownership alone says nothing about
partially completed DDL.

### 7.4 Migration failure matrix

| Injection point                 | Required durable evidence                     | Restart behavior                    | Readiness                                     |
| ------------------------------- | --------------------------------------------- | ----------------------------------- | --------------------------------------------- |
| Before lock                     | No intent                                     | Retry lock acquisition              | Not ready while required migration is pending |
| After lock, before intent       | No schema change                              | Reinspect and restart               | Not ready                                     |
| After DDL, before checkpoint    | Schema postcondition reveals DDL applied      | Mark/continue only after validation | Not ready                                     |
| During data backfill            | Bounded checkpoint identifies completed range | Resume from verified checkpoint     | Not ready                                     |
| After data, before milestone    | Postconditions prove completion               | Record milestone idempotently       | Not ready until recorded                      |
| After milestone, before release | History proves complete                       | New owner verifies and proceeds     | Ready if all required milestones pass         |

## 8. SQLite-to-MySQL migration validation

An offline migration tool is required before database switching can be advertised. For each migrated
domain it MUST provide a dry run and a post-import report.

### 8.1 Preflight

- verify supported SQLite and MySQL schema milestones;
- validate every source JSON payload according to the chosen target representation;
- detect names that collide under the target collation;
- validate UTF-8 and maximum indexed byte lengths;
- detect orphaned foreign keys even if the source connection had checks disabled;
- validate timestamps and numeric ranges;
- count source rows by table and logical domain;
- refuse to mutate either database during dry run.

### 8.2 Import

- preserve application-generated IDs;
- use deterministic batches and checkpoints;
- import parents before children;
- do not use replacement semantics to hide conflicts;
- classify every rejected row with a stable reason;
- keep encrypted credential ciphertext opaque and never log it;
- stop on an unclassified difference.

### 8.3 Postconditions

- row counts match for every migrated table;
- identity sets match exactly;
- foreign-key orphan counts are zero;
- canonical domain digests match for JSON-backed records;
- list ordering and mapping resolution produce the same results;
- a second dry run reports no pending changes;
- SQLite remains unchanged and available for operator rollback until cutover is accepted.

## 9. Backend-neutral conformance catalog

Each test below runs the same repository fixture against SQLite and MySQL. MySQL-specific probes may
assert error metadata internally, but the shared assertion compares only domain results and durable
state.

### 9.1 Core CRUD and representation

| Test name                                     | Fixture/action                                                    | Required assertion                                     |
| --------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------ |
| `create_round_trips_domain_values`            | Create Unicode, nullable, JSON, and timestamp fields              | Parsed domain object equals normalized input           |
| `find_missing_distinguishes_absent_from_null` | Read an absent ID and a present nullable row                      | Results are distinct                                   |
| `update_missing_returns_not_found`            | Update an absent ID                                               | Stable `not_found` result                              |
| `delete_is_idempotent_as_declared`            | Delete the same ID twice                                          | First and second results match the repository contract |
| `json_round_trips_structurally`               | Write equivalent JSON with different whitespace/order             | Parsed values are equal; raw text is not asserted      |
| `timestamp_round_trips_in_utc`                | Change MySQL session default before leasing a verified connection | Domain serialization remains canonical UTC             |
| `decimal_round_trips_without_float_loss`      | Write precision/scale boundaries                                  | Exact representation is unchanged                      |
| `large_integer_does_not_cross_number_lossily` | Write beyond JavaScript safe integer range                        | String/bigint domain representation is exact           |

### 9.2 Identity and collation

| Test name                                      | Fixture/action                                             | Required assertion                                         |
| ---------------------------------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- |
| `id_is_byte_exact`                             | Create IDs differing only by case                          | Both remain distinct if the ID contract is binary          |
| `exact_name_lookup_is_case_sensitive`          | Store `MASTER-LIGHT`, query exact lowercase                | Exact lookup misses                                        |
| `insensitive_name_lookup_uses_declared_policy` | Query the same row through the named insensitive operation | One deterministic row is returned                          |
| `unique_name_case_policy_is_explicit`          | Insert case variants                                       | Result matches the selected name policy on both backends   |
| `unique_name_accent_policy_is_explicit`        | Insert accent variants                                     | Result matches the selected policy                         |
| `unique_violation_is_classified`               | Concurrently create one identity                           | One wins; loser is `unique_violation` without backend text |
| `nullable_unique_policy_is_explicit`           | Insert two `NULL` logical keys                             | Result matches domain rule, not accidental index behavior  |

### 9.3 Ordering and pagination

| Test name                                           | Fixture/action                                 | Required assertion                                     |
| --------------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------ |
| `list_uses_unique_final_tiebreaker`                 | Insert rows with identical primary sort values | Repeated list order is identical and ID-ordered        |
| `pagination_has_no_gaps_or_duplicates`              | Traverse small pages across tied rows          | Union equals full ID set; page intersections are empty |
| `nullable_sort_position_is_fixed`                   | Mix `NULL` and non-`NULL` values               | `NULL` appears at the contract-defined end             |
| `cursor_predicate_matches_sort_tuple`               | Page forward through mixed sort keys           | Every row appears exactly once in declared order       |
| `concurrent_insert_pagination_behavior_is_declared` | Insert between page reads                      | Result matches snapshot or documented live-page policy |

### 9.4 Writes and affected rows

| Test name                                   | Fixture/action                             | Required assertion                                 |
| ------------------------------------------- | ------------------------------------------ | -------------------------------------------------- |
| `same_value_update_is_not_missing`          | Update an existing row to identical values | `unchanged` or declared success, never `not_found` |
| `same_value_result_ignores_found_rows_mode` | Run fixture with both connection modes     | Domain result is identical                         |
| `compare_update_detects_stale_version`      | Two writers use one old version            | One succeeds; one returns `conflict`               |
| `batch_count_uses_contract_definition`      | Mix changed and unchanged matches          | Count means the same thing on both backends        |
| `upsert_preserves_identity_and_children`    | Upsert parent with a child row             | ID, immutable fields, and child survive            |
| `insert_only_never_silently_updates`        | Repeat insert-only identity                | Second call is `unique_violation`                  |

### 9.5 Transactions, isolation, and failure injection

| Test name                                       | Fixture/action                                                    | Required assertion                                                     |
| ----------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `related_changes_commit_atomically`             | Update parent and children                                        | All postconditions commit together                                     |
| `related_changes_roll_back_atomically`          | Inject a child constraint failure                                 | All tables equal pre-operation state                                   |
| `stable_snapshot_behavior_is_declared`          | Read, commit a concurrent update, then read in the same operation | Result follows the operation's declared snapshot/current-read policy   |
| `range_insert_visibility_is_declared`           | Read a range while another transaction inserts a matching row     | Later visibility matches the declared snapshot/live policy             |
| `read_modify_write_prevents_lost_update`        | Two transactions read one version and attempt distinct updates    | One declared winner; loser conflicts/retries without overwriting       |
| `independent_writers_preserve_atomic_effects`   | Two transactions update different identities concurrently         | Both logical effects commit; no contract depends on backend lock order |
| `deadlock_retries_whole_operation`              | Two physical connections lock in opposite order                   | One victim; final logical effect occurs once                           |
| `lock_timeout_discards_context`                 | Hold a row lock past timeout                                      | Explicit rollback; old context rejects work                            |
| `duplicate_and_foreign_key_errors_are_distinct` | Trigger each constraint                                           | Stable distinct classes                                                |
| `disconnect_before_send_is_unavailable`         | Fail connection before dispatch                                   | Safe bounded retry is permitted                                        |
| `disconnect_during_commit_is_outcome_unknown`   | Drop connection at commit boundary                                | No blind retry; reconciliation is required                             |
| `retry_uses_stable_operation_identity`          | Fail first attempt after durable write                            | At most one logical effect exists                                      |

### 9.6 Migration and readiness

| Test name                               | Fixture/action                              | Required assertion                                 |
| --------------------------------------- | ------------------------------------------- | -------------------------------------------------- |
| `only_one_instance_owns_migration`      | Two backend instances acquire one name      | Exactly one executes migration phases              |
| `lock_timeout_is_not_reported_as_ready` | Hold migration lock from another connection | Startup waits/fails with classified state          |
| `disconnect_releases_named_lock`        | Terminate owner connection                  | Another instance can acquire and reinspect         |
| `ddl_checkpoint_recovers_after_crash`   | Stop after DDL before history update        | Restart detects postcondition and continues safely |
| `backfill_resumes_without_duplication`  | Stop between deterministic batches          | Completed rows are neither skipped nor duplicated  |
| `partial_migration_blocks_readiness`    | Leave required milestone incomplete         | Health may be alive; readiness is false            |
| `completed_history_is_idempotent`       | Start against fully migrated schema         | No DDL/data mutation occurs                        |

## 10. First-slice acceptance profile: combos and model mappings

This section specializes the general catalog for the candidate first slice discussed in #8075 and
implemented experimentally in Draft PR #8757. It does not approve that runtime PR.

### 10.1 Contract decisions required before adapter code

| Decision              | Current evidence                                       | Required resolution                                                                         |
| --------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Combo ID              | Application UUID                                       | Preserve as byte-exact text/binary identity                                                 |
| Combo name uniqueness | SQLite unique name; exact and insensitive reads differ | Select explicit uniqueness collation independently from insensitive fallback                |
| Combo list            | `sort_order`, then `name NOCASE`                       | Add `id` as final tie-breaker and define Unicode name order                                 |
| Next sort order       | `MAX(sort_order) + 1`                                  | Replace race-prone read-then-insert with an atomic allocation or retryable unique invariant |
| Reorder               | One SQLite transaction updates all parseable rows      | Define concurrent reorder serialization and all-or-nothing behavior                         |
| Corrupt combo JSON    | Reads/resolution skip malformed payloads               | Decide whether MySQL schema can represent malformed legacy rows during migration            |
| Mapping order         | `priority DESC, created_at ASC`                        | Add `id ASC` final tie-breaker                                                              |
| Mapping delete        | Boolean from affected rows                             | Preserve `true` then `false` behavior independent of found-rows mode                        |
| Combo delete          | Foreign key cascade removes mappings                   | Preserve one-operation atomic cascade                                                       |
| Timestamps            | Application ISO strings                                | Preserve canonical UTC text or define an exact typed conversion                             |

### 10.2 Required combo fixtures

The shared fixture MUST include:

- combo names `Alpha`, `alpha`, `Résumé`, and `resume` to exercise selected collation policy;
- three combos with the same requested `sortOrder` to exercise the unique final order;
- one missing ID for update and delete results;
- one payload with explicit JSON `null` and one with a missing member;
- one intentionally malformed legacy payload if compatibility requires it;
- mappings with identical `priority` and `createdAt` but different IDs;
- enabled, disabled, inactive-target, and corrupt-target mappings;
- one combo with at least two dependent mappings for cascade verification.

### 10.3 Required combo assertions

A MySQL implementation cannot claim the first slice complete until the shared harness proves:

1. application UUIDs and ISO timestamps round-trip unchanged;
2. exact and insensitive combo-name lookups remain distinct operations;
3. uniqueness follows the approved name policy, not server defaults;
4. combo and mapping lists have a total deterministic order;
5. every offset page is a contiguous slice of that order;
6. update of a missing combo/mapping returns `null`;
7. first delete returns `true`, repeated delete returns `false`;
8. reorder filters unknown/duplicate requested IDs exactly as the accepted contract specifies;
9. reorder either commits every intended row or none;
10. mapping resolution uses the deterministic order and skips disabled, inactive, and malformed targets;
11. deleting a combo atomically removes all dependent mappings;
12. errors are classified without raw MySQL messages;
13. SQLite starts without loading a MySQL dependency;
14. no external-backend support is advertised by the presence of this slice alone.

### 10.4 Concurrency probes specific to the slice

#### Concurrent combo creation

Two connections create different UUIDs with the same contract-equivalent name. Exactly one succeeds;
the other receives `unique_violation`. If case/accent variants are allowed by the approved policy,
both succeed and exact lookup returns the correct identity.

#### Concurrent sort allocation

Two connections create combos without an explicit sort order. The final values MUST follow the
contract without duplicates caused by both transactions reading the same `MAX(sort_order)`. The
implementation may serialize allocation, use a separate sequence, or retry a protected invariant;
the contract must not require one specific SQL mechanism.

#### Concurrent reorder

Two connections reorder the same set in opposite orders. The accepted outcome MUST be one complete
order or the other, never a mixed sequence or mismatched JSON/column `sortOrder`. The loser may wait,
return conflict, or retry according to the approved contract.

#### Delete versus mapping creation

One connection deletes a combo while another creates a mapping to it. The final state MUST be either
an existing combo with a valid mapping or no combo and no mapping. An orphan mapping is forbidden.

## 11. Implementation gate checklist

A MySQL adapter PR for any domain MUST NOT start until reviewers can answer all applicable items:

- [ ] Identity, case, accent, and collation semantics are explicit.
- [ ] Every list has a complete order, `NULL` position, and unique tie-breaker.
- [ ] Missing, unchanged, conflict, and delete results are distinguishable.
- [ ] Every write is classified as insert-only, identity-preserving upsert, or replacement.
- [ ] ID generation and idempotency ownership are explicit.
- [ ] JSON and temporal representations are selected with migration compatibility in mind.
- [ ] Error codes map to the backend-neutral taxonomy.
- [ ] Retry ownership and maximum scope are explicit.
- [ ] Migration mutex, durable checkpoints, and readiness rules are approved.
- [ ] SQLite and MySQL fixtures run through one behavior harness.
- [ ] Offline migration preflight and postconditions exist before cutover is advertised.
- [ ] SQLite remains the zero-configuration default and clean startup path.

## 12. Reference sources

### 12.1 OmniRoute sources

- `docs/architecture/persistence-backend-boundary.md`
- `docs/architecture/sqlite-coupling-inventory.md`
- `src/lib/db/combos.ts`
- `src/lib/db/modelComboMappings.ts`
- `src/lib/db/migrations/001_initial_schema.sql`
- `src/lib/db/migrations/010_model_combo_mappings.sql`
- `src/lib/db/migrations/020_combo_sort_order.sql`

### 12.2 MySQL 8.0 reference manual

- [Character sets and collations](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/charset.html)
- [CREATE TABLE](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/create-table.html)
- [UPDATE](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/update.html)
- [INSERT ... ON DUPLICATE KEY UPDATE](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/insert-on-duplicate.html)
- [Information functions](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/information-functions.html)
- [The JSON data type](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/json.html)
- [InnoDB transaction isolation](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/innodb-transaction-isolation-levels.html)
- [InnoDB error handling](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/innodb-error-handling.html)
- [Handling deadlocks](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/innodb-deadlocks-handling.html)
- [Statements that cause an implicit commit](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/implicit-commit.html)
- [Locking functions](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/locking-functions.html)
- [InnoDB limits](https://docs.oracle.com/cd/E17952_01/mysql-8.0-en/innodb-limits.html)

### 12.3 SQLite references

- [ON CONFLICT](https://sqlite.org/lang_conflict.html)
- [`NULL` handling](https://sqlite.org/nulls.html)
- [Transactions](https://sqlite.org/lang_transaction.html)
- [SELECT and ordering](https://sqlite.org/lang_select.html#orderby)

## 13. Open decisions

This specification deliberately leaves the following decisions to the accepted first-slice design:

1. the exact collation and normalization policy for combo names;
2. the typed or text representation of combo JSON in MySQL;
3. the repository result type for an existing same-value update;
4. the isolation level selected by the backend profile;
5. the concurrency mechanism for sort-order allocation and reorder;
6. the physical MySQL migration schema and durable checkpoint format;
7. the exact retry budget and backoff policy;
8. the topology boundary within which a MySQL named migration lock is sufficient.

These are not adapter implementation details. Each changes observable behavior or operational
correctness and therefore requires explicit review before runtime support proceeds.
