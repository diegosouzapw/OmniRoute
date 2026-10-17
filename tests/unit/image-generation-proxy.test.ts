import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-image-generation-proxy-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "image-route-test-api-key-secret";

await import("../_setup/imageCallLogLifecycle.ts");

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const imageRoute = await import("../../src/app/api/v1/images/generations/route.ts");
const providerImageRoute =
  await import("../../src/app/api/v1/providers/[provider]/images/generations/route.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const { setPinnedFetchTestOverride } = await import("../../src/shared/network/remoteImageFetch.ts");

const originalFetch = globalThis.fetch;

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

test("v1 image generation POST resolves proxy and executes with proxy context when credentials.connectionId exists", { timeout: 5_000 }, async () => {
  // Create a connection — it gets an auto-generated id used as credentials.connectionId
  const connection = await seedConnection("openai", { apiKey: "image-proxy-key" });

  // Set a key-level proxy for this specific connection (id = connectionId)
  await settingsDb.setProxyForLevel("key", String(connection.id), {
    type: "http",
    host: "127.0.0.1",
    port: 1, // intentionally unreachable — proves proxy path was taken
  });

  // #9100 non-blocking probe: keep the request in flight so the fast-fail can
  // abort it with the proxy-specific 503 (see the edit-route case above).
  let releaseFetch: () => void;
  const fetchSettled = new Promise<void>((resolve) => {
    globalThis.fetch = async () => {
      await new Promise<void>((release) => { releaseFetch = release; });
      resolve();
      throw new DOMException("Fixture request aborted", "AbortError");
    };
  });

  try {
    const response = await imageRoute.POST(
      new Request("http://localhost/api/v1/images/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "openai/gpt-image-2",
          prompt: "proxy test image",
        }),
      })
    );

    assert.equal(response.status, 503);
    const body = (await response.json()) as ErrorResponseBody;
    assert.match(body.error.message, /unreachable/i);
  } finally {
    releaseFetch?.();
    await fetchSettled;
  }
});

test("v1 image generation POST executes directly when proxy resolution fails gracefully", async () => {
  await seedConnection("openai", { apiKey: "image-proxy-fail-key" });

  const db = core.getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('proxyConfig', 'keys', 'corrupt-json')"
  ).run();

  globalThis.fetch = async (url) => {
    const stringUrl = String(url);
    if (stringUrl === "https://api.openai.com/v1/images/generations") {
      return new Response(
        JSON.stringify({ created: 123, data: [{ url: "https://cdn.example.com/proxy-fail.png" }] }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  const response = await imageRoute.POST(
    new Request("http://localhost/api/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai/gpt-image-2",
        prompt: "proxy failover image",
      }),
    })
  );

  const body = (await response.json()) as ImageResponseBody;
  assert.equal(response.status, 200);
  assert.equal(body.data[0].url, "https://cdn.example.com/proxy-fail.png");
});

