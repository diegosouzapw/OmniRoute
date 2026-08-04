import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-video-xai-"));

const { handleVideoGeneration } = await import("../../open-sse/handlers/videoGeneration.ts");
const { VIDEO_PROVIDERS } = await import("../../open-sse/config/videoRegistry.ts");

// Makes poll-interval waits resolve instantly so tests don't sleep.
function immediateTimeout(callback, _ms, ...args) {
  if (typeof callback === "function") callback(...args);
  return 0;
}

const CREATE_URL = "https://api.x.ai/v1/videos/generations";
const POLL_URL_PREFIX = "https://api.x.ai/v1/videos/";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("VIDEO_PROVIDERS exposes the xai grok-imagine-video entry", () => {
  assert.ok(VIDEO_PROVIDERS.xai, "xai video provider is registered");
  assert.equal(VIDEO_PROVIDERS.xai.format, "xai-video");
  assert.ok(
    VIDEO_PROVIDERS.xai.models.some((m) => m.id === "grok-imagine-video"),
    "grok-imagine-video is listed"
  );
});

test("handleVideoGeneration creates + polls an xAI Grok Imagine video job and returns mp4 URL", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  let createRequest;
  let pollRequestCount = 0;

  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);

    if (stringUrl === CREATE_URL) {
      createRequest = {
        url: stringUrl,
        headers: options.headers,
        body: JSON.parse(String(options.body || "{}")),
      };
      return jsonResponse({ request_id: "xai-req-1", status: "pending" });
    }

    if (stringUrl === `${POLL_URL_PREFIX}xai-req-1`) {
      pollRequestCount += 1;
      if (pollRequestCount === 1) {
        return jsonResponse({ request_id: "xai-req-1", status: "processing", progress: 40 });
      }
      return jsonResponse({
        request_id: "xai-req-1",
        status: "done",
        progress: 100,
        video: { url: "https://videos.x.ai/xai-req-1.mp4" },
      });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "xai/grok-imagine-video",
        prompt: "a cinematic tracking shot through a neon city at night",
        duration: 6,
      },
      credentials: { apiKey: "xai-key" },
      log: null,
    });

    // Create request shape
    assert.equal(createRequest.headers["Authorization"], "Bearer xai-key");
    assert.equal(createRequest.body.model, "grok-imagine-video");
    assert.equal(
      createRequest.body.prompt,
      "a cinematic tracking shot through a neon city at night"
    );
    assert.equal(createRequest.body.duration, 6);

    // Polled at least once past "processing" before terminal "done"
    assert.ok(pollRequestCount >= 2);

    // Response shape
    assert.equal(result.success, true);
    assert.equal(result.data.data[0].url, "https://videos.x.ai/xai-req-1.mp4");
    assert.equal(result.data.data[0].format, "mp4");
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleVideoGeneration rejects xAI video requests without credentials", async () => {
  const result = await handleVideoGeneration({
    body: { model: "xai/grok-imagine-video", prompt: "x" },
    credentials: null,
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.match(result.error, /xAI API key is required/);
});

test("handleVideoGeneration surfaces a 502 when xAI returns no request_id", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    jsonResponse({ error: { message: "Invalid API key" } }, 401);

  try {
    const result = await handleVideoGeneration({
      body: { model: "xai/grok-imagine-video", prompt: "x" },
      credentials: { apiKey: "bad-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.equal(result.error, "Invalid API key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleVideoGeneration returns 502 when the xAI job status is failed", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  globalThis.setTimeout = immediateTimeout;

  globalThis.fetch = async (url) => {
    const stringUrl = String(url);
    if (stringUrl === CREATE_URL) {
      return jsonResponse({ request_id: "xai-fail", status: "pending" });
    }
    if (stringUrl === `${POLL_URL_PREFIX}xai-fail`) {
      return jsonResponse({
        request_id: "xai-fail",
        status: "failed",
        error: "content policy violation",
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleVideoGeneration({
      body: { model: "xai/grok-imagine-video", prompt: "x" },
      credentials: { apiKey: "xai-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.equal(result.error, "content policy violation");
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleVideoGeneration returns 504 when the xAI job never completes", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const originalNow = Date.now;
  globalThis.setTimeout = immediateTimeout;

  let nowCalls = 0;
  Date.now = () => {
    nowCalls += 1;
    return nowCalls === 1 ? 1000 : nowCalls === 2 ? 2000 : 1_000_000;
  };

  globalThis.fetch = async (url) => {
    const stringUrl = String(url);
    if (stringUrl === CREATE_URL) {
      return jsonResponse({ request_id: "xai-stuck", status: "pending" });
    }
    if (stringUrl === `${POLL_URL_PREFIX}xai-stuck`) {
      return jsonResponse({ request_id: "xai-stuck", status: "processing", progress: 10 });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "xai/grok-imagine-video",
        prompt: "x",
        timeout_ms: 5000,
        poll_interval_ms: 100,
      },
      credentials: { apiKey: "xai-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 504);
    assert.match(result.error, /timed out/);
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
    Date.now = originalNow;
  }
});

test("handleVideoGeneration never leaks a stack trace in xAI video error responses", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    throw new Error("connect ECONNREFUSED 127.0.0.1:443\n    at TCPConnectWrap.afterConnect");
  };

  try {
    const result = await handleVideoGeneration({
      body: { model: "xai/grok-imagine-video", prompt: "x" },
      credentials: { apiKey: "xai-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.ok(!String(result.error).includes("at TCPConnectWrap"));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
