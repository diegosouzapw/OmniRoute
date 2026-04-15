import test from "node:test";
import assert from "node:assert/strict";

const { mapImageSize } = await import("../../open-sse/translator/image/sizeMapper.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { IMAGE_PROVIDERS } = await import("../../open-sse/config/imageRegistry.ts");

test("T42: size mapper converts OpenAI sizes and preserves direct aspect ratios", () => {
  assert.equal(mapImageSize("1024x1024"), "1:1");
  assert.equal(mapImageSize("1792x1024"), "16:9");
  assert.equal(mapImageSize("16:9"), "16:9");
  assert.equal(mapImageSize("333x777"), "1:1");
  assert.equal(mapImageSize(undefined), "1:1");
});

test("T42: Imagen3 requests send mapped aspect_ratio and normalize to OpenAI response shape", async () => {
  const testProviderId = "t42-imagen3";
  const originalProvider = IMAGE_PROVIDERS[testProviderId];
  const originalFetch = globalThis.fetch;
  let capturedRequestBody = null;

  IMAGE_PROVIDERS[testProviderId] = {
    id: testProviderId,
    baseUrl: "https://example.com/imagen3",
    authType: "apikey",
    authHeader: "bearer",
    format: "imagen3",
    models: [{ id: "test-model", name: "Test Imagen3" }],
    supportedSizes: ["1024x1024", "1792x1024", "16:9"],
  };

  globalThis.fetch = async (_url, options = {}) => {
    capturedRequestBody = JSON.parse(String(options.body || "{}"));
    return new Response(
      JSON.stringify({
        images: [{ image: "ZmFrZS1pbWFnZS1iYXNlNjQ=" }],
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  try {
    const resultLandscape = await handleImageGeneration({
      body: {
        model: `${testProviderId}/test-model`,
        prompt: "a mountain at sunrise",
        size: "1792x1024",
        n: 1,
      },
      credentials: { apiKey: "test-key" },
      log: { info: () => {}, error: () => {} },
    });

    assert.equal(capturedRequestBody.aspect_ratio, "16:9");
    assert.equal(resultLandscape.success, true);
    assert.ok(Number.isFinite(resultLandscape.data.created));
    assert.ok(Array.isArray(resultLandscape.data.data));
    assert.equal(resultLandscape.data.data[0].b64_json, "ZmFrZS1pbWFnZS1iYXNlNjQ=");

    const resultDirectRatio = await handleImageGeneration({
      body: {
        model: `${testProviderId}/test-model`,
        prompt: "portrait photo",
        size: "16:9",
        n: 1,
      },
      credentials: { apiKey: "test-key" },
      log: { info: () => {}, error: () => {} },
    });
    assert.equal(capturedRequestBody.aspect_ratio, "16:9");
    assert.equal(resultDirectRatio.success, true);

    const resultFallback = await handleImageGeneration({
      body: {
        model: `${testProviderId}/test-model`,
        prompt: "abstract art",
        size: "333x777",
        n: 1,
      },
      credentials: { apiKey: "test-key" },
      log: { info: () => {}, error: () => {} },
    });
    assert.equal(capturedRequestBody.aspect_ratio, "1:1");
    assert.equal(resultFallback.success, true);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalProvider) {
      IMAGE_PROVIDERS[testProviderId] = originalProvider;
    } else {
      delete IMAGE_PROVIDERS[testProviderId];
    }
  }
});
