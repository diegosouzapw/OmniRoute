// @vitest-environment jsdom
// #2166 — ProviderIcon custom remote icon URL (`src` prop) support.
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const { onError, alt, ...rest } = props as { onError?: () => void; alt?: string } & Record<
      string,
      unknown
    >;
    // eslint-disable-next-line @next/next/no-img-element -- test double for next/image
    return <img data-testid="next-image" alt={alt || ""} onError={onError} {...rest} />;
  },
}));

const { default: ProviderIcon } = await import("@/shared/components/ProviderIcon");

// ── Helpers ───────────────────────────────────────────────────────────────────

// Deliberately not registered in @lobehub/icons aliases or the KNOWN_PNGS/KNOWN_SVGS
// static-asset sets, so tests exercise only the `src` override + generic-icon fallback
// paths, never the @lobehub/static resolution chain.
const UNKNOWN_PROVIDER_ID = "openai-compatible-test-node-xyz";

const containers: HTMLElement[] = [];

function renderIcon(props: Record<string, unknown>): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  act(() => {
    root.render(<ProviderIcon providerId={UNKNOWN_PROVIDER_ID} {...props} />);
  });
  return container;
}

function fireImgError(container: HTMLElement) {
  const img = container.querySelector("img");
  if (!img) throw new Error("expected an <img> element to fire error on");
  act(() => {
    img.dispatchEvent(new Event("error"));
  });
}

beforeEach(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
    true;
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("ProviderIcon — custom remote icon URL (#2166)", () => {
  it("renders an <img> with the given src when `src` is set", () => {
    const container = renderIcon({ src: "https://example.com/logo.png", size: 32 });
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img?.getAttribute("src")).toBe("https://example.com/logo.png");
  });

  it("falls back to the generic icon when `src` is unset", () => {
    const container = renderIcon({});
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("falls back to the generic (lobehub/static) icon chain when `src` load fails and no fallbackText is given", () => {
    const container = renderIcon({ src: "https://example.com/broken.png" });
    expect(container.querySelector("img")).not.toBeNull();

    fireImgError(container);

    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector("svg")).not.toBeNull();
  });

  it("falls back to a text badge when `src` load fails and fallbackText is given", () => {
    const container = renderIcon({
      src: "https://example.com/broken.png",
      fallbackText: "OC",
      fallbackColor: "#10A37F",
    });
    expect(container.querySelector("img")).not.toBeNull();

    fireImgError(container);

    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector("svg")).toBeNull();
    expect(container.textContent).toBe("OC");
  });

  it("ignores a whitespace-only src and falls back to the generic icon", () => {
    const container = renderIcon({ src: "   " });
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector("svg")).not.toBeNull();
  });
});
