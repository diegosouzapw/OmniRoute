import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { getTopologyHandles } from "../../src/app/(dashboard)/home/topologyHandles.ts";

const read = (rel: string) => readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");

test("an eight-provider ring uses three top, two side, and three bottom connectors", () => {
  const count = 8;
  const actual = Array.from({ length: count }, (_, index) => {
    const angle = -Math.PI / 2 + (2 * Math.PI * index) / count;
    return getTopologyHandles(angle, Math.cos(angle));
  });

  assert.deepEqual(
    actual,
    [
      { sourceHandle: "top", targetHandle: "bottom" },
      { sourceHandle: "top", targetHandle: "bottom" },
      { sourceHandle: "right", targetHandle: "left" },
      { sourceHandle: "bottom", targetHandle: "top" },
      { sourceHandle: "bottom", targetHandle: "top" },
      { sourceHandle: "bottom", targetHandle: "top" },
      { sourceHandle: "left", targetHandle: "right" },
      { sourceHandle: "top", targetHandle: "bottom" },
    ],
    "the four 45-degree boundary nodes must stay in the upper/lower regions"
  );
});

test("horizontal providers still connect through their inward-facing side", () => {
  assert.deepEqual(getTopologyHandles(0, 1), {
    sourceHandle: "right",
    targetHandle: "left",
  });
  assert.deepEqual(getTopologyHandles(Math.PI, -1), {
    sourceHandle: "left",
    targetHandle: "right",
  });
});

test("topology handles override React Flow's minimum box without Tailwind utilities", () => {
  const providerTopologySrc = read("../../src/app/(dashboard)/home/ProviderTopology.tsx");
  const globalsCss = read("../../src/app/globals.css");
  const handleUses = providerTopologySrc.match(/className="topology-connector-handle"/g) ?? [];
  const rule = globalsCss.match(
    /\.react-flow\.omniroute-flow \.topology-connector-handle\s*\{([^}]*)\}/
  );

  assert.equal(handleUses.length, 8, "all provider and router handles must use the scoped class");
  assert.ok(rule, "the scoped connector-handle rule must exist");

  for (const declaration of [
    "width: 0",
    "height: 0",
    "min-width: 0",
    "min-height: 0",
    "border: 0",
    "background: transparent",
  ]) {
    assert.ok(rule[1].includes(declaration), `connector handle must declare ${declaration}`);
  }
});
