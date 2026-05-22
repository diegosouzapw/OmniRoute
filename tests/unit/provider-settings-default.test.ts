import assert from "node:assert/strict";
import { describe, test } from "node:test";
import {
  DEFAULT_SKILLS_PROVIDER,
  normalizeSkillsProvider,
} from "../../src/lib/skills/providerSettings.ts";

describe("providerSettings — DEFAULT_SKILLS_PROVIDER", () => {
  test('DEFAULT_SKILLS_PROVIDER is "skillssh"', () => {
    assert.equal(DEFAULT_SKILLS_PROVIDER, "skillssh");
  });
});

describe("providerSettings — normalizeSkillsProvider", () => {
  test('returns "skillssh" when given "skillssh"', () => {
    assert.equal(normalizeSkillsProvider("skillssh"), "skillssh");
  });

  test('returns "skillsmp" when given "skillsmp"', () => {
    assert.equal(normalizeSkillsProvider("skillsmp"), "skillsmp");
  });

  test('returns default "skillssh" for unknown string', () => {
    assert.equal(normalizeSkillsProvider("unknown"), "skillssh");
  });

  test('returns default "skillssh" for null', () => {
    assert.equal(normalizeSkillsProvider(null), "skillssh");
  });

  test('returns default "skillssh" for undefined', () => {
    assert.equal(normalizeSkillsProvider(undefined), "skillssh");
  });

  test('returns default "skillssh" for empty string', () => {
    assert.equal(normalizeSkillsProvider(""), "skillssh");
  });

  test('returns default "skillssh" for numeric input', () => {
    assert.equal(normalizeSkillsProvider(42), "skillssh");
  });
});
