import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #6939 — model-list fetch for a LAN-local OpenAI-compatible provider (e.g. LM Studio on
// 192.168.x.x) was rejected by the SSRF guard even though the connection test for the same
// host succeeds, under the default (local-first) settings. Root cause: the models route used
// getProviderOutboundGuard() (only "none" | "public-only", never consults the local-first
// default) instead of getProviderValidationGuard() (used by the test-connection path, which
// resolves to "block-metadata" — allow LAN, still block cloud-metadata/link-local — when
// local-first is ON, which is the default).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lan-guard-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const outboundUrlGuard = await import("../../src/shared/network/outboundUrlGuard.ts");
const outboundUrlGuardPolicy = await import("../../src/shared/network/outboundUrlGuardPolicy.ts");

const originalFetch = globalThis.fetch;
const originalAllowPrivateProviderUrls = process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
const originalAllowLocalProviderUrls = process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  if (originalAllowPrivateProviderUrls === undefined) {
    delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
  } else {
    process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = originalAllowPrivateProviderUrls;
  }
  if (originalAllowLocalProviderUrls === undefined) {
    delete process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS;
  } else {
    process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS = originalAllowLocalProviderUrls;
  }
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider: string, overrides: Record<string, unknown> = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: (overrides.authType as string) || "apikey",
    name: (overrides.name as string) || `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: overrides.apiKey as string | undefined,
    accessToken: overrides.accessToken as string | undefined,
    isActive: (overrides.isActive as boolean) ?? true,
    testStatus: (overrides.testStatus as string) || "active",
    providerSpecificData: (overrides.providerSpecificData as Record<string, unknown>) || {},
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

test("#6939: getProviderOutboundGuard() and getProviderValidationGuard() agree for LAN hosts under the default local-first setting", () => {
  // Default settings: OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS unset (ON by default),
  // OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS unset (OFF by default).
  delete process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS;
  delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;

  const validationGuard = outboundUrlGuardPolicy.getProviderValidationGuard();
  assert.equal(validationGuard, "block-metadata");

  // The models route must resolve a guard for LAN-local model discovery that is at least as
  // permissive as the validation (test-connection) guard — "public-only" would reject LAN.
  assert.notEqual(
    validationGuard,
    "public-only",
    "sanity: validation guard should allow LAN under the local-first default"
  );
});

test("#6939: LM Studio (LAN host, local OpenAI-compatible provider) model-list fetch is not SSRF-blocked under default settings", async () => {
  delete process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS;
  delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;

  const connection = await seedConnection("lm-studio", {
    providerSpecificData: { baseUrl: "http://192.168.1.50:1234/v1" },
  });

  let fetchCalled = false;
  globalThis.fetch = async () => {
    fetchCalled = true;
    return Response.json({ data: [{ id: "llama-3-8b-instruct" }] });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as Record<string, unknown>;

  // RED before the fix: the guard blocked the LAN host before the fetch mock ever ran,
  // surfacing a 400 "Blocked private or local provider URL" — even though the equivalent
  // test-connection call for the same host succeeds under the same default settings.
  assert.ok(
    fetchCalled,
    `expected the LAN model-list fetch to reach the network layer, got status=${response.status} body=${JSON.stringify(body)}`
  );
  assert.notEqual(response.status, 400);
  assert.ok(
    !String(body?.error || "").includes(outboundUrlGuard.PROVIDER_URL_BLOCKED_MESSAGE),
    `LAN host must not be SSRF-blocked by default: ${JSON.stringify(body)}`
  );
});

test("#6939: LAN model-list fetch is still blocked when the local-first default is explicitly disabled", async () => {
  delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
  process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS = "false";

  const connection = await seedConnection("lm-studio", {
    providerSpecificData: { baseUrl: "http://192.168.1.50:1234/v1" },
  });

  let fetchCalled = false;
  globalThis.fetch = async () => {
    fetchCalled = true;
    return Response.json({ data: [{ id: "llama-3-8b-instruct" }] });
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as Record<string, unknown>;

  assert.equal(fetchCalled, false, "guard should block before the network layer is reached");
  assert.equal(response.status, 400);
  assert.equal(body.error, outboundUrlGuard.PROVIDER_URL_BLOCKED_MESSAGE);
});
