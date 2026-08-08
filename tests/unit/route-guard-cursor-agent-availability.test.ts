/**
 * Security regression (Cursor renewal plan, Task 5): GET
 * /api/providers/cursor/agent-availability is a credential-free check for the
 * dashboard's install-nudge banner, but it still spawns `cursor-agent status
 * --format json` (via checkCursorAgentAvailability()/
 * getCachedCursorAgentAvailability()) — so it MUST be LOCAL_ONLY, same as
 * every other spawn-capable route (Hard Rules #15 + #17).
 *
 * Unlike Task 4's refresh-cursor route, this one is a STATIC path (no dynamic
 * `[id]` segment), so it's classified via the flat LOCAL_ONLY_API_PREFIXES
 * list, not a regex in LOCAL_ONLY_API_PATTERNS. It was originally scoped
 * under `/api/oauth/cursor/agent-availability` during planning, then
 * relocated under `/api/providers/` because `/api/oauth/` is PUBLIC-classified
 * (see classify.ts) and never reaches the LOCAL_ONLY gate at all — see
 * docs/security/ROUTE_GUARD_TIERS.md. The classifyRoute assertion below pins
 * that decision as a regression guard against ever moving this back.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { isLocalOnlyPath } from "../../src/server/authz/routeGuard.ts";
import { classifyRoute } from "../../src/server/authz/classify.ts";

test("/api/providers/cursor/agent-availability is LOCAL_ONLY (spawns cursor-agent status)", () => {
  assert.equal(isLocalOnlyPath("/api/providers/cursor/agent-availability"), true);
});

test("/api/providers/cursor/agent-availability with a trailing slash is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/providers/cursor/agent-availability/"), true);
});

test("classifyRoute resolves this path to MANAGEMENT, never PUBLIC (regression guard against moving it under /api/oauth/)", () => {
  const classification = classifyRoute("/api/providers/cursor/agent-availability", "GET");
  assert.equal(classification.routeClass, "MANAGEMENT");
});

test("does not over-match unrelated /api/providers paths", () => {
  // LOCAL_ONLY_API_PREFIXES entries are matched via plain startsWith (see
  // isLocalOnlyPath) — like every other exact-path-style sibling entry in
  // that array (e.g. /api/system/version, /api/oauth/cursor/auto-import,
  // /api/acp/agents), this is a bare path with no trailing slash, so it is
  // NOT segment-boundary-anchored the way the regex-based /login and
  // /refresh-cursor entries in LOCAL_ONLY_API_PATTERNS are (see
  // tests/unit/route-guard-cursor-refresh.test.ts). Only paths that don't
  // share the prefix at all are meaningful negative cases here.
  assert.equal(isLocalOnlyPath("/api/providers"), false);
  assert.equal(isLocalOnlyPath("/api/providers/"), false);
  assert.equal(isLocalOnlyPath("/api/providers/cursor"), false);
  assert.equal(isLocalOnlyPath("/api/providers/abc123/refresh"), false);
});
