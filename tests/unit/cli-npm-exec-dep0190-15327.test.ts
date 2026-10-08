import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { npmBin, npmExecOptions, npmExecInvocation } from "../../bin/cli/npm-exec.mjs";
import * as update from "../../bin/cli/commands/update.mjs";

// #15327 — on Windows + Node ≥ 24 every `omniroute update` (and the doctor's
// version check) printed:
//
//   (node:NNNN) [DEP0190] DeprecationWarning: Passing args to a child process
//   with shell option true can lead to security vulnerabilities, as the arguments
//   are not escaped, only concatenated.
//
// #11335 had fixed the EINVAL by enabling `shell` on win32 so `npm.cmd` can be
// spawned at all (nodejs/node#52554), but it kept the argv-array call shape. Node's
// `normalizeSpawnArguments` warns on exactly that combination — `options.shell` set
// AND `args.length > 0` — and then builds `${file} ${args.join(" ")}` itself. So
// the two fixes collided: the shell is required for the `.cmd` shim and forbidden
// alongside an argv array.
//
// The fix passes the already-joined command line as `file` with an EMPTY args
// array — byte-identical input to the shell, minus the deprecation — and
// npmExecInvocation refuses to build that string from anything but literals so
// Hard Rule #13 keeps holding now that the shell sees a raw string.
//
// The warning itself is unreachable from a test (Node only emits DEP0190 on
// Node ≥ 22, and only once per process), so the guard asserts the property Node
// keys the warning on: no argv array travels with `shell: true`.

const VERSION_ARGS = ["view", "omniroute", "version", "--prefer-online"];

/** Node's own condition for DEP0190, from lib/child_process.js. */
function dep0190WouldFire(args: string[], options: Record<string, unknown>): boolean {
  return Boolean(options.shell) && args.length > 0;
}

test("#15327 win32 spawns npm with a joined command line and no argv array", () => {
  const [file, args, options] = npmExecInvocation("win32", npmBin("win32"), VERSION_ARGS, {
    timeoutMs: 15000,
  });

  // The shell still has to be on, or npm.cmd cannot be spawned at all (#11335).
  assert.equal(options.shell, true, "win32 must keep the shell so npm.cmd can be spawned");
  assert.equal(options.windowsHide, true);
  assert.equal(options.timeout, 15000);

  // …but the argv array that triggers DEP0190 must be empty.
  assert.deepEqual(args, [], `win32 must pass no argv array, got ${JSON.stringify(args)}`);
  assert.equal(
    dep0190WouldFire(args, options),
    false,
    "spawning with shell:true AND a non-empty args array is what DEP0190 fires on"
  );
  assert.equal(file, "npm.cmd view omniroute version --prefer-online");
});

test("#15327 the joined command line carries only the literal tokens it was given", () => {
  const [file] = npmExecInvocation("win32", npmBin("win32"), VERSION_ARGS);

  // Every token survives the join verbatim — nothing quoted, escaped or reordered.
  for (const token of [npmBin("win32"), ...VERSION_ARGS]) {
    assert.ok(
      (file as string).split(" ").includes(token),
      `${JSON.stringify(token)} must appear verbatim in ${JSON.stringify(file)}`
    );
  }
  assert.equal(
    (file as string).split(" ").length,
    1 + VERSION_ARGS.length,
    "the join must add no quoting and drop no token"
  );
});

test("#15327 off win32 the argv array is passed through untouched", () => {
  for (const platform of ["linux", "darwin"] as const) {
    const [file, args, options] = npmExecInvocation(platform, npmBin(platform), VERSION_ARGS, {
      timeoutMs: 15000,
    });

    assert.equal(file, npmBin(platform));
    assert.deepEqual(args, VERSION_ARGS, `${platform} must keep the argv array`);
    assert.equal(options.shell, false);
    // No shell, so nothing can trigger DEP0190 regardless of the argv.
    assert.equal(dep0190WouldFire(args, options), false);
  }
});

