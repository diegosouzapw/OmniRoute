/**
 * tests/unit/radar-links.test.ts
 *
 * TDD guard for src/lib/radar/links.ts — the two outbound "get a supporter
 * key" links (F4/T7): contributor-claim (GitHub OAuth) and supporter-plans
 * (payment page). Pure, DB-free module: defaults + env override only.
 *
 * No price/monetary value assertion lives here on purpose — this module
 * never resolves one (D14: pricing only lives on the private plans page the
 * URL points at, never in the OSS repo).
 */

import test from "node:test";
import assert from "node:assert/strict";

test.beforeEach(() => {
  delete process.env.RADAR_CONTRIBUTOR_CLAIM_URL;
  delete process.env.RADAR_SUPPORTER_PLANS_URL;
});

test.after(() => {
  delete process.env.RADAR_CONTRIBUTOR_CLAIM_URL;
  delete process.env.RADAR_SUPPORTER_PLANS_URL;
});

test("getContributorClaimUrl: defaults to the radar.omniroute.online GitHub OAuth entry point", async () => {
  const { getContributorClaimUrl } = await import("../../../src/lib/radar/links.ts");
  assert.equal(getContributorClaimUrl(), "https://radar.omniroute.online/auth/github");
});

test("getContributorClaimUrl: honors RADAR_CONTRIBUTOR_CLAIM_URL override", async () => {
  process.env.RADAR_CONTRIBUTOR_CLAIM_URL = "https://fork.example.com/auth/github";
  const { getContributorClaimUrl } = await import("../../../src/lib/radar/links.ts");
  assert.equal(getContributorClaimUrl(), "https://fork.example.com/auth/github");
});

test("getSupporterPlansUrl: defaults to the radar.omniroute.online plans page", async () => {
  const { getSupporterPlansUrl } = await import("../../../src/lib/radar/links.ts");
  assert.equal(getSupporterPlansUrl(), "https://radar.omniroute.online/planos");
});

test("getSupporterPlansUrl: honors RADAR_SUPPORTER_PLANS_URL override", async () => {
  process.env.RADAR_SUPPORTER_PLANS_URL = "https://fork.example.com/plans";
  const { getSupporterPlansUrl } = await import("../../../src/lib/radar/links.ts");
  assert.equal(getSupporterPlansUrl(), "https://fork.example.com/plans");
});

test("getContributorClaimUrl / getSupporterPlansUrl: empty-string env falls back to default (not a blank link)", async () => {
  process.env.RADAR_CONTRIBUTOR_CLAIM_URL = "";
  process.env.RADAR_SUPPORTER_PLANS_URL = "";
  const { getContributorClaimUrl, getSupporterPlansUrl } = await import(
    "../../../src/lib/radar/links.ts"
  );
  assert.equal(getContributorClaimUrl(), "https://radar.omniroute.online/auth/github");
  assert.equal(getSupporterPlansUrl(), "https://radar.omniroute.online/planos");
});
