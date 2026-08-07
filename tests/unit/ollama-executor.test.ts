import test from "node:test";
import assert from "node:assert/strict";

import {
  OllamaExecutor,
  resolveOllamaNumCtx,
  stripOllamaProviderPrefix,
  transformOpenAIToOllama,
  createOllamaStream,
  normalizeOllamaBaseUrl,
  mapToolCallsToOllama,
  OLLAMA_DEFAULT_NUM_CTX,
} from "../../open-sse/executors/ollama.ts";

test("stripOllamaProviderPrefix: strips combo prefix only", () => {
  assert.equal(stripOllamaProviderPrefix("ollama-local/qwen2.5vl:7b"), "qwen2.5vl:7b");
  assert.equal(stripOllamaProviderPrefix("ollama/qwen2.5:14b"), "qwen2.5:14b");
  assert.equal(stripOllamaProviderPrefix("qwen2.5vl:7b"), "qwen2.5vl:7b");
  assert.equal(stripOllamaProviderPrefix(""), "");
});

test("resolveOllamaNumCtx: per-model memory-aware values", () => {
  assert.equal(resolveOllamaNumCtx("ollama-local/qwen2.5vl:7b"), 131072);
  assert.equal(resolveOllamaNumCtx("mistral-nemo:latest"), 65536);
  assert.equal(resolveOllamaNumCtx("phi3.5:latest"), 32768);
  assert.equal(resolveOllamaNumCtx("north-mini-code-1.0:latest"), 8192);
  // Unknown passthrough model falls back to the safe default.
  assert.equal(resolveOllamaNumCtx("some-future-model:7b"), OLLAMA_DEFAULT_NUM_CTX);
});

test("transformOpenAIToOllama: injects num_ctx and maps OpenAI fields", () => {
  const out = transformOpenAIToOllama("qwen2.5vl:7b", {
    model: "qwen2.5vl:7b",
    messages: [
      { role: "system", content: "sys" },
      { role: "user", content: "hi" },
    ],
    max_tokens: 512,
    temperature: 0.4,
    top_p: 0.9,
    stream: true,
    tools: [
      { type: "function", function: { name: "get_weather", description: "w", parameters: {} } },
    ],
  });

  assert.equal(out.model, "qwen2.5vl:7b");
  assert.equal((out.options as Record<string, unknown>).num_ctx, 131072);
  assert.equal((out.options as Record<string, unknown>).num_predict, 512);
  assert.equal((out.options as Record<string, unknown>).temperature, 0.4);
  assert.equal(out.stream, true);
  assert.ok(Array.isArray(out.tools), "tools must pass through");
  assert.equal((out.messages as unknown[]).length, 2);
});

test("transformOpenAIToOllama: vision data-URL becomes base64 images", () => {
  const out = transformOpenAIToOllama("qwen2.5vl:7b", {
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "what is this?" },
          { type: "image_url", image_url: { url: "data:image/png;base64,QUJDRA==" } },
        ],
      },
    ],
  });
  const msg = (out.messages as Array<{ images?: string[]; content: string }>)[0];
  assert.equal(msg.content, "what is this?");
  assert.deepEqual(msg.images, ["QUJDRA=="]);
});

test("createOllamaStream: NDJSON → OpenAI SSE chunks", async () => {
  const ndjson =
    '{"model":"qwen2.5vl:7b","message":{"role":"assistant","content":"Hel"},"done":false}\n' +
    '{"model":"qwen2.5vl:7b","message":{"role":"assistant","content":"lo"},"done":false}\n' +
    '{"model":"qwen2.5vl:7b","message":{"role":"assistant","content":""},"done":true,"done_reason":"stop","prompt_eval_count":3,"eval_count":2}\n';
  const encoder = new TextEncoder();
  const stream = createOllamaStream({
    reader: new ReadableStream({
      start(c) {
        c.enqueue(encoder.encode(ndjson));
        c.close();
      },
    }).getReader(),
    model: "qwen2.5vl:7b",
  });

  const reader = stream.getReader();
  let raw = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    raw += new TextDecoder().decode(value);
  }

  assert.match(raw, /"content":"Hel"/);
  assert.match(raw, /"content":"lo"/);
  assert.match(raw, /"finish_reason":"stop"/);
  assert.match(raw, /data: \[DONE\]/);
});

test("createOllamaStream: tool_calls → OpenAI delta.tool_calls with string arguments", async () => {
  const ndjson =
    '{"model":"m","message":{"role":"assistant","content":"","tool_calls":[{"function":{"name":"get_weather","arguments":{"city":"Boston"}}}]},"done":false}\n' +
    '{"model":"m","message":{"role":"assistant","content":""},"done":true,"done_reason":"tool_calls"}\n';
  const encoder = new TextEncoder();
  const stream = createOllamaStream({
    reader: new ReadableStream({
      start(c) {
        c.enqueue(encoder.encode(ndjson));
        c.close();
      },
    }).getReader(),
    model: "m",
  });
  const reader = stream.getReader();
  let raw = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    raw += new TextDecoder().decode(value);
  }
  assert.match(raw, /"tool_calls":\[/);
  assert.match(raw, /"finish_reason":"tool_calls"/);
  const firstChunk = JSON.parse(/^data: (.*)$/m.exec(raw)![1]);
  const delta = firstChunk.choices[0].delta.tool_calls[0];
  assert.equal(delta.function.name, "get_weather");
  assert.equal(delta.function.arguments, '{"city":"Boston"}');
});

test("OllamaExecutor: buildUrl hits native /api/chat", () => {
  const ex = new OllamaExecutor();
  assert.equal(ex.buildUrl("qwen2.5vl:7b", true, 0, null), "http://localhost:11434/api/chat");
});

test("OllamaExecutor: buildUrl strips /v1 OpenAI base to root", () => {
  const ex = new OllamaExecutor();
  const creds = { providerSpecificData: { baseUrl: "http://localhost:11434/v1" } };
  assert.equal(ex.buildUrl("qwen2.5vl:7b", true, 0, creds), "http://localhost:11434/api/chat");
  const credsFull = {
    providerSpecificData: { baseUrl: "http://localhost:11434/v1/chat/completions" },
  };
  assert.equal(ex.buildUrl("qwen2.5vl:7b", true, 0, credsFull), "http://localhost:11434/api/chat");
});

test("normalizeOllamaBaseUrl: handles trailing slashes and /v1 suffixes", () => {
  assert.equal(normalizeOllamaBaseUrl("http://localhost:11434/v1/"), "http://localhost:11434");
  assert.equal(
    normalizeOllamaBaseUrl("http://localhost:11434/v1/chat/completions"),
    "http://localhost:11434"
  );
  assert.equal(normalizeOllamaBaseUrl("http://localhost:11434"), "http://localhost:11434");
  assert.equal(normalizeOllamaBaseUrl("http://localhost:11434/api/chat"), "http://localhost:11434");
});

test("mapToolCallsToOllama: converts string arguments to objects", () => {
  const input = [
    {
      id: "call_1",
      type: "function",
      function: { name: "skill", arguments: '{"name":"customize-opencode"}' },
    },
    { function: { name: "noop", arguments: "" } },
    { function: { name: "broken", arguments: "not-json{{" } },
  ];
  const out = mapToolCallsToOllama(input) as Array<Record<string, unknown>>;
  assert.deepEqual(out[0].function, { name: "skill", arguments: { name: "customize-opencode" } });
  assert.deepEqual(out[1].function, { name: "noop", arguments: {} });
  assert.deepEqual(out[2].function, { name: "broken", arguments: {} });
});

test("transformOpenAIToOllama: maps assistant tool_calls through mapToolCallsToOllama", () => {
  const body = {
    messages: [
      { role: "user", content: "hi" },
      {
        role: "assistant",
        content: "",
        tool_calls: [
          {
            id: "call_1",
            type: "function",
            function: { name: "skill", arguments: '{"name":"x"}' },
          },
        ],
      },
    ],
  };
  const out = transformOpenAIToOllama("llama3.1:latest", body);
  const assistant = out.messages[1] as Record<string, unknown>;
  assert.deepEqual(assistant.tool_calls, [
    { id: "call_1", type: "function", function: { name: "skill", arguments: { name: "x" } } },
  ]);
});
