/**
 * tests/unit/ui/orchestrationFilter.test.ts
 * Run: node --import tsx/esm --test tests/unit/ui/orchestrationFilter.test.ts
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  EMPTY_FILTER,
  filterSnapshot,
  isEmptyFilter,
  nodeProviderKey,
  collectProviderKeys,
  type OrchFilter,
} from "../../../src/app/(dashboard)/dashboard/orchestration/model/filterSnapshot.ts";
import type {
  OrchNode,
  OrchSnapshot,
} from "../../../src/app/(dashboard)/dashboard/orchestration/model/orchestrationTypes.ts";

function filterWith(over: Partial<OrchFilter>): OrchFilter {
  return { ...EMPTY_FILTER, ...over };
}

// Fixture: orchestrator + 3 sources + works:
//   cloud-agent:1 (label "fix login bug", sublabel "jules", raw {providerId:"jules"}, running)
//     + cloud-agent:1:activity (activity follows its parent work node)
//   a2a:2 (label "smart-routing", state succeeded, raw {})
//   conductor:task:3 (label "deploy", raw {runner:"vm-9"}, state failed)
//   overflow:cloud-agent (always survives; counts/droppedByState must stay untouched)
const caNode: OrchNode = {
  id: "cloud-agent:1",
  kind: "work",
  source: "cloud-agent",
  state: "running",
  label: "fix login bug",
  sublabel: "jules",
  raw: { providerId: "jules" },
};
const caActivity: OrchNode = {
  id: "cloud-agent:1:activity",
  kind: "activity",
  source: "cloud-agent",
  label: "npm test",
};
const a2aNode: OrchNode = {
  id: "a2a:2",
  kind: "work",
  source: "a2a",
  state: "succeeded",
  label: "smart-routing",
  raw: {},
};
const condNode: OrchNode = {
  id: "conductor:task:3",
  kind: "work",
  source: "conductor",
  state: "failed",
  label: "deploy",
  raw: { runner: "vm-9" },
};
const overflowCounts = { failed: 3 };
const overflowNode: OrchNode = {
  id: "overflow:cloud-agent",
  kind: "overflow",
  source: "cloud-agent",
  label: "+3 more",
  counts: overflowCounts,
  droppedByState: overflowCounts,
};
const sourceCloudAgent: OrchNode = {
  id: "source:cloud-agent",
  kind: "source",
  source: "cloud-agent",
  label: "cloud-agent",
  counts: { running: 1 },
};
const sourceA2A: OrchNode = {
  id: "source:a2a",
  kind: "source",
  source: "a2a",
  label: "a2a",
  counts: { succeeded: 1 },
};
const sourceConductor: OrchNode = {
  id: "source:conductor",
  kind: "source",
  source: "conductor",
  label: "conductor",
  counts: { failed: 1 },
};
const orchestratorNode: OrchNode = { id: "orchestrator", kind: "orchestrator", label: "OmniRoute" };

const snap: OrchSnapshot = {
  nodes: [
    orchestratorNode,
    sourceCloudAgent,
    sourceA2A,
    sourceConductor,
    caNode,
    caActivity,
    a2aNode,
    condNode,
    overflowNode,
  ],
  edges: [
    {
      id: "e:orchestrator→source:cloud-agent",
      from: "orchestrator",
      to: "source:cloud-agent",
      kind: "owns",
      active: false,
    },
    {
      id: "e:orchestrator→source:a2a",
      from: "orchestrator",
      to: "source:a2a",
      kind: "owns",
      active: false,
    },
    {
      id: "e:orchestrator→source:conductor",
      from: "orchestrator",
      to: "source:conductor",
      kind: "owns",
      active: false,
    },
    {
      id: "e:source:cloud-agent→cloud-agent:1",
      from: "source:cloud-agent",
      to: "cloud-agent:1",
      kind: "owns",
      active: true,
    },
    {
      id: "e:cloud-agent:1→cloud-agent:1:activity",
      from: "cloud-agent:1",
      to: "cloud-agent:1:activity",
      kind: "owns",
      active: true,
    },
    {
      id: "e:source:a2a→a2a:2",
      from: "source:a2a",
      to: "a2a:2",
      kind: "owns",
      active: false,
    },
    {
      id: "e:source:conductor→conductor:task:3",
      from: "source:conductor",
      to: "conductor:task:3",
      kind: "owns",
      active: false,
    },
    {
      id: "e:source:cloud-agent→overflow:cloud-agent",
      from: "source:cloud-agent",
      to: "overflow:cloud-agent",
      kind: "owns",
      active: false,
    },
  ],
  sources: [
    { source: "cloud-agent", ok: true },
    { source: "a2a", ok: true },
    { source: "conductor", ok: true },
  ],
  generatedAt: "2026-09-01T00:00:00Z",
};

test("empty filter returns the same reference", () => {
  assert.equal(filterSnapshot(snap, EMPTY_FILTER), snap);
  assert.equal(isEmptyFilter(EMPTY_FILTER), true);
});

test("q matches label case-insensitively and drops non-matching works + their activities", () => {
  const out = filterSnapshot(snap, filterWith({ q: "SMART" }));
  const ids = out.nodes.map((n) => n.id);
  assert.ok(ids.includes("a2a:2"));
  assert.ok(!ids.includes("cloud-agent:1"), "non-matching work dropped");
  assert.ok(!ids.includes("cloud-agent:1:activity"), "its activity is dropped along with it");
  assert.ok(!ids.includes("conductor:task:3"), "non-matching work dropped");
});

test("q matching a work keeps its activity node and the edges between them", () => {
  const out = filterSnapshot(snap, filterWith({ q: "login" }));
  const ids = out.nodes.map((n) => n.id);
  assert.ok(ids.includes("cloud-agent:1"));
  assert.ok(ids.includes("cloud-agent:1:activity"));
  assert.ok(
    out.edges.some((e) => e.from === "cloud-agent:1" && e.to === "cloud-agent:1:activity")
  );
});

test("state chip keeps only matching works", () => {
  const out = filterSnapshot(snap, filterWith({ states: new Set(["failed"]) }));
  const works = out.nodes.filter((n) => n.kind === "work").map((n) => n.id);
  assert.deepEqual(works, ["conductor:task:3"]);
  assert.ok(!out.nodes.some((n) => n.id === "cloud-agent:1:activity"));
});

test("source chip keeps only matching works", () => {
  const out = filterSnapshot(snap, filterWith({ sources: new Set(["a2a"]) }));
  const works = out.nodes.filter((n) => n.kind === "work").map((n) => n.id);
  assert.deepEqual(works, ["a2a:2"]);
});

test("provider chip matches nodeProviderKey", () => {
  assert.equal(nodeProviderKey(caNode), "jules");
  assert.equal(nodeProviderKey(a2aNode), null);
  assert.equal(nodeProviderKey(condNode), "vm-9");

  const out = filterSnapshot(snap, filterWith({ providers: new Set(["jules"]) }));
  const works = out.nodes.filter((n) => n.kind === "work").map((n) => n.id);
  assert.deepEqual(works, ["cloud-agent:1"]);
});

test("dimensions AND together", () => {
  // "deploy" matches conductor:task:3's label, but that node is state "failed" — asking
  // for state "running" too must yield no work survivors even though q alone would match.
  const out = filterSnapshot(snap, filterWith({ q: "deploy", states: new Set(["running"]) }));
  assert.equal(out.nodes.filter((n) => n.kind === "work").length, 0);
});

test("source/orchestrator/overflow nodes always survive; counts untouched", () => {
  // A query that matches nothing at all — every work node is dropped.
  const out = filterSnapshot(snap, filterWith({ q: "nothing-matches-this" }));
  assert.equal(out.nodes.filter((n) => n.kind === "work").length, 0);

  assert.ok(out.nodes.some((n) => n.id === "orchestrator"));
  const sources = out.nodes.filter((n) => n.kind === "source");
  assert.equal(sources.length, 3);
  const survivedSourceCloudAgent = out.nodes.find((n) => n.id === "source:cloud-agent");
  assert.equal(survivedSourceCloudAgent?.counts, sourceCloudAgent.counts);

  const survivedOverflow = out.nodes.find((n) => n.id === "overflow:cloud-agent");
  assert.ok(survivedOverflow, "overflow node must survive even with zero matching works");
  assert.equal(survivedOverflow?.counts, overflowNode.counts);
  assert.equal(survivedOverflow?.droppedByState, overflowNode.droppedByState);
});

test("collectProviderKeys returns sorted distinct non-null keys", () => {
  assert.deepEqual(collectProviderKeys(snap), ["jules", "vm-9"]);
});
