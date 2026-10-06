import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { resolveProjectRoot } = await import("../../src/lib/system/autoUpdate.ts");

test("repro-8956: resolveProjectRoot skips synthetic .build/next/package.json (no name field)", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "repro-8956-"));
  try {
    // Simulate a Next.js standalone build layout inside a real repo:
    //   <tmp>/repo/.git/             (real git marker)
    //   <tmp>/repo/package.json      (real repo root, has a "name" field)
    //   <tmp>/repo/.build/next/package.json   (synthetic marker, {"type":"commonjs"}, no name)
    //   <tmp>/repo/.build/next/server/chunks/ (where the bundled module lives at runtime)
    const repoRoot = path.join(tmp, "repo");
    const buildPkgDir = path.join(repoRoot, ".build", "next");
    const chunksDir = path.join(buildPkgDir, "server", "chunks");

    fs.mkdirSync(path.join(repoRoot, ".git"), { recursive: true });
    fs.mkdirSync(chunksDir, { recursive: true });

    // Real root package.json with a name
    fs.writeFileSync(path.join(repoRoot, "package.json"), JSON.stringify({ name: "omniroute" }));
    // Synthetic Next.js standalone build marker — no "name" field
    fs.writeFileSync(path.join(buildPkgDir, "package.json"), JSON.stringify({ type: "commonjs" }));

    // Start from the chunks dir (simulating __dirname at runtime)
    const root = resolveProjectRoot("/fallback", chunksDir);

    // Must NOT stop at .build/next — must walk up to the repo root that has .git
    assert.equal(
      root,
      repoRoot,
      `resolveProjectRoot returned ${root}, expected the repo root ${repoRoot} ` +
        "(it stopped at the synthetic .build/next/package.json marker)"
    );

    // The resolved root must own .git so source-mode validation passes
    assert.ok(
      fs.existsSync(path.join(root, ".git")),
      `PROJECT_ROOT resolved to ${root}, which lacks .git`
    );
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("repro-8956: resolveProjectRoot still finds package.json with a name field", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "repro-8956-named-"));
  try {
    // A normal repo root: has .git AND a named package.json
    const repoRoot = path.join(tmp, "my-repo");
    const subDir = path.join(repoRoot, "some", "deep", "path");
    fs.mkdirSync(subDir, { recursive: true });
    fs.writeFileSync(path.join(repoRoot, "package.json"), JSON.stringify({ name: "my-app" }));
    fs.mkdirSync(path.join(repoRoot, ".git"), { recursive: true });

    const root = resolveProjectRoot("/fallback", subDir);
    assert.equal(root, repoRoot);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
