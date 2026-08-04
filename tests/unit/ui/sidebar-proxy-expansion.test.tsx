import { describe, expect, it } from "vitest";

import {
  HIDEABLE_SIDEBAR_ITEM_IDS,
  SIDEBAR_SECTIONS,
  getSectionItems,
  normalizeHiddenSidebarItems,
  type SidebarSectionId,
} from "../../../src/shared/constants/sidebarVisibility";
import {
  expandActiveSection,
  hydrateExpandedSections,
  toggleExpandedSection,
} from "../../../src/shared/utils/sidebarExpansionState";

describe("sidebar proxy expansion", () => {
  it("proxy navigation is always present and cannot be hidden by legacy settings", () => {
    const omniProxy = SIDEBAR_SECTIONS.find((section) => section.id === "omni-proxy");
    expect(omniProxy).toBeDefined();
    expect(getSectionItems(omniProxy!).some((item) => item.id === "proxy")).toBe(true);
    expect((HIDEABLE_SIDEBAR_ITEM_IDS as readonly string[]).includes("proxy")).toBe(false);
    expect(normalizeHiddenSidebarItems(["proxy", "logs"])).toEqual(["logs"]);
  });

  it("opening another section closes all unpinned siblings", () => {
    const expanded = new Set<SidebarSectionId>(["omni-proxy", "analytics"]);
    const next = toggleExpandedSection(expanded, new Set(), "configuration");
    expect([...next]).toEqual(["configuration"]);
  });

  it("hydration preserves a stored all-collapsed state", () => {
    const expanded = hydrateExpandedSections([], new Set());
    expect([...expanded]).toEqual([]);
  });

  it("hydration expands only sections explicitly pinned by the user", () => {
    const expanded = hydrateExpandedSections([], new Set<SidebarSectionId>(["monitoring"]));
    expect([...expanded]).toEqual(["monitoring"]);
  });

  it("route changes replace stale unpinned sections but retain explicit pins", () => {
    const pinned = new Set<SidebarSectionId>(["configuration"]);
    const next = expandActiveSection(pinned, "monitoring");
    expect([...next]).toEqual(["configuration", "monitoring"]);
  });
});
