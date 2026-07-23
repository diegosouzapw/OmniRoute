/**
 * Structure tests for the 3-step Pool Wizard (Phase C1).
 *
 * These assertions intentionally read the source files as text to verify:
 *   - PoolWizard.tsx contains all 3 wizard steps
 *   - The PATCH body includes the `exclusive` flag
 *   - quotaModelName is imported for the preview
 *   - QuotaSharePageClient mounts <PoolWizard
 *
 * Node native test runner (no JSdom needed — pure source analysis).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

const WIZARD_PATH = path.join(
  ROOT,
  "src",
  "app",
  "(dashboard)",
  "dashboard",
  "costs",
  "quota-share",
  "components",
  "PoolWizard.tsx"
);

const PAGE_CLIENT_PATH = path.join(
  ROOT,
  "src",
  "app",
  "(dashboard)",
  "dashboard",
  "costs",
  "quota-share",
  "QuotaSharePageClient.tsx"
);

const wizardSrc = fs.readFileSync(WIZARD_PATH, "utf-8");
const pageClientSrc = fs.readFileSync(PAGE_CLIENT_PATH, "utf-8");

// ── PoolWizard.tsx assertions ─────────────────────────────────────────────────

test("PoolWizard.tsx: step 1 (Conta) is present", () => {
  assert.ok(
    wizardSrc.includes("step === 1"),
    "Expected step === 1 block for Conta step"
  );
});

test("PoolWizard.tsx: step 2 (Limite) is present", () => {
  assert.ok(
    wizardSrc.includes("step === 2"),
    "Expected step === 2 block for Limite step"
  );
});

test("PoolWizard.tsx: step 3 (Chaves) is present", () => {
  assert.ok(
    wizardSrc.includes("step === 3"),
    "Expected step === 3 block for Chaves step"
  );
});

test("PoolWizard.tsx: PATCH body includes the exclusive flag", () => {
  assert.ok(
    wizardSrc.includes("exclusive"),
    "Expected 'exclusive' to appear in PoolWizard (PATCH body)"
  );
  // More specifically, the PATCH body object literal must pass exclusive
  assert.ok(
    wizardSrc.includes("body: JSON.stringify({ allocations, exclusive })"),
    "Expected PATCH body to serialize { allocations, exclusive }"
  );
});

test("PoolWizard.tsx: quotaModelName is imported from quotaModelNaming", () => {
  assert.ok(
    wizardSrc.includes("quotaModelName"),
    "Expected quotaModelName import in PoolWizard"
  );
  assert.ok(
    wizardSrc.includes("from \"@/lib/quota/quotaModelNaming\"") ||
      wizardSrc.includes("from '@/lib/quota/quotaModelNaming'"),
    "Expected import from @/lib/quota/quotaModelNaming"
  );
});

test("PoolWizard.tsx: preview section renders quotaModelName output", () => {
  assert.ok(
    wizardSrc.includes("previewNames"),
    "Expected previewNames variable used in the preview section"
  );
});

test("PoolWizard.tsx: save sequence does POST then conditional PUT then PATCH", () => {
  const postIdx = wizardSrc.indexOf('method: "POST"');
  const putIdx = wizardSrc.indexOf('method: "PUT"');
  const patchIdx = wizardSrc.indexOf('method: "PATCH"');

  assert.ok(postIdx !== -1, "Expected POST /api/quota/pools in PoolWizard");
  assert.ok(putIdx !== -1, "Expected PUT /api/quota/plans/[id] in PoolWizard");
  assert.ok(patchIdx !== -1, "Expected PATCH /api/quota/pools/[id] in PoolWizard");

  // POST must come before PUT and PATCH in the file
  assert.ok(postIdx < putIdx, "POST must appear before PUT in handleFinish");
  assert.ok(putIdx < patchIdx, "PUT must appear before PATCH in handleFinish");
});

test("PoolWizard.tsx: Stepper renders 3-step header", () => {
  assert.ok(
    wizardSrc.includes("Stepper"),
    "Expected a Stepper component in PoolWizard"
  );
  assert.ok(
    wizardSrc.includes("wizardStep1Label"),
    "Expected wizardStep1Label i18n key used"
  );
  assert.ok(
    wizardSrc.includes("wizardStep2Label"),
    "Expected wizardStep2Label i18n key used"
  );
  assert.ok(
    wizardSrc.includes("wizardStep3Label"),
    "Expected wizardStep3Label i18n key used"
  );
});

test("PoolWizard.tsx: plan dimensions editor uses UNIT_OPTIONS and WINDOW_OPTIONS", () => {
  assert.ok(
    wizardSrc.includes("UNIT_OPTIONS"),
    "Expected UNIT_OPTIONS constant for the dimensions unit select"
  );
  assert.ok(
    wizardSrc.includes("WINDOW_OPTIONS"),
    "Expected WINDOW_OPTIONS constant for the dimensions window select"
  );
});

test("PoolWizard.tsx: dimensions are only saved when user edited them (dimensionsEdited flag)", () => {
  assert.ok(
    wizardSrc.includes("dimensionsEdited"),
    "Expected dimensionsEdited guard before PUT /api/quota/plans"
  );
});

test("PoolWizard.tsx: exclusive checkbox is rendered in step 3", () => {
  assert.ok(
    wizardSrc.includes('type="checkbox"'),
    "Expected a checkbox input for exclusive flag in step 3"
  );
  assert.ok(
    wizardSrc.includes("wizardExclusiveLabel"),
    "Expected wizardExclusiveLabel i18n key for the exclusive checkbox"
  );
});

// ── QuotaSharePageClient.tsx assertions ───────────────────────────────────────

test("QuotaSharePageClient.tsx: imports PoolWizard (not CreatePoolModal)", () => {
  assert.ok(
    pageClientSrc.includes("import PoolWizard"),
    "Expected PoolWizard import in QuotaSharePageClient"
  );
  assert.ok(
    !pageClientSrc.includes("import CreatePoolModal"),
    "CreatePoolModal should no longer be imported in QuotaSharePageClient"
  );
});

test("QuotaSharePageClient.tsx: mounts <PoolWizard", () => {
  assert.ok(
    pageClientSrc.includes("<PoolWizard"),
    "Expected <PoolWizard mount in QuotaSharePageClient JSX"
  );
});

test("QuotaSharePageClient.tsx: passes open/onClose/onSaved/connections/apiKeys/plans/existingPoolConnectionIds to PoolWizard", () => {
  assert.ok(pageClientSrc.includes("open={createOpen}"), "Expected open prop");
  assert.ok(pageClientSrc.includes("onClose="), "Expected onClose prop");
  assert.ok(pageClientSrc.includes("onSaved="), "Expected onSaved prop");
  assert.ok(pageClientSrc.includes("connections={connections}"), "Expected connections prop");
  assert.ok(pageClientSrc.includes("apiKeys={apiKeys}"), "Expected apiKeys prop");
  assert.ok(pageClientSrc.includes("plans={plans}"), "Expected plans prop");
  assert.ok(
    pageClientSrc.includes("existingPoolConnectionIds="),
    "Expected existingPoolConnectionIds prop"
  );
});

test("QuotaSharePageClient.tsx: EditAllocationsModal is NOT present (retired Task 6 — edit uses PoolWizard)", () => {
  // Task 6 replaced EditAllocationsModal with a second PoolWizard instance for editing.
  assert.ok(
    !pageClientSrc.includes("EditAllocationsModal"),
    "EditAllocationsModal must not appear in QuotaSharePageClient — edit mode uses PoolWizard"
  );
  // The editing pool must be wired to a PoolWizard via editPool prop
  assert.ok(
    pageClientSrc.includes("editPool={editing"),
    "Expected editPool={editing...} passed to PoolWizard for edit mode"
  );
});
