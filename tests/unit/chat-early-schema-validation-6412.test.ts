import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("chat-early-schema-6412");
const { buildRequest, handleChat, resetStorage } = harness;

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

/**
 * Regression guard for #6412 — schema validation of scalar params (temperature,
 * top_p, max_tokens, n) MUST run BEFORE provider/model resolution. Previously,
 * a bad `temperature: "not-a-number"` combined with an unknown provider
 * returned 404 "model_not_found" — hiding the real schema error.
 */

async function postChat(body: any) {
  const response = await handleChat(buildRequest({ body }));
  const payload = (await response.json()) as any;
  return { status: response.status, payload };
}

test("bad temperature (string) on unknown provider → 400, not 404", async () => {
  const { status, payload } = await postChat({
    model: "nonexistent-provider/nonexistent-model",
    messages: [{ role: "user", content: "hi" }],
    temperature: "not-a-number",
  });
  assert.equal(status, 400);
  assert.match(JSON.stringify(payload.error), /temperature/i);
});

test("out-of-range temperature (5.0) on unknown provider → 400, not 404", async () => {
  const { status, payload } = await postChat({
    model: "nonexistent-provider/nonexistent-model",
    messages: [{ role: "user", content: "hi" }],
    temperature: 5.0,
  });
  assert.equal(status, 400);
  assert.match(JSON.stringify(payload.error), /temperature/i);
});

test("bad top_p (string) → 400", async () => {
  const { status, payload } = await postChat({
    model: "nonexistent-provider/nonexistent-model",
    messages: [{ role: "user", content: "hi" }],
    top_p: "bad",
  });
  assert.equal(status, 400);
  assert.match(JSON.stringify(payload.error), /top_p/i);
});

test("bad max_tokens (negative) → 400", async () => {
  const { status, payload } = await postChat({
    model: "nonexistent-provider/nonexistent-model",
    messages: [{ role: "user", content: "hi" }],
    max_tokens: -1,
  });
  assert.equal(status, 400);
  assert.match(JSON.stringify(payload.error), /max_tokens/i);
});

test("bad n (0) → 400", async () => {
  const { status, payload } = await postChat({
    model: "nonexistent-provider/nonexistent-model",
    messages: [{ role: "user", content: "hi" }],
    n: 0,
  });
  assert.equal(status, 400);
  assert.match(JSON.stringify(payload.error), /n:/);
});

test("valid params (temperature=0.7) on unknown provider still 404 (provider lookup runs after schema ok)", async () => {
  const { status, payload } = await postChat({
    model: "nonexistent-provider/nonexistent-model",
    messages: [{ role: "user", content: "hi" }],
    temperature: 0.7,
    max_tokens: 100,
  });
  assert.equal(status, 404);
  assert.match(JSON.stringify(payload.error), /model_not_found|No active credentials/i);
});

test("params omitted entirely → schema passes, no false 400", async () => {
  const { status } = await postChat({
    model: "nonexistent-provider/nonexistent-model",
    messages: [{ role: "user", content: "hi" }],
  });
  assert.equal(status, 404); // model lookup still 404 after schema pass-through
});
