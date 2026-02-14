# ADR-001: SQLite as Primary Data Store

**Date:** 2025-10-15  
**Status:** Accepted  
**Deciders:** @diegosouzapw

## Context

OmniRoute needs to persist usage data, call logs, API keys, and configuration. Options considered:

- PostgreSQL/MySQL — full RDBMS
- SQLite — embedded, zero-config
- JSON files (LowDB) — simple but fragile
- Redis — in-memory, ephemeral

The project targets self-hosted, single-tenant deployments where operational simplicity is paramount.

## Decision

Use **SQLite** via `better-sqlite3` as the primary data store.

- All usage tracking, call logs, API keys, and settings stored in a single `.db` file
- Synchronous reads (no async overhead for simple queries)
- WAL mode for concurrent read/write performance
- Automatic migration from legacy JSON format (`usageDb.json`) on first boot

## Consequences

### Positive

- Zero infrastructure — no database server needed
- Single-file backup (`cp data/omniroute.db backup/`)
- Fast queries for dashboard stats (< 5ms typical)
- Easy migration path from JSON format

### Negative

- Single-writer limitation (acceptable for single-tenant)
- No built-in replication
- Would need migration to PostgreSQL for multi-tenant cloud deployment

### Neutral

- File-based storage works well in Docker volumes
