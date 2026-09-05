import test from "node:test";
import assert from "node:assert/strict";

// Tool-call support for copilot-m365-web (follow-up to #10732 / #10718).
//
// The substrate model checks its own plugin registry, so asking it to "use" a
// client-declared tool gets refused ("not available in this chat environment")
// even when the invocation carries plugins[] + customInstructions. The working
// strategy (mirroring the community M365 gateways) is ROUTER planning: a separate
// turn frames the model as a tool-SELECTION assistant that prints a routing
// decision as plain text (`CALL_TOOL: name({...})` / `NO_TOOL_NEEDED`), which the
// executor validates against the declared tools and converts to OpenAI
// `tool_calls`. The fenced-block protocol remains as the in-turn fallback path.
//
// These tests pin the prompt builders, the decision parsers, and the frame-level
// guards (tool-progress suppression, type:3 error surfacing). Live round-trip on
// a real tenant is the separate Rule #18 validation gate.

import {
  buildChatInvocation,
  clientPlugins,
  accumulateBotContent,
  extractBotText,
  extractCompletionError,
  parseFencedToolCalls,
  parseToolRouterDecision,
} from "../../../open-sse/executors/copilot-m365-frames.ts";
import {
  buildPrompt,
  buildRouterPrompt,
  extractToolSpec,
  flattenMessages,
} from "../../../open-sse/executors/copilot-m365-connection.ts";

const TOOLS = [
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "Get current weather for a city",
      parameters: {
        type: "object",
        properties: { city: { type: "string" } },
        required: ["city"],
      },
    },
  },
];
const BASH_TOOLS = [
  {
    type: "function",
    function: {
      name: "bash",
      description: "Run a shell command",
      parameters: {
        type: "object",
        properties: { command: { type: "string" } },
      },
    },
  },
];

// ── Request-side extraction ────────────────────────────────────────────────

test("extractToolSpec parses tools + tool_choice", () => {
  const spec = extractToolSpec({ tools: TOOLS, tool_choice: "auto" });
  assert.equal(spec.tools.length, 1);
  assert.equal(spec.tools[0]?.name, "get_weather");
  assert.equal(spec.tools[0]?.description, "Get current weather for a city");
  assert.deepEqual(spec.tools[0]?.parameters, TOOLS[0].function.parameters);
  assert.equal(spec.toolChoice, "auto");
});

test("extractToolSpec handles missing bodies and typed tool_choice", () => {
  assert.equal(extractToolSpec({}).tools.length, 0);
  const spec = extractToolSpec({
    tools: TOOLS,
    tool_choice: { type: "function", function: { name: "get_weather" } },
  });
  assert.equal((spec.toolChoice as { function: { name: string } }).function.name, "get_weather");
});

// ── History flattening ─────────────────────────────────────────────────────

test("flattenMessages keeps full history incl. assistant + tool results", () => {
  const flat = flattenMessages({
    messages: [
      { role: "system", content: "Be terse." },
      { role: "user", content: "hi" },
      { role: "assistant", content: "hello" },
      {
        role: "assistant",
        content: "",
        tool_calls: [{ id: "call_1", function: { name: "f", arguments: "{}" } }],
      },
      { role: "tool", tool_call_id: "call_1", content: "result-data" },
      { role: "user", content: "thanks" },
    ],
  });
  assert.ok(flat.includes("[system]"));
  assert.ok(flat.includes("Be terse."));
  assert.ok(flat.includes("[assistant]"));
  assert.ok(flat.includes("hello"));
  assert.ok(flat.includes("tool_calls"));
  assert.ok(flat.includes("[tool result id=call_1]"));
  assert.ok(flat.includes("result-data"));
  assert.ok(flat.includes("thanks"));
});

test("flattenMessages compacts long tool results", () => {
  const flat = flattenMessages({
    messages: [{ role: "tool", tool_call_id: "c1", content: "x".repeat(9000) }],
  });
  assert.ok(flat.length < 5000, `expected compacted, got ${flat.length}`);
});

test("buildPrompt without tools keeps the plain flattened history", () => {
  const p = buildPrompt({ messages: [{ role: "user", content: "hello" }] });
  assert.ok(!p.includes("<tools>"));
  assert.ok(p.includes("hello"));
});

