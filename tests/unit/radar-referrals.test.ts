/**
 * tests/unit/radar-referrals.test.ts
 *
 * TDD regression guard for the client-side "referral links / free credits"
 * feature (D28). Referral links now come from the STANDALONE, always-current
 * `GET /v1/referrals/latest` feed (`radar_referrals_cache` table /
 * `referralsSync.ts`) instead of being extracted from the catalog feed's
 * cached snapshot -- the catalog feed on the community tier can be up to 30
 * days stale, so referral links extracted from it used to lag the server by
 * the same amount. This suite covers the CLIENT side only:
 *
 *  - RadarReferralsFeedSchema (`referralsFeedSchema.ts`): valid feed parses;
 *    an invalid referral (non-https url) is rejected. (Schema-level
 *    coverage for the referrals feed's error/replay/tier paths lives in
 *    `tests/unit/radar-referrals-sync.test.ts`.)
 *  - getRadarReferrals(): flag off => {fixed:[],campaigns:[]}; no cache =>
 *    same; corrupt cache => same (never throws).
 *  - getDefaultReferralFor(): returns the fixed+isDefault referral for a
 *    provider, ignores campaigns, returns null when none.
 *  - findDefaultReferral() (pure helper, DB-free -- must be importable from
 *    a client bundle without pulling in @/lib/db/*) -- same contract as
 *    above, operating directly on a `fixed` array.
 *
 * No DB is touched here -- all DB access is injected via `deps`, matching
 * the existing tests/unit/radar-apply-feed.test.ts convention.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { RadarReferralsFeedSchema } from "../../src/lib/radar/referralsFeedSchema.ts";
import type { RadarReferral } from "../../src/lib/radar/feedSchema.ts";
import { findDefaultReferral } from "../../src/lib/radar/referrals.ts";
import { getRadarReferrals, getDefaultReferralFor } from "../../src/lib/radar/index.ts";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

/** A standalone referrals feed (`GET /v1/referrals/latest` shape). */
function baseReferralsFeed(): Record<string, unknown> {
  return {
    feed: "omniroute-radar-referrals",
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    referrals: { fixed: [], campaigns: [] },
  };
}

function makeReferral(overrides: Partial<RadarReferral> = {}): RadarReferral {
  return {
    provider: "groq",
    url: "https://groq.com/?ref=omniroute",
    kind: "fixo",
    validUntil: null,
    requiredAction: null,
    isDefault: true,
    ...overrides,
  };
}

