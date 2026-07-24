import test from "node:test";
import assert from "node:assert/strict";
import {
  clearLatestVersionCache,
  resolveLatestVersionCached,
} from "@/lib/system/versionCheck";

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

test.beforeEach(() => clearLatestVersionCache());

test("coalesces concurrent latest-version resolution into one lookup", async () => {
  let calls = 0;
  const pending = deferred<string | null>();
  const lookup = () => {
    calls += 1;
    return pending.promise;
  };

  const requests = Array.from({ length: 10 }, () => resolveLatestVersionCached({ lookup }));
  assert.equal(calls, 1);
  pending.resolve("3.8.50");
  assert.deepEqual(await Promise.all(requests), Array(10).fill("3.8.50"));
});

test("reuses a successful result only inside the bounded TTL", async () => {
  let now = 1_000;
  let calls = 0;
  const lookup = async () => `3.8.${++calls + 49}`;

  assert.equal(await resolveLatestVersionCached({ lookup, now: () => now, ttlMs: 500 }), "3.8.50");
  now = 1_499;
  assert.equal(await resolveLatestVersionCached({ lookup, now: () => now, ttlMs: 500 }), "3.8.50");
  now = 1_500;
  assert.equal(await resolveLatestVersionCached({ lookup, now: () => now, ttlMs: 500 }), "3.8.51");
  assert.equal(calls, 2);
});

test("explicit refresh bypasses an ordinary in-flight lookup and coalesces with refreshes", async () => {
  let calls = 0;
  const ordinary = deferred<string | null>();
  const refresh = deferred<string | null>();
  const lookup = () => {
    calls += 1;
    return calls === 1 ? ordinary.promise : refresh.promise;
  };

  const stale = resolveLatestVersionCached({ lookup });
  const firstRefresh = resolveLatestVersionCached({ lookup, bypassCache: true });
  const secondRefresh = resolveLatestVersionCached({ lookup, bypassCache: true });
  assert.equal(calls, 2);

  ordinary.resolve("3.8.49");
  refresh.resolve("3.8.50");
  assert.equal(await stale, "3.8.49");
  assert.deepEqual(await Promise.all([firstRefresh, secondRefresh]), ["3.8.50", "3.8.50"]);
  assert.equal(await resolveLatestVersionCached({ lookup }), "3.8.50");
  assert.equal(calls, 2);
});

test("no-store refresh does not populate the process cache", async () => {
  let calls = 0;
  const lookup = async () => `3.8.${++calls + 49}`;

  assert.equal(
    await resolveLatestVersionCached({ lookup, bypassCache: true, storeResult: false }),
    "3.8.50"
  );
  assert.equal(await resolveLatestVersionCached({ lookup }), "3.8.51");
  assert.equal(calls, 2);
});

test("cache invalidation prevents an older in-flight result from repopulating the cache", async () => {
  let calls = 0;
  const pending = deferred<string | null>();
  const first = resolveLatestVersionCached({
    lookup: () => {
      calls += 1;
      return pending.promise;
    },
  });

  clearLatestVersionCache();
  pending.resolve("3.8.50");
  assert.equal(await first, "3.8.50");
  assert.equal(
    await resolveLatestVersionCached({ lookup: async () => `3.8.${++calls + 49}` }),
    "3.8.51"
  );
});

test("failed and unavailable lookups are not cached and leave no stale singleflight", async () => {
  let calls = 0;
  const lookup = async () => {
    calls += 1;
    if (calls === 1) throw new Error("lookup failed");
    if (calls === 2) return null;
    return "3.8.50";
  };

  await assert.rejects(resolveLatestVersionCached({ lookup }), /lookup failed/);
  assert.equal(await resolveLatestVersionCached({ lookup }), null);
  assert.equal(await resolveLatestVersionCached({ lookup }), "3.8.50");
  assert.equal(await resolveLatestVersionCached({ lookup }), "3.8.50");
  assert.equal(calls, 3);
});
