import test from "node:test";
import assert from "node:assert/strict";

/**
 * Regression: issue #6405 follow-up — unknown root-level paths (/anthropic/*,
 * /openai/*, /metrics, /debug, /.env) previously fell through to the Next.js
 * app-router `not-found.tsx`, which returned the dashboard HTML shell (~200 KB)
 * to CLI/SDK callers. next.config.mjs now rewrites those prefixes under /api/*
 * so they hit `/api/[...omnirouteApiCatchAll]` (#6424) — this suite verifies
 * that catch-all still responds with a JSON not_found body for those rewritten
 * paths (path assertion mirrors the URL the handler sees post-rewrite).
 */

const catchAll = await import(
  "../../../src/app/api/[...omnirouteApiCatchAll]/route.ts"
);

function makeReq(pathname: string, method = "GET"): Request {
  return new Request(`http://localhost:20128${pathname}`, { method });
}

test("api catchall returns JSON 404 for rewritten /anthropic/v1/messages POST", async () => {
  // Post-rewrite path the handler sees: /api/anthropic/v1/messages
  const res = await catchAll.POST(makeReq("/api/anthropic/v1/messages", "POST"));
  assert.equal(res.status, 404);
  const ct = res.headers.get("content-type") || "";
  assert.ok(ct.includes("application/json"), `expected JSON content-type, got: ${ct}`);
  const body = (await res.json()) as {
    error: { type: string; message: string; code?: string; path?: string };
  };
  assert.equal(body.error.type, "not_found");
  assert.equal(body.error.path, "/api/anthropic/v1/messages");
  assert.match(body.error.message, /Unknown API route/);
});

test("api catchall returns JSON 404 for rewritten /openai/v1/chat/completions", async () => {
  const res = await catchAll.POST(makeReq("/api/openai/v1/chat/completions", "POST"));
  assert.equal(res.status, 404);
  const body = (await res.json()) as { error: { type: string; path?: string } };
  assert.equal(body.error.type, "not_found");
  assert.equal(body.error.path, "/api/openai/v1/chat/completions");
});

test("api catchall returns JSON 404 for rewritten /metrics", async () => {
  const res = await catchAll.GET(makeReq("/api/metrics"));
  assert.equal(res.status, 404);
  const ct = res.headers.get("content-type") || "";
  assert.ok(ct.includes("application/json"), `expected JSON content-type, got: ${ct}`);
  const body = (await res.json()) as { error: { type: string; path?: string } };
  assert.equal(body.error.type, "not_found");
});

test("api catchall returns JSON 404 for rewritten /debug and /.env", async () => {
  for (const p of ["/api/debug", "/api/.env"] as const) {
    const res = await catchAll.GET(makeReq(p));
    assert.equal(res.status, 404, `${p} status`);
    assert.ok(
      (res.headers.get("content-type") || "").includes("application/json"),
      `${p} content-type`,
    );
    const body = (await res.json()) as { error: { type: string } };
    assert.equal(body.error.type, "not_found", `${p} error.type`);
  }
});

test("api catchall returns JSON 404 for unknown /v1beta/* via nested api catch-all", async () => {
  // /v1beta/foo rewrites to /api/v1beta/foo; since no v1beta-specific
  // catch-all exists, Next.js falls through to /api/[...omnirouteApiCatchAll].
  const res = await catchAll.GET(makeReq("/api/v1beta/nonexistent"));
  assert.equal(res.status, 404);
  const body = (await res.json()) as { error: { type: string; path?: string } };
  assert.equal(body.error.type, "not_found");
  assert.equal(body.error.path, "/api/v1beta/nonexistent");
});

test("api catchall OPTIONS preflight exposes CORS headers for rewritten paths", async () => {
  const res = await catchAll.OPTIONS();
  assert.ok(
    res.headers.get("access-control-allow-methods"),
    "OPTIONS must expose CORS methods header",
  );
});
