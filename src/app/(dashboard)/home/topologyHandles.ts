export type TopologyHandles = {
  sourceHandle: "top" | "bottom" | "left" | "right";
  targetHandle: "top" | "bottom" | "left" | "right";
};

const DIRECTION_EPSILON = 1e-12;

/**
 * Pick the router/provider sides that face each other on the topology ellipse.
 *
 * The four diagonal positions belong to the vertical regions. This makes an eight-node
 * ring resolve to three providers above, two beside, and three below the router. Keeping
 * the 45-degree boundaries inclusive also prevents a node from changing its connector
 * side only because the ring happens to contain exactly eight providers.
 */
export function getTopologyHandles(angle: number, cx: number): TopologyHandles {
  const horizontalMagnitude = Math.abs(Math.cos(angle));
  const verticalMagnitude = Math.abs(Math.sin(angle));

  if (verticalMagnitude + DIRECTION_EPSILON >= horizontalMagnitude) {
    return Math.sin(angle) < 0
      ? { sourceHandle: "top", targetHandle: "bottom" }
      : { sourceHandle: "bottom", targetHandle: "top" };
  }

  return cx > 0
    ? { sourceHandle: "right", targetHandle: "left" }
    : { sourceHandle: "left", targetHandle: "right" };
}
