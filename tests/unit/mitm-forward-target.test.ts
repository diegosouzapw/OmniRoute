import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { resolveForwardTarget, isCloudcodeEnvelope, CHAT_PATH, ANTIGRAVITY_PATH } = require(
  "../../src/mitm/_internal/forwardTarget.cjs"
);

const BASE = "http://localhost:20128";

test("cloudcode envelope routes to the antigravity endpoint", () => {
  const body = {
    model: "gemini-2.5-pro",
    project: "projects/test",
    request: { contents: [{ role: "user", parts: [{ text: "oi" }] }] },
  };
  assert.equal(isCloudcodeEnvelope(body), true);
  const t = resolveForwardTarget(BASE, body);
  assert.equal(t.url, `${BASE}${ANTIGRAVITY_PATH}`);
  assert.equal(t.format, "antigravity");
});

test("plain OpenAI body routes to chat/completions", () => {
  const body = { model: "gemini-2.5-pro", messages: [{ role: "user", content: "oi" }] };
  assert.equal(isCloudcodeEnvelope(body), false);
  const t = resolveForwardTarget(BASE, body);
  assert.equal(t.url, `${BASE}${CHAT_PATH}`);
  assert.equal(t.format, "openai");
});

test("base url trailing slash is trimmed", () => {
  const t = resolveForwardTarget("http://localhost:20128/", { messages: [] });
  assert.equal(t.url, `http://localhost:20128${CHAT_PATH}`);
});

test("non-envelope shapes are not misclassified as cloudcode", () => {
  // request present but contents missing / wrong type
  assert.equal(isCloudcodeEnvelope({ request: {} }), false);
  assert.equal(isCloudcodeEnvelope({ request: { contents: "nope" } }), false);
  assert.equal(isCloudcodeEnvelope({ contents: [{ parts: [] }] }), false); // bare gemini, no envelope
  assert.equal(isCloudcodeEnvelope(null), false);
  assert.equal(isCloudcodeEnvelope([]), false);
  assert.equal(isCloudcodeEnvelope("string"), false);
});
