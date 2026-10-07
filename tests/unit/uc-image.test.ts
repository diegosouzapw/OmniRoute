import { test } from "node:test";
import assert from "node:assert";
import {
  resolveUcImageModel,
  ucAspectToSize,
  extractUcDirectImages,
  handleUcImageGeneration,
  UC_PERSONA_IMAGE_URL,
  UC_DIRECT_IMAGE_URL,
} from "../../open-sse/handlers/imageGeneration/providers/ucImage.ts";
import { IMAGE_PROVIDERS, parseImageModel } from "../../open-sse/config/imageRegistry.ts";
import { isUcClerkMintUrl } from "./helpers/ucClerkUrl.ts";

// A valid PERSONA credential (durable Clerk cookie + sid + uid in psd). No API
// key, so the handler takes the persona web path (mint -> POST -> poll).
const PERSONA_CRED = {
  providerSpecificData: {
    ucClientCookie: "clientcookie-abc",
    ucSid: "sess_123",
    ucUid: "b03dd963-d0c1-4193-99c9-f5a9d0c66b7f",
    ucCookies: { __client: "clientcookie-abc", __cf_bm: "cf" },
  },
};

// A valid uc-direct metered credential (X-api-key). Presence of a uai_ key
// routes to the REST OpenAI-compatible path.
const DIRECT_CRED = { apiKey: "uai_sk_live_deadbeef" };

