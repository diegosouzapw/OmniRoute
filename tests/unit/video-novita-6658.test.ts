import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-video-novita-"));

const { handleVideoGeneration } = await import("../../open-sse/handlers/videoGeneration.ts");
const { VIDEO_PROVIDERS } = await import("../../open-sse/config/videoRegistry.ts");
const { VIDEO_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");
const {
  buildNovitaSubmitUrl,
  buildNovitaPollUrl,
  normalizeNovitaVideoParams,
  buildNovitaSubmitBody,
  parseNovitaTaskId,
  parseNovitaTaskResult,
} = await import("../../open-sse/handlers/videoGeneration/novita.ts");

// Makes poll-interval waits resolve instantly so tests don't sleep.
function immediateTimeout(callback, _ms, ...args) {
  if (typeof callback === "function") callback(...args);
  return 0;
}

const SUBMIT_URL = "https://api.novita.ai/v3/async/wan-t2v";
const POLL_URL_PREFIX = "https://api.novita.ai/v3/async/task-result?task_id=";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

// --- Registry shape -------------------------------------------------------

test("VIDEO_PROVIDERS exposes the novita novita-video entry", () => {
  assert.ok(VIDEO_PROVIDERS.novita, "novita video provider is registered");
  assert.equal(VIDEO_PROVIDERS.novita.format, "novita-video");
  assert.equal(VIDEO_PROVIDERS.novita.authType, "apikey");
  assert.equal(VIDEO_PROVIDERS.novita.authHeader, "bearer");
  assert.equal(VIDEO_PROVIDERS.novita.baseUrl, "https://api.novita.ai/v3/async");
  assert.equal(VIDEO_PROVIDERS.novita.statusUrl, "https://api.novita.ai/v3/async/task-result");
  assert.ok(
    VIDEO_PROVIDERS.novita.models.some((m) => m.id === "wan-t2v"),
    "wan-t2v is listed"
  );
  assert.ok(
    VIDEO_PROVIDERS.novita.models.some((m) => m.id === "kling-v1.6-t2v"),
    "kling-v1.6-t2v is listed"
  );
});

test("VIDEO_PROVIDER_IDS (docs/A2A discovery tag set) includes novita", () => {
  assert.ok(VIDEO_PROVIDER_IDS.has("novita"), "novita should be tagged as a video provider");
});

// --- Pure helpers -----------------------------------------------------------

test("buildNovitaSubmitUrl joins baseUrl and model slug", () => {
  assert.equal(
    buildNovitaSubmitUrl("https://api.novita.ai/v3/async", "wan-t2v"),
    "https://api.novita.ai/v3/async/wan-t2v"
  );
  assert.equal(
    buildNovitaSubmitUrl("https://api.novita.ai/v3/async/", "kling-v1.6-t2v"),
    "https://api.novita.ai/v3/async/kling-v1.6-t2v"
  );
});

test("buildNovitaPollUrl appends the task_id query param", () => {
  assert.equal(
    buildNovitaPollUrl("https://api.novita.ai/v3/async/task-result", "abc 123"),
    "https://api.novita.ai/v3/async/task-result?task_id=abc%20123"
  );
});

test("normalizeNovitaVideoParams parses prompt/negative_prompt/duration/size", () => {
  const params = normalizeNovitaVideoParams({
    prompt: "a cat surfing",
    negative_prompt: "blurry",
    duration: 5,
    size: "832x480",
  });
  assert.equal(params.prompt, "a cat surfing");
  assert.equal(params.negativePrompt, "blurry");
  assert.equal(params.duration, 5);
  assert.equal(params.width, 832);
  assert.equal(params.height, 480);
});

test("normalizeNovitaVideoParams tolerates missing/invalid fields", () => {
  const params = normalizeNovitaVideoParams(null);
  assert.equal(params.prompt, "");
  assert.equal(params.negativePrompt, undefined);
  assert.equal(params.duration, undefined);
  assert.equal(params.width, undefined);

  const negativeDuration = normalizeNovitaVideoParams({ prompt: "x", duration: -5 });
  assert.equal(negativeDuration.duration, undefined);
});

test("buildNovitaSubmitBody omits unset optional fields", () => {
  assert.deepEqual(buildNovitaSubmitBody({ prompt: "hello" }), { prompt: "hello" });
  assert.deepEqual(
    buildNovitaSubmitBody({ prompt: "hello", negativePrompt: "bad", duration: 5, width: 832, height: 480 }),
    { prompt: "hello", negative_prompt: "bad", duration: 5, width: 832, height: 480 }
  );
});

test("parseNovitaTaskId extracts task_id and rejects malformed payloads", () => {
  assert.equal(parseNovitaTaskId({ task_id: "abc" }), "abc");
  assert.equal(parseNovitaTaskId({}), null);
  assert.equal(parseNovitaTaskId(null), null);
  assert.equal(parseNovitaTaskId({ task_id: 123 }), null);
});

test("parseNovitaTaskResult: queued/processing → not done", () => {
  const result = parseNovitaTaskResult({ task: { status: "TASK_STATUS_QUEUED" } });
  assert.equal(result.done, false);
  assert.equal(result.status, "TASK_STATUS_QUEUED");
});

test("parseNovitaTaskResult: succeeded with video_url → done + videoUrl", () => {
  const result = parseNovitaTaskResult({
    task: { status: "TASK_STATUS_SUCCEED" },
    videos: [{ video_url: "https://cdn.novita.ai/out.mp4", video_type: "mp4" }],
  });
  assert.equal(result.done, true);
  assert.equal(result.videoUrl, "https://cdn.novita.ai/out.mp4");
});

test("parseNovitaTaskResult: succeeded without videos → done + error", () => {
  const result = parseNovitaTaskResult({ task: { status: "TASK_STATUS_SUCCEED" }, videos: [] });
  assert.equal(result.done, true);
  assert.equal(result.videoUrl, undefined);
  assert.match(result.errorMessage, /no video_url/);
});

test("parseNovitaTaskResult: failed → done + reason surfaced", () => {
  const result = parseNovitaTaskResult({
    task: { status: "TASK_STATUS_FAILED", reason: "content policy violation" },
  });
  assert.equal(result.done, true);
  assert.equal(result.errorMessage, "content policy violation");
});

test("parseNovitaTaskResult: malformed payload does not crash", () => {
  assert.deepEqual(parseNovitaTaskResult(null), { done: false, status: "UNKNOWN" });
  assert.deepEqual(parseNovitaTaskResult("garbage"), { done: false, status: "UNKNOWN" });
});

// --- Full handler wiring (submit → poll → mp4) ------------------------------

test("handleVideoGeneration submits + polls a Novita task and returns mp4 URL", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  let submitRequest;

  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);

    if (stringUrl === SUBMIT_URL) {
      submitRequest = {
        url: stringUrl,
        headers: options.headers,
        body: JSON.parse(String(options.body || "{}")),
      };
      return jsonResponse({ task_id: "novita-task-1" });
    }

    if (stringUrl.startsWith(POLL_URL_PREFIX)) {
      return jsonResponse({
        task: { task_id: "novita-task-1", status: "TASK_STATUS_SUCCEED", progress_percent: 100 },
        videos: [{ video_url: "https://cdn.novita.ai/wan-out.mp4", video_type: "mp4" }],
      });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "novita/wan-t2v",
        prompt: "a neon city in the rain",
        negative_prompt: "blurry",
        duration: 5,
      },
      credentials: { apiKey: "novita-key" },
      log: null,
    });

    assert.equal(submitRequest.headers["Authorization"], "Bearer novita-key");
    assert.equal(submitRequest.body.prompt, "a neon city in the rain");
    assert.equal(submitRequest.body.negative_prompt, "blurry");
    assert.equal(submitRequest.body.duration, 5);

    assert.equal(result.success, true);
    assert.equal(result.data.data[0].url, "https://cdn.novita.ai/wan-out.mp4");
    assert.equal(result.data.data[0].format, "mp4");
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleVideoGeneration rejects Novita requests without credentials", async () => {
  const result = await handleVideoGeneration({
    body: { model: "novita/wan-t2v", prompt: "x" },
    credentials: null,
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.match(result.error, /Novita AI API key is required/);
});

