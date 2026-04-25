import test from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";
import {
  clearAntigravityVersionCache,
  seedAntigravityVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";

async function withEnv(name, value, fn) {
  const previous = process.env[name];
  if (value === undefined) {
    delete process.env[name];
  } else {
    process.env[name] = value;
  }

  try {
    return await fn();
  } finally {
    if (previous === undefined) {
      delete process.env[name];
    } else {
      process.env[name] = previous;
    }
  }
}

test.afterEach(() => {
  clearAntigravityVersionCache();
});

test("AntigravityExecutor.buildUrl always targets the streaming endpoint", () => {
  const executor = new AntigravityExecutor();
  assert.match(
    executor.buildUrl("gemini-2.5-flash", true),
    /\/v1internal:streamGenerateContent\?alt=sse$/
  );
  assert.equal(
    executor.buildUrl("gemini-2.5-flash", false),
    executor.buildUrl("gemini-2.5-flash", true)
  );
});

test("AntigravityExecutor.buildHeaders includes auth and SSE accept", () => {
  const executor = new AntigravityExecutor();
  const headers = executor.buildHeaders({ accessToken: "ag-token" }, false);

  assert.equal(headers.Authorization, "Bearer ag-token");
  assert.equal(headers.Accept, "text/event-stream");
  assert.equal(headers["X-OmniRoute-Source"], "omniroute");
});

test("AntigravityExecutor.transformRequest normalizes model, project and contents", async () => {
  const executor = new AntigravityExecutor();
  const body = {
    request: {
      contents: [
        {
          role: "model",
          parts: [
            { thought: true, text: "skip me" },
            { thoughtSignature: "sig-only" },
            { text: "keep me" },
          ],
        },
        {
          role: "model",
          parts: [{ functionResponse: { name: "read_file", response: {} } }],
        },
      ],
      tools: [{ functionDeclarations: [{ name: "read_file" }] }],
    },
  };

  const result = await executor.transformRequest("antigravity/gemini-3.1-pro", body, true, {
    projectId: "project-1",
  });

  assert.equal(result.project, "project-1");
  assert.equal(result.model, "gemini-3.1-pro-low");
  assert.equal(result.userAgent, "antigravity");
  assert.ok(result.request.sessionId);
  assert.deepEqual(result.request.toolConfig, {
    functionCallingConfig: { mode: "VALIDATED" },
  });
  assert.deepEqual(result.request.contents[0].parts, [{ text: "keep me" }]);
  assert.equal(result.request.contents[1].role, "user");
});

test("AntigravityExecutor.transformRequest strips thinking config for Cloud Code models that do not support reasoning", async () => {
  const executor = new AntigravityExecutor();
  const body = {
    reasoning_effort: "high",
    request: {
      generationConfig: {
        thinkingConfig: {
          thinkingBudget: 8192,
          includeThoughts: true,
        },
      },
      contents: [{ role: "user", parts: [{ text: "Hello" }] }],
    },
  };

  const result = await executor.transformRequest("antigravity/claude-sonnet-4-6", body, true, {
    projectId: "project-1",
  });

  assert.equal(result.reasoning_effort, undefined);
  assert.equal(result.request.generationConfig.thinkingConfig, undefined);
});

test("AntigravityExecutor.transformRequest preserves thinking config for supported Gemini models", async () => {
  const executor = new AntigravityExecutor();
  const body = {
    request: {
      generationConfig: {
        thinkingConfig: {
          thinkingBudget: 8192,
          includeThoughts: true,
        },
      },
      contents: [{ role: "user", parts: [{ text: "Hello" }] }],
    },
  };

  const result = await executor.transformRequest("antigravity/gemini-3.1-pro-high", body, true, {
    projectId: "project-1",
  });

  assert.equal(result.request.generationConfig.thinkingConfig.thinkingBudget, 8192);
  assert.equal(result.request.generationConfig.thinkingConfig.includeThoughts, true);
});

test("AntigravityExecutor.transformRequest tolerates a missing body when projectId is present", async () => {
  const executor = new AntigravityExecutor();

  const result = await executor.transformRequest("antigravity/gemini-3.1-pro", null, true, {
    projectId: "project-1",
  });

  assert.equal(result.project, "project-1");
  assert.equal(result.model, "gemini-3.1-pro-low");
  assert.ok(result.request.sessionId);
});

test("AntigravityExecutor.transformRequest returns a structured error response when projectId is missing", async () => {
  const executor = new AntigravityExecutor();
  const result = await executor.transformRequest(
    "gemini-2.5-flash",
    { request: { contents: [] } },
    true,
    {}
  );
  const payload = (await result.json()) as any;

  assert.equal(result.status, 422);
  assert.equal(payload.error.code, "missing_project_id");
  assert.match(payload.error.message, /Missing Google projectId/);
});

test("AntigravityExecutor.transformRequest allows body project overrides when the env flag is enabled", async () => {
  const executor = new AntigravityExecutor();

  await withEnv("OMNIROUTE_ALLOW_BODY_PROJECT_OVERRIDE", "1", async () => {
    const result = await executor.transformRequest(
      "antigravity/gemini-2.5-pro",
      {
        project: "body-project",
        request: {
          contents: [{ role: "user", parts: [{ text: "Hello" }] }],
          sessionId: "session-fixed",
        },
      },
      true,
      { projectId: "credential-project" }
    );

    assert.equal(result.project, "body-project");
    assert.equal(result.request.sessionId, "session-fixed");
    assert.equal(result.model, "gemini-2.5-pro");
  });
});

test("AntigravityExecutor parses retry timing from headers and error strings", () => {
  const executor = new AntigravityExecutor();
  const headers = new Headers({
    "retry-after": "120",
    "x-ratelimit-reset-after": "30",
  });

  assert.equal(executor.parseRetryHeaders(headers), 120_000);
  assert.equal(
    executor.parseRetryFromErrorMessage("Your quota will reset after 2h7m23s"),
    7_643_000
  );
});

test("AntigravityExecutor.parseRetryHeaders falls back to reset-after and reset timestamps", () => {
  const executor = new AntigravityExecutor();
  const futureSeconds = Math.floor(Date.now() / 1000) + 90;

  assert.equal(
    executor.parseRetryHeaders(new Headers({ "x-ratelimit-reset-after": "45" })),
    45_000
  );
  assert.ok(
    executor.parseRetryHeaders(new Headers({ "x-ratelimit-reset": String(futureSeconds) })) >=
      89_000
  );
});

test("AntigravityExecutor.collectStreamToResponse turns SSE Gemini chunks into a chat completion", async () => {
  const executor = new AntigravityExecutor();
  const response = new Response(
    [
      'data: {"response":{"candidates":[{"content":{"parts":[{"text":"Hello "}]},"finishReason":"STOP"}]}}\n\n',
      'data: {"response":{"candidates":[{"content":{"parts":[{"text":"world"}]},"finishReason":"STOP"}],"usageMetadata":{"promptTokenCount":5,"candidatesTokenCount":3,"totalTokenCount":8}}}\n\n',
    ].join(""),
    {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }
  );

  const result = await executor.collectStreamToResponse(
    response,
    "gemini-2.5-flash",
    "https://example.com",
    { Authorization: "Bearer ag-token" },
    { request: {} }
  );
  const payload = (await result.response.json()) as any;

  assert.equal(result.response.status, 200);
  assert.equal(payload.object, "chat.completion");
  assert.equal(payload.choices[0].message.content, "Hello world");
  assert.equal(payload.choices[0].finish_reason, "stop");
  assert.deepEqual(payload.usage, {
    prompt_tokens: 5,
    completion_tokens: 3,
    total_tokens: 8,
  });
});

test("AntigravityExecutor.refreshCredentials refreshes Google OAuth tokens", async () => {
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => {
    assert.match(String(url), /oauth2\.googleapis\.com\/token$/);
    return new Response(
      JSON.stringify({
        access_token: "new-token",
        refresh_token: "new-refresh",
        expires_in: 3600,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };

  try {
    const result = await executor.refreshCredentials(
      { refreshToken: "refresh", projectId: "project-1" },
      null
    );
    assert.deepEqual(result, {
      accessToken: "new-token",
      refreshToken: "new-refresh",
      expiresIn: 3600,
      projectId: "project-1",
    });
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("AntigravityExecutor.execute auto-retries short 429 responses and collects SSE for non-stream clients", async () => {
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const calls = [];
  seedAntigravityVersionCache("2026.04.17-test");

  globalThis.fetch = async (url) => {
    calls.push(String(url));

    if (calls.length === 1) {
      return new Response(JSON.stringify({ error: { message: "rate limited" } }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(
      [
        'data: {"response":{"candidates":[{"content":{"parts":[{"text":"Hello "}]},"finishReason":"STOP"}]}}\n\n',
        'data: {"response":{"candidates":[{"content":{"parts":[{"text":"again"}]},"finishReason":"STOP"}],"usageMetadata":{"promptTokenCount":2,"candidatesTokenCount":3,"totalTokenCount":5}}}\n\n',
      ].join(""),
      {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      }
    );
  };
  globalThis.setTimeout = (callback) => {
    callback();
    return 0;
  };

  try {
    const result = await executor.execute({
      model: "antigravity/gemini-2.5-flash",
      body: { request: { contents: [] } },
      stream: false,
      credentials: { accessToken: "token", projectId: "project-1" },
      log: { debug() {}, warn() {} },
    });
    const payload = (await result.response.json()) as any;

    assert.equal(calls.length, 2);
    assert.equal(result.response.status, 200);
    assert.equal(payload.choices[0].message.content, "Hello again");
    assert.deepEqual(payload.usage, {
      prompt_tokens: 2,
      completion_tokens: 3,
      total_tokens: 5,
    });
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("AntigravityExecutor.execute embeds retryAfterMs when the upstream asks for a long wait", async () => {
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  seedAntigravityVersionCache("2026.04.17-test");

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        error: {
          message: "Your quota will reset after 2h",
        },
      }),
      {
        status: 429,
        headers: { "Content-Type": "application/json" },
      }
    );

  try {
    const result = await executor.execute({
      model: "antigravity/gemini-2.5-flash",
      body: { request: { contents: [] } },
      stream: true,
      credentials: { accessToken: "token", projectId: "project-1" },
      log: { debug() {}, warn() {} },
    });
    const payload = (await result.response.json()) as any;

    assert.equal(result.response.status, 429);
    assert.equal(payload.retryAfterMs, 7_200_000);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
