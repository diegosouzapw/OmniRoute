/**
 * Regression tests for the embedded-services supervisor (ServiceSupervisor).
 *
 * Bug: when the supervised binary cannot be spawned (ENOENT / EACCES, or a
 * non-executable binary such as an ELF on Windows — EFTYPE), the child emits
 * the 'error' event — NOT 'exit' — and on Windows spawn() can even throw
 * synchronously. The supervisor had no 'error' handler, so it stayed in
 * "starting" forever while the HealthChecker kept polling the dead port every
 * healthIntervalMs (each probe firing a full ProxyFetch dispatcher+native
 * fetch pair, e.g. against a CLIProxyAPI port that will never answer on this
 * platform).
 *
 * Fix under test: the supervisor now (1) handles synchronous spawn() throws
 * and the child 'error' event → stops the poller and transitions to "error",
 * and (2) transitions to "error" and stops the poller once the health checker
 * reports FAILURE_THRESHOLD consecutive failures, including during startup,
 * instead of polling the dead endpoint forever.
 *
 * Run: node --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts --import ./tests/_setup/isolateDataDir.ts --test tests/unit/services/serviceSupervisorSpawnError.test.ts
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, writeFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { ServiceSupervisor } from "../../../src/lib/services/ServiceSupervisor.ts";
import type { ServiceConfig } from "../../../src/lib/services/types.ts";

function baseConfig(overrides: Partial<ServiceConfig> = {}): ServiceConfig {
  return {
    tool: "cliproxy",
    port: 0,
    spawnArgs: () => ({
      command: process.execPath,
      args: ["-e", "setTimeout(() => {}, 30_000)"],
      env: process.env,
      cwd: tmpdir(),
    }),
    healthUrl: () => "http://127.0.0.1:1/v1/models",
    healthIntervalMs: 50,
    stopTimeoutMs: 1_000,
    logsBufferBytes: 4_096,
    ...overrides,
  };
}

describe("ServiceSupervisor spawn-failure handling", () => {
  it("transitions to error and stops polling when the binary cannot be spawned", async () => {
    // A plain text file is not an executable: on Windows spawn() throws
    // synchronously (EFTYPE/EINVAL); on POSIX the child emits 'error'
    // (ENOENT/EACCES). Both paths must land in an explicit error state.
    const dir = await mkdtemp(join(tmpdir(), "svc-sup-spawn-"));
    const badBinary = join(dir, "not-an-executable.txt");
    await writeFile(badBinary, "this is not a runnable binary\n", "utf8");

    const supervisor = new ServiceSupervisor(
      baseConfig({
        spawnArgs: () => ({
          command: badBinary,
          args: [],
          env: process.env,
          cwd: dir,
        }),
      })
    );

    try {
      const status = await supervisor.start();
      assert.equal(status.state, "error");
      assert.ok(status.lastError, "lastError should describe the spawn failure");
      assert.match(status.lastError!, /ENOENT|EACCES|EINVAL|EFTYPE|not recognized|spawn|%1|Win32/i);
    } finally {
      await rm(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    }
  });

  it("transitions to error after consecutive health failures instead of polling forever", async () => {
    const supervisor = new ServiceSupervisor(baseConfig());
    try {
      // The child runs but never opens a server on the health URL: the
      // HealthChecker reaches FAILURE_THRESHOLD (3 × 50ms) and the supervisor
      // must surface an explicit error instead of staying "running" with an
      // endless poller.
      await assert.rejects(supervisor.start(), /Health probe failed|Service failed to start/i);
      assert.equal(supervisor.getStatus().state, "error");
      assert.ok(supervisor.getStatus().lastError);
    } finally {
      await supervisor.stop();
    }
  });
});
