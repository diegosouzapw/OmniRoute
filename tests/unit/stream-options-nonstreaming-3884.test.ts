/**
 * TDD regression for #3884: OmniRoute leaked `stream_options` onto NON-streaming
 * requests. NVIDIA NIM (and the OpenAI spec) reject it with
 * `400 "Stream options can only be defined when stream=True"`.
 *
 * Root cause: DefaultExecutor.transformRequest injected `stream_options` only on
 * streaming openai requests (correctly gated on `stream`), but had no branch to
 * STRIP a client-sent `stream_options` when the outbound request is non-streaming
 * — so the OpenAI Python SDK and similar clients (which send
 * `stream_options:{include_usage:true}` regardless of `stream`) passed it through
 * untouched to the provider on `stream:false` calls. Affects all openai-compat
 * providers; NIM is just the one that strictly rejects the violation.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

test("#3884 non-streaming request strips a client-sent stream_options", () => {
  const executor = new DefaultExecutor("openai");
  const body = {
    model: "gpt-4.1",
    messages: [{ role: "user", content: "hi" }],
    stream_options: { include_usage: true },
  };
  const result = executor.transformRequest("gpt-4.1", body, false, {}) as Record<string, unknown>;
  assert.equal(
    result.stream_options,
    undefined,
    "stream_options must be stripped when the outbound request is not streaming"
  );
});

test("#3884 streaming request still injects stream_options.include_usage", () => {
  const executor = new DefaultExecutor("openai");
  const body = { model: "gpt-4.1", messages: [{ role: "user", content: "hi" }] };
  const result = executor.transformRequest("gpt-4.1", body, true, {}) as Record<string, unknown>;
  assert.deepEqual(result.stream_options, { include_usage: true });
});

test("#3884 non-streaming request without stream_options stays clean", () => {
  const executor = new DefaultExecutor("openai");
  const body = { model: "gpt-4.1", messages: [{ role: "user", content: "hi" }] };
  const result = executor.transformRequest("gpt-4.1", body, false, {}) as Record<string, unknown>;
  assert.equal(result.stream_options, undefined);
});
