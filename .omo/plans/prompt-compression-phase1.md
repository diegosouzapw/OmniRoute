# Modular Prompt Compression Pipeline — Phase 1 (Foundation)

## TL;DR

> **Quick Summary**: Build a modular compression pipeline framework with Lite mode (5 techniques) that proactively reduces token usage before the existing reactive context manager.
>
> **Deliverables**:
> - DB schema and CRUD for compression settings
> - Strategy selector (off/lite/standard/aggressive/ultra modes)
> - Lite compression implementation (whitespace, system prompt dedup, tool compression, redundant removal, image placeholder)
> - Compression stats tracking per request
> - Integration into chatCore request flow
> - Settings API for configuration
> - Unit tests with 60%+ coverage
>
> **Estimated Effort**: Medium
> **Parallel Execution**: YES — 3 waves (7 parallel max)
> **Critical Path**: Task 1 → Task 2 → Task 6 → Task 8 → Task 9 → Task 13 → Final Verification

---

## Context

### Original Request
GitHub Issue #1586: Implement Phase 1 of a modular prompt compression pipeline for OmniRoute. The pipeline should run proactively before the existing reactive context manager, with Lite mode providing 10-15% token savings at <1ms latency.

### Interview Summary
**Key Discussions**:
- **Test Strategy**: Tests after implementation (no TDD), Node.js native test runner, 60% coverage gate
- **Token Counting**: Reuse existing `estimateTokens()` from `contextManager.ts` (simple char-based estimation)
- **DB Pattern**: Follow `settings.ts` pattern with `getDbInstance()`, prepared statements, transactions
- **Integration Point**: Insert compression call before `compressContext()` in `chatCore.ts`

**Research Findings**:
- `compressContext()` at `open-sse/services/contextManager.ts:111-174` uses 3-layer reactive approach
- Token estimation: `Math.ceil(text.length / CHARS_PER_TOKEN)` where `CHARS_PER_TOKEN = 4`
- DB modules use `key_value` table with JSON serialization, backup + cache invalidation on writes
- Services use named exports, kebab-case files, pure functions for testability
- Test framework: Node.js native with `node --import tsx/esm --test`, Vitest for MCP tests

### Metis Review
**Identified Gaps** (addressed):
- None explicitly reported — Metis consultation completed successfully

---

## Work Objectives

### Core Objective
Build a modular compression pipeline framework with Lite mode (5 techniques) that proactively reduces token usage by 10-15% with <1ms latency, configurable per-combo, with stats tracking and settings API.

### Concrete Deliverables
- `src/lib/db/compression.ts` — Compression settings schema (enabled, defaultMode, autoTriggerTokens, cacheMinutes, preserveSystemPrompt, comboOverrides)
- `open-sse/services/compression/strategySelector.ts` — Strategy selection logic with config lookup
- `open-sse/services/compression/lite.ts` — All 5 lite compression techniques implemented
- `open-sse/services/compression/stats.ts` — Per-request compression stats tracking
- `open-sse/handlers/chatCore.ts` — Compression pipeline called before `compressContext()`
- `src/app/api/v1/settings/compression/route.ts` — GET/PUT compression settings
- `tests/unit/compression/` — Unit tests for all new modules (60%+ coverage)

### Definition of Done
- [ ] All 7 components implemented and tested
- [ ] Compression stats logged to detailed logs
- [ ] Settings API functional (GET/PUT)
- [ ] No regression in existing `compressContext()` behavior
- [ ] Lite mode adds <1ms latency on average requests
- [ ] All tests pass: `npm run test:unit`, `npm run test:coverage` (60%+)
- [ ] No TypeScript errors: `npm run typecheck:core`

### Must Have
- Compression runs proactively before existing context manager
- Lite mode implements all 5 techniques (whitespace, system prompt dedup, tool compression, redundant removal, image placeholder)
- Settings stored in DB with combo override support
- Stats tracking per request (original tokens, compressed tokens, savings %, technique used)
- No changes to existing request flow when compression mode is `off`

### Must NOT Have (Guardrails)
- **Standard/Caveman compression** (Phase 2) — No rule-based NLP or instruction condensation
- **Aggressive compression** (Phase 2) — No history summarization or progressive aging
- **Ultra compression** (Phase 2) — No LLM-assisted perplexity-based pruning
- **UI components** (Phase 2) — No dashboard visualization of compression stats
- **Provider-side caching awareness** (Phase 2) — No Anthropic/OpenAI prompt caching detection
- **Advanced techniques** — No semantic analysis, context-aware pruning, or adaptive strategies

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.
> Acceptance criteria requiring "user manually tests/confirms" are FORBIDDEN.

### Test Decision
- **Infrastructure exists**: YES (Node.js native test runner, Vitest)
- **Automated tests**: YES (Tests after) — Write implementation first, then add unit tests
- **Framework**: Node.js native (`node --import tsx/esm --test`) + Vitest (for MCP compatibility)
- **If Tests after**: Implement all modules, then write comprehensive unit tests

### QA Policy
Every task MUST include agent-executed QA scenarios (see TODO template below).
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Backend/API**: Use Bash (curl) — Send requests, assert status + response fields
- **Service Modules**: Use Bash (node REPL) — Import functions, call with test data, compare output
- **DB Operations**: Use Bash (sqlite3) — Verify schema, query data, validate constraints

---

## Execution Strategy

### Parallel Execution Waves

> Maximize throughput by grouping independent tasks into parallel waves.
> Each wave completes before the next begins.
> Target: 5-8 tasks per wave. Fewer than 3 per wave (except final) = under-splitting.

```
Wave 1 (Start Immediately — foundation + scaffolding):
├── Task 1: Create DB migration for compression settings [quick]
├── Task 2: Implement compression DB module (CRUD) [quick]
├── Task 3: Define compression mode types and interfaces [quick]
├── Task 4: Create compression service directory structure [quick]
├── Task 5: Implement stats module (token tracking) [quick]
├── Task 6: Implement lite compression techniques [deep]
└── Task 7: Implement strategy selector logic [unspecified-high]

Wave 2 (After Wave 1 — integration + API, MAX PARALLEL):
├── Task 8: Integrate compression pipeline into chatCore.ts [deep]
├── Task 9: Implement settings API route (GET/PUT) [quick]
├── Task 10: Add compression stats logging to detailed logs [quick]
├── Task 11: Unit tests for strategy selector [quick]
├── Task 12: Unit tests for lite compression techniques [deep]
├── Task 13: Unit tests for stats module [quick]
└── Task 14: Unit tests for DB module [quick]

Wave 3 (After Wave 2 — verification + cleanup):
├── Task 15: Integration test — full request flow with compression enabled [deep]
├── Task 16: Integration test — compression + context manager interaction [deep]
├── Task 17: Verify no regression in existing compressContext behavior [deep]
├── Task 18: Test coverage validation (60%+ gate) [quick]
├── Task 19: TypeScript type checking (no errors) [quick]
└── Task 20: Documentation updates (AGENTS.md, ARCHITECTURE.md) [quick]

Wave FINAL (After ALL tasks — independent review, 4 parallel):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)

Critical Path: Task 1 → Task 2 → Task 6 → Task 8 → Task 13 → Task 15 → F1-F4
Parallel Speedup: ~65% faster than sequential
Max Concurrent: 7 (Wave 1)
```

### Dependency Matrix

- **1-7**: — — 8-14, 1
- **6**: 3, 5 — 8, 12, 2
- **7**: 2, 3 — 8, 11, 2
- **8**: 6, 7 — 9, 15, 16, 3
- **10**: 5, 8 — 15, 16, 2
- **11**: 7 — 18, 1
- **12**: 6 — 18, 2
- **13**: 5 — 18, 1
- **14**: 2 — 18, 1
- **15**: 8, 10 — 16, 17, 3
- **16**: 8, 10 — 17, 2
- **17**: 8 — 18, 2
- **18**: 11-14, 17 — F1, 2
- **19**: 8, 11-14 — F1, 1
- **20**: All tasks — F1, 1

> This is abbreviated for reference. YOUR generated plan must include the FULL matrix for ALL tasks.

### Agent Dispatch Summary

- **1**: **7** — T1-T4 → `quick`, T5 → `quick`, T6 → `deep`, T7 → `unspecified-high`
- **2**: **8** — T8 → `deep`, T9 → `quick`, T10 → `quick`, T11 → `quick`, T12 → `deep`, T13 → `quick`, T14 → `quick`
- **3**: **6** — T15 → `deep`, T16 → `deep`, T17 → `deep`, T18 → `quick`, T19 → `quick`, T20 → `quick`
- **4**: **4** — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

> Implementation + Test = ONE Task. Never separate.
> EVERY task MUST have: Recommended Agent Profile + Parallelization info + QA Scenarios.
> **A task WITHOUT QA Scenarios is INCOMPLETE. No exceptions.**

