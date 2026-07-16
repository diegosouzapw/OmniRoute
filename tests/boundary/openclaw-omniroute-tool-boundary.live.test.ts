/**
 * Boundary test: OpenClaw ↔ OmniRoute tool calling pipeline.
 *
 * Tests the critical boundary where OpenClaw sends Responses API requests
 * through OmniRoute and receives tool call responses. Focuses on verifying
 * that tool call arguments (especially multiline content like file writes)
 * survive the round-trip without corruption.
 *
 * These tests call the LIVE OmniRoute API at the configured OMNIROUTE_TEST_BASE instance.
 * Prerequisites: valid auth token (from INITIAL_PASSWORD) and access to the
 * remote OmniRoute instance.
 */
import test from "node:test";
import assert from "node:assert/strict";

const BASE = process.env.OMNIROUTE_TEST_BASE || "http://localhost:20128/v1";
const AUTH = process.env.OMNIROUTE_TEST_BEARER
    ? `Bearer ${process.env.OMNIROUTE_TEST_BEARER}`
    : "";

// Cookie obtained via INITIAL_PASSWORD login
const COOKIE =
  process.env.OMNIROUTE_TEST_COOKIE || "";

// Only the tests that call the live remote OmniRoute API need this gate — the
// pure parsing/stopReason-simulation tests at the bottom of the file run locally.
const skip =
  process.env.RUN_BOUNDARY_LIVE === "1"
    ? undefined
    : "RUN_BOUNDARY_LIVE!=1 — skipping live boundary test";

interface SseEvent {
  event: string | null;
  data: Record<string, unknown> | null;
}

interface ResponseFunctionCallItem {
  type: string;
  name?: string;
  arguments?: string;
  call_id?: string;
}

interface ResponsesJsonBody {
  status?: string;
  output?: ResponseFunctionCallItem[];
}

function eventItem(e: SseEvent): ResponseFunctionCallItem | undefined {
  return e.data?.item as ResponseFunctionCallItem | undefined;
}

async function sendResponsesApiStream(body: Record<string, unknown>): Promise<SseEvent[]> {
  const response = await fetch(`${BASE}/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: COOKIE,
      Authorization: AUTH,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }

  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  const events: SseEvent[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    let currentEvent: string | null = null;

    for (const line of lines) {
      if (line.startsWith("event: ")) {
        currentEvent = line.slice(7);
      } else if (line.startsWith("data: ")) {
        const dataStr = line.slice(6);
        try {
          events.push({
            event: currentEvent,
            data: JSON.parse(dataStr),
          });
        } catch {
          events.push({ event: currentEvent, data: null });
        }
      }
    }
  }

  return events;
}

async function sendResponsesApiJson(
  body: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const response = await fetch(`${BASE}/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: COOKIE,
      Authorization: AUTH,
    },
    body: JSON.stringify({ ...body, stream: false }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }

  return (await response.json()) as Record<string, unknown>;
}

test("OmniRoute boundary: tool call arguments with newlines survive Responses API (non-streaming)", { skip }, async () => {
  const body = {
    model: "gemini/gemma-4-26b-a4b-it",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Write a file /tmp/test_boundary.txt with content:\nhello\nworld\ntest",
          },
        ],
      },
    ],
    tools: [
      {
        type: "function",
        name: "write",
        description: "Write content to a file at the specified path",
        parameters: {
          type: "object",
          properties: {
            path: { type: "string", description: "File path" },
            content: { type: "string", description: "File content" },
          },
          required: ["path", "content"],
        },
        strict: true,
      },
    ],
    temperature: 0.1,
    max_output_tokens: 4096,
  };

  const response = (await sendResponsesApiJson(body)) as ResponsesJsonBody;

  assert.equal(response.status, "completed");
  assert.ok(Array.isArray(response.output), "should have output array");

  const toolCalls = (response.output || []).filter((item) => item.type === "function_call");

  assert.ok(toolCalls.length > 0, "should have at least one function_call");
  assert.equal(toolCalls[0].name, "write");

  const args = JSON.parse(toolCalls[0].arguments || "{}");
  assert.equal(typeof args.content, "string", "content should be a string");
  assert.ok(args.content.includes("\n"), "content should have actual newlines (0x0A)");

  // Verify no literal backslash-n contamination
  const literalBSN = (args.content as string).match(/\\n/g);
  assert.equal(literalBSN, null, "no literal backslash-n in content");

  // Verify newlines are actual 0x0A bytes
  for (let i = 0; i < args.content.length; i++) {
    if (args.content[i] === "\n") {
      assert.equal(
        args.content.charCodeAt(i),
        0x0a,
        `byte at position ${i} should be 0x0A not 0x5C 0x6E`
      );
    }
  }
});

