# Task 3.01 — Test: DB Core + Migration Runner

## Metadata
- **Phase**: 3 (Data Layer)
- **Source files**: `src/lib/db/core.ts` (754 LoC), `src/lib/db/migrationRunner.ts`
- **Test files to create**: `tests/unit/db-core-init.test.mjs`, `tests/unit/db-migration-runner.test.mjs`
- **Framework**: Node.js `node:test` + `assert`
- **Estimated assertions**: ~20

## Pre-requisites
1. Read: `src/lib/db/core.ts` — getDb(), initDb(), schema setup
2. Read: `src/lib/db/migrationRunner.ts` — sequential migration execution
3. Read: `src/lib/db/migrations/` directory for migration files
4. Check existing: existing db-versionManager tests

## Test Scenarios

### core.ts (~12 tests)
```
1. getDb() returns valid database instance
2. initDb() creates tables if not exist
3. WAL mode enabled
4. Journal mode verification
5. Foreign keys enabled
6. DB path resolution from DATA_DIR
7. Default DB path (~/.omniroute/)
8. Schema migration trigger on init
9. Connection reuse (singleton)
10. Error handling: invalid path
11. Error handling: permission denied (mock)
12. Close database cleanly
```

### migrationRunner.ts (~8 tests)
```
1. Run pending migrations sequentially
2. Skip already-applied migrations
3. Migration version tracking in migrations table
4. Migration failure → rollback
5. Empty migrations list → no-op
6. New migration detected → apply
7. Migration ordering (by filename/version)
8. Edge: corrupt migration state recovery
```

## Testing Approach

Use a temporary SQLite database in `/tmp/` for each test (create before, delete after). Never touch production DB.

```javascript
import { mkdtempSync, rmSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";

const testDir = mkdtempSync(join(tmpdir(), "omniroute-test-"));
process.env.DATA_DIR = testDir;
// ... after tests:
rmSync(testDir, { recursive: true });
```

## Acceptance Criteria
- [ ] All 20 assertions pass
- [ ] Uses temp DB (no production side effects)
- [ ] db/ coverage improves to ≥ 65%