- [ ] 1. Create DB migration for compression settings

  **What to do**:
  - Create migration file `db/migrations/022_compression_settings.sql`
  - Define table structure for compression settings (no new table, use existing `key_value`)
  - Add default compression settings to `key_value` table with namespace='compression'
  - Migration must be idempotent (INSERT OR REPLACE)
  - Include settings: enabled, defaultMode, autoTriggerTokens, cacheMinutes, preserveSystemPrompt, comboOverrides

  **Must NOT do**:
  - Do not create new tables — reuse existing `key_value` pattern
  - Do not add complex constraints — keep it simple JSON storage

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `quick`
    - Reason: Simple SQL migration following existing patterns
  - **Skills**: None required
  - **Skills Evaluated but Omitted**:
    - None — task is straightforward SQL

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2-7)
  - **Blocks**: Task 2 (DB module implementation)
  - **Blocked By**: None (can start immediately)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `db/migrations/001_initial_schema.sql` - Base schema showing `key_value` table structure
  - `db/migrations/021_combo_call_log_targets.sql` - Example of recent migration pattern
  - `src/lib/db/settings.ts:42-79` - `getSettings()` function showing `key_value` query pattern

  **API/Type References** (contracts to implement against):
  - `src/shared/validation/schemas.ts` - Zod schema patterns for settings validation (reference only)

  **Test References** (testing patterns to follow):
  - `tests/unit/db/settings.test.ts` - Settings DB module test patterns (if exists)

  **External References** (libraries and frameworks):
  - better-sqlite3 documentation: https://github.com/WiseLibs/better-sqlite3

  **WHY Each Reference Matters** (explain the relevance):
  - `001_initial_schema.sql`: Shows `key_value` table structure (namespace, key, value) that we must follow
  - `021_combo_call_log_targets.sql`: Recent example of migration pattern, idempotency style
  - `settings.ts:42-79`: Shows how to query and parse JSON values from `key_value` table

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] Migration file created: `db/migrations/022_compression_settings.sql`
  - [ ] Migration runs successfully: `node --import tsx/esm -e "import('./db/migrationRunner.ts').then(m => m.runMigrations())"`
  - [ ] Default settings inserted: Query `SELECT * FROM key_value WHERE namespace='compression'` returns 7 rows

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  > **This is NOT optional. A task without QA scenarios WILL BE REJECTED.**
  >
  > Write scenario tests that verify the ACTUAL BEHAVIOR of what you built.
  > Minimum: 1 happy path + 1 failure/edge case per task.
  > Each scenario = exact tool + exact steps + exact assertions + evidence path.
  >
  > **The executing agent MUST run these scenarios after implementation.**
  > **The orchestrator WILL verify evidence files exist before marking task complete.**

  ```
  Scenario: Happy path — migration creates default compression settings
    Tool: Bash (sqlite3)
    Preconditions: Fresh database, migrations table exists
    Steps:
      1. Run migration: `node --import tsx/esm -e "import('./db/migrationRunner.ts').then(m => m.runMigrations())"`
      2. Verify migration tracked: `SELECT * FROM _omniroute_migrations WHERE name='022_compression_settings.sql'`
      3. Query compression settings: `SELECT key, value FROM key_value WHERE namespace='compression'`
    Expected Result: Migration shows as applied, 7 settings rows exist with valid JSON
    Failure Indicators: Migration not tracked, fewer than 7 rows, invalid JSON in value column
    Evidence: .sisyphus/evidence/task-1-migration-success.txt

  Scenario: Idempotency — running migration twice doesn't duplicate data
    Tool: Bash (sqlite3)
    Preconditions: Database already has migration applied
    Steps:
      1. Run migration again: `node --import tsx/esm -e "import('./db/migrationRunner.ts').then(m => m.runMigrations())"`
      2. Count settings rows: `SELECT COUNT(*) as count FROM key_value WHERE namespace='compression'`
    Expected Result: Row count is still 7 (no duplicates), INSERT OR REPLACE worked
    Failure Indicators: Row count > 7, duplicate keys error
    Evidence: .sisyphus/evidence/task-1-idempotency-check.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] SQLite query results in text files

  **Commit**: YES | NO (groups with N)
  - Message: `feat(compression): add DB migration for compression settings`
  - Files: `db/migrations/022_compression_settings.sql`
  - Pre-commit: `npm run typecheck:core`

- [ ] 2. Implement compression DB module (CRUD)

  **What to do**:
  - Create `src/lib/db/compression.ts` with get/update functions
  - Implement `getCompressionSettings()` — query namespace='compression', parse JSON, merge defaults
  - Implement `updateCompressionSettings(updates)` — transaction with INSERT OR REPLACE, backup, cache invalidation
  - Define default settings: enabled=false, defaultMode='off', autoTriggerTokens=0, cacheMinutes=5, preserveSystemPrompt=true, comboOverrides={}
  - Export from `src/lib/db/localDb.ts` for convenience

  **Must NOT do**:
  - Do not create new tables — use existing `key_value` pattern
  - Do not add encryption — compression settings are not sensitive

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `quick`
    - Reason: Straightforward CRUD following existing settings.ts pattern
  - **Skills**: None required
  - **Skills Evaluated but Omitted**:
    - None — follows established DB module pattern

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3-7)
  - **Blocks**: Task 7 (strategy selector), Task 9 (settings API)
  - **Blocked By**: Task 1 (migration must exist first)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `src/lib/db/settings.ts:42-79` - `getSettings()` function showing query pattern
  - `src/lib/db/settings.ts:81-107` - `updateSettings()` function showing transaction pattern
  - `src/lib/db/core.ts` - `getDbInstance()` import pattern

  **API/Type References** (contracts to implement against):
  - `src/lib/db/settings.ts:18-24` - ProxyConfig type pattern (similar structure needed)

  **Test References** (testing patterns to follow):
  - `tests/unit/db/settings.test.ts` - Settings DB module test patterns (if exists)

  **External References** (libraries and frameworks):
  - better-sqlite3 documentation: https://github.com/WiseLibs/better-sqlite3

  **WHY Each Reference Matters** (explain the relevance):
  - `settings.ts:42-79`: Shows exact pattern for querying key_value and parsing JSON
  - `settings.ts:81-107`: Shows transaction pattern, backup call, cache invalidation
  - `core.ts`: Shows how to get database instance singleton

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] Module created: `src/lib/db/compression.ts`
  - [ ] Exports from localDb: Verify `export * from "./compression"` in `src/lib/db/localDb.ts`
  - [ ] getCompressionSettings returns defaults: Call function, verify 7 default settings
  - [ ] updateCompressionSettings persists: Update, query again, verify change persisted

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  ```
  Scenario: Happy path — get compression settings returns defaults
    Tool: Bash (node REPL)
    Preconditions: Database with migration applied
    Steps:
      1. Import function: `import { getCompressionSettings } from './src/lib/db/compression.ts'`
      2. Call function: `const settings = await getCompressionSettings()`
      3. Verify output: Check all 7 default fields present
    Expected Result: settings.enabled=false, settings.defaultMode='off', settings.autoTriggerTokens=0, settings.cacheMinutes=5, settings.preserveSystemPrompt=true, settings.comboOverrides={}
    Failure Indicators: Missing fields, undefined values, wrong default values
    Evidence: .sisyphus/evidence/task-2-get-defaults.txt

  Scenario: Update settings persists across calls
    Tool: Bash (node REPL)
    Preconditions: Database with migration applied
    Steps:
      1. Update settings: `await updateCompressionSettings({ enabled: true, defaultMode: 'lite' })`
      2. Query again: `const updated = await getCompressionSettings()`
      3. Verify persistence: Check updated.enabled===true, updated.defaultMode==='lite'
    Expected Result: Changes persisted, other defaults unchanged
    Failure Indicators: Changes not saved, other defaults overwritten
    Evidence: .sisyphus/evidence/task-2-update-persists.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] REPL output in text files

  **Commit**: YES | NO (groups with N)
  - Message: `feat(compression): implement compression DB module`
  - Files: `src/lib/db/compression.ts`, `src/lib/db/localDb.ts`
  - Pre-commit: `npm run typecheck:core`

- [ ] 3. Define compression mode types and interfaces

  **What to do**:
  - Create `open-sse/services/compression/types.ts`
  - Define `CompressionMode` enum: 'off' | 'lite' | 'standard' | 'aggressive' | 'ultra'
  - Define `CompressionConfig` interface: enabled, defaultMode, autoTriggerTokens, cacheMinutes, preserveSystemPrompt, comboOverrides
  - Define `CompressionStats` interface: originalTokens, compressedTokens, savingsPercent, techniquesUsed, mode, timestamp
  - Define `CompressionResult` interface: body, compressed, stats
  - Export all types

  **Must NOT do**:
  - Do not add any implementation logic — this is types only
  - Do not import from other modules — keep types pure

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `quick`
    - Reason: Pure TypeScript types, no implementation logic
  - **Skills**: None required
  - **Skills Evaluated but Omitted**:
    - None — type definition only

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4-7)
  - **Blocks**: Task 6 (lite compression), Task 7 (strategy selector), Task 8 (chatCore integration)
  - **Blocked By**: None (can start immediately)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `open-sse/services/contextManager.ts:113-114` - Options interface pattern for similar functions
  - `src/lib/db/settings.ts:12-15` - Type definition patterns for settings

  **API/Type References** (contracts to implement against):
  - None — defining new types

  **Test References** (testing patterns to follow):
  - `tests/unit/compression/types.test.ts` - Type validation tests (will create)

  **External References** (libraries and frameworks):
  - TypeScript documentation: https://www.typescriptlang.org/docs/handbook/2/types-from-types.html

  **WHY Each Reference Matters** (explain the relevance):
  - `contextManager.ts:113-114`: Shows how to define function options interface
  - `settings.ts:12-15`: Shows type definitions for settings structures

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] Types file created: `open-sse/services/compression/types.ts`
  - [ ] All types defined: CompressionMode enum, CompressionConfig, CompressionStats, CompressionResult
  - [ ] Types compile: `npm run typecheck:core` no errors
  - [ ] Exports correct: Verify named exports for all types

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  ```
  Scenario: Happy path — types compile and export correctly
    Tool: Bash (tsc)
    Preconditions: Types file created
    Steps:
      1. Run typecheck: `npm run typecheck:core`
      2. Verify compilation: No TypeScript errors
      3. Check exports: `grep -E "^export (type|enum|interface)" open-sse/services/compression/types.ts`
    Expected Result: 4 exports found (enum, 3 interfaces), no type errors
    Failure Indicators: TypeScript errors, missing exports, syntax errors
    Evidence: .sisyphus/evidence/task-3-types-compile.txt

  Scenario: Type safety — verify types match expected structure
    Tool: Bash (node REPL)
    Preconditions: Types file created
    Steps:
      1. Import types: `import { CompressionMode, CompressionConfig } from './open-sse/services/compression/types.ts'`
      2. Create valid config: `const config: CompressionConfig = { enabled: true, defaultMode: 'lite', autoTriggerTokens: 1000, cacheMinutes: 5, preserveSystemPrompt: true, comboOverrides: {} }`
      3. Verify enum: `CompressionMode.lite === 'lite'`
    Expected Result: No type errors, config validates, enum values correct
    Failure Indicators: Type mismatch, missing required fields, invalid enum value
    Evidence: .sisyphus/evidence/task-3-type-safety.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] TypeScript compilation output in text files

  **Commit**: YES | NO (groups with N)
  - Message: `feat(compression): add compression types and interfaces`
  - Files: `open-sse/services/compression/types.ts`
  - Pre-commit: `npm run typecheck:core`

- [ ] 4. Create compression service directory structure

  **What to do**:
  - Create `open-sse/services/compression/` directory
  - Create `open-sse/services/compression/index.ts` that re-exports all public functions
  - Add placeholder exports for future modules: strategySelector, lite, stats
  - Ensure directory structure matches existing service patterns

  **Must NOT do**:
  - Do not add implementation code — this is scaffolding only
  - Do not create circular dependencies

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `quick`
    - Reason: Directory scaffolding following existing patterns
  - **Skills**: None required
  - **Skills Evaluated but Omitted**:
    - None — scaffolding only

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-3, 5-7)
  - **Blocks**: None (unblocks future tasks by establishing structure)
  - **Blocked By**: None (can start immediately)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `open-sse/services/` - Existing service directory structure
  - `open-sse/services/combo.ts` - Example of service file with exports

  **API/Type References** (contracts to implement against):
  - `open-sse/services/compression/types.ts` - Types defined in Task 3

  **Test References** (testing patterns to follow):
  - None — scaffolding only

  **External References** (libraries and frameworks):
  - None

  **WHY Each Reference Matters** (explain the relevance):
  - `open-sse/services/`: Shows directory naming and organization pattern
  - `combo.ts`: Shows export patterns for service modules

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] Directory created: `open-sse/services/compression/`
  - [ ] Index file created: `open-sse/services/compression/index.ts`
  - [ ] Exports defined: Placeholder exports for strategySelector, lite, stats
  - [ ] Types compile: `npm run typecheck:core` no errors

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  ```
  Scenario: Happy path — directory structure created correctly
    Tool: Bash (ls)
    Preconditions: None
    Steps:
      1. Verify directory: `ls -la open-sse/services/compression/`
      2. Verify index: `cat open-sse/services/compression/index.ts`
      3. Check types: `npm run typecheck:core`
    Expected Result: Directory exists, index.ts has placeholder exports, no type errors
    Failure Indicators: Directory missing, index.ts missing, type errors
    Evidence: .sisyphus/evidence/task-4-directory-structure.txt

  Scenario: Index exports are valid TypeScript
    Tool: Bash (tsc)
    Preconditions: Index file created
    Steps:
      1. Run typecheck: `npm run typecheck:core`
      2. Verify no errors related to compression/index.ts
    Expected Result: No TypeScript errors from index file
    Failure Indicators: TypeScript syntax errors, export errors
    Evidence: .sisyphus/evidence/task-4-index-types.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] Directory listing in text files

  **Commit**: YES | NO (groups with N)
  - Message: `feat(compression): create compression service directory`
  - Files: `open-sse/services/compression/index.ts`
  - Pre-commit: `npm run typecheck:core`

