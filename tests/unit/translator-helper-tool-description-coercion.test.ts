// Regression: tool descriptions must always be strings for strict upstream
// validation (e.g., NVIDIA NIM, Codex). Ports upstream PR decolua/9router#397
// (Ibrahim Ryan), restricted to the gap that still exists in OmniRoute —
// the two non-string-tolerant paths in openaiHelper.filterToOpenAIFormat
// (Claude-style and Gemini-style tool normalization). The other locations
// upstream-patched (claude-to-openai.ts, openai-responses.ts) already coerce
// via String/toString in OmniRoute.
import test from "node:test";
import assert from "node:assert/strict";

const openaiHelper = await import(
  "../../open-sse/translator/helpers/openaiHelper.ts"
);

test("filterToOpenAIFormat coerces non-string Claude-tool description to string", () => {
  const result = openaiHelper.filterToOpenAIFormat({
    messages: [{ role: "user", content: "hi" }],
    tools: [
      {
        name: "claude-tool",
        // Non-string truthy value — must NOT leak through to upstream.
        description: { invalid: "object" } as unknown as string,
        input_schema: { type: "object" },
      },
    ],
  });
  assert.equal(typeof result.tools[0].function.description, "string");
});

test("filterToOpenAIFormat coerces null/undefined Claude-tool description to empty string", () => {
  const result = openaiHelper.filterToOpenAIFormat({
    messages: [{ role: "user", content: "hi" }],
    tools: [
      { name: "t1", description: null as unknown as string, input_schema: {} },
      { name: "t2", description: undefined, input_schema: {} },
    ],
  });
  assert.equal(result.tools[0].function.description, "");
  assert.equal(result.tools[1].function.description, "");
});

test("filterToOpenAIFormat coerces non-string Gemini functionDeclarations description", () => {
  const result = openaiHelper.filterToOpenAIFormat({
    messages: [{ role: "user", content: "hi" }],
    tools: [
      {
        functionDeclarations: [
          {
            name: "gemini-tool",
            description: 12345 as unknown as string,
            parameters: { type: "object" },
          },
        ],
      },
    ],
  });
  assert.equal(typeof result.tools[0].function.description, "string");
});
