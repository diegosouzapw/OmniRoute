# Task 04 — Fix Fenced Code Block Regex — Line-Based Parser

> **Priority**: P1 — Important
> **Effort**: 45 min
> **Dependencies**: None
> **Branch**: `release/v3.7.9`

---

## Problem

The current `preservation.ts` uses a single regex to extract fenced code blocks:

```typescript
// Current (preservation.ts:19)
result = result.replace(/```[a-z]*\n[\s\S]*?\n```/g, (match) => addBlock(match));
```

**This regex fails on:**

1. **Tilde fences (`~~~`)** — CommonMark supports both backtick and tilde fences.
   Messages from Claude, GPT, and other models sometimes use tilde fences. These are
   completely ignored by the current regex.

2. **Nested fences (4+ backtick outer fence)** — CommonMark allows nesting by using a
   longer fence. For example:
   ````markdown
   ````md
   ```python
   print("hello")
   ```
   ````
   ````
   The current regex would match the inner ```` ``` ```` pair, breaking the outer fence.

3. **Code blocks at end of string without trailing newline** — The regex requires `\n````,
   so a code block at the very end of a message without a final newline is missed.

4. **Code blocks with no language tag** — The regex `[a-z]*` requires alphanumeric language
   tags. A bare ```` ``` ```` with no language works, but ```` ```diff ```` or
   ```` ```c++ ```` with non-alpha characters fails.

5. **Fences with leading whitespace** — CommonMark allows up to 3 spaces before the fence.
   The current regex doesn't handle this.

The original Caveman's `validate.py::extract_code_blocks()` (lines 41–82) uses a
**line-based parser** that correctly handles all these cases:

```python
FENCE_OPEN_REGEX = re.compile(r"^(\s{0,3})(`{3,}|~{3,})(.*)$")
```

---

## Solution

Replace the single regex in `extractPreservedBlocks()` with a line-based parser that:
1. Handles both ```` ``` ```` and `~~~` fences
2. Handles variable-length fences (3+)
3. Requires the closing fence to use the same character and be at least as long
4. Requires the closing fence to have no content after it (per CommonMark)
5. Handles leading whitespace (0–3 spaces)
6. Correctly nests inner fences within outer fences

---

## Implementation

### File: `open-sse/services/compression/preservation.ts`

Replace the fenced code block extraction section (line 19) with a line-based parser:

```typescript
const FENCE_OPEN_RE = /^(\s{0,3})(`{3,}|~{3,})(.*)$/;

