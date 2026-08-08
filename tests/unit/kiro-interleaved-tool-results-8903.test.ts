import test from "node:test";
import assert from "node:assert/strict";

const { buildKiroPayload } = await import("../../open-sse/translator/request/openai-to-kiro.ts");

const CREDENTIALS = {
  accessToken: "test-token",
  profileArn: "arn:aws:codewhisperer:us-east-1:000000000000:profile/TEST",
  region: "us-east-1",
};

const PARALLEL_TOOL_CALLS = {
  role: "assistant",
  content: null,
  tool_calls: [
    { id: "call_A", type: "function", function: { name: "list_files", arguments: "{}" } },
    { id: "call_B", type: "function", function: { name: "read_file", arguments: "{}" } },
  ],
};

function build(messages) {
  return buildKiroPayload(
    "claude-sonnet-4.5",
    { model: "claude-sonnet-4.5", messages },
    false,
    CREDENTIALS
  );
}

/**
 * Collect every toolUseId advertised by assistant turns and every toolUseId
 * answered by a toolResult, across history plus currentMessage.
 *
 * Bedrock rejects a transcript where an assistant turn advertises toolUses
 * that are never answered ("Expected toolResult blocks"), so these two sets
 * must match.
 */
function collectToolIds(payload) {
  const history = payload?.conversationState?.history ?? [];
  const advertised = [];
  const answered = [];

  for (const entry of history) {
    const toolUses = entry?.assistantResponseMessage?.toolUses;
    if (Array.isArray(toolUses)) {
      for (const use of toolUses) advertised.push(use.toolUseId ?? use.id);
    }
    const toolResults = entry?.userInputMessage?.userInputMessageContext?.toolResults;
    if (Array.isArray(toolResults)) {
      for (const result of toolResults) answered.push(result.toolUseId);
    }
  }

  const currentResults =
    payload?.conversationState?.currentMessage?.userInputMessage?.userInputMessageContext
      ?.toolResults;
  if (Array.isArray(currentResults)) {
    for (const result of currentResults) answered.push(result.toolUseId);
  }

  return { advertised, answered };
}

/**
 * Flatten history + currentMessage into an ordered, easy-to-assert turn list.
 *
 * Tool-id assertions alone are not enough: a translator can keep every
 * toolUseId paired and still silently delete assistant prose or reorder turns.
 * These tests assert content and order too.
 */
function collectTurns(payload) {
  const history = payload?.conversationState?.history ?? [];
  const turns = history.map((entry) => {
    if (entry?.userInputMessage) {
      return {
        role: "user",
        content: String(entry.userInputMessage.content ?? ""),
        toolResults: (entry.userInputMessage.userInputMessageContext?.toolResults ?? []).map(
          (r) => r.toolUseId
        ),
      };
    }
    return {
      role: "assistant",
      content: String(entry?.assistantResponseMessage?.content ?? ""),
      toolUses: (entry?.assistantResponseMessage?.toolUses ?? []).map((u) => u.toolUseId ?? u.id),
    };
  });

  const current = payload?.conversationState?.currentMessage?.userInputMessage;
  if (current) {
    turns.push({
      role: "user",
      current: true,
      content: String(current.content ?? ""),
      toolResults: (current.userInputMessageContext?.toolResults ?? []).map((r) => r.toolUseId),
    });
  }

  return turns;
}

function assistantContents(turns) {
  return turns.filter((t) => t.role === "assistant").map((t) => t.content);
}

// --- Characterization: shapes that already work must keep working ----------

test("kiro #8903: consecutive tool messages answer every parallel tool call", () => {
  const payload = build([
    { role: "user", content: "list files then read one" },
    PARALLEL_TOOL_CALLS,
    { role: "tool", tool_call_id: "call_A", content: "a.txt\nb.txt" },
    { role: "tool", tool_call_id: "call_B", content: "hello" },
    { role: "user", content: "thanks" },
  ]);

  const { advertised, answered } = collectToolIds(payload);
  assert.deepEqual(advertised, ["call_A", "call_B"]);
  assert.deepEqual(answered.sort(), ["call_A", "call_B"]);
});

