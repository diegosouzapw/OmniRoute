// @vitest-environment jsdom
//
// The home topology now branches router -> provider -> model. AUTO (the default) draws a
// model sub-node only while a request for it is in flight, ON adds recently used models,
// and OFF hides them. This renders the real ProviderTopology through a FlowCanvas stub
// (jsdom cannot measure ReactFlow's layout) and drives the ON/AUTO/OFF toolbar.
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

const pushMock = vi.fn();

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));
vi.mock("@/shared/components/ProviderIcon", () => ({
  default: () => <span data-testid="icon" />,
}));
vi.mock("@/shared/components/flow/FlowCanvas", () => ({
  FlowCanvas: ({
    nodes,
    edges,
    nodeTypes,
    onNodeClick,
  }: {
    nodes: Array<{ id: string; type?: string; data: Record<string, unknown> }>;
    edges: Array<{ id: string; source: string; target: string }>;
    nodeTypes?: Record<string, React.ComponentType<{ data: Record<string, unknown> }>>;
    onNodeClick?: (event: unknown, node: unknown) => void;
  }) => (
    <div>
      {nodes.map((n) => {
        const Comp = n.type ? nodeTypes?.[n.type] : undefined;
        const edge = edges.find((e) => e.target === n.id);
        return (
          <div
            key={n.id}
            data-testid={n.id}
            data-type={n.type}
            data-edge-source={edge?.source ?? ""}
            onClick={(e) => onNodeClick?.(e, n)}
          >
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

const ProviderTopology = (await import("../../../src/app/(dashboard)/home/ProviderTopology"))
  .default;

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

const PROVIDERS = [
  { id: "a", provider: "openai", name: "OpenAI", status: "active" },
  { id: "b", provider: "anthropic", name: "Anthropic", status: "active" },
];

function render(
  activeRequests: Array<{ provider: string; model: string }>,
  recentRequests: Array<{ provider: string; model: string }> = []
) {
  act(() => {
    root.render(
      <ProviderTopology
        providers={PROVIDERS as never}
        activeRequests={activeRequests}
        recentRequests={recentRequests}
        lastProvider=""
        errorProvider=""
      />
    );
  });
}

const modelNodes = () => Array.from(container.querySelectorAll('[data-type="model"]'));
const modeButton = (key: string) =>
  Array.from(container.querySelectorAll("button")).find(
    (b) => b.textContent === key
  ) as HTMLButtonElement;

it("AUTO by default: one live model hangs off its provider", () => {
  render([{ provider: "openai", model: "gpt-4o" }], [{ provider: "openai", model: "gpt-4.1" }]);

  expect(modeButton("topologyModelsAuto").getAttribute("aria-pressed")).toBe("true");
  const models = modelNodes();
  expect(models).toHaveLength(1);
  const node = models[0] as HTMLElement;
  expect(node.dataset.testid).toBe("model-openai-gpt-4o");
  expect(node.dataset.edgeSource).toBe("provider-openai");
  expect(node.textContent).toContain("gpt-4o");
  // The live model pulses.
  expect(node.querySelector(".animate-ping")).not.toBeNull();
});

it("AUTO with no traffic leaves the map at providers only", () => {
  render([], [{ provider: "openai", model: "gpt-4.1" }]);
  expect(modelNodes()).toHaveLength(0);
  expect(container.querySelector('[data-testid="provider-openai"]')).not.toBeNull();
});

it("ON adds recently used models as idle sub-nodes; OFF hides every model", () => {
  render([{ provider: "openai", model: "gpt-4o" }], [{ provider: "anthropic", model: "claude-x" }]);

  act(() => modeButton("topologyModelsOn").click());
  const ids = modelNodes().map((n) => (n as HTMLElement).dataset.testid);
  expect(ids).toEqual(["model-openai-gpt-4o", "model-anthropic-claude-x"]);
  const idle = container.querySelector('[data-testid="model-anthropic-claude-x"]') as HTMLElement;
  expect(idle.dataset.edgeSource).toBe("provider-anthropic");
  expect(idle.querySelector(".animate-ping")).toBeNull();

  act(() => modeButton("topologyModelsOff").click());
  expect(modeButton("topologyModelsOff").getAttribute("aria-pressed")).toBe("true");
  expect(modelNodes()).toHaveLength(0);
});

it("clicking a model node opens its provider", () => {
  render([{ provider: "openai", model: "gpt-4o" }]);
  act(() => (modelNodes()[0] as HTMLElement).click());
  expect(pushMock).toHaveBeenCalledWith("/dashboard/providers/openai");
});