- [ ] 5. Implement stats module (token tracking)

  **What to do**:
  - Create `open-sse/services/compression/stats.ts`
  - Implement `estimateCompressionTokens(text)` — wrapper for `estimateTokens()` from contextManager
  - Implement `createCompressionStats(originalBody, compressedBody, mode, techniquesUsed)` — calculate original/compressed tokens, savings %, return CompressionStats object
  - Implement `trackCompressionStats(stats)` — log to detailed logs if enabled
  - Export all functions

  **Must NOT do**:
  - Do not add new token counting logic — reuse existing `estimateTokens()`
  - Do not persist stats to DB — logging only for Phase 1

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `quick`
    - Reason: Simple wrapper and calculation functions, no complex logic
  - **Skills**: None required
  - **Skills Evaluated but Omitted**:
    - None — straightforward implementation

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-4, 6-7)
  - **Blocks**: Task 6 (lite compression), Task 8 (chatCore integration), Task 10 (stats logging)
  - **Blocked By**: Task 3 (types must be defined first)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `open-sse/services/contextManager.ts:53-57` - `estimateTokens()` function implementation
  - `open-sse/utils/usageTracking.ts` - Usage tracking patterns (for logging reference)

  **API/Type References** (contracts to implement against):
  - `open-sse/services/compression/types.ts` - CompressionStats, CompressionResult interfaces

  **Test References** (testing patterns to follow):
  - `tests/unit/compression/stats.test.ts` - Stats module tests (will create)

  **External References** (libraries and frameworks):
  - None

  **WHY Each Reference Matters** (explain the relevance):
  - `contextManager.ts:53-57`: Shows `estimateTokens()` implementation to reuse
  - `usageTracking.ts`: Shows how to track and log usage statistics

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] Module created: `open-sse/services/compression/stats.ts`
  - [ ] estimateCompressionTokens works: Test with known input, verify output matches estimateTokens()
  - [ ] createCompressionStats calculates correctly: Test with original/compressed bodies, verify savings % correct
  - [ ] trackCompressionStats logs: Enable detailed logs, verify stats appear in logs

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  ```
  Scenario: Happy path — token estimation matches existing function
    Tool: Bash (node REPL)
    Preconditions: Module created, types imported
    Steps:
      1. Import function: `import { estimateCompressionTokens } from './open-sse/services/compression/stats.ts'`
      2. Test with known text: `const tokens = estimateCompressionTokens('hello world')`
      3. Compare with original: `import { estimateTokens } from '../contextManager'; const expected = estimateTokens('hello world')`
    Expected Result: tokens === expected (both return 3 for 11 chars / 4 = 2.75 → ceil = 3)
    Failure Indicators: Different results, calculation errors
    Evidence: .sisyphus/evidence/task-5-token-estimation.txt

  Scenario: Stats calculation is accurate
    Tool: Bash (node REPL)
    Preconditions: Module created, types imported
    Steps:
      1. Create test bodies: `const original = { messages: [{role: 'user', content: 'x'.repeat(100)}] }`
      2. Create compressed: `const compressed = { messages: [{role: 'user', content: 'x'.repeat(80)}] }`
      3. Calculate stats: `const stats = createCompressionStats(original, compressed, 'lite', ['whitespace'])`
      4. Verify: Check stats.savingsPercent ≈ 20% ((100-80)/100*20)
    Expected Result: savingsPercent calculated correctly, techniquesUsed populated
    Failure Indicators: Wrong percentage, zero tokens, missing fields
    Evidence: .sisyphus/evidence/task-5-stats-calculation.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] REPL output in text files

  **Commit**: YES | NO (groups with N)
  - Message: `feat(compression): implement compression stats module`
  - Files: `open-sse/services/compression/stats.ts`
  - Pre-commit: `npm run typecheck:core`

- [ ] 6. Implement lite compression techniques

  **What to do**:
  - Create `open-sse/services/compression/lite.ts`
  - Implement `collapseWhitespace(messages)` — Reduce 3+ newlines to 2, trim trailing spaces, normalize internal spacing
  - Implement `dedupSystemPrompt(messages)` — Detect and remove repeated system instructions across messages
  - Implement `compressToolResults(messages)` — Replace verbose JSON keys with shorter aliases, truncate long results
  - Implement `removeRedundantContent(messages)` — Remove duplicate consecutive messages
  - Implement `replaceImageUrls(messages, model)` — Replace base64 images with `[image: WxH, format]` for non-vision models
  - Implement `applyLiteCompression(body)` — Orchestrates all 5 techniques in order, returns compressed body
  - Export all functions

  **Must NOT do**:
  - Do not implement standard/aggressive/ultra techniques — Phase 2 only
  - Do not modify message roles or structure beyond what's specified
  - Do not use LLM or complex NLP — simple string/JSON manipulation only

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `deep`
    - Reason: 5 different techniques, string manipulation, JSON transformation, multiple edge cases
  - **Skills**: None required
  - **Skills Evaluated but Omitted**:
    - None — pure string/JSON manipulation, no external dependencies

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-5, 7)
  - **Blocks**: Task 8 (chatCore integration), Task 12 (lite compression tests)
  - **Blocked By**: Task 3 (types must be defined), Task 5 (stats must be available for verification)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `open-sse/services/contextManager.ts:178-204` - `trimToolMessages()` function for tool result compression
  - `open-sse/services/contextManager.ts:208-255` - `compressThinking()` function for message content manipulation
  - `src/lib/usage/tokenAccounting.ts` - Token counting patterns

  **API/Type References** (contracts to implement against):
  - `open-sse/services/compression/types.ts` - CompressionMode, CompressionResult interfaces

  **Test References** (testing patterns to follow):
  - `tests/unit/compression/lite.test.ts` - Lite compression tests (will create)

  **External References** (libraries and frameworks):
  - None — use native string/JSON manipulation

  **WHY Each Reference Matters** (explain the relevance):
  - `contextManager.ts:178-204`: Shows existing tool result truncation pattern to build on
  - `contextManager.ts:208-255`: Shows message content manipulation and filtering patterns
  - `tokenAccounting.ts`: Shows token counting approaches for verification

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] Module created: `open-sse/services/compression/lite.ts`
  - [ ] All 5 techniques implemented and tested individually
  - [ ] applyLiteCompression orchestrates all techniques
  - [ ] Whitespace collapse reduces 3+ newlines to 2
  - [ ] System prompt dedup removes repeats
  - [ ] Tool result compression truncates long results
  - [ ] Redundant content removal removes duplicates
  - [ ] Image URL replacement works for non-vision models

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  ```
  Scenario: Happy path — all 5 techniques work together
    Tool: Bash (node REPL)
    Preconditions: Module created, types imported
    Steps:
      1. Create test body: `const body = { messages: [{role: 'system', content: 'You are helpful.\n\nYou are helpful.'}, {role: 'user', content: 'test\n\n\n\nmessage'}, {role: 'user', content: 'test message'}, {role: 'user', content: 'test message'}]}`
      2. Apply compression: `const result = applyLiteCompression(body, { model: 'gpt-3.5-turbo' })`
      3. Verify: Check messages array length reduced, whitespace normalized
    Expected Result: Duplicate messages removed, whitespace collapsed, system deduped
    Failure Indicators: No changes, messages corrupted, wrong array length
    Evidence: .sisyphus/evidence/task-6-lite-all-techniques.txt

  Scenario: Image URL replacement for non-vision models
    Tool: Bash (node REPL)
    Preconditions: Module created
    Steps:
      1. Create body with image: `const body = { messages: [{role: 'user', content: [{type: 'image_url', image_url: {url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...'}}]}]}`
      2. Apply compression with non-vision model: `const result = applyLiteCompression(body, { model: 'gpt-3.5-turbo' })`
      3. Verify: Image replaced with placeholder: `[image: WxH, png]`
    Expected Result: Image URL replaced, placeholder contains format info
    Failure Indicators: Image not replaced, placeholder wrong format, corrupted content
    Evidence: .sisyphus/evidence/task-6-image-replacement.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] REPL output showing before/after in text files

  **Commit**: YES | NO (groups with N)
  - Message: `feat(compression): implement lite compression techniques`
  - Files: `open-sse/services/compression/lite.ts`
  - Pre-commit: `npm run typecheck:core`

- [ ] 7. Implement strategy selector logic

  **What to do**:
  - Create `open-sse/services/compression/strategySelector.ts`
  - Implement `selectCompressionStrategy(config, comboId, estimatedTokens, provider)` — main selector logic
  - Implement `checkComboOverride(config, comboId)` — Return mode from comboOverrides if exists
  - Implement `shouldAutoTrigger(config, estimatedTokens)` — Check if autoTriggerTokens threshold reached
  - Implement `getEffectiveMode(config, comboId, estimatedTokens, provider)` — Combine all rules: combo override > auto trigger > default mode
  - Implement `applyCompression(body, mode)` — Dispatch to appropriate compression function (lite only for Phase 1)
  - Export all functions

  **Must NOT do**:
  - Do not implement standard/aggressive/ultra compression — return uncompressed body for these modes in Phase 1
  - Do not add provider-side caching awareness — Phase 2 only

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `unspecified-high`
    - Reason: Complex selection logic with multiple rules, mode dispatch, combo overrides
  - **Skills**: None required
  - **Skills Evaluated but Omitted**:
    - None — pure logic implementation, no external dependencies

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-6)
  - **Blocks**: Task 8 (chatCore integration), Task 11 (strategy selector tests)
  - **Blocked By**: Task 2 (DB module for config), Task 3 (types), Task 6 (lite compression to dispatch)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `open-sse/services/combo.ts` - Combo target selection logic with overrides
  - `open-sse/services/contextManager.ts:63-97` - `getTokenLimit()` function showing priority pattern
  - `src/lib/db/settings.ts:42-79` - Settings lookup and default merging pattern

  **API/Type References** (contracts to implement against):
  - `open-sse/services/compression/types.ts` - CompressionMode, CompressionConfig, CompressionResult interfaces
  - `src/lib/db/compression.ts` - CompressionConfig from DB

  **Test References** (testing patterns to follow):
  - `tests/unit/compression/strategySelector.test.ts` - Strategy selector tests (will create)

  **External References** (libraries and frameworks):
  - None

  **WHY Each Reference Matters** (explain the relevance):
  - `combo.ts`: Shows combo override pattern and target selection logic
  - `contextManager.ts:63-97`: Shows priority/override pattern for settings
  - `settings.ts:42-79`: Shows how to lookup settings and merge defaults

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] Module created: `open-sse/services/compression/strategySelector.ts`
  - [ ] selectCompressionStrategy returns correct mode based on rules
  - [ ] Combo overrides take precedence over default mode
  - [ ] Auto trigger activates when token threshold reached
  - [ ] applyCompression dispatches to lite for Phase 1, returns unchanged for other modes
  - [ ] Priority order: combo override > auto trigger > default mode > off

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  ```
  Scenario: Happy path — default mode selection works
    Tool: Bash (node REPL)
    Preconditions: Module created, DB config loaded
    Steps:
      1. Set default mode: `const config = { enabled: true, defaultMode: 'lite', autoTriggerTokens: 0, ... }`
      2. Select strategy: `const mode = selectCompressionStrategy(config, null, 1000, 'openai')`
      3. Verify: Check mode === 'lite'
    Expected Result: Returns 'lite' from default mode
    Failure Indicators: Wrong mode, undefined returned, error thrown
    Evidence: .sisyphus/evidence/task-7-default-mode.txt

  Scenario: Combo override takes precedence
    Tool: Bash (node REPL)
    Preconditions: Module created, DB config loaded
    Steps:
      1. Set config with override: `const config = { enabled: true, defaultMode: 'off', comboOverrides: { 'my-combo': 'lite' }, ... }`
      2. Select strategy with combo: `const mode = selectCompressionStrategy(config, 'my-combo', 1000, 'openai')`
      3. Verify: Check mode === 'lite' (not 'off')
    Expected Result: Returns 'lite' from combo override, not default
    Failure Indicators: Returns 'off', override ignored, error
    Evidence: .sisyphus/evidence/task-7-combo-override.txt

  Scenario: Auto trigger activates at threshold
    Tool: Bash (node REPL)
    Preconditions: Module created, DB config loaded
    Steps:
      1. Set config: `const config = { enabled: true, defaultMode: 'off', autoTriggerTokens: 1000, ... }`
      2. Select below threshold: `const mode1 = selectCompressionStrategy(config, null, 500, 'openai')`
      3. Select above threshold: `const mode2 = selectCompressionStrategy(config, null, 1500, 'openai')`
    Expected Result: mode1 === 'off', mode2 === 'lite' (auto triggered)
    Failure Indicators: Threshold ignored, always off, always lite
    Evidence: .sisyphus/evidence/task-7-auto-trigger.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] REPL output showing mode selection logic in text files

  **Commit**: YES | NO (groups with N)
  - Message: `feat(compression): implement strategy selector logic`
  - Files: `open-sse/services/compression/strategySelector.ts`
  - Pre-commit: `npm run typecheck:core`

- [ ] 8. Integrate compression pipeline into chatCore.ts

  **What to do**:
  - Modify `open-sse/handlers/chatCore.ts`
  - Import compression functions: `selectCompressionStrategy`, `applyCompression`, `trackCompressionStats`
  - Insert compression call BEFORE existing `compressContext()` call (around line 1223)
  - Get compression config from DB: `import { getCompressionSettings } from "@/lib/db/compression"`
  - Select compression strategy based on config, combo, estimated tokens, provider
  - Apply compression if mode != 'off'
  - Track compression stats (original tokens, compressed tokens, savings %, techniques used)
  - Log compression stats to detailed logs if enabled
  - Pass compressed body to existing `compressContext()` as before
  - Ensure compression stats are included in response metadata

  **Must NOT do**:
  - Do not modify existing `compressContext()` function — compression runs BEFORE it
  - Do not break existing request flow when compression is 'off'
  - Do not change response format or add new fields to response (stats can be logged but not sent to client)

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `deep`
    - Reason: Integration into core request handler, multiple imports, careful placement, potential for breaking changes
  - **Skills**: None required
  - **Skills Evaluated but Omitted**:
    - None — integration task following existing patterns

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (with Tasks 9-14)
  - **Blocks**: Task 9 (settings API integration), Task 10 (stats logging), Task 15 (integration tests)
  - **Blocked By**: Task 2 (DB module), Task 6 (lite compression), Task 7 (strategy selector), Task 5 (stats)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `open-sse/handlers/chatCore.ts:108` - Existing import of `compressContext` and `estimateTokens`
  - `open-sse/handlers/chatCore.ts:1223` - Location where `compressContext()` is called
  - `open-sse/handlers/chatCore.ts:1253` - Example of usage tracking that compression stats should follow

  **API/Type References** (contracts to implement against):
  - `open-sse/services/compression/strategySelector.ts` - `selectCompressionStrategy`, `applyCompression` functions
  - `open-sse/services/compression/stats.ts` - `trackCompressionStats` function
  - `src/lib/db/compression.ts` - `getCompressionSettings` function

  **Test References** (testing patterns to follow):
  - `tests/integration/compression-flow.test.ts` - Full flow integration tests (will create)

  **External References** (libraries and frameworks):
  - None

  **WHY Each Reference Matters** (explain the relevance):
  - `chatCore.ts:108`: Shows import pattern to follow for compression functions
  - `chatCore.ts:1223`: Shows exact insertion point BEFORE `compressContext()`
  - `chatCore.ts:1253`: Shows how to track and log statistics in the request flow

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] Compression imports added to chatCore.ts
  - [ ] Compression call inserted before `compressContext()`
  - [ ] Compression config loaded from DB
  - [ ] Strategy selected based on rules
  - [ ] Compression applied when mode != 'off'
  - [ ] Stats tracked and logged
  - [ ] Existing request flow unchanged when mode = 'off'
  - [ ] No regression in existing `compressContext()` behavior

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  ```
  Scenario: Happy path — compression runs before context manager
    Tool: Bash (curl)
    Preconditions: OmniRoute running, compression enabled with lite mode
    Steps:
      1. Send request with compression: `curl -X POST http://localhost:20128/v1/chat/completions -H "Content-Type: application/json" -H "Authorization: Bearer test-key" -d '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"test\n\n\n\nmessage"}]}'`
      2. Check logs: `grep -i "compression" ~/.omniroute/logs/application/app.log | tail -10`
    Expected Result: Compression logged, tokens saved reported, whitespace collapsed
    Failure Indicators: No compression logged, error in request flow, response failure
    Evidence: .sisyphus/evidence/task-8-compression-before-context.txt

  Scenario: Compression disabled — no changes to request flow
    Tool: Bash (curl)
    Preconditions: OmniRoute running, compression disabled (mode='off')
    Steps:
      1. Send request: `curl -X POST http://localhost:20128/v1/chat/completions -H "Content-Type: application/json" -H "Authorization: Bearer test-key" -d '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"test"}]}'`
      2. Verify response: Check response is identical to baseline (no compression)
      3. Check logs: Verify no compression logs appear
    Expected Result: Request succeeds, no compression applied, no compression logs
    Failure Indicators: Compression applied unexpectedly, errors in request flow
    Evidence: .sisyphus/evidence/task-8-compression-disabled.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] curl output and log snippets in text files

  **Commit**: YES | NO (groups with N)
  - Message: `feat(compression): integrate pipeline into chatCore`
  - Files: `open-sse/handlers/chatCore.ts`
  - Pre-commit: `npm run test:integration`

- [ ] 9. Implement settings API route (GET/PUT)

  **What to do**:
  - Create `src/app/api/v1/settings/compression/route.ts`
  - Implement GET handler: `export async function GET(request)` — returns compression settings
  - Implement PUT handler: `export async function PUT(request)` — updates compression settings
  - Add authentication: use `withAuth` middleware (from `@/lib/auth`)
  - Add validation: Use Zod schemas for request body validation
  - Call DB functions: `getCompressionSettings()` and `updateCompressionSettings()`
  - Return JSON response with settings or error
  - Export both handlers

  **Must NOT do**:
  - Do not add DELETE handler — not needed for Phase 1
  - Do not expose sensitive data — compression settings are non-sensitive
  - Do not add pagination — settings are single record

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `quick`
    - Reason: Standard Next.js API route pattern following settings API conventions
  - **Skills**: None required
  - **Skills Evaluated but Omitted**:
    - None — follows established API route patterns

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 10-14)
  - **Blocks**: Task 14 (DB module tests), Task 19 (type checking)
  - **Blocked By**: Task 2 (DB module), Task 8 (chatCore integration to test)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `src/app/api/v1/settings/route.ts` - Existing settings API pattern
  - `src/app/api/providers/[id]/route.ts` - API route with authentication pattern
  - `src/lib/auth.ts` - `withAuth` middleware usage

  **API/Type References** (contracts to implement against):
  - `src/lib/db/compression.ts` - `getCompressionSettings`, `updateCompressionSettings` functions
  - `open-sse/services/compression/types.ts` - CompressionConfig interface

  **Test References** (testing patterns to follow):
  - `tests/unit/api/compression-settings.test.ts` - API route tests (will create)

  **External References** (libraries and frameworks):
  - Next.js API Routes documentation: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

  **WHY Each Reference Matters** (explain the relevance):
  - `settings/route.ts`: Shows exact pattern for settings API (GET/PUT handlers)
  - `providers/[id]/route.ts`: Shows authentication middleware pattern
  - `auth.ts`: Shows how to use `withAuth` to protect routes

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] Route file created: `src/app/api/v1/settings/compression/route.ts`
  - [ ] GET returns settings: Curl GET, verify all 7 fields returned
  - [ ] PUT updates settings: Curl PUT with new values, verify persistence
  - [ ] Authentication required: Verify 401 without auth header
  - [ ] Validation works: Send invalid body, verify 400 error
  - [ ] Zod schemas defined: All request fields validated

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  ```
  Scenario: Happy path — GET returns compression settings
    Tool: Bash (curl)
    Preconditions: OmniRoute running, auth key available
    Steps:
      1. Get settings: `curl -X GET http://localhost:20128/api/v1/settings/compression -H "Authorization: Bearer test-key"`
      2. Verify response: Check JSON contains all 7 settings fields
      3. Verify defaults: enabled=false, defaultMode='off', etc.
    Expected Result: 200 OK, JSON with all fields, default values correct
    Failure Indicators: 401 unauthorized, 404 not found, 500 error, missing fields
    Evidence: .sisyphus/evidence/task-9-get-settings.txt

  Scenario: Happy path — PUT updates compression settings
    Tool: Bash (curl)
    Preconditions: OmniRoute running, auth key available
    Steps:
      1. Update settings: `curl -X PUT http://localhost:20128/api/v1/settings/compression -H "Content-Type: application/json" -H "Authorization: Bearer test-key" -d '{"enabled":true,"defaultMode":"lite"}'`
      2. Verify response: Check updated settings returned
      3. Verify persistence: GET again, check enabled=true, defaultMode='lite'
    Expected Result: 200 OK, settings updated and persisted
    Failure Indicators: 400 validation error, 500 error, changes not saved
    Evidence: .sisyphus/evidence/task-9-put-settings.txt

  Scenario: Authentication required
    Tool: Bash (curl)
    Preconditions: OmniRoute running
    Steps:
      1. Request without auth: `curl -X GET http://localhost:20128/api/v1/settings/compression`
    Expected Result: 401 Unauthorized or 403 Forbidden
    Failure Indicators: 200 OK (auth bypass), 500 error
    Evidence: .sisyphus/evidence/task-9-auth-required.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] curl HTTP responses in text files

  **Commit**: YES | NO (groups with N)
  - Message: `feat(compression): add settings API route`
  - Files: `src/app/api/v1/settings/compression/route.ts`
  - Pre-commit: `npm run typecheck:core`

- [ ] 10. Add compression stats logging to detailed logs

  **What to do**:
  - Modify `open-sse/handlers/chatCore.ts` (continuation of Task 8)
  - After compression completes, call `trackCompressionStats(stats)` from stats module
  - Ensure stats are logged to detailed logs (not just console)
  - Include in stats: timestamp, mode, original tokens, compressed tokens, savings %, techniques used
  - Format logs consistently with existing detailed log format

  **Must NOT do**:
  - Do not add stats to response body — Phase 2 only
  - Do not create separate log file — use existing detailed logs mechanism
  - Do not log when compression is disabled — only log when compression actually runs

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `quick`
    - Reason: Simple logging addition following existing patterns
  - **Skills**: None required
  - **Skills Evaluated but Omitted**:
    - None — logging follows existing patterns

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 9, 11-14)
  - **Blocks**: Task 15 (integration tests), Task 16 (context manager interaction test)
  - **Blocked By**: Task 5 (stats module), Task 8 (chatCore integration point)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `open-sse/handlers/chatCore.ts` - Existing logging patterns
  - `open-sse/utils/requestLogger.ts` - Request logging implementation
  - `src/lib/detailedLogs.ts` - Detailed logs DB module

  **API/Type References** (contracts to implement against):
  - `open-sse/services/compression/stats.ts` - `trackCompressionStats` function
  - `open-sse/services/compression/types.ts` - CompressionStats interface

  **Test References** (testing patterns to follow):
  - `tests/integration/compression-flow.test.ts` - Verify stats in logs (will create)

  **External References** (libraries and frameworks):
  - pino logger documentation: https://getpino.io/

  **WHY Each Reference Matters** (explain the relevance):
  - `chatCore.ts`: Shows existing logging patterns throughout the file
  - `requestLogger.ts`: Shows how to log detailed request information
  - `detailedLogs.ts`: Shows how to persist logs to database

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] Stats logged after compression: Verify in detailed logs
  - [ ] All stat fields included: timestamp, mode, tokens, savings, techniques
  - [ ] Logging only when compression runs: No logs when mode='off'
  - [ ] Log format consistent with existing logs

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  ```
  Scenario: Happy path — compression stats appear in detailed logs
    Tool: Bash (curl + sqlite3)
    Preconditions: OmniRoute running, detailed logs enabled, compression enabled
    Steps:
      1. Send request: `curl -X POST http://localhost:20128/v1/chat/completions -H "Content-Type: application/json" -H "Authorization: Bearer test-key" -d '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"test message"}]}'`
      2. Query detailed logs: `sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM detailed_logs ORDER BY timestamp DESC LIMIT 1"`
      3. Search for compression stats: `grep -i "compression" ~/.omniroute/logs/application/app.log | tail -5`
    Expected Result: Compression stats in detailed logs and app logs, all fields present
    Failure Indicators: No stats in logs, missing fields, logging errors
    Evidence: .sisyphus/evidence/task-10-stats-in-logs.txt

  Scenario: No logging when compression disabled
    Tool: Bash (curl)
    Preconditions: OmniRoute running, compression disabled
    Steps:
      1. Send request: `curl -X POST http://localhost:20128/v1/chat/completions -H "Content-Type: application/json" -H "Authorization: Bearer test-key" -d '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"test"}]}'`
      2. Check logs: `grep -i "compression" ~/.omniroute/logs/application/app.log | tail -5`
    Expected Result: No compression logs appear (only normal request logs)
    Failure Indicators: Compression logs appear when disabled
    Evidence: .sisyphus/evidence/task-10-no-logging-disabled.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] SQLite query output and log snippets in text files

  **Commit**: NO (part of Task 8 commit)
  - Message: (included in Task 8 commit)
  - Files: `open-sse/handlers/chatCore.ts`
  - Pre-commit: `npm run test:integration`

- [ ] 11. Unit tests for strategy selector

  **What to do**:
  - Create `tests/unit/compression/strategySelector.test.ts`
  - Test `selectCompressionStrategy` with default mode
  - Test `selectCompressionStrategy` with combo override
  - Test `selectCompressionStrategy` with auto trigger threshold
  - Test `selectCompressionStrategy` priority order: combo override > auto trigger > default mode > off
  - Test `checkComboOverride` with valid combo
  - Test `checkComboOverride` with invalid/missing combo
  - Test `shouldAutoTrigger` with tokens below/above threshold
  - Test `getEffectiveMode` combines all rules correctly
  - Test `applyCompression` dispatches to lite (Phase 1 only)
  - Achieve 60%+ coverage

  **Must NOT do**:
  - Do not test standard/aggressive/ultra modes — Phase 2 only
  - Do not test DB integration — separate test file for that

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `quick`
    - Reason: Pure unit tests, no external dependencies, follows existing test patterns
  - **Skills**: None required
  - **Skills Evaluated but Omitted**:
    - None — straightforward unit tests

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 9, 10, 12-14)
  - **Blocks**: Task 18 (test coverage validation)
  - **Blocked By**: Task 7 (strategy selector implementation)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `tests/unit/context-manager.test.ts` - Context manager unit test patterns
  - `tests/unit/` - General test structure (Node.js native test runner)

  **API/Type References** (contracts to implement against):
  - `open-sse/services/compression/strategySelector.ts` - Functions to test
  - `open-sse/services/compression/types.ts` - Types to use in tests

  **Test References** (testing patterns to follow):
  - None — this IS the test file

  **External References** (libraries and frameworks):
  - Node.js test runner documentation: https://nodejs.org/api/test.html
  - assert module documentation: https://nodejs.org/api/assert.html

  **WHY Each Reference Matters** (explain the relevance):
  - `context-manager.test.ts`: Shows how to write unit tests for service modules
  - `tests/unit/`: Shows directory structure and naming conventions

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] Test file created: `tests/unit/compression/strategySelector.test.ts`
  - [ ] All functions tested: selectCompressionStrategy, checkComboOverride, shouldAutoTrigger, getEffectiveMode, applyCompression
  - [ ] Priority order tested: Verify combo > auto trigger > default > off
  - [ ] Edge cases tested: Missing combo, threshold at boundary, invalid configs
  - [ ] Coverage ≥60%: Run `npm run test:coverage` for this file
  - [ ] All tests pass: `node --import tsx/esm --test tests/unit/compression/strategySelector.test.ts`

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  ```
  Scenario: Happy path — all tests pass
    Tool: Bash (node test runner)
    Preconditions: Strategy selector implemented
    Steps:
      1. Run tests: `node --import tsx/esm --test tests/unit/compression/strategySelector.test.ts`
    Expected Result: All tests pass, no failures
    Failure Indicators: Test failures, syntax errors, import errors
    Evidence: .sisyphus/evidence/task-11-tests-pass.txt

  Scenario: Coverage meets 60% threshold
    Tool: Bash (c8 coverage)
    Preconditions: Tests written
    Steps:
      1. Run coverage: `npm run test:coverage`
      2. Check file coverage: Look for `strategySelector.test.ts` in output
    Expected Result: Coverage ≥60% for strategy selector
    Failure Indicators: Coverage <60%, no coverage report
    Evidence: .sisyphus/evidence/task-11-coverage.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] Test runner output and coverage reports in text files

  **Commit**: YES | NO (groups with N)
  - Message: `test(compression): add strategy selector tests`
  - Files: `tests/unit/compression/strategySelector.test.ts`
  - Pre-commit: `npm run test:unit`

- [ ] 12. Unit tests for lite compression techniques

  **What to do**:
  - Create `tests/unit/compression/lite.test.ts`
  - Test `collapseWhitespace` with various whitespace patterns
  - Test `dedupSystemPrompt` with repeated system messages
  - Test `compressToolResults` with long and short tool results
  - Test `removeRedundantContent` with duplicate messages
  - Test `replaceImageUrls` with image content for vision/non-vision models
  - Test `applyLiteCompression` orchestrates all 5 techniques
  - Test edge cases: Empty messages, single message, no changes needed
  - Achieve 60%+ coverage

  **Must NOT do**:
  - Do not test standard/aggressive/ultra techniques — Phase 2 only
  - Do not test integration with chatCore — separate test file

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `deep`
    - Reason: 5 techniques with multiple edge cases, orchestration testing
  - **Skills**: None required
  - **Skills Evaluated but Omitted**:
    - None — comprehensive unit tests for all techniques

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 9-11, 13-14)
  - **Blocks**: Task 18 (test coverage validation)
  - **Blocked By**: Task 6 (lite compression implementation)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `tests/unit/context-manager.test.ts` - Context manager unit test patterns
  - `tests/unit/` - General test structure (Node.js native test runner)

  **API/Type References** (contracts to implement against):
  - `open-sse/services/compression/lite.ts` - Functions to test
  - `open-sse/services/compression/types.ts` - Types to use in tests

  **Test References** (testing patterns to follow):
  - None — this IS the test file

  **External References** (libraries and frameworks):
  - Node.js test runner documentation: https://nodejs.org/api/test.html
  - assert module documentation: https://nodejs.org/api/assert.html

  **WHY Each Reference Matters** (explain the relevance):
  - `context-manager.test.ts`: Shows how to write unit tests for service modules
  - `tests/unit/`: Shows directory structure and naming conventions

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] Test file created: `tests/unit/compression/lite.test.ts`
  - [ ] All 5 techniques tested individually: collapseWhitespace, dedupSystemPrompt, compressToolResults, removeRedundantContent, replaceImageUrls
  - [ ] Orchestration tested: applyLiteCompression calls all techniques in order
  - [ ] Edge cases tested: Empty messages, single message, no compression needed
  - [ ] Coverage ≥60%: Run `npm run test:coverage` for this file
  - [ ] All tests pass: `node --import tsx/esm --test tests/unit/compression/lite.test.ts`

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  ```
  Scenario: Happy path — all tests pass
    Tool: Bash (node test runner)
    Preconditions: Lite compression implemented
    Steps:
      1. Run tests: `node --import tsx/esm --test tests/unit/compression/lite.test.ts`
    Expected Result: All tests pass, no failures
    Failure Indicators: Test failures, syntax errors, import errors
    Evidence: .sisyphus/evidence/task-12-tests-pass.txt

  Scenario: Coverage meets 60% threshold
    Tool: Bash (c8 coverage)
    Preconditions: Tests written
    Steps:
      1. Run coverage: `npm run test:coverage`
      2. Check file coverage: Look for `lite.test.ts` in output
    Expected Result: Coverage ≥60% for lite compression
    Failure Indicators: Coverage <60%, no coverage report
    Evidence: .sisyphus/evidence/task-12-coverage.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] Test runner output and coverage reports in text files

  **Commit**: YES | NO (groups with N)
  - Message: `test(compression): add lite compression tests`
  - Files: `tests/unit/compression/lite.test.ts`
  - Pre-commit: `npm run test:unit`

