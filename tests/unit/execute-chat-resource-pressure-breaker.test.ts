/**
 * Resource-pressure isolation: executeChatWithBreaker must shed BEFORE the
 * provider breaker path and must not call handleChatCore on pressure 503.
 * Direct handleChatCore retains default guard protection.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pressure-breaker-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { executeChatWithBreaker } = await import("../../src/sse/handlers/chatHelpers.ts");
const { getCircuitBreaker, resetAllCircuitBreakers, STATE } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const { reloadResourcePressureRuntime, checkResourcePressureGuard } =
  await import("../../open-sse/utils/resourcePressure.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const MiB = 1024 ** 2;

async function resetStorage() {
  resetAllCircuitBreakers();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  // Restore a non-shedding resource pressure runtime between tests.
  reloadResourcePressureRuntime({
    heapThresholdMb: 10_000,
    immediateHeapUsedMb: () => 1,
    sample: async () => ({
      observedAtMs: Date.now(),
      v8: { heapUsedBytes: MiB, heapLimitBytes: 10_000 * MiB },
      process: {
        rssBytes: MiB,
        externalBytes: 0,
        arrayBuffersBytes: 0,
        availableBytes: null,
        constrainedBytes: null,
      },
      cgroup: { currentBytes: null, maxBytes: null, highBytes: null, fileBytes: null, events: null },
      psi: null,
    }),
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("executeChatWithBreaker returns typed pressure 503 before normal, bypass, and shadow breaker paths", async () => {
  reloadResourcePressureRuntime({
    heapThresholdMb: 100,
    immediateHeapUsedMb: () => 999,
    sample: async () => {
      throw new Error("sampler must not run on request path");
    },
  });

  // Sanity: process singleton sheds.
  const direct = checkResourcePressureGuard();
  assert.ok(direct);
  assert.equal(direct!.status, 503);

  const breaker = getCircuitBreaker("openai-pressure-iso");
  const before = breaker.getStatus();
  const beforeSuccessCount = breaker.successCount;
  assert.equal(before.state, STATE.CLOSED);
  assert.equal(before.failureCount, 0);

  // If handleChatCore were entered it would attempt real provider work / DB.
  // Use credentials that would fail loudly if chatCore ran deep.
  const credentials = {
    connectionId: "conn_pressure_iso",
    apiKey: "sk-pressure-iso",
    providerSpecificData: {},
  };

  let canExecuteCalls = 0;
  const originalCanExecute = breaker.canExecute.bind(breaker);
  breaker.canExecute = () => {
    canExecuteCalls += 1;
    return originalCanExecute();
  };

  const baseExecution = {
    bypassCircuitBreaker: false,
    breaker,
    body: { model: "openai/gpt-4o-mini", messages: [{ role: "user", content: "x" }] },
    provider: "openai",
    model: "gpt-4o-mini",
    refreshedCredentials: credentials,
    proxyInfo: null,
    log: console,
    clientRawRequest: { endpoint: "/v1/chat/completions", headers: {}, body: {} },
    credentials,
    apiKeyInfo: null,
    userAgent: "",
    comboName: null,
    comboStrategy: null,
    isCombo: false,
    extendedContext: false,
    comboStepId: null,
    comboExecutionKey: null,
  };
  const run = (
    overrides: {
      bypassCircuitBreaker?: boolean;
      trafficType?: "production" | "shadow";
    } = {}
  ) => executeChatWithBreaker({ ...baseExecution, ...overrides });

  const executions = await Promise.all([
    run(),
    run({ bypassCircuitBreaker: true }),
    run({ trafficType: "shadow" }),
  ]);
  const pressureResponses: Response[] = [];
  for (const execution of executions) {
    assert.equal(execution.tlsFingerprintUsed, false);
    if (!("localResourcePressureResult" in execution)) {
      assert.fail("provider execution result escaped the local pressure guard");
    }
    assert.equal(execution.localResourcePressureResult.response.status, 503);
    pressureResponses.push(execution.localResourcePressureResult.response);
  }
  const payload = await pressureResponses[0].json();
  assert.equal(payload.error.code, "resource_pressure");
  assert.match(payload.error.message, /resource pressure/i);

  const after = breaker.getStatus();
  assert.equal(canExecuteCalls, 0);
  assert.equal(after.state, STATE.CLOSED);
  assert.equal(after.failureCount, before.failureCount);
  assert.equal(breaker.successCount, beforeSuccessCount);
});

test("direct handleChatCore default still applies resource pressure guard", async () => {
  reloadResourcePressureRuntime({
    heapThresholdMb: 100,
    immediateHeapUsedMb: () => 500,
    sample: async () => ({
      observedAtMs: Date.now(),
      v8: { heapUsedBytes: 500 * MiB, heapLimitBytes: 1000 * MiB },
      process: {
        rssBytes: 200 * MiB,
        externalBytes: 0,
        arrayBuffersBytes: 0,
        availableBytes: null,
        constrainedBytes: null,
      },
      cgroup: { currentBytes: null, maxBytes: null, highBytes: null, fileBytes: null, events: null },
      psi: null,
    }),
  });

  const result = await (
    handleChatCore as unknown as (opts: Record<string, unknown>) => Promise<{
      success?: boolean;
      status?: number;
      error?: string;
      response?: Response;
    }>
  )({
    body: { model: "openai/gpt-4o-mini", messages: [{ role: "user", content: "hi" }] },
    modelInfo: { provider: "openai", model: "gpt-4o-mini" },
    credentials: { connectionId: "c1", apiKey: "sk-x", providerSpecificData: {} },
    log: console,
    clientRawRequest: { endpoint: "/v1/chat/completions", headers: new Map() },
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 503);
  assert.ok(result.response);
  const payload = await result.response.json();
  assert.equal(payload.error.code, "resource_pressure");
});

test("handleChatCore skipResourcePressureGuard bypasses the inside-core fuse", async () => {
  reloadResourcePressureRuntime({
    heapThresholdMb: 100,
    immediateHeapUsedMb: () => 500,
    sample: async () => ({
      observedAtMs: Date.now(),
      v8: { heapUsedBytes: 500 * MiB, heapLimitBytes: 1000 * MiB },
      process: {
        rssBytes: 200 * MiB,
        externalBytes: 0,
        arrayBuffersBytes: 0,
        availableBytes: null,
        constrainedBytes: null,
      },
      cgroup: { currentBytes: null, maxBytes: null, highBytes: null, fileBytes: null, events: null },
      psi: null,
    }),
  });

  const originalFetch = globalThis.fetch;
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return new Response(JSON.stringify({ error: { message: "upstream" } }), { status: 502 });
  };

  try {
    // With skip=true the pressure fuse is not applied; chatCore proceeds and hits fetch.
    const result = await (
      handleChatCore as unknown as (opts: Record<string, unknown>) => Promise<{
        success?: boolean;
        status?: number;
        error?: string;
        response?: Response;
      }>
    )({
      body: { model: "openai/gpt-4o-mini", messages: [{ role: "user", content: "hi" }] },
      modelInfo: { provider: "openai", model: "gpt-4o-mini" },
      credentials: { connectionId: "c1", apiKey: "sk-x", providerSpecificData: {} },
      log: console,
      clientRawRequest: { endpoint: "/v1/chat/completions", headers: new Map() },
      skipResourcePressureGuard: true,
    });

    assert.ok(fetchCalls > 0, "skip must let chatCore reach provider work");
    // Must NOT be the resource_pressure 503 from the fuse.
    if (result?.response) {
      try {
        const payload = await result.response.clone().json();
        assert.notEqual(payload?.error?.code, "resource_pressure");
      } catch {
        // non-JSON is fine — means we left the pressure fuse path
      }
    } else if (result?.status === 503) {
      assert.notEqual(result?.error, "resource_pressure");
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});
