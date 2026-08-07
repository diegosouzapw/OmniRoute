import { test } from "node:test";
import assert from "node:assert/strict";
import { createProviderConnection } from "@/lib/db/providers";
import {
  parseRetryAfterHeader,
  detectTestKind,
  extractProviderErrorMessage,
  extractModelTestResponseText,
  runSingleModelTest,
  resolveModelTestTimeoutMs,
  classifyTestErrorQuota,
} from "@/lib/api/modelTestRunner.ts";

// ---------------------------------------------------------------------------
// parseRetryAfterHeader — Retry-After is either delta-seconds or an HTTP-date.
// Regression guard for the rate-limit handling in runSingleModelTest (#3267).
// ---------------------------------------------------------------------------

test("parseRetryAfterHeader returns undefined for missing/empty/null input", () => {
  assert.equal(parseRetryAfterHeader(null), undefined);
  assert.equal(parseRetryAfterHeader(undefined), undefined);
  assert.equal(parseRetryAfterHeader(""), undefined);
  assert.equal(parseRetryAfterHeader("   "), undefined);
});

test("parseRetryAfterHeader parses delta-seconds (numeric form)", () => {
  assert.equal(parseRetryAfterHeader("0"), 0);
  assert.equal(parseRetryAfterHeader("30"), 30);
  assert.equal(parseRetryAfterHeader("120"), 120);
  // fractional seconds round up (ceil) so we never under-wait
  assert.equal(parseRetryAfterHeader("1.2"), 2);
});

test("parseRetryAfterHeader rejects non-date garbage and never yields a misleading positive wait", () => {
  // Pure garbage with no parseable date → undefined.
  assert.equal(parseRetryAfterHeader("soon"), undefined);
  assert.equal(parseRetryAfterHeader("NaN"), undefined);
  // A negative numeric is not accepted on the numeric path (>= 0 guard); it
  // falls through to Date.parse, which yields a past date → clamped to 0.
  // The important guarantee is that it never produces a positive wait.
  const negative = parseRetryAfterHeader("-5");
  assert.ok(negative === undefined || negative === 0, `expected 0/undefined, got ${negative}`);
});

test("parseRetryAfterHeader parses an HTTP-date into a non-negative seconds delta", () => {
  // A date ~10s in the future should yield a small positive integer (>=0).
  const future = new Date(Date.now() + 10_000).toUTCString();
  const secs = parseRetryAfterHeader(future);
  assert.ok(typeof secs === "number");
  assert.ok(secs >= 0 && secs <= 11, `expected ~10s, got ${secs}`);

  // A date in the past clamps to 0 (never negative).
  const past = new Date(Date.now() - 60_000).toUTCString();
  assert.equal(parseRetryAfterHeader(past), 0);
});

// ---------------------------------------------------------------------------
// detectTestKind — picks the right test endpoint (chat / embeddings / rerank /
// audio-transcriptions) from the model id + custom-model metadata. Audio wins over
// both, then rerank wins over embedding.
// ---------------------------------------------------------------------------

test("detectTestKind defaults to a plain chat test for ordinary models", () => {
  assert.deepEqual(detectTestKind("openai/gpt-4o", null), {
    isRerank: false,
    isEmbedding: false,
    isAudioTranscription: false,
  });
});

test("detectTestKind detects embeddings by id heuristics", () => {
  for (const id of [
    "openai/text-embedding-3-small",
    "jina/jina-embeddings-v3",
    "baai/bge-m3",
    "jinaai/jina-clip-v2",
    "colbert-ir/colbertv2",
  ]) {
    assert.equal(detectTestKind(id, null).isEmbedding, true, `${id} should be embedding`);
    assert.equal(detectTestKind(id, null).isRerank, false, `${id} should not be rerank`);
  }
});

test("detectTestKind detects rerank by id and by metadata, and rerank wins over embedding", () => {
  assert.deepEqual(detectTestKind("jina/jina-reranker-v2", null), {
    isRerank: true,
    isEmbedding: false,
    isAudioTranscription: false,
  });
  // apiFormat metadata drives detection even when the id is opaque
  assert.equal(detectTestKind("vendor/opaque-model", { apiFormat: "rerank" }).isRerank, true);
  assert.equal(
    detectTestKind("vendor/opaque-model", { supportedEndpoints: ["embeddings"] }).isEmbedding,
    true
  );
  // A model that looks like both rerank and embedding resolves to rerank only.
  const both = detectTestKind("vendor/rerank-embedding-hybrid", null);
  assert.equal(both.isRerank, true);
  assert.equal(both.isEmbedding, false);
});

test("detectTestKind detects audio transcription from metadata, and it wins over rerank/embedding", () => {
  // Audio nodes are detected from metadata only — there is no id heuristic, because an
  // OpenAI-compatible audio node commonly exposes opaque model ids (e.g. a gateway that
  // returns GUIDs from /models).
  assert.deepEqual(detectTestKind("vendor/opaque-model", { apiFormat: "audio-transcriptions" }), {
    isRerank: false,
    isEmbedding: false,
    isAudioTranscription: true,
  });
  assert.equal(
    detectTestKind("vendor/opaque-model", { supportedEndpoints: ["audio-transcriptions"] })
      .isAudioTranscription,
    true
  );

  // An audio node must not be probed as embedding/rerank just because its id happens to
  // match those heuristics — otherwise the Check hits the wrong endpoint.
  const audioLookingLikeEmbedding = detectTestKind("vendor/text-embedding-whisper", {
    apiFormat: "audio-transcriptions",
  });
  assert.equal(audioLookingLikeEmbedding.isAudioTranscription, true);
  assert.equal(audioLookingLikeEmbedding.isEmbedding, false);
  assert.equal(audioLookingLikeEmbedding.isRerank, false);
});

test("detectTestKind falls back to the provider node's configured apiType", () => {
  // Imported/synced models carry no per-model metadata (they come straight from the
  // upstream /models list, often as opaque ids). The node's own apiType is then the only
  // signal for which endpoint the Play button may probe — without it the runner defaults
  // to chat and an audio-only node answers "All AI backends exhausted for chat".
  const audio = detectTestKind("vendor/0123456789abcdef", null, "audio-transcriptions");
  assert.equal(audio.isAudioTranscription, true);
  assert.equal(audio.isEmbedding, false);
  assert.equal(audio.isRerank, false);

  const embeddings = detectTestKind("vendor/opaque-guid", null, "embeddings");
  assert.equal(embeddings.isEmbedding, true);
  assert.equal(embeddings.isAudioTranscription, false);

  // A chat node (or no node at all) keeps the plain chat default.
  assert.deepEqual(detectTestKind("vendor/opaque-guid", null, "chat"), {
    isRerank: false,
    isEmbedding: false,
    isAudioTranscription: false,
  });

  // Per-model metadata still wins when present.
  const modelSaysAudio = detectTestKind(
    "vendor/opaque-guid",
    { apiFormat: "audio-transcriptions" },
    "chat"
  );
  assert.equal(modelSaysAudio.isAudioTranscription, true);
});

test("extractProviderErrorMessage includes upstream details when generic error is unhelpful", () => {
  const body = {
    error: { message: "HuggingChat returned HTTP 500" },
    upstream_details: {
      message: "Model is temporarily overloaded",
      status: "error",
    },
  };

  assert.equal(
    extractProviderErrorMessage(body, "Internal Server Error"),
    "HuggingChat returned HTTP 500: Model is temporarily overloaded"
  );
});

test("resolveModelTestTimeoutMs extends Dola Pro model checks", () => {
  assert.equal(resolveModelTestTimeoutMs("doubao-web", "dola-pro", 10_000), 90_000);
  assert.equal(resolveModelTestTimeoutMs("doubao-web", "doubao-web/dola-pro", 10_000), 90_000);
  assert.equal(resolveModelTestTimeoutMs("DOUBAO-WEB", "dola-pro", 120_000), 120_000);
});

