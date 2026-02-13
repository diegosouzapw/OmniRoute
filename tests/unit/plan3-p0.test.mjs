import test from "node:test";
import assert from "node:assert/strict";

import { FORMATS } from "../../open-sse/translator/formats.js";
import { getModelInfoCore } from "../../open-sse/services/model.js";
import { detectFormat } from "../../open-sse/services/provider.js";
import { translateRequest } from "../../open-sse/translator/index.js";
import { GithubExecutor } from "../../open-sse/executors/github.js";
import { CodexExecutor } from "../../open-sse/executors/codex.js";
import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.js";
import { extractUsageFromResponse } from "../../open-sse/handlers/usageExtractor.js";
import { parseSSEToResponsesOutput } from "../../open-sse/handlers/sseParser.js";

test("getModelInfoCore resolves unique non-openai unprefixed model", async () => {
  const info = await getModelInfoCore("claude-haiku-4-5-20251001", {});
  assert.equal(info.provider, "claude");
  assert.equal(info.model, "claude-haiku-4-5-20251001");
});

test("getModelInfoCore keeps openai fallback for gpt-4o", async () => {
  const info = await getModelInfoCore("gpt-4o", {});
  assert.equal(info.provider, "openai");
  assert.equal(info.model, "gpt-4o");
});

test("getModelInfoCore returns explicit ambiguity metadata for ambiguous unprefixed model", async () => {
  const info = await getModelInfoCore("claude-haiku-4.5", {});
  assert.equal(info.provider, null);
  assert.equal(info.errorType, "ambiguous_model");
  assert.match(info.errorMessage, /Ambiguous model/i);
  assert.ok(Array.isArray(info.candidateProviders));
  assert.ok(info.candidateProviders.length >= 2);
});

test("getModelInfoCore canonicalizes github legacy alias with explicit provider prefix", async () => {
  const info = await getModelInfoCore("gh/claude-4.5-opus", {});
  assert.equal(info.provider, "github");
  assert.equal(info.model, "claude-opus-4-5-20251101");
});

test("GithubExecutor routes codex-family model to /responses", () => {
  const executor = new GithubExecutor();
  const url = executor.buildUrl("gpt-5.1-codex", true);
  assert.match(url, /\/responses$/);
});

test("GithubExecutor keeps non-codex model on /chat/completions", () => {
  const executor = new GithubExecutor();
  const url = executor.buildUrl("gpt-5", true);
  assert.match(url, /\/chat\/completions$/);
});

test("CodexExecutor forces stream=true for upstream compatibility", () => {
  const executor = new CodexExecutor();
  const transformed = executor.transformRequest(
    "gpt-5.1-codex",
    { model: "gpt-5.1-codex", input: [], stream: false },
    false
  );
  assert.equal(transformed.stream, true);
});

test("CodexExecutor always requests SSE accept header", () => {
  const executor = new CodexExecutor();
  const headers = executor.buildHeaders({ accessToken: "test-token" }, false);
  assert.equal(headers.Accept, "text/event-stream");
});

test("translateNonStreamingResponse converts Responses API payload to OpenAI chat.completion", () => {
  const responseBody = {
    id: "resp_123",
    object: "response",
    created_at: 1739370000,
    model: "gpt-5.1-codex",
    output: [
      {
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: "Hello from responses API." }],
      },
      {
        type: "function_call",
        id: "fc_1",
        call_id: "call_1",
        name: "sum",
        arguments: '{"a":1,"b":2}',
      },
    ],
    usage: {
      input_tokens: 11,
      output_tokens: 7,
    },
  };

  const translated = translateNonStreamingResponse(
    responseBody,
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI
  );

  assert.equal(translated.object, "chat.completion");
  assert.equal(translated.model, "gpt-5.1-codex");
  assert.equal(translated.choices[0].message.role, "assistant");
  assert.equal(translated.choices[0].message.content, "Hello from responses API.");
  assert.equal(translated.choices[0].finish_reason, "tool_calls");
  assert.equal(translated.choices[0].message.tool_calls.length, 1);
  assert.equal(translated.usage.prompt_tokens, 11);
  assert.equal(translated.usage.completion_tokens, 7);
  assert.equal(translated.usage.total_tokens, 18);
});

test("extractUsageFromResponse reads usage from Responses API payload", () => {
  const responseBody = {
    object: "response",
    usage: {
      input_tokens: 20,
      output_tokens: 9,
      cache_read_input_tokens: 4,
      reasoning_tokens: 3,
    },
  };

  const usage = extractUsageFromResponse(responseBody, "github");
  assert.equal(usage.prompt_tokens, 20);
  assert.equal(usage.completion_tokens, 9);
  assert.equal(usage.cached_tokens, 4);
  assert.equal(usage.reasoning_tokens, 3);
});

test("detectFormat identifies OpenAI Responses when input is string", () => {
  const format = detectFormat({
    model: "gpt-5.1-codex",
    input: "hello world",
    stream: true,
  });
  assert.equal(format, FORMATS.OPENAI_RESPONSES);
});

test("detectFormat identifies OpenAI Responses by max_output_tokens without input array", () => {
  const format = detectFormat({
    model: "gpt-5.1-codex",
    max_output_tokens: 256,
    stream: false,
  });
  assert.equal(format, FORMATS.OPENAI_RESPONSES);
});

test("translateRequest normalizes openai-responses input string into list payload", () => {
  const translated = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.1-codex",
    {
      model: "gpt-5.1-codex",
      input: "hello from responses",
      stream: false,
    },
    false
  );

  assert.ok(Array.isArray(translated.input));
  assert.equal(translated.input.length, 1);
  assert.equal(translated.input[0].type, "message");
  assert.equal(translated.input[0].role, "user");
  assert.equal(translated.input[0].content[0].type, "input_text");
  assert.equal(translated.input[0].content[0].text, "hello from responses");
});

test("parseSSEToResponsesOutput parses completed response from SSE payload", () => {
  const rawSSE = [
    "event: response.created",
    'data: {"type":"response.created","response":{"id":"resp_1","object":"response","model":"gpt-5.1-codex","status":"in_progress","output":[]}}',
    "",
    "event: response.completed",
    'data: {"type":"response.completed","response":{"id":"resp_1","object":"response","model":"gpt-5.1-codex","status":"completed","output":[{"type":"message","role":"assistant","content":[{"type":"output_text","text":"ok"}]}],"usage":{"input_tokens":5,"output_tokens":3}}}',
    "",
    "data: [DONE]",
    "",
  ].join("\n");

  const parsed = parseSSEToResponsesOutput(rawSSE, "fallback-model");
  assert.equal(parsed.object, "response");
  assert.equal(parsed.id, "resp_1");
  assert.equal(parsed.model, "gpt-5.1-codex");
  assert.equal(parsed.status, "completed");
  assert.equal(parsed.output[0].type, "message");
  assert.equal(parsed.usage.input_tokens, 5);
  assert.equal(parsed.usage.output_tokens, 3);
});

test("parseSSEToResponsesOutput returns null for invalid payload", () => {
  const parsed = parseSSEToResponsesOutput("data: not-json\n\ndata: [DONE]\n", "fallback-model");
  assert.equal(parsed, null);
});
