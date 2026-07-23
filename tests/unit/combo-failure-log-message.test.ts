import assert from "node:assert/strict";
import test from "node:test";

const { getComboFailureLogError } = await import("../../src/sse/handlers/comboFailureLogging.ts");

test("combo failure log preserves the concrete response error", async () => {
  const response = new Response(
    JSON.stringify({
      error: {
        message: "Request context exceeds every known target limit",
        code: "context_length_exceeded",
      },
    }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );

  assert.equal(
    await getComboFailureLogError(response, "large-context-combo"),
    "[400] Request context exceeds every known target limit"
  );
});

test("combo failure log uses a neutral fallback for an unreadable response", async () => {
  const response = new Response("not-json", { status: 503 });
  assert.equal(
    await getComboFailureLogError(response, "temporary-combo"),
    '[503] Combo "temporary-combo" failed'
  );
});
