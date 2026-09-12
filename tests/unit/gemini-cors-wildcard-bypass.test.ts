import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { transformOpenAISSEToGeminiSSE } from "../../open-sse/translator/response/openai-to-gemini-sse";
import { applyCorsHeaders } from "../../src/server/cors/origins";

function buildUpstreamSSEResponse(): Response {
  const encoder = new TextEncoder();
  const sseBody = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode('data: {"choices":[{"delta":{"content":"hi"}}]}\n\n'));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(sseBody, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

describe("issue #12573 — openai-to-gemini-sse must not pre-set Access-Control-Allow-Origin", () => {
  it("does not hardcode a wildcard ACAO on the translated SSE response", () => {
    const geminiResponse = transformOpenAISSEToGeminiSSE(buildUpstreamSSEResponse(), "gemini-test-model");
    assert.equal(
      geminiResponse.headers.get("Access-Control-Allow-Origin"),
      null,
      "the translator must not set its own ACAO — the centralized CORS gate is the sole source"
    );
  });

  it("an anonymous request gets no Access-Control-Allow-Origin after the centralized gate runs (fail-closed)", () => {
    const geminiResponse = transformOpenAISSEToGeminiSSE(buildUpstreamSSEResponse(), "gemini-test-model");

    const anonymousRequest = new Request(
      "http://localhost:20128/v1beta/models/gemini-test:streamGenerateContent",
      { method: "POST" }
    );

    applyCorsHeaders(geminiResponse, anonymousRequest, /* relaxForTokenAuth */ true);

    assert.equal(
      geminiResponse.headers.get("Access-Control-Allow-Origin"),
      null,
      "expected no Access-Control-Allow-Origin header for an anonymous request (fail-closed policy)"
    );
  });

  it("a request carrying x-goog-api-key still gets the origin echoed by the centralized gate", () => {
    const geminiResponse = transformOpenAISSEToGeminiSSE(buildUpstreamSSEResponse(), "gemini-test-model");

    const authenticatedRequest = new Request(
      "http://localhost:20128/v1beta/models/gemini-test:streamGenerateContent",
      {
        method: "POST",
        headers: {
          "x-goog-api-key": "test-key",
          Origin: "http://localhost:3000",
        },
      }
    );

    applyCorsHeaders(geminiResponse, authenticatedRequest, /* relaxForTokenAuth */ true);

    assert.equal(
      geminiResponse.headers.get("Access-Control-Allow-Origin"),
      "http://localhost:3000",
      "expected the centralized gate to echo the request origin for a token-bearing request"
    );
  });
});
