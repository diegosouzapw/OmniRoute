// Muse Image 1.0 (Meta Model API) on the existing `muse-code` provider:
// text-to-image via POST /v1/images/generations (JSON) and reference-image edits via
// POST /v1/images/edits (multipart). Reuses the muse-code connection credentials
// (pasted META_API_KEY or the minted device-flow inference key).
import test from "node:test";
import assert from "node:assert/strict";
import dns from "node:dns";
import fs from "node:fs";
import path from "node:path";
import "../_setup/nativeImageState.ts";

assert.ok(process.env.DATA_DIR?.includes(`${path.sep}isolated-`));
const TEST_DATA_DIR = fs.mkdtempSync(path.join(process.env.DATA_DIR, "muse-image-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "muse-image-test-secret";

const { getImageProvider, parseImageModel, getAllImageModels } =
  await import("../../open-sse/config/imageRegistry.ts");
const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { setPinnedFetchTestOverride } = await import("../../src/shared/network/remoteImageFetch.ts");
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const imageEditRoute = await import("../../src/app/api/v1/images/edits/route.ts");

const originalFetch = globalThis.fetch;
const originalLookup = dns.promises.lookup;
const PNG_B64 = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).toString("base64");

interface CapturedRequest {
  url: string;
  headers: Headers;
  body: unknown;
}

function capture(payload: unknown, status = 200) {
  const requests: CapturedRequest[] = [];
  globalThis.fetch = async (url, init) => {
    requests.push({ url: String(url), headers: new Headers(init?.headers), body: init?.body });
    return Response.json(payload, { status });
  };
  return requests;
}

function generate(body: Record<string, unknown>, credentials: Record<string, unknown> | null) {
  return handleImageGeneration({
    body: { model: "mc/muse-image-1.0", prompt: "a lighthouse at dawn", ...body },
    credentials,
    log: null,
  });
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  (dns.promises as { lookup: unknown }).lookup = originalLookup;
  setPinnedFetchTestOverride(null);
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  await closeCallLogSaves();
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("muse-image-1.0 is registered on the muse-code provider (canonical id and mc alias)", () => {
  const config = getImageProvider("muse-code");
  assert.ok(config, "muse-code must have an image provider config");
  assert.equal(config.format, "muse-image");
  assert.equal(getImageProvider("mc")?.id, "muse-code");
  for (const prefix of ["muse-code", "mc"]) {
    assert.deepEqual(parseImageModel(`${prefix}/muse-image-1.0`), {
      provider: "muse-code",
      model: "muse-image-1.0",
    });
  }
  const entry = getAllImageModels().find((model) => model.id === "muse-code/muse-image-1.0");
  assert.ok(entry, "catalog must list muse-code/muse-image-1.0");
  assert.deepEqual(entry.inputModalities, ["text", "image"]);
});

test("text-to-image posts JSON to /v1/images/generations with the pasted Meta API key", async () => {
  const requests = capture({ created: 1700000000, data: [{ b64_json: PNG_B64 }] });
  const result = await generate(
    { n: 2, size: "1024x1024", response_format: "b64_json" },
    { apiKey: "meta-api-key" }
  );
  assert.equal(result.success, true);
  assert.equal(requests.length, 1);
  assert.equal(requests[0].url, "https://api.meta.ai/v1/images/generations");
  assert.equal(requests[0].headers.get("authorization"), "Bearer meta-api-key");
  assert.equal(requests[0].headers.get("content-type"), "application/json");
  assert.deepEqual(JSON.parse(String(requests[0].body)), {
    model: "muse-image-1.0",
    prompt: "a lighthouse at dawn",
    n: 2,
    size: "1024x1024",
    response_format: "b64_json",
  });
  assert.deepEqual(result.data, { created: 1700000000, data: [{ b64_json: PNG_B64 }] });
});

test("device-flow connections use the minted inference key and minted base URL", async () => {
  const requests = capture({ data: [{ b64_json: PNG_B64 }] });
  const result = await generate(
    {},
    {
      accessToken: "minted-inference-key",
      providerSpecificData: { baseUrl: "https://api.meta.ai/v1/" },
    }
  );
  assert.equal(result.success, true);
  assert.equal(requests[0].url, "https://api.meta.ai/v1/images/generations");
  assert.equal(requests[0].headers.get("authorization"), "Bearer minted-inference-key");
  assert.equal(JSON.parse(String(requests[0].body)).n, 1);
});

test("a reference image switches to multipart /v1/images/edits without a manual Content-Type", async () => {
  const requests = capture({ data: [{ b64_json: PNG_B64 }] });
  const imageBytes = Buffer.from("fake-png-bytes");
  const result = await generate(
    { imageBytes, imageMime: "image/png", size: "1024x1024" },
    { apiKey: "meta-api-key" }
  );
  assert.equal(result.success, true);
  assert.equal(requests[0].url, "https://api.meta.ai/v1/images/edits");
  assert.equal(requests[0].headers.has("content-type"), false);
  assert.equal(requests[0].headers.get("authorization"), "Bearer meta-api-key");
  const form = requests[0].body;
  assert.ok(form instanceof FormData, "edits must be sent as FormData");
  assert.equal(form.get("model"), "muse-image-1.0");
  assert.equal(form.get("prompt"), "a lighthouse at dawn");
  assert.equal(form.get("size"), "1024x1024");
  const part = form.get("image");
  assert.ok(part instanceof Blob);
  assert.equal(part.type, "image/png");
  assert.equal(Buffer.from(await part.arrayBuffer()).toString(), "fake-png-bytes");
});

test("data-URL and raw base64 reference images are decoded into multipart parts", async () => {
  const requests = capture({ data: [{ b64_json: PNG_B64 }] });
  const result = await generate(
    { images: ["data:image/jpeg;base64,anBlZy1ieXRlcw==", "cmF3LWJ5dGVz"] },
    { apiKey: "meta-api-key" }
  );
  assert.equal(result.success, true);
  const form = requests[0].body as FormData;
  const parts = form.getAll("image") as Blob[];
  assert.equal(parts.length, 2);
  assert.equal(parts[0].type, "image/jpeg");
  assert.equal(Buffer.from(await parts[0].arrayBuffer()).toString(), "jpeg-bytes");
  assert.equal(Buffer.from(await parts[1].arrayBuffer()).toString(), "raw-bytes");
});

test("remote reference images go through the SSRF-safe fetch and private hosts are refused", async () => {
  const requests = capture({ data: [{ b64_json: PNG_B64 }] });
  const blocked = await generate(
    { image: "http://127.0.0.1/secret.png" },
    { apiKey: "meta-api-key" }
  );
  assert.equal(blocked.success, false);
  assert.equal(blocked.status, 400);
  assert.equal(requests.length, 0, "a refused reference image must not reach Meta");

  (dns.promises as { lookup: unknown }).lookup = async () => [
    { address: "203.0.113.1", family: 4 },
  ];
  let downloaded = 0;
  setPinnedFetchTestOverride(async (_url, init) => {
    downloaded += 1;
    assert.equal(new Headers(init?.headers).has("authorization"), false);
    return new Response(Buffer.from("remote-bytes"), { headers: { "content-type": "image/webp" } });
  });
  const result = await generate(
    { image: "https://cdn.example.com/ref.webp" },
    { apiKey: "meta-api-key" }
  );
  assert.equal(result.success, true);
  assert.equal(downloaded, 1);
  const part = (requests[0].body as FormData).get("image") as Blob;
  assert.equal(part.type, "image/webp");
  assert.equal(Buffer.from(await part.arrayBuffer()).toString(), "remote-bytes");
});

test("signed-URL output is converted to b64_json when requested", async () => {
  (dns.promises as { lookup: unknown }).lookup = async () => [
    { address: "203.0.113.1", family: 4 },
  ];
  setPinnedFetchTestOverride(
    async () =>
      new Response(Buffer.from(PNG_B64, "base64"), { headers: { "content-type": "image/png" } })
  );
  capture({ data: [{ url: "https://scontent.meta.example/signed.png?sig=1" }] });
  const result = await generate({ response_format: "b64_json" }, { apiKey: "meta-api-key" });
  assert.equal(result.success, true);
  assert.deepEqual(result.data.data, [{ b64_json: PNG_B64 }]);
});

test("bare string items in data[] are normalized to url / b64_json entries", async () => {
  capture({ data: ["https://scontent.meta.example/a.png", PNG_B64] });
  const result = await generate({}, { apiKey: "meta-api-key" });
  assert.equal(result.success, true);
  assert.deepEqual(result.data.data, [
    { url: "https://scontent.meta.example/a.png" },
    { b64_json: PNG_B64 },
  ]);
});

test("missing credentials fail with 401 before any upstream call", async () => {
  const requests = capture({ data: [] });
  const result = await generate({}, null);
  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.equal(requests.length, 0);
});

test("upstream errors keep their status and are sanitized", async () => {
  capture(
    {
      error: {
        message: "Model not available for this account\n    at /srv/meta/handler.js:10:5",
      },
    },
    403
  );
  const result = await generate({}, { apiKey: "meta-api-key" });
  assert.equal(result.success, false);
  assert.equal(result.status, 403);
  const text = String(result.error);
  assert.match(text, /Model not available/);
  assert.equal(text.includes("at /"), false);
});

test(
  "POST /v1/images/edits routes muse-code to the Meta edits endpoint",
  { timeout: 5_000 },
  async () => {
    const selected = await providersDb.createProviderConnection({
      provider: "muse-code",
      authType: "apikey",
      name: "muse-image-test",
      apiKey: "meta-route-key",
      isActive: true,
      testStatus: "active",
    });
    await providersDb.createProviderConnection({
      provider: "muse-code",
      authType: "apikey",
      name: "muse-image-excluded",
      apiKey: "meta-excluded-key",
      isActive: true,
      testStatus: "active",
    });
    assert.ok(typeof selected.id === "string", "selected fixture connection must have an ID");
    const key = await apiKeysDb.createApiKey("muse-image-client", "fixture-machine", [], {
      allowedConnections: [selected.id],
    });
    const request = (extra: Record<string, unknown> = {}) =>
      new Request("http://localhost/api/v1/images/edits", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${key.key}`,
        },
        body: JSON.stringify({
          model: "muse-code/muse-image-1.0",
          prompt: "add a red hat",
          images: [`data:image/png;base64,${PNG_B64}`],
          ...extra,
        }),
      });
    const requests = capture({ data: [{ b64_json: PNG_B64 }] });
    const response = await imageEditRoute.POST(request());
    assert.equal(response.status, 200);
    const body = (await response.json()) as { data: Array<{ b64_json?: string }> };
    assert.equal(body.data[0].b64_json, PNG_B64);
    assert.equal(requests.length, 1);
    assert.equal(requests[0].url, "https://api.meta.ai/v1/images/edits");
    assert.equal(requests[0].headers.get("authorization"), "Bearer meta-route-key");
    const part = (requests[0].body as FormData).get("image") as Blob;
    assert.equal(Buffer.from(await part.arrayBuffer()).toString("base64"), PNG_B64);

    assert.equal((await imageEditRoute.POST(request({ mask: "unsupported" }))).status, 400);
    assert.equal(requests.length, 1, "unsupported masks must not submit an edit");

    const rejected = capture({ error: { message: "Synthetic credential rejection" } }, 401);
    assert.equal((await imageEditRoute.POST(request())).status, 401);
    assert.equal(rejected.length, 1, "fallback must not leave the client's connection allowlist");
    assert.equal(rejected[0].headers.get("authorization"), "Bearer meta-route-key");
  }
);
