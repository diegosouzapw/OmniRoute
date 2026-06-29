import test from "node:test";
import assert from "node:assert/strict";

// GET /api/docs serves the Redoc-rendered API reference (#4781). Static HTML
// shell that loads Redoc from a CDN and points it at /openapi.yaml (the
// canonical spec served from public/openapi.yaml). PUBLIC tier — no auth.
const docsRoute = await import("../../src/app/api/docs/route.ts");

test("GET /api/docs returns a 200 text/html Redoc shell", async () => {
  const response = docsRoute.GET();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /text\/html/);

  const body = await response.text();
  // Renders Redoc and points it at the canonical spec.
  assert.match(body, /redoc/i);
  assert.ok(body.includes("/openapi.yaml"), "Redoc must load the canonical /openapi.yaml spec");
  // No stack traces / secrets leaked into the static shell.
  assert.ok(!body.includes("at /"), "static shell must not leak stack-trace frames");
});

test("GET /api/docs is statically renderable (no per-request work)", () => {
  assert.equal(docsRoute.dynamic, "force-static");
});
