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
 *   @atjsh/llmlingua-2 → dep es-toolkit, PEER @huggingface/transformers (+ js-tiktoken)
 *   js-tiktoken        → dep base64-js
 *   @huggingface/transformers present at root as a (hypothetical future) 5.0.0
 *
 * Each mock package gets a resolvable entrypoint so that isPackageIntact (which
 * checks entrypoint integrity via require.resolve) can validate the co-located
 * copy. The `main` field and corresponding index.js mirror what real npm
 * packages ship.
 */
function buildRoot(rootDir: string): void {
  const rootNm = join(rootDir, "node_modules");
  mkPkg(
    rootNm,
    "@atjsh/llmlingua-2",
    {
      main: "dist/index.js",
      dependencies: { "es-toolkit": "^1.38.0" },
      peerDependencies: {
        "@huggingface/transformers": "*",
        "js-tiktoken": "*",
      },
    },
    { "dist/index.js": "export const llmlingua = true;\n" }
  );
  mkPkg(
    rootNm,
    "es-toolkit",
    { main: "index.js" },
    { "index.js": "export const esToolkit = true;\n" }
  );
  mkPkg(
    rootNm,
    "js-tiktoken",
    { main: "index.js", dependencies: { "base64-js": "^1.5.1" } },
    { "index.js": "export const tiktoken = true;\n" }
  );
  mkPkg(rootNm, "base64-js", { main: "index.js" }, { "index.js": "export const base64 = true;\n" });
  // Root transformers is a hypothetical FUTURE line — the version we must not propagate into dist.
  mkPkg(rootNm, "@huggingface/transformers", { version: "5.0.0" });
}

test("computeDependencyClosure walks deps transitively and skips peers (transformers)", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-colocate-closure-"));
  try {
    buildRoot(root);
    const closure = computeDependencyClosure(join(root, "node_modules"));

    for (const expected of ["@atjsh/llmlingua-2", "js-tiktoken", "es-toolkit", "base64-js"]) {
      assert.ok(closure.includes(expected), `closure should include ${expected}`);
    }
    // The peer (declared via peerDependencies, NOT dependencies) must NOT be pulled in.
    assert.ok(
      !closure.includes("@huggingface/transformers"),
      "closure must NOT include the transformers peer"
    );
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("colocateLlmlinguaOptionals copies the closure into dist and never clobbers dist transformers", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-colocate-copy-"));
  try {
    buildRoot(root);
    // dist already ships the PINNED transformers (4.2.0) — must survive untouched.
    const distNm = join(root, "dist", "node_modules");
    mkPkg(distNm, "@huggingface/transformers", { version: "4.2.0" });

    const result = colocateLlmlinguaOptionals({ rootDir: root });
    assert.equal(result.skipped, false);
    if (result.skipped === false) {
      assert.ok(result.copied >= 4, `expected >=4 packages copied, got ${result.copied}`);
    }

    // Full closure landed in dist/node_modules.
    for (const name of ["@atjsh/llmlingua-2", "es-toolkit", "js-tiktoken", "base64-js"]) {
      assert.ok(existsSync(join(distNm, name)), `${name} should be co-located into dist`);
    }
    // The package payload came along (not just the manifest).
    assert.ok(existsSync(join(distNm, "@atjsh", "llmlingua-2", "dist", "index.js")));

    // CRITICAL: dist's pinned transformers is preserved — root's 5.0.0 must NOT win.
    const distTransformers = JSON.parse(
      readFileSync(join(distNm, "@huggingface", "transformers", "package.json"), "utf8")
    );
    assert.equal(distTransformers.version, "4.2.0", "dist transformers must remain 4.2.0");
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("colocateLlmlinguaOptionals is idempotent (second run is a no-op)", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-colocate-idem-"));
  try {
    buildRoot(root);
    mkPkg(join(root, "dist", "node_modules"), "@huggingface/transformers", { version: "4.2.0" });

    const first = colocateLlmlinguaOptionals({ rootDir: root });
    assert.equal(first.skipped, false);

    const second = colocateLlmlinguaOptionals({ rootDir: root });
    assert.equal(second.skipped, true);
    if (second.skipped === true) {
      assert.equal(second.reason, "already co-located");
    }
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("colocateLlmlinguaOptionals skips when SLM optionals are not installed", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-colocate-noopt-"));
  try {
    // dist bundle exists, but the optional seeds were never installed at root.
    mkPkg(join(root, "dist", "node_modules"), "@huggingface/transformers", { version: "4.2.0" });
    mkdirSync(join(root, "node_modules"), { recursive: true });

    const result = colocateLlmlinguaOptionals({ rootDir: root });
    assert.equal(result.skipped, true);
    if (result.skipped === true) {
      assert.equal(result.reason, "SLM optionals not installed at root");
    }
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("colocateLlmlinguaOptionals fills a Next-traced stub (package.json only, no dist) instead of skipping it", () => {
  // Reproduces a real build failure: Next.js's own standalone trace can create
  // a stub directory for a dynamically-imported optional dependency it
  // references but can't fully bundle — just package.json, no actual code.
  // The old skip check (`existsSync(dest)`) treated that stub as "already
  // co-located" and never copied the real dist/ output, so
  // require.resolve('@atjsh/llmlingua-2') found a package.json with no
  // matching main file at runtime.
  const root = mkdtempSync(join(tmpdir(), "omniroute-colocate-stub-"));
  try {
    buildRoot(root);
    const distNm = join(root, "dist", "node_modules");
    mkPkg(distNm, "@huggingface/transformers", { version: "4.2.0" });

    // Simulate the Next-traced stub: directory exists, package.json only.
    const stubDir = join(distNm, "@atjsh", "llmlingua-2");
    mkdirSync(stubDir, { recursive: true });
    writeFileSync(
      join(stubDir, "package.json"),
      readFileSync(join(root, "node_modules", "@atjsh", "llmlingua-2", "package.json"), "utf8")
    );
    assert.ok(!existsSync(join(stubDir, "dist", "index.js")), "stub must start without dist/");

    const result = colocateLlmlinguaOptionals({ rootDir: root });
    assert.equal(result.skipped, false, "must not treat the stub as already co-located");

    assert.ok(
      existsSync(join(stubDir, "dist", "index.js")),
      "the real dist/index.js must be filled in, not left missing behind the stub"
    );
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("SEED_PACKAGES excludes transformers (it is a dist-pinned peer, not a seed)", () => {
  assert.ok(!SEED_PACKAGES.includes("@huggingface/transformers"));
  assert.deepEqual(SEED_PACKAGES, ["@atjsh/llmlingua-2", "js-tiktoken"]);
});
