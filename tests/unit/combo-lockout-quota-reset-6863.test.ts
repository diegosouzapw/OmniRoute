// #6863: combo path model lockout must honor a parsed upstream quota reset
// ("Resets in 92h27m28s") instead of the base cooldown ladder, mirroring the
// single-model path (src/sse/services/auth.ts usedUpstreamRetryHint/quotaResetHintMs).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-combo-quota-reset-6863-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-combo-quota-reset-6863";

const core = await import("../../src/lib/db/core.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { getModelLockoutInfo, clearAllModelLockouts, parseRetryFromErrorText } =
  await import("../../open-sse/services/accountFallback.ts");

const UPSTREAM_429_MESSAGE =
  "429: Individual quota reached. Please upgrade your subscription to increase your limits. Resets in 92h27m28s.";

function createLog() {
  return { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} };
}

test.beforeEach(() => {
  clearAllModelLockouts();
});

test.after(() => {
  clearAllModelLockouts();
  try {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  } catch {}
});

test("combo 429 lockout honors parsed upstream quota reset over base cooldown (#6863)", async () => {
  const provider = "antigravity"; // OAuth category → quota signals preserved on 429
  const model = "claude-sonnet-4.6";

  const settings = {
    modelLockout: {
      enabled: true,
      errorCodes: [429],
      baseCooldownMs: 3000,
      maxCooldownMs: 1_800_000,
      maxBackoffSteps: 10,
      useExponentialBackoff: true,
    },
  };

  await handleComboChat({
    body: {},
    combo: {
      name: "quota-reset-combo",
      strategy: "priority",
      models: [`${provider}/${model}`],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async () =>
      new Response(JSON.stringify({ error: { message: UPSTREAM_429_MESSAGE } }), {
        status: 429,
        headers: { "content-type": "application/json" },
      }),
    isModelAvailable: async () => true,
    log: createLog(),
    settings,
    allCombos: null,
  });

  const parsedResetMs = parseRetryFromErrorText(UPSTREAM_429_MESSAGE);
  assert.ok(
    parsedResetMs && parsedResetMs > 90 * 3600 * 1000,
    `sanity: reset text must parse to ~92.5h, got ${parsedResetMs}`
  );

  const info = getModelLockoutInfo(provider, "", model);
  assert.ok(info, "combo 429 must record a model lockout");
  // Bug #6863: lockout was baseCooldownMs (~seconds) while upstream said 92.5h.
  // The lockout must equal the parsed reset minus elapsed test runtime (bounded slack),
  // so a hardcoded long cooldown (e.g. a fixed 1h) cannot pass.
  assert.ok(
    info!.remainingMs > parsedResetMs! - 5_000 && info!.remainingMs <= parsedResetMs!,
    `lockout must equal the parsed upstream reset (~${parsedResetMs}ms); got ${info!.remainingMs}ms (~${Math.round(info!.remainingMs / 1000)}s)`
  );
});

test("combo 429 lockout prefers a SHORT parsed reset over the subscription fallback cooldown", async () => {
  // Review follow-up on #6863: the subscription-quota branch returns
  // cooldownMs = 1h fallback when useUpstreamRetryHints is off (OAuth default),
  // while quotaResetHintMs carries the real parsed reset. A max() of the two
  // would over-lock (1h) — the lockout must follow the parsed value (~45m),
  // matching the single-model path in src/sse/services/auth.ts.
  const provider = "claude"; // OAuth category → subscription-quota branch applies
  const model = "claude-sonnet-4-6";
  const shortResetMessage =
    "429: Usage limit reached. Your Claude Pro usage limit resets in 45m0s.";

  const settings = {
    modelLockout: {
      enabled: true,
      errorCodes: [429],
      baseCooldownMs: 3000,
      maxCooldownMs: 7_200_000,
      maxBackoffSteps: 10,
      useExponentialBackoff: true,
    },
  };

  await handleComboChat({
    body: {},
    combo: {
      name: "short-reset-combo",
      strategy: "priority",
      models: [`${provider}/${model}`],
      config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    },
    handleSingleModel: async () =>
      new Response(JSON.stringify({ error: { message: shortResetMessage } }), {
        status: 429,
        headers: { "content-type": "application/json" },
      }),
    isModelAvailable: async () => true,
    log: createLog(),
    settings,
    allCombos: null,
  });

  const parsedResetMs = parseRetryFromErrorText(shortResetMessage);
  assert.equal(parsedResetMs, 45 * 60 * 1000, "sanity: reset text must parse to 45m");

  const info = getModelLockoutInfo(provider, "", model);
  assert.ok(info, "combo 429 must record a model lockout");
  // Must be the parsed 45m — NOT the 1h subscription fallback (over-lock).
  assert.ok(
    info!.remainingMs > parsedResetMs! - 5_000 && info!.remainingMs <= parsedResetMs!,
    `lockout must follow the parsed 45m reset, not the 1h fallback; got ${info!.remainingMs}ms (~${Math.round(info!.remainingMs / 1000)}s)`
  );
});
