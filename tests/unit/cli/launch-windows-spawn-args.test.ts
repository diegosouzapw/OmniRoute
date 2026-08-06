import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import { quoteClaudeArgs, resolveClaudeSpawn } from "../../../bin/cli/commands/launch.mjs";

const isWindows = process.platform === "win32";

// Regression guard for #8246: on Windows the `claude` binary is an npm `.cmd`
// shim that spawn() cannot resolve without a shell (bare "claude" -> ENOENT).
// #9454: the native installer ships only `claude.exe`, so the resolver now
// probes PATH first. With no probe injected (the production path runs
// `where.exe`), the default on a non-Windows CI host finds nothing and falls
// back to the npm `.cmd` shim + shell — pinning that fallback contract here.
test("resolveClaudeSpawn: win32 falls back to claude.cmd + shell when no .exe is on PATH", async () => {
  const { command, shell } = await resolveClaudeSpawn("win32", { probe: async () => null });
  assert.equal(command, "claude.cmd");
  assert.equal(shell, true);
});

test("resolveClaudeSpawn: non-Windows platforms spawn the bare binary without a shell", async () => {
  for (const platform of ["linux", "darwin", "freebsd"]) {
    const { command, shell } = await resolveClaudeSpawn(platform);
    assert.equal(command, "claude", `${platform} command`);
    assert.equal(shell, undefined, `${platform} shell`);
  }
});

// Regression guard: `shell: true` makes Node concatenate argv unescaped
// (DEP0190), so `-p "two words"` reached claude as `-p two` and the rest of the
// prompt was parsed as separate arguments.
test("quoteClaudeArgs leaves argv untouched off Windows (no shell, no quoting)", () => {
  const args = ["-p", "two words", "--model", "sonnet"];
  assert.deepEqual(quoteClaudeArgs(args, "linux"), args);
});

test("quoteClaudeArgs escapes every argument on win32", () => {
  // cmd.exe parses the whole line, so each argument is quoted — not just the
  // ones containing spaces. The exact encoding is asserted by the round-trip
  // test below; here we only pin that nothing is passed through raw.
  const input = ["-p", "two words", "--profile", "auto-best-coding"];
  const quoted = quoteClaudeArgs(input, "win32");
  assert.equal(quoted.length, input.length);
  for (const [i, arg] of quoted.entries()) {
    assert.notEqual(arg, input[i], `argument ${i} must be escaped`);
    assert.match(arg, /"/, `argument ${i} must be quoted`);
  }
});

// The cmd.exe round-trip below is the real proof, but it can only run on
// Windows. These golden strings pin the exact encoding so CI (Linux) still
// fails if the escaping changes — e.g. if the double caret-escape required by
// the `.cmd` shim's %* re-parse is ever reduced back to a single pass.
test("quoteClaudeArgs: exact win32 encoding (golden)", () => {
  const golden: Array<[string, string]> = [
    ["-p", '^^^"-p^^^"'],
    ["auto-best-coding", '^^^"auto-best-coding^^^"'],
    ["two words", '^^^"two^^^ words^^^"'],
    ["a & b", '^^^"a^^^ ^^^&^^^ b^^^"'],
    ['q"uote', '^^^"q\\^^^"uote^^^"'],
    ["trail\\", '^^^"trail\\\\^^^"'],
    ["%PATH%", '^^^"^^^%PATH^^^%^^^"'],
    ["", '""'],
  ];
  for (const [input, expected] of golden) {
    assert.equal(quoteClaudeArgs([input], "win32")[0], expected, `encoding of ${JSON.stringify(input)}`);
  }
});

test("quoteClaudeArgs does not mutate the caller's array", () => {
  const input = ["-p", "two words"];
  quoteClaudeArgs(input, "win32");
  assert.deepEqual(input, ["-p", "two words"]);
});

// The real contract: whatever we hand to spawn(shell:true) must arrive at the
// child's argv byte-identical. Verified against a probe .cmd through the same
// cmd.exe path the launcher uses.
test(
  "quoteClaudeArgs survives a real cmd.exe round-trip",
  { skip: isWindows ? false : "windows-only: exercises the cmd.exe shell path" },
  async () => {
    const dir = mkdtempSync(join(tmpdir(), "omniroute-argv-"));
    try {
      // Mirror the real shape of `claude.cmd`: an npm .cmd shim forwarding %*
      // to a node script. Printing argv as JSON keeps the oracle exact.
      writeFileSync(join(dir, "argv.mjs"), "console.log(JSON.stringify(process.argv.slice(2)));\n");
      const probe = join(dir, "probe.cmd");
      writeFileSync(probe, ['@echo off', 'node "%~dp0argv.mjs" %*'].join("\r\n") + "\r\n");

      const args = [
        "-p",
        "In one short line: say BANANA",
        "--append-system-prompt",
        'quotes " and & ampersands | pipes',
        "percent %PATH% and caret ^ and bang !",
        "trailing backslash \\",
        "",
        "--profile",
        "auto-best-coding",
      ];

      const received = await new Promise<string[]>((resolve, reject) => {
        const child = spawn(probe, quoteClaudeArgs(args, "win32"), {
          shell: true,
          windowsHide: true,
        });
        let out = "";
        child.stdout.on("data", (c) => (out += c));
        child.on("error", reject);
        child.on("exit", () => {
          try {
            resolve(JSON.parse(out.trim().split(/\r?\n/).pop() ?? "[]"));
          } catch (err) {
            reject(new Error(`probe did not emit argv JSON: ${out}`, { cause: err }));
          }
        });
      });

      assert.deepEqual(received, args, "child argv must match what the caller passed");
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }
);
