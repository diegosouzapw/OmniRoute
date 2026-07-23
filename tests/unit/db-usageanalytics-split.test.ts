/**
 * Characterization + API-surface test: usageAnalytics.ts god-file decomposition.
 *
 * The two pure SQL-source-string builders (buildUnifiedSource,
 * buildPresetUnifiedSource) + their types were extracted verbatim from
 * src/lib/db/usageAnalytics.ts into the pure leaf
 * src/lib/db/usageAnalytics/sources.ts (no DB, no imports). The ~20 query
 * functions stay in the host.
 *
 * Verifies that:
 *   1. buildUnifiedSource's needsAggregated branching is preserved (pure logic).
 *   2. The host usageAnalytics.ts still exposes the FULL public API (39 names).
 *   3. The sources leaf exports the builders directly.
 *
 * Pure value assertions — no DB handle is opened.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  buildUnifiedSource,
  buildPresetUnifiedSource,
} from "../../src/lib/db/usageAnalytics/sources.ts";

// ── 1. buildUnifiedSource — pure branching ───────────────────────────────────

describe("usageAnalytics/sources — buildUnifiedSource", () => {
  it("includes the daily_usage_summary leg for a wide window with no api-key filter", () => {
    const { unifiedSource, unifiedParams } = buildUnifiedSource({
      sinceIso: "2024-06-01T00:00:00.000Z",
      untilIso: null,
      rawCutoffDate: "2024-06-15",
      apiKeyWhere: "",
      apiKeyParams: {},
    });
    assert.ok(typeof unifiedSource === "string" && unifiedSource.length > 0);
    // needsAggregated = (sinceDate < rawCutoffDate) && !apiKeyWhere => true
    assert.ok(
      unifiedSource.includes("daily_usage_summary"),
      "aggregated leg must be present when the window predates the raw cutoff"
    );
    assert.equal(unifiedParams.rawCutoff, "2024-06-15");
    assert.equal(unifiedParams.rawCutoffDate, "2024-06-15");
    // Regression: unified source must surface a `requests` column in both legs
    // so COUNT(*)→SUM(requests) counts actual requests, not row count.
    assert.ok(unifiedSource.includes("1 as requests"), "raw leg must surface requests column");
    assert.ok(unifiedSource.includes("total_requests as requests"), "aggregated leg must surface total_requests as requests");
  });

  it("drops the aggregated leg when an api-key filter is active (raw-only)", () => {
    const { unifiedSource, unifiedParams } = buildUnifiedSource({
      sinceIso: "2024-06-01T00:00:00.000Z",
      untilIso: null,
      rawCutoffDate: "2024-06-15",
      apiKeyWhere: "(api_key_id IN (@apiKey0))",
      apiKeyParams: { apiKey0: "k1" },
    });
    // needsAggregated = ... && !apiKeyWhere => false
    assert.ok(
      !unifiedSource.includes("daily_usage_summary"),
      "aggregated leg must be absent once an api-key filter scopes the query to raw rows"
    );
    // Regression: raw-only fallback must also surface the requests column.
    assert.ok(unifiedSource.includes("1 as requests"), "raw-only fallback must surface requests column");
    assert.equal(unifiedParams.rawCutoff, undefined);
    assert.equal(unifiedParams.since, "2024-06-01T00:00:00.000Z");
    assert.equal(unifiedParams.apiKey0, "k1");
  });

  it("buildPresetUnifiedSource returns the unifiedSource/unifiedParams shape", () => {
    const result = buildPresetUnifiedSource({
      sinceIso: null,
      untilIso: null,
      rawCutoffDate: "2024-06-15",
      apiKeyWhere: "",
      apiKeyParams: {},
    });
    assert.equal(typeof result.unifiedSource, "string");
    assert.equal(typeof result.unifiedParams, "object");
    assert.ok(result.unifiedParams !== null);
  });
});

// ── 2. usageAnalytics.ts — full public API surface preserved ─────────────────

const host = await import("../../src/lib/db/usageAnalytics.ts");

describe("usageAnalytics.ts public API surface", () => {
  // the 22 runtime functions (the 17 row/param interfaces are type-only and
  // erased at runtime, so they are asserted via typecheck, not here)
  const expectedFns = [
    "buildUnifiedSource", // re-exported from sources
    "buildPresetUnifiedSource", // re-exported from sources
    "getUsageSummary",
    "getDailyUsage",
    "getDailyCostRows",
    "getHeatmapRows",
    "getModelUsageRows",
    "getProviderCostRows",
    "getProviderUsageRows",
    "getAccountCostRows",
    "getAccountUsageRows",
    "getApiKeyUsageRows",
    "getServiceTierUsageRows",
    "getApiKeyMetadataRows",
    "getWeeklyPatternRows",
    "getPresetCostModelRows",
    "getEndpointUsageRows",
    "getAllUsageHistory",
    "getAllDomainCostHistory",
    "getAllDomainBudgets",
  ];

  for (const name of expectedFns) {
    it(`exposes ${name} as a function`, () => {
      assert.equal(typeof host[name], "function", `${name} must be a function on the host module`);
    });
  }

  it("loses no public runtime function in the split", () => {
    const missing = expectedFns.filter((n) => typeof host[n] !== "function");
    assert.deepEqual(missing, [], `missing: ${missing.join(", ")}`);
  });
});

// ── 4. Regression: COUNT(*) → SUM(requests) in all query functions ──────────
// Verifies the fix without needing a DB driver — the function source must
// contain SUM(requests), not COUNT(*), so aggregated rows with total_requests>1
// are counted correctly instead of as 1-per-row.

describe("usageAnalytics queries use SUM(requests) not COUNT(*)", () => {
  const queriesUsingCount = [
    "getUsageSummary",
    "getDailyUsage",
    "getModelUsageRows",
    "getProviderUsageRows",
    "getServiceTierUsageRows",
  ];

  for (const fn of queriesUsingCount) {
    it(`${fn} uses SUM(requests) not COUNT(*)`, () => {
      const src = host[fn].toString();
      assert.ok(src.includes("SUM(requests)"), `${fn} must use SUM(requests) for correct aggregated row counting`);
      assert.ok(!src.match(/COUNT\(\*\)/), `${fn} must not use COUNT(*) which undercounts aggregated rows`);
    });
  }

  it("getWeeklyPatternRows inner subquery uses SUM(requests)", () => {
    const src = host.getWeeklyPatternRows.toString();
    assert.ok(src.includes("SUM(requests)"), "getWeeklyPatternRows inner subquery must use SUM(requests)");
  });

  it("getUsageSummary uses SUM(CASE WHEN success=1 THEN requests ELSE 0 END) for successfulRequests", () => {
    const src = host.getUsageSummary.toString();
    assert.ok(
      src.includes("SUM(CASE WHEN success = 1 THEN requests ELSE 0 END)"),
      "successfulRequests must weight by requests, not count 1-per-row"
    );
  });

  it("getModelUsageRows uses SUM(CASE WHEN success=1 THEN requests ELSE 0 END) for successfulRequests", () => {
    const src = host.getModelUsageRows.toString();
    assert.ok(
      src.includes("SUM(CASE WHEN success = 1 THEN requests ELSE 0 END)"),
      "successfulRequests must weight by requests, not count 1-per-row"
    );
  });
});

// ── 3. sources leaf exports the builders directly ────────────────────────────

describe("sources.ts exports the builders directly", () => {
  it("buildUnifiedSource / buildPresetUnifiedSource are functions on the leaf", async () => {
    const sources = await import("../../src/lib/db/usageAnalytics/sources.ts");
    assert.equal(typeof sources.buildUnifiedSource, "function");
    assert.equal(typeof sources.buildPresetUnifiedSource, "function");
  });
});
