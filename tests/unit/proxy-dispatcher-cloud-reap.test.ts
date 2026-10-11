/**
 * Cloud pool reap on unreachable errors.
 *
 * The shared cloud dispatcher pool used to survive its own unreachable
 * error: only the local-egress pool was evicted, so a stale keep-alive
 * socket in the cloud pool was served again until restart. These tests pin
 * the reap: the failed pool is evicted, the healthy pool survives, and the
 * cloud reap happens at most once per window under a persistent outage.
 */
import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

import {
  getDefaultDispatcher,
  getRetryDispatcher,
  clearDispatcherCache,
  isLocalEgressHostname,
} from "../../open-sse/utils/proxyDispatcher.ts";
import {
  getDefaultCachedDispatcher,
  getRetryCachedDispatcher,
  getLocalDefaultCachedDispatcher,
  getLocalRetryCachedDispatcher,
} from "../../open-sse/utils/proxyDispatcherCache.ts";
import {
  maybeReapDispatcherPool,
  REAP_MIN_INTERVAL_MS,
  __resetDispatcherReapForTest,
  __dispatcherReapSizeForTest,
} from "../../open-sse/utils/proxyDispatcherReap.ts";
import { proxyFetch } from "../../open-sse/utils/proxyFetch.ts";

const CLOUD_HOST = "api.example.com";
const LOCAL_HOST = "host.docker.internal";

afterEach(() => {
  clearDispatcherCache();
  __resetDispatcherReapForTest();
});

function connectionRefused(): Error {
  const cause = new Error("connect ECONNREFUSED") as Error & { code?: string };
  cause.code = "ECONNREFUSED";
  const err = new Error("fetch failed") as Error & { cause?: Error };
  err.cause = cause;
  return err;
}

describe("maybeReapDispatcherPool()", () => {
  it("reaps the cloud pool on proxy unreachable", () => {
    const before = getDefaultDispatcher(CLOUD_HOST);
    assert.notEqual(getDefaultCachedDispatcher(), undefined, "precondition: cloud pool set");

    maybeReapDispatcherPool(CLOUD_HOST, isLocalEgressHostname(CLOUD_HOST), 1_000);

    assert.equal(getDefaultCachedDispatcher(), undefined, "cloud pool must be evicted");
    const after = getDefaultDispatcher(CLOUD_HOST);
    assert.notEqual(after, before, "next request must build a fresh pool");
  });

  it("bounds cloud reaps to one per window", () => {
    maybeReapDispatcherPool(CLOUD_HOST, false, 1_000);
    const rebuilt = getDefaultDispatcher(CLOUD_HOST);

    maybeReapDispatcherPool(CLOUD_HOST, false, 1_000 + REAP_MIN_INTERVAL_MS - 1);

    assert.equal(
      getDefaultCachedDispatcher(),
      rebuilt,
      "a second failure inside the window must reuse the pool"
    );

    maybeReapDispatcherPool(CLOUD_HOST, false, 1_000 + REAP_MIN_INTERVAL_MS);

    assert.equal(
      getDefaultCachedDispatcher(),
      undefined,
      "a failure past the window must evict the pool again"
    );
  });

  it("keeps the immediate local reap", () => {
    maybeReapDispatcherPool(LOCAL_HOST, true, 1_000);
    getDefaultDispatcher(LOCAL_HOST);

    maybeReapDispatcherPool(LOCAL_HOST, true, 1_001);

    assert.equal(
      getLocalDefaultCachedDispatcher(),
      undefined,
      "local pool must reap on every failure, with no window"
    );
  });

  it("reaps globally on empty hostname", () => {
    getDefaultDispatcher(CLOUD_HOST);
    getDefaultDispatcher(LOCAL_HOST);
    assert.notEqual(getDefaultCachedDispatcher(), undefined, "precondition: cloud pool set");
    assert.notEqual(getLocalDefaultCachedDispatcher(), undefined, "precondition: local pool set");

    maybeReapDispatcherPool("", false, 1_000);

    assert.equal(getDefaultCachedDispatcher(), undefined, "cloud pool must be evicted");
    assert.equal(getLocalDefaultCachedDispatcher(), undefined, "local pool must be evicted");
  });

  it("evicts the failed pool only", () => {
    const localBefore = getDefaultDispatcher(LOCAL_HOST);
    const localRetryBefore = getRetryDispatcher(LOCAL_HOST);
    getDefaultDispatcher(CLOUD_HOST);
    getRetryDispatcher(CLOUD_HOST);

    maybeReapDispatcherPool(CLOUD_HOST, false, 1_000);

    assert.equal(getDefaultCachedDispatcher(), undefined, "failed cloud pool must go");
    assert.equal(getRetryCachedDispatcher(), undefined, "failed cloud retry must go");
    assert.equal(getLocalDefaultCachedDispatcher(), localBefore, "healthy local pool must survive");
    assert.equal(
      getLocalRetryCachedDispatcher(),
      localRetryBefore,
      "healthy local retry must survive"
    );
  });

  it("keeps reap state bounded", () => {
    for (let i = 0; i < 50; i++) {
      maybeReapDispatcherPool(CLOUD_HOST, false, i * REAP_MIN_INTERVAL_MS);
      maybeReapDispatcherPool("", false, i * REAP_MIN_INTERVAL_MS);
    }

    assert.ok(
      __dispatcherReapSizeForTest() <= 2,
      `reap state must stay at 2 entries, got ${__dispatcherReapSizeForTest()}`
    );
  });

  it("removes slots even when close fails", () => {
    const broken = getDefaultDispatcher(CLOUD_HOST);
    broken.close = () => {
      throw new Error("close failed");
    };

    maybeReapDispatcherPool(CLOUD_HOST, false, 1_000);

    assert.equal(
      getDefaultCachedDispatcher(),
      undefined,
      "slots must be dropped even when closing fails"
    );
  });
});

describe("proxyFetch cloud unreachable evicts the cloud pool", () => {
  it("serves the next request from a fresh pool after a cloud unreachable error", async () => {
    const stale = getDefaultDispatcher(CLOUD_HOST);
    assert.equal(getDefaultCachedDispatcher(), stale, "precondition: cloud pool set");

    let undiciCalls = 0;
    const mockUndici = async (): Promise<Response> => {
      undiciCalls++;
      throw connectionRefused();
    };
    const mockNative = async (): Promise<Response> => new Response("native-ok", { status: 200 });

    const res = await proxyFetch(
      `https://${CLOUD_HOST}/v1/models`,
      { method: "POST" },
      { undiciFetch: mockUndici, nativeFetch: mockNative }
    );

    assert.equal(undiciCalls, 2, "initial attempt and fresh-socket retry must fire");
    assert.equal(await res.text(), "native-ok");
    assert.notEqual(
      getDefaultCachedDispatcher(),
      stale,
      "cloud pool must be rebuilt after its own unreachable error"
    );
  });
});
