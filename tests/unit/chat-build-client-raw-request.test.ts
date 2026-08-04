// #5152: handleChat used to clone the body twice for logging — once into a local
// `rawClientBody` and again inside buildClientRawRequest — doubling per-request heap
// residency on the hot path (and cloning even when clientRawRequest was already provided).
// The outer clone was removed; buildClientRawRequest still owns the (single) deep clone.
// These tests pin that the logging snapshot remains an ISOLATED copy so dropping the outer
// clone cannot leak a shared reference that downstream mutation would corrupt.
import test from "node:test";
import assert from "node:assert/strict";
import {
  buildClientRawRequest,
  resolveDispatchClientRawRequest,
} from "../../src/sse/handlers/chat.ts";

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

// #7360 follow-up (live incident, log id 1784418258231-14961a): a combo target
// abandoned by comboTargetTimeoutMs used to hang forever because chatCore.ts's
// createStreamController/withRateLimit only ever watches the ORIGINAL client's
// request.signal — which stays open for as long as the overall combo keeps
// succeeding via a different target. resolveDispatchClientRawRequest merges in
// the per-target modelAbortSignal so an abandoned dispatch can observe its own
// abort and reach its cleanup path (trackPendingRequest(false)).
test("resolveDispatchClientRawRequest returns clientRawRequest unchanged when there is no modelAbortSignal", () => {
  const clientRawRequest = { endpoint: "/v1/responses", signal: null };
  const out = resolveDispatchClientRawRequest(clientRawRequest, null);
  assert.equal(out, clientRawRequest, "must be the exact same reference — no-op common case");
});

test("resolveDispatchClientRawRequest uses modelAbortSignal directly when clientRawRequest has no signal of its own", () => {
  const modelAbortController = new AbortController();
  const clientRawRequest = { endpoint: "/v1/responses", signal: null };
  const out = resolveDispatchClientRawRequest(clientRawRequest, modelAbortController.signal);
  assert.equal(out?.endpoint, "/v1/responses", "other fields are preserved");
  assert.equal(out?.signal?.aborted, false);
  modelAbortController.abort(new Error("target timeout"));
  assert.equal(out?.signal?.aborted, true, "the returned signal must reflect the model abort");
});

test("resolveDispatchClientRawRequest merges both signals — EITHER aborting fires the combined signal", () => {
  const clientAbortController = new AbortController();
  const modelAbortController = new AbortController();
  const clientRawRequest = { endpoint: "/v1/responses", signal: clientAbortController.signal };

  const out = resolveDispatchClientRawRequest(clientRawRequest, modelAbortController.signal);
  assert.equal(out?.signal?.aborted, false);

  // The per-target timeout fires WITHOUT the real client ever disconnecting —
  // this is exactly the live-incident scenario: the merged signal must still abort.
  modelAbortController.abort(new Error("comboTargetTimeoutMs exceeded"));
  assert.equal(
    out?.signal?.aborted,
    true,
    "modelAbortSignal alone (client signal untouched) must abort the merged signal"
  );
  assert.equal(
    clientAbortController.signal.aborted,
    false,
    "the original client signal is untouched"
  );
});

test("resolveDispatchClientRawRequest: the real client disconnecting also aborts the merged signal", () => {
  const clientAbortController = new AbortController();
  const modelAbortController = new AbortController();
  const clientRawRequest = { endpoint: "/v1/responses", signal: clientAbortController.signal };

  const out = resolveDispatchClientRawRequest(clientRawRequest, modelAbortController.signal);
  clientAbortController.abort(new Error("client disconnected"));
  assert.equal(out?.signal?.aborted, true);
});
