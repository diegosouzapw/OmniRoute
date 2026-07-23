import test from "node:test";
import assert from "node:assert/strict";
import {
  getModelRpd,
  getModelRpm,
  incrementRequestCount,
  getDailyRequestCount,
  getMinuteRequestCount,
  isRpdExhausted,
  isRpmExhausted,
  resetCounters,
} from "../../../open-sse/services/geminiRateLimitTracker.ts";

test.beforeEach(() => {
  resetCounters();
});

// ── getModelRpd ──────────────────────────────────────────────────────────────

test("getModelRpd returns known RPD for exact model match", () => {
  assert.equal(getModelRpd("gemini-2.5-flash"), 20);
});

test("getModelRpd returns known RPD for model with gemini/ prefix", () => {
  assert.equal(getModelRpd("gemini/gemini-2.5-flash"), 20);
});

test("getModelRpd returns 0 for model with zero RPD (Gemini 2.5 Pro)", () => {
  assert.equal(getModelRpd("gemini-2.5-pro"), 0);
});

test("getModelRpd returns 0 for unknown model", () => {
  assert.equal(getModelRpd("gemini/fake-model-not-in-list"), 0);
});

test("getModelRpd returns 0 for empty string", () => {
  assert.equal(getModelRpd(""), 0);
});

test("getModelRpd matches gemma-4-31b-it via suffix fallback", () => {
  // The JSON has "gemma-4-31b-it", and callers may pass "gemma-4-31b-it"
  assert.equal(getModelRpd("gemma-4-31b-it"), 14400);
});

test("getModelRpd strips gemma- prefix correctly for gemma models", () => {
  // stripModelPrefix("gemini/gemma-4-31b-it") → "gemma-4-31b-it"
  assert.equal(getModelRpd("gemini/gemma-4-31b-it"), 14400);
});

test("getModelRpd handles image-generation models (no RPM value, -1)", () => {
  // RPD is 25 for imagen models; RPM is -1 in the JSON
  assert.equal(getModelRpd("imagen-4-generate"), 25);
});

test("getModelRpd handles models with unlimited RPD (-1)", () => {
  // gemini-3.5-live-translate has rpd: -1
  assert.equal(getModelRpd("gemini-3.5-live-translate"), 0);
});

test("getModelRpd returns 0 for null input", () => {
  assert.equal(getModelRpd(null as unknown as string), 0);
});

test("getModelRpd returns 0 for undefined input", () => {
  assert.equal(getModelRpd(undefined as unknown as string), 0);
});

// ── incrementRequestCount / getDailyRequestCount ─────────────────────────────

test("incrementRequestCount starts at 1 for first request", () => {
  incrementRequestCount("gemini-2.5-flash");
  assert.equal(getDailyRequestCount("gemini-2.5-flash"), 1);
});

test("incrementRequestCount increments sequentially", () => {
  incrementRequestCount("gemini-2.5-flash");
  incrementRequestCount("gemini-2.5-flash");
  incrementRequestCount("gemini-2.5-flash");
  assert.equal(getDailyRequestCount("gemini-2.5-flash"), 3);
});

test("incrementRequestCount treats gemini/ prefix and bare name as same model", () => {
  incrementRequestCount("gemini-2.5-flash");
  incrementRequestCount("gemini/gemini-2.5-flash");
  assert.equal(getDailyRequestCount("gemini-2.5-flash"), 2);
  assert.equal(getDailyRequestCount("gemini/gemini-2.5-flash"), 2);
});

test("models have independent counters", () => {
  incrementRequestCount("gemini-2.5-flash");
  incrementRequestCount("gemini-2.5-flash");
  incrementRequestCount("gemma-4-31b-it");
  assert.equal(getDailyRequestCount("gemini-2.5-flash"), 2);
  assert.equal(getDailyRequestCount("gemma-4-31b-it"), 1);
});

test("getDailyRequestCount returns 0 for model with no requests", () => {
  assert.equal(getDailyRequestCount("gemini-2.5-flash"), 0);
});

test("incrementRequestCount does nothing for empty model ID", () => {
  incrementRequestCount("");
  assert.equal(getDailyRequestCount("gemini-2.5-flash"), 0);
});

test("resetCounters clears all state between tests", () => {
  incrementRequestCount("gemini-2.5-flash");
  incrementRequestCount("gemma-4-31b-it");
  resetCounters();
  assert.equal(getDailyRequestCount("gemini-2.5-flash"), 0);
  assert.equal(getDailyRequestCount("gemma-4-31b-it"), 0);
});

// ── isRpdExhausted ───────────────────────────────────────────────────────────

test("isRpdExhausted returns false when count is below RPD limit", () => {
  // gemini-2.5-flash has RPD=20
  for (let i = 0; i < 19; i++) incrementRequestCount("gemini-2.5-flash");
  assert.equal(isRpdExhausted("gemini-2.5-flash"), false);
});

