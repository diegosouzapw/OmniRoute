import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeResponsesInputItems } from "../../open-sse/services/responsesInputSanitizer.ts";

// #13698: OpenCode Go Muse Spark 1.3 rejects Codex's proprietary `agent_message` input-item
// type on its Responses endpoint with `input[N] did not match any supported type`. The shared
// sanitizer must convert `agent_message` items into a plain `message` item for every
// non-Codex-native Responses upstream, while leaving the real Codex/ChatGPT native passthrough
// path untouched (it understands `agent_message` natively).

test("#13698: converts a type=agent_message item into a supported message item, preserving context", () => {
  const input = [
    {
      type: "agent_message",
      author: "worker",
      recipient: "main",
      content: [{ type: "input_text", text: "Synthetic worker result: 2+2=4." }],
    },
  ];

  const [item] = sanitizeResponsesInputItems(input, false) as Array<Record<string, unknown>>;

  assert.equal(item.type, "message");
  assert.equal(item.role, "user");
  const content = item.content as Array<Record<string, unknown>>;
  assert.equal(content.length, 2);
  assert.equal(content[0].type, "input_text");
  assert.match(content[0].text as string, /\[Agent message context\]/);
  assert.match(content[0].text as string, /"author":"worker"/);
  assert.match(content[0].text as string, /"recipient":"main"/);
  assert.deepEqual(content[1], { type: "input_text", text: "Synthetic worker result: 2+2=4." });
});

test("#13698: converts a role=agent_message item (no explicit type) the same way", () => {
  const input = [
    { role: "agent_message", author: "a", recipient: "b", content: "plain string body" },
  ];

  const [item] = sanitizeResponsesInputItems(input, false) as Array<Record<string, unknown>>;

  assert.equal(item.type, "message");
  assert.equal(item.role, "user");
  const content = item.content as Array<Record<string, unknown>>;
  assert.equal(content.length, 2);
  assert.deepEqual(content[1], { type: "input_text", text: "plain string body" });
});

test("#13698: string content is flattened into one input_text part", () => {
  const input = [{ type: "agent_message", content: "hello sub-agent" }];

  const [item] = sanitizeResponsesInputItems(input, false) as Array<Record<string, unknown>>;
  const content = item.content as Array<Record<string, unknown>>;
  assert.equal(content.length, 2);
  assert.deepEqual(content[1], { type: "input_text", text: "hello sub-agent" });
});

test("#13698: encrypted_content parts become a placeholder, not leaked plaintext or a dropped item", () => {
  const input = [
    {
      type: "agent_message",
      content: [{ type: "encrypted_content", data: "opaque-ciphertext" }],
    },
  ];

  const [item] = sanitizeResponsesInputItems(input, false) as Array<Record<string, unknown>>;
  const content = item.content as Array<Record<string, unknown>>;
  assert.equal(content.length, 2);
  assert.equal(content[1].type, "input_text");
  assert.doesNotMatch(content[1].text as string, /opaque-ciphertext/);
});

test("#13698: image_url / input_image parts are preserved via the existing content-part sanitizer", () => {
  const input = [
    {
      type: "agent_message",
      content: [{ type: "image_url", image_url: { url: "https://example.com/x.png" } }],
    },
  ];

  const [item] = sanitizeResponsesInputItems(input, false) as Array<Record<string, unknown>>;
  const content = item.content as Array<Record<string, unknown>>;
  assert.equal(content.length, 2);
  assert.equal(content[1].type, "input_image");
  assert.equal(content[1].image_url, "https://example.com/x.png");
});

test("#13698: non-array/non-string content falls back to a JSON-stringified input_text part", () => {
  const input = [{ type: "agent_message", content: { weird: true } }];

  const [item] = sanitizeResponsesInputItems(input, false) as Array<Record<string, unknown>>;
  const content = item.content as Array<Record<string, unknown>>;
  assert.equal(content.length, 2);
  assert.equal(content[1].type, "input_text");
  assert.equal(content[1].text, JSON.stringify({ weird: true }));
});

test("#13698: preserveAgentMessages:true leaves the item untouched (native Codex/ChatGPT passthrough)", () => {
  const input = [
    {
      type: "agent_message",
      author: "worker",
      recipient: "main",
      content: [{ type: "input_text", text: "task payload" }],
    },
  ];

  const [item] = sanitizeResponsesInputItems(input, false, {
    preserveAgentMessages: true,
  }) as Array<Record<string, unknown>>;

  assert.deepEqual(item, input[0]);
});

test("#13698: conversion is idempotent -- sanitizing the converted output again is a no-op", () => {
  const input = [
    {
      type: "agent_message",
      author: "worker",
      recipient: "main",
      content: [{ type: "input_text", text: "task payload" }],
    },
  ];

  const once = sanitizeResponsesInputItems(input, false) as Array<Record<string, unknown>>;
  const twice = sanitizeResponsesInputItems(once, false) as Array<Record<string, unknown>>;
  assert.deepEqual(once, twice);
});

test("#13698: default sanitizeResponsesInputItems call sites (base/github executors) still convert", () => {
  // Simulates the base executor / GitHub executor call sites, which pass no third argument
  // and therefore must pick up the new default (convert) -- this is the OpenCode Go / Muse
  // Spark 1.3 path from the issue.
  const input = [{ type: "agent_message", content: "sub-agent reply" }];
  const [item] = sanitizeResponsesInputItems(input, false) as Array<Record<string, unknown>>;
  assert.equal(item.type, "message");
});
