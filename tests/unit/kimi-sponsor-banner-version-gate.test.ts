// Kimi (Moonshot AI) sponsor banner — version-gate pure logic.
// See src/app/(dashboard)/dashboard/kimiSponsorBanner.ts.
import test from "node:test";
import assert from "node:assert/strict";

const kimiSponsorBanner = await import(
  "../../src/app/(dashboard)/dashboard/kimiSponsorBanner.ts"
);

test("KIMI_SPONSOR_BANNER_THROUGH_VERSION is the agreed sunset version", () => {
  assert.equal(kimiSponsorBanner.KIMI_SPONSOR_BANNER_THROUGH_VERSION, "3.8.60");
});

test("shows the banner for the release this ships in (v3.8.49)", () => {
  assert.equal(kimiSponsorBanner.shouldShowKimiSponsorBanner("3.8.49"), true);
});

test("shows the banner exactly at the inclusive upper bound (v3.8.60)", () => {
  assert.equal(kimiSponsorBanner.shouldShowKimiSponsorBanner("3.8.60"), true);
});

test("shows the banner for any patch release inside the window (v3.8.55)", () => {
  assert.equal(kimiSponsorBanner.shouldShowKimiSponsorBanner("3.8.55"), true);
});

test("hides the banner one patch past the sunset version (v3.8.61)", () => {
  assert.equal(kimiSponsorBanner.shouldShowKimiSponsorBanner("3.8.61"), false);
});

test("hides the banner for a later minor/major (v3.9.0, v4.0.0)", () => {
  assert.equal(kimiSponsorBanner.shouldShowKimiSponsorBanner("3.9.0"), false);
  assert.equal(kimiSponsorBanner.shouldShowKimiSponsorBanner("4.0.0"), false);
});

test("tolerates a leading 'v' and pre-release suffix like the update-banner version source does", () => {
  assert.equal(kimiSponsorBanner.shouldShowKimiSponsorBanner("v3.8.49"), true);
  assert.equal(kimiSponsorBanner.shouldShowKimiSponsorBanner("3.8.60-beta.1"), true);
  assert.equal(kimiSponsorBanner.shouldShowKimiSponsorBanner("v3.8.61"), false);
});

test("fails safe (hides) for unparsable/sentinel version strings", () => {
  assert.equal(kimiSponsorBanner.shouldShowKimiSponsorBanner("unknown"), false);
  assert.equal(kimiSponsorBanner.shouldShowKimiSponsorBanner(""), false);
  assert.equal(kimiSponsorBanner.shouldShowKimiSponsorBanner(null), false);
  assert.equal(kimiSponsorBanner.shouldShowKimiSponsorBanner(undefined), false);
});
