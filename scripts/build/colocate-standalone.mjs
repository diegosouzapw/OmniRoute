#!/usr/bin/env node
/**
 * OmniRoute — Co-locate the LLMLingua-2 runtime into the raw Next standalone build.
 *
 * WHY: `npm run build` produces `.build/next/standalone/` and THIS machine's PM2
 * deployment runs `server.js` from that directory directly (not the assembled
 * `dist/` bundle). The standalone trace:
 *   - does NOT bundle `open-sse/services/compression/engines/llmlingua/onnxWorker.js`
 *     (dynamically spawned via worker_threads — untraceable by webpack), and
 *   - does NOT include the optional SLM deps (`@atjsh/llmlingua-2`,
 *     `@tensorflow/tfjs`, `js-tiktoken`) — they are optionalDependencies and are
 *     only installed at the ROOT `node_modules`.
 *
 * Result: after every plain `npm run build`, the LLMLingua engine silently
 * fail-opens (text returned unchanged, no error) because the worker's runtime
 * anchors (`process.cwd()` = the standalone dir) find neither the worker file
 * nor the deps. This script re-applies both, mirroring what prepublish.ts +
 * colocateOptionals.mjs do for the `dist/` bundle.
 *
 * Idempotent + fail-soft: skips quietly when the optional deps are absent at the
 * root (the common slim-install case) and never throws into the build.
 *
 * Run manually after a build, or automatically via the `postbuild` npm hook.
 */
import { cpSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { computeDependencyClosure } from "./colocateOptionals.mjs";

const ROOT = dirname(dirname(dirname(fileURLToPath(import.meta.url))));
const STANDALONE = join(ROOT, ".build", "next", "standalone");

const WORKER_REL = join(
  "open-sse",
  "services",
  "compression",
  "engines",
  "llmlingua",
  "onnxWorker.js"
);
const GATE_PKG = join("node_modules", "@atjsh", "llmlingua-2", "package.json");

const hasOptionals = existsSync(
  join(ROOT, "node_modules", "@atjsh", "llmlingua-2", "package.json")
);

if (!existsSync(STANDALONE)) {
  console.log("[colocate-standalone] .build/next/standalone not found — nothing to do.");
  process.exit(0);
}
if (!hasOptionals) {
  console.log(
    "[colocate-standalone] optional SLM deps absent at root node_modules — LLMLingua stays fail-open (slim install)."
  );
  process.exit(0);
}

// 1) Bundle the worker the resolver expects: <standalone>/open-sse/.../onnxWorker.js
const workerDest = join(STANDALONE, WORKER_REL);
if (!existsSync(workerDest)) {
  mkdirSync(dirname(workerDest), { recursive: true });
  try {
    execFileSync(
      join(ROOT, "node_modules", ".bin", "esbuild"),
      [
        join(ROOT, "open-sse", "services", "compression", "engines", "llmlingua", "onnxWorker.ts"),
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
