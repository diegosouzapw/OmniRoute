import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-video-custom-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "video-custom-route-test-secret";

const core = await import("../../../src/lib/db/core.ts");
const modelsDb = await import("../../../src/lib/db/models.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const videoRoute = await import("../../../src/app/api/v1/videos/generations/route.ts");

const originalFetch = globalThis.fetch;
const originalSetTimeout = globalThis.setTimeout;

function createResponse(body: BodyInit | null, init?: ResponseInit & { setCookies?: string[] }) {
  const response = new Response(body, init);
  if (init?.setCookies) {
    const cookies = init.setCookies.map((c) => c).join("; ");
    response.headers.set("set-cookie", cookies);
  }
  return response;
}

function immediateButSafeTimeout(
  callback: (...args: unknown[]) => void,
  ms?: number,
  ...args: unknown[]
) {
  if (ms === 20_000 || ms === 5_000 || ms === 2_000) {
    return originalSetTimeout(callback as TimerHandler, 0, ...args);
  }
  return originalSetTimeout(callback as TimerHandler, ms, ...args);
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  globalThis.setTimeout = originalSetTimeout;
});

test.after(() => {
  core.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("video route uses OpenAI-compatible handler for custom provider with videos endpoint", async () => {
  globalThis.setTimeout = immediateButSafeTimeout as typeof setTimeout;

  // Seed a custom model tagged with "videos" endpoint
  await modelsDb.addCustomModel(
    "custom-video-provider",
    "super-video-v1",
    "Super Video v1",
    "manual",
    "chat-completions",
    ["videos"]
  );

  // Create a provider connection with the custom base URL
  await providersDb.createProviderConnection({
    provider: "custom-video-provider",
    authType: "apikey",
    apiKey: "custom-key",
    providerSpecificData: { baseUrl: "https://custom.example.com/v1/videos/generations" },
  });

  let captured: { url: string; body: unknown; headers: unknown } | null = null;

  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    const stringUrl = String(url);
    const requestBody = init?.body ? JSON.parse(String(init.body)) : {};

    captured = {
      url: stringUrl,
      body: requestBody,
      headers: init?.headers,
    };

    // Return a valid OpenAI-like video generation response
    return createResponse(
      JSON.stringify({
        created: Math.floor(Date.now() / 1000),
        data: [{ url: "https://custom.example.com/generated.mp4", format: "mp4" }],
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }) as typeof fetch;

  const response = await videoRoute.POST(
    new Request("http://localhost/api/v1/videos/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "custom-video-provider/super-video-v1",
        prompt: "a cat playing piano",
        duration: 5,
      }),
    })
  );

  const payload = (await response.json()) as {
    data: Array<{ b64_json?: string; url?: string; format?: string }>;
  };

  assert.equal(response.status, 200);
  assert.equal(payload.data.length, 1);
  assert.equal(payload.data[0].url, "https://custom.example.com/generated.mp4");
  assert.equal(payload.data[0].format, "mp4");

  // Verify the upstream call went to the custom provider's base URL
  assert.ok(captured, "fetch should have been called");
  assert.equal(captured!.url, "https://custom.example.com/v1/videos/generations");
  assert.equal(captured!.headers.Authorization, "Bearer custom-key");
  assert.deepEqual(captured!.body, {
    model: "super-video-v1",
    prompt: "a cat playing piano",
    duration: 5,
  });
});

test("video route returns 400 for custom provider without videos endpoint", async () => {
  globalThis.setTimeout = immediateButSafeTimeout as typeof setTimeout;

  // Seed a custom model WITHOUT "videos" endpoint
  await modelsDb.addCustomModel(
    "custom-no-video-provider",
    "text-only-model",
    "Text Only Model",
    "manual",
    "chat-completions",
    ["chat", "embeddings"]
  );

  const response = await videoRoute.POST(
    new Request("http://localhost/api/v1/videos/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "custom-no-video-provider/text-only-model",
        prompt: "this should fail",
      }),
    })
  );

  assert.equal(response.status, 400);
  const payload = await response.json();
  assert.match(payload.error.message, /Invalid video model/);
});

test("video route returns 400 for unknown custom provider", async () => {
  globalThis.setTimeout = immediateButSafeTimeout as typeof setTimeout;

  const response = await videoRoute.POST(
    new Request("http://localhost/api/v1/videos/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "unknown-provider/unknown-model",
        prompt: "this should fail",
      }),
    })
  );

  assert.equal(response.status, 400);
  const payload = await response.json();
  assert.match(payload.error.message, /Invalid video model/);
});

