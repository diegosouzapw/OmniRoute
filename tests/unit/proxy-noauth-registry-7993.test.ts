/**
 * #7993: Noauth connections not using assigned proxies.
 *
 * Tests that proxy resolution for no-auth providers works through BOTH
 * the registry path (proxy_assignments) and the legacy path (proxyConfig.providers).
 *
 * The existing #6272 tests only cover the legacy path. This test verifies the
 * registry path is also correctly resolved.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-7993-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
delete process.env.INITIAL_PASSWORD;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { resolveNoAuthSharedProviderProxy } =
  await import("../../src/lib/db/settings/noAuthProxyFallback.ts");
const { assignProxyToScope, createProxy, listProxies, getProxyAssignments } =
  await import("../../src/lib/db/proxies.ts");
const { safeResolveProxy } = await import("../../src/sse/handlers/chatHelpers.ts");

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
});

test("#7993: resolveProxyForConnection('noauth', ...) finds a registry-assigned provider-level proxy for opencode", async () => {
  core.getDbInstance();

  // Create a proxy in the registry and assign it to provider=opencode
  const proxy = await createProxy({
    name: "test-proxy",
    type: "http",
    host: "10.0.99.1",
    port: 9999,
    username: "",
    password: "",
    status: "active",
  });

  assert.ok(proxy, "proxy should be created");
  await assignProxyToScope("provider", "opencode", proxy!.id);

  // Verify assignment exists
  const assignments = await getProxyAssignments({ scope: "provider" });
  const opencodeAssignments = assignments.filter((a) => a.scopeId === "opencode");
  assert.equal(opencodeAssignments.length, 1, "opencode should have a proxy assignment");
  assert.equal(
    opencodeAssignments[0].proxyId,
    proxy!.id,
    "assignment should reference the correct proxy"
  );

  // Now resolve the proxy for the synthetic noauth connection with providerId="opencode"
  const resolved = await settingsDb.resolveProxyForConnection("noauth", undefined, "opencode");

  assert.ok(resolved?.proxy, "proxy should be resolved");
  assert.equal(resolved.proxy.host, "10.0.99.1", "should find the assigned proxy host");
  assert.equal(resolved.proxy.port, 9999, "should find the assigned proxy port");
  assert.equal(resolved.level, "provider", "level should be 'provider'");
  assert.equal(resolved.levelId, "opencode", "levelId should be 'opencode'");
  assert.equal(resolved.source, "registry", "source should be 'registry'");
});

test("#7993: resolveProxyForConnection('noauth', ...) finds a registry-assigned provider-level proxy for theoldllm", async () => {
  core.getDbInstance();

  const proxy = await createProxy({
    name: "tllm-proxy",
    type: "socks5",
    host: "10.0.88.2",
    port: 1080,
    username: "user",
    password: "pass",
    status: "active",
  });

  assert.ok(proxy, "proxy should be created");
  await assignProxyToScope("provider", "theoldllm", proxy!.id);

  const resolved = await settingsDb.resolveProxyForConnection("noauth", undefined, "theoldllm");

  assert.ok(resolved?.proxy, "proxy should be resolved");
  assert.equal(resolved.proxy.host, "10.0.88.2");
  assert.equal(resolved.proxy.port, 1080);
  assert.equal(resolved.level, "provider");
  assert.equal(resolved.levelId, "theoldllm");
  assert.equal(resolved.source, "registry");
});

test("#7993: resolveNoAuthSharedProviderProxy finds registry proxy when providerId is not passed (iterates all)", async () => {
  core.getDbInstance();

  const proxy = await createProxy({
    name: "mimo-proxy",
    type: "http",
    host: "192.168.1.50",
    port: 3128,
    username: "",
    password: "",
    status: "active",
  });

  assert.ok(proxy);
  // Assign to mimocode (which is in NOAUTH_PROVIDERS but NOT in NOAUTH_PROVIDER_PROXY_SUPPORTED)
  await assignProxyToScope("provider", "mimocode", proxy!.id);

  // When providerId is NOT passed, the function iterates all NOAUTH_PROVIDERS
  // and should find the mimocode proxy
  const result = await resolveNoAuthSharedProviderProxy({});
  assert.ok(result, "should find a proxy even without providerId");
  assert.equal(result.proxy?.host, "192.168.1.50");
  assert.equal(result.levelId, "mimocode");
});

test("#7993: safeResolveProxy works with registry-assigned noauth provider proxy", async () => {
  core.getDbInstance();

  const proxy = await createProxy({
    name: "safe-proxy",
    type: "http",
    host: "10.1.1.1",
    port: 8080,
    username: "",
    password: "",
    status: "active",
  });

  assert.ok(proxy);
  await assignProxyToScope("provider", "opencode", proxy!.id);

  const resolved = await safeResolveProxy("noauth", undefined, "opencode");

  assert.ok(resolved?.proxy, "safeResolveProxy should return a proxy");
  assert.equal(resolved.proxy.host, "10.1.1.1");
  assert.equal(resolved.level, "provider");
});

test("#7993: resolveProxyForConnection prioritizes registry over legacy for the same noauth provider", async () => {
  core.getDbInstance();

  // Set a legacy proxy for opencode
  await settingsDb.setProxyForLevel("provider", "opencode", {
    type: "http",
    host: "legacy.example.com",
    port: 1111,
  });

  // Also create a registry proxy and assign it to opencode (should win)
  const registryProxy = await createProxy({
    name: "registry-wins",
    type: "http",
    host: "registry.example.com",
    port: 2222,
    username: "",
    password: "",
    status: "active",
  });

  assert.ok(registryProxy);
  await assignProxyToScope("provider", "opencode", registryProxy!.id);

  const resolved = await settingsDb.resolveProxyForConnection("noauth", undefined, "opencode");

  assert.ok(resolved?.proxy, "should resolve a proxy");
  // Registry should win over legacy
  assert.equal(
    resolved.proxy.host,
    "registry.example.com",
    "registry proxy should take precedence"
  );
  assert.equal(resolved.source, "registry", "source should indicate registry");
});

test("#7993: noauth proxy resolution returns null when no proxy is assigned to any noauth provider", async () => {
  core.getDbInstance();

  // Clean up any existing proxies
  await settingsDb.deleteProxyForLevel("provider", "opencode");
  await settingsDb.deleteProxyForLevel("provider", "theoldllm");
  await settingsDb.deleteProxyForLevel("provider", "mimocode");

  // Also clear registry assignments (delete by removing all assignments for these scopes)
  await assignProxyToScope("provider", "opencode", null);
  await assignProxyToScope("provider", "theoldllm", null);
  await assignProxyToScope("provider", "mimocode", null);

  const resolved = await settingsDb.resolveProxyForConnection("noauth", undefined, "opencode");

  // Should still resolve to global if set, or direct if no global
  assert.equal(resolved?.level, "direct", "should go direct when no proxy assigned");
});
