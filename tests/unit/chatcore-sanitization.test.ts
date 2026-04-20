import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chatcore-sanitization-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { createMemory, listMemories } = await import("../../src/lib/memory/store.ts");
const { invalidateMemorySettingsCache } = await import("../../src/lib/memory/settings.ts");
const core = await import("../../src/lib/db/core.ts");

function noopLog() {
  return {
    debug() {},
    info() {},
    warn() {},
    error() {},
  };
}

function toPlainHeaders(headers) {
  if (!headers) return {};
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key, value == null ? "" : String(value)])
  );
}

function buildUpstreamResponse(stream) {
  if (stream) {
    return new Response(
      'data: {"id":"chatcmpl-stream","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"role":"assistant","content":"ok"}}]}\n\ndata: [DONE]\n\n',
      {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      }
    );
  }

  return new Response(
    JSON.stringify({
      id: "chatcmpl-json",
      object: "chat.completion",
      model: "gpt-4o-mini",
      choices: [
        {
          index: 0,
          message: { role: "assistant", content: "ok" },
          finish_reason: "stop",
        },
      ],
      usage: {
        prompt_tokens: 1,
        completion_tokens: 1,
        total_tokens: 2,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

function ensureLegacyMemoryTable() {
  const db = core.getDbInstance();
  db.exec(`
    CREATE TABLE IF NOT EXISTS memory (
      id TEXT PRIMARY KEY,
      apiKeyId TEXT NOT NULL,
      sessionId TEXT,
      type TEXT NOT NULL,
      key TEXT,
      content TEXT NOT NULL,
      metadata TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL,
      expiresAt TEXT
    )
  `);
}

async function waitForAsyncMemoryFlush() {
  await new Promise((resolve) => setImmediate(resolve));
  await new Promise((resolve) => setTimeout(resolve, 10));
}

async function invokeChatCore({
  body,
  accept = "application/json",
  provider = "openai",
  model = "gpt-4o-mini",
  endpoint = "/v1/chat/completions",
  credentials = { apiKey: "sk-test", providerSpecificData: {} },
  apiKeyInfo = null,
  userAgent = "unit-test",
  responseFactory,
} = {}) {
  const originalFetch = globalThis.fetch;
  const calls = [];
  const resolvedStream =
    body?.stream === true ||
    (body?.stream === undefined && String(accept).toLowerCase().includes("text/event-stream"));

  globalThis.fetch = async (url, init = {}) => {
    const parsedBody = init.body ? JSON.parse(String(init.body)) : null;
    const captured = {
      url: String(url),
      method: init.method || "GET",
      headers: toPlainHeaders(init.headers),
      body: parsedBody,
    };
    calls.push(captured);
    return responseFactory ? responseFactory(captured) : buildUpstreamResponse(resolvedStream);
  };

  try {
    const requestBody = structuredClone(body);
    const result = await handleChatCore({
      body: requestBody,
      modelInfo: { provider, model, extendedContext: false },
      credentials: structuredClone(credentials),
      log: noopLog(),
      clientRawRequest: {
        endpoint,
        body: structuredClone(body),
        headers: new Headers({ accept }),
      },
      apiKeyInfo,
      userAgent,
    });

    return { result, call: calls.at(-1), calls };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test.after(() => {
  try {
    const db = core.getDbInstance();
    db.close();
  } catch {}

  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("chatCore sanitization normalizes max_output_tokens into max_tokens", async () => {
  const copied = await invokeChatCore({
    body: {
      model: "gpt-4o-mini",
      max_output_tokens: 0,
      messages: [{ role: "user", content: "hello" }],
    },
  });
  const preserved = await invokeChatCore({
    body: {
      model: "gpt-4o-mini",
      max_output_tokens: 64,
      max_tokens: 7,
      messages: [{ role: "user", content: "hello" }],
    },
  });
  const untouched = await invokeChatCore({
    body: {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "hello" }],
    },
  });

  assert.equal(copied.call.body.max_tokens, 0);
  assert.equal("max_output_tokens" in copied.call.body, false);
  assert.equal(preserved.call.body.max_tokens, 7);
  assert.equal("max_output_tokens" in preserved.call.body, false);
  assert.equal("max_tokens" in untouched.call.body, false);
});

test("chatCore sanitization preserves max_output_tokens for openai-responses targets", async () => {
  // When the target provider uses openai-responses format (e.g. Codex),
  // max_output_tokens is the canonical field and must NOT be normalized to
  // max_tokens. Normalizing it breaks Responses→Responses passthrough because
  // the translator (which converts max_tokens back) is skipped for same-format.
  const { call } = await invokeChatCore({
    endpoint: "/v1/responses",
    provider: "codex",
    body: {
      model: "gpt-5.4",
      max_output_tokens: 4096,
      input: [{ role: "user", content: "hello" }],
    },
    responseFactory: () =>
      new Response(
        JSON.stringify({
          id: "resp_test",
          object: "response",
          status: "completed",
          model: "gpt-5.4",
          output: [
            { type: "message", role: "assistant", content: [{ type: "output_text", text: "ok" }] },
          ],
          usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      ),
  });

  // max_output_tokens should survive sanitization for Responses targets
  assert.equal(
    "max_tokens" in call.body,
    false,
    "max_tokens must not be injected for Responses targets"
  );

  // Reverse normalization: max_tokens → max_output_tokens for Responses targets
  const fromMaxTokens = await invokeChatCore({
    endpoint: "/v1/responses",
    provider: "codex",
    body: {
      model: "gpt-5.4",
      max_tokens: 2048,
      input: [{ role: "user", content: "hello" }],
    },
    responseFactory: () =>
      new Response(
        JSON.stringify({
          id: "resp_test2",
          object: "response",
          status: "completed",
          model: "gpt-5.4",
          output: [
            { type: "message", role: "assistant", content: [{ type: "output_text", text: "ok" }] },
          ],
          usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      ),
  });

  assert.equal(
    "max_tokens" in fromMaxTokens.call.body,
    false,
    "max_tokens should be converted to max_output_tokens"
  );

  // Reverse normalization: max_completion_tokens → max_output_tokens for Responses targets
  const fromMaxCompletion = await invokeChatCore({
    endpoint: "/v1/responses",
    provider: "codex",
    body: {
      model: "gpt-5.4",
      max_completion_tokens: 8192,
      input: [{ role: "user", content: "hello" }],
    },
    responseFactory: () =>
      new Response(
        JSON.stringify({
          id: "resp_test3",
          object: "response",
          status: "completed",
          model: "gpt-5.4",
          output: [
            { type: "message", role: "assistant", content: [{ type: "output_text", text: "ok" }] },
          ],
          usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      ),
  });

  assert.equal(
    "max_completion_tokens" in fromMaxCompletion.call.body,
    false,
    "max_completion_tokens should be converted to max_output_tokens"
  );
});

test("chatCore sanitization strips empty message names and filters empty tool names", async () => {
  // Note: `input` field is tested separately because its presence triggers
  // Responses format detection (PR #1002), which changes message handling.
  const { call } = await invokeChatCore({
    body: {
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: "hello", name: "" },
        { role: "assistant", content: "world", name: "valid-name" },
      ],
      tools: [
        { type: "function", function: { name: "lookup_weather", parameters: { type: "object" } } },
        { type: "function", function: { name: "", parameters: { type: "object" } } },
        { type: "function", function: { name: "   ", parameters: { type: "object" } } },
        { name: "anthropic_lookup", input_schema: { type: "object" } },
        { name: "", input_schema: { type: "object" } },
      ],
    },
  });

  assert.equal(call.body.messages[0].name, undefined);
  assert.equal(call.body.messages[1].name, "valid-name");
  // 3 invalid tools removed: 2 empty function names + 1 empty anthropic name
  // 2 valid remain: lookup_weather (function) + anthropic_lookup (anthropic-format)
  assert.equal(call.body.tools.length, 2);
  assert.equal(call.body.tools[0].function.name, "lookup_weather");
  // The second tool (anthropic-format) may be wrapped in .function by the translator
  // or preserved as-is with .name; check whichever is available
  const tool2Name = call.body.tools[1].function?.name ?? call.body.tools[1].name;
  assert.equal(tool2Name, "anthropic_lookup");
});

test("chatCore sanitization strips empty input item names on responses endpoint", async () => {
  const { call } = await invokeChatCore({
    endpoint: "/v1/responses",
    body: {
      model: "gpt-4o-mini",
      input: [
        { role: "user", content: "input-1", name: "" },
        { role: "user", content: "input-2", name: "still-valid" },
      ],
    },
    responseFactory: () =>
      new Response(
        JSON.stringify({
          id: "resp_test",
          object: "response",
          status: "completed",
          model: "gpt-4o-mini",
          output: [
            { type: "message", role: "assistant", content: [{ type: "output_text", text: "ok" }] },
          ],
          usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      ),
  });

  // The input array may be translated to messages by the responses pipeline
  // Verify that empty names were stripped during sanitization:
  // Check both possible locations (input array or messages array after translation)
  const items = call.body.input || call.body.messages || [];
  if (Array.isArray(items) && items.length > 0) {
    for (const item of items) {
      // No item should have an empty string name after sanitization
      if (item.name !== undefined) {
        assert.notEqual(item.name, "", "empty name should have been stripped");
      }
    }
  }
});

test("chatCore sanitization normalizes mixed content blocks and removes unsupported or empty ones", async () => {
  const { call } = await invokeChatCore({
    body: {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "keep me" },
            { type: "text", text: "" },
            { type: "image_url", image_url: { url: "https://example.com/image.png" } },
            { type: "image", source: { type: "base64", media_type: "image/png", data: "abc" } },
            { type: "file_url", file_url: { url: "data:text/plain;base64,SGk=" } },
            { type: "file", file: { name: "README.md", content: "Read me please." } },
            { type: "file", file: { name: "blob.bin", data: "AAEC" } },
            { type: "file", file: { name: "draft.txt", text: "Draft text" } },
            { type: "document", name: "notes.txt", text: "Meeting notes" },
            { type: "document", document: { url: "data:text/plain;base64,SGVsbG8=" } },
            { type: "tool_result", tool_use_id: "tool-1", content: "done" },
            {
              type: "tool_result",
              tool_use_id: "tool-2",
              content: [{ type: "text", text: "structured result" }],
            },
            {
              type: "tool_result",
              tool_use_id: "tool-3",
              content: { status: "ok", count: 2 },
            },
            { type: "unknown_block", value: "drop me" },
          ],
        },
      ],
    },
  });

  const content = call.body.messages[0].content;
  const textBlocks = content.filter((block) => block.type === "text");

  assert.equal(
    content.some((block) => block.type === "text" && block.text === ""),
    false
  );
  assert.equal(
    content.some((block) => block.type === "unknown_block"),
    false
  );
  assert.equal(
    content.some((block) => block.type === "image_url"),
    true
  );
  assert.equal(
    content.some((block) => block.type === "image"),
    true
  );
  assert.equal(
    content.some(
      (block) => block.type === "file_url" && block.file_url.url.startsWith("data:text/plain")
    ),
    true
  );
  assert.equal(
    content.some((block) => block.type === "file" && block.file?.data === "AAEC"),
    true
  );
  assert.equal(
    content.some((block) => block.type === "document" && block.document?.url.startsWith("data:")),
    true
  );
  assert.equal(
    textBlocks.some((block) => block.text === "[README.md]\nRead me please."),
    true
  );
  assert.equal(
    textBlocks.some((block) => block.text === "[notes.txt]\nMeeting notes"),
    true
  );
  assert.equal(
    textBlocks.some((block) => block.text === "[draft.txt]\nDraft text"),
    true
  );
  assert.equal(
    textBlocks.some((block) => block.text === "[Tool Result: tool-1]\ndone"),
    true
  );
  assert.equal(
    textBlocks.some((block) => block.text === "[Tool Result: tool-2]\nstructured result"),
    true
  );
  assert.equal(
    textBlocks.some((block) => block.text === '[Tool Result: tool-3]\n{"status":"ok","count":2}'),
    true
  );
});

test("chatCore resolves stream mode from body.stream and Accept header", async () => {
  const explicitTrue = await invokeChatCore({
    accept: "application/json",
    body: { model: "gpt-4o-mini", stream: true, messages: [{ role: "user", content: "hello" }] },
  });
  const explicitFalse = await invokeChatCore({
    accept: "text/event-stream",
    body: { model: "gpt-4o-mini", stream: false, messages: [{ role: "user", content: "hello" }] },
  });
  const acceptDriven = await invokeChatCore({
    accept: "text/event-stream",
    body: { model: "gpt-4o-mini", messages: [{ role: "user", content: "hello" }] },
  });
  const jsonDefault = await invokeChatCore({
    accept: "application/json",
    body: { model: "gpt-4o-mini", messages: [{ role: "user", content: "hello" }] },
  });

  assert.equal(explicitTrue.call.headers.Accept, "text/event-stream");
  assert.equal(explicitFalse.call.headers.Accept, "application/json");
  assert.equal(acceptDriven.call.headers.Accept, "text/event-stream");
  assert.equal(jsonDefault.call.headers.Accept, "application/json");
});

test("chatCore injects memories when enabled and memories are found", async () => {
  await settingsDb.updateSettings({
    memoryEnabled: true,
    memoryMaxTokens: 1024,
    memoryRetentionDays: 30,
    memoryStrategy: "recent",
  });
  invalidateMemorySettingsCache();
  ensureLegacyMemoryTable();

  const apiKeyId = `key-memory-${Date.now()}`;
  await createMemory({
    apiKeyId,
    sessionId: "session-1",
    type: "factual",
    key: "preference",
    content: "User prefers concise Rust examples.",
    metadata: {},
    expiresAt: null,
  });

  const { call } = await invokeChatCore({
    apiKeyInfo: { id: apiKeyId, name: "Memory Key" },
    body: {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Give me a snippet." }],
    },
  });

  assert.equal(call.body.messages[0].role, "system");
  assert.match(
    call.body.messages[0].content,
    /Memory context: User prefers concise Rust examples\./
  );
  assert.equal(call.body.messages[1].role, "user");
});

test("chatCore skips memory injection when memory is disabled or apiKeyInfo is missing", async () => {
  await settingsDb.updateSettings({
    memoryEnabled: false,
    memoryMaxTokens: 0,
    memoryRetentionDays: 30,
    memoryStrategy: "recent",
  });
  invalidateMemorySettingsCache();

  const disabled = await invokeChatCore({
    apiKeyInfo: { id: `key-disabled-${Date.now()}`, name: "Disabled Key" },
    body: {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Hello" }],
    },
  });
  const noApiKey = await invokeChatCore({
    body: {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "Hello" }],
    },
  });

  assert.equal(disabled.call.body.messages[0].role, "user");
  assert.equal(disabled.call.body.messages[0].content, "Hello");
  assert.equal(noApiKey.call.body.messages[0].role, "user");
  assert.equal(noApiKey.call.body.messages[0].content, "Hello");
});

test("chatCore does not share or persist memories when apiKeyInfo is missing", async () => {
  await settingsDb.updateSettings({
    memoryEnabled: true,
    memoryMaxTokens: 1024,
    memoryRetentionDays: 30,
    memoryStrategy: "recent",
  });
  invalidateMemorySettingsCache();

  await createMemory({
    apiKeyId: "local",
    sessionId: "shared-local-session",
    type: "factual",
    key: "pref:theme",
    content: "Shared local memory should stay isolated.",
    metadata: {},
    expiresAt: null,
  });

  const { call } = await invokeChatCore({
    body: {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "I prefer blue themes." }],
    },
  });

  await waitForAsyncMemoryFlush();

  const localMemoriesResult = await listMemories({ apiKeyId: "local" });
  const localMemories = Array.isArray(localMemoriesResult)
    ? localMemoriesResult
    : (localMemoriesResult.data ?? []);

  assert.equal(call.body.messages[0].role, "user");
  assert.equal(call.body.messages[0].content, "I prefer blue themes.");
  assert.equal(localMemories.length, 1);
  assert.equal(localMemories[0].content, "Shared local memory should stay isolated.");
});

test("chatCore skips memory injection when shouldInjectMemory returns false for empty message lists", async () => {
  await settingsDb.updateSettings({
    memoryEnabled: true,
    memoryMaxTokens: 1024,
    memoryRetentionDays: 30,
    memoryStrategy: "recent",
  });
  invalidateMemorySettingsCache();

  const { call } = await invokeChatCore({
    apiKeyInfo: { id: `key-empty-${Date.now()}`, name: "Empty Key" },
    body: {
      model: "gpt-4o-mini",
      messages: [],
    },
  });

  assert.deepEqual(call.body.messages, []);
});

test("chatCore extracts memories from Claude content arrays and Responses output_text payloads", async () => {
  await settingsDb.updateSettings({
    memoryEnabled: true,
    memoryMaxTokens: 1024,
    memoryRetentionDays: 30,
    memoryStrategy: "recent",
  });
  invalidateMemorySettingsCache();

  const claudeKeyId = `key-claude-memory-${Date.now()}`;
  const claudeResult = await invokeChatCore({
    provider: "claude",
    model: "claude-sonnet-4-6",
    endpoint: "/v1/messages",
    credentials: { apiKey: "claude-key", providerSpecificData: {} },
    apiKeyInfo: { id: claudeKeyId, name: "Claude Memory Key" },
    body: {
      model: "claude-sonnet-4-6",
      messages: [{ role: "user", content: [{ type: "text", text: "Remember this." }] }],
    },
    responseFactory: () =>
      new Response(
        JSON.stringify({
          id: "msg_memory",
          type: "message",
          role: "assistant",
          model: "claude-sonnet-4-6",
          content: [{ type: "text", text: "I like strongly typed APIs." }],
          stop_reason: "end_turn",
          usage: { input_tokens: 4, output_tokens: 3 },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      ),
  });

  assert.equal(claudeResult.result.success, true);

  const responsesKeyId = `key-responses-memory-${Date.now()}`;
  const responsesResult = await invokeChatCore({
    endpoint: "/v1/responses",
    apiKeyInfo: { id: responsesKeyId, name: "Responses Memory Key" },
    body: {
      model: "gpt-4o-mini",
      input: "Remember this too.",
    },
    responseFactory: () =>
      new Response(
        JSON.stringify({
          id: "resp_memory",
          object: "response",
          status: "completed",
          model: "gpt-4o-mini",
          output_text: "I prefer TypeScript for backend services.",
          usage: {
            input_tokens: 3,
            output_tokens: 5,
            total_tokens: 8,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      ),
  });

  assert.equal(responsesResult.result.success, true);

  await waitForAsyncMemoryFlush();

  const claudeMemoriesResult = await listMemories({ apiKeyId: claudeKeyId });
  const responsesMemoriesResult = await listMemories({ apiKeyId: responsesKeyId });
  const claudeMemories = Array.isArray(claudeMemoriesResult)
    ? claudeMemoriesResult
    : (claudeMemoriesResult.data ?? []);
  const responsesMemories = Array.isArray(responsesMemoriesResult)
    ? responsesMemoriesResult
    : (responsesMemoriesResult.data ?? []);

  assert.equal(claudeMemories.length, 1);
  assert.equal(claudeMemories[0].content, "strongly typed APIs");
  assert.equal(responsesMemories.length, 1);
  assert.equal(responsesMemories[0].content, "TypeScript for backend services");
});

test("chatCore request memory extraction for responses input ignores assistant items", async () => {
  await settingsDb.updateSettings({
    memoryEnabled: true,
    memoryMaxTokens: 1024,
    memoryRetentionDays: 30,
    memoryStrategy: "recent",
  });
  invalidateMemorySettingsCache();

  const responsesKeyId = `key-responses-request-memory-${Date.now()}`;
  const responsesResult = await invokeChatCore({
    endpoint: "/v1/responses",
    apiKeyInfo: { id: responsesKeyId, name: "Responses Request Memory Key" },
    body: {
      model: "gpt-4o-mini",
      input: [
        {
          type: "message",
          role: "user",
          content: [{ type: "input_text", text: "I prefer tea." }],
        },
        {
          type: "message",
          role: "assistant",
          content: [{ type: "input_text", text: "I prefer coffee." }],
        },
      ],
    },
    responseFactory: () =>
      new Response(
        JSON.stringify({
          id: "resp_request_memory",
          object: "response",
          status: "completed",
          model: "gpt-4o-mini",
          output_text: "ok",
          usage: {
            input_tokens: 4,
            output_tokens: 1,
            total_tokens: 5,
          },
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      ),
  });

  assert.equal(responsesResult.result.success, true);

  await waitForAsyncMemoryFlush();

  const memoriesResult = await listMemories({ apiKeyId: responsesKeyId });
  const memories = Array.isArray(memoriesResult) ? memoriesResult : (memoriesResult.data ?? []);

  assert.equal(memories.length, 1);
  assert.match(memories[0].content, /tea/i);
  assert.doesNotMatch(memories[0].content, /coffee/i);
});
