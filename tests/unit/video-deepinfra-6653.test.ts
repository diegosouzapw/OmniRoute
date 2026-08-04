import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-video-deepinfra-"));

const { handleVideoGeneration } = await import("../../open-sse/handlers/videoGeneration.ts");
const { VIDEO_PROVIDERS, parseVideoModel } = await import(
  "../../open-sse/config/videoRegistry.ts"
);
const {
  buildDeepinfraVideoRequestBody,
  extractDeepinfraErrorMessage,
} = await import("../../open-sse/handlers/videoGeneration/deepinfraHandler.ts");

const INFERENCE_URL = "https://api.deepinfra.com/v1/inference/Wan-AI/Wan2.2-T2V-A14B";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("VIDEO_PROVIDERS exposes the deepinfra deepinfra-video entry", () => {
  assert.ok(VIDEO_PROVIDERS.deepinfra, "deepinfra video provider is registered");
  assert.equal(VIDEO_PROVIDERS.deepinfra.format, "deepinfra-video");
  assert.equal(VIDEO_PROVIDERS.deepinfra.authType, "apikey");
  assert.equal(VIDEO_PROVIDERS.deepinfra.authHeader, "bearer");
  assert.equal(VIDEO_PROVIDERS.deepinfra.baseUrl, "https://api.deepinfra.com/v1/inference");
  assert.ok(
    VIDEO_PROVIDERS.deepinfra.models.some((m) => m.id === "Wan-AI/Wan2.2-T2V-A14B"),
    "Wan 2.2 T2V A14B is listed"
  );
});

test("parseVideoModel resolves provider/model strings whose model id itself contains a slash", () => {
  const parsed = parseVideoModel("deepinfra/Wan-AI/Wan2.2-T2V-A14B");
  assert.equal(parsed.provider, "deepinfra");
  assert.equal(parsed.model, "Wan-AI/Wan2.2-T2V-A14B");
});

test("buildDeepinfraVideoRequestBody carries prompt/negative_prompt/image/seed", () => {
  const body = buildDeepinfraVideoRequestBody({
    prompt: "a neon city in the rain",
    negative_prompt: "blurry",
    image: "https://example.com/frame.png",
    seed: 42,
  });
  assert.deepEqual(body, {
    prompt: "a neon city in the rain",
    negative_prompt: "blurry",
    image: "https://example.com/frame.png",
    seed: 42,
  });
});

test("buildDeepinfraVideoRequestBody omits optional fields when absent", () => {
  const body = buildDeepinfraVideoRequestBody({ prompt: "just a prompt" });
  assert.deepEqual(body, { prompt: "just a prompt" });
});

test("extractDeepinfraErrorMessage reads string error/detail/message and inference_status.error", () => {
  assert.equal(extractDeepinfraErrorMessage({ error: "bad request" }), "bad request");
  assert.equal(extractDeepinfraErrorMessage({ detail: "invalid model" }), "invalid model");
  assert.equal(
    extractDeepinfraErrorMessage({ error: { message: "nested" } }),
    "nested"
  );
  assert.equal(
    extractDeepinfraErrorMessage({ inference_status: { error: "queue timeout" } }),
    "queue timeout"
  );
  assert.equal(extractDeepinfraErrorMessage({}), null);
  assert.equal(extractDeepinfraErrorMessage(null), null);
});

test("handleVideoGeneration builds a synchronous DeepInfra request and returns the mp4 url", async () => {
  const originalFetch = globalThis.fetch;
  let capturedRequest;

  globalThis.fetch = async (url, options = {}) => {
    capturedRequest = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };
    return jsonResponse({
      video_url: "https://deepinfra-cdn.example.com/wan-out.mp4",
      seed: 7,
      request_id: "req-1",
      inference_status: { status: "succeeded" },
    });
  };

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "deepinfra/Wan-AI/Wan2.2-T2V-A14B",
        prompt: "a neon city in the rain",
        negative_prompt: "blurry",
      },
      credentials: { apiKey: "deepinfra-key" },
      log: null,
    });

    assert.equal(capturedRequest.url, INFERENCE_URL);
    assert.equal(capturedRequest.headers["Authorization"], "Bearer deepinfra-key");
    assert.equal(capturedRequest.body.prompt, "a neon city in the rain");
    assert.equal(capturedRequest.body.negative_prompt, "blurry");

    assert.equal(result.success, true);
    assert.equal(result.data.data[0].url, "https://deepinfra-cdn.example.com/wan-out.mp4");
    assert.equal(result.data.data[0].format, "mp4");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleVideoGeneration rejects DeepInfra video requests without credentials", async () => {
  const result = await handleVideoGeneration({
    body: { model: "deepinfra/Wan-AI/Wan2.2-T2V-A14B", prompt: "x" },
    credentials: null,
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.match(result.error, /DeepInfra API key is required/);
});

test("handleVideoGeneration surfaces upstream HTTP errors without leaking a stack trace", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    jsonResponse({ error: "Invalid API key" }, 401);

  try {
    const result = await handleVideoGeneration({
      body: { model: "deepinfra/Wan-AI/Wan2.2-T2V-A14B", prompt: "x" },
      credentials: { apiKey: "bad-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 401);
    assert.equal(result.error, "Invalid API key");
    assert.ok(!result.error.includes("at /"), "error must not leak a stack trace");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleVideoGeneration returns 502 when DeepInfra succeeds without a video_url", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => jsonResponse({ seed: 1, request_id: "req-2" });

  try {
    const result = await handleVideoGeneration({
      body: { model: "deepinfra/Wan-AI/Wan2.2-T2V-A14B", prompt: "x" },
      credentials: { apiKey: "deepinfra-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.match(result.error, /did not return video_url/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleVideoGeneration sanitizes network-level failures via sanitizeErrorMessage", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error(
      "fetch failed\n    at Object.fetch (/home/user/omniroute/node_modules/undici/lib/x.js:1:1)"
    );
  };

  try {
    const result = await handleVideoGeneration({
      body: { model: "deepinfra/Wan-AI/Wan2.2-T2V-A14B", prompt: "x" },
      credentials: { apiKey: "deepinfra-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.ok(!result.error.includes("at Object.fetch"), "error must not leak a stack trace");
    assert.ok(!result.error.includes("/home/user"), "error must not leak an absolute path");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
