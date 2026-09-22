import test from "node:test";
import assert from "node:assert/strict";

import { normalizeOpenAICompatibleTools } from "../../open-sse/handlers/chatCore/openAICompatibleTools.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

test("preserves all Responses tool types for the Responses translator", () => {
  const customTool = {
    type: "custom",
    name: "exec",
    description: "Run a shell command",
  };
  const namespaceTool = {
    type: "namespace",
    name: "functions",
    tools: [customTool],
  };
  const localShellTool = { type: "local_shell" };

  const result = normalizeOpenAICompatibleTools(
    [customTool, namespaceTool, localShellTool],
    FORMATS.OPENAI_RESPONSES
  );

  assert.deepEqual(result, {
    tools: [customTool, namespaceTool, localShellTool],
    dropped: 0,
  });
});

test("normalizes named non-function tools for other source formats", () => {
  const result = normalizeOpenAICompatibleTools(
    [{ type: "custom", name: "exec", input_schema: { type: "object" } }],
    FORMATS.OPENAI
  );

  assert.deepEqual(result, {
    tools: [
      {
        type: "function",
        function: {
          name: "exec",
          parameters: { type: "object" },
        },
      },
    ],
    dropped: 0,
  });
});

// #13789 — the normalization gate itself: which providers get non-function
// tools converted/dropped before translation.
const { shouldNormalizeFunctionToolsOnly } =
  await import("../../open-sse/handlers/chatCore/openAICompatibleTools.ts");

test("#13789 custom openai-compatible-* providers always normalize", () => {
  for (const format of [FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES, FORMATS.CLAUDE]) {
    assert.equal(shouldNormalizeFunctionToolsOnly("openai-compatible-acme", format), true);
  }
});

test("#13789 allowlisted built-ins normalize on the OpenAI Chat target only", () => {
  assert.equal(shouldNormalizeFunctionToolsOnly("agentrouter", FORMATS.OPENAI), true);
  // Responses keeps native hosted tools; Claude has its own dispatch normalization.
  assert.equal(shouldNormalizeFunctionToolsOnly("agentrouter", FORMATS.OPENAI_RESPONSES), false);
  assert.equal(shouldNormalizeFunctionToolsOnly("agentrouter", FORMATS.CLAUDE), false);
});

test("#13789 every other provider (including openai) is untouched", () => {
  for (const provider of ["openai", "anthropic", "gemini", "minimax", undefined]) {
    assert.equal(shouldNormalizeFunctionToolsOnly(provider, FORMATS.OPENAI), false);
  }
});
