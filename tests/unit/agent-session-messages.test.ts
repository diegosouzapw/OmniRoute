import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import type { AgentContext } from "../../open-sse/handlers/chatCore/agentContext.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-session-messages-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-at-least-32-chars-long-0123456789";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const featureFlagsDb = await import("../../src/lib/db/featureFlags.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const messagesDb = await import("../../src/lib/db/agentSessionMessages.ts");
const cleanup = await import("../../src/lib/db/cleanup.ts");
const { extractUserTurnText, extractAssistantTurnText, extractAgentSessionTurn } =
  await import("../../open-sse/handlers/chatCore/agentSessionTurn.ts");
const { resolveSessionTurn } = await import("../../open-sse/handlers/chatCore/agentContext.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { GET: getMessagesRoute } =
  await import("../../src/app/api/v1/me/sessions/[id]/messages/route.ts");
const { SELF_USAGE_SCOPE } = await import("../../src/shared/constants/selfServiceScopes.ts");

const CAPTURE_FLAG = "AGENT_SESSION_MESSAGES_ENABLED";

test.after(() => {
  featureFlagsDb.removeFeatureFlagOverride(CAPTURE_FLAG);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

let keyAliceToken = "";
let keyAliceId = "";
let keyBobToken = "";
let sessionAliceId = "";

function agentContextFor(clientSessionId: string | null): AgentContext {
  return {
    client: "claude-code",
    clientSessionId,
    projectName: clientSessionId ? "billing-api" : null,
    projectRepo: null,
    projectPath: null,
    projectSource: clientSessionId ? "path" : null,
    gitBranch: null,
  };
}

async function withCaptureFlag<T>(value: "true" | "false", fn: () => Promise<T>): Promise<T> {
  featureFlagsDb.setFeatureFlagOverride(CAPTURE_FLAG, value);
  try {
    return await fn();
  } finally {
    featureFlagsDb.removeFeatureFlagOverride(CAPTURE_FLAG);
  }
}

let timestampSeq = 0;
function nextTimestamp(): string {
  timestampSeq += 1;
  return new Date(Date.UTC(2026, 8, 25, 12, 0, timestampSeq)).toISOString();
}

function countTurnsWithUserText(userText: string): number {
  const row = core
    .getDbInstance()
    .prepare("SELECT COUNT(*) AS c FROM agent_session_messages WHERE user_text = ?")
    .get(userText) as { c: number };
  return row.c;
}

/** Same wiring as chatCore: resolve the turn, then persist it through saveRequestUsage. */
async function recordTurn(opts: {
  prompt: string;
  context: AgentContext;
  apiKeyId: string | null;
  apiKeyInfo: { noLog?: boolean } | null;
}): Promise<void> {
  const requestBody = { messages: [{ role: "user", content: opts.prompt }] };
  const responseBody = { content: [{ type: "text", text: "Done." }] };
  await usageHistory.saveRequestUsage({
    provider: "anthropic",
    model: "claude-sonnet-4",
    tokens: { input: 10, output: 5 },
    success: true,
    latencyMs: 50,
    timestamp: nextTimestamp(),
    apiKeyId: opts.apiKeyId,
    agentContext: opts.context,
    sessionTurn: resolveSessionTurn(requestBody, [responseBody], opts.context, opts.apiKeyInfo),
  });
}

type StreamCompletion = {
  responseBody?: unknown;
  clientPayload?: { summary?: unknown };
  clientText?: string;
};
type StreamOptions = NonNullable<Parameters<typeof createSSEStream>[0]>;

const textEncoder = new TextEncoder();
const sse = (payload: unknown) => `data: ${JSON.stringify(payload)}\n\n`;

/** Runs the real stream assembler and returns what it hands to chatCore's onStreamComplete. */
async function assembleStream(chunks: string[], options: StreamOptions): Promise<StreamCompletion> {
  let completion: StreamCompletion = {};
  const source = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(textEncoder.encode(chunk));
      controller.close();
    },
  });
  const onComplete = (payload: StreamCompletion) => {
    completion = payload;
  };
  const stream = source.pipeThrough(createSSEStream({ ...options, onComplete }));
  const clientText = await new Response(stream).text();
  return { ...completion, clientText };
}

/** chatCore passes the client payload summary first, then the assembled response body. */
function streamedAssistantTurn(completion: StreamCompletion) {
  const turn = extractAgentSessionTurn(
    { messages: [{ role: "user", content: "go" }] },
    completion.clientPayload?.summary,
    completion.responseBody
  );
  assert.ok(turn, "the streamed response should yield a turn");
  return turn;
}

const openAiChunk = (delta: Record<string, unknown>, finishReason: string | null = null) =>
  sse({
    id: "chatcmpl_1",
    object: "chat.completion.chunk",
    created: 1,
    model: "gpt-4.1-mini",
    choices: [{ index: 0, delta, finish_reason: finishReason }],
  });

const openAiToolCallChunks = (text: string, toolName: string) => [
  openAiChunk({ role: "assistant", content: text }),
  openAiChunk({
    tool_calls: [
      {
        index: 0,
        id: "call_1",
        type: "function",
        function: { name: toolName, arguments: '{"path":"a.ts"}' },
      },
    ],
  }),
  openAiChunk({}, "tool_calls"),
];

test.before(async () => {
  const aliceKey = await apiKeysDb.createApiKey("key-alice", "test-machine", [SELF_USAGE_SCOPE]);
  keyAliceToken = aliceKey.key;
  keyAliceId = aliceKey.id;

  const bobKey = await apiKeysDb.createApiKey("key-bob", "test-machine", [SELF_USAGE_SCOPE]);
  keyBobToken = bobKey.key;

  // Record a session for Alice with 2 turns
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o",
    tokens: { input: 100, output: 50 },
    success: true,
    latencyMs: 100,
    timestamp: "2026-09-25T10:00:00.000Z",
    apiKeyId: keyAliceId,
    apiKeyName: "key-alice",
    agentContext: {
      client: "claude-code",
      clientSessionId: "alice-sess-msg-1",
      projectName: "billing-api",
      projectRepo: "github.com/acme/billing",
      projectPath: "/home/alice/billing",
      projectSource: "path",
      gitBranch: "main",
    },
    sessionTurn: {
      userText: "Fix the bug in auth",
      assistantText: "I found the bug and will fix it",
      toolNames: ["Edit", "Bash"],
      truncated: false,
    },
  });

  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o",
    tokens: { input: 200, output: 80 },
    success: true,
    latencyMs: 150,
    timestamp: "2026-09-25T10:05:00.000Z",
    apiKeyId: keyAliceId,
    apiKeyName: "key-alice",
    agentContext: {
      client: "claude-code",
      clientSessionId: "alice-sess-msg-1",
      projectName: "billing-api",
      projectRepo: "github.com/acme/billing",
      projectPath: "/home/alice/billing",
      projectSource: "path",
      gitBranch: "main",
    },
    sessionTurn: {
      userText: "Run the tests now",
      assistantText: "Tests passed cleanly",
      toolNames: ["Bash"],
      truncated: false,
    },
  });

  const db = core.getDbInstance();
  const sessionRow = db
    .prepare("SELECT id FROM agent_sessions WHERE client_session_id = ?")
    .get("alice-sess-msg-1") as { id: string };
  sessionAliceId = sessionRow.id;
});

