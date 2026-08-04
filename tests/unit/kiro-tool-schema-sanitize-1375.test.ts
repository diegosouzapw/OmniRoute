import test from "node:test";
import assert from "node:assert/strict";

import { sanitizeKiroTools } from "../../open-sse/utils/kiroSanitizer.ts";
const { convertKiroToOpenAI } = await import(
  "../../open-sse/translator/response/kiro-to-openai.ts"
);

// #1375 — Kiro returns 400 "Improperly formed request" when a tool schema
// carries unsupported JSON-Schema keywords or a tool name longer than 64 chars.

test("sanitizeKiroTools: strips unsupported JSON-Schema keywords recursively", () => {
  const tools = [
    {
      toolSpecification: {
        name: "search",
        inputSchema: {
          json: {
            type: "object",
            additionalProperties: false,
            $schema: "http://json-schema.org/draft-07/schema#",
            properties: {
              filter: {
                anyOf: [{ type: "string" }, { type: "null" }],
                $ref: "#/$defs/Filter",
                description: "kept",
              },
            },
            $defs: { Filter: { type: "string" } },
          },
        },
      },
    },
  ];

  const { tools: out } = sanitizeKiroTools(tools);
  const schema = out[0].toolSpecification.inputSchema.json;

  assert.equal("additionalProperties" in schema, false);
  assert.equal("$schema" in schema, false);
  assert.equal("$defs" in schema, false);
  assert.equal("anyOf" in schema.properties.filter, false);
  assert.equal("$ref" in schema.properties.filter, false);
  // Non-stripped keys survive.
  assert.equal(schema.properties.filter.description, "kept");
  assert.equal(schema.type, "object");
});

test("sanitizeKiroTools: drops empty required array and guarantees required:[]", () => {
  const { tools: out } = sanitizeKiroTools([
    {
      toolSpecification: {
        name: "noop",
        inputSchema: { json: { type: "object", properties: {}, required: [] } },
      },
    },
  ]);

  const schema = out[0].toolSpecification.inputSchema.json;
  assert.deepEqual(schema.required, []);
});

test("sanitizeKiroTools: hash-truncates names >64 chars and records nameMap", () => {
  const longName = "a".repeat(80);
  const { tools: out, nameMap } = sanitizeKiroTools([
    {
      toolSpecification: {
        name: longName,
        inputSchema: { json: { type: "object", properties: {} } },
      },
    },
  ]);

  const truncated = out[0].toolSpecification.name;
  assert.ok(truncated.length <= 64, `truncated name should be <=64, got ${truncated.length}`);
  assert.notEqual(truncated, longName);
  // nameMap maps the truncated name back to the original.
  assert.equal(nameMap.get(truncated), longName);
});

test("sanitizeKiroTools: short names are left untouched with an empty nameMap", () => {
  const { tools: out, nameMap } = sanitizeKiroTools([
    {
      toolSpecification: {
        name: "read_file",
        inputSchema: { json: { type: "object", properties: {}, required: ["path"] } },
      },
    },
  ]);

  assert.equal(out[0].toolSpecification.name, "read_file");
  assert.equal(out[0].toolSpecification.inputSchema.json.required[0], "path");
  assert.equal(nameMap.size, 0);
});

test("sanitizeKiroTools: non-array input is returned untouched", () => {
  const { tools, nameMap } = sanitizeKiroTools(undefined);
  assert.equal(tools, undefined);
  assert.equal(nameMap.size, 0);
});

test("kiro-to-openai: streamed tool name is reverse-mapped via state.toolNameMap (#1375)", () => {
  const longName = "b".repeat(80);
  // Build the truncated name exactly as sanitizeKiroTools would, then verify
  // the response translator maps the streamed (truncated) name back.
  const { tools: out, nameMap } = sanitizeKiroTools([
    {
      toolSpecification: {
        name: longName,
        inputSchema: { json: { type: "object", properties: {} } },
      },
    },
  ]);
  const truncated = out[0].toolSpecification.name;

  const result = convertKiroToOpenAI(
    { _eventType: "toolUseEvent", toolUseId: "call_9", name: truncated, input: {} },
    { toolNameMap: nameMap }
  );

  assert.equal(result.choices[0].delta.tool_calls[0].function.name, longName);
});

test("kiro-to-openai: unmapped tool name passes through unchanged", () => {
  const result = convertKiroToOpenAI(
    { _eventType: "toolUseEvent", toolUseId: "call_10", name: "read_file", input: {} },
    { toolNameMap: new Map() }
  );

  assert.equal(result.choices[0].delta.tool_calls[0].function.name, "read_file");
});
