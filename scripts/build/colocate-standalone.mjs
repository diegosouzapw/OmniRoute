#!/usr/bin/env node
/**
 * OmniRoute — Co-locate runtime workers into the raw Next standalone build.
 *
 * WHY: `npm run build` produces `.build/next/standalone/` and THIS machine's PM2
 * deployment runs `server.js` from that directory directly (not the assembled
 * `dist/` bundle). The standalone trace cannot see worker_threads entrypoints
 * resolved at runtime, including the required call-log artifact worker and the
 * optional LLMLingua-2 worker (`open-sse/services/compression/engines/llmlingua/onnxWorker.js`,
 * dynamically spawned via worker_threads — untraceable by webpack). It also omits
 * LLMLingua's optional SLM deps (`@atjsh/llmlingua-2`, `js-tiktoken`) — they are
 * optionalDependencies and are only installed at the ROOT `node_modules`.
 *
 * The call-log worker is required, so a bundle failure must fail the build.
 * LLMLingua remains fail-soft when its optional dependencies are absent.
 *
 * Run manually after a build, or automatically via the `postbuild` npm hook.
 */
import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { runBuildTool } from "./buildToolRunner.mjs";
import { computeDependencyClosure } from "./colocateOptionals.mjs";

const ROOT = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
// STANDALONE defaults to the real build output; OMNIROUTE_STANDALONE_DIR overrides
// it so tests can drive the co-location logic against a synthetic tree without a
// full `next build`. Mirrors the OMNIROUTE_* override seams in the sibling build
// scripts (write-build-sha.mjs, write-build-base-path.mjs, optionalPackStaging.mjs).
const STANDALONE = process.env.OMNIROUTE_STANDALONE_DIR
  ? process.env.OMNIROUTE_STANDALONE_DIR
  : join(ROOT, ".build", "next", "standalone");

const CALL_LOG_WORKER_REL = join("src", "lib", "usage", "callLogArtifactWorker.js");
const CALL_LOG_WORKER_SRC = join(ROOT, "src", "lib", "usage", "callLogArtifactWorker.ts");
const COMPRESSION_WORKER_REL = join("open-sse", "services", "compression", "compressionWorker.js");
const COMPRESSION_WORKER_SRC = join(
  ROOT,
  "open-sse",
  "services",
  "compression",
  "compressionWorker.ts"
);
const WORKER_REL = join(
  "open-sse",
  "services",
  "compression",
  "engines",
  "llmlingua",
  "onnxWorker.js"
);

/**
 * Give each esbuild'd ESM worker its OWN `"type":"module"` scope.
 *
 * The worker bundles are emitted with `--format=esm` under `.js` names, so Node
 * needs a nearest-ancestor package.json declaring `"type":"module"` to load them
 * as ESM. It is tempting to set that on the standalone ROOT package.json, but the
 * standalone entrypoint `server.js` is CommonJS (`require()`, `__dirname`); a root
 * `"type":"module"` makes Node parse server.js as ESM and it crashes at startup
 * with `ReferenceError: require is not defined in ES module scope`.
 * assembleStandalone.mjs::patchStandalonePackageJson strips `type` for exactly
 * this reason — re-adding it on the root here reintroduced that crash.
 *
 * Node resolves module type from the NEAREST package.json, so a scoped
 * `{"type":"module"}` beside each worker makes the worker ESM while the root stays
 * CommonJS for server.js. Both coexist with no format change and no root edit.
 *
 * @param {string[]} workerDirs Absolute directories that hold an ESM worker bundle.
 * @returns {string[]} The package.json paths that were written (existing ones are left intact).
 */
export function writeEsmWorkerScopes(workerDirs) {
  const written = [];
  for (const dir of workerDirs) {
    const scopedPkgPath = join(dir, "package.json");
    if (existsSync(scopedPkgPath)) continue; // never clobber a traced package.json
    try {
      writeFileSync(scopedPkgPath, JSON.stringify({ type: "module" }, null, 2) + "\n", "utf8");
      written.push(scopedPkgPath);
      console.log(`[colocate-standalone] ✅ ESM scope written: ${scopedPkgPath}`);
    } catch (err) {
      console.warn(`[colocate-standalone] ⚠️  could not write ESM scope for ${dir}:`, err.message);
    }
  }
  return written;
}

