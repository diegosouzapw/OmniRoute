import test from "node:test";
import assert from "node:assert/strict";

// #15088 - a native Responses collaboration function_call is already in the
// protocol's ciphertext form. Stamping `encrypted_function_args: []` marks it
// as plaintext delivery even when the upstream field is absent (or nonempty).
// The empty marker is only correct when OmniRoute translated a plaintext Chat
// Completions tool call into Responses (#14154).

const { translateNonStreamingClientResponse } =
  await import("../../open-sse/handlers/chatCore/nonStreamingClientTranslate.ts");
const { sanitizeResponsesApiResponse, sanitizeStreamingChunk } =
  await import("../../open-sse/handlers/responseSanitizer.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { createPassthroughStreamWithLogger } = await import("../../open-sse/utils/stream.ts");

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const OPAQUE_ARGS = '{"payload":"opaque-collaboration-blob"}';
const UPSTREAM_CIPHERTEXT = ["upstream-ciphertext-token"];

type FunctionCallItem = {
  type?: string;
  name?: string;
  namespace?: string;
  arguments?: string;
  encrypted_function_args?: unknown;
};

async function runPassthrough(
  frames: string[],
  identityMap?: Map<string, { namespace: string; name: string }>
) {
  const stream = createPassthroughStreamWithLogger(
    "openai",
    null,
    null,
    "gpt-5",
    "conn-15088",
    { model: "gpt-5", stream: true },
    null,
    null,
    null,
    FORMATS.OPENAI_RESPONSES,
    identityMap ?? null
  );
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();
  const output: string[] = [];
  const readerTask = (async () => {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      output.push(decoder.decode(value));
    }
  })();
  for (const event of frames) {
    await writer.write(encoder.encode(event));
  }
  await writer.close();
  await readerTask;
  const raw = output.join("");
  const events = raw
    .split("\n\n")
    .map((block) => block.trim())
    .filter((block) => block.startsWith("data: ") && !block.includes("[DONE]"))
    .map((block) => JSON.parse(block.slice("data: ".length)) as Record<string, unknown>);
  return { raw, events };
}

function functionCallsFromEvent(event: Record<string, unknown>): FunctionCallItem[] {
  const item = event.item as FunctionCallItem | undefined;
  const response = event.response as { output?: FunctionCallItem[] } | undefined;
  const fromItem = item?.type === "function_call" ? [item] : [];
  const fromResponse = Array.isArray(response?.output)
    ? response.output.filter((entry) => entry?.type === "function_call")
    : [];
  return [...fromItem, ...fromResponse];
}

test("native Responses passthrough does not stamp encrypted_function_args:[] on collaboration calls (#15088)", async () => {
  const identity = new Map([
    ["collaboration__spawn_agent", { namespace: "collaboration", name: "spawn_agent" }],
  ]);
  const { raw, events } = await runPassthrough(
    [
      `data: ${JSON.stringify({
        type: "response.output_item.added",
        output_index: 0,
        item: {
          type: "function_call",
          id: "fc_1",
          call_id: "call_1",
          name: "collaboration__spawn_agent",
          arguments: "",
          status: "in_progress",
        },
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "response.output_item.done",
        output_index: 0,
        item: {
          type: "function_call",
          id: "fc_1",
          call_id: "call_1",
          name: "collaboration__spawn_agent",
          arguments: OPAQUE_ARGS,
          status: "completed",
        },
      })}\n\n`,
      `data: ${JSON.stringify({
        type: "response.completed",
        response: {
          id: "resp_native",
          object: "response",
          status: "completed",
          output: [
            {
              type: "function_call",
              id: "fc_1",
              call_id: "call_1",
              name: "collaboration__spawn_agent",
              arguments: OPAQUE_ARGS,
              status: "completed",
            },
          ],
        },
      })}\n\n`,
    ],
    identity
  );

  const calls = events.flatMap(functionCallsFromEvent);
  assert.ok(calls.length >= 3, "added, done, and completed must each carry the function_call");
  assert.equal(
    raw.includes('"namespace":"collaboration"'),
    true,
    "identity restoration must be serialized into the forwarded SSE, not only mutated in memory"
  );
  for (const call of calls) {
    assert.equal(call.namespace, "collaboration");
    assert.equal(call.name, "spawn_agent");
    assert.equal(
      call.encrypted_function_args,
      undefined,
      "absent upstream encrypted_function_args must stay absent on native passthrough"
    );
  }
});

test("native Responses passthrough preserves a nonempty upstream encrypted_function_args (#15088)", async () => {
  const { events } = await runPassthrough([
    `data: ${JSON.stringify({
      type: "response.output_item.done",
      output_index: 0,
      item: {
        type: "function_call",
        id: "fc_2",
        call_id: "call_2",
        namespace: "collaboration",
        name: "send_message",
        arguments: OPAQUE_ARGS,
        encrypted_function_args: UPSTREAM_CIPHERTEXT,
        status: "completed",
      },
    })}\n\n`,
    `data: ${JSON.stringify({
      type: "response.completed",
      response: {
        id: "resp_native_cipher",
        object: "response",
        status: "completed",
        output: [
          {
            type: "function_call",
            id: "fc_2",
            call_id: "call_2",
            namespace: "collaboration",
            name: "send_message",
            arguments: OPAQUE_ARGS,
            encrypted_function_args: UPSTREAM_CIPHERTEXT,
            status: "completed",
          },
        ],
      },
    })}\n\n`,
  ]);

  const calls = events.flatMap(functionCallsFromEvent);
  assert.ok(calls.length >= 2);
  for (const call of calls) {
    assert.deepEqual(call.encrypted_function_args, UPSTREAM_CIPHERTEXT);
  }
});

