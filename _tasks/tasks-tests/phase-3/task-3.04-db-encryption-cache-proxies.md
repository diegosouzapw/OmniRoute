# Task 3.04 — Test: DB Encryption, Read Cache, Proxies, Secrets

## Metadata
- **Phase**: 3
- **Source files**: `src/lib/db/encryption.ts`, `src/lib/db/readCache.ts`, `src/lib/db/proxies.ts`, `src/lib/db/secrets.ts`
- **Test files to create**: One per module in `tests/unit/`
- **Estimated assertions**: ~25

## Pre-requisites
1. Read each source file
2. Check existing: `tests/unit/proxy-registry.test.mjs`

## Test Scenarios

### encryption.ts (~7): Key derivation from password; encrypt/decrypt round-trip; different data types; empty string encryption; invalid key → error; serialization format

### readCache.ts (~6): Cache get/set; TTL-based invalidation; cache miss; cache invalidation on write; multiple keys; clear cache

### proxies.ts (~6): Proxy CRUD; proxy assignment to connection; proxy health status; proxy by ID; list active proxies; edge: no proxies

### secrets.ts (~6): Secret store; secret retrieval by key; secret update; secret delete; encrypted storage verification; edge: non-existent key

## Acceptance Criteria
- [ ] All 25 assertions pass
- [ ] db/ coverage reaches ≥ 75%
