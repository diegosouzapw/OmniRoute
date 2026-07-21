import { test } from "node:test";
import assert from "node:assert";
import { resolvePublicCred } from "../../open-sse/utils/publicCreds.ts";
import {
  ADOBE_FIREFLY_IMAGE_MODELS,
  ADOBE_FIREFLY_VIDEO_MODELS,
  adobeFireflyApiKey,
  buildAdobeImagePayload,
  buildAdobePollHeaders,
  buildAdobeSubmitHeaders,
  buildAdobeVideoPayload,
  extractAdobeCredentialToken,
  extractAdobeMediaUrl,
  extractAdobeResultLink,
  looksLikeAdobeJwt,
  normalizeAdobeAspectRatio,
  normalizeAdobeOutputResolution,
  resolveAdobeImageModel,
  resolveAdobeVideoModel,
  adobeFireflyGenerateImage,
  adobeFireflyGenerateVideo,
} from "../../open-sse/services/adobeFireflyClient.ts";
import { handleAdobeFireflyImageGeneration } from "../../open-sse/handlers/imageGeneration/providers/adobeFirefly.ts";
import { handleAdobeFireflyVideoGeneration } from "../../open-sse/handlers/videoGeneration/adobeFireflyHandler.ts";
import { WEB_COOKIE_PROVIDERS } from "../../src/shared/constants/providers/web-cookie.ts";
import { IMAGE_PROVIDERS } from "../../open-sse/config/imageRegistry.ts";
import { VIDEO_PROVIDERS } from "../../open-sse/config/videoRegistry.ts";
import { getExecutor } from "../../open-sse/executors/index.ts";

// --- Registry --------------------------------------------------------------

test("adobe-firefly is registered in WEB_COOKIE_PROVIDERS with a webCookie risk notice", () => {
  const entry = (WEB_COOKIE_PROVIDERS as Record<string, any>)["adobe-firefly"];
  assert.ok(entry, "adobe-firefly must exist in WEB_COOKIE_PROVIDERS");
  assert.equal(entry.id, "adobe-firefly");
  assert.equal(entry.alias, "firefly");
  assert.equal(entry.subscriptionRisk, true);
  assert.equal(entry.riskNoticeVariant, "webCookie");
  assert.match(entry.website, /firefly\.adobe\.com/);
});

test("adobe-firefly is registered in IMAGE_PROVIDERS with adobe-firefly-image format", () => {
  const entry = (IMAGE_PROVIDERS as Record<string, any>)["adobe-firefly"];
  assert.ok(entry);
  assert.equal(entry.format, "adobe-firefly-image");
  assert.match(entry.baseUrl, /firefly-3p\.ff\.adobe\.io/);
  assert.ok(Array.isArray(entry.models) && entry.models.length >= 4);
});

test("adobe-firefly is registered in VIDEO_PROVIDERS with adobe-firefly-video format", () => {
  const entry = (VIDEO_PROVIDERS as Record<string, any>)["adobe-firefly"];
  assert.ok(entry);
  assert.equal(entry.format, "adobe-firefly-video");
  assert.match(entry.baseUrl, /3p-videos/);
  assert.ok(Array.isArray(entry.models) && entry.models.length >= 5);
});

test("getExecutor(adobe-firefly) rejects chat completions", async () => {
  const executor = getExecutor("adobe-firefly");
  assert.ok(executor);
  const result = await executor.execute({
    body: { model: "adobe-firefly/nano-banana-pro", messages: [{ role: "user", content: "hi" }] },
    credentials: { apiKey: "tok" },
  } as any);
  assert.ok(result.response, "executor must return a Response wrapper");
  assert.equal(result.response.status, 400);
  const bodyText = await result.response.text();
  assert.match(bodyText, /images\/generations|videos\/generations|media-generation/i);
});

// --- Public credential -----------------------------------------------------

test("adobe_firefly_api_key embedded default decodes to projectx_webapp", () => {
  assert.equal(resolvePublicCred("adobe_firefly_api_key"), "projectx_webapp");
  assert.equal(adobeFireflyApiKey(), "projectx_webapp");
});

// --- Pure helpers ----------------------------------------------------------

