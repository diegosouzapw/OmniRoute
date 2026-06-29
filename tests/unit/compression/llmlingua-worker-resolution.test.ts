/**
 * Regression guard for B-SLM: the LLMLingua worker must resolve its deps + worker
 * file WITHOUT relying on `import.meta.url`.
 *
 * Root cause (confirmed via dist/.build/next/server/chunks/26410.js): webpack
 * replaces `createRequire(import.meta.url)` with a stub that throws MODULE_NOT_FOUND
 * and freezes `import.meta.url` to the build-machine path. Both make the worker
 * never spawn in the standalone bundle. The resolution must use runtime anchors
 * (process.cwd() / process.argv[1]) instead.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  firstAncestorWith,
  resolveWorkerFile,
  depsAvailable,
} from "@omniroute/open-sse/services/compression/engines/llmlingua/worker.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const WORKER_SRC = path.resolve(
  here,
  "../../../open-sse/services/compression/engines/llmlingua/worker.ts"
);

/** Strip // line and block comments so we scan CODE, not doc-comments that may mention the banned APIs. */
function stripComments(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
}

test("worker.ts CODE never uses import.meta.url / createRequire (both die in the standalone bundle)", () => {
  const code = stripComments(fs.readFileSync(WORKER_SRC, "utf8"));
  assert.ok(!code.includes("import.meta"), "worker.ts code must not reference import.meta");
  assert.ok(
    !code.includes('from "node:module"'),
    "worker.ts must not import from node:module (createRequire)"
  );
  // pathToFileURL from node:url is safe — it's a pure path→URL converter with no
  // import.meta.url or createRequire dependency. It's needed to fix "File URL path
  // must be absolute" errors when the Worker constructor receives a path that needs
  // explicit file: URL conversion.
  const urlImports = code.match(/from\s+["']node:url["']/g) ?? [];
  const safeUrlImports = urlImports.filter((imp) => code.includes("pathToFileURL"));
  assert.equal(
    urlImports.length,
    safeUrlImports.length,
    "worker.ts must not import fileURLToPath or other unsafe node:url APIs (pathToFileURL is allowed)"
  );
});

test("firstAncestorWith walks up from anchors to find a marker", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "slm-root-"));
  try {
    // Build <tmp>/dist/node_modules/@atjsh/llmlingua-2/package.json and an anchor deep inside.
    const pkgDir = path.join(tmp, "dist", "node_modules", "@atjsh", "llmlingua-2");
    fs.mkdirSync(pkgDir, { recursive: true });
    fs.writeFileSync(path.join(pkgDir, "package.json"), "{}");
    const anchor = path.join(tmp, "dist", ".build", "next", "server", "chunks");
    fs.mkdirSync(anchor, { recursive: true });

    const rel = path.join("node_modules", "@atjsh", "llmlingua-2", "package.json");
    const found = firstAncestorWith([anchor], rel);
    assert.equal(found, path.join(tmp, "dist"), "must find the dist root by walking up");
    assert.equal(firstAncestorWith([anchor], path.join("node_modules", "nope")), null);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("resolveWorkerFile returns an existing onnxWorker file (no import.meta.url)", () => {
  // In this test env cwd is the worktree root, which contains the real source tree.
  const { workerFile } = resolveWorkerFile();
  assert.ok(fs.existsSync(workerFile), `resolved worker file must exist: ${workerFile}`);
  assert.ok(/onnxWorker\.(t|j)s$/.test(workerFile), `must point at onnxWorker: ${workerFile}`);
});

test("depsAvailable is true when @atjsh/llmlingua-2 is installed (symlinked node_modules)", () => {
  assert.equal(depsAvailable(), true);
});
