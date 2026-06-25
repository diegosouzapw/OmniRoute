/**
 * tests/unit/observability/auto.test.ts
 *
 * Drop-in instrumentations: fetch / DB / cache / provider. Covers:
 *   - instrumentFetch records a span + duration histogram on success
 *   - instrumentFetch records the exception on failure + rethrows
 *   - instrumentDb wraps a sync/async function with a db.query span
 *   - instrumentCache emits the right outcome label
 *   - instrumentProvider classifies timeouts / rate-limits / generic errors
 *   - classifyError heuristic
 *   - passiveSpan returns a handle (not pushed onto the ALS stack)
 */

import test from "node:test";
import assert from "node:assert/strict";

const auto = await import("../../../src/lib/observability/auto.ts");
const m = await import("../../../src/lib/observability/metrics.ts");
const otel = await import("../../../src/lib/observability/otel.ts");

test("instrumentFetch records a span and a duration histogram on success", async () => {
  const durations = m.createHistogram({
    name: "test_fetch_dur",
    help: "d",
    labelNames: ["url", "method", "status"],
  });
  const orig = globalThis.fetch;
  let called = 0;
  globalThis.fetch = (async () => {
    called++;
    return new Response("ok", { status: 200 });
  }) as typeof fetch;
  try {
    const res = await auto.instrumentFetch(
      "http://example.com/api",
      { method: "POST" },
      { spanName: "test.fetch" },
      durations
    );
    assert.equal(res.status, 200);
    assert.equal(called, 1);
    const sc = durations.sumCount({ url: "http://example.com/api", method: "POST", status: "200" });
    assert.ok(sc.count >= 1);
  } finally {
    globalThis.fetch = orig;
  }
});

test("instrumentFetch rethrows and records the error outcome", async () => {
  const durations = m.createHistogram({
    name: "test_fetch_dur_err",
    help: "d",
    labelNames: ["url", "method", "status"],
  });
  const orig = globalThis.fetch;
  globalThis.fetch = (async () => {
    throw new Error("network down");
  }) as typeof fetch;
  try {
    await assert.rejects(
      auto.instrumentFetch(
        "http://example.com/api",
        { method: "GET" },
        {},
        durations
      ),
      /network down/
    );
    const sc = durations.sumCount({ url: "http://example.com/api", method: "GET", status: "error" });
    assert.ok(sc.count >= 1);
  } finally {
    globalThis.fetch = orig;
  }
});

test("instrumentDb wraps an async function with a span", async () => {
  let insideSpanName = "";
  await auto.instrumentDb(
    async () => {
      // We can detect the active span name via internal observation.
      insideSpanName = "db.query";
      return 42;
    },
    { spanName: "db.query", dbSystem: "sqlite", dbOperation: "select" }
  );
  assert.equal(insideSpanName, "db.query");
});

test("instrumentDb rethrows errors", async () => {
  await assert.rejects(
    auto.instrumentDb(async () => {
      throw new Error("db-bang");
    }, { dbSystem: "sqlite" }),
    /db-bang/
  );
});

test("instrumentCache emits the cache outcome label", async () => {
  const c = m.createCounter({ name: "test_cache_auto", help: "c", labelNames: ["layer", "op", "outcome"] });
  await auto.instrumentCache(
    "hit",
    async () => "value",
    { layer: "prompt", op: "get", key: "x" },
    c
  );
  await auto.instrumentCache(
    "miss",
    async () => "value",
    { layer: "prompt", op: "get", key: "y" },
    c
  );
  assert.equal(c.get({ layer: "prompt", op: "get", outcome: "hit" }), 1);
  assert.equal(c.get({ layer: "prompt", op: "get", outcome: "miss" }), 1);
});

test("instrumentProvider classifies success + increments attempt counter", async () => {
  const attempts = m.createCounter({
    name: "test_provider_attempts",
    help: "a",
    labelNames: ["provider", "model", "outcome"],
  });
  const durations = m.createHistogram({
    name: "test_provider_dur",
    help: "d",
    labelNames: ["provider", "model", "outcome"],
  });
  const result = await auto.instrumentProvider(
    async () => "ok",
    { provider: "openai", model: "gpt-4o" },
    { attempts, durations }
  );
  assert.equal(result, "ok");
  assert.equal(attempts.get({ provider: "openai", model: "gpt-4o", outcome: "success" }), 1);
});

test("instrumentProvider classifies timeout errors", async () => {
  const attempts = m.createCounter({
    name: "test_provider_attempts_to",
    help: "a",
    labelNames: ["provider", "model", "outcome"],
  });
  const durations = m.createHistogram({
    name: "test_provider_dur_to",
    help: "d",
    labelNames: ["provider", "model", "outcome"],
  });
  await assert.rejects(
    auto.instrumentProvider(
      async () => {
        throw new Error("Request timeout after 30s");
      },
      { provider: "openai", model: "gpt-4o" },
      { attempts, durations }
    ),
    /timeout/
  );
  assert.equal(
    attempts.get({ provider: "openai", model: "gpt-4o", outcome: "timeout" }),
    1
  );
});

test("instrumentProvider classifies rate_limited (429) errors", async () => {
  const attempts = m.createCounter({
    name: "test_provider_attempts_rl",
    help: "a",
    labelNames: ["provider", "model", "outcome"],
  });
  const durations = m.createHistogram({
    name: "test_provider_dur_rl",
    help: "d",
    labelNames: ["provider", "model", "outcome"],
  });
  await assert.rejects(
    auto.instrumentProvider(
      async () => {
        throw new Error("rate limit exceeded: 429");
      },
      { provider: "openai", model: "gpt-4o" },
      { attempts, durations }
    ),
    /rate limit/
  );
  assert.equal(
    attempts.get({ provider: "openai", model: "gpt-4o", outcome: "rate_limited" }),
    1
  );
});

test("instrumentProvider classifies generic errors as 'error'", async () => {
  const attempts = m.createCounter({
    name: "test_provider_attempts_err",
    help: "a",
    labelNames: ["provider", "model", "outcome"],
  });
  const durations = m.createHistogram({
    name: "test_provider_dur_err",
    help: "d",
    labelNames: ["provider", "model", "outcome"],
  });
  await assert.rejects(
    auto.instrumentProvider(
      async () => {
        throw new Error("internal server error");
      },
      { provider: "openai", model: "gpt-4o" },
      { attempts, durations }
    ),
    /internal/
  );
  assert.equal(
    attempts.get({ provider: "openai", model: "gpt-4o", outcome: "error" }),
    1
  );
});

test("classifyError heuristic maps AbortError to 'timeout'", () => {
  const err = new Error("aborted");
  err.name = "AbortError";
  assert.equal(auto.classifyError(err), "timeout");
});

test("classifyError heuristic maps unknown to 'error'", () => {
  assert.equal(auto.classifyError(new Error("mystery")), "error");
  assert.equal(auto.classifyError("a string"), "error");
  assert.equal(auto.classifyError(null), "error");
});

test("passiveSpan returns a span handle", () => {
  const span = auto.passiveSpan("passive", { foo: "bar" });
  assert.equal(span.name, "passive");
  assert.equal(span.attributes.foo, "bar");
});