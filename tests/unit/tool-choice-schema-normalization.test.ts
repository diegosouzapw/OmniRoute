import test from "node:test";
import assert from "node:assert/strict";

const { sanitizeRequestForResolvedTarget } =
  await import("../../open-sse/services/targetRequestSanitizer.ts");

const baseOpts = { provider: "skhynix", model: "DeepSeek-V4-Flash-0731" } as const;

test("tool_choice schema normalization: strips tool_choice when tools absent (vLLM 400 guard)", () => {
  // WebSearch-style auxiliary call: tool_choice:"auto" with NO tools array.
  // vLLM (Hosted_vllmException) rejects this: "When using tool_choice, tools must be set."
  const body = {
    model: "DeepSeek-V4-Flash-0731",
    messages: [{ role: "user", content: "search the web" }],
    tool_choice: "auto",
  } as Record<string, unknown>;

  const out = sanitizeRequestForResolvedTarget(body, baseOpts);

  assert.equal(
    Object.prototype.hasOwnProperty.call(out, "tool_choice"),
    false,
    "tool_choice must be removed when tools is absent"
  );
  assert.equal(
    Object.prototype.hasOwnProperty.call(out, "tools"),
    false,
    "tools key should not be introduced"
  );
});

test("tool_choice schema normalization: strips tool_choice when tools is empty array", () => {
  const body = {
    model: "DeepSeek-V4-Flash-0731",
    messages: [{ role: "user", content: "hi" }],
    tools: [],
    tool_choice: "auto",
  } as Record<string, unknown>;

  const out = sanitizeRequestForResolvedTarget(body, baseOpts);

  assert.equal(
    Object.prototype.hasOwnProperty.call(out, "tool_choice"),
    false,
    "tool_choice must be removed when tools is an empty array"
  );
  // empty tools array itself can stay — only tool_choice is the schema violation
});

test("tool_choice schema normalization: preserves tool_choice when tools present", () => {
  const body = {
    model: "DeepSeek-V4-Flash-0731",
    messages: [{ role: "user", content: "use a tool" }],
    tools: [{ type: "function", function: { name: "get_weather", parameters: {} } }],
    tool_choice: "auto",
  } as Record<string, unknown>;

  const out = sanitizeRequestForResolvedTarget(body, baseOpts);

  assert.equal(out.tool_choice, "auto", "tool_choice must be preserved when tools present");
  assert.equal(Array.isArray(out.tools), true, "tools array must be preserved");
  assert.equal((out.tools as unknown[]).length, 1);
});

test("tool_choice schema normalization: preserves object tool_choice with tools", () => {
  const body = {
    model: "DeepSeek-V4-Flash-0731",
    messages: [{ role: "user", content: "x" }],
    tools: [{ type: "function", function: { name: "fn", parameters: {} } }],
    tool_choice: { type: "function", function: { name: "fn" } },
  } as Record<string, unknown>;

  const out = sanitizeRequestForResolvedTarget(body, baseOpts);

  assert.ok(typeof out.tool_choice === "object", "object tool_choice preserved when tools present");
});

test("tool_choice schema normalization: no-op when tool_choice absent", () => {
  const body = {
    model: "DeepSeek-V4-Flash-0731",
    messages: [{ role: "user", content: "hi" }],
  } as Record<string, unknown>;

  const out = sanitizeRequestForResolvedTarget(body, baseOpts);

  assert.equal(
    Object.prototype.hasOwnProperty.call(out, "tool_choice"),
    false,
    "no tool_choice key introduced when absent"
  );
});

test("tool_choice schema normalization: no-op for null tool_choice without tools", () => {
  const body = {
    model: "DeepSeek-V4-Flash-0731",
    messages: [{ role: "user", content: "hi" }],
    tool_choice: null,
  } as Record<string, unknown>;

  const out = sanitizeRequestForResolvedTarget(body, baseOpts);

  // null tool_choice is falsy and carries no "use tools" intent; leave as-is
  // (the guard only strips a DEFINED, truthy tool_choice lacking a tools array)
  assert.equal(out.tool_choice, null);
});

test("tool_choice schema normalization: applies regardless of provider (global schema guard)", () => {
  // The guard is OpenAI-spec compliance, not provider-specific — it must fire
  // for any provider whose upstream enforces "tool_choice requires tools".
  for (const provider of ["skhynix", "openai", "nvidia", "deepseek"]) {
    const body = {
      model: "any-model",
      messages: [{ role: "user", content: "x" }],
      tool_choice: "required",
    } as Record<string, unknown>;

    const out = sanitizeRequestForResolvedTarget(body, { provider, model: "any-model" });

    assert.equal(
      Object.prototype.hasOwnProperty.call(out, "tool_choice"),
      false,
      `tool_choice must be stripped for provider=${provider} when tools absent`
    );
  }
});

test("tool_choice schema normalization: does not mutate caller body", () => {
  const body = {
    model: "DeepSeek-V4-Flash-0731",
    messages: [{ role: "user", content: "x" }],
    tool_choice: "auto",
  } as Record<string, unknown>;

  sanitizeRequestForResolvedTarget(body, baseOpts);

  // the function returns a fresh object and must not mutate the caller's body
  assert.equal(body.tool_choice, "auto", "caller body must not be mutated");
});
