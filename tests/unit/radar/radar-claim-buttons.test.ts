/**
 * tests/unit/radar-claim-buttons.test.ts
 *
 * TDD guard for the F4/T7 "get a supporter key" buttons on the Radar
 * activation screen (src/app/(dashboard)/dashboard/radar/page.tsx):
 *
 *  - "I'm a contributor" and "Support the project" open in a new tab
 *    (target="_blank" rel="noopener noreferrer") and never hardcode an
 *    external URL — both links come from GET /api/radar/settings
 *    (server-resolved via src/lib/radar/links.ts), never process.env
 *    read client-side.
 *  - No price/monetary value appears anywhere in the page source (D14).
 *  - Every new t("...") key referenced exists (non-empty) in en.json and
 *    all locale files.
 *
 * Structural, source-based — same style as
 * tests/unit/radar-referrals-page-tab.test.ts — deliberately avoids a full
 * component render (no jsdom harness in this repo's unit runner).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import i18nConfig from "../../../config/i18n.json" with { type: "json" };

const PAGE_PATH = path.resolve(process.cwd(), "src/app/(dashboard)/dashboard/radar/page.tsx");
const PAGE_SRC = fs.readFileSync(PAGE_PATH, "utf-8");

const NEW_KEYS = [
  "claimSectionTitle",
  "contributorButton",
  "contributorHint",
  "supporterButton",
  "supporterHint",
];

test("radar page: claim/plans links are state, never a hardcoded external URL literal", () => {
  assert.ok(
    PAGE_SRC.includes("contributorClaimUrl") && PAGE_SRC.includes("supporterPlansUrl"),
    "page must reference contributorClaimUrl/supporterPlansUrl state"
  );
  // Same guard as the D28 referrals test: no literal https:// (except in
  // comments) anywhere in this client component — links are always
  // server-resolved and relayed through the settings fetch.
  assert.ok(
    !/https?:\/\/(?!localhost)/.test(PAGE_SRC.replace(/\/\*[\s\S]*?\*\//g, "")),
    "page must never hardcode an external URL directly"
  );
  // Never read process.env directly in this client component.
  assert.ok(
    !PAGE_SRC.includes("process.env"),
    "page must never read process.env client-side — URLs come from the settings fetch"
  );
});

test("radar page: both buttons open in a new tab safely", () => {
  const contributorAnchor = PAGE_SRC.match(/href=\{contributorClaimUrl\}[\s\S]{0,120}/)?.[0];
  const supporterAnchor = PAGE_SRC.match(/href=\{supporterPlansUrl\}[\s\S]{0,120}/)?.[0];
  assert.ok(contributorAnchor, "contributorClaimUrl anchor must exist");
  assert.ok(supporterAnchor, "supporterPlansUrl anchor must exist");
  for (const anchor of [contributorAnchor, supporterAnchor]) {
    assert.ok(anchor!.includes('target="_blank"'), "must open in a new tab");
    assert.ok(anchor!.includes('rel="noopener noreferrer"'), "must set rel=noopener noreferrer");
  }
});

test("radar page: references the 5 new claim-section t(...) keys", () => {
  for (const key of NEW_KEYS) {
    assert.ok(PAGE_SRC.includes(`t("${key}")`), `page.tsx must reference t("${key}")`);
  }
});

test(`radar page + all ${i18nConfig.locales.length} locale files: no price/monetary value in the claim section copy (D14)`, () => {
  // D14: no pricing anywhere in the OSS repo, only a link to the plans page.
  const PRICE_PATTERN =
    /\$\s?\d|R\$\s?\d|\d+[.,]\d{2}\s?(USD|BRL|EUR)|\b(lifetime|life-time)\b.{0,20}\$/i;
  assert.ok(!PRICE_PATTERN.test(PAGE_SRC), "page.tsx must not contain a price/monetary value");

  const messagesDir = path.resolve(process.cwd(), "src/i18n/messages");
  const files = fs.readdirSync(messagesDir).filter((f) => f.endsWith(".json"));
  assert.ok(
    files.length >= i18nConfig.locales.length,
    `expected the ${i18nConfig.locales.length} configured locales, found ${files.length}`
  );

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(messagesDir, file), "utf-8"));
    const radarPage = data.radarPage as Record<string, unknown> | undefined;
    assert.ok(radarPage, `${file}: missing radarPage namespace`);
    for (const key of NEW_KEYS) {
      const value = radarPage![key];
      assert.equal(typeof value, "string", `${file}: radarPage.${key} must be a string`);
      assert.ok((value as string).length > 0, `${file}: radarPage.${key} is empty`);
      assert.ok(
        !PRICE_PATTERN.test(value as string),
        `${file}: radarPage.${key} must not contain a price/monetary value`
      );
    }
  }
});
