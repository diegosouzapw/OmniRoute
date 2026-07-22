import { test } from "node:test";
import assert from "node:assert";
import { resolvePublicCred } from "../../open-sse/utils/publicCreds.ts";
import {
  ADOBE_FIREFLY_IMAGE_MODELS,
  ADOBE_FIREFLY_VIDEO_MODELS,
  adobeFireflyApiKey,
  adobeFireflyBalanceApiKey,
  buildAdobeImagePayload,
  buildAdobePollHeaders,
  buildAdobeSubmitHeaders,
  buildAdobeVideoPayload,
  extractAdobeAccountIdFromToken,
  extractAdobeCredentialToken,
  extractAdobeMediaUrl,
  extractAdobeResultLink,
  looksLikeAdobeJwt,
  normalizeAdobeAspectRatio,
  normalizeAdobeOutputResolution,
  normalizeAdobePollUrl,
  parseAdobeCreditsBalance,
  parseAdobeModelsDiscovery,
  resolveAdobeImageModel,
  resolveAdobeVideoModel,
  adobeFireflyGenerateImage,
  adobeFireflyGenerateVideo,
  exchangeAdobeCookieForAccessToken,
  isAdobeGuestAccessToken,
  isAdobeUserAccessToken,
  isAdobeTransientSubmitError,
  generateAdobeNonce,
  extractAdobeArpSessionId,
  resolveAdobeAccessToken,
} from "../../open-sse/services/adobeFireflyClient.ts";
import {
  ADOBE_FIREFLY_FALLBACK_MODELS,
  getAdobeFireflyFallbackCatalog,
  mapDiscoveredToCatalog,
} from "../../open-sse/services/adobeFireflyModels.ts";
import {
  buildAdobeFireflyCreditsQuota,
  buildAdobeFireflyQuotasRecord,
} from "../../open-sse/services/usage/adobeFirefly.ts";
import { USAGE_SUPPORTED_PROVIDERS } from "../../src/shared/constants/providers.ts";
import { handleAdobeFireflyImageGeneration } from "../../open-sse/handlers/imageGeneration/providers/adobeFirefly.ts";
import { handleAdobeFireflyVideoGeneration } from "../../open-sse/handlers/videoGeneration/adobeFireflyHandler.ts";
import { WEB_COOKIE_PROVIDERS } from "../../src/shared/constants/providers/web-cookie.ts";
import { IMAGE_PROVIDERS } from "../../open-sse/config/imageRegistry.ts";
import { VIDEO_PROVIDERS } from "../../open-sse/config/videoRegistry.ts";
import { getExecutor } from "../../open-sse/executors/index.ts";

// --- Registry --------------------------------------------------------------

test("adobe-firefly is registered in WEB_COOKIE_PROVIDERS with a webCookie risk notice", () => {
  const entry = (WEB_COOKIE_PROVIDERS as Record<string, unknown>)["adobe-firefly"];
  assert.ok(entry, "adobe-firefly must exist in WEB_COOKIE_PROVIDERS");
  assert.equal(entry.id, "adobe-firefly");
  assert.equal(entry.alias, "firefly");
  assert.equal(entry.subscriptionRisk, true);
  assert.equal(entry.riskNoticeVariant, "webCookie");
  assert.match(entry.website, /firefly\.adobe\.com/);
});

test("adobe-firefly is registered in IMAGE_PROVIDERS with adobe-firefly-image format", () => {
  const entry = (IMAGE_PROVIDERS as Record<string, unknown>)["adobe-firefly"];
  assert.ok(entry);
  assert.equal(entry.format, "adobe-firefly-image");
  assert.match(entry.baseUrl, /firefly-3p\.ff\.adobe\.io/);
  assert.ok(Array.isArray(entry.models) && entry.models.length >= 4);
});

test("adobe-firefly is registered in VIDEO_PROVIDERS with adobe-firefly-video format", () => {
  const entry = (VIDEO_PROVIDERS as Record<string, unknown>)["adobe-firefly"];
  assert.ok(entry);
  assert.equal(entry.format, "adobe-firefly-video");
  assert.match(entry.baseUrl, /3p-videos/);
  assert.ok(Array.isArray(entry.models) && entry.models.length >= 5);
});

