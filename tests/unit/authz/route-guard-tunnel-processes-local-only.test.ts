import assert from "node:assert/strict";
import { test } from "node:test";

import {
  LOCAL_ONLY_API_GET_EXEMPTIONS,
  LOCAL_ONLY_API_PREFIXES,
  isLocalOnlyPath,
} from "../../../src/server/authz/routeGuard.ts";
import { SPAWN_CAPABLE_PREFIXES } from "../../../src/shared/constants/spawnCapablePrefixes.ts";

const PROCESS_ROUTES = [
  "/api/tunnels/cloudflared",
  "/api/tunnels/tailscale/disable",
  "/api/tunnels/tailscale/enable",
  "/api/tunnels/tailscale/install",
  "/api/tunnels/tailscale/login",
  "/api/tunnels/tailscale/start-daemon",
] as const;

test("tunnel process routes are local-only and non-bypassable", () => {
  for (const path of PROCESS_ROUTES) {
    assert.ok(LOCAL_ONLY_API_PREFIXES.includes(path), `${path} must be explicitly local-only`);
    assert.ok(
      SPAWN_CAPABLE_PREFIXES.includes(path),
      `${path} must be denied from the manage-scope bypass`
    );
    assert.equal(isLocalOnlyPath(path, "POST"), true, `${path} POST must be local-only`);
  }
});

test("cloudflared status remains remotely available for authenticated callers", () => {
  assert.ok(LOCAL_ONLY_API_GET_EXEMPTIONS.has("/api/tunnels/cloudflared"));
  assert.equal(isLocalOnlyPath("/api/tunnels/cloudflared", "GET"), false);
  assert.equal(isLocalOnlyPath("/api/tunnels/cloudflared", "HEAD"), false);
  assert.equal(isLocalOnlyPath("/api/tunnels/cloudflared", "OPTIONS"), false);
  assert.equal(isLocalOnlyPath("/api/tunnels/cloudflared", "POST"), true);
});

test("Tailscale read-only status routes are not broadened into local-only", () => {
  for (const path of ["/api/tunnels/tailscale", "/api/tunnels/tailscale/check"]) {
    assert.equal(LOCAL_ONLY_API_PREFIXES.includes(path), false);
    assert.equal(SPAWN_CAPABLE_PREFIXES.includes(path), false);
    assert.equal(isLocalOnlyPath(path, "GET"), false);
  }
});

test("unrelated tunnel paths remain outside the spawn-capable classification", () => {
  for (const path of ["/api/tunnels/ngrok", "/api/tunnels/tailscale/status"]) {
    assert.equal(LOCAL_ONLY_API_PREFIXES.includes(path), false);
    assert.equal(SPAWN_CAPABLE_PREFIXES.includes(path), false);
    assert.equal(isLocalOnlyPath(path, "GET"), false);
  }
});
