import test from "node:test";
import assert from "node:assert/strict";

const { __test__ } = await import("../../open-sse/executors/zed-hosted.ts");
const { adaptGeminiRequestForZed, adaptResponsesRequestForZed } = __test__;

// #13362 / #13363: Zed's hosted proxy validates narrower enums than the upstream
// APIs, so requests translated for Google/OpenAI must be re-mapped before dispatch.

test("#13363 Gemini safety threshold OFF becomes BLOCK_NONE for Zed", () => {
  const request = {
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "OFF" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
    ],
  };
  adaptGeminiRequestForZed(request);
  assert.deepEqual(
    request.safetySettings.map((s) => s.threshold),
    ["BLOCK_NONE", "BLOCK_ONLY_HIGH"]
  );
});

test("#13363 Gemini function-calling modes map to Zed's lowercase enum", () => {
  for (const [mode, expected] of [
    ["VALIDATED", "auto"],
    ["AUTO", "auto"],
    ["ANY", "any"],
    ["NONE", "none"],
  ]) {
    const request = { toolConfig: { functionCallingConfig: { mode } } };
    adaptGeminiRequestForZed(request);
    assert.equal(request.toolConfig.functionCallingConfig.mode, expected, mode);
  }
});

test("#13363 Gemini request without safety or tool config passes through untouched", () => {
  const request = { contents: [{ role: "user", parts: [{ text: "hi" }] }] };
  const before = JSON.stringify(request);
  assert.equal(adaptGeminiRequestForZed(request), request);
  assert.equal(JSON.stringify(request), before);
  assert.equal(adaptGeminiRequestForZed(null), null);
});

test("#13362 Responses developer-role input items become system for Zed", () => {
  const request = {
    input: [
      { role: "developer", content: "be terse" },
      { role: "user", content: "hello" },
    ],
  };
  adaptResponsesRequestForZed(request);
  assert.deepEqual(
    request.input.map((item) => item.role),
    ["system", "user"]
  );
});
