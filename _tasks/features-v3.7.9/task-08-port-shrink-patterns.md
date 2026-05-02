# Task 08 — Port caveman-shrink Protected Patterns to Preservation Layer

> **Priority**: P1 | **Effort**: 30 min | **Dependencies**: Task 04 | **Branch**: `release/v3.7.9`

---

## Problem

The original `caveman-shrink/compress.js` (lines 47–56) defines 8 protected patterns that are NEVER touched by compression:

```javascript
const PROTECTED_PATTERNS = [
  /```[\s\S]*?```/g,                          // fenced code
  /`[^`\n]+`/g,                               // inline code
  /\bhttps?:\/\/\S+/gi,                       // URLs
  /\b[\w.-]*[\/\\][\w.\/\\-]+/g,              // paths with / or \
  /\b[A-Z][A-Za-z0-9]*(?:_[A-Z][A-Za-z0-9]*)+\b/g, // CONST_CASE
  /\b\w+\.\w+(?:\.\w+)*\(\)?/g,              // dotted.method or pkg.fn()
  /[A-Za-z_][A-Za-z0-9_]*\s*\([^)]*\)/g,     // function calls
  /\b\d+\.\d+\.\d+\b/g,                      // version numbers
];
```

**OmniRoute's `preservation.ts` currently covers:**
1. ✅ Fenced code blocks (Task 04 improves this)
2. ✅ Inline code
3. ✅ URLs
4. ✅ File paths
5. ❌ **CONST_CASE identifiers** — missing
6. ❌ **Dotted method calls** (e.g., `process.env`, `Array.from()`) — missing
7. ❌ **Function calls** (e.g., `useMemo()`, `handleClick(event)`) — missing
8. ❌ **Version numbers** (e.g., `3.7.9`, `16.0.0`) — missing

---

## Solution

Add the 4 missing protected patterns to `extractPreservedBlocks()`.

## File: `open-sse/services/compression/preservation.ts`

Add after the existing error pattern extraction (around line 38):

```typescript
// 6. Extract CONST_CASE identifiers (e.g., MAX_RETRIES, DEFAULT_TIMEOUT)
result = result.replace(
  /\b[A-Z][A-Za-z0-9]*(?:_[A-Z][A-Za-z0-9]*)+\b/g,
  (match) => addBlock(match)
);

// 7. Extract dotted method/property chains (e.g., process.env, Array.from())
result = result.replace(
  /\b\w+\.\w+(?:\.\w+)*\(\)?/g,
  (match) => {
    // Skip already-preserved blocks and very short matches
    if (match.startsWith(prefix)) return match;
    if (match.length < 4) return match;
    return addBlock(match);
  }
);

// 8. Extract version numbers (e.g., 3.7.9, 16.0.0)
result = result.replace(
  /\b\d+\.\d+\.\d+\b/g,
  (match) => addBlock(match)
);
```

**Note:** Function calls with arguments (`useMemo(callback)`) are intentionally NOT extracted — they could match too aggressively on normal prose that contains parentheses. The dotted method pattern already covers `fn()` and `pkg.method()`.

## Tests: `tests/unit/compression/caveman-preservation.test.ts`

```typescript
describe("extended protected patterns", () => {
  it("should preserve CONST_CASE identifiers", () => {
    const input = "Set MAX_RETRIES to 3 and DEFAULT_TIMEOUT to 5000";
    const { text, blocks } = extractPreservedBlocks(input);
    const restored = restorePreservedBlocks(text, blocks);
    assert.strictEqual(restored, input);
    assert(blocks.some((b) => b.content === "MAX_RETRIES"));
    assert(blocks.some((b) => b.content === "DEFAULT_TIMEOUT"));
  });

  it("should preserve dotted method calls", () => {
    const input = "Use process.env to read the config and Array.from() to convert";
    const { text, blocks } = extractPreservedBlocks(input);
    const restored = restorePreservedBlocks(text, blocks);
    assert.strictEqual(restored, input);
    assert(blocks.some((b) => b.content === "process.env"));
    assert(blocks.some((b) => b.content === "Array.from()"));
  });

  it("should preserve version numbers", () => {
    const input = "Upgrade from 3.7.8 to 3.7.9 and Node 16.0.0";
    const { text, blocks } = extractPreservedBlocks(input);
    const restored = restorePreservedBlocks(text, blocks);
    assert.strictEqual(restored, input);
    assert(blocks.some((b) => b.content === "3.7.8"));
    assert(blocks.some((b) => b.content === "3.7.9"));
  });
});
```

## Verification

```bash
node --import tsx/esm --test tests/unit/compression/caveman-preservation.test.ts
node --import tsx/esm --test tests/unit/compression/caveman-engine.test.ts
```

## Commit

```
feat(compression): port caveman-shrink protected patterns

Add CONST_CASE identifiers, dotted method chains, and version numbers
to the preserved block extraction pipeline. These patterns are never
touched by compression rules, matching caveman-shrink's boundaries.

Ref: caveman-shrink compress.js L47-56
```

## Rollback

Remove the 3 new `result.replace` blocks from `extractPreservedBlocks()`.

## 2026-05-02 Expansion Addendum

Keep this task focused on parity with `mcp-servers/caveman-shrink/compress.js` protected
patterns:

- `CONST_CASE`
- dotted property/method chains
- version numbers
- safe identifier/function-call forms when they do not overmatch prose

Do not overload this task with document-structure preservation. Typst, LaTeX, math,
frontmatter, headings, and tables are covered by Task 21 so Task 08 can stay small and
reviewable.
