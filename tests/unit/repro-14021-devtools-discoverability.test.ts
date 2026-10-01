// Repro for issue #14021: Playground/Translator/Search Tools (the "Dev Tools" sidebar
// group) are gated behind Debug Mode, but nothing in the UI says so, and Settings →
// Sidebar applies the exact same debug filter — so with debug off there is no toggle for
// Playground at all and no explanation. This test exercises the SAME filter predicate
// both Sidebar.tsx (:277) and SidebarTab.tsx (:470) apply to `SIDEBAR_SECTIONS`, using the
// real section/item config, and proves that with debugMode=false the "playground" item is
// completely absent from what either surface would render — matching the issue's
// acceptance criterion ("with debug off, Settings -> Sidebar either lists Playground or
// explains why it cannot be toggled").
import test from "node:test";
import assert from "node:assert/strict";

const sidebarVisibility = await import("../../src/shared/constants/sidebarVisibility.ts");

function visibleItemIdsWithDebug(showDebug: boolean): string[] {
  // This is exactly the predicate used in:
  //   src/shared/components/Sidebar.tsx:277
  //   src/app/(dashboard)/dashboard/settings/components/SidebarTab.tsx:470
  const visibleSections = sidebarVisibility.SIDEBAR_SECTIONS.filter(
    (section) => section.visibility !== "debug" || showDebug
  );
  const ids: string[] = [];
  for (const section of visibleSections) {
    for (const item of sidebarVisibility.getSectionItems(section)) {
      ids.push(item.id);
    }
  }
  return ids;
}

test("issue #14021: devtools section is not debug-gated in config", () => {
  const devtools = sidebarVisibility.SIDEBAR_SECTIONS.find((s) => s.id === "devtools");
  assert.ok(devtools, "expected a 'devtools' sidebar section to exist");
  assert.notEqual(
    devtools!.visibility,
    "debug",
    "the devtools section must not be gated behind debugMode, per fix for #14021"
  );
});

test("issue #14021: with debugMode=false, Playground is discoverable in both the Sidebar and Settings->Sidebar", () => {
  const idsDebugOff = visibleItemIdsWithDebug(false);
  const idsDebugOn = visibleItemIdsWithDebug(true);

  // Sanity: Playground DOES exist and IS reachable once debug is on (proves it's not a
  // typo/missing-id issue).
  assert.ok(
    idsDebugOn.includes("playground"),
    "expected 'playground' to be a real, resolvable sidebar item when debugMode=true"
  );

  // The fix: playground is a normal hideable item
  // (HIDEABLE_SIDEBAR_ITEM_IDS includes "playground" — sidebarVisibility/types.ts:79) and
  // now appears with debug off too, satisfying the issue's acceptance criterion.
  assert.ok(
    idsDebugOff.includes("playground"),
    "FIX #14021: with debugMode=false, 'playground' item should be discoverable from " +
      "every sidebar-derived surface (main Sidebar AND Settings->Sidebar)."
  );
});
