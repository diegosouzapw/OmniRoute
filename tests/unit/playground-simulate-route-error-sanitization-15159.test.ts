import assert from "node:assert/strict";
import { test } from "node:test";

// Regression guard for audit #15159 / Hard Rule #12 — E-14.
//
// `src/app/api/playground/simulate-route/route.ts` interpolated the raw
// `error.message` from any caught exception straight into a 500 body with no
// sanitizer. The file imported nothing from `utils/error`, so the
// `check:error-helper` gate trusted it and could not see the leak.
//
// Fault injection: the route's `try` block starts with `await request.json()`,
// so a request whose `json()` throws gives a deterministic hostile error with
// no DB, network or timing dependency.

const HOSTILE_PATH = "/home/runner/work/OmniRoute/src/lib/db/secret-internals.ts";
const HOSTILE_TOKEN = "sk-live-ABC123SUPERSECRETTOKEN";

function hostileRequest(): Request {
  return {
    json: async () => {
      throw new Error(`upstream 500 at ${HOSTILE_PATH}:42:7 token=${HOSTILE_TOKEN}`);
    },
  } as unknown as Request;
}

test("E-14: simulate-route sanitizes a caught error message in the 500 body", async () => {
  const { POST } = await import("../../src/app/api/playground/simulate-route/route.ts");

  const response = await POST(hostileRequest());
  assert.equal(response.status, 500, "an internal failure must stay a 500");

  const body = (await response.json()) as { error: string };
  assert.ok(
    body.error.startsWith("Simulation error: "),
    `envelope prefix must be preserved, got: ${body.error}`
  );
  assert.ok(!body.error.includes(HOSTILE_PATH), `raw stack path leaked: ${body.error}`);
  assert.ok(!body.error.includes(HOSTILE_TOKEN), `raw credential leaked: ${body.error}`);
  assert.ok(body.error.includes("<path>"), `path should be redacted to <path>: ${body.error}`);
  assert.ok(
    body.error.includes("[REDACTED]"),
    `credential should be redacted to [REDACTED]: ${body.error}`
  );
});
