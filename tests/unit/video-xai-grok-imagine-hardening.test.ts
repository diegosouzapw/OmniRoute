import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-video-xai-hardening-"));

const { handleVideoGeneration } = await import("../../open-sse/handlers/videoGeneration.ts");
const { proxyFetch } = await import("../../open-sse/utils/proxyFetch.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
test.after(() => resetDbInstance());

const CREATE_URL = "https://api.x.ai/v1/videos/generations";

function jsonResponse(body: unknown, status = 200) {
  return Response.json(body, { status });
}

function waitForAbort(signal: AbortSignal | null | undefined): Promise<never> {
  return new Promise((_resolve, reject) => {
    if (!signal) return;
    if (signal.aborted) return reject(signal.reason);
    signal.addEventListener("abort", () => reject(signal.reason), { once: true });
  });
}

test("an ambiguous transport failure sends a video create once without native replay", async (t) => {
  let upstreamPosts = 0;
  let nativeCalls = 0;
  let sentBody = "";
  const failingUndici = async (input: RequestInfo | URL, init: RequestInit = {}) => {
    if (init.method !== "POST")
      return jsonResponse({ status: "done", video: { url: "https://example.invalid/guard.mp4" } });
    assert.equal(String(input), CREATE_URL);
    upstreamPosts++;
    sentBody = await new Response(init.body).text();
    throw new Error("fetch failed", {
      cause: Object.assign(new Error("connection reset"), { code: "ECONNRESET" }),
    });
  };
  const nativeFetch = async () => {
    nativeCalls++;
    return jsonResponse({ request_id: "replayed-job" });
  };
  t.mock.method(globalThis, "fetch", (input: RequestInfo | URL, init?: RequestInit) =>
    proxyFetch(input, init, {
      undiciFetch: failingUndici,
      nativeFetch,
      findWorkingProxy: async () => null,
    })
  );

  const result = await handleVideoGeneration({
    body: { model: "xai/grok-imagine-video", prompt: "a fox in snow", duration: 6 },
    credentials: { apiKey: "xai-key" },
    log: null,
  });

  assert.equal(upstreamPosts, 1, "the create POST must reach upstream exactly once");
  assert.equal(nativeCalls, 0, "the native fetch fallback must not replay the create");
  assert.equal(JSON.parse(sentBody).prompt, "a fox in snow");
  assert.equal(result.success, false);
  assert.equal(result.status, 502);
});

function immediateTimeout(
  callback: (...args: unknown[]) => void,
  _ms?: number,
  ...args: unknown[]
) {
  if (typeof callback === "function") callback(...args);
  return 0 as unknown as ReturnType<typeof setTimeout>;
}

test("a client abort during polling aborts the in-flight poll and stops polling", async (t) => {
  t.mock.method(globalThis, "setTimeout", immediateTimeout);
  const client = new AbortController();
  let posts = 0;
  let polls = 0;
  let inFlightPollAborted = false;
  t.mock.method(globalThis, "fetch", async (_url: RequestInfo | URL, init: RequestInit = {}) => {
    if (init.method === "POST") {
      posts++;
      return jsonResponse({ request_id: "abort-job" });
    }
    polls++;
    if (polls === 1) return jsonResponse({ status: "pending" });
    client.abort();
    try {
      return await waitForAbort(init.signal);
    } finally {
      inFlightPollAborted = init.signal?.aborted === true;
    }
  });
  const logged: string[] = [];
  const result = await handleVideoGeneration({
    body: { model: "xai/grok-imagine-video", prompt: "x", poll_interval_ms: 1000 },
    credentials: { apiKey: "xai-key" },
    log: {
      info: (_s: string, m: string) => logged.push(`info ${m}`),
      error: (_s: string, m: string) => logged.push(`error ${m}`),
    },
    signal: client.signal,
  });
  assert.equal(result.success, false);
  assert.equal(result.status, 499);
  assert.equal(posts, 1);
  assert.equal(polls, 2, "no poll may start after the client aborted");
  assert.equal(inFlightPollAborted, true, "the in-flight poll fetch must be aborted");
  assert.ok(!logged.some((line) => line.startsWith("error")), "a client abort is not an error");
});

test("a client abort while waiting between polls returns at once without another poll", async (t) => {
  const client = new AbortController();
  let polls = 0;
  t.mock.method(globalThis, "fetch", async (_url: RequestInfo | URL, init: RequestInit = {}) => {
    if (init.method === "POST") return jsonResponse({ request_id: "wait-job" });
    polls++;
    setImmediate(() => client.abort());
    return jsonResponse({ status: "pending" });
  });
  const started = Date.now();
  const result = await handleVideoGeneration({
    body: {
      model: "xai/grok-imagine-video",
      prompt: "x",
      poll_interval_ms: 1000,
      timeout_ms: 60000,
    },
    credentials: { apiKey: "xai-key" },
    log: null,
    signal: client.signal,
  });
  const elapsed = Date.now() - started;
  assert.equal(result.status, 499);
  assert.equal(polls, 1);
  assert.ok(elapsed < 1900, `expected the wait to be cut short, took ${elapsed}ms`);
});

test("an already aborted client signal sends nothing upstream", async (t) => {
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    calls++;
    return jsonResponse({ request_id: "never" });
  });
  const client = new AbortController();
  client.abort();
  const result = await handleVideoGeneration({
    body: { model: "xai/grok-imagine-video", prompt: "x" },
    credentials: { apiKey: "xai-key" },
    log: null,
    signal: client.signal,
  });
  assert.equal(result.status, 499);
  assert.equal(calls, 0);
});

