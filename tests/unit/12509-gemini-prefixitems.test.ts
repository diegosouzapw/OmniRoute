import assert from "node:assert/strict";
import { test } from "node:test";

import { buildGeminiTools } from "../../open-sse/translator/helpers/geminiToolsSanitizer.ts";
import { GEMINI_UNSUPPORTED_SCHEMA_KEYS } from "../../open-sse/translator/helpers/geminiHelper.ts";

// Issue #12509: Gemini rejects the JSON-Schema-2020-12 tuple keyword `prefixItems` in
// function_declarations parameter schemas with HTTP 400
// `Unknown name "prefixItems" at 'tools[0].function_declarations[1].parameters.properties[5]
// .value.properties[0].value.items': Cannot find field.` — the same class of error already
// fixed for `uniqueItems` (#9617), `multipleOf`, `strict` and `encrypted` in
// GEMINI_UNSUPPORTED_SCHEMA_KEYS (open-sse/translator/helpers/geminiHelper.ts).

type GeminiFunctionDeclaration = { name: string; parameters: Record<string, unknown> };

function declarationsOf(tools: unknown[]): GeminiFunctionDeclaration[] {
  const geminiTools = buildGeminiTools(tools) as Array<{
    functionDeclarations?: GeminiFunctionDeclaration[];
  }> | null;
  assert.ok(geminiTools, "expected buildGeminiTools to return a tools array");
  return geminiTools.flatMap((tool) => tool.functionDeclarations ?? []);
}

function assertNoPrefixItems(tools: unknown[]): GeminiFunctionDeclaration[] {
  const declarations = declarationsOf(tools);
  const serialized = JSON.stringify(declarations);
  assert.equal(
    serialized.includes("prefixItems"),
    false,
    `prefixItems leaked into the Gemini payload (would trigger upstream 400 "Unknown name \\"prefixItems\\""): ${serialized}`
  );
  return declarations;
}

// The reporter's shape: a tuple nested under `items` — an array of `[start_line, end_line]`
// ranges, i.e. `properties.ranges.items.prefixItems`.
const nestedTupleParameters = {
  type: "object",
  properties: {
    file_path: { type: "string" },
    ranges: {
      type: "array",
      description: "Line ranges to read",
      items: {
        type: "array",
        prefixItems: [{ type: "integer" }, { type: "integer" }],
        items: false,
        minItems: 2,
        maxItems: 2,
      },
    },
  },
  required: ["file_path", "ranges"],
};

test("buildGeminiTools strips prefixItems nested under items (OpenAI tool shape, issue #12509)", () => {
  const [declaration] = assertNoPrefixItems([
    {
      type: "function",
      function: {
        name: "read_ranges",
        description: "tuple-typed array parameter nested under items",
        parameters: nestedTupleParameters,
      },
    },
  ]);

  const ranges = (declaration.parameters.properties as Record<string, Record<string, unknown>>)
    .ranges;
  assert.equal(ranges.type, "array");
  const inner = ranges.items as Record<string, unknown>;
  assert.equal(inner.type, "array");
  assert.ok(inner.items && typeof inner.items === "object", "inner array keeps an items schema");
});

test("buildGeminiTools strips prefixItems from a Claude input_schema (issue #12509)", () => {
  const [declaration] = assertNoPrefixItems([
    {
      name: "read_ranges",
      description: "Claude Messages tool shape",
      input_schema: nestedTupleParameters,
    },
  ]);
  assert.equal(declaration.name, "read_ranges");
});

test("buildGeminiTools strips a top-level prefixItems tuple and keeps a usable items schema (issue #12509)", () => {
  const [declaration] = assertNoPrefixItems([
    {
      type: "function",
      function: {
        name: "read_range",
        description: "single [start_line, end_line] tuple",
        parameters: {
          type: "object",
          properties: {
            range: {
              type: "array",
              prefixItems: [{ type: "integer" }, { type: "integer" }],
            },
          },
          required: ["range"],
        },
      },
    },
  ]);

  const range = (declaration.parameters.properties as Record<string, Record<string, unknown>>)
    .range;
  assert.equal(range.type, "array");
  assert.ok(range.items && typeof range.items === "object", "Gemini requires items on arrays");
});

test("buildGeminiTools strips prefixItems that sits next to a regular items schema (issue #12509)", () => {
  const [declaration] = assertNoPrefixItems([
    {
      type: "function",
      function: {
        name: "pair",
        description: "tuple keyword as a sibling of a regular items schema",
        parameters: {
          type: "object",
          properties: {
            pair: {
              type: "array",
              prefixItems: [{ type: "string" }],
              items: { type: "string" },
            },
          },
        },
      },
    },
  ]);

  const pair = (declaration.parameters.properties as Record<string, Record<string, unknown>>).pair;
  assert.deepEqual(pair.items, { type: "string" });
});

test("prefixItems is registered in GEMINI_UNSUPPORTED_SCHEMA_KEYS (issue #12509)", () => {
  assert.ok(GEMINI_UNSUPPORTED_SCHEMA_KEYS.has("prefixItems"));
});
