import assert from "node:assert/strict";
import test from "node:test";

import { normalizeCodexTools } from "../../../open-sse/executors/codex/tools.ts";

type JsonRecord = Record<string, unknown>;

function functionTool(name: string, definition: JsonRecord, extra: JsonRecord = {}): JsonRecord {
  return {
    type: "function",
    name,
    parameters: { type: "object" },
    ...extra,
    ...definition,
  };
}

function nestedFunctionTool(name: string, definition: JsonRecord): JsonRecord {
  return {
    type: "function",
    function: {
      name,
      parameters: { type: "object" },
      ...definition,
    },
  };
}

function strictOf(tool: JsonRecord): unknown {
  return tool.strict;
}

test("default false applies to omitted nested and flat function strict", () => {
  const flat = functionTool("flat_tool", {});
  const nested = nestedFunctionTool("nested_tool", {});

  normalizeCodexTools({ tools: [flat, nested] }, { defaultFunctionStrict: false });

  assert.equal(strictOf(flat), false);
  assert.equal(strictOf(nested), false);
});

test("omitted function strict stays omitted without a fallback", () => {
  const flat = functionTool("flat_tool", {});
  const nested = nestedFunctionTool("nested_tool", {});

  normalizeCodexTools({ tools: [flat, nested] });

  assert.equal(strictOf(flat), undefined);
  assert.equal(strictOf(nested), undefined);
});

test("explicit top-level true and false are preserved", () => {
  for (const value of [true, false]) {
    const tool = functionTool("top_level_tool", { strict: value });

    normalizeCodexTools({ tools: [tool] }, { defaultFunctionStrict: !value });

    assert.equal(strictOf(tool), value);
  }
});

test("explicit nested function true and false are preserved", () => {
  for (const value of [true, false]) {
    const tool = nestedFunctionTool("nested_tool", { strict: value });

    normalizeCodexTools({ tools: [tool] }, { defaultFunctionStrict: !value });

    assert.equal(strictOf(tool), value);
  }
});

test("top-level boolean strict takes precedence over nested boolean strict", () => {
  const topLevelTrue = nestedFunctionTool("top_true", { strict: false });
  topLevelTrue.strict = true;
  const topLevelFalse = nestedFunctionTool("top_false", { strict: true });
  topLevelFalse.strict = false;

  normalizeCodexTools({ tools: [topLevelTrue, topLevelFalse] }, { defaultFunctionStrict: true });

  assert.equal(strictOf(topLevelTrue), true);
  assert.equal(strictOf(topLevelFalse), false);
});

test("nonboolean explicit strict values fall back through the precedence chain", () => {
  const topNonBoolean = nestedFunctionTool("nested_boolean", { strict: false });
  topNonBoolean.strict = "true";
  const bothNonBoolean = nestedFunctionTool("fallback", { strict: "false" });
  bothNonBoolean.strict = 1;

  normalizeCodexTools({ tools: [topNonBoolean, bothNonBoolean] }, { defaultFunctionStrict: true });

  assert.equal(strictOf(topNonBoolean), false);
  assert.equal(strictOf(bothNonBoolean), true);
});

test("hosted, namespace, and custom tools are unchanged by function strict defaults", () => {
  const hosted = { type: "web_search", search_context_size: "high" };
  const namespace = {
    type: "namespace",
    name: "mcp__example__",
    tools: [{ type: "function", name: "search", parameters: { type: "object" } }],
  };
  const custom = {
    type: "custom",
    name: "apply_patch",
    format: { type: "grammar", syntax: "lark", definition: "start: /.+/" },
  };
  const tools = [hosted, namespace, custom];
  const before = structuredClone(tools);

  normalizeCodexTools({ tools }, { defaultFunctionStrict: false, preserveCustomTools: true });

  assert.deepEqual(tools, before);
});

// Since #9828 (16bf95fe33), normalizeCodexTools strips a `oneOf` that is fully
// redundant with a sibling `enum` (Codex private Responses 502 workaround); the
// rest of the production-like schema must still be preserved exactly.
test("production-like enum and oneOf schema keeps everything but the redundant oneOf", () => {
  const parameters = {
    type: "object",
    description: "Dynamic action parameters",
    properties: {
      action: {
        type: "string",
        enum: ["read_file", "write_file", "list_files"],
        oneOf: [
          {
            const: "write_file",
            description: "Write a file",
            title: "Write file",
            $comment: "branch 1",
          },
          {
            const: "read_file",
            description: "Read a file",
            title: "Read file",
            $comment: "branch 2",
          },
          {
            const: "list_files",
            description: "List files",
            title: "List files",
            $comment: "branch 3",
          },
        ],
      },
    },
    required: ["action"],
  };
  const tool = {
    type: "function",
    function: { name: "dynamic_tool", parameters },
  } as JsonRecord;
  const expected = structuredClone(parameters);
  // #9828: the const set exactly matches the sibling enum, so oneOf is dropped.
  delete (expected.properties.action as { oneOf?: unknown }).oneOf;

  normalizeCodexTools({ tools: [tool] });

  assert.deepEqual(tool.parameters, expected);
});
