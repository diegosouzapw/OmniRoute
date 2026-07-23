import test from "node:test";
import assert from "node:assert/strict";

import { REGISTRY } from "../../open-sse/config/providers/index.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { connectionBelongsToProviderPage } from "../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts";
import { validateProviderApiKey } from "../../src/lib/providers/validation.ts";
import { isFlatRateProvider } from "../../src/lib/usage/flatRateProviders.ts";
import {
  ALIBABA_PROVIDER_ENDPOINTS,
  getDefaultAlibabaProviderRegion,
  isAlibabaRegionalProvider,
  normalizeAlibabaProviderRegion,
  resolveAlibabaProviderBaseUrl,
  resolveAlibabaProviderModelsUrl,
} from "../../src/shared/constants/alibabaProviderRegions.ts";
import { APIKEY_PROVIDERS } from "../../src/shared/constants/providers.ts";

test("Alibaba-family endpoint matrix keeps product and region boundaries distinct", () => {
  assert.deepEqual(ALIBABA_PROVIDER_ENDPOINTS, {
    alibaba: {
      "global-sg": "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
      "china-beijing": "https://dashscope.aliyuncs.com/compatible-mode/v1",
    },
    "bailian-coding-plan": {
      "global-sg": "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1",
      "china-beijing": "https://coding.dashscope.aliyuncs.com/apps/anthropic/v1",
    },
    "qwen-cloud": {
      "global-sg": "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
      "china-beijing": "https://dashscope.aliyuncs.com/compatible-mode/v1",
    },
    "qwen-cloud-token-plan": {
      "global-sg": "https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1",
      "china-beijing": "https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1",
    },
  });
});

test("regional resolver defaults legacy alibaba-cn to Beijing and new families to Singapore", () => {
  assert.equal(getDefaultAlibabaProviderRegion("alibaba-cn"), "china-beijing");
  assert.equal(getDefaultAlibabaProviderRegion("alibaba"), "global-sg");
  assert.equal(getDefaultAlibabaProviderRegion("bailian-coding-plan"), "global-sg");
  assert.equal(getDefaultAlibabaProviderRegion("qwen-cloud"), "global-sg");
  assert.equal(getDefaultAlibabaProviderRegion("qwen-cloud-token-plan"), "global-sg");

  assert.equal(
    resolveAlibabaProviderBaseUrl("alibaba-cn"),
    ALIBABA_PROVIDER_ENDPOINTS.alibaba["china-beijing"]
  );
  assert.equal(
    resolveAlibabaProviderBaseUrl("qwen-cloud", { region: "china-beijing" }),
    ALIBABA_PROVIDER_ENDPOINTS["qwen-cloud"]["china-beijing"]
  );
});

test("regional resolver normalizes old region names and preserves genuine custom endpoints", () => {
  assert.equal(normalizeAlibabaProviderRegion("international"), "global-sg");
  assert.equal(normalizeAlibabaProviderRegion("cn"), "china-beijing");

  assert.equal(
    resolveAlibabaProviderBaseUrl("bailian-coding-plan", {
      region: "china",
      baseUrl: "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1/messages",
    }),
    ALIBABA_PROVIDER_ENDPOINTS["bailian-coding-plan"]["china-beijing"],
    "a saved preset must not pin the old region"
  );

  assert.equal(
    resolveAlibabaProviderBaseUrl("qwen-cloud-token-plan", {
      region: "china",
      baseUrl: "https://token-plan.example.internal/compatible-mode/v1",
    }),
    "https://token-plan.example.internal/compatible-mode/v1",
    "an operator-supplied endpoint must remain authoritative"
  );
});

test("DefaultExecutor applies the regional endpoint to normal requests", () => {
  const alibaba = new DefaultExecutor("alibaba");
  assert.equal(
    alibaba.buildUrl("qwen3.7-plus", true, 0, {
      providerSpecificData: { region: "china-beijing" },
    }),
    "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions"
  );

  const codingPlan = new DefaultExecutor("bailian-coding-plan");
  assert.equal(
    codingPlan.buildUrl("qwen3.7-plus", true, 0, {
      providerSpecificData: { region: "china-beijing" },
    }),
    "https://coding.dashscope.aliyuncs.com/apps/anthropic/v1/messages"
  );

  const qwenCloud = new DefaultExecutor("qwen-cloud");
  assert.equal(
    qwenCloud.buildUrl("qwen-plus", true, 0, {
      providerSpecificData: { region: "china-beijing" },
    }),
    "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions"
  );

  const tokenPlan = new DefaultExecutor("qwen-cloud-token-plan");
  assert.equal(
    tokenPlan.buildUrl("qwen3.7-max", true, 0, {
      providerSpecificData: { region: "global-sg" },
    }),
    "https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1/chat/completions"
  );
});

