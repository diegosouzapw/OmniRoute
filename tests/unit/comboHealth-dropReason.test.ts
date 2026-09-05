/**
 * Combo health names the reason a provider contributes no usable quota:
 * with zero snapshots the entry carries `no-snapshot` instead of a bare 0%.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-health-drop-"));
const PREV_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");
const comboMetrics = await import("../../open-sse/services/comboMetrics.ts");

describe("comboHealth dropReason", () => {
  it("reports no-snapshot for a provider with zero quota snapshots", async () => {
    comboMetrics.resetAllComboMetrics();
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
    const { buildComboHealthResponse } = await import("../../src/lib/usage/comboHealth.ts");
    const response = (await buildComboHealthResponse({
      range: "1h",
      combos: [
        {
          id: "00000000-0000-1000-8000-000000000001",
          name: "t",
          strategy: "priority",
          models: [{ kind: "model", model: "openai/gpt-4o" }],
        },
      ],
    } as never)) as {
      combos: Array<{ quotaHealth?: { providers?: Array<{ dropReason?: string | null }> } }>;
    };
    assert.ok(
      Array.isArray(response.combos) && response.combos.length > 0,
      "combos passed as input must come back"
    );
    const providers = response.combos[0]!.quotaHealth?.providers ?? [];
    assert.ok(providers.length > 0, "quotaHealth.providers must exist even without snapshots");
    assert.equal(providers[0]!.dropReason, "no-snapshot");
    if (PREV_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = PREV_DATA_DIR;
  });
});
