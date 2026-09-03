import { test } from "node:test";
import assert from "node:assert/strict";
import { computeRequestHash, deduplicate, clearInflight } from "../../../open-sse/services/requestDedup.ts";

// Regression tests for #10249: the dedup hash used to read only `body.messages`,
// so translated (target-format) bodies that carry the prompt under a different
// key (`contents` for Gemini, `input` for the Responses API) always hashed the
// prompt as `null`. Concurrent requests with different prompts then collided on
// the same dedup hash, joined the same in-flight promise, and the second caller
// silently received the first caller's response.

test("Gemini-format translated bodies with different prompts must NOT collide on dedup hash", async () => {
  clearInflight();
  const bodyA = {
    contents: [{ role: "user", parts: [{ text: "Summarize the Q3 financial report attached." }] }],
    temperature: 0,
  };
  const bodyB = {
    contents: [{ role: "user", parts: [{ text: "Extract every invoice number from the attached PDF." }] }],
    temperature: 0,
  };
  const hashA = computeRequestHash({ ...bodyA, model: "gemini/gemini-2.5-flash", stream: false });
  const hashB = computeRequestHash({ ...bodyB, model: "gemini/gemini-2.5-flash", stream: false });
  assert.notEqual(hashA, hashB, "Different prompts must have different dedup hashes");

  const [resA, resB] = await Promise.all([
    deduplicate(hashA, async () => "RESPONSE_A"),
    deduplicate(hashB, async () => "RESPONSE_B"),
  ]);
  assert.equal(resA.result, "RESPONSE_A");
  assert.equal(resB.result, "RESPONSE_B");
  assert.equal(resB.wasDeduplicated, false);
});

test("Responses-API input-format translated bodies with different prompts must NOT collide", async () => {
  clearInflight();
  const bodyA = {
    input: [{ role: "user", content: [{ type: "input_text", text: "What is the capital of France?" }] }],
    temperature: 0,
  };
  const bodyB = {
    input: [{ role: "user", content: [{ type: "input_text", text: "Explain quantum entanglement." }] }],
    temperature: 0,
  };
  const hashA = computeRequestHash({ ...bodyA, model: "openai/gpt-4.1", stream: false });
  const hashB = computeRequestHash({ ...bodyB, model: "openai/gpt-4.1", stream: false });
  assert.notEqual(hashA, hashB, "Different prompts must have different dedup hashes");

  const [resA, resB] = await Promise.all([
    deduplicate(hashA, async () => "RESPONSE_A"),
    deduplicate(hashB, async () => "RESPONSE_B"),
  ]);
  assert.equal(resA.result, "RESPONSE_A");
  assert.equal(resB.result, "RESPONSE_B");
  assert.equal(resB.wasDeduplicated, false);
});

test("Sanity: OpenAI-format bodies with different prompts DO get distinct hashes (unchanged behavior)", () => {
  const bodyA = { messages: [{ role: "user", content: "Hello there" }], temperature: 0 };
  const bodyB = { messages: [{ role: "user", content: "Goodbye now" }], temperature: 0 };
  const hashA = computeRequestHash({ ...bodyA, model: "openai/gpt-4.1", stream: false });
  const hashB = computeRequestHash({ ...bodyB, model: "openai/gpt-4.1", stream: false });
  assert.notEqual(hashA, hashB);
});

// Regression tests for #10438: the flat `messages ?? contents ?? input`
// fallback chain from #10249 still missed the NESTED prompt shapes that
// `openai-to-gemini.ts::wrapInCloudCodeEnvelope` (Antigravity) and
// `openai-to-kiro.ts::buildKiroPayload` (Kiro) actually produce, and never
// looked at the system/instruction fields (`system` for Claude, `instructions`
// for the Responses API, `systemInstruction` for Gemini) at all — two
// requests with the same user message but a different system prompt hashed
// identically.

test("Antigravity Cloud Code envelope bodies with different prompts must NOT collide on dedup hash", async () => {
  clearInflight();
  const buildEnvelope = (text: string) => ({
    project: "proj-123",
    requestId: "req-abc",
    request: {
      sessionId: "sess-1",
      contents: [{ role: "user", parts: [{ text }] }],
      systemInstruction: { role: "system", parts: [{ text: "You are Antigravity." }] },
      generationConfig: { maxOutputTokens: 8192 },
    },
    model: "gemini-3-pro",
    userAgent: "antigravity/1.0",
    requestType: "agent",
  });
  const bodyA = buildEnvelope("Summarize the Q3 financial report attached.");
  const bodyB = buildEnvelope("Extract every invoice number from the attached PDF.");
  const hashA = computeRequestHash({ ...bodyA, model: "antigravity/gemini-3-pro", stream: false });
  const hashB = computeRequestHash({ ...bodyB, model: "antigravity/gemini-3-pro", stream: false });
  assert.notEqual(hashA, hashB, "Different prompts must have different dedup hashes");

  const [resA, resB] = await Promise.all([
    deduplicate(hashA, async () => "RESPONSE_A"),
    deduplicate(hashB, async () => "RESPONSE_B"),
  ]);
  assert.equal(resA.result, "RESPONSE_A");
  assert.equal(resB.result, "RESPONSE_B");
  assert.equal(resB.wasDeduplicated, false);
});

