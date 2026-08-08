import { test } from "node:test";
import assert from "node:assert";
import {
  DEFAULT_UPSCALE_FACTORS,
  UPSCALE_PROVIDERS,
  getAllUpscaleModels,
  getUpscaleModelEntry,
  getUpscaleProvider,
  isRegisteredUpscaleModel,
  normalizeCreativityPercent,
  normalizeUpscaleFactor,
  parseUpscaleModel,
} from "../../open-sse/config/upscaleRegistry.ts";
import {
  ADOBE_FIREFLY_IMAGE_UPSAMPLE_URL,
  ADOBE_FIREFLY_MAX_CREATIVITY_LEVEL,
  ADOBE_FIREFLY_UPSCALE_MODELS,
  adobeFireflyUpscaleImage,
  buildAdobeUpsampleHeaders,
  buildAdobeUpsamplePayload,
  isAdobeFireflyUpscaleModel,
  resolveAdobeCreativityLevel,
  resolveAdobeUpscaleModel,
} from "../../open-sse/services/adobeFireflyUpscale.ts";
import {
  extractUpscaleSourceImage,
  readImageDimensions,
  scaleDimensions,
  sniffImageMime,
} from "../../open-sse/handlers/imageUpscale/shared.ts";
import { handleImageUpscale } from "../../open-sse/handlers/imageUpscale.ts";
import { handleStabilityImageUpscale } from "../../open-sse/handlers/imageUpscale/stability.ts";
import { handleTopazImageUpscale } from "../../open-sse/handlers/imageUpscale/topaz.ts";
import { IMAGE_PROVIDERS } from "../../open-sse/config/imageRegistry.ts";

// ── Fixtures ───────────────────────────────────────────────────────────────

/** Minimal but real 1x1 PNG (valid IHDR so dimension reads work). */
const PNG_1X1 = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFAAH/q842iQAAAABJRU5ErkJggg==",
  "base64"
);
const PNG_1X1_DATA_URL = `data:image/png;base64,${PNG_1X1.toString("base64")}`;

/** 640x480 PNG header only — enough for readImageDimensions. */
function pngHeader(width: number, height: number): Buffer {
  const buf = Buffer.alloc(24);
  buf[0] = 0x89;
  buf.write("PNG", 1, "ascii");
  buf.writeUInt32BE(width, 16);
  buf.writeUInt32BE(height, 20);
  return buf;
}

/** JPEG with a single SOF0 marker declaring width/height. */
function jpegHeader(width: number, height: number): Buffer {
  const sof = Buffer.alloc(11);
  sof[0] = 0xff;
  sof[1] = 0xc0;
  sof.writeUInt16BE(8, 2); // segment length
  sof[4] = 8; // precision
  sof.writeUInt16BE(height, 5);
  sof.writeUInt16BE(width, 7);
  return Buffer.concat([Buffer.from([0xff, 0xd8]), sof, Buffer.alloc(4)]);
}

const FAKE_JWT = (() => {
  const header = Buffer.from(JSON.stringify({ alg: "RS256" })).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({ user_id: "TESTUSER@AdobeID", type: "access_token", created_at: "1", expires_in: "86400000" })
  ).toString("base64url");
  return `${header}.${payload}.sig`;
})();

/** `new Response(buffer)` does not typecheck (Buffer<ArrayBufferLike>); copy to an ArrayBuffer. */
function bytes(buffer: Buffer): ArrayBuffer {
  const out = new ArrayBuffer(buffer.byteLength);
  new Uint8Array(out).set(buffer);
  return out;
}

