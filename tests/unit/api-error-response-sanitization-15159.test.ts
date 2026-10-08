import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";

type ErrorBody = {
  error: { message: string; type?: string; details?: unknown };
  requestId?: string;
};

// Regression guard for audit #15159 / Hard Rule #12.
// `src/lib/api/errorResponse.ts` was a second, unsanitized error surface with
// 54 inbound edges. Both builders must route client-facing messages through
// `sanitizeErrorMessage` so a raw upstream Error body can never reach a client.

async function bodyOf(response: Response): Promise<ErrorBody> {
  return (await response.json()) as ErrorBody;
}

describe("createErrorResponse sanitizes the client-facing message (#15159 E-13)", () => {
  it("strips stack-trace frames from the message", async () => {
    const response = createErrorResponse({
      status: 500,
      message: "boom\n    at Object.<anonymous> (/srv/app/client.ts:44:15)",
    });
    const body = await bodyOf(response);
    assert.equal(response.status, 500);
    assert.ok(!body.error.message.includes("at /srv/app/client.ts:44:15"), "stack frame leaked");
    assert.ok(!body.error.message.includes("/srv/app/"), "absolute path leaked");
  });

  it("redacts embedded credentials in the message", async () => {
    const response = createErrorResponse({
      status: 502,
      message: "upstream failed with api_key=sk-1234567890abcdef",
    });
    const body = await bodyOf(response);
    assert.ok(!body.error.message.includes("sk-1234567890abcdef"), "api key leaked");
  });

  it("preserves the envelope shape (status / type / requestId / details)", async () => {
    const response = createErrorResponse({
      status: 409,
      message: "Conflict detected",
      details: { field: "name" },
    });
    const body = await bodyOf(response);
    assert.equal(response.status, 409);
    assert.equal(body.error.type, "conflict");
    assert.deepEqual(body.error.details, { field: "name" });
    assert.match(body.requestId!, /^[0-9a-f-]{36}$/i);
  });

  it("does not invent a stack frame when the message is already safe", async () => {
    const response = createErrorResponse({ status: 500, message: "internal error" });
    const body = await bodyOf(response);
    assert.equal(body.error.message, "internal error");
  });
});

describe("createErrorResponseFromUnknown sanitizes the client-facing message (#15159 E-13)", () => {
  it("strips stack-trace frames forwarded from a typed error", async () => {
    const response = createErrorResponseFromUnknown({
      message: "explode\n    at handler (/srv/app/routes/foo.ts:12:7)",
      status: 503,
      type: "server_error",
    });
    const body = await bodyOf(response);
    assert.equal(response.status, 503);
    assert.ok(!body.error.message.includes("at /srv/app/routes/foo.ts:12:7"), "stack frame leaked");
    assert.equal(body.error.type, "server_error");
  });

  it("redacts embedded credentials forwarded from a typed error", async () => {
    const response = createErrorResponseFromUnknown({
      message: "auth failed: Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
      status: 401,
    });
    const body = await bodyOf(response);
    assert.ok(!body.error.message.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"), "JWT leaked");
  });

  it("preserves details and falls back for non-object errors", async () => {
    const withDetails = createErrorResponseFromUnknown({
      message: "db exploded",
      status: 503,
      type: "server_error",
      details: { retryable: true },
    });
    const bodyA = await bodyOf(withDetails);
    assert.equal(bodyA.error.message, "db exploded");
    assert.deepEqual(bodyA.error.details, { retryable: true });

    const fallback = createErrorResponseFromUnknown("boom", "fallback message");
    const bodyB = await bodyOf(fallback);
    assert.equal(fallback.status, 500);
    assert.equal(bodyB.error.message, "fallback message");
  });
});
