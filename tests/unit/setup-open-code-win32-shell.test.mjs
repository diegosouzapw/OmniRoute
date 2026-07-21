// Regression test for #7913: `omniroute setup opencode --auth` spawns the
// `opencode.cmd` shim on win32. Since Node's CVE-2024-27980 hardening,
// spawning a `.cmd`/`.bat` shim with `shell:false` throws EINVAL — the same
// class already fixed for codex (bin/cli/commands/launch-codex.mjs,
// crediting #6263) and qodercli/Auggie (#6263/#6304). This callsite was
// missed; `resolveOpenCodeAuthSpawn` must use `shell: isWin`.
//
// Tested through the pure `resolveOpenCodeAuthSpawn(providerId, platform)`
// resolver (no child_process mocking, no process.platform mutation — both of
// which required an unavailable --experimental-test-module-mocks flag in CI).
import { test } from "node:test";
import assert from "node:assert/strict";

import { resolveOpenCodeAuthSpawn } from "../../bin/cli/commands/setup-open-code.mjs";

test("resolveOpenCodeAuthSpawn: win32 spawns opencode.cmd with shell:true (repro #7913)", () => {
  const spawn = resolveOpenCodeAuthSpawn("omniroute", "win32");
  assert.equal(spawn.command, "opencode.cmd");
  assert.equal(
    spawn.options.shell,
    true,
    `expected shell:true on win32 (the EINVAL fix), got shell:${spawn.options.shell}`
  );
  assert.deepEqual(spawn.args, ["auth", "login", "--provider", "omniroute"]);
});

test("resolveOpenCodeAuthSpawn: linux/darwin spawn bare opencode with shell:false (no regression)", () => {
  for (const platform of ["linux", "darwin"]) {
    const spawn = resolveOpenCodeAuthSpawn("omniroute", platform);
    assert.equal(spawn.command, "opencode", `command on ${platform}`);
    assert.equal(
      spawn.options.shell,
      false,
      `expected shell:false on ${platform}, got shell:${spawn.options.shell}`
    );
  }
});

test("resolveOpenCodeAuthSpawn: forwards the provider id into the args", () => {
  const spawn = resolveOpenCodeAuthSpawn("anthropic", "linux");
  assert.deepEqual(spawn.args, ["auth", "login", "--provider", "anthropic"]);
});
