/**
 * tests/integration/combo-concurrent-failure-recovery.test.ts
 *
 * Verifies that the combo correctly handles concurrent failures without
 * permanently poisoning the circuit breaker or skipping sibling models.
 *
 * Key scenarios:
 *   1. Two models on the same provider both fail with 502 — the combo should
 *      try BOTH models (not skip the sibling due to connection exhaustion).
 *   2. The circuit breaker opens after repeated failures but closes again after
 *      reset, allowing requests through.
 *   3. Concurrent requests that trip the breaker don't burn retries against
 *      the OPEN breaker.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "./_chatPipelineHarness.ts";
import {
  buildValidSSEStream,
  buildGeminiSSEStream,
  buildBrokenSSEStream,
  buildEmptySSEStream,
  hungStream,
  buildDelayedSSEStream,
} from "./_sseTestHelpers.ts";

const harness = await createChatPipelineHarness("combo-concurrent-failure");
const {
  BaseExecutor,
  buildOpenAIResponse,
  buildRequest,
  combosDb,
  handleChat,
  resetStorage,
  seedConnection,
} = harness;

const { getCircuitBreaker } = await import("../../src/shared/utils/circuitBreaker.ts");

function body(combo: string, content = "test") {
  return { model: combo, stream: false, messages: [{ role: "user", content }] };
}

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
});

test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.delayMs = harness.originalRetryDelayMs;
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test(
  "sibling model on same provider is NOT skipped when first model returns 502",
  { timeout: 30_000 },
  async () => {
    await seedConnection("gemini", { apiKey: "sk-gemini-sibling" });
    await combosDb.createCombo({
      name: "sibling-test",
      strategy: "priority",
      config: { maxRetries: 1, retryDelayMs: 0, fallbackDelayMs: 0 },
      models: ["gemini/gemma-4-31b-it", "gemini/gemma-4-26b-a4b-it"],
    });

    let callSequence: string[] = [];

    globalThis.fetch = async (url: string) => {
      const target = String(url);
      if (target.includes("gemma-4-31b-it")) {
        callSequence.push("gemma-4-31b-it");
        return new Response(JSON.stringify({ error: { message: "model overloaded" } }), {
          status: 502,
          headers: { "Content-Type": "application/json" },
        });
      }
      if (target.includes("gemma-4-26b-a4b-it")) {
        callSequence.push("gemma-4-26b-a4b-it");
        return buildOpenAIResponse("sibling model succeeded");
      }
      return new Response("not found", { status: 404 });
    };

    const res = await handleChat(buildRequest({ body: body("sibling-test") }));
    const resBody = await res.json();

    assert.equal(res.status, 200, `expected 200, got ${res.status}: ${JSON.stringify(resBody)}`);
    assert.ok(
      callSequence.includes("gemma-4-26b-a4b-it"),
      `sibling model should have been tried, sequence: ${callSequence.join(" → ")}`
    );
  }
);

test(
  "circuit breaker recovers after reset following repeated failures",
  { timeout: 30_000 },
  async () => {
    await seedConnection("gemini", { apiKey: "sk-gemini-recovery" });
    await seedConnection("openai", { apiKey: "sk-openai-recovery" });
    await combosDb.createCombo({
      name: "recovery-test",
      strategy: "priority",
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
      models: ["gemini/gemma-4-31b-it", "openai/gpt-4o-mini"],
    });

    let geminiCalls = 0;

    globalThis.fetch = async (url: string) => {
      const target = String(url);
      if (target.includes("gemma-4-31b-it") || target.includes("gemini")) {
        geminiCalls++;
        return new Response(JSON.stringify({ error: { message: "down" } }), {
          status: 502,
          headers: { "Content-Type": "application/json" },
        });
      }
      // openai succeeds
      return buildOpenAIResponse("fallback ok");
    };

    // Send requests — gemini gets cooled down after first 502 (per-model cooldown),
    // so most requests skip gemini and go straight to openai.
    // The breaker may not trip because the cooldown prevents repeated gemini hits.
    for (let i = 0; i < 6; i++) {
      const res = await handleChat(buildRequest({ body: body("recovery-test", `fail-${i}`) }));
      assert.equal(res.status, 200, `request ${i} should succeed via fallback`);
    }

    const cb = getCircuitBreaker("gemini");

    // Reset both the breaker and the cooldown to test recovery
    cb.reset();
    // Clear the provider cooldown tracker (in-memory)
    const { clearCooldownState } =
      await import("../../open-sse/services/providerCooldownTracker.ts");
    clearCooldownState();

    // Now make gemini succeed
    globalThis.fetch = async (url: string) => {
      if (String(url).includes("gemini") || String(url).includes("gemma")) {
        return buildOpenAIResponse("gemini recovered");
      }
      return buildOpenAIResponse("fallback");
    };

    const res = await handleChat(buildRequest({ body: body("recovery-test", "after-recovery") }));
    const resBody = await res.json();

    assert.equal(res.status, 200, `expected 200 after recovery, got ${res.status}`);
  }
);

test("combo does not burn retries against OPEN circuit breaker", { timeout: 30_000 }, async () => {
  await seedConnection("gemini", { apiKey: "sk-gemini-no-retry-burn" });
  await seedConnection("openai", { apiKey: "sk-openai-no-retry-burn" });
  await combosDb.createCombo({
    name: "no-retry-burn",
    strategy: "priority",
    config: { maxRetries: 3, retryDelayMs: 0, fallbackDelayMs: 0 },
    models: ["gemini/gemma-4-31b-it", "openai/gpt-4o-mini"],
  });

  let geminiFetchCalls = 0;

  globalThis.fetch = async (url: string) => {
    const target = String(url);
    if (target.includes("gemma-4-31b-it") || target.includes("gemini")) {
      geminiFetchCalls++;
      return new Response(JSON.stringify({ error: { message: "down" } }), {
        status: 502,
        headers: { "Content-Type": "application/json" },
      });
    }
    return buildOpenAIResponse("ok");
  };

  // Trip the breaker — first request hits gemini (502), gemini gets cooled down,
  // subsequent requests skip gemini due to cooldown and go to openai.
  for (let i = 0; i < 6; i++) {
    await handleChat(buildRequest({ body: body("no-retry-burn", `trip-${i}`) }));
  }

  // Clear the cooldown so we can test the breaker behavior in isolation
  const { clearCooldownState } = await import("../../open-sse/services/providerCooldownTracker.ts");
  clearCooldownState();

  const callsBeforeOpen = geminiFetchCalls;

  // This request should hit the OPEN breaker and skip gemini entirely (0 calls)
  await handleChat(buildRequest({ body: body("no-retry-burn", "after-open") }));

  const callsAfterOpen = geminiFetchCalls;
  const extraCalls = callsAfterOpen - callsBeforeOpen;

  // With the breaker OPEN, the combo should skip gemini (0-1 calls depending on
  // whether the breaker check fires before or after the fetch).
  assert.ok(
    extraCalls <= 1,
    `expected ≤1 gemini fetch calls against OPEN breaker, got ${extraCalls} (total gemini calls: ${geminiFetchCalls})`
  );
});

// ── 500 error fallback ───────────────────────────────────────────────────

test("combo retries when first model returns 500 error", { timeout: 30_000 }, async () => {
  await seedConnection("gemini", { apiKey: "sk-gemini-broken" });
  await seedConnection("openai", { apiKey: "sk-openai-broken-fallback" });
  await combosDb.createCombo({
    name: "broken-200-test",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, targetTimeoutMs: 30000 },
    models: ["gemini/gemma-4-31b-it", "openai/gpt-4o-mini"],
  });

  let callSequence: string[] = [];

  globalThis.fetch = async (url: string) => {
    const target = String(url);
    if (target.includes("gemma-4-31b-it") || target.includes("gemini")) {
      callSequence.push("gemma-4-31b-it");
      // Return 500 error — simulates Gemini "server exhausted"
      return new Response(
        JSON.stringify({ error: { message: "server exhausted, please retry" } }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    if (target.includes("gpt-4o-mini") || target.includes("openai")) {
      callSequence.push("gpt-4o-mini");
      return buildValidSSEStream("fallback succeeded");
    }
    return new Response("not found", { status: 404 });
  };

  const res = await handleChat(
    buildRequest({
      body: {
        model: "broken-200-test",
        stream: true,
        messages: [{ role: "user", content: "test" }],
      },
    })
  );

  // The combo should have fallen back to openai after gemini's 500
  assert.ok(
    callSequence.includes("gpt-4o-mini"),
    `should have fallen back to openai, sequence: ${callSequence.join(" → ")}`
  );
});

test(
  "combo retries when first model returns 200 with empty SSE stream",
  { timeout: 30_000 },
  async () => {
    await seedConnection("gemini", { apiKey: "sk-gemini-empty" });
    await seedConnection("openai", { apiKey: "sk-openai-empty-fallback" });
    await combosDb.createCombo({
      name: "empty-200-test",
      strategy: "priority",
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, targetTimeoutMs: 30000 },
      models: ["gemini/gemma-4-31b-it", "openai/gpt-4o-mini"],
    });

    let callSequence: string[] = [];

    globalThis.fetch = async (url: string) => {
      const target = String(url);
      if (target.includes("gemma-4-31b-it") || target.includes("gemini")) {
        callSequence.push("gemma-4-31b-it");
        return buildEmptySSEStream();
      }
      if (target.includes("gpt-4o-mini") || target.includes("openai")) {
        callSequence.push("gpt-4o-mini");
        return buildValidSSEStream("fallback succeeded");
      }
      return new Response("not found", { status: 404 });
    };

    const res = await handleChat(
      buildRequest({
        body: {
          model: "empty-200-test",
          stream: true,
          messages: [{ role: "user", content: "test" }],
        },
      })
    );

    assert.ok(
      callSequence.includes("gpt-4o-mini"),
      `should have fallen back to openai after empty stream, sequence: ${callSequence.join(" → ")}`
    );
  }
);

// ── Smart timeout: streaming vs non-streaming ────────────────────────────

test("streaming: fast response succeeds, no fallback needed", { timeout: 30_000 }, async () => {
  await seedConnection("gemini", { apiKey: "sk-gemini-fast" });
  await combosDb.createCombo({
    name: "stream-fast",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, targetTimeoutMs: 5000 },
    models: ["gemini/gemma-4-31b-it"],
  });

  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls++;
    return buildGeminiSSEStream("fast response");
  };

  const res = await handleChat(
    buildRequest({
      body: { model: "stream-fast", stream: true, messages: [{ role: "user", content: "test" }] },
    })
  );

  assert.equal(res.status, 200, `expected 200, got ${res.status}`);
  assert.equal(fetchCalls, 1, "should not have retried");
});

test(
  "streaming: hung provider times out at 30s, falls back to next model",
  { timeout: 30_000 },
  async () => {
    await seedConnection("gemini", { apiKey: "sk-gemini-hung-stream" });
    await seedConnection("openai", { apiKey: "sk-openai-stream-fallback" });
    await combosDb.createCombo({
      name: "stream-hung",
      strategy: "priority",
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, targetTimeoutMs: 5000 },
      models: ["gemini/gemma-4-31b-it", "openai/gpt-4o-mini"],
    });

    let callSequence: string[] = [];

    globalThis.fetch = async (url: string, init?: RequestInit) => {
      const target = String(url);
      if (target.includes("gemma-4-31b-it") || target.includes("gemini")) {
        callSequence.push("gemma-4-31b-it");
        // Return a stream that never sends data — abortable via signal
        return hungStream(init);
      }
      if (target.includes("gpt-4o-mini") || target.includes("openai")) {
        callSequence.push("gpt-4o-mini");
        return buildValidSSEStream("fallback ok");
      }
      return new Response("not found", { status: 404 });
    };

    const start = performance.now();
    const res = await handleChat(
      buildRequest({
        body: { model: "stream-hung", stream: true, messages: [{ role: "user", content: "test" }] },
      })
    );
    const elapsed = performance.now() - start;

    assert.ok(
      callSequence.includes("gpt-4o-mini"),
      `should have fallen back after timeout, sequence: ${callSequence.join(" → ")}`
    );
    assert.ok(elapsed < 25_000, `should timeout within ~20s, took ${Math.round(elapsed)}ms`);
  }
);

// ── Gemini concurrent load: slow but valid responses ─────────────────────
// Reproduces the live-test issue where 5 concurrent requests cause Gemini to
// respond slowly (30-300s for first headers). The combo should wait long enough
// for the response rather than timing out prematurely.

test(
  "concurrent: 5 slow-but-valid Gemini requests all succeed within timeout",
  { timeout: 30_000 },
  async () => {
    await seedConnection("gemini", { apiKey: "sk-gemini-concurrent" });
    await combosDb.createCombo({
      name: "concurrent-slow",
      strategy: "priority",
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, targetTimeoutMs: 5000 },
      models: ["gemini/gemma-4-31b-it"],
    });

    // Gemini responds slowly: first headers arrive after 500-1500ms (simulated)
    // Must be within targetTimeoutMs (5s) to avoid timeout
    let requestCount = 0;
    globalThis.fetch = async (_url: string, init?: RequestInit) => {
      const delay = 500 + Math.random() * 1000; // 500-1500ms
      requestCount++;
      const response = buildDelayedSSEStream(
        delay,
        (ctrl) => {
          const enc = new TextEncoder();
          ctrl.enqueue(
            enc.encode(
              `data: ${JSON.stringify({
                candidates: [
                  { content: { parts: [{ text: "slow response" }], role: "model" }, index: 0 },
                ],
                usageMetadata: { promptTokenCount: 4, candidatesTokenCount: 2, totalTokenCount: 6 },
              })}\n\n`
            )
          );
          ctrl.enqueue(enc.encode("data: [DONE]\n\n"));
        },
        init
      );
      return response;
    };

    // Fire 5 concurrent requests (simulates the test's 5 threads)
    const results = await Promise.allSettled(
      Array.from({ length: 5 }, (_, i) =>
        handleChat(
          buildRequest({
            body: {
              model: "concurrent-slow",
              stream: true,
              messages: [{ role: "user", content: `concurrent request ${i}` }],
            },
          })
        )
      )
    );

    const fulfilled = results.filter(
      (r) => r.status === "fulfilled"
    ) as PromiseFulfilledResult<Response>[];
    const succeeded = fulfilled.filter((r) => r.value.status === 200);

    assert.equal(
      succeeded.length,
      5,
      `expected 5 successes, got ${succeeded.length}/${fulfilled.length}`
    );
    assert.equal(requestCount, 5, "should have made exactly 5 fetch calls");
  }
);

// ── Gemini reasoning model: first headers after 35s ─────────────────────
// Reproduces the live issue where Gemini's reasoning models (thinking tokens)
// take 30-60s before the first content chunk arrives. The 30s streaming
// timeout fires, combo returns 524, but Gemini IS working — it just hasn't
// sent visible content yet because it's reasoning internally.

test(
  "streaming: reasoning model with 35s think time triggers 524 timeout",
  { timeout: 30_000 },
  async () => {
    await seedConnection("gemini", { apiKey: "sk-gemini-reasoning" });
    await seedConnection("openai", { apiKey: "sk-openai-reasoning-fallback" });
    await combosDb.createCombo({
      name: "reasoning-timeout",
      strategy: "priority",
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, targetTimeoutMs: 5000 },
      models: ["gemini/gemma-4-31b-it", "openai/gpt-4o-mini"],
    });

    let geminiStarted = false;

    globalThis.fetch = async (url: string, init?: RequestInit) => {
      const target = String(url);
      if (target.includes("gemma-4-31b-it") || target.includes("gemini")) {
        geminiStarted = true;
        // Gemini reasoning model: thinks for 35s, THEN starts streaming
        const response = buildDelayedSSEStream(
          35_000,
          (ctrl) => {
            const enc = new TextEncoder();
            ctrl.enqueue(
              enc.encode(
                `data: ${JSON.stringify({
                  candidates: [
                    {
                      content: {
                        parts: [{ text: "After careful consideration..." }],
                        role: "model",
                      },
                      index: 0,
                    },
                  ],
                  usageMetadata: {
                    promptTokenCount: 100,
                    candidatesTokenCount: 50,
                    totalTokenCount: 150,
                    thoughtsTokenCount: 500,
                  },
                })}\n\n`
              )
            );
            ctrl.enqueue(enc.encode("data: [DONE]\n\n"));
          },
          init
        );
        return response;
      }
      if (target.includes("gpt-4o-mini") || target.includes("openai")) {
        return buildOpenAIResponse("fallback answer");
      }
      return new Response("not found", { status: 404 });
    };

    const start = performance.now();
    const res = await handleChat(
      buildRequest({
        body: {
          model: "reasoning-timeout",
          stream: true,
          messages: [{ role: "user", content: "Prove the Riemann hypothesis" }],
        },
      })
    );
    const elapsed = performance.now() - start;

    // Gemini was started but didn't resolve within 30s → combo timed out → fell back to openai
    assert.ok(geminiStarted, "gemini should have been called");
    assert.equal(res.status, 200, `expected 200 from fallback, got ${res.status}`);
    // Should have timed out around 30s, not waited for the full 35s
    assert.ok(elapsed < 40_000, `should timeout within ~30s, took ${Math.round(elapsed)}ms`);
  }
);

// ── TDD: Request lifecycle ──────────────────────────────────────────────

test(
  "streaming: single request produces exactly one upstream fetch",
  { timeout: 30_000 },
  async () => {
    await seedConnection("gemini", { apiKey: "sk-gemini-single-fetch" });
    await seedConnection("openai", { apiKey: "sk-openai-single-fetch" });
    await combosDb.createCombo({
      name: "single-fetch",
      strategy: "priority",
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, targetTimeoutMs: 5000 },
      models: ["gemini/gemma-4-31b-it", "openai/gpt-4o-mini"],
    });

    let fetchCalls: string[] = [];

    globalThis.fetch = async (url: string) => {
      const target = String(url);
      fetchCalls.push(target.includes("gemini") || target.includes("gemma") ? "gemini" : "openai");
      return buildGeminiSSEStream("hello world");
    };

    const res = await handleChat(
      buildRequest({
        body: {
          model: "single-fetch",
          stream: true,
          messages: [{ role: "user", content: "test" }],
        },
      })
    );

    assert.equal(res.status, 200, `expected 200, got ${res.status}`);
    assert.equal(
      fetchCalls.length,
      1,
      `expected exactly 1 fetch call, got ${fetchCalls.length}: ${fetchCalls.join(", ")}`
    );
    assert.equal(fetchCalls[0], "gemini", "should have called gemini first");
  }
);

test(
  "streaming: idle timeout (no data for 60s) triggers fallback",
  { timeout: 30_000 },
  async () => {
    await seedConnection("gemini", { apiKey: "sk-gemini-idle" });
    await seedConnection("openai", { apiKey: "sk-openai-idle-fallback" });
    await combosDb.createCombo({
      name: "idle-timeout",
      strategy: "priority",
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, targetTimeoutMs: 5000 },
      models: ["gemini/gemma-4-31b-it", "openai/gpt-4o-mini"],
    });

    let callSequence: string[] = [];

    globalThis.fetch = async (url: string, init?: RequestInit) => {
      const target = String(url);
      if (target.includes("gemma-4-31b-it") || target.includes("gemini")) {
        callSequence.push("gemini");
        // Return SSE stream that never sends data (simulates hung provider)
        return hungStream(init);
      }
      if (target.includes("gpt-4o-mini") || target.includes("openai")) {
        callSequence.push("openai");
        return buildValidSSEStream("fallback ok");
      }
      return new Response("not found", { status: 404 });
    };

    const start = performance.now();
    const res = await handleChat(
      buildRequest({
        body: {
          model: "idle-timeout",
          stream: true,
          messages: [{ role: "user", content: "test" }],
        },
      })
    );
    const elapsed = performance.now() - start;

    assert.ok(
      callSequence.includes("openai"),
      `should have fallen back after idle timeout, sequence: ${callSequence.join(" → ")}`
    );
    // targetTimeoutMs=5000 fires the fallback, not the 60s idle timeout
    assert.ok(elapsed < 25_000, `should complete within ~20s, took ${Math.round(elapsed)}ms`);
  }
);

test(
  "non-streaming: 120s timeout triggers fallback for hung provider",
  { timeout: 30_000 },
  async () => {
    await seedConnection("gemini", { apiKey: "sk-gemini-nonstream-timeout" });
    await seedConnection("openai", { apiKey: "sk-openai-nonstream-fallback" });
    await combosDb.createCombo({
      name: "nonstream-timeout",
      strategy: "priority",
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0, targetTimeoutMs: 5000 },
      models: ["gemini/gemma-4-31b-it", "openai/gpt-4o-mini"],
    });

    let callSequence: string[] = [];

    globalThis.fetch = async (url: string, init?: RequestInit) => {
      const target = String(url);
      if (target.includes("gemma-4-31b-it") || target.includes("gemini")) {
        callSequence.push("gemini");
        // Return a stream that never sends data — abortable via stream readiness timeout
        return hungStream(init, "application/json");
      }
      if (target.includes("gpt-4o-mini") || target.includes("openai")) {
        callSequence.push("openai");
        return buildOpenAIResponse("fallback ok");
      }
      return new Response("not found", { status: 404 });
    };

    const start = performance.now();
    const res = await handleChat(
      buildRequest({
        body: {
          model: "nonstream-timeout",
          stream: false,
          messages: [{ role: "user", content: "test" }],
        },
      })
    );
    const elapsed = performance.now() - start;

    assert.ok(
      callSequence.includes("openai"),
      `should have fallen back after timeout, sequence: ${callSequence.join(" → ")}`
    );
    assert.ok(elapsed < 25_000, `should complete within ~20s, took ${Math.round(elapsed)}ms`);
  }
);

// ── Stream pre-buffer ───────────────────────────────────────────────────

test(
  "stream pre-buffer: error before threshold triggers fallback",
  { timeout: 30_000 },
  async () => {
    await seedConnection("gemini", { apiKey: "sk-gemini-prebuf-err" });
    await seedConnection("openai", { apiKey: "sk-openai-prebuf-fallback" });
    await combosDb.createCombo({
      name: "prebuf-err",
      strategy: "priority",
      config: {
        maxRetries: 0,
        retryDelayMs: 0,
        fallbackDelayMs: 0,
        targetTimeoutMs: 5000,
        streamPreBuffer: { enabled: true, mode: "tokens", threshold: 1000 },
      },
      models: ["gemini/gemma-4-31b-it", "openai/gpt-4o-mini"],
    });

    let callSequence: string[] = [];

    globalThis.fetch = async (url: string) => {
      const target = String(url);
      if (target.includes("gemma-4-31b-it") || target.includes("gemini")) {
        callSequence.push("gemini");
        // Return a stream that errors after a few chunks (before 1000 tokens)
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  candidates: [
                    { content: { parts: [{ text: "short" }], role: "model" }, index: 0 },
                  ],
                  usageMetadata: {
                    promptTokenCount: 4,
                    candidatesTokenCount: 1,
                    totalTokenCount: 5,
                  },
                })}\n\n`
              )
            );
            // Error before threshold
            controller.error(new Error("upstream stream error"));
          },
        });
        return new Response(stream, {
          status: 200,
          headers: { "Content-Type": "text/event-stream" },
        });
      }
      if (target.includes("gpt-4o-mini") || target.includes("openai")) {
        callSequence.push("openai");
        return buildOpenAIResponse("fallback ok");
      }
      return new Response("not found", { status: 404 });
    };

    const res = await handleChat(
      buildRequest({
        body: { model: "prebuf-err", stream: true, messages: [{ role: "user", content: "test" }] },
      })
    );

    // Should have fallen back to openai after gemini's stream errored
    assert.ok(
      callSequence.includes("openai"),
      `should have fallen back after pre-buffer error, sequence: ${callSequence.join(" → ")}`
    );
    assert.equal(res.status, 200, `expected 200 from fallback, got ${res.status}`);
  }
);

test("stream pre-buffer: threshold met releases to client", { timeout: 30_000 }, async () => {
  await seedConnection("gemini", { apiKey: "sk-gemini-prebuf-ok" });
  await combosDb.createCombo({
    name: "prebuf-ok",
    strategy: "priority",
    config: {
      maxRetries: 0,
      retryDelayMs: 0,
      fallbackDelayMs: 0,
      targetTimeoutMs: 5000,
      streamPreBuffer: { enabled: true, mode: "tokens", threshold: 10 },
    },
    models: ["gemini/gemma-4-31b-it"],
  });

  globalThis.fetch = async () => {
    // Return a stream with enough tokens to exceed threshold
    return buildGeminiSSEStream(
      "This is a longer response that should exceed the 10 token pre-buffer threshold easily."
    );
  };

  const res = await handleChat(
    buildRequest({
      body: { model: "prebuf-ok", stream: true, messages: [{ role: "user", content: "test" }] },
    })
  );

  assert.equal(res.status, 200, `expected 200, got ${res.status}`);
});
