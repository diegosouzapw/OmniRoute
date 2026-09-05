/**
 * tests/unit/radar-referrals-page-tab.test.ts
 *
 * Structural regression guard for the "Pegue seus créditos grátis" tab (D28)
 * added to the existing /dashboard/radar page (no new dashboard route was
 * created — per spec, less i18n/routing surface). Verifies:
 *
 *  - The page source wires a `referrals` tab fetching the LOCAL
 *    /api/radar/referrals route only (never the private feed server).
 *  - Every `t("...")` key the page references under the new tab exists (with
 *    a non-empty value) in en.json — a stand-in for a full i18n-ui-coverage
 *    run without needing to execute that whole gate here.
 *  - No new dashboard route directory was created for this feature.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import i18nConfig from "../../../config/i18n.json" with { type: "json" };

const PAGE_PATH = path.resolve(process.cwd(), "src/app/(dashboard)/dashboard/radar/page.tsx");
const PAGE_SRC = fs.readFileSync(PAGE_PATH, "utf-8");

test("radar page: fetches referrals only from the local /api/radar/referrals route", () => {
  assert.ok(
    PAGE_SRC.includes('fetch("/api/radar/referrals")'),
    "page must fetch the local referrals route"
  );
  // Never a direct call to an external feed-server URL from this component.
  assert.ok(
    !/https?:\/\/(?!localhost)/.test(PAGE_SRC.replace(/\/\*[\s\S]*?\*\//g, "")),
    "page must never fetch an external URL directly (NEVER proxy the private feed server)"
  );
});

test("radar page: renders a referrals tab with catalogTab/freeCreditsTab labels", () => {
  assert.ok(PAGE_SRC.includes('t("catalogTab")'));
  assert.ok(PAGE_SRC.includes('t("freeCreditsTab")'));
  assert.ok(PAGE_SRC.includes('activeTab === "referrals"'));
});

test("radar page: campaigns-empty community upsell is soft (never blocks the fixed links list)", () => {
  // The upsell only gates the campaigns section, never `referrals.fixed`.
  assert.ok(PAGE_SRC.includes("campaignsUpsellCommunity"));
  assert.ok(
    !/fixed[\s\S]{0,80}tier === "community"/.test(PAGE_SRC),
    "fixed links must never be gated on tier client-side (server already gates by artifact)"
  );
});

test("no new dashboard route was created for the free-credits feature (spec: reuse /dashboard/radar)", () => {
  const dashboardDir = path.resolve(process.cwd(), "src/app/(dashboard)/dashboard");
  assert.ok(
    !fs.existsSync(path.join(dashboardDir, "referrals")),
    "must not create src/app/(dashboard)/dashboard/referrals/"
  );
  assert.ok(
    !fs.existsSync(path.join(dashboardDir, "radar", "referrals")),
    "must not create src/app/(dashboard)/dashboard/radar/referrals/ either — same page, new tab"
  );
});

test('every t("...") key referenced in the referrals tab section exists (non-empty) in en.json', () => {
  const enMessages = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), "src/i18n/messages/en.json"), "utf-8")
  );
  const radarPage = enMessages.radarPage as Record<string, unknown>;
  assert.ok(radarPage, "en.json must have a radarPage namespace");

  const referencedKeys = [
    "catalogTab",
    "freeCreditsTab",
    "freeCreditsSubtitle",
    "fixedLinksEmpty",
    "requiredActionLabel",
    "claimButton",
    "campaignsTitle",
    "campaignsEmpty",
    "campaignsUpsellCommunity",
    "campaignsValidUntil",
  ];

  for (const key of referencedKeys) {
    assert.ok(
      PAGE_SRC.includes(`t("${key}")`) || PAGE_SRC.includes(`t("${key}",`),
      `page.tsx must reference t("${key}")`
    );
    assert.equal(typeof radarPage[key], "string", `en.json radarPage.${key} must be a string`);
    assert.ok((radarPage[key] as string).length > 0, `en.json radarPage.${key} must be non-empty`);
  }
});

test("every locale message file (config/i18n.json) carries every new radarPage key with a non-empty value", () => {
  const messagesDir = path.resolve(process.cwd(), "src/i18n/messages");
  const files = fs.readdirSync(messagesDir).filter((f) => f.endsWith(".json"));
  assert.ok(
    files.length >= i18nConfig.locales.length,
    `expected the ${i18nConfig.locales.length} configured locales, found ${files.length}`
  );

  const NEW_KEYS = [
    "catalogTab",
    "freeCreditsTab",
    "freeCreditsSubtitle",
    "fixedLinksEmpty",
    "requiredActionLabel",
    "claimButton",
    "campaignsTitle",
    "campaignsEmpty",
    "campaignsUpsellCommunity",
    "campaignsValidUntil",
  ];

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(messagesDir, file), "utf-8"));
    const radarPage = data.radarPage as Record<string, unknown> | undefined;
    assert.ok(radarPage, `${file}: missing radarPage namespace`);
    for (const key of NEW_KEYS) {
      assert.equal(
        typeof radarPage![key],
        "string",
        `${file}: radarPage.${key} must be a non-empty string`
      );
      assert.ok((radarPage![key] as string).length > 0, `${file}: radarPage.${key} is empty`);
    }
  }
});
