import { test } from "node:test";
import assert from "node:assert/strict";
import {
  DEFAULT_HEADROOM_URL,
  isLoopbackHeadroomUrl,
  parsePortFromHeadroomUrl,
  buildHeadroomStatus,
} from "../../src/lib/headroom/detect";
import { isLocalOnlyPath } from "../../src/server/authz/routeGuard";

// ──────────────────────────────────────────────────────────────────────────────
// 1. Route guard: /api/headroom/{start,stop} MUST be classified LOCAL_ONLY
//    so a tunneled JWT cannot trigger child-process spawning (Hard Rule #15).
// ──────────────────────────────────────────────────────────────────────────────
test("isLocalOnlyPath gates /api/headroom/start and /stop", () => {
  assert.equal(isLocalOnlyPath("/api/headroom/start"), true);
  assert.equal(isLocalOnlyPath("/api/headroom/stop"), true);
  // status is a read-only probe — keep it accessible (matches upstream b55cf36d).
  assert.equal(isLocalOnlyPath("/api/headroom/status"), false);
});

// ──────────────────────────────────────────────────────────────────────────────
// 2. URL helpers — pure functions, no side effects.
// ──────────────────────────────────────────────────────────────────────────────
test("DEFAULT_HEADROOM_URL falls back to localhost:8787", () => {
  assert.ok(DEFAULT_HEADROOM_URL.startsWith("http"));
  assert.ok(/:8787$/.test(DEFAULT_HEADROOM_URL) || /HEADROOM_URL/.test(DEFAULT_HEADROOM_URL));
});

test("isLoopbackHeadroomUrl recognizes loopback hosts", () => {
  assert.equal(isLoopbackHeadroomUrl("http://localhost:8787"), true);
  assert.equal(isLoopbackHeadroomUrl("http://127.0.0.1:8787"), true);
  assert.equal(isLoopbackHeadroomUrl("http://[::1]:8787"), true);
  assert.equal(isLoopbackHeadroomUrl("http://headroom:8787"), false);
  assert.equal(isLoopbackHeadroomUrl("http://10.0.0.5:8787"), false);
  assert.equal(isLoopbackHeadroomUrl("not-a-url"), false);
});

test("parsePortFromHeadroomUrl extracts valid port or returns null", () => {
  assert.equal(parsePortFromHeadroomUrl("http://localhost:8787"), 8787);
  assert.equal(parsePortFromHeadroomUrl("http://localhost"), null);
  assert.equal(parsePortFromHeadroomUrl("bogus"), null);
  // Pair-port 50ed79fe: Docker sidecar with non-standard port.
  assert.equal(parsePortFromHeadroomUrl("http://headroom:9090"), 9090);
});

// ──────────────────────────────────────────────────────────────────────────────
// 3. buildHeadroomStatus — pure shape assembly (mockable inputs).
//    Pair commit 50ed79fe: a reachable external proxy must report
//    running=true and canStart=false even without a local CLI.
// ──────────────────────────────────────────────────────────────────────────────
test("buildHeadroomStatus: local CLI present + proxy running → canStart=true", () => {
  const status = buildHeadroomStatus({
    url: "http://localhost:8787",
    binaryPath: "/usr/local/bin/headroom",
    python: "python3.12",
    proxyReachable: true,
  });
  assert.equal(status.installed, true);
  assert.equal(status.running, true);
  assert.equal(status.localUrl, true);
  assert.equal(status.canStart, true);
  assert.equal(status.python, "python3.12");
});

test("buildHeadroomStatus: external proxy reachable, no local CLI → running=true, canStart=false (Docker sidecar)", () => {
  const status = buildHeadroomStatus({
    url: "http://headroom:8787",
    binaryPath: null,
    python: null,
    proxyReachable: true,
  });
  assert.equal(status.installed, false);
  assert.equal(status.running, true);
  assert.equal(status.localUrl, false);
  assert.equal(status.canStart, false);
});

test("buildHeadroomStatus: nothing installed and proxy unreachable → all false", () => {
  const status = buildHeadroomStatus({
    url: "http://localhost:8787",
    binaryPath: null,
    python: null,
    proxyReachable: false,
  });
  assert.equal(status.installed, false);
  assert.equal(status.running, false);
  assert.equal(status.localUrl, true);
  assert.equal(status.canStart, false);
});
