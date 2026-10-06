/**
 * extractResponsesId is the write-side half of previous_response_id
 * continuation (src/lib/db/responsesContinuationStore.ts is the read-side
 * half): it decides what gets indexed in call_logs.response_id. See
 * responses-continuation-passthrough-client-payload.test.ts and
 * responses-continuation-store.test.ts for the fuller bug writeup this
 * fixes -- this file covers the id-extraction half in isolation.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { extractResponsesId } from "../../open-sse/handlers/chatCore/attemptLogging.ts";

const RESPONSES = "openai-responses";

test("extractResponsesId reads a direct id (non-streaming clientResponse)", () => {
  assert.equal(extractResponsesId(RESPONSES, { id: "resp_123" }), "resp_123");
});

test("extractResponsesId reads a wrapped id (streaming clientResponse via clientPayloadCollector.build())", () => {
  assert.equal(
    extractResponsesId(RESPONSES, { _streamed: true, summary: { id: "resp_456" } }),
    "resp_456"
  );
});

test("extractResponsesId prefers a direct id over a wrapped one when both are present", () => {
  assert.equal(
    extractResponsesId(RESPONSES, { id: "resp_direct", summary: { id: "resp_wrapped" } }),
    "resp_direct"
  );
});

test("extractResponsesId returns null when sourceFormat is not openai-responses (never mistake a chatcmpl-* id)", () => {
  assert.equal(extractResponsesId("openai", { id: "chatcmpl-abc" }), null);
  assert.equal(extractResponsesId(undefined, { id: "resp_123" }), null);
});

test("extractResponsesId returns null for a missing/empty/non-string id in either shape", () => {
  assert.equal(extractResponsesId(RESPONSES, {}), null);
  assert.equal(extractResponsesId(RESPONSES, { id: "" }), null);
  assert.equal(extractResponsesId(RESPONSES, { id: 123 }), null);
  assert.equal(extractResponsesId(RESPONSES, { summary: {} }), null);
  assert.equal(extractResponsesId(RESPONSES, { summary: { id: "" } }), null);
  assert.equal(extractResponsesId(RESPONSES, { summary: null }), null);
});

test("extractResponsesId returns null for a non-object or nullish clientResponse", () => {
  assert.equal(extractResponsesId(RESPONSES, null), null);
  assert.equal(extractResponsesId(RESPONSES, undefined), null);
  assert.equal(extractResponsesId(RESPONSES, "resp_123"), null);
});
