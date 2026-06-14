// @vitest-environment jsdom
/**
 * Tests for CompressionPreviewAccordion (F7).
 *
 * Coverage targets:
 *   - smoke render (component mounts without errors)
 *   - lazy-render guard (D7): children only mount after accordion opens
 *   - mode select changes (off / lite / standard / aggressive / ultra)
 *   - Preview button dispatches POST /api/compression/preview with { messages, mode }
 *   - result grid (4 cards) renders on success
 *   - error path is sanitized (no stack-trace leak — "at /" not in DOM)
 */

import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ---------------------------------------------------------------------------
// Module mocks
// ---------------------------------------------------------------------------

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// Stub shared components
vi.mock("@/shared/components", () => ({
  Button: ({
    children,
    onClick,
    disabled,
    loading: _loading,
    icon: _icon,
    className: _className,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    icon?: string;
    className?: string;
  }) => (
    <button data-testid="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
  Select: ({
    value,
    onChange,
    options,
    className: _className,
    "aria-label": ariaLabel,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: ReadonlyArray<{ value: string; label: string }>;
    className?: string;
    "aria-label"?: string;
  }) => (
    <select data-testid="select" value={value} aria-label={ariaLabel} onChange={onChange}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  ),
}));

// Stub cn utility
vi.mock("@/shared/utils/cn", () => ({
  cn: (...classes: (string | undefined | false)[]) => classes.filter(Boolean).join(" "),
}));

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

async function renderComponent(
  props: {
    forceOpen?: boolean;
    inputContent?: string;
    onOpenChange?: (open: boolean) => void;
  } = {},
) {
  const { default: CompressionPreviewAccordion } = await import(
    "@/app/(dashboard)/dashboard/translator/components/advanced/CompressionPreviewAccordion"
  );
  const container = makeContainer();
  const root = createRoot(container);
  await act(async () => {
    root.render(<CompressionPreviewAccordion {...props} />);
  });
  return { container, root };
}

/** Click the accordion toggle button to open/close it. */
async function clickToggle(container: HTMLElement) {
  const btn = container.querySelector(
    "button[aria-expanded]",
  ) as HTMLButtonElement | null;
  expect(btn).toBeTruthy();
  await act(async () => {
    btn?.click();
  });
}

// ---------------------------------------------------------------------------
// Setup / teardown
// ---------------------------------------------------------------------------

beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  vi.clearAllMocks();
});

