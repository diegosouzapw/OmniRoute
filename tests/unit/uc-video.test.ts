import { test } from "node:test";
import assert from "node:assert";
import {
  resolveUcVideoModel,
  isUcDirectVideoCredential,
  resolveUcInputImage,
  buildUcPersonaVideoBody,
  extractUcDirectVideo,
  handleUcVideoGeneration,
  UC_PERSONA_SIGNED_URL,
  UC_PERSONA_IMAGE_TO_VIDEO_URL,
  UC_PERSONA_TEXT_TO_VIDEO_URL,
  UC_DIRECT_VIDEO_URL,
} from "../../open-sse/handlers/videoGeneration/providers/ucVideo.ts";
import { VIDEO_PROVIDERS } from "../../open-sse/config/videoRegistry.ts";
import { isUcClerkMintUrl } from "./helpers/ucClerkUrl.ts";

// A valid PERSONA credential (durable Clerk cookie + sid + uid in psd). No API
// key, so the handler takes the persona web path (mint -> generate -> poll).
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

// A 60s Clerk JWT with a `uid` claim, exp far in the future.
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
const noSleep = async () => {};

// --- Registry ------------------------------------------------------------

test("uc is registered in VIDEO_PROVIDERS with the uc-video format", () => {
  const entry = (
    VIDEO_PROVIDERS as Record<string, { format?: string; baseUrl?: string; models?: unknown[] }>
  )["uc"];
  assert.ok(entry, "uc must exist in VIDEO_PROVIDERS");
  assert.equal(entry.format, "uc-video");
  assert.match(String(entry.baseUrl), /chatuncensored\.ai/);
  assert.ok((entry.models ?? []).some((m) => (m as { id?: string }).id === "wan-2.2-spicy"));
  assert.ok((entry.models ?? []).some((m) => (m as { id?: string }).id === "seedance-2.0"));
});

// --- Pure helpers --------------------------------------------------------

test("resolveUcVideoModel strips uc/ and uc-direct/ prefixes and defaults", () => {
  assert.equal(resolveUcVideoModel("uc/wan-2.2-spicy"), "wan-2.2-spicy");
  assert.equal(resolveUcVideoModel("uc-direct/t2v-turbo"), "t2v-turbo");
  assert.equal(resolveUcVideoModel("seedance-2.0"), "seedance-2.0");
  // Empty / absent -> persona default.
  assert.equal(resolveUcVideoModel(undefined), "wan-2.2-spicy");
  assert.equal(resolveUcVideoModel("uc/"), "wan-2.2-spicy");
});

test("isUcDirectVideoCredential is true only for uai_ keys", () => {
  assert.equal(isUcDirectVideoCredential({ apiKey: "uai_sk_live_x" }), true);
  assert.equal(isUcDirectVideoCredential({ apiKey: "sk-other" }), false);
  assert.equal(isUcDirectVideoCredential({}), false);
});

test("resolveUcInputImage picks the first image-ish field, else null", () => {
  assert.equal(resolveUcInputImage({ image: "https://x/a.png" }), "https://x/a.png");
  assert.equal(
    resolveUcInputImage({ image_url: "data:image/png;base64,AAA" }),
    "data:image/png;base64,AAA"
  );
  assert.equal(resolveUcInputImage({ input_image: "b64payload" }), "b64payload");
  assert.equal(resolveUcInputImage({ prompt: "x" }), null);
});

test("buildUcPersonaVideoBody carries capture-confirmed defaults + blob name", () => {
  const b = buildUcPersonaVideoBody("a logo", "wan-2.2-spicy", {}, "blob_1");
  assert.equal(b.prompt, "a logo");
  assert.equal(b.media_blob_name, "blob_1");
  assert.equal(b.num_frames, 81);
  assert.equal(b.frames_per_second, 16);
  assert.equal(b.num_inference_steps, 30);
  assert.equal(b.guide_scale, 5);
  assert.equal(b.shift, 5);
  assert.equal(b.aspect_ratio, "auto");
  assert.equal(b.pro_mode, false);
  assert.equal(b.turbo, false);
  assert.equal(b.resolution, "480p");
  assert.equal(b.sora_resolution, "480p");
  assert.equal(b.end_frame_blob_name, null);
  assert.equal(b.model, "wan-2.2-spicy");
  assert.equal(b.seconds, 5);
  assert.equal(b.video_to_video_duration, 5);
  assert.equal(b.vdiscount, false);
  // text-to-video: null blob.
  assert.equal(buildUcPersonaVideoBody("x", "wan-2.2-spicy", {}, null).media_blob_name, null);
});

