/**
 * tests/unit/provider-header-referral-link.test.ts
 *
 * TDD regression guard for the "referral link on the provider name" part of
 * D28 (referral links / free credits). Covers the pure decision function
 * `resolveProviderHeaderLink` used by ProviderDetailPageClient to decide
 * whether the provider-name link (rendered by ProviderPageHeader) points at
 * the static catalog `website` or at a Radar default referral.
 *
 * Loose-coupling requirements from the spec:
 *  (a) RADAR_ENABLED off => byte-identical to today (covered indirectly:
 *      when off, the caller never resolves a referralUrl, so this receives
 *      null/undefined and returns the static website unchanged).
 *  (b) No cache / no referral for the provider => same as (a).
 *  (c) This file (providerPageUtils.ts) imports NO @/lib/radar or
 *      @/lib/db/* symbol — asserted by source inspection so a future edit
 *      cannot silently reintroduce a DB-touching import into a module a
 *      "use client" component depends on.
 *  (d) When a referral applies, isReferralLink=true (the header uses this to
 *      show a discreet note, reusing the existing `kimiPartnerLinkNote` key).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { resolveProviderHeaderLink } from "../../src/app/(dashboard)/dashboard/providers/providerPageUtils.ts";

test("resolveProviderHeaderLink: no referral => keeps the static website, isReferralLink=false", () => {
  const result = resolveProviderHeaderLink("https://groq.com", null);
  assert.deepEqual(result, { website: "https://groq.com", isReferralLink: false });
});

test("resolveProviderHeaderLink: no referral, no static website => website undefined (today's no-link case)", () => {
  const result = resolveProviderHeaderLink(undefined, null);
  assert.deepEqual(result, { website: undefined, isReferralLink: false });
});

test("resolveProviderHeaderLink: referral present => overrides the static website, isReferralLink=true", () => {
  const result = resolveProviderHeaderLink("https://groq.com", "https://groq.com/?ref=omniroute");
  assert.deepEqual(result, {
    website: "https://groq.com/?ref=omniroute",
    isReferralLink: true,
  });
});

test("resolveProviderHeaderLink: referral present even when catalog has no static website => still links out", () => {
  const result = resolveProviderHeaderLink(undefined, "https://groq.com/?ref=omniroute");
  assert.deepEqual(result, {
    website: "https://groq.com/?ref=omniroute",
    isReferralLink: true,
  });
});

test("resolveProviderHeaderLink: empty-string referral is treated as absent (falsy)", () => {
  const result = resolveProviderHeaderLink("https://groq.com", "");
  assert.deepEqual(result, { website: "https://groq.com", isReferralLink: false });
});

// ---------------------------------------------------------------------------
// Loose coupling — providerPageUtils.ts must not depend on the Radar/DB
// modules to compute this (requirement (c) — see file docblock above).
// ---------------------------------------------------------------------------

test("providerPageUtils.ts does not import @/lib/radar or @/lib/db/* (loose coupling — D28)", () => {
  const src = fs.readFileSync(
    path.resolve(
      process.cwd(),
      "src/app/(dashboard)/dashboard/providers/providerPageUtils.ts"
    ),
    "utf-8"
  );
  const importLines = src
    .split("\n")
    .filter((line) => /^\s*import\b/.test(line));
  assert.ok(
    !importLines.some((line) => line.includes("@/lib/radar")),
    "providerPageUtils.ts must not import @/lib/radar"
  );
  assert.ok(
    !importLines.some((line) => line.includes("@/lib/db/")),
    "providerPageUtils.ts must not import @/lib/db/*"
  );
});
