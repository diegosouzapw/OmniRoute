// tests/unit/chatcore-skills-format.test.ts
// Characterization of getSkillsProviderForFormat / getSkillsModelIdForFormat — the skills-format
// mappers extracted from handleChatCore (chatCore god-file decomposition, #3501). Locks the
// claude→anthropic/claude, gemini→google/gemini and default→openai/openai mappings.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getSkillsProviderForFormat,
  getSkillsModelIdForFormat,
} from "../../open-sse/handlers/chatCore/skillsFormat.ts";

test("claude format maps to anthropic provider and claude model id", () => {
  assert.equal(getSkillsProviderForFormat("claude"), "anthropic");
  assert.equal(getSkillsModelIdForFormat("claude"), "claude");
});

test("gemini format maps to google provider and gemini model id", () => {
  assert.equal(getSkillsProviderForFormat("gemini"), "google");
  assert.equal(getSkillsModelIdForFormat("gemini"), "gemini");
});

test("openai format maps to openai provider and openai model id", () => {
  assert.equal(getSkillsProviderForFormat("openai"), "openai");
  assert.equal(getSkillsModelIdForFormat("openai"), "openai");
});

test("unknown / responses formats fall back to openai for both mappers", () => {
  assert.equal(getSkillsProviderForFormat("openai-responses"), "openai");
  assert.equal(getSkillsModelIdForFormat("openai-responses"), "openai");
  assert.equal(getSkillsProviderForFormat("removed-google-cli"), "openai");
  assert.equal(getSkillsModelIdForFormat("totally-unknown"), "openai");
});
