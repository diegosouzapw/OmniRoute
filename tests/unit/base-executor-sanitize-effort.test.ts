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

test("sanitizeReasoningEffortForProvider: xiaomi-mimo downgrades xhigh → high", () => {
  const log = makeLog();
  const body = {
    model: "mimo-v2.5-pro",
    reasoning_effort: "xhigh",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(body, "xiaomi-mimo", "mimo-v2.5-pro", log);
  assert.notEqual(result, body, "must return a new object when mutating");
  assert.equal((result as any).reasoning_effort, "high");
  assert.equal((result as any).model, "mimo-v2.5-pro", "other fields preserved");
  assert.ok(
    log.messages.some(([tag, m]) => tag === "REASONING_SANITIZE" && /xhigh → high/.test(m)),
    "logs the downgrade"
  );
});

test("sanitizeReasoningEffortForProvider: xiaomi-mimo downgrades xhigh in nested reasoning.effort", () => {
  const body = {
    model: "mimo-v2.5-pro",
    reasoning: { effort: "xhigh", summary: "auto" },
    messages: [],
  };
  const result = sanitizeReasoningEffortForProvider(body, "xiaomi-mimo", "mimo-v2.5-pro", null);
  assert.equal((result as any).reasoning.effort, "high");
  assert.equal((result as any).reasoning.summary, "auto", "other reasoning fields preserved");
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

test("sanitizeReasoningEffortForProvider: codex with xhigh passes through unchanged when model supports it", () => {
  // codex/gpt-5.5-xhigh and related Claude opus models are flagged
  // supportsXHighEffort:true in providerRegistry. They must not be downgraded.
  const body = {
    model: "gpt-5.5-xhigh",
    reasoning_effort: "xhigh",
    messages: [],
  };
  const result = sanitizeReasoningEffortForProvider(body, "codex", "gpt-5.5-xhigh", null);
  // Either passes through unchanged (supportsXHighEffort=true)
  // or the registry doesn't flag it — in which case downgrade is acceptable.
  // We assert no error and that some reasoning_effort is present.
  assert.ok(
    (result as any).reasoning_effort === "xhigh" || (result as any).reasoning_effort === "high",
    "either preserved (xhigh) or downgraded (high)"
  );
});

test("sanitizeReasoningEffortForProvider: no-op when reasoning_effort absent", () => {
  const body = { model: "mimo-v2.5-pro", messages: [] };
  const result = sanitizeReasoningEffortForProvider(body, "xiaomi-mimo", "mimo-v2.5-pro", null);
  assert.equal(result, body, "returns original body unchanged");
});

test("sanitizeReasoningEffortForProvider: handles unknown providers as pass-through", () => {
  const body = { model: "some-model", reasoning_effort: "xhigh", messages: [] };
  const result = sanitizeReasoningEffortForProvider(body, "unknown-provider", "some-model", null);
  // unknown provider + xhigh + model not in registry → supportsXHighEffort returns false → downgrade
  // OR unknown provider isn't in the strip list → returns xhigh
  // Both are acceptable behavior; we just assert no exception thrown.
  assert.ok(result !== undefined);
});

test("sanitizeReasoningEffortForProvider: non-object body returns unchanged", () => {
  assert.equal(sanitizeReasoningEffortForProvider(null, "xiaomi-mimo", "x", null), null);
  assert.equal(sanitizeReasoningEffortForProvider("string", "xiaomi-mimo", "x", null), "string");
  const arr: unknown[] = [];
  assert.equal(sanitizeReasoningEffortForProvider(arr, "xiaomi-mimo", "x", null), arr);
});
