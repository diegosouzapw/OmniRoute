// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── i18n stub ─────────────────────────────────────────────────────────────────
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// ── next/navigation stub ──────────────────────────────────────────────────────
const mockReplace = vi.fn();
const mockGet = vi.fn((key: string) => {
  if (key === "tab") return "translate";
  if (key === "mode") return "send";
  if (key === "advanced") return null;
  return null;
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => ({
    get: mockGet,
    toString: () => "tab=translate&mode=send",
  }),
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
    size,
  }: {
    children: React.ReactNode;
    variant?: string;
    size?: string;
  }) => (
    <span data-testid="badge" data-variant={variant} data-size={size}>
      {children}
    </span>
  ),
  SegmentedControl: ({
    options,
    value,
    onChange,
    size,
    "aria-label": ariaLabel,
    className,
  }: {
    options: Array<{ value: string; label: string; icon?: string }>;
    value: string;
    onChange: (v: string) => void;
    size?: string;
    "aria-label"?: string;
    className?: string;
  }) => (
    <div
      role="tablist"
      aria-label={ariaLabel}
      data-testid="segmented-control"
      data-value={value}
      className={className}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          role="tab"
          aria-selected={value === opt.value}
          data-testid={`tab-${opt.value}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  ),
  Button: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button data-testid="button" onClick={onClick}>
      {children}
    </button>
  ),
  Select: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="select">{children}</div>
  ),
  Collapsible: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="collapsible">{children}</div>
  ),
}));

// ── useTranslateSession stub (now lifted to shell) ────────────────────────────
vi.mock(
  "@/app/(dashboard)/dashboard/translator/hooks/useTranslateSession",
  () => ({
    useTranslateSession: () => ({
      result: {
        detected: null,
        target: "openai",
        status: "idle",
        responsePreview: null,
        translatedJson: null,
        pipelinePath: null,
        intermediateJson: null,
        errorMessage: null,
        latencyMs: null,
      },
      run: vi.fn(),
      reset: vi.fn(),
    }),
  }),
);

// ── Sub-component stubs ───────────────────────────────────────────────────────
vi.mock(
  "@/app/(dashboard)/dashboard/translator/components/TranslatorConceptCard",
  () => ({
    default: () => <div data-testid="translator-concept-card" />,
  }),
);

vi.mock(
  "@/app/(dashboard)/dashboard/translator/components/TranslateTab",
  () => ({
    default: ({
      forceOpenAdvancedSlug,
      onAdvancedSlugChange,
    }: {
      forceOpenAdvancedSlug?: string | null;
      onAdvancedSlugChange?: (slug: string | null) => void;
      session?: unknown;
      onInputChange?: (text: string) => void;
    }) => (
      <div
        data-testid="translate-tab"
        data-force-open={forceOpenAdvancedSlug ?? "none"}
        onClick={() => onAdvancedSlugChange?.("rawjson")}
      />
    ),
  }),
);

vi.mock(
  "@/app/(dashboard)/dashboard/translator/components/MonitorTab",
  () => ({
    default: ({ onGoToTranslate }: { onGoToTranslate?: () => void }) => (
      <div data-testid="monitor-tab" onClick={onGoToTranslate} />
    ),
  }),
);

vi.mock(
  "@/app/(dashboard)/dashboard/translator/components/advanced/AdvancedSection",
  () => ({
    default: ({
      children,
      forceOpenSlug,
    }: {
      children?: React.ReactNode;
      forceOpenSlug?: string | null;
    }) => (
      <div data-testid="advanced-section" data-force-open-slug={forceOpenSlug ?? "none"}>
        {children}
      </div>
    ),
  }),
);

vi.mock(
  "@/app/(dashboard)/dashboard/translator/components/advanced/RawJsonPanel",
  () => ({
    default: ({ forceOpen }: { forceOpen?: boolean }) => (
      <div data-testid="raw-json-panel" data-force-open={String(forceOpen ?? false)} />
    ),
  }),
);

vi.mock(
  "@/app/(dashboard)/dashboard/translator/components/advanced/PipelineView",
  () => ({
    default: ({ forceOpen }: { forceOpen?: boolean; pipelineSteps?: unknown[] }) => (
      <div data-testid="pipeline-view" data-force-open={String(forceOpen ?? false)} />
    ),
  }),
);

vi.mock(
  "@/app/(dashboard)/dashboard/translator/components/advanced/StreamTransformerAccordion",
  () => ({
    default: ({ forceOpen }: { forceOpen?: boolean }) => (
      <div data-testid="stream-transformer-accordion" data-force-open={String(forceOpen ?? false)} />
    ),
  }),
);

vi.mock(
  "@/app/(dashboard)/dashboard/translator/components/advanced/TestBenchAccordion",
  () => ({
    default: ({ forceOpen }: { forceOpen?: boolean }) => (
      <div data-testid="test-bench-accordion" data-force-open={String(forceOpen ?? false)} />
    ),
  }),
);

vi.mock(
  "@/app/(dashboard)/dashboard/translator/components/advanced/CompressionPreviewAccordion",
  () => ({
    default: ({ forceOpen }: { forceOpen?: boolean }) => (
      <div
        data-testid="compression-preview-accordion"
        data-force-open={String(forceOpen ?? false)}
      />
    ),
  }),
);

// ── DOM lifecycle helpers ─────────────────────────────────────────────────────
const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

async function mount(component: React.ReactElement, container: HTMLElement) {
  const root = createRoot(container);
  await act(async () => {
    root.render(component);
  });
  return root;
}

// ── Import component AFTER mocks ──────────────────────────────────────────────
import TranslatorPageClient from "@/app/(dashboard)/dashboard/translator/TranslatorPageClient";

describe("TranslatorPageClient", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset mockGet to default (translate tab, no advanced)
    mockGet.mockImplementation((key: string) => {
      if (key === "tab") return "translate";
      if (key === "mode") return "send";
      if (key === "advanced") return null;
      return null;
    });
  });

  afterEach(() => {
    cleanupCallbacks.forEach((fn) => fn());
    cleanupCallbacks.length = 0;
  });

  it("renders smoke — default tab=translate shows TranslateTab and AdvancedSection", async () => {
    const container = makeContainer();
    await mount(<TranslatorPageClient />, container);

    expect(container.querySelector('[data-testid="translator-concept-card"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="translate-tab"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="advanced-section"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="monitor-tab"]')).toBeNull();
  });

  it("SegmentedControl has role=tablist and aria-label", async () => {
    const container = makeContainer();
    await mount(<TranslatorPageClient />, container);

    const ctrl = container.querySelector('[role="tablist"]');
    expect(ctrl).toBeTruthy();
    expect(ctrl?.getAttribute("aria-label")).toBeTruthy();
  });

  it("ConceptCard and AutoFeaturesCard (Card) render", async () => {
    const container = makeContainer();
    await mount(<TranslatorPageClient />, container);

    expect(container.querySelector('[data-testid="translator-concept-card"]')).toBeTruthy();
    // AutoFeaturesCard renders as a Card with a button
    const cards = container.querySelectorAll('[data-testid="card"]');
    expect(cards.length).toBeGreaterThan(0);
  });

  it("clicking Monitor tab calls router.replace with tab=monitor", async () => {
    const container = makeContainer();
    await mount(<TranslatorPageClient />, container);

    const monitorTabBtn = container.querySelector('[data-testid="tab-monitor"]');
    expect(monitorTabBtn).toBeTruthy();

    await act(async () => {
      (monitorTabBtn as HTMLElement).click();
    });

    expect(mockReplace).toHaveBeenCalledWith(
      expect.stringContaining("tab=monitor"),
      expect.any(Object),
    );
  });

  it("8 FeatureChips render inside AutoFeaturesCard when expanded", async () => {
    const container = makeContainer();
    await mount(<TranslatorPageClient />, container);

    // Find the toggle button inside the AutoFeaturesCard (Card)
    const toggleBtn = Array.from(container.querySelectorAll("button")).find(
      (btn) => btn.querySelector(".material-symbols-outlined")?.textContent === "auto_fix_high",
    );
    expect(toggleBtn).toBeTruthy();

    await act(async () => {
      toggleBtn!.click();
    });

    const chips = container.querySelectorAll('[data-testid="feature-chip"]');
    expect(chips.length).toBe(8);
  });

  it("AdvancedSection receives 5 accordion children", async () => {
    const container = makeContainer();
    await mount(<TranslatorPageClient />, container);

    const advSection = container.querySelector('[data-testid="advanced-section"]');
    expect(advSection).toBeTruthy();
    expect(advSection?.querySelector('[data-testid="raw-json-panel"]')).toBeTruthy();
    expect(advSection?.querySelector('[data-testid="pipeline-view"]')).toBeTruthy();
    expect(advSection?.querySelector('[data-testid="stream-transformer-accordion"]')).toBeTruthy();
    expect(advSection?.querySelector('[data-testid="test-bench-accordion"]')).toBeTruthy();
    expect(advSection?.querySelector('[data-testid="compression-preview-accordion"]')).toBeTruthy();
  });
});
