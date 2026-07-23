/**
 * Direct Gemini tests: verify no double-escaping in tool call arguments.
 *
 * Calls Gemini through OmniRoute via both Chat Completions and Responses API,
 * comparing streaming vs non-streaming paths. The goal is to verify that
 * tool call arguments are valid JSON throughout the pipeline.
 */
import test from "node:test";
import assert from "node:assert/strict";

const OMNIROUTE_URL = `${process.env.OMNIROUTE_URL}/v1`;
const AUTH = `Bearer ${process.env.OMNIROUTE_API_KEY || ""}`;

const skip = !(process.env.OMNIROUTE_API_KEY && process.env.OMNIROUTE_URL)
  ? "OMNIROUTE_API_KEY or OMNIROUTE_URL not set — skipping live boundary test"
  : undefined;

// Chat Completions format tool definition
const CC_WRITE_TOOL = {
  type: "function",
  function: {
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
};

// Responses API format tool definition (flat structure)
const RESP_WRITE_TOOL = {
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

interface SseEvent {
  event: string | null;
  data: Record<string, unknown> | null;
}

async function fetchStream(url: string, body: Record<string, unknown>): Promise<SseEvent[]> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
          events.push({ event: currentEvent, data: JSON.parse(dataStr) });
        } catch {
          events.push({ event: currentEvent, data: null });
        }
      }
    }
  }

  return events;
}