// ──────────────── Pure extraction tests ────────────────

test("extractUserTurnText extracts last user message and strips system-reminder", () => {
  const body = {
    messages: [
      { role: "user", content: "first question" },
      { role: "assistant", content: "first answer" },
      {
        role: "user",
        content: "Help me with this.\n<system-reminder>secret context</system-reminder>\nThanks!",
      },
    ],
  };

  const extracted = extractUserTurnText(body);
  assert.equal(extracted.text, "Help me with this.\n\nThanks!");
  assert.equal(extracted.truncated, false);
});

test("extractUserTurnText handles content block array and ignores tool_result", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          { type: "tool_result", tool_use_id: "t1", content: "files list" },
          { type: "text", text: "Now refactor the controller" },
        ],
      },
    ],
  };

  const extracted = extractUserTurnText(body);
  assert.equal(extracted.text, "Now refactor the controller");
});

test("extractUserTurnText returns null when user message only has tool_result", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "t1", content: "done" }],
      },
    ],
  };

  const extracted = extractUserTurnText(body);
  assert.equal(extracted.text, null);
});

test("extractUserTurnText keeps the prompt before an assistant prefill", () => {
  const body = {
    messages: [
      { role: "user", content: "Summarize the diff" },
      { role: "assistant", content: "Summary:" },
    ],
  };

  assert.equal(extractUserTurnText(body).text, "Summarize the diff");
});

