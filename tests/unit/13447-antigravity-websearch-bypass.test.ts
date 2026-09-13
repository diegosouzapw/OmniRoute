/**
 * #13447 — supportsNativeWebSearchFallbackBypass returns false for Antigravity,
 * so web_search is rewritten to omniroute_web_search which Responses clients
 * reject as an undeclared tool. Antigravity uses the same Gemini translator
 * (toGeminiGoogleSearchTool) which maps web_search → googleSearch natively.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { supportsNativeWebSearchFallbackBypass } = await import(
  "../../open-sse/services/webSearchFallback.ts"
);

test("#13447 Antigravity target bypasses web search fallback conversion", () => {
  const result = supportsNativeWebSearchFallbackBypass({
    targetFormat: "antigravity",
    nativeCodexPassthrough: false,
  });

  assert.equal(result, true, "Antigravity must be recognized as natively supporting web search bypass");
});

test("#13447 Gemini target still bypasses web search fallback conversion", () => {
  const result = supportsNativeWebSearchFallbackBypass({
    targetFormat: "gemini",
    nativeCodexPassthrough: false,
  });

  assert.equal(result, true, "Gemini must still be recognized for native web search bypass");
});

test("#13447 OpenAI target does NOT bypass web search fallback", () => {
  const result = supportsNativeWebSearchFallbackBypass({
    targetFormat: "openai",
    nativeCodexPassthrough: false,
  });

  assert.equal(result, false, "OpenAI must not bypass web search fallback");
});

test("#13447 interceptSearchOverride=true forces interception even for Antigravity", () => {
  const result = supportsNativeWebSearchFallbackBypass({
    targetFormat: "antigravity",
    nativeCodexPassthrough: false,
    interceptSearchOverride: true,
  });

  assert.equal(result, false, "interceptSearchOverride must override Antigravity bypass");
});
