import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hidden-combo-identities-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const models = await import("../../src/lib/db/models.ts");
const nodes = await import("../../src/lib/db/providers/nodes.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const noop = (..._args: unknown[]) => {};
const log = { info: noop, warn: noop, debug: noop, error: noop };

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function dispatch(targets: string[]) {
  const calls: string[] = [];
  const response = await handleComboChat({
    body: {},
    combo: {
      name: "hidden-identities",
      strategy: "priority",
      models: targets,
      config: { maxRetries: 0 },
    },
    handleSingleModel: async (_body: unknown, model: string) => {
      calls.push(model);
      return Response.json({ choices: [{ message: { content: "ok" } }] });
    },
    isModelAvailable: async () => true,
    log,
    settings: null,
    allCombos: null,
    relayOptions: null,
  });
  return { response, calls };
}

test("combo filters aliases persisted under the short provider key and legacy model id", async () => {
  models.mergeModelCompatOverride("gh", "claude-4.5-opus", { isHidden: true });
  const { response, calls } = await dispatch([
    "github/claude-opus-4-5-20251101",
    "openai/gpt-4o-mini",
  ]);
  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["openai/gpt-4o-mini"]);
});

test("combo with all individually hidden alias leaves returns404 before dispatch", async () => {
  models.mergeModelCompatOverride("gh", "claude-4.5-opus", { isHidden: true });
  const { response, calls } = await dispatch(["github/claude-opus-4-5-20251101"]);
  assert.equal(response.status, 404);
  assert.deepEqual(calls, []);
  assert.equal((await response.json()).error.code, "model_not_found");
});

for (const hideByPrefix of [true, false]) {
  test(`combo preserves UUID/prefix hidden identity (${hideByPrefix ? "prefix" : "UUID"} write)`, async () => {
    const nodeId = "openai-compatible-chat-combo-hidden";
    await nodes.createProviderNode({
      id: nodeId,
      type: "openai-compatible",
      name: "Combo fixture",
      prefix: "combo-node",
      apiType: "chat",
      baseUrl: "https://fixture.invalid/v1",
    });
    models.mergeModelCompatOverride(hideByPrefix ? "combo-node" : nodeId, "vendor/model-x", {
      isHidden: true,
    });
    const target = `${hideByPrefix ? nodeId : "combo-node"}/vendor/model-x`;
    const { response, calls } = await dispatch([target, "openai/gpt-4o-mini"]);
    assert.equal(response.status, 200);
    assert.deepEqual(calls, ["openai/gpt-4o-mini"]);
  });
}

test("a shared node prefix applies hidden state only to its runtime winner", async () => {
  const winner = "openai-compatible-chat-a";
  const sibling = "openai-compatible-chat-b";
  for (const id of [winner, sibling]) {
    await nodes.createProviderNode({
      id,
      type: "openai-compatible",
      name: id,
      prefix: "shared-fixture",
      apiType: "chat",
      baseUrl: "https://fixture.invalid/v1",
    });
  }
  models.mergeModelCompatOverride("shared-fixture", "vendor/model-x", { isHidden: true });
  const visible = await dispatch([`${sibling}/vendor/model-x`]);
  assert.equal(visible.response.status, 200);
  assert.deepEqual(visible.calls, [`${sibling}/vendor/model-x`]);
  const hidden = await dispatch([`${winner}/vendor/model-x`, "shared-fixture/vendor/model-x"]);
  assert.equal(hidden.response.status, 404);
  assert.deepEqual(hidden.calls, []);
});

test("a compatible node cannot transfer its hidden state to a reserved built-in prefix", async () => {
  const nodeId = "openai-compatible-chat-reserved";
  await nodes.createProviderNode({
    id: nodeId,
    type: "openai-compatible",
    name: "Reserved fixture",
    prefix: "openai",
    apiType: "chat",
    baseUrl: "https://fixture.invalid/v1",
  });
  models.mergeModelCompatOverride(nodeId, "gpt-4o-mini", { isHidden: true });
  const { response, calls } = await dispatch(["openai/gpt-4o-mini"]);
  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["openai/gpt-4o-mini"]);
});

test("combo visibility refreshes after unhide instead of reusing another invocation's snapshot", async () => {
  models.mergeModelCompatOverride("gh", "claude-4.5-opus", { isHidden: true });
  assert.equal((await dispatch(["github/claude-opus-4-5-20251101"])).response.status, 404);
  models.mergeModelCompatOverride("gh", "claude-4.5-opus", { isHidden: false });
  const { response, calls } = await dispatch(["github/claude-opus-4-5-20251101"]);
  assert.equal(response.status, 200);
  assert.deepEqual(calls, ["github/claude-opus-4-5-20251101"]);
});

test("hiding canonical no-auth opencode never hides the independent opencode-zen provider", async () => {
  models.mergeModelCompatOverride("opencode", "shared-model", { isHidden: true });
  const independent = await dispatch(["opencode-zen/shared-model"]);
  assert.equal(independent.response.status, 200);
  assert.deepEqual(independent.calls, ["opencode-zen/shared-model"]);
  const hidden = await dispatch(["oc/shared-model"]);
  assert.equal(hidden.response.status, 404);
  assert.deepEqual(hidden.calls, []);
});
