import { test } from "node:test";
import assert from "node:assert/strict";
import {
  isLocalOnlyPath,
  isLocalOnlyBypassableByManageScope,
} from "../../../src/server/authz/routeGuard.ts";
import { SPAWN_CAPABLE_PREFIXES } from "../../../src/shared/constants/spawnCapablePrefixes.ts";
import { VNC_ROUTE_PREFIX } from "../../../src/lib/vncSession/manifest.ts";

// ─── #7892: /api/vnc-session/* spawns Docker containers via child_process.spawn ──
// (src/lib/vncSession/service.ts) — must be loopback-enforced before any auth
// check, same CVE class (GHSA-fhh6-4qxv-rpqj) as the other spawn-capable
// prefixes (Hard Rules #15 + #17).

test("isLocalOnlyPath: /api/vnc-session is local-only (#7892 — spawns Docker containers)", () => {
  assert.equal(isLocalOnlyPath(VNC_ROUTE_PREFIX), true);
  assert.equal(isLocalOnlyPath("/api/vnc-session"), true);
  assert.equal(isLocalOnlyPath("/api/vnc-session/conn123/start"), true);
  assert.equal(isLocalOnlyPath("/api/vnc-session/conn123/harvest"), true);
  assert.equal(isLocalOnlyPath("/api/vnc-session/conn123/stop"), true);
});

test("isLocalOnlyBypassableByManageScope: /api/vnc-session is NOT bypassable (defence in depth)", () => {
  assert.ok(SPAWN_CAPABLE_PREFIXES.includes(VNC_ROUTE_PREFIX));
  assert.equal(
    isLocalOnlyBypassableByManageScope("/api/vnc-session/conn123/start"),
    false
  );
});
