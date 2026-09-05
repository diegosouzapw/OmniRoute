import test from "node:test";
import assert from "node:assert/strict";

const { buildApiKeyConnectionTestResult } =
  await import("../../../src/app/api/providers/[id]/test/apiKeyTestResult.ts");

const FAILURE_DIAGNOSIS = {
  type: "synthetic_failure",
  source: "test",
  message: "Synthetic validator failure",
  code: "synthetic",
};

test("API-key connection tests preserve validator failure status codes", () => {
  for (const statusCode of [401, 403, 429, 503]) {
    const result = buildApiKeyConnectionTestResult(
      {
        valid: false,
        warning: null,
        statusCode,
      },
      `Synthetic validator failure ${statusCode}`,
      FAILURE_DIAGNOSIS
    );

    assert.equal(result.valid, false);
    assert.equal(result.statusCode, statusCode);
    assert.deepEqual(result.diagnosis, FAILURE_DIAGNOSIS);
  }
});

test("status-less semantic failures remain status-less", () => {
  const result = buildApiKeyConnectionTestResult(
    {
      valid: false,
      warning: null,
    },
    "Synthetic semantic failure",
    FAILURE_DIAGNOSIS
  );

  assert.equal(result.valid, false);
  assert.equal(result.statusCode, null);
  assert.deepEqual(result.diagnosis, FAILURE_DIAGNOSIS);
});

test("successful validation does not synthesize an HTTP status", () => {
  const diagnosis = {
    type: "ok",
    source: "upstream",
    message: null,
    code: null,
  };

  const result = buildApiKeyConnectionTestResult(
    {
      valid: true,
      warning: null,
      statusCode: 200,
    },
    null,
    diagnosis
  );

  assert.equal(result.valid, true);
  assert.equal(result.statusCode, null);
  assert.deepEqual(result.diagnosis, diagnosis);
});