test("#15327 npmExecInvocation refuses to join a non-literal token (Hard Rule #13)", () => {
  // The shell now receives a raw string, so a token that could change how the shell
  // parses the line must fail loudly instead of being concatenated into it.
  const unsafe = [
    "omniroute && whoami",
    "omniroute; whoami",
    "omniroute | more",
    "$(whoami)",
    "`whoami`",
    "a b",
    'omniroute"',
    "omniroute'",
    "C:\\Users\\John Doe\\pkg",
    "^&calc",
  ];

  for (const token of unsafe) {
    assert.throws(
      () => npmExecInvocation("win32", npmBin("win32"), [token]),
      /Hard Rule #13/,
      `${JSON.stringify(token)} must not be joined into a shell command line`
    );
  }

  // The same tokens are harmless off Windows, where no shell parses the line — the
  // new restriction must not leak onto the platforms that never needed one.
  for (const token of unsafe) {
    const [, args] = npmExecInvocation("linux", npmBin("linux"), [token]);
    assert.deepEqual(args, [token], `linux must pass ${JSON.stringify(token)} through`);
  }
});

test("#15327 npmExecInvocation still accepts the literal shapes the CLI spawns", () => {
  const literals = [
    "view",
    "changelog",
    "install",
    "--prefer-online",
    "--include=optional",
    "--legacy-peer-deps",
    "omniroute",
    "@omniroute/opencode-plugin-v2",
    "3.8.52",
    "latest",
    "npm.cmd",
  ];

  for (const token of literals) {
    const [file, args, options] = npmExecInvocation("win32", "npm.cmd", [token]);
    assert.deepEqual(args, []);
    assert.equal(file, `npm.cmd ${token}`);
    assert.equal(dep0190WouldFire(args, options), false);
  }
});

test("#15327 the CLI's npm calls all resolve through npmExecInvocation", () => {
  const src = fs.readFileSync(
    new URL("../../bin/cli/commands/update.mjs", import.meta.url),
    "utf8"
  );

  // The defect: an argv array handed to execFile alongside the win32 shell.
  assert.equal(
    /npmExecOptions\(\s*process\.platform/.test(src),
    false,
    "update.mjs must not build npm exec options itself — npmExecInvocation owns the win32 shape"
  );

  const binCalls = src.match(/npmBin\(/g) || [];
  const invocationCalls = src.match(/npmExecInvocation\(/g) || [];
  assert.ok(binCalls.length >= 2, "both the version and changelog lookups must be covered");
  assert.equal(
    binCalls.length,
    invocationCalls.length,
    "every npmBin() call site must go through npmExecInvocation()"
  );
});

test("#15327 getLatestVersion passes no argv array on win32", async () => {
  let captured: { file: string; args: string[]; options: Record<string, unknown> } | null = null;
  const fakeExec = async (file: string, args: string[], options: Record<string, unknown>) => {
    captured = { file, args, options };
    return { stdout: "3.8.53\n" };
  };

  const latest = await update.getLatestVersion(fakeExec, "win32");

  assert.equal(latest, "3.8.53");
  assert.ok(captured, "exec must be invoked");
  const call = captured as unknown as {
    file: string;
    args: string[];
    options: Record<string, unknown>;
  };

  assert.deepEqual(call.args, [], "win32 must not pass an argv array alongside shell:true");
  assert.equal(dep0190WouldFire(call.args, call.options), false);
  assert.equal(call.file, "npm.cmd view omniroute version --prefer-online");
  // The #4376 query itself is unchanged.
  assert.ok(call.file.includes("--prefer-online"));
});

test("#15327 getLatestVersion keeps its argv array off win32", async () => {
  let captured: { file: string; args: string[] } | null = null;
  const fakeExec = async (file: string, args: string[]) => {
    captured = { file, args };
    return { stdout: "3.8.53\n" };
  };

  const latest = await update.getLatestVersion(fakeExec, "linux");
  assert.equal(latest, "3.8.53");

  const call = captured as unknown as { file: string; args: string[] };
  assert.equal(call.file, "npm");
  assert.deepEqual(call.args, ["view", "omniroute", "version", "--prefer-online"]);
});

test("#15327 the shell is still enabled exactly where #11335 needed it", () => {
  // Guards the other half of the collision: dropping the argv array must not have
  // been "fixed" by turning the shell off, which reintroduces the #11335 EINVAL.
  assert.equal(npmExecOptions("win32").shell, true);
  assert.equal(npmExecOptions("linux").shell, false);
  assert.equal(npmExecOptions("darwin").shell, false);
});
