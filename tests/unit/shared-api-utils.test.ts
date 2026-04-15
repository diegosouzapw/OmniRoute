import test from "node:test";
import assert from "node:assert/strict";

import api, { get, post, put, del } from "../../src/shared/utils/api.ts";

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("shared api utils send JSON requests with merged headers", async () => {
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push({ url, options });
    return new Response(JSON.stringify({ ok: true, url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  const getResult = await get("http://localhost/get", {
    headers: { Authorization: "Bearer token" },
  });
  const postResult = await post(
    "http://localhost/post",
    { hello: "world" },
    { headers: { "X-Test": "1" } }
  );
  const putResult = await put(
    "http://localhost/put",
    { enabled: true },
    { headers: { "X-Put": "1" } }
  );
  const deleteResult = await api.del("http://localhost/delete", {
    headers: { "X-Delete": "1" },
  });

  assert.deepEqual(getResult, { ok: true, url: "http://localhost/get" });
  assert.deepEqual(postResult, { ok: true, url: "http://localhost/post" });
  assert.deepEqual(putResult, { ok: true, url: "http://localhost/put" });
  assert.deepEqual(deleteResult, { ok: true, url: "http://localhost/delete" });

  assert.deepEqual(
    calls.map(({ url, options }) => ({
      url,
      method: options.method,
      headers: options.headers,
      body: options.body ?? null,
    })),
    [
      {
        url: "http://localhost/get",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer token",
        },
        body: null,
      },
      {
        url: "http://localhost/post",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Test": "1",
        },
        body: JSON.stringify({ hello: "world" }),
      },
      {
        url: "http://localhost/put",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Put": "1",
        },
        body: JSON.stringify({ enabled: true }),
      },
      {
        url: "http://localhost/delete",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Delete": "1",
        },
        body: null,
      },
    ]
  );
});

test("shared api utils throw enriched errors for non-OK responses", async () => {
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: "bad request", detail: "broken payload" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });

  await assert.rejects(
    () => del("http://localhost/delete"),
    (error) => {
      assert.equal(error.message, "bad request");
      assert.equal(error.status, 400);
      assert.deepEqual(error.data, { error: "bad request", detail: "broken payload" });
      return true;
    }
  );
});
