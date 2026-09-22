/**
 * #14111 — Responses tool outputs (`function_call_output`, `custom_tool_call_output`)
 * can carry `input_image` parts. Chat Completions `tool` messages are text-only, so
 * the translator keeps the placeholder text in the tool message (#8459) and lifts
 * each image into a following multimodal `user` message with `image_url` content —
 * that is how the image reaches a vision-capable downstream model.
 *
 * Text-only outputs and non-content-part shapes keep their previous behavior.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { openaiResponsesToOpenAIRequest } =
  await import("../../open-sse/translator/request/openai-responses.ts");

const IMAGE_PLACEHOLDER = "[Image omitted: not supported on Chat Completions tool results]";
const IMAGE_A = `data:image/png;base64,${"A".repeat(64)}`;
const IMAGE_B = `data:image/png;base64,${"B".repeat(64)}`;

function translate(input: unknown[]): Record<string, unknown>[] {
  const result = openaiResponsesToOpenAIRequest("gpt-5.2", { input }, false, {}) as Record<
    string,
    unknown
  >;
  return result.messages as Record<string, unknown>[];
}

test("#14111 function_call_output images lift into a following multimodal user message", () => {
  const messages = translate([
    { type: "function_call", call_id: "call_img1", name: "view_image", arguments: "{}" },
    {
      type: "function_call_output",
      call_id: "call_img1",
      output: [
        { type: "input_text", text: "Image loaded" },
        { type: "input_image", image_url: IMAGE_A, detail: "original" },
      ],
    },
  ]);

  const toolIdx = messages.findIndex((m) => m.role === "tool");
  assert.ok(toolIdx >= 0, "tool message must exist");
  const toolMsg = messages[toolIdx];
  assert.equal(typeof toolMsg.content, "string");
  assert.ok((toolMsg.content as string).includes("Image loaded"), "text parts preserved");
  assert.ok((toolMsg.content as string).includes(IMAGE_PLACEHOLDER), "placeholder kept");
  assert.doesNotMatch(toolMsg.content as string, /base64|AAAA/, "raw base64 never in tool text");

  const imageMsg = messages[toolIdx + 1];
  assert.equal(imageMsg.role, "user", "images must ride a following user message");
  assert.deepEqual(imageMsg.content, [
    { type: "image_url", image_url: { url: IMAGE_A, detail: "original" } },
  ]);
});

test("#14111 multiple images in one output stay ordered in a single user message", () => {
  const messages = translate([
    { type: "function_call", call_id: "call_img2", name: "view_image", arguments: "{}" },
    {
      type: "function_call_output",
      call_id: "call_img2",
      output: [
        { type: "input_image", image_url: IMAGE_A },
        { type: "input_text", text: "two shots" },
        { type: "input_image", image_url: IMAGE_B, detail: "high" },
      ],
    },
  ]);

  const toolIdx = messages.findIndex((m) => m.role === "tool");
  const imageMsg = messages[toolIdx + 1];
  assert.equal(imageMsg.role, "user");
  assert.deepEqual(imageMsg.content, [
    { type: "image_url", image_url: { url: IMAGE_A } },
    { type: "image_url", image_url: { url: IMAGE_B, detail: "high" } },
  ]);
});

test("#14111 custom_tool_call_output images lift the same way", () => {
  const messages = translate([
    { type: "custom_tool_call", call_id: "call_img3", name: "screenshot", input: "{}" },
    {
      type: "custom_tool_call_output",
      call_id: "call_img3",
      output: [
        { type: "input_text", text: "shot taken" },
        { type: "input_image", image_url: IMAGE_A },
      ],
    },
  ]);

  const toolIdx = messages.findIndex((m) => m.role === "tool");
  assert.ok(toolIdx >= 0, "tool message must exist");
  assert.ok((messages[toolIdx].content as string).includes("shot taken"));
  const imageMsg = messages[toolIdx + 1];
  assert.equal(imageMsg.role, "user");
  assert.deepEqual(imageMsg.content, [{ type: "image_url", image_url: { url: IMAGE_A } }]);
});

test("#14111 text-only outputs gain no user message and later items keep their position", () => {
  const messages = translate([
    { type: "function_call", call_id: "call_img4", name: "bash", arguments: "{}" },
    { type: "function_call_output", call_id: "call_img4", output: "no images here" },
    { type: "message", role: "user", content: [{ type: "input_text", text: "continue" }] },
  ]);

  assert.equal(
    messages.filter((m) => m.role === "user").length,
    1,
    "text-only output must not add a user message"
  );
  const last = messages[messages.length - 1];
  assert.equal(last.role, "user");
  assert.deepEqual(last.content, [{ type: "text", text: "continue" }]);
});
