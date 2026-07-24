// @vitest-environment jsdom
//
// The home topology painted the most recently routed provider as an idle grey node with
// no status dot, while its edge was amber — so the provider you had just used looked
// *less* connected than an untouched one. `last` was ANDed into `healthy`, and the node
// component had no `last` state to fall back on. Health now owns the border and recency
// owns the dot; this renders the real ProviderNode and reads the computed styles rather
// than pattern-matching the source.
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { FLOW_EDGE_COLORS } from "../../../src/shared/components/flow/edgeStyles";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
vi.mock("@/shared/components/ProviderIcon", () => ({
  default: () => <span data-testid="icon" />,
}));
// Render each node through its registered node type directly: ReactFlow's own layout
// needs real measurement, which jsdom cannot provide, and it is not what we're asserting.
vi.mock("@/shared/components/flow/FlowCanvas", () => ({
  FlowCanvas: ({
    nodes,
    edges,
    nodeTypes,
  }: {
    nodes: Array<{ id: string; type?: string; data: Record<string, unknown> }>;
    edges: Array<{ id: string; target: string; style?: { stroke?: string } }>;
    nodeTypes?: Record<string, React.ComponentType<{ data: Record<string, unknown> }>>;
  }) => (
    <div>
      {nodes.map((n) => {
        const Comp = n.type ? nodeTypes?.[n.type] : undefined;
        const edge = edges.find((e) => e.target === n.id);
        return (
          <div key={n.id} data-testid={n.id} data-edge-stroke={edge?.style?.stroke ?? ""}>
            {Comp ? <Comp data={n.data} /> : null}
          </div>
        );
      })}
    </div>
  ),
}));
vi.mock("@xyflow/react", () => ({
  Handle: () => null,
  Position: { Top: "top", Bottom: "bottom", Left: "left", Right: "right" },
}));

const ProviderTopology = (
  await import("../../../src/app/(dashboard)/home/ProviderTopology")
).default;

// jsdom normalises inline hex colours to `rgb(...)`, so compare in that space.
const rgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgb(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255})`;
};
const GREEN = rgb(FLOW_EDGE_COLORS.active);
const AMBER = rgb(FLOW_EDGE_COLORS.last);
const RED = rgb(FLOW_EDGE_COLORS.error);

let container: HTMLDivElement;
let root: ReturnType<typeof createRoot>;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.clearAllMocks();
});

type Entry = { id: string; provider: string; name?: string; status?: string };

function render(providers: Entry[], lastProvider = "") {
  act(() => {
    root.render(
      <ProviderTopology
        providers={providers as never}
        activeRequests={[]}
        lastProvider={lastProvider}
        errorProvider=""
      />
    );
  });
}

const node = (provider: string) =>
  container.querySelector(`[data-testid="provider-${provider}"]`) as HTMLElement;
const box = (provider: string) => node(provider).querySelector("div.border-2") as HTMLElement;
const dot = (provider: string) =>
  node(provider).querySelector("span.rounded-full:not(.animate-ping)") as HTMLElement | null;

it("keeps the connected border on the last-routed provider and marks recency on the dot", () => {
  render(
    [
      { id: "a", provider: "devin-cli", name: "Devin CLI", status: "active" },
      { id: "b", provider: "claude", name: "Claude Code", status: "active" },
    ],
    "devin-cli"
  );

  // The just-used provider: still green (connected), amber dot (most recent).
  expect(box("devin-cli").style.borderColor).toBe(GREEN);
  expect(dot("devin-cli")).not.toBeNull();
  expect(dot("devin-cli")!.style.backgroundColor).toBe(AMBER);
  // Its edge keeps the amber last-used stroke (raw attribute, not a normalised style).
  expect(node("devin-cli").dataset.edgeStroke).toBe(FLOW_EDGE_COLORS.last);

  // An untouched but connected peer is unchanged: green border, green dot.
  expect(box("claude").style.borderColor).toBe(GREEN);
  expect(dot("claude")!.style.backgroundColor).toBe(GREEN);
});

it("still greys out a provider that is genuinely idle", () => {
  render([{ id: "a", provider: "kimi-coding", name: "Kimi", status: "idle" }]);
  expect(box("kimi-coding").style.borderColor).toBe("var(--color-border)");
  expect(dot("kimi-coding")).toBeNull();
});

it("shows an errored connection as red even when it was the last one routed", () => {
  render([{ id: "a", provider: "agy", name: "Antigravity", status: "error" }], "agy");
  expect(box("agy").style.borderColor).toBe(RED);
  expect(node("agy").dataset.edgeStroke).toBe(FLOW_EDGE_COLORS.error);
});
