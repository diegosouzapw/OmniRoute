/**
 * Task B3 (Orchestration Canvas Fase 2): `getFleetSnapshot` mirrors Conductor fleet task
 * transitions into the `agents` WS channel by diffing each snapshot against a module-level
 * cache of the last known status per task — no new poller, piggybacking on the existing
 * dashboard poll that already calls `getFleetSnapshot`. Covers:
 *   - first-ever snapshot seeds the cache and emits nothing (avoids a duplicate burst — the
 *     dashboard already fetches the full snapshot on its initial poll)
 *   - a snapshot with one task's status changed emits exactly one `agent.task.updated`
 *   - an identical snapshot emits nothing
 *   - an offline snapshot between two successful ones does NOT clear the cache, so the next
 *     successful snapshot only emits the real delta (not a re-seed burst)
 */
import test from "node:test";
import assert from "node:assert/strict";

import { getFleetSnapshot, __resetFleetMirrorForTests } from "../../src/lib/conductor/hubProxy.ts";
import { on } from "../../src/lib/events/eventBus.ts";
import type { AgentTaskUpdatedPayload } from "../../src/lib/events/types.ts";

function hubTask(id: string, status: string) {
  return {
    id,
    status,
    mode: "solo",
    repo: { url: "https://git.x/repo", base_ref: "main" },
    spec: { prompt: "faz algo" },
    assigned_runner: null,
    manifest: null,
    council: null,
    created_at: "2026-07-22T00:00:00Z",
    updated_at: "2026-07-22T00:00:00Z",
  };
}

function fakeHub(routes: Record<string, { status: number; body: unknown }>) {
  const impl = (async (url: string | URL | Request) => {
    const u = String(url);
    const hit = Object.entries(routes).find(([path]) => u.includes(path));
    if (!hit) return new Response("{}", { status: 404 });
    return new Response(JSON.stringify(hit[1].body), { status: hit[1].status });
  }) as typeof fetch;
  return impl;
}

function snapshotWith(tasks: ReturnType<typeof hubTask>[]) {
  return fakeHub({
    "/v1/runners": { status: 200, body: [] },
    "/v1/tasks": { status: 200, body: tasks },
  });
}

const offlineFetch = (async () => {
  throw new Error("ECONNREFUSED");
}) as unknown as typeof fetch;

test.beforeEach(() => {
  process.env.CONDUCTOR_HUB_URL = "http://hub.test:7910";
  process.env.CONDUCTOR_HUB_TOKEN = "tok-secreto";
  __resetFleetMirrorForTests();
});

test.after(() => {
  delete process.env.CONDUCTOR_HUB_URL;
  delete process.env.CONDUCTOR_HUB_TOKEN;
  __resetFleetMirrorForTests();
});

test("fleet mirror: 1a foto semeia o cache sem emitir nada", async () => {
  const events: AgentTaskUpdatedPayload[] = [];
  const unsubscribe = on("agent.task.updated", (payload) => events.push(payload));
  try {
    const snap = await getFleetSnapshot({
      fetchImpl: snapshotWith([hubTask("t_1", "working"), hubTask("t_2", "queued")]),
    });
    assert.equal(snap.offline, false);
    assert.equal(events.length, 0, "primeira foto (cache null) só semeia, não emite");
  } finally {
    unsubscribe();
  }
});

test("fleet mirror: status mudado emite exatamente 1 evento agent.task.updated", async () => {
  await getFleetSnapshot({
    fetchImpl: snapshotWith([hubTask("t_1", "working"), hubTask("t_2", "queued")]),
  });

  const events: AgentTaskUpdatedPayload[] = [];
  const unsubscribe = on("agent.task.updated", (payload) => events.push(payload));
  try {
    await getFleetSnapshot({
      fetchImpl: snapshotWith([hubTask("t_1", "completed"), hubTask("t_2", "queued")]),
    });
    assert.equal(events.length, 1);
    assert.deepEqual(events[0], {
      source: "conductor",
      taskId: "t_1",
      state: "completed",
      timestamp: events[0].timestamp,
    });
    assert.equal(typeof events[0].timestamp, "number");
  } finally {
    unsubscribe();
  }
});

test("fleet mirror: foto idêntica à anterior não emite nada", async () => {
  await getFleetSnapshot({
    fetchImpl: snapshotWith([hubTask("t_1", "working"), hubTask("t_2", "queued")]),
  });
  await getFleetSnapshot({
    fetchImpl: snapshotWith([hubTask("t_1", "completed"), hubTask("t_2", "queued")]),
  });

  const events: AgentTaskUpdatedPayload[] = [];
  const unsubscribe = on("agent.task.updated", (payload) => events.push(payload));
  try {
    await getFleetSnapshot({
      fetchImpl: snapshotWith([hubTask("t_1", "completed"), hubTask("t_2", "queued")]),
    });
    assert.equal(events.length, 0);
  } finally {
    unsubscribe();
  }
});

test("fleet mirror: foto offline entre duas fotos não zera o cache — próxima foto só emite o delta real", async () => {
  // Seed.
  await getFleetSnapshot({
    fetchImpl: snapshotWith([hubTask("t_1", "working"), hubTask("t_2", "queued")]),
  });
  // Establish a known baseline (t_1 -> completed).
  await getFleetSnapshot({
    fetchImpl: snapshotWith([hubTask("t_1", "completed"), hubTask("t_2", "queued")]),
  });

  // Hub flaps offline in between — must not clear the cache.
  const offlineSnap = await getFleetSnapshot({ fetchImpl: offlineFetch });
  assert.deepEqual(offlineSnap, { offline: true, runners: [], tasks: [] });

  const events: AgentTaskUpdatedPayload[] = [];
  const unsubscribe = on("agent.task.updated", (payload) => events.push(payload));
  try {
    // Back online: only t_2 actually changed since the last successful snapshot (t_1 unchanged).
    await getFleetSnapshot({
      fetchImpl: snapshotWith([hubTask("t_1", "completed"), hubTask("t_2", "completed")]),
    });
    assert.equal(events.length, 1, "só o delta real (t_2) deve emitir, não um re-seed de tudo");
    assert.equal(events[0].taskId, "t_2");
    assert.equal(events[0].state, "completed");
    assert.equal(events[0].source, "conductor");
  } finally {
    unsubscribe();
  }
});
