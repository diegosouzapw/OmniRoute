import { test } from "node:test";
import assert from "node:assert/strict";

import {
  findOffendingField,
  stripGroqUnsupportedFields,
} from "../../../open-sse/config/providerFieldStrips.ts";

test("findOffendingField matches known field names in a 400 body", () => {
  assert.equal(
    findOffendingField("Invalid argument: reasoning_budget not supported"),
    "reasoning_budget"
  );
  assert.equal(findOffendingField("unexpected field chat_template"), "chat_template");
  assert.equal(findOffendingField("reasoning_content is not allowed"), "reasoning_content");
  // #1468: Claude Code's top-level context_management field rejected by strict
  // anthropic-compatible gateways → strip + retry regardless of the contextEditing flag.
  assert.equal(
    findOffendingField("context_management: Extra inputs are not permitted"),
    "context_management"
  );
  assert.equal(
    findOffendingField("Extra inputs are not permitted, field: 'verbosity', value: 'low'"),
    "verbosity"
  );
  assert.equal(findOffendingField("all good"), null);
  assert.equal(findOffendingField(""), null);
});

test("stripGroqUnsupportedFields drops non-empty messages[].name", () => {
  const out = stripGroqUnsupportedFields({
    messages: [{ role: "user", content: "hi", name: "bob" }],
  });
  assert.equal("name" in out.messages[0], false);
  assert.equal(out.messages[0].content, "hi");
});

test("stripGroqUnsupportedFields drops logprobs/logit_bias/top_logprobs", () => {
  const out = stripGroqUnsupportedFields({
    messages: [],
    logprobs: true,
    logit_bias: { 1: 2 },
    top_logprobs: 5,
  });
  assert.equal("logprobs" in out, false);
  assert.equal("logit_bias" in out, false);
  assert.equal("top_logprobs" in out, false);
});

test("stripGroqUnsupportedFields is immutable (does not mutate input)", () => {
  const input = { messages: [{ role: "user", content: "hi", name: "bob" }], logprobs: true };
  stripGroqUnsupportedFields(input);
  assert.equal(input.messages[0].name, "bob");
  assert.equal(input.logprobs, true);
});

test("stripGroqUnsupportedFields drops unsupported messages[].model and other metadata while keeping role and content", () => {
  const out = stripGroqUnsupportedFields({
    messages: [
      { role: "user", content: "hello" },
      {
        role: "assistant",
        content: "hello!",
        model: "groq/openai/gpt-oss-20b",
        messageId: "msg_123",
        sender: "assistant",
      },
    ],
  });
  assert.equal(out.messages.length, 2);
  assert.equal(out.messages[0].role, "user");
  assert.equal(out.messages[0].content, "hello");
  assert.equal(out.messages[1].role, "assistant");
  assert.equal(out.messages[1].content, "hello!");
  assert.equal("model" in out.messages[1], false);
  assert.equal("messageId" in out.messages[1], false);
  assert.equal("sender" in out.messages[1], false);
});

