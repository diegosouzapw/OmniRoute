# Phase 4 — Ultra Compression (LLMLingua-Style Token Pruning)

## TL;DR

> **Quick Summary**: Implement "ultra" compression mode — heuristic information-density scoring
> (Tier A, no SLM required) that prunes low-information word-tokens to achieve ≥40% savings
> in <10ms, with a Tier B SLM abstraction stub for future ONNX integration. The entire
> compression stack (Phases 1–3) already exists and is wired in `chatCore.ts`; Phase 4 adds
> one new mode into the existing pipeline.
>
> **Deliverables**:
> - `open-sse/services/compression/ultraHeuristic.ts` — token scorer + pruner (NEW)
> - `open-sse/services/compression/ultra.ts` — orchestrator: tier dispatch + fallback (NEW)
> - `open-sse/services/compression/types.ts` — `UltraConfig` + `DEFAULT_ULTRA_CONFIG` (ADDITIVE)
> - `open-sse/services/compression/strategySelector.ts` — `"ultra"` case in `applyCompression` (ADDITIVE)
> - `open-sse/services/compression/index.ts` — re-export ultra symbols (ADDITIVE)
> - `src/lib/db/compression.ts` — `"ultraConfig"` key in `getCompressionSettings` switch (ADDITIVE)
> - `src/lib/db/migrations/032_ultra_compression.sql` — version marker migration (NEW)
> - `tests/unit/compression/ultra.test.ts` — ≥25 tests across 4 suites (NEW)
>
> **Estimated Effort**: Medium (2 coding waves + final gate)
> **Parallel Execution**: YES — Wave 1 (T1‖T2), Wave 2 (T3‖T4‖T5‖T6)
> **Critical Path**: T1 (types) → T2 (heuristic) → T3 (orchestrator) → T4 (pipeline wire) → F1+F2

---

## Context

