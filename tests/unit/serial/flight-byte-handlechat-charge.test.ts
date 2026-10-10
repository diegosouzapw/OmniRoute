/**
 * Task 4 handleChat flight charge: real POST /v1/messages with stamped
 * recorded body bytes. Serial so the process-wide ledger is not shared
 * with concurrent unit files.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("flight-byte-handlechat-charge");
assert.ok(
  harness.TEST_DATA_DIR.includes("flight-byte-handlechat-charge") ||
    harness.TEST_DATA_DIR.includes("omniroute-"),
  "task-private harness DATA_DIR must be set before DB imports"
);

const { BaseExecutor, resetStorage, seedConnection, cleanup } = harness;
const { DEFAULT_STREAM_FLOOR_DIVISOR, DEFAULT_STREAM_HOLD_FACTOR } = await import(
  "../../../src/shared/middleware/admissionBudget.ts"
);
const { ChatAdmissionController, perConnectionAdmissionController } = await import(
  "../../../src/shared/middleware/chatBodyAdmission.ts"
);
const { setFlightChargeControllerForTests } = await import(
  "../../../src/shared/middleware/chargeFlightForChat.ts"
);
const messagesRoute = await import("../../../src/app/api/v1/messages/route.ts");
const completionsRoute = await import("../../../src/app/api/v1/chat/completions/route.ts");
const geminiRoute = await import("../../../src/app/api/v1beta/models/[...path]/route.ts");
const {
  getAdaptiveAdmissionRuntime,
  reloadAdaptiveAdmissionRuntime,
  resetAdaptiveAdmissionRuntimeForTests,
} = await import("../../../open-sse/services/admission/runtime.ts");
const { reloadResourcePressureRuntime } = await import(
  "../../../open-sse/utils/resourcePressure.ts"
);

const originalFetch = globalThis.fetch;
const MiB = 1024 ** 2;
const MODEL = "openai/gpt-4o-mini";

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

function hangingSseResponse(): Response {
  const chunk =
    'data: {"id":"chatcmpl-flight","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"hi"},"finish_reason":null}]}\n\n';
  return new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(chunk));
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } }
  );
}

function smallStreamMessagesRequest(): Request {
  const body = JSON.stringify({
    model: MODEL,
    max_tokens: 64,
    stream: true,
    messages: [{ role: "user", content: "hi" }],
  });
  return new Request("http://localhost/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      "Content-Length": String(Buffer.byteLength(body)),
    },
    body,
  });
}

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
  resetAdaptiveAdmissionRuntimeForTests();
  reloadNormalResourcePressure();
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
  setFlightChargeControllerForTests(null);
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  resetAdaptiveAdmissionRuntimeForTests();
  await harness.cleanup();
});

test("Test 2: 100 STREAM_FLOOR holds then small /v1/messages stream is 503 flight_bytes_budget", async () => {
  await seedConnection("openai", { apiKey: "test-api-key-flight-2" });

  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return hangingSseResponse();
  };

  const controller = perConnectionAdmissionController.getController("anonymous");
  const floor = Math.floor(controller.maxFlightBytes / DEFAULT_STREAM_FLOOR_DIVISOR);
  assert.ok(floor > 0, "STREAM_FLOOR must be positive");

  const held = [];
  for (let i = 0; i < DEFAULT_STREAM_FLOOR_DIVISOR; i++) {
    const lease = controller.tryAcquireFlight(floor);
    assert.ok(lease, `STREAM_FLOOR hold ${i + 1} of ${DEFAULT_STREAM_FLOOR_DIVISOR} must fit`);
    held.push(lease);
  }
  assert.equal(controller.flightWaiting, 0);
  assert.ok(
    controller.maxFlightBytes - controller.flightBytes < floor,
    "100 STREAM_FLOOR holds must leave less than one floor of headroom"
  );

  try {
    const response = await messagesRoute.POST(smallStreamMessagesRequest(), {});
    assert.equal(response.status, 503);
    assert.match(String(response.headers.get("content-type") || ""), /application\/json/i);
    assert.ok(response.headers.get("Retry-After"));
    const payload = (await response.json()) as {
      error?: { code?: string; type?: string; reason?: string };
    };
    assert.equal(payload.error?.type, "server_error");
    assert.equal(payload.error?.code, "chat_admission_busy");
    assert.equal(payload.error?.reason, "flight_bytes_budget");
    assert.equal(fetchCalls, 0);
    assert.equal(getAdaptiveAdmissionRuntime().snapshot().activeCount, 0);
  } finally {
    for (const lease of held) lease.release();
  }

  assert.equal(controller.flightBytes, 0);
});

function streamMessagesRequest(body: unknown): Request {
  const json = JSON.stringify(body);
  return new Request("http://localhost/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
      "Content-Length": String(Buffer.byteLength(json)),
    },
    body: json,
  });
}

test("Test 5: STREAM_CEILING miss is 413 not ingest-budget copy", async () => {
  await seedConnection("openai", { apiKey: "test-api-key-flight-ceiling" });
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return hangingSseResponse();
  };

  const tiny = new ChatAdmissionController(20, undefined, undefined, undefined, undefined, {
    maxFlightBytes: 1000,
  });
  setFlightChargeControllerForTests(tiny);
  const before = tiny.flightBytes;
  const bodyBytes = 400;
  assert.ok(
    bodyBytes * DEFAULT_STREAM_HOLD_FACTOR > Math.floor(1000 / DEFAULT_STREAM_HOLD_FACTOR),
    "fixture must sit above STREAM_CEILING"
  );

  const response = await messagesRoute.POST(
    streamMessagesRequest({
      model: MODEL,
      max_tokens: 64,
      stream: true,
      messages: [{ role: "user", content: "y".repeat(bodyBytes) }],
    }),
    {}
  );
  const text = await response.text();
  assert.equal(response.status, 413);
  assert.doesNotMatch(text, /ingest/i);
  assert.match(text, /in-flight SSE hold budget/i);
  const payload = JSON.parse(text) as { error?: { code?: string; reason?: string } };
  assert.equal(payload.error?.code, "body_exceeds_budget");
  assert.equal(payload.error?.reason, "flight_ceiling");
  assert.equal(tiny.flightBytes, before);
  assert.equal(fetchCalls, 0);
});

test("Test 12: 200 short messages on a full flight ledger 503 with no waiters", async () => {
  await seedConnection("openai", { apiKey: "test-api-key-flight-heavy" });
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return hangingSseResponse();
  };

  const controller = perConnectionAdmissionController.getController("anonymous");
  const floor = Math.floor(controller.maxFlightBytes / DEFAULT_STREAM_FLOOR_DIVISOR);
  const held = [];
  for (let i = 0; i < DEFAULT_STREAM_FLOOR_DIVISOR; i++) {
    const lease = controller.tryAcquireFlight(floor);
    assert.ok(lease);
    held.push(lease);
  }

  const messages = Array.from({ length: 200 }, (_, i) => ({
    role: i % 2 === 0 ? "user" : "assistant",
    content: "x",
  }));
  const json = JSON.stringify({ model: MODEL, max_tokens: 64, stream: true, messages });
  assert.ok(Buffer.byteLength(json) < 256 * 1024, "body must stay under large-body threshold");

  try {
    const response = await messagesRoute.POST(
      new Request("http://localhost/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          "Content-Length": String(Buffer.byteLength(json)),
        },
        body: json,
      }),
      {}
    );
    assert.equal(response.status, 503);
    const payload = (await response.json()) as { error?: { reason?: string } };
    assert.equal(payload.error?.reason, "flight_bytes_budget");
    assert.equal(controller.flightWaiting, 0);
    assert.equal(fetchCalls, 0);
  } finally {
    for (const lease of held) lease.release();
  }
});

test("Test 13: full ledger messages POST 503s without acquireFlightWithin", async () => {
  await seedConnection("openai", { apiKey: "test-api-key-flight-keepalive" });
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return hangingSseResponse();
  };

  const controller = perConnectionAdmissionController.getController("anonymous");
  const floor = Math.floor(controller.maxFlightBytes / DEFAULT_STREAM_FLOOR_DIVISOR);
  const held = [];
  for (let i = 0; i < DEFAULT_STREAM_FLOOR_DIVISOR; i++) {
    const lease = controller.tryAcquireFlight(floor);
    assert.ok(lease);
    held.push(lease);
  }

  const started = Date.now();
  try {
    const response = await messagesRoute.POST(smallStreamMessagesRequest(), {});
    const elapsed = Date.now() - started;
    assert.equal(response.status, 503);
    assert.ok(response.headers.get("Retry-After"));
    const payload = (await response.json()) as { error?: { reason?: string } };
    assert.equal(payload.error?.reason, "flight_bytes_budget");
    assert.ok(elapsed < 5_000, `must not queue; elapsed=${elapsed}`);
    assert.equal(controller.flightWaiting, 0);
    assert.equal(fetchCalls, 0);
  } finally {
    for (const lease of held) lease.release();
  }
});

function mixedAcceptMessagesRequest(body: unknown, extraHeaders: Record<string, string> = {}): Request {
  const json = JSON.stringify(body);
  return new Request("http://localhost/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      "Content-Length": String(Buffer.byteLength(json)),
      ...extraHeaders,
    },
    body: json,
  });
}

function fillFlight(controller: InstanceType<typeof ChatAdmissionController>) {
  const floor = Math.floor(controller.maxFlightBytes / DEFAULT_STREAM_FLOOR_DIVISOR);
  const held = [];
  for (let i = 0; i < DEFAULT_STREAM_FLOOR_DIVISOR; i++) {
    const lease = controller.tryAcquireFlight(floor);
    assert.ok(lease);
    held.push(lease);
  }
  return held;
}

async function waitForFlightDrain(
  controller: InstanceType<typeof ChatAdmissionController>,
  timeoutMs = 2_000
): Promise<void> {
  const started = Date.now();
  while (controller.flightBytes > 0) {
    assert.ok(Date.now() - started < timeoutMs, `flightBytes still ${controller.flightBytes}`);
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
}

test("Test 11: mixed Accept messages, completions, and Gemini share one flight ledger; usage command stays JSON", async () => {
  await seedConnection("openai", { apiKey: "test-api-key-flight-shared" });
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return hangingSseResponse();
  };

  const controller = perConnectionAdmissionController.getController("anonymous");
  const before = controller.flightBytes;
  const live: Response[] = [];

  try {
    const messagesRes = await messagesRoute.POST(
      mixedAcceptMessagesRequest({
        model: MODEL,
        max_tokens: 64,
        messages: [{ role: "user", content: "hi-messages" }],
      }),
      {}
    );
    live.push(messagesRes);
    assert.equal(messagesRes.status, 200);
    assert.ok(controller.flightBytes > before, "mixed Accept /v1/messages must charge");

    const afterMessages = controller.flightBytes;
    const completionsBody = JSON.stringify({
      model: MODEL,
      stream: true,
      messages: [{ role: "user", content: "hi-completions" }],
    });
    const completionsRes = await completionsRoute.POST(
      new Request("http://localhost/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          "Content-Length": String(Buffer.byteLength(completionsBody)),
        },
        body: completionsBody,
      })
    );
    live.push(completionsRes);
    assert.equal(completionsRes.status, 200);
    assert.ok(controller.flightBytes > afterMessages, "completions stream must charge the same ledger");

    const afterCompletions = controller.flightBytes;
    const geminiBody = {
      contents: [{ role: "user", parts: [{ text: "hi-gemini" }] }],
    };
    const geminiJson = JSON.stringify(geminiBody);
    const geminiRes = await geminiRoute.POST(
      new Request("http://localhost/v1beta/models/openai/gpt-4o-mini:streamGenerateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": String(Buffer.byteLength(geminiJson)),
        },
        body: geminiJson,
      }),
      { params: Promise.resolve({ path: ["openai", "gpt-4o-mini:streamGenerateContent"] }) }
    );
    live.push(geminiRes);
    assert.equal(geminiRes.status, 200);
    assert.ok(controller.flightBytes > afterCompletions, "Gemini streamGenerateContent must charge the same ledger");
  } finally {
    for (const res of live) {
      try {
        await res.body?.cancel();
      } catch {
        /* ignore */
      }
    }
  }
  await waitForFlightDrain(controller);

  const held = fillFlight(controller);
  const fullBytes = controller.flightBytes;
  let tryCalls = 0;
  const origTry = controller.tryAcquireFlight.bind(controller);
  controller.tryAcquireFlight = (bytes: number) => {
    tryCalls += 1;
    return origTry(bytes);
  };

  try {
    const usageOnFull = await messagesRoute.POST(
      mixedAcceptMessagesRequest({
        model: MODEL,
        max_tokens: 64,
        messages: [{ role: "user", content: "@@om-usage" }],
      }),
      {}
    );
    assert.equal(usageOnFull.status, 200);
    assert.match(String(usageOnFull.headers.get("content-type") || ""), /application\/json/i);
    assert.equal(tryCalls, 0);
    assert.equal(controller.flightBytes, fullBytes);
    assert.equal(fetchCalls, 3);
  } finally {
    controller.tryAcquireFlight = origTry;
    for (const lease of held) lease.release();
  }

  const emptyBytes = controller.flightBytes;
  tryCalls = 0;
  const origTry2 = controller.tryAcquireFlight.bind(controller);
  controller.tryAcquireFlight = (bytes: number) => {
    tryCalls += 1;
    return origTry2(bytes);
  };
  try {
    const usageOnEmpty = await messagesRoute.POST(
      mixedAcceptMessagesRequest({
        model: MODEL,
        max_tokens: 64,
        messages: [{ role: "user", content: "@@om-usage" }],
      }),
      {}
    );
    assert.equal(usageOnEmpty.status, 200);
    assert.match(String(usageOnEmpty.headers.get("content-type") || ""), /application\/json/i);
    assert.equal(tryCalls, 0);
    assert.equal(controller.flightBytes, emptyBytes);
    assert.equal(fetchCalls, 3);
  } finally {
    controller.tryAcquireFlight = origTry2;
  }
});
