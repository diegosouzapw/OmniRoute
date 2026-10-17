import { test } from "node:test";
import assert from "node:assert/strict";
import { CodeBuddyCnExecutor } from "../../open-sse/executors/codebuddy-cn.ts";

function makeBody() {
  return {
    messages: [
      { role: "user", content: "What is 2+2?" },
      {
        role: "assistant",
        content: "The answer is 4.",
        reasoning_content: "The user is asking a simple arithmetic question. 2+2=4.",
      },
      { role: "user", content: "Why?" },
    ],
  };
}

test("issue #13632: assistant reasoning_content is inlined into content for codebuddy-cn thinking models (string content)", () => {
  const exec = new CodeBuddyCnExecutor();

  const out = exec.transformRequest("deepseek-v4-flash", makeBody(), true, {}) as {
    messages: Array<Record<string, unknown>>;
  };

  const assistantMsg = out.messages[1];
  const contentText =
    typeof assistantMsg.content === "string"
      ? assistantMsg.content
      : JSON.stringify(assistantMsg.content);

  assert.match(contentText, /<thought>/, "expected inlined <thought> block");
  assert.match(contentText, /2\+2=4/, "expected reasoning text to be preserved");
  assert.match(contentText, /The answer is 4\./, "expected original content to be preserved");
  // Original field is left intact (harmless if upstream drops it, helps if it doesn't).
  assert.equal(
    assistantMsg.reasoning_content,
    "The user is asking a simple arithmetic question. 2+2=4.",
    "expected reasoning_content field to remain untouched"
  );
});

test("issue #13632: assistant reasoning_content is inlined for typed-block array content", () => {
  const exec = new CodeBuddyCnExecutor();

  const body = {
    messages: [
      { role: "user", content: "What is 2+2?" },
      {
        role: "assistant",
        content: [{ type: "text", text: "The answer is 4." }],
        reasoning_content: "2+2=4 because addition.",
      },
      { role: "user", content: "Why?" },
    ],
  };

  const out = exec.transformRequest("deepseek-v4-flash", body, true, {}) as {
    messages: Array<{ content: Array<Record<string, unknown>> }>;
  };

  const firstBlock = out.messages[1].content[0];
  assert.equal(firstBlock.type, "text");
  assert.match(String(firstBlock.text), /<thought>/);
  assert.match(String(firstBlock.text), /2\+2=4 because addition\./);
  assert.match(String(firstBlock.text), /The answer is 4\./);
});

test("issue #13632: idempotent — does not double-inject when content already carries a <thought> block", () => {
  const exec = new CodeBuddyCnExecutor();

  const body = {
    messages: [
      {
        role: "assistant",
        content: "<thought>\nalready inlined\n</thought>\n\nThe answer is 4.",
        reasoning_content: "some other reasoning that should not be re-injected",
      },
    ],
  };

  const out = exec.transformRequest("deepseek-v4-flash", body, true, {}) as {
    messages: Array<Record<string, unknown>>;
  };

  const contentText = String(out.messages[0].content);
  const occurrences = contentText.split("<thought>").length - 1;
  assert.equal(occurrences, 1, "expected exactly one <thought> block, not a duplicate");
  assert.doesNotMatch(contentText, /some other reasoning that should not be re-injected/);
});

test("issue #13632: no-op when reasoning_content is absent", () => {
  const exec = new CodeBuddyCnExecutor();

  const body = {
    messages: [
      { role: "user", content: "hi" },
      { role: "assistant", content: "hello there" },
    ],
  };

  const out = exec.transformRequest("deepseek-v4-flash", body, true, {}) as {
    messages: Array<Record<string, unknown>>;
  };

  assert.equal(out.messages[1].content, "hello there");
});

test("issue #13632: no-op for non-reasoning-replay models even with reasoning_content present", () => {
  const exec = new CodeBuddyCnExecutor();

  const body = {
    messages: [
      {
        role: "assistant",
        content: "The answer is 4.",
        reasoning_content: "2+2=4",
      },
    ],
  };

  // "gpt-4o-mini"-shaped model routed through codebuddy-cn is not a thinking
  // model in REASONING_REPLAY_MODEL_PATTERNS — must stay untouched.
  const out = exec.transformRequest("gpt-4o-mini", body, true, {}) as {
    messages: Array<Record<string, unknown>>;
  };

  assert.equal(out.messages[0].content, "The answer is 4.");
});

test("issue #13632: no-op for non-assistant roles", () => {
  const exec = new CodeBuddyCnExecutor();

  const body = {
    messages: [{ role: "user", content: "hi", reasoning_content: "should never apply to user" }],
  };

  const out = exec.transformRequest("deepseek-v4-flash", body, true, {}) as {
    messages: Array<Record<string, unknown>>;
  };

  assert.equal(out.messages[0].content, "hi");
});
