import { describe, it, beforeEach, afterEach, after } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import Database from "better-sqlite3";

const fileTmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-dbvm-test-"));
const moduleDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-dbvm-module-"));
process.env.DATA_DIR = moduleDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const versionManagerDb = await import("../../src/lib/db/versionManager.ts");

const SCHEMA = `
CREATE TABLE IF NOT EXISTS version_manager (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  tool              TEXT NOT NULL UNIQUE,
  current_version   TEXT,
  installed_version TEXT,
  pinned_version    TEXT,
  binary_path       TEXT,
  status            TEXT NOT NULL DEFAULT 'not_installed',
  pid               INTEGER,
  port              INTEGER DEFAULT 8317,
  api_key           TEXT,
  management_key    TEXT,
  auto_update       INTEGER NOT NULL DEFAULT 1,
  auto_start        INTEGER NOT NULL DEFAULT 0,
  last_health_check TEXT,
  last_update_check TEXT,
  health_status     TEXT DEFAULT 'unknown',
  config_overrides  TEXT,
  error_message     TEXT,
  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at        TEXT NOT NULL DEFAULT (datetime('now'))
);
`;

let testDb;
let testDbPath;

beforeEach(() => {
  testDbPath = path.join(fileTmpDir, `test-${Date.now()}.db`);
  testDb = new Database(testDbPath);
  testDb.exec(SCHEMA);
});

afterEach(() => {
  testDb.close();
  try {
    fs.unlinkSync(testDbPath);
  } catch {}
});

after(() => {
  if (fs.existsSync(fileTmpDir)) fs.rmSync(fileTmpDir, { recursive: true, force: true });
});

async function resetModuleStorage() {
  coreDb.resetDbInstance();
  fs.rmSync(moduleDataDir, { recursive: true, force: true });
  fs.mkdirSync(moduleDataDir, { recursive: true });
}

function upsertTool(db, data) {
  db.prepare(
    `
    INSERT INTO version_manager (
      tool, current_version, installed_version, pinned_version, binary_path,
      status, pid, port, api_key, management_key, auto_update, auto_start,
      health_status, config_overrides, error_message, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    ON CONFLICT(tool) DO UPDATE SET
      current_version = excluded.current_version,
      installed_version = excluded.installed_version,
      pinned_version = excluded.pinned_version,
      binary_path = excluded.binary_path,
      status = excluded.status,
      pid = excluded.pid,
      port = excluded.port,
      api_key = excluded.api_key,
      management_key = excluded.management_key,
      auto_update = excluded.auto_update,
      auto_start = excluded.auto_start,
      health_status = excluded.health_status,
      config_overrides = excluded.config_overrides,
      error_message = excluded.error_message,
      updated_at = datetime('now')
  `
  ).run(
    data.tool,
    data.currentVersion ?? null,
    data.installedVersion ?? null,
    data.pinnedVersion ?? null,
    data.binaryPath ?? null,
    data.status ?? "not_installed",
    data.pid ?? null,
    data.port ?? 8317,
    data.apiKey ?? null,
    data.managementKey ?? null,
    data.autoUpdate !== undefined ? (data.autoUpdate ? 1 : 0) : 1,
    data.autoStart !== undefined ? (data.autoStart ? 1 : 0) : 0,
    data.healthStatus ?? "unknown",
    data.configOverrides !== undefined
      ? data.configOverrides
        ? JSON.stringify(data.configOverrides)
        : null
      : null,
    data.errorMessage ?? null
  );
  return db.prepare("SELECT * FROM version_manager WHERE tool = ?").get(data.tool);
}

function parseConfigOverrides(value) {
  if (!value || typeof value !== "string" || value.trim() === "") return null;
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === "object" && parsed !== null ? parsed : null;
  } catch {
    return null;
  }
}

