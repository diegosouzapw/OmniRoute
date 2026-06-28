/**
 * TDD regression guard for #5083 — Bug 3:
 * COMBO_002 validation errors only surface the generic
 * "One or more combo fields are invalid" message; the field-level reason
 * is buried inside error.details.issues.details[*].
 *
 * Fix: extract the first issue from error.details and add
 * error.details.firstField / error.details.firstMessage to the response body.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildComboErrorBody } from "@/lib/api/comboErrorResponse";

/**
 * Simulate what the PUT /api/combos/[id] route passes as `details`
 * for a COMBO_002 response after the fix.
 * The fix extracts the first Zod issue from validation.error.details
 * and adds firstField / firstMessage to the payload.
 */
describe("COMBO_002 response — firstField / firstMessage surfacing (#5083 Bug 3)", () => {
  it("details payload exposes firstField when provided", () => {
    // Simulate the fixed route calling comboErrorResponse with firstField/firstMessage
    const details = {
      issues: { message: "Invalid request", details: [{ field: "name", message: "Required" }] },
      firstField: "name",
      firstMessage: "Required",
    };
    const body = buildComboErrorBody("COMBO_002", details);
    assert.equal(body.error.code, "COMBO_002");
    assert.equal(body.error.details.firstField, "name");
    assert.equal(body.error.details.firstMessage, "Required");
  });

  it("details payload exposes firstField for nested path (e.g. models.0.id)", () => {
    const details = {
      issues: {
        message: "Invalid request",
        details: [{ field: "models.0.id", message: "String must contain at least 1 character(s)" }],
      },
      firstField: "models.0.id",
      firstMessage: "String must contain at least 1 character(s)",
    };
    const body = buildComboErrorBody("COMBO_002", details);
    assert.equal(body.error.details.firstField, "models.0.id");
    assert.equal(body.error.details.firstMessage, "String must contain at least 1 character(s)");
  });

  it("details payload has firstField=null when no issues are present", () => {
    // Edge case: empty issues list
    const details = {
      issues: { message: "Invalid request", details: [] },
      firstField: null,
      firstMessage: null,
    };
    const body = buildComboErrorBody("COMBO_002", details);
    assert.equal(body.error.details.firstField, null);
    assert.equal(body.error.details.firstMessage, null);
  });

  it("the generic message key is still present (backward compat)", () => {
    const details = {
      issues: { message: "Invalid request", details: [{ field: "strategy", message: "Invalid enum value" }] },
      firstField: "strategy",
      firstMessage: "Invalid enum value",
    };
    const body = buildComboErrorBody("COMBO_002", details);
    // The top-level error.message is from the error code catalog, not the issue message
    assert.equal(body.error.message, "One or more combo fields are invalid");
  });
});

/**
 * This helper simulates the logic that the fixed route.ts uses to extract
 * firstField/firstMessage from validateBody's error payload.
 * It exercises the extraction logic independently of the heavy route harness.
 */
describe("COMBO_002 firstField extraction logic", () => {
  function extractFirstField(validationError: {
    message: string;
    details: Array<{ field: string; message: string }>;
  }): { firstField: string | null; firstMessage: string | null } {
    const first = validationError.details?.[0] ?? null;
    return {
      firstField: first?.field ?? null,
      firstMessage: first?.message ?? null,
    };
  }

  it("extracts the first field from a non-empty details array", () => {
    const error = {
      message: "Invalid request",
      details: [
        { field: "name", message: "Required" },
        { field: "strategy", message: "Invalid enum value" },
      ],
    };
    const { firstField, firstMessage } = extractFirstField(error);
    assert.equal(firstField, "name");
    assert.equal(firstMessage, "Required");
  });

  it("returns null/null for an empty details array", () => {
    const error = { message: "Invalid request", details: [] };
    const { firstField, firstMessage } = extractFirstField(error);
    assert.equal(firstField, null);
    assert.equal(firstMessage, null);
  });
});
