import test from "node:test";
import assert from "node:assert/strict";
import { getCoalescedCatalog } from "../../src/app/api/v1/models/catalogCache.ts";

// The unified model catalog is expensive to build (fan-out across providers) and
// frequently polled. getCoalescedCatalog() serves a short-TTL cache and coalesces
// concurrent identical requests into ONE build. The cache key is namespaced by
// API key (among other axes), so one caller's catalog is never served to another.

function catalogReq(token: string): Request {
  return new Request("https://gw.local/v1/models", {
    headers: { authorization: `Bearer ${token}` },
  });
}

test("cache MISS then HIT within TTL — build runs once, body reused", async () => {
  let builds = 0;
  const build = async () => {
    builds++;
    return new Response(JSON.stringify({ data: [{ id: "m1" }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };
  const r1 = await getCoalescedCatalog(catalogReq("hit-key"), build);
  assert.equal(r1.cacheStatus, "MISS");

  const r2 = await getCoalescedCatalog(catalogReq("hit-key"), build);
  assert.equal(r2.cacheStatus, "HIT");
  assert.equal(builds, 1, "second call within TTL must not rebuild");
  assert.equal(await r2.response.text(), JSON.stringify({ data: [{ id: "m1" }] }));
});

test("concurrent identical requests coalesce into ONE in-flight build", async () => {
  let builds = 0;
  const build = async () => {
    builds++;
    await new Promise((r) => setTimeout(r, 30));
    return new Response(JSON.stringify({ data: [] }), { status: 200 });
  };
  const [a, b] = await Promise.all([
    getCoalescedCatalog(catalogReq("coalesce-key"), build),
    getCoalescedCatalog(catalogReq("coalesce-key"), build),
  ]);
  assert.equal(builds, 1, "concurrent identical requests must share one build");
  assert.equal(a.response.status, 200);
  assert.equal(b.response.status, 200);
});

test("cache key namespaces by API key (no cross-caller catalog leak)", async () => {
  let builds = 0;
  const build = async () => {
    builds++;
    return new Response(JSON.stringify({ data: [{ id: "x" }] }), { status: 200 });
  };
  await getCoalescedCatalog(catalogReq("tenant-a"), build); // MISS -> builds=1
  const rb = await getCoalescedCatalog(catalogReq("tenant-b"), build); // different key -> MISS
  assert.equal(rb.cacheStatus, "MISS");
  assert.equal(builds, 2, "a different API key must not reuse another key's cached catalog");
});
