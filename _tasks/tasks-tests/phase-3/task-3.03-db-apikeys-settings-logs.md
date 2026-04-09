# Task 3.03 — Test: DB API Keys, Settings, Detailed Logs

## Metadata
- **Phase**: 3
- **Source files**: `src/lib/db/apiKeys.ts`, `src/lib/db/settings.ts`, `src/lib/db/detailedLogs.ts`
- **Test files to create**: `tests/unit/db-apikeys-crud.test.mjs`, `tests/unit/db-settings-crud.test.mjs`, `tests/unit/db-detailed-logs.test.mjs`
- **Estimated assertions**: ~25

## Pre-requisites
1. Read each source file
2. Check existing: `tests/unit/settings-api.test.mjs`, `tests/unit/t07-no-log-key-config.test.mjs`

## Test Scenarios

### apiKeys.ts (~10): Key generation; key validation; revocation; noLog flag; key listing; key by ID; hashed key storage; reveal key; key with name; delete key

### settings.ts (~8): Get/set setting; default values; type coercion (boolean, number, string); requireLogin; all settings listing; setting update; setting delete; setting not found

### detailedLogs.ts (~7): Log insertion; query by time range; query by provider; query by model; retention cleanup; log detail retrieval; pagination

## Acceptance Criteria
- [ ] All 25 assertions pass using temp DB
- [ ] db/ coverage reaches ≥ 72%
