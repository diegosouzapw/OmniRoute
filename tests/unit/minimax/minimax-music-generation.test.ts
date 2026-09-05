import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-minimax-music-"));

const { handleMusicGeneration } = await import("../../../open-sse/handlers/musicGeneration.ts");
const { MUSIC_PROVIDERS } = await import("../../../open-sse/config/musicRegistry.ts");

const GLOBAL_ENDPOINT = MUSIC_PROVIDERS.minimax.baseUrl;
const REGIONAL_ENDPOINT = MUSIC_PROVIDERS.minimax.regionalBaseUrl as string;

interface Captured {
  url: string;
  authorization: string;
  contentType: string;
  body: Record<string, unknown>;
}

/** Installs a fetch stub answering every call with `payload`, capturing the request. */
function stubFetch(payload: unknown, status = 200) {
  const captured: Captured[] = [];
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async (url: string | URL | Request, options: RequestInit = {}) => {
    const headers = new Headers(options.headers ?? {});
    captured.push({
      url: String(url),
      authorization: headers.get("authorization") ?? "",
      contentType: headers.get("content-type") ?? "",
      body: JSON.parse(String(options.body ?? "{}")) as Record<string, unknown>,
    });
    return new Response(JSON.stringify(payload), {
      status,
      headers: { "content-type": "application/json" },
    });
  }) as typeof globalThis.fetch;

  return {
    captured,
    restore() {
      globalThis.fetch = originalFetch;
    },
  };
}

test("minimax is registered with the music models it serves and no query endpoint", () => {
  const provider = MUSIC_PROVIDERS.minimax;
  const modelIds = provider.models.map((model) => model.id);

  assert.equal(provider.format, "minimax-music");
  assert.equal(provider.authHeader, "bearer");
  assert.equal(provider.statusUrl, undefined);
  assert.ok(REGIONAL_ENDPOINT, "a regional endpoint must be declared");
  assert.notEqual(new URL(REGIONAL_ENDPOINT).host, new URL(GLOBAL_ENDPOINT).host);
  assert.deepEqual(modelIds, [
    "music-3.0",
    "music-2.6",
    "music-3.0-free",
    "music-2.6-free",
    "music-cover",
    "music-cover-free",
  ]);
});

test("handleMusicGeneration dispatches minimax-music and normalizes the audio URL", async () => {
  const stub = stubFetch({
    data: { status: 2, audio: "https://example.com/minimax-music.mp3" },
    base_resp: { status_code: 0, status_msg: "success" },
  });

  try {
    const result = await handleMusicGeneration({
      body: {
        model: "minimax/music-3.0",
        prompt: "warm lo-fi guitar loop",
        lyrics: "##first line\nsecond line##",
        is_instrumental: false,
        lyrics_optimizer: true,
        audio_setting: { format: "wav", sample_rate: 44100, bitrate: 256000, bogus: "drop-me" },
        aigc_watermark: true,
      },
      credentials: { apiKey: "minimax-key" },
      log: null,
    });

    assert.equal(stub.captured.length, 1);
    const request = stub.captured[0];
    assert.equal(request.url, GLOBAL_ENDPOINT);
    assert.equal(request.authorization, "Bearer minimax-key");
    assert.equal(request.contentType, "application/json");
    assert.equal(request.body.model, "music-3.0");
    assert.equal(request.body.prompt, "warm lo-fi guitar loop");
    assert.equal(request.body.lyrics, "##first line\nsecond line##");
    assert.equal(request.body.stream, false);
    assert.equal(request.body.output_format, "url");
    assert.equal(request.body.is_instrumental, false);
    assert.equal(request.body.lyrics_optimizer, true);
    assert.deepEqual(request.body.audio_setting, {
      sample_rate: 44100,
      bitrate: 256000,
      format: "wav",
    });
    // The watermark field only exists on the regional endpoint.
    assert.ok(!("aigc_watermark" in request.body));

    assert.equal(result.success, true);
    assert.deepEqual(result.data.data, [
      { url: "https://example.com/minimax-music.mp3", format: "wav" },
    ]);
  } finally {
    stub.restore();
  }
});

