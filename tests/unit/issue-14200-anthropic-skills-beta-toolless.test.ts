/**
 * TDD Regression test for Issue #14200:
 * Anthropic path always sends skills-2025-10-02, causing tool-less requests to fail with 400.
 *
 * Requirements:
 * 1. Static ANTHROPIC_BETA_API_KEY and ANTHROPIC_BETA_CLAUDE_OAUTH must NOT contain skills-2025-10-02 statically.
 * 2. Tool-less requests through Anthropic executors/builders must NOT emit skills-2025-10-02.
 * 3. Requests with unrelated tools (e.g. get_weather) must NOT emit skills-2025-10-02.
 * 4. Requests with code_execution tool (type: code_execution_20250825, name: code_execution, etc.) MUST emit skills-2025-10-02.
 * 5. Clients explicitly passing Anthropic-Beta: skills-2025-10-02 only have it forwarded via mergeClientAnthropicBeta when body contains code_execution tool (prevents client injection bypass).
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  ANTHROPIC_BETA_API_KEY,
  ANTHROPIC_BETA_CLAUDE_OAUTH,
  SKILLS_BETA_HEADER,
  hasCodeExecutionTool,
  maybeAppendSkillsBeta,
  mergeClientAnthropicBeta,
  FORWARDABLE_CLIENT_BETAS,
} = await import("../../open-sse/config/anthropicHeaders.ts");

const { buildProviderHeaders } = await import("../../open-sse/services/provider.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");

const SKILLS = SKILLS_BETA_HEADER;
const CODE_EXECUTION = "code-execution-2025-08-25";

test("Issue #14200: static ANTHROPIC_BETA_API_KEY must NOT include skills beta unconditionally", () => {
  const tokens = ANTHROPIC_BETA_API_KEY.split(",").map((s) => s.trim());
  assert.ok(
    !tokens.includes(SKILLS),
    `skills beta must not be statically present in ANTHROPIC_BETA_API_KEY (causes 400 on tool-less requests): ${ANTHROPIC_BETA_API_KEY}`
  );
  assert.ok(
    tokens.includes(CODE_EXECUTION),
    `code-execution beta must remain in ANTHROPIC_BETA_API_KEY: ${ANTHROPIC_BETA_API_KEY}`
  );
});

test("Issue #14200: static ANTHROPIC_BETA_CLAUDE_OAUTH must NOT include skills beta unconditionally", () => {
  const tokens = ANTHROPIC_BETA_CLAUDE_OAUTH.split(",").map((s) => s.trim());
  assert.ok(
    !tokens.includes(SKILLS),
    `skills beta must not be statically present in ANTHROPIC_BETA_CLAUDE_OAUTH: ${ANTHROPIC_BETA_CLAUDE_OAUTH}`
  );
});

test("Issue #14200: hasCodeExecutionTool correctly identifies code execution tools", () => {
  assert.equal(hasCodeExecutionTool(null), false);
  assert.equal(hasCodeExecutionTool({}), false);
  assert.equal(hasCodeExecutionTool({ messages: [{ role: "user", content: "hi" }] }), false);
  assert.equal(
    hasCodeExecutionTool({
      tools: [{ type: "function", function: { name: "get_weather" } }],
    }),
    false
  );
  // Anthropic built-in code_execution tool type with version suffix
  assert.equal(
    hasCodeExecutionTool({
      tools: [{ type: "code_execution_20250825", name: "code_execution" }],
    }),
    true
  );
  // Anthropic code_execution tool by name
  assert.equal(
    hasCodeExecutionTool({
      tools: [{ name: "code_execution" }],
    }),
    true
  );
  // Anthropic code_execution tool by type prefix
  assert.equal(
    hasCodeExecutionTool({
      tools: [{ type: "code_execution" }],
    }),
    true
  );
  // OpenAI format code_execution tool
  assert.equal(
    hasCodeExecutionTool({
      tools: [{ type: "function", function: { name: "code_execution" } }],
    }),
    true
  );
  // Serialized JSON string body support (Issue review finding)
  assert.equal(
    hasCodeExecutionTool(
      JSON.stringify({
        tools: [{ type: "code_execution_20250825", name: "code_execution" }],
      })
    ),
    true
  );
  // Malformed / invalid inputs
  assert.equal(hasCodeExecutionTool("invalid-json"), false);
  assert.equal(hasCodeExecutionTool({ tools: "not-an-array" }), false);
  assert.equal(hasCodeExecutionTool({ tools: ["just-a-string"] }), false);
  assert.equal(hasCodeExecutionTool({ tools: [null, undefined, 123] }), false);
});

test("Issue #14200: buildProviderHeaders omits skills beta for tool-less requests", () => {
  const headers = buildProviderHeaders("anthropic", { apiKey: "test-key" }, true, {
    messages: [{ role: "user", content: "Reply only: OK" }],
  });
  const beta = headers["Anthropic-Beta"] || headers["anthropic-beta"] || "";
  const tokens = beta.split(",").map((s) => s.trim());
  assert.ok(!tokens.includes(SKILLS), `tool-less request must not include skills beta: ${beta}`);
  assert.ok(
    tokens.includes(CODE_EXECUTION),
    `code-execution beta should remain in headers: ${beta}`
  );
});

test("Issue #14200: buildProviderHeaders includes skills beta when code_execution tool is present", () => {
  const headers = buildProviderHeaders("anthropic", { apiKey: "test-key" }, true, {
    messages: [{ role: "user", content: "Run code" }],
    tools: [{ type: "code_execution_20250825", name: "code_execution" }],
  });
  const beta = headers["Anthropic-Beta"] || headers["anthropic-beta"] || "";
  const tokens = beta.split(",").map((s) => s.trim());
  assert.ok(
    tokens.includes(SKILLS),
    `request with code_execution tool must include skills beta: ${beta}`
  );
  assert.ok(
    tokens.includes(CODE_EXECUTION),
    `request with code_execution tool must preserve existing betas: ${beta}`
  );

  // Also verify with serialized JSON string body
  const headersWithString = buildProviderHeaders(
    "anthropic",
    { apiKey: "test-key" },
    true,
    JSON.stringify({
      messages: [{ role: "user", content: "Run code" }],
      tools: [{ type: "code_execution_20250825", name: "code_execution" }],
    })
  );
  const betaStr = headersWithString["Anthropic-Beta"] || headersWithString["anthropic-beta"] || "";
  assert.ok(
    betaStr
      .split(",")
      .map((s) => s.trim())
      .includes(SKILLS),
    `request with stringified body must also include skills beta: ${betaStr}`
  );
});

test("Issue #14200: DefaultExecutor buildHeaders includes skills beta only when code_execution tool is present", () => {
  const executor = new DefaultExecutor("anthropic");

  // Tool-less request
  const noToolHeaders = executor.buildHeaders(
    { apiKey: "test-key" },
    true,
    null,
    "claude-sonnet-5",
    undefined,
    { messages: [{ role: "user", content: "hi" }] }
  );
  const noToolBeta = noToolHeaders["Anthropic-Beta"] || noToolHeaders["anthropic-beta"] || "";
  assert.ok(
    !noToolBeta
      .split(",")
      .map((s) => s.trim())
      .includes(SKILLS),
    `tool-less executor headers must not have skills beta: ${noToolBeta}`
  );

  // Request with code_execution tool
  const toolHeaders = executor.buildHeaders(
    { apiKey: "test-key" },
    true,
    null,
    "claude-sonnet-5",
    undefined,
    {
      messages: [{ role: "user", content: "run code" }],
      tools: [{ type: "code_execution_20250825", name: "code_execution" }],
    }
  );
  const toolBeta = toolHeaders["Anthropic-Beta"] || toolHeaders["anthropic-beta"] || "";
  assert.ok(
    toolBeta
      .split(",")
      .map((s) => s.trim())
      .includes(SKILLS),
    `executor headers with code_execution must have skills beta: ${toolBeta}`
  );
});

test("Issue #14200: mergeClientAnthropicBeta drops client-negotiated skills beta on tool-less body", () => {
  const baseHeaders = "claude-code-20250219,code-execution-2025-08-25";

  // Case 1: Body has no code_execution tool -> skills beta must be filtered out
  const toollessBody = { messages: [{ role: "user", content: "hello" }] };
  const mergedToolless = mergeClientAnthropicBeta(
    baseHeaders,
    `claude-code-20250219,${SKILLS}`,
    undefined,
    null,
    toollessBody
  );
  const toollessTokens = mergedToolless.split(",").map((s) => s.trim());
  assert.ok(
    !toollessTokens.includes(SKILLS),
    `skills beta must be omitted when client requested it but body lacks code_execution tool: ${mergedToolless}`
  );

  // Case 2: Body has code_execution tool -> skills beta must be forwarded
  const toolBody = {
    messages: [{ role: "user", content: "run code" }],
    tools: [{ type: "code_execution_20250825", name: "code_execution" }],
  };
  const mergedTool = mergeClientAnthropicBeta(
    baseHeaders,
    `claude-code-20250219,${SKILLS}`,
    undefined,
    null,
    toolBody
  );
  const toolTokens = mergedTool.split(",").map((s) => s.trim());
  assert.ok(
    toolTokens.includes(SKILLS),
    `skills beta must be forwarded when client requested it and body has code_execution tool: ${mergedTool}`
  );

  // Case 3: Legacy/direct caller with undefined or null body preserves backward compatibility
  const mergedLegacy = mergeClientAnthropicBeta(baseHeaders, `claude-code-20250219,${SKILLS}`);
  const legacyTokens = mergedLegacy.split(",").map((s) => s.trim());
  assert.ok(
    legacyTokens.includes(SKILLS),
    `legacy caller with undefined body must preserve skills beta: ${mergedLegacy}`
  );
  const mergedNullBody = mergeClientAnthropicBeta(
    baseHeaders,
    `claude-code-20250219,${SKILLS}`,
    undefined,
    null,
    null
  );
  const nullBodyTokens = mergedNullBody.split(",").map((s) => s.trim());
  assert.ok(
    nullBodyTokens.includes(SKILLS),
    `legacy caller with explicit null body must preserve skills beta: ${mergedNullBody}`
  );
  assert.ok(
    FORWARDABLE_CLIENT_BETAS.includes(SKILLS),
    `FORWARDABLE_CLIENT_BETAS must still include skills beta`
  );
});

test("Issue #14200: Claude-Code-Compatible providers (agentrouter and anthropic-compatible-cc-*) include skills beta only with code_execution", () => {
  // 0. Explicit null body check
  const nullBodyHeaders = buildProviderHeaders("anthropic", { apiKey: "test-key" }, true, null);
  const nullBodyBeta = nullBodyHeaders["Anthropic-Beta"] || nullBodyHeaders["anthropic-beta"] || "";
  assert.ok(
    !nullBodyBeta
      .split(",")
      .map((s) => s.trim())
      .includes(SKILLS),
    `explicit null body must not have skills beta: ${nullBodyBeta}`
  );

  // 1. Built-in usesCcWireImage provider (agentrouter)
  const noToolHeaders = buildProviderHeaders("agentrouter", { apiKey: "test-key" }, true, {
    messages: [{ role: "user", content: "hi" }],
  });
  const noToolBeta = noToolHeaders["Anthropic-Beta"] || noToolHeaders["anthropic-beta"] || "";
  assert.ok(
    !noToolBeta
      .split(",")
      .map((s) => s.trim())
      .includes(SKILLS),
    `tool-less agentrouter must not have skills beta: ${noToolBeta}`
  );

  const toolHeaders = buildProviderHeaders("agentrouter", { apiKey: "test-key" }, true, {
    messages: [{ role: "user", content: "run code" }],
    tools: [{ type: "code_execution_20250825", name: "code_execution" }],
  });
  const toolBeta = toolHeaders["Anthropic-Beta"] || toolHeaders["anthropic-beta"] || "";
  assert.ok(
    toolBeta
      .split(",")
      .map((s) => s.trim())
      .includes(SKILLS),
    `agentrouter with code_execution must have skills beta: ${toolBeta}`
  );

  // 2. Prefix-based Claude-Code-Compatible provider (anthropic-compatible-cc-custom)
  const prefixNoToolHeaders = buildProviderHeaders(
    "anthropic-compatible-cc-custom",
    { apiKey: "test-key" },
    true,
    {
      messages: [{ role: "user", content: "hi" }],
    }
  );
  const prefixNoToolBeta =
    prefixNoToolHeaders["Anthropic-Beta"] || prefixNoToolHeaders["anthropic-beta"] || "";
  assert.ok(
    !prefixNoToolBeta
      .split(",")
      .map((s) => s.trim())
      .includes(SKILLS),
    `tool-less anthropic-compatible-cc-custom must not have skills beta: ${prefixNoToolBeta}`
  );

  const prefixToolHeaders = buildProviderHeaders(
    "anthropic-compatible-cc-custom",
    { apiKey: "test-key" },
    true,
    {
      messages: [{ role: "user", content: "run code" }],
      tools: [{ type: "code_execution_20250825", name: "code_execution" }],
    }
  );
  const prefixToolBeta =
    prefixToolHeaders["Anthropic-Beta"] || prefixToolHeaders["anthropic-beta"] || "";
  assert.ok(
    prefixToolBeta
      .split(",")
      .map((s) => s.trim())
      .includes(SKILLS),
    `anthropic-compatible-cc-custom with code_execution must have skills beta: ${prefixToolBeta}`
  );
});

test("Issue #14200: maybeAppendSkillsBeta does NOT inject skills beta for OpenAI-compatible providers even if body has code_execution", () => {
  const headers: Record<string, string> = { Authorization: "Bearer token" };
  maybeAppendSkillsBeta(headers, "openai", {
    tools: [{ type: "code_execution_20250825" }],
  });
  assert.strictEqual(
    headers["anthropic-beta"],
    undefined,
    "non-Anthropic provider must not receive anthropic-beta"
  );

  // Even if non-Anthropic provider headers somehow had anthropic-beta, do not inject skills
  const headersWithBeta: Record<string, string> = {
    Authorization: "Bearer sk-test",
    "anthropic-beta": "prompt-caching-2024-07-31",
  };
  maybeAppendSkillsBeta(headersWithBeta, "openai", {
    tools: [{ type: "code_execution_20250825" }],
  });
  assert.strictEqual(
    headersWithBeta["anthropic-beta"],
    "prompt-caching-2024-07-31",
    "openai provider must never receive skills beta"
  );

  const headersEmptyProvider: Record<string, string> = {
    Authorization: "Bearer sk-test",
    "anthropic-beta": "prompt-caching-2024-07-31",
  };
  maybeAppendSkillsBeta(headersEmptyProvider, "", {
    tools: [{ type: "code_execution_20250825" }],
  });
  assert.strictEqual(
    headersEmptyProvider["anthropic-beta"],
    "prompt-caching-2024-07-31",
    "empty provider string must not be assumed Anthropic family (#14200)"
  );
});
