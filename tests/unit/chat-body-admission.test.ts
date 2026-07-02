// #5152: heap-pressure-aware admission for POST /v1/chat/completions.
//
// The homelab OOM crash-loop was a per-request transient explosion — a large coding-agent
// compact body cloned/parsed/fanned-out across a combo allocates hundreds of MB of JS
// objects, and concurrent compacts stack past the V8 heap ceiling, OOM-crashing the whole
// process. A fixed size cap is wrong (those bodies are legitimate); instead we shed a large
// body with 503 only when the heap is ALREADY under pressure, and 413 only for pathological
// bodies. These tests pin that policy and the cheap fast-path for ordinary traffic.
import test from "node:test";
import assert from "node:assert/strict";

const {
  evaluateChatBodyAdmission,
  checkChatAdmission,
  CHAT_LARGE_BODY_BYTES,
} = await import("../../src/shared/middleware/chatBodyAdmission.ts");

const MB = 1024 * 1024;
const HEAP_LIMIT = 3072 * MB; // mirror the homelab --max-old-space-size=3072

test("small body is always admitted, even under heap pressure", () => {
  const decision = evaluateChatBodyAdmission({
    contentLength: 10 * 1024,
    heapUsedBytes: 0.95 * HEAP_LIMIT,
    heapLimitBytes: HEAP_LIMIT,
  });
  assert.equal(decision.admit, true);
});

test("unknown content-length is admitted", () => {
  const decision = evaluateChatBodyAdmission({
    contentLength: null,
    heapUsedBytes: 0.95 * HEAP_LIMIT,
    heapLimitBytes: HEAP_LIMIT,
  });
  assert.equal(decision.admit, true);
});

test("large body on a HEALTHY heap is admitted (normal case — guard is invisible)", () => {
  const decision = evaluateChatBodyAdmission({
    contentLength: 746578, // the production compact body
    heapUsedBytes: 0.11 * HEAP_LIMIT, // ~350 MB live baseline
    heapLimitBytes: HEAP_LIMIT,
  });
  assert.equal(decision.admit, true);
});

test("large body under heap PRESSURE is shed with 503 + retry", () => {
  const decision = evaluateChatBodyAdmission({
    contentLength: 746578,
    heapUsedBytes: 0.8 * HEAP_LIMIT,
    heapLimitBytes: HEAP_LIMIT,
  });
  assert.equal(decision.admit, false);
  assert.equal(decision.status, 503);
  assert.equal(decision.code, "heap_pressure");
});

test("pathological body is rejected with 413 regardless of heap state", () => {
  const decision = evaluateChatBodyAdmission({
    contentLength: 200 * MB,
    heapUsedBytes: 0.05 * HEAP_LIMIT, // heap totally healthy
    heapLimitBytes: HEAP_LIMIT,
  });
  assert.equal(decision.admit, false);
  assert.equal(decision.status, 413);
});

test("shed threshold is exactly at the ratio boundary", () => {
  const atBoundary = evaluateChatBodyAdmission({
    contentLength: CHAT_LARGE_BODY_BYTES,
    heapUsedBytes: 0.75 * HEAP_LIMIT,
    heapLimitBytes: HEAP_LIMIT,
    shedRatio: 0.75,
  });
  assert.equal(atBoundary.admit, false, "at the ratio it sheds");

  const justBelow = evaluateChatBodyAdmission({
    contentLength: CHAT_LARGE_BODY_BYTES,
    heapUsedBytes: 0.7499 * HEAP_LIMIT,
    heapLimitBytes: HEAP_LIMIT,
    shedRatio: 0.75,
  });
  assert.equal(justBelow.admit, true, "just below the ratio it admits");
});

test("checkChatAdmission returns null for a small-body request (fast path, no heap sample)", () => {
  const request = new Request("http://x/v1/chat/completions", {
    method: "POST",
    headers: { "content-length": "1024" },
  });
  assert.equal(checkChatAdmission(request), null);
});

test("checkChatAdmission sheds a large body with 503 + Retry-After under injected heap pressure", async () => {
  const request = new Request("http://x/v1/chat/completions", {
    method: "POST",
    headers: { "content-length": "746578" },
  });
  const res = checkChatAdmission(request, {
    heapUsedBytes: 0.9 * HEAP_LIMIT,
    heapLimitBytes: HEAP_LIMIT,
  });
  assert.ok(res, "expected a 503 rejection");
  assert.equal(res.status, 503);
  assert.equal(res.headers.get("Retry-After"), "2");
  const body = await res.json();
  assert.equal(body.error.code, "heap_pressure");
  assert.ok(!String(body.error.message).includes("at /"), "must not leak a stack trace");
});

test("checkChatAdmission admits a large body when injected heap is healthy", () => {
  const request = new Request("http://x/v1/chat/completions", {
    method: "POST",
    headers: { "content-length": "746578" },
  });
  const res = checkChatAdmission(request, {
    heapUsedBytes: 0.1 * HEAP_LIMIT,
    heapLimitBytes: HEAP_LIMIT,
  });
  assert.equal(res, null);
});

test("checkChatAdmission 413 response does not leak a stack trace", async () => {
  // Force a pathological size via the hard-cap env so we exercise the real wrapper.
  const request = new Request("http://x/v1/chat/completions", {
    method: "POST",
    headers: { "content-length": String(500 * MB) },
  });
  const res = checkChatAdmission(request);
  assert.ok(res, "expected a rejection Response");
  assert.equal(res.status, 413);
  const body = await res.json();
  assert.equal(body.error.code, "PAYLOAD_TOO_LARGE");
  assert.ok(!String(body.error.message).includes("at /"), "must not leak a stack trace");
});
