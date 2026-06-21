/**
 * Regression for #4475 (feat: targetFormat selector in custom-models form) — Rule #18.
 *
 * The form is a .tsx, so the testable surface is the pure label-mapping extracted into
 * providerPageHelpers.ts. `targetFormatBadgeI18nKey` drives the model-row badge and must
 * map exactly the 6 supported targetFormat values to their i18n keys, returning null for
 * unknown values (the badge then renders the raw value). Pins the mapping so a future edit
 * to the option list can't silently desync the badge from the form's <select> options.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { targetFormatBadgeI18nKey } from "../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts";

test("maps each supported targetFormat value to its i18n key", () => {
  assert.equal(targetFormatBadgeI18nKey("openai"), "compatProtocolOpenAI");
  assert.equal(targetFormatBadgeI18nKey("openai-responses"), "compatProtocolOpenAIResponses");
  assert.equal(targetFormatBadgeI18nKey("claude"), "compatProtocolClaude");
  assert.equal(targetFormatBadgeI18nKey("gemini"), "targetFormatGemini");
  assert.equal(targetFormatBadgeI18nKey("gemini-cli"), "targetFormatGeminiCli");
  assert.equal(targetFormatBadgeI18nKey("antigravity"), "targetFormatAntigravity");
});

test("returns null for unknown / empty values (badge falls back to raw value)", () => {
  assert.equal(targetFormatBadgeI18nKey(""), null);
  assert.equal(targetFormatBadgeI18nKey("bogus"), null);
  assert.equal(targetFormatBadgeI18nKey("auto"), null);
});
