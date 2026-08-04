import assert from "node:assert/strict";
import test from "node:test";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { getClaudeCodeUserAgent } from "../../src/shared/constants/claudeCodeClient.ts";

test("AgentRouter default dispatch uses the Claude Code wire image and x-api-key auth", async () => {
  const originalFetch = globalThis.fetch;
  let captured: { url: string; headers: Headers; body: string } | null = null;

  globalThis.fetch = async (url, init = {}) => {
    captured = {
      url: String(url),
      headers: new Headers(init.headers),
      body: String(init.body || ""),
    };
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const executor = new DefaultExecutor("agentrouter");
    await executor.execute({
      model: "claude-opus-4-8",
      body: {
        model: "claude-opus-4-8",
        messages: [{ role: "user", content: "Reply only OK" }],
        max_tokens: 8,
      },
      stream: false,
      credentials: { apiKey: "test-agentrouter-key" },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.ok(captured);
  assert.equal(captured.url, "https://agentrouter.org/v1/messages?beta=true");
  assert.equal(captured.headers.get("x-api-key"), "test-agentrouter-key");
  assert.equal(captured.headers.get("authorization"), null);
  assert.equal(captured.headers.get("user-agent"), getClaudeCodeUserAgent("cli"));
  assert.equal(captured.headers.get("x-app"), "cli");
  assert.match(captured.body, /cc_version=[^;]+; cc_entrypoint=cli; cch=(?!00000)[0-9a-f]{5};/);
});

test("AgentRouter OpenAI Chat dispatch uses Codex identity without Claude-only behavior", async () => {
  const originalFetch = globalThis.fetch;
  let captured: { url: string; headers: Headers; body: Record<string, unknown> } | null = null;

  globalThis.fetch = async (url, init = {}) => {
    captured = {
      url: String(url),
      headers: new Headers(init.headers),
      body: JSON.parse(String(init.body || "{}")),
    };
    return new Response(JSON.stringify({ choices: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const executor = new DefaultExecutor("agentrouter");
    await executor.execute({
      model: "gpt-5.6-sol",
      body: {
        model: "gpt-5.6-sol",
        messages: [{ role: "user", content: "Reply only OK" }],
        max_completion_tokens: 8,
      },
      stream: false,
      credentials: {
        apiKey: "test-agentrouter-key",
        providerSpecificData: { targetFormat: "openai" },
      },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.ok(captured);
  assert.equal(captured.url, "https://agentrouter.org/v1/chat/completions");
  assert.equal(captured.headers.get("authorization"), "Bearer test-agentrouter-key");
  assert.equal(captured.headers.get("x-api-key"), null);
  assert.equal(captured.headers.get("user-agent"), "codex_cli_rs/0.146.0");
  assert.equal(captured.headers.get("originator"), "codex_cli_rs");
  assert.equal(captured.headers.get("x-app"), null);
  assert.equal(captured.headers.get("anthropic-version"), null);
  assert.equal(captured.body.messages instanceof Array, true);
  assert.doesNotMatch(JSON.stringify(captured.body), /x-anthropic-billing-header|cc_version=/);
});

test("AgentRouter OpenAI Responses dispatch uses the Responses endpoint and Codex identity", async () => {
  const originalFetch = globalThis.fetch;
  let captured: { url: string; headers: Headers; body: Record<string, unknown> } | null = null;

  globalThis.fetch = async (url, init = {}) => {
    captured = {
      url: String(url),
      headers: new Headers(init.headers),
      body: JSON.parse(String(init.body || "{}")),
    };
    return new Response(JSON.stringify({ id: "resp_1", object: "response", output: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    const executor = new DefaultExecutor("agentrouter");
    await executor.execute({
      model: "gpt-5.6-sol",
      body: {
        model: "gpt-5.6-sol",
        input: "Reply only OK",
        max_output_tokens: 8,
      },
      stream: false,
      credentials: {
        apiKey: "test-agentrouter-key",
        providerSpecificData: { targetFormat: "openai-responses" },
      },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.ok(captured);
  assert.equal(captured.url, "https://agentrouter.org/v1/responses");
  assert.equal(captured.headers.get("authorization"), "Bearer test-agentrouter-key");
  assert.equal(captured.headers.get("user-agent"), "codex_cli_rs/0.146.0");
  assert.equal(captured.headers.get("originator"), "codex_cli_rs");
  assert.equal(captured.headers.get("x-app"), null);
  assert.equal(captured.headers.get("anthropic-beta"), null);
  assert.equal(captured.body.input, "Reply only OK");
  assert.equal(captured.body.max_output_tokens, 8);
});
