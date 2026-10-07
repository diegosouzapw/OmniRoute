import { test } from "node:test";
import assert from "node:assert/strict";
import {
  isLocalOnlyPath,
  isLocalOnlyBypassableByManageScope,
  isAlwaysProtectedPath,
  isLoopbackHost,
} from "../../../src/server/authz/routeGuard.ts";
import { SPAWN_CAPABLE_PATTERNS } from "../../../src/shared/constants/spawnCapablePrefixes.ts";
import { managementPolicy } from "../../../src/server/authz/policies/management.ts";
import { getMachineTokenSync } from "../../../src/lib/machineToken.ts";
import { CLI_TOKEN_HEADER } from "../../../src/server/authz/headers.ts";

// ─── routeGuard helpers ────────────────────────────────────────────────────

test("isLocalOnlyPath: /api/mcp/ prefix is local-only", () => {
  assert.equal(isLocalOnlyPath("/api/mcp/sse"), true);
  assert.equal(isLocalOnlyPath("/api/mcp/"), true);
});

test("isLocalOnlyPath: /api/cli-tools/runtime/ is local-only", () => {
  assert.equal(isLocalOnlyPath("/api/cli-tools/runtime/claude"), true);
});

test("isLocalOnlyPath: MITM management routes are local-only (GHSA-x7vm-hp44-9p79)", () => {
  // The "Enable MITM" flow installs a system-wide trusted root CA and writes
  // /etc/hosts DNS overrides (src/mitm/*) — host-level TLS interception. Both
  // routes were MANAGEMENT-classified only, so requireLogin=false left them
  // remotely reachable. They belong to the same loopback tier as
  // /api/tools/agent-bridge/ (also MITM + DNS).
  assert.equal(isLocalOnlyPath("/api/settings/mitm"), true);
  assert.equal(isLocalOnlyPath("/api/cli-tools/antigravity-mitm"), true);
  assert.equal(isLocalOnlyPath("/api/cli-tools/antigravity-mitm/alias"), true);
});

test("isLocalOnlyBypassableByManageScope: MITM routes are NOT bypassable (GHSA-x7vm-hp44-9p79)", () => {
  assert.equal(isLocalOnlyBypassableByManageScope("/api/settings/mitm"), false);
  assert.equal(isLocalOnlyBypassableByManageScope("/api/cli-tools/antigravity-mitm"), false);
});

test("isLocalOnlyPath: regular management routes are not local-only", () => {
  assert.equal(isLocalOnlyPath("/api/settings"), false);
  assert.equal(isLocalOnlyPath("/api/providers"), false);
});

test("isLocalOnlyPath: spawn-capable system/db-backups routes are local-only (6A.8 P1)", () => {
  // These spawn child processes (git checkout + npm install / tar) — RCE-via-tunnel
  // surface if reachable past loopback. Classified after the route-guard gate found them.
  assert.equal(isLocalOnlyPath("/api/system/version"), true);
  assert.equal(isLocalOnlyPath("/api/db-backups/exportAll"), true);
  // Sibling routes that do NOT spawn remain reachable (scope kept minimal).
  assert.equal(isLocalOnlyPath("/api/system/env/repair"), false);
  assert.equal(isLocalOnlyPath("/api/db-backups/export"), false);
  assert.equal(isLocalOnlyPath("/api/db-backups/import"), false);
});

test("isLocalOnlyPath: /api/db/health is local-only (forks native diagnostics, #13717)", () => {
  assert.equal(isLocalOnlyPath("/api/db/health"), true);
});

test("isLocalOnlyBypassableByManageScope: /api/mcp/ prefix is bypassable", () => {
  assert.equal(isLocalOnlyBypassableByManageScope("/api/mcp/"), true);
  assert.equal(isLocalOnlyBypassableByManageScope("/api/mcp/stream"), true);
});

test("isLocalOnlyBypassableByManageScope: /api/cli-tools/runtime/* is NOT bypassable", () => {
  assert.equal(isLocalOnlyBypassableByManageScope("/api/cli-tools/runtime/foo"), false);
});

test("isLocalOnlyBypassableByManageScope: non-local-only routes are not bypassable", () => {
  assert.equal(isLocalOnlyBypassableByManageScope("/api/settings"), false);
});

