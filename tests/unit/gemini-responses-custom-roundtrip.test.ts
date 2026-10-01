import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "gemini-custom-roundtrip-"));
process.env.DATA_DIR = dataDir;
await import("../../open-sse/translator/bootstrap.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { extractRequestToolIdentityMap, resolveResponseToolNameMap } =
  await import("../../open-sse/handlers/chatCore/requestToolIdentity.ts");
const { collectResponsesCustomToolNames } =
  await import("../../open-sse/translator/request/openai-responses/additionalTools.ts");
const { createSSETransformStreamWithLogger } = await import("../../open-sse/utils/stream.ts");

test.after(async () => {
  const { resetDbInstance } = await import("../../src/lib/db/core.ts");
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});
const tools = [
  {
    type: "namespace",
    name: "functions",
    tools: [{ type: "custom", name: "exec", format: { type: "text" } }],
  },
  {
    type: "function",
    name: "functions_exec",
    parameters: { type: "object", properties: { value: { type: "number" } } },
  },
];
type Item = {
  type: string;
  name: string;
  namespace?: string;
  input?: string;
  arguments?: string;
  call_id?: string;
};
function request(input: unknown[] = []) {
  return {
    model: "gemini-test",
    tools: structuredClone(tools),
    input: [{ role: "user", content: "run" }, ...input],
  };
}
function pivot(body: Record<string, unknown>) {
  return translateRequest(
    "openai-responses",
    "gemini",
    "gemini-test",
    body,
    true,
    null,
    null,
    null
  ) as Record<string, unknown>;
}
function wireNames(body: Record<string, unknown>) {
  return (
    body.tools as Array<{ functionDeclarations: Array<{ name: string }> }>
  )[0].functionDeclarations.map((t) => t.name);
}
async function response(
  body: ReturnType<typeof request>,
  translated: Record<string, unknown>,
  name: string,
  args: unknown,
  callId = "call_exec"
) {
  const identities = extractRequestToolIdentityMap(translated);
  const aliases = resolveResponseToolNameMap(translated._toolNameMap, null, identities);
  const transform = createSSETransformStreamWithLogger(
    "gemini",
    "openai-responses",
    "gemini",
    null,
    aliases,
    "gemini-test",
    null,
    body,
    null,
    null,
    null,
    false,
    false,
    undefined,
    collectResponsesCustomToolNames(body.tools, body.input),
    identities
  );
  const chunk = {
    candidates: [
      {
        content: {
          role: "model",
          parts: [
            {
              thoughtSignature: "synthetic-signature",
              functionCall: { name, args, id: callId },
            },
          ],
        },
        finishReason: "STOP",
      },
    ],
  };
  const source = new ReadableStream({
    start(c) {
      c.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(chunk)}\n\n`));
      c.close();
    },
  });
  const output = await new Response(source.pipeThrough(transform)).text();
  return output
    .split("\n")
    .filter((line) => line.startsWith("data: {"))
    .map((line) => JSON.parse(line.slice(6))) as Array<{
    type: string;
    item?: Item;
    response?: { output: Item[] };
    delta?: string;
    input?: string;
  }>;
}

test("Gemini aliases survive extraction alongside namespace identities", () => {
  const translated = pivot(request());
  const aliases = translated._toolNameMap;
  assert.ok(aliases instanceof Map);
  const identities = extractRequestToolIdentityMap(translated);
  assert.deepEqual(identities?.get("functions__exec"), { namespace: "functions", name: "exec" });
  assert.equal(translated._toolNameMap, aliases);
});

test("namespaced custom tool metadata uses the declared qualified wire identity", () => {
  assert.deepEqual([...collectResponsesCustomToolNames(tools, [])], ["functions__exec"]);
});

test("two Gemini custom calls round-trip raw input, namespace, history and a legitimate alias collision", async () => {
  const input: unknown[] = [];
  let previousNames: string[] | undefined;
  for (let turn = 0; turn < 2; turn++) {
    const body = request(input);
    const translated = pivot(body);
    const names = wireNames(translated);
    assert.equal(new Set(names).size, 2);
    if (previousNames)
      assert.deepEqual(names, previousNames, "history must not change advertised names");
    previousNames = names;
    if (turn) {
      const contents = translated.contents as Array<{
        parts: Array<{ functionCall?: { name: string; args: unknown } }>;
      }>;
      const historical = contents.flatMap((c) => c.parts).find((p) => p.functionCall)?.functionCall;
      assert.deepEqual(historical && { name: historical.name, args: historical.args }, {
        name: names[0],
        args: { input: "text(17*19)" },
      });
    }
    const events = await response(
      body,
      translated,
      names[0],
      { input: "text(17*19)" },
      `call_exec_${turn}`
    );
    const items = events.filter((e) => e.item).map((e) => e.item!);
    const completed = events.find((e) => e.type === "response.completed")?.response?.output;
    assert.ok(completed?.length);
    for (const item of [...items, ...completed]) {
      assert.equal(item.type, "custom_tool_call");
      assert.equal(item.namespace, "functions");
      assert.equal(item.name, "exec");
      assert.equal(item.arguments, undefined);
    }
    assert.equal(completed[0].input, "text(17*19)");
    assert.equal(
      events
        .filter((e) => e.type === "response.custom_tool_call_input.delta")
        .map((e) => e.delta)
        .join(""),
      "text(17*19)"
    );
    assert.ok(!events.some((e) => e.type === "response.function_call_arguments.delta"));
    input.push(completed[0], {
      type: "custom_tool_call_output",
      call_id: completed[0].call_id,
      output: "323",
    });
  }
});

test("colliding ordinary function and unknown hash names are never reinterpreted as custom tools", async () => {
  for (const unknown of [false, true]) {
    const body = request();
    const translated = pivot(body);
    const name = unknown ? "functions_exec_unknownhash" : wireNames(translated)[1];
    const events = await response(body, translated, name, { value: 7 });
    const item = events.find((e) => e.type === "response.completed")?.response?.output[0];
    assert.equal(item?.type, "function_call");
    assert.equal(item?.name, unknown ? name : "functions_exec");
    assert.equal(item?.namespace, undefined);
  }
});

test("worker Chat-to-Responses transform restores namespaced custom items with fragmented JSON", async () => {
  const { createResponsesApiTransformStream } =
    await import("../../open-sse/transformer/responsesTransformer.ts");
  const { convertResponsesApiFormat } =
    await import("../../open-sse/translator/helpers/responsesApiHelper.ts");
  const body = request();
  const converted = convertResponsesApiFormat(body);
  const identities = extractRequestToolIdentityMap(converted);
  const chunks = [
    {
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_fragmented",
                function: { name: "functions__exec", arguments: '{"input":"text(' },
              },
            ],
          },
        },
      ],
    },
    {
      choices: [
        {
          index: 0,
          delta: { tool_calls: [{ index: 0, function: { arguments: '17*19)"}' } }] },
          finish_reason: "tool_calls",
        },
      ],
    },
  ];
  const source = new ReadableStream({
    start(c) {
      for (const chunk of chunks)
        c.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(chunk)}\n\n`));
      c.close();
    },
  });
  const output = await new Response(
    source.pipeThrough(
      createResponsesApiTransformStream(null, 0, {
        customToolNames: collectResponsesCustomToolNames(body.tools, body.input),
        requestToolIdentityMap: identities,
      })
    )
  ).text();
  const events = output
    .split("\n")
    .filter((line) => line.startsWith("data: {"))
    .map((line) => JSON.parse(line.slice(6)));
  for (const event of events.filter((e) => e.item)) {
    assert.equal(event.item.namespace, "functions");
    assert.equal(event.item.name, "exec");
    assert.equal(event.item.type, "custom_tool_call");
  }
  const item = events.find((e) => e.type === "response.completed").response.output[0];
  assert.equal(item.input, "text(17*19)");
  assert.equal(item.namespace, "functions");
  assert.equal(item.call_id, "call_fragmented");
  assert.equal(
    events
      .filter((e) => e.type === "response.custom_tool_call_input.delta")
      .map((e) => e.delta)
      .join(""),
    item.input
  );
});

