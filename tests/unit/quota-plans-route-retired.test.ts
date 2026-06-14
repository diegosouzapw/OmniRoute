import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sidebarVisibility = await import("../../src/shared/constants/sidebarVisibility.ts");

test('sidebarVisibility.ts no longer contains "costs-quota-plans"', () => {
  assert.ok(
    !(sidebarVisibility.HIDEABLE_SIDEBAR_ITEM_IDS as readonly string[]).includes("costs-quota-plans"),
    '"costs-quota-plans" must have been removed from HIDEABLE_SIDEBAR_ITEM_IDS (Plans screen retired)'
  );
});

test("retired Plans route file no longer exists", () => {
  const routePath = path.resolve(
    __dirname,
    "../../src/app/(dashboard)/dashboard/costs/quota-share/plans/page.tsx"
  );
  assert.strictEqual(
    fs.existsSync(routePath),
    false,
    `Route file should not exist (Plans screen retired): ${routePath}`
  );
});

test("retired ProviderPlanConfigClient file no longer exists", () => {
  const clientPath = path.resolve(
    __dirname,
    "../../src/app/(dashboard)/dashboard/costs/quota-share/plans/ProviderPlanConfigClient.tsx"
  );
  assert.strictEqual(
    fs.existsSync(clientPath),
    false,
    `ProviderPlanConfigClient should not exist (Plans screen retired): ${clientPath}`
  );
});

test("costs section no longer includes costs-quota-plans nav item", () => {
  const section = sidebarVisibility.SIDEBAR_SECTIONS.find((s) => s.id === "costs");
  assert.ok(section, 'expected "costs" section to exist');
  const items = sidebarVisibility.getSectionItems(section);
  const ids = items.map((i) => i.id);
  assert.ok(
    !ids.includes("costs-quota-plans"),
    '"costs-quota-plans" nav item must be absent from the costs section (Plans screen retired)'
  );
});