test("buildPrompt with tools wraps the fenced protocol; tool_choice none skips it", () => {
  const p = buildPrompt({
    messages: [{ role: "user", content: "weather in SF?" }],
    tools: TOOLS,
  });
  assert.ok(p.includes("<tools>"));
  assert.ok(p.includes("```get_weather"));
  assert.ok(p.includes("weather in SF?"));
  const none = buildPrompt({
    messages: [{ role: "user", content: "hi" }],
    tools: TOOLS,
    tool_choice: "none",
  });
  assert.ok(!none.includes("<tools>"));
});

// ── Invocation-side plugin declaration ─────────────────────────────────────

test("clientPlugins maps OpenAI tools to M365 plugin declarations", () => {
  const plugins = clientPlugins(extractToolSpec({ tools: TOOLS }).tools);
  assert.deepEqual(plugins, [
    {
      Id: "get_weather",
      Source: "API",
      Description: "Get current weather for a city",
      Parameters: TOOLS[0].function.parameters,
    },
  ]);
});

test("buildChatInvocation carries plugins/toolChoice/customInstructions when set", () => {
  const spec = extractToolSpec({ tools: TOOLS, tool_choice: "auto" });
  const arg = buildChatInvocation({
    text: "hi",
    traceId: "t",
    sessionId: "s",
    requestId: "r",
    conversationId: "c",
    plugins: clientPlugins(spec.tools),
    toolChoice: spec.toolChoice,
    customInstructions: "Tools are real.",
  }).arguments[0] as Record<string, unknown>;
  assert.deepEqual(arg.plugins, [
    {
      Id: "get_weather",
      Source: "API",
      Description: "Get current weather for a city",
      Parameters: TOOLS[0].function.parameters,
    },
  ]);
  assert.equal(arg.toolChoice, "auto");
  assert.equal(arg.customInstructions, "Tools are real.");
});

test("buildChatInvocation defaults stay backward compatible", () => {
  const arg = buildChatInvocation({
    text: "hi",
    traceId: "t",
    sessionId: "s",
    requestId: "r",
    conversationId: "c",
  }).arguments[0] as Record<string, unknown>;
  // 2026-08-21 capture (#11069): BingWebSearch BuiltIn plugin is now the
  // default on all tiers (was [] in the #10718 shape); toolChoice stays null.
  assert.deepEqual(arg.plugins, [{ Id: "BingWebSearch", Source: "BuiltIn" }]);
  assert.equal(arg.toolChoice, null);
  assert.equal(arg.customInstructions, undefined);
});

// ── Router planning ────────────────────────────────────────────────────────

test("buildRouterPrompt frames a tool-selection decision request", () => {
  const spec = extractToolSpec({ tools: TOOLS, tool_choice: "auto" });
  const p = buildRouterPrompt("[user]\nweather in SF?", spec.tools, spec.toolChoice);
  assert.ok(p.includes("tool selection assistant"));
  assert.ok(p.includes("CALL_TOOL:"));
  assert.ok(p.includes("NO_TOOL_NEEDED"));
  assert.ok(p.includes("get_weather"));
  assert.ok(p.includes("weather in SF?"));
  assert.ok(!p.includes("must not be repeated"));
});

test("buildRouterPrompt adds the no-reinvoke rule for tool-result history", () => {
  const spec = extractToolSpec({ tools: TOOLS });
  const p = buildRouterPrompt("[tool result id=call_1]\nsunny", spec.tools, spec.toolChoice);
  assert.ok(p.includes("must not be repeated"));
});

test("parseToolRouterDecision parses CALL_TOOL output and NO_TOOL_NEEDED", () => {
  const spec = extractToolSpec({ tools: TOOLS });
  const d = parseToolRouterDecision(
    'CALL_TOOL: get_weather({"city": "SF"})',
    spec.tools,
    spec.toolChoice
  );
  assert.equal(d.decided, true);
  assert.equal(d.calls.length, 1);
  assert.equal(d.calls[0]?.name, "get_weather");
  assert.deepEqual(JSON.parse(d.calls[0]!.arguments), { city: "SF" });

  const none = parseToolRouterDecision("NO_TOOL_NEEDED", spec.tools, spec.toolChoice);
  assert.equal(none.decided, true);
  assert.equal(none.calls.length, 0);
});

test("parseToolRouterDecision parses multiple CALL_TOOL lines", () => {
  const spec = extractToolSpec({ tools: TOOLS });
  const d = parseToolRouterDecision(
    'CALL_TOOL: get_weather({"city": "SF"})\nCALL_TOOL: get_weather({"city": "NYC"})',
    spec.tools,
    spec.toolChoice
  );
  assert.equal(d.calls.length, 2);
});