test("non-streaming native Responses collaboration call is not marked plaintext (#15088)", () => {
  const result = translateNonStreamingClientResponse({
    responseBody: {
      id: "resp_native",
      object: "response",
      status: "completed",
      output: [
        {
          id: "fc_3",
          type: "function_call",
          call_id: "call_3",
          namespace: "collaboration",
          name: "followup_task",
          arguments: OPAQUE_ARGS,
          status: "completed",
        },
      ],
    },
    responsePayloadFormat: FORMATS.OPENAI_RESPONSES,
    clientResponseFormat: FORMATS.OPENAI_RESPONSES,
    sourceFormat: FORMATS.OPENAI_RESPONSES,
    provider: "openai",
    model: "gpt-5",
    requestBody: { input: [] },
    responseToolNameMap: null,
    requestToolIdentityMap: null,
    reasoningCacheScope: null,
    clientHeaders: null,
    isClaudeCodeCompatible: false,
    phase: "final",
  });
  const item = (result.response.output as FunctionCallItem[])[0];
  assert.equal(item.name, "followup_task");
  assert.equal(item.namespace, "collaboration");
  assert.equal(item.encrypted_function_args, undefined);
});

test("non-streaming Chat-to-Responses collaboration call still carries the plaintext marker (#14154)", () => {
  const result = translateNonStreamingClientResponse({
    responseBody: {
      id: "chatcmpl-plain",
      object: "chat.completion",
      choices: [
        {
          index: 0,
          message: {
            role: "assistant",
            content: null,
            tool_calls: [
              {
                id: "call_plain",
                type: "function",
                function: { name: "collaboration__spawn_agent", arguments: '{"message":"READY"}' },
              },
            ],
          },
          finish_reason: "tool_calls",
        },
      ],
    },
    responsePayloadFormat: FORMATS.OPENAI,
    clientResponseFormat: FORMATS.OPENAI_RESPONSES,
    sourceFormat: FORMATS.OPENAI,
    provider: "deepseek",
    model: "deepseek-chat",
    requestBody: { messages: [] },
    responseToolNameMap: null,
    requestToolIdentityMap: new Map([
      ["collaboration__spawn_agent", { namespace: "collaboration", name: "spawn_agent" }],
    ]),
    reasoningCacheScope: null,
    clientHeaders: null,
    isClaudeCodeCompatible: false,
    phase: "final",
  });
  const item = (result.response.output as FunctionCallItem[])[0];
  assert.equal(item.namespace, "collaboration");
  assert.equal(item.name, "spawn_agent");
  assert.deepEqual(item.encrypted_function_args, []);
});

test("sanitizeResponsesApiResponse preserves upstream encrypted_function_args exactly (#15088)", () => {
  const absent = sanitizeResponsesApiResponse({
    id: "resp_absent",
    object: "response",
    status: "completed",
    output: [
      {
        id: "fc_a",
        type: "function_call",
        call_id: "call_a",
        namespace: "collaboration",
        name: "spawn_agent",
        arguments: OPAQUE_ARGS,
        status: "completed",
      },
    ],
  }) as { output: FunctionCallItem[] };
  assert.equal(absent.output[0].encrypted_function_args, undefined);
  assert.equal(absent.output[0].namespace, "collaboration");

  const present = sanitizeResponsesApiResponse({
    id: "resp_present",
    object: "response",
    status: "completed",
    output: [
      {
        id: "fc_b",
        type: "function_call",
        call_id: "call_b",
        namespace: "collaboration",
        name: "send_message",
        arguments: OPAQUE_ARGS,
        encrypted_function_args: UPSTREAM_CIPHERTEXT,
        status: "completed",
      },
    ],
  }) as { output: FunctionCallItem[] };
  assert.deepEqual(present.output[0].encrypted_function_args, UPSTREAM_CIPHERTEXT);
});

test("streaming sanitizer preserves upstream encrypted_function_args on lifecycle events (#15088)", () => {
  const done = sanitizeStreamingChunk({
    type: "response.output_item.done",
    item: {
      type: "function_call",
      id: "fc_s",
      call_id: "call_s",
      namespace: "collaboration",
      name: "spawn_agent",
      arguments: OPAQUE_ARGS,
      encrypted_function_args: UPSTREAM_CIPHERTEXT,
    },
  }) as { item: FunctionCallItem };
  assert.deepEqual(done.item.encrypted_function_args, UPSTREAM_CIPHERTEXT);

  const completed = sanitizeStreamingChunk({
    type: "response.completed",
    response: {
      output: [
        {
          type: "function_call",
          name: "followup_task",
          namespace: "collaboration",
          arguments: OPAQUE_ARGS,
        },
      ],
    },
  }) as { response: { output: FunctionCallItem[] } };
  assert.equal(completed.response.output[0].encrypted_function_args, undefined);
});
