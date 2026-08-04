/**
 * Investigation: Gemma4 tool call newline escaping behavior.
 *
 * Systematically tests different prompt patterns and content types to
 * characterize when Gemma4 emits literal \\n (backslash-n) vs actual
 * newlines (0x0A) in tool call JSON arguments.
 *
 * Tests hit the LIVE OmniRoute API at the configured OMNIROUTE_TEST_BASE instance.
 */
import test from "node:test";
import assert from "node:assert/strict";

const BASE = process.env.OMNIROUTE_TEST_BASE || "http://localhost:20128/v1";
const AUTH = process.env.OMNIROUTE_TEST_BEARER
    ? `Bearer ${process.env.OMNIROUTE_TEST_BEARER}`
    : "";
const COOKIE =
  process.env.OMNIROUTE_TEST_COOKIE || "";

const MODEL = "gemini/gemma-4-26b-a4b-it";

const skip =
  process.env.RUN_BOUNDARY_LIVE === "1"
    ? undefined
    : "RUN_BOUNDARY_LIVE!=1 — skipping live boundary test";

interface SseEvent {
  event: string | null;
  data: Record<string, unknown> | null;
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

interface ToolCallResult {
  name: string;
  rawArguments: string;
  parsedArgs: Record<string, unknown>;
  hasLiteralBackslashN: boolean;
  literalBSNPositions: { position: number; context: string }[];
}

async function getToolCalls(
  prompt: string,
  tools: Record<string, unknown>[],
  includeContent?: string
): Promise<ToolCallResult[]> {
  const body: Record<string, unknown> = {
    model: MODEL,
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: includeContent ? `${prompt}\n\nContent to write:\n${includeContent}` : prompt,
          },
        ],
      },
    ],
    tools,
    temperature: 0.1,
    max_output_tokens: 4096,
    stream: true,
  };

  const events = await sendResponsesApiStream(body);

  const writeEvents = events.filter((e) => {
    const item = e.data?.item as { type?: string } | undefined;
    return e.event === "response.output_item.done" && item?.type === "function_call";
  });

  const results: ToolCallResult[] = [];

  for (const evt of writeEvents) {
    const item = evt.data?.item as { arguments: string; name: string };
    const rawArgs = item.arguments;
    let parsedArgs: Record<string, unknown>;
    try {
      parsedArgs = JSON.parse(rawArgs);
    } catch {
      parsedArgs = {};
    }

    const bsnPositions: { position: number; context: string }[] = [];
    for (let i = 0; i < rawArgs.length - 1; i++) {
      if (rawArgs[i] === "\\" && rawArgs[i + 1] === "n") {
        const start = Math.max(0, i - 10);
        const end = Math.min(rawArgs.length, i + 12);
        bsnPositions.push({
          position: i,
          context: JSON.stringify(rawArgs.slice(start, end)),
        });
      }
    }

    let hasLiteralBSN = bsnPositions.length > 0;

    // Also check the parsed content for literal \n
    if (parsedArgs.content && typeof parsedArgs.content === "string") {
      const contentStr = parsedArgs.content as string;
      for (let i = 0; i < contentStr.length - 1; i++) {
        if (contentStr[i] === "\\" && contentStr[i + 1] === "n") {
          hasLiteralBSN = true;
          const start = Math.max(0, i - 10);
          const end = Math.min(contentStr.length, i + 12);
          bsnPositions.push({
            position: i,
            context: `[parsed] ${JSON.stringify(contentStr.slice(start, end))}`,
          });
        }
      }
    }

    results.push({
      name: item.name,
      rawArguments: rawArgs,
      parsedArgs,
      hasLiteralBackslashN: hasLiteralBSN,
      literalBSNPositions: bsnPositions,
    });
  }

  return results;
}

const WRITE_TOOL = {
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
};

const EXEC_TOOL = {
  type: "function",
  name: "exec",
  description: "Execute a shell command",
  parameters: {
    type: "object",
    properties: {
      command: { type: "string", description: "Command to execute" },
    },
    required: ["command"],
  },
  strict: true,
};

const WRITE_AND_EXEC_TOOLS = [WRITE_TOOL, EXEC_TOOL];

// ── Tests ──────────────────────────────────────────────────────────────────

