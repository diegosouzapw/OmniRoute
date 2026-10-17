import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "omni-combo-budget-16726-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const { saveModelsDevCapabilities } = await import("../../src/lib/modelsDevSync.ts");
const { filterTargetsByRequestCompatibility, deriveRequestCompatibilityRequirements } =
  await import("../../open-sse/services/combo/comboStructure.ts");
const { enforceOutputTokenBudget } =
  await import("../../open-sse/handlers/chatCore/outputTokenBudget.ts");

const log = { info() {}, warn() {}, error() {}, debug() {} };
function target(provider: string, model: string) {
  return {
    kind: "model" as const,
    stepId: model,
    executionKey: model,
    modelStr: `${provider}/${model}`,
    provider,
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
}
function capabilityEntry(context: number, output: number | null, overrides = {}) {
  return {
    tool_call: true,
    reasoning: null,
    attachment: null,
    structured_output: true,
    temperature: null,
    modalities_input: "[]",
    modalities_output: "[]",
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: null,
    limit_context: context,
    limit_input: null,
    limit_output: output,
    interleaved_field: null,
    ...overrides,
  };
}
test.before(() => {
  saveModelsDevCapabilities({
    openai: {
      "cap-8192-16726": capabilityEntry(128_000, 8192),
      "unknown-cap-16726": capabilityEntry(128_000, null),
      "exhausted-tools-16726": capabilityEntry(4096, 2048),
      "no-tools-large-16726": capabilityEntry(128_000, 8192, { tool_call: false }),
    },
    sensenova: {
      "good-16726": capabilityEntry(1_000_000, 384_000),
      "no-tools-16726": capabilityEntry(1_000_000, 384_000, { tool_call: false }),
      "no-json-16726": capabilityEntry(1_000_000, 384_000, { structured_output: false }),
    },
  });
});
test.after(() => {
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const field of ["max_tokens", "max_completion_tokens"]) {
  test(`${field}: a model cap below the provider cap remains dispatchable`, () => {
    const body = { messages: [{ role: "user", content: "hello" }], [field]: 64_000 };
    const entry = target("openai", "cap-8192-16726");
    const input = deriveRequestCompatibilityRequirements(body).estimatedInputTokens;
    const budget = enforceOutputTokenBudget(body, input, 128_000, 0, 8192);
    assert.equal(budget.ok, true);
    if (budget.ok) assert.equal(budget.body[field], 8192);
    assert.deepEqual(filterTargetsByRequestCompatibility([entry], body, log), [entry]);
    assert.equal(body[field], 64_000, "prefilter must not mutate the shared request");
  });
}
for (const mode of ["tools", "json"] as const) {
  test(`SenseNova clamping must not restore a ${mode}-incompatible target`, () => {
    const body = {
      messages: [{ role: "user", content: "abcd ".repeat(80_000) }],
      max_completion_tokens: 983_293,
      ...(mode === "tools"
        ? { tools: [{ type: "function", function: { name: "lookup", parameters: {} } }] }
        : {
            response_format: {
              type: "json_schema",
              json_schema: { name: "result", schema: { type: "object" } },
            },
          }),
    };
    const input = deriveRequestCompatibilityRequirements(body).estimatedInputTokens;
    assert.ok(input > 90_000 && input < 150_000);
    const good = target("sensenova", "good-16726");
    const bad = target("sensenova", `no-${mode}-16726`);
    assert.deepEqual(filterTargetsByRequestCompatibility([good, bad], body, log), [good]);
  });
}
test("input exhaustion does not restore a target that explicitly lacks tools", () => {
  const body = {
    messages: [{ role: "user", content: "abcdefgh ".repeat(10_000) }],
    max_tokens: 32_000,
    tools: [{ type: "function", function: { name: "lookup", parameters: {} } }],
  };
  assert.ok(deriveRequestCompatibilityRequirements(body).estimatedInputTokens > 4096);
  const good = target("openai", "exhausted-tools-16726");
  const bad = target("openai", "no-tools-large-16726");
  assert.deepEqual(filterTargetsByRequestCompatibility([good, bad], body, log), [good]);
});
test("the contributor small-input SenseNova case remains eligible", () => {
  const good = target("sensenova", "good-16726");
  assert.deepEqual(
    filterTargetsByRequestCompatibility(
      [good],
      {
        messages: [{ role: "user", content: "hello" }],
        max_completion_tokens: 983_293,
      },
      log
    ),
    [good]
  );
});
test("an unknown model output cap does not invent a hard rejection", () => {
  const good = target("openai", "unknown-cap-16726");
  assert.deepEqual(
    filterTargetsByRequestCompatibility(
      [good],
      {
        messages: [{ role: "user", content: "hello" }],
        max_tokens: 64_000,
      },
      log
    ),
    [good]
  );
});
