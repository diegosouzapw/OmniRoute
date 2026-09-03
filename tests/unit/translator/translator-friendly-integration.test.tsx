// @vitest-environment jsdom
/**
 * F9 Integration tests — TranslatorPageClient wired to child components via
 * mocked hooks. Tests verify deep-link prop propagation and conditional rendering.
 */
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ── i18n stub ─────────────────────────────────────────────────────────────────
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// ── next/navigation — factory so each test can override mockGet ───────────────
const mockReplace = vi.fn();
let mockGetImpl: (key: string) => string | null = (key) => {
  if (key === "tab") return "translate";
  if (key === "mode") return "send";
  if (key === "advanced") return null;
  return null;
};

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: mockReplace }),
  useSearchParams: () => ({
    get: (key: string) => mockGetImpl(key),
    toString: () => {
      const tab = mockGetImpl("tab") ?? "translate";
      const mode = mockGetImpl("mode") ?? "send";
      const adv = mockGetImpl("advanced");
      return adv ? `tab=${tab}&mode=${mode}&advanced=${adv}` : `tab=${tab}&mode=${mode}`;
    },
  }),
}));

// ── Shared component stubs ────────────────────────────────────────────────────
vi.mock("@/shared/components", () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
  Badge: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="badge">{children}</span>
  ),
  SegmentedControl: ({
    options,
    value,
    onChange,
    "aria-label": ariaLabel,
  }: {
    options: Array<{ value: string; label: string }>;
    value: string;
    onChange: (v: string) => void;
    "aria-label"?: string;
  }) => (
    <div role="tablist" aria-label={ariaLabel} data-testid="segmented-control" data-value={value}>
      {options.map((opt) => (
        <button
          key={opt.value}
          role="tab"
          data-testid={`tab-${opt.value}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  ),
  Button: ({ children }: { children: React.ReactNode }) => (
    <button data-testid="button">{children}</button>
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

// ── Sub-component stubs that capture received props ───────────────────────────
const capturedTranslateTabProps: Array<{
  forceOpenAdvancedSlug?: string | null;
}> = [];

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
    }: {
      forceOpenAdvancedSlug?: string | null;
      onAdvancedSlugChange?: (slug: string | null) => void;
      session?: unknown;
    }) => {
      capturedTranslateTabProps.push({ forceOpenAdvancedSlug });
      return (
        <div data-testid="translate-tab" data-force-open={forceOpenAdvancedSlug ?? "none"} />
      );
    },
  }),
);

vi.mock(
  "@/app/(dashboard)/dashboard/translator/components/MonitorTab",
  () => ({
    default: ({ onGoToTranslate }: { onGoToTranslate?: () => void }) => (
      <div data-testid="monitor-tab" data-has-callback={String(!!onGoToTranslate)} />
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
      <div
        data-testid="advanced-section"
        data-force-open-slug={forceOpenSlug ?? "none"}
      >
        {children}
      </div>
    ),
  }),
);

const capturedRawJsonProps: Array<{ forceOpen?: boolean }> = [];
vi.mock(
  "@/app/(dashboard)/dashboard/translator/components/advanced/RawJsonPanel",
  () => ({
    default: ({ forceOpen }: { forceOpen?: boolean }) => {
      capturedRawJsonProps.push({ forceOpen });
      return (
        <div data-testid="raw-json-panel" data-force-open={String(forceOpen ?? false)} />
      );
    },
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
      <div
        data-testid="stream-transformer-accordion"
        data-force-open={String(forceOpen ?? false)}
      />
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

// ── Import AFTER mocks ────────────────────────────────────────────────────────
import TranslatorPageClient from "@/app/(dashboard)/dashboard/translator/TranslatorPageClient";

describe("TranslatorPageClient — integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    capturedTranslateTabProps.length = 0;
    capturedRawJsonProps.length = 0;
    // Reset to default translate tab
    mockGetImpl = (key: string) => {
      if (key === "tab") return "translate";
      if (key === "mode") return "send";
      if (key === "advanced") return null;
      return null;
    };
  });

  afterEach(() => {
    cleanupCallbacks.forEach((fn) => fn());
    cleanupCallbacks.length = 0;
  });

  it("smoke render — full component tree mounts without errors", async () => {
    const container = makeContainer();
    await mount(<TranslatorPageClient />, container);

    expect(container.querySelector('[data-testid="translator-concept-card"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="segmented-control"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="translate-tab"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="advanced-section"]')).toBeTruthy();
  });

  it("when ?advanced=rawjson, RawJsonPanel receives forceOpen=true", async () => {
    mockGetImpl = (key: string) => {
      if (key === "tab") return "translate";
      if (key === "mode") return "send";
      if (key === "advanced") return "rawjson";
      return null;
    };

    const container = makeContainer();
    await mount(<TranslatorPageClient />, container);

    const rawJsonPanel = container.querySelector('[data-testid="raw-json-panel"]');
    expect(rawJsonPanel).toBeTruthy();
    expect(rawJsonPanel?.getAttribute("data-force-open")).toBe("true");

    // AdvancedSection also receives the correct slug
    const advSection = container.querySelector('[data-testid="advanced-section"]');
    expect(advSection?.getAttribute("data-force-open-slug")).toBe("rawjson");
  });

  it("when ?tab=monitor, MonitorTab renders and TranslateTab does NOT render", async () => {
    mockGetImpl = (key: string) => {
      if (key === "tab") return "monitor";
      if (key === "mode") return "send";
      if (key === "advanced") return null;
      return null;
    };

    const container = makeContainer();
    await mount(<TranslatorPageClient />, container);

    expect(container.querySelector('[data-testid="monitor-tab"]')).toBeTruthy();
    expect(container.querySelector('[data-testid="translate-tab"]')).toBeNull();
    // AdvancedSection should also not render in monitor tab
    expect(container.querySelector('[data-testid="advanced-section"]')).toBeNull();
  });

  it("AdvancedSection receives all 5 accordion slots in the DOM", async () => {
    const container = makeContainer();
    await mount(<TranslatorPageClient />, container);

    const advSection = container.querySelector('[data-testid="advanced-section"]');
    expect(advSection).toBeTruthy();

    const accordions = [
      "raw-json-panel",
      "pipeline-view",
      "stream-transformer-accordion",
      "test-bench-accordion",
      "compression-preview-accordion",
    ];

    for (const testId of accordions) {
      expect(advSection?.querySelector(`[data-testid="${testId}"]`)).toBeTruthy();
    }
  });

  it("when ?advanced=pipeline, only PipelineView forceOpen=true (others false)", async () => {
    mockGetImpl = (key: string) => {
      if (key === "tab") return "translate";
      if (key === "mode") return "send";
      if (key === "advanced") return "pipeline";
      return null;
    };

    const container = makeContainer();
    await mount(<TranslatorPageClient />, container);

    const pipeline = container.querySelector('[data-testid="pipeline-view"]');
    expect(pipeline?.getAttribute("data-force-open")).toBe("true");

    const rawJson = container.querySelector('[data-testid="raw-json-panel"]');
    expect(rawJson?.getAttribute("data-force-open")).toBe("false");
  });

  it("MonitorTab receives onGoToTranslate callback", async () => {
    mockGetImpl = (key: string) => {
      if (key === "tab") return "monitor";
      if (key === "mode") return "send";
      if (key === "advanced") return null;
      return null;
    };

    const container = makeContainer();
    await mount(<TranslatorPageClient />, container);

    const monitorTab = container.querySelector('[data-testid="monitor-tab"]');
    expect(monitorTab?.getAttribute("data-has-callback")).toBe("true");
  });
});
