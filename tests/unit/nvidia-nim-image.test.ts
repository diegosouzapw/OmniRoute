import test from "node:test";
import assert from "node:assert/strict";

// Ported from upstream 9router#1195: NVIDIA NIM image generation (FLUX models).
// NVIDIA already exists as a CHAT provider (integrate.api.nvidia.com,
// OpenAI-compatible) — image generation is a distinct host (ai.api.nvidia.com)
// with a native NIM body shape, so it gets its own `nvidia-nim` format/handler
// (handleNvidiaNimImageGeneration) rather than reusing the OpenAI image path.

import { handleImageGeneration } from "../../open-sse/handlers/imageGeneration.ts";
import { getImageProvider } from "../../open-sse/config/imageRegistry.ts";
import {
  buildNvidiaNimRequestBody,
  normalizeNvidiaNimImages,
} from "../../open-sse/handlers/imageGeneration/providers/nvidiaNim.ts";

test("nvidia is registered as an nvidia-nim image provider with the 4 FLUX models", () => {
  const cfg = getImageProvider("nvidia");
  assert.ok(cfg, "expected an IMAGE_PROVIDERS entry for nvidia");
  assert.equal(cfg.format, "nvidia-nim");
  assert.equal(cfg.baseUrl, "https://ai.api.nvidia.com/v1/genai");
  assert.equal(cfg.authType, "apikey");
  assert.equal(cfg.authHeader, "bearer");

  const ids = cfg.models.map((m) => m.id);
  assert.deepEqual(ids, [
    "black-forest-labs/flux.1-dev",
    "black-forest-labs/flux.1-schnell",
    "black-forest-labs/flux.1-kontext-dev",
    "black-forest-labs/flux.2-klein-4b",
  ]);
});

