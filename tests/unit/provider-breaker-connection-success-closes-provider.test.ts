/**
 * A provider-level breaker opened by chat.ts:_onFailure must close when the
 * combo success path records a success against a specific connection.
 *
 * Live failure: claude's provider breaker stayed HALF_OPEN after a probe
 * returned 200, because recordProviderSuccess(provider, connectionId) only
 * touched the connection-scoped breaker. The next request was rejected as
 * "all targets were skipped by pre-dispatch filters".
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

test("a connection-scoped success also closes the provider-level breaker", async () => {
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

  assert.equal(providerBreaker.state, "CLOSED", "provider breaker must close");
  assert.equal(connectionBreaker.state, "CLOSED", "connection breaker must close");

  resetAllCircuitBreakers();
});
