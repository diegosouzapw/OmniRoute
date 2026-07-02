/**
 * tests/unit/quota-saturation-token-headers.test.ts
 *
 * #2 — Proactive saturation from TOKEN rate-limit headers (universal).
 *
 * storeRateLimitHeaders previously only captured the per-minute REQUEST headers
 * (anthropic-ratelimit-requests-* / x-ratelimit-*-requests). TOKEN headers ride
 * on EVERY upstream response (success too), so they let us throttle proactively
 * before a 429.
 *
 * This suite asserts:
 *   - storeRateLimitHeaders parses Anthropic token headers
 *     (anthropic-ratelimit-tokens-{limit,remaining,reset}, reset = RFC3339)
 *     and OpenAI token headers (x-ratelimit-{limit,remaining,reset}-tokens,
 *     reset = duration string like "6m0s"/"1s").
 *   - the resulting token-header saturation = 1 − remaining/limit (clamped 0..1).
 *   - reset is normalized to an epoch-ms `resetAt` (RFC3339 → epoch,
 *     duration → now + parsed seconds).
 *   - the existing REQUEST path is untouched (no regression).
 *   - getSaturation for a generic provider (openai) surfaces the token-header
 *     signal when usage returns nothing (fallback/complement), failing open to 0.
 *
 * Pure parse + cache; no DB, no network. The 30s saturation cache and the
 * token-header cache are cleared between asserts.
 */

import test from "node:test";
import assert from "node:assert/strict";

const satMod = await import("../../src/lib/quota/saturationSignals.ts");
const {
  storeRateLimitHeaders,
  getTokenHeaderSaturation,
  getSaturation,
  _clearSaturationCache,
  _clearRateLimitHeaders,
  __setGenericUsageFetcherForTests,
} = satMod;

test.afterEach(() => {
  _clearSaturationCache();
  _clearRateLimitHeaders();
  __setGenericUsageFetcherForTests(null);
});

// ─── Anthropic token headers (reset = RFC3339) ───────────────────────────────

test("Anthropic token headers → saturation = 1 − remaining/limit", () => {
  _clearRateLimitHeaders();
  // 1000 limit, 250 remaining → 750 used → 0.75 saturation.
  storeRateLimitHeaders("anth-conn-1", "anthropic", {
    "anthropic-ratelimit-tokens-limit": "1000",
    "anthropic-ratelimit-tokens-remaining": "250",
    "anthropic-ratelimit-tokens-reset": "2026-01-01T00:00:30Z",
  });

  const sig = getTokenHeaderSaturation("anthropic", "anth-conn-1");
  assert.ok(sig, "expected a token-header saturation signal");
  assert.ok(Math.abs(sig!.saturation - 0.75) < 1e-9, `expected ≈0.75, got ${sig!.saturation}`);
});

test("Anthropic token reset (RFC3339) is normalized to epoch ms", () => {
  _clearRateLimitHeaders();
  storeRateLimitHeaders("anth-conn-2", "anthropic", {
    "anthropic-ratelimit-tokens-limit": "1000",
    "anthropic-ratelimit-tokens-remaining": "0",
    "anthropic-ratelimit-tokens-reset": "2026-01-01T00:00:30Z",
  });

  const sig = getTokenHeaderSaturation("anthropic", "anth-conn-2");
  assert.ok(sig, "expected signal");
  const expected = Date.parse("2026-01-01T00:00:30Z");
  assert.equal(sig!.resetAt, expected, `resetAt should be RFC3339 epoch ${expected}, got ${sig!.resetAt}`);
  // fully exhausted → saturation 1.
  assert.equal(sig!.saturation, 1);
});

test("Anthropic input/output token variants are captured when base tokens header absent", () => {
  _clearRateLimitHeaders();
  // No base anthropic-ratelimit-tokens-*; only the input variant present.
  storeRateLimitHeaders("anth-conn-3", "anthropic", {
    "anthropic-ratelimit-input-tokens-limit": "2000",
    "anthropic-ratelimit-input-tokens-remaining": "500",
    "anthropic-ratelimit-input-tokens-reset": "2026-01-01T00:01:00Z",
  });

  const sig = getTokenHeaderSaturation("anthropic", "anth-conn-3");
  assert.ok(sig, "expected signal from input-tokens variant");
  // 2000 limit, 500 remaining → 1500 used → 0.75.
  assert.ok(Math.abs(sig!.saturation - 0.75) < 1e-9, `expected ≈0.75, got ${sig!.saturation}`);
});

// ─── OpenAI token headers (reset = DURATION) ─────────────────────────────────

