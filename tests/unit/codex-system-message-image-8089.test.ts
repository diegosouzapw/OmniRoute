import test from "node:test";
import assert from "node:assert/strict";

import { sanitizeResponsesInputItems } from "../../open-sse/services/responsesInputSanitizer.ts";
import { CodexExecutor } from "../../open-sse/executors/codex.ts";

test("[repro #8089] mid-conversation system-role message with image_url must NOT become output_text", () => {
  const input = [
    {
      type: "message",
      role: "system",
      content: [
        { type: "text", text: "Reminder: verify the diff before committing." },
        { type: "image_url", image_url: { url: "https://example.com/diff-screenshot.png" } },
      ],
    },
  ];

  const sanitized = sanitizeResponsesInputItems(input, true, {}) as Array<{
    content: Array<{ type: string }>;
  }>;
  const imagePart = sanitized[0].content.find(
    (p) => p.type === "output_text" || p.type === "input_image"
  );

  assert.ok(imagePart);
  assert.equal(imagePart?.type, "input_image");
});

test("[repro #8089] developer-role message with image_url must NOT become output_text", () => {
  const input = [
    {
      type: "message",
      role: "developer",
      content: [{ type: "image_url", image_url: { url: "https://example.com/diff-screenshot.png" } }],
    },
  ];

  const sanitized = sanitizeResponsesInputItems(input, true, {}) as Array<{
    content: Array<{ type: string }>;
  }>;

  assert.equal(sanitized[0].content[0].type, "input_image");
});

test("assistant-role message with image_url still becomes output_text (unchanged behavior)", () => {
  const input = [
    {
      type: "message",
      role: "assistant",
      content: [{ type: "image_url", image_url: { url: "https://example.com/diff-screenshot.png" } }],
    },
  ];

  const sanitized = sanitizeResponsesInputItems(input, true, {}) as Array<{
    content: Array<{ type: string }>;
  }>;

  assert.equal(sanitized[0].content[0].type, "output_text");
});

test("Codex native passthrough: mid-conversation system message with image content never serializes output_text (#8089)", () => {
  const executor = new CodexExecutor();
  const body = {
    _nativeCodexPassthrough: true,
    input: [
      {
        type: "message",
        role: "system",
        content: [
          { type: "text", text: "Reminder: verify the diff before committing." },
          { type: "image_url", image_url: { url: "https://example.com/diff-screenshot.png" } },
        ],
      },
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "What do you see?" }],
      },
    ],
    stream: false,
  };

  const result = executor.transformRequest("gpt-5.6", body, false, {
    requestEndpointPath: "/responses",
  });

  assert.equal(JSON.stringify(result.input).includes('"type":"output_text"'), false);
});
