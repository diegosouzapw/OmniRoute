import { test, describe } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

import { resolveSqlJsWasmPath } from "../../src/lib/db/adapters/sqljsAdapter.ts";

describe("sql.js WASM path resolution (#12960)", () => {
  test("resolves an existing sql-wasm.wasm in the current environment", (t) => {
    const origEnv = process.env.OMNIROUTE_SQLJS_WASM_PATH;
    delete process.env.OMNIROUTE_SQLJS_WASM_PATH;
    t.after(() => {
      if (origEnv !== undefined) {
        process.env.OMNIROUTE_SQLJS_WASM_PATH = origEnv;
      }
    });

    const wasmPath = resolveSqlJsWasmPath();
    assert.ok(typeof wasmPath === "string" && wasmPath.length > 0);
    assert.ok(fs.existsSync(wasmPath), `Resolved path must exist: ${wasmPath}`);
    assert.ok(wasmPath.endsWith("sql-wasm.wasm"));
  });

  test("honors OMNIROUTE_SQLJS_WASM_PATH when set to a valid file", (t) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "sqljs-override-"));
    const fakeWasm = path.join(tmpDir, "custom-sql-wasm.wasm");
    fs.writeFileSync(fakeWasm, "mock wasm binary");

    const origEnv = process.env.OMNIROUTE_SQLJS_WASM_PATH;
    process.env.OMNIROUTE_SQLJS_WASM_PATH = fakeWasm;

    t.after(() => {
      if (origEnv === undefined) {
        delete process.env.OMNIROUTE_SQLJS_WASM_PATH;
      } else {
        process.env.OMNIROUTE_SQLJS_WASM_PATH = origEnv;
      }
      fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    const resolved = resolveSqlJsWasmPath();
    assert.equal(resolved, fakeWasm);
  });

  test("resolves relative OMNIROUTE_SQLJS_WASM_PATH to an absolute path", (t) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "sqljs-rel-override-"));
    const fakeWasm = path.join(tmpDir, "rel-sql-wasm.wasm");
    fs.writeFileSync(fakeWasm, "mock wasm binary");

    const origCwd = process.cwd();
    process.chdir(tmpDir);

    const origEnv = process.env.OMNIROUTE_SQLJS_WASM_PATH;
    process.env.OMNIROUTE_SQLJS_WASM_PATH = "./rel-sql-wasm.wasm";

    t.after(() => {
      process.chdir(origCwd);
      if (origEnv === undefined) {
        delete process.env.OMNIROUTE_SQLJS_WASM_PATH;
      } else {
        process.env.OMNIROUTE_SQLJS_WASM_PATH = origEnv;
      }
      fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    const resolved = resolveSqlJsWasmPath();
    assert.ok(path.isAbsolute(resolved));
    assert.equal(fs.realpathSync(resolved), fs.realpathSync(fakeWasm));
  });

  test("throws when OMNIROUTE_SQLJS_WASM_PATH points to non-existent file", (t) => {
    const nonExistent = path.join(os.tmpdir(), `non-existent-wasm-${Date.now()}.wasm`);
    const origEnv = process.env.OMNIROUTE_SQLJS_WASM_PATH;
    process.env.OMNIROUTE_SQLJS_WASM_PATH = nonExistent;

    t.after(() => {
      if (origEnv === undefined) {
        delete process.env.OMNIROUTE_SQLJS_WASM_PATH;
      } else {
        process.env.OMNIROUTE_SQLJS_WASM_PATH = origEnv;
      }
    });

    assert.throws(
      () => resolveSqlJsWasmPath(),
      /OMNIROUTE_SQLJS_WASM_PATH is set to .* but the file cannot be accessed/
    );
  });

  test("throws when OMNIROUTE_SQLJS_WASM_PATH is set to an empty string", (t) => {
    const origEnv = process.env.OMNIROUTE_SQLJS_WASM_PATH;
    process.env.OMNIROUTE_SQLJS_WASM_PATH = "   ";

    t.after(() => {
      if (origEnv === undefined) {
        delete process.env.OMNIROUTE_SQLJS_WASM_PATH;
      } else {
        process.env.OMNIROUTE_SQLJS_WASM_PATH = origEnv;
      }
    });

    assert.throws(
      () => resolveSqlJsWasmPath(),
      /OMNIROUTE_SQLJS_WASM_PATH is set to an empty or whitespace-only string/
    );
  });

  test("throws when OMNIROUTE_SQLJS_WASM_PATH points to a directory", (t) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "sqljs-dir-wasm-"));
    const origEnv = process.env.OMNIROUTE_SQLJS_WASM_PATH;
    process.env.OMNIROUTE_SQLJS_WASM_PATH = tmpDir;

    t.after(() => {
      if (origEnv === undefined) {
        delete process.env.OMNIROUTE_SQLJS_WASM_PATH;
      } else {
        process.env.OMNIROUTE_SQLJS_WASM_PATH = origEnv;
      }
      fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    assert.throws(() => resolveSqlJsWasmPath(), /points to a directory, not a file/);
  });

  test("throws when OMNIROUTE_SQLJS_WASM_PATH points to an empty (0-byte) file", (t) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "sqljs-empty-wasm-"));
    const emptyWasm = path.join(tmpDir, "empty.wasm");
    fs.writeFileSync(emptyWasm, "");

    const origEnv = process.env.OMNIROUTE_SQLJS_WASM_PATH;
    process.env.OMNIROUTE_SQLJS_WASM_PATH = emptyWasm;

    t.after(() => {
      if (origEnv === undefined) {
        delete process.env.OMNIROUTE_SQLJS_WASM_PATH;
      } else {
        process.env.OMNIROUTE_SQLJS_WASM_PATH = origEnv;
      }
      fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    assert.throws(() => resolveSqlJsWasmPath(), /file is empty \(size=0\)/);
  });

  test("resolves from parent node_modules when cwd is <pkg>/dist (global install layout)", (t) => {
    // Simulate:
    // <tmpRoot>/lib/node_modules/omniroute/dist/  <-- cwd
    // <tmpRoot>/lib/node_modules/omniroute/node_modules/sql.js/dist/sql-wasm.wasm
    const tmpBase = fs.mkdtempSync(path.join(os.tmpdir(), "sqljs-global-layout-"));
    const pkgRoot = path.join(tmpBase, "lib", "node_modules", "omniroute");
    const distDir = path.join(pkgRoot, "dist");
    const sqlJsDist = path.join(pkgRoot, "node_modules", "sql.js", "dist");

    fs.mkdirSync(distDir, { recursive: true });
    fs.mkdirSync(sqlJsDist, { recursive: true });

    const targetWasm = path.join(sqlJsDist, "sql-wasm.wasm");
    fs.writeFileSync(targetWasm, "mock wasm");

    const origCwd = process.cwd();
    process.chdir(distDir);

    t.after(() => {
      process.chdir(origCwd);
      fs.rmSync(tmpBase, { recursive: true, force: true });
    });

    const resolved = resolveSqlJsWasmPath();
    assert.equal(fs.realpathSync(resolved), fs.realpathSync(targetWasm));
  });

  test("throws an actionable error naming the remedy when WASM cannot be found", (t) => {
    const tmpEmpty = fs.mkdtempSync(path.join(os.tmpdir(), "sqljs-empty-"));
    const origCwd = process.cwd();
    const origArgv1 = process.argv[1];

    process.chdir(tmpEmpty);
    // Point argv[1] to a non-existent location inside tmpEmpty so require.resolve cannot escape
    process.argv[1] = path.join(tmpEmpty, "dummy-server.js");

    t.after(() => {
      process.chdir(origCwd);
      process.argv[1] = origArgv1;
      fs.rmSync(tmpEmpty, { recursive: true, force: true });
    });

    let thrownError: Error | null = null;
    try {
      resolveSqlJsWasmPath();
    } catch (err) {
      thrownError = err as Error;
    }

    assert.ok(thrownError, "Expected resolveSqlJsWasmPath to throw");
    const msg = thrownError.message;

    // Must name the packaged sql.js problem
    assert.match(msg, /\[sqljsAdapter\] Packaged sql\.js runtime is incomplete/);
    // Must explain that the fallback WASM runtime could not locate the binary
    assert.match(msg, /fallback WASM runtime could not locate sql-wasm\.wasm/);
    // Must provide the actionable remedy for global and local installs (#12960)
    assert.match(msg, /npm rebuild better-sqlite3/);
    assert.match(msg, /docs\/guides\/TROUBLESHOOTING\.md/);
    assert.match(msg, /OMNIROUTE_SQLJS_WASM_PATH/);
  });

  test("rethrows non-MODULE_NOT_FOUND unexpected errors during require resolution", (t) => {
    const origCwd = process.cwd();
    const origArgv1 = process.argv[1];

    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "sqljs-rethrow-"));
    process.chdir(tmpDir);

    process.argv[1] = "\0invalid_null_byte_path";

    t.after(() => {
      process.chdir(origCwd);
      process.argv[1] = origArgv1;
      fs.rmSync(tmpDir, { recursive: true, force: true });
    });

    assert.throws(
      () => resolveSqlJsWasmPath(),
      (err: unknown) => {
        const error = err as Error;
        return (
          error.name === "TypeError" ||
          (error as { code?: string }).code === "ERR_INVALID_ARG_VALUE" ||
          error.message.includes("null byte")
        );
      }
    );
  });
});
