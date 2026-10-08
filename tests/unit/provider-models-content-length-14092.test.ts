/**
 * #14092 — the provider-models and vscode catalog routes re-serialize a filtered
 * catalog body but used to forward the catalog's own `content-length` onto it.
 * A client then saw the full catalog's byte length (~833 KB) on a much smaller
 * body and the response never completed (the dashboard model picker stayed on
 * "loading" forever).
 *
 * These tests drive the real route handlers (temp DATA_DIR, loopback request,
 * no credentials — the same bootstrap shape the other route tests use) and
 * assert no stale length header survives re-serialization.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cat-len-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// The first catalog build is cold and, on a loaded box, can outlast the 8s default
// bound (`CATALOG_BUILD_TIMEOUT_MS`), turning the route into a 503 before it ever
// re-serializes. Lift the bound so the test exercises the re-serialization path.
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";

const core = await import("../../src/lib/db/core.ts");
const { GET } = await import("../../src/app/api/v1/providers/[provider]/models/route.ts");
const { getVscodeModelsCatalogResponse } =
  await import("../../src/app/api/v1/vscode/[token]/models/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function assertNoStaleLength(response: Response, body: string, label: string) {
  const declared = response.headers.get("content-length");
  if (declared !== null) {
    assert.equal(
      Number(declared),
      Buffer.byteLength(body),
      `${label}: content-length must describe the re-serialized body`
    );
  }
  assert.equal(
    response.headers.get("transfer-encoding"),
    null,
    `${label}: transfer-encoding must not be forwarded onto a buffered body`
  );
}

test("provider models route re-serializes without the catalog's stale content-length", async () => {
  const request = new Request("http://127.0.0.1:20128/api/v1/providers/opencode/models");
  const response = await GET(request, { params: Promise.resolve({ provider: "opencode" }) });

  assert.equal(response.status, 200);
  const text = await response.text();
  assertNoStaleLength(response, text, "providers route");
  const payload = JSON.parse(text) as { object?: string; data?: unknown };
  assert.ok(Array.isArray(payload.data), "route must return a model list");
});

test("vscode catalog helper drops stale length headers and keeps the cache headers", async () => {
  const request = new Request("http://127.0.0.1:20128/api/v1/vscode/tok/api/models");
  const catalog = await getVscodeModelsCatalogResponse(request);

  assert.equal(catalog.status, 200);
  assert.equal(catalog.headers["content-length"], undefined);
  assert.equal(catalog.headers["transfer-encoding"], undefined);
  assert.equal(catalog.headers.Pragma, "no-cache", "cache headers must survive the strip");

  const response = Response.json(catalog.body, {
    status: catalog.status,
    headers: catalog.headers,
  });
  assertNoStaleLength(response, await response.text(), "vscode helper");
});

/**
 * Uplift (review-group-prs #14120 analysis): the original PR hand-rolled
 * `headers.delete("content-length")` / `delete headers["transfer-encoding"]`
 * on both routes instead of reusing the existing
 * `stripStaleEncodingHeaders()` / `filterUpstreamResponseHeaderEntries()`
 * helpers (open-sse/utils/upstreamResponseHeaders.ts) — which also strip
 * `content-encoding`, a residual instance of the same "stale header survives
 * re-serialization" bug class (a re-serialized JSON body is never actually
 * gzip-encoded, so a forwarded `content-encoding: gzip` makes the client
 * fail to gunzip plain text).
 *
 * Neither route can carry a real `content-encoding` header end-to-end today
 * (verified: nothing in the `/v1/models` catalog build path — `catalog.ts`,
 * `catalogCache.ts`, `catalogPagination.ts` — ever sets one, so there is no
 * live upstream-fetch seam to inject it through for a full route-level
 * repro). This test instead drives the exact shared functions both routes
 * now call, with the same header shape a stale upstream response would
 * carry, which is what actually changed here.
 */
test("shared strip utilities used by both routes also drop content-encoding (residual bug class)", async () => {
  const { stripStaleEncodingHeaders, filterUpstreamResponseHeaderEntries } =
    await import("../../open-sse/utils/upstreamResponseHeaders.ts");

  const staleHeaders = new Headers({
    "content-length": "833000",
    "content-encoding": "gzip",
    "transfer-encoding": "chunked",
    "x-keep-me": "1",
  });

  const strippedHeaders = stripStaleEncodingHeaders(staleHeaders);
  assert.equal(strippedHeaders.get("content-length"), null);
  assert.equal(strippedHeaders.get("content-encoding"), null);
  assert.equal(strippedHeaders.get("transfer-encoding"), null);
  assert.equal(strippedHeaders.get("x-keep-me"), "1", "unrelated headers must survive the strip");

  const filteredEntries = Object.fromEntries(
    filterUpstreamResponseHeaderEntries(staleHeaders.entries())
  );
  assert.equal(filteredEntries["content-length"], undefined);
  assert.equal(filteredEntries["content-encoding"], undefined);
  assert.equal(filteredEntries["transfer-encoding"], undefined);
  assert.equal(filteredEntries["x-keep-me"], "1", "unrelated headers must survive the filter");
});
