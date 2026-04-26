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
    ["logs", "health", "settings"]
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

test("sidebar visibility drops stale audit entries from saved settings", () => {
  const allSidebarItemIds = sidebarVisibility.SIDEBAR_SECTIONS.flatMap((section) =>
    section.items.map((item) => item.id)
  );

  assert.equal(sidebarVisibility.HIDEABLE_SIDEBAR_ITEM_IDS.includes("audit"), false);
  assert.equal(allSidebarItemIds.includes("audit"), false);
  assert.deepEqual(sidebarVisibility.normalizeHiddenSidebarItems(["audit", "logs"]), ["logs"]);
});

test("legacy dashboard routes redirect to their consolidated surfaces", async () => {
  const autoComboPage = await readFile(
    join(repoRoot, "src/app/(dashboard)/dashboard/auto-combo/page.tsx"),
    "utf8"
  );
  const auditPage = await readFile(
    join(repoRoot, "src/app/(dashboard)/dashboard/audit/page.tsx"),
    "utf8"
  );
  const usagePage = await readFile(
    join(repoRoot, "src/app/(dashboard)/dashboard/usage/page.tsx"),
    "utf8"
  );

  assert.match(autoComboPage, /redirect\("\/dashboard\/combos\?filter=intelligent"\)/);
  assert.match(auditPage, /redirect\("\/dashboard\/logs\?tab=audit-logs"\)/);
  assert.match(usagePage, /redirect\("\/dashboard\/logs"\)/);
});
