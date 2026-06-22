import { describe, test } from "node:test";
import assert from "node:assert/strict";
import {
  parseDeepSeekToolCalls,
  serializeDeepSeekToolPrompt,
  buildToolConversationPrompt,
} from "../../open-sse/translator/deepseekWebTools.ts";

// chat.deepseek.com emits tool invocations in many ad-hoc shapes. The deepseek-specific
// parser must recognize all of them, recover the real tool name/arguments, and preserve
// any surrounding natural-language text so it can still be streamed to the client.

const TOOLS = [
  { type: "function", function: { name: "todowrite", description: "Write todos" } },
  { type: "function", function: { name: "bash", description: "Run a shell command" } },
  { type: "function", function: { name: "write", description: "Write a file" } },
  {
    type: "function",
    function: {
      name: "get_weather",
      parameters: { type: "object", properties: { city: { type: "string" } } },
    },
  },
];

function firstCall(text: string) {
  const { toolCalls } = parseDeepSeekToolCalls(text, "call", TOOLS);
  assert.ok(toolCalls && toolCalls.length >= 1, `expected a tool call for: ${text.slice(0, 60)}`);
  return toolCalls[0];
}

describe("deepseekWebTools — variants", () => {
  test("Ex1: <tool:todowrite>{json} </tool> — name in tag suffix, body is the arguments", () => {
    const text = `I'll write a script.\n\n<tool:todowrite>\n{"todos": [{"content": "a", "status": "in_progress", "priority": "high"}]}\n</tool>`;
    const { content, toolCalls } = parseDeepSeekToolCalls(text, "call", TOOLS);
    assert.equal(toolCalls?.length, 1);
    assert.equal(toolCalls![0].function.name, "todowrite");
    assert.deepEqual(JSON.parse(toolCalls![0].function.arguments), {
      todos: [{ content: "a", status: "in_progress", priority: "high" }],
    });
    assert.ok(content.includes("I'll write a script."), "surrounding text preserved");
    assert.ok(!content.includes("<tool"), "tool block stripped");
  });

  test("Ex3: <tool_call> with id/type/params shape", () => {
    const text = `I'll draft a plan.\n<tool_call>\n{"id": "todo_1", "type": "todo", "params": {"todos": [{"content": "x", "status": "pending", "priority": "high"}]}}\n</tool_call>`;
    const call = firstCall(text);
    assert.equal(call.function.name, "todowrite", "type 'todo' fuzzy-resolves to todowrite");
    assert.deepEqual(JSON.parse(call.function.arguments), {
      todos: [{ content: "x", status: "pending", priority: "high" }],
    });
  });

  test("Ex5: nested <tool><tool>{json}</tool> — inner canonical call", () => {
    const text = `<tool>\n<tool>{"name": "todowrite", "arguments": {"todos": [{"content": "y", "status": "pending", "priority": "high"}]}}</tool>`;
    const { content, toolCalls } = parseDeepSeekToolCalls(text, "call", TOOLS);
    assert.equal(toolCalls?.length, 1);
    assert.equal(toolCalls![0].function.name, "todowrite");
    assert.ok(!content.includes("<tool"), "stray/nested tool tags stripped");
  });

  test("Ex6: <tool:bash>{command} </tool> — body is the arguments payload", () => {
    const text = `I'll create a script.\n\n<tool:bash>\n{"command": "echo hi"}\n</tool>`;
    const call = firstCall(text);
    assert.equal(call.function.name, "bash");
    assert.deepEqual(JSON.parse(call.function.arguments), { command: "echo hi" });
  });

  test('Ex7: <tool id="1"><name>write</name><arguments>{json}</arguments></tool>', () => {
    const text = `I'll create a script.\n<tool id="1">\n  <name>write</name>\n  <arguments>\n    {"filePath": "/tmp/train.py", "content": "print(1)"}\n  </arguments>\n</tool>`;
    const call = firstCall(text);
    assert.equal(call.function.name, "write");
    assert.deepEqual(JSON.parse(call.function.arguments), {
      filePath: "/tmp/train.py",
      content: "print(1)",
    });
  });

  test('Ex8: <tool><tool name="todowrite">{json}</tool></tool> — name attribute on inner', () => {
    const text = `<tool>\n<tool name="todowrite">{"todos":[{"content":"c","status":"in_progress","priority":"high"}]}</tool>\n</tool>`;
    const call = firstCall(text);
    assert.equal(call.function.name, "todowrite");
    assert.deepEqual(JSON.parse(call.function.arguments), {
      todos: [{ content: "c", status: "in_progress", priority: "high" }],
    });
  });

  test('Ex9: <tool:write><parameter name="content" content="..."> — parameter style', () => {
    const text = `<tool:write>\n<parameter name="content" content="print('hi')">`;
    const call = firstCall(text);
    assert.equal(call.function.name, "write");
    assert.deepEqual(JSON.parse(call.function.arguments), { content: "print('hi')" });
  });

  test('Ex12: <tool id="todo_write">{json}</tool> — id resolves to a tool name', () => {
    const text = `I'll create a script.\n<tool id="todo_write">\n{"todos": [{"content": "z", "status": "in_progress", "priority": "high"}]}\n</tool>`;
    const call = firstCall(text);
    assert.equal(call.function.name, "todowrite");
    assert.deepEqual(JSON.parse(call.function.arguments), {
      todos: [{ content: "z", status: "in_progress", priority: "high" }],
    });
  });

  test("canonical <tool>{name,arguments}</tool> still works (no regression)", () => {
    const text = `<tool>{"name": "get_weather", "arguments": {"city": "Paris"}}</tool>`;
    const call = firstCall(text);
    assert.equal(call.function.name, "get_weather");
    assert.deepEqual(JSON.parse(call.function.arguments), { city: "Paris" });
  });

  test("bare JSON (no tags) still resolves via fuzzy name match", () => {
    const text = `{"name":"getWeather","arguments":{"city":"Paris"}}`;
    const call = firstCall(text);
    assert.equal(call.function.name, "get_weather");
    assert.deepEqual(JSON.parse(call.function.arguments), { city: "Paris" });
  });

  test("#3260: tag name attribute is bogus, real name is in JSON body", () => {
    const text = `<tool_call name="skill">{"name": "get_weather", "arguments": {"city": "SP"}}</tool_call>`;
    const call = firstCall(text);
    assert.equal(call.function.name, "get_weather");
  });

  test("surrounding text is preserved both before and after the tool block", () => {
    const text = `Before text.\n<tool:bash>\n{"command": "ls"}\n</tool>\nAfter text.`;
    const { content, toolCalls } = parseDeepSeekToolCalls(text, "call", TOOLS);
    assert.equal(toolCalls?.length, 1);
    assert.ok(content.includes("Before text."));
    assert.ok(content.includes("After text."));
  });
});

