import { describe, it, expect } from "vitest";

import { getRegistryEntry } from "../../config/providerRegistry.ts";
import {
  PROVIDER_ID_TO_ALIAS,
  getModelsByProviderId,
  getProviderModels,
} from "../../config/providerModels.ts";
import { buildGlmAnthropicMessagesUrl, buildGlmOpenAIChatUrl } from "../../config/glmProvider.ts";
import { getPricingForModel } from "../../../src/shared/constants/pricing.ts";

describe("GLM Coding provider registry surfaces", () => {
  it("registers the GLM Coding provider with the expected transport metadata", () => {
    const entry = getRegistryEntry("glm");

    expect(entry).toBeDefined();
    expect(entry?.id).toBe("glm");
    expect(entry?.alias).toBe("glm");
    expect(entry?.format).toBe("openai");
    expect(entry?.executor).toBe("glm");
    expect(entry?.baseUrl).toBe("https://api.z.ai/api/coding/paas/v4/chat/completions");
    expect(entry?.authType).toBe("apikey");
    expect(entry?.authHeader).toBe("bearer");
    expect(entry?.headers?.["Anthropic-Version"]).toBeUndefined();
    expect(entry?.requestDefaults).toEqual({ maxTokens: 16384 });
    expect(entry?.timeoutMs).toBe(3000000);
  });

  it("preserves custom GLM base URL query parameters while deriving transport endpoints", () => {
    const providerSpecificData = {
      baseUrl:
        "https://proxy.example/glm/api/coding/paas/v4/chat/completions?tenant=alpha&route=glm",
    };

    expect(buildGlmOpenAIChatUrl(providerSpecificData)).toBe(
      "https://proxy.example/glm/api/coding/paas/v4/chat/completions?tenant=alpha&route=glm"
    );
    expect(
      buildGlmAnthropicMessagesUrl({
        anthropicBaseUrl:
          "https://proxy.example/glm/api/anthropic/v1/messages?tenant=alpha&route=glm",
      })
    ).toBe("https://proxy.example/glm/api/anthropic/v1/messages?tenant=alpha&route=glm&beta=true");
  });

  it("registers GLMT as an explicit high-budget preset over the dual GLM transport", () => {
    const entry = getRegistryEntry("glmt");

    expect(entry).toBeDefined();
    expect(entry?.id).toBe("glmt");
    expect(entry?.alias).toBe("glmt");
    expect(entry?.format).toBe("openai");
    expect(entry?.executor).toBe("glm");
    expect(entry?.baseUrl).toBe("https://api.z.ai/api/coding/paas/v4/chat/completions");
    expect(entry?.authType).toBe("apikey");
    expect(entry?.authHeader).toBe("bearer");
    expect(entry?.headers?.["Anthropic-Version"]).toBeUndefined();
    expect(entry?.requestDefaults).toEqual({
      maxTokens: 65536,
      temperature: 0.2,
      thinkingBudgetTokens: 24576,
      thinkingType: "adaptive",
    });
    expect(entry?.timeoutMs).toBe(900000);
  });

  it("registers GLM China on the same executor and capability surface", () => {
    const entry = getRegistryEntry("glm-cn");

    expect(entry).toBeDefined();
    expect(entry?.id).toBe("glm-cn");
    expect(entry?.alias).toBe("glmcn");
    expect(entry?.format).toBe("openai");
    expect(entry?.executor).toBe("glm");
    expect(entry?.baseUrl).toBe("https://open.bigmodel.cn/api/coding/paas/v4/chat/completions");
    expect(entry?.requestDefaults).toEqual({ maxTokens: 16384 });
    expect(entry?.timeoutMs).toBe(3000000);
    expect(getProviderModels("glmcn").map((model) => model.id)).toEqual(
      getProviderModels("glm").map((model) => model.id)
    );
  });

  it("exposes the same GLM model inventory through registry-derived model helpers", () => {
    const byProviderId = getModelsByProviderId("glm");
    const byAlias = getProviderModels("glm");

    expect(PROVIDER_ID_TO_ALIAS.glm).toBe("glm");
    expect(byProviderId).toEqual(byAlias);
    expect(byProviderId.map((model) => model.id)).toEqual([
      "glm-5.2",
      "glm-5.2-high",
      "glm-5.2-max",
      "glm-5.1",
      "glm-5",
      "glm-5-turbo",
      "glm-4.7-flash",
      "glm-4.7",
      "glm-4.6v",
      "glm-4.6",
      "glm-4.5v",
      "glm-4.5",
      "glm-4.5-air",
    ]);
  });

  it("registers GLM-5.2 with correct specs and effort tier aliases", () => {
    const models = getModelsByProviderId("glm");
    const get = (id: string) => models.find((m) => m.id === id);

    // Base model
    const base = get("glm-5.2");
    expect(base).toBeDefined();
    expect(base?.capabilities?.contextWindow).toBe(1000000);
    expect(base?.capabilities?.maxOutputTokens).toBe(131072);
    expect(base?.capabilities?.supportsReasoning).toBe(true);
    expect(base?.capabilities?.supportsTools).toBe(true);

    // Effort tier aliases share the same specs
    const high = get("glm-5.2-high");
    expect(high).toBeDefined();
    expect(high?.capabilities?.contextWindow).toBe(1000000);
    expect(high?.capabilities?.maxOutputTokens).toBe(131072);

    const max = get("glm-5.2-max");
    expect(max).toBeDefined();
    expect(max?.capabilities?.contextWindow).toBe(1000000);
    expect(max?.capabilities?.maxOutputTokens).toBe(131072);
  });

  it("applies doc-backed context window overrides for GLM models", () => {
    const models = getModelsByProviderId("glm");
    const get = (id: string) => models.find((m) => m.id === id);

    // Models with explicit overrides (Z.AI docs)
    expect(get("glm-5.1")?.capabilities?.contextWindow).toBe(204800);
    expect(get("glm-4.6v")?.capabilities?.contextWindow).toBe(128000);
    expect(get("glm-4.5v")?.capabilities?.contextWindow).toBe(16000);
    expect(get("glm-4.5")?.capabilities?.contextWindow).toBe(128000);
    expect(get("glm-4.5-air")?.capabilities?.contextWindow).toBe(128000);
    expect(get("glm-5.1")?.capabilities?.maxOutputTokens).toBe(131072);
    expect(get("glm-4.6")?.capabilities?.maxOutputTokens).toBe(32768);

    // Models with explicit 200K defaults to avoid null capabilities in direct routes.
    expect(get("glm-5")?.capabilities?.contextWindow).toBe(200000);
    expect(get("glm-5-turbo")?.capabilities?.contextWindow).toBe(200000);
    expect(get("glm-4.7-flash")?.capabilities?.contextWindow).toBe(200000);
    expect(get("glm-4.7")?.capabilities?.contextWindow).toBe(200000);
    expect(get("glm-4.6")?.capabilities?.contextWindow).toBe(200000);
  });

  it("keeps representative GLM Coding models tool-call capable and priced", () => {
    const models = getModelsByProviderId("glm");
    const get = (id: string) => models.find((m) => m.id === id);

    expect(get("glm-5")?.capabilities?.supportsTools).toBe(true);
    expect(get("glm-4.7-flash")?.capabilities?.supportsTools).toBe(true);
    expect(get("glm-4.5-air")?.capabilities?.supportsTools).toBe(true);
    expect(get("glm-5.2")?.capabilities?.supportsTools).toBe(true);
    expect(get("glm-5.2-high")?.capabilities?.supportsTools).toBe(true);
    expect(get("glm-5.2-max")?.capabilities?.supportsTools).toBe(true);

    expect(getPricingForModel("glm", "glm-5")).toEqual({
      input: 1.0,
      output: 3.2,
      cached: 0.2,
      reasoning: 4.8,
      cache_creation: 1.0,
    });
    expect(getPricingForModel("glm", "glm-4.7-flash")).toEqual({
      input: 0,
      output: 0,
      cached: 0,
      reasoning: 0,
      cache_creation: 0,
    });
    expect(getPricingForModel("glm", "glm-4.5-air")).toEqual({
      input: 0.2,
      output: 1.1,
      cached: 0.03,
      reasoning: 1.1,
      cache_creation: 0.2,
    });
    expect(getPricingForModel("glm", "glm-5.2")).toEqual({
      input: 1.2,
      output: 5,
      cached: 0.3,
      reasoning: 5,
      cache_creation: 1.2,
    });
    expect(getPricingForModel("glm", "glm-5.2-max")).toEqual({
      input: 1.2,
      output: 5,
      cached: 0.3,
      reasoning: 5,
      cache_creation: 1.2,
    });
  });

  it("keeps the repo-derived GLM inventory internally aligned across registry and pricing surfaces", () => {
    const modelIds = getModelsByProviderId("glm").map((model) => model.id);

    for (const modelId of modelIds) {
      expect(getPricingForModel("glm", modelId), `missing pricing for ${modelId}`).toBeTruthy();
    }
  });
});
