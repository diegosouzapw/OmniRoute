import test from "node:test";
import assert from "node:assert/strict";

const sidebarVisibility = await import("../../src/shared/constants/sidebarVisibility.ts");

function findSection(id: string) {
  return sidebarVisibility.SIDEBAR_SECTIONS.find((s) => s.id === id);
}

test("costs section exists in SIDEBAR_SECTIONS", () => {
  const section = findSection("costs");
  assert.ok(section, "costs section must exist");
});

test("costs section has exactly 6 items in the correct order", () => {
  const section = findSection("costs");
  assert.ok(section, "costs section must exist");

  const items = sidebarVisibility.getSectionItems(section);
  assert.equal(items.length, 6, "costs section must have 6 items");

  const itemIds = items.map((i) => i.id);
  assert.deepEqual(itemIds, [
    "costs",
    "costs-pricing",
    "costs-budget",
    "costs-free-tiers",
    "free-provider-rankings",
    "radar",
  ]);
});

test("costs section items have correct hrefs", () => {
  const section = findSection("costs");
  assert.ok(section, "costs section must exist");

  const items = sidebarVisibility.getSectionItems(section);
  const hrefs = items.map((i) => ({ id: i.id, href: i.href }));

  assert.deepEqual(hrefs, [
    { id: "costs", href: "/dashboard/costs" },
    { id: "costs-pricing", href: "/dashboard/costs/pricing" },
    { id: "costs-budget", href: "/dashboard/costs/budget" },
    { id: "costs-free-tiers", href: "/dashboard/free-tiers" },
    { id: "free-provider-rankings", href: "/dashboard/free-provider-rankings" },
    { id: "radar", href: "/dashboard/radar" },
  ]);
});

test("costs item uses costsOverview i18nKey (not costs)", () => {
  const section = findSection("costs");
  assert.ok(section, "costs section must exist");

  const costsItem = sidebarVisibility.getSectionItems(section).find((i) => i.id === "costs");
  assert.ok(costsItem, "costs item must exist in costs section");
  assert.equal(costsItem.i18nKey, "costsOverview");
  assert.equal(costsItem.subtitleKey, "costsOverviewSubtitle");
});

test("costs item was removed from analytics section", () => {
  const analyticsSection = findSection("analytics");
  assert.ok(analyticsSection, "analytics section must exist");

  const analyticsItems = sidebarVisibility.getSectionItems(analyticsSection);
  const analyticsItemIds = analyticsItems.map((i) => i.id);

  assert.equal(
    analyticsItemIds.includes("costs" as sidebarVisibility.HideableSidebarItemId),
    false,
    "costs item must not be in analytics section"
  );
});

test("costs section is positioned between analytics and monitoring", () => {
  const sectionIds = sidebarVisibility.SIDEBAR_SECTIONS.map((s) => s.id);
  const analyticsIdx = sectionIds.indexOf("analytics");
  const costsIdx = sectionIds.indexOf("costs");
  const monitoringIdx = sectionIds.indexOf("monitoring");

  assert.ok(analyticsIdx !== -1, "analytics section must exist");
  assert.ok(costsIdx !== -1, "costs section must exist");
  assert.ok(monitoringIdx !== -1, "monitoring section must exist");

  assert.ok(
    analyticsIdx < costsIdx,
    `analytics (${analyticsIdx}) must come before costs (${costsIdx})`
  );
  assert.ok(
    costsIdx < monitoringIdx,
    `costs (${costsIdx}) must come before monitoring (${monitoringIdx})`
  );
});

test("costs section titleKey is costsSection", () => {
  const section = findSection("costs");
  assert.ok(section, "costs section must exist");
  assert.equal(section.titleKey, "costsSection");
  assert.equal(section.titleFallback, "Costs");
});

// ---------------------------------------------------------------------------
// FIX 5 — the "radar" sidebar item must be gated on the RADAR_ENABLED feature
// flag (Sidebar.tsx has no built-in feature-flag awareness, so the item
// definition carries an opt-in `featureFlagKey`, and a small pure filter
// helper decides visibility given a resolved flags map).
// ---------------------------------------------------------------------------

test("FIX5: radar item declares featureFlagKey RADAR_ENABLED", () => {
  const section = findSection("costs");
  assert.ok(section, "costs section must exist");

  const radarItem = sidebarVisibility.getSectionItems(section).find((i) => i.id === "radar");
  assert.ok(radarItem, "radar item must exist in costs section");
  assert.equal(radarItem.featureFlagKey, "RADAR_ENABLED");
});

test("FIX5: no other costs-section item declares a featureFlagKey (no regression)", () => {
  const section = findSection("costs");
  assert.ok(section, "costs section must exist");

  const otherItems = sidebarVisibility
    .getSectionItems(section)
    .filter((i) => i.id !== "radar");

  for (const item of otherItems) {
    assert.equal(
      item.featureFlagKey,
      undefined,
      `${item.id} must not be flag-gated (unexpected regression)`
    );
  }
});

test("FIX5: isSidebarItemVisibleForFlags — flag off => item hidden", () => {
  const section = findSection("costs");
  assert.ok(section, "costs section must exist");
  const radarItem = sidebarVisibility.getSectionItems(section).find((i) => i.id === "radar")!;

  assert.equal(
    sidebarVisibility.isSidebarItemVisibleForFlags(radarItem, { RADAR_ENABLED: false }),
    false
  );
});

test("FIX5: isSidebarItemVisibleForFlags — flag on => item visible", () => {
  const section = findSection("costs");
  assert.ok(section, "costs section must exist");
  const radarItem = sidebarVisibility.getSectionItems(section).find((i) => i.id === "radar")!;

  assert.equal(
    sidebarVisibility.isSidebarItemVisibleForFlags(radarItem, { RADAR_ENABLED: true }),
    true
  );
});

test("FIX5: isSidebarItemVisibleForFlags — flag unknown (not yet loaded) fails open => visible", () => {
  const section = findSection("costs");
  assert.ok(section, "costs section must exist");
  const radarItem = sidebarVisibility.getSectionItems(section).find((i) => i.id === "radar")!;

  assert.equal(sidebarVisibility.isSidebarItemVisibleForFlags(radarItem, {}), true);
});

test("FIX5: isSidebarItemVisibleForFlags — items without featureFlagKey are always visible", () => {
  const section = findSection("costs");
  assert.ok(section, "costs section must exist");
  const costsItem = sidebarVisibility.getSectionItems(section).find((i) => i.id === "costs")!;

  assert.equal(
    sidebarVisibility.isSidebarItemVisibleForFlags(costsItem, { RADAR_ENABLED: false }),
    true
  );
});
