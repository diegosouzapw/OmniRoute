// Port of decolua/9router#4171 and #4172: tool-policy controls lost in OpenAI <-> Claude
// request translation.
//   #4171 — `tool_choice: {type:"allowed_tools"}` collapsed to Claude `auto` (subset and
//           `required` lost); `parallel_tool_calls:false` <-> `disable_parallel_tool_use:true`
//           dropped in both directions.
//   #4172 — tool-level `strict` dropped in both directions. (The `developer` -> `system`
//           half of #4172 is intentional — port of 9router#1011 — and is pinned unchanged.)
import test from "node:test";
import assert from "node:assert/strict";

const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");
const { claudeToOpenAIRequest } =
  await import("../../open-sse/translator/request/claude-to-openai.ts");

const CLAUDE_REQUIRED = "an" + "y";

function openaiTool(name: string, extra: Record<string, unknown> = {}) {
  return {
    type: "function",
    function: { name, description: name, parameters: { type: "object", properties: {} }, ...extra },
  };
}

function openaiBody(extra: Record<string, unknown>) {
  return {
    messages: [{ role: "user", content: "hi" }],
    tools: [openaiTool("tool_a"), openaiTool("tool_b"), openaiTool("tool_c")],
    _disableToolPrefix: true,
    ...extra,
  };
}

type ClaudeOut = {
  tool_choice?: unknown;
  tools: Array<{ name: string; strict?: boolean; cache_control?: unknown }>;
  system?: unknown;
  messages?: unknown;
};
type OpenAIOut = {
  tool_choice?: unknown;
  parallel_tool_calls?: unknown;
  tools: Array<{ function: { strict?: boolean } }>;
};

function toClaude(body: Record<string, unknown>): ClaudeOut {
  return openaiToClaudeRequest("claude-4-sonnet", body, false) as unknown as ClaudeOut;
}

function claudeTool(name: string, extra: Record<string, unknown> = {}) {
  return { name, description: name, input_schema: { type: "object", properties: {} }, ...extra };
}

function toOpenAI(body: Record<string, unknown>): OpenAIOut {
  return claudeToOpenAIRequest(
    "gpt-4o",
    { max_tokens: 64, messages: [{ role: "user", content: "hi" }], ...body },
    false
  ) as unknown as OpenAIOut;
}

const toolNames = (tools: Array<{ name: string }>) => tools.map((t) => t.name);

// ── #4171: allowed_tools ────────────────────────────────────────────────────

test("#4171 allowed_tools mode=required with one tool -> Claude {type:tool,name}", () => {
  const out = toClaude(
    openaiBody({
      tool_choice: {
        type: "allowed_tools",
        allowed_tools: {
          mode: "required",
          tools: [{ type: "function", function: { name: "tool_b" } }],
        },
      },
    })
  );
  assert.deepEqual(out.tool_choice, { type: "tool", name: "tool_b" });
  assert.deepEqual(toolNames(out.tools), ["tool_b"]);
});

test("#4171 allowed_tools mode=required with several tools -> Claude any + filtered tools", () => {
  const out = toClaude(
    openaiBody({
      tool_choice: {
        type: "allowed_tools",
        mode: "required",
        tools: [
          { type: "function", name: "tool_a" },
          { type: "function", function: { name: "tool_c" } },
        ],
      },
    })
  );
  assert.deepEqual(out.tool_choice, { type: CLAUDE_REQUIRED });
  assert.deepEqual(toolNames(out.tools), ["tool_a", "tool_c"]);
});

test("#4171 allowed_tools mode=auto -> Claude auto + filtered tools", () => {
  const out = toClaude(
    openaiBody({
      tool_choice: {
        type: "allowed_tools",
        allowed_tools: {
          mode: "auto",
          tools: [{ type: "function", function: { name: "tool_a" } }],
        },
      },
    })
  );
  assert.deepEqual(out.tool_choice, { type: "auto" });
  assert.deepEqual(toolNames(out.tools), ["tool_a"]);
});

test("#4171 allowed_tools filters against original names when the OAuth prefix is on", () => {
  const body = openaiBody({
    tool_choice: {
      type: "allowed_tools",
      mode: "auto",
      tools: [{ type: "function", function: { name: "tool_c" } }],
    },
  });
  delete (body as Record<string, unknown>)._disableToolPrefix;
  const out = toClaude(body);
  assert.equal(out.tools.length, 1);
  assert.match(out.tools[0].name, /tool_c$/);
  // The cache breakpoint must still land on the (now only) remaining tool.
  assert.ok(out.tools[0].cache_control);
});

// ── #4171: parallel_tool_calls <-> disable_parallel_tool_use ────────────────

test("#4171 parallel_tool_calls:false -> Claude disable_parallel_tool_use (no tool_choice sent)", () => {
  const out = toClaude(openaiBody({ parallel_tool_calls: false }));
  assert.deepEqual(out.tool_choice, { type: "auto", disable_parallel_tool_use: true });
});

