import test from "node:test";
import assert from "node:assert/strict";

import { detectAzureUrlFormat, buildAzureAiChatUrl } from "../../open-sse/config/azureAi.ts";
import {
  normalizeOpenAiLikeModelsResponse,
  normalizeAzureModelsResponse,
} from "../../src/app/api/providers/[id]/models/discovery/normalizers";
import { validateAzureAiProvider } from "../../src/lib/providers/validation/cloudProviders.ts";
import { buildInternalChatRequest } from "../../src/lib/api/modelTestRunner";

test("detectAzureUrlFormat correctly identifies foundry vs classic Azure URL formats", () => {
  // Foundry format (.services.ai.azure.com or explicit /v1 path)
  assert.equal(
    detectAzureUrlFormat("https://my-foundry.services.ai.azure.com/openai/v1"),
    "foundry"
  );
  assert.equal(detectAzureUrlFormat("https://my-foundry.services.ai.azure.com"), "foundry");
  assert.equal(detectAzureUrlFormat("https://custom-gateway.internal/openai/v1"), "foundry");

  // Classic Azure OpenAI format (.openai.azure.com / .cognitiveservices.azure.com without /v1)
  assert.equal(detectAzureUrlFormat("https://my-resource.openai.azure.com"), "classic");
  assert.equal(detectAzureUrlFormat("https://my-resource.cognitiveservices.azure.com"), "classic");

  // Classic domain with explicit /v1 path returns foundry
  assert.equal(detectAzureUrlFormat("https://my-resource.openai.azure.com/openai/v1"), "foundry");

  // Fallbacks for empty / null / unknown domain
  assert.equal(detectAzureUrlFormat(""), "foundry");
  assert.equal(detectAzureUrlFormat(null), "foundry");
  assert.equal(detectAzureUrlFormat(undefined), "foundry");
  assert.equal(detectAzureUrlFormat("https://unknown-proxy.company.com"), "foundry");
});

test("buildAzureAiChatUrl builds appropriate chat URLs based on detected format", () => {
  // Classic format with model
  const classicUrl = buildAzureAiChatUrl(
    "https://my-resource.openai.azure.com",
    "chat",
    "gpt-4o-mini",
    "2024-12-01-preview"
  );
  assert.equal(
    classicUrl,
    "https://my-resource.openai.azure.com/openai/deployments/gpt-4o-mini/chat/completions?api-version=2024-12-01-preview"
  );

  // Foundry format
  const foundryUrl = buildAzureAiChatUrl(
    "https://my-resource.services.ai.azure.com/openai/v1",
    "chat",
    "gpt-4o-mini"
  );
  assert.equal(foundryUrl, "https://my-resource.services.ai.azure.com/openai/v1/chat/completions");
});

test("normalizeOpenAiLikeModelsResponse regression test for standard OpenAI-compatible providers", () => {
  // Standard OpenAI response format (openai, together, openrouter, etc.)
  const openaiPayload = {
    object: "list",
    data: [
      { id: "gpt-4o", object: "model", owned_by: "system" },
      { id: "gpt-4o-mini", object: "model", owned_by: "system" },
    ],
  };

  const normalizedOpenAI = normalizeOpenAiLikeModelsResponse(openaiPayload, "openai");
  assert.equal(normalizedOpenAI.length, 2);
  assert.equal(normalizedOpenAI[0].id, "gpt-4o");
  assert.equal(normalizedOpenAI[0].owned_by, "system");
  assert.equal(normalizedOpenAI[1].id, "gpt-4o-mini");

  // Together AI format
  const togetherPayload = {
    data: [{ id: "meta-llama/Llama-3-70b-chat-hf", name: "Llama-3-70b", provider: "together" }],
  };

  const normalizedTogether = normalizeOpenAiLikeModelsResponse(togetherPayload, "together");
  assert.equal(normalizedTogether.length, 1);
  assert.equal(normalizedTogether[0].id, "meta-llama/Llama-3-70b-chat-hf");
  assert.equal(normalizedTogether[0].owned_by, "together");
});

