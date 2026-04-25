import test from "node:test";
import assert from "node:assert/strict";

const providerAudit = await import("../../src/lib/compliance/providerAudit.ts");

test("extractProviderWarnings finds sanitizer and warning fields without duplicating entries", () => {
  const warnings = providerAudit.extractProviderWarnings(
    {
      message: "[SANITIZER] Prompt injection detected: prompt_leak",
      warnings: ["[SANITIZER] Prompt injection detected: prompt_leak"],
    },
    {
      detail: {
        warning: "Content was filtered by the upstream safety filter.",
      },
    }
  );

  assert.deepEqual(warnings, [
    "[SANITIZER] Prompt injection detected: prompt_leak",
    "Content was filtered by the upstream safety filter.",
  ]);
});
