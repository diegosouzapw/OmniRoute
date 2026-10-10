import test from "node:test";
import assert from "node:assert/strict";
import {
  buildFalMusicRequestBody,
  buildFalVideoRequestBody,
  handleFalMusicGeneration,
  handleFalVideoGeneration,
  normalizeFalMediaResult,
} from "../../../open-sse/handlers/mediaGeneration/fal.ts";
import { parseImageModel } from "../../../open-sse/config/imageRegistry.ts";
import { parseMusicModel } from "../../../open-sse/config/musicRegistry.ts";
import { parseVideoModel } from "../../../open-sse/config/videoRegistry.ts";

test("buildFalVideoRequestBody maps the OpenAI-compatible request", () => {
  assert.deepEqual(
    buildFalVideoRequestBody({
      prompt: "A quiet train crossing a snowy bridge",
      aspect_ratio: "9:16",
      duration: 6,
      resolution: "1080p",
      generate_audio: false,
      negative_prompt: "text overlays",
      seed: 42,
    }),
    {
      prompt: "A quiet train crossing a snowy bridge",
      aspect_ratio: "9:16",
      duration: "6s",
      resolution: "1080p",
      generate_audio: false,
      negative_prompt: "text overlays",
      seed: 42,
    }
  );
});

test("buildFalVideoRequestBody maps the Fal-hosted Grok endpoint schema", () => {
  assert.deepEqual(
    buildFalVideoRequestBody(
      {
        prompt: "A realistic dog walking through a park",
        aspect_ratio: "16:9",
        duration: "8s",
        resolution: "720p",
        generate_audio: true,
      },
      "xai/grok-imagine-video/text-to-video"
    ),
    {
      prompt: "A realistic dog walking through a park",
      aspect_ratio: "16:9",
      duration: 8,
      resolution: "720p",
    }
  );
});

test("buildFalVideoRequestBody maps one provider-neutral image reference", () => {
  assert.deepEqual(
    buildFalVideoRequestBody(
      {
        prompt: "Animate this dog",
        image_urls: ["data:image/png;base64,ZmFrZQ=="],
      },
      "xai/grok-imagine-video/text-to-video"
    ),
    {
      prompt: "Animate this dog",
      aspect_ratio: "16:9",
      duration: 6,
      resolution: "720p",
      image_url: "data:image/png;base64,ZmFrZQ==",
    }
  );
});

test("buildFalVideoRequestBody maps multiple provider-neutral image references", () => {
  assert.deepEqual(
    buildFalVideoRequestBody(
      {
        prompt: "Combine these references",
        image_urls: ["data:image/png;base64,YQ==", "data:image/png;base64,Yg=="],
      },
      "xai/grok-imagine-video/text-to-video"
    ),
    {
      prompt: "Combine these references",
      aspect_ratio: "16:9",
      duration: 6,
      resolution: "720p",
      reference_image_urls: ["data:image/png;base64,YQ==", "data:image/png;base64,Yg=="],
    }
  );
});

test("buildFalVideoRequestBody maps the Gemini Omni Flash video schema", () => {
  assert.deepEqual(
    buildFalVideoRequestBody(
      {
        prompt: "A realistic dog walking through a park",
        aspect_ratio: "9:16",
        duration: 10,
        resolution: "1080p",
        generate_audio: false,
      },
      "google/gemini-omni-flash"
    ),
    {
      prompt: "A realistic dog walking through a park",
      aspect_ratio: "9:16",
      duration: 10,
    }
  );
});

