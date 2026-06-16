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

  it("checkpoints and closes the audit database during shutdown", async () => {
    const mockDb: MockAuditDb = {
      prepare: vi.fn(() => createStatementMock()),
      pragma: vi.fn(),
      close: vi.fn(),
      open: true,
    };
    const MockDatabase = vi.fn(function MockDatabase() {
      return mockDb;
    });

    vi.doMock("better-sqlite3", () => ({
      default: MockDatabase,
    }));

    const audit = await import("../audit.ts");

    await audit.logToolCall("omniroute_get_health", { ok: true }, { ok: true }, 12, true);
    expect(mockDb.prepare).toHaveBeenCalledTimes(1);

    expect(audit.closeAuditDb()).toBe(true);
    expect(mockDb.pragma).toHaveBeenCalledWith("wal_checkpoint(TRUNCATE)");
    expect(mockDb.close).toHaveBeenCalledTimes(1);
    expect(audit.closeAuditDb()).toBe(false);
  });

  it("still closes the audit database when checkpoint fails", async () => {
    const mockDb: MockAuditDb = {
      prepare: vi.fn(() => createStatementMock()),
      pragma: vi.fn(() => {
        throw new Error("database is busy");
      }),
      close: vi.fn(),
      open: true,
    };
    const MockDatabase = vi.fn(function MockDatabase() {
      return mockDb;
    });

    vi.doMock("better-sqlite3", () => ({
      default: MockDatabase,
    }));

    const audit = await import("../audit.ts");

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
    const bindingErr = new Error(
      "Could not locate the bindings file. Tried: …/better_sqlite3.node"
    ) as Error & { code?: string };
    bindingErr.code = "MODULE_NOT_FOUND";
    // Simulate the binding-missing failure as the better-sqlite3 default
    // constructor throwing — this matches reality (`new Database()` throws
    // "Could not locate the bindings file" when the prebuilt .node is absent)
    // and reaches the adapter's `catch (nativeErr)`. A factory that itself
    // throws is reported by vitest as a mock-setup error and never reaches
    // the code under test.
    const ThrowingDatabase = vi.fn(function ThrowingDatabase() {
      throw bindingErr;
    });
    vi.doMock("better-sqlite3", () => ({
      default: ThrowingDatabase,
    }));

    // node:sqlite's DatabaseSync does not expose a boolean `open` property,
    // so the mock intentionally omits it — the adapter tracks open state in
    // a local closure and exposes it via a getter.
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

    await audit.logToolCall("omniroute_get_health", { ok: true }, { ok: true }, 4, true);
    expect(DatabaseSync).toHaveBeenCalledWith(dbFile);
    expect(mockNodeDb.prepare).toHaveBeenCalled();

    expect(audit.closeAuditDb()).toBe(true);
    expect(mockNodeDb.exec).toHaveBeenCalledWith("PRAGMA wal_checkpoint(TRUNCATE)");
    expect(mockNodeDb.close).toHaveBeenCalledTimes(1);

    // Cache is cleared after close, so a second close is a no-op.
    expect(audit.closeAuditDb()).toBe(false);
    expect(mockNodeDb.close).toHaveBeenCalledTimes(1);
  });
});
