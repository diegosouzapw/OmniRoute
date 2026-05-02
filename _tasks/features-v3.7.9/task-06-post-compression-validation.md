# Task 06 — Add Post-Compression Validation Layer

> **Priority**: P1 | **Effort**: 60 min | **Dependencies**: Task 04, Task 05 | **Branch**: `release/v3.7.9`

---

## Problem

Original Caveman `validate.py` runs **6 validation checks** after every compression:
1. Heading count preservation
2. Code block byte-exact preservation
3. URL set equality
4. File path set equality
5. Bullet count sanity (±15%)
6. Inline code preservation

OmniRoute has **zero post-compression validation**. While our regex-based approach is safer than LLM-based compression, `preservation.ts` can still fail silently on edge cases (nested fences, sentinel collisions, regex catastrophic backtracking).

---

## Solution

Create a new `validation.ts` module that runs lightweight checks after compression to verify that critical content was preserved. Unlike Caveman's file-based validation, ours operates on in-memory strings and is designed for sub-millisecond execution (no I/O, no API calls).

---

## File: New `open-sse/services/compression/validation.ts`

```typescript
/**
 * Post-compression validation — Phase 2
 *
 * Lightweight checks that verify critical content survived compression.
 * Runs after caveman rules are applied and blocks are restored.
 * If validation fails, the original (uncompressed) text is returned.
 */

const URL_RE = /https?:\/\/[^\s)\]"'> ]+/g;
const FENCE_OPEN_RE = /^(\s{0,3})(`{3,}|~{3,})/m;
const INLINE_CODE_RE = /`[^`\n]+`/g;

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

function extractUrls(text: string): Set<string> {
  return new Set(text.match(URL_RE) || []);
}

function countFencedBlocks(text: string): number {
  const lines = text.split("\n");
  let count = 0;
  let inFence = false;
  let fenceChar = "";
  let fenceLen = 0;

  for (const line of lines) {
    const m = FENCE_OPEN_RE.exec(line);
    if (m) {
      if (!inFence) {
        inFence = true;
        fenceChar = m[2][0];
        fenceLen = m[2].length;
      } else if (m[2][0] === fenceChar && m[2].length >= fenceLen && line.trim() === m[2]) {
        inFence = false;
        count++;
      }
    }
  }
  return count;
}

function extractInlineCodes(text: string): string[] {
  // Remove fenced blocks first to avoid matching backticks inside them
  const noFences = text.replace(/```[\s\S]*?```/g, "").replace(/~~~[\s\S]*?~~~/g, "");
  return noFences.match(INLINE_CODE_RE) || [];
}

export function validateCompression(original: string, compressed: string): ValidationResult {
  const result: ValidationResult = { valid: true, errors: [], warnings: [] };

  // 1. URL preservation check
  const origUrls = extractUrls(original);
  const compUrls = extractUrls(compressed);
  const lostUrls = [...origUrls].filter((u) => !compUrls.has(u));
  if (lostUrls.length > 0) {
    result.valid = false;
    result.errors.push(`Lost URLs: ${lostUrls.join(", ")}`);
  }

  // 2. Fenced code block count check
  const origFences = countFencedBlocks(original);
  const compFences = countFencedBlocks(compressed);
  if (origFences !== compFences) {
    result.valid = false;
    result.errors.push(`Code block count mismatch: ${origFences} → ${compFences}`);
  }

  // 3. Inline code preservation check
  const origCodes = extractInlineCodes(original);
  const compCodes = extractInlineCodes(compressed);
  const origSet = new Set(origCodes);
  const compSet = new Set(compCodes);
  const lostCodes = [...origSet].filter((c) => !compSet.has(c));
  if (lostCodes.length > 0) {
    result.valid = false;
    result.errors.push(`Lost inline code: ${lostCodes.slice(0, 5).join(", ")}`);
  }

  // 4. Compression sanity — compressed should be shorter or equal
  if (compressed.length > original.length * 1.1) {
    result.warnings.push(`Compressed text is ${Math.round((compressed.length / original.length - 1) * 100)}% longer than original`);
  }

  // 5. Empty output guard
  if (original.trim().length > 0 && compressed.trim().length === 0) {
    result.valid = false;
    result.errors.push("Compression produced empty output from non-empty input");
  }

  return result;
}
```

## Integration: `open-sse/services/compression/caveman.ts`

In `cavemanCompress()`, after `cleanupArtifacts()` and before returning, add validation:

```typescript
import { validateCompression } from "./validation.ts";

// Inside cavemanCompress(), after line 122 (const cleaned = cleanupArtifacts(restored)):
const validation = validateCompression(contentStr, cleaned);
if (!validation.valid) {
  // Validation failed — fall back to original text
  totalCompressedTokens += estimateCompressionTokens(contentStr);
  return { ...msg, content: contentStr };
}
```

## Export: `open-sse/services/compression/index.ts`

```typescript
export { validateCompression } from "./validation.ts";
export type { ValidationResult } from "./validation.ts";
```

## Tests: `tests/unit/compression/validation.test.ts`

```typescript
import { describe, it } from "node:test";
import assert from "node:assert";
import { validateCompression } from "../../../open-sse/services/compression/validation.ts";

describe("validateCompression", () => {
  it("should pass when URLs are preserved", () => {
    const orig = "Visit https://example.com for details";
    const comp = "Visit https://example.com for details";
    const result = validateCompression(orig, comp);
    assert(result.valid);
  });

  it("should fail when URLs are lost", () => {
    const orig = "Visit https://example.com for details";
    const comp = "Visit for details";
    const result = validateCompression(orig, comp);
    assert(!result.valid);
    assert(result.errors[0].includes("Lost URLs"));
  });

  it("should fail when inline code is lost", () => {
    const orig = "Use `useMemo` for optimization";
    const comp = "Use for optimization";
    const result = validateCompression(orig, comp);
    assert(!result.valid);
    assert(result.errors[0].includes("Lost inline code"));
  });

  it("should fail when compression produces empty output", () => {
    const result = validateCompression("Some meaningful text", "");
    assert(!result.valid);
    assert(result.errors[0].includes("empty output"));
  });

  it("should pass for normal compression", () => {
    const orig = "I would like to explain the configuration process in detail";
    const comp = "Explain config process";
    const result = validateCompression(orig, comp);
    assert(result.valid);
  });

  it("should warn if compressed is longer than original", () => {
    const orig = "short";
    const comp = "this is much much much much longer than the original text";
    const result = validateCompression(orig, comp);
    assert(result.warnings.length > 0);
  });
});
```

## Verification

```bash
node --import tsx/esm --test tests/unit/compression/validation.test.ts
node --import tsx/esm --test tests/unit/compression/caveman-engine.test.ts
```

## Commit

```
feat(compression): add post-compression validation layer

Validates URL preservation, code block count, inline code integrity,
and empty output guard after compression. Falls back to original text
if validation fails.

Ref: Caveman validate.py (6-point validation suite)
```

## Rollback

Remove `validation.ts`, remove the import and validation call from `caveman.ts`, remove the export from `index.ts`.

## 2026-05-02 Expansion Addendum

This task is now a prerequisite for the broader v3.7.9 plan. Add these requirements:

- Hard validation failures must return the original uncompressed text, not best-effort compressed text.
- Validation result should include `errors`, `warnings`, and a `fallbackApplied` signal.
- `cavemanCompress()` stats should expose validation fallback/warning metadata when available.
- `/api/compression/preview` should surface validation warnings after Task 12.
- Analytics should be able to count validation fallbacks after Task 20.
- Validation should reuse the same line-based fence parser introduced by Task 04.
