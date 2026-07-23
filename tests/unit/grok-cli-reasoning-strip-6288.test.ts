import test from "node:test";
import assert from "node:assert/strict";

const { GrokCliExecutor } = await import("@omniroute/open-sse/executors/grok-cli");

// #6288 originally protected the legacy Chat Completions bridge from reasoning
// fields. Both current models now use Responses; grok-4.5 accepts an effort,
// while Composer does not.

test("grok-4.5 preserves Responses reasoning", () => {
  const executor = new GrokCliExecutor();
  const body = {
    model: "grok-4.5",
    input: [{ role: "user", content: [{ type: "input_text", text: "hi" }] }],
    reasoning: { effort: "high", summary: "auto" },
  };

  const out = executor.transformRequest("grok-4.5", body, true, {} as never) as Record<
    string,
    unknown
  >;

  assert.deepEqual(out.reasoning, { effort: "high", summary: "auto" });
});

test("grok composer strips unsupported Responses reasoning", () => {
  const executor = new GrokCliExecutor();
  const body = {
    model: "grok-composer-2.5-fast",
    input: [{ role: "user", content: [{ type: "input_text", text: "hi" }] }],
    reasoning: { effort: "high" },
  };

  const out = executor.transformRequest(
    "grok-composer-2.5-fast",
    body,
    false,
    {} as never
  ) as Record<string, unknown>;

  assert.equal("reasoning" in out, false);
});

test("grok-cli strips legacy top-level reasoning_effort after translation", () => {
  const executor = new GrokCliExecutor();
  const body = {
    model: "grok-4.5",
    input: [],
    reasoning_effort: "high",
  };

  const out = executor.transformRequest("grok-4.5", body, false, {} as never) as Record<
    string,
    unknown
  >;

  assert.equal("reasoning_effort" in out, false);
});

test("grok-cli applies official Responses defaults without mutating client input", () => {
  const executor = new GrokCliExecutor();
  const body = {
    model: "grok-4.5",
    input: [],
    include: ["file_search_call.results"],
  };

  const out = executor.transformRequest("grok-4.5", body, true, {} as never) as Record<
    string,
    unknown
  >;

  assert.equal(out.store, false);
  assert.deepEqual(out.include, ["file_search_call.results", "reasoning.encrypted_content"]);
  assert.deepEqual(out.reasoning, { effort: "high" });
  assert.deepEqual(body, {
    model: "grok-4.5",
    input: [],
    include: ["file_search_call.results"],
  });
});

test("grok-cli preserves explicit store and de-duplicates encrypted reasoning include", () => {
  const executor = new GrokCliExecutor();
  const out = executor.transformRequest(
    "grok-4.5",
    {
      input: [],
      store: true,
      include: ["reasoning.encrypted_content"],
      reasoning: { effort: "xhigh" },
    },
    false,
    {} as never
  ) as Record<string, unknown>;

  assert.equal(out.store, true);
  assert.deepEqual(out.include, ["reasoning.encrypted_content"]);
  assert.equal("reasoning" in out, false);
});

test("grok-cli preserves an explicit Responses reasoning summary", () => {
  const executor = new GrokCliExecutor();
  const out = executor.transformRequest(
    "grok-4.5",
    {
      input: [],
      reasoning: { summary: "concise" },
    },
    false,
    {} as never
  ) as Record<string, unknown>;

  assert.deepEqual(out.reasoning, { summary: "concise", effort: "high" });
});
