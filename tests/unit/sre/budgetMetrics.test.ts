/**
 * TDD for PR-012 — `src/lib/observability/budgetMetrics.ts`.
 *
 * Covers:
 *   - registry registration is idempotent
 *   - target ratio / remaining / burn rate writes
 *   - alerts counter accumulates
 *   - cardinality cap enforcement
 *   - default-off gate (SLO_TRACKER_ENABLED)
 *   - Prometheus exposition format
 *
 * 15 assertions across 5 describe blocks.
 *
 * Run from the repo root:
 *   node --import tsx --test tests/unit/sre/budgetMetrics.test.ts
 */
import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";

import {
  MAX_BUDGET_SERIES,
  METRIC_ALERTS_FIRED,
  METRIC_BUDGET_REMAINING,
  METRIC_BURN_RATE,
  METRIC_CARDINALITY_DROPPED,
  METRIC_TARGET_RATIO,
  __resetForTests,
  getCurrentSeriesCount,
  getMetric,
  isSloTrackerEnabled,
  recordBudgetMetric,
  REGISTRY,
  registerBudgetMetrics,
  renderPrometheusExposition,
} from "../../../src/lib/observability/budgetMetrics.ts";

before(() => {
  process.env.SLO_TRACKER_ENABLED = "true";
  __resetForTests();
});

after(() => {
  delete process.env.SLO_TRACKER_ENABLED;
});

describe("budgetMetrics: registration", () => {
  it("registers all four metric families plus the dropped counter", () => {
    const names = [
      METRIC_TARGET_RATIO,
      METRIC_BUDGET_REMAINING,
      METRIC_BURN_RATE,
      METRIC_ALERTS_FIRED,
      METRIC_CARDINALITY_DROPPED,
    ];
    for (const name of names) {
      assert.ok(getMetric(name), `metric ${name} should be registered`);
    }
  });

  it("registerBudgetMetrics is idempotent (re-running is a no-op)", () => {
    registerBudgetMetrics();
    registerBudgetMetrics();
    // Should not throw — count of families stays the same.
    assert.ok(getMetric(METRIC_TARGET_RATIO));
  });

  it("exposes a cardinality cap of 75", () => {
    assert.equal(MAX_BUDGET_SERIES, 75);
  });
});

describe("budgetMetrics: recording", () => {
  it("writes a target ratio gauge", () => {
    __resetForTests();
    recordBudgetMetric({ slo_id: "SLO-001", target_ratio: 0.999 });
    const family = getMetric(METRIC_TARGET_RATIO);
    assert.ok(family);
    assert.equal(family!.samples.length, 1);
    assert.equal(family!.samples[0].value, 0.999);
    assert.equal(family!.samples[0].labels[0].value, "SLO-001");
  });

  it("writes per-window remaining and burn-rate gauges", () => {
    __resetForTests();
    recordBudgetMetric({
      slo_id: "SLO-002",
      remaining_by_window: { "1h": 0.8, "6h": 0.6 },
      burn_rate_by_window: { "1h": 1.5, "6h": 2.0 },
    });
    const remaining = getMetric(METRIC_BUDGET_REMAINING);
    const burnRate = getMetric(METRIC_BURN_RATE);
    assert.equal(remaining!.samples.length, 2);
    assert.equal(burnRate!.samples.length, 2);
    const oneHourRemaining = remaining!.samples.find((s) =>
      s.labels.some((l) => l.name === "window" && l.value === "1h")
    );
    assert.ok(oneHourRemaining);
    assert.equal(oneHourRemaining!.value, 0.8);
  });

  it("accumulates the alerts counter", () => {
    __resetForTests();
    recordBudgetMetric({ slo_id: "SLO-003", increment_alert: true, alert_severity: "page" });
    recordBudgetMetric({ slo_id: "SLO-003", increment_alert: true, alert_severity: "page" });
    recordBudgetMetric({ slo_id: "SLO-003", increment_alert: true, alert_severity: "warn" });
    const family = getMetric(METRIC_ALERTS_FIRED);
    assert.ok(family);
    const pageRow = family!.samples.find((s) =>
      s.labels.some((l) => l.name === "severity" && l.value === "page")
    );
    const warnRow = family!.samples.find((s) =>
      s.labels.some((l) => l.name === "severity" && l.value === "warn")
    );
    assert.equal(pageRow?.value, 2);
    assert.equal(warnRow?.value, 1);
  });

  it("rejects an unknown metric family", () => {
    __resetForTests();
    // Use the low-level write path to push a metric family that was never
    // registered. This must throw so callers don't accidentally pollute
    // the registry with typos.
    assert.throws(
      () => REGISTRY.write("omniroute_slo_does_not_exist", { slo_id: "SLO-001" }, 1),
      /unknown metric/
    );
    // Sanity check: a registered family still accepts writes.
    recordBudgetMetric({ slo_id: "SLO-001", target_ratio: 0.999 });
    assert.ok(getMetric(METRIC_TARGET_RATIO));
  });

  it("enforces the cardinality cap (75 series)", () => {
    __resetForTests();
    // The cap is 75 series across all families. We force the cap by
    // writing unique (slo_id, window) combinations until the cap fires.
    let accepted = true;
    let writes = 0;
    for (let i = 0; i < 200 && accepted; i += 1) {
      const r = recordBudgetMetric({
        slo_id: `SLO-${String(i).padStart(3, "0")}`,
        remaining_by_window: { "1h": 0.5, "6h": 0.5, "24h": 0.5, "7d": 0.5, "30d": 0.5 },
        burn_rate_by_window: { "1h": 1.0, "6h": 1.0, "24h": 1.0, "7d": 1.0, "30d": 1.0 },
      });
      accepted = r.accepted;
      if (accepted) writes += 1;
    }
    // The first 15 SLOs = 15 × 10 series = 150, but cap is 75 → should
    // stop accepting once we hit the cap. Verify the cap was enforced.
    assert.ok(getCurrentSeriesCount() <= MAX_BUDGET_SERIES);
    // At least one of our writes must have been rejected.
    assert.ok(writes < 200);
  });
});