### Original Request
Build Phase 4 on branch `oyi77:feat/caveman-compression-phase2-reconciled`, stacking on top
of Phase 3 (PR #1717). Phase 4 is issue **#1589 — Ultra Compression**.

### Existing Foundation (Verified)

**What already exists that T1–T4 must integrate with:**

| File | Relevant to Phase 4 |
|------|---------------------|
| `open-sse/services/compression/types.ts` | `CompressionMode` union already has `"ultra"`. `CompressionConfig` has `aggressive?: AggressiveConfig` pattern to follow for `ultra?: UltraConfig`. |
| `open-sse/services/compression/strategySelector.ts` | `applyCompression()` at line 41 has `if (mode === "off")…if (mode === "lite")…if (mode === "standard")…if (mode === "aggressive")` — **needs `if (mode === "ultra")` case added**. `selectCompressionStrategy()` / `getEffectiveMode()` already pass `"ultra"` through unchanged if it's in `config.defaultMode`. |
| `open-sse/services/compression/index.ts` | Re-exports all compression symbols. Must add `ultraCompress`, `DEFAULT_ULTRA_CONFIG` exports. |
| `open-sse/handlers/chatCore.ts` | Calls `applyCompression(body, mode, {model, config})` at line ~1277. Already allows `"ultra"` — `getCompressionSettings()` in `compression.ts` already handles `"ultra"` in the `defaultMode` switch at line ~64. **No changes needed in chatCore.** |
| `src/lib/db/compression.ts` | `getCompressionSettings()` reads from `key_value` (namespace=`"compression"`). Has switch on key names (`"cavemanConfig"`, `"aggressiveConfig"`). **Must add `"ultraConfig"` case** to parse/merge ultra config from DB. |
| `src/lib/db/migrations/031_aggressive_compression.sql` | Style reference: `SELECT 1;` marker migration — ultra follows same pattern since config is KV-based. |

**Key architectural fact**: There is NO `compression_settings` table. Config lives in
`key_value (namespace='compression', key, value)`. Migrations 030 and 031 are just `SELECT 1;`
version markers. Migration 032 follows the same pattern.

**`applyCompression` current structure** (strategySelector.ts:41–70):
```ts
export function applyCompression(body, mode, options): CompressionResult {
  if (mode === "off")        { return { body, compressed: false, stats: null }; }
  if (mode === "lite")       { return applyLiteCompression(body, options); }
  if (mode === "standard")   { /* caveman */ }
  if (mode === "aggressive") { /* compressAggressive */ }
  return { body, compressed: false, stats: null };  // ← ultra falls through here currently
}
```

### Issue Reference
- Issue **#1589** — Ultra Compression (Phase 4)
- Branch: `oyi77:feat/caveman-compression-phase2-reconciled`
- HEAD: `4f7a0c26`

---

## Work Objectives

### Core Objective
Make `mode === "ultra"` fully functional end-to-end so that when a user or combo sets
`defaultMode: "ultra"`, the pipeline scores each word-token by information density and
prunes the bottom `(1 - compressionRate)` fraction, achieving ≥40% token savings on
typical prose while force-preserving critical tokens (numbers, URLs, code syntax).

### Concrete Deliverables with Exact Paths
1. `open-sse/services/compression/ultraHeuristic.ts` — exports `scoreToken`, `pruneByScore`
2. `open-sse/services/compression/ultra.ts` — exports `ultraCompress`, `SLMInterface`, `createSLMStub`
3. `open-sse/services/compression/types.ts` — adds `UltraConfig`, `DEFAULT_ULTRA_CONFIG`, `CompressionConfig.ultra?`
4. `open-sse/services/compression/strategySelector.ts` — adds `if (mode === "ultra")` branch in `applyCompression`
5. `open-sse/services/compression/index.ts` — re-exports `ultraCompress`, `createSLMStub`, `DEFAULT_ULTRA_CONFIG` from `./ultra.ts`
6. `src/lib/db/compression.ts` — adds `"ultraConfig"` case in `getCompressionSettings` switch
7. `src/lib/db/migrations/032_ultra_compression.sql` — version marker
8. `tests/unit/compression/ultra.test.ts` — ≥25 passing tests

### Definition of Done
- [ ] `npm run typecheck:core` exits 0 — "Found 0 errors"
- [ ] `npm run lint` exits 0 — "0 problems"
- [ ] `node --import tsx/esm --test tests/unit/compression/ultra.test.ts` → `# fail 0`
- [ ] All existing compression tests still pass (no regressions)
- [ ] Golden test: ≥40% token savings on 200-word prose sample
- [ ] Force tokens (numbers, URLs, code syntax) always preserved in test assertions
- [ ] Ultra mode disabled by default (`enabled: false` in `DEFAULT_ULTRA_CONFIG`)
- [ ] SLM tier without `modelPath` falls back to `aggressive` and records `"ultra-slm-fallback"` in `techniquesUsed`
- [ ] `applyCompression` with `mode === "ultra"` no longer falls through to the default `return` no-op

### Must Have
- Tier A heuristic scorer with exactly 6 signals: frequency (stopwords), numeric, all-caps, long-word (>12 chars), variable-like (`$`/`_` prefix), punctuation weight
- Force-preserve list patterns: digit-containing tokens, `https?://` URLs, tokens inside code fences
- `compressionRate` config (0.0–1.0, default 0.5 = keep 50% of tokens by score)
- Fallback to `aggressive` when tier is `"slm"` and no `slm.modelPath` configured
- `UltraConfig.enabled` must gate the entire ultra path — if `false`, return body unchanged
- All 4 exports from `ultraHeuristic.ts`: `scoreToken`, `pruneByScore`, `STOPWORDS`, `FORCE_PRESERVE_RE`
- `src/lib/db/compression.ts` handles `"ultraConfig"` key so ultra settings persist to DB

### Must NOT Have (Guardrails)
- **No actual SLM/ONNX model loading** — `createSLMStub()` only; Tier B is interface + stub
- **No new npm dependencies** — zero new entries in `package.json`
- **No LLM API calls** inside any ultra module
- **No changes to Phase 1/2/3 source files** except the 3 additive touch points:
  `strategySelector.ts` (+1 if-branch), `index.ts` (+3 export lines), `src/lib/db/compression.ts` (+1 switch case)
- **`chatCore.ts` must NOT be modified** — it already passes ultra mode through correctly
- **No changes to existing migration files** — only create new 032
- `DEFAULT_ULTRA_CONFIG.enabled` must be `false` (never auto-enabled)
- Do not extract or store conversation content in DB — compression is stateless

---

## Verification Strategy

### Test Infrastructure
- **Framework**: Node.js native test runner (`node:test` / `node:assert/strict`)
- **Run command**: `node --import tsx/esm --test tests/unit/compression/ultra.test.ts`
- **Pattern**: `import { describe, it } from "node:test"` + `import assert from "node:assert/strict"` (matches all existing compression tests exactly)
- **Coverage gate**: `npm run test:coverage` must pass 60% statements/lines/functions/branches (PR requirement per CONTRIBUTING.md)

### QA Policy
Every task has agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/task-N-*.txt`.
Zero human intervention permitted — all assertions run via `Bash` tool.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — independent, run in parallel):
├── Task 1: types.ts — UltraConfig + DEFAULT_ULTRA_CONFIG                [quick]
└── Task 2: ultraHeuristic.ts — scorer + pruner engine                  [unspecified-high]
    (T2 depends on T1 for the UltraConfig import, but T1 is tiny;
     agent for T2 should wait for T1 confirmation before importing)

Wave 2 (After Wave 1 — all 4 run in parallel):
├── Task 3: ultra.ts — orchestrator (tier dispatch + SLM stub)           [unspecified-high]
├── Task 4: strategySelector.ts + index.ts + compression.ts wiring       [quick]
├── Task 5: ultra.test.ts — 25+ tests (4 suites)                        [unspecified-high]
└── Task 6: 032_ultra_compression.sql migration                          [quick]
    (T3 and T4 can be split: T4 can start once T3 API is known;
     T5 needs T1+T2+T3 to exist first)

Wave FINAL (After ALL tasks — run in parallel):
├── Task F1: typecheck + lint gate                                        [quick]
└── Task F2: full compression regression + ultra test suite              [unspecified-high]
```

**Dependency Matrix:**

| Task | Depends On | Blocks |
|------|-----------|--------|
| T1 | — | T2, T3, T4, T5 |
| T2 | T1 (UltraConfig type) | T3, T5 |
| T3 | T1, T2 | T4, T5 |
| T4 | T1, T2, T3 | F1, F2 |
| T5 | T1, T2, T3 | F2 |
| T6 | — | F1 |
| F1 | T1–T6 | — |
| F2 | T1–T6 | — |

**Agent Dispatch Summary:**
- Wave 1: 2 agents in parallel (`quick` for T1, `unspecified-high` for T2)
- Wave 2: up to 4 agents in parallel
- Final: 2 agents in parallel

---

## TODOs

---

## Final Verification Wave

- [ ] F1. **Typecheck + Lint Gate** — `quick`

  Run `npm run typecheck:core 2>&1` and `npm run lint 2>&1`. Both must produce zero errors.
  
  Check list:
  - All new `.ts` files have explicit return types on exported functions
  - `UltraConfig` is imported (not just referenced) in every file that uses it
  - No `as any` casts unless existing code already uses them
  - No unused imports

  Output: `Typecheck [PASS/FAIL: N errors] | Lint [PASS/FAIL: N problems] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Full Compression Regression + Ultra Test Suite** — `unspecified-high`

  Run:
  ```bash
  node --import tsx/esm --test tests/unit/compression/ultra.test.ts 2>&1
  node --import tsx/esm --test tests/unit/compression/aggressive.test.ts 2>&1
  node --import tsx/esm --test tests/unit/compression/summarizer.test.ts 2>&1
  node --import tsx/esm --test tests/unit/compression/caveman-engine.test.ts 2>&1
  node --import tsx/esm --test tests/unit/compression/types.test.ts 2>&1
  ```
  
  All must show `# fail 0`. Check that:
  - `ultra.test.ts` has ≥25 passing tests
  - All 4 suites (scoreToken, pruneByScore, ultraCompress, integration) present
  - Golden test ≥40% savings passes
  - No Phase 1/2/3 test regressions

  Output: `Ultra [N/N pass] | Regression [CLEAN/N failures] | Golden [PASS/FAIL: N%] | VERDICT`

---

## Commit Strategy

1. **T1+T2** (Wave 1 complete):
   - Message: `feat(compression): add UltraConfig type and heuristic scorer+pruner (Phase 4 Tier A)`
   - Files: `open-sse/services/compression/types.ts`, `open-sse/services/compression/ultraHeuristic.ts`
   - Pre-commit: `npm run typecheck:core`

2. **T3** (orchestrator):
   - Message: `feat(compression): add ultra orchestrator with tier dispatch and SLM stub (Phase 4)`
   - Files: `open-sse/services/compression/ultra.ts`
   - Pre-commit: `npm run typecheck:core`

3. **T4** (wiring):
   - Message: `feat(compression): wire ultra mode into applyCompression pipeline and DB settings`
   - Files: `open-sse/services/compression/strategySelector.ts`, `open-sse/services/compression/index.ts`, `src/lib/db/compression.ts`
   - Pre-commit: `npm run typecheck:core && npm run lint`

4. **T5+T6** (tests + migration):
   - Message: `feat(compression): add ultra test suite (25+ tests) and migration 032 (Phase 4)`
   - Files: `tests/unit/compression/ultra.test.ts`, `src/lib/db/migrations/032_ultra_compression.sql`
   - Pre-commit: `node --import tsx/esm --test tests/unit/compression/ultra.test.ts`

> **Push with `--no-verify`** is acceptable (21 pre-existing failures confirmed unrelated to our changes).

---

## Success Criteria

```bash
npm run typecheck:core
# Expected: Found 0 errors

npm run lint
# Expected: 0 problems

node --import tsx/esm --test tests/unit/compression/ultra.test.ts
# Expected: # fail 0
# Expected: ≥25 passing tests

node --import tsx/esm --test tests/unit/compression/types.test.ts
# Expected: # fail 0 (no regressions — "ultra" already in CompressionMode)

node --import tsx/esm --test tests/unit/compression/aggressive.test.ts
# Expected: # fail 0 (no regressions)
```

### Final Checklist
- [ ] `ultraHeuristic.ts` — 6 scoring signals, `pruneByScore`, `STOPWORDS`, `FORCE_PRESERVE_RE` exported
- [ ] `ultra.ts` — heuristic tier, SLM stub (`SLMInterface` + `createSLMStub`), aggressive fallback
- [ ] `strategySelector.ts` — `if (mode === "ultra")` branch calls `ultraCompress`, no more fall-through
- [ ] `index.ts` — `ultraCompress`, `createSLMStub`, `DEFAULT_ULTRA_CONFIG` re-exported
- [ ] `compression.ts` — `"ultraConfig"` case in `getCompressionSettings` switch
- [ ] `032_ultra_compression.sql` — version marker migration
- [ ] `ultra.test.ts` — ≥25 tests, 4 suites, golden 40% savings test
- [ ] `DEFAULT_ULTRA_CONFIG.enabled = false` (never auto-enabled)
- [ ] All "Must NOT Have" guardrails respected
