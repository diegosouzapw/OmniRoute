import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

interface ChatTool {
  function: {
    name: string;
    description?: string;
    parameters?: unknown;
  };
}

interface ChatRequest {
  messages: unknown[];
  tools: ChatTool[];
}

test("Responses -> Chat merges additional_tools into the universal tool conversion path", () => {
  const result = openaiResponsesToOpenAIRequest(
    "any-model",
    {
      input: [
        {
          type: "additional_tools",
          role: "developer",
          tools: [
            {
              type: "custom",
              name: "exec",
              description: "Run orchestration code",
              format: { type: "grammar", syntax: "lark", definition: "start: /.+/" },
            },
            {
              type: "function",
              name: "wait",
              description: "Wait for a running operation",
              parameters: {
                type: "object",
                properties: { cell_id: { type: "string" } },
                required: ["cell_id"],
              },
            },
            {
              type: "namespace",
              name: "collaboration",
              tools: [
                {
                  name: "spawn_agent",
                  description: "Spawn an agent",
                  parameters: { type: "object", properties: {} },
                },
              ],
            },
          ],
        },
        {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: "Use the tools" }],
        },
      ],
      tool_choice: "auto",
    },
    true,
    { provider: "any-openai-compatible-provider" }
  ) as ChatRequest;

  assert.deepEqual(result.messages, [
    { role: "user", content: [{ type: "text", text: "Use the tools" }] },
  ]);
  assert.deepEqual(
    result.tools.map((tool) => tool.function?.name),
    ["exec", "wait", "spawn_agent"]
  );
  assert.deepEqual(result.tools[0].function.parameters, {
    type: "object",
    properties: { input: { type: "string" } },
    required: ["input"],
    additionalProperties: false,
  });
});

test("Responses -> Chat merges multiple tool sources and keeps top-level declarations on conflict", () => {
  const topLevel = {
    type: "function",
    name: "lookup",
    description: "Authoritative top-level declaration",
    parameters: { type: "object", properties: { id: { type: "string" } } },
  };
  const result = openaiResponsesToOpenAIRequest(
    "any-model",
    {
      input: [
        {
          type: "additional_tools",
          tools: [
            { ...topLevel, description: "Conflicting deferred declaration" },
            { type: "function", name: "first", parameters: { type: "object" } },
          ],
        },
        {
          type: "additional_tools",
          tools: [{ type: "function", name: "second", parameters: { type: "object" } }],
        },
        { type: "message", role: "user", content: [{ type: "input_text", text: "go" }] },
      ],
      tools: [topLevel],
    },
    false,
    { provider: "another-provider" }
  ) as ChatRequest;

  assert.deepEqual(
    result.tools.map((tool) => tool.function.name),
    ["lookup", "first", "second"]
  );
  assert.equal(result.tools[0].function.description, "Authoritative top-level declaration");
});

test("Responses -> Chat preserves a namespace that shares a name with a function", () => {
  const result = openaiResponsesToOpenAIRequest(
    "any-model",
    {
      input: [
        {
          type: "additional_tools",
          tools: [
            {
              type: "namespace",
              name: "server",
              tools: [
                {
                  name: "mcp__server__read",
                  parameters: { type: "object", properties: {} },
                },
              ],
            },
          ],
        },
        { type: "message", role: "user", content: [{ type: "input_text", text: "go" }] },
      ],
      tools: [{ type: "function", name: "server", parameters: { type: "object" } }],
    },
    false,
    { provider: "another-provider" }
  ) as ChatRequest;

  assert.deepEqual(
    result.tools.map((tool) => tool.function.name),
    ["server", "mcp__server__read"]
  );
});

test("Responses -> Chat merges members from same-named namespaces", () => {
  const result = openaiResponsesToOpenAIRequest(
    "any-model",
    {
      input: [
        {
          type: "additional_tools",
          tools: [
            {
              type: "namespace",
              name: "server",
              tools: [
                {
                  name: "mcp__server__write",
                  parameters: { type: "object", properties: {} },
                },
              ],
            },
          ],
        },
        { type: "message", role: "user", content: [{ type: "input_text", text: "go" }] },
      ],
      tools: [
        {
          type: "namespace",
          name: "server",
          tools: [
            {
              name: "mcp__server__read",
              parameters: { type: "object", properties: {} },
            },
          ],
        },
      ],
    },
    false,
    { provider: "another-provider" }
  ) as ChatRequest;

  assert.deepEqual(
    result.tools.map((tool) => tool.function.name),
    ["mcp__server__read", "mcp__server__write"]
  );
});

test("Responses -> Chat validates tools supplied through additional_tools", () => {
  assert.throws(
    () =>
      openaiResponsesToOpenAIRequest(
        "any-model",
        {
          input: [
            {
              type: "additional_tools",
              tools: [{ type: "file_search", name: "search" }],
            },
            { type: "message", role: "user", content: "hi" },
          ],
        },
        false,
        { provider: "any-provider" }
      ),
    (error: unknown) => {
      const typedError = error as { statusCode?: number; errorType?: string };
      return typedError.statusCode === 400 && typedError.errorType === "unsupported_feature";
    }
  );
});
