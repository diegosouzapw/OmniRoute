import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-images-"));

const { handleImageGeneration, handleOpenAIImageEdit } =
  await import("../../open-sse/handlers/imageGeneration.ts");

// LEDGER-12 — `hasUsableImage` (fetchImageEndpoint): a 2xx whose items carry no usable
// `b64_json`/`url` must surface as a retryable 502 so image combos fall back, on both the
// generation and the edit path.
function mockOpenAICompatibleUpstream(payload: unknown) {
  return async () =>
    new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
}

const usableImageRequest = {
  body: { model: "custom-provider/super-image", prompt: "retro poster" },
  credentials: {
    apiKey: "custom-key",
    baseUrl: "https://custom.example.com/v1/images/generations",
  },
  resolvedProvider: "custom-provider",
  log: null,
};

test("handleImageGeneration treats a 200 whose only item has a blank url as a retryable 502", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = mockOpenAICompatibleUpstream({ data: [{ url: "" }] });
  try {
    const result = await handleImageGeneration(usableImageRequest);
    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.match(String(result.error), /without an image payload/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration treats a 200 whose only item is not an object as a retryable 502", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = mockOpenAICompatibleUpstream({ data: ["https://cdn.example.com/x.png"] });
  try {
    const result = await handleImageGeneration(usableImageRequest);
    assert.equal(result.success, false);
    assert.equal(result.status, 502);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration keeps a well-formed 200 image payload as success", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = mockOpenAICompatibleUpstream({
    created: 123,
    data: [{ url: "" }, { b64_json: "ZmFrZQ==" }],
  });
  try {
    const result = await handleImageGeneration(usableImageRequest);
    assert.equal(result.success, true);
    assert.equal(result.status, undefined);
    assert.deepEqual(result.data, { created: 123, data: [{ url: "" }, { b64_json: "ZmFrZQ==" }] });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleOpenAIImageEdit applies the same usable-image gate to the edit path", async () => {
  const originalFetch = globalThis.fetch;
  const editRequest = {
    model: "super-image",
    provider: "custom-provider",
    credentials: {
      apiKey: "custom-key",
      providerSpecificData: { baseUrl: "https://custom.example.com/v1" },
    },
    prompt: "make it blue",
    imageBytes: Buffer.from([0x89, 0x50, 0x4e, 0x47]),
    imageMime: "image/png",
    log: null,
  };
  try {
    globalThis.fetch = mockOpenAICompatibleUpstream({ data: [{ b64_json: "" }] });
    const blank = await handleOpenAIImageEdit(editRequest);
    assert.equal(blank.success, false);
    assert.equal(blank.status, 502);
    assert.match(String(blank.error), /without an image payload/);

    globalThis.fetch = mockOpenAICompatibleUpstream({ data: [{ b64_json: "ZmFrZQ==" }] });
    const ok = await handleOpenAIImageEdit(editRequest);
    assert.equal(ok.success, true);
    assert.deepEqual(ok.data.data, [{ b64_json: "ZmFrZQ==" }]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// LEDGER-6 — `image_size` is forwarded to Antigravity's `imageConfig.imageSize` only when the
// caller supplied it; an unrecognised string is clamped to "1K", everything else leaves the
// key out so the upstream default applies.
async function captureAntigravityImageConfig(extraBody: Record<string, unknown>) {
  const originalFetch = globalThis.fetch;
  let captured;
  globalThis.fetch = async (_url, options = {}) => {
    captured = JSON.parse(String(options.body || "{}"));
    return new Response(JSON.stringify({ response: { candidates: [] } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };
  try {
    const result = await handleImageGeneration({
      body: {
        model: "antigravity/gemini-3.1-flash-image-preview",
        prompt: "painted beach",
        aspect_ratio: "3:4",
        ...extraBody,
      },
      credentials: { accessToken: "ag-token", projectId: "project-123" },
      log: null,
    });
    assert.equal(result.success, true);
    return captured.request.generationConfig.imageConfig;
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("handleImageGeneration omits Antigravity imageSize when image_size is not supplied", async () => {
  assert.deepEqual(await captureAntigravityImageConfig({}), { aspectRatio: "3:4" });
});

test("handleImageGeneration forwards a valid Antigravity image_size normalized to upper case", async () => {
  assert.deepEqual(await captureAntigravityImageConfig({ image_size: "2K" }), {
    aspectRatio: "3:4",
    imageSize: "2K",
  });
  assert.deepEqual(await captureAntigravityImageConfig({ image_size: " 4k " }), {
    aspectRatio: "3:4",
    imageSize: "4K",
  });
});

test("handleImageGeneration clamps an unrecognised Antigravity image_size string to 1K", async () => {
  assert.deepEqual(await captureAntigravityImageConfig({ image_size: "1024x1024" }), {
    aspectRatio: "3:4",
    imageSize: "1K",
  });
});

test("handleImageGeneration omits Antigravity imageSize for a non-string image_size", async () => {
  assert.deepEqual(await captureAntigravityImageConfig({ image_size: 2 }), { aspectRatio: "3:4" });
});

test("handleImageGeneration ignores the camelCase imageSize alias on Antigravity requests", async () => {
  assert.deepEqual(await captureAntigravityImageConfig({ imageSize: "4K" }), {
    aspectRatio: "3:4",
  });
});
