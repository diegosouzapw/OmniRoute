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
const { getModelLockoutInfo, clearAllModelLockouts, parseRetryFromErrorText } = await import(
  "../../open-sse/services/accountFallback.ts"
);

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
  // Allow slack for test runtime: anything >= 1h proves the parsed reset was used.
  assert.ok(
    info!.remainingMs >= 3_600_000,
    `lockout must honor the parsed upstream reset (~92.5h); got ${info!.remainingMs}ms (~${Math.round(info!.remainingMs / 1000)}s)`
  );
});
