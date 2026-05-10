import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-music-"));

const { handleMusicGeneration } = await import("../../open-sse/handlers/musicGeneration.ts");
const { MUSIC_PROVIDERS } = await import("../../open-sse/config/musicRegistry.ts");

function immediateTimeout(callback, _ms, ...args) {
  if (typeof callback === "function") callback(...args);
  return 0;
}

test("handleMusicGeneration rejects invalid model strings", async () => {
  const result = await handleMusicGeneration({
    body: { model: "invalid-music-model", prompt: "x" },
    credentials: null,
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /Invalid music model/);
});

test("handleMusicGeneration treats unknown provider prefixes as invalid music models", async () => {
  const result = await handleMusicGeneration({
    body: { model: "mystery/model-1", prompt: "x" },
    credentials: null,
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /Invalid music model: mystery\/model-1/);
});

test("handleMusicGeneration executes ComfyUI audio workflow and normalizes wav output", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  let promptBody;

  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);

    if (stringUrl === "http://localhost:8188/prompt") {
      promptBody = JSON.parse(String(options.body || "{}"));
      return new Response(JSON.stringify({ prompt_id: "music-1" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (stringUrl === "http://localhost:8188/history/music-1") {
      return new Response(
        JSON.stringify({
          "music-1": {
            outputs: {
              7: {
                audio: [{ filename: "track.wav", subfolder: "out", type: "output" }],
              },
            },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    if (stringUrl.includes("/view?")) {
      return new Response(new Uint8Array([5, 6, 7]), { status: 200 });
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleMusicGeneration({
      body: {
        model: "comfyui/musicgen-medium",
        prompt: "ambient synth",
        negative_prompt: "distortion",
        duration: 18,
        steps: 55,
        cfg_scale: 9,
      },
      credentials: null,
      log: null,
    });

    assert.equal(promptBody.prompt["4"].inputs.seconds, 18);
    assert.equal(promptBody.prompt["5"].inputs.steps, 55);
    assert.equal(promptBody.prompt["5"].inputs.cfg, 9);
    assert.equal(promptBody.prompt["2"].inputs.text, "ambient synth");
    assert.equal(promptBody.prompt["3"].inputs.text, "distortion");
    assert.equal(result.success, true);
    assert.deepEqual(result.data.data, [{ b64_json: "BQYH", format: "wav" }]);
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleMusicGeneration polls KIE music tasks and returns audio URLs", async () => {
  const originalFetch = globalThis.fetch;
  let createBody;
  let pollUrl = "";

  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);

    if (stringUrl === "https://api.kie.ai/api/v1/generate") {
      createBody = JSON.parse(String(options.body || "{}"));
      return new Response(JSON.stringify({ code: 200, data: { taskId: "kie-music-task" } }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (stringUrl.startsWith("https://api.kie.ai/api/v1/generate/record-info")) {
      pollUrl = stringUrl;
      return new Response(
        JSON.stringify({
          code: 200,
          data: {
            status: "SUCCESS",
            response: {
              sunoData: [{ audioUrl: "https://example.com/kie-music.mp3" }],
            },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }

    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleMusicGeneration({
      body: {
        model: "kie/V4",
        prompt: "relaxing piano ambience",
      },
      credentials: { apiKey: "kie-key" },
      log: null,
    });

    assert.equal(createBody.model, "V4");
    assert.equal(createBody.customMode, false);
    assert.equal(createBody.instrumental, true);
    assert.equal(createBody.prompt, "relaxing piano ambience");
    assert.match(pollUrl, /taskId=kie-music-task/);
    assert.equal(result.success, true);
    assert.equal(result.data.data[0].url, "https://example.com/kie-music.mp3");
    assert.equal(result.data.data[0].format, "mp3");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleMusicGeneration rejects unsupported provider formats", async () => {
  const originalProvider = MUSIC_PROVIDERS.fakeprovider;

  MUSIC_PROVIDERS.fakeprovider = {
    id: "fakeprovider",
    baseUrl: "http://localhost:9999",
    authType: "none",
    authHeader: "none",
    format: "custom",
    models: [{ id: "broken-model", name: "Broken Model" }],
  };

  try {
    const result = await handleMusicGeneration({
      body: { model: "fakeprovider/broken-model", prompt: "x" },
      credentials: null,
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 400);
    assert.match(result.error, /Unsupported music format: custom/);
  } finally {
    if (originalProvider) {
      MUSIC_PROVIDERS.fakeprovider = originalProvider;
    } else {
      delete MUSIC_PROVIDERS.fakeprovider;
    }
  }
});

test("handleMusicGeneration returns unknown provider when registry lookup disappears after parsing", async () => {
  Object.defineProperty(MUSIC_PROVIDERS, "flakyprovider", {
    configurable: true,
    enumerable: true,
    get() {
      delete MUSIC_PROVIDERS.flakyprovider;
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

  const result = await handleMusicGeneration({
    body: { model: "flakyprovider/ghost-model", prompt: "x" },
    credentials: null,
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /Unknown music provider: flakyprovider/);
});

test("handleMusicGeneration returns provider errors for ComfyUI failures and logs defaults", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const logEntries = [];
  let promptBody;

  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);

    if (stringUrl === "http://localhost:8188/prompt") {
      promptBody = JSON.parse(String(options.body || "{}"));
      return new Response(JSON.stringify({ prompt_id: "music-fail" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    if (stringUrl === "http://localhost:8188/history/music-fail") {
      return new Response(
        JSON.stringify({
          "music-fail": {
            outputs: {
              7: {
                audio: [{ filename: "broken.wav", subfolder: "out", type: "output" }],
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
    const result = await handleMusicGeneration({
      body: {
        model: "comfyui/musicgen-medium",
        prompt: "slow piano",
      },
      credentials: null,
      log: {
        info: (...args) => logEntries.push(["info", ...args]),
        error: (...args) => logEntries.push(["error", ...args]),
      },
    });

    assert.equal(promptBody.prompt["4"].inputs.seconds, 10);
    assert.equal(promptBody.prompt["5"].inputs.steps, 100);
    assert.equal(promptBody.prompt["5"].inputs.cfg, 7);
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
