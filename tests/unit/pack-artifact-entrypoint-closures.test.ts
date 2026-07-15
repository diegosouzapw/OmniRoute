import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  APP_STAGING_ALLOWED_EXACT_PATHS,
  PACK_ARTIFACT_REQUIRED_PATHS,
} from "../../scripts/build/pack-artifact-policy.ts";

// Generalization of pack-artifact-server-ws-closure.test.ts (#7065 class, 3rd recurrence:
// tls-options/3.8.41, head-response-guard VPS #7040 + npm #7065). assembleStandalone copies
// wrapper modules to the dist ROOT; the prepublish prune then deletes anything not in
// APP_STAGING_ALLOWED_EXACT_PATHS, and check:pack-artifact only fails for entries in
// PACK_ARTIFACT_REQUIRED_PATHS. The original test hardcoded ONE wrapper (server-ws.mjs)
// and ONE import form (static `from "./x"`). This suite derives the full closure from the
// sources of truth — EXTRA_MODULE_ENTRIES in assembleStandalone.mjs plus each wrapper's own
// imports (static, dynamic import() and require()) — so adding an import to ANY npm-shipped
// wrapper without updating both lists fails here instead of shipping a boot-crashing tarball.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const ASSEMBLE = path.join(ROOT, "scripts", "build", "assembleStandalone.mjs");
const BIN_ENTRY = path.join(ROOT, "bin", "omniroute.mjs");

interface WrapperEntry {
  src: string;
  dest: string;
}

// EXTRA_MODULE_ENTRIES entries whose dest is a bare module filename at the dist root —
// these are the boot-path wrappers the prune can silently drop (the #7065 shape).
function distRootWrappers(): WrapperEntry[] {
  const text = fs.readFileSync(ASSEMBLE, "utf8");
  const entries = [...text.matchAll(/src:\s*\[([^\]]+)\],?\s*dest:\s*\[([^\]]+)\]/gs)];
  const toPath = (segmentList: string) =>
    segmentList
      .split(",")
      .map((s) => s.trim().replace(/^"|"$/g, ""))
      .filter(Boolean)
      .join("/");
  return entries
    .map((m) => ({ src: toPath(m[1]), dest: toPath(m[2]) }))
    .filter((e) => !e.dest.includes("/") && /\.(mjs|cjs|js)$/.test(e.dest));
}

// Local sibling imports of a module: static `from "./x"`, dynamic `import("./x")`,
// and CommonJS `require("./x")`. The original test missed the dynamic form — server-ws
// boots dist/server.js via `await import("./server.js")`.
function localImports(filePath: string): string[] {
  const src = fs.readFileSync(filePath, "utf8");
  const patterns = [
    /from\s+["']\.\/([^"']+)["']/g,
    /import\(\s*["']\.\/([^"']+)["']\s*\)/g,
    /require\(\s*["']\.\/([^"']+)["']\s*\)/g,
  ];
  return [...new Set(patterns.flatMap((re) => [...src.matchAll(re)].map((m) => m[1])))];
}

/** Parent-relative specifiers (../) in a wrapper file — ALWAYS a packaging bug. */
export function parentRelativeImports(src: string): string[] {
  const patterns = [
    /from\s+["'](\.\.\/[^"']+)["']/g,
    /import\(\s*["'](\.\.\/[^"']+)["']\s*\)/g,
    /require\(\s*["'](\.\.\/[^"']+)["']\s*\)/g,
  ];
  return [...new Set(patterns.flatMap((re) => [...src.matchAll(re)].map((m) => m[1])))];
}

// Wrappers that ship in the npm channel are exactly those whose dest survives the prune.
// Wrappers intentionally outside the npm tarball (e.g. healthcheck.mjs, Docker-only) are
// excluded: their imports live or die with them, consistently.
function npmShippedWrappers(): WrapperEntry[] {
  return distRootWrappers().filter((e) => APP_STAGING_ALLOWED_EXACT_PATHS.includes(e.dest));
}

