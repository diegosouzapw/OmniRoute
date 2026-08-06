import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  setDispatcherCacheEntry,
  getDispatcherCache,
  clearDispatcherCache,
} from "../../open-sse/utils/proxyDispatcherCache.ts";

describe("proxy dispatcher cache cap (#9158)", () => {
  it("evicts and closes the oldest entry at the 512-entry cap", () => {
    let closedCount = 0;
    const fakeDispatcher = {
      close() {
        closedCount += 1;
        return Promise.resolve();
      },
    } as never;

    for (let i = 0; i <= 512; i += 1) {
      setDispatcherCacheEntry(`u${i}`, fakeDispatcher);
    }

    assert.equal(getDispatcherCache().size, 512, "cache must stay at the cap");
    assert.equal(closedCount, 1, "exactly one entry must be evicted and closed");
    assert.equal(getDispatcherCache().has("u0"), false, "oldest entry must be evicted");
    assert.equal(getDispatcherCache().has("u512"), true, "newest entry must be retained");

    clearDispatcherCache();
  });
});