test("normalizeAzureModelsResponse handles Azure-specific deployment response formats", () => {
  // Azure REST value array
  const azureValuePayload = {
    value: [
      { id: "dep-gpt4", name: "GPT 4 Deployment" },
      { deployment_name: "dep-phi3", display_name: "Phi-3 Mini" },
    ],
  };

  const normalizedValue = normalizeAzureModelsResponse(azureValuePayload, "azure-ai");
  assert.equal(normalizedValue.length, 2);
  assert.equal(normalizedValue[0].id, "dep-gpt4");
  assert.equal(normalizedValue[0].name, "GPT 4 Deployment");
  assert.equal(normalizedValue[1].id, "dep-phi3");
  assert.equal(normalizedValue[1].name, "Phi-3 Mini");

  // Azure deployments array
  const azureDeploymentsPayload = {
    deployments: [{ deploymentName: "dep-mistral", model: "mistral-large" }],
  };

  const normalizedDeployments = normalizeAzureModelsResponse(azureDeploymentsPayload, "azure-ai");
  assert.equal(normalizedDeployments.length, 1);
  assert.equal(normalizedDeployments[0].id, "dep-mistral");
});

test("buildInternalChatRequest sets X-OmniRoute-Connection header when connectionId is provided", () => {
  const reqWithConn = buildInternalChatRequest(
    { model: "azure-ai/gpt-4o" },
    new AbortController().signal,
    "conn-azure-123"
  );
  assert.equal(reqWithConn.headers.get("X-OmniRoute-Connection"), "conn-azure-123");

  const reqWithoutConn = buildInternalChatRequest(
    { model: "azure-ai/gpt-4o" },
    new AbortController().signal
  );
  assert.equal(reqWithoutConn.headers.get("X-OmniRoute-Connection"), null);
});

test("validateAzureAiProvider evaluates multi-deployment connections with granular per-deployment results", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: string | URL | Request, options?: RequestInit) => {
    const urlStr = String(url);
    const bodyStr = String(options?.body || "");
    if (urlStr.includes("/models")) {
      return new Response(JSON.stringify({ error: "models unavailable" }), { status: 404 });
    }
    if (urlStr.includes("dep-ok") || bodyStr.includes("dep-ok")) {
      return new Response(JSON.stringify({ id: "dep-ok" }), { status: 200 });
    }
    if (urlStr.includes("dep-auth-err") || bodyStr.includes("dep-auth-err")) {
      return new Response(JSON.stringify({ error: "unauthorized" }), { status: 401 });
    }
    if (urlStr.includes("dep-timeout") || bodyStr.includes("dep-timeout")) {
      throw new Error("Connection test timed out");
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  }) as typeof globalThis.fetch;

  try {
    const psd = {
      baseUrl: "https://example.com/openai/v1",
      deployments: ["dep-ok", "dep-auth-err", "dep-timeout"],
    };

    const result = await validateAzureAiProvider({
      apiKey: "test-api-key",
      providerSpecificData: psd,
    });

    assert.equal(typeof result, "object");
    assert.equal(result.valid, true);
    assert.ok(Array.isArray(result.deployments));
    assert.equal(result.deployments.length, 3);

    type DeploymentResult = {
      deploymentId: string;
      valid: boolean;
      status: string;
      error?: string | null;
    };
    const deployments = result.deployments as DeploymentResult[];
    const depOk = deployments.find((d) => d.deploymentId === "dep-ok");
    const depAuth = deployments.find((d) => d.deploymentId === "dep-auth-err");
    const depTimeout = deployments.find((d) => d.deploymentId === "dep-timeout");

    assert.ok(depOk);
    assert.equal(depOk.valid, true);
    assert.equal(depOk.status, "ok");

    assert.ok(depAuth);
    assert.equal(depAuth.valid, false);
    assert.equal(depAuth.status, "auth_error");

    assert.ok(depTimeout);
    assert.equal(depTimeout.valid, false);
    assert.equal(depTimeout.status, "error");

    // 1 failed/error deployment does not block the other deployments or invalidate the connection completely
    assert.equal(typeof result.warning, "string");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
