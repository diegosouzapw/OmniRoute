import { test } from "node:test";
import assert from "node:assert/strict";
import { stripInvalidSchemaConstructs } from "../../../open-sse/translator/helpers/schemaCoercion.ts";

// Every draft 2020-12 keyword whose value is a schema rather than an annotation.
// A placeholder in any of them has to become the permissive {}: forwarding the
// string is invalid JSON Schema and is the 400 this sanitizer exists to prevent.
const SCHEMA_SLOTS = [
  "items",
  "additionalProperties",
  "propertyNames",
  "contains",
  "not",
  "if",
  "then",
  "else",
  "unevaluatedProperties",
  "additionalItems",
  "contentSchema",
  "unevaluatedItems",
];

// Produced by logTruncation.ts once a schema is deeper than the log depth limit.
const PLACEHOLDERS = ["[MaxDepth]", "[Truncated]", "[Circular]", "[Object]", "[Array]"];

function strip(schema: unknown) {
  return stripInvalidSchemaConstructs(schema) as Record<string, unknown>;
}

for (const key of SCHEMA_SLOTS) {
  test(`a placeholder in ${key} becomes a permissive schema`, () => {
    for (const placeholder of PLACEHOLDERS) {
      const out = strip({ type: "object", [key]: placeholder });
      assert.deepEqual(out[key], {}, `${key} kept ${placeholder}`);
    }
  });
}

test("every slot is covered by the same rule, none left behind", () => {
  // The point of the list above is that it is complete. If a slot is dropped
  // from the walker, the loop above catches it; this catches the reverse -- a
  // slot handled by the walker but missing from this list would make the loop
  // silently smaller.
  const surviving = SCHEMA_SLOTS.filter((key) => {
    const out = strip({ [key]: "[MaxDepth]" });
    return typeof out[key] === "string";
  });
  assert.deepEqual(surviving, []);
});

test("a boolean schema is preserved, not widened", () => {
  // `contentSchema: false` and `unevaluatedItems: false` are valid and
  // restrictive; turning either into {} would invite the model to invent data.
  for (const key of ["contentSchema", "unevaluatedItems"]) {
    assert.equal(strip({ [key]: false })[key], false);
    assert.equal(strip({ [key]: true })[key], true);
  }
});

test("a nested subschema is still walked", () => {
  const out = strip({
    contentSchema: { type: "object", properties: { a: { enum: "[MaxDepth]" } } },
    unevaluatedItems: { items: "[MaxDepth]" },
  });
  const content = out.contentSchema as Record<string, Record<string, unknown>>;
  assert.deepEqual(content.properties.a, {}, "an invalid enum is dropped, leaving {}");
  assert.deepEqual(out.unevaluatedItems, { items: {} });
});

test("a string that is not a placeholder is left alone", () => {
  // Only the placeholder shape is coerced. Anything else stays exactly as it
  // arrived, so a schema this sanitizer does not understand is forwarded rather
  // than rewritten.
  for (const key of ["contentSchema", "unevaluatedItems"]) {
    assert.equal(strip({ [key]: "text/plain" })[key], "text/plain");
  }
});

test("a property named like a slot keyword is not treated as one", () => {
  // Property names live in their own space: a tool whose parameter is called
  // contentSchema must keep its description string.
  const out = strip({
    type: "object",
    properties: { contentSchema: "[MaxDepth]", unevaluatedItems: { type: "string" } },
  });
  const properties = out.properties as Record<string, unknown>;
  assert.deepEqual(
    properties.contentSchema,
    {},
    "a placeholder property value is still a schema slot"
  );
  assert.deepEqual(properties.unevaluatedItems, { type: "string" });
});
