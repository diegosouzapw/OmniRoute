import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../src/lib/proxySubscription/coreEndpoint.ts");
const { isLocalCoreEndpointAllowed, ALLOWED_LOCAL_CORE_HOSTS } = mod;

test("loopback hosts are allowed", () => {
  assert.equal(isLocalCoreEndpointAllowed("socks5://127.0.0.1:1080"), true);
  assert.equal(isLocalCoreEndpointAllowed("http://localhost:2080"), true);
});

test("remote hosts are rejected", () => {
  assert.equal(isLocalCoreEndpointAllowed("socks5://10.0.0.1:1080"), false);
  assert.equal(isLocalCoreEndpointAllowed("http://example.com:2080"), false);
  assert.equal(isLocalCoreEndpointAllowed("https://192.168.1.1:443"), false);
});

test("non-proxy schemes on loopback are rejected", () => {
  assert.equal(isLocalCoreEndpointAllowed("ftp://127.0.0.1:21"), false);
  assert.equal(isLocalCoreEndpointAllowed("file:///tmp/core.sock"), false);
});

test("null / empty / malformed endpoints are rejected", () => {
  assert.equal(isLocalCoreEndpointAllowed(null), false);
  assert.equal(isLocalCoreEndpointAllowed(""), false);
  assert.equal(isLocalCoreEndpointAllowed("not a url"), false);
});

test("allowed host set is loopback-only", () => {
  assert.deepEqual(
    [...ALLOWED_LOCAL_CORE_HOSTS].sort(),
    ["127.0.0.1", "::1", "localhost"].sort()
  );
});
