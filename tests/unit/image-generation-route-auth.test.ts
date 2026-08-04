/**
 * Auth + call-log attribution contract for the image generation routes.
 *
 * Split out of image-generation-route.test.ts to stay under the 800-line
 * new-test-file cap enforced by `npm run check:file-size`.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-image-route-auth-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "image-route-test-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { getCallLogs } = await import("../../src/lib/usage/callLogs.ts");
const imageRoute = await import("../../src/app/api/v1/images/generations/route.ts");
const providerImageRoute =
  await import("../../src/app/api/v1/providers/[provider]/images/generations/route.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

async function seedConnection(provider: string, apiKey: string) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey,
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
}

async function waitForCallLog(apiKeyId: string, timeoutMs = 2000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const logs = await getCallLogs({ apiKey: apiKeyId, limit: 5 });
    const match = logs.find((log: { apiKeyId?: string | null }) => log.apiKeyId === apiKeyId);
    if (match) return match;
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  return null;
}

async function readErrorMessage(response: Response): Promise<string> {
  const body = (await response.json()) as { error?: { message?: unknown } };
  return typeof body.error?.message === "string" ? body.error.message : "";
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(() => {
  globalThis.fetch = originalFetch;
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("v1 image generation POST requires an API key when REQUIRE_API_KEY is enabled", async () => {
  const originalRequireApiKey = process.env.REQUIRE_API_KEY;
  process.env.REQUIRE_API_KEY = "true";

  try {
    const response = await imageRoute.POST(
      new Request("http://localhost/api/v1/images/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "openai/gpt-image-2",
          prompt: "authentication test",
        }),
      })
    );

    assert.equal(response.status, 401);
    assert.match(await readErrorMessage(response), /Authentication required/);
  } finally {
    if (originalRequireApiKey === undefined) {
      delete process.env.REQUIRE_API_KEY;
    } else {
      process.env.REQUIRE_API_KEY = originalRequireApiKey;
    }
  }
});

test("v1 image generation POST rejects an invalid presented API key", async () => {
  const originalOmniRouteApiKey = process.env.OMNIROUTE_API_KEY;
  const originalRequireApiKey = process.env.REQUIRE_API_KEY;
  process.env.OMNIROUTE_API_KEY = "valid-image-route-key";
  process.env.REQUIRE_API_KEY = "true";

  try {
    const response = await imageRoute.POST(
      new Request("http://localhost/api/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: "Bearer invalid-image-route-key",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-image-2",
          prompt: "invalid authentication test",
        }),
      })
    );

    assert.equal(response.status, 401);
    assert.match(await readErrorMessage(response), /Invalid API key/);
  } finally {
    if (originalOmniRouteApiKey === undefined) {
      delete process.env.OMNIROUTE_API_KEY;
    } else {
      process.env.OMNIROUTE_API_KEY = originalOmniRouteApiKey;
    }
    if (originalRequireApiKey === undefined) {
      delete process.env.REQUIRE_API_KEY;
    } else {
      process.env.REQUIRE_API_KEY = originalRequireApiKey;
    }
  }
});

// Issue #2257: with enforcement off, a stale key in a CLI config must degrade to
// anonymous exactly like clientApiPolicy does — the route guard must not be
// stricter than the middleware that already fronts it.
test("v1 image generation POST ignores an invalid presented key while REQUIRE_API_KEY is off", async () => {
  const originalOmniRouteApiKey = process.env.OMNIROUTE_API_KEY;
  const originalRequireApiKey = process.env.REQUIRE_API_KEY;
  process.env.OMNIROUTE_API_KEY = "valid-image-route-key";
  process.env.REQUIRE_API_KEY = "false";

  globalThis.fetch = async (url) => {
    assert.equal(String(url), "http://localhost:7860/sdapi/v1/txt2img");
    return new Response(JSON.stringify({ images: ["YW5vbnltb3Vz"] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const response = await imageRoute.POST(
      new Request("http://localhost/api/v1/images/generations", {
        method: "POST",
        headers: {
          Authorization: "Bearer stale-cli-key",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "sdwebui/stable-diffusion-v1-5",
          prompt: "stale key degrades to anonymous",
        }),
      })
    );

    assert.equal(response.status, 200);
  } finally {
    if (originalOmniRouteApiKey === undefined) {
      delete process.env.OMNIROUTE_API_KEY;
    } else {
      process.env.OMNIROUTE_API_KEY = originalOmniRouteApiKey;
    }
    if (originalRequireApiKey === undefined) {
      delete process.env.REQUIRE_API_KEY;
    } else {
      process.env.REQUIRE_API_KEY = originalRequireApiKey;
    }
  }
});

// The dashboard Media page and Playground call these routes with a session
// cookie and no Bearer. clientApiPolicy admits them; the route guard must too.
test("v1 image generation POST accepts a dashboard session when REQUIRE_API_KEY is enabled", async () => {
  const originalRequireApiKey = process.env.REQUIRE_API_KEY;
  const originalJwtSecret = process.env.JWT_SECRET;
  process.env.REQUIRE_API_KEY = "true";
  process.env.JWT_SECRET = "image-route-dashboard-session-secret";

  globalThis.fetch = async (url) => {
    assert.equal(String(url), "http://localhost:7860/sdapi/v1/txt2img");
    return new Response(JSON.stringify({ images: ["ZGFzaGJvYXJk"] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const { SignJWT } = await import("jose");
    const token = await new SignJWT({ sub: "dashboard" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const response = await imageRoute.POST(
      new Request("http://localhost/api/v1/images/generations", {
        method: "POST",
        headers: {
          Cookie: `auth_token=${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "sdwebui/stable-diffusion-v1-5",
          prompt: "dashboard session test",
        }),
      })
    );

    assert.equal(response.status, 200);
  } finally {
    if (originalRequireApiKey === undefined) {
      delete process.env.REQUIRE_API_KEY;
    } else {
      process.env.REQUIRE_API_KEY = originalRequireApiKey;
    }
    if (originalJwtSecret === undefined) {
      delete process.env.JWT_SECRET;
    } else {
      process.env.JWT_SECRET = originalJwtSecret;
    }
  }
});

test("v1 image generation POST attributes its call log to the validated API key", async () => {
  const createdKey = await apiKeysDb.createApiKey(
    "Image generation caller",
    "machine-image-generation"
  );
  await seedConnection("openai", "image-provider-key");

  globalThis.fetch = async (url) => {
    assert.equal(String(url), "https://api.openai.com/v1/images/generations");
    return new Response(
      JSON.stringify({
        created: 123,
        data: [{ url: "https://cdn.example.com/attributed-image.png" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  const response = await imageRoute.POST(
    new Request("http://localhost/api/v1/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${createdKey.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-image-2",
        prompt: "call log attribution test",
      }),
    })
  );

  assert.equal(response.status, 200);
  const logged = await waitForCallLog(createdKey.id);
  assert.ok(logged, "expected an attributed image-generation call log");
  assert.equal(logged.apiKeyId, createdKey.id);
  assert.equal(logged.apiKeyName, "Image generation caller");
});

test("provider-scoped image generation requires an API key when configured", async () => {
  const originalRequireApiKey = process.env.REQUIRE_API_KEY;
  process.env.REQUIRE_API_KEY = "true";

  try {
    const response = await providerImageRoute.POST(
      new Request("http://localhost/api/v1/providers/openai/images/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-image-2",
          prompt: "provider-scoped authentication test",
        }),
      }),
      { params: Promise.resolve({ provider: "openai" }) }
    );

    assert.equal(response.status, 401);
    assert.match(await readErrorMessage(response), /Authentication required/);
  } finally {
    if (originalRequireApiKey === undefined) {
      delete process.env.REQUIRE_API_KEY;
    } else {
      process.env.REQUIRE_API_KEY = originalRequireApiKey;
    }
  }
});

test("provider-scoped image generation attributes its call log to the validated API key", async () => {
  const createdKey = await apiKeysDb.createApiKey(
    "Provider-scoped image caller",
    "machine-provider-image"
  );
  await seedConnection("openai", "provider-scoped-upstream-key");

  globalThis.fetch = async (url) => {
    assert.equal(String(url), "https://api.openai.com/v1/images/generations");
    return new Response(
      JSON.stringify({
        created: 456,
        data: [{ url: "https://cdn.example.com/provider-scoped-image.png" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  const response = await providerImageRoute.POST(
    new Request("http://localhost/api/v1/providers/openai/images/generations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${createdKey.key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-image-2",
        prompt: "provider-scoped attribution test",
      }),
    }),
    { params: Promise.resolve({ provider: "openai" }) }
  );

  assert.equal(response.status, 200);
  const logged = await waitForCallLog(createdKey.id);
  assert.ok(logged, "expected an attributed provider-scoped image-generation call log");
  assert.equal(logged.apiKeyId, createdKey.id);
  assert.equal(logged.apiKeyName, "Provider-scoped image caller");
});
