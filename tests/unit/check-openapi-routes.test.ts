import { test } from "node:test";
import assert from "node:assert";
import {
  normalizeParams,
  findSpecPathsWithoutRoute,
  KNOWN_STALE_SPEC,
} from "../../scripts/check/check-openapi-routes.mjs";
import { reportStaleEntries } from "../../scripts/check/lib/allowlist.mjs";

test("normalizeParams collapses any {param} name to {}", () => {
  assert.equal(normalizeParams("/api/providers/{providerId}/models"), "/api/providers/{}/models");
});

test("documented path with a real route is not flagged", () => {
  assert.deepEqual(findSpecPathsWithoutRoute(["/api/usage"], ["/api/usage"]), []);
});

test("param name mismatch still matches (param-insensitive)", () => {
  assert.deepEqual(
    findSpecPathsWithoutRoute(["/api/providers/{id}"], ["/api/providers/{providerId}"]),
    []
  );
});

test("flags a documented path that has no real route (invented endpoint)", () => {
  assert.deepEqual(findSpecPathsWithoutRoute(["/api/ghost", "/api/usage"], ["/api/usage"]), [
    "/api/ghost",
  ]);
});

// --- stale-allowlist enforcement (6A.3) ---

test("stale-enforcement: allowlist entry no longer needed causes gate to flag it", () => {
  // Simulate a KNOWN_STALE_SPEC entry whose spec path now has a real route.
  const liveOrphans: string[] = []; // route was created → no orphans left
  const stale = (reportStaleEntries as (a: Set<string>, l: string[], g: string) => string[])(
    new Set(["/api/agent-bridge/{id}/state"]),
    liveOrphans,
    "openapi-routes"
  );
  assert.deepEqual(stale, ["/api/agent-bridge/{id}/state"]);
});

test("stale-enforcement: live repo has zero stale entries in KNOWN_STALE_SPEC", () => {
  // KNOWN_STALE_SPEC is empty today; this anchors that invariant.
  assert.equal((KNOWN_STALE_SPEC as Set<string>).size, 0);
});
