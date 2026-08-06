import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { syncStandaloneExtraModules } from "../../../scripts/build/assembleStandalone.mjs";

const repoRoot = path.resolve(new URL(".", import.meta.url).pathname, "../../..");

/**
 * Regression guard for #9451: the MITM `server.cjs` runs as a separate `node`
 * child process in the Docker standalone bundle, so neither Next.js's
 * file tracer nor the main server's import graph covers its dependencies.
 * `EXTRA_MODULE_ENTRIES` must therefore ship every relative `require()` target
 * of `server.cjs` AND every bare-specifier dynamic `import()` its `_internal/*.cjs`
 * shims perform, or the MITM proxy crashes at boot with MODULE_NOT_FOUND.
 */

test("EXTRA_MODULE_ENTRIES ships every relative require() of MITM server.cjs (#9451)", async () => {
  const serverSrc = fs.readFileSync(path.join(repoRoot, "src/mitm/server.cjs"), "utf8");
  const relRequires = [...serverSrc.matchAll(/require\("\.\/([^"]+)"\)/g)].map((m) => m[1]);
  assert.ok(
    relRequires.length > 0,
    "server.cjs has relative require() calls to check (sanity)"
  );

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "mitm-bundle-"));
  try {
    await syncStandaloneExtraModules(repoRoot, fs.promises, { log() {} }, tmp);
    for (const rel of relRequires) {
      assert.ok(
        fs.existsSync(path.join(tmp, "src/mitm", rel)),
        `server.cjs requires ./src/mitm/${rel} but EXTRA_MODULE_ENTRIES does not ship it — MITM child crashes with MODULE_NOT_FOUND`
      );
    }
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("EXTRA_MODULE_ENTRIES ships every dynamic import() of MITM _internal shims (#9451)", async () => {
  const internalDir = path.join(repoRoot, "src/mitm/_internal");
  const shimFiles = fs
    .readdirSync(internalDir)
    .filter((f) => f.endsWith(".cjs"));
  assert.ok(shimFiles.length > 0, "src/mitm/_internal has shim files to check (sanity)");

  // Collect bare-specifier (non-relative, non-node:) dynamic imports across all shims.
  const bareImports = new Set<string>();
  for (const f of shimFiles) {
    const src = fs.readFileSync(path.join(internalDir, f), "utf8");
    for (const m of src.matchAll(/import\("([^"]+)"\)/g)) {
      const spec = m[1];
      if (spec.startsWith("node:") || spec.startsWith(".") || spec.startsWith("/")) continue;
      bareImports.add(spec);
    }
  }
  assert.ok(
    bareImports.size > 0,
    "MITM _internal shims have bare-specifier dynamic import() calls to check (sanity)"
  );

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "mitm-bundle-imports-"));
  try {
    await syncStandaloneExtraModules(repoRoot, fs.promises, { log() {} }, tmp);
    for (const spec of bareImports) {
      // Bare specifiers resolve into node_modules/<name>; scoped packages live
      // under node_modules/@scope/. For selfsigned (no nested subpath used at
      // link time) it suffices to check the package directory is shipped.
      const pkgDir = path.join(tmp, "node_modules", ...spec.split("/"));
      assert.ok(
        fs.existsSync(pkgDir),
        `MITM _internal shim dynamic-imports "${spec}" but EXTRA_MODULE_ENTRIES does not ship it — MITM child crashes with MODULE_NOT_FOUND`
      );
    }
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
