import test from "node:test";
import assert from "node:assert/strict";

const {
  prepareWebSearchFallbackBody,
  supportsNativeWebSearchFallbackBypass,
  OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME,
} = await import("../../open-sse/services/webSearchFallback.ts");

// Regression for #2390: when the target is a Responses-API provider, the injected
// omniroute_web_search tool must use the FLAT function shape ({ type, name }), not the
// nested Chat Completions shape ({ type, function: { name } }). On the Responses→Responses
// passthrough path nothing flattens it, so a nested tool reaches the upstream as
// tools[0].function.name and is rejected with "Missing required parameter: 'tools[0].name'".

function makeBody() {
  return {
    model: "gpt-5.5",
    messages: [{ role: "user", content: "search the web" }],
    tools: [{ type: "web_search" }],
  };
}

test("#2390 web_search fallback is FLAT for Responses API target", () => {
  const { body, fallback } = prepareWebSearchFallbackBody(makeBody(), {
    targetFormat: "openai-responses",
    nativeCodexPassthrough: false,
  });

  assert.equal(fallback.enabled, true);
  const injected = body.tools[0] as Record<string, unknown>;
  assert.equal(injected.type, "function");
  assert.equal(injected.name, OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME);
  assert.equal(
    injected.function,
    undefined,
    "Responses API tool must not be nested under .function"
  );
  assert.ok(injected.parameters, "flat tool keeps top-level parameters");
});

test("#2390 web_search fallback stays NESTED for Chat Completions target", () => {
  const { body, fallback } = prepareWebSearchFallbackBody(makeBody(), {
    targetFormat: "openai",
    nativeCodexPassthrough: false,
  });

  assert.equal(fallback.enabled, true);
  const injected = body.tools[0] as Record<string, unknown>;
  assert.equal(injected.type, "function");
  const fn = injected.function as Record<string, unknown> | undefined;
  assert.ok(fn, "Chat Completions tool must be nested under .function");
  assert.equal(fn?.name, OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME);
  assert.equal(
    injected.name,
    undefined,
    "Chat Completions tool must not expose a flat top-level name"
  );
});

test("#2390 tool_choice matches the injected tool shape per target format", () => {
  const responses = prepareWebSearchFallbackBody(
    { ...makeBody(), tool_choice: { type: "web_search" } },
    { targetFormat: "openai-responses", nativeCodexPassthrough: false }
  );
  const rChoice = responses.body.tool_choice as Record<string, unknown>;
  assert.equal(rChoice.name, OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME);
  assert.equal(rChoice.function, undefined);

  const chat = prepareWebSearchFallbackBody(
    { ...makeBody(), tool_choice: { type: "web_search" } },
    { targetFormat: "openai", nativeCodexPassthrough: false }
  );
  const cChoice = chat.body.tool_choice as Record<string, unknown>;
  const cFn = cChoice.function as Record<string, unknown> | undefined;
  assert.equal(cFn?.name, OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME);
});

// ── Native web-search bypass: predicate coverage for every native path ──

test("bypass predicate: true for native Codex passthrough", () => {
  assert.equal(
    supportsNativeWebSearchFallbackBypass({
      provider: "openai",
      sourceFormat: "openai-responses",
      targetFormat: "openai-responses",
      nativeCodexPassthrough: true,
    }),
    true
  );
});

test("bypass predicate: true for Gemini target", () => {
  assert.equal(
    supportsNativeWebSearchFallbackBypass({
      provider: "gemini",
      sourceFormat: "openai",
      targetFormat: "gemini",
      nativeCodexPassthrough: false,
    }),
    true
  );
});

test("bypass predicate: true for Claude -> Claude passthrough", () => {
  assert.equal(
    supportsNativeWebSearchFallbackBypass({
      provider: "claude",
      sourceFormat: "claude",
      targetFormat: "claude",
      nativeCodexPassthrough: false,
    }),
    true
  );
});

// #4481: MiniMax's Anthropic-compatible endpoint claims Claude format but does NOT
// implement Anthropic's typed server tools, so forwarding web_search_20250305 untouched
// (the Claude->Claude bypass) makes api.minimax.io return HTTP 400 "invalid params,
// function name or parameters is empty (2013)". For such providers we must NOT bypass —
// the tool has to be converted to the omniroute_web_search function fallback (which the
// model accepts as a normal function tool).
test("bypass predicate: false for Claude -> Claude when provider lacks Anthropic server tools (minimax, #4481)", () => {
  assert.equal(
    supportsNativeWebSearchFallbackBypass({
      provider: "minimax",
      sourceFormat: "claude",
      targetFormat: "claude",
      nativeCodexPassthrough: false,
    }),
    false
  );
});

