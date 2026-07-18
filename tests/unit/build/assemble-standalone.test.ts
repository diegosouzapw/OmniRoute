import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  assembleStandalone,
  syncStandaloneNativeAssets,
  syncStandaloneExtraModules,
} from "../../../scripts/build/assembleStandalone.mjs";

/** Recursively list relative file paths under dir (forward-slash normalised). */
function listFiles(dir: string, rootDir: string = dir, out: string[] = []): string[] {
  let entries: string[] = [];
  try {
    entries = fs.readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry);
    if (fs.statSync(full).isDirectory()) {
      listFiles(full, rootDir, out);
    } else {
      out.push(path.relative(rootDir, full).replace(/\\/g, "/"));
    }
  }
  return out.sort();
}

/** Build a synthetic projectRoot containing every sidecar source the assembler copies. */
function seedSidecarSources(root: string) {
  const files = [
    "node_modules/wreq-js/rust/lib.so",
    "node_modules/better-sqlite3/build/Release/better_sqlite3.node",
    "src/mitm/tproxy/native/build/Release/transparent.node",
    "node_modules/@swc/helpers/package.json",
    "node_modules/pino-abstract-transport/index.js",
    "node_modules/pino-pretty/index.js",
    "node_modules/split2/index.js",
    "node_modules/playwright-core/index.js",
    "node_modules/sqlite-vec/index.js",
    "node_modules/sqlite-vec-linux-x64/vec0.so",
    "src/lib/db/migrations/001_init.sql",
    "src/mitm/server.cjs",
    "scripts/dev/run-standalone.mjs",
    "scripts/dev/standalone-server-ws.mjs",
    "scripts/dev/peer-stamp.mjs",
    "scripts/dev/responses-ws-proxy.mjs",
    "scripts/build/runtime-env.mjs",
    "scripts/build/bootstrap-env.mjs",
    "scripts/dev/healthcheck.mjs",
    "public/logo.svg",
  ];
  for (const rel of files) {
    const full = path.join(root, rel);
    fs.mkdirSync(path.dirname(full), { recursive: true });
    fs.writeFileSync(full, `// ${rel}`);
  }
}

test("assembleStandalone copies standalone + static + public + sidecars into outDir", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "assemble-"));
  const distDir = path.join(tmp, ".build/next");
  const outDir = path.join(tmp, "dist");
  // minimal fake standalone tree
  fs.mkdirSync(path.join(distDir, "standalone"), { recursive: true });
  fs.writeFileSync(path.join(distDir, "standalone", "server.js"), "// server");
  fs.mkdirSync(path.join(distDir, "static"), { recursive: true });
  fs.writeFileSync(path.join(distDir, "static", "x.js"), "x");
  fs.mkdirSync(path.join(tmp, "public"), { recursive: true });
  fs.writeFileSync(path.join(tmp, "public", "logo.svg"), "<svg/>");

  assembleStandalone({
    distDir,
    outDir,
    projectRoot: tmp,
    sanitizePaths: false,
    copyNatives: false,
  });

  assert.ok(fs.existsSync(path.join(outDir, "server.js")), "server.js copied");
  // Static lands under the distDir path (.build/next/static), where the standalone
  // server.js — built with distDir baked into its config — serves /_next/static from.
  assert.ok(
    fs.existsSync(path.join(outDir, ".build/next/static/x.js")),
    "static copied under distDir"
  );
  assert.ok(
    !fs.existsSync(path.join(outDir, ".next/static/x.js")),
    "static is NOT placed under a literal .next (would 404 against distDir server)"
  );
  assert.ok(fs.existsSync(path.join(outDir, "public/logo.svg")), "public copied");
  fs.rmSync(tmp, { recursive: true, force: true });
});

