import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import test from "node:test";

import {
  assertNoRawPromotionPayloadLeak,
  buildPersistablePromotionRecord,
  digestPromotionText,
} from "../../../src/lib/guardrails/videoBridgePromotionDigest.ts";

test("digestPromotionText returns the sha256 hex digest of the raw text", () => {
  const raw = "the quick brown fox";
  assert.equal(digestPromotionText(raw), createHash("sha256").update(raw).digest("hex"));
});

test("digestPromotionText is deterministic for identical input", () => {
  assert.equal(digestPromotionText("same input"), digestPromotionText("same input"));
});

test("buildPersistablePromotionRecord reduces a raw model response to metrics + digest only", () => {
  const rawResponseText =
    "The person's full name is Jane Doe and their private phone number is 555-0100.";
  const record = buildPersistablePromotionRecord({
    caseId: "close-events-1",
    metrics: { factRetention: 0.92, latencyMs: 812 },
    model: "vision-model-x",
    rawResponseText,
  });

  assert.equal(record.responseDigest, digestPromotionText(rawResponseText));
  assert.deepEqual(record.metrics, { factRetention: 0.92, latencyMs: 812 });
  assert.equal(record.caseId, "close-events-1");
  assert.equal(record.model, "vision-model-x");

  const serialized = JSON.stringify(record);
  assert.ok(!serialized.includes("Jane Doe"), "persisted record must never contain the raw response text");
  assert.ok(!serialized.includes("555-0100"));
  assert.ok(!("rawResponseText" in record), "persisted record must not carry a raw-text field at all");
});

test("buildPersistablePromotionRecord never mutates the metrics object it was given", () => {
  const metrics = { latencyMs: 100 };
  const record = buildPersistablePromotionRecord({
    caseId: "c1",
    metrics,
    model: "m1",
    rawResponseText: "response",
  });
  record.metrics.latencyMs = 999;
  assert.equal(metrics.latencyMs, 100);
});

test("assertNoRawPromotionPayloadLeak passes for a properly digested record", () => {
  const raw = "sensitive raw transcript content";
  const record = buildPersistablePromotionRecord({
    caseId: "c1",
    metrics: {},
    model: "m1",
    rawResponseText: raw,
  });
  assert.doesNotThrow(() => assertNoRawPromotionPayloadLeak(record, raw));
});

test("assertNoRawPromotionPayloadLeak throws if a raw payload is ever smuggled into a persisted record", () => {
  const raw = "sensitive raw transcript content";
  const leakedRecord = {
    caseId: "c1",
    metrics: {},
    model: "m1",
    // Simulates a future refactor accidentally reintroducing the raw text.
    rawResponseText: raw,
    responseDigest: digestPromotionText(raw),
  };
  assert.throws(() => assertNoRawPromotionPayloadLeak(leakedRecord, raw), /raw response/);
});

test("assertNoRawPromotionPayloadLeak is a no-op for an empty raw payload (nothing to leak)", () => {
  const record = buildPersistablePromotionRecord({
    caseId: "c1",
    metrics: {},
    model: "m1",
    rawResponseText: "",
  });
  assert.doesNotThrow(() => assertNoRawPromotionPayloadLeak(record, ""));
});
