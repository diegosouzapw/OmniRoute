import assert from "node:assert/strict";
import test from "node:test";

import {
  _setSessionAffinityRedisForTests,
  getSessionAffinityStore,
} from "../../src/lib/db/sessionAffinity/storeFactory.ts";

const originalDriver = process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
test.beforeEach(() => {
  delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
  _setSessionAffinityRedisForTests({
    isConfigured: () => false,
    getClient: async () => {
      throw new Error("synthetic unused client");
    },
  });
});
test.after(() => {
  _setSessionAffinityRedisForTests(null);
  if (originalDriver === undefined) delete process.env.OMNIROUTE_SESSION_AFFINITY_STORE;
  else process.env.OMNIROUTE_SESSION_AFFINITY_STORE = originalDriver;
});

for (const driver of [undefined, "sqlite", "unknown", "redis"]) {
  test(`store selection logs for ${driver ?? "unset"} stay silent or warn once`, (t) => {
    const info = t.mock.method(console, "info", () => {});
    const warn = t.mock.method(console, "warn", () => {});
    if (driver !== undefined) process.env.OMNIROUTE_SESSION_AFFINITY_STORE = driver;
    for (let i = 0; i < 3; i++) assert.equal(getSessionAffinityStore().driver, "sqlite");
    assert.equal(info.mock.callCount(), 0);
    assert.equal(warn.mock.callCount(), driver === "unknown" || driver === "redis" ? 1 : 0);
    if (warn.mock.callCount()) {
      assert.deepEqual(warn.mock.calls[0].arguments, [
        "[SESSION_AFFINITY] Redis store not selected/configured; using SQLite.",
      ]);
    }
  });
}
