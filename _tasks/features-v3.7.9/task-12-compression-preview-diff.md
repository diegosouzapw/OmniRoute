# Task 12 — Add Compression Preview Diff Endpoint

> **Priority**: P2 | **Effort**: 45 min | **Dependencies**: Tasks 01–03 | **Branch**: `release/v3.7.9`

---

## Problem

OmniRoute has `/api/compression/preview` but it currently only returns the compressed body and stats. There's no way for users to see a **diff** of what changed — which words were removed, which phrases were shortened, and which blocks were preserved. This makes it hard to tune compression settings or verify that critical content survived.

---

## Solution

Enhance the preview endpoint to return a side-by-side comparison with change annotations.

## File: `src/app/api/compression/preview/route.ts`

Enhance the response to include a `diff` field that shows changes:

```typescript
interface PreviewResponse {
  original: {
    text: string;
    tokens: number;
  };
  compressed: {
    text: string;
    tokens: number;
  };
  diff: {
    removals: Array<{ text: string; rule: string; position: number }>;
    preserved: Array<{ text: string; type: string }>;
  };
  stats: {
    savingsPercent: number;
    rulesApplied: string[];
    mode: string;
    durationMs: number;
  };
}
```

## Implementation Strategy

1. Run compression normally via `applyCompression()`
2. Extract the preserved blocks and their types from `extractPreservedBlocks()`
3. Diff the original text (after extraction) against the compressed text to find removals
4. Annotate each removal with the rule that caused it (track in `applyRulesToText`)
5. Return structured response

## File: New helper `open-sse/services/compression/diffHelper.ts`

```typescript
export interface CompressionDiff {
  removals: Array<{ text: string; rule: string; position: number }>;
  preserved: Array<{ text: string; type: string }>;
}

export function generateCompressionDiff(
  original: string,
  compressed: string,
  preservedBlocks: Array<{ content: string; placeholder: string }>,
  appliedRules: Array<{ name: string; before: string; after: string }>
): CompressionDiff {
  const preserved = preservedBlocks.map((b) => ({
    text: b.content.slice(0, 100),
    type: b.content.startsWith("```") ? "code_block" :
          b.content.startsWith("`") ? "inline_code" :
          b.content.startsWith("http") ? "url" :
          "other",
  }));

  const removals: CompressionDiff["removals"] = [];
  for (const rule of appliedRules) {
    // Find what was removed by diffing before/after for each rule
    if (rule.before !== rule.after) {
      const removed = findRemovedText(rule.before, rule.after);
      for (const r of removed) {
        removals.push({ text: r.text, rule: rule.name, position: r.position });
      }
    }
  }

  return { removals: removals.slice(0, 50), preserved };
}

function findRemovedText(before: string, after: string): Array<{ text: string; position: number }> {
  // Simple word-level diff
  const bWords = before.split(/\s+/);
  const aWords = after.split(/\s+/);
  const aSet = new Set(aWords);
  const removed: Array<{ text: string; position: number }> = [];

  let pos = 0;
  for (const word of bWords) {
    if (!aSet.has(word) && word.trim().length > 0) {
      removed.push({ text: word, position: pos });
    }
    pos += word.length + 1;
  }
  return removed;
}
```

## Tests: `tests/unit/api/compression/compression-preview-diff.test.ts`

```typescript
import { describe, it } from "node:test";
import assert from "node:assert";
import { generateCompressionDiff } from "../../../../open-sse/services/compression/diffHelper.ts";

describe("generateCompressionDiff", () => {
  it("should identify removed text and preserved blocks", () => {
    const diff = generateCompressionDiff(
      "Please check the configuration file at https://example.com",
      "Check configuration file at https://example.com",
      [{ content: "https://example.com", placeholder: "__OMNI_abc__0__OMNI_abc__" }],
      [{ name: "polite_framing", before: "Please check", after: "check" }]
    );
    assert(diff.removals.length > 0);
    assert(diff.preserved.length === 1);
    assert.strictEqual(diff.preserved[0].type, "url");
  });
});
```

## Verification

```bash
node --import tsx/esm --test tests/unit/api/compression/compression-preview-diff.test.ts
```

## Commit

```
feat(compression): add diff annotations to compression preview endpoint

Returns structured removal/preservation info showing which words were
removed by which rules, and which blocks were preserved (code, URLs,
identifiers). Enables visual debugging of compression behavior.
```

## Rollback

Remove `diffHelper.ts` and revert the preview route changes.

## 2026-05-02 Expansion Addendum

The preview response must now include more than removals:

- `preserved`: protected blocks with type (`code_block`, `inline_code`, `url`, `path`,
  `identifier`, `version`, `frontmatter`, `table`, `math`, `other`).
- `validation`: `valid`, `errors`, `warnings`, `fallbackApplied`.
- `rulesApplied`: ordered rule names.
- `mode`, `intensity`, and output-mode fields when configured.
- `skippedReasons`: e.g. multimodal safety skip, system prompt preserved, custom preserve pattern.

The UI/API should make it clear when compressed output is actually the original because
validation fell back.
