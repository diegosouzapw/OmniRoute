import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";

import { writeEsmWorkerScopes } from "../../../scripts/build/colocate-standalone.mjs";

/**
 * Regression coverage for the standalone CJS/ESM `package.json` conflict.
 *
 * The Next.js standalone entrypoint `server.js` is CommonJS, so the standalone
 * root `package.json` must NOT carry `"type":"module"` (assembleStandalone strips
 * it). The colocated worker bundles are ESM `.js` files that DO need a
 * `"type":"module"` scope. Setting it on the root satisfied the workers but broke
 * server.js with `ReferenceError: require is not defined in ES module scope`.
 *
 * The fix scopes `"type":"module"` to each worker directory instead of the root.
 */

test("writeEsmWorkerScopes writes a scoped type:module beside each worker", () => {
  const root = mkdtempSync(join(tmpdir(), "colocate-scope-"));
  try {
    const workerA = join(root, "src", "lib", "usage");
    const workerB = join(root, "open-sse", "services", "compression", "engines", "llmlingua");
    mkdirSync(workerA, { recursive: true });
    mkdirSync(workerB, { recursive: true });

    const written = writeEsmWorkerScopes([workerA, workerB]);
    assert.equal(written.length, 2, "both worker dirs get a package.json");

    for (const dir of [workerA, workerB]) {
      const pkg = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
      assert.equal(pkg.type, "module", `${dir} declares type:module`);
    }
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("writeEsmWorkerScopes never touches the standalone root package.json", () => {
  const root = mkdtempSync(join(tmpdir(), "colocate-root-"));
  try {
    // Standalone root as assembleStandalone leaves it: CommonJS, no `type`.
    const rootPkgPath = join(root, "package.json");
    writeFileSync(rootPkgPath, JSON.stringify({ name: "omniroute-standalone" }, null, 2) + "\n");

    const workerDir = join(root, "src", "lib", "usage");
    mkdirSync(workerDir, { recursive: true });
    writeEsmWorkerScopes([workerDir]);

    const rootPkg = JSON.parse(readFileSync(rootPkgPath, "utf8"));
    assert.equal(
      rootPkg.type,
      undefined,
      "root package.json stays type-less so server.js is parsed as CommonJS"
    );
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("writeEsmWorkerScopes is no-clobber: it leaves an existing package.json intact", () => {
  const root = mkdtempSync(join(tmpdir(), "colocate-noclobber-"));
  try {
    const workerDir = join(root, "src", "lib", "usage");
    mkdirSync(workerDir, { recursive: true });
    const traced = { name: "already-traced", type: "module", version: "9.9.9" };
    writeFileSync(join(workerDir, "package.json"), JSON.stringify(traced, null, 2) + "\n");

    const written = writeEsmWorkerScopes([workerDir]);
    assert.equal(written.length, 0, "existing package.json is not rewritten");

    const pkg = JSON.parse(readFileSync(join(workerDir, "package.json"), "utf8"));
    assert.equal(pkg.version, "9.9.9", "the traced manifest is preserved verbatim");
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

// End-to-end proof that the scoping actually lets a CommonJS server.js and an ESM
// worker.js coexist under Node's nearest-package.json module resolution. This is
// the behavior the bug broke: with type:module on the root, `node server.js`
// threw "require is not defined in ES module scope".
test("scoped layout runs a CJS server.js and an ESM worker.js side by side", () => {
  const root = mkdtempSync(join(tmpdir(), "colocate-e2e-"));
  try {
    // Root: CommonJS entrypoint, no `type` (what assembleStandalone produces).
    writeFileSync(join(root, "package.json"), JSON.stringify({ name: "standalone" }) + "\n");
    writeFileSync(
      join(root, "server.js"),
      'const path = require("path");\nprocess.stdout.write("CJS_SERVER_OK:" + path.basename(__filename));\n'
    );

    // Worker: ESM bundle under its own directory.
    const workerDir = join(root, "src", "lib", "usage");
    mkdirSync(workerDir, { recursive: true });
    writeFileSync(
      join(workerDir, "callLogArtifactWorker.js"),
      'import os from "node:os";\nprocess.stdout.write("ESM_WORKER_OK:" + typeof os.cpus);\n'
    );

    writeEsmWorkerScopes([workerDir]);

    const serverOut = execFileSync(process.execPath, [join(root, "server.js")], {
      encoding: "utf8",
    });
    assert.match(
      serverOut,
      /CJS_SERVER_OK:server\.js/,
      "CommonJS server.js runs under the type-less root"
    );

    const workerOut = execFileSync(
      process.execPath,
      [join(workerDir, "callLogArtifactWorker.js")],
      { encoding: "utf8" }
    );
    assert.match(
      workerOut,
      /ESM_WORKER_OK:function/,
      "ESM worker.js runs under its scoped package.json"
    );
    assert.ok(existsSync(join(workerDir, "package.json")), "worker scope package.json exists");
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("colocate-standalone bundles the required compression worker", () => {
  const root = mkdtempSync(join(tmpdir(), "colocate-compression-worker-"));
  try {
    writeFileSync(join(root, "server.js"), "module.exports = {};\n");
    execFileSync(process.execPath, ["scripts/build/colocate-standalone.mjs"], {
      cwd: join(import.meta.dirname, "..", "..", ".."),
      env: { ...process.env, OMNIROUTE_STANDALONE_DIR: root },
      stdio: "pipe",
    });
    const workerDir = join(root, "open-sse", "services", "compression");
    assert.equal(existsSync(join(workerDir, "compressionWorker.js")), true);
    assert.equal(JSON.parse(readFileSync(join(workerDir, "package.json"), "utf8")).type, "module");
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