describe("deepseekWebTools — pure-text (no tool) replies", () => {
  for (const [label, text] of [
    ["Ex2 plan only", "I'll build a train animation. Plan:\n1. step\n2. step\nStarting now."],
    ["Ex4 code fence only", "Plan:\n```python\nimport os\nprint(os.getcwd())\n```"],
    ["Ex13 bash fence only", "```bash\nuv pip install rich\n```"],
  ] as const) {
    test(`${label} — returns plain content, no tool calls`, () => {
      const { content, toolCalls } = parseDeepSeekToolCalls(text, "call", TOOLS);
      assert.equal(toolCalls, null, "no tool call should be parsed");
      assert.equal(content, text, "content returned unchanged");
    });
  }
});

describe("deepseekWebTools — strict prompt", () => {
  test("lists tools and mandates the exact <tool> JSON format", () => {
    const prompt = serializeDeepSeekToolPrompt(TOOLS);
    assert.ok(prompt.includes("todowrite"));
    assert.ok(prompt.includes("get_weather"));
    assert.ok(prompt.includes('<tool>{"name"'), "shows the canonical format");
    assert.ok(/never|not|do not/i.test(prompt), "warns against alternative formats");
  });

  test("returns empty string when there are no usable tools", () => {
    assert.equal(serializeDeepSeekToolPrompt([]), "");
    assert.equal(serializeDeepSeekToolPrompt(undefined), "");
  });
});

describe("deepseekWebTools — buildToolConversationPrompt (agentic context)", () => {
  // A tool-using conversation must replay the WHOLE trajectory (prior assistant tool_calls +
  // their tool results) into the flat web `prompt`, otherwise the model is amnesiac and
  // restarts every turn — re-creating todos, re-listing files, etc.
  // The legacy builder only forwarded the last user message and dropped
  // tool_calls / role:"tool" messages. The executor-level coverage lives in
  // deepseek-web-tools-execute.test.ts.
  test("replays prior tool calls and their results", () => {
    const messages = [
      { role: "user", content: "write train.py" },
      {
        role: "assistant",
        content: "",
        tool_calls: [
          {
            id: "c1",
            type: "function",
            function: { name: "todowrite", arguments: '{"todos":[{"content":"a"}]}' },
          },
        ],
      },
      { role: "tool", tool_call_id: "c1", content: "todos created" },
      {
        role: "assistant",
        content: "",
        tool_calls: [
          { id: "c2", type: "function", function: { name: "bash", arguments: '{"command":"ls"}' } },
        ],
      },
      { role: "tool", tool_call_id: "c2", content: "train.py\ncat.md" },
    ];

    const prompt = buildToolConversationPrompt(messages, "TOOLS-HERE");

    assert.ok(prompt.includes("TOOLS-HERE"), "tool system prompt leads");
    assert.ok(prompt.includes("User: write train.py"), "original task present");
    assert.ok(prompt.includes('"name": "todowrite"'), "prior todowrite call replayed");
    assert.ok(
      prompt.includes("Tool result (todowrite): todos created"),
      "todowrite result replayed"
    );
    assert.ok(prompt.includes('"name": "bash"'), "prior bash call replayed");
    assert.ok(prompt.includes("Tool result (bash): train.py"), "bash result replayed");
    assert.ok(/Continue the task/i.test(prompt), "anchored to continue, not restart");
  });

  test("first-turn (no prior tool activity) omits the continue anchor", () => {
    const prompt = buildToolConversationPrompt([{ role: "user", content: "hi" }], "TOOLS");
    assert.ok(prompt.includes("User: hi"));
    assert.ok(!/Continue the task/i.test(prompt), "no continue anchor on the first turn");
  });
});