test("extractUserTurnText returns null for a Chat Completions tool-result turn", () => {
  const body = {
    messages: [
      { role: "user", content: "Read a.ts" },
      {
        role: "assistant",
        content: null,
        tool_calls: [
          { id: "call_1", type: "function", function: { name: "read", arguments: "{}" } },
        ],
      },
      { role: "tool", tool_call_id: "call_1", content: "file contents" },
    ],
  };

  assert.equal(extractUserTurnText(body).text, null);
});

test("extractUserTurnText reads a Responses API string input", () => {
  assert.equal(extractUserTurnText({ input: "List the files" }).text, "List the files");
});

test("extractUserTurnText reads the last user item of a Responses API input array", () => {
  const body = {
    input: [
      { type: "message", role: "developer", content: [{ type: "input_text", text: "rules" }] },
      { type: "message", role: "user", content: [{ type: "input_text", text: "First task" }] },
      { type: "message", role: "assistant", content: [{ type: "output_text", text: "Done" }] },
      { role: "user", content: [{ type: "input_text", text: "Now run the tests" }] },
    ],
  };

  assert.equal(extractUserTurnText(body).text, "Now run the tests");
});

test("extractUserTurnText returns null for a Responses API tool-output turn", () => {
  const body = {
    input: [
      { role: "user", content: [{ type: "input_text", text: "Run the tests" }] },
      { type: "function_call", call_id: "call_1", name: "shell", arguments: "{}" },
      { type: "function_call_output", call_id: "call_1", output: "ok" },
    ],
  };

  assert.equal(extractUserTurnText(body).text, null);
});

test("extractAssistantTurnText extracts text and tool names from Anthropic response", () => {
  const response = {
    content: [
      { type: "text", text: "Checking the repo structure..." },
      { type: "tool_use", id: "t1", name: "Glob", input: {} },
      { type: "tool_use", id: "t2", name: "Read", input: {} },
    ],
  };

  const extracted = extractAssistantTurnText(response);
  assert.equal(extracted.text, "Checking the repo structure...");
  assert.deepEqual(extracted.toolNames, ["Glob", "Read"]);
});

test("extractAssistantTurnText extracts from OpenAI choices shape", () => {
  const response = {
    choices: [
      {
        message: {
          content: "Here is the plan.",
          tool_calls: [{ function: { name: "search" } }],
        },
      },
    ],
  };

  const extracted = extractAssistantTurnText(response);
  assert.equal(extracted.text, "Here is the plan.");
  assert.deepEqual(extracted.toolNames, ["search"]);
});

test("extractAssistantTurnText extracts from a non-streaming Responses API response", () => {
  // Native Responses upstream to a Responses client: chatCore hands this JSON on untranslated.
  const response = {
    id: "resp_1",
    object: "response",
    status: "completed",
    output: [
      { type: "reasoning", id: "rs_1", summary: [{ type: "summary_text", text: "thinking" }] },
      {
        type: "message",
        id: "msg_1",
        role: "assistant",
        content: [{ type: "output_text", text: "Running the tests.", annotations: [] }],
      },
      { type: "function_call", id: "fc_1", call_id: "call_1", name: "shell", arguments: "{}" },
      { type: "custom_tool_call", id: "ct_1", call_id: "call_2", name: "apply_patch", input: "" },
    ],
  };

  const extracted = extractAssistantTurnText(response);
  assert.equal(extracted.text, "Running the tests.");
  assert.deepEqual(extracted.toolNames, ["shell", "apply_patch"]);
});

