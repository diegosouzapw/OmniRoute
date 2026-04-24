import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-video-"));

const { handleVideoGeneration } = await import("../../open-sse/handlers/videoGeneration.ts");
const { VIDEO_PROVIDERS } = await import("../../open-sse/config/videoRegistry.ts");

function immediateTimeout(callback, _ms, ...args) {
  if (typeof callback === "function") callback(...args);
  return 0;
}

test("handleVideoGeneration rejects invalid model strings", async () => {
  const result = await handleVideoGeneration({
    body: { model: "invalid-video-model", prompt: "x" },
    credentials: null,
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /Invalid video model/);
});

test("handleVideoGeneration treats unknown provider prefixes as invalid video models", async () => {
  const result = await handleVideoGeneration({
    body: { model: "mystery/model-1", prompt: "x" },
    credentials: null,
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /Invalid video model: mystery\/model-1/);
});

test("handleVideoGeneration routes SD WebUI payloads and normalizes mp4 output", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      body: JSON.parse(String(options.body || "{}")),
    };

    return new Response(
      JSON.stringify({
        video: "bXA0LWJhc2U2NA==",
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "sdwebui/animatediff-webui",
        prompt: "ocean wave",
        negative_prompt: "low quality",
        size: "640x360",
        steps: 30,
        cfg_scale: 8,
        frames: 24,
        fps: 12,
      },
      credentials: null,
      log: null,
    });

    assert.equal(captured.url, "http://localhost:7860/animatediff/v1/generate");
    assert.deepEqual(captured.body, {
      prompt: "ocean wave",
      negative_prompt: "low quality",
      width: 640,
      height: 360,
      steps: 30,
      cfg_scale: 8,
      frames: 24,
      fps: 12,
    });
    assert.equal(result.success, true);
    assert.deepEqual(result.data.data, [{ b64_json: "bXA0LWJhc2U2NA==", format: "mp4" }]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleVideoGeneration executes ComfyUI workflow and returns fetched output files", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  let promptBody;

  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);

    if (stringUrl === "http://localhost:8188/prompt") {
      promptBody = JSON.parse(String(options.body || "{}"));
      return new Response(JSON.stringify({ prompt_id: "video-1" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (stringUrl === "http://localhost:8188/history/video-1") {
      return new Response(
        JSON.stringify({
          "video-1": {
            outputs: {
              7: {
                gifs: [{ filename: "clip.webp", subfolder: "out", type: "output" }],
              },
            },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    if (stringUrl.includes("/view?")) {
      return new Response(new Uint8Array([1, 2, 3, 4]), { status: 200 });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "comfyui/animatediff",
        prompt: "neon car",
        size: "720x480",
        frames: 20,
        fps: 10,
        steps: 12,
        cfg_scale: 6,
      },
      credentials: null,
      log: null,
    });

    assert.equal(
      promptBody.prompt["4"].inputs.width,
      720,
      "workflow should use parsed width for latent image"
    );
    assert.equal(promptBody.prompt["4"].inputs.height, 480);
    assert.equal(promptBody.prompt["4"].inputs.batch_size, 20);
    assert.equal(promptBody.prompt["7"].inputs.fps, 10);
    assert.equal(result.success, true);
    assert.deepEqual(result.data.data, [{ b64_json: "AQIDBA==", format: "webp" }]);
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleVideoGeneration returns unknown provider when registry lookup disappears after parsing", async () => {
  Object.defineProperty(VIDEO_PROVIDERS, "flakyprovider", {
    configurable: true,
    enumerable: true,
    get() {
      delete VIDEO_PROVIDERS.flakyprovider;
      return {
        id: "flakyprovider",
        baseUrl: "http://localhost:9999",
        authType: "none",
        authHeader: "none",
        format: "comfyui",
        models: [{ id: "ghost-model", name: "Ghost Model" }],
      };
    },
  });

  const result = await handleVideoGeneration({
    body: { model: "flakyprovider/ghost-model", prompt: "x" },
    credentials: null,
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /Unknown video provider: flakyprovider/);
});

test("handleVideoGeneration rejects unsupported provider formats", async () => {
  const originalProvider = VIDEO_PROVIDERS.fakeprovider;

  VIDEO_PROVIDERS.fakeprovider = {
    id: "fakeprovider",
    baseUrl: "http://localhost:9999",
    authType: "none",
    authHeader: "none",
    format: "custom-video",
    models: [{ id: "broken-model", name: "Broken Model" }],
  };

  try {
    const result = await handleVideoGeneration({
      body: { model: "fakeprovider/broken-model", prompt: "x" },
      credentials: null,
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 400);
    assert.match(result.error, /Unsupported video format: custom-video/);
  } finally {
    if (originalProvider) {
      VIDEO_PROVIDERS.fakeprovider = originalProvider;
    } else {
      delete VIDEO_PROVIDERS.fakeprovider;
    }
  }
});

test("handleVideoGeneration normalizes SD WebUI image arrays and applies default dimensions", async () => {
  const originalFetch = globalThis.fetch;
  const logEntries = [];
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      body: JSON.parse(String(options.body || "{}")),
    };

    return new Response(
      JSON.stringify({
        images: ["ZnJhbWUtMQ==", { image: "ZnJhbWUtMg==" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "sdwebui/animatediff-webui",
        prompt: "forest path",
      },
      credentials: null,
      log: {
        info: (...args) => logEntries.push(["info", ...args]),
        error: (...args) => logEntries.push(["error", ...args]),
      },
    });

    assert.equal(captured.url, "http://localhost:7860/animatediff/v1/generate");
    assert.deepEqual(captured.body, {
      prompt: "forest path",
      negative_prompt: "",
      width: 512,
      height: 512,
      steps: 20,
      cfg_scale: 7,
      frames: 16,
      fps: 8,
    });
    assert.equal(result.success, true);
    assert.deepEqual(result.data.data, [
      { b64_json: "ZnJhbWUtMQ==", format: "mp4" },
      { b64_json: "ZnJhbWUtMg==", format: "mp4" },
    ]);
    assert.equal(logEntries[0][0], "info");
    assert.match(logEntries[0][2], /sdwebui\/animatediff-webui \(sdwebui\)/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleVideoGeneration returns SD WebUI upstream errors and logs them", async () => {
  const originalFetch = globalThis.fetch;
  const logEntries = [];

  globalThis.fetch = async () => new Response("provider busy", { status: 503 });

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "sdwebui/animatediff-webui",
        prompt: "storm",
      },
      credentials: null,
      log: {
        info: (...args) => logEntries.push(["info", ...args]),
        error: (...args) => logEntries.push(["error", ...args]),
      },
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 503);
    assert.equal(result.error, "provider busy");
    assert.deepEqual(
      logEntries.map((entry) => entry[0]),
      ["info", "error"]
    );
    assert.match(logEntries[1][2], /provider busy/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleVideoGeneration returns provider errors for ComfyUI failures and logs defaults", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const logEntries = [];
  let promptBody;

  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);

    if (stringUrl === "http://localhost:8188/prompt") {
      promptBody = JSON.parse(String(options.body || "{}"));
      return new Response(JSON.stringify({ prompt_id: "video-fail" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (stringUrl === "http://localhost:8188/history/video-fail") {
      return new Response(
        JSON.stringify({
          "video-fail": {
            outputs: {
              7: {
                gifs: [{ filename: "broken.webp", subfolder: "out", type: "output" }],
              },
            },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    if (stringUrl.includes("/view?")) {
      return new Response("missing output", { status: 500 });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "comfyui/animatediff",
        prompt: "night drive",
      },
      credentials: null,
      log: {
        info: (...args) => logEntries.push(["info", ...args]),
        error: (...args) => logEntries.push(["error", ...args]),
      },
    });

    assert.equal(promptBody.prompt["4"].inputs.width, 512);
    assert.equal(promptBody.prompt["4"].inputs.height, 512);
    assert.equal(promptBody.prompt["4"].inputs.batch_size, 16);
    assert.equal(promptBody.prompt["7"].inputs.fps, 8);
    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.match(result.error, /ComfyUI fetch output failed \(500\)/);
    assert.deepEqual(
      logEntries.map((entry) => entry[0]),
      ["info", "error"]
    );
    assert.match(logEntries[1][2], /comfyui error/i);
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleVideoGeneration submits, polls and downloads Runway text-to-video tasks", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const seen = [];
  let pollCount = 0;

  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);
    seen.push({ url: target, init });

    if (target === "https://api.dev.runwayml.com/v1/text_to_video") {
      const headers = init.headers as Record<string, string>;
      const body = JSON.parse(String(init.body || "{}"));
      assert.equal(headers.Authorization, "Bearer runway-key");
      assert.equal(headers["X-Runway-Version"], "2024-11-06");
      assert.equal(body.model, "gen4.5");
      assert.equal(body.promptText, "cinematic sunrise");
      assert.equal(body.ratio, "1280:720");
      assert.equal(body.duration, 6);
      return new Response(JSON.stringify({ id: "task-runway-1" }), { status: 200 });
    }

    if (target === "https://api.dev.runwayml.com/v1/tasks/task-runway-1") {
      pollCount += 1;
      if (pollCount === 1) {
        return new Response(JSON.stringify({ id: "task-runway-1", status: "RUNNING" }), {
          status: 200,
        });
      }
      return new Response(
        JSON.stringify({
          id: "task-runway-1",
          status: "SUCCEEDED",
          output: ["https://cdn.runway.dev/output-1.mp4"],
        }),
        { status: 200 }
      );
    }

    if (target === "https://cdn.runway.dev/output-1.mp4") {
      return new Response(new Uint8Array([9, 8, 7, 6]), { status: 200 });
    }

    throw new Error(`Unexpected URL: ${target}`);
  };

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "runwayml/gen4.5",
        prompt: "cinematic sunrise",
        size: "1280x720",
        duration: 6,
      },
      credentials: { apiKey: "runway-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.deepEqual(result.data.data, [{ b64_json: "CQgHBg==", format: "mp4" }]);
    assert.deepEqual(
      seen.map((entry) => entry.url),
      [
        "https://api.dev.runwayml.com/v1/text_to_video",
        "https://api.dev.runwayml.com/v1/tasks/task-runway-1",
        "https://api.dev.runwayml.com/v1/tasks/task-runway-1",
        "https://cdn.runway.dev/output-1.mp4",
      ]
    );
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleVideoGeneration routes Runway image-to-video requests and can return output URLs", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  let submittedBody;

  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url, init = {}) => {
    const target = String(url);

    if (target === "https://api.dev.runwayml.com/v1/image_to_video") {
      submittedBody = JSON.parse(String(init.body || "{}"));
      return new Response(JSON.stringify({ id: "task-runway-2" }), { status: 200 });
    }

    if (target === "https://api.dev.runwayml.com/v1/tasks/task-runway-2") {
      return new Response(
        JSON.stringify({
          id: "task-runway-2",
          status: "SUCCEEDED",
          output: ["https://cdn.runway.dev/output-2.mp4"],
        }),
        { status: 200 }
      );
    }

    throw new Error(`Unexpected URL: ${target}`);
  };

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "runwayml/gen4_turbo",
        prompt: "make the frame move",
        prompt_image: "https://assets.example.com/frame.png",
        response_format: "url",
        size: "720x1280",
      },
      credentials: { apiKey: "runway-key" },
      log: null,
    });

    assert.deepEqual(submittedBody, {
      model: "gen4_turbo",
      promptText: "make the frame move",
      ratio: "720:1280",
      duration: 5,
      promptImage: "https://assets.example.com/frame.png",
    });
    assert.equal(result.success, true);
    assert.deepEqual(result.data.data, [
      { url: "https://cdn.runway.dev/output-2.mp4", format: "mp4" },
    ]);
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleVideoGeneration rejects Runway models that require promptImage", async () => {
  const result = await handleVideoGeneration({
    body: {
      model: "runwayml/gen4_turbo",
      prompt: "animate this",
    },
    credentials: { apiKey: "runway-key" },
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /requires promptImage/i);
});
