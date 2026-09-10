/** Run: node --import tsx/esm --test tests/unit/ui/orchestrationToFlow.test.ts */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { orchestrationToFlow } from "../../../src/app/(dashboard)/dashboard/orchestration/model/orchestrationToFlow.ts";
import type { OrchSnapshot } from "../../../src/app/(dashboard)/dashboard/orchestration/model/orchestrationTypes.ts";

const snap: OrchSnapshot = {
  nodes: [
    { id: "orchestrator", kind: "orchestrator", label: "OmniRoute" },
    { id: "source:a2a", kind: "source", source: "a2a", label: "A2A" },
    { id: "a2a:t1", kind: "work", source: "a2a", state: "running", label: "smart-routing" },
    { id: "a2a:t2", kind: "work", source: "a2a", state: "failed", label: "cost-analysis" },
  ],
  edges: [
    { id: "e1", from: "orchestrator", to: "source:a2a", kind: "owns", active: false },
    { id: "e2", from: "source:a2a", to: "a2a:t1", kind: "owns", active: true },
    { id: "e3", from: "source:a2a", to: "a2a:t2", kind: "owns", active: false },
  ],
  sources: [],
  generatedAt: "2026-08-30T12:00:00Z",
};

const multiSourceSnap: OrchSnapshot = {
  nodes: [
    { id: "orchestrator", kind: "orchestrator", label: "OmniRoute" },
    { id: "source:a2a", kind: "source", source: "a2a", label: "A2A" },
    { id: "a2a:t1", kind: "work", source: "a2a", state: "running", label: "smart-routing" },
    {
      id: "a2a:t1:activity",
      kind: "activity",
      source: "a2a",
      state: "running",
      label: "thinking",
    },
    { id: "source:cloud-agent", kind: "source", source: "cloud-agent", label: "Cloud Agent" },
    {
      id: "cloud-agent:t1",
      kind: "work",
      source: "cloud-agent",
      state: "queued",
      label: "build",
    },
  ],
  edges: [
    { id: "e1", from: "orchestrator", to: "source:a2a", kind: "owns", active: false },
    { id: "e2", from: "source:a2a", to: "a2a:t1", kind: "owns", active: true },
    { id: "e3", from: "a2a:t1", to: "a2a:t1:activity", kind: "owns", active: true },
    { id: "e4", from: "orchestrator", to: "source:cloud-agent", kind: "owns", active: false },
    { id: "e5", from: "source:cloud-agent", to: "cloud-agent:t1", kind: "owns", active: false },
  ],
  sources: [],
  generatedAt: "2026-08-30T12:00:00Z",
};

describe("orchestrationToFlow", () => {
  it("puts each kind on its own Y layer and is deterministic", () => {
    const a = orchestrationToFlow(snap);
    const b = orchestrationToFlow(snap);
    assert.deepEqual(
      a.nodes.map((n) => n.position),
      b.nodes.map((n) => n.position)
    );
    const ys = new Map(a.nodes.map((n) => [n.id, n.position.y]));
    assert.equal(ys.get("orchestrator"), 0);
    assert.equal(ys.get("source:a2a"), 150);
    assert.equal(ys.get("a2a:t1"), 320);
  });
  it('edges carry type "status" and data.{state,active,mirror}; no animated/style leak', () => {
    const { edges } = orchestrationToFlow(snap);
    const activeEdge = edges.find((e) => e.id === "e2");
    assert.equal(activeEdge?.type, "status");
    assert.deepEqual(activeEdge?.data, { state: "running", active: true, mirror: false });
    assert.equal((activeEdge as { animated?: boolean }).animated, undefined);
    assert.equal((activeEdge as { style?: unknown }).style, undefined);

    const edgeToFailed = edges.find((e) => e.id === "e3");
    assert.equal(edgeToFailed?.type, "status");
    assert.deepEqual(edgeToFailed?.data, { state: "failed", active: false, mirror: false });
  });
  it("mirror edges carry data.mirror === true", () => {
    const mirrorSnap: OrchSnapshot = {
      ...snap,
      edges: [
        ...snap.edges,
        { id: "e4", from: "a2a:t1", to: "source:a2a", kind: "mirror", active: false },
      ],
    };
    const { edges } = orchestrationToFlow(mirrorSnap);
    const mirrorEdge = edges.find((e) => e.id === "e4");
    assert.equal(mirrorEdge?.type, "status");
    assert.equal((mirrorEdge?.data as { mirror?: boolean })?.mirror, true);
    const ownsEdge = edges.find((e) => e.id === "e2");
    assert.equal((ownsEdge?.data as { mirror?: boolean })?.mirror, false);
  });
  it("fitKey only tracks the set of work ids", () => {
    const k1 = orchestrationToFlow(snap).fitKey;
    const stateChanged = {
      ...snap,
      nodes: snap.nodes.map((n) => (n.id === "a2a:t1" ? { ...n, state: "succeeded" as const } : n)),
    };
    assert.equal(orchestrationToFlow(stateChanged).fitKey, k1);
    const nodeRemoved = {
      ...snap,
      nodes: snap.nodes.filter((n) => n.id !== "a2a:t2"),
      edges: snap.edges.filter((e) => e.to !== "a2a:t2"),
    };
    assert.notEqual(orchestrationToFlow(nodeRemoved).fitKey, k1);
  });

  it("opts omitted preserves current behavior (all nodes/edges kept, no collapsed data)", () => {
    const { nodes, edges, fitKey } = orchestrationToFlow(multiSourceSnap);
    assert.equal(nodes.length, multiSourceSnap.nodes.length);
    assert.equal(edges.length, multiSourceSnap.edges.length);
    assert.ok(!fitKey.includes("::collapsed="));
    const sourceA2a = nodes.find((n) => n.id === "source:a2a");
    assert.equal((sourceA2a?.data as { collapsed?: boolean }).collapsed, undefined);
  });

  it("collapsing a source removes its work/activity nodes and their edges, keeps other sources", () => {
    const { nodes, edges } = orchestrationToFlow(multiSourceSnap, {
      collapsed: new Set(["a2a"]),
    });
    const ids = nodes.map((n) => n.id).sort();
    assert.deepEqual(ids, ["cloud-agent:t1", "orchestrator", "source:a2a", "source:cloud-agent"]);
    const edgeIds = edges.map((e) => e.id).sort();
    assert.deepEqual(edgeIds, ["e1", "e4", "e5"]);
  });

  it("SourceNode for a collapsed source carries data.collapsed === true; others do not", () => {
    const { nodes } = orchestrationToFlow(multiSourceSnap, { collapsed: new Set(["a2a"]) });
    const sourceA2a = nodes.find((n) => n.id === "source:a2a");
    const sourceCloudAgent = nodes.find((n) => n.id === "source:cloud-agent");
    assert.equal((sourceA2a?.data as { collapsed?: boolean }).collapsed, true);
    assert.equal((sourceCloudAgent?.data as { collapsed?: boolean }).collapsed, undefined);
  });

  it("fitKey changes when the collapsed set changes and is stable otherwise", () => {
    const base = orchestrationToFlow(multiSourceSnap).fitKey;
    const k1 = orchestrationToFlow(multiSourceSnap, { collapsed: new Set(["a2a"]) }).fitKey;
    const k1Again = orchestrationToFlow(multiSourceSnap, { collapsed: new Set(["a2a"]) }).fitKey;
    const k2 = orchestrationToFlow(multiSourceSnap, {
      collapsed: new Set(["cloud-agent"]),
    }).fitKey;
    assert.equal(k1, k1Again);
    assert.notEqual(k1, base);
    assert.notEqual(k1, k2);
  });
});
