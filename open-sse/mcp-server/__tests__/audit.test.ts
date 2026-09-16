import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

type MockAuditDb = {
  prepare: ReturnType<typeof vi.fn>;
  pragma: ReturnType<typeof vi.fn>;
  close: ReturnType<typeof vi.fn>;
  open?: boolean;
};

function createStatementMock() {
  return {
    get: vi.fn(),
    all: vi.fn(),
    run: vi.fn(),
  };
}

// The shutdown tests inject through the audit connection cache
// (globalThis.__omnirouteMcpAuditDb), and the fallback test uses the
// __setBetterSqliteLoaderForTests seam.
describe("MCP audit shutdown", () => {
  let dataDir: string;
  let dbFile: string;

  beforeEach(() => {
    vi.resetModules();
    globalThis.__omnirouteMcpAuditDb = undefined;
    dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mcp-audit-"));
    dbFile = path.join(dataDir, "storage.sqlite");
    fs.writeFileSync(dbFile, "");
    process.env.DATA_DIR = dataDir;
  });

  afterEach(() => {
    delete process.env.DATA_DIR;
    globalThis.__omnirouteMcpAuditDb = undefined;
    vi.doUnmock("../../../src/lib/db/adapters/runtimeRequire.ts");
    vi.restoreAllMocks();
  });

  it("checkpoints and closes the audit database during shutdown", async () => {
    const mockDb: MockAuditDb = {
      prepare: vi.fn(() => createStatementMock()),
      pragma: vi.fn(),
      close: vi.fn(),
      open: true,
    };

    const audit = await import("../audit.ts");
    // Inject through the connection cache — the seam the module itself uses.
    globalThis.__omnirouteMcpAuditDb = mockDb as unknown as typeof globalThis.__omnirouteMcpAuditDb;

    await audit.logToolCall("omniroute_get_health", { ok: true }, { ok: true }, 12, true);
    expect(mockDb.prepare).toHaveBeenCalledTimes(1);

    expect(audit.closeAuditDb()).toBe(true);
    expect(mockDb.pragma).toHaveBeenCalledWith("wal_checkpoint(TRUNCATE)");
    expect(mockDb.close).toHaveBeenCalledTimes(1);
    expect(audit.closeAuditDb()).toBe(false);
  }, // Explicit generous timeout (vitest default is 5000ms): under contended
  // CI-runner load, vi.resetModules() + a fresh dynamic import + mocked DB
  // calls can exceed the default budget though the behavior is correct
  // (issue #6803).
  30000);

  it("still closes the audit database when checkpoint fails", async () => {
    const mockDb: MockAuditDb = {
      prepare: vi.fn(() => createStatementMock()),
      pragma: vi.fn(() => {
        throw new Error("database is busy");
      }),
      close: vi.fn(),
      open: true,
    };

    const audit = await import("../audit.ts");
    globalThis.__omnirouteMcpAuditDb = mockDb as unknown as typeof globalThis.__omnirouteMcpAuditDb;

    await audit.logToolCall("omniroute_get_health", {}, {}, 5, true);
    expect(audit.closeAuditDb()).toBe(true);
    expect(mockDb.close).toHaveBeenCalledTimes(1);
  });

  it("loads the native audit database through the standalone-safe runtime loader", async () => {
    class FakeDatabase {
      open = true;

      prepare(sql: string) {
        if (sql.includes("COUNT(*) as total") && sql.includes("AVG(duration_ms)")) {
          return {
            ...createStatementMock(),
            get: vi.fn(() => ({ total: 7, successRate: 0.75, avgDuration: 12 })),
          };
        }
        return {
          ...createStatementMock(),
          all: vi.fn(() => [{ tool: "omniroute_get_health", count: 7 }]),
        };
      }

      pragma() {}
      close() {}
    }

    vi.doMock("../../../src/lib/db/adapters/runtimeRequire.ts", () => ({
      runtimeRequire: () => FakeDatabase,
    }));

    const audit = await import("../audit.ts");

    await expect(audit.getAuditStats()).resolves.toEqual({
      totalCalls: 7,
      successRate: 0.75,
      avgDurationMs: 12,
      topTools: [{ tool: "omniroute_get_health", count: 7 }],
    });
  });

  it("falls back to node:sqlite when better-sqlite3 binding is missing", async () => {
    const [maj, min] = process.versions.node.split(".").map(Number);
    if (maj < 22 || (maj === 22 && min < 5)) {
      return; // node:sqlite not available on this Node, skip
    }

    // Simulate a global-install scenario where the bundled native binary
    // never landed in dist/node_modules/better-sqlite3/build/Release/.
    // Thrown from the loader seam so the test does not depend on a native binding.
    const bindingErr = new Error(
      "Could not locate the bindings file. Tried: …/better_sqlite3.node"
    ) as Error & { code?: string };
    bindingErr.code = "MODULE_NOT_FOUND";

    // node:sqlite IS loaded via dynamic import(), so doMock works for it.
    // Its DatabaseSync does not expose a boolean `open` property — the
    // adapter tracks open state in a local closure.
    const mockNodeDb = {
      prepare: vi.fn(() => createStatementMock()),
      exec: vi.fn(),
      close: vi.fn(),
    };
    const DatabaseSync = vi.fn(function DatabaseSync() {
      return mockNodeDb;
    });
    vi.doMock("node:sqlite", () => ({ DatabaseSync }));

    const audit = await import("../audit.ts");
    audit.__setBetterSqliteLoaderForTests(() => {
      throw bindingErr;
    });

    try {
      await audit.logToolCall("omniroute_get_health", { ok: true }, { ok: true }, 4, true);
      expect(DatabaseSync).toHaveBeenCalledWith(dbFile);
      expect(mockNodeDb.prepare).toHaveBeenCalled();

      expect(audit.closeAuditDb()).toBe(true);
      expect(mockNodeDb.exec).toHaveBeenCalledWith("PRAGMA wal_checkpoint(TRUNCATE)");
      expect(mockNodeDb.close).toHaveBeenCalledTimes(1);

      // Cache is cleared after close, so a second close is a no-op.
      expect(audit.closeAuditDb()).toBe(false);
      expect(mockNodeDb.close).toHaveBeenCalledTimes(1);
    } finally {
      audit.__setBetterSqliteLoaderForTests(null);
    }
  });
});
