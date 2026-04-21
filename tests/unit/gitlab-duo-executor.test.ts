import test from "node:test";
import assert from "node:assert/strict";

import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";

const originalFetch = globalThis.fetch;

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
});

test("GitLab Duo providers resolve to the specialized gitlab executor", () => {
  assert.equal(hasSpecializedExecutor("gitlab-duo"), true);
  assert.equal(hasSpecializedExecutor("gitlab-duo-oauth"), true);
  assert.equal(getExecutor("gitlab-duo").constructor.name, "GitLabExecutor");
  assert.equal(getExecutor("gitlab-duo-oauth").constructor.name, "GitLabExecutor");
});

test("GitLabExecutor uses direct_access and OpenAI gateway routing for GPT-family models", async () => {
  const executor = getExecutor("gitlab-duo-oauth");
  const calls: Array<{ url: string; init: RequestInit | undefined }> = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });

    if (calls.length === 1) {
      return jsonResponse({
        base_url: "https://duo-gateway.example.com/ai",
        token: "duo-token-openai",
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        headers: {
          "X-GitLab-Feature": "duo",
        },
        model_details: {
          model_provider: "openai",
          model_name: "duo-chat-gpt-5-2",
        },
      });
    }

    return jsonResponse({
      id: "chatcmpl-test",
      object: "chat.completion",
      created: 1,
      model: "duo-chat-gpt-5-2",
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: "ok" },
          finish_reason: "stop",
        },
      ],
    });
  };

  const result = await executor.execute({
    model: "duo-chat-gpt-5-2",
    body: {
      model: "duo-chat-gpt-5-2",
      messages: [{ role: "user", content: "hello" }],
    },
    stream: false,
    credentials: {
      accessToken: "oauth-access-token",
      refreshToken: "oauth-refresh-token",
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      connectionId: "gitlab-openai-conn",
      providerSpecificData: {
        baseUrl: "https://gitlab.com/api/v4/ai/chat/completions",
      },
    },
  });

  assert.equal(calls.length, 2);
  assert.equal(calls[0].url, "https://gitlab.com/api/v4/code_suggestions/direct_access");
  assert.equal(
    calls[1].url,
    "https://duo-gateway.example.com/ai/v1/proxy/openai/v1/chat/completions"
  );
  assert.equal(
    (calls[1].init?.headers as Record<string, string>)["Authorization"],
    "Bearer duo-token-openai"
  );
  assert.equal((calls[1].init?.headers as Record<string, string>)["X-GitLab-Feature"], "duo");
  assert.equal(result.url, calls[1].url);
});

test("GitLabExecutor uses Anthropic gateway routing for Claude-family models", async () => {
  const executor = getExecutor("gitlab-duo-oauth");
  const calls: Array<{ url: string; init: RequestInit | undefined }> = [];

  globalThis.fetch = async (url, init) => {
    calls.push({ url: String(url), init });

    if (calls.length === 1) {
      return jsonResponse({
        base_url: "https://duo-gateway.example.com/ai",
        token: "duo-token-anthropic",
        expires_at: Math.floor(Date.now() / 1000) + 3600,
        headers: {
          "X-GitLab-Feature": "duo-claude",
        },
        model_details: {
          model_provider: "anthropic",
          model_name: "duo-chat-sonnet-4-6",
        },
      });
    }

    return jsonResponse({
      id: "msg_123",
      type: "message",
      role: "assistant",
      model: "duo-chat-sonnet-4-6",
      content: [{ type: "text", text: "ok" }],
      stop_reason: "end_turn",
      usage: { input_tokens: 3, output_tokens: 2 },
    });
  };

  const result = await executor.execute({
    model: "duo-chat-sonnet-4-6",
    body: {
      model: "duo-chat-sonnet-4-6",
      max_tokens: 32,
      messages: [{ role: "user", content: [{ type: "text", text: "hello" }] }],
    },
    stream: false,
    credentials: {
      accessToken: "oauth-access-token",
      refreshToken: "oauth-refresh-token",
      expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      connectionId: "gitlab-anthropic-conn",
      providerSpecificData: {
        baseUrl: "https://gitlab.com/api/v4/ai/chat/completions",
      },
    },
  });

  assert.equal(calls.length, 2);
  assert.equal(calls[1].url, "https://duo-gateway.example.com/ai/v1/proxy/anthropic/messages");
  assert.equal(
    (calls[1].init?.headers as Record<string, string>)["x-api-key"],
    "duo-token-anthropic"
  );
  assert.equal(
    (calls[1].init?.headers as Record<string, string>)["X-GitLab-Feature"],
    "duo-claude"
  );
  assert.equal(result.url, calls[1].url);
});
