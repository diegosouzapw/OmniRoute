/**
 * Behavioral matrix: adaptive-admission enforce rejection across the 10 real
 * shared LLM POST route modules. Uses a test-owned POST table (not production
 * registries/globs). Asserts standardized 503 contract, zero provider fetch,
 * provider-health isolation, and runtime reject accounting.
 *
 * DB isolation: only Node/assert + harness are static imports; createChatPipelineHarness
 * must run before any dynamic runtime/resource/DB/route import so DATA_DIR is set first.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("adaptive-admission-route-matrix");
assert.ok(
  harness.TEST_DATA_DIR.includes("adaptive-admission-route-matrix") ||
    harness.TEST_DATA_DIR.includes("omniroute-"),
  "task-private harness DATA_DIR must be set before DB imports"
);
console.log(`[adaptive-admission-route-matrix] DATA_DIR=${harness.TEST_DATA_DIR}`);

const { BaseExecutor, resetStorage, seedConnection, cleanup } = harness;

const {
  getAdaptiveAdmissionRuntime,
  reloadAdaptiveAdmissionRuntime,
  resetAdaptiveAdmissionRuntimeForTests,
} = await import("../../open-sse/services/admission/runtime.ts");
const { reloadResourcePressureRuntime } = await import("../../open-sse/utils/resourcePressure.ts");
const { getProviderConnectionById } = await import("../../src/lib/db/providers.ts");
const { getCircuitBreaker, resetAllCircuitBreakers, STATE } =
  await import("../../src/shared/utils/circuitBreaker.ts");
const core = await import("../../src/lib/db/core.ts");
const relayProxies = await import("../../src/lib/db/relayProxies.ts");

const chatCompletionsRoute = await import("../../src/app/api/v1/chat/completions/route.ts");
const messagesRoute = await import("../../src/app/api/v1/messages/route.ts");
const responsesRoute = await import("../../src/app/api/v1/responses/route.ts");
const responsesCatchAllRoute = await import("../../src/app/api/v1/responses/[...path]/route.ts");
const completionsRoute = await import("../../src/app/api/v1/completions/route.ts");
const ollamaRoute = await import("../../src/app/api/v1/api/chat/route.ts");
const antigravityRoute = await import("../../src/app/api/v1/antigravity/route.ts");
const providerPinnedRoute =
  await import("../../src/app/api/v1/providers/[provider]/chat/completions/route.ts");
const relayRoute = await import("../../src/app/api/v1/relay/chat/completions/route.ts");
const geminiRoute = await import("../../src/app/api/v1beta/models/[...path]/route.ts");

const originalFetch = globalThis.fetch;
const MiB = 1024 ** 2;
const MODEL = "openai/gpt-4o-mini";
const ADMISSION_MESSAGE = "Request too large for current capacity";

type RouteCase = {
  name: string;
  invoke: (request: Request) => Promise<Response>;
  buildRequest: () => Request;
};

function padContent(label: string, targetBytes = 2048): string {
  const base = `${label}-admission-matrix-`;
  return base + "y".repeat(Math.max(0, targetBytes - base.length));
}

function jsonRequest(
  url: string,
  body: unknown,
  headers: Record<string, string> = {},
  signal?: AbortSignal
): Request {
  return new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: JSON.stringify(body),
    signal,
  });
}

function chatBody(label: string) {
  return {
    model: MODEL,
    stream: false,
    messages: [{ role: "user", content: padContent(label) }],
  };
}

function messagesBody(label: string) {
  return {
    model: MODEL,
    max_tokens: 64,
    stream: false,
    messages: [{ role: "user", content: padContent(label) }],
  };
}

function responsesBody(label: string) {
  return {
    model: MODEL,
    stream: false,
    input: [{ role: "user", content: padContent(label) }],
  };
}

function completionsBody(label: string) {
  return {
    model: MODEL,
    stream: false,
    prompt: padContent(label, 3072),
  };
}

function antigravityBody(label: string) {
  return {
    model: MODEL,
    project: "admission-matrix-project",
    request: {
      contents: [{ role: "user", parts: [{ text: padContent(label) }] }],
    },
  };
}

function geminiBody(label: string) {
  return {
    contents: [{ role: "user", parts: [{ text: padContent(label) }] }],
  };
}

function insertRelayToken(rawToken: string) {
  const db = core.getDbInstance();
  const id = "rl_admission_matrix";
  const now = Math.floor(Date.now() / 1000);
  const tokenHash = createHash("sha256").update(rawToken).digest("hex");
  db.prepare(
    `
    INSERT INTO relay_tokens (id, name, token_hash, token_prefix, description, combo_id, allowed_models,
      max_tokens_per_request, max_requests_per_minute, max_requests_per_day, max_cost_per_day,
      enabled, created_at, updated_at, expires_at, metadata)
    VALUES (?, ?, ?, ?, '', NULL, '["*"]', 128000, 1000, 100000, 0, 1, ?, ?, NULL, '{}')
  `
  ).run(id, "admission-matrix-relay", tokenHash, "rl_matrix", now, now);
  const token = relayProxies.getRelayToken(id);
  if (!token) throw new Error("failed to insert matrix relay token");
  return { token, rawToken };
}

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
      cgroup: { currentBytes: null, maxBytes: null, highBytes: null, events: null },
      psi: null,
    }),
  });
}

function reloadEnforceOversized() {
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

function breakerSnapshot(breaker: ReturnType<typeof getCircuitBreaker>) {
  const status = breaker.getStatus();
  return {
    state: status.state,
    failureCount: status.failureCount,
    successCount: breaker.successCount,
  };
}

async function assertAdmissionOversized(response: Response, fetchCalls: number) {
  assert.equal(response.status, 503);
  assert.equal(fetchCalls, 0);
  const contentType = String(response.headers.get("content-type") || "");
  assert.match(contentType, /application\/json/i);
  const payload = (await response.json()) as {
    error?: { code?: string; type?: string; message?: string };
  };
  assert.equal(payload.error?.type, "server_error");
  assert.equal(payload.error?.code, "admission_oversized");
  assert.equal(payload.error?.message, ADMISSION_MESSAGE);
}

// Test-owned table of the exact 10 canonical shared LLM POST handlers.
const ROUTE_CASES: RouteCase[] = [
  {
    name: "chat.completions",
    invoke: (request) => chatCompletionsRoute.POST(request),
    buildRequest: () =>
      jsonRequest("http://localhost/v1/chat/completions", chatBody("chat-completions")),
  },
  {
    name: "messages",
    invoke: (request) => messagesRoute.POST(request, {}),
    buildRequest: () => jsonRequest("http://localhost/v1/messages", messagesBody("messages")),
  },
  {
    name: "responses",
    invoke: (request) => responsesRoute.POST(request, {}),
    buildRequest: () =>
      jsonRequest("http://localhost/v1/responses", responsesBody("responses"), {
        Accept: "application/json",
      }),
  },
  {
    name: "responses.catch-all",
    invoke: (request) => responsesCatchAllRoute.POST(request),
    buildRequest: () =>
      jsonRequest(
        "http://localhost/v1/responses/input_items",
        responsesBody("responses-catch-all"),
        { Accept: "application/json" }
      ),
  },
  {
    name: "completions.legacy",
    invoke: (request) => completionsRoute.POST(request),
    buildRequest: () =>
      jsonRequest("http://localhost/v1/completions", completionsBody("legacy-completions")),
  },
  {
    name: "ollama.api.chat",
    invoke: (request) => ollamaRoute.POST(request),
    buildRequest: () => jsonRequest("http://localhost/api/chat", chatBody("ollama")),
  },
  {
    name: "antigravity",
    invoke: (request) => antigravityRoute.POST(request),
    buildRequest: () =>
      jsonRequest("http://localhost/v1/antigravity", antigravityBody("antigravity")),
  },
  {
    name: "providers.pinned",
    invoke: (request) =>
      providerPinnedRoute.POST(request, { params: Promise.resolve({ provider: "openai" }) }),
    buildRequest: () =>
      jsonRequest("http://localhost/v1/providers/openai/chat/completions", {
        model: "gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: padContent("provider-pinned") }],
      }),
  },
  {
    name: "relay.chat.completions",
    invoke: (request) => relayRoute.POST(request),
    buildRequest: () => {
      throw new Error("relay buildRequest is set per-test after token insert");
    },
  },
  {
    name: "gemini.v1beta.generateContent",
    invoke: (request) =>
      geminiRoute.POST(request, {
        params: Promise.resolve({ path: ["openai", "gpt-4o-mini:generateContent"] }),
      }),
    buildRequest: () =>
      jsonRequest(
        "http://localhost/v1beta/models/openai/gpt-4o-mini:generateContent",
        geminiBody("gemini")
      ),
  },
];

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
  resetAllCircuitBreakers();
  resetAdaptiveAdmissionRuntimeForTests();
  reloadNormalResourcePressure();
  reloadEnforceOversized();
  globalThis.fetch = originalFetch;
  delete process.env.OMNIROUTE_RELAY_BACKEND;
  delete process.env.RELAY_ROUTING_BACKEND;
});

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  resetAdaptiveAdmissionRuntimeForTests();
  delete process.env.OMNIROUTE_RELAY_BACKEND;
  delete process.env.RELAY_ROUTING_BACKEND;
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  resetAdaptiveAdmissionRuntimeForTests();
  await cleanup();
});

test(
  "adaptive admission enforce rejects all 10 shared LLM POST routes with standardized contract",
  { timeout: 30_000 },
  async () => {
    const connection = await seedConnection("openai", {
      name: "admission-matrix-openai",
      apiKey: "sk-openai-admission-matrix",
    });
    const connectionId = String(connection.id);
    const beforeConnection = connectionFailureState(
      (await getProviderConnectionById(connectionId)) as Record<string, unknown> | null
    );
    const breaker = getCircuitBreaker("openai");
    const beforeBreaker = breakerSnapshot(breaker);
    assert.equal(beforeBreaker.state, STATE.CLOSED);

    const rawRelayToken = `relay_matrix_${createHash("sha256").update("admission").digest("hex").slice(0, 24)}`;
    insertRelayToken(rawRelayToken);
    process.env.OMNIROUTE_RELAY_BACKEND = "ts";

    const cases: RouteCase[] = ROUTE_CASES.map((routeCase) => {
      if (routeCase.name !== "relay.chat.completions") return routeCase;
      return {
        ...routeCase,
        buildRequest: () =>
          jsonRequest("http://localhost/api/v1/relay/chat/completions", chatBody("relay"), {
            Authorization: `Bearer ${rawRelayToken}`,
          }),
      };
    });

    assert.equal(cases.length, 10);

    let fetchCalls = 0;
    globalThis.fetch = async () => {
      fetchCalls += 1;
      return new Response("provider must not run under admission reject", { status: 500 });
    };

    const beforeRuntime = getAdaptiveAdmissionRuntime().snapshot();
    assert.equal(beforeRuntime.activeCount, 0);
    assert.equal(beforeRuntime.queuedCount, 0);

    for (const routeCase of cases) {
      const rejectedBefore = getAdaptiveAdmissionRuntime().snapshot().rejectedCount;
      const response = await routeCase.invoke(routeCase.buildRequest());
      await assertAdmissionOversized(response, fetchCalls);

      const afterCase = getAdaptiveAdmissionRuntime().snapshot();
      assert.equal(
        afterCase.rejectedCount,
        rejectedBefore + 1,
        `${routeCase.name}: rejectedCount must increment once`
      );
      assert.equal(afterCase.activeCount, 0, `${routeCase.name}: activeCount must return to 0`);
      assert.equal(afterCase.queuedCount, 0, `${routeCase.name}: queuedCount must return to 0`);
      assert.equal(fetchCalls, 0, `${routeCase.name}: fetch must stay 0`);
    }

    const afterRuntime = getAdaptiveAdmissionRuntime().snapshot();
    assert.equal(afterRuntime.rejectedCount, beforeRuntime.rejectedCount + cases.length);
    assert.equal(afterRuntime.activeCount, 0);
    assert.equal(afterRuntime.queuedCount, 0);
    assert.equal(fetchCalls, 0);

    assert.deepEqual(
      connectionFailureState(
        (await getProviderConnectionById(connectionId)) as Record<string, unknown> | null
      ),
      beforeConnection
    );
    assert.deepEqual(breakerSnapshot(breaker), beforeBreaker);
  }
);

test(
  "provider-pinned route propagates request AbortSignal into admission rejection",
  { timeout: 5_000 },
  async () => {
    await seedConnection("openai", {
      name: "admission-abort-openai",
      apiKey: "sk-openai-admission-abort",
    });
    reloadEnforceOversized();

    let fetchCalls = 0;
    globalThis.fetch = async () => {
      fetchCalls += 1;
      return new Response("provider must not run", { status: 500 });
    };

    const ac = new AbortController();
    ac.abort();
    const response = await providerPinnedRoute.POST(
      jsonRequest(
        "http://localhost/v1/providers/openai/chat/completions",
        {
          model: "gpt-4o-mini",
          stream: false,
          messages: [{ role: "user", content: padContent("abort-provider") }],
        },
        {},
        ac.signal
      ),
      { params: Promise.resolve({ provider: "openai" }) }
    );

    assert.equal(response.status, 499);
    assert.equal(fetchCalls, 0);
    const payload = (await response.json()) as { error?: { code?: string; type?: string } };
    assert.equal(payload.error?.code, "admission_aborted");
    assert.equal(payload.error?.type, "client_disconnected");
    assert.equal(getAdaptiveAdmissionRuntime().snapshot().activeCount, 0);
  }
);