test("looksLikeAdobeJwt detects JWT shape and rejects cookie blobs", () => {
  assert.equal(looksLikeAdobeJwt("aaa.bbb.ccc"), true);
  assert.equal(looksLikeAdobeJwt("Bearer aaa.bbb.ccc"), false); // stripped elsewhere
  assert.equal(looksLikeAdobeJwt("s_ecid=foo; session=bar"), false);
  assert.equal(looksLikeAdobeJwt("not-a-jwt"), false);
});

test("extractAdobeCredentialToken strips Bearer and access_token=", () => {
  assert.equal(extractAdobeCredentialToken("Bearer abc.def.ghi"), "abc.def.ghi");
  assert.equal(extractAdobeCredentialToken("access_token=tok123; other=1"), "tok123");
  assert.equal(extractAdobeCredentialToken("  rawcookie  "), "rawcookie");
});

test("normalizeAdobeAspectRatio maps sizes and ratios", () => {
  assert.equal(normalizeAdobeAspectRatio("16:9"), "16:9");
  assert.equal(normalizeAdobeAspectRatio("16x9"), "16:9");
  assert.equal(normalizeAdobeAspectRatio("1024x1024"), "1:1");
  assert.equal(normalizeAdobeAspectRatio("1792x1024"), "16:9");
  assert.equal(normalizeAdobeAspectRatio("1024x1792"), "9:16");
  assert.equal(normalizeAdobeAspectRatio("auto"), "1:1");
  assert.equal(normalizeAdobeAspectRatio(undefined), "1:1");
});

test("normalizeAdobeOutputResolution maps quality tiers", () => {
  assert.equal(normalizeAdobeOutputResolution("4k", null), "4K");
  assert.equal(normalizeAdobeOutputResolution("high", null), "4K");
  assert.equal(normalizeAdobeOutputResolution("2k", null), "2K");
  assert.equal(normalizeAdobeOutputResolution("low", null), "1K");
  assert.equal(normalizeAdobeOutputResolution(undefined, "4096x4096"), "4K");
  assert.equal(normalizeAdobeOutputResolution(undefined, undefined), "2K");
});

test("resolveAdobeImageModel maps catalog and long model ids", () => {
  assert.equal(resolveAdobeImageModel("nano-banana-pro").id, "nano-banana-pro");
  assert.equal(resolveAdobeImageModel("adobe-firefly/nano-banana-2").id, "nano-banana-2");
  assert.equal(resolveAdobeImageModel("firefly-nano-banana-pro-2k-16x9").id, "nano-banana-pro");
  assert.equal(resolveAdobeImageModel("gpt-image").id, "gpt-image");
  assert.ok(ADOBE_FIREFLY_IMAGE_MODELS["nano-banana-pro"].upstreamModelVersion);
});

test("resolveAdobeVideoModel maps sora/veo/kling families", () => {
  assert.equal(resolveAdobeVideoModel("sora-2").id, "sora-2");
  assert.equal(resolveAdobeVideoModel("firefly-sora2-pro-8s-16x9").id, "sora-2-pro");
  assert.equal(resolveAdobeVideoModel("veo-3.1-fast").id, "veo-3.1-fast");
  assert.equal(resolveAdobeVideoModel("kling-3").id, "kling-3");
  assert.ok(ADOBE_FIREFLY_VIDEO_MODELS["sora-2"].defaultDuration > 0);
});

test("buildAdobeImagePayload produces nano and gpt-image shapes", () => {
  const nano = buildAdobeImagePayload({
    prompt: "a cat",
    aspectRatio: "16:9",
    outputResolution: "2K",
    modelSpec: ADOBE_FIREFLY_IMAGE_MODELS["nano-banana-pro"],
  });
  assert.equal(nano.modelId, "gemini-flash");
  assert.equal(nano.modelVersion, "nano-banana-2");
  assert.deepEqual((nano.size as any), { width: 2752, height: 1536 });
  assert.equal((nano.modelSpecificPayload as any).aspectRatio, "16:9");

  const gpt = buildAdobeImagePayload({
    prompt: "a dog",
    aspectRatio: "1:1",
    outputResolution: "1K",
    modelSpec: ADOBE_FIREFLY_IMAGE_MODELS["gpt-image"],
    quality: "high",
  });
  assert.equal(gpt.modelId, "gpt-image");
  assert.equal((gpt.generationSettings as any).detailLevel, 5);
  assert.equal((gpt.modelSpecificPayload as any).size, "1024x1024");
});

