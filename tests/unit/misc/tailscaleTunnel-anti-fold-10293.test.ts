import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// #10293 — anti-fold regression guard.
//
// The reported defect: Turbopack constant-folds module-load `process.platform` to the
// BUILD machine's value (a non-Windows runner) and prunes every Windows branch as dead
// code, so `dist` builds ship a tailscaleTunnel where the Windows paths are unreachable.
// That cannot be reproduced in a unit test (no published `dist`, no Windows runner), so
// this guard enforces the SOURCE invariant that makes the fold impossible: platform reads
// go through the runtime call `os.platform()` (a bundler cannot fold an arbitrary function
// call), never a module-load `process.platform` constant.
//
// If a future edit re-introduces `const IS_WINDOWS = process.platform === "win32"` (or any
// module-scope direct `process.platform` read), the folded-build failure returns — this test
// turns RED.

const modulePath = fileURLToPath(new URL("../../../src/lib/tailscaleTunnel.ts", import.meta.url));
const source = fs.readFileSync(modulePath, "utf8");

test("#10293: tailscaleTunnel reads platform at runtime via os.platform(), never a module-load process.platform constant", () => {
  const lines = source.split("\n");

  // Any module-scope (non-function) direct read of process.platform is the foldable pattern.
  const foldable = lines.filter((line, idx) => {
    if (/process\.platform/.test(line) && !/^\s*\/\//.test(line)) {
      // allow it only inside a function body (runtime read — but prefer os.platform there too);
      // a module-load constant assignment at top level with process.platform is the defect.
      return line.includes("= process.platform") && idx < 60;
    }
    return false;
  });
  assert.deepEqual(
    foldable,
    [],
    `module-load constant(s) reading process.platform reintroduced the foldable pattern: ${foldable.join(" | ")}`
  );

  // The runtime getter must exist and delegate to os.platform (the anti-fold call).
  assert.match(source, /function getCurrentPlatform\(\):\s*NodeJS\.Platform\s*\{\s*return os\.platform\(\);?\s*\}/m);
});

test("#10293: Windows branches use runtime platform reads, so they survive any build machine", () => {
  // These are the specific Windows behaviors the reporter found folded to dead code:
  //  (a) --socket not injected (buildTailscaleArgs), (b) where over which (resolvePathCommand),
  //  (c) windows-default binary fallback (resolveBinary). Each must read platform at runtime
  //  through os.platform()/getCurrentPlatform().
  const socketBranch = /getCurrentPlatform\(\) === "win32"[\s\S]{0,80}return args/.test(source);
  const whereBranch = /os\.platform\(\) === "win32" \? "where" : "which"/.test(source);
  const windowsDefaultBranch = /getCurrentPlatform\(\) === "win32" && fs\.existsSync\(WINDOWS_TAILSCALE_BIN\)/.test(source);
  assert.ok(socketBranch, "buildTailscaleArgs must not inject --socket on win32 (runtime platform read)");
  assert.ok(whereBranch, "resolvePathCommand must select 'where' when os.platform() === 'win32'");
  assert.ok(windowsDefaultBranch, "resolveBinary must reach the Windows default binary fallback via runtime platform read");
});