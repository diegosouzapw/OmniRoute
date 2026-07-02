// Regression test: `pattern` must be preserved in antigravity tool schemas.
//
// Upstream: decolua/9router @ f6c2f7ca / Fixes decolua/9router#1368.
//
// Tools such as glob/grep/file-search rely on a `pattern` constraint on
// string parameters. Antigravity (Gemini-derived) DOES accept `pattern`,
// so removing it for that surface drops critical tool semantics and
// produces upstream 400s / wrong-tool-call behavior.
//
// Two assertions, mirroring how the field is consumed downstream:
//   1) `pattern` must NOT live in the unsupported keyword set used by the
//      antigravity schema cleaner.
//   2) End-to-end, `cleanJSONSchemaForAntigravity` must preserve a `pattern`
//      constraint placed on a string property (typical glob/grep tool).

import test from "node:test";
import assert from "node:assert/strict";

import {
  GEMINI_UNSUPPORTED_SCHEMA_KEYS,
  cleanJSONSchemaForAntigravity,
} from "../../open-sse/translator/helpers/geminiHelper.ts";

test("GEMINI_UNSUPPORTED_SCHEMA_KEYS does not strip `pattern` for antigravity", () => {
  assert.equal(
    GEMINI_UNSUPPORTED_SCHEMA_KEYS.has("pattern"),
    false,
    "`pattern` is supported by antigravity and must be preserved on tool schemas"
  );
});

test("cleanJSONSchemaForAntigravity preserves `pattern` on glob/grep-style tool schema", () => {
  const schema = {
    type: "object",
    properties: {
      glob: {
        type: "string",
        description: "Glob pattern to match files",
        pattern: "^[A-Za-z0-9_\\-/*.]+$",
      },
    },
    required: ["glob"],
  };

  const cleaned = cleanJSONSchemaForAntigravity(schema) as {
    properties: { glob: { pattern?: string } };
  };

  assert.equal(
    cleaned.properties.glob.pattern,
    "^[A-Za-z0-9_\\-/*.]+$",
    "`pattern` constraint on a string property must survive antigravity cleaning"
  );
});