test("#4171 parallel_tool_calls:false combines with the mapped tool_choice", () => {
  const required = toClaude(openaiBody({ tool_choice: "required", parallel_tool_calls: false }));
  assert.deepEqual(required.tool_choice, {
    type: CLAUDE_REQUIRED,
    disable_parallel_tool_use: true,
  });

  const named = toClaude(
    openaiBody({
      tool_choice: { type: "function", function: { name: "tool_a" } },
      parallel_tool_calls: false,
    })
  );
  assert.deepEqual(named.tool_choice, {
    type: "tool",
    name: "tool_a",
    disable_parallel_tool_use: true,
  });
});

test("#4171 parallel_tool_calls:false is not attached to tool_choice none or tool-less requests", () => {
  const none = toClaude(openaiBody({ tool_choice: "none", parallel_tool_calls: false }));
  assert.deepEqual(none.tool_choice, { type: "none" });

  const noTools = toClaude({
    messages: [{ role: "user", content: "hi" }],
    parallel_tool_calls: false,
  });
  assert.equal(noTools.tool_choice, undefined);
});

test("#4171 parallel_tool_calls true/absent leaves tool_choice untouched", () => {
  assert.equal(toClaude(openaiBody({ parallel_tool_calls: true })).tool_choice, undefined);
  assert.deepEqual(toClaude(openaiBody({ tool_choice: "auto" })).tool_choice, { type: "auto" });
});

test("#4171 Claude disable_parallel_tool_use:true -> OpenAI parallel_tool_calls:false", () => {
  const out = toOpenAI({
    tools: [claudeTool("tool_a")],
    tool_choice: { type: "auto", disable_parallel_tool_use: true },
  });
  assert.equal(out.tool_choice, "auto");
  assert.equal(out.parallel_tool_calls, false);

  const named = toOpenAI({
    tools: [claudeTool("tool_a")],
    tool_choice: { type: "tool", name: "tool_a", disable_parallel_tool_use: true },
  });
  assert.deepEqual(named.tool_choice, { type: "function", function: { name: "tool_a" } });
  assert.equal(named.parallel_tool_calls, false);
});

test("#4171 Claude tool_choice without disable_parallel_tool_use sets no parallel_tool_calls", () => {
  const out = toOpenAI({ tools: [claudeTool("tool_a")], tool_choice: { type: "auto" } });
  assert.equal("parallel_tool_calls" in out, false);
});

// ── #4172: strict ───────────────────────────────────────────────────────────

test("#4172 OpenAI function.strict:true -> Claude tool strict:true", () => {
  const out = toClaude({
    messages: [{ role: "user", content: "hi" }],
    tools: [openaiTool("tool_a", { strict: true }), openaiTool("tool_b")],
    _disableToolPrefix: true,
  });
  assert.equal(out.tools[0].strict, true);
  assert.equal("strict" in out.tools[1], false);
});

test("#4172 Claude tool strict:true -> OpenAI function.strict:true", () => {
  const out = toOpenAI({ tools: [claudeTool("tool_a", { strict: true }), claudeTool("tool_b")] });
  assert.equal(out.tools[0].function.strict, true);
  assert.equal("strict" in out.tools[1].function, false);
});

// ── Regression: unchanged behavior ──────────────────────────────────────────

test("regression: OpenAI tool_choice none/auto/required still map as before", () => {
  assert.deepEqual(toClaude(openaiBody({ tool_choice: "none" })).tool_choice, { type: "none" });
  assert.deepEqual(toClaude(openaiBody({ tool_choice: "auto" })).tool_choice, { type: "auto" });
  assert.deepEqual(toClaude(openaiBody({ tool_choice: "required" })).tool_choice, {
    type: CLAUDE_REQUIRED,
  });
  // Unfiltered tools when no allowed_tools is sent.
  assert.deepEqual(toolNames(toClaude(openaiBody({ tool_choice: "auto" })).tools), [
    "tool_a",
    "tool_b",
    "tool_c",
  ]);
});

test("regression: Claude tool_choice none/auto/any still map as before", () => {
  const tools = [claudeTool("tool_a")];
  assert.equal(toOpenAI({ tools, tool_choice: { type: "none" } }).tool_choice, "none");
  assert.equal(toOpenAI({ tools, tool_choice: { type: "auto" } }).tool_choice, "auto");
  assert.equal(toOpenAI({ tools, tool_choice: { type: CLAUDE_REQUIRED } }).tool_choice, "required");
});

test("regression: developer role is still folded into the Claude system prompt", () => {
  const out = toClaude({
    messages: [
      { role: "developer", content: "DEV_MARKER_4172" },
      { role: "user", content: "hi" },
    ],
  });
  assert.ok(JSON.stringify(out.system).includes("DEV_MARKER_4172"));
  assert.ok(!JSON.stringify(out.messages).includes("DEV_MARKER_4172"));
});