// A 60s Clerk JWT with a `uid` claim, exp far in the future (so the mint succeeds
// and expiry decoding is happy). header.payload.sig; only payload matters here.
function fakeJwt(uid: string, expEpoch: number): string {
  const b64 = (o: unknown) =>
    Buffer.from(JSON.stringify(o))
      .toString("base64")
      .replace(/=+$/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  return `${b64({ alg: "RS256" })}.${b64({ uid, exp: expEpoch, sub: "user_1", sid: "sess_123" })}.sig`;
}

const FUTURE_EXP = Math.floor(Date.now() / 1000) + 60;

// --- Registry ------------------------------------------------------------

test("uc is registered in IMAGE_PROVIDERS with the uc-image format + 22 models", () => {
  const entry = (
    IMAGE_PROVIDERS as Record<string, { format?: string; baseUrl?: string; models?: unknown[] }>
  )["uc"];
  assert.ok(entry, "uc must exist in IMAGE_PROVIDERS");
  assert.equal(entry.format, "uc-image");
  assert.match(String(entry.baseUrl), /internal\.chatuncensored\.ai\/v2\/image-gen/);
  assert.equal((entry.models ?? []).length, 22);
});

test("uc image models require an explicit prefix when an existing provider owns the bare id", () => {
  assert.deepEqual(parseImageModel("uc/nano-banana"), {
    provider: "uc",
    model: "nano-banana",
  });
  assert.deepEqual(parseImageModel("uc/z-image-turbo"), {
    provider: "uc",
    model: "z-image-turbo",
  });
  assert.deepEqual(parseImageModel("nano-banana"), {
    provider: "adobe-firefly",
    model: "nano-banana",
  });
  assert.deepEqual(parseImageModel("z-image-turbo"), {
    provider: "nanogpt",
    model: "z-image-turbo",
  });
});

// --- Pure helpers --------------------------------------------------------

test("resolveUcImageModel strips uc/ and uc-direct/ prefixes", () => {
  assert.equal(resolveUcImageModel("uc/seedream-v4.5"), "seedream-v4.5");
  assert.equal(resolveUcImageModel("uc-direct/seedream-v5"), "seedream-v5");
  assert.equal(resolveUcImageModel("nano-banana-pro"), "nano-banana-pro");
  assert.equal(resolveUcImageModel(undefined), "");
});

test("ucAspectToSize maps explicit aspect ratios to string width/height", () => {
  assert.deepEqual(ucAspectToSize("1:1"), {
    aspect_ratio: "1:1",
    imageWidth: "1024",
    imageHeight: "1024",
  });
  assert.deepEqual(ucAspectToSize("16:9"), {
    aspect_ratio: "16:9",
    imageWidth: "1024",
    imageHeight: "576",
  });
  assert.deepEqual(ucAspectToSize("9:16"), {
    aspect_ratio: "9:16",
    imageWidth: "576",
    imageHeight: "1024",
  });
  assert.deepEqual(ucAspectToSize("4:3"), {
    aspect_ratio: "4:3",
    imageWidth: "1024",
    imageHeight: "768",
  });
  assert.deepEqual(ucAspectToSize("3:4"), {
    aspect_ratio: "3:4",
    imageWidth: "768",
    imageHeight: "1024",
  });
});

test("ucAspectToSize snaps OpenAI WxH sizes to the nearest aspect bucket", () => {
  // Square -> 1:1
  assert.equal(ucAspectToSize("512x512").aspect_ratio, "1:1");
  // Wide -> 16:9
  assert.equal(ucAspectToSize("1920x1080").aspect_ratio, "16:9");
  // Tall -> 9:16
  assert.equal(ucAspectToSize("1080x1920").aspect_ratio, "9:16");
  // Landscape-ish 4:3
  assert.equal(ucAspectToSize("800x600").aspect_ratio, "4:3");
  // Unknown / absent -> default 1:1
  assert.equal(ucAspectToSize(undefined).aspect_ratio, "1:1");
  assert.equal(ucAspectToSize("garbage").aspect_ratio, "1:1");
});

test("extractUcDirectImages pulls url and b64_json items", () => {
  assert.deepEqual(
    extractUcDirectImages({ created: 1, data: [{ url: "https://x/a.png" }, { b64_json: "AAAA" }] }),
    [{ url: "https://x/a.png" }, { b64_json: "AAAA" }]
  );
  assert.deepEqual(extractUcDirectImages({ data: [] }), []);
  assert.deepEqual(extractUcDirectImages(null), []);
});

// --- Persona handler (mocked mint -> POST -> poll) -----------------------

// Builds a fetch that mints a JWT, accepts the image-gen POST (returns the
// pending result URL), then serves the result URL as 403 (pending) N times
// before finally 200. Records the calls so we can assert on them.
function personaFetch(opts: {
  pendingPolls: number;
  resultUrl: string;
  jwt: string;
  onImagePost?: (body: Record<string, unknown>, headers: Record<string, string>) => void;
}): typeof fetch {
  let pollsSeen = 0;
  return (async (url: string, init: RequestInit = {}) => {
    // 1) Clerk mint
    if (isUcClerkMintUrl(url)) {
      return {
        ok: true,
        status: 200,
        headers: { get: () => "" },
        async text() {
          return JSON.stringify({ object: "token", jwt: opts.jwt });
        },
      } as unknown as Response;
    }
    // 2) image-gen POST
    if (url === UC_PERSONA_IMAGE_URL) {
      opts.onImagePost?.(JSON.parse(String(init.body)), init.headers as Record<string, string>);
      return {
        ok: true,
        status: 200,
        async json() {
          return { status: "pending", url: opts.resultUrl, request_id: "req_1" };
        },
        async text() {
          return "";
        },
      } as unknown as Response;
    }
    // 3) result URL polling
    if (url === opts.resultUrl) {
      pollsSeen += 1;
      const ready = pollsSeen > opts.pendingPolls;
      return {
        ok: ready,
        status: ready ? 200 : 403,
        async text() {
          return "";
        },
      } as unknown as Response;
    }
    throw new Error(`unexpected fetch to ${url}`);
  }) as unknown as typeof fetch;
}

const noSleep = async () => {};

test("handleUcImageGeneration (persona) mints, posts, polls to 200, returns the url", async () => {
  const resultUrl = "https://gen.moveinwater.com/img_uid_uuid.png";
  let postedBody: Record<string, unknown> = {};
  let postedHeaders: Record<string, string> = {};
  const fetchImpl = personaFetch({
    pendingPolls: 2, // 403, 403, then 200
    resultUrl,
    jwt: fakeJwt("b03dd963-d0c1-4193-99c9-f5a9d0c66b7f", FUTURE_EXP),
    onImagePost: (b, h) => {
      postedBody = b;
      postedHeaders = h;
    },
  });

  const result = (await handleUcImageGeneration({
    model: "uc/seedream-v4.5",
    provider: "uc",
    body: { prompt: "a red cube on a wooden table", aspect_ratio: "16:9" },
    credentials: PERSONA_CRED,
    fetchImpl,
    sleepImpl: noSleep,
  })) as { success: boolean; data?: { data: Array<{ url: string }> } };

  assert.equal(result.success, true);
  assert.deepEqual(result.data?.data, [{ url: resultUrl }]);
  // The image-gen POST carried the spec-shaped web body.
  assert.equal(postedBody.model_version, "seedream-v4.5");
  assert.equal(postedBody.mode, "dev");
  assert.equal(postedBody.m_n_user, true);
  assert.equal(postedBody.moderationMode, "SUPER_LIGHT");
  assert.equal(postedBody.aspect_ratio, "16:9");
  assert.equal(postedBody.imageWidth, "1024");
  assert.equal(postedBody.imageHeight, "576");
  assert.equal(postedBody.country, "US");
  assert.equal(postedBody.vdiscount, false);
  // Auth + origin headers were attached.
  assert.match(String(postedHeaders.Authorization), /^Bearer /);
  assert.equal(postedHeaders.Origin, "https://uncensored.com");
});

test("handleUcImageGeneration (persona) 401s (retryable) when the credential is missing", async () => {
  const result = (await handleUcImageGeneration({
    model: "uc/seedream-v4.5",
    provider: "uc",
    body: { prompt: "x" },
    credentials: {}, // no psd, no api key
    fetchImpl: (async () => {
      throw new Error("should not fetch");
    }) as unknown as typeof fetch,
    sleepImpl: noSleep,
  })) as { success: boolean; status?: number; retryable?: boolean };
  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.equal(result.retryable, true);
});

test("handleUcImageGeneration (persona) times out with 504 when the result never readies", async () => {
  const resultUrl = "https://gen.moveinwater.com/img_never.png";
  const fetchImpl = personaFetch({
    // The injected no-op sleep can execute more than 1,000 polls inside 5 ms on
    // fast runners, so use an unbounded pending count to make the timeout deterministic.
    pendingPolls: Number.POSITIVE_INFINITY,
    resultUrl,
    jwt: fakeJwt("uid", FUTURE_EXP),
  });
  const result = (await handleUcImageGeneration({
    model: "uc/seedream-v5",
    provider: "uc",
    body: { prompt: "x", timeout_ms: 5, poll_interval_ms: 1 },
    credentials: PERSONA_CRED,
    fetchImpl,
    sleepImpl: noSleep,
  })) as { success: boolean; status?: number };
  assert.equal(result.success, false);
  assert.equal(result.status, 504);
});

test("handleUcImageGeneration (persona) surfaces a Clerk mint failure", async () => {
  const fetchImpl = (async (url: string) => {
    if (isUcClerkMintUrl(url)) {
      return {
        ok: false,
        status: 401,
        headers: { get: () => "" },
        async text() {
          return "unauthorized";
        },
      } as unknown as Response;
    }
    throw new Error("should not reach image-gen");
  }) as unknown as typeof fetch;

  const result = (await handleUcImageGeneration({
    model: "uc/seedream-v4.5",
    provider: "uc",
    body: { prompt: "x" },
    credentials: PERSONA_CRED,
    fetchImpl,
    sleepImpl: noSleep,
  })) as { success: boolean; status?: number; retryable?: boolean };
  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.equal(result.retryable, true);
});

// --- Direct REST handler (mocked fetch) ----------------------------------

test("handleUcImageGeneration (direct) returns OpenAI image data on success", async () => {
  let capturedUrl = "";
  let capturedBody: Record<string, unknown> = {};
  let capturedHeaders: Record<string, string> = {};
  const fetchImpl = (async (url: string, init: RequestInit) => {
    capturedUrl = url;
    capturedBody = JSON.parse(String(init.body));
    capturedHeaders = init.headers as Record<string, string>;
    return {
      ok: true,
      status: 200,
      async json() {
        return { created: 123, data: [{ url: "https://cdn/x.png" }] };
      },
      async text() {
        return "";
      },
    } as unknown as Response;
  }) as unknown as typeof fetch;

  const result = (await handleUcImageGeneration({
    model: "uc-direct/seedream-v5",
    provider: "uc",
    body: { prompt: "a blue sphere", size: "1024x1024", n: 2 },
    credentials: DIRECT_CRED,
    fetchImpl,
  })) as { success: boolean; data?: { created: number; data: Array<{ url: string }> } };

  assert.equal(result.success, true);
  assert.deepEqual(result.data?.data, [{ url: "https://cdn/x.png" }]);
  assert.equal(result.data?.created, 123);
  assert.equal(capturedUrl, UC_DIRECT_IMAGE_URL);
  assert.equal(capturedBody.model, "seedream-v5");
  assert.equal(capturedBody.n, 2);
  assert.equal(capturedBody.size, "1024x1024");
  // X-api-key auth (exact casing), no Bearer.
  assert.equal(capturedHeaders["X-api-key"], "uai_sk_live_deadbeef");
});

test("handleUcImageGeneration (direct) 429 is retryable, 402/403 are not", async () => {
  function directErr(status: number) {
    return (async () =>
      ({
        ok: false,
        status,
        async text() {
          return "err";
        },
      }) as unknown as Response) as unknown as typeof fetch;
  }

  const rate = (await handleUcImageGeneration({
    model: "uc-direct/seedream-v5",
    provider: "uc",
    body: { prompt: "x" },
    credentials: DIRECT_CRED,
    fetchImpl: directErr(429),
  })) as { success: boolean; status?: number; retryable?: boolean };
  assert.equal(rate.success, false);
  assert.equal(rate.status, 429);
  assert.equal(rate.retryable, true);

  const funds = (await handleUcImageGeneration({
    model: "uc-direct/seedream-v5",
    provider: "uc",
    body: { prompt: "x" },
    credentials: DIRECT_CRED,
    fetchImpl: directErr(402),
  })) as { success: boolean; status?: number; retryable?: boolean };
  assert.equal(funds.success, false);
  assert.equal(funds.status, 402);
  assert.equal(funds.retryable, undefined);
});

test("handleUcImageGeneration rejects an empty prompt with 400 (both surfaces)", async () => {
  const result = (await handleUcImageGeneration({
    model: "uc/seedream-v4.5",
    provider: "uc",
    body: { prompt: "   " },
    credentials: DIRECT_CRED,
    fetchImpl: (async () => {
      throw new Error("should not fetch");
    }) as unknown as typeof fetch,
  })) as { success: boolean; status?: number };
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
});
