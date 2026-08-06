import { test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  buildCodexProviderArgs,
  quoteCodexArgs,
  resolveCodexSpawn,
} from "../../../bin/cli/commands/launch-codex.mjs";

const isWindows = process.platform === "win32";

// #9454: the resolver now probes PATH for a `.exe` before falling back to the
// npm `.cmd` shim. With no probe injected it runs `where.exe`; pin the fallback
// (no .exe found → codex.cmd + shell) here.
test("resolveCodexSpawn: win32 falls back to codex.cmd + shell when no .exe is on PATH", async () => {
  const { command, shell } = await resolveCodexSpawn("win32", { probe: async () => null });
  assert.equal(command, "codex.cmd");
  assert.equal(shell, true);
});

test("resolveCodexSpawn: non-Windows platforms spawn the bare binary without a shell", async () => {
  for (const platform of ["linux", "darwin", "freebsd"]) {
    const { command, shell } = await resolveCodexSpawn(platform);
    assert.equal(command, "codex", `${platform} command`);
    assert.equal(shell, undefined, `${platform} shell`);
  }
});

test("quoteCodexArgs leaves argv untouched off Windows (no shell, no quoting)", () => {
  const args = [...buildCodexProviderArgs("http://localhost:20128"), "explain this repo"];
  assert.deepEqual(quoteCodexArgs(args, "linux"), args);
});

// The injected provider flags are the reason this bug bit every Windows
// invocation, not just the ones with a multi-word user argument: their TOML
// values are quoted, and cmd.exe eats those quotes when the line is unescaped.
test("quoteCodexArgs escapes the injected -c provider flags on win32", () => {
  const input = buildCodexProviderArgs("http://localhost:20128");
  const quoted = quoteCodexArgs(input, "win32");
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
test("quoteCodexArgs: exact win32 encoding (golden)", () => {
  const golden: Array<[string, string]> = [
    ["-c", '^^^"-c^^^"'],
    [
      'model_providers.omniroute.base_url="http://localhost:20128/v1"',
      '^^^"model_providers.omniroute.base_url=\\^^^"http://localhost:20128/v1\\^^^"^^^"',
    ],
    [
      "model_providers.omniroute.requires_openai_auth=false",
      '^^^"model_providers.omniroute.requires_openai_auth=false^^^"',
    ],
    ["fix the bug & ship it", '^^^"fix^^^ the^^^ bug^^^ ^^^&^^^ ship^^^ it^^^"'],
    ["", '""'],
  ];
  for (const [input, expected] of golden) {
    assert.equal(
      quoteCodexArgs([input], "win32")[0],
      expected,
      `encoding of ${JSON.stringify(input)}`
    );
  }
});

test("quoteCodexArgs does not mutate the caller's array", () => {
  const input = ["-c", "model_provider=\"omniroute\""];
  quoteCodexArgs(input, "win32");
  assert.deepEqual(input, ["-c", 'model_provider="omniroute"']);
});

// The real contract: whatever we hand to spawn(shell:true) must arrive at the
// child's argv byte-identical. Verified against a probe .cmd through the same
// cmd.exe path the launcher uses.
test(
  "quoteCodexArgs survives a real cmd.exe round-trip",
  { skip: isWindows ? false : "windows-only: exercises the cmd.exe shell path" },
  async () => {
    const dir = mkdtempSync(join(tmpdir(), "omniroute-codex-argv-"));
    try {
      // Mirror the real shape of `codex.cmd`: an npm .cmd shim forwarding %*
      // to a node script. Printing argv as JSON keeps the oracle exact.
      writeFileSync(join(dir, "argv.mjs"), "console.log(JSON.stringify(process.argv.slice(2)));\n");
      const probe = join(dir, "probe.cmd");
      writeFileSync(probe, ["@echo off", 'node "%~dp0argv.mjs" %*'].join("\r\n") + "\r\n");

      const args = [
        ...buildCodexProviderArgs("http://localhost:20128"),
        "--profile",
        "auto-best-coding",
        "In one short line: say BANANA",
        'quotes " and & ampersands | pipes',
        "percent %PATH% and caret ^ and bang !",
        "trailing backslash \\",
        "",
      ];

      const received = await new Promise<string[]>((resolve, reject) => {
        const child = spawn(probe, quoteCodexArgs(args, "win32"), {
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
