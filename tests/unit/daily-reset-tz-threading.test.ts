/**
 * #13440 — non-TPD daily-quota cooldowns honor the provider node's configured
 * daily-reset clock (dailyQuotaResetTimezone + dailyQuotaResetHour) instead of
 * host midnight, on both the single-model classifier and the combo call sites.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.TZ = "UTC";
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-daily-reset-13440-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { checkFallbackError, getMsUntilTomorrow } =
  await import("../../open-sse/services/accountFallback.ts");
const { nextDailyResetAtMs } = await import("../../open-sse/services/dailyQuotaReset.ts");
const { resolveComboDailyReset } =
  await import("../../open-sse/services/combo/comboDailyResetClock.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const rrState = await import("../../open-sse/services/combo/rrState.ts");
const { createProviderNode, updateProviderNode } =
  await import("../../src/lib/db/providers/nodes.ts");
const dbCore = await import("../../src/lib/db/core.ts");

const DAILY_TEXT = "daily quota exceeded, try again tomorrow";
const HOUR_MS = 3_600_000;
const realDateNow = Date.now;

/** Shift the wall clock so "now" is `nowMs` (keeps advancing in real time). */
function shiftClockTo(nowMs: number): void {
  const offset = nowMs - realDateNow();
  Date.now = () => realDateNow() + offset;
}

function dailyCooldownMs(timezone: unknown, hour: unknown, nowMs: number): number {
  return checkFallbackError(403, DAILY_TEXT, 0, null, "tz-thread-prov", null, null, null, null, {
    timezone,
    hour,
    nowMs,
  }).cooldownMs;
}

type LogCall = { level: string; msg: string };
function captureLog(calls: LogCall[]) {
  const push = (level: string) => (_tag: string, msg: unknown) =>
    calls.push({ level, msg: String(msg) });
  return { info: push("info"), warn: push("warn"), debug: push("debug"), error: push("error") };
}