test("native Responses tool declarations retain reserved schemas unchanged", () => {
  const body = request();
  body.tools.push({
    type: "function",
    name: "collaboration_spawn_agent",
    parameters: { type: "object", properties: { value: { type: "number" } } },
  });
  const original = structuredClone(body);
  const native = translateRequest(
    "openai-responses",
    "openai-responses",
    "gemini-test",
    body,
    true,
    null,
    null,
    null
  ) as Record<string, unknown>;
  assert.deepEqual(native.tools, original.tools);
});

test("Responses function history uses the same qualified name as its declaration", () => {
  const body = {
    input: [
      { role: "user", content: "run" },
      {
        type: "function_call",
        namespace: "functions",
        name: "run",
        call_id: "call_run",
        arguments: '{"value":7}',
      },
      { type: "function_call_output", call_id: "call_run", output: "7" },
    ],
    tools: [
      {
        type: "namespace",
        name: "functions",
        tools: [
          {
            type: "function",
            name: "run",
            parameters: { type: "object", properties: { value: { type: "number" } } },
          },
        ],
      },
    ],
  };
  const translated = translateRequest(
    "openai-responses",
    "openai",
    "test-model",
    body,
    true,
    null,
    null,
    null
  ) as {
    tools: Array<{ function: { name: string } }>;
    messages: Array<{
      tool_calls?: Array<{ id: string; function: { name: string; arguments: string } }>;
    }>;
  };
  const call = translated.messages.find((message) => message.tool_calls)?.tool_calls?.[0];
  assert.equal(call?.function.name, translated.tools[0].function.name);
  assert.equal(call?.function.name, "functions__run");
  assert.equal(call?.id, "call_run");
  assert.equal(call?.function.arguments, '{"value":7}');
});
