import test from "node:test";
import assert from "node:assert/strict";

/**
 * Regression: issue #6405 — unknown /v1/* routes returned HTML dashboard 404
 * instead of a JSON error. Ensure the app-router catch-all under
 * `src/app/api/v1/[...omnirouteCatchAll]/route.ts` responds with a proper
 * OpenAI-compatible JSON not-found body for every HTTP method.
 */

const catchAll = await import(
  "../../../src/app/api/v1/[...omnirouteCatchAll]/route.ts"
);

function makeReq(pathname: string, method = "GET"): Request {
  return new Request(`http://localhost:20128${pathname}`, { method });
}

test("v1 catchall returns application/json 404 with not_found error type on GET", async () => {
  const res = await catchAll.GET(makeReq("/v1/does-not-exist"));
  assert.equal(res.status, 404);
  const ct = res.headers.get("content-type") || "";
  assert.ok(ct.includes("application/json"), `expected JSON content-type, got: ${ct}`);
  const body = (await res.json()) as {
    error: { type: string; message: string; code?: string; path?: string };
  };
  assert.equal(body.error.type, "not_found");
  assert.equal(body.error.path, "/v1/does-not-exist");
  assert.match(body.error.message, /Unknown API route/);
});

test("v1 catchall returns JSON 404 on POST / PUT / PATCH / DELETE / HEAD", async () => {
  for (const method of ["POST", "PUT", "PATCH", "DELETE", "HEAD"] as const) {
    const res = await (catchAll as Record<string, (r: Request) => Promise<Response>>)[
      method
    ](makeReq(`/v1/nope/${method.toLowerCase()}`, method));
    assert.equal(res.status, 404, `${method} status`);
    assert.ok(
      (res.headers.get("content-type") || "").includes("application/json"),
      `${method} content-type`,
    );
  }
});

test("v1 catchall OPTIONS preflight returns CORS headers", async () => {
  // Note: `Access-Control-Allow-Origin` is applied by the global middleware
  // (`src/middleware.ts`), not by handlers directly. The handler is only
  // responsible for the static methods/allowed-headers piece.
  const res = await catchAll.OPTIONS();
  assert.ok(
    res.headers.get("access-control-allow-methods"),
    "OPTIONS must expose CORS methods header",
  );
});
