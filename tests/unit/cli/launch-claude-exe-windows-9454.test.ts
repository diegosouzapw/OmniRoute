import { test } from "node:test";
import assert from "node:assert/strict";

import { resolveClaudeSpawn } from "../../../bin/cli/commands/launch.mjs";
import { resolveCodexSpawn } from "../../../bin/cli/commands/launch-codex.mjs";

// #9454: the native Anthropic installer creates only claude.exe (no .cmd shim),
// so hardcoding claude.cmd on win32 fails for native installs. The resolver must
// probe PATH for the .exe first and spawn it without a shell (a real PE doesn't
// need cmd.exe), falling back to the npm .cmd shim only when no .exe is found.

test("resolveClaudeSpawn: win32 prefers claude.exe (no shell) when the native binary is on PATH", async () => {
  const exePath = "C:\\Users\\me\\.local\\bin\\claude.exe";
  const probe = async () => exePath;
  const { command, shell } = await resolveClaudeSpawn("win32", { probe });
  assert.equal(command, exePath);
  assert.equal(shell, undefined, "a real PE binary does not need cmd.exe");
});

test("resolveClaudeSpawn: win32 falls back to claude.cmd + shell when only the npm shim exists", async () => {
  const probe = async () => "C:\\Users\\me\\AppData\\Roaming\\npm\\claude.cmd";
  const { command, shell } = await resolveClaudeSpawn("win32", { probe });
  assert.equal(command, "claude.cmd");
  assert.equal(shell, true, "npm .cmd shim still needs cmd.exe");
});

test("resolveClaudeSpawn: win32 falls back to claude.cmd + shell when where.exe finds nothing", async () => {
  const probe = async () => null;
  const { command, shell } = await resolveClaudeSpawn("win32", { probe });
  assert.equal(command, "claude.cmd");
  assert.equal(shell, true, "unknown install shape defaults to the npm shim path");
});

test("resolveClaudeSpawn: non-Windows is unchanged (bare binary, no shell, no probe call)", async () => {
  let called = 0;
  const probe = async () => {
    called++;
    return null;
  };
  for (const platform of ["linux", "darwin", "freebsd"]) {
    const { command, shell } = await resolveClaudeSpawn(platform, { probe });
    assert.equal(command, "claude", `${platform} command`);
    assert.equal(shell, undefined, `${platform} shell`);
  }
  assert.equal(called, 0, "where.exe probe must NEVER run off Windows");
});

// Same regression for the codex launcher: codex ships a native build too.
test("resolveCodexSpawn: win32 prefers codex.exe (no shell) when a native binary is on PATH", async () => {
  const exePath = "C:\\Users\\me\\.local\\bin\\codex.exe";
  const probe = async () => exePath;
  const { command, shell } = await resolveCodexSpawn("win32", { probe });
  assert.equal(command, exePath);
  assert.equal(shell, undefined);
});

test("resolveCodexSpawn: win32 falls back to codex.cmd + shell when only the npm shim exists", async () => {
  const probe = async () => "C:\\Users\\me\\AppData\\Roaming\\npm\\codex.cmd";
  const { command, shell } = await resolveCodexSpawn("win32", { probe });
  assert.equal(command, "codex.cmd");
  assert.equal(shell, true);
});

test("resolveCodexSpawn: win32 falls back to codex.cmd + shell when where.exe finds nothing", async () => {
  const probe = async () => null;
  const { command, shell } = await resolveCodexSpawn("win32", { probe });
  assert.equal(command, "codex.cmd");
  assert.equal(shell, true);
});

test("resolveCodexSpawn: non-Windows is unchanged (bare binary, no shell, no probe call)", async () => {
  let called = 0;
  const probe = async () => {
    called++;
    return null;
  };
  for (const platform of ["linux", "darwin", "freebsd"]) {
    const { command, shell } = await resolveCodexSpawn(platform, { probe });
    assert.equal(command, "codex", `${platform} command`);
    assert.equal(shell, undefined, `${platform} shell`);
  }
  assert.equal(called, 0, "where.exe probe must NEVER run off Windows");
});
