import test from "node:test";
import assert from "node:assert/strict";

// Regression for port-from-9router#1330: AI SDK-style image content parts shaped as
// `{ type: "image", image: "data:image/png;base64,..." }` (a STRING, not an object
// with `.url`/`.source`) were dropped by the OpenAI-input translators, so any client
// sending images this way (e.g. OpenCode) lost them before reaching a vision provider.
const gemini = await import("../../open-sse/translator/helpers/geminiHelper.ts");
const claude = await import("../../open-sse/translator/request/openai-to-claude.ts");
const kiro = await import("../../open-sse/translator/request/openai-to-kiro.ts");

const DATA_URL = "data:image/png;base64,AAAABBBB";

test("#1330: Gemini maps AI SDK image string to inlineData", () => {
  const parts = gemini.convertOpenAIContentToParts([
    { type: "text", text: "describe" },
    { type: "image", image: DATA_URL },
  ]);
  const inline = parts.find((p) => (p as { inlineData?: unknown }).inlineData);
  assert.ok(inline, "expected an inlineData part");
  assert.deepEqual((inline as { inlineData: unknown }).inlineData, {
    mimeType: "image/png",
    data: "AAAABBBB",
  });
});

test("#1330: Claude maps AI SDK image string to a base64 image source block", () => {
  const out = claude.openaiToClaudeRequest(
    "claude-sonnet-4-6",
    {
      messages: [
        { role: "user", content: [{ type: "image", image: DATA_URL }] },
      ],
    },
    false
  ) as { messages: { content: { type: string; source?: Record<string, unknown> }[] }[] };

  const block = out.messages[0].content.find((b) => b.type === "image");
  assert.ok(block, "expected an image block");
  assert.deepEqual(block!.source, {
    type: "base64",
    media_type: "image/png",
    data: "AAAABBBB",
  });
});

test("#1330: Kiro maps AI SDK image string to userInputMessage.images bytes", () => {
  const payload = kiro.buildKiroPayload(
    "kr/claude-sonnet-4.6",
    {
      messages: [
        { role: "user", content: [{ type: "text", text: "describe" }, { type: "image", image: DATA_URL }] },
      ],
    },
    false,
    {}
  );
  const serialized = JSON.stringify(payload);
  assert.ok(serialized.includes('"AAAABBBB"'), "expected the image bytes in the Kiro payload");
  assert.ok(serialized.includes('"png"'), "expected the png format in the Kiro payload");
});
