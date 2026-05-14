import { test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  selfFetchWithRetry,
  ensureLoopbackServerReady,
  __resetLoopbackReadinessForTests,
} from "../../../src/app/api/providers/[id]/sync-models/route.ts";

// ---------------------------------------------------------------------------
// Test 1: retry succeeds on attempt 3
// ---------------------------------------------------------------------------
test("self-fetch retries with backoff and succeeds on attempt 3", async () => {
  let attempts = 0;
  const fetchMock: typeof fetch = async () => {
    attempts++;
    if (attempts < 3) {
      throw new Error("fetch failed");
    }
    return new Response(JSON.stringify({ models: [{ id: "model-1" }] }), { status: 200 });
  };

  let inProcCalls = 0;
  const inProcMock = async () => {
    inProcCalls++;
    return new Response(JSON.stringify({ models: [] }), { status: 200 });
  };

  const result = await selfFetchWithRetry("http://127.0.0.1:20128/api/providers/conn-1/models", {
    fetch: fetchMock,
    maxRetries: 5,
    backoffMs: 5,
    inProcessFallback: inProcMock,
    skipReadinessGate: true,
  });

  assert.equal(attempts, 3, "should have retried twice before succeeding on attempt 3");
  assert.equal(inProcCalls, 0, "should not have called in-process route");
  assert.equal(result.ok, true, "response should be ok");
});

// ---------------------------------------------------------------------------
// Test 2: falls back to in-process after maxRetries failures
// ---------------------------------------------------------------------------
test("self-fetch falls back to in-process route after maxRetries failures", async () => {
  let attempts = 0;
  const fetchMock: typeof fetch = async () => {
    attempts++;
    throw new Error("fetch failed");
  };

  let inProcCalls = 0;
  const inProcMock = async () => {
    inProcCalls++;
    return new Response(JSON.stringify({ models: [{ id: "in-proc-model" }] }), { status: 200 });
  };

  const result = await selfFetchWithRetry("http://127.0.0.1:20128/api/providers/conn-2/models", {
    fetch: fetchMock,
    maxRetries: 3,
    backoffMs: 5,
    connectionId: "conn-2",
    inProcessFallback: inProcMock,
    skipReadinessGate: true,
  });

  assert.equal(attempts, 3, "should retry exactly maxRetries times");
  assert.equal(inProcCalls, 1, "should fall back to in-process exactly once");
  const body = await result.json();
  assert.equal(body.models[0].id, "in-proc-model");
});

// ---------------------------------------------------------------------------
// Test 3: HTTP error responses are returned as-is (no retry on HTTP errors)
//
// Retry contract: only network-level failures (ECONNREFUSED, "fetch failed")
// are retried. HTTP responses (even 4xx/5xx) mean the server IS up and
// returned an error that should be propagated as-is to the caller.
// ---------------------------------------------------------------------------
test("self-fetch returns HTTP error responses immediately without retrying", async () => {
  // 5xx HTTP response: server is up but returned error
  {
    let attempts = 0;
    const fetchMock: typeof fetch = async () => {
      attempts++;
      return new Response("server error", { status: 503 });
    };
    const inProcMock = async () => new Response(JSON.stringify({ models: [] }), { status: 200 });

    const res = await selfFetchWithRetry("http://127.0.0.1:20128/api/providers/conn-3/models", {
      fetch: fetchMock,
      maxRetries: 5,
      backoffMs: 5,
      inProcessFallback: inProcMock,
      skipReadinessGate: true,
    });

    assert.equal(attempts, 1, "5xx HTTP response should NOT retry (got " + attempts + ")");
    assert.equal(res.status, 503, "should propagate the 503 response as-is");
  }

  // 4xx HTTP response: also returned immediately without retry
  {
    let attempts = 0;
    const fetchMock: typeof fetch = async () => {
      attempts++;
      return new Response("not found", { status: 404 });
    };
    const inProcMock = async () => new Response(JSON.stringify({ models: [] }), { status: 200 });

    const res = await selfFetchWithRetry("http://127.0.0.1:20128/api/providers/conn-4/models", {
      fetch: fetchMock,
      maxRetries: 5,
      backoffMs: 5,
      inProcessFallback: inProcMock,
      skipReadinessGate: true,
    });

    assert.equal(attempts, 1, "4xx HTTP response should NOT retry (got " + attempts + ")");
    assert.equal(res.status, 404, "should propagate the 404 response as-is");
  }
});

// ---------------------------------------------------------------------------
// Readiness gate tests
// ---------------------------------------------------------------------------

