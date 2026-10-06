import test from "node:test";
import assert from "node:assert/strict";

// Regression test for the providers-route PATCH gap: the OpenAPI spec and the
// CLI (`omniroute providers rotate`, generated api-commands) both use
// PATCH /api/providers/[id], but the route only implemented PUT — PATCH
// requests 405'd and `providers rotate --new-key` silently failed while
// reporting success. See PR fix: the route now exports a PATCH handler that
// delegates to PUT (both apply the same partial-update schema).

async function loadRoute() {
  return await import(new URL("../../src/app/api/providers/[id]/route.ts", import.meta.url));
}

test("providers [id] route exports a PATCH handler (CLI rotate 405 regression)", async () => {
  const route = await loadRoute();
  assert.equal(
    typeof route.PATCH,
    "function",
    "PATCH handler must exist — CLI rotate sends PATCH per the OpenAPI spec"
  );
});

test("PATCH handler delegates to PUT (same partial-update semantics)", async () => {
  const route = await loadRoute();
  // The PATCH export delegates to PUT; both share the same update logic and
  // are distinct function references (wrapper). A fixed status expectation is
  // environment-dependent: management auth is enforced on dev (PUT returns 401
  // without a credential) but NOT in the CI unit-test env, where the flow
  // falls through to "Connection not found" (404) for an unknown id. So assert
  // on delegation equivalence instead: PATCH must never 405 (the regression)
  // and must return the exact same status as PUT for the same input.
  const ctx = { params: Promise.resolve({ id: "test-id" }) };
  // Fresh Request per invocation: PUT reads the body via request.json(),
  // which consumes the body stream — reusing one Request for both calls would
  // give the second call an empty body (400 validation) vs the first (404
  // not-found), a false mismatch. Identical inputs must produce identical
  // statuses.
  const patchRequest = new Request("http://localhost/api/providers/test-id", {
    method: "PATCH",
    body: JSON.stringify({ name: "x" }),
  });
  const putRequest = new Request("http://localhost/api/providers/test-id", {
    method: "PUT",
    body: JSON.stringify({ name: "x" }),
  });
  const patchResult = await route.PATCH(patchRequest, ctx);
  const putResult = await route.PUT(putRequest, ctx);
  assert.ok(patchResult, "PATCH should return a response, not 405");
  assert.notEqual(
    patchResult.status,
    405,
    "PATCH must be routed — before the fix Next.js returned 405 Method Not Allowed"
  );
  assert.equal(
    patchResult.status,
    putResult.status,
    "PATCH must delegate to PUT's handler (identical status for the same input)"
  );
});

test("providers [id] route still exports PUT and DELETE handlers", async () => {
  const route = await loadRoute();
  assert.equal(typeof route.PUT, "function");
  assert.equal(typeof route.DELETE, "function");
});
