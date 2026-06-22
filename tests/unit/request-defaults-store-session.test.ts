import test from "node:test";
import assert from "node:assert/strict";

const {
  buildOpenAIStoreSessionId,
  ensureOpenAIStoreSessionFallback,
  getClaudeCodeCompatibleRequestDefaults,
  normalizeProviderSpecificData,
  sanitizeProviderSpecificDataForResponse,
} = await import("../../src/lib/providers/requestDefaults.ts");

test("buildOpenAIStoreSessionId normalizes external and generated session ids", () => {
  assert.equal(
    buildOpenAIStoreSessionId("ext:client session/abc"),
    "omniroute-session-client-session-abc"
  );
  assert.equal(
    buildOpenAIStoreSessionId(" internal:session "),
    "omniroute-session-internal:session"
  );
  assert.equal(buildOpenAIStoreSessionId(""), undefined);
});

test("ensureOpenAIStoreSessionFallback injects session_id only when no stable cache key exists", () => {
  const injected = ensureOpenAIStoreSessionFallback({ model: "gpt-5.3-codex" }, "ext:session-1");
  assert.equal(injected.session_id, "omniroute-session-session-1");

  const withPromptCacheKey = ensureOpenAIStoreSessionFallback(
    { model: "gpt-5.3-codex", prompt_cache_key: "cache-123" },
    "ext:session-2"
  );
  assert.equal(withPromptCacheKey.session_id, undefined);

  const withConversation = ensureOpenAIStoreSessionFallback(
    { model: "gpt-5.3-codex", conversation_id: "conv-1" },
    "ext:session-3"
  );
  assert.equal(withConversation.session_id, undefined);

  const withExplicitSession = ensureOpenAIStoreSessionFallback(
    { model: "gpt-5.3-codex", session_id: "existing-session" },
    "ext:session-4"
  );
  assert.equal(withExplicitSession.session_id, "existing-session");
});

test("normalizeProviderSpecificData keeps only boolean CC-compatible request defaults", () => {
  const normalized = normalizeProviderSpecificData("anthropic-compatible-cc-demo", {
    baseUrl: "https://proxy.example.com/v1/messages?beta=true",
    requestDefaults: {
      context1m: true,
      redactThinking: true,
      customFlag: "keep-me",
    },
  });

  assert.deepEqual(getClaudeCodeCompatibleRequestDefaults(normalized), {
    context1m: true,
    redactThinking: true,
  });
  assert.deepEqual(normalized?.requestDefaults, {
    context1m: true,
    redactThinking: true,
    customFlag: "keep-me",
  });

  const stripped = normalizeProviderSpecificData("anthropic-compatible-cc-demo", {
    requestDefaults: {
      context1m: "yes",
      redactThinking: "yes",
      customFlag: "keep-me",
    },
  });
  assert.deepEqual(stripped?.requestDefaults, {
    customFlag: "keep-me",
  });
});

test("normalizeProviderSpecificData trims OpenRouter preset and clears empty values", () => {
  const normalized = normalizeProviderSpecificData("openrouter", {
    preset: "  email-copywriter  ",
    tag: "primary",
  });

  assert.equal(normalized?.preset, "email-copywriter");
  assert.equal(normalized?.tag, "primary");

  const stripped = normalizeProviderSpecificData("openrouter", {
    preset: "   ",
    tag: "primary",
  });

  assert.equal(stripped?.preset, undefined);
  assert.equal(stripped?.tag, "primary");

  const oversized = normalizeProviderSpecificData("openrouter", {
    preset: "x".repeat(201),
    tag: "primary",
  });

  assert.equal(oversized?.preset, undefined);
  assert.equal(oversized?.tag, "primary");

  const ignored = normalizeProviderSpecificData("openai", {
    preset: "email-copywriter",
    tag: "primary",
  });

  assert.equal(ignored?.preset, undefined);
  assert.equal(ignored?.tag, "primary");
});

test("sanitizeProviderSpecificDataForResponse removes quota scraping cookies", () => {
  const sanitized = sanitizeProviderSpecificDataForResponse({
    opencodeGoWorkspaceId: "workspace-123",
    opencodeGoAuthCookie: "auth-cookie",
    ollamaCloudUsageCookie: "ollama-cookie",
    usageCookie: "fallback-cookie",
    consoleApiKey: "console-key",
    tag: "primary",
  });

  assert.deepEqual(sanitized, {
    opencodeGoWorkspaceId: "workspace-123",
    tag: "primary",
  });
});
