import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-video-dashscope-"));

const { handleVideoGeneration } = await import("../../open-sse/handlers/videoGeneration.ts");
const { VIDEO_PROVIDERS } = await import("../../open-sse/config/videoRegistry.ts");

// Makes poll-interval waits resolve instantly so tests don't sleep.
function immediateTimeout(callback, _ms, ...args) {
  if (typeof callback === "function") callback(...args);
  return 0;
}

const CREATE_URL =
  "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/video-generation/video-synthesis";
const POLL_URL_PREFIX = "https://dashscope-intl.aliyuncs.com/api/v1/tasks/";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("VIDEO_PROVIDERS exposes the alibaba dashscope-video entry", () => {
  assert.ok(VIDEO_PROVIDERS.alibaba, "alibaba video provider is registered");
  assert.equal(VIDEO_PROVIDERS.alibaba.format, "dashscope-video");
  assert.ok(
    VIDEO_PROVIDERS.alibaba.models.some((m) => m.id === "wan2.7-t2v"),
    "wan2.7-t2v is listed"
  );
});

test("handleVideoGeneration creates + polls a DashScope task and returns mp4 URL", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  let createRequest;

  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);

    if (stringUrl === CREATE_URL) {
      createRequest = {
        url: stringUrl,
        headers: options.headers,
        body: JSON.parse(String(options.body || "{}")),
      };
      return jsonResponse({
        output: { task_id: "ds-task-1", task_status: "PENDING" },
        request_id: "req-1",
      });
    }

    if (stringUrl.startsWith(POLL_URL_PREFIX)) {
      return jsonResponse({
        output: {
          task_status: "SUCCEEDED",
          video_url: "https://dashscope-cdn.example.com/wan-out.mp4",
        },
        request_id: "req-2",
        usage: { video_count: 1 },
      });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "alibaba/wan2.7-t2v",
        prompt: "a neon city in the rain",
        negative_prompt: "blurry",
        aspect_ratio: "16:9",
        duration: 5,
      },
      credentials: { apiKey: "dashscope-key" },
      log: null,
    });

    // Create request shape
    assert.equal(createRequest.headers["X-DashScope-Async"], "enable");
    assert.equal(createRequest.headers["Authorization"], "Bearer dashscope-key");
    assert.equal(createRequest.body.model, "wan2.7-t2v");
    assert.equal(createRequest.body.input.prompt, "a neon city in the rain");
    assert.equal(createRequest.body.input.negative_prompt, "blurry");
    // aspect_ratio "16:9" → DashScope size "1280*720"
    assert.equal(createRequest.body.parameters.size, "1280*720");
    assert.equal(createRequest.body.parameters.duration, 5);

    // Response shape
    assert.equal(result.success, true);
    assert.equal(result.data.data[0].url, "https://dashscope-cdn.example.com/wan-out.mp4");
    assert.equal(result.data.data[0].format, "mp4");
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleVideoGeneration rejects DashScope requests without credentials", async () => {
  const result = await handleVideoGeneration({
    body: { model: "alibaba/wan2.7-t2v", prompt: "x" },
    credentials: null,
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.match(result.error, /DashScope API key is required/);
});

test("handleVideoGeneration surfaces a 502 when DashScope returns no task_id", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => jsonResponse({ message: "Invalid API key", request_id: "x" }, 401);

  try {
    const result = await handleVideoGeneration({
      body: { model: "alibaba/wan2.7-t2v", prompt: "x" },
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

test("handleVideoGeneration returns 502 when the DashScope task FAILED", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  globalThis.setTimeout = immediateTimeout;

  globalThis.fetch = async (url) => {
    const stringUrl = String(url);
    if (stringUrl === CREATE_URL) {
      return jsonResponse({ output: { task_id: "ds-fail", task_status: "PENDING" } });
    }
    if (stringUrl.startsWith(POLL_URL_PREFIX)) {
      return jsonResponse({
        output: { task_status: "FAILED", message: "content policy violation" },
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleVideoGeneration({
      body: { model: "alibaba/wan2.7-t2v", prompt: "x" },
      credentials: { apiKey: "dashscope-key" },
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

test("handleVideoGeneration returns 504 when the DashScope task never completes", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const originalNow = Date.now;
  globalThis.setTimeout = immediateTimeout;

  // Deterministic clock: start at 1000, allow exactly one poll iteration, then
  // jump past the deadline so the while-loop exits on the next check.
  let nowCalls = 0;
  Date.now = () => {
    nowCalls += 1;
    return nowCalls === 1 ? 1000 : nowCalls === 2 ? 2000 : 1_000_000;
  };

  globalThis.fetch = async (url) => {
    const stringUrl = String(url);
    if (stringUrl === CREATE_URL) {
      return jsonResponse({ output: { task_id: "ds-stuck", task_status: "PENDING" } });
    }
    if (stringUrl.startsWith(POLL_URL_PREFIX)) {
      return jsonResponse({ output: { task_status: "RUNNING" } });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "alibaba/wan2.7-t2v",
        prompt: "x",
        timeout_ms: 5000,
        poll_interval_ms: 100,
      },
      credentials: { apiKey: "dashscope-key" },
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
