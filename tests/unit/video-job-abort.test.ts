import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-video-job-abort-"));

const { handleVideoGeneration } = await import("../../open-sse/handlers/videoGeneration.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
test.after(() => resetDbInstance());

function jsonResponse(body: unknown, status = 200) {
  return Response.json(body, { status });
}

/** Settles when the poll is aborted; a ref'd fallback keeps an unaborted run from hanging. */
function abortOrPending(signal: AbortSignal | null | undefined, pending: unknown) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const fallback = new Promise<Response>((resolve) => {
    timer = setTimeout(() => resolve(jsonResponse(pending)), 2000);
  });
  const aborted = new Promise<never>((_resolve, reject) => {
    if (!signal) return;
    if (signal.aborted) return reject(signal.reason);
    signal.addEventListener("abort", () => reject(signal.reason), { once: true });
  });
  return Promise.race([aborted, fallback]).finally(() => clearTimeout(timer));
}

const providers = [
  {
    name: "job preset (agnes)",
    // The job preset ignores timeout_ms; max_polls bounds an unaborted run.
    body: { model: "agnes/agnes-video-v2.0", prompt: "x", max_polls: 4 },
    credentials: { apiKey: "agnes-key" },
    created: { video_id: "agnes-abort-job" },
    pending: { status: "processing" },
  },
  {
    name: "novita",
    body: { model: "novita/wan-t2v", prompt: "x" },
    credentials: { apiKey: "novita-key" },
    created: { task_id: "novita-abort-task" },
    pending: { task: { task_id: "novita-abort-task", status: "TASK_STATUS_QUEUED" } },
  },
];

for (const provider of providers) {
  test(`${provider.name}: an abort during a poll aborts it and stops polling`, async (t) => {
    const client = new AbortController();
    let posts = 0;
    let polls = 0;
    let inFlightPollAborts = 0;
    let abortedAt = 0;
    t.mock.method(globalThis, "fetch", async (_url: RequestInfo | URL, init: RequestInit = {}) => {
      if (init.method === "POST") {
        posts++;
        return jsonResponse(provider.created);
      }
      polls++;
      if (polls === 1) return jsonResponse(provider.pending);
      abortedAt = Date.now();
      client.abort();
      try {
        return await abortOrPending(init.signal, provider.pending);
      } finally {
        if (init.signal?.aborted) inFlightPollAborts++;
      }
    });

    const result = await handleVideoGeneration({
      body: { ...provider.body, poll_interval_ms: 1000, timeout_ms: 4500 },
      credentials: provider.credentials,
      log: null,
      signal: client.signal,
    });
    const stoppedAfter = Date.now() - abortedAt;

    assert.equal(result.status, 499);
    assert.equal(posts, 1);
    assert.equal(polls, 2, "no poll may start after the client aborted");
    assert.equal(inFlightPollAborts, 1, "the in-flight poll must be aborted");
    assert.ok(stoppedAfter < 1000, `polling took ${stoppedAfter}ms to stop after the abort`);
  });

  test(`${provider.name}: an abort between polls returns at once without another poll`, async (t) => {
    const client = new AbortController();
    let polls = 0;
    t.mock.method(globalThis, "fetch", async (_url: RequestInfo | URL, init: RequestInit = {}) => {
      if (init.method === "POST") return jsonResponse(provider.created);
      polls++;
      setImmediate(() => client.abort());
      return jsonResponse(provider.pending);
    });

    const started = Date.now();
    const result = await handleVideoGeneration({
      body: { ...provider.body, poll_interval_ms: 1000, timeout_ms: 4000 },
      credentials: provider.credentials,
      log: null,
      signal: client.signal,
    });
    const elapsed = Date.now() - started;

    assert.equal(result.status, 499);
    assert.equal(polls, 1);
    assert.ok(elapsed < 1900, `expected the wait to be cut short, took ${elapsed}ms`);
  });
}
