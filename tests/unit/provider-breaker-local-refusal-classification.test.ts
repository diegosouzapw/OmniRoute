import test from "node:test";
import assert from "node:assert/strict";
import { shouldTripProviderBreakerForResult } from "../../src/sse/handlers/chatPredicates.ts";

test("local circuit 503 after the admission gate cannot count as upstream failure", () => {
  const local = new Response(JSON.stringify({ error: { code: "provider_circuit_open" } }), {
    status: 503,
    headers: { "x-omniroute-provider-breaker": "open" },
  });
  assert.equal(
    shouldTripProviderBreakerForResult({ status: 503, response: local }, false, false),
    false
  );
  assert.equal(
    shouldTripProviderBreakerForResult(
      { status: 503, errorCode: "provider_circuit_open" },
      false,
      false
    ),
    false
  );
  assert.equal(
    shouldTripProviderBreakerForResult(
      { status: 503, errorCode: "proxy_unreachable" },
      false,
      false
    ),
    false
  );
  assert.equal(
    shouldTripProviderBreakerForResult(
      { status: 503, response: new Response("upstream", { status: 503 }) },
      false,
      false
    ),
    true
  );
});
