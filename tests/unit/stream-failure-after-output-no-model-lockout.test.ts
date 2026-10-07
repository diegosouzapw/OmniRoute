// A stream that already relayed output to the client and then fails with a 5xx
// (e.g. an upstream "Internal error during token generation" 45-80 s into a
// streamed answer) is a per-request failure: the client response is committed,
// so no failover can help that request, while a model-only lockout benches the
// model for every other client. In production this was the source of most
// model-only lockouts on a single-account provider. Pre-output 5xx keeps the
// existing lockout path.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-output-lockout-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const streak = await import("../../open-sse/services/accountFallback/postOutputFailureStreak.ts");

async function resetStorage() {
  streak.resetPostOutputFailureStreaks();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedGrokCli() {
  return providersDb.createProviderConnection({
    provider: "grok-cli",
    authType: "apikey",
    apiKey: "grok-key",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { passthroughModels: true },
  });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("5xx stream failure after output was emitted records no model lockout", async () => {
  await resetStorage();
  const conn = await seedGrokCli();

  const result = await auth.markAccountUnavailable(
    conn.id,
    502,
    "Internal error during token generation",
    "grok-cli",
    "grok-4.6",
    null,
    { streamOutputEmitted: true }
  );

  assert.equal(result.cooldownMs, 0);
  assert.equal(accountFallback.getModelLockoutInfo("grok-cli", conn.id, "grok-4.6"), null);
  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(after.testStatus, "active");
  assert.ok(!after.rateLimitedUntil, "connection must not be rate-limited");
  assert.equal(after.lastErrorType, "server_error", "failure stays observable");
});

async function failAfterOutput(connId: string) {
  return auth.markAccountUnavailable(
    connId,
    502,
    "Internal error during token generation",
    "grok-cli",
    "grok-4.6",
    null,
    { streamOutputEmitted: true }
  );
}

test("consecutive post-output 5xx with no success in between lock the model on the 3rd", async () => {
  await resetStorage();
  const conn = await seedGrokCli();

  await failAfterOutput(conn.id);
  await failAfterOutput(conn.id);
  assert.equal(accountFallback.getModelLockoutInfo("grok-cli", conn.id, "grok-4.6"), null);

  const third = await failAfterOutput(conn.id);
  assert.ok(third.cooldownMs > 0, "a model failing every stream must still be locked");
  assert.equal(
    accountFallback.getModelLockoutInfo("grok-cli", conn.id, "grok-4.6")?.reason,
    "server_error"
  );
});

test("a completed stream in between resets the post-output failure streak", async () => {
  await resetStorage();
  const conn = await seedGrokCli();

  await failAfterOutput(conn.id);
  await failAfterOutput(conn.id);
  streak.clearPostOutputFailureStreak("grok-cli", conn.id, "grok-4.6");
  await failAfterOutput(conn.id);
  await failAfterOutput(conn.id);

  assert.equal(accountFallback.getModelLockoutInfo("grok-cli", conn.id, "grok-4.6"), null);
});

test("post-output failure streak counts per provider/connection/model and expires", () => {
  streak.resetPostOutputFailureStreaks();
  const t0 = 1_000_000;
  const hit = (model: string, now: number) =>
    streak.postOutputFailureReachesLockout("grok-cli", "c1", model, now);

  assert.equal(hit("a", t0), false);
  assert.equal(hit("b", t0), false, "another model keeps its own streak");
  assert.equal(hit("a", t0 + 1), false);
  assert.equal(hit("a", t0 + 2), true);
  assert.equal(hit("a", t0 + 3), false, "the streak restarts after it locked");

  streak.resetPostOutputFailureStreaks();
  const window = streak.POST_OUTPUT_FAILURE_STREAK_WINDOW_MS;
  assert.equal(hit("a", t0), false);
  assert.equal(hit("a", t0 + 1), false);
  assert.equal(hit("a", t0 + 1 + window + 1), false, "a stale streak starts over");
});

test("5xx stream failure before any output keeps the model lockout", async () => {
  await resetStorage();
  const conn = await seedGrokCli();

  const result = await auth.markAccountUnavailable(
    conn.id,
    502,
    "Internal error during token generation",
    "grok-cli",
    "grok-4.6",
    null,
    { streamOutputEmitted: false }
  );

  assert.ok(result.cooldownMs > 0);
  assert.equal(
    accountFallback.getModelLockoutInfo("grok-cli", conn.id, "grok-4.6")?.reason,
    "server_error"
  );
});

test("429 after output keeps the rate-limit lockout (only 5xx is exempt)", async () => {
  await resetStorage();
  const conn = await seedGrokCli();

  await auth.markAccountUnavailable(
    conn.id,
    429,
    "The service is temporarily at capacity",
    "grok-cli",
    "grok-4.6",
    null,
    { streamOutputEmitted: true }
  );

  assert.equal(
    accountFallback.getModelLockoutInfo("grok-cli", conn.id, "grok-4.6")?.reason,
    "rate_limited"
  );
});

// ── Plumbing: chatCore learns whether the failing stream emitted output ──

const { createPassthroughStreamWithLogger } = await import("../../open-sse/utils/stream.ts");
const { streamEmittedOutput } = await import("../../open-sse/utils/streamTiming.ts");
const { createStreamFailureFinalizers } =
  await import("../../open-sse/utils/streamFailureFinalization.ts");

/** Feed one chunk, record streamEmittedOutput() while the stream is live, then close it. */
async function emittedAfterChunk(chunk: string | null): Promise<boolean> {
  const transform = createPassthroughStreamWithLogger("grok-cli", null, null, "grok-4.6");
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  if (chunk !== null) {
    await writer.write(new TextEncoder().encode(chunk));
    await reader.read();
  }
  const emitted = streamEmittedOutput(transform);
  // Close + drain so the transform's idle watchdog is cleared and the runner exits.
  const closed = writer.close().catch(() => {});
  while (!(await reader.read().catch(() => ({ done: true }))).done);
  await closed;
  return emitted;
}

test("a stream reports no output before any content chunk is forwarded", async () => {
  assert.equal(await emittedAfterChunk(null), false);
  assert.equal(
    await emittedAfterChunk(
      'data: {"id":"c1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"role":"assistant"}}]}\n\n'
    ),
    false
  );
  assert.equal(streamEmittedOutput(null), false);
  assert.equal(streamEmittedOutput(new TransformStream()), false);
});

test("a stream reports output once a content chunk was forwarded", async () => {
  assert.equal(
    await emittedAfterChunk(
      'data: {"id":"c1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"Hello"}}]}\n\n'
    ),
    true
  );
});

test("stream failure finalizer forwards outputEmitted to onStreamFailure", () => {
  const seen: Array<Record<string, unknown>> = [];
  for (const emitted of [true, false]) {
    const { handleStreamFailure } = createStreamFailureFinalizers({
      isFailureCompletionRecorded: () => false,
      onStreamComplete: () => {},
      persistFailureUsage: () => {},
      onStreamFailure: (failure) => seen.push(failure as Record<string, unknown>),
      hasEmittedOutput: () => emitted,
    });
    handleStreamFailure({ status: 502, message: "Internal error during token generation" });
  }
  assert.deepEqual(
    seen.map((f) => f.outputEmitted),
    [true, false]
  );
});

const { createSSETransformStreamWithLogger } = await import("../../open-sse/utils/stream.ts");

const CONTENT_CHUNK =
  'data: {"id":"c1","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"Hello"}}]}\n\n';
const ERROR_CHUNK =
  'data: {"error":{"message":"Internal error during token generation","type":"server_error"}}\n\n';

/** Drive an upstream stream to its in-stream error; report what the registry said then. */
async function emittedWhenUpstreamFails(
  chunks: string[],
  make: (onFailure: () => boolean) => TransformStream<Uint8Array, Uint8Array>
): Promise<boolean | null> {
  let atFailure: boolean | null = null;
  let transform: TransformStream<Uint8Array, Uint8Array> | null = null;
  transform = make(() => {
    atFailure = streamEmittedOutput(transform);
    return true;
  });
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const drained = (async () => {
    while (!(await reader.read().catch(() => ({ done: true }))).done);
  })();
  for (const chunk of chunks) await writer.write(new TextEncoder().encode(chunk)).catch(() => {});
  await writer.close().catch(() => {});
  await drained;
  return atFailure;
}

const passthrough = (onFailure: () => boolean) =>
  createPassthroughStreamWithLogger(
    "grok-cli",
    null,
    null,
    "grok-4.6",
    null,
    null,
    null,
    null,
    onFailure
  );
const translateToClaude = (onFailure: () => boolean) =>
  createSSETransformStreamWithLogger(
    "openai",
    "claude",
    "grok-cli",
    null,
    null,
    "grok-4.6",
    null,
    null,
    null,
    null,
    onFailure
  );

test("an in-stream upstream error after content reports output (passthrough)", async () => {
  assert.equal(await emittedWhenUpstreamFails([CONTENT_CHUNK, ERROR_CHUNK], passthrough), true);
});

test("an in-stream upstream error before content reports no output, even once forwarded", async () => {
  assert.equal(await emittedWhenUpstreamFails([ERROR_CHUNK], passthrough), false);
});

test("translate-mode streams are registered too", async () => {
  assert.equal(
    await emittedWhenUpstreamFails([CONTENT_CHUNK, ERROR_CHUNK], translateToClaude),
    true
  );
  assert.equal(await emittedWhenUpstreamFails([ERROR_CHUNK], translateToClaude), false);
});