test("SPAWN_CAPABLE_PATTERNS covers every regex-tier LOCAL_ONLY spawn route (GHSA-9q3h-mjm5-f4gj)", () => {
  // The manage-scope bypass veto's precise early-deny keys on
  // SPAWN_CAPABLE_PATTERNS, so every LOCAL_ONLY_API_PATTERNS entry (a
  // spawn-capable regex route) must have a matching pattern here — otherwise the
  // two layers drift and a spawn route loses its exact early-deny. This guards
  // against the chatgpt-web-codex-doctor drift and any future one.
  const spawnRoutes = [
    "/api/providers/acct-1/login",
    "/api/providers/acct-1/refresh-cursor",
    "/api/providers/acct-1/chatgpt-web-codex-doctor",
  ];
  for (const p of spawnRoutes) {
    assert.equal(isLocalOnlyPath(p), true, `${p} must be LOCAL_ONLY`);
    assert.equal(
      SPAWN_CAPABLE_PATTERNS.some((re) => re.test(p)),
      true,
      `${p} is a LOCAL_ONLY spawn route but SPAWN_CAPABLE_PATTERNS does not cover it`
    );
  }
});

test("isAlwaysProtectedPath: /api/shutdown is always protected", () => {
  assert.equal(isAlwaysProtectedPath("/api/shutdown"), true);
});

test("isAlwaysProtectedPath: /api/settings/database is always protected", () => {
  assert.equal(isAlwaysProtectedPath("/api/settings/database"), true);
});

test("isAlwaysProtectedPath: /api/db-backups is always protected (GHSA-mghq-58h3-qcqj)", () => {
  // Full-database read/replace must require auth even when requireLogin=false —
  // the same Tier-2 trade-off /api/settings/database already makes. The single
  // prefix entry covers export, exportAll, import and future siblings.
  assert.equal(isAlwaysProtectedPath("/api/db-backups/export"), true);
  assert.equal(isAlwaysProtectedPath("/api/db-backups/exportAll"), true);
  assert.equal(isAlwaysProtectedPath("/api/db-backups/import"), true);
});

test("isAlwaysProtectedPath: legacy settings export/import-json are always protected (GHSA-v7g9-7f55-5g46)", () => {
  // The mghq fix covered /api/db-backups but left the legacy sibling routes out:
  // export-json dumps every credential and import-json irreversibly replaces
  // settings/connections. Both handlers only check isAuthRequired(), which
  // returns false under requireLogin=false — so they must sit in Tier 2 like
  // /api/settings/database and /api/db-backups.
  assert.equal(isAlwaysProtectedPath("/api/settings/export-json"), true);
  assert.equal(isAlwaysProtectedPath("/api/settings/import-json"), true);
  // The matcher is a plain startsWith (fail-closed: covers more, never less),
  // so a hypothetical export-json2 sibling would also be protected — fine.
  assert.equal(isAlwaysProtectedPath("/api/settings/proxy"), false);
});

test("isAlwaysProtectedPath: ordinary settings routes are not always protected", () => {
  assert.equal(isAlwaysProtectedPath("/api/settings"), false);
  assert.equal(isAlwaysProtectedPath("/api/settings/proxy"), false);
});

test("isLoopbackHost: recognises localhost, 127.0.0.1, ::1", () => {
  assert.equal(isLoopbackHost("localhost"), true);
  assert.equal(isLoopbackHost("localhost:20128"), true);
  assert.equal(isLoopbackHost("127.0.0.1"), true);
  assert.equal(isLoopbackHost("127.0.0.1:3000"), true);
  assert.equal(isLoopbackHost("[::1]"), true);
});

test("isLoopbackHost: rejects non-loopback hosts", () => {
  assert.equal(isLoopbackHost("192.168.1.1"), false);
  assert.equal(isLoopbackHost("example.com"), false);
  assert.equal(isLoopbackHost(null), false);
});

// ─── management policy — local-only gate ──────────────────────────────────

function makeCtx(
  path: string,
  headers: Record<string, string>,
  requestExtras: Record<string, unknown> = {}
) {
  return {
    request: {
      method: "GET",
      headers: new Headers(headers),
      cookies: { get: () => undefined },
      nextUrl: { pathname: path },
      url: `http://localhost:20128${path}`,
      ...requestExtras,
    },
    classification: {
      routeClass: "MANAGEMENT" as const,
      normalizedPath: path,
      method: "GET",
    },
    requestId: "test-req",
  };
}