test("OpenAI token headers → saturation = 1 − remaining/limit", () => {
  _clearRateLimitHeaders();
  // 90000 limit, 9000 remaining → 81000 used → 0.9.
  storeRateLimitHeaders("oai-conn-1", "openai", {
    "x-ratelimit-limit-tokens": "90000",
    "x-ratelimit-remaining-tokens": "9000",
    "x-ratelimit-reset-tokens": "6m0s",
  });

  const sig = getTokenHeaderSaturation("openai", "oai-conn-1");
  assert.ok(sig, "expected token-header signal");
  assert.ok(Math.abs(sig!.saturation - 0.9) < 1e-9, `expected ≈0.9, got ${sig!.saturation}`);
});

test('OpenAI reset duration "6m0s" → now + 360s (epoch ms)', () => {
  _clearRateLimitHeaders();
  const before = Date.now();
  storeRateLimitHeaders("oai-conn-2", "openai", {
    "x-ratelimit-limit-tokens": "1000",
    "x-ratelimit-remaining-tokens": "100",
    "x-ratelimit-reset-tokens": "6m0s",
  });
  const after = Date.now();

  const sig = getTokenHeaderSaturation("openai", "oai-conn-2");
  assert.ok(sig, "expected signal");
  // 6m0s = 360_000 ms in the future, measured from the store time.
  assert.ok(
    sig!.resetAt >= before + 360_000 && sig!.resetAt <= after + 360_000,
    `resetAt should be ≈ now+360000, got ${sig!.resetAt} (window ${before + 360_000}..${after + 360_000})`
  );
});

test('OpenAI reset duration "1s" → now + 1s (epoch ms)', () => {
  _clearRateLimitHeaders();
  const before = Date.now();
  storeRateLimitHeaders("oai-conn-3", "openai", {
    "x-ratelimit-limit-tokens": "1000",
    "x-ratelimit-remaining-tokens": "500",
    "x-ratelimit-reset-tokens": "1s",
  });
  const after = Date.now();

  const sig = getTokenHeaderSaturation("openai", "oai-conn-3");
  assert.ok(sig, "expected signal");
  assert.ok(
    sig!.resetAt >= before + 1000 && sig!.resetAt <= after + 1000,
    `resetAt should be ≈ now+1000, got ${sig!.resetAt}`
  );
});

test('OpenAI compound duration "1h30m15s" → 5415s', () => {
  _clearRateLimitHeaders();
  const before = Date.now();
  storeRateLimitHeaders("oai-conn-4", "openai", {
    "x-ratelimit-limit-tokens": "1000",
    "x-ratelimit-remaining-tokens": "10",
    "x-ratelimit-reset-tokens": "1h30m15s",
  });
  const after = Date.now();

  const sig = getTokenHeaderSaturation("openai", "oai-conn-4");
  assert.ok(sig, "expected signal");
  const secs = (1 * 3600 + 30 * 60 + 15) * 1000; // 5_415_000
  assert.ok(
    sig!.resetAt >= before + secs && sig!.resetAt <= after + secs,
    `resetAt should be ≈ now+${secs}, got ${sig!.resetAt}`
  );
});

test('OpenAI fractional-second duration "1.5s" → 1500ms', () => {
  _clearRateLimitHeaders();
  const before = Date.now();
  storeRateLimitHeaders("oai-conn-5", "openai", {
    "x-ratelimit-limit-tokens": "1000",
    "x-ratelimit-remaining-tokens": "10",
    "x-ratelimit-reset-tokens": "1.5s",
  });
  const after = Date.now();

  const sig = getTokenHeaderSaturation("openai", "oai-conn-5");
  assert.ok(sig, "expected signal");
  assert.ok(
    sig!.resetAt >= before + 1500 && sig!.resetAt <= after + 1500,
    `resetAt should be ≈ now+1500, got ${sig!.resetAt}`
  );
});

// ─── Clamp / guards ──────────────────────────────────────────────────────────

test("saturation is clamped to [0,1] (remaining > limit → 0)", () => {
  _clearRateLimitHeaders();
  storeRateLimitHeaders("oai-conn-clamp", "openai", {
    "x-ratelimit-limit-tokens": "1000",
    "x-ratelimit-remaining-tokens": "5000", // nonsensical but must not go negative
  });

  const sig = getTokenHeaderSaturation("openai", "oai-conn-clamp");
  assert.ok(sig, "expected signal");
  assert.equal(sig!.saturation, 0);
});

test("missing/invalid token headers → no signal (null)", () => {
  _clearRateLimitHeaders();
  storeRateLimitHeaders("oai-conn-none", "openai", {
    "content-type": "application/json",
  });
  assert.equal(getTokenHeaderSaturation("openai", "oai-conn-none"), null);

  // limit=0 must not divide-by-zero / produce a signal.
  storeRateLimitHeaders("oai-conn-zero", "openai", {
    "x-ratelimit-limit-tokens": "0",
    "x-ratelimit-remaining-tokens": "0",
  });
  assert.equal(getTokenHeaderSaturation("openai", "oai-conn-zero"), null);
});

