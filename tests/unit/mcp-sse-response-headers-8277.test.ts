import test from "node:test";
import assert from "node:assert/strict";

const { protectMcpSseResponse } = await import(
  "../../open-sse/mcp-server/httpTransport.ts"
);

const encodings = ["gzip", "GZip", "gzip;q=0", "*"];

for (const acceptEncoding of encodings) {
  test(`GET SSE remains identity encoded for Accept-Encoding: ${acceptEncoding}`, async () => {
    let sent = false;
    const source = new ReadableStream<Uint8Array>({
      start(controller) {
        setTimeout(() => {
          sent = true;
          controller.enqueue(new TextEncoder().encode("event: ping\ndata: {}\n\n"));
          controller.close();
        }, 10);
      },
    });
    const response = protectMcpSseResponse(
      new Request("http://localhost/api/mcp/stream", {
        headers: { "Accept-Encoding": acceptEncoding },
      }),
      new Response(source, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache",
          Vary: "Origin",
        },
      })
    );

    assert.equal(response.headers.get("content-encoding"), null);
    assert.match(response.headers.get("cache-control") ?? "", /(?:^|,\s*)no-transform(?:,|$)/i);
    assert.equal(response.headers.get("x-accel-buffering"), "no");
    assert.equal(response.headers.get("vary"), "Origin");

    const reader = response.body?.getReader();
    assert.ok(reader);
    const first = await reader.read();
    assert.equal(sent, true);
    assert.equal(new TextDecoder().decode(first.value), "event: ping\ndata: {}\n\n");
  });
}

test("non-SSE and already encoded responses remain unchanged", () => {
  const request = new Request("http://localhost/api/mcp/stream", {
    headers: { "Accept-Encoding": "gzip" },
  });
  const json = new Response("{}", {
    headers: { "Content-Type": "application/json", Vary: "Accept-Encoding" },
  });
  const encoded = new Response("opaque", {
    headers: { "Content-Type": "application/json", "Content-Encoding": "br" },
  });

  assert.strictEqual(protectMcpSseResponse(request, json), json);
  assert.strictEqual(protectMcpSseResponse(request, encoded), encoded);
  assert.equal(json.headers.get("vary"), "Accept-Encoding");
  assert.equal(encoded.headers.get("content-encoding"), "br");
});

test("non-GET SSE response remains unchanged", () => {
  const request = new Request("http://localhost/api/mcp/stream", { method: "POST" });
  const response = new Response("data: {}\n\n", {
    headers: { "Content-Type": "text/event-stream", "Content-Encoding": "gzip" },
  });

  assert.strictEqual(protectMcpSseResponse(request, response), response);
});
