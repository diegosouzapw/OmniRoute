// #10095 — Antigravity multi-account "all exhausted" false positive.
//
// src/domain/quotaCache.ts is the FIRST, unconditional gate every chat request
// passes through (src/sse/services/auth.ts::getProviderCredentialsWithQuotaPreflight).
// When Google's Cloud Code API doesn't report `remainingFraction` for a model
// (fresh accounts, newly-launched -tiered model ids), open-sse/services/usage/
// antigravity.ts writes `fractionReported:false` but defaults
// `remainingPercentage` to 0 — quotaCache.ts previously read only the numeric
// percentage and treated that as genuine 0%-remaining exhaustion, so every
// freshly-connected Antigravity account looked simultaneously (and falsely)
// dead, and getProviderCredentials returned "All antigravity accounts have
// exhausted their quota" before ever trying one.
import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";

describe("#10095 — quotaCache respects Antigravity fractionReported:false", () => {
  before(async () => {
    const { __clearForTests } = await import("../../../src/domain/quotaCache.ts");
    __clearForTests();
  });
  after(async () => {
    const { __clearForTests } = await import("../../../src/domain/quotaCache.ts");
    __clearForTests();
  });

  test("unreported quota window (fractionReported:false) is NOT treated as exhausted", async () => {
    const { setQuotaCache, isQuotaExhaustedForRequest } = await import(
      "../../../src/domain/quotaCache.ts"
    );
    const connectionId = "10095-fresh-account";
    // Exact shape open-sse/services/usage/antigravity.ts:660-694 writes when
    // Google's API omits remainingFraction for this model.
    setQuotaCache(connectionId, "antigravity", {
      "gemini-3.7-flash-tiered": {
        used: 0,
        total: 1000,
        resetAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        remainingPercentage: 0,
        unlimited: false,
        fractionReported: false,
        quotaSource: "fetchAvailableModels",
      },
    });
    const exhausted = isQuotaExhaustedForRequest(
      connectionId,
      "antigravity",
      "agy/gemini-3.7-flash-tiered"
    );
    assert.equal(exhausted, false, "must NOT treat an unreported quota window as exhausted");
  });

  test("companion: a REAL 0% window (fractionReported:true) still reports exhausted", async () => {
    const { setQuotaCache, isQuotaExhaustedForRequest } = await import(
      "../../../src/domain/quotaCache.ts"
    );
    const connectionId = "10095-genuinely-exhausted-account";
    setQuotaCache(connectionId, "antigravity", {
      "gemini-3.7-flash-tiered": {
        used: 1000,
        total: 1000,
        resetAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        remainingPercentage: 0,
        unlimited: false,
        fractionReported: true,
        quotaSource: "retrieveUserQuota",
      },
    });
    const exhausted = isQuotaExhaustedForRequest(
      connectionId,
      "antigravity",
      "agy/gemini-3.7-flash-tiered"
    );
    assert.equal(
      exhausted,
      true,
      "the fix must not blanket-disable exhaustion detection — a genuinely reported 0% window still exhausts"
    );
  });

  test("issue follow-up model id shape (agy/gemini-3.7-flash-tiered) still resolves its family", async () => {
    const { setQuotaCache, isQuotaExhaustedForRequest } = await import(
      "../../../src/domain/quotaCache.ts"
    );
    const connectionId = "10095-agy-tiered-family";
    setQuotaCache(connectionId, "agy", {
      "agy/gemini-3.7-flash-tiered": {
        used: 500,
        total: 1000,
        resetAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        remainingPercentage: 50,
        unlimited: false,
        fractionReported: true,
        quotaSource: "retrieveUserQuota",
      },
    });
    const exhausted = isQuotaExhaustedForRequest(
      connectionId,
      "agy",
      "agy/gemini-3.7-flash-tiered"
    );
    assert.equal(
      exhausted,
      false,
      "non-regression: family resolution for the agy/gemini-3.7-flash-tiered id must keep working"
    );
  });
});
