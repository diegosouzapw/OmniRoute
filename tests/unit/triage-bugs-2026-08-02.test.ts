/**
 * #8853 — authenticated HTTP proxy health checks drop credentials
 *
 * Root cause: both the auto-test route and the scheduler build proxy URLs
 * manually as `${proxy.type}://${proxy.host}:${proxy.port}`, dropping
 * username/password. The `proxyConfigToUrl()` function in proxyDispatcher.ts
 * already handles URL-encoded credentials correctly.
 *
 * We prove the bug by showing that the proxy URL produced by the current
 * manual construction lacks credentials, and that `proxyConfigToUrl()` with
 * the same config object includes them — therefore the fix is to reuse it.
 */
import test from "node:test";
import assert from "node:assert/strict";

// The function that fixes the bug — we import it here to verify it works
import { proxyConfigToUrl } from "@omniroute/open-sse/utils/proxyDispatcher";

// ── proxyConfigToUrl credential tests ──────────────────────────────────────

test("#8853 proxyConfigToUrl encodes username and password into proxy URL", () => {
  const url = proxyConfigToUrl({
    type: "http",
    host: "127.0.0.1",
    port: 3128,
    username: "alice",
    password: "s3cret",
  });
  assert.ok(url, "proxyConfigToUrl must return a URL");
  assert.match(url!, /:\/\/alice:s3cret@/, "URL must contain credentials");
});

test("#8853 proxyConfigToUrl encodes special characters in credentials", () => {
  const url = proxyConfigToUrl({
    type: "http",
    host: "proxy.example.com",
    port: 8080,
    username: "user@domain",
    password: "p@ss:w0rd",
  });
  assert.ok(url, "proxyConfigToUrl must return a URL");
  assert.match(url!, /:\/\/user%40domain:p%40ss%3Aw0rd@/, "URL must URL-encode special chars");
});

test("#8853 proxyConfigToUrl omits auth when no username", () => {
  const url = proxyConfigToUrl({
    type: "http",
    host: "127.0.0.1",
    port: 3128,
  });
  assert.ok(url, "proxyConfigToUrl must return a URL");
  assert.doesNotMatch(url!, /@/, "URL must not contain @ (no auth)");
});

test("#8853 proxyConfigToUrl handles IPv6 host with family", () => {
  const url = proxyConfigToUrl({
    type: "http",
    host: "[::1]",
    port: 3128,
    family: "ipv6",
  });
  assert.ok(url, "proxyConfigToUrl must return a URL");
  assert.match(url!, /\[::1\]/, "IPv6 host must be bracketed");
});

// ── Simulate the buggy construction ─────────────────────────────────────────

function buggyManualUrl(proxy: { type: string; host: string; port: number }) {
  return `${proxy.type}://${proxy.host}:${proxy.port}`;
}

test("#8853 manual URL construction (current bug) drops credentials", () => {
  const proxy = {
    type: "http",
    host: "127.0.0.1",
    port: 3128,
    username: "alice",
    password: "s3cret",
  };
  const manualUrl = buggyManualUrl(proxy);
  assert.doesNotMatch(manualUrl, /alice/, "Buggy URL must NOT contain username");
  assert.doesNotMatch(manualUrl, /s3cret/, "Buggy URL must NOT contain password");

  // Compare with proxyConfigToUrl which includes credentials
  const fixedUrl = proxyConfigToUrl(proxy);
  assert.ok(fixedUrl);
  assert.match(fixedUrl!, /alice/, "Fixed URL must contain username");
  assert.match(fixedUrl!, /s3cret/, "Fixed URL must contain password");
});

// ── Verify the scheduler and auto-test would use proxyConfigToUrl ──────────

test("#8853 proxyConfigToUrl accepts ProxyRegistryRecord-shaped object", () => {
  // Simulating the shape of a proxy record returned by listProxies({ includeSecrets: true })
  const proxyRecord = {
    id: "p1",
    name: "test",
    type: "http",
    host: "10.0.0.1",
    port: 8888,
    username: "bob",
    password: "p4ss",
    family: "auto",
    region: null,
    notes: null,
    status: "active",
    source: "manual",
    subscriptionId: null,
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
  };
  const url = proxyConfigToUrl(proxyRecord);
  assert.ok(url, "proxyConfigToUrl must accept ProxyRegistryRecord-shaped objects");
  assert.match(url!, /bob:p4ss/, "URL must include credentials from the record");
});

test("#8853 proxyConfigToUrl returns null for partial config (no host)", () => {
  const url = proxyConfigToUrl({ type: "http", port: 8080 } as Record<string, unknown>);
  assert.equal(url, null, "proxyConfigToUrl must return null for partial config without host");
});