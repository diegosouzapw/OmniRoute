import test from "node:test";
import assert from "node:assert/strict";

import { BaseExecutor } from "../../open-sse/executors/base.ts";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import {
  INTRA_RETRY_MAX_HINT_MS,
  readRateLimitRetryHintMs,
} from "../../open-sse/executors/rateLimitIntraRetry.ts";

// A Gemini free-tier account under RPM/TPM pressure answers 429 with a
// google.rpc.RetryInfo hint (typically tens of seconds). The executor's intra-URL
// retry used to hit the same account twice more, 2 s apart, before handing the 429
// back for account rotation: 3 upstream calls per throttled account, each one
// guaranteed to fail, multiplying the 429 volume by 3 across a pool of accounts.

function gemini429(retryDelay: string, headers: Record<string, string> = {}) {
  return new Response(
    JSON.stringify({
      error: {
        code: 429,
        message: "You exceeded your current quota, please check your plan and billing details.",
        status: "RESOURCE_EXHAUSTED",
        details: [{ "@type": "type.googleapis.com/google.rpc.RetryInfo", retryDelay }],
      },
    }),
    { status: 429, headers: { "Content-Type": "application/json", ...headers } }
  );
}

async function executeAgainst(responses: () => Response) {
  const originalFetch = globalThis.fetch;
  const originalDelay = BaseExecutor.RETRY_CONFIG.delayMs;
  let calls = 0;
  (BaseExecutor.RETRY_CONFIG as { delayMs: number }).delayMs = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    return responses();
  }) as typeof fetch;
  try {
    const result = await new DefaultExecutor("gemini").execute({
      model: "gemini-2.5-flash",
      body: { contents: [{ role: "user", parts: [{ text: "hi" }] }] },
      stream: false,
      credentials: { apiKey: "synthetic-free-tier-key", connectionId: "conn-a" },
    });
    return { status: result.response.status, calls, body: await result.response.text() };
  } finally {
    globalThis.fetch = originalFetch;
    (BaseExecutor.RETRY_CONFIG as { delayMs: number }).delayMs = originalDelay;
  }
}

test("429 with a RetryInfo hint beyond the retry window is returned after ONE upstream call", async () => {
  const { status, calls, body } = await executeAgainst(() => gemini429("37s"));
  assert.equal(status, 429);
  assert.equal(calls, 1, "same-account retries inside a 37s throttle window are wasted calls");
  assert.match(body, /RetryInfo/, "the original body still reaches the caller for lockout");
});

test("429 with a long Retry-After header is returned after ONE upstream call", async () => {
  const { calls } = await executeAgainst(
    () =>
      new Response(JSON.stringify({ error: { message: "slow down" } }), {
        status: 429,
        headers: { "Retry-After": "60" },
      })
  );
  assert.equal(calls, 1);
});

test("429 with a short hint keeps the intra-URL retry (transient burst)", async () => {
  const { calls } = await executeAgainst(() => gemini429("1s"));
  assert.equal(calls, 1 + BaseExecutor.RETRY_CONFIG.maxAttempts);
});

test("429 without any hint keeps the intra-URL retry", async () => {
  const { calls } = await executeAgainst(
    () => new Response(JSON.stringify({ error: { message: "rate limited" } }), { status: 429 })
  );
  assert.equal(calls, 1 + BaseExecutor.RETRY_CONFIG.maxAttempts);
});

test("readRateLimitRetryHintMs prefers the header and leaves the body readable", async () => {
  const response = gemini429("37s", { "Retry-After": "5" });
  assert.equal(await readRateLimitRetryHintMs(response), 5_000);
  assert.equal(await readRateLimitRetryHintMs(gemini429("37s")), 37_000);
  assert.match(await response.text(), /RetryInfo/);
  assert.ok(INTRA_RETRY_MAX_HINT_MS < 37_000);
});
