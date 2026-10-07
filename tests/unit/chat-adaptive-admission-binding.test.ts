/**
 * Shared handleChat ↔ adaptive admission binding tests.
 * Proves policy-seam acquire, lazy client-raw, early pre-acquire returns,
 * enforce rejection before provider work, and default shadow admission.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("chat-adaptive-admission-binding");
const { BaseExecutor, buildRequest, handleChat, resetStorage, seedConnection } = harness;
const {
  getAdaptiveAdmissionRuntime,
  reloadAdaptiveAdmissionRuntime,
  resetAdaptiveAdmissionRuntimeForTests,
} = await import("../../open-sse/services/admission/runtime.ts");
const { buildClientRawRequest } = await import("../../src/sse/handlers/chat/clientRawRequest.ts");
const { getProviderConnectionById } = await import("../../src/lib/db/providers.ts");
const { reloadResourcePressureRuntime } = await import("../../open-sse/utils/resourcePressure.ts");
const { getCircuitBreaker, resetAllCircuitBreakers, STATE } =
  await import("../../src/shared/utils/circuitBreaker.ts");

const originalFetch = globalThis.fetch;
const MiB = 1024 ** 2;

function reloadNormalResourcePressure() {
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

function reloadCriticalResourcePressure() {
  reloadResourcePressureRuntime({
    heapThresholdMb: 100,
    immediateHeapUsedMb: () => 500,
    sample: async () => {
      throw new Error("critical request path must not await the async sampler");
    },
  });
}

function connectionFailureState(connection: Record<string, unknown> | null) {
  assert.ok(connection);
  return {
    isActive: connection.isActive,
    testStatus: connection.testStatus,
    rateLimitedUntil: connection.rateLimitedUntil ?? null,
    backoffLevel: connection.backoffLevel ?? null,
    lastError: connection.lastError ?? null,
    lastErrorAt: connection.lastErrorAt ?? null,
    lastErrorType: connection.lastErrorType ?? null,
    lastErrorSource: connection.lastErrorSource ?? null,
    errorCode: connection.errorCode ?? null,
  };
}

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
  resetAdaptiveAdmissionRuntimeForTests();
  reloadNormalResourcePressure();
  // Default process runtime is shadow; leave it unless a test reloads enforce.
  reloadAdaptiveAdmissionRuntime({
    config: {
      mode: "shadow",
      minLimit: 8,
      initialLimit: 64,
      maxLimit: 1000,
      maxQueueCount: 128,
      maxQueueCost: 2000,
      defaultMaxWaitMs: 5_000,
      windowMs: 1_000,
    },
    checkResourcePressure: () => null,
  });
  globalThis.fetch = originalFetch;
});

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  resetAdaptiveAdmissionRuntimeForTests();
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  resetAdaptiveAdmissionRuntimeForTests();
  await harness.cleanup();
});

test("invalid body early-return creates no admission lease activity", async () => {
  const before = getAdaptiveAdmissionRuntime().snapshot();
  const response = await handleChat(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{not-json",
    })
  );
  assert.equal(response.status, 400);
  const after = getAdaptiveAdmissionRuntime().snapshot();
  assert.equal(after.admittedCount, before.admittedCount);
  assert.equal(after.activeCount, 0);
  assert.equal(after.rejectedCount, before.rejectedCount);
});

test("schema-invalid request never acquires an admission lease", async () => {
  const before = getAdaptiveAdmissionRuntime().snapshot();
  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        messages: "not-an-array",
      },
    })
  );
  assert.equal(response.status, 400);
  const after = getAdaptiveAdmissionRuntime().snapshot();
  assert.equal(after.admittedCount, before.admittedCount);
  assert.equal(after.activeCount, 0);
});

test("default shadow admits and releases active lease on JSON result", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-shadow-admit" });

  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return new Response(
      JSON.stringify({
        id: "chatcmpl-test",
        object: "chat.completion",
        choices: [
          { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
        ],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  const before = getAdaptiveAdmissionRuntime().snapshot();
  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "hi" }],
      },
    })
  );
  assert.equal(response.status, 200);
  assert.equal(fetchCalls, 1);
  const after = getAdaptiveAdmissionRuntime().snapshot();
  assert.equal(after.activeCount, 0);
  assert.equal(after.admittedCount, before.admittedCount + 1);
});

test("shared SSE response holds the lease until consumer cancellation", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-stream-admit" });

  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(
            `data: ${JSON.stringify({
              id: "chatcmpl-stream",
              object: "chat.completion.chunk",
              choices: [{ index: 0, delta: { content: "hi" }, finish_reason: null }],
            })}\n\n`
          )
        );
      },
    });
    return new Response(stream, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  };

  const before = getAdaptiveAdmissionRuntime().snapshot();
  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: true,
        messages: [{ role: "user", content: "stream" }],
      },
    })
  );

  assert.equal(response.status, 200);
  assert.equal(fetchCalls, 1);
  assert.equal(getAdaptiveAdmissionRuntime().snapshot().activeCount, 1);
  assert.equal(getAdaptiveAdmissionRuntime().snapshot().admittedCount, before.admittedCount + 1);

  await response.body!.cancel();
  assert.equal(getAdaptiveAdmissionRuntime().snapshot().activeCount, 0);
});

function reloadEnforceOversized() {
  // cost >> limit forces immediate ADMISSION_OVERSIZED (not clamped-to-limit admit).
  reloadAdaptiveAdmissionRuntime({
    config: {
      mode: "enforce",
      minLimit: 1,
      initialLimit: 1,
      maxLimit: 1,
      maxQueueCount: 1,
      maxQueueCost: 1,
      defaultMaxWaitMs: 50,
      windowMs: 50,
      cost: {
        maxRequestCost: 100,
        baseCost: 1,
        bodyBytesPerUnit: 1,
        tokensPerUnit: 1,
        messagesPerUnit: 1,
        toolsPerUnit: 1,
        fanoutPerUnit: 1,
        streamingClassCost: 1,
        nonStreamingClassCost: 1,
      },
    },
    checkResourcePressure: () => null,
  });
}

function oversizedBody(prefix: string) {
  return {
    model: "openai/gpt-4o-mini",
    stream: false,
    messages: Array.from({ length: 20 }, (_, i) => ({
      role: "user",
      content: `${prefix}-${i}-${"x".repeat(64)}`,
    })),
  };
}

test("enforce oversized/queue rejection returns standardized 503 before provider fetch", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-enforce-reject" });
  reloadEnforceOversized();

  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return new Response("should-not-run", { status: 200 });
  };

  const response = await handleChat(buildRequest({ body: oversizedBody("message") }));

  assert.equal(response.status, 503);
  const payload = await response.json();
  assert.match(String(payload.error?.code || ""), /^admission_/);
  assert.equal(fetchCalls, 0);
  assert.equal(getAdaptiveAdmissionRuntime().snapshot().activeCount, 0);
});

test("lazy client-raw factory is not invoked on admission rejection", async () => {
  reloadEnforceOversized();

  let factoryCalls = 0;
  const body = oversizedBody("lazy");
  const request = buildRequest({ body });

  const response = await handleChat(request, () => {
    factoryCalls += 1;
    return buildClientRawRequest(request, body);
  });

  assert.equal(response.status, 503);
  assert.equal(factoryCalls, 0);
});

test("lazy client-raw factory is invoked exactly once after admission", async () => {
  await seedConnection("openai", { apiKey: "sk-openai-lazy-raw" });
  reloadAdaptiveAdmissionRuntime({
    config: {
      mode: "shadow",
      minLimit: 8,
      initialLimit: 64,
      maxLimit: 1000,
      maxQueueCount: 128,
      maxQueueCost: 2000,
      defaultMaxWaitMs: 5_000,
      windowMs: 1_000,
    },
    checkResourcePressure: () => null,
  });

  let factoryCalls = 0;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        id: "chatcmpl-lazy",
        object: "chat.completion",
        choices: [
          { index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" },
        ],
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  const body = {
    model: "openai/gpt-4o-mini",
    stream: false,
    messages: [{ role: "user", content: "lazy once" }],
  };
  const request = buildRequest({ body });
  await handleChat(request, () => {
    factoryCalls += 1;
    return buildClientRawRequest(request, body);
  });

  assert.equal(factoryCalls, 1);
  assert.equal(getAdaptiveAdmissionRuntime().snapshot().activeCount, 0);
});

test(
  "execution-time resource pressure bypasses provider/account accounting",
  { timeout: 2_000 },
  async () => {
    const connection = await seedConnection("openai", {
      name: "pressure-isolation",
      apiKey: "sk-openai-pressure-isolation",
    });
    const connectionId = String(connection.id);
    const beforeConnection = connectionFailureState(
      (await getProviderConnectionById(connectionId)) as Record<string, unknown> | null
    );
    const breaker = getCircuitBreaker("openai");
    const beforeBreaker = breaker.getStatus();
    const beforeSuccessCount = breaker.successCount;

    reloadCriticalResourcePressure();
    let fetchCalls = 0;
    globalThis.fetch = async () => {
      fetchCalls += 1;
      return new Response("provider must not run", { status: 500 });
    };

    const response = await handleChat(
      buildRequest({
        body: {
          model: "openai/gpt-4o-mini",
          messages: [{ role: "user", content: "shed locally" }],
        },
      })
    );

    assert.equal(response.status, 503);
    assert.equal(response.headers.get("Retry-After"), "5");
    const payload = await response.json();
    assert.equal(payload.error.code, "resource_pressure");
    assert.equal(fetchCalls, 0);
    assert.deepEqual(
      connectionFailureState(
        (await getProviderConnectionById(connectionId)) as Record<string, unknown> | null
      ),
      beforeConnection
    );
    const afterBreaker = breaker.getStatus();
    assert.equal(afterBreaker.state, beforeBreaker.state);
    assert.equal(afterBreaker.failureCount, beforeBreaker.failureCount);
    assert.equal(breaker.successCount, beforeSuccessCount);
  }
);

test("resource pressure takes precedence over an open provider breaker", async () => {
  const breaker = getCircuitBreaker("openai");
  for (let i = 0; i < 20 && breaker.getStatus().state !== STATE.OPEN; i += 1) {
    breaker._onFailure();
  }
  const before = breaker.getStatus();
  const beforeSuccessCount = breaker.successCount;
  assert.equal(before.state, STATE.OPEN);

  reloadCriticalResourcePressure();
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return new Response("provider must not run", { status: 500 });
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: "pressure before breaker" }],
      },
    })
  );
  assert.equal(response.status, 503);
  assert.equal((await response.json()).error.code, "resource_pressure");
  assert.equal(fetchCalls, 0);

  const after = breaker.getStatus();
  assert.equal(after.state, STATE.OPEN);
  assert.equal(after.failureCount, before.failureCount);
  assert.equal(breaker.successCount, beforeSuccessCount);
});

test("local admission rejection does not mutate a supplied provider breaker", async () => {
  resetAllCircuitBreakers();
  const breaker = getCircuitBreaker("openai");
  const before = breaker.getStatus();
  const beforeSuccessCount = breaker.successCount;
  assert.equal(before.state, STATE.CLOSED);
  assert.equal(before.failureCount, 0);

  reloadEnforceOversized();

  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return new Response("nope", { status: 200 });
  };

  const response = await handleChat(buildRequest({ body: oversizedBody("breaker") }));
  assert.equal(response.status, 503);
  assert.equal(fetchCalls, 0);

  const after = breaker.getStatus();
  assert.equal(after.state, STATE.CLOSED);
  assert.equal(after.failureCount, before.failureCount);
  assert.equal(breaker.successCount, beforeSuccessCount);
});
