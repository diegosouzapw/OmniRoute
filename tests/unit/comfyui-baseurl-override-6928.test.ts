// Unit tests for #6928: expose an editable base-URL field on the ComfyUI
// provider connection + wire the per-connection override through the shared
// resolveComfyUiBaseUrl helper (used by image/video/music generation handlers).
import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-comfyui-baseurl-"));

import { resolveComfyUiBaseUrl } from "../../open-sse/utils/comfyuiClient.ts";
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { handleVideoGeneration } = await import("../../open-sse/handlers/videoGeneration.ts");
const { handleMusicGeneration } = await import("../../open-sse/handlers/musicGeneration.ts");

const FALLBACK = "http://localhost:8188";
const OVERRIDE = "http://comfyui:8188";

function immediateTimeout(callback, _ms, ...args) {
  if (typeof callback === "function") callback(...args);
  return 0;
}

function mockComfyFetch(promptId: string, seenUrls: string[]) {
  return async (url: string, options: { body?: unknown } = {}) => {
    const stringUrl = String(url);
    seenUrls.push(stringUrl);

    if (stringUrl.endsWith("/prompt")) {
      return new Response(JSON.stringify({ prompt_id: promptId }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (stringUrl.includes(`/history/${promptId}`)) {
      return new Response(
        JSON.stringify({
          [promptId]: {
            outputs: {
              1: { images: [{ filename: "out.png", subfolder: "", type: "output" }] },
            },
          },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    if (stringUrl.includes("/view?")) {
      return new Response(new Uint8Array([1, 2, 3]), { status: 200 });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };
}

test("handleImageGeneration uses the connection's providerSpecificData.baseUrl override for ComfyUI", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const seenUrls: string[] = [];
  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = mockComfyFetch("img-override", seenUrls);

  try {
    const result = await handleImageGeneration({
      body: { model: "comfyui/flux-dev", prompt: "override test" },
      credentials: { providerSpecificData: { baseUrl: OVERRIDE } },
      log: null,
    });

    assert.equal(result.success, true);
    assert.ok(
      seenUrls.every((u) => u.startsWith(OVERRIDE)),
      `expected all requests to use ${OVERRIDE}, got ${seenUrls.join(", ")}`
    );
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleImageGeneration falls back to localhost:8188 for ComfyUI when credentials is null (no regression)", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const seenUrls: string[] = [];
  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = mockComfyFetch("img-default", seenUrls);

  try {
    const result = await handleImageGeneration({
      body: { model: "comfyui/flux-dev", prompt: "default test" },
      credentials: null,
      log: null,
    });

    assert.equal(result.success, true);
    assert.ok(seenUrls.every((u) => u.startsWith(FALLBACK)));
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleVideoGeneration uses the connection's providerSpecificData.baseUrl override for ComfyUI", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const seenUrls: string[] = [];
  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = mockComfyFetch("vid-override", seenUrls);

  try {
    const result = await handleVideoGeneration({
      body: { model: "comfyui/animatediff", prompt: "override video" },
      credentials: { providerSpecificData: { baseUrl: OVERRIDE } },
      log: null,
    });

    assert.equal(result.success, true);
    assert.ok(seenUrls.every((u) => u.startsWith(OVERRIDE)));
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("handleMusicGeneration uses the connection's providerSpecificData.baseUrl override for ComfyUI", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const seenUrls: string[] = [];
  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = mockComfyFetch("music-override", seenUrls);

  try {
    const result = await handleMusicGeneration({
      body: { model: "comfyui/musicgen-medium", prompt: "override music" },
      credentials: { providerSpecificData: { baseUrl: OVERRIDE } },
      log: null,
    });

    assert.equal(result.success, true);
    assert.ok(seenUrls.every((u) => u.startsWith(OVERRIDE)));
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("resolveComfyUiBaseUrl returns the fallback for null credentials", () => {
  assert.equal(resolveComfyUiBaseUrl(null, FALLBACK), FALLBACK);
});

test("resolveComfyUiBaseUrl returns the fallback for undefined credentials", () => {
  assert.equal(resolveComfyUiBaseUrl(undefined, FALLBACK), FALLBACK);
});

test("resolveComfyUiBaseUrl returns the fallback when providerSpecificData is absent", () => {
  assert.equal(resolveComfyUiBaseUrl({}, FALLBACK), FALLBACK);
});

test("resolveComfyUiBaseUrl returns the fallback when providerSpecificData is null", () => {
  assert.equal(
    resolveComfyUiBaseUrl({ providerSpecificData: null }, FALLBACK),
    FALLBACK
  );
});

test("resolveComfyUiBaseUrl returns the fallback when baseUrl is absent", () => {
  assert.equal(
    resolveComfyUiBaseUrl({ providerSpecificData: {} }, FALLBACK),
    FALLBACK
  );
});

test("resolveComfyUiBaseUrl returns the fallback when baseUrl is not a string", () => {
  assert.equal(
    resolveComfyUiBaseUrl(
      { providerSpecificData: { baseUrl: 12345 as unknown as string } },
      FALLBACK
    ),
    FALLBACK
  );
});

test("resolveComfyUiBaseUrl returns the fallback when baseUrl is whitespace-only", () => {
  assert.equal(
    resolveComfyUiBaseUrl({ providerSpecificData: { baseUrl: "   " } }, FALLBACK),
    FALLBACK
  );
});

test("resolveComfyUiBaseUrl returns the trimmed override when set", () => {
  assert.equal(
    resolveComfyUiBaseUrl(
      { providerSpecificData: { baseUrl: "  http://comfyui:8188  " } },
      FALLBACK
    ),
    "http://comfyui:8188"
  );
});

test("resolveComfyUiBaseUrl accepts a bare Docker-network hostname override", () => {
  assert.equal(
    resolveComfyUiBaseUrl({ providerSpecificData: { baseUrl: "http://comfyui:8188" } }, FALLBACK),
    "http://comfyui:8188"
  );
});

test("resolveComfyUiBaseUrl ignores a top-level credentials.baseUrl (not providerSpecificData)", () => {
  const credentials = {
    baseUrl: "http://should-be-ignored:8188",
  } as { baseUrl: string; providerSpecificData?: { baseUrl?: unknown } | null };
  assert.equal(resolveComfyUiBaseUrl(credentials, FALLBACK), FALLBACK);
});
