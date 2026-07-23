// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// ── Import component at module level (after mocks) ────────────────────────────

const { default: MarkdownMessage } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/MarkdownMessage"
);

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderMarkdown(content: string, className?: string): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<MarkdownMessage content={content} className={className} />);
  });
  containers.push({ root, el });
  return el;
}

async function waitForCondition(fn: () => boolean, timeoutMs = 3000): Promise<void> {
  const start = Date.now();
  while (!fn()) {
    if (Date.now() - start > timeoutMs) throw new Error("waitForCondition timed out");
    await new Promise((r) => setTimeout(r, 20));
  }
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("MarkdownMessage", () => {
  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean })
      .IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    for (const { root, el } of containers.splice(0)) {
      act(() => root.unmount());
      el.remove();
    }
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("renders a code block as <pre><code>", async () => {
    const el = renderMarkdown("```js\nconsole.log(1)\n```");
    // Wait for the component to render
    await waitForCondition(() => el.innerHTML.length > 0);

    const pre = el.querySelector("pre");
    const code = el.querySelector("code");
    expect(pre || code).toBeTruthy();
    expect(el.innerHTML).toContain("console.log");
  });

  it("renders a markdown table as <table>", async () => {
    const tableMarkdown = `
| Name | Age |
|------|-----|
| Alice | 30 |
| Bob | 25 |
`;
    const el = renderMarkdown(tableMarkdown);
    await waitForCondition(() => el.innerHTML.length > 0);

    const table = el.querySelector("table");
    expect(table).toBeTruthy();

    const cells = el.querySelectorAll("td");
    expect(cells.length).toBeGreaterThan(0);
  });

  it("renders a markdown list as <ul><li>", async () => {
    const listMarkdown = `
- Item one
- Item two
- Item three
`;
    const el = renderMarkdown(listMarkdown);
    await waitForCondition(() => el.querySelector("ul") !== null);

    const ul = el.querySelector("ul");
    expect(ul).toBeTruthy();

    const listItems = el.querySelectorAll("li");
    expect(listItems.length).toBe(3);
  });

  it("renders a markdown link as <a href>", async () => {
    const el = renderMarkdown("[Click here](https://example.com)");
    await waitForCondition(() => el.querySelector("a") !== null);

    const anchor = el.querySelector("a");
    expect(anchor).toBeTruthy();
    expect(anchor?.getAttribute("href")).toBe("https://example.com");
  });

  it("security: <script> tags appear as literal text, not executed", () => {
    const xssContent = "<script>alert(1)</script>";
    const el = renderMarkdown(xssContent);

    // Should NOT contain a <script> element in the DOM
    const scriptEl = el.querySelector("script");
    expect(scriptEl).toBeNull();

    // react-markdown by default does not render raw HTML
    // The content should not create a <script> tag
    const innerHTML = el.innerHTML;
    expect(innerHTML).not.toContain("<script>");
  });

  it("renders plain text content", async () => {
    const el = renderMarkdown("Hello, world!");
    await waitForCondition(() => el.textContent !== null && el.textContent.includes("Hello"));

    expect(el.textContent).toContain("Hello, world!");
  });

  it("accepts optional className prop", () => {
    const el = renderMarkdown("Text", "my-custom-class");

    // The wrapper div should have the class
    const wrapper = el.firstElementChild;
    expect(wrapper).toBeTruthy();
    expect(wrapper?.classList.contains("my-custom-class")).toBe(true);
  });

  it("renders strong and emphasis formatting", async () => {
    const el = renderMarkdown("**bold text** and _italic text_");
    await waitForCondition(
      () => el.querySelector("strong") !== null || el.querySelector("em") !== null,
    );

    const strong = el.querySelector("strong");
    const em = el.querySelector("em");
    expect(strong).toBeTruthy();
    expect(em).toBeTruthy();
  });
});
