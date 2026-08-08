/**
 * tests/unit/radar-referrals.test.ts
 *
 * TDD regression guard for the client-side "referral links / free credits"
 * feature (D28). The server already publishes a `referrals` section on the
 * signed feed (`{ fixed: RadarReferral[], campaigns: RadarReferral[] }`) —
 * this suite covers the CLIENT side only:
 *
 *  - RadarFeedSchema: a feed WITHOUT `referrals` stays valid (compat with
 *    old cached feeds); a feed WITH an invalid referral (non-https url) is
 *    rejected.
 *  - getRadarReferrals(): flag off => {fixed:[],campaigns:[]}; no cache =>
 *    same; corrupt cache => same; feed without the section => same
 *    (never throws).
 *  - getDefaultReferralFor(): returns the fixed+isDefault referral for a
 *    provider, ignores campaigns, returns null when none.
 *  - findDefaultReferral() (pure helper, DB-free — must be importable from a
 *    client bundle without pulling in @/lib/db/*): same contract as above,
 *    operating directly on a `fixed` array.
 *
 * No DB is touched here — all DB access is injected via `deps`, matching
 * the existing tests/unit/radar-apply-feed.test.ts convention.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { RadarFeedSchema, type RadarFeed, type RadarReferral } from "../../src/lib/radar/feedSchema.ts";
import { findDefaultReferral } from "../../src/lib/radar/referrals.ts";
import { getRadarReferrals, getDefaultReferralFor } from "../../src/lib/radar/index.ts";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

function baseFeed(): Record<string, unknown> {
  return {
    feed: "omniroute-radar",
    schemaVersion: 1,
    version: "2026-08-07.1",
    generatedAt: new Date().toISOString(),
    tier: "live",
    counts: { providers: 0, models: 0 },
    providers: [],
    models: [],
    quirks: [],
    totals: { dedupedTokensPerMonth: 0, modelCount: 0, poolCount: 0 },
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

// ---------------------------------------------------------------------------
// RadarFeedSchema — compat + validation
// ---------------------------------------------------------------------------

test("RadarFeedSchema: feed without `referrals` stays valid (old-feed compat)", () => {
  const parsed = RadarFeedSchema.parse(baseFeed());
  assert.deepEqual(parsed.referrals, { fixed: [], campaigns: [] });
});

test("RadarFeedSchema: feed with `referrals.fixed` but no `campaigns` defaults campaigns to []", () => {
  const feed = { ...baseFeed(), referrals: { fixed: [makeReferral()] } };
  const parsed = RadarFeedSchema.parse(feed);
  assert.equal(parsed.referrals.fixed.length, 1);
  assert.deepEqual(parsed.referrals.campaigns, []);
});

test("RadarFeedSchema: full referrals section round-trips", () => {
  const feed = {
    ...baseFeed(),
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
  const parsed = RadarFeedSchema.parse(feed);
  assert.equal(parsed.referrals.fixed.length, 1);
  assert.equal(parsed.referrals.campaigns.length, 1);
  assert.equal(parsed.referrals.campaigns[0]!.kind, "campanha");
});

test("RadarFeedSchema: rejects a referral with a non-https url", () => {
  const feed = {
    ...baseFeed(),
    referrals: { fixed: [makeReferral({ url: "http://groq.com/?ref=omniroute" })], campaigns: [] },
  };
  assert.throws(() => RadarFeedSchema.parse(feed));
});

test("RadarFeedSchema: rejects an invalid `kind`", () => {
  const feed = {
    ...baseFeed(),
    referrals: { fixed: [{ ...makeReferral(), kind: "bogus" }], campaigns: [] },
  };
  assert.throws(() => RadarFeedSchema.parse(feed));
});

// ---------------------------------------------------------------------------
// findDefaultReferral — pure, DB-free helper (client-safe)
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
// getRadarReferrals() — flag/cache gating, never throws
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
      version: "x",
      tier: "live",
      payload: "{not-json",
      fetchedAt: new Date().toISOString(),
    }),
  });
  assert.deepEqual(result, { fixed: [], campaigns: [] });
});

test("getRadarReferrals: flag on, cached feed has no `referrals` section => empty", () => {
  const result = getRadarReferrals({
    getFlag: () => true,
    getCache: () => ({
      version: "x",
      tier: "live",
      payload: JSON.stringify(baseFeed()),
      fetchedAt: new Date().toISOString(),
    }),
  });
  assert.deepEqual(result, { fixed: [], campaigns: [] });
});

test("getRadarReferrals: flag on, cached feed has referrals => returns them", () => {
  const feed = {
    ...baseFeed(),
    referrals: { fixed: [makeReferral()], campaigns: [] },
  };
  const result = getRadarReferrals({
    getFlag: () => true,
    getCache: () => ({
      version: "x",
      tier: "live",
      payload: JSON.stringify(feed),
      fetchedAt: new Date().toISOString(),
    }),
  });
  assert.equal(result.fixed.length, 1);
  assert.equal(result.fixed[0]!.provider, "groq");
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
    ...baseFeed(),
    referrals: {
      fixed: [makeReferral({ provider: "groq", isDefault: true })],
      campaigns: [makeReferral({ provider: "groq", kind: "campanha", isDefault: true })],
    },
  };
  const result = getDefaultReferralFor("groq", {
    getFlag: () => true,
    getCache: () => ({
      version: "x",
      tier: "live",
      payload: JSON.stringify(feed),
      fetchedAt: new Date().toISOString(),
    }),
  });
  assert.equal(result?.kind, "fixo");
});

test("getDefaultReferralFor: provider with no default referral => null", () => {
  const feed = { ...baseFeed(), referrals: { fixed: [], campaigns: [] } };
  const result = getDefaultReferralFor("groq", {
    getFlag: () => true,
    getCache: () => ({
      version: "x",
      tier: "live",
      payload: JSON.stringify(feed),
      fetchedAt: new Date().toISOString(),
    }),
  });
  assert.equal(result, null);
});
