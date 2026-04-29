import test from "node:test";
import assert from "node:assert/strict";

import {
  AG_DECOY_TOOLS,
  AG_TOOL_SUFFIX,
  cloakAntigravityToolPayload,
} from "../../open-sse/config/toolCloaking.ts";

test("cloakAntigravityToolPayload cloaks custom tools, preserves native tools and injects decoys", () => {
  const payload = {
    request: {
      tools: [
        {
          functionDeclarations: [
            {
              name: "workspace_read",
              description: "Read a file",
              parameters: { type: "OBJECT", properties: {} },
            },
            {
              name: "run_command",
              description: "Native tool should stay visible",
              parameters: { type: "OBJECT", properties: {} },
            },
          ],
        },
      ],
      contents: [
        {
          role: "model",
          parts: [{ functionCall: { name: "workspace_read", args: { path: "/tmp/a" } } }],
        },
        {
          role: "user",
          parts: [{ functionResponse: { name: "workspace_read", response: { ok: true } } }],
        },
      ],
    },
  };

  const result = cloakAntigravityToolPayload(payload);
  const declarations = (result.body.request.tools?.[0] as any)?.functionDeclarations || [];
  const names = declarations.map((tool: { name: string }) => tool.name);

  assert.ok(names.includes(`workspace_read${AG_TOOL_SUFFIX}`));
  assert.ok(names.includes("run_command"));
  assert.ok(names.includes("browser_subagent"));
  assert.ok(names.includes("mcp_sequential_thinking_sequentialthinking"));
  for (const name of names) {
    assert.match(name, /^[a-zA-Z0-9_]+$/);
  }
  assert.equal(
    result.body.request.contents[0].parts[0].functionCall.name,
    `workspace_read${AG_TOOL_SUFFIX}`
  );
  assert.equal(
    result.body.request.contents[1].parts[0].functionResponse.name,
    `workspace_read${AG_TOOL_SUFFIX}`
  );
  assert.equal(result.toolNameMap?.get(`workspace_read${AG_TOOL_SUFFIX}`), "workspace_read");
  assert.equal(
    declarations.filter((tool: { name: string }) => tool.name === "browser_subagent").length,
    1
  );
  assert.ok(AG_DECOY_TOOLS.length > 20);
});

test("cloakAntigravityToolPayload composes namespace sanitization maps with Antigravity cloaking", () => {
  const payload = {
    _toolNameMap: new Map([["workspace_read", "mcp__filesystem__workspace_read"]]),
    request: {
      tools: [
        {
          functionDeclarations: [
            {
              name: "workspace_read",
              description: "Read a file",
              parameters: { type: "OBJECT", properties: {} },
            },
          ],
        },
      ],
      contents: [],
    },
  };

  const result = cloakAntigravityToolPayload(payload);

  assert.equal(
    result.toolNameMap?.get(`workspace_read${AG_TOOL_SUFFIX}`),
    "mcp__filesystem__workspace_read"
  );
});
