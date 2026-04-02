import { describe, it, beforeEach, afterEach, after } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";
import Database from "better-sqlite3";

const fileTmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-dbupc-test-"));

const SCHEMA = `
CREATE TABLE IF NOT EXISTS upstream_proxy_config (
  id                        INTEGER PRIMARY KEY AUTOINCREMENT,
  provider_id               TEXT NOT NULL UNIQUE,
  mode                      TEXT NOT NULL DEFAULT 'native',
  cliproxyapi_model_mapping TEXT,
  native_priority           INTEGER NOT NULL DEFAULT 1,
  cliproxyapi_priority      INTEGER NOT NULL DEFAULT 2,
  enabled                   INTEGER NOT NULL DEFAULT 1,
  created_at                TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at                TEXT NOT NULL DEFAULT (datetime('now'))
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

function upsert(db, data) {
  db.prepare(
    `
    INSERT OR REPLACE INTO upstream_proxy_config
    (provider_id, mode, cliproxyapi_model_mapping, native_priority, cliproxyapi_priority, enabled, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `
  ).run(
    data.providerId,
    data.mode ?? "native",
    data.cliproxyapiModelMapping !== undefined
      ? JSON.stringify(data.cliproxyapiModelMapping)
      : null,
    data.nativePriority ?? 1,
    data.cliproxyapiPriority ?? 2,
    data.enabled !== false ? 1 : 0
  );
  return getConfig(db, data.providerId);
}

function getConfig(db, providerId) {
  const row = db
    .prepare("SELECT * FROM upstream_proxy_config WHERE provider_id = ?")
    .get(providerId);
  if (!row) return null;
  return {
    id: row.id,
    providerId: row.provider_id,
    mode: row.mode,
    cliproxyapiModelMapping:
      row.cliproxyapi_model_mapping && typeof row.cliproxyapi_model_mapping === "string"
        ? JSON.parse(row.cliproxyapi_model_mapping)
        : null,
    nativePriority: row.native_priority,
    cliproxyapiPriority: row.cliproxyapi_priority,
    enabled: row.enabled === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function getAllConfigs(db) {
  return db
    .prepare("SELECT * FROM upstream_proxy_config ORDER BY provider_id")
    .all()
    .map((r) => ({
      id: r.id,
      providerId: r.provider_id,
      mode: r.mode,
      cliproxyapiModelMapping:
        r.cliproxyapi_model_mapping && typeof r.cliproxyapi_model_mapping === "string"
          ? JSON.parse(r.cliproxyapi_model_mapping)
          : null,
      nativePriority: r.native_priority,
      cliproxyapiPriority: r.cliproxyapi_priority,
      enabled: r.enabled === 1,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
}

function getProvidersByMode(db, mode) {
  return db
    .prepare(
      "SELECT * FROM upstream_proxy_config WHERE mode = ? AND enabled = 1 ORDER BY provider_id"
    )
    .all(mode)
    .map((r) => ({
      id: r.id,
      providerId: r.provider_id,
      mode: r.mode,
      cliproxyapiModelMapping: r.cliproxyapi_model_mapping
        ? JSON.parse(r.cliproxyapi_model_mapping)
        : null,
      nativePriority: r.native_priority,
      cliproxyapiPriority: r.cliproxyapi_priority,
      enabled: r.enabled === 1,
    }));
}

function getFallbackChain(db, providerId) {
  const config = getConfig(db, providerId);
  if (!config) return [];
  const chain = [];
  if (config.enabled) {
    chain.push({ executor: "native", priority: config.nativePriority });
    if (config.mode === "cliproxyapi" || config.mode === "fallback") {
      chain.push({ executor: "cliproxyapi", priority: config.cliproxyapiPriority });
    }
  }
  chain.sort((a, b) => a.priority - b.priority);
  return chain;
}

describe("db/upstreamProxy (logic)", () => {
  describe("upsertUpstreamProxyConfig", () => {
    it("should insert and read back", () => {
      const config = upsert(testDb, { providerId: "claude", mode: "native" });
      assert.equal(config.providerId, "claude");
      assert.equal(config.mode, "native");
      assert.equal(config.enabled, true);
      assert.equal(config.nativePriority, 1);
      assert.equal(config.cliproxyapiPriority, 2);
      assert.equal(config.cliproxyapiModelMapping, null);
      assert.ok(config.id > 0);
    });

    it("should replace on conflict", () => {
      upsert(testDb, { providerId: "t", mode: "native" });
      const replaced = upsert(testDb, { providerId: "t", mode: "fallback" });
      assert.equal(replaced.mode, "fallback");
    });

    it("should store model mapping as JSON", () => {
      const mapping = { "ag/gemini-3-pro": "gemini-3-pro-high" };
      const config = upsert(testDb, { providerId: "mapped", cliproxyapiModelMapping: mapping });
      assert.deepEqual(config.cliproxyapiModelMapping, mapping);
    });

    it("should store null model mapping", () => {
      const config = upsert(testDb, { providerId: "nomap", cliproxyapiModelMapping: null });
      assert.equal(config.cliproxyapiModelMapping, null);
    });

    it("should handle enabled=false", () => {
      assert.equal(upsert(testDb, { providerId: "dis", enabled: false }).enabled, false);
    });

    it("should set custom priorities", () => {
      const config = upsert(testDb, {
        providerId: "pri",
        nativePriority: 5,
        cliproxyapiPriority: 10,
      });
      assert.equal(config.nativePriority, 5);
      assert.equal(config.cliproxyapiPriority, 10);
    });
  });

  describe("getUpstreamProxyConfig", () => {
    it("should return null for non-existent provider", () => {
      assert.equal(getConfig(testDb, "ghost"), null);
    });

    it("should return config for provider", () => {
      upsert(testDb, { providerId: "claude", mode: "fallback" });
      assert.equal(getConfig(testDb, "claude").mode, "fallback");
    });
  });

  describe("getUpstreamProxyConfigs", () => {
    it("should return all ordered by provider_id", () => {
      upsert(testDb, { providerId: "zebra" });
      upsert(testDb, { providerId: "alpha" });
      const configs = getAllConfigs(testDb);
      assert.equal(configs.length, 2);
      assert.equal(configs[0].providerId, "alpha");
      assert.equal(configs[1].providerId, "zebra");
    });

    it("should return empty array", () => {
      assert.equal(getAllConfigs(testDb).length, 0);
    });
  });

  describe("updateUpstreamProxyConfig", () => {
    it("should update individual fields", () => {
      upsert(testDb, { providerId: "u", mode: "native" });
      testDb
        .prepare(
          "UPDATE upstream_proxy_config SET mode = ?, updated_at = datetime('now') WHERE provider_id = ?"
        )
        .run("cliproxyapi", "u");
      assert.equal(getConfig(testDb, "u").mode, "cliproxyapi");
    });

    it("should update model mapping", () => {
      upsert(testDb, { providerId: "u2" });
      testDb
        .prepare(
          "UPDATE upstream_proxy_config SET cliproxyapi_model_mapping = ?, updated_at = datetime('now') WHERE provider_id = ?"
        )
        .run(JSON.stringify({ k: "v" }), "u2");
      assert.deepEqual(getConfig(testDb, "u2").cliproxyapiModelMapping, { k: "v" });
    });

    it("should update multiple fields", () => {
      upsert(testDb, { providerId: "m" });
      testDb
        .prepare(
          "UPDATE upstream_proxy_config SET mode = ?, native_priority = ?, enabled = ?, updated_at = datetime('now') WHERE provider_id = ?"
        )
        .run("fallback", 3, 0, "m");
      const config = getConfig(testDb, "m");
      assert.equal(config.mode, "fallback");
      assert.equal(config.nativePriority, 3);
      assert.equal(config.enabled, false);
    });

    it("should set model mapping to null", () => {
      upsert(testDb, { providerId: "n", cliproxyapiModelMapping: { a: 1 } });
      testDb
        .prepare(
          "UPDATE upstream_proxy_config SET cliproxyapi_model_mapping = NULL WHERE provider_id = ?"
        )
        .run("n");
      assert.equal(getConfig(testDb, "n").cliproxyapiModelMapping, null);
    });
  });

  describe("deleteUpstreamProxyConfig", () => {
    it("should delete existing config", () => {
      upsert(testDb, { providerId: "del" });
      assert.equal(
        testDb.prepare("DELETE FROM upstream_proxy_config WHERE provider_id = ?").run("del")
          .changes,
        1
      );
      assert.equal(getConfig(testDb, "del"), null);
    });

    it("should return 0 for non-existent", () => {
      assert.equal(
        testDb.prepare("DELETE FROM upstream_proxy_config WHERE provider_id = ?").run("ghost")
          .changes,
        0
      );
    });
  });

  describe("getProvidersByMode", () => {
    it("should filter by mode and enabled", () => {
      upsert(testDb, { providerId: "p1", mode: "fallback", enabled: true });
      upsert(testDb, { providerId: "p2", mode: "fallback", enabled: true });
      upsert(testDb, { providerId: "p3", mode: "native", enabled: true });
      upsert(testDb, { providerId: "p4", mode: "fallback", enabled: false });
      const results = getProvidersByMode(testDb, "fallback");
      assert.equal(results.length, 2);
      assert.ok(results.every((r) => r.enabled));
    });

    it("should return empty for no matches", () => {
      assert.equal(getProvidersByMode(testDb, "cliproxyapi").length, 0);
    });
  });

  describe("getFallbackChainForProvider", () => {
    it("should return empty for non-existent provider", () => {
      assert.deepEqual(getFallbackChain(testDb, "ghost"), []);
    });

    it("should return native-only for native mode", () => {
      upsert(testDb, { providerId: "native-only", mode: "native" });
      const chain = getFallbackChain(testDb, "native-only");
      assert.equal(chain.length, 1);
      assert.equal(chain[0].executor, "native");
    });

    it("should return native+cliproxyapi for fallback mode", () => {
      upsert(testDb, {
        providerId: "fb",
        mode: "fallback",
        nativePriority: 1,
        cliproxyapiPriority: 2,
      });
      const chain = getFallbackChain(testDb, "fb");
      assert.equal(chain.length, 2);
      assert.equal(chain[0].executor, "native");
      assert.equal(chain[1].executor, "cliproxyapi");
    });

    it("should return both for cliproxyapi mode", () => {
      upsert(testDb, { providerId: "cpa", mode: "cliproxyapi" });
      const chain = getFallbackChain(testDb, "cpa");
      assert.equal(chain.length, 2);
    });

    it("should sort by priority", () => {
      upsert(testDb, {
        providerId: "rev",
        mode: "fallback",
        nativePriority: 10,
        cliproxyapiPriority: 1,
      });
      const chain = getFallbackChain(testDb, "rev");
      assert.equal(chain[0].executor, "cliproxyapi");
      assert.equal(chain[0].priority, 1);
      assert.equal(chain[1].executor, "native");
      assert.equal(chain[1].priority, 10);
    });

    it("should return empty chain when disabled", () => {
      upsert(testDb, { providerId: "dis-fb", mode: "fallback", enabled: false });
      assert.deepEqual(getFallbackChain(testDb, "dis-fb"), []);
    });
  });
});
