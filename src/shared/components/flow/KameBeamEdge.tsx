import { BaseEdge, getBezierPath, type EdgeProps } from "@xyflow/react";

/**
 * "Electric kame beam" edge for the home Provider Topology, adapted to TypeScript +
 * `@xyflow/react` from the 9Router topology (`ProviderTopology.js` `TopologyEdge`).
 *
 * When `data.active` (a live/in-flight request on this router→provider link) the edge
 * renders a multi-layer animated beam: a turbulence-displaced cyan halo, a green plasma
 * mid-layer, a hot white dashed core, plus energy orbs and short-lived sparks travelling
 * the bezier path. At rest it collapses to a flat `BaseEdge` styled by `edgeStyle()` (the
 * idle / last-used / error / healthy states resolved upstream and passed in via `style`),
 * so the graph stays meaningful without the expensive SVG filters running.
 */

// Energy orbs + electric sparks that travel an active edge. Ported from 9Router.
const KAME_PARTICLE_COUNT = 6;
const SPARK_COUNT = 5;

type KameEdgeData = {
  active?: boolean;
};

export function KameBeamEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const active = !!(data as KameEdgeData | undefined)?.active;

  // Idle / last-used / error / healthy: flat stroke resolved by edgeStyle() upstream.
  if (!active) {
    return <BaseEdge id={id} path={edgePath} style={style} />;
  }

  // feTurbulence + feDisplacementMap needs a unique filter id per edge instance,
  // otherwise multiple active edges share (and fight over) one filter node.
  const filterId = `kame-electric-${id}`;

  return (
    <g className="topology-edge-electric">
      <defs>
        <filter id={filterId} x="-40%" y="-40%" width="180%" height="180%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="2"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              values="0.8;1.4;0.8"
              dur="0.25s"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      {/* Outer electric halo */}
      <path
        d={edgePath}
        fill="none"
        stroke="#22d3ee"
        strokeWidth={10}
        strokeOpacity={0.35}
        strokeLinecap="round"
        filter={`url(#${filterId})`}
        className="topology-edge-halo"
      />

      {/* Mid plasma */}
      <path
        d={edgePath}
        fill="none"
        stroke="#4ade80"
        strokeWidth={5}
        strokeOpacity={0.85}
        strokeLinecap="round"
        filter={`url(#${filterId})`}
        className="topology-edge-plasma"
      />

      {/* Hot white core */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={{ stroke: "#f8fafc", strokeWidth: 2.2, opacity: 1 }}
        className="topology-edge-kame"
      />

      {/* Energy orbs */}
      {Array.from({ length: KAME_PARTICLE_COUNT }, (_, i) => (
        <circle
          key={`${id}-p-${i}`}
          r={i % 2 === 0 ? 4 : 2.5}
          fill={i % 3 === 0 ? "#fde047" : i % 3 === 1 ? "#67e8f9" : "#fff"}
          opacity={0.95}
          style={{ filter: "drop-shadow(0 0 4px #22d3ee)" }}
        >
          <animateMotion
            dur={`${0.4 + i * 0.08}s`}
            repeatCount="indefinite"
            path={edgePath}
            begin={`${i * 0.09}s`}
          />
        </circle>
      ))}

      {/* Electric sparks (short-lived blink along path) */}
      {Array.from({ length: SPARK_COUNT }, (_, i) => (
        <circle key={`${id}-s-${i}`} r={1.8} fill="#e0f2fe" opacity={0}>
          <animate
            attributeName="opacity"
            values="0;1;0;0;1;0"
            dur={`${0.35 + (i % 3) * 0.1}s`}
            begin={`${i * 0.07}s`}
            repeatCount="indefinite"
          />
          <animateMotion
            dur={`${0.28 + i * 0.05}s`}
            repeatCount="indefinite"
            path={edgePath}
            begin={`${i * 0.11}s`}
          />
        </circle>
      ))}
    </g>
  );
}

export default KameBeamEdge;
