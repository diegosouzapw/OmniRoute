import test from "node:test";
import assert from "node:assert/strict";

import { POST } from "../../src/app/api/tools/agent-bridge/agents/[id]/dns/route.ts";

/**
 * Regression for #7271: Agent Bridge "Start DNS" returned HTTP 404.
 *
 * Next.js 16 makes a dynamic route's `params` a Promise. The handler destructured
 * `id` directly from the (un-awaited) Promise, so `id` was `undefined` and the
 * agent lookup always missed — producing `404 Unknown agent: undefined` for every
 * request, including valid agents.
 *
 * This test drives the handler with the Next.js 16 params shape (a Promise) and an
 * unknown agent id. It never reaches the DNS side-effects (the 404 fires before
 * `addDNSEntry`), so it is a pure, side-effect-free reproduction: the 404 message
 * must echo the *resolved* id — proving `params` was awaited — not `undefined`.
 */
test("POST /agents/[id]/dns awaits params — 404 echoes the real id, not 'undefined'", async () => {
  const agentId = "definitely-not-a-real-agent-7271";
  const request = new Request("http://localhost/api/tools/agent-bridge/agents/x/dns", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ enabled: false }),
  });

  const res = await POST(request, { params: Promise.resolve({ id: agentId }) });
  const body = await res.json();

  assert.equal(res.status, 404);
  // Before the fix, `id` was `undefined`, so the message read "Unknown agent: undefined".
  assert.equal(body.error.message, `Unknown agent: ${agentId}`);
  assert.ok(
    !body.error.message.includes("undefined"),
    "params must be awaited — message should not contain 'undefined'"
  );
});
