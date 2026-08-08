/**
 * Regression suite for issue #9330 — "reset-window strategy is not working properly".
 *
 * Reported scenario: a combo of Claude Sonnet 5 + Gemini 3.6 Flash (Antigravity,
 * weekly windows, < 7 days to reset) + GPT-5.5 Medium (Codex free tier, 26 days
 * to reset) under the `reset-window` strategy kept dispatching to the 26-day
 * Codex account instead of the accounts resetting soonest.
 *
 * Root cause: `getResetWindowTimestampMs` only recognised a reset instant when
 * the quota snapshot exposed a *canonically named* window (`window7d` /
 * `windowWeekly` / `windowMonthly` / `window5h`, or a `windows` map keyed by
 * "weekly" | "session" | "monthly"). Antigravity's snapshot comes from
 * `genericQuotaFetcher.convertUsageToQuotaInfo`, whose `windows` map is keyed by
 * MODEL ID ("gemini-3-flash", "claude-sonnet-5", ...). No key matched, so the
 * helper fell through to the single-signal `quota.resetAt` — which
 * `convertUsageToQuotaInfo` only populates from the *most-used* window and
 * leaves `null` when every window is still at 0% used. Those accounts therefore
 * scored `Infinity` (== "never resets") and were sorted BEHIND the Codex account
 * whose `window7d` did carry a parseable 26-day reset.
 *
 * The fix normalises every provider shape to a comparable "milliseconds until
 * reset" scalar and sorts ascending.
 */

