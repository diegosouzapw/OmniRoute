// TDD regression guard: semantic cache read-time vs write-time signature must match.
// Without bodyForCacheWrite, the body variable is mutated between the cache read
// (Phase 9.1, chatCore.ts:1055) and the cache write (Phase 9.1 non-streaming:4540 /
// Phase 9.2 streaming:4896) by sanitizeChatRequestBody() and injectMemoryAndSkills().
// The digest includes messages, so mutations produce a different key → 0% hit rate.
import test from "node:test";
import assert from "node:assert/strict";

const { generateSignature } = await import("../../../src/lib/semanticCache.ts");

const BASE_BODY = {
  model: "gpt-4o",
  messages: [{ role: "user", content: "What is the capital of France?" }],
  temperature: 0,
  top_p: 1,
};

// Mutations that handleChatCore applies between cache read and cache write.
function simulateSanitizeChatRequestBody(body: Record<string, unknown>): Record<string, unknown> {
  return { ...body, _sanitized: true };
}

function simulateInjectMemoryAndSkills(body: Record<string, unknown>): Record<string, unknown> {
  return {
    ...body,
    messages: [
      { role: "system", content: "[Memory: user likes programming]" },
      ...(body.messages as Array<unknown>),
    ],
  };
}

test("cache signature must be identical before and after body mutations", async () => {
  // Compute signature at read-time (original body, line 1055).
  const readSignature = await generateSignature(
    BASE_BODY.model,
    BASE_BODY.messages,
    BASE_BODY.temperature,
    BASE_BODY.top_p
  );

  // Simulate the mutations that happen between cache read and cache write.
  let mutatedBody = simulateSanitizeChatRequestBody(BASE_BODY);
  mutatedBody = simulateInjectMemoryAndSkills(mutatedBody);

  // Compute signature at write-time using the mutated body (the bug).
  const writeSignatureMutated = await generateSignature(
    mutatedBody.model,
    mutatedBody.messages,
    mutatedBody.temperature,
    mutatedBody.top_p
  );

  // Compute signature at write-time using the preserved snapshot (the fix).
  const writeSignaturePreserved = await generateSignature(
    BASE_BODY.model,
    BASE_BODY.messages,
    BASE_BODY.temperature,
    BASE_BODY.top_p
  );

  // The mutated signature MUST differ — this is the bug.
  assert.notStrictEqual(
    readSignature,
    writeSignatureMutated,
    "BUG: mutated body produces different signature — cache has 0% hit rate"
  );

  // The preserved snapshot MUST match — this is the fix.
  assert.strictEqual(
    readSignature,
    writeSignaturePreserved,
    "FIX: preserved snapshot must produce the same signature as read-time"
  );
});

test("cache signature with memory injection changes messages", async () => {
  const bodyWithMemory = {
    ...BASE_BODY,
    messages: [
      { role: "system", content: "[Memory: context from previous conversation]" },
      ...BASE_BODY.messages,
    ],
  };

  const sigOriginal = await generateSignature(
    BASE_BODY.model,
    BASE_BODY.messages,
    BASE_BODY.temperature,
    BASE_BODY.top_p
  );
  const sigWithMemory = await generateSignature(
    bodyWithMemory.model,
    bodyWithMemory.messages,
    bodyWithMemory.temperature,
    bodyWithMemory.top_p
  );

  assert.notStrictEqual(sigOriginal, sigWithMemory);
});
