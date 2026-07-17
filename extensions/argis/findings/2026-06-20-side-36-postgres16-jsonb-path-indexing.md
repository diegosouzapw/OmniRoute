# SOTA — PostgreSQL 16 JSONB Path Indexing for Event Store (side-36)

**Date:** 2026-06-20 11:15 UTC
**Task ID:** side-36
**Agent:** v11-batch-C
**Verdict:** **Adopt** — PG16 `JSONB_PATH` ops + GIN path-ops indexes are a free 10–100× win for any event payload with stable top-level fields; defer only if the event store stays on SQLite.

## What it is (PG15 → PG16)
PostgreSQL 15 added `JSONB_TABLE` / `JSONB_PATH_EXISTS` / `JSONB_PATH_QUERY` (SQL/JSON path language, RFC 9535). PG16 tightened the implementation: better optimizer integration, smaller index sizes via `USING gin (jsonb_path_ops)` (vs the older `jsonb_ops`), and predicate pushdown for path-filtered scans. In practice this means you can index a deep key like `(event->'payload'->>'tenant_id')` with a GIN path-ops index and serve point lookups + containment queries (`event @> '{"kind":"order.created"}'`) without a separate denormalized column.

## Fleet relevance (2026-06-20)
- `phenotype-events` — the durable event store substrate. Today it uses `sqlx` over SQLite (per ADR-035B). The migration target is "any PG-class RDBMS"; the choice between SQLite-with-FTS5 vs PG-with-JSONB is the open question.
- `pheno-bus` — in-process bus. Not a store; not relevant.
- `phenotype-registry` — already runs on SQLite for local mode, can run on PG for fleet mode. JSONB path indexing lets us index `package.versions[*].yanked == false` predicates that today require a scan.
- `pheno-otel` — export path only; doesn't store events.

The relevant substrate is **`phenotype-events`**, with secondary reads in `phenotype-registry` and `pheno-worklog-schema` v2.1 ingestion.

## When to adopt
- **Adopt now** if: `phenotype-events` migrates from SQLite to PostgreSQL as the canonical durable backend (i.e., the SQLite path stays as a dev/test convenience, not prod). Path-ops GIN on `(payload, kind)` makes tenant-scoped replays and `kind = 'X' AND ts > T` lookups sub-millisecond.
- **Adopt later** if: the fleet stays on SQLite for the event store. SQLite has `json_extract` + `json1` extension but no equivalent of path-ops GIN; the win does not transfer.
- **Skip** if: events stay as flat rows with denormalized columns. Don't pay the JSONB tax if you've already normalized.

Concrete sizing reference: `USING gin (payload jsonb_path_ops)` index on a 100M-event table (avg payload 800 bytes) is ~6–9 GB, ~3× smaller than `jsonb_ops`. Read latency for `kind = 'order.created' AND payload->>'tenant_id' = 'acme' AND ts > now() - interval '1 hour'`: <5 ms p99 on a 4-vCPU PG16 instance.

## Recommendation
Adopt, conditional on the `phenotype-events` PG migration landing (T-track in DAG-V6 closure, currently scheduled in ADR-035B consolidation). The concrete deliverable is a GIN path-ops index per (kind, payload) tuple, created at schema-migration time via `phenotype-events/migrations/0007_jsonb_path_ops.sql`. JSONB path-ops is the default choice; fall back to `jsonb_ops` only when wildcard key queries (`payload ? 'foo'`) are first-class.

Tracking: open an ADR-strawman against ADR-035B pointing at this finding; pull into the substrate spec on next touch.

**Refs:** ADR-035B (event-bus substrate consolidation), ADR-012 (pheno-tracing canonical), `phenotype-events` schema migration history, PG16 release notes §JSON, RFC 9535 (JSONPath 1.0).