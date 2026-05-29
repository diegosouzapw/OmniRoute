# Phase 3 — Aggressive Prompt Compression

## TL;DR

> **Quick Summary**: Implement aggressive compression mode (issue #1588) — rule-based history summarization, 5-strategy tool-result compression, progressive aging, orchestrated as a new 4th mode. Lands after Phase 1 + Phase 2 merge.
>
> **Deliverables**:
> - `summarizer.ts` with LLM-ready `Summarizer` interface (rule-based default impl)
> - `toolResultCompressor.ts` with 5 strategies + auto-detection
> - `progressiveAging.ts` with 4 configurable thresholds
> - `aggressive.ts` orchestrator composing all three + caveman rules
> - DB migration `031_aggressive_compression.sql`
> - Extended API route + UI tab (mode dropdown + threshold inputs + strategy toggles)
> - Golden eval expansion for long sessions (30+ messages, 15+ tool calls)
> - 80+ unit tests, integration test, E2E QA via curl
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES — 5 waves
> **Critical Path**: T1 (types) → T2-T5 (modules in parallel) → T6 (orchestrator) → T7-T9 (DB+API+UI in parallel) → T10 (chatCore wiring) → T11-T13 (verification)

---

## Context

### Original Request
"lets plan, phase 3 implementations"
"this is phase 3, proposals : https://github.com/diegosouzapw/OmniRoute/issues/1588"

### Interview Summary
**Key Discussions**:
- Phase 3 timing: after Phase 1 (PR #1633) + Phase 2 (PR #1689) merge — clean main, no rebase debt
- Quality bar: match Phase 2 rigor — golden eval, perf budget, full QA
- LLM scope: rule-based + LLM-ready interface (no LLM call yet)
- Mode integration: new 4th mode `"aggressive"` alongside off/lite/standard
- Tool result strategies: all 5 with auto-detection (file content / grep / shell / JSON / error)
- Progressive aging UI: full user control — 4 threshold inputs

**Research Findings**:
- Existing pipeline integration in `open-sse/handlers/chatCore.ts`
- Existing modules: `lite.ts`, `caveman.ts`, `cavemanRules.ts`, `preservation.ts`, `strategySelector.ts`, `stats.ts`, `types.ts`, `index.ts`
- Existing DB layer: `src/lib/db/compression.ts` + migration `030_caveman_compression_tests.sql`
- Existing API: `src/app/api/settings/compression/route.ts`
- Existing UI: `CompressionSettingsTab.tsx`

### Self Gap Analysis
**Identified Gaps** (addressed in plan):
- Mode switch mid-conversation: orchestrator detects pre-summarized markers, skips re-processing
- Summary-of-summary recursion: cap at 1 level via marker `[COMPRESSED:summary]`
- Parallel tool calls: tool-result compressor handles arrays of tool_use_id'd results
- Stats per-module: orchestrator aggregates each module's savings
- Feature flag: aggressive is opt-in via mode setting; default unchanged
- Downgrade path: try/catch in orchestrator falls through to caveman→lite→raw
- Backward compat: migration 031 adds nested config column, never modifies existing fields

---

## Work Objectives

### Core Objective
Implement aggressive compression mode for long coding sessions, targeting 40-60% token savings on 30+ message conversations with 15+ tool calls, while maintaining ≤5% quality drop on golden eval and <50ms latency on inputs up to 50K tokens.

### Concrete Deliverables
- `open-sse/services/compression/summarizer.ts` (rule-based + `Summarizer` interface)
- `open-sse/services/compression/toolResultCompressor.ts` (5 strategies)
- `open-sse/services/compression/progressiveAging.ts` (4-tier aging)
- `open-sse/services/compression/aggressive.ts` (orchestrator)
- `open-sse/services/compression/types.ts` (extended with `AggressiveConfig`)
- `open-sse/services/compression/strategySelector.ts` (extended for `"aggressive"` mode)
- `open-sse/services/compression/index.ts` (exports updated)
- `src/lib/db/migrations/031_aggressive_compression.sql`
- `src/lib/db/compression.ts` (extended for aggressive config CRUD)
- `src/app/api/settings/compression/route.ts` (extended Zod schema)
- `src/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab.tsx` (aggressive mode UI)
- `tests/unit/compression/summarizer.test.ts`
- `tests/unit/compression/toolResultCompressor.test.ts`
- `tests/unit/compression/progressiveAging.test.ts`
- `tests/unit/compression/aggressive.test.ts`
- `tests/integration/compression-aggressive.test.ts`
- `tests/golden-set/long-coding-session.json` (new fixture)
- `tests/golden-set/runner.test.ts` (extended for aggressive mode)

### Definition of Done
- [ ] `npm run typecheck:core` → PASS
- [ ] `npm run lint` → PASS
- [ ] `node --import tsx/esm --test tests/unit/compression/*.test.ts` → all PASS
- [ ] `node --import tsx/esm --test tests/integration/compression-aggressive.test.ts` → PASS
- [ ] Golden eval: aggressive mode achieves ≥40% token savings on long-session fixture with ≤5% quality drop
- [ ] Latency benchmark: aggressive mode <50ms p95 on 50K-token input
- [ ] Phase 1 (lite) and Phase 2 (caveman) modes unchanged — regression tests pass
- [ ] DB migration applies cleanly on fresh DB and on DB with migration 030 already applied
- [ ] UI: aggressive mode toggleable, 4 thresholds editable, 5 strategies toggleable, save persists
- [ ] API: PUT with aggressive config validates and persists; invalid values rejected with 400

### Must Have
- Rule-based implementation only — zero LLM calls in shipped code
- `Summarizer` interface for future LLM drop-in (must compile but not be called)
- All 5 tool-result strategies with auto-detection
- 4 progressive-aging thresholds user-configurable
- Orchestrator falls through gracefully on any module error (never breaks request)
- New mode `"aggressive"` selectable via existing strategySelector
- DB migration 031 backward compatible (additive only)
- Match Phase 2 test rigor (per-module unit tests + integration + golden eval)

### Must NOT Have (Guardrails)
- NO LLM API calls in any shipped code path
- NO new external dependencies (`package.json` deps must not grow)
- NO modification of Phase 1 (`lite.ts`) or Phase 2 (`caveman.ts`, `cavemanRules.ts`) source files beyond mechanical export updates
- NO changes to existing DB columns in migration 031 (additive only — new columns or new table)
- NO breaking changes to API request/response shapes for existing modes
- NO summary-of-summary recursion (skip messages with `[COMPRESSED:*]` marker)
- NO removal of code blocks, URLs, file paths, or error stack traces (preservation rules from Phase 2 still apply)
- NO scope creep: i18n localization and CompressionLogTab logs-page integration are explicitly OUT (separate work)
- NO touching Phase 2 PR #1689 branch — Phase 3 branches from main after merge
- NO premature optimization: each module is a clear separate file, no merging into one giant file

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: YES (Phase 1+2 already established `tests/unit/compression/` and `tests/golden-set/`)
- **Automated tests**: YES (TDD) — RED-GREEN-REFACTOR per module
- **Framework**: Node.js native test runner (`node --import tsx/esm --test`) for units; vitest already in repo for some suites
- **Each task**: writes failing tests first → minimal impl to green → refactor

### QA Policy
Every task includes agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Module/Library**: Bash + node REPL — import module, call functions, assert output equality, capture stdout
- **DB migration**: Bash — run migration on temp SQLite, query schema, assert columns
- **API route**: Bash + curl — POST/PUT/GET, assert status + JSON body
- **UI**: Playwright — navigate, click mode dropdown, fill threshold inputs, toggle strategies, click Save, assert toast + DB
- **Golden eval**: Bash — run eval script, assert savings % and quality delta within thresholds
- **Latency**: Bash — run benchmark script with hyperfine or built-in timing, assert p95 <50ms

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — start immediately):
└── T1: Extend types.ts with AggressiveConfig + Summarizer interface [quick]

Wave 2 (Modules — MAX PARALLEL after T1):
├── T2: summarizer.ts — rule-based history summarization [deep]
├── T3: toolResultCompressor.ts — 5 strategies + auto-detection [deep]
├── T4: progressiveAging.ts — 4-tier aging logic [unspecified-high]
└── T5: DB migration 031 + compression.ts CRUD extension [quick]

Wave 3 (Composition + integration layer):
├── T6: aggressive.ts orchestrator (depends T2,T3,T4) [deep]
├── T7: Extended API route Zod schema (depends T1,T5) [quick]
└── T8: strategySelector.ts wiring (depends T6) [quick]

Wave 4 (Pipeline + UI):
├── T9: chatCore.ts wiring for aggressive mode (depends T8) [deep]
└── T10: CompressionSettingsTab UI extension (depends T7) [visual-engineering]

Wave 5 (Verification):
├── T11: Integration test suite (depends T9) [deep]
├── T12: Golden eval long-session fixture + runner update (depends T9) [deep]
└── T13: Latency benchmark + perf gate (depends T9) [unspecified-high]

Wave FINAL (Independent review — 4 parallel):
├── F1: Plan compliance audit (oracle)
├── F2: Code quality review (unspecified-high)
├── F3: Real manual QA — full UI + API flow (unspecified-high + playwright)
└── F4: Scope fidelity check (deep)

Critical Path: T1 → T2/T3/T4 → T6 → T8 → T9 → T11/T12/T13 → F1-F4
Parallel Speedup: ~60% faster than sequential
Max Concurrent: 4 (Wave 2)
```

### Dependency Matrix

- **T1**: blocked by — none. blocks: T2, T3, T4, T5, T6, T7
- **T2**: blocked by T1. blocks: T6, T11, T12
- **T3**: blocked by T1. blocks: T6, T11, T12
- **T4**: blocked by T1. blocks: T6, T11, T12
- **T5**: blocked by T1. blocks: T7
- **T6**: blocked by T2, T3, T4. blocks: T8, T11, T12, T13
- **T7**: blocked by T1, T5. blocks: T10
- **T8**: blocked by T6. blocks: T9
- **T9**: blocked by T8. blocks: T11, T12, T13
- **T10**: blocked by T7. blocks: F3
- **T11**: blocked by T9. blocks: F1
- **T12**: blocked by T9. blocks: F1
- **T13**: blocked by T9. blocks: F1
- **F1-F4**: blocked by T9-T13. blocks: nothing

### Agent Dispatch Summary

- **Wave 1**: 1 task — T1 → `quick`
- **Wave 2**: 4 tasks — T2,T3 → `deep`, T4 → `unspecified-high`, T5 → `quick`
- **Wave 3**: 3 tasks — T6 → `deep`, T7 → `quick`, T8 → `quick`
- **Wave 4**: 2 tasks — T9 → `deep`, T10 → `visual-engineering`
- **Wave 5**: 3 tasks — T11,T12 → `deep`, T13 → `unspecified-high`
- **Wave FINAL**: 4 tasks — F1 → `oracle`, F2,F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

- [ ] 1. Extend `types.ts` with `AggressiveConfig` and `Summarizer` interface

  **What to do**:
  - Add `AggressiveConfig` interface to `open-sse/services/compression/types.ts` with fields:
    - `thresholds: { fullSummary: number; moderate: number; light: number; verbatim: number }` (defaults 5/3/2/2 turns)
    - `toolStrategies: { fileContent: boolean; grepSearch: boolean; shellOutput: boolean; json: boolean; errorMessage: boolean }` (all default true)
    - `summarizerEnabled: boolean` (default true)
  - Add `Summarizer` interface: `{ summarize(messages: Message[], opts: SummarizerOpts): Promise<string> | string }`
  - Add `SummarizerOpts` type: `{ maxLen?: number; preserveCode?: boolean }`
  - Extend `CompressionStats` with optional per-module breakdown: `aggressive?: { summarizerSavings: number; toolResultSavings: number; agingSavings: number }`
  - Extend `CompressionConfig` with optional `aggressive?: AggressiveConfig` field
  - Export all new types from `open-sse/services/compression/index.ts`
  - Add unit test asserting type compilation + default config shape

  **Must NOT do**:
  - No modification to existing `LiteConfig` or `CavemanConfig` shapes
  - No new external dependencies

  **Recommended Agent Profile**:
  - **Category**: `quick` — Pure type additions, no business logic.
  - **Skills**: none required
  - **Skills Evaluated but Omitted**: `test-driven-development` (overkill for type-only changes; one assertion test suffices)

  **Parallelization**:
  - **Can Run In Parallel**: NO (Wave 1 foundation)
  - **Parallel Group**: Wave 1
  - **Blocks**: T2, T3, T4, T5, T6, T7
  - **Blocked By**: None — start immediately

  **References**:

  **Pattern References**:
  - `open-sse/services/compression/types.ts` — existing `LiteConfig`, `CavemanConfig` shapes; follow same nested-config pattern
  - `open-sse/services/compression/index.ts` — existing barrel export pattern

  **API/Type References**:
  - `open-sse/services/compression/types.ts:CompressionMode` — extend this union
  - `open-sse/services/compression/types.ts:CompressionStats` — extend with aggressive breakdown

  **Test References**:
  - `tests/unit/compression/types.test.ts` (if exists, follow that pattern; otherwise create new file with type-narrowing assertions)

  **WHY Each Reference Matters**:
  - `types.ts` and `index.ts` define the public surface. New types must follow the existing nested-config pattern (mode-specific config fields are optional and only read when that mode is active).

  **Acceptance Criteria**:
  - [ ] `npm run typecheck:core` passes
  - [ ] `npm run lint` passes
  - [ ] `node --import tsx/esm --test tests/unit/compression/types.test.ts` passes
  - [ ] Grep `AggressiveConfig` returns ≥3 hits in `open-sse/services/compression/`
  - [ ] Grep `"aggressive"` in `CompressionMode` definition returns 1 hit

  **QA Scenarios**:

  ```
  Scenario: Type imports compile and defaults are correct
    Tool: Bash + node REPL
    Preconditions: Working tree clean, T1 changes applied
    Steps:
      1. Run: npx tsc --noEmit open-sse/services/compression/types.ts
      2. Run: node --import tsx/esm -e "import { CompressionMode } from './open-sse/services/compression/types.ts'; const m: CompressionMode = 'aggressive'; console.log('OK', m)"
      3. Assert stdout contains "OK aggressive"
    Expected Result: Exit 0; stdout "OK aggressive"
    Failure Indicators: tsc errors, runtime error, missing literal
    Evidence: .sisyphus/evidence/task-1-type-compile.txt

  Scenario: Existing modes still type-check
    Tool: Bash
    Preconditions: T1 applied
    Steps:
      1. Run: npm run typecheck:core 2>&1 | tee .sisyphus/evidence/task-1-typecheck.txt
      2. Assert exit code 0
      3. Assert no occurrences of "error TS" in output
    Expected Result: Build clean, no regressions in lite/caveman types
    Evidence: .sisyphus/evidence/task-1-typecheck.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-1-type-compile.txt`
  - [ ] `.sisyphus/evidence/task-1-typecheck.txt`

  **Commit**: YES
  - Message: `feat(compression): add AggressiveConfig types and Summarizer interface`
  - Files: `open-sse/services/compression/types.ts`, `open-sse/services/compression/index.ts`, `tests/unit/compression/types.test.ts`
  - Pre-commit: `npm run typecheck:core && npm run lint`

- [ ] 2. Implement `summarizer.ts` — rule-based history summarization with `Summarizer` interface

  **What to do**:
  - Create `open-sse/services/compression/summarizer.ts`
  - Export `class RuleBasedSummarizer implements Summarizer`
  - Implement `summarize(messages, opts)` returning a structured rule-based summary:
    - Extract: user intents (first user message + each "request:" / "fix:" / "implement:" trigger phrase), files touched (any path matching `[\w./-]+\.(ts|tsx|js|jsx|py|md|json|sql)`), errors encountered (lines matching `Error:`, `error TS\d+`, `Exception:`), decisions/conclusions (last assistant message text up to 200 chars)
    - Output format: `[COMPRESSED:summary] Intents: <bullet list>. Files touched: <comma list>. Errors: <bullet list>. Last decision: <text>.`
  - Skip messages already containing `[COMPRESSED:` marker (no recursion)
  - Preserve code fences referenced in the summary by retaining first 3 lines + last 1 line per fence with `…` middle marker
  - Add `factory()` returning `new RuleBasedSummarizer()` for DI
  - Export type `Summarizer` re-export
  - Add 20+ unit test cases in `tests/unit/compression/summarizer.test.ts`:
    - Empty messages returns empty string
    - Single user message extracts intent
    - Mixed user/assistant turns extract decisions
    - Code fences trimmed correctly
    - Already-compressed messages skipped
    - File path extraction handles relative + absolute paths
    - Error extraction catches multiple error formats

  **Must NOT do**:
  - No external NLP libraries (use built-in regex only)
  - No actual LLM API calls — `RuleBasedSummarizer` must be fully synchronous-capable (Promise wrapper allowed for interface conformance)
  - No mutation of input messages

  **Recommended Agent Profile**:
  - **Category**: `deep` — Multi-step rule design, regex correctness matters
  - **Skills**: `test-driven-development` — write 20+ tests RED first
  - **Skills Evaluated but Omitted**: `systematic-debugging` (only if RED tests reveal logic bugs)

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 2 with T3, T4, T5)
  - **Parallel Group**: Wave 2
  - **Blocks**: T6, T11, T12
  - **Blocked By**: T1

  **References**:

  **Pattern References**:
  - `open-sse/services/compression/lite.ts` — module structure pattern (default export class + factory)
  - `open-sse/services/compression/cavemanRules.ts` — regex-based rule pattern with preservation hooks
  - `open-sse/services/compression/preservation.ts` — code fence preservation helpers (reuse if available)

  **API/Type References**:
  - `open-sse/services/compression/types.ts:Summarizer` (added in T1)
  - `open-sse/services/compression/types.ts:Message` — input shape

  **Test References**:
  - `tests/unit/compression/lite.test.ts` — test file structure to mirror
  - `tests/unit/compression/cavemanRules.test.ts` — assertion patterns for rule output

  **External References**:
  - Node test runner docs: `https://nodejs.org/api/test.html` — `describe`/`it`/`assert.strictEqual`

  **WHY Each Reference Matters**:
  - `lite.ts`/`cavemanRules.ts` show the established module pattern in this codebase. Following it ensures the new file slots into the orchestrator without surprises. `preservation.ts` likely has reusable helpers for code-fence handling — using them avoids duplication.

  **Acceptance Criteria**:
  - [ ] `tests/unit/compression/summarizer.test.ts` exists with ≥20 test cases
  - [ ] All tests PASS
  - [ ] `npm run typecheck:core` PASS
  - [ ] `npm run lint` PASS
  - [ ] No new dependencies in `package.json`

  **QA Scenarios**:

  ```
  Scenario: Summarizer extracts intent + files + errors from realistic messages
    Tool: Bash + node REPL
    Preconditions: T2 applied
    Steps:
      1. Run: node --import tsx/esm -e "import { RuleBasedSummarizer } from './open-sse/services/compression/summarizer.ts'; const s = new RuleBasedSummarizer(); const out = await s.summarize([{role:'user',content:'fix: bug in src/lib/db/core.ts causing Error: TS2304'},{role:'assistant',content:'Patched core.ts. Will run tests next.'}],{}); console.log(out)" > .sisyphus/evidence/task-2-summary.txt
      2. Grep output for "[COMPRESSED:summary]"
      3. Grep output for "src/lib/db/core.ts"
      4. Grep output for "Error: TS2304"
    Expected Result: All 3 greps match
    Evidence: .sisyphus/evidence/task-2-summary.txt

  Scenario: Already-compressed messages are not re-summarized
    Tool: Bash + node REPL
    Preconditions: T2 applied
    Steps:
      1. Run: node --import tsx/esm -e "import { RuleBasedSummarizer } from './open-sse/services/compression/summarizer.ts'; const s = new RuleBasedSummarizer(); const out = await s.summarize([{role:'system',content:'[COMPRESSED:summary] prior text'}],{}); console.log(JSON.stringify(out))" > .sisyphus/evidence/task-2-recursion.txt
      2. Assert output is empty string or unchanged passthrough (no nested [COMPRESSED:summary][COMPRESSED:summary])
      3. Grep -c "\[COMPRESSED:summary\]" output is ≤1
    Expected Result: No double-marker
    Evidence: .sisyphus/evidence/task-2-recursion.txt

  Scenario: All unit tests pass
    Tool: Bash
    Preconditions: T2 applied
    Steps:
      1. Run: node --import tsx/esm --test tests/unit/compression/summarizer.test.ts 2>&1 | tee .sisyphus/evidence/task-2-tests.txt
      2. Assert "# pass" count ≥ 20
      3. Assert "# fail 0" present
    Expected Result: 20+ passing tests, zero failures
    Evidence: .sisyphus/evidence/task-2-tests.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-2-summary.txt`
  - [ ] `.sisyphus/evidence/task-2-recursion.txt`
  - [ ] `.sisyphus/evidence/task-2-tests.txt`

  **Commit**: YES
  - Message: `feat(compression): rule-based history summarizer`
  - Files: `open-sse/services/compression/summarizer.ts`, `tests/unit/compression/summarizer.test.ts`
  - Pre-commit: `npm run typecheck:core && npm run lint && node --import tsx/esm --test tests/unit/compression/summarizer.test.ts`

- [ ] 3. Implement `toolResultCompressor.ts` — 5 auto-detected strategies

  **What to do**:
  - Create `open-sse/services/compression/toolResultCompressor.ts`
  - Export `compressToolResult(content: string, opts: ToolStrategiesConfig): { compressed: string; strategy: string; saved: number }`
  - Auto-detect content type and apply matching strategy:
    1. **fileContent** — content has ≥3 newlines and looks like source code (import/function/class regex). Strategy: keep first 20 lines, last 5 lines, replace middle with `… [N lines elided] …`
    2. **grepSearch** — content has lines matching `^[\w./-]+:\d+:` (path:lineno: format). Strategy: deduplicate paths, keep top 30 hits, append `… [N more matches]`
    3. **shellOutput** — content has ANSI escapes or `\$ ` prompts. Strategy: strip ANSI codes, keep last 50 lines, dedupe consecutive identical lines
    4. **json** — content parses as JSON and length >2K. Strategy: if array, keep first 5 + last 2 elements + count; if object, keep top-level keys, summarize nested objects as `{...N keys}`
    5. **errorMessage** — content matches `Error:` / `Exception:` / `Traceback`. Strategy: keep error type + message + first 10 stack frames + last 3 frames
  - Strategy selection: try detectors in order above; first match wins; if none match, return content unchanged
  - Each strategy must respect `opts.{strategyName}: boolean` toggles (skip if false)
  - Return `{ compressed, strategy: 'fileContent'|'grepSearch'|'shellOutput'|'json'|'errorMessage'|'none', saved: original.length - compressed.length }`
  - Add 25+ unit tests in `tests/unit/compression/toolResultCompressor.test.ts` covering each strategy + detection edge cases + toggle off behavior

  **Must NOT do**:
  - No JSON parsing on every input (only when length suggests JSON-like prefix `{`/`[`)
  - No regex catastrophic backtracking (use anchored patterns, bounded quantifiers)
  - No throwing on malformed input — return original content with `strategy: 'none'`

  **Recommended Agent Profile**:
  - **Category**: `deep` — 5 detectors + 5 compressors + auto-routing
  - **Skills**: `test-driven-development`
  - **Skills Evaluated but Omitted**: `systematic-debugging`

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 2 with T2, T4, T5)
  - **Parallel Group**: Wave 2
  - **Blocks**: T6, T11
  - **Blocked By**: T1

  **References**:

  **Pattern References**:
  - `open-sse/services/compression/cavemanRules.ts` — multi-rule pipeline pattern
  - `open-sse/services/compression/preservation.ts` — code-block / URL preservation helpers

  **API/Type References**:
  - `open-sse/services/compression/types.ts:AggressiveConfig.toolStrategies` (added in T1)

  **Test References**:
  - `tests/unit/compression/cavemanRules.test.ts` — multi-strategy assertion patterns

  **WHY Each Reference Matters**:
  - Caveman rules already establish the "detect → transform → return savings" pattern. Mirroring it keeps the codebase coherent.

  **Acceptance Criteria**:
  - [ ] 25+ tests pass
  - [ ] `npm run typecheck:core` PASS
  - [ ] `npm run lint` PASS
  - [ ] Strategy `'none'` returned for plain prose input

  **QA Scenarios**:

  ```
  Scenario: fileContent strategy elides middle of long source file
    Tool: Bash + node REPL
    Preconditions: T3 applied
    Steps:
      1. Run: node --import tsx/esm -e "import { compressToolResult } from './open-sse/services/compression/toolResultCompressor.ts'; const code = Array.from({length:100},(_,i)=>'line '+i).join('\n'); const r = compressToolResult('import x from \"y\";\nfunction f(){}\n'+code,{fileContent:true,grepSearch:true,shellOutput:true,json:true,errorMessage:true}); console.log(JSON.stringify({strategy:r.strategy, savedGT0: r.saved>0, hasMarker: r.compressed.includes('elided')}))" > .sisyphus/evidence/task-3-fileContent.txt
      2. Assert output JSON has strategy:"fileContent", savedGT0:true, hasMarker:true
    Expected Result: All 3 fields true
    Evidence: .sisyphus/evidence/task-3-fileContent.txt

  Scenario: grepSearch strategy dedupes path:line: hits
    Tool: Bash + node REPL
    Preconditions: T3 applied
    Steps:
      1. Run a grep-like input with 100 hits across 5 files
      2. Assert top 30 retained, "[N more matches]" suffix present, original paths preserved
    Expected Result: compressed.length < original.length / 2
    Evidence: .sisyphus/evidence/task-3-grepSearch.txt

  Scenario: Toggle disables strategy
    Tool: Bash + node REPL
    Preconditions: T3 applied
    Steps:
      1. Pass code-like input with fileContent:false in opts
      2. Assert strategy === 'none' OR strategy !== 'fileContent'
    Expected Result: Strategy not fileContent when toggle off
    Evidence: .sisyphus/evidence/task-3-toggle.txt

  Scenario: All unit tests pass
    Tool: Bash
    Preconditions: T3 applied
    Steps:
      1. Run: node --import tsx/esm --test tests/unit/compression/toolResultCompressor.test.ts 2>&1 | tee .sisyphus/evidence/task-3-tests.txt
      2. Assert ≥25 passing, 0 failing
    Evidence: .sisyphus/evidence/task-3-tests.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-3-fileContent.txt`
  - [ ] `.sisyphus/evidence/task-3-grepSearch.txt`
  - [ ] `.sisyphus/evidence/task-3-toggle.txt`
  - [ ] `.sisyphus/evidence/task-3-tests.txt`

  **Commit**: YES
  - Message: `feat(compression): tool result compressor with 5 auto-detected strategies`
  - Files: `open-sse/services/compression/toolResultCompressor.ts`, `tests/unit/compression/toolResultCompressor.test.ts`
  - Pre-commit: `npm run typecheck:core && npm run lint && node --import tsx/esm --test tests/unit/compression/toolResultCompressor.test.ts`

- [ ] 4. Implement `progressiveAging.ts` — turn-based message tier degradation

  **What to do**:
  - Create `open-sse/services/compression/progressiveAging.ts`
  - Export `applyAging(messages: Message[], thresholds: AgingThresholds, summarizer: Summarizer): Promise<{ messages: Message[]; saved: number }>`
  - Tier rules based on turn distance from latest user message:
    - **verbatim** (distance ≤ thresholds.verbatim): keep as-is
    - **light** (distance ≤ thresholds.light): apply lite compression (delegate to existing `lite.ts`)
    - **moderate** (distance ≤ thresholds.moderate): apply caveman compression (delegate to existing `caveman.ts`)
    - **fullSummary** (distance > thresholds.fullSummary): replace assistant turns with summarizer output; keep user turn intent line only
  - Skip messages already containing `[COMPRESSED:*]` marker
  - Compute `saved` as sum of (originalLen - newLen) per message
  - Tag each modified message with marker `[COMPRESSED:aging:<tier>]` prefix
  - Add 15+ unit tests covering: each tier boundary, skip-already-compressed, empty input, single-message input, custom thresholds

  **Must NOT do**:
  - No mutation of original `messages` array — return new array
  - No re-aging of already-aged messages (idempotent)
  - No summarizer call for verbatim/light/moderate tiers

  **Recommended Agent Profile**:
  - **Category**: `deep`
  - **Skills**: `test-driven-development`

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 2 with T2, T3, T5)
  - **Parallel Group**: Wave 2
  - **Blocks**: T6
  - **Blocked By**: T1

  **References**:

  **Pattern References**:
  - `open-sse/services/compression/lite.ts` — delegated tier
  - `open-sse/services/compression/caveman.ts` — delegated tier
  - `open-sse/services/compression/summarizer.ts` (T2) — fullSummary tier

  **API/Type References**:
  - `open-sse/services/compression/types.ts:AggressiveConfig.thresholds` (T1)
  - `open-sse/services/compression/types.ts:Summarizer` (T1)

  **WHY Each Reference Matters**:
  - Aging is composition, not new logic — it routes messages to existing compressors based on turn distance.

  **Acceptance Criteria**:
  - [ ] 15+ tests pass
  - [ ] Idempotency test (run twice, second pass returns same output)
  - [ ] `npm run typecheck:core` PASS

  **QA Scenarios**:

  ```
  Scenario: 10-message conversation correctly tiered
    Tool: Bash + node REPL
    Preconditions: T2, T4 applied
    Steps:
      1. Build 10-turn conversation, run applyAging with defaults (5/3/2/2)
      2. Assert last 2 messages unchanged (verbatim)
      3. Assert messages 3-5 from end have [COMPRESSED:aging:light] or :moderate
      4. Assert messages >5 from end have [COMPRESSED:aging:fullSummary]
    Expected Result: Tier markers correctly applied per distance
    Evidence: .sisyphus/evidence/task-4-tiers.txt

  Scenario: Idempotent re-application
    Tool: Bash + node REPL
    Steps:
      1. Run applyAging twice; compare second output to first
      2. Assert deep equality
    Expected Result: Second pass is no-op
    Evidence: .sisyphus/evidence/task-4-idempotent.txt

  Scenario: All unit tests pass
    Tool: Bash
    Steps:
      1. Run: node --import tsx/esm --test tests/unit/compression/progressiveAging.test.ts
      2. Assert ≥15 pass, 0 fail
    Evidence: .sisyphus/evidence/task-4-tests.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-4-tiers.txt`
  - [ ] `.sisyphus/evidence/task-4-idempotent.txt`
  - [ ] `.sisyphus/evidence/task-4-tests.txt`

  **Commit**: YES
  - Message: `feat(compression): progressive turn-based message aging`
  - Files: `open-sse/services/compression/progressiveAging.ts`, `tests/unit/compression/progressiveAging.test.ts`
  - Pre-commit: `npm run typecheck:core && npm run lint && node --import tsx/esm --test tests/unit/compression/progressiveAging.test.ts`