afterEach(() => {
  while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
  document.body.innerHTML = "";
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("CompressionPreviewAccordion — export", () => {
  it("exports a default function component", async () => {
    const mod = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/CompressionPreviewAccordion"
    );
    expect(typeof mod.default).toBe("function");
  });
});

describe("CompressionPreviewAccordion — smoke render", () => {
  it("renders without crashing (closed by default)", async () => {
    const { container } = await renderComponent();
    expect(container.querySelector("[data-testid='compression-accordion']")).toBeTruthy();
  });

  it("renders the toggle button with compress icon and i18n title", async () => {
    const { container } = await renderComponent();
    // compress icon in header
    const icons = container.querySelectorAll(".material-symbols-outlined");
    const iconTexts = Array.from(icons).map((el) => el.textContent?.trim());
    expect(iconTexts).toContain("compress");

    // title text (mock returns the key)
    const text = container.textContent ?? "";
    expect(text).toContain("advancedCompressionTitle");
  });

  it("renders the subtitle", async () => {
    const { container } = await renderComponent();
    const text = container.textContent ?? "";
    expect(text).toContain("advancedCompressionSubtitle");
  });

  it("toggle button starts closed (aria-expanded=false)", async () => {
    const { container } = await renderComponent();
    const btn = container.querySelector("button[aria-expanded]");
    expect(btn?.getAttribute("aria-expanded")).toBe("false");
  });

  it("toggle button starts open when forceOpen=true (aria-expanded=true)", async () => {
    const { container } = await renderComponent({ forceOpen: true });
    const btn = container.querySelector("button[aria-expanded]");
    expect(btn?.getAttribute("aria-expanded")).toBe("true");
  });
});

describe("CompressionPreviewAccordion — lazy-render guard (D7)", () => {
  it("does NOT mount content when closed (forceOpen=false)", async () => {
    const { container } = await renderComponent({ forceOpen: false });
    // Content region should not exist
    expect(container.querySelector("#compression-preview-content")).toBeNull();
    // Mode select should not be in DOM
    expect(container.querySelector("[data-testid='select']")).toBeNull();
  });

  it("mounts content after opening accordion", async () => {
    const { container } = await renderComponent({ forceOpen: false });

    // Initially closed
    expect(container.querySelector("[data-testid='select']")).toBeNull();

    // Open
    await clickToggle(container);

    // Content should now be mounted
    expect(container.querySelector("#compression-preview-content")).toBeTruthy();
    expect(container.querySelector("[data-testid='select']")).toBeTruthy();
  });

  it("mounts content immediately when forceOpen=true", async () => {
    const { container } = await renderComponent({ forceOpen: true });
    expect(container.querySelector("#compression-preview-content")).toBeTruthy();
    expect(container.querySelector("[data-testid='select']")).toBeTruthy();
  });

  it("toggle opens accordion (aria-expanded flips to true)", async () => {
    const { container } = await renderComponent();
    const btn = container.querySelector("button[aria-expanded]");
    expect(btn?.getAttribute("aria-expanded")).toBe("false");

    await clickToggle(container);
    expect(btn?.getAttribute("aria-expanded")).toBe("true");
  });

  it("toggle closes accordion again (aria-expanded flips back to false)", async () => {
    const { container } = await renderComponent({ forceOpen: true });
    const btn = container.querySelector("button[aria-expanded]");
    expect(btn?.getAttribute("aria-expanded")).toBe("true");

    await clickToggle(container);
    expect(btn?.getAttribute("aria-expanded")).toBe("false");
  });

  it("calls onOpenChange with true when opening", async () => {
    const onOpenChange = vi.fn();
    const { container } = await renderComponent({ forceOpen: false, onOpenChange });
    await clickToggle(container);
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("calls onOpenChange with false when closing", async () => {
    const onOpenChange = vi.fn();
    const { container } = await renderComponent({ forceOpen: true, onOpenChange });
    await clickToggle(container);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});

describe("CompressionPreviewAccordion — empty state", () => {
  it("shows empty-state hint when inputContent is empty string", async () => {
    const { container } = await renderComponent({ forceOpen: true, inputContent: "" });
    const text = container.textContent ?? "";
    expect(text).toContain("compressionEmptyHint");
  });

  it("shows empty-state hint when inputContent is absent", async () => {
    const { container } = await renderComponent({ forceOpen: true });
    const text = container.textContent ?? "";
    expect(text).toContain("compressionEmptyHint");
  });

  it("Preview button is disabled when inputContent is empty", async () => {
    const { container } = await renderComponent({ forceOpen: true, inputContent: "" });
    const btn = container.querySelector("[data-testid='button']") as HTMLButtonElement | null;
    expect(btn?.disabled).toBe(true);
  });

  it("shows preview button enabled when inputContent is non-empty", async () => {
    const { container } = await renderComponent({
      forceOpen: true,
      inputContent: JSON.stringify({ messages: [{ role: "user", content: "Hello" }] }),
    });
    const btn = container.querySelector("[data-testid='button']") as HTMLButtonElement | null;
    expect(btn).toBeTruthy();
    expect(btn?.disabled).toBe(false);
  });
});

describe("CompressionPreviewAccordion — mode select", () => {
  const MODES = ["off", "lite", "standard", "aggressive", "ultra"] as const;

  it("renders all 5 mode options", async () => {
    const { container } = await renderComponent({ forceOpen: true, inputContent: "hello" });
    const select = container.querySelector("[data-testid='select']") as HTMLSelectElement | null;
    expect(select).toBeTruthy();
    const options = Array.from(select?.options ?? []).map((o) => o.value);
    for (const mode of MODES) {
      expect(options).toContain(mode);
    }
  });

  it("default mode is 'standard'", async () => {
    const { container } = await renderComponent({ forceOpen: true, inputContent: "hello" });
    const select = container.querySelector("[data-testid='select']") as HTMLSelectElement | null;
    expect(select?.value).toBe("standard");
  });

  for (const mode of MODES) {
    it(`changing mode to '${mode}' updates select value`, async () => {
      const { container } = await renderComponent({ forceOpen: true, inputContent: "hello" });
      const select = container.querySelector("[data-testid='select']") as HTMLSelectElement | null;
      expect(select).toBeTruthy();

      await act(async () => {
        // Set the value and fire change event
        select!.value = mode;
        select!.dispatchEvent(new Event("change", { bubbles: true }));
      });

      expect(select?.value).toBe(mode);
    });
  }
});

describe("CompressionPreviewAccordion — Preview fetch", () => {
  it("calls POST /api/compression/preview with { messages, mode } on button click", async () => {
    const mockResult = {
      originalTokens: 100,
      compressedTokens: 80,
      tokensSaved: 20,
      savingsPct: 20,
      techniquesUsed: ["dedup", "trim"],
      durationMs: 42,
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResult,
    });
    vi.stubGlobal("fetch", fetchMock);

    const inputContent = JSON.stringify({
      messages: [{ role: "user", content: "Hello world" }],
    });

    const { container } = await renderComponent({ forceOpen: true, inputContent });

    const btn = container.querySelector("[data-testid='button']") as HTMLButtonElement | null;
    expect(btn).toBeTruthy();

    await act(async () => {
      btn?.click();
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/compression/preview",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ "Content-Type": "application/json" }),
      }),
    );

    // Verify body has correct shape
    const callArgs = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(callArgs[1].body as string) as {
      messages: Array<{ role: string; content: string }>;
      mode: string;
    };
    expect(body).toMatchObject({
      messages: [{ role: "user", content: "Hello world" }],
      mode: "standard",
    });

    vi.unstubAllGlobals();
  });

  it("wraps plain-text inputContent as { role: 'user', content } when not valid JSON", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        originalTokens: 10,
        compressedTokens: 8,
        tokensSaved: 2,
        savingsPct: 20,
        techniquesUsed: [],
        durationMs: 5,
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { container } = await renderComponent({ forceOpen: true, inputContent: "plain text" });

    const btn = container.querySelector("[data-testid='button']") as HTMLButtonElement | null;
    await act(async () => {
      btn?.click();
    });

    const callArgs = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(callArgs[1].body as string) as {
      messages: Array<{ role: string; content: string }>;
    };
    expect(body.messages).toEqual([{ role: "user", content: "plain text" }]);

    vi.unstubAllGlobals();
  });

  it("sends selected mode in the request body", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        originalTokens: 50,
        compressedTokens: 40,
        tokensSaved: 10,
        savingsPct: 20,
        techniquesUsed: [],
        durationMs: 20,
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { container } = await renderComponent({ forceOpen: true, inputContent: "some text" });

    // Change mode to "aggressive"
    const select = container.querySelector("[data-testid='select']") as HTMLSelectElement | null;
    await act(async () => {
      select!.value = "aggressive";
      select!.dispatchEvent(new Event("change", { bubbles: true }));
    });

    // Click preview
    const btn = container.querySelector("[data-testid='button']") as HTMLButtonElement | null;
    await act(async () => {
      btn?.click();
    });

    const callArgs = fetchMock.mock.calls[0] as [string, RequestInit];
    const body = JSON.parse(callArgs[1].body as string) as { mode: string };
    expect(body.mode).toBe("aggressive");

    vi.unstubAllGlobals();
  });
});

describe("CompressionPreviewAccordion — result grid (4 cards)", () => {
  it("renders 4 metric cards after successful preview", async () => {
    const mockResult = {
      originalTokens: 200,
      compressedTokens: 150,
      tokensSaved: 50,
      savingsPct: 25,
      techniquesUsed: ["dedup"],
      durationMs: 88,
    };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResult,
    });
    vi.stubGlobal("fetch", fetchMock);

    const { container } = await renderComponent({
      forceOpen: true,
      inputContent: "some input",
    });

    const btn = container.querySelector("[data-testid='button']") as HTMLButtonElement | null;
    await act(async () => {
      btn?.click();
    });

    const grid = container.querySelector("[data-testid='compression-result-grid']");
    expect(grid).toBeTruthy();

    const cards = grid?.querySelectorAll(".card");
    expect(cards?.length).toBe(4);

    const text = container.textContent ?? "";
    expect(text).toContain("200"); // originalTokens
    expect(text).toContain("150"); // compressedTokens
    expect(text).toContain("50"); // tokensSaved
    expect(text).toContain("88"); // durationMs

    vi.unstubAllGlobals();
  });

  it("renders techniquesUsed list when non-empty", async () => {
    const mockResult = {
      originalTokens: 100,
      compressedTokens: 90,
      tokensSaved: 10,
      savingsPct: 10,
      techniquesUsed: ["dedup", "trim", "compact"],
      durationMs: 33,
    };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResult,
    });
    vi.stubGlobal("fetch", fetchMock);

    const { container } = await renderComponent({
      forceOpen: true,
      inputContent: "some input",
    });

    await act(async () => {
      (container.querySelector("[data-testid='button']") as HTMLButtonElement)?.click();
    });

    const text = container.textContent ?? "";
    expect(text).toContain("dedup");
    expect(text).toContain("trim");
    expect(text).toContain("compact");

    vi.unstubAllGlobals();
  });

  it("does NOT render result grid before a successful preview", async () => {
    const { container } = await renderComponent({ forceOpen: true, inputContent: "hello" });
    expect(container.querySelector("[data-testid='compression-result-grid']")).toBeNull();
  });
});