test("extractAgentSessionTurn caps text at 4000 characters and sets truncated flag", () => {
  const longText = "a".repeat(5000);
  const body = { messages: [{ role: "user", content: longText }] };
  const response = { content: [{ type: "text", text: "ok" }] };

  const turn = extractAgentSessionTurn(body, response);
  assert.ok(turn);
  assert.equal(turn.userText?.length, 4000);
  assert.equal(turn.truncated, true);
});

// ──────────────── Streamed responses (real assembler output) ────────────────

test("streamed OpenAI chat passthrough yields assistant text and tool names", async () => {
  const completion = await assembleStream(openAiToolCallChunks("Reading the file.", "read_file"), {
    mode: "passthrough",
    sourceFormat: FORMATS.OPENAI,
    provider: "openai",
    model: "gpt-4.1-mini",
    body: { messages: [{ role: "user", content: "go" }] },
  });

  const turn = streamedAssistantTurn(completion);
  assert.equal(turn.assistantText, "Reading the file.");
  assert.deepEqual(turn.toolNames, ["read_file"]);
});

const claudePassthroughOptions = (toolNameMap?: Map<string, string>): StreamOptions => ({
  mode: "passthrough",
  sourceFormat: FORMATS.CLAUDE,
  clientResponseFormat: FORMATS.CLAUDE,
  provider: "claude",
  model: "claude-sonnet-4",
  body: { messages: [{ role: "user", content: "go" }] },
  toolNameMap,
});

/** A Claude stream with one tool_use block per name, then a closing text block. */
const claudeToolUseStream = (toolNames: string[], text: string) => [
  sse({
    type: "message_start",
    message: { id: "msg_2", model: "claude-sonnet-4", role: "assistant", usage: {} },
  }),
  ...toolNames.flatMap((name, index) => [
    sse({
      type: "content_block_start",
      index,
      content_block: { type: "tool_use", id: `toolu_${index}`, name, input: {} },
    }),
    sse({
      type: "content_block_delta",
      index,
      delta: { type: "input_json_delta", partial_json: '{"file_path":"a.ts"}' },
    }),
    sse({ type: "content_block_stop", index }),
  ]),
  sse({
    type: "content_block_start",
    index: toolNames.length,
    content_block: { type: "text", text: "" },
  }),
  sse({
    type: "content_block_delta",
    index: toolNames.length,
    delta: { type: "text_delta", text },
  }),
  sse({ type: "content_block_stop", index: toolNames.length }),
  sse({ type: "message_delta", delta: { stop_reason: "tool_use" }, usage: {} }),
  sse({ type: "message_stop" }),
];

type AssembledChatBody = { choices: { message: Record<string, unknown> }[] };

test("streamed Anthropic passthrough yields the assistant text and tool_use names", async () => {
  const chunks = claudeToolUseStream(["Read"], "Let me check the tests.");
  const completion = await assembleStream(chunks, claudePassthroughOptions());

  const message = (completion.responseBody as AssembledChatBody).choices[0].message;
  assert.deepEqual(message.tool_calls, [{ type: "function", function: { name: "Read" } }]);
  const turn = streamedAssistantTurn(completion);
  assert.equal(turn.assistantText, "Let me check the tests.");
  assert.deepEqual(turn.toolNames, ["Read"]);
  assert.deepEqual(extractAgentSessionTurn({ messages: [] }, completion.responseBody)?.toolNames, [
    "Read",
  ]);
  assert.ok(completion.clientText?.includes(chunks[1]), "tool_use frame reaches the client as-is");
  assert.ok(!completion.clientText?.includes("tool_calls"), "client stream stays Claude-shaped");
});

