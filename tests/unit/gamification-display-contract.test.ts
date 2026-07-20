import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import en from "../../src/i18n/messages/en.json" with { type: "json" };
import vi from "../../src/i18n/messages/vi.json" with { type: "json" };
import { BUILTIN_BADGES } from "../../src/lib/gamification/badges";

const profileSource = readFileSync("src/app/(dashboard)/dashboard/profile/page.tsx", "utf8");
const tokensSource = readFileSync("src/app/(dashboard)/dashboard/tokens/page.tsx", "utf8");
const topListSource = readFileSync(
  "src/app/(dashboard)/dashboard/costs/components/TopListCard.tsx",
  "utf8"
);
const englishBadges = en.gamification.badges as Record<string, Record<string, string>>;
const vietnameseBadges = vi.gamification.badges as Record<string, Record<string, string>>;

test("every built-in badge has complete English and Vietnamese display copy", () => {
  for (const badge of BUILTIN_BADGES) {
    for (const field of ["name", "description", "criteria"] as const) {
      const englishValue = englishBadges[badge.id]?.[field];
      const vietnameseValue = vietnameseBadges[badge.id]?.[field];
      assert.ok(englishValue?.trim(), `en missing gamification.badges.${badge.id}.${field}`);
      assert.ok(vietnameseValue?.trim(), `vi missing gamification.badges.${badge.id}.${field}`);
    }
  }
});

test("profile renders mapped icons and localized badge criteria", () => {
  assert.match(profileSource, /function BadgeIcon/);
  assert.match(profileSource, /translateBadge\(selectedBadge, "criteria"\)/);
  assert.doesNotMatch(profileSource, /<p className="text-sm">\{selectedBadge\.criteria\}<\/p>/);
});

test("token page no longer contains known raw English controls", () => {
  for (const rawText of [
    "Send Tokens",
    "Create Invite",
    "Connect Server",
    "No servers connected",
    "Last sync:",
    "Disconnect",
  ]) {
    assert.equal(tokensSource.includes(`>${rawText}<`), false, `raw token copy: ${rawText}`);
  }
});

test("cost list component receives its localized legacy-free label", () => {
  assert.match(topListSource, /legacyFreeLabel: string;/);
  assert.match(topListSource, /\{legacyFreeLabel\}/);
});
