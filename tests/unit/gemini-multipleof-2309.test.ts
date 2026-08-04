/**
 * #2309 — antigravity/gemini returned [400] "Invalid JSON payload received.
 * Unknown name \"multipleOf\" at 'request.tools[0].function_declarations[...]"
 *
 * Root cause: `multipleOf` (a JSON Schema numeric constraint) was NOT listed in
 * `GEMINI_UNSUPPORTED_SCHEMA_KEYS`, so `cleanJSONSchemaForAntigravity` left it in
 * the function-declaration parameters. The Gemini/antigravity upstream (OpenAPI
 * 3.0 schema subset) rejects `multipleOf` with a hard 400.
 *
 * Fix: add `multipleOf` to the unsupported-keys set so it is stripped at every
 * level (top-level property, nested object, and inside array `items`). Sibling
 * numeric constraints `minimum`/`maximum` ARE accepted by Gemini and must stay.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  cleanJSONSchemaForAntigravity,
  GEMINI_UNSUPPORTED_SCHEMA_KEYS,
} from "../../open-sse/translator/helpers/geminiHelper.ts";

test("#2309 multipleOf is stripped at all levels for antigravity/gemini schemas", () => {
  const schema = {
    type: "object",
    properties: {
      count: { type: "integer", multipleOf: 2, minimum: 0 },
      ratio: { type: "number", multipleOf: 0.5 },
      tags: { type: "array", items: { type: "number", multipleOf: 10 } },
    },
  };

  const cleaned = JSON.stringify(cleanJSONSchemaForAntigravity(schema));

  assert.ok(!cleaned.includes("multipleOf"), "multipleOf must be removed");
  // Gemini DOES support minimum/maximum — those must survive.
  assert.ok(cleaned.includes("minimum"), "minimum must be preserved");
});

test("#2309 multipleOf is in GEMINI_UNSUPPORTED_SCHEMA_KEYS", () => {
  assert.ok(GEMINI_UNSUPPORTED_SCHEMA_KEYS.has("multipleOf"));
});
