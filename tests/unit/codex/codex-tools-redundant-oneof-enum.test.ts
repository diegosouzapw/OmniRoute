import assert from "node:assert/strict";
import test from "node:test";

import {
  normalizeCodexTools,
  stripRedundantOneOfConstEnum,
} from "../../../open-sse/executors/codex/tools.ts";

type JsonRecord = Record<string, unknown>;

const PRODUCTION_ACTION_VALUES = [
  "read_file",
  "write_file",
  "list_files",
  "search_files",
  "run_command",
  "create_directory",
  "delete_file",
  "move_file",
  "copy_file",
  "rename_file",
  "open_terminal",
  "close_terminal",
  "get_status",
] as const;

function productionParameters(): JsonRecord {
  return {
    type: "object",
    description: "OpenChamber action parameters",
    properties: {
      action: {
        type: "string",
        description: "Action to perform",
        enum: [...PRODUCTION_ACTION_VALUES],
        oneOf: PRODUCTION_ACTION_VALUES.map((value) => ({
          const: value,
          description: `Action ${value}`,
        })),
      },
    },
    required: ["action"],
  };
}

function chatTool(parameters: JsonRecord): JsonRecord {
  return {
    type: "function",
    function: { name: "test_tool", parameters },
  };
}

test("production openchamber shape is normalized", () => {
  const tool = chatTool(productionParameters());
  normalizeCodexTools({ tools: [tool] });

  const parameters = tool.parameters as JsonRecord;
  const properties = parameters.properties as JsonRecord;
  const action = properties.action as JsonRecord;
  assert.equal(action.oneOf, undefined);
  assert.deepEqual(action.enum, [...PRODUCTION_ACTION_VALUES]);
  assert.equal(parameters.type, "object");
  assert.equal(parameters.description, "OpenChamber action parameters");
  assert.deepEqual(parameters.required, ["action"]);
});

test("bare oneOf[const] without sibling enum is preserved", () => {
  const tool = chatTool({ oneOf: [{ const: "x" }, { const: "y" }] });
  normalizeCodexTools({ tools: [tool] });

  const oneOf = (tool.parameters as JsonRecord).oneOf as unknown[];
  assert.equal(oneOf.length, 2);
});

test("non-matching enum is preserved", () => {
  const tool = chatTool({
    enum: ["a", "b", "c"],
    oneOf: [{ const: "a" }, { const: "b" }],
  });
  normalizeCodexTools({ tools: [tool] });

  assert.deepEqual((tool.parameters as JsonRecord).oneOf, [{ const: "a" }, { const: "b" }]);
});

test("partially overlapping enum is preserved", () => {
  const tool = chatTool({
    enum: ["a", "b", "c"],
    oneOf: [{ const: "a" }, { const: "d" }],
  });
  normalizeCodexTools({ tools: [tool] });

  assert.deepEqual((tool.parameters as JsonRecord).oneOf, [{ const: "a" }, { const: "d" }]);
});

test("enum with extra value is preserved", () => {
  const tool = chatTool({ enum: ["a", "b"], oneOf: [{ const: "a" }] });
  normalizeCodexTools({ tools: [tool] });

  assert.deepEqual((tool.parameters as JsonRecord).oneOf, [{ const: "a" }]);
});

test("duplicate const branches are preserved", () => {
  const tool = chatTool({
    enum: ["a", "b"],
    oneOf: [{ const: "a" }, { const: "a" }],
  });
  normalizeCodexTools({ tools: [tool] });

  assert.deepEqual((tool.parameters as JsonRecord).oneOf, [{ const: "a" }, { const: "a" }]);
});

test("branch with validation keyword is preserved", () => {
  const tool = chatTool({
    enum: ["a", "b"],
    oneOf: [{ const: "a", type: "string" }, { const: "b" }],
  });
  normalizeCodexTools({ tools: [tool] });

  assert.deepEqual((tool.parameters as JsonRecord).oneOf, [
    { const: "a", type: "string" },
    { const: "b" },
  ]);
});

test("type-discriminated oneOf is preserved", () => {
  const tool = chatTool({ oneOf: [{ type: "string" }, { type: "number" }] });
  normalizeCodexTools({ tools: [tool] });

  assert.deepEqual((tool.parameters as JsonRecord).oneOf, [{ type: "string" }, { type: "number" }]);
});

test("empty oneOf is preserved", () => {
  const tool = chatTool({ enum: ["a"], oneOf: [] });
  normalizeCodexTools({ tools: [tool] });

  assert.deepEqual((tool.parameters as JsonRecord).oneOf, []);
});

test("single-branch exact match is stripped", () => {
  const tool = chatTool({ enum: ["x"], oneOf: [{ const: "x" }] });
  normalizeCodexTools({ tools: [tool] });

  const parameters = tool.parameters as JsonRecord;
  assert.equal(parameters.oneOf, undefined);
  assert.deepEqual(parameters.enum, ["x"]);
});