test("video route dispatches submit→poll job flow for custom model with agnes-video-job preset", async () => {
  globalThis.setTimeout = immediateButSafeTimeout as typeof setTimeout;

  await modelsDb.addCustomModel(
    "custom-job-provider",
    "job-video-v1",
    "Job Video v1",
    "manual",
    "chat-completions",
    ["videos"],
    undefined,
    {},
    undefined,
    { preset: "agnes-video-job" }
  );

  await providersDb.createProviderConnection({
    provider: "custom-job-provider",
    authType: "apikey",
    apiKey: "custom-key",
    providerSpecificData: { baseUrl: "https://custom.example.com" },
  });

  const calls: Array<{
    url: string;
    method: string;
    body: unknown;
    headers: Record<string, string>;
  }> = [];

  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    const stringUrl = String(url);
    const method = init?.method || "GET";
    const requestBody = init?.body ? JSON.parse(String(init.body)) : {};
    const headers = (init?.headers || {}) as Record<string, string>;

    calls.push({ url: stringUrl, method, body: requestBody, headers });

    if (stringUrl === "https://custom.example.com/v1/videos") {
      return createResponse(JSON.stringify({ video_id: "video-123", task_id: "task-123" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    if (stringUrl === "https://custom.example.com/agnesapi?video_id=video-123") {
      return createResponse(
        JSON.stringify({
          status: "completed",
          metadata: { url: "https://custom.example.com/job-out.mp4" },
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    return createResponse(JSON.stringify({ error: "unexpected fetch" }), { status: 500 });
  }) as typeof fetch;

  const response = await videoRoute.POST(
    new Request("http://localhost/api/v1/videos/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "custom-job-provider/job-video-v1",
        prompt: "a cat playing piano",
      }),
    })
  );

  const payload = (await response.json()) as {
    created: number;
    data: Array<{ url?: string; format?: string }>;
  };

  assert.equal(response.status, 200);
  assert.equal(payload.data.length, 1);
  assert.equal(payload.data[0].url, "https://custom.example.com/job-out.mp4");
  assert.equal(payload.data[0].format, "mp4");
  assert.ok(payload.created > 0);

  assert.equal(calls.length, 2);
  assert.equal(calls[0].method, "POST");
  assert.equal(calls[0].url, "https://custom.example.com/v1/videos");
  assert.equal(calls[0].headers.Authorization, "Bearer custom-key");
  assert.deepEqual(calls[0].body, {
    model: "job-video-v1",
    prompt: "a cat playing piano",
  });
  assert.equal(calls[1].method, "GET");
  assert.equal(calls[1].url, "https://custom.example.com/agnesapi?video_id=video-123");
});

test("video route returns 502 when job preset reports failed status", async () => {
  globalThis.setTimeout = immediateButSafeTimeout as typeof setTimeout;

  await modelsDb.addCustomModel(
    "custom-job-provider-fail",
    "job-video-fail-v1",
    "Job Video Fail v1",
    "manual",
    "chat-completions",
    ["videos"],
    undefined,
    {},
    undefined,
    { preset: "agnes-video-job" }
  );

  await providersDb.createProviderConnection({
    provider: "custom-job-provider-fail",
    authType: "apikey",
    apiKey: "custom-fail-key",
    providerSpecificData: { baseUrl: "https://custom.example.com" },
  });

  globalThis.fetch = (async (url: unknown, init?: RequestInit) => {
    if (String(url).endsWith("/v1/videos")) {
      return createResponse(JSON.stringify({ video_id: "video-fail", task_id: "task-fail" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }
    return createResponse(JSON.stringify({ status: "failed" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;

  const response = await videoRoute.POST(
    new Request("http://localhost/api/v1/videos/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "custom-job-provider-fail/job-video-fail-v1",
        prompt: "this should fail",
      }),
    })
  );

  assert.equal(response.status, 502);
  const payload = (await response.json()) as { error: { message?: string } };
  assert.equal(payload.error?.message, "Video job failed (agnes-video-job)");
});

test("video route returns 502 for unknown generationConfig preset", async () => {
  globalThis.setTimeout = immediateButSafeTimeout as typeof setTimeout;

  await modelsDb.addCustomModel(
    "custom-job-provider-bad",
    "job-video-bad-v1",
    "Job Video Bad v1",
    "manual",
    "chat-completions",
    ["videos"],
    undefined,
    {},
    undefined,
    { preset: "no-such-preset" }
  );

  await providersDb.createProviderConnection({
    provider: "custom-job-provider-bad",
    authType: "apikey",
    apiKey: "custom-bad-key",
    providerSpecificData: { baseUrl: "https://custom.example.com" },
  });

  const response = await videoRoute.POST(
    new Request("http://localhost/api/v1/videos/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "custom-job-provider-bad/job-video-bad-v1",
        prompt: "bad preset",
      }),
    })
  );

  assert.equal(response.status, 502);
  const payload = (await response.json()) as { error: { message?: string } };
  assert.equal(payload.error.message, "Unknown video job preset: no-such-preset");
});
