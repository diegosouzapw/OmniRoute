import { test } from "node:test";
import assert from "node:assert/strict";

import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";
import { setCliCompatProviders } from "../../open-sse/config/cliFingerprints.ts";
import { scrubProxyAndFingerprintHeaders } from "../../open-sse/services/antigravityHeaderScrub.ts";
import { antigravityUserAgent } from "../../open-sse/services/antigravityHeaders.ts";
import {
  clearAntigravityVersionCache,
  seedAntigravityVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";
import { clearAntigravityProjectCache } from "../../open-sse/services/antigravityProjectBootstrap.ts";
import { runWithCapture } from "../../open-sse/utils/providerRequestLogging.ts";

type AntigravityTransformResult = Exclude<
  Awaited<ReturnType<AntigravityExecutor["transformRequest"]>>,
  Response
>;

type ErrorPayload = {
  error: {
    code?: string;
    message: string;
  };
  retryAfterMs?: number;
};

type ChatCompletionPayload = {
  object?: string;
  choices: Array<{
    message: { content: string };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

async function withEnv<T>(
  name: string,
  value: string | undefined,
  fn: () => T | Promise<T>
): Promise<T> {
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

test("AntigravityExecutor.buildHeaders includes native headers without OmniRoute internals", () => {
  const executor = new AntigravityExecutor();
  const headers = executor.buildHeaders({ accessToken: "ag-token" }, false);

  assert.equal(headers.Authorization, "Bearer ag-token");
  assert.equal(headers.Accept, "text/event-stream");
  assert.match(headers["User-Agent"], /^Antigravity\/4\.2\.0 /);
  assert.equal(headers["X-OmniRoute-Source"], undefined);
});

test("Antigravity header scrub removes OmniRoute internal headers", () => {
  const headers = scrubProxyAndFingerprintHeaders({
    Authorization: "Bearer ag-token",
    "X-OmniRoute-Source": "omniroute",
    "X-OmniRoute-No-Cache": "true",
    "X-Forwarded-For": "127.0.0.1",
  });

  assert.equal(headers.Authorization, "Bearer ag-token");
  assert.equal(headers["X-OmniRoute-Source"], undefined);
  assert.equal(headers["X-OmniRoute-No-Cache"], undefined);
  assert.equal(headers["X-Forwarded-For"], undefined);
  assert.equal(headers["Accept-Encoding"], "gzip, deflate, br");
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

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  assert.equal(result.project, "project-1");
  assert.equal(result.model, "gemini-3.1-pro");
  assert.deepEqual(Object.keys(result), [
    "project",
    "requestId",
    "request",
    "model",
    "userAgent",
    "requestType",
    "enabledCreditTypes",
  ]);
  assert.equal(result.userAgent, "antigravity");
  assert.match(result.requestId, /^agent\/\d+\/[0-9a-f]{8}$/);
  assert.deepEqual(result.enabledCreditTypes, ["GOOGLE_ONE_AI"]);
  assert.ok(result.request.sessionId);
  const request = result.request as { generationConfig?: { topK?: number; topP?: number } };
  const generationConfig = request.generationConfig || {};
  assert.equal(generationConfig.topK, 40);
  assert.equal(generationConfig.topP, 1.0);
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

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  const generationConfig = result.request.generationConfig as {
    thinkingConfig?: { thinkingBudget?: number; includeThoughts?: boolean };
  };
  assert.equal(result.reasoning_effort, undefined);
  assert.equal(generationConfig.thinkingConfig, undefined);
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

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  const generationConfig = result.request.generationConfig as {
    thinkingConfig: { thinkingBudget?: number; includeThoughts?: boolean };
  };
  assert.equal(generationConfig.thinkingConfig.thinkingBudget, 8192);
  assert.equal(generationConfig.thinkingConfig.includeThoughts, true);
});

test("AntigravityExecutor.transformRequest tolerates a missing body when projectId is present", async () => {
  const executor = new AntigravityExecutor();

  const result = await executor.transformRequest("antigravity/gemini-3.1-pro", null, true, {
    projectId: "project-1",
  });

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  assert.equal(result.project, "project-1");
  assert.equal(result.model, "gemini-3.1-pro");
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
  if (!(result instanceof Response)) throw new Error("Expected Response from transformRequest");
  const payload = (await result.json()) as ErrorPayload;

  assert.equal(result.status, 422);
  assert.equal(payload.error.code, "missing_project_id");
  assert.match(payload.error.message, /Missing Google projectId/);
});

// #2334/#2541: a freshly re-added Antigravity account can have an empty stored projectId
// even when its Google account already owns a Cloud Code project. transformRequest must
// auto-discover it via loadCodeAssist (mirroring gemini-cli.ts) instead of hard-failing.
test("AntigravityExecutor.transformRequest auto-discovers a missing projectId via loadCodeAssist (#2334)", async () => {
  clearAntigravityProjectCache();
  seedAntigravityVersionCache("2026.04.17-test");
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  let loadCodeAssistCalled = false;

  globalThis.fetch = (async (url: string | URL | Request) => {
    if (String(url).includes("loadCodeAssist")) {
      loadCodeAssistCalled = true;
      return new Response(JSON.stringify({ cloudaicompanionProject: "discovered-project-123" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response("{}", { status: 404 });
  }) as typeof fetch;

  try {
    const result = await executor.transformRequest(
      "antigravity/gemini-3.1-pro",
      { request: { contents: [] } },
      true,
      { accessToken: "fresh-account-token-2334" }
    );
    if (result instanceof Response) {
      throw new Error(`Expected an envelope but got a ${result.status} Response`);
    }
    assert.equal(
      loadCodeAssistCalled,
      true,
      "loadCodeAssist should be called to recover the project"
    );
    assert.equal(result.project, "discovered-project-123");
  } finally {
    globalThis.fetch = originalFetch;
    clearAntigravityProjectCache();
  }
});

// #2334: when loadCodeAssist also finds no project (truly un-onboarded account), the
// structured 422 must still be returned so the dashboard can prompt a reconnect.
test("AntigravityExecutor.transformRequest still 422s when loadCodeAssist finds no project (#2334)", async () => {
  clearAntigravityProjectCache();
  seedAntigravityVersionCache("2026.04.17-test");
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = (async () =>
    new Response(JSON.stringify({}), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })) as typeof fetch;

  try {
    const result = await executor.transformRequest(
      "antigravity/gemini-3.1-pro",
      { request: { contents: [] } },
      true,
      { accessToken: "no-project-token-2334" }
    );
    if (!(result instanceof Response)) throw new Error("Expected a 422 Response");
    assert.equal(result.status, 422);
    const payload = (await result.json()) as ErrorPayload;
    assert.equal(payload.error.code, "missing_project_id");
  } finally {
    globalThis.fetch = originalFetch;
    clearAntigravityProjectCache();
  }
});

test("AntigravityExecutor.transformRequest prefers top-level credentials projectId over nested providerSpecificData", async () => {
  const executor = new AntigravityExecutor();
  const result = await executor.transformRequest(
    "antigravity/gemini-2.5-pro",
    {
      project: "body-project",
      request: {
        contents: [{ role: "user", parts: [{ text: "Hello" }] }],
      },
    },
    true,
    {
      projectId: "credential-project",
      providerSpecificData: { projectId: "nested-project" },
    }
  );

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  assert.equal(result.project, "credential-project");
});

test("AntigravityExecutor.transformRequest uses nested providerSpecificData projectId when top-level is absent", async () => {
  const executor = new AntigravityExecutor();
  const result = await executor.transformRequest(
    "antigravity/gemini-2.5-pro",
    {
      request: {
        contents: [{ role: "user", parts: [{ text: "Hello" }] }],
      },
    },
    true,
    {
      providerSpecificData: { projectId: "nested-project" },
    }
  );

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  assert.equal(result.project, "nested-project");
});

test("AntigravityExecutor.transformRequest treats whitespace-only project values as missing", async () => {
  const executor = new AntigravityExecutor();

  const nestedFallback = await executor.transformRequest(
    "antigravity/gemini-2.5-pro",
    {
      project: "   ",
      request: {
        contents: [{ role: "user", parts: [{ text: "Hello" }] }],
      },
    },
    true,
    {
      projectId: "   ",
      providerSpecificData: { projectId: " nested-project " },
    }
  );

  if (nestedFallback instanceof Response)
    throw new Error("Unexpected Response from transformRequest");
  assert.equal(nestedFallback.project, "nested-project");

  const bodyFallback = await executor.transformRequest(
    "antigravity/gemini-2.5-pro",
    {
      project: " body-project ",
      request: {
        contents: [{ role: "user", parts: [{ text: "Hello" }] }],
      },
    },
    true,
    {
      projectId: "   ",
      providerSpecificData: { projectId: "   " },
    }
  );

  if (bodyFallback instanceof Response)
    throw new Error("Unexpected Response from transformRequest");
  assert.equal(bodyFallback.project, "body-project");
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

    if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
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
  const payload = (await result.response.json()) as ChatCompletionPayload;

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

test("AntigravityExecutor.collectStreamToResponse converts textual tool call SSE to structured tool_calls", async () => {
  const executor = new AntigravityExecutor();
  const response = new Response(
    [
      `data: ${JSON.stringify({
        response: {
          candidates: [
            {
              content: {
                parts: [
                  {
                    text: '[Tool call: search_files]\nArguments: {"file_glob":"*gemini*","output_mode":"files_only","path":"/opt/O\\u200dmniRoute","target":"files"}',
                  },
                ],
              },
              finishReason: "STOP",
            },
          ],
          usageMetadata: {
            promptTokenCount: 7,
            candidatesTokenCount: 4,
            totalTokenCount: 11,
          },
        },
      })}\n\n`,
    ].join(""),
    {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }
  );

  const result = await executor.collectStreamToResponse(
    response,
    "gemini-3.5-flash-low",
    "https://example.com",
    { Authorization: "Bearer ag-token" },
    { request: {} }
  );
  const payload = await result.response.json();
  const choice = payload.choices[0];

  assert.equal(choice.message.content, null);
  assert.equal(choice.finish_reason, "tool_calls");
  assert.equal(choice.message.tool_calls.length, 1);
  assert.equal(choice.message.tool_calls[0].function.name, "search_files");
  assert.deepEqual(JSON.parse(choice.message.tool_calls[0].function.arguments), {
    file_glob: "*gemini*",
    output_mode: "files_only",
    path: "/opt/OmniRoute",
    target: "files",
  });
});

test("AntigravityExecutor.collectStreamToResponse parses fragmented SSE lines incrementally", async () => {
  const executor = new AntigravityExecutor();
  const encoder = new TextEncoder();
  const streamText = [
    `data: ${JSON.stringify({
      response: {
        candidates: [{ content: { parts: [{ text: "Frag" }] } }],
      },
    })}\n\n`,
    `data: ${JSON.stringify({
      response: {
        candidates: [
          {
            content: { parts: [{ text: "mented" }] },
            finishReason: "STOP",
          },
        ],
        usageMetadata: {
          promptTokenCount: 9,
          candidatesTokenCount: 4,
          totalTokenCount: 13,
        },
      },
    })}\n\n`,
  ].join("");
  const response = new Response(
    new ReadableStream({
      start(controller) {
        for (const chunk of [
          streamText.slice(0, 6),
          streamText.slice(6, 31),
          streamText.slice(31, 79),
          streamText.slice(79, 143),
          streamText.slice(143),
        ]) {
          controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      },
    }),
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
  const payload = (await result.response.json()) as ChatCompletionPayload;

  assert.equal(payload.choices[0].message.content, "Fragmented");
  assert.equal(payload.choices[0].finish_reason, "stop");
  assert.deepEqual(payload.usage, {
    prompt_tokens: 9,
    completion_tokens: 4,
    total_tokens: 13,
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
      // refreshCredentials preserves providerSpecificData across refresh (#2480); when the
      // input has none it surfaces as `undefined`. (Test updated to match that behavior —
      // it had been stale since the #2480 change added this field.)
      providerSpecificData: undefined,
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
  globalThis.setTimeout = ((callback) => {
    (callback as () => void)();
    return 0;
  }) as typeof setTimeout;

  try {
    const result = await executor.execute({
      model: "antigravity/gemini-2.5-flash",
      body: { request: { contents: [] } },
      stream: false,
      credentials: { accessToken: "token", projectId: "project-1" },
      log: { debug() {}, warn() {} },
    });
    const payload = (await result.response.json()) as ChatCompletionPayload;

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
    const payload = (await result.response.json()) as ErrorPayload;

    assert.equal(result.response.status, 429);
    assert.equal(payload.retryAfterMs, 7_200_000);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("AntigravityExecutor.execute bounds a persistent short-retry 429 instead of looping forever", async () => {
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const calls: string[] = [];
  seedAntigravityVersionCache("2026.04.17-test");

  // "rate limited" classifies as rate_limited → decide429 returns 60s
  // (≤ LONG_RETRY_THRESHOLD_MS), i.e. the short-retry branch. A persistent 429
  // must NOT loop forever on one endpoint — it must exhaust MAX_AUTO_RETRIES per
  // endpoint, advance through every base URL, then return the 429 so the
  // account-fallback layer can switch accounts.
  globalThis.fetch = async (url) => {
    calls.push(String(url));
    return new Response(JSON.stringify({ error: { message: "rate limited" } }), {
      status: 429,
      headers: { "Content-Type": "application/json" },
    });
  };
  globalThis.setTimeout = ((callback) => {
    (callback as () => void)();
    return 0;
  }) as typeof setTimeout;

  try {
    const result = await executor.execute({
      model: "antigravity/gemini-2.5-flash",
      body: { request: { contents: [] } },
      stream: true,
      credentials: { accessToken: "token", projectId: "project-1" },
      log: { debug() {}, warn() {} },
    });

    // Returns the 429 rather than hanging.
    assert.equal(result.response.status, 429);

    // Bounded: 3 endpoints × (1 initial + MAX_AUTO_RETRIES=3) = 12 attempts total.
    assert.equal(calls.length, 12);

    // Tried every distinct base URL before giving up.
    const distinctHosts = new Set(calls.map((u) => new URL(u).host));
    assert.equal(distinctHosts.size, 3);
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("AntigravityExecutor.execute tags pre-response stalls with a fallbackable timeout code", async () => {
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  seedAntigravityVersionCache("2026.04.17-test");

  globalThis.fetch = async (_url, init) => {
    await new Promise((_resolve, reject) => {
      const signal = init?.signal as AbortSignal | undefined;
      if (signal?.aborted) {
        reject(signal.reason);
        return;
      }
      signal?.addEventListener("abort", () => reject(signal.reason), { once: true });
    });
    throw new Error("unreachable");
  };
  globalThis.setTimeout = ((callback) => {
    (callback as () => void)();
    return 0;
  }) as typeof setTimeout;

  try {
    await assert.rejects(
      () =>
        executor.execute({
          model: "antigravity/gemini-2.5-flash",
          body: { request: { contents: [] } },
          stream: true,
          credentials: { accessToken: "token", projectId: "project-1" },
          log: { debug() {}, warn() {}, error() {} },
        }),
      (error: unknown) => {
        assert.equal((error as { code?: string }).code, "ANTIGRAVITY_PRE_RESPONSE_TIMEOUT");
        assert.equal((error as { name?: string }).name, "TimeoutError");
        assert.match((error as Error).message, /did not return response headers/);
        return true;
      }
    );
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
});

test("AntigravityExecutor.execute applies CLI fingerprint when enabled", async () => {
  const executor = new AntigravityExecutor();
  const originalFetch = globalThis.fetch;
  let fetchStarted = false;
  let fetchBody: Record<string, unknown> | null = null;
  let prepared: unknown = null;
  let preparedBeforeFetch = false;
  seedAntigravityVersionCache("2026.04.17-test");
  setCliCompatProviders(["antigravity"]);

  globalThis.fetch = async (_url, init) => {
    fetchStarted = true;
    const headers = init?.headers as Record<string, string>;
    const parsedBody = JSON.parse(String(init?.body));
    fetchBody = parsedBody;

    assert.equal(headers["User-Agent"], antigravityUserAgent("2026.04.17-test"));
    assert.equal(headers["x-client-name"], "antigravity");
    assert.equal(headers["x-client-version"], "2026.04.17-test");
    assert.equal(headers["x-goog-user-project"], "project-1");
    assert.deepEqual(Object.keys(parsedBody), [
      "project",
      "requestId",
      "request",
      "model",
      "userAgent",
      "requestType",
      "enabledCreditTypes",
    ]);

    return new Response(
      'data: {"response":{"candidates":[{"content":{"parts":[{"text":"OK"}]},"finishReason":"STOP"}]}}\n\n',
      {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      }
    );
  };

  try {
    const requestCapture = {
      capture(request) {
        preparedBeforeFetch = !fetchStarted;
        prepared = request.body;
      },
      body(fallback) {
        return prepared ?? fallback;
      },
      latest() {
        return null;
      },
    };
    const result = await withEnv("ANTIGRAVITY_CREDITS", "always", () =>
      runWithCapture(requestCapture, () =>
        executor.execute({
          model: "antigravity/gemini-2.5-flash",
          body: { request: { contents: [] } },
          stream: false,
          credentials: { accessToken: "token", projectId: "project-1" },
          log: { debug() {}, warn() {}, info() {} },
        })
      )
    );

    assert.equal(result.response.status, 200);
    assert.equal(preparedBeforeFetch, true);
    assert.deepEqual(prepared, fetchBody);
  } finally {
    setCliCompatProviders([]);
    globalThis.fetch = originalFetch;
  }
});

test("AntigravityExecutor.transformRequest maps Claude models through Gemini contents schema", async () => {
  const executor = new AntigravityExecutor();
  const body = {
    project: "project-1",
    model: "claude-sonnet-4-6",
    userAgent: "antigravity",
    requestId: "agent-123",
    requestType: "agent",
    request: {
      contents: [{ role: "user", parts: [{ text: "Hello" }] }],
      systemInstruction: { role: "system", parts: [{ text: "System prompt" }] },
      generationConfig: {
        temperature: 1,
        maxOutputTokens: 16384,
      },
      messages: [{ role: "user", content: [{ type: "text", text: "Legacy Anthropic field" }] }],
      system: [{ type: "text", text: "Legacy system field" }],
      max_tokens: 16384,
      stream: true,
      temperature: 1,
    },
  };

  const result = (await executor.transformRequest("antigravity/claude-sonnet-4-6", body, true, {
    projectId: "project-1",
  })) as AntigravityTransformResult;

  assert.equal(result.project, "project-1");
  assert.equal(result.model, "claude-sonnet-4-6");
  assert.equal(result.requestType, "agent");
  assert.ok(result.request.sessionId);
  assert.deepEqual(result.enabledCreditTypes, ["GOOGLE_ONE_AI"]);
  assert.deepEqual(result.request.contents, [{ role: "user", parts: [{ text: "Hello" }] }]);
  assert.deepEqual(result.request.systemInstruction, {
    role: "system",
    parts: [{ text: "System prompt" }],
  });
  assert.deepEqual(result.request.generationConfig, {
    temperature: 1,
    maxOutputTokens: 16384,
    topK: 40,
    topP: 1.0,
  });
  assert.equal(result.request.messages, undefined);
  assert.equal(result.request.system, undefined);
  assert.equal(result.request.max_tokens, undefined);
  assert.equal(result.request.stream, undefined);
  assert.equal(result.request.temperature, undefined);
  assert.equal(result.request.toolConfig, undefined);
});
