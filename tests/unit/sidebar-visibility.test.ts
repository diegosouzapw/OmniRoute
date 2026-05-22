import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const sidebarVisibility = await import("../../src/shared/constants/sidebarVisibility.ts");
const repoRoot = join(import.meta.dirname, "../..");

test("monitoring sidebar items place logs before health", () => {
  // "system" was renamed to "monitoring"; sections now use children+getSectionItems
  const monitoringSection = sidebarVisibility.SIDEBAR_SECTIONS.find(
    (section) => section.id === "monitoring"
  );

  assert.ok(monitoringSection, "expected monitoring sidebar section to exist");
  const items = sidebarVisibility.getSectionItems(monitoringSection);
  assert.ok(
    items.findIndex((i) => i.id === "logs") < items.findIndex((i) => i.id === "health"),
    "logs should appear before health"
  );
  assert.ok(
    items.some((i) => i.id === "logs"),
    "monitoring section must contain logs"
  );
  assert.ok(
    items.some((i) => i.id === "health"),
    "monitoring section must contain health"
  );
  assert.ok(
    items.some((i) => i.id === "audit"),
    "monitoring section must contain audit"
  );
});

test("primary sidebar items place limits after cache", () => {
  // "primary" section was replaced by separate home/omni-proxy/analytics sections.
  // Verify the first three top-level section IDs are home, omni-proxy, analytics
  // and that the omni-proxy section contains the core routing items.
  const sectionIds = sidebarVisibility.SIDEBAR_SECTIONS.map((section) => section.id);
  assert.deepEqual(sectionIds.slice(0, 3), ["home", "omni-proxy", "analytics"]);

  const omniProxySection = sidebarVisibility.SIDEBAR_SECTIONS.find(
    (section) => section.id === "omni-proxy"
  );
  assert.ok(omniProxySection, "expected omni-proxy sidebar section to exist");
  const items = sidebarVisibility.getSectionItems(omniProxySection);
  const ids = items.map((item) => item.id);
  assert.ok(ids.includes("endpoints"), "omni-proxy must include endpoints");
  assert.ok(ids.includes("providers"), "omni-proxy must include providers");
  assert.ok(ids.includes("combos"), "omni-proxy must include combos");
});

test("context sidebar section sits between primary and cli", () => {
  // Context items (context-caveman, context-rtk, context-combos) now live inside
  // the omni-proxy section under the COMPRESSION_CONTEXT_GROUP group — there is
  // no longer a standalone "context" top-level section.
  const sectionIds = sidebarVisibility.SIDEBAR_SECTIONS.map((section) => section.id);
  assert.deepEqual(sectionIds.slice(0, 3), ["home", "omni-proxy", "analytics"]);

  const omniProxySection = sidebarVisibility.SIDEBAR_SECTIONS.find(
    (section) => section.id === "omni-proxy"
  );
  assert.ok(omniProxySection, "expected omni-proxy sidebar section to exist");
  const items = sidebarVisibility.getSectionItems(omniProxySection);
  const contextItems = items.filter((i) =>
    ["context-caveman", "context-rtk", "context-combos"].includes(i.id)
  );
  assert.deepEqual(
    contextItems.map((item) => ({ id: item.id, href: item.href })),
    [
      { id: "context-caveman", href: "/dashboard/context/caveman" },
      { id: "context-rtk", href: "/dashboard/context/rtk" },
      { id: "context-combos", href: "/dashboard/context/combos" },
    ]
  );
});

test("sidebar visibility drops stale entries from saved settings", () => {
  const allSidebarItemIds = sidebarVisibility.SIDEBAR_SECTIONS.flatMap((section) =>
    sidebarVisibility.getSectionItems(section).map((item) => item.id)
  );

  assert.equal(sidebarVisibility.HIDEABLE_SIDEBAR_ITEM_IDS.includes("auto-combo"), false);
  assert.equal(allSidebarItemIds.includes("auto-combo"), false);
  assert.deepEqual(sidebarVisibility.normalizeHiddenSidebarItems(["auto-combo", "logs"]), ["logs"]);
});

test("help sidebar exposes changelog after docs and issues", () => {
  const helpSection = sidebarVisibility.SIDEBAR_SECTIONS.find((section) => section.id === "help");

  assert.ok(helpSection, "expected help sidebar section to exist");
  const items = sidebarVisibility.getSectionItems(helpSection);
  assert.deepEqual(
    items.map((item) => ({
      id: item.id,
      href: item.href,
      i18nKey: item.i18nKey,
    })),
    [
      { id: "docs", href: "/docs", i18nKey: "docs" },
      {
        id: "issues",
        href: "https://github.com/diegosouzapw/OmniRoute/issues",
        i18nKey: "issues",
      },
      { id: "changelog", href: "/dashboard/changelog", i18nKey: "changelog" },
    ]
  );
  assert.equal(sidebarVisibility.HIDEABLE_SIDEBAR_ITEM_IDS.includes("changelog"), true);
});

test("legacy dashboard routes redirect to their consolidated surfaces", async () => {
  const autoComboPage = await readFile(
    join(repoRoot, "src/app/(dashboard)/dashboard/auto-combo/page.tsx"),
    "utf8"
  );
  const usagePage = await readFile(
    join(repoRoot, "src/app/(dashboard)/dashboard/usage/page.tsx"),
    "utf8"
  );

  assert.match(autoComboPage, /redirect\("\/dashboard\/combos\?filter=intelligent"\)/);
  assert.match(usagePage, /redirect\("\/dashboard\/logs"\)/);

  const compressionPage = await readFile(
    join(repoRoot, "src/app/(dashboard)/dashboard/compression/page.tsx"),
    "utf8"
  );
  assert.match(compressionPage, /redirect\("\/dashboard\/context\/caveman"\)/);
});
