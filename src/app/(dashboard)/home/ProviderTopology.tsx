"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { Handle, Position, type Node, type Edge, type NodeTypes, type EdgeTypes } from "@xyflow/react";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import ProviderIcon from "@/shared/components/ProviderIcon";
import OmniRouteLogo from "@/shared/components/OmniRouteLogo";
import { FlowCanvas } from "@/shared/components/flow/FlowCanvas";
import { StatusDot } from "@/shared/components/flow/StatusDot";
import { KameBeamEdge } from "@/shared/components/flow/KameBeamEdge";
import { edgeStyle, FLOW_EDGE_COLORS } from "@/shared/components/flow/edgeStyles";
import { getFallbackProviderColor } from "@/shared/utils/providerFallbackColor";
import { resolveTopologyNodeLabel } from "./topologyLabel";

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
  // Predefined providers keep their registry color/name untouched. Anything else (custom
  // openai-compatible-*/anthropic-compatible-* provider_nodes) gets a deterministic,
  // per-id fallback color instead of one shared gray — see #8328.
  return (
    (AI_PROVIDERS as Record<string, ProviderConfig>)[providerId] || {
      color: getFallbackProviderColor(providerId),
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
  const GREEN = FLOW_EDGE_COLORS.active;
  const RED = FLOW_EDGE_COLORS.error;

  return (
    <div
      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border transition-all duration-300 bg-bg"
      style={{
        // Idle providers (including healthy-but-quiet connections) sit muted with the
        // default border and no glow — only live traffic (active) or a real error
        // lights a node up, matching 9Router's calm-at-rest map. This kills the
        // "everything glows green" clutter anh Hà flagged.
        borderColor: error ? RED : active ? color : "var(--color-border)",
        boxShadow: error ? `0 0 10px ${RED}26` : active ? `0 0 10px ${color}26` : "none",
        minWidth: "128px",
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
        style={{
          color: active ? color : error ? RED : "var(--color-text-main)",
        }}
      >
        {label}
      </span>

      {(active || error) && (
        <StatusDot color={active ? color : GREEN} error={error} pulse={active || error} />
      )}
    </div>
  );
}

type RouterNodeData = { activeCount: number };

function RouterNode({ data }: { data: RouterNodeData }) {
  const active = data.activeCount > 0;
  return (
    <div
      className={`relative flex items-center justify-center size-12 rounded-xl border border-primary/70 bg-primary/8 transition-all duration-300${
        active ? " topology-router-core" : ""
      }`}
    >
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

      <OmniRouteLogo
        size={24}
        className={`text-primary${active ? " topology-router-icon" : ""}`}
      />
      {active && (
        <span className="topology-router-badge absolute -top-2 -right-2 flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-primary text-white text-[10px] font-bold leading-none">
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

const edgeTypes: EdgeTypes = {
  kame: KameBeamEdge as any,
};

type ProviderHealth = "active" | "error" | "idle";
type ProviderEntry = { id?: string; provider: string; name?: string; status?: ProviderHealth };

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
  const routerW = 48;
  const routerH = 48;

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

  // Stable alphabetical order. Node POSITION never depends on activity — a provider
  // keeps its ring slot whether or not it's mid-request, so the map no longer
  // reshuffles ("jumps") every time a call lands. Activity is conveyed purely by
  // node/edge styling, matching 9Router's `providers.forEach((p, i) => ...)`.
  const sorted = [...providers].sort((a, b) =>
    a.provider.toLowerCase().localeCompare(b.provider.toLowerCase())
  );

  let provIdx = 0;
  for (let ri = 0; ri < RINGS.length && provIdx < sorted.length; ri++) {
    const [cap, rx, ry] = RINGS[ri];
    const count = Math.min(cap, sorted.length - provIdx);

    for (let i = 0; i < count; i++) {
      const p = sorted[provIdx++];
      const pid = p.provider.toLowerCase();
      // Edge/node state is driven PURELY by transient traffic, exactly like 9Router:
      //   active (in-flight) > last (single most-recent) > error (a live failed request).
      // Connection-health (`p.status`) is deliberately NOT painted onto the edge — that
      // was an Omni-only addition that kept a line lit forever ("hiện mãi") for a quiet
      // or test-failed connection. With it gone the connector changes and then fades to
      // the muted idle stroke once traffic stops, matching 9Router's calm-at-rest map.
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
          label: resolveTopologyNodeLabel(p.name, config.name, p.provider),
          color: config.color || "#6b7280",
          providerId: p.provider,
          active,
          error,
        } satisfies ProviderNodeData,
        draggable: false,
      });

      edges.push({
        id: `e-${nodeId}`,
        type: "kame",
        source: "router",
        sourceHandle,
        target: nodeId,
        targetHandle,
        // The kame beam runs its own SVG animation on active edges; the flat
        // BaseEdge fallback (idle/last/error) is styled by edgeStyle(). Healthy-but-quiet
        // connections fall through to the muted idle stroke on purpose — the map stays
        // calm at rest and only lights up on real traffic, matching 9Router.
        animated: false,
        data: { active },
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
  const t = useTranslations("common");
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

  // A provider's beam is active for EXACTLY as long as it has a live request in the
  // WS snapshot — the beam starts on `request.started` and stops only when
  // `request.completed`/`request.failed` drains that request from useLiveRequests'
  // active Map (matched by request id). We deliberately impose NO frontend timeout: an
  // earlier per-provider wall-clock cutoff killed the beam mid-flight for any request
  // that outran the limit (and, being keyed per-provider, could cut an overlapping
  // request almost immediately), which broke the contract — the effect must run until
  // the success/failure RESULT arrives, not on a timer. If a stuck in-flight signal is
  // ever a concern, the server must emit the terminal event (authoritative, per request
  // id); the client must not second-guess it with a timer. Guarded by
  // tests/unit/home-provider-topology-live-state.test.ts.
  const activeSet = useMemo(
    () => new Set<string>(activeKey ? activeKey.split(",") : []),
    [activeKey]
  );
  const lastSet = useMemo(() => new Set<string>(lastKey ? [lastKey] : []), [lastKey]);
  const errorSet = useMemo(() => new Set<string>(errorKey ? [errorKey] : []), [errorKey]);

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

  // The diagram keeps its rounded border frame (the "khung" anh Hà wants kept) but its
  // background is fully TRANSPARENT — the page's fixed graph-paper wallpaper (body::before)
  // must show straight THROUGH the frame ("xuyên qua"), not be repainted or covered by an
  // opaque fill. This only works because the section no longer wraps the tile in an opaque
  // Card (see HomeProviderTopologySection) — with a solid surface behind it the wallpaper
  // could never bleed through. Matches 9Router, where the topology tile sits directly on
  // the page grid and only Recent Requests is a solid card.
  const containerClass =
    "h-[300px] w-full min-w-0 rounded-xl border border-border bg-transparent overflow-hidden sm:h-[420px]";

  if (providers.length === 0) {
    return (
      <div
        className={`${containerClass} flex flex-col items-center justify-center gap-2 text-text-muted`}
      >
        <span className="material-symbols-outlined text-[32px]">device_hub</span>
        <p className="text-sm">{t("providerTopologyEmpty")}</p>
      </div>
    );
  }

  return (
    <FlowCanvas
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      fitKey={providersKey}
      className={containerClass}
    />
  );
}
