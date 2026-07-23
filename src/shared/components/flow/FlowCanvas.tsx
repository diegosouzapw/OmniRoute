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
  type ReactFlowInstance,
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
 *
 * ## Stability fix (Bug #4 — plans/2026-06-23-omniroute-v3.8.34-deep-audit.md)
 *
 * Earlier revisions captured the ReactFlow instance in a plain `useRef` that
 * outlived remounts. When the parent re-rendered with a new `fitKey`, the
 * `<ReactFlow key={fitKey} ...>` remounted the graph (a brand-new instance),
 * but the `useEffect`s at the bottom of this file could still call
 * `.fitView()` on the *stale* ref. React Flow walks its internal
 * `nodeLookup` map and throws "Node cannot be found in the current page"
 * when the lookup is in a transient state during a remount. The fix is a
 * generation counter: every `onInit` bumps a counter, and every queued
 * `fitView` call checks the counter before touching the instance.
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
  const rfInstance = useRef<ReactFlowInstance | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Bumped on every onInit so queued fitView calls can be invalidated when
  // a new ReactFlow instance mounts (e.g. via fitKey change).
  const generationRef = useRef(0);

  const onInit = useCallback((instance: ReactFlowInstance) => {
    const generation = ++generationRef.current;
    rfInstance.current = instance;
    // Defer fitView until ReactFlow has measured its viewport, but guard
    // against the instance being replaced (generation mismatch) before the
    // timer fires — see Bug #4 in the audit report.
    setTimeout(() => {
      if (generationRef.current === generation) {
        instance.fitView(FIT_VIEW_OPTIONS);
      }
    }, REFIT_DELAY_MS);
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
    // Snapshot the generation so a queued callback that fires after a
    // remount is silently dropped (no fitView on stale instance).
    const generation = generationRef.current;
    const id = setTimeout(() => {
      if (generationRef.current === generation) {
        rfInstance.current?.fitView(FIT_VIEW_OPTIONS);
      }
    }, REFIT_DELAY_MS);
    return () => clearTimeout(id);
  }, [nodes.length]);

  // Clear the ref on unmount so a late-arriving callback (e.g. a ResizeObserver
  // tick fired just before the React tree unmounted) cannot reach into a
  // disposed ReactFlow instance.
  useEffect(() => {
    return () => {
      rfInstance.current = null;
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      <ReactFlow
        key={fitKey}
        className="omniroute-flow"
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
