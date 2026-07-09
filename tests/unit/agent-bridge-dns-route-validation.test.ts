/**
 * Unit tests: POST /api/tools/agent-bridge/agents/[id]/dns — unknown-agent 404 guard.
 *
 * Before this fix, an unknown `id` fell through straight into `addDNSEntry`/
 * `removeDNSEntry`, which silently resolved the legacy Antigravity default hosts
 * instead of rejecting the request. The route now validates `id` against
 * `ALL_TARGETS` first and returns 404 for unknown agents — verified here without
 * touching /etc/hosts (the 404 short-circuits before any DNS call).
 */
import test from "node:test";
import assert from "node:assert/strict";

const dnsRoute = await import(
  "../../src/app/api/tools/agent-bridge/agents/[id]/dns/route.ts"
);

function makeRequest(body: unknown): Request {
  return new Request("http://127.0.0.1/api/tools/agent-bridge/agents/x/dns", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("POST .../[id]/dns: unknown agent id returns 404 before any DNS call", async () => {
  const res = await dnsRoute.POST(makeRequest({ enabled: true }), {
    params: { id: "__nonexistent_agent__" },
  });
  assert.equal(res.status, 404);
  const body = (await res.json()) as { error?: { message?: string } };
  assert.ok(
    JSON.stringify(body).includes("__nonexistent_agent__"),
    "404 body should reference the unknown agent id"
  );
});

test("POST .../[id]/dns: invalid body still returns 400 (schema validated first)", async () => {
  const res = await dnsRoute.POST(makeRequest({ enabled: "not-a-boolean" }), {
    params: { id: "__nonexistent_agent__" },
  });
  assert.equal(res.status, 400);
});

test("POST .../[id]/dns: malformed JSON body returns 400", async () => {
  const req = new Request("http://127.0.0.1/api/tools/agent-bridge/agents/x/dns", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{not-json",
  });
  const res = await dnsRoute.POST(req, { params: { id: "cursor" } });
  assert.equal(res.status, 400);
});

test("POST .../[id]/dns: error responses do not leak stack traces", async () => {
  const res = await dnsRoute.POST(makeRequest({ enabled: true }), {
    params: { id: "__nonexistent_agent__" },
  });
  const text = await res.text();
  assert.ok(!text.includes("at /"), "stack trace leaked in dns route 404 response");
});
