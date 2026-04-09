# Task 3.02 — Test: DB Providers, Models, Combos

## Metadata
- **Phase**: 3
- **Source files**: `src/lib/db/providers.ts`, `src/lib/db/models.ts`, `src/lib/db/combos.ts`
- **Test files to create**: `tests/unit/db-providers-crud.test.mjs`, `tests/unit/db-models-crud.test.mjs`, `tests/unit/db-combos-crud.test.mjs`
- **Estimated assertions**: ~30

## Pre-requisites
1. Read each source file for CRUD operations
2. Use temp SQLite DB pattern from task 3.01

## Test Scenarios

### providers.ts (~12): CRUD; connection deactivation; credential update; provider listing; filtering by type; provider-specific data; test status tracking; connection count; delete cascade; re-activation; duplicate handling; edge: empty table

### models.ts (~10): Model CRUD; bulk upsert; devSync tracking; model listing with filters; model by provider; model capabilities update; delete model; model count; edge: duplicate model ID; search by name/id

### combos.ts (~8): Combo CRUD; active combo set/get; combo entry ordering; combo with model mappings; delete combo; combo duplication; combo strategy field; edge: no active combo

## Acceptance Criteria
- [ ] All 30 assertions pass using temp DB
- [ ] db/ coverage reaches ≥ 68%
