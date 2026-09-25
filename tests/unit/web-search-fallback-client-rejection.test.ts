import test from "node:test";
import assert from "node:assert/strict";

const { prepareWebSearchFallbackBody, OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME } =
  await import("../../open-sse/services/webSearchFallback.ts");

// A Responses client gets the fallback's internal round trip in the output (#12030):
// function_call omniroute_web_search + the executed function_call_output. Codex
// records both, then answers the function_call itself because it never declared
// that tool, so its next request carries two outputs for one call_id: the executed
// result and "unsupported call: omniroute_web_search".

const searchResult = JSON.stringify({ success: true, query: "node lts", results: [] });

function followUpTurn(extraInput: Record<string, unknown>[] = []) {
  return {
    model: "cursor/gemini-3.8-flash",
    tools: [{ type: "web_search" }],
    input: [
      { type: "message", role: "user", content: [{ type: "input_text", text: "search" }] },
      {
        type: "function_call",
        call_id: "call_ws1",
        name: OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME,
        arguments: '{"query":"node lts"}',
      },
      { type: "function_call_output", call_id: "call_ws1", output: searchResult },
      { type: "web_search_call", id: "ws_call_ws1", status: "completed" },
      {
        type: "function_call_output",
        call_id: "call_ws1",
        output: `unsupported call: ${OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME}`,
      },
      ...extraInput,
    ],
  };
}

function outputsFor(body: { input?: unknown }, callId: string) {
  return (body.input as Record<string, unknown>[]).filter(
    (item) => item.type === "function_call_output" && item.call_id === callId
  );
}

test("drops the client's rejection of a fallback call that already carries the executed result", () => {
  const { body, fallback } = prepareWebSearchFallbackBody(followUpTurn(), {
    targetFormat: "openai",
    nativeCodexPassthrough: false,
  });

  assert.equal(fallback.enabled, true);
  const outputs = outputsFor(body, "call_ws1");
  assert.equal(outputs.length, 1, "one output per call_id");
  assert.equal(outputs[0].output, searchResult, "the executed result is the one kept");
  assert.deepEqual(
    (body.input as Record<string, unknown>[]).map((item) => item.type),
    ["message", "function_call", "function_call_output", "web_search_call"]
  );
});

test("leaves duplicate outputs of a client-owned call alone", () => {
  const clientCall = [
    { type: "function_call", call_id: "call_x", name: "exec_command", arguments: "{}" },
    { type: "function_call_output", call_id: "call_x", output: "first" },
    { type: "function_call_output", call_id: "call_x", output: "second" },
  ];
  const { body } = prepareWebSearchFallbackBody(followUpTurn(clientCall), {
    targetFormat: "openai",
    nativeCodexPassthrough: false,
  });

  assert.equal(outputsFor(body, "call_x").length, 2);
});

test("keeps a lone client output for a fallback call", () => {
  const turn = followUpTurn();
  turn.input.splice(2, 1); // the client did not record the executed result
  const { body } = prepareWebSearchFallbackBody(turn, {
    targetFormat: "openai",
    nativeCodexPassthrough: false,
  });

  const outputs = outputsFor(body, "call_ws1");
  assert.equal(outputs.length, 1);
  assert.match(String(outputs[0].output), /unsupported call/);
});

test("does not rewrite input that has no duplicate fallback output", () => {
  const input = [{ type: "message", role: "user", content: "search the web" }];
  const { body } = prepareWebSearchFallbackBody(
    { model: "m", tools: [{ type: "web_search" }], input },
    { targetFormat: "openai", nativeCodexPassthrough: false }
  );

  assert.equal(body.input, input);
});

test("pairs each output with the call just before it when call ids repeat across turns", () => {
  // Some upstreams number tool calls per turn (call_0 every time).
  const call = (name: string) => ({
    type: "function_call",
    call_id: "call_0",
    name,
    arguments: "{}",
  });
  const out = (output: string) => ({ type: "function_call_output", call_id: "call_0", output });
  const rejection = `unsupported call: ${OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME}`;
  const input = [
    call(OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME),
    out('{"success":true,"turn":1}'),
    out(rejection),
    call("exec_command"),
    out("shell output"),
    call(OMNIROUTE_WEB_SEARCH_FALLBACK_TOOL_NAME),
    out('{"success":true,"turn":3}'),
    out(rejection),
  ];
  const { body } = prepareWebSearchFallbackBody(
    { model: "m", tools: [{ type: "web_search" }], input },
    { targetFormat: "openai", nativeCodexPassthrough: false }
  );

  assert.deepEqual(
    (body.input as Record<string, unknown>[])
      .filter((item) => item.type === "function_call_output")
      .map((item) => item.output),
    ['{"success":true,"turn":1}', "shell output", '{"success":true,"turn":3}']
  );
});

test("keeps the executed result even when the client's rejection comes first", () => {
  const turn = followUpTurn();
  const [executed] = turn.input.splice(2, 1);
  turn.input.push(executed); // rejection now precedes the executed result
  const { body } = prepareWebSearchFallbackBody(turn, {
    targetFormat: "openai",
    nativeCodexPassthrough: false,
  });

  const outputs = outputsFor(body, "call_ws1");
  assert.equal(outputs.length, 1);
  assert.equal(outputs[0].output, searchResult);
});
