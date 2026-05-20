import { test } from "node:test";
import assert from "node:assert/strict";
import {
  isLocalOnlyPath,
  isAlwaysProtectedPath,
  isLoopbackHost,
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

function makeCtx(path: string, headers: Record<string, string>) {
  return {
    request: {
      method: "GET",
      headers: new Headers(headers),
      cookies: { get: () => undefined },
      nextUrl: { pathname: path },
      url: `http://localhost:20128${path}`,
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

test("management policy allows /api/mcp/ from localhost with valid CLI token", async () => {
  const token = getMachineTokenSync();
  const ctx = makeCtx("/api/mcp/sse", { host: "localhost", [CLI_TOKEN_HEADER]: token });
  const outcome = await managementPolicy.evaluate(ctx);
  assert.equal(outcome.allow, true);
});
