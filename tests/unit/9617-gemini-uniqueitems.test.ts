import assert from "node:assert/strict";
import { test } from "node:test";

import { buildGeminiTools } from "../../open-sse/translator/helpers/geminiToolsSanitizer.ts";

// Issue #9617: Gemini rejects `uniqueItems` in function_declarations parameter schemas
// with HTTP 400 "Unknown name \"uniqueItems\" ... Cannot find field" (Gemini's protobuf-JSON
// schema parser only accepts a subset of JSON Schema/OpenAPI 3.0 — the same class of error
// already fixed for `multipleOf`, `minItems`, `maxItems`, `strict`, `encrypted` in
// GEMINI_UNSUPPORTED_SCHEMA_KEYS, open-sse/translator/helpers/geminiHelper.ts).
test("buildGeminiTools strips uniqueItems from array schemas (issue #9617)", () => {
  const tools = [
    {
      type: "function",
      function: {
        name: "exit_worktree",
        description: "test tool with an array-of-objects parameter",
        parameters: {
          type: "object",
          properties: {
            items: {
              type: "array",
              uniqueItems: true,
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  action: { type: "string" },
                },
                required: ["name", "action"],
              },
            },
          },
          required: ["items"],
        },
      },
    },
  ];

  const geminiTools = buildGeminiTools(tools);
  const serialized = JSON.stringify(geminiTools);

  assert.ok(geminiTools, "expected buildGeminiTools to return a tools array");
  assert.equal(
    serialized.includes("uniqueItems"),
    false,
    `uniqueItems leaked into the Gemini payload (would trigger upstream 400 "Unknown name \\"uniqueItems\\""): ${serialized}`
  );
});

// Companion: a top-level (non-nested) array property with uniqueItems is also stripped —
// matches the reporter's deeply-nested case with extra path coverage.
test("buildGeminiTools strips uniqueItems from a top-level array parameter schema (issue #9617)", () => {
  const tools = [
    {
      type: "function",
      function: {
        name: "list_worktrees",
        description: "test tool with a top-level array parameter",
        parameters: {
          type: "object",
          properties: {
            paths: {
              type: "array",
              uniqueItems: true,
              items: { type: "string" },
            },
          },
          required: ["paths"],
        },
      },
    },
  ];

  const serialized = JSON.stringify(buildGeminiTools(tools));
  assert.equal(serialized.includes("uniqueItems"), false);
});