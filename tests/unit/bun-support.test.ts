import test from "node:test";
import assert from "node:assert/strict";
import { getNodeRuntimeSupport } from "../../src/shared/utils/nodeRuntimeSupport.ts";
import { createSyncDriverFactory } from "../../src/lib/db/adapters/driverFactory.ts";

test("getNodeRuntimeSupport detects Bun as a supported runtime", () => {
  const originalBun = process.versions.bun;
  try {
    (process.versions as Record<string, string>).bun = "1.1.20";
    const support = getNodeRuntimeSupport("22.0.0");
    assert.equal(support.nodeCompatible, true);
    assert.equal(support.reason, "supported-bun");
    assert.match(support.nodeVersion, /^bun-1\.1\.20/);
    assert.match(support.supportedDisplay, /Bun 1\.1\+/);
  } finally {
    if (originalBun === undefined) {
      delete (process.versions as Record<string, string | undefined>).bun;
    } else {
      process.versions.bun = originalBun;
    }
  }
});

test("createSyncDriverFactory prefers bun:sqlite built-in driver when running under Bun", () => {
  const originalBun = process.versions.bun;
  try {
    (process.versions as Record<string, string>).bun = "1.1.20";

    const dummyBunDb = {
      query: () => ({
        run: () => ({ changes: 1, lastInsertRowid: 1 }),
        get: () => null,
        all: () => [],
      }),
      exec: () => {},
      close: () => {},
    };

    const loader = (modName: string) => {
      if (modName === "bun:sqlite") {
        return {
          Database: function DummyBunDatabase() {
            return dummyBunDb;
          },
        };
      }
      throw new Error(`Unexpected module ${modName}`);
    };

    const factory = createSyncDriverFactory(loader, () => true);
    const adapter = factory(":memory:");
    assert.ok(adapter, "Adapter should be created via bun:sqlite");
    assert.equal(adapter.driver, "bun:sqlite");
  } finally {
    if (originalBun === undefined) {
      delete (process.versions as Record<string, string | undefined>).bun;
    } else {
      process.versions.bun = originalBun;
    }
  }
});

test("createSyncDriverFactory prefers better-sqlite3 when running under Node", () => {
  const originalBun = process.versions.bun;
  try {
    delete (process.versions as Record<string, string | undefined>).bun;

    const dummyBetterDb = {
      open: true,
      name: ":memory:",
      inTransaction: false,
      prepare: () => ({ run: () => ({ changes: 1, lastInsertRowid: 1 }) }),
      exec: () => {},
      close: () => {},
    };

    const loader = (modName: string) => {
      if (modName === "better-sqlite3") {
        return function DummyBetterSqlite() {
          return dummyBetterDb;
        };
      }
      throw new Error(`Unexpected module ${modName}`);
    };

    const factory = createSyncDriverFactory(loader, () => true);
    const adapter = factory(":memory:");
    assert.ok(adapter, "Adapter should be created via better-sqlite3");
    assert.equal(adapter.driver, "better-sqlite3");
  } finally {
    if (originalBun === undefined) {
      delete (process.versions as Record<string, string | undefined>).bun;
    } else {
      process.versions.bun = originalBun;
    }
  }
});

// `OMNIROUTE_USE_TURBOPACK` is the operator's only control over the bundler:
// Turbopack is the default and `0` is the documented escape hatch (webpack), taken
// for Windows / native-binding trouble / RAM-constrained machines — see
// docs/reference/ENVIRONMENT.md and #6409. Nothing sniffs the runtime, so pin that:
// a hidden override would silently ignore an explicit `=1` from an operator who set
// it on purpose (CI does, in build.yml / ci.yml / quality.yml).
test("resolveNextBuildBundlerFlag is decided by OMNIROUTE_USE_TURBOPACK alone, not by the runtime", async () => {
  const buildIsolated = await import("../../scripts/build/build-next-isolated.mjs");
  const originalBun = process.versions.bun;
  try {
    for (const bun of [undefined, "1.1.20", "1.3.14"]) {
      if (bun === undefined) {
        delete (process.versions as Record<string, string | undefined>).bun;
      } else {
        (process.versions as Record<string, string>).bun = bun;
      }
      const where = `bun=${bun ?? "absent"}`;
      assert.equal(buildIsolated.resolveNextBuildBundlerFlag({}), "--turbopack", where);
      assert.equal(
        buildIsolated.resolveNextBuildBundlerFlag({ OMNIROUTE_USE_TURBOPACK: "1" }),
        "--turbopack",
        where
      );
      assert.equal(
        buildIsolated.resolveNextBuildBundlerFlag({ OMNIROUTE_USE_TURBOPACK: "0" }),
        "--webpack",
        where
      );
    }
  } finally {
    if (originalBun === undefined) {
      delete (process.versions as Record<string, string | undefined>).bun;
    } else {
      process.versions.bun = originalBun;
    }
  }
});
