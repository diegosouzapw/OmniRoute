import test from "node:test";
import assert from "node:assert/strict";

// #FIX: regression guard for the WAF retry config. The BaseExecutor must
// expose a WAF_RETRY_CONFIG with sane defaults and a backoff multiplier
// so the executor can retry 400 content-blocked before falling through to
// the 429/401/fallback chain.

test("WAF_RETRY_CONFIG has expected shape", async () => {
  const { BaseExecutor } = await import("../../open-sse/executors/base.ts");
  const cfg = BaseExecutor.WAF_RETRY_CONFIG;
  assert.equal(typeof cfg.maxAttempts, "number");
  assert.equal(typeof cfg.delayMs, "number");
  assert.equal(typeof cfg.backoffMultiplier, "number");
  assert.ok(cfg.maxAttempts >= 1, "maxAttempts must allow at least 1 retry");
  assert.ok(cfg.maxAttempts <= 5, "maxAttempts must be bounded to avoid runaway loops");
  assert.ok(cfg.delayMs >= 500, "initial delay must be long enough to clear the WAF");
  assert.ok(cfg.backoffMultiplier >= 1);

  // Derived: the second attempt should wait at least as long as the first
  const secondAttemptWait = cfg.delayMs * cfg.backoffMultiplier;
  assert.ok(
    secondAttemptWait > cfg.delayMs || cfg.backoffMultiplier === 1,
    "backoffMultiplier should produce a longer wait on the second attempt"
  );
});

test("WAF_RETRY_CONFIG differs from generic RETRY_CONFIG (different problem)", async () => {
  const { BaseExecutor } = await import("../../open-sse/executors/base.ts");
  const generic = BaseExecutor.RETRY_CONFIG;
  const waf = BaseExecutor.WAF_RETRY_CONFIG;
  assert.ok(waf !== generic, "WAF retry config should be distinct from generic retry config");
  // The WAF needs a different starting delay (longer) than the generic 429 path
  // because the WAF's per-IP suspicion bucket relaxes more slowly.
  assert.ok(waf.delayMs >= 500, "WAF initial delay should be >= 500ms");
});
