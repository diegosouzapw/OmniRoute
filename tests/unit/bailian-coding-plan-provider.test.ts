import test from "node:test";
import assert from "node:assert/strict";

// Import the constants directly
const { APIKEY_PROVIDERS, OAUTH_PROVIDERS } =
  await import("../../src/shared/constants/providers.ts");

// Import validateProviderApiKey for Scenario C tests
const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

test("APIKEY_PROVIDERS includes bailian-coding-plan", () => {
  assert.ok(
    APIKEY_PROVIDERS["bailian-coding-plan"],
    "bailian-coding-plan should be present in APIKEY_PROVIDERS"
  );

  const provider = APIKEY_PROVIDERS["bailian-coding-plan"];
  assert.equal(provider.id, "bailian-coding-plan", "Provider id should be 'bailian-coding-plan'");
  assert.equal(provider.alias, "bcp", "Provider alias should be 'bcp'");
  assert.ok(provider.name, "Provider should have a name");
});

test("bailian-coding-plan not in OAUTH_PROVIDERS", () => {
  assert.equal(
    OAUTH_PROVIDERS["bailian-coding-plan"],
    undefined,
    "bailian-coding-plan should NOT be present in OAUTH_PROVIDERS"
  );
});

// Schema validation tests for providerSpecificData.baseUrl
const { validateBody, createProviderSchema, updateProviderConnectionSchema } =
  await import("../../src/shared/validation/schemas.ts");

const VALID_BAILIAN_URL = "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1";

test("createProviderSchema accepts valid baseUrl in providerSpecificData", () => {
  const validation = validateBody(createProviderSchema, {
    provider: "bailian-coding-plan",
    apiKey: "sk-test-key",
    name: "Test Bailian",
    providerSpecificData: {
      baseUrl: VALID_BAILIAN_URL,
    },
  });

  assert.equal(validation.success, true, "Should accept valid URL");
  if (validation.success) {
    assert.equal(
      validation.data.providerSpecificData?.baseUrl,
      VALID_BAILIAN_URL,
      "Should preserve valid baseUrl"
    );
  }
});

test("createProviderSchema accepts missing providerSpecificData", () => {
  const validation = validateBody(createProviderSchema, {
    provider: "bailian-coding-plan",
    apiKey: "sk-test-key",
    name: "Test Bailian",
  });

  assert.equal(validation.success, true, "Should accept without providerSpecificData");
});

test("createProviderSchema accepts empty providerSpecificData", () => {
  const validation = validateBody(createProviderSchema, {
    provider: "bailian-coding-plan",
    apiKey: "sk-test-key",
    name: "Test Bailian",
    providerSpecificData: {},
  });

  assert.equal(validation.success, true, "Should accept empty providerSpecificData");
});

test("createProviderSchema rejects invalid baseUrl in providerSpecificData", () => {
  const validation = validateBody(createProviderSchema, {
    provider: "bailian-coding-plan",
    apiKey: "sk-test-key",
    name: "Test Bailian",
    providerSpecificData: {
      baseUrl: "not-a-valid-url",
    },
  });

  assert.equal(validation.success, false, "Should reject invalid URL");
  if (!validation.success && typeof validation.error === "object" && validation.error !== null) {
    const errorObj = validation.error;
    const details = Array.isArray(errorObj.details) ? errorObj.details : [];
    const errorStr = details.map((d) => d.message || "").join(", ");
    assert.ok(
      errorStr.includes("baseUrl") && errorStr.includes("URL"),
      `Error should mention baseUrl and URL. Got: ${errorStr}`
    );
  }
});

test("createProviderSchema rejects malformed baseUrl (no protocol)", () => {
  const validation = validateBody(createProviderSchema, {
    provider: "bailian-coding-plan",
    apiKey: "sk-test-key",
    name: "Test Bailian",
    providerSpecificData: {
      baseUrl: "example.com/path",
    },
  });

  assert.equal(validation.success, false, "Should reject URL without protocol");
});

test("createProviderSchema rejects baseUrl with non-string value", () => {
  const validation = validateBody(createProviderSchema, {
    provider: "bailian-coding-plan",
    apiKey: "sk-test-key",
    name: "Test Bailian",
    providerSpecificData: {
      baseUrl: 12345,
    },
  });

  assert.equal(validation.success, false, "Should reject non-string baseUrl");
});

test("updateProviderConnectionSchema accepts valid baseUrl in providerSpecificData", () => {
  const validation = validateBody(updateProviderConnectionSchema, {
    providerSpecificData: {
      baseUrl: VALID_BAILIAN_URL,
    },
  });

  assert.equal(validation.success, true, "Should accept valid URL");
  if (validation.success) {
    assert.equal(
      validation.data.providerSpecificData?.baseUrl,
      VALID_BAILIAN_URL,
      "Should preserve valid baseUrl"
    );
  }
});

test("updateProviderConnectionSchema rejects invalid baseUrl in providerSpecificData", () => {
  const validation = validateBody(updateProviderConnectionSchema, {
    providerSpecificData: {
      baseUrl: "invalid-url-abc",
    },
  });

  assert.equal(validation.success, false, "Should reject invalid URL");
  if (!validation.success && typeof validation.error === "object" && validation.error !== null) {
    const errorObj = validation.error;
    const details = Array.isArray(errorObj.details) ? errorObj.details : [];
    const errorStr = details.map((d) => d.message || "").join(", ");
    assert.ok(
      errorStr.includes("baseUrl") && errorStr.includes("URL"),
      `Error should mention baseUrl and URL. Got: ${errorStr}`
    );
  }
});

test("updateProviderConnectionSchema accepts partial update without baseUrl", () => {
  const validation = validateBody(updateProviderConnectionSchema, {
    name: "Updated Name",
    priority: 5,
  });

  assert.equal(validation.success, true, "Should accept update without baseUrl");
});

test("updateProviderConnectionSchema rejects baseUrl with trailing garbage", () => {
  const validation = validateBody(updateProviderConnectionSchema, {
    providerSpecificData: {
      baseUrl: "https://example.com not-a-url",
    },
  });

  assert.equal(validation.success, false, "Should reject URL with trailing garbage");
});

test("updateProviderConnectionSchema accepts https protocol", () => {
  const validation = validateBody(updateProviderConnectionSchema, {
    providerSpecificData: {
      baseUrl: "https://secure.example.com/v1",
    },
  });

  assert.equal(validation.success, true, "Should accept https URL");
});

test("updateProviderConnectionSchema accepts http protocol", () => {
  const validation = validateBody(updateProviderConnectionSchema, {
    providerSpecificData: {
      baseUrl: "http://localhost:3000/v1",
    },
  });

  assert.equal(validation.success, true, "Should accept http URL");
});

// ============================================================================
// ROUTE-LEVEL TESTS: Static model listing behavior for bailian-coding-plan
// ============================================================================

// Import the exported helper function from the route
const { getStaticModelsForProvider } =
  await import("../../src/app/api/providers/[id]/models/route.ts");

test("getStaticModelsForProvider returns 8 models for bailian-coding-plan", () => {
  const models = getStaticModelsForProvider("bailian-coding-plan");

  assert.ok(models, "Should return models for bailian-coding-plan");
  assert.ok(Array.isArray(models), "Should return an array");
  assert.equal(models.length, 8, "Should return exactly 8 models");
});

test("getStaticModelsForProvider returns correct model IDs for bailian-coding-plan", () => {
  const models = getStaticModelsForProvider("bailian-coding-plan");

  if (!models) {
    assert.fail("Models should not be undefined");
    return;
  }

  const expectedIds = [
    "qwen3.5-plus",
    "qwen3-max-2026-01-23",
    "qwen3-coder-next",
    "qwen3-coder-plus",
    "MiniMax-M2.5",
    "glm-5",
    "glm-4.7",
    "kimi-k2.5",
  ];

  const actualIds = models.map((m) => m.id);

  for (const expectedId of expectedIds) {
    assert.ok(actualIds.includes(expectedId), `Should include model: ${expectedId}`);
  }

  // Verify no extra models
  assert.equal(actualIds.length, expectedIds.length, "Should have exactly the expected models");
});

test("getStaticModelsForProvider returns models with correct structure", () => {
  const models = getStaticModelsForProvider("bailian-coding-plan");

  if (!models) {
    assert.fail("Models should not be undefined");
    return;
  }

  for (const model of models) {
    assert.ok(model.id, `Model should have id: ${JSON.stringify(model)}`);
    assert.ok(model.name, `Model should have name: ${JSON.stringify(model)}`);
    assert.equal(typeof model.id, "string", "Model id should be string");
    assert.equal(typeof model.name, "string", "Model name should be string");
  }
});

test("getStaticModelsForProvider returns undefined for non-static providers", () => {
  const nonStaticProviders = ["anthropic", "deepseek", "unknown-provider"];

  for (const provider of nonStaticProviders) {
    const models = getStaticModelsForProvider(provider);
    assert.equal(models, undefined, `Should return undefined for non-static provider: ${provider}`);
  }
});

test("getStaticModelsForProvider returns local image catalogs for image-only providers", () => {
  const models = getStaticModelsForProvider("xai");

  assert.ok(models, "xAI should expose local image models");
  assert.deepEqual(
    models.map((model) => model.id),
    ["grok-2-image-1212"]
  );
});

