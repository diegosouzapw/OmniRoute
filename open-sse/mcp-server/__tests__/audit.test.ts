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

// #8959 made the production loader use createRequire() (Electron/global-install
// resolution), which vi.doMock CANNOT intercept — it only patches Vitest's ESM
// module graph. The old better-sqlite3 doMock therefore never engaged: the code
// opened a REAL sqlite file in the temp DATA_DIR ("no such table" on stderr)
// and every mock assertion counted 0 calls. The shutdown tests now inject the
// mock through the audit connection cache (globalThis.__omnirouteMcpAuditDb),
// and the fallback test uses the __setBetterSqliteLoaderForTests seam.
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
    vi.restoreAllMocks();
  });

  it(
    "checkpoints and closes the audit database during shutdown",
    async () => {
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
    },
    // Explicit generous timeout (vitest default is 5000ms): under contended
    // CI-runner load, vi.resetModules() + a fresh dynamic import + mocked DB
    // calls can exceed the default budget though the behavior is correct
    // (issue #6803).
    30000
  );

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

  it("falls back to node:sqlite when better-sqlite3 binding is missing", async () => {
    const [maj, min] = process.versions.node.split(".").map(Number);
    if (maj < 22 || (maj === 22 && min < 5)) {
      return; // node:sqlite not available on this Node, skip
    }

    // Simulate a global-install scenario where the bundled native binary
    // never landed in dist/node_modules/better-sqlite3/build/Release/.
    // Thrown from the loader seam because the real load path is
    // createRequire("better-sqlite3"), unreachable by vi.doMock.
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
