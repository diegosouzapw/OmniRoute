import test from "node:test";
import assert from "node:assert/strict";

const { prepareWebSearchFallbackBody, OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME } =
  await import("../../open-sse/services/webSearchFallback.ts");

// #9279 — Anthropic's date-suffixed server-tool variant web_search_20250305
// (sent by Claude Code 2.1.220+) is not intercepted by the web search fallback
// detector in webSearchFallback.ts:4, which uses an exact Set.
// Clasue -> OpenAI-compatible provider requests carry the raw Claude tool shape
// { type: "web_search_20250305", name: "web_search", max_uses: 8 }.
// The fallback must detect and intercept these too.

test("#9279 versioned web_search_20250305 IS intercepted with interceptSearchOverride=true", () => {
  const { body, fallback } = prepareWebSearchFallbackBody(
    {
      tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 8 }],
    },
    {
      provider: "opencode-go",
      sourceFormat: "claude",
      targetFormat: "openai",
      nativeCodexPassthrough: false,
      interceptSearchOverride: true,
    }
  );

  assert.equal(fallback.enabled, true);
  assert.equal(
    fallback.toolName,
    OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME
  );
  assert.equal(fallback.convertedToolCount, 1);
});

test("#9279 versioned web_search_20250305 intercepted even without per-model override (claude->openai is not a native-bypass path)", () => {
  // sourceFormat=claude, targetFormat=openai is NOT a native bypass path
  // (supportsNativeWebSearchFallbackBypass returns false), so the fallback
  // MUST fire without any interceptSearchOverride.
  const { body, fallback } = prepareWebSearchFallbackBody(
    {
      tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 8 }],
    },
    {
      provider: "opencode-go",
      sourceFormat: "claude",
      targetFormat: "openai",
      nativeCodexPassthrough: false,
      // no interceptSearchOverride — must still be detected by tool type matching
    }
  );

  assert.equal(fallback.enabled, true);
  assert.equal(
    fallback.toolName,
    OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME
  );
  assert.equal(fallback.convertedToolCount, 1);
});

test("#9279 tool_choice with web_search_20250305 redirects to omniroute_web_search", () => {
  const { body, fallback } = prepareWebSearchFallbackBody(
    {
      tools: [{ type: "web_search_20250305", name: "web_search", max_uses: 8 }],
      tool_choice: { type: "web_search_20250305" },
    },
    {
      provider: "opencode-go",
      sourceFormat: "claude",
      targetFormat: "openai",
      nativeCodexPassthrough: false,
      interceptSearchOverride: true,
    }
  );

  assert.equal(fallback.enabled, true);
  const choice = body.tool_choice as Record<string, unknown>;
  const fn = choice.function as Record<string, unknown> | undefined;
  assert.equal(fn?.name, OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME);
  assert.equal(choice.type, "function");
});