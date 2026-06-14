/**
 * i18n coverage for TimingTab + TimingWaterfall (R4 fix #3).
 * Source-text inspection — no JSDOM render needed.
 *
 * Round-3 F-I18N translated ConversationTab/StatsTab/StatsCharts but missed
 * TimingTab (5 labels) and TimingWaterfall (2 labels). Round-4 closed the gap.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TIMING_TAB = path.resolve(
  __dirname,
  "../../../src/app/(dashboard)/dashboard/tools/traffic-inspector/components/tabs/TimingTab.tsx",
);
const TIMING_WATERFALL = path.resolve(
  __dirname,
  "../../../src/app/(dashboard)/dashboard/tools/traffic-inspector/components/shared/TimingWaterfall.tsx",
);
const EN = path.resolve(__dirname, "../../../src/i18n/messages/en.json");
const PT = path.resolve(__dirname, "../../../src/i18n/messages/pt-BR.json");

const tabSrc = readFileSync(TIMING_TAB, "utf-8");
const waterfallSrc = readFileSync(TIMING_WATERFALL, "utf-8");
const en = JSON.parse(readFileSync(EN, "utf-8"));
const pt = JSON.parse(readFileSync(PT, "utf-8"));

describe("Timing i18n (R4 fix #3)", () => {
  it("TimingTab uses useTranslations and has no hardcoded English labels", () => {
    assert.ok(tabSrc.includes('useTranslations("trafficInspector")'));
    for (const lit of ["Timestamp", "Method", "Status", "Request size", "Response size"]) {
      assert.ok(
        !new RegExp(`<span[^>]*>${lit}</span>`).test(tabSrc),
        `TimingTab must not render hardcoded "${lit}" — use t() instead`,
      );
    }
    for (const key of ["timingTimestamp", "timingMethod", "timingStatus", "timingRequestSize", "timingResponseSize"]) {
      assert.ok(tabSrc.includes(`t("${key}")`), `TimingTab must call t("${key}")`);
    }
  });

  it("TimingWaterfall translates the empty state and total latency label", () => {
    assert.ok(!waterfallSrc.includes("No timing data available."));
    assert.ok(!waterfallSrc.includes(">Total latency<"));
    assert.ok(waterfallSrc.includes('t("timingNoData")'));
    assert.ok(waterfallSrc.includes('t("timingTotalLatency")'));
  });

  it("All 7 new timing keys exist in both en.json and pt-BR.json", () => {
    const keys = [
      "timingNoData",
      "timingTotalLatency",
      "timingTimestamp",
      "timingMethod",
      "timingStatus",
      "timingRequestSize",
      "timingResponseSize",
    ];
    for (const k of keys) {
      assert.ok(en.trafficInspector?.[k], `en.json must have trafficInspector.${k}`);
      assert.ok(pt.trafficInspector?.[k], `pt-BR.json must have trafficInspector.${k}`);
    }
  });

  it("common.understand is present in both locales (RiskNoticeModal namespace)", () => {
    assert.equal(en.common?.understand, "I understand");
    assert.equal(pt.common?.understand, "Eu entendo");
  });
});
