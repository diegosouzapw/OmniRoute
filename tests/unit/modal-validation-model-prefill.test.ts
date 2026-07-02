// #5446 follow-up (PR #5881 checklist item 4): the add-connection modal pre-fills
// the Validation Model Id for Modal with the same model the server-side validator
// probes, so both sides can never drift apart.
import test from "node:test";
import assert from "node:assert/strict";

import { MODAL_DEFAULT_VALIDATION_MODEL_ID } from "../../src/shared/constants/modal";
import { defaultValidationModelIdForProvider } from "../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers";

test("modal pre-fills the server probe model as Validation Model Id", () => {
  assert.equal(defaultValidationModelIdForProvider("modal"), MODAL_DEFAULT_VALIDATION_MODEL_ID);
  assert.equal(MODAL_DEFAULT_VALIDATION_MODEL_ID, "Qwen/Qwen3-4B-Thinking-2507-FP8");
});

test("other providers keep an empty Validation Model Id default", () => {
  assert.equal(defaultValidationModelIdForProvider("openai"), "");
  assert.equal(defaultValidationModelIdForProvider(""), "");
  assert.equal(defaultValidationModelIdForProvider(undefined), "");
});
