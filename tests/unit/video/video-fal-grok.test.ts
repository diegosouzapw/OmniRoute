import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-video-fal-grok-"));

const { handleVideoGeneration } = await import("../../../open-sse/handlers/videoGeneration.ts");
const { VIDEO_PROVIDERS } = await import("../../../open-sse/config/videoRegistry.ts");

function immediateTimeout(callback: (...args: unknown[]) => void, _ms: number, ...args: unknown[]) {
  callback(...args);
  return 0;
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("VIDEO_PROVIDERS exposes the Fal-hosted Grok video model", () => {
  assert.ok(VIDEO_PROVIDERS["fal-ai"]);
  assert.equal(VIDEO_PROVIDERS["fal-ai"].format, "fal-ai-video");
  assert.ok(
    VIDEO_PROVIDERS["fal-ai"].models.some(
      (model) => model.id === "xai/grok-imagine-video/text-to-video"
    )
  );
});

test("handleVideoGeneration sends the Fal-hosted Grok request and returns the video URL", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const requests: Array<{ url: string; headers: Record<string, string>; body?: unknown }> = [];
  globalThis.setTimeout = immediateTimeout as typeof globalThis.setTimeout;

  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);
    const headers = Object.fromEntries(new Headers(options.headers).entries());
    const body = options.body ? JSON.parse(String(options.body)) : undefined;
    requests.push({ url: stringUrl, headers, body });

    if (requests.length === 1) {
      return jsonResponse({
        request_id: "fal-grok-1",
        status_url:
          "https://queue.fal.run/xai/grok-imagine-video/text-to-video/requests/fal-grok-1/status",
        response_url:
          "https://queue.fal.run/xai/grok-imagine-video/text-to-video/requests/fal-grok-1",
      });
    }
    if (stringUrl.endsWith("/status")) return jsonResponse({ status: "COMPLETED" });
    return jsonResponse({ video: { url: "https://cdn.example/fal-grok-1.mp4" } });
  };

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "fal-ai/xai/grok-imagine-video/text-to-video",
        prompt: "a dog walking through a park",
        duration: "8s",
        resolution: "720p",
        generate_audio: true,
      },
      credentials: { apiKey: "fal-key" },
      log: null,
    });

    assert.equal(requests[0]?.url, "https://queue.fal.run/xai/grok-imagine-video/text-to-video");
    assert.equal(requests[0]?.headers.authorization, "Key fal-key");
    assert.deepEqual(requests[0]?.body, {
      prompt: "a dog walking through a park",
      aspect_ratio: "16:9",
      duration: 8,
      resolution: "720p",
    });
    assert.equal(result.success, true);
    assert.equal(result.data.data[0].url, "https://cdn.example/fal-grok-1.mp4");
    assert.equal(result.data.data[0].format, "mp4");
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleVideoGeneration rejects Fal video requests without credentials", async () => {
  const result = await handleVideoGeneration({
    body: { model: "fal-ai/xai/grok-imagine-video/text-to-video", prompt: "x" },
    credentials: null,
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.match(result.error, /Fal API key is required/);
});

test("handleVideoGeneration rejects malformed Fal video URL payloads", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => jsonResponse({ video: { url: { nested: "not-a-url" } } });

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "fal-ai/xai/grok-imagine-video/text-to-video",
        prompt: "a malformed result",
      },
      credentials: { apiKey: "fal-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    // #9982 folded the video path into the provider-neutral mediaGeneration/fal.ts,
    // whose wording is media-kind agnostic ("no media URL").
    assert.match(result.error, /no media URL/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
