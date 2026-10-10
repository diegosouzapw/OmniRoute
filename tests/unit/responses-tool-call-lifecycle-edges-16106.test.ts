import test from "node:test";
import assert from "node:assert/strict";
import { openaiToOpenAIResponsesResponse } from "../../open-sse/translator/response/openai-responses.ts";
import { createResponsesApiTransformStream } from "../../open-sse/transformer/responsesTransformer.ts";
import { initState } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { appendToolCallNameDelta } from "../../open-sse/utils/toolCallName.ts";

type Event = {
  event: string;
  data: {
    item?: Record<string, unknown>;
    output_index?: number;
    item_id?: string;
    delta?: string;
    response?: { output: Record<string, unknown>[] };
  };
};
const schema = { type: "object", properties: { input: { type: "string" } } };
const customToolNames = new Set(["functions__shell"]);
const toolSchemas = new Map([
  ["functions__shell", schema],
  ["inspect", schema],
]);
const requestToolIdentityMap = new Map([
  ["functions__shell", { namespace: "functions", name: "shell" }],
]);
const metadata = { customToolNames, toolSchemas, requestToolIdentityMap };
const call = (name: string, args = "", id = "call_a", index = 0) => ({
  index,
  id,
  type: "function",
  function: { name, arguments: args },
});
const chunk = (calls: ReturnType<typeof call>[], finish_reason: string | null = null) => ({
  id: "chatcmpl-lifecycle",
  choices: [{ index: 0, delta: { tool_calls: calls }, finish_reason }],
});
const toolItems = (events: Event[], suffix: string) =>
  events
    .filter((e) => e.event === `response.output_item.${suffix}`)
    .map((e) => e.data.item!)
    .filter((item) => String(item.type).endsWith("call"));
const identity = (item: Record<string, unknown>) => [item.type, item.name, item.namespace];

async function driver(
  lane: string,
  context: NonNullable<Parameters<typeof createResponsesApiTransformStream>[2]> = metadata
) {
  const events: Event[] = [];
  if (lane === "translator") {
    const state = initState(FORMATS.OPENAI_RESPONSES);
    Object.assign(state, context);
    return {
      events,
      write: async (value: ReturnType<typeof chunk>) => {
        events.push(...(openaiToOpenAIResponsesResponse(value, state) || []));
      },
      end: async () => {
        events.push(...(openaiToOpenAIResponsesResponse(null, state) || []));
      },
      abort: async () => {},
    };
  }
  const stream = createResponsesApiTransformStream(null, 0, context);
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();
  const decoder = new TextDecoder();
  const reading = (async () => {
    try {
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        for (const frame of decoder.decode(value).split("\n\n")) {
          if (!frame.startsWith("event:")) continue;
          const [event, data] = frame.split("\n");
          events.push({ event: event.slice(7), data: JSON.parse(data.slice(6)) });
        }
      }
    } catch (error) {
      if (!(error instanceof Error) || error.message !== "fixture cancellation") throw error;
    }
  })();
  return {
    events,
    write: async (value: ReturnType<typeof chunk>) => {
      await writer.write(new TextEncoder().encode(`data: ${JSON.stringify(value)}\n\n`));
    },
    end: async () => {
      await writer.close();
      await reading;
    },
    abort: async () => {
      await writer.abort(new Error("fixture cancellation"));
      await reading;
    },
  };
}

