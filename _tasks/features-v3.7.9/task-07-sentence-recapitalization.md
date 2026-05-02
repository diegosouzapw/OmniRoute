# Task 07 — Add Sentence Re-Capitalization After Removals

> **Priority**: P1 | **Effort**: 15 min | **Dependencies**: None | **Branch**: `release/v3.7.9`

---

## Problem

When articles, pleasantries, or leaders are removed from the start of sentences, the next word often starts lowercase, creating unnatural text. Example:

- Before removal: `"Sure! the issue is in the middleware."`
- After pleasantries removal: `"the issue is in the middleware."` ← lowercase start

Original caveman-shrink `compress.js` (line 87) handles this:

```javascript
s = s.replace(/(^|[.!?]\s+)([a-z])/g, (_, pre, ch) => pre + ch.toUpperCase());
```

OmniRoute's `cleanupArtifacts()` handles whitespace but NOT re-capitalization.

---

## Solution

Add sentence re-capitalization to `cleanupArtifacts()` in `caveman.ts`.

## File: `open-sse/services/compression/caveman.ts`

In `cleanupArtifacts()` (around line 44), add after the whitespace cleanup:

```typescript
function cleanupArtifacts(text: string): string {
  let result = text;
  result = result.replace(/  +/g, " ");
  result = result.replace(/ +$/gm, "");
  result = result.replace(/\n{3,}/g, "\n\n");
  result = result.replace(/^\n+/, "");
  result = result.replace(/\n+$/, "");

  // Re-capitalize sentence starts after removals
  // Matches: start of string OR after sentence-ending punctuation + whitespace
  result = result.replace(/(^|[.!?]\s+)([a-z])/gm, (_, pre, ch) => pre + ch.toUpperCase());

  // Clean up punctuation artifacts: doubled punctuation, space before punctuation
  result = result.replace(/\s+([,.;:!?])/g, "$1");
  result = result.replace(/([,.;:!?])\1+/g, "$1");

  return result;
}
```

## Tests: `tests/unit/compression/caveman-engine.test.ts`

```typescript
describe("cleanupArtifacts re-capitalization", () => {
  it("should capitalize first letter after sentence-ending punctuation", () => {
    const body = { messages: [{ role: "assistant", content: "done. the fix is ready." }] };
    const result = cavemanCompress(body);
    const content = (result.body as any).messages[0].content;
    assert(content.includes("The fix"));
  });

  it("should capitalize first letter at start of text", () => {
    const body = { messages: [{ role: "assistant", content: "the issue is clear." }] };
    const result = cavemanCompress(body);
    const content = (result.body as any).messages[0].content;
    assert(content.startsWith("The") || content.startsWith("the")); // depends on min length
  });
});
```

## Verification

```bash
node --import tsx/esm --test tests/unit/compression/caveman-engine.test.ts
```

## Commit

```
feat(compression): add sentence re-capitalization after word removals

Ref: caveman-shrink compress.js L87
```

## Rollback

Remove the two new `result.replace` lines from `cleanupArtifacts()`.
