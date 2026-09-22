import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_XIAOMI_MIMO_TOKEN_PLAN_REGION,
  XIAOMI_MIMO_TOKEN_PLAN_ENDPOINTS,
  isXiaomiTokenPlanRegionalProvider,
  normalizeXiaomiAnthropicMessagesUrl,
  normalizeXiaomiTokenPlanRegion,
  resolveXiaomiTokenPlanAnthropicUrl,
  resolveXiaomiTokenPlanBaseUrl,
} from "../../src/shared/constants/xiaomiProviderRegions";
import { DefaultExecutor } from "../../open-sse/executors/default";
import { getProviderRegionConfig } from "../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/AlibabaProviderRegionField";
import { validateProviderApiKey } from "../../src/lib/providers/validation";

const KEY_PROP = "api" + "Key";
const SAMPLE_TOKEN = "sample-token";

type MockCredentials = Record<string, unknown>;

test("constants and type predicates for xiaomi-mimo-token-plan", () => {
  assert.equal(DEFAULT_XIAOMI_MIMO_TOKEN_PLAN_REGION, "singapore");
  assert.equal(isXiaomiTokenPlanRegionalProvider("xiaomi-mimo-token-plan"), true);
  assert.equal(isXiaomiTokenPlanRegionalProvider("xiaomi-mimo"), false);
  assert.equal(isXiaomiTokenPlanRegionalProvider("other"), false);
  assert.equal(isXiaomiTokenPlanRegionalProvider(undefined), false);
  assert.equal(isXiaomiTokenPlanRegionalProvider(null), false);
  assert.equal(
    XIAOMI_MIMO_TOKEN_PLAN_ENDPOINTS.singapore.openai,
    "https://token-plan-sgp.xiaomimimo.com/v1"
  );
  assert.equal(
    XIAOMI_MIMO_TOKEN_PLAN_ENDPOINTS.china.openai,
    "https://token-plan-cn.xiaomimimo.com/v1"
  );
  assert.equal(
    XIAOMI_MIMO_TOKEN_PLAN_ENDPOINTS.amsterdam.openai,
    "https://token-plan-ams.xiaomimimo.com/v1"
  );
});

test("normalizeXiaomiTokenPlanRegion: defaults to singapore when missing or empty", () => {
  assert.equal(normalizeXiaomiTokenPlanRegion(undefined), "singapore");
  assert.equal(normalizeXiaomiTokenPlanRegion(null), "singapore");
  assert.equal(normalizeXiaomiTokenPlanRegion(""), "singapore");
  assert.equal(normalizeXiaomiTokenPlanRegion("unknown"), "singapore");
});

test("normalizeXiaomiTokenPlanRegion: normalizes aliases for singapore, china, and amsterdam", () => {
  assert.equal(normalizeXiaomiTokenPlanRegion("singapore"), "singapore");
  assert.equal(normalizeXiaomiTokenPlanRegion("  SGP  "), "singapore");
  assert.equal(normalizeXiaomiTokenPlanRegion("SG"), "singapore");

  assert.equal(normalizeXiaomiTokenPlanRegion("china"), "china");
  assert.equal(normalizeXiaomiTokenPlanRegion("CN"), "china");
  assert.equal(normalizeXiaomiTokenPlanRegion(" China-Beijing "), "china");

  assert.equal(normalizeXiaomiTokenPlanRegion("amsterdam"), "amsterdam");
  assert.equal(normalizeXiaomiTokenPlanRegion("AMS"), "amsterdam");
  assert.equal(normalizeXiaomiTokenPlanRegion(" EUROPE "), "amsterdam");
});

test("normalizeXiaomiAnthropicMessagesUrl: formats base URL into /messages endpoint", () => {
  assert.equal(
    normalizeXiaomiAnthropicMessagesUrl("https://proxy.example.com"),
    "https://proxy.example.com/anthropic/v1/messages"
  );
  assert.equal(
    normalizeXiaomiAnthropicMessagesUrl("https://proxy.example.com/"),
    "https://proxy.example.com/anthropic/v1/messages"
  );
  assert.equal(
    normalizeXiaomiAnthropicMessagesUrl("https://proxy.example.com/v1"),
    "https://proxy.example.com/v1/messages"
  );
  assert.equal(
    normalizeXiaomiAnthropicMessagesUrl("https://proxy.example.com/anthropic"),
    "https://proxy.example.com/anthropic/v1/messages"
  );
  assert.equal(
    normalizeXiaomiAnthropicMessagesUrl("https://proxy.example.com/anthropic/v1/messages"),
    "https://proxy.example.com/anthropic/v1/messages"
  );
});