test("sanity: EXTRA_MODULE_ENTRIES parsing finds the known dist-root wrappers", () => {
  const dests = distRootWrappers().map((e) => e.dest);
  for (const known of ["server-ws.mjs", "peer-stamp.mjs", "head-response-guard.cjs"]) {
    assert.ok(dests.includes(known), `parser lost known wrapper ${known}: got ${dests.join(", ")}`);
  }
  assert.ok(dests.length >= 7, `parsed only ${dests.length} dist-root wrappers`);
});

test("every local import of every npm-shipped wrapper survives the prune (allowlist)", () => {
  for (const wrapper of npmShippedWrappers()) {
    const srcPath = path.join(ROOT, wrapper.src);
    assert.ok(fs.existsSync(srcPath), `EXTRA_MODULE_ENTRIES src missing on disk: ${wrapper.src}`);
    const missing = localImports(srcPath).filter(
      (f) => !APP_STAGING_ALLOWED_EXACT_PATHS.includes(f)
    );
    assert.deepEqual(
      missing,
      [],
      `${wrapper.dest}: add to APP_STAGING_ALLOWED_EXACT_PATHS: ${missing.join(", ")}`
    );
  }
});

test("every local import of every npm-shipped wrapper is enforced by check:pack-artifact", () => {
  for (const wrapper of npmShippedWrappers()) {
    const missing = localImports(path.join(ROOT, wrapper.src)).filter(
      (f) => !PACK_ARTIFACT_REQUIRED_PATHS.includes(`dist/${f}`)
    );
    assert.deepEqual(
      missing,
      [],
      `${wrapper.dest}: add dist/<file> to PACK_ARTIFACT_REQUIRED_PATHS: ${missing.join(", ")}`
    );
  }
});

test("dynamic import() closure is covered (server-ws boots dist/server.js)", () => {
  const serverWs = distRootWrappers().find((e) => e.dest === "server-ws.mjs");
  assert.ok(serverWs, "server-ws.mjs wrapper not found in EXTRA_MODULE_ENTRIES");
  const imports = localImports(path.join(ROOT, serverWs.src));
  assert.ok(
    imports.includes("server.js"),
    `dynamic import extraction broken — server.js not among: ${imports.join(", ")}`
  );
});

test("every bin/omniroute.mjs local import is enforced by check:pack-artifact", () => {
  // The CLI boot path (bin/omniroute.mjs → bin/cli/*) is covered by allowlist PREFIXES,
  // so a file vanishing from the tarball never fails the unexpected-paths check — only
  // PACK_ARTIFACT_REQUIRED_PATHS makes its absence loud. Derive the requirement from
  // the entrypoint's own imports.
  const missing = localImports(BIN_ENTRY).filter(
    (f) => !PACK_ARTIFACT_REQUIRED_PATHS.includes(`bin/${f}`)
  );
  assert.deepEqual(
    missing,
    [],
    `add bin/<file> to PACK_ARTIFACT_REQUIRED_PATHS: ${missing.join(", ")}`
  );
});

test("no npm-shipped wrapper uses a parent-relative (../) import — it escapes the package after the dist-root copy", () => {
  // 2026-07-15 live incident: standalone-server-ws.mjs imported
  // ../../src/shared/utils/runtimeTimeouts.ts (merged in #7191); copied to the dist
  // root, the specifier resolved to node_modules/src/... OUTSIDE the package and
  // every boot of the packed tarball crashed with ERR_MODULE_NOT_FOUND (#7065
  // class — caught by check:pack-boot). Wrapper dependencies must be SIBLINGS
  // (./x.mjs) with their own EXTRA_MODULE_ENTRIES copy + pack allowlist entry.
  for (const wrapper of npmShippedWrappers()) {
    const escaping = parentRelativeImports(fs.readFileSync(path.join(ROOT, wrapper.src), "utf8"));
    assert.deepEqual(
      escaping,
      [],
      `${wrapper.src} has package-escaping imports: ${escaping.join(", ")} — extract to a sibling module instead`
    );
  }
});
