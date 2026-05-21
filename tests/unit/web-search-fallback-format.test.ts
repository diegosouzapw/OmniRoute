import test from "node:test";
import assert from "node:assert/strict";

const { prepareWebSearchFallbackBody, OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME } =
  await import("../../open-sse/services/webSearchFallback.ts");

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
