import test from "node:test";
import assert from "node:assert/strict";

// Regression for port-from-9router#1318: the OAuth modal called `await res.json()`
// unconditionally, so a non-JSON error response (e.g. a plain-text `Internal Server
// Error` 500 from a Build-OAuth endpoint) threw `Unexpected token 'I'…` instead of
// surfacing the real failure. The shared `parseResponseBody`/`getErrorMessage`
// helpers read the body safely and produce a clean message either way.
const { parseResponseBody, getErrorMessage } = await import("../../src/shared/utils/api.ts");

test("#1318: parseResponseBody returns parsed JSON for a JSON body", async () => {
  const res = new Response(JSON.stringify({ error: "nope" }), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
  assert.deepEqual(await parseResponseBody(res), { error: "nope" });
});

test("#1318: parseResponseBody returns raw text for a non-JSON body (no throw)", async () => {
  const res = new Response("Internal Server Error", { status: 500 });
  assert.equal(await parseResponseBody(res), "Internal Server Error");
});

test("#1318: parseResponseBody returns null for an empty body", async () => {
  const res = new Response("", { status: 200 });
  assert.equal(await parseResponseBody(res), null);
});

test("#1318: getErrorMessage handles string-error, nested-error, plain-text and fallback", () => {
  assert.equal(getErrorMessage({ error: "bad key" }), "bad key");
  assert.equal(getErrorMessage({ error: { message: "expired" } }), "expired");
  assert.equal(getErrorMessage("Internal Server Error"), "Internal Server Error");
  assert.equal(getErrorMessage(null, 500, "Save failed"), "Save failed (HTTP 500)");
});