describe("budgetMetrics: default-off gate", () => {
  it("isSloTrackerEnabled returns false when env unset", () => {
    delete process.env.SLO_TRACKER_ENABLED;
    assert.equal(isSloTrackerEnabled(), false);
  });

  it("isSloTrackerEnabled accepts true/1/yes (case-insensitive)", () => {
    for (const v of ["true", "TRUE", "1", "yes", "Yes"]) {
      process.env.SLO_TRACKER_ENABLED = v;
      assert.equal(isSloTrackerEnabled(), true, `expected true for ${v}`);
    }
    for (const v of ["false", "0", "no", ""]) {
      process.env.SLO_TRACKER_ENABLED = v;
      assert.equal(isSloTrackerEnabled(), false, `expected false for ${v}`);
    }
    delete process.env.SLO_TRACKER_ENABLED;
  });

  it("recordBudgetMetric returns gated:true and does NOT write when disabled", () => {
    __resetForTests();
    process.env.SLO_TRACKER_ENABLED = "false";
    const r = recordBudgetMetric({ slo_id: "SLO-001", target_ratio: 0.999 });
    assert.equal(r.accepted, false);
    assert.equal(r.gated, true);
    assert.equal(getMetric(METRIC_TARGET_RATIO)!.samples.length, 0);
    process.env.SLO_TRACKER_ENABLED = "true";
  });
});

describe("budgetMetrics: Prometheus exposition format", () => {
  it("emits HELP and TYPE headers for each metric", () => {
    __resetForTests();
    recordBudgetMetric({ slo_id: "SLO-001", target_ratio: 0.999 });
    const text = renderPrometheusExposition();
    assert.match(text, /# HELP omniroute_slo_target_ratio/);
    assert.match(text, /# TYPE omniroute_slo_target_ratio gauge/);
    assert.match(text, /omniroute_slo_target_ratio\{slo_id="SLO-001"\} 0\.999/);
  });

  it("renders the alerts counter with TYPE counter", () => {
    __resetForTests();
    recordBudgetMetric({
      slo_id: "SLO-001",
      increment_alert: true,
      alert_severity: "page",
    });
    const text = renderPrometheusExposition();
    assert.match(text, /# TYPE omniroute_slo_alerts_fired_total counter/);
    // Prometheus sorts label keys alphabetically in the exposition format,
    // so the actual order is severity,slo_id.
    assert.match(
      text,
      /omniroute_slo_alerts_fired_total\{severity="page",slo_id="SLO-001"\} 1/
    );
  });

  it("includes the cardinality-dropped counter when samples are dropped", () => {
    __resetForTests();
    // Force at least one drop.
    for (let i = 0; i < 200; i += 1) {
      recordBudgetMetric({
        slo_id: `SLO-${String(i).padStart(3, "0")}`,
        remaining_by_window: { "1h": 0.5, "6h": 0.5, "24h": 0.5, "7d": 0.5, "30d": 0.5 },
        burn_rate_by_window: { "1h": 1.0, "6h": 1.0, "24h": 1.0, "7d": 1.0, "30d": 1.0 },
      });
    }
    const text = renderPrometheusExposition();
    assert.match(text, /# HELP omniroute_slo_cardinality_dropped_total/);
  });
});

describe("budgetMetrics: label binding", () => {
  it("binds the slo_id label deterministically (sorted by name)", () => {
    __resetForTests();
    recordBudgetMetric({ slo_id: "SLO-005", target_ratio: 0.99 });
    const family = getMetric(METRIC_TARGET_RATIO);
    assert.equal(family!.samples.length, 1);
    // slo_id is the only label — value preserved exactly.
    const sloLabel = family!.samples[0].labels.find((l) => l.name === "slo_id");
    assert.equal(sloLabel?.value, "SLO-005");
  });

  it("binds (slo_id, window) labels for the remaining gauge", () => {
    __resetForTests();
    recordBudgetMetric({
      slo_id: "SLO-001",
      remaining_by_window: { "7d": 0.7 },
    });
    const family = getMetric(METRIC_BUDGET_REMAINING);
    const sample = family!.samples.find((s) =>
      s.labels.some((l) => l.name === "window" && l.value === "7d")
    );
    assert.ok(sample, "expected a sample for window=7d");
    assert.equal(sample!.value, 0.7);
    const sloLabel = sample!.labels.find((l) => l.name === "slo_id");
    const windowLabel = sample!.labels.find((l) => l.name === "window");
    assert.equal(sloLabel?.value, "SLO-001");
    assert.equal(windowLabel?.value, "7d");
  });

  it("overwrites the gauge value for repeat writes with the same labels", () => {
    __resetForTests();
    recordBudgetMetric({ slo_id: "SLO-001", target_ratio: 0.999 });
    recordBudgetMetric({ slo_id: "SLO-001", target_ratio: 0.995 });
    const family = getMetric(METRIC_TARGET_RATIO);
    const matching = family!.samples.filter((s) =>
      s.labels.some((l) => l.name === "slo_id" && l.value === "SLO-001")
    );
    assert.equal(matching.length, 1, "should have exactly one sample for SLO-001");
    assert.equal(matching[0].value, 0.995);
  });
});