function jsonResponse(body: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

// ── Registry ───────────────────────────────────────────────────────────────

test("upscale registry exposes adobe-firefly, stability-ai and topaz", () => {
  assert.deepEqual(Object.keys(UPSCALE_PROVIDERS).sort(), [
    "adobe-firefly",
    "stability-ai",
    "topaz",
  ]);
  assert.equal(getUpscaleProvider("adobe-firefly")?.format, "adobe-firefly-upscale");
  assert.equal(getUpscaleProvider("stability-ai")?.format, "stability-upscale");
  assert.equal(getUpscaleProvider("topaz")?.format, "topaz-upscale");
  assert.equal(getUpscaleProvider("nope"), null);
});

test("adobe-firefly upscale models are Topaz only (video starlight/astra excluded)", () => {
  const ids = UPSCALE_PROVIDERS["adobe-firefly"]!.models.map((m) => m.id);
  assert.deepEqual(ids, ["topaz", "topaz-standard", "topaz-bloom"]);
  for (const id of ids) assert.ok(id.startsWith("topaz"), `${id} must be a Topaz model`);
  for (const forbidden of ["starlight-quality", "starlight-creative", "starlight-fast", "astra-2"]) {
    assert.ok(!ids.includes(forbidden), `${forbidden} is a video upscaler and must not be listed`);
  }
});

test("only topaz-bloom advertises creativity; stability creative/conservative take prompts", () => {
  const firefly = UPSCALE_PROVIDERS["adobe-firefly"]!.models;
  assert.equal(firefly.find((m) => m.id === "topaz-bloom")?.supportsCreativity, true);
  assert.notEqual(firefly.find((m) => m.id === "topaz-standard")?.supportsCreativity, true);

  const stability = UPSCALE_PROVIDERS["stability-ai"]!.models;
  assert.equal(stability.find((m) => m.id === "creative")?.promptRequired, true);
  assert.equal(stability.find((m) => m.id === "conservative")?.promptRequired, true);
  assert.notEqual(stability.find((m) => m.id === "fast")?.promptRequired, true);
});

test("parseUpscaleModel accepts provider prefix, alias and bare model ids", () => {
  assert.deepEqual(parseUpscaleModel("adobe-firefly/topaz-bloom"), {
    provider: "adobe-firefly",
    model: "topaz-bloom",
  });
  assert.deepEqual(parseUpscaleModel("firefly/topaz-standard"), {
    provider: "adobe-firefly",
    model: "topaz-standard",
  });
  assert.deepEqual(parseUpscaleModel("stability-ai/creative"), {
    provider: "stability-ai",
    model: "creative",
  });
  assert.deepEqual(parseUpscaleModel("topaz-enhance"), { provider: "topaz", model: "topaz-enhance" });
  assert.equal(parseUpscaleModel("openai/gpt-image-2").provider, null);
  assert.deepEqual(parseUpscaleModel(null), { provider: null, model: null });
});

test("getUpscaleModelEntry / isRegisteredUpscaleModel resolve registry rows", () => {
  const hit = getUpscaleModelEntry("adobe-firefly/topaz-bloom");
  assert.ok(hit);
  assert.equal(hit.provider, "adobe-firefly");
  assert.equal(hit.entry.supportsCreativity, true);
  assert.equal(getUpscaleModelEntry("adobe-firefly/nope"), null);
  assert.equal(isRegisteredUpscaleModel("stability-ai/fast"), true);
  assert.equal(isRegisteredUpscaleModel("stability-ai/ultra"), false);
});

test("getAllUpscaleModels lists prefixed ids for every provider and alias", () => {
  const ids = getAllUpscaleModels().map((m) => m.id);
  assert.ok(ids.includes("adobe-firefly/topaz-bloom"));
  assert.ok(ids.includes("firefly/topaz-bloom"), "alias-prefixed id must be listed too");
  assert.ok(ids.includes("stability-ai/fast"));
  assert.ok(ids.includes("topaz/topaz-enhance"));
});

test("adobe-firefly image registry now carries the Topaz upscale models as image-only", () => {
  const models = IMAGE_PROVIDERS["adobe-firefly"]!.models as unknown as Array<
    Record<string, unknown>
  >;
  const bloom = models.find((m) => m.id === "topaz-bloom");
  assert.ok(bloom, "topaz-bloom must be registered on the adobe-firefly image provider");
  assert.deepEqual(bloom.inputModalities, ["image"]);
  assert.equal(bloom.imageRequired, true);
  const standard = models.find((m) => m.id === "topaz-standard");
  assert.ok(standard);
  assert.deepEqual(standard.inputModalities, ["image"]);
});

// ── Factor / creativity normalization ──────────────────────────────────────

test("normalizeUpscaleFactor snaps loose input onto supported factors", () => {
  assert.deepEqual([...DEFAULT_UPSCALE_FACTORS], [2, 4]);
  assert.equal(normalizeUpscaleFactor(2), 2);
  assert.equal(normalizeUpscaleFactor(4), 4);
  assert.equal(normalizeUpscaleFactor("4x"), 4);
  assert.equal(normalizeUpscaleFactor("x2"), 2);
  assert.equal(normalizeUpscaleFactor("4X"), 4);
  // 3 is equidistant; the first-listed (2) wins because ties keep the earlier entry.
  assert.equal(normalizeUpscaleFactor(3), 2);
  assert.equal(normalizeUpscaleFactor(3.6), 4);
  assert.equal(normalizeUpscaleFactor(99), 4);
  assert.equal(normalizeUpscaleFactor("nonsense"), 2);
  assert.equal(normalizeUpscaleFactor(undefined), 2);
  assert.equal(normalizeUpscaleFactor(0), 2);
  assert.equal(normalizeUpscaleFactor(-4), 2);
  // Single-factor models always report that factor.
  assert.equal(normalizeUpscaleFactor(2, [4]), 4);
});

test("normalizeCreativityPercent clamps and distinguishes fractions from percents", () => {
  assert.equal(normalizeCreativityPercent(0), 0);
  assert.equal(normalizeCreativityPercent(40), 40);
  assert.equal(normalizeCreativityPercent("60%"), 60);
  assert.equal(normalizeCreativityPercent(0.35), 35);
  assert.equal(normalizeCreativityPercent(1), 1, "integer 1 stays 1 %, not 100 %");
  assert.equal(normalizeCreativityPercent(140), 100);
  assert.equal(normalizeCreativityPercent(-5), 0);
  assert.equal(normalizeCreativityPercent("abc", 25), 25);
});

// ── Adobe Firefly upsample wire contract ───────────────────────────────────

test("resolveAdobeUpscaleModel maps ids to upstream topaz versions and rejects others", () => {
  assert.equal(resolveAdobeUpscaleModel("topaz-bloom")?.spec.upstreamModelVersion, "reimagine");
  assert.equal(resolveAdobeUpscaleModel("topaz-standard")?.spec.upstreamModelVersion, "standard");
  assert.equal(resolveAdobeUpscaleModel("topaz")?.spec.upstreamModelVersion, "standard");
  assert.equal(
    resolveAdobeUpscaleModel("adobe-firefly/topaz-bloom")?.spec.upstreamModelId,
    "topaz"
  );
  assert.equal(resolveAdobeUpscaleModel("firefly/reimagine")?.spec.upstreamModelVersion, "reimagine");
  assert.equal(resolveAdobeUpscaleModel("nano-banana-pro"), null);
  assert.equal(resolveAdobeUpscaleModel(""), null);
  assert.equal(isAdobeFireflyUpscaleModel("topaz-bloom"), true);
  assert.equal(isAdobeFireflyUpscaleModel("gpt-image-2"), false);
  // Every registered spec targets the image family (never topaz-video).
  for (const spec of Object.values(ADOBE_FIREFLY_UPSCALE_MODELS)) {
    assert.equal(spec.upstreamModelId, "topaz");
    assert.deepEqual(spec.factors, [2, 4]);
  }
});

test("resolveAdobeCreativityLevel maps 0-100 % onto the 0-1 upsample wire float", () => {
  // Live colligo on /v2/3p-images/upsample rejects creativityLevel > 1.
  assert.equal(ADOBE_FIREFLY_MAX_CREATIVITY_LEVEL, 1);
  assert.equal(resolveAdobeCreativityLevel({ creativityPercent: 0 }), 0);
  assert.equal(resolveAdobeCreativityLevel({ creativityPercent: 100 }), 1);
  assert.equal(resolveAdobeCreativityLevel({ creativityPercent: 50 }), 0.5);
  assert.equal(resolveAdobeCreativityLevel({ creativityPercent: 40 }), 0.4);
  assert.equal(resolveAdobeCreativityLevel({}), 0);
  // Explicit 0-1 wins over percent.
  assert.equal(resolveAdobeCreativityLevel({ creativityPercent: 100, creativityLevel: 0.25 }), 0.25);
  // Legacy 1-5 integer scale (discovery docs) is mapped onto 0-1.
  assert.equal(resolveAdobeCreativityLevel({ creativityLevel: "4" }), 0.8);
  assert.equal(resolveAdobeCreativityLevel({ creativityLevel: 5 }), 1);
  assert.equal(resolveAdobeCreativityLevel({ creativityLevel: 99 }), 1);
  assert.equal(resolveAdobeCreativityLevel({ creativityLevel: -3 }), 0);
});

test("buildAdobeUpsamplePayload matches the live upsample capture", () => {
  const payload = buildAdobeUpsamplePayload({
    modelSpec: ADOBE_FIREFLY_UPSCALE_MODELS["topaz-bloom"],
    blobId: "a99ffe89-ba67-478e-bd22-bb686506006e",
    upsamplerFactor: 2,
    creativityLevel: 0,
  });

  assert.equal(payload.modelId, "topaz");
  assert.equal(payload.modelVersion, "reimagine");
  assert.equal(payload.upsamplerFactor, 2);
  assert.equal(payload.creativityLevel, 0);
  assert.deepEqual(payload.referenceBlobs, [
    { id: "a99ffe89-ba67-478e-bd22-bb686506006e", usage: "general" },
  ]);
  assert.deepEqual(payload.generationMetadata, {
    module: "image-editing",
    submodule: "ff-image-editor",
    sourceDocumentId: null,
    originalPrompt: null,
    filterString: null,
    subPrompts: null,
    canvasImageReference: null,
  });
  // No prompt / size / n keys — the upsample contract has none.
  assert.ok(!("prompt" in payload));
  assert.ok(!("n" in payload));
});

test("buildAdobeUpsamplePayload omits creativityLevel for the non-generative version", () => {
  const payload = buildAdobeUpsamplePayload({
    modelSpec: ADOBE_FIREFLY_UPSCALE_MODELS["topaz-standard"],
    blobId: "blob-1",
    upsamplerFactor: 4,
    creativityLevel: 3,
  });
  assert.equal(payload.upsamplerFactor, 4);
  assert.ok(!("creativityLevel" in payload), "standard upscale must not send creativityLevel");
});

test("buildAdobeUpsampleHeaders mirrors the capture (ARP present, x-nonce absent)", () => {
  const headers = buildAdobeUpsampleHeaders(FAKE_JWT, { arpSessionId: "arp-test-1" });
  assert.equal(headers.Authorization, `Bearer ${FAKE_JWT}`);
  assert.equal(headers["x-arp-session-id"], "arp-test-1");
  assert.equal(headers["content-type"], "application/json");
  assert.ok(headers["x-api-key"], "x-api-key must be sent");
  assert.equal(headers["x-nonce"], undefined, "upsample capture sends no x-nonce");
  assert.equal(headers.Cookie, undefined, "page cookies never go to firefly-3p");
});

test("adobeFireflyUpscaleImage submits to /v2/3p-images/upsample and polls the result link", async () => {
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  const fetchImpl = (async (url: string | URL | Request, init?: RequestInit) => {
    const href = String(url);
    calls.push({ url: href, init });
    if (href === ADOBE_FIREFLY_IMAGE_UPSAMPLE_URL) {
      return jsonResponse({
        links: {
          result: { href: "https://firefly-epo855232.adobe.io/jobs/result/job-42" },
        },
      });
    }
    return jsonResponse({
      status: "COMPLETED",
      outputs: [{ image: { presignedUrl: "https://s3.example/upscaled.png?X-Amz=1" } }],
    });
  }) as unknown as typeof fetch;

  const result = await adobeFireflyUpscaleImage({
    accessToken: FAKE_JWT,
    model: "adobe-firefly/topaz-bloom",
    blobId: "blob-9",
    upsamplerFactor: 4,
    creativityPercent: 100,
    fetchImpl,
  });

  assert.equal(result.url, "https://s3.example/upscaled.png?X-Amz=1");
  assert.equal(result.factor, 4);
  assert.equal(result.creativityLevel, 1);

  assert.equal(calls[0]!.url, ADOBE_FIREFLY_IMAGE_UPSAMPLE_URL);
  const submitted = JSON.parse(String(calls[0]!.init?.body));
  assert.equal(submitted.modelVersion, "reimagine");
  assert.equal(submitted.upsamplerFactor, 4);
  assert.equal(submitted.creativityLevel, 1);
  assert.deepEqual(submitted.referenceBlobs, [{ id: "blob-9", usage: "general" }]);

  // Poll URL is rewritten to the BKS host, exactly like generate-async.
  assert.equal(
    calls[1]!.url,
    "https://bks-epo8552.adobe.io/v2/jobs/result/job-42?host=firefly-epo855232.adobe.io"
  );
});

test("adobeFireflyUpscaleImage rejects a non-upscale model and a missing blob", async () => {
  await assert.rejects(
    () =>
      adobeFireflyUpscaleImage({
        accessToken: FAKE_JWT,
        model: "nano-banana-pro",
        blobId: "blob-1",
      }),
    /Unsupported Adobe Firefly upscale model/
  );
  await assert.rejects(
    () =>
      adobeFireflyUpscaleImage({
        accessToken: FAKE_JWT,
        model: "topaz-bloom",
        blobId: "   ",
      }),
    /requires a source image/
  );
});

// ── Shared helpers ─────────────────────────────────────────────────────────

test("extractUpscaleSourceImage finds the first image across every alias", () => {
  assert.equal(extractUpscaleSourceImage({ image: "data:image/png;base64,AAA" }), "data:image/png;base64,AAA");
  assert.equal(extractUpscaleSourceImage({ image_url: "https://x/y.png" }), "https://x/y.png");
  assert.equal(extractUpscaleSourceImage({ images: ["https://a/1.png", "https://a/2.png"] }), "https://a/1.png");
  assert.equal(
    extractUpscaleSourceImage({ image_url: { url: "https://obj/u.png" } }),
    "https://obj/u.png"
  );
  assert.equal(
    extractUpscaleSourceImage({ provider_options: { image_urls: ["https://po/1.png"] } }),
    "https://po/1.png"
  );
  assert.equal(
    extractUpscaleSourceImage({
      messages: [{ role: "user", content: [{ type: "image_url", image_url: { url: "https://m/1.png" } }] }],
    }),
    "https://m/1.png"
  );
  assert.equal(extractUpscaleSourceImage({ image: "  " }), null);
  assert.equal(extractUpscaleSourceImage({ image: "null" }), null);
  assert.equal(extractUpscaleSourceImage(null), null);
  assert.equal(extractUpscaleSourceImage({ prompt: "hi" }), null);
});

test("readImageDimensions parses PNG and JPEG headers", () => {
  assert.deepEqual(readImageDimensions(pngHeader(640, 480)), { width: 640, height: 480 });
  assert.deepEqual(readImageDimensions(PNG_1X1), { width: 1, height: 1 });
  assert.deepEqual(readImageDimensions(jpegHeader(1920, 1080)), { width: 1920, height: 1080 });
  assert.equal(readImageDimensions(Buffer.from("not an image")), null);
  assert.equal(readImageDimensions(Buffer.alloc(0)), null);
});

test("sniffImageMime recognizes PNG and JPEG magic bytes", () => {
  assert.equal(sniffImageMime(PNG_1X1), "image/png");
  assert.equal(sniffImageMime(jpegHeader(2, 2)), "image/jpeg");
  assert.equal(sniffImageMime(Buffer.from("zzzz")), "image/png");
});

test("scaleDimensions multiplies the source size and clamps the long edge", () => {
  assert.deepEqual(scaleDimensions(pngHeader(640, 480), 2), { width: 1280, height: 960 });
  assert.deepEqual(scaleDimensions(pngHeader(640, 480), 4), { width: 2560, height: 1920 });
  // Clamp: a 4x pass on a 5000px edge with maxEdge 8000 scales by 1.6, not 4.
  assert.deepEqual(scaleDimensions(pngHeader(5000, 2500), 4, 8000), { width: 8000, height: 4000 });
  // Never downscale, even when the source already exceeds maxEdge.
  assert.deepEqual(scaleDimensions(pngHeader(9000, 9000), 4, 8000), { width: 9000, height: 9000 });
  assert.equal(scaleDimensions(Buffer.from("nope"), 2), null);
});

// ── Dispatcher ─────────────────────────────────────────────────────────────

test("handleImageUpscale rejects unknown / mismatched models before any network call", async () => {
  const badModel = await handleImageUpscale({ body: { model: "openai/gpt-image-2" }, credentials: {} });
  assert.equal(badModel.success, false);
  assert.equal(badModel.status, 400);
  assert.match(String(badModel.error), /Invalid upscale model/);

  const badPair = await handleImageUpscale({
    body: { model: "stability-ai/topaz-bloom" },
    credentials: {},
  });
  assert.equal(badPair.success, false);
  assert.equal(badPair.status, 400);
  assert.match(String(badPair.error), /Unsupported upscale model for stability-ai/);

  const missing = await handleImageUpscale({ body: {}, credentials: {} });
  assert.equal(missing.success, false);
  assert.equal(missing.status, 400);
});

test("handleImageUpscale requires a source image for every provider", async () => {
  for (const model of ["adobe-firefly/topaz-standard", "stability-ai/fast", "topaz/topaz-enhance"]) {
    const result = await handleImageUpscale({
      body: { model },
      credentials: { apiKey: "k" },
    });
    assert.equal(result.success, false, `${model} must fail without an image`);
    assert.equal(result.status, 400);
    assert.match(String(result.error), /source image/i);
  }
});

// ── Stability AI ───────────────────────────────────────────────────────────

test("stability fast upscale posts multipart and returns the base64 image", async () => {
  let captured: { url: string; form?: FormData } | null = null;
  const fetchImpl = (async (url: string | URL | Request, init?: RequestInit) => {
    captured = { url: String(url), form: init?.body as FormData };
    return jsonResponse({ image: PNG_1X1.toString("base64"), finish_reason: "SUCCESS", seed: 7 });
  }) as unknown as typeof fetch;

  const result = await handleStabilityImageUpscale({
    model: "fast",
    provider: "stability-ai",
    providerConfig: { baseUrl: "https://api.stability.ai" },
    body: { image: PNG_1X1_DATA_URL, response_format: "b64_json" },
    credentials: { apiKey: "sk-test" },
    fetchImpl,
  });

  assert.equal(result.success, true);
  assert.equal(captured!.url, "https://api.stability.ai/v2beta/stable-image/upscale/fast");
  assert.ok(captured!.form instanceof FormData);
  assert.ok(captured!.form!.get("image"), "image part must be present");
  assert.equal(captured!.form!.get("output_format"), "png");
  assert.equal(captured!.form!.get("creativity"), null, "fast takes no creativity");
  const data = (result.data as { data: Array<{ b64_json?: string }> }).data;
  assert.equal(data[0]!.b64_json, PNG_1X1.toString("base64"));
});

test("stability conservative/creative demand a prompt and map creativity into range", async () => {
  const noPrompt = await handleStabilityImageUpscale({
    model: "conservative",
    provider: "stability-ai",
    providerConfig: { baseUrl: "https://api.stability.ai" },
    body: { image: PNG_1X1_DATA_URL },
    credentials: { apiKey: "sk-test" },
    fetchImpl: (async () => jsonResponse({})) as unknown as typeof fetch,
  });
  assert.equal(noPrompt.success, false);
  assert.equal(noPrompt.status, 400);
  assert.match(String(noPrompt.error), /requires a prompt/);

  let form: FormData | null = null;
  const ok = await handleStabilityImageUpscale({
    model: "conservative",
    provider: "stability-ai",
    providerConfig: { baseUrl: "https://api.stability.ai" },
    body: { image: PNG_1X1_DATA_URL, prompt: "a cat", creativity: 100 },
    credentials: { apiKey: "sk-test" },
    fetchImpl: (async (_url: unknown, init?: RequestInit) => {
      form = init?.body as FormData;
      return jsonResponse({ image: PNG_1X1.toString("base64") });
    }) as unknown as typeof fetch,
  });
  assert.equal(ok.success, true);
  // conservative range is 0.2-0.5 → 100 % maps to the max.
  assert.equal(form!.get("creativity"), "0.5");
  assert.equal(form!.get("prompt"), "a cat");
});

test("stability creative polls /v2beta/results until the job completes", async () => {
  const urls: string[] = [];
  let pollCount = 0;
  const fetchImpl = (async (url: string | URL | Request) => {
    const href = String(url);
    urls.push(href);
    if (href.includes("/upscale/creative")) return jsonResponse({ id: "job-77" });
    pollCount += 1;
    if (pollCount === 1) return new Response(null, { status: 202 });
    return jsonResponse({ image: PNG_1X1.toString("base64"), finish_reason: "SUCCESS" });
  }) as unknown as typeof fetch;

  const result = await handleStabilityImageUpscale({
    model: "creative",
    provider: "stability-ai",
    providerConfig: { baseUrl: "https://api.stability.ai" },
    body: { image: PNG_1X1_DATA_URL, prompt: "a cat", creativity: 0 },
    credentials: { apiKey: "sk-test" },
    fetchImpl,
  });

  assert.equal(result.success, true);
  assert.equal(urls[1], "https://api.stability.ai/v2beta/results/job-77");
  assert.equal(urls[2], "https://api.stability.ai/v2beta/results/job-77");
  const entry = (result.data as { data: Array<{ url?: string }> }).data[0]!;
  assert.match(String(entry.url), /^data:image\/png;base64,/);
});

test("stability surfaces CONTENT_FILTERED as a 400 instead of an empty image", async () => {
  const result = await handleStabilityImageUpscale({
    model: "fast",
    provider: "stability-ai",
    providerConfig: { baseUrl: "https://api.stability.ai" },
    body: { image: PNG_1X1_DATA_URL },
    credentials: { apiKey: "sk-test" },
    fetchImpl: (async () =>
      jsonResponse({ finish_reason: "CONTENT_FILTERED" })) as unknown as typeof fetch,
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(String(result.error), /CONTENT_FILTERED/);
});

// ── Topaz Labs ─────────────────────────────────────────────────────────────

test("topaz enhance converts the factor into an absolute output size", async () => {
  let form: FormData | null = null;
  let headers: Record<string, string> | null = null;
  const source = Buffer.concat([pngHeader(800, 600), Buffer.alloc(8)]);

  const result = await handleTopazImageUpscale({
    model: "topaz-enhance",
    provider: "topaz",
    providerConfig: { baseUrl: "https://api.topazlabs.com" },
    body: {
      image: `data:image/png;base64,${source.toString("base64")}`,
      factor: 4,
      output_format: "jpeg",
    },
    credentials: { apiKey: "topaz-key" },
    fetchImpl: (async (_url: unknown, init?: RequestInit) => {
      form = init?.body as FormData;
      headers = init?.headers as Record<string, string>;
      return new Response(bytes(jpegHeader(3200, 2400)), {
        status: 200,
        headers: { "content-type": "image/jpeg" },
      });
    }) as unknown as typeof fetch,
  });

  assert.equal(result.success, true);
  assert.equal(form!.get("output_width"), "3200");
  assert.equal(form!.get("output_height"), "2400");
  assert.equal(form!.get("output_format"), "jpeg");
  assert.equal(headers!["X-API-Key"], "topaz-key");
  assert.equal(headers!.Accept, "image/jpeg");
  const entry = (result.data as { data: Array<{ url?: string }> }).data[0]!;
  assert.match(String(entry.url), /^data:image\/jpeg;base64,/);
  assert.equal((result.data as { upscale: { factor: number } }).upscale.factor, 4);
});

test("topaz falls back to its own scale when the source dimensions are unreadable", async () => {
  let form: FormData | null = null;
  const result = await handleTopazImageUpscale({
    model: "topaz-enhance",
    provider: "topaz",
    providerConfig: { baseUrl: "https://api.topazlabs.com" },
    // A valid base64 payload whose bytes are not a recognizable image container.
    body: { image: Buffer.from("x".repeat(200)).toString("base64"), factor: 2 },
    credentials: { apiKey: "topaz-key" },
    fetchImpl: (async (_url: unknown, init?: RequestInit) => {
      form = init?.body as FormData;
      return new Response(bytes(PNG_1X1), { status: 200, headers: { "content-type": "image/png" } });
    }) as unknown as typeof fetch,
  });

  assert.equal(result.success, true);
  assert.equal(form!.get("output_width"), null);
  assert.equal(form!.get("output_height"), null);
});

test("topaz honors an explicit WxH size over the factor and propagates upstream errors", async () => {
  let form: FormData | null = null;
  const source = Buffer.concat([pngHeader(100, 100), Buffer.alloc(8)]);
  await handleTopazImageUpscale({
    model: "topaz-enhance",
    provider: "topaz",
    providerConfig: { baseUrl: "https://api.topazlabs.com" },
    body: {
      image: `data:image/png;base64,${source.toString("base64")}`,
      factor: 4,
      size: "1500x1200",
    },
    credentials: { apiKey: "topaz-key" },
    fetchImpl: (async (_url: unknown, init?: RequestInit) => {
      form = init?.body as FormData;
      return new Response(bytes(PNG_1X1), { status: 200, headers: { "content-type": "image/png" } });
    }) as unknown as typeof fetch,
  });
  assert.equal(form!.get("output_width"), "1500");
  assert.equal(form!.get("output_height"), "1200");

  const failed = await handleTopazImageUpscale({
    model: "topaz-enhance",
    provider: "topaz",
    providerConfig: { baseUrl: "https://api.topazlabs.com" },
    body: { image: PNG_1X1_DATA_URL },
    credentials: { apiKey: "topaz-key" },
    fetchImpl: (async () =>
      new Response("quota exceeded", { status: 402 })) as unknown as typeof fetch,
  });
  assert.equal(failed.success, false);
  assert.equal(failed.status, 402);
  assert.match(String(failed.error), /quota exceeded/);
});