test("polling stops at the poll cap with the cap in the timeout error", async (t) => {
  t.mock.method(globalThis, "setTimeout", immediateTimeout);
  let polls = 0;
  t.mock.method(globalThis, "fetch", async (_url: RequestInfo | URL, init: RequestInit = {}) => {
    if (init.method === "POST") return jsonResponse({ request_id: "capped-job" });
    polls++;
    return jsonResponse({ status: "pending" });
  });
  const result = await handleVideoGeneration({
    body: {
      model: "xai/grok-imagine-video",
      prompt: "x",
      timeout_ms: 30 * 60_000,
      poll_interval_ms: 1000,
    },
    credentials: { apiKey: "xai-key" },
    log: null,
  });
  assert.equal(polls, 300);
  assert.equal(result.status, 504);
  assert.match(result.error, /after 300 polls \(cap 300/);
});

test("the poll cap follows timeout_ms / poll_interval_ms below the ceiling", async (t) => {
  t.mock.method(globalThis, "setTimeout", immediateTimeout);
  let polls = 0;
  t.mock.method(globalThis, "fetch", async (_url: RequestInfo | URL, init: RequestInit = {}) => {
    if (init.method === "POST") return jsonResponse({ request_id: "derived-cap-job" });
    polls++;
    return jsonResponse({ status: "pending" });
  });
  const result = await handleVideoGeneration({
    body: {
      model: "xai/grok-imagine-video",
      prompt: "x",
      timeout_ms: 10_000,
      poll_interval_ms: 2000,
    },
    credentials: { apiKey: "xai-key" },
    log: null,
  });
  assert.equal(polls, 5);
  assert.match(result.error, /cap 5/);
});

test("max_polls=1 polls exactly once, then returns the bounded timeout", async (t) => {
  t.mock.method(globalThis, "setTimeout", immediateTimeout);
  let polls = 0;
  t.mock.method(globalThis, "fetch", async (_url: RequestInfo | URL, init: RequestInit = {}) => {
    if (init.method === "POST") return jsonResponse({ request_id: "one-poll-job" });
    polls++;
    return polls === 1
      ? jsonResponse({ status: "pending" })
      : jsonResponse({ status: "done", video: { url: "https://example.invalid/guard.mp4" } });
  });
  const result = await handleVideoGeneration({
    body: { model: "xai/grok-imagine-video", prompt: "x", max_polls: 1 },
    credentials: { apiKey: "xai-key" },
    log: null,
  });
  assert.equal(polls, 1);
  assert.equal(result.status, 504);
  assert.match(result.error, /after 1 polls \(cap 1,/);
});

test("max_polls never raises the cap derived from timeout_ms / poll_interval_ms", async (t) => {
  t.mock.method(globalThis, "setTimeout", immediateTimeout);
  let polls = 0;
  t.mock.method(globalThis, "fetch", async (_url: RequestInfo | URL, init: RequestInit = {}) => {
    if (init.method === "POST") return jsonResponse({ request_id: "lower-cap-job" });
    polls++;
    return jsonResponse({ status: "pending" });
  });
  const result = await handleVideoGeneration({
    body: {
      model: "xai/grok-imagine-video",
      prompt: "x",
      timeout_ms: 10_000,
      poll_interval_ms: 2000,
      max_polls: 300,
    },
    credentials: { apiKey: "xai-key" },
    log: null,
  });
  assert.equal(polls, 5);
  assert.match(result.error, /cap 5/);
});

for (const [name, body] of [
  ["timeout_ms above the ceiling", { timeout_ms: 30 * 60_000 + 1 }],
  ["timeout_ms of 24.8 days", { timeout_ms: 2147483647 }],
  ["a non-numeric timeout_ms", { timeout_ms: "soon" }],
  ["a negative timeout_ms", { timeout_ms: -1 }],
  ["poll_interval_ms below the minimum", { poll_interval_ms: 999 }],
  ["poll_interval_ms above the ceiling", { poll_interval_ms: 30 * 60_000 + 1 }],
  ["max_polls above the server cap", { max_polls: 301 }],
  ["max_polls of zero", { max_polls: 0 }],
  ["a negative max_polls", { max_polls: -1 }],
  ["a non-numeric max_polls", { max_polls: "many" }],
] as const) {
  test(`${name} is rejected with 400 before anything is sent`, async (t) => {
    t.mock.method(globalThis, "setTimeout", immediateTimeout);
    let calls = 0;
    t.mock.method(globalThis, "fetch", async () => {
      calls++;
      return jsonResponse({ request_id: "never" });
    });
    const result = await handleVideoGeneration({
      body: { model: "xai/grok-imagine-video", prompt: "x", ...body },
      credentials: { apiKey: "xai-key" },
      log: null,
    });
    assert.equal(result.status, 400);
    assert.match(result.error, new RegExp(`^${Object.keys(body)[0]} `));
    assert.equal(calls, 0);
  });
}

function endlessBody(counter: { pulled: number; cancelled: boolean }) {
  const chunk = new Uint8Array(64 * 1024).fill(0x20);
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      counter.pulled += chunk.byteLength;
      controller.enqueue(chunk);
    },
    cancel() {
      counter.cancelled = true;
    },
  });
}

