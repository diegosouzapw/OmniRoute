import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { filterQuotaBurnMetrics, updateQuotaBurnMetrics } from "@/domain/quotaBurnMetrics";

const HOUR = 60 * 60 * 1000;
const NOW = Date.UTC(2026, 9, 10, 12, 0);

describe("quota burn metrics", () => {
  it("starts a fresh baseline when the quota reset changes", () => {
    const firstReset = new Date(NOW + 2 * HOUR).toISOString();
    const nextReset = new Date(NOW + 7 * HOUR).toISOString();
    const previous = updateQuotaBurnMetrics(
      null,
      null,
      null,
      { session: { remainingPercentage: 30, resetAt: firstReset } },
      NOW
    );
    const next = updateQuotaBurnMetrics(
      { session: { remainingPercentage: 30, resetAt: firstReset } },
      NOW,
      previous,
      { session: { remainingPercentage: 100, resetAt: nextReset } },
      NOW + HOUR
    );

    assert.equal(next.rates.session, undefined);
    assert.equal(next.observations.session.remainingPercentage, 100);
  });

  it("does not infer burn when a quota fraction was not reported", () => {
    const resetAt = new Date(NOW + HOUR).toISOString();
    const metrics = updateQuotaBurnMetrics(
      { session: { remainingPercentage: 80, resetAt } },
      NOW - HOUR,
      null,
      { session: { remainingPercentage: 0, resetAt, fractionReported: false } },
      NOW
    );

    assert.deepEqual(metrics, { observations: {}, rates: {} });
  });

  it("filters burn estimates to the selected windows", () => {
    const metrics = {
      observations: {
        session: { remainingPercentage: 50, resetAt: "2026-10-10T13:00:00Z", observedAt: NOW },
        weekly: { remainingPercentage: 90, resetAt: "2026-10-17T12:00:00Z", observedAt: NOW },
      },
      rates: {
        session: { fractionPerHour: 0.1, resetAt: "2026-10-10T13:00:00Z", observedAt: NOW },
        weekly: { fractionPerHour: 0.01, resetAt: "2026-10-17T12:00:00Z", observedAt: NOW },
      },
    };

    assert.deepEqual(filterQuotaBurnMetrics(metrics, ["session"]), {
      observations: { session: metrics.observations.session },
      rates: { session: metrics.rates.session },
    });
  });

  it("smooths burn estimates for repeated observations in the same window", () => {
    const resetAt = new Date(NOW + 5 * HOUR).toISOString();
    const first = updateQuotaBurnMetrics(
      null,
      null,
      null,
      { session: { remainingPercentage: 90, resetAt } },
      NOW
    );
    const second = updateQuotaBurnMetrics(
      { session: { remainingPercentage: 90, resetAt } },
      NOW,
      first,
      { session: { remainingPercentage: 80, resetAt } },
      NOW + HOUR
    );
    const third = updateQuotaBurnMetrics(
      { session: { remainingPercentage: 80, resetAt } },
      NOW + HOUR,
      second,
      { session: { remainingPercentage: 60, resetAt } },
      NOW + 2 * HOUR
    );

    assert.ok(Math.abs(second.rates.session.fractionPerHour - 0.1) < 1e-9);
    assert.ok(Math.abs(third.rates.session.fractionPerHour - 0.15) < 1e-9);
  });
});
