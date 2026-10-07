/**
 * Security regression (GHSA-jx89-f37j-pq89): /api/skills/install and
 * /api/skills/executions must be classified LOCAL_ONLY so loopback enforcement
 * runs unconditionally before any auth check.
 *
 * POST /api/skills/install stores the request's `handlerCode` string verbatim as
 * the skill's `handler` with no allowlist (src/app/api/skills/install/route.ts).
 * POST /api/skills/executions then calls skillExecutor.execute(), whose handler
 * resolution (src/lib/skills/executor.ts) falls through to the built-in table —
 * so a handler string that equals `execute_command` or `eval_code` runs the real
 * built-in (src/lib/skills/builtins.ts), which reaches
 * childProcess.spawn(<container runtime>) in src/lib/skills/sandbox.ts. The
 * sandbox is a hardened docker/podman container, but the spawn is real and
 * transitive: the 6A.8 source-scan gate only greps route.ts, so it cannot see it.
 *
 * Both routes were only behind requireManagementAuth() / isAuthenticated(),
 * which waive auth whenever requireLogin=false — the identical class already
 * closed for /api/acp/agents (GHSA-hf57-cqmx-p4gr) and /api/skills/collect/.
 * Hard Rules #15 + #17. See docs/security/ROUTE_GUARD_TIERS.md.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  isLocalOnlyBypassableByManageScope,
  isLocalOnlyPath,
} from "../../src/server/authz/routeGuard.ts";
import { SPAWN_CAPABLE_PREFIXES } from "../../src/shared/constants/spawnCapablePrefixes.ts";
import { SPAWN_CAPABLE_ROUTE_ROOTS } from "../../scripts/check/check-route-guard-membership.ts";

test("GHSA-jx89: /api/skills/install is LOCAL_ONLY (registers a handler that can alias execute_command)", () => {
  assert.equal(isLocalOnlyPath("/api/skills/install"), true);
});

test("GHSA-jx89: /api/skills/install with trailing slash is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/skills/install/"), true);
});

test("GHSA-jx89: /api/skills/executions is LOCAL_ONLY (skillExecutor.execute reaches sandbox spawn)", () => {
  assert.equal(isLocalOnlyPath("/api/skills/executions"), true);
});

test("GHSA-jx89: /api/skills/executions with trailing slash is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/skills/executions/"), true);
});

test("GHSA-jx89: neither skills execution route can be opened through the manage-scope bypass", () => {
  for (const route of ["/api/skills/install", "/api/skills/executions"]) {
    assert.ok(
      SPAWN_CAPABLE_PREFIXES.includes(route),
      `${route} must be listed in SPAWN_CAPABLE_PREFIXES`
    );
    assert.equal(isLocalOnlyBypassableByManageScope(route), false);
  }
});

test("GHSA-jx89: the spawn-capable route audit enumerates both skills execution routes", () => {
  assert.ok(SPAWN_CAPABLE_ROUTE_ROOTS.includes("src/app/api/skills/install"));
  assert.ok(SPAWN_CAPABLE_ROUTE_ROOTS.includes("src/app/api/skills/executions"));
});

test("GHSA-jx89: the existing /api/skills/collect/ gate is untouched", () => {
  assert.equal(isLocalOnlyPath("/api/skills/collect/detect"), true);
});

test("GHSA-jx89: the rest of /api/skills/ stays remote-reachable (no over-broadening)", () => {
  // Registry listing / delete, marketplace and skillssh do not reach the sandbox
  // spawn: they stay on requireManagementAuth() and must remain tunnel-reachable.
  assert.equal(isLocalOnlyPath("/api/skills"), false);
  assert.equal(isLocalOnlyPath("/api/skills/"), false);
  assert.equal(isLocalOnlyPath("/api/skills/some-id"), false);
  assert.equal(isLocalOnlyPath("/api/skills/marketplace"), false);
  assert.equal(isLocalOnlyPath("/api/skills/marketplace/install"), false);
  assert.equal(isLocalOnlyPath("/api/skills/skillssh/install"), false);
});
