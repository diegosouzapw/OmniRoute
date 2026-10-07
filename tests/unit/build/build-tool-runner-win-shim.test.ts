import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { join, sep } from "node:path";
import { tmpdir } from "node:os";

import {
  isNativeExecutable,
  planBuildToolSpawn,
  resolveLocalBinEntry,
  runBuildTool,
} from "../../../scripts/build/buildToolRunner.mjs";

/**
 * Regression coverage for the Windows `postbuild` crash.
 *
 * `colocate-standalone.mjs` spawned `node_modules/.bin/esbuild` — an
 * extensionless POSIX shell script that does not exist on Windows. `npm run
 * build` therefore died with
 *
 *   Error: spawnSync C:\…\node_modules\.bin\esbuild ENOENT
 *
 * immediately AFTER `next build` reported "✓ Compiled successfully", leaving a
 * complete `.build/next/standalone` tree next to a failed build.
 *
 * The platform is injected into `planBuildToolSpawn()` (same seam as
 * `resolveNextBuildEnv()` in build-next-isolated.mjs) so the Windows decisions
 * are asserted from CI's Linux runners.
 */

test("planBuildToolSpawn prefers the tool's own JS entry over any .bin shim", () => {
  const plan = planBuildToolSpawn({
    binName: "esbuild",
    args: ["in.ts", "--outfile=out.js"],
    entryPath: "/repo/node_modules/esbuild/bin/esbuild",
    entryIsNative: false,
    platform: "win32",
  });

  assert.equal(plan.file, process.execPath, "a JS entry runs on this Node binary");
  assert.deepEqual(plan.args, [
    "/repo/node_modules/esbuild/bin/esbuild",
    "in.ts",
    "--outfile=out.js",
  ]);
  assert.equal(plan.shell, false, "no shell means no argument-escaping hazard (DEP0190)");
});

test("planBuildToolSpawn execs a NATIVE entry directly instead of feeding it to Node", () => {
  // esbuild >= 0.25 ships bin/esbuild as an ELF/Mach-O binary on Linux/macOS;
  // handing that to process.execPath crashes with "Invalid or unexpected token".
  const plan = planBuildToolSpawn({
    binName: "esbuild",
    args: ["in.ts"],
    entryPath: "/repo/node_modules/esbuild/bin/esbuild",
    entryIsNative: true,
    platform: "linux",
  });

  assert.equal(plan.file, "/repo/node_modules/esbuild/bin/esbuild");
  assert.deepEqual(plan.args, ["in.ts"]);
  assert.equal(plan.shell, false);
});

test("planBuildToolSpawn falls back to the .cmd shim (with a shell) on win32", () => {
  const plan = planBuildToolSpawn({
    binName: "esbuild",
    args: ["in.ts"],
    entryPath: null,
    root: "C:\\repo",
    platform: "win32",
  });

  assert.ok(plan.file.endsWith("esbuild.cmd"), `expected a .cmd shim, got ${plan.file}`);
  // Node >= 20 refuses to spawn a .cmd without a shell (CVE-2024-27980 hardening).
  assert.equal(plan.shell, true, "a .cmd only spawns through a shell");
});

test("planBuildToolSpawn falls back to the extensionless shim (no shell) elsewhere", () => {
  const plan = planBuildToolSpawn({
    binName: "esbuild",
    args: ["in.ts"],
    entryPath: null,
    root: "/repo",
    platform: "linux",
  });

  assert.equal(plan.file, join("/repo", "node_modules", ".bin", "esbuild"));
  assert.ok(!plan.file.endsWith(".cmd"), "no .cmd suffix off Windows");
  assert.equal(plan.shell, false);
});

test("planBuildToolSpawn quotes whitespace paths when it has to use a shell", () => {
  // `C:\Users\First Last\…` is an ordinary Windows home directory, and Node does
  // not escape arguments once `shell` is set.
  const plan = planBuildToolSpawn({
    binName: "esbuild",
    args: ["--outfile=C:\\Users\\First Last\\out.js", "--bundle"],
    entryPath: null,
    root: "C:\\Users\\First Last\\repo",
    platform: "win32",
  });

  assert.ok(plan.file.startsWith('"') && plan.file.endsWith('"'), "shim path is quoted");
  assert.equal(plan.args[0], '"--outfile=C:\\Users\\First Last\\out.js"');
  assert.equal(plan.args[1], "--bundle", "arguments without whitespace are left alone");
});

