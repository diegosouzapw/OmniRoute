import test from "node:test";
import assert from "node:assert/strict";

import { handleVideoJobGeneration } from "../../open-sse/handlers/videoGeneration/job.ts";
import {
  computePollRetryDelayMs,
  isRetryablePollStatus,
  parseRetryAfterMs,
} from "../../open-sse/handlers/videoGeneration/pollRetry.ts";

function installFetch(pollResponses: Array<() => Response>) {
  const originalFetch = globalThis.fetch;
  const state = { polls: 0 };
  globalThis.fetch = (async (_input: unknown, init?: { method?: string }) => {
    if (init?.method === "POST") {
      return new Response(JSON.stringify({ video_id: "vid_1" }), { status: 200 });
    }
    const make = pollResponses[Math.min(state.polls, pollResponses.length - 1)];
    state.polls += 1;
    return make();
  }) as typeof fetch;
  return { state, restore: () => (globalThis.fetch = originalFetch) };
}

const tooMany = () =>
  new Response(JSON.stringify({ error: { code: 429, message: "too many video status queries" } }), {
    status: 429,
    headers: { "Retry-After": "0" },
  });
const completed = () =>
  new Response(
    JSON.stringify({ status: "completed", metadata: { url: "https://cdn.example/v.mp4" } }),
    { status: 200 }
  );

const run = () =>
  handleVideoJobGeneration({
    model: "agnes-video-v2.0",
    presetName: "agnes-video-job",
    body: { prompt: "ocean" },
    credentials: { apiKey: "k" },
    pollIntervalMs: 1,
    maxPolls: 5,
  }) as Promise<{ success: boolean; status?: number; data?: { data: Array<{ url: string }> } }>;

test("video job poll: transient 429 on status query is retried, job completes", async () => {
  const f = installFetch([tooMany, completed]);
  try {
    const result = await run();
    assert.equal(result.success, true, `expected success, got ${JSON.stringify(result)}`);
    assert.equal(result.data!.data[0].url, "https://cdn.example/v.mp4");
    assert.equal(f.state.polls, 2);
  } finally {
    f.restore();
  }
});

test("video job poll: persistent 429 stops after the consecutive-retry cap", async () => {
  const f = installFetch([tooMany]);
  try {
    const result = await run();
    assert.equal(result.success, false);
    assert.equal(result.status, 429);
    assert.ok(f.state.polls <= 6, `polled ${f.state.polls} times`);
  } finally {
    f.restore();
  }
});

test("video job poll: non-retryable 4xx still fails fast", async () => {
  const f = installFetch([() => new Response("nope", { status: 401 })]);
  try {
    const result = await run();
    assert.equal(result.success, false);
    assert.equal(result.status, 401);
    assert.equal(f.state.polls, 1);
  } finally {
    f.restore();
  }
});

test("pollRetry helpers: Retry-After parsing and bounded backoff", () => {
  assert.equal(parseRetryAfterMs("3"), 3000);
  assert.equal(parseRetryAfterMs(null), 0);
  assert.equal(parseRetryAfterMs("garbage"), 0);
  assert.equal(parseRetryAfterMs("Thu, 01 Jan 1970 00:00:10 GMT", 4000), 6000);
  assert.equal(computePollRetryDelayMs(1000, 1, 8000), 8000);
  assert.equal(computePollRetryDelayMs(1000, 3, 0), 4000);
  assert.equal(computePollRetryDelayMs(1000, 20, 0), 30000);
  assert.equal(computePollRetryDelayMs(1000, 1, 999999), 30000);
  assert.ok(isRetryablePollStatus(429) && isRetryablePollStatus(503));
  assert.ok(!isRetryablePollStatus(401) && !isRetryablePollStatus(500));
});
