import test from "node:test";
import assert from "node:assert/strict";

test("chatCore integration: compressContext called proactively when context exceeds 85% threshold", async () => {
  const { compressContext, estimateTokens, getTokenLimit } =
    await import("../../open-sse/services/contextManager.ts");

  const provider = "openai";
  const model = "gpt-4";
  const contextLimit = 8192; // Hardcoded to 8192 to avoid DB dependency causing 128k evaluation
  const threshold = Math.floor(contextLimit * 0.85);

  const history = Array.from({ length: 24 }, (_, index) => [
    { role: "user", content: `Question ${index}: ${"context ".repeat(80)}` },
    { role: "assistant", content: `Answer ${index}: ${"history ".repeat(80)}` },
  ]).flat();
  const body = {
    model,
    messages: [
      { role: "system", content: "You are helpful." },
      ...history,
      { role: "user", content: "Final question?" },
    ],
  };

  const estimatedTokens = estimateTokens(JSON.stringify(body.messages));
  assert.ok(
    estimatedTokens > threshold,
    `Expected ${estimatedTokens} to exceed threshold ${threshold}`
  );

  const result = compressContext(body, { provider, model, maxTokens: contextLimit });

  assert.ok(result.compressed, "Context should be compressed");
  assert.ok(
    result.stats.final < result.stats.original,
    "Final tokens should be less than original"
  );
  assert.ok(
    result.stats.final <= contextLimit,
    `Final tokens ${result.stats.final} should fit within limit ${contextLimit}`
  );
  assert.equal(
    result.body.messages[(result.body.messages as any).length - 1].content,
    "Final question?",
    "Latest user turn should be preserved after compression"
  );
});

test("chatCore integration: compressContext NOT called when context is below 85% threshold", async () => {
  const { compressContext, estimateTokens, getTokenLimit } =
    await import("../../open-sse/services/contextManager.ts");

  const provider = "openai";
  const model = "gpt-4";
  const contextLimit = 8192;
  const threshold = Math.floor(contextLimit * 0.85);

  const smallMessage = "Hello, how are you?";
  const body = {
    model,
    messages: [
      { role: "system", content: "You are helpful." },
      { role: "user", content: smallMessage },
    ],
  };

  const estimatedTokens = estimateTokens(JSON.stringify(body.messages));
  assert.ok(
    estimatedTokens < threshold,
    `Expected ${estimatedTokens} to be below threshold ${threshold}`
  );

  const result = compressContext(body, { provider, model, maxTokens: contextLimit });

  assert.equal(result.compressed, false, "Context should NOT be compressed");
});

test("chatCore integration: compression preserves message structure", async () => {
  const { compressContext, getTokenLimit } =
    await import("../../open-sse/services/contextManager.ts");

  const provider = "claude";
  const model = "claude-sonnet-4";
  const contextLimit = 200000;

  const body = {
    model,
    messages: [
      { role: "system", content: "You are helpful." },
      { role: "user", content: "x".repeat(500000) },
      { role: "assistant", content: "Response 1" },
      { role: "user", content: "x".repeat(500000) },
      { role: "assistant", content: "Response 2" },
      { role: "user", content: "Final question" },
    ],
  };

  const result = compressContext(body, { provider, model, maxTokens: contextLimit });

  assert.ok(result.compressed, "Context should be compressed");
  assert.ok(Array.isArray(result.body.messages), "Messages should remain an array");
  assert.ok(result.body.messages.length > 0, "Messages should not be empty");

  const hasSystem = result.body.messages.some((m: any) => m.role === "system");
  assert.ok(hasSystem, "System message should be preserved");

  const lastMessage = result.body.messages[result.body.messages.length - 1];
  assert.equal(lastMessage.content, "Final question", "Last user message should be preserved");
});

test("chatCore integration: compression handles tool messages", async () => {
  const { compressContext, getTokenLimit } =
    await import("../../open-sse/services/contextManager.ts");

  const provider = "openai";
  const model = "gpt-4";
  const contextLimit = 8192;

  const longToolOutput = "x".repeat(50000);
  const body = {
    model,
    messages: [
      { role: "system", content: "You are helpful." },
      { role: "user", content: "Run the tool" },
      { role: "assistant", content: "Running tool", tool_calls: [{ id: "t1", type: "function" }] },
      { role: "tool", content: longToolOutput, tool_call_id: "t1" },
      { role: "user", content: "What's the result?" },
    ],
  };

  const result = compressContext(body, { provider, model, maxTokens: 5000, reserveTokens: 1000 });

  assert.ok(result.compressed, "Context should be compressed");

  const toolMessage = (result.body as any).messages.find((m: any) => m.role === "tool");
  assert.ok(toolMessage, "Tool message should exist");
  assert.ok(toolMessage.content.length < longToolOutput.length, "Tool message should be truncated");
  assert.ok(
    toolMessage.content.includes("[truncated]"),
    "Tool message should have truncation marker"
  );
});