import test, { after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reset-window-9330-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const dbCore = await import("../../../src/lib/db/core.ts");
const { getResetWindowRemainingMs, getResetWindowTimestampMs, resolveResetWindowConfig } =
  await import("../../../open-sse/services/combo/quotaScoring.ts");
const { orderTargetsByResetWindow } =
  await import("../../../open-sse/services/combo/quotaStrategies.ts");
const { registerQuotaFetcher } = await import("../../../open-sse/services/quotaPreflight.ts");

after(() => {
  dbCore.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;
const NOW = Date.now();
const iso = (offsetMs: number) => new Date(NOW + offsetMs).toISOString();

const DEFAULT_CONFIG = resolveResetWindowConfig({});

/**
 * Codex free tier, as reshaped by `codexQuotaFetcher.fetchCodexQuota`: the
 * "secondary" window is always surfaced under the `window7d` / "weekly" names
 * regardless of its real duration, so a free-tier monthly limit shows up here
 * as a 26-day weekly window (exactly what #9330 reported).
 */
const codexQuota26Days = {
  used: 30,
  total: 100,
  percentUsed: 0.3,
  resetAt: iso(26 * DAY_MS),
  window5h: { percentUsed: 0.1, resetAt: iso(3 * HOUR_MS) },
  window7d: { percentUsed: 0.3, resetAt: iso(26 * DAY_MS) },
  windows: {
    session: { percentUsed: 0.1, resetAt: iso(3 * HOUR_MS) },
    weekly: { percentUsed: 0.3, resetAt: iso(26 * DAY_MS) },
  },
  limitReached: false,
};

/**
 * Antigravity, as reshaped by `genericQuotaFetcher.convertUsageToQuotaInfo`:
 * `windows` is keyed by MODEL ID, and `resetAt` stays null while every window
 * is still at 0% used.
 */
const antigravityQuotaFresh = {
  used: 0,
  total: 0,
  percentUsed: 0,
  resetAt: null,
  windows: {
    "gemini-3-flash": { percentUsed: 0, resetAt: iso(5 * DAY_MS) },
    "claude-sonnet-5": { percentUsed: 0, resetAt: iso(6 * DAY_MS) },
  },
  limitReached: false,
};

test("#9330 model-keyed quota windows resolve to a finite reset instead of Infinity", () => {
  const resetMs = getResetWindowTimestampMs(antigravityQuotaFresh, DEFAULT_CONFIG.windows);

  assert.equal(
    Number.isFinite(resetMs),
    true,
    "an Antigravity snapshot whose windows are keyed by model id must still yield a reset " +
      "instant — returning Infinity is what demoted those accounts behind the 26-day Codex one"
  );
  assert.equal(
    Math.round((resetMs - NOW) / DAY_MS),
    5,
    "the EARLIEST of the per-model windows (5 days) must win"
  );
});

test("#9330 remaining-time normalization ranks a 5-day reset ahead of a 26-day reset", () => {
  const antigravity = getResetWindowRemainingMs(antigravityQuotaFresh, DEFAULT_CONFIG.windows, NOW);
  const codex = getResetWindowRemainingMs(codexQuota26Days, DEFAULT_CONFIG.windows, NOW);

  assert.equal(Math.round(antigravity / DAY_MS), 5);
  assert.equal(Math.round(codex / DAY_MS), 26);
  assert.equal(
    antigravity < codex,
    true,
    "the weekly-window account must sort before the 26-day one"
  );
});

test("#9330 an already-elapsed reset normalizes to 0 remaining rather than a negative age", () => {
  const stale = { percentUsed: 0.5, window7d: { percentUsed: 0.5, resetAt: iso(-3 * DAY_MS) } };
  const justElapsed = { percentUsed: 0.5, window7d: { percentUsed: 0.5, resetAt: iso(-1000) } };

  assert.equal(getResetWindowRemainingMs(stale, DEFAULT_CONFIG.windows, NOW), 0);
  assert.equal(getResetWindowRemainingMs(justElapsed, DEFAULT_CONFIG.windows, NOW), 0);
});

test("#9330 the earliest window wins over the most-used window", () => {
  // `convertUsageToQuotaInfo` sets the top-level resetAt from the most-USED
  // window (6 days here), which is not necessarily the one resetting soonest.
  const quota = {
    percentUsed: 0.4,
    resetAt: iso(6 * DAY_MS),
    windows: {
      "gemini-3-flash": { percentUsed: 0.1, resetAt: iso(2 * DAY_MS) },
      "claude-sonnet-5": { percentUsed: 0.4, resetAt: iso(6 * DAY_MS) },
    },
  };

  assert.equal(
    Math.round((getResetWindowTimestampMs(quota, DEFAULT_CONFIG.windows) - NOW) / DAY_MS),
    2
  );
});

test("#9330 a named window without a resetAt does not shadow a sibling that has one", () => {
  const quota = {
    percentUsed: 0.5,
    // window7d is structurally present but carries no reset instant; the
    // windowWeekly sibling does. The `a || b` short-circuit used to pick the
    // resetAt-less window7d and report Infinity.
    window7d: { percentUsed: 0.5, resetAt: null },
    windowWeekly: { percentUsed: 0.5, resetAt: iso(2 * DAY_MS) },
  };

  assert.equal(
    Math.round((getResetWindowTimestampMs(quota, DEFAULT_CONFIG.windows) - NOW) / DAY_MS),
    2
  );
});

test("#9330 exhausted (limitReached) accounts stay demoted to Infinity", () => {
  assert.equal(
    getResetWindowTimestampMs(
      { ...antigravityQuotaFresh, limitReached: true },
      DEFAULT_CONFIG.windows
    ),
    Infinity
  );
  assert.equal(getResetWindowTimestampMs(null, DEFAULT_CONFIG.windows), Infinity);
  assert.equal(
    getResetWindowRemainingMs({ percentUsed: 0.1 }, DEFAULT_CONFIG.windows, NOW),
    Infinity
  );
});

test("#9330 canonically named windows keep their existing resolution (no regression)", () => {
  assert.equal(
    Math.round(
      (getResetWindowTimestampMs(codexQuota26Days, DEFAULT_CONFIG.windows) - NOW) / DAY_MS
    ),
    26,
    "config windows = ['weekly'] must still read window7d, not the 3h session window"
  );

  const withSession = resolveResetWindowConfig({ resetWindowIncludeSession: true });
  assert.equal(
    Math.round((getResetWindowTimestampMs(codexQuota26Days, withSession.windows) - NOW) / HOUR_MS),
    3,
    "opting session in must still pull the 5h window forward"
  );
});

test("#9330 orderTargetsByResetWindow dispatches the soonest-resetting account first", async () => {
  const antigravity = `agy-9330-${randomUUID()}`;
  const codex = `codex-9330-${randomUUID()}`;
  const antigravityConnection = `agy-conn-${randomUUID()}`;
  const codexConnection = `codex-conn-${randomUUID()}`;

  registerQuotaFetcher(antigravity, async () => antigravityQuotaFresh);
  registerQuotaFetcher(codex, async () => codexQuota26Days);

  const target = (provider: string, connectionId: string, stepId: string) => ({
    kind: "model" as const,
    stepId,
    executionKey: `${stepId}@${connectionId}`,
    modelStr: `${provider}/model`,
    provider,
    providerId: provider,
    connectionId,
    weight: 1,
    label: null,
  });

  // Codex is FIRST in the combo definition — exactly the reported layout.
  const ordered = await orderTargetsByResetWindow(
    [
      target(codex, codexConnection, "gpt-5.5-medium"),
      target(antigravity, antigravityConnection, "claude-sonnet-5"),
    ],
    `reset-window-9330-${randomUUID()}`,
    {},
    { warn: () => {} },
    null
  );

  assert.equal(
    ordered[0]?.provider,
    antigravity,
    "the Antigravity account (~5 days to reset) must be dispatched before the Codex account " +
      "(~26 days to reset), despite Codex being first in the combo definition"
  );
});
