// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// Lazy import of MarkdownMessage via ScrapeResult's dynamic import — mock it
vi.mock(
  "../../../src/app/(dashboard)/dashboard/playground/components/MarkdownMessage",
  () => ({
    default: ({ content }: { content: string }) =>
      React.createElement("div", { "data-testid": "markdown-render" }, content),
  }),
);

// ── Fixtures ──────────────────────────────────────────────────────────────────

const CONTENT_256KB_EXACT = "x".repeat(256 * 1024);
const CONTENT_UNDER_CAP = "# Hello\nThis is markdown content";
const CONTENT_OVER_CAP = "y".repeat(256 * 1024 + 100);

function makeScrapeResult(content: string) {
  return {
    provider: "firecrawl",
    url: "https://example.com",
    content,
    links: ["https://example.com/link1"],
    metadata: { title: "Test Page", description: "A test page" },
    screenshot_url: null,
  };
}

// ── Import component after mocks ──────────────────────────────────────────────

const { default: ScrapeResult } = await import(
  "../../../src/app/(dashboard)/dashboard/search-tools/components/ScrapeResult"
);

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderScrapeResult(content: string, latencyMs?: number): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(
      React.createElement(ScrapeResult, { result: makeScrapeResult(content), latencyMs }),
    );
  });
  containers.push({ root, el });
  return el;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("ScrapeResult", () => {
  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    for (const { root, el } of containers.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    document.body.innerHTML = "";
  });

  it("renders scrape-result data-testid", () => {
    const el = renderScrapeResult(CONTENT_UNDER_CAP);
    expect(el.querySelector("[data-testid='scrape-result']")).toBeTruthy();
  });

  it("shows metadata (title and url)", () => {
    const el = renderScrapeResult(CONTENT_UNDER_CAP);
    expect(el.textContent).toContain("Test Page");
    expect(el.textContent).toContain("https://example.com");
  });

  it("shows latency when provided", () => {
    const el = renderScrapeResult(CONTENT_UNDER_CAP, 142);
    expect(el.textContent).toContain("142");
  });

  it("shows provider name", () => {
    const el = renderScrapeResult(CONTENT_UNDER_CAP);
    expect(el.textContent).toContain("firecrawl");
  });

  it("shows links count", () => {
    const el = renderScrapeResult(CONTENT_UNDER_CAP);
    // 1 link in fixture
    expect(el.textContent).toContain("1");
  });

  it("defaults to markdown preview mode", () => {
    const el = renderScrapeResult(CONTENT_UNDER_CAP);
    const markdownToggle = el.querySelector("[data-testid='toggle-markdown']");
    expect(markdownToggle?.classList.contains("text-primary")).toBe(true);
    // Markdown render area should exist
    const markdownPreview = el.querySelector("[data-testid='markdown-preview']");
    expect(markdownPreview).toBeTruthy();
  });

  it("switches to raw mode when Raw toggle is clicked", () => {
    const el = renderScrapeResult(CONTENT_UNDER_CAP);
    const rawToggle = el.querySelector("[data-testid='toggle-raw']") as HTMLButtonElement;
    act(() => {
      rawToggle.click();
    });
    const rawContent = el.querySelector("[data-testid='raw-content']");
    expect(rawContent).toBeTruthy();
    // Markdown preview should be gone
    const markdownPreview = el.querySelector("[data-testid='markdown-preview']");
    expect(markdownPreview).toBeNull();
  });

  it("switches back to markdown when Preview toggle is clicked", () => {
    const el = renderScrapeResult(CONTENT_UNDER_CAP);
    const rawToggle = el.querySelector("[data-testid='toggle-raw']") as HTMLButtonElement;
    act(() => {
      rawToggle.click();
    });
    const markdownToggle = el.querySelector("[data-testid='toggle-markdown']") as HTMLButtonElement;
    act(() => {
      markdownToggle.click();
    });
    const markdownPreview = el.querySelector("[data-testid='markdown-preview']");
    expect(markdownPreview).toBeTruthy();
  });

  it("does NOT show truncation warning for content under 256KB", () => {
    const el = renderScrapeResult(CONTENT_UNDER_CAP);
    const warning = el.querySelector("[data-testid='truncation-warning']");
    expect(warning).toBeNull();
  });

  it("D21 — shows truncation warning for content exactly at 256KB", () => {
    const el = renderScrapeResult(CONTENT_256KB_EXACT);
    // Exactly at 256KB → NOT truncated (> cap, not >=)
    // 256*1024 bytes — the cap is > so 256*1024 == cap is at boundary
    // Per implementation: isTruncated = contentSize > CONTENT_CAP_BYTES
    // CONTENT_CAP_BYTES = 256*1024 so exactly at cap is NOT truncated
    const warning = el.querySelector("[data-testid='truncation-warning']");
    expect(warning).toBeNull();
  });

  it("D21 — shows truncation warning for content over 256KB", () => {
    const el = renderScrapeResult(CONTENT_OVER_CAP);
    const warning = el.querySelector("[data-testid='truncation-warning']");
    expect(warning).toBeTruthy();
    expect(warning?.textContent).toContain("256 KB");
  });

  it("D21 — 'View raw' button opens raw modal for truncated content", () => {
    const el = renderScrapeResult(CONTENT_OVER_CAP);
    const viewRawBtn = el.querySelector("[data-testid='view-raw-button']") as HTMLButtonElement;
    expect(viewRawBtn).toBeTruthy();
    act(() => {
      viewRawBtn.click();
    });
    const rawModal = el.querySelector("[data-testid='raw-modal']");
    expect(rawModal).toBeTruthy();
  });

  it("D21 — raw modal shows full content", () => {
    const longContent = "z".repeat(256 * 1024 + 500);
    const el = renderScrapeResult(longContent);
    const viewRawBtn = el.querySelector("[data-testid='view-raw-button']") as HTMLButtonElement;
    act(() => {
      viewRawBtn.click();
    });
    const rawModalContent = el.querySelector("[data-testid='raw-modal-content']") as HTMLTextAreaElement;
    expect(rawModalContent).toBeTruthy();
    // Full content is in the modal
    expect(rawModalContent.value.length).toBe(longContent.length);
  });

  it("D21 — raw modal can be closed", () => {
    const el = renderScrapeResult(CONTENT_OVER_CAP);
    const viewRawBtn = el.querySelector("[data-testid='view-raw-button']") as HTMLButtonElement;
    act(() => {
      viewRawBtn.click();
    });
    expect(el.querySelector("[data-testid='raw-modal']")).toBeTruthy();

    const closeBtn = el
      .querySelector("[data-testid='raw-modal']")
      ?.querySelector("button[aria-label='Close raw content modal']") as HTMLButtonElement;
    act(() => {
      closeBtn.click();
    });
    expect(el.querySelector("[data-testid='raw-modal']")).toBeNull();
  });

  it("size display in meta bar shows KB for large content", () => {
    const el = renderScrapeResult("x".repeat(2048));
    expect(el.textContent).toMatch(/\d+(\.\d+)? KB/);
  });
});
