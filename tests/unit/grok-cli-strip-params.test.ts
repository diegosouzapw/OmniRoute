import test from "node:test";
import assert from "node:assert/strict";

const { GrokCliExecutor } = await import("@omniroute/open-sse/executors/grok-cli");

// Regression for #5273: Grok Build returns `400 'Model does not support parameter
// presencePenalty'` when clients (MiMoCode, Cursor, …) send OpenAI-style sampling
// params Grok Build cannot accept. transformRequest() must strip them before forwarding.
const UNSUPPORTED = [
  "presencePenalty",
  "frequencyPenalty",
  "logprobs",
  "topLogprobs",
  "presence_penalty",
  "frequency_penalty",
  "top_logprobs",
];

test("#5273 grok-cli transformRequest strips unsupported sampling params", () => {
  const executor = new GrokCliExecutor();
  const body = {
    model: "grok-4.5",
    input: [{ role: "user", content: [{ type: "input_text", text: "hi" }] }],
    temperature: 0.7,
    top_p: 0.9,
    presencePenalty: 0.5,
    frequencyPenalty: 0.3,
    logprobs: true,
    topLogprobs: 5,
    presence_penalty: 0.4,
    frequency_penalty: 0.2,
    top_logprobs: 3,
  };

  const out = executor.transformRequest("grok-4.5", body, false, {} as never) as Record<
    string,
    unknown
  >;

  // Unsupported params are gone…
  for (const param of UNSUPPORTED) {
    assert.equal(param in out, false, `${param} must be stripped before forwarding to Grok Build`);
  }
  // …while supported params + payload survive untouched.
  assert.equal(out.temperature, 0.7);
  assert.equal(out.top_p, 0.9);
  assert.deepEqual(out.input, [{ role: "user", content: [{ type: "input_text", text: "hi" }] }]);
  assert.equal(out.model, "grok-4.5");
  assert.equal(out.stream, false);
});

test("#5273 grok-cli transformRequest leaves a clean body unchanged (no false stripping)", () => {
  const executor = new GrokCliExecutor();
  const out = executor.transformRequest(
    "grok-composer-2.5-fast",
    { messages: [{ role: "user", content: "ok" }], temperature: 1 },
    true,
    {} as never
  ) as Record<string, unknown>;

  assert.equal(out.temperature, 1);
  assert.equal(out.model, "grok-composer-2.5-fast");
  assert.equal(out.stream, true);
});

// Ported from decolua/9router#2534 (@gitcommit90): xAI's cli-chat-proxy enforces a
// hard cap of 200 tools per request and 400s above it. Clients that fan a large MCP
// toolset through Grok Build/Composer can exceed that ceiling — transformRequest()
// must cap defensively instead of forwarding an oversized array upstream.
test("2534 grok-cli transformRequest caps tools at 200", () => {
  const executor = new GrokCliExecutor();
  const tools = Array.from({ length: 250 }, (_, i) => ({
    type: "function",
    function: { name: `tool_${i}` },
  }));
  const out = executor.transformRequest(
    "grok-build",
    { messages: [{ role: "user", content: "hi" }], tools },
    false,
    {} as never
  ) as Record<string, unknown>;

  assert.equal((out.tools as unknown[]).length, 200);
  assert.deepEqual(out.tools, tools.slice(0, 200));
});

test("2534 grok-cli transformRequest leaves a tools array under the cap untouched", () => {
  const executor = new GrokCliExecutor();
  const tools = Array.from({ length: 10 }, (_, i) => ({
    type: "function",
    function: { name: `tool_${i}` },
  }));
  const out = executor.transformRequest(
    "grok-composer-2.5-fast",
    { messages: [{ role: "user", content: "hi" }], tools },
    false,
    {} as never
  ) as Record<string, unknown>;

  assert.deepEqual(out.tools, tools);
});
