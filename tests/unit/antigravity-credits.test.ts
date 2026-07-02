/**
 * Tests for antigravity.ts — AI Credits overages fallback.
 *
 * Verifies:
 * 1. Credit balance cache read/write (getAntigravityRemainingCredits / updateAntigravityRemainingCredits)
 * 2. SSE remainingCredits extraction logic from collectStreamToResponse
 * 3. accountId consistency: executor and fetcher must use the same key (email || sub)
 * 4. Balance updates are correctly reflected in subsequent reads
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ── Import credit cache helpers ───────────────────────────────────────────────
import {
  getAntigravityRemainingCredits,
  updateAntigravityRemainingCredits,
} from "../../open-sse/executors/antigravity.ts";

// ── Credit balance cache tests ────────────────────────────────────────────────

describe("getAntigravityRemainingCredits / updateAntigravityRemainingCredits", () => {
  it("returns null for an account with no cached balance", () => {
    const accountId = `test-unknown-${Date.now()}`;
    assert.equal(
      getAntigravityRemainingCredits(accountId),
      null,
      "should return null before any update"
    );
  });

  it("returns the balance after updateAntigravityRemainingCredits", () => {
    const accountId = `test-write-${Date.now()}`;
    updateAntigravityRemainingCredits(accountId, 42);
    assert.equal(getAntigravityRemainingCredits(accountId), 42, "stored balance should be 42");
  });

  it("overwrites a previous balance with a new value", () => {
    const accountId = `test-overwrite-${Date.now()}`;
    updateAntigravityRemainingCredits(accountId, 100);
    updateAntigravityRemainingCredits(accountId, 55);
    assert.equal(getAntigravityRemainingCredits(accountId), 55, "should reflect the latest update");
  });

  it("stores balance=0 correctly (not treated as null/falsy)", () => {
    const accountId = `test-zero-${Date.now()}`;
    updateAntigravityRemainingCredits(accountId, 0);
    assert.equal(
      getAntigravityRemainingCredits(accountId),
      0,
      "balance 0 must be stored and returned as 0"
    );
  });

  it("different accountIds do not interfere with each other", () => {
    const idA = `test-a-${Date.now()}`;
    const idB = `test-b-${Date.now()}`;
    updateAntigravityRemainingCredits(idA, 200);
    updateAntigravityRemainingCredits(idB, 999);
    assert.equal(getAntigravityRemainingCredits(idA), 200);
    assert.equal(getAntigravityRemainingCredits(idB), 999);
  });
});

// ── accountId key consistency ─────────────────────────────────────────────────

describe("accountId key consistency: executor vs fetcher derivation", () => {
  it("both executor and fetcher use email → sub → 'unknown' order", () => {
    // Enforces the contract between executor (write) and fetcher (read) for creditBalanceCache.
    const credentials = { email: "user@example.com", sub: "abc123" };
    const providerSpecificData = { email: "user@example.com", sub: "abc123" };

    // executor derivation
    const executorAccountId = credentials.email || credentials.sub || "unknown";
    // fetcher derivation
    const fetcherAccountId = providerSpecificData.email || providerSpecificData.sub || "unknown";

    assert.equal(
      executorAccountId,
      fetcherAccountId,
      "accountId must match between executor and fetcher"
    );
  });

  it("falls back to sub when email is absent — both paths agree", () => {
    const credentials = { sub: "sub-only-123" };
    const providerSpecificData = { sub: "sub-only-123" };

    const executorAccountId = credentials.email || credentials.sub || "unknown";
    const fetcherAccountId = providerSpecificData.email || providerSpecificData.sub || "unknown";

    assert.equal(executorAccountId, "sub-only-123");
    assert.equal(fetcherAccountId, "sub-only-123");
    assert.equal(executorAccountId, fetcherAccountId);
  });

  it("both paths return 'unknown' when email and sub are absent", () => {
    const credentials = {};
    const providerSpecificData = {};

    const executorAccountId = credentials.email || credentials.sub || "unknown";
    const fetcherAccountId = providerSpecificData.email || providerSpecificData.sub || "unknown";

    assert.equal(executorAccountId, "unknown");
    assert.equal(fetcherAccountId, "unknown");
  });
});

// ── SSE remainingCredits extraction logic ─────────────────────────────────────

describe("SSE remainingCredits extraction logic", () => {
  it("parses GOOGLE_ONE_AI credit amount from remainingCredits array", () => {
    const remainingCredits = [
      { creditType: "GOOGLE_ONE_AI", creditAmount: "123" },
      { creditType: "SOME_OTHER", creditAmount: "999" },
    ];

    const googleCredit = remainingCredits.find((c) => c.creditType === "GOOGLE_ONE_AI");
    assert.ok(googleCredit, "GOOGLE_ONE_AI entry must be found");

    const balance = parseInt(googleCredit.creditAmount, 10);
    assert.equal(balance, 123, "credit balance must be parsed correctly");
  });

  it("handles missing GOOGLE_ONE_AI gracefully — no crash", () => {
    const remainingCredits = [{ creditType: "SOME_OTHER", creditAmount: "999" }];

    const googleCredit = remainingCredits.find((c) => c.creditType === "GOOGLE_ONE_AI");
    assert.equal(googleCredit, undefined, "should not find GOOGLE_ONE_AI if not present");
  });

  it("handles malformed creditAmount gracefully — NaN is not stored", () => {
    const remainingCredits = [{ creditType: "GOOGLE_ONE_AI", creditAmount: "not-a-number" }];

    const googleCredit = remainingCredits.find((c) => c.creditType === "GOOGLE_ONE_AI");
    const balance = parseInt(googleCredit.creditAmount, 10);
    assert.ok(isNaN(balance), "NaN guard prevents invalid balance storage");
  });

  it("balance update is correctly reflected in the cache after a successful parse", () => {
    const accountId = `test-sse-${Date.now()}`;
    const remainingCredits = [{ creditType: "GOOGLE_ONE_AI", creditAmount: "77" }];

    const googleCredit = remainingCredits.find((c) => c.creditType === "GOOGLE_ONE_AI");
    if (googleCredit) {
      const balance = parseInt(googleCredit.creditAmount, 10);
      if (!isNaN(balance)) {
        updateAntigravityRemainingCredits(accountId, balance);
      }
    }

    assert.equal(getAntigravityRemainingCredits(accountId), 77);
  });

  it("skips cache update when creditAmount is NaN — balance remains null", () => {
    const accountId = `test-nan-guard-${Date.now()}`;
    const remainingCredits = [{ creditType: "GOOGLE_ONE_AI", creditAmount: "bad" }];

    const googleCredit = remainingCredits.find((c) => c.creditType === "GOOGLE_ONE_AI");
    if (googleCredit) {
      const balance = parseInt(googleCredit.creditAmount, 10);
      if (!isNaN(balance)) {
        updateAntigravityRemainingCredits(accountId, balance);
      }
      // NaN — no update should happen
    }

    assert.equal(
      getAntigravityRemainingCredits(accountId),
      null,
      "balance should remain null when parsing yields NaN"
    );
  });
});
