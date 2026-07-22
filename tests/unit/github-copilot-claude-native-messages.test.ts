// GitHub Copilot exposes an Anthropic-native `/v1/messages` shim alongside its
// OpenAI-shape `/chat/completions` and `/responses` endpoints. Only the native
// shim surfaces prompt-cache token counts (`cached_tokens`) for Claude models —
// /chat/completions silently drops them, and round-tripping Claude tool_use /
// tool_result / thinking content blocks through the OpenAI shape is lossy.
//
// Port of upstream decolua/9router#2608 (author: yidecode), adapted to
// OmniRoute's architecture: instead of the executor doing its own
// translateRequest/translateResponse + manual SSE TransformStream (9router has
// no generic per-model targetFormat mechanism), OmniRoute already has a
// registry-driven `targetFormat` field (see opencode/zen's Qwen entries,
// opencode/go) that makes chatCore.ts translate the request to Claude shape
// *before* the executor ever sees it, and translate the response back
// generically afterwards. So the actual port is: (1) tag the github registry's
// claude-* models with targetFormat:"claude", (2) teach the github executor's
// buildUrl()/buildHeaders() to route those models at the new messagesUrl with
// an anthropic-version header, and (3) gate the executor's /chat/completions-only
// request transforms (content-part flattening, trailing-assistant-prefill drop,
// response_format-as-system-prompt workaround) off for the native path, since
// they either don't apply to Claude-shape bodies or actively corrupt them.

import test from "node:test";
import assert from "node:assert/strict";

const { GithubExecutor } = await import("../../open-sse/executors/github.ts");
const { getModelTargetFormat } = await import("../../open-sse/config/providerModels.ts");

test("registry: claude-* github models resolve targetFormat 'claude'", () => {
  for (const model of ["claude-opus-4.8", "claude-sonnet-4.6", "claude-haiku-4.5"]) {
    assert.equal(
      getModelTargetFormat("gh", model),
      "claude",
      `${model} must resolve to the claude target format so chatCore translates natively`
    );
  }
});

test("registry: non-claude github models keep their existing targetFormat", () => {
  assert.equal(getModelTargetFormat("gh", "gpt-5.4"), "openai-responses");
  assert.equal(getModelTargetFormat("gh", "gpt-4o-mini"), null);
});

test("buildUrl: claude models route to the native /v1/messages endpoint", () => {
  const executor = new GithubExecutor();
  const url = executor.buildUrl("claude-opus-4.8", true);
  assert.equal(url, "https://api.githubcopilot.com/v1/messages");
});

test("buildUrl: gpt codex/responses models still route to /responses", () => {
  const executor = new GithubExecutor();
  const url = executor.buildUrl("gpt-5.4", true);
  assert.match(url, /\/responses$/);
});

test("buildUrl: plain gpt models still route to /chat/completions", () => {
  const executor = new GithubExecutor();
  const url = executor.buildUrl("gpt-4o-mini", true);
  assert.equal(url, executor.config.baseUrl);
  assert.match(url, /\/chat\/completions$/);
});

test("buildHeaders: claude-native requests carry anthropic-version", () => {
  const executor = new GithubExecutor();
  const headers = executor.buildHeaders({ accessToken: "tok" }, true, null, "claude-opus-4.8");
  assert.equal(headers["anthropic-version"], "2023-06-01");
});

test("buildHeaders: non-claude requests do not carry anthropic-version", () => {
  const executor = new GithubExecutor();
  const headers = executor.buildHeaders({ accessToken: "tok" }, true, null, "gpt-4o-mini");
  assert.equal(headers["anthropic-version"], undefined);
});

test("transformRequest: claude-native path preserves native tool_use/tool_result content blocks", () => {
  const executor = new GithubExecutor();
  const body = {
    model: "claude-opus-4.8",
    system: "you are a helpful assistant",
    messages: [
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "t1", name: "search", input: { q: "hi" } }],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "t1", content: "result text" }],
      },
    ],
  };
  const result = executor.transformRequest("claude-opus-4.8", body, true, {});
  // Pre-port: sanitizeChatCompletionsMessage flattened every non-text/image_url
  // part to {type:"text", text: ...}, destroying the tool_use/tool_result blocks
  // Anthropic's native /v1/messages endpoint actually needs.
  assert.equal((result.messages[0].content[0] as { type: string }).type, "tool_use");
  assert.equal((result.messages[1].content[0] as { type: string }).type, "tool_result");
});

test("transformRequest: claude-native path keeps a trailing assistant message (prefill)", () => {
  const executor = new GithubExecutor();
  const body = {
    model: "claude-opus-4.8",
    messages: [
      { role: "user", content: "hi" },
      { role: "assistant", content: "Sure, here is" },
    ],
  };
  const result = executor.transformRequest("claude-opus-4.8", body, true, {});
  // Pre-port: dropTrailingAssistantPrefill removed the trailing assistant turn
  // because Copilot's /chat/completions rejects prefill — but the native
  // /v1/messages endpoint is real Anthropic-compatible and supports it.
  assert.equal(result.messages.length, 2);
  assert.equal(result.messages[1].role, "assistant");
});

test("transformRequest: non-claude (chat/completions) path still flattens tool_use content and drops prefill", () => {
  const executor = new GithubExecutor();
  const body = {
    model: "gpt-4o-mini",
    messages: [
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "t1", name: "search", input: {} }],
      },
      { role: "user", content: "hi" },
      { role: "assistant", content: "trailing prefill" },
    ],
  };
  const result = executor.transformRequest("gpt-4o-mini", body, true, {});
  assert.equal((result.messages[0].content[0] as { type: string }).type, "text");
  assert.equal(result.messages.length, 2, "trailing assistant message must still be dropped");
});
