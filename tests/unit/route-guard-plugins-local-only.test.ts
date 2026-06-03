/**
 * Security regression: /api/plugins/* routes must be classified as LOCAL_ONLY
 * so loopback enforcement runs unconditionally before any auth check.
 *
 * These routes trigger plugin loading via worker_threads + child_process:
 *   POST /api/plugins          — install (loads plugin file via worker)
 *   GET  /api/plugins          — list (read-only, but same prefix must be gated
 *                                 to avoid auth-bypass leaking installed plugin names)
 *   GET/DELETE /api/plugins/[name]           — inspect / uninstall
 *   POST /api/plugins/[name]/activate        — loads + executes the plugin worker
 *   POST /api/plugins/[name]/deactivate      — stops the plugin worker
 *   GET/PUT  /api/plugins/[name]/config      — configure the plugin
 *   POST /api/plugins/scan                   — filesystem scan (spawns child_process)
 *
 * Classifying the whole prefix as LOCAL_ONLY closes the remote-RCE vector:
 * a leaked JWT over a Cloudflared/Ngrok tunnel cannot trigger process spawning.
 * Hard Rules #15 + #17. See docs/security/ROUTE_GUARD_TIERS.md.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { isLocalOnlyPath } from "../../src/server/authz/routeGuard.ts";

test("/api/plugins prefix (trailing slash) is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/plugins/"), true);
});

test("/api/plugins (bare, no trailing slash) is LOCAL_ONLY", () => {
  // The GET-list + POST-install route lives at exactly /api/plugins — must also be gated.
  assert.equal(isLocalOnlyPath("/api/plugins"), true);
});

test("/api/plugins/[name]/activate is LOCAL_ONLY (worker_threads execution)", () => {
  assert.equal(isLocalOnlyPath("/api/plugins/my-plugin/activate"), true);
});

test("/api/plugins/[name]/deactivate is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/plugins/my-plugin/deactivate"), true);
});

test("/api/plugins/[name]/config is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/plugins/my-plugin/config"), true);
});

test("/api/plugins/[name] (GET/DELETE) is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/plugins/my-plugin"), true);
});

test("/api/plugins/scan is LOCAL_ONLY (spawns child_process)", () => {
  assert.equal(isLocalOnlyPath("/api/plugins/scan"), true);
});

test("non-plugin paths are NOT LOCAL_ONLY (no over-match)", () => {
  assert.equal(isLocalOnlyPath("/api/combos"), false);
  assert.equal(isLocalOnlyPath("/api/providers"), false);
  assert.equal(isLocalOnlyPath("/api/keys"), false);
});
