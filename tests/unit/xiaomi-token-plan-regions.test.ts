import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { xiaomi_mimo_token_planProvider } from "../../open-sse/config/providers/registry/xiaomi-mimo-token-plan/index.ts";
import { DEFAULT_PROVIDER_BASE_URLS } from "../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts";
import { getProviderRegionConfig } from "../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/AlibabaProviderRegionField.tsx";
import { buildAddProviderSpecificData } from "../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/connectionProviderSpecificData.ts";
import { validateProviderApiKey } from "../../src/lib/providers/validation.ts";
import {
  DEFAULT_XIAOMI_TOKEN_PLAN_REGION,
  XIAOMI_TOKEN_PLAN_REGION_VALUES,
  normalizeXiaomiTokenPlanRegion,
  resolveXiaomiTokenPlanBaseUrl,
  resolveXiaomiTokenPlanRegion,
  xiaomiTokenPlanAnthropicUrl,
  xiaomiTokenPlanOpenAiRoot,
} from "../../src/shared/constants/xiaomiTokenPlanRegions.ts";

const REGION_ENDPOINTS = {
  cn: "https://token-plan-cn.xiaomimimo.com",
  sgp: "https://token-plan-sgp.xiaomimimo.com",
  ams: "https://token-plan-ams.xiaomimimo.com",
} as const;

const BASE_FORM_DATA = {
  accountId: "",
  apiRegion: "international",
  awsAccessKeyId: "",
  awsSessionToken: "",
  ccCompatibleContext1m: false,
  ccCompatibleRedactThinking: false,
  ccCompatibleSummarizeThinking: false,
  consoleApiKey: "",
  customUserAgent: "",
  cx: "",
  excludedModels: "",
  importFreeModelsOnly: false,
  newApiAggregatorBalance: false,
  newApiUserId: "",
  passthroughModels: false,
  quotaPerUnit: "",
  region: "",
  routingTags: "",
  tag: "",
  validationModelId: undefined,
  tunnelId: "",
  connectorName: "",
};

function credentials(providerSpecificData: Record<string, unknown>) {
  return { apiKey: "tp-test", providerSpecificData } as never;
}

test("Xiaomi Token Plan exposes the three documented regional clusters", () => {
  assert.deepEqual(XIAOMI_TOKEN_PLAN_REGION_VALUES, ["cn", "sgp", "ams"]);
  assert.equal(DEFAULT_XIAOMI_TOKEN_PLAN_REGION, "sgp");

  for (const region of XIAOMI_TOKEN_PLAN_REGION_VALUES) {
    assert.equal(xiaomiTokenPlanOpenAiRoot(region), `${REGION_ENDPOINTS[region]}/v1`);
    assert.equal(
      xiaomiTokenPlanAnthropicUrl(region),
      `${REGION_ENDPOINTS[region]}/anthropic/v1/messages`
    );
  }
});

test("legacy and invalid region values fail closed to the existing Singapore default", () => {
  assert.equal(resolveXiaomiTokenPlanRegion(), "sgp");
  assert.equal(resolveXiaomiTokenPlanRegion({}), "sgp");
  assert.equal(resolveXiaomiTokenPlanRegion({ region: "unknown" }), "sgp");
  assert.equal(normalizeXiaomiTokenPlanRegion("Amsterdam"), "ams");
  assert.equal(normalizeXiaomiTokenPlanRegion("Singapore"), "sgp");
  assert.equal(normalizeXiaomiTokenPlanRegion("China"), "cn");
});

test("OpenAI-compatible inference follows the connection region", () => {
  const executor = new DefaultExecutor("xiaomi-mimo-token-plan");

  for (const region of XIAOMI_TOKEN_PLAN_REGION_VALUES) {
    assert.equal(
      executor.buildUrl("mimo-v2.5-pro", true, 0, credentials({ region })),
      `${REGION_ENDPOINTS[region]}/v1/chat/completions`
    );
  }
});

test("Anthropic-compatible inference follows the connection region", () => {
  const executor = new DefaultExecutor("xiaomi-mimo-token-plan");

  for (const region of XIAOMI_TOKEN_PLAN_REGION_VALUES) {
    assert.equal(
      executor.buildUrl("mimo-v2.5-pro", true, 0, credentials({ region, targetFormat: "claude" })),
      `${REGION_ENDPOINTS[region]}/anthropic/v1/messages`
    );
  }
});

test("existing connections without a region retain the Singapore routes", () => {
  const executor = new DefaultExecutor("xiaomi-mimo-token-plan");
  assert.equal(
    executor.buildUrl("mimo-v2.5-pro", true, 0, credentials({})),
    "https://token-plan-sgp.xiaomimimo.com/v1/chat/completions"
  );
  assert.equal(
    executor.buildUrl("mimo-v2.5-pro", true, 0, credentials({ targetFormat: "claude" })),
    "https://token-plan-sgp.xiaomimimo.com/anthropic/v1/messages"
  );
});

test("saved regional presets follow a changed selector while custom endpoints keep precedence", () => {
  assert.equal(
    resolveXiaomiTokenPlanBaseUrl({
      region: "ams",
      baseUrl: "https://token-plan-sgp.xiaomimimo.com/v1",
    }),
    "https://token-plan-ams.xiaomimimo.com/v1"
  );

  const custom = "https://mimo-proxy.example.com/custom/v1";
  assert.equal(resolveXiaomiTokenPlanBaseUrl({ region: "ams", baseUrl: custom }), custom);

  const executor = new DefaultExecutor("xiaomi-mimo-token-plan");
  assert.equal(
    executor.buildUrl("mimo-v2.5-pro", true, 0, credentials({ region: "ams", baseUrl: custom })),
    `${custom}/chat/completions`
  );
  // Manual override keeps its own semantics (#6147): the custom base is used
  // as an OpenAI-compatible root even when the Anthropic protocol is selected,
  // because the alternate path is skipped for manual base URLs.
  assert.equal(
    executor.buildUrl(
      "mimo-v2.5-pro",
      true,
      0,
      credentials({
        region: "ams",
        targetFormat: "claude",
        baseUrl: "https://mimo-proxy.example.com/anthropic",
      })
    ),
    "https://mimo-proxy.example.com/anthropic/chat/completions"
  );
});

test("credential validation probes only the selected regional cluster", async () => {
  const originalFetch = globalThis.fetch;
  const urls: string[] = [];
  globalThis.fetch = async (input) => {
    urls.push(String(input));
    return new Response(JSON.stringify({ error: "request accepted" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await validateProviderApiKey({
      provider: "xiaomi-mimo-token-plan",
      apiKey: "tp-ams-test",
      providerSpecificData: { region: "ams" },
    });
    assert.equal(result.valid, true);
    assert.deepEqual(urls, ["https://token-plan-ams.xiaomimimo.com/v1/chat/completions"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("dashboard region config defaults Token Plan to Singapore and persists a selected region", () => {
  const regionConfig = getProviderRegionConfig("xiaomi-mimo-token-plan");
  assert.equal(regionConfig.showsRegion, true);
  assert.equal(regionConfig.defaultRegion, "sgp");

  const providerSpecificData = buildAddProviderSpecificData({
    provider: "xiaomi-mimo-token-plan",
    formData: { ...BASE_FORM_DATA, region: "ams" } as never,
    openRouterPreset: { applyTo: () => {} },
    showFreeModelsToggle: false,
    isGooglePse: false,
    usesBaseUrl: false,
    validatedBaseUrl: null,
    showsRegion: regionConfig.showsRegion,
    defaultRegion: regionConfig.defaultRegion,
    isGlm: false,
    isCloudflare: false,
  });
  assert.deepEqual(providerSpecificData, { region: "ams" });
});

test("normal Xiaomi MiMo keeps the normal-account dashboard endpoint", () => {
  assert.equal(DEFAULT_PROVIDER_BASE_URLS["xiaomi-mimo"], "https://api.xiaomimimo.com/v1");
  assert.equal(xiaomi_mimo_token_planProvider.baseUrl, xiaomiTokenPlanOpenAiRoot("sgp"));
});
