import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "omni-snapshot-16035-"));
process.env.DATA_DIR = root;
process.env.OMNIROUTE_PLUGINS_DIR = path.join(root, "plugins");
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { createSqlJsAdapter } = await import("../../src/lib/db/adapters/sqljsAdapter.ts");
const { createPreMigrationBackup } =
  await import("../../src/lib/db/migrationRunner/preMigrationBackup.ts");

test.after(() => fs.rmSync(root, { recursive: true, force: true }));

test("EACCES hard-link denial still publishes a complete durable SQLite snapshot", async (t) => {
  const db = await createSqlJsAdapter(path.join(root, "storage.sqlite"));
  db.exec("CREATE TABLE preserved(id INTEGER); INSERT INTO preserved VALUES (42)");
  t.mock.method(fs, "linkSync", () => {
    throw Object.assign(new Error("Termux hard-link denial"), { code: "EACCES" });
  });
  try {
    const receipt = createPreMigrationBackup(db);
    assert.ok(receipt);
    const snapshot = await createSqlJsAdapter(receipt.path);
    try {
      assert.deepEqual(snapshot.prepare("SELECT * FROM preserved").all(), [{ id: 42 }]);
    } finally {
      snapshot.close();
    }
    assert.deepEqual(createPreMigrationBackup(db), receipt, "unchanged retry reuses its snapshot");
  } finally {
    db.close();
  }
});

async function fixture(t: import("node:test").TestContext) {
  const directory = fs.mkdtempSync(path.join(root, "fixture-"));
  const db = await createSqlJsAdapter(path.join(directory, "storage.sqlite"));
  db.exec("CREATE TABLE preserved(id INTEGER); INSERT INTO preserved VALUES (42)");
  t.after(() => db.close());
  return { db, directory, backups: path.join(directory, "db_backups") };
}

function denyLinks(t: import("node:test").TestContext, code = "EACCES") {
  t.mock.method(fs, "linkSync", () => {
    throw Object.assign(new Error(`hard links unavailable: ${code}`), { code });
  });
}

for (const code of ["EPERM", "ENOTSUP", "EOPNOTSUPP", "EXDEV", "ENOSYS"]) {
  test(`portable publication also handles ${code}`, async (t) => {
    const { db } = await fixture(t);
    denyLinks(t, code);
    const receipt = createPreMigrationBackup(db);
    assert.ok(receipt);
    assert.ok(fs.lstatSync(receipt.path).isFile());
    assert.match(receipt.path, /\.snapshot[/\\]snapshot\.sqlite$/);
  });
}

test("hard-link fast path preserves flat snapshots and reuses them after links become denied", async (t) => {
  const { db, backups } = await fixture(t);
  const receipt = createPreMigrationBackup(db);
  assert.ok(receipt);
  assert.equal(path.dirname(receipt.path), backups);
  denyLinks(t);
  assert.deepEqual(createPreMigrationBackup(db), receipt);
});

test("portable publisher fsyncs the complete image and staging directory before rename", async (t) => {
  const { db, backups } = await fixture(t);
  denyLinks(t);
  const fsync = fs.fsyncSync;
  const rename = fs.renameSync;
  const synced: Array<{ ino: number; directory: boolean }> = [];
  let renames = 0;
  t.mock.method(fs, "fsyncSync", (fd: number) => {
    const stat = fs.fstatSync(fd);
    synced.push({ ino: stat.ino, directory: stat.isDirectory() });
    fsync(fd);
  });
  t.mock.method(fs, "renameSync", (source: string, destination: string) => {
    renames++;
    assert.equal(fs.existsSync(destination), false);
    assert.ok(synced.some((entry) => entry.ino === fs.statSync(source).ino && entry.directory));
    assert.ok(
      synced.some(
        (entry) =>
          entry.ino === fs.statSync(path.join(source, "snapshot.sqlite")).ino && !entry.directory
      )
    );
    rename(source, destination);
  });
  const receipt = createPreMigrationBackup(db);
  assert.ok(receipt);
  assert.equal(renames, 1);
  assert.ok(synced.some((entry) => entry.ino === fs.statSync(backups).ino && entry.directory));
  assert.equal(
    fs.readdirSync(backups).some((entry) => entry.startsWith(".migration-snapshot-")),
    false
  );
});

