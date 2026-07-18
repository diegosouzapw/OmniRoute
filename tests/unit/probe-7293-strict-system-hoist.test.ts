import test from "node:test";
import assert from "node:assert/strict";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

function buildRepro(messageCount: number) {
  const messages: Array<{ role: string; content: string }> = [
    { role: "user", content: "hello" },
  ];
  for (let i = 1; i < messageCount - 1; i++) {
    messages.push({ role: i % 2 === 1 ? "assistant" : "user", content: `turn ${i}` });
  }
  // Client-injected system message landing well past index 0.
  messages.splice(10, 0, {
    role: "system",
    content: "CLIENT INJECTED: remember to answer in JSON",
  });
  while (messages.length < messageCount) messages.push({ role: "user", content: "filler" });
  return messages.slice(0, messageCount);
}

test("#7293: client-injected system message at index>0 is hoisted to index 0 for a strict provider (mimo) via translateRequest", () => {
  const messages = buildRepro(70);
  const body = { model: "mimo-v2.5", messages };

  const result = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI, // same-format passthrough — exactly mimo-v2.5's path
    "mimo-v2.5",
    body,
    false,
    null,
    "xiaomi-mimo" // provider id consulted by systemMessageMustBeFirst()
  );

  const outMessages = result.messages as Array<{ role: string; content: string }>;
  const systemIndices = outMessages
    .map((m, i) => (m.role === "system" ? i : -1))
    .filter((i) => i >= 0);

  assert.deepEqual(systemIndices, [0]);
  assert.match(outMessages[0].content, /CLIENT INJECTED: remember to answer in JSON/);
});

test("#7293: multiple offending system messages are folded into the leading system message, in order", () => {
  const messages = [
    { role: "user", content: "hi" },
    { role: "assistant", content: "hello" },
    { role: "system", content: "first injected" },
    { role: "user", content: "more" },
    { role: "system", content: "second injected" },
  ];
  const body = { model: "mimo-v2.5", messages };

  const result = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI,
    "mimo-v2.5",
    body,
    false,
    null,
    "xiaomi-mimo"
  );

  const outMessages = result.messages as Array<{ role: string; content: string }>;
  const systemIndices = outMessages
    .map((m, i) => (m.role === "system" ? i : -1))
    .filter((i) => i >= 0);

  assert.deepEqual(systemIndices, [0]);
  assert.equal(outMessages[0].content, "first injected\nsecond injected");
  // Non-system ordering preserved
  assert.deepEqual(
    outMessages.slice(1).map((m) => m.content),
    ["hi", "hello", "more"]
  );
});

test("#7293: existing leading system message is preserved and merges client-injected ones after it", () => {
  const messages = [
    { role: "system", content: "leading prompt" },
    { role: "user", content: "hi" },
    { role: "system", content: "mid-array injected" },
  ];
  const body = { model: "mimo-v2.5", messages };

  const result = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI,
    "mimo-v2.5",
    body,
    false,
    null,
    "xiaomi-mimo"
  );

  const outMessages = result.messages as Array<{ role: string; content: string }>;
  assert.equal(outMessages[0].role, "system");
  assert.equal(outMessages[0].content, "leading prompt\nmid-array injected");
  assert.equal(outMessages.length, 2);
});

test("#7293: non-strict provider is left untouched (no hoist regression)", () => {
  const messages = [
    { role: "user", content: "hi" },
    { role: "assistant", content: "hello" },
    { role: "system", content: "mid-array system, tolerated by this provider" },
  ];
  const body = { model: "gpt-5-mini", messages: JSON.parse(JSON.stringify(messages)) };

  const result = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI,
    "gpt-5-mini",
    body,
    false,
    null,
    null // no strict provider
  );

  const outMessages = result.messages as Array<{ role: string; content: string }>;
  assert.deepEqual(outMessages, messages);
});

test("#7293: already-compliant strict-provider request is a no-op (prompt-cache prefix stability)", () => {
  const messages = [
    { role: "system", content: "leading prompt" },
    { role: "user", content: "hi" },
    { role: "assistant", content: "hello" },
  ];
  const body = { model: "mimo-v2.5", messages };

  const result = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI,
    "mimo-v2.5",
    body,
    false,
    null,
    "xiaomi-mimo"
  );

  assert.deepEqual(result.messages, messages);
});
