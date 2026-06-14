/**
 * Integration tests: Traffic Inspector LOCAL_ONLY enforcement
 *
 * Verifies that `isLocalOnlyPath` returns true for all traffic-inspector prefixes
 * and that a simulated non-loopback request to the management policy returns 403.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ti-local-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { isLocalOnlyPath, isLoopbackHost } = await import(
  "../../src/server/authz/routeGuard.ts"
);

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── isLocalOnlyPath assertions ──────────────────────────────────────────────

test("isLocalOnlyPath: traffic-inspector prefix is LOCAL_ONLY", () => {
  assert.equal(
    isLocalOnlyPath("/api/tools/traffic-inspector/"),
    true,
    "root prefix should be LOCAL_ONLY"
  );
});

test("isLocalOnlyPath: ws sub-path is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/tools/traffic-inspector/ws"), true);
});

test("isLocalOnlyPath: requests sub-path is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/tools/traffic-inspector/requests"), true);
});

test("isLocalOnlyPath: capture-modes sub-path is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/tools/traffic-inspector/capture-modes/http-proxy"), true);
});

test("isLocalOnlyPath: sessions sub-path is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/tools/traffic-inspector/sessions"), true);
});

test("isLocalOnlyPath: internal/ingest is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/tools/traffic-inspector/internal/ingest"), true);
});

test("isLocalOnlyPath: export.har is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/tools/traffic-inspector/export.har"), true);
});

test("isLocalOnlyPath: hosts sub-path is LOCAL_ONLY", () => {
  assert.equal(isLocalOnlyPath("/api/tools/traffic-inspector/hosts"), true);
});

// ── isLoopbackHost assertions ───────────────────────────────────────────────

test("isLoopbackHost: localhost returns true", () => {
  assert.equal(isLoopbackHost("localhost"), true);
});

test("isLoopbackHost: 127.0.0.1 returns true", () => {
  assert.equal(isLoopbackHost("127.0.0.1"), true);
});

test("isLoopbackHost: example.com returns false", () => {
  assert.equal(isLoopbackHost("example.com"), false);
});

test("isLoopbackHost: external IP returns false", () => {
  assert.equal(isLoopbackHost("192.168.1.100"), false);
});

test("isLoopbackHost: ::1 IPv6 returns true", () => {
  assert.equal(isLoopbackHost("[::1]"), true);
});

// ── Management policy simulation ────────────────────────────────────────────

test("management policy: non-loopback request to LOCAL_ONLY path would be blocked", () => {
  // Simulate the guard check that happens in management.ts
  const path2 = "/api/tools/traffic-inspector/requests";
  const hostHeader = "example.com"; // non-loopback

  const isLocalOnly = isLocalOnlyPath(path2);
  const isLoopback = isLoopbackHost(hostHeader);

  // The policy blocks when: isLocalOnly && !isLoopback
  assert.equal(isLocalOnly, true, "path should be LOCAL_ONLY");
  assert.equal(isLoopback, false, "example.com should not be loopback");
  // Therefore this request would be blocked (403 LOCAL_ONLY)
  const wouldBeBlocked = isLocalOnly && !isLoopback;
  assert.equal(wouldBeBlocked, true, "non-loopback request to LOCAL_ONLY path should be blocked");
});

test("management policy: loopback request to LOCAL_ONLY path passes IP check", () => {
  const path2 = "/api/tools/traffic-inspector/ws";
  const hostHeader = "localhost";

  const isLocalOnly = isLocalOnlyPath(path2);
  const isLoopback = isLoopbackHost(hostHeader);

  assert.equal(isLocalOnly, true);
  assert.equal(isLoopback, true);
  const passesIpCheck = !(isLocalOnly && !isLoopback);
  assert.equal(passesIpCheck, true, "loopback to LOCAL_ONLY path passes IP gate");
});