test("bypass predicate: still true for Claude -> Claude on a real Claude provider (regression guard, #4481)", () => {
  assert.equal(
    supportsNativeWebSearchFallbackBypass({
      provider: "anthropic",
      sourceFormat: "claude",
      targetFormat: "claude",
      nativeCodexPassthrough: false,
    }),
    true
  );
});

test("bypass predicate: false for standard OpenAI -> OpenAI", () => {
  assert.equal(
    supportsNativeWebSearchFallbackBypass({
      provider: "openai",
      sourceFormat: "openai",
      targetFormat: "openai",
      nativeCodexPassthrough: false,
    }),
    false
  );
});

test("bypass predicate: false when only the target is Claude (non-native tool must convert)", () => {
  // An OpenAI-format client hitting a Claude target sends an OpenAI-shaped web_search
  // tool that is NOT native Anthropic format, so it must still be converted. Only the
  // Claude -> Claude passthrough (native body) is bypassed.
  assert.equal(
    supportsNativeWebSearchFallbackBypass({
      provider: "claude",
      sourceFormat: "openai",
      targetFormat: "claude",
      nativeCodexPassthrough: false,
    }),
    false
  );
});

test("bypass predicate: false when only the source is Claude", () => {
  assert.equal(
    supportsNativeWebSearchFallbackBypass({
      provider: "openai",
      sourceFormat: "claude",
      targetFormat: "openai",
      nativeCodexPassthrough: false,
    }),
    false
  );
});

// ── Native web-search bypass: end-to-end body behavior ──

test("Claude -> Claude: native web_search_20250305 forwarded untouched", () => {
  const inputBody = {
    tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 5 }],
  };
  const { body, fallback } = prepareWebSearchFallbackBody(inputBody, {
    provider: "claude",
    sourceFormat: "claude",
    targetFormat: "claude",
    nativeCodexPassthrough: false,
  });

  assert.equal(fallback.enabled, false);
  assert.equal(fallback.toolName, null);
  assert.equal(fallback.convertedToolCount, 0);
  // Body forwarded verbatim — the native tool reaches the Anthropic upstream as-is.
  assert.deepEqual(body, inputBody);
});

test("Claude -> Claude: bare web_search type also forwarded untouched", () => {
  // Even the bare (unversioned) web_search type is forwarded on the Claude passthrough,
  // because the Anthropic upstream owns web search. This is the explicit protection that
  // no longer depends on the versioned type being absent from the matcher set.
  const inputBody = { tools: [{ type: "web_search" }] };
  const { body, fallback } = prepareWebSearchFallbackBody(inputBody, {
    provider: "claude",
    sourceFormat: "claude",
    targetFormat: "claude",
    nativeCodexPassthrough: false,
  });

  assert.equal(fallback.enabled, false);
  assert.equal(fallback.toolName, null);
  assert.deepEqual(body, inputBody);
});

test("native Codex passthrough: built-in web_search_preview forwarded untouched", () => {
  // Symmetric end-to-end coverage for the Codex bypass.
  const inputBody = { tools: [{ type: "web_search_preview" }] };
  const { body, fallback } = prepareWebSearchFallbackBody(inputBody, {
    provider: "openai",
    sourceFormat: "openai-responses",
    targetFormat: "openai-responses",
    nativeCodexPassthrough: true,
  });

  assert.equal(fallback.enabled, false);
  assert.equal(fallback.toolName, null);
  assert.deepEqual(body, inputBody);
});

test("OpenAI -> Claude (non-passthrough): built-in web_search IS still converted", () => {
  // Regression guard: the new Claude bypass must NOT swallow the conversion path for a
  // non-native (OpenAI-format) client that merely targets a Claude provider.
  const inputBody = {
    tools: [{ type: "web_search", search_context_size: "low" }],
  };
  const { body, fallback } = prepareWebSearchFallbackBody(inputBody, {
    provider: "claude",
    sourceFormat: "openai",
    targetFormat: "claude",
    nativeCodexPassthrough: false,
  });

  assert.equal(fallback.enabled, true);
  assert.equal(fallback.toolName, OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME);
  assert.equal(fallback.convertedToolCount, 1);
  const tools = (body.tools as Record<string, any>[]) || [];
  const toolNames = tools.map((t) => (t.function ? t.function.name : t.name));
  assert.ok(toolNames.includes(OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME));
});
