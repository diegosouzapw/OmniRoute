import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolated DATA_DIR before any module that may open the SQLite singleton.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-media-cost-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "media-cost-test-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const { OMNIROUTE_RESPONSE_HEADERS } = await import("../../src/shared/constants/headers.ts");
const imageRoute = await import("../../src/app/api/v1/images/generations/route.ts");
const videoRoute = await import("../../src/app/api/v1/videos/generations/route.ts");
const musicRoute = await import("../../src/app/api/v1/music/generations/route.ts");

const originalFetch = globalThis.fetch;
const originalSetTimeout = globalThis.setTimeout;

// Skip the ComfyUI polling delays — invoke the callback synchronously.
function immediateTimeout(callback: (...a: unknown[]) => void, _ms?: number, ...args: unknown[]) {
  if (typeof callback === "function") callback(...args);
  return 0 as unknown as ReturnType<typeof setTimeout>;
}

function restoreGlobals() {
  globalThis.fetch = originalFetch;
  globalThis.setTimeout = originalSetTimeout;
}

test.afterEach(() => {
  restoreGlobals();
});

test.after(() => {
  restoreGlobals();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// Shared assertions: every successful media Response must carry the
// X-OmniRoute-* cost telemetry headers (parity with chat/embeddings).
function assertCostTelemetryHeaders(response: Response) {
  assert.equal(response.status, 200);

  const cost = response.headers.get(OMNIROUTE_RESPONSE_HEADERS.responseCost);
  assert.ok(cost, "response cost header must be present");
  assert.match(
    cost as string,
    /^\d+\.\d{10}$/,
    `cost header must be a fixed-10-decimal number, got: ${cost}`
  );

  const version = response.headers.get(OMNIROUTE_RESPONSE_HEADERS.version);
  assert.ok(version && version.trim().length > 0, "version header must be non-empty");

  const provider = response.headers.get(OMNIROUTE_RESPONSE_HEADERS.provider);
  assert.ok(provider && provider.trim().length > 0, "provider header must be present");
}

test("v1 images generation success Response carries cost telemetry headers", async () => {
  globalThis.fetch = (async (url: unknown) => {
    const stringUrl = String(url);
    if (stringUrl === "http://localhost:7860/sdapi/v1/txt2img") {
      return new Response(JSON.stringify({ images: ["YmFzZTY0LWltYWdl"] }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  }) as typeof fetch;

  const response = await imageRoute.POST(
    new Request("http://localhost/api/v1/images/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "sdwebui/stable-diffusion-v1-5",
        prompt: "telemetry image",
      }),
    })
  );

  assertCostTelemetryHeaders(response);
  const body = (await response.json()) as { data?: unknown[] };
  assert.ok(Array.isArray(body.data) && body.data.length >= 1, "should return image data");
});

test("v1 videos generation success Response carries cost telemetry headers", async () => {
  globalThis.setTimeout = immediateTimeout as typeof setTimeout;
  globalThis.fetch = (async (url: unknown) => {
    const stringUrl = String(url);
    if (stringUrl === "http://localhost:8188/prompt") {
      return new Response(JSON.stringify({ prompt_id: "video-cost-1" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (stringUrl === "http://localhost:8188/history/video-cost-1") {
      return new Response(
        JSON.stringify({
          "video-cost-1": {
            outputs: { 7: { gifs: [{ filename: "clip.webp", subfolder: "out", type: "output" }] } },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    if (stringUrl.includes("/view?")) {
      return new Response(new Uint8Array([1, 2, 3, 4]), { status: 200 });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  }) as typeof fetch;

  const response = await videoRoute.POST(
    new Request("http://localhost/api/v1/videos/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "comfyui/animatediff",
        prompt: "telemetry video",
        duration: 6,
      }),
    })
  );

  assertCostTelemetryHeaders(response);
});

test("v1 music generation success Response carries cost telemetry headers", async () => {
  globalThis.setTimeout = immediateTimeout as typeof setTimeout;
  globalThis.fetch = (async (url: unknown) => {
    const stringUrl = String(url);
    if (stringUrl === "http://localhost:8188/prompt") {
      return new Response(JSON.stringify({ prompt_id: "music-cost-1" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (stringUrl === "http://localhost:8188/history/music-cost-1") {
      return new Response(
        JSON.stringify({
          "music-cost-1": {
            outputs: { 7: { audio: [{ filename: "track.wav", subfolder: "out", type: "output" }] } },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    if (stringUrl.includes("/view?")) {
      return new Response(new Uint8Array([5, 6, 7]), { status: 200 });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  }) as typeof fetch;

  const response = await musicRoute.POST(
    new Request("http://localhost/api/v1/music/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "comfyui/musicgen-medium",
        prompt: "telemetry music",
        duration: 18,
      }),
    })
  );

  assertCostTelemetryHeaders(response);
});
