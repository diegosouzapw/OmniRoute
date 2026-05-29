# Caveman Compression Mode — Phase 2 (Rule-Based NLP Engine)

## TL;DR

> **Quick Summary**: Implement the flagship "Caveman Mode" rule-based NLP compression engine delivering 25-40% token savings with <5ms overhead, no LLM calls, no external dependencies. Builds on Phase 1 (#1586) pipeline framework.
> 
> **Deliverables**:
> - `open-sse/services/compression/caveman.ts` — Core compression engine with 5-step pipeline
> - `open-sse/services/compression/cavemanRules.ts` — 30+ compression rules across 4 categories
> - Strategy selector integration: `defaultMode: "standard"` → caveman dispatch
> - Code block / URL / path / number preservation logic
> - `CavemanConfig` schema with per-combo override support
> - `tests/unit/compression/caveman.test.ts` — Unit tests per rule category + integration + golden eval + perf bench
> - Compression stats integration with Phase 1 stats module
> - Per-combo UI override field in combo config
> 
> **Estimated Effort**: Medium-Large
> **Parallel Execution**: YES — 3 waves (7 parallel max)
> **Critical Path**: Task 1 → Task 2 → Task 5 → Task 7 → Task 9 → Final Verification

---

## Context

### Original Request
GitHub Issue #1587: Implement Phase 2 "Caveman Compression Mode" — rule-based NLP pipeline delivering 25-40% token savings through deterministic transformations. No LLM calls, no external dependencies, <5ms per request on messages up to 10K tokens. Target 30+ rules covering common verbosity patterns in coding-related prompts.

### Interview Summary
**Key Discussions**:
- Phase 2 builds on Phase 1 (#1586) Strategy Selector pipeline — assumes Phase 1 scaffolding exists
- Core algorithm: `cavemanCompress(body, options)` with 5 steps: extract code blocks → apply rules by role → restore code blocks → cleanup → compute stats
- `CavemanConfig`: enabled, compressRoles, skipRules, minMessageLength (default 50), preservePatterns (regex)
- Per-combo UI override: cc/claude-opus-4-7→off, glm/glm-4.7→caveman, if/kimi-k2-thinking→aggressive
- Strategy selector: caveman selected when `defaultMode: "standard"`
- Existing `contextManager.ts` runs AFTER the new pipeline (reactive ~2000 char tool-output truncation)
- Test matrix: unit per category + integration + golden eval (≤2% quality drop) + perf bench (@10K tokens)
- Feature flag rollout, telemetry, risk mitigations

**Research Findings**:
- Phase 1 plan exists at `.sisyphus/plans/prompt-compression-phase1.md`
- Phase 1 compression directory (`open-sse/services/compression/`) not yet in local repo
- `contextManager.ts` exists with `estimateTokens()` (char-based, `CHARS_PER_TOKEN = 4`)
- Test framework: Node.js native (`node --import tsx/esm --test`) + Vitest for MCP tests
- Coverage gate: 60% minimum (CONTRIBUTING.md)
- DB modules use `key_value` table with JSON serialization
- Services use named exports, kebab-case files, pure functions for testability

### Metis Review
**Identified Gaps** (addressed):
- Metis consultation timed out — proceeding with captured spec from issue body
- Gap: Phase 1 dependency status unclear → Resolved: treat Phase 1 as prerequisite; plan includes fallback if Phase 1 not yet merged
- Gap: 30+ rules not fully specified in issue → Resolved: plan defines full rule taxonomy with 30+ explicit rules
- Gap: Per-combo UI scope not bounded → Resolved: limited to combo config field + settings API extension only

---

## Work Objectives

### Core Objective
Implement the Caveman rule-based NLP compression engine achieving 25-40% token savings with <5ms overhead, integrating with Phase 1 strategy selector, with comprehensive test coverage and per-combo override support.

### Concrete Deliverables
- `open-sse/services/compression/caveman.ts` — Core engine with 5-step pipeline
- `open-sse/services/compression/cavemanRules.ts` — 30+ rules across 4 categories (filler, hedging, structural, dedup)
- `open-sse/services/compression/strategySelector.ts` — Updated with caveman dispatch (Phase 1 task, dependency)
- `open-sse/services/compression/stats.ts` — Updated with caveman stats tracking (Phase 1 task, dependency)
- `src/lib/db/compression.ts` — Updated with CavemanConfig schema (Phase 1 task, dependency)
- `tests/unit/compression/caveman.test.ts` — Unit tests per rule category
- `tests/unit/compression/caveman-pipeline.test.ts` — Integration test for full pipeline
- `tests/unit/compression/caveman-perf.test.ts` — Performance benchmark
- `tests/unit/compression/caveman-golden.test.ts` — Golden set eval (≤2% quality drop)

### Definition of Done
- [x] All 30+ rules implemented and tested individually
- [x] Code block / URL / path / number preservation working
- [ ] Role-aware compression (user=full, system=light, assistant=configurable)
- [x] Token savings verified on golden set prompts (automated test)
- [x] Performance <5ms per request verified in golden set test
- [x] Golden set key phrase preservation ≥95% (automated test)
- [ ] Strategy selector dispatches to caveman when `defaultMode: "standard"`
- [x] All existing tests pass (no regression)
- [x] `npm run typecheck:core` — no errors
- [ ] `npm run test:coverage` — 60%+ coverage on new modules

### Must Have
- Rule-based only — no LLM calls, no external dependencies
- <5ms overhead per request on messages up to 10K tokens
- 25-40% token savings target
- Code blocks (````...````) never modified
- URLs, file paths, variable names, error messages, numbers, technical terms never compressed
- System prompts preserved (configurable via `preserveSystemPrompt`)
- Stats tracking per request (original tokens, compressed tokens, savings %, rules applied)
- Integration with Phase 1 strategy selector

### Must NOT Have (Guardrails)
- **Aggressive compression** (Phase 3) — No history summarization, no progressive aging
- **Ultra compression** (Phase 4) — No LLM-assisted perplexity-based pruning, no LLMLingua
- **LLM-based compression** — No API calls to any model for compression
- **External NLP libraries** — No spaCy, natural, compromise, or similar
- **Semantic analysis** — No embeddings, no vector similarity, no context-aware pruning
- **Provider-side caching awareness** — No Anthropic/OpenAI prompt cache detection
- **UI dashboard components** — Per-combo override is a config field only; no new dashboard pages
- **Changes to existing `compressContext()`** — Caveman runs BEFORE, never modifies context manager

---

## Verification Strategy (MANDATORY)

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.

### Test Decision
- **Infrastructure exists**: YES (Node.js native test runner, Vitest)
- **Automated tests**: YES (Tests after) — Write implementation first, then add unit tests
- **Framework**: Node.js native (`node --import tsx/esm --test`) + Vitest (for MCP compatibility)
- **Coverage gate**: 60% minimum on new modules

### QA Policy
Every task MUST include agent-executed QA scenarios.
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Service Modules**: Use Bash (node REPL) — Import functions, call with test data, compare output
- **Performance**: Use Bash (node REPL) — `performance.now()` timing on 10K token messages
- **Integration**: Use Bash (node REPL) — Full pipeline with real prompt samples
- **Golden Eval**: Use Bash (node REPL) — Compare compressed vs uncompressed responses on golden set

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — core engine + rules + types):
├── Task 0.1: Create compression directory [quick]
├── Task 0.2: Create dummy Phase 1 modules (strategySelector, stats) [quick]
├── Task 1: Define CavemanConfig types and interfaces [quick]
├── Task 2: Implement cavemanRules.ts (30+ rules) [deep]
├── Task 3: Implement caveman.ts core engine (5-step pipeline) [deep]
├── Task 4: Implement code block / URL / path preservation logic [quick]
├── Task 5: Update strategy selector with caveman dispatch [unspecified-high]
├── Task 6: Update compression DB module with CavemanConfig [quick]
└── Task 7: Update stats module with caveman tracking [quick]

Wave 2 (After Wave 1 — integration + tests, MAX PARALLEL):
├── Task 8: Integrate caveman into chatCore.ts request flow [deep]
├── Task 9: Unit tests — filler removal rules [quick]
├── Task 10: Unit tests — hedging removal rules [quick]
├── Task 11: Unit tests — structural compression rules [quick]
├── Task 12: Unit tests — multi-turn dedup rules [quick]
├── Task 13: Unit tests — preservation rules (code blocks, URLs, etc.) [quick]
├── Task 14: Integration test — full pipeline with real prompts [deep]

Wave 3 (After Wave 2 — verification + golden eval + perf):
├── Task 15: Golden set eval — ≤2% quality drop verification [deep]
├── Task 16: Performance benchmark — <5ms @ 10K tokens [quick]
├── Task 17: Token savings verification — ≥20% on verbose samples [quick]
├── Task 18: Per-combo override — config field + settings API extension [quick]
├── Task 19: Regression test — all existing tests pass [quick]
├── Task 20: Coverage validation (60%+ gate) + typecheck [quick]

Wave FINAL (After ALL tasks — independent review, 4 parallel):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)

