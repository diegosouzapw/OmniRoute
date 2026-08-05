"use client";

import { useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeTypes,
  type EdgeTypes,
} from "@xyflow/react";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import ProviderIcon from "@/shared/components/ProviderIcon";
import OmniRouteLogo from "@/shared/components/OmniRouteLogo";
import { FlowCanvas } from "@/shared/components/flow/FlowCanvas";
import { StatusDot } from "@/shared/components/flow/StatusDot";
import { KameBeamEdge } from "@/shared/components/flow/KameBeamEdge";
import { edgeStyle, FLOW_EDGE_COLORS } from "@/shared/components/flow/edgeStyles";
import { getFallbackProviderColor } from "@/shared/utils/providerFallbackColor";
import { getTopologyHandles } from "./topologyHandles";
import { resolveTopologyNodeLabel } from "./topologyLabel";
import {
  compareTopologyProviders,
  selectDrawnErrorProviders,
  selectDrawnProviders,
} from "./topologyUtils";

// ONE ring whose radius grows with the provider count — never a second ring.
//
// The previous layout used a fixed ladder of rings ([8, 210, 132], [14, 370, 233], ...)
// and pushed provider N+1 outward once a ring filled up. With 11 providers that put 8 on
// the inner ring and spilled 3 onto the next one, and because every ring starts its walk
// at -PI/2 (straight up), the first node of ring 2 landed on the SAME vertical axis as the
// first node of ring 1 — two nodes stacked directly above one another, which reads as a
// vertical list bolted onto a star rather than a topology map. Any provider count that is
// not exactly a ring capacity reproduces it.
//
// 9Router never had this because it never had a second ring: it derives ONE radius from
// the node count and lets the single ellipse grow. Same here — `count` nodes are spread
// evenly over a full turn of one ellipse, so spokes stay radial and no two nodes can share
// an axis. The minimum keeps a 1-2 provider map from collapsing onto the router.
// These three floors/ratios are 9Router's, measured from its own buildLayout
// (src/app/(dashboard)/dashboard/usage/components/ProviderTopology.js:271-273):
// `rx = Math.max(320, minRx)`, `ry = Math.max(200, rx * 0.55)`. The earlier values here
// (210 / 132 / 0.63) drew the same map at roughly two thirds the size, which is what read as
// the diagram being shrunk into a corner of its frame.
const RING_MIN_RX = 320;
const RING_MIN_RY = 200;
// Arc length each node needs so neighbours never touch (node width + breathing room).
// 9Router budgets `nodeW 180 + nodeGap 24` (same file, :263-267); its nodes are 24px wider
// than ours, so this is deliberately generous rather than exact — nodes stay apart at high
// provider counts instead of crowding as the ring fills.
const RING_NODE_ARC = 204;
const RING_ELLIPSE_RATIO = 0.55;

function ringRadii(count: number): { rx: number; ry: number } {
  // Circumference must fit every node: 2*PI*rx >= count * arc.
  const rx = Math.max(RING_MIN_RX, (count * RING_NODE_ARC) / (2 * Math.PI));
  const ry = Math.max(RING_MIN_RY, rx * RING_ELLIPSE_RATIO);
  return { rx, ry };
}

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
  /** Operator-supplied remote icon URL (#2166), threaded from provider_nodes.icon_url. */
  iconUrl?: string;
  /** Short badge ("AC"/"CC"/"OC") shown when no logo resolves, never a raw fallback glyph. */
  textIcon?: string;
  /**
   * provider_nodes.api_type — lets ProviderIcon pick between the two OpenAI-compatible
   * logos when the node has no icon_url of its own.
   */
  apiType?: string | null;
  active: boolean;
  error: boolean;
};

