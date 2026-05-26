import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-registry-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const proxiesRoute = await import("../../src/app/api/settings/proxies/route.ts");

async function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("proxy registry blocks delete when proxy is still assigned", async () => {
  await resetStorage();

  const created = await proxiesDb.createProxy({
    name: "Delete Safety Proxy",
    type: "http",
    host: "127.0.0.1",
    port: 8080,
  });

  assert.ok(created?.id);
  await proxiesDb.assignProxyToScope("provider", "openai", created.id);

  await assert.rejects(
    async () => proxiesDb.deleteProxyById(created.id),
    (error) => {
      assert.equal((error as any).status, 409);
      (assert as any).equal((error as any).code, "proxy_in_use");
      return true;
    }
  );
});

test("createProxyAndAssign rolls back the registry row when assignment fails", async () => {
  await resetStorage();

  await assert.rejects(
    async () =>
      proxiesDb.createProxyAndAssign(
        {
          name: "Rollback Proxy",
          type: "http",
          host: "rollback.local",
          port: 8080,
        },
        { scope: "provider", scopeId: null }
      ),
    /scopeId is required/i
  );

  const proxies = await proxiesDb.listProxies({ includeSecrets: true });
  assert.equal(
    proxies.some((proxy: any) => proxy.name === "Rollback Proxy"),
    false
  );
});

test("createProxyAndAssign assigns and clears matching legacy proxy atomically", async () => {
  await resetStorage();

  await settingsDb.setProxyForLevel("provider", "openai", {
    type: "http",
    host: "legacy-openai.local",
    port: 8080,
  });

  const result = await proxiesDb.createProxyAndAssign(
    {
      name: "Atomic Provider Proxy",
      type: "https",
      host: "atomic-openai.local",
      port: 443,
      source: "dashboard-custom",
    },
    { scope: "provider", scopeId: "openai" }
  );

  assert.ok(result.proxy?.id);
  assert.equal(result.assignment?.proxyId, result.proxy?.id);
  assert.equal(result.assignment?.scope, "provider");
  assert.equal(result.assignment?.scopeId, "openai");
  assert.equal(await settingsDb.getProxyForLevel("provider", "openai"), null);
});

test("updateProxyAndAssign clears stored credentials when blanks are explicitly provided", async () => {
  await resetStorage();

  const created = await proxiesDb.createProxy({
    name: "Atomic Credential Proxy",
    type: "http",
    host: "atomic-credentials.local",
    port: 8080,
    username: "user-a",
    password: "pass-a",
    source: "dashboard-custom",
  });

  const result = await proxiesDb.updateProxyAndAssign(
    created.id,
    {
      username: "",
      password: "",
    },
    { scope: "provider", scopeId: "openai" }
  );
  const withSecrets = await proxiesDb.getProxyById(created.id, { includeSecrets: true });

  assert.equal(result?.assignment?.scope, "provider");
  assert.equal(result?.assignment?.scopeId, "openai");
  assert.equal(withSecrets?.username, "");
  assert.equal(withSecrets?.password, "");
});

test("specific registry account assignment takes precedence over legacy key proxy config", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "registry-precedence",
    apiKey: "sk-test",
  });

  await settingsDb.setProxyForLevel("key", (conn as any).id, {
    type: "http",
    host: "legacy-key.local",
    port: 8080,
  });

  const providerProxy = await proxiesDb.createProxy({
    name: "Provider Proxy",
    type: "https",
    host: "provider.local",
    port: 443,
  });
  const accountProxy = await proxiesDb.createProxy({
    name: "Account Proxy",
    type: "http",
    host: "account.local",
    port: 8081,
  });

  await proxiesDb.assignProxyToScope("provider", "openai", providerProxy.id);
  await proxiesDb.assignProxyToScope("account", (conn as any).id, accountProxy.id);

  const resolved = await settingsDb.resolveProxyForConnection((conn as any).id);
  assert.equal(resolved.level, "account");
  assert.equal(resolved.source, "registry");
  assert.equal(resolved.proxy.host, "account.local");
});

test("legacy proxy config migration imports global/provider/key assignments", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "legacy-import",
    apiKey: "sk-test-legacy",
  });

  await settingsDb.setProxyForLevel("global", null, {
    type: "http",
    host: "global.local",
    port: 8080,
  });
  await settingsDb.setProxyForLevel("provider", "openai", {
    type: "https",
    host: "provider-legacy.local",
    port: 443,
  });
  await settingsDb.setProxyForLevel("key", (conn as any).id, {
    type: "http",
    host: "account-legacy.local",
    port: 8082,
  });

  const result = await proxiesDb.migrateLegacyProxyConfigToRegistry();
  assert.equal(result.skipped, false);
  assert.equal(result.migrated >= 3, true);

  const resolved = await settingsDb.resolveProxyForConnection((conn as any).id);
  assert.equal(resolved.level, "account");
  assert.equal(resolved.source, "registry");
  assert.equal(resolved.proxy.host, "account-legacy.local");
});

