import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pressure-guard-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-pressure-guard-scoped-secret";

// Dynamic imports are required because DATA_DIR must be set before DB modules evaluate.
const { isComboRequestScopedFailure, isRequestScopedUpstreamFailure, shouldSkipConnDisable } = await import(
  "../../open-sse/services/combo/comboPredicates.ts"
);
const { EXECUTOR_CONTRACT_VIOLATION_CODE } = await import("../../open-sse/config/constants.ts");
const { buildErrorBody } = await import("../../open-sse/utils/error.ts");

// Replicates the exact body shapes the two local memory-pressure guards emit:
// - resourcePressure.ts buildErrorBody(503, ...) -> code "resource_pressure"
// - heapPressure.ts checkHeapPressureGuard      -> code "heap_pressure"
// Both are decided before any upstream call; the connection was never dialed.
function guardShedResponse(code: string): Response {
  return new Response(
    JSON.stringify({
      error: {
        message: "Service temporarily unavailable due to resource pressure. Retry shortly.",
        type: "server_error",
        code,
      },
    }),
    { status: 503, headers: { "Content-Type": "application/json" } }
  );
}

const GUARD_ERROR_TEXT = "Service temporarily unavailable due to resource pressure. Retry shortly.";

test("resource-pressure guard shed is request-scoped (combo path)", () => {
  const response = guardShedResponse("resource_pressure");
  assert.equal(
    isComboRequestScopedFailure(response, GUARD_ERROR_TEXT, {
      code: "resource_pressure",
      type: "server_error",
    }),
    true
  );
});

test("heap-pressure guard shed is request-scoped (combo path)", () => {
  const response = guardShedResponse("heap_pressure");
  assert.equal(
    isComboRequestScopedFailure(response, GUARD_ERROR_TEXT, {
      code: "heap_pressure",
      type: "server_error",
    }),
    true
  );
});

test("resource-pressure guard shed skips connection disable (single-model path)", () => {
  assert.equal(
    shouldSkipConnDisable(
      {
        status: 503,
        errorCode: "resource_pressure",
        errorType: "server_error",
        rawMessage: GUARD_ERROR_TEXT,
      },
      false,
      false,
      "grok-cli"
    ),
    true
  );
});

test("heap-pressure guard shed skips connection disable (single-model path)", () => {
  assert.equal(
    shouldSkipConnDisable(
      {
        status: 503,
        errorCode: "heap_pressure",
        errorType: "server_error",
        rawMessage: GUARD_ERROR_TEXT,
      },
      false,
      false,
      "grok-cli"
    ),
    true
  );
});

// Negative control: a genuine upstream 503 must keep poisoning health so the
// combo actually fails over and cools the connection.
test("real upstream 503 without a guard code is NOT request-scoped", () => {
  const response = new Response(
    JSON.stringify({
      error: { message: "upstream exploded", type: "server_error", code: "upstream_5xx" },
    }),
    { status: 503, headers: { "Content-Type": "application/json" } }
  );
  assert.equal(
    isComboRequestScopedFailure(response, "upstream exploded", {
      code: "upstream_5xx",
      type: "server_error",
    }),
    false
  );
  assert.equal(
    shouldSkipConnDisable(
      {
        status: 503,
        errorCode: "upstream_5xx",
        errorType: "server_error",
        rawMessage: "upstream exploded",
      },
      false,
      false,
      "grok-cli"
    ),
    false
  );
});

// --- Regression: the pre-existing exemption entries must stay intact. ---

test("pre-existing exemption entries remain request-scoped", () => {
  for (const code of [EXECUTOR_CONTRACT_VIOLATION_CODE, "combo_target_timeout"]) {
    assert.equal(
      isRequestScopedUpstreamFailure({ code, type: "server_error" }),
      true,
      `${code} must stay exempt`
    );
    assert.equal(
      shouldSkipConnDisable(
        { status: 503, errorCode: code, errorType: "server_error", rawMessage: "x" },
        false,
        false,
        "grok-cli"
      ),
      true,
      `${code} must keep skipping connection disable`
    );
  }
});

// --- Boundary: the code table matches on code alone; errorType is not part of
// the exemption contract. A missing/garbage type must not silently revoke the
// guard exemptions. ---

test("guard codes stay exempt regardless of errorType", () => {
  for (const type of [null, undefined, "weird_type"]) {
    assert.equal(
      isRequestScopedUpstreamFailure({ code: "resource_pressure", type }),
      true,
      `code match must not depend on type=${String(type)}`
    );
    assert.equal(
      shouldSkipConnDisable(
        { status: 503, errorCode: "heap_pressure", errorType: type, rawMessage: "x" },
        false,
        false,
        "grok-cli"
      ),
      true,
      `conn disable skip must not depend on type=${String(type)}`
    );
  }
  // Reverse: a code NOT in the table with the guard's own type is not exempt.
  assert.equal(
    isRequestScopedUpstreamFailure({ code: "not_in_table", type: "server_error" }),
    false
  );
});

// --- Negative control with realistic upstream shapes: a rate limit or a
// timeout that actually came from a dialed provider must still poison health. ---

test("real upstream 503 rate-limit/timeout shapes are NOT request-scoped", () => {
  const shapes = [
    { code: "rate_limit_exceeded", type: "rate_limit_error", message: "rate limited" },
    { code: "timeout", type: "server_error", message: "upstream timed out" },
  ];
  for (const shape of shapes) {
    const response = new Response(JSON.stringify({ error: shape }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
    assert.equal(
      isComboRequestScopedFailure(response, shape.message, {
        code: shape.code,
        type: shape.type,
      }),
      false,
      `${shape.code} from a dialed upstream must stay health-signaling`
    );
    assert.equal(
      shouldSkipConnDisable(
        { status: 503, errorCode: shape.code, errorType: shape.type, rawMessage: shape.message },
        false,
        false,
        "grok-cli"
      ),
      false,
      `${shape.code} from a dialed upstream must still disable the connection`
    );
  }
});

// --- Pin the emit -> extract -> exempt chain: if buildErrorBody's projection
// (SAFE_PUBLIC_ERROR_IDENTIFIERS) ever rewrites the guard code, or the emit
// shape changes, the exemption silently stops matching and the poisoning bug
// returns. Drive the real producer-side call, not a hand-built body. ---

test("guard emit chain: buildErrorBody projects the guard code unchanged", () => {
  // Same call shape as resourcePressure.ts: the real producer.
  const body = buildErrorBody(503, GUARD_ERROR_TEXT, undefined, {
    type: "server_error",
    code: "resource_pressure",
  });
  const extracted = (body as { error?: { code?: unknown } }).error?.code;
  assert.equal(extracted, "resource_pressure");
  // The extracted code feeds structuredError.code verbatim (executeTargetAttempt.ts);
  // it must hit the exemption table.
  assert.equal(
    isRequestScopedUpstreamFailure({ code: String(extracted), type: "server_error" }),
    true
  );
});
