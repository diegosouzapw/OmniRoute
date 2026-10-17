"use client";

import { useMemo, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Handle, Position, type Node, type Edge, type NodeTypes } from "@xyflow/react";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import ProviderIcon from "@/shared/components/ProviderIcon";
import { FlowCanvas } from "@/shared/components/flow/FlowCanvas";
import { StatusDot } from "@/shared/components/flow/StatusDot";
import { edgeStyle, FLOW_EDGE_COLORS, flowColorAlpha } from "@/shared/components/flow/edgeStyles";
import { getFallbackProviderColor } from "@/shared/utils/providerFallbackColor";
import { resolveTopologyNodeLabel } from "./topologyLabel";
import {
  buildModelSubNodes,
  getHandles,
  selectTopologyModels,
  type ModelNodeData,
  type TopologyModelMode,
} from "./topologyUtils";

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
  /** Connection-health base state: a healthy connection with no in-flight traffic. */
  healthy: boolean;
  /** Most recently routed provider. Orthogonal to health — it can be last *and* healthy. */
  last: boolean;
};

function ProviderNode({ data }: { data: ProviderNodeData }) {
  const { label, color, providerId, active, error, healthy, last } = data;
  const GREEN = FLOW_EDGE_COLORS.active;
  const RED = FLOW_EDGE_COLORS.error;
  const AMBER = FLOW_EDGE_COLORS.last;
  // "Last routed" is a traffic annotation, not a health state: the border keeps saying
  // whether the connection is up, and only the dot turns amber to mark recency.
  const dotColor = active ? color : last ? AMBER : GREEN;

  return (
    <div
      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border-2 transition-all duration-300 bg-bg cursor-pointer hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
      style={{
        borderColor: error ? RED : active ? color : healthy ? GREEN : "var(--color-border)",
        boxShadow: error
          ? `0 0 12px ${flowColorAlpha(RED, 19)}`
          : active
            ? `0 0 12px ${color}30`
            : healthy
              ? `0 0 10px ${flowColorAlpha(GREEN, 13)}`
              : "none",
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
      {/* Source handles for the edges out to this provider's model sub-nodes. */}
      {(["top", "bottom", "left", "right"] as const).map((side) => (
        <Handle
          key={side}
          type="source"
          position={HANDLE_POSITIONS[side]}
          id={`s-${side}`}
          className="!bg-transparent !border-0 !w-0 !h-0"
        />
      ))}

      <div
        className="size-6 rounded flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}18` }}
      >
        <ProviderIcon providerId={providerId} size={16} type="color" />
      </div>

      <span
        className="text-xs font-medium truncate flex-1"
        style={{
          color: active ? color : error ? RED : healthy ? GREEN : "var(--color-text-main)",
        }}
      >
        {label}
      </span>

      {(active || error || healthy || last) && (
        <StatusDot color={dotColor} error={error} pulse={active || error} />
      )}
    </div>
  );
}

const HANDLE_POSITIONS = {
  top: Position.Top,
  bottom: Position.Bottom,
  left: Position.Left,
  right: Position.Right,
} as const;

function ModelNode({ data }: { data: ModelNodeData }) {
  const { label, active, color, overflow } = data;
  return (
    <div
      className="flex items-center gap-1.5 px-2 py-0.5 rounded-full border bg-bg font-mono text-[10px] transition-all duration-300 cursor-pointer max-w-[136px] motion-reduce:[&_.animate-ping]:hidden"
      style={{
        borderColor: active ? color : "var(--color-border)",
        boxShadow: active ? `0 0 10px ${color}40` : "none",
        color: active ? color : "var(--color-text-muted)",
      }}
      title={label}
    >
      {(["top", "bottom", "left", "right"] as const).map((side) => (
        <Handle
          key={side}
          type="target"
          position={HANDLE_POSITIONS[side]}
          id={side}
          className="!bg-transparent !border-0 !w-0 !h-0"
        />
      ))}
      {!overflow && (
        <StatusDot
          color={active ? color : FLOW_EDGE_COLORS.idle}
          sizeClass="size-1.5"
          pulse={active}
        />
      )}
      <span className="truncate">{label}</span>
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
  model: ModelNode as any,
};

type ProviderHealth = "active" | "error" | "idle";
type ProviderEntry = { id?: string; provider: string; name?: string; status?: ProviderHealth };

function buildLayout(
  providers: ProviderEntry[],
  activeSet: Set<string>,
  lastSet: Set<string>,
  errorSet: Set<string>,
  modelMode: TopologyModelMode = "auto",
  activeRequests: ModelRef[] = [],
  recentRequests: ModelRef[] = []
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

  // Sort: active → error → last-used → healthy(connected) → rest (alpha within groups)
  const sorted = [...providers].sort((a, b) => {
    const rank = (p: ProviderEntry) => {
      const id = p.provider.toLowerCase();
      if (activeSet.has(id)) return 0;
      if (errorSet.has(id) || p.status === "error") return 1;
      if (lastSet.has(id)) return 2;
      if (p.status === "active") return 3;
      return 4;
    };
    const d = rank(a) - rank(b);
    return d !== 0 ? d : a.provider.toLowerCase().localeCompare(b.provider.toLowerCase()); // ASCII kasıtlı
  });

  // Model sub-nodes orbit just outside the outermost ring in use, so they never land
  // between two provider rings.
  let outerRing = 0;
  for (let left = sorted.length - RINGS[0][0]; left > 0 && outerRing < RINGS.length - 1;) {
    outerRing++;
    left -= RINGS[outerRing][0];
  }
  const orbit = { rx: RINGS[outerRing][1], ry: RINGS[outerRing][2] };
  const modelNodes: Node[] = [];

  let provIdx = 0;
  for (let ri = 0; ri < RINGS.length && provIdx < sorted.length; ri++) {
    const [cap, rx, ry] = RINGS[ri];
    const count = Math.min(cap, sorted.length - provIdx);

    for (let i = 0; i < count; i++) {
      const p = sorted[provIdx++];
      const pid = p.provider.toLowerCase();
      const active = activeSet.has(pid);
      // Traffic signals (live/recent request) take precedence; connection health is the
      // base state shown when a provider has no in-flight or recent traffic, so the map
      // still reflects "what is connected" at rest instead of going blank after a restart.
      const trafficError = !active && errorSet.has(pid);
      const last = !active && !trafficError && lastSet.has(pid);
      // Health is orthogonal to recency: having just served a request does not make a
      // connection any less connected. `last` used to suppress `healthy`/`healthError`,
      // and because the node had no `last` visual it fell all the way through to the idle
      // grey — so the provider you had just used rendered *less* connected than an idle
      // peer, while its edge was amber. Health drives the border, `last` only the dot.
      const healthError = !active && !trafficError && p.status === "error";
      const healthy = !active && !trafficError && !healthError && p.status === "active";
      const error = trafficError || healthError;
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
          healthy,
          last,
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
        style: edgeStyle(active, last, error, healthy),
      });

      const sub = buildModelSubNodes(
        { nodeId, providerId: p.provider, angle, color: config.color || "#6b7280" },
        selectTopologyModels(p.provider, modelMode, activeRequests, recentRequests),
        orbit,
        (2 * Math.PI) / count
      );
      modelNodes.push(...sub.nodes);
      edges.push(...sub.edges);
    }
  }

  // Model nodes go last so ReactFlow paints them above the provider ring.
  nodes.push(...modelNodes);
  return { nodes, edges };
}

type ModelRef = { provider?: string; model?: string };

/** Stable string identity for a provider/model list, so memos re-run only on real change. */
function modelRefsKey(refs: ModelRef[]): string {
  return refs
    .filter((r) => r.provider && r.model)
    .map((r) => `${r.provider}\u0000${r.model}`)
    .join("\u0001");
}

const MODEL_MODES: TopologyModelMode[] = ["on", "auto", "off"];
const MODEL_MODE_LABEL_KEYS = {
  on: ["topologyModelsOn", "topologyModelsOnHint"],
  auto: ["topologyModelsAuto", "topologyModelsAutoHint"],
  off: ["topologyModelsOff", "topologyModelsOffHint"],
} as const;

type Props = {
  providers?: ProviderEntry[];
  activeRequests?: ModelRef[];
  /** Recently finished requests; ON mode draws their models as idle sub-nodes. */
  recentRequests?: ModelRef[];
  lastProvider?: string;
  errorProvider?: string;
};

export default function ProviderTopology({
  providers = [],
  activeRequests = [],
  recentRequests = [],
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

  const activeSet = useMemo(
    () => new Set<string>(activeKey ? activeKey.split(",") : []),
    [activeKey]
  );
  const lastSet = useMemo(() => new Set<string>(lastKey ? [lastKey] : []), [lastKey]);
  const errorSet = useMemo(() => new Set<string>(errorKey ? [errorKey] : []), [errorKey]);

  // AUTO (default) only draws models with a request in flight, so an idle map is unchanged.
  const [modelMode, setModelMode] = useState<TopologyModelMode>("auto");
  const activeModelsKey = modelRefsKey(activeRequests);
  const recentModelsKey = modelMode === "on" ? modelRefsKey(recentRequests) : "";

  const { nodes, edges } = useMemo(
    () =>
      buildLayout(
        providers,
        activeSet,
        lastSet,
        errorSet,
        modelMode,
        activeRequests,
        recentRequests
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [providers, activeSet, lastKey, errorKey, modelMode, activeModelsKey, recentModelsKey]
  );

  const providersKey = useMemo(
    () =>
      providers
        .map((p) => p.provider)
        .sort()
        .join(","),
    [providers]
  );

  const router = useRouter();

  const handleNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      if (node.type !== "provider" && node.type !== "model") return;
      const providerId =
        (node.data as ProviderNodeData | ModelNodeData | undefined)?.providerId ||
        node.id.replace(/^provider-/, "");
      if (providerId) {
        router.push(`/dashboard/providers/${providerId}`);
      }
    },
    [router]
  );

  const containerClass =
    "h-[300px] w-full min-w-0 rounded-xl border border-border bg-bg-subtle/20 overflow-hidden sm:h-[420px]";

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
    <div className="relative">
      <div
        role="group"
        aria-label={t("topologyModels")}
        className="absolute top-2 left-2 z-10 flex items-center gap-1 rounded-md border border-border bg-bg/90 p-1 text-[11px] shadow-sm"
      >
        <span className="px-1 font-semibold text-text-muted">{t("topologyModels")}</span>
        {MODEL_MODES.map((mode) => {
          const [labelKey, hintKey] = MODEL_MODE_LABEL_KEYS[mode];
          const selected = modelMode === mode;
          return (
            <button
              key={mode}
              type="button"
              aria-pressed={selected}
              title={t(hintKey)}
              onClick={() => setModelMode(mode)}
              className={`px-2 py-0.5 rounded font-semibold transition-colors ${
                selected ? "bg-primary text-white" : "text-text-muted hover:bg-bg-subtle"
              }`}
            >
              {t(labelKey)}
            </button>
          );
        })}
      </div>
      <FlowCanvas
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitKey={providersKey}
        className={containerClass}
        onNodeClick={handleNodeClick}
      />
    </div>
  );
}
