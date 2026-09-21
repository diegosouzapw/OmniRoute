// Byte-path call-site slice of #10437: admitChatRequest (POST /v1/responses large
// bodies) must use the existing tryAcquireHealthyHeadroom budget when the primary
// lease is busy and the heap is not pressured. The STRUCTURE path already does this;
// the BYTE path still called acquireHeavyWithin()/tryAcquireHeavy() only.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  ChatAdmissionController,
  CHAT_LARGE_BODY_BYTES,
  admitChatRequest,
} from "../../src/shared/middleware/chatBodyAdmission.ts";

function byteHeavyBody(minBytes = 40): string {
  return JSON.stringify({ input: [{ role: "user", content: "x".repeat(minBytes) }] });
}

function responsesRequest(body: string): Request {
  return new Request("http://x/v1/responses", {
    method: "POST",
    headers: { "content-type": "application/json", "content-length": String(body.length) },
    body,
  });
}

test("byte-heavy admitChatRequest: two concurrent bodies, 1+1 budget, second admits on a healthy heap", async () => {
  const controller = new ChatAdmissionController(1, undefined, 1);
  const body = byteHeavyBody();
  const options = {
    controller,
    largeBodyBytes: 32,
    hardMaxBytes: 1024,
    queueMs: 0,
    heapPressureCheck: () => false,
  };

  const [first, second] = await Promise.all([
    admitChatRequest(responsesRequest(body), options),
    admitChatRequest(responsesRequest(body), options),
  ]);

  assert.equal(first.admit, true, "first byte-heavy request must take the primary lease");
  assert.equal(second.admit, true, "second byte-heavy request must use healthy-headroom");
  assert.equal(controller.activeHeavy, 1);
  assert.equal(controller.activeHealthyHeadroom, 1);
  if (first.admit) first.lease?.release();
  if (second.admit) second.lease?.release();
  assert.equal(controller.activeHeavy, 0);
  assert.equal(controller.activeHealthyHeadroom, 0);
});

test("byte-heavy admitChatRequest: a pressured heap still 503s the second concurrent body", async () => {
  const controller = new ChatAdmissionController(1, undefined, 1);
  const body = byteHeavyBody();
  const options = {
    controller,
    largeBodyBytes: 32,
    hardMaxBytes: 1024,
    queueMs: 0,
    heapPressureCheck: () => true,
  };

  const [first, second] = await Promise.all([
    admitChatRequest(responsesRequest(body), options),
    admitChatRequest(responsesRequest(body), options),
  ]);

  const results = [first, second];
  const admitted = results.filter((result) => result.admit);
  const rejected = results.filter((result) => !result.admit);
  assert.equal(admitted.length, 1, "primary budget still admits exactly one pressured request");
  assert.equal(rejected.length, 1, "pressured heap must not spend healthy-headroom");
  assert.equal(controller.activeHeavy, 1);
  assert.equal(controller.activeHealthyHeadroom, 0);
  const shed = rejected[0];
  if (!shed.admit) {
    assert.equal(shed.response.status, 503);
    assert.equal((await shed.response.json()).error.code, "chat_admission_busy");
  }
  for (const result of admitted) if (result.admit) result.lease?.release();
});

test("OMNIROUTE_CHAT_LARGE_BODY_BYTES default threshold takes the heavyweight lease and healthy-headroom", async () => {
  const controller = new ChatAdmissionController(1, undefined, 1);
  const body = byteHeavyBody(CHAT_LARGE_BODY_BYTES);
  assert.ok(
    body.length >= CHAT_LARGE_BODY_BYTES,
    "fixture must sit at or above the default LARGE_BODY_BYTES threshold"
  );
  const options = {
    controller,
    hardMaxBytes: CHAT_LARGE_BODY_BYTES * 2,
    queueMs: 0,
    heapPressureCheck: () => false,
  };

  const [first, second] = await Promise.all([
    admitChatRequest(responsesRequest(body), options),
    admitChatRequest(responsesRequest(body), options),
  ]);

  assert.equal(first.admit, true, "body at LARGE_BODY_BYTES must take the primary lease");
  assert.equal(second.admit, true, "second LARGE_BODY_BYTES body must use healthy-headroom");
  assert.equal(controller.activeHeavy, 1);
  assert.equal(controller.activeHealthyHeadroom, 1);
  if (first.admit) first.lease?.release();
  if (second.admit) second.lease?.release();
});
