import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("azure-openai validation accepts a successful deployments probe", async () => {
  globalThis.fetch = async (url, init = {}) => {
    assert.equal(
      String(url),
      "https://my-resource.openai.azure.com/openai/deployments?api-version=2024-12-01-preview"
    );
    assert.equal((init.headers as Record<string, string>)["api-key"], "azure-key");
    return new Response(JSON.stringify({ data: [] }), { status: 200 });
  };

  const result = await validateProviderApiKey({
    provider: "azure-openai",
    apiKey: "azure-key",
    providerSpecificData: { baseUrl: "https://my-resource.openai.azure.com" },
  });

  assert.equal(result.valid, true);
  assert.equal(result.method, "azure_probe");
});

test("azure-ai validation accepts a successful v1 models probe", async () => {
  globalThis.fetch = async (url, init = {}) => {
    assert.equal(String(url), "https://my-foundry.services.ai.azure.com/openai/v1/models");
    assert.equal((init.headers as Record<string, string>)["api-key"], "azure-ai-key");
    return new Response(JSON.stringify({ data: [] }), { status: 200 });
  };

  const result = await validateProviderApiKey({
    provider: "azure-ai",
    apiKey: "azure-ai-key",
    providerSpecificData: { baseUrl: "https://my-foundry.services.ai.azure.com" },
  });

  assert.equal(result.valid, true);
  assert.equal(result.method, "azure_ai_models");
});

test("vertex-partner validation reuses the Vertex service account branch", async () => {
  // An opaque non-JSON string is now treated as a Vertex Express-mode key (validated at
  // chat time), so it is accepted. To prove vertex-partner reuses the Service Account
  // validation branch, feed a JSON object that looks like an SA but is missing the
  // required client_email/private_key fields — it must be rejected there.
  const invalid = await validateProviderApiKey({
    provider: "vertex-partner",
    apiKey: '{"type":"service_account","project_id":"p"}',
  });

  assert.equal(invalid.valid, false);
  assert.match(invalid.error || "", /Invalid Service Account JSON/i);
});
