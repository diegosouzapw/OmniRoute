import test from "node:test";
import assert from "node:assert/strict";
import { detectFormatFromEndpoint } from "@omniroute/open-sse/services/provider.ts";

const ENVELOPE = {
  model: "gemini-2.5-pro",
  project: "projects/test",
  request: { contents: [{ role: "user", parts: [{ text: "oi" }] }] },
};

test("detectFormatFromEndpoint classifies the /v1/antigravity path as antigravity", () => {
  assert.equal(detectFormatFromEndpoint(ENVELOPE, "/v1/antigravity"), "antigravity");
  assert.equal(detectFormatFromEndpoint(ENVELOPE, "/api/v1/antigravity"), "antigravity");
  assert.equal(
    detectFormatFromEndpoint(ENVELOPE, "/v1/antigravity:streamGenerateContent"),
    "antigravity"
  );
});

test("the antigravity carve-out does not disturb the other endpoint formats", () => {
  assert.equal(detectFormatFromEndpoint({ messages: [] }, "/v1/messages"), "claude");
  assert.equal(detectFormatFromEndpoint({ messages: [] }, "/v1/chat/completions"), "openai");
  assert.equal(detectFormatFromEndpoint({ input: "x" }, "/v1/responses"), "openai-responses");
});
