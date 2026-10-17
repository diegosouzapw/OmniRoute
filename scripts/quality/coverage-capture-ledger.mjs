import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

function fail(message) {
  throw new Error(`coverage capture: ${message}`);
}

function readDirectory(directory) {
  return readdirSync(directory, { withFileTypes: true }).map((entry) => {
    if (!entry.isFile() || !entry.name.endsWith(".json")) fail("invalid ledger entry");
    const value = JSON.parse(readFileSync(join(directory, entry.name), "utf8"));
    if (entry.name !== `${value.processId}.json`) fail("ledger filename identity mismatch");
    return value;
  });
}

/** Reconcile independently recorded starts and completions with the planned test entrypoints. */
function readCapture({ directory, expectedEntries, sha, scopeHash, runId, shard, lane }) {
  if (!Array.isArray(expectedEntries) || !expectedEntries.length) fail("empty entrypoint plan");
  const expected = new Set(expectedEntries.map((entry) => resolve(entry)));
  if (expected.size !== expectedEntries.length) fail("duplicate entrypoint plan");
  const starts = readDirectory(join(directory, "started"));
  const finished = readDirectory(join(directory, "receipts"));
  const completions = new Map(finished.map((receipt) => [receipt.processId, receipt]));
  if (completions.size !== finished.length) fail("duplicate completion");
  const seen = new Set();
  for (const start of starts) {
    if (!start.processId || seen.has(start.processId)) fail("invalid or duplicate start");
    seen.add(start.processId);
    const receipt = completions.get(start.processId);
    if (!receipt) fail("missing process completion");
    for (const [key, expectedValue] of Object.entries({
      schemaVersion: 1,
      sha,
      scopeHash,
      runId,
      lane,
      shard,
    }))
      if (start[key] !== expectedValue || receipt[key] !== expectedValue)
        fail("ledger identity mismatch");
    if (receipt.instrumenter !== start.instrumenter) fail("instrumenter mismatch");
    if (receipt.completed !== true || receipt.exitCode !== 0) fail("failed process completion");
    const entries = lane === "node" ? [start.entryFile] : receipt.testFiles;
    if (!Array.isArray(entries) || !entries.length) fail("missing suite entrypoints");
    for (const entry of entries) {
      if (entry === null && lane === "node") continue;
      if (typeof entry !== "string" || !expected.delete(resolve(entry)))
        fail("unexpected or duplicate test entrypoint");
    }
  }
  if (finished.length !== starts.length) fail("completion without a recorded start");
  if (expected.size) fail("missing planned test entrypoint");
  return {
    partition: { lane, shard, processes: starts.map((start) => start.processId).sort() },
    receipts: finished,
    releaseAcceptance: false,
  };
}

export function readNodeCapture(options) {
  return readCapture({ ...options, lane: "node" });
}

export function readVitestCapture(options) {
  if (!["vitest-node", "vitest-ui"].includes(options.lane)) fail("invalid Vitest lane");
  return readCapture(options);
}