test("handleVideoGeneration surfaces an error when Novita returns no task_id", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => jsonResponse({ message: "Invalid API key" }, 401);

  try {
    const result = await handleVideoGeneration({
      body: { model: "novita/wan-t2v", prompt: "x" },
      credentials: { apiKey: "bad-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 401);
    assert.equal(result.error, "Invalid API key");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleVideoGeneration returns 502 when the Novita task FAILED", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  globalThis.setTimeout = immediateTimeout;

  globalThis.fetch = async (url) => {
    const stringUrl = String(url);
    if (stringUrl === SUBMIT_URL) {
      return jsonResponse({ task_id: "novita-fail" });
    }
    if (stringUrl.startsWith(POLL_URL_PREFIX)) {
      return jsonResponse({
        task: { status: "TASK_STATUS_FAILED", reason: "content policy violation" },
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleVideoGeneration({
      body: { model: "novita/wan-t2v", prompt: "x" },
      credentials: { apiKey: "novita-key" },
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

test("handleVideoGeneration returns 504 when the Novita task never completes", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const originalNow = Date.now;
  globalThis.setTimeout = immediateTimeout;

  let nowCalls = 0;
  Date.now = () => {
    nowCalls += 1;
    return nowCalls <= 2 ? 1000 : 1_000_000;
  };

  globalThis.fetch = async (url) => {
    const stringUrl = String(url);
    if (stringUrl === SUBMIT_URL) {
      return jsonResponse({ task_id: "novita-stuck" });
    }
    if (stringUrl.startsWith(POLL_URL_PREFIX)) {
      return jsonResponse({ task: { status: "TASK_STATUS_QUEUED" } });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "novita/wan-t2v",
        prompt: "x",
        timeout_ms: 5000,
        poll_interval_ms: 100,
      },
      credentials: { apiKey: "novita-key" },
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
