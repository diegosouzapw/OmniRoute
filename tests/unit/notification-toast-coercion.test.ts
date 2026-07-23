import test from "node:test";
import assert from "node:assert/strict";

import { toToastText } from "@/shared/components/NotificationToast";

// Regression guard: a toast message/title that is NOT a string (e.g. a raw API
// error body — a Zod `.format()` object) must be coerced to a string. Rendering
// an object as a React child throws React #31 and freezes the whole page. This
// was the "test model → screen froze" bug on the provider page.

test("returns strings unchanged", () => {
  assert.equal(toToastText("hello"), "hello");
  assert.equal(toToastText(""), "");
});

test("returns empty string for null/undefined (never crashes render)", () => {
  assert.equal(toToastText(null), "");
  assert.equal(toToastText(undefined), "");
});

test("prefers a nested string .message on an object error body", () => {
  assert.equal(toToastText({ message: "Rate limited" }), "Rate limited");
});

test("JSON-stringifies an arbitrary object instead of throwing (Zod .format() shape)", () => {
  const zodish = { modelId: { _errors: ["Required"] }, _errors: [] };
  const out = toToastText(zodish);
  assert.equal(typeof out, "string");
  assert.ok(out.includes("_errors"));
});

test("coerces numbers/booleans to string", () => {
  assert.equal(toToastText(42), "42");
  assert.equal(toToastText(true), "true");
});
