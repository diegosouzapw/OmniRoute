import test from "node:test";
import assert from "node:assert/strict";

import { normalizeOpenAICompatibleTools } from "../../../open-sse/handlers/chatCore/openAICompatibleTools.ts";
import { FORMATS } from "../../../open-sse/translator/formats.ts";

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
