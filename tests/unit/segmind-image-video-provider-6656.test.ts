import test from "node:test";
import assert from "node:assert/strict";

// #6656 — Segmind image+video provider.
// Segmind exposes 200+ hosted models under a single `POST /v1/{model}` REST
// shape (https://docs.segmind.com/): x-api-key header auth, JSON request
// body, raw image/video bytes response (no JSON envelope) on success. This
// covers: registry entry shape (image + video), connection-metadata catalog
// entry, IMAGE_ONLY/VIDEO_PROVIDER_IDS membership, request mapping through
// the dedicated handlers (mocked fetch, no live key required), and the
// error path staying sanitized (no raw stack/message leakage).

const { IMAGE_PROVIDERS, getImageProvider } = await import("../../open-sse/config/imageRegistry.ts");
const { VIDEO_PROVIDERS, getVideoProvider } = await import("../../open-sse/config/videoRegistry.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { handleVideoGeneration } = await import("../../open-sse/handlers/videoGeneration.ts");
const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");
const { IMAGE_ONLY_PROVIDER_IDS, VIDEO_PROVIDER_IDS } = await import(
  "../../src/shared/constants/providers.ts"
);

test("segmind connection-metadata entry is registered with the expected shape", () => {
  const entry = (APIKEY_PROVIDERS as Record<string, { id: string; website: string }>).segmind;
  assert.ok(entry, "expected an APIKEY_PROVIDERS entry for segmind");
  assert.equal(entry.id, "segmind");
  assert.equal(entry.website, "https://segmind.com");
});

test("segmind is registered in both IMAGE_ONLY_PROVIDER_IDS and VIDEO_PROVIDER_IDS", () => {
  assert.ok(IMAGE_ONLY_PROVIDER_IDS.has("segmind"), "segmind must appear in IMAGE_ONLY_PROVIDER_IDS");
  assert.ok(VIDEO_PROVIDER_IDS.has("segmind"), "segmind must appear in VIDEO_PROVIDER_IDS");
});

test("segmind image registry entry uses the x-api-key REST shape", () => {
  const cfg = getImageProvider("segmind");
  assert.ok(cfg, "expected an IMAGE_PROVIDERS entry for segmind");
  assert.equal(cfg.id, "segmind");
  assert.equal(cfg.baseUrl, "https://api.segmind.com/v1");
  assert.equal(cfg.authType, "apikey");
  assert.equal(cfg.authHeader, "x-api-key");
  assert.equal(cfg.format, "segmind");
  assert.ok(cfg.models.length > 0, "expected at least one starter image model");
  assert.ok(
    cfg.models.some((m) => m.id === "flux-schnell"),
    "expected flux-schnell in the starter image model list"
  );
  assert.ok(Array.isArray(cfg.supportedSizes) && cfg.supportedSizes.length > 0);
});

test("segmind video registry entry uses the x-api-key REST shape", () => {
  const cfg = getVideoProvider("segmind");
  assert.ok(cfg, "expected a VIDEO_PROVIDERS entry for segmind");
  assert.equal(cfg.id, "segmind");
  assert.equal(cfg.baseUrl, "https://api.segmind.com/v1");
  assert.equal(cfg.authType, "apikey");
  assert.equal(cfg.authHeader, "x-api-key");
  assert.equal(cfg.format, "segmind");
  assert.ok(cfg.models.length > 0, "expected at least one starter video model");
  assert.ok(
    cfg.models.some((m) => m.id === "wan2.1-t2v"),
    "expected wan2.1-t2v in the starter video model list"
  );
});

test("segmind image/video registries do not share model ids by accident", () => {
  const imageIds = new Set(IMAGE_PROVIDERS.segmind.models.map((m) => m.id));
  const videoIds = VIDEO_PROVIDERS.segmind.models.map((m) => m.id);
  for (const id of videoIds) {
    assert.ok(!imageIds.has(id), `video model id "${id}" unexpectedly duplicated in image models`);
  }
});

test("handleImageGeneration posts to Segmind with x-api-key and returns a data: URL image", async () => {
  const originalFetch = globalThis.fetch;
  let requestCapture;

  globalThis.fetch = async (url, options = {}) => {
    requestCapture = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };
    return new Response(new Uint8Array([1, 2, 3, 4]), {
      status: 200,
      headers: { "content-type": "image/jpeg" },
    });
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "segmind/flux-schnell",
        prompt: "a bengal tiger in an astronaut suit",
        size: "1024x1024",
      },
      credentials: { apiKey: "segmind-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(requestCapture.url, "https://api.segmind.com/v1/flux-schnell");
    assert.equal(requestCapture.headers["x-api-key"], "segmind-key");
    assert.equal(requestCapture.body.prompt, "a bengal tiger in an astronaut suit");
    assert.equal(requestCapture.body.width, 1024);
    assert.equal(requestCapture.body.height, 1024);
    assert.ok(String(result.data.data[0].url).startsWith("data:image/jpeg;base64,"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration returns b64_json when response_format=b64_json is requested", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(new Uint8Array([9, 9, 9]), {
      status: 200,
      headers: { "content-type": "image/png" },
    });

  try {
    const result = await handleImageGeneration({
      body: {
        model: "segmind/flux-schnell",
        prompt: "test",
        response_format: "b64_json",
      },
      credentials: { apiKey: "segmind-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.ok(typeof result.data.data[0].b64_json === "string" && result.data.data[0].b64_json.length > 0);
    assert.equal(result.data.data[0].url, undefined);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration sanitizes Segmind upstream error bodies (no raw stack leakage)", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(
      "Internal error at /home/runner/work/segmind/handler.ts:42\n  at foo (/home/runner/work/segmind/app.js:10:2)",
      { status: 500, headers: { "content-type": "text/plain" } }
    );

  try {
    const result = await handleImageGeneration({
      body: { model: "segmind/flux-schnell", prompt: "test" },
      credentials: { apiKey: "segmind-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 500);
    assert.ok(!result.error.includes("/home/runner"), "error must not leak raw absolute paths");
    assert.ok(!result.error.includes("at foo"), "error must not leak raw stack frames (2nd line)");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleVideoGeneration posts to Segmind with x-api-key and returns an mp4 b64_json payload", async () => {
  const originalFetch = globalThis.fetch;
  let requestCapture;

  globalThis.fetch = async (url, options = {}) => {
    requestCapture = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };
    return new Response(new Uint8Array([5, 6, 7, 8]), {
      status: 200,
      headers: { "content-type": "video/mp4" },
    });
  };

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "segmind/wan2.1-t2v",
        prompt: "a smiling woman walking in London at night",
        aspect_ratio: "16:9",
      },
      credentials: { apiKey: "segmind-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(requestCapture.url, "https://api.segmind.com/v1/wan2.1-t2v");
    assert.equal(requestCapture.headers["x-api-key"], "segmind-key");
    assert.equal(requestCapture.body.prompt, "a smiling woman walking in London at night");
    assert.equal(requestCapture.body.aspect_ratio, "16:9");
    assert.equal(result.data.data[0].format, "mp4");
    assert.ok(typeof result.data.data[0].b64_json === "string" && result.data.data[0].b64_json.length > 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleVideoGeneration sanitizes Segmind upstream error bodies (no raw stack leakage)", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response("Traceback (most recent call last):\n  File \"/srv/app/handler.py\", line 10", {
      status: 502,
      headers: { "content-type": "text/plain" },
    });

  try {
    const result = await handleVideoGeneration({
      body: { model: "segmind/wan2.1-t2v", prompt: "test" },
      credentials: { apiKey: "segmind-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.ok(!result.error.includes("/srv/app"), "error must not leak raw absolute paths");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration surfaces network errors through sanitizeErrorMessage (502, no raw message)", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => {
    throw new Error(
      "connect ECONNREFUSED at /home/runner/work/segmind/client.ts:5:1\n  at TCPConnectWrap.afterConnect"
    );
  };

  try {
    const result = await handleImageGeneration({
      body: { model: "segmind/flux-schnell", prompt: "test" },
      credentials: { apiKey: "segmind-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.ok(!result.error.includes("/home/runner"), "must not leak raw absolute source path");
    assert.ok(
      !result.error.includes("TCPConnectWrap"),
      "must not leak the raw stack frame (2nd line)"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
