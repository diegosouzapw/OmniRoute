import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { extractApiErrorMessage } from "@/shared/http/apiErrorMessage";

describe("extractApiErrorMessage (#5340)", () => {
  it("surfaces the message from a structured error envelope", () => {
    const body = {
      error: { code: "INVALID_ORIGIN", message: "Invalid request origin", correlation_id: "x" },
    };
    assert.equal(extractApiErrorMessage(body, "fallback"), "Invalid request origin");
  });

  it("returns a plain string error as-is", () => {
    assert.equal(extractApiErrorMessage({ error: "boom" }, "fallback"), "boom");
  });

  it("never renders a raw error object — falls back when message is missing", () => {
    assert.equal(extractApiErrorMessage({ error: { code: "X" } }, "fallback"), "fallback");
  });

  it("falls back for empty, null, or malformed bodies", () => {
    assert.equal(extractApiErrorMessage({ error: "  " }, "fallback"), "fallback");
    assert.equal(extractApiErrorMessage(null, "fallback"), "fallback");
    assert.equal(extractApiErrorMessage({}, "fallback"), "fallback");
    assert.equal(extractApiErrorMessage({ error: { message: 42 } }, "fallback"), "fallback");
  });
});
