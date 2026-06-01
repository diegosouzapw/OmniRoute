// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { FormatId, TranslateMode } from "@/app/(dashboard)/dashboard/translator/types";

// --- Mock next-intl ---
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// --- Mock shared components ---
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
      data-testid="button"
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  ),
  Select: ({
    options = [],
    value,
    onChange,
    placeholder,
    "aria-label": ariaLabel,
  }: {
    options?: Array<{ value: string; label: string }>;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
    "aria-label"?: string;
  }) => (
    <select data-testid="select" value={value} onChange={onChange} aria-label={ariaLabel}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  ),
  SegmentedControl: ({
    options = [],
    value,
    onChange,
    "aria-label": ariaLabel,
  }: {
    options?: Array<{ value: string; label: string }>;
    value?: string;
    onChange?: (v: string) => void;
    "aria-label"?: string;
  }) => (
    <div data-testid="segmented-control" role="tablist" aria-label={ariaLabel}>
      {options.map((o) => (
        <button
          key={o.value}
          role="tab"
          aria-selected={value === o.value}
          onClick={() => onChange?.(o.value)}
          data-value={o.value}
        >
          {o.label}
        </button>
      ))}
    </div>
  ),
  InfoTooltip: ({ text }: { text: string }) => (
    <span data-testid="info-tooltip" aria-label={text}>
      info
    </span>
  ),
}));

// --- Mock useAvailableModels ---
vi.mock(
  "@/app/(dashboard)/dashboard/translator/hooks/useAvailableModels",
  () => ({
    useAvailableModels: () => ({
      model: "gpt-4o",
      setModel: vi.fn(),
      availableModels: ["gpt-4o", "claude-sonnet-4-20250514"],
      loading: false,
      pickModelForFormat: () => "gpt-4o",
    }),
  })
);

// --- Mock exampleTemplates ---
vi.mock(
  "@/app/(dashboard)/dashboard/translator/exampleTemplates",
  () => ({
    FORMAT_OPTIONS: [
      { value: "openai", label: "OpenAI" },
      { value: "claude", label: "Claude" },
      { value: "gemini", label: "Gemini" },
    ],
    FORMAT_META: {
      openai: { label: "OpenAI", color: "emerald", icon: "smart_toy" },
      claude: { label: "Claude", color: "orange", icon: "psychology" },
      gemini: { label: "Gemini", color: "blue", icon: "auto_awesome" },
    },
    getExampleTemplates: () => [
      {
        id: "simple-chat",
        name: "Simple Chat",
        icon: "chat",
        description: "A simple chat example",
        formats: {
          openai: { model: "gpt-4o", messages: [{ role: "user", content: "Hello" }] },
          claude: { model: "claude-sonnet-4-20250514", messages: [{ role: "user", content: "Hello" }] },
        },
      },
      {
        id: "tool-calling",
        name: "Tool Calling",
        icon: "build",
        description: "Tool calling example",
        formats: {
          openai: { model: "gpt-4o", tools: [] },
        },
      },
    ],
  })
);

// --- Setup ---
const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

function makeProps(overrides: Partial<{
  source: FormatId;
  target: FormatId;
  provider: string;
  inputText: string;
  mode: TranslateMode;
  onSourceChange: (s: FormatId) => void;
  onTargetChange: (t: FormatId) => void;
  onProviderChange: (p: string) => void;
  onInputChange: (text: string) => void;
  onModeChange: (m: TranslateMode) => void;
  onSubmit: () => void;
  onOpenAdvanced: () => void;
  isLoading: boolean;
  providerOptions: Array<{ value: string; label: string }>;
  loading: boolean;
}> = {}) {
  return {
    source: "claude" as FormatId,
    target: "openai" as FormatId,
    provider: "openai",
    inputText: "",
    mode: "send" as TranslateMode,
    onSourceChange: vi.fn(),
    onTargetChange: vi.fn(),
    onProviderChange: vi.fn(),
    onInputChange: vi.fn(),
    onModeChange: vi.fn(),
    onSubmit: vi.fn(),
    onOpenAdvanced: vi.fn(),
    isLoading: false,
    providerOptions: [{ value: "openai", label: "OpenAI" }, { value: "anthropic", label: "Anthropic" }],
    loading: false,
    ...overrides,
  };
}

