import test from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../src/lib/proxySubscription/coreEndpoint.ts");
const {
  isLocalCoreEndpointAllowed,
  ALLOWED_LOCAL_CORE_HOSTS,
  parseLocalCoreEndpoints,
  redactCoreEntryForDetail,
} = mod;

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
  assert.deepEqual([...ALLOWED_LOCAL_CORE_HOSTS].sort(), ["127.0.0.1", "::1", "localhost"].sort());
});

test("parseLocalCoreEndpoints splits one entry per line", () => {
  assert.deepEqual(
    parseLocalCoreEndpoints(
      "socks5://127.0.0.1:1080\nsocks5://127.0.0.1:1081\nhttp://localhost:2080"
    ),
    ["socks5://127.0.0.1:1080", "socks5://127.0.0.1:1081", "http://localhost:2080"]
  );
});

test("parseLocalCoreEndpoints handles CRLF and drops blank lines", () => {
  assert.deepEqual(
    parseLocalCoreEndpoints("socks5://127.0.0.1:1080\r\n\r\n   \r\nsocks5://127.0.0.1:1081\r\n"),
    ["socks5://127.0.0.1:1080", "socks5://127.0.0.1:1081"]
  );
});

test("parseLocalCoreEndpoints trims each line", () => {
  assert.deepEqual(
    parseLocalCoreEndpoints("  socks5://127.0.0.1:1080  \n\tsocks5://127.0.0.1:1081\t"),
    ["socks5://127.0.0.1:1080", "socks5://127.0.0.1:1081"]
  );
});

test("parseLocalCoreEndpoints never splits on commas", () => {
  // A comma is legitimate inside userinfo; it must survive the split.
  assert.deepEqual(parseLocalCoreEndpoints("socks5://user,name:pass@127.0.0.1:1080"), [
    "socks5://user,name:pass@127.0.0.1:1080",
  ]);
  // Two URLs on one comma-separated line are a single entry (rejected by the
  // loopback gate later, not by the parser).
  assert.deepEqual(parseLocalCoreEndpoints("socks5://127.0.0.1:1080, socks5://127.0.0.1:1081"), [
    "socks5://127.0.0.1:1080, socks5://127.0.0.1:1081",
  ]);
});

test("parseLocalCoreEndpoints returns [] for null or blank input", () => {
  assert.deepEqual(parseLocalCoreEndpoints(null), []);
  assert.deepEqual(parseLocalCoreEndpoints(""), []);
  assert.deepEqual(parseLocalCoreEndpoints("   \n  \r\n "), []);
});

test("parseLocalCoreEndpoints keeps a port-less entry as-is", () => {
  // The default port (8080 per the upsert rule) is applied in the sync loop.
  assert.deepEqual(parseLocalCoreEndpoints("socks5://127.0.0.1"), ["socks5://127.0.0.1"]);
});

test("redactCoreEntryForDetail strips userinfo from parseable entries", () => {
  const redacted = redactCoreEntryForDetail("socks5://user:pass@127.0.0.1:1080");
  assert.ok(!redacted.includes("user"), `userinfo leaked: ${redacted}`);
  assert.ok(!redacted.includes("pass"), `password leaked: ${redacted}`);
  assert.ok(redacted.includes("127.0.0.1:1080"));
});

test("redactCoreEntryForDetail leaves entries without userinfo unchanged", () => {
  assert.equal(redactCoreEntryForDetail("socks5://127.0.0.1:1080"), "socks5://127.0.0.1:1080");
});

test("redactCoreEntryForDetail strips userinfo even from malformed entries", () => {
  const redacted = redactCoreEntryForDetail("socks5://user:pass@???");
  assert.ok(!redacted.includes("user"), `userinfo leaked: ${redacted}`);
  assert.ok(!redacted.includes("pass"), `password leaked: ${redacted}`);
});

test("redactCoreEntryForDetail keeps a @ in the path of malformed entries", () => {
  // No authority userinfo here (no scheme, @ after a path slash): kept
  // verbatim so the stored detail stays diagnosable.
  assert.equal(redactCoreEntryForDetail("not-a-url/path@seg"), "not-a-url/path@seg");
});
