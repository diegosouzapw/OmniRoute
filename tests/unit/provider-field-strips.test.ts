import { test } from "node:test";
import assert from "node:assert/strict";
import {
  findOffendingField,
  stripGroqUnsupportedFields,
} from "../../open-sse/config/providerFieldStrips.ts";

test("findOffendingField matches known field names in a 400 body", () => {
  assert.equal(findOffendingField("Invalid argument: reasoning_budget not supported"), "reasoning_budget");
  assert.equal(findOffendingField("unexpected field chat_template"), "chat_template");
  assert.equal(findOffendingField("reasoning_content is not allowed"), "reasoning_content");
  assert.equal(findOffendingField("all good"), null);
  assert.equal(findOffendingField(""), null);
});

test("stripGroqUnsupportedFields drops non-empty messages[].name", () => {
  const out = stripGroqUnsupportedFields({ messages: [{ role: "user", content: "hi", name: "bob" }] });
  assert.equal("name" in out.messages[0], false);
  assert.equal(out.messages[0].content, "hi");
});

test("stripGroqUnsupportedFields drops logprobs/logit_bias/top_logprobs", () => {
  const out = stripGroqUnsupportedFields({ messages: [], logprobs: true, logit_bias: { 1: 2 }, top_logprobs: 5 });
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
