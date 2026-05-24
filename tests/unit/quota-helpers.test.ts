import { test } from "node:test";
import assert from "node:assert/strict";
import {
  STATUS_EMOJI,
  worstStatus,
  topQuotas,
  getNextResetSummary,
  getBarColor,
  formatCountdown,
} from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils";

const mkQuota = (overrides: Record<string, unknown> = {}) => ({
  name: "session",
  used: 0,
  total: 100,
  resetAt: null,
  ...overrides,
});

test("STATUS_EMOJI maps all four statuses", () => {
  assert.equal(STATUS_EMOJI.critical, "🔴");
  assert.equal(STATUS_EMOJI.alert, "🟡");
  assert.equal(STATUS_EMOJI.ok, "🟢");
  assert.equal(STATUS_EMOJI.empty, "⚪");
});

test("worstStatus returns empty for no quotas", () => {
  assert.equal(worstStatus([]), "empty");
});

test("worstStatus returns ok when all healthy (>50%)", () => {
  const quotas = [
    mkQuota({ used: 10, total: 100 }), // 90% remaining
    mkQuota({ used: 5, total: 100 }), // 95% remaining
  ];
  assert.equal(worstStatus(quotas), "ok");
});

test("worstStatus returns alert when any is 20-50%", () => {
  const quotas = [
    mkQuota({ used: 10, total: 100 }), // 90%
    mkQuota({ used: 70, total: 100 }), // 30% — alert
  ];
  assert.equal(worstStatus(quotas), "alert");
});

test("worstStatus returns critical when any is <=20%", () => {
  const quotas = [
    mkQuota({ used: 10, total: 100 }), // 90%
    mkQuota({ used: 90, total: 100 }), // 10% — critical
  ];
  assert.equal(worstStatus(quotas), "critical");
});

test("topQuotas returns up to N sorted by worst first", () => {
  const q = [
    mkQuota({ name: "a", used: 10, total: 100 }), // ok 90
    mkQuota({ name: "b", used: 95, total: 100 }), // critical 5
    mkQuota({ name: "c", used: 70, total: 100 }), // alert 30
    mkQuota({ name: "d", used: 50, total: 100 }), // alert 50
  ];
  const top3 = topQuotas(q, 3);
  assert.equal(top3.length, 3);
  assert.equal(top3[0].name, "b"); // critical first
  assert.equal(top3[1].name, "c"); // then worst alert
});

test("getNextResetSummary returns countdown of soonest future reset", () => {
  const now = Date.now();
  const future1h = new Date(now + 3_600_000).toISOString();
  const future1d = new Date(now + 86_400_000).toISOString();
  const past = new Date(now - 1_000).toISOString();
  const summary = getNextResetSummary([
    mkQuota({ resetAt: future1d }),
    mkQuota({ resetAt: future1h }),
    mkQuota({ resetAt: past }),
  ]);
  assert.ok(summary && (summary.includes("1h") || summary.includes("59m")));
});

test("getNextResetSummary returns null when no future resets", () => {
  assert.equal(getNextResetSummary([mkQuota({ resetAt: null })]), null);
  assert.equal(getNextResetSummary(undefined), null);
  assert.equal(getNextResetSummary([]), null);
});

test("getBarColor returns red below 20%", () => {
  const c = getBarColor(15);
  assert.equal(c.bar, "#ef4444");
});

test("getBarColor returns yellow between 20-50%", () => {
  const c = getBarColor(35);
  assert.equal(c.bar, "#eab308");
});

test("getBarColor returns green above 50%", () => {
  const c = getBarColor(80);
  assert.equal(c.bar, "#22c55e");
});

test("formatCountdown returns null for null/empty/past", () => {
  assert.equal(formatCountdown(null), null);
  assert.equal(formatCountdown(undefined), null);
  const past = new Date(Date.now() - 1000).toISOString();
  assert.equal(formatCountdown(past), null);
});

test("formatCountdown returns h+m for sub-day intervals", () => {
  const future = new Date(Date.now() + 2 * 3_600_000 + 30 * 60_000).toISOString();
  const out = formatCountdown(future);
  assert.ok(out && out.includes("2h"));
});

test("formatCountdown returns d+h+m for multi-day intervals", () => {
  const future = new Date(Date.now() + 2 * 86_400_000 + 5 * 3_600_000 + 30 * 60_000).toISOString();
  const out = formatCountdown(future);
  assert.match(out!, /^2d \d+h \d+m$/);
});

test("topQuotas filters out null/undefined entries", () => {
  const q = [
    null,
    mkQuota({ name: "a", used: 10, total: 100 }),
    undefined,
    mkQuota({ name: "b", used: 95, total: 100 }),
  ];
  const top = topQuotas(q as any[], 3);
  assert.equal(top.length, 2);
  assert.equal(top[0].name, "b");
  assert.equal(top[1].name, "a");
});
