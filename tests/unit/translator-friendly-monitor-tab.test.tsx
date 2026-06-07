// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── i18n stub — returns fallback key so we can assert on translateOrFallback ──
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// ── Shared component stubs ────────────────────────────────────────────────────
vi.mock("@/shared/components", () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
  Badge: ({
    children,
    variant,
    dot,
    size,
  }: {
    children: React.ReactNode;
    variant?: string;
    dot?: boolean;
    size?: string;
  }) => (
    <span data-testid="badge" data-variant={variant} data-dot={dot} data-size={size}>
      {children}
    </span>
  ),
  EmptyState: ({
    title,
    description,
    actionLabel,
    onAction,
    icon,
  }: {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: (() => void) | null;
    icon?: string;
  }) => (
    <div data-testid="empty-state">
      {icon && <span data-testid="empty-icon">{icon}</span>}
      {title && <p data-testid="empty-title">{title}</p>}
      {description && <p data-testid="empty-description">{description}</p>}
      {actionLabel && onAction && (
        <button data-testid="empty-action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  ),
}));

// ── FORMAT_META stub ──────────────────────────────────────────────────────────
vi.mock(
  "@/app/(dashboard)/dashboard/translator/exampleTemplates",
  () => ({
    FORMAT_META: {
      openai: { label: "OpenAI", color: "green" },
      claude: { label: "Claude", color: "orange" },
      gemini: { label: "Gemini", color: "blue" },
    },
  }),
);

// ── fetch mock helpers ────────────────────────────────────────────────────────
function mockFetchEmpty() {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, events: [] }),
    }),
  );
}

function mockFetchWithEvents(
  events: Array<{
    id?: string;
    timestamp?: string;
    provider?: string;
    model?: string;
    sourceFormat?: string;
    targetFormat?: string;
    status?: string;
    latency?: number;
  }>,
) {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, events }),
    }),
  );
}

// ── DOM lifecycle helpers ─────────────────────────────────────────────────────
const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

/**
 * Helper: mount the component and flush the initial async fetch
 * WITHOUT triggering the recurring setInterval loop.
 * Uses vi.advanceTimersByTimeAsync(0) to drain microtask queue
 * after the initial fetch resolves, then stops — does NOT advance
 * by 3000ms so the interval does not fire.
 */
async function mountAndFlushInitialFetch(
  component: React.ReactElement,
  container: HTMLElement,
): Promise<ReturnType<typeof createRoot>> {
  const root = createRoot(container);
  await act(async () => {
    root.render(component);
  });
  // Drain pending microtasks (the initial fetchHistory Promise) without
  // advancing time so setInterval doesn't trigger.
  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
  return root;
}

