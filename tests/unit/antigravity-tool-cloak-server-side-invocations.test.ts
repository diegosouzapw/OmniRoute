import { test } from "node:test";
import assert from "node:assert/strict";

import { sanitizeAntigravityToolPayload } from "../../open-sse/config/toolCloaking.ts";
import { openaiToAntigravityRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";

test("Antigravity payload does not synthesize decoys or server-side tool invocation flags", () => {
  const body = {
    model: "gemini-pro-agent",
    messages: [{ role: "user", content: "list files in the repo" }],
    tools: [
      {
        type: "function",
        function: {
          name: "bash",
          description: "run a shell command",
          parameters: { type: "object", properties: { cmd: { type: "string" } } },
        },
      },
    ],
  };
  const envelope = openaiToAntigravityRequest("gemini-pro-agent", body, false, {
    projectId: "test-project",
  });
  const sanitized = sanitizeAntigravityToolPayload(envelope as Record<string, unknown>);
  const request = sanitized.request as {
    tools?: Array<{ functionDeclarations?: Array<{ name: string }> }>;
    toolConfig?: Record<string, unknown>;
  };
  const declarationNames =
    request.tools?.flatMap((tool) => tool.functionDeclarations?.map((item) => item.name) ?? []) ??
    [];

  assert.deepEqual(declarationNames, ["bash"]);
  assert.equal(
    declarationNames.some((name) => name.endsWith("_ide")),
    false
  );
  assert.equal(declarationNames.includes("browser_subagent"), false);
  assert.equal(declarationNames.includes("mcp_sequential_thinking_sequentialthinking"), false);
  assert.equal(request.toolConfig?.includeServerSideToolInvocations, undefined);
  assert.equal(request.toolConfig?.include_server_side_tool_invocations, undefined);
});
