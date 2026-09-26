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

// Command Code rejects the OpenAI no-thinking carrier outright:
//   Validation error: Invalid option: expected one of
//   "low"|"medium"|"high"|"xhigh"|"max" at "params.reasoning_effort"
// A `force` + `none` reasoning-routing rule now emits `reasoning_effort: "none"`
// (src/lib/reasoningRouting/policy.ts) so providers whose thinking defaults ON
// actually stop thinking, so Command Code must clamp it to its floor (`low`)
// instead of burning a combo fallback attempt on a guaranteed 400.
test("command-code clamps the OpenAI no-thinking carrier none to low", () => {
  const log = makeLog();
  const body = {
    model: "deepseek/deepseek-v4-flash",
    reasoning_effort: "none",
    messages: [{ role: "user", content: "hi" }],
  };
  const result = sanitizeReasoningEffortForProvider(
    body,
    "command-code",
    "deepseek/deepseek-v4-flash",
    log
  ) as Record<string, unknown>;

  assert.notEqual(result, body, "must return a new object when clamping");
  assert.equal(result.reasoning_effort, "low");
  assert.equal(result.model, "deepseek/deepseek-v4-flash", "other fields preserved");
  assert.ok(
    log.messages.some(([tag, msg]) => tag === "REASONING_SANITIZE" && /none → low/.test(msg)),
    "clamp must be logged"
  );
});

test("command-code still clamps minimal to low", () => {
  const body = { model: "deepseek/deepseek-v4-flash", reasoning_effort: "minimal" };
  const result = sanitizeReasoningEffortForProvider(
    body,
    "command-code",
    "deepseek/deepseek-v4-flash",
    null
  ) as Record<string, unknown>;

  assert.equal(result.reasoning_effort, "low");
});

test("only Command Code is clamped: native deepseek keeps none", () => {
  const body = { model: "deepseek-flash", reasoning_effort: "none" };
  const result = sanitizeReasoningEffortForProvider(body, "deepseek", "deepseek-flash", null);

  assert.equal(result, body, "none is already the OpenAI no-thinking carrier for deepseek");
  assert.equal((result as Record<string, unknown>).reasoning_effort, "none");
});
