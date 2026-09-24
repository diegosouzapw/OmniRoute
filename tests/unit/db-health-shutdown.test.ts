import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "health-shutdown-"));
process.env.DATA_DIR = dir;
process.env.OMNIROUTE_SKIP_DB_HEALTHCHECK = "1";
const core = await import("../../src/lib/db/core.ts");
const shutdown = await import("../../src/lib/gracefulShutdown.ts");

test("graceful shutdown closes pending health work and continues later cleanup", async () => {
  const db = core.getDbInstance();
  db.exec("UPDATE db_meta SET value='0' WHERE key='schema_version'; BEGIN IMMEDIATE");
  const messages: string[] = [];
  const log = console.log;
  console.log = (...args: unknown[]) => {
    messages.push(args.map(String).join(" "));
  };
  let settled = false;
  const health = core.runManagedDbHealthCheck({ autoRepair: true }).then(
    () => {
      settled = true;
    },
    () => {
      settled = true;
    }
  );
  try {
    assert.throws(() => core.resetDbInstance(), /already in progress/);
    await shutdown.requestGracefulShutdown("test");
    assert.equal(settled, true, "health operation must settle before shutdown returns");
    assert.equal(db.open, false, "serving database must be closed");
    assert.ok(messages.some((x) => x.includes("Logger transport and log rotation stopped")));
    await assert.rejects(core.runManagedDbHealthCheck(), /stopping/);
  } finally {
    console.log = log;
    if (db.open && db.inTransaction) db.exec("ROLLBACK");
    await health;
    core.closeDbInstance();
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
