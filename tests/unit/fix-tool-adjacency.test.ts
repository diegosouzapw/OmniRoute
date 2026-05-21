import test from "node:test";
import assert from "node:assert/strict";

const { fixToolPairs, fixToolAdjacency, stripTrailingAssistantOrphanToolUse } =
  await import("../../open-sse/services/contextManager.ts");

// ─── fixToolAdjacency ───────────────────────────────────────────────────────

test("fixToolAdjacency: removes tool_use when next message has no matching tool_result", () => {
  const messages = [
    { role: "user", content: "hello" },
    {
      role: "assistant",
      content: [
        { type: "text", text: "let me check" },
        { type: "tool_use", id: "toolu_abc", name: "search", input: {} },
      ],
    },
    // Next message is user with tool_result for DIFFERENT id
    {
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "toolu_xyz", content: "result for xyz" }],
    },
  ];

  const fixed = fixToolAdjacency(messages);
  // toolu_abc should be removed because next message doesn't have tool_result for it
  const assistantContent = fixed[1].content;
  const toolUseBlocks = assistantContent.filter((b) => b.type === "tool_use");
  assert.equal(toolUseBlocks.length, 0);
  assert.equal(assistantContent.length, 1); // only text remains
});

test("fixToolAdjacency: keeps tool_use when next message has matching tool_result", () => {
  const messages = [
    { role: "user", content: "hello" },
    {
      role: "assistant",
      content: [
        { type: "text", text: "let me check" },
        { type: "tool_use", id: "toolu_abc", name: "search", input: {} },
      ],
    },
    {
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "toolu_abc", content: "found it" }],
    },
  ];

  const fixed = fixToolAdjacency(messages);
  const assistantContent = fixed[1].content;
  const toolUseBlocks = assistantContent.filter((b) => b.type === "tool_use");
  assert.equal(toolUseBlocks.length, 1);
  assert.equal(toolUseBlocks[0].id, "toolu_abc");
});

test("fixToolAdjacency: drops empty assistant message after removing orphan tool_use", () => {
  const messages = [
    { role: "user", content: "hello" },
    {
      role: "assistant",
      content: [{ type: "tool_use", id: "toolu_abc", name: "search", input: {} }],
    },
    // Next message has no tool_result at all
    { role: "user", content: "what's up?" },
  ];

  const fixed = fixToolAdjacency(messages);
  // assistant message should be dropped since it only had orphan tool_use
  assert.equal(fixed.length, 2);
  assert.equal(fixed[0].role, "user");
  assert.equal(fixed[1].role, "user");
});

test("fixToolAdjacency: handles OpenAI format tool role messages", () => {
  const messages = [
    { role: "user", content: "hello" },
    {
      role: "assistant",
      content: [{ type: "tool_use", id: "toolu_abc", name: "search", input: {} }],
    },
    // OpenAI format: role=tool with tool_call_id
    { role: "tool", tool_call_id: "toolu_abc", content: "found it" },
  ];

  const fixed = fixToolAdjacency(messages);
  const assistantContent = fixed[1].content;
  const toolUseBlocks = assistantContent.filter((b) => b.type === "tool_use");
  assert.equal(toolUseBlocks.length, 1); // kept because next message matches
});

test("fixToolAdjacency: reproduces the exact bug - messages.26 orphan", () => {
  // Exact scenario: fixToolPairs keeps tool_use because result ID exists globally,
  // but tool_result is NOT in the immediately next message.
  //
  // setup: assistant(tool_use:abc) → user(text) → user(tool_result:abc)
  // fixToolPairs: keeps tool_use (ID exists in toolResultIds from msg[3])
  // Claude rejects: msg[2] has no tool_result for abc (adjacency violation)
  const messages = [
    { role: "user", content: "do something" },
    {
      role: "assistant",
      content: [
        {
          type: "tool_use",
          id: "tooluse_hX96f1h1ZrkVoLpLI0szxn",
          name: "bash",
          input: { command: "ls" },
        },
      ],
    },
    // Next message is plain user text — no tool_result for the tool_use above
    { role: "user", content: "what's next?" },
    // Later message has the matching tool_result (not adjacent!)
    {
      role: "user",
      content: [
        {
          type: "tool_result",
          tool_use_id: "tooluse_hX96f1h1ZrkVoLpLI0szxn",
          content: "ls output",
        },
      ],
    },
  ];

  // fixToolPairs keeps it (global check: ID exists in toolResultIds from msg[3])
  const pairsFixed = fixToolPairs(messages);
  const pairsAssistant = pairsFixed[1];
  const pairsToolUse = Array.isArray(pairsAssistant.content)
    ? (pairsAssistant.content as any[]).filter((b: any) => b.type === "tool_use")
    : [];
  assert.equal(pairsToolUse.length, 1, "fixToolPairs keeps orphan (global check)");

  // fixToolAdjacency removes it (adjacency check: next msg has no matching tool_result)
  const adjacencyFixed = fixToolAdjacency(pairsFixed);
  const adjacencyAssistant = adjacencyFixed[1];
  const adjacencyToolUse = Array.isArray(adjacencyAssistant.content)
    ? (adjacencyAssistant.content as any[]).filter((b: any) => b.type === "tool_use")
    : [];
  assert.equal(adjacencyToolUse.length, 0, "fixToolAdjacency removes orphan (adjacency check)");
});
