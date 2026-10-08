import assert from "node:assert/strict";
import test from "node:test";
import { getCircuitBreaker } from "../../src/shared/utils/circuitBreaker.ts";
import {
  isProviderInCooldown,
  recordProviderFailure,
} from "../../open-sse/services/accountFallback.ts";
import { isModelScoped400 } from "../../open-sse/services/modelAccessDenied.ts";
import { connectionCircuitBreakerName } from "../../open-sse/services/connectionCircuitBreaker.ts";

const lowThreshold = { failureThreshold: 1, resetTimeoutMs: 60_000 };

test("one connection's failure does not open the breaker for another connection", () => {
  const provider = `hou-conn-${Date.now()}`;
  recordProviderFailure(provider, undefined, "account-a", lowThreshold);
  assert.equal(isProviderInCooldown(provider, "account-a"), true);
  assert.equal(isProviderInCooldown(provider, "account-b"), false);
  assert.equal(isProviderInCooldown(provider), false);
  assert.equal(
    getCircuitBreaker(connectionCircuitBreakerName(provider, "account-a")).getStatus().state,
    "OPEN"
  );
});

test("a proxy failure still opens the provider-wide breaker", () => {
  const provider = `hou-proxy-${Date.now()}`;
  recordProviderFailure(provider, undefined, "account-a", lowThreshold, { isNetworkError: true });
  assert.equal(isProviderInCooldown(provider), true);
  assert.equal(isProviderInCooldown(provider, "account-b"), true);
});

test("Koosha's shared model-scope source still advances wrapped model 400s", () => {
  assert.equal(
    isModelScoped400("invalid_request_error: model claude-fable-5 is not supported"),
    true
  );
  assert.equal(isModelScoped400("Bad Request: The model is not supported"), true);
  assert.equal(isModelScoped400("Invalid message format: the request body is malformed."), false);
});
