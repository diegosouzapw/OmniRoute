import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-images-"));

const core = await import("../../src/lib/db/core.ts");
const { handleImageGeneration, handleOpenAIImageEdit } =
  await import("../../open-sse/handlers/imageGeneration.ts");
const { getCallLogs, getCallLogById, waitForCallLogSaves } =
  await import("../../src/lib/usage/callLogs.ts");

test.after(() => {
  core.resetDbInstance();
});

// omni-code-review 2026-09-21_release-v3.8.51_vs_main_e2e-areas LEDGER-12 — `hasUsableImage`
// (fetchImageEndpoint): a 2xx whose items carry no usable `b64_json`/`url` must surface as a
// retryable 502 so image combos fall back, on both the generation and the edit path.
function mockOpenAICompatibleUpstream(payload: unknown) {
  return async () =>
    new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
}

const usableImageRequest = {
  body: { model: "custom-provider/super-image", prompt: "retro poster" },
  credentials: {
    apiKey: "custom-key",
    baseUrl: "https://custom.example.com/v1/images/generations",
  },
  resolvedProvider: "custom-provider",
  log: null,
};

test("handleImageGeneration treats a 200 whose only item has a blank url as a retryable 502", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = mockOpenAICompatibleUpstream({ data: [{ url: "" }] });
  try {
    const result = await handleImageGeneration(usableImageRequest);
    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.match(String(result.error), /without an image payload/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration treats a 200 whose only item is not an object as a retryable 502", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = mockOpenAICompatibleUpstream({ data: ["https://cdn.example.com/x.png"] });
  try {
    const result = await handleImageGeneration(usableImageRequest);
    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    // LEDGER-66 (same run): pin the message so this case proves `isJsonObject(item)` rejected
    // the item rather than any 502 the outer catch would also produce.
    assert.match(String(result.error), /without an image payload/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleImageGeneration keeps a well-formed 200 image payload as success", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = mockOpenAICompatibleUpstream({
    created: 123,
    data: [{ url: "" }, { b64_json: "ZmFrZQ==" }],
  });
  try {
    const result = await handleImageGeneration(usableImageRequest);
    assert.equal(result.success, true);
    assert.equal(result.status, undefined);
    assert.deepEqual(result.data, { created: 123, data: [{ url: "" }, { b64_json: "ZmFrZQ==" }] });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleOpenAIImageEdit applies the same usable-image gate to the edit path", async () => {
  const originalFetch = globalThis.fetch;
  const editRequest = {
    model: "super-image",
    provider: "custom-provider",
    credentials: {
      apiKey: "custom-key",
      providerSpecificData: { baseUrl: "https://custom.example.com/v1" },
    },
    prompt: "make it blue",
    imageBytes: Buffer.from([0x89, 0x50, 0x4e, 0x47]),
    imageMime: "image/png",
    log: null,
  };
  try {
    globalThis.fetch = mockOpenAICompatibleUpstream({ data: [{ b64_json: "" }] });
    const blank = await handleOpenAIImageEdit(editRequest);
    assert.equal(blank.success, false);
    assert.equal(blank.status, 502);
    assert.match(String(blank.error), /without an image payload/);

    globalThis.fetch = mockOpenAICompatibleUpstream({ data: [{ b64_json: "ZmFrZQ==" }] });
    const ok = await handleOpenAIImageEdit(editRequest);
    assert.equal(ok.success, true);
    assert.deepEqual(ok.data.data, [{ b64_json: "ZmFrZQ==" }]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// omni-code-review 2026-09-21_release-v3.8.51_vs_main_e2e-areas LEDGER-6 (+ round-2
// LEDGER-47/48/54/58/59/60) — `image_size` is forwarded to Antigravity's
// `imageConfig.imageSize` only when the caller supplied it; an unrecognised string is clamped
// to "1K" WITH a warn line, everything else leaves the key out so the upstream default
// applies. The persisted call-log request summary must record BOTH what the caller sent
// (`image_size`, raw or null) and what went upstream (`image_size_applied`, or "default").
const ANTIGRAVITY_IMAGE_MODEL = "antigravity/gemini-3.1-flash-image-preview";
let antigravityPromptSeq = 0;

async function captureAntigravityImageRequest(extraBody: Record<string, unknown>) {
  const originalFetch = globalThis.fetch;
  const prompt = `painted beach #${++antigravityPromptSeq}`;
  const warnings: string[] = [];
  const log = {
    info: () => {},
    error: () => {},
    warn: (_scope: string, message: string) => {
      warnings.push(message);
    },
  };
  let captured;
  globalThis.fetch = async (_url, options = {}) => {
    captured = JSON.parse(String(options.body || "{}"));
    // LEDGER-47: a REAL success payload, so these cases fail when the request/response wiring
    // breaks rather than only when the envelope changes.
    return new Response(
      JSON.stringify({
        response: {
          candidates: [{ content: { parts: [{ inlineData: { data: "ZmFrZQ==" } }] } }],
        },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
  try {
    const result = await handleImageGeneration({
      body: { model: ANTIGRAVITY_IMAGE_MODEL, prompt, aspect_ratio: "3:4", ...extraBody },
      credentials: { accessToken: "ag-token", projectId: "project-123" },
      log,
    });
    assert.equal(result.success, true);
    assert.equal(result.data.data.length, 1);
    assert.equal(result.data.data[0].b64_json, "ZmFrZQ==");

    assert.ok(await waitForCallLogSaves(60_000), "call-log save did not settle");
    // The persisted `model` carries the resolved alias (`…-flash-image`), so match on provider
    // + the unique prompt rather than on the requested model string. `getCallLogs` only ever
    // returns the list-level SUMMARY row — `requestSummary`, populated exclusively for
    // `requestType: "search"` rows (see `buildRequestSummary`) — never the full `requestBody`
    // this handler persists via `saveCallLog`. That body lives solely in the per-row artifact
    // file, reachable only through `getCallLogById`, so each candidate row must be re-read
    // through it before its `requestBody.prompt` can be compared.
    const rows = await getCallLogs({ provider: "antigravity", limit: 50 });
    let row: Awaited<ReturnType<typeof getCallLogById>> | null = null;
    for (const candidate of rows) {
      const detail = await getCallLogById(candidate.id);
      const candidateBody = detail?.requestBody as Record<string, unknown> | null | undefined;
      if (candidateBody && candidateBody.prompt === prompt) {
        row = detail;
        break;
      }
    }
    assert.ok(row, `no call log persisted for prompt ${prompt}`);
    return {
      imageConfig: captured.request.generationConfig.imageConfig,
      requestBody: row.requestBody as Record<string, unknown>,
      warnings,
    };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

async function captureAntigravityImageConfig(extraBody: Record<string, unknown>) {
  return (await captureAntigravityImageRequest(extraBody)).imageConfig;
}

test("handleImageGeneration omits Antigravity imageSize when image_size is not supplied", async () => {
  const { imageConfig, requestBody, warnings } = await captureAntigravityImageRequest({});
  assert.deepEqual(imageConfig, { aspectRatio: "3:4" });
  // LEDGER-54/58: the persisted summary says explicitly that nothing was sent and the
  // upstream default applied — the key must not silently vanish from the stored JSON.
  assert.equal(requestBody.image_size, null);
  assert.equal(requestBody.image_size_applied, "default");
  assert.deepEqual(warnings, []);
});

test("handleImageGeneration forwards a valid Antigravity image_size normalized to upper case", async () => {
  const twoK = await captureAntigravityImageRequest({ image_size: "2K" });
  assert.deepEqual(twoK.imageConfig, { aspectRatio: "3:4", imageSize: "2K" });
  assert.equal(twoK.requestBody.image_size, "2K");
  assert.equal(twoK.requestBody.image_size_applied, "2K");
  assert.deepEqual(twoK.warnings, []);

  assert.deepEqual(await captureAntigravityImageConfig({ image_size: " 4k " }), {
    aspectRatio: "3:4",
    imageSize: "4K",
  });
});

test("handleImageGeneration clamps an unrecognised Antigravity image_size string to 1K and says so", async () => {
  const { imageConfig, requestBody, warnings } = await captureAntigravityImageRequest({
    image_size: "1024x1024",
  });
  assert.deepEqual(imageConfig, { aspectRatio: "3:4", imageSize: "1K" });
  // LEDGER-48: the downgrade is greppable — exactly one warn line naming the raw value.
  assert.equal(warnings.length, 1, `expected one warn line, got ${JSON.stringify(warnings)}`);
  assert.match(warnings[0], /unsupported image_size "1024x1024"/);
  assert.match(warnings[0], /clamped to 1K/);
  // LEDGER-54/59/60: the call log keeps the caller's raw value next to what went upstream.
  assert.equal(requestBody.image_size, "1024x1024");
  assert.equal(requestBody.image_size_applied, "1K");
});

test("handleImageGeneration omits Antigravity imageSize for a non-string image_size", async () => {
  const { imageConfig, requestBody, warnings } = await captureAntigravityImageRequest({
    image_size: 2,
  });
  assert.deepEqual(imageConfig, { aspectRatio: "3:4" });
  assert.equal(requestBody.image_size, 2);
  assert.equal(requestBody.image_size_applied, "default");
  assert.deepEqual(warnings, []);
});

test("handleImageGeneration ignores the camelCase imageSize alias on Antigravity requests", async () => {
  assert.deepEqual(await captureAntigravityImageConfig({ imageSize: "4K" }), {
    aspectRatio: "3:4",
  });
});
