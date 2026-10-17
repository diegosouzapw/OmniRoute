import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-image-resilience-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "image-route-test-api-key-secret";
process.env.GROK_SUBSCRIPTION_IMAGES_ENABLED = "true";

await import("../_setup/imageCallLogLifecycle.ts");

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const imageRoute = await import("../../src/app/api/v1/images/generations/route.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const { setPinnedFetchTestOverride } = await import("../../src/shared/network/remoteImageFetch.ts");

const originalFetch = globalThis.fetch;

interface ImageModelRow {
  id: string;
  input_modalities?: string[];
}

interface ImageResponseBody {
  data: Array<{ b64_json?: string; url?: string }>;
}

interface ErrorResponseBody {
  error: { message: string; code?: string };
}

async function resetStorage() {
  globalThis.fetch = originalFetch;
  setPinnedFetchTestOverride(undefined);
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  // #6303 moved this route onto the shared unified catalog (getUnifiedModelsResponse),
  // which #6408 wrapped in a 1.5s TTL response cache keyed only by (prefix, isCodex
  // client, apiKey) — NOT by DB state. Without clearing it between test cases, a test
  // running within the TTL window of a previous one gets served the previous test's
  // stale serialized catalog instead of a fresh build reflecting this test's DB state.
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

async function seedConnection(
  provider: string,
  overrides: {
    authType?: string;
    apiKey?: string | null;
    accessToken?: string;
    refreshToken?: string;
    expiresAt?: string;
    projectId?: string;
    priority?: number;
    providerSpecificData?: Record<string, unknown>;
  } = {}
) {
  const authType = overrides.authType ?? "apikey";
  return providersDb.createProviderConnection({
    provider,
    authType,
    name: `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    ...(authType === "apikey" ? { apiKey: overrides.apiKey ?? "test-key" } : {}),
    ...(overrides.accessToken ? { accessToken: overrides.accessToken } : {}),
    ...(overrides.refreshToken ? { refreshToken: overrides.refreshToken } : {}),
    ...(overrides.expiresAt ? { expiresAt: overrides.expiresAt } : {}),
    ...(overrides.projectId ? { projectId: overrides.projectId } : {}),
    ...(overrides.priority ? { priority: overrides.priority } : {}),
    isActive: true,
    testStatus: "active",
    providerSpecificData: overrides.providerSpecificData ?? {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  setPinnedFetchTestOverride(undefined);
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const [provider, alias] of [
  ["grok-cli", "gc"],
  ["xai-oauth", "xao"],
  ["xai", "xai"],
]) {
  test(`image route uses ${provider} credentials for Grok Imagine and exposes its catalog`, async () => {
    await seedConnection(
      provider,
      provider === "xai"
        ? { apiKey: "xai-image-key" }
        : {
            authType: "oauth",
            accessToken: "grok-image-token",
            expiresAt: new Date(Date.now() + 86400000).toISOString(),
          }
    );
    let imageCalls = 0;
    globalThis.fetch = async (url, options: RequestInit = {}) => {
      assert.equal(String(url), "https://api.x.ai/v1/images/generations");
      imageCalls += 1;
      assert.equal(
        new Headers(options.headers).get("Authorization"),
        `Bearer ${provider === "xai" ? "xai-image-key" : "grok-image-token"}`
      );
      assert.deepEqual(JSON.parse(String(options.body)), {
        model: "grok-imagine-image-2.0",
        prompt: "A chef preparing pho",
        n: 1,
        aspect_ratio: "3:2",
        resolution: "1k",
        quality: "medium",
        response_format: "b64_json",
      });
      return Response.json({ data: [{ b64_json: "ZmFrZQ==" }] });
    };
    const response = await imageRoute.POST(
      new Request("http://localhost/v1/images/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: `${alias}/grok-imagine-image-2.0`,
          prompt: "A chef preparing pho",
          n: 1,
          size: "1536x1024",
          resolution: "1k",
          quality: "high",
          response_format: "b64_json",
        }),
      })
    );
    assert.equal(response.status, 200, await response.clone().text());
    assert.equal(imageCalls, 1);
    assert.deepEqual(((await response.json()) as ImageResponseBody).data, [
      { b64_json: "ZmFrZQ==" },
    ]);
    const catalog = await imageRoute.GET(new Request("http://localhost/v1/images/generations"));
    const payload = (await catalog.json()) as { data: ImageModelRow[] };
    assert.ok(payload.data.some((row) => row.id === `${provider}/grok-imagine-image-2.0`));
  });
}

test("Grok image route refreshes and persists OAuth credentials before generation", async () => {
  const connection = await seedConnection("grok-cli", {
    authType: "oauth",
    accessToken: "expired-grok-token",
    refreshToken: "grok-refresh-token",
    expiresAt: new Date(Date.now() - 60000).toISOString(),
  });
  const calls: string[] = [];
  globalThis.fetch = async (url, options: RequestInit = {}) => {
    calls.push(String(url));
    if (String(url) === "https://auth.x.ai/oauth2/token") {
      assert.equal(
        new URLSearchParams(String(options.body)).get("refresh_token"),
        "grok-refresh-token"
      );
      return Response.json({
        access_token: "fresh-grok-token",
        refresh_token: "rotated-grok-token",
        expires_in: 3600,
      });
    }
    assert.equal(String(url), "https://api.x.ai/v1/images/generations");
    assert.equal(new Headers(options.headers).get("Authorization"), "Bearer fresh-grok-token");
    return Response.json({ data: [{ url: "https://example.com/grok-image.jpg" }] });
  };
  const response = await imageRoute.POST(
    new Request("http://localhost/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "grok-cli/grok-imagine-image-2.0",
        prompt: "A chef preparing pho",
      }),
    })
  );
  assert.equal(response.status, 200, await response.clone().text());
  assert.deepEqual(calls, [
    "https://auth.x.ai/oauth2/token",
    "https://api.x.ai/v1/images/generations",
  ]);
  const saved = await providersDb.getProviderConnectionById(String(connection.id));
  assert.equal(saved?.accessToken, "fresh-grok-token");
  assert.equal(saved?.refreshToken, "rotated-grok-token");
});

test("Grok image route rejects invalid options before contacting upstream", async () => {
  await seedConnection("grok-cli", { authType: "oauth", accessToken: "grok-image-token" });
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    throw new Error("must not dispatch");
  };
  const response = await imageRoute.POST(
    new Request("http://localhost/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "grok-cli/grok-imagine-image-2.0",
        prompt: "A chef",
        resolution: "4k-secret",
      }),
    })
  );
  assert.equal(response.status, 400);
  assert.equal(called, false);
  const body = (await response.json()) as ErrorResponseBody;
  assert.doesNotMatch(body.error.message, /4k-secret|at \//);
});
