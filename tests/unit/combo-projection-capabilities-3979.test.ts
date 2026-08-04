/**
 * Regression test for #3979 — combo package imports should advertise the
 * supported model capabilities (multimodal / reasoning / caching) so importing
 * clients (LobeHub / OpenCode / VS Code) enable them instead of requiring
 * manual config after import. Capability emission is registry-gated and opt-in
 * per call site; the default projection is unchanged (#2300).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { projectCombo, computeComboCapabilities } = await import(
  "../../src/app/api/v1/combos/projectCombo.ts"
);

// Deterministic, DB-free capability stub.
const caps: Record<string, { supportsVision: boolean | null; reasoning: boolean }> = {
  "openai/gpt-5": { supportsVision: true, reasoning: true },
  "anthropic/claude-opus": { supportsVision: true, reasoning: true },
  "deepseek/v4": { supportsVision: false, reasoning: true },
  "meta/llama-text": { supportsVision: false, reasoning: false },
};
const resolve = (m: string) => caps[m] ?? { supportsVision: null, reasoning: false };

test("#3979 default projection is unchanged — no capabilities field (preserves #2300)", () => {
  const out = projectCombo({
    name: "c",
    strategy: "priority",
    models: [{ kind: "model", model: "openai/gpt-5" }],
  });
  assert.equal("capabilities" in (out ?? {}), false);
});

test("#3979 combo where ALL members are multimodal + reasoning advertises both", () => {
  const out = projectCombo(
    {
      name: "c",
      strategy: "priority",
      context_cache_protection: true,
      models: [
        { kind: "model", model: "openai/gpt-5" },
        { kind: "model", model: "anthropic/claude-opus" },
      ],
    },
    { includeCapabilities: true, resolveCapabilities: resolve }
  );
  assert.deepEqual(out?.capabilities, { multimodal: true, reasoning: true, caching: true });
});

test("#3979 one non-vision member drops multimodal but keeps reasoning", () => {
  const result = computeComboCapabilities(
    {
      models: [
        { kind: "model", model: "openai/gpt-5" },
        { kind: "model", model: "deepseek/v4" }, // reasoning yes, vision no
      ],
    },
    resolve
  );
  assert.deepEqual(result, { multimodal: false, reasoning: true, caching: false });
});

test("#3979 a non-reasoning, non-vision member drops both", () => {
  const result = computeComboCapabilities(
    { models: [{ kind: "model", model: "meta/llama-text" }] },
    resolve
  );
  assert.deepEqual(result, { multimodal: false, reasoning: false, caching: false });
});

test("#3979 a nested combo-ref is unprovable → drops multimodal/reasoning", () => {
  const result = computeComboCapabilities(
    {
      models: [
        { kind: "model", model: "openai/gpt-5" },
        { kind: "combo-ref", comboName: "other" },
      ],
    },
    resolve
  );
  assert.equal(result.multimodal, false);
  assert.equal(result.reasoning, false);
});

test("#3979 caching reflects the combo's explicit context_cache_protection only", () => {
  const on = computeComboCapabilities(
    { context_cache_protection: true, models: [{ kind: "model", model: "openai/gpt-5" }] },
    resolve
  );
  const off = computeComboCapabilities(
    { models: [{ kind: "model", model: "openai/gpt-5" }] },
    resolve
  );
  assert.equal(on.caching, true);
  assert.equal(off.caching, false);
});

test("#3979 unknown-capability model (null) is not advertised as multimodal", () => {
  const result = computeComboCapabilities(
    { models: [{ kind: "model", model: "vendor/uncatalogued" }] },
    resolve
  );
  assert.equal(result.multimodal, false);
  assert.equal(result.reasoning, false);
});