function extractFencedBlocks(text: string, addBlock: (content: string) => string): string {
  const lines = text.split("\n");
  const result: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const openMatch = FENCE_OPEN_RE.exec(lines[i]);
    if (!openMatch) {
      result.push(lines[i]);
      i++;
      continue;
    }

    const fenceChar = openMatch[2][0]; // '`' or '~'
    const fenceLen = openMatch[2].length; // 3, 4, 5, ...
    const blockLines: string[] = [lines[i]];
    i++;
    let closed = false;

    while (i < lines.length) {
      const closeMatch = FENCE_OPEN_RE.exec(lines[i]);
      if (
        closeMatch &&
        closeMatch[2][0] === fenceChar &&
        closeMatch[2].length >= fenceLen &&
        closeMatch[3].trim() === ""
      ) {
        // Valid closing fence
        blockLines.push(lines[i]);
        closed = true;
        i++;
        break;
      }
      blockLines.push(lines[i]);
      i++;
    }

    if (closed) {
      // Replace the entire block with a placeholder
      const blockContent = blockLines.join("\n");
      result.push(addBlock(blockContent));
    } else {
      // Unclosed fence — treat as regular text (don't preserve, don't break)
      // This matches Caveman's validate.py behavior: unclosed fences are skipped
      result.push(...blockLines);
    }
  }

  return result.join("\n");
}
```

Then update `extractPreservedBlocks()` to use the new function:

```typescript
export function extractPreservedBlocks(text: string): { text: string; blocks: PreservedBlock[] } {
  const blocks: PreservedBlock[] = [];
  let result = text;
  let counter = 0;

  const addBlock = (content: string): string => {
    const placeholder = `[PRESERVED_${counter}]`;
    blocks.push({ placeholder, content });
    counter++;
    return placeholder;
  };

  // 1. Extract fenced code blocks (```lang\n...\n``` AND ~~~lang\n...\n~~~)
  //    Uses line-based parser for CommonMark compliance
  result = extractFencedBlocks(result, addBlock);

  // 2. Extract inline code (`...`) — unchanged
  result = result.replace(/`[^`\n]+`/g, (match) => addBlock(match));

  // 3. Extract URLs — unchanged
  result = result.replace(/https?:\/\/[^\s)\]"'> ]+/g, (match) => addBlock(match));

  // 4. Extract file paths (Unix and Windows) — unchanged
  result = result.replace(/(?:\/[a-zA-Z0-9_./-]+|[a-zA-Z]:\\[a-zA-Z0-9_.\\/-]+)/g, (match) => {
    if (match.length < 3) return match;
    if (match.startsWith("[PRESERVED_")) return match;
    return addBlock(match);
  });

  // 5. Extract error-like patterns — unchanged
  result = result.replace(
    /\b(?:TypeError|ReferenceError|SyntaxError|RangeError|URIError|EvalError|Error):\s*[^\s,;)]+/g,
    (match) => addBlock(match)
  );

  return { text: result, blocks };
}
```

### File: `tests/unit/compression/caveman-preservation.test.ts`

Add test cases for the new parser:

```typescript
describe("fenced code block extraction", () => {
  it("should extract backtick fenced blocks", () => {
    const input = "Before\n```js\nconsole.log('hi');\n```\nAfter";
    const { text, blocks } = extractPreservedBlocks(input);
    assert.strictEqual(blocks.length, 1);
    assert.strictEqual(blocks[0].content, "```js\nconsole.log('hi');\n```");
    assert(!text.includes("console.log"));
  });

  it("should extract tilde fenced blocks", () => {
    const input = "Before\n~~~python\nprint('hi')\n~~~\nAfter";
    const { text, blocks } = extractPreservedBlocks(input);
    assert.strictEqual(blocks.length, 1);
    assert.strictEqual(blocks[0].content, "~~~python\nprint('hi')\n~~~");
  });

  it("should handle nested fences (4-backtick outer)", () => {
    const input = "Start\n````md\nSome text\n```python\ncode\n```\nMore text\n````\nEnd";
    const { text, blocks } = extractPreservedBlocks(input);
    assert.strictEqual(blocks.length, 1);
    assert(blocks[0].content.includes("```python"));
    assert(blocks[0].content.includes("code"));
  });

  it("should handle code block at end of string without trailing newline", () => {
    const input = "Text\n```\ncode\n```";
    const { text, blocks } = extractPreservedBlocks(input);
    assert.strictEqual(blocks.length, 1);
  });

  it("should handle multiple code blocks", () => {
    const input = "A\n```\nblock1\n```\nB\n~~~\nblock2\n~~~\nC";
    const { text, blocks } = extractPreservedBlocks(input);
    assert.strictEqual(blocks.length, 2);
  });

  it("should skip unclosed fences", () => {
    const input = "Text\n```js\nunclosed code block";
    const { text, blocks } = extractPreservedBlocks(input);
    // Unclosed fences should NOT be extracted as preserved blocks
    assert.strictEqual(blocks.length, 0);
    assert(text.includes("unclosed code block"));
  });

  it("should handle leading whitespace in fence (up to 3 spaces)", () => {
    const input = "Text\n   ```python\n   code\n   ```\nMore";
    const { text, blocks } = extractPreservedBlocks(input);
    assert.strictEqual(blocks.length, 1);
  });

  it("should NOT match 4+ spaces before fence (indented code block)", () => {
    const input = "Text\n    ```python\n    code\n    ```\nMore";
    const { text, blocks } = extractPreservedBlocks(input);
    // 4 spaces = indented code block, NOT a fenced block
    assert.strictEqual(blocks.length, 0);
  });
});
```

---

## Verification

```bash
node --import tsx/esm --test tests/unit/compression/caveman-preservation.test.ts
node --import tsx/esm --test tests/unit/compression/caveman-engine.test.ts
node --import tsx/esm --test tests/golden-set/compression-quality.test.ts
```

Expected outcome:
- All existing preservation tests pass
- New fence parser tests pass
- Golden-set quality tests pass (code blocks still preserved correctly)

---

## Commit

```
fix(compression): replace code block regex with line-based parser

The single regex ```` /```[a-z]*\n[\s\S]*?\n```/g ```` failed on tilde
fences, nested fences, EOF blocks, and non-alpha language tags. Replace
with a CommonMark-compliant line-based parser that handles variable-
length fences, nesting, and unclosed fence recovery.

Ref: Caveman validate.py L41-82 (FENCE_OPEN_REGEX)
```

---

## Rollback

Revert `preservation.ts` to use the original regex. The `extractFencedBlocks` function
and its test cases can be removed entirely.
