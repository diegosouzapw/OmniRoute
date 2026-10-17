import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";

const TEST_DATA_DIR = fs.mkdtempSync(pathJoin(os.tmpdir(), "omniroute-combo-passthrough-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

function pathJoin(...parts: string[]): string {
  return parts.join("/").replace(/\/+/g, "/");
}

const core = await import("../../src/lib/db/core.ts");
const { resolveComboTargetPipeline } =
  await import("../../open-sse/services/combo/targetResolution.ts");

test.after(() => {
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const noopLog = { info() {}, warn() {}, error() {}, debug() {} } as never;

function deps(overrides: Record<string, unknown> = {}): never {
  return {
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: { id: "c1", name: "c1", models: ["oc/big-pickle", "openai/gpt-4o"], config: {} },
    strategy: "priority",
    config: {},
    settings: null,
    allCombos: null,
    relayOptions: null,
    signal: null,
    apiKeyAllowedConnections: null,
    log: noopLog,
    resilienceSettings: { providerCooldown: { enabled: false } },
    isModelAvailable: undefined,
    handleSingleModelWithTimeout: async () => new Response("{}"),
    buildAutoCandidates: async () => [],
    isOpencodePassthroughClient: false,
    ...overrides,
  } as never;
}

test("combo request headers without the OpenCode client exclude the no-auth oc candidate", async () => {
  const { handleComboChat } = await import("../../open-sse/services/combo.ts");
  assert.equal(typeof handleComboChat, "function");
  const curlHeaders = new Headers();
  curlHeaders.set("user-agent", "curl/8.4.0");
  const { isOpencodePassthroughClient } =
    await import("../../open-sse/executors/opencodeClientGate.ts");
  assert.equal(isOpencodePassthroughClient(curlHeaders), false);
  const result = await resolveComboTargetPipeline(deps({ isOpencodePassthroughClient: false }));
  assert.ok(!("earlyResponse" in result));
  if ("earlyResponse" in result) return;
  assert.deepEqual(
    result.orderedTargets.map((t) => t.modelStr),
    ["openai/gpt-4o"]
  );
});

test("combo request headers from the OpenCode client keep the no-auth oc candidate", async () => {
  const { buildExecutorClientHeaders } =
    await import("../../open-sse/handlers/chatCore/executorClientHeaders.ts");
  const { isOpencodePassthroughClient } =
    await import("../../open-sse/executors/opencodeClientGate.ts");
  const raw = new Headers();
  raw.set("user-agent", "opencode/1.18.31");
  raw.set("x-opencode-session", "ses_abc123");
  const headers = buildExecutorClientHeaders(raw, null, null);
  assert.equal(isOpencodePassthroughClient(headers), true);
  const result = await resolveComboTargetPipeline(deps({ isOpencodePassthroughClient: true }));
  assert.ok(!("earlyResponse" in result));
  if ("earlyResponse" in result) return;
  assert.deepEqual(
    result.orderedTargets.map((t) => t.modelStr),
    ["oc/big-pickle", "openai/gpt-4o"]
  );
});

test("keyed opencode-zen candidates are unaffected by the passthrough flag", async () => {
  const combo = {
    id: "c2",
    name: "c2",
    models: ["opencode-zen/gpt-5", "openai/gpt-4o"],
    config: {},
  };
  const result = await resolveComboTargetPipeline(
    deps({ combo, isOpencodePassthroughClient: false })
  );
  assert.ok(!("earlyResponse" in result));
  if ("earlyResponse" in result) return;
  assert.deepEqual(
    result.orderedTargets.map((t) => t.modelStr),
    ["opencode-zen/gpt-5", "openai/gpt-4o"]
  );
});
