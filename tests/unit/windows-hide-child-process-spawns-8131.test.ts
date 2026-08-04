/**
 * Regression test for #8131 — on Windows, child processes spawned without
 * `windowsHide: true` cause a transient conhost.exe/cmd console window to
 * flash open. PR #8167 audited most spawn/exec call sites but missed the
 * two `child_process.spawn()` call sites below plus the `execFile()` wrapper
 * used by `runNpm()` (covered separately in
 * tests/unit/services/installers/runNpm-shell-5379.test.ts).
 *
 * Both `ServiceSupervisor.start()` and `processManager.startProcess()` use a
 * bare named `import { spawn } from "node:child_process"`, which Node's ESM
 * live-binding semantics make impossible to intercept with
 * `mock.method()`/`mock.module()` without the (project-wide, not currently
 * enabled) `--experimental-test-module-mocks` flag. Rather than widen the
 * test-runner flags, the options object each call site passes to `spawn()`
 * is factored into a small, pure, exported builder function — asserted on
 * directly here instead of mocking `node:child_process`.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { buildServiceSpawnOptions } from "../../src/lib/services/ServiceSupervisor.ts";
import { buildCliproxyapiSpawnOptions } from "../../src/lib/versionManager/processManager.ts";

test("ServiceSupervisor: buildServiceSpawnOptions sets windowsHide: true (#8131)", () => {
  const opts = buildServiceSpawnOptions({ FOO: "bar" }, "/tmp/cwd");
  assert.equal(opts.windowsHide, true);
  // Sanity: the rest of the previously-inline options object still round-trips.
  assert.equal(opts.env?.FOO, "bar");
  assert.equal(opts.cwd, "/tmp/cwd");
  assert.equal(opts.detached, false);
  assert.deepEqual(opts.stdio, ["ignore", "pipe", "pipe"]);
});

test("processManager: buildCliproxyapiSpawnOptions sets windowsHide: true (#8131)", () => {
  const opts = buildCliproxyapiSpawnOptions();
  assert.equal(opts.windowsHide, true);
  assert.equal(opts.detached, false);
  assert.deepEqual(opts.stdio, ["ignore", "pipe", "pipe"]);
  assert.ok(opts.env, "env should be populated from process.env");
});
