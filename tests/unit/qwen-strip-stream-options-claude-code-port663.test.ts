/**
 * Port of upstream decolua/9router#663 (closes upstream #557).
 *
 * Scenario: Claude Code (or any caller) hits a Qwen model with an OpenAI body
 * that carries `stream: false`. OmniRoute, however, sets the executor-level
 * `stream` flag to `true` for Claude-Code-compatible providers via
 * `upstreamStream = stream || isClaudeCodeCompatible`
 * (`open-sse/handlers/chatCore.ts`). DefaultExecutor.transformRequest then runs
 * its `if (stream && targetFormat === "openai")` branch and injects
 * `stream_options: { include_usage: true }` onto a body that still carries
 * `stream: false`. Qwen upstream rejects with:
 *   400 "'stream_options' only set this when you set stream: true"
 *
 * Fix mirrors upstream: when the OUTGOING body explicitly says `stream: false`,
 * do NOT inject `stream_options` regardless of the executor-level `stream` arg.
 * Same defensive treatment when the body carries `thinking` /
 * `enable_thinking`, since the upstream PR also exempts those.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

test("port#663 qwen: body.stream===false → no stream_options even when executor stream=true", () => {
  const executor = new DefaultExecutor("qwen");
  const body = {
    model: "qwen3-coder-plus",
    messages: [{ role: "user", content: "hi" }],
    stream: false,
  };
  const result = executor.transformRequest(
    "qwen3-coder-plus",
    body,
    /* stream */ true,
    {}
  ) as Record<string, unknown>;
  assert.equal(
    result.stream_options,
    undefined,
    "stream_options must not be injected when body.stream === false"
  );
});

test("port#663 qwen: body.thinking truthy → no stream_options injection", () => {
  const executor = new DefaultExecutor("qwen");
  const body = {
    model: "qwen3-coder-plus",
    messages: [{ role: "user", content: "hi" }],
    thinking: { type: "enabled" },
  };
  const result = executor.transformRequest(
    "qwen3-coder-plus",
    body,
    true,
    {}
  ) as Record<string, unknown>;
  assert.equal(
    result.stream_options,
    undefined,
    "stream_options must not be injected when thinking mode is requested"
  );
});

test("port#663 qwen: body.enable_thinking truthy → no stream_options injection", () => {
  const executor = new DefaultExecutor("qwen");
  const body = {
    model: "qwen3-coder-plus",
    messages: [{ role: "user", content: "hi" }],
    enable_thinking: true,
  };
  const result = executor.transformRequest(
    "qwen3-coder-plus",
    body,
    true,
    {}
  ) as Record<string, unknown>;
  assert.equal(
    result.stream_options,
    undefined,
    "stream_options must not be injected when enable_thinking is true"
  );
});

test("port#663 qwen: normal streaming request still injects stream_options.include_usage", () => {
  const executor = new DefaultExecutor("qwen");
  const body = {
    model: "qwen3-coder-plus",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = executor.transformRequest(
    "qwen3-coder-plus",
    body,
    true,
    {}
  ) as Record<string, unknown>;
  assert.deepEqual(
    result.stream_options,
    { include_usage: true },
    "regular qwen streaming requests must keep the include_usage injection"
  );
});