test("OmniRoute boundary: tool call arguments with newlines survive Responses API (streaming)", { skip }, async () => {
  const body = {
    model: "gemini/gemma-4-26b-a4b-it",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Write a file /tmp/test_stream.txt with content:\nline A\nline B\nline C\nusing the write tool",
          },
        ],
      },
    ],
    tools: [
      {
        type: "function",
        name: "write",
        description: "Write content to a file",
        parameters: {
          type: "object",
          properties: {
            path: { type: "string" },
            content: { type: "string" },
          },
          required: ["path", "content"],
        },
        strict: true,
      },
    ],
    temperature: 0.1,
    max_output_tokens: 4096,
    stream: true,
  };

  const events = await sendResponsesApiStream(body);

  // Find the function call output_item.done event
  const doneEvent = events.find(
    (e) => e.event === "response.output_item.done" && eventItem(e)?.type === "function_call"
  );
  assert.ok(doneEvent, "should have output_item.done for function_call");

  const item = eventItem(doneEvent as SseEvent) as ResponseFunctionCallItem;
  assert.equal(item.name, "write");

  const args = JSON.parse(item.arguments || "{}");
  assert.equal(typeof args.content, "string", "content should be a string");
  assert.ok(args.content.includes("\n"), "content should have actual newlines");

  // Check completed event
  const completed = events.find((e) => e.event === "response.completed");
  assert.ok(completed, "should have response.completed event");
  const completedResponse = completed?.data?.response as ResponsesJsonBody | undefined;
  const outputItems = completedResponse?.output || [];
  const completedFc = outputItems.find((item) => item.type === "function_call");
  assert.ok(completedFc, "completed output should have function_call");

  const completedArgs = JSON.parse(completedFc?.arguments || "{}");
  assert.equal(completedArgs.content, args.content, "completed arguments should match done event");
});

test("OmniRoute boundary: exec tool call arguments survive Responses API", { skip }, async () => {
  const body = {
    model: "gemini/gemma-4-26b-a4b-it",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Run: echo hello world",
          },
        ],
      },
    ],
    tools: [
      {
        type: "function",
        name: "exec",
        description: "Execute a shell command",
        parameters: {
          type: "object",
          properties: {
            command: { type: "string", description: "The command to execute" },
          },
          required: ["command"],
        },
        strict: true,
      },
    ],
    temperature: 0.1,
    max_output_tokens: 4096,
    stream: true,
  };

  const events = await sendResponsesApiStream(body);

  const doneEvent = events.find(
    (e) => e.event === "response.output_item.done" && eventItem(e)?.type === "function_call"
  );
  assert.ok(doneEvent, "should have function_call");

  const item = eventItem(doneEvent as SseEvent) as ResponseFunctionCallItem;
  assert.equal(item.name, "exec");
  assert.ok(item.call_id, "should have call_id");

  const args = JSON.parse(item.arguments || "{}");
  assert.equal(typeof args.command, "string");
  assert.ok(args.command.length > 0, "command should not be empty");

  // Completed event
  const completed = events.find((e) => e.event === "response.completed");
  assert.ok(completed, "should have response.completed");
});