function dailyQuotaResponse(status: number): Response {
  return new Response(JSON.stringify({ error: { message: DAILY_TEXT } }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function dispatch(
  combo: Record<string, unknown>,
  failingProvider: string,
  failStatus: number,
  calls: LogCall[]
) {
  const res = await handleComboChat({
    body: { model: combo.name, messages: [{ role: "user", content: "hi" }], stream: false },
    combo,
    allCombos: [combo],
    isModelAvailable: async () => true,
    relayOptions: undefined,
    signal: undefined,
    settings: {},
    log: captureLog(calls),
    handleSingleModel: async (_b: unknown, modelStr: string) => {
      if (modelStr.startsWith(`${failingProvider}/`)) return dailyQuotaResponse(failStatus);
      return Response.json({ choices: [{ message: { role: "assistant", content: "ok" } }] });
    },
  });
  await (res as Response | undefined)?.body?.cancel().catch(() => {});
}

function comboFor(name: string, strategy: string, nodeId: string, config = {}) {
  return {
    name,
    strategy,
    config: { maxRetries: 0, disableSessionStickiness: true, ...config },
    models: [
      { kind: "model", provider: nodeId, providerId: nodeId, model: "m-a", id: `${name}-0` },
      { kind: "model", provider: "glm-cn", providerId: "glm-cn", model: "m-b", id: `${name}-1` },
    ],
  };
}

function rrCooldownFromLogs(calls: LogCall[]): number | null {
  for (const c of calls) {
    const m = /error 429, cooldown (\d+)ms/.exec(c.msg);
    if (c.level === "warn" && m) return Number(m[1]);
  }
  return null;
}

test.beforeEach(() => {
  rrState.rrCounters.clear();
  rrState.rrStickyTargets.clear();
});

test.afterEach(() => {
  Date.now = realDateNow;
});

test.after(() => {
  Date.now = realDateNow;
  try {
    dbCore.resetDbInstance();
  } catch {
    /* ignore */
  }
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("checkFallbackError: Paris pre-spring-forward resolves to provider midnight", () => {
  const nowMs = Date.parse("2026-03-28T21:00:00Z");
  assert.equal(dailyCooldownMs("Europe/Paris", 0, nowMs), 2 * HOUR_MS);
});

test("checkFallbackError: Paris pre-fall-back resolves to provider midnight", () => {
  const nowMs = Date.parse("2026-10-24T10:00:00Z");
  assert.equal(dailyCooldownMs("Europe/Paris", 0, nowMs), 12 * HOUR_MS);
});

test("checkFallbackError: New York resolves to provider midnight, not host midnight", () => {
  const nowMs = Date.parse("2026-01-16T04:00:00Z");
  assert.equal(dailyCooldownMs("America/New_York", 0, nowMs), HOUR_MS);
});

// The legacy value is recomputed from a live Date.now() inside getMsUntilTomorrow(), so the two
// reads are a few ms apart under load; compare within a second instead of strictly.
function assertWithinASecond(actual: number, expected: number, label: string): void {
  assert.ok(
    Math.abs(actual - expected) <= 1000,
    `${label}: expected ${actual} within 1s of ${expected}`
  );
}

test("checkFallbackError: unconfigured clock keeps the legacy host-midnight value", () => {
  shiftClockTo(Date.parse("2026-01-15T12:00:00Z"));
  assertWithinASecond(
    dailyCooldownMs(undefined, undefined, Date.now()),
    getMsUntilTomorrow(),
    "unconfigured clock"
  );
});

test("checkFallbackError: invalid timezone falls back to legacy without throwing", () => {
  shiftClockTo(Date.parse("2026-01-15T12:00:00Z"));
  assertWithinASecond(
    dailyCooldownMs("Mars/Olympus", 0, Date.now()),
    getMsUntilTomorrow(),
    "invalid tz"
  );
});

test("resolveComboDailyReset: matches id and prefix, null for unknown providers", async () => {
  const node = await createProviderNode({
    type: "openai-compatible",
    name: "Daily reset lookup",
    prefix: "drlookup13440",
    apiType: "chat",
    baseUrl: "http://127.0.0.1:9/v1",
    dailyQuotaResetTimezone: "Europe/Paris",
    dailyQuotaResetHour: 7,
  });
  const expected = { timezone: "Europe/Paris", hour: 7 };
  assert.deepEqual(await resolveComboDailyReset(String(node.id)), expected);
  assert.deepEqual(await resolveComboDailyReset("drlookup13440"), expected);
  assert.equal(await resolveComboDailyReset("no-such-provider-13440"), null);
  assert.equal(await resolveComboDailyReset("unknown"), null);
  assert.equal(await resolveComboDailyReset(null), null);
});

test("round-robin combo passes the node clock, and a timezone edit applies without restart", async () => {
  const node = await createProviderNode({
    type: "openai-compatible",
    name: "Daily reset RR",
    prefix: "drrr13440",
    apiType: "chat",
    baseUrl: "http://127.0.0.1:9/v1",
    dailyQuotaResetTimezone: "America/New_York",
    dailyQuotaResetHour: 0,
  });
  const nodeId = String(node.id);

  // 1h before New York midnight: provider clock says 1h, host (UTC) midnight is ~19-20h away.
  shiftClockTo(nextDailyResetAtMs("America/New_York", 0, realDateNow()) - HOUR_MS);
  assert.ok(getMsUntilTomorrow() > 3 * HOUR_MS, "fixture must separate host and provider clocks");
  const first: LogCall[] = [];
  await dispatch(comboFor("rr13440-a", "round-robin", nodeId), nodeId, 429, first);
  const firstCooldown = rrCooldownFromLogs(first);
  assert.ok(firstCooldown !== null, "RR must log the semaphore cooldown for the 429");
  assert.ok(
    Math.abs(firstCooldown - HOUR_MS) < 10_000,
    `expected ~1h (New York midnight), got ${firstCooldown}ms`
  );

  // Operator edits the node: Tokyo midnight. No restart, no cache reset in the test.
  await updateProviderNode(nodeId, { dailyQuotaResetTimezone: "Asia/Tokyo" });
  shiftClockTo(nextDailyResetAtMs("Asia/Tokyo", 0, realDateNow()) - 2 * HOUR_MS);
  assert.ok(Math.abs(getMsUntilTomorrow() - 2 * HOUR_MS) > HOUR_MS);
  const second: LogCall[] = [];
  await dispatch(comboFor("rr13440-b", "round-robin", nodeId), nodeId, 429, second);
  const secondCooldown = rrCooldownFromLogs(second);
  assert.ok(secondCooldown !== null, "RR must log the semaphore cooldown for the 429");
  assert.ok(
    Math.abs(secondCooldown - 2 * HOUR_MS) < 10_000,
    `expected ~2h (Tokyo midnight after the edit), got ${secondCooldown}ms`
  );
});

test("priority combo attempt path passes the node clock to checkFallbackError", async () => {
  const node = await createProviderNode({
    type: "openai-compatible",
    name: "Daily reset priority",
    prefix: "drprio13440",
    apiType: "chat",
    baseUrl: "http://127.0.0.1:9/v1",
    dailyQuotaResetTimezone: "America/New_York",
    dailyQuotaResetHour: 0,
  });
  const nodeId = String(node.id);

  // 2s before New York midnight: the provider-clock cooldown (~2s) is short enough for
  // the pre-fallback wait (<= MAX_FALLBACK_WAIT_MS); host midnight (hours) is not.
  shiftClockTo(nextDailyResetAtMs("America/New_York", 0, realDateNow()) - 2_000);
  const calls: LogCall[] = [];
  await dispatch(
    comboFor("prio13440", "priority", nodeId, { fallbackDelayMs: 25 }),
    nodeId,
    503,
    calls
  );
  assert.ok(
    calls.some((c) => c.level === "debug" && /Waiting 25ms before fallback/.test(c.msg)),
    `expected the provider-clock fallback wait; logs: ${JSON.stringify(calls.map((c) => c.msg))}`
  );
});