test("resolveModelTestTimeoutMs leaves ordinary models unchanged", () => {
  assert.equal(resolveModelTestTimeoutMs("doubao-web", "dola-speed", 10_000), 10_000);
  assert.equal(resolveModelTestTimeoutMs("openai", "dola-pro", 10_000), 10_000);
});

test("extractModelTestResponseText accepts JSON when a streaming probe is ignored upstream", async () => {
  const response = new Response(
    JSON.stringify({ choices: [{ message: { role: "assistant", content: "OK" } }] }),
    { headers: { "content-type": "Application/JSON; charset=utf-8" } }
  );

  assert.deepEqual(await extractModelTestResponseText(response, true), { text: "OK" });
});

test("extractModelTestResponseText extracts content from SSE responses", async () => {
  const response = new Response(
    'data: {"choices":[{"delta":{"content":"OK"}}]}\n\ndata: [DONE]\n',
    {
      headers: { "content-type": "text/event-stream" },
    }
  );

  assert.deepEqual(await extractModelTestResponseText(response, true), { text: "OK" });
});

test("extractModelTestResponseText preserves SSE error status for transient classification", async () => {
  const response = new Response(
    'data: {"error":{"message":"Rate limit exceeded","status":429}}\n\n',
    { headers: { "content-type": "text/event-stream" } }
  );

  assert.deepEqual(await extractModelTestResponseText(response, true), {
    text: "",
    error: { message: "Rate limit exceeded", statusCode: 429 },
  });
});

