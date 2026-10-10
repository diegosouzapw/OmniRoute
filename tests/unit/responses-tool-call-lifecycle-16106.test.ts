import test from "node:test";
import assert from "node:assert/strict";

const { openaiToOpenAIResponsesResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { createResponsesApiTransformStream } =
  await import("../../open-sse/transformer/responsesTransformer.ts");
const { initState } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
type Item = { type: string; name?: string; namespace?: string; input?: string; arguments?: string };
type Event = { event: string; data: { item?: Item; response?: { output: Item[] } } };
type Context = {
  customToolNames: Set<string>;
  toolSchemas: Map<string, unknown>;
  identityMap: Map<string, { namespace: string; name: string }>;
};
const schema = { type: "object", properties: { input: { type: "string" } } };
const context = (leaf = "exec", flat = false): Context => ({
  customToolNames: new Set([`functions__${leaf}`]),
  toolSchemas: new Map([
    [`functions__${leaf}`, schema],
    ...(flat ? [[leaf, schema] as [string, typeof schema]] : []),
  ]),
  identityMap: new Map([
    [`functions__${leaf}`, { namespace: "functions", name: leaf }],
    ...(flat
      ? [[leaf, { namespace: "", name: leaf }] as [string, { namespace: string; name: string }]]
      : []),
  ]),
});
const chunks = (names: string[]) =>
  names.map((name, i) => ({
    id: "chatcmpl-probe",
    model: "offline-probe",
    choices: [
      {
        index: 0,
        delta: {
          tool_calls: [
            {
              index: 0,
              id: "call_probe",
              type: "function",
              function: {
                name,
                ...(i === names.length - 1 ? { arguments: '{"input":"echo safe"}' } : {}),
              },
            },
          ],
        },
        finish_reason: null,
      },
    ],
  }));
const finish = {
  id: "chatcmpl-probe",
  model: "offline-probe",
  choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }],
};
async function collect(lane: string, names: string[], ctx: Context): Promise<Event[]> {
  const inputs = [...chunks(names), finish];
  if (lane === "translator") {
    const state = initState(FORMATS.OPENAI_RESPONSES);
    Object.assign(state, {
      customToolNames: ctx.customToolNames,
      toolSchemas: ctx.toolSchemas,
      requestToolIdentityMap: ctx.identityMap,
    });
    return [...inputs, null].flatMap(
      (chunk) => openaiToOpenAIResponsesResponse(chunk, state) || []
    );
  }
  const encoder = new TextEncoder();
  const sourceStream = new ReadableStream({
    start(controller) {
      for (const chunk of inputs)
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  const body = await new Response(
    sourceStream.pipeThrough(
      createResponsesApiTransformStream(null, 0, {
        customToolNames: ctx.customToolNames,
        requestToolIdentityMap: ctx.identityMap,
        toolSchemas: ctx.toolSchemas,
      })
    )
  ).text();
  return body
    .split("\n\n")
    .filter((frame) => frame.startsWith("event:"))
    .map((frame) => ({
      event: frame.split("\n")[0].slice(7),
      data: JSON.parse(
        frame
          .split("\n")
          .find((line) => line.startsWith("data: "))!
          .slice(6)
      ),
    }));
}
async function record(_label: string, lane: string, names: string[], ctx: Context) {
  const events = await collect(lane, names, ctx);
  const added = events.find(
    (e) => e.event === "response.output_item.added" && e.data.item?.type.endsWith("call")
  )?.data.item;
  const done = events.find(
    (e) => e.event === "response.output_item.done" && e.data.item?.type.endsWith("call")
  )?.data.item;
  assert.ok(added, "positive setup: tool item added");
  assert.ok(done, "positive setup: tool item done");
  return { added, done, events };
}
for (const lane of ["translator", "transformer"]) {
  test(`${lane}: complete qualified custom control`, async () => {
    const { added, done } = await record(`${lane}-complete`, lane, ["functions__exec"], context());
    for (const item of [added, done])
      assert.deepEqual(
        [item.type, item.namespace, item.name],
        ["custom_tool_call", "functions", "exec"]
      );
    assert.equal(done.input, "echo safe");
  });
  test(`${lane}: split custom identity is correct from added`, async () => {
    const { added } = await record(`${lane}-split-added`, lane, ["functions__", "exec"], context());
    assert.deepEqual(
      [added.type, added.namespace, added.name],
      ["custom_tool_call", "functions", "exec"]
    );
  });
  test(`${lane}: split custom completion retains custom type`, async () => {
    const { done } = await record(`${lane}-split-done`, lane, ["functions__", "exec"], context());
    assert.deepEqual(
      [done.type, done.namespace, done.name, done.input],
      ["custom_tool_call", "functions", "exec", "echo safe"]
    );
  });
  test(`${lane}: explicit flat exec is not namespaced custom exec`, async () => {
    const { added, done, events } = await record(
      `${lane}-flat`,
      lane,
      ["exec"],
      context("exec", true)
    );
    for (const item of [added, done])
      assert.deepEqual(
        [item.type, item.namespace, item.name],
        ["function_call", undefined, "exec"]
      );
    assert.equal(done.arguments, '{"input":"echo safe"}');
    assert.equal(
      events.some((e) => e.event.startsWith("response.custom_tool_call_input")),
      false
    );
  });
  test(`${lane}: repeated-letter fragment is retained in final name`, async () => {
    const { done } = await record(
      `${lane}-letter`,
      lane,
      ["functions__shel", "l"],
      context("shell")
    );
    assert.deepEqual([done.namespace, done.name], ["functions", "shell"]);
  });
  test(`${lane}: whole-name repeat remains idempotent control`, async () => {
    const { added, done } = await record(
      `${lane}-repeat`,
      lane,
      ["functions__shell", "functions__shell"],
      context("shell")
    );
    for (const item of [added, done])
      assert.deepEqual(
        [item.type, item.namespace, item.name],
        ["custom_tool_call", "functions", "shell"]
      );
    assert.equal(done.input, "echo safe");
  });
}

for (const lane of ["translator", "transformer"]) {
  test(`${lane}: real request metadata preserves the explicit flat exec`, async () => {
    const { openaiResponsesToOpenAIRequest } =
      await import("../../open-sse/translator/request/openai-responses.ts");
    const { extractRequestToolIdentityMap } =
      await import("../../open-sse/handlers/chatCore/requestToolIdentity.ts");
    const { extractToolSchemaMap } =
      await import("../../open-sse/translator/response/openai-responses/toolSchemas.ts");
    const { collectResponsesCustomToolNames } =
      await import("../../open-sse/translator/request/openai-responses/additionalTools.ts");
    const request = {
      input: "run the flat tool",
      tools: [
        { type: "function", name: "exec", parameters: schema },
        { type: "custom", name: "functions__exec", format: { type: "text" } },
      ],
    };
    const translated = openaiResponsesToOpenAIRequest("offline-probe", request, true, {
      provider: "kimi",
    });
    const customToolNames = collectResponsesCustomToolNames(request.tools, []);
    assert.deepEqual(
      [...customToolNames],
      ["functions__exec"],
      "real custom classification metadata control"
    );
    const identityMap = extractRequestToolIdentityMap(translated);
    const toolSchemas = extractToolSchemaMap(translated);
    assert.ok(
      translated.tools.some((tool) => tool.function?.name === "exec"),
      "real flat declaration survives request translation"
    );
    assert.ok(
      translated.tools.some((tool) => tool.function?.name === "functions__exec"),
      "distinct custom declaration survives translation"
    );
    assert.ok(toolSchemas?.has("exec"));
    assert.ok(toolSchemas?.has("functions__exec"));
    const { added, done } = await record(`${lane}-real-request-flat`, lane, ["exec"], {
      customToolNames,
      identityMap: identityMap ?? new Map(),
      toolSchemas: toolSchemas!,
    });
    for (const item of [added, done])
      assert.deepEqual(
        [item.type, item.namespace, item.name],
        ["function_call", undefined, "exec"]
      );
  });
}

test("request normalization control: a flat exec excludes the namespace member exec", async () => {
  const { collectResponsesCustomToolNames, collectResponsesTools } =
    await import("../../open-sse/translator/request/openai-responses/additionalTools.ts");
  const tools = [
    { type: "function", name: "exec", parameters: schema },
    { type: "namespace", name: "functions", tools: [{ type: "custom", name: "exec" }] },
  ];
  assert.equal(collectResponsesCustomToolNames(tools, []).size, 0);
  assert.deepEqual(collectResponsesTools(tools, []), [tools[0], { ...tools[1], tools: [] }]);
});

const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");
const { extractRequestToolIdentityMap } =
  await import("../../open-sse/handlers/chatCore/requestToolIdentity.ts");
const { extractToolSchemaMap } =
  await import("../../open-sse/translator/response/openai-responses/toolSchemas.ts");
const { collectResponsesCustomToolNames } =
  await import("../../open-sse/translator/request/openai-responses/additionalTools.ts");
const longNamespace = "mcp__" + "long_server_".repeat(6);
function realMetadata(
  namespace: string,
  leaf: string,
  options: { custom?: boolean; flat?: string; ambiguous?: boolean } = {}
) {
  const tools = [
    {
      type: "namespace",
      name: namespace,
      tools: [{ type: options.custom ? "custom" : "function", name: leaf, parameters: schema }],
    },
    ...(options.ambiguous
      ? [
          {
            type: "namespace",
            name: namespace + "other",
            tools: [{ type: "function", name: leaf, parameters: schema }],
          },
        ]
      : []),
    ...(options.flat ? [{ type: "function", name: options.flat, parameters: schema }] : []),
  ];
  const request = { input: "offline ledger test", tools };
  const translated = openaiResponsesToOpenAIRequest("offline-probe", request, true, {
    provider: "kimi",
  });
  const toolSchemas = extractToolSchemaMap(translated);
  const identityMap = extractRequestToolIdentityMap(translated) ?? new Map();
  const customToolNames = collectResponsesCustomToolNames(tools, []);
  assert.ok(toolSchemas);
  const wireName = [...identityMap.entries()].find(
    ([, identity]) => identity.namespace === namespace && identity.name === leaf
  )?.[0];
  if (!options.flat || options.flat !== leaf) {
    assert.ok(wireName, "real conversion produced namespace ledger");
    assert.equal(wireName.length, 64, "real normalization crosses the 64-character boundary");
    assert.notEqual(wireName, namespace + "__" + leaf);
    assert.match(wireName, /_[a-f0-9]{7}$/);
    assert.ok(toolSchemas.has(wireName));
  }
  return { ctx: { customToolNames, toolSchemas, identityMap }, wireName };
}
for (const lane of ["translator", "transformer"]) {
  for (const [size, namespace, leaf] of [
    ["long namespace", longNamespace, "shell"],
    ["long leaf", "mcp__short", "tool_".repeat(16)],
  ] as const) {
    for (const spelling of ["wire", "bare", "dotted"] as const) {
      test(`${lane}: ledger hash ${size} ${spelling}`, async () => {
        const { ctx, wireName } = realMetadata(namespace, leaf);
        const incoming =
          spelling === "wire" ? wireName : spelling === "bare" ? leaf : namespace + "." + leaf;
        const { added, done } = await record("ledger", lane, [incoming], ctx);
        for (const item of [added, done])
          assert.deepEqual(
            [item.type, item.namespace, item.name],
            ["function_call", namespace, leaf]
          );
        assert.equal(done.arguments, '{"input":"echo safe"}');
      });
    }
  }
  for (const spelling of ["bare", "dotted"] as const) {
    test(`${lane}: ledger hash custom ${spelling}`, async () => {
      const { ctx } = realMetadata(longNamespace, "shell", { custom: true });
      const incoming = spelling === "bare" ? "shell" : longNamespace + ".shell";
      const { added, done } = await record("custom", lane, [incoming], ctx);
      for (const item of [added, done])
        assert.deepEqual(
          [item.type, item.namespace, item.name],
          ["custom_tool_call", longNamespace, "shell"]
        );
      assert.equal(done.input, "echo safe");
    });
  }
  for (const flat of ["shell", longNamespace + ".shell"]) {
    test(`${lane}: ledger hash explicit flat ${flat === "shell" ? "bare" : "dotted"}`, async () => {
      const { ctx } = realMetadata(longNamespace, "shell", { flat });
      assert.ok(ctx.toolSchemas.has(flat));
      const { added, done } = await record("flat", lane, [flat], ctx);
      for (const item of [added, done])
        assert.deepEqual(
          [item.type, item.namespace, item.name],
          ["function_call", undefined, flat]
        );
    });
  }
  test(`${lane}: ledger hash ambiguous bare stays flat`, async () => {
    const { ctx } = realMetadata(longNamespace, "shell", { ambiguous: true });
    assert.equal(ctx.identityMap.size, 2);
    const { added, done } = await record("ambiguous", lane, ["shell"], ctx);
    for (const item of [added, done])
      assert.deepEqual(
        [item.type, item.namespace, item.name],
        ["function_call", undefined, "shell"]
      );
  });
}

for (const lane of ["translator", "transformer"]) {
  for (const spelling of ["bare", "dotted"] as const) {
    test(`${lane}: ledger hash fragments ${spelling}`, async () => {
      const { ctx } = realMetadata(longNamespace, "shell");
      const prefix = spelling === "bare" ? "shel" : longNamespace + ".shel";
      const { added, done } = await record("fragment", lane, [prefix, "l"], ctx);
      for (const item of [added, done])
        assert.deepEqual(
          [item.type, item.namespace, item.name],
          ["function_call", longNamespace, "shell"]
        );
    });
  }
}
