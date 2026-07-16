/**
 * Multi-turn investigation: Does accumulated context cause Gemma4 to
 * start generating literal \\n in tool call arguments?
 *
 * Simulates a multi-turn conversation where the model keeps seeing
 * tool results and continues with more tool calls.
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

interface Message {
  role: "user" | "assistant" | "developer" | "system";
  content: { type: string; text?: string }[];
}

interface ToolDef {
  type: "function";
  name: string;
  description: string;
  parameters: {
    type: "object";
    properties: Record<string, { type: string; description?: string }>;
    required: string[];
  };
  strict: true;
}

interface ResponseOutputItem {
  type: string;
  name: string;
  arguments: string;
  call_id?: string;
}

interface ResponseBody {
  output?: ResponseOutputItem[];
}

interface ToolArgs {
  path?: string;
  content?: string;
  command?: string;
}

function contentText(text: string): { type: string; text: string } {
  return { type: "input_text", text };
}

async function doNonStreaming(messages: Message[], tools: ToolDef[]): Promise<ResponseBody> {
  const body = {
    model: MODEL,
    input: messages,
    tools,
    temperature: 0.1,
    max_output_tokens: 4096,
    stream: false,
  };

  const r = await fetch(`${BASE}/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: COOKIE,
      Authorization: AUTH,
    },
    body: JSON.stringify(body),
  });

  const data = (await r.json()) as ResponseBody;
  return data;
}

async function analyzeTools(
  content: string,
  filesSoFar: number
): Promise<{ ok: boolean; details: string }> {
  const messages: Message[] = [{ role: "user", content: [contentText(content)] }];
  const tools: ToolDef[] = [
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
    {
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
    },
  ];

  let turn = 0;
  let allOk = true;
  const details: string[] = [];

  while (turn < 5) {
    turn++;
    const response = await doNonStreaming(messages, tools);

    if (!response.output || !Array.isArray(response.output)) {
      details.push(`Turn ${turn}: No output`);
      break;
    }

    const toolCalls = response.output.filter((item) => item.type === "function_call");

    if (toolCalls.length === 0) {
      details.push(`Turn ${turn}: No tool calls (text response)`);
      break;
    }

    // Analyze each tool call
    for (const tc of toolCalls) {
      let args: ToolArgs;
      try {
        args = JSON.parse(tc.arguments);
      } catch {
        details.push(`Turn ${turn} ${tc.name}: Invalid JSON arguments`);
        allOk = false;
        continue;
      }

      if (tc.name === "write") {
        const content = args.content || "";
        // Check for literal backslash-n in the PARSED content
        let literalBSN = 0;
        for (let i = 0; i < content.length - 1; i++) {
          if (content[i] === "\\" && content[i + 1] === "n") {
            literalBSN++;
          }
        }

        const realNewlines = (content.match(/\n/g) || []).length;

        if (literalBSN > 0) {
          allOk = false;
          details.push(
            `Turn ${turn} write(${args.path}): ${literalBSN} literal BSN, ${realNewlines} real NLs! ` +
              `Content start: ${JSON.stringify(content.slice(0, 100))}`
          );
        } else {
          details.push(
            `Turn ${turn} write(${args.path}): OK (${realNewlines} newlines, ${content.length} bytes)`
          );
        }
      } else if (tc.name === "exec") {
        const cmd = args.command || "";
        details.push(
          `Turn ${turn} exec: ${cmd.length} chars, starts with: ${JSON.stringify(cmd.slice(0, 60))}`
        );
      }
    }

    // Add tool results
    const toolResults: Message[] = [];
    for (const tc of toolCalls) {
      let args: ToolArgs;
      try {
        args = JSON.parse(tc.arguments);
      } catch {
        continue;
      }

      const fn = tc.name === "write" ? "write" : "exec";

      if (fn === "write") {
        filesSoFar++;
        toolResults.push({
          role: "assistant",
          content: [
            {
              type: "tool_use",
              id: tc.call_id || `call_${turn}`,
              name: tc.name,
              input: args,
            },
          ],
        });
        toolResults.push({
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: tc.call_id || `call_${turn}`,
              content: `Successfully wrote ${(args.content || "").length} bytes to ${args.path}`,
            },
          ],
        });
      } else {
        toolResults.push({
          role: "assistant",
          content: [
            {
              type: "tool_use",
              id: tc.call_id || `call_${turn}`,
              name: tc.name,
              input: args,
            },
          ],
        });
        toolResults.push({
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: tc.call_id || `call_${turn}`,
              content: "(completed with exit code 0)",
            },
          ],
        });
      }
    }

    // Keep tools for next turn
    if (response.output) {
      const responseItems = response.output.filter((item) => item.type === "function_call");

      // Build next conversation
      const newMessages: Message[] = [
        ...messages,
        ...responseItems.map((ri) => ({
          role: "assistant" as const,
          content: [
            {
              type: "tool_use",
              id: ri.call_id || `call_${turn}`,
              name: ri.name,
              input: JSON.parse(ri.arguments),
            },
          ],
        })),
        ...toolResults.filter((tr) => tr.role === "user"),
      ];
      messages.length = 0;
      messages.push(...newMessages);
    }
  }

  return { ok: allOk, details: details.join("\n") };
}

test("Gemma4 multi-turn: write Python in multiple rounds", { skip }, async () => {
  const prompt = `Do the following steps in order:
1. Create a Python script at /tmp/mt_data.py that writes a JSON file with timestamp, 3 random numbers, and a greeting.
2. Run the script and show output.
3. Create a summary script at /tmp/mt_summary.py that reads the JSON, calculates sum/average, writes a new JSON.
4. Run the summary script and show output.
5. Read and display both JSON files.

Use write and exec tools as needed.`;

  const result = await analyzeTools(prompt, 0);
  console.log("=== Multi-turn Result ===");
  console.log(result.details);
  console.log("=== Overall:", result.ok ? "PASS" : "FAIL");
});

test("Gemma4 multi-turn: just write lots of files", { skip }, async () => {
  // Pure write tool calls to stress the content encoding
  const messages: Message[] = [
    {
      role: "user",
      content: [
        contentText(
          "Write a file /tmp/mt_a.py with a Python function that computes factorial:\n" +
            "```python\ndef factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n-1)\n```"
        ),
      ],
    },
  ];

  const tools: ToolDef[] = [
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
  ];

  let turn = 0;
  let allOk = true;
  const failures: string[] = [];

  while (turn < 8) {
    turn++;
    const response = await doNonStreaming(messages, tools);
    const toolCalls = (response.output || []).filter((item) => item.type === "function_call");

    if (toolCalls.length === 0) break;

    for (const tc of toolCalls) {
      let args: ToolArgs;
      try {
        args = JSON.parse(tc.arguments);
      } catch {
        continue;
      }
      const content = args.content || "";
      let literalBSN = 0;
      for (let i = 0; i < content.length - 1; i++) {
        if (content[i] === "\\" && content[i + 1] === "n") literalBSN++;
      }
      if (literalBSN > 0) {
        allOk = false;
        failures.push(
          `Turn ${turn}: ${literalBSN} literal BSN in ${args.path}. ` +
            `Content start: ${JSON.stringify(content.slice(0, 120))}`
        );
      } else {
        console.log(
          `Turn ${turn} ${args.path}: OK (${(content.match(/\n/g) || []).length} NLs, ${content.length}B)`
        );
      }
    }

    // Build next turn: simulate the user asking for another file
    const fileLetters = ["b", "c", "d", "e", "f", "g", "h", "i"];
    const topics = [
      "recursive fibonacci",
      "binary search",
      "quick sort",
      "linked list class",
      "JSON parser",
      "HTTP client class",
      "CSV reader",
    ];

    if (turn <= topics.length) {
      const topic = topics[turn - 1] || "hello world";
      messages.push({
        role: "assistant",
        content: toolCalls.map((tc) => ({
          type: "tool_use",
          id: tc.call_id || `call_${turn}`,
          name: tc.name,
          input: JSON.parse(tc.arguments),
        })),
      });
      messages.push({
        role: "user",
        content: [
          contentText(
            `Write a file /tmp/mt_${fileLetters[turn - 1] || turn}.py that implements ${topic}`
          ),
        ],
      });
    }
  }

  console.log("=== Pure Write Multi-turn ===");
  if (failures.length > 0) {
    console.log("FAILURES:");
    for (const f of failures) console.log("  " + f);
  }
  console.log("Overall:", allOk ? "PASS" : "FAIL");
});