function ProviderNode({ data }: { data: ProviderNodeData }) {
  const { label, color, providerId, iconUrl, textIcon, apiType, active, error } = data;
  const GREEN = FLOW_EDGE_COLORS.active;
  const RED = FLOW_EDGE_COLORS.error;

  return (
    <div
      // Sized ONE step up from the previous px-2.5/py-1.5/1px-border node, which read as a
      // speck once the ring floor grew to 320x200. Deliberately NOT 9Router's px-4 py-2.5
      // border-2 / 150px / 32px-tile / 16px-label node: that is a different, chunkier design
      // and copying it wholesale overcorrects a "too small" complaint into "too big". The
      // border does go to 2px because a hairline washes out under the fitView downscale a
      // crowded ring settles into — that is legibility, not bulk.
      className="flex w-[164px] items-center gap-2 rounded-lg border-2 bg-bg px-3 py-2 transition-all duration-300"
      style={{
        // Idle providers (including healthy-but-quiet connections) sit muted with the
        // default border and no glow — only live traffic (active) or a real error
        // lights a node up, matching 9Router's calm-at-rest map. Without this, every
        // configured provider glowed green at rest and the map carried no signal.
        borderColor: error ? RED : active ? color : "var(--color-border)",
        // Glow lifted from 10px/15% to 13px/26% so an active or failing node still reads once
        // fitView scales the ring down. Short of 9Router's 16px/40%, which bleeds into
        // neighbouring nodes at the tighter spacing used here.
        boxShadow: error ? `0 0 13px ${RED}33` : active ? `0 0 13px ${color}33` : "none",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="topology-connector-handle"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom"
        className="topology-connector-handle"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="topology-connector-handle"
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right"
        className="topology-connector-handle"
      />

      {/* 28px tile holding an 18px logo — one step up from 24px/16px, where the logo was the
          smallest thing on the map despite being what an operator scans for. Not 9Router's
          32px/20px: that belongs to its chunkier node and would push this one wider than the
          ring spacing allows. */}
      <div
        className="size-7 rounded-md flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${color}18` }}
      >
        {/*
          Same props the provider pages pass, so one node renders identically everywhere.
          Calling ProviderIcon with only `providerId` (as this did) skips the operator's
          icon_url AND the "AC"/"CC"/"OC" badge, so a compatible node — whose generated id
          is a UUID that matches no bundled logo — fell through every resolution step to
          the generic circle-plus glyph.

          `apiType` matters even though this node has no icon_url of its own: it is what
          lets ProviderIcon choose between the two OpenAI-compatible logos. Without it a
          "responses" node would render the chat logo.
        */}
        <ProviderIcon
          providerId={providerId}
          src={iconUrl}
          alt={label}
          size={18}
          type="color"
          fallbackText={textIcon}
          fallbackColor={color}
          apiType={apiType}
        />
      </div>

      <span
        // 14px: one step up from the previous 12px, which was the smallest text on the
        // dashboard and is the label an operator reads to identify a node. Short of
        // 9Router's 16px, which would widen every node enough to crowd the ring.
        className="min-w-0 flex-1 truncate text-sm font-medium"
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
      className={`relative flex h-12 w-24 items-center justify-center gap-2 rounded-xl border border-primary/70 bg-primary/8 transition-all duration-300${
        active ? " topology-router-core" : ""
      }`}
    >
      <Handle
        type="source"
        position={Position.Top}
        id="top"
        className="topology-connector-handle"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="topology-connector-handle"
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        className="topology-connector-handle"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="topology-connector-handle"
      />

      <OmniRouteLogo size={24} className={`text-primary${active ? " topology-router-icon" : ""}`} />
      {/* In-flight counter — rendered ONLY while something is routing, exactly like 9Router
       * (its RouterNode: `{data.activeCount > 0 && <span …>{data.activeCount}</span>}`).
       *
       * The BOX is the fixed thing here, not this counter. The core is `h-12 w-24` with
       * `justify-center`, so its width never changes and React Flow's top-left positioning
       * (`x: -routerW / 2`) keeps it centred on the ring no matter what is inside. The
       * contents re-centre themselves within that fixed box when the counter appears.
       *
       * An earlier revision reserved a permanent slot for the counter instead, which forced a
       * literal "0" to sit next to the logo at all times — noise at rest, and it crowded the
       * logo badly. Reserving space is only necessary when the CONTAINER is sized by its
       * content; it is not, so there is nothing to reserve. */}
      {active && (
        <span className="topology-router-badge flex h-5 min-w-[20px] items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold leading-none text-white tabular-nums">
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
type ProviderEntry = {
  id?: string;
  provider: string;
  name?: string;
  /** provider_nodes.icon_url for compatible nodes; absent for registry providers. */
  iconUrl?: string;
  /** Badge text for compatible nodes ("AC"/"CC"/"OC"); registry providers use their own. */
  textIcon?: string;
  /** provider_nodes.api_type — picks between the two OpenAI-compatible logos. */
  apiType?: string | null;
  /**
   * provider_nodes.created_at — tie-breaks ring order so a newly added provider appends at
   * the end. Absent for built-in registry providers, which have no creation record.
   */
  createdAt?: string | null;
  /**
   * Best (lowest) global priority across this provider's enabled connections. Outranks
   * `createdAt`; undefined for providers with no global priority set.
   */
  priority?: number;
  status?: ProviderHealth;
};

function buildLayout(
  providers: ProviderEntry[],
  activeSet: Set<string>,
  lastSet: Set<string>,
  errorSet: Set<string>
): { nodes: Node[]; edges: Edge[] } {
  // Must track ProviderNode's rendered fixed `w-[164px]` border box and its height of py-2
  // (16) + border-2 (4) + the 28px icon tile. The fixed width is part of the geometry contract:
  // labels shrink/truncate inside it, so a long operator name cannot grow the box after React
  // Flow has positioned it from `x: cx - nodeW / 2`. Like routerW/routerH these constants only
  // recentre nodes; a stale number offsets every connector from its intended ring slot.
  const nodeW = 164;
  const nodeH = 48;
  // Must match RouterNode's rendered box (h-12 w-24). The core is a landscape rectangle, not
  // a square: the logo and the in-flight counter sit side by side on one row. Keep these in
  // sync with the Tailwind classes — the value only recentres the node (`-routerW / 2`), it
  // does not size it, so a stale number here silently offsets the core from the ring centre.
  const routerW = 96;
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

  // Insertion order: a provider added later sits later in the ring, so adding one APPENDS
  // instead of displacing the existing map. Node POSITION never depends on activity — a
  // provider keeps its ring slot whether or not it's mid-request, so the map does not
  // reshuffle every time a call lands. Activity is conveyed purely by node/edge styling.
  //
  // This replaced a plain alphabetical sort on the provider ID, which put every newly
  // added compatible node at the FRONT: its generated id starts with
  // "anthropic-compatible-"/"openai-compatible-", which sorts ahead of nearly the whole
  // catalog, so a new node seized the top slot and rotated everyone else round. Because
  // the sort key was the id while the node renders its display NAME, the result looked
  // arbitrary rather than alphabetical. See compareTopologyProviders.
  const sorted = [...providers].sort(compareTopologyProviders);

  const count = sorted.length;
  const { rx, ry } = ringRadii(count);

  for (let i = 0; i < count; i++) {
    const p = sorted[i];
    const pid = p.provider.toLowerCase();
    // Edge/node state is driven PURELY by transient traffic, exactly like 9Router:
    //   active (in-flight) > last (single most-recent) > error (a live failed request).
    // Connection-health (`p.status`) is deliberately NOT painted onto the edge — that
    // was an Omni-only addition that kept a line lit permanently for a quiet
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
    const { sourceHandle, targetHandle } = getTopologyHandles(angle, cx);

    nodes.push({
      id: nodeId,
      type: "provider",
      position: { x: cx - nodeW / 2, y: cy - nodeH / 2 },
      data: {
        // A node LABEL is read by a human, so it stays the operator's display name
        // ("Eric Ding"), never the prefix. The prefix is the machine identifier — it is
        // required wherever a value lands in a model path or is copied by the user, and
        // must not be used for a caption. `providerId` below carries the identity.
        label: resolveTopologyNodeLabel(p.name, config.name, p.provider),
        color: config.color || "#6b7280",
        providerId: p.provider,
        iconUrl: p.iconUrl,
        textIcon: p.textIcon || config.textIcon,
        apiType: p.apiType,
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

  return { nodes, edges };
}

type Props = {
  providers?: ProviderEntry[];
  activeRequests?: Array<{ provider?: string; model?: string }>;
  lastProvider?: string;
  /**
   * Every provider whose most recent request failed — not just one.
   *
   * This used to be a single `errorProvider` string, which is why a red edge appeared to
   * hide and return on its own: the API kept only the most-recently-failing provider, so a
   * second failure overwrote the first (clearing its red line) and that second provider
   * succeeding handed the flag back (restoring it), with nothing about the broken provider
   * having changed.
   */
  errorProviders?: readonly string[];
};

export default function ProviderTopology({
  providers = [],
  activeRequests = [],
  lastProvider = "",
  errorProviders = [],
}: Props) {
  const t = useTranslations("common");
  // Keep every active surface on the same drawn-provider domain as the error state. The live
  // feed can still contain a request for a disabled/deleted connection after its node has
  // disappeared; such a request must not light the router or inflate its counter.
  const activeKey = useMemo(
    () =>
      [...selectDrawnProviders(
        activeRequests.map((request) => request.provider || ""),
        providers.map((provider) => provider.provider)
      )]
        .sort()
        .join(","),
    [activeRequests, providers]
  );
  const lastKey = lastProvider.toLowerCase();
  // Intersected with the providers actually drawn, so the red edges cannot disagree with
  // what the graph shows — an error for a provider with no node (its connection was
  // disabled or deleted) has nothing to colour and must not count.
  const errorKey = useMemo(
    () =>
      [
        ...selectDrawnErrorProviders(
          errorProviders,
          providers.map((p) => p.provider)
        ),
      ]
        .sort()
        .join(","),
    [errorProviders, providers]
  );

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
  // Many providers can be red at once. `errorKey` is the sorted joined form, so it is a
  // stable primitive to memo on — the same trick `activeKey` uses to avoid re-deriving on
  // every poll when the contents did not actually change.
  const errorSet = useMemo(
    () => new Set<string>(errorKey ? errorKey.split(",") : []),
    [errorKey]
  );

  const { nodes, edges } = useMemo(
    () => buildLayout(providers, activeSet, lastSet, errorSet),
    // `lastSet`/`errorSet` are derived purely from `lastKey`/`errorKey`, so listing the
    // primitives is equivalent to listing the Sets and avoids a fresh layout on every
    // render. Keep both keys here: dropping either makes the layout genuinely stale.
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

  // The diagram keeps its rounded border frame but its background is fully TRANSPARENT —
  // the page's fixed graph-paper wallpaper (body::before) must show straight through the
  // frame, not be repainted or covered by an opaque fill. This only works because the
  // section no longer wraps the tile in an opaque Card (see HomeProviderTopologySection):
  // with a solid surface behind it the wallpaper could never bleed through. Matches
  // 9Router, where the topology tile sits directly on the page grid and only Recent
  // Requests is a solid card.
  // Frame height matches 9Router's topology tile (h-[320px] sm:h-[480px], its
  // ProviderTopology.js:440). The larger ring above needs the extra room; FlowCanvas
  // auto-fits on init, on ResizeObserver and on node-count change, so the bigger geometry
  // scales to whatever height this resolves to rather than being clipped.
  const containerClass =
    "h-[320px] w-full min-w-0 rounded-xl border border-border bg-transparent overflow-hidden sm:h-[480px]";

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