test("getStaticModelsForProvider returns models for other static providers", () => {
  // Verify other static providers still work
  const staticProviders = ["deepgram", "assemblyai", "nanobanana", "perplexity"];

  for (const provider of staticProviders) {
    const models = getStaticModelsForProvider(provider);
    assert.ok(models, `Should return models for static provider: ${provider}`);
    assert.ok(models.length > 0, `Should return non-empty models for: ${provider}`);
  }
});

test("getStaticModelsForProvider returns models matching registry for bailian-coding-plan", async () => {
  const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");

  const models = getStaticModelsForProvider("bailian-coding-plan");
  const registryEntry = REGISTRY["bailian-coding-plan"];

  assert.ok(models, "Static models should be defined");
  assert.ok(registryEntry, "Registry entry should exist");

  const registryModels = registryEntry.models;

  // Verify counts match
  assert.equal(
    models.length,
    registryModels.length,
    `Static model count (${models.length}) should match registry (${registryModels.length})`
  );

  // Verify all model IDs match
  const staticIds = new Set(models.map((m) => m.id));
  const registryIds = new Set(registryModels.map((m) => m.id));

  assert.equal(staticIds.size, registryIds.size, "Should have same number of unique model IDs");

  // Verify each model ID exists in both
  for (const model of models) {
    assert.ok(registryIds.has(model.id), `Registry should have model: ${model.id}`);
  }
});

test("bailian-coding-plan static models have no duplicates", () => {
  const models = getStaticModelsForProvider("bailian-coding-plan");

  if (!models) {
    assert.fail("Models should not be undefined");
    return;
  }

  const ids = models.map((m) => m.id);
  const uniqueIds = new Set(ids);

  assert.equal(ids.length, uniqueIds.size, "All model IDs should be unique (no duplicates)");
});

test("bailian-coding-plan static models are complete and valid", () => {
  const models = getStaticModelsForProvider("bailian-coding-plan");

  if (!models) {
    assert.fail("Models should not be undefined");
    return;
  }

  // Verify array is not empty
  assert.ok(models.length > 0, "Models array should not be empty");

  // Verify no null/undefined entries
  for (let i = 0; i < models.length; i++) {
    assert.ok(models[i], `Model at index ${i} should not be null/undefined`);
  }

  // Verify no empty model IDs or names
  for (const model of models) {
    assert.ok(
      model.id && model.id.trim().length > 0,
      `Model ID should be non-empty: ${JSON.stringify(model)}`
    );
    assert.ok(
      model.name && model.name.trim().length > 0,
      `Model name should be non-empty: ${JSON.stringify(model)}`
    );
  }
});

// ============================================================================
// SCENARIO C TESTS: validateProviderApiKey for bailian-coding-plan
// These test the key validation outcomes with mocked fetch
// ============================================================================

