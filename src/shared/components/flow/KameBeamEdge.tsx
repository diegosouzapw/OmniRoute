import { useCallback, useSyncExternalStore } from "react";
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

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * The travelling orbs/sparks and the turbulence wobble are SMIL animations
 * (`<animate>` / `<animateMotion>`), which a CSS `animation: none` cannot pause — so
 * honouring `prefers-reduced-motion` has to happen here, by not rendering them at all.
 * The beam's static layers (halo / plasma / core) still draw, so an active link stays
 * just as visible; only the movement is dropped. The CSS-driven half of the effect is
 * disabled by the matching @media block in globals.css.
 *
 * Read through `useSyncExternalStore` rather than a `useState` + `useEffect` pair: the
 * media query IS an external store, and seeding state from inside an effect is a
 * synchronous setState in an effect (react-hooks/set-state-in-effect) that costs an extra
 * render pass on every mounted edge. The server snapshot is `false` so SSR and first paint
 * agree (no hydration mismatch); the client snapshot resolves immediately and the
 * subscription follows later changes to the OS setting. Same pattern as `useTheme` /
 * `useElectron`.
 */
function subscribeToReducedMotion(onChange: () => void): () => void {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return () => {};
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion(): boolean {
  const getSnapshot = useCallback(
    () =>
      typeof window !== "undefined" && typeof window.matchMedia === "function"
        ? window.matchMedia(REDUCED_MOTION_QUERY).matches
        : false,
    []
  );
  return useSyncExternalStore(subscribeToReducedMotion, getSnapshot, () => false);
}

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
  const reducedMotion = usePrefersReducedMotion();

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
            {!reducedMotion && (
              <animate
                attributeName="baseFrequency"
                values="0.8;1.4;0.8"
                dur="0.25s"
                repeatCount="indefinite"
              />
            )}
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

      {/* Energy orbs — pure motion, so they are dropped entirely under reduced motion. */}
      {!reducedMotion &&
        Array.from({ length: KAME_PARTICLE_COUNT }, (_, i) => (
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

      {/* Electric sparks (short-lived blink along path) — also motion-only. */}
      {!reducedMotion &&
        Array.from({ length: SPARK_COUNT }, (_, i) => (
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
