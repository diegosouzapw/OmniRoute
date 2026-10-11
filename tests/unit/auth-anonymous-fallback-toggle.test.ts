/**
 * Per-provider opt-out for the synthetic anonymous (no-auth) credential
 * fallback (`noAuthFallbackDisabledProviders`).
 *
 * API-key gateway providers whose static definition declares
 * `anonymousFallback: true` (pollinations, kilocode, …) get a
 * synthetic "noauth" connection whenever all real configured connections are
 * terminal (expired/banned/credits_exhausted) or all unavailable. Upstream
 * endpoints now reject anonymous requests with 401 Missing API key, so operators
 * need a per-provider toggle to disable that fallback while keeping the provider
 * enabled and real keyed connections working.
 *
 * The gate applies ONLY to `anonymousFallback: true` API-key providers. True
 * no-auth providers (NOAUTH_PROVIDERS / WEB_COOKIE_PROVIDERS entries with
 * `noAuth: true`, e.g. duckduckgo-web) are NOT affected — for them the
 * synthetic credential is the only credential path and `blockedProviders` is
 * the disable mechanism.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-anon-fallback-toggle-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { getProviderCredentials } = await import("../../src/sse/services/auth.ts");
const { createProviderConnection, updateProviderConnection, deleteProviderConnectionsByProvider } =
  await import("../../src/lib/db/providers.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

/** Set the opt-out list; pass null to remove the key entirely (absent setting). */
async function setNoAuthFallbackDisabledProviders(providers: string[] | null): Promise<void> {
  if (providers === null) {
    const db = core.getDbInstance();
    db.prepare(
      "DELETE FROM key_value WHERE namespace = 'settings' AND key = 'noAuthFallbackDisabledProviders'"
    ).run();
    return;
  }
  await updateSettings({ noAuthFallbackDisabledProviders: providers });
}

function assertSyntheticNoAuth(creds: unknown, providerId: string): void {
  assert.ok(creds, `${providerId} must resolve to synthetic no-auth credentials`);
  assert.equal(
    (creds as { connectionId?: string }).connectionId,
    "noauth",
    `${providerId} should return the synthetic "noauth" connection`
  );
  assert.equal((creds as { apiKey?: unknown }).apiKey, null, "anonymous access carries no api key");
}

test("a. backward compat default: no setting → terminal pollinations falls back to noauth", async () => {
  await setNoAuthFallbackDisabledProviders(null);
  await deleteProviderConnectionsByProvider("pollinations");
  await createProviderConnection({
    provider: "pollinations",
    authType: "apikey",
    name: "expired-key-default",
    apiKey: "sk-expired-default",
    isActive: false,
    testStatus: "expired",
  });

  const creds = await getProviderCredentials("pollinations");
  assertSyntheticNoAuth(creds, "pollinations");
});

test("b. disabled + all terminal → allExpired result, never noauth", async () => {
  await setNoAuthFallbackDisabledProviders(["pollinations"]);
  await deleteProviderConnectionsByProvider("pollinations");
  await createProviderConnection({
    provider: "pollinations",
    authType: "apikey",
    name: "expired-key-disabled",
    apiKey: "sk-expired-disabled",
    isActive: false,
    testStatus: "expired",
  });

  const result = (await getProviderCredentials("pollinations")) as Record<string, unknown> | null;
  assert.ok(result, "must return a structured result (allExpired), not null");
  assert.equal(result.allExpired, true, "terminal connections should surface as allExpired");
  assert.notEqual(
    result.connectionId,
    "noauth",
    "disabled provider must never receive synthetic no-auth credentials"
  );
});

test("c. disabled + zero connections → null, never noauth", async () => {
  await setNoAuthFallbackDisabledProviders(["pollinations", "kilocode"]);
  await deleteProviderConnectionsByProvider("kilocode");

  const result = await getProviderCredentials("kilocode");
  assert.equal(result, null, "disabled provider with no connections must not fall back to noauth");
});

test("d. disabled + healthy real connection → real credentials still selected", async () => {
  await setNoAuthFallbackDisabledProviders(["pollinations"]);
  await deleteProviderConnectionsByProvider("pollinations");
  const created = await createProviderConnection({
    provider: "pollinations",
    authType: "apikey",
    name: "healthy-key",
    apiKey: "sk-pollinations-live",
    isActive: true,
    testStatus: "active",
  });

  const result = (await getProviderCredentials("pollinations")) as Record<string, unknown> | null;
  assert.ok(result, "healthy keyed connection must still resolve to credentials");
  assert.equal(result.connectionId, created.id, "must select the real DB connection");
  assert.equal(result.apiKey, "sk-pollinations-live", "real api key must be returned");
  assert.notEqual(result.connectionId, "noauth");
});

test("e. recovery: rate-limited → allRateLimited; quota recovered → real connection again", async () => {
  await setNoAuthFallbackDisabledProviders(["pollinations"]);
  await deleteProviderConnectionsByProvider("pollinations");
  const created = await createProviderConnection({
    provider: "pollinations",
    authType: "apikey",
    name: "recovering-key",
    apiKey: "sk-pollinations-recover",
    isActive: true,
    testStatus: "active",
    rateLimitedUntil: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
  });

  const exhausted = (await getProviderCredentials("pollinations")) as Record<
    string,
    unknown
  > | null;
  assert.ok(exhausted, "rate-limited connection must produce a structured result");
  assert.equal(
    exhausted.allRateLimited,
    true,
    "while rate limited the provider should surface allRateLimited, not noauth"
  );
  assert.notEqual(exhausted.connectionId, "noauth");

  await updateProviderConnection(created.id as string, { rateLimitedUntil: null });

  const recovered = (await getProviderCredentials("pollinations")) as Record<
    string,
    unknown
  > | null;
  assert.ok(recovered, "recovered connection must resolve to credentials again");
  assert.equal(
    recovered.connectionId,
    created.id,
    "once quota recovers the real connection must be selected again"
  );
  assert.equal(recovered.apiKey, "sk-pollinations-recover");
});

test("f. true no-auth provider unaffected: duckduckgo-web still returns synthetic noauth", async () => {
  await setNoAuthFallbackDisabledProviders(["duckduckgo-web", "pollinations", "kilocode"]);

  const creds = await getProviderCredentials("duckduckgo-web");
  assertSyntheticNoAuth(creds, "duckduckgo-web");
});

test("g. re-enable: removing provider from the list restores the fallback", async () => {
  await setNoAuthFallbackDisabledProviders(["kilocode"]);
  await deleteProviderConnectionsByProvider("pollinations");
  await createProviderConnection({
    provider: "pollinations",
    authType: "apikey",
    name: "expired-key-reenabled",
    apiKey: "sk-expired-reenabled",
    isActive: false,
    testStatus: "expired",
  });

  const creds = await getProviderCredentials("pollinations");
  assertSyntheticNoAuth(creds, "pollinations");
});
