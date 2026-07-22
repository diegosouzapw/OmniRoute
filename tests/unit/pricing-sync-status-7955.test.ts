import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "../..");
const pricingTab = readFileSync(
  join(root, "src/app/(dashboard)/dashboard/settings/components/PricingTab.tsx"),
  "utf8"
);
const en = JSON.parse(readFileSync(join(root, "src/i18n/messages/en.json"), "utf8")) as {
  settings: Record<string, string>;
};

test("pricing status labels distinguish automatic sync from manual sync", () => {
  assert.match(pricingTab, /t\("pricingAutoSyncEnabled"\)/);
  assert.match(pricingTab, /t\("pricingAutoSyncDisabled"\)/);
  assert.equal(en.settings.pricingAutoSyncEnabled, "Automatic Sync Enabled");
  assert.equal(en.settings.pricingAutoSyncDisabled, "Automatic Sync Disabled");
});
