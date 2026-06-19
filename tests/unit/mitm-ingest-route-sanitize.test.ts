import test from "node:test";
import assert from "node:assert/strict";

// The internal ingest endpoint receives raw bodies/headers from the standalone
// proxy (server.cjs) over the token-gated loopback. It MUST mask secrets before
// the entry enters the traffic buffer (Hard Rule #12). The token must be set
// BEFORE the route module is first imported so getIngestToken() caches it.
const INGEST_TOKEN = "test-ingest-token-1234567890";
process.env.INSPECTOR_INTERNAL_INGEST_TOKEN = INGEST_TOKEN;

const INGEST_URL = "http://localhost:20128/api/tools/traffic-inspector/internal/ingest";

test("ingest masks bearer tokens / secrets before they enter the buffer", async () => {
  const { POST } = await import("@/app/api/tools/traffic-inspector/internal/ingest/route");
  const { globalTrafficBuffer } = await import("@/mitm/inspector/buffer");
  globalTrafficBuffer.clear();

  const SECRET = "sk-supersecret-DEADBEEF0123456789";
  const entry = {
    id: "33333333-3333-4333-8333-333333333333",
    source: "agent-bridge",
    agent: "antigravity",
    timestamp: "2026-06-19T00:00:00.000Z",
    method: "POST",
    host: "daily-cloudcode-pa.googleapis.com",
    path: "/v1internal:streamGenerateContent",
    requestHeaders: {
      authorization: `Bearer ${SECRET}`,
      "content-type": "application/json",
    },
    requestBody: `{"auth":"Bearer ${SECRET}"}`,
    requestSize: 40,
    responseHeaders: { "content-type": "text/event-stream" },
    responseBody: null,
    responseSize: 0,
    status: 200,
    mappedModel: "glm-5.2",
    sourceModel: "gemini-2.5-pro",
  };

  const res = await POST(
    new Request(INGEST_URL, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${INGEST_TOKEN}` },
      body: JSON.stringify(entry),
    })
  );

  assert.equal(res.status, 200);

  const list = globalTrafficBuffer.list();
  assert.equal(list.length, 1);
  // The captured entry must be present (source/model preserved)...
  assert.equal(list[0].source, "agent-bridge");
  assert.equal(list[0].mappedModel, "glm-5.2");
  // ...but the raw secret must NOT survive anywhere in the stored entry.
  const stored = JSON.stringify(list[0]);
  assert.ok(!stored.includes(SECRET), "bearer secret must be masked out of the buffered entry");

  globalTrafficBuffer.clear();
});

test("ingest rejects a wrong token with 403 (and does not buffer)", async () => {
  const { POST } = await import("@/app/api/tools/traffic-inspector/internal/ingest/route");
  const { globalTrafficBuffer } = await import("@/mitm/inspector/buffer");
  globalTrafficBuffer.clear();

  const res = await POST(
    new Request(INGEST_URL, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: "Bearer wrong-token" },
      body: JSON.stringify({ id: "x" }),
    })
  );

  assert.equal(res.status, 403);
  assert.equal(globalTrafficBuffer.list().length, 0);
});
