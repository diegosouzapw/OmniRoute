# Fix Skills, Memory, and Encryption Systems

## TL;DR

> **Quick Summary**: OmniRoute's skills and memory systems are broken because 20 database migrations (007-027) haven't run. The migration runner can't execute them due to a schema mismatch in the migration tracking table. Fix the migration table schema, run pending migrations, add error handling for encryption, and enable marketplace popular skills list.
> 
> **Deliverables**:
> - Migration table schema fixed (add `version` column)
> - All pending migrations (007-027) applied successfully
> - Skills table with mode/provider/tags/install_count columns
> - Memory table with FTS5 full-text search
> - Encryption error handling (no crashes when key missing)
> - Marketplace returns popular skills by default
> 
> **Estimated Effort**: Medium
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Migration fix → Run migrations → Verify systems

---

## Context

### Original Request
User reported three issues:
1. Skills system menu not working
2. Memory extraction/injection menu not working
3. Encryption error in logs: "Unsupported state or unable to authenticate data"
4. Skills marketplace should show "top 10 popular skills" by default

### Investigation Summary
**Parallel Research**:
- Launched 3 explore agents to investigate encryption, skills/memory architecture, and marketplace
- Found database only has migrations 001-006 applied (last: 2026-04-17)
- Confirmed 20 pending migration files exist (007-027) but can't run

**Root Cause**:
- Migration tracking table has wrong schema: `id/name/applied_at` columns
- Migration runner expects `version/name/applied_at` columns
- Schema mismatch prevents new migrations from running
- Skills table missing: mode, source_provider, tags, install_count (added in migration 027)
- Memory table doesn't exist (created in migration 015)

**Key Findings**:
- No encrypted data in database (0 rows with `enc:v1:` prefix)
- STORAGE_ENCRYPTION_KEY not set (optional passthrough mode)
- Encryption error from attempting to decrypt plaintext or stale data
- Marketplace has POPULAR_BY_PROVIDER constant but doesn't return it

### Metis Review
**Critical Decisions**:
- Migration strategy: Schema migration with backfill (Option B)
- Encryption: Add error handling, don't require key
- Marketplace: Return hardcoded popular list for empty queries

**Guardrails**:
- Must NOT drop data tables
- Must NOT require STORAGE_ENCRYPTION_KEY
- Must backup database before schema changes
- Must verify each migration applies cleanly

---

## Work Objectives

### Core Objective
Restore skills and memory functionality by fixing the migration system and running all pending database migrations.

### Concrete Deliverables
- Migration table with `version` column added
- Migrations 007-027 applied to database
- Skills table with complete schema (10 columns including mode/tags)
- Memory table with FTS5 search capability
- Encryption error eliminated from logs
- Marketplace API returning popular skills list

### Definition of Done
- [ ] `sqlite3 ~/.omniroute/omniroute.db "PRAGMA table_info(skills);"` shows mode/source_provider/tags/install_count columns
- [ ] `sqlite3 ~/.omniroute/omniroute.db "SELECT COUNT(*) FROM memories;"` returns 0 (table exists)
- [ ] `curl http://localhost:3000/api/skills` returns skills list without errors
- [ ] `curl http://localhost:3000/api/skills/marketplace` returns popular skills array
- [ ] No encryption errors in logs after restart
- [ ] Skills dashboard tab loads without errors
- [ ] Memory settings page loads without errors

### Must Have
- Database backup before any schema changes
- Transaction-wrapped migration execution
- Error handling in encryption decrypt()
- Popular skills returned for empty marketplace query

