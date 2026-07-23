// Characterization of emitOutputStyleTelemetry — the output-style run-telemetry hook extracted from
// handleChatCore's request-setup compression path (chatCore god-file decomposition, #3501).
// Fire-and-forget; uses a real temp DB and polls compression_run_telemetry. Locks: the null guard
// (no-op), and that an applied output-style result records a run-telemetry row with the resolved
// request id / model / provider / source.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-os-telemetry-test-"));
process.env.DATA_DIR = testDataDir;

const coreDb = await import("../../src/lib/db/core.ts");
const { emitOutputStyleTelemetry } = await import(
  "../../open-sse/handlers/chatCore/outputStyleTelemetry.ts"
);

function rowFor(requestId: string): Record<string, unknown> | undefined {
  try {
    return coreDb
      .getDbInstance()
      .prepare(
        "SELECT request_id, model, provider, source FROM compression_run_telemetry WHERE request_id = ?"
      )
      .get(requestId) as Record<string, unknown> | undefined;
  } catch {
    // table is created lazily by the first fire-and-forget insert; treat "no such table" as "no row"
    return undefined;
  }
}

async function waitForRow(requestId: string, timeoutMs = 3000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (rowFor(requestId)) break;
    await new Promise((r) => setTimeout(r, 25));
  }
  return rowFor(requestId);
}

before(async () => {
  await coreDb.ensureDbInitialized();
});

after(() => {
  coreDb.resetDbInstance();
  try {
    fs.rmSync(testDataDir, { recursive: true, force: true });
  } catch {
    // best-effort cleanup
  }
});

test("null outputStyleResult is a no-op (returns synchronously, no throw)", async () => {
  assert.doesNotThrow(() =>
    emitOutputStyleTelemetry({
      outputStyleResult: null,
      skillRequestId: "os-noop",
      traceId: "t",
      effectiveModel: "gpt-x",
      provider: "openai",
      compressionComboId: null,
      estimatedTokens: 100,
    })
  );
  await new Promise((r) => setTimeout(r, 80));
  assert.equal(rowFor("os-noop"), undefined);
});

test("applied output-style result records a run-telemetry row (source=active-profile when combo id set)", async () => {
  emitOutputStyleTelemetry({
    outputStyleResult: { body: {} as never, applied: true, appliedStyles: [], skippedReason: undefined },
    skillRequestId: "os-req-1",
    traceId: "trace-1",
    effectiveModel: "gpt-os",
    provider: "openai",
    compressionComboId: "combo-9",
    estimatedTokens: 250,
  });
  const row = await waitForRow("os-req-1");
  assert.ok(row, "expected a compression_run_telemetry row");
  assert.equal(row!.model, "gpt-os");
  assert.equal(row!.provider, "openai");
  assert.equal(row!.source, "active-profile");
});

test("falls back to traceId for request id and source=default without a combo id", async () => {
  emitOutputStyleTelemetry({
    outputStyleResult: { body: {} as never, applied: true, appliedStyles: [] },
    skillRequestId: null,
    traceId: "os-trace-2",
    effectiveModel: "gpt-x",
    provider: "anthropic",
    compressionComboId: null,
    estimatedTokens: 10,
  });
  const row = await waitForRow("os-trace-2");
  assert.ok(row, "expected the row keyed by the traceId fallback");
  assert.equal(row!.source, "default");
});
