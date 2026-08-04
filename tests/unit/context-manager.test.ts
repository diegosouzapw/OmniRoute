import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-context-manager-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { compressContext, estimateTokens, getTokenLimit } =
  await import("../../open-sse/services/contextManager.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ─── estimateTokens ─────────────────────────────────────────────────────────

test("estimateTokens: estimates from string", () => {
  assert.equal(estimateTokens("hello"), 2); // 5/4 = 2
  assert.ok(estimateTokens("a".repeat(100)) === 25);
});

test("estimateTokens: handles null", () => {
  assert.equal(estimateTokens(null), 0);
  assert.equal(estimateTokens(""), 0);
});

// ─── getTokenLimit ──────────────────────────────────────────────────────────

test("getTokenLimit: detects claude", () => {
  assert.equal(getTokenLimit("claude", "claude-sonnet-4"), 200000);
});

test("getTokenLimit: detects gemini", () => {
  assert.equal(getTokenLimit("gemini", "gemini-2.5-pro"), 1048576);
});

test("getTokenLimit: uses GPT-5.5 Codex model context", () => {
  assert.equal(getTokenLimit("codex", "gpt-5.5"), 400000);
});

test("getTokenLimit: default fallback", () => {
  assert.equal(getTokenLimit("unknown"), 128000);
});

// Regression for #8496: hyperagent Claude-family agents (fable/opus/sonnet) must
// resolve to the 1M context window for every fallback model id, driven solely by
// the registry's `defaultContextLength` (open-sse/config/providers/registry/hyperagent) —
// not by a provider-unscoped model-name substring match, which previously collided
// with unrelated providers serving the same Claude model ids (see
// "getTokenLimit: does not force 1M onto non-hyperagent providers" below).
const HYPERAGENT_FALLBACK_MODEL_IDS = [
  "fable-latest",
  "claude-fable-5",
  "opus-latest",
  "claude-opus-4-8",
  "sonnet-latest",
  "claude-sonnet-5",
];

for (const modelId of HYPERAGENT_FALLBACK_MODEL_IDS) {
  test(`getTokenLimit: hyperagent/${modelId} resolves to 1M context`, () => {
    assert.equal(getTokenLimit("hyperagent", modelId), 1_000_000);
  });

  test(`getTokenLimit: ha (alias)/${modelId} resolves to 1M context`, () => {
    assert.equal(getTokenLimit("ha", modelId), 1_000_000);
  });
}

test("getTokenLimit: does not force 1M onto non-hyperagent providers serving the same model ids", () => {
  // windsurf declares an explicit per-model contextLength of 200000 for this exact id —
  // a provider-unscoped substring match on "claude-opus-4" would have clobbered it to 1M.
  assert.equal(getTokenLimit("windsurf", "claude-opus-4.7-max"), 200000);
  // bluesminds likewise pins its own claude-opus-4-5 entry to 200000.
  assert.equal(getTokenLimit("bluesminds", "claude-opus-4-5"), 200000);
});

// ─── compressContext ────────────────────────────────────────────────────────

test("compressContext: returns unchanged if fits", () => {
  const body = {
    model: "claude-sonnet-4",
    messages: [
      { role: "system", content: "You are helpful." },
      { role: "user", content: "Hello" },
    ],
  };
  const result = compressContext(body);
  assert.equal(result.compressed, false);
});

test("compressContext: default reserve scales down for smaller context windows", () => {
  const body = {
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are helpful." },
      { role: "user", content: "Hello" },
    ],
  };

  const result = compressContext(body, { provider: "openai", maxTokens: 8192 });
  assert.equal(result.compressed, false);
  assert.equal(result.stats.final, result.stats.original);
});

test("compressContext: handles null/empty body", () => {
  assert.equal(compressContext(null).compressed, false);
  assert.equal(compressContext({}).compressed, false);
  assert.equal(compressContext({ messages: null }).compressed, false);
});

test("compressContext: Layer 1 — trims long tool messages", () => {
  const longContent = "x".repeat(10000);
  const body = {
    model: "test",
    messages: [
      { role: "user", content: "run tool" },
      {
        role: "assistant",
        content: null,
        tool_calls: [{ id: "t1", type: "function", function: { name: "test_tool" } }],
      },
      { role: "tool", content: longContent, tool_call_id: "t1" },
      { role: "user", content: "done?" },
    ],
  };
  // Use target limit that allows the truncated tool message (~1000 tokens) to survive
  const result = compressContext(body, { maxTokens: 2000, reserveTokens: 100 });
  assert.ok(result.compressed);
  const toolMsg = (result.body.messages as any).find((m: any) => m.role === "tool");
  assert.ok(toolMsg.content.length < longContent.length);
  assert.ok(toolMsg.content.includes("[truncated]"));
});

test("compressContext: Layer 2 — compresses thinking in old messages", () => {
  const body = {
    model: "test",
    messages: [
      { role: "user", content: "q1" },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "lots of thinking here ".repeat(500) },
          { type: "text", text: "answer1" },
        ],
      },
      { role: "user", content: "q2" },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "more thinking" },
          { type: "text", text: "answer2" },
        ],
      },
    ],
  };
  const result = compressContext(body, { maxTokens: 2000, reserveTokens: 500 });
  // First assistant should have thinking removed
  const firstAssistant = (result.body as any).messages.find((m: any) => m.role === "assistant");
  if (Array.isArray(firstAssistant.content)) {
    const hasThinking = firstAssistant.content.some((b: any) => b.type === "thinking");
    assert.equal(hasThinking, false);
  }
});

