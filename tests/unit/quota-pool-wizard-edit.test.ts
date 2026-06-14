/**
 * Structure tests for PoolWizard editPool mode (Task 5 — Phase C1).
 *
 * Source-scan style, mirroring quota-pool-wizard.test.ts.
 * No JSdom needed — pure text analysis of the source file.
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

const EN_JSON_PATH = path.join(ROOT, "src", "i18n", "messages", "en.json");
const PT_BR_JSON_PATH = path.join(ROOT, "src", "i18n", "messages", "pt-BR.json");

const wizardSrc = fs.readFileSync(WIZARD_PATH, "utf-8");
const enJson = JSON.parse(fs.readFileSync(EN_JSON_PATH, "utf-8")) as Record<string, unknown>;
const ptBrJson = JSON.parse(fs.readFileSync(PT_BR_JSON_PATH, "utf-8")) as Record<string, unknown>;

// ── PoolWizardProps: editPool field ───────────────────────────────────────────

test("PoolWizard.tsx: declares editPool in PoolWizardProps", () => {
  assert.ok(
    wizardSrc.includes("editPool?"),
    "Expected optional editPool field in PoolWizardProps"
  );
});

test("PoolWizard.tsx: imports QuotaPool type", () => {
  assert.ok(
    wizardSrc.includes("QuotaPool"),
    "Expected QuotaPool type to be referenced in PoolWizard"
  );
});

// ── Submit handler branching ──────────────────────────────────────────────────

test("PoolWizard.tsx: submit handler contains a PATCH to /api/quota/pools/ (edit branch)", () => {
  assert.ok(
    wizardSrc.includes("PATCH") && wizardSrc.includes("/api/quota/pools/"),
    "Expected PATCH call to /api/quota/pools/ in PoolWizard"
  );
});

test("PoolWizard.tsx: submit handler still contains a POST to /api/quota/pools (create branch)", () => {
  assert.ok(
    wizardSrc.includes('method: "POST"') && wizardSrc.includes("/api/quota/pools"),
    "Expected POST call to /api/quota/pools in PoolWizard (create branch must remain)"
  );
});

test("PoolWizard.tsx: submit handler branches on editPool", () => {
  assert.ok(
    wizardSrc.includes("editPool"),
    "Expected editPool to appear in PoolWizard source (branching in submit)"
  );
  // The branching condition inside handleFinish
  assert.ok(
    wizardSrc.includes("if (editPool)"),
    "Expected if (editPool) branch in handleFinish"
  );
});

// ── Pre-fill references ───────────────────────────────────────────────────────

test("PoolWizard.tsx: pre-fills pool name from editPool.name", () => {
  assert.ok(
    wizardSrc.includes("editPool.name"),
    "Expected editPool.name used for pre-filling pool name"
  );
});

test("PoolWizard.tsx: pre-fills allocations from editPool.allocations", () => {
  assert.ok(
    wizardSrc.includes("editPool.allocations"),
    "Expected editPool.allocations used for pre-filling allocations"
  );
});

test("PoolWizard.tsx: pre-fills connectionIds using editPool.connectionIds and editPool.connectionId", () => {
  assert.ok(
    wizardSrc.includes("editPool.connectionIds"),
    "Expected editPool.connectionIds referenced in pre-fill logic"
  );
  assert.ok(
    wizardSrc.includes("editPool.connectionId"),
    "Expected editPool.connectionId referenced as fallback in pre-fill logic"
  );
});

test("PoolWizard.tsx: pre-fills groupId from editPool.groupId", () => {
  assert.ok(
    wizardSrc.includes("editPool.groupId"),
    "Expected editPool.groupId used for pre-filling group selector"
  );
});

// ── i18n key usage ────────────────────────────────────────────────────────────

test("PoolWizard.tsx: uses t(\"saveChanges\") for the submit button in edit mode", () => {
  assert.ok(
    wizardSrc.includes('t("saveChanges")'),
    "Expected t(\"saveChanges\") used in submit button (edit mode)"
  );
});

test("PoolWizard.tsx: uses t(\"editPoolTitle\") for the modal title in edit mode", () => {
  assert.ok(
    wizardSrc.includes('t("editPoolTitle")'),
    "Expected t(\"editPoolTitle\") used in modal title (edit mode)"
  );
});

// ── i18n parity: en.json ─────────────────────────────────────────────────────

test("en.json quotaShare namespace: contains editPoolTitle key", () => {
  const quotaShare = enJson["quotaShare"] as Record<string, unknown> | undefined;
  assert.ok(quotaShare, "Expected quotaShare namespace in en.json");
  assert.ok(
    "editPoolTitle" in quotaShare,
    "Expected editPoolTitle key in en.json quotaShare namespace"
  );
  assert.equal(typeof quotaShare["editPoolTitle"], "string", "editPoolTitle must be a string");
});

test("en.json quotaShare namespace: contains saveChanges key", () => {
  const quotaShare = enJson["quotaShare"] as Record<string, unknown> | undefined;
  assert.ok(quotaShare, "Expected quotaShare namespace in en.json");
  assert.ok(
    "saveChanges" in quotaShare,
    "Expected saveChanges key in en.json quotaShare namespace"
  );
  assert.equal(typeof quotaShare["saveChanges"], "string", "saveChanges must be a string");
});

// ── i18n parity: pt-BR.json ──────────────────────────────────────────────────

test("pt-BR.json quotaShare namespace: contains editPoolTitle key", () => {
  const quotaShare = ptBrJson["quotaShare"] as Record<string, unknown> | undefined;
  assert.ok(quotaShare, "Expected quotaShare namespace in pt-BR.json");
  assert.ok(
    "editPoolTitle" in quotaShare,
    "Expected editPoolTitle key in pt-BR.json quotaShare namespace"
  );
  assert.equal(typeof quotaShare["editPoolTitle"], "string", "editPoolTitle must be a string");
});

test("pt-BR.json quotaShare namespace: contains saveChanges key", () => {
  const quotaShare = ptBrJson["quotaShare"] as Record<string, unknown> | undefined;
  assert.ok(quotaShare, "Expected quotaShare namespace in pt-BR.json");
  assert.ok(
    "saveChanges" in quotaShare,
    "Expected saveChanges key in pt-BR.json quotaShare namespace"
  );
  assert.equal(typeof quotaShare["saveChanges"], "string", "saveChanges must be a string");
});
