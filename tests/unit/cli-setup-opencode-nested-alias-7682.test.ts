import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, cpSync, symlinkSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(HERE, "..", "..");

test("config-generator/opencode.ts imports cleanly with no tsconfig.json in scope (repro #7682)", () => {
  const stage = mkdtempSync(join(tmpdir(), "omniroute-pkg-stage-7682-"));
  try {
    for (const rel of ["bin", "src/lib", "src/shared"]) {
      cpSync(join(REPO_ROOT, rel), join(stage, rel), { recursive: true });
    }
    cpSync(join(REPO_ROOT, "package.json"), join(stage, "package.json"));
    symlinkSync(join(REPO_ROOT, "node_modules"), join(stage, "node_modules"), "dir");

    const probeScript = join(stage, "probe-import.mjs");
    writeFileSync(
      probeScript,
      `await import("tsx/esm");
       await import("./src/lib/cli-helper/config-generator/opencode.ts");
       console.log("IMPORT_OK");
      `
    );

    const result = spawnSync(process.execPath, [probeScript], { cwd: stage, encoding: "utf8" });

    assert.equal(
      result.stdout.includes("IMPORT_OK"),
      true,
      `expected config-generator/opencode.ts to import cleanly from a tsconfig-less ` +
        `directory (as it will inside a real global npm install), but it failed:\n` +
        `stdout: ${result.stdout}\nstderr: ${result.stderr}`
    );
  } finally {
    rmSync(stage, { recursive: true, force: true });
  }
});
