/**
 * Factory subscription gateway: OAuth-only registry/catalog contract.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { APIKEY_PROVIDERS_GATEWAYS } =
  await import("../../src/shared/constants/providers/apikey/gateways.ts");
const { OAUTH_PROVIDERS } = await import("../../src/shared/constants/providers/oauth.ts");

test("factory is registered as an OAuth subscription gateway", () => {
  const entry = (REGISTRY as Record<string, Record<string, unknown>>).factory;
  assert.ok(entry, "factory should be present in the executor registry");
  assert.equal(entry.format, "openai");
  assert.equal(entry.executor, "factory");
  assert.equal(entry.authType, "oauth");
  assert.equal(entry.authHeader, "bearer");
  assert.equal(entry.passthroughModels, true);
  assert.equal(entry.liveCatalogAuthoritative, false);
  assert.ok(Array.isArray(entry.models) && entry.models.length > 1);
});

test("factory is in the OAuth catalog, not the API-key gateway catalog", () => {
  const gw = (APIKEY_PROVIDERS_GATEWAYS as Record<string, unknown>).factory;
  assert.equal(gw, undefined);
  const oauth = (OAUTH_PROVIDERS as Record<string, Record<string, unknown>>).factory;
  assert.ok(oauth, "factory should be in the OAuth provider catalog");
  assert.equal(oauth.id, "factory");
  assert.equal(oauth.subscriptionRisk, true);
  assert.equal(oauth.passthroughModels, true);
});
