import test from "node:test";
import assert from "node:assert/strict";

const sidebarVisibility = await import("../../src/shared/constants/sidebarVisibility.ts");

const {
  SIDEBAR_SECTIONS,
  HIDEABLE_SIDEBAR_SECTION_IDS,
  isSidebarSectionHideable,
  normalizeHiddenSidebarSections,
  isSidebarSectionHidden,
  toggleSidebarSectionVisibility,
} = sidebarVisibility as {
  SIDEBAR_SECTIONS: { id: string; children: readonly unknown[] }[];
  HIDEABLE_SIDEBAR_SECTION_IDS: readonly string[];
  isSidebarSectionHideable: (section: { id: string; children: readonly unknown[] }) => boolean;
  normalizeHiddenSidebarSections: (value: unknown) => string[];
  isSidebarSectionHidden: (sectionId: string, hiddenSections: readonly string[]) => boolean;
  toggleSidebarSectionVisibility: (
    hiddenSections: readonly string[],
    sectionId: string,
    show: boolean
  ) => string[];
};

// ─── HIDEABLE_SIDEBAR_SECTION_IDS ────────────────────────────────────────────

test("sections containing protected items are not hideable", () => {
  // omni-proxy contains the protected "proxy" item
  assert.equal(HIDEABLE_SIDEBAR_SECTION_IDS.includes("omni-proxy"), false);
  // configuration contains the protected "settings-sidebar" item
  assert.equal(HIDEABLE_SIDEBAR_SECTION_IDS.includes("configuration"), false);
});

test("sections without protected items are hideable", () => {
  for (const id of [
    "home",
    "analytics",
    "costs",
    "monitoring",
    "devtools",
    "agentic-features",
    "other-features",
    "help",
  ]) {
    assert.ok(HIDEABLE_SIDEBAR_SECTION_IDS.includes(id), `section ${id} must be hideable`);
  }
});

test("isSidebarSectionHideable agrees with HIDEABLE_SIDEBAR_SECTION_IDS", () => {
  for (const section of SIDEBAR_SECTIONS) {
    assert.equal(
      isSidebarSectionHideable(section),
      HIDEABLE_SIDEBAR_SECTION_IDS.includes(section.id)
    );
  }
});

// ─── normalizeHiddenSidebarSections ──────────────────────────────────────────

test("normalizeHiddenSidebarSections accepts valid hideable section ids", () => {
  const result = normalizeHiddenSidebarSections(["analytics", "costs"]);
  assert.deepEqual(result.sort(), ["analytics", "costs"]);
});

test("normalizeHiddenSidebarSections drops unknown and non-hideable ids", () => {
  const result = normalizeHiddenSidebarSections([
    "analytics",
    "omni-proxy",
    "configuration",
    "bogus-section",
  ]);
  assert.deepEqual(result, ["analytics"]);
});

test("normalizeHiddenSidebarSections rejects non-arrays and non-strings", () => {
  assert.deepEqual(normalizeHiddenSidebarSections(null), []);
  assert.deepEqual(normalizeHiddenSidebarSections("analytics"), []);
  assert.deepEqual(normalizeHiddenSidebarSections([42, "analytics"]), ["analytics"]);
});

test("normalizeHiddenSidebarSections deduplicates", () => {
  const result = normalizeHiddenSidebarSections(["analytics", "analytics", "costs"]);
  assert.deepEqual(result.sort(), ["analytics", "costs"]);
});

// ─── isSidebarSectionHidden / toggleSidebarSectionVisibility ─────────────────

test("isSidebarSectionHidden reflects the hidden list", () => {
  assert.equal(isSidebarSectionHidden("analytics", []), false);
  assert.equal(isSidebarSectionHidden("analytics", ["analytics"]), true);
});

test("toggleSidebarSectionVisibility hides a section without touching others", () => {
  const next = toggleSidebarSectionVisibility(["costs"], "analytics", false);
  assert.deepEqual(next.sort(), ["analytics", "costs"]);
});

test("toggleSidebarSectionVisibility shows a section without touching others", () => {
  const next = toggleSidebarSectionVisibility(["analytics", "costs"], "analytics", true);
  assert.deepEqual(next, ["costs"]);
});

test("toggleSidebarSectionVisibility refuses to hide a protected section", () => {
  const before = ["analytics"];
  assert.deepEqual(toggleSidebarSectionVisibility(before, "omni-proxy", false), before);
  assert.deepEqual(toggleSidebarSectionVisibility(before, "configuration", false), before);
});

test("toggleSidebarSectionVisibility is idempotent", () => {
  const once = toggleSidebarSectionVisibility([], "analytics", false);
  const twice = toggleSidebarSectionVisibility(once, "analytics", false);
  assert.deepEqual([...twice].sort(), [...once].sort());
  const shownOnce = toggleSidebarSectionVisibility(once, "analytics", true);
  const shownTwice = toggleSidebarSectionVisibility(shownOnce, "analytics", true);
  assert.deepEqual([...shownTwice].sort(), [...shownOnce].sort());
});
