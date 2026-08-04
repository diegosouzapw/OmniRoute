import test from "node:test";
import assert from "node:assert/strict";

import { buildNonStreamingJsonResponse } from "../../open-sse/handlers/chatCore/nonStreamingJsonResponse";

test("buildNonStreamingJsonResponse sets content-length for the serialized JSON body", async () => {
  const response = buildNonStreamingJsonResponse(
    {
      id: "chatcmpl-test",
      choices: [{ message: { role: "assistant", content: "hello" } }],
    },
    {
      "Content-Type": "application/json",
      "X-OmniRoute-Cache": "MISS",
    }
  );

  const text = await response.text();
  assert.equal(response.headers.get("Content-Type"), "application/json");
  assert.equal(response.headers.get("X-OmniRoute-Cache"), "MISS");
  assert.equal(response.headers.get("Content-Length"), String(Buffer.byteLength(text)));
});
