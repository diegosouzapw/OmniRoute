import assert from "node:assert/strict";
import test from "node:test";

import {
  ANTIGRAVITY_CLI_FALLBACK_VERSION,
  ANTIGRAVITY_VERSION_CACHE_TTL_MS,
  clearAntigravityVersionCaches,
  getCachedAntigravityCliVersion,
  resolveAntigravityCliVersion,
  seedAntigravityCliVersionCache,
} from "../../open-sse/services/antigravityVersion.ts";

const originalDateNow = Date.now;

test.afterEach(() => {
  Date.now = originalDateNow;
  clearAntigravityVersionCaches();
});

test("CLI starts with the captured fallback version", () => {
  assert.equal(getCachedAntigravityCliVersion(), ANTIGRAVITY_CLI_FALLBACK_VERSION);
  assert.equal(ANTIGRAVITY_CLI_FALLBACK_VERSION, "1.2.0");
});

test("CLI resolver reads the official Google GitHub release and caches it", async () => {
  const urls: string[] = [];
  const fetchMock = async (url: string | URL | Request) => {
    urls.push(String(url));
    return new Response(JSON.stringify({ tag_name: "v1.3.0", name: "1.3.0" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  assert.equal(await resolveAntigravityCliVersion(fetchMock as typeof fetch), "1.3.0");
  assert.equal(await resolveAntigravityCliVersion(fetchMock as typeof fetch), "1.3.0");
  assert.equal(urls.length, 1);
  assert.equal(
    urls[0],
    "https://api.github.com/repos/google-antigravity/antigravity-cli/releases/latest"
  );
  assert.equal(getCachedAntigravityCliVersion(), "1.3.0");
});

test("CLI resolver keeps a newer cached version when a later release response is older", async () => {
  let now = 1_000;
  Date.now = () => now;
  seedAntigravityCliVersionCache("1.4.0", now);
  now += ANTIGRAVITY_VERSION_CACHE_TTL_MS + 1;

  const olderFeedFetch = async () =>
    new Response(JSON.stringify({ tag_name: "1.3.0" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  assert.equal(await resolveAntigravityCliVersion(olderFeedFetch as typeof fetch), "1.4.0");
  assert.equal(getCachedAntigravityCliVersion(), "1.4.0");
});

test("CLI resolver falls back to its own last known good version", async () => {
  const failingFetch = async () => {
    throw new Error("network down");
  };

  assert.equal(
    await resolveAntigravityCliVersion(failingFetch as typeof fetch),
    ANTIGRAVITY_CLI_FALLBACK_VERSION
  );

  seedAntigravityCliVersionCache("1.3.0", 0);
  assert.equal(await resolveAntigravityCliVersion(failingFetch as typeof fetch), "1.3.0");
});

test("concurrent requests coalesce into a single release fetch", async () => {
  let calls = 0;
  let release: (() => void) | undefined;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });

  const fetchMock = async () => {
    calls += 1;
    await gate;
    return new Response(JSON.stringify({ tag_name: "1.4.0" }), { status: 200 });
  };

  const one = resolveAntigravityCliVersion(fetchMock as typeof fetch);
  const two = resolveAntigravityCliVersion(fetchMock as typeof fetch);
  release?.();

  assert.deepEqual(await Promise.all([one, two]), ["1.4.0", "1.4.0"]);
  assert.equal(calls, 1);
});