test("kiro #8903: three parallel tool calls are all answered", () => {
  const payload = build([
    { role: "user", content: "go" },
    {
      role: "assistant",
      content: null,
      tool_calls: [
        { id: "c1", type: "function", function: { name: "f1", arguments: "{}" } },
        { id: "c2", type: "function", function: { name: "f2", arguments: "{}" } },
        { id: "c3", type: "function", function: { name: "f3", arguments: "{}" } },
      ],
    },
    { role: "tool", tool_call_id: "c1", content: "r1" },
    { role: "tool", tool_call_id: "c2", content: "r2" },
    { role: "tool", tool_call_id: "c3", content: "r3" },
    { role: "user", content: "next" },
  ]);

  const { advertised, answered } = collectToolIds(payload);
  assert.deepEqual(advertised.sort(), ["c1", "c2", "c3"]);
  assert.deepEqual(answered.sort(), ["c1", "c2", "c3"]);
});

test("kiro #8903: two sequential rounds of parallel tool calls are all answered", () => {
  const payload = build([
    { role: "user", content: "go" },
    PARALLEL_TOOL_CALLS,
    { role: "tool", tool_call_id: "call_A", content: "r1" },
    { role: "tool", tool_call_id: "call_B", content: "r2" },
    {
      role: "assistant",
      content: null,
      tool_calls: [{ id: "call_C", type: "function", function: { name: "grep", arguments: "{}" } }],
    },
    { role: "tool", tool_call_id: "call_C", content: "r3" },
    { role: "user", content: "done" },
  ]);

  const { advertised, answered } = collectToolIds(payload);
  assert.deepEqual(advertised.sort(), ["call_A", "call_B", "call_C"]);
  assert.deepEqual(answered.sort(), ["call_A", "call_B", "call_C"]);
});

test("kiro #8903: transcript ending on tool results still answers every tool call", () => {
  const payload = build([
    { role: "user", content: "go" },
    PARALLEL_TOOL_CALLS,
    { role: "tool", tool_call_id: "call_A", content: "r1" },
    { role: "tool", tool_call_id: "call_B", content: "r2" },
  ]);

  const { advertised, answered } = collectToolIds(payload);
  assert.deepEqual(advertised, ["call_A", "call_B"]);
  assert.deepEqual(answered.sort(), ["call_A", "call_B"]);
});

test("kiro #8903: structured array tool content is answered for every tool call", () => {
  const payload = build([
    { role: "user", content: "go" },
    PARALLEL_TOOL_CALLS,
    { role: "tool", tool_call_id: "call_A", content: [{ type: "text", text: "r1" }] },
    { role: "tool", tool_call_id: "call_B", content: [{ type: "text", text: "r2" }] },
    { role: "user", content: "done" },
  ]);

  const { advertised, answered } = collectToolIds(payload);
  assert.deepEqual(advertised, ["call_A", "call_B"]);
  assert.deepEqual(answered.sort(), ["call_A", "call_B"]);
});

// --- RED: interleaved assistant text drops the trailing tool result --------

test("kiro #8903: assistant text between tool results does not drop a tool result", () => {
  const payload = build([
    { role: "user", content: "list files then read one" },
    PARALLEL_TOOL_CALLS,
    { role: "tool", tool_call_id: "call_A", content: "a.txt\nb.txt" },
    { role: "assistant", content: "Let me check that file." },
    { role: "tool", tool_call_id: "call_B", content: "hello" },
    { role: "user", content: "thanks" },
  ]);

  const { advertised, answered } = collectToolIds(payload);
  assert.deepEqual(advertised, ["call_A", "call_B"]);
  assert.deepEqual(
    answered.sort(),
    ["call_A", "call_B"],
    "every advertised toolUse must have a matching toolResult; Bedrock rejects the transcript otherwise"
  );
});

// --- Content + order: grouping must not be paid for with lost assistant text -