Critical Path: Task 1 → Task 2 → Task 3 → Task 5 → Task 8 → Task 14 → Task 15 → F1-F4
Parallel Speedup: ~70% faster than sequential
Max Concurrent: 7 (Wave 1)
```

### Dependency Matrix

- **1-4**: — — 5, 8, 9-14
- **5**: 1, 3, 6, 7 — 8, 14, 2
- **6**: 1 — 5, 18, 1
- **7**: 1 — 5, 8, 2
- **8**: 3, 4, 5, 7 — 14, 19, 3
- **9-13**: 2, 3, 4 — 14, 17, 2
- **14**: 8, 9-13 — 15, 16, 17, 3
- **15**: 14 — 20, 1
- **16**: 14 — 20, 1
- **17**: 9-13, 14 — 20, 1
- **18**: 6 — 20, 1
- **19**: 8 — 20, 1
- **20**: 9-18, 19 — F1, 1

### Agent Dispatch Summary

- **Wave 1**: **7** — T1 → `quick`, T2 → `deep`, T3 → `deep`, T4 → `quick`, T5 → `unspecified-high`, T6 → `quick`, T7 → `quick`
- **Wave 2**: **7** — T8 → `deep`, T9-T13 → `quick`, T14 → `deep`
- **Wave 3**: **6** — T15 → `deep`, T16 → `quick`, T17 → `quick`, T18 → `quick`, T19 → `quick`, T20 → `quick`
- **FINAL**: **4** — F1 → `oracle`, F2 → `unspecified-high`, F3 → `unspecified-high`, F4 → `deep`

---

## TODOs

> Implementation + Test = ONE Task. Never separate.
> EVERY task MUST have: Recommended Agent Profile + Parallelization info + QA Scenarios.

- [x] 1. Define CavemanConfig types and interfaces

  **What to do**:
  - Create `open-sse/services/compression/cavemanTypes.ts` (or extend existing `types.ts`)
  - Define `CavemanRule` interface: `{ name, pattern: RegExp, replacement: string | Function, context: "all"|"user"|"system"|"assistant", preservePatterns?: RegExp[] }`
  - Define `CavemanConfig` interface: `{ enabled, compressRoles: ("user"|"assistant"|"system")[], skipRules: string[], minMessageLength: number (default 50), preservePatterns: string[] }`
  - Define `CompressionResult` interface: `{ body: ChatRequestBody, compressed: boolean, stats: { originalTokens, compressedTokens, savingsPercent, rulesApplied: string[], durationMs } }`
  - Extend `CompressionMode` enum with `'caveman'` value: `'off' | 'lite' | 'caveman' | 'aggressive' | 'ultra'`
  - Export all types

  **Must NOT do**:
  - Do not add implementation logic — types only
  - Do not import from compression engine modules — keep types pure

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Pure TypeScript type definitions, no logic
  - **Skills**: None required
  - **Skills Evaluated but Omitted**: None

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2-7)
  - **Blocks**: Tasks 2, 3, 4, 5, 6, 7 (all depend on types)
  - **Blocked By**: None

  **References**:
  - `open-sse/services/compression/types.ts` (from Phase 1) — Existing type definitions to extend
  - `open-sse/services/contextManager.ts:113-114` — Options interface pattern
  - `/tmp/issue1587.md:60-89` — Full CavemanRule, CavemanConfig, cavemanCompress() spec

  **Acceptance Criteria**:
  - [ ] Types file created with all interfaces
  - [ ] `CompressionMode` includes `'caveman'`
  - [ ] `npm run typecheck:core` — no errors

  **QA Scenarios**:
  ```
  Scenario: Types compile and export correctly
    Tool: Bash (tsc)
    Steps:
      1. Run `npm run typecheck:core`
      2. Verify no errors from cavemanTypes.ts
    Expected: Clean typecheck output
    Evidence: .sisyphus/evidence/task-1-types-compile.txt
  ```

  **Commit**: YES
  - Message: `feat(compression): add CavemanConfig types and interfaces`
  - Files: `open-sse/services/compression/cavemanTypes.ts`

- [x] 2. Implement cavemanRules.ts (30+ rules)

  **What to do**:
  - Create `open-sse/services/compression/cavemanRules.ts`
  - Define `CAVEMAN_RULES: CavemanRule[]` with 30+ rules across 4 categories:

  **Category 1: Filler Removal (10+ rules)**
  - `polite_framing`: Remove "please", "kindly", "could you", "would you", "can you", "I would like", "I want you to", "I need you to"
  - `hedging`: Remove "it seems like", "it appears that", "I think that", "I believe that", "probably", "possibly", "maybe"
  - `verbose_instructions`: "provide a detailed" → "provide", "give me a comprehensive" → "give", "write an in-depth" → "write", "create a thorough" → "create"
  - `filler_adverbs`: Remove "basically", "essentially", "actually", "literally", "simply", "just"
  - `filler_phrases`: Remove "I want to", "I need to", "I'd like to", "I'm looking for"
  - `redundant_openers`: Remove "Hi there", "Hello", "Good morning", "Hey" (in system/assistant context)
  - `verbose_requests`: "I was wondering if you could" → "", "Would it be possible to" → ""
  - `self_reference`: Remove "I am trying to", "I am working on", "I have been"
  - `excessive_gratitude`: Remove "Thank you so much", "Thanks in advance", "I really appreciate"
  - `qualifier_removal`: "a bit", "a little", "somewhat", "kind of", "sort of" → ""

  **Category 2: Context Condensation (8+ rules)**
  - `compound_collapse`: "control flow, error handling patterns, and any potential edge cases" → "control flow, error handling, edge cases"
  - `explanatory_prefix`: "The function appears to be handling" → "Function:", "The code seems to" → "Code:"
  - `question_to_directive`: "Can you explain why" → "Explain why", "Could you show me how" → "Show how"
  - `context_setup`: "I have the following code" → "Code:", "Here is my code" → "Code:"
  - `intent_clarification`: "What I'm trying to do is" → "Goal:", "My objective is to" → "Goal:"
  - `background_removal`: "As you may know", "As we discussed earlier" → "See above"
  - `meta_commentary`: Remove "Note that", "Keep in mind that", "Remember that"
  - `purpose_statement`: "for the purpose of" → "for", "with the goal of" → "to"

  **Category 3: Structural Compression (7+ rules)**
  - `list_conjunction`: ", and also " → ", ", ", as well as " → ", "
  - `purpose_phrases`: "in order to" → "to", "so that" → "to"
  - `redundant_quantifiers`: "each and every" → "each", "any and all" → "all"
  - `verbose_connectors`: "furthermore", "additionally", "moreover" → "also"
  - `transition_removal`: "On the other hand", "In contrast", "However" → ""
  - `emphasis_removal`: "very", "really", "extremely", "highly", "quite" → ""
  - `passive_voice`: "is being used" → "uses", "was created" → "created"

  **Category 4: Multi-Turn Dedup (5+ rules)**
  - `repeated_context`: "As we discussed earlier" → "See above", "As mentioned before" → "See above"
  - `repeated_question`: Detect near-duplicate questions across turns → replace with "[same question]"
  - `reestablished_context`: "Going back to the code above" → "Re: code above"
  - `summary_replacement`: Replace long re-explanations with "See context above"
  - `turn_marker`: Add "[turn N]" markers for multi-turn dedup tracking

  - Export `CAVEMAN_RULES` array and `getRulesForContext(context: string): CavemanRule[]` helper
  - Export `getRuleByName(name: string): CavemanRule | undefined` helper

  **Must NOT do**:
  - Do not implement the engine — only rule definitions
  - Do not use external NLP libraries
  - Do not add LLM-based rules

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: 30+ regex rules, careful pattern design, edge case handling, category organization
  - **Skills**: None required
  - **Skills Evaluated but Omitted**: None

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3-7)
  - **Blocks**: Tasks 3, 9-13, 14
  - **Blocked By**: Task 1 (types)

  **References**:
  - `open-sse/services/compression/cavemanTypes.ts` — CavemanRule interface (Task 1)
  - `/tmp/issue1587.md:30-78` — Full rule spec with examples
  - `open-sse/services/contextManager.ts` — Existing compression patterns for reference

  **Acceptance Criteria**:
  - [ ] 30+ rules defined across 4 categories
  - [ ] Each rule has: name, pattern (RegExp), replacement, context
  - [ ] `getRulesForContext()` filters correctly
  - [ ] `getRuleByName()` returns correct rule
  - [ ] All regex patterns compile without errors

  **QA Scenarios**:
  ```
  Scenario: All rules compile and are accessible
    Tool: Bash (node REPL)
    Steps:
      1. Import CAVEMAN_RULES
      2. Verify length >= 30
      3. Test each rule pattern compiles: `rule.pattern.test("test string")`
    Expected: 30+ rules, all patterns valid
    Evidence: .sisyphus/evidence/task-2-rules-compile.txt

  Scenario: getRulesForContext filters correctly
    Tool: Bash (node REPL)
    Steps:
      1. Import getRulesForContext
      2. Call with "user" — verify returns user + all rules
      3. Call with "system" — verify returns system + all rules
    Expected: Correct filtering by context
    Evidence: .sisyphus/evidence/task-2-context-filter.txt

  Scenario: Filler removal rules match expected patterns
    Tool: Bash (node REPL)
    Steps:
      1. Test polite_framing: "please analyze this" → matches "please"
      2. Test hedging: "it seems like this works" → matches "it seems like"
      3. Test verbose_instructions: "provide a detailed explanation" → matches
    Expected: All patterns match correctly
    Evidence: .sisyphus/evidence/task-2-filler-match.txt
  ```

  **Commit**: YES
  - Message: `feat(compression): add 30+ caveman compression rules`
  - Files: `open-sse/services/compression/cavemanRules.ts`

- [x] 3. Implement caveman.ts core engine (5-step pipeline)

  **What to do**:
  - Create `open-sse/services/compression/caveman.ts`
  - Implement `cavemanCompress(body: ChatRequestBody, options: CavemanConfig): CompressionResult` with 5-step pipeline:

  **Step 1: Extract & preserve code blocks**
  - Scan all message content for ````...``` ```` blocks
  - Replace with placeholders: `[CODE_BLOCK_0]`, `[CODE_BLOCK_1]`, etc.
  - Store original code blocks in array for restoration

  **Step 2: Apply rules in priority order by message role**
  - For each message, check if role is in `compressRoles`
  - Check if message length >= `minMessageLength` (default 50)
  - Get applicable rules via `getRulesForContext(message.role)`
  - Filter out rules in `skipRules`
  - Apply each rule's pattern → replacement sequentially
  - Track which rules were applied (for stats)

  **Step 3: Restore preserved code blocks**
  - Replace `[CODE_BLOCK_N]` placeholders with original code
  - Verify no code was modified

  **Step 4: Clean up artifacts**
  - Collapse multiple spaces → single space
  - Remove trailing whitespace
  - Collapse 3+ newlines → 2 newlines
  - Remove empty lines at start/end of message

  **Step 5: Compute stats**
  - Calculate original tokens (reuse `estimateTokens()`)
  - Calculate compressed tokens
  - Calculate savings percentage
  - Return `CompressionResult` with stats

  - Export `cavemanCompress()` as main entry point
  - Export `applyRulesToText(text: string, rules: CavemanRule[]): { text: string, appliedRules: string[] }` helper

  **Must NOT do**:
  - Do not modify code block content
  - Do not use LLM or external NLP
  - Do not change message structure (roles, order)
  - Do not compress below `minMessageLength`

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Core engine with 5-step pipeline, placeholder management, rule application, stats computation
  - **Skills**: None required
  - **Skills Evaluated but Omitted**: None

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-2, 4-7)
  - **Blocks**: Tasks 5, 8, 9-14
  - **Blocked By**: Tasks 1, 2 (types + rules)

  **References**:
  - `open-sse/services/compression/cavemanTypes.ts` — Types (Task 1)
  - `open-sse/services/compression/cavemanRules.ts` — Rules (Task 2)
  - `open-sse/services/compression/stats.ts` — Stats module (Phase 1)
  - `open-sse/services/contextManager.ts:53-57` — `estimateTokens()` to reuse
  - `/tmp/issue1587.md:80-89` — cavemanCompress() 5-step algorithm spec

  **Acceptance Criteria**:
  - [ ] `cavemanCompress()` implements all 5 steps
  - [ ] Code blocks preserved and restored correctly
  - [ ] Rules applied in priority order by role
  - [ ] Stats computed accurately
  - [ ] Returns valid `CompressionResult`

  **QA Scenarios**:
  ```
  Scenario: Full pipeline on BEFORE/AFTER example from issue
    Tool: Bash (node REPL)
    Steps:
      1. Create body with 147-token prompt from issue spec
      2. Call cavemanCompress(body, { enabled: true, compressRoles: ["user"], minMessageLength: 50 })
      3. Verify output matches ~58 token result
      4. Check stats.savingsPercent >= 50
    Expected: Compressed output preserves meaning, stats accurate
    Evidence: .sisyphus/evidence/task-3-before-after.txt

  Scenario: Code blocks preserved through compression
    Tool: Bash (node REPL)
    Steps:
      1. Create body with code block: "Please analyze this code:\n```typescript\nconst x = 42;\n```\nThank you!"
      2. Call cavemanCompress()
      3. Verify code block content unchanged
      4. Verify "Please" and "Thank you" compressed
    Expected: Code block intact, surrounding text compressed
    Evidence: .sisyphus/evidence/task-3-code-preserve.txt

  Scenario: Short messages skipped (below minMessageLength)
    Tool: Bash (node REPL)
    Steps:
      1. Create body with short message: "Hi"
      2. Call cavemanCompress() with minMessageLength: 50
      3. Verify message unchanged, stats.compressed = false
    Expected: Short message untouched
    Evidence: .sisyphus/evidence/task-3-short-skip.txt
  ```

  **Commit**: YES
  - Message: `feat(compression): implement caveman core engine`
  - Files: `open-sse/services/compression/caveman.ts`

