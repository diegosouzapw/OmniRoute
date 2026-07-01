// #5152: handleChat used to clone the body twice for logging — once into a local
// `rawClientBody` and again inside buildClientRawRequest — doubling per-request heap
// residency on the hot path (and cloning even when clientRawRequest was already provided).
// The outer clone was removed; buildClientRawRequest still owns the (single) deep clone.
// These tests pin that the logging snapshot remains an ISOLATED copy so dropping the outer
// clone cannot leak a shared reference that downstream mutation would corrupt.
import test from "node:test";
import assert from "node:assert/strict";
import { buildClientRawRequest } from "../../src/sse/handlers/chat.ts";

function req(body: unknown) {
  return new Request("http://x/v1/chat/completions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("buildClientRawRequest deep-clones the body (not the same reference)", () => {
  const body = { model: "m", messages: [{ role: "user", content: "hi" }] };
  const out = buildClientRawRequest(req(body), body);
  assert.deepEqual(out.body, body);
  assert.notEqual(out.body, body, "must be a distinct object");
  assert.notEqual(out.body.messages, body.messages, "nested arrays must be cloned too");
});

test("mutating the original body after capture does not corrupt the snapshot", () => {
  const body = { model: "m", messages: [{ role: "user", content: "original" }] };
  const out = buildClientRawRequest(req(body), body);
  body.messages[0].content = "MUTATED";
  body.messages.push({ role: "user", content: "added" });
  assert.equal(out.body.messages.length, 1, "snapshot length is frozen at capture time");
  assert.equal(out.body.messages[0].content, "original", "snapshot content is isolated");
});

test("endpoint and headers are captured from the request", () => {
  const out = buildClientRawRequest(req({ model: "m" }), { model: "m" });
  assert.equal(out.endpoint, "/v1/chat/completions");
  assert.equal(out.headers["content-type"], "application/json");
});
