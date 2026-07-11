import test from "node:test";
import assert from "node:assert/strict";

// Runtime rotation config (operator-managed, e.g. VibeProxy): env-driven per-status fallback
// enable, rate-limit cooldown override, per-connection overrides, and a sliding-window
// threshold counter — with defaults that preserve the engine's historical behavior.

const rc = await import("../../open-sse/services/rotationConfig.ts");
const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");

const ROTATION_ENV_KEYS = [
  "OMNIROUTE_ROTATION_ENABLED",
  "OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS",
  "OMNIROUTE_ROTATION_DISABLE_TAG_WITHOUT_RESET",
  "OMNIROUTE_ROTATE_ON_429",
  "OMNIROUTE_ROTATE_429_THRESHOLD",
  "OMNIROUTE_ROTATE_429_WINDOW_SECONDS",
  "OMNIROUTE_ROTATE_ON_500",
  "OMNIROUTE_ROTATE_500_THRESHOLD",
  "OMNIROUTE_ROTATE_500_WINDOW_SECONDS",
  "OMNIROUTE_ROTATE_ON_502",
  "OMNIROUTE_ROTATE_502_THRESHOLD",
  "OMNIROUTE_ROTATE_502_WINDOW_SECONDS",
  "OMNIROUTE_ROTATE_ON_400",
  "OMNIROUTE_ROTATE_400_THRESHOLD",
  "OMNIROUTE_ROTATE_400_WINDOW_SECONDS",
];

function clearEnv() {
  for (const k of ROTATION_ENV_KEYS) delete process.env[k];
  rc.resetGlobalRotationConfigForTest();
}

test("defaults preserve historical behavior (no env set)", () => {
  clearEnv();
  const cfg = rc.getGlobalRotationConfig();
  assert.equal(cfg.enabled, true);
  assert.equal(cfg.rateLimit429.enabled, true);
  assert.equal(cfg.serverError500.enabled, true);
  assert.equal(cfg.badGateway502.enabled, true);
  assert.equal(cfg.badRequest400.enabled, false); // 400 is opt-in
  assert.equal(cfg.rateLimit429.threshold, 1); // immediate
  assert.equal(rc.rateLimitCooldownOverrideMs(cfg), null); // no override => engine default
  clearEnv();
});

test("env parse: disable 502, enable 400, set reset seconds + thresholds", () => {
  clearEnv();
  process.env.OMNIROUTE_ROTATE_ON_502 = "false";
  process.env.OMNIROUTE_ROTATE_ON_400 = "true";
  process.env.OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS = "10";
  process.env.OMNIROUTE_ROTATE_429_THRESHOLD = "6";
  process.env.OMNIROUTE_ROTATE_429_WINDOW_SECONDS = "120";
  rc.resetGlobalRotationConfigForTest();

  const cfg = rc.getGlobalRotationConfig();
  assert.equal(cfg.badGateway502.enabled, false);
  assert.equal(cfg.badRequest400.enabled, true);
  assert.equal(rc.rateLimitCooldownOverrideMs(cfg), 10_000);
  assert.equal(cfg.rateLimit429.threshold, 6);
  assert.equal(cfg.rateLimit429.windowMs, 120_000);
  clearEnv();
});

test("isFallbackBlockedForStatus: restrictive for 429/500/502, never for 400/ungated", () => {
  clearEnv();
  process.env.OMNIROUTE_ROTATE_ON_502 = "false";
  rc.resetGlobalRotationConfigForTest();
  const cfg = rc.getGlobalRotationConfig();

  assert.equal(rc.isFallbackBlockedForStatus(502, cfg), true); // disabled => blocked
  assert.equal(rc.isFallbackBlockedForStatus(429, cfg), false); // enabled default
  assert.equal(rc.isFallbackBlockedForStatus(500, cfg), false);
  assert.equal(rc.isFallbackBlockedForStatus(400, cfg), false); // additive, never blocked
  assert.equal(rc.isFallbackBlockedForStatus(401, cfg), false); // ungated
  clearEnv();
});

test("shouldForceFallbackFor400 only when opted in", () => {
  clearEnv();
  let cfg = rc.getGlobalRotationConfig();
  assert.equal(rc.shouldForceFallbackFor400(400, cfg), false); // default off

  process.env.OMNIROUTE_ROTATE_ON_400 = "true";
  rc.resetGlobalRotationConfigForTest();
  cfg = rc.getGlobalRotationConfig();
  assert.equal(rc.shouldForceFallbackFor400(400, cfg), true);
  assert.equal(rc.shouldForceFallbackFor400(429, cfg), false); // not a 400
  clearEnv();
});

