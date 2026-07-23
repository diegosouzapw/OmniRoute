/**
 * Security regression: /api/middleware/* routes must be classified as LOCAL_ONLY
 * so loopback enforcement runs unconditionally before any auth check.
 *
 * Middleware hooks compile + run arbitrary JS via `new vm.Script` on the request
 * hot path (src/lib/middleware/registry.ts) — the same remote-code-execution class
 * as /api/plugins/* (which is already LOCAL_ONLY). A leaked JWT over a
 * Cloudflared/Ngrok tunnel must not be able to install or trigger a middleware
 * hook. Hard Rules #15 + #17. See docs/security/ROUTE_GUARD_TIERS.md.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { isLocalOnlyPath } from "../../src/server/authz/routeGuard.ts";

test("/api/middleware/ prefix (trailing slash) is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/middleware/"), true);
});

test("/api/middleware/hooks is LOCAL_ONLY (list + install compile arbitrary JS)", () => {
  assert.equal(isLocalOnlyPath("/api/middleware/hooks"), true);
});

test("/api/middleware/hooks/[name] is LOCAL_ONLY (compile + run via vm.Script)", () => {
  assert.equal(isLocalOnlyPath("/api/middleware/hooks/my-hook"), true);
});

test("non-middleware paths are NOT LOCAL_ONLY (no over-match)", () => {
  assert.equal(isLocalOnlyPath("/api/combos"), false);
  assert.equal(isLocalOnlyPath("/api/providers"), false);
  assert.equal(isLocalOnlyPath("/api/keys"), false);
});
