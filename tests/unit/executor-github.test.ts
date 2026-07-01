import test from "node:test";
import assert from "node:assert/strict";

import { GithubExecutor } from "../../open-sse/executors/github.ts";
import { PROVIDER_MODELS } from "../../open-sse/config/providerModels.ts";

function registerModel(provider, model) {
  PROVIDER_MODELS[provider] = [...(PROVIDER_MODELS[provider] || []), model];
}

test("GithubExecutor.refreshGitHubToken sends the public client_id and omits client_secret (port from 9router#442)", async () => {
  // GitHub Copilot is a public device-flow OAuth client (client_id, no client_secret).
  // The previous code sent client_id/client_secret straight from this.config via
  // new URLSearchParams, so an undefined config produced the literal
  // "client_id=undefined&client_secret=undefined". The fix populates the real client_id
  // and only sends client_secret when one actually exists.
  const executor = new GithubExecutor();
  const calls: any[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: any, options: any = {}) => {
    calls.push({ url: String(url), options });
    return {
      ok: true,
      json: async () => ({
        access_token: "gh-access",
        refresh_token: "gh-next",
        expires_in: 3600,
      }),
    } as any;
  }) as any;

  try {
    const result = await executor.refreshGitHubToken("gh-refresh", { info() {}, error() {} });
    assert.deepEqual(result, {
      accessToken: "gh-access",
      refreshToken: "gh-next",
      expiresIn: 3600,
    });
  } finally {
    globalThis.fetch = originalFetch;
  }

  const body = String(calls[0].options.body);
  assert.match(body, /client_id=Iv1\./, "the real public github client_id must be sent");
  assert.ok(
    !body.includes("client_secret="),
    "client_secret must be omitted (never the literal 'undefined')"
  );
});

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

test("GithubExecutor.buildUrl keeps GitHub Claude Opus 4.6 on /chat/completions", () => {
  const executor = new GithubExecutor();
  const url = executor.buildUrl("claude-opus-4.6", true);
  assert.equal(url, "https://api.githubcopilot.com/chat/completions");
});

test("GithubExecutor.buildUrl routes unlisted Codex models to /responses (9router#102)", () => {
  // Copilot Codex models advertise supported_endpoints: ["/responses"]. When such
  // a model isn't in the curated gh registry, getModelTargetFormat returns null and
  // the request fell through to /chat/completions -> upstream 400 "model <id> is not
  // accessible via the /chat/completions endpoint". Any *-codex id must route to
  // /responses regardless of whether it's explicitly registered.
  const executor = new GithubExecutor();
  for (const model of [
    "gpt-5-codex",
    "gpt-5.1-codex",
    "gpt-5.1-codex-mini",
    "gpt-5.1-codex-max",
    "gpt-5.2-codex",
  ]) {
    assert.equal(
      executor.buildUrl(model, true),
      "https://api.githubcopilot.com/responses",
      `${model} must route to /responses`
    );
  }
  // Non-codex unlisted models keep the chat/completions default.
  assert.equal(
    executor.buildUrl("some-random-chat-model", true),
    "https://api.githubcopilot.com/chat/completions"
  );
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
      // Trailing user turn: dropTrailingAssistantPrefill (9router#2143) strips a
      // conversation that ends in "assistant", which would otherwise remove the very
      // message this test inspects below. Keep the array ending in "user" so this test
      // stays focused on response_format injection + reasoning-field stripping.
      { role: "user", content: "thanks" },
    ],
  };

  const result = executor.transformRequest("claude-sonnet-4", body, true, {});

  assert.equal(result.response_format, undefined);
  assert.equal(result.messages[0].role, "system");
  assert.match(result.messages[0].content, /Respond only with valid JSON/);
  assert.equal(result.messages[2].reasoning_text, undefined);
  assert.equal(result.messages[2].reasoning_content, undefined);
});