test("streamed Anthropic passthrough stores restored, de-duplicated tool names", async () => {
  const toolNameMap = new Map([
    ["proxy_Read", "Read"],
    ["proxy_Grep", "Grep"],
  ]);
  const completion = await assembleStream(
    claudeToolUseStream(["proxy_Read", "proxy_Read", "proxy_Grep"], "Searching."),
    claudePassthroughOptions(toolNameMap)
  );

  assert.deepEqual(streamedAssistantTurn(completion).toolNames, ["Read", "Grep"]);
  assert.ok(completion.clientText?.includes('"name":"Read"'), "client sees the restored name");
  assert.ok(!completion.clientText?.includes("tool_calls"), "client stream stays Claude-shaped");
});

test("streamed Anthropic passthrough keeps at most 20 tool names", async () => {
  const names = Array.from({ length: 25 }, (_, i) => `tool_${i}`);
  const completion = await assembleStream(
    claudeToolUseStream(names, "Done."),
    claudePassthroughOptions()
  );

  const message = (completion.responseBody as AssembledChatBody).choices[0].message;
  assert.equal((message.tool_calls as unknown[]).length, 20);
  assert.deepEqual(streamedAssistantTurn(completion).toolNames, names.slice(0, 20));
});

test("streamed OpenAI upstream translated for an Anthropic client yields text and tools", async () => {
  const completion = await assembleStream(openAiToolCallChunks("Opening a.ts.", "Read"), {
    mode: "translate",
    targetFormat: FORMATS.OPENAI,
    sourceFormat: FORMATS.CLAUDE,
    provider: "openai",
    model: "gpt-4.1-mini",
    body: { messages: [{ role: "user", content: "go" }] },
  });

  const turn = streamedAssistantTurn(completion);
  assert.equal(turn.assistantText, "Opening a.ts.");
  assert.deepEqual(turn.toolNames, ["Read"]);
});

test("streamed Responses API passthrough yields text and function_call names", async () => {
  const message = {
    type: "message",
    id: "msg_1",
    role: "assistant",
    status: "completed",
    content: [{ type: "output_text", text: "Running the tests.", annotations: [] }],
  };
  const functionCall = {
    type: "function_call",
    id: "fc_1",
    call_id: "call_1",
    name: "shell",
    arguments: '{"cmd":"npm test"}',
    status: "completed",
  };
  const completion = await assembleStream(
    [
      sse({
        type: "response.created",
        response: { id: "resp_1", status: "in_progress", output: [] },
      }),
      sse({
        type: "response.output_item.added",
        output_index: 0,
        item: { ...message, status: "in_progress", content: [] },
      }),
      sse({
        type: "response.output_text.delta",
        item_id: "msg_1",
        output_index: 0,
        content_index: 0,
        delta: "Running the tests.",
      }),
      sse({ type: "response.output_item.done", output_index: 0, item: message }),
      sse({
        type: "response.output_item.added",
        output_index: 1,
        item: { ...functionCall, arguments: "", status: "in_progress" },
      }),
      sse({
        type: "response.function_call_arguments.done",
        item_id: "fc_1",
        output_index: 1,
        arguments: functionCall.arguments,
      }),
      sse({ type: "response.output_item.done", output_index: 1, item: functionCall }),
      sse({
        type: "response.completed",
        response: { id: "resp_1", status: "completed", output: [message, functionCall] },
      }),
    ],
    {
      mode: "passthrough",
      sourceFormat: FORMATS.OPENAI_RESPONSES,
      clientResponseFormat: FORMATS.OPENAI_RESPONSES,
      provider: "codex",
      model: "gpt-5.5",
      body: { input: "go" },
    }
  );

  const turn = streamedAssistantTurn(completion);
  assert.equal(turn.assistantText, "Running the tests.");
  assert.deepEqual(turn.toolNames, ["shell"]);
});

test("streamed OpenAI upstream translated for a Responses API client yields text and tools", async () => {
  const completion = await assembleStream(openAiToolCallChunks("Patching a.ts.", "apply_patch"), {
    mode: "translate",
    targetFormat: FORMATS.OPENAI,
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    provider: "openai",
    model: "gpt-4.1-mini",
    body: { input: "go" },
  });

  const turn = streamedAssistantTurn(completion);
  assert.equal(turn.assistantText, "Patching a.ts.");
  assert.deepEqual(turn.toolNames, ["apply_patch"]);
});

// ──────────────── Capture gating ────────────────

test("a turn is captured when the flag is on and the request has an agent identity", async () => {
  await withCaptureFlag("true", () =>
    recordTurn({
      prompt: "gate-control prompt",
      context: agentContextFor("gate-control"),
      apiKeyId: keyAliceId,
      apiKeyInfo: { noLog: false },
    })
  );

  assert.equal(countTurnsWithUserText("gate-control prompt"), 1);
});

test("no turn is captured while the feature flag is off", async () => {
  await withCaptureFlag("false", () =>
    recordTurn({
      prompt: "gate-flag-off prompt",
      context: agentContextFor("gate-flag-off"),
      apiKeyId: keyAliceId,
      apiKeyInfo: { noLog: false },
    })
  );

  assert.equal(countTurnsWithUserText("gate-flag-off prompt"), 0);
});

test("no turn is captured for a noLog API key", async () => {
  const noLogKey = await apiKeysDb.createApiKey("key-nolog", "test-machine", [SELF_USAGE_SCOPE]);
  await apiKeysDb.updateApiKeyPermissions(noLogKey.id, { noLog: true });
  const metadata = await apiKeysDb.getApiKeyMetadata(noLogKey.key);
  assert.equal(metadata?.noLog, true);

  await withCaptureFlag("true", async () => {
    assert.equal(
      resolveSessionTurn(
        { messages: [{ role: "user", content: "hidden" }] },
        [{ content: [{ type: "text", text: "ok" }] }],
        agentContextFor("gate-nolog"),
        metadata
      ),
      null
    );
    await recordTurn({
      prompt: "gate-nolog prompt",
      context: agentContextFor("gate-nolog"),
      apiKeyId: noLogKey.id,
      apiKeyInfo: metadata,
    });
    // A caller that skipped resolveSessionTurn still cannot persist a noLog key's turn.
    await usageHistory.saveRequestUsage({
      provider: "anthropic",
      model: "claude-sonnet-4",
      tokens: { input: 10, output: 5 },
      timestamp: nextTimestamp(),
      apiKeyId: noLogKey.id,
      agentContext: agentContextFor("gate-nolog"),
      sessionTurn: {
        userText: "gate-nolog direct",
        assistantText: "ok",
        toolNames: [],
        truncated: false,
      },
    });
  });

  assert.equal(countTurnsWithUserText("gate-nolog prompt"), 0);
  assert.equal(countTurnsWithUserText("gate-nolog direct"), 0);
});

test("no turn is captured for a request without an agent identity", async () => {
  await withCaptureFlag("true", () =>
    recordTurn({
      prompt: "gate-no-identity prompt",
      context: agentContextFor(null),
      apiKeyId: keyAliceId,
      apiKeyInfo: { noLog: false },
    })
  );

  assert.equal(countTurnsWithUserText("gate-no-identity prompt"), 0);
});

test("no turn is captured for a request without an API key", async () => {
  await withCaptureFlag("true", () =>
    recordTurn({
      prompt: "gate-no-key prompt",
      context: agentContextFor("gate-no-key"),
      apiKeyId: null,
      apiKeyInfo: null,
    })
  );

  assert.equal(countTurnsWithUserText("gate-no-key prompt"), 0);
});

// ──────────────── Persistence & Route tests ────────────────

test("GET /v1/me/sessions/[id]/messages lists messages for the calling key", async () => {
  const req = new Request(`http://localhost:20128/v1/me/sessions/${sessionAliceId}/messages`, {
    headers: { Authorization: `Bearer ${keyAliceToken}` },
  });

  const res = await getMessagesRoute(req, { params: Promise.resolve({ id: sessionAliceId }) });
  assert.equal(res.status, 200);

  const data = (await res.json()) as {
    sessionId: string;
    capturing: boolean;
    messages: messagesDb.AgentSessionMessageRecord[];
  };
  assert.equal(data.sessionId, sessionAliceId);
  assert.equal(data.capturing, false, "capture is off by default");
  assert.equal(data.messages.length, 2);
  assert.equal(data.messages[0].user, "Fix the bug in auth");
  assert.deepEqual(data.messages[0].tools, ["Edit", "Bash"]);
  assert.equal(data.messages[1].user, "Run the tests now");
  assert.deepEqual(data.messages[1].tools, ["Bash"]);
});