- [ ] 13. Unit tests for stats module

  **What to do**:
  - Create `tests/unit/compression/stats.test.ts`
  - Test `estimateCompressionTokens` with various inputs (empty, short, long, objects)
  - Test `createCompressionStats` with original/compressed bodies
  - Verify savings % calculation: (original - compressed) / original * 100
  - Test `trackCompressionStats` logging (mock logger)
  - Test edge cases: Zero tokens, negative savings (shouldn't happen), empty bodies
  - Achieve 60%+ coverage

  **Must NOT do**:
  - Do not test integration with chatCore — separate test file
  - Do not test DB persistence — separate test file

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `quick`
    - Reason: Simple calculation functions, straightforward tests
  - **Skills**: None required
  - **Skills Evaluated but Omitted**:
    - None — simple unit tests

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 9-12, 14)
  - **Blocks**: Task 18 (test coverage validation)
  - **Blocked By**: Task 5 (stats module implementation)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `tests/unit/context-manager.test.ts:9-16` - `estimateTokens` test patterns
  - `tests/unit/` - General test structure (Node.js native test runner)

  **API/Type References** (contracts to implement against):
  - `open-sse/services/compression/stats.ts` - Functions to test
  - `open-sse/services/compression/types.ts` - Types to use in tests

  **Test References** (testing patterns to follow):
  - None — this IS the test file

  **External References** (libraries and frameworks):
  - Node.js test runner documentation: https://nodejs.org/api/test.html
  - assert module documentation: https://nodejs.org/api/assert.html

  **WHY Each Reference Matters** (explain the relevance):
  - `context-manager.test.ts:9-16`: Shows existing `estimateTokens` test patterns to build on
  - `tests/unit/`: Shows directory structure and naming conventions

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] Test file created: `tests/unit/compression/stats.test.ts`
  - [ ] estimateCompressionTokens tested: Empty, short, long, objects
  - [ ] createCompressionStats tested: Savings % calculation, all fields populated
  - [ ] trackCompressionStats tested: Logging with mock logger
  - [ ] Edge cases tested: Zero tokens, empty bodies
  - [ ] Coverage ≥60%: Run `npm run test:coverage` for this file
  - [ ] All tests pass: `node --import tsx/esm --test tests/unit/compression/stats.test.ts`

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  ```
  Scenario: Happy path — all tests pass
    Tool: Bash (node test runner)
    Preconditions: Stats module implemented
    Steps:
      1. Run tests: `node --import tsx/esm --test tests/unit/compression/stats.test.ts`
    Expected Result: All tests pass, no failures
    Failure Indicators: Test failures, syntax errors, import errors
    Evidence: .sisyphus/evidence/task-13-tests-pass.txt

  Scenario: Coverage meets 60% threshold
    Tool: Bash (c8 coverage)
    Preconditions: Tests written
    Steps:
      1. Run coverage: `npm run test:coverage`
      2. Check file coverage: Look for `stats.test.ts` in output
    Expected Result: Coverage ≥60% for stats module
    Failure Indicators: Coverage <60%, no coverage report
    Evidence: .sisyphus/evidence/task-13-coverage.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] Test runner output and coverage reports in text files

  **Commit**: YES | NO (groups with N)
  - Message: `test(compression): add stats module tests`
  - Files: `tests/unit/compression/stats.test.ts`
  - Pre-commit: `npm run test:unit`

- [ ] 14. Unit tests for DB module

  **What to do**:
  - Create `tests/unit/compression/db.test.ts`
  - Test `getCompressionSettings` returns defaults
  - Test `getCompressionSettings` merges with DB values
  - Test `updateCompressionSettings` persists changes
  - Test `updateCompressionSettings` invalidates cache
  - Test `updateCompressionSettings` triggers backup
  - Test edge cases: Empty DB, corrupted JSON, invalid settings
  - Achieve 60%+ coverage

  **Must NOT do**:
  - Do not test migration — covered in Task 1
  - Do not test integration with chatCore — separate test file

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `quick`
    - Reason: DB module tests following existing patterns, straightforward CRUD tests
  - **Skills**: None required
  - **Skills Evaluated but Omitted**:
    - None — follows established DB test patterns

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 9-13)
  - **Blocks**: Task 18 (test coverage validation)
  - **Blocked By**: Task 2 (DB module implementation)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `tests/unit/db/settings.test.ts` - Settings DB module test patterns (if exists)
  - `tests/unit/db/` - General DB test structure
  - `src/lib/db/core.ts` - DB instance patterns for in-memory testing

  **API/Type References** (contracts to implement against):
  - `src/lib/db/compression.ts` - Functions to test

  **Test References** (testing patterns to follow):
  - None — this IS the test file

  **External References** (libraries and frameworks):
  - Node.js test runner documentation: https://nodejs.org/api/test.html
  - better-sqlite3 in-memory database: https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#opening-or-creating-databases

  **WHY Each Reference Matters** (explain the relevance):
  - `settings.test.ts`: Shows how to test DB modules (if exists)
  - `db/`: Shows directory structure for DB tests
  - `core.ts`: Shows how to create in-memory DB for isolated testing

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] Test file created: `tests/unit/compression/db.test.ts`
  - [ ] getCompressionSettings tested: Defaults returned, DB values merged
  - [ ] updateCompressionSettings tested: Changes persist, cache invalidated, backup triggered
  - [ ] Edge cases tested: Empty DB, corrupted JSON, invalid settings
  - [ ] Coverage ≥60%: Run `npm run test:coverage` for this file
  - [ ] All tests pass: `node --import tsx/esm --test tests/unit/compression/db.test.ts`

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  ```
  Scenario: Happy path — all tests pass
    Tool: Bash (node test runner)
    Preconditions: DB module implemented
    Steps:
      1. Run tests: `node --import tsx/esm --test tests/unit/compression/db.test.ts`
    Expected Result: All tests pass, no failures
    Failure Indicators: Test failures, syntax errors, import errors
    Evidence: .sisyphus/evidence/task-14-tests-pass.txt

  Scenario: Coverage meets 60% threshold
    Tool: Bash (c8 coverage)
    Preconditions: Tests written
    Steps:
      1. Run coverage: `npm run test:coverage`
      2. Check file coverage: Look for `db.test.ts` in output
    Expected Result: Coverage ≥60% for compression DB module
    Failure Indicators: Coverage <60%, no coverage report
    Evidence: .sisyphus/evidence/task-14-coverage.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] Test runner output and coverage reports in text files

  **Commit**: YES | NO (groups with N)
  - Message: `test(compression): add DB module tests`
  - Files: `tests/unit/compression/db.test.ts`
  - Pre-commit: `npm run test:unit`

- [ ] 15. Integration test — full request flow with compression enabled

  **What to do**:
  - Create `tests/integration/compression-flow.test.ts`
  - Test full request flow: API route → auth → validation → compression → context manager → handler → response
  - Test with compression enabled (lite mode)
  - Test with compression disabled (off mode)
  - Verify compression stats logged
  - Verify no regression in response format
  - Verify token savings achieved (10-15% for lite mode)
  - Test with various message types (system, user, assistant, tool)
  - Test with combo overrides

  **Must NOT do**:
  - Do not test standard/aggressive/ultra modes — Phase 2 only
  - Do not test without starting OmniRoute server — this is an integration test

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `deep`
    - Reason: Full flow integration test, requires server startup, multiple components
  - **Skills**: None required
  - **Skills Evaluated but Omitted**:
    - None — integration test by definition

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 16-17)
  - **Blocks**: Task F1 (plan compliance audit), Task F2 (code quality review)
  - **Blocked By**: Task 8 (chatCore integration), Task 10 (stats logging)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `tests/integration/v1-contracts-behavior.test.ts` - Integration test patterns
  - `tests/integration/` - General integration test structure

  **API/Type References** (contracts to implement against):
  - All compression modules and types

  **Test References** (testing patterns to follow):
  - None — this IS the test file

  **External References** (libraries and frameworks):
  - Node.js test runner documentation: https://nodejs.org/api/test.html

  **WHY Each Reference Matters** (explain the relevance):
  - `v1-contracts-behavior.test.ts`: Shows how to write integration tests for API routes
  - `tests/integration/`: Shows directory structure for integration tests

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] Test file created: `tests/integration/compression-flow.test.ts`
  - [ ] Full flow tested with compression enabled: Request → compression → context manager → response
  - [ ] Full flow tested with compression disabled: Verify no changes to baseline
  - [ ] Compression stats verified in logs
  - [ ] No regression in response format: Response matches OpenAI spec
  - [ ] Token savings achieved: 10-15% for lite mode with typical requests
  - [ ] Various message types tested: system, user, assistant, tool messages
  - [ ] Combo overrides tested: Override takes precedence
  - [ ] All tests pass: `node --import tsx/esm --test tests/integration/compression-flow.test.ts`

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  ```
  Scenario: Happy path — compression runs in full flow
    Tool: Bash (curl + grep)
    Preconditions: OmniRoute running, compression enabled
    Steps:
      1. Send request: `curl -X POST http://localhost:20128/v1/chat/completions -H "Content-Type: application/json" -H "Authorization: Bearer test-key" -d '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"test\n\n\n\nmessage"}],"compression":"lite"}'`
      2. Check response: Verify response is valid OpenAI format
      3. Check logs: `grep -i "compression" ~/.omniroute/logs/application/app.log | tail -10`
    Expected Result: 200 OK response, compression stats in logs, whitespace collapsed
    Failure Indicators: 500 error, no compression, response format changed
    Evidence: .sisyphus/evidence/task-15-full-flow.txt

  Scenario: Compression disabled — no changes to baseline
    Tool: Bash (curl)
    Preconditions: OmniRoute running, compression disabled
    Steps:
      1. Send request: `curl -X POST http://localhost:20128/v1/chat/completions -H "Content-Type: application/json" -H "Authorization: Bearer test-key" -d '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"test"}],"compression":"off"}'`
      2. Verify response: Compare with baseline (should be identical)
      3. Check logs: Verify no compression logs
    Expected Result: 200 OK response, no changes from baseline, no compression logs
    Failure Indicators: Compression applied, response changed, unexpected logs
    Evidence: .sisyphus/evidence/task-15-baseline-unchanged.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] curl output and log snippets in text files

  **Commit**: YES | NO (groups with N)
  - Message: `test(compression): add integration test for compression flow`
  - Files: `tests/integration/compression-flow.test.ts`
  - Pre-commit: `npm run test:integration`

