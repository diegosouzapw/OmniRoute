// #6164: the always-on Auto-Routing (combo) banner was removed from the home page —
// it did not reflect live routing state and reappeared on every fresh browser.
// This guard replaces the deleted AutoRoutingBanner.test.tsx: the component was
// deleted along with its usage, so the contract to protect is its ABSENCE.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "..");

test("home page does not render the removed AutoRoutingBanner (#6164)", () => {
  const homePage = fs.readFileSync(path.join(ROOT, "src/app/(dashboard)/home/page.tsx"), "utf8");
  assert.ok(
    !homePage.includes("AutoRoutingBanner"),
    "AutoRoutingBanner was removed in #6164 and must not be re-imported into home/page.tsx"
  );
});

test("AutoRoutingBanner component stays deleted (#6164)", () => {
  assert.equal(
    fs.existsSync(path.join(ROOT, "src/shared/components/AutoRoutingBanner.tsx")),
    false,
    "the component was deleted in #6164; a revival needs its own test file"
  );
});
