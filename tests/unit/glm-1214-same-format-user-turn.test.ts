import test from "node:test";
import assert from "node:assert/strict";

// Dynamic import is the established convention in this suite (loader stack +
// polyfills; see 9303-recovery-hint-all-targets-skipped.test.ts).
const { translateRequest } = await import("../../open-sse/translator/index.ts");

test("#1214: GLM-family upstream gets a synthetic user turn on the same-format lane", () => {
  const body = {
    model: "glm-5.3-flash",
    messages: [
      { role: "system", content: "You are helpful." },
      { role: "assistant", content: "Calling tool", tool_calls: [{ id: "t1", type: "function", function: { name: "f", arguments: "{}" } }] },
      { role: "tool", tool_call_id: "t1", content: "result" },
    ],
  };
  const out = translateRequest("openai", "openai", "opencode-go/glm-5.3-flash", structuredClone(body), false, null, "opencode-go");
  const last = out.messages[out.messages.length - 1];
  assert.equal(last.role, "user", "synthetic user turn must be appended");
  assert.equal(last.content, "(continue)");
  assert.equal(out.messages.length, body.messages.length + 1);
});

test("#1214: non-GLM upstream does not get a synthetic user turn", () => {
  const body = {
    model: "gpt-4o",
    messages: [
      { role: "assistant", content: "hi" },
    ],
  };
  const out = translateRequest("openai", "openai", "gpt-4o", structuredClone(body), false, null, "openai");
  assert.equal(out.messages.length, 1, "no user turn appended for non-GLM family");
});

test("#1214: GLM request that already has a user turn is unchanged", () => {
  const body = {
    model: "glm-5.3-flash",
    messages: [
      { role: "user", content: "hello" },
      { role: "assistant", content: "hi" },
    ],
  };
  const out = translateRequest("openai", "openai", "glm-5.3-flash", structuredClone(body), false, null, "opencode-go");
  assert.equal(out.messages.length, body.messages.length);
});
