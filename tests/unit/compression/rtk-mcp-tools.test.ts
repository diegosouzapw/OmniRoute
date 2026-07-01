import { describe, it, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// T07 — omniroute_rtk_discover / omniroute_rtk_learn MCP tools (read-only; audited).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-rtk-mcp-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { handleRtkDiscover, handleRtkLearn } = await import(
  "../../../open-sse/mcp-server/tools/compressionTools.ts"
);
const { maybePersistRtkRawOutput } = await import(
  "../../../open-sse/services/compression/engines/rtk/rawOutput.ts"
);
const { getRecentAuditEntries } = await import("../../../open-sse/mcp-server/audit.ts");

const NOISE = [
  "Welcome to Gradle 8.5!",
  "> Task :app:compileJava UP-TO-DATE",
  "Downloading https://repo1.maven.org/foo.jar",
  "BUILD SUCCESSFUL in 12s",
].join("\n");

function seedSamples() {
  // retention "always" forces a capture even on a successful (non-failure) output.
  maybePersistRtkRawOutput(NOISE, { retention: "always", command: "gradle build" });
  maybePersistRtkRawOutput(NOISE, { retention: "always", command: "gradle build" });
}

beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  core.getDbInstance(); // run migrations → mcp_tool_audit table exists
});

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

describe("RTK MCP tools (T07)", () => {
  it("omniroute_rtk_discover returns ranked noise candidates from the sample store", async () => {
    seedSamples();
    const result = await handleRtkDiscover({ limit: 100 });
    assert.equal(typeof result.sampleCount, "number");
    assert.ok(result.sampleCount >= 2, `expected the 2 seeded samples, got ${result.sampleCount}`);
    assert.ok(Array.isArray(result.candidates));
  });

  it("omniroute_rtk_learn returns a filter draft for a specific command", async () => {
    seedSamples();
    const result = await handleRtkLearn({ command: "gradle build", limit: 100 });
    assert.equal(result.command, "gradle build");
    assert.ok(result.sampleCount >= 1, "expected at least one matching sample");
    assert.ok(result.filter && typeof result.filter === "object", "expected a suggested filter draft");
  });

  it("returns an empty/baseline result with no samples (no throw)", async () => {
    const discover = await handleRtkDiscover({});
    assert.equal(discover.sampleCount, 0);
    assert.deepEqual(discover.candidates, []);
    const learn = await handleRtkLearn({ command: "npm test" });
    assert.equal(learn.sampleCount, 0);
  });

  it("both tools are audited in mcp_tool_audit", async () => {
    await handleRtkDiscover({});
    await handleRtkLearn({ command: "gradle build" });
    const entries = await getRecentAuditEntries(20);
    const names = entries.map((e) => e.toolName);
    assert.ok(names.includes("omniroute_rtk_discover"), "discover must be audited");
    assert.ok(names.includes("omniroute_rtk_learn"), "learn must be audited");
  });
});