test("buildAdobeVideoPayload produces sora and veo shapes", () => {
  const sora = buildAdobeVideoPayload({
    prompt: "ocean waves",
    aspectRatio: "16:9",
    duration: 8,
    modelSpec: ADOBE_FIREFLY_VIDEO_MODELS["sora-2"],
  });
  assert.equal(sora.modelId, "sora");
  assert.equal(sora.duration, 8);

  const veo = buildAdobeVideoPayload({
    prompt: "city flyover",
    aspectRatio: "9:16",
    duration: 6,
    modelSpec: ADOBE_FIREFLY_VIDEO_MODELS["veo-3.1"],
  });
  assert.equal(veo.modelId, "veo");
  assert.equal(veo.modelVersion, "3.1-generate");
  assert.equal((veo.modelSpecificPayload as any).parameters.durationSeconds, 6);
  assert.equal(veo.generateAudio, true);
});

test("extractAdobeResultLink prefers x-override-status-link then links.result", () => {
  const headers = new Headers({ "x-override-status-link": "https://poll.example/job/1" });
  assert.equal(extractAdobeResultLink(headers, {}), "https://poll.example/job/1");

  const headers2 = new Headers();
  assert.equal(
    extractAdobeResultLink(headers2, { links: { result: { href: "https://poll.example/job/2" } } }),
    "https://poll.example/job/2"
  );
});

test("extractAdobeMediaUrl reads outputs[].image/video.presignedUrl", () => {
  assert.equal(
    extractAdobeMediaUrl(
      { outputs: [{ image: { presignedUrl: "https://cdn.example/a.png" } }] },
      "image"
    ),
    "https://cdn.example/a.png"
  );
  assert.equal(
    extractAdobeMediaUrl(
      { outputs: [{ video: { presignedUrl: "https://cdn.example/a.mp4" } }] },
      "video"
    ),
    "https://cdn.example/a.mp4"
  );
});

test("buildAdobeSubmitHeaders sets Bearer + public x-api-key", () => {
  const headers = buildAdobeSubmitHeaders("tok-1");
  assert.equal(headers.Authorization, "Bearer tok-1");
  assert.equal(headers["x-api-key"], "projectx_webapp");
  assert.equal(headers["content-type"], "application/json");
  const poll = buildAdobePollHeaders("tok-1");
  assert.equal(poll.Authorization, "Bearer tok-1");
});

// --- Handlers (mocked fetch) ----------------------------------------------

function jsonResponse(status: number, body: unknown, headerMap: Record<string, string> = {}) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: {
      get: (name: string) => {
        const key = Object.keys(headerMap).find((k) => k.toLowerCase() === name.toLowerCase());
        return key ? headerMap[key] : null;
      },
    },
    json: async () => body,
    text: async () => JSON.stringify(body),
  } as unknown as Response;
}