// #2456: resolveProxyForProvider (used by the OAuth token exchange + token refresh,
// before any connection exists) only consulted the proxy registry. A proxy set the
// legacy way (/api/settings/proxy?level=provider) was ignored, so on a VPS the OAuth
// exchange went out direct and tripped Anthropic's IP rate limit. It must fall back to
// the legacy per-provider config, mirroring resolveProxyForConnection.
test("resolveProxyForProvider falls back to the legacy provider proxy config (#2456)", async () => {
  await resetStorage();

  await settingsDb.setProxyForLevel("provider", "claude", {
    type: "http",
    host: "legacy-claude-proxy.local",
    port: 3128,
  });

  // No proxy_registry assignment exists for "claude" — only the legacy config.
  const resolved = await proxiesDb.resolveProxyForProvider("claude");
  assert.ok(resolved, "expected the legacy provider proxy to be resolved");
  assert.equal((resolved as any).host, "legacy-claude-proxy.local");
  assert.equal((resolved as any).type, "http");
});

test("resolveProxyForProvider falls back to the legacy global proxy when no provider proxy (#2456)", async () => {
  await resetStorage();

  await settingsDb.setProxyForLevel("global", null, {
    type: "socks5",
    host: "legacy-global.local",
    port: 1080,
  });

  const resolved = await proxiesDb.resolveProxyForProvider("anthropic");
  assert.ok(resolved, "expected the legacy global proxy to be resolved");
  assert.equal((resolved as any).host, "legacy-global.local");
});

test("resolveProxyForProvider still prefers a registry assignment over legacy config (#2456)", async () => {
  await resetStorage();

  await settingsDb.setProxyForLevel("provider", "openai", {
    type: "http",
    host: "legacy-openai.local",
    port: 8080,
  });

  const registryProxy = await proxiesDb.createProxy({
    name: "Registry OpenAI",
    type: "https",
    host: "registry-openai.local",
    port: 443,
  });
  await proxiesDb.assignProxyToScope("provider", "openai", registryProxy.id);

  const resolved = await proxiesDb.resolveProxyForProvider("openai");
  assert.ok(resolved);
  assert.equal((resolved as any).host, "registry-openai.local", "registry assignment must win");
});

test("resolveProxyForProvider prefers legacy provider proxy over registry global fallback (#2601)", async () => {
  await resetStorage();

  await settingsDb.setProxyForLevel("provider", "claude", {
    type: "http",
    host: "legacy-claude-provider.local",
    port: 3128,
  });

  const globalProxy = await proxiesDb.createProxy({
    name: "Registry Global",
    type: "https",
    host: "registry-global.local",
    port: 443,
  });
  await proxiesDb.assignProxyToScope("global", null, globalProxy.id);

  const resolved = await proxiesDb.resolveProxyForProvider("claude");
  assert.ok(resolved);
  assert.equal(
    (resolved as any).host,
    "legacy-claude-provider.local",
    "provider-specific custom proxy must beat global registry fallback"
  );
});

test("resolveProxyForProvider returns null when neither registry nor legacy config has a proxy (#2456)", async () => {
  await resetStorage();
  const resolved = await proxiesDb.resolveProxyForProvider("gemini");
  assert.equal(resolved, null);
});

test("createProxyRegistrySchema accepts type:vercel and source:vercel-relay (schema gap-06)", async () => {
  // Note: We validate the schema directly using the worktree's absolute path because
  // tests run with CWD=/OmniRoute, so `@/` aliases resolve to the main branch's src/.
  // The assertion below confirms the worktree's schema accepts the new enum values.
  const { createProxyRegistrySchema } = await import(
    "../../src/shared/validation/schemas.ts"
  );

  const result = createProxyRegistrySchema.safeParse({
    name: "Vercel Relay Test",
    type: "vercel",
    host: "omniroute-relay-abc123.vercel.app",
    port: 443,
    source: "vercel-relay",
    notes: JSON.stringify({ relayAuth: "secret-relay-token" }),
  });

  assert.ok(result.success, `schema should accept type:vercel — errors: ${JSON.stringify("error" in result ? result.error : null)}`);
  if (result.success) {
    assert.equal(result.data.type, "vercel");
    assert.equal(result.data.source, "vercel-relay");
  }
});

test("createProxy persists type:vercel and source:vercel-relay to DB (schema gap-06)", async () => {
  await resetStorage();

  const created = await proxiesDb.createProxy({
    name: "Vercel Relay DB Test",
    type: "vercel",
    host: "omniroute-relay-xyz.vercel.app",
    port: 443,
    source: "vercel-relay",
    notes: JSON.stringify({ relayAuth: "my-token" }),
  });

  assert.ok(created?.id, "created proxy should have an id");
  assert.equal(created?.type, "vercel");
  assert.equal(created?.source, "vercel-relay");
});
