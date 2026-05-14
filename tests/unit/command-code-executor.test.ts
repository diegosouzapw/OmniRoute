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

function commandCodeStream(lines: unknown[], { sse = false } = {}) {
  const text = lines
    .map((line) => {
      const json = JSON.stringify(line);
      return sse ? `data: ${json}\n\n` : `${json}\n`;
    })
    .join("");
  return new Response(text, { status: 200, headers: { "Content-Type": "application/x-ndjson" } });
}

function toPlainHeaders(headers: any) {
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  return Object.fromEntries(Object.entries(headers).map(([key, value]) => [key, String(value)]));
}

function parseSsePayloads(sse: string) {
  return sse
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line) => line.slice(6).trim())
    .filter((line) => line && line !== "[DONE]")
    .map((line) => JSON.parse(line));
}

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("Command Code provider catalog has pinned models and alias lookup", () => {
  const entry = REGISTRY["command-code"];
  assert.ok(entry);
  assert.equal(entry.alias, "cmd");
  assert.equal(entry.executor, "command-code");
  assert.equal(entry.baseUrl, "https://api.commandcode.ai");
  assert.equal(entry.chatPath, "/alpha/generate");
  assert.deepEqual(
    entry.models.map((model) => model.id),
    PINNED_COMMAND_CODE_MODELS
  );
  assert.equal(getRegistryEntry("cmd"), entry);
});

test("getExecutor returns the specialized Command Code executor", () => {
  assert.equal(hasSpecializedExecutor("command-code"), true);
  assert.ok(getExecutor("command-code") instanceof CommandCodeExecutor);
  assert.ok(getExecutor("cmd") instanceof CommandCodeExecutor);
});

test("Command Code executor posts wrapped body and required headers to alpha/generate", async () => {
  const calls: any[] = [];
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), init });
    return commandCodeStream([{ type: "text-delta", text: "hello" }, { type: "finish" }]);
  };

  const executor = getExecutor("command-code");
  const { response, url, headers, transformedBody } = await executor.execute({
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

  assert.equal(url, "https://api.commandcode.ai/alpha/generate");
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.commandcode.ai/alpha/generate");
  assert.equal(calls[0].init.method, "POST");
  assert.equal(headers.Authorization, "Bearer cc_test_key");
  assert.equal(headers["x-command-code-version"], "0.24.1");
  assert.equal(headers["x-cli-environment"], "external");
  assert.equal(headers["x-project-slug"], "pi-cc");
  assert.equal(headers["x-taste-learning"], "false");
  assert.equal(headers["x-co-flag"], "false");
  assert.equal(typeof headers["x-session-id"], "string");

  const posted = JSON.parse(String(calls[0].init.body));
  assert.deepEqual(posted, transformedBody);
  for (const key of ["config", "memory", "taste", "permissionMode", "params"]) {
    assert.ok(key in posted, `missing ${key}`);
  }
  assert.equal(posted.params.model, "gpt-5.4-mini");
  assert.equal(posted.params.stream, false);
  assert.equal(posted.params.system, "You are concise.");
  assert.equal(posted.params.messages[0].role, "user");
  assert.equal(posted.params.tools[0].name, "lookup");

  const json = await response.json();
  assert.equal(json.choices[0].message.content, "hello");
});

test("Command Code raw NDJSON stream becomes OpenAI chat SSE chunks", async () => {
  globalThis.fetch = async () =>
    commandCodeStream([
      { type: "text-delta", text: "Hello" },
      { type: "reasoning-delta", text: "thinking" },
      { type: "tool-call", toolCallId: "call_1", toolName: "search", input: { q: "docs" } },
      { type: "finish", finishReason: "tool-calls" },
    ]);

  const { response } = await getExecutor("command-code").execute({
    model: "gpt-5.4",
    stream: true,
    credentials: { apiKey: "cc_test_key" },
    body: { messages: [{ role: "user", content: "Hi" }] },
  });

  assert.equal(response.headers.get("Content-Type"), "text/event-stream; charset=utf-8");
  const sse = await response.text();
  assert.match(sse, /data: \[DONE\]/);
  const chunks = parseSsePayloads(sse);
  assert.equal(chunks[0].object, "chat.completion.chunk");
  assert.deepEqual(chunks[0].choices[0].delta, { role: "assistant" });
  assert.equal(chunks[1].choices[0].delta.content, "Hello");
  assert.equal(chunks[2].choices[0].delta.reasoning_content, "thinking");
  assert.equal(chunks[3].choices[0].delta.tool_calls[0].function.name, "search");
  assert.equal(chunks.at(-1).choices[0].finish_reason, "tool_calls");
});

test("Command Code data: SSE lines aggregate into non-stream ChatCompletion JSON", async () => {
  globalThis.fetch = async () =>
    commandCodeStream(
      [
        { type: "text-delta", text: "Hel" },
        { type: "text-delta", text: "lo" },
        { type: "reasoning-delta", text: "because" },
        { type: "tool-call", id: "call_2", name: "lookup", arguments: { id: 7 } },
        {
          type: "finish",
          finishReason: "max_tokens",
          totalUsage: {
            inputTokens: 3,
            inputTokenDetails: { cacheReadTokens: 2 },
            outputTokens: 5,
          },
        },
      ],
      { sse: true }
    );

  const { response } = await getExecutor("command-code").execute({
    model: "gpt-5.4-mini",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: { messages: [{ role: "user", content: "Hi" }] },
  });

  assert.equal(response.headers.get("Content-Type"), "application/json");
  const json = await response.json();
  assert.equal(json.object, "chat.completion");
  assert.equal(json.choices[0].message.content, "Hello");
  assert.equal(json.choices[0].message.reasoning_content, "because");
  assert.equal(json.choices[0].message.tool_calls[0].function.arguments, JSON.stringify({ id: 7 }));
  assert.equal(json.choices[0].finish_reason, "length");
  assert.deepEqual(json.usage, { prompt_tokens: 5, completion_tokens: 5, total_tokens: 10 });
});

test("Command Code executor surfaces upstream and streamed errors", async () => {
  globalThis.fetch = async () =>
    new Response("bad key", { status: 401, statusText: "Unauthorized" });
  const upstreamFailure = await getExecutor("command-code").execute({
    model: "gpt-5.4-mini",
    stream: false,
    credentials: { apiKey: "cc_test_key" },
    body: { messages: [{ role: "user", content: "Hi" }] },
  });
  assert.equal(upstreamFailure.response.status, 401);
  assert.equal(await upstreamFailure.response.text(), "bad key");

  globalThis.fetch = async () => commandCodeStream([{ type: "error", error: { message: "boom" } }]);
  await assert.rejects(async () => {
    await getExecutor("command-code").execute({
      model: "gpt-5.4-mini",
      stream: false,
      credentials: { apiKey: "cc_test_key" },
      body: { messages: [{ role: "user", content: "Hi" }] },
    });
  }, /boom/);
});

test("Command Code non-stream aggregation throws when the final error event lacks a trailing newline", async () => {
  globalThis.fetch = async () =>
    new Response(
      `${JSON.stringify({ type: "text-delta", text: "Hello" })}\n${JSON.stringify({
        type: "error",
        error: { message: "boom" },
      })}`,
      { status: 200, headers: { "Content-Type": "application/x-ndjson" } }
    );

  await assert.rejects(async () => {
    await getExecutor("command-code").execute({
      model: "gpt-5.4-mini",
      stream: false,
      credentials: { apiKey: "cc_test_key" },
      body: { messages: [{ role: "user", content: "Hi" }] },
    });
  }, /boom/);
});
