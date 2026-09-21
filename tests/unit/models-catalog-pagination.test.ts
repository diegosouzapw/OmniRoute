import test from "node:test";
import assert from "node:assert/strict";

import {
  applyCatalogPage,
  CATALOG_BODY_CHUNK_BYTES,
  catalogJsonResponse,
  catalogPageCacheKey,
  catalogStringResponse,
  parseCatalogPage,
} from "../../src/app/api/v1/models/catalogPagination.ts";

function req(url: string): Request {
  return new Request(url);
}

test("parseCatalogPage treats missing params as a full list", () => {
  assert.deepEqual(parseCatalogPage(req("http://local/v1/models")), { after: null, limit: null });
});

test("parseCatalogPage accepts OpenAI-compatible limit and after", () => {
  assert.deepEqual(parseCatalogPage(req("http://local/v1/models?limit=20&after=gpt-4o")), {
    after: "gpt-4o",
    limit: 20,
  });
});

test("parseCatalogPage ignores non-positive limits", () => {
  assert.deepEqual(parseCatalogPage(req("http://local/v1/models?limit=0&after=")), {
    after: null,
    limit: null,
  });
});

test("applyCatalogPage slices after a cursor and reports has_more", () => {
  const models = [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }];
  const page = applyCatalogPage(models, { after: "b", limit: 1 });
  assert.deepEqual(page, { models: [{ id: "c" }], hasMore: true, lastId: "c" });
});

test("applyCatalogPage returns the remainder when limit exceeds the tail", () => {
  const models = [{ id: "a" }, { id: "b" }, { id: "c" }];
  const page = applyCatalogPage(models, { after: "b", limit: 10 });
  assert.deepEqual(page, { models: [{ id: "c" }], hasMore: false, lastId: "c" });
});

test("catalogPageCacheKey distinguishes pages so cached bodies do not mix", () => {
  assert.notEqual(
    catalogPageCacheKey({ after: null, limit: 10 }),
    catalogPageCacheKey({ after: "gpt-4o", limit: 10 })
  );
});

test("catalogJsonResponse sets Content-Length to the full UTF-8 byte count", async () => {
  const body = { object: "list", data: [{ id: "x", name: "café" }] };
  const response = catalogJsonResponse(body, {});
  const payload = JSON.stringify(body);
  assert.equal(response.headers.get("content-length"), String(Buffer.byteLength(payload)));
  assert.equal(await response.text(), payload);
});

test("catalogStringResponse streams large bodies without cutting mid-JSON", async () => {
  const payload = JSON.stringify({
    object: "list",
    data: Array.from({ length: 80 }, (_, i) => ({
      id: `model-${i}`,
      filler: "x".repeat(2_000),
    })),
  });
  assert.ok(Buffer.byteLength(payload) > CATALOG_BODY_CHUNK_BYTES);

  const response = catalogStringResponse(payload, {});
  assert.equal(response.headers.get("content-length"), String(Buffer.byteLength(payload)));
  const text = await response.text();
  assert.equal(text.length, payload.length);
  assert.equal(text, payload);
  const parsed = JSON.parse(text) as { data: unknown[] };
  assert.equal(parsed.data.length, 80);
});