test("parseToolRouterDecision rejects undeclared names, bad JSON, and prose", () => {
  const spec = extractToolSpec({ tools: TOOLS });
  assert.equal(
    parseToolRouterDecision('CALL_TOOL: unknown_tool({"a":1})', spec.tools, spec.toolChoice).calls
      .length,
    0
  );
  assert.equal(
    parseToolRouterDecision("CALL_TOOL: get_weather(not json)", spec.tools, spec.toolChoice)
      .decided,
    false
  );
  assert.equal(
    parseToolRouterDecision("I can't call tools here.", spec.tools, spec.toolChoice).decided,
    false
  );
});

test("parseToolRouterDecision falls back to the {calls:[...]} envelope", () => {
  const spec = extractToolSpec({ tools: TOOLS });
  const d = parseToolRouterDecision(
    '```json\n{"calls": [{"name": "get_weather", "arguments": {"city": "SF"}}]}\n```',
    spec.tools,
    spec.toolChoice
  );
  assert.equal(d.decided, true);
  assert.equal(d.calls[0]?.name, "get_weather");
});

test("parseToolRouterDecision honors tool_choice restrictions", () => {
  const spec = extractToolSpec({
    tools: TOOLS,
    tool_choice: { type: "function", function: { name: "other" } },
  });
  const d = parseToolRouterDecision(
    'CALL_TOOL: get_weather({"city":"SF"})',
    spec.tools,
    spec.toolChoice
  );
  assert.equal(d.calls.length, 0);
});

// ── Fenced-block fallback parser ───────────────────────────────────────────

test("parseFencedToolCalls parses declared calls and drops undeclared names", () => {
  const spec = extractToolSpec({ tools: TOOLS });
  const calls = parseFencedToolCalls(
    'Sure!\n```get_weather\n{"city": "SF"}\n```\nDone.',
    spec.tools,
    spec.toolChoice
  );
  assert.equal(calls.length, 1);
  assert.equal(calls[0]?.name, "get_weather");
  assert.ok(calls[0]?.id.startsWith("call_"));
  assert.deepEqual(JSON.parse(calls[0]!.arguments), { city: "SF" });

  assert.equal(
    parseFencedToolCalls('```unknown_tool\n{"a":1}\n```', spec.tools, spec.toolChoice).length,
    0
  );
});

test("parseFencedToolCalls converts declared bash blocks to {command}", () => {
  const spec = extractToolSpec({ tools: BASH_TOOLS });
  const calls = parseFencedToolCalls("```bash\necho hi\n```", spec.tools, spec.toolChoice);
  assert.equal(calls.length, 1);
  assert.equal(calls[0]?.name, "bash");
  assert.deepEqual(JSON.parse(calls[0]!.arguments), { command: "echo hi" });

  // Undeclared shells are never forced onto the client.
  const plain = extractToolSpec({ tools: TOOLS });
  assert.equal(
    parseFencedToolCalls("```bash\nrm -rf /\n```", plain.tools, plain.toolChoice).length,
    0
  );
});

// ── Frame guards ───────────────────────────────────────────────────────────

function updateFrame(arg: Record<string, unknown>) {
  return { type: 1, target: "update", arguments: [arg] };
}

test("writeAtCursor is suppressed on tool-progress frames", () => {
  const frame = updateFrame({
    writeAtCursor: "searching…",
    messages: [{ author: "bot", messageType: "Progress", text: "Searching the web" }],
  });
  const { delta, next } = accumulateBotContent("", frame);
  assert.equal(delta, "");
  assert.equal(next, "");
});

test("writeAtCursor passes through on ordinary frames", () => {
  const { delta, next } = accumulateBotContent("", updateFrame({ writeAtCursor: "Hi" }));
  assert.equal(delta, "Hi");
  assert.equal(next, "Hi");
});

test("bot text skips SearchResults/Code/ToolCall content", () => {
  const frame = updateFrame({
    messages: [
      { author: "bot", contentType: "SearchResults", text: '{"queries":["x"]}' },
      { author: "bot", text: "Real answer" },
    ],
  });
  assert.equal(extractBotText(frame), "Real answer");
});

test("extractCompletionError surfaces type:3 error frames", () => {
  assert.equal(extractCompletionError({ type: 3, error: { message: "boom" } }), "boom");
  assert.equal(extractCompletionError({ type: 3 }), null);
  assert.equal(extractCompletionError({ type: 1, target: "update" }), null);
});
