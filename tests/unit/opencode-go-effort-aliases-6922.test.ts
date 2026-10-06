/**
 * Issue #6922 — Effort-tier aliases for glm-5.2 and mimo-v2.5 on opencode-go.
 *
 * Tests import and call the real `parseEffortLevel` from OpencodeExecutor
 * to verify effort-tier parsing works for all registered models.
 *
 * The OpencodeExecutor must:
 *  1. Rewrite effort-alias model ids to their canonical base id
 *  2. Inject `reasoning_effort` if not already set
 *
 * Previously only deepseek-v4-pro had aliases. Now glm-5.2 and mimo-v2.5
 * also have high/max tiers.
 */

import test from "node:test";
import assert from "node:assert/strict";

// ─── Stub ESM loader hooks so the executor can be imported in a bare
//     node:test process without triggering side effects (DB init, fetch,
//     etc.). We only need parseEffortLevel, which is a pure function. ───

const { parseEffortLevel, OpencodeExecutor } =
  (await import("../../open-sse/executors/opencode.ts")) as {
    parseEffortLevel: (model: string) => { baseModel: string; effort: string } | null;
    OpencodeExecutor: new (provider: string) => {
      transformRequest: (
        model: string,
        body: Record<string, unknown>,
        stream: boolean,
        credentials: unknown
      ) => Record<string, unknown>;
    };
  };

// ─── DeepSeek V4 Pro: none/low/high/max ───────────────────────────────────

for (const effort of ["none", "low", "high", "max"]) {
  test(`#6922 parseEffortLevel: deepseek-v4-pro-${effort} → ${effort}`, () => {
    assert.deepEqual(parseEffortLevel(`deepseek-v4-pro-${effort}`), {
      baseModel: "deepseek-v4-pro",
      effort,
    });
  });
}

// ─── GLM-5.2: high + max only ────────────────────────────────────────────

test("#6922 parseEffortLevel: glm-5.2-high → high", () => {
  const result = parseEffortLevel("glm-5.2-high");
  assert.deepEqual(result, { baseModel: "glm-5.2", effort: "high" });
});

test("#6922 parseEffortLevel: glm-5.2-max → max", () => {
  const result = parseEffortLevel("glm-5.2-max");
  assert.deepEqual(result, { baseModel: "glm-5.2", effort: "max" });
});

// ─── MiMo-V2.5: high + max only ──────────────────────────────────────────

test("#6922 parseEffortLevel: mimo-v2.5-high → high", () => {
  const result = parseEffortLevel("mimo-v2.5-high");
  assert.deepEqual(result, { baseModel: "mimo-v2.5", effort: "high" });
});

test("#6922 parseEffortLevel: mimo-v2.5-max → max", () => {
  const result = parseEffortLevel("mimo-v2.5-max");
  assert.deepEqual(result, { baseModel: "mimo-v2.5", effort: "max" });
});

// ─── Negative cases ────────────────────────────────────────────────────────

test("#6922 parseEffortLevel: deepseek-v4-pro-medium → null (unsupported tier)", () => {
  assert.strictEqual(parseEffortLevel("deepseek-v4-pro-medium"), null);
});

test("#6922 parseEffortLevel: unknown model → null", () => {
  const result = parseEffortLevel("nonexistent-model-high");
  assert.strictEqual(result, null);
});

test("#6922 parseEffortLevel: glm-5.2-low → null (unsupported tier)", () => {
  const result = parseEffortLevel("glm-5.2-low");
  assert.strictEqual(result, null);
});

test("#6922 parseEffortLevel: mimo-v2.5-medium → null (unsupported tier)", () => {
  const result = parseEffortLevel("mimo-v2.5-medium");
  assert.strictEqual(result, null);
});

test("#6922 parseEffortLevel: empty string → null", () => {
  assert.strictEqual(parseEffortLevel(""), null);
});

test("#6922 parseEffortLevel: base model without tier → null", () => {
  assert.strictEqual(parseEffortLevel("glm-5.2"), null);
});

// ─── transformRequest: #6922 wiring, updated by #10788 ─────────────────────
//
// parseEffortLevel is a pure function, but the original bug (#6922) surfaces
// through OpencodeExecutor.transformRequest. Since #10788, glm-5.2 / mimo-v2.5
// (non-DeepSeek families) forward the effort-suffixed alias VERBATIM — the
// suffix is their only native effort mechanism and opencode-go has no flat
// reasoning_effort field to receive a rewritten tier. Only DeepSeek V4 keeps
// the base-rewrite + field-injection contract.

const CREDENTIALS = { apiKey: "k" } as Record<string, unknown>;

test("#6922/#10788 transformRequest: glm-5.2-high forwards the alias verbatim", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const body = { model: "glm-5.2-high", messages: [{ role: "user", content: "hi" }] };

  const out = executor.transformRequest("glm-5.2-high", body, true, CREDENTIALS);

  assert.equal(out.model, "glm-5.2-high", "alias id must reach the wire untouched");
  assert.equal(
    out.reasoning_effort,
    undefined,
    "no flat reasoning_effort may be injected for non-DeepSeek families"
  );
});

test("#6922/#10788 transformRequest: mimo-v2.5-max forwards the alias verbatim", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const body = { model: "mimo-v2.5-max", messages: [{ role: "user", content: "hi" }] };

  const out = executor.transformRequest("mimo-v2.5-max", body, true, CREDENTIALS);

  assert.equal(out.model, "mimo-v2.5-max", "alias id must reach the wire untouched");
  assert.equal(
    out.reasoning_effort,
    undefined,
    "no flat reasoning_effort may be injected for non-DeepSeek families"
  );
});

test("#6922 transformRequest: does not clobber an already-set reasoning_effort", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const body = {
    model: "glm-5.2-high",
    reasoning_effort: "caller-supplied",
    messages: [{ role: "user", content: "hi" }],
  };

  const out = executor.transformRequest("glm-5.2-high", body, true, CREDENTIALS);

  assert.equal(out.model, "glm-5.2-high", "non-DeepSeek alias id is left untouched");
  assert.equal(
    out.reasoning_effort,
    "caller-supplied",
    "an explicit reasoning_effort already on the body must not be overwritten"
  );
});

test("#6922 transformRequest: unaliased model passes through unchanged", () => {
  const executor = new OpencodeExecutor("opencode-go");
  const body = { model: "gpt-4o-mini", messages: [{ role: "user", content: "hi" }] };

  const out = executor.transformRequest("gpt-4o-mini", body, true, CREDENTIALS);

  assert.equal(out.model, "gpt-4o-mini", "unaliased model id is left untouched");
  assert.equal(
    out.reasoning_effort,
    undefined,
    "no reasoning_effort is injected for a non-tier model"
  );
});
