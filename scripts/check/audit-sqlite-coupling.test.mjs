import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const scriptPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "audit-sqlite-coupling.mjs"
);

function git(cwd, ...args) {
  return execFileSync("git", args, { cwd, encoding: "utf8" });
}

test("audit separates code syntax from comments/literals and rejects a dirty corpus", () => {
  const root = mkdtempSync(path.join(tmpdir(), "omniroute-sqlite-audit-"));

  try {
    mkdirSync(path.join(root, "scripts/check"), { recursive: true });
    mkdirSync(path.join(root, "src/lib/db/migrations"), { recursive: true });
    cpSync(scriptPath, path.join(root, "scripts/check/audit-sqlite-coupling.mjs"));

    writeFileSync(
      path.join(root, "src/lib/db/core.ts"),
      `export function internal(db) { return db.prepare("SELECT 1"); }\n`
    );
    writeFileSync(
      path.join(root, "src/consumer.ts"),
      `import { getDbInstance } from "./lib/db/core";\n` +
        `import { getSettings } from "@/lib/localDb";\n` +
        `// getDbInstance().prepare("comment only")\n` +
        `const fixture = "getDbInstance().prepare('literal only')";\n` +
        "const template = `getDbInstance().prepare('template only')`;\n" +
        `export const value = getDbInstance().prepare("SELECT 1");\n`
    );
    writeFileSync(
      path.join(root, "src/lib/db/migrations/001_fixture.sql"),
      "PRAGMA foreign_keys = ON;\nCREATE TABLE fixture (id INTEGER PRIMARY KEY AUTOINCREMENT);\n"
    );

    git(root, "init", "-q");
    git(root, "config", "user.email", "audit@example.invalid");
    git(root, "config", "user.name", "Audit Test");
    git(root, "add", ".");
    git(root, "commit", "-qm", "fixture");

    const result = JSON.parse(
      execFileSync("node", ["scripts/check/audit-sqlite-coupling.mjs", "--json"], {
        cwd: root,
        encoding: "utf8",
      })
    );

    assert.equal(result.boundaries.directGetDbInstanceOutsideDbLayer.files, 1);
    assert.equal(result.boundaries.directGetDbInstanceOutsideDbLayer.occurrences, 1);
    assert.equal(result.boundaries.localDbImportConsumers.files, 1);
    assert.equal(result.adapterSurface.prepare.total.occurrences, 2);
    assert.equal(result.adapterSurface.prepare.insideDbLayer.occurrences, 1);
    assert.equal(result.adapterSurface.prepare.outsideDbLayer.occurrences, 1);
    assert.equal(result.adapterSurface.prepare.total.matches.length, 2);
    assert.equal(result.sqliteDialect.pragma.occurrences, 1);
    assert.match(result.corpusSha256, /^[a-f0-9]{64}$/);

    writeFileSync(path.join(root, "src/consumer.ts"), "// dirty tracked source\n", { flag: "a" });
    const dirtyRun = spawnSync("node", ["scripts/check/audit-sqlite-coupling.mjs", "--json"], {
      cwd: root,
      encoding: "utf8",
    });
    assert.notEqual(dirtyRun.status, 0);
    assert.match(dirtyRun.stderr, /Refusing to audit/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
