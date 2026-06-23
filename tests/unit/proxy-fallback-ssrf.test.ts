import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolate DATA_DIR before importing validation.ts (it initializes the DB on load)
// so the test never touches the developer's real ~/.omniroute database.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-proxy-ssrf-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { isRetryableProxyTarget } = await import("../../src/lib/providers/validation/index.ts");
const { isPrivateHost } = await import("../../src/shared/network/outboundUrlGuard.ts");

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

/**
 * SSRF hardening for the proxy auto-fallback (PR #3171). When provider
 * validation fails, the proxy-fallback path must NEVER auto-discover a proxy and
 * re-fetch a private / link-local / cloud-metadata target. The original PR's
 * inline host check missed several ranges; both the validation gate and the
 * canonical guard must now reject all of them.
 */

const PRIVATE_TARGETS = [
  "http://169.254.169.254/latest/meta-data/", // AWS/GCP/Azure metadata — the classic SSRF target
  "http://169.254.170.2/", // ECS task metadata
  "http://0.0.0.0:8080/",
  "http://127.0.0.1/",
  "http://127.10.20.30/", // 127/8, not just 127.0.0.1
  "http://10.0.0.5/",
  "http://192.168.1.1/",
  "http://172.16.0.1/",
  "http://172.31.255.255/",
  "http://100.64.0.1/", // CGNAT
  "http://[::1]/",
  "http://[fc00::1]/", // IPv6 ULA
  "http://[fd12:3456::1]/",
  "http://[fe80::1]/", // IPv6 link-local
  "http://metadata.google.internal/", // .internal metadata hostname
  "http://service.local/",
];

const PUBLIC_TARGETS = [
  "https://api.openai.com/v1/models",
  "https://api.anthropic.com/v1/messages",
  "https://example.com/",
  "http://8.8.8.8/",
];

test("isRetryableProxyTarget rejects every private / link-local / metadata host", () => {
  for (const url of PRIVATE_TARGETS) {
    assert.equal(
      isRetryableProxyTarget(url),
      false,
      `${url} must NOT be eligible for proxy-fallback (SSRF)`
    );
  }
});

test("isRetryableProxyTarget allows public provider targets", () => {
  for (const url of PUBLIC_TARGETS) {
    assert.equal(isRetryableProxyTarget(url), true, `${url} should be a valid proxy-fallback target`);
  }
});

test("isRetryableProxyTarget fails closed on an unparseable URL", () => {
  assert.equal(isRetryableProxyTarget("not a url"), false);
});

test("canonical isPrivateHost covers the SSRF ranges the route guard relies on", () => {
  for (const host of [
    "169.254.169.254",
    "0.0.0.0",
    "127.10.20.30",
    "172.16.0.1",
    "100.64.0.1",
    "fc00::1",
    "fe80::1",
    "metadata.google.internal",
  ]) {
    assert.equal(isPrivateHost(host), true, `${host} must be classified private`);
  }
  assert.equal(isPrivateHost("api.openai.com"), false);
});
