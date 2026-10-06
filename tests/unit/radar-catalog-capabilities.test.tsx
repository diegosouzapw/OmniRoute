// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({ useTranslations: () => (key: string) => key }));
vi.mock("next/link", () => ({
  default: ({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props}>{children}</a>
  ),
}));

import { RadarCatalogTable } from "../../src/app/(dashboard)/dashboard/radar/RadarCatalogTable";

describe("Radar catalog capability knowledge", () => {
  let root: Root | undefined;
  let container: HTMLElement;

  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(null, { status: 503 }))
    );
  });

  afterEach(() => {
    if (root) act(() => root!.unmount());
    root = undefined;
    container.remove();
    vi.unstubAllGlobals();
  });

  it("distinguishes true, false, and unknown for every capability", async () => {
    root = createRoot(container);
    act(() => {
      root!.render(
        <RadarCatalogTable
          entries={[
            {
              provider: "groq",
              modelId: "llama",
              displayName: "Llama",
              monthlyTokens: 0,
              creditTokens: 0,
              freeType: "rate_only",
              poolKey: null,
              tos: "ok",
              origin: "radar",
              contextWindow: null,
              capabilities: { tools: true, vision: false, thinking: null },
            },
          ]}
          refreshCatalog={async () => undefined}
          onError={() => undefined}
        />
      );
    });

    expect(container.textContent).toContain("capTools ✓");
    expect(container.textContent).toContain("capVision ✕");
    expect(container.textContent).toContain("capThinking ?");
  });
});
