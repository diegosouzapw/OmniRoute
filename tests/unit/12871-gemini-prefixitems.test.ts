import assert from "node:assert/strict";
import { test } from "node:test";

import { buildGeminiTools } from "../../open-sse/translator/helpers/geminiToolsSanitizer.ts";

// Issue #12871: Gemini rejects `prefixItems` in function_declarations parameter schemas
// with HTTP 400 "Unknown name \"prefixItems\" ... Cannot find field" (Gemini's protobuf-JSON
// schema parser only accepts a subset of JSON Schema/OpenAPI 3.0 — the same class of error
// already fixed for `uniqueItems` (#9617), `multipleOf`, `strict` and `encrypted` in
// GEMINI_UNSUPPORTED_SCHEMA_KEYS, open-sse/translator/helpers/geminiHelper.ts).
//
// Claude Code ships built-in tools whose schemas describe filter clauses as tuples, so
// leaving `prefixItems` in place breaks every tool-enabled request to a Gemini model.
test("buildGeminiTools strips prefixItems from tuple array schemas (issue #12871)", () => {
  const tools = [
    {
      type: "function",
      function: {
        name: "artifact_db",
        description: "test tool with a tuple-typed filter parameter",
        parameters: {
          type: "object",
          properties: {
            collection: { type: "string" },
            query: {
              type: "object",
              properties: {
                where: {
                  type: "array",
                  items: {
                    type: "array",
                    prefixItems: [
                      { type: "string" },
                      { type: "string", enum: ["eq", "ne", "lt", "gt"] },
                      {},
                    ],
                  },
                },
              },
            },
          },
          required: ["collection"],
        },
      },
    },
  ];

  const geminiTools = buildGeminiTools(tools);
  const serialized = JSON.stringify(geminiTools);

  assert.ok(geminiTools, "expected buildGeminiTools to return a tools array");
  assert.equal(
    serialized.includes("prefixItems"),
    false,
    `prefixItems leaked into the Gemini payload (would trigger upstream 400 "Unknown name \\"prefixItems\\""): ${serialized}`
  );
});

// The draft-07 spelling of the same tuple concept fails identically upstream.
test("buildGeminiTools strips additionalItems from tuple array schemas (issue #12871)", () => {
  const tools = [
    {
      type: "function",
      function: {
        name: "list_pairs",
        description: "test tool using the draft-07 tuple spelling",
        parameters: {
          type: "object",
          properties: {
            pairs: {
              type: "array",
              items: [{ type: "string" }, { type: "number" }],
              additionalItems: false,
            },
          },
          required: ["pairs"],
        },
      },
    },
  ];

  const serialized = JSON.stringify(buildGeminiTools(tools));
  assert.equal(serialized.includes("additionalItems"), false);
});

// Stripping the tuple must not leave a bare `type: "array"` behind: Gemini also requires
// every array schema to declare `items` (#10578). The existing ensureArrayItems() phase
// backfills it, so the parameter degrades to an untyped array rather than 400-ing.
test("stripped prefixItems arrays still declare an items schema (issue #12871)", () => {
  const tools = [
    {
      type: "function",
      function: {
        name: "tuple_only",
        description: "array described solely by prefixItems",
        parameters: {
          type: "object",
          properties: {
            pair: {
              type: "array",
              prefixItems: [{ type: "string" }, { type: "number" }],
            },
          },
          required: ["pair"],
        },
      },
    },
  ];

  const geminiTools = buildGeminiTools(tools) as
    | Array<{ functionDeclarations?: Array<{ parameters?: unknown }> }>
    | undefined;

  const parameters = geminiTools?.[0]?.functionDeclarations?.[0]?.parameters as
    | { properties?: Record<string, { type?: string; items?: unknown }> }
    | undefined;
  const pair = parameters?.properties?.pair;

  assert.equal(pair?.type, "array");
  assert.ok(pair?.items, "expected ensureArrayItems() to backfill an items schema");
});
