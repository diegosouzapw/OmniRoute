import test from "node:test";
import assert from "node:assert/strict";
import { tmpdir } from "node:os";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";

const { createNodeSqliteAdapter } = await import("../../src/lib/db/adapters/nodeSqliteAdapter.ts");

const SIGNALS = ["beforeExit", "SIGINT", "SIGTERM"] as const;

function counts(): Record<string, number> {
  return Object.fromEntries(SIGNALS.map((s) => [s, process.listenerCount(s)]));
}

function delta(before: Record<string, number>, after: Record<string, number>) {
  return Object.fromEntries(SIGNALS.map((s) => [s, after[s] - before[s]]));
}

test("closing a node:sqlite adapter releases its process listeners (#13108)", async () => {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-dbleak-"));
  const before = counts();

  try {
    // Short-lived adapters are a real pattern: POST /api/db-backups/import
    // opens one per request purely to validate the uploaded file.
    const N = 12;
    for (let i = 0; i < N; i++) {
      const adapter = await createNodeSqliteAdapter(join(dir, `probe-${i}.sqlite`));
      adapter.close();
    }

    const leaked = delta(before, counts());
    for (const signal of SIGNALS) {
      assert.equal(
        leaked[signal],
        0,
        `${N} open+close cycles retained ${leaked[signal]} "${signal}" listener(s) on process`
      );
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("an open node:sqlite adapter keeps its shutdown listeners registered (#13108)", async () => {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-dbleak-open-"));
  const before = counts();
  let adapter: Awaited<ReturnType<typeof createNodeSqliteAdapter>> | null = null;

  try {
    adapter = await createNodeSqliteAdapter(join(dir, "open.sqlite"));

    // The fix must not detach eagerly: these handlers are what checkpoint the
    // WAL on Ctrl-C, so they have to stay armed for as long as the db is open.
    const armed = delta(before, counts());
    for (const signal of SIGNALS) {
      assert.equal(armed[signal], 1, `an open adapter must keep its "${signal}" handler`);
    }
  } finally {
    adapter?.close();
    rmSync(dir, { recursive: true, force: true });
  }
});
