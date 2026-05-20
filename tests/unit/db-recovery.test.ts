import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

async function withRecoveryEnv(fn: (dataDir: string) => Promise<void>) {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-recovery-"));
  process.env.DATA_DIR = dataDir;
  try {
    await fn(dataDir);
  } finally {
    fs.rmSync(dataDir, { recursive: true, force: true });
    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
}

test("countEncryptedCredentials returns 0 on fresh db", async () => {
  await withRecoveryEnv(async () => {
    const { countEncryptedCredentials } = await import("../../src/lib/db/recovery.ts");
    const count = countEncryptedCredentials();
    assert.equal(count, 0);
  });
});

test("resetEncryptedColumns dry-run returns affected count without mutating", async () => {
  await withRecoveryEnv(async () => {
    const { resetEncryptedColumns, countEncryptedCredentials } =
      await import("../../src/lib/db/recovery.ts");

    // Insert a fake encrypted row directly using the DB instance
    const { getDbInstance } = await import("../../src/lib/db/core.ts");
    const db = getDbInstance();
    const now = new Date().toISOString();
    db.prepare(
      "INSERT INTO provider_connections (id, provider, name, api_key, created_at, updated_at) VALUES (?,?,?,?,?,?)"
    ).run("test-id", "openai", "test-conn", "enc:v1:fake-encrypted-value", now, now);

    const countBefore = countEncryptedCredentials();
    assert.equal(countBefore, 1);

    const { affected } = resetEncryptedColumns({ dryRun: true });
    assert.equal(affected, 1);

    // Dry run should NOT have mutated
    const countAfter = countEncryptedCredentials();
    assert.equal(countAfter, 1);
  });
});

test("resetEncryptedColumns force mode nulls encrypted columns", async () => {
  await withRecoveryEnv(async () => {
    const { resetEncryptedColumns } = await import("../../src/lib/db/recovery.ts");
    const { getDbInstance } = await import("../../src/lib/db/core.ts");

    const db = getDbInstance();
    const now = new Date().toISOString();
    db.prepare(
      "INSERT INTO provider_connections (id, provider, name, api_key, access_token, created_at, updated_at) VALUES (?,?,?,?,?,?,?)"
    ).run("rec-id", "anthropic", "rec-conn", "enc:v1:key123", "enc:v1:tok456", now, now);

    const { affected } = resetEncryptedColumns({ dryRun: false });
    assert.ok(affected >= 1);

    const row = db
      .prepare("SELECT api_key, access_token FROM provider_connections WHERE id = ?")
      .get("rec-id") as { api_key: null; access_token: null } | undefined;
    assert.ok(row);
    assert.equal(row.api_key, null);
    assert.equal(row.access_token, null);
  });
});