test("Gemma4: plain text (hello/world)", { skip }, async () => {
  const results = await getToolCalls(
    "Write a file /tmp/test1.txt with content: hello\\nworld\\ntest",
    WRITE_AND_EXEC_TOOLS
  );

  for (const r of results) {
    console.log(`[${r.name}] hasLiteralBSN=${r.hasLiteralBackslashN}`);
    if (r.literalBSNPositions.length > 0) {
      console.log(`  positions:`, r.literalBSNPositions);
    }
  }
});

test("Gemma4: short bash script", { skip }, async () => {
  const bashContent = ["#!/bin/bash", "echo 'Hello World'", "ls -la /tmp", 'echo "Done"'].join(
    "\n"
  );

  const results = await getToolCalls(
    "Write a bash script at /tmp/test2.sh and then run it",
    WRITE_AND_EXEC_TOOLS,
    bashContent
  );

  for (const r of results) {
    console.log(`[${r.name}] hasLiteralBSN=${r.hasLiteralBackslashN}`);
    if (r.literalBSNPositions.length > 0) {
      console.log(`  positions:`, r.literalBSNPositions);
    }
  }
});

test("Gemma4: Python code (the suspected trigger)", { skip }, async () => {
  const pythonContent = [
    "import json",
    "import random",
    "",
    "data = {",
    '    "numbers": [random.randint(1, 100) for _ in range(5)]',
    "}",
    "",
    "with open('/tmp/test3.json', 'w') as f:",
    "    json.dump(data, f, indent=2)",
    "",
    'print("Done")',
    "",
  ].join("\n");

  const results = await getToolCalls(
    "Write a Python script at /tmp/test3.py and run it",
    WRITE_AND_EXEC_TOOLS,
    pythonContent
  );

  for (const r of results) {
    console.log(`[${r.name}] hasLiteralBSN=${r.hasLiteralBackslashN}`);
    if (r.literalBSNPositions.length > 0) {
      console.log(`  positions:`, r.literalBSNPositions);
    }
  }
});

test("Gemma4: Python with colon patterns (theoretical trigger: `:\\n    `)", { skip }, async () => {
  // Minimal content that exercises the colon-newline-indent pattern
  const pythonContent = [
    "def foo():",
    "    pass",
    "",
    "class Bar:",
    "    def __init__(self):",
    "        pass",
    "",
    "if True:",
    "    print('yes')",
    "",
    "for i in range(3):",
    "    print(i)",
    "",
    "while False:",
    "    break",
  ].join("\n");

  const results = await getToolCalls(
    "Write a Python script at /tmp/test4.py and run it",
    WRITE_AND_EXEC_TOOLS,
    pythonContent
  );

  for (const r of results) {
    console.log(`[${r.name}] hasLiteralBSN=${r.hasLiteralBackslashN}`);
    if (r.literalBSNPositions.length > 0) {
      console.log(`  positions:`, r.literalBSNPositions);
    }
  }
});

test("Gemma4: Just exec command (heredoc style)", { skip }, async () => {
  const results = await getToolCalls(
    "Write and run: use cat with heredoc to create /tmp/test5.txt with content hello world and then cat it",
    WRITE_AND_EXEC_TOOLS
  );

  for (const r of results) {
    console.log(`[${r.name}] hasLiteralBSN=${r.hasLiteralBackslashN}`);
    if (r.literalBSNPositions.length > 0) {
      console.log(`  positions:`, r.literalBSNPositions);
    }
  }
});

test("Gemma4: Mixed code (JS + CSS)", { skip }, async () => {
  const mixedContent = [
    "function greet(name) {",
    "  return `Hello, ${name}!`;",
    "}",
    "",
    "const styles = {",
    "  container: {",
    '    display: "flex",',
    '    justifyContent: "center",',
    "  },",
    "};",
    "",
    "/* CSS */",
    ".container {",
    "  max-width: 1200px;",
    "  margin: 0 auto;",
    "  padding: 20px;",
    "}",
    "",
    "export default greet;",
  ].join("\n");

  const results = await getToolCalls(
    "Write a JavaScript/CSS module at /tmp/test6.js",
    WRITE_AND_EXEC_TOOLS,
    mixedContent
  );

  for (const r of results) {
    console.log(`[${r.name}] hasLiteralBSN=${r.hasLiteralBackslashN}`);
    if (r.literalBSNPositions.length > 0) {
      console.log(`  positions:`, r.literalBSNPositions);
    }
  }
});