test("extractUcDirectVideo tolerates several async shapes", () => {
  assert.deepEqual(
    extractUcDirectVideo({ data: [{ url: "https://cdn/v.mp4" }] }).url,
    "https://cdn/v.mp4"
  );
  assert.deepEqual(extractUcDirectVideo({ url: "https://cdn/top.mp4" }).url, "https://cdn/top.mp4");
  assert.deepEqual(
    extractUcDirectVideo({ video: { url: "https://cdn/nested.mp4" } }).url,
    "https://cdn/nested.mp4"
  );
  const job = extractUcDirectVideo({
    status: "pending",
    status_url: "https://api/s/1",
    id: "job_1",
  });
  assert.equal(job.status, "pending");
  assert.equal(job.statusUrl, "https://api/s/1");
  assert.equal(job.requestId, "job_1");
  assert.deepEqual(extractUcDirectVideo(null), {});
});

// --- Persona text-to-video (mint -> generate -> HEAD poll) ----------------

// Builds a fetch that mints a JWT, accepts the generate POST (returns the
// pre-determined result URL), then serves the result URL as 403 (pending) N
// times before finally 200. Records calls so we can assert on them.
function personaFetch(opts: {
  pendingPolls: number;
  resultUrl: string;
  jwt: string;
  expectSigned?: boolean;
  onGenerate?: (
    url: string,
    body: Record<string, unknown>,
    headers: Record<string, string>
  ) => void;
  onSigned?: (body: Record<string, unknown>) => void;
  onPut?: (url: string, init: RequestInit) => void;
}): typeof fetch {
  let pollsSeen = 0;
  return (async (url: string, init: RequestInit = {}) => {
    // Clerk mint
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
    // signed-url POST
    if (url === UC_PERSONA_SIGNED_URL) {
      opts.onSigned?.(JSON.parse(String(init.body)));
      return {
        ok: true,
        status: 200,
        async json() {
          return { signed_url: "https://d.moveinwater.com/up/tok", blob_name: "blob_xyz" };
        },
        async text() {
          return "";
        },
      } as unknown as Response;
    }
    // PUT upload to signed URL
    if (url.startsWith("https://d.moveinwater.com/up/")) {
      opts.onPut?.(url, init);
      return {
        ok: true,
        status: 200,
        async text() {
          return "";
        },
      } as unknown as Response;
    }
    // generate POST (text_to_video or image_to_video)
    if (url === UC_PERSONA_TEXT_TO_VIDEO_URL || url === UC_PERSONA_IMAGE_TO_VIDEO_URL) {
      opts.onGenerate?.(url, JSON.parse(String(init.body)), init.headers as Record<string, string>);
      return {
        ok: true,
        status: 200,
        async json() {
          return {
            request_id: "req_v1",
            message: "Request in progress",
            thumbnail_url: "https://d.moveinwater.com/thumb",
            url: opts.resultUrl,
            eta_seconds: 43,
            timeout_seconds: 267,
          };
        },
        async text() {
          return "";
        },
      } as unknown as Response;
    }
    // result URL HEAD polling
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

test("handleUcVideoGeneration (persona t2v) mints, posts text_to_video, polls to 200", async () => {
  const resultUrl = "https://videogen.moveinwater.com/uid_ts_uuid";
  let genUrl = "";
  let genBody: Record<string, unknown> = {};
  let genHeaders: Record<string, string> = {};
  const fetchImpl = personaFetch({
    pendingPolls: 2, // 403, 403, then 200
    resultUrl,
    jwt: fakeJwt("b03dd963-d0c1-4193-99c9-f5a9d0c66b7f", FUTURE_EXP),
    onGenerate: (u, b, h) => {
      genUrl = u;
      genBody = b;
      genHeaders = h;
    },
  });

  const result = (await handleUcVideoGeneration({
    model: "uc/wan-2.2-spicy",
    provider: "uc",
    body: { prompt: "generate an animated logo", poll_interval_ms: 1 },
    credentials: PERSONA_CRED,
    fetchImpl,
    sleepImpl: noSleep,
  })) as { success: boolean; data?: { data: Array<{ url: string; format: string }> } };

  assert.equal(result.success, true);
  assert.equal(result.data?.data[0].url, resultUrl);
  assert.equal(result.data?.data[0].format, "mp4");
  // Took the text_to_video path (no input image).
  assert.equal(genUrl, UC_PERSONA_TEXT_TO_VIDEO_URL);
  assert.equal(genBody.model, "wan-2.2-spicy");
  assert.equal(genBody.media_blob_name, null);
  assert.equal(genBody.num_frames, 81);
  assert.match(String(genHeaders.Authorization), /^Bearer /);
  assert.equal(genHeaders.Origin, "https://uncensored.com");
});

test("handleUcVideoGeneration (persona i2v) uploads then posts image_to_video", async () => {
  const resultUrl = "https://videogen.moveinwater.com/uid_ts_i2v";
  let signedBody: Record<string, unknown> = {};
  let putSeen = false;
  let genUrl = "";
  let genBody: Record<string, unknown> = {};
  const fetchImpl = personaFetch({
    pendingPolls: 1,
    resultUrl,
    jwt: fakeJwt("b03dd963-d0c1-4193-99c9-f5a9d0c66b7f", FUTURE_EXP),
    onSigned: (b) => {
      signedBody = b;
    },
    onPut: () => {
      putSeen = true;
    },
    onGenerate: (u, b) => {
      genUrl = u;
      genBody = b;
    },
  });

  const result = (await handleUcVideoGeneration({
    model: "uc/wan-2.2-spicy",
    provider: "uc",
    body: {
      prompt: "animate this",
      image: "data:image/png;base64,iVBORw0KGgo=",
      poll_interval_ms: 1,
    },
    credentials: PERSONA_CRED,
    fetchImpl,
    sleepImpl: noSleep,
  })) as { success: boolean; data?: { data: Array<{ url: string }> } };

  assert.equal(result.success, true);
  assert.equal(result.data?.data[0].url, resultUrl);
  // 3-step flow ran: signed-url carried the uid, PUT happened, generate used the blob.
  assert.equal(signedBody.user_identifier, "b03dd963-d0c1-4193-99c9-f5a9d0c66b7f");
  assert.equal(signedBody.content_type, "image/png");
  assert.equal(putSeen, true);
  assert.equal(genUrl, UC_PERSONA_IMAGE_TO_VIDEO_URL);
  assert.equal(genBody.media_blob_name, "blob_xyz");
});

test("handleUcVideoGeneration (persona) 401s (retryable) when credential missing", async () => {
  const result = (await handleUcVideoGeneration({
    model: "uc/wan-2.2-spicy",
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

test("handleUcVideoGeneration (persona) times out with 504 when never ready", async () => {
  const resultUrl = "https://videogen.moveinwater.com/never";
  const fetchImpl = personaFetch({
    pendingPolls: 1000,
    resultUrl,
    jwt: fakeJwt("uid", FUTURE_EXP),
  });
  const result = (await handleUcVideoGeneration({
    model: "uc/wan-2.2-spicy",
    provider: "uc",
    body: { prompt: "x", timeout_ms: 5, poll_interval_ms: 1 },
    credentials: PERSONA_CRED,
    fetchImpl,
    sleepImpl: noSleep,
  })) as { success: boolean; status?: number };
  assert.equal(result.success, false);
  assert.equal(result.status, 504);
});

test("handleUcVideoGeneration (persona) surfaces a Clerk mint failure", async () => {
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
    throw new Error("should not reach generate");
  }) as unknown as typeof fetch;

  const result = (await handleUcVideoGeneration({
    model: "uc/wan-2.2-spicy",
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

test("handleUcVideoGeneration (direct) returns the url when the submit is complete", async () => {
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
        return { status: "completed", data: [{ url: "https://cdn/v.mp4" }] };
      },
      async text() {
        return "";
      },
    } as unknown as Response;
  }) as unknown as typeof fetch;

  const result = (await handleUcVideoGeneration({
    model: "uc-direct/seedance-2.0",
    provider: "uc",
    body: { prompt: "a blue sphere spinning", resolution: "480p", duration: 5 },
    credentials: DIRECT_CRED,
    fetchImpl,
    sleepImpl: noSleep,
  })) as { success: boolean; data?: { data: Array<{ url: string }> } };

  assert.equal(result.success, true);
  assert.equal(result.data?.data[0].url, "https://cdn/v.mp4");
  assert.equal(capturedUrl, UC_DIRECT_VIDEO_URL);
  assert.equal(capturedBody.model, "seedance-2.0");
  assert.equal(capturedBody.resolution, "480p");
  assert.equal(capturedBody.duration, 5);
  // X-api-key auth (exact casing), no Bearer.
  assert.equal(capturedHeaders["X-api-key"], "uai_sk_live_deadbeef");
});

test("handleUcVideoGeneration (direct) polls status_url until complete", async () => {
  let submits = 0;
  let statusPolls = 0;
  const fetchImpl = (async (url: string, init: RequestInit = {}) => {
    if (url === UC_DIRECT_VIDEO_URL) {
      submits += 1;
      return {
        ok: true,
        status: 200,
        async json() {
          return {
            status: "pending",
            status_url: "https://api.uncensored.com/api/v1/videos/status/1",
            id: "job_1",
          };
        },
        async text() {
          return "";
        },
      } as unknown as Response;
    }
    if (url === "https://api.uncensored.com/api/v1/videos/status/1") {
      // Status poll carries the X-api-key too.
      assert.equal((init.headers as Record<string, string>)["X-api-key"], "uai_sk_live_deadbeef");
      statusPolls += 1;
      const done = statusPolls >= 2;
      return {
        ok: true,
        status: 200,
        async json() {
          return done
            ? { status: "completed", url: "https://cdn/done.mp4" }
            : { status: "processing" };
        },
        async text() {
          return "";
        },
      } as unknown as Response;
    }
    throw new Error(`unexpected fetch to ${url}`);
  }) as unknown as typeof fetch;

  const result = (await handleUcVideoGeneration({
    model: "uc-direct/t2v-standard",
    provider: "uc",
    body: { prompt: "x", poll_interval_ms: 1, timeout_ms: 60000 },
    credentials: DIRECT_CRED,
    fetchImpl,
    sleepImpl: noSleep,
  })) as { success: boolean; data?: { data: Array<{ url: string }> } };

  assert.equal(result.success, true);
  assert.equal(result.data?.data[0].url, "https://cdn/done.mp4");
  assert.equal(submits, 1);
  assert.equal(statusPolls, 2);
});

test("handleUcVideoGeneration (direct) returns a job id when callback-only", async () => {
  const fetchImpl = (async () =>
    ({
      ok: true,
      status: 200,
      async json() {
        return { status: "queued", id: "job_async_7" };
      },
      async text() {
        return "";
      },
    }) as unknown as Response) as unknown as typeof fetch;

  const result = (await handleUcVideoGeneration({
    model: "uc-direct/i2v-pro",
    provider: "uc",
    body: { prompt: "x" },
    credentials: DIRECT_CRED,
    fetchImpl,
    sleepImpl: noSleep,
  })) as { success: boolean; data?: { data: Array<{ request_id?: string; status?: string }> } };

  assert.equal(result.success, true);
  assert.equal(result.data?.data[0].request_id, "job_async_7");
  assert.equal(result.data?.data[0].status, "queued");
});

test("handleUcVideoGeneration (direct) 429 retryable, 402/403 not", async () => {
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

  const rate = (await handleUcVideoGeneration({
    model: "uc-direct/t2v-turbo",
    provider: "uc",
    body: { prompt: "x" },
    credentials: DIRECT_CRED,
    fetchImpl: directErr(429),
    sleepImpl: noSleep,
  })) as { success: boolean; status?: number; retryable?: boolean };
  assert.equal(rate.success, false);
  assert.equal(rate.status, 429);
  assert.equal(rate.retryable, true);

  const funds = (await handleUcVideoGeneration({
    model: "uc-direct/t2v-turbo",
    provider: "uc",
    body: { prompt: "x" },
    credentials: DIRECT_CRED,
    fetchImpl: directErr(402),
    sleepImpl: noSleep,
  })) as { success: boolean; status?: number; retryable?: boolean };
  assert.equal(funds.success, false);
  assert.equal(funds.status, 402);
  assert.equal(funds.retryable, undefined);
});

test("handleUcVideoGeneration rejects an empty prompt with 400 (both surfaces)", async () => {
  const result = (await handleUcVideoGeneration({
    model: "uc/wan-2.2-spicy",
    provider: "uc",
    body: { prompt: "   " },
    credentials: DIRECT_CRED,
    fetchImpl: (async () => {
      throw new Error("should not fetch");
    }) as unknown as typeof fetch,
    sleepImpl: noSleep,
  })) as { success: boolean; status?: number };
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
});
