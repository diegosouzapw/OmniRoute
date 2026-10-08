import test from "node:test";
import assert from "node:assert/strict";
import { getComboCredentialAvailability } from "../../src/sse/handlers/comboCredentialAvailability.ts";
import { modelAvailabilitySkipReason } from "../../open-sse/services/combo/types.ts";

const NOW = Date.parse("2030-01-01T00:00:00.000Z");
const FUTURE = new Date(NOW + 5000).toISOString();

test("credential cooldown preserves its deadline without exposing credential fields", () => {
  const result = getComboCredentialAvailability({ allRateLimited: true, retryAfter: FUTURE }, NOW);
  assert.deepEqual(result, { available: false, reason: "connection_cooldown", retryAfterMs: 5000 });
  assert.equal(modelAvailabilitySkipReason(result), "availability");
});

test("missing credentials and capacity contention are not connection cooldowns", () => {
  for (const credentials of [
    null,
    undefined,
    { waitingForCapacity: true },
    { waitingForCapacity: true, allRateLimited: true, retryAfter: FUTURE },
  ]) {
    assert.equal(getComboCredentialAvailability(credentials, NOW), false);
  }
});

test("malformed and expired cooldown hints do not produce fabricated retries", () => {
  for (const retryAfter of [
    undefined,
    null,
    "invalid",
    "",
    5,
    Infinity,
    new Date(NOW).toISOString(),
    new Date(NOW - 1).toISOString(),
  ]) {
    assert.equal(getComboCredentialAvailability({ allRateLimited: true, retryAfter }, NOW), false);
  }
});

test("healthy credentials remain available and legacy availability reasons remain unchanged", () => {
  assert.equal(getComboCredentialAvailability({}, NOW), true);
  assert.equal(
    getComboCredentialAvailability({ allRateLimited: false, retryAfter: FUTURE }, NOW),
    true
  );
  assert.equal(modelAvailabilitySkipReason(true), null);
  assert.equal(modelAvailabilitySkipReason(false), "availability");
  assert.equal(modelAvailabilitySkipReason("model_not_in_catalog"), "model_not_in_catalog");
});