// Drift guard: the async path (syncStandaloneNativeAssets / syncStandaloneExtraModules,
// used by build-next-isolated) and the sync path (assembleStandalone copyNatives, used by
// prepublish/electron) must copy the SAME sidecar tree. After the single-source refactor
// both derive from NATIVE_ASSET_ENTRIES/EXTRA_MODULE_ENTRIES — this test fails if a future
// edit reintroduces two divergent lists.
test("async and sync sidecar copy paths produce identical bundle trees", async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "assemble-parity-"));
  const projectRoot = path.join(tmp, "src-root");
  seedSidecarSources(projectRoot);

  // Async path: copy into outAsync via the exported sync* helpers.
  const outAsync = path.join(tmp, "out-async");
  fs.mkdirSync(outAsync, { recursive: true });
  const silent = { log() {} };
  // The exported helpers derive the standalone root from NEXT_DIST_DIR; point them at outAsync.
  await syncStandaloneNativeAssets(projectRoot, fs.promises, silent, outAsync);
  await syncStandaloneExtraModules(projectRoot, fs.promises, silent, outAsync);

  // Sync path: assembleStandalone(copyNatives) needs a standalone dir to copy first.
  const distDir = path.join(projectRoot, ".build/next");
  fs.mkdirSync(path.join(distDir, "standalone"), { recursive: true });
  fs.writeFileSync(path.join(distDir, "standalone", "server.js"), "// server");
  const outSync = path.join(tmp, "out-sync");
  assembleStandalone({
    distDir,
    outDir: outSync,
    projectRoot,
    sanitizePaths: false,
    copyNatives: true,
  });

  const asyncTree = listFiles(outAsync);
  // The sync path also copies the standalone server.js + patches package.json; compare only
  // the sidecar files the two paths share (drop server.js which is unique to assembleStandalone).
  const syncTree = listFiles(outSync).filter((f) => f !== "server.js");

  assert.deepEqual(
    syncTree,
    asyncTree,
    "sync (assembleStandalone) and async (sync*ToDir) must copy the same sidecar tree"
  );
  // The TPROXY native addon must land at the cwd-relative path the runtime loader
  // (transparentSocket.ts) resolves in the standalone bundle.
  assert.ok(
    asyncTree.includes("src/mitm/tproxy/native/build/Release/transparent.node"),
    "TPROXY transparent.node copied into the standalone bundle"
  );
  fs.rmSync(tmp, { recursive: true, force: true });
});

test("the TPROXY addon source is skipped gracefully when it was not built (non-Linux)", async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "assemble-skip-"));
  const projectRoot = path.join(tmp, "src-root");
  // Seed everything EXCEPT the tproxy addon (simulating a non-Linux build).
  fs.mkdirSync(projectRoot, { recursive: true });
  const out = path.join(tmp, "out");
  fs.mkdirSync(out, { recursive: true });
  // No throw even though src/mitm/tproxy/native/... is absent.
  await syncStandaloneNativeAssets(projectRoot, fs.promises, { log() {} }, out);
  assert.ok(
    !fs.existsSync(path.join(out, "src/mitm/tproxy/native/build/Release/transparent.node")),
    "absent addon is simply not copied (graceful skip)"
  );
  fs.rmSync(tmp, { recursive: true, force: true });
});

// Regression guard (#deploy 2026-07-11): server-ws.mjs gained an import of
// head-response-guard.cjs without a matching EXTRA_MODULE_ENTRIES entry, so every
// build:release bundle crashed at boot with ERR_MODULE_NOT_FOUND. This test derives
// the requirement from the source itself: EVERY relative import in
// standalone-server-ws.mjs must be shipped into the bundle by the extra-module sync.
test("every relative import of standalone-server-ws.mjs is shipped into the bundle", async () => {
  const repoRoot = path.resolve(new URL(".", import.meta.url).pathname, "../../..");
  const serverWsSrc = fs.readFileSync(
    path.join(repoRoot, "scripts/dev/standalone-server-ws.mjs"),
    "utf8"
  );
  const relImports = [...serverWsSrc.matchAll(/from\s+"\.\/([^"]+)"/g)].map((m) => m[1]);
  assert.ok(relImports.length > 0, "server-ws.mjs has relative imports to check");

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "assemble-serverws-"));
  await syncStandaloneExtraModules(repoRoot, fs.promises, { log() {} }, tmp);
  for (const imp of relImports) {
    assert.ok(
      fs.existsSync(path.join(tmp, imp)),
      `server-ws.mjs imports ./${imp} but EXTRA_MODULE_ENTRIES does not ship it — the bundle would crash at boot (ERR_MODULE_NOT_FOUND)`
    );
  }
  fs.rmSync(tmp, { recursive: true, force: true });
});