test("Kiro conversationState bodies with different prompts must NOT collide on dedup hash", async () => {
  clearInflight();
  const buildPayload = (content: string) => ({
    conversationState: {
      chatTriggerType: "MANUAL",
      conversationId: "conv-1",
      currentMessage: {
        userInputMessage: {
          content,
          modelId: "kiro-claude-sonnet",
          origin: "AI_EDITOR",
        },
      },
      history: [],
    },
  });
  const bodyA = buildPayload("[Context: Current time is 2026-08-17]\n\nWhat is the capital of France?");
  const bodyB = buildPayload("[Context: Current time is 2026-08-17]\n\nExplain quantum entanglement.");
  const hashA = computeRequestHash({ ...bodyA, model: "kiro/claude-sonnet-4.5", stream: false });
  const hashB = computeRequestHash({ ...bodyB, model: "kiro/claude-sonnet-4.5", stream: false });
  assert.notEqual(hashA, hashB, "Different prompts must have different dedup hashes");

  const [resA, resB] = await Promise.all([
    deduplicate(hashA, async () => "RESPONSE_A"),
    deduplicate(hashB, async () => "RESPONSE_B"),
  ]);
  assert.equal(resA.result, "RESPONSE_A");
  assert.equal(resB.result, "RESPONSE_B");
  assert.equal(resB.wasDeduplicated, false);
});

test("Claude-translated bodies with the same messages but different `system` prompts must NOT collide", () => {
  const bodyA = {
    messages: [{ role: "user", content: [{ type: "text", text: "Hello" }] }],
    system: [{ type: "text", text: "You are a pirate. Speak like one." }],
    temperature: 0,
  };
  const bodyB = {
    messages: [{ role: "user", content: [{ type: "text", text: "Hello" }] }],
    system: [{ type: "text", text: "You are a formal legal assistant." }],
    temperature: 0,
  };
  const hashA = computeRequestHash({ ...bodyA, model: "anthropic/claude-sonnet-4.5", stream: false });
  const hashB = computeRequestHash({ ...bodyB, model: "anthropic/claude-sonnet-4.5", stream: false });
  assert.notEqual(hashA, hashB, "Same messages with a different system prompt must hash differently");
});

test("Responses-API-translated bodies with the same input but different `instructions` must NOT collide", () => {
  const bodyA = {
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "Hello" }] }],
    instructions: "You are a pirate. Speak like one.",
  };
  const bodyB = {
    input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "Hello" }] }],
    instructions: "You are a formal legal assistant.",
  };
  const hashA = computeRequestHash({ ...bodyA, model: "openai/gpt-5", stream: false });
  const hashB = computeRequestHash({ ...bodyB, model: "openai/gpt-5", stream: false });
  assert.notEqual(hashA, hashB, "Same input with different instructions must hash differently");
});

test("Gemini-translated bodies with the same contents but different `systemInstruction` must NOT collide", () => {
  const bodyA = {
    contents: [{ role: "user", parts: [{ text: "Hello" }] }],
    systemInstruction: { role: "system", parts: [{ text: "You are a pirate. Speak like one." }] },
    temperature: 0,
  };
  const bodyB = {
    contents: [{ role: "user", parts: [{ text: "Hello" }] }],
    systemInstruction: { role: "system", parts: [{ text: "You are a formal legal assistant." }] },
    temperature: 0,
  };
  const hashA = computeRequestHash({ ...bodyA, model: "gemini/gemini-2.5-flash", stream: false });
  const hashB = computeRequestHash({ ...bodyB, model: "gemini/gemini-2.5-flash", stream: false });
  assert.notEqual(hashA, hashB, "Same contents with different systemInstruction must hash differently");
});

test("Genuinely identical requests still hash identically and get deduplicated (perf feature preserved)", async () => {
  clearInflight();
  const body = {
    contents: [{ role: "user", parts: [{ text: "Same prompt text every time" }] }],
    temperature: 0,
  };
  const hash1 = computeRequestHash({ ...body, model: "gemini/gemini-2.5-flash", stream: false });
  const hash2 = computeRequestHash({ ...body, model: "gemini/gemini-2.5-flash", stream: false });
  assert.equal(hash1, hash2, "Identical bodies must still produce the same hash");

  let callCount = 0;
  const slowFn = async () => {
    callCount += 1;
    await new Promise((resolve) => setTimeout(resolve, 20));
    return "SHARED_RESPONSE";
  };

  const [resA, resB] = await Promise.all([
    deduplicate(hash1, slowFn),
    deduplicate(hash2, slowFn),
  ]);
  assert.equal(resA.result, "SHARED_RESPONSE");
  assert.equal(resB.result, "SHARED_RESPONSE");
  assert.equal(callCount, 1, "Identical concurrent requests must share a single upstream call");
  assert.equal(resA.wasDeduplicated === true || resB.wasDeduplicated === true, true);
});