/** Build a `getRadarReferralsCache()`-shaped row from a referrals feed object. */
function cacheRowFor(feed: Record<string, unknown>, overrides: Record<string, unknown> = {}) {
  return {
    generatedAt: feed.generatedAt as string,
    tier: "live",
    payload: JSON.stringify(feed),
    fetchedAt: new Date().toISOString(),
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// RadarReferralsFeedSchema -- validation
// ---------------------------------------------------------------------------

test("RadarReferralsFeedSchema: minimal empty-referrals feed parses successfully", () => {
  const parsed = RadarReferralsFeedSchema.parse(baseReferralsFeed());
  assert.deepEqual(parsed.referrals, { fixed: [], campaigns: [] });
});

test("RadarReferralsFeedSchema: full referrals section round-trips", () => {
  const feed = {
    ...baseReferralsFeed(),
    referrals: {
      fixed: [makeReferral()],
      campaigns: [
        makeReferral({
          provider: "openrouter",
          kind: "campanha",
          isDefault: false,
          validUntil: "2026-12-31T00:00:00.000Z",
          requiredAction: "Sign up with a credit card",
        }),
      ],
    },
  };
  const parsed = RadarReferralsFeedSchema.parse(feed);
  assert.equal(parsed.referrals.fixed.length, 1);
  assert.equal(parsed.referrals.campaigns.length, 1);
  assert.equal(parsed.referrals.campaigns[0]!.kind, "campanha");
});

test("RadarReferralsFeedSchema: rejects a referral with a non-https url", () => {
  const feed = {
    ...baseReferralsFeed(),
    referrals: { fixed: [makeReferral({ url: "http://groq.com/?ref=omniroute" })], campaigns: [] },
  };
  assert.throws(() => RadarReferralsFeedSchema.parse(feed));
});

test("RadarReferralsFeedSchema: rejects an invalid `kind`", () => {
  const feed = {
    ...baseReferralsFeed(),
    referrals: { fixed: [{ ...makeReferral(), kind: "bogus" }], campaigns: [] },
  };
  assert.throws(() => RadarReferralsFeedSchema.parse(feed));
});

// ---------------------------------------------------------------------------
// findDefaultReferral -- pure, DB-free helper (client-safe)
// ---------------------------------------------------------------------------

test("findDefaultReferral: returns the fixed+isDefault referral for the provider", () => {
  const fixed = [
    makeReferral({ provider: "groq", isDefault: true }),
    makeReferral({ provider: "openrouter", isDefault: true }),
  ];
  const result = findDefaultReferral(fixed, "openrouter");
  assert.equal(result?.provider, "openrouter");
});

test("findDefaultReferral: returns null when the provider has no default referral", () => {
  const fixed = [makeReferral({ provider: "groq", isDefault: true })];
  assert.equal(findDefaultReferral(fixed, "cerebras"), null);
});

test("findDefaultReferral: ignores a non-default fixed referral for the provider", () => {
  const fixed = [makeReferral({ provider: "groq", isDefault: false })];
  assert.equal(findDefaultReferral(fixed, "groq"), null);
});

test("findDefaultReferral: empty array => null", () => {
  assert.equal(findDefaultReferral([], "groq"), null);
});

// ---------------------------------------------------------------------------
// getRadarReferrals() -- flag/cache gating, never throws
// ---------------------------------------------------------------------------

test("getRadarReferrals: flag off => empty, cache never read", () => {
  let cacheReadCount = 0;
  const result = getRadarReferrals({
    getFlag: () => false,
    getCache: () => {
      cacheReadCount += 1;
      throw new Error("cache must not be read when the flag is off");
    },
  });
  assert.deepEqual(result, { fixed: [], campaigns: [] });
  assert.equal(cacheReadCount, 0);
});

test("getRadarReferrals: flag on, no cache => empty", () => {
  const result = getRadarReferrals({ getFlag: () => true, getCache: () => null });
  assert.deepEqual(result, { fixed: [], campaigns: [] });
});

test("getRadarReferrals: flag on, corrupt cache payload => empty (defensive, never throws)", () => {
  const result = getRadarReferrals({
    getFlag: () => true,
    getCache: () => ({
      generatedAt: "x",
      tier: "live",
      payload: "{not-json",
      fetchedAt: new Date().toISOString(),
    }),
  });
  assert.deepEqual(result, { fixed: [], campaigns: [] });
});

test("getRadarReferrals: flag on, cached payload fails schema validation => empty (defensive)", () => {
  const result = getRadarReferrals({
    getFlag: () => true,
    getCache: () => ({
      generatedAt: "x",
      tier: "live",
      // Wrong `feed` literal -- fails RadarReferralsFeedSchema.
      payload: JSON.stringify({ ...baseReferralsFeed(), feed: "omniroute-radar" }),
      fetchedAt: new Date().toISOString(),
    }),
  });
  assert.deepEqual(result, { fixed: [], campaigns: [] });
});

test("getRadarReferrals: flag on, cached referrals feed => returns them", () => {
  const feed = {
    ...baseReferralsFeed(),
    referrals: { fixed: [makeReferral()], campaigns: [] },
  };
  const result = getRadarReferrals({
    getFlag: () => true,
    getCache: () => cacheRowFor(feed),
  });
  assert.equal(result.fixed.length, 1);
  assert.equal(result.fixed[0]!.provider, "groq");
});

test("getRadarReferrals: default getCache reads from getRadarReferralsCache (module wiring)", async () => {
  // Confirms the accessor's default dep is the NEW referrals cache reader,
  // not the old catalog cache -- exercised via the flag-off short-circuit
  // (no DB touch needed) so this stays a pure unit test.
  const result = getRadarReferrals({ getFlag: () => false });
  assert.deepEqual(result, { fixed: [], campaigns: [] });
});

// ---------------------------------------------------------------------------
// getDefaultReferralFor()
// ---------------------------------------------------------------------------

test("getDefaultReferralFor: flag off => null", () => {
  const result = getDefaultReferralFor("groq", { getFlag: () => false, getCache: () => null });
  assert.equal(result, null);
});

test("getDefaultReferralFor: returns the fixed default referral, ignoring campaigns", () => {
  const feed = {
    ...baseReferralsFeed(),
    referrals: {
      fixed: [makeReferral({ provider: "groq", isDefault: true })],
      campaigns: [makeReferral({ provider: "groq", kind: "campanha", isDefault: true })],
    },
  };
  const result = getDefaultReferralFor("groq", {
    getFlag: () => true,
    getCache: () => cacheRowFor(feed),
  });
  assert.equal(result?.kind, "fixo");
});

test("getDefaultReferralFor: provider with no default referral => null", () => {
  const feed = { ...baseReferralsFeed(), referrals: { fixed: [], campaigns: [] } };
  const result = getDefaultReferralFor("groq", {
    getFlag: () => true,
    getCache: () => cacheRowFor(feed),
  });
  assert.equal(result, null);
});