- [ ] 16. Integration test — compression + context manager interaction

  **What to do**:
  - Create `tests/integration/compression-context-manager.test.ts`
  - Test that compression runs BEFORE context manager
  - Test that context manager still works after compression
  - Test that compression + context manager together fit more content than either alone
  - Test edge case: Compression reduces tokens below threshold, context manager doesn't run
  - Test edge case: Compression insufficient, context manager purifies history
  - Verify no double compression or conflicts

  **Must NOT do**:
  - Do not test compression alone — covered in Task 15
  - Do not test context manager alone — existing tests cover that

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `deep`
    - Reason: Complex interaction between two compression layers, edge cases
  - **Skills**: None required
  - **Skills Evaluated but Omitted**:
    - None — integration test by definition

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 15, 17)
  - **Blocks**: Task F1 (plan compliance audit), Task F2 (code quality review)
  - **Blocked By**: Task 8 (chatCore integration), Task 10 (stats logging)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `tests/integration/chatcore-compression-integration.test.ts` - Existing compression integration patterns
  - `tests/unit/context-manager.test.ts` - Context manager unit test patterns

  **API/Type References** (contracts to implement against):
  - `open-sse/handlers/chatCore.ts` - Integration point
  - `open-sse/services/contextManager.ts` - Context manager functions

  **Test References** (testing patterns to follow):
  - None — this IS the test file

  **External References** (libraries and frameworks):
  - Node.js test runner documentation: https://nodejs.org/api/test.html

  **WHY Each Reference Matters** (explain the relevance):
  - `chatcore-compression-integration.test.ts`: Shows existing integration test patterns to follow
  - `context-manager.test.ts`: Shows how to test context manager behavior

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] Test file created: `tests/integration/compression-context-manager.test.ts`
  - [ ] Compression runs before context manager: Verify order in logs/timing
  - [ ] Context manager still works after compression: Test with overflow
  - [ ] Combined effect tested: Together they fit more content than either alone
  - [ ] Edge case tested: Compression below threshold, context manager skipped
  - [ ] Edge case tested: Compression insufficient, context manager purifies
  - [ ] No double compression: Verify no redundant operations
  - [ ] All tests pass: `node --import tsx/esm --test tests/integration/compression-context-manager.test.ts`

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  ```
  Scenario: Happy path — compression and context manager work together
    Tool: Bash (curl + grep)
    Preconditions: OmniRoute running, compression enabled
    Steps:
      1. Send large request that needs both: `curl -X POST http://localhost:20128/v1/chat/completions -H "Content-Type: application/json" -H "Authorization: Bearer test-key" -d '{"model":"gpt-3.5-turbo","messages":[...lots of messages...]}'`
      2. Check logs: `grep -E "(compression|context manager)" ~/.omniroute/logs/application/app.log | tail -20`
    Expected Result: Compression logs appear first, then context manager logs, both successful
    Failure Indicators: Only one runs, order wrong, errors in either
    Evidence: .sisyphus/evidence/task-16-interaction.txt

  Scenario: Edge case — compression below threshold, context manager skipped
    Tool: Bash (curl)
    Preconditions: OmniRoute running, compression enabled with low threshold
    Steps:
      1. Send small request: `curl -X POST http://localhost:20128/v1/chat/compression/completions -H "Content-Type: application/json" -H "Authorization: Bearer test-key" -d '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"test"}]}'`
      2. Check logs: `grep -i "context manager" ~/.omniroute/logs/application/app.log | tail -5`
    Expected Result: Compression runs, context manager skipped (tokens < threshold)
    Failure Indicators: Context manager runs on small request
    Evidence: .sisyphus/evidence/task-16-edge-case.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] curl output and log snippets in text files

  **Commit**: YES | NO (groups with N)
  - Message: `test(compression): add integration test for compression + context manager`
  - Files: `tests/integration/compression-context-manager.test.ts`
  - Pre-commit: `npm run test:integration`

- [ ] 17. Verify no regression in existing compressContext behavior

  **What to do**:
  - Create `tests/unit/context-manager-regression.test.ts`
  - Copy existing `compressContext` tests from `context-manager.test.ts`
  - Verify all existing tests still pass
  - Verify `compressContext` still works the same way (3 layers, same logic)
  - Verify token estimation still works correctly
  - Verify context manager still handles overflow correctly
  - Verify tool pair fixing still works
  - Run all existing context manager tests

  **Must NOT do**:
  - Do not modify existing `compressContext` function
  - Do not change existing tests — just copy and verify they pass

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `deep`
    - Reason: Regression test, must verify all existing behavior preserved
  - **Skills**: None required
  - **Skills Evaluated but Omitted**:
    - None — regression test by definition

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 15-16)
  - **Blocks**: Task F1 (plan compliance audit), Task F2 (code quality review)
  - **Blocked By**: Task 8 (chatCore integration, to verify no regression)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `tests/unit/context-manager.test.ts` - Existing tests to copy

  **API/Type References** (contracts to implement against):
  - `open-sse/services/contextManager.ts` - `compressContext` function (verify unchanged)

  **Test References** (testing patterns to follow):
  - None — this IS the test file

  **External References** (libraries and frameworks):
  - Node.js test runner documentation: https://nodejs.org/api/test.html

  **WHY Each Reference Matters** (explain the relevance):
  - `context-manager.test.ts`: Shows existing tests that must still pass

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] Test file created: `tests/unit/context-manager-regression.test.ts`
  - [ ] All existing tests copied and pass
  - [ ] compressContext still works: 3 layers, same logic
  - [ ] Token estimation unchanged: Same results for same inputs
  - [ ] Overflow handling unchanged: Same purge behavior
  - [ ] Tool pair fixing unchanged: Orphaned tool results removed
  - [ ] All tests pass: `node --import tsx/esm --test tests/unit/context-manager-regression.test.ts`

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  ```
  Scenario: Happy path — all regression tests pass
    Tool: Bash (node test runner)
    Preconditions: Regression tests created
    Steps:
      1. Run tests: `node --import tsx/esm --test tests/unit/context-manager-regression.test.ts`
    Expected Result: All tests pass, no failures
    Failure Indicators: Test failures (regression), syntax errors, import errors
    Evidence: .sisyphus/evidence/task-17-regression-tests-pass.txt

  Scenario: Original compressContext behavior preserved
    Tool: Bash (node REPL)
    Preconditions: None
    Steps:
      1. Import function: `import { compressContext } from '../open-sse/services/contextManager.ts'`
      2. Test with overflow: `const result = compressContext({messages: [{role:'user',content:'x'.repeat(100000)}]}, {provider:'openai'})`
      3. Verify 3 layers: Check stats.layers has 3 entries
    Expected Result: Returns compressed body with 3 layers applied, same as before
    Failure Indicators: Different number of layers, different behavior
    Evidence: .sisyphus/evidence/task-17-behavior-preserved.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] Test runner output and REPL output in text files

  **Commit**: YES | NO (groups with N)
  - Message: `test(compression): add regression test for compressContext`
  - Files: `tests/unit/context-manager-regression.test.ts`
  - Pre-commit: `npm run test:unit`

- [ ] 18. Test coverage validation (60%+ gate)

  **What to do**:
  - Run `npm run test:coverage` for all new compression modules
  - Verify coverage ≥60% for: compression DB module, strategy selector, lite compression, stats module
  - Verify overall test coverage for project not below existing baseline
  - If coverage <60%, add missing tests
  - Generate coverage report: `npm run coverage:report`
  - Review coverage report for untested branches/lines
  - Document coverage results

  **Must NOT do**:
  - Do not accept coverage <60% — must add tests to reach threshold
  - Do not skip this verification — it's required for PR

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `quick`
    - Reason: Coverage validation and reporting, straightforward task
  - **Skills**: None required
  - **Skills Evaluated but Omitted**:
    - None — coverage validation by definition

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 19-20)
  - **Blocks**: Task F1 (plan compliance audit), Task F2 (code quality review)
  - **Blocked By**: Tasks 11-14 (unit tests must exist), Task 15-17 (integration tests must exist)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `package.json:92-93` - Test coverage script and threshold configuration
  - `.github/workflows/` - CI/CD workflow requiring coverage gate

  **API/Type References** (contracts to implement against):
  - None — verification task

  **Test References** (testing patterns to follow):
  - None — this IS a verification task

  **External References** (libraries and frameworks):
  - c8 coverage tool documentation: https://github.com/bcoe/c8

  **WHY Each Reference Matters** (explain the relevance):
  - `package.json:92-93`: Shows coverage threshold (60%) and script names
  - `.github/workflows/`: Shows CI/CD integration requiring coverage

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] Coverage run: `npm run test:coverage` completed
  - [ ] DB module coverage ≥60%: Verify in coverage report
  - [ ] Strategy selector coverage ≥60%: Verify in coverage report
  - [ ] Lite compression coverage ≥60%: Verify in coverage report
  - [ ] Stats module coverage ≥60%: Verify in coverage report
  - [ ] Overall coverage not degraded: Compare with baseline
  - [ ] Coverage report generated: `coverage/index.html` exists

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  ```
  Scenario: Happy path — all modules meet 60% coverage
    Tool: Bash (c8 coverage)
    Preconditions: All tests written
    Steps:
      1. Run coverage: `npm run test:coverage`
      2. Check output for compression modules
      3. Open report: Open `coverage/index.html` in browser or check summary
    Expected Result: All 4 modules ≥60% coverage, overall coverage maintained
    Failure Indicators: Any module <60%, overall coverage degraded, no report generated
    Evidence: .sisyphus/evidence/task-18-coverage-60percent.txt

  Scenario: Coverage report exists and accessible
    Tool: Bash (ls)
    Preconditions: Coverage run completed
    Steps:
      1. Check report: `ls -la coverage/index.html coverage/coverage-summary.json`
    Expected Result: Both files exist, not empty
    Failure Indicators: Files missing, files empty, generation error
    Evidence: .sisyphus/evidence/task-18-report-exists.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] Coverage output and report verification in text files

  **Commit**: NO (verification task)
  - Message: (part of final verification wave commits)
  - Files: (none)
  - Pre-commit: (none)

