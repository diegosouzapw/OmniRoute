import test from "node:test";
import assert from "node:assert/strict";

import { GitlabExecutor } from "../../open-sse/executors/gitlab.ts";
import { getExecutor, hasSpecializedExecutor } from "../../open-sse/executors/index.ts";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

test("GitlabExecutor is registered in the executor index", () => {
  assert.equal(hasSpecializedExecutor("gitlab"), true);
  assert.ok(getExecutor("gitlab") instanceof GitlabExecutor);
  assert.equal(hasSpecializedExecutor("gitlab-duo"), true);
  assert.ok(getExecutor("gitlab-duo") instanceof GitlabExecutor);
});

test("GitlabExecutor posts PAT-backed code suggestion requests to the configured instance", async () => {
  const executor = new GitlabExecutor();
  const calls: Array<{
    url: string;
    body: Record<string, unknown>;
    headers: Record<string, string>;
  }> = [];
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url, init = {}) => {
    calls.push({
      url: String(url),
      body: JSON.parse(String(init.body || "{}")),
      headers: init.headers as Record<string, string>,
    });

    return jsonResponse({
      id: "gitlab-response-1",
      model: { name: "code-gecko", engine: "vertex-ai" },
      choices: [{ text: "def hello():\n    return 'world'", finish_reason: "stop" }],
    });
  };

  try {
    const result = await executor.execute({
      model: "gitlab-duo-code-suggestions",
      body: {
        messages: [
          { role: "system", content: "Return Python code only." },
          { role: "user", content: "Write a hello world function" },
        ],
      },
      stream: false,
      credentials: {
        apiKey: "glpat-test",
        providerSpecificData: {
          baseUrl: "https://gitlab.example.com",
          projectPath: "group/project",
          fileName: "app.py",
        },
      },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "https://gitlab.example.com/api/v4/code_suggestions/completions");
    assert.equal(calls[0].headers.Authorization, "Bearer glpat-test");
    assert.equal(calls[0].body.project_path, "group/project");
    assert.equal(calls[0].body.current_file.file_name, "app.py");
    assert.equal(calls[0].body.intent, "generation");
    assert.match(String(calls[0].body.user_instruction), /Write a hello world function/);
    assert.match(String(calls[0].body.current_file.content_above_cursor), /System instructions:/);

    const body = (await result.response.json()) as any;
    assert.equal(body.object, "chat.completion");
    assert.equal(body.choices[0].message.role, "assistant");
    assert.match(body.choices[0].message.content, /hello/);
    assert.equal(body.model, "code-gecko");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GitlabExecutor synthesizes SSE responses from non-streaming upstream completions", async () => {
  const executor = new GitlabExecutor();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    jsonResponse({
      model: { name: "code-gecko" },
      choices: [{ text: "console.log('hi');" }],
    });

  try {
    const result = await executor.execute({
      model: "gitlab-duo-code-suggestions",
      body: {
        messages: [{ role: "user", content: "Write a JS hello world" }],
      },
      stream: true,
      credentials: { apiKey: "glpat-test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");
    const text = await result.response.text();
    assert.match(text, /data: \{\"id\":\"chatcmpl-gitlab-/);
    assert.match(text, /console\.log\('hi'\);/);
    assert.match(text, /data: \[DONE\]/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GitlabExecutor maps upstream auth failures to OpenAI-style errors", async () => {
  const executor = new GitlabExecutor();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () => jsonResponse({ message: "forbidden" }, 403);

  try {
    const result = await executor.execute({
      model: "gitlab-duo-code-suggestions",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: { apiKey: "glpat-test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.equal(result.response.status, 403);
    const body = (await result.response.json()) as any;
    assert.match(body.error.message, /auth failed/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GitlabExecutor uses GitLab direct_access for gitlab-duo and persists the cache", async () => {
  const executor = getExecutor("gitlab-duo") as GitlabExecutor;
  const originalFetch = globalThis.fetch;
  const calls: Array<{ url: string; headers: Record<string, string> }> = [];
  const refreshedPatches: Array<Record<string, unknown>> = [];

  globalThis.fetch = async (url, init = {}) => {
    calls.push({
      url: String(url),
      headers: (init.headers || {}) as Record<string, string>,
    });

    if (String(url) === "https://gitlab.example.com/api/v4/code_suggestions/direct_access") {
      return jsonResponse({
        token: "direct-token",
        base_url: "https://cloud.gitlab.com",
        expires_at: Math.floor(Date.now() / 1000) + 1800,
        headers: {
          "x-gitlab-feature-enabled": "true",
        },
      });
    }

    return jsonResponse({
      metadata: {
        model_details: {
          model_name: "GitLab Duo Claude Sonnet",
        },
      },
      choices: [{ text: "print('gitlab duo')" }],
    });
  };

  try {
    const result = await executor.execute({
      model: "gitlab-duo-code-suggestions",
      body: {
        messages: [{ role: "user", content: "Write a hello world in Python" }],
      },
      stream: false,
      credentials: {
        accessToken: "oauth-access",
        refreshToken: "oauth-refresh",
        providerSpecificData: {
          baseUrl: "https://gitlab.example.com",
        },
      },
      onCredentialsRefreshed: async (patch) => {
        refreshedPatches.push(patch as Record<string, unknown>);
      },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.equal(calls[0].url, "https://gitlab.example.com/api/v4/code_suggestions/direct_access");
    assert.equal(calls[0].headers.Authorization, "Bearer oauth-access");
    assert.equal(calls[1].url, "https://cloud.gitlab.com/ai/v2/completions");
    assert.equal(calls[1].headers.Authorization, "Bearer direct-token");
    assert.equal(calls[1].headers["x-gitlab-feature-enabled"], "true");
    assert.equal(refreshedPatches.length, 1);
    assert.equal(
      (
        (refreshedPatches[0].providerSpecificData as Record<string, unknown>)
          ?.gitlabDirectAccess as Record<string, unknown>
      )?.token,
      "direct-token"
    );

    const body = (await result.response.json()) as any;
    assert.equal(body.model, "GitLab Duo Claude Sonnet");
    assert.match(body.choices[0].message.content, /gitlab duo/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GitlabExecutor falls back to the public Code Suggestions endpoint when direct_access is disabled", async () => {
  const executor = getExecutor("gitlab-duo") as GitlabExecutor;
  const originalFetch = globalThis.fetch;
  const calls: string[] = [];

  globalThis.fetch = async (url) => {
    calls.push(String(url));

    if (String(url) === "https://gitlab.example.com/api/v4/code_suggestions/direct_access") {
      return jsonResponse({ message: "Direct connections are disabled" }, 403);
    }

    return jsonResponse({
      model: { name: "code-gecko" },
      choices: [{ text: "fallback path works" }],
    });
  };

  try {
    const result = await executor.execute({
      model: "gitlab-duo-code-suggestions",
      body: {
        messages: [{ role: "user", content: "Say hello" }],
      },
      stream: false,
      credentials: {
        accessToken: "oauth-access",
        providerSpecificData: {
          baseUrl: "https://gitlab.example.com",
        },
      },
      signal: AbortSignal.timeout(10_000),
      log: null,
    });

    assert.deepEqual(calls, [
      "https://gitlab.example.com/api/v4/code_suggestions/direct_access",
      "https://gitlab.example.com/api/v4/code_suggestions/completions",
    ]);

    const body = (await result.response.json()) as any;
    assert.equal(body.model, "code-gecko");
    assert.match(body.choices[0].message.content, /fallback path/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
