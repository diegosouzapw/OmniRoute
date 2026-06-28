// Regression test for #5154 — nameless <tool> blocks with <parameter> children
// are silently dropped (raw XML leaks to client) when no <name> child, no JSON body,
// and no tag-name suffix are present.
//
// Fix: when name resolution fails but <parameter> tags extracted params, attempt
// a conservative fuzzy-name resolution using the requested tools' parameter schemas.
// If exactly one requested tool's schema keys are a superset of the extracted param names,
// adopt that tool name. If zero or >1 match, keep returning null (no misattribution).

import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { parseDeepSeekToolCalls } from "../../open-sse/translator/deepseekWebTools.ts";

// Tools that define parameter schemas — needed so the schema-match can fire.
const TOOLS_WITH_SCHEMAS = [
  {
    type: "function",
    function: {
      name: "read",
      description: "Read a file",
      parameters: {
        type: "object",
        properties: {
          filePath: { type: "string" },
          offset: { type: "number" },
          limit: { type: "number" },
        },
        required: ["filePath"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "bash",
      description: "Run a shell command",
      parameters: {
        type: "object",
        properties: {
          command: { type: "string" },
        },
        required: ["command"],
      },
    },
  },
];

// Two tools that share parameter names — used to test the ambiguous case.
const AMBIGUOUS_TOOLS = [
  {
    type: "function",
    function: {
      name: "read_file",
      parameters: {
        type: "object",
        properties: {
          filePath: { type: "string" },
          offset: { type: "number" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "write_file",
      parameters: {
        type: "object",
        properties: {
          filePath: { type: "string" },
          offset: { type: "number" },
        },
      },
    },
  },
];

describe("deepseekWebTools — nameless <tool> blocks (#5154)", () => {
  test("nameless <tool> with <parameter> children resolves to the unique schema match", () => {
    // Reproduces issue #5154: model emits <tool> with no name, no JSON body, no tag suffix.
    // Previously: extractCall returned null → raw XML leaked to the client.
    // After fix: params filePath+offset uniquely match the 'read' tool schema → name recovered.
    const text = `<tool><parameter name="filePath">"x"</parameter><parameter name="offset">675</parameter></tool>`;
    const { toolCalls, content } = parseDeepSeekToolCalls(text, "call", TOOLS_WITH_SCHEMAS);

    assert.ok(toolCalls && toolCalls.length === 1, "expected exactly one tool call, got null/empty");
    assert.equal(toolCalls![0].function.name, "read", "tool name resolved via schema match");
    const args = JSON.parse(toolCalls![0].function.arguments);
    assert.ok("filePath" in args, "filePath argument present");
    assert.ok("offset" in args, "offset argument present");
    assert.ok(!content.includes("<tool"), "tool block stripped from content");
  });

  test("nameless <tool> with only one matching param resolves when that param is unique to one tool", () => {
    // 'command' uniquely identifies 'bash' tool.
    const text = `<tool><parameter name="command">echo hello</parameter></tool>`;
    const { toolCalls } = parseDeepSeekToolCalls(text, "call", TOOLS_WITH_SCHEMAS);

    assert.ok(toolCalls && toolCalls.length === 1, "expected exactly one tool call");
    assert.equal(toolCalls![0].function.name, "bash");
    assert.deepEqual(JSON.parse(toolCalls![0].function.arguments), { command: "echo hello" });
  });

  test("nameless <tool> is NOT resolved when params are ambiguous (>1 schema match)", () => {
    // Both 'read_file' and 'write_file' have the same filePath+offset schema.
    // The parser must NOT misattribute — it should return null (no tool call).
    const text = `<tool><parameter name="filePath">/etc/hosts</parameter><parameter name="offset">0</parameter></tool>`;
    const { toolCalls } = parseDeepSeekToolCalls(text, "call", AMBIGUOUS_TOOLS);

    assert.ok(!toolCalls || toolCalls.length === 0, "must not emit a call when params are ambiguous");
  });

  test("nameless <tool> is NOT resolved when no tool schema matches the extracted params", () => {
    // Param 'unknownKey' doesn't appear in any tool schema.
    const text = `<tool><parameter name="unknownKey">value</parameter></tool>`;
    const { toolCalls } = parseDeepSeekToolCalls(text, "call", TOOLS_WITH_SCHEMAS);

    assert.ok(!toolCalls || toolCalls.length === 0, "must not emit a call when no schema matches");
  });

  test("existing named <tool:read> blocks still work (no regression)", () => {
    // Verify the pre-existing named-tag path is unaffected.
    const tools = [
      {
        type: "function",
        function: {
          name: "read",
          parameters: {
            type: "object",
            properties: { filePath: { type: "string" } },
          },
        },
      },
    ];
    const text = `<tool:read>{"filePath": "/tmp/test.py"}</tool>`;
    const { toolCalls } = parseDeepSeekToolCalls(text, "call", tools);

    assert.ok(toolCalls && toolCalls.length === 1);
    assert.equal(toolCalls![0].function.name, "read");
    assert.deepEqual(JSON.parse(toolCalls![0].function.arguments), { filePath: "/tmp/test.py" });
  });

  test("existing <tool>{json}</tool> canonical blocks still work (no regression)", () => {
    const text = `<tool>{"name": "bash", "arguments": {"command": "ls -la"}}</tool>`;
    const { toolCalls } = parseDeepSeekToolCalls(text, "call", TOOLS_WITH_SCHEMAS);

    assert.ok(toolCalls && toolCalls.length === 1);
    assert.equal(toolCalls![0].function.name, "bash");
    assert.deepEqual(JSON.parse(toolCalls![0].function.arguments), { command: "ls -la" });
  });
});
