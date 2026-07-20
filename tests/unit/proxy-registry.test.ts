import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-proxy-registry-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const proxiesRoute = await import("../../src/app/api/settings/proxies/route.ts");
const { createProxyRegistrySchema } = await import("../../src/shared/validation/schemas.ts");

async function resetStorage() {
  delete process.env.INITIAL_PASSWORD;
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
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

  const { items: proxies } = await proxiesDb.listProxies({ includeSecrets: true });
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
  assert.equal((resolved as any).level, "account");
  assert.equal((resolved as any).source, "registry");
  assert.equal((resolved as any).proxy.host, "account.local");
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
  assert.equal((resolved as any).level, "account");
  assert.equal((resolved as any).source, "registry");
  assert.equal((resolved as any).proxy.host, "account-legacy.local");
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

test("resolveProxyForConnection uses apiKey proxy before account-level proxy", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "api-key-proxy",
    apiKey: "sk-apikey-proxy",
  });

  const accountProxy = await proxiesDb.createProxy({
    name: "Account Proxy",
    type: "http",
    host: "account.local",
    port: 8081,
  });
  await proxiesDb.assignProxyToScope("account", (conn as any).id, accountProxy.id);

  const key = await apiKeysDb.createApiKey("proxy-test-key", "machine-p1");

  // Enable per-key proxy globally so the API key's proxy_id is honored
  core
    .getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'perKeyProxyEnabled', 'true')"
    )
    .run();

  const apiKeyProxy = await proxiesDb.createProxy({
    name: "API Key Proxy",
    type: "https",
    host: "apikey.local",
    port: 8443,
  });
  await apiKeysDb.updateApiKeyPermissions(key.id, { proxyId: apiKeyProxy.id });

  const resolved = await settingsDb.resolveProxyForConnection((conn as any).id, key.id);
  assert.ok(resolved);
  assert.equal((resolved as any).level, "apiKey");
  assert.equal((resolved as any).proxy.host, "apikey.local");
  assert.equal((resolved as any).proxy.port, 8443);
});

test("resolveProxyForConnection falls through when apiKey has no proxy_id", async () => {
  await resetStorage();

  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "fallthrough-test",
    apiKey: "sk-fallthrough",
  });

  const accountProxy = await proxiesDb.createProxy({
    name: "Account Proxy",
    type: "http",
    host: "account-fallthrough.local",
    port: 8081,
  });
  await proxiesDb.assignProxyToScope("account", (conn as any).id, accountProxy.id);

  const key = await apiKeysDb.createApiKey("fallthrough-key", "machine-ft");

  const resolved = await settingsDb.resolveProxyForConnection((conn as any).id, key.id);
  assert.ok(resolved);
  assert.equal((resolved as any).level, "account");
  assert.equal((resolved as any).proxy.host, "account-fallthrough.local");
});

test("connection proxy toggle gates account assignments and invalidates cached resolutions", async () => {
  await resetStorage();

  const directConnection = await providersDb.createProviderConnection({
    provider: "proxy-toggle-test-provider",
    authType: "apikey",
    name: "Direct Account",
    apiKey: "sk-direct-account",
  });
  const proxiedConnection = await providersDb.createProviderConnection({
    provider: "proxy-toggle-test-provider",
    authType: "apikey",
    name: "Proxied Account",
    apiKey: "sk-proxied-account",
  });

  const poolProxy = await proxiesDb.createProxy({
    name: "Pool Proxy",
    type: "http",
    host: "pool-proxy.local",
    port: 8080,
  });
  await proxiesDb.assignProxyToScope("account", (proxiedConnection as any).id, poolProxy.id);

  const directResolved = await settingsDb.resolveProxyForConnection((directConnection as any).id);
  assert.equal(directResolved.level, "direct");
  assert.equal(directResolved.proxy, null);

  const proxiedResolved = await settingsDb.resolveProxyForConnection((proxiedConnection as any).id);
  assert.equal(proxiedResolved.level, "account");
  assert.equal((proxiedResolved.proxy as any).host, "pool-proxy.local");

  const disabled = await providersDb.updateProviderConnection((proxiedConnection as any).id, {
    proxyEnabled: false,
  });
  assert.equal((disabled as any).proxyEnabled, false);

  const disabledResolved = await settingsDb.resolveProxyForConnection(
    (proxiedConnection as any).id
  );
  assert.equal(disabledResolved.level, "direct");
  assert.equal(disabledResolved.proxy, null);

  const enabled = await providersDb.updateProviderConnection((proxiedConnection as any).id, {
    proxyEnabled: true,
  });
  assert.equal((enabled as any).proxyEnabled, true);

  const enabledResolved = await settingsDb.resolveProxyForConnection((proxiedConnection as any).id);
  assert.equal(enabledResolved.level, "account");
  assert.equal((enabledResolved.proxy as any).host, "pool-proxy.local");
});

