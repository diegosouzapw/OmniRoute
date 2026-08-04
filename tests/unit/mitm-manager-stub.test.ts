/**
 * Regression test for #3390: getMitmStatus() in the Docker build stub must
 * return a safe "not available" status object instead of throwing STUB_ERROR.
 * When the stub throws, the AgentBridge state route propagates the error to
 * the UI, showing a red error banner instead of a graceful "stopped" state.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("mitm manager.stub — Docker graceful degradation (#3390)", () => {
  it("getMitmStatus resolves without throwing", async () => {
    const { getMitmStatus } = await import("../../src/mitm/manager.stub.ts");
    await assert.doesNotReject(getMitmStatus);
  });

  it("getMitmStatus returns running=false", async () => {
    const { getMitmStatus } = await import("../../src/mitm/manager.stub.ts");
    const status = await getMitmStatus();
    assert.strictEqual(status.running, false);
  });

  it("getMitmStatus returns pid=null", async () => {
    const { getMitmStatus } = await import("../../src/mitm/manager.stub.ts");
    const status = await getMitmStatus();
    assert.strictEqual(status.pid, null);
  });

  it("startMitm still throws (MITM unavailable in container)", async () => {
    const { startMitm } = await import("../../src/mitm/manager.stub.ts");
    await assert.rejects(async () => startMitm("key", "pwd"), /stub/i);
  });

  it("getAllAgentsStatus returns empty array", async () => {
    const { getAllAgentsStatus } = await import("../../src/mitm/manager.stub.ts");
    assert.deepStrictEqual(getAllAgentsStatus(), []);
  });
});
