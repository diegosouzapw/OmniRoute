// #4698 — the onboarding wizard rendered each step title via t(stepId), but the "tiers"
// step had no matching onboarding.tiers key, so next-intl threw
// "MISSING_MESSAGE: onboarding.tiers (en)" and the wizard crashed. Guard that every step
// id used as a title resolves to a string in the source (en) catalog.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

// Mirrors STEP_IDS in src/app/(dashboard)/dashboard/onboarding/page.tsx and the
// title lookup `t(id === "done" ? "ready" : id)`.
const STEP_IDS = ["welcome", "tiers", "security", "provider", "test", "done"];
const titleKeyFor = (id: string) => (id === "done" ? "ready" : id);

const enPath = fileURLToPath(
  new URL("../../src/i18n/messages/en.json", import.meta.url)
);
const en = JSON.parse(readFileSync(enPath, "utf8"));

test("every onboarding step has a string title key in en.json (#4698)", () => {
  const onboarding = en.onboarding ?? {};
  for (const id of STEP_IDS) {
    const key = titleKeyFor(id);
    assert.equal(
      typeof onboarding[key],
      "string",
      `onboarding.${key} (for step "${id}") must be a string title`
    );
  }
});

test("onboarding.tiers specifically exists (regression guard #4698)", () => {
  assert.equal(typeof en.onboarding?.tiers, "string");
});
