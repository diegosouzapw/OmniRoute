// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Minimal i18n stub
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

// Monaco Editor stub — renders a simple textarea with data attributes
vi.mock("@/shared/components/MonacoEditor", () => ({
  default: ({
    value,
    onChange,
    options,
  }: {
    value?: string;
    onChange?: (v: string) => void;
    options?: { readOnly?: boolean };
  }) => (
    <textarea
      data-testid="monaco-editor"
      data-readonly={options?.readOnly ? "true" : "false"}
      value={value ?? ""}
      readOnly={options?.readOnly}
      onChange={(e) => onChange?.(e.target.value)}
    />
  ),
}));

// Collapsible stub — renders children directly (always open in tests)
vi.mock("@/shared/components/Collapsible", () => ({
  default: ({
    children,
    title,
    subtitle,
    icon,
  }: {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    icon?: string;
  }) => (
    <div data-testid="collapsible" data-title={title} data-subtitle={subtitle} data-icon={icon}>
      {children}
    </div>
  ),
}));

// Shared component stubs
vi.mock("@/shared/components", () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
  Button: ({
    children,
    onClick,
    disabled,
    loading,
    icon,
  }: {
    children?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    icon?: string;
  }) => (
    <button
      type="button"
      data-testid="button"
      data-icon={icon}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {children}
    </button>
  ),
  Select: ({
    value,
    onChange,
    options,
  }: {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: Array<{ value: string; label: string }>;
    className?: string;
  }) => (
    <select data-testid="select" value={value} onChange={onChange}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
  Badge: ({ children, variant }: { children: React.ReactNode; variant?: string; size?: string; icon?: string; dot?: boolean }) => (
    <span data-testid="badge" data-variant={variant}>
      {children}
    </span>
  ),
}));

// exampleTemplates stub
vi.mock(
  "@/app/(dashboard)/dashboard/translator/exampleTemplates",
  () => ({
    getExampleTemplates: () => [
      {
        id: "simple-chat",
        name: "Simple Chat",
        icon: "chat",
        description: "Simple chat template",
        formats: {
          openai: { model: "gpt-4o", messages: [{ role: "user", content: "Hello" }] },
          claude: {
            model: "claude-sonnet-4-20250514",
            messages: [{ role: "user", content: "Hello" }],
          },
        },
      },
    ],
    FORMAT_META: {
      openai: { label: "OpenAI", color: "blue", icon: "psychology" },
      claude: { label: "Claude", color: "amber", icon: "auto_awesome" },
      gemini: { label: "Gemini", color: "green", icon: "smart_toy" },
    },
    FORMAT_OPTIONS: [
      { value: "openai", label: "OpenAI" },
      { value: "claude", label: "Claude" },
      { value: "gemini", label: "Gemini" },
    ],
  }),
);

const cleanupCallbacks: Array<() => void> = [];

function makeContainer(): HTMLElement {
  const container = document.createElement("div");
  document.body.appendChild(container);
  cleanupCallbacks.push(() => container.remove());
  return container;
}