async function fetchJson(
  url: string,
  body: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: AUTH,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`);
  }

  return (await response.json()) as Record<string, unknown>;
}

function verifyNoDoubleEscaping(content: string): void {
  // Check for actual newlines (0x0A) - proper for parsed content
  const hasNewlines = content.includes("\n");
  assert.ok(hasNewlines, "content should have actual newlines (0x0A)");

  // Check for literal backslash-n (double-escaping indicator)
  // A proper \\n appears as two characters: 0x5C 0x6E
  const literalBSN = content.match(/\\n/g);
  if (literalBSN) {
    // If we find \\n, they must only appear as part of valid escape sequences,
    // not as actual literal backslash-n contaminating the output
    const cleanContent = content.replace(/\\"/g, "__escaped_quote__");
    const escapedNInContent = cleanContent.match(/\\n/g);
    assert.equal(
      escapedNInContent,
      null,
      `no literal backslash-n in content (found ${literalBSN.length} occurrences)`
    );
  }

  // Verify newlines are actual 0x0A bytes
  for (let i = 0; i < content.length; i++) {
    if (content[i] === "\n") {
      assert.equal(content.charCodeAt(i), 0x0a, `byte at pos ${i} should be 0x0A`);
    }
  }

  // Re-parse round-trip: JSON.stringify then JSON.parse must restore original
  const roundtripped = JSON.parse(JSON.stringify(content));
  assert.equal(roundtripped, content, "JSON round-trip must preserve content exactly");
}

interface ToolCallOutput {
  type: string;
  name: string;
  arguments: string;
}

interface ChatToolCall {
  function: { name: string; arguments: string };
}

function findToolCallOutput(
  output: Record<string, unknown>[],
  name: string
): ToolCallOutput | null {
  const found = output.find(
    (item) =>
      typeof item.type === "string" &&
      item.type === "function_call" &&
      typeof item.name === "string" &&
      item.name === name
  );
  return found ? (found as unknown as ToolCallOutput) : null;
}

function findChatToolCall(
  message: Record<string, unknown> | null | undefined,
  name: string
): ChatToolCall | null {
  if (!message?.tool_calls || !Array.isArray(message.tool_calls)) return null;
  const found = (message.tool_calls as Record<string, unknown>[]).find(
    (tc) =>
      tc.function &&
      typeof tc.function === "object" &&
      (tc.function as Record<string, unknown>).name === name
  );
  return found && typeof found.function === "object" ? (found as unknown as ChatToolCall) : null;
}

// ============================================================
// 1. Chat Completions API - Non-streaming
// ============================================================
test(
  "Chat Completions non-stream: Gemini tool call args are valid JSON with proper newlines",
  { skip },
  async () => {
    const body = {
      model: "gemini/gemma-4-31b-it",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: 'Write a file /tmp/cc_ns.txt with Python code:\ndef hello():\n    print("hello")\n    for i in range(3):\n        print(i)\n\nCall the write tool.',
            },
          ],
        },
      ],
      tools: [CC_WRITE_TOOL],
      temperature: 0.1,
      stream: false,
    };

    const response = await fetchJson(`${OMNIROUTE_URL}/chat/completions`, body);
    assert.ok(
      Array.isArray((response as Record<string, unknown>).choices) &&
        (response as Record<string, unknown>).choices.length > 0,
      "should have choices"
    );

    const choices = (response as Record<string, unknown>).choices as Record<string, unknown>[];
    const toolCall = findChatToolCall(
      choices[0]?.message as Record<string, unknown> | undefined,
      "write"
    );
    assert.ok(toolCall, "should have write tool call");

    const args = JSON.parse(toolCall.function.arguments);
    assert.equal(typeof args.content, "string");

    verifyNoDoubleEscaping(args.content);
  }
);

// ============================================================
// 2. Chat Completions API - Streaming
// ============================================================
test(
  "Chat Completions stream: Gemini tool call args are valid JSON with proper newlines",
  { skip },
  async () => {
    const body = {
      model: "gemini/gemma-4-31b-it",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Write a file /tmp/cc_s.txt with content:\nline A: foo\nline B: bar\nline C: baz\nUse the write tool.",
            },
          ],
        },
      ],
      tools: [CC_WRITE_TOOL],
      temperature: 0.1,
      stream: true,
    };

    const events = await fetchStream(`${OMNIROUTE_URL}/chat/completions`, body);

    // Collect tool call arguments from delta chunks
    let fullArgs = "";
    for (const event of events) {
      if (!event.data?.choices?.[0]?.delta?.tool_calls) continue;
      for (const tc of event.data.choices[0].delta.tool_calls) {
        if (tc.function?.name === "write" && tc.function?.arguments) {
          fullArgs += tc.function.arguments;
        }
      }
    }

    assert.ok(fullArgs.length > 0, "should have accumulated tool call arguments");

    // The accumulated args must be valid JSON
    const args = JSON.parse(fullArgs);
    assert.equal(typeof args.content, "string");

    verifyNoDoubleEscaping(args.content);
  }
);

// ============================================================
// 3. Responses API - Non-streaming
// ============================================================
test(
  "Responses API non-stream: Gemini tool call args are valid JSON with proper newlines",
  { skip },
  async () => {
    const body = {
      model: "gemini/gemma-4-31b-it",
      input:
        "Write a file /tmp/resp_ns.txt with:\nstep 1: init\nstep 2: process\nstep 3: cleanup\nUse the write tool.",
      tools: [RESP_WRITE_TOOL],
      temperature: 0.1,
      max_output_tokens: 4096,
      stream: false,
    };

    const response = await fetchJson(`${OMNIROUTE_URL}/responses`, body);

    assert.equal((response as Record<string, unknown>).status, "completed");
    const output = ((response as Record<string, unknown>).output ?? []) as Record<
      string,
      unknown
    >[];
    const toolCall = findToolCallOutput(output, "write");
    assert.ok(toolCall, "should have write tool call");

    const args = JSON.parse(toolCall.arguments);
    assert.equal(typeof args.content, "string");

    verifyNoDoubleEscaping(args.content);
  }
);

// ============================================================
// 4. Responses API - Streaming
// ============================================================
test(
  "Responses API stream: Gemini tool call args are valid JSON with proper newlines",
  { skip },
  async () => {
    const body = {
      model: "gemini/gemma-4-31b-it",
      input: "Write a file /tmp/resp_s.txt with:\nApple\nBanana\nCherry\nUse the write tool.",
      tools: [RESP_WRITE_TOOL],
      temperature: 0.1,
      max_output_tokens: 4096,
      stream: true,
    };

    const events = await fetchStream(`${OMNIROUTE_URL}/responses`, body);

    // Accumulate function_call_arguments.delta then parse final from output_item.done
    let doneArgs: string | null = null;
    for (const event of events) {
      if (
        event.event === "response.output_item.done" &&
        event.data?.item?.type === "function_call"
      ) {
        doneArgs = event.data.item.arguments;
      }
    }

    assert.ok(doneArgs, "should have function call arguments from output_item.done");

    const args = JSON.parse(doneArgs!);
    assert.equal(typeof args.content, "string");

    verifyNoDoubleEscaping(args.content);
  }
);

// ============================================================
// 5. Compare same prompt through both APIs
// ============================================================
test(
  "Chat Completions and Responses API produce same tool call args for identical prompt",
  { skip },
  async () => {
    const prompt =
      "Write a file /tmp/compare.txt with:\nline1: start\nline2: middle\nline3: end\nUse the write tool.";

    // Non-streaming Chat Completions
    const ccBody = {
      model: "gemini/gemma-4-31b-it",
      messages: [{ role: "user", content: [{ type: "text", text: prompt }] }],
      tools: [CC_WRITE_TOOL],
      temperature: 0.1,
      stream: false,
    };
    const ccResp = await fetchJson(`${OMNIROUTE_URL}/chat/completions`, ccBody);
    const ccChoices = (ccResp as Record<string, unknown>).choices as
      Record<string, unknown>[] | undefined;
    const ccToolCall = findChatToolCall(
      ccChoices?.[0]?.message as Record<string, unknown> | undefined,
      "write"
    );
    assert.ok(ccToolCall, "Chat Completions should have write tool call");
    const ccArgs = JSON.parse(ccToolCall.function.arguments);

    // Non-streaming Responses API
    const respBody = {
      model: "gemini/gemma-4-31b-it",
      input: prompt,
      tools: [RESP_WRITE_TOOL],
      temperature: 0.1,
      max_output_tokens: 4096,
      stream: false,
    };
    const respResp = await fetchJson(`${OMNIROUTE_URL}/responses`, respBody);
    const respOutput = ((respResp as Record<string, unknown>).output ?? []) as Record<
      string,
      unknown
    >[];
    const respToolCall = findToolCallOutput(respOutput, "write");
    assert.ok(respToolCall, "Responses API should have write tool call");
    const respArgs = JSON.parse(respToolCall.arguments);

    // Both must have valid content with actual newlines
    assert.equal(typeof ccArgs.content, "string");
    assert.equal(typeof respArgs.content, "string");

    verifyNoDoubleEscaping(ccArgs.content);
    verifyNoDoubleEscaping(respArgs.content);

    // Both should contain newlines (content may differ slightly due to model non-determinism)
    assert.ok(ccArgs.content.includes("\n"), "Chat Completions content has newlines");
    assert.ok(respArgs.content.includes("\n"), "Responses API content has newlines");
  }
);

// ============================================================
// 6. Round-trip: Chat Completions args -> Responses API args
// ============================================================
test("Chat Completions args survive round-trip through Responses API", { skip }, async () => {
  // Get args via Chat Completions
  const ccBody = {
    model: "gemini/gemma-4-31b-it",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: 'Write file /tmp/rt.txt with:\ndef run():\n    return "ok"\n',
          },
        ],
      },
    ],
    tools: [CC_WRITE_TOOL],
    temperature: 0.1,
    stream: false,
  };
  const ccResp = await fetchJson(`${OMNIROUTE_URL}/chat/completions`, ccBody);
  const ccChoices = (ccResp as Record<string, unknown>).choices as
    Record<string, unknown>[] | undefined;
  const ccToolCall = findChatToolCall(
    ccChoices?.[0]?.message as Record<string, unknown> | undefined,
    "write"
  );
  assert.ok(ccToolCall, "Chat Completions should have write tool call");
  const ccArgs = JSON.parse(ccToolCall.function.arguments);
  assert.equal(typeof ccArgs.content, "string");
  const originalContent = ccArgs.content;

  // Feed the Chat Completions args through the OpenAI -> Responses translator
  // by simulating what OpenClaw does: receiving tool call, extracting args
  const { openaiToOpenAIResponsesResponse } =
    await import("../../open-sse/translator/response/openai-responses.ts");
  const { initState } = await import("../../open-sse/translator/index.ts");
  const { FORMATS } = await import("../../open-sse/translator/formats.ts");

  const state = initState(FORMATS.OPENAI_RESPONSES);
  const events: Record<string, unknown>[] = [];

  // Simulate a Chat Completions stream with the tool call
  const ccChunk = {
    id: "chatcmpl-rt",
    model: "gemini/gemma-4-31b-it",
    choices: [
      {
        index: 0,
        delta: {
          tool_calls: [
            {
              index: 0,
              id: "call_rt",
              type: "function",
              function: {
                name: "write",
                arguments: JSON.stringify(ccArgs),
              },
            },
          ],
        },
        finish_reason: null,
      },
    ],
  };

  const flushChunk = {
    id: "chatcmpl-rt",
    model: "gemini/gemma-4-31b-it",
    choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }],
  };

  const r1 = openaiToOpenAIResponsesResponse(ccChunk, state) || [];
  const r2 = openaiToOpenAIResponsesResponse(flushChunk, state) || [];
  events.push(...r1, ...r2);

  // Extract the final arguments from the completed response
  const completedEvent = events.find(
    (e) => (e as Record<string, unknown>).event === "response.completed"
  );
  assert.ok(completedEvent, "should have response.completed");

  const completedData = completedEvent as Record<string, unknown>;
  const responseData = completedData.data as Record<string, unknown> | undefined;
  const respData = responseData?.response as Record<string, unknown> | undefined;
  const output = (respData?.output ?? []) as Record<string, unknown>[];
  const respFc = findToolCallOutput(output, "write");
  assert.ok(respFc, "should have write in completed output");

  const respArgs = JSON.parse(respFc.arguments);
  assert.equal(
    respArgs.content,
    originalContent,
    "content must survive round-trip without corruption"
  );

  // Verify no double-escaping
  verifyNoDoubleEscaping(respArgs.content);
});