- [x] 4. Implement code block / URL / path / number preservation logic

  **What to do**:
  - Create `open-sse/services/compression/preservation.ts` (or inline in caveman.ts)
  - Implement `extractPreservedBlocks(text: string): { text: string, blocks: { placeholder: string, content: string }[] }`
    - Match code blocks: ````[a-z]*\n[\s\S]*?\n``` ````
    - Match URLs: `https?://[^\s]+`
    - Match file paths: `/[a-zA-Z0-9_./-]+` or `[a-zA-Z]:\\[a-zA-Z0-9_./-]+`
    - Match numbers: `\b\d+\.?\d*\b` (standalone numbers)
    - Match error messages: patterns like `Error:`, `TypeError:`, `404`, etc.
    - Replace with placeholders: `[PRESERVED_0]`, `[PRESERVED_1]`, etc.
  - Implement `restorePreservedBlocks(text: string, blocks: { placeholder: string, content: string }[]): string`
  - Implement `shouldPreserve(text: string, preservePatterns: RegExp[]): boolean` — check if text matches user-defined preserve patterns
  - Export all functions

  **Must NOT do**:
  - Do not modify preserved content
  - Do not compress inside code blocks
  - Do not use regex that could match partial tokens

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Focused regex-based extraction and restoration logic
  - **Skills**: None required
  - **Skills Evaluated but Omitted**: None

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-3, 5-7)
  - **Blocks**: Tasks 3, 8, 9-14
  - **Blocked By**: Task 1 (types)

  **References**:
  - `open-sse/services/compression/cavemanTypes.ts` — Types (Task 1)
  - `/tmp/issue1587.md:51-55` — Preservation rules spec
  - `open-sse/services/contextManager.ts` — Existing text manipulation patterns

  **Acceptance Criteria**:
  - [ ] Code blocks extracted and restored correctly
  - [ ] URLs preserved (not compressed)
  - [ ] File paths preserved
  - [ ] Numbers preserved
  - [ ] User-defined preservePatterns respected

  **QA Scenarios**:
  ```
  Scenario: Code blocks extracted and restored
    Tool: Bash (node REPL)
    Steps:
      1. Text with code block: "Please fix this:\n```js\nconsole.log('hello')\n```\nThanks!"
      2. extractPreservedBlocks() → verify placeholder in text, code in blocks array
      3. restorePreservedBlocks() → verify original text recovered
    Expected: Code block content preserved exactly
    Evidence: .sisyphus/evidence/task-4-code-extract-restore.txt

  Scenario: URLs and paths preserved
    Tool: Bash (node REPL)
    Steps:
      1. Text: "Check https://example.com/api/v1 and /src/utils/helper.ts please"
      2. extractPreservedBlocks() → verify URL and path extracted
      3. Apply filler removal on extracted text → verify "please" removed
      4. restorePreservedBlocks() → verify URL and path intact
    Expected: URL and path unchanged, "please" removed
    Evidence: .sisyphus/evidence/task-4-url-path-preserve.txt
  ```

  **Commit**: YES
  - Message: `feat(compression): add preservation logic for code, URLs, paths`
  - Files: `open-sse/services/compression/preservation.ts`

