import test from "node:test";
import assert from "node:assert/strict";

const sidebarVisibility = await import("../../src/shared/constants/sidebarVisibility.ts");

function findSection(id: string) {
  return sidebarVisibility.SIDEBAR_SECTIONS.find((s) => s.id === id);
}

test("monitoring section exists", () => {
  const section = findSection("monitoring");
  assert.ok(section, "monitoring section must exist");
});

test("monitoring section has exactly 4 children: 1 item (activity) + 3 groups (logs, audit, system)", () => {
  const section = findSection("monitoring");
  assert.ok(section, "monitoring section must exist");

  const children = section.children;
  assert.equal(children.length, 4, "monitoring must have 4 children");

  // First child is the activity item (not a group)
  const first = children[0] as sidebarVisibility.SidebarItemDefinition;
  assert.ok(!("type" in first) || first.type !== "group", "first child must not be a group");
  assert.equal((first as sidebarVisibility.SidebarItemDefinition).id, "activity", "first child must be activity item");

  // Remaining 3 children are groups
  const groups = children.slice(1);
  for (const g of groups) {
    assert.ok("type" in g && g.type === "group", "children[1..3] must all be groups");
  }

  const groupIds = groups.map((g) => (g as sidebarVisibility.SidebarItemGroup).id);
  assert.deepEqual(groupIds, ["logs", "audit", "system"], "group ids must be logs, audit, system in order");
});

test("getSectionItems of monitoring does NOT contain logs-activity", () => {
  const section = findSection("monitoring");
  assert.ok(section, "monitoring section must exist");

  const items = sidebarVisibility.getSectionItems(section);
  const itemIds = items.map((i) => i.id);

  assert.equal(
    itemIds.includes("logs-activity" as sidebarVisibility.HideableSidebarItemId),
    false,
    "logs-activity must not be in monitoring section items",
  );
});

test("monitoring section does NOT have a group with id costs-parameters", () => {
  const section = findSection("monitoring");
  assert.ok(section, "monitoring section must exist");

  const groupIds = section.children
    .filter((c): c is sidebarVisibility.SidebarItemGroup => "type" in c && c.type === "group")
    .map((g) => g.id);

  assert.equal(
    groupIds.includes("costs-parameters"),
    false,
    "costs-parameters group must not exist in monitoring",
  );
});

test("monitoring section activity item has correct href and icon", () => {
  const section = findSection("monitoring");
  assert.ok(section, "monitoring section must exist");

  const activityItem = sidebarVisibility
    .getSectionItems(section)
    .find((i) => i.id === "activity");

  assert.ok(activityItem, "activity item must be in monitoring section");
  assert.equal(activityItem.href, "/dashboard/activity");
  assert.equal(activityItem.icon, "timeline");
  assert.equal(activityItem.i18nKey, "activity");
});

test("monitoring logs group contains logs, logs-proxy, logs-console", () => {
  const section = findSection("monitoring");
  assert.ok(section, "monitoring section must exist");

  const logsGroup = section.children.find(
    (c): c is sidebarVisibility.SidebarItemGroup => "type" in c && c.type === "group" && c.id === "logs",
  );
  assert.ok(logsGroup, "logs group must exist in monitoring");

  const itemIds = logsGroup.items.map((i) => i.id);
  assert.deepEqual(itemIds, ["logs", "logs-proxy", "logs-console"]);
});

test("monitoring system group contains health and runtime", () => {
  const section = findSection("monitoring");
  assert.ok(section, "monitoring section must exist");

  const systemGroup = section.children.find(
    (c): c is sidebarVisibility.SidebarItemGroup => "type" in c && c.type === "group" && c.id === "system",
  );
  assert.ok(systemGroup, "system group must exist in monitoring");

  const itemIds = systemGroup.items.map((i) => i.id);
  assert.deepEqual(itemIds, ["health", "runtime"]);
});
