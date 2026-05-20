import test from "node:test";
import assert from "node:assert/strict";

test("stripStaleForwardingHeaders removes content-encoding/content-length/transfer-encoding", async () => {
  const { stripStaleForwardingHeaders } = await import("../../open-sse/handlers/chatCore.ts");

  const headers = new Headers({
    "content-type": "application/json",
    "content-encoding": "gzip",
    "content-length": "1234",
    "transfer-encoding": "chunked",
    "x-request-id": "abc",
  });

  stripStaleForwardingHeaders(headers);

  assert.equal(headers.get("content-encoding"), null);
  assert.equal(headers.get("content-length"), null);
  assert.equal(headers.get("transfer-encoding"), null);
  // Unrelated headers must be preserved so downstream behavior (content-type
  // negotiation, request tracing) keeps working.
  assert.equal(headers.get("content-type"), "application/json");
  assert.equal(headers.get("x-request-id"), "abc");
});

test("stripStaleForwardingHeaders is case-insensitive", async () => {
  const { stripStaleForwardingHeaders } = await import("../../open-sse/handlers/chatCore.ts");

  const headers = new Headers();
  headers.set("Content-Encoding", "gzip");
  headers.set("Content-Length", "999");
  headers.set("Transfer-Encoding", "chunked");

  stripStaleForwardingHeaders(headers);

  assert.equal(headers.get("content-encoding"), null);
  assert.equal(headers.get("content-length"), null);
  assert.equal(headers.get("transfer-encoding"), null);
});

test("stripStaleForwardingHeaders is a no-op when headers are absent", async () => {
  const { stripStaleForwardingHeaders } = await import("../../open-sse/handlers/chatCore.ts");

  const headers = new Headers({ "content-type": "application/json" });
  stripStaleForwardingHeaders(headers);

  assert.equal(headers.get("content-type"), "application/json");
});