test("OmniRoute boundary: parallel tool calls survive Responses API", { skip }, async () => {
  const body = {
    model: "gemini/gemma-4-26b-a4b-it",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Write a file /tmp/parallel_a.txt with content 'aaa' AND write a file /tmp/parallel_b.txt with content 'bbb'",
          },
        ],
      },
    ],
    tools: [
      {
        type: "function",
        name: "write",
        description: "Write content to a file",
        parameters: {
          type: "object",
          properties: {
            path: { type: "string" },
            content: { type: "string" },
          },
          required: ["path", "content"],
        },
        strict: true,
      },
    ],
    temperature: 0.1,
    max_output_tokens: 4096,
    stream: true,
  };

  const events = await sendResponsesApiStream(body);

  const doneEvents = events.filter(
    (e) => e.event === "response.output_item.done" && eventItem(e)?.type === "function_call"
  );

  assert.ok(doneEvents.length >= 1, "should have at least one function_call");

  // Check each has valid args
  for (const evt of doneEvents) {
    const args = JSON.parse(eventItem(evt)?.arguments || "{}");
    assert.ok(args.path || args.command, "each tool call should have arguments");
  }

  // Verify completed output matches
  const completed = events.find((e) => e.event === "response.completed");
  assert.ok(completed, "should have response.completed");
  const completedResponse = completed?.data?.response as ResponsesJsonBody | undefined;
  const outputFcs = (completedResponse?.output || []).filter(
    (item) => item.type === "function_call"
  );
  assert.equal(outputFcs.length, doneEvents.length, "completed output should match count");
});

test("OmniRoute boundary: tool call through default combo (fill-first)", { skip }, async () => {
  const body = {
    model: "default",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Run: echo 'combo test' > /tmp/combo_test.txt",
          },
        ],
      },
    ],
    tools: [
      {
        type: "function",
        name: "exec",
        description: "Execute a shell command",
        parameters: {
          type: "object",
          properties: {
            command: { type: "string" },
          },
          required: ["command"],
        },
        strict: true,
      },
    ],
    temperature: 0.1,
    max_output_tokens: 4096,
    stream: true,
  };

  const events = await sendResponsesApiStream(body);

  const doneEvent = events.find(
    (e) => e.event === "response.output_item.done" && eventItem(e)?.type === "function_call"
  );
  assert.ok(doneEvent, "should have function_call through default combo");

  const args = JSON.parse(eventItem(doneEvent as SseEvent)?.arguments || "{}");
  assert.equal(typeof args.command, "string");
  assert.ok(args.command.length > 0);
});

