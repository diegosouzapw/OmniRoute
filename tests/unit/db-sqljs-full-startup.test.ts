import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

// Separate processes exercise a real fallback-to-native restart, not a mock
// capability flag on an already initialized connection.
test("sql.js defers dependent FTS migrations until a native restart", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "sqljs-full-startup-"));
  const code = `
    import assert from 'node:assert/strict';
    const core = await import('./src/lib/db/core.ts');
    try {
      await core.ensureDbInitialized();
      const db = core.getDbInstance();
      const fallback = process.env.OMNIROUTE_PACK_BOOT_FORCE_SQLJS === '1';
      assert.equal(db.driver === 'sql.js', fallback);
      for (const version of ['022', '023', '178']) {
        const applied = db.prepare('SELECT version FROM _omniroute_migrations WHERE version=?').get(version);
        assert.equal(Boolean(applied), !fallback, version);
      }
      if (!fallback) {
        assert.ok(db.prepare("SELECT name FROM sqlite_master WHERE name='memory_fts'").get());
        assert.ok(db.prepare("SELECT name FROM sqlite_master WHERE name='memory_fts_au'").get());
      }
    } finally { await core.shutdownDbInstance(); }
  `;
  try {
    for (const forceSqljs of ["1", "0"]) {
      const child = spawnSync(
        process.execPath,
        ["--import", "tsx/esm", "--input-type=module", "-e", code],
        {
          cwd: process.cwd(),
          env: {
            ...process.env,
            DATA_DIR: dir,
            NODE_ENV: "test",
            APP_LOG_TO_FILE: "false",
            DISABLE_SQLITE_AUTO_BACKUP: "true",
            OMNIROUTE_PACK_BOOT_SMOKE: "1",
            OMNIROUTE_PACK_BOOT_FORCE_SQLJS: forceSqljs,
          },
          encoding: "utf8",
          timeout: 30000,
        }
      );
      assert.equal(child.status, 0, `driver=${forceSqljs}\n${child.stdout}\n${child.stderr}`);
    }
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
