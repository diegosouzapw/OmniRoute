import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const tmpDir = mkdtempSync(join(tmpdir(), "omniroute-rt-"));
process.env.DATA_DIR = tmpDir;

const core = await import("../../../src/lib/db/core.ts");
core.resetDbInstance();
const {
  insertCompressionRunTelemetryRow,
  getCompressionRunTelemetrySummary,
} = await import("../../../src/lib/db/compressionRunTelemetry.ts");
const { getDbInstance } = core;

describe("compressionRunTelemetry", () => {
  beforeEach(() => {
    const db = getDbInstance();
    db.exec("DROP TABLE IF EXISTS compression_run_telemetry");
  });

  it("persists a run record and summarizes savings + applied styles", () => {
    insertCompressionRunTelemetryRow({
      requestId: "req-1",
      model: "gpt-4o",
      provider: "openai",
      source: "active-profile",
      tokensBefore: 1000,
      tokensAfter: 700,
      ratio: 0.7,
      outputStyles: [{ id: "terse-prose", level: "full" }],
      outputTokens: 320,
    });
    insertCompressionRunTelemetryRow({
      requestId: "req-2",
      model: "gpt-4o",
      provider: "openai",
      source: "default",
      tokensBefore: 500,
      tokensAfter: 500,
      ratio: 1,
      outputStyleBypass: "security_warning",
    });

    const summary = getCompressionRunTelemetrySummary();
    assert.equal(summary.totalRuns, 2);
    assert.equal(summary.totalTokensSaved, 300); // (1000-700) + (500-500)
    assert.equal(summary.runsWithStyles, 1);
    assert.equal(summary.bypassCount, 1);
    assert.deepEqual(summary.appliedStyleCounts, { "terse-prose": 1 });
  });

  it("never throws on a malformed row; outputStyles is optional", () => {
    assert.doesNotThrow(() =>
      insertCompressionRunTelemetryRow({
        requestId: "req-3",
        model: "m",
        provider: "p",
        source: "off",
        tokensBefore: 0,
        tokensAfter: 0,
        ratio: 0,
      })
    );
    assert.equal(getCompressionRunTelemetrySummary().totalRuns, 1);
  });
});
