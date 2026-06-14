import test from "node:test";
import assert from "node:assert/strict";

const { sanitizeReasoningEffortForProvider } = await import("../../open-sse/executors/base.ts");

function makeLog() {
  const messages: Array<[string, string]> = [];
  return {
    info: (tag: string, msg: string) => messages.push([tag, msg]),
    messages,
  };
}

test("sanitizeReasoningEffortForProvider: xiaomi-mimo preserves xhigh by default", () => {
  const log = makeLog();
  const body = {
    model: "mimo-v2.5-pro",
    reasoning_effort: "xhigh",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(body, "xiaomi-mimo", "mimo-v2.5-pro", log);
  assert.equal(result, body, "xhigh passes through unless the model explicitly opts out");
  assert.equal((result as any).reasoning_effort, "xhigh");
  assert.equal((result as any).model, "mimo-v2.5-pro", "other fields preserved");
  assert.equal(log.messages.length, 0);
});

test("sanitizeReasoningEffortForProvider: OpenRouter DeepSeek preserves xhigh", () => {
  const body = {
    model: "deepseek/deepseek-v4-pro",
    reasoning_effort: "xhigh",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(
    body,
    "openrouter",
    "deepseek/deepseek-v4-pro",
    null
  );
  assert.equal(result, body);
  assert.equal((result as any).reasoning_effort, "xhigh");
});

test("sanitizeReasoningEffortForProvider: explicit xhigh opt-out downgrades to high", () => {
  const log = makeLog();
  const body = {
    model: "claude-opus-4-6",
    reasoning_effort: "xhigh",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(body, "claude", "claude-opus-4-6", log);
  assert.notEqual(result, body, "must return a new object when mutating");
  assert.equal((result as any).reasoning_effort, "high");
  assert.ok(
    log.messages.some(([tag, m]) => tag === "REASONING_SANITIZE" && /xhigh → high/.test(m)),
    "logs the downgrade"
  );
});

test("sanitizeReasoningEffortForProvider: Anthropic-compatible dynamic provider honors xhigh opt-out", () => {
  const body = {
    model: "claude-opus-4-6",
    reasoning_effort: "xhigh",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(
    body,
    "anthropic-compatible-test",
    "claude-opus-4-6",
    null
  );
  assert.notEqual(result, body, "must return a new object when mutating");
  assert.equal((result as any).reasoning_effort, "high");
});

test("sanitizeReasoningEffortForProvider: xiaomi-mimo normalizes max → xhigh by default", () => {
  const log = makeLog();
  const body = {
    model: "mimo-v2.5-pro",
    reasoning_effort: "max",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(body, "xiaomi-mimo", "mimo-v2.5-pro", log);
  assert.equal((result as any).reasoning_effort, "xhigh");
  assert.ok(
    log.messages.some(([tag, m]) => tag === "REASONING_SANITIZE" && /max → xhigh/.test(m)),
    "logs the normalization"
  );
});

test("sanitizeReasoningEffortForProvider: OpenRouter DeepSeek normalizes max → xhigh", () => {
  const log = makeLog();
  const body = {
    model: "deepseek/deepseek-v4-pro",
    reasoning_effort: "max",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(
    body,
    "openrouter",
    "deepseek/deepseek-v4-pro",
    log
  );
  assert.notEqual(result, body, "must return a new object when mutating");
  assert.equal((result as any).reasoning_effort, "xhigh");
  assert.ok(
    log.messages.some(([tag, m]) => tag === "REASONING_SANITIZE" && /max → xhigh/.test(m)),
    "logs the normalization"
  );
});

test("sanitizeReasoningEffortForProvider: OpenRouter Claude opt-out aliases downgrade max → high", () => {
  const log = makeLog();
  const body = {
    model: "anthropic/claude-opus-4.6",
    reasoning_effort: "max",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(
    body,
    "openrouter",
    "anthropic/claude-opus-4.6",
    log
  );
  assert.notEqual(result, body, "must return a new object when mutating");
  assert.equal((result as any).reasoning_effort, "high");
  assert.ok(
    log.messages.some(([tag, m]) => tag === "REASONING_SANITIZE" && /max → high/.test(m)),
    "logs the downgrade"
  );
});

test("sanitizeReasoningEffortForProvider: OpenAI-compatible Gemini normalizes max → xhigh", () => {
  const log = makeLog();
  const body = {
    model: "gemini-3.1-pro-preview",
    reasoning_effort: "max",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(
    body,
    "openai-compatible-free1",
    "gemini-3.1-pro-preview",
    log
  );
  assert.notEqual(result, body, "must return a new object when mutating");
  assert.equal((result as any).reasoning_effort, "xhigh");
  assert.ok(
    log.messages.some(([tag, m]) => tag === "REASONING_SANITIZE" && /max → xhigh/.test(m)),
    "logs the normalization"
  );
});

test("sanitizeReasoningEffortForProvider: nested OpenAI reasoning max normalizes to xhigh", () => {
  const body = {
    model: "gemini-3.1-pro-preview",
    reasoning: { effort: "max", summary: "auto" },
    input: [],
  };
  const result = sanitizeReasoningEffortForProvider(
    body,
    "openai-compatible-free1",
    "gemini-3.1-pro-preview",
    null
  );
  assert.equal((result as any).reasoning.effort, "xhigh");
  assert.equal((result as any).reasoning.summary, "auto", "other reasoning fields preserved");
  assert.equal((result as any).reasoning_effort, undefined);
});

test("sanitizeReasoningEffortForProvider: claude preserves max for Opus/Sonnet and downgrades Haiku", () => {
  const sonnetBody = {
    model: "claude-sonnet-4-6",
    reasoning_effort: "max",
    messages: [{ role: "user", content: "hi" }],
  };
  const sonnetResult = sanitizeReasoningEffortForProvider(
    sonnetBody,
    "claude",
    "claude-sonnet-4-6",
    null
  );
  assert.equal(sonnetResult, sonnetBody);
  assert.equal((sonnetResult as any).reasoning_effort, "max");

  const opusBody = {
    model: "claude-opus-4-6",
    reasoning: { effort: "max", summary: "auto" },
    input: [],
  };
  const opusResult = sanitizeReasoningEffortForProvider(
    opusBody,
    "anthropic-compatible-cc-test",
    "claude-opus-4-6",
    null
  );
  assert.equal(opusResult, opusBody);
  assert.equal((opusResult as any).reasoning.effort, "max");

  const haikuBody = {
    model: "claude-haiku-4-5-20251001",
    reasoning_effort: "max",
    messages: [{ role: "user", content: "hi" }],
  };
  const haikuResult = sanitizeReasoningEffortForProvider(
    haikuBody,
    "claude",
    "claude-haiku-4-5-20251001",
    null
  );
  assert.notEqual(haikuResult, haikuBody);
  assert.equal((haikuResult as any).reasoning_effort, "high");
});

test("sanitizeReasoningEffortForProvider: xiaomi-mimo preserves nested xhigh by default", () => {
  const body = {
    model: "mimo-v2.5-pro",
    reasoning: { effort: "xhigh", summary: "auto" },
    messages: [],
  };
  const result = sanitizeReasoningEffortForProvider(body, "xiaomi-mimo", "mimo-v2.5-pro", null);
  assert.equal(result, body);
  assert.equal((result as any).reasoning.effort, "xhigh");
  assert.equal((result as any).reasoning.summary, "auto", "other reasoning fields preserved");
});

test("sanitizeReasoningEffortForProvider: explicit xhigh opt-out preserves Responses shape", () => {
  const body = {
    model: "claude-opus-4-6",
    reasoning: { effort: "xhigh", summary: "auto" },
    input: [],
  };
  const result = sanitizeReasoningEffortForProvider(body, "claude", "claude-opus-4-6", null);
  assert.equal((result as any).reasoning.effort, "high");
  assert.equal((result as any).reasoning_effort, undefined);
});

test("sanitizeReasoningEffortForProvider: mistral/devstral strips reasoning_effort entirely", () => {
  const log = makeLog();
  const body = {
    model: "devstral-2512",
    reasoning_effort: "medium",
    messages: [],
  };
  const result = sanitizeReasoningEffortForProvider(body, "mistral", "devstral-2512", log);
  assert.equal((result as any).reasoning_effort, undefined, "reasoning_effort must be stripped");
  assert.ok(
    log.messages.some(([tag, m]) => tag === "REASONING_SANITIZE" && /removed/.test(m)),
    "logs the removal"
  );
});

test("sanitizeReasoningEffortForProvider: github/claude-opus strips reasoning_effort entirely", () => {
  const body = {
    model: "claude-opus-4-6",
    reasoning_effort: "high",
    messages: [],
  };
  const result = sanitizeReasoningEffortForProvider(body, "github", "claude-opus-4-6", null);
  assert.equal((result as any).reasoning_effort, undefined);
});

test("sanitizeReasoningEffortForProvider: rejecting providers strip max before normalization", () => {
  const mistralBody = {
    model: "devstral-2512",
    reasoning_effort: "max",
    messages: [],
  };
  const mistralResult = sanitizeReasoningEffortForProvider(
    mistralBody,
    "mistral",
    "devstral-2512",
    null
  );
  assert.equal((mistralResult as any).reasoning_effort, undefined);

  const githubBody = {
    model: "claude-opus-4-6",
    reasoning_effort: "max",
    messages: [],
  };
  const githubResult = sanitizeReasoningEffortForProvider(
    githubBody,
    "github",
    "claude-opus-4-6",
    null
  );
  assert.equal((githubResult as any).reasoning_effort, undefined);
});

test("sanitizeReasoningEffortForProvider: mistral/devstral strips reasoning object when only effort present", () => {
  const body = {
    model: "devstral-2512",
    reasoning: { effort: "medium" },
    messages: [],
  };
  const result = sanitizeReasoningEffortForProvider(body, "mistral", "devstral-2512", null);
  assert.equal((result as any).reasoning, undefined, "reasoning object dropped when emptied");
});

test("sanitizeReasoningEffortForProvider: mistral/devstral preserves reasoning when other fields remain", () => {
  const body = {
    model: "devstral-2512",
    reasoning: { effort: "medium", summary: "auto" },
    messages: [],
  };
  const result = sanitizeReasoningEffortForProvider(body, "mistral", "devstral-2512", null);
  assert.deepEqual((result as any).reasoning, { summary: "auto" });
});

test("sanitizeReasoningEffortForProvider: codex with xhigh passes through unchanged", () => {
  const body = {
    model: "gpt-5.5-xhigh",
    reasoning_effort: "xhigh",
    messages: [],
  };
  const result = sanitizeReasoningEffortForProvider(body, "codex", "gpt-5.5-xhigh", null);
  assert.equal((result as any).reasoning_effort, "xhigh");
});

test("sanitizeReasoningEffortForProvider: no-op when reasoning_effort absent", () => {
  const body = { model: "mimo-v2.5-pro", messages: [] };
  const result = sanitizeReasoningEffortForProvider(body, "xiaomi-mimo", "mimo-v2.5-pro", null);
  assert.equal(result, body, "returns original body unchanged");
});

test("sanitizeReasoningEffortForProvider: handles unknown providers as pass-through", () => {
  const body = { model: "some-model", reasoning_effort: "xhigh", messages: [] };
  const result = sanitizeReasoningEffortForProvider(body, "unknown-provider", "some-model", null);
  assert.equal(result, body);
  assert.equal((result as any).reasoning_effort, "xhigh");
});

test("sanitizeReasoningEffortForProvider: non-object body returns unchanged", () => {
  assert.equal(sanitizeReasoningEffortForProvider(null, "xiaomi-mimo", "x", null), null);
  assert.equal(sanitizeReasoningEffortForProvider("string", "xiaomi-mimo", "x", null), "string");
  const arr: unknown[] = [];
  assert.equal(sanitizeReasoningEffortForProvider(arr, "xiaomi-mimo", "x", null), arr);
});