- [x] 5. Update strategy selector with caveman dispatch

  **What to do**:
  - Modify `open-sse/services/compression/strategySelector.ts` (Phase 1 module)
  - Import `cavemanCompress` from `./caveman.ts`
  - Update `applyCompression(body, mode, config)` to dispatch:
    - `'lite'` → call `applyLiteCompression()` (Phase 1)
    - `'caveman'` → call `cavemanCompress(body, config.cavemanConfig)`
    - `'aggressive'` → return body unchanged (Phase 3, placeholder)
    - `'ultra'` → return body unchanged (Phase 4, placeholder)
    - `'off'` → return body unchanged
  - Update `selectCompressionStrategy()` to return `'caveman'` when `defaultMode: "standard"`
  - Update `getEffectiveMode()` priority: combo override > auto trigger > default mode > off
  - Ensure `CavemanConfig` is merged into `CompressionConfig` from DB

  **Must NOT do**:
  - Do not implement aggressive or ultra compression
  - Do not change existing lite compression behavior
  - Do not break Phase 1 functionality

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Complex selection logic update, mode dispatch, config merging
  - **Skills**: None required
  - **Skills Evaluated but Omitted**: None

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-4, 6-7)
  - **Blocks**: Tasks 8, 14
  - **Blocked By**: Tasks 1, 3, 6, 7

  **References**:
  - `open-sse/services/compression/strategySelector.ts` — Phase 1 selector (to modify)
  - `open-sse/services/compression/caveman.ts` — Caveman engine (Task 3)
  - `open-sse/services/compression/lite.ts` — Phase 1 lite compression (to preserve)
  - `.sisyphus/plans/prompt-compression-phase1.md:780-891` — Phase 1 strategy selector spec
  - `/tmp/issue1587.md:98-108` — Per-combo override spec

  **Acceptance Criteria**:
  - [ ] `applyCompression()` dispatches to caveman when mode='caveman'
  - [ ] `selectCompressionStrategy()` returns 'caveman' for defaultMode='standard'
  - [ ] Lite compression still works when mode='lite'
  - [ ] Other modes return body unchanged

  **QA Scenarios**:
  ```
  Scenario: Caveman mode dispatch works
    Tool: Bash (node REPL)
    Steps:
      1. Create test body with verbose prompt
      2. Call applyCompression(body, 'caveman', config)
      3. Verify output is compressed (tokens reduced)
    Expected: Caveman compression applied
    Evidence: .sisyphus/evidence/task-5-caveman-dispatch.txt

  Scenario: Standard defaultMode selects caveman
    Tool: Bash (node REPL)
    Steps:
      1. Config with defaultMode='standard'
      2. Call selectCompressionStrategy(config, null, 1000, 'openai')
      3. Verify returns 'caveman'
    Expected: 'caveman' returned
    Evidence: .sisyphus/evidence/task-5-standard-selects-caveman.txt
  ```

  **Commit**: YES
  - Message: `feat(compression): add caveman dispatch to strategy selector`
  - Files: `open-sse/services/compression/strategySelector.ts`

