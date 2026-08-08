// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ModelSelectModal from "@/shared/components/ModelSelectModal";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

async function render(
  props: React.ComponentProps<typeof ModelSelectModal>
): Promise<HTMLDivElement> {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  await act(async () => {
    root.render(<ModelSelectModal {...props} />);
  });
  roots.push({ root, el });
  return el;
}

// Configurable fake backend shared across tests. Each test overrides the
// `models` payload (custom rows per provider), `hiddenModelsByProvider` (the
// unified map), `providerNodes`, and the live-fetch response used for the
// `/api/providers/:id/models` route.
let mockModels: Record<string, any[]>;
let mockHidden: Record<string, string[]>;
let mockNodes: any[];
let mockLiveModels: any[];
let liveFetchUrls: string[];

beforeEach(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
  mockModels = {};
  mockHidden = {};
  mockNodes = [];
  mockLiveModels = [];
  liveFetchUrls = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/api/combos"))
        return new Response(JSON.stringify({ combos: [] }), { status: 200 });
      if (url.includes("/api/provider-nodes"))
        return new Response(JSON.stringify({ nodes: mockNodes }), { status: 200 });
      if (url.includes("/api/provider-models")) {
        return new Response(
          JSON.stringify({
            models: mockModels,
            modelCompatOverrides: [],
            hiddenModelsByProvider: mockHidden,
          }),
          { status: 200 }
        );
      }
      if (url.includes("/api/providers/") && url.includes("/models")) {
        liveFetchUrls.push(url);
        return new Response(JSON.stringify({ models: mockLiveModels }), { status: 200 });
      }
      return new Response(JSON.stringify({}), { status: 200 });
    })
  );
});

