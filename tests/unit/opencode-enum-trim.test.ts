import test from "node:test";
import assert from "node:assert/strict";

import { trimOversizedToolEnums } from "../../open-sse/executors/opencodeEnumTrim.ts";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";

// Upstream 400 observed on opencode free-tier models (VSCode-shaped caller
// tools): "a single enum property with more than 250 values exceeds the
// maximum combined enum string length of 15000 characters". The router must
// cap oversized enums before dispatch instead of forwarding the 400.
function bigEnumTool(valueCount: number, prefix = "value") {
  return {
    type: "function",
    function: {
      name: "caller_tool",
      description: "A caller-provided tool",
      parameters: {
        type: "object",
        properties: {
          choice: {
            type: "string",
            enum: Array.from({ length: valueCount }, (_, i) => `${prefix}_${i}`),
          },
        },
      },
    },
  };
}

type EnumChoiceProperty = { enum: string[]; description?: string };
type EnumTestTool = {
  type: string;
  function: {
    name: string;
    description?: string;
    parameters: { type: string; properties: Record<string, EnumChoiceProperty> };
  };
};

function enumOf(tool: EnumTestTool): string[] {
  return tool.function.parameters.properties.choice.enum;
}

test("trimOversizedToolEnums: small enums pass through untouched", () => {
  const tools = [bigEnumTool(10)];
  const before = JSON.stringify(tools);
  assert.equal(trimOversizedToolEnums(tools), 0);
  assert.equal(JSON.stringify(tools), before);
});

test("trimOversizedToolEnums: 300-value enum is capped to 200 with a note", () => {
  const tools = [bigEnumTool(300)];
  assert.equal(trimOversizedToolEnums(tools), 1);
  const values = enumOf(tools[0]);
  assert.equal(values.length, 200);
  assert.equal(values[0], "value_0");
  assert.equal(values[199], "value_199");
  const description = tools[0].function.parameters.properties.choice.description;
  assert.match(description, /\+100 more values allowed/);
});

test("trimOversizedToolEnums: long combined chars trigger even below 250 values", () => {
  const tools = [bigEnumTool(100, "x".repeat(200))];
  assert.equal(trimOversizedToolEnums(tools), 1);
  const values = enumOf(tools[0]);
  const combined = values.join("").length;
  assert.ok(combined <= 12000, `combined ${combined} exceeds 12000 cap`);
  assert.ok(values.length < 100, "expected values to be dropped to fit the char cap");
});

test("trimOversizedToolEnums: non-string enum values do not crash", () => {
  const tools = [
    {
      type: "function",
      function: {
        name: "mixed_tool",
        parameters: {
          type: "object",
          properties: {
            count: { type: "integer", enum: Array.from({ length: 300 }, (_, i) => i) },
          },
        },
      },
    },
  ];
  assert.equal(trimOversizedToolEnums(tools), 1);
  assert.equal(tools[0].function.parameters.properties.count.enum.length, 200);
});

test("OpencodeExecutor.transformRequest: VSCode-shaped 300-enum tool is trimmed for oc models", () => {
  const executor = new OpencodeExecutor("opencode");
  const body = {
    model: "big-pickle",
    messages: [{ role: "user", content: "hi" }],
    tools: [bigEnumTool(300)],
    stream: true,
  };
  const transformed = executor.transformRequest("big-pickle", body, true, {
    apiKey: "sk-test",
  }) as { tools?: EnumTestTool[] };
  assert.ok(Array.isArray(transformed.tools), "expected tools to survive");
  const values = enumOf((transformed.tools as EnumTestTool[])[0]);
  assert.equal(values.length, 200);
});
