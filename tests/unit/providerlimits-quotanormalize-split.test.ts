/**
 * Characterization + API-surface test: providerLimits.ts god-file decomposition.
 *
 * The pure quota-key/quota-value normalization helpers (+ the isRecord type
 * guard they share) were extracted verbatim from src/lib/usage/providerLimits.ts
 * into the self-contained leaf src/lib/usage/providerLimits/quotaNormalize.ts
 * (no DB, no network — the leaf does NOT import the host, so no cycle). The sync
 * orchestration / DB / network code stays in the host.
 *
 * Verifies that:
 *   1. isRecord + isUsageQuotaKeyAllowed behave correctly (DB-free).
 *   2. The host providerLimits.ts still exposes the FULL public API.
 *   3. The quotaNormalize leaf exports its helpers directly.
 *
 * Deeper quota-sanitization behaviour is covered by the existing
 * provider-limits-sanitize-scope-3821 / db-provider-limits suites; this test
 * pins the extraction boundary + the simplest pure branches.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  isRecord,
  isUsageQuotaKeyAllowed,
  normalizeUsageQuotasForProvider,
  sanitizeUsageQuotasForProvider,
} from "../../src/lib/usage/providerLimits/quotaNormalize.ts";

describe("providerLimits/quotaNormalize — isRecord", () => {
  it("is true only for plain non-null, non-array objects", () => {
    assert.equal(isRecord({ a: 1 }), true);
    assert.equal(isRecord({}), true);
    assert.equal(isRecord(null), false);
    assert.equal(isRecord([1, 2]), false);
    assert.equal(isRecord("x"), false);
    assert.equal(isRecord(5), false);
  });
});

describe("providerLimits/quotaNormalize — isUsageQuotaKeyAllowed", () => {
  it("always allows the generic 'credits' and 'models' keys", () => {
    assert.equal(isUsageQuotaKeyAllowed("openai", "credits"), true);
    assert.equal(isUsageQuotaKeyAllowed("anthropic", "models"), true);
    assert.equal(isUsageQuotaKeyAllowed("antigravity", "credits"), true);
  });
});

describe("providerLimits/quotaNormalize — sanitize/normalize are callable & pure-shaped", () => {
  it("sanitizeUsageQuotasForProvider returns a record (no throw on a plain usage object)", () => {
    const usage = { quotas: { credits: { used: 1, limit: 10 } } };
    const out = sanitizeUsageQuotasForProvider("openai", usage);
    assert.equal(isRecord(out), true);
  });
  it("normalizeUsageQuotasForProvider is exported and callable", () => {
    assert.equal(typeof normalizeUsageQuotasForProvider, "function");
  });
});

// ── host public API surface ──────────────────────────────────────────────────

const host = await import("../../src/lib/usage/providerLimits.ts");

describe("providerLimits.ts public API surface (13 functions)", () => {
  const expected = [
    "fetchAndPersistProviderLimits",
    "fetchLiveProviderLimits",
    "getCachedProviderLimitsMap",
    "getLastProviderLimitsAutoSyncTime",
    "getProviderLimitsSyncIntervalMinutes",
    "getProviderLimitsSyncIntervalMs",
    "getProviderLimitsSyncSpacingMs",
    "getSanitizedCachedProviderLimitsMap",
    "notifyProviderUsageRecorded",
    "quotaPathShouldMarkExpired",
    "refreshAndUpdateCredentials",
    "shouldAttemptRotatingRefresh",
    "syncAllProviderLimits",
  ];
  for (const name of expected) {
    it(`exposes ${name} as a function`, () => {
      assert.equal(typeof host[name], "function", `${name} must be a function on the host`);
    });
  }
  it("loses no public function in the split", () => {
    const missing = expected.filter((n) => typeof host[n] !== "function");
    assert.deepEqual(missing, [], `missing: ${missing.join(", ")}`);
  });
});

describe("quotaNormalize.ts exports its helpers directly", () => {
  it("the moved helpers are functions on the leaf", async () => {
    const qn = await import("../../src/lib/usage/providerLimits/quotaNormalize.ts");
    for (const fn of [
      "isRecord",
      "isUsageQuotaKeyAllowed",
      "normalizeUsageQuotaKey",
      "normalizeUsageQuotasForProvider",
      "sanitizeUsageQuotasForProvider",
    ]) {
      assert.equal(typeof qn[fn], "function", fn);
    }
  });
});
