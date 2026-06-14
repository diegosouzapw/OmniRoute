// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ─── Mocks ────────────────────────────────────────────────────────────────────

// The i18n mock returns the key unchanged. translateOrFallback() detects that
// translated === key and returns the FALLBACK string instead. So in tests the
// rendered text / aria-label equals the fallback string, not the key.
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock("@/shared/components", () => ({
  Button: ({
    children,
    onClick,
    disabled,
    loading,
    "aria-label": ariaLabel,
  }: {
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    "aria-label"?: string;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      data-loading={loading ? "true" : undefined}
    >
      {children}
    </button>
  ),
  Card: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  ),
}));

vi.mock("@/shared/utils/clipboard", () => ({
  copyToClipboard: vi.fn().mockResolvedValue(true),
}));

vi.mock("@/shared/utils/cn", () => ({
  cn: (...args: unknown[]) => args.filter(Boolean).join(" "),
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

// Finds a button by its rendered aria-label (the fallback string).
function findButtonByLabel(container: HTMLElement, label: string): HTMLButtonElement | null {
  return (
    (Array.from(container.querySelectorAll("button[aria-label]")).find(
      (btn) => btn.getAttribute("aria-label") === label
    ) as HTMLButtonElement | null) ?? null
  );
}

async function renderAccordion(
  props: { forceOpen?: boolean; onOpenChange?: (open: boolean) => void } = {}
): Promise<HTMLElement> {
  const { default: StreamTransformerAccordion } = await import(
    "@/app/(dashboard)/dashboard/translator/components/advanced/StreamTransformerAccordion"
  );
  const container = makeContainer();
  const root = createRoot(container);
  await act(async () => {
    root.render(<StreamTransformerAccordion {...props} />);
  });
  return container;
}

// ─── Test suite ───────────────────────────────────────────────────────────────

describe("StreamTransformerAccordion", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;

    // Default fetch stub — individual tests override as needed.
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) {
      cleanupCallbacks.pop()?.();
    }
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  // ── 1. Smoke render ────────────────────────────────────────────────────────

  it("exports a default function component", async () => {
    const mod = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/StreamTransformerAccordion"
    );
    expect(typeof mod.default).toBe("function");
  });

  it("renders the collapsible header with swap_horiz icon", async () => {
    const container = await renderAccordion();
    const icons = container.querySelectorAll(".material-symbols-outlined");
    const iconTexts = Array.from(icons).map((el) => el.textContent?.trim());
    expect(iconTexts).toContain("swap_horiz");
  });

  it("renders the toggle button with aria-expanded=false when closed by default", async () => {
    const container = await renderAccordion();
    const toggleBtn = container.querySelector("button[aria-expanded]");
    expect(toggleBtn).toBeTruthy();
    expect(toggleBtn?.getAttribute("aria-expanded")).toBe("false");
  });

  it("renders title in the header", async () => {
    const container = await renderAccordion();
    // The title uses the fallback string since i18n mock returns the key.
    expect(container.textContent).toContain("Stream Transformer (Chat → Responses SSE)");
  });

  // ── 2. Lazy-render: content not mounted when closed ────────────────────────

  it("does NOT render textarea when closed by default (lazy-render D7)", async () => {
    const container = await renderAccordion({ forceOpen: false });
    const textarea = container.querySelector("[data-testid='raw-sse-input']");
    // Content is either absent or hidden.
    if (textarea) {
      const wrapper = textarea.closest(".hidden");
      expect(wrapper).toBeTruthy();
    } else {
      expect(textarea).toBeNull();
    }
  });

  it("mounts content after toggling open (lazy-render guard activates)", async () => {
    const container = await renderAccordion({ forceOpen: false });
    const toggleBtn = container.querySelector("button[aria-expanded]") as HTMLButtonElement | null;
    expect(toggleBtn).toBeTruthy();

    await act(async () => {
      toggleBtn?.click();
    });

    expect(toggleBtn?.getAttribute("aria-expanded")).toBe("true");
    expect(container.querySelector("[data-testid='raw-sse-input']")).toBeTruthy();
  });

  it("keeps content in DOM after closing (lazy-render persists)", async () => {
    const container = await renderAccordion({ forceOpen: false });
    const toggleBtn = container.querySelector("button[aria-expanded]") as HTMLButtonElement | null;

    // Open
    await act(async () => { toggleBtn?.click(); });
    expect(container.querySelector("[data-testid='raw-sse-input']")).toBeTruthy();

    // Close
    await act(async () => { toggleBtn?.click(); });
    expect(toggleBtn?.getAttribute("aria-expanded")).toBe("false");
    // Content still in DOM (hidden class applied, not unmounted).
    expect(container.querySelector(".hidden")).toBeTruthy();
  });

  // ── 3. forceOpen prop ──────────────────────────────────────────────────────

  it("opens immediately when forceOpen=true", async () => {
    const container = await renderAccordion({ forceOpen: true });
    const toggleBtn = container.querySelector("button[aria-expanded]");
    expect(toggleBtn?.getAttribute("aria-expanded")).toBe("true");
    expect(container.querySelector("[data-testid='raw-sse-input']")).toBeTruthy();
  });

  // ── 4. onOpenChange callback ───────────────────────────────────────────────

  it("calls onOpenChange(true) when toggled open", async () => {
    const onOpenChange = vi.fn();
    const container = await renderAccordion({ onOpenChange });
    const toggleBtn = container.querySelector("button[aria-expanded]") as HTMLButtonElement | null;

    await act(async () => { toggleBtn?.click(); });

    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("calls onOpenChange(false) when toggled closed", async () => {
    const onOpenChange = vi.fn();
    const container = await renderAccordion({ forceOpen: true, onOpenChange });
    const toggleBtn = container.querySelector("button[aria-expanded]") as HTMLButtonElement | null;

    await act(async () => { toggleBtn?.click(); });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  // ── 5. Load Sample buttons populate textarea ──────────────────────────────
  // NOTE: translateOrFallback() returns the FALLBACK when i18n returns the key.
  // So aria-label="Load text sample" (not "loadTextSample").

  it("clicking 'Load text sample' populates the textarea with chat-completion SSE", async () => {
    const container = await renderAccordion({ forceOpen: true });

    const loadTextBtn = findButtonByLabel(container, "Load text sample");
    expect(loadTextBtn).toBeTruthy();

    await act(async () => { loadTextBtn?.click(); });

    const textarea = container.querySelector(
      "[data-testid='raw-sse-input']"
    ) as HTMLTextAreaElement | null;
    expect(textarea).toBeTruthy();
    expect(textarea?.value).toContain("chat.completion.chunk");
    expect(textarea?.value).toContain("[DONE]");
  });

  it("clicking 'Load tool-call sample' populates the textarea with tool-call SSE", async () => {
    const container = await renderAccordion({ forceOpen: true });

    const loadToolBtn = findButtonByLabel(container, "Load tool-call sample");
    expect(loadToolBtn).toBeTruthy();

    await act(async () => { loadToolBtn?.click(); });

    const textarea = container.querySelector(
      "[data-testid='raw-sse-input']"
    ) as HTMLTextAreaElement | null;
    expect(textarea?.value).toContain("tool_calls");
    expect(textarea?.value).toContain("lookup_weather");
  });

  // ── 6. Transform button fires fetch with { rawSse } ───────────────────────

  it("clicking 'Transform to Responses' fires POST /api/translator/transform-stream with { rawSse }", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, transformed: "data: done\n\n" }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const container = await renderAccordion({ forceOpen: true });

    const transformBtn = findButtonByLabel(container, "Transform to Responses");
    expect(transformBtn).toBeTruthy();

    await act(async () => { transformBtn?.click(); });

    expect(mockFetch).toHaveBeenCalledOnce();
    const [url, options] = mockFetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/translator/transform-stream");
    expect(options.method).toBe("POST");
    const body = JSON.parse(options.body as string) as { rawSse: string };
    expect(body).toHaveProperty("rawSse");
    expect(typeof body.rawSse).toBe("string");
  });

  // ── 7. Successful response is rendered ────────────────────────────────────

  it("renders the transformed output in the pre element on success", async () => {
    const transformedPayload =
      "data: {\"type\":\"response.output_text.delta\",\"delta\":\"Hello\"}\n\ndata: [DONE]\n";

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, transformed: transformedPayload }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const container = await renderAccordion({ forceOpen: true });

    const transformBtn = findButtonByLabel(container, "Transform to Responses");
    expect(transformBtn).toBeTruthy();

    await act(async () => { transformBtn?.click(); });

    const output = container.querySelector("[data-testid='transformed-output']");
    expect(output).toBeTruthy();
    expect(output?.textContent).toContain("response.output_text.delta");
  });

  // ── 8. Error path does NOT leak stack traces (Hard Rule #12) ──────────────

  it("error path: displays sanitized error message — no stack trace", async () => {
    const sanitizedError = "Transform failed: invalid SSE format";
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, error: sanitizedError }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const container = await renderAccordion({ forceOpen: true });

    const transformBtn = findButtonByLabel(container, "Transform to Responses");
    expect(transformBtn).toBeTruthy();

    await act(async () => { transformBtn?.click(); });

    const errorEl = container.querySelector("[data-testid='error-display']");
    expect(errorEl).toBeTruthy();
    const displayedError = errorEl?.textContent ?? "";
    expect(displayedError).toBeTruthy();
    // Hard Rule #12: must not contain stack trace patterns.
    expect(displayedError).not.toMatch(/\s+at\s+\//);
    expect(displayedError).not.toContain("Error: at /");
    expect(displayedError).toContain("Transform failed");
  });

  it("error path: network failure — stack trace stripped from displayed message", async () => {
    const networkErr = new Error("Network error");
    // Simulate a stack trace in the error message (unlikely from err.message, but
    // the defence-in-depth regex should strip it if ever present).
    (networkErr as Error & { message: string }).message =
      "Network error\n    at /src/some/file.ts:42:10";
    const mockFetch = vi.fn().mockRejectedValue(networkErr);
    vi.stubGlobal("fetch", mockFetch);

    const container = await renderAccordion({ forceOpen: true });

    const transformBtn = findButtonByLabel(container, "Transform to Responses");
    expect(transformBtn).toBeTruthy();

    await act(async () => { transformBtn?.click(); });

    const errorEl = container.querySelector("[data-testid='error-display']");
    expect(errorEl).toBeTruthy();
    const displayedError = errorEl?.textContent ?? "";
    // Stack suffix must be stripped by the defence-in-depth regex.
    expect(displayedError).not.toMatch(/\s+at\s+\//);
    expect(displayedError).not.toContain("at /src");
    expect(displayedError).toContain("Network error");
  });

  // ── 9. parseSseFrames edge cases ──────────────────────────────────────────

  it("parseSseFrames handles [DONE] frame — timeline shows event type 'done'", async () => {
    const donePayload = "data: [DONE]\n";
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, transformed: donePayload }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const container = await renderAccordion({ forceOpen: true });

    const transformBtn = findButtonByLabel(container, "Transform to Responses");
    await act(async () => { transformBtn?.click(); });

    // Timeline table should contain "done" in the event-type column.
    const cells = container.querySelectorAll("td.font-mono");
    const cellTexts = Array.from(cells).map((c) => c.textContent?.trim());
    expect(cellTexts).toContain("done");
  });

  it("parseSseFrames handles malformed JSON in data frames gracefully", async () => {
    const weirdPayload = "data: not-json\n\ndata: {\"valid\":true}\n";
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, transformed: weirdPayload }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const container = await renderAccordion({ forceOpen: true });

    const transformBtn = findButtonByLabel(container, "Transform to Responses");

    // Should NOT throw.
    await expect(
      act(async () => { transformBtn?.click(); })
    ).resolves.not.toThrow();

    // Some frames should appear in the timeline (not empty).
    const cells = container.querySelectorAll("td.font-mono");
    expect(cells.length).toBeGreaterThan(0);
  });
});
