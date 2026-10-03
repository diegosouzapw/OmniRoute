/**
 * A paused no-auth provider must answer with a retryable cooldown (429 +
 * Retry-After), not a fatal 401 "No active credentials".
 *
 * Symptom: while the short refusal pause covers the shared synthetic
 * connection, every request for that provider received null from selection
 * and surfaced as 401, which clients do not retry.
 */
import { test, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-noauth-pause-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-noauth-pause-secret";

const core = await import("../../src/lib/db/core.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { handleNoCredentials } = await import("../../src/sse/handlers/chatHelpers.ts");
const { noteOpencodeFreeTierSkip, clearOpencodeFreeTierSkips, getOpencodeFreeTierSkipRemainingMs } =
  await import("../../open-sse/services/opencodeFreeTierSkip.ts");
const { pauseCooldownIfPaused } = await import("../../src/sse/services/noAuthModelCooldown.ts");
const { clearAllModelLockouts } = await import("../../open-sse/services/accountFallback.ts");

const PROVIDER = "opencode";
const MODEL = "muse-spark-1.3-contributor-free";

type SelectionOutcome = {
  allRateLimited?: boolean;
  cooldownScope?: string;
  cooldownModel?: string | null;
  lastErrorCode?: number;
  lastError?: string | null;
  retryAfter: string;
  retryAfterHuman?: string;
  connectionsCount?: number;
  connectionId?: string;
} | null;

beforeEach(() => {
  clearOpencodeFreeTierSkips();
  clearAllModelLockouts();
});
after(() => {
  clearOpencodeFreeTierSkips();
  clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("reader reports the positive remaining time while the pause covers the provider", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, 60_000);
  assert.equal(getOpencodeFreeTierSkipRemainingMs(PROVIDER, now + 10_000), 50_000);
});

test("reader returns null with no entry", () => {
  assert.equal(getOpencodeFreeTierSkipRemainingMs(PROVIDER), null);
});

test("reader returns null for a foreign provider", () => {
  noteOpencodeFreeTierSkip(PROVIDER);
  assert.equal(getOpencodeFreeTierSkipRemainingMs("groq"), null);
});

test("reader returns null once the pause expires and drops the entry", () => {
  const now = 1_000_000;
  noteOpencodeFreeTierSkip(PROVIDER, now, 50);
  assert.equal(getOpencodeFreeTierSkipRemainingMs(PROVIDER, now + 50), null);
  assert.equal(getOpencodeFreeTierSkipRemainingMs(PROVIDER, now + 51), null);
});

test("builder returns a connection-scoped 429 envelope near the end of the pause", () => {
  noteOpencodeFreeTierSkip(PROVIDER, Date.now(), 60_000);
  const before = Date.now();
  const outcome = pauseCooldownIfPaused(PROVIDER, "noauth");
  assert.ok(outcome, "an active pause must answer a cooldown, not null");
  if (!outcome) return;
  assert.equal(outcome.allRateLimited, true);
  assert.equal(outcome.lastErrorCode, 429);
  assert.equal(outcome.cooldownScope, "connection");
  assert.equal(outcome.cooldownModel, null);
  assert.equal(outcome.lastError, "The shared no-auth connection is in a refusal pause");
  assert.equal(outcome.connectionsCount, 1);
  const remaining = Date.parse(outcome.retryAfter) - before;
  assert.ok(
    remaining > 0 && remaining <= 60_000 + 2000,
    `retryAfter near pause end (${remaining}ms)`
  );
});

test("active pause returns a cooldown whose retryAfter lands near the pause end", async () => {
  noteOpencodeFreeTierSkip(PROVIDER);
  const result = (await auth.getProviderCredentials(
    PROVIDER,
    null,
    null,
    MODEL
  )) as SelectionOutcome;
  assert.ok(result, "an active pause must not collapse to null");
  if (!result) return;
  assert.equal(result.allRateLimited, true);
  assert.equal(result.lastErrorCode, 429);
  assert.notEqual(result.cooldownScope, "model");
  const remainingMs = Date.parse(result.retryAfter) - Date.now();
  assert.ok(
    remainingMs > 0 && remainingMs <= 3 * 60 * 1000 + 2000,
    `retryAfter near end (${remainingMs}ms)`
  );
});

test("no pause returns the synthetic connection", async () => {
  const result = (await auth.getProviderCredentials(
    PROVIDER,
    null,
    null,
    MODEL
  )) as SelectionOutcome;
  assert.equal(result?.connectionId, "noauth");
});

test("expired pause returns the synthetic connection", async () => {
  noteOpencodeFreeTierSkip(PROVIDER, Date.now() - 200_000, 60_000);
  const result = (await auth.getProviderCredentials(
    PROVIDER,
    null,
    null,
    MODEL
  )) as SelectionOutcome;
  assert.equal(result?.connectionId, "noauth");
});

test("excluded noauth connection keeps returning null during a pause", async () => {
  noteOpencodeFreeTierSkip(PROVIDER);
  const result = await auth.getProviderCredentials(PROVIDER, "noauth", null, MODEL);
  assert.equal(result, null);
});

test("restricted allowlist keeps returning null during a pause", async () => {
  noteOpencodeFreeTierSkip(PROVIDER);
  const result = await auth.getProviderCredentials(PROVIDER, null, ["conn-other"], MODEL);
  assert.equal(result, null);
});

test("another provider is unchanged during a pause", async () => {
  noteOpencodeFreeTierSkip(PROVIDER);
  const result = await auth.getProviderCredentials("groq", null, null, MODEL);
  assert.equal(result, null);
});

test("pause cooldown maps to a 429 with Retry-After on a fresh attempt", async () => {
  noteOpencodeFreeTierSkip(PROVIDER);
  const credentials = await auth.getProviderCredentials(PROVIDER, null, null, MODEL);
  const res = handleNoCredentials(credentials, null, PROVIDER, MODEL, null, null);
  assert.equal(res.status, 429);
  assert.ok(res.headers.get("Retry-After"), "429 carries Retry-After");
  const body = (await res.json()) as { error: { code?: string } };
  assert.notEqual(body.error.code, "model_cooldown");
});

test("pause cooldown on a retried attempt documents the inherited status", async () => {
  noteOpencodeFreeTierSkip(PROVIDER);
  const credentials = await auth.getProviderCredentials(PROVIDER, null, null, MODEL);
  const res = handleNoCredentials(credentials, null, PROVIDER, MODEL, null, 500);
  assert.equal(res.status, 500);
});

test("a refusal arms the pause and the next selection answers the retryable cooldown", async () => {
  const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
  const { getExecutor } = await import("../../open-sse/executors/index.ts");
  const originalFetch = globalThis.fetch;
  const credentials = await auth.getProviderCredentials(PROVIDER, null, null, MODEL);
  assert.equal((credentials as SelectionOutcome)?.connectionId, "noauth");
  const executor = await getExecutor(PROVIDER);
  const originalRefresh = executor.refreshCredentials;
  executor.refreshCredentials = async () => null;
  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        type: "error",
        error: {
          type: "FreeTierError",
          message:
            "Error from provider (Console): OpenCode's free tier can only be used from within OpenCode",
        },
      }),
      { status: 403, headers: { "content-type": "application/json" } }
    );
  try {
    const requestBody = {
      model: MODEL,
      messages: [{ role: "user", content: "hi" }],
      stream: false,
    };
    await handleChatCore({
      body: structuredClone(requestBody),
      modelInfo: { provider: PROVIDER, model: MODEL, extendedContext: false },
      credentials,
      log: { debug() {}, info() {}, warn() {}, error() {} },
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body: structuredClone(requestBody),
        headers: new Headers({ accept: "application/json" }),
      },
      connectionId: (credentials as SelectionOutcome)?.connectionId ?? null,
    });
  } finally {
    executor.refreshCredentials = originalRefresh;
    globalThis.fetch = originalFetch;
  }
  const next = (await auth.getProviderCredentials(PROVIDER, null, null, MODEL)) as SelectionOutcome;
  assert.ok(next?.allRateLimited, "the armed pause must answer a cooldown, not null");
  assert.equal(next?.lastErrorCode, 429);
  const res = handleNoCredentials(next, null, PROVIDER, MODEL, null, null);
  assert.equal(res.status, 429);
  assert.ok(res.headers.get("Retry-After"), "429 carries Retry-After");
});

test("storage returns to its starting size after pauses expire", () => {
  const start = Date.now();
  const count = 25;
  for (let i = 0; i < count; i += 1) {
    noteOpencodeFreeTierSkip(`opencode-${i}`, start, 50);
  }
  for (let i = 0; i < count; i += 1) {
    assert.equal(getOpencodeFreeTierSkipRemainingMs(`opencode-${i}`, start + 51), null);
  }
  assert.equal(getOpencodeFreeTierSkipRemainingMs(PROVIDER, start + 51), null);
});
