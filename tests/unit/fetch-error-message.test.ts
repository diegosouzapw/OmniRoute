import test from "node:test";
import assert from "node:assert/strict";

import { readFetchErrorMessage } from "../../src/shared/utils/fetchError.ts";

const FALLBACK = "An error occurred";

function jsonResponse(body: unknown, status = 500) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// #3356: the Analytics page rendered a generic "An error occurred" because it
// discarded the server's error body. The page must surface the real (already
// sanitized server-side) message instead.

test("reads the OpenAI-style { error: { message } } shape from buildErrorBody", async () => {
  const res = jsonResponse({ error: { message: "Failed to compute analytics", type: "api_error" } });
  assert.equal(await readFetchErrorMessage(res, FALLBACK), "Failed to compute analytics");
});

test("reads the legacy { error: '...' } string shape", async () => {
  const res = jsonResponse({ error: "no such column: combo_name" });
  assert.equal(await readFetchErrorMessage(res, FALLBACK), "no such column: combo_name");
});

test("trims surrounding whitespace from the extracted message", async () => {
  const res = jsonResponse({ error: { message: "  boom  " } });
  assert.equal(await readFetchErrorMessage(res, FALLBACK), "boom");
});

test("falls back when the error message is blank", async () => {
  const res = jsonResponse({ error: { message: "   " } });
  assert.equal(await readFetchErrorMessage(res, FALLBACK), FALLBACK);
});

test("falls back when there is no error field", async () => {
  const res = jsonResponse({ data: 1 });
  assert.equal(await readFetchErrorMessage(res, FALLBACK), FALLBACK);
});

test("falls back on a non-JSON body without throwing", async () => {
  const res = new Response("<html>500 Internal Server Error</html>", { status: 500 });
  assert.equal(await readFetchErrorMessage(res, FALLBACK), FALLBACK);
});
