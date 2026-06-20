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

test("sanitizeReasoningEffortForProvider: github/claude-opus-4.6 preserves reasoning_effort (#791)", () => {
  // Upstream PR decolua/9router#791 (port): Copilot now honors reasoning_effort
  // on Claude Opus 4.6 and Sonnet 4.6. Older Opus variants and Haiku still strip.
  const body = {
    model: "claude-opus-4-6",
    reasoning_effort: "high",
    messages: [],
  };
  const result = sanitizeReasoningEffortForProvider(body, "github", "claude-opus-4-6", null);
  assert.equal((result as any).reasoning_effort, "high");
});

test("sanitizeReasoningEffortForProvider: github/claude-opus-4.7 still strips (#791)", () => {
  const body = {
    model: "claude-opus-4.7",
    reasoning_effort: "high",
    messages: [],
  };
  const result = sanitizeReasoningEffortForProvider(body, "github", "claude-opus-4.7", null);
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

  // Pre-#791: github stripped reasoning_effort entirely for every Claude model.
  // Post-#791: Opus 4.6 keeps reasoning_effort; `max` downgrades to `high`
  // because github is not Claude/CC-compatible (so supportsMax=false) and
  // the canonical Claude Opus 4.6 model opts out of xhigh.
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
  assert.equal((githubResult as any).reasoning_effort, "high");

  // Pre-#791 strip is preserved for github Claude models that DO NOT opt in
  // (Haiku 4.5, Opus 4.7, older Sonnet, etc.).
  const githubHaiku = {
    model: "claude-haiku-4.5",
    reasoning_effort: "max",
    messages: [],
  };
  const githubHaikuResult = sanitizeReasoningEffortForProvider(
    githubHaiku,
    "github",
    "claude-haiku-4.5",
    null
  );
  assert.equal((githubHaikuResult as any).reasoning_effort, undefined);
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

// ── Native DeepSeek (api.deepseek.com) ───────────────────────────────────────
// DeepSeek V4 thinking mode accepts reasoning_effort ONLY as {high, max}. The
// internal OmniRoute scale (low|medium|high|xhigh, xhigh = top) must be mapped
// onto DeepSeek's native vocabulary so the client's requested effort is honored
// instead of silently dropped to the default. This is the INVERSE of the
// OpenRouter-DeepSeek path, whose normalized API expects xhigh, not max.

test("sanitizeReasoningEffortForProvider: native deepseek maps xhigh → max", () => {
  const log = makeLog();
  const body = {
    model: "deepseek-v4-pro",
    reasoning_effort: "xhigh",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(body, "deepseek", "deepseek-v4-pro", log);
  assert.notEqual(result, body, "must return a new object when mutating");
  assert.equal((result as any).reasoning_effort, "max");
  assert.equal((result as any).model, "deepseek-v4-pro", "other fields preserved");
  assert.ok(
    log.messages.some(([tag, m]) => tag === "REASONING_SANITIZE" && /xhigh → max/.test(m)),
    "logs the xhigh → max mapping"
  );
});

test("sanitizeReasoningEffortForProvider: native deepseek preserves max", () => {
  const log = makeLog();
  const body = {
    model: "deepseek-v4-flash",
    reasoning_effort: "max",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(body, "deepseek", "deepseek-v4-flash", log);
  assert.equal(result, body, "max is DeepSeek's native top tier — passes through unchanged");
  assert.equal((result as any).reasoning_effort, "max");
  assert.equal(log.messages.length, 0);
});

test("sanitizeReasoningEffortForProvider: native deepseek clamps low → high", () => {
  const body = {
    model: "deepseek-v4-pro",
    reasoning_effort: "low",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(body, "deepseek", "deepseek-v4-pro", null);
  assert.notEqual(result, body, "must return a new object when mutating");
  assert.equal((result as any).reasoning_effort, "high", "below the {high, max} floor → high");
});

test("sanitizeReasoningEffortForProvider: native deepseek clamps medium → high", () => {
  const body = {
    model: "deepseek-v4-pro",
    reasoning_effort: "medium",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(body, "deepseek", "deepseek-v4-pro", null);
  assert.equal((result as any).reasoning_effort, "high");
});

test("sanitizeReasoningEffortForProvider: native deepseek preserves high unchanged", () => {
  const body = {
    model: "deepseek-v4-pro",
    reasoning_effort: "high",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(body, "deepseek", "deepseek-v4-pro", null);
  assert.equal(result, body, "high is already valid — passes through unchanged");
  assert.equal((result as any).reasoning_effort, "high");
});

test("sanitizeReasoningEffortForProvider: native deepseek maps nested reasoning.effort xhigh → max", () => {
  const body = {
    model: "deepseek-v4-pro",
    reasoning: { effort: "xhigh", summary: "auto" },
    input: [],
  };
  const result = sanitizeReasoningEffortForProvider(body, "deepseek", "deepseek-v4-pro", null);
  assert.equal((result as any).reasoning.effort, "max");
  assert.equal((result as any).reasoning.summary, "auto", "other reasoning fields preserved");
  assert.equal((result as any).reasoning_effort, undefined);
});

test("sanitizeReasoningEffortForProvider: OpenRouter DeepSeek still preserves xhigh (not native)", () => {
  // Regression guard: the native-deepseek mapping must NOT touch openrouter,
  // whose normalized API expects xhigh (issue earendil-works/pi#4055).
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
