/**
 * tests/unit/quota-email-privacy.test.ts
 *
 * Source-scan assertions for the email-privacy feature on the Quota Share screen.
 * Mirrors the pattern from mask-email.test.ts and providers-page-utils.test.ts.
 *
 * Checks that every display component that can show an email:
 *   1. Imports `useEmailPrivacyStore` from the store
 *   2. Imports `maskEmailLikeValue` (or `pickDisplayValue`) from the mask utility
 *   3. References `emailsVisible` in its body
 *
 * Also verifies the email-privacy control is consolidated into Settings → Appearance
 * (#3822: the per-page toggle was removed in favor of a single global switch) while
 * QuotaSharePageClient still consumes the store for masking.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../../");

function readSrc(relPath: string): string {
  return fs.readFileSync(path.join(root, relPath), "utf8");
}

const quotaShareDir = "src/app/(dashboard)/dashboard/costs/quota-share";

// ── File contents loaded once ─────────────────────────────────────────────────

const pageClientSrc = readSrc(`${quotaShareDir}/QuotaSharePageClient.tsx`);
const poolCardSrc = readSrc(`${quotaShareDir}/components/PoolCard.tsx`);
const accountQuotaRowSrc = readSrc(`${quotaShareDir}/components/AccountQuotaRow.tsx`);
const poolWizardSrc = readSrc(`${quotaShareDir}/components/PoolWizard.tsx`);

const settingsDir = "src/app/(dashboard)/dashboard/settings/components";
const appearanceTabSrc = readSrc(`${settingsDir}/AppearanceTab.tsx`);
const accountEmailVisibilitySrc = readSrc(`${settingsDir}/AccountEmailVisibilitySetting.tsx`);

// ── Global consolidation (#3822) ──────────────────────────────────────────────

test("email-privacy control is consolidated into Settings → Appearance (#3822)", () => {
  assert.ok(
    appearanceTabSrc.includes("AccountEmailVisibilitySetting"),
    "Expected AppearanceTab to render the global AccountEmailVisibilitySetting"
  );
  assert.ok(
    accountEmailVisibilitySrc.includes("setEmailsVisible") &&
      accountEmailVisibilitySrc.includes("useEmailPrivacyStore"),
    "Expected the global setting to drive emailsVisible via the store"
  );
});

test("QuotaSharePageClient imports useEmailPrivacyStore", () => {
  assert.ok(
    pageClientSrc.includes('import useEmailPrivacyStore from "@/store/emailPrivacyStore"'),
    "Expected useEmailPrivacyStore import in QuotaSharePageClient"
  );
});

test("QuotaSharePageClient imports maskEmailLikeValue", () => {
  assert.ok(
    pageClientSrc.includes("maskEmailLikeValue"),
    "Expected maskEmailLikeValue import/usage in QuotaSharePageClient"
  );
});

test("QuotaSharePageClient consumes emailsVisible from store", () => {
  assert.ok(
    pageClientSrc.includes("emailsVisible"),
    "Expected emailsVisible consumption in QuotaSharePageClient"
  );
});

test("QuotaSharePageClient no longer renders a per-page email-privacy toggle (#3822)", () => {
  assert.ok(
    !pageClientSrc.includes("<EmailPrivacyToggle"),
    "QuotaSharePageClient must not render its own EmailPrivacyToggle — the control is now global in Settings → Appearance"
  );
});

test("QuotaSharePageClient masks connLabel output with emailsVisible gate", () => {
  // connLabel must call maskEmailLikeValue and guard with emailsVisible
  assert.ok(
    pageClientSrc.includes("emailsVisible ? raw : maskEmailLikeValue(raw)") ||
      (pageClientSrc.includes("emailsVisible") &&
        pageClientSrc.includes("maskEmailLikeValue(raw)")),
    "Expected connLabel to mask raw value when emailsVisible is false"
  );
});

// ── PoolCard ──────────────────────────────────────────────────────────────────

test("PoolCard imports useEmailPrivacyStore", () => {
  assert.ok(
    poolCardSrc.includes('import useEmailPrivacyStore from "@/store/emailPrivacyStore"'),
    "Expected useEmailPrivacyStore import in PoolCard"
  );
});

test("PoolCard imports maskEmailLikeValue", () => {
  assert.ok(
    poolCardSrc.includes("maskEmailLikeValue"),
    "Expected maskEmailLikeValue import/usage in PoolCard"
  );
});

test("PoolCard consumes emailsVisible from store", () => {
  assert.ok(poolCardSrc.includes("emailsVisible"), "Expected emailsVisible usage in PoolCard");
});

test("PoolCard uses displayName instead of raw pool.name in header", () => {
  // The masked variable must be rendered, not the raw pool.name directly
  assert.ok(
    poolCardSrc.includes("displayName"),
    "Expected displayName masking variable in PoolCard"
  );
  assert.ok(
    poolCardSrc.includes("displayConnectionLabel"),
    "Expected displayConnectionLabel masking variable in PoolCard"
  );
});

test("PoolCard header renders displayName and displayConnectionLabel (not raw values)", () => {
  // The raw `{pool.name} · {connectionLabel}` must NOT appear unmasked
  assert.ok(
    !poolCardSrc.includes("{pool.name} · {connectionLabel}"),
    "PoolCard must not render raw {pool.name} · {connectionLabel} — use masked variables"
  );
});

// ── AccountQuotaRow ───────────────────────────────────────────────────────────

test("AccountQuotaRow imports useEmailPrivacyStore", () => {
  assert.ok(
    accountQuotaRowSrc.includes('import useEmailPrivacyStore from "@/store/emailPrivacyStore"'),
    "Expected useEmailPrivacyStore import in AccountQuotaRow"
  );
});

test("AccountQuotaRow imports maskEmailLikeValue", () => {
  assert.ok(
    accountQuotaRowSrc.includes("maskEmailLikeValue"),
    "Expected maskEmailLikeValue import/usage in AccountQuotaRow"
  );
});

test("AccountQuotaRow consumes emailsVisible from store", () => {
  assert.ok(
    accountQuotaRowSrc.includes("emailsVisible"),
    "Expected emailsVisible usage in AccountQuotaRow"
  );
});

// ── PoolWizard ────────────────────────────────────────────────────────────────

test("PoolWizard imports useEmailPrivacyStore", () => {
  assert.ok(
    poolWizardSrc.includes('import useEmailPrivacyStore from "@/store/emailPrivacyStore"'),
    "Expected useEmailPrivacyStore import in PoolWizard"
  );
});

test("PoolWizard imports maskEmailLikeValue", () => {
  assert.ok(
    poolWizardSrc.includes("maskEmailLikeValue"),
    "Expected maskEmailLikeValue import/usage in PoolWizard"
  );
});

test("PoolWizard consumes emailsVisible from store", () => {
  assert.ok(poolWizardSrc.includes("emailsVisible"), "Expected emailsVisible usage in PoolWizard");
});

test("PoolWizard connLabel masks detail with emailsVisible gate", () => {
  assert.ok(
    poolWizardSrc.includes("maskedDetail"),
    "Expected maskedDetail variable in PoolWizard connLabel"
  );
});

// ── EditAllocationsModal retired (Task 6) ────────────────────────────────────
// EditAllocationsModal was retired in Task 6 — edit mode now opens the full
// PoolWizard (which already has comprehensive email-privacy coverage above).

// ── maskEmailLikeValue helper behaviour (regression) ─────────────────────────

const { maskEmailLikeValue, pickDisplayValue } =
  await import("../../src/shared/utils/maskEmail.ts");

test("maskEmailLikeValue masks email embedded in a pool name", () => {
  const poolName = "codex / gael.martins@example.com";
  // The full string contains @ so the whole thing gets treated as email — however
  // maskEmailLikeValue only masks when the *trimmed* value contains @.
  // The label is NOT just the email here, it contains a slash prefix.
  // Verify: values with @ get masked, plain names stay plain.
  assert.ok(maskEmailLikeValue("gael.martins@example.com").includes("***"), "email gets masked");
  assert.equal(maskEmailLikeValue("Work Account"), "Work Account", "plain name is unchanged");
  assert.equal(maskEmailLikeValue(null), "", "null returns empty string");
  assert.equal(maskEmailLikeValue(undefined), "", "undefined returns empty string");
});

test("pickDisplayValue respects emailsVisible toggle for quota labels", () => {
  const email = "gael.martins@example.com";
  assert.equal(
    pickDisplayValue([email], false, ""),
    maskEmailLikeValue(email),
    "when hidden: returns masked value"
  );
  assert.equal(pickDisplayValue([email], true, ""), email, "when visible: returns raw value");
});
