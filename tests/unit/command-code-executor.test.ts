import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-command-code-executor-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { REGISTRY, getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
const { CommandCodeExecutor } = await import("../../open-sse/executors/commandCode.ts");
const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");
const core = await import("../../src/lib/db/core.ts");

const originalFetch = globalThis.fetch;

type FetchCall = { url: string; init: Record<string, unknown>; body?: Record<string, unknown> };

const PINNED_COMMAND_CODE_MODELS = [
  "claude-opus-4-7",
  "claude-opus-4-6",
  "claude-sonnet-4-6",
  "claude-haiku-4-5-20251001",
  "gpt-5.5",
  "gpt-5.4",
  "gpt-5.3-codex",
  "gpt-5.4-mini",
  "deepseek/deepseek-v4-pro",
  "deepseek/deepseek-v4-flash",
  "moonshotai/Kimi-K2.6",
  "moonshotai/Kimi-K2.5",
  "zai-org/GLM-5.1",
  "zai-org/GLM-5",
  "MiniMaxAI/MiniMax-M2.7",
  "MiniMaxAI/MiniMax-M2.5",
  "Qwen/Qwen3.6-Max-Preview",
  "Qwen/Qwen3.6-Plus",
];

const CHAT_URL = "https://api.commandcode.ai/provider/v1/chat/completions";

function parseSsePayloads(sse: string) {
  return sse
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => line.slice(6).trim())
    .filter((line) => line && line !== "[DONE]")
    .map((line) => JSON.parse(line));
}

function openAiSse(obj: unknown): string {
  return `data: ${JSON.stringify(obj)}\n\n`;
}

function captureFetch(body: Record<string, unknown>) {
  const calls: FetchCall[] = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({
      url: String(url),
      init,
      body: JSON.parse(String(init.body)),
    });
    return new Response(JSON.stringify(body), { status: 200 });
  };
  return calls;
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Command Code provider catalog has pinned models and alias lookup", () => {
  const entry = REGISTRY["command-code"];
  assert.ok(entry);
  assert.equal(entry.alias, "cmd");
  assert.equal(entry.executor, "command-code");
  assert.equal(entry.baseUrl, "https://api.commandcode.ai");
  // Chat targets the documented /provider/v1/chat/completions endpoint, NOT the
  // CLI-only /alpha/generate endpoint (#10265).
  assert.equal(entry.chatPath, "/provider/v1/chat/completions");
  assert.deepEqual(
    entry.models.map((model) => model.id),
    PINNED_COMMAND_CODE_MODELS
  );
  assert.equal(getRegistryEntry("cmd"), entry);
});

test("getExecutor returns the specialized Command Code executor", async () => {
  assert.equal(hasSpecializedExecutor("command-code"), true);
  assert.ok((await getExecutor("command-code")) instanceof CommandCodeExecutor);
  assert.ok((await getExecutor("cmd")) instanceof CommandCodeExecutor);
});

test("Command Code executor posts a flat OpenAI body + standard headers to /provider/v1/chat/completions (#10265)", async () => {
  const calls = captureFetch({});
  const executor = await getExecutor("command-code");
  const { response, url, headers } = await executor.execute({
    model: "gpt-5.4-mini",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      stream: false,
      messages: [
        { role: "system", content: "You are concise." },
        { role: "user", content: "Hi" },
      ],
      tools: [{ type: "function", function: { name: "lookup", parameters: { type: "object" } } }],
      max_tokens: 42,
    },
  });

  assert.equal(url, CHAT_URL);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, CHAT_URL);
  assert.equal(calls[0].init.method, "POST");
  assert.equal(headers.Authorization, "Bearer cc_test_key");
  // No CLI-impersonation headers.
  assert.equal(headers["x-command-code-version"], undefined);
  assert.equal(headers["x-cli-environment"], undefined);
  assert.equal(headers["x-project-slug"], undefined);

  const posted = calls[0].body as Record<string, unknown>;
  // No CLI envelope.
  assert.equal(posted.config, undefined, "CLI envelope config must not be sent");
  assert.equal(posted.params, undefined, "CLI envelope params wrapper must not be sent");
  assert.equal(posted.model, "gpt-5.4-mini");
  assert.equal(posted.stream, false);
  assert.equal((posted.messages as Array<{ role: string }>)[0].role, "system");
  const tool = (posted.tools as Array<{ function: { name: string } }>)[0];
  assert.equal(tool.function.name, "lookup", "tools in OpenAI shape (function.name)");
  assert.equal(posted.max_tokens, 42);

  // The upstream OpenAI JSON passes through untouched.
  const json = await response.json();
  assert.deepEqual(json, {});
});

