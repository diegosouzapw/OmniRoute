import test from "node:test";
import assert from "node:assert/strict";
import { settleBoundedSyncRequests } from "../../src/lib/providerModels/immediateSyncBatch.ts";

test("#16940: bulk Auto-Sync caps concurrent upstream model-list calls", async () => {
  const active = new Set<string>();
  let peak = 0;
  const started: string[] = [];
  const release = new Map<string, (error?: Error) => void>();
  const run = settleBoundedSyncRequests(["a", "b", "c", "d"], async (id) => {
    active.add(id);
    started.push(id);
    peak = Math.max(peak, active.size);
    await new Promise<void>((resolve, reject) => release.set(id, (error) =>
      error ? reject(error) : resolve()
    )).finally(() => active.delete(id));
  });
  const tick = () => new Promise<void>((resolve) => setImmediate(resolve));
  await tick();
  assert.deepEqual(started, ["a", "b"], "only two network calls begin immediately");
  release.get("a")!();
  await tick();
  assert.deepEqual(started, ["a", "b", "c"]);
  release.get("b")!(new Error("upstream 429"));
  await tick();
  assert.deepEqual(started, ["a", "b", "c", "d"]);
  release.get("c")!();
  release.get("d")!();
  const result = await run;
  assert.equal(peak, 2);
  assert.deepEqual(result.map((row) => row.status), [
    "fulfilled", "rejected", "fulfilled", "fulfilled",
  ]);
});
test("#16940: empty and invalid batches do not trigger any discovery calls", async () => {
  let invoked = 0;
  assert.deepEqual(await settleBoundedSyncRequests([], async () => { invoked++; }), []);
  assert.equal(invoked, 0);
  await assert.rejects(
    settleBoundedSyncRequests(["a"], async () => {}, 0),
    RangeError
  );
});

test("#16940: single-worker sync preserves input order after a failed provider", async () => {
  const visited: string[] = [];
  const results = await settleBoundedSyncRequests(["first", "broken", "last"], async (id) => {
    visited.push(id);
    if (id === "broken") throw new Error("upstream unavailable");
  }, 1);
  assert.deepEqual(visited, ["first", "broken", "last"]);
  assert.deepEqual(results.map((result) => result.status), [
    "fulfilled", "rejected", "fulfilled",
  ]);
});
