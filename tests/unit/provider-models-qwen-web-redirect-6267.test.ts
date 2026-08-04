// #6267 regression guard — a config-driven provider whose /models endpoint 307s
// must degrade to the local catalog OmniRoute ships, not surface a raw 503.
//
// Root cause: safeOutboundFetch throws REDIRECT_BLOCKED on the 307 →
// getSafeOutboundFetchErrorStatus maps it to 503 → buildDiscoveryErrorFallbackResponse
// returned null for status 503 → re-throw → raw 503, hiding the non-empty
// getModelsByProviderId("qwen-web") catalog. Fix: treat REDIRECT_BLOCKED as a
// non-fixable-config error that degrades to the cached/local catalog.
//
// Harness copied (minimal) from tests/unit/provider-models-route.test.ts — the
// frozen file's own note says the seedConnection/callRoute harness is not
// separately extractable, so a small local copy is acceptable.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-qwen-web-redirect-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

interface SeedOverrides {
  authType?: string;
  name?: string;
  apiKey?: string;
  accessToken?: string;
  isActive?: boolean;
  testStatus?: string;
  providerSpecificData?: Record<string, unknown>;
}

async function seedConnection(provider: string, overrides: SeedOverrides = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: overrides.authType || "apikey",
    name: overrides.name || `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: overrides.apiKey,
    accessToken: overrides.accessToken,
    isActive: overrides.isActive ?? true,
    testStatus: overrides.testStatus || "active",
    providerSpecificData: overrides.providerSpecificData || {},
  });
}

async function callRoute(connectionId: string, search = "") {
  return providerModelsRoute.GET(
    new Request(`http://localhost/api/providers/${connectionId}/models${search}`),
    { params: { id: connectionId } }
  );
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("qwen-web model import degrades to the local catalog when the /models endpoint 307s (#6267)", async () => {
  // A configured apiKey ensures the token gate passes and the config-driven
  // fetch is actually attempted (so we exercise the redirect path, not the
  // no-token fallback).
  const connection = await seedConnection("qwen-web", { apiKey: "qwen-web-cookie" });

  // Upstream answers the models probe with a 307 to the login page — the exact
  // shape safeOutboundFetch rejects with REDIRECT_BLOCKED.
  globalThis.fetch = (async () =>
    new Response(null, {
      status: 307,
      headers: { location: "https://chat.qwen.ai/login" },
    })) as typeof fetch;

  const response = await callRoute(connection.id);
  const body = (await response.json()) as {
    source?: string;
    models?: Array<{ id: string }>;
  };

  // RED before the fix: raw 503 (Redirect blocked … (307)).
  assert.equal(response.status, 200, "a redirect on the models endpoint must not surface a 503");
  assert.equal(body.source, "local_catalog", "should fall back to the shipped catalog");
  const ids = (body.models || []).map((m) => m.id);
  assert.ok(
    ids.includes("qwen3.7-max"),
    `qwen-web catalog should be surfaced; got: ${ids.join(", ")}`
  );
});