describe("CompressionPreviewAccordion — error path (Hard Rule #12)", () => {
  it("shows sanitized error message on fetch failure", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Internal Server Error" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { container } = await renderComponent({
      forceOpen: true,
      inputContent: "some input",
    });

    await act(async () => {
      (container.querySelector("[data-testid='button']") as HTMLButtonElement)?.click();
    });

    const errorEl = container.querySelector("[role='alert']");
    expect(errorEl).toBeTruthy();
    expect(errorEl?.textContent).toContain("Internal Server Error");

    vi.unstubAllGlobals();
  });

  it("error message does NOT contain stack-trace lines (at /path/...)", async () => {
    const stackError = new Error(
      "Something went wrong\n    at /home/user/app/src/file.ts:42:13\n    at Object.<anonymous> /home/user/app/tests/test.ts:10:5",
    );
    const fetchMock = vi.fn().mockRejectedValue(stackError);
    vi.stubGlobal("fetch", fetchMock);

    const { container } = await renderComponent({
      forceOpen: true,
      inputContent: "some input",
    });

    await act(async () => {
      (container.querySelector("[data-testid='button']") as HTMLButtonElement)?.click();
    });

    const errorEl = container.querySelector("[role='alert']");
    expect(errorEl).toBeTruthy();

    const errorText = errorEl?.textContent ?? "";
    // Must NOT contain "at /" (stack-trace pattern)
    expect(errorText).not.toMatch(/\sat\s\//);
    // Should still contain the core message
    expect(errorText).toContain("Something went wrong");

    vi.unstubAllGlobals();
  });

  it("shows 'Preview failed' when fetch returns non-ok without error field", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}), // no error field
    });
    vi.stubGlobal("fetch", fetchMock);

    const { container } = await renderComponent({
      forceOpen: true,
      inputContent: "some input",
    });

    await act(async () => {
      (container.querySelector("[data-testid='button']") as HTMLButtonElement)?.click();
    });

    const errorEl = container.querySelector("[role='alert']");
    expect(errorEl).toBeTruthy();
    expect(errorEl?.textContent).toContain("Preview failed");

    vi.unstubAllGlobals();
  });
});
