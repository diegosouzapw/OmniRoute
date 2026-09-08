import { test } from "node:test";
import assert from "node:assert/strict";

const ORIGINAL_FETCH = globalThis.fetch;
const ORIGINAL_ENV = { ...process.env };

function restore() {
  process.env = { ...ORIGINAL_ENV };
  globalThis.fetch = ORIGINAL_FETCH;
}

test("POST /v1/messages: forwards to bifrost when active and eligible", async () => {
  process.env.BIFROST_BASE_URL = "http://127.0.0.1:8080";
  process.env.OMNIROUTE_RELAY_BACKEND = "bifrost";
  process.env.BIFROST_ENABLED = "1";
  process.env.BIFROST_TIMEOUT_MS = "5000";

  let capturedTargetUrl = "";
  globalThis.fetch = async (url, _init) => {
    capturedTargetUrl = String(url);
    return new Response(
      JSON.stringify({ id: "msg-fastpath-123", role: "assistant", content: [] }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  const { POST } = await import(
    `../../../../src/app/api/v1/messages/route.ts?testCase=${Date.now()}-1`
  );

  const req = new Request("http://localhost:20128/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-request-id": "req-fastpath-msg-1",
    },
    body: JSON.stringify({
      model: "anthropic/claude-3-5-sonnet",
      messages: [{ role: "user", content: "hi" }],
    }),
  });

  const res = await POST(req);
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("X-Routed-By"), "bifrost");
  assert.equal(capturedTargetUrl, "http://127.0.0.1:8080/v1/chat/completions");

  const json = await res.json();
  assert.equal(json.id, "msg-fastpath-123");

  restore();
});

test("POST /v1/messages: falls back to native handleChat on bifrost failure", async () => {
  process.env.BIFROST_BASE_URL = "http://127.0.0.1:8080";
  process.env.OMNIROUTE_RELAY_BACKEND = "auto";
  process.env.BIFROST_ENABLED = "1";

  // Simulate Bifrost failure (502)
  globalThis.fetch = async () => {
    return new Response(JSON.stringify({ error: "gateway down" }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  };

  const { POST } = await import(
    `../../../../src/app/api/v1/messages/route.ts?testCase=${Date.now()}-2`
  );

  const req = new Request("http://localhost:20128/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "anthropic/claude-3-5-sonnet",
      messages: [{ role: "user", content: "test messages fallback" }],
    }),
  });

  const res = await POST(req);
  assert.ok(res.headers.get("X-Routing-Fallback"));
  assert.match(res.headers.get("X-Routing-Fallback")!, /bifrost/);

  restore();
});
