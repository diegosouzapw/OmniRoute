/**
 * Custom particle-stream edge for the Orchestration Canvas — replaces xyflow's built-in
 * `animated: true` marching-ants (perf cost at scale, see
 * .agents/skills/flow-studio/references/animated-edges.md §1) with the §3 "particle stream"
 * recipe: staggered SMIL `<ellipse>` shapes traveling the edge's own bezier path. Two hard
 * rules from that recipe (both real defects, kept verbatim): the opacity gate (`opacity="0"`
 * + a paired `<set>`) prevents a parked particle flashing at the SVG origin before its
 * `begin` fires, and clock offsets must be plain seconds — `begin="id.begin"` syncbase
 * references silently never fire once mounted inside React.
 */
"use client";
import { memo } from "react";
import { BaseEdge, getBezierPath, type EdgeProps } from "@xyflow/react";
import { orchStateColor, type OrchState } from "../model/orchestrationTypes";

interface StatusEdgeData {
  state?: OrchState;
  active?: boolean;
  mirror?: boolean;
}

/** Mesma precedência do edgeStyle da v1: failed > active > succeeded > idle. */
function strokeFor(d: StatusEdgeData): { stroke: string; strokeWidth: number; opacity: number } {
  if (d.state === "failed")
    return { stroke: orchStateColor("failed"), strokeWidth: 2, opacity: 0.85 };
  if (d.active) return { stroke: orchStateColor("succeeded"), strokeWidth: 2.5, opacity: 1 };
  if (d.state === "succeeded")
    return { stroke: orchStateColor("succeeded"), strokeWidth: 1.5, opacity: 0.4 };
  return { stroke: "var(--color-text-muted)", strokeWidth: 1, opacity: 0.3 };
}

const PARTICLES = 3;
const DUR = 2.4;

function StatusEdgeImpl(props: EdgeProps) {
  const { id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props;
  const data = (props.data ?? {}) as StatusEdgeData;
  const [path] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const s = strokeFor(data);
  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        style={{ ...s, ...(data.mirror ? { strokeDasharray: "6 4" } : {}) }}
      />
      {data.active &&
        Array.from({ length: PARTICLES }, (_, i) => (
          <ellipse
            key={i}
            className="orch-edge-particle"
            rx="3.4"
            ry="2.2"
            fill={s.stroke}
            opacity="0"
          >
            <animateMotion
              dur={`${DUR}s`}
              begin={`${(i * DUR) / PARTICLES}s`}
              repeatCount="indefinite"
              path={path}
              rotate="auto"
              calcMode="spline"
              keyPoints="0;1"
              keyTimes="0;1"
              keySplines="0.4 0 0.6 1"
            />
            <set attributeName="opacity" to="1" begin={`${(i * DUR) / PARTICLES}s`} fill="freeze" />
          </ellipse>
        ))}
    </>
  );
}

export const StatusEdge = memo(StatusEdgeImpl);
StatusEdge.displayName = "StatusEdge";