test("ensureLoopbackServerReady: 17 concurrent callers trigger exactly ONE probe sequence", async () => {
  __resetLoopbackReadinessForTests();
  let probeCalls = 0;
  let serverIsUp = false;
  // Server becomes ready after 30ms
  setTimeout(() => {
    serverIsUp = true;
  }, 30);
  const mockFetch = async (_url) => {
    probeCalls++;
    if (!serverIsUp) throw new Error("fetch failed");
    return new Response("", { status: 200 });
  };

  await Promise.all(
    Array.from({ length: 17 }, () =>
      ensureLoopbackServerReady({ fetch: mockFetch, pollMs: 5, maxWaitMs: 1000 })
    )
  );

  // Probe may have polled multiple times before server came up -- that is fine.
  // What matters: 17 concurrent callers share ONE probe sequence.
  // Expected: roughly (30ms / 5ms) = ~6 attempts, not 17 x 6 = 102.
  assert.ok(probeCalls <= 15, "single shared probe expected <=15 attempts, got " + probeCalls);
});

test("ensureLoopbackServerReady: rejects after maxWaitMs with consistent network errors", async () => {
  __resetLoopbackReadinessForTests();
  const mockFetch = async (_url) => {
    throw new Error("ECONNREFUSED");
  };
  await assert.rejects(
    () =>
      ensureLoopbackServerReady({
        fetch: mockFetch,
        maxWaitMs: 50,
        pollMs: 10,
      }),
    /loopback server not ready/
  );
});

test("ensureLoopbackServerReady: resolves on 4xx (any HTTP status confirms server is up)", async () => {
  __resetLoopbackReadinessForTests();
  let calls = 0;
  const mockFetch = async (_url) => {
    calls++;
    return new Response("not found", { status: 404 });
  };
  // Should not throw: 404 means the server is dispatching
  await ensureLoopbackServerReady({ fetch: mockFetch, maxWaitMs: 500, pollMs: 10 });
  assert.equal(calls, 1, "resolved after exactly 1 probe (server immediately responded 404)");
});

test("selfFetchWithRetry with gate: 17 concurrent callers produce one probe + one fetch each", async () => {
  __resetLoopbackReadinessForTests();
  let probeCalls = 0;
  let modelFetchCalls = 0;
  let serverIsUp = false;
  setTimeout(() => {
    serverIsUp = true;
  }, 30);

  const mockFetch = async (url) => {
    const isReadinessProbe = url.includes("__readiness_probe__");
    if (isReadinessProbe) {
      probeCalls++;
      if (!serverIsUp) throw new Error("fetch failed");
      return new Response("", { status: 404 });
    }
    modelFetchCalls++;
    if (!serverIsUp) throw new Error("fetch failed");
    return new Response(JSON.stringify({ models: [{ id: "model-x" }] }), { status: 200 });
  };

  await Promise.all(
    Array.from({ length: 17 }, (_, i) =>
      selfFetchWithRetry("http://127.0.0.1:20128/api/providers/conn-" + i + "/models", {
        fetch: mockFetch,
        maxRetries: 3,
        backoffMs: 5,
      })
    )
  );

  // After readiness gate succeeds, each connection makes EXACTLY one model fetch
  assert.equal(modelFetchCalls, 17, "each connection fetches its own models exactly once");
  // Probe may have polled several times but NOT 17 x poll-count
  assert.ok(probeCalls <= 15, "probe should be shared, got " + probeCalls + " attempts");
});

// Sanity check: disabling the gate shows amplification (verifies the gate is doing work)
test("sanity: without readiness gate, 17 callers retry independently (amplification confirmed)", async () => {
  __resetLoopbackReadinessForTests();
  let modelFetchCalls = 0;
  let serverIsUp = false;
  setTimeout(() => {
    serverIsUp = true;
  }, 30);

  const mockFetch = async (_url) => {
    modelFetchCalls++;
    if (!serverIsUp) throw new Error("fetch failed");
    return new Response(JSON.stringify({ models: [{ id: "model-x" }] }), { status: 200 });
  };

  await Promise.all(
    Array.from({ length: 17 }, (_, i) =>
      selfFetchWithRetry("http://127.0.0.1:20128/api/providers/conn-" + i + "/models", {
        fetch: mockFetch,
        maxRetries: 5,
        backoffMs: 5,
        skipReadinessGate: true,
      })
    )
  );

  // Without gate: each of the 17 callers retries independently during boot race.
  // Expect well above 17 total fetch attempts.
  assert.ok(
    modelFetchCalls > 17,
    "without gate, callers retry independently, got " + modelFetchCalls + " (expected >17)"
  );
});
