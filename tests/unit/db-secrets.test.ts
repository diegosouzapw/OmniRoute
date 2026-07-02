import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-secrets-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const secretsDb = await import("../../src/lib/db/secrets.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("getPersistedSecret returns null for missing keys", () => {
  assert.equal(secretsDb.getPersistedSecret("missing"), null);
});

test("persistSecret stores and reads secrets from the key_value table", () => {
  secretsDb.persistSecret("oauth_token", "secret-value");

  assert.equal(secretsDb.getPersistedSecret("oauth_token"), "secret-value");
});

test("persistSecret does not overwrite an existing secret because storage is insert-only", () => {
  secretsDb.persistSecret("api_token", "first-value");
  secretsDb.persistSecret("api_token", "second-value");

  assert.equal(secretsDb.getPersistedSecret("api_token"), "first-value");
});

test("malformed persisted rows are treated as missing secrets", () => {
  const db = core.getDbInstance();
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "secrets",
    "broken",
    "not-json"
  );

  assert.equal(secretsDb.getPersistedSecret("broken"), null);
});
