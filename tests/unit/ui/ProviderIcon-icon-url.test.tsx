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
// static-asset sets, so tests exercise only the `src` override + fallback chain
// (thesvg.org → generic icon). Never reaches the local SVG or @lobehub tiers.
const UNKNOWN_PROVIDER_ID = "openai-compatible-test-node-xyz";

const PROVIDER_IDS_WITHOUT_LOCAL_ASSET_PROVENANCE = [
  "api-airforce",
  "apikey",
  "bazaarlink",
  "brave-search",
  "brave",
  "byteplus",
  "cartesia",
  "cheaperinference",
  "chipotle",
  "clarifai",
  "command-code",
  "digitalocean",
  "docker-model-runner",
  "droid",
  "duckduckgo-web",
  "freebuff",
  "gitlab-duo",
  "gitlab",
  "haiper",
  "ideogram",
  "inworld",
  "kilo-gateway",
  "kilocode",
  "leonardo",
  "modal",
  "modelscope",
  "nimble-search",
  "nlpcloud",
  "oauth",
  "oci",
  "opencode",
  "openference",
  "playht",
  "qianfan",
  "qiniu",
  "qwencloud",
  "sap",
  "scaleway",
  "searxng-search",
  "serper-search",
  "soniox",
  "synthetic",
  "unorouter",
  "wandb",
  "youcom-search",
  "adapta-web",
  "agentrouter",
  "aimlapi",
  "anthropic-m",
  "blackbox-web",
  "blackbox",
  "cliproxyapi",
  "dahl",
  "empower",
  "gigachat",
  "inner-ai",
  "ironclaw",
  "kie",
  "lemonade",
  "linkup-search",
  "llamafile",
  "llamagate",
  "logfare",
  "maritalk",
  "nanobot",
  "nanogpt",
  "nscale",
  "oai-cc",
  "oai-r",
  "piapi",
  "predibase",
  "reka",
  "zeroclaw",
  "lmarena",
  "lma",
  "opencode-go",
  "opencode-zen",
  "qwen-cloud",
  "qwen-cloud-token-plan",
] as const;

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
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
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

  it("falls back to thesvg.org CDN when `src` is unset for an unknown provider", () => {
    const container = renderIcon({});
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img?.getAttribute("src")).toBe(
      "https://thesvg.org/icons/openai-compatible-test-node-xyz/default.svg"
    );
  });

  it("falls back through thesvg.org CDN then generic icon when `src` load fails and no fallbackText is given", () => {
    const container = renderIcon({ src: "https://example.com/broken.png" });
    expect(container.querySelector("img")).not.toBeNull();

    fireImgError(container);

    // Falls back to thesvg.org
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img?.getAttribute("src")).toBe(
      "https://thesvg.org/icons/openai-compatible-test-node-xyz/default.svg"
    );

    fireImgError(container);

    // thesvg.org fails → generic SVG icon
    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector('svg[data-provider-icon="generic"]')).not.toBeNull();
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

  it("ignores a whitespace-only src and falls back to thesvg.org CDN", () => {
    const container = renderIcon({ src: "   " });
    const img = container.querySelector("img");
    expect(img).not.toBeNull();
    expect(img?.getAttribute("src")).toBe(
      "https://thesvg.org/icons/openai-compatible-test-node-xyz/default.svg"
    );
  });

  it("keeps an operator src override for a guarded ID, then falls back directly to generic", () => {
    const container = renderIcon({
      providerId: "opencode",
      src: "https://example.com/operator-opencode.svg",
      size: 32,
    });

    expect(container.querySelector("img")?.getAttribute("src")).toBe(
      "https://example.com/operator-opencode.svg"
    );

    fireImgError(container);

    expect(container.querySelector("img")).toBeNull();
    expect(container.querySelector('svg[data-provider-icon="generic"]')).not.toBeNull();
    expect(container.innerHTML).not.toContain("thesvg.org");
  });
});

describe("ProviderIcon — local SVG dimensions", () => {
  it.each([
    ["cline", "/providers/cline.svg"],
    ["kimi-coding", "/providers/kimi-logomark-light.svg"],
    ["opper", "/providers/opper.svg"],
  ])("gives %s a definite square layout size", (providerId, expectedSrc) => {
    const container = renderIcon({ providerId, size: 24 });
    const img = container.querySelector(`img[src="${expectedSrc}"]`);

    expect(img).not.toBeNull();
    expect(img?.style.width).toBe("24px");
    expect(img?.style.height).toBe("24px");
    expect(img?.style.objectFit).toBe("contain");
    expect(img?.style.maxWidth).toBe("");
    expect(img?.style.maxHeight).toBe("");
  });
});

describe("ProviderIcon — unresolved local asset provenance", () => {
  it("covers the complete provider and alias inventory", () => {
    expect(PROVIDER_IDS_WITHOUT_LOCAL_ASSET_PROVENANCE).toHaveLength(79);
    expect(new Set(PROVIDER_IDS_WITHOUT_LOCAL_ASSET_PROVENANCE)).toHaveLength(79);
  });

  it.each(PROVIDER_IDS_WITHOUT_LOCAL_ASSET_PROVENANCE)(
    "renders the internal generic icon for %s without contacting an icon CDN",
    (providerId) => {
      const container = renderIcon({ providerId, size: 32 });

      expect(container.querySelector("img")).toBeNull();
      expect(container.querySelector('svg[data-provider-icon="generic"]')).not.toBeNull();
      expect(container.innerHTML).not.toContain("thesvg.org");
    }
  );
});

// #11853 follow-up: getLobeProviderIcon() itself is already guarded by #11880's
// Object.hasOwn() checks (see lobe-provider-icons-prototype-collision-11853.test.ts).
// This covers the three *other* plain-object lookups ProviderIcon.tsx does on its own
// (PROVIDER_ICON_ALIASES, LOCAL_SVG_ALIASES, THEMED_SVGS) — none of which #11880 touched —
// which resolved the same inherited-property ids through the prototype chain before
// falling through to the thesvg.org unknown-provider CDN path.
describe("ProviderIcon — inherited object property ids", () => {
  it.each(["constructor", "valueOf", "hasOwnProperty", "__proto__"])(
    "renders provider id %s through the unknown-provider fallback",
    (providerId) => {
      const container = renderIcon({ providerId });
      const img = container.querySelector("img");

      expect(img).not.toBeNull();
      expect(img?.getAttribute("src")).toBe(
        `https://thesvg.org/icons/${providerId.toLowerCase()}/default.svg`
      );
    }
  );
});
