import test from "node:test";
import assert from "node:assert/strict";

import { GithubExecutor } from "../../open-sse/executors/github.ts";

// GitHub Copilot's /chat/completions endpoint rejects a conversation that ends with an
// assistant message: "This model does not support assistant message prefill. The
// conversation must end with a user message." Anthropic clients (e.g. newest Claude
// Desktop) send a trailing assistant turn as a prefill seed — the Anthropic API honors
// it, but Copilot 400s. GithubExecutor.dropTrailingAssistantPrefill() strips the
// trailing assistant message(s) before dispatch, scoped to the github executor only.
// Port of 9router#2143 (author: Manuel <baslr@users.noreply.github.com>).

test("dropTrailingAssistantPrefill drops a single trailing assistant message", () => {
  const executor = new GithubExecutor();
  const messages = [
    { role: "user", content: "Hi" },
    { role: "assistant", content: "Here is the answer:" },
  ];

  const out = executor.dropTrailingAssistantPrefill(messages);

  assert.equal(out.length, 1);
  assert.equal(out[0].role, "user");
});

test("dropTrailingAssistantPrefill drops multiple consecutive trailing assistant messages", () => {
  const executor = new GithubExecutor();
  const messages = [
    { role: "user", content: "Hi" },
    { role: "assistant", content: "one" },
    { role: "assistant", content: "two" },
  ];

  const out = executor.dropTrailingAssistantPrefill(messages);

  assert.equal(out.length, 1);
  assert.equal(out[0].role, "user");
});

test("dropTrailingAssistantPrefill is a no-op (same reference) when the conversation ends with a user message", () => {
  const executor = new GithubExecutor();
  const messages = [
    { role: "user", content: "Hi" },
    { role: "assistant", content: "Hello" },
    { role: "user", content: "More" },
  ];

  const out = executor.dropTrailingAssistantPrefill(messages);

  assert.equal(out, messages, "must return the same array reference when nothing changes");
  assert.equal(out.length, 3);
});

test("dropTrailingAssistantPrefill is a no-op when the conversation ends with a tool message", () => {
  const executor = new GithubExecutor();
  const messages = [
    { role: "user", content: "Hi" },
    { role: "assistant", content: null, tool_calls: [{ id: "x" }] },
    { role: "tool", tool_call_id: "x", content: "result" },
  ];

  const out = executor.dropTrailingAssistantPrefill(messages);

  assert.equal(out, messages, "must return the same array reference when nothing changes");
  assert.equal(out.length, 3);
  assert.equal(out[2].role, "tool");
});

test("dropTrailingAssistantPrefill never empties an assistant-only conversation", () => {
  const executor = new GithubExecutor();
  const messages = [{ role: "assistant", content: "only" }];

  const out = executor.dropTrailingAssistantPrefill(messages);

  assert.equal(out.length, 1, "must keep at least one message");
  assert.equal(out[0].role, "assistant");
});

test("dropTrailingAssistantPrefill is null/empty safe", () => {
  const executor = new GithubExecutor();

  assert.deepEqual(executor.dropTrailingAssistantPrefill([]), []);
  assert.equal(executor.dropTrailingAssistantPrefill(undefined), undefined);
  assert.equal(executor.dropTrailingAssistantPrefill(null), null);
});

test("GithubExecutor.transformRequest drops the trailing assistant prefill end-to-end", () => {
  const executor = new GithubExecutor();
  // Use an unregistered claude-* id so getModelTargetFormat("gh", ...) resolves
  // to null and this stays on the /chat/completions path this test targets.
  // Registered claude-* ids (e.g. "claude-sonnet-4.6") now carry
  // targetFormat:"claude" (native /v1/messages, which supports prefill — port
  // of decolua/9router#2608, see github-copilot-claude-native-messages.test.ts)
  // and intentionally skip this drop.
  const body = {
    model: "claude-sonnet-4",
    messages: [
      { role: "user", content: "Hi" },
      { role: "assistant", content: "Here is the answer:" },
    ],
  };

  const out = executor.transformRequest("claude-sonnet-4", body, false, {});

  assert.equal(out.messages.length, 1);
  assert.equal(out.messages[0].role, "user");
});

test("GithubExecutor.transformRequest leaves a user-terminated conversation untouched end-to-end", () => {
  const executor = new GithubExecutor();
  const body = {
    model: "claude-sonnet-4.6",
    messages: [
      { role: "user", content: "Hi" },
      { role: "assistant", content: "Hello" },
      { role: "user", content: "More" },
    ],
  };

  const out = executor.transformRequest("claude-sonnet-4.6", body, false, {});

  assert.equal(out.messages.length, 3);
  assert.equal(out.messages[2].role, "user");
});