afterEach(() => {
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

async function flush() {
  await act(async () => {
    await new Promise((r) => setTimeout(r, 0));
  });
  await act(async () => {
    await new Promise((r) => setTimeout(r, 0));
  });
}

describe("ModelSelectModal hidden-model filtering (#7156)", () => {
  it("does not list a custom model explicitly flagged isHidden:true", async () => {
    mockModels = {
      requesty: [
        { id: "visible-model-1", name: "Visible Model", source: "imported" },
        { id: "hidden-model-1", name: "Hidden Model", source: "imported", isHidden: true },
      ],
    };
    const el = await render({
      isOpen: true,
      onClose: vi.fn(),
      onSelect: vi.fn(),
      activeProviders: [{ provider: "requesty", id: "conn-1" }],
      modelAliases: {},
      title: "Add model to combo",
    });
    await flush();
    expect(el.textContent).toContain("Visible Model");
    expect(el.textContent).not.toContain("Hidden Model");
  });
});

describe("ModelSelectModal unified hidden-model filtering (#9203)", () => {
  it("hides a system catalog model flagged in the unified hidden map", async () => {
    mockHidden = { claude: ["claude-sonnet-4-6"] };
    const el = await render({
      isOpen: true,
      onClose: vi.fn(),
      onSelect: vi.fn(),
      activeProviders: [{ provider: "claude", id: "claude-conn" }],
      modelAliases: {},
      title: "Add model to combo",
    });
    await flush();
    // claude is a system-catalog provider — its entries come from the bundled catalog.
    expect(el.textContent).toContain("Claude Opus 4.7");
    expect(el.textContent).not.toContain("Claude Sonnet 4.6");
  });

  it("hides a hidden passthrough alias model", async () => {
    mockHidden = { requesty: ["alias-hidden"] };
    const el = await render({
      isOpen: true,
      onClose: vi.fn(),
      onSelect: vi.fn(),
      activeProviders: [{ provider: "requesty", id: "conn-1" }],
      modelAliases: {
        "Visible Alias": "requesty/alias-visible",
        "Hidden Alias": "requesty/alias-hidden",
      },
      title: "Add model to combo",
    });
    await flush();
    expect(el.textContent).toContain("Visible Alias");
    expect(el.textContent).not.toContain("Hidden Alias");
  });

  it("hides a hidden node alias model for a custom provider", async () => {
    mockNodes = [{ id: "openai-compatible-demo", name: "Demo Node", prefix: "demo-prefix" }];
    mockHidden = { "openai-compatible-demo": ["node-hidden"] };
    const el = await render({
      isOpen: true,
      onClose: vi.fn(),
      onSelect: vi.fn(),
      activeProviders: [{ provider: "openai-compatible-demo", id: "conn-demo" }],
      modelAliases: {
        "Node Visible": "openai-compatible-demo/node-visible",
        "Node Hidden": "openai-compatible-demo/node-hidden",
      },
      title: "Add model to combo",
    });
    await flush();
    expect(el.textContent).toContain("Node Visible");
    expect(el.textContent).not.toContain("Node Hidden");
  });

  it("hides a custom model referenced only in the unified hidden map (no isHidden flag)", async () => {
    mockModels = {
      "openai-compatible-demo": [
        { id: "custom-visible", name: "Custom Visible", source: "manual" },
        { id: "custom-map-hidden", name: "Custom Map Hidden", source: "manual" },
      ],
    };
    mockHidden = { "openai-compatible-demo": ["custom-map-hidden"] };
    const el = await render({
      isOpen: true,
      onClose: vi.fn(),
      onSelect: vi.fn(),
      activeProviders: [{ provider: "openai-compatible-demo", id: "conn-demo" }],
      modelAliases: {},
      title: "Add model to combo",
    });
    await flush();
    expect(el.textContent).toContain("Custom Visible");
    expect(el.textContent).not.toContain("Custom Map Hidden");
  });

  it("hides a hidden auto-fetched model and requests excludeHidden=true on the live route", async () => {
    mockLiveModels = [
      { id: "live-visible", name: "Live Visible" },
      { id: "live-hidden", name: "Live Hidden" },
    ];
    mockHidden = { "openai-compatible-demo": ["live-hidden"] };
    const el = await render({
      isOpen: true,
      onClose: vi.fn(),
      onSelect: vi.fn(),
      activeProviders: [{ provider: "openai-compatible-demo", id: "conn-demo" }],
      modelAliases: {},
      title: "Add model to combo",
    });
    await flush();
    expect(el.textContent).toContain("Live Visible");
    expect(el.textContent).not.toContain("Live Hidden");
    // The live provider-models route must receive excludeHidden=true.
    expect(liveFetchUrls.some((u) => u.includes("excludeHidden=true"))).toBe(true);
  });

  it("keeps models visible when the API omits hiddenModelsByProvider", async () => {
    // mockHidden is empty object — simulates an older/unchanged API response.
    mockModels = { requesty: [{ id: "m1", name: "Model One", source: "imported" }] };
    const el = await render({
      isOpen: true,
      onClose: vi.fn(),
      onSelect: vi.fn(),
      activeProviders: [{ provider: "requesty", id: "conn-1" }],
      modelAliases: {},
      title: "Add model to combo",
    });
    await flush();
    expect(el.textContent).toContain("Model One");
  });

  it("keeps models visible when hiddenModelsByProvider is malformed", async () => {
    // Force a malformed payload via a per-test fetch override.
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("/api/combos"))
          return new Response(JSON.stringify({ combos: [] }), { status: 200 });
        if (url.includes("/api/provider-nodes"))
          return new Response(JSON.stringify({ nodes: [] }), { status: 200 });
        if (url.includes("/api/provider-models")) {
          return new Response(
            JSON.stringify({
              models: { requesty: [{ id: "m1", name: "Model One", source: "imported" }] },
              modelCompatOverrides: [],
              hiddenModelsByProvider: { requesty: "not-an-array" },
            }),
            { status: 200 }
          );
        }
        return new Response(JSON.stringify({}), { status: 200 });
      })
    );
    const el = await render({
      isOpen: true,
      onClose: vi.fn(),
      onSelect: vi.fn(),
      activeProviders: [{ provider: "requesty", id: "conn-1" }],
      modelAliases: {},
      title: "Add model to combo",
    });
    await flush();
    expect(el.textContent).toContain("Model One");
  });

  it("scopes hidden models per provider (same id visible under another provider)", async () => {
    mockModels = {
      requesty: [{ id: "shared-model", name: "Requesty Shared", source: "imported" }],
      "openai-compatible-demo": [{ id: "shared-model", name: "Demo Shared", source: "manual" }],
    };
    mockHidden = { requesty: ["shared-model"] };
    const el = await render({
      isOpen: true,
      onClose: vi.fn(),
      onSelect: vi.fn(),
      activeProviders: [
        { provider: "requesty", id: "conn-1" },
        { provider: "openai-compatible-demo", id: "conn-demo" },
      ],
      modelAliases: {},
      title: "Add model to combo",
    });
    await flush();
    expect(el.textContent).not.toContain("Requesty Shared");
    expect(el.textContent).toContain("Demo Shared");
  });
});
