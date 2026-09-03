import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  patchBasePathLiterals,
  patchJsonManifestFile,
  patchStandaloneBasePath,
  patchProcessEnvShim,
  patchBakedAssetUrls,
} from "../../../scripts/docker/patch-standalone-base-path.mjs";

test("patchBasePathLiterals rewrites empty basePath literals", () => {
  const input = 'const cfg={basePath:"",assetPrefix:void 0};"basePath":""';
  const output = patchBasePathLiterals(input, "/omniroute");
  assert.match(output, /basePath:"\/omniroute"/);
  assert.match(output, /"basePath":"\/omniroute"/);
});

test("patchJsonManifestFile updates nested basePath fields", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-basepath-"));
  const filePath = path.join(dir, "routes-manifest.json");
  fs.writeFileSync(filePath, JSON.stringify({ basePath: "", nested: { basePath: "" } }, null, 2));
  assert.equal(patchJsonManifestFile(filePath, "/omniroute"), true);
  const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
  assert.equal(parsed.basePath, "/omniroute");
  assert.equal(parsed.nested.basePath, "/omniroute");
});

test("patchStandaloneBasePath rewrites a root-path standalone tree", () => {
  const appRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-standalone-"));
  const distRoot = path.join(appRoot, ".build", "next");
  fs.mkdirSync(path.join(distRoot, "server"), { recursive: true });
  fs.writeFileSync(path.join(distRoot, "routes-manifest.json"), JSON.stringify({ basePath: "" }));
  fs.writeFileSync(path.join(distRoot, "server", "chunk.js"), 'export const config={basePath:""};');
  fs.writeFileSync(path.join(appRoot, "BUILD_OMNIROUTE_BASE_PATH"), "\n");

  const result = patchStandaloneBasePath({
    appRoot,
    fromBasePath: "",
    toBasePath: "/omniroute",
  });

  assert.equal(result.changed, true);
  assert.equal(
    JSON.parse(fs.readFileSync(path.join(distRoot, "routes-manifest.json"), "utf8")).basePath,
    "/omniroute"
  );
  assert.match(fs.readFileSync(path.join(distRoot, "server", "chunk.js"), "utf8"), /\/omniroute/);
});

test("patchStandaloneBasePath rejects mismatched non-root builds", () => {
  assert.throws(
    () =>
      patchStandaloneBasePath({
        appRoot: process.cwd(),
        fromBasePath: "/custom",
        toBasePath: "/omniroute",
      }),
    /does not match the image build/
  );
});

test("patchBasePathLiterals rewrites assetPrefix literals (Next 16 SSR asset URLs)", () => {
  // Next 16 app-router renders SSR asset URLs from assetPrefix ALONE.
  assert.equal(
    patchBasePathLiterals('{"assetPrefix":""}', "/omniroute"),
    '{"assetPrefix":"/omniroute"}'
  );
  assert.equal(patchBasePathLiterals('assetPrefix:""', "/omniroute"), 'assetPrefix:"/omniroute"');
  assert.equal(
    patchBasePathLiterals("assetPrefix:void 0", "/omniroute"),
    'assetPrefix:"/omniroute"'
  );
  // Asset prefix must mirror the basePath so both routing and assets align.
  const mixed = patchBasePathLiterals('{"basePath":"","assetPrefix":""}', "/omniroute");
  assert.match(mixed, /"basePath":"\/omniroute"/);
  assert.match(mixed, /"assetPrefix":"\/omniroute"/);
});

test("patchBasePathLiterals rewrites the NEXT_PUBLIC env mirror", () => {
  assert.equal(
    patchBasePathLiterals('{"env":{"NEXT_PUBLIC_OMNIROUTE_BASE_PATH":""}}', "/omniroute"),
    '{"env":{"NEXT_PUBLIC_OMNIROUTE_BASE_PATH":"/omniroute"}}'
  );
  assert.equal(
    patchBasePathLiterals('NEXT_PUBLIC_OMNIROUTE_BASE_PATH:""', "/omniroute"),
    'NEXT_PUBLIC_OMNIROUTE_BASE_PATH:"/omniroute"'
  );
});

test("patchProcessEnvShim populates the Turbopack client process env", () => {
  assert.equal(
    patchProcessEnvShim("o.env={},o.argv=[]", "/omniroute"),
    'o.env={OMNIROUTE_BASE_PATH:"/omniroute",NEXT_PUBLIC_OMNIROUTE_BASE_PATH:"/omniroute"},o.argv=[]'
  );
  // Non-empty env objects are left untouched (never clobber baked values).
  assert.equal(patchProcessEnvShim("o.env={A:1}", "/omniroute"), "o.env={A:1}");
});

test("patchBakedAssetUrls prefixes absolute _next/static URLs", () => {
  assert.equal(
    patchBakedAssetUrls('"/_next/static/chunks/a.js"', "/omniroute"),
    '"/omniroute/_next/static/chunks/a.js"'
  );
  assert.equal(
    patchBakedAssetUrls("'/_next/static/media/m.png'", "/omniroute"),
    "'/omniroute/_next/static/media/m.png'"
  );
  // Already-prefixed URLs are stable.
  assert.equal(
    patchBakedAssetUrls('"/omniroute/_next/static/a.js"', "/omniroute"),
    '"/omniroute/_next/static/a.js"'
  );
});