describe("MonitorTab", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT =
      true;
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    while (cleanupCallbacks.length > 0) {
      cleanupCallbacks.pop()?.();
    }
    document.body.innerHTML = "";
  });

  // ── 1. Smoke render ──────────────────────────────────────────────────────────
  it("exports a default function component", async () => {
    const mod = await import(
      "@/app/(dashboard)/dashboard/translator/components/MonitorTab"
    );
    expect(typeof mod.default).toBe("function");
  });

  it("renders the origin hint header (monitorOriginHint) always visible", async () => {
    mockFetchEmpty();
    const { default: MonitorTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/MonitorTab"
    );
    const container = makeContainer();
    await mountAndFlushInitialFetch(<MonitorTab />, container);

    const hint = container.querySelector("[data-testid='monitor-origin-hint']");
    expect(hint).toBeTruthy();
    // The hint should contain the info icon
    const icons = hint?.querySelectorAll(".material-symbols-outlined");
    const iconTexts = Array.from(icons ?? []).map((el) => el.textContent?.trim());
    expect(iconTexts).toContain("info");
  });

  it("renders 6 StatCards with correct icons", async () => {
    mockFetchEmpty();
    const { default: MonitorTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/MonitorTab"
    );
    const container = makeContainer();
    await mountAndFlushInitialFetch(<MonitorTab />, container);

    // Stat card icons: translate, check_circle, error, speed, hub, lan
    const icons = container.querySelectorAll(".material-symbols-outlined");
    const iconTexts = Array.from(icons).map((el) => el.textContent?.trim());
    expect(iconTexts).toContain("translate");
    expect(iconTexts).toContain("check_circle");
    expect(iconTexts).toContain("error");
    expect(iconTexts).toContain("speed");
    expect(iconTexts).toContain("hub");
    expect(iconTexts).toContain("lan");
  });

  // ── 2. Empty state ───────────────────────────────────────────────────────────
  it("shows empty state when events array is empty", async () => {
    mockFetchEmpty();
    const { default: MonitorTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/MonitorTab"
    );
    const container = makeContainer();
    await mountAndFlushInitialFetch(<MonitorTab />, container);

    const emptyState = container.querySelector("[data-testid='empty-state']");
    expect(emptyState).toBeTruthy();
    // Table should NOT be rendered
    expect(container.querySelector("[data-testid='monitor-events-table']")).toBeNull();
  });

  it("empty state shows CTA description text from monitorEmptyCta", async () => {
    mockFetchEmpty();
    const { default: MonitorTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/MonitorTab"
    );
    const container = makeContainer();
    await mountAndFlushInitialFetch(<MonitorTab />, container);

    // When t() mock returns key, translateOrFallback detects key === translation and uses hardcoded fallback
    const emptyDescription = container.querySelector("[data-testid='empty-description']");
    expect(emptyDescription?.textContent).toContain("Volte para a aba Translate");
  });

  it("empty state 'Ir para Translate' button calls onGoToTranslate callback", async () => {
    mockFetchEmpty();
    const { default: MonitorTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/MonitorTab"
    );
    const container = makeContainer();
    const onGoToTranslate = vi.fn();
    await mountAndFlushInitialFetch(<MonitorTab onGoToTranslate={onGoToTranslate} />, container);

    const actionBtn = container.querySelector("[data-testid='empty-action']") as HTMLButtonElement | null;
    expect(actionBtn).toBeTruthy();
    // Label comes from monitorOpenTranslateButton fallback
    expect(actionBtn?.textContent).toContain("Ir para Translate");

    await act(async () => {
      actionBtn?.click();
    });
    expect(onGoToTranslate).toHaveBeenCalledOnce();
  });

  it("empty state action button is not rendered when onGoToTranslate is not provided", async () => {
    mockFetchEmpty();
    const { default: MonitorTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/MonitorTab"
    );
    const container = makeContainer();
    await mountAndFlushInitialFetch(<MonitorTab />, container);

    // EmptyState stub only renders button when onAction is truthy
    const actionBtn = container.querySelector("[data-testid='empty-action']");
    expect(actionBtn).toBeNull();
  });

  // ── 3. Events table ──────────────────────────────────────────────────────────
  it("renders events table with rows when events are present", async () => {
    const sampleEvents = [
      {
        id: "evt-1",
        timestamp: new Date("2026-05-27T10:00:00Z").toISOString(),
        provider: "openai",
        model: "gpt-4",
        sourceFormat: "claude",
        targetFormat: "openai",
        status: "success",
        latency: 320,
      },
      {
        id: "evt-2",
        timestamp: new Date("2026-05-27T10:01:00Z").toISOString(),
        provider: "gemini",
        model: "gemini-pro",
        sourceFormat: "openai",
        targetFormat: "gemini",
        status: "error",
        latency: 150,
      },
    ];
    mockFetchWithEvents(sampleEvents);

    const { default: MonitorTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/MonitorTab"
    );
    const container = makeContainer();
    await mountAndFlushInitialFetch(<MonitorTab />, container);

    // Table must be present
    const table = container.querySelector("[data-testid='monitor-events-table']");
    expect(table).toBeTruthy();

    // EmptyState must NOT be rendered
    expect(container.querySelector("[data-testid='empty-state']")).toBeNull();

    // 2 event rows
    const rows = container.querySelectorAll("[data-testid='monitor-event-row']");
    expect(rows).toHaveLength(2);
  });

  it("table renders source and target format labels via FORMAT_META", async () => {
    const sampleEvents = [
      {
        id: "evt-1",
        sourceFormat: "claude",
        targetFormat: "openai",
        status: "success",
      },
    ];
    mockFetchWithEvents(sampleEvents);

    const { default: MonitorTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/MonitorTab"
    );
    const container = makeContainer();
    await mountAndFlushInitialFetch(<MonitorTab />, container);

    const text = container.textContent ?? "";
    expect(text).toContain("Claude"); // FORMAT_META["claude"].label
    expect(text).toContain("OpenAI"); // FORMAT_META["openai"].label
  });

  it("table columns include: time, route, source, target, model, status, latency headers", async () => {
    const sampleEvents = [{ id: "x", status: "success" }];
    mockFetchWithEvents(sampleEvents);

    const { default: MonitorTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/MonitorTab"
    );
    const container = makeContainer();
    await mountAndFlushInitialFetch(<MonitorTab />, container);

    // Column headers use t() keys — mock returns the key itself
    const tableText = container.querySelector("thead")?.textContent ?? "";
    expect(tableText).toContain("time");
    expect(tableText).toContain("source");
    expect(tableText).toContain("target");
    expect(tableText).toContain("model");
    expect(tableText).toContain("status");
    expect(tableText).toContain("latency");
  });

  // ── 4. Auto-refresh toggle ───────────────────────────────────────────────────
  it("toggle auto-refresh button is present with aria-label and shows live state text", async () => {
    mockFetchEmpty();
    const { default: MonitorTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/MonitorTab"
    );
    const container = makeContainer();
    await mountAndFlushInitialFetch(<MonitorTab />, container);

    const toggleBtn = container.querySelector(
      "[data-testid='auto-refresh-toggle']",
    ) as HTMLButtonElement | null;
    expect(toggleBtn).toBeTruthy();

    // Initial state: auto-refresh is ON — translateOrFallback detects key === translation → uses fallback
    expect(toggleBtn?.textContent?.trim()).toContain("Atualizando ao vivo");
    // aria-label should be set
    expect(toggleBtn?.getAttribute("aria-label")).toBeTruthy();
  });

  it("clicking toggle changes button text from live to paused", async () => {
    mockFetchEmpty();
    const { default: MonitorTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/MonitorTab"
    );
    const container = makeContainer();
    await mountAndFlushInitialFetch(<MonitorTab />, container);

    const toggleBtn = container.querySelector(
      "[data-testid='auto-refresh-toggle']",
    ) as HTMLButtonElement | null;
    expect(toggleBtn).toBeTruthy();

    // Click to pause
    await act(async () => {
      toggleBtn?.click();
    });

    // After pause: button text should switch to the "paused" fallback
    expect(toggleBtn?.textContent?.trim()).toContain("Pausado");
  });

  it("auto-refresh polling fires fetch again after 3 seconds", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, events: [] }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { default: MonitorTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/MonitorTab"
    );
    const container = makeContainer();
    await mountAndFlushInitialFetch(<MonitorTab />, container);

    const callsAfterMount = fetchMock.mock.calls.length;
    expect(callsAfterMount).toBeGreaterThanOrEqual(1);

    // Advance 3 seconds → one more interval tick
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });
    expect(fetchMock.mock.calls.length).toBeGreaterThan(callsAfterMount);
  });

  it("pausing auto-refresh stops additional polling after toggle", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, events: [] }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const { default: MonitorTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/MonitorTab"
    );
    const container = makeContainer();
    await mountAndFlushInitialFetch(<MonitorTab />, container);

    // Pause auto-refresh
    const toggleBtn = container.querySelector(
      "[data-testid='auto-refresh-toggle']",
    ) as HTMLButtonElement | null;
    await act(async () => {
      toggleBtn?.click();
    });
    // After toggling, the component re-renders with autoRefresh=false.
    // The new useEffect runs with autoRefresh=false → no new interval.
    // But the old interval was cleared on cleanup.
    // Drain any pending microtasks from the state update.
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    const callsAfterPause = fetchMock.mock.calls.length;

    // Advance 9 seconds — should NOT trigger more interval fetches
    await act(async () => {
      await vi.advanceTimersByTimeAsync(9000);
    });

    // Allow any pending promises to settle
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(fetchMock.mock.calls.length).toBe(callsAfterPause);
  });

  // ── 5. Error sanitization ────────────────────────────────────────────────────
  it("fetch error does not leak stack traces into the DOM", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(
        new Error("Network Error\n    at fetch (/some/internal/path.ts:42:10)"),
      ),
    );

    const { default: MonitorTab } = await import(
      "@/app/(dashboard)/dashboard/translator/components/MonitorTab"
    );
    const container = makeContainer();
    // Don't use mountAndFlushInitialFetch here — we want to let the rejection settle
    const root = createRoot(container);
    await act(async () => {
      root.render(<MonitorTab />);
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100);
    });

    const domText = container.textContent ?? "";
    expect(domText).not.toMatch(/at\s+\//);
    expect(domText).not.toMatch(/Network Error/);
  });
});