test("buildFalVideoRequestBody encodes MiniMax H3 in fal's integer/uppercase enum forms", () => {
  // H3 rejects the generic `"8s"` duration and lowercase `"720p"`: fal's OpenAPI
  // declares `duration` as integer 5…15 and `resolution` as "480P"|"768P"|"1080P".
  // Sending the shared defaults produced a 422 for every H3 call.
  assert.deepEqual(
    buildFalVideoRequestBody(
      { prompt: "A lighthouse in a storm", duration: 5 },
      "minimax/h3-max/text-to-video"
    ),
    {
      prompt: "A lighthouse in a storm",
      aspect_ratio: "16:9",
      duration: 5, // integer, not "5s"
      resolution: "768P", // 720p has no H3 tier -> its native 768P mid-tier
      generate_audio: true,
    }
  );

  // Every explicit resolution maps onto the same uppercase enum.
  assert.equal(
    buildFalVideoRequestBody({ prompt: "x", resolution: "480p" }, "minimax/h3-max/text-to-video")
      .resolution,
    "480P"
  );
  assert.equal(
    buildFalVideoRequestBody({ prompt: "x", resolution: "1080p" }, "minimax/h3/text-to-video")
      .resolution,
    "1080P"
  );

  // Duration clamps into the declared 5…15 range.
  assert.equal(
    buildFalVideoRequestBody({ prompt: "x", duration: 30 }, "minimax/h3-max/text-to-video")
      .duration,
    15
  );

  // Models outside the H3 family keep the historical lowercase/`"Ns"` defaults.
  assert.equal(buildFalVideoRequestBody({ prompt: "x" }, "fal-ai/veo3.1").resolution, "720p");
  assert.equal(buildFalVideoRequestBody({ prompt: "x" }, "fal-ai/veo3.1").duration, "8s");
});

