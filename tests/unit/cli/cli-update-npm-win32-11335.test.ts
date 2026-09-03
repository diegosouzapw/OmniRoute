import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

// #11335 — `omniroute update` printed "Could not check latest version. Is npm
// available?" on Windows while `npm view omniroute version` worked in the same
// shell. `bin/cli/commands/update.mjs` called `execFile("npm", …)` with no shell:
// on Node ≥ 24 a `.cmd` cannot be spawned without one (nodejs/node#52554), and a
// bare `npm` can resolve to an extensionless shim CreateProcess refuses.
//
// Same class as #5379 / #5542, which fixed the server-side calls through
// `buildNpmExecOptions`. The CLI is plain .mjs and cannot import that TypeScript
// helper, so `bin/cli/npm-exec.mjs` states the same rule for the CLI entry points.
const { npmBin, npmExecOptions } = await import("../../../bin/cli/npm-exec.mjs");

test("#11335 win32 resolves npm.cmd and runs it through a shell", () => {
  assert.equal(npmBin("win32"), "npm.cmd", "win32 must name the .cmd wrapper explicitly");

  const win = npmExecOptions("win32", { timeoutMs: 15000 });
  assert.equal(win.shell, true, "win32 must enable the shell so npm.cmd can be spawned");
  assert.equal(win.windowsHide, true);
  assert.equal(win.timeout, 15000);
});

test("#11335 non-win32 keeps the shell off", () => {
  assert.equal(npmBin("linux"), "npm");
  assert.equal(npmBin("darwin"), "npm");

  for (const platform of ["linux", "darwin"] as const) {
    const opts = npmExecOptions(platform, { timeoutMs: 15000 });
    assert.equal(opts.shell, false, `${platform} must not enable the shell`);
    assert.equal(opts.timeout, 15000);
  }
});

test("#11335 options carry only what the caller asked for", () => {
  const bare = npmExecOptions("linux");
  assert.equal("timeout" in bare, false, "an unset timeout must not become undefined");
  assert.equal("stdio" in bare, false);

  const inherited = npmExecOptions("linux", { stdio: "inherit" });
  assert.equal(inherited.stdio, "inherit");
});

test("#11335 every npm call in update.mjs routes through the helper", () => {
  const src = fs.readFileSync(
    new URL("../../../bin/cli/commands/update.mjs", import.meta.url),
    "utf8"
  );

  // No call site may name npm as a bare literal again — that is the defect.
  assert.equal(
    /exec\w*\(\s*\n?\s*"npm"/.test(src),
    false,
    'update.mjs must not spawn a literal "npm" — use npmBin()'
  );

  const npmBinCalls = src.match(/npmBin\(\)/g) || [];
  const optionCalls = src.match(/npmExecOptions\(/g) || [];
  assert.equal(
    npmBinCalls.length,
    optionCalls.length,
    "each npmBin() call site must pass npmExecOptions() alongside it"
  );
  assert.ok(npmBinCalls.length >= 2, "both the version and changelog lookups must be covered");
});

test("#11335 the shell is only enabled where argv is literal (Hard Rule #13)", () => {
  const src = fs.readFileSync(
    new URL("../../../bin/cli/commands/update.mjs", import.meta.url),
    "utf8"
  );
  // Both call sites pass a literal argv array; nothing interpolated reaches the
  // shell. If that ever changes, this assertion is the thing that should fail.
  const argvArrays = src.match(/npmBin\(\),\s*\n?\s*\[[^\]]*\]/g) || [];
  assert.ok(argvArrays.length >= 2);
  for (const argv of argvArrays) {
    assert.equal(/\$\{|\+\s*\w|\.\.\./.test(argv), false, `argv must stay literal: ${argv}`);
  }
});
