/**
 * Regression for #16631: the native Claude OAuth / Claude Code block in
 * BaseExecutor.execute rewrote objects it shares with the caller's request body.
 *
 * transformRequest only clones the top level, so tools[], messages[] (and their
 * content blocks), system[], tool_choice, metadata, output_config and every
 * cache_control object are still the caller's. The block then renamed tools
 * (proxy_ prefix strip, read -> Read), prepended the billing line and the
 * Claude Code sentinel to system[], wrote metadata.user_id, deleted
 * output_config.effort, dropped tool cache_control, defaulted cache_control.ttl
 * and stripped server-tool model prefixes on those shared objects.
 *
 * A combo replays that same body on its next step. A fallback to another
 * provider then received `Read` without the _toolNameMap that maps it back, so
 * an OpenCode client got tool_use blocks for a tool it does not have.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { detachClaudeCodeRewriteTargets } from "../../open-sse/executors/claudeOauthBodyIsolation.ts";
import { getExecutor } from "../../open-sse/executors/index.ts";

type Body = Record<string, unknown>;

function clientBody(): Body {
  return {
    model: "claude-opus-4-8",
    max_tokens: 1024,
    system: [
      { type: "text", text: "You are a coding agent.", cache_control: { type: "ephemeral" } },
    ],
    metadata: { user_id: "client-user" },
    output_config: { effort: "low" },
    tools: [
      {
        name: "read",
        description: "Read a file",
        input_schema: { type: "object", properties: { path: { type: "string" } } },
        cache_control: { type: "ephemeral" },
      },
      { name: "proxy_glob", description: "Glob files", input_schema: { type: "object" } },
      { type: "web_search_20250305", name: "web_search", model: "cc/claude-opus-4-8" },
    ],
    tool_choice: { type: "tool", name: "read" },
    messages: [
      {
        role: "user",
        content: [{ type: "text", text: "read a.ts", cache_control: { type: "ephemeral" } }],
      },
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "toolu_1", name: "read", input: { path: "a.ts" } }],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "toolu_1", content: "export {}" }],
      },
    ],
  };
}

async function runClaudeStep(body: Body): Promise<Body> {
  const executor = await getExecutor("claude");
  const originalFetch = globalThis.fetch;
  let upstream: Body | null = null;
  globalThis.fetch = async (_url: string | URL | Request, init: RequestInit = {}) => {
    upstream = JSON.parse(String(init.body));
    return new Response(JSON.stringify({ id: "msg_1", type: "message", content: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
  try {
    await executor.execute({
      model: "claude-opus-4-8",
      body,
      stream: false,
      credentials: { accessToken: "sk-ant-oat-test-16631" },
      clientHeaders: { "x-app": "cli", "x-omniroute-effort": "off" },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
  assert.ok(upstream, "the executor must have called fetch");
  return upstream!;
}

const toolNames = (b: Body) => (b.tools as Array<Body>).map((t) => t.name);

test("#16631: the Claude OAuth step leaves the caller's body untouched", async () => {
  const body = clientBody();
  const before = structuredClone(body);

  const upstream = await runClaudeStep(body);

  // The wire body is still rewritten for Claude Code ...
  assert.ok(toolNames(upstream).includes("Read"), "upstream tools are TitleCase");
  assert.ok(toolNames(upstream).includes("Glob"), "proxy_ prefix stripped upstream");
  const sys = upstream.system as Array<Body>;
  assert.match(String(sys[0].text), /x-anthropic-billing-header/);

  // ... while the body a combo replays on its next step is exactly what the client sent.
  assert.deepEqual(body, before);
});

test("#16631: a fallback step after the Claude step sees the client's tool names", async () => {
  const body = clientBody();
  await runClaudeStep(body);

  assert.deepEqual(toolNames(body), ["read", "proxy_glob", "web_search"]);
  const assistant = (body.messages as Array<Body>)[1].content as Array<Body>;
  assert.equal(assistant[0].name, "read");
  assert.deepEqual(body.tool_choice, { type: "tool", name: "read" });
  assert.equal((body.system as Array<Body>).length, 1, "no billing/sentinel blocks leaked");
});

test("#16631: replaying the same body on the Claude step builds the same wire body", async () => {
  const body = clientBody();
  const first = await runClaudeStep(body);
  const second = await runClaudeStep(body);

  // metadata.user_id is derived per account and session, not from the body.
  assert.deepEqual(second.tools, first.tools);
  assert.deepEqual(second.messages, first.messages);
  assert.deepEqual(second.system, first.system);
  assert.deepEqual(second.tool_choice, first.tool_choice);
});

test("#16631: detachClaudeCodeRewriteTargets copies the rewritten containers, not the leaves", () => {
  const body = clientBody();
  const tb: Body = { ...body };
  detachClaudeCodeRewriteTargets(tb);

  const [tool] = tb.tools as Array<Body>;
  const [original] = body.tools as Array<Body>;
  assert.notEqual(tb.tools, body.tools);
  assert.notEqual(tool, original);
  assert.notEqual(tool.cache_control, original.cache_control);
  assert.equal(tool.input_schema, original.input_schema, "schemas are shared, not deep-copied");

  const block = ((tb.messages as Array<Body>)[1].content as Array<Body>)[0];
  const originalBlock = ((body.messages as Array<Body>)[1].content as Array<Body>)[0];
  assert.notEqual(block, originalBlock);
  assert.equal(block.input, originalBlock.input);

  assert.notEqual(tb.system, body.system);
  for (const key of ["tool_choice", "metadata", "output_config"]) {
    assert.notEqual(tb[key], body[key], key);
    assert.deepEqual(tb[key], body[key], key);
  }

  const bare: Body = { messages: [{ role: "user", content: "hi" }] };
  detachClaudeCodeRewriteTargets(bare);
  assert.deepEqual(Object.keys(bare), ["messages"], "absent fields stay absent");
});