test("GithubExecutor.transformRequest sanitizes Anthropic-shape content parts (tool_use, tool_result, thinking) for /chat/completions (port from 9router#220)", () => {
  // GitHub Copilot /chat/completions only accepts {type:'text'} or {type:'image_url'} content
  // parts. Clients like Cursor IDE pass through Anthropic-shape parts (tool_use, tool_result,
  // thinking) untouched when using Claude models, which makes the endpoint return:
  //   "type has to be either 'image_url' or 'text'" (HTTP 400)
  // Port: serialize unknown part types as text, drop empty content, and skip assistant
  // messages whose only content was tool_calls (content collapses to null).
  const executor = new GithubExecutor();
  const body = {
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Search for X" },
          { type: "image_url", image_url: { url: "data:image/png;base64,AAAA" } },
        ],
      },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "let me search" },
          { type: "tool_use", id: "call_1", name: "search", input: { q: "X" } },
        ],
      },
      {
        role: "tool",
        tool_call_id: "call_1",
        content: [{ type: "tool_result", tool_use_id: "call_1", content: "result" }],
      },
    ],
  };

  const result = executor.transformRequest("claude-sonnet-4.6", body, true, {});

  // user message keeps text + image_url parts untouched
  assert.equal(result.messages[0].content[0].type, "text");
  assert.equal(result.messages[0].content[0].text, "Search for X");
  assert.equal(result.messages[0].content[1].type, "image_url");
  assert.equal(result.messages[0].content[1].image_url?.url, "data:image/png;base64,AAAA");

  // assistant: thinking + tool_use serialized to text type — no unknown type leaks to wire
  for (const part of result.messages[1].content) {
    assert.ok(
      part.type === "text" || part.type === "image_url",
      `unsupported type leaked: ${part.type}`
    );
  }
  assert.ok(result.messages[1].content.some((p: any) => /let me search/.test(p.text)));
  assert.ok(
    result.messages[1].content.some((p: any) => /search/.test(p.text) && /"q":"X"/.test(p.text))
  );

  // tool message: tool_result serialized to text — no unknown type leaks
  for (const part of result.messages[2].content) {
    assert.ok(
      part.type === "text" || part.type === "image_url",
      `unsupported type leaked: ${part.type}`
    );
  }
});

test("GithubExecutor.transformRequest collapses assistant content to null when every part stripped to empty", () => {
  // assistant messages whose only content was tool_use (no text) should not ship empty
  // strings to /chat/completions — GitHub rejects "" parts. Mirror upstream by dropping
  // empty parts and falling back to null when nothing meaningful remains.
  const executor = new GithubExecutor();
  const body = {
    messages: [
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "call_x", name: "noop", input: {} }],
        tool_calls: [
          { id: "call_x", type: "function", function: { name: "noop", arguments: "{}" } },
        ],
      },
    ],
  };

  const result = executor.transformRequest("claude-sonnet-4.6", body, true, {});
  // Either null or an array of {text:non-empty} — never an empty-text part.
  const c = result.messages[0].content;
  if (Array.isArray(c)) {
    for (const part of c) {
      assert.notEqual(part.text, "", "empty text part leaked to wire");
    }
  } else {
    assert.equal(c, null);
  }
  // tool_calls must survive — they ride alongside content
  assert.equal(result.messages[0].tool_calls[0].id, "call_x");
});

test("GithubExecutor.transformRequest leaves string content and missing content untouched", () => {
  const executor = new GithubExecutor();
  const body = {
    messages: [
      { role: "user", content: "plain string" },
      {
        role: "assistant",
        tool_calls: [{ id: "c1", type: "function", function: { name: "f", arguments: "{}" } }],
      },
      // Trailing tool response: dropTrailingAssistantPrefill (9router#2143) strips a
      // conversation that ends in "assistant", which would otherwise remove the very
      // tool_calls message this test inspects below. A real tool round-trip ends in
      // "tool", not "assistant" — model that shape instead.
      { role: "tool", tool_call_id: "c1", content: "result" },
    ],
  };
  const result = executor.transformRequest("claude-sonnet-4.6", body, true, {});
  assert.equal(result.messages[0].content, "plain string");
  assert.equal(result.messages[1].content, undefined);
  assert.equal(result.messages[1].tool_calls[0].id, "c1");
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
  assert.equal(headers["editor-version"], "vscode/1.126.0");
  assert.equal(headers["editor-plugin-version"], "copilot-chat/0.54.0");
  assert.equal(headers["user-agent"], "GitHubCopilotChat/0.54.0");
  assert.equal(headers["x-github-api-version"], "2026-06-01");
  assert.equal(headers["openai-intent"], "conversation-panel");
  assert.equal(headers["X-Initiator"], "user");
  assert.ok(headers["x-request-id"]);
});