function toTool(row) {
  if (!row) return null;
  return {
    id: row.id,
    tool: row.tool,
    currentVersion: row.current_version,
    installedVersion: row.installed_version,
    pinnedVersion: row.pinned_version,
    binaryPath: row.binary_path,
    status: row.status,
    pid: row.pid,
    port: row.port,
    apiKey: row.api_key,
    managementKey: row.management_key,
    autoUpdate: row.auto_update === 1,
    autoStart: row.auto_start === 1,
    lastHealthCheck: row.last_health_check,
    lastUpdateCheck: row.last_update_check,
    healthStatus: row.health_status,
    configOverrides: parseConfigOverrides(row.config_overrides),
    errorMessage: row.error_message,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

describe("db/versionManager (logic)", () => {
  describe("upsertVersionManagerTool", () => {
    it("should insert a new tool and read it back", () => {
      const tool = toTool(
        upsertTool(testDb, {
          tool: "cliproxyapi",
          installedVersion: "6.9.7",
          binaryPath: "/tmp/bin/cliproxyapi",
          status: "installed",
        })
      );
      assert.equal(tool.tool, "cliproxyapi");
      assert.equal(tool.installedVersion, "6.9.7");
      assert.equal(tool.binaryPath, "/tmp/bin/cliproxyapi");
      assert.equal(tool.status, "installed");
      assert.equal(tool.port, 8317);
      assert.equal(tool.autoUpdate, true);
      assert.equal(tool.autoStart, false);
      assert.equal(tool.healthStatus, "unknown");
      assert.ok(tool.id > 0);
    });

    it("should update on conflict (upsert)", () => {
      upsertTool(testDb, { tool: "test-tool", status: "installed" });
      const tool = toTool(
        upsertTool(testDb, { tool: "test-tool", installedVersion: "7.0.0", status: "running" })
      );
      assert.equal(tool.installedVersion, "7.0.0");
      assert.equal(tool.status, "running");
    });

    it("should store boolean fields as 0/1", () => {
      const tool = toTool(
        upsertTool(testDb, { tool: "bool-test", autoUpdate: false, autoStart: true })
      );
      assert.equal(tool.autoUpdate, false);
      assert.equal(tool.autoStart, true);
    });

    it("should store config overrides as JSON", () => {
      const tool = toTool(upsertTool(testDb, { tool: "cfg", configOverrides: { port: 9999 } }));
      assert.deepEqual(tool.configOverrides, { port: 9999 });
    });

    it("should handle null config overrides", () => {
      const tool = toTool(upsertTool(testDb, { tool: "null-cfg" }));
      assert.equal(tool.configOverrides, null);
    });

    it("should handle pid and error message", () => {
      const tool = toTool(
        upsertTool(testDb, { tool: "pid-test", pid: 12345, errorMessage: "err" })
      );
      assert.equal(tool.pid, 12345);
      assert.equal(tool.errorMessage, "err");
    });
  });

  describe("getVersionManagerTool", () => {
    it("should return null for non-existent tool", () => {
      assert.equal(
        toTool(testDb.prepare("SELECT * FROM version_manager WHERE tool = ?").get("ghost")),
        null
      );
    });

    it("should return tool by name", () => {
      upsertTool(testDb, { tool: "findme", installedVersion: "1.0.0" });
      const tool = toTool(
        testDb.prepare("SELECT * FROM version_manager WHERE tool = ?").get("findme")
      );
      assert.equal(tool.installedVersion, "1.0.0");
    });
  });

  describe("getVersionManagerStatus", () => {
    it("should return all tools", () => {
      upsertTool(testDb, { tool: "a" });
      upsertTool(testDb, { tool: "b" });
      assert.equal(testDb.prepare("SELECT * FROM version_manager").all().length, 2);
    });

    it("should return empty when no tools", () => {
      assert.equal(testDb.prepare("SELECT * FROM version_manager").all().length, 0);
    });
  });

  describe("updateVersionManagerTool (partial)", () => {
    it("should update pinnedVersion and autoUpdate", () => {
      upsertTool(testDb, { tool: "upd", status: "installed" });
      testDb
        .prepare(
          "UPDATE version_manager SET pinned_version = ?, auto_update = ?, updated_at = datetime('now') WHERE tool = ?"
        )
        .run("6.8.0", 0, "upd");
      const tool = toTool(
        testDb.prepare("SELECT * FROM version_manager WHERE tool = ?").get("upd")
      );
      assert.equal(tool.pinnedVersion, "6.8.0");
      assert.equal(tool.autoUpdate, false);
      assert.equal(tool.status, "installed");
    });

    it("should set fields to null", () => {
      upsertTool(testDb, { tool: "nulls", installedVersion: "1.0.0", pid: 42 });
      testDb
        .prepare("UPDATE version_manager SET installed_version = NULL, pid = NULL WHERE tool = ?")
        .run("nulls");
      const tool = toTool(
        testDb.prepare("SELECT * FROM version_manager WHERE tool = ?").get("nulls")
      );
      assert.equal(tool.installedVersion, null);
      assert.equal(tool.pid, null);
    });
  });

  describe("deleteVersionManagerTool", () => {
    it("should delete existing tool", () => {
      upsertTool(testDb, { tool: "del" });
      assert.equal(
        testDb.prepare("DELETE FROM version_manager WHERE tool = ?").run("del").changes,
        1
      );
      assert.equal(
        testDb.prepare("SELECT * FROM version_manager WHERE tool = ?").get("del"),
        undefined
      );
    });

    it("should return 0 changes for non-existent", () => {
      assert.equal(
        testDb.prepare("DELETE FROM version_manager WHERE tool = ?").run("ghost").changes,
        0
      );
    });
  });

  describe("updateToolHealth", () => {
    it("should update health_status and last_health_check", () => {
      upsertTool(testDb, { tool: "h" });
      const r = testDb
        .prepare(
          "UPDATE version_manager SET health_status = ?, last_health_check = datetime('now') WHERE tool = ?"
        )
        .run("healthy", "h");
      assert.equal(r.changes, 1);
      const tool = toTool(testDb.prepare("SELECT * FROM version_manager WHERE tool = ?").get("h"));
      assert.equal(tool.healthStatus, "healthy");
      assert.ok(tool.lastHealthCheck);
    });

    it("should return 0 changes for non-existent", () => {
      assert.equal(
        testDb
          .prepare("UPDATE version_manager SET health_status = ? WHERE tool = ?")
          .run("healthy", "ghost").changes,
        0
      );
    });
  });

  describe("updateToolVersion", () => {
    it("should update current_version", () => {
      upsertTool(testDb, { tool: "v1" });
      testDb
        .prepare("UPDATE version_manager SET current_version = ? WHERE tool = ?")
        .run("7.0.0", "v1");
      assert.equal(
        testDb.prepare("SELECT * FROM version_manager WHERE tool = ?").get("v1").current_version,
        "7.0.0"
      );
    });

    it("should update installed_version", () => {
      upsertTool(testDb, { tool: "v2" });
      testDb
        .prepare("UPDATE version_manager SET installed_version = ? WHERE tool = ?")
        .run("7.0.0", "v2");
      assert.equal(
        testDb.prepare("SELECT * FROM version_manager WHERE tool = ?").get("v2").installed_version,
        "7.0.0"
      );
    });
  });

  describe("setToolStatus", () => {
    it("should update status with pid", () => {
      upsertTool(testDb, { tool: "s1" });
      testDb
        .prepare("UPDATE version_manager SET status = ?, pid = ?, error_message = ? WHERE tool = ?")
        .run("running", 9999, "ok", "s1");
      const row = testDb.prepare("SELECT * FROM version_manager WHERE tool = ?").get("s1");
      assert.equal(row.status, "running");
      assert.equal(row.pid, 9999);
      assert.equal(row.error_message, "ok");
    });

    it("should update status without pid", () => {
      upsertTool(testDb, { tool: "s2" });
      testDb
        .prepare("UPDATE version_manager SET status = ?, error_message = ? WHERE tool = ?")
        .run("error", "crashed", "s2");
      const row = testDb.prepare("SELECT * FROM version_manager WHERE tool = ?").get("s2");
      assert.equal(row.status, "error");
    });

    it("should return 0 for non-existent", () => {
      assert.equal(
        testDb
          .prepare("UPDATE version_manager SET status = ? WHERE tool = ?")
          .run("running", "ghost").changes,
        0
      );
    });
  });

  describe("parseConfigOverrides", () => {
    it("should parse valid JSON", () => {
      assert.deepEqual(parseConfigOverrides('{"key":"val"}'), { key: "val" });
    });

    it("should return null for invalid JSON", () => {
      assert.equal(parseConfigOverrides("not-json"), null);
      assert.equal(parseConfigOverrides(""), null);
      assert.equal(parseConfigOverrides(null), null);
      assert.equal(parseConfigOverrides("123"), null);
    });
  });
});

describe("db/versionManager (module coverage)", () => {
  beforeEach(async () => {
    await resetModuleStorage();
  });

  after(async () => {
    coreDb.resetDbInstance();
    fs.rmSync(moduleDataDir, { recursive: true, force: true });
  });

  it("round-trips inserts, updates and status listings through the production module", async () => {
    const inserted = await versionManagerDb.upsertVersionManagerTool({
      tool: "cliproxyapi",
      installedVersion: "6.9.7",
      binaryPath: "/tmp/cliproxyapi",
      status: "installed",
      autoUpdate: false,
      autoStart: true,
      configOverrides: { port: 9999 },
    });

    assert.equal(inserted.tool, "cliproxyapi");
    assert.equal(inserted.autoUpdate, false);
    assert.equal(inserted.autoStart, true);
    assert.deepEqual(inserted.configOverrides, { port: 9999 });

    const updated = await versionManagerDb.updateVersionManagerTool("cliproxyapi", {
      installedVersion: "7.0.0",
      configOverrides: { port: 8317, host: "127.0.0.1" },
      apiKey: null,
      ignoredField: "noop",
    });

    assert.equal(updated.installedVersion, "7.0.0");
    assert.deepEqual(updated.configOverrides, { port: 8317, host: "127.0.0.1" });

    const status = await versionManagerDb.getVersionManagerStatus();
    assert.equal(status.length, 1);
    assert.equal(status[0].tool, "cliproxyapi");
  });

  it("parses invalid config overrides defensively and returns null for missing updates", async () => {
    const db = coreDb.getDbInstance();
    db.prepare(
      `
      INSERT INTO version_manager
      (tool, status, config_overrides, created_at, updated_at)
      VALUES (?, ?, ?, datetime('now'), datetime('now'))
    `
    ).run("broken-tool", "installed", "{not-json");

    const loaded = await versionManagerDb.getVersionManagerTool("broken-tool");

    assert.equal(loaded.configOverrides, null);
    assert.equal(
      await versionManagerDb.updateVersionManagerTool("ghost", { status: "running" }),
      null
    );
  });

  it("updates health/version/status fields and deletes tools", async () => {
    await versionManagerDb.upsertVersionManagerTool({
      tool: "managed-tool",
      status: "installed",
    });

    assert.equal(await versionManagerDb.updateToolHealth("managed-tool", "healthy"), true);
    assert.equal(
      await versionManagerDb.updateToolVersion("managed-tool", "current_version", "1.2.3"),
      true
    );
    assert.equal(
      await versionManagerDb.updateToolVersion("managed-tool", "installed_version", "1.2.0"),
      true
    );
    assert.equal(await versionManagerDb.setToolStatus("managed-tool", "running", 4321, "ok"), true);
    assert.equal(await versionManagerDb.setToolStatus("managed-tool", "error"), true);

    const stored = await versionManagerDb.getVersionManagerTool("managed-tool");
    assert.equal(stored.currentVersion, "1.2.3");
    assert.equal(stored.installedVersion, "1.2.0");
    assert.equal(stored.status, "error");

    assert.equal(await versionManagerDb.updateToolHealth("ghost", "healthy"), false);
    assert.equal(await versionManagerDb.setToolStatus("ghost", "running"), false);
    assert.equal(await versionManagerDb.deleteVersionManagerTool("managed-tool"), true);
    assert.equal(await versionManagerDb.deleteVersionManagerTool("managed-tool"), false);
  });
});
