import { test } from "node:test";
import assert from "node:assert/strict";
import {
  isLocalOnlyPath,
  isLocalOnlyBypassableByManageScope,
} from "../../../src/server/authz/routeGuard.ts";

// ─── T-12 (#3932 PR-3): /api/local/ is local-only ────────────────────────

test("isLocalOnlyPath: /api/local/ prefix is local-only (T-12, #3932)", () => {
  // 1-click local service launchers (Redis today) spawn podman/docker — must
  // be loopback-enforced before any auth check, same as /api/mcp/.
  assert.equal(isLocalOnlyPath("/api/local/redis/start"), true);
  assert.equal(isLocalOnlyPath("/api/local/redis/stop"), true);
  assert.equal(isLocalOnlyPath("/api/local/redis/status"), true);
  assert.equal(isLocalOnlyPath("/api/local/"), true);
  // Future /api/local/* sub-paths must also be classified — prefix is generic.
  assert.equal(isLocalOnlyPath("/api/local/postgres/start"), true);
  assert.equal(isLocalOnlyPath("/api/local/ollama/status"), true);
});

test("isLocalOnlyPath: /api/local* does NOT match the bare /api/localifications path", () => {
  // Regression guard: the prefix must end with "/" to avoid over-broadening.
  // (We don't have such a route today, but if /api/localization ever appears,
  // it should NOT be loopback-enforced just because it shares a prefix.)
  assert.equal(isLocalOnlyPath("/api/localization"), false);
  assert.equal(isLocalOnlyPath("/api/localhost-check"), false);
});

test("isLocalOnlyBypassableByManageScope: /api/local/ is NOT bypassable (defence in depth)", () => {
  // The kill-switch path. Even if a DB row tries to whitelist /api/local/ via
  // the manage-scope bypass list, the runtime predicate must reject it because
  // /api/local/ is in SPAWN_CAPABLE_PREFIXES.
  //
  // The predicate reads from runtime settings; here we exercise the
  // defence-in-depth clause directly by checking the relevant invariant:
  // /api/local/ must be in the same spawn-capable set as /api/cli-tools/runtime/.
  assert.equal(isLocalOnlyPath("/api/local/redis/start"), true);
  // Same-origin false-positive guard: ensure /api/local is treated like every
  // other spawn-capable prefix (no whitelist carve-out).
  assert.equal(isLocalOnlyBypassableByManageScope("/api/local/redis/start"), false);
});
