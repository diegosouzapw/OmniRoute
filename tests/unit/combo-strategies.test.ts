import test, { after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-strategies-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const dbCore = await import("../../src/lib/db/core.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { recordComboRequest } = await import("../../open-sse/services/comboMetrics.ts");
const { saveModelsDevCapabilities } = await import("../../src/lib/modelsDevSync.ts");

after(() => {
  dbCore.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

const reqBodyNullContext = {
  model: "comboTest",
  messages: [{ role: "user", content: null }], // hit toTextContent (!string, !array)
  stream: false,
};

const reqBodyTextArray = {
  model: "comboTest",
  messages: [{ role: "user", content: [{ text: "hi array" }, { image: "url" }, null] }],
  stream: false,
};

function capability(limitContext: number) {
  return {
    tool_call: true,
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
    limit_context: limitContext,
    limit_input: null,
    limit_output: null,
    interleaved_field: null,
  };
}

function okResponse(model: string) {
  return Response.json({ choices: [{ message: { role: "assistant", content: model } }] });
}

function makeLog() {
  return {
    info() {},
    warn() {},
    debug() {},
    error() {},
  };
}

async function selectedModelFor(combo: Record<string, unknown>, body: Record<string, unknown>) {
  const calls: string[] = [];
  const response = await handleComboChat({
    body,
    combo,
    allCombos: [combo],
    isModelAvailable: undefined,
    relayOptions: undefined,
    signal: undefined,
    settings: {},
    log: makeLog(),
    handleSingleModel: async (_body: unknown, modelStr: string) => {
      calls.push(modelStr);
      return okResponse(modelStr);
    },
  });

  assert.equal(response.status, 200);
  assert.equal(calls.length > 0, true);
  return calls[0];
}

test("least-used strategy prefers the model with fewer recorded combo requests", async () => {
  const name = `least-used-${crypto.randomUUID()}`;
  const busyModel = "openai/gpt-4";
  const idleModel = "openai/gpt-3.5-turbo";
  const combo = await combosDb.createCombo({
    name,
    strategy: "least-used",
    models: [busyModel, idleModel],
  });

  recordComboRequest(name, busyModel, {
    success: true,
    latencyMs: 10,
    strategy: "least-used",
  });

  assert.equal(await selectedModelFor(combo, reqBodyTextArray), idleModel);
});

test("context-optimized strategy prefers the largest context window", async () => {
  saveModelsDevCapabilities({
    "test-context": {
      small: capability(8_000),
      large: capability(64_000),
    },
  });

  const combo = await combosDb.createCombo({
    name: `context-optimized-${crypto.randomUUID()}`,
    strategy: "context-optimized",
    models: ["test-context/small", "test-context/large", "unknown/unknown"],
  });

  assert.equal(await selectedModelFor(combo, reqBodyNullContext), "test-context/large");
});

test("auto strategy handles null and empty prompt edge cases without throwing", async () => {
  const combo = await combosDb.createCombo({
    name: `auto-${crypto.randomUUID()}`,
    strategy: "auto",
    config: { auto: { explorationRate: 0 } },
    models: ["openai/gpt-4"],
  });

  assert.equal(
    await selectedModelFor(combo, {
      model: combo.name,
      messages: [{ role: "user", content: null }],
    }),
    "openai/gpt-4"
  );
  assert.equal(await selectedModelFor(combo, { model: combo.name, messages: [] }), "openai/gpt-4");
});
