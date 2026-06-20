import test from "node:test";
import assert from "node:assert/strict";

import {
  selectLockoutCooldownMs,
  recordModelLockoutFailure,
  getModelLockoutInfo,
  clearAllModelLockouts,
  parseRetryFromErrorText,
} from "../../open-sse/services/accountFallback.ts";
import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";

// Regression for #1308: a combo model-lockout was capped at the short base cooldown
// (~minutes) and discarded the long upstream quota reset that the central parser had
// already extracted (e.g. Antigravity "Resets in 160h27m24s"), so the exhausted model
// kept being retried within minutes.

const HOUR = 3600_000;
const RESET_160H = 160 * HOUR + 27 * 60_000 + 24_000; // "160h27m24s"

test("selectLockoutCooldownMs honors a parsed reset longer than the base cooldown", () => {
  // exponential backoff on, but a 160h upstream reset must win
  assert.equal(
    selectLockoutCooldownMs(RESET_160H, { baseCooldownMs: 5 * 60_000, useExponentialBackoff: true }),
    RESET_160H
  );
});

test("selectLockoutCooldownMs preserves exponential backoff when no long reset is present", () => {
  // parsed cooldown <= base → return 0 so recordModelLockoutFailure applies its backoff
  assert.equal(
    selectLockoutCooldownMs(0, { baseCooldownMs: 5 * 60_000, useExponentialBackoff: true }),
    0
  );
});

test("selectLockoutCooldownMs falls back to base cooldown when backoff is disabled", () => {
  assert.equal(
    selectLockoutCooldownMs(0, { baseCooldownMs: 5 * 60_000, useExponentialBackoff: false }),
    5 * 60_000
  );
});

test("model lockout honors the long upstream reset end-to-end (#1308)", () => {
  clearAllModelLockouts();
  const exact = selectLockoutCooldownMs(RESET_160H, {
    baseCooldownMs: 5 * 60_000,
    useExponentialBackoff: true,
  });
  recordModelLockoutFailure("antigravity", "conn-1", "claude-sonnet-4-6", "rate_limit", 429, 5 * 60_000, null, {
    exactCooldownMs: exact,
  });
  const info = getModelLockoutInfo("antigravity", "conn-1", "claude-sonnet-4-6");
  assert.ok(info, "expected an active lockout");
  // remaining should be ~160h, NOT the ~5min base cooldown
  assert.ok(
    info.remainingMs > 150 * HOUR,
    `expected lockout ~160h, got ${Math.round(info.remainingMs / HOUR)}h`
  );
  clearAllModelLockouts();
});

test("central parseRetryFromErrorText parses Antigravity 'Resets in 160h27m24s'", () => {
  const ms = parseRetryFromErrorText("Individual quota reached. Resets in 160h27m24s.");
  assert.ok(ms && ms > 150 * HOUR, `expected ~160h, got ${ms}`);
});

test("antigravity executor parseRetryFromErrorMessage matches plural 'Resets in' (#1308)", () => {
  const executor = new AntigravityExecutor();
  const ms = executor.parseRetryFromErrorMessage("Individual quota reached. Resets in 160h27m24s.");
  assert.ok(ms && ms > 150 * HOUR, `expected ~160h, got ${ms}`);
});
