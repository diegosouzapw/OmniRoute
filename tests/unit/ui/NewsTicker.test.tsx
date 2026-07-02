// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

let currentLocale = "en";

vi.mock("next-intl", () => ({
  useLocale: () => currentLocale,
}));

// ── Import after mocks ────────────────────────────────────────────────────────

const { default: NewsTicker } = await import("@/shared/components/NewsTicker");

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: HTMLElement[] = [];

type NewsItem = { id: string; text: Record<string, string>; link?: string };

function mockNews(items: NewsItem[] | "reject"): void {
  globalThis.fetch = vi.fn(async () => {
    if (items === "reject") {
      return { ok: false, json: async () => [] } as unknown as Response;
    }
    return { ok: true, json: async () => items } as unknown as Response;
  }) as typeof fetch;
}

async function renderTicker(): Promise<HTMLElement> {
  const container = document.createElement("div");
  document.body.appendChild(container);
  containers.push(container);

  const root = createRoot(container);
  await act(async () => {
    root.render(<NewsTicker />);
  });
  // Flush the fetch microtask chain in the mount effect.
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
  return container;
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  currentLocale = "en";
});

afterEach(() => {
  while (containers.length > 0) {
    containers.pop()?.remove();
  }
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

// ── Tests ─────────────────────────────────────────────────────────────────────

const SAMPLE: NewsItem[] = [
  {
    id: "course",
    text: { "pt-BR": "Curso Omniroute", pt: "Curso Omniroute", en: "Omniroute Course" },
    link: "https://course.example.com",
  },
];

describe("NewsTicker", () => {
  it("renders the text localized to the active locale", async () => {
    currentLocale = "en";
    mockNews(SAMPLE);
    const container = await renderTicker();
    expect(container.textContent).toContain("Omniroute Course");
  });

  it("falls back to the base language when the exact locale is missing", async () => {
    // Only "pt" exists, active locale is the regional "pt-PT" → base "pt" wins.
    currentLocale = "pt-PT";
    mockNews([{ id: "x", text: { pt: "Notícia PT", en: "News EN" } }]);
    const container = await renderTicker();
    expect(container.textContent).toContain("Notícia PT");
  });

  it("falls back to English when neither the locale nor its base exist", async () => {
    currentLocale = "fr-FR";
    mockNews([{ id: "x", text: { en: "News EN", pt: "Notícia PT" } }]);
    const container = await renderTicker();
    expect(container.textContent).toContain("News EN");
  });

  it("renders a link with safe rel/target when an item has a link", async () => {
    mockNews(SAMPLE);
    const container = await renderTicker();
    const anchor = container.querySelector("a");
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute("href")).toBe("https://course.example.com");
    expect(anchor?.getAttribute("rel")).toContain("noopener");
    expect(anchor?.getAttribute("target")).toBe("_blank");
  });

  it("renders nothing when the news feed is empty", async () => {
    mockNews([]);
    const container = await renderTicker();
    expect(container.textContent).toBe("");
  });

  it("renders nothing when the fetch fails", async () => {
    mockNews("reject");
    const container = await renderTicker();
    expect(container.textContent).toBe("");
  });
});