test("reset is optional — signal still produced without a reset header", () => {
  _clearRateLimitHeaders();
  storeRateLimitHeaders("oai-conn-noreset", "openai", {
    "x-ratelimit-limit-tokens": "1000",
    "x-ratelimit-remaining-tokens": "250",
  });
  const sig = getTokenHeaderSaturation("openai", "oai-conn-noreset");
  assert.ok(sig, "expected signal without reset");
  assert.ok(Math.abs(sig!.saturation - 0.75) < 1e-9);
  assert.equal(sig!.resetAt, null);
});

// ─── No regression on the existing REQUEST path ──────────────────────────────

test("REQUEST headers still drive getSaturation (anthropic header fallback unchanged)", async () => {
  _clearSaturationCache();
  _clearRateLimitHeaders();
  // Only request headers (no oauth/usage, no token headers): the legacy fallback
  // must still compute (limit-remaining)/limit = 0.7 for anthropic.
  storeRateLimitHeaders("req-conn", "anthropic", {
    "anthropic-ratelimit-requests-limit": "100",
    "anthropic-ratelimit-requests-remaining": "30",
  });

  // No oauth token on the connection → fetchAnthropicSaturation falls to the header path.
  satMod.__setAnthropicSaturationDepsForTests({
    loadConnection: async () => ({ id: "req-conn", provider: "anthropic", authType: "apikey" }),
    fetchUsage: async () => ({ message: "no plan window" }),
  });

  const val = await getSaturation("req-conn", "anthropic", { unit: "requests", window: "hourly" });
  satMod.__setAnthropicSaturationDepsForTests(null);
  assert.ok(Math.abs(val - 0.7) < 1e-9, `expected request-header fallback ≈0.7, got ${val}`);
});

// ─── Generic provider: token-header signal surfaces via getSaturation ────────

test("getSaturation(openai) surfaces token-header saturation when usage returns nothing", async () => {
  _clearSaturationCache();
  _clearRateLimitHeaders();
  // usage returns nothing usable → 0; token headers should provide the signal.
  __setGenericUsageFetcherForTests(async () => null);
  storeRateLimitHeaders("oai-gen-1", "openai", {
    "x-ratelimit-limit-tokens": "1000",
    "x-ratelimit-remaining-tokens": "100",
    "x-ratelimit-reset-tokens": "30s",
  });

  const val = await getSaturation("oai-gen-1", "openai", { unit: "tokens", window: "hourly" });
  assert.ok(Math.abs(val - 0.9) < 1e-9, `expected token-header ≈0.9, got ${val}`);
});

test("getSaturation(openai) prefers real usage percent over token headers when usage is present", async () => {
  _clearSaturationCache();
  _clearRateLimitHeaders();
  // usage reports 0.5 (50% used) → authoritative; token headers say 0.9 but must not override.
  __setGenericUsageFetcherForTests(async () => ({ percentUsed: 0.5 }));
  storeRateLimitHeaders("oai-gen-2", "openai", {
    "x-ratelimit-limit-tokens": "1000",
    "x-ratelimit-remaining-tokens": "100", // → 0.9 if it leaked through
  });

  const val = await getSaturation("oai-gen-2", "openai", { unit: "tokens", window: "hourly" });
  assert.ok(Math.abs(val - 0.5) < 1e-9, `expected usage ≈0.5 to win, got ${val}`);
});

test("getSaturation(openai) fails open to 0 when neither usage nor token headers exist", async () => {
  _clearSaturationCache();
  _clearRateLimitHeaders();
  __setGenericUsageFetcherForTests(async () => null);

  const val = await getSaturation("oai-gen-3", "openai", { unit: "tokens", window: "hourly" });
  assert.equal(val, 0);
});

// ─── Cross-key / cross-provider isolation ────────────────────────────────────

test("token-header signal is keyed by (provider, connectionId)", () => {
  _clearRateLimitHeaders();
  storeRateLimitHeaders("shared-id", "openai", {
    "x-ratelimit-limit-tokens": "1000",
    "x-ratelimit-remaining-tokens": "100", // 0.9
  });
  storeRateLimitHeaders("shared-id", "anthropic", {
    "anthropic-ratelimit-tokens-limit": "1000",
    "anthropic-ratelimit-tokens-remaining": "900", // 0.1
  });

  const oai = getTokenHeaderSaturation("openai", "shared-id");
  const anth = getTokenHeaderSaturation("anthropic", "shared-id");
  assert.ok(oai && Math.abs(oai.saturation - 0.9) < 1e-9);
  assert.ok(anth && Math.abs(anth.saturation - 0.1) < 1e-9);
  // A provider with no token headers stored → null.
  assert.equal(getTokenHeaderSaturation("openai", "never-seen"), null);
});
