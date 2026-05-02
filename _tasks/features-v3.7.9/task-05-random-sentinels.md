# Task 05 — Use Random Sentinels for Preserved Block Placeholders

> **Priority**: P1 | **Effort**: 20 min | **Dependencies**: None | **Branch**: `release/v3.7.9`

---

## Problem

Current `preservation.ts` uses predictable `[PRESERVED_0]`, `[PRESERVED_1]` placeholders. If a user message literally contains `[PRESERVED_0]` (e.g., discussing this system), `restorePreservedBlocks()` incorrectly replaces it. Original caveman-shrink uses null-byte sentinels (`\0N\0`).

## Solution

Replace `[PRESERVED_N]` with UUID-based sentinels: `__OMNI_<8-hex>__N__OMNI_<8-hex>__`. Use `crypto.randomUUID().slice(0,8)` per call (4.3B unique values). Switch restoration to `indexOf+slice` instead of `String.replace`.

## File: `open-sse/services/compression/preservation.ts`

```typescript
import { randomUUID } from "node:crypto";

function generateSentinelPrefix(): string {
  return `__OMNI_${randomUUID().slice(0, 8)}__`;
}

export function extractPreservedBlocks(text: string): { text: string; blocks: PreservedBlock[] } {
  const blocks: PreservedBlock[] = [];
  let result = text;
  let counter = 0;
  const prefix = generateSentinelPrefix();

  const addBlock = (content: string): string => {
    const placeholder = `${prefix}${counter}${prefix}`;
    blocks.push({ placeholder, content });
    counter++;
    return placeholder;
  };
  // ... rest of extraction unchanged ...
  return { text: result, blocks };
}

export function restorePreservedBlocks(text: string, blocks: PreservedBlock[]): string {
  let result = text;
  for (let i = blocks.length - 1; i >= 0; i--) {
    const block = blocks[i];
    const idx = result.indexOf(block.placeholder);
    if (idx !== -1) {
      result = result.slice(0, idx) + block.content + result.slice(idx + block.placeholder.length);
    }
  }
  return result;
}
```

## Tests: `tests/unit/compression/caveman-preservation.test.ts`

```typescript
describe("random sentinel placeholders", () => {
  it("should use random placeholders, not [PRESERVED_N]", () => {
    const { text } = extractPreservedBlocks("Use `const x = 1`");
    assert(!text.includes("[PRESERVED_"));
    assert(text.includes("__OMNI_"));
  });

  it("should not collide with literal [PRESERVED_0] in user text", () => {
    const input = "System uses [PRESERVED_0] as placeholder for `code`.";
    const { text, blocks } = extractPreservedBlocks(input);
    assert(text.includes("[PRESERVED_0]"));
    assert.strictEqual(blocks.length, 1);
  });

  it("should round-trip correctly", () => {
    const input = "Check `the` config and https://example.com";
    const { text, blocks } = extractPreservedBlocks(input);
    assert.strictEqual(restorePreservedBlocks(text, blocks), input);
  });

  it("should generate unique prefixes across calls", () => {
    const { text: t1 } = extractPreservedBlocks("Use `a`");
    const { text: t2 } = extractPreservedBlocks("Use `b`");
    const m1 = t1.match(/__OMNI_([a-f0-9]+)__/);
    const m2 = t2.match(/__OMNI_([a-f0-9]+)__/);
    assert.notStrictEqual(m1![1], m2![1]);
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
fix(compression): use random UUID sentinels for preserved block placeholders

Ref: caveman-shrink compress.js L68
```

## Rollback

Revert `preservation.ts` to `[PRESERVED_N]` format.
