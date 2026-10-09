import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { createHash } from "node:crypto";
import Database from "better-sqlite3";

import {
  prepareVideoLiveIsolation,
  validateVideoLiveSource,
} from "../../scripts/ad-hoc/video-live-isolation.ts";

test("homologation refuses implicit, relative or missing source databases", () => {
  assert.throws(() => validateVideoLiveSource(undefined));
  assert.throws(() => validateVideoLiveSource("."));
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "video-live-source-test-"));
  try {
    assert.throws(() => validateVideoLiveSource(directory));
    fs.writeFileSync(path.join(directory, "storage.sqlite"), "test fixture, not live data");
    assert.equal(validateVideoLiveSource(directory), fs.realpathSync(directory));
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test("preparation uses a read-only snapshot and confines all keys/settings to private storage", async () => {
  const source = fs.mkdtempSync(path.join(os.tmpdir(), "video-live-source-fixture-"));
  const databasePath = path.join(source, "storage.sqlite");
  const original = new Database(databasePath);
  original.exec(
    "CREATE TABLE source_marker (value TEXT); INSERT INTO source_marker VALUES ('untouched')"
  );
  original.close();
  const before = createHash("sha256").update(fs.readFileSync(databasePath)).digest("hex");
  let prepared: string | undefined;
  try {
    const result = await prepareVideoLiveIsolation(source);
    prepared = result.directory;
    assert.notEqual(fs.realpathSync(prepared), fs.realpathSync(source));
    assert.equal(fs.statSync(prepared).mode & 0o777, 0o700);
    for (const name of [".env", "client-context.json", "storage.sqlite"]) {
      assert.equal(fs.statSync(path.join(prepared, name)).mode & 0o777, 0o600);
    }
    const context = JSON.parse(fs.readFileSync(path.join(prepared, "client-context.json"), "utf8"));
    assert.notEqual(context.owner, context.stranger);
    assert.equal(new URL(context.baseUrl).hostname, "127.0.0.1");
    assert.equal(context.cliToken.length > 0, true);
    assert.equal(createHash("sha256").update(fs.readFileSync(databasePath)).digest("hex"), before);
  } finally {
    if (prepared) fs.rmSync(prepared, { recursive: true, force: true });
    fs.rmSync(source, { recursive: true, force: true });
  }
});
