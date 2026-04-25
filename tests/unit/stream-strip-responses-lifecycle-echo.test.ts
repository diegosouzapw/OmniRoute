import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  backfillResponsesCompletedOutput,
  stripResponsesLifecycleEcho,
} from "../../open-sse/utils/stream.ts";

describe("stripResponsesLifecycleEcho", () => {
  it("strips instructions + tools from response.created", () => {
    const event = {
      type: "response.created",
      response: {
        id: "resp_1",
        status: "in_progress",
        instructions: "very long system prompt".repeat(2000),
        tools: [{ type: "function", name: "view" }],
        model: "gpt-5.4",
      },
    };

    const changed = stripResponsesLifecycleEcho(event);

    assert.equal(changed, true);
    assert.equal("instructions" in event.response, false);
    assert.equal("tools" in event.response, false);
    // Other fields untouched
    assert.equal(event.response.id, "resp_1");
    assert.equal(event.response.status, "in_progress");
    assert.equal(event.response.model, "gpt-5.4");
  });

  it("strips fields from response.in_progress", () => {
    const event = {
      type: "response.in_progress",
      response: { instructions: "x", tools: [] },
    };
    assert.equal(stripResponsesLifecycleEcho(event), true);
    assert.deepEqual(event.response, {});
  });

  it("strips fields from response.completed (preserving usage)", () => {
    const event = {
      type: "response.completed",
      response: {
        id: "resp_2",
        status: "completed",
        instructions: "system prompt",
        tools: [{ name: "bash" }],
        usage: { input_tokens: 100, output_tokens: 50, total_tokens: 150 },
      },
    };

    const changed = stripResponsesLifecycleEcho(event);

    assert.equal(changed, true);
    assert.equal("instructions" in event.response, false);
    assert.equal("tools" in event.response, false);
    // Usage must survive — downstream tracking depends on it.
    assert.deepEqual(event.response.usage, {
      input_tokens: 100,
      output_tokens: 50,
      total_tokens: 150,
    });
  });

  it("returns false (no-op) when neither field is present", () => {
    const event = {
      type: "response.completed",
      response: { id: "resp_3", status: "completed" },
    };
    const before = JSON.stringify(event);
    assert.equal(stripResponsesLifecycleEcho(event), false);
    assert.equal(JSON.stringify(event), before);
  });

  it("strips only the field that exists", () => {
    const onlyTools = {
      type: "response.created",
      response: { tools: [{ name: "view" }] },
    };
    assert.equal(stripResponsesLifecycleEcho(onlyTools), true);
    assert.equal("tools" in onlyTools.response, false);

    const onlyInstr = {
      type: "response.created",
      response: { instructions: "hi" },
    };
    assert.equal(stripResponsesLifecycleEcho(onlyInstr), true);
    assert.equal("instructions" in onlyInstr.response, false);
  });

  it("does NOT touch incremental events", () => {
    const cases = [
      {
        type: "response.output_item.added",
        item: { type: "function_call", name: "view" },
      },
      {
        type: "response.function_call_arguments.delta",
        delta: '{"path":"/x"}',
      },
      {
        type: "response.output_text.delta",
        delta: "hello",
      },
      {
        type: "response.reasoning_summary_text.delta",
        delta: "thinking",
      },
    ];
    for (const event of cases) {
      const before = JSON.stringify(event);
      assert.equal(stripResponsesLifecycleEcho(event), false, `should ignore ${event.type}`);
      assert.equal(JSON.stringify(event), before, `should not mutate ${event.type}`);
    }
  });

  it("returns false for malformed payloads", () => {
    assert.equal(stripResponsesLifecycleEcho(null), false);
    assert.equal(stripResponsesLifecycleEcho(undefined), false);
    assert.equal(stripResponsesLifecycleEcho("string"), false);
    assert.equal(stripResponsesLifecycleEcho(42), false);
    assert.equal(stripResponsesLifecycleEcho([]), false);
    assert.equal(stripResponsesLifecycleEcho({ type: "response.created" }), false);
    assert.equal(stripResponsesLifecycleEcho({ type: "response.created", response: null }), false);
    assert.equal(stripResponsesLifecycleEcho({ type: "response.created", response: "x" }), false);
    assert.equal(stripResponsesLifecycleEcho({ type: "response.created", response: [] }), false);
  });

  it("ignores Chat Completions chunks", () => {
    const event = {
      choices: [{ delta: { content: "hi" }, index: 0 }],
      object: "chat.completion.chunk",
    };
    assert.equal(stripResponsesLifecycleEcho(event), false);
  });
});

