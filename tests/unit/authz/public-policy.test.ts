import test from "node:test";
import assert from "node:assert/strict";

import { publicPolicy } from "../../../src/server/authz/policies/public.ts";
import type { PolicyContext } from "../../../src/server/authz/context.ts";

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
