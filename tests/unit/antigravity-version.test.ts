import test from "node:test";
import assert from "node:assert/strict";

import {
  ANTIGRAVITY_FALLBACK_VERSION,
  ANTIGRAVITY_VERSION_CACHE_TTL_MS,
  clearAntigravityVersionCache,
  getCachedAntigravityVersion,
  resolveAntigravityVersion,
  seedAntigravityVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";

const originalDateNow = Date.now;

test.afterEach(() => {
  Date.now = originalDateNow;
  clearAntigravityVersionCache();
});

test("resolveAntigravityVersion uses the official release feed and caches the result for 6 hours", async () => {
  let calls = 0;
  const fetchMock = async () => {
    calls += 1;
    return new Response(JSON.stringify([{ version: "4.2.0", execution_id: "4781536860569600" }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  const first = await resolveAntigravityVersion(fetchMock as typeof fetch);
  const second = await resolveAntigravityVersion(fetchMock as typeof fetch);

  assert.equal(first, "4.2.0");
  assert.equal(second, "4.2.0");
  assert.equal(calls, 1);
  assert.equal(getCachedAntigravityVersion(), "4.2.0");
});

test("resolveAntigravityVersion refreshes the cache after the TTL elapses", async () => {
  let now = 1_000;
  Date.now = () => now;

  const firstFetch = async () =>
    new Response(JSON.stringify([{ version: "4.2.0" }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  const secondFetch = async () =>
    new Response(JSON.stringify([{ version: "4.3.0" }]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  assert.equal(await resolveAntigravityVersion(firstFetch as typeof fetch), "4.2.0");

  now += ANTIGRAVITY_VERSION_CACHE_TTL_MS + 1;

  assert.equal(await resolveAntigravityVersion(secondFetch as typeof fetch), "4.3.0");
  assert.equal(getCachedAntigravityVersion(), "4.3.0");
});

test("resolveAntigravityVersion falls back to the last known good version or bundled fallback", async () => {
  const failingFetch = async () => {
    throw new Error("network down");
  };

  assert.equal(
    await resolveAntigravityVersion(failingFetch as typeof fetch),
    ANTIGRAVITY_FALLBACK_VERSION
  );

  seedAntigravityVersionCache("4.2.1", 0);
  assert.equal(await resolveAntigravityVersion(failingFetch as typeof fetch), "4.2.1");
});

test("resolveAntigravityVersion parses GitHub-style tag_name payloads with or without a v prefix", async () => {
  let calls = 0;
  const fetchMock = async () => {
    calls += 1;
    if (calls === 1) {
      return new Response(JSON.stringify({ malformed: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ tag_name: "v4.2.3" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  assert.equal(await resolveAntigravityVersion(fetchMock as typeof fetch), "4.2.3");
});
