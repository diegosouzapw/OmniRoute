/**
 * Security regression: /api/cli-tools/grok-build-settings must be classified as
 * LOCAL_ONLY so loopback enforcement runs unconditionally before any auth check.
 *
 * GET calls getCliRuntimeStatus("grok-build"), which spawns a child process to
 * locate and healthcheck the `grok` binary (src/shared/services/cliRuntime.ts).
 * That is the same transitive-spawn surface that got /api/skills/collect/
 * classified, and the same class as the already-gated omp-settings /
 * letta-settings routes (which spawn `which omp` / `which letta`).
 *
 * Classifying it LOCAL_ONLY closes the remote-RCE vector: a leaked JWT over a
 * Cloudflared/Ngrok tunnel cannot trigger process spawning.
 * Hard Rules #15 + #17. See docs/security/ROUTE_GUARD_TIERS.md.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { isLocalOnlyPath } from "../../src/server/authz/routeGuard.ts";

test("/api/cli-tools/grok-build-settings is LOCAL_ONLY (spawns via getCliRuntimeStatus)", () => {
  assert.equal(isLocalOnlyPath("/api/cli-tools/grok-build-settings"), true);
});

test("/api/cli-tools/grok-build-settings with trailing slash is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/cli-tools/grok-build-settings/"), true);
});

test("sibling cli-tools spawn-capable settings routes stay LOCAL_ONLY", () => {
  // Guards against a refactor dropping the established precedent this entry follows.
  assert.equal(isLocalOnlyPath("/api/cli-tools/omp-settings"), true);
  assert.equal(isLocalOnlyPath("/api/cli-tools/letta-settings"), true);
  assert.equal(isLocalOnlyPath("/api/cli-tools/runtime/grok-build"), true);
});

test("non-spawning cli-tools routes are NOT over-gated by this entry", () => {
  // The new prefix must not accidentally widen to the whole /api/cli-tools/ subtree,
  // which remote dashboards legitimately use.
  assert.equal(isLocalOnlyPath("/api/cli-tools/all-statuses"), false);
  assert.equal(isLocalOnlyPath("/api/cli-tools/keys"), false);
});