- [ ] 5. DB migration 031 + `compression.ts` schema extension for `aggressive_config`

  **What to do**:
  - Create `src/lib/db/migrations/031_aggressive_compression.sql` (no-op, following 030 pattern):
    ```sql
    SELECT 1;
    -- Aggressive config is stored as a kv key in key_value(namespace='compression', key='aggressiveConfig')
    -- No schema change needed; this migration registers the version in _omniroute_migrations
    ```
  - Update `src/lib/db/compression.ts`:
    - Add `case "aggressiveConfig":` branch to the existing read switch (namespace `"compression"`, key `"aggressiveConfig"`): parse JSON if value exists; else return `getDefaultAggressiveConfig()`
    - Add `case "aggressiveConfig":` branch to the existing write switch: serialize `AggressiveConfig` to JSON and upsert into `key_value`
    - Add helper `getDefaultAggressiveConfig(): AggressiveConfig` (defaults: thresholds 5/3/2/2, all toolStrategies true, summarizerEnabled true)
    - Update `CompressionSettings` Zod schema to include optional `aggressive` field
  - Add migration test in `tests/unit/db/compression.test.ts`:
    - Apply migration 031 on fresh DB; verify `_omniroute_migrations` row with version `031` exists
    - Apply migration twice; verify idempotent (no error, row count unchanged)
    - Round-trip: write `AggressiveConfig` via compression.ts API, read it back, assert deep equal

  **Must NOT do**:
  - No DROP / RENAME / data deletion
  - Do NOT create or reference a `compression_settings` table — it does not exist; all settings live in `key_value`
  - No raw SQL in API routes — all DB access through `src/lib/db/compression.ts`

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high` — DB migration discipline matters
  - **Skills**: `test-driven-development`

  **Parallelization**:
  - **Can Run In Parallel**: YES (Wave 2 with T2, T3, T4)
  - **Parallel Group**: Wave 2
  - **Blocks**: T8, T9
  - **Blocked By**: T1

  **References**:

  **Pattern References**:
  - `src/lib/db/migrations/030_caveman_compression.sql` — Phase 2 migration pattern
  - `src/lib/db/migrations/migrationRunner.ts` — runner contract
  - `src/lib/db/compression.ts` — current read/write helpers

  **API/Type References**:
  - `src/lib/db/compression.ts:CompressionSettings` schema
  - `open-sse/services/compression/types.ts:AggressiveConfig` (T1)

  **Test References**:
  - `tests/unit/db/compression.test.ts` (Phase 2)

  **WHY Each Reference Matters**:
  - Migration 030 (Phase 2) is the most recent precedent; following its idempotency pattern keeps the runner happy.

  **Acceptance Criteria**:
  - [ ] Migration runs cleanly on fresh DB
  - [ ] Migration is idempotent
  - [ ] Round-trip JSON serialization preserves all `AggressiveConfig` fields
  - [ ] `npm run typecheck:core` PASS

  **QA Scenarios**:

  ```
  Scenario: Fresh DB migration applies cleanly
    Tool: Bash + node REPL
    Steps:
      1. Create temp DB, run migrationRunner up to 031
      2. Query: PRAGMA table_info(compression_settings)
      3. Assert "aggressive_config" column present, type TEXT
    Expected Result: Column exists
    Evidence: .sisyphus/evidence/task-5-migration.txt

  Scenario: Round-trip AggressiveConfig
    Tool: Bash + node REPL
    Steps:
      1. Write AggressiveConfig{thresholds:{fullSummary:7,...},...} via compression.ts API
      2. Read it back
      3. Assert deep equal
    Expected Result: Lossless round-trip
    Evidence: .sisyphus/evidence/task-5-roundtrip.txt

  Scenario: Idempotent re-run
    Tool: Bash
    Steps:
      1. Apply migration 031 twice via runner
      2. Assert second run is no-op (no error, _omniroute_migrations row count unchanged)
    Evidence: .sisyphus/evidence/task-5-idempotent.txt
  ```

  **Evidence to Capture**:
  - [ ] `.sisyphus/evidence/task-5-migration.txt`
  - [ ] `.sisyphus/evidence/task-5-roundtrip.txt`
  - [ ] `.sisyphus/evidence/task-5-idempotent.txt`

  **Commit**: YES
  - Message: `feat(db): migration 031 — aggressive_config column on compression_settings`
  - Files: `src/lib/db/migrations/031_aggressive_compression.sql`, `src/lib/db/compression.ts`, `tests/unit/db/compression.test.ts`
  - Pre-commit: `npm run typecheck:core && npm run lint && node --import tsx/esm --test tests/unit/db/compression.test.ts`

- [ ] 6. Aggressive Orchestrator (`aggressive.ts`)

  **What to do**:
  - Create `open-sse/services/compression/aggressive.ts`
  - Export `compressAggressive(messages: ChatMessage[], config: AggressiveConfig, stats: CompressionStats): Promise<ChatMessage[]>`
  - Load `AggressiveConfig` defaults from `DEFAULT_AGGRESSIVE_CONFIG` (T1); merge with caller-supplied config
  - Pipeline order (run all steps, accumulate saved tokens in `stats`):
    1. **Tool-result compression** — call `compressToolResults(messages, config.toolStrategies)` (T2)
    2. **Progressive aging** — call `applyProgressiveAging(messages, config.agingThresholds)` (T3)
    3. **Fallback summarizer** — for any remaining message exceeding `config.maxTokensPerMessage` (default 2048), call `summarize(message, config.summarizerOptions)` (T1 rule-based impl)
  - Recursion guard: before processing each message, skip if content includes `[COMPRESSED:` prefix (any tier marker)
  - Downgrade chain (try/catch per step): if any step throws, log warning via pino, skip that step, continue pipeline with unmodified messages for that step — never surface error to caller
  - Final downgrade: if total token savings < `config.minSavingsThreshold` (default 0.05 = 5%), fall through to caveman compression on the full message list; if caveman also under-threshold, fall through to lite; if still under, return original messages unchanged
  - Collect and return final `stats` object with `tokensSaved`, `compressionRatio`, `strategiesApplied: string[]`
  - Export `DEFAULT_AGGRESSIVE_CONFIG` (re-export from T1 types) and `AggressiveCompressionResult` type

  **Must NOT do**:
  - No LLM calls — `summarize()` must be rule-based only at this stage
  - No importing from external npm packages not already in package.json
  - Do not modify `lite.ts`, `caveman.ts`, or any Phase 1/2 source files
  - Do not hard-code thresholds — all config values come from `AggressiveConfig`
  - Do not swallow errors silently — use pino warn logging before skipping

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Core orchestration logic with multi-step pipeline, error handling, and fallback chains
  - **Skills**: none required
  - **Skills Evaluated but Omitted**:
    - `test-driven-development`: tests are a separate task (T7)

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (after T2, T3, T4 complete; T6 depends on all three modules)
  - **Blocks**: T7 (orchestrator tests), T9 (chatCore integration), T11 (integration tests)
  - **Blocked By**: T2 (toolResultCompressor), T3 (progressiveAging), T4 (summarizer), T5 (DB migration)

  **References**:

  **Pattern References**:
  - `open-sse/services/compression/caveman.ts` — pipeline pattern: iterate messages, collect stats, return modified array
  - `open-sse/services/compression/lite.ts` — fallback pattern and stats accumulation
  - `open-sse/services/compression/index.ts` — how compression modes are exported and composed

  **API/Type References**:
  - `open-sse/services/compression/types.ts` (T1) — `AggressiveConfig`, `DEFAULT_AGGRESSIVE_CONFIG`, `CompressionStats`, `ChatMessage`
  - `open-sse/services/compression/toolResultCompressor.ts` (T2) — `compressToolResults()`
  - `open-sse/services/compression/progressiveAging.ts` (T3) — `applyProgressiveAging()`
  - `open-sse/services/compression/summarizer.ts` (T4) — `summarize()`

  **External References**:
  - Issue #1588 §"Aggressive Mode Orchestration" — step order and downgrade chain spec

  **Acceptance Criteria**:
  - [ ] `open-sse/services/compression/aggressive.ts` exists and exports `compressAggressive`, `DEFAULT_AGGRESSIVE_CONFIG`, `AggressiveCompressionResult`
  - [ ] `npm run typecheck:core` passes with no new errors
  - [ ] `npm run lint` passes with no new warnings
  - [ ] Unit tests in T7 pass (covered there)

  **QA Scenarios**:

  ```
  Scenario: Full pipeline runs and returns compressed messages
    Tool: Bash (node REPL)
    Preconditions: T2, T3, T4 modules built; 20-message fixture with tool results and old messages
    Steps:
      1. node -e "import('./open-sse/services/compression/aggressive.js').then(m => m.compressAggressive(fixture, {}, stats)).then(r => console.log(r.length, stats.compressionRatio))"
      2. Assert output shows message count ≤ 20 and compressionRatio > 0
    Expected Result: Returns array, no throw, stats.compressionRatio > 0
    Evidence: .sisyphus/evidence/task-6-full-pipeline.txt

  Scenario: Recursion guard prevents double-compression
    Tool: Bash (node REPL)
    Preconditions: Input message content starts with "[COMPRESSED:aging:tier1]"
    Steps:
      1. Pass single message with "[COMPRESSED:aging:tier1] ..." content
      2. Assert output message content unchanged
    Expected Result: Message returned as-is, stats.tokensSaved === 0 for that message
    Evidence: .sisyphus/evidence/task-6-recursion-guard.txt

  Scenario: Step failure triggers downgrade, not crash
    Tool: Bash (node REPL)
    Preconditions: Mock toolResultCompressor to throw; real progressiveAging and summarizer available
    Steps:
      1. Pass 10-message fixture; toolResultCompressor throws
      2. Assert function returns without throw; pino warn logged
    Expected Result: Returns messages (possibly unchanged from tool step), no uncaught error
    Evidence: .sisyphus/evidence/task-6-downgrade-chain.txt
  ```

  **Evidence to Capture**:
  - [ ] task-6-full-pipeline.txt — node REPL output showing compressionRatio
  - [ ] task-6-recursion-guard.txt — node REPL output showing message unchanged
  - [ ] task-6-downgrade-chain.txt — node REPL output confirming no crash on step failure

  **Commit**: YES (groups with T7)
  - Message: `feat(compression): aggressive orchestrator pipeline with downgrade chain`
  - Files: `open-sse/services/compression/aggressive.ts`
  - Pre-commit: `npm run typecheck:core && npm run lint`

- [ ] 7. Orchestrator Unit Tests (`aggressive.test.ts`)

  **What to do**:
  - Create `tests/unit/compression/aggressive.test.ts` using Node.js native test runner
  - Test `compressAggressive()` directly with fixture messages
  - Test cases (minimum):
    1. Full pipeline: 20-msg fixture with tool results + old messages → compressionRatio > 0, no throw
    2. Recursion guard: message with `[COMPRESSED:aging:tier1]` prefix → unchanged
    3. Step failure downgrade: mock T2 to throw → function returns, no rethrow
    4. Savings threshold: all messages tiny (< threshold) → falls through to caveman → lite → raw
    5. Config merge: caller overrides `maxTokensPerMessage` → summarizer respects override
    6. Empty input: `[]` → returns `[]`, stats zeroed
    7. Single message, no tool result, not old → returned unchanged (no savings needed)
  - Use `mock.fn()` from Node.js `node:test` to stub `compressToolResults`, `applyProgressiveAging`, `summarize` where needed
  - Assert `stats.strategiesApplied` array contains names of applied strategies

  **Must NOT do**:
  - No real LLM calls — all summarizer calls must use rule-based stub or real rule-based impl
  - Do not skip error-path tests (step failure + downgrade)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Non-trivial mocking + downgrade chain edge cases
  - **Skills**: none required

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (after T6 complete)
  - **Blocks**: T11 (integration tests depend on passing unit baseline)
  - **Blocked By**: T6 (aggressive.ts must exist)

  **References**:
  - `tests/unit/compression/caveman.test.ts` — test file structure and fixture patterns
  - `tests/unit/compression/lite.test.ts` — stats assertion patterns
  - Node.js `node:test` docs for `mock.fn()` and `mock.module()`

  **Acceptance Criteria**:
  - [ ] `tests/unit/compression/aggressive.test.ts` exists
  - [ ] `node --import tsx/esm --test tests/unit/compression/aggressive.test.ts` → all pass, 0 failures
  - [ ] Minimum 7 test cases present
  - [ ] Coverage gate: statements/lines/functions/branches ≥ 60% on `aggressive.ts`

  **QA Scenarios**:

  ```
  Scenario: All 7 test cases pass
    Tool: Bash
    Preconditions: T6 aggressive.ts built
    Steps:
      1. node --import tsx/esm --test tests/unit/compression/aggressive.test.ts
      2. Assert exit code 0
      3. Assert output contains "pass" for each test, 0 failures
    Expected Result: 7/7 pass, exit 0
    Evidence: .sisyphus/evidence/task-7-test-run.txt

  Scenario: Coverage meets gate
    Tool: Bash
    Preconditions: T6 aggressive.ts built
    Steps:
      1. npm run test:coverage -- --reporter=text 2>&1 | grep aggressive
      2. Assert statements/lines/functions/branches ≥ 60%
    Expected Result: Coverage ≥ 60% for aggressive.ts
    Evidence: .sisyphus/evidence/task-7-coverage.txt
  ```

  **Evidence to Capture**:
  - [ ] task-7-test-run.txt — full test runner output
  - [ ] task-7-coverage.txt — coverage table row for aggressive.ts

  **Commit**: YES (groups with T6)
  - Message: `feat(compression): aggressive orchestrator pipeline with downgrade chain`
  - Files: `open-sse/services/compression/aggressive.ts`, `tests/unit/compression/aggressive.test.ts`
  - Pre-commit: `npm run typecheck:core && npm run lint && node --import tsx/esm --test tests/unit/compression/aggressive.test.ts`

- [ ] 8. API Route Extension (Zod schema + `aggressive_config` persistence)

  **What to do**:
  - Extend `src/app/api/settings/compression/route.ts`
  - Add Zod schema fields for `aggressive_config`:
    ```ts
    aggressiveConfig: z.object({
      agingThresholds: z.object({
        tier1: z.number().int().min(1).max(100).default(5),
        tier2: z.number().int().min(1).max(100).default(3),
        tier3: z.number().int().min(1).max(100).default(2),
        tier4: z.number().int().min(1).max(100).default(2),
      }).optional(),
      toolStrategies: z.object({
        truncate: z.boolean().default(true),
        summarize: z.boolean().default(true),
        deduplicate: z.boolean().default(true),
        strip_metadata: z.boolean().default(true),
        compress_json: z.boolean().default(true),
      }).optional(),
      maxTokensPerMessage: z.number().int().min(256).max(32768).default(2048),
      minSavingsThreshold: z.number().min(0).max(1).default(0.05),
    }).optional()
    ```
  - On `GET`: deserialize `aggressive_config` JSON column from DB; include in response
  - On `PUT`/`POST`: serialize `aggressiveConfig` to JSON; write to `aggressive_config` column via `updateCompressionSettings()` (extend DB helper if needed)
  - Validate that `tier1 ≥ tier2 ≥ tier3` (soft warning, not hard error — don't break existing UX)

  **Must NOT do**:
  - Do not break existing `mode`, `maxTokens`, `preserveSystemPrompt` fields
  - Do not add new HTTP endpoints — extend the existing route only
  - Do not store plaintext secrets in `aggressive_config`

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Schema extension on existing route; well-understood pattern
  - **Skills**: none required

  **Parallelization**:
  - **Can Run In Parallel**: YES (parallel with T9, T10 in Wave 4)
  - **Parallel Group**: Wave 4 (T8, T9, T10 in parallel after Wave 3 completes)
  - **Blocks**: T10 (UI needs API contract), T11 (integration tests need working API)
  - **Blocked By**: T5 (DB migration 031 must exist), T6 (AggressiveConfig type must exist)

  **References**:
  - `src/app/api/settings/compression/route.ts` — existing route to extend
  - `src/lib/db/compression.ts` — `updateCompressionSettings()` and `getCompressionSettings()`
  - `open-sse/services/compression/types.ts` (T1) — `AggressiveConfig` type
  - `src/app/api/settings/compression/route.ts` existing Zod schema — match style exactly

  **Acceptance Criteria**:
  - [ ] `GET /api/settings/compression` response includes `aggressiveConfig` field
  - [ ] `PUT /api/settings/compression` with valid `aggressiveConfig` → 200, persists to DB
  - [ ] `PUT` with invalid `aggressiveConfig` (e.g. `tier1: -1`) → 400 with Zod error message
  - [ ] `npm run typecheck:core` passes, `npm run lint` passes

  **QA Scenarios**:

  ```
  Scenario: GET returns aggressiveConfig with defaults
    Tool: Bash (curl)
    Preconditions: Server running; DB has migration 031 applied
    Steps:
      1. curl -s http://localhost:3000/api/settings/compression | jq .aggressiveConfig
      2. Assert output contains agingThresholds.tier1 === 5
    Expected Result: JSON object with default threshold values
    Evidence: .sisyphus/evidence/task-8-get-aggressive-config.json

  Scenario: PUT persists aggressiveConfig
    Tool: Bash (curl)
    Preconditions: Server running
    Steps:
      1. curl -s -X PUT http://localhost:3000/api/settings/compression -H 'Content-Type: application/json' -d '{"aggressiveConfig":{"agingThresholds":{"tier1":10,"tier2":5,"tier3":3,"tier4":2}}}'
      2. Assert 200 response
      3. curl -s http://localhost:3000/api/settings/compression | jq .aggressiveConfig.agingThresholds.tier1
      4. Assert "10"
    Expected Result: Persisted tier1=10 returned on GET
    Evidence: .sisyphus/evidence/task-8-put-aggressive-config.json

  Scenario: PUT with invalid value returns 400
    Tool: Bash (curl)
    Preconditions: Server running
    Steps:
      1. curl -s -X PUT http://localhost:3000/api/settings/compression -d '{"aggressiveConfig":{"maxTokensPerMessage":-1}}'
      2. Assert HTTP status 400
      3. Assert response body contains "maxTokensPerMessage"
    Expected Result: 400 with Zod validation error mentioning field name
    Evidence: .sisyphus/evidence/task-8-invalid-config.json
  ```

  **Evidence to Capture**:
  - [ ] task-8-get-aggressive-config.json — GET response body (jq formatted)
  - [ ] task-8-put-aggressive-config.json — PUT + re-GET response confirming persistence
  - [ ] task-8-invalid-config.json — 400 error response body

  **Commit**: YES
  - Message: `feat(api): extend compression settings route with aggressive_config Zod schema`
  - Files: `src/app/api/settings/compression/route.ts`, `src/lib/db/compression.ts`
  - Pre-commit: `npm run typecheck:core && npm run lint`

- [ ] 9. chatCore Integration (wire `"aggressive"` mode into pipeline)

  **What to do**:
  - Extend `open-sse/handlers/chatCore.ts` to call `compressAggressive()` when `compressionMode === "aggressive"`
  - Load `aggressive_config` from DB settings (via `getCompressionSettings()`) and pass as `AggressiveConfig` to `compressAggressive()`
  - Integration point: same location as existing `"caveman"` and `"lite"` mode branches
  - Add `"aggressive"` to the mode discriminant union in `chatCore.ts` (if not already in T1 types)
  - Ensure `stats` from `compressAggressive()` are merged into the existing `CompressionStats` object surfaced in response headers / detailed logs
  - Do NOT alter the `"lite"`, `"caveman"`, or `"off"` branches

  **Must NOT do**:
  - Do not change Phase 1 or Phase 2 code paths
  - Do not add new imports outside `open-sse/services/compression/`
  - Do not block the request if `compressAggressive()` throws — wrap in try/catch and fall through to caveman

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Must thread new mode through existing pipeline without breaking existing modes
  - **Skills**: none required

  **Parallelization**:
  - **Can Run In Parallel**: YES (parallel with T8, T10 in Wave 4)
  - **Parallel Group**: Wave 4
  - **Blocks**: T11 (integration tests), T13 (latency benchmark)
  - **Blocked By**: T6 (aggressive.ts), T5 (DB migration)

  **References**:
  - `open-sse/handlers/chatCore.ts` — existing mode branches (search for `"caveman"` or `compressionMode`)
  - `open-sse/services/compression/index.ts` — current exports; add `compressAggressive` export here too
  - `open-sse/services/compression/types.ts` (T1) — `AggressiveConfig`, `CompressionStats`
  - `src/lib/db/compression.ts` — `getCompressionSettings()` return shape

  **Acceptance Criteria**:
  - [ ] Setting `compressionMode = "aggressive"` in DB → chatCore calls `compressAggressive()`
  - [ ] Setting `compressionMode = "caveman"` → unchanged behavior (existing tests still pass)
  - [ ] `npm run typecheck:core` passes, `npm run lint` passes
  - [ ] Existing 72 Phase 2 unit tests still pass: `node --import tsx/esm --test tests/unit/compression/caveman.test.ts`

  **QA Scenarios**:

  ```
  Scenario: Aggressive mode is invoked when compressionMode=aggressive
    Tool: Bash (curl)
    Preconditions: Server running; DB compression mode set to "aggressive"; 50-message fixture payload
    Steps:
      1. curl -s -X POST http://localhost:3000/api/v1/chat/completions -H 'Content-Type: application/json' -d @tests/fixtures/long-session.json
      2. Assert response header X-Compression-Mode: aggressive (or equivalent stats header)
      3. Assert response body is valid OpenAI chat completion JSON
    Expected Result: Request succeeds; compression mode header shows "aggressive"
    Evidence: .sisyphus/evidence/task-9-aggressive-mode-header.txt

  Scenario: Existing caveman mode unchanged after integration
    Tool: Bash
    Preconditions: Existing test suite
    Steps:
      1. node --import tsx/esm --test tests/unit/compression/caveman.test.ts
      2. Assert exit code 0, 0 failures
    Expected Result: All existing caveman tests pass unchanged
    Evidence: .sisyphus/evidence/task-9-caveman-regression.txt
  ```

  **Evidence to Capture**:
  - [ ] task-9-aggressive-mode-header.txt — curl response headers showing compression mode
  - [ ] task-9-caveman-regression.txt — caveman test runner output (all pass)

  **Commit**: YES
  - Message: `feat(chatCore): wire aggressive compression mode into request pipeline`
  - Files: `open-sse/handlers/chatCore.ts`, `open-sse/services/compression/index.ts`
  - Pre-commit: `npm run typecheck:core && npm run lint && node --import tsx/esm --test tests/unit/compression/caveman.test.ts`

- [ ] 10. UI Extension (mode dropdown + 4 aging thresholds + 5 strategy toggles)

  **What to do**:
  - Extend `src/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab.tsx`
  - Add `"aggressive"` option to the existing mode dropdown (label: "Aggressive — history summarization + tool compression + aging")
  - When `mode === "aggressive"`, show an expanded config panel with:
    - **Aging Thresholds** section (4 numeric inputs):
      - "Tier 1 (summarize)" — default 5, range 1–100
      - "Tier 2 (key points)" — default 3, range 1–100
      - "Tier 3 (one-liner)" — default 2, range 1–100
      - "Tier 4 (remove)" — default 2, range 1–100
    - **Tool Result Strategies** section (5 toggle switches):
      - Truncate, Summarize, Deduplicate, Strip Metadata, Compress JSON — all default ON
  - Save: on form submit, include `aggressiveConfig` in PUT body to `/api/settings/compression`
  - i18n: add English strings only (no new locale files for other languages — carryover)
  - Loading/error states: reuse existing patterns from the tab component

  **Must NOT do**:
  - Do not change existing mode options ("off", "lite", "standard")
  - Do not add new npm packages (use existing form/UI primitives already in the codebase)
  - Do not break existing settings save for other modes

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: React UI component extension with controlled inputs and conditional rendering
  - **Skills**: [`frontend-ui-ux`]
    - `frontend-ui-ux`: Tailwind + React controlled form patterns; conditional panel visibility

  **Parallelization**:
  - **Can Run In Parallel**: YES (parallel with T8, T9 in Wave 4)
  - **Parallel Group**: Wave 4
  - **Blocks**: T11 (integration tests include UI smoke test), T12 (golden eval may need UI config set)
  - **Blocked By**: T8 (API route must accept `aggressiveConfig` before UI can save)

  **References**:
  - `src/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab.tsx` — existing component to extend
  - `src/app/(dashboard)/dashboard/settings/components/` — sibling components for UI primitives (Switch, NumberInput, etc.)
  - `open-sse/services/compression/types.ts` (T1) — `AggressiveConfig` for TypeScript types
  - Phase 2 UI PR diff (PR #1689) — how existing compression UI was added; follow same pattern

  **Acceptance Criteria**:
  - [ ] `"aggressive"` appears in mode dropdown
  - [ ] Selecting aggressive mode reveals aging threshold inputs and strategy toggles
  - [ ] Saving with aggressive mode selected → PUT includes `aggressiveConfig` in body
  - [ ] `npm run typecheck:core` passes, `npm run lint` passes
  - [ ] No visual regressions on other modes (screenshot evidence)

  **QA Scenarios**:

  ```
  Scenario: Aggressive mode option visible in dropdown
    Tool: Playwright (playwright skill)
    Preconditions: Dev server running at localhost:3000; logged in
    Steps:
      1. Navigate to http://localhost:3000/dashboard/settings
      2. Click the compression mode dropdown selector
      3. Assert dropdown option with text "Aggressive" is visible
    Expected Result: "Aggressive" option present in dropdown
    Evidence: .sisyphus/evidence/task-10-dropdown-aggressive.png

  Scenario: Selecting aggressive reveals config panel
    Tool: Playwright
    Steps:
      1. Select "Aggressive" from compression mode dropdown
      2. Assert section with text "Aging Thresholds" is visible
      3. Assert 4 numeric inputs with labels "Tier 1", "Tier 2", "Tier 3", "Tier 4" are present
      4. Assert 5 toggle switches labeled "Truncate", "Summarize", "Deduplicate", "Strip Metadata", "Compress JSON" are present
    Expected Result: Full config panel with 4 inputs + 5 toggles visible
    Evidence: .sisyphus/evidence/task-10-config-panel.png

  Scenario: Saving aggressive config persists via API
    Tool: Playwright
    Steps:
      1. Set mode to Aggressive; set Tier 1 = 8; disable "Deduplicate" toggle
      2. Click Save button
      3. Reload page; re-open settings
      4. Assert mode dropdown shows "Aggressive"; Tier 1 shows 8; Deduplicate toggle is OFF
    Expected Result: Config persisted and correctly loaded on reload
    Evidence: .sisyphus/evidence/task-10-save-reload.png
  ```

  **Evidence to Capture**:
  - [ ] task-10-dropdown-aggressive.png — screenshot of dropdown with Aggressive option
  - [ ] task-10-config-panel.png — screenshot of expanded config panel
  - [ ] task-10-save-reload.png — screenshot after reload confirming persistence

  **Commit**: YES
  - Message: `feat(ui): aggressive mode UI — aging thresholds + strategy toggles in compression settings`
  - Files: `src/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab.tsx`
  - Pre-commit: `npm run typecheck:core && npm run lint`

- [ ] 11. Integration Tests (`compression-aggressive.test.ts`)

  **What to do**:
  - Create `tests/integration/compression-aggressive.test.ts` using Node.js native test runner
  - Spin up the full compression pipeline (no HTTP server needed — import modules directly)
  - Test cases (minimum):
    1. End-to-end: 50-message fixture → `compressAggressive()` → output has fewer tokens than input
    2. Mode disabled: `mode = "off"` → no compression applied
    3. Tool result fixture: messages with `role: "tool"` → tool compressor applied, content truncated
    4. Aging fixture: messages with `turnIndex` 0–49 → tier markers applied correctly
    5. DB round-trip: write `aggressiveConfig` to DB via `updateCompressionSettings()` → read back → config unchanged
    6. ChatCore integration: mock `getCompressionSettings()` to return `mode: "aggressive"` → `compressAggressive` called (spy)
    7. Regression: existing `"caveman"` mode path in chatCore unchanged — spy confirms `compressCaveman` called when `mode: "caveman"`
  - Target coverage: ≥ 60% for all new files in `open-sse/services/compression/`

  **Must NOT do**:
  - Do not start a real HTTP server in integration tests
  - Do not make real LLM API calls
  - Do not test UI in integration tests (covered by T10 Playwright scenarios)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Multi-module integration with DB + pipeline + chatCore spy

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 5 (after T6–T10 all complete)
  - **Blocks**: F2 (code quality review runs this test suite), F3 (manual QA uses integration as baseline)
  - **Blocked By**: T6, T7, T8, T9, T10

  **References**:
  - `tests/integration/` — existing integration test patterns
  - `tests/unit/compression/caveman.test.ts` — fixture and stats assertion patterns
  - `src/lib/db/compression.ts` — DB helpers for round-trip test

  **Acceptance Criteria**:
  - [ ] `tests/integration/compression-aggressive.test.ts` exists
  - [ ] `node --import tsx/esm --test tests/integration/compression-aggressive.test.ts` → all pass
  - [ ] Minimum 7 test cases present
  - [ ] Coverage gate: `npm run test:coverage` ≥ 60% for all new compression files

  **QA Scenarios**:

  ```
  Scenario: Integration tests pass
    Tool: Bash
    Steps:
      1. node --import tsx/esm --test tests/integration/compression-aggressive.test.ts
      2. Assert exit code 0, 0 failures
    Expected Result: 7/7 pass
    Evidence: .sisyphus/evidence/task-11-integration-tests.txt

  Scenario: Coverage gate passes
    Tool: Bash
    Steps:
      1. npm run test:coverage 2>&1 | tail -30
      2. Assert all new compression files show ≥ 60% on statements/lines/functions/branches
    Expected Result: Coverage ≥ 60% across aggressive.ts, toolResultCompressor.ts, progressiveAging.ts, summarizer.ts
    Evidence: .sisyphus/evidence/task-11-coverage-gate.txt
  ```

  **Evidence to Capture**:
  - [ ] task-11-integration-tests.txt — full integration test runner output
  - [ ] task-11-coverage-gate.txt — coverage table for new compression files

  **Commit**: YES
  - Message: `test(compression): integration tests for aggressive mode pipeline`
  - Files: `tests/integration/compression-aggressive.test.ts`
  - Pre-commit: `npm run typecheck:core && npm run lint && node --import tsx/esm --test tests/integration/compression-aggressive.test.ts`

- [ ] 12. Golden Eval (`long-coding-session.json` + extended runner)

  **What to do**:
  - Create `tests/golden-set/long-coding-session.json` — fixture representing a realistic 80K-token coding session:
    - 200 messages: mix of user/assistant/tool roles
    - Include realistic tool results (grep output, file reads, shell commands)
    - Include old context (messages 0–50 simulating early session)
    - Total estimated tokens: ≥ 50K (use word-count proxy: ≥ 37,500 words)
  - Extend `tests/golden-set/runner.test.ts` (or create if missing) to:
    - Run `compressAggressive()` on the fixture
    - Assert token savings ≥ 40% (issue target: 80K → 32K = 60%; minimum bar: 40%)
    - Assert quality: system prompt preserved, code blocks preserved, URLs preserved, file paths preserved, error messages preserved (use preservation checkers from `compression/preservation.ts`)
    - Assert quality drop ≤ 5%: compare key content markers before/after (count preserved vs total important tokens)
    - Assert latency ≤ 50ms p95: run 10 iterations, measure each with `performance.now()`, assert p95 ≤ 50ms
  - Record baseline metrics in a JSON summary at `tests/golden-set/phase3-baseline.json`

  **Must NOT do**:
  - Do not use real API calls to measure token count — use whitespace-split word count as proxy
  - Do not commit large binary blobs — fixture is JSON text only
  - Do not lower the 40% savings assertion (it is the minimum acceptable bar)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Fixture crafting + perf measurement + quality preservation assertions

  **Parallelization**:
  - **Can Run In Parallel**: YES (parallel with T11, T13 in Wave 5)
  - **Parallel Group**: Wave 5
  - **Blocks**: F1 (plan compliance checks golden eval exists), F3 (manual QA runs golden eval)
  - **Blocked By**: T6 (aggressive.ts must exist)

  **References**:
  - `tests/golden-set/` — existing golden eval structure (if present)
  - `open-sse/services/compression/preservation.ts` — preservation checker helpers
  - Issue #1588 §"Quality" — 5% quality drop limit, 40-60% savings target
  - `open-sse/services/compression/stats.ts` — stats shape

  **Acceptance Criteria**:
  - [ ] `tests/golden-set/long-coding-session.json` exists (≥ 200 messages, ≥ 50K tokens proxy)
  - [ ] `node --import tsx/esm --test tests/golden-set/runner.test.ts` → all assertions pass
  - [ ] Token savings ≥ 40% asserted and passing
  - [ ] Quality drop ≤ 5% asserted and passing
  - [ ] Latency p95 ≤ 50ms asserted and passing
  - [ ] `tests/golden-set/phase3-baseline.json` written with actual metrics

  **QA Scenarios**:

  ```
  Scenario: Golden eval passes all three quality gates
    Tool: Bash
    Steps:
      1. node --import tsx/esm --test tests/golden-set/runner.test.ts
      2. Assert exit code 0
      3. Assert output contains "savings >= 40%", "quality drop <= 5%", "p95 latency <= 50ms"
    Expected Result: All 3 gates pass
    Evidence: .sisyphus/evidence/task-12-golden-eval.txt

  Scenario: Baseline metrics recorded
    Tool: Bash
    Steps:
      1. cat tests/golden-set/phase3-baseline.json | jq .
      2. Assert fields: tokenSavingsPct, qualityDropPct, latencyP95Ms present with numeric values
    Expected Result: JSON baseline file with all three metrics
    Evidence: .sisyphus/evidence/task-12-baseline.json
  ```

  **Evidence to Capture**:
  - [ ] task-12-golden-eval.txt — test runner output showing all 3 gates passing
  - [ ] task-12-baseline.json — copy of `phase3-baseline.json`

  **Commit**: YES
  - Message: `test(golden-eval): Phase 3 aggressive compression quality + perf baseline`
  - Files: `tests/golden-set/long-coding-session.json`, `tests/golden-set/runner.test.ts`, `tests/golden-set/phase3-baseline.json`
  - Pre-commit: `npm run typecheck:core && npm run lint && node --import tsx/esm --test tests/golden-set/runner.test.ts`

- [ ] 13. Latency Benchmark (standalone perf script)

  **What to do**:
  - Create `tests/perf/compression-aggressive-bench.ts`
  - Standalone benchmark (not a test runner file — runs via `npx tsx`):
    - Load `long-coding-session.json` fixture (T12)
    - Run `compressAggressive()` 100 times, record each duration via `performance.now()`
    - Compute: p50, p90, p95, p99, max
    - Assert p95 ≤ 50ms (throw if violated — fail the benchmark)
    - Print results table to stdout
    - Write `tests/perf/results-phase3.json` with all percentiles + timestamp
  - Add npm script: `"bench:compression": "npx tsx tests/perf/compression-aggressive-bench.ts"` to `package.json`

  **Must NOT do**:
  - Do not use `Date.now()` — use `performance.now()` for sub-millisecond resolution
  - Do not include warm-up in the 100 measured runs — do 5 warm-up iterations first, then measure
  - Do not depend on network (all local)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward perf script; no complex logic

  **Parallelization**:
  - **Can Run In Parallel**: YES (parallel with T11, T12 in Wave 5)
  - **Parallel Group**: Wave 5
  - **Blocks**: F1 (plan compliance verifies bench script exists)
  - **Blocked By**: T6 (aggressive.ts), T12 (fixture must exist)

  **References**:
  - `tests/perf/` — existing perf scripts if any
  - `open-sse/services/compression/aggressive.ts` (T6) — function to benchmark
  - `tests/golden-set/long-coding-session.json` (T12) — fixture to use

  **Acceptance Criteria**:
  - [ ] `tests/perf/compression-aggressive-bench.ts` exists
  - [ ] `npm run bench:compression` runs without error
  - [ ] p95 ≤ 50ms asserted in script (throws if violated)
  - [ ] `tests/perf/results-phase3.json` written after run
  - [ ] `package.json` has `"bench:compression"` script

  **QA Scenarios**:

  ```
  Scenario: Benchmark runs and p95 passes gate
    Tool: Bash
    Steps:
      1. npm run bench:compression 2>&1
      2. Assert exit code 0
      3. Assert output contains "p95" and value ≤ 50
    Expected Result: Benchmark passes; p95 ≤ 50ms
    Evidence: .sisyphus/evidence/task-13-bench-output.txt

  Scenario: Results JSON written
    Tool: Bash
    Steps:
      1. cat tests/perf/results-phase3.json | jq .p95
      2. Assert numeric value ≤ 50
    Expected Result: results-phase3.json with p95 ≤ 50
    Evidence: .sisyphus/evidence/task-13-results.json
  ```

  **Evidence to Capture**:
  - [ ] task-13-bench-output.txt — full benchmark stdout
  - [ ] task-13-results.json — copy of `results-phase3.json`

  **Commit**: YES
  - Message: `test(perf): Phase 3 aggressive compression latency benchmark (p95 ≤ 50ms)`
  - Files: `tests/perf/compression-aggressive-bench.ts`, `tests/perf/results-phase3.json`, `package.json`
  - Pre-commit: `npm run typecheck:core && npm run lint && npm run bench:compression`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Rejection → fix → re-run.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read this plan end-to-end. For each "Must Have": verify implementation exists (read file, run command, query DB). For each "Must NOT Have": search codebase — reject with file:line if violated (e.g., grep for new dep in package.json, grep for `[COMPRESSED:` recursion, grep for LLM SDK imports in compression/). Check evidence files exist in `.sisyphus/evidence/`. Compare deliverables to plan list.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `npm run typecheck:core`, `npm run lint`, `npm run test:vitest`, `node --import tsx/esm --test tests/unit/compression/*.test.ts`. Review all new files for: `as any`, `@ts-ignore`, empty catches, `console.log` in prod, dead code, generic names (`data`/`result`/`item`). Verify Zod schemas on all API inputs. Verify error handling preserves request flow.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high` + `playwright` skill
  Start fresh dev server. Execute every QA scenario from every task. Cross-task integration: enable aggressive in UI → send long chat → verify compression occurs → verify stats logged → switch back to caveman → verify no regression. Edge cases: empty history, single message, only tool calls, only thinking blocks, mode change mid-conversation. Save evidence to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (`git log`/`git diff`). Verify 1:1 — everything specified was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance per-task. Detect cross-task contamination (Task N touching Task M's files). Flag unaccounted file changes. Specifically check: no Phase 1/2 module modifications beyond exports; no i18n changes; no logs page changes; no new dependencies.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **T1**: `feat(compression): add AggressiveConfig types and Summarizer interface`
- **T2**: `feat(compression): rule-based history summarizer`
- **T3**: `feat(compression): tool-result compressor with 5 strategies`
- **T4**: `feat(compression): progressive aging tier logic`
- **T5**: `feat(db): migration 031 — aggressive compression config`
- **T6**: `feat(compression): aggressive mode orchestrator`
- **T7**: `feat(api): aggressive compression config validation`
- **T8**: `feat(compression): wire aggressive mode into strategySelector`
- **T9**: `feat(compression): integrate aggressive mode into chatCore pipeline`
- **T10**: `feat(ui): aggressive compression settings UI`
- **T11**: `test(compression): integration tests for aggressive mode`
- **T12**: `test(compression): long-coding-session golden eval fixture`
- **T13**: `test(compression): latency benchmark for aggressive mode`

Pre-commit gate per task: `npm run typecheck:core && npm run lint && relevant tests`.

---

## Success Criteria

### Verification Commands
```bash
# Type & lint
npm run typecheck:core    # Expected: 0 errors
npm run lint              # Expected: 0 errors

# Tests
node --import tsx/esm --test tests/unit/compression/summarizer.test.ts             # PASS
node --import tsx/esm --test tests/unit/compression/toolResultCompressor.test.ts   # PASS
node --import tsx/esm --test tests/unit/compression/progressiveAging.test.ts       # PASS
node --import tsx/esm --test tests/unit/compression/aggressive.test.ts             # PASS
node --import tsx/esm --test tests/integration/compression-aggressive.test.ts      # PASS

# Golden eval
node --import tsx/esm --test tests/golden-set/runner.test.ts  # Expected: aggressive mode ≥40% savings, ≤5% quality drop

# Migration
sqlite3 /tmp/test.db < src/lib/db/migrations/031_aggressive_compression.sql  # No errors
sqlite3 /tmp/test.db ".schema compression_settings"  # Shows new aggressive_config column

# API
curl -X PUT http://localhost:3000/api/settings/compression -H 'Content-Type: application/json' \
  -d '{"mode":"aggressive","aggressive":{"thresholds":{"verbatim":2,"light":2,"moderate":3,"fullSummary":5},"toolStrategies":{"fileContent":true,"grepSearch":true,"shellOutput":true,"json":true,"errorMessage":true}}}'
# Expected: 200 OK
```

### Final Checklist
- [ ] All "Must Have" items present in code
- [ ] All "Must NOT Have" items absent (verified by grep)
- [ ] All 13 tasks complete with QA evidence
- [ ] All 4 final review agents APPROVE
- [ ] PR description drafted with savings benchmarks and quality eval results
