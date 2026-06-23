import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  extractPreservedBlocks,
  restorePreservedBlocks,
} from "../../../open-sse/services/compression/preservation.ts";

// Regression guard for #4795: a single unmatched `$` followed by a run of
// consecutive backslashes (e.g. Windows paths pasted into a prompt) triggered
// catastrophic backtracking in the `math_inline` built-in pattern, pinning one
// CPU core at 100% and freezing the event loop. The alternation
// `(?:\\.|[^$\n])` was ambiguous: a backslash could be consumed either by the
// escape branch `\\.` or by the catch-all `[^$\n]`, so a run of N backslashes
// could be tiled exponentially many ways before the trailing `$` anchor failed.
describe("preservation ReDoS guard (#4795)", () => {
  it("does not hang on a `$` followed by many consecutive backslashes (no closing `$`)", () => {
    // Without the fix this blows up exponentially (N=38 already exceeds 8s).
    const evil = "$x" + "\\".repeat(200) + "y";
    const start = Date.now();
    const { text } = extractPreservedBlocks(evil);
    const elapsed = Date.now() - start;
    assert.ok(
      elapsed < 1000,
      `extractPreservedBlocks must not backtrack catastrophically (took ${elapsed}ms)`
    );
    // The pathological input is not valid inline math, so it stays untouched.
    assert.equal(text, evil, "non-math text must be returned unchanged");
  });

  it("does not hang on Windows-path-style payloads with backslashes after a `$`", () => {
    const evil =
      "$C:\\Users\\Alpha\\Net\\DESKTOP\\" + "sub\\".repeat(120) + "no-closing-dollar";
    const start = Date.now();
    extractPreservedBlocks(evil);
    assert.ok(Date.now() - start < 1000, "Windows-path payload must resolve quickly");
  });

  it("still preserves legitimate inline math", () => {
    const text = "The identity $E=mc^2$ and $\\alpha + \\beta$ are classics.";
    const { text: extracted, blocks } = extractPreservedBlocks(text);
    const mathBlocks = blocks.filter((b) => b.kind === "math_inline");
    assert.equal(mathBlocks.length, 2, "both inline-math spans must be preserved");
    assert.ok(!extracted.includes("E=mc^2"), "math content must be replaced by a placeholder");
    assert.equal(
      restorePreservedBlocks(extracted, blocks),
      text,
      "round-trip must reproduce the original text"
    );
  });

  it("preserves inline math that contains an escaped dollar", () => {
    const text = "Price math: $a \\$ b$ end.";
    const { blocks } = extractPreservedBlocks(text);
    assert.ok(
      blocks.some((b) => b.kind === "math_inline" && b.content === "$a \\$ b$"),
      "inline math with an escaped dollar must still be captured via the `\\.` branch"
    );
  });
});
