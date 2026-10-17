/**
 * Security regression (#15446): GET /api/providers/devin-cli-agentic/auth-status
 * spawns `devin auth status` (getDevinAgenticAuthStatus()), so it MUST be
 * LOCAL_ONLY like every other spawn-capable route (Hard Rules #15 + #17) — a
 * leaked dashboard session over a tunnel must not be able to trigger it.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { isLocalOnlyPath } from "../../src/server/authz/routeGuard.ts";
import { classifyRoute } from "../../src/server/authz/classify.ts";

test("/api/providers/devin-cli-agentic/auth-status is LOCAL_ONLY (spawns devin auth status)", () => {
  assert.equal(isLocalOnlyPath("/api/providers/devin-cli-agentic/auth-status"), true);
  assert.equal(isLocalOnlyPath("/api/providers/devin-cli-agentic/auth-status/"), true);
});

test("classifyRoute keeps the Devin auth-status route out of PUBLIC", () => {
  const classification = classifyRoute("/api/providers/devin-cli-agentic/auth-status", "GET");
  assert.equal(classification.routeClass, "MANAGEMENT");
});

test("the Devin auth-status entry does not lock unrelated /api/providers paths", () => {
  assert.equal(isLocalOnlyPath("/api/providers/devin-cli-agentic"), false);
  assert.equal(isLocalOnlyPath("/api/providers/opencode/models"), false);
});
