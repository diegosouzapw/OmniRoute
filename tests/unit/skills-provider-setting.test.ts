import test from "node:test";
import assert from "node:assert/strict";

const { normalizeSkillsProvider, DEFAULT_SKILLS_PROVIDER } =
  await import("../../src/lib/skills/providerSettings.ts");

test("normalizeSkillsProvider keeps valid values", () => {
  assert.equal(normalizeSkillsProvider("skillsmp"), "skillsmp");
  assert.equal(normalizeSkillsProvider("skillssh"), "skillssh");
});

test("normalizeSkillsProvider falls back for invalid values", () => {
  assert.equal(DEFAULT_SKILLS_PROVIDER, "skillsmp");
  assert.equal(normalizeSkillsProvider(undefined), "skillsmp");
  assert.equal(normalizeSkillsProvider(null), "skillsmp");
  assert.equal(normalizeSkillsProvider(""), "skillsmp");
  assert.equal(normalizeSkillsProvider("invalid"), "skillsmp");
});
