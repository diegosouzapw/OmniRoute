import test from "node:test";
import assert from "node:assert/strict";

/**
 * Regression: issue #6424 — unknown paths under /api/* (outside /api/v1/*)
 * returned the Next.js dashboard HTML 404 shell instead of JSON. This made
 * management-auth failures indistinguishable from missing routes, and forced
 * CLI/SDK callers to parse ~463 KB of HTML.
 *
 * Complements the /v1/* catch-all from #6405; asserts the app-router catch-all
 * under `src/app/api/[...omnirouteApiCatchAll]/route.ts` returns JSON for
 * every HTTP method.
 */

const catchAll = await import(
  "../../../src/app/api/[...omnirouteApiCatchAll]/route.ts"
);

function makeReq(pathname: string, method = "GET"): Request {
  return new Request(`http://localhost:20128${pathname}`, { method });
}

test("/api catchall returns application/json 404 with not_found type on GET", async () => {
  const res = await catchAll.GET(makeReq("/api/context/rtk/does-not-exist"));
  assert.equal(res.status, 404);
  const ct = res.headers.get("content-type") || "";
  assert.ok(ct.includes("application/json"), `expected JSON content-type, got: ${ct}`);
  const body = (await res.json()) as {
    error: { type: string; message: string; code?: string; path?: string };
  };
  assert.equal(body.error.type, "not_found");
  assert.equal(body.error.path, "/api/context/rtk/does-not-exist");
  assert.match(body.error.message, /Unknown API route/);
});

test("/api catchall returns JSON 404 on POST / PUT / PATCH / DELETE / HEAD", async () => {
  for (const method of ["POST", "PUT", "PATCH", "DELETE", "HEAD"] as const) {
    const res = await (catchAll as Record<string, (r: Request) => Promise<Response>>)[
      method
    ](makeReq(`/api/settings/nope/${method.toLowerCase()}`, method));
    assert.equal(res.status, 404, `${method} status`);
    assert.ok(
      (res.headers.get("content-type") || "").includes("application/json"),
      `${method} content-type`,
    );
  }
});

test("/api catchall OPTIONS preflight returns CORS headers", async () => {
  const res = await catchAll.OPTIONS();
  assert.ok(
    res.headers.get("access-control-allow-methods"),
    "OPTIONS must expose CORS methods header",
  );
});