test("kiro #8903 probe A: a final text-only assistant reply survives a tool result", () => {
  const payload = build([
    { role: "user", content: "what is the weather" },
    {
      role: "assistant",
      content: null,
      tool_calls: [{ id: "call_A", type: "function", function: { name: "wx", arguments: "{}" } }],
    },
    { role: "tool", tool_call_id: "call_A", content: "sunny" },
    { role: "assistant", content: "It is sunny. THIS_TEXT_MUST_SURVIVE" },
  ]);

  const turns = collectTurns(payload);
  assert.ok(
    assistantContents(turns).some((c) => c.includes("THIS_TEXT_MUST_SURVIVE")),
    `the final assistant reply must not be dropped; got ${JSON.stringify(turns)}`
  );

  // Order: the reply belongs after the turn carrying call_A's result.
  const resultIdx = turns.findIndex((t) => (t.toolResults ?? []).includes("call_A"));
  const replyIdx = turns.findIndex((t) => t.content.includes("THIS_TEXT_MUST_SURVIVE"));
  assert.ok(resultIdx >= 0, "call_A's toolResult must be present");
  assert.ok(replyIdx > resultIdx, "the assistant reply must come after the tool result turn");
});

test("kiro #8903 probe C: a mid-conversation assistant answer survives a later user turn", () => {
  const payload = build([
    { role: "user", content: "q1" },
    {
      role: "assistant",
      content: null,
      tool_calls: [{ id: "call_A", type: "function", function: { name: "a", arguments: "{}" } }],
    },
    { role: "tool", tool_call_id: "call_A", content: "res A" },
    { role: "assistant", content: "ANSWER_TURN_1" },
    { role: "user", content: "q2" },
  ]);

  const turns = collectTurns(payload);
  assert.ok(
    assistantContents(turns).some((c) => c.includes("ANSWER_TURN_1")),
    `the previous turn's assistant answer must not be erased; got ${JSON.stringify(turns)}`
  );

  const answerIdx = turns.findIndex((t) => t.content.includes("ANSWER_TURN_1"));
  const q2Idx = turns.findIndex((t) => t.current);
  assert.ok(q2Idx > answerIdx, "the new user question must come after the previous answer");
  assert.ok(
    turns[q2Idx].content.includes("q2"),
    "the new user question must be the current message"
  );
});

test("kiro #8903 probe B: deferred assistant text survives AND the tool batch stays grouped", () => {
  const payload = build([
    { role: "user", content: "check two things" },
    PARALLEL_TOOL_CALLS,
    { role: "tool", tool_call_id: "call_A", content: "res A" },
    { role: "assistant", content: "DEFERRED_TEXT_HERE" },
    { role: "tool", tool_call_id: "call_B", content: "res B" },
    { role: "user", content: "thanks" },
  ]);

  const turns = collectTurns(payload);

  // 1. grouping: both results answered from a single turn
  const batchTurn = turns.find((t) => (t.toolResults ?? []).length > 0);
  assert.ok(batchTurn, "a turn carrying toolResults must exist");
  assert.deepEqual(
    [...batchTurn.toolResults].sort(),
    ["call_A", "call_B"],
    "call_A and call_B must stay in one toolResults batch"
  );

  // 2. no data loss: the interleaved text is still in the transcript
  assert.ok(
    assistantContents(turns).some((c) => c.includes("DEFERRED_TEXT_HERE")),
    `interleaved assistant text must not be dropped; got ${JSON.stringify(turns)}`
  );

  // 3. order: text after the batch, final user question last
  const batchIdx = turns.indexOf(batchTurn);
  const textIdx = turns.findIndex((t) => t.content.includes("DEFERRED_TEXT_HERE"));
  const currentIdx = turns.findIndex((t) => t.current);
  assert.ok(textIdx > batchIdx, "the deferred text must be emitted after the tool batch");
  assert.ok(currentIdx > textIdx, "the final user turn must come last");
  assert.ok(turns[currentIdx].content.includes("thanks"));

  // 4. the tool results must not have leaked into user prose
  assert.ok(
    !turns[currentIdx].content.includes("res B"),
    "call_B's result must be a toolResult, not stuffed into user text"
  );
});

test("kiro #8903: assistant text is preserved on an ordinary non-tool transcript", () => {
  const payload = build([
    { role: "user", content: "hi" },
    { role: "assistant", content: "PLAIN_REPLY" },
    { role: "user", content: "again" },
  ]);

  const turns = collectTurns(payload);
  assert.deepEqual(assistantContents(turns), ["PLAIN_REPLY"]);
});
