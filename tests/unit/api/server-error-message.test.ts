import test from "node:test";
import assert from "node:assert/strict";
import { resolveServerErrorMessage } from "../../../src/lib/api/serverErrorMessage.ts";

const FALLBACK = "Failed to toggle combo";

test("prefers error.details[0].message (field-level / COMBO_002 shape)", () => {
  const body = {
    error: {
      message: "One or more combo fields are invalid",
      details: [{ field: "config.compressionMode", message: "Invalid compression mode" }],
    },
  };
  assert.equal(resolveServerErrorMessage(body, FALLBACK), "Invalid compression mode");
});

test("falls back to error.message when there are no details", () => {
  const body = { error: { message: "Combo not found" } };
  assert.equal(resolveServerErrorMessage(body, FALLBACK), "Combo not found");
});

test("falls back to error.message when details[0] has no message", () => {
  const body = { error: { message: "Bad request", details: [{ field: "body" }] } };
  assert.equal(resolveServerErrorMessage(body, FALLBACK), "Bad request");
});

test("returns fallback for null body (failed res.json())", () => {
  assert.equal(resolveServerErrorMessage(null, FALLBACK), FALLBACK);
});

test("returns fallback for a body without an error object", () => {
  assert.equal(resolveServerErrorMessage({ ok: false }, FALLBACK), FALLBACK);
  assert.equal(resolveServerErrorMessage("nope", FALLBACK), FALLBACK);
  assert.equal(resolveServerErrorMessage({ error: "string-not-object" }, FALLBACK), FALLBACK);
});

test("returns fallback when message fields are empty strings", () => {
  const body = { error: { message: "", details: [{ message: "" }] } };
  assert.equal(resolveServerErrorMessage(body, FALLBACK), FALLBACK);
});