describe("SimpleControls", () => {
  beforeEach(() => {
    (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  it("exports a default function component", async () => {
    const mod = await import(
      "@/app/(dashboard)/dashboard/translator/components/SimpleControls"
    );
    expect(typeof mod.default).toBe("function");
  });

  it("renders smoke: mounts without throwing", async () => {
    const { default: SimpleControls } = await import(
      "@/app/(dashboard)/dashboard/translator/components/SimpleControls"
    );
    const container = makeContainer();
    const root = createRoot(container);
    const props = makeProps();
    await act(async () => {
      root.render(<SimpleControls {...props} />);
    });
    expect(container.innerHTML).not.toBe("");
  });

  it("renders 3 Select elements (source, provider, example) + 1 SegmentedControl", async () => {
    const { default: SimpleControls } = await import(
      "@/app/(dashboard)/dashboard/translator/components/SimpleControls"
    );
    const container = makeContainer();
    const root = createRoot(container);
    const props = makeProps();
    await act(async () => {
      root.render(<SimpleControls {...props} />);
    });
    const selects = container.querySelectorAll("[data-testid='select']");
    expect(selects.length).toBeGreaterThanOrEqual(3);
    const segmented = container.querySelectorAll("[data-testid='segmented-control']");
    expect(segmented.length).toBe(1);
  });

  it("renders the submit button", async () => {
    const { default: SimpleControls } = await import(
      "@/app/(dashboard)/dashboard/translator/components/SimpleControls"
    );
    const container = makeContainer();
    const root = createRoot(container);
    const props = makeProps({ inputText: "Hello" });
    await act(async () => {
      root.render(<SimpleControls {...props} />);
    });
    const buttons = container.querySelectorAll("[data-testid='button']");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("calls onSourceChange when source select changes", async () => {
    const { default: SimpleControls } = await import(
      "@/app/(dashboard)/dashboard/translator/components/SimpleControls"
    );
    const container = makeContainer();
    const root = createRoot(container);
    const onSourceChange = vi.fn();
    const props = makeProps({ onSourceChange });
    await act(async () => {
      root.render(<SimpleControls {...props} />);
    });
    // The first select is the source select (aria-label uses fallback "My app uses")
    const sourceSelect = container.querySelector("select[aria-label='My app uses']") as HTMLSelectElement | null;
    expect(sourceSelect).toBeTruthy();
    await act(async () => {
      if (sourceSelect) {
        Object.defineProperty(sourceSelect, "value", { writable: true, value: "openai" });
        sourceSelect.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
    expect(onSourceChange).toHaveBeenCalled();
  });

  it("calls onModeChange when segmented control tab is clicked", async () => {
    const { default: SimpleControls } = await import(
      "@/app/(dashboard)/dashboard/translator/components/SimpleControls"
    );
    const container = makeContainer();
    const root = createRoot(container);
    const onModeChange = vi.fn();
    const props = makeProps({ onModeChange, mode: "send" });
    await act(async () => {
      root.render(<SimpleControls {...props} />);
    });
    // Find the "preview" tab button in the segmented control
    const previewTab = container.querySelector(
      "[data-testid='segmented-control'] button[data-value='preview']"
    ) as HTMLButtonElement | null;
    expect(previewTab).toBeTruthy();
    await act(async () => {
      previewTab?.click();
    });
    expect(onModeChange).toHaveBeenCalledWith("preview");
  });

  it("calls onInputChange when textarea content changes", async () => {
    const { default: SimpleControls } = await import(
      "@/app/(dashboard)/dashboard/translator/components/SimpleControls"
    );
    const container = makeContainer();
    const root = createRoot(container);
    const onInputChange = vi.fn();
    const props = makeProps({ onInputChange });
    await act(async () => {
      root.render(<SimpleControls {...props} />);
    });
    const textarea = container.querySelector("textarea") as HTMLTextAreaElement | null;
    expect(textarea).toBeTruthy();
    await act(async () => {
      if (textarea) {
        Object.defineProperty(textarea, "value", { writable: true, value: "Hello world" });
        textarea.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
    expect(onInputChange).toHaveBeenCalled();
  });

  it("calls onOpenAdvanced when Advanced button is clicked", async () => {
    const { default: SimpleControls } = await import(
      "@/app/(dashboard)/dashboard/translator/components/SimpleControls"
    );
    const container = makeContainer();
    const root = createRoot(container);
    const onOpenAdvanced = vi.fn();
    const props = makeProps({ onOpenAdvanced });
    await act(async () => {
      root.render(<SimpleControls {...props} />);
    });
    // Find the Advanced button (has aria-label fallback "Advanced")
    const advancedBtn = container.querySelector(
      "button[aria-label='Advanced']"
    ) as HTMLButtonElement | null;
    expect(advancedBtn).toBeTruthy();
    await act(async () => {
      advancedBtn?.click();
    });
    expect(onOpenAdvanced).toHaveBeenCalled();
  });

  it("submit button is disabled when inputText is empty", async () => {
    const { default: SimpleControls } = await import(
      "@/app/(dashboard)/dashboard/translator/components/SimpleControls"
    );
    const container = makeContainer();
    const root = createRoot(container);
    const props = makeProps({ inputText: "" });
    await act(async () => {
      root.render(<SimpleControls {...props} />);
    });
    const submitBtn = container.querySelector(
      "[data-testid='button']"
    ) as HTMLButtonElement | null;
    expect(submitBtn?.disabled).toBe(true);
  });

  it("submit button is enabled when inputText has content", async () => {
    const { default: SimpleControls } = await import(
      "@/app/(dashboard)/dashboard/translator/components/SimpleControls"
    );
    const container = makeContainer();
    const root = createRoot(container);
    const props = makeProps({ inputText: "Hello" });
    await act(async () => {
      root.render(<SimpleControls {...props} />);
    });
    const submitBtn = container.querySelector(
      "[data-testid='button']"
    ) as HTMLButtonElement | null;
    expect(submitBtn?.disabled).toBe(false);
  });

  it("calls onOpenAdvanced when __custom__ example option is selected", async () => {
    const { default: SimpleControls } = await import(
      "@/app/(dashboard)/dashboard/translator/components/SimpleControls"
    );
    const container = makeContainer();
    const root = createRoot(container);
    const onOpenAdvanced = vi.fn();
    const props = makeProps({ onOpenAdvanced });
    await act(async () => {
      root.render(<SimpleControls {...props} />);
    });
    // The example select has a __custom__ option (aria-label uses fallback "Start with")
    const exampleSelect = container.querySelector(
      "select[aria-label='Start with']"
    ) as HTMLSelectElement | null;
    expect(exampleSelect).toBeTruthy();
    await act(async () => {
      if (exampleSelect) {
        Object.defineProperty(exampleSelect, "value", { writable: true, value: "__custom__" });
        exampleSelect.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });
    expect(onOpenAdvanced).toHaveBeenCalled();
  });
});
