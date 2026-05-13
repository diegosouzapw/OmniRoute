import { describe, it, expect } from "vitest";

import { getRegistryEntry } from "../../config/providerRegistry.ts";
import {
  PROVIDER_ID_TO_ALIAS,
  getModelsByProviderId,
  getProviderModels,
} from "../../config/providerModels.ts";
import { buildGlmAnthropicMessagesUrl, buildGlmOpenAIChatUrl } from "../../config/glmProvider.ts";
import { supportsToolCalling } from "../../services/modelCapabilities.ts";
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
    expect(entry?.timeoutMs).toBe(900000);
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
    expect(entry?.timeoutMs).toBe(900000);
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

  it("applies doc-backed context window overrides for GLM models", () => {
    const models = getModelsByProviderId("glm");
    const get = (id: string) => models.find((m) => m.id === id);

    // Models with explicit overrides (Z.AI docs)
    expect(get("glm-5.1")?.contextLength).toBe(204800);
    expect(get("glm-4.6v")?.contextLength).toBe(128000);
    expect(get("glm-4.5v")?.contextLength).toBe(16000);
    expect(get("glm-4.5")?.contextLength).toBe(128000);
    expect(get("glm-4.5-air")?.contextLength).toBe(128000);
    expect(get("glm-5.1")?.maxOutputTokens).toBe(131072);
    expect(get("glm-4.6")?.maxOutputTokens).toBe(32768);

    // Models with explicit 200K defaults to avoid null capabilities in direct routes.
    expect(get("glm-5")?.contextLength).toBe(200000);
    expect(get("glm-5-turbo")?.contextLength).toBe(200000);
    expect(get("glm-4.7-flash")?.contextLength).toBe(200000);
    expect(get("glm-4.7")?.contextLength).toBe(200000);
    expect(get("glm-4.6")?.contextLength).toBe(200000);
  });

  it("keeps representative GLM Coding models tool-call capable and priced", () => {
    expect(supportsToolCalling("glm/glm-5")).toBe(true);
    expect(supportsToolCalling("glm/glm-4.7-flash")).toBe(true);
    expect(supportsToolCalling("glm/glm-4.5-air")).toBe(true);

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
  });

  it("keeps the repo-derived GLM inventory internally aligned across registry and pricing surfaces", () => {
    const modelIds = getModelsByProviderId("glm").map((model) => model.id);

    for (const modelId of modelIds) {
      expect(getPricingForModel("glm", modelId), `missing pricing for ${modelId}`).toBeTruthy();
    }
  });
});
