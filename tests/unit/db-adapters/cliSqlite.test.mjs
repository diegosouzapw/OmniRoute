import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { backupSqliteFile, normalizeBunSqliteParams } from "../../../bin/cli/sqlite.mjs";

test("CLI Bun SQLite parameter normalization preserves binary values", () => {
  const typedArray = new Uint8Array([1, 2, 3]);
  const buffer = Buffer.from([4, 5, 6]);

  assert.deepEqual(normalizeBunSqliteParams([typedArray]), [typedArray]);
  assert.deepEqual(normalizeBunSqliteParams([buffer]), [buffer]);
});

test("CLI Bun SQLite parameter normalization expands named object keys", () => {
  assert.deepEqual(normalizeBunSqliteParams([{ id: 7 }]), [{ "@id": 7, ":id": 7, $id: 7 }]);
});

test("CLI Bun SQLite backs up physical files without serializing them", async (t) => {
  if (!process.versions.bun) {
    t.skip("bun:sqlite is only available under Bun");
    return;
  }

  const sourcePath = path.join(os.tmpdir(), `cli-bun-sqlite-source-${Date.now()}.sqlite`);
  const destinationPath = path.join(os.tmpdir(), `cli-bun-sqlite-destination-${Date.now()}.sqlite`);
  t.after(() => {
    for (const filePath of [sourcePath, destinationPath]) {
      try {
        fs.unlinkSync(filePath);
      } catch {}
    }
  });

  const { Database } = await import("bun:sqlite");
  const source = new Database(sourcePath);
  source.exec("CREATE TABLE items (value TEXT); INSERT INTO items VALUES ('copied')");
  source.close();

  await backupSqliteFile(sourcePath, destinationPath);

  const destination = new Database(destinationPath, { readonly: true });
  assert.equal(destination.query("SELECT value FROM items").get().value, "copied");
  destination.close();
});
