import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

/**
 * Regression guard for upstream 9router#1480.
 *
 * The native Moonshot `kimi` provider (executor "default") is a thinking-mode
 * upstream that returns 400 "reasoning_content must be passed back" when a prior
 * assistant turn in the history lacks `reasoning_content`. OpencodeExecutor
 * already injects a placeholder for OpenCode-routed thinking models, but the
 * direct kimi connection went through DefaultExecutor, which did not — so
 * multi-turn kimi conversations 400'd. The injection must fire for `kimi`, and
 * must NOT fire for unrelated providers that merely serve a matching model name.
 */

const STREAM = true;
const CREDENTIALS = { apiKey: "k" } as Record<string, unknown>;

function multiTurnBody(model: string) {
  return {
    model,
    stream: STREAM,
    messages: [
      { role: "user", content: "hi" },
      { role: "assistant", content: "previous answer" }, // no reasoning_content
      { role: "user", content: "follow up" },
    ],
  };
}

test("DefaultExecutor(kimi) injects reasoning_content on assistant turns that lack it", () => {
  const out = new DefaultExecutor("kimi").transformRequest(
    "kimi-k2.6",
    multiTurnBody("kimi-k2.6"),
    STREAM,
    CREDENTIALS
  ) as Record<string, unknown>;
  const messages = out.messages as Array<Record<string, unknown>>;
  const assistant = messages.find((m) => m.role === "assistant") as Record<string, unknown>;
  assert.equal(
    typeof assistant.reasoning_content === "string" &&
      (assistant.reasoning_content as string).length > 0,
    true,
    "kimi assistant message must carry a non-empty reasoning_content placeholder"
  );
});

test("DefaultExecutor(openai) does NOT inject reasoning_content (scoped to kimi)", () => {
  // A non-kimi provider must not gain the injection even for a thinking-ish name.
  const out = new DefaultExecutor("openai").transformRequest(
    "kimi-k2.6",
    multiTurnBody("kimi-k2.6"),
    STREAM,
    CREDENTIALS
  ) as Record<string, unknown>;
  const messages = out.messages as Array<Record<string, unknown>>;
  const assistant = messages.find((m) => m.role === "assistant") as Record<string, unknown>;
  assert.equal(
    Object.prototype.hasOwnProperty.call(assistant, "reasoning_content"),
    false,
    "non-kimi providers must not be given a reasoning_content placeholder"
  );
});