describe("backfillResponsesCompletedOutput", () => {
  const items = [
    { id: "rs_1", type: "reasoning" },
    {
      id: "fc_1",
      type: "function_call",
      name: "view",
      call_id: "call_abc",
      arguments: '{"path":"/x"}',
    },
  ];

  it("backfills output when response.completed.response.output is empty", () => {
    const event = {
      type: "response.completed",
      response: { id: "resp_1", status: "completed", output: [], usage: { input_tokens: 1 } },
    };
    const changed = backfillResponsesCompletedOutput(event, items);
    assert.equal(changed, true);
    assert.deepEqual(event.response.output, items);
    // Other fields untouched
    assert.equal(event.response.id, "resp_1");
    assert.deepEqual(event.response.usage, { input_tokens: 1 });
  });

  it("backfills when output is missing entirely", () => {
    const event = {
      type: "response.completed",
      response: { id: "resp_2" },
    } as { type: string; response: { id: string; output?: unknown[] } };
    const changed = backfillResponsesCompletedOutput(event, items);
    assert.equal(changed, true);
    assert.deepEqual(event.response.output, items);
  });

  it("does NOT overwrite an already-populated output array", () => {
    const upstream = [{ id: "fc_x", type: "function_call", name: "bash" }];
    const event = {
      type: "response.completed",
      response: { id: "resp_3", output: upstream },
    };
    const changed = backfillResponsesCompletedOutput(event, items);
    assert.equal(changed, false);
    assert.deepEqual(event.response.output, upstream);
  });

  it("returns false when no items have been collected", () => {
    const event = {
      type: "response.completed",
      response: { id: "resp_4", output: [] },
    };
    const changed = backfillResponsesCompletedOutput(event, []);
    assert.equal(changed, false);
    assert.deepEqual(event.response.output, []);
  });

  it("ignores non-completed events", () => {
    for (const type of [
      "response.created",
      "response.in_progress",
      "response.output_item.added",
      "response.output_item.done",
      "response.function_call_arguments.delta",
    ]) {
      const event = { type, response: { output: [] } };
      const changed = backfillResponsesCompletedOutput(event, items);
      assert.equal(changed, false, `should ignore ${type}`);
    }
  });

  it("returns false on malformed payloads", () => {
    assert.equal(backfillResponsesCompletedOutput(null, items), false);
    assert.equal(backfillResponsesCompletedOutput(undefined, items), false);
    assert.equal(backfillResponsesCompletedOutput("string", items), false);
    assert.equal(backfillResponsesCompletedOutput([], items), false);
    assert.equal(backfillResponsesCompletedOutput({ type: "response.completed" }, items), false);
    assert.equal(
      backfillResponsesCompletedOutput({ type: "response.completed", response: null }, items),
      false
    );
    assert.equal(
      backfillResponsesCompletedOutput({ type: "response.completed", response: [] }, items),
      false
    );
  });

  it("clones the items array (callers can keep mutating their buffer)", () => {
    const buf: unknown[] = [{ id: "fc_a", type: "function_call" }];
    const event = { type: "response.completed", response: { output: [] } };
    backfillResponsesCompletedOutput(event, buf);
    buf.push({ id: "fc_b", type: "function_call" });
    assert.equal((event.response.output as unknown[]).length, 1);
  });
});