test("concurrent publishers reuse the complete winning directory without overwriting it", async (t) => {
  const { db } = await fixture(t);
  denyLinks(t);
  const rename = fs.renameSync;
  let winner: ReturnType<typeof createPreMigrationBackup>;
  t.mock.method(fs, "renameSync", (source: string, destination: string) => {
    t.mock.restoreAll();
    denyLinks(t);
    winner = createPreMigrationBackup(db);
    rename(source, destination); // Real ENOTEMPTY against the winner, not a fabricated errno.
  });
  const receipt = createPreMigrationBackup(db);
  assert.deepEqual(receipt, winner);
  assert.ok(receipt);
  assert.equal(fs.statSync(receipt.path).nlink, 1);
});

for (const kind of ["file", "symlink", "directory", "empty-directory"]) {
  test(`portable publication preserves a colliding ${kind}`, async (t) => {
    const { db, directory } = await fixture(t);
    denyLinks(t);
    const lstat = fs.lstatSync;
    let collision = "";
    const outside = path.join(directory, "untouched");
    fs.writeFileSync(outside, "keep");
    t.mock.method(
      fs,
      "lstatSync",
      (target: fs.PathLike, options?: { throwIfNoEntry?: boolean }) => {
        const name = String(target);
        if (!collision && name.endsWith(".sqlite.snapshot")) {
          collision = name;
          if (kind === "file") fs.writeFileSync(name, "keep");
          else if (kind === "symlink") fs.symlinkSync(outside, name);
          else {
            fs.mkdirSync(name);
            if (kind === "directory") fs.writeFileSync(path.join(name, "snapshot.sqlite"), "keep");
          }
        }
        return lstat(target, options);
      }
    );
    assert.throws(() => createPreMigrationBackup(db), /Refusing to migrate/);
    assert.ok(collision);
    assert.ok(lstat(collision));
    assert.equal(fs.readFileSync(outside, "utf8"), "keep");
    if (kind === "directory")
      assert.equal(fs.readFileSync(path.join(collision, "snapshot.sqlite"), "utf8"), "keep");
  });
}

for (const phase of ["before-rename", "after-rename"]) {
  test(`publication failure ${phase} fails closed and never deletes a published snapshot`, async (t) => {
    const { db, backups } = await fixture(t);
    denyLinks(t);
    const rename = fs.renameSync;
    const fsync = fs.fsyncSync;
    let published = "";
    t.mock.method(fs, "renameSync", (source: string, destination: string) => {
      if (phase === "before-rename")
        throw Object.assign(new Error("rename I/O failure"), { code: "EIO" });
      rename(source, destination);
      published = destination;
    });
    t.mock.method(fs, "fsyncSync", (fd: number) => {
      if (published) throw Object.assign(new Error("durability I/O failure"), { code: "EIO" });
      fsync(fd);
    });
    assert.throws(() => createPreMigrationBackup(db), /Refusing to migrate/);
    assert.equal(
      fs.readdirSync(backups).some((entry) => entry.startsWith(".migration-snapshot-")),
      false
    );
    if (phase === "before-rename") assert.deepEqual(fs.readdirSync(backups), []);
    else assert.ok(fs.statSync(path.join(published, "snapshot.sqlite")).size > 0);
  });
}

test("snapshot publication rejects a symlinked backup directory", async (t) => {
  const { db, directory, backups } = await fixture(t);
  const outside = path.join(directory, "outside");
  fs.mkdirSync(outside);
  fs.symlinkSync(outside, backups, "dir");
  denyLinks(t);
  assert.throws(() => createPreMigrationBackup(db), /Refusing to migrate/);
  assert.deepEqual(fs.readdirSync(outside), []);
});

test("reusing a portable snapshot also synchronizes its containing directory", async (t) => {
  const { db } = await fixture(t);
  denyLinks(t);
  const receipt = createPreMigrationBackup(db);
  assert.ok(receipt);
  const directoryInode = fs.statSync(path.dirname(receipt.path)).ino;
  const fsync = fs.fsyncSync;
  let directorySynced = false;
  t.mock.method(fs, "fsyncSync", (fd: number) => {
    if (fs.fstatSync(fd).ino === directoryInode) directorySynced = true;
    fsync(fd);
  });
  assert.deepEqual(createPreMigrationBackup(db), receipt);
  if (process.platform !== "win32") assert.equal(directorySynced, true);
});
