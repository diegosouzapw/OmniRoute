import test from "node:test";
import assert from "node:assert/strict";

const sidebarVisibility = await import("../../src/shared/constants/sidebarVisibility.ts");

test("system sidebar items place logs before health", () => {
  const systemSection = sidebarVisibility.SIDEBAR_SECTIONS.find(
    (section) => section.id === "system"
  );

  assert.ok(systemSection, "expected system sidebar section to exist");
  assert.deepEqual(
    systemSection.items.map((item) => item.id),
    ["logs", "health", "audit", "settings"]
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
