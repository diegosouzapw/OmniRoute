/**
 * TDD for PR-012 — `src/lib/sre/errorBudget.ts`.
 *
 * Covers:
 *   - constructor validation (slo_id, target, totalRequests, errorCount)
 *   - allowed_errors, remaining, exhausted, burn_rate math
 *   - time_to_exhaustion (null / Infinity / finite)
 *   - sliding-window burn rate over 1h / 6h / 24h / 7d / 30d
 *   - evaluateBurnAlerts thresholds (page / ticket / warn)
 *   - highestSeverity reduction
 *
 * 30 assertions across 8 describe blocks.
 *
 * Run from the repo root:
 *   node --import tsx --test tests/unit/sre/errorBudget.test.ts
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_BURN_THRESHOLDS,
  ErrorBudget,
  evaluateBurnAlerts,
  highestSeverity,
  windowMs,
  type SlidingSegment,
} from "../../../src/lib/sre/errorBudget.ts";

const SLO = {
  slo_id: "SLO-001",
  objective: "API availability",
  target: 0.999,
  window: "30d" as const,
};

// 30 days × 24h × 60min × 0.001 = 43.2 minutes of allowed bad-time per 1k requests.
// Tests use 100k requests so the allowed_errors budget = 100.
const ONE_HOUR_MS = 60 * 60 * 1000;
const T0 = 1_700_000_000_000;
const CLOCK = () => T0;

function segments(
  errorRate: number,
  startMs: number,
  count: number,
  segmentMs = 5 * 60 * 1000
): SlidingSegment[] {
  return Array.from({ length: count }, (_, i) => {
    const s = startMs + i * segmentMs;
    return {
      start_ms: s,
      end_ms: s + segmentMs,
      request_count: 1000,
      error_count: Math.round(1000 * errorRate),
    };
  });
}

describe("errorBudget: validation", () => {
  it("requires a non-empty slo_id", () => {
    assert.throws(
      () =>
        ErrorBudget({
          slo: { slo_id: "", objective: "x", target: 0.99, window: "30d" },
          totalRequests: 100,
          errorCount: 1,
        }),
      /slo_id is required/
    );
  });

  it("requires a target in (0, 1]", () => {
    assert.throws(
      () =>
        ErrorBudget({
          slo: { slo_id: "x", objective: "x", target: 0, window: "30d" },
          totalRequests: 100,
          errorCount: 1,
        }),
      /target must be a finite number in \(0, 1\]/
    );
    assert.throws(
      () =>
        ErrorBudget({
          slo: { slo_id: "x", objective: "x", target: 1.5, window: "30d" },
          totalRequests: 100,
          errorCount: 1,
        }),
      /target must be a finite number in \(0, 1\]/
    );
  });

  it("requires non-negative totalRequests and errorCount", () => {
    assert.throws(
      () =>
        ErrorBudget({
          slo: { slo_id: "x", objective: "x", target: 0.99, window: "30d" },
          totalRequests: -1,
          errorCount: 0,
        }),
      /totalRequests must be a finite non-negative number/
    );
    assert.throws(
      () =>
        ErrorBudget({
          slo: { slo_id: "x", objective: "x", target: 0.99, window: "30d" },
          totalRequests: 100,
          errorCount: -1,
        }),
      /errorCount must be a finite non-negative number/
    );
  });

  it("rejects errorCount > totalRequests", () => {
    assert.throws(
      () =>
        ErrorBudget({
          slo: { slo_id: "x", objective: "x", target: 0.99, window: "30d" },
          totalRequests: 100,
          errorCount: 200,
        }),
      /errorCount .* cannot exceed totalRequests/
    );
  });
});

describe("errorBudget: budget math", () => {
  it("computes allowed_errors as totalRequests × (1 - target)", () => {
    const r = ErrorBudget({
      slo: SLO,
      totalRequests: 100_000,
      errorCount: 50,
      now: CLOCK,
    });
    // 0.001 × 100000 = 100
    assert.equal(r.allowed_errors, 100);
    assert.equal(r.remaining, 50);
    assert.equal(r.exhausted, false);
    assert.equal(r.burn_rate, 0.5);
  });

  it("flips to exhausted when errorCount >= allowed_errors", () => {
    const r = ErrorBudget({
      slo: SLO,
      totalRequests: 100_000,
      errorCount: 200,
      now: CLOCK,
    });
    assert.equal(r.exhausted, true);
    assert.equal(r.remaining, 0);
    assert.equal(r.remaining_ratio, 0);
    assert.equal(r.time_to_exhaustion_minutes, null);
  });

  it("returns Infinity when there are no errors", () => {
    const r = ErrorBudget({
      slo: SLO,
      totalRequests: 100_000,
      errorCount: 0,
      now: CLOCK,
    });
    assert.equal(r.time_to_exhaustion_minutes, Infinity);
    assert.equal(r.burn_rate, 0);
  });

  it("computes finite time_to_exhaustion when actively burning", () => {
    // 100k requests × 0.001 = 100 allowed; burning 50/min over a 30d window.
    const r = ErrorBudget({
      slo: SLO,
      totalRequests: 100_000,
      errorCount: 50,
      now: CLOCK,
    });
    // burn_rate = 0.5; 30d = 43200 minutes; burn/min = 0.5 × 100/43200
    // remaining = 50; minutes left ≈ 50 / (0.5 × 100/43200) = 43200.
    assert.ok(
      typeof r.time_to_exhaustion_minutes === "number" &&
        Number.isFinite(r.time_to_exhaustion_minutes)
    );
    assert.ok(r.time_to_exhaustion_minutes! > 0);
  });

  it("honours the optional windowDays override", () => {
    const r = ErrorBudget({
      slo: { ...SLO, window: "30d" },
      windowDays: 7,
      totalRequests: 100_000,
      errorCount: 0,
      now: CLOCK,
    });
    assert.equal(r.window_days, 7);
    assert.equal(r.window_ms, 7 * 24 * 60 * 60 * 1000);
  });

  it("clamps remaining_ratio into [0, 1]", () => {
    const r = ErrorBudget({
      slo: SLO,
      totalRequests: 100,
      errorCount: 50,
      now: CLOCK,
    });
    assert.ok(r.remaining_ratio >= 0 && r.remaining_ratio <= 1);
  });
});

describe("errorBudget: sliding-window burn rate", () => {
  it("returns 0 for an empty sample set", () => {
    const r = ErrorBudget({
      slo: SLO,
      totalRequests: 100_000,
      errorCount: 100,
      slidingSamples: [],
      now: CLOCK,
    });
    for (const w of ["1h", "6h", "24h", "7d", "30d"] as const) {
      assert.equal(r.burn_rates_by_window[w], 0);
    }
  });

  it("computes 1h burn rate from a single hourly segment", () => {
    const samples = segments(0.01, T0 - 30 * 60 * 1000, 1);
    const r = ErrorBudget({
      slo: SLO,
      totalRequests: 100_000,
      errorCount: 100,
      slidingSamples: samples,
      now: CLOCK,
    });
    // 1% / 0.1% = 10×
    assert.equal(r.burn_rates_by_window["1h"], 10);
  });

  it("computes 6h burn rate from six hourly segments", () => {
    const samples = segments(0.005, T0 - 6 * ONE_HOUR_MS, 6, ONE_HOUR_MS);
    const r = ErrorBudget({
      slo: SLO,
      totalRequests: 100_000,
      errorCount: 50,
      slidingSamples: samples,
      now: CLOCK,
    });
    // 0.5% / 0.1% = 5×
    assert.equal(r.burn_rates_by_window["6h"], 5);
  });

  it("computes 24h burn rate", () => {
    const samples = segments(0.002, T0 - 24 * ONE_HOUR_MS, 24, ONE_HOUR_MS);
    const r = ErrorBudget({
      slo: SLO,
      totalRequests: 100_000,
      errorCount: 20,
      slidingSamples: samples,
      now: CLOCK,
    });
    // 0.2% / 0.1% = 2×
    assert.equal(r.burn_rates_by_window["24h"], 2);
  });

  it("computes 7d burn rate", () => {
    const samples = segments(0.001, T0 - 7 * 24 * ONE_HOUR_MS, 7 * 24, ONE_HOUR_MS);
    const r = ErrorBudget({
      slo: SLO,
      totalRequests: 100_000,
      errorCount: 10,
      slidingSamples: samples,
      now: CLOCK,
    });
    // 0.1% / 0.1% = 1×
    assert.equal(r.burn_rates_by_window["7d"], 1);
  });

  it("computes 30d burn rate", () => {
    // Use error rate 0.001 (0.1%) so Math.round(1000 * 0.001) = 1, not 0.
    // 1 error per 1000 requests = 0.1% rate = exactly the SLO target.
    const samples = segments(0.001, T0 - 30 * 24 * ONE_HOUR_MS, 30 * 24, ONE_HOUR_MS);
    const r = ErrorBudget({
      slo: SLO,
      totalRequests: 100_000,
      errorCount: 100,
      slidingSamples: samples,
      now: CLOCK,
    });
    // 0.1% / 0.1% = 1×
    assert.equal(r.burn_rates_by_window["30d"], 1);
  });

  it("returns 0 for windows whose samples fall entirely outside the window", () => {
    // Segment from T0 - 3h to T0 - 2h — entirely outside the 1h window
    // (which ends at T0), but inside the 6h window. 10 errors / 1000
    // requests = 1% rate = 10× burn relative to the 0.1% target.
    const samples: SlidingSegment[] = [
      { start_ms: T0 - 3 * ONE_HOUR_MS, end_ms: T0 - 2 * ONE_HOUR_MS, request_count: 1000, error_count: 10 },
    ];
    const r = ErrorBudget({
      slo: SLO,
      totalRequests: 100_000,
      errorCount: 100,
      slidingSamples: samples,
      now: CLOCK,
    });
    // 1h window (T0 - 1h ... T0) — no overlap → 0 burn.
    assert.equal(r.burn_rates_by_window["1h"], 0);
    // 6h window (T0 - 6h ... T0) — segment fully overlaps → 10× burn.
    assert.equal(r.burn_rates_by_window["6h"], 10);
  });
});

describe("errorBudget: windowMs helper", () => {
  it("returns correct ms for each window size", () => {
    assert.equal(windowMs("1h"), 60 * 60 * 1000);
    assert.equal(windowMs("6h"), 6 * 60 * 60 * 1000);
    assert.equal(windowMs("24h"), 24 * 60 * 60 * 1000);
    assert.equal(windowMs("7d"), 7 * 24 * 60 * 60 * 1000);
    assert.equal(windowMs("30d"), 30 * 24 * 60 * 60 * 1000);
  });
});

describe("errorBudget: evaluateBurnAlerts", () => {
  function highBurnSamples(): SlidingSegment[] {
    // 1% error rate in the trailing 1h → 10× burn (over the 14.4× page
    // threshold? No — 10× < 14.4×, so only "warn" should fire on 1h).
    // For a "page" we need 1% error rate which is 10×. We need > 1.44%
    // error rate to cross 14.4×. Use 2% to cross it.
    return segments(0.02, T0 - ONE_HOUR_MS, 1, ONE_HOUR_MS);
  }

  it("returns an empty array when burn rate is below all thresholds", () => {
    const samples = segments(0.0001, T0 - ONE_HOUR_MS, 1, ONE_HOUR_MS); // 1× burn
    const r = ErrorBudget({
      slo: SLO,
      totalRequests: 100_000,
      errorCount: 1,
      slidingSamples: samples,
      now: CLOCK,
    });
    assert.deepEqual(evaluateBurnAlerts(r), []);
  });

  it("fires the page alert when 1h burn > 14.4×", () => {
    const samples = highBurnSamples();
    const r = ErrorBudget({
      slo: SLO,
      totalRequests: 100_000,
      errorCount: 200,
      slidingSamples: samples,
      now: CLOCK,
    });
    const alerts = evaluateBurnAlerts(r);
    const page = alerts.find((a) => a.severity === "page");
    assert.ok(page, "expected a page alert");
    assert.equal(page!.window, "1h");
    assert.ok(page!.burn_rate > DEFAULT_BURN_THRESHOLDS.page_1h_burn);
    assert.match(page!.message, /PAGE/);
  });

  it("fires the ticket alert when 6h burn > 6×", () => {
    // 1% error over 6h → 10× burn, > 6× threshold.
    const samples = segments(0.01, T0 - 6 * ONE_HOUR_MS, 6, ONE_HOUR_MS);
    const r = ErrorBudget({
      slo: SLO,
      totalRequests: 100_000,
      errorCount: 60,
      slidingSamples: samples,
      now: CLOCK,
    });
    const alerts = evaluateBurnAlerts(r);
    const ticket = alerts.find((a) => a.severity === "ticket");
    assert.ok(ticket, "expected a ticket alert");
    assert.equal(ticket!.window, "6h");
    assert.ok(ticket!.burn_rate > DEFAULT_BURN_THRESHOLDS.ticket_6h_burn);
  });

  it("fires the warn alert when 1h burn is > 1× but ≤ 14.4×", () => {
    // 1% error rate → 10× burn in 1h, between warn and page thresholds.
    const samples = segments(0.01, T0 - ONE_HOUR_MS, 1, ONE_HOUR_MS);
    const r = ErrorBudget({
      slo: SLO,
      totalRequests: 100_000,
      errorCount: 100,
      slidingSamples: samples,
      now: CLOCK,
    });
    const alerts = evaluateBurnAlerts(r);
    const warn = alerts.find((a) => a.severity === "warn");
    assert.ok(warn, "expected a warn alert");
    assert.equal(warn!.window, "1h");
  });

  it("does NOT fire warn when a page is already firing on the same window", () => {
    // 2% error rate in 1h → 20× burn, above page threshold; warn should
    // be suppressed so we don't double-alert on the same incident.
    const samples = segments(0.02, T0 - ONE_HOUR_MS, 1, ONE_HOUR_MS);
    const r = ErrorBudget({
      slo: SLO,
      totalRequests: 100_000,
      errorCount: 200,
      slidingSamples: samples,
      now: CLOCK,
    });
    const alerts = evaluateBurnAlerts(r);
    assert.ok(alerts.some((a) => a.severity === "page"));
    assert.ok(!alerts.some((a) => a.severity === "warn"));
  });

  it("can fire both page (1h) and ticket (6h) simultaneously on a real outage", () => {
    const oneHour = segments(0.02, T0 - ONE_HOUR_MS, 1, ONE_HOUR_MS);
    const sixHour = segments(0.01, T0 - 6 * ONE_HOUR_MS, 6, ONE_HOUR_MS);
    const r = ErrorBudget({
      slo: SLO,
      totalRequests: 100_000,
      errorCount: 200,
      slidingSamples: [...sixHour, ...oneHour],
      now: CLOCK,
    });
    const alerts = evaluateBurnAlerts(r);
    assert.ok(alerts.some((a) => a.severity === "page"));
    assert.ok(alerts.some((a) => a.severity === "ticket"));
  });
});

describe("errorBudget: highestSeverity", () => {
  it("returns null for an empty list", () => {
    assert.equal(highestSeverity([]), null);
  });

  it("returns page when any alert is page", () => {
    assert.equal(
      highestSeverity([
        { slo_id: "x", window: "1h", severity: "warn", burn_rate: 1, threshold: 1, message: "", evaluated_at: 0 },
      ]),
      "warn"
    );
    assert.equal(
      highestSeverity([
        { slo_id: "x", window: "1h", severity: "warn", burn_rate: 1, threshold: 1, message: "", evaluated_at: 0 },
        { slo_id: "x", window: "1h", severity: "ticket", burn_rate: 1, threshold: 1, message: "", evaluated_at: 0 },
      ]),
      "ticket"
    );
    assert.equal(
      highestSeverity([
        { slo_id: "x", window: "1h", severity: "warn", burn_rate: 1, threshold: 1, message: "", evaluated_at: 0 },
        { slo_id: "x", window: "1h", severity: "ticket", burn_rate: 1, threshold: 1, message: "", evaluated_at: 0 },
        { slo_id: "x", window: "1h", severity: "page", burn_rate: 1, threshold: 1, message: "", evaluated_at: 0 },
      ]),
      "page"
    );
  });
});
