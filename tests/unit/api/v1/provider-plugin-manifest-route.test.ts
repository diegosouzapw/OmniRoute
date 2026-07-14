import assert from "node:assert/strict";
import test from "node:test";

import { GET } from "../../../../src/app/api/v1/provider-plugin-manifest/route.ts";

test("provider plugin manifest returns a stable ETag with its cache policy", async () => {
  const response = await GET(new Request("http://localhost/api/v1/provider-plugin-manifest"));

  assert.equal(response.status, 200);
  assert.equal(response.headers.get("Cache-Control"), "public, max-age=60");
  assert.match(response.headers.get("ETag") ?? "", /^"[A-Za-z0-9_-]+"$/);
  assert.equal(response.headers.get("Content-Type"), "application/json");
  assert.equal((await response.json()).schemaVersion, 1);
});

test("provider plugin manifest supports conditional sidecar refreshes", async () => {
  const initial = await GET(new Request("http://localhost/api/v1/provider-plugin-manifest"));
  const etag = initial.headers.get("ETag");

  const response = await GET(
    new Request("http://localhost/api/v1/provider-plugin-manifest", {
      headers: { "If-None-Match": etag ?? "" },
    })
  );

  assert.equal(response.status, 304);
  assert.equal(response.headers.get("ETag"), etag);
  assert.equal(await response.text(), "");
});

test("provider plugin manifest accepts weak conditional validators", async () => {
  const initial = await GET(new Request("http://localhost/api/v1/provider-plugin-manifest"));
  const etag = initial.headers.get("ETag");

  const response = await GET(
    new Request("http://localhost/api/v1/provider-plugin-manifest", {
      headers: { "If-None-Match": `W/${etag}` },
    })
  );

  assert.equal(response.status, 304);
});
