/**
 * Fase 3 / Epic A — /api/tools/agent-bridge/tproxy route (decrypt 4b/N).
 *
 * Drives the decrypt capture mode (start/stop/status). The route applies iptables
 * rules + installs a trust-store CA via child processes, so it MUST be local-only
 * (Hard Rules #15 + #17). In CI the native addon is absent, so start fails
 * gracefully with a sanitized 500 — which is exactly what these tests pin, along
 * with config validation, status, and the local-only classification.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  GET,
  POST,
  DELETE,
  StartTproxyBodySchema,
} from "../../src/app/api/tools/agent-bridge/tproxy/route.ts";
import { isLocalOnlyPath } from "../../src/server/authz/routeGuard.ts";

function postReq(body: unknown): Request {
  return new Request("http://local/api/tools/agent-bridge/tproxy", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

test("the tproxy route is classified LOCAL_ONLY (spawns iptables + installs a CA)", () => {
  assert.equal(isLocalOnlyPath("/api/tools/agent-bridge/tproxy"), true);
});

test("GET reports running:false and an available boolean when idle", async () => {
  const res = GET();
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.running, false);
  assert.equal(typeof body.available, "boolean");
});

test("POST rejects an out-of-range config with a 400 invalid_request", async () => {
  const res = await POST(postReq({ dport: 70000 }));
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.equal(body.error.type, "invalid_request");
});

test("POST returns a sanitized 500 when the native addon is unavailable or unprivileged", async () => {
  const res = await POST(postReq({}));
  assert.equal(res.status, 500);
  const body = await res.json();
  assert.match(
    body.error.message,
    /native addon|CAP_NET_ADMIN|Operation not permitted|permission|Command failed: ip rule/i
  );
  assert.ok(!body.error.message.includes("at /"), "no stack trace leaked");
});

test("DELETE stops (no-op when idle) and returns ok with status", async () => {
  const res = await DELETE();
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.ok, true);
  assert.equal(body.status.running, false);
});

test("StartTproxyBodySchema applies sensible TPROXY defaults", () => {
  const parsed = StartTproxyBodySchema.parse({});
  assert.equal(parsed.dport, 443);
  assert.equal(parsed.onPort, 8443);
  assert.equal(parsed.routeTable, 233);
  assert.equal(parsed.bypassMark, 0x539);
});
