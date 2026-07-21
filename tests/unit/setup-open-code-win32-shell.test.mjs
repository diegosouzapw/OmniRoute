// Regression test for #7913: `omniroute setup opencode --auth` spawns the
// `opencode.cmd` shim on win32. Since Node's CVE-2024-27980 hardening,
// spawning a `.cmd`/`.bat` shim with `shell:false` throws EINVAL — the same
// class already fixed for codex (bin/cli/commands/launch-codex.mjs,
// crediting #6263) and qodercli/Auggie (#6263/#6304). This callsite was
// missed; `runOpenCodeAuth` must use `shell: isWin` mirroring `resolveCodexSpawn`.
import { test } from "node:test";
import assert from "node:assert/strict";

test("runOpenCodeAuth spawns opencode.cmd with shell:true on win32 (repro #7913)", async (t) => {
  const originalPlatform = process.platform;
  Object.defineProperty(process, "platform", { value: "win32" });
  let captured = null;
  t.mock.module("node:child_process", {
    namedExports: {
      spawnSync: (cmd, args, opts) => {
        captured = { cmd, args, opts };
        return { status: 0, error: null };
      },
    },
  });
  t.after(() => Object.defineProperty(process, "platform", { value: originalPlatform }));

  const { runOpenCodeAuth } = await import(
    "../../bin/cli/commands/setup-open-code.mjs?win32-case"
  );
  runOpenCodeAuth("omniroute");

  assert.ok(captured, "spawnSync should have been called");
  assert.equal(captured.cmd, "opencode.cmd");
  assert.equal(captured.opts.shell, true, `expected shell:true, got shell:${captured.opts.shell}`);
});

test("runOpenCodeAuth spawns bare opencode with shell:undefined on linux/darwin (no regression)", async (t) => {
  const originalPlatform = process.platform;
  Object.defineProperty(process, "platform", { value: "linux" });
  let captured = null;
  t.mock.module("node:child_process", {
    namedExports: {
      spawnSync: (cmd, args, opts) => {
        captured = { cmd, args, opts };
        return { status: 0, error: null };
      },
    },
  });
  t.after(() => Object.defineProperty(process, "platform", { value: originalPlatform }));

  const { runOpenCodeAuth } = await import(
    "../../bin/cli/commands/setup-open-code.mjs?linux-case"
  );
  runOpenCodeAuth("omniroute");

  assert.ok(captured, "spawnSync should have been called");
  assert.equal(captured.cmd, "opencode");
  assert.notEqual(captured.opts.shell, true, `expected shell not true on non-win32, got shell:${captured.opts.shell}`);
});