describe("RawJsonPanel", () => {
  beforeEach(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    vi.resetAllMocks();
  });

  afterEach(() => {
    while (cleanupCallbacks.length > 0) cleanupCallbacks.pop()?.();
    document.body.innerHTML = "";
  });

  it("exports a default function component", async () => {
    const mod = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/RawJsonPanel"
    );
    expect(typeof mod.default).toBe("function");
  });

  it("renders Collapsible wrapper with correct icon", async () => {
    const { default: RawJsonPanel } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/RawJsonPanel"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<RawJsonPanel />);
    });
    const collapsible = container.querySelector("[data-testid='collapsible']");
    expect(collapsible).toBeTruthy();
    expect(collapsible?.getAttribute("data-icon")).toBe("code");
  });

  it("lazy-render: content mounts when defaultOpen=true", async () => {
    const { default: RawJsonPanel } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/RawJsonPanel"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<RawJsonPanel defaultOpen={true} />);
    });
    // Monaco editors should be rendered
    const editors = container.querySelectorAll("[data-testid='monaco-editor']");
    expect(editors.length).toBeGreaterThanOrEqual(2); // input + output
  });

  it("lazy-render: content mounts when forceOpen=true", async () => {
    const { default: RawJsonPanel } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/RawJsonPanel"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<RawJsonPanel forceOpen={true} />);
    });
    const editors = container.querySelectorAll("[data-testid='monaco-editor']");
    expect(editors.length).toBeGreaterThanOrEqual(2);
  });

  it("renders two format selects (source and target)", async () => {
    const { default: RawJsonPanel } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/RawJsonPanel"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<RawJsonPanel defaultOpen={true} />);
    });
    const selects = container.querySelectorAll("[data-testid='select']");
    expect(selects.length).toBeGreaterThanOrEqual(2);
  });

  it("renders the translate button", async () => {
    const { default: RawJsonPanel } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/RawJsonPanel"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<RawJsonPanel defaultOpen={true} />);
    });
    const buttons = container.querySelectorAll("[data-testid='button']");
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it("renders example templates grid", async () => {
    const { default: RawJsonPanel } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/RawJsonPanel"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<RawJsonPanel defaultOpen={true} />);
    });
    // The template "Simple Chat" should appear
    const text = container.textContent ?? "";
    expect(text).toContain("Simple Chat");
  });

  it("translate button calls /api/translator/translate on click", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, result: { model: "gpt-4o" } }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const { default: RawJsonPanel } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/RawJsonPanel"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<RawJsonPanel defaultOpen={true} />);
    });

    // Type valid JSON into the input Monaco editor
    const editors = container.querySelectorAll<HTMLTextAreaElement>("[data-testid='monaco-editor']");
    const inputEditor = editors[0]; // first editor is input
    await act(async () => {
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        "value",
      )?.set;
      nativeInputValueSetter?.call(inputEditor, '{"model":"gpt-4o","messages":[]}');
      inputEditor.dispatchEvent(new Event("change", { bubbles: true }));
    });

    // Click translate button
    const translateBtn = Array.from(
      container.querySelectorAll<HTMLButtonElement>("[data-testid='button']"),
    ).find((b) => !b.disabled);

    if (translateBtn) {
      await act(async () => {
        translateBtn.click();
      });
    }

    // fetch should have been called (detect or translate)
    // Note: auto-detect fires after 600ms debounce, translate fires immediately
    expect(mockFetch).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  it("error path: error response does not contain stack trace", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: false,
        error: "Translation failed\n    at Object.<anonymous> (/src/translator.ts:42:5)",
      }),
    });
    vi.stubGlobal("fetch", mockFetch);

    const { default: RawJsonPanel } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/RawJsonPanel"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<RawJsonPanel defaultOpen={true} />);
    });

    // Type valid JSON and trigger translate
    const editors = container.querySelectorAll<HTMLTextAreaElement>("[data-testid='monaco-editor']");
    const inputEditor = editors[0];
    await act(async () => {
      const setter = Object.getOwnPropertyDescriptor(
        window.HTMLTextAreaElement.prototype,
        "value",
      )?.set;
      setter?.call(inputEditor, '{"model":"gpt-4o","messages":[]}');
      inputEditor.dispatchEvent(new Event("change", { bubbles: true }));
    });

    const translateBtn = Array.from(
      container.querySelectorAll<HTMLButtonElement>("[data-testid='button']"),
    ).find((b) => !b.disabled);

    if (translateBtn) {
      await act(async () => {
        translateBtn.click();
      });
    }

    // The rendered error text must NOT include a stack-trace line
    const errorBanner = container.querySelector("[data-testid='card']");
    const displayedText = container.textContent ?? "";
    expect(displayedText).not.toMatch(/\s+at\s+[A-Za-z]/);
    vi.unstubAllGlobals();
  });

  it("swap formats button is rendered", async () => {
    const { default: RawJsonPanel } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/RawJsonPanel"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<RawJsonPanel defaultOpen={true} />);
    });
    // Swap button has title/aria-label
    const swapBtn = container.querySelector("button[title]");
    // There should be at least one swap_horiz icon
    const icons = container.querySelectorAll(".material-symbols-outlined");
    const iconTexts = Array.from(icons).map((el) => el.textContent?.trim());
    expect(iconTexts).toContain("swap_horiz");
  });

  it("onOpenChange fires when component mounts open", async () => {
    const onOpenChange = vi.fn();
    const { default: RawJsonPanel } = await import(
      "@/app/(dashboard)/dashboard/translator/components/advanced/RawJsonPanel"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(<RawJsonPanel forceOpen={true} onOpenChange={onOpenChange} />);
    });
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