test("non-string const is preserved", () => {
  const tool = chatTool({ enum: [1, 2], oneOf: [{ const: 1 }, { const: 2 }] });
  normalizeCodexTools({ tools: [tool] });

  assert.deepEqual((tool.parameters as JsonRecord).oneOf, [{ const: 1 }, { const: 2 }]);
});

test("non-string enum is preserved", () => {
  const tool = chatTool({ enum: [{ a: 1 }], oneOf: [{ const: "x" }] });
  normalizeCodexTools({ tools: [tool] });

  assert.deepEqual((tool.parameters as JsonRecord).oneOf, [{ const: "x" }]);
});

test("anyOf is preserved while the walker strips its inner oneOf", () => {
  const tool = chatTool({
    anyOf: [{ enum: ["a", "b"], oneOf: [{ const: "a" }, { const: "b" }] }],
  });
  normalizeCodexTools({ tools: [tool] });

  const parameters = tool.parameters as JsonRecord;
  const anyOf = parameters.anyOf as JsonRecord[];
  assert.equal(anyOf.length, 1);
  assert.equal(anyOf[0].oneOf, undefined);
});

test("allOf is preserved while the walker strips its inner oneOf", () => {
  const tool = chatTool({ allOf: [{ enum: ["a"], oneOf: [{ const: "a" }] }] });
  normalizeCodexTools({ tools: [tool] });

  const parameters = tool.parameters as JsonRecord;
  const allOf = parameters.allOf as JsonRecord[];
  assert.equal(allOf.length, 1);
  assert.equal(allOf[0].oneOf, undefined);
});

test("nested oneOf in properties is stripped", () => {
  const tool = chatTool({
    properties: {
      action: {
        enum: ["a", "b"],
        oneOf: [
          { const: "a", description: "A" },
          { const: "b", description: "B" },
        ],
      },
    },
  });
  normalizeCodexTools({ tools: [tool] });

  const properties = (tool.parameters as JsonRecord).properties as JsonRecord;
  const action = properties.action as JsonRecord;
  assert.equal(action.oneOf, undefined);
  assert.deepEqual(action.enum, ["a", "b"]);
});

test("nested oneOf in items is stripped", () => {
  const tool = chatTool({ items: { enum: ["a", "b"], oneOf: [{ const: "a" }, { const: "b" }] } });
  normalizeCodexTools({ tools: [tool] });

  const items = (tool.parameters as JsonRecord).items as JsonRecord;
  assert.equal(items.oneOf, undefined);
});

test("nested oneOf in additionalProperties is stripped", () => {
  const tool = chatTool({
    additionalProperties: {
      enum: ["p", "q"],
      oneOf: [{ const: "p" }, { const: "q" }],
    },
  });
  normalizeCodexTools({ tools: [tool] });

  const additionalProperties = (tool.parameters as JsonRecord).additionalProperties as JsonRecord;
  assert.equal(additionalProperties.oneOf, undefined);
});

test("nested oneOf in $defs is stripped", () => {
  const tool = chatTool({
    $defs: { D: { enum: ["d1", "d2"], oneOf: [{ const: "d1" }, { const: "d2" }] } },
  });
  normalizeCodexTools({ tools: [tool] });

  const defs = (tool.parameters as JsonRecord).$defs as JsonRecord;
  const definition = defs.D as JsonRecord;
  assert.equal(definition.oneOf, undefined);
});

test("nested oneOf in patternProperties is stripped", () => {
  const tool = chatTool({
    patternProperties: { "^x$": { enum: ["a"], oneOf: [{ const: "a" }] } },
  });
  normalizeCodexTools({ tools: [tool] });

  const patternProperties = (tool.parameters as JsonRecord).patternProperties as JsonRecord;
  const pattern = patternProperties["^x$"] as JsonRecord;
  assert.equal(pattern.oneOf, undefined);
});

test("stripping is idempotent", () => {
  const first = stripRedundantOneOfConstEnum(productionParameters());
  const second = stripRedundantOneOfConstEnum(first);

  assert.deepEqual(second, first);
});

test("stripping is immutable", () => {
  const original = productionParameters();
  const before = structuredClone(original);
  const result = stripRedundantOneOfConstEnum(original) as JsonRecord;

  const properties = original.properties as JsonRecord;
  const action = properties.action as JsonRecord;
  assert.deepEqual(original, before);
  assert.ok(Array.isArray(action.oneOf));
  assert.notStrictEqual(result, original);
});

test("Chat wrapper is flattened to the flat Responses form", () => {
  const tool = chatTool({
    properties: {
      action: { enum: ["a", "b"], oneOf: [{ const: "a" }, { const: "b" }] },
    },
  });
  normalizeCodexTools({ tools: [tool] });

  const parameters = tool.parameters as JsonRecord;
  const properties = parameters.properties as JsonRecord;
  const action = properties.action as JsonRecord;
  assert.equal(action.oneOf, undefined);
  assert.equal(tool.function, undefined);
  assert.equal(tool.name, "test_tool");
});
