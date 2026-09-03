// Regression guard for Kimi Code's stable fallback catalog and the Qwen provider split.

import test from "node:test";
import assert from "node:assert/strict";

import {
  PROVIDER_ID_TO_ALIAS,
  getModelsByProviderId,
} from "../../../open-sse/config/providerModels.ts";
import { PROVIDER_MODELS_CONFIG } from "../../../src/app/api/providers/[id]/models/discovery/providerModelsConfig.ts";
import { getResolvedModelCapabilities } from "../../../src/lib/modelCapabilities.ts";

const providerPageUtils =
  await import("../../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts");
const providers = await import("../../../src/shared/constants/providers.ts");
const providerCatalog = await import("../../../src/lib/providers/catalog.ts");

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

test("Kimi Web models do not advertise unsupported function tools", () => {
  const models = getModelsByProviderId("kimi-web");
  assert.deepEqual(
    models.map(({ id, toolCalling }) => ({ id, toolCalling })),
    [
      { id: "k3", toolCalling: false },
      { id: "k2d6", toolCalling: false },
    ]
  );
  for (const model of models) {
    const capabilities = getResolvedModelCapabilities({ provider: "kimi-web", model: model.id });
    assert.equal(capabilities.toolCalling, false);
    assert.equal(capabilities.supportsTools, false);
  }
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

// ── Qwen Web removal and official Qwen provider preservation ─────────────────

test("retired Qwen Web surfaces stay absent while official Qwen providers remain", () => {
  assert.equal(PROVIDER_ID_TO_ALIAS["qwen-web"], undefined);
  assert.deepEqual(getModelsByProviderId("qwen-web"), []);
  assert.equal(Object.hasOwn(providers.WEB_COOKIE_PROVIDERS, "qwen-web"), false);
  assert.equal(PROVIDER_MODELS_CONFIG["qwen-web"], undefined);

  assert.equal(PROVIDER_ID_TO_ALIAS["qwen-cloud"], "qwc");
  assert.ok(
    getModelsByProviderId("qwen-cloud").some((model) => model.id === "qwen3.8-max"),
    "official Qwen Cloud models must remain routable"
  );
  assert.equal(PROVIDER_ID_TO_ALIAS["qwen-cloud-token-plan"], "qct");
  assert.ok(
    getModelsByProviderId("qwen-cloud-token-plan").some((model) => model.id === "qwen3.8-max"),
    "official Qwen Cloud Token Plan models must remain routable"
  );
  assert.deepEqual(
    [
      providers.APIKEY_PROVIDERS["qwen-cloud"].name,
      providers.APIKEY_PROVIDERS["qwen-cloud-token-plan"].name,
    ],
    ["Qwen Cloud", "Qwen Cloud Token Plan"]
  );
});