test("runSingleModelTest preserves slow timeout after chatCore converts AbortError to a Response", async () => {
  const connection = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "model-test-timeout-regression",
    apiKey: "sk-model-test-timeout-regression",
    isActive: true,
    testStatus: "active",
  });
  const originalFetch = globalThis.fetch;

  // Warm up the chat-completions pipeline (SSE translators, compression
  // settings, etc. all lazy-init on the very first real request in a
  // process) with a fast, immediately-resolving mock and a generous
  // timeout *before* asserting on the 1s abort-timing below. Without this,
  // the first-request cold-start cost can eat the entire 1s budget below,
  // so the AbortController fires before chatCore ever reaches the
  // executor's fetch() call — by the time that in-flight call actually
  // dispatches, this test's own `finally` block has already restored
  // `globalThis.fetch`, and the assertions below race real upstream I/O
  // instead of exercising the mock.
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ choices: [{ message: { role: "assistant", content: "OK" } }] }), {
      headers: { "content-type": "application/json" },
    });
  await runSingleModelTest({
    providerId: "openai",
    modelId: "gpt-4o",
    connectionId: String(connection.id),
    timeoutMs: 10_000,
  });

  let upstreamSignal: AbortSignal | null = null;
  let upstreamCalled = false;

  globalThis.fetch = async (_input, init = {}) => {
    upstreamCalled = true;
    upstreamSignal = (init.signal as AbortSignal | null | undefined) ?? null;
    return new Promise<Response>((_resolve, reject) => {
      let fallbackTimer: ReturnType<typeof setTimeout>;
      const rejectOnAbort = () => {
        clearTimeout(fallbackTimer);
        reject(new DOMException("The operation was aborted", "AbortError"));
      };
      fallbackTimer = setTimeout(rejectOnAbort, 1_500);

      if (upstreamSignal?.aborted) {
        rejectOnAbort();
      } else {
        upstreamSignal?.addEventListener("abort", rejectOnAbort, { once: true });
      }
    });
  };

  try {
    const result = await runSingleModelTest({
      providerId: "openai",
      modelId: "gpt-4o",
      connectionId: String(connection.id),
      timeoutMs: 1_000,
    });

    assert.equal(upstreamCalled, true);
    assert.ok(upstreamSignal, "the chat completion request should receive an abort signal");
    assert.equal(result.status, "slow");
    assert.equal(result.httpStatus, 504);
    assert.equal(result.isTimeout, true);
    assert.equal(result.error, "No model output within 1s");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("resolveModelTestTimeoutMs defaults ordinary model checks to 30 seconds", () => {
  assert.equal(resolveModelTestTimeoutMs("github-models", "openai/gpt-4.1"), 30_000);
});

test("resolveModelTestTimeoutMs gives GitHub Phi-4 Reasoning up to 60 seconds", () => {
  assert.equal(
    resolveModelTestTimeoutMs("github-models", "microsoft/phi-4-reasoning", 30_000),
    60_000
  );
  assert.equal(
    resolveModelTestTimeoutMs("github-models", "github-models/microsoft/phi-4-reasoning", 30_000),
    60_000
  );
  assert.equal(
    resolveModelTestTimeoutMs("github-models", "microsoft/phi-4-reasoning", 90_000),
    90_000
  );
});

// ---------------------------------------------------------------------------
// classifyTestErrorQuota — #9511 quota classification for Test All auto-hide.
// Distinguishes three outcomes:
//   1. Daily-quota exhausted → isQuota + isTransient (resets tomorrow)
//   2. Credits/balance exhausted → isQuota only (needs top-up, not transient)
//   3. Other errors → no quota flags (still auto-hidable)
// ---------------------------------------------------------------------------

test("classifyTestErrorQuota: credits-exhausted signals produce isQuota without isTransient", () => {
  const creditsSignals = [
    "insufficient_balance",
    "insufficient balance",
    "insufficient_quota",
    "insufficient account balance",
    "credits exhausted",
    "out of credits",
    "credit_balance_too_low",
    "your credit balance is too low",
    "payment required",
    "billing_hard_limit_reached",
    "exceeded your current quota",
    "free tier of the model has been exhausted",
  ];
  for (const signal of creditsSignals) {
    const result = classifyTestErrorQuota(signal);
    assert.equal(result.isQuota, true, `signal="${signal}" should be isQuota`);
    assert.equal(result.isTransient, undefined, `signal="${signal}" should NOT be isTransient`);
  }
});

test("classifyTestErrorQuota: daily-quota signals produce isQuota + isTransient", () => {
  const dailySignals = [
    "today's quota has been exceeded",
    "daily quota exhausted",
    "Resource exhausted. Try again tomorrow.",
  ];
  for (const signal of dailySignals) {
    const result = classifyTestErrorQuota(signal);
    assert.equal(result.isQuota, true, `signal="${signal}" should be isQuota`);
    assert.equal(result.isTransient, true, `signal="${signal}" should be isTransient`);
  }
});

test("classifyTestErrorQuota: generic errors produce no quota flags", () => {
  const genericErrors = [
    "invalid model",
    "model not found",
    "unauthorized",
    "forbidden",
    "bad request",
    "internal server error",
  ];
  for (const msg of genericErrors) {
    const result = classifyTestErrorQuota(msg);
    assert.equal(result.isQuota, undefined, `msg="${msg}" should NOT be isQuota`);
    assert.equal(result.isTransient, undefined, `msg="${msg}" should NOT be isTransient`);
  }
});

test("classifyTestErrorQuota: empty/null input produces no quota flags", () => {
  assert.deepEqual(classifyTestErrorQuota(""), {});
  assert.deepEqual(classifyTestErrorQuota("   "), {});
});

test("classifyTestErrorQuota: daily-quota wins over credits-exhausted (isTransient=true)", () => {
  // If an error text matches both daily-quota and credits-exhausted signals,
  // daily-quota wins — it's the more specific (transient) classification.
  const result = classifyTestErrorQuota("daily quota exhausted, insufficient balance");
  assert.equal(result.isQuota, true);
  assert.equal(result.isTransient, true);
});
