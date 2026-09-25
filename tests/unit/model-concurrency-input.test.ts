// Wire-format round trip for the dashboard per-model concurrency editor
// (one `model=cap` entry per line). Pure helpers in
// src/lib/providers/modelConcurrency.ts.
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { formatModelConcurrencyInput, parseModelConcurrencyInput } =
  await import("../../src/lib/providers/modelConcurrency.ts");

describe("formatModelConcurrencyInput", () => {
  it("serializes null/empty maps to blank", () => {
    assert.equal(formatModelConcurrencyInput(null), "");
    assert.equal(formatModelConcurrencyInput(undefined), "");
    assert.equal(formatModelConcurrencyInput({}), "");
  });

  it("serializes entries sorted for stable round-trips", () => {
    assert.equal(formatModelConcurrencyInput({ "glm-4.7": 3, "glm-5": 1 }), "glm-4.7=3\nglm-5=1");
  });
});

describe("parseModelConcurrencyInput", () => {
  it("parses blank text to no model caps", () => {
    assert.deepEqual(parseModelConcurrencyInput(""), { map: null, error: null });
    assert.deepEqual(parseModelConcurrencyInput("  \n  "), { map: null, error: null });
  });

  it("parses one entry per line and accepts comma separators", () => {
    assert.deepEqual(parseModelConcurrencyInput("glm-5=1\nglm-4.7=3"), {
      map: { "glm-5": 1, "glm-4.7": 3 },
      error: null,
    });
    assert.deepEqual(parseModelConcurrencyInput("glm-5=1, glm-4.7=3"), {
      map: { "glm-5": 1, "glm-4.7": 3 },
      error: null,
    });
  });

  it("refuses malformed entries instead of silently dropping them", () => {
    for (const bad of ["glm-5=0", "glm-5=-1", "glm-5=1.5", "glm-5=", "=1", "no-equals"]) {
      const parsed = parseModelConcurrencyInput(bad);
      assert.equal(parsed.map, null, `"${bad}" must not produce a map`);
      assert.ok(parsed.error, `"${bad}" must produce an error`);
    }
  });

  it("round-trips the stored map through the editor", () => {
    const stored = { "glm-5": 1, "glm-4.7": 3 };
    assert.deepEqual(parseModelConcurrencyInput(formatModelConcurrencyInput(stored)), {
      map: stored,
      error: null,
    });
  });
});
