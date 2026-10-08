/**
 * Hard Rule #17 — every /api/services/singbox/* route can spawn/stop a child process
 * (`sing-box run`) and the TPROXY path edits host iptables, so each one must be
 * classified LOCAL_ONLY in src/server/authz/routeGuard.ts (loopback enforced before auth).
 * The route list is read from disk, so a route added later without being covered fails here.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { isLocalOnlyPath } from "../../src/server/authz/routeGuard.ts";

const SINGBOX_API_DIR = join(import.meta.dirname, "../../src/app/api/services/singbox");

function discoveredRoutes(): string[] {
  return readdirSync(SINGBOX_API_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(SINGBOX_API_DIR, d.name, "route.ts")))
    .map((d) => `/api/services/singbox/${d.name}`);
}

test("singbox exposes the full 8-route lifecycle surface", () => {
  assert.deepEqual(
    discoveredRoutes().sort(),
    [
      "install",
      "start",
      "stop",
      "restart",
      "status",
      "update",
      "auto-start",
      "auto-restart-adopted",
    ]
      .map((n) => `/api/services/singbox/${n}`)
      .sort()
  );
});

test("every /api/services/singbox/* route is a LOCAL_ONLY path", () => {
  for (const route of discoveredRoutes()) {
    assert.equal(isLocalOnlyPath(route), true, `${route} must be local-only (Hard Rule #17)`);
  }
});

test("singbox embed/UI proxy paths and a trailing-slash variant stay local-only", () => {
  assert.equal(isLocalOnlyPath("/api/services/singbox/status/"), true);
  assert.equal(isLocalOnlyPath("/dashboard/providers/services/singbox/embed/"), true);
});

test("the classification is not accidental: an unrelated public path is NOT local-only", () => {
  assert.equal(isLocalOnlyPath("/api/v1/models"), false);
});
