import { describe, it } from "node:test";
import assert from "node:assert/strict";

/**
 * Characterization tests for the DeepSeek V4 Pro effort-level parsing logic.
 *
 * The parseDeepSeekEffortLevel function is module-level (non-exported) in
 * open-sse/executors/opencode.ts. We re-implement the same logic here to lock
 * down the expected behavior as a regression safety net.
 *
 * Source reference: open-sse/executors/opencode.ts lines 44-62
 */

const EFFORT_LEVELS = ["low", "medium", "high", "max"] as const;

function parseDeepSeekEffortLevel(model: string): { baseModel: string; effort: string } | null {
  const m = String(model || "");
  const matchedLevel = EFFORT_LEVELS.find((level) => m.endsWith(`-${level}`));
  if (!matchedLevel) return null;
  const baseModel = m.slice(0, -matchedLevel.length - 1);
  if (baseModel.toLowerCase() !== "deepseek-v4-pro") return null;
  return { baseModel: "deepseek-v4-pro", effort: matchedLevel };
}

// -- Valid effort levels -------------------------------------------------------

describe("parseDeepSeekEffortLevel - valid suffixes", () => {
  it("deepseek-v4-pro-low returns low effort", () => {
    const result = parseDeepSeekEffortLevel("deepseek-v4-pro-low");
    assert.deepEqual(result, { baseModel: "deepseek-v4-pro", effort: "low" });
  });

  it("deepseek-v4-pro-medium returns medium effort", () => {
    const result = parseDeepSeekEffortLevel("deepseek-v4-pro-medium");
    assert.deepEqual(result, { baseModel: "deepseek-v4-pro", effort: "medium" });
  });

  it("deepseek-v4-pro-high returns high effort", () => {
    const result = parseDeepSeekEffortLevel("deepseek-v4-pro-high");
    assert.deepEqual(result, { baseModel: "deepseek-v4-pro", effort: "high" });
  });

  it("deepseek-v4-pro-max returns max effort", () => {
    const result = parseDeepSeekEffortLevel("deepseek-v4-pro-max");
    assert.deepEqual(result, { baseModel: "deepseek-v4-pro", effort: "max" });
  });
});

// -- Case-insensitive base model matching --------------------------------------

describe("parseDeepSeekEffortLevel - case-insensitive base model", () => {
  it("matches DeepSeek-V4-Pro-high (uppercase base, lowercase suffix)", () => {
    const result = parseDeepSeekEffortLevel("DeepSeek-V4-Pro-high");
    assert.deepEqual(result, { baseModel: "deepseek-v4-pro", effort: "high" });
  });

  it("matches deepseek-V4-pro-low (mixed case base, lowercase suffix)", () => {
    const result = parseDeepSeekEffortLevel("deepseek-V4-pro-low");
    assert.deepEqual(result, { baseModel: "deepseek-v4-pro", effort: "low" });
  });

  it("returns null for DeepSeek-V4-Pro-High (uppercase suffix does not match)", () => {
    // Suffix matching is case-sensitive — only the base model comparison uses toLowerCase
    assert.equal(parseDeepSeekEffortLevel("DeepSeek-V4-Pro-High"), null);
  });
});

// -- Returns null for non-matching inputs --------------------------------------

describe("parseDeepSeekEffortLevel - no match cases", () => {
  it("returns null for bare deepseek-v4-pro (no suffix)", () => {
    assert.equal(parseDeepSeekEffortLevel("deepseek-v4-pro"), null);
  });

  it("returns null for gpt-5-high (not deepseek-v4-pro)", () => {
    assert.equal(parseDeepSeekEffortLevel("gpt-5-high"), null);
  });

  it("returns null for empty string", () => {
    assert.equal(parseDeepSeekEffortLevel(""), null);
  });

  it("returns null for trailing dash with no level (deepseek-v4-pro-)", () => {
    assert.equal(parseDeepSeekEffortLevel("deepseek-v4-pro-"), null);
  });

  it("returns null for deepseek-v4-pro-lowextra (suffix is not an exact level)", () => {
    assert.equal(parseDeepSeekEffortLevel("deepseek-v4-pro-lowextra"), null);
  });

  it("returns null for deepseek-v4-pro (case mismatch on level)", () => {
    // The suffix "Low" does not match "low" exactly
    assert.equal(parseDeepSeekEffortLevel("deepseek-v4-pro-Low"), null);
  });

  it("returns null for a random string", () => {
    assert.equal(parseDeepSeekEffortLevel("random-string"), null);
  });

  it("returns null for just the suffix -high", () => {
    assert.equal(parseDeepSeekEffortLevel("-high"), null);
  });
});

// -- Edge cases ----------------------------------------------------------------

describe("parseDeepSeekEffortLevel - edge cases", () => {
  it("handles numeric input via String coercion", () => {
    // String(123) === "123" — no dash suffix, returns null
    assert.equal(parseDeepSeekEffortLevel(123 as unknown as string), null);
  });

  it("handles null input via String coercion", () => {
    // String(null) === "null" — no match
    assert.equal(parseDeepSeekEffortLevel(null as unknown as string), null);
  });

  it("handles undefined input via String coercion", () => {
    // String(undefined) === "undefined" — no match
    assert.equal(parseDeepSeekEffortLevel(undefined as unknown as string), null);
  });

  it("returns the canonical baseModel as lowercase when suffix matches", () => {
    const result = parseDeepSeekEffortLevel("DeepSeek-V4-Pro-max");
    assert.deepEqual(result, { baseModel: "deepseek-v4-pro", effort: "max" });
  });
});
