/**
 * Security regression: /api/cli-tools/forge-settings and /api/cli-tools/jcode-settings
 * must be classified as LOCAL_ONLY so loopback enforcement runs unconditionally before
 * any auth check.
 *
 * GET calls getCliRuntimeStatus(TOOL_ID) (src/app/api/cli-tools/forge-settings/route.ts,
 * src/app/api/cli-tools/jcode-settings/route.ts), which spawns a child process to locate
 * and healthcheck the CLI binary (src/shared/services/cliRuntime.ts:332). That is the same
 * transitive-spawn surface that got /api/cli-tools/grok-build-settings and
 * /api/skills/collect/ classified.
 *
 * Classifying it LOCAL_ONLY closes the remote-RCE vector: a leaked JWT over a
 * Cloudflared/Ngrok tunnel cannot trigger process spawning.
 * Hard Rules #15 + #17. See docs/security/ROUTE_GUARD_TIERS.md. Issue #7263.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { isLocalOnlyPath } from "../../src/server/authz/routeGuard.ts";

test("/api/cli-tools/forge-settings is LOCAL_ONLY (spawns via getCliRuntimeStatus)", () => {
  assert.equal(isLocalOnlyPath("/api/cli-tools/forge-settings"), true);
});

test("/api/cli-tools/forge-settings with trailing slash is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/cli-tools/forge-settings/"), true);
});

test("/api/cli-tools/jcode-settings is LOCAL_ONLY (spawns via getCliRuntimeStatus)", () => {
  assert.equal(isLocalOnlyPath("/api/cli-tools/jcode-settings"), true);
});

test("/api/cli-tools/jcode-settings with trailing slash is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/cli-tools/jcode-settings/"), true);
});

test("sibling cli-tools spawn-capable settings routes stay LOCAL_ONLY", () => {
  // Guards against a refactor dropping the established precedent this entry follows.
  assert.equal(isLocalOnlyPath("/api/cli-tools/omp-settings"), true);
  assert.equal(isLocalOnlyPath("/api/cli-tools/letta-settings"), true);
  assert.equal(isLocalOnlyPath("/api/cli-tools/grok-build-settings"), true);
});

test("non-spawning cli-tools routes are NOT over-gated by this entry", () => {
  // The new prefixes must not accidentally widen to the whole /api/cli-tools/ subtree,
  // which remote dashboards legitimately use.
  assert.equal(isLocalOnlyPath("/api/cli-tools/all-statuses"), false);
  assert.equal(isLocalOnlyPath("/api/cli-tools/keys"), false);
});
