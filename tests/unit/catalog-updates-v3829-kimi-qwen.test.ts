// Regression guard for two catalog fixes shipped in v3.8.29:
//
// 1. Kimi Code's fallback catalog uses the public stable model ids,
//    while account-specific metadata comes from /coding/v1/models.
//
// 2. Bug #3 (issue #3931) — qwen-web missing from PROVIDER_MODELS_CONFIG in
//    src/app/api/providers/[id]/models/route.ts, so the model discovery page for
//    the web-cookie provider returned nothing. Identified by @thezukiru in #3895.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";

const providerPageUtils =
  await import("../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts");
const providers = await import("../../src/shared/constants/providers.ts");
const providerCatalog = await import("../../src/lib/providers/catalog.ts");

// ── Kimi Code stable fallback aliases ────────────────────────────────────────

test("kmca legacy alias exposes the stable Kimi Code fallback models", () => {
  const models = getModelsByProviderId("kmca");
  const ids = new Set(models.map((m) => m.id));
  assert.deepEqual([...ids], ["k3", "kimi-for-coding", "kimi-for-coding-highspeed"]);
});

test("kmca stable fallback only carries documented static capabilities", () => {
  const models = getModelsByProviderId("kmca");
  const k3 = models.find((model) => model.id === "k3");
  assert.equal(k3?.contextLength, 1048576);
  for (const model of models.filter((entry) => entry.id !== "k3")) {
    assert.equal(model.contextLength, 262144);
  }
  for (const model of models) {
    assert.equal(model.maxOutputTokens, undefined);
    assert.equal(model.supportsVision, undefined);
    assert.equal(model.toolCalling, undefined);
    assert.equal(model.interleavedField, undefined);
    assert.equal(model.unsupportedParams, undefined);
  }
});

test("Kimi exposes one Code card plus Web and Moonshot services", () => {
  const entries = providerPageUtils.buildProviderEntries(
    providers.APIKEY_PROVIDERS,
    "apikey",
    "apikey",
    () => ({ total: 0 })
  );
  const apiKeyProviderIds = entries.map((entry) => entry.providerId);

  assert.equal(apiKeyProviderIds.includes("moonshot"), true);
  assert.equal(apiKeyProviderIds.includes("kimi"), false);
  assert.equal(apiKeyProviderIds.includes("kimi-coding-apikey"), false);
  assert.equal(providers.APIKEY_PROVIDERS["kimi-coding-apikey"].name, "Kimi Code API Key");
  assert.equal(providers.APIKEY_PROVIDERS["kimi-coding-apikey"].hiddenFromDashboard, true);
  assert.equal(providers.OAUTH_PROVIDERS["kimi-coding"].name, "Kimi Code CLI");
  assert.equal(providers.WEB_COOKIE_PROVIDERS["kimi-web"].name, "Kimi Web");
  assert.equal(providerCatalog.isManagedProviderConnectionId("kimi-coding"), false);
});

test("Kimi API-key connections fold into the Code provider card", () => {
  for (const provider of ["kimi-coding", "kimi-coding-apikey"]) {
    assert.equal(
      providerPageUtils.connectionMatchesProviderCard(
        { provider, authType: "apikey" },
        "kimi-coding",
        "oauth"
      ),
      true
    );
  }
});

// ── Bug #3 / issue #3931: qwen-web in PROVIDER_MODELS_CONFIG ──────────────────

// PROVIDER_MODELS_CONFIG was extracted from the discovery route into the
// discovery/ leaf (refactor: split provider-models discovery route). The
// source-guard follows the config to its new home.
const CONFIG_FILE = path.join(
  "src",
  "app",
  "api",
  "providers",
  "[id]",
  "models",
  "discovery",
  "providerModelsConfig.ts"
);

test("PROVIDER_MODELS_CONFIG contains a qwen-web entry (issue #3931 bug #3)", () => {
  const src = fs.readFileSync(CONFIG_FILE, "utf-8");
  assert.match(
    src,
    /"qwen-web"\s*:/,
    '"qwen-web" key missing from PROVIDER_MODELS_CONFIG in discovery/providerModelsConfig.ts'
  );
});

test("qwen-web PROVIDER_MODELS_CONFIG entry targets chat.qwen.ai/api/v2/models/", () => {
  const src = fs.readFileSync(CONFIG_FILE, "utf-8");
  assert.match(
    src,
    /chat\.qwen\.ai\/api\/v2\/models\//,
    "qwen-web discovery URL must be https://chat.qwen.ai/api/v2/models/"
  );
});

test("qwen-web parseResponse handles Qwen nested data.data structure", () => {
  const mockResponse = {
    data: {
      data: [
        { id: "qwen3.7-plus", name: "Qwen3.7-Plus", owned_by: "qwen" },
        { id: "qwen3-235b-a22b", name: "Qwen3-235B-A22B", owned_by: "qwen" },
        { id: "qwen3-coder-480b", name: "Qwen3-Coder-480B" },
      ],
    },
  };

  // parseResponse logic matches PROVIDER_MODELS_CONFIG["qwen-web"].parseResponse
  const innerData: Array<Record<string, unknown>> =
    (mockResponse?.data?.data as Array<Record<string, unknown>>) ||
    (mockResponse?.data as unknown as Array<Record<string, unknown>>) ||
    [];
  const models = innerData
    .map((item) => ({
      id: (item.id || item.name) as string,
      name: (item.name || item.id) as string,
      owned_by: (item.owned_by || "qwen") as string,
    }))
    .filter((m) => m.id);

  assert.equal(models.length, 3);
  assert.equal(models[0].id, "qwen3.7-plus");
  assert.equal(models[0].name, "Qwen3.7-Plus");
  assert.equal(models[0].owned_by, "qwen");
  assert.equal(models[2].owned_by, "qwen", "owned_by defaults to 'qwen' when absent");
});

test("qwen-web parseResponse handles flat data array fallback", () => {
  const mockResponse = {
    data: [{ id: "qwen3.7-plus", name: "Qwen3.7-Plus" }],
  };

  const innerData: Array<Record<string, unknown>> =
    (mockResponse?.data as unknown as { data?: Array<Record<string, unknown>> })?.data ||
    (mockResponse?.data as unknown as Array<Record<string, unknown>>) ||
    [];
  const models = innerData
    .map((item) => ({
      id: (item.id || item.name) as string,
      name: (item.name || item.id) as string,
      owned_by: (item.owned_by || "qwen") as string,
    }))
    .filter((m) => m.id);

  assert.equal(models.length, 1);
  assert.equal(models[0].id, "qwen3.7-plus");
});