test("handleAdobeFireflyImageGeneration returns 400 when prompt is missing", async () => {
  const result = await handleAdobeFireflyImageGeneration({
    model: "nano-banana-pro",
    provider: "adobe-firefly",
    body: {},
    credentials: { apiKey: "aaa.bbb.ccc" },
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
});

test("handleAdobeFireflyImageGeneration submit+poll happy path (mocked)", async () => {
  let calls = 0;
  const fetchImpl = async (url: string, init?: RequestInit) => {
    calls += 1;
    const u = String(url);
    if (u.includes("generate-async")) {
      return jsonResponse(
        200,
        { links: { result: "https://poll.example/job/img1" } },
        { "x-override-status-link": "https://poll.example/job/img1" }
      );
    }
    if (u.includes("poll.example")) {
      return jsonResponse(200, {
        status: "COMPLETED",
        outputs: [{ image: { presignedUrl: "https://cdn.example/out.png" } }],
      });
    }
    throw new Error(`unexpected fetch ${u}`);
  };

  const result = await handleAdobeFireflyImageGeneration({
    model: "nano-banana-pro",
    provider: "adobe-firefly",
    body: { prompt: "sunset mountains", size: "16:9", quality: "2k" },
    credentials: { apiKey: "eyJhbGciOiJIUzI1NiJ9.e30.signature" },
    fetchImpl: fetchImpl as typeof fetch,
  });

  assert.equal(result.success, true);
  assert.ok(result.data?.data?.[0]?.url?.includes("cdn.example/out.png"));
  assert.ok(calls >= 2);
});

test("adobeFireflyGenerateVideo submit+poll happy path (mocked)", async () => {
  const fetchImpl = async (url: string) => {
    const u = String(url);
    if (u.includes("3p-videos")) {
      return jsonResponse(
        200,
        { links: { result: { href: "https://poll.example/job/vid1" } } },
        {}
      );
    }
    if (u.includes("poll.example")) {
      return jsonResponse(200, {
        status: "COMPLETED",
        outputs: [{ video: { presignedUrl: "https://cdn.example/out.mp4" } }],
      });
    }
    throw new Error(`unexpected fetch ${u}`);
  };

  const result = await adobeFireflyGenerateVideo({
    accessToken: "tok",
    prompt: "drone over forest",
    model: "sora-2",
    duration: 4,
    aspectRatio: "16:9",
    fetchImpl: fetchImpl as typeof fetch,
  });
  assert.equal(result.format, "mp4");
  assert.match(result.url, /out\.mp4/);
});

test("handleAdobeFireflyVideoGeneration returns 400 without prompt", async () => {
  const result = await handleAdobeFireflyVideoGeneration({
    model: "sora-2",
    provider: "adobe-firefly",
    body: {},
    credentials: { apiKey: "aaa.bbb.ccc" },
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
});

test("handleAdobeFireflyImageGeneration maps quota exhausted", async () => {
  const fetchImpl = async () =>
    jsonResponse(403, { error: "nope" }, { "x-access-error": "taste_exhausted" });

  const result = await handleAdobeFireflyImageGeneration({
    model: "nano-banana-pro",
    provider: "adobe-firefly",
    body: { prompt: "test" },
    credentials: { apiKey: "eyJhbGciOiJIUzI1NiJ9.e30.signature" },
    fetchImpl: fetchImpl as typeof fetch,
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 429);
  assert.match(String(result.error), /quota/i);
});

test("adobeFireflyGenerateImage cookie path exchanges IMS token first", async () => {
  const urls: string[] = [];
  const fetchImpl = async (url: string, init?: RequestInit) => {
    urls.push(String(url));
    if (String(url).includes("ims/check")) {
      assert.equal(init?.method, "POST");
      return jsonResponse(200, { access_token: "exchanged-jwt.part.sig" });
    }
    if (String(url).includes("generate-async")) {
      const auth = (init?.headers as any)?.Authorization || (init?.headers as Headers)?.get?.("Authorization");
      // headers object from buildAdobeSubmitHeaders
      const headerAuth =
        typeof init?.headers === "object" && init.headers && !("get" in (init.headers as object))
          ? (init.headers as Record<string, string>).Authorization
          : auth;
      assert.equal(headerAuth, "Bearer exchanged-jwt.part.sig");
      return jsonResponse(
        200,
        {},
        { "x-override-status-link": "https://poll.example/job/c1" }
      );
    }
    if (String(url).includes("poll.example")) {
      return jsonResponse(200, {
        outputs: [{ image: { presignedUrl: "https://cdn.example/cookie.png" } }],
      });
    }
    throw new Error(`unexpected ${url}`);
  };

  // Use the image handler which resolves credentials (cookie → IMS).
  const result = await handleAdobeFireflyImageGeneration({
    model: "nano-banana-pro",
    provider: "adobe-firefly",
    body: { prompt: "cookie path" },
    credentials: { apiKey: "s_ecid=abc; sessionToken=xyz; other=1" },
    fetchImpl: fetchImpl as typeof fetch,
  });
  assert.equal(result.success, true);
  assert.ok(urls.some((u) => u.includes("ims/check")));
  assert.ok(urls.some((u) => u.includes("generate-async")));
});