test("resolveRotationConfig merges per-connection overrides over global", () => {
  clearEnv();
  process.env.OMNIROUTE_ROTATE_429_THRESHOLD = "6";
  rc.resetGlobalRotationConfigForTest();

  const merged = rc.resolveRotationConfig({
    rotateOn429: false,
    error429Threshold: 3,
    rateLimitResetSeconds: 20,
  });
  assert.equal(merged.rateLimit429.enabled, false); // overridden
  assert.equal(merged.rateLimit429.threshold, 3); // overridden (not the global 6)
  assert.equal(merged.rateLimitResetMs, 20_000); // overridden
  assert.equal(merged.serverError500.enabled, true); // inherited
  clearEnv();
});

test("recordErrorAndCheckThreshold: sliding window reaches threshold then resets", () => {
  clearEnv();
  process.env.OMNIROUTE_ROTATE_429_THRESHOLD = "3";
  process.env.OMNIROUTE_ROTATE_429_WINDOW_SECONDS = "60";
  rc.resetGlobalRotationConfigForTest();
  const cfg = rc.getGlobalRotationConfig();

  const t0 = 1_000_000;
  assert.equal(rc.recordErrorAndCheckThreshold("conn-a", 429, cfg, t0), false); // 1
  assert.equal(rc.recordErrorAndCheckThreshold("conn-a", 429, cfg, t0 + 1000), false); // 2
  assert.equal(rc.recordErrorAndCheckThreshold("conn-a", 429, cfg, t0 + 2000), true); // 3 => rotate
  // Counter reset after threshold — next error starts a fresh window.
  assert.equal(rc.recordErrorAndCheckThreshold("conn-a", 429, cfg, t0 + 3000), false);
  clearEnv();
});

test("recordErrorAndCheckThreshold: errors outside the window do not accumulate", () => {
  clearEnv();
  process.env.OMNIROUTE_ROTATE_500_THRESHOLD = "3";
  process.env.OMNIROUTE_ROTATE_500_WINDOW_SECONDS = "60";
  rc.resetGlobalRotationConfigForTest();
  const cfg = rc.getGlobalRotationConfig();

  const t0 = 2_000_000;
  assert.equal(rc.recordErrorAndCheckThreshold("conn-b", 500, cfg, t0), false); // 1
  // 2 minutes later — the first error has fallen out of the 60s window.
  assert.equal(rc.recordErrorAndCheckThreshold("conn-b", 500, cfg, t0 + 120_000), false); // still 1
  clearEnv();
});

test("recordErrorAndCheckThreshold: threshold 1 (default) => immediate rotate", () => {
  clearEnv();
  const cfg = rc.getGlobalRotationConfig();
  assert.equal(rc.recordErrorAndCheckThreshold("conn-c", 429, cfg, 1), true);
  clearEnv();
});

test("integration: OMNIROUTE_ROTATE_ON_502=false blocks 502 fallback in checkFallbackError", () => {
  clearEnv();
  process.env.OMNIROUTE_ROTATE_ON_502 = "false";
  rc.resetGlobalRotationConfigForTest();

  const blocked = checkFallbackError(502, "bad gateway", 0, null, "openai");
  assert.equal(blocked.shouldFallback, false);
  clearEnv();

  // With default config, a 502 still falls over (historical behavior).
  const dflt = checkFallbackError(502, "bad gateway", 0, null, "openai");
  assert.equal(dflt.shouldFallback, true);
  clearEnv();
});

test("integration: 400 with rate-limit text still falls over under default config (#4976 preserved)", () => {
  clearEnv();
  const res = checkFallbackError(
    400,
    "Detected high-frequency non-compliant requests from you.",
    0,
    null,
    "mimocode"
  );
  assert.equal(res.shouldFallback, true);
  clearEnv();
});

test("integration: plain 400 does not fall over by default, but does when opted in", () => {
  clearEnv();
  const dflt = checkFallbackError(400, "Invalid JSON: unexpected token", 0, null, "openai");
  assert.equal(dflt.shouldFallback, false);
  clearEnv();

  process.env.OMNIROUTE_ROTATE_ON_400 = "true";
  rc.resetGlobalRotationConfigForTest();
  const opted = checkFallbackError(400, "Invalid JSON: unexpected token", 0, null, "openai");
  assert.equal(opted.shouldFallback, true);
  clearEnv();
});

test("integration: rate-limit cooldown override applies to a 429 with no upstream hint", () => {
  clearEnv();
  process.env.OMNIROUTE_ROTATION_RATE_LIMIT_RESET_SECONDS = "10";
  rc.resetGlobalRotationConfigForTest();

  const res = checkFallbackError(429, "rate limit", 0, null, "openai");
  assert.equal(res.shouldFallback, true);
  assert.equal(res.cooldownMs, 10_000);
  clearEnv();
});
