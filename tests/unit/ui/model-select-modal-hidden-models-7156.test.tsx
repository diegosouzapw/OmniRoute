// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ModelSelectModal from "@/shared/components/ModelSelectModal";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const roots: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

async function render(props: React.ComponentProps<typeof ModelSelectModal>): Promise<HTMLDivElement> {
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
      if (url.includes("/api/combos")) return new Response(JSON.stringify({ combos: [] }), { status: 200 });
      if (url.includes("/api/provider-nodes")) return new Response(JSON.stringify({ nodes: [] }), { status: 200 });
      if (url.includes("/api/provider-models")) {
        return new Response(
          JSON.stringify({
            models: {
              requesty: [
                { id: "visible-model-1", name: "Visible Model", source: "imported" },
                { id: "hidden-model-1", name: "Hidden Model", source: "imported", isHidden: true },
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
  for (const { root, el } of roots.splice(0)) { act(() => root.unmount()); el.remove(); }
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

describe("ModelSelectModal hidden-model filtering (#7156)", () => {
  it("does not list a custom model explicitly flagged isHidden:true", async () => {
    const el = await render({
      isOpen: true, onClose: vi.fn(), onSelect: vi.fn(),
      activeProviders: [{ provider: "requesty", id: "conn-1" }],
      modelAliases: {}, title: "Add model to combo",
    });
    await act(async () => { await new Promise((r) => setTimeout(r, 0)); });
    expect(el.textContent).toContain("Visible Model");
    expect(el.textContent).not.toContain("Hidden Model");
  });
});
