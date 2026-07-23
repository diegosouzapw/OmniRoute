import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";

import {
  computeDependencyClosure,
  colocateLlmlinguaOptionals,
  SEED_PACKAGES,
} from "../../scripts/build/colocateOptionals.mjs";

/** Create a fake installed package with a manifest and optional extra files. */
function mkPkg(
  nmDir: string,
  name: string,
  manifest: Record<string, unknown> = {},
  files: Record<string, string> = {}
): void {
  const dir = join(nmDir, name);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "package.json"), JSON.stringify({ name, version: "1.0.0", ...manifest }));
  for (const [rel, content] of Object.entries(files)) {
    const fp = join(dir, rel);
    mkdirSync(dirname(fp), { recursive: true });
    writeFileSync(fp, content);
  }
}

/**
 * Build a root tree mirroring the real SLM optional shape:
 *   @atjsh/llmlingua-2 → dep es-toolkit, PEER @huggingface/transformers (+ tfjs, js-tiktoken)
 *   @tensorflow/tfjs   → dep @tensorflow/tfjs-core → dep long
 *   js-tiktoken        → dep base64-js
 *   @huggingface/transformers present at root as a (stale) 4.2.0
 */
function buildRoot(rootDir: string): void {
  const rootNm = join(rootDir, "node_modules");
  mkPkg(
    rootNm,
    "@atjsh/llmlingua-2",
    {
      dependencies: { "es-toolkit": "^1.38.0" },
      peerDependencies: {
        "@huggingface/transformers": "*",
        "@tensorflow/tfjs": "*",
        "js-tiktoken": "*",
      },
    },
    { "dist/index.js": "export const llmlingua = true;\n" }
  );
  mkPkg(rootNm, "es-toolkit", {});
  mkPkg(rootNm, "@tensorflow/tfjs", { dependencies: { "@tensorflow/tfjs-core": "4.22.0" } });
  mkPkg(rootNm, "@tensorflow/tfjs-core", { dependencies: { long: "^5.0.0" } });
  mkPkg(rootNm, "long", {});
  mkPkg(rootNm, "js-tiktoken", { dependencies: { "base64-js": "^1.5.1" } });
  mkPkg(rootNm, "base64-js", {});
  // Root transformers is the STALE 4.x line — the bug we must not propagate into dist.
  mkPkg(rootNm, "@huggingface/transformers", { version: "4.2.0" });
}

test("computeDependencyClosure walks deps transitively and skips peers (transformers)", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-colocate-closure-"));
  try {
    buildRoot(root);
    const closure = computeDependencyClosure(join(root, "node_modules"));

    for (const expected of [
      "@atjsh/llmlingua-2",
      "@tensorflow/tfjs",
      "js-tiktoken",
      "es-toolkit",
      "@tensorflow/tfjs-core",
      "long",
      "base64-js",
    ]) {
      assert.ok(closure.includes(expected), `closure should include ${expected}`);
    }
    // The peer (declared via peerDependencies, NOT dependencies) must NOT be pulled in.
    assert.ok(
      !closure.includes("@huggingface/transformers"),
      "closure must NOT include the transformers peer"
    );
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("colocateLlmlinguaOptionals copies the closure into dist and never clobbers dist transformers", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-colocate-copy-"));
  try {
    buildRoot(root);
    // dist already ships the PINNED transformers (3.5.2) — must survive untouched.
    const distNm = join(root, "dist", "node_modules");
    mkPkg(distNm, "@huggingface/transformers", { version: "3.5.2" });

    const result = colocateLlmlinguaOptionals({ rootDir: root });
    assert.equal(result.skipped, false);
    if (result.skipped === false) {
      assert.ok(result.copied >= 6, `expected >=6 packages copied, got ${result.copied}`);
    }

    // Full closure landed in dist/node_modules.
    for (const name of [
      "@atjsh/llmlingua-2",
      "es-toolkit",
      "@tensorflow/tfjs",
      "@tensorflow/tfjs-core",
      "long",
      "js-tiktoken",
      "base64-js",
    ]) {
      assert.ok(existsSync(join(distNm, name)), `${name} should be co-located into dist`);
    }
    // The package payload came along (not just the manifest).
    assert.ok(existsSync(join(distNm, "@atjsh", "llmlingua-2", "dist", "index.js")));

    // CRITICAL: dist's pinned transformers is preserved — root's 4.2.0 must NOT win.
    const distTransformers = JSON.parse(
      readFileSync(join(distNm, "@huggingface", "transformers", "package.json"), "utf8")
    );
    assert.equal(distTransformers.version, "3.5.2", "dist transformers must remain 3.5.2");
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("colocateLlmlinguaOptionals is idempotent (second run is a no-op)", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-colocate-idem-"));
  try {
    buildRoot(root);
    mkPkg(join(root, "dist", "node_modules"), "@huggingface/transformers", { version: "3.5.2" });

    const first = colocateLlmlinguaOptionals({ rootDir: root });
    assert.equal(first.skipped, false);

    const second = colocateLlmlinguaOptionals({ rootDir: root });
    assert.equal(second.skipped, true);
    if (second.skipped === true) {
      assert.equal(second.reason, "already co-located");
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("colocateLlmlinguaOptionals skips when SLM optionals are not installed", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-colocate-noopt-"));
  try {
    // dist bundle exists, but the optional seeds were never installed at root.
    mkPkg(join(root, "dist", "node_modules"), "@huggingface/transformers", { version: "3.5.2" });
    mkdirSync(join(root, "node_modules"), { recursive: true });

    const result = colocateLlmlinguaOptionals({ rootDir: root });
    assert.equal(result.skipped, true);
    if (result.skipped === true) {
      assert.equal(result.reason, "SLM optionals not installed at root");
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("colocateLlmlinguaOptionals skips when there is no standalone dist bundle", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-colocate-nodist-"));
  try {
    buildRoot(root); // optionals present, but no dist/node_modules
    const result = colocateLlmlinguaOptionals({ rootDir: root });
    assert.equal(result.skipped, true);
    if (result.skipped === true) {
      assert.equal(result.reason, "no standalone dist/node_modules");
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("SEED_PACKAGES excludes transformers (it is a dist-pinned peer, not a seed)", () => {
  assert.ok(!SEED_PACKAGES.includes("@huggingface/transformers"));
  assert.deepEqual(SEED_PACKAGES, ["@atjsh/llmlingua-2", "@tensorflow/tfjs", "js-tiktoken"]);
});
