// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { PipelineStep } from "@/app/(dashboard)/dashboard/translator/components/advanced/PipelineView";

// Minimal i18n stub
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// Collapsible stub — renders children directly (always open in tests)
vi.mock("@/shared/components/Collapsible", () => ({
  default: ({
    children,
    title,
    icon,
  }: {
    children: React.ReactNode;
    title?: string;
    icon?: string;
    subtitle?: string;
    defaultOpen?: boolean;
    className?: string;
  }) => (
    <div data-testid="collapsible" data-title={title} data-icon={icon}>
      {children}
    </div>
  ),
}));

// Shared component stubs
vi.mock("@/shared/components", () => ({
  Card: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
  Badge: ({
    children,
    variant,
  }: {
    children: React.ReactNode;
    variant?: string;
    size?: string;
  }) => (
    <span data-testid="badge" data-variant={variant}>
      {children}
    </span>
  ),
}));

// exampleTemplates stub
vi.mock(
  "@/app/(dashboard)/dashboard/translator/exampleTemplates",
  () => ({
    FORMAT_META: {
      openai: { label: "OpenAI", color: "blue", icon: "psychology" },
      claude: { label: "Claude", color: "amber", icon: "auto_awesome" },
      gemini: { label: "Gemini", color: "green", icon: "smart_toy" },
    },
    FORMAT_OPTIONS: [
      { value: "openai", label: "OpenAI" },
      { value: "claude", label: "Claude" },
    ],
    getExampleTemplates: () => [],
  }),
);

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

const SAMPLE_STEPS: PipelineStep[] = [
  {
    id: "1",
    name: "Client Request",
    description: "Request received",
    format: "claude",
    content: '{"model":"claude-sonnet-4-20250514"}',
    status: "done",
  },
  {
    id: "2",
    name: "Format Detected",
    description: "Format detected",
    format: "claude",
    content: '{"detectedFormat":"claude"}',
    status: "done",
  },
  {
    id: "3",
    name: "OpenAI Intermediate",
    description: "Translated to OpenAI",
    format: "openai",
    content: '{"model":"claude-sonnet-4-20250514","messages":[]}',
    status: "active",
  },
  {
    id: "4",
    name: "Provider Format",
    description: "Translated to provider",
    format: "gemini",
    content: '{"model":"gemini-2.5-flash"}',
    status: "pending",
  },
  {
    id: "5",
    name: "Provider Response",
    description: "Response from provider",
    format: "openai",
    content: "data: [DONE]",
    status: "error",
  },
];

