import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-provider-model-route-metadata-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerModelsRoute = await import("../../src/app/api/providers/[id]/models/route.ts");

const originalFetch = globalThis.fetch;
const originalAllowPrivateProviderUrls = process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  if (originalAllowPrivateProviderUrls === undefined) {
    delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
  } else {
    process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = originalAllowPrivateProviderUrls;
  }
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider: string, overrides: Record<string, any> = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: overrides.authType || "apikey",
    name: overrides.name || `${provider}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: overrides.apiKey,
    accessToken: overrides.accessToken,
    projectId: overrides.projectId,
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

test("provider models route preserves synced provider-first metadata in local catalog", async () => {
  const connection = await seedConnection("opencode-go", {
    apiKey: "opencode-go-key",
    providerSpecificData: {
      autoFetchModels: false,
    },
  });

  await modelsDb.replaceSyncedAvailableModelsForConnection("opencode-go", "synced-conn", [
    {
      id: "synced-capability-model",
      name: "Synced Capability Model",
      targetFormat: "claude",
      capabilities: {
        contextWindow: 200000,
        maxOutputTokens: 8192,
        supportsVision: true,
        supportsTools: true,
      },
      capabilityOverrides: {
        supportsMaxEffort: null,
      },
      unsupportedParams: ["temperature", "top_p"],
    },
  ]);

  globalThis.fetch = async () => Response.json({ data: [] });

  const response = await callRoute(connection.id);
  const body = (await response.json()) as any;
  const model = body.models.find((entry: any) => entry.id === "synced-capability-model");

  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  assert.equal(model.compat.targetFormat, "claude");
  assert.deepEqual(model.compat.unsupportedParams, ["temperature", "top_p"]);
  assert.equal(model.capabilities.contextWindow, 200000);
  assert.equal(model.capabilities.maxOutputTokens, 8192);
  assert.equal(model.capabilities.supportsVision, true);
  assert.equal(model.capabilities.supportsTools, true);
  assert.deepEqual(model.capabilityOverrides, { supportsMaxEffort: null });
});

test("provider models route returns canonical metadata from fresh discovery", async () => {
  const connection = await seedConnection("opencode-go", {
    apiKey: "opencode-go-key",
  });

  globalThis.fetch = async () =>
    Response.json({
      data: [
        {
          id: "canonical-go",
          name: "Canonical Go",
          inputTokenLimit: null,
          targetFormat: "claude",
          capabilities: {
            supportsMaxEffort: null,
            defaultThinkingBudget: 0,
          },
          compat: {
            normalizeToolCallId: true,
            upstreamHeaders: {
              "X-Test": "yes",
            },
          },
        },
      ],
    });

  const response = await callRoute(connection.id, "?refresh=true");
  const body = (await response.json()) as any;
  const [model] = body.models;

  assert.equal(response.status, 200);
  assert.equal(body.source, "api");
  assert.equal(model.id, "canonical-go");
  assert.equal(model.owned_by, "opencode-go");
  assert.equal(model.capabilities.defaultThinkingBudget, 0);
  assert.deepEqual(model.capabilityOverrides, {
    contextWindow: null,
    maxInputTokens: null,
    supportsMaxEffort: null,
  });
  assert.equal(model.compat.targetFormat, "claude");
  assert.equal(model.compat.normalizeToolCallId, true);
  assert.deepEqual(model.compat.upstreamHeaders, { "X-Test": "yes" });
  assert.equal("inputTokenLimit" in model, false);
  assert.equal("targetFormat" in model, false);
});
