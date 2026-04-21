import test from "node:test";
import assert from "node:assert/strict";

const {
  CLAUDE_CODE_COMPATIBLE_DEFAULT_MAX_TOKENS,
  stripClaudeCodeCompatibleEndpointSuffix,
  joinBaseUrlAndPath,
  joinClaudeCodeCompatibleUrl,
  resolveClaudeCodeCompatibleSessionId,
  resolveClaudeCodeCompatibleEffort,
  resolveClaudeCodeCompatibleMaxTokens,
  buildClaudeCodeCompatibleRequest,
} = await import("../../open-sse/services/claudeCodeCompatible.ts");
const { getModelsByProviderId } = await import("../../open-sse/config/providerModels.ts");

function getClaudeEffortFixtures() {
  const claudeModels = getModelsByProviderId("claude");
  const xhighModel = claudeModels.find((model) => model.supportsXHighEffort === true);
  const standardModel = claudeModels.find((model) => model.supportsXHighEffort === false);
  assert.ok(xhighModel, "expected at least one Claude model with xhigh support");
  assert.ok(standardModel, "expected at least one Claude model without xhigh support");
  return { xhighModel, standardModel };
}

test("Claude Code compatible URL helpers cover empty values, version trimming and legacy session headers", () => {
  assert.equal(stripClaudeCodeCompatibleEndpointSuffix(""), "");
  assert.equal(
    stripClaudeCodeCompatibleEndpointSuffix("https://api.example.com/v1/messages"),
    "https://api.example.com"
  );
  assert.equal(
    joinBaseUrlAndPath("https://api.example.com/v1", "v1/messages"),
    "https://api.example.com/v1/messages"
  );
  assert.equal(
    joinClaudeCodeCompatibleUrl("https://api.example.com/v1/messages", "models"),
    "https://api.example.com/models"
  );
  assert.equal(
    resolveClaudeCodeCompatibleSessionId({ "x-omniroute-session": " session-from-proxy " }),
    "session-from-proxy"
  );
});

test("Claude Code compatible effort and max token helpers cover priority fallbacks", () => {
  const { xhighModel, standardModel } = getClaudeEffortFixtures();
  assert.equal(resolveClaudeCodeCompatibleEffort({ reasoning_effort: "medium" }), "medium");
  assert.equal(resolveClaudeCodeCompatibleEffort({ reasoning: { effort: "none" } }), "low");
  assert.equal(
    resolveClaudeCodeCompatibleEffort({ output_config: { effort: "xhigh" } }, null, xhighModel.id),
    "xhigh"
  );
  assert.equal(
    resolveClaudeCodeCompatibleEffort(
      { output_config: { effort: "xhigh" } },
      null,
      standardModel.id
    ),
    "high"
  );
  assert.equal(
    resolveClaudeCodeCompatibleEffort({ output_config: { effort: "unexpected" } }),
    "high"
  );

  assert.equal(resolveClaudeCodeCompatibleMaxTokens({ max_completion_tokens: "17" }), 17);
  assert.equal(
    resolveClaudeCodeCompatibleMaxTokens({ max_output_tokens: -1 }, { max_tokens: 9 }),
    9
  );
  assert.equal(resolveClaudeCodeCompatibleMaxTokens({}, { max_output_tokens: "31.9" }), 31);
  assert.equal(
    resolveClaudeCodeCompatibleMaxTokens({}, {}),
    CLAUDE_CODE_COMPATIBLE_DEFAULT_MAX_TOKENS
  );
});

