import test from "node:test";
import assert from "node:assert/strict";

import {
  extractMemoryTextFromResponse,
  extractMemoryTextFromRequestBody,
  resolveMemoryOwnerId,
} from "../../open-sse/handlers/chatCore/memoryExtraction.ts";

test("extractMemoryTextFromResponse reads OpenAI, Claude-array and responses output_text", () => {
  assert.equal(
    extractMemoryTextFromResponse({ choices: [{ message: { content: "  hi  " } }] }),
    "hi"
  );
  assert.equal(
    extractMemoryTextFromResponse({ content: [{ type: "text", text: " a " }, { type: "image" }] }),
    "a"
  );
  assert.equal(extractMemoryTextFromResponse({ output_text: " out " }), "out");
  assert.equal(extractMemoryTextFromResponse(null), "");
});

test("extractMemoryTextFromRequestBody returns the last user message text", () => {
  const body = {
    messages: [
      { role: "user", content: "first" },
      { role: "assistant", content: "ignored" },
      { role: "user", content: "second" },
    ],
  };
  assert.equal(extractMemoryTextFromRequestBody(body), "second");
  const inputBody = {
    input: [{ role: "user", type: "message", content: [{ type: "input_text", text: "hey" }] }],
  };
  assert.equal(extractMemoryTextFromRequestBody(inputBody), "hey");
});

test("resolveMemoryOwnerId returns trimmed id or null", () => {
  assert.equal(resolveMemoryOwnerId({ id: "key_123" }), "key_123");
  assert.equal(resolveMemoryOwnerId({ id: "   " }), null);
  assert.equal(resolveMemoryOwnerId(null), null);
});
