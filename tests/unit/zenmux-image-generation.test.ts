import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import dns from "node:dns";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-zenmux-images-"));
process.env.DATA_DIR = dataDir;

const { parseImageModel, getAllImageModels } =
  await import("../../open-sse/config/imageRegistry.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const originalFetch = globalThis.fetch;
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(async () => {
  await closeCallLogSaves();
  resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true });
});

const prompt = "A travel poster with the headline ALPINE DAWN";
const image = "aW1hZ2U=";
function generate(model: string, options: Record<string, unknown> = {}, signal?: AbortSignal) {
  return handleImageGeneration({
    body: { model, prompt, ...options },
    credentials: { apiKey: "zenmux-test-key" },
    log: null,
    signal,
  });
}

function captureResponse(payload: unknown, status = 200) {
  const requests: Array<{ url: string; headers: Headers; body: Record<string, unknown> }> = [];
  globalThis.fetch = async (url, init) => {
    requests.push({
      url: String(url),
      headers: new Headers(init?.headers),
      body: JSON.parse(String(init?.body)),
    });
    return Response.json(payload, { status });
  };
  return requests;
}

test("Zenmux canonical and short prefixes preserve the upstream publisher namespace", () => {
  for (const prefix of ["zenmux", "zm"]) {
    assert.deepEqual(parseImageModel(`${prefix}/inclusionai/ming-image-0.1-design`), {
      provider: "zenmux",
      model: "inclusionai/ming-image-0.1-design",
    });
  }
  const catalog = getAllImageModels();
  for (const model of [
    "inclusionai/ming-image-0.1-design",
    "z-ai/glm-image",
    "x-ai/grok-imagine-image-2.0",
    "meta/muse-image-1.0",
    "openai/gpt-image-2",
  ]) {
    assert.ok(catalog.some((entry) => entry.id === `zenmux/${model}`));
  }
  assert.deepEqual(
    catalog.find((entry) => entry.id === "zenmux/inclusionai/ming-image-0.1-design")
      ?.supportedSizes,
    []
  );
});

for (const model of ["z-ai/glm-image", "x-ai/grok-imagine-image-2.0", "meta/muse-image-1.0"]) {
  test(`Zenmux ${model} uses Vertex predict and normalizes image output`, async () => {
    const requests = captureResponse({
      predictions: [{ bytesBase64Encoded: image, mimeType: "image/png", prompt: "revised" }],
    });
    const result = await generate(`zm/${model}`, { n: 1, aspect_ratio: "16:9", image_size: "2K" });
    assert.equal(result.success, true);
    const [publisher, name] = model.split("/");
    assert.equal(
      requests[0].url,
      `https://zenmux.ai/api/vertex-ai/v1/publishers/${publisher}/models/${name}:predict`
    );
    assert.equal(requests[0].headers.get("authorization"), "Bearer zenmux-test-key");
    assert.deepEqual(requests[0].body, {
      instances: [{ prompt }],
      parameters: { sampleCount: 1, aspectRatio: "16:9", sampleImageSize: "2K" },
    });
    assert.deepEqual(result.data.data, [{ b64_json: image, revised_prompt: "revised" }]);
  });
}

test("Ming has no implicit size and accepts WebP output", async () => {
  const requests = captureResponse({ predictions: [{ bytesBase64Encoded: image }] });
  const result = await generate("zenmux/inclusionai/ming-image-0.1-design", {
    output_format: "webp",
  });
  assert.equal(result.success, true);
  assert.deepEqual(requests[0].body, {
    instances: [{ prompt }],
    parameters: { sampleCount: 1, outputOptions: { mimeType: "image/webp" } },
  });
});

for (const field of [
  "size",
  "aspect_ratio",
  "image_size",
  "image",
  "image_url",
  "reference_images",
]) {
  test(`Ming rejects ${field} before contacting upstream`, async () => {
    const requests = captureResponse({});
    const result = await generate("zm/inclusionai/ming-image-0.1-design", { [field]: "1024x1024" });
    assert.equal(result.success, false);
    assert.equal(result.status, 400);
    assert.match(String(result.error), /Ming Image Design|reference images/);
    assert.equal(requests.length, 0);
  });
}

