import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const sidebarVisibility = await import("../../src/shared/constants/sidebarVisibility.ts");
const repoRoot = join(import.meta.dirname, "../..");

function sectionItems(sectionId: string) {
  const section = sidebarVisibility.SIDEBAR_SECTIONS.find(
    (candidate) => candidate.id === sectionId
  );
  assert.ok(section, `expected ${sectionId} sidebar section to exist`);
  return sidebarVisibility.getSectionItems(section);
}

test("system sidebar items: monitoring has activity at top then logs/audit/system groups", () => {
  const items = sectionItems("monitoring");
  assert.deepEqual(
    items.map((item) => item.id),
    [
      "activity",
      "logs",
      "logs-proxy",
      "logs-console",
      "audit",
      "audit-mcp",
      "audit-a2a",
      "health",
      "runtime",
    ]
  );
});

test("primary sidebar items place limits after cache", () => {
  const items = sectionItems("omni-proxy");
  assert.deepEqual(
    items.map((item) => item.id),
    [
      "endpoints",
      "api-manager",
      "providers",
      "embedded-services",
      "combos",
      "quota",
      "costs-quota-share",
      "context-caveman",
      "context-rtk",
      "context-combos",
      "cli-code",
      "cli-agents",
      "acp-agents",
      "cloud-agents",
      "agent-bridge",
      "traffic-inspector",
      "api-endpoints",
      "webhooks",
      "proxy",
    ]
  );
});

test("context sidebar section sits between primary and cli", () => {
  const sectionIds = sidebarVisibility.SIDEBAR_SECTIONS.map((section) => section.id);
  assert.deepEqual(sectionIds.slice(0, 4), ["home", "omni-proxy", "analytics", "costs"]);

  const items = sectionItems("omni-proxy");
  assert.deepEqual(
    items
      .filter((item) => item.id.startsWith("context-"))
      .map((item) => ({ id: item.id, href: item.href })),
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

  assert.equal(
    (sidebarVisibility.HIDEABLE_SIDEBAR_ITEM_IDS as readonly string[]).includes("auto-combo"),
    false
  );
  assert.equal((allSidebarItemIds as string[]).includes("auto-combo"), false);
  assert.deepEqual(sidebarVisibility.normalizeHiddenSidebarItems(["auto-combo" as any, "logs"]), [
    "logs",
  ]);
});

test("help sidebar exposes changelog after docs and issues", () => {
  const items = sectionItems("help");
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
