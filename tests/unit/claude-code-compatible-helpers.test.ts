import test from "node:test";
import assert from "node:assert/strict";

const {
  CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_MODELS_PATH,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_MAX_TOKENS,
  CLAUDE_CODE_COMPATIBLE_ANTHROPIC_BETA,
  CLAUDE_CODE_COMPATIBLE_STAINLESS_TIMEOUT_SECONDS,
  isClaudeCodeCompatibleProvider,
  stripAnthropicMessagesSuffix,
  stripClaudeCodeCompatibleEndpointSuffix,
  joinBaseUrlAndPath,
  joinClaudeCodeCompatibleUrl,
  buildClaudeCodeCompatibleHeaders,
  buildClaudeCodeCompatibleValidationPayload,
  resolveClaudeCodeCompatibleSessionId,
} = await import("../../open-sse/services/claudeCodeCompatible.ts");

const { isClaudeCodeCompatible } = await import("../../open-sse/services/provider.ts");

test("Claude Code compatible provider detection matches the shared prefix contract", () => {
  assert.equal(isClaudeCodeCompatibleProvider("anthropic-compatible-cc-demo"), true);
  assert.equal(isClaudeCodeCompatible("anthropic-compatible-cc-demo"), true);
  assert.equal(isClaudeCodeCompatibleProvider("anthropic-compatible-demo"), false);
  assert.equal(isClaudeCodeCompatible(null), false);
});

test("base URL helpers strip messages suffixes and join canonical paths", () => {
  const baseUrl = "https://cc.example.com/v1/messages?beta=true";

  assert.equal(stripAnthropicMessagesSuffix(baseUrl), "https://cc.example.com/v1");
  assert.equal(stripClaudeCodeCompatibleEndpointSuffix(baseUrl), "https://cc.example.com");
  assert.equal(
    joinBaseUrlAndPath(baseUrl, CLAUDE_CODE_COMPATIBLE_DEFAULT_MODELS_PATH),
    "https://cc.example.com/v1/models"
  );
  assert.equal(
    joinClaudeCodeCompatibleUrl(baseUrl, CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH),
    "https://cc.example.com/v1/messages?beta=true"
  );
});

test("buildClaudeCodeCompatibleHeaders emits bearer auth headers and session id", () => {
  const streamHeaders = buildClaudeCodeCompatibleHeaders("sk-demo", true, "session-123");
  const jsonHeaders = buildClaudeCodeCompatibleHeaders("sk-demo", false);

  assert.equal(streamHeaders.Accept, "application/json");
  assert.equal(streamHeaders.Authorization, "Bearer sk-demo");
  assert.equal(streamHeaders["x-api-key"], undefined);
  assert.equal(streamHeaders["X-Claude-Code-Session-Id"], "session-123");
  assert.equal(
    streamHeaders["X-Stainless-Timeout"],
    String(CLAUDE_CODE_COMPATIBLE_STAINLESS_TIMEOUT_SECONDS)
  );
  assert.equal(jsonHeaders.Accept, "application/json");
  assert.equal(jsonHeaders["X-Claude-Code-Session-Id"], undefined);
});

test("Claude Code compatible beta set matches the stable API-key Claude CLI profile", () => {
  assert.ok(CLAUDE_CODE_COMPATIBLE_ANTHROPIC_BETA.includes("claude-code-20250219"));
  assert.ok(CLAUDE_CODE_COMPATIBLE_ANTHROPIC_BETA.includes("interleaved-thinking-2025-05-14"));
  assert.ok(CLAUDE_CODE_COMPATIBLE_ANTHROPIC_BETA.includes("effort-2025-11-24"));
  assert.equal(CLAUDE_CODE_COMPATIBLE_ANTHROPIC_BETA.includes("oauth-2025-04-20"), false);
  assert.equal(
    CLAUDE_CODE_COMPATIBLE_ANTHROPIC_BETA.includes("context-management-2025-06-27"),
    false
  );
  assert.equal(
    CLAUDE_CODE_COMPATIBLE_ANTHROPIC_BETA.includes("prompt-caching-scope-2026-01-05"),
    false
  );
});

test("resolveClaudeCodeCompatibleSessionId prefers explicit session headers and generates a fallback id", () => {
  const headers = new Headers({
    "x-session-id": "legacy-session",
    "x-claude-code-session-id": "preferred-session",
  });

  assert.equal(resolveClaudeCodeCompatibleSessionId(headers), "preferred-session");
  assert.match(
    resolveClaudeCodeCompatibleSessionId({}),
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  );
});

test("buildClaudeCodeCompatibleValidationPayload produces the expected smoke-test request", () => {
  const payload = buildClaudeCodeCompatibleValidationPayload("claude-sonnet-4-6");

  assert.equal(payload.model, "claude-sonnet-4-6");
  assert.equal(payload.stream, true);
  assert.equal(payload.max_tokens, 1);
  assert.equal(payload.output_config.effort, "high");
  assert.equal(payload.messages.length, 1);
  assert.deepEqual(payload.messages[0], {
    role: "user",
    content: [{ type: "text", text: "ok" }],
  });
  assert.equal(payload.tools.length, 0);
  assert.equal(payload.system.length, 1);
  assert.match((payload as any).system[0].text, /Claude Agent SDK/);
  assert.ok((JSON as any).parse(payload.metadata.user_id).session_id);
  assert.ok(CLAUDE_CODE_COMPATIBLE_DEFAULT_MAX_TOKENS > payload.max_tokens);
});
