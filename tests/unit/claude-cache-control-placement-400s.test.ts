import test from "node:test";
import assert from "node:assert/strict";

// cache_control 400-class regressions on claude 5.x (2026-09-29+):
//   1. nested cache_control inside tool_result.content[] -> hoist onto the block
//   2. more than 4 cache_control blocks per request -> cull the earliest
// Both enforced in prepareClaudeRequest for every Claude-format target,
// including client-marker passthrough (preserveCacheControl).

const { prepareClaudeRequest } = await import("../../open-sse/translator/helpers/claudeHelper.ts");

/** @typedef {{ type?: string; text?: string; cache_control?: unknown; content?: unknown; tool_use_id?: string }} Block */

function baseBody() {
  return {
    model: "claude-opus-5-5",
    max_tokens: 1024,
    system: [{ type: "text", text: "sys" }],
    messages: [
      { role: "user", content: [{ type: "text", text: "q1" }] },
      { role: "assistant", content: [{ type: "tool_use", id: "t1", name: "probe", input: {} }] },
      {
        role: "user",
        content: [
          { type: "tool_result", tool_use_id: "t1", content: [{ type: "text", text: "r1" }] },
        ],
      },
    ],
  };
}

function marker(ttl = undefined) {
  return ttl ? { type: "ephemeral", ttl } : { type: "ephemeral" };
}

function toolResultMessage(body) {
  return body.messages[2].content[0];
}

test("nested tool_result.content cache_control is hoisted onto the tool_result block", () => {
  const body = baseBody();
  toolResultMessage(body).content = [
    { type: "text", text: "inner", cache_control: marker("1h") },
    { type: "text", text: "second", cache_control: marker() },
  ];
  const out = prepareClaudeRequest(body, "claude", true, "claude-opus-5-5");
  const block = toolResultMessage(out);
  assert.deepEqual(block.cache_control, marker("1h"), "marker hoisted to tool_result");
  for (const inner of block.content) {
    assert.equal(inner.cache_control, undefined, "inner marker stripped");
  }
});

test("hoist applies in non-preserve mode too (translator-injected markers)", () => {
  const body = baseBody();
  toolResultMessage(body).content = [{ type: "text", text: "x", cache_control: marker() }];
  const out = prepareClaudeRequest(body, "claude", false, "claude-opus-5-5");
  const block = toolResultMessage(out);
  assert.ok(block.cache_control, "hoisted");
  assert.equal(block.content[0].cache_control, undefined);
});

test("existing block-level cache_control is preserved, inner markers still stripped", () => {
  const body = baseBody();
  toolResultMessage(body).cache_control = marker();
  toolResultMessage(body).content = [{ type: "text", text: "x", cache_control: marker("1h") }];
  const out = prepareClaudeRequest(body, "claude", true, "claude-opus-5-5");
  const block = toolResultMessage(out);
  assert.deepEqual(block.cache_control, marker(), "block marker untouched");
  assert.equal(block.content[0].cache_control, undefined, "inner stripped");
});

function overLimitBody() {
  // 1 system + 1 tool + 3 message = 5 markers -> one over the limit of 4
  return {
    model: "claude-opus-5-5",
    max_tokens: 1024,
    system: [
      { type: "text", text: "s1", cache_control: marker("1h") },
      { type: "text", text: "s2" },
    ],
    tools: [
      { name: "toolA", input_schema: {}, cache_control: marker("1h") },
      { name: "toolB", input_schema: {} },
    ],
    messages: [
      { role: "user", content: [{ type: "text", text: "u1", cache_control: marker() }] },
      { role: "assistant", content: [{ type: "text", text: "a1", cache_control: marker() }] },
      { role: "user", content: [{ type: "text", text: "u2", cache_control: marker() }] },
    ],
  };
}

function countMarkers(body) {
  let n = 0;
  if (Array.isArray(body.system))
    n += body.system.filter((b) => b.cache_control !== undefined).length;
  if (Array.isArray(body.tools))
    n += body.tools.filter((b) => b.cache_control !== undefined).length;
  for (const m of body.messages ?? []) {
    if (Array.isArray(m?.content))
      n += m.content.filter((b) => b.cache_control !== undefined).length;
  }
  return n;
}

test("more than 4 cache_control blocks are culled, keeping the last 4", () => {
  const body = overLimitBody();
  const out = prepareClaudeRequest(body, "claude", true, "claude-opus-5-5");
  assert.equal(countMarkers(out), 4, "exactly 4 remain");
  assert.equal(out.system[0].cache_control, undefined, "earliest (system) culled");
  assert.ok(out.tools[0].cache_control, "tool marker kept");
  assert.ok(out.messages[2].content[0].cache_control, "latest user marker kept");
});

test("4 or fewer cache_control blocks are untouched", () => {
  const body = overLimitBody();
  body.system[0].cache_control = undefined;
  const out = prepareClaudeRequest(body, "claude", true, "claude-opus-5-5");
  assert.equal(countMarkers(out), 4);
  assert.ok(out.messages[0].content[0].cache_control);
});

test("cap does not apply to non-caching Claude-shape providers (kimi-coding)", () => {
  const body = overLimitBody();
  const out = prepareClaudeRequest(body, "kimi-coding", true, "kimi-k2");
  assert.equal(countMarkers(out), 5, "supportsPromptCaching false -> no cull");
});

test("string tool_result content is left alone", () => {
  const body = baseBody();
  toolResultMessage(body).content = "plain";
  const out = prepareClaudeRequest(body, "claude", true, "claude-opus-5-5");
  assert.equal(toolResultMessage(out).content, "plain");
  assert.equal(toolResultMessage(out).cache_control, undefined);
});