test("Command Code executor passes reasoning/thinking fields through at the top level of the OpenAI body", async () => {
  const calls = captureFetch({});
  (await getExecutor("command-code")).execute({
    model: "deepseek/deepseek-v4-pro",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      stream: false,
      messages: [{ role: "user", content: "Hi" }],
      reasoning_effort: "high",
      thinking: { type: "enabled" },
      effort: "high",
      extra_body: { enable_thinking: true },
    },
  });

  const posted = calls[0].body as Record<string, unknown>;
  assert.equal(posted.reasoning_effort, "high");
  assert.deepEqual(posted.thinking, { type: "enabled" });
  assert.equal(posted.effort, "high");
  assert.deepEqual(posted.extra_body, { enable_thinking: true });
});

test("Command Code executor honors body.model rewrite from payload rules", async () => {
  const calls = captureFetch({});
  (await getExecutor("command-code")).execute({
    model: "deepseek-v4-pro-max",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      stream: false,
      model: "deepseek/deepseek-v4-pro",
      messages: [{ role: "user", content: "Hi" }],
      reasoning_effort: "max",
    },
  });

  const posted = calls[0].body as Record<string, unknown>;
  assert.equal(posted.model, "deepseek/deepseek-v4-pro");
  assert.equal(posted.reasoning_effort, "max");
});

test("Command Code executor maps unsupported minimal reasoning_effort to low (upstream 400 regression)", async () => {
  const calls = captureFetch({});
  // `minimal` (a Muse Spark catalog tier) must be downgraded to `low` before
  // the wire body is built, on BOTH the combo and single-model paths.
  (await getExecutor("command-code")).execute({
    model: "poolside/laguna-s-2.1-free",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: {
      stream: false,
      messages: [{ role: "user", content: "Hi" }],
      reasoning_effort: "minimal",
    },
  });

  const posted = calls[0].body as Record<string, unknown>;
  assert.equal(posted.reasoning_effort, "low", "minimal must map to low");
});

