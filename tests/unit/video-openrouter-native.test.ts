import test from "node:test";
import assert from "node:assert/strict";

import { VIDEO_PROVIDERS } from "../../open-sse/config/videoRegistry.ts";
import { handleVideoGeneration } from "../../open-sse/handlers/videoGeneration.ts";
import { parseOpenRouterVideoCatalog } from "../../src/lib/catalog/openrouterVideoCatalog.ts";

const CREATE_URL = "https://openrouter.ai/api/v1/videos";
const POLL_URL = `${CREATE_URL}/job-native-1`;
const CONTENT_URL = `${POLL_URL}/content?index=0`;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

test("OpenRouter video registry uses the native async endpoint and current fallback slugs", () => {
  const provider = VIDEO_PROVIDERS.openrouter;
  assert.ok(provider);
  assert.equal(provider.baseUrl, CREATE_URL);
  assert.equal(provider.statusUrl, CREATE_URL);
  assert.equal(provider.format, "openrouter-video");
  assert.deepEqual(
    provider.models.map((model) => model.id),
    [
      "alibaba/wan-2.7",
      "alibaba/wan-2.6",
      "bytedance/seedance-2.0-fast",
      "google/veo-3.1-fast",
    ]
  );
});

test("native OpenRouter transport submits, polls, retrieves authenticated content, and normalizes it", async () => {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const calls: Array<{ url: string; method: string; auth: string | null; body?: unknown }> = [];
  let polls = 0;

  globalThis.setTimeout = ((callback: (...args: unknown[]) => void, _ms?: number) => {
    callback();
    return 0 as unknown as NodeJS.Timeout;
  }) as typeof setTimeout;
  globalThis.fetch = (async (input: string | URL | Request, init: RequestInit = {}) => {
    const url = String(input);
    const headers = new Headers(init.headers);
    let body: unknown;
    if (typeof init.body === "string") body = JSON.parse(init.body);
    calls.push({
      url,
      method: init.method || "GET",
      auth: headers.get("authorization"),
      ...(body !== undefined ? { body } : {}),
    });

    if (url === CREATE_URL) {
      return json({ id: "job-native-1", status: "pending", polling_url: "/ignored" }, 202);
    }
    if (url === POLL_URL) {
      polls += 1;
      return polls === 1
        ? json({ id: "job-native-1", status: "in_progress" })
        : json({
            id: "job-native-1",
            status: "completed",
            generation_id: "gen-native-1",
            unsigned_urls: ["https://untrusted.example/content"],
          });
    }
    if (url === CONTENT_URL) {
      return new Response(Uint8Array.from([0, 1, 2, 3]), {
        status: 200,
        headers: { "content-type": "video/mp4" },
      });
    }
    throw new Error(`Unexpected URL: ${url}`);
  }) as typeof fetch;

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "openrouter/alibaba/wan-2.7",
        prompt: "a paper boat at night",
        duration: 8,
        resolution: "1080p",
        aspect_ratio: "16:9",
        generate_audio: true,
        poll_interval_ms: 1_000,
      },
      credentials: { apiKey: "or-test-key", connectionId: "or-account-2" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(result.data.data[0].b64_json, Buffer.from([0, 1, 2, 3]).toString("base64"));
    assert.equal(result.data.data[0].format, "mp4");
    assert.equal(result.data.data[0].mime_type, "video/mp4");

    assert.deepEqual(
      calls.map((call) => [call.method, call.url]),
      [
        ["POST", CREATE_URL],
        ["GET", POLL_URL],
        ["GET", POLL_URL],
        ["GET", CONTENT_URL],
      ]
    );
    assert.ok(calls.every((call) => call.auth === "Bearer or-test-key"));
    assert.deepEqual(calls[0].body, {
      model: "alibaba/wan-2.7",
      prompt: "a paper boat at night",
      aspect_ratio: "16:9",
      duration: 8,
      generate_audio: true,
      resolution: "1080p",
    });
    assert.ok(
      calls.every((call) => !call.url.includes("/videos/generations")),
      "native OpenRouter transport must never use the nonexistent generations path"
    );
    assert.ok(
      calls.every((call) => !call.url.includes("untrusted.example")),
      "poll/content URLs are reconstructed from the trusted provider base"
    );
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("native OpenRouter transport preserves target-local auth status for combo fallback", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => json({ error: { message: "account key expired" } }, 401)) as typeof fetch;
  try {
    const result = await handleVideoGeneration({
      body: { model: "openrouter/google/veo-3.1-fast", prompt: "x" },
      credentials: { apiKey: "expired" },
      log: null,
    });
    assert.equal(result.success, false);
    assert.equal(result.status, 401);
    assert.equal(result.error, "account key expired");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("native OpenRouter polling has a bounded job deadline", async () => {
  const originalFetch = globalThis.fetch;
  const originalNow = Date.now;
  let nowCalls = 0;
  let fetchCalls = 0;
  Date.now = () => {
    nowCalls += 1;
    return nowCalls === 1 ? 1_000 : 32_000;
  };
  globalThis.fetch = (async () => {
    fetchCalls += 1;
    return json({ id: "job-stuck", status: "pending" }, 202);
  }) as typeof fetch;

  try {
    const result = await handleVideoGeneration({
      body: {
        model: "openrouter/alibaba/wan-2.6",
        prompt: "x",
        timeout_ms: 30_000,
        poll_interval_ms: 1_000,
      },
      credentials: { apiKey: "or-test-key" },
      log: null,
    });
    assert.equal(result.success, false);
    assert.equal(result.status, 504);
    assert.match(result.error, /timed out/);
    assert.equal(fetchCalls, 1, "deadline stops polling before another network request");
  } finally {
    globalThis.fetch = originalFetch;
    Date.now = originalNow;
  }
});

test("OpenRouter video catalog parser keeps valid current slugs and de-duplicates ids", () => {
  const parsed = parseOpenRouterVideoCatalog({
    data: [
      {
        id: "bytedance/seedance-2.0-fast",
        name: "Seedance 2.0 Fast",
        supported_resolutions: ["720p", "1080p"],
      },
      { id: "bytedance/seedance-2.0-fast", name: "duplicate" },
      { id: "google/veo-3.1-fast", generate_audio: true },
      { id: "" },
      null,
    ],
  });
  assert.deepEqual(
    parsed.map((entry) => entry.id),
    ["bytedance/seedance-2.0-fast", "google/veo-3.1-fast"]
  );
  assert.deepEqual(parsed[0].supported_resolutions, ["720p", "1080p"]);
});
