import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { transformToClaude } from "../../open-sse/executors/claude-web/payload.ts";

const b64 = (s: string) => Buffer.from(s, "utf8").toString("base64");

describe("Claude Web attachment forwarding (#14742)", () => {
  it("forwards a text file part as a claude.ai attachment", () => {
    const payload = transformToClaude(
      {
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Please review this file" },
              {
                type: "file",
                file: {
                  filename: "notes.txt",
                  file_data: `data:text/plain;base64,${b64("hello world")}`,
                },
              },
            ],
          },
        ],
      },
      "claude-sonnet-4-6"
    );
    assert.deepEqual(payload.attachments, [
      {
        file_name: "notes.txt",
        file_type: "text/plain",
        file_size: 11,
        extracted_content: "hello world",
      },
    ]);
  });

  it("forwards a text/* data URL carried in image_url", () => {
    const payload = transformToClaude(
      {
        messages: [
          {
            role: "user",
            content: [{ type: "image_url", image_url: { url: "data:text/markdown,%23%20hi" } }],
          },
        ],
      },
      "claude-sonnet-4-6",
      {
        ...{
          operation: "completion",
          prompt: "p",
          timezone: "UTC",
          locale: "en-US",
          assistantMessageUuid: "a",
          isNewConversation: true,
        },
      } as never
    );
    assert.equal(payload.attachments.length, 1);
    assert.equal(
      (payload.attachments[0] as { extracted_content: string }).extracted_content,
      "# hi"
    );
  });

  it("keeps empty arrays for plain-text and binary-image turns", () => {
    const plain = transformToClaude(
      { messages: [{ role: "user", content: "hi" }] },
      "claude-sonnet-4-6"
    );
    assert.deepEqual(plain.attachments, []);
    assert.deepEqual(plain.files, []);
    const img = transformToClaude(
      {
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "see" },
              { type: "image_url", image_url: { url: "data:image/png;base64,iVBORw0KGgo=" } },
            ],
          },
        ],
      },
      "claude-sonnet-4-6"
    );
    assert.deepEqual(img.attachments, []);
  });
});
