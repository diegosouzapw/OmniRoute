import { test } from "node:test";
import assert from "node:assert/strict";

import { resolveCodexSpawn } from "../../bin/cli/commands/launch-codex.mjs";

// Regression guard for #6312: on Windows the `codex` binary is an npm `.cmd`
// shim that `spawn` cannot resolve without a shell (bare "codex" → ENOENT).
// Since #9454 resolveCodexSpawn is async and probes PATH for a native .exe
// first; the .cmd+shell fallback below is the original #6312 contract (the
// .exe-preferred path is covered in cli/launch-claude-exe-windows-9454.test.ts).
test("resolveCodexSpawn: win32 spawns codex.cmd through a shell when no .exe is found", async () => {
  const { command, shell } = await resolveCodexSpawn("win32", { probe: async () => null });
  assert.equal(command, "codex.cmd");
  assert.equal(shell, true);
});

test("resolveCodexSpawn: non-Windows platforms spawn the bare binary without a shell", async () => {
  for (const platform of ["linux", "darwin", "freebsd"]) {
    let probeCalls = 0;
    const { command, shell } = await resolveCodexSpawn(platform, {
      probe: async () => {
        probeCalls++;
        return null;
      },
    });
    assert.equal(command, "codex", `${platform} command`);
    assert.equal(shell, undefined, `${platform} shell`);
    assert.equal(probeCalls, 0, `${platform} must not probe PATH off Windows`);
  }
});
