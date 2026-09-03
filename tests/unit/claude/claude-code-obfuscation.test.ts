import test from "node:test";
import assert from "node:assert/strict";

const { obfuscateInBody } = await import("../../../open-sse/services/claudeCodeObfuscation.ts");

test("obfuscateInBody preserves a turn that carries signed thinking", () => {
  const body = {
    messages: [
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "private", signature: "signed-by-anthropic" },
          { type: "text", text: "I used opencode to inspect it." },
        ],
      },
    ],
  };

  obfuscateInBody(body);
  assert.equal((body.messages[0].content[1] as { text: string }).text, "I used opencode to inspect it.");
});

test("obfuscateInBody still obfuscates an unsigned normal text turn", () => {
  const body = {
    messages: [{ role: "assistant", content: [{ type: "text", text: "I used opencode." }] }],
  };

  obfuscateInBody(body);
  assert.notEqual((body.messages[0].content[0] as { text: string }).text, "I used opencode.");
});