test("Gemma4: Simple YAML config", { skip }, async () => {
  const yamlContent = [
    "server:",
    "  host: 0.0.0.0",
    "  port: 8080",
    "  workers: 4",
    "",
    "database:",
    "  url: postgres://localhost:5432/db",
    "  pool:",
    "    min: 2",
    "    max: 10",
    "",
    "logging:",
    '  level: "info"',
    "  format: json",
  ].join("\n");

  const results = await getToolCalls(
    "Write a YAML config file at /tmp/config.yaml",
    WRITE_AND_EXEC_TOOLS,
    yamlContent
  );

  for (const r of results) {
    console.log(`[${r.name}] hasLiteralBSN=${r.hasLiteralBackslashN}`);
    if (r.literalBSNPositions.length > 0) {
      console.log(`  positions:`, r.literalBSNPositions);
    }
  }
});

test("Gemma4: Model-generated content (no prompt content)", { skip }, async () => {
  // Let the model come up with its own multi-line content
  const results = await getToolCalls(
    "Write a Python script to the file /tmp/test7.py that generates fibonacci numbers up to 100 and saves them to a JSON file. Use the write tool.",
    WRITE_AND_EXEC_TOOLS
  );

  for (const r of results) {
    console.log(`[${r.name}] hasLiteralBSN=${r.hasLiteralBackslashN}`);
    if (r.literalBSNPositions.length > 0) {
      console.log(`  positions:`, r.literalBSNPositions);
    }
  }
});

test("Gemma4: Short single-line content", { skip }, async () => {
  const results = await getToolCalls(
    "Write a file /tmp/test8.txt with content 'just one line'",
    WRITE_AND_EXEC_TOOLS
  );

  for (const r of results) {
    console.log(`[${r.name}] hasLiteralBSN=${r.hasLiteralBackslashN}`);
  }
});

test("Gemma4: Many short lines (10 simple lines)", { skip }, async () => {
  const lines = Array.from({ length: 10 }, (_, i) => `Line ${i + 1}: test`).join("\n");
  const results = await getToolCalls(
    "Write a file /tmp/test9.txt with these lines",
    WRITE_AND_EXEC_TOOLS,
    lines
  );

  for (const r of results) {
    console.log(`[${r.name}] hasLiteralBSN=${r.hasLiteralBackslashN}`);
    if (r.literalBSNPositions.length > 0) {
      console.log(`  positions:`, r.literalBSNPositions);
    }
  }
});

test("Gemma4: Content with JSON-like syntax (potential confusion)", { skip }, async () => {
  const jsonContent = JSON.stringify(
    {
      name: "test",
      value: 42,
      items: [1, 2, 3],
      config: {
        enabled: true,
        options: ["a", "b"],
      },
    },
    null,
    2
  );

  const results = await getToolCalls(
    "Write a JSON data file at /tmp/test10.json",
    WRITE_AND_EXEC_TOOLS,
    jsonContent
  );

  for (const r of results) {
    console.log(`[${r.name}] hasLiteralBSN=${r.hasLiteralBackslashN}`);
    if (r.literalBSNPositions.length > 0) {
      console.log(`  positions:`, r.literalBSNPositions);
    }
  }
});

test("Gemma4: Template literal content (JS with ${})", { skip }, async () => {
  const templateContent = [
    "const name = 'world';",
    "const greeting = `Hello, ${name}!`;",
    "const multi = `",
    "  Line 1",
    "  Line 2",
    "  Line 3",
    "`;",
  ].join("\n");

  const results = await getToolCalls(
    "Write a JavaScript file at /tmp/test11.js with template literals",
    WRITE_AND_EXEC_TOOLS,
    templateContent
  );

  for (const r of results) {
    console.log(`[${r.name}] hasLiteralBSN=${r.hasLiteralBackslashN}`);
    if (r.literalBSNPositions.length > 0) {
      console.log(`  positions:`, r.literalBSNPositions);
    }
  }
});
