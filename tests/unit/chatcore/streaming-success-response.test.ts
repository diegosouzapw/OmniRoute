import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const barrelPath = path.resolve(here, "../../../open-sse/handlers/chatCore.ts");

test("streamingSuccessResponse exports materializeStreamingSuccessResponse", async () => {
  const mod = await import("../../../open-sse/handlers/chatCore/streamingSuccessResponse.ts");
  assert.equal(typeof mod.materializeStreamingSuccessResponse, "function");
});

test("chatCore barrel delegates streaming success materialization", () => {
  const src = fs.readFileSync(barrelPath, "utf8");
  assert.equal(
    src.includes("materializeStreamingSuccessResponse"),
    true,
    "chatCore barrel must import and call materializeStreamingSuccessResponse"
  );
  assert.equal(
    src.includes("const onStreamComplete = makeOnStreamComplete({"),
    false,
    "makeOnStreamComplete call must move out of chatCore barrel"
  );
  assert.equal(
    src.includes("const finalStream = assembleStreamingPipeline({"),
    false,
    "assembleStreamingPipeline call must move out of chatCore barrel"
  );
});

test("materializeStreamingSuccessResponse builds streaming pipeline and returns Response", async () => {
  const { materializeStreamingSuccessResponse } =
    await import("../../../open-sse/handlers/chatCore/streamingSuccessResponse.ts");

  let successCalled = false;
  let releaseCalled = false;
  let pipelineErrorHandler: unknown = null;
  let clientDisconnectHandler: unknown = null;

  const mockUpstreamBody = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode('data: {"test":1}\n\n'));
      controller.close();
    },
  });
  const mockUpstreamResponse = new Response(mockUpstreamBody, {
    status: 200,
    headers: new Headers({ "content-type": "text/event-stream" }),
  });

  const { createStreamController } = await import("../../../open-sse/utils/streamHandler.ts");
  const streamController = createStreamController();

  const res = await materializeStreamingSuccessResponse({
    providerResponse: mockUpstreamResponse,
    onRequestSuccess: () => {
      successCalled = true;
    },
    provider: "openai",
    model: "gpt-4o",
    pendingRequestId: "req-test-12345",
    body: { model: "gpt-4o", messages: [{ role: "user", content: "hi" }] },
    persistAttemptLogs: () => {},
    getCurrentConnectionId: () => "conn-123",
    clientResponseFormat: "openai",
    targetFormat: "openai",
    isResponsesEndpoint: false,
    isDroidCLI: false,
    reasoningCacheScope: null,
    contextEditingEnabled: false,
    skillRequestId: "skill-1",
    startTime: Date.now(),
    isCombo: false,
    traceId: "trace-123",
    calculateCost: async () => 0,
    recordCost: () => {},
    videoBridgeObserved: false,
    extractFacts: () => {},
    semanticCacheEnabled: false,
    bodyForCacheWrite: null,
    resolveReportedServiceTier: () => null,
    attachCompressionUsageReceiptAfterAnalytics: () => {},
    routingFinishReason: () => null,
    effectiveServiceTier: "standard",
    persistFailureUsage: () => {},
    setOnPipelineStreamError: (fn) => {
      pipelineErrorHandler = fn;
    },
    setOnClientDisconnectFinalize: (fn) => {
      clientDisconnectHandler = fn;
    },
    streamController,
    streamReadinessPolicy: { timeoutMs: 30000 },
    releaseTurnExecution: () => {
      releaseCalled = true;
    },
  });

  assert.ok(res instanceof Response, "must return a Response instance");
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("x-omniroute-request-id"), "req-test-12345");
  assert.equal(successCalled, true, "onRequestSuccess must be called");
  assert.equal(typeof pipelineErrorHandler, "function", "pipelineErrorHandler must be registered");
  assert.equal(
    typeof clientDisconnectHandler,
    "function",
    "clientDisconnectHandler must be registered"
  );

  // Drain the response stream to trigger releaseTurnExecution
  const reader = res.body!.getReader();
  while (true) {
    const { done } = await reader.read();
    if (done) break;
  }
  assert.equal(releaseCalled, true, "releaseTurnExecution must be invoked when stream finishes");
});
