// tests/unit/chatcore-executor-proxy.test.ts
// Characterization of resolveExecutorWithProxy — the upstream-proxy executor resolver extracted from
// handleChatCore (chatCore god-file decomposition, #3501). Exercises the REAL config path through a
// temp DB: disabled/native → the provider's own executor; cliproxyapi → the passthrough executor;
// fallback → a distinct wrapper that owns its own execute(). The wrapper's retry behaviour is not
// invoked here (it would hit the network); the existing cliproxyapi-fallback-wiring.test.ts covers
// the surrounding wiring.
import { test, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-executor-proxy-test-"));
process.env.DATA_DIR = testDataDir;

// Dynamic imports AFTER DATA_DIR is set so core.ts picks up the temp path.
const coreDb = await import("../../src/lib/db/core.ts");
const upstreamProxyDb = await import("../../src/lib/db/upstreamProxy.ts");
const { resolveExecutorWithProxy } = await import(
  "../../open-sse/handlers/chatCore/executorProxy.ts"
);
const { getExecutor } = await import("../../open-sse/executors/index.ts");
const { clearUpstreamProxyConfigCache } = await import(
  "../../open-sse/handlers/chatCore/comboContextCache.ts"
);

before(async () => {
  await coreDb.ensureDbInitialized();
});

beforeEach(() => {
  clearUpstreamProxyConfigCache();
});

after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(testDataDir, { recursive: true, force: true });
});

test("no config (disabled by default) returns the provider's own executor", async () => {
  clearUpstreamProxyConfigCache("openai");
  const exec = await resolveExecutorWithProxy("openai");
  assert.equal(exec, getExecutor("openai"));
});

test("mode 'native' returns the provider's own executor", async () => {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "openai",
    mode: "native",
    enabled: true,
  });
  clearUpstreamProxyConfigCache("openai");
  const exec = await resolveExecutorWithProxy("openai");
  assert.equal(exec, getExecutor("openai"));
});

test("mode 'cliproxyapi' returns a CLIProxyAPI passthrough wrapper", async () => {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "anthropic",
    mode: "cliproxyapi",
    enabled: true,
  });
  clearUpstreamProxyConfigCache("anthropic");
  const exec = await resolveExecutorWithProxy("anthropic");
  assert.notEqual(exec, getExecutor("anthropic"));
  assert.notEqual(exec, getExecutor("cliproxyapi"));
  assert.equal(typeof exec.execute, "function");
});

test("mode 'fallback' returns a distinct wrapper owning its own execute()", async () => {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "openai",
    mode: "fallback",
    enabled: true,
  });
  clearUpstreamProxyConfigCache("openai");
  const exec = await resolveExecutorWithProxy("openai");
  assert.notEqual(exec, getExecutor("openai"));
  assert.notEqual(exec, getExecutor("cliproxyapi"));
  assert.equal(typeof exec.execute, "function");
});

test("mode 'cliproxyapi' maps models before dispatching to CLIProxyAPI", async () => {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "anthropic",
    mode: "cliproxyapi",
    enabled: true,
    cliproxyapiModelMapping: {
      "claude-3-5-sonnet": "anthropic/claude-3-5-sonnet-latest",
    },
  });
  clearUpstreamProxyConfigCache("anthropic");

  const cliproxyapiExec = getExecutor("cliproxyapi");
  const originalExecute = cliproxyapiExec.execute;
  let capturedInput;
  cliproxyapiExec.execute = async (input) => {
    capturedInput = input;
    return { response: { status: 200 } };
  };

  try {
    const exec = await resolveExecutorWithProxy("anthropic");
    await exec.execute({
      model: "claude-3-5-sonnet",
      body: { model: "claude-3-5-sonnet", messages: [] },
      stream: false,
      credentials: {},
    });
  } finally {
    cliproxyapiExec.execute = originalExecute;
  }

  assert.equal(capturedInput.model, "anthropic/claude-3-5-sonnet-latest");
  assert.deepEqual(capturedInput.body, {
    model: "anthropic/claude-3-5-sonnet-latest",
    messages: [],
  });
});

test("mode 'fallback' applies global CLIProxyAPI model mappings on proxy retry", async () => {
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "openai",
    mode: "fallback",
    enabled: true,
  });
  await upstreamProxyDb.upsertUpstreamProxyConfig({
    providerId: "cliproxyapi",
    mode: "native",
    enabled: true,
    cliproxyapiModelMapping: {
      "gpt-4o": "openai/gpt-4o",
    },
  });
  clearUpstreamProxyConfigCache();

  const nativeExec = getExecutor("openai");
  const cliproxyapiExec = getExecutor("cliproxyapi");
  const originalNativeExecute = nativeExec.execute;
  const originalProxyExecute = cliproxyapiExec.execute;
  let capturedProxyInput;

  nativeExec.execute = async () => ({ response: { status: 503 } });
  cliproxyapiExec.execute = async (input) => {
    capturedProxyInput = input;
    return { response: { status: 200 } };
  };

  try {
    const exec = await resolveExecutorWithProxy("openai");
    await exec.execute({
      model: "gpt-4o",
      body: { model: "gpt-4o", messages: [] },
      stream: false,
      credentials: {},
    });
  } finally {
    nativeExec.execute = originalNativeExecute;
    cliproxyapiExec.execute = originalProxyExecute;
  }

  assert.equal(capturedProxyInput.model, "openai/gpt-4o");
  assert.deepEqual(capturedProxyInput.body, {
    model: "openai/gpt-4o",
    messages: [],
  });
});
