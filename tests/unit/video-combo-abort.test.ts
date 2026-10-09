import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-video-combo-abort-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "video-combo-abort-test-secret";
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-jwt-secret-for-video-combo-abort";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { createCombo } = await import("../../src/lib/db/combos.ts");
const videoRoute = await import("../../src/app/api/v1/videos/generations/route.ts");

const originalFetch = globalThis.fetch;
const XAI_ORIGIN = "https://api.x.ai/";

await providersDb.createProviderConnection({
  provider: "xai",
  authType: "apikey",
  apiKey: "xai-combo-key",
});
await createCombo({
  name: "vid-xai-abort-combo",
  strategy: "priority",
  models: ["xai/grok-imagine-video"],
});
await providersDb.createProviderConnection({
  provider: "agnes",
  authType: "apikey",
  apiKey: "agnes-combo-key",
});
await createCombo({
  name: "vid-mixed-abort-combo",
  strategy: "priority",
  models: ["agnes/agnes-video-v2.0", "xai/grok-imagine-video"],
});
await createCombo({
  name: "vid-failover-abort-combo",
  strategy: "priority",
  models: ["comfyui/animatediff", "xai/grok-imagine-video"],
});

function postVideo(body: Record<string, unknown>, signal: AbortSignal) {
  return videoRoute.POST(
    new Request("http://localhost/api/v1/videos/generations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal,
    })
  );
}

function waitForAbort(signal: AbortSignal | null | undefined): Promise<never> {
  return new Promise((_resolve, reject) => {
    if (!signal) return;
    if (signal.aborted) return reject(signal.reason);
    signal.addEventListener("abort", () => reject(signal.reason), { once: true });
  });
}

/** Settles when the poll is aborted; a ref'd fallback keeps an unaborted run from hanging. */
function abortOrPending(signal: AbortSignal | null | undefined): Promise<Response> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const fallback = new Promise<Response>((resolve) => {
    timer = setTimeout(() => resolve(Response.json({ status: "pending" })), 2000);
  });
  return Promise.race([waitForAbort(signal), fallback]).finally(() => clearTimeout(timer));
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  core.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("an already aborted combo request creates no upstream job", async () => {
  let posts = 0;
  let polls = 0;
  globalThis.fetch = (async (_url: unknown, init: RequestInit = {}) => {
    if (init.method === "POST") {
      posts++;
      return Response.json({ request_id: "never-created" });
    }
    polls++;
    return Response.json({ status: "done", video: { url: "https://x.ai/v.mp4" } });
  }) as typeof fetch;

  const client = new AbortController();
  client.abort();
  const response = await postVideo(
    { model: "vid-xai-abort-combo", prompt: "a fox in snow" },
    client.signal
  );

  assert.equal(posts, 0, "an aborted request must not create a job");
  assert.equal(polls, 0);
  assert.equal(response.status, 499);
});

test("an abort while a combo target polls stops polling and aborts the in-flight poll", async () => {
  const client = new AbortController();
  let posts = 0;
  let polls = 0;
  let inFlightPollAborts = 0;
  let abortedAt = 0;
  globalThis.fetch = (async (_url: unknown, init: RequestInit = {}) => {
    if (init.method === "POST") {
      posts++;
      return Response.json({ request_id: "combo-abort-job" });
    }
    polls++;
    if (polls === 1) return Response.json({ status: "pending" });
    abortedAt = Date.now();
    client.abort();
    try {
      return await abortOrPending(init.signal);
    } finally {
      if (init.signal?.aborted) inFlightPollAborts++;
    }
  }) as typeof fetch;

  const response = await postVideo(
    {
      model: "vid-xai-abort-combo",
      prompt: "a fox in snow",
      poll_interval_ms: 1000,
      timeout_ms: 4500,
    },
    client.signal
  );
  const stoppedAfter = Date.now() - abortedAt;

  assert.equal(response.status, 499);
  assert.equal(posts, 1);
  assert.equal(polls, 2, "no poll may start after the client aborted");
  assert.equal(inFlightPollAborts, 1, "the in-flight poll must be aborted exactly once");
  assert.ok(stoppedAfter < 1000, `polling took ${stoppedAfter}ms to stop after the abort`);
});

test("the abort signal reaches the second combo target while the first one fails", async () => {
  const client = new AbortController();
  let comfyCalls = 0;
  let posts = 0;
  let polls = 0;
  let inFlightPollAborts = 0;
  globalThis.fetch = (async (url: unknown, init: RequestInit = {}) => {
    const target = String(url);
    if (!target.startsWith(XAI_ORIGIN)) {
      comfyCalls++;
      return new Response("comfy down", { status: 503 });
    }
    if (init.method === "POST") {
      posts++;
      return Response.json({ request_id: "failover-abort-job" });
    }
    polls++;
    if (polls === 1) return Response.json({ status: "pending" });
    client.abort();
    try {
      return await abortOrPending(init.signal);
    } finally {
      if (init.signal?.aborted) inFlightPollAborts++;
    }
  }) as typeof fetch;

  const response = await postVideo(
    {
      model: "vid-failover-abort-combo",
      prompt: "a fox in snow",
      poll_interval_ms: 1000,
      timeout_ms: 4500,
    },
    client.signal
  );

  assert.ok(comfyCalls > 0, "the first target ran and failed");
  assert.equal(posts, 1);
  assert.equal(polls, 2, "the second target stops polling after the abort");
  assert.equal(inFlightPollAborts, 1, "the second target's in-flight poll is aborted");
  assert.equal(response.status, 499);
});

test("an abort settles a mixed combo promptly and no target polls again", async () => {
  const client = new AbortController();
  const polls = { agnes: 0, xai: 0 };
  let pollsAfterAbort = 0;
  let abortedAt = 0;
  globalThis.fetch = (async (url: unknown, init: RequestInit = {}) => {
    const target = String(url).startsWith(XAI_ORIGIN) ? "xai" : "agnes";
    if (init.method === "POST") {
      return Response.json(
        target === "xai" ? { request_id: "mixed-xai-job" } : { video_id: "mixed-agnes-job" }
      );
    }
    if (client.signal.aborted) pollsAfterAbort++;
    polls[target]++;
    if (polls.agnes === 0 || polls.xai === 0 || client.signal.aborted) {
      return Response.json(target === "xai" ? { status: "pending" } : { status: "processing" });
    }
    abortedAt = Date.now();
    client.abort();
    return abortOrPending(init.signal);
  }) as typeof fetch;

  const response = await postVideo(
    {
      model: "vid-mixed-abort-combo",
      prompt: "a fox in snow",
      poll_interval_ms: 1000,
      timeout_ms: 4500,
      max_polls: 4,
    },
    client.signal
  );
  const settledAfter = Date.now() - abortedAt;

  assert.equal(response.status, 499);
  assert.ok(polls.agnes >= 1 && polls.xai >= 1, "both targets were polling");
  assert.equal(pollsAfterAbort, 0, "no target may poll after the abort");
  assert.ok(settledAfter < 1000, `the combo took ${settledAfter}ms to settle after the abort`);
});
