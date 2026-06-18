import test from "node:test";
import assert from "node:assert/strict";

import {
  extractMemoryTextFromResponse,
  extractMemoryTextFromRequestBody,
  resolveMemoryOwnerId,
} from "../../open-sse/handlers/chatCore/memoryExtraction.ts";

test("extractMemoryTextFromResponse reads OpenAI choices[0].message.content (trimmed)", () => {
  assert.equal(
    extractMemoryTextFromResponse({ choices: [{ message: { content: "  hi  " } }] }),
    "hi"
  );
});

test("extractMemoryTextFromResponse joins Claude content text blocks and skips non-text", () => {
  assert.equal(
    extractMemoryTextFromResponse({
      content: [
        { type: "text", text: " a " },
        { type: "image" },
        { type: "text", text: "b" },
      ],
    }),
    "a\nb"
  );
});

test("extractMemoryTextFromResponse falls back to Responses output_text", () => {
  assert.equal(extractMemoryTextFromResponse({ output_text: " out " }), "out");
});

test("extractMemoryTextFromResponse returns empty string for null/empty/no-text shapes", () => {
  assert.equal(extractMemoryTextFromResponse(null), "");
  assert.equal(extractMemoryTextFromResponse(undefined), "");
  assert.equal(extractMemoryTextFromResponse({}), "");
  // content array with no text parts -> contentText is "" -> falls through to ""
  assert.equal(extractMemoryTextFromResponse({ content: [{ type: "image" }] }), "");
});

test("extractMemoryTextFromResponse prefers OpenAI content over output_text", () => {
  assert.equal(
    extractMemoryTextFromResponse({
      choices: [{ message: { content: "openai" } }],
      output_text: "responses",
    }),
    "openai"
  );
});

test("extractMemoryTextFromRequestBody returns the LAST user message (string content)", () => {
  const body = {
    messages: [
      { role: "user", content: "first" },
      { role: "assistant", content: "ignored" },
      { role: "user", content: "second" },
    ],
  };
  assert.equal(extractMemoryTextFromRequestBody(body), "second");
});

test("extractMemoryTextFromRequestBody joins array content parts of the last user message", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          { type: "input_text", text: " a " },
          { text: "b" },
          { type: "image_url" },
        ],
      },
    ],
  };
  assert.equal(extractMemoryTextFromRequestBody(body), "a\nb");
});

test("extractMemoryTextFromRequestBody reads Responses-style input items", () => {
  const inputBody = {
    input: [{ role: "user", type: "message", content: [{ type: "input_text", text: "hey" }] }],
  };
  assert.equal(extractMemoryTextFromRequestBody(inputBody), "hey");
});

test("extractMemoryTextFromRequestBody reads a string-content input item", () => {
  const inputBody = {
    input: [{ role: "user", type: "message", content: "  plain  " }],
  };
  assert.equal(extractMemoryTextFromRequestBody(inputBody), "plain");
});

test("extractMemoryTextFromRequestBody scans input items from the end and returns the last user text", () => {
  // The primary input scan walks from the end and returns immediately on the
  // last item whose role is user (or unset) and type is message (or unset).
  const inputBody = {
    input: [
      { type: "reasoning", content: "thinking" }, // itemType !== "message" -> skipped
      { role: "user", content: "alpha" }, // matches, but an earlier item from the end wins
      { role: "user", content: "beta" }, // last matching item -> returned
    ],
  };
  assert.equal(extractMemoryTextFromRequestBody(inputBody), "beta");
});

test("extractMemoryTextFromRequestBody skips assistant input items but accepts the prior user item", () => {
  const inputBody = {
    input: [
      { role: "user", type: "message", content: "the question" },
      { role: "assistant", type: "message", content: "the answer" }, // role !== user -> skipped
    ],
  };
  assert.equal(extractMemoryTextFromRequestBody(inputBody), "the question");
});

test("extractMemoryTextFromRequestBody returns empty for null/empty/no-user bodies", () => {
  assert.equal(extractMemoryTextFromRequestBody(null), "");
  assert.equal(extractMemoryTextFromRequestBody(undefined), "");
  assert.equal(extractMemoryTextFromRequestBody({}), "");
  // only an assistant message -> no user text
  assert.equal(
    extractMemoryTextFromRequestBody({ messages: [{ role: "assistant", content: "x" }] }),
    ""
  );
});

test("resolveMemoryOwnerId returns the id when present, null otherwise", () => {
  assert.equal(resolveMemoryOwnerId({ id: "key_123" }), "key_123");
  // whitespace-only id is rejected
  assert.equal(resolveMemoryOwnerId({ id: "   " }), null);
  // non-string id is rejected
  assert.equal(resolveMemoryOwnerId({ id: 7 } as unknown as Record<string, unknown>), null);
  // missing id / null info
  assert.equal(resolveMemoryOwnerId({}), null);
  assert.equal(resolveMemoryOwnerId(null), null);
});
