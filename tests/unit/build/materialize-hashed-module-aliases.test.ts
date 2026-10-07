import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  assembleStandalone,
  materializeHashedModuleAliases,
} from "../../../scripts/build/assembleStandalone.mjs";

// Turbopack's standalone tracer emits externalized packages as REAL directories named
// `playwright-core-<16hex>`, but the server runtime asks for the BARE specifier at request time:
// the externals chunk does `await ctx.externalImport("playwright-core")`, and that literal has no
// hash for patchTurbopackChunks() to strip. Node then walks up from
// `<outDir>/<relDistDir>/server/chunks/`, finds only the hashed sibling, and throws
// ERR_MODULE_NOT_FOUND.
//
// The three existing repairs each miss it and the misses compose:
//   - materializeBundledSymlinks() skips non-symlinks (`if (!stat.isSymbolicLink()) continue;`)
//   - patchTurbopackChunks() strips the hash, which is what creates the bare-name requirement
//   - repairEmptyExternalPackageDirs() only overlays dirs that EXIST but are hollow, and needs the
//     package in the source node_modules — here the bare dir does not exist at all
// The failure is lazy, so the server boots fine and only the routes whose chunk first reaches the
// module 500 with an empty body (observed: /api/providers → blank /dashboard/providers and
// /dashboard/combos, while /dashboard/models kept working).

const HASH = "f386a448524c7e9d";
const TMP_ROOT = () => fs.mkdtempSync(path.join(os.tmpdir(), "hashed-alias-"));

const writePkg = (dir, name) => {
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "package.json"), JSON.stringify({ name, main: "index.js" }));
  fs.writeFileSync(path.join(dir, "index.js"), `module.exports = ${JSON.stringify(name)};`);
};

test("materializeHashedModuleAliases copies a hashed external dir to its bare name", () => {
  const tmp = TMP_ROOT();
  const nm = path.join(tmp, "node_modules");
  writePkg(path.join(nm, `playwright-core-${HASH}`), "playwright-core");

  const summary = materializeHashedModuleAliases(nm);

  assert.equal(summary.aliased, 1);
  assert.deepEqual(summary.packages, ["playwright-core"]);
  const aliasIndex = path.join(nm, "playwright-core", "index.js");
  assert.ok(
    fs.existsSync(aliasIndex),
    'bare-name dir must exist so `import("playwright-core")` resolves'
  );
  assert.equal(fs.readFileSync(aliasIndex, "utf8"), 'module.exports = "playwright-core";');
  // The hashed entry is kept too, so a hashed require() keeps resolving.
  assert.ok(fs.existsSync(path.join(nm, `playwright-core-${HASH}`, "index.js")));

  // Idempotent: a second pass must not clobber or re-copy.
  const again = materializeHashedModuleAliases(nm);
  assert.equal(again.aliased, 0);
  assert.deepEqual(again.packages, []);

  fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("materializeHashedModuleAliases handles scoped hashed externals", () => {
  const tmp = TMP_ROOT();
  const nm = path.join(tmp, "node_modules");
  writePkg(path.join(nm, "@huggingface", `transformers-${HASH}`), "@huggingface/transformers");

  const summary = materializeHashedModuleAliases(nm);

  assert.equal(summary.aliased, 1);
  assert.ok(fs.existsSync(path.join(nm, "@huggingface", "transformers", "index.js")));

  fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("materializeHashedModuleAliases never overwrites an existing bare package", () => {
  const tmp = TMP_ROOT();
  const nm = path.join(tmp, "node_modules");
  // A real, already-traced bare package must win over the hashed one.
  writePkg(path.join(nm, "zod"), "zod");
  writePkg(path.join(nm, `zod-${HASH}`), "zod-hashed");

  const summary = materializeHashedModuleAliases(nm);

  assert.equal(summary.aliased, 0);
  assert.equal(
    fs.readFileSync(path.join(nm, "zod", "index.js"), "utf8"),
    'module.exports = "zod";',
    "the traced bare package must be left byte-identical"
  );

  fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("materializeHashedModuleAliases leaves symlinks and non-16-hex names alone", () => {
  const tmp = TMP_ROOT();
  const nm = path.join(tmp, "node_modules");
  fs.mkdirSync(nm, { recursive: true });
  // Dangling link into the build machine — copying it verbatim would ship the dangling link.
  fs.symlinkSync(
    path.join(tmp, "build-machine", `pkg-${HASH}`),
    path.join(nm, `pkg-${HASH}`),
    "junction"
  );
  // Not a Turbopack hash width → a legitimately hyphenated name, not an external.
  writePkg(path.join(nm, "not-a-hash-abc123"), "not-a-hash-abc123");

  const summary = materializeHashedModuleAliases(nm);

  assert.equal(summary.aliased, 0);
  assert.equal(fs.lstatSync(path.join(nm, `pkg-${HASH}`)).isSymbolicLink(), true);
  assert.ok(!fs.existsSync(path.join(nm, "pkg")), "a symlinked hashed entry must not be aliased");
  assert.ok(!fs.existsSync(path.join(nm, "not-a-hash-abc")));

  fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("materializeHashedModuleAliases no-ops on a missing node_modules dir", () => {
  const tmp = TMP_ROOT();
  const summary = materializeHashedModuleAliases(path.join(tmp, "does-not-exist"));
  assert.deepEqual(summary, { aliased: 0, packages: [] });
  fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("assembleStandalone aliases hashed externals in the nested <distDir> node_modules (the /api/providers repro)", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "hashed-alias-standalone-"));
  const projectRoot = path.join(tmp, "project");
  // The real project builds with distDir ".build/next" (see next.config.mjs), so the traced
  // server chunks — and therefore the resolution root of `import("playwright-core")` — live under
  // <outDir>/.build/next/server/chunks and walk up to <outDir>/.build/next/node_modules.
  const relDistDir = ".build/next";
  const distDir = path.join(projectRoot, relDistDir);
  const outDir = path.join(tmp, "dist");

  const standaloneDir = path.join(distDir, "standalone");
  fs.mkdirSync(standaloneDir, { recursive: true });
  fs.writeFileSync(path.join(standaloneDir, "server.js"), "// server");
  // A hashed external the tracer emitted as a REAL directory (the shape that defeats
  // materializeBundledSymlinks), with no bare-name sibling anywhere in the bundle.
  writePkg(
    path.join(standaloneDir, relDistDir, "node_modules", `playwright-core-${HASH}`),
    "playwright-core"
  );

  assembleStandalone({
    distDir,
    outDir,
    projectRoot,
    copyNatives: true,
    patchTurbopackChunks: true,
    materializeSymlinks: true,
  });

  const nestedAlias = path.join(outDir, relDistDir, "node_modules", "playwright-core", "index.js");
  assert.ok(
    fs.existsSync(nestedAlias),
    "assembleStandalone must leave a bare-name dir where the runtime's externalImport() looks"
  );

  fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