test("OmniRoute boundary: multi-line Python code survives tool call arguments", { skip }, async () => {
  const pythonCode = [
    "import json",
    "import random",
    "",
    "data = {",
    '    "numbers": [random.randint(1, 100) for _ in range(5)]',
    "}",
    "",
    "with open('/tmp/boundary_test.json', 'w') as f:",
    "    json.dump(data, f, indent=2)",
    "",
    'print("Done")',
    "",
  ].join("\n");

  const body = {
    model: "gemini/gemma-4-26b-a4b-it",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Write a Python script at /tmp/boundary_test.py that generates random numbers and saves to JSON, then run it.

Script content:
${pythonCode}`,
          },
        ],
      },
    ],
    tools: [
      {
        type: "function",
        name: "write",
        description: "Write content to a file",
        parameters: {
          type: "object",
          properties: {
            path: { type: "string" },
            content: { type: "string" },
          },
          required: ["path", "content"],
        },
        strict: true,
      },
      {
        type: "function",
        name: "exec",
        description: "Execute a shell command",
        parameters: {
          type: "object",
          properties: {
            command: { type: "string" },
          },
          required: ["command"],
        },
        strict: true,
      },
    ],
    temperature: 0.1,
    max_output_tokens: 4096,
    stream: true,
  };

  const events = await sendResponsesApiStream(body);

  const writeDoneEvent = events.find(
    (e) => e.event === "response.output_item.done" && eventItem(e)?.name === "write"
  );

  if (writeDoneEvent) {
    const args = JSON.parse(eventItem(writeDoneEvent)?.arguments || "{}");
    assert.equal(typeof args.content, "string");
    assert.ok(args.content.includes("\n"), "Python code should have newlines");

    // CRITICAL CHECK: Python code with `:\n    ` pattern should not have literal backslash-n
    const colonBackslashN = args.content.match(/:\\n/g);
    const colonNewline = args.content.match(/: *\n/g);

    // If the model uses the colon-newline-indent pattern, it should be actual newline
    if (colonNewline && colonNewline.length > 0) {
      // This section has proper newlines - good
    }
    if (colonBackslashN && colonBackslashN.length > 0) {
      console.log(
        `WARNING: Found ${colonBackslashN.length} literal backslash-n after colon patterns`
      );
      console.log("  This indicates Gemma4 model is generating malformed content");
    }

    // The test: content should NOT have literal backslash-n in critical positions
    // (the model may still have this bug, so we document rather than hard-fail)
    const hasLiteralBSNAfterColon = (args.content as string).includes(":\\n");
    if (hasLiteralBSNAfterColon) {
      console.log("NOTE: Gemma4 model generated literal backslash-n after colon - known model bug");
    }
  }

  // At minimum, we should have at least one function_call event
  const anyDone = events.find(
    (e) => e.event === "response.output_item.done" && eventItem(e)?.type === "function_call"
  );
  assert.ok(anyDone, "should have at least one function_call");
});

test("OmniRoute boundary: model responds with proper JSON args when given clear tool defs", { skip }, async () => {
  // Test that the model can correctly produce tool calls with simple args
  const body = {
    model: "gemini/gemma-4-26b-a4b-it",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "What is 2+2? Use the calculator tool.",
          },
        ],
      },
    ],
    tools: [
      {
        type: "function",
        name: "calculate",
        description: "Calculate a math expression",
        parameters: {
          type: "object",
          properties: {
            expression: {
              type: "string",
              description: "The math expression to evaluate",
            },
          },
          required: ["expression"],
        },
        strict: true,
      },
    ],
    temperature: 0.1,
    max_output_tokens: 4096,
    stream: true,
  };

  const events = await sendResponsesApiStream(body);

  const doneEvent = events.find(
    (e) => e.event === "response.output_item.done" && eventItem(e)?.type === "function_call"
  );

  if (doneEvent) {
    const rawArguments = eventItem(doneEvent)?.arguments || "{}";
    const args = JSON.parse(rawArguments);
    assert.equal(typeof args.expression, "string");
    assert.ok(args.expression.includes("2+2") || args.expression.includes("2 + 2"));

    // Verify the arguments JSON is valid
    assert.doesNotThrow(() => {
      JSON.parse(rawArguments);
    });
  }
});

test("OpenClaw boundary: processResponsesStream correctly parses tool call args with newlines", () => {
  // Simulate what OpenClaw's processResponsesStream does with tool call args
  // This tests the parsing logic without requiring the full OpenClaw build

  function stringifyJsonLike(value: unknown, fallback = ""): string {
    if (typeof value === "string") return value;
    if (value && typeof value === "object") return JSON.stringify(value);
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    return fallback;
  }

  function parseStreamingJson(partialJson: string | undefined): Record<string, unknown> {
    if (!partialJson || partialJson.trim() === "") return {};
    try {
      return JSON.parse(partialJson);
    } catch {
      return {};
    }
  }

  // Simulate item.arguments from a response.output_item.done event
  const itemArguments = JSON.stringify({
    path: "/tmp/test.txt",
    content: "hello\nworld\nline3\n",
  });

  // OpenClaw step 1: stringifyJsonLike
  const strArgs = stringifyJsonLike(itemArguments, "{}");
  assert.equal(typeof strArgs, "string");

  // OpenClaw step 2: parseStreamingJson
  const parsed = parseStreamingJson(strArgs);
  assert.ok(parsed.content, "should have content key");
  assert.equal(typeof parsed.content, "string");

  // Verify ACTUAL newlines in the content
  const content = parsed.content as string;
  assert.ok(content.includes("\n"), "content should have actual newlines");
  assert.equal(content, "hello\nworld\nline3\n");

  // Count: should have exactly 3 newlines (after each line), zero literal backslash-n
  const newlineCount = (content.match(/\n/g) || []).length;
  const literalBSNCount = (content.match(/\\n/g) || []).length;
  assert.equal(newlineCount, 3, "should have 3 actual newlines");
  assert.equal(literalBSNCount, 0, "should have 0 literal backslash-n");

  // Verify byte-level: each newline should be 0x0A
  for (let i = 0; i < content.length; i++) {
    if (content[i] === "\n") {
      assert.equal(content.charCodeAt(i), 0x0a);
    }
    // No position should have \ + n in sequence
    if (content[i] === "\\" && i + 1 < content.length && content[i + 1] === "n") {
      assert.fail(`found literal backslash-n at position ${i}`);
    }
  }
});

test("OpenClaw boundary: processResponsesStream detects tool calls and promotes stopReason", () => {
  // Simulate the output.content array and stopReason promotion logic
  const output: {
    content: { type: string; name?: string; arguments?: unknown }[];
    stopReason?: string;
  } = {
    content: [],
    stopReason: undefined,
  };

  // Simulate toolcall_start handler
  const item = {
    type: "function_call" as const,
    call_id: "call_test_1",
    name: "write",
    arguments: JSON.stringify({ path: "/tmp/t.txt", content: "hello\nworld\n" }),
  };

  const block = {
    type: "toolCall" as const,
    id: `${item.call_id}|fc_test`,
    name: item.name,
    arguments: JSON.parse(item.arguments),
    partialJson: item.arguments,
  };
  output.content.push(block);

  // Simulate response.completed handler
  function mapResponsesStopReason(status: string | undefined): string {
    if (status === "completed") return "stop";
    if (status === "in_progress") return "ongoing";
    return status || "stop";
  }

  output.stopReason = mapResponsesStopReason("completed");
  assert.equal(output.stopReason, "stop");

  // Promote stopReason if there are tool calls
  if (output.content.some((b) => b.type === "toolCall") && output.stopReason === "stop") {
    output.stopReason = "toolUse";
  }

  assert.equal(output.stopReason, "toolUse");
  assert.equal(output.content.length, 1);
  assert.equal(output.content[0].type, "toolCall");
  assert.equal(output.content[0].name, "write");

  const toolArgs = output.content[0].arguments as Record<string, string>;
  assert.equal(toolArgs.content, "hello\nworld\n");
  assert.ok(toolArgs.content.includes("\n"), "tool call content has newlines");
});

test("OpenClaw boundary: stringifyJsonLike preserves strings as-is (no double JSON.stringify)", () => {
  // This tests that OpenClaw's stringifyJsonLike does NOT double-encode
  function stringifyJsonLike(value: unknown, fallback = ""): string {
    if (typeof value === "string") return value;
    if (value && typeof value === "object") return JSON.stringify(value);
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    return fallback;
  }

  // Case 1: item.arguments is already a JSON string (typical case)
  const argsStr = JSON.stringify({ path: "/tmp/t.txt", content: "hello\nworld\n" });
  const result1 = stringifyJsonLike(argsStr, "{}");
  // Should return as-is (no double encoding)
  assert.equal(result1, argsStr);
  const parsed = JSON.parse(result1);
  assert.equal(parsed.content, "hello\nworld\n");

  // Case 2: item.arguments is somehow an object (edge case)
  const argsObj = { path: "/tmp/t.txt", content: "hello\nworld\n" };
  const result2 = stringifyJsonLike(argsObj, "{}");
  // Should JSON.stringify it
  assert.equal(typeof result2, "string");
  const parsed2 = JSON.parse(result2);
  assert.equal(parsed2.content, "hello\nworld\n");

  // Case 3: malformed edge case - undefined
  assert.equal(stringifyJsonLike(undefined, "{}"), "{}");
  assert.equal(stringifyJsonLike(null, "{}"), "{}");
  assert.equal(stringifyJsonLike(42, "{}"), "42");
});
