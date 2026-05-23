import test from "node:test";
import assert from "node:assert/strict";

const { normalizeSkillsProvider, DEFAULT_SKILLS_PROVIDER } =
  await import("../../src/lib/skills/providerSettings.ts");

test("normalizeSkillsProvider keeps valid values", () => {
  assert.equal(normalizeSkillsProvider("skillsmp"), "skillsmp");
  assert.equal(normalizeSkillsProvider("skillssh"), "skillssh");
});

test("normalizeSkillsProvider falls back for invalid values", () => {
  assert.equal(DEFAULT_SKILLS_PROVIDER, "skillssh");
  assert.equal(normalizeSkillsProvider(undefined), "skillssh");
  assert.equal(normalizeSkillsProvider(null), "skillssh");
  assert.equal(normalizeSkillsProvider(""), "skillssh");
  assert.equal(normalizeSkillsProvider("invalid"), "skillssh");
});