### Must NOT Have (Guardrails)
- Drop any data tables (provider_connections, combos, api_keys, etc.)
- Require STORAGE_ENCRYPTION_KEY environment variable
- Call external SkillsMP API (use local constant)
- Modify existing migration SQL files
- Touch working systems (routing, combos, providers)

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: YES (bun test, vitest, Node.js test runner)
- **Automated tests**: Tests-after (verify migrations, API responses, error handling)
- **Framework**: Node.js test runner for integration tests

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Database operations**: Use Bash (sqlite3) — Query tables, verify schema, count rows
- **API endpoints**: Use Bash (curl) — Send requests, assert status + response fields
- **Error logs**: Use Bash (grep) — Search logs for encryption errors, verify absence

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation - 3 tasks in parallel):
├── Task 1: Database backup + migration table schema fix [quick]
├── Task 2: Add encryption error handling [quick]
└── Task 3: Update marketplace API to return popular skills [quick]

Wave 2 (After Wave 1 - run migrations sequentially):
└── Task 4: Run pending migrations 007-027 [deep]

Wave 3 (After Wave 2 - verification, 3 tasks in parallel):
├── Task 5: Verify skills system functionality [unspecified-high]
├── Task 6: Verify memory system functionality [unspecified-high]
└── Task 7: Integration test - full workflow [deep]

Wave FINAL (After ALL tasks - independent review, 2 parallel):
├── Task F1: Plan compliance audit (oracle)
└── Task F2: Real manual QA (unspecified-high)

