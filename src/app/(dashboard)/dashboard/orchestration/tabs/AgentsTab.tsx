"use client";
import { useMemo } from "react";
import type { NodeTypes, EdgeTypes, NodeMouseHandler } from "@xyflow/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { FlowCanvas } from "@/shared/components/flow/FlowCanvas";
import { orchestrationToFlow } from "../model/orchestrationToFlow";
import { EMPTY_FILTER, isEmptyFilter } from "../model/filterSnapshot";
import type { OrchFilter } from "../model/filterSnapshot";
import type { OrchNode, OrchSnapshot, OrchSource } from "../model/orchestrationTypes";
import { OrchestratorNode } from "../nodes/OrchestratorNode";
import { SourceNode } from "../nodes/SourceNode";
import { WorkNode } from "../nodes/WorkNode";
import { ActivityNode } from "../nodes/ActivityNode";
import { OverflowNode } from "../nodes/OverflowNode";
import { StatusEdge } from "../edges/StatusEdge";

const NODE_TYPES: NodeTypes = {
  orchestrator: OrchestratorNode as never,
  source: SourceNode as never,
  work: WorkNode as never,
  activity: ActivityNode as never,
  overflow: OverflowNode as never,
};
const EDGE_TYPES: EdgeTypes = { status: StatusEdge as never };

// Stable empty-set reference — avoids re-minting a Set every render when the caller
// doesn't pass `collapsed` (e.g. pre-A6 callers/tests), so orchestrationToFlow's memo
// doesn't invalidate on every render.
const EMPTY_COLLAPSED: ReadonlySet<OrchSource> = new Set();

export function AgentsTab({
  snapshot,
  onNodeClick,
  showCompleted,
  onToggleCompleted,
  collapsed = EMPTY_COLLAPSED,
  onToggleCollapse,
  filter = EMPTY_FILTER,
  onClearFilters,
}: {
  snapshot: OrchSnapshot;
  onNodeClick: (orchNodeId: string) => void;
  showCompleted: boolean;
  onToggleCompleted: (v: boolean) => void;
  collapsed?: ReadonlySet<OrchSource>;
  onToggleCollapse?: (s: OrchSource) => void;
  filter?: OrchFilter;
  onClearFilters?: () => void;
}) {
  const t = useTranslations("orchestration");
  const { nodes, edges, fitKey } = useMemo(
    () => orchestrationToFlow(snapshot, { collapsed }),
    [snapshot, collapsed]
  );
  const hasWork = snapshot.nodes.some((n) => n.kind === "work");
  const handleClick: NodeMouseHandler = (_e, node) => {
    if (node.type === "source") {
      const source = (node.data as unknown as OrchNode).source;
      if (source) onToggleCollapse?.(source);
      return;
    }
    if (node.type === "work" || node.type === "activity" || node.type === "overflow")
      onNodeClick(node.id);
  };

  // An empty canvas means two very different things. With no filter active it is "nothing is
  // running" and the setup CTAs are the right next step; under an ACTIVE filter the runs may
  // well exist and simply not match, so pointing the operator at the setup pages would be wrong
  // advice — offer to clear the filter instead.
  if (!hasWork && !isEmptyFilter(filter)) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-muted">
        <p className="text-sm">{t("noMatches")}</p>
        <button type="button" className="text-xs underline" onClick={() => onClearFilters?.()}>
          {t("clearFilters")}
        </button>
      </div>
    );
  }

  if (!hasWork) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-muted">
        <p className="text-sm">{t("emptyTitle")}</p>
        <div className="flex gap-2 text-xs">
          <Link className="underline" href="/dashboard/cloud-agents">
            {t("emptyCloudAgentCta")}
          </Link>
          <Link className="underline" href="/dashboard/endpoint">
            {t("emptyA2ACta")}
          </Link>
          <Link className="underline" href="/dashboard/conductor">
            {t("emptyConductorCta")}
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="relative h-full orchestration-canvas">
      <label className="absolute top-2 right-2 z-10 flex items-center gap-1.5 text-xs text-muted">
        <input
          type="checkbox"
          checked={showCompleted}
          onChange={(e) => onToggleCompleted(e.target.checked)}
        />
        {t("showCompleted")}
      </label>
      <FlowCanvas
        nodes={nodes}
        edges={edges}
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        fitKey={fitKey}
        onNodeClick={handleClick}
        className="h-full"
      />
    </div>
  );
}
