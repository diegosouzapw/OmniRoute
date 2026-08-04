import { test } from "node:test";
import assert from "node:assert/strict";

import { resolveCodexSpawn } from "../../bin/cli/commands/launch-codex.mjs";

// Regression guard for #6312: on Windows the `codex` binary is an npm `.cmd`
// shim that `spawn` cannot resolve without a shell (bare "codex" → ENOENT).
test("resolveCodexSpawn: win32 spawns codex.cmd through a shell", () => {
  const { command, shell } = resolveCodexSpawn("win32");
  assert.equal(command, "codex.cmd");
  assert.equal(shell, true);
});

test("resolveCodexSpawn: non-Windows platforms spawn the bare binary without a shell", () => {
  for (const platform of ["linux", "darwin", "freebsd"]) {
    const { command, shell } = resolveCodexSpawn(platform);
    assert.equal(command, "codex", `${platform} command`);
    assert.equal(shell, undefined, `${platform} shell`);
  }
});
