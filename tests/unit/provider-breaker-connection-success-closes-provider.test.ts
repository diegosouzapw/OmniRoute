/**
 * Connection success closes its own breaker. The provider HALF_OPEN lease is
 * settled only by the acquired probe inside execute(), so a late connection
 * callback cannot close a newer provider generation.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getCircuitBreaker,
  resetAllCircuitBreakers,
} from "../../src/shared/utils/circuitBreaker.ts";
import { recordProviderSuccess } from "../../open-sse/services/accountFallback.ts";
import { connectionCircuitBreakerName } from "../../open-sse/services/connectionCircuitBreaker.ts";

const unique = (suffix: string) =>
  `provider-close-${suffix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

test("connection success leaves provider HALF_OPEN until its acquired probe settles", async () => {
  const provider = unique("both");
  const connectionId = "conn-1";

  const providerBreaker = getCircuitBreaker(provider, {
    failureThreshold: 1,
    resetTimeout: 80,
  });
  providerBreaker._onFailure();
  assert.equal(providerBreaker.state, "OPEN");

  const connectionBreaker = getCircuitBreaker(
    connectionCircuitBreakerName(provider, connectionId),
    { failureThreshold: 1, resetTimeout: 80 }
  );
  connectionBreaker._onFailure();
  assert.equal(connectionBreaker.state, "OPEN");

  await new Promise((r) => setTimeout(r, 120));
  providerBreaker.canExecute();
  connectionBreaker.canExecute();
  assert.equal(providerBreaker.state, "HALF_OPEN");
  assert.equal(connectionBreaker.state, "HALF_OPEN");

  recordProviderSuccess(provider, connectionId);

  assert.equal(providerBreaker.state, "HALF_OPEN", "unleased callback cannot close provider");
  assert.equal(connectionBreaker.state, "CLOSED", "connection breaker must close");

  await providerBreaker.execute(async () => true);
  assert.equal(providerBreaker.state, "CLOSED", "acquired provider probe closes breaker");

  resetAllCircuitBreakers();
});