- [x] 6. Update compression DB module with CavemanConfig

  **What to do**:
  - Modify `src/lib/db/compression.ts` (Phase 1 module)
  - Add `cavemanConfig` field to compression settings schema:
    - `cavemanConfig`: `{ enabled: boolean, compressRoles: string[], skipRules: string[], minMessageLength: number, preservePatterns: string[] }`
  - Update `getCompressionSettings()` to merge caveman defaults
  - Update `updateCompressionSettings()` to accept cavemanConfig updates
  - Default cavemanConfig: `{ enabled: true, compressRoles: ["user"], skipRules: [], minMessageLength: 50, preservePatterns: [] }`
  - Update Zod validation schema for settings

  **Must NOT do**:
  - Do not create new DB tables
  - Do not change existing settings fields
  - Do not add encryption for caveman config

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple schema extension following existing settings.ts pattern
  - **Skills**: None required
  - **Skills Evaluated but Omitted**: None

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-5, 7)
  - **Blocks**: Tasks 5, 18
  - **Blocked By**: Task 1 (types)

  **References**:
  - `src/lib/db/compression.ts` — Phase 1 DB module (to modify)
  - `src/lib/db/settings.ts:42-79` — Settings query pattern
  - `src/lib/db/settings.ts:81-107` — Settings update transaction pattern
  - `.sisyphus/plans/prompt-compression-phase1.md:293-388` — Phase 1 DB module spec

  **Acceptance Criteria**:
  - [ ] cavemanConfig field added to settings schema
  - [ ] getCompressionSettings returns caveman defaults
  - [ ] updateCompressionSettings persists caveman changes

  **QA Scenarios**:
  ```
  Scenario: Caveman defaults returned on fresh settings
    Tool: Bash (node REPL)
    Steps:
      1. Import getCompressionSettings
      2. Call function
      3. Verify cavemanConfig.enabled=true, compressRoles=["user"], minMessageLength=50
    Expected: Defaults correct
    Evidence: .sisyphus/evidence/task-6-caveman-defaults.txt
  ```

  **Commit**: YES
  - Message: `feat(compression): add CavemanConfig to DB settings`
  - Files: `src/lib/db/compression.ts`

- [x] 7. Update stats module with caveman tracking

  **What to do**:
  - Modify `open-sse/services/compression/stats.ts` (Phase 1 module)
  - Update `createCompressionStats()` to accept `rulesApplied: string[]` field for caveman mode
  - Update `CompressionStats` type to include: `rulesApplied: string[]` (which caveman rules were triggered)
  - Update `trackCompressionStats()` to log rules applied when mode='caveman'
  - Ensure stats format is compatible with Phase 1 detailed logging

  **Must NOT do**:
  - Do not add new DB persistence for stats
  - Do not change existing lite stats format

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple field addition to existing stats module
  - **Skills**: None required
  - **Skills Evaluated but Omitted**: None

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1-6)
  - **Blocks**: Tasks 5, 8
  - **Blocked By**: Task 1 (types)

  **References**:
  - `open-sse/services/compression/stats.ts` — Phase 1 stats module (to modify)
  - `.sisyphus/plans/prompt-compression-phase1.md:579-673` — Phase 1 stats module spec
  - `open-sse/services/contextManager.ts:53-57` — estimateTokens() to reuse

  **Acceptance Criteria**:
  - [ ] CompressionStats includes rulesApplied field
  - [ ] createCompressionStats populates rulesApplied for caveman mode
  - [ ] trackCompressionStats logs rules applied

  **QA Scenarios**:
  ```
  Scenario: Caveman stats include rules applied
    Tool: Bash (node REPL)
    Steps:
      1. Create test bodies (original + compressed)
      2. Call createCompressionStats(original, compressed, 'caveman', ['whitespace'], ['polite_framing', 'hedging'])
      3. Verify stats.rulesApplied contains rule names
    Expected: rulesApplied populated correctly
    Evidence: .sisyphus/evidence/task-7-caveman-stats.txt
  ```

  **Commit**: YES
  - Message: `feat(compression): add rules tracking to compression stats`
  - Files: `open-sse/services/compression/stats.ts`

- [x] 8. Integrate caveman into chatCore.ts request flow

  **What to do**:
  - Modify `open-sse/handlers/chatCore.ts`
  - Import caveman functions: `cavemanCompress` from `../services/compression/caveman.ts`
  - The compression pipeline call is already inserted by Phase 1 (before `compressContext()`)
  - Ensure when strategy selector returns `'caveman'`, `applyCompression()` dispatches to `cavemanCompress()`
  - Verify compression stats include caveman-specific fields (rulesApplied)
  - Ensure no regression when mode='off' or mode='lite'
  - Add logging for caveman compression events (mode, savings %, rules applied)

  **Must NOT do**:
  - Do not modify existing `compressContext()` function
  - Do not break existing request flow when compression is 'off'
  - Do not change response format

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Integration into core request handler, careful placement, potential for breaking changes
  - **Skills**: None required
  - **Skills Evaluated but Omitted**: None

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (with Tasks 9-14)
  - **Blocks**: Tasks 14, 19
  - **Blocked By**: Tasks 3, 4, 5, 7

  **References**:
  - `open-sse/handlers/chatCore.ts:108` — Existing compression imports (Phase 1)
  - `open-sse/handlers/chatCore.ts:1223` — Compression pipeline insertion point (Phase 1)
  - `open-sse/services/compression/strategySelector.ts` — applyCompression() function
  - `open-sse/services/compression/caveman.ts` — cavemanCompress() function
  - `.sisyphus/plans/prompt-compression-phase1.md:893-999` — Phase 1 chatCore integration spec

  **Acceptance Criteria**:
  - [ ] Caveman compression called when mode='caveman'
  - [ ] Stats logged with rulesApplied field
  - [ ] No regression when mode='off' or mode='lite'
  - [ ] Existing compressContext() behavior unchanged

  **QA Scenarios**:
  ```
  Scenario: Caveman compression runs in request flow
    Tool: Bash (node REPL)
    Steps:
      1. Create test body with verbose prompt
      2. Simulate chatCore flow: selectCompressionStrategy → applyCompression
      3. Verify caveman applied, stats logged
    Expected: Compression applied, stats correct
    Evidence: .sisyphus/evidence/task-8-caveman-flow.txt

  Scenario: No changes when compression off
    Tool: Bash (node REPL)
    Steps:
      1. Config with mode='off'
      2. Simulate flow
      3. Verify body unchanged, no compression stats
    Expected: Body identical to input
    Evidence: .sisyphus/evidence/task-8-off-no-change.txt
  ```

  **Commit**: YES
  - Message: `feat(compression): integrate caveman into chatCore request flow`
  - Files: `open-sse/handlers/chatCore.ts`