test("resolveXiaomiTokenPlanBaseUrl: returns regional OpenAI roots and preserves custom override", () => {
  assert.equal(
    resolveXiaomiTokenPlanBaseUrl({}),
    "https://token-plan-sgp.xiaomimimo.com/v1"
  );
  assert.equal(
    resolveXiaomiTokenPlanBaseUrl({ region: "singapore" }),
    "https://token-plan-sgp.xiaomimimo.com/v1"
  );
  assert.equal(
    resolveXiaomiTokenPlanBaseUrl({ region: "china" }),
    "https://token-plan-cn.xiaomimimo.com/v1"
  );
  assert.equal(
    resolveXiaomiTokenPlanBaseUrl({ region: "amsterdam" }),
    "https://token-plan-ams.xiaomimimo.com/v1"
  );
  assert.equal(
    resolveXiaomiTokenPlanBaseUrl({
      region: "china",
      baseUrl: "https://custom-token-plan.example.com/v1",
    }),
    "https://custom-token-plan.example.com/v1"
  );
});

test("resolveXiaomiTokenPlanAnthropicUrl: returns regional Anthropic roots and preserves custom override", () => {
  assert.equal(
    resolveXiaomiTokenPlanAnthropicUrl({}),
    "https://token-plan-sgp.xiaomimimo.com/anthropic/v1/messages"
  );
  assert.equal(
    resolveXiaomiTokenPlanAnthropicUrl({ region: "singapore" }),
    "https://token-plan-sgp.xiaomimimo.com/anthropic/v1/messages"
  );
  assert.equal(
    resolveXiaomiTokenPlanAnthropicUrl({ region: "china" }),
    "https://token-plan-cn.xiaomimimo.com/anthropic/v1/messages"
  );
  assert.equal(
    resolveXiaomiTokenPlanAnthropicUrl({ region: "amsterdam" }),
    "https://token-plan-ams.xiaomimimo.com/anthropic/v1/messages"
  );
  assert.equal(
    resolveXiaomiTokenPlanAnthropicUrl({
      region: "amsterdam",
      baseUrl: "https://custom-anthropic.example.com/messages",
    }),
    "https://custom-anthropic.example.com/messages"
  );
});

test("DefaultExecutor.buildUrl: OpenAI format resolves according to regional cluster", () => {
  const executor = new DefaultExecutor("xiaomi-mimo-token-plan");

  const defaultUrl = executor.buildUrl("mimo-v2.5-pro", false, 0, {
    [KEY_PROP]: SAMPLE_TOKEN,
    providerSpecificData: {},
  } as MockCredentials);
  assert.equal(defaultUrl, "https://token-plan-sgp.xiaomimimo.com/v1/chat/completions");

  const cnUrl = executor.buildUrl("mimo-v2.5-pro", false, 0, {
    [KEY_PROP]: SAMPLE_TOKEN,
    providerSpecificData: { region: "china" },
  } as MockCredentials);
  assert.equal(cnUrl, "https://token-plan-cn.xiaomimimo.com/v1/chat/completions");

  const amsUrl = executor.buildUrl("mimo-v2.5-pro", false, 0, {
    [KEY_PROP]: SAMPLE_TOKEN,
    providerSpecificData: { region: "amsterdam" },
  } as MockCredentials);
  assert.equal(amsUrl, "https://token-plan-ams.xiaomimimo.com/v1/chat/completions");

  const customUrl = executor.buildUrl("mimo-v2.5-pro", false, 0, {
    [KEY_PROP]: SAMPLE_TOKEN,
    providerSpecificData: {
      region: "china",
      baseUrl: "https://proxy.example.com/v1",
    },
  } as MockCredentials);
  assert.equal(customUrl, "https://proxy.example.com/v1/chat/completions");
});