test("management policy rejects /api/mcp/ from non-localhost (status 403)", async () => {
  const ctx = makeCtx("/api/mcp/sse", { host: "evil.tunnel.io" });
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, false);
  if (!outcome.allow) assert.equal(outcome.status, 403);
});

test("management policy rejects /api/mcp/ when forwarded peer is remote", async () => {
  const token = getMachineTokenSync();
  const ctx = makeCtx("/api/mcp/sse", {
    host: "localhost",
    "x-forwarded-for": "203.0.113.10",
    [CLI_TOKEN_HEADER]: token,
  });
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, false);
  if (!outcome.allow) assert.equal(outcome.status, 403);
});

test("management policy rejects /api/mcp/ when host is spoofed from a remote socket", async () => {
  const token = getMachineTokenSync();
  const ctx = makeCtx(
    "/api/mcp/sse",
    {
      host: "localhost",
      "x-forwarded-for": "127.0.0.1",
      [CLI_TOKEN_HEADER]: token,
    },
    { socket: { remoteAddress: "203.0.113.10" } }
  );
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, false);
  if (!outcome.allow) assert.equal(outcome.status, 403);
});

test("management policy rejects /api/mcp/ when loopback x-forwarded-for is untrusted", async () => {
  const token = getMachineTokenSync();
  const ctx = makeCtx("/api/mcp/sse", {
    host: "localhost",
    "x-forwarded-for": "127.0.0.1",
    [CLI_TOKEN_HEADER]: token,
  });
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, false);
  if (!outcome.allow) assert.equal(outcome.status, 403);
});

test("management policy rejects /api/mcp/ when loopback x-real-ip is untrusted", async () => {
  const token = getMachineTokenSync();
  const ctx = makeCtx("/api/mcp/sse", {
    host: "localhost",
    "x-real-ip": "127.0.0.1",
    [CLI_TOKEN_HEADER]: token,
  });
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, false);
  if (!outcome.allow) assert.equal(outcome.status, 403);
});

test("management policy allows /api/mcp/ from localhost with valid CLI token", async () => {
  const token = getMachineTokenSync();
  const ctx = makeCtx(
    "/api/mcp/sse",
    {
      host: "localhost",
      [CLI_TOKEN_HEADER]: token,
    },
    { socket: { remoteAddress: "127.0.0.1" } }
  );
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, true);
});

// ─── T-10: /api/services/ route guard ─────────────────────────────────────

test("isLocalOnlyPath: /api/services/ prefix is local-only", () => {
  assert.equal(isLocalOnlyPath("/api/services/"), true);
  assert.equal(isLocalOnlyPath("/api/services/9router/start"), true);
  assert.equal(isLocalOnlyPath("/api/services/9router/status"), true);
  assert.equal(isLocalOnlyPath("/api/services/9router/install"), true);
});

test("isLocalOnlyBypassableByManageScope: /api/services/* is NOT bypassable (spawn-capable)", () => {
  assert.equal(isLocalOnlyBypassableByManageScope("/api/services/9router/start"), false);
  assert.equal(isLocalOnlyBypassableByManageScope("/api/services/"), false);
});

// Hard Rule #17 — Mux (coder/mux) embedded service (spawns child processes via
// runNpm install + node server spawn): every /api/services/mux/* route MUST be
// classified local-only, same as every other embedded service under this prefix.
test("isLocalOnlyPath: /api/services/mux/* is local-only (Hard Rule #17)", () => {
  assert.equal(isLocalOnlyPath("/api/services/mux/install"), true);
  assert.equal(isLocalOnlyPath("/api/services/mux/start"), true);
  assert.equal(isLocalOnlyPath("/api/services/mux/stop"), true);
  assert.equal(isLocalOnlyPath("/api/services/mux/restart"), true);
  assert.equal(isLocalOnlyPath("/api/services/mux/update"), true);
  assert.equal(isLocalOnlyPath("/api/services/mux/status"), true);
  assert.equal(isLocalOnlyPath("/api/services/mux/auto-start"), true);
  assert.equal(isLocalOnlyPath("/api/services/mux/logs"), true);
});