test("v1 image generation POST executes directly when credentials.connectionId is absent (authType: none)", async () => {
  globalThis.fetch = async (url) => {
    const stringUrl = String(url);
    if (stringUrl === "http://localhost:7860/sdapi/v1/txt2img") {
      return new Response(JSON.stringify({ images: ["YmFzZTY0LWltYWdl"] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  const response = await imageRoute.POST(
    new Request("http://localhost/api/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sdwebui/stable-diffusion-v1-5",
        prompt: "no credentials test",
      }),
    })
  );

  const body = (await response.json()) as ImageResponseBody;
  assert.equal(response.status, 200);
  assert.ok(body.data, "should have image data");
});

test("v1 image generation POST rotates to the next account after an upstream 401", async () => {
  await seedConnection("openai", { apiKey: "expired-image-key", priority: 1 });
  await seedConnection("openai", { apiKey: "healthy-image-key", priority: 2 });
  const authorizationHeaders: string[] = [];

  globalThis.fetch = async (url, options: RequestInit = {}) => {
    assert.equal(String(url), "https://api.openai.com/v1/images/generations");
    const authorization = new Headers(options.headers).get("authorization") ?? "";
    authorizationHeaders.push(authorization);
    if (authorization === "Bearer expired-image-key") {
      return new Response(JSON.stringify({ error: { message: "expired access token" } }), {
        status: 401,
        headers: { "content-type": "application/json" },
      });
    }
    assert.equal(authorization, "Bearer healthy-image-key");
    return new Response(
      JSON.stringify({ created: 123, data: [{ url: "https://cdn.example.com/rotated.png" }] }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  const response = await imageRoute.POST(
    new Request("http://localhost/api/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "openai/gpt-image-2", prompt: "rotate image account" }),
    })
  );
  const body = (await response.json()) as ImageResponseBody;

  assert.equal(response.status, 200);
  assert.equal(body.data[0].url, "https://cdn.example.com/rotated.png");
  assert.deepEqual(authorizationHeaders, ["Bearer expired-image-key", "Bearer healthy-image-key"]);
});

test("provider-scoped image generation POST uses the shared 401 account fallback", async () => {
  await seedConnection("openai", { apiKey: "provider-expired-key", priority: 1 });
  await seedConnection("openai", { apiKey: "provider-healthy-key", priority: 2 });
  const authorizationHeaders: string[] = [];

  globalThis.fetch = async (_url, options: RequestInit = {}) => {
    const authorization = new Headers(options.headers).get("authorization") ?? "";
    authorizationHeaders.push(authorization);
    if (authorization === "Bearer provider-expired-key") {
      return new Response(JSON.stringify({ error: { message: "expired access token" } }), {
        status: 401,
        headers: { "content-type": "application/json" },
      });
    }
    return new Response(
      JSON.stringify({ created: 123, data: [{ url: "https://cdn.example.com/provider.png" }] }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  const response = await providerImageRoute.POST(
    new Request("http://localhost/api/v1/providers/openai/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-image-2", prompt: "provider route rotation" }),
    }),
    { params: Promise.resolve({ provider: "openai" }) }
  );

  assert.equal(response.status, 200);
  assert.deepEqual(authorizationHeaders, [
    "Bearer provider-expired-key",
    "Bearer provider-healthy-key",
  ]);
});

test("v1 image generation POST normalizes a terminal upstream 401 to the OpenAI-standard error shape", async () => {
  await seedConnection("openai", { apiKey: "single-expired-image-key" });

  globalThis.fetch = async (url, options: RequestInit = {}) => {
    assert.equal(String(url), "https://api.openai.com/v1/images/generations");
    const authorization = new Headers(options.headers).get("authorization") ?? "";
    assert.equal(authorization, "Bearer single-expired-image-key");
    return new Response(JSON.stringify({ error: { message: "expired access token" } }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  };

  const response = await imageRoute.POST(
    new Request("http://localhost/api/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "openai/gpt-image-2", prompt: "normalize terminal 401" }),
    })
  );
  const body = (await response.json()) as ErrorResponseBody;

  assert.equal(response.status, 401);
  assert.deepEqual(body.error, {
    message: "expired access token",
    type: "authentication_error",
    code: "invalid_api_key",
  });
});

test("provider-scoped image generation POST normalizes a terminal upstream 401 to the OpenAI-standard error shape", async () => {
  await seedConnection("openai", { apiKey: "provider-single-expired-key" });

  globalThis.fetch = async (url, options: RequestInit = {}) => {
    assert.equal(String(url), "https://api.openai.com/v1/images/generations");
    const authorization = new Headers(options.headers).get("authorization") ?? "";
    assert.equal(authorization, "Bearer provider-single-expired-key");
    return new Response(JSON.stringify({ error: { message: "expired provider token" } }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  };

  const response = await providerImageRoute.POST(
    new Request("http://localhost/api/v1/providers/openai/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "gpt-image-2", prompt: "normalize provider terminal 401" }),
    }),
    { params: Promise.resolve({ provider: "openai" }) }
  );
  const body = (await response.json()) as ErrorResponseBody;

  assert.equal(response.status, 401);
  assert.deepEqual(body.error, {
    message: "expired provider token",
    type: "authentication_error",
    code: "invalid_api_key",
  });
});

test("v1 image generation POST refreshes an expired Antigravity token before dispatch", async () => {
  await seedConnection("antigravity", {
    authType: "oauth",
    accessToken: "expired-antigravity-token",
    refreshToken: "valid-antigravity-refresh-token",
    expiresAt: new Date(Date.now() - 60_000).toISOString(),
    projectId: "test-cloud-code-project",
  });
  const calls: Array<{ url: string; authorization: string }> = [];

  globalThis.fetch = async (url, options: RequestInit = {}) => {
    const stringUrl = String(url);
    const authorization = new Headers(options.headers).get("authorization") ?? "";
    calls.push({ url: stringUrl, authorization });

    if (stringUrl.includes("oauth2.googleapis.com/token")) {
      return new Response(
        JSON.stringify({
          access_token: "fresh-antigravity-token",
          expires_in: 3600,
          token_type: "Bearer",
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    assert.equal(stringUrl, "https://daily-cloudcode-pa.googleapis.com/v1internal:generateContent");
    assert.equal(authorization, "Bearer fresh-antigravity-token");
    return new Response(
      JSON.stringify({
        response: {
          candidates: [
            {
              content: {
                parts: [{ inlineData: { mimeType: "image/jpeg", data: "ZnJlc2gtaW1hZ2U=" } }],
              },
            },
          ],
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  const response = await imageRoute.POST(
    new Request("http://localhost/api/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "antigravity/gemini-3.1-flash-image",
        prompt: "refresh before image generation",
      }),
    })
  );
  const body = (await response.json()) as ImageResponseBody;

  assert.equal(response.status, 200);
  assert.equal(body.data[0].b64_json, "ZnJlc2gtaW1hZ2U=");
  assert.equal(calls.filter((call) => call.url.includes("oauth2.googleapis.com/token")).length, 1);
});