test("handleFalVideoGeneration selects Gemini Omni Flash image-to-video", async () => {
  const originalFetch = globalThis.fetch;
  const requests: Array<{ url: string; body: string }> = [];
  globalThis.fetch = async (input, init) => {
    requests.push({ url: String(input), body: String(init?.body) });
    return new Response(JSON.stringify({ video: { url: "https://cdn.example/gemini.mp4" } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await handleFalVideoGeneration({
      model: "google/gemini-omni-flash",
      provider: "fal-ai",
      providerConfig: { baseUrl: "https://queue.fal.run" },
      body: {
        prompt: "Animate this dog",
        image_urls: ["data:image/png;base64,ZmFrZQ=="],
        duration: 8,
      },
      credentials: { apiKey: "test-key" },
    });

    assert.equal(result.success, true);
    assert.equal(requests[0]?.url, "https://queue.fal.run/google/gemini-omni-flash/image-to-video");
    assert.deepEqual(JSON.parse(requests[0]?.body || "{}"), {
      prompt: "Animate this dog",
      aspect_ratio: "16:9",
      duration: 8,
      image_url: "data:image/png;base64,ZmFrZQ==",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("buildFalMusicRequestBody uses prompt as tags and supports lyrics", () => {
  assert.deepEqual(
    buildFalMusicRequestBody({
      prompt: "warm analog synthwave",
      lyrics: "[verse] Drive through the night",
      duration: 30,
      seed: 7,
    }),
    {
      tags: "warm analog synthwave",
      lyrics: "[verse] Drive through the night",
      duration: 30,
      seed: 7,
    }
  );
});

test("normalizeFalMediaResult returns typed media URLs", () => {
  assert.deepEqual(
    normalizeFalMediaResult(
      {
        video: {
          url: "https://cdn.example/video.mp4",
          content_type: "video/mp4",
        },
      },
      "video"
    ),
    {
      success: true,
      data: {
        created: 0,
        data: [{ url: "https://cdn.example/video.mp4", format: "mp4" }],
      },
    }
  );

  assert.deepEqual(
    normalizeFalMediaResult({ audio: { url: "https://cdn.example/song.wav" } }, "music"),
    {
      success: true,
      data: {
        created: 0,
        data: [{ url: "https://cdn.example/song.wav", format: "wav" }],
      },
    }
  );
});

test("normalizeFalMediaResult rejects a missing artifact", () => {
  assert.deepEqual(normalizeFalMediaResult({}, "video"), {
    success: false,
    status: 502,
    error: "Fal video generation returned no media URL",
  });
});

test("media registries expose provider-neutral model IDs", () => {
  assert.deepEqual(parseImageModel("fal-ai/flux-2-pro"), {
    provider: "fal-ai",
    model: "flux-2-pro",
  });
  assert.deepEqual(parseVideoModel("fal-ai/veo3.1/lite"), {
    provider: "fal-ai",
    model: "veo3.1/lite",
  });
  assert.deepEqual(parseMusicModel("fal-ai/ace-step"), {
    provider: "fal-ai",
    model: "ace-step",
  });
});

test("handleFalVideoGeneration uses the provider-neutral queue contract", async () => {
  const originalFetch = globalThis.fetch;
  const requests: Array<{ url: string; body: string }> = [];
  globalThis.fetch = async (input, init) => {
    requests.push({ url: String(input), body: String(init?.body) });
    return new Response(JSON.stringify({ video: { url: "https://cdn.example/video.mp4" } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await handleFalVideoGeneration({
      model: "veo3.1/lite",
      provider: "fal-ai",
      providerConfig: { baseUrl: "https://queue.fal.run" },
      body: { prompt: "a slow pan across a forest", duration: 4 },
      credentials: { apiKey: "test-key" },
    });

    assert.equal(result.success, true);
    assert.equal(requests[0]?.url, "https://queue.fal.run/fal-ai/veo3.1/lite");
    assert.deepEqual(JSON.parse(requests[0]?.body || "{}"), {
      prompt: "a slow pan across a forest",
      aspect_ratio: "16:9",
      duration: "4s",
      resolution: "720p",
      generate_audio: true,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleFalVideoGeneration preserves Fal model paths outside the fal-ai namespace", async () => {
  const originalFetch = globalThis.fetch;
  const requests: Array<{ url: string; body: string }> = [];
  globalThis.fetch = async (input, init) => {
    requests.push({ url: String(input), body: String(init?.body) });
    return new Response(JSON.stringify({ video: { url: "https://cdn.example/grok.mp4" } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await handleFalVideoGeneration({
      model: "xai/grok-imagine-video/text-to-video",
      provider: "fal-ai",
      providerConfig: { baseUrl: "https://queue.fal.run" },
      body: { prompt: "a dog walking through a park", duration: 8 },
      credentials: { apiKey: "test-key" },
    });

    assert.equal(result.success, true);
    assert.equal(requests[0]?.url, "https://queue.fal.run/xai/grok-imagine-video/text-to-video");
    assert.deepEqual(JSON.parse(requests[0]?.body || "{}"), {
      prompt: "a dog walking through a park",
      aspect_ratio: "16:9",
      duration: 8,
      resolution: "720p",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleFalVideoGeneration selects Grok image-to-video for one reference image", async () => {
  const originalFetch = globalThis.fetch;
  const requests: Array<{ url: string; body: string }> = [];
  globalThis.fetch = async (input, init) => {
    requests.push({ url: String(input), body: String(init?.body) });
    return new Response(JSON.stringify({ video: { url: "https://cdn.example/grok-i2v.mp4" } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await handleFalVideoGeneration({
      model: "xai/grok-imagine-video/text-to-video",
      provider: "fal-ai",
      providerConfig: { baseUrl: "https://queue.fal.run" },
      body: {
        prompt: "Animate this dog",
        image_urls: ["data:image/png;base64,ZmFrZQ=="],
      },
      credentials: { apiKey: "test-key" },
    });

    assert.equal(result.success, true);
    assert.equal(requests[0]?.url, "https://queue.fal.run/xai/grok-imagine-video/image-to-video");
    assert.deepEqual(JSON.parse(requests[0]?.body || "{}"), {
      prompt: "Animate this dog",
      aspect_ratio: "16:9",
      duration: 6,
      resolution: "720p",
      image_url: "data:image/png;base64,ZmFrZQ==",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("handleFalMusicGeneration uses the provider-neutral queue contract", async () => {
  const originalFetch = globalThis.fetch;
  const requests: Array<{ url: string; body: string }> = [];
  globalThis.fetch = async (input, init) => {
    requests.push({ url: String(input), body: String(init?.body) });
    return new Response(JSON.stringify({ audio: { url: "https://cdn.example/music.wav" } }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  try {
    const result = await handleFalMusicGeneration({
      model: "ace-step",
      provider: "fal-ai",
      providerConfig: { baseUrl: "https://queue.fal.run" },
      body: { prompt: "ambient synthwave", lyrics: "stay awake", duration: 30 },
      credentials: { apiKey: "test-key" },
    });

    assert.equal(result.success, true);
    assert.equal(requests[0]?.url, "https://queue.fal.run/fal-ai/ace-step");
    assert.deepEqual(JSON.parse(requests[0]?.body || "{}"), {
      tags: "ambient synthwave",
      lyrics: "stay awake",
      duration: 30,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});