test("GithubExecutor.buildHeaders forwards valid client x-initiator and falls back for invalid values", () => {
  const executor = new GithubExecutor();

  const agentHeaders = executor.buildHeaders({ accessToken: "gh-access-token" }, true, {
    "x-initiator": "agent",
  });
  assert.equal(agentHeaders["X-Initiator"], "agent");

  const invalidHeaders = executor.buildHeaders({ accessToken: "gh-access-token" }, true, {
    "x-initiator": "automation",
  });
  assert.equal(invalidHeaders["X-Initiator"], "user");

  const mixedCaseHeaders = executor.buildHeaders({ accessToken: "gh-access-token" }, true, {
    "X-InItIaToR": "agent",
  });
  assert.equal(mixedCaseHeaders["X-Initiator"], "agent");
});

test("GithubExecutor.execute forwards client x-initiator headers without shared state", async () => {
  const executor = new GithubExecutor();
  const originalFetch = globalThis.fetch;
  const seenInitiators: string[] = [];

  globalThis.fetch = async (_url, init: RequestInit = {}) => {
    seenInitiators.push((init.headers as Record<string, string>)["X-Initiator"]);
    return new Response(JSON.stringify({ choices: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    await executor.execute({
      model: "gpt-4.1",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {
        accessToken: "gh-access-token",
        providerSpecificData: { copilotToken: "copilot-token" },
      },
      clientHeaders: { "x-initiator": "agent" },
    });
    await executor.execute({
      model: "gpt-4.1",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: false,
      credentials: {
        accessToken: "gh-access-token",
        providerSpecificData: { copilotToken: "copilot-token" },
      },
      clientHeaders: { "x-initiator": "user" },
    });

    assert.deepEqual(seenInitiators, ["agent", "user"]);
  } finally {
    globalThis.fetch = originalFetch;
  }
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

  globalThis.fetch = async (url, options: RequestInit = {}) => {
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
      assert.equal((options.headers as Record<string, string>).Authorization, "token new-gh-token");
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

test("GithubExecutor.execute preserves complete SSE responses including terminal [DONE] frames", async () => {
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
    assert.match(text, /\[DONE\]/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GithubExecutor.transformRequest strips temperature for gpt-5.4 (port from 9router#612 / closes upstream #536)", () => {
  // GitHub Copilot's gpt-5.4 family rejects requests carrying `temperature` with HTTP 400:
  //   "Unsupported parameter: 'temperature' is not supported with this model."
  // OmniRoute's existing `stripGpt5SamplingWhenReasoning` guard only fires for
  // provider==="openai" (raw api.openai.com Chat Completions) — Copilot requests run
  // through GithubExecutor and never hit that guard. Strip temperature here so the
  // 400 cannot reach the user. Other GitHub Copilot models keep temperature intact.
  const executor = new GithubExecutor();

  const stripped = executor.transformRequest(
    "gpt-5.4",
    { temperature: 0.7, messages: [{ role: "user", content: "hi" }] },
    true,
    {}
  );
  assert.equal(stripped.temperature, undefined, "temperature must be stripped for gpt-5.4");

  const strippedMini = executor.transformRequest(
    "gpt-5.4-mini",
    { temperature: 0.3, messages: [{ role: "user", content: "hi" }] },
    true,
    {}
  );
  assert.equal(
    strippedMini.temperature,
    undefined,
    "temperature must be stripped for gpt-5.4-mini"
  );

  const kept = executor.transformRequest(
    "gpt-4.1",
    { temperature: 0.7, messages: [{ role: "user", content: "hi" }] },
    true,
    {}
  );
  assert.equal(kept.temperature, 0.7, "temperature must be preserved for non-gpt-5.4 models");
});

test("GithubExecutor.transformRequest strips invalid synthetic Responses reasoning ids", () => {
  const executor = new GithubExecutor();
  const result = executor.transformRequest(
    "gpt-5.5",
    {
      input: [
        {
          id: "thinking_0",
          type: "reasoning",
          summary: [{ type: "summary_text", text: "cached reasoning" }],
        },
      ],
    },
    true,
    {}
  );

  assert.equal(result.input[0].id, undefined);
  assert.equal(result.input[0].type, "reasoning");
});