test("provider validation probes the selected Coding Plan region", async () => {
  const originalFetch = globalThis.fetch;
  const urls: string[] = [];
  globalThis.fetch = async (input) => {
    urls.push(String(input));
    return new Response(JSON.stringify({ error: "probe accepted" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await validateProviderApiKey({
      provider: "bailian-coding-plan",
      apiKey: "sk-sp-test",
      providerSpecificData: {
        region: "china-beijing",
        baseUrl: "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1",
      },
    });
    assert.equal(result.valid, true);
    assert.deepEqual(urls, ["https://coding.dashscope.aliyuncs.com/apps/anthropic/v1/messages"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("provider validation probes the selected Qwen Cloud pay-as-you-go region", async () => {
  const originalFetch = globalThis.fetch;
  const urls: string[] = [];
  globalThis.fetch = async (input) => {
    urls.push(String(input));
    return new Response(JSON.stringify({ error: "probe accepted" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await validateProviderApiKey({
      provider: "qwen-cloud",
      apiKey: "sk-sp-test",
      providerSpecificData: { region: "china-beijing" },
    });
    assert.equal(result.valid, true);
    assert.deepEqual(urls, [
      "https://dashscope.aliyuncs.com/compatible-mode/v1/models",
      "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions",
    ]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("provider validation probes the selected Qwen Cloud Token Plan region", async () => {
  const originalFetch = globalThis.fetch;
  const urls: string[] = [];
  globalThis.fetch = async (input) => {
    urls.push(String(input));
    return new Response(JSON.stringify({ error: "probe accepted" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await validateProviderApiKey({
      provider: "qwen-cloud-token-plan",
      apiKey: "sk-sp-test",
      providerSpecificData: { region: "china-beijing" },
    });
    assert.equal(result.valid, true);
    assert.deepEqual(urls, [
      "https://token-plan.cn-beijing.maas.aliyuncs.com/compatible-mode/v1/chat/completions",
    ]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Qwen Cloud is a first-class metered API-key provider", () => {
  assert.equal(APIKEY_PROVIDERS["qwen-cloud"]?.name, "Qwen Cloud");
  assert.equal(REGISTRY["qwen-cloud"]?.format, "openai");
  assert.equal(REGISTRY["qwen-cloud"]?.passthroughModels, true);
  assert.equal(
    REGISTRY["qwen-cloud"]?.modelsUrl,
    "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/models"
  );
  assert.equal(isFlatRateProvider("qwen-cloud"), false);
  assert.deepEqual(
    REGISTRY["qwen-cloud"].models.map((model) => model.id),
    [
      "qwen3.7-max-2026-06-08",
      "qwen3.7-plus",
      "qwen3.6-plus",
      "qwen3.6-27b",
      "qwen3.6-35b-a3b",
      "qwen3.5-plus-2026-04-20",
      "qwen3.5-122b-a10b",
      "qwen3.5-397b-a17b",
      "glm-5.2",
      "glm-5.2-fast-preview",
      "deepseek-v4-pro",
      "deepseek-v4-flash",
      "kimi-k2.7-code",
    ]
  );
});

test("Alibaba Model Studio exposes the curated modern text catalog", () => {
  const expectedModels = [
    "qwen3.7-max",
    "qwen3.7-plus",
    "qwen3.6-plus",
    "qwen3.6-27b",
    "qwen3.6-35b-a3b",
    "qwen3.5-plus",
    "qwen3.5-122b-a10b",
    "qwen3.5-397b-a17b",
    "glm-5.2",
    "glm-5.2-fast-preview",
    "deepseek-v4-pro",
    "deepseek-v4-flash",
    "kimi-k2.7-code",
  ];

  assert.deepEqual(
    REGISTRY.alibaba.models.map((model) => model.id),
    expectedModels
  );
  assert.deepEqual(
    REGISTRY["alibaba-cn"].models.map((model) => model.id),
    expectedModels
  );
});

test("Qwen Cloud model discovery follows the selected region", () => {
  assert.equal(
    resolveAlibabaProviderModelsUrl("qwen-cloud", { region: "global-sg" }),
    "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/models"
  );
  assert.equal(
    resolveAlibabaProviderModelsUrl("qwen-cloud", { region: "china-beijing" }),
    "https://dashscope.aliyuncs.com/compatible-mode/v1/models"
  );
  assert.equal(
    resolveAlibabaProviderModelsUrl("qwen-cloud", {
      baseUrl: "https://proxy.example.com/v1/chat/completions",
    }),
    "https://proxy.example.com/v1/models"
  );
});

test("Qwen Cloud Token Plan remains a flat-rate provider with chat models only", () => {
  assert.equal(APIKEY_PROVIDERS["qwen-cloud-token-plan"]?.name, "Qwen Cloud Token Plan");
  assert.equal(REGISTRY["qwen-cloud-token-plan"]?.format, "openai");
  assert.equal(isFlatRateProvider("qwen-cloud-token-plan"), true);

  const modelIds = REGISTRY["qwen-cloud-token-plan"].models.map((model) => model.id);
  assert.deepEqual(modelIds, [
    "qwen3.8-max-preview",
    "qwen3.7-max",
    "qwen3.7-plus",
    "qwen3.6-flash",
    "glm-5.2",
    "deepseek-v4-pro",
  ]);

  const preview = REGISTRY["qwen-cloud-token-plan"].models[0];
  assert.equal(preview.supportsReasoning, true);
  assert.equal(preview.supportsVision, true);
  assert.equal(preview.contextLength, 1_000_000);
  assert.equal(preview.maxOutputTokens, 65_536);
});

test("dashboard folds legacy China connections into the unified Alibaba card", () => {
  assert.equal(APIKEY_PROVIDERS["alibaba-cn"]?.hiddenFromDashboard, true);
  assert.equal(connectionBelongsToProviderPage("alibaba", "alibaba"), true);
  assert.equal(connectionBelongsToProviderPage("alibaba-cn", "alibaba"), true);
  assert.equal(connectionBelongsToProviderPage("qwen-cloud", "alibaba"), false);

  for (const providerId of [
    "alibaba",
    "alibaba-cn",
    "bailian-coding-plan",
    "qwen-cloud",
    "qwen-cloud-token-plan",
  ]) {
    assert.equal(isAlibabaRegionalProvider(providerId), true);
  }
});
