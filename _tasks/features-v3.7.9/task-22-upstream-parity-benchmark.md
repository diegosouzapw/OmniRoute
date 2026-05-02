# Task 22 - Add Upstream Parity Benchmark Suite

> **Priority**: P2
> **Effort**: 90 min
> **Dependencies**: Tasks 01-08, 11, 13, 21
> **Branch**: `release/v3.7.9`

---

## Problem

The current golden set is small and has weak assertions. We need a repeatable way to
compare OmniRoute behavior against the local Caveman reference and prevent drift.

---

## Solution

Create a benchmark suite that uses local upstream fixtures and checks:

- compression savings;
- preservation correctness;
- rule coverage;
- MCP description shrink parity;
- no regressions against previously accepted outputs.

Use local reference files only; do not require network.

Reference fixture sources:

- `_references/_outros/caveman/tests/caveman-compress/*.md`
- `_references/_outros/caveman/mcp-servers/caveman-shrink/compress.js`
- `_references/_outros/caveman/evals/prompts/en.txt`
- `_references/_outros/caveman/evals/snapshots/results.json` when useful

---

## Files

- New: `tests/golden-set/compression-upstream-parity.test.ts`
- New fixtures under `tests/golden-set/data/caveman-upstream/` if copying is preferred
- Optional benchmark script: `scripts/bench-caveman-parity.mjs`

---

## Test Categories

1. **Rule parity**
   - articles removed;
   - pleasantries removed;
   - hedging/filler removed;
   - leaders removed;
   - redundant phrasing shortened.

2. **Preservation parity**
   - code blocks exact;
   - inline code exact;
   - URLs exact;
   - paths exact;
   - headings exact;
   - frontmatter exact;
   - tables valid.

3. **MCP shrink parity**
   - description fields shrink;
   - code/URLs/identifiers in descriptions preserved;
   - tool-call response payloads are untouched.

4. **Savings threshold**
   - `standard/full` reaches target savings on verbose English prose;
   - `aggressive` reaches higher target on long sessions;
   - `ultra` is allowed to be more lossy only inside documented safe boundaries.

---

## Acceptance Criteria

- Suite runs without internet.
- Suite fails if a core Caveman rule is removed.
- Suite fails if protected content is corrupted.
- Thresholds are explicit and match what the feature claims.
- Results are documented in test output or a generated markdown report.

---

## Rollback

Remove benchmark suite only if it proves too slow for regular CI. Keep it available as
a manual `npm` script or targeted test.
