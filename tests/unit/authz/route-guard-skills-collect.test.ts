import { test } from "node:test";
import assert from "node:assert/strict";
import {
  isLocalOnlyPath,
  isLocalOnlyBypassableByManageScope,
} from "../../../src/server/authz/routeGuard.ts";
import { SPAWN_CAPABLE_ROUTE_ROOTS } from "../../../scripts/check/check-route-guard-membership.ts";

// ─── PR #6294 review: /api/skills/collect/ is local-only ─────────────────
//
// GET /api/skills/collect/detect calls getCliRuntimeStatus() (which spawns a
// child process) once per CLI_TOOL_IDS entry — a spawn-capable, previously
// unauthenticated route reachable from any tunnel. Must be loopback-enforced
// BEFORE any auth check (Hard Rules #15 + #17), the same as every other
// spawn-capable prefix.

test("isLocalOnlyPath: /api/skills/collect/ prefix is local-only (Hard Rules #15/#17)", () => {
  assert.equal(isLocalOnlyPath("/api/skills/collect/detect"), true);
  assert.equal(isLocalOnlyPath("/api/skills/collect/install"), true);
  assert.equal(isLocalOnlyPath("/api/skills/collect/"), true);
});

test("isLocalOnlyPath: the rest of /api/skills/ stays remote-reachable (no over-broadening)", () => {
  // Only the spawn-capable collect/* subtree is loopback-locked. The rest of the
  // skills surface (registry install, marketplace, skillssh) already gates on
  // requireManagementAuth() and must remain reachable remotely.
  assert.equal(isLocalOnlyPath("/api/skills"), false);
  assert.equal(isLocalOnlyPath("/api/skills/install"), false);
  assert.equal(isLocalOnlyPath("/api/skills/marketplace/install"), false);
});

test("isLocalOnlyBypassableByManageScope: /api/skills/collect/ is NOT bypassable (defence in depth)", () => {
  // Even if a DB row tried to whitelist /api/skills/collect/ via the manage-scope
  // bypass list, the runtime predicate must reject it because the prefix is in
  // SPAWN_CAPABLE_PREFIXES (src/shared/constants/spawnCapablePrefixes.ts).
  assert.equal(isLocalOnlyPath("/api/skills/collect/detect"), true);
  assert.equal(isLocalOnlyBypassableByManageScope("/api/skills/collect/detect"), false);
});

test("SPAWN_CAPABLE_ROUTE_ROOTS includes src/app/api/skills/collect (route-guard-membership gate)", () => {
  // Regression guard for the "gate's scanned-roots list doesn't include this new
  // directory" gap found during PR #6294 review — check:route-guard-membership
  // must actually enumerate the new detect/install route.ts files, not silently
  // report "0 new gaps" because the directory was never in scope.
  assert.ok(
    SPAWN_CAPABLE_ROUTE_ROOTS.includes("src/app/api/skills/collect"),
    `Expected SPAWN_CAPABLE_ROUTE_ROOTS to include "src/app/api/skills/collect", got: ${JSON.stringify(
      SPAWN_CAPABLE_ROUTE_ROOTS
    )}`
  );
});