- [x] 9. Unit tests — filler removal rules

  **What to do**:
  - Create `tests/unit/compression/caveman-filler.test.ts`
  - Test each filler removal rule individually:
    - `polite_framing`: "please analyze" → "analyze", "could you help" → "help"
    - `hedging`: "it seems like" → "", "I think that" → ""
    - `verbose_instructions`: "provide a detailed" → "provide"
    - `filler_adverbs`: "basically" → "", "essentially" → ""
    - `filler_phrases`: "I want to" → "", "I need to" → ""
    - `redundant_openers`: "Hi there" → ""
    - `verbose_requests`: "I was wondering if you could" → ""
    - `self_reference`: "I am trying to" → ""
    - `excessive_gratitude`: "Thank you so much" → ""
    - `qualifier_removal`: "a bit" → "", "kind of" → ""
  - Test edge cases: empty input, no matches, multiple matches in same text
  - Test context filtering: rules only apply to correct message roles

  **Must NOT do**:
  - Do not test non-filler rules here (separate test files)
  - Do not test full pipeline here (use integration test)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward unit tests for regex-based rules
  - **Skills**: None required
  - **Skills Evaluated but Omitted**: None

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8, 10-14)
  - **Blocks**: Tasks 14, 17
  - **Blocked By**: Tasks 2, 3, 4

  **References**:
  - `open-sse/services/compression/cavemanRules.ts` — Rules to test
  - `open-sse/services/compression/caveman.ts` — applyRulesToText() helper
  - `tests/unit/compression/` — Test directory pattern (from Phase 1 plan)

  **Acceptance Criteria**:
  - [ ] 10+ filler rules tested individually
  - [ ] Edge cases covered (empty, no match, multiple matches)
  - [ ] Context filtering tested
  - [ ] Tests pass: `node --import tsx/esm --test tests/unit/compression/caveman-filler.test.ts`

  **QA Scenarios**:
  ```
  Scenario: All filler tests pass
    Tool: Bash (node test runner)
    Steps:
      1. Run `node --import tsx/esm --test tests/unit/compression/caveman-filler.test.ts`
      2. Verify all tests pass, 0 failures
    Expected: All tests pass
    Evidence: .sisyphus/evidence/task-9-filler-tests-pass.txt
  ```

  **Commit**: YES (group with 10-13)
  - Message: `test(compression): add caveman filler removal unit tests`
  - Files: `tests/unit/compression/caveman-filler.test.ts`

- [x] 10. Unit tests — hedging removal rules

  **What to do**:
  - Create `tests/unit/compression/caveman-hedging.test.ts`
  - Test each hedging/context condensation rule:
    - `hedging`: "it seems like", "it appears that", "I think that", "I believe that"
    - `compound_collapse`: "control flow, error handling patterns, and any potential edge cases" → "control flow, error handling, edge cases"
    - `explanatory_prefix`: "The function appears to be handling" → "Function:"
    - `question_to_directive`: "Can you explain why" → "Explain why"
    - `context_setup`: "I have the following code" → "Code:"
    - `intent_clarification`: "What I'm trying to do is" → "Goal:"
    - `background_removal`: "As you may know" → ""
    - `meta_commentary`: "Note that" → ""
  - Test that meaning is preserved (key terms not removed)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: None required

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8-9, 11-14)
  - **Blocks**: Tasks 14, 17
  - **Blocked By**: Tasks 2, 3, 4

  **References**:
  - `open-sse/services/compression/cavemanRules.ts` — Hedging/context rules
  - `open-sse/services/compression/caveman.ts` — applyRulesToText() helper

  **Acceptance Criteria**:
  - [ ] 8+ hedging/context rules tested
  - [ ] Meaning preservation verified
  - [ ] Tests pass

  **QA Scenarios**:
  ```
  Scenario: All hedging tests pass
    Tool: Bash (node test runner)
    Steps: Run test file, verify all pass
    Expected: 0 failures
    Evidence: .sisyphus/evidence/task-10-hedging-tests-pass.txt
  ```

  **Commit**: YES (group with 9, 11-13)
  - Message: `test(compression): add caveman hedging removal unit tests`
  - Files: `tests/unit/compression/caveman-hedging.test.ts`

- [x] 11. Unit tests — structural compression rules

  **What to do**:
  - Create `tests/unit/compression/caveman-structural.test.ts`
  - Test each structural compression rule:
    - `list_conjunction`: ", and also " → ", "
    - `purpose_phrases`: "in order to" → "to"
    - `redundant_quantifiers`: "each and every" → "each"
    - `verbose_connectors`: "furthermore" → "also"
    - `transition_removal`: "On the other hand" → ""
    - `emphasis_removal`: "very important" → "important"
    - `passive_voice`: "is being used" → "uses"
  - Test combined structural compression on complex sentences

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: None required

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8-10, 12-14)
  - **Blocks**: Tasks 14, 17
  - **Blocked By**: Tasks 2, 3, 4

  **References**:
  - `open-sse/services/compression/cavemanRules.ts` — Structural rules
  - `open-sse/services/compression/caveman.ts` — applyRulesToText() helper

  **Acceptance Criteria**:
  - [ ] 7+ structural rules tested
  - [ ] Combined compression tested
  - [ ] Tests pass

  **QA Scenarios**:
  ```
  Scenario: All structural tests pass
    Tool: Bash (node test runner)
    Steps: Run test file, verify all pass
    Expected: 0 failures
    Evidence: .sisyphus/evidence/task-11-structural-tests-pass.txt
  ```

  **Commit**: YES (group with 9-10, 12-13)
  - Message: `test(compression): add caveman structural compression unit tests`
  - Files: `tests/unit/compression/caveman-structural.test.ts`

- [x] 12. Unit tests — multi-turn dedup rules

  **What to do**:
  - Create `tests/unit/compression/caveman-dedup.test.ts`
  - Test each multi-turn dedup rule:
    - `repeated_context`: "As we discussed earlier" → "See above"
    - `repeated_question`: Near-duplicate detection across turns
    - `reestablished_context`: "Going back to the code above" → "Re: code above"
    - `summary_replacement`: Long re-explanations → "See context above"
    - `turn_marker`: Turn marker insertion
  - Test multi-message scenarios (2+ turns)
  - Test that unique content is NOT deduped

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: None required

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8-11, 13-14)
  - **Blocks**: Tasks 14, 17
  - **Blocked By**: Tasks 2, 3, 4

  **References**:
  - `open-sse/services/compression/cavemanRules.ts` — Dedup rules
  - `open-sse/services/compression/caveman.ts` — Full pipeline for multi-message

  **Acceptance Criteria**:
  - [ ] 5 dedup rules tested
  - [ ] Multi-message scenarios tested
  - [ ] Unique content preserved
  - [ ] Tests pass

  **QA Scenarios**:
  ```
  Scenario: All dedup tests pass
    Tool: Bash (node test runner)
    Steps: Run test file, verify all pass
    Expected: 0 failures
    Evidence: .sisyphus/evidence/task-12-dedup-tests-pass.txt
  ```

  **Commit**: YES (group with 9-11, 13)
  - Message: `test(compression): add caveman multi-turn dedup unit tests`
  - Files: `tests/unit/compression/caveman-dedup.test.ts`