function main() {
  const hasOptionals = existsSync(
    join(ROOT, "node_modules", "@atjsh", "llmlingua-2", "package.json")
  );

  if (!existsSync(STANDALONE)) {
    console.log("[colocate-standalone] .build/next/standalone not found — nothing to do.");
    return;
  }

  const healthWorkerDest = join(STANDALONE, "src/lib/db/healthCheckWorker.js");
  mkdirSync(dirname(healthWorkerDest), { recursive: true });
  runBuildTool(
    "esbuild",
    "esbuild",
    [
      join(ROOT, "src/lib/db/healthCheckWorker.ts"),
      "--bundle",
      "--platform=node",
      "--packages=external",
      "--format=esm",
      `--outfile=${healthWorkerDest}`,
    ],
    { stdio: "inherit" }
  );

  const callLogWorkerDest = join(STANDALONE, CALL_LOG_WORKER_REL);
  mkdirSync(dirname(callLogWorkerDest), { recursive: true });
  // Never spawn `node_modules/.bin/esbuild` directly: that extensionless path is
  // a POSIX shell script and does not exist on Windows (ENOENT), which failed
  // `npm run build` right after a successful `next build`. See buildToolRunner.mjs.
  runBuildTool(
    "esbuild",
    "esbuild",
    [
      CALL_LOG_WORKER_SRC,
      "--bundle",
      "--platform=node",
      "--packages=external",
      "--format=esm",
      `--outfile=${callLogWorkerDest}`,
    ],
    { stdio: "inherit" }
  );
  console.log("[colocate-standalone] ✅ call-log artifact worker bundled");

  const compressionWorkerDest = join(STANDALONE, COMPRESSION_WORKER_REL);
  mkdirSync(dirname(compressionWorkerDest), { recursive: true });
  runBuildTool(
    "esbuild",
    "esbuild",
    [
      COMPRESSION_WORKER_SRC,
      "--bundle",
      "--platform=node",
      "--packages=external",
      "--format=esm",
      `--outfile=${compressionWorkerDest}`,
    ],
    { stdio: "inherit" }
  );
  console.log("[colocate-standalone] ✅ compression worker bundled");

  // The call-log worker is always present; scope it to ESM immediately. The
  // optional LLMLingua worker dir is added below only when its deps are installed.
  const workerDirs = [
    dirname(healthWorkerDest),
    dirname(callLogWorkerDest),
    dirname(compressionWorkerDest),
  ];

  if (!hasOptionals) {
    console.log(
      "[colocate-standalone] optional SLM deps absent at root node_modules — LLMLingua stays fail-open (slim install)."
    );
    writeEsmWorkerScopes(workerDirs);
    return;
  }

  // 1) Bundle the worker the resolver expects: <standalone>/open-sse/.../onnxWorker.js
  const workerDest = join(STANDALONE, WORKER_REL);
  if (!existsSync(workerDest)) {
    mkdirSync(dirname(workerDest), { recursive: true });
    try {
      runBuildTool(
        "esbuild",
        "esbuild",
        [
          join(
            ROOT,
            "open-sse",
            "services",
            "compression",
            "engines",
            "llmlingua",
            "onnxWorker.ts"
          ),
          "--bundle",
          "--platform=node",
          "--packages=external",
          "--format=esm",
          `--outfile=${workerDest}`,
        ],
        { stdio: "inherit" }
      );
      console.log("[colocate-standalone] ✅ LLMLingua worker bundled into standalone tree");
    } catch (err) {
      console.warn("[colocate-standalone] ⚠️  worker bundle error:", err.message);
    }
  } else {
    console.log("[colocate-standalone] worker already present (skipping bundle)");
  }
  workerDirs.push(dirname(workerDest));

  // 2) Co-locate the optional-dep closure (NO-CLOBBER, same semantics as colocateOptionals.mjs)
  const srcNm = join(ROOT, "node_modules");
  const dstNm = join(STANDALONE, "node_modules");
  const closure = computeDependencyClosure(srcNm);
  let copied = 0;
  for (const pkg of closure) {
    const src = join(srcNm, pkg);
    const dst = join(dstNm, pkg);
    if (!existsSync(src)) continue;
    if (existsSync(dst)) continue; // no-clobber: keep traced instances (e.g. pinned @huggingface/transformers)
    mkdirSync(dirname(dst), { recursive: true });
    cpSync(src, dst, { recursive: true });
    copied++;
  }
  console.log(
    `[colocate-standalone] ✅ optional-dep closure: ${closure.length} packages (copied ${copied})`
  );

  // 3) Give each esbuild'd ESM worker its own "type":"module" scope (see helper doc).
  writeEsmWorkerScopes(workerDirs);
}

// Run as a script (npm `postbuild` hook), but stay importable for unit tests.
const entryScript = process.argv[1] ? pathToFileURL(process.argv[1]).href : null;
if (entryScript === import.meta.url) {
  main();
}
