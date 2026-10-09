import assert from "node:assert/strict";
import test from "node:test";
import { resolveResponsesCacheUsageDetails } from "../../open-sse/utils/resolveResponsesCacheUsageDetails.ts";
import {
  pickCacheCreationInPrompt,
  resolveCacheCreationInPrompt,
} from "../../open-sse/utils/pickCacheCreationTokens.ts";
import { carryCacheCreationMarker } from "../../open-sse/utils/usageTracking.ts";
import { sanitizeResponsesApiResponse } from "../../open-sse/handlers/responseSanitizer.ts";
import { translateNonStreamingResponse } from "../../open-sse/handlers/responseTranslator.ts";
import { translateResponse, initState } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";
import { createSSEStream } from "../../open-sse/utils/stream.ts";
import { createResponsesApiTransformStream } from "../../open-sse/transformer/responsesTransformer.ts";
import { buildResponseJSON } from "../../open-sse/vendor/codex-chatgpt-web/bridge.ts";

test.after(() => resetDbInstance());

function record(value: unknown): Record<string, unknown> {
  assert.ok(value && typeof value === "object" && !Array.isArray(value));
  return value as Record<string, unknown>;
}

function readPath(value: unknown, ...keys: string[]): unknown {
  return keys.reduce((current, key) => record(current)[key], value);
}

function chatBody(input: number, included: boolean) {
  return {
    id: "chatcmpl-marker",
    object: "chat.completion",
    model: "fixture-model",
    choices: [{ index: 0, message: { role: "assistant", content: "ok" }, finish_reason: "stop" }],
    usage: {
      prompt_tokens: input,
      completion_tokens: 135,
      total_tokens: input + 135,
      prompt_tokens_details: { cache_creation_tokens: 713119, cache_creation_in_prompt: included },
    },
  };
}

for (const included of [false, true]) {
  const input = included ? 714029 : 910;
  test(`Responses details retain explicit cache-in-prompt ${included}`, () => {
    assert.deepEqual(
      resolveResponsesCacheUsageDetails({
        prompt_tokens_details: {
          cached_tokens: 7,
          cache_creation_tokens: 713119,
          cache_creation_in_prompt: included,
        },
      }),
      { cached_tokens: 7, cache_creation_tokens: 713119, cache_creation_in_prompt: included }
    );
  });

  test(`nonstream Chat -> Responses preserves ${included} without changing token counts`, () => {
    const converted = translateNonStreamingResponse(
      chatBody(input, included),
      FORMATS.OPENAI,
      FORMATS.OPENAI_RESPONSES
    );
    const result = sanitizeResponsesApiResponse(converted);
    assert.equal(readPath(result, "usage", "input_tokens"), input);
    assert.equal(
      readPath(result, "usage", "input_tokens_details", "cache_creation_tokens"),
      713119
    );
    assert.equal(
      readPath(result, "usage", "input_tokens_details", "cache_creation_in_prompt"),
      included
    );
  });

  test(`stream Chat -> Responses preserves ${included} without changing token counts`, () => {
    const state = initState(FORMATS.OPENAI_RESPONSES);
    const usage = chatBody(input, included).usage;
    const events: unknown[] = [];
    for (const chunk of [
      {
        id: "chatcmpl-marker",
        model: "fixture-model",
        choices: [{ index: 0, delta: { role: "assistant", content: "ok" }, finish_reason: null }],
      },
      {
        id: "chatcmpl-marker",
        model: "fixture-model",
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
        usage,
      },
      null,
    ]) {
      const output: unknown = translateResponse(
        FORMATS.OPENAI,
        FORMATS.OPENAI_RESPONSES,
        chunk,
        state
      );
      if (Array.isArray(output)) events.push(...output);
    }
    const terminal = events
      .map((event) => record(event).data ?? event)
      .find((event) => record(event).type === "response.completed");
    assert.ok(terminal, "missing terminal Responses event");
    assert.equal(readPath(terminal, "response", "usage", "input_tokens"), input);
    assert.equal(
      readPath(terminal, "response", "usage", "input_tokens_details", "cache_creation_in_prompt"),
      included
    );
  });
}

test("an explicit marker wins over an inclusive nested cache-write alias", () => {
  const usage = {
    input_tokens_details: { cache_write_tokens: 123, cache_creation_in_prompt: false },
  };
  assert.equal(pickCacheCreationInPrompt(usage), false);
  assert.equal(resolveCacheCreationInPrompt(usage), false);
  assert.deepEqual(resolveResponsesCacheUsageDetails(usage), {
    cache_creation_tokens: 123,
    cache_creation_in_prompt: false,
  });
});

