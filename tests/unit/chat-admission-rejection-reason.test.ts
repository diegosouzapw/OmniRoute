import test from "node:test";
import assert from "node:assert/strict";

import {
  structuralRejectionResponse,
} from "../../src/shared/middleware/chatAdmissionResponses.ts";

// Pins the machine-readable error.reason contract of the chat admission
// structural rejections (#TS2339 regression guard): buildErrorBody now owns
// the reason field via ErrorBodyClassification, so the response bodies keep
// carrying it without post-construction mutation of an untyped field.
test("structuralRejectionResponse 413 carries reason=message_limit classification", () => {
  const res = structuralRejectionResponse(413, 40);
  assert.equal(res.status, 413);
  assert.ok(!res.headers.has("Retry-After"), "413 is not retryable-by-header");
  return res.text().then((raw) => {
    const body = JSON.parse(raw);
    assert.equal(body.error.reason, "message_limit");
    assert.equal(body.error.type, "payload_too_large");
    assert.equal(body.error.code, "chat_history_too_large");
    assert.ok(!body.error.message.includes("at /"), "must not leak stack traces");
  });
});

test("structuralRejectionResponse 503 carries reason=structure_limit and Retry-After", () => {
  const res = structuralRejectionResponse(503, 40);
  assert.equal(res.status, 503);
  assert.equal(res.headers.get("Retry-After"), "1");
  return res.text().then((raw) => {
    const body = JSON.parse(raw);
    assert.equal(body.error.reason, "structure_limit");
    assert.equal(body.error.type, "server_error");
    assert.equal(body.error.code, "chat_admission_busy");
  });
});
