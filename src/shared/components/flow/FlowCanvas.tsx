"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import {
  ReactFlow,
  Controls,
  type Node,
  type Edge,
  type NodeTypes,
  type EdgeTypes,
  type NodeMouseHandler,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const FIT_VIEW_OPTIONS = { padding: 0.22, duration: 250 } as const;
const MIN_ZOOM = 0.08;
const MAX_ZOOM = 2;
const REFIT_DELAY_MS = 60;

type FlowCanvasProps = {
  nodes: Node[];
  edges: Edge[];
  nodeTypes?: NodeTypes;
  edgeTypes?: EdgeTypes;
  /**
   * Changing this remounts the graph (fresh `fitView`). Pass a key derived from
   * the data identity (e.g. the sorted provider list) — same role as the
   * `key={providersKey}` ProviderTopology used.
   */
  fitKey?: string | number;
  /** When false (default) the graph is read-only: no drag, no selection. */
  interactive?: boolean;
  /** Sizing/theme classes for the container that hosts the canvas. */
  className?: string;
  onNodeClick?: NodeMouseHandler;
  /** Overlays rendered inside the canvas (after Controls). */
  children?: ReactNode;
};

/**
 * Reusable ReactFlow wrapper (U0), extracted from `ProviderTopology` without
 * behavioural change: auto-fit on init, on resize (ResizeObserver) and on node
 * count change; attribution hidden; read-only by default. Shared by the home
 * topology, the Combo/Routing Studio (Tela B) and the Compression Studio (Tela A).
 */
export function FlowCanvas({
  nodes,
  edges,
  nodeTypes,
  edgeTypes,
  fitKey,
  interactive = false,
  className = "h-full w-full min-w-0 overflow-hidden",
  onNodeClick,
  children,
}: FlowCanvasProps) {
  const rfInstance = useRef<{ fitView: (opts: typeof FIT_VIEW_OPTIONS) => void } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const onInit = useCallback((instance: { fitView: (opts: typeof FIT_VIEW_OPTIONS) => void }) => {
    rfInstance.current = instance;
    setTimeout(() => instance.fitView(FIT_VIEW_OPTIONS), REFIT_DELAY_MS);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      rfInstance.current?.fitView(FIT_VIEW_OPTIONS);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => rfInstance.current?.fitView(FIT_VIEW_OPTIONS), REFIT_DELAY_MS);
    return () => clearTimeout(id);
  }, [nodes.length]);

  return (
    <div ref={containerRef} className={className}>
      <ReactFlow
        key={fitKey}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={FIT_VIEW_OPTIONS}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        onInit={onInit}
        proOptions={{ hideAttribution: true }}
        panOnDrag
        zoomOnScroll
        zoomOnPinch
        zoomOnDoubleClick
        preventScrolling={false}
        nodesDraggable={interactive}
        nodesConnectable={false}
        elementsSelectable={interactive}
      >
        <Controls showInteractive={false} />
        {children}
      </ReactFlow>
    </div>
  );
}

export default FlowCanvas;
