import { describe, it } from "node:test";
import assert from "node:assert/strict";

const catalog = await import("../../open-sse/services/syntxMediaCatalog.ts");
const media = await import("../../open-sse/services/syntxMedia.ts");
const { IMAGE_PROVIDERS, parseImageModel, getImageModelEntry } = await import(
  "../../open-sse/config/imageRegistry.ts"
);
const { VIDEO_PROVIDERS, parseVideoModel } = await import("../../open-sse/config/videoRegistry.ts");
const { AUDIO_SPEECH_PROVIDERS, AUDIO_TRANSCRIPTION_PROVIDERS, parseSpeechModel, parseTranscriptionModel } =
  await import("../../open-sse/config/audioRegistry.ts");
const { MUSIC_PROVIDERS, parseMusicModel } = await import("../../open-sse/config/musicRegistry.ts");
const { UPSCALE_PROVIDERS, parseUpscaleModel } = await import("../../open-sse/config/upscaleRegistry.ts");
const { mapSyntxModel } = await import("../../open-sse/services/syntxModels.ts");

function fakeJwt(): string {
  return (
    "eyJhbGciOiJub25lIn0." +
    Buffer.from(JSON.stringify({ sub: "1", exp: Math.floor(Date.now() / 1000) + 3600 })).toString(
      "base64url"
    ) +
    ".x"
  );
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

describe("SYNTX media catalog", () => {
  it("parses ai_name/model_type ids and infers seed models", () => {
    assert.deepEqual(catalog.parseSyntxMediaModelId("sora-images/gpt-image-2"), {
      aiName: "sora-images",
      modelType: "gpt-image-2",
    });
    assert.equal(catalog.parseSyntxMediaModelId("gpt-image-2").aiName, "sora-images");
    assert.equal(catalog.inferSyntxMediaKind("wan_video"), "video");
    assert.equal(catalog.inferSyntxMediaKind("elevenlabs"), "speech");
    assert.equal(catalog.inferSyntxMediaKind("suno"), "music");
    assert.equal(catalog.inferSyntxMediaKind("magnific"), "upscale");
    assert.equal(catalog.inferSyntxMediaKind("chatgpt"), null);
  });

  it("classifies live catalog rows using service scope, skipping text AIs", () => {
    const services = catalog.parseSyntxAiServices([
      { value: "sora-images", scope: "image" },
      { value: "wan_video", scope: "video" },
      { value: "chatgpt", scope: "text" },
    ]);
    const models = catalog.parseSyntxMediaModelsCatalog(
      {
        models: [
          { value: "gpt-image-2", label: "GPT Image 2", ai_name: "sora-images", active: true },
          { value: "wan-2.6", label: "Wan 2.6", ai_name: "wan_video", active: true },
          { value: "gpt-5-nano-2025-08-07", label: "GPT-5 Nano", ai_name: "chatgpt", active: true },
        ],
      },
      services
    );
    assert.equal(models.length, 2);
    assert.equal(models[0].id, "sora-images/gpt-image-2");
    assert.equal(models[0].kind, "image");
    assert.equal(models[1].kind, "video");
  });

  it("classifies suno as music even when the service scope is audio", () => {
    const models = catalog.parseSyntxMediaModelsCatalog(
      {
        models: [
          { value: "chirp-v4", label: "Suno V4", ai_name: "suno", active: true },
          { value: "eleven_multilingual_v2", label: "Eleven", ai_name: "elevenlabs", active: true },
        ],
      },
      catalog.parseSyntxAiServices([
        { value: "suno", scope: "audio" },
        { value: "elevenlabs", scope: "audio" },
      ])
    );
    assert.equal(models.find((row) => row.aiName === "suno")?.kind, "music");
    assert.equal(models.find((row) => row.aiName === "elevenlabs")?.kind, "speech");
  });

  it("registers syntx in every media registry OmniRoute Media uses", () => {
    assert.equal(IMAGE_PROVIDERS.syntx.format, "syntx-image");
    assert.ok(IMAGE_PROVIDERS.syntx.models.some((row) => row.id === "sora-images/gpt-image-2"));
    assert.equal(VIDEO_PROVIDERS.syntx.format, "syntx-video");
    assert.equal(AUDIO_SPEECH_PROVIDERS.syntx.format, "syntx-audio");
    assert.equal(AUDIO_TRANSCRIPTION_PROVIDERS.syntx.format, "syntx-audio");
    assert.equal(MUSIC_PROVIDERS.syntx.format, "syntx-music");
    assert.equal(UPSCALE_PROVIDERS.syntx.format, "syntx-upscale");
  });

  it("parses provider/ai_name/model ids without stealing chat models", () => {
    assert.deepEqual(parseImageModel("syntx/sora-images/gpt-image-2"), {
      provider: "syntx",
      model: "sora-images/gpt-image-2",
    });
    assert.deepEqual(parseVideoModel("syntx/wan_video/wan-2.6"), {
      provider: "syntx",
      model: "wan_video/wan-2.6",
    });
    assert.deepEqual(parseSpeechModel("syntx/elevenlabs/eleven_multilingual_v2"), {
      provider: "syntx",
      model: "elevenlabs/eleven_multilingual_v2",
    });
    assert.deepEqual(parseTranscriptionModel("syntx/transcribe"), {
      provider: "syntx",
      model: "transcribe",
    });
    assert.deepEqual(parseMusicModel("syntx/suno/chirp-v4"), {
      provider: "syntx",
      model: "suno/chirp-v4",
    });
    assert.deepEqual(parseUpscaleModel("syntx/magnific/magnific"), {
      provider: "syntx",
      model: "magnific/magnific",
    });
    assert.equal(getImageModelEntry("syntx/claude-sonnet-5"), null);
    assert.ok(getImageModelEntry("syntx/sora-images/gpt-image-2"));
  });

  it("does not change chat model mapping", () => {
    assert.equal(mapSyntxModel("syntx/claude-sonnet-5"), "claude-sonnet-5");
    assert.equal(mapSyntxModel("stx/gpt-5.4"), "gpt-5.4");
  });

  it("keeps image/video/upscale/speech/music ids on disjoint routes", () => {
    const imageIds = new Set(IMAGE_PROVIDERS.syntx.models.map((row) => row.id));
    const videoIds = new Set(VIDEO_PROVIDERS.syntx.models.map((row) => row.id));
    const speechIds = new Set(AUDIO_SPEECH_PROVIDERS.syntx.models.map((row) => row.id));
    const musicIds = new Set(MUSIC_PROVIDERS.syntx.models.map((row) => row.id));
    const upscaleIds = new Set(UPSCALE_PROVIDERS.syntx.models.map((row) => row.id));
    const overlap = (left, right) => [...left].filter((id) => right.has(id));
    assert.deepEqual(overlap(imageIds, videoIds), []);
    assert.deepEqual(overlap(imageIds, upscaleIds), []);
    assert.deepEqual(overlap(speechIds, musicIds), []);
    assert.ok(imageIds.has("kling-kolors/kling-kolors"));
    assert.ok(videoIds.has("kling/kling-2.1"));
    assert.ok(!videoIds.has("kling-kolors/kling-kolors"));
    assert.ok(!upscaleIds.has("ideogram/ideogram"));
    assert.ok(upscaleIds.has("ideogram/upscale"));
    assert.ok(videoIds.has("topaz_astra/topaz_astra"));
    assert.ok(!upscaleIds.has("topaz_astra/topaz_astra"));
    assert.equal(catalog.inferSyntxMediaKind("kling-kolors"), "image");
    assert.equal(catalog.inferSyntxMediaKind("kling"), "video");
    assert.equal(catalog.inferSyntxMediaKind("topaz_astra"), "video");
    assert.equal(catalog.inferSyntxMediaKind("topaz_ai"), "upscale");
    assert.equal(catalog.inferSyntxMediaKind("sora-images"), "image");
    assert.equal(catalog.inferSyntxMediaKind("sora"), "video");
  });

  it("keeps ideogram/upscale on the upscale route even when the live service scope is image", () => {
    const models = catalog.parseSyntxMediaModelsCatalog(
      {
        models: [
          { value: "ideogram", label: "Ideogram", ai_name: "ideogram", active: true },
          { value: "upscale", label: "Ideogram Upscale", ai_name: "ideogram", active: true },
          { value: "magnific", label: "Magnific", ai_name: "magnific", active: true },
        ],
      },
      catalog.parseSyntxAiServices([
        { value: "ideogram", scope: "image" },
        { value: "magnific", scope: "upscale" },
      ])
    );
    assert.equal(models.find((row) => row.id === "ideogram/ideogram")?.kind, "image");
    assert.equal(models.find((row) => row.id === "ideogram/upscale")?.kind, "upscale");
    assert.equal(models.find((row) => row.id === "magnific/magnific")?.kind, "upscale");
    assert.ok(!IMAGE_PROVIDERS.syntx.models.some((row) => row.id === "ideogram/upscale"));
  });

  it("exposes per-model selectable params instead of one generic size list", () => {
    const gptImage = IMAGE_PROVIDERS.syntx.models.find((row) => row.id === "sora-images/gpt-image-2");
    const midjourney = IMAGE_PROVIDERS.syntx.models.find((row) => row.id === "midjourney/midjourney");
    const seedreamRow = IMAGE_PROVIDERS.syntx.models.find((row) => row.id === "seedream/seedream-4.5");
    const grokI2v = VIDEO_PROVIDERS.syntx.models.find((row) => row.id === "grok_video/grok_i2v");
    const gptSizes = gptImage?.mediaCapabilities?.supported_sizes;
    const mjRatios = midjourney?.mediaCapabilities?.supported_aspect_ratios;
    const seedreamRes = seedreamRow?.mediaCapabilities?.supported_resolutions;
    const grokRefs = grokI2v?.mediaCapabilities?.reference_inputs;
    assert.ok(Array.isArray(gptSizes) && gptSizes.includes("1024x1024"));
    assert.equal(gptImage?.mediaCapabilities?.supported_aspect_ratios, undefined);
    assert.ok(Array.isArray(mjRatios) && mjRatios.includes("16:9"));
    assert.ok(!midjourney?.supportedSizes?.includes("720x1280"));
    assert.ok(Array.isArray(seedreamRes) && seedreamRes.includes("2K"));
    assert.equal(Array.isArray(grokRefs) && grokRefs[0]?.min_items, 1);
    assert.deepEqual(IMAGE_PROVIDERS.syntx.supportedSizes, []);

    const grokI2iPro = IMAGE_PROVIDERS.syntx.models.find((row) => row.id === "grok_image/grok_i2i_pro");
    assert.equal(grokI2iPro?.mediaCapabilities?.supported_aspect_ratios, undefined);
    const suno = MUSIC_PROVIDERS.syntx.models.find((row) => row.id === "suno/chirp-v4");
    assert.deepEqual(suno?.mediaCapabilities?.supported_durations, [30, 60, 120]);
    assert.ok(!suno?.mediaCapabilities?.supported_durations?.includes(15));
  });
});

describe("SYNTX media provider rules", () => {
  it("drops aspect_ratio for grok_i2i_pro like the MCP SDK", () => {
    const settings = { model_type: "grok_i2i_pro", aspect_ratio: "1:1", resolution: "1k" };
    media.applySyntxProviderRules("grok_image", settings, { modelType: "grok_i2i_pro" });
    assert.equal(settings.aspect_ratio, undefined);
    assert.equal(settings.resolution, "1k");
  });

  it("drops aspect_ratio in ideogram upscale mode", () => {
    const settings = { mode: "upscale", aspect_ratio: "1:1", resolution: "1024x1024" };
    media.applySyntxProviderRules("ideogram", settings, { modelType: "upscale" });
    assert.equal(settings.aspect_ratio, undefined);
    assert.equal(settings.resolution, "1024x1024");
  });

  it("coerces seedream-4.5 1K to 2K", () => {
    const settings = { model_type: "seedream-4.5", resolution: "1K" };
    media.applySyntxProviderRules("seedream", settings, { modelType: "seedream-4.5" });
    assert.equal(settings.resolution, "2K");
  });

  it("strips suno continue keys in generate mode", () => {
    const settings = { mode: "generate", audio_url: "https://x", source_clip_id: "1" };
    media.applySyntxProviderRules("suno", settings, { modelType: "chirp-v4" });
    assert.equal(settings.audio_url, undefined);
    assert.equal(settings.source_clip_id, undefined);
  });

  it("maps Media-page size/quality onto the SPA settings each ai_name expects", () => {
    const gpt = media.mapSyntxImageRequestSettings("sora-images", "gpt-image-2", {
      size: "1024x1536",
      quality: "high",
      n: 2,
    });
    assert.equal(gpt.resolution, "1024x1536");
    assert.equal(gpt.quality, "high");
    assert.equal(gpt.n, 2);

    const flux = media.mapSyntxImageRequestSettings("flux", "flux-pro", {
      size: "16:9",
      quality: "auto",
    });
    assert.equal(flux.aspect_ratio, "16:9");
    assert.equal(flux.quality, undefined);
    assert.equal(flux.resolution, undefined);

    const seedream = media.mapSyntxImageRequestSettings("seedream", "seedream-4.5", {
      size: "1:1",
      quality: "2K",
    });
    assert.equal(seedream.aspect_ratio, "1:1");
    assert.equal(seedream.resolution, "2K");

    const grokVideo = media.mapSyntxVideoRequestSettings("grok_video", "grok_t2v", {
      duration: 5,
      quality: "720p",
      aspect_ratio: "16:9",
    });
    assert.equal(grokVideo.video_duration, 5);
    assert.equal(grokVideo.duration, undefined);
    assert.equal(grokVideo.resolution, "720p");
    assert.equal(grokVideo.aspect_ratio, "16:9");

    const speech = media.mapSyntxAudioRequestSettings("elevenlabs", "eleven_multilingual_v2", {
      voice: "alloy",
      input: "hi",
    });
    assert.equal(speech.voice_id, undefined);
  });
});

describe("SYNTX media poll projection", () => {
  it("treats image-only replies as ready when every object is completed", () => {
    const projection = media.collectSyntxCompletedMedia({
      author_id: -1,
      message_object: [
        {
          object_type: "image",
          object_url: "https://r2.syntx.ai/out.png",
          object_text: "",
          completed: true,
        },
      ],
    });
    assert.equal(projection.ready, true);
    assert.equal(projection.media[0].url, "https://r2.syntx.ai/out.png");
    assert.equal(projection.text, "");
  });

  it("waits while any object is still incomplete", () => {
    const projection = media.collectSyntxCompletedMedia({
      author_id: -1,
      message_object: [
        { object_type: "video", object_url: null, completed: false },
      ],
    });
    assert.equal(projection.ready, false);
  });
});

describe("SYNTX media generate flow", () => {
  it("creates an image-scoped chat, posts design/generate, then polls media URLs", async () => {
    const calls: Array<{ method: string; url: string; body?: unknown }> = [];
    const fetchImpl = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = (init?.method || "GET").toUpperCase();
      let body: unknown;
      if (typeof init?.body === "string") {
        try {
          body = JSON.parse(init.body);
        } catch {
          body = init.body;
        }
      }
      calls.push({ method, url, body });
      if (url.endsWith("/api/v1/chats") && method === "POST") {
        const rec = (body || {}) as Record<string, unknown>;
        assert.equal(rec.scope, "image");
        return jsonResponse({ uuid: "chat-image-1" });
      }
      if (url.includes("/api/v1/design/generate") && method === "POST") {
        const rec = (body || {}) as Record<string, unknown>;
        assert.equal(rec.chat_uuid, "chat-image-1");
        assert.equal(rec.prompt, "a cat");
        const settings = rec.settings as Record<string, unknown>;
        assert.equal(settings.model_type, "gpt-image-2");
        assert.ok(url.includes("ai_name=sora-images"));
        return jsonResponse({ ok: true });
      }
      if (url.includes("/api/v1/chats/chat-image-1/messages")) {
        return jsonResponse({
          messages: [
            {
              author_id: -1,
              created_at: "2026-01-01T00:00:00.000Z",
              message_object: [
                {
                  object_type: "image",
                  object_url: "https://r2.syntx.ai/cat.png",
                  completed: true,
                },
              ],
            },
          ],
        });
      }
      return jsonResponse({ error: "unexpected " + url }, 500);
    }) as typeof fetch;

    const result = await media.runSyntxImageGeneration({
      token: fakeJwt(),
      model: "sora-images/gpt-image-2",
      prompt: "a cat",
      pollIntervalMs: 1,
      timeoutMs: 2000,
      fetchImpl,
    });
    assert.equal(result.chatUuid, "chat-image-1");
    assert.equal(result.media[0].url, "https://r2.syntx.ai/cat.png");
    assert.ok(calls.some((call) => call.url.includes("/api/v1/design/generate")));
  });

  it("posts video generate with chat_id (not chat_uuid) like the MCP SDK", async () => {
    const fetchImpl = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      const method = (init?.method || "GET").toUpperCase();
      let body: unknown;
      if (typeof init?.body === "string") {
        try {
          body = JSON.parse(init.body);
        } catch {
          body = init.body;
        }
      }
      if (url.endsWith("/api/v1/chats") && method === "POST") {
        assert.equal((body as { scope: string }).scope, "video");
        return jsonResponse({ uuid: "chat-video-1" });
      }
      if (url.includes("/api/v1/video/generate")) {
        const rec = body as Record<string, unknown>;
        assert.equal(rec.chat_id, "chat-video-1");
        assert.equal(rec.chat_uuid, undefined);
        assert.deepEqual(rec.file_urls, ["https://r2.syntx.ai/frame.png"]);
        assert.ok(url.includes("ai_name=wan_video"));
        return jsonResponse({ ok: true });
      }
      if (url.includes("/messages")) {
        return jsonResponse({
          messages: [
            {
              author_id: -1,
              message_object: [
                { object_type: "video", object_url: "https://r2.syntx.ai/out.mp4", completed: true },
              ],
            },
          ],
        });
      }
      return jsonResponse({}, 500);
    }) as typeof fetch;

    const result = await media.runSyntxVideoGeneration({
      token: fakeJwt(),
      model: "wan_video/wan-2.6",
      prompt: "walk on the beach",
      fileUrls: ["https://r2.syntx.ai/frame.png"],
      pollIntervalMs: 1,
      timeoutMs: 2000,
      fetchImpl,
    });
    assert.equal(result.media[0].url, "https://r2.syntx.ai/out.mp4");
  });

  it("transcribes via POST /api/v1/audio/transcribe multipart", async () => {
    const fetchImpl = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      assert.ok(url.endsWith("/api/v1/audio/transcribe"));
      assert.equal((init?.method || "GET").toUpperCase(), "POST");
      const contentType = String((init?.headers as Record<string, string>)["content-type"] || "");
      assert.match(contentType, /multipart\/form-data/);
      return jsonResponse({ text: "hello world" });
    }) as typeof fetch;

    const text = await media.transcribeSyntxAudio({
      token: fakeJwt(),
      bytes: new Uint8Array([1, 2, 3, 4]),
      filename: "clip.mp3",
      mimeType: "audio/mpeg",
      fetchImpl,
    });
    assert.equal(text, "hello world");
  });
});
