import assert from "node:assert/strict";
import test from "node:test";

import {
  countToolResultTurns,
  handleAgenticPipelineChat,
  hasTrailingToolResult,
} from "../../open-sse/services/agenticPipeline.ts";
import type { HandleSingleModel } from "../../open-sse/services/combo/types.ts";

type Body = Record<string, unknown>;

const noop = () => undefined;
const log = { info: noop, warn: noop, debug: noop, error: noop };

function responseText(content: string): Response {
  return new Response(JSON.stringify({ choices: [{ message: { role: "assistant", content } }] }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function steps() {
  return [{ model: "p/planner" }, { model: "p/executor" }];
}

test("agentic detector recognizes trailing tool results across supported request formats", () => {
  assert.equal(
    hasTrailingToolResult({
      messages: [{ role: "user", content: [{ type: "tool_result", tool_use_id: "t1" }] }],
    }),
    true
  );
  assert.equal(
    hasTrailingToolResult({ messages: [{ role: "tool", tool_call_id: "t1", content: "ok" }] }),
    true
  );
  assert.equal(
    hasTrailingToolResult({ input: [{ type: "function_call_output", call_id: "c1" }] }),
    true
  );
  assert.equal(
    hasTrailingToolResult({ contents: [{ role: "user", parts: [{ functionResponse: {} }] }] }),
    true
  );
  assert.equal(
    hasTrailingToolResult({
      messages: [
        { role: "assistant", content: [{ type: "tool_use", id: "old" }] },
        { role: "user", content: "a later fresh question" },
      ],
    }),
    false,
    "historical tool use must not classify a fresh turn as a continuation"
  );
});

test("agentic detector counts completed rounds for bounded sequential loops", () => {
  assert.equal(
    countToolResultTurns({
      messages: [
        { role: "tool", content: "one" },
        { role: "user", content: [{ type: "tool_result", tool_use_id: "two" }] },
      ],
      input: [{ type: "function_call_output", call_id: "three" }],
      contents: [{ role: "user", parts: [{ functionResponse: { name: "four" } }] }],
    }),
    4
  );
});

test("round counting ignores completed tool loops before the current user request", () => {
  assert.equal(
    countToolResultTurns({
      messages: [
        { role: "user", content: "old request" },
        { role: "tool", content: "old result" },
        { role: "user", content: "new request" },
        { role: "assistant", content: [{ type: "tool_use", id: "new" }] },
        { role: "tool", content: "new result" },
      ],
    }),
    1
  );
});

test("fresh tool-bearing turn buffers planner then streams executor with native tools intact", async () => {
  const calls: Array<{ model: string; body: Body }> = [];
  const handle: HandleSingleModel = async (body, model) => {
    calls.push({ model, body });
    return model === "p/planner"
      ? responseText("OMNIROUTE_ROUTE: TOOLS\nRead the two files in parallel.")
      : responseText("executor-response");
  };

  const result = await handleAgenticPipelineChat({
    body: {
      messages: [{ role: "user", content: "inspect both files" }],
      tools: [{ name: "read_file" }],
      stream: true,
    },
    steps: steps(),
    handleSingleModel: handle,
    log,
  });

  assert.equal(result.status, 200);
  assert.deepEqual(
    calls.map((call) => call.model),
    ["p/planner", "p/executor"]
  );
  assert.equal(calls[0].body.stream, false);
  assert.equal(calls[0].body.tools, undefined);
  assert.match(JSON.stringify(calls[0].body), /read_file/);
  assert.equal(calls[1].body.stream, true);
  assert.deepEqual(calls[1].body.tools, [{ name: "read_file" }]);
});

test("tool-result continuation returns to planner and planner owns the streamed final answer", async () => {
  const calls: Array<{ model: string; body: Body }> = [];
  const handle: HandleSingleModel = async (body, model) => {
    calls.push({ model, body });
    return calls.length === 1
      ? responseText("OMNIROUTE_ROUTE: FINAL\nThe file is valid.")
      : responseText("final-from-planner");
  };

  await handleAgenticPipelineChat({
    body: {
      messages: [
        { role: "assistant", content: [{ type: "tool_use", id: "t1", name: "read" }] },
        { role: "user", content: [{ type: "tool_result", tool_use_id: "t1", content: "ok" }] },
      ],
      tools: [{ name: "read" }],
      stream: true,
    },
    steps: steps(),
    handleSingleModel: handle,
    log,
  });

  assert.deepEqual(
    calls.map((call) => call.model),
    ["p/planner", "p/planner"]
  );
  assert.equal(calls[1].body.stream, true);
  assert.equal(calls[1].body.tools, undefined);
});

test("planner may request another sequential tool round after reviewing results", async () => {
  const seen: string[] = [];
  const handle: HandleSingleModel = async (_body, model) => {
    seen.push(model);
    return model === "p/planner"
      ? responseText("OMNIROUTE_ROUTE: TOOLS\nNow run the test suite.")
      : responseText("next-tool-call");
  };

  await handleAgenticPipelineChat({
    body: {
      messages: [{ role: "user", content: [{ type: "tool_result", tool_use_id: "t1" }] }],
      tools: [{ name: "shell" }, { name: "read" }],
    },
    steps: steps(),
    handleSingleModel: handle,
    log,
  });

  assert.deepEqual(seen, ["p/planner", "p/executor"]);
});

test("tool-round limit overrides a planner TOOLS decision and forces planner final", async () => {
  const calls: Array<{ model: string; body: Body }> = [];
  const handle: HandleSingleModel = async (body, model) => {
    calls.push({ model, body });
    return responseText("OMNIROUTE_ROUTE: TOOLS\nCall another tool.");
  };

  await handleAgenticPipelineChat({
    body: {
      messages: [{ role: "user", content: [{ type: "tool_result", tool_use_id: "t1" }] }],
      tools: [{ name: "shell" }],
      stream: true,
    },
    steps: steps(),
    handleSingleModel: handle,
    log,
    config: { maxToolRounds: 1 },
  });

  assert.deepEqual(
    calls.map((call) => call.model),
    ["p/planner", "p/planner"]
  );
  assert.equal(calls[1].body.tools, undefined);
});

test("malformed continuation decisions fail closed to planner final", async () => {
  const seen: string[] = [];
  const handle: HandleSingleModel = async (_body, model) => {
    seen.push(model);
    return responseText("unstructured planner prose");
  };

  await handleAgenticPipelineChat({
    body: {
      messages: [{ role: "tool", content: "done" }],
      tools: [{ name: "shell" }],
    },
    steps: steps(),
    handleSingleModel: handle,
    log,
  });

  assert.deepEqual(seen, ["p/planner", "p/planner"]);
});

test("requests without usable client tools route directly to planner once", async () => {
  const seen: string[] = [];
  const handle: HandleSingleModel = async (_body, model) => {
    seen.push(model);
    return responseText("answer");
  };

  await handleAgenticPipelineChat({
    body: { messages: [{ role: "user", content: "hello" }], stream: true },
    steps: steps(),
    handleSingleModel: handle,
    log,
  });

  assert.deepEqual(seen, ["p/planner"]);
});

test("agentic pipeline rejects configurations that are not planner + executor", async () => {
  const result = await handleAgenticPipelineChat({
    body: { messages: [{ role: "user", content: "hello" }] },
    steps: [{ model: "p/only" }],
    handleSingleModel: async () => responseText("unused"),
    log,
  });
  assert.equal(result.status, 400);
});

test("pipeline dispatch wiring selects agentic mode when enabled", async () => {
  const { handleComboChat } = await import("../../open-sse/services/combo.ts");
  const seen: string[] = [];
  const result = await handleComboChat({
    body: {
      messages: [{ role: "user", content: "inspect" }],
      tools: [{ name: "read" }],
    },
    combo: {
      name: "agentic-pipeline",
      strategy: "pipeline",
      models: [{ model: "p/planner" }, { model: "p/executor" }],
      config: { agenticOrchestration: { enabled: true } },
    },
    handleSingleModel: async (_body, model) => {
      seen.push(model);
      return model === "p/planner"
        ? responseText("OMNIROUTE_ROUTE: TOOLS\nRead it.")
        : responseText("tool-call");
    },
    log,
    settings: {},
    allCombos: [],
  });

  assert.equal(result.status, 200);
  assert.deepEqual(seen, ["p/planner", "p/executor"]);
});