for (const lane of ["translator", "transformer"]) {
  for (const [label, declared, names, expected] of [
    ["single long declaration", ["shell"], ["functions__shel", "l"], "shell"],
    [
      "both declarations, genuine final letter",
      ["shel", "shell"],
      ["functions__shel", "l"],
      "shell",
    ],
    ["short name without another fragment", ["shel", "shell"], ["functions__shel"], "shel"],
    [
      "short name repeated in full",
      ["shel", "shell"],
      ["functions__shel", "functions__shel"],
      "shel",
    ],
    ["long name suffix resend", ["shel", "shell"], ["functions__shell", "l"], "shell"],
  ] as const) {
    test(`${lane}: prefix policy: ${label}`, async () => {
      const d = await driver(lane, {
        customToolNames: new Set(declared.map((name) => `functions__${name}`)),
        toolSchemas: new Map(declared.map((name) => [`functions__${name}`, schema])),
        requestToolIdentityMap: new Map(
          declared.map((name) => [`functions__${name}`, { namespace: "functions", name }])
        ),
      });
      for (const name of names) await d.write(chunk([call(name)]));
      await d.write(chunk([], "tool_calls"));
      await d.end();
      const done = toolItems(d.events, "done");
      assert.equal(done.length, 1);
      assert.deepEqual(identity(done[0]), ["custom_tool_call", expected, "functions"]);
    });
  }

  test(`${lane}: undeclared tool after reasoning keeps its final output index`, async () => {
    const d = await driver(lane);
    const reasoning = chunk([]);
    Object.assign(reasoning.choices[0].delta, { reasoning_content: "Think before lookup." });
    await d.write(reasoning);
    await d.write(chunk([call("lookup", '{"query":"status"}')]));
    const pending = [...d.events];
    await d.write(chunk([], "tool_calls"));
    await d.end();
    assert.equal(toolItems(pending, "added").length, 0);
    const reasoningItem = d.events.find(
      (e) => e.event === "response.output_item.added" && e.data.item?.type === "reasoning"
    );
    const added = d.events.find(
      (e) => e.event === "response.output_item.added" && e.data.item?.type === "function_call"
    );
    const done = d.events.find(
      (e) => e.event === "response.output_item.done" && e.data.item?.type === "function_call"
    );
    assert.equal(reasoningItem?.data.output_index, 0);
    assert.equal(added?.data.output_index, 1);
    assert.equal(done?.data.output_index, 1);
    assert.deepEqual(identity(done!.data.item!), ["function_call", "lookup", undefined]);
    assert.equal(done!.data.item!.arguments, '{"query":"status"}');
  });

  test(`${lane}: consumes iterable custom declarations once for classification`, async () => {
    const d = await driver(lane, {
      ...metadata,
      customToolNames: new Set(["functions__shell"]).values(),
    });
    await d.write(chunk([call("functions__shell", '{"input":"safe"}')]));
    await d.write(chunk([], "tool_calls"));
    await d.end();
    assert.deepEqual(identity(toolItems(d.events, "added")[0]), [
      "custom_tool_call",
      "shell",
      "functions",
    ]);
    assert.deepEqual(identity(toolItems(d.events, "done")[0]), [
      "custom_tool_call",
      "shell",
      "functions",
    ]);
  });

  test(`${lane}: withholds a partial identity and buffers arguments until ready`, async () => {
    const d = await driver(lane);
    await d.write(chunk([call("functions__shel", '{"input":"')]));
    const pending = [...d.events];
    await d.write(chunk([call("l", 'safe"}')]));
    await d.end();
    assert.equal(toolItems(pending, "added").length, 0);
    assert.equal(
      pending.some((e) => e.event.includes("arguments") || e.event.includes("tool_call_input")),
      false
    );
    const added = toolItems(d.events, "added");
    const done = toolItems(d.events, "done");
    assert.equal(added.length, 1);
    assert.deepEqual(identity(added[0]), ["custom_tool_call", "shell", "functions"]);
    assert.deepEqual(identity(done[0]), identity(added[0]));
    assert.equal(done[0].input, "safe");
  });

  for (const alias of ["shel", "functions.shel"]) {
    test(`${lane}: a repeated-letter fragment completes declared alias ${alias}`, async () => {
      const d = await driver(lane);
      await d.write(chunk([call(alias)]));
      await d.write(chunk([call("l", '{"input":"safe"}')]));
      await d.write(chunk([], "tool_calls"));
      await d.end();
      assert.deepEqual(identity(toolItems(d.events, "done")[0]), [
        "custom_tool_call",
        "shell",
        "functions",
      ]);
    });
  }

  test(`${lane}: replays buffered function arguments after added without loss`, async () => {
    const d = await driver(lane);
    await d.write(chunk([call("ins", '{"input":')]));
    await d.write(chunk([call("pect", '"safe"}')]));
    await d.end();
    const addedIndex = d.events.findIndex((e) => e.event === "response.output_item.added");
    const deltas = d.events.filter((e) => e.event === "response.function_call_arguments.delta");
    assert.ok(deltas.length > 0);
    assert.ok(d.events.findIndex((e) => e === deltas[0]) > addedIndex);
    assert.equal(deltas.map((e) => e.data.delta).join(""), '{"input":"safe"}');
    assert.equal(toolItems(d.events, "done")[0].arguments, '{"input":"safe"}');
    assert.equal(toolItems(d.events, "added")[0].name, "inspect");
  });

  test(`${lane}: published identity and type stay immutable on later name noise`, async () => {
    const d = await driver(lane);
    await d.write(chunk([call("functions__shell", '{"input":"safe"}')]));
    const first = toolItems(d.events, "added");
    await d.write(chunk([call("_unrelated")]));
    await d.end();
    assert.equal(first.length, 1, "known declaration can be announced before EOF");
    assert.deepEqual(identity(toolItems(d.events, "done")[0]), identity(first[0]));
  });

  test(`${lane}: unknown names stay pending and close flat at EOF without changing terminal policy`, async () => {
    const d = await driver(lane);
    await d.write(chunk([call("other__", '{"x":1}')]));
    await d.write(chunk([call("tool")]));
    const pending = [...d.events];
    await d.end();
    assert.equal(toolItems(pending, "added").length, 0);
    assert.deepEqual(identity(toolItems(d.events, "added")[0]), [
      "function_call",
      "other__tool",
      undefined,
    ]);
    assert.deepEqual(
      identity(toolItems(d.events, "done")[0]),
      identity(toolItems(d.events, "added")[0])
    );
    assert.equal(
      d.events.filter(
        (e) => e.event === (lane === "translator" ? "response.failed" : "response.completed")
      ).length,
      1
    );
  });

  test(`${lane}: ambiguous bare names never borrow a namespace`, async () => {
    const context = {
      customToolNames: new Set(["a__exec", "b__exec"]),
      toolSchemas: new Map([
        ["a__exec", schema],
        ["b__exec", schema],
      ]),
      requestToolIdentityMap: new Map([
        ["a__exec", { namespace: "a", name: "exec" }],
        ["b__exec", { namespace: "b", name: "exec" }],
      ]),
    };
    const d = await driver(lane, context);
    await d.write(chunk([call("exec")]));
    const pending = [...d.events];
    await d.write(chunk([], "tool_calls"));
    await d.end();
    assert.equal(toolItems(pending, "added").length, 0);
    for (const item of [...toolItems(d.events, "added"), ...toolItems(d.events, "done")])
      assert.deepEqual(identity(item), ["function_call", "exec", undefined]);
  });

  test(`${lane}: replacement call ID resets pending name, type and arguments`, async () => {
    const d = await driver(lane);
    await d.write(chunk([call("unknown__", '{"old":1}')]));
    await d.write(chunk([call("functions__shel", '{"input":"', "call_b")]));
    await d.write(chunk([call("l", 'new"}', "call_b")]));
    await d.write(chunk([], "tool_calls"));
    await d.end();
    const added = toolItems(d.events, "added");
    const done = toolItems(d.events, "done");
    assert.deepEqual(
      added.map((item) => item.call_id),
      ["call_a", "call_b"]
    );
    assert.deepEqual(
      done.map((item) => item.call_id),
      ["call_a", "call_b"]
    );
    assert.equal(done[0].arguments, '{"old":1}');
    assert.deepEqual(identity(done[1]), ["custom_tool_call", "shell", "functions"]);
    assert.equal(done[1].input, "new");
    const output = d.events.find((e) => e.event === "response.completed")!.data.response!.output;
    assert.deepEqual(
      output.map((item) => item.call_id),
      ["call_b"]
    );
  });

  test(`${lane}: simultaneous calls and no-argument finish retain distinct identities`, async () => {
    const d = await driver(lane);
    await d.write(chunk([call("functions__", "", "call_a", 0), call("inspect", "", "call_b", 1)]));
    await d.write(chunk([call("shell", "", "call_a", 0)]));
    await d.write(chunk([], "tool_calls"));
    await d.end();
    const done = toolItems(d.events, "done");
    assert.equal(done.length, 2);
    assert.deepEqual(identity(done.find((item) => item.call_id === "call_a")!), [
      "custom_tool_call",
      "shell",
      "functions",
    ]);
    assert.deepEqual(identity(done.find((item) => item.call_id === "call_b")!), [
      "function_call",
      "inspect",
      undefined,
    ]);
    assert.equal(done.find((item) => item.call_id === "call_b")!.arguments, "{}");
  });
}