test("Command Code executor passes the upstream OpenAI SSE stream through untouched", async () => {
  const sse =
    openAiSse({
      id: "c1",
      object: "chat.completion.chunk",
      model: "gpt-5.4",
      choices: [{ index: 0, delta: { role: "assistant" } }],
    }) +
    openAiSse({
      id: "c1",
      object: "chat.completion.chunk",
      model: "gpt-5.4",
      choices: [{ index: 0, delta: { content: "Hello" } }],
    }) +
    openAiSse({
      id: "c1",
      object: "chat.completion.chunk",
      model: "gpt-5.4",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    }) +
    "data: [DONE]\n\n";
  let capturedStreamFlag: unknown = null;
  globalThis.fetch = async (url, init = {}) => {
    capturedStreamFlag = JSON.parse(String(init.body)).stream;
    return new Response(sse, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  };

  const { response } = await (
    await getExecutor("command-code")
  ).execute({
    model: "gpt-5.4",
    stream: true,
    credentials: { apiKey: "cc_test_key" },
    body: { messages: [{ role: "user", content: "Hi" }] },
  });

  assert.equal(capturedStreamFlag, true, "stream flag forwarded to upstream");
  const text = await response.text();
  assert.equal(text, sse, "OpenAI SSE stream passed through byte-for-byte");
  assert.ok(text.includes("data: [DONE]"));
  const chunks = parseSsePayloads(text);
  assert.equal(chunks[0].choices[0].delta.role, "assistant");
  assert.equal(chunks[1].choices[0].delta.content, "Hello");
  assert.equal(chunks[2].choices[0].finish_reason, "stop");
});

test("Command Code executor passes the upstream OpenAI JSON through untouched (non-stream)", async () => {
  const upstreamJson = {
    id: "chatcmpl-1",
    object: "chat.completion",
    model: "gpt-5.4-mini",
    choices: [
      { index: 0, message: { role: "assistant", content: "Hello" }, finish_reason: "stop" },
    ],
    usage: { prompt_tokens: 3, completion_tokens: 2, total_tokens: 5 },
  };
  let capturedStreamFlag: unknown = null;
  globalThis.fetch = async (url, init = {}) => {
    capturedStreamFlag = JSON.parse(String(init.body)).stream;
    return new Response(JSON.stringify(upstreamJson), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  const { response } = await (
    await getExecutor("command-code")
  ).execute({
    model: "gpt-5.4-mini",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: { messages: [{ role: "user", content: "Hi" }] },
  });

  assert.equal(capturedStreamFlag, false, "stream flag forwarded as false for non-stream");
  assert.deepEqual(await response.json(), upstreamJson);
});

test("Command Code executor surfaces upstream errors", async () => {
  globalThis.fetch = async () =>
    new Response("bad key", { status: 401, statusText: "Unauthorized" });
  const upstreamFailure = await (
    await getExecutor("command-code")
  ).execute({
    model: "gpt-5.4-mini",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: { messages: [{ role: "user", content: "Hi" }] },
  });
  assert.equal(upstreamFailure.response.status, 401);
  assert.equal(await upstreamFailure.response.text(), "bad key");
});

test("Command Code executor omits max_tokens when the client does not supply one", async () => {
  const calls = captureFetch({});
  (await getExecutor("command-code")).execute({
    model: "zai-org/GLM-5.1",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: { messages: [{ role: "user", content: "Hi" }] },
  });
  const posted = calls[0].body as Record<string, unknown>;
  assert.ok(!("max_tokens" in posted), "must not fabricate max_tokens");
  assert.ok(!("max_completion_tokens" in posted), "must not fabricate max_completion_tokens");
});

test("Command Code executor clamps an oversized client-supplied max_tokens to the endpoint ceiling", async () => {
  const calls = captureFetch({});
  // A client asking for more than the 200000 endpoint ceiling is clamped down.
  (await getExecutor("command-code")).execute({
    model: "deepseek/deepseek-v4-pro",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: { messages: [{ role: "user", content: "Hi" }], max_tokens: 500000 },
  });
  assert.equal((calls[0].body as Record<string, unknown>).max_tokens, 200000);
});

test("Command Code executor honors a smaller client-provided max_tokens", async () => {
  const calls = captureFetch({});
  (await getExecutor("command-code")).execute({
    model: "zai-org/GLM-5.1",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: { messages: [{ role: "user", content: "Hi" }], max_tokens: 2048 },
  });
  assert.equal((calls[0].body as Record<string, unknown>).max_tokens, 2048);
});

test("Command Code stream preserves the upstream OpenAI usage chunk (passthrough)", async () => {
  const sse =
    openAiSse({
      id: "c1",
      object: "chat.completion.chunk",
      model: "gpt-5.4-mini",
      choices: [{ index: 0, delta: { content: "Hi" } }],
    }) +
    openAiSse({
      id: "c1",
      object: "chat.completion.chunk",
      model: "gpt-5.4-mini",
      choices: [],
      usage: {
        prompt_tokens: 10,
        prompt_tokens_details: { cached_tokens: 4 },
        completion_tokens: 6,
        completion_tokens_details: { reasoning_tokens: 1 },
        total_tokens: 16,
      },
    }) +
    "data: [DONE]\n\n";
  globalThis.fetch = async () =>
    new Response(sse, { status: 200, headers: { "Content-Type": "text/event-stream" } });

  const { response } = await (
    await getExecutor("command-code")
  ).execute({
    model: "gpt-5.4-mini",
    stream: true,
    credentials: { apiKey: "cc_test_key" },
    body: { messages: [{ role: "user", content: "Hi" }] },
  });

  const text = await response.text();
  // The upstream OpenAI usage chunk passes through unchanged, including the
  // standard OpenAI usage shape the stream pipeline already understands.
  assert.ok(text.includes('"prompt_tokens":10'));
  assert.ok(text.includes('"cached_tokens":4'));
  assert.ok(text.includes('"reasoning_tokens":1'));
  assert.ok(text.includes("data: [DONE]"));
});

test("Command Code executor falls back to /alpha/generate on 403 (e.g. Go plan without Provider API access) for streaming", async () => {
  const calls: Array<{
    url: string;
    headers: Record<string, string>;
    body: Record<string, unknown>;
  }> = [];
  globalThis.fetch = async (url, init = {}) => {
    const urlStr = String(url);
    calls.push({
      url: urlStr,
      headers: (init.headers || {}) as Record<string, string>,
      body: JSON.parse(String(init.body)) as Record<string, unknown>,
    });

    if (urlStr.includes("/provider/v1/chat/completions")) {
      return new Response(
        JSON.stringify({
          error: {
            message:
              "Your Go plan doesn't include API access. Upgrade to Provider or higher at https://commandcode.ai/billing to use these endpoints.",
            type: "permission_error",
            code: "upgrade_required",
          },
        }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    if (urlStr.includes("/alpha/generate")) {
      const cliSse =
        'data: {"type":"text-delta","text":"Hello from CLI fallback"}\n\n' +
        'data: {"type":"finish","finishReason":"stop","usage":{"inputTokens":5,"outputTokens":4,"totalTokens":9}}\n\n';
      return new Response(cliSse, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }

    return new Response("Not found", { status: 404 });
  };

  const { response, url, headers } = await (
    await getExecutor("command-code")
  ).execute({
    model: "deepseek/deepseek-v4-flash",
    stream: true,
    credentials: { apiKey: "cc_go_plan_key" },
    body: { messages: [{ role: "user", content: "Hi" }] },
  });

  assert.equal(calls.length, 2, "probed /provider/v1 first, then fell back to /alpha/generate");
  assert.ok(calls[0].url.includes("/provider/v1/chat/completions"));
  assert.ok(calls[1].url.includes("/alpha/generate"));
  assert.equal(calls[1].headers["x-cli-environment"], "external");
  assert.equal(calls[1].headers["x-command-code-version"], "1.15.1");
  assert.equal((calls[1].body.config as Record<string, unknown>).environment, "external");

  assert.ok(url.includes("/alpha/generate"));
  assert.equal(headers["x-cli-environment"], "external");
  const text = await response.text();
  assert.ok(text.includes("Hello from CLI fallback"));
  assert.ok(text.includes("data: [DONE]"));
});

test("Command Code executor falls back to /alpha/generate on 403 (Go plan) for non-stream JSON", async () => {
  const calls: string[] = [];
  globalThis.fetch = async (url) => {
    const urlStr = String(url);
    calls.push(urlStr);

    if (urlStr.includes("/provider/v1/chat/completions")) {
      return new Response(
        JSON.stringify({ error: { message: "upgrade_required", code: "upgrade_required" } }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    if (urlStr.includes("/alpha/generate")) {
      const cliSse =
        'data: {"type":"text-delta","text":"Non-stream answer"}\n\n' +
        'data: {"type":"finish","finishReason":"stop","usage":{"inputTokens":3,"outputTokens":2,"totalTokens":5}}\n\n';
      return new Response(cliSse, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }

    return new Response("Not found", { status: 404 });
  };

  const { response } = await (
    await getExecutor("command-code")
  ).execute({
    model: "gpt-5.4",
    stream: false,
    credentials: { apiKey: "cc_go_plan_key" },
    body: { messages: [{ role: "user", content: "Hi" }] },
  });

  assert.equal(calls.length, 2);
  const json = (await response.json()) as Record<string, unknown>;
  assert.equal(json.object, "chat.completion");
  const choices = json.choices as Array<{ message: { content: string } }>;
  assert.equal(choices[0].message.content, "Non-stream answer");
  const usage = json.usage as { total_tokens: number };
  assert.equal(usage.total_tokens, 5);
});

// Simulates a Go-plan key: /provider/v1/chat/completions answers 403 and the executor
// falls back to /alpha/generate, whose CLI SSE stream is built from `cliLines`.
function goPlanFallbackFetch(cliLines: unknown[]) {
  const calls: string[] = [];
  globalThis.fetch = async (url) => {
    const urlStr = String(url);
    calls.push(urlStr);

    if (urlStr.includes("/provider/v1/chat/completions")) {
      return new Response(
        JSON.stringify({ error: { message: "upgrade_required", code: "upgrade_required" } }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    if (urlStr.includes("/alpha/generate")) {
      const cliSse = cliLines.map((line) => `data: ${JSON.stringify(line)}\n\n`).join("");
      return new Response(cliSse, {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }

    return new Response("Not found", { status: 404 });
  };
  return calls;
}

test("Command Code /alpha/generate fallback: reasoning-only output falls back to reasoning as content (non-stream) (#10986)", async () => {
  const calls = goPlanFallbackFetch([
    { type: "reasoning-delta", text: "The user wants 79874+93658. " },
    { type: "reasoning-delta", text: "That equals 173532." },
    {
      type: "finish",
      finishReason: "stop",
      totalUsage: {
        inputTokens: 20,
        outputTokens: 64,
        outputTokenDetails: { reasoningTokens: 61 },
      },
    },
  ]);

  const { response, url } = await (
    await getExecutor("command-code")
  ).execute({
    model: "deepseek/deepseek-v4-flash",
    stream: false,
    credentials: { apiKey: "cc_go_plan_key" },
    body: {
      messages: [
        { role: "user", content: "Calculate 79874+93658, and reply with the result only." },
      ],
    },
  });

  assert.equal(calls.length, 2, "probed /provider/v1 first, then fell back to /alpha/generate");
  assert.ok(url.includes("/alpha/generate"));
  const json = (await response.json()) as {
    choices: Array<{
      message: { content: string; reasoning_content?: string };
      finish_reason: string;
    }>;
    usage: { completion_tokens_details: { reasoning_tokens: number } };
  };
  const message = json.choices[0].message;
  // Regression #10986: when the model emits only reasoning-delta events (never a
  // text-delta), content must fall back to the reasoning text instead of "" (which
  // OpenAI-compatible clients treat as null/no answer).
  assert.equal(message.content, "The user wants 79874+93658. That equals 173532.");
  // reasoning_content must STAY populated for reasoning-aware clients.
  assert.equal(message.reasoning_content, "The user wants 79874+93658. That equals 173532.");
  assert.equal(json.choices[0].finish_reason, "stop");
  assert.equal(json.usage.completion_tokens_details.reasoning_tokens, 61);
});

test("Command Code /alpha/generate fallback: reasoning-only output emits a content delta chunk when streaming (#10986)", async () => {
  const calls = goPlanFallbackFetch([
    { type: "reasoning-delta", text: "The result is 173532." },
    { type: "finish", finishReason: "stop" },
  ]);

  const { response, url } = await (
    await getExecutor("command-code")
  ).execute({
    model: "deepseek/deepseek-v4-flash",
    stream: true,
    credentials: { apiKey: "cc_go_plan_key" },
    body: { messages: [{ role: "user", content: "Calcular 79874+93658" }] },
  });

  assert.equal(calls.length, 2, "probed /provider/v1 first, then fell back to /alpha/generate");
  assert.ok(url.includes("/alpha/generate"));
  const sse = await response.text();
  assert.match(sse, /data: \[DONE\]/);
  const chunks = parseSsePayloads(sse);
  assert.equal(chunks[0].choices[0].delta.role, "assistant");
  // Regression #10986: the reasoning-only stream must emit a content delta when it
  // otherwise ends with no content. reasoning_content stays present too.
  const contentChunks = chunks.filter((c) => c.choices[0]?.delta?.content !== undefined);
  assert.equal(contentChunks.length, 1, "exactly one synthesized content delta");
  assert.equal(contentChunks[0].choices[0].delta.content, "The result is 173532.");
  const reasoningDelta = chunks.find((c) => c.choices[0]?.delta?.reasoning_content !== undefined);
  assert.equal(reasoningDelta.choices[0].delta.reasoning_content, "The result is 173532.");
  // The synthesized content lands after the reasoning delta and before the finish chunk.
  const finishIndex = chunks.findIndex((c) => c.choices[0]?.finish_reason === "stop");
  assert.ok(finishIndex > chunks.indexOf(contentChunks[0]));
  assert.ok(chunks.indexOf(contentChunks[0]) > chunks.indexOf(reasoningDelta));
  assert.equal(chunks[finishIndex].choices[0].finish_reason, "stop");
});

test("Command Code executor surfaces fallback error when both /provider/v1 and /alpha/generate fail", async () => {
  globalThis.fetch = async (url) => {
    const urlStr = String(url);
    if (urlStr.includes("/provider/v1/chat/completions")) {
      return new Response("forbidden", { status: 403 });
    }
    if (urlStr.includes("/alpha/generate")) {
      return new Response("insufficient credits on fallback", { status: 400 });
    }
    return new Response("error", { status: 500 });
  };

  const result = await (
    await getExecutor("command-code")
  ).execute({
    model: "gpt-5.4",
    stream: false,
    credentials: { apiKey: "cc_key" },
    body: { messages: [{ role: "user", content: "Hi" }] },
  });

  assert.equal(result.response.status, 400);
  assert.equal(await result.response.text(), "insufficient credits on fallback");
});
