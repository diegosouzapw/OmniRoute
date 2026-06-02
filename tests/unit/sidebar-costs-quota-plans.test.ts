/**
 * Phase C2 — Plans screen retired (unified into PoolWizard Step 2).
 * These tests verify the sidebar entry is gone and the costs section
 * still has the correct remaining items.
 */
import test from "node:test";
import assert from "node:assert/strict";

const sidebarVisibility = await import("../../src/shared/constants/sidebarVisibility.ts");

function sectionItems(sectionId: string) {
  const section = sidebarVisibility.SIDEBAR_SECTIONS.find((s) => s.id === sectionId);
  assert.ok(section, `expected section "${sectionId}" to exist`);
  return sidebarVisibility.getSectionItems(section);
}

test("HIDEABLE_SIDEBAR_ITEM_IDS does NOT contain costs-quota-plans (retired)", () => {
  assert.ok(
    !(sidebarVisibility.HIDEABLE_SIDEBAR_ITEM_IDS as readonly string[]).includes("costs-quota-plans"),
    "costs-quota-plans must have been removed from HIDEABLE_SIDEBAR_ITEM_IDS"
  );
});

test("costs section does not include costs-quota-plans item (retired)", () => {
  const items = sectionItems("costs");
  const ids = items.map((i) => i.id);
  assert.ok(!ids.includes("costs-quota-plans"), "costs section must NOT include costs-quota-plans");
});

test("costs section does NOT contain costs-quota-share (removed from section, kept in HIDEABLE list)", () => {
  const items = sectionItems("costs");
  const ids = items.map((i) => i.id);
  assert.ok(!ids.includes("costs-quota-share"), "costs-quota-share was removed from section children");
});