// #2996: Per-connection proxy 'direct' bypass. A connection with proxyEnabled:false
// must go DIRECT even when a GLOBAL proxy is configured. The existing toggle test
// (above) only proves the bypass beats an ACCOUNT-scoped assignment; this guards the
// exact scenario the issue requests — the per-connection bypass overriding a configured
// GLOBAL proxy (resolveProxyForConnection step 9, "global" registry level), and that it
// is a clean two-way toggle (re-enabling returns to the global proxy).
test("per-connection proxy 'direct' bypass overrides a configured GLOBAL proxy (#2996)", async () => {
  await resetStorage();

  const globalProxy = await proxiesDb.createProxy({
    name: "Global Bypass Proxy",
    type: "http",
    host: "global-bypass.local",
    port: 8080,
  });
  await proxiesDb.assignProxyToScope("global", null, globalProxy.id);

  // Use a provider name unique to this test so a registry/legacy provider-scoped
  // assignment left over from another test in the shared process cannot resolve at
  // step 6/8 and mask the GLOBAL precondition we are asserting (mirrors the hermetic
  // unique-provider pattern used by the "connection proxy toggle gates" test above).
  const connection = await providersDb.createProviderConnection({
    provider: "proxy-global-bypass-2996-provider",
    authType: "apikey",
    name: "Global Bypass Account",
    apiKey: "sk-global-bypass",
  });

  // No per-connection assignment: the connection should inherit the GLOBAL proxy.
  const globalResolved = await settingsDb.resolveProxyForConnection((connection as any).id);
  assert.equal(globalResolved.level, "global");
  assert.ok(globalResolved.proxy, "expected the global proxy to be resolved before bypass");
  assert.equal((globalResolved.proxy as any).host, "global-bypass.local");

  // Per-connection Proxy Off must override the configured GLOBAL proxy → direct.
  const disabled = await providersDb.updateProviderConnection((connection as any).id, {
    proxyEnabled: false,
  });
  assert.equal((disabled as any).proxyEnabled, false);

  const disabledResolved = await settingsDb.resolveProxyForConnection((connection as any).id);
  assert.equal(disabledResolved.level, "direct");
  assert.equal(disabledResolved.proxy, null);

  // Re-enabling restores the GLOBAL proxy — proves it is a clean toggle, not one-way.
  const enabled = await providersDb.updateProviderConnection((connection as any).id, {
    proxyEnabled: true,
  });
  assert.equal((enabled as any).proxyEnabled, true);

  const enabledResolved = await settingsDb.resolveProxyForConnection((connection as any).id);
  assert.equal(enabledResolved.level, "global");
  assert.equal((enabledResolved.proxy as any).host, "global-bypass.local");
});

test("provider connection proxy toggle fields round-trip as booleans", async () => {
  await resetStorage();

  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Boolean Toggle Account",
    apiKey: "sk-toggle-roundtrip",
  });

  const updated = await providersDb.updateProviderConnection((connection as any).id, {
    proxyEnabled: false,
    perKeyProxyEnabled: true,
  });
  const fetched = await providersDb.getProviderConnectionById((connection as any).id);

  assert.equal((updated as any).proxyEnabled, false);
  assert.equal((updated as any).perKeyProxyEnabled, true);
  assert.equal((fetched as any).proxyEnabled, false);
  assert.equal((fetched as any).perKeyProxyEnabled, true);
});

test("createProxyRegistrySchema accepts type:vercel and source:vercel-relay (schema gap-06)", async () => {
  // Note: We validate the schema directly using the worktree's absolute path because
  // tests run with CWD=/OmniRoute, so `@/` aliases resolve to the main branch's src/.
  // The assertion below confirms the worktree's schema accepts the new enum values.
  const { createProxyRegistrySchema } = await import("../../src/shared/validation/schemas.ts");

  const result = createProxyRegistrySchema.safeParse({
    name: "Vercel Relay Test",
    type: "vercel",
    host: "omniroute-relay-abc123.vercel.app",
    port: 443,
    source: "vercel-relay",
    notes: JSON.stringify({ relayAuth: "secret-relay-token" }),
  });

  assert.ok(
    result.success,
    `schema should accept type:vercel — errors: ${JSON.stringify("error" in result ? result.error : null)}`
  );
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

test("proxy registry schema accepts the IP family policy and defaults it to auto (#3777)", () => {
  // The dashboard proxy form (ProxyRegistryManager) now sends `family`. The schema is
  // .strict(), so an undeclared field would 400 the whole request — this guards the wiring.
  const explicit = createProxyRegistrySchema.parse({
    name: "v6-only proxy",
    type: "socks5",
    host: "proxy.example.com",
    port: 1080,
    family: "ipv6",
  });
  assert.equal(explicit.family, "ipv6");

  const defaulted = createProxyRegistrySchema.parse({
    name: "default family proxy",
    type: "http",
    host: "proxy.example.com",
    port: 8080,
  });
  assert.equal(defaulted.family, "auto");

  assert.throws(() =>
    createProxyRegistrySchema.parse({
      name: "bad family",
      type: "http",
      host: "proxy.example.com",
      port: 8080,
      family: "ipv7",
    })
  );
});

test("createProxy persists the IP family and reads it back (#3777)", async () => {
  await resetStorage();

  const created = await proxiesDb.createProxy({
    name: "Family RoundTrip",
    type: "socks5",
    host: "v6.example.com",
    port: 1080,
    family: "ipv6",
  });
  assert.equal(created?.family, "ipv6");

  const fetched = await proxiesDb.getProxyById(created.id, { includeSecrets: false });
  assert.equal(fetched?.family, "ipv6");

  // Omitting family defaults to "auto" (prior dual-stack behavior, no regression).
  const legacy = await proxiesDb.createProxy({
    name: "Family Default",
    type: "http",
    host: "dual.example.com",
    port: 8080,
  });
  assert.equal(legacy?.family, "auto");
});
