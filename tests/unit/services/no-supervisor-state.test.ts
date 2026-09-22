import test from "node:test";
import assert from "node:assert/strict";

const versionManagerDb = await import("../../../src/lib/db/versionManager.ts");
const { unregisterSupervisor } = await import("../../../src/lib/services/registry.ts");
const { projectStateWithoutSupervisor } =
  await import("../../../src/lib/services/persistedState.ts");

async function seedStaleState(tool: string): Promise<void> {
  await versionManagerDb.upsertVersionManagerTool({
    tool,
    status: "running",
    pid: 4242,
    healthStatus: "healthy",
    errorMessage: "stale error",
  });
}

function assertReconciled(tool: string): Promise<void> {
  return versionManagerDb.getVersionManagerTool(tool).then((row) => {
    assert.ok(row);
    assert.equal(row.status, "stopped");
    assert.equal(row.pid, null);
    assert.equal(row.healthStatus, "unknown");
    assert.equal(row.errorMessage, null);
  });
}

test("unsupervised state projection demotes only volatile lifecycle states", () => {
  assert.equal(projectStateWithoutSupervisor("starting"), "stopped");
  assert.equal(projectStateWithoutSupervisor("running"), "stopped");
  assert.equal(projectStateWithoutSupervisor("stopping"), "stopped");
  assert.equal(projectStateWithoutSupervisor("not_installed"), "not_installed");
  assert.equal(projectStateWithoutSupervisor("error"), "error");
  assert.equal(projectStateWithoutSupervisor(null), "unknown");
});

test("CLIProxy no-supervisor stop persists a clean stopped state", async () => {
  unregisterSupervisor("cliproxy");
  await seedStaleState("cliproxy");

  const { POST } = await import("../../../src/app/api/services/cliproxy/stop/route.ts");
  const response = await POST();

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { tool: "cliproxy", state: "stopped" });
  await assertReconciled("cliproxy");
});

test("Bifrost no-supervisor stop persists a clean stopped state", async () => {
  unregisterSupervisor("bifrost");
  await seedStaleState("bifrost");

  const { POST } = await import("../../../src/app/api/services/bifrost/stop/route.ts");
  const response = await POST();

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { tool: "bifrost", state: "stopped" });
  await assertReconciled("bifrost");
});

test("legacy version-manager stop reconciles the requested alias row", async () => {
  unregisterSupervisor("cliproxy");
  await seedStaleState("cliproxyapi");

  const { POST } = await import("../../../src/app/api/version-manager/stop/route.ts");
  const response = await POST(
    new Request("http://localhost/api/version-manager/stop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool: "cliproxyapi" }),
    })
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  await assertReconciled("cliproxyapi");
});

test("legacy version-manager status masks stale volatile fields without a supervisor", async () => {
  unregisterSupervisor("cliproxy");
  await seedStaleState("cliproxyapi");

  const { GET } = await import("../../../src/app/api/version-manager/status/route.ts");
  const response = await GET(undefined as unknown as Request);
  const rows = (await response.json()) as Array<Record<string, unknown>>;
  const row = rows.find((candidate) => candidate.tool === "cliproxyapi");

  assert.equal(response.status, 200);
  assert.ok(row);
  assert.equal(row.status, "stopped");
  assert.equal(row.pid, null);
  assert.equal(row.healthStatus, "unknown");
});
