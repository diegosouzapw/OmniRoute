import test from "node:test";
import assert from "node:assert/strict";

import { publicPolicy } from "../../../src/server/authz/policies/public.ts";
import type { PolicyContext } from "../../../src/server/authz/context.ts";
import { getMachineTokenSync } from "../../../src/lib/machineToken.ts";

function ctx(): PolicyContext {
  return {
    request: { method: "GET", headers: new Headers() },
    classification: { routeClass: "PUBLIC", reason: "public_prefix", normalizedPath: "/api/init" },
    requestId: "req_test",
  };
}

test("publicPolicy always allows with anonymous subject", async () => {
  const out = await publicPolicy.evaluate(ctx());
  assert.equal(out.allow, true);
  if (out.allow) {
    assert.equal(out.subject.kind, "anonymous");
    assert.equal(out.subject.id, "anonymous");
  }
});

/**
 * `runAuthzPipeline` strips CLI_TOKEN_HEADER for EVERY route class, so a
 * PUBLIC-classified route that still serves a reduced anonymous view (GET
 * /api/monitoring/health, GHSA-mvf8-qc78-5mxm) can only recognize the local CLI
 * through the subject this policy stamps. Without it the packaged CLI was
 * permanently anonymous there and the health payload lost `version` — which is
 * exactly what check:pack-boot asserts.
 */
function cliCtx(overrides: Partial<PolicyContext["request"]> = {}): PolicyContext {
  return {
    request: {
      method: "GET",
      headers: new Headers({ "x-omniroute-cli-token": getMachineTokenSync() }),
      ip: "127.0.0.1",
      ...overrides,
    },
    classification: {
      routeClass: "PUBLIC",
      reason: "public_prefix",
      normalizedPath: "/api/monitoring/health",
    },
    requestId: "req_cli",
  };
}

test("publicPolicy stamps the local-CLI subject for a valid loopback machine token", async () => {
  // No environment guard here on purpose: this and the negative control below are
  // the only tests covering the loopback branch added for check:pack-boot, and a
  // conditional skip would silence them exactly where the coverage matters. The
  // sibling management-policy tests in authz/routeGuard.test.ts call this same
  // helper unguarded, so an empty token is a broken environment worth failing on.
  assert.ok(getMachineTokenSync(), "machine token must resolve for this suite to mean anything");
  const out = await publicPolicy.evaluate(cliCtx());
  assert.equal(out.allow, true);
  if (out.allow) {
    assert.equal(out.subject.kind, "management_key");
    assert.equal(out.subject.label, "local-cli-token");
  }
});

test("publicPolicy keeps anonymous for a non-loopback peer carrying the token", async () => {
  assert.ok(getMachineTokenSync(), "machine token must resolve for this suite to mean anything");
  const out = await publicPolicy.evaluate(cliCtx({ ip: "203.0.113.7" }));
  assert.equal(out.allow, true);
  if (out.allow) assert.equal(out.subject.kind, "anonymous");
});

test("publicPolicy keeps anonymous for a wrong token from loopback", async () => {
  const out = await publicPolicy.evaluate(
    cliCtx({ headers: new Headers({ "x-omniroute-cli-token": "0".repeat(64) }) })
  );
  assert.equal(out.allow, true);
  if (out.allow) assert.equal(out.subject.kind, "anonymous");
});
