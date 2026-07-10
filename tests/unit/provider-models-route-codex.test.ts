import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-provider-model-routes-codex-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");
const codexDiscovery = await import("../../src/app/api/providers/[id]/models/discovery/codex.ts");

type RouteModel = {
  id: string;
  name?: string;
  apiFormat?: string;
  supportedEndpoints?: string[];
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  [key: string]: unknown;
};

type RouteBody = {
  provider?: string;
  models?: RouteModel[];
  source?: string;
  warning?: string;
  intentional?: boolean;
};

type ProviderOverrides = {
  authType?: string;
  apiKey?: string | null;
  accessToken?: string | null;
  providerSpecificData?: Record<string, unknown>;
};

const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  codexDiscovery.clearCodexGithubCatalogCacheForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedCodexConnection(overrides: ProviderOverrides = {}) {
  return providersDb.createProviderConnection({
    provider: "codex",
    authType: overrides.authType || "oauth",
    name: `codex-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: overrides.apiKey,
    accessToken: overrides.accessToken,
    isActive: true,
    testStatus: "active",
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
  codexDiscovery.clearCodexGithubCatalogCacheForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("provider models route discovers live Codex models and preserves static aliases", async () => {
  const connection = await seedCodexConnection({
    accessToken: "codex-access-token",
    providerSpecificData: { chatgptAccountId: "account-123" },
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection("codex", connection.id, [
    { id: "stale-codex-model", name: "Stale Codex Model", source: "imported" },
  ]);
  const seenRequests: Array<Record<string, string | null>> = [];

  globalThis.fetch = async (url, init) => {
    const requestUrl = String(url);
    const headers = new Headers(init?.headers as HeadersInit | undefined);
    seenRequests.push({
      url: requestUrl,
      authorization: headers.get("authorization"),
      workspaceId: headers.get("chatgpt-account-id"),
      originator: headers.get("originator"),
      userAgent: headers.get("user-agent"),
    });
    if (requestUrl.includes("raw.githubusercontent.com/openai/codex")) {
      return Response.json({
        models: [
          {
            slug: "gpt-5.6",
            display_name: "GPT 5.6 GitHub",
            visibility: "list",
            supported_in_api: true,
            minimal_client_version: "0.142.0",
            context_window: 372000,
            input_modalities: ["text", "image"],
            supported_reasoning_levels: [{ effort: "low" }, { effort: "high" }],
          },
        ],
      });
    }
    return Response.json({
      models: [
        { slug: "codex-auto-review", visibility: "hide", supported_in_api: true },
        {
          slug: "gpt-5.6",
          display_name: "GPT 5.6",
          visibility: "list",
          supported_in_api: true,
          max_input_tokens: 272000,
          max_output_tokens: 128000,
        },
        { id: "", name: "missing-id" },
      ],
    });
  };

  const response = await callRoute(connection.id, "?refresh=true");
  const body = (await response.json()) as RouteBody;
  const modelIds = new Set(body.models?.map((model) => model.id));
  const liveModel = body.models?.find((model) => model.id === "gpt-5.6");
  const syncedModels = await modelsDb.getSyncedAvailableModelsForConnection("codex", connection.id);
  const syncedIds = new Set(syncedModels.map((model) => model.id));

  assert.equal(response.status, 200);
  assert.equal(body.provider, "codex");
  assert.equal(body.source, "api");
  assert.deepEqual(seenRequests, [
    {
      url: "https://chatgpt.com/backend-api/codex/models?client_version=0.142.0",
      authorization: "Bearer codex-access-token",
      workspaceId: "account-123",
      originator: "codex_cli_rs",
      userAgent: "codex-cli/0.142.0 (Windows 10.0.26200; x64)",
    },
    {
      url: "https://raw.githubusercontent.com/openai/codex/refs/heads/main/codex-rs/models-manager/models.json",
      authorization: null,
      workspaceId: null,
      originator: null,
      userAgent: null,
    },
  ]);
  assert.equal(liveModel?.name, "GPT 5.6");
  assert.equal(liveModel?.inputTokenLimit, 272000);
  assert.equal(liveModel?.outputTokenLimit, 128000);
  assert.equal(liveModel?.apiFormat, "responses");
  assert.deepEqual(liveModel?.supportedEndpoints, ["responses"]);
  assert.equal(liveModel?.supportsThinking, true);
  assert.equal(liveModel?.supportsVision, true);
  assert.ok(modelIds.has("gpt-5.5-low"));
  assert.ok(modelIds.has("gpt-5.4-xhigh"));
  assert.ok(syncedIds.has("gpt-5.6"));
  assert.ok(syncedIds.has("gpt-5.5-low"));
  assert.ok(syncedIds.has("gpt-5.4-xhigh"));
  assert.equal(modelIds.has("stale-codex-model"), false);
  assert.equal(syncedIds.has("stale-codex-model"), false);
});

test("provider models route uses the GitHub Codex catalog when live discovery fails", async () => {
  const connection = await seedCodexConnection({ accessToken: "codex-access-token" });
  const seenUrls: string[] = [];

  globalThis.fetch = async (url) => {
    const requestUrl = String(url);
    seenUrls.push(requestUrl);
    if (requestUrl.includes("raw.githubusercontent.com/openai/codex")) {
      return Response.json({
        models: [
          {
            slug: "gpt-5.6-sol",
            display_name: "GPT-5.6-Sol",
            visibility: "list",
            supported_in_api: true,
            minimal_client_version: "0.142.0",
            context_window: 372000,
          },
        ],
      });
    }
    return new Response("upstream unavailable", { status: 503 });
  };

  const response = await callRoute(connection.id, "?refresh=true");
  const body = (await response.json()) as RouteBody;
  const modelIds = new Set((body.models || []).map((model) => model.id));

  assert.equal(response.status, 200);
  assert.equal(body.provider, "codex");
  assert.equal(body.source, "api");
  assert.equal(body.intentional, undefined);
  assert.equal(body.warning, "Codex live catalog unavailable — using GitHub model catalog");
  assert.ok(seenUrls.some((url) => url.includes("backend-api/codex/models")));
  assert.ok(seenUrls.some((url) => url.includes("raw.githubusercontent.com/openai/codex")));
  assert.ok(modelIds.has("gpt-5.6-sol"));
  assert.ok(modelIds.has("gpt-5.5-low"));
});

test("provider models route returns cached Codex models when refresh discovery fails", async () => {
  const connection = await seedCodexConnection({ accessToken: "codex-access-token" });
  await modelsDb.replaceSyncedAvailableModelsForConnection("codex", connection.id, [
    {
      id: "cached-live-codex",
      name: "Cached Live Codex",
      source: "imported",
      apiFormat: "responses",
      supportedEndpoints: ["responses"],
    },
  ]);

  globalThis.fetch = async () => new Response("upstream unavailable", { status: 503 });

  const response = await callRoute(connection.id, "?refresh=true");
  const body = (await response.json()) as RouteBody;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "codex");
  assert.equal(body.source, "cache");
  assert.equal(body.warning, "Codex live catalog unavailable — using cached catalog");
  assert.deepEqual(body.models, [
    {
      id: "cached-live-codex",
      name: "Cached Live Codex",
      source: "imported",
      apiFormat: "responses",
      supportedEndpoints: ["responses"],
    },
  ]);
});

test("provider models route falls back to local Codex catalog when live and GitHub fail", async () => {
  const connection = await seedCodexConnection({ accessToken: "codex-access-token" });

  globalThis.fetch = async () => new Response("upstream unavailable", { status: 503 });

  const response = await callRoute(connection.id, "?refresh=true");
  const body = (await response.json()) as RouteBody;

  assert.equal(response.status, 200);
  assert.equal(body.provider, "codex");
  assert.equal(body.source, "local_catalog");
  assert.equal(body.intentional, true);
  assert.equal(body.warning, "Codex live and GitHub catalogs unavailable — using local catalog");
  assert.ok(body.models?.some((model) => model.id === "gpt-5.5"));
});

test("provider models route returns codex gpt-5.4 effort variants when auto-fetch is disabled", async () => {
  const connection = await seedCodexConnection({
    apiKey: null,
    accessToken: "codex-access",
    providerSpecificData: { autoFetchModels: false },
  });

  const response = await callRoute(connection.id);
  const body = (await response.json()) as RouteBody;
  const modelIds = new Set((body.models || []).map((model) => model.id));

  assert.equal(response.status, 200);
  assert.equal(body.provider, "codex");
  assert.equal(body.source, "local_catalog");
  assert.ok(modelIds.has("gpt-5.4"));
  assert.ok(modelIds.has("gpt-5.4-low"));
  assert.ok(modelIds.has("gpt-5.4-medium"));
  assert.ok(modelIds.has("gpt-5.4-high"));
  assert.ok(modelIds.has("gpt-5.4-xhigh"));
});
