#!/usr/bin/env node

/**
 * OmniRoute — Co-locate the LLMLingua-2 optional dependency closure into the standalone bundle.
 *
 * The compression "ultra" SLM tier (PR #4257) runs `@atjsh/llmlingua-2` +
 * `@huggingface/transformers` + `@tensorflow/tfjs` + `js-tiktoken` inside a worker thread
 * (`open-sse/services/compression/engines/llmlingua/onnxWorker.js`, shipped under `dist/`). These
 * are `optionalDependencies`: npm installs them into the ROOT `node_modules` on
 * `--include=optional`, but the Next.js standalone trace bundles ONLY `@huggingface/transformers`
 * (3.5.2, pinned) into `dist/node_modules` — it does NOT trace the optional, dynamically-imported
 * SLM packages.
 *
 * ## Why this matters (the instance-split bug)
 *
 * The worker lives under `dist/`, so its `import("@huggingface/transformers")` resolves
 * `dist/node_modules/@huggingface/transformers` (3.5.2) and the worker sets the model `cacheDir`
 * on THAT instance's `env`. But its `import("@atjsh/llmlingua-2")` walks past `dist/node_modules`
 * (no `@atjsh` there) up to the ROOT `node_modules`, and llmlingua-2's own
 * `import("@huggingface/transformers")` then resolves the ROOT transformers — a DIFFERENT instance.
 * The `cacheDir`/`localModelPath` config the worker set never reaches the instance llmlingua-2
 * actually uses, so the local model under `DATA_DIR/models/llmlingua` is never found and the SLM
 * tier silently fails-open (no compression). Worse, if the root transformers is a 4.x line,
 * llmlingua-2 throws on a tokenizer-API change (`decoder.decode` is undefined).
 *
 * ## The fix
 *
 * Co-locate the SLM optional dependency CLOSURE from the root `node_modules` into
 * `dist/node_modules` (NO-CLOBBER, so the pinned `dist` transformers 3.5.2 / onnxruntime / sharp
 * stay). Then the worker resolves `@atjsh/llmlingua-2` AND `@huggingface/transformers` from the
 * SAME `dist/node_modules` — a single 3.5.2 instance — so the env config applies and the local
 * model loads.
 *
 * `@huggingface/transformers` is intentionally NOT a closure seed: it is a PEER of
 * `@atjsh/llmlingua-2` (not a regular dependency) and is already bundled in `dist/node_modules`,
 * so the closure walk never reaches it and the no-clobber guard would skip it anyway.
 *
 * ## Validation (Hard Rule #18)
 *
 * Manual co-location of this exact closure on the production VPS produced real 54.8% compression
 * (11520 → 5203 chars) via real ONNX inference — both the default and the `modelPath` (PR #4257)
 * code paths. See the unit test for the closure-walk + no-clobber contract.
 *
 * Idempotent + fail-soft: skips when the optionals are absent (the common case — they are OPTIONAL)
 * or already co-located; a per-package copy failure only disables the SLM tier, which is itself
 * fail-open, so this never throws into the install.
 */

import { cpSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

/**
 * Entry packages of the SLM optional stack (the closure roots). `@huggingface/transformers` is
 * deliberately absent — it is the pinned instance already present in `dist/node_modules`.
 */
export const SEED_PACKAGES = ["@atjsh/llmlingua-2", "@tensorflow/tfjs", "js-tiktoken"];

/**
 * Compute the transitive dependency closure of `seeds` by walking each package's `dependencies` +
 * `optionalDependencies` from a `node_modules` directory. Packages that are not present in that
 * tree (e.g. peers provided elsewhere, like `@huggingface/transformers` in `dist`) are skipped —
 * the closure only contains packages that actually exist in `nodeModulesDir`.
 *
 * @param {string} nodeModulesDir absolute path to the source `node_modules`
 * @param {string[]} [seeds] closure roots (defaults to {@link SEED_PACKAGES})
 * @returns {string[]} package names in discovery order, seeds first
 */
export function computeDependencyClosure(nodeModulesDir, seeds = SEED_PACKAGES) {
  const closure = [];
  const seen = new Set();
  const stack = [...seeds];

  while (stack.length) {
    const name = stack.shift();
    if (seen.has(name)) continue;
    seen.add(name);

    const pkgDir = join(nodeModulesDir, name);
    if (!existsSync(pkgDir)) continue; // absent in this tree (peer provided elsewhere) — skip

    closure.push(name);

    let manifest;
    try {
      manifest = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8"));
    } catch {
      continue; // unreadable/absent manifest — copy the dir but do not recurse
    }

    const deps = { ...manifest.dependencies, ...manifest.optionalDependencies };
    for (const dep of Object.keys(deps)) {
      if (!seen.has(dep)) stack.push(dep);
    }
  }

  return closure;
}

/**
 * Co-locate the SLM optional closure from `<rootDir>/node_modules` into
 * `<rootDir>/dist/node_modules`. No-op when the standalone `dist` bundle or the optional seeds are
 * absent, and idempotent once co-located. Never throws.
 *
 * @param {{ rootDir: string, log?: (message: string) => void }} opts
 * @returns {{ skipped: true, reason: string }
 *   | { skipped: false, copied: number, closure: number }}
 */
export function colocateLlmlinguaOptionals({ rootDir, log = () => {} }) {
  const rootNm = join(rootDir, "node_modules");
  const distNm = join(rootDir, "dist", "node_modules");

  if (!existsSync(distNm)) {
    return { skipped: true, reason: "no standalone dist/node_modules" };
  }
  // Gate: only run when the optional stack was actually installed (`npm install --include=optional`).
  if (!SEED_PACKAGES.every((seed) => existsSync(join(rootNm, seed)))) {
    return { skipped: true, reason: "SLM optionals not installed at root" };
  }
  // Idempotent: the entry package is already co-located → nothing to do.
  if (existsSync(join(distNm, "@atjsh", "llmlingua-2"))) {
    return { skipped: true, reason: "already co-located" };
  }

  const closure = computeDependencyClosure(rootNm);
  let copied = 0;

  for (const name of closure) {
    const dest = join(distNm, name);
    if (existsSync(dest)) continue; // no-clobber: keep dist's pinned copy (transformers 3.5.2, …)
    try {
      mkdirSync(dirname(dest), { recursive: true });
      cpSync(join(rootNm, name), dest, { recursive: true });
      copied++;
    } catch (err) {
      log(`  ⚠️  LLMLingua optional co-location failed for ${name}: ${err.message}`);
    }
  }

  if (copied > 0) {
    log(`  ✅ Co-located ${copied} LLMLingua SLM optional package(s) into dist/node_modules.\n`);
  }

  return { skipped: false, copied, closure: closure.length };
}