test("resolveLocalBinEntry reads the package's own bin map, never node_modules/.bin", () => {
  const root = mkdtempSync(join(tmpdir(), "bin-entry-"));
  try {
    const pkgDir = join(root, "node_modules", "esbuild");
    mkdirSync(join(pkgDir, "bin"), { recursive: true });
    writeFileSync(
      join(pkgDir, "package.json"),
      JSON.stringify({ bin: { esbuild: "bin/esbuild" } })
    );
    writeFileSync(join(pkgDir, "bin", "esbuild"), "#!/usr/bin/env node\n");

    const entry = resolveLocalBinEntry("esbuild", "esbuild", root);
    assert.equal(entry, join(pkgDir, "bin", "esbuild"));
    assert.ok(
      !entry.includes(`${sep}.bin${sep}`),
      "the resolved entry must bypass the platform-specific .bin shim"
    );
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("resolveLocalBinEntry returns null for a missing package or a missing entry", () => {
  const root = mkdtempSync(join(tmpdir(), "bin-entry-missing-"));
  try {
    assert.equal(resolveLocalBinEntry("nope", "nope", root), null);

    const pkgDir = join(root, "node_modules", "esbuild");
    mkdirSync(pkgDir, { recursive: true });
    writeFileSync(
      join(pkgDir, "package.json"),
      JSON.stringify({ bin: { esbuild: "bin/esbuild" } })
    );
    assert.equal(
      resolveLocalBinEntry("esbuild", "esbuild", root),
      null,
      "an advertised entry that is not on disk must not be spawned"
    );
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("isNativeExecutable distinguishes an executable image from a JS shim", () => {
  const root = mkdtempSync(join(tmpdir(), "native-sniff-"));
  try {
    const shim = join(root, "shim.js");
    const elf = join(root, "elf.bin");
    const pe = join(root, "pe.exe");
    writeFileSync(shim, "#!/usr/bin/env node\nconsole.log(1);\n");
    writeFileSync(elf, Buffer.from([0x7f, 0x45, 0x4c, 0x46, 0x02]));
    writeFileSync(pe, Buffer.from([0x4d, 0x5a, 0x90, 0x00]));

    assert.equal(isNativeExecutable(shim), false);
    assert.equal(isNativeExecutable(elf), true);
    assert.equal(isNativeExecutable(pe), true);
    assert.equal(isNativeExecutable(join(root, "absent")), false, "a missing file is not native");
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("runBuildTool actually runs esbuild from this repo's dependency tree", () => {
  // End-to-end on whatever platform the suite runs on: the bug was a spawn
  // failure, so the only conclusive assertion is a real spawn.
  const out = mkdtempSync(join(tmpdir(), "esbuild-spawn-"));
  try {
    const src = join(out, "worker.ts");
    const dest = join(out, "worker.js");
    writeFileSync(src, "export const answer: number = 42;\n");

    runBuildTool(
      "esbuild",
      "esbuild",
      [src, "--bundle", "--platform=node", "--format=esm", `--outfile=${dest}`],
      { stdio: "pipe" }
    );

    assert.match(readFileSync(dest, "utf8"), /42/, "esbuild produced the bundle");
  } finally {
    rmSync(out, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("colocate-standalone.mjs never spawns the node_modules/.bin shim again", () => {
  const source = readFileSync(
    new URL("../../../scripts/build/colocate-standalone.mjs", import.meta.url),
    "utf8"
  );

  assert.ok(
    !/\.bin["'\s,]+["']esbuild/.test(source),
    "the postbuild hook must not reference node_modules/.bin/esbuild — that path is Windows-fatal"
  );
  assert.match(
    source,
    /runBuildTool\(/,
    "esbuild is spawned through the shared cross-platform runner"
  );
});

test("prepublish.ts bundles the ChatGPT Web Codex MCP bridge through runBuildTool (#11704)", () => {
  // Node >= 20 on Windows refuses to spawn npx.cmd without a shell (EINVAL,
  // CVE-2024-27980). The ChatGPT Web MCP esbuild step was the last raw
  // execFileSync(NPX_BIN, ...) in prepublish.ts and crashed npm run build:cli.
  const source = readFileSync(
    new URL("../../../scripts/build/prepublish.ts", import.meta.url),
    "utf8"
  );
  const mcpPath = "open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/mcp-server.ts";
  const idx = source.indexOf(mcpPath);
  assert.notEqual(idx, -1, "ChatGPT Web Codex MCP source path is still bundled");

  const window = source.slice(Math.max(0, idx - 400), idx);
  assert.match(
    window,
    /runBuildTool\s*\(\s*"esbuild"\s*,\s*"esbuild"/,
    "must spawn esbuild via runBuildTool() — raw npx.cmd is EINVAL on Node >= 20/Windows"
  );
  assert.doesNotMatch(
    window,
    /execFileSync\s*\(\s*NPX_BIN/,
    "must not spawn NPX_BIN (npx.cmd) to bundle the ChatGPT Web MCP bridge"
  );
});
