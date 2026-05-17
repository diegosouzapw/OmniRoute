"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import {
  ReactFlow,
  Handle,
  Position,
  Controls,
  type Node,
  type Edge,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import ProviderIcon from "@/shared/components/ProviderIcon";

const FE_ACTIVE_TIMEOUT_MS = 60_000;
const FE_ACTIVE_TICK_MS = 1_000;

// Rings: [capacity, rx, ry]. Each successive ring fits ~6 more nodes.
const RINGS: [number, number, number][] = [
  [8, 210, 132],
  [14, 370, 233],
  [20, 530, 334],
  [26, 690, 435],
  [32, 850, 536],
  [38, 1010, 637],
];

type ProviderConfig = { color?: string; name?: string; textIcon?: string };

function getProviderConfig(providerId: string): ProviderConfig {
  return (
    (AI_PROVIDERS as Record<string, ProviderConfig>)[providerId] || {
      color: "#6b7280",
      name: providerId,
    }
  );
}

type ProviderNodeData = {
  label: string;
  color: string;
  providerId: string;
  active: boolean;
  error: boolean;
};

function ProviderNode({ data }: { data: ProviderNodeData }) {
  const { label, color, providerId, active, error } = data;

  return (
    <div
      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border-2 transition-all duration-300 bg-bg"
      style={{
        borderColor: error ? "#ef4444" : active ? color : "var(--color-border)",
        boxShadow: error ? `0 0 12px #ef444430` : active ? `0 0 12px ${color}30` : "none",
        minWidth: "136px",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="!bg-transparent !border-0 !w-0 !h-0"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom"
        className="!bg-transparent !border-0 !w-0 !h-0"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!bg-transparent !border-0 !w-0 !h-0"
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right"
        className="!bg-transparent !border-0 !w-0 !h-0"
      />

      <div
        className="size-6 rounded flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}18` }}
      >
        <ProviderIcon providerId={providerId} size={16} type="color" />
      </div>

      <span
        className="text-xs font-medium truncate flex-1"
        style={{ color: active ? color : error ? "#ef4444" : "var(--color-text-main)" }}
      >
        {label}
      </span>

      {(active || error) && (
        <span className="relative flex size-1.5 shrink-0">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70"
            style={{ backgroundColor: error ? "#ef4444" : color }}
          />
          <span
            className="relative inline-flex rounded-full size-1.5"
            style={{ backgroundColor: error ? "#ef4444" : color }}
          />
        </span>
      )}
    </div>
  );
}

type RouterNodeData = { activeCount: number };

function RouterNode({ data }: { data: RouterNodeData }) {
  return (
    <div className="flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-primary bg-primary/8 shadow-lg min-w-[140px] justify-center">
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        className="!bg-transparent !border-0 !w-0 !h-0"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="!bg-transparent !border-0 !w-0 !h-0"
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        className="!bg-transparent !border-0 !w-0 !h-0"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!bg-transparent !border-0 !w-0 !h-0"
      />

      <div className="flex items-center justify-center size-7 rounded-md bg-primary/15 shrink-0">
        <span className="material-symbols-outlined text-primary text-[16px]">route</span>
      </div>
      <span className="text-sm font-bold text-primary">OmniRoute</span>
      {data.activeCount > 0 && (
        <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold leading-none">
          {data.activeCount}
        </span>
      )}
    </div>
  );
}

const nodeTypes: NodeTypes = {
  provider: ProviderNode as any,
  router: RouterNode as any,
};

type ProviderEntry = { id?: string; provider: string; name?: string };

function edgeStyle(active: boolean, last: boolean, error: boolean) {
  if (error) return { stroke: "#ef4444", strokeWidth: 2, opacity: 0.85 };
  if (active) return { stroke: "#22c55e", strokeWidth: 2.5, opacity: 1 };
  if (last) return { stroke: "#f59e0b", strokeWidth: 1.5, opacity: 0.6 };
  return { stroke: "var(--color-border)", strokeWidth: 1, opacity: 0.2 };
}

function getHandles(angle: number, cx: number): { sourceHandle: string; targetHandle: string } {
  const rel = (((angle + Math.PI / 2) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  if (rel < Math.PI / 4 || rel > (7 * Math.PI) / 4)
    return { sourceHandle: "top", targetHandle: "bottom" };
  if (rel > (3 * Math.PI) / 4 && rel < (5 * Math.PI) / 4)
    return { sourceHandle: "bottom", targetHandle: "top" };
  return cx > 0
    ? { sourceHandle: "right", targetHandle: "left" }
    : { sourceHandle: "left", targetHandle: "right" };
}

function buildLayout(
  providers: ProviderEntry[],
  activeSet: Set<string>,
  lastSet: Set<string>,
  errorSet: Set<string>
): { nodes: Node[]; edges: Edge[] } {
  const nodeW = 156;
  const nodeH = 28;
  const routerW = 148;
  const routerH = 44;

  const nodes: Node[] = [];
  const edges: Edge[] = [];

  nodes.push({
    id: "router",
    type: "router",
    position: { x: -routerW / 2, y: -routerH / 2 },
    data: { activeCount: activeSet.size },
    draggable: false,
  });

  if (providers.length === 0) return { nodes, edges };

  // Sort: active → error → last-used → rest (alpha within groups)
  const sorted = [...providers].sort((a, b) => {
    const aId = a.provider.toLowerCase();
    const bId = b.provider.toLowerCase();
    const rank = (id: string) => {
      if (activeSet.has(id)) return 0;
      if (errorSet.has(id)) return 1;
      if (lastSet.has(id)) return 2;
      return 3;
    };
    const d = rank(aId) - rank(bId);
    return d !== 0 ? d : aId.localeCompare(bId);
  });

  let provIdx = 0;
  for (let ri = 0; ri < RINGS.length && provIdx < sorted.length; ri++) {
    const [cap, rx, ry] = RINGS[ri];
    const count = Math.min(cap, sorted.length - provIdx);

    for (let i = 0; i < count; i++) {
      const p = sorted[provIdx++];
      const pid = p.provider.toLowerCase();
      const active = activeSet.has(pid);
      const error = !active && errorSet.has(pid);
      const last = !active && !error && lastSet.has(pid);
      const config = getProviderConfig(p.provider);
      const nodeId = `provider-${p.provider}`;

      const angle = -Math.PI / 2 + (2 * Math.PI * i) / count;
      const cx = rx * Math.cos(angle);
      const cy = ry * Math.sin(angle);
      const { sourceHandle, targetHandle } = getHandles(angle, cx);

      nodes.push({
        id: nodeId,
        type: "provider",
        position: { x: cx - nodeW / 2, y: cy - nodeH / 2 },
        data: {
          label: config.name || p.name || p.provider,
          color: config.color || "#6b7280",
          providerId: p.provider,
          active,
          error,
        } satisfies ProviderNodeData,
        draggable: false,
      });

      edges.push({
        id: `e-${nodeId}`,
        source: "router",
        sourceHandle,
        target: nodeId,
        targetHandle,
        animated: active,
        style: edgeStyle(active, last, error),
      });
    }
  }

  return { nodes, edges };
}

type Props = {
  providers?: ProviderEntry[];
  activeRequests?: Array<{ provider?: string; model?: string }>;
  lastProvider?: string;
  errorProvider?: string;
};

export default function ProviderTopology({
  providers = [],
  activeRequests = [],
  lastProvider = "",
  errorProvider = "",
}: Props) {
  const activeKey = useMemo(
    () =>
      activeRequests
        .map((r) => r.provider?.toLowerCase())
        .filter(Boolean)
        .sort()
        .join(","),
    [activeRequests]
  );
  const lastKey = lastProvider.toLowerCase();
  const errorKey = errorProvider.toLowerCase();

  const rawActiveSet = useMemo(
    () => new Set<string>(activeKey ? activeKey.split(",") : []),
    [activeKey]
  );
  const lastSet = useMemo(() => new Set<string>(lastKey ? [lastKey] : []), [lastKey]);
  const errorSet = useMemo(() => new Set<string>(errorKey ? [errorKey] : []), [errorKey]);

  const firstSeenRef = useRef<Record<string, number>>({});
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const seen = firstSeenRef.current;
    const now = Date.now();
    for (const p of rawActiveSet) {
      if (!seen[p]) seen[p] = now;
    }
    for (const p of Object.keys(seen)) {
      if (!rawActiveSet.has(p)) delete seen[p];
    }
  }, [rawActiveSet]);

  useEffect(() => {
    if (rawActiveSet.size === 0) return;
    const id = setInterval(() => setTick((t) => t + 1), FE_ACTIVE_TICK_MS);
    return () => clearInterval(id);
  }, [rawActiveSet]);

  const activeSet = useMemo(() => {
    const now = Date.now();
    const filtered = new Set<string>();
    for (const p of rawActiveSet) {
      const ts = firstSeenRef.current[p];
      if (!ts || now - ts < FE_ACTIVE_TIMEOUT_MS) filtered.add(p);
    }
    return filtered;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawActiveSet, tick]);

  const { nodes, edges } = useMemo(
    () => buildLayout(providers, activeSet, lastSet, errorSet),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [providers, activeSet, lastKey, errorKey]
  );

  const providersKey = useMemo(
    () =>
      providers
        .map((p) => p.provider)
        .sort()
        .join(","),
    [providers]
  );

  const rfInstance = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fitOpts = { padding: 0.22, duration: 250 };

  const onInit = useCallback((instance: any) => {
    rfInstance.current = instance;
    setTimeout(() => instance.fitView(fitOpts), 60);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      rfInstance.current?.fitView(fitOpts);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const id = setTimeout(() => rfInstance.current?.fitView(fitOpts), 60);
    return () => clearTimeout(id);
  }, [nodes.length]);

  return (
    <div
      ref={containerRef}
      className="h-[300px] w-full min-w-0 rounded-xl border border-border bg-bg-subtle/20 overflow-hidden sm:h-[420px]"
    >
      {providers.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center gap-2 text-text-muted">
          <span className="material-symbols-outlined text-[32px]">device_hub</span>
          <p className="text-sm">No providers connected yet</p>
        </div>
      ) : (
        <ReactFlow
          key={providersKey}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={fitOpts}
          minZoom={0.08}
          maxZoom={2}
          onInit={onInit}
          proOptions={{ hideAttribution: true }}
          panOnDrag
          zoomOnScroll
          zoomOnPinch
          zoomOnDoubleClick
          preventScrolling={false}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
        >
          <Controls showInteractive={false} />
        </ReactFlow>
      )}
    </div>
  );
}
