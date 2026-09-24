import assert from "node:assert/strict";
import test from "node:test";
import { shouldRecordProviderBreakerFailure } from "../../open-sse/services/combo/comboPredicates.ts";
import { comboTargetDecision } from "../../open-sse/services/combo/statusDecisionTable.ts";
import { shouldSurfaceBodySpecific400 } from "../../open-sse/services/combo/executeTargetClassify.ts";

const ROWS: Array<{
  id: string;
  status: number;
  errorText: string;
  decision: "advance" | "stop";
}> = [
  {
    id: "plain-model-not-supported",
    status: 400,
    errorText: "The requested model is not supported",
    decision: "advance",
  },
  {
    id: "invalid-request-wrapper",
    status: 400,
    errorText: "invalid_request_error: model claude-fable-5 is not supported",
    decision: "advance",
  },
  {
    id: "bad-request-wrapper",
    status: 400,
    errorText: "Bad Request: The model is not supported",
    decision: "advance",
  },
  {
    id: "responses-api-capability",
    status: 400,
    errorText: "model claude-fable-5 does not support Responses API.",
    decision: "advance",
  },
  {
    id: "bare-bad-request",
    status: 400,
    errorText: "Bad Request",
    decision: "advance",
  },
  {
    id: "invalid-message-format",
    status: 400,
    errorText: "Invalid message format: the request body is malformed.",
    decision: "stop",
  },
  {
    id: "context-overflow",
    status: 400,
    errorText: "This model's maximum context length exceeded",
    decision: "advance",
  },
];

for (const row of ROWS) {
  test(`combo 400 ${row.id} → ${row.decision}`, () => {
    assert.equal(comboTargetDecision(row.status, row.errorText), row.decision);
  });
}

test("body-specific stop still requires shouldFallback", () => {
  assert.equal(
    shouldSurfaceBodySpecific400({
      status: 400,
      errorText: "Invalid message format: the request body is malformed.",
      shouldFallback: true,
    }),
    true
  );
  assert.equal(
    shouldSurfaceBodySpecific400({
      status: 400,
      errorText: "Bad Request: The model is not supported",
      shouldFallback: true,
    }),
    false
  );
});

test("a 400 does not open the provider-wide circuit breaker", () => {
  assert.equal(
    shouldRecordProviderBreakerFailure({
      isStreamReadinessFailure: false,
      status: 400,
      sameProviderNext: false,
      error: "Bad Request: The model is not supported",
    }),
    false
  );
});
