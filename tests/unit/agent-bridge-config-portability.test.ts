/**
 * Gap 4: portable JSON import/export of AgentBridge config (bypass patterns +
 * custom hosts + per-agent model mappings) so users can replicate a setup
 * across machines. Schema validation is pure; export/import roundtrip uses the
 * DATA_DIR-tmp + resetDbInstance pattern (CLAUDE.md PII learning #3).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-agentbridge-config-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const portability = await import("../../src/lib/inspector/configPortability.ts");

async function resetStorage() {
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      break;
    } catch (error: unknown) {
      const code = (error as { code?: string } | null)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((r) => setTimeout(r, 50 * (attempt + 1)));
      } else throw error;
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});
test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("AgentBridgeConfigSchema accepts a well-formed config", () => {
  const parsed = portability.AgentBridgeConfigSchema.safeParse({
    version: 1,
    bypassPatterns: ["*.bank.test"],
    customHosts: [{ host: "api.internal.test", kind: "custom", label: "Internal" }],
    agentMappings: { cursor: [{ source: "gpt-4o", target: "claude-sonnet-4-5" }] },
  });
  assert.equal(parsed.success, true);
});

test("AgentBridgeConfigSchema rejects a wrong version", () => {
  const parsed = portability.AgentBridgeConfigSchema.safeParse({
    version: 2,
    bypassPatterns: [],
    customHosts: [],
    agentMappings: {},
  });
  assert.equal(parsed.success, false);
});

test("AgentBridgeConfigSchema rejects a non-string bypass pattern", () => {
  const parsed = portability.AgentBridgeConfigSchema.safeParse({
    version: 1,
    bypassPatterns: [123],
    customHosts: [],
    agentMappings: {},
  });
  assert.equal(parsed.success, false);
});

test("import then export roundtrips bypass + custom hosts + mappings", () => {
  const config = {
    version: 1 as const,
    bypassPatterns: ["*.bank.test", "literal.example.com"],
    customHosts: [
      { host: "api.internal.test", kind: "custom" as const, label: "Internal LLM" },
    ],
    agentMappings: {
      cursor: [{ source: "gpt-4o", target: "claude-sonnet-4-5" }],
    },
  };
  portability.importConfig(config);
  const exported = portability.exportConfig();

  assert.deepEqual(
    [...exported.bypassPatterns].sort(),
    [...config.bypassPatterns].sort(),
    "bypass patterns must roundtrip"
  );
  assert.ok(
    exported.customHosts.some((h) => h.host === "api.internal.test"),
    "custom host must roundtrip"
  );
  assert.deepEqual(
    exported.agentMappings.cursor,
    config.agentMappings.cursor,
    "agent mappings must roundtrip"
  );
});
