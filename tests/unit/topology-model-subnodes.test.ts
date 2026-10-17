/**
 * Home Provider Topology — per-model sub-nodes.
 *
 * The topology used to stop at the provider tier even though `activeRequests` already
 * carried `{ provider, model }`. These pure helpers decide which models hang off a
 * provider node (ON / AUTO / OFF) and lay them out radially beyond the provider ring.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  MAX_TOPOLOGY_MODEL_SUBNODES,
  buildModelSubNodes,
  selectTopologyModels,
} from "../../src/app/(dashboard)/home/topologyUtils.ts";

const OPENAI = {
  nodeId: "provider-openai",
  providerId: "openai",
  angle: -Math.PI / 2,
  color: "#10a37f",
};
const ORBIT = { rx: 210, ry: 132 };

test("AUTO mode keeps only the models with a request in flight", () => {
  const models = selectTopologyModels(
    "openai",
    "auto",
    [{ provider: "openai", model: "gpt-4o" }],
    [{ provider: "openai", model: "gpt-4.1" }]
  );
  assert.deepEqual(models, [{ model: "gpt-4o", active: true }]);
});

test("AUTO mode with no in-flight request yields no model", () => {
  assert.deepEqual(
    selectTopologyModels("openai", "auto", [], [{ provider: "openai", model: "gpt-4o" }]),
    []
  );
});

test("OFF mode never yields a model, even while one is active", () => {
  assert.deepEqual(
    selectTopologyModels("openai", "off", [{ provider: "openai", model: "gpt-4o" }], []),
    []
  );
});

test("ON mode adds recently used models, active first, deduped and provider-scoped", () => {
  const models = selectTopologyModels(
    "OpenAI",
    "on",
    [{ provider: "openai", model: "gpt-4o" }],
    [
      { provider: "openai", model: "gpt-4.1" },
      { provider: "openai", model: "GPT-4o" },
      { provider: "anthropic", model: "claude-sonnet-4" },
      { provider: "openai", model: "" },
    ]
  );
  assert.deepEqual(models, [
    { model: "gpt-4o", active: true },
    { model: "gpt-4.1", active: false },
  ]);
});

test("buildModelSubNodes links one active model node to its provider", () => {
  const { nodes, edges } = buildModelSubNodes(
    OPENAI,
    [{ model: "gpt-4o", active: true }],
    ORBIT,
    Math.PI / 2
  );
  assert.equal(nodes.length, 1);
  assert.equal(nodes[0].type, "model");
  assert.equal(nodes[0].id, "model-openai-gpt-4o");
  assert.equal((nodes[0].data as { active: boolean }).active, true);
  assert.equal((nodes[0].data as { label: string }).label, "gpt-4o");
  assert.equal(edges.length, 1);
  assert.equal(edges[0].source, "provider-openai");
  assert.equal(edges[0].target, "model-openai-gpt-4o");
  assert.equal(edges[0].animated, true);
  // The provider sits at the top of the ring, so its model branches further up.
  assert.ok(
    nodes[0].position.y < -ORBIT.ry,
    `expected y < ${-ORBIT.ry}, got ${nodes[0].position.y}`
  );
});

test("buildModelSubNodes with no models adds nothing", () => {
  const { nodes, edges } = buildModelSubNodes(OPENAI, [], ORBIT, Math.PI / 2);
  assert.equal(nodes.length, 0);
  assert.equal(edges.length, 0);
});

test("buildModelSubNodes caps the visible models and folds the rest into a +N node", () => {
  const many = Array.from({ length: MAX_TOPOLOGY_MODEL_SUBNODES + 3 }, (_, i) => ({
    model: `m-${i}`,
    active: i === 0,
  }));
  const { nodes, edges } = buildModelSubNodes(OPENAI, many, ORBIT, Math.PI / 2);
  assert.equal(nodes.length, MAX_TOPOLOGY_MODEL_SUBNODES + 1);
  assert.equal(edges.length, MAX_TOPOLOGY_MODEL_SUBNODES + 1);
  const overflow = nodes[nodes.length - 1];
  assert.equal(overflow.id, "model-openai-__more");
  assert.equal((overflow.data as { label: string }).label, "+3");
  assert.equal((overflow.data as { active: boolean }).active, false);
  // Every sub-node id is unique, so ReactFlow never collapses two models into one.
  assert.equal(new Set(nodes.map((n) => n.id)).size, nodes.length);
});