test("handleImageGeneration(nvidia/flux.1-schnell): URL construction + minimal body shaping", async () => {
  const originalFetch = globalThis.fetch;
  let capturedUrl;
  let capturedOptions;

  globalThis.fetch = async (url, options) => {
    capturedUrl = String(url);
    capturedOptions = options;
    return new Response(
      JSON.stringify({ artifacts: [{ base64: "base64nvidia", finishReason: "SUCCESS" }] }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "nvidia/black-forest-labs/flux.1-schnell",
        prompt: "A neon city",
        width: 1344,
        height: 1024,
        seed: 7,
        steps: 4,
      },
      credentials: { apiKey: "nv-token" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(capturedUrl, "https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-schnell");
    assert.equal(capturedOptions.method, "POST");
    assert.equal(capturedOptions.headers.Authorization, "Bearer nv-token");
    assert.equal(capturedOptions.headers.Accept, "application/json");

    const requestBody = JSON.parse(capturedOptions.body);
    assert.deepEqual(requestBody, {
      prompt: "A neon city",
      width: 1344,
      height: 1024,
      seed: 7,
      steps: 4,
    });

    assert.equal(result.data.data[0].b64_json, "base64nvidia");
    assert.equal(result.data.data[0].finish_reason, "SUCCESS");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration(nvidia/flux.2-klein-4b): sends edit input image as an array", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ artifacts: [{ base64: "base64nvidiaedit" }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });

  try {
    const result = await handleImageGeneration({
      body: {
        model: "nvidia/black-forest-labs/flux.2-klein-4b",
        prompt: "Make the frog wear tiny glasses",
        image: "data:image/png;example_id,0",
        width: 1024,
        height: 1024,
        seed: 0,
        steps: 4,
      },
      credentials: { apiKey: "nv-token" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(result.data.data[0].b64_json, "base64nvidiaedit");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("buildNvidiaNimRequestBody(flux.2-klein-4b): image sent as an array, width/height passthrough", () => {
  const req = buildNvidiaNimRequestBody("black-forest-labs/flux.2-klein-4b", {
    prompt: "Make the frog wear tiny glasses",
    image: "data:image/png;example_id,0",
    width: 1024,
    height: 1024,
    seed: 0,
    steps: 4,
  });
  assert.deepEqual(req, {
    prompt: "Make the frog wear tiny glasses",
    width: 1024,
    height: 1024,
    image: ["data:image/png;example_id,0"],
    seed: 0,
    steps: 4,
  });
});

test("buildNvidiaNimRequestBody(flux.1-dev): omits input image in base mode", () => {
  const req = buildNvidiaNimRequestBody("black-forest-labs/flux.1-dev", {
    prompt: "A simple coffee shop interior",
    mode: "base",
    image: "data:image/png;example_id,0",
    cfg_scale: 1.1,
    width: 768,
    height: 1344,
    seed: 0,
    steps: 50,
  });
  assert.deepEqual(req, {
    prompt: "A simple coffee shop interior",
    mode: "base",
    width: 768,
    height: 1344,
    cfg_scale: 1.1,
    seed: 0,
    steps: 50,
  });
});

test("buildNvidiaNimRequestBody(flux.1-dev): drops out-of-range dimensions and non-positive cfg_scale", () => {
  const req = buildNvidiaNimRequestBody("black-forest-labs/flux.1-dev", {
    prompt: "A simple coffee shop interior",
    mode: "base",
    image: "data:image/png;example_id,0",
    cfg_scale: 0,
    width: 1792, // out of the 768-1344 range
    height: 1024,
    seed: 0,
    steps: 50,
  });
  assert.deepEqual(req, {
    prompt: "A simple coffee shop interior",
    mode: "base",
    seed: 0,
    steps: 50,
  });
  assert.ok(!("width" in req) && !("height" in req) && !("cfg_scale" in req));
});

test("buildNvidiaNimRequestBody(flux.1-dev): sends control image as a string for non-base modes", () => {
  const req = buildNvidiaNimRequestBody("black-forest-labs/flux.1-dev", {
    prompt: "A simple coffee shop interior",
    mode: "depth",
    image: "data:image/png;example_id,0",
    cfg_scale: 3.5,
    width: 1024,
    height: 1024,
    seed: 0,
    steps: 50,
  });
  assert.deepEqual(req, {
    prompt: "A simple coffee shop interior",
    width: 1024,
    height: 1024,
    mode: "depth",
    image: "data:image/png;example_id,0",
    cfg_scale: 3.5,
    seed: 0,
    steps: 50,
  });
});

test("buildNvidiaNimRequestBody(flux.1-kontext-dev): uses aspect_ratio instead of width/height", () => {
  const req = buildNvidiaNimRequestBody("black-forest-labs/flux.1-kontext-dev", {
    prompt: "Now the mouse is holding pizza instead",
    image: "data:image/png;example_id,0",
    aspect_ratio: "match_input_image",
    width: 1024,
    height: 1024,
    steps: 30,
    cfg_scale: 3.5,
    seed: 0,
  });
  assert.deepEqual(req, {
    prompt: "Now the mouse is holding pizza instead",
    image: "data:image/png;example_id,0",
    aspect_ratio: "match_input_image",
    cfg_scale: 3.5,
    seed: 0,
    steps: 30,
  });
});

test("handleImageGeneration(nvidia/flux.1-kontext-dev): requires an input image, does not fetch", async () => {
  const originalFetch = globalThis.fetch;
  let fetchCalled = false;
  globalThis.fetch = async () => {
    fetchCalled = true;
    throw new Error("fetch should not be called without an input image");
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "nvidia/black-forest-labs/flux.1-kontext-dev",
        prompt: "Now the mouse is holding pizza instead",
      },
      credentials: { apiKey: "nv-token" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 400);
    assert.match(result.error, /requires an input image/i);
    assert.equal(fetchCalled, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("normalizeNvidiaNimImages: accepts artifacts[], images[], data[], and single-value shapes", () => {
  assert.deepEqual(normalizeNvidiaNimImages({ artifacts: [{ base64: "a1" }] }).data, [
    { b64_json: "a1" },
  ]);
  assert.deepEqual(normalizeNvidiaNimImages({ images: ["b1", "b2"] }).data, [
    { b64_json: "b1" },
    { b64_json: "b2" },
  ]);
  assert.deepEqual(normalizeNvidiaNimImages({ data: [{ b64_json: "c1" }] }).data, [
    { b64_json: "c1" },
  ]);
  assert.deepEqual(normalizeNvidiaNimImages({ image: "d1" }).data, [{ b64_json: "d1" }]);
  assert.deepEqual(normalizeNvidiaNimImages({ result: { image: "e1" } }).data, [
    { b64_json: "e1" },
  ]);
  // Already-OpenAI-shaped responses pass through untouched.
  const passthrough = { created: 123, data: [{ b64_json: "f1" }] };
  assert.deepEqual(normalizeNvidiaNimImages(passthrough), passthrough);
  // Unrecognized shape -> empty data, never throws.
  assert.deepEqual(normalizeNvidiaNimImages({ nonsense: true }).data, []);
});

test("handleImageGeneration(nvidia): upstream error body never leaks a stack trace", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error(`boom at /home/user/secret/path/imageGeneration.ts:123:45`);
  };

  try {
    const result = await handleImageGeneration({
      body: {
        model: "nvidia/black-forest-labs/flux.1-schnell",
        prompt: "test",
      },
      credentials: { apiKey: "nv-token" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.ok(!result.error.includes("/home/"), "error must not leak an absolute path/stack");
    assert.ok(!result.error.includes(":123:45"), "error must not leak a stack trace location");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration(nvidia): upstream non-2xx response is surfaced with its status", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response("rate limited", { status: 429, headers: { "content-type": "text/plain" } });

  try {
    const result = await handleImageGeneration({
      body: {
        model: "nvidia/black-forest-labs/flux.1-schnell",
        prompt: "test",
      },
      credentials: { apiKey: "nv-token" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 429);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
