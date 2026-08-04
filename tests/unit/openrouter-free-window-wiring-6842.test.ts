/**
 * #6842 follow-up — wire the OpenRouter `:free`-window counter into the
 * actual request pipeline (dispatch + combo preflight skip).
 *
 * The counter itself (open-sse/services/openrouterFreeWindow.ts) shipped in
 * #6842 but was never called anywhere outside the dashboard usage reader —
 * combos kept spending guaranteed-429 requests on exhausted `:free` targets.
 * This file proves the two wiring chokepoints:
 *
 *   1. RECORD — open-sse/executors/base.ts dispatches a `:free`-variant
 *      OpenRouter request -> recordFreeWindowAttempt() fires, and a 429
 *      response carrying X-RateLimit-* headers self-corrects the local
 *      counter via correctFromRateLimitHeaders().
 *   2. ENFORCE — open-sse/services/openrouterQuotaFetcher.ts's
 *      fetchOpenrouterQuotaWithFreeWindowPreflight() (the function actually
 *      registered with quotaPreflight.ts / quotaMonitor.ts — the same
 *      chokepoint the PR's own /key+/credits check uses) returns
 *      limitReached:true for an exhausted `:free` model WITHOUT making any
 *      network call — proving combos skip the target instead of dispatching
 *      a guaranteed-429 request. It wraps the unchanged fetchOpenrouterQuota()
 *      so the free-window short-circuit doesn't add branching to that
 *      function's own (already tight) cyclomatic-complexity budget.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import {
  clearFreeWindowState,
  getFreeWindowStatus,
  resolveAccountKey,
} from "../../open-sse/services/openrouterFreeWindow.ts";
import {
  fetchOpenrouterQuotaWithFreeWindowPreflight,
  invalidateOpenrouterQuotaCache,
} from "../../open-sse/services/openrouterQuotaFetcher.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  clearFreeWindowState();
});

// ─── 1. RECORD: dispatching a `:free` request increments the window ───────

test("DefaultExecutor(openrouter) records a free-window attempt when dispatching a :free model", async () => {
  const executor = new DefaultExecutor("openrouter");
  const connectionId = `openrouter-record-${Date.now()}`;
  let fetchCalls = 0;

  globalThis.fetch = async () => {
    fetchCalls += 1;
    return new Response(JSON.stringify({ choices: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  const accountKey = resolveAccountKey(connectionId, {});
  assert.equal(getFreeWindowStatus(accountKey).dailyUsed, 0, "precondition: window starts empty");

  await executor.execute({
    model: "x-ai/grok-4-fast:free",
    body: { model: "x-ai/grok-4-fast:free", messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: { apiKey: "or-test-key", connectionId },
  });

  assert.equal(fetchCalls, 1, "sanity: request was actually dispatched");
  assert.equal(
    getFreeWindowStatus(accountKey).dailyUsed,
    1,
    "recordFreeWindowAttempt should have incremented the daily counter"
  );
});

test("DefaultExecutor(openrouter) does NOT record a free-window attempt for a non-:free model", async () => {
  const executor = new DefaultExecutor("openrouter");
  const connectionId = `openrouter-nonfree-${Date.now()}`;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ choices: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  const accountKey = resolveAccountKey(connectionId, {});

  await executor.execute({
    model: "x-ai/grok-4-fast",
    body: { model: "x-ai/grok-4-fast", messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: { apiKey: "or-test-key", connectionId },
  });

  assert.equal(
    getFreeWindowStatus(accountKey).dailyUsed,
    0,
    "paid (non-:free) OpenRouter models must not touch the free-window counter"
  );
});

test("DefaultExecutor(openrouter) self-corrects the free window from X-RateLimit-* response headers on 429", async () => {
  const executor = new DefaultExecutor("openrouter");
  const connectionId = `openrouter-correct-${Date.now()}`;

  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "rate limited" }), {
      status: 429,
      headers: {
        "Content-Type": "application/json",
        "x-ratelimit-limit": "50",
        "x-ratelimit-remaining": "0",
        "x-ratelimit-reset": String(Math.floor(Date.now() / 1000) + 3600),
      },
    });

  const accountKey = resolveAccountKey(connectionId, {});

  await executor.execute({
    model: "x-ai/grok-4-fast:free",
    body: { model: "x-ai/grok-4-fast:free", messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: { apiKey: "or-test-key", connectionId },
    skipUpstreamRetry: true,
  });

  const status = getFreeWindowStatus(accountKey);
  assert.equal(status.dailyRemaining, 0, "server-reported remaining should override the local count");
  assert.equal(status.dailyLimit, 50, "server-reported limit should be adopted");
});

// ─── 2. ENFORCE: exhausted free window short-circuits the quota preflight ─

test("fetchOpenrouterQuotaWithFreeWindowPreflight returns limitReached for an exhausted :free model WITHOUT calling fetch (RED without wiring)", async () => {
  const connectionId = `openrouter-enforce-${Date.now()}`;
  const accountKey = resolveAccountKey(connectionId, {});

  // Exhaust the daily window (default cap: 50/day at $0 purchased-tier).
  for (let i = 0; i < 50; i++) {
    const { recordFreeWindowAttempt } = await import(
      "../../open-sse/services/openrouterFreeWindow.ts"
    );
    recordFreeWindowAttempt(accountKey);
  }
  assert.equal(getFreeWindowStatus(accountKey).dailyRemaining, 0, "precondition: window exhausted");

  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return new Response(JSON.stringify({ data: {} }), { status: 200 });
  };

  const quota = await fetchOpenrouterQuotaWithFreeWindowPreflight(connectionId, {
    apiKey: "or-test-key",
    requestedModel: "x-ai/grok-4-fast:free",
  });

  assert.equal(fetchCalls, 0, "an exhausted free window must short-circuit BEFORE any /key or /credits call");
  assert.ok(quota, "quota should be a limitReached result, not null");
  assert.equal(quota!.limitReached, true, "combo preflight must see limitReached to skip this target");
  invalidateOpenrouterQuotaCache(connectionId);
});

test("fetchOpenrouterQuotaWithFreeWindowPreflight proceeds to the normal /key+/credits fetch when the free window is NOT exhausted", async () => {
  const connectionId = `openrouter-enforce-ok-${Date.now()}`;

  let fetchCalls = 0;
  globalThis.fetch = async (url) => {
    fetchCalls += 1;
    if (String(url).endsWith("/key")) {
      return new Response(
        JSON.stringify({
          data: { limit: null, limit_remaining: null, limit_reset: null, is_free_tier: true },
        }),
        { status: 200 }
      );
    }
    return new Response(JSON.stringify({ data: {} }), { status: 200 });
  };

  const quota = await fetchOpenrouterQuotaWithFreeWindowPreflight(connectionId, {
    apiKey: "or-test-key",
    requestedModel: "x-ai/grok-4-fast:free",
  });

  assert.ok(fetchCalls > 0, "with window remaining, the fetcher must still hit /key + /credits");
  assert.ok(quota);
  invalidateOpenrouterQuotaCache(connectionId);
});

test("fetchOpenrouterQuotaWithFreeWindowPreflight ignores free-window state for non-:free requestedModel", async () => {
  const connectionId = `openrouter-enforce-nonfree-${Date.now()}`;
  const accountKey = resolveAccountKey(connectionId, {});
  const { recordFreeWindowAttempt } = await import(
    "../../open-sse/services/openrouterFreeWindow.ts"
  );
  for (let i = 0; i < 50; i++) recordFreeWindowAttempt(accountKey);

  let fetchCalls = 0;
  globalThis.fetch = async (url) => {
    fetchCalls += 1;
    if (String(url).endsWith("/key")) {
      return new Response(
        JSON.stringify({
          data: { limit: null, limit_remaining: null, limit_reset: null, is_free_tier: false },
        }),
        { status: 200 }
      );
    }
    return new Response(JSON.stringify({ data: {} }), { status: 200 });
  };

  const quota = await fetchOpenrouterQuotaWithFreeWindowPreflight(connectionId, {
    apiKey: "or-test-key",
    requestedModel: "x-ai/grok-4-fast", // paid variant — exhausted free window is irrelevant
  });

  assert.ok(fetchCalls > 0, "a paid model must never be short-circuited by the free-window counter");
  assert.ok(quota);
  invalidateOpenrouterQuotaCache(connectionId);
});
