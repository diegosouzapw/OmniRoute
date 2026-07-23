/**
 * Phase D3 — Multi-connection pool wizard tests.
 *
 * Tests cover:
 *  1. PoolCreateSchema accepts/rejects connectionIds combinations
 *  2. Structural assertions on PoolWizard.tsx (multi-select, POST body, step-3 preview)
 *  3. i18n parity: new wizard keys exist in both locales
 *
 * Node native test runner — no JSdom needed (pure schema + source analysis).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { PoolCreateSchema } from "../../src/shared/schemas/quota.js";

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

const EN_PATH = path.join(ROOT, "src", "i18n", "messages", "en.json");
const PT_PATH = path.join(ROOT, "src", "i18n", "messages", "pt-BR.json");

const wizardSrc = fs.readFileSync(WIZARD_PATH, "utf-8");
const en = JSON.parse(fs.readFileSync(EN_PATH, "utf-8")) as { quotaShare: Record<string, string> };
const pt = JSON.parse(fs.readFileSync(PT_PATH, "utf-8")) as { quotaShare: Record<string, string> };

// ── PoolCreateSchema: connectionIds field ─────────────────────────────────────

test("PoolCreateSchema accepts multi-connection input when primary is a member", () => {
  const result = PoolCreateSchema.safeParse({
    connectionId: "a",
    connectionIds: ["a", "b"],
    name: "x",
    allocations: [],
  });
  assert.ok(result.success, `Expected success, got: ${result.error?.message}`);
  if (result.success) {
    assert.deepEqual(result.data.connectionIds, ["a", "b"]);
    assert.equal(result.data.connectionId, "a");
  }
});

test("PoolCreateSchema rejects when primary connectionId is NOT in connectionIds", () => {
  const result = PoolCreateSchema.safeParse({
    connectionId: "z",
    connectionIds: ["a", "b"],
    name: "x",
    allocations: [],
  });
  assert.equal(result.success, false, "Expected refine to reject when primary not in connectionIds");
  const msg = result.error?.issues[0]?.message ?? "";
  assert.ok(
    msg.includes("primary connectionId must be one of connectionIds"),
    `Expected refine message, got: "${msg}"`
  );
});

test("PoolCreateSchema accepts single-connection input without connectionIds (back-compat)", () => {
  const result = PoolCreateSchema.safeParse({ connectionId: "c", name: "Pool" });
  assert.ok(result.success, `Expected success, got: ${result.error?.message}`);
  if (result.success) {
    assert.equal(result.data.connectionIds, undefined);
    assert.equal(result.data.connectionId, "c");
  }
});

test("PoolCreateSchema rejects empty connectionIds array", () => {
  const result = PoolCreateSchema.safeParse({
    connectionId: "a",
    connectionIds: [],
    name: "x",
    allocations: [],
  });
  assert.equal(result.success, false, "Expected failure for empty connectionIds");
});

test("PoolCreateSchema accepts connectionIds with single element matching connectionId", () => {
  const result = PoolCreateSchema.safeParse({
    connectionId: "solo",
    connectionIds: ["solo"],
    name: "solo pool",
    allocations: [],
  });
  assert.ok(result.success, `Expected success, got: ${result.error?.message}`);
});

// ── PoolWizard.tsx structural assertions ──────────────────────────────────────

test("PoolWizard.tsx: connectionIds state is defined (multi-select)", () => {
  assert.ok(
    wizardSrc.includes("connectionIds"),
    "Expected connectionIds state in PoolWizard"
  );
  assert.ok(
    wizardSrc.includes("useState<string[]>([])"),
    "Expected connectionIds initialized as string[] state"
  );
});

test("PoolWizard.tsx: renders checkboxes for connection selection in step 1", () => {
  assert.ok(
    wizardSrc.includes('type="checkbox"'),
    "Expected checkbox inputs in step 1 for multi-connection selection"
  );
});

test("PoolWizard.tsx: primaryConnectionId is derived from connectionIds[0]", () => {
  assert.ok(
    wizardSrc.includes("primaryConnectionId = connectionIds[0]"),
    "Expected primaryConnectionId derived from connectionIds[0]"
  );
});

test("PoolWizard.tsx: POST body sends both connectionId and connectionIds", () => {
  assert.ok(
    wizardSrc.includes("connectionId: primaryConnectionId"),
    "Expected connectionId: primaryConnectionId in POST body"
  );
  assert.ok(
    wizardSrc.includes("connectionIds,"),
    "Expected connectionIds spread in POST body"
  );
});

test("PoolWizard.tsx: step-3 preview maps over connectionIds (previewByProvider)", () => {
  assert.ok(
    wizardSrc.includes("previewByProvider"),
    "Expected previewByProvider useMemo in PoolWizard"
  );
  // Prettier (100-char width, project config) breaks a `connectionIds.map(...).filter(...)`
  // chain with a multi-line callback onto separate lines — `connectionIds` and `.map((cid)`
  // land on different lines. Match across that line break instead of a rigid single-line
  // substring so this assertion tracks the chain regardless of how Prettier wraps it.
  assert.match(
    wizardSrc,
    /connectionIds\s*\.map\(\(cid\)/,
    "Expected connectionIds.map to build per-provider preview"
  );
});

test("PoolWizard.tsx: step-2 shows additional connections note when multiple selected", () => {
  assert.ok(
    wizardSrc.includes("wizardAdditionalConnectionsNote"),
    "Expected wizardAdditionalConnectionsNote i18n key in step 2"
  );
  assert.ok(
    wizardSrc.includes("connectionIds.length > 1"),
    "Expected guard connectionIds.length > 1 for the note"
  );
});

test("PoolWizard.tsx: primary badge rendered for first selected connection", () => {
  assert.ok(
    wizardSrc.includes("wizardPrimaryBadge"),
    "Expected wizardPrimaryBadge i18n key in step 1 checkbox list"
  );
});

// ── i18n parity: new wizard keys ─────────────────────────────────────────────

const NEW_KEYS = [
  "wizardConnectionsLabel",
  "wizardPrimaryBadge",
  "wizardAdditionalConnectionsNote",
  "wizardPreviewMoreModels",
];

for (const key of NEW_KEYS) {
  test(`i18n en.json has key quotaShare.${key}`, () => {
    assert.ok(
      Object.prototype.hasOwnProperty.call(en.quotaShare, key),
      `en.json missing quotaShare.${key}`
    );
    assert.equal(typeof en.quotaShare[key], "string", `quotaShare.${key} must be a string in en.json`);
    assert.ok(en.quotaShare[key].length > 0, `quotaShare.${key} must not be empty in en.json`);
  });

  test(`i18n pt-BR.json has key quotaShare.${key}`, () => {
    assert.ok(
      Object.prototype.hasOwnProperty.call(pt.quotaShare, key),
      `pt-BR.json missing quotaShare.${key}`
    );
    assert.equal(typeof pt.quotaShare[key], "string", `quotaShare.${key} must be a string in pt-BR.json`);
    assert.ok(pt.quotaShare[key].length > 0, `quotaShare.${key} must not be empty in pt-BR.json`);
  });
}

test("QuotaSharePageClient wires the multi-provider icons (providers prop is passed, not dead code)", () => {
  const pageClientPath = path.join(
    ROOT,
    "src",
    "app",
    "(dashboard)",
    "dashboard",
    "costs",
    "quota-share",
    "QuotaSharePageClient.tsx"
  );
  const src = fs.readFileSync(pageClientPath, "utf8");
  // The PoolCard providers prop must actually be populated by the parent from
  // the pool's connectionIds — otherwise the multi-provider icon row never renders.
  assert.ok(src.includes("providers={"), "parent must pass a providers prop to the card");
  assert.ok(
    /connectionIds\s*\?\?\s*\[pool\.connectionId\]/.test(src),
    "providers must be derived from pool.connectionIds (falling back to the primary)"
  );
});

test("i18n parity: all quotaShare.wizard* keys are in sync between en and pt-BR", () => {
  const enWizardKeys = Object.keys(en.quotaShare)
    .filter((k) => k.startsWith("wizard"))
    .sort();
  const ptWizardKeys = Object.keys(pt.quotaShare)
    .filter((k) => k.startsWith("wizard"))
    .sort();
  assert.deepEqual(
    enWizardKeys,
    ptWizardKeys,
    `wizard* key parity mismatch.\nen: ${JSON.stringify(enWizardKeys)}\npt: ${JSON.stringify(ptWizardKeys)}`
  );
});
