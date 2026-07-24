import test from "node:test";
import assert from "node:assert/strict";

const { protectMcpSseResponse } = await import("../../open-sse/mcp-server/httpTransport.ts");

test("POST JSON-RPC SSE response adds no-transform", () => {
  const response = protectMcpSseResponse(
    new Request("http://localhost/api/mcp/stream", {
      method: "POST",
      headers: { "Accept-Encoding": "gzip" },
    }),
    new Response("event: message\ndata: {}\n\n", {
      headers: {
        "Content-Type": "Text/Event-Stream; Charset=UTF-8",
        "Cache-Control": 'private="Authorization"',
        Vary: "Origin",
      },
    })
  );

  assert.equal(response.headers.get("content-encoding"), null);
  assert.equal(response.headers.get("cache-control"), 'private="Authorization", no-transform');
  assert.equal(response.headers.get("vary"), "Origin");
});

test("SDK-protected GET SSE response remains unchanged", () => {
  const response = new Response("event: ping\ndata: {}\n\n", {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });

  assert.strictEqual(
    protectMcpSseResponse(new Request("http://localhost/api/mcp/stream"), response),
    response
  );
});

test("non-SSE response remains unchanged", () => {
  const response = new Response("{}", {
    headers: {
      "Content-Type": "application/json",
      "Content-Encoding": "gzip",
      Vary: "Accept-Encoding",
    },
  });

  assert.strictEqual(
    protectMcpSseResponse(
      new Request("http://localhost/api/mcp/stream", { method: "POST" }),
      response
    ),
    response
  );
  assert.equal(response.headers.get("content-encoding"), "gzip");
  assert.equal(response.headers.get("vary"), "Accept-Encoding");
});
