import test from "node:test";
import assert from "node:assert/strict";

import {
  isAlwaysProtectedPath,
  isLocalOnlyPath,
  ALWAYS_PROTECTED_API_PATHS,
} from "../../../src/server/authz/routeGuard.ts";

// GHSA-5926-2w35-7h4q — the Claude/Codex OAuth export routes gate on
// `requireManagementAuth(request)` with no `alwaysRequireAuth`, which fails open
// under requireLogin=false, and neither path was in ALWAYS_PROTECTED_API_PATHS.
// An unauthenticated caller who knows a connection id could download the
// operator's raw access_token / refresh_token / id_token.
//
// This is the THIRD recurrence of one class: GHSA-mghq-58h3-qcqj added
// /api/db-backups, GHSA-v7g9-7f55-5g46 added the /api/settings/*-json siblings
// it had missed, and this one is the siblings BOTH missed. So the test is
// written as an inventory of the whole class rather than two more assertions:
// a route that hands out stored credentials, dumps captured traffic, or writes
// the operator's CLI config must be hard-gated (ALWAYS_PROTECTED or
// LOCAL_ONLY), never left on the fail-open MANAGEMENT tier.

const HARD_GATED_INVENTORY: ReadonlyArray<{ path: string; why: string }> = [
  // ── Reported in GHSA-5926-2w35-7h4q ──────────────────────────────────────
  {
    path: "/api/providers/6f3c1b7e-0000-4000-8000-000000000000/claude-auth/export",
    why: "returns the connection's raw Claude OAuth access_token/refresh_token",
  },
  {
    path: "/api/providers/6f3c1b7e-0000-4000-8000-000000000000/codex-auth/export",
    why: "returns the connection's raw Codex access_token/refresh_token/id_token",
  },
  // ── Found sweeping the class while fixing the above ──────────────────────
  {
    path: "/api/logs/export",
    why: "dumps call_logs (prompts and responses) and proxy_logs for up to 168h",
  },
  {
    path: "/api/cli-tools/codex-profiles",
    why: "PUT writes attacker-supplied auth.json and config.toml into the operator's Codex CLI config",
  },
  // ── Same family: WRITE the operator's credentials into host CLI files ───
  // These do not hand the credential to the caller, so they are a step below
  // the export routes — but anonymous is still the wrong audience for "write
  // this connection's token into ~/.codex/auth.json". ALWAYS_PROTECTED rather
  // than LOCAL_ONLY on purpose: it closes the anonymous hole without breaking
  // an operator driving the dashboard through a tunnel.
  {
    path: "/api/providers/6f3c1b7e-0000-4000-8000-000000000000/codex-auth/apply-local",
    why: "writes the connection's credential into the host's ~/.codex/auth.json",
  },
  {
    path: "/api/providers/6f3c1b7e-0000-4000-8000-000000000000/claude-auth/apply-local",
    why: "writes the connection's credential into the host's Claude CLI config",
  },
  {
    path: "/api/providers/agy-auth/apply-local",
    why: "writes into ~/.gemini/antigravity-cli/antigravity-oauth-token",
  },
  // ── Already fixed; pinned so a refactor cannot silently drop them ────────
  { path: "/api/db-backups/export", why: "GHSA-mghq-58h3-qcqj" },
  { path: "/api/db-backups/exportAll", why: "GHSA-mghq-58h3-qcqj" },
  { path: "/api/settings/export-json", why: "GHSA-v7g9-7f55-5g46" },
  { path: "/api/settings/import-json", why: "GHSA-v7g9-7f55-5g46" },
  { path: "/api/settings/database", why: "irreversible database replace" },
  { path: "/api/shutdown", why: "stops the server" },
  // ── Hard-gated by the LOCAL_ONLY tier instead ────────────────────────────
  {
    path: "/api/tools/traffic-inspector/export.har",
    why: "captured traffic can contain Authorization headers (LOCAL_ONLY)",
  },
  {
    path: "/api/tools/traffic-inspector/sessions/abc/export.har",
    why: "same, per session (LOCAL_ONLY)",
  },
];

test("every credential/traffic export and CLI-config write is hard-gated", () => {
  for (const { path, why } of HARD_GATED_INVENTORY) {
    const gated = isAlwaysProtectedPath(path) || isLocalOnlyPath(path);
    assert.ok(
      gated,
      `${path} is on the fail-open MANAGEMENT tier — anonymous under requireLogin=false. ${why}`
    );
  }
});

test("the trailing-slash spelling is gated too", () => {
  for (const path of [
    "/api/providers/abc/claude-auth/export/",
    "/api/providers/abc/codex-auth/export/",
    "/api/logs/export/",
    "/api/cli-tools/codex-profiles/",
  ]) {
    assert.ok(isAlwaysProtectedPath(path) || isLocalOnlyPath(path), path);
  }
});

test("the new patterns do not over-protect their neighbours", () => {
  // The dynamic-segment entries must not swallow the rest of /api/providers/,
  // which is ordinary MANAGEMENT and has to keep working under requireLogin=false.
  for (const path of [
    "/api/providers",
    "/api/providers/abc",
    "/api/providers/abc/models",
    "/api/providers/abc/claude-auth",
    "/api/providers/abc/codex-auth",
    "/api/providers/abc/claude-auth/apply",
    "/api/providers/agy-auth",
    "/api/logs",
    "/api/cli-tools",
  ]) {
    assert.equal(
      isAlwaysProtectedPath(path),
      false,
      `${path} must stay on the MANAGEMENT tier — hard-gating it breaks keyless local-first installs`
    );
  }
});

test("a connection id cannot escape the pattern with a slash", () => {
  // `[^/]+` is deliberate: a traversal-ish id must not match and silently drop
  // back to the fail-open tier by looking like a different route.
  assert.equal(isAlwaysProtectedPath("/api/providers/a/b/claude-auth/export"), false);
});

test("the plain-path allowlist keeps its existing entries", () => {
  for (const p of ["/api/shutdown", "/api/settings/database", "/api/db-backups"]) {
    assert.ok(ALWAYS_PROTECTED_API_PATHS.includes(p), p);
  }
});
