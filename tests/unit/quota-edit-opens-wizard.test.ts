/**
 * tests/unit/quota-edit-opens-wizard.test.ts
 *
 * Task 6 — source-scan assertions for:
 *   1. QuotaSharePageClient no longer imports or renders EditAllocationsModal.
 *   2. The `editing` pool is wired to a <PoolWizard via editPool prop.
 *   3. editPoolExclusive is computed from apiKeys.allowedQuotas and passed through.
 *   4. PoolWizard pre-fill uses editPoolExclusive (not a hard-coded false).
 *
 * Node native test runner — pure source analysis, no DOM needed.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

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

const pageSrc = fs.readFileSync(PAGE_CLIENT_PATH, "utf-8");
const wizardSrc = fs.readFileSync(WIZARD_PATH, "utf-8");

// ── QuotaSharePageClient: EditAllocationsModal must be gone ───────────────────

test("QuotaSharePageClient: does NOT import EditAllocationsModal", () => {
  assert.ok(
    !pageSrc.includes("EditAllocationsModal"),
    "EditAllocationsModal must not appear in QuotaSharePageClient (retired Task 6)"
  );
});

// ── QuotaSharePageClient: editing pool wired to PoolWizard ────────────────────

test("QuotaSharePageClient: passes editing pool as editPool= to PoolWizard", () => {
  assert.ok(
    pageSrc.includes("editPool={editing"),
    "Expected editPool={editing...} prop on the edit PoolWizard instance"
  );
});

test("QuotaSharePageClient: opens edit wizard when editing is set (open={!!editing})", () => {
  assert.ok(
    pageSrc.includes("open={!!editing}"),
    "Expected open={!!editing} on the edit PoolWizard instance"
  );
});

// ── QuotaSharePageClient: editingExclusive computed and passed ────────────────

test("QuotaSharePageClient: computes editingExclusive from allowedQuotas", () => {
  assert.ok(
    pageSrc.includes("editingExclusive"),
    "Expected editingExclusive to be defined in QuotaSharePageClient"
  );
  assert.ok(
    pageSrc.includes("allowedQuotas"),
    "Expected allowedQuotas referenced in editingExclusive computation"
  );
});

test("QuotaSharePageClient: passes editPoolExclusive={editingExclusive} to edit PoolWizard", () => {
  assert.ok(
    pageSrc.includes("editPoolExclusive={editingExclusive}"),
    "Expected editPoolExclusive={editingExclusive} on the edit PoolWizard instance"
  );
});

test("QuotaSharePageClient: editingExclusive requires >=1 allocation", () => {
  // The guard `editing.allocations.length > 0` must be present
  assert.ok(
    pageSrc.includes("allocations.length > 0"),
    "Expected allocations.length > 0 guard in editingExclusive"
  );
});

test("QuotaSharePageClient: editingExclusive checks every allocated key has pool id in allowedQuotas", () => {
  assert.ok(
    pageSrc.includes("aq.includes(editing.id)"),
    "Expected aq.includes(editing.id) check in editingExclusive"
  );
});

// ── PoolWizard: editPoolExclusive prop declared and used ─────────────────────

test("PoolWizard.tsx: declares editPoolExclusive prop in PoolWizardProps", () => {
  assert.ok(
    wizardSrc.includes("editPoolExclusive?"),
    "Expected editPoolExclusive? field in PoolWizardProps"
  );
});

test("PoolWizard.tsx: pre-fill uses editPoolExclusive ?? false (not setExclusive(false))", () => {
  // The old hard-coded false must be replaced by the prop
  assert.ok(
    wizardSrc.includes("editPoolExclusive ?? false"),
    "Expected setExclusive(editPoolExclusive ?? false) in PoolWizard pre-fill"
  );
  // The literal `setExclusive(false)` must NOT appear in the edit-mode pre-fill block
  // (it may still appear in the close-reset block, which is correct)
  const editFillIdx = wizardSrc.indexOf("} else if (editPool)");
  assert.ok(editFillIdx >= 0, "Expected '} else if (editPool)' block in PoolWizard");
  const closingBrace = wizardSrc.indexOf("\n    }", editFillIdx);
  const editFillBlock = wizardSrc.slice(editFillIdx, closingBrace > 0 ? closingBrace + 6 : editFillIdx + 1200);
  assert.ok(
    !editFillBlock.includes("setExclusive(false)"),
    "setExclusive(false) must not appear in the editPool pre-fill block — must use editPoolExclusive"
  );
});