test("buildClaudeCodeCompatibleRequest covers normalized OpenAI-style messages, source tools and fallback text", () => {
  const payload = buildClaudeCodeCompatibleRequest({
    sourceBody: {
      tools: [
        null,
        {
          type: "function",
          function: {
            name: "lookup_account",
            description: "Find account data",
            parameters: { type: "object" },
            defer_loading: true,
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "lookup_account" } },
      reasoning: { effort: "disabled" },
      max_completion_tokens: 19,
    },
    normalizedBody: {
      messages: [
        { role: "assistant", content: [{ type: "text", text: "draft answer" }] },
        { role: "model", content: { text: "alternate answer" } },
        { role: "system", content: "system note" },
        { role: "developer", content: [{ type: "text", text: "developer note" }] },
        { role: "tool", content: "ignored" },
      ],
    },
    model: "claude-sonnet-4-6",
    cwd: "/tmp/claude-code-compatible",
    now: new Date("2026-01-02T12:00:00.000Z"),
  });

  assert.deepEqual(payload.messages, [
    {
      role: "user",
      content: [{ type: "text", text: "draft answer\nalternate answer" }],
    },
  ]);
  assert.equal(payload.system.length, 3);
  assert.match(payload.system[0].text, /Claude Agent SDK/);
  assert.equal(payload.system[1].text, "system note");
  assert.equal(payload.system[2].text, "developer note");
  assert.equal(payload.tools.length, 1);
  assert.deepEqual(payload.tools[0], {
    name: "lookup_account",
    description: "Find account data",
    input_schema: { type: "object", properties: {} },
    defer_loading: true,
  });
  assert.deepEqual(payload.tool_choice, { type: "tool", name: "lookup_account" });
  assert.equal(payload.output_config.effort, "low");
  assert.equal(payload.max_tokens, 19);
});

test("buildClaudeCodeCompatibleRequest covers Claude-native bodies and cache-control stripping", () => {
  const stripped = buildClaudeCodeCompatibleRequest({
    claudeBody: {
      system: [{ type: "text", text: "sys", cache_control: { type: "ephemeral" } }],
      messages: [
        {
          role: "assistant",
          content: [{ type: "text", text: "prefill", cache_control: { type: "ephemeral" } }],
        },
        {
          role: "user",
          content: [
            { type: "text", text: "ask", cache_control: { type: "ephemeral" } },
            {
              type: "image",
              source: { type: "base64", media_type: "image/png", data: "abc" },
              cache_control: { type: "ephemeral" },
            },
          ],
        },
        {
          role: "assistant",
          content: [{ type: "text", text: "tail", cache_control: { type: "ephemeral" } }],
        },
      ],
      tools: [
        { name: "toolA", input_schema: { type: "object" }, cache_control: { type: "ephemeral" } },
      ],
      thinking: { type: "enabled", budget_tokens: 12 },
      output_config: { format: "compact" },
      metadata: { foo: "bar" },
    },
    model: "claude-sonnet-4-6",
    preserveCacheControl: false,
    cwd: "/tmp/claude-code-compatible",
    now: new Date("2026-01-02T12:00:00.000Z"),
    stream: true,
    sessionId: "explicit-session",
  });

  const preserved = buildClaudeCodeCompatibleRequest({
    claudeBody: {
      system: [{ type: "text", text: "sys", cache_control: { type: "ephemeral" } }],
      messages: [
        {
          role: "assistant",
          content: [{ type: "text", text: "prefill", cache_control: { type: "ephemeral" } }],
        },
        {
          role: "user",
          content: [{ type: "text", text: "ask", cache_control: { type: "ephemeral" } }],
        },
      ],
      tools: [
        { name: "toolA", input_schema: { type: "object" }, cache_control: { type: "ephemeral" } },
      ],
    },
    model: "claude-sonnet-4-6",
    preserveCacheControl: true,
    cwd: "/tmp/claude-code-compatible",
    now: new Date("2026-01-02T12:00:00.000Z"),
  });

  assert.equal(stripped.stream, true);
  assert.equal(JSON.parse(stripped.metadata.user_id).session_id, "explicit-session");
  assert.equal(stripped.messages.at(-1).role, "user");
  assert.equal(stripped.system[0].cache_control, undefined);
  assert.equal(stripped.messages[0].content[0].cache_control, undefined);
  assert.equal(stripped.tools[0].cache_control, undefined);
  assert.deepEqual(stripped.thinking, { type: "enabled", budget_tokens: 12 });
  assert.deepEqual(stripped.output_config, { effort: "high", format: "compact" });
  assert.equal(stripped.metadata.foo, "bar");
  assert.deepEqual(preserved.system[0].cache_control, { type: "ephemeral" });
  assert.equal(preserved.messages[0].content[0].cache_control.type, "ephemeral");
  assert.equal(preserved.tools[0].cache_control.type, "ephemeral");
});

test("buildClaudeCodeCompatibleRequest omits tool choice when there are no tools", () => {
  const payload = buildClaudeCodeCompatibleRequest({
    normalizedBody: {
      messages: [{ role: "user", content: "hello" }],
      tool_choice: "required",
      reasoning_effort: "high",
    },
    model: "claude-sonnet-4-6",
    cwd: "/tmp/claude-code-compatible",
    now: new Date("2026-01-02T12:00:00.000Z"),
  });

  assert.equal(payload.tools.length, 0);
  assert.equal("tool_choice" in payload, false);
  assert.equal(payload.output_config.effort, "high");
  assert.equal(payload.system.length, 1);
  assert.match(payload.system[0].text, /Claude Agent SDK/);
});

test("buildClaudeCodeCompatibleRequest covers string system input, non-array Claude fields and tool choice variants", () => {
  const anyChoice = buildClaudeCodeCompatibleRequest({
    normalizedBody: {
      messages: [{ role: "user", content: "hello" }],
      tools: [
        {
          name: "direct_tool",
          input_schema: { type: "object", properties: { q: { type: "string" } } },
        },
        {
          type: "function",
          function: {
            name: "missing_description",
            parameters: { type: "object", properties: { x: { type: "string" } } },
          },
        },
        { type: "function", function: { parameters: { type: "object" } } },
      ],
      tool_choice: { type: "any" },
    },
    model: "claude-sonnet-4-6",
    cwd: "/tmp/claude-code-compatible",
    now: new Date("2026-01-02T12:00:00.000Z"),
  });

  const stringSystem = buildClaudeCodeCompatibleRequest({
    claudeBody: {
      system: "  custom system  ",
      messages: "not-an-array",
      tools: "not-an-array",
      thinking: "disabled",
    },
    model: "claude-sonnet-4-6",
    cwd: "/tmp/claude-code-compatible",
    now: new Date("2026-01-02T12:00:00.000Z"),
  });

  assert.deepEqual(anyChoice.tool_choice, { type: "any" });
  assert.equal(anyChoice.tools.length, 2);
  assert.equal(anyChoice.tools[0].input_schema.properties.q.type, "string");
  assert.equal(anyChoice.tools[1].description, "");
  assert.equal(stringSystem.messages.length, 0);
  assert.equal(stringSystem.tools.length, 0);
  assert.equal(stringSystem.system.at(-1).text, "custom system");
});