test("validateProviderApiKey returns invalid for 401 response (bailian-coding-plan)", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await validateProviderApiKey({
      provider: "bailian-coding-plan",
      apiKey: "invalid-key",
      providerSpecificData: {
        baseUrl: "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1",
      },
    });

    assert.equal(result.valid, false, "Should return invalid for 401");
    assert.equal(result.error, "Invalid API key", "Error should be 'Invalid API key'");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("validateProviderApiKey returns invalid for 403 response (bailian-coding-plan)", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await validateProviderApiKey({
      provider: "bailian-coding-plan",
      apiKey: "forbidden-key",
      providerSpecificData: {
        baseUrl: "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1",
      },
    });

    assert.equal(result.valid, false, "Should return invalid for 403");
    assert.equal(result.error, "Invalid API key", "Error should be 'Invalid API key'");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("validateProviderApiKey returns valid for 400 response (bailian-coding-plan)", async () => {
  const originalFetch = globalThis.fetch;

  // 400 means auth passed but request was malformed
  // This is a valid auth path for bailian-coding-plan
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "invalid request" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await validateProviderApiKey({
      provider: "bailian-coding-plan",
      apiKey: "valid-key",
      providerSpecificData: {
        baseUrl: "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1",
      },
    });

    assert.equal(
      result.valid,
      true,
      "Should return valid for 400 (auth passed, request malformed)"
    );
    assert.equal(result.error, null, "Error should be null for valid auth");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("validateProviderApiKey returns valid for 200 response (bailian-coding-plan)", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ model: "qwen3-coder-plus" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await validateProviderApiKey({
      provider: "bailian-coding-plan",
      apiKey: "valid-key",
      providerSpecificData: {
        baseUrl: "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1",
      },
    });

    assert.equal(result.valid, true, "Should return valid for 200");
    assert.equal(result.error, null, "Error should be null for valid auth");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("validateProviderApiKey returns invalid for 500 response (bailian-coding-plan)", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "upstream unavailable" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await validateProviderApiKey({
      provider: "bailian-coding-plan",
      apiKey: "bad-key",
      providerSpecificData: {
        baseUrl: "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1",
      },
    });

    assert.equal(result.valid, false, "Should return invalid for 500");
    assert.equal(result.error, "Validation failed: 500");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("validateProviderApiKey avoids double /messages suffix for bailian-coding-plan", async () => {
  const originalFetch = globalThis.fetch;
  const urls = [];

  globalThis.fetch = async (url) => {
    urls.push(String(url));
    return new Response(JSON.stringify({ error: "invalid request" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await validateProviderApiKey({
      provider: "bailian-coding-plan",
      apiKey: "valid-key",
      providerSpecificData: {
        baseUrl: "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1/messages",
      },
    });

    assert.equal(result.valid, true);
    assert.equal(urls.length, 1);
    assert.equal(
      urls[0],
      "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1/messages",
      "Should probe exactly one /messages suffix"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ============================================================================
// SCENARIO A TESTS: POST /api/providers create flow validation
// These test that the schema (used by POST route) accepts valid bailian data
// ============================================================================

test("POST /api/providers validation: bailian-coding-plan with baseUrl passes schema", () => {
  const validation = validateBody(createProviderSchema, {
    provider: "bailian-coding-plan",
    apiKey: "sk-placeholder-key",
    name: "Test Bailian Provider",
    providerSpecificData: {
      baseUrl: "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1",
    },
  });

  assert.equal(validation.success, true, "Schema should accept valid bailian-coding-plan payload");
  if (validation.success) {
    assert.equal(validation.data.provider, "bailian-coding-plan");
    assert.equal(
      validation.data.providerSpecificData?.baseUrl,
      "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1"
    );
  }
});

test("POST /api/providers validation: bailian-coding-plan with custom baseUrl passes schema", () => {
  const customUrl = "https://custom.dashscope.aliyuncs.com/apps/anthropic/v1";

  const validation = validateBody(createProviderSchema, {
    provider: "bailian-coding-plan",
    apiKey: "sk-another-placeholder",
    name: "Custom Bailian",
    providerSpecificData: {
      baseUrl: customUrl,
    },
  });

  assert.equal(validation.success, true, "Schema should accept custom baseUrl");
  if (validation.success) {
    assert.equal(validation.data.providerSpecificData?.baseUrl, customUrl);
  }
});

test("POST /api/providers validation rejects non-http(s) baseUrl", () => {
  const validation = validateBody(createProviderSchema, {
    provider: "bailian-coding-plan",
    apiKey: "sk-placeholder-key",
    name: "Bad URL Scheme",
    providerSpecificData: {
      baseUrl: "ftp://example.com/v1",
    },
  });

  assert.equal(validation.success, false, "Schema should reject non-http(s) URL schemes");
});

// ============================================================================
// SCENARIO B TESTS: PUT /api/providers/{id} update flow validation
// These test that the schema (used by PUT route) accepts valid baseUrl updates
// ============================================================================

test("PUT /api/providers/{id} validation: updating baseUrl passes schema", () => {
  const validation = validateBody(updateProviderConnectionSchema, {
    providerSpecificData: {
      baseUrl: "https://updated.dashscope.aliyuncs.com/apps/anthropic/v1",
    },
  });

  assert.equal(validation.success, true, "Schema should accept baseUrl update");
  if (validation.success) {
    assert.equal(
      validation.data.providerSpecificData?.baseUrl,
      "https://updated.dashscope.aliyuncs.com/apps/anthropic/v1"
    );
  }
});

test("PUT /api/providers/{id} validation: baseUrl update with other fields passes schema", () => {
  const validation = validateBody(updateProviderConnectionSchema, {
    name: "Updated Bailian Name",
    priority: 5,
    providerSpecificData: {
      baseUrl: "https://new-url.example.com/v1",
    },
  });

  assert.equal(
    validation.success,
    true,
    "Schema should accept update with baseUrl and other fields"
  );
  if (validation.success) {
    assert.equal(validation.data.name, "Updated Bailian Name");
    assert.equal(validation.data.priority, 5);
    assert.equal(validation.data.providerSpecificData?.baseUrl, "https://new-url.example.com/v1");
  }
});

test("PUT /api/providers/{id} validation rejects non-http(s) baseUrl", () => {
  const validation = validateBody(updateProviderConnectionSchema, {
    providerSpecificData: {
      baseUrl: "file:///etc/passwd",
    },
  });

  assert.equal(validation.success, false, "Schema should reject non-http(s) URL schemes");
});
