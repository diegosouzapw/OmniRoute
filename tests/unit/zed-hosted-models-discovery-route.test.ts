import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-zed-hosted-models-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const zedAuth = await import("../../open-sse/shared/zedAuth.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

type SeenRequest = {
  url: string;
  method: string;
  authorization: string | null;
  body: string | null;
};

type RouteBody = {
  provider?: string;
  models?: Array<{ id: string; name?: string; [key: string]: unknown }>;
  source?: string;
  warning?: string;
  error?: string;
};

const originalFetch = globalThis.fetch;

// Zed's LLM-token + model caches are module-level and keyed by
// `${userId}:${organizationId}:${accessToken.slice(-16)}`; each test uses its own
// token AND clears the caches so no test can be served a neighbour's catalog.
async function resetStorage() {
  globalThis.fetch = originalFetch;
  zedAuth.clearZedCaches();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedZedConnection(accessToken: string) {
  return providersDb.createProviderConnection({
    provider: "zed-hosted",
    authType: "oauth",
    name: `zed-${Math.random().toString(16).slice(2, 8)}`,
    accessToken,
    isActive: true,
    testStatus: "active",
    providerSpecificData: { userId: 4242, organizationId: "org-personal" },
  });
}

async function callRoute(connectionId: string, search = "?refresh=true") {
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
  zedAuth.clearZedCaches();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("zed-hosted model discovery mints an LLM token and lists the live catalog", async () => {
  const accessToken = "zed-account-token-happy-path";
  const connection = await seedZedConnection(accessToken);
  const seen: SeenRequest[] = [];

  globalThis.fetch = async (url, init) => {
    const requestUrl = String(url);
    const headers = new Headers(init?.headers as HeadersInit | undefined);
    seen.push({
      url: requestUrl,
      method: (init?.method || "GET").toUpperCase(),
      authorization: headers.get("authorization"),
      body: typeof init?.body === "string" ? init.body : null,
    });

    if (requestUrl.endsWith("/client/llm_tokens")) {
      // Zed authorizes the mint with its own `<userId> <accessToken>` scheme.
      if (headers.get("authorization") !== `4242 ${accessToken}`) {
        return new Response("Invalid Authorization header", { status: 401 });
      }
      return Response.json({ token: "zed-llm-token-abc" });
    }

    if (requestUrl.endsWith("/models")) {
      // The catalog endpoint only accepts the minted LLM token.
      if (headers.get("authorization") !== "Bearer zed-llm-token-abc") {
        return new Response("Invalid Authorization header", { status: 401 });
      }
      return Response.json({
        models: [
          {
            id: "claude-sonnet-4.5",
            display_name: "Claude Sonnet 4.5",
            max_token_count: 200000,
            max_output_tokens: 64000,
            supports_tools: true,
            supports_images: true,
          },
          {
            id: "gpt-5",
            display_name: "GPT-5",
            max_token_count: 400000,
            supports_tools: true,
          },
          {
            id: "retired-model",
            display_name: "Retired",
            is_disabled: true,
          },
        ],
        default_model: "claude-sonnet-4.5",
      });
    }

    throw new Error(`Unexpected fetch: ${requestUrl}`);
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as RouteBody;

  assert.equal(response.status, 200);
  assert.equal(body.source, "api", `expected live discovery, got ${JSON.stringify(body)}`);

  const ids = (body.models || []).map((model) => model.id);
  assert.deepEqual(ids.sort(), ["claude-sonnet-4.5", "gpt-5"]);

  const sonnet = (body.models || []).find((model) => model.id === "claude-sonnet-4.5");
  assert.equal(sonnet?.name, "Claude Sonnet 4.5");

  // The regression this guards: before the fix the route fell through to the
  // registry `modelsUrl` path, which sends `Bearer <accessToken>` straight to
  // cloud.zed.dev/models and always 401s. Assert the token exchange happened and
  // that the catalog call carried the minted LLM token, never the account token.
  const mint = seen.find((request) => request.url.endsWith("/client/llm_tokens"));
  assert.ok(mint, "expected POST /client/llm_tokens");
  assert.equal(mint.method, "POST");
  assert.equal(mint.authorization, `4242 ${accessToken}`);
  assert.equal(JSON.parse(mint.body || "{}").organization_id, "org-personal");

  const catalog = seen.find((request) => request.url.endsWith("/models"));
  assert.ok(catalog, "expected GET /models");
  assert.equal(catalog.authorization, "Bearer zed-llm-token-abc");
  assert.notEqual(catalog.authorization, `Bearer ${accessToken}`);
});

test("zed-hosted model discovery resolves the organization when the connection has none", async () => {
  // The OAuth import stores `organizationId: tokens.organization_id || undefined`
  // (src/lib/oauth/providers/zed-hosted.ts) — a connection can legitimately land
  // without one, in which case the mint has to discover it via /client/users/me.
  const accessToken = "zed-account-token-no-org";
  const connection = await providersDb.createProviderConnection({
    provider: "zed-hosted",
    authType: "oauth",
    name: `zed-${Math.random().toString(16).slice(2, 8)}`,
    accessToken,
    isActive: true,
    testStatus: "active",
    providerSpecificData: { userId: 4242 },
  });
  const seen: string[] = [];

  globalThis.fetch = async (url, init) => {
    const requestUrl = String(url);
    const headers = new Headers(init?.headers as HeadersInit | undefined);
    seen.push(requestUrl);

    if (requestUrl.endsWith("/client/users/me")) {
      return Response.json({
        id: 4242,
        organizations: [{ id: "org-discovered", is_personal: true }],
      });
    }
    if (requestUrl.endsWith("/client/llm_tokens")) {
      const body = JSON.parse(typeof init?.body === "string" ? init.body : "{}");
      if (body.organization_id !== "org-discovered") {
        return new Response("Unknown organization", { status: 403 });
      }
      return Response.json({ token: "zed-llm-token-xyz" });
    }
    if (requestUrl.endsWith("/models")) {
      if (headers.get("authorization") !== "Bearer zed-llm-token-xyz") {
        return new Response("Invalid Authorization header", { status: 401 });
      }
      return Response.json({ models: [{ id: "gpt-5", display_name: "GPT-5" }] });
    }
    throw new Error(`Unexpected fetch: ${requestUrl}`);
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as RouteBody;

  assert.equal(response.status, 200);
  assert.equal(body.source, "api", `expected live discovery, got ${JSON.stringify(body)}`);
  assert.deepEqual(
    (body.models || []).map((model) => model.id),
    ["gpt-5"]
  );
  assert.ok(
    seen.some((url) => url.endsWith("/client/users/me")),
    "expected the organization lookup"
  );
});

test("zed-hosted model discovery degrades to the local catalog when Zed rejects the token", async () => {
  const accessToken = "zed-account-token-rejected";
  const connection = await seedZedConnection(accessToken);

  globalThis.fetch = async (url) => {
    const requestUrl = String(url);
    if (requestUrl.endsWith("/client/llm_tokens")) {
      return new Response("Invalid Authorization header", { status: 401 });
    }
    throw new Error(`Unexpected fetch: ${requestUrl}`);
  };

  const response = await callRoute(connection.id);
  const body = (await response.json()) as RouteBody;

  assert.notEqual(response.status, 500);
  assert.notEqual(body.source, "api");
  // Never leak a stack trace through the discovery error path (Hard Rule #12).
  const serialized = JSON.stringify(body);
  assert.ok(!serialized.includes("at /"), serialized);
  assert.ok(!serialized.includes(".ts:"), serialized);
});