test("Vertex maps dimensions to an exact aspect ratio and preserves optional settings", async () => {
  const requests = captureResponse({ predictions: [{ bytesBase64Encoded: image }] });
  assert.equal(
    (
      await generate("zm/meta/muse-image-1.0", {
        size: "1536x1024",
        n: 2,
        output_format: "jpeg",
        output_compression: 80,
        seed: 0,
        negative_prompt: "blur",
      })
    ).success,
    true
  );
  assert.deepEqual(requests[0].body.parameters, {
    sampleCount: 2,
    aspectRatio: "3:2",
    outputOptions: { mimeType: "image/jpeg", compressionQuality: 80 },
    seed: 0,
    negativePrompt: "blur",
  });
});

test("OpenAI models use Images API without dropping output settings", async () => {
  const requests = captureResponse({ created: 123, data: [{ b64_json: image }] });
  const options = {
    n: 2,
    size: "1536x1024",
    quality: "high",
    output_format: "webp",
    output_compression: 90,
    background: "transparent",
    response_format: "b64_json",
  };
  const result = await generate("zenmux/openai/gpt-image-2", options);
  assert.equal(result.success, true);
  assert.equal(requests[0].url, "https://zenmux.ai/api/v1/images/generations");
  assert.deepEqual(requests[0].body, { model: "openai/gpt-image-2", prompt, ...options });
  assert.equal(result.data.created, 123);
});

test("Vertex supports URL responses from base64 and HTTPS predictions", async () => {
  captureResponse({
    predictions: [
      { bytesBase64Encoded: image, mimeType: "image/webp" },
      { gcsUri: "https://cdn.example.com/image.png" },
    ],
  });
  const result = await generate("zm/meta/muse-image-1.0", { response_format: "url" });
  assert.equal(result.success, true);
  assert.equal(result.data.data[0].url, `data:image/webp;base64,${image}`);
  assert.equal(result.data.data[1].url, "https://cdn.example.com/image.png");
});

test("Zenmux preserves upstream errors without exposing stacks or keys", async () => {
  captureResponse(
    { error: { message: "Rejected api_key=sk-secret123\n    at /srv/app/file.ts:1:2" } },
    429
  );
  const result = await generate("zm/z-ai/glm-image");
  assert.equal(result.success, false);
  assert.equal(result.status, 429);
  assert.ok(!String(result.error).includes("at /"));
  assert.ok(!String(result.error).includes("sk-secret123"));
});

for (const payload of [
  { predictions: [] },
  { predictions: [{ raiFilteredReason: "blocked" }] },
  {},
]) {
  test(`Zenmux rejects empty or filtered image output: ${JSON.stringify(payload)}`, async () => {
    captureResponse(payload);
    const result = await generate("zm/z-ai/glm-image");
    assert.equal(result.success, false);
    assert.equal(result.status, 502);
  });
}

test("Zenmux validates parameters and model path before fetching", async () => {
  const requests = captureResponse({});
  for (const options of [
    { n: 0 },
    { n: "2" },
    { image_size: "8K" },
    { prompt: "" },
    { size: "nope" },
  ]) {
    const result = await generate("zm/z-ai/glm-image", options);
    assert.equal(result.success, false);
    assert.equal(result.status, 400);
  }
  for (const model of ["zenmux/no-publisher", "zenmux/a/b/c", "zenmux/a/..", "zenmux/a/name?x=1"]) {
    assert.equal((await generate(model)).success, false);
  }
  assert.equal(requests.length, 0);
});

test("Zenmux passes cancellation through and sanitizes network errors", async () => {
  let called = false;
  const controller = new AbortController();
  globalThis.fetch = async (_url, init) => {
    called = true;
    assert.ok(init?.signal);
    controller.abort();
    assert.equal(init.signal.aborted, true);
    throw new Error("Network failure\n    at /srv/private/file.ts:1:2");
  };
  const result = await generate("zm/z-ai/glm-image", {}, controller.signal);
  assert.equal(called, true);
  assert.equal(result.success, false);
  assert.ok(!String(result.error).includes("/srv/private"));
});

