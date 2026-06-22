// tests/unit/chatcore-failure-usage.test.ts
// Characterization of buildFailureUsageRecord — the failed-request usage payload builder extracted
// from handleChatCore's persistFailureUsage closure (chatCore god-file decomposition, #3501). Pure:
// the handler keeps the fire-and-forget saveRequestUsage(...).catch() call and computes latencyMs;
// this builds the record. Locks the unknown/undefined fallbacks, the zeroed token/timing fields,
// the combo-strategy gate, and the ISO timestamp.
import { test } from "node:test";
import assert from "node:assert/strict";
import { buildFailureUsageRecord } from "../../open-sse/handlers/chatCore/failureUsage.ts";

const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

test("maps a fully-populated failure into the usage record", () => {
  const r = buildFailureUsageRecord({
    provider: "openai",
    model: "gpt-4o",
    connectionId: "conn-1",
    apiKeyInfo: { id: "key-1", name: "My Key" },
    effectiveServiceTier: "priority",
    isCombo: true,
    comboStrategy: "weighted",
    statusCode: 429,
    errorCode: "rate_limited",
    latencyMs: 1234,
  });
  assert.equal(r.provider, "openai");
  assert.equal(r.model, "gpt-4o");
  assert.deepEqual(r.tokens, { input: 0, output: 0, cacheRead: 0, cacheCreation: 0, reasoning: 0 });
  assert.equal(r.status, "429");
  assert.equal(r.success, false);
  assert.equal(r.latencyMs, 1234);
  assert.equal(r.timeToFirstTokenMs, 0);
  assert.equal(r.errorCode, "rate_limited");
  assert.match(String(r.timestamp), ISO);
  assert.equal(r.connectionId, "conn-1");
  assert.equal(r.apiKeyId, "key-1");
  assert.equal(r.apiKeyName, "My Key");
  assert.equal(r.serviceTier, "priority");
  assert.equal(r.comboStrategy, "weighted");
});

test("applies the unknown/undefined fallbacks", () => {
  const r = buildFailureUsageRecord({
    provider: null,
    model: undefined,
    connectionId: null,
    apiKeyInfo: null,
    effectiveServiceTier: "standard",
    isCombo: false,
    comboStrategy: "priority",
    statusCode: 502,
    errorCode: null,
    latencyMs: 7,
  });
  assert.equal(r.provider, "unknown");
  assert.equal(r.model, "unknown");
  assert.equal(r.errorCode, "502"); // falls back to String(statusCode)
  assert.equal(r.connectionId, undefined);
  assert.equal(r.apiKeyId, undefined);
  assert.equal(r.apiKeyName, undefined);
  // isCombo false → comboStrategy is dropped even when supplied
  assert.equal(r.comboStrategy, undefined);
});

test("combo strategy is included only for combo requests", () => {
  const combo = buildFailureUsageRecord({
    provider: "x",
    model: "y",
    connectionId: null,
    apiKeyInfo: null,
    effectiveServiceTier: "standard",
    isCombo: true,
    comboStrategy: "round-robin",
    statusCode: 500,
    errorCode: "boom",
    latencyMs: 1,
  });
  assert.equal(combo.comboStrategy, "round-robin");

  const comboNoStrategy = buildFailureUsageRecord({
    provider: "x",
    model: "y",
    connectionId: null,
    apiKeyInfo: null,
    effectiveServiceTier: "standard",
    isCombo: true,
    comboStrategy: null,
    statusCode: 500,
    errorCode: "boom",
    latencyMs: 1,
  });
  assert.equal(comboNoStrategy.comboStrategy, undefined);
});
