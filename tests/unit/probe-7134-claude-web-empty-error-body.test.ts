import test from "node:test";
import assert from "node:assert/strict";

// Issue #7134 — claude-web reported "Claude Web API error (400) with no
// response body" even when Claude's upstream DID send a real JSON error body.
//
// The browser transport must peek a requested stream to distinguish SSE from
// an upstream JSON error. Once it decides the response is not SSE, it must
// buffer the same native body stream without discarding the bytes it peeked.
//
// This test injects a fake `client` (matching the `{ request }` shape
// tlsFetchStreaming accepts for DI). No experimental module mocks are needed:
// the test exercises the production wreq response-stream path directly.

const { tlsFetchStreaming } = await import("../../open-sse/services/claudeTlsClient.ts");

const REAL_CLAUDE_ERROR_BODY = JSON.stringify({
  type: "error",
  error: {
    type: "invalid_request_error",
    message: "This conversation UUID does not exist or you do not have access to it.",
  },
});

function makeFakeClient(status: number, bodyOnFile: string) {
  return {
    request: async () =>
      new Response(
        new ReadableStream<Uint8Array>({
          start(controller) {
            controller.enqueue(new TextEncoder().encode(bodyOnFile));
            controller.close();
          },
        }),
        { status }
      ),
  };
}

test("issue #7134: tlsFetchStreaming surfaces the real error body for a non-SSE 400 under stream:true", async () => {
  const client = makeFakeClient(400, REAL_CLAUDE_ERROR_BODY);

  const result = await tlsFetchStreaming(
    client,
    "https://claude.ai/api/organizations/x/chat_conversations/y/completion",
    { method: "POST" },
    "[DONE]",
    null,
    5_000
  );

  assert.equal(result.status, 400);
  assert.equal(result.body, null);
  assert.ok(
    result.text && result.text.includes("does not exist or you do not have access to it"),
    `expected the real Claude error body to be surfaced, got: ${JSON.stringify(result.text)}`
  );
});

test("issue #7134: tlsFetchStreaming still uses r.body when the native client DOES populate it", async () => {
  const client = {
    request: async () => ({
      status: 403,
      headers: {},
      body: "populated body from native client",
    }),
  };

  const result = await tlsFetchStreaming(
    client,
    "https://claude.ai/api/organizations/x/chat_conversations/y/completion",
    { method: "POST" },
    "[DONE]",
    null,
    5_000
  );

  assert.equal(result.status, 403);
  assert.equal(result.text, "populated body from native client");
});