test("GET /v1/me/sessions/[id]/messages returns 404 for another key's session", async () => {
  const req = new Request(`http://localhost:20128/v1/me/sessions/${sessionAliceId}/messages`, {
    headers: { Authorization: `Bearer ${keyBobToken}` },
  });

  const res = await getMessagesRoute(req, { params: Promise.resolve({ id: sessionAliceId }) });
  assert.equal(res.status, 404);
});

test("GET /v1/me/sessions/[id]/messages rejects invalid limit and cursor values", async () => {
  for (const query of ["limit=0", "limit=101", "limit=abc", "cursor=0", "cursor=1.5"]) {
    const req = new Request(
      `http://localhost:20128/v1/me/sessions/${sessionAliceId}/messages?${query}`,
      { headers: { Authorization: `Bearer ${keyAliceToken}` } }
    );
    const res = await getMessagesRoute(req, { params: Promise.resolve({ id: sessionAliceId }) });
    assert.equal(res.status, 400, `${query} should be rejected`);
    const data = (await res.json()) as { error: string };
    assert.equal(data.error, "Invalid query parameters");
  }
});

test("GET /v1/me/sessions/[id]/messages supports limit and cursor pagination", async () => {
  const req = new Request(
    `http://localhost:20128/v1/me/sessions/${sessionAliceId}/messages?limit=1`,
    { headers: { Authorization: `Bearer ${keyAliceToken}` } }
  );

  const res = await getMessagesRoute(req, { params: Promise.resolve({ id: sessionAliceId }) });
  assert.equal(res.status, 200);
  const data = (await res.json()) as {
    messages: messagesDb.AgentSessionMessageRecord[];
    nextCursor: number | null;
  };
  assert.equal(data.messages.length, 1);
  assert.ok(data.nextCursor);

  // Fetch second page
  const req2 = new Request(
    `http://localhost:20128/v1/me/sessions/${sessionAliceId}/messages?limit=1&cursor=${data.nextCursor}`,
    { headers: { Authorization: `Bearer ${keyAliceToken}` } }
  );
  const res2 = await getMessagesRoute(req2, { params: Promise.resolve({ id: sessionAliceId }) });
  const data2 = (await res2.json()) as {
    messages: messagesDb.AgentSessionMessageRecord[];
    nextCursor: number | null;
  };
  assert.equal(data2.messages.length, 1);
  assert.equal(data2.messages[0].user, "Run the tests now");
  assert.equal(data2.nextCursor, null);
});

test("deleteAgentSessionMessagesBefore removes older messages", () => {
  const db = core.getDbInstance();
  const deleted = messagesDb.deleteAgentSessionMessagesBefore(db, "2026-09-25T10:02:00.000Z");
  assert.equal(deleted, 1);

  const remaining = messagesDb.listAgentSessionMessages(db, sessionAliceId);
  assert.equal(remaining.messages.length, 1);
  assert.equal(remaining.messages[0].user, "Run the tests now");
});

test("resetUsageHistory('all') deletes agent session messages and reports the count", async () => {
  const db = core.getDbInstance();
  const before = db.prepare("SELECT COUNT(*) AS c FROM agent_session_messages").get() as {
    c: number;
  };
  assert.ok(before.c > 0);

  const result = await cleanup.resetUsageHistory("all");
  assert.equal(result.deletedAgentSessionMessages, before.c);

  const after = db.prepare("SELECT COUNT(*) AS c FROM agent_session_messages").get() as {
    c: number;
  };
  assert.equal(after.c, 0);
});