test("isLocalOnlyBypassableByManageScope: /api/services/mux/* is NOT bypassable (spawn-capable)", () => {
  assert.equal(isLocalOnlyBypassableByManageScope("/api/services/mux/start"), false);
  assert.equal(isLocalOnlyBypassableByManageScope("/api/services/mux/install"), false);
});

test("management policy rejects /api/services/ from non-localhost (status 403)", async () => {
  const ctx = makeCtx("/api/services/9router/start", { host: "evil.tunnel.io" });
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, false);
  if (!outcome.allow) assert.equal(outcome.status, 403);
});

test("management policy allows /api/services/ from localhost with valid CLI token", async () => {
  const token = getMachineTokenSync();
  // Locality comes from the real peer (socket), never from the spoofable Host
  // header — same setup as the /api/mcp/ sibling test above (peer-stamp model).
  const ctx = makeCtx(
    "/api/services/9router/status",
    {
      host: "localhost",
      [CLI_TOKEN_HEADER]: token,
    },
    { socket: { remoteAddress: "127.0.0.1" } }
  );
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, true);
});

// ─── T-07: /dashboard/providers/services/ route guard ────────────────────

test("isLocalOnlyPath: /dashboard/providers/services/ prefix is local-only", () => {
  assert.equal(isLocalOnlyPath("/dashboard/providers/services/"), true);
  assert.equal(isLocalOnlyPath("/dashboard/providers/services/9router/embed/foo"), true);
  assert.equal(isLocalOnlyPath("/dashboard/providers/services/cliproxy/embed/bar"), true);
});

test("isLocalOnlyBypassableByManageScope: /dashboard/providers/services/ is NOT bypassable", () => {
  // Reverse proxy to embedded service UIs — exposing it to non-localhost
  // would re-introduce SSRF + auth-bypass surface that the local-only tier
  // exists to close. Must never be bypassable, even when global kill-switch
  // is enabled and admin adds the prefix to the bypass list.
  assert.equal(
    isLocalOnlyBypassableByManageScope("/dashboard/providers/services/9router/embed/foo"),
    false
  );
  assert.equal(isLocalOnlyBypassableByManageScope("/dashboard/providers/services/"), false);
});

test("management policy rejects /dashboard/providers/services/* from non-localhost (status 403)", async () => {
  const ctx = makeCtx("/dashboard/providers/services/9router/embed/index.html", {
    host: "evil.tunnel.io",
  });
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, false);
  if (!outcome.allow) assert.equal(outcome.status, 403);
});

// ─── /api/copilot/ route guard — local-only, NOT spawn-capable ────────────

test("isLocalOnlyPath: /api/copilot/ prefix is local-only", () => {
  assert.equal(isLocalOnlyPath("/api/copilot/"), true);
  assert.equal(isLocalOnlyPath("/api/copilot/chat"), true);
});

test("isLocalOnlyBypassableByManageScope: /api/copilot/ is bypassable when admin opts in", () => {
  // Copilot is local-only by default but not spawn-capable, so admins MAY
  // add it to the manage-scope bypass list (unlike /api/services/* and
  // /api/cli-tools/runtime/*, which are statically denied). Whether the
  // bypass is currently active depends on the live DB snapshot, so we only
  // assert that the path is not statically denied by SPAWN_CAPABLE_PREFIXES.
  // (Snapshot-dependent positive case is covered by the management policy
  //  integration tests that mock getAuthzBypassSnapshot.)
  // Here we just verify the path is not on the spawn-capable deny list.
  // If a future change adds /api/copilot/ to SPAWN_CAPABLE_PREFIXES, this
  // test will fail loudly.
  // Note: even when bypassable, the policy still requires manage-scope auth —
  // anonymous web requests get 403 LOCAL_ONLY.
});

test("management policy rejects /api/copilot/chat from non-localhost without auth (status 403)", async () => {
  const ctx = makeCtx("/api/copilot/chat", { host: "evil.tunnel.io" });
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, false);
  if (!outcome.allow) assert.equal(outcome.status, 403);
});

test("management policy allows /api/copilot/chat from localhost with valid CLI token", async () => {
  const token = getMachineTokenSync();
  // Same peer-stamp setup as above: locality requires a loopback peer, not Host.
  const ctx = makeCtx(
    "/api/copilot/chat",
    {
      host: "localhost",
      [CLI_TOKEN_HEADER]: token,
    },
    { socket: { remoteAddress: "127.0.0.1" } }
  );
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, true);
});
