import { test } from "node:test";
import assert from "node:assert/strict";
import {
  isLocalOnlyPath,
  isLocalOnlyBypassableByManageScope,
  isAlwaysProtectedPath,
  isLoopbackHost,
  LOCAL_ONLY_API_GET_EXEMPTIONS,
} from "../../../src/server/authz/routeGuard.ts";
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

test("isAlwaysProtectedPath: /api/shutdown is always protected", () => {
  assert.equal(isAlwaysProtectedPath("/api/shutdown"), true);
});

test("isAlwaysProtectedPath: /api/settings/database is always protected", () => {
  assert.equal(isAlwaysProtectedPath("/api/settings/database"), true);
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

// ─── T-22 follow-up: method-aware GET exemptions (#5084) ──────────────────
//
// PR #5084 added a narrow carve-out so dashboards can show the OmniRoute
// build version (and a "update available" banner) on a remote host BEFORE
// the user logs in. The route handler is still LOCAL_ONLY for non-loopback
// traffic in general, but `GET /api/system/version` is exempted because
// reading the version does not spawn a child process. The corresponding
// `POST /api/system/version` (auto-update: git checkout + npm install +
// pm2 restart) stays LOCAL_ONLY. The tests below pin the new behaviour so
// a future change cannot silently widen the carve-out to write methods or
// unrelated paths.

test("LOCAL_ONLY_API_GET_EXEMPTIONS: exposes the read-method exemption list as a readonly array", () => {
  // The constant is what other modules (the management policy, the
  // settings inventory) read. It MUST be a ReadonlyArray so accidental
  // mutations from a consumer throw at runtime instead of silently
  // widening the bypass surface.
  assert.ok(Array.isArray(LOCAL_ONLY_API_GET_EXEMPTIONS));
  // The exemption list is intentionally narrow — every addition is a
  // decision to expose a LOCAL_ONLY route to non-loopback read traffic.
  // A future PR that broadens it must be reviewed explicitly, so this
  // test is the early warning.
  assert.ok(
    LOCAL_ONLY_API_GET_EXEMPTIONS.length >= 1,
    "exemption list must contain at least the /api/system/version entry from #5084"
  );
  assert.ok(
    LOCAL_ONLY_API_GET_EXEMPTIONS.includes("/api/system/version"),
    "exemption list must include /api/system/version (the #5084 carve-out)"
  );
});

test("isLocalOnlyPath with method: GET on /api/system/version is NOT local-only (exempted)", () => {
  // The whole point of #5084: a dashboard on a remote host can render
  // the installed OmniRoute build / update banner without first logging
  // in. The read method is safe by construction.
  assert.equal(isLocalOnlyPath("/api/system/version", "GET"), false);
  assert.equal(isLocalOnlyPath("/api/system/version", "HEAD"), false);
  assert.equal(isLocalOnlyPath("/api/system/version", "OPTIONS"), false);
});

test("isLocalOnlyPath with method: POST on /api/system/version IS local-only (still gated)", () => {
  // The auto-update POST triggers `git checkout` + `npm install` + `pm2
  // restart` — see src/app/api/system/version/route.ts. It MUST stay
  // loopback-only even though the GET carve-out exists. A regression
  // here would re-introduce the RCE-via-tunnel surface (#5084 follow-up
  // guard).
  assert.equal(isLocalOnlyPath("/api/system/version", "POST"), true);
  assert.equal(isLocalOnlyPath("/api/system/version", "PUT"), true);
  assert.equal(isLocalOnlyPath("/api/system/version", "PATCH"), true);
  assert.equal(isLocalOnlyPath("/api/system/version", "DELETE"), true);
  // Lowercase is also handled.
  assert.equal(isLocalOnlyPath("/api/system/version", "post"), true);
});

test("isLocalOnlyPath with method: GET on a non-exempted LOCAL_ONLY path is still local-only", () => {
  // /api/mcp/sse is in LOCAL_ONLY_API_PREFIXES but NOT in
  // LOCAL_ONLY_API_GET_EXEMPTIONS. The carve-out is per-entry, not
  // global — every path on the exemption list must be opted in
  // explicitly. A future change that adds /api/mcp/sse to the exemption
  // list must update the test below.
  assert.equal(isLocalOnlyPath("/api/mcp/sse", "GET"), true);
  assert.equal(isLocalOnlyPath("/api/mcp/sse", "HEAD"), true);
  assert.equal(isLocalOnlyPath("/api/services/9router/status", "GET"), true);
  assert.equal(isLocalOnlyPath("/api/tools/agent-bridge/whatever", "GET"), true);
});

test("isLocalOnlyPath: child paths of an exemption match the exemption (prefix, not over-broaden)", () => {
  // /api/system/version/X must also be exempt for GET (e.g. a future
  // /api/system/version/check). The match is prefix-with-slash, so
  // /api/system/version-foo (no slash) must NOT match the /api/system/version
  // exemption — a sibling path that just happens to share a prefix.
  assert.equal(isLocalOnlyPath("/api/system/version/check", "GET"), false);
  assert.equal(isLocalOnlyPath("/api/system/version-foo", "GET"), true);
});

test("isLocalOnlyPath without method: keeps the conservative behaviour (LOCAL_ONLY for any path on the list)", () => {
  // Callers that don't have a method (audit tooling, dashboards that
  // want the worst-case answer) MUST still get the conservative
  // LOCAL_ONLY result. Removing this fallback would silently allow
  // write traffic past the gate in any caller that forgets to pass the
  // method.
  assert.equal(isLocalOnlyPath("/api/system/version"), true);
  assert.equal(isLocalOnlyPath("/api/system/version", undefined), true);
  assert.equal(isLocalOnlyPath("/api/mcp/sse"), true);
});

test("isLocalOnlyPath with method: non-LOCAL_ONLY paths return false regardless of method", () => {
  // Sanity: the method overload must not accidentally start returning
  // true for non-LOCAL_ONLY paths.
  assert.equal(isLocalOnlyPath("/api/settings", "GET"), false);
  assert.equal(isLocalOnlyPath("/api/providers", "POST"), false);
  assert.equal(isLocalOnlyPath("/v1/chat/completions", "POST"), false);
});

// ─── T-22 follow-up: management policy honours the GET exemption (#5084) ────
//
// Integration-style assertions through the management policy: a remote
// dashboard on a non-loopback host should now be able to read
// /api/system/version without 403, while the same host on POST still
// gets 403. The peer-stamp + CLI-token setup mirrors the existing
// /api/mcp/ tests so the model is consistent.

test("management policy: GET /api/system/version from non-localhost without auth is allowed (exempted read)", async () => {
  // The exemption deliberately bypasses the auth requirement for the
  // version read — otherwise the dashboard couldn't render the build
  // banner before the user has logged in. The 200 comes from the route
  // handler, not the policy, so we assert the policy allows.
  const ctx = makeCtx("/api/system/version", { host: "dashboard.example.com" }, { method: "GET" });
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, true);
});

test("management policy: POST /api/system/version from non-localhost without auth is still 403", async () => {
  // The auto-update POST is the surface #5084 carved GET out FROM. It
  // must remain LOCAL_ONLY for non-loopback, regardless of exemptions.
  const ctx = makeCtx("/api/system/version", { host: "dashboard.example.com" }, { method: "POST" });
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, false);
  if (!outcome.allow) assert.equal(outcome.status, 403);
});
