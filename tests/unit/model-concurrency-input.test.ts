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
    assert.deepEqual(parseModelConcurrencyInput(""), { map: null, invalidEntry: null });
    assert.deepEqual(parseModelConcurrencyInput("  \n  "), { map: null, invalidEntry: null });
  });

  it("parses one entry per line and accepts comma separators", () => {
    assert.deepEqual(parseModelConcurrencyInput("glm-5=1\nglm-4.7=3"), {
      map: { "glm-5": 1, "glm-4.7": 3 },
      invalidEntry: null,
    });
    assert.deepEqual(parseModelConcurrencyInput("glm-5=1, glm-4.7=3"), {
      map: { "glm-5": 1, "glm-4.7": 3 },
      invalidEntry: null,
    });
  });

  it("refuses malformed entries instead of silently dropping them", () => {
    for (const bad of ["glm-5=0", "glm-5=-1", "glm-5=1.5", "glm-5=", "=1", "no-equals"]) {
      const parsed = parseModelConcurrencyInput(bad);
      assert.equal(parsed.map, null, `"${bad}" must not produce a map`);
      assert.equal(parsed.invalidEntry, bad, `"${bad}" must be reported as the invalid entry`);
    }
  });

  it("round-trips the stored map through the editor", () => {
    const stored = { "glm-5": 1, "glm-4.7": 3 };
    assert.deepEqual(parseModelConcurrencyInput(formatModelConcurrencyInput(stored)), {
      map: stored,
      invalidEntry: null,
    });
  });
});

const { buildRateLimitOverridesFromForm, modelConcurrencyFormValue } =
  await import("../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/rateLimitOverridesFromForm.ts");

const blankForm = {
  rpm: "",
  rpd: "",
  tpm: "",
  tpd: "",
  minTime: "",
  maxWaitMs: "",
  rateLimitMaxConcurrent: "",
  modelConcurrency: "",
};

describe("buildRateLimitOverridesFromForm", () => {
  it("returns null overrides for a blank form", () => {
    assert.deepEqual(buildRateLimitOverridesFromForm(blankForm), { overrides: null });
  });

  it("combines scalar fields with the parsed per-model map", () => {
    const result = buildRateLimitOverridesFromForm({
      ...blankForm,
      rpm: "60",
      rateLimitMaxConcurrent: "4",
      modelConcurrency: "glm-5=1\nglm-4.7=3",
    });
    assert.deepEqual(result, {
      overrides: { rpm: 60, maxConcurrent: 4, modelConcurrency: { "glm-5": 1, "glm-4.7": 3 } },
    });
  });

  it("refuses the save and reports the offending entry for the UI to translate", () => {
    const result = buildRateLimitOverridesFromForm({
      ...blankForm,
      rpm: "60",
      modelConcurrency: "glm-5=1\nglm-4.7=zero",
    });
    assert.equal(result.overrides, null);
    assert.deepEqual(result.invalidModelConcurrency, { entry: "glm-4.7=zero", max: 10_000 });
  });

  it("preserves an API-configured executionMaxWaitMs the form has no field for", () => {
    const result = buildRateLimitOverridesFromForm(
      { ...blankForm, rpm: "60" },
      { executionMaxWaitMs: 300000, rpm: 10 }
    );
    assert.deepEqual(result, { overrides: { rpm: 60, executionMaxWaitMs: 300000 } });
  });

  it("does not resurrect fields the operator cleared in the form", () => {
    const result = buildRateLimitOverridesFromForm(blankForm, {
      rpm: 10,
      modelConcurrency: { "glm-5": 1 },
    });
    assert.deepEqual(result, { overrides: null });
  });
});

describe("modelConcurrencyFormValue", () => {
  it("renders stored caps so a dashboard save writes them back", () => {
    assert.equal(modelConcurrencyFormValue({ modelConcurrency: { "glm-5": 1 } }), "glm-5=1");
    assert.equal(modelConcurrencyFormValue(null), "");
  });
});
