import { test } from "node:test";
import assert from "node:assert";
import {
  resolveMaxaiImageModel,
  snapMaxaiImageSize,
  extractMaxaiImageUrls,
  handleMaxaiImageGeneration,
  MAXAI_IMAGE_PATH,
} from "../../open-sse/handlers/imageGeneration/providers/maxaiImage.ts";
import { IMAGE_PROVIDERS } from "../../open-sse/config/imageRegistry.ts";
import { __setMaxaiConstantsForTest } from "../../open-sse/executors/maxai/constantsStore.ts";
import { MAXAI_BASE_URL } from "../../open-sse/executors/maxai/protocol.ts";
import { MOCK_CONSTANTS } from "./helpers/maxaiMockConstants.ts";

// Image generation signs like any request; seed the in-process constants memo
// with MOCK values so the handler doesn't try to fetch the live MaxAI bundle.
__setMaxaiConstantsForTest(MOCK_CONSTANTS);

// A minimal valid MaxAI credential (userId derives nothing here; the signer is
// exercised elsewhere). providerSpecificData carries the token + device id.
const CRED = {
  providerSpecificData: {
    maxaiAccessToken: "tok-abc",
    maxaiDeviceId: "dev-123",
    maxaiUserId: "11111111-1111-4111-8111-111111111111",
  },
};

// --- Registry ------------------------------------------------------------

test("maxai is registered in IMAGE_PROVIDERS with the maxai-image format + 6 models", () => {
  const entry = (
    IMAGE_PROVIDERS as Record<string, { format?: string; baseUrl?: string; models?: unknown[] }>
  )["maxai"];
  assert.ok(entry, "maxai must exist in IMAGE_PROVIDERS");
  assert.equal(entry.format, "maxai-image");
  assert.match(String(entry.baseUrl), /api\.maxai\.me\/gpt\/get_image_generate_response/);
  assert.equal((entry.models ?? []).length, 6);
});

// --- Pure helpers --------------------------------------------------------

test("resolveMaxaiImageModel strips maxai/ prefix and resolves aliases", () => {
  assert.equal(resolveMaxaiImageModel("maxai/gpt-image-1"), "gpt-image-1");
  assert.equal(resolveMaxaiImageModel("stable-diffusion-v3"), "sd3-medium");
  assert.equal(resolveMaxaiImageModel("stable-diffusion-3-medium"), "sd3-medium");
  assert.equal(resolveMaxaiImageModel("flux-1-schnell"), "flux-1-schnell");
});

test("snapMaxaiImageSize snaps unsupported sizes for strict models, passes flux through", () => {
  // gpt-image-1 / dall-e-3 reject 512x512 -> snap to 1024x1024
  assert.equal(snapMaxaiImageSize("gpt-image-1", "512x512"), "1024x1024");
  assert.equal(snapMaxaiImageSize("dall-e-3", "256x256"), "1024x1024");
  // supported sizes pass through
  assert.equal(snapMaxaiImageSize("gpt-image-1", "1536x1024"), "1536x1024");
  assert.equal(snapMaxaiImageSize("dall-e-3", "1792x1024"), "1792x1024");
  // flux / sd3: no constraint, any size passes through
  assert.equal(snapMaxaiImageSize("flux-1-schnell", "512x512"), "512x512");
  assert.equal(snapMaxaiImageSize("sd3-medium", "768x768"), "768x768");
  // missing size -> default
  assert.equal(snapMaxaiImageSize("gpt-image-1", undefined), "1024x1024");
});

test("extractMaxaiImageUrls prefers png_url, falls back to webp_url", () => {
  assert.deepEqual(
    extractMaxaiImageUrls([{ png_url: "p.png", webp_url: "w.webp" }, { webp_url: "only.webp" }]),
    ["p.png", "only.webp"]
  );
  assert.deepEqual(extractMaxaiImageUrls([]), []);
  assert.deepEqual(extractMaxaiImageUrls(null), []);
});

// --- Handler (mocked fetch) ---------------------------------------------

function mockFetch(status: number, jsonBody: unknown): typeof fetch {
  return (async () =>
    ({
      ok: status >= 200 && status < 300,
      status,
      async json() {
        return jsonBody;
      },
      async text() {
        return JSON.stringify(jsonBody);
      },
    }) as unknown as Response) as unknown as typeof fetch;
}

test("handleMaxaiImageGeneration returns OpenAI image data on success", async () => {
  let capturedUrl = "";
  let capturedBody: Record<string, unknown> = {};
  const fetchImpl = (async (url: string, init: RequestInit) => {
    capturedUrl = url;
    capturedBody = JSON.parse(String(init.body));
    return {
      ok: true,
      status: 200,
      async json() {
        return {
          status: "OK",
          data: [{ png_url: "https://cdn/x.png", webp_url: "https://cdn/x.webp" }],
        };
      },
      async text() {
        return "";
      },
    } as unknown as Response;
  }) as unknown as typeof fetch;

  const result = (await handleMaxaiImageGeneration({
    model: "flux-1-schnell",
    provider: "maxai",
    body: { prompt: "a red bicycle", size: "512x512", n: 2 },
    credentials: CRED,
    fetchImpl,
  })) as { success: boolean; data?: { data: Array<{ url: string }> } };

  assert.equal(result.success, true);
  assert.deepEqual(result.data?.data, [{ url: "https://cdn/x.png" }]);
  // Hit the image endpoint with the signed body. Exact URL equality instead of a
  // hand-escaped RegExp over the path — the old `.replace(/\//g, "\\/")` escaped
  // only slashes (which need no escaping in a RegExp anyway) and would have let
  // any other metacharacter through (CodeQL js/incomplete-sanitization), while
  // also accepting the path appearing anywhere in a wrong URL.
  assert.equal(capturedUrl, MAXAI_BASE_URL + MAXAI_IMAGE_PATH);
  assert.equal(capturedBody.model_name, "flux-1-schnell");
  assert.equal(capturedBody.size, "512x512"); // flux passes size through
  assert.equal(capturedBody.n, 2);
});

test("handleMaxaiImageGeneration 401 is retryable (credential fallback)", async () => {
  const result = (await handleMaxaiImageGeneration({
    model: "gpt-image-1",
    provider: "maxai",
    body: { prompt: "x" },
    credentials: CRED,
    fetchImpl: mockFetch(401, { error: "expired" }),
  })) as { success: boolean; status?: number; retryable?: boolean };
  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.equal(result.retryable, true);
});

test("handleMaxaiImageGeneration rejects an empty prompt with 400", async () => {
  const result = (await handleMaxaiImageGeneration({
    model: "gpt-image-1",
    provider: "maxai",
    body: { prompt: "  " },
    credentials: CRED,
    fetchImpl: mockFetch(200, {}),
  })) as { success: boolean; status?: number };
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
});

test("handleMaxaiImageGeneration 401s with no credential (retryable)", async () => {
  const result = (await handleMaxaiImageGeneration({
    model: "gpt-image-1",
    provider: "maxai",
    body: { prompt: "x" },
    credentials: {},
    fetchImpl: mockFetch(200, {}),
  })) as { success: boolean; status?: number; retryable?: boolean };
  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.equal(result.retryable, true);
});

test("handleMaxaiImageGeneration surfaces a no-images response as 502", async () => {
  const result = (await handleMaxaiImageGeneration({
    model: "sd3-medium",
    provider: "maxai",
    body: { prompt: "x" },
    credentials: CRED,
    fetchImpl: mockFetch(200, { status: "OK", data: [] }),
  })) as { success: boolean; status?: number };
  assert.equal(result.success, false);
  assert.equal(result.status, 502);
});