Critical Path: Task 1 → Task 4 → Task 5/6/7 → F1/F2
Parallel Speedup: ~40% faster than sequential
Max Concurrent: 3 (Waves 1 & 3)
```

### Dependency Matrix

| Task | Depends On | Blocks | Wave |
|------|-----------|--------|------|
| 1 | — | 4 | 1 |
| 2 | — | 7 | 1 |
| 3 | — | 7 | 1 |
| 4 | 1 | 5, 6, 7 | 2 |
| 5 | 4 | F1, F2 | 3 |
| 6 | 4 | F1, F2 | 3 |
| 7 | 2, 3, 4 | F1, F2 | 3 |
| F1 | 5, 6, 7 | — | FINAL |
| F2 | 5, 6, 7 | — | FINAL |

### Agent Dispatch Summary

- **Wave 1**: 3 tasks → `quick` (T1, T2, T3)
- **Wave 2**: 1 task → `deep` (T4)
- **Wave 3**: 3 tasks → `unspecified-high` (T5, T6), `deep` (T7)
- **Wave FINAL**: 2 tasks → `oracle` (F1), `unspecified-high` (F2)

---

## TODOs

> Implementation + Test = ONE Task. Never separate.
> EVERY task MUST have: Recommended Agent Profile + Parallelization info + QA Scenarios.

- [x] 1. Database Backup + Fix Migration Table Schema

  **What to do**:
  - Backup database: `cp ~/.omniroute/omniroute.db ~/.omniroute/db_backups/pre-migration-fix-$(date +%Y%m%d-%H%M%S).db`
  - Add `version` column: `ALTER TABLE _omniroute_migrations ADD COLUMN version TEXT;`
  - Backfill version numbers by extracting from `name` column (e.g., "001_initial_schema.sql" → "001")
  - Create index: `CREATE INDEX IF NOT EXISTS idx_migrations_version ON _omniroute_migrations(version);`
  - Verify: Query table to confirm version column populated correctly

  **Must NOT do**:
  - Drop or truncate _omniroute_migrations table
  - Modify any data tables
  - Delete migration files

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single table schema change, straightforward SQL operations
  - **Skills**: []
    - No specialized skills needed - pure SQL operations

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Task 4 (migrations can't run until table fixed)
  - **Blocked By**: None (can start immediately)

  **References**:
  - `src/lib/db/core.ts:56-58` - DATA_DIR resolution, database path
  - `src/lib/db/migrationRunner.ts:127-131` - getAppliedVersions() expects version column
  - Current schema: `CREATE TABLE _omniroute_migrations (id INTEGER PRIMARY KEY, name TEXT UNIQUE NOT NULL, applied_at TEXT NOT NULL);`
  - Migration files: `src/lib/db/migrations/*.sql` follow `NNN_description.sql` naming

  **Acceptance Criteria**:
  - [ ] Backup file exists: `ls ~/.omniroute/db_backups/pre-migration-fix-*.db`
  - [ ] Version column added: `sqlite3 ~/.omniroute/omniroute.db "PRAGMA table_info(_omniroute_migrations);"` shows version
  - [ ] Versions backfilled: `sqlite3 ~/.omniroute/omniroute.db "SELECT COUNT(*) FROM _omniroute_migrations WHERE version IS NOT NULL;"` returns 6

  **QA Scenarios**:
  ```
  Scenario: Backup database before schema changes
    Tool: Bash
    Steps:
      1. Run: cp ~/.omniroute/omniroute.db ~/.omniroute/db_backups/pre-migration-fix-$(date +%Y%m%d-%H%M%S).db
      2. Run: ls -lh ~/.omniroute/db_backups/pre-migration-fix-*.db | tail -1
      3. Assert: File size > 600KB
    Expected Result: Backup file created with matching size
    Evidence: .sisyphus/evidence/task-1-backup.txt

  Scenario: Add version column and backfill
    Tool: Bash (sqlite3)
    Steps:
      1. Run: sqlite3 ~/.omniroute/omniroute.db "ALTER TABLE _omniroute_migrations ADD COLUMN version TEXT;"
      2. Run: sqlite3 ~/.omniroute/omniroute.db "UPDATE _omniroute_migrations SET version = substr(name, 1, 3);"
      3. Run: sqlite3 ~/.omniroute/omniroute.db "SELECT version, name FROM _omniroute_migrations ORDER BY version;"
      4. Assert: All 6 rows have version populated (001-006)
    Expected Result: Version column exists, all rows have 3-digit versions
    Evidence: .sisyphus/evidence/task-1-version-backfill.txt
  ```

  **Commit**: YES
  - Message: `fix(db): add version column to migration tracking table`

- [x] 2. Add Encryption Error Handling

  **What to do**:
  - Edit `src/lib/db/encryption.ts` decrypt() function (lines 102-139)
  - Wrap decipher.final() in try-catch (line 132)
  - On error: log warning with context, return ciphertext unchanged
  - Add test case for decrypt with invalid auth tag

  **Must NOT do**:
  - Change encryption algorithm or format
  - Require STORAGE_ENCRYPTION_KEY
  - Modify encrypt() function

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single function error handling, 5-10 lines of code
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3)
  - **Blocks**: Task 7 (integration test)
  - **Blocked By**: None

  **References**:
  - `src/lib/db/encryption.ts:102-139` - decrypt() function implementation
  - `src/lib/db/encryption.ts:134-138` - Current error handling (logs but returns ciphertext)
  - Error message: "Unsupported state or unable to authenticate data" from Node.js crypto

  **Acceptance Criteria**:
  - [ ] decrypt() has try-catch around decipher.final()
  - [ ] Error logged with context (not just message)
  - [ ] Returns ciphertext on error (no crash)

  **QA Scenarios**:
  ```
  Scenario: Decrypt with invalid auth tag doesn't crash
    Tool: Bash (node REPL)
    Steps:
      1. Create test file: echo 'const {decrypt} = require("./src/lib/db/encryption.ts"); console.log(decrypt("enc:v1:0000:0000:0000"));' > /tmp/test-decrypt.js
      2. Run: node --import tsx/esm /tmp/test-decrypt.js
      3. Assert: No crash, returns "enc:v1:0000:0000:0000"
    Expected Result: Function returns input unchanged, no exception
    Evidence: .sisyphus/evidence/task-2-decrypt-error.txt
  ```

  **Commit**: YES
  - Message: `fix(encryption): add error handling for missing key`

- [x] 3. Update Marketplace API to Return Popular Skills

  **What to do**:
  - Edit `src/app/api/skills/marketplace/route.ts`
  - When query is empty (q=""), return POPULAR_BY_PROVIDER constant
  - Use current skillsProvider setting to select correct list
  - Format response: `{ skills: [{ name, description, version, sourceUrl }] }`

  **Must NOT do**:
  - Call external SkillsMP API
  - Modify POPULAR_BY_PROVIDER constant
  - Change authentication logic

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple conditional logic, 10-15 lines of code
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: Task 7 (integration test)
  - **Blocked By**: None

  **References**:
  - `src/app/api/skills/route.ts:6-9` - POPULAR_BY_PROVIDER constant definition
  - `src/app/api/skills/marketplace/route.ts:5-41` - Current marketplace API implementation
  - `src/lib/skills/providerSettings.ts` - getSkillsProviderSetting() function

  **Acceptance Criteria**:
  - [ ] Empty query returns popular skills list
  - [ ] Non-empty query still searches SkillsMP
  - [ ] Response format matches existing structure

  **QA Scenarios**:
  ```
  Scenario: Empty query returns popular skills
    Tool: Bash (curl)
    Steps:
      1. Run: curl -s http://localhost:3000/api/skills/marketplace | jq '.skills | length'
      2. Assert: Returns 5 (default popular list size)
      3. Run: curl -s http://localhost:3000/api/skills/marketplace | jq '.skills[0].name'
      4. Assert: Returns skill name from POPULAR_BY_PROVIDER
    Expected Result: Popular skills array returned
    Evidence: .sisyphus/evidence/task-3-popular-skills.txt
  ```

  **Commit**: YES
  - Message: `feat(skills): return popular skills in marketplace API`

- [x] 4. Run Pending Migrations 007-027

  **What to do**:
  - Verify migration table has version column (Task 1 complete)
  - Run migration runner: import and call runMigrations() from migrationRunner.ts
  - Migrations will run in transaction, one at a time
  - Verify each migration applies cleanly
  - Check final migration count: should be 27 total

  **Must NOT do**:
  - Modify migration SQL files
  - Skip any migrations
  - Run migrations out of order

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Critical operation, needs careful verification, potential rollback
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (sequential, after Wave 1)
  - **Blocks**: Tasks 5, 6, 7 (verification depends on migrations)
  - **Blocked By**: Task 1 (needs version column)

  **References**:
  - `src/lib/db/migrationRunner.ts:260-350` - runMigrations() main function
  - `src/lib/db/migrations/007_*.sql` through `027_*.sql` - Pending migration files
  - `src/lib/db/core.ts:200-210` - getDbInstance() calls runMigrations()

  **Acceptance Criteria**:
  - [ ] All 27 migrations applied: `SELECT COUNT(*) FROM _omniroute_migrations` returns 27
  - [ ] Skills table exists with all columns
  - [ ] Memory table exists with FTS5
  - [ ] No migration errors in logs

  **QA Scenarios**:
  ```
  Scenario: Run migrations and verify completion
    Tool: Bash
    Steps:
      1. Run: cd /home/openclaw/OmniRoute && npm run dev &
      2. Wait 10 seconds for startup
      3. Run: sqlite3 ~/.omniroute/omniroute.db "SELECT COUNT(*) FROM _omniroute_migrations;"
      4. Assert: Returns 27
      5. Run: sqlite3 ~/.omniroute/omniroute.db "PRAGMA table_info(skills);" | wc -l
      6. Assert: Returns 10+ (all columns including mode/tags)
    Expected Result: All migrations applied, tables created
    Evidence: .sisyphus/evidence/task-4-migrations.txt

  Scenario: Verify skills table schema
    Tool: Bash (sqlite3)
    Steps:
      1. Run: sqlite3 ~/.omniroute/omniroute.db "PRAGMA table_info(skills);" | grep mode
      2. Assert: mode column exists
      3. Run: sqlite3 ~/.omniroute/omniroute.db "PRAGMA table_info(skills);" | grep source_provider
      4. Assert: source_provider column exists
    Expected Result: All expected columns present
    Evidence: .sisyphus/evidence/task-4-skills-schema.txt
  ```

  **Commit**: YES
  - Message: `feat(db): apply pending migrations 007-027`

- [x] 5. Verify Skills System Functionality

  **What to do**:
  - Test skills API endpoints: GET /api/skills, GET /api/skills/marketplace
  - Verify skills dashboard page loads without errors
  - Check skills table can be queried
  - Test skill registration (create a test skill)
  - Verify mode/provider/tags columns are accessible

  **Must NOT do**:
  - Modify skills code
  - Create production skills
  - Change database schema

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Comprehensive verification across multiple endpoints
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Task 6)
  - **Blocks**: F1, F2 (final verification)
  - **Blocked By**: Task 4 (needs migrations applied)

  **References**:
  - `src/app/api/skills/route.ts` - Skills list API
  - `src/app/(dashboard)/dashboard/skills/page.tsx` - Skills dashboard UI
  - `src/lib/skills/registry.ts` - Skill registration logic

  **Acceptance Criteria**:
  - [ ] GET /api/skills returns 200 with data array
  - [ ] GET /api/skills/marketplace returns popular skills
  - [ ] Skills dashboard loads without console errors
  - [ ] Can query skills table directly

  **QA Scenarios**:
  ```
  Scenario: Skills API returns valid response
    Tool: Bash (curl)
    Steps:
      1. Run: curl -s -w "%{http_code}" http://localhost:3000/api/skills
      2. Assert: Status code 200
      3. Run: curl -s http://localhost:3000/api/skills | jq '.data'
      4. Assert: Returns array (may be empty)
    Expected Result: API responds successfully
    Evidence: .sisyphus/evidence/task-5-skills-api.txt

  Scenario: Skills table is queryable
    Tool: Bash (sqlite3)
    Steps:
      1. Run: sqlite3 ~/.omniroute/omniroute.db "SELECT COUNT(*) FROM skills;"
      2. Assert: No error (returns 0 or more)
      3. Run: sqlite3 ~/.omniroute/omniroute.db "SELECT mode, source_provider FROM skills LIMIT 1;"
      4. Assert: No "no such column" error
    Expected Result: Table exists and is queryable
    Evidence: .sisyphus/evidence/task-5-skills-table.txt
  ```

  **Commit**: NO

- [x] 6. Verify Memory System Functionality

  **What to do**:
  - Test memory table exists and is queryable
  - Verify memory FTS5 search is configured
  - Test memory settings API: GET /api/settings/memory
  - Check memory extraction/injection modules can access table
  - Verify no errors in logs related to memory

  **Must NOT do**:
  - Modify memory code
  - Create test memories in production
  - Change FTS5 configuration

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Comprehensive verification across multiple components
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Task 5)
  - **Blocks**: F1, F2 (final verification)
  - **Blocked By**: Task 4 (needs migrations applied)

  **References**:
  - `src/lib/memory/store.ts` - Memory CRUD operations
  - `src/app/api/settings/memory/route.ts` - Memory settings API
  - `src/lib/db/migrations/015_create_memories.sql` - Memory table schema
  - `src/lib/db/migrations/022_add_memory_fts5.sql` - FTS5 configuration

  **Acceptance Criteria**:
  - [ ] Memory table exists and is queryable
  - [ ] FTS5 virtual table exists: memory_fts
  - [ ] GET /api/settings/memory returns 200
  - [ ] No memory-related errors in logs

  **QA Scenarios**:
  ```
  Scenario: Memory table exists with correct schema
    Tool: Bash (sqlite3)
    Steps:
      1. Run: sqlite3 ~/.omniroute/omniroute.db "SELECT COUNT(*) FROM memories;"
      2. Assert: Returns 0 (table exists, empty)
      3. Run: sqlite3 ~/.omniroute/omniroute.db "PRAGMA table_info(memories);" | grep type
      4. Assert: type column exists
    Expected Result: Table exists with correct schema
    Evidence: .sisyphus/evidence/task-6-memory-table.txt

  Scenario: Memory FTS5 search is configured
    Tool: Bash (sqlite3)
    Steps:
      1. Run: sqlite3 ~/.omniroute/omniroute.db "SELECT name FROM sqlite_master WHERE type='table' AND name='memory_fts';"
      2. Assert: Returns "memory_fts"
      3. Run: sqlite3 ~/.omniroute/omniroute.db "SELECT sql FROM sqlite_master WHERE name='memory_fts';"
      4. Assert: Contains "fts5"
    Expected Result: FTS5 virtual table configured
    Evidence: .sisyphus/evidence/task-6-memory-fts.txt
  ```

  **Commit**: NO

- [x] 7. Integration Test - Full Workflow

  **What to do**:
  - Start OmniRoute server
  - Test complete workflow: skills + memory + encryption
  - Verify no encryption errors in logs
  - Test skills dashboard loads
  - Test memory settings page loads
  - Check marketplace returns popular skills
  - Verify all systems working together

  **Must NOT do**:
  - Modify any code
  - Change configuration
  - Create production data

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: End-to-end integration testing, critical verification
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (after Tasks 5, 6)
  - **Blocks**: F1, F2 (final verification)
  - **Blocked By**: Tasks 2, 3, 4 (needs all fixes applied)

  **References**:
  - All previous tasks
  - `src/app/(dashboard)/dashboard/skills/page.tsx` - Skills UI
  - `src/app/api/settings/memory/route.ts` - Memory API

  **Acceptance Criteria**:
  - [ ] Server starts without errors
  - [ ] No encryption errors in logs
  - [ ] Skills dashboard accessible
  - [ ] Memory settings accessible
  - [ ] Marketplace returns popular skills

  **QA Scenarios**:
  ```
  Scenario: Full system integration test
    Tool: Bash
    Steps:
      1. Run: npm run dev > /tmp/omniroute-test.log 2>&1 &
      2. Wait 15 seconds for startup
      3. Run: curl -s http://localhost:3000/api/skills | jq '.data'
      4. Assert: Returns array
      5. Run: curl -s http://localhost:3000/api/skills/marketplace | jq '.skills | length'
      6. Assert: Returns 5 (popular skills)
      7. Run: grep -c "Unsupported state" /tmp/omniroute-test.log
      8. Assert: Returns 0 (no encryption errors)
    Expected Result: All systems working, no errors
    Evidence: .sisyphus/evidence/task-7-integration.txt
  ```

  **Commit**: YES
  - Message: `test: add integration tests for skills and memory`

---

## Final Verification Wave

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Real Manual QA** — `unspecified-high`
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (skills + memory working together). Test edge cases: empty database, missing env vars, invalid queries. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

---

## Commit Strategy

- **Task 1**: `fix(db): add version column to migration tracking table`
- **Task 2**: `fix(encryption): add error handling for missing key`
- **Task 3**: `feat(skills): return popular skills in marketplace API`
- **Task 4**: `feat(db): apply pending migrations 007-027`
- **Task 7**: `test: add integration tests for skills and memory`

---

## Success Criteria

### Verification Commands
```bash
# Skills table has all columns
sqlite3 ~/.omniroute/omniroute.db "PRAGMA table_info(skills);" | grep -E "(mode|source_provider|tags|install_count)"

# Memory table exists
sqlite3 ~/.omniroute/omniroute.db "SELECT COUNT(*) FROM memories;"

# All migrations applied
sqlite3 ~/.omniroute/omniroute.db "SELECT COUNT(*) FROM _omniroute_migrations WHERE version >= '007';"

# Skills API works
curl -s http://localhost:3000/api/skills | jq '.data | length'

# Marketplace returns popular skills
curl -s http://localhost:3000/api/skills/marketplace | jq '.skills | length'

# No encryption errors in logs
grep -c "Unsupported state or unable to authenticate data" logs/*.log
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] All migrations applied (27 total)
- [ ] Skills and memory tables exist with correct schema
- [ ] No encryption errors in logs
- [ ] Skills dashboard loads without errors
- [ ] Memory settings page loads without errors
- [ ] Marketplace shows popular skills

