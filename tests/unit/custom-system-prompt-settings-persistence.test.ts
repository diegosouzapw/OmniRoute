import test from "node:test";
import assert from "node:assert/strict";
import { updateSettingsSchema } from "@/shared/validation/settingsSchemas";

test("updateSettingsSchema preserves customSystemPromptEnabled and customSystemPrompt fields", () => {
  const input = {
    customSystemPromptEnabled: true,
    customSystemPrompt: "Always respond politely",
  };

  const parsed = updateSettingsSchema.parse(input);

  assert.equal(parsed.customSystemPromptEnabled, true);
  assert.equal(parsed.customSystemPrompt, "Always respond politely");
});
