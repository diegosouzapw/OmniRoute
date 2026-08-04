/**
 * PR #5065 — Factory (factory.ai) subscription gateway provider.
 *
 * Factory Droids' hosted gateway is exposed as a first-class routing provider
 * (`factory`). Verify the executor registry entry is wired with the public
 * OpenAI-compatible endpoint + Bearer apikey auth, and that the dashboard
 * gateway catalog carries the matching entry so the provider is discoverable.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
const { APIKEY_PROVIDERS_GATEWAYS } = await import(
  "../../src/shared/constants/providers/apikey/gateways.ts"
);

test("#5065 factory is registered with the OpenAI-compatible v1 endpoint", () => {
  const entry = (REGISTRY as Record<string, Record<string, unknown>>).factory;
  assert.ok(entry, "factory should be present in the executor registry");
  assert.equal(entry.format, "openai");
  assert.equal(entry.baseUrl, "https://api.factory.ai/v1/chat/completions");
  assert.equal(entry.authType, "apikey");
  assert.equal(entry.authHeader, "bearer");
  assert.ok(Array.isArray(entry.models), "factory must expose a model catalogue");
});

test("#5065 factory gateway entry is present in the dashboard catalog", () => {
  const gw = (APIKEY_PROVIDERS_GATEWAYS as Record<string, Record<string, unknown>>).factory;
  assert.ok(gw, "factory should be in the apikey gateway catalog");
  assert.equal(gw.id, "factory");
  assert.equal(gw.passthroughModels, true);
  assert.ok(
    typeof gw.website === "string" && (gw.website as string).includes("factory.ai"),
    "factory gateway must point at factory.ai"
  );
});
