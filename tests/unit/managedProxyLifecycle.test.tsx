// @vitest-environment node
import assert from "node:assert/strict";
import path from "node:path";
import { afterAll, expect, test, vi } from "vitest";
import { assertManagedFixture } from "../_setup/managedProxyFixture.mjs";
import type { ServiceConfig } from "../../src/lib/services/types";

const root = assertManagedFixture();
vi.mock("@/lib/db/versionManager", () => ({
  getServiceRow: vi.fn(async () => null),
  setToolStatus: vi.fn(async () => {}),
}));
vi.mock(
  "@omniroute/open-sse/utils/error",
  async () => import("../../open-sse/utils/errorSanitization.ts")
);
vi.mock("../../src/lib/services/portProbe", () => ({
  decidePreSpawn: () => {
    throw new Error("No port probing allowed in lifecycle fixture");
  },
  isAdoptExistingEnabled: () => false,
  probeBeforeSpawn: () => {
    throw new Error("No port probing allowed in lifecycle fixture");
  },
  resolvePortPid: () => {
    throw new Error("No adoption allowed in lifecycle fixture");
  },
}));
const { ServiceSupervisor } = await import("../../src/lib/services/ServiceSupervisor");
const owned = new Set<InstanceType<typeof ServiceSupervisor>>();
afterAll(async () => {
  for (const supervisor of owned) await supervisor.stop();
});

function config(overrides: Partial<ServiceConfig> = {}): ServiceConfig {
  return {
    tool: "synthetic-managed",
    port: 0,
    spawnArgs: () => ({
      command: process.execPath,
      args: [path.resolve("tests/fixtures/managedProxyChild.mjs")],
      env: { ...process.env },
      cwd: root,
    }),
    healthUrl: () => {
      throw new Error("No health network allowed in lifecycle fixture");
    },
    healthProbe: async () => true,
    // Supervisor's incumbent readiness loop polls once per second.
    healthIntervalMs: 500,
    stopTimeoutMs: 500,
    logsBufferBytes: 1024,
    requireHealthy: true,
    ...overrides,
  };
}
function isAlive(pid: number): boolean {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ESRCH") return false;
    throw error;
  }
}

test("failed spawn without PID stops, recovers to an owned real child, and reaps it", async () => {
  let failSpawn = true;
  const good = config();
  const supervisor = new ServiceSupervisor(
    config({
      spawnArgs: () =>
        failSpawn
          ? {
              command: path.join(root, "missing-executable"),
              args: [],
              env: { ...process.env },
              cwd: root,
            }
          : good.spawnArgs(),
    })
  );
  owned.add(supervisor);
  try {
    const failed = await supervisor.start();
    expect(failed.state).toBe("error");
    expect(failed.pid).toBeNull();
    expect(failed.lastError).toMatch(/ENOENT|spawn/i);
    expect((await supervisor.stop()).state).toBe("stopped");
    failSpawn = false;
    const running = await supervisor.start();
    expect(running.state).toBe("running");
    expect(running.health).toBe("healthy");
    assert.ok(running.pid);
    expect(isAlive(running.pid)).toBe(true);
    expect((await supervisor.start()).pid).toBe(running.pid);
    const stopped = await supervisor.stop();
    expect(stopped.state).toBe("stopped");
    expect(stopped.pid).toBeNull();
    expect(isAlive(running.pid)).toBe(false);
  } finally {
    await supervisor.stop();
  }
}, 15000);

test("failed readiness terminates its real child before rejecting and can recover", async () => {
  let ready = false;
  const supervisor = new ServiceSupervisor(config({ healthProbe: async () => ready }));
  owned.add(supervisor);
  let startedPid: number | null = null;
  supervisor.on("stateChange", (status) => {
    if (status.pid) startedPid = status.pid;
  });
  try {
    await expect(supervisor.start()).rejects.toThrow(
      /Health probe failed|listeners did not become ready/
    );
    expect(supervisor.getStatus().state).toBe("error");
    assert.ok(startedPid);
    expect(isAlive(startedPid)).toBe(false);
    ready = true;
    const recovered = await supervisor.start();
    expect(recovered.state).toBe("running");
    assert.ok(recovered.pid);
    await supervisor.stop();
    expect(isAlive(recovered.pid)).toBe(false);
  } finally {
    await supervisor.stop();
  }
}, 15000);
