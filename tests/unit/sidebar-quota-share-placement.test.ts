/**
 * tests/unit/sidebar-quota-share-placement.test.ts
 *
 * Task 3 — source-scan assertions for Quota Share nav item placement.
 *
 * Asserts that `costs-quota-share` sits immediately after `quota` (Provider Quota)
 * in the SAME array, and is no longer in the costs section array.
 *
 * Pattern mirrors: tests/unit/quota-groups-ui.test.ts (readFileSync style)
 *
 * Source location: the nav-item id definitions live in
 * `src/shared/constants/sidebarVisibility/sections.ts` (extracted from the
 * former monolithic `sidebarVisibility.ts` in the D1 god-file split, #5683).
 *
 * Node.js native test runner — no DOM setup required.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const SIDEBAR_PATH = join(ROOT, "src/shared/constants/sidebarVisibility/sections.ts");

const src = readFileSync(SIDEBAR_PATH, "utf8");

// ── Placement order: costs-quota-share must come AFTER quota ─────────────────

test("sidebar: costs-quota-share appears after quota in source", () => {
  const idxQuota = src.indexOf('id: "quota"');
  const idxQuotaShare = src.indexOf('id: "costs-quota-share"');
  assert.ok(idxQuota >= 0, 'Could not find id: "quota" in sidebarVisibility.ts');
  assert.ok(idxQuotaShare >= 0, 'Could not find id: "costs-quota-share" in sidebarVisibility.ts');
  assert.ok(
    idxQuotaShare > idxQuota,
    `costs-quota-share (idx ${idxQuotaShare}) must appear AFTER quota (idx ${idxQuota})`
  );
});

// ── Same array: no array-close ]; between quota and costs-quota-share ─────────

test("sidebar: no array close ]; between quota and costs-quota-share (same array)", () => {
  const idxQuota = src.indexOf('id: "quota"');
  const idxQuotaShare = src.indexOf('id: "costs-quota-share"');
  assert.ok(idxQuota >= 0, 'Could not find id: "quota"');
  assert.ok(idxQuotaShare >= 0, 'Could not find id: "costs-quota-share"');
  const between = src.slice(idxQuota, idxQuotaShare);
  assert.ok(
    !between.includes("];"),
    `There must be NO array-close ]; between quota and costs-quota-share. Found one, meaning they are in different arrays.\nSlice between them:\n${between}`
  );
});

// ── Costs section no longer contains costs-quota-share ───────────────────────

test("sidebar: costs section does not have costs-quota-share right after costs-budget", () => {
  // costs-budget and costs-quota-share should NOT be close neighbours (within 200 chars)
  const idxBudget = src.indexOf('id: "costs-budget"');
  const idxQuotaShare = src.indexOf('id: "costs-quota-share"');
  assert.ok(idxBudget >= 0, 'Could not find id: "costs-budget"');
  assert.ok(idxQuotaShare >= 0, 'Could not find id: "costs-quota-share"');
  const gap = Math.abs(idxQuotaShare - idxBudget);
  assert.ok(
    gap > 200,
    `costs-quota-share must NOT be immediately after costs-budget in the costs section (gap: ${gap} chars, expected > 200)`
  );
});

// ── Exactly one occurrence of costs-quota-share ───────────────────────────────

test("sidebar: exactly one occurrence of costs-quota-share", () => {
  const occurrences = src.split('id: "costs-quota-share"').length - 1;
  assert.equal(
    occurrences,
    1,
    `Expected exactly 1 occurrence of id: "costs-quota-share", found ${occurrences}`
  );
});