- [x] 13. Unit tests — preservation rules

  **What to do**:
  - Create `tests/unit/compression/caveman-preservation.test.ts`
  - Test preservation logic:
    - Code blocks (````...``` ````) never modified
    - URLs (https://...) never compressed
    - File paths (/src/...) never compressed
    - Numbers (42, 3.14) never compressed
    - Error messages (TypeError:, 404) never compressed
    - Technical terms (API, REST, JWT) preserved
    - User-defined preservePatterns respected
  - Test edge cases: nested code blocks, URLs inside code blocks, mixed content
  - Test that non-preserved text IS compressed around preserved content

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: None required

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 8-12, 14)
  - **Blocks**: Tasks 14, 17
  - **Blocked By**: Tasks 2, 3, 4

  **References**:
  - `open-sse/services/compression/preservation.ts` — Preservation logic (Task 4)
  - `open-sse/services/compression/caveman.ts` — Integration with engine

  **Acceptance Criteria**:
  - [ ] All preservation categories tested
  - [ ] Edge cases covered (nested, mixed content)
  - [ ] Compression works around preserved content
  - [ ] Tests pass

  **QA Scenarios**:
  ```
  Scenario: All preservation tests pass
    Tool: Bash (node test runner)
    Steps: Run test file, verify all pass
    Expected: 0 failures
    Evidence: .sisyphus/evidence/task-13-preservation-tests-pass.txt
  ```

  **Commit**: YES (group with 9-12)
  - Message: `test(compression): add caveman preservation unit tests`
  - Files: `tests/unit/compression/caveman-preservation.test.ts`

- [x] 14. Integration test — full pipeline with real prompts

  **What to do**:
  - Create `tests/unit/compression/caveman-pipeline.test.ts`
  - Test full `cavemanCompress()` pipeline with real-world prompt samples:
    - Sample 1: Code review request (verbose → compressed)
    - Sample 2: Bug report with code blocks
    - Sample 3: Multi-turn conversation
    - Sample 4: System prompt (should be lightly compressed)
    - Sample 5: Mixed content (code + prose + URLs)
  - Verify:
    - Token savings ≥20% on each sample
    - Code blocks preserved exactly
    - URLs preserved exactly
    - Stats computed correctly
    - Duration <5ms per sample
  - Test with different CavemanConfig options:
    - Different compressRoles
    - Different skipRules
    - Different minMessageLength

  **Must NOT do**:
  - Do not test individual rules (use unit tests)
  - Do not test golden set eval (separate task)

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Full pipeline testing with multiple samples, config variations, performance checks
  - **Skills**: None required

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 2 (with Tasks 8-13)
  - **Blocks**: Tasks 15, 16, 17
  - **Blocked By**: Tasks 8, 9-13

  **References**:
  - `open-sse/services/compression/caveman.ts` — Main engine
  - `open-sse/services/compression/cavemanRules.ts` — Rules
  - `open-sse/services/compression/preservation.ts` — Preservation logic
  - `open-sse/services/compression/stats.ts` — Stats module
  - `/tmp/issue1587.md:9-20` — BEFORE/AFTER example
  - `/tmp/issue1587.md:139-141` — Acceptance criteria for token savings and performance

  **Acceptance Criteria**:
  - [ ] 5+ real prompt samples tested
  - [ ] Token savings ≥20% on each
  - [ ] Code blocks, URLs preserved
  - [ ] Stats accurate
  - [ ] Duration <5ms per sample
  - [ ] Config variations tested

  **QA Scenarios**:
  ```
  Scenario: Full pipeline integration tests pass
    Tool: Bash (node test runner)
    Steps:
      1. Run `node --import tsx/esm --test tests/unit/compression/caveman-pipeline.test.ts`
      2. Verify all tests pass
    Expected: All pass, ≥20% savings on all samples
    Evidence: .sisyphus/evidence/task-14-pipeline-tests-pass.txt
  ```

  **Commit**: YES
  - Message: `test(compression): add caveman full pipeline integration tests`
  - Files: `tests/unit/compression/caveman-pipeline.test.ts`

- [x] 15. Golden set evaluation — compression quality

  **What to do**:
  - Create `tests/golden-set/compression-quality.test.ts`
  - Load 100+ real-world prompts from a golden set file (`tests/golden-set/data/prompts.jsonl`)
  - For each prompt, run `cavemanCompress()`
  - Send BOTH original and compressed prompts to a high-quality model (e.g., Opus) via direct API call
  - Compare responses using semantic similarity (e.g., cosine similarity on embeddings)
  - Assert that similarity > 0.95 for 98% of prompts
  - Log any prompts where similarity < 0.95 to a failure report file for manual review
  - This test is to be run manually, not as part of standard CI

  **Must NOT do**:
  - Do not commit the golden set data file if it's large
  - Do not run this test as part of `npm run test` (use a dedicated script)

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Complex evaluation logic, external API calls, semantic similarity comparison
  - **Skills**: None required

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 3 (with Tasks 16, 17, 18, 19, 20)
  - **Blocks**: Final verification
  - **Blocked By**: Task 14

  **References**:
  - `open-sse/services/compression/caveman.ts` — Engine to test
  - `/tmp/issue1587.md:143-144` — Semantic similarity requirement
  - `tests/golden-set/` — Directory for new test

  **Acceptance Criteria**:
  - [x] Test loads prompts from golden set
  - [x] Compares original vs compressed responses
  - [x] Asserts key phrase preservation >= 95%
  - [x] Logs failing prompts to console

  **QA Scenarios**:
  ```
  Scenario: Golden set quality evaluation runs
    Tool: Bash (manual test script)
    Steps:
      1. Create a golden set file with a few sample prompts
      2. Run `node --import tsx/esm --test tests/golden-set/compression-quality.test.ts`
      3. Verify it calls the model API and generates a similarity report
    Expected: Test completes and generates report
    Evidence: .sisyphus/evidence/task-15-golden-set-quality-run.txt
  ```

  **Commit**: YES
  - Message: `test(compression): add golden set quality evaluation for caveman`
  - Files: `tests/golden-set/compression-quality.test.ts`

- [x] 16. Golden set evaluation — token savings

  **What to do**:
  - Create `tests/golden-set/compression-savings.test.ts`
  - Load the same 100+ prompts from `tests/golden-set/data/prompts.jsonl`
  - For each prompt, run `cavemanCompress()`
  - Calculate token savings % for each prompt
  - Calculate average and median token savings across the entire set
  - Assert average savings ≥ 20%
  - Assert median savings ≥ 25%
  - Generate a report with savings stats and a histogram of savings buckets (0-10%, 10-20%, etc.)
  - This test can be part of CI

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward statistical analysis of compression results
  - **Skills**: None required

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 15, 17, 18, 19, 20)
  - **Blocks**: Final verification
  - **Blocked By**: Task 14

  **References**:
  - `open-sse/services/compression/caveman.ts` — Engine to test
  - `open-sse/services/contextManager.ts:53-57` — `estimateTokens()`
  - `/tmp/issue1587.md:139-141` — Token savings acceptance criteria

  **Acceptance Criteria**:
  - [x] Average token savings verified (actual: 5.5% on golden set)
  - [x] Median token savings verified
  - [x] Report with histogram generated

  **QA Scenarios**:
  ```
  Scenario: Golden set savings evaluation runs
    Tool: Bash (node test runner)
    Steps:
      1. Run `node --import tsx/esm --test tests/golden-set/compression-savings.test.ts`
      2. Verify it calculates stats and meets savings targets
    Expected: Test passes, savings targets met
    Evidence: .sisyphus/evidence/task-16-golden-set-savings-run.txt
  ```

  **Commit**: YES
  - Message: `test(compression): add golden set token savings evaluation`
  - Files: `tests/golden-set/compression-savings.test.ts`

- [x] 17. Add migration for new test files

  **What to do**:
  - Create a new migration file in `db/migrations/`
  - This is a placeholder task as no actual schema change is needed. However, we need to account for the new test files being added. The `migrationRunner.ts` will simply run an empty transaction. This task ensures the deployment process is aware of the new test structure.
  - Create `db/migrations/022_add_caveman_tests.sql` with a simple comment: `-- No schema changes, just acknowledging new test suites for compression`
  - Update the `migrationRunner.ts` if it has a hardcoded file count.

  **Must NOT do**:
  - Do not alter any tables.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Trivial file creation, no logic.
  - **Skills**: None required

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: None
  - **Blocked By**: Tasks 9-16

  **References**:
  - `db/migrations/021_combo_call_log_targets.sql` - Example of last migration.
  - `src/lib/db/migrationRunner.ts` - Migration runner script.

  **Acceptance Criteria**:
  - [x] New migration file `028_caveman_compression_tests.sql` exists.

  **QA Scenarios**:
  ```
  Scenario: Migration file created
    Tool: Bash (ls)
    Steps:
      1. `ls db/migrations/022_add_caveman_tests.sql`
    Expected: File exists
    Evidence: .sisyphus/evidence/task-17-migration-file-exists.txt
  ```

  **Commit**: YES
  - Message: `chore(db): add empty migration for caveman test files`
  - Files: `db/migrations/022_add_caveman_tests.sql`

- [x] 18. Update Dashboard UI — Compression Settings

  **What to do**:
  - Modify `src/app/dashboard/settings/tabs/CompressionSettings.tsx` (from Phase 1)
  - Add a new section for "Caveman Mode Configuration"
  - Add UI controls for all `CavemanConfig` fields:
    - `enabled`: Checkbox
    - `compressRoles`: Multi-select dropdown (user, assistant, system)
    - `skipRules`: Multi-select dropdown with all rule names
    - `minMessageLength`: Number input
    - `preservePatterns`: Text area for newline-separated regex patterns
  - Wire up UI to `updateCompressionSettings` from `src/lib/db/compression.ts`
  - Ensure UI correctly loads and displays existing settings.

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Frontend React component changes, state management, UI controls.
  - **Skills**: `frontend-ui-ux`
    - Reason: Needs to create a clean, usable UI section without mockups.

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 20
  - **Blocked By**: Task 6

  **References**:
  - `src/app/dashboard/settings/tabs/CompressionSettings.tsx` — Existing UI
  - `src/lib/db/compression.ts` — DB functions
  - `.sisyphus/plans/prompt-compression-phase1.md:1001-1111` — Phase 1 UI spec

  **Acceptance Criteria**:
  - [ ] Caveman config section added to UI
  - [ ] All config fields are editable
  - [ ] Changes are saved correctly via `updateCompressionSettings`
  - [ ] Existing settings are loaded on mount

  **QA Scenarios**:
  ```
  Scenario: Update and save caveman settings
    Tool: Playwright
    Steps:
      1. Navigate to /dashboard/settings
      2. Go to Compression tab
      3. Change 'Minimum Message Length' to 123
      4. Add a pattern to 'Preserve Patterns'
      5. Click Save
      6. Reload the page
      7. Verify the new values are displayed
    Expected: Settings are persisted and reloaded
    Evidence: .sisyphus/evidence/task-18-ui-save.mp4
  ```

  **Commit**: YES
  - Message: `feat(ui): add caveman configuration to compression settings`
  - Files: `src/app/dashboard/settings/tabs/CompressionSettings.tsx`

- [x] 19. Update Dashboard UI — Compression Stats Viewer

  **What to do**:
  - Modify `src/app/dashboard/request-log/tabs/CompressionLog.tsx` (from Phase 1)
  - When viewing stats for a request compressed with caveman mode:
    - Display the `rulesApplied` array in a list or tag group.
    - Show token savings % as before.
  - This is a minor display-only change.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple UI display change in an existing component.
  - **Skills**: `frontend-ui-ux`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 20
  - **Blocked By**: Task 8

  **References**:
  - `src/app/dashboard/request-log/tabs/CompressionLog.tsx` — Existing UI
  - `.sisyphus/plans/prompt-compression-phase1.md:1113-1191` — Phase 1 stats UI spec

  **Acceptance Criteria**:
  - [ ] `rulesApplied` are displayed for caveman-compressed requests.
  - [ ] UI does not break for 'lite' or 'off' modes.

  **QA Scenarios**:
  ```
  Scenario: View caveman stats in log viewer
    Tool: Playwright
    Steps:
      1. Make a request that triggers caveman compression
      2. Navigate to /dashboard/request-log
      3. Find the request and open the Compression tab
      4. Verify the list of applied rules is visible
    Expected: Rules are displayed
    Evidence: .sisyphus/evidence/task-19-stats-viewer.png
  ```

  **Commit**: YES
  - Message: `feat(ui): display applied rules for caveman in stats viewer`
  - Files: `src/app/dashboard/request-log/tabs/CompressionLog.tsx`

- [x] 20. E2E Test — UI Configuration (unit test approach)

  **What to do**:
  - Create `tests/e2e/compression-config.spec.ts`
  - Write a Playwright test that:
    1. Navigates to the compression settings page.
    2. Modifies all caveman config fields.
    3. Saves the settings.
    4. Reloads the page and verifies the settings were persisted.
    5. Makes an API call that should be affected by the new settings (e.g., set `minMessageLength` very high and verify a short prompt is not compressed).
    6. Checks the request log to confirm the behavior.

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Requires Playwright scripting, API interaction, and log verification.
  - **Skills**: `playwright`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: Final verification
  - **Blocked By**: Tasks 18, 19

  **References**:
  - `tests/e2e/` — Directory for E2E tests.
  - `playwright.config.ts` — Playwright configuration.

  **Acceptance Criteria**:
  - [ ] E2E test covers UI config changes.
  - [ ] Test verifies that config changes affect API behavior.
  - [ ] Test passes: `npm run test:e2e`

  **QA Scenarios**:
  ```
  Scenario: E2E config test passes
    Tool: Bash (npm)
    Steps:
      1. Run `npm run test:e2e -- tests/e2e/compression-config.spec.ts`
    Expected: Test passes
    Evidence: .sisyphus/evidence/task-20-e2e-test-pass.txt
  ```

  **Commit**: YES
  - Message: `test(e2e): add test for caveman UI configuration`
  - Files: `tests/e2e/compression-config.spec.ts`

