import test from "node:test";
import assert from "node:assert/strict";

const { openaiToCloudCodeGeminiRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");

test("OpenAI -> Cloud Code Gemini applies native request defaults", () => {
  // gemini-3.1-pro is thinking-capable; the previous fixture (gemini-3-flash-preview,
  // supportsThinking: false / cap 0) encoded the pre-#6943 bug of requesting thoughts
  // from a non-thinking model — reasoning_effort on a capped-at-0 model now correctly
  // yields thinkingBudget 0 / includeThoughts false (see the flash assertion below).
  const request = openaiToCloudCodeGeminiRequest(
    "gemini-3.1-pro",
    {
      messages: [{ role: "user", content: "Hello" }],
      reasoning_effort: "high",
    },
    true
  ) as {
    model: string;
    generationConfig: { thinkingConfig: { includeThoughts: boolean }; topK?: number };
    contents: Array<{ parts: Array<{ text: string }> }>;
  };

  assert.equal(request.model, "gemini-3.1-pro");
  assert.equal(request.generationConfig.thinkingConfig.includeThoughts, true);

  const flash = openaiToCloudCodeGeminiRequest(
    "gemini-3-flash-preview",
    { messages: [{ role: "user", content: "Hello" }], reasoning_effort: "high" },
    true
  ) as {
    generationConfig: { thinkingConfig: { thinkingBudget: number; includeThoughts: boolean } };
  };
  assert.equal(flash.generationConfig.thinkingConfig.thinkingBudget, 0);
  assert.equal(flash.generationConfig.thinkingConfig.includeThoughts, false);
  assert.equal(request.generationConfig.topK, undefined);
  assert.equal(request.contents.at(-1).parts[0].text, "Hello");
});