test("DefaultExecutor.buildUrl: Claude alternate format resolves according to regional cluster", () => {
  const executor = new DefaultExecutor("xiaomi-mimo-token-plan");

  const defaultClaudeUrl = executor.buildUrl("mimo-v2.5-pro", true, 0, {
    [KEY_PROP]: SAMPLE_TOKEN,
    providerSpecificData: { targetFormat: "claude" },
  } as MockCredentials);
  assert.equal(
    defaultClaudeUrl,
    "https://token-plan-sgp.xiaomimimo.com/anthropic/v1/messages"
  );

  const cnClaudeUrl = executor.buildUrl("mimo-v2.5-pro", true, 0, {
    [KEY_PROP]: SAMPLE_TOKEN,
    providerSpecificData: { targetFormat: "claude", region: "china" },
  } as MockCredentials);
  assert.equal(
    cnClaudeUrl,
    "https://token-plan-cn.xiaomimimo.com/anthropic/v1/messages"
  );

  const amsClaudeUrl = executor.buildUrl("mimo-v2.5-pro", true, 0, {
    [KEY_PROP]: SAMPLE_TOKEN,
    providerSpecificData: { targetFormat: "claude", region: "amsterdam" },
  } as MockCredentials);
  assert.equal(
    amsClaudeUrl,
    "https://token-plan-ams.xiaomimimo.com/anthropic/v1/messages"
  );

  const customClaudeUrl = executor.buildUrl("mimo-v2.5-pro", true, 0, {
    [KEY_PROP]: SAMPLE_TOKEN,
    providerSpecificData: {
      targetFormat: "claude",
      baseUrl: "https://my-custom-proxy.com/anthropic/v1/messages",
    },
  } as MockCredentials);
  assert.equal(
    customClaudeUrl,
    "https://my-custom-proxy.com/anthropic/v1/messages"
  );

  const customRootClaudeUrl = executor.buildUrl("mimo-v2.5-pro", true, 0, {
    [KEY_PROP]: SAMPLE_TOKEN,
    providerSpecificData: {
      targetFormat: "claude",
      baseUrl: "https://my-custom-proxy.com",
    },
  } as MockCredentials);
  assert.equal(
    customRootClaudeUrl,
    "https://my-custom-proxy.com/anthropic/v1/messages"
  );
});

test("getProviderRegionConfig: enables region configuration for xiaomi-mimo-token-plan", () => {
  const config = getProviderRegionConfig("xiaomi-mimo-token-plan");
  assert.equal(config.isXiaomiTokenPlan, true);
  assert.equal(config.showsRegion, true);
  assert.equal(config.defaultRegion, "singapore");
});

test("validateProviderApiKey: probes regional endpoints according to selected region", async () => {
  const originalFetch = globalThis.fetch;
  const urls: string[] = [];
  globalThis.fetch = async (input) => {
    urls.push(String(input));
    return new Response(JSON.stringify({ data: [{ id: "mimo-v2.5-pro" }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const resultSgp = await validateProviderApiKey({
      provider: "xiaomi-mimo-token-plan",
      [KEY_PROP]: SAMPLE_TOKEN,
      providerSpecificData: {},
    });
    assert.equal(resultSgp.valid, true);

    const resultCn = await validateProviderApiKey({
      provider: "xiaomi-mimo-token-plan",
      [KEY_PROP]: SAMPLE_TOKEN,
      providerSpecificData: { region: "china" },
    });
    assert.equal(resultCn.valid, true);

    const resultAms = await validateProviderApiKey({
      provider: "xiaomi-mimo-token-plan",
      [KEY_PROP]: SAMPLE_TOKEN,
      providerSpecificData: { region: "amsterdam" },
    });
    assert.equal(resultAms.valid, true);

    const resultInvalidRegion = await validateProviderApiKey({
      provider: "xiaomi-mimo-token-plan",
      [KEY_PROP]: SAMPLE_TOKEN,
      providerSpecificData: { region: "unknown-galaxy" },
    });
    assert.equal(resultInvalidRegion.valid, true);

    assert.deepEqual(urls, [
      "https://token-plan-sgp.xiaomimimo.com/v1/models",
      "https://token-plan-cn.xiaomimimo.com/v1/models",
      "https://token-plan-ams.xiaomimimo.com/v1/models",
      "https://token-plan-sgp.xiaomimimo.com/v1/models",
    ]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("validateProviderApiKey: returns invalid when regional endpoint rejects credentials", async () => {
  const originalFetch = globalThis.fetch;
  const urls: string[] = [];
  globalThis.fetch = async (input) => {
    urls.push(String(input));
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await validateProviderApiKey({
      provider: "xiaomi-mimo-token-plan",
      [KEY_PROP]: "invalid-key",
      providerSpecificData: { region: "china" },
    });
    assert.equal(result.valid, false);
    assert.deepEqual(urls, ["https://token-plan-cn.xiaomimimo.com/v1/models"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

