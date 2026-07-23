import test from "node:test";
import assert from "node:assert/strict";

// #5442 — LMArena (and any provider with no live validator) returns
// `{ unsupported: true }` from /api/providers/validate; Save still succeeds.
// The Add-API-Key modal only had success/failed states, so it rendered a red
// "Invalid" badge for those providers even though the key was saved fine. The
// "unsupported" result now maps to a neutral info "N/A" badge, not "Invalid".
const { validationBadgeProps } =
  await import("../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts");

test("#5442 unsupported validation → neutral N/A badge, not red Invalid", () => {
  assert.deepEqual(validationBadgeProps("unsupported"), {
    variant: "info",
    labelKey: "notApplicable",
    fallback: "N/A",
  });
});

test("#5442 success and failed badges are unchanged", () => {
  assert.deepEqual(validationBadgeProps("success"), {
    variant: "success",
    labelKey: "valid",
    fallback: "Valid",
  });
  assert.deepEqual(validationBadgeProps("failed"), {
    variant: "error",
    labelKey: "invalid",
    fallback: "Invalid",
  });
  // Any other/unknown result defaults to the error badge (fail-safe).
  assert.deepEqual(validationBadgeProps("whatever"), {
    variant: "error",
    labelKey: "invalid",
    fallback: "Invalid",
  });
});
