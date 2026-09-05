import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #10460 pattern: DATA_DIR must be assigned BEFORE any transitive DB import.
// accountFallback.ts statically imports `@/lib/db/providers` -> `src/lib/db/core.ts`,
// whose DATA_DIR is captured once at module-load time.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-errortext-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "quota-errortext-test-secret";

const { shouldMarkAccountExhaustedFrom429 } =
  await import("../../open-sse/services/accountFallback.ts");

/**
 * `shouldPreserveQuotaSignals(provider, errorText)` (open-sse/services/quotaResetParsing.ts)
 * gained its second parameter with the #6638 fix, but only ONE of its two call sites was
 * updated: `checkFallbackError` passes `errorText`, while
 * `shouldMarkAccountExhaustedFrom429` still called it with the provider alone. With
 * `errorText` undefined the helper's `Boolean(errorText) && looksLikeQuotaExhausted(...)`
 * branch can never be true, so for every apikey-category provider the quota cache was
 * never marked exhausted — even when the upstream body explicitly said a long-window cap
 * was hit. These cases pin both directions of the now-threaded argument.
 */

// An explicit long-window quota body — the exact shape #6638 was reported with.
const QUOTA_EXHAUSTED_BODY = JSON.stringify({
  error: "You have exceeded your weekly usage quota. Your quota will reset in 3 days.",
});

test("shouldMarkAccountExhaustedFrom429 seeds the quota cache for an apikey 429 whose body says the quota is exhausted", () => {
  // `openai` is apikey-category and has no per-model quota, so the result is decided
  // purely by whether the body-text quota signal reaches shouldPreserveQuotaSignals.
  assert.equal(
    shouldMarkAccountExhaustedFrom429(
      "openai",
      "gpt-4o-mini",
      undefined,
      undefined,
      QUOTA_EXHAUSTED_BODY
    ),
    true
  );
  assert.equal(
    shouldMarkAccountExhaustedFrom429(
      "anthropic",
      "claude-sonnet-4-6",
      undefined,
      undefined,
      QUOTA_EXHAUSTED_BODY
    ),
    true
  );
});

test("shouldMarkAccountExhaustedFrom429 still ignores a plain apikey rate limit", () => {
  // Neither body matches QUOTA_PATTERNS, so a plain 429 must keep falling through to the
  // short generic cooldown instead of poisoning the connection's quota cache.
  assert.equal(
    shouldMarkAccountExhaustedFrom429(
      "openai",
      "gpt-4o-mini",
      undefined,
      undefined,
      "Rate limit exceeded, retry in 20s"
    ),
    false
  );
  assert.equal(
    shouldMarkAccountExhaustedFrom429(
      "openai",
      "gpt-4o-mini",
      undefined,
      undefined,
      "Too Many Requests"
    ),
    false
  );
});

test("shouldMarkAccountExhaustedFrom429 keeps its pre-existing behavior when no errorText is supplied", () => {
  // The new parameter is optional and additive: OAuth-category providers still preserve
  // quota signals unconditionally, and apikey-category ones still default to "not
  // exhausted" without an explicit body signal.
  assert.equal(shouldMarkAccountExhaustedFrom429("claude", "claude-sonnet-4-6"), true);
  assert.equal(shouldMarkAccountExhaustedFrom429("openai", "gpt-4o-mini"), false);
});

test("shouldMarkAccountExhaustedFrom429 lets a transient failureKind win over a quota body", () => {
  // The failureKind short-circuit runs before the body-text check and must stay that way:
  // a 429 the classifier already called transient never poisons the quota cache.
  assert.equal(
    shouldMarkAccountExhaustedFrom429(
      "openai",
      "gpt-4o-mini",
      undefined,
      "rate_limit",
      QUOTA_EXHAUSTED_BODY
    ),
    false
  );
  assert.equal(
    shouldMarkAccountExhaustedFrom429(
      "openai",
      "gpt-4o-mini",
      undefined,
      "transient",
      QUOTA_EXHAUSTED_BODY
    ),
    false
  );
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});
