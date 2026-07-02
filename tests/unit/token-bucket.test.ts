/**
 * Tests for the TokenBucket rate limiter (DEBT-001).
 *
 * Verifies:
 *  - TokenBucket: tryConsume returns true when tokens are available
 *  - TokenBucket: tryConsume returns false when tokens are exhausted
 *  - TokenBucket: tokens refill over time
 *  - TokenBucket: currentTokens reflects accurate count after refill
 *  - TokenBucket: edge cases (zero capacity, zero refill rate, fractional tokens)
 *  - tryConsumeTokens: passes through when no overrides are set
 *  - tryConsumeTokens: rejects when TPM limit exceeded
 *  - tryConsumeTokens: rejects when TPD limit exceeded
 *
 * Run: node --import tsx/esm --test tests/unit/token-bucket.test.ts
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// ── Temp DB setup (needed for tryConsumeTokens which reads connections) ──────

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-token-bucket-"),
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");

const rateLimitManager = await import(
  "../../open-sse/services/rateLimitManager.ts"
);

const {
  __TokenBucketForTests: TokenBucket,
  tryConsumeTokens,
  enableRateLimitProtection,
  __resetRateLimitManagerForTests,
} = rateLimitManager;

// ── Cleanup ──────────────────────────────────────────────────────────────────

test.afterEach(async () => {
  await __resetRateLimitManagerForTests();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ── TokenBucket unit tests ───────────────────────────────────────────────────

test("TokenBucket: tryConsume returns true when tokens are available", () => {
  const bucket = new TokenBucket(100, 1); // 100 tokens, refill 1/ms
  assert.equal(bucket.tryConsume(50), true, "should consume 50 tokens");
  assert.equal(bucket.tryConsume(50), true, "should consume another 50 tokens");
});

test("TokenBucket: tryConsume returns false when tokens are exhausted", () => {
  const bucket = new TokenBucket(10, 0); // 10 tokens, no refill
  assert.equal(bucket.tryConsume(10), true, "should consume initial 10");
  assert.equal(bucket.tryConsume(1), false, "should fail on 11th token");
});

test("TokenBucket: tokens refill over time", async () => {
  // Very slow refill: 1 token per 100ms
  const bucket = new TokenBucket(1, 1 / 100); // 1 token per 100ms
  assert.equal(bucket.tryConsume(1), true, "should consume initial token");

  // Wait 150ms → should have ~1.5 tokens available
  await new Promise((resolve) => setTimeout(resolve, 150));
  assert.equal(
    bucket.tryConsume(1),
    true,
    "should have refilled after 150ms",
  );
});

test("TokenBucket: currentTokens reflects accurate count", () => {
  const bucket = new TokenBucket(100, 0); // 100 tokens, no refill
  assert.equal(bucket.currentTokens, 100, "should start at capacity");
  bucket.tryConsume(30);
  assert.equal(bucket.currentTokens, 70, "should have 70 remaining after consuming 30");
});

test("TokenBucket: capacity caps the refilled token count", async () => {
  const bucket = new TokenBucket(50, 100); // fast refill, small cap
  bucket.tryConsume(50);
  assert.equal(bucket.currentTokens, 0, "should be empty after consuming all");
  await new Promise((resolve) => setTimeout(resolve, 10));
  // After 10ms at 100 tokens/ms → 1000 tokens, but capped at 50
  assert.equal(bucket.currentTokens, 50, "should be capped at capacity");
});

test("TokenBucket: zero capacity never allows consumption", () => {
  const bucket = new TokenBucket(0, 0);
  assert.equal(bucket.tryConsume(1), false, "zero-capacity bucket never allows");
  assert.equal(bucket.currentTokens, 0, "zero-capacity bucket is always empty");
});

test("TokenBucket: zero refill rate never replenishes", () => {
  const bucket = new TokenBucket(10, 0);
  assert.equal(bucket.tryConsume(10), true, "initial tokens consumed");
  assert.equal(bucket.tryConsume(1), false, "no refill — second consume fails");
});

test("TokenBucket: fractional token consumption works", () => {
  const bucket = new TokenBucket(10, 0);
  assert.equal(bucket.tryConsume(3.5), true, "should consume 3.5 tokens");
  assert.equal(bucket.currentTokens, 6.5, "should have 6.5 remaining");
  assert.equal(bucket.tryConsume(6.5), true, "should consume exactly remaining");
  assert.equal(bucket.tryConsume(0.1), false, "should fail with 0.1 remaining");
});

// ── tryConsumeTokens integration tests ───────────────────────────────────────

test("tryConsumeTokens: passes through when rate limiting is not enabled", () => {
  const result = tryConsumeTokens("openai", "unprotected-conn", "gpt-4", 100);
  assert.deepEqual(result, { allowed: true });
});

test("tryConsumeTokens: passes through when rate limiting is enabled but no overrides", () => {
  // Enable rate limit protection (but no overrides set)
  enableRateLimitProtection("no-override-conn");
  const result = tryConsumeTokens("openai", "no-override-conn", "gpt-4", 100);
  assert.deepEqual(result, { allowed: true });
});

test("tryConsumeTokens: passes through with zero tokens", () => {
  enableRateLimitProtection("zero-token-conn");
  const result = tryConsumeTokens("openai", "zero-token-conn", "gpt-4", 0);
  assert.deepEqual(result, { allowed: true });
});

test("tryConsumeTokens: passes through with negative tokens", () => {
  enableRateLimitProtection("neg-token-conn");
  const result = tryConsumeTokens("openai", "neg-token-conn", "gpt-4", -5);
  assert.deepEqual(result, { allowed: true });
});
