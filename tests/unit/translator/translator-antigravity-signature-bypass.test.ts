import test from "node:test";
import assert from "node:assert/strict";

const { openaiToAntigravityRequest } =
  await import("../../../open-sse/translator/request/openai-to-gemini.ts");

const body = {
  messages: [
    { role: "user", content: "Use the terminal tool to echo hi." },
    {
      role: "assistant",
      tool_calls: [
        {
          id: "call_1",
          type: "function",
          function: { name: "terminal", arguments: JSON.stringify({ command: "echo hi" }) },
        },
      ],
    },
    { role: "tool", tool_call_id: "call_1", name: "terminal", content: "hi" },
  ],
  tools: [
    {
      type: "function",
      function: {
        name: "terminal",
        description: "Run a shell command",
        parameters: { type: "object", properties: { command: { type: "string" } } },
      },
    },
  ],
};

function modelParts(model: string, b: unknown) {
  const envelope = openaiToAntigravityRequest(model, b, true) as {
    request: { contents: Array<{ role: string; parts: Array<Record<string, unknown>> }> };
  };
  const modelMsg = envelope.request.contents.find((c) => c.role === "model");
  assert.ok(modelMsg, "expected an assistant (model-role) message in the translation");
  return modelMsg.parts;
}

test("antigravity multi-turn tool call carries the signature bypass sentinel by default", () => {
  const parts = modelParts("gemini-3.1-pro-low", body);
  const fc = parts.find((p) => p.functionCall);
  assert.ok(fc, "expected a functionCall part");
  assert.equal(fc.thoughtSignature, "skip_thought_signature_validator");
});

test("ANTIGRAVITY_ALLOW_SIGNATURE_BYPASS=0 disables the sentinel", () => {
  const prev = process.env.ANTIGRAVITY_ALLOW_SIGNATURE_BYPASS;
  process.env.ANTIGRAVITY_ALLOW_SIGNATURE_BYPASS = "0";
  try {
    const parts = modelParts("gemini-3.1-pro-low", body);
    const fc = parts.find((p) => p.functionCall);
    assert.ok(fc, "expected a functionCall part");
    assert.equal(fc.thoughtSignature, undefined);
  } finally {
    if (prev === undefined) delete process.env.ANTIGRAVITY_ALLOW_SIGNATURE_BYPASS;
    else process.env.ANTIGRAVITY_ALLOW_SIGNATURE_BYPASS = prev;
  }
});
