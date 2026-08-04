/**
 * #8488 — capability filters fail closed when every candidate is incompatible.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-8488-compat-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { saveModelsDevCapabilities } = await import("../../src/lib/modelsDevSync.ts");
const {
  filterTargetsByRequestCompatibility,
  describeCapabilityFilterExhaustion,
  providerSupportsEmulatedToolCalling,
} = await import("../../open-sse/services/combo/comboStructure.ts");
const { resolveAutoStrategyOrder } =
  await import("../../open-sse/services/combo/resolveAutoStrategy.ts");

function capabilityEntry(limit_context: number, overrides: Record<string, unknown> = {}) {
  return {
    tool_call: null,
    reasoning: null,
    attachment: null,
    structured_output: null,
    temperature: null,
    modalities_input: "[]",
    modalities_output: "[]",
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: null,
    limit_context,
    limit_input: null,
    limit_output: null,
    interleaved_field: null,
    ...overrides,
  };
}

function target(provider: string, modelStr: string) {
  return {
    kind: "model" as const,
    stepId: "s1",
    executionKey: `${provider}>${modelStr}`,
    modelStr,
    provider,
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

const log = {
  info() {},
  warn() {},
  error() {},
  debug() {},
};

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#8488 filter: some tool-capable targets kept (unchanged)", () => {
  saveModelsDevCapabilities({
    openai: {
      "with-tools": capabilityEntry(128000, { tool_call: true }),
      "no-tools": capabilityEntry(128000, { tool_call: false }),
    },
  });

  const kept = filterTargetsByRequestCompatibility(
    [target("openai", "openai/with-tools"), target("openai", "openai/no-tools")],
    {
      messages: [{ role: "user", content: "hi" }],
      tools: [{ type: "function", function: { name: "lookup", parameters: {} } }],
    },
    log
  );
  assert.deepEqual(
    kept.map((t) => t.modelStr),
    ["openai/with-tools"]
  );
});

test("#8488 filter: zero tool-capable targets → empty (fail closed)", () => {
  saveModelsDevCapabilities({
    openai: {
      "no-tools-a": capabilityEntry(128000, { tool_call: false }),
      "no-tools-b": capabilityEntry(128000, { tool_call: false }),
    },
  });

  const targets = [target("openai", "openai/no-tools-a"), target("openai", "openai/no-tools-b")];
  const body = {
    messages: [{ role: "user", content: "hi" }],
    tools: [{ type: "function", function: { name: "lookup", parameters: {} } }],
  };
  const kept = filterTargetsByRequestCompatibility(targets, body, log);
  assert.equal(kept.length, 0);

  const exhaustion = describeCapabilityFilterExhaustion(targets, body, "tools-combo");
  assert.ok(exhaustion);
  assert.match(exhaustion!.message, /supports tool calling/i);
  assert.equal(exhaustion!.terminalReason, "capability_mismatch");
  assert.ok(exhaustion!.excluded.some((e) => e.reason.includes("tools")));
});

test("#8488 filter: chatgpt-web emulation providers stay eligible for tools (#5240)", () => {
  // Registry honestly tags chatgpt-web models toolCalling:false; the prompt
  // shim is what makes tools work. Fail-closed must not hard-reject them.
  assert.equal(providerSupportsEmulatedToolCalling("chatgpt-web"), true);
  assert.equal(providerSupportsEmulatedToolCalling("cgpt-web"), true);
  assert.equal(providerSupportsEmulatedToolCalling("claude-web"), false); // toolCalling:"none"
  assert.equal(providerSupportsEmulatedToolCalling("openai"), false);

  const kept = filterTargetsByRequestCompatibility(
    [
      target("chatgpt-web", "chatgpt-web/gpt-5.5"),
      target("chatgpt-web", "chatgpt-web/o3"),
    ],
    {
      messages: [{ role: "user", content: "Use a tool." }],
      tools: [{ type: "function", function: { name: "lookup", parameters: {} } }],
    },
    log
  );
  assert.equal(kept.length, 2);
  assert.deepEqual(
    kept.map((t) => t.modelStr),
    ["chatgpt-web/gpt-5.5", "chatgpt-web/o3"]
  );

  const exhaustion = describeCapabilityFilterExhaustion(
    [
      target("chatgpt-web", "chatgpt-web/gpt-5.5"),
      target("chatgpt-web", "chatgpt-web/o3"),
    ],
    {
      messages: [{ role: "user", content: "Use a tool." }],
      tools: [{ type: "function", function: { name: "lookup", parameters: {} } }],
    },
    "web-cookie-tools"
  );
  assert.equal(exhaustion, null, "emulation-capable pool must not report capability_mismatch");
});

test("#8488 auto: chatgpt-web emulation survives tool pre-filter (#5240)", async () => {
  const result = await resolveAutoStrategyOrder({
    orderedTargets: [target("chatgpt-web", "chatgpt-web/gpt-5.5")] as never,
    body: {
      messages: [{ role: "user", content: "hi" }],
      tools: [{ type: "function", function: { name: "lookup", parameters: {} } }],
    },
    combo: { id: "c1", name: "auto-web-cookie", config: {} } as never,
    settings: null,
    config: {},
    relayOptions: null,
    resilienceSettings: { quotaPreflight: { enabled: false } } as never,
    log: log as never,
    buildAutoCandidates: (async () => []) as never,
  });

  assert.ok(!("earlyResponse" in result), "must not 400 capability_mismatch for emulation providers");
  if ("orderedTargets" in result) {
    assert.equal(result.orderedTargets.length, 1);
    assert.equal(result.orderedTargets[0].modelStr, "chatgpt-web/gpt-5.5");
  }
});

test("#8488 filter: opt-in compatFilterFailOpen restores full pool", () => {
  saveModelsDevCapabilities({
    openai: {
      "no-tools-a": capabilityEntry(128000, { tool_call: false }),
      "no-tools-b": capabilityEntry(128000, { tool_call: false }),
    },
  });

  const kept = filterTargetsByRequestCompatibility(
    [target("openai", "openai/no-tools-a"), target("openai", "openai/no-tools-b")],
    {
      messages: [{ role: "user", content: "hi" }],
      tools: [{ type: "function", function: { name: "lookup", parameters: {} } }],
    },
    log,
    "Context-aware fallback",
    { failOpen: true }
  );
  assert.equal(kept.length, 2);
});

test("#8488 filter: vision with no confirmed target → empty (fail closed)", () => {
  saveModelsDevCapabilities({
    openai: {
      "text-only": capabilityEntry(128000, { attachment: false, tool_call: true }),
    },
  });

  const kept = filterTargetsByRequestCompatibility(
    [target("openai", "openai/text-only")],
    {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "see?" },
            { type: "image_url", image_url: { url: "https://example.com/a.png" } },
          ],
        },
      ],
    },
    log
  );
  assert.equal(kept.length, 0);
});

test("#8488 auto: tool pre-filter fail closed returns early 400", async () => {
  saveModelsDevCapabilities({
    openai: {
      "no-tools": capabilityEntry(128000, { tool_call: false }),
    },
  });

  const result = await resolveAutoStrategyOrder({
    orderedTargets: [target("openai", "openai/no-tools")] as never,
    body: {
      messages: [{ role: "user", content: "hi" }],
      tools: [{ type: "function", function: { name: "lookup", parameters: {} } }],
    },
    combo: { id: "c1", name: "auto-tools", config: {} } as never,
    settings: null,
    config: {},
    relayOptions: null,
    resilienceSettings: { quotaPreflight: { enabled: false } } as never,
    log: log as never,
    buildAutoCandidates: (async () => []) as never,
  });

  assert.ok("earlyResponse" in result);
  if ("earlyResponse" in result) {
    assert.equal(result.earlyResponse.status, 400);
    const body = await result.earlyResponse.json();
    assert.equal(body?.error?.code, "capability_mismatch");
    assert.match(String(body?.error?.message || ""), /supports tool calling/i);
  }
});

test("#8488 auto: tool pre-filter fail-open opt-in keeps full pool", async () => {
  saveModelsDevCapabilities({
    openai: {
      "no-tools": capabilityEntry(128000, { tool_call: false }),
    },
  });

  const result = await resolveAutoStrategyOrder({
    orderedTargets: [target("openai", "openai/no-tools")] as never,
    body: {
      messages: [{ role: "user", content: "hi" }],
      tools: [{ type: "function", function: { name: "lookup", parameters: {} } }],
    },
    combo: { id: "c1", name: "auto-tools-open", config: { compatFilterFailOpen: true } } as never,
    settings: null,
    config: { compatFilterFailOpen: true },
    relayOptions: null,
    resilienceSettings: { quotaPreflight: { enabled: false } } as never,
    log: log as never,
    buildAutoCandidates: (async () => []) as never,
  });

  assert.ok(!("earlyResponse" in result));
  if ("orderedTargets" in result) {
    assert.equal(result.orderedTargets.length, 1);
  }
});

test("#8488 auto: context pre-filter fail closed when all known limits too small", async () => {
  saveModelsDevCapabilities({
    openai: {
      tiny: capabilityEntry(100, { tool_call: true }),
    },
  });

  const hugePrompt = "x".repeat(4000); // ~1000 tokens at 4 chars/token
  const result = await resolveAutoStrategyOrder({
    orderedTargets: [target("openai", "openai/tiny")] as never,
    body: { messages: [{ role: "user", content: hugePrompt }] },
    combo: { id: "c1", name: "auto-ctx", config: {} } as never,
    settings: null,
    config: {},
    relayOptions: null,
    resilienceSettings: { quotaPreflight: { enabled: false } } as never,
    log: log as never,
    buildAutoCandidates: (async () => []) as never,
  });

  assert.ok("earlyResponse" in result);
  if ("earlyResponse" in result) {
    assert.equal(result.earlyResponse.status, 400);
    const body = await result.earlyResponse.json();
    assert.equal(body?.error?.code, "context_length_exceeded");
  }
});
