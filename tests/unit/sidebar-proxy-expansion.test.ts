import assert from "node:assert/strict";
import test from "node:test";

import {
  HIDEABLE_SIDEBAR_ITEM_IDS,
  SIDEBAR_SECTIONS,
  getSectionItems,
  normalizeHiddenSidebarItems,
  type SidebarSectionId,
} from "../../src/shared/constants/sidebarVisibility.ts";
import {
  expandActiveSection,
  hydrateExpandedSections,
  toggleExpandedSection,
} from "../../src/shared/utils/sidebarExpansionState.ts";

test("proxy navigation is always present and cannot be hidden by legacy settings", () => {
  const omniProxy = SIDEBAR_SECTIONS.find((section) => section.id === "omni-proxy");
  assert.ok(omniProxy);
  assert.ok(getSectionItems(omniProxy).some((item) => item.id === "proxy"));
  assert.equal((HIDEABLE_SIDEBAR_ITEM_IDS as readonly string[]).includes("proxy"), false);
  assert.deepEqual(normalizeHiddenSidebarItems(["proxy", "logs"]), ["logs"]);
});

test("opening another section closes all unpinned siblings", () => {
  const expanded = new Set<SidebarSectionId>(["omni-proxy", "analytics"]);
  const next = toggleExpandedSection(expanded, new Set(), "configuration");
  assert.deepEqual([...next], ["configuration"]);
});

test("hydration preserves a stored all-collapsed state", () => {
  const expanded = hydrateExpandedSections([], new Set());
  assert.deepEqual([...expanded], []);
});

test("hydration expands only sections explicitly pinned by the user", () => {
  const expanded = hydrateExpandedSections([], new Set<SidebarSectionId>(["monitoring"]));
  assert.deepEqual([...expanded], ["monitoring"]);
});

test("route changes replace stale unpinned sections but retain explicit pins", () => {
  const pinned = new Set<SidebarSectionId>(["configuration"]);
  const next = expandActiveSection(pinned, "monitoring");
  assert.deepEqual([...next], ["configuration", "monitoring"]);
});
