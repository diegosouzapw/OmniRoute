import { test } from "node:test";
import assert from "node:assert/strict";
import {
  normalizeStreamFailurePayload,
  projectStreamFailureEvent,
  formatTranslatedStreamError,
} from "../../open-sse/utils/streamErrorFormat.ts";

for (const field of ["type", "code"]) {
  for (const shape of ["responses", "claude", "openai"]) {
    test(`${shape} ${field}=invalid_request is request-scoped, not an upstream 502`, () => {
      const error = { [field]: "invalid_request", message: "Synthetic request was rejected" };
      const event =
        shape === "responses"
          ? { type: "response.failed", response: { status: "failed", error, output: [] } }
          : shape === "claude"
            ? { type: "error", error }
            : { error };
      assert.equal(normalizeStreamFailurePayload(event)?.status, 400);
      assert.equal(projectStreamFailureEvent(event)?.internalFailure.status, 400);
      const wire = formatTranslatedStreamError(
        event,
        shape === "responses" ? "openai-responses" : shape
      );
      assert.ok(
        wire.includes("Synthetic request was rejected"),
        "the refusal must still reach the client"
      );
    });
  }
}

test("explicit upstream status still takes precedence", () => {
  assert.equal(
    normalizeStreamFailurePayload({ error: { type: "invalid_request", status: 503 } })?.status,
    503
  );
});

test("unknown provider failures and quota failures retain their scopes", () => {
  assert.equal(
    normalizeStreamFailurePayload({ error: { type: "server_error", message: "Synthetic failure" } })
      ?.status,
    502
  );
  assert.equal(
    normalizeStreamFailurePayload({ error: { code: "rate_limit_exceeded" } })?.status,
    429
  );
});