test("compressContext: Layer 2 preserves prompt-format thinking tags in string content", () => {
  const body = {
    model: "test",
    messages: [
      { role: "user", content: "q1" },
      {
        role: "assistant",
        content: "<thinking>visible prompt protocol</thinking><content>answer1</content>",
      },
      { role: "user", content: "q2" },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "lots of structured thinking here ".repeat(500) },
          { type: "text", text: "answer2" },
        ],
      },
      { role: "user", content: "q3" },
      { role: "assistant", content: "answer3" },
    ],
  };
  const result = compressContext(body, { maxTokens: 2000, reserveTokens: 500 });
  const firstAssistant = (result.body as any).messages.find(
    (m: any) => m.role === "assistant" && typeof m.content === "string"
  );

  assert.equal(
    firstAssistant.content,
    "<thinking>visible prompt protocol</thinking><content>answer1</content>"
  );
});

test("compressContext: Layer 3 — drops old messages to fit", () => {
  const messages = [
    { role: "system", content: "You are helpful" },
    ...Array.from({ length: 100 }, (_, i) => [
      { role: "user", content: `Message ${i}: ${"content ".repeat(50)}` },
      { role: "assistant", content: `Response ${i}: ${"answer ".repeat(50)}` },
    ]).flat(),
  ];
  const body = { model: "test", messages };
  const result = compressContext(body, { maxTokens: 3000, reserveTokens: 500 });
  assert.ok(result.compressed);
  assert.ok((result as any).body.messages.length < messages.length);
  assert.equal(result.body.messages[0].role, "system");
});

// ─── fixToolPairs (Layer 3 tool pair integrity) ─────────────────────────────

test("Layer 3: removes orphaned tool_result (OpenAI format) when tool_use is dropped", () => {
  const messages = [
    { role: "system", content: "system" },
    ...Array.from({ length: 40 }, (_, i) => [
      { role: "user", content: `User ${i}: ${"x".repeat(200)}` },
      { role: "assistant", content: `Asst ${i}: ${"y".repeat(200)}` },
    ]).flat(),
    {
      role: "assistant",
      content: null,
      tool_calls: [{ id: "call_kept", type: "function", function: { name: "read_file" } }],
    },
    { role: "tool", tool_call_id: "call_kept", content: "file contents" },
    {
      role: "assistant",
      content: null,
      tool_calls: [{ id: "call_dropped", type: "function", function: { name: "search" } }],
    },
    { role: "tool", tool_call_id: "call_dropped", content: "search results" },
    { role: "user", content: "Summarize" },
    { role: "assistant", content: "Here is the summary" },
  ];
  const body = { model: "test", messages };
  const result = compressContext(body, { maxTokens: 800, reserveTokens: 200 });
  assert.ok(result.compressed);

  const toolCallIds = new Set();
  for (const msg of result.body.messages) {
    if (msg.role === "assistant" && Array.isArray(msg.tool_calls)) {
      for (const tc of msg.tool_calls) toolCallIds.add(tc.id);
    }
  }
  for (const msg of result.body.messages) {
    if (msg.role === "tool" && msg.tool_call_id) {
      assert.ok(
        toolCallIds.has(msg.tool_call_id),
        `tool_result "${msg.tool_call_id}" has no matching tool_use`
      );
    }
  }
});

test("Layer 3: removes orphaned tool_result (Claude format) when tool_use is dropped", () => {
  const messages = [
    { role: "system", content: "system" },
    ...Array.from({ length: 40 }, (_, i) => [
      { role: "user", content: `User ${i}: ${"x".repeat(200)}` },
      { role: "assistant", content: `Asst ${i}: ${"y".repeat(200)}` },
    ]).flat(),
    {
      role: "assistant",
      content: [{ type: "tool_use", id: "toolu_kept", name: "read", input: {} }],
    },
    {
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "toolu_kept", content: "file" }],
    },
    {
      role: "assistant",
      content: [{ type: "tool_use", id: "toolu_orphaned", name: "search", input: {} }],
    },
    {
      role: "user",
      content: [{ type: "tool_result", tool_use_id: "toolu_orphaned", content: "results" }],
    },
    { role: "user", content: "Final question" },
  ];
  const body = { model: "test", messages };
  const result = compressContext(body, { maxTokens: 800, reserveTokens: 200 });
  assert.ok(result.compressed);

  const toolUseIds = new Set();
  for (const msg of result.body.messages) {
    if (msg.role === "assistant" && Array.isArray(msg.content)) {
      for (const block of msg.content) {
        if (block.type === "tool_use" && block.id) toolUseIds.add(block.id);
      }
    }
  }
  for (const msg of result.body.messages) {
    if (msg.role === "user" && Array.isArray(msg.content)) {
      for (const block of msg.content) {
        if (block.type === "tool_result" && block.tool_use_id) {
          assert.ok(
            toolUseIds.has(block.tool_use_id),
            `Claude tool_result "${block.tool_use_id}" has no matching tool_use`
          );
        }
      }
    }
  }
});

test("Layer 3: preserves intact tool_use/tool_result pairs after compression", () => {
  const messages = [
    { role: "system", content: "system" },
    { role: "user", content: "Read file" },
    {
      role: "assistant",
      content: null,
      tool_calls: [{ id: "call_1", type: "function", function: { name: "read" } }],
    },
    { role: "tool", tool_call_id: "call_1", content: "file data" },
    { role: "user", content: "What does it say?" },
    { role: "assistant", content: "It says hello" },
  ];
  const body = { model: "test", messages };
  const result = compressContext(body, { maxTokens: 50000, reserveTokens: 10000 });
  const toolMsg = (result.body.messages as any).find(
    (m: any) => m.role === "tool" && m.tool_call_id === "call_1"
  );
  assert.ok(toolMsg, "tool_result for call_1 should survive compression");
});
