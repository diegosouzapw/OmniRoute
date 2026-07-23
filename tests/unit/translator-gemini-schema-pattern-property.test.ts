import test from "node:test";
import assert from "node:assert/strict";

// Regression for port-from-9router#1368: the Gemini/Antigravity schema sanitizer
// strips JSON-Schema *constraint* keywords (pattern, minLength, ...) that Gemini
// rejects. But it must NOT strip a tool property that is merely *named* like one of
// those keywords. glob/grep tools declare a property literally called `pattern`;
// deleting it (and then dropping it from `required`) made those tools unusable on
// `ag/*` (Antigravity) backends.
const { cleanJSONSchemaForAntigravity } = await import(
  "../../open-sse/translator/helpers/geminiHelper.ts"
);

test("#1368: a property named 'pattern' survives Gemini schema sanitization", () => {
  // Mirrors the grep tool's input schema (property name === constraint keyword).
  const grepParams = {
    type: "object",
    properties: {
      pattern: { type: "string", description: "The regex pattern to search for" },
      path: { type: "string", description: "Directory to search in" },
    },
    required: ["pattern", "path"],
  };

  const cleaned = cleanJSONSchemaForAntigravity(grepParams) as {
    properties: Record<string, unknown>;
    required?: string[];
  };

  // The `pattern` *property* must be preserved (it is a tool argument, not a
  // string-validation constraint on the object schema itself).
  assert.ok(
    cleaned.properties && Object.prototype.hasOwnProperty.call(cleaned.properties, "pattern"),
    "expected `properties.pattern` to be preserved"
  );
  assert.equal((cleaned.properties.pattern as { type?: string }).type, "string");
  // And it must remain in `required` (cleanupRequired drops names with no property).
  assert.ok(
    Array.isArray(cleaned.required) && cleaned.required.includes("pattern"),
    "expected `required` to still include `pattern`"
  );
});

test("#1368: a string-level `pattern` CONSTRAINT is preserved for antigravity", () => {
  // Antigravity (Gemini-derived) DOES accept `pattern` on string constraints.
  // Stripping it broke glob/grep/file-search tools that express their argument
  // regex via `pattern`. The sanitizer must keep it. (Ported from 9router @ f6c2f7ca.)
  const schema = {
    type: "object",
    properties: {
      code: { type: "string", pattern: "^[A-Z]{3}$", description: "country code" },
    },
    required: ["code"],
  };

  const cleaned = cleanJSONSchemaForAntigravity(schema) as {
    properties: { code: Record<string, unknown> };
  };

  assert.ok(cleaned.properties.code, "the `code` property itself survives");
  assert.equal(
    (cleaned.properties.code as { pattern?: string }).pattern,
    "^[A-Z]{3}$",
    "the string `pattern` constraint must be preserved for antigravity"
  );
});