test("isRpdExhausted returns true when count equals RPD limit", () => {
  // gemini-2.5-flash has RPD=20
  for (let i = 0; i < 20; i++) incrementRequestCount("gemini-2.5-flash");
  assert.equal(isRpdExhausted("gemini-2.5-flash"), true);
});

test("isRpdExhausted returns true when count exceeds RPD limit", () => {
  for (let i = 0; i < 25; i++) incrementRequestCount("gemini-2.5-flash");
  assert.equal(isRpdExhausted("gemini-2.5-flash"), true);
});

test("isRpdExhausted returns false for model with RPD=0", () => {
  // gemini-2.5-pro has rpd=0
  incrementRequestCount("gemini-2.5-pro");
  assert.equal(isRpdExhausted("gemini-2.5-pro"), false);
});

test("isRpdExhausted returns false for unknown model", () => {
  incrementRequestCount("gemini/unknown-model");
  assert.equal(isRpdExhausted("gemini/unknown-model"), false);
});

test("isRpdExhausted returns false for model with unlimited RPD (-1, no data)", () => {
  // gemini-3.5-live-translate has rpd: -1
  incrementRequestCount("gemini-3.5-live-translate");
  assert.equal(isRpdExhausted("gemini-3.5-live-translate"), false);
});

test("isRpdExhausted works with gemini/ prefix for the model", () => {
  for (let i = 0; i < 20; i++) incrementRequestCount("gemini/gemini-2.5-flash");
  assert.equal(isRpdExhausted("gemini/gemini-2.5-flash"), true);
});

// ── Integration: Gemma 4 RPM scenario ────────────────────────────────────────

test("Gemma 4: 15 RPM hits never trigger quota_exhausted (RPD=14400)", () => {
  // Gemma 4 has RPD=14400, so 15 RPM hits should not trigger RPD exhaustion
  for (let i = 0; i < 15; i++) incrementRequestCount("gemini/gemma-4-31b-it");
  assert.equal(isRpdExhausted("gemini/gemma-4-31b-it"), false);
  assert.equal(getDailyRequestCount("gemini/gemma-4-31b-it"), 15);
});

test("Gemma 4: RPD exhaustion requires 14400 requests", () => {
  for (let i = 0; i < 14399; i++) incrementRequestCount("gemini/gemma-4-31b-it");
  assert.equal(isRpdExhausted("gemini/gemma-4-31b-it"), false);

  incrementRequestCount("gemini/gemma-4-31b-it");
  assert.equal(isRpdExhausted("gemini/gemma-4-31b-it"), true);
});

// ── Integration: Gemini 2.5 Flash RPD scenario ───────────────────────────────

test("Gemini 2.5 Flash: first 19 requests do NOT exhaust RPD, 20th does", () => {
  for (let i = 0; i < 19; i++) incrementRequestCount("gemini-2.5-flash");
  assert.equal(isRpdExhausted("gemini-2.5-flash"), false, "19 requests < 20 RPD");

  incrementRequestCount("gemini-2.5-flash");
  assert.equal(isRpdExhausted("gemini-2.5-flash"), true, "20 requests = 20 RPD");
});

test("Gemini 2.5 Flash: excess requests stay exhausted", () => {
  for (let i = 0; i < 22; i++) incrementRequestCount("gemini-2.5-flash");
  assert.equal(isRpdExhausted("gemini-2.5-flash"), true);
  assert.equal(getDailyRequestCount("gemini-2.5-flash"), 22);
});

// ── getModelRpm ───────────────────────────────────────────────────────────────

test("getModelRpm returns known RPM for exact model match", () => {
  assert.equal(getModelRpm("gemini-2.5-flash"), 5);
});

test("getModelRpm returns known RPM for model with gemini/ prefix", () => {
  assert.equal(getModelRpm("gemini/gemini-2.5-flash"), 5);
});

test("getModelRpm returns 0 for model with zero RPM", () => {
  assert.equal(getModelRpm("gemini-2.5-pro"), 0);
});

test("getModelRpm returns 0 for unknown model", () => {
  assert.equal(getModelRpm("gemini/fake-model-not-in-list"), 0);
});

test("getModelRpm returns 0 for empty string", () => {
  assert.equal(getModelRpm(""), 0);
});

test("getModelRpm returns 0 for models with RPM=-1 (imagen)", () => {
  assert.equal(getModelRpm("imagen-4-generate"), 0);
});

test("getModelRpm returns 0 for null input", () => {
  assert.equal(getModelRpm(null as unknown as string), 0);
});

// ── incrementMinuteRequestCount / getMinuteRequestCount ───────────────────────

test("getMinuteRequestCount returns 0 before first request", () => {
  assert.equal(getMinuteRequestCount("gemini-2.5-flash"), 0);
});

