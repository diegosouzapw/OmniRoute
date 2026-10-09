import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getCircuitBreaker,
  resetAllCircuitBreakers,
} from "../../src/shared/utils/circuitBreaker.ts";
import { recordProviderSuccess } from "../../open-sse/services/accountFallback.ts";
import { connectionCircuitBreakerName } from "../../open-sse/services/connectionCircuitBreaker.ts";

const unique = (suffix: string) =>
  `breaker-close-${suffix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

test("closing a half-open connection breaker emits one close line", async () => {
  const provider = unique("close");
  const connectionId = "conn-1";
  const connectionBreaker = getCircuitBreaker(
    connectionCircuitBreakerName(provider, connectionId),
    { failureThreshold: 1, resetTimeout: 80 }
  );
  connectionBreaker._onFailure();
  assert.equal(connectionBreaker.state, "OPEN");
  await new Promise((r) => setTimeout(r, 120));
  connectionBreaker.canExecute();
  assert.equal(connectionBreaker.state, "HALF_OPEN");

  const logged: unknown[][] = [];
  try {
    recordProviderSuccess(provider, connectionId, undefined, {
      info: (...args: unknown[]) => {
        logged.push(args);
      },
    });
    assert.equal(connectionBreaker.state, "CLOSED");
    assert.equal(logged.length, 1);
    assert.match(String(logged[0][0]), /circuit breaker closed/);
  } finally {
    resetAllCircuitBreakers();
  }
});

test("provider OPEN without a probe lease stays silent", () => {
  const provider = unique("open");
  const breaker = getCircuitBreaker(provider, { failureThreshold: 1, resetTimeout: 60_000 });
  breaker._onFailure();
  assert.equal(breaker.state, "OPEN");
  const logged: unknown[][] = [];
  try {
    recordProviderSuccess(provider, undefined, undefined, {
      info: (...args: unknown[]) => {
        logged.push(args);
      },
    });
    assert.equal(breaker.state, "OPEN");
    assert.equal(logged.length, 0);
  } finally {
    resetAllCircuitBreakers();
  }
});
