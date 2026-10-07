import test from "node:test";
import assert from "node:assert/strict";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";

test("#13948: mid-array system message keeps its chronological position after claude->openai translation for a strict provider", () => {
  const body = {
    model: "mimo-v2.5",
    system: [{ type: "text", text: "You are a coding assistant." }],
    messages: [
      { role: "user", content: "hi" },
      { role: "system", content: "deferred tools list" },
      { role: "user", content: "go" },
    ],
  };

  const result = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    "mimo-v2.5",
    body,
    false,
    null,
    "xiaomi-mimo"
  );

  const outMessages = result.messages as Array<{ role: string; content: string }>;
  const offender = outMessages.find((m) => m.content === "deferred tools list");
  assert.ok(offender, "the mid-array system instruction must not be dropped");

  const hiIndex = outMessages.findIndex((m) => m.content === "hi");
  const offenderIndex = outMessages.findIndex((m) => m.content === "deferred tools list");
  const goIndex = outMessages.findIndex((m) => m.content === "go");

  assert.ok(
    hiIndex < offenderIndex,
    `"hi" (index ${hiIndex}) must come before the deferred instruction (index ${offenderIndex})`
  );
  assert.ok(offenderIndex < goIndex, 'the deferred instruction must still precede "go"');
});