test("a nested write alias is inclusive while a top-level alias remains unmarked", () => {
  assert.deepEqual(
    resolveResponsesCacheUsageDetails({ prompt_tokens_details: { cache_write_tokens: 123 } }),
    {
      cache_creation_tokens: 123,
      cache_creation_in_prompt: true,
    }
  );
  assert.deepEqual(resolveResponsesCacheUsageDetails({ cache_write_tokens: 123 }), {
    cache_creation_tokens: 123,
  });
  const result = sanitizeResponsesApiResponse({
    id: "resp-alias",
    object: "response",
    status: "completed",
    output: [],
    usage: {
      input_tokens: 124,
      output_tokens: 1,
      total_tokens: 125,
      input_tokens_details: { cache_write_tokens: 123 },
    },
  });
  assert.equal(readPath(result, "usage", "input_tokens"), 124);
  assert.equal(readPath(result, "usage", "input_tokens_details", "cache_creation_tokens"), 123);
  assert.equal(readPath(result, "usage", "input_tokens_details", "cache_creation_in_prompt"), true);
});

test("usage rebuilds retain the marker only when the input total is unchanged", () => {
  const source = {
    prompt_tokens: 910,
    prompt_tokens_details: { cache_creation_tokens: 713119, cache_creation_in_prompt: false },
  };
  const target = { prompt_tokens: 910, completion_tokens: 135 };
  const result = carryCacheCreationMarker(source, target);
  assert.equal(readPath(result, "prompt_tokens_details", "cache_creation_in_prompt"), false);
  const changed = { prompt_tokens: 911, completion_tokens: 135 };
  assert.equal(carryCacheCreationMarker(source, changed), changed);
  assert.equal(record(changed).prompt_tokens_details, undefined);
  assert.equal(carryCacheCreationMarker(null, changed), changed);
});

test("absent markers preserve legacy cache-create shape and zero cache emits no detail", () => {
  assert.deepEqual(
    resolveResponsesCacheUsageDetails({ prompt_tokens_details: { cache_creation_tokens: 123 } }),
    { cache_creation_tokens: 123 }
  );
  assert.equal(resolveResponsesCacheUsageDetails({}), undefined);
  assert.equal(
    resolveResponsesCacheUsageDetails({ prompt_tokens_details: { cache_creation_tokens: 0 } }),
    undefined
  );
});

async function streamUsage(
  chunks: string[],
  stream: TransformStream
): Promise<Record<string, unknown>> {
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk));
      controller.close();
    },
  });
  const text = await new Response(source.pipeThrough(stream)).text();
  const usages = text
    .split("\n")
    .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]")
    .map((line) => record(JSON.parse(line.slice(6))))
    .map((event) => event.usage ?? (event.response ? record(event.response).usage : undefined))
    .filter((value) => value && typeof value === "object");
  assert.ok(usages.length);
  return record(usages.at(-1));
}

for (const included of [false, true]) {
  const input = included ? 714029 : 910;
  const chunks = [
    {
      id: "chatcmpl-stream-marker",
      object: "chat.completion.chunk",
      model: "fixture-model",
      choices: [{ index: 0, delta: { role: "assistant", content: "ok" } }],
    },
    {
      id: "chatcmpl-stream-marker",
      object: "chat.completion.chunk",
      model: "fixture-model",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      usage: chatBody(input, included).usage,
    },
  ]
    .map((chunk) => `data: ${JSON.stringify(chunk)}\n\n`)
    .concat("data: [DONE]\n\n");

  test(`passthrough finish usage retains cache-in-prompt ${included}`, async () => {
    const usage = await streamUsage(
      chunks,
      createSSEStream({
        mode: "passthrough",
        sourceFormat: "openai",
        targetFormat: "openai",
        clientResponseFormat: "openai",
        provider: "openai-compatible-fixture",
        model: "fixture-model",
      })
    );
    assert.equal(usage.prompt_tokens, input);
    assert.equal(readPath(usage, "prompt_tokens_details", "cache_creation_in_prompt"), included);
  });

  test(`Responses transform retains cache-in-prompt ${included}`, async () => {
    const usage = await streamUsage(chunks, createResponsesApiTransformStream());
    assert.equal(usage.input_tokens, input);
    assert.equal(readPath(usage, "input_tokens_details", "cache_creation_in_prompt"), included);
  });
}

test("the native Codex bridge identifies its inclusive cache-write total", () => {
  const events: Parameters<typeof buildResponseJSON>[0] = [
    {
      type: "done",
      usage: {
        inputTokens: 714029,
        outputTokens: 135,
        cachedInputTokens: 0,
        cacheCreationInputTokens: 713119,
      },
    },
  ];
  const body = buildResponseJSON(events, "fixture-model");
  assert.equal(readPath(body, "usage", "input_tokens"), 714029);
  assert.equal(readPath(body, "usage", "input_tokens_details", "cache_creation_in_prompt"), true);
});