test("an oversized poll body fails cleanly with 502 and stops reading at the cap", async (t) => {
  t.mock.method(globalThis, "setTimeout", immediateTimeout);
  const counter = { pulled: 0, cancelled: false };
  let polls = 0;
  t.mock.method(globalThis, "fetch", async (_url: RequestInfo | URL, init: RequestInit = {}) => {
    if (init.method === "POST") return jsonResponse({ request_id: "huge-job" });
    polls++;
    return new Response(endlessBody(counter), {
      headers: { "content-type": "application/json" },
    });
  });
  const result = await handleVideoGeneration({
    body: { model: "xai/grok-imagine-video", prompt: "x" },
    credentials: { apiKey: "xai-key" },
    log: null,
  });
  assert.equal(result.status, 502);
  assert.match(result.error, /poll response exceeded 1048576 bytes/);
  assert.equal(polls, 1, "an oversized poll ends the job");
  assert.equal(counter.cancelled, true, "the body stream is cancelled");
  assert.ok(counter.pulled < 2 * 1024 * 1024, `read ${counter.pulled} bytes past a 1 MiB cap`);
});

test("a create body that declares more than the cap is rejected without reading it", async (t) => {
  const counter = { pulled: 0, cancelled: false };
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    calls++;
    return new Response(endlessBody(counter), {
      headers: { "content-type": "application/json", "content-length": String(64 * 1024 * 1024) },
    });
  });
  const result = await handleVideoGeneration({
    body: { model: "xai/grok-imagine-video", prompt: "x" },
    credentials: { apiKey: "xai-key" },
    log: null,
  });
  assert.equal(result.status, 502);
  assert.match(result.error, /create response exceeded 1048576 bytes/);
  assert.equal(calls, 1);
  assert.ok(counter.pulled <= 128 * 1024, `read ${counter.pulled} bytes of a rejected body`);
});

test("the operation deadline also bounds a stalled create-response body", async (t) => {
  const client = new AbortController();
  let cancelled = false;
  t.mock.method(
    globalThis,
    "fetch",
    async () =>
      new Response(
        new ReadableStream({
          start() {},
          cancel() {
            cancelled = true;
          },
        }),
        { headers: { "content-type": "application/json" } }
      )
  );
  const operation = handleVideoGeneration({
    body: { model: "xai/grok-imagine-video", prompt: "x", timeout_ms: 25 },
    credentials: { apiKey: "xai-key" },
    log: null,
    signal: client.signal,
  });
  let guard: ReturnType<typeof setTimeout> | undefined;
  const result = await Promise.race([
    operation,
    new Promise<null>((resolve) => {
      guard = setTimeout(() => resolve(null), 500);
    }),
  ]);
  clearTimeout(guard);
  if (!result) {
    client.abort();
    await operation;
  }
  assert.ok(result, "body read outlived the operation deadline");
  assert.equal(result.status, 504);
  assert.equal(cancelled, true);
});