test("incrementMinuteRequestCount starts at 1", () => {
  incrementRequestCount("gemini-2.5-flash");
  assert.equal(getMinuteRequestCount("gemini-2.5-flash"), 1);
});

test("incrementMinuteRequestCount increments with each call", () => {
  incrementRequestCount("gemini-2.5-flash");
  incrementRequestCount("gemini-2.5-flash");
  incrementRequestCount("gemini-2.5-flash");
  assert.equal(getMinuteRequestCount("gemini-2.5-flash"), 3);
});

test("incrementMinuteRequestCount normalizes gemini/ prefix", () => {
  incrementRequestCount("gemini-2.5-flash");
  incrementRequestCount("gemini/gemini-2.5-flash");
  assert.equal(getMinuteRequestCount("gemini-2.5-flash"), 2);
});

test("minute counters are independent per model", () => {
  incrementRequestCount("gemini-2.5-flash");
  incrementRequestCount("gemini-2.5-flash");
  incrementRequestCount("gemma-4-31b-it");
  assert.equal(getMinuteRequestCount("gemini-2.5-flash"), 2);
  assert.equal(getMinuteRequestCount("gemma-4-31b-it"), 1);
});

test("incrementRequestCount does nothing for empty model ID", () => {
  incrementRequestCount("");
  assert.equal(getMinuteRequestCount("gemini-2.5-flash"), 0);
});

test("resetCounters clears minute windows", () => {
  incrementRequestCount("gemini-2.5-flash");
  incrementRequestCount("gemma-4-31b-it");
  resetCounters();
  assert.equal(getMinuteRequestCount("gemini-2.5-flash"), 0);
  assert.equal(getMinuteRequestCount("gemma-4-31b-it"), 0);
});

// ── isRpmExhausted ────────────────────────────────────────────────────────────

test("isRpmExhausted returns false below RPM limit", () => {
  // gemini-2.5-flash has RPM=5
  for (let i = 0; i < 4; i++) incrementRequestCount("gemini-2.5-flash");
  assert.equal(isRpmExhausted("gemini-2.5-flash"), false);
});

test("isRpmExhausted returns true at RPM limit", () => {
  for (let i = 0; i < 5; i++) incrementRequestCount("gemini-2.5-flash");
  assert.equal(isRpmExhausted("gemini-2.5-flash"), true);
});

test("isRpmExhausted returns true above RPM limit", () => {
  for (let i = 0; i < 8; i++) incrementRequestCount("gemini-2.5-flash");
  assert.equal(isRpmExhausted("gemini-2.5-flash"), true);
});

test("isRpmExhausted returns false for model with RPM=0", () => {
  incrementRequestCount("gemini-2.5-pro");
  assert.equal(isRpmExhausted("gemini-2.5-pro"), false);
});

test("isRpmExhausted returns false for unknown model", () => {
  incrementRequestCount("gemini/unknown-model");
  assert.equal(isRpmExhausted("gemini/unknown-model"), false);
});

test("isRpmExhausted returns false for model with RPM=-1 (imagen)", () => {
  incrementRequestCount("imagen-4-generate");
  assert.equal(isRpmExhausted("imagen-4-generate"), false);
});

test("isRpmExhausted works with gemini/ prefix", () => {
  for (let i = 0; i < 5; i++) incrementRequestCount("gemini/gemini-2.5-flash");
  assert.equal(isRpmExhausted("gemini/gemini-2.5-flash"), true);
});

// ── Integration: RPM + RPD work independently ─────────────────────────────────

test("RPM and RPD limits are tracked independently", () => {
  // Gemini 3.1 Flash Lite: RPM=15, RPD=500
  // After 15 requests, RPM is exhausted but RPD is not
  for (let i = 0; i < 15; i++) incrementRequestCount("gemini/gemini-3.1-flash-lite");
  assert.equal(isRpmExhausted("gemini/gemini-3.1-flash-lite"), true);
  assert.equal(isRpdExhausted("gemini/gemini-3.1-flash-lite"), false);
});

test("Gemini 2.5 Flash: RPM=5 always hits before RPD=20", () => {
  // After 5 requests, RPM is exhausted; after 20, RPD is exhausted
  for (let i = 0; i < 5; i++) incrementRequestCount("gemini-2.5-flash");
  assert.equal(isRpmExhausted("gemini-2.5-flash"), true);
  assert.equal(isRpdExhausted("gemini-2.5-flash"), false);

  incrementRequestCount("gemini-2.5-flash"); // 6
  incrementRequestCount("gemini-2.5-flash"); // 7
  incrementRequestCount("gemini-2.5-flash"); // 8

  // Still at RPD=8 which is < 20
  assert.equal(isRpdExhausted("gemini-2.5-flash"), false);
});
