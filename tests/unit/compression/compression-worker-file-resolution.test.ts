import assert from "node:assert/strict";
import { after, describe, it } from "node:test";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync, realpathSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  firstAncestorWith,
  resolveWorkerFile,
} from "../../../open-sse/services/compression/compressionWorkerPool.ts";

/**
 * Regression tests for the runtime-anchor worker-file resolution (#12183): the
 * standalone bundle kills `import.meta.url`/`__dirname`, so the pool resolves
 * `compressionWorker.{js,ts}` from `process.cwd()` and `dirname(process.argv[1])`
 * with a bounded walk-up — the same pattern documented in
 * open-sse/services/compression/engines/llmlingua/worker.ts.
 *
 * All fixtures live in mkdtemp sandboxes; the real repo tree is never touched —
 * the sandboxes sit under os.tmpdir(), whose ancestors do not contain an
 * `open-sse/services/compression/` install root, so the walk-up cannot escape
 * into the actual project.
 */

const WORKER_JS_REL = join("open-sse", "services", "compression", "compressionWorker.js");
const WORKER_TS_REL = join("open-sse", "services", "compression", "compressionWorker.ts");

const sandboxes: string[] = [];

function makeSandbox(): string {
  // realpath so assertions survive tmpdir symlinks (e.g. /tmp → /private/tmp).
  const dir = realpathSync(mkdtempSync(join(tmpdir(), "omni-worker-anchors-")));
  sandboxes.push(dir);
  return dir;
}

/** Creates `<root>/open-sse/services/compression/<fileName>` with stub content. */
function makeInstallRoot(root: string, fileName: string): void {
  const dir = join(root, "open-sse", "services", "compression");
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, fileName), "// test stub worker\n");
}

/** Runs `fn` with a fake cwd + argv[1], restoring both afterwards. */
function withRuntime<T>(cwd: string, argv1: string, fn: () => T): T {
  const originalCwd = process.cwd();
  const originalArgv1 = process.argv[1];
  process.chdir(cwd);
  process.argv[1] = argv1;
  try {
    return fn();
  } finally {
    process.argv[1] = originalArgv1;
    process.chdir(originalCwd);
  }
}

after(() => {
  for (const dir of sandboxes) rmSync(dir, { recursive: true, force: true });
});

describe("resolveWorkerFile (runtime anchors)", () => {
  it("resolves the .js worker from the cwd anchor", () => {
    const installRoot = makeSandbox();
    makeInstallRoot(installRoot, "compressionWorker.js");
    const elsewhere = makeSandbox();
    const resolved = withRuntime(installRoot, join(elsewhere, "server.js"), () =>
      resolveWorkerFile()
    );
    assert.equal(resolved, join(installRoot, WORKER_JS_REL));
  });

  it("resolves the .js worker from dirname(argv[1]) when cwd has none", () => {
    const emptyCwd = makeSandbox();
    const installRoot = makeSandbox();
    makeInstallRoot(installRoot, "compressionWorker.js");
    const resolved = withRuntime(emptyCwd, join(installRoot, "server.js"), () =>
      resolveWorkerFile()
    );
    assert.equal(resolved, join(installRoot, WORKER_JS_REL));
  });

  it("walks up from a nested cwd until it finds the install root", () => {
    const installRoot = makeSandbox();
    makeInstallRoot(installRoot, "compressionWorker.js");
    const nested = join(installRoot, "a", "b", "c");
    mkdirSync(nested, { recursive: true });
    const elsewhere = makeSandbox();
    const resolved = withRuntime(nested, join(elsewhere, "server.js"), () => resolveWorkerFile());
    assert.equal(resolved, join(installRoot, WORKER_JS_REL));
  });

  it("falls back to the .ts source when no .js exists (dev loader path)", () => {
    const installRoot = makeSandbox();
    makeInstallRoot(installRoot, "compressionWorker.ts");
    const elsewhere = makeSandbox();
    const resolved = withRuntime(installRoot, join(elsewhere, "server.js"), () =>
      resolveWorkerFile()
    );
    assert.equal(resolved, join(installRoot, WORKER_TS_REL));
  });

  it("prefers a .js root on ANY anchor over a .ts root (prod-first ordering)", () => {
    const tsRoot = makeSandbox();
    makeInstallRoot(tsRoot, "compressionWorker.ts");
    const jsRoot = makeSandbox();
    makeInstallRoot(jsRoot, "compressionWorker.js");
    // cwd only has the .ts source; argv[1] sits in the .js install root.
    const resolved = withRuntime(tsRoot, join(jsRoot, "server.js"), () => resolveWorkerFile());
    assert.equal(resolved, join(jsRoot, WORKER_JS_REL));
  });

  it("returns the cwd-relative .js fallback (without throwing) when nothing exists", () => {
    const emptyCwd = makeSandbox();
    const emptyBin = makeSandbox();
    const resolved = withRuntime(emptyCwd, join(emptyBin, "server.js"), () => resolveWorkerFile());
    assert.equal(resolved, join(emptyCwd, WORKER_JS_REL));
  });
});

describe("firstAncestorWith", () => {
  it("returns the anchor itself when it already contains relPath", () => {
    const installRoot = makeSandbox();
    makeInstallRoot(installRoot, "compressionWorker.js");
    assert.equal(firstAncestorWith([installRoot], WORKER_JS_REL), installRoot);
  });

  it("skips empty anchors and returns null when nothing matches", () => {
    const empty = makeSandbox();
    assert.equal(firstAncestorWith(["", empty], WORKER_JS_REL), null);
    assert.equal(firstAncestorWith([], WORKER_JS_REL), null);
  });

  it("finds a root up to 8 levels above the anchor, but not 9 (walk-up cap)", () => {
    const installRoot = makeSandbox();
    makeInstallRoot(installRoot, "compressionWorker.js");
    const eightDeep = join(installRoot, ...Array.from({ length: 8 }, (_, i) => `d${i}`));
    mkdirSync(eightDeep, { recursive: true });
    assert.equal(firstAncestorWith([eightDeep], WORKER_JS_REL), installRoot);
    const nineDeep = join(installRoot, ...Array.from({ length: 9 }, (_, i) => `d${i}`));
    mkdirSync(nineDeep, { recursive: true });
    assert.equal(firstAncestorWith([nineDeep], WORKER_JS_REL), null);
  });
});