test("Zenmux rejects missing credentials without contacting upstream", async () => {
  const requests = captureResponse({});
  const result = await handleImageGeneration({
    body: { model: "zm/z-ai/glm-image", prompt },
    credentials: {},
    log: null,
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.equal(requests.length, 0);
});

test("Zenmux rejects incompatible per-protocol options rather than silently dropping them", async () => {
  const requests = captureResponse({});
  for (const options of [
    { aspect_ratio: "1:1" },
    { image_size: "2K" },
    { seed: 1 },
    { negative_prompt: "blur" },
  ]) {
    assert.equal((await generate("zm/openai/gpt-image-2", options)).status, 400);
  }
  for (const options of [{ quality: "high" }, { background: "transparent" }, { style: "vivid" }]) {
    assert.equal((await generate("zm/meta/muse-image-1.0", options)).status, 400);
  }
  assert.equal(requests.length, 0);
});

test("Zenmux fails closed for invalid JSON, malformed and empty OpenAI results", async () => {
  for (const status of [200, 503]) {
    globalThis.fetch = async () => new Response("<html>internal error</html>", { status });
    const result = await generate("zm/openai/gpt-image-2");
    assert.equal(result.success, false);
    assert.equal(result.status, status === 200 ? 502 : status);
    assert.ok(!String(result.error).includes("<html>"));
  }
  for (const payload of [{}, { data: [] }, { data: [{}] }, { data: [{ b64_json: 42 }] }]) {
    captureResponse(payload);
    const result = await generate("zm/openai/gpt-image-2");
    assert.equal(result.success, false);
    assert.equal(result.status, 502);
  }
});

test("Zenmux preserves HTTP status even without an upstream error message", async () => {
  captureResponse({ error: "unavailable" }, 503);
  const result = await generate("zm/z-ai/glm-image");
  assert.equal(result.status, 503);
  assert.match(String(result.error), /HTTP 503/);
});

test("Zenmux does not expose filtered or non-HTTP Vertex predictions", async () => {
  captureResponse({
    predictions: [
      { bytesBase64Encoded: image, raiFilteredReason: "blocked" },
      { gcsUri: "gs://bucket/image.png" },
      { bytesBase64Encoded: image },
    ],
  });
  const result = await generate("zm/meta/muse-image-1.0", { response_format: "url" });
  assert.equal(result.success, true);
  assert.deepEqual(result.data.data, [{ url: `data:image/png;base64,${image}` }]);
});

test("Zenmux applies public-only download policy to URL-to-base64 conversion", async () => {
  const requests = captureResponse({ predictions: [{ gcsUri: "https://127.0.0.1/private.png" }] });
  const result = await generate("zm/meta/muse-image-1.0", { response_format: "b64_json" });
  assert.equal(result.success, false);
  assert.equal(requests.length, 1);
});

test("Zenmux reports upstream timeouts as 504", async () => {
  const { FetchTimeoutError } = await import("../../src/shared/utils/fetchTimeout.ts");
  globalThis.fetch = async () => {
    throw new FetchTimeoutError("Timed out", 1, "https://zenmux.ai");
  };
  const result = await generate("zm/z-ai/glm-image");
  assert.equal(result.status, 504);
});

test("Zenmux OpenAI base64-only results honor response_format=url", async () => {
  captureResponse({ data: [{ b64_json: image }] });
  const result = await generate("zm/openai/gpt-image-2", {
    response_format: "url",
    output_format: "webp",
  });
  assert.deepEqual(result.data.data, [{ url: `data:image/webp;base64,${image}` }]);
});

test("Zenmux downloads public prediction URLs without forwarding credentials", async () => {
  const { setPinnedFetchTestOverride } =
    await import("../../src/shared/network/remoteImageFetch.ts");
  const originalLookup = dns.promises.lookup;
  (dns.promises as { lookup: unknown }).lookup = async () => [
    { address: "203.0.113.1", family: 4 },
  ];
  let downloaded = false;
  setPinnedFetchTestOverride(async (_url, init) => {
    downloaded = true;
    assert.equal(new Headers(init?.headers).has("authorization"), false);
    return new Response(Buffer.from(image, "base64"), { headers: { "content-type": "image/png" } });
  });
  try {
    captureResponse({ predictions: [{ gcsUri: "https://cdn.example.com/image.png" }] });
    const result = await generate("zm/meta/muse-image-1.0", { response_format: "b64_json" });
    assert.equal(result.success, true);
    assert.equal(downloaded, true);
    assert.deepEqual(result.data.data, [{ b64_json: image }]);
  } finally {
    dns.promises.lookup = originalLookup;
    setPinnedFetchTestOverride(null);
  }
});