- [ ] 19. TypeScript type checking (no errors)

  **Do**:
  - Run `npm run typecheck:core` for all new and modified files
  - Verify no TypeScript errors
  - Verify no `any` types in compression modules (except where explicitly justified)
  - Verify all types are imported and used correctly
  - Fix any type errors if found
  - Run `npm run typecheck:noimplicit:core` for stricter checking

  **Must NOT do**:
  - Do not use `@ts-ignore` or `as any` without justification
  - Do not skip type checking

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `quick`
    - Reason: Type checking is straightforward verification task
  - **Skills**: None required
  - **Skills Evaluated but Omitted**:
    - None — type checking by definition

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 18, 20)
  - **Blocks**: Task F1 (plan compliance audit), Task F2 (code quality review)
  - **Blocked By**: All implementation tasks (must be complete)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `package.json:84-85` - TypeScript typecheck scripts

  **API/Type References** (contracts to implement against):
  - All new TypeScript files

  **Test References** (testing patterns to follow):
  - None — this IS a verification task

  **External References** (libraries and frameworks):
  - TypeScript documentation: https://www.typescriptlang.org/docs/handbook/compiler-options.html

  **WHY Each Reference Matters** (explain the relevance):
  - `package.json:84-85`: Shows typecheck scripts to run

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] Typecheck runs: `npm run typecheck:core` completed
  - [ ] No TypeScript errors: Zero errors in output
  - [ ] No `@ts-ignore` used: Code doesn't suppress type checking
  - [ ] No `as any` used without justification: Type safety preserved
  - [ ] Strict typecheck also passes: `npm run typecheck:noimplicit:core`

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  ```
  Scenario: Happy path — typecheck passes with no errors
    Tool: Bash (tsc)
    Preconditions: All code written
    Steps:
      1. Run typecheck: `npm run typecheck:core`
      2. Check output: Verify zero errors
    Expected Result: TypeScript compilation succeeds, no errors reported
    Failure Indicators: Type errors, missing imports, wrong types
    Evidence: .sisyphus/evidence/task-19-typecheck-passes.txt

  Scenario: Strict typecheck also passes
    Tool: Bash (tsc)
    Preconditions: Basic typecheck passes
    Steps:
      1. Run strict typecheck: `npm run typecheck:noimplicit:core`
      2. Check output: Verify zero errors
    Expected Result: Strict typecheck also succeeds
    Failure Indicators: Implicit any errors, missing type annotations
    Evidence: .sisyphus/evidence/task-19-strict-typecheck.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] TypeScript compiler output in text files

  **Commit**: NO (verification task)
  - Message: (part of final verification wave commits)
  - Files: (none)
  - Pre-commit: (none)

- [ ] 20. Documentation updates (AGENTS.md, ARCHITECTURE.md)

  **What to do**:
  - Update `open-sse/AGENTS.md` to document new compression services
  - Add section: `open-sse/services/compression/` with descriptions of strategySelector, lite, stats
  - Update `docs/ARCHITECTURE.md` (if exists) to document compression pipeline placement
  - Add compression to request flow diagram
  - Document compression modes and when to use each (Phase 1: off, lite)
  - Document how to configure compression via settings API
  - Document compression stats and how to interpret them

  **Must NOT do**:
  - Do not document standard/aggressive/ultra modes — Phase 2 only
  - Do not create new documentation files — update existing ones

  **Recommended Agent Profile**:
  > Select category + skills based on task domain. Justify each choice.
  - **Category**: `quick`
    - Reason: Documentation updates following existing patterns
  - **Skills**: `writing`
    - `writing`: Technical documentation for architecture and agent guidelines
  - **Skills Evaluated but Omitted**:
    - None — documentation updates

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 18-19)
  - **Blocks**: Task F1 (plan compliance audit), Task F2 (code quality review)
  - **Blocked By**: All implementation tasks (docs must reflect final implementation)

  **References** (CRITICAL - Be Exhaustive):

  > The executor has NO context from your interview. References are their ONLY guide.
  > Each reference must answer: "What should I look at and WHY?"

  **Pattern References** (existing code to follow):
  - `open-sse/services/AGENTS.md` - Existing service documentation pattern
  - `docs/ARCHITECTURE.md` - Existing architecture documentation pattern (if exists)

  **API/Type References** (contracts to implement against):
  - All new compression modules and types

  **Test References** (testing patterns to follow):
  - None — documentation task

  **External References** (libraries and frameworks):
  - None

  **WHY Each Reference Matters** (explain the relevance):
  - `AGENTS.md`: Shows how to document services in agent guidelines
  - `ARCHITECTURE.md`: Shows how to document architecture and request flow

  **Acceptance Criteria**:

  > **AGENT-EXECUTABLE VERIFICATION ONLY** — No human action permitted.
  > Every criterion MUST be verifiable by running a command or using a tool.

  **If Tests after**:
  - [ ] AGENTS.md updated: Compression services documented
  - [ ] ARCHITECTURE.md updated: Pipeline placement documented
  - [ ] Request flow diagram updated: Compression shown before context manager
  - [ ] Modes documented: off and lite modes explained
  - [] Configuration documented: How to use settings API
  - [ ] Stats documented: How to interpret compression stats
  - [ ] No Phase 2 docs: Only off and lite documented

  **QA Scenarios (MANDATORY — task is INCOMPLETE without these):**

  ```
  Scenario: Happy path — documentation is accurate and complete
    Tool: Bash (grep)
    Preconditions: Docs updated
    Steps:
      1. Check AGENTS.md: `grep -A 5 "compression" open-sse/services/AGENTS.md`
      2. Check ARCHITECTURE.md: `grep -A 5 "compression" docs/ARCHITECTURE.md` (if exists)
    Expected Result: Compression sections exist, content is accurate, no Phase 2 docs
    Failure Indicators: Missing sections, outdated info, Phase 2 docs included
    Evidence: .sisyphus/evidence/task-20-docs-accurate.txt

  Scenario: Request flow diagram includes compression
    Tool: Bash (grep)
    Preconditions: ARCHITECTURE.md updated
    Steps:
      1. Check diagram: `grep -E "(compression|context manager)" docs/ARCHITECTURE.md | head -10`
    Expected Result: Both compression and context manager shown, compression before context manager
    Failure Indicators: Compression missing, wrong order
    Evidence: .sysisphus/evidence/task-20-flow-diagram.txt
  ```

  **Evidence to Capture**:
  - [ ] Each evidence file named: task-{N}-{scenario-slug}.{ext}
  - [ ] grep output in text files

  **Commit**: YES | NO (groups with N)
  - Message: `docs(compression): update architecture and agent docs`
  - Files: `open-sse/services/AGENTS.md`, `docs/ARCHITECTURE.md`
  - Pre-commit: `npm run typecheck:core`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `tsc --noEmit` + linter + `bun test`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names (data/result/item/temp).
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high`
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (features working together, not isolation). Test edge cases: empty state, invalid input, rapid actions. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **1**: `feat(compression): add DB migration for compression settings` — `db/migrations/022_compression_settings.sql`, npm run typecheck:core
- **2**: `feat(compression): implement compression DB module` — `src/lib/db/compression.ts`, tests/unit/compression/db.test.ts, npm test
- **3**: `feat(compression): add compression types and interfaces` — `open-sse/services/compression/types.ts`, npm run typecheck:core
- **4**: `feat(compression): create compression service directory` — `open-sse/services/compression/index.ts`, npm run typecheck:core
- **5**: `feat(compression): implement compression stats module` — `open-sse/services/compression/stats.ts`, tests/unit/compression/stats.test.ts, npm test
- **6**: `feat(compression): implement lite compression techniques` — `open-sse/services/compression/lite.ts`, tests/unit/compression/lite.test.ts, npm test
- **7**: `feat(compression): implement strategy selector` — `open-sse/services/compression/strategySelector.ts`, tests/unit/compression/strategySelector.test.ts, npm test
- **8**: `feat(compression): integrate pipeline into chatCore` — `open-sse/handlers/chatCore.ts`, tests/integration/compression-flow.test.ts, npm test
- **9**: `feat(compression): add settings API route` — `src/app/api/v1/settings/compression/route.ts`, tests/unit/api/compression-settings.test.ts, npm test
- **10**: `feat(compression): add stats logging to detailed logs` — `open-sse/handlers/chatCore.ts`, npm test
- **11**: `test(compression): add strategy selector tests` — `tests/unit/compression/strategySelector.test.ts`, npm test
- **12**: `test(compression): add lite compression tests` — `tests/unit/compression/lite.test.ts`, npm test
- **13**: `test(compression): add stats module tests` — `tests/unit/compression/stats.test.ts`, npm test
- **14**: `test(compression): add DB module tests` — `tests/unit/compression/db.test.ts`, npm test
- **15**: `test(compression): add integration test for compression flow` — `tests/integration/compression-flow.test.ts`, npm test
- **16**: `test(compression): add integration test for compression + context manager` — `tests/integration/compression-context-manager.test.ts`, npm test
- **17**: `test(compression): add regression test for compressContext` — `tests/unit/context-manager-regression.test.ts`, npm test
- **18**: `test(compression): validate test coverage` — `npm run test:coverage`, verify 60%+ coverage
- **19**: `test(compression): type check all code` — `npm run typecheck:core`, verify no errors
- **20**: `docs(compression): update architecture docs` — `AGENTS.md`, `ARCHITECTURE.md`, npm run typecheck:core

---

## Success Criteria

### Verification Commands
```bash
# Run all tests
npm run test:unit

# Verify test coverage
npm run test:coverage

# Type check
npm run typecheck:core

# Lint
npm run lint

# Integration tests
npm run test:integration

# Test compression flow with curl
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer test-key" \
  -d '{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"test"}],"compression":"lite"}'
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] All tests pass
- [ ] Test coverage ≥60%
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Compression stats logged
- [ ] Settings API functional
- [ ] No regression in existing behavior
- [ ] Lite mode <1ms latency
