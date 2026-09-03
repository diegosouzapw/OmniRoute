/**
 * Security regression (Cursor renewal plan, Task 4): POST
 * /api/providers/[id]/refresh-cursor manually nudges `cursor-agent` (a child
 * process, via src/lib/cursor/renewal.ts) to attempt a Cursor session
 * renewal. It MUST be classified LOCAL_ONLY so loopback enforcement runs
 * unconditionally before any auth check — a leaked JWT via a Cloudflared/
 * Ngrok tunnel cannot trigger a process spawn. Hard Rules #15 + #17. See
 * docs/security/ROUTE_GUARD_TIERS.md.
 *
 * The refresh-cursor segment sits AFTER the dynamic `[id]` param, so it is
 * matched by a regex in LOCAL_ONLY_API_PATTERNS rather than a flat prefix —
 * classifying the whole `/api/providers/` subtree as LOCAL_ONLY would wrongly
 * lock the remote dashboard out of ordinary provider CRUD (including the
 * generic, remote-reachable `/refresh` route every OTHER provider uses).
 * These tests pin BOTH the gate AND the narrowness (no over-match), mirroring
 * tests/unit/route-guard-provider-login-local-only.test.ts's exact structure
 * for the sibling `/login` regex entry.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  isLocalOnlyPath,
  isLocalOnlyBypassableByManageScope,
} from "../../../src/server/authz/routeGuard.ts";

test("/api/providers/[id]/refresh-cursor is LOCAL_ONLY (spawns cursor-agent)", () => {
  assert.equal(isLocalOnlyPath("/api/providers/abc123/refresh-cursor"), true);
  assert.equal(isLocalOnlyPath("/api/providers/conn-uuid-456/refresh-cursor"), true);
});

test("/api/providers/[id]/refresh-cursor with a trailing slash is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/providers/abc123/refresh-cursor/"), true);
});

test("the dedicated-route decision worked: the generic /refresh route stays remote-reachable", () => {
  // THE regression this whole route-split decision exists to prove: Cursor's
  // manual-refresh gets its OWN dedicated LOCAL_ONLY route specifically so the
  // pre-existing, shared /refresh route (used by every non-Cursor provider)
  // is NOT reclassified and stays reachable from a remote dashboard.
  assert.equal(isLocalOnlyPath("/api/providers/abc123/refresh"), false);
  assert.equal(isLocalOnlyPath("/api/providers/conn-uuid-456/refresh"), false);
});

test("the refresh-cursor gate does NOT over-match the rest of /api/providers", () => {
  assert.equal(isLocalOnlyPath("/api/providers"), false);
  assert.equal(isLocalOnlyPath("/api/providers/"), false);
  assert.equal(isLocalOnlyPath("/api/providers/abc123"), false);
  assert.equal(isLocalOnlyPath("/api/providers/abc123/test"), false);
  assert.equal(isLocalOnlyPath("/api/providers/abc123/models"), false);
  // Anchored: extra segments after /refresh-cursor are not the spawn route.
  assert.equal(isLocalOnlyPath("/api/providers/abc123/refresh-cursor/extra"), false);
  // "refresh-cursor" must be its own segment, not a substring of the id.
  assert.equal(isLocalOnlyPath("/api/providers/refresh-cursor-helper/status"), false);
});

test("isLocalOnlyBypassableByManageScope rejects refresh-cursor (spawn-capable, never bypassable via manage scope)", () => {
  assert.equal(isLocalOnlyBypassableByManageScope("/api/providers/abc123/refresh-cursor"), false);
  assert.equal(isLocalOnlyBypassableByManageScope("/api/providers/abc123/refresh-cursor/"), false);
});

test("isLocalOnlyBypassableByManageScope rejects login too — the retroactive gap-closure, not an incidental side effect", () => {
  // Pins the plan's explicitly-noted side effect: the same SPAWN_CAPABLE_PATTERNS
  // fix that protects refresh-cursor also retroactively closes a PRE-EXISTING
  // gap for /login (which was in LOCAL_ONLY_API_PATTERNS but never in any
  // spawn-capable deny-list before this plan). A regression here would mean
  // a malformed DB bypass-prefix row could grant remote access to a route
  // that spawns a headful Playwright Chromium.
  assert.equal(isLocalOnlyBypassableByManageScope("/api/providers/abc123/login"), false);
});
