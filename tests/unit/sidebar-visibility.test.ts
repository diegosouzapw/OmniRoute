import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const sidebarVisibility = await import("../../src/shared/constants/sidebarVisibility.ts");
const repoRoot = join(import.meta.dirname, "../..");

test("system sidebar items place logs before health", () => {
  const systemSection = sidebarVisibility.SIDEBAR_SECTIONS.find(
    (section) => section.id === "system"
  );

  assert.ok(systemSection, "expected system sidebar section to exist");
  assert.deepEqual(
    systemSection.items.map((item) => item.id),
    ["logs", "audit", "webhooks", "health", "settings"]
  );
});

test("primary sidebar items place limits after cache", () => {
  const primarySection = sidebarVisibility.SIDEBAR_SECTIONS.find(
    (section) => section.id === "primary"
  );

  assert.ok(primarySection, "expected primary sidebar section to exist");
  assert.deepEqual(
    primarySection.items.map((item) => item.id),
    [
      "home",
      "endpoints",
      "api-manager",
      "providers",
      "combos",
      "batch",
      "costs",
      "analytics",
      "cache",
      "limits",
      "media",
    ]
  );
});

test("sidebar visibility drops stale entries from saved settings", () => {
  const allSidebarItemIds = sidebarVisibility.SIDEBAR_SECTIONS.flatMap((section) =>
    section.items.map((item) => item.id)
  );

  assert.equal(sidebarVisibility.HIDEABLE_SIDEBAR_ITEM_IDS.includes("auto-combo"), false);
  assert.equal(allSidebarItemIds.includes("auto-combo"), false);
  assert.deepEqual(sidebarVisibility.normalizeHiddenSidebarItems(["auto-combo", "logs"]), ["logs"]);
});

test("help sidebar exposes changelog after docs and issues", () => {
  const helpSection = sidebarVisibility.SIDEBAR_SECTIONS.find((section) => section.id === "help");

  assert.ok(helpSection, "expected help sidebar section to exist");
  assert.deepEqual(
    helpSection.items.map((item) => ({
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
});
