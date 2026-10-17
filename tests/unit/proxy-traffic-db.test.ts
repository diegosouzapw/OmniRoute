import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createNodeSqliteAdapterFromDatabase } from "../../src/lib/db/adapters/nodeSqliteShared.ts";
import { DatabaseSync } from "node:sqlite";

fs.mkdirSync(path.resolve("_artifacts"), { recursive: true });
const fixtureDir = fs.mkdtempSync(path.resolve("_artifacts/traffic-db-"));
const originalEnv = { ...process.env };
for (const key of Object.keys(process.env)) delete process.env[key];
for (const key of ["PATH", "SystemRoot", "WINDIR", "COMSPEC", "PATHEXT"]) {
  if (originalEnv[key]) process.env[key] = originalEnv[key];
}
for (const key of ["DATA_DIR", "HOME", "USERPROFILE", "APPDATA", "LOCALAPPDATA", "TEMP", "TMP"]) {
  process.env[key] = fixtureDir;
}
for (const key of ["SQLITE_FILE", "OMNIROUTE_SQLITE_FILE"]) {
  process.env[key] = path.join(fixtureDir, "isolated.sqlite");
}
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.OMNIROUTE_SKIP_SYSTEM_TRUST = "1";
process.env.OMNIROUTE_PLUGINS_DIR = path.join(fixtureDir, "plugins");

const { trafficRoute, recordTrafficDelta, getProxyTraffic } =
  await import("../../src/lib/db/proxyTraffic.ts");
const sql = fs.readFileSync(
  new URL("../../src/lib/db/migrations/206_proxy_payload_traffic.sql", import.meta.url),
  "utf8"
);
test.after(() => {
  fs.rmSync(fixtureDir, { recursive: true, force: true });
  for (const key of Object.keys(process.env)) delete process.env[key];
  Object.assign(process.env, originalEnv);
});

test(
  "persistent route totals remain additive and shared endpoints keep accounts distinct",
  { timeout: 2000 },
  () => {
    const filename = path.join(fixtureDir, "fixture.sqlite");
    let db = createNodeSqliteAdapterFromDatabase(new DatabaseSync(filename), filename);
    try {
      db.exec(
        "CREATE TABLE key_value (namespace TEXT, key TEXT, value TEXT, PRIMARY KEY(namespace,key)); CREATE TABLE proxy_registry(id TEXT PRIMARY KEY, name TEXT);"
      );
      db.exec(sql);
      db.exec(sql); // Migration is idempotent.
      db.prepare("INSERT INTO proxy_registry VALUES (?, ?)").run("fixture-id", "Fixture proxy");
      const proxy = {
        type: "http",
        host: "shared.invalid",
        port: 8080,
        username: "fixture-a",
        password: "fixture-secret-a",
      };
      const a = trafficRoute(proxy, db);
      const b = trafficRoute({ ...proxy, username: "fixture-b" }, db);
      assert.notEqual(a.key, b.key);
      assert.notEqual(a.key, trafficRoute({ ...proxy, password: "fixture-secret-b" }, db).key);
      const registered = trafficRoute({ ...proxy, proxyId: "fixture-id" }, db);
      assert.deepEqual(
        registered,
        trafficRoute({ ...proxy, proxyId: "fixture-id", password: "rotated" }, db)
      );
      recordTrafficDelta(
        a,
        {
          attempts: 1,
          uploadBytes: 6,
          knownUploadAttempts: 1,
          downloadBytes: 3,
          cancelledDownloads: 1,
        },
        db
      );
      recordTrafficDelta(b, { attempts: 1, knownUploadAttempts: 0, failedAttempts: 1 }, db);
      recordTrafficDelta(registered, { attempts: 1, downloadBytes: 7, completedDownloads: 1 }, db);
      recordTrafficDelta(
        trafficRoute(null, db),
        { attempts: 1, uploadBytes: 2, knownUploadAttempts: 1, completedDownloads: 1 },
        db
      );
      recordTrafficDelta(
        trafficRoute(undefined, db),
        { attempts: 1, downloadBytes: 1, completedDownloads: 1 },
        db
      );
      assert.throws(() => recordTrafficDelta(a, { downloadBytes: -1 }, db), /Invalid payload/);
      db.close();
      db = createNodeSqliteAdapterFromDatabase(new DatabaseSync(filename), filename);
      assert.equal(trafficRoute(proxy, db).key, a.key);
      recordTrafficDelta(a, { downloadBytes: 2 }, db);
      const report = getProxyTraffic(db);
      assert.equal(report.total.attempts, 5);
      assert.equal(report.total.uploadBytes, 8);
      assert.equal(report.total.downloadBytes, 13);
      assert.equal(report.proxied.uploadBytes, 6);
      assert.equal(report.direct.uploadBytes, 2);
      assert.equal(report.unattributed.downloadBytes, 1);
      assert.equal(
        report.items.find((item) => item.proxyId === "fixture-id")?.name,
        "Fixture proxy"
      );
      const output = JSON.stringify(report);
      assert.ok(!output.includes("fixture-secret"));
      assert.ok(!output.includes("fixture-a"));
      assert.ok(!output.includes("shared.invalid"));
    } finally {
      db.close();
    }
  }
);