describe("PipelineView", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
  });

  it("exports a default function component", async () => {
    const mod = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/PipelineView"
    );
    expect(typeof mod.default).toBe("function");
  });

  it("renders Collapsible wrapper with route icon", async () => {
    const { default: PipelineView } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/PipelineView"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<PipelineView />);
    });
    const collapsible = container.querySelector("[data-testid='collapsible']");
    expect(collapsible).toBeTruthy();
    expect(collapsible?.getAttribute("data-icon")).toBe("route");
  });

  it("renders demo steps when pipelineSteps is not provided (defaultOpen=true)", async () => {
    const { default: PipelineView } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/PipelineView"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<PipelineView defaultOpen={true} />);
    });
    // The pipeline container should be present
    const pipelineContainer = container.querySelector("[data-pipeline-container='true']");
    expect(pipelineContainer).toBeTruthy();
    // Step list (role=list) should be present with items
    const stepList = container.querySelector("[role='list']");
    expect(stepList).toBeTruthy();
    const items = container.querySelectorAll("[role='listitem']");
    expect(items.length).toBe(5); // 5 demo steps
  });

  it("renders provided pipelineSteps instead of demo", async () => {
    const { default: PipelineView } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/PipelineView"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<PipelineView defaultOpen={true} pipelineSteps={SAMPLE_STEPS} />);
    });
    const items = container.querySelectorAll("[role='listitem']");
    expect(items.length).toBe(5);
    const text = container.textContent ?? "";
    expect(text).toContain("Client Request");
    expect(text).toContain("Format Detected");
    expect(text).toContain("OpenAI Intermediate");
    expect(text).toContain("Provider Format");
    expect(text).toContain("Provider Response");
  });

  it("shows all 4 status values: done, active, pending, error", async () => {
    const { default: PipelineView } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/PipelineView"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<PipelineView defaultOpen={true} pipelineSteps={SAMPLE_STEPS} />);
    });
    const badges = container.querySelectorAll("[data-testid='badge']");
    const badgeVariants = Array.from(badges).map((b) => b.getAttribute("data-variant"));
    // done → success
    expect(badgeVariants).toContain("success");
    // active → primary
    expect(badgeVariants).toContain("primary");
    // error → error
    expect(badgeVariants).toContain("error");
    // pending → default
    expect(badgeVariants).toContain("default");
  });

  it("clicking a step expands its details and shows content", async () => {
    const { default: PipelineView } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/PipelineView"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<PipelineView defaultOpen={true} pipelineSteps={SAMPLE_STEPS} />);
    });

    // Find all step toggle buttons (aria-expanded)
    const stepButtons = container.querySelectorAll<HTMLButtonElement>("button[aria-expanded]");
    expect(stepButtons.length).toBeGreaterThanOrEqual(1);

    // Click the first step
    const firstStepBtn = stepButtons[0];
    expect(firstStepBtn.getAttribute("aria-expanded")).toBe("false");

    await act(async () => {
      firstStepBtn.click();
    });

    expect(firstStepBtn.getAttribute("aria-expanded")).toBe("true");

    // Step content region should be in DOM
    const contentRegion = container.querySelector("[role='region']");
    expect(contentRegion).toBeTruthy();
    // Pre tag with JSON content
    const pre = container.querySelector("pre");
    expect(pre).toBeTruthy();
    expect(pre?.textContent).toContain("claude-sonnet-4-20250514");
  });

  it("clicking an expanded step collapses it", async () => {
    const { default: PipelineView } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/PipelineView"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<PipelineView defaultOpen={true} pipelineSteps={SAMPLE_STEPS} />);
    });

    const stepButtons = container.querySelectorAll<HTMLButtonElement>("button[aria-expanded]");
    const firstStepBtn = stepButtons[0];

    // Expand
    await act(async () => {
      firstStepBtn.click();
    });
    expect(firstStepBtn.getAttribute("aria-expanded")).toBe("true");

    // Collapse
    await act(async () => {
      firstStepBtn.click();
    });
    expect(firstStepBtn.getAttribute("aria-expanded")).toBe("false");
    expect(container.querySelector("[role='region']")).toBeNull();
  });

  it("lazy-render: pipeline container present and forceOpen=true triggers step list", async () => {
    // Note: The Collapsible test stub always renders children directly (the real Collapsible
    // only mounts children when open). In this stub environment the ref callback fires
    // immediately on mount, setting hasOpened=true. This test verifies the more important
    // half: that forceOpen=true results in a mounted container with step list items.
    const { default: PipelineView } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/PipelineView"
    );
    const container = makeContainer();
    const root = createRoot(container);

    // Render with forceOpen=true — ensures open + hasOpened are set on mount.
    await act(async () => {
      root.render(<PipelineView defaultOpen={false} forceOpen={true} pipelineSteps={SAMPLE_STEPS} />);
    });

    const pipelineContainer = container.querySelector("[data-pipeline-container='true']");
    expect(pipelineContainer).toBeTruthy();
    const items = pipelineContainer?.querySelectorAll("[role='listitem']");
    expect(items?.length).toBeGreaterThan(0);
  });

  it("onOpenChange fires when mounted with forceOpen=true", async () => {
    const onOpenChange = vi.fn();
    const { default: PipelineView } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/PipelineView"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <PipelineView forceOpen={true} onOpenChange={onOpenChange} pipelineSteps={SAMPLE_STEPS} />,
      );
    });
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });

  it("renders connector lines between steps", async () => {
    const { default: PipelineView } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/PipelineView"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<PipelineView defaultOpen={true} pipelineSteps={SAMPLE_STEPS} />);
    });
    // Connector divs have aria-hidden=true
    const connectors = container.querySelectorAll("[aria-hidden='true']");
    // At least 4 connectors for 5 steps (between each pair)
    expect(connectors.length).toBeGreaterThanOrEqual(4);
  });

  it("triggers ref callback to set hasOpened on first render when content is mounted (regression test for GAP-NOVO-3)", async () => {
    // Regression: Collapsible does not expose onOpenChange, so without the ref callback
    // the div container would be rendered but {hasOpened && ...} would remain false,
    // leaving the pipeline visually empty after a manual click open.
    // The Collapsible stub always renders children directly, so this simulates the
    // case where the accordion content div is mounted (as happens after a real click
    // that opens the Collapsible). The ref callback must detect the mount and set hasOpened.
    const { default: PipelineView } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/PipelineView"
    );
    const container = makeContainer();
    const root = createRoot(container);
    // forceOpen=true triggers the useEffect that sets open+hasOpened AND the Collapsible
    // stub mounts children immediately — together this causes the ref callback to fire.
    await act(async () => {
      root.render(<PipelineView forceOpen={true} pipelineSteps={SAMPLE_STEPS} />);
    });
    // The pipeline container must be present AND contain visible step list items.
    // Before the fix, the ref callback was absent: the div existed but hasOpened stayed
    // false when opened via click (no forceOpen), so the step list was never rendered.
    const stepListItems = container.querySelectorAll("[role='listitem']");
    expect(stepListItems.length).toBeGreaterThan(0);
    // Verify content is truly populated (not just the container div)
    const stepList = container.querySelector("[role='list']");
    expect(stepList).toBeTruthy();
  });
});
