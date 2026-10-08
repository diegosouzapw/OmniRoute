import test from "node:test";
import assert from "node:assert/strict";

// Cloudflare Workers AI had a chat provider entry (cloudflare-ai) but no image
// registry entry and no dedicated provider handler under
// open-sse/handlers/imageGeneration/providers/, so a cloudflare-ai image-model
// request fell through the format dispatch in imageGeneration.ts to a
// 400/unmatched-format path instead of reaching Workers AI's /ai/run endpoint.
//
// handleImageGeneration is imported statically (not dynamically inside a test) so
// its transitive imports (e.g. the proxy-aware fetch dispatcher) finish installing
// their own globalThis.fetch wrapper before any test reassigns it for mocking —
// a dynamic import after the mock assignment would let that wrapper silently
// clobber the test's mock and hit the real network.
const { getImageProvider } = await import("../../open-sse/config/imageRegistry.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");

test("Cloudflare Workers AI is registered as an image provider with a dedicated cloudflare-ai-image format", () => {
  const cfg = getImageProvider("cloudflare-ai");
  assert.ok(cfg, "expected an IMAGE_PROVIDERS entry for cloudflare-ai");
  assert.equal(cfg.id, "cloudflare-ai");
  assert.equal(
    cfg.format,
    "cloudflare-ai-image",
    "Workers AI /ai/run is not OpenAI-compatible, must use its own format"
  );
  assert.equal(cfg.authType, "apikey");
  assert.equal(cfg.authHeader, "bearer");
});

test("Cloudflare Workers AI image provider exposes at least one text-to-image model", () => {
  const cfg = getImageProvider("cloudflare-ai");
  const ids = (cfg?.models || []).map((m) => m.id);
  assert.ok(ids.length > 0, `expected at least one Workers AI image model, got: ${ids.join(", ")}`);
  assert.ok(
    Array.isArray(cfg?.supportedSizes) && cfg.supportedSizes.length > 0,
    "image provider must declare at least one supported size"
  );
});

test("handleImageGeneration rejects a Cloudflare Workers AI request with no Account ID", async () => {
  const result = await handleImageGeneration({
    body: {
      model: "cloudflare-ai/@cf/black-forest-labs/flux-1-schnell",
      prompt: "a red panda",
      n: 1,
    },
    credentials: { apiKey: "test-token" },
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(String(result.error), /Account ID/);
});

test("handleImageGeneration dispatches cloudflare-ai-image format to the Workers AI handler and normalizes the response", async () => {
  const originalFetch = globalThis.fetch;
  try {
    let fetchCalled = false;
    globalThis.fetch = (async (url: string) => {
      fetchCalled = true;
      assert.match(
        String(url),
        /api\.cloudflare\.com\/client\/v4\/accounts\/acct-123\/ai\/run\/@cf\/black-forest-labs\/flux-1-schnell$/
      );
      return {
        ok: true,
        status: 200,
        text: async () =>
          JSON.stringify({
            result: { image: "ZmFrZS1iYXNlNjQtaW1hZ2U=" },
            success: true,
            errors: [],
            messages: [],
          }),
      } as unknown as Response;
    }) as typeof fetch;

    const result = await handleImageGeneration({
      body: {
        model: "cloudflare-ai/@cf/black-forest-labs/flux-1-schnell",
        prompt: "a red panda in the snow",
        n: 1,
      },
      credentials: { apiKey: "test-token", providerSpecificData: { accountId: "acct-123" } },
      log: null,
    });

    assert.equal(fetchCalled, true, "expected the Workers AI handler to call fetch");
    assert.equal(result.success, true, `expected success, got: ${JSON.stringify(result)}`);
    assert.ok(Array.isArray(result.data?.data) && result.data.data.length === 1);
    assert.equal(result.data.data[0].b64_json, "ZmFrZS1iYXNlNjQtaW1hZ2U=");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration surfaces Cloudflare Workers AI upstream errors without a network 404", async () => {
  const originalFetch = globalThis.fetch;
  try {
    globalThis.fetch = (async () => {
      return {
        ok: false,
        status: 401,
        text: async () =>
          JSON.stringify({
            success: false,
            errors: [{ code: 10000, message: "Invalid API Token" }],
          }),
      } as unknown as Response;
    }) as typeof fetch;

    const result = await handleImageGeneration({
      body: {
        model: "cloudflare-ai/@cf/black-forest-labs/flux-1-schnell",
        prompt: "a red panda in the snow",
        n: 1,
      },
      credentials: { apiKey: "bad-token", providerSpecificData: { accountId: "acct-123" } },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 401);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
