// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ModelSelectModal from "@/shared/components/ModelSelectModal";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const roots: Array<{ root: Root; el: HTMLDivElement }> = [];

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

beforeEach(() => {
  (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
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
            models: {
              requesty: [
                { id: "m1", name: "Model One" },
                { id: "m2", name: "Model Two" },
                { id: "m3", name: "Model Three" },
              ],
            },
            modelCompatOverrides: [],
          }),
          { status: 200 }
        );
      }
      return new Response(JSON.stringify({}), { status: 200 });
    })
  );
});

afterEach(() => {
  localStorage.removeItem("modelSelectShowConfiguredOnly");
  for (const { root, el } of roots.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("ModelSelectModal connection filter toggle", () => {
  it("hides models excluded by all connections when toggle is on", async () => {
    const el = await render({
      isOpen: true,
      onClose: vi.fn(),
      onSelect: vi.fn(),
      activeProviders: [
        {
          provider: "requesty",
          id: "conn-1",
          providerSpecificData: { excludedModels: ["m3"] },
        } as any,
      ],
      modelAliases: {},
      title: "Add model to combo",
    });

    // Wait for custom models to load from the mocked API
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    // With toggle off (default) — all models visible
    expect(el.textContent).toContain("Model One");
    expect(el.textContent).toContain("Model Two");
    expect(el.textContent).toContain("Model Three");
    expect(el.textContent).toContain("showConfiguredOnly");

    // Find and click the checkbox
    const checkbox = el.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox).not.toBeNull();

    await act(async () => {
      checkbox.click();
    });

    // Wait for React state update and re-render
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    // Toggle on — m3 excluded by "conn-1" should be hidden
    expect(el.textContent).toContain("Model One");
    expect(el.textContent).toContain("Model Two");
    expect(el.textContent).not.toContain("Model Three");

    // Toggle off again should restore m3
    await act(async () => {
      checkbox.click();
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(el.textContent).toContain("Model One");
    expect(el.textContent).toContain("Model Two");
    expect(el.textContent).toContain("Model Three");
  });

  it("shows empty state when toggle on and all models are excluded by connections", async () => {
    const el = await render({
      isOpen: true,
      onClose: vi.fn(),
      onSelect: vi.fn(),
      activeProviders: [
        {
          provider: "requesty",
          id: "conn-1",
          providerSpecificData: { excludedModels: ["m1", "m2", "m3"] },
        } as any,
      ],
      modelAliases: {},
      title: "Add model to combo",
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    // Toggle off (default) — all models visible
    expect(el.textContent).toContain("Model One");
    expect(el.textContent).toContain("Model Three");

    const checkbox = el.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox).not.toBeNull();

    // Toggle on — all models excluded
    await act(async () => {
      checkbox.click();
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(el.textContent).not.toContain("Model One");
    expect(el.textContent).not.toContain("Model Two");
    expect(el.textContent).not.toContain("Model Three");
    expect(el.textContent).toContain("noModelsFound");

    // Toggle off — models return
    await act(async () => {
      checkbox.click();
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    expect(el.textContent).toContain("Model One");
    expect(el.textContent).toContain("Model Three");
  });

  it("drops provider group when all its models are excluded by connections", async () => {
    const el = await render({
      isOpen: true,
      onClose: vi.fn(),
      onSelect: vi.fn(),
      activeProviders: [
        {
          provider: "requesty",
          id: "conn-1",
          providerSpecificData: { excludedModels: [] },
        } as any,
        {
          provider: "openai",
          id: "conn-2",
          providerSpecificData: { excludedModels: ["*"] },
        } as any,
      ],
      modelAliases: {},
      title: "Add model to combo",
    });

    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    // Toggle off — both provider groups visible
    expect(el.textContent).toContain("Model One");
    // openai has system models — but we just verify at least one is shown
    expect(el.textContent).toContain("showConfiguredOnly");

    const checkbox = el.querySelector('input[type="checkbox"]') as HTMLInputElement;
    expect(checkbox).not.toBeNull();

    // Toggle on — openai all models excluded via "*" wildcard → group dropped
    await act(async () => {
      checkbox.click();
    });
    await act(async () => {
      await new Promise((r) => setTimeout(r, 0));
    });

    // requesty models still visible
    expect(el.textContent).toContain("Model One");
    expect(el.textContent).toContain("Model Two");
    expect(el.textContent).toContain("Model Three");
    // openai models excluded — provider group dropped
    expect(el.textContent).not.toContain("noModelsFound");
  });
});