test("transformer: cancelling an unresolved call does not invent terminal success", async () => {
  const d = await driver("transformer");
  await d.write(chunk([call("functions__", '{"input":"')]));
  await d.abort();
  assert.equal(toolItems(d.events, "added").length, 0);
  assert.equal(toolItems(d.events, "done").length, 0);
  assert.equal(
    d.events.some((e) => e.event === "response.completed"),
    false
  );
});

test("without declarations, suffix resend remains the deterministic accumulation policy", () => {
  assert.equal(appendToolCallNameDelta("functions__shel", "l"), "functions__shel");
  assert.equal(appendToolCallNameDelta("functions__shell", "shell"), "functions__shell");
});

test("real Responses handler threads explicit flat declarations through dispatch", async (t) => {
  const { handleResponsesCore } = await import("../../open-sse/handlers/responsesHandler.ts");
  const sent: Record<string, unknown>[] = [];
  t.mock.method(globalThis, "fetch", async (_url: unknown, init: RequestInit) => {
    sent.push(JSON.parse(String(init.body)));
    const pieces = [chunk([call("exec", '{"input":"safe"}')]), chunk([], "tool_calls")];
    return new Response(
      pieces.map((value) => `data: ${JSON.stringify(value)}\n\n`).join("") + "data: [DONE]\n\n",
      { headers: { "Content-Type": "text/event-stream" } }
    );
  });
  const result = await handleResponsesCore({
    body: {
      input: "call the flat function",
      model: "gpt-4o-mini",
      tools: [
        { type: "function", name: "exec", parameters: schema },
        { type: "custom", name: "functions__exec", format: { type: "text" } },
      ],
    },
    modelInfo: { provider: "openai", model: "gpt-4o-mini" },
    credentials: { apiKey: "synthetic-only", providerSpecificData: {} },
    log: { debug() {}, info() {}, warn() {}, error() {} },
    onCredentialsRefreshed: null,
    onRequestSuccess: null,
    onDisconnect: null,
    connectionId: null,
    signal: undefined,
  });
  assert.ok(!(result instanceof Response));
  assert.equal(result.success, true);
  const text = await result.response!.text();
  assert.equal(sent.length, 1);
  const tools = sent[0].tools as Array<{ function: { name: string } }>;
  assert.deepEqual(
    tools.map((tool) => tool.function.name),
    ["exec", "functions__exec"]
  );
  const events: Event[] = text
    .split("\n\n")
    .filter((frame) => frame.startsWith("event:"))
    .map((frame) => ({
      event: frame.split("\n")[0].slice(7),
      data: JSON.parse(frame.split("\n")[1].slice(6)),
    }));
  const added = toolItems(events, "added");
  const done = toolItems(events, "done");
  assert.equal(added.length, 1);
  assert.equal(done.length, 1);
  for (const item of [...added, ...done])
    assert.deepEqual(identity(item), ["function_call", "exec", undefined]);
  assert.equal(done[0].arguments, '{"input":"safe"}');
});
