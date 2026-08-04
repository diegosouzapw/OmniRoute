import test from "node:test";
import assert from "node:assert/strict";

const {
  getCircuitBreaker,
  resetAllCircuitBreakers,
  __getCircuitRegistrySizeForTests,
} = await import("../../src/shared/utils/circuitBreaker.ts");

test("circuit breaker registry stays bounded by MAX_REGISTRY_SIZE", () => {
  resetAllCircuitBreakers();

  // Create far more than the cap (500) of fresh CLOSED breakers.
  for (let i = 0; i < 1200; i++) {
    getCircuitBreaker(`cap-cb-${i}`);
  }

  const size = __getCircuitRegistrySizeForTests();
  assert.ok(size <= 500, `registry should be capped at 500, got ${size}`);

  resetAllCircuitBreakers();
});

test("registry cap never evicts an OPEN breaker", () => {
  resetAllCircuitBreakers();

  // Trip one breaker OPEN (failureThreshold = 1).
  const open = getCircuitBreaker("must-survive", { failureThreshold: 1 });
  open._onFailure();
  assert.equal(open.getStatus().state, "OPEN");

  // Flood with cold CLOSED breakers to force eviction.
  for (let i = 0; i < 1200; i++) {
    getCircuitBreaker(`flood-cb-${i}`);
  }

  // The OPEN breaker carries meaningful state and must not have been evicted.
  const survivor = getCircuitBreaker("must-survive");
  assert.equal(survivor.getStatus().state, "OPEN", "OPEN breaker must survive eviction");

  resetAllCircuitBreakers();
});