test("minimax-music forwards cover inputs and honors the hex output format", async () => {
  const stub = stubFetch({
    data: { status: 2, audio: "48656c6c6f" },
    base_resp: { status_code: 0 },
  });

  try {
    const result = await handleMusicGeneration({
      body: {
        model: "minimax/music-cover",
        prompt: "cover this take",
        output_format: "HEX",
        audio_url: "https://example.com/reference.mp3",
        cover_feature_id: "feature-1",
      },
      credentials: { accessToken: "minimax-token" },
      log: null,
    });

    const request = stub.captured[0];
    assert.equal(request.body.model, "music-cover");
    assert.equal(request.body.output_format, "hex");
    assert.equal(request.body.audio_url, "https://example.com/reference.mp3");
    assert.equal(request.body.cover_feature_id, "feature-1");

    assert.equal(result.success, true);
    assert.deepEqual(result.data.data, [
      { b64_json: Buffer.from("Hello").toString("base64"), format: "mp3" },
    ]);
  } finally {
    stub.restore();
  }
});

test("minimax-music targets the regional endpoint via the connection base URL", async () => {
  const stub = stubFetch({
    data: { status: 2, audio: "https://example.com/regional.mp3" },
    base_resp: { status_code: 0 },
  });

  try {
    const result = await handleMusicGeneration({
      body: { model: "minimax/music-2.6", prompt: "guzheng ballad", aigc_watermark: true },
      credentials: {
        apiKey: "minimax-key",
        providerSpecificData: { baseUrl: REGIONAL_ENDPOINT },
      },
      log: null,
    });

    const request = stub.captured[0];
    assert.equal(request.url, REGIONAL_ENDPOINT);
    assert.equal(request.body.aigc_watermark, true);
    assert.equal(result.success, true);
  } finally {
    stub.restore();
  }
});

test("minimax-music surfaces base_resp failures returned with HTTP 200", async () => {
  const stub = stubFetch({ base_resp: { status_code: 1004, status_msg: "invalid api key" } });

  try {
    const logged: string[] = [];
    const result = await handleMusicGeneration({
      body: { model: "minimax/music-3.0", prompt: "x" },
      credentials: { apiKey: "minimax-key" },
      log: { info: () => {}, error: (_scope: string, message: string) => logged.push(message) },
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.equal(result.error, "invalid api key");
    assert.equal(logged.length, 1);
  } finally {
    stub.restore();
  }
});

test("minimax-music reports an unfinished generation instead of polling", async () => {
  const stub = stubFetch({ data: { status: 1 }, base_resp: { status_code: 0 } });

  try {
    const result = await handleMusicGeneration({
      body: { model: "minimax/music-3.0-free", prompt: "x" },
      credentials: { apiKey: "minimax-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.match(result.error, /still in progress/);
  } finally {
    stub.restore();
  }
});

test("minimax-music rejects a completed response that carries no audio", async () => {
  const stub = stubFetch({ data: { status: 2 }, base_resp: { status_code: 0 } });

  try {
    const result = await handleMusicGeneration({
      body: { model: "minimax/music-3.0", prompt: "x" },
      credentials: { apiKey: "minimax-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 502);
    assert.match(result.error, /returned no audio/);
  } finally {
    stub.restore();
  }
});

test("minimax-music propagates upstream HTTP failures", async () => {
  const stub = stubFetch({ base_resp: { status_code: 2013, status_msg: "invalid params" } }, 400);

  try {
    const result = await handleMusicGeneration({
      body: { model: "minimax/music-3.0", prompt: "x" },
      credentials: { apiKey: "minimax-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 400);
    assert.equal(result.error, "invalid params");
  } finally {
    stub.restore();
  }
});

test("minimax-music refuses to call upstream without a credential", async () => {
  const stub = stubFetch({});

  try {
    const result = await handleMusicGeneration({
      body: { model: "minimax/music-3.0", prompt: "x" },
      credentials: null,
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 401);
    assert.equal(stub.captured.length, 0);
  } finally {
    stub.restore();
  }
});