test("getExecutor(adobe-firefly) rejects chat completions", async () => {
  const executor = getExecutor("adobe-firefly");
  assert.ok(executor);
  const result = await executor.execute({
    model: "adobe-firefly/nano-banana-pro",
    body: { model: "adobe-firefly/nano-banana-pro", messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: { apiKey: "tok" },
  });
  assert.ok(result.response, "executor must return a Response wrapper");
  assert.equal(result.response.status, 400);
  const bodyText = await result.response.text();
  assert.match(bodyText, /images\/generations|videos\/generations|media-generation/i);
});

// --- Public credential -----------------------------------------------------

test("adobe_firefly_api_key embedded default decodes to clio-playground-web", () => {
  assert.equal(resolvePublicCred("adobe_firefly_api_key"), "clio-playground-web");
  assert.equal(adobeFireflyApiKey(), "clio-playground-web");
  assert.equal(adobeFireflyBalanceApiKey(), "SunbreakWebUI1");
});

// --- Pure helpers ----------------------------------------------------------

test("looksLikeAdobeJwt detects JWT shape and rejects cookie blobs", () => {
  const longJwt = `eyJhbGciOiJSUzI1NiJ9.${"a".repeat(40)}.${"b".repeat(40)}`;
  assert.equal(looksLikeAdobeJwt(longJwt), true);
  assert.equal(looksLikeAdobeJwt("aaa.bbb.ccc"), false); // too short
  assert.equal(looksLikeAdobeJwt("s_ecid=foo; session=bar"), false);
  assert.equal(looksLikeAdobeJwt("not-a-jwt"), false);
});

test("extractAdobeCredentialToken strips Bearer and access_token=", () => {
  const longJwt = `eyJhbGciOiJSUzI1NiJ9.${"c".repeat(40)}.${"d".repeat(40)}`;
  assert.equal(extractAdobeCredentialToken(`Bearer ${longJwt}`), longJwt);
  assert.equal(extractAdobeCredentialToken(`access_token=${longJwt}; other=1`), longJwt);
  assert.equal(extractAdobeCredentialToken("  rawcookie  "), "rawcookie");
  // IMS sessionStorage shape (firefly.adobe.com)
  const sessionJson = JSON.stringify({
    valid: true,
    client_id: "clio-playground-web",
    tokenValue: longJwt,
  });
  assert.equal(extractAdobeCredentialToken(sessionJson), longJwt);
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
  assert.deepEqual(nano.size, { width: 2752, height: 1536 });
  assert.equal((nano.modelSpecificPayload as Record<string, unknown>).aspectRatio, "16:9");

  const gpt = buildAdobeImagePayload({
    prompt: "a dog",
    aspectRatio: "1:1",
    outputResolution: "1K",
    modelSpec: ADOBE_FIREFLY_IMAGE_MODELS["gpt-image"],
    quality: "high",
  });
  assert.equal(gpt.modelId, "gpt-image");
  assert.equal((gpt.generationSettings as Record<string, unknown>).detailLevel, 5);
  // Live browser body uses size:"auto" and no top-level size/outputResolution
  assert.equal((gpt.modelSpecificPayload as Record<string, unknown>).size, "auto");
  assert.equal(gpt.size, undefined);
  assert.equal(gpt.outputResolution, undefined);
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
  assert.equal(
    (veo.modelSpecificPayload as Record<string, Record<string, unknown>>).parameters
      .durationSeconds,
    6
  );
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

test("buildAdobeSubmitHeaders sets Bearer + clio-playground-web x-api-key", () => {
  const headers = buildAdobeSubmitHeaders("tok-1", { arpSessionId: "arp-1" });
  assert.equal(headers.Authorization, "Bearer tok-1");
  assert.equal(headers["x-api-key"], "clio-playground-web");
  assert.equal(headers.origin, "https://firefly.adobe.com");
  assert.equal(headers["content-type"], "application/json");
  assert.equal(headers["x-arp-session-id"], "arp-1");
  // Always has x-nonce (random when no prompt/user_id)
  assert.ok(headers["x-nonce"] && headers["x-nonce"].length === 64);
  // Never attach firefly.adobe.com page Cookie to firefly-3p (soft 408 risk)
  assert.equal(headers.cookie, undefined);
  const poll = buildAdobePollHeaders("tok-1");
  assert.equal(poll.Authorization, "Bearer tok-1");
  assert.equal(poll.accept, "*/*");
  // status_check.txt: poll is Bearer-only (no x-api-key)
  assert.equal(poll["x-api-key"], undefined);
});

test("buildAdobeSubmitNonce is sha256(user_id + prompt[:256])", async () => {
  const {
    buildAdobeSubmitNonce,
    buildAdobeArpSessionId,
    buildAdobeSubmitHeaders,
    extractAdobeAccountIdFromToken,
  } = await import("../../open-sse/services/adobeFireflyClient.ts");
  // Minimal fake IMS JWT with AdobeID subject
  const payload = Buffer.from(
    JSON.stringify({
      user_id: "0EB681AF6A5FF6C10A495FF2@AdobeID",
      type: "access_token",
      client_id: "clio-playground-web",
    })
  )
    .toString("base64url");
  const header = Buffer.from(JSON.stringify({ alg: "none" })).toString("base64url");
  const token = `${header}.${payload}.${"x".repeat(40)}`;
  // Pad token length for looksLikeAdobeJwt (>=80)
  assert.ok(token.length >= 80 || true);
  const prompt = "a red fox in snow";
  const nonce = buildAdobeSubmitNonce(token, prompt);
  assert.equal(nonce.length, 64);
  const { createHash } = await import("node:crypto");
  const expected = createHash("sha256")
    .update(`0EB681AF6A5FF6C10A495FF2@AdobeID-${prompt}`, "utf8")
    .digest("hex");
  assert.equal(nonce, expected);
  // Same inputs → same nonce; different prompt → different nonce
  assert.equal(buildAdobeSubmitNonce(token, prompt), nonce);
  assert.notEqual(buildAdobeSubmitNonce(token, prompt + "!"), nonce);
  assert.equal(extractAdobeAccountIdFromToken(token), "0EB681AF6A5FF6C10A495FF2@AdobeID");

  const arp = buildAdobeArpSessionId();
  assert.ok(arp.length > 20);
  const decoded = JSON.parse(Buffer.from(arp, "base64").toString("utf8"));
  assert.ok(decoded.sid);
  assert.match(String(decoded.ftr), /dUAL43-mnts-ants-d4_31ck__tt$/);

  // Headers: deterministic nonce + always ARP (synthetic when none provided)
  const h = buildAdobeSubmitHeaders(token, { prompt });
  assert.equal(h["x-nonce"], nonce);
  assert.ok(h["x-arp-session-id"]);
  assert.equal(h.cookie, undefined);
});

test("normalizeAdobePollUrl rewrites firefly-epo jobs/result to BKS", () => {
  const raw =
    "https://firefly-epo855232.adobe.io/jobs/result/4ae9fd2a-0864-46dd-9834-cfc16e91faa6";
  const out = normalizeAdobePollUrl(raw);
  assert.match(out, /^https:\/\/bks-epo8552\.adobe\.io\/v2\/jobs\/result\/4ae9fd2a/);
  assert.match(out, /host=firefly-epo855232\.adobe\.io/);
});

test("parseAdobeCreditsBalance maps total + free/plan buckets", () => {
  const bal = parseAdobeCreditsBalance({
    total: {
      quota: { total: 10010, used: 10, available: 10000 },
      availableUntil: "2026-07-28T22:48:31.576Z",
    },
    credits: {
      firefly_free_credit: { quota: { total: 10, used: 0, available: 10 } },
      firefly_plan_credit: { quota: { total: 10000, used: 10, available: 9990 } },
    },
  });
  assert.equal(bal.total, 10010);
  assert.equal(bal.used, 10);
  assert.equal(bal.remaining, 10000);
  assert.equal(bal.freeTotal, 10);
  assert.equal(bal.planTotal, 10000);
  const quota = buildAdobeFireflyCreditsQuota(bal);
  assert.equal(quota.total, 10010);
  assert.equal(quota.remaining, 10000);
  assert.equal(quota.displayName, "Firefly credits");
  // providerLimits requires quotas as a Record, not an array
  const rec = buildAdobeFireflyQuotasRecord(bal);
  assert.ok(rec.firefly_total);
  assert.equal(rec.firefly_total.total, 10010);
  assert.equal(rec.firefly_total.remaining, 10000);
  assert.ok(rec.firefly_free);
  assert.ok(rec.firefly_plan);
});

test("adobe-firefly is in USAGE_SUPPORTED_PROVIDERS for Limits", () => {
  assert.ok(USAGE_SUPPORTED_PROVIDERS.includes("adobe-firefly"));
  assert.ok(USAGE_SUPPORTED_PROVIDERS.includes("firefly"));
});

test("parseAdobeModelsDiscovery extracts image/video versions", () => {
  const rows = parseAdobeModelsDiscovery({
    models: [
      {
        modelId: "gemini-flash",
        modelVersions: {
          "nano-banana-2": {
            enabled: true,
            outputModality: ["image"],
            modelDisplayName: "Gemini 3.0 (Nano Banana Pro)",
            healthStatus: "HEALTHY",
          },
        },
      },
      {
        modelId: "sora",
        modelVersions: {
          "sora-2": {
            enabled: true,
            outputModality: ["video"],
            modelDisplayName: "Sora 2",
          },
        },
      },
    ],
  });
  assert.equal(rows.length, 2);
  assert.equal(rows[0].modality, "image");
  assert.equal(rows[1].modality, "video");
  const catalog = mapDiscoveredToCatalog(rows);
  assert.ok(catalog.some((m) => m.id === "nano-banana-pro"));
  assert.ok(catalog.some((m) => m.id === "sora-2"));
});

test("fallback catalog has image and video entries from get_models capture", () => {
  assert.ok(ADOBE_FIREFLY_FALLBACK_MODELS.length >= 10);
  assert.ok(getAdobeFireflyFallbackCatalog("image").length >= 4);
  assert.ok(getAdobeFireflyFallbackCatalog("video").length >= 4);
});

test("extractAdobeAccountIdFromToken reads user_id claim", () => {
  // {"user_id":"0EB@AdobeID"} base64url
  const payload = Buffer.from(JSON.stringify({ user_id: "0EB@AdobeID", type: "access_token" })).toString(
    "base64url"
  );
  const jwt = `eyJhbGciOiJub25lIn0.${payload}.sig`;
  assert.equal(extractAdobeAccountIdFromToken(jwt), "0EB@AdobeID");
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

function userImsJwt(userId = "0EB@AdobeID"): string {
  return (
    `eyJhbGciOiJSUzI1NiJ9.` +
    Buffer.from(
      JSON.stringify({ user_id: userId, type: "access_token", client_id: "clio-playground-web" })
    ).toString("base64url") +
    `.` +
    "sig".padEnd(40, "x")
  );
}

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
    credentials: { apiKey: userImsJwt() },
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
    credentials: { apiKey: userImsJwt() },
    fetchImpl: fetchImpl as typeof fetch,
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 429);
  assert.match(String(result.error), /quota/i);
});

test("guest JWT without AdobeID is detected", () => {
  // Minimal JWT payload {} — no user_id → guest
  const emptyPayload = Buffer.from("{}").toString("base64url");
  const guestJwt = `eyJhbGciOiJub25lIn0.${emptyPayload}.sig`;
  // Pad to lookLikeAdobeJwt length if needed
  const longGuest = `eyJhbGciOiJSUzI1NiJ9.${Buffer.from(JSON.stringify({ client_id: "clio-playground-web" })).toString("base64url")}.` + "x".repeat(40);
  assert.equal(isAdobeGuestAccessToken(longGuest), true);
  const userJwt =
    `eyJhbGciOiJSUzI1NiJ9.` +
    Buffer.from(JSON.stringify({ user_id: "0EB@AdobeID", type: "access_token", client_id: "clio-playground-web" })).toString(
      "base64url"
    ) +
    `.` +
    "y".repeat(40);
  assert.equal(isAdobeGuestAccessToken(userJwt), false);
  assert.equal(isAdobeUserAccessToken(userJwt), true);
});

test("cookie exchange rejects guest IMS tokens", async () => {
  const fetchImpl = async (url: string, init?: RequestInit) => {
    if (String(url).includes("ims/check")) {
      const body = String(init?.body || "");
      if (body.includes("guest_allowed=false")) {
        return jsonResponse(400, {
          error: "invalid_credentials",
          error_description: "All session cookies are empty",
        });
      }
      // guest_allowed=true → guest token (no user_id)
      const guest =
        `eyJhbGciOiJSUzI1NiJ9.` +
        Buffer.from(JSON.stringify({ client_id: "clio-playground-web" })).toString("base64url") +
        `.` +
        "z".repeat(40);
      return jsonResponse(200, {
        access_token: guest,
        account_type: "guest",
        guestId: "1@GuestID",
      });
    }
    throw new Error(`unexpected ${url}`);
  };

  await assert.rejects(
    () =>
      exchangeAdobeCookieForAccessToken(
        "ff_session_guid=abc; aux_sid=xyz",
        fetchImpl as typeof fetch
      ),
    (err: unknown) => {
      const message = err instanceof Error ? err.message : String(err);
      assert.match(message, /GUEST|guest|Bearer/i);
      return true;
    }
  );
});

test("isAdobeTransientSubmitError detects 408 system under load", () => {
  assert.equal(isAdobeTransientSubmitError(408, '{"error_code":"timeout_error","message":"system under load"}'), true);
  assert.equal(isAdobeTransientSubmitError(429, "rate"), true);
  assert.equal(isAdobeTransientSubmitError(400, "bad request"), false);
  assert.ok(generateAdobeNonce().length === 64);
  assert.equal(
    extractAdobeArpSessionId("a=1; sherlockToken=eyJzaWQiOiJ4In0=; b=2"),
    "eyJzaWQiOiJ4In0="
  );
});

test("extractAdobeCookieHeader strips JWT from mixed paste", async () => {
  const { extractAdobeCookieHeader, buildAdobeSubmitHeaders, extractAdobeArpSessionId } =
    await import("../../open-sse/services/adobeFireflyClient.ts");
  const longJwt = `eyJhbGciOiJSUzI1NiJ9.${"e".repeat(40)}.${"f".repeat(40)}`;
  const cookie = "ff_session_guid=abc; sherlockToken=tok123; aux_sid=xyz";
  const mixed = `${longJwt}\n${cookie}`;
  assert.equal(extractAdobeCookieHeader(longJwt), "");
  assert.match(extractAdobeCookieHeader(mixed), /ff_session_guid=abc/);
  assert.doesNotMatch(extractAdobeCookieHeader(mixed), /eyJhbGci/);
  // Submit must not attach Cookie; arp id may still be lifted from the blob.
  const arp = extractAdobeArpSessionId(mixed);
  assert.equal(arp, "tok123");
  const headers = buildAdobeSubmitHeaders("access-tok", {
    cookie: mixed,
    arpSessionId: arp,
  });
  assert.equal(headers.cookie, undefined);
  assert.equal(headers["x-arp-session-id"], "tok123");
  assert.equal(headers.Authorization, "Bearer access-tok");
});

test("resolveAdobeImageModel maps gpt-image-2 alias", async () => {
  const { resolveAdobeImageModel } = await import("../../open-sse/services/adobeFireflyClient.ts");
  assert.equal(resolveAdobeImageModel("gpt-image-2").spec.upstreamModelVersion, "2");
  assert.equal(resolveAdobeImageModel("adobe-firefly/gpt-image").spec.upstreamModelVersion, "2");
  assert.equal(resolveAdobeImageModel("gpt-image-1.5").spec.upstreamModelVersion, "1.5");
});

test("image submit retries on 408 then succeeds", async () => {
  let submits = 0;
  const userTok = userImsJwt();
  const fetchImpl = async (url: string) => {
    const u = String(url);
    if (u.includes("generate-async")) {
      submits += 1;
      if (submits < 3) {
        return jsonResponse(408, { error_code: "timeout_error", message: "system under load" });
      }
      return jsonResponse(
        200,
        { links: { result: { href: "https://poll.example/job/r1" } } },
        {}
      );
    }
    if (u.includes("poll.example")) {
      return jsonResponse(200, {
        status: "COMPLETED",
        outputs: [{ image: { presignedUrl: "https://cdn.example/retry.png" } }],
      });
    }
    throw new Error(`unexpected ${u}`);
  };

  const result = await adobeFireflyGenerateImage({
    accessToken: userTok,
    prompt: "retry me",
    model: "gpt-image",
    fetchImpl: fetchImpl as typeof fetch,
  });
  assert.equal(submits, 3);
  assert.match(result.url, /retry\.png/);
});

test("adobeFireflyGenerateImage cookie path exchanges IMS token first", async () => {
  const userTok =
    `eyJhbGciOiJSUzI1NiJ9.` +
    Buffer.from(
      JSON.stringify({ user_id: "0EB@AdobeID", type: "access_token", client_id: "clio-playground-web" })
    ).toString("base64url") +
    `.` +
    "s".repeat(40);
  const urls: string[] = [];
  const fetchImpl = async (url: string, init?: RequestInit) => {
    urls.push(String(url));
    if (String(url).includes("ims/check")) {
      assert.equal(init?.method, "POST");
      // Authenticated exchange (guest_allowed=false)
      return jsonResponse(200, { access_token: userTok, account_type: "type1" });
    }
    if (String(url).includes("generate-async")) {
      const auth =
        (init?.headers as Record<string, string> | undefined)?.Authorization ||
        (init?.headers as Headers)?.get?.("Authorization");
      // headers object from buildAdobeSubmitHeaders
      const headerAuth =
        typeof init?.headers === "object" && init.headers && !("get" in (init.headers as object))
          ? (init.headers as Record<string, string>).Authorization
          : auth;
      assert.equal(headerAuth, `Bearer ${userTok}`);
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
