import { test, after } from "node:test";
import assert from "node:assert/strict";
import { BaseExecutor } from "../../open-sse/executors/base.ts";

// A minimal executor that passes through the body unchanged (no transformRequest
// side-effects) so we can assert on exactly what base.ts sends upstream.
class SimpleExecutor extends BaseExecutor {
  constructor() {
    super("test-provider", {
      baseUrls: ["https://primary.example/v1/chat/completions"],
    });
  }

  async transformRequest(_model: string, body: Record<string, unknown>) {
    // Return a shallow copy to avoid mutating the caller's body.
    return { ...body };
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// Task 2.2: generic reactive 400 field-downgrade wired into base.ts
// ──────────────────────────────────────────────────────────────────────────────

test("BaseExecutor.execute strips a known-offending field and retries once on 400", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  const capturedBodies: Record<string, unknown>[] = [];

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    const body = JSON.parse(String(init.body));
    capturedBodies.push(body);

    if (capturedBodies.length === 1) {
      // First call: upstream rejects reasoning_budget with a 400.
      return new Response(
        JSON.stringify({ error: "Invalid argument: reasoning_budget not supported" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Second call (retry without the field): success.
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await executor.execute({
      model: "test-model",
      body: {
        messages: [{ role: "user", content: "hi" }],
        reasoning_budget: 5000,
      },
      stream: false,
      credentials: {},
    });

    // fetch must have been called exactly twice (original + 1 retry).
    assert.equal(capturedBodies.length, 2, "fetch should be called exactly twice");

    // First request contained the offending field.
    assert.equal(capturedBodies[0].reasoning_budget, 5000);

    // Second request must NOT contain the offending field.
    assert.equal(
      "reasoning_budget" in capturedBodies[1],
      false,
      "reasoning_budget should be absent from the retry body"
    );

    // The final response is the 200 from the retry.
    assert.equal(result.response.status, 200);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("BaseExecutor.execute does NOT retry when the 400 body does not name a known field", async () => {
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  let callCount = 0;

  globalThis.fetch = async () => {
    callCount++;
    return new Response(JSON.stringify({ error: "some random upstream error" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const result = await executor.execute({
      model: "test-model",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {},
    });

    // Only one fetch call — no spurious retry.
    assert.equal(callCount, 1, "fetch should not retry for unknown 400 error bodies");
    assert.equal(result.response.status, 400);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("BaseExecutor.execute strips at most once per field per execute() call (strippedFields guard)", async () => {
  // Simulate: first fetch → 400 with reasoning_budget in body → strip+retry.
  // The retry also returns 400 naming the same field (e.g. server echoes it differently).
  // The guard must NOT strip+retry a second time for the same field.
  const executor = new SimpleExecutor();
  const originalFetch = globalThis.fetch;
  const capturedBodies: Record<string, unknown>[] = [];

  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    const body = JSON.parse(String(init.body));
    capturedBodies.push(body);

    // Both calls return 400 naming the same field — but only the first should
    // trigger a strip (strippedFields.has(offending) will be true on the 2nd).
    return new Response(
      JSON.stringify({ error: "reasoning_budget not supported" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  };

  try {
    const result = await executor.execute({
      model: "test-model",
      body: { messages: [{ role: "user", content: "hi" }], reasoning_budget: 1000 },
      stream: false,
      credentials: {},
    });

    // Exactly 2 fetches: original (with field) + 1 retry (without field).
    // No third fetch because strippedFields guards against re-stripping the same field.
    assert.equal(capturedBodies.length, 2, "should be exactly 2 fetches (original + 1 strip retry)");

    // First had the field; second did not.
    assert.equal(capturedBodies[0].reasoning_budget, 1000);
    assert.equal("reasoning_budget" in capturedBodies[1], false);

    // The final response is the second (still-400) one — no infinite loop.
    assert.equal(result.response.status, 400);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
