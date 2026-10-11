import { test } from "node:test";
import assert from "node:assert/strict";
import { parseSSEToResponsesOutput } from "../../open-sse/handlers/sseParser.ts";
import { runNonStreamingProviderLeg } from "../../open-sse/handlers/chatCore/nonStreamingProviderLeg.ts";

function sse(response: Record<string, unknown>) {
  return `event: response.failed\ndata: ${JSON.stringify({ type: "response.failed", response })}\n\n`;
}

test("buffered Responses parser preserves terminal failure details", () => {
  const error = { code: "rate_limit_exceeded", message: "Synthetic quota exhausted" };
  const parsed = parseSSEToResponsesOutput(
    sse({
      id: "resp_test",
      object: "response",
      status: "failed",
      output: [],
      error,
    }),
    "test-model"
  );
  assert.equal(parsed?.status, "failed");
  assert.deepEqual(parsed?.error, error);
});

for (const format of ["openai", "claude", "openai-responses"]) {
  for (const scenario of [
    { error: { code: "rate_limit_exceeded", message: "Synthetic quota exhausted" }, status: 429 },
    {
      error: { type: "context_length_exceeded", message: "Synthetic context too large" },
      status: 400,
    },
    { error: { code: "server_error", message: "Synthetic upstream failure" }, status: 502 },
  ]) {
    test(`buffered failure reaches ${format} as ${scenario.status}, not a successful empty leg`, async () => {
      const snapshot = {
        id: "resp_test",
        object: "response",
        status: "failed",
        output: [],
        error: scenario.error,
        usage: { input_tokens: 10, output_tokens: 2, total_tokens: 12 },
      };
      const result = await runNonStreamingProviderLeg({
        phase: "initial",
        provider: "codex",
        model: "test-model",
        connectionId: "test-connection",
        sourceBody: { model: "test-model", stream: false },
        sourceFormat: format,
        clientResponseFormat: format,
        targetFormat: "openai-responses",
        allowAccountRotation: false,
        allowModelFallback: false,
        setRequestWireState: () => {},
        executeProviderRequest: async () => ({
          response: new Response(sse(snapshot), {
            headers: { "content-type": "text/event-stream" },
          }),
          url: "https://example.invalid/responses",
          headers: {},
          transformedBody: {},
        }),
      });
      assert.equal(result.kind, "error");
      if (result.kind !== "error") return;
      assert.equal(result.receipt.httpStatus, scenario.status);
      assert.equal(result.receipt.termination, "provider_error");
      assert.equal(result.result.rawMessage, scenario.error.message);
      assert.deepEqual(result.result.upstreamErrorBody?.error, scenario.error);
      assert.equal(result.usage?.total_tokens, 12);
    });
  }
}

for (const format of ["openai", "claude", "openai-responses"]) {
  test(`failed Responses JSON with partial output is not returned as success and ${format} error is sanitized`, async () => {
    const result = await runNonStreamingProviderLeg({
      phase: "initial",
      provider: "codex",
      model: "test-model",
      connectionId: "test-connection",
      sourceBody: { stream: false },
      sourceFormat: format,
      clientResponseFormat: format,
      targetFormat: "openai-responses",
      allowAccountRotation: false,
      allowModelFallback: false,
      setRequestWireState: () => {},
      executeProviderRequest: async () => ({
        response: Response.json({
          object: "response",
          status: "failed",
          output: [{ type: "message", content: [{ type: "output_text", text: "Partial text" }] }],
          error: {
            code: "server_error",
            message: "Failure\n    at run (/app/private/server.js:1:2)",
          },
        }),
        url: "https://example.invalid/responses",
        headers: {},
        transformedBody: {},
      }),
    });
    assert.equal(result.kind, "error");
    if (result.kind !== "error") return;
    const body = await result.result.response.text();
    assert.ok(!body.includes("/app/private/server.js"));
    assert.equal(result.receipt.httpStatus, 502);
  });
}

test("a successful Responses snapshot is unchanged", async () => {
  const snapshot = {
    object: "response",
    status: "completed",
    error: null,
    output: [
      { type: "message", role: "assistant", content: [{ type: "output_text", text: "OK" }] },
    ],
  };
  const parsed = parseSSEToResponsesOutput(
    `data: ${JSON.stringify({ type: "response.completed", response: snapshot })}\n\n`,
    "test-model"
  );
  assert.equal(parsed?.status, "completed");
  assert.equal(JSON.stringify(parsed?.output), JSON.stringify(snapshot.output));
  assert.equal(parsed?.error, undefined);
});

test("failure without error details remains a 502 instead of a successful empty leg", async () => {
  const result = await runNonStreamingProviderLeg({
    phase: "follow-up",
    provider: "codex",
    model: "test-model",
    connectionId: "test-connection",
    sourceBody: { stream: false },
    sourceFormat: "claude",
    clientResponseFormat: "claude",
    targetFormat: "openai-responses",
    allowAccountRotation: false,
    allowModelFallback: false,
    setRequestWireState: () => {},
    executeProviderRequest: async () => ({
      response: new Response(sse({ object: "response", status: "failed", output: [] }), {
        headers: { "content-type": "text/event-stream" },
      }),
      url: "https://example.invalid/responses",
      headers: {},
      transformedBody: {},
    }),
  });
  assert.equal(result.kind, "error");
  assert.equal(result.receipt.httpStatus, 502);
});
