import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeBase64Sources } from "../../open-sse/utils/base64SourceSanitize.ts";

// Strict upstreams (e.g. Python pybase64 with validate=True behind Anthropic-shape
// providers) 500 with "Non-base64 digit found" when an image/document payload is
// not strictly base64. Two real-world shapes trigger it:
//   1. a data-URL prefix left in `source.data` ("data:image/png;base64,....")
//   2. line-wrapped base64 (whitespace/newlines inside the payload)
// sanitizeBase64Sources normalizes both in place before the body is forwarded.

const PNG =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

function imageMessage(data: string) {
  return {
    messages: [
      {
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: "image/png", data } },
          { type: "text", text: "What is this?" },
        ],
      },
    ],
  };
}

test("strips a data-URL prefix left in image source.data", () => {
  const body = imageMessage(`data:image/png;base64,${PNG}`);
  sanitizeBase64Sources(body);
  assert.equal(body.messages[0].content[0].source.data, PNG);
});

test("strips whitespace and newlines from image source.data", () => {
  const wrapped = PNG.replace(/(.{40})/g, "$1\n");
  const body = imageMessage(wrapped);
  sanitizeBase64Sources(body);
  assert.equal(body.messages[0].content[0].source.data, PNG);
});

test("leaves clean base64 untouched", () => {
  const body = imageMessage(PNG);
  sanitizeBase64Sources(body);
  assert.equal(body.messages[0].content[0].source.data, PNG);
});

test("also sanitizes document (pdf) base64 sources", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          {
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: `data:application/pdf;base64,${PNG}`,
            },
          },
        ],
      },
    ],
  };
  sanitizeBase64Sources(body);
  assert.equal(body.messages[0].content[0].source.data, PNG);
});

test("sanitizes images inside tool_result content arrays", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          {
            type: "tool_result",
            tool_use_id: "t1",
            content: [
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: "image/jpeg",
                  data: `data:image/jpeg;base64,${PNG}`,
                },
              },
            ],
          },
        ],
      },
    ],
  };
  sanitizeBase64Sources(body);
  assert.equal(body.messages[0].content[0].content[0].source.data, PNG);
});

test("no-ops on string content, missing source fields, and non-object bodies", () => {
  assert.doesNotThrow(() =>
    sanitizeBase64Sources({ messages: [{ role: "user", content: "hello" }] })
  );
  assert.doesNotThrow(() =>
    sanitizeBase64Sources({ messages: [{ role: "user", content: [{ type: "text", text: "hi" }] }] })
  );
  assert.doesNotThrow(() => sanitizeBase64Sources({ messages: [null] }));
  assert.doesNotThrow(() => sanitizeBase64Sources(null));
  const noSource = { messages: [{ role: "user", content: [{ type: "image", source: null }] }] };
  assert.doesNotThrow(() => sanitizeBase64Sources(noSource));
  assert.equal(noSource.messages[0].content[0].source, null);
});
