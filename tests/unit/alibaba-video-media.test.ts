import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-alibaba-video-media-"));

const { VIDEO_PROVIDERS, parseVideoModel } = await import("../../open-sse/config/videoRegistry.ts");
const { resolveProviderServiceKinds } = await import("../../open-sse/config/mediaServiceKinds.ts");
const { handleVideoGeneration } = await import("../../open-sse/handlers/videoGeneration.ts");

const ADDED_ALIBABA_VIDEO_MODELS = [
  "happyhorse-1.1-i2v",
  "happyhorse-1.1-t2v",
  "happyhorse-1.1-r2v",
  "happyhorse-1.0-video-edit",
  "wan2.7-i2v-2026-04-25",
  "wan2.6-i2v-flash",
  "wan2.7-t2v-2026-06-12",
  "wan2.7-r2v-2026-06-12",
  "wan2.7-videoedit",
];

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function immediateTimeout(callback, _ms, ...args) {
  if (typeof callback === "function") callback(...args);
  return 0;
}

async function captureAlibabaRequest(body, region = "global-sg") {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  let captured;

  globalThis.setTimeout = immediateTimeout;
  globalThis.fetch = async (url, options = {}) => {
    const stringUrl = String(url);
    if (stringUrl.endsWith("/services/aigc/video-generation/video-synthesis")) {
      captured = {
        url: stringUrl,
        headers: options.headers,
        body: JSON.parse(String(options.body || "{}")),
      };
      return jsonResponse({ output: { task_id: "alibaba-video-task", task_status: "PENDING" } });
    }
    if (stringUrl.endsWith("/tasks/alibaba-video-task")) {
      return jsonResponse({
        output: {
          task_status: "SUCCEEDED",
          video_url: "https://cdn.example.com/alibaba-video.mp4",
        },
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  };

  try {
    const result = await handleVideoGeneration({
      body,
      credentials: {
        apiKey: "alibaba-video-key",
        providerSpecificData: { region },
      },
      log: null,
    });
    return { captured, result };
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
}

test("Alibaba exposes the nine added video models without changing Qwen Cloud lists", () => {
  const alibabaModels = VIDEO_PROVIDERS.alibaba.models.map((model) => model.id);
  assert.deepEqual(alibabaModels, ADDED_ALIBABA_VIDEO_MODELS);
  assert.equal(
    VIDEO_PROVIDERS["qwen-cloud"].models.some(
      (model) =>
        model.id === "wan2.7-i2v-2026-04-25" ||
        model.id === "wan2.6-i2v-flash" ||
        model.id === "wan2.7-t2v-2026-06-12"
    ),
    false
  );
  assert.deepEqual(parseVideoModel("ali/wan2.6-i2v-flash"), {
    provider: "alibaba",
    model: "wan2.6-i2v-flash",
  });
  assert.deepEqual(resolveProviderServiceKinds("alibaba", ["llm"]).sort(), [
    "image",
    "llm",
    "video",
  ]);
});

test("Alibaba HappyHorse I2V uses only the Alibaba key and selected regional endpoint", async () => {
  const { captured, result } = await captureAlibabaRequest(
    {
      model: "alibaba/happyhorse-1.1-i2v",
      image_url: "https://cdn.example.com/horse.png",
      resolution: "720p",
      duration: 5,
    },
    "china-beijing"
  );

  assert.equal(
    captured.url,
    "https://dashscope.aliyuncs.com/api/v1/services/aigc/video-generation/video-synthesis"
  );
  assert.equal(captured.headers.Authorization, "Bearer alibaba-video-key");
  assert.deepEqual(captured.body.input.media, [
    { type: "first_frame", url: "https://cdn.example.com/horse.png" },
  ]);
  assert.deepEqual(captured.body.parameters, {
    resolution: "720P",
    duration: 5,
  });
  assert.equal(result.success, true);
});

test("Alibaba Wan I2V variants map first-frame and driving-audio media", async () => {
  for (const model of ["wan2.7-i2v-2026-04-25", "wan2.6-i2v-flash"]) {
    const { captured } = await captureAlibabaRequest({
      model: `alibaba/${model}`,
      image_url: "https://cdn.example.com/first.png",
      audio_url: "https://cdn.example.com/voice.mp3",
      duration: 10,
    });

    assert.equal(captured.body.model, model);
    assert.deepEqual(captured.body.input.media, [
      { type: "first_frame", url: "https://cdn.example.com/first.png" },
      { type: "driving_audio", url: "https://cdn.example.com/voice.mp3" },
    ]);
    assert.equal(captured.body.parameters.duration, 10);
    assert.equal("ratio" in captured.body.parameters, false);
  }
});

test("Alibaba dated Wan T2V maps modern resolution, ratio, and audio input", async () => {
  const { captured } = await captureAlibabaRequest({
    model: "alibaba/wan2.7-t2v-2026-06-12",
    prompt: "A cinematic horse race",
    audio_url: "https://cdn.example.com/score.mp3",
    size: "1920x1080",
    duration: 10,
    prompt_extend: true,
  });

  assert.deepEqual(captured.body.input, {
    prompt: "A cinematic horse race",
    audio_url: "https://cdn.example.com/score.mp3",
  });
  assert.deepEqual(captured.body.parameters, {
    resolution: "1080P",
    ratio: "16:9",
    duration: 10,
    prompt_extend: true,
  });
});

test("Alibaba Wan R2V preserves ordered image, video, and voice references", async () => {
  const { captured } = await captureAlibabaRequest({
    model: "alibaba/wan2.7-r2v-2026-06-12",
    prompt: "Video 1 greets Image 1",
    media: [
      {
        type: "reference_video",
        url: "https://cdn.example.com/actor.mp4",
        reference_voice: "https://cdn.example.com/actor.mp3",
      },
      {
        type: "reference_image",
        url: "https://cdn.example.com/prop.png",
      },
    ],
    ratio: "16:9",
  });

  assert.deepEqual(captured.body.input.media, [
    {
      type: "reference_video",
      url: "https://cdn.example.com/actor.mp4",
      reference_voice: "https://cdn.example.com/actor.mp3",
    },
    {
      type: "reference_image",
      url: "https://cdn.example.com/prop.png",
    },
  ]);
  assert.equal(captured.body.parameters.ratio, "16:9");
});

test("Alibaba video-edit models require and map a source video", async () => {
  for (const model of ["happyhorse-1.0-video-edit", "wan2.7-videoedit"]) {
    const { captured } = await captureAlibabaRequest({
      model: `alibaba/${model}`,
      prompt: "Replace the jacket with the reference image",
      video_url: "https://cdn.example.com/source.mp4",
      reference_images: ["https://cdn.example.com/jacket.png"],
      resolution: "1080P",
    });

    assert.deepEqual(captured.body.input.media, [
      { type: "video", url: "https://cdn.example.com/source.mp4" },
      { type: "reference_image", url: "https://cdn.example.com/jacket.png" },
    ]);
    assert.equal(captured.body.parameters.resolution, "1080P");
  }
});

test("Alibaba media-specific video models reject missing input locally", async () => {
  for (const [model, errorPattern] of [
    ["happyhorse-1.1-i2v", /image input is required/i],
    ["happyhorse-1.1-r2v", /image input is required/i],
    ["happyhorse-1.0-video-edit", /video input is required/i],
    ["wan2.7-i2v-2026-04-25", /image input is required/i],
    ["wan2.6-i2v-flash", /image input is required/i],
    ["wan2.7-r2v-2026-06-12", /reference image or video input is required/i],
    ["wan2.7-videoedit", /video input is required/i],
  ]) {
    const result = await handleVideoGeneration({
      body: {
        model: `alibaba/${model}`,
        prompt: "missing media",
      },
      credentials: { apiKey: "alibaba-video-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.equal(result.status, 400);
    assert.match(result.error, errorPattern);
  }
});

test("Alibaba rejects video models outside its own allowlist", async () => {
  const result = await handleVideoGeneration({
    body: {
      model: "alibaba/wan2.7-t2v",
      prompt: "not part of the Alibaba allowlist",
    },
    credentials: { apiKey: "alibaba-video-key" },
    log: null,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /unsupported alibaba video model/i);
});
