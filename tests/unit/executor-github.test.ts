import test from "node:test";
import assert from "node:assert/strict";

import { GithubExecutor } from "../../open-sse/executors/github.ts";
import { PROVIDER_MODELS } from "../../open-sse/config/providerModels.ts";

function registerModel(provider, model) {
  PROVIDER_MODELS[provider] = [...(PROVIDER_MODELS[provider] || []), model];
}

test("GithubExecutor.buildUrl routes response-format models to /responses", () => {
  const originalModels = [...(PROVIDER_MODELS.gh || [])];
  registerModel("gh", {
    id: "gpt-4.1-responses",
    name: "GPT 4.1 Responses",
    targetFormat: "openai-responses",
  });

  try {
    const executor = new GithubExecutor();
    const url = executor.buildUrl("gpt-4.1-responses", true);
    assert.equal(url, "https://api.githubcopilot.com/responses");
  } finally {
    PROVIDER_MODELS.gh = originalModels;
  }
});

test("GithubExecutor.transformRequest injects JSON response instructions for Claude and strips reasoning fields", () => {
  const executor = new GithubExecutor();
  const body = {
    response_format: {
      type: "json_object",
    },
    messages: [
      { role: "user", content: "Return JSON" },
      {
        role: "assistant",
        content: "draft",
        reasoning_text: "internal",
        reasoning_content: "internal",
      },
    ],
  };

  const result = executor.transformRequest("claude-sonnet-4", body, true, {});

  assert.equal(result.response_format, undefined);
  assert.equal(result.messages[0].role, "system");
  assert.match(result.messages[0].content, /Respond only with valid JSON/);
  assert.equal(result.messages[2].reasoning_text, undefined);
  assert.equal(result.messages[2].reasoning_content, undefined);
});

test("GithubExecutor.buildHeaders prefers Copilot token and sets GitHub-specific headers", () => {
  const executor = new GithubExecutor();
  const headers = executor.buildHeaders(
    {
      accessToken: "gh-access-token",
      providerSpecificData: { copilotToken: "copilot-token" },
    },
    true
  );

  assert.equal(headers.Authorization, "Bearer copilot-token");
  assert.equal(headers.Accept, "text/event-stream");
  assert.equal(headers["x-github-api-version"], "2025-04-01");
  assert.equal(headers["openai-intent"], "conversation-panel");
  assert.ok(headers["x-request-id"]);
});

test("GithubExecutor.refreshCredentials returns Copilot token directly when available", async () => {
  const executor = new GithubExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    assert.match(String(url), /copilot_internal\/v2\/token$/);
    assert.equal(options.headers.Authorization, "token gh-access-token");
    return new Response(
      JSON.stringify({
        token: "copilot-token",
        expires_at: 1_777_777_777,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  try {
    const result = await executor.refreshCredentials({ accessToken: "gh-access-token" }, null);
    assert.deepEqual(result, {
      accessToken: "gh-access-token",
      refreshToken: undefined,
      copilotToken: "copilot-token",
      copilotTokenExpiresAt: 1_777_777_777,
      providerSpecificData: {
        copilotToken: "copilot-token",
        copilotTokenExpiresAt: 1_777_777_777,
      },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GithubExecutor.refreshCredentials falls back to GitHub OAuth refresh before retrying Copilot", async () => {
  const executor = new GithubExecutor();
  const originalFetch = globalThis.fetch;
  const calls = [];

  globalThis.fetch = async (url, options = {}) => {
    calls.push(String(url));

    if (String(url).includes("/copilot_internal/v2/token") && calls.length === 1) {
      return new Response("unauthorized", { status: 401 });
    }

    if (String(url).includes("/oauth/access_token")) {
      return new Response(
        JSON.stringify({
          access_token: "new-gh-token",
          refresh_token: "new-refresh-token",
          expires_in: 3600,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    if (String(url).includes("/copilot_internal/v2/token")) {
      assert.equal(options.headers.Authorization, "token new-gh-token");
      return new Response(
        JSON.stringify({
          token: "new-copilot-token",
          expires_at: 1_888_888_888,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    throw new Error(`unexpected url: ${url}`);
  };

  try {
    const result = await executor.refreshCredentials(
      {
        accessToken: "old-gh-token",
        refreshToken: "refresh-token",
      },
      null
    );

    assert.deepEqual(result, {
      accessToken: "new-gh-token",
      refreshToken: "new-refresh-token",
      expiresIn: 3600,
      copilotToken: "new-copilot-token",
      copilotTokenExpiresAt: 1_888_888_888,
      providerSpecificData: {
        copilotToken: "new-copilot-token",
        copilotTokenExpiresAt: 1_888_888_888,
      },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GithubExecutor.needsRefresh checks missing and expiring Copilot tokens", () => {
  const executor = new GithubExecutor();

  assert.equal(executor.needsRefresh({}), true);
  assert.equal(
    executor.needsRefresh({
      providerSpecificData: {
        copilotToken: "copilot-token",
        copilotTokenExpiresAt: Math.floor((Date.now() + 60_000) / 1000),
      },
    }),
    true
  );
  assert.equal(
    executor.needsRefresh({
      providerSpecificData: {
        copilotToken: "copilot-token",
        copilotTokenExpiresAt: Math.floor((Date.now() + 60 * 60 * 1000) / 1000),
      },
    }),
    false
  );
});

test("GithubExecutor.execute strips terminal [DONE] frames from SSE responses", async () => {
  const executor = new GithubExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(
      new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode('data: {"chunk":"one"}\n\n'));
          controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
          controller.close();
        },
      }),
      {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      }
    );

  try {
    const result = await executor.execute({
      model: "gpt-4.1",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: { accessToken: "gh-access-token" },
    });
    const text = await result.response.text();

    assert.match(text, /"chunk":"one"/);
    assert.doesNotMatch(text, /\[DONE\]/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
