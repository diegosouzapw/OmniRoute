// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { TranslateNarratedResult } from "@/app/(dashboard)/dashboard/translator/types";

// --- Mock next-intl ---
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string, params?: Record<string, string | number>) => {
    if (!params) return key;
    return Object.entries(params).reduce(
      (acc, [k, v]) => acc.replace(`{${k}}`, String(v)),
      key
    );
  },
}));

// --- Mock shared components ---
vi.mock("@/shared/components", () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
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
  }) => (
    <span data-testid="badge" data-variant={variant}>
      {children}
    </span>
  ),
  Button: ({
    children,
    onClick,
    "aria-label": ariaLabel,
  }: {
    children?: React.ReactNode;
    onClick?: () => void;
    "aria-label"?: string;
  }) => (
    <button data-testid="btn" onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  ),
}));

// --- Mock exampleTemplates (FORMAT_META) ---
vi.mock(
  "@/app/(dashboard)/dashboard/translator/exampleTemplates",
  () => ({
    FORMAT_META: {
      openai: { label: "OpenAI", color: "emerald", icon: "smart_toy" },
      claude: { label: "Claude", color: "orange", icon: "psychology" },
      gemini: { label: "Gemini", color: "blue", icon: "auto_awesome" },
    },
    FORMAT_OPTIONS: [],
    getExampleTemplates: () => [],
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

function idleResult(): TranslateNarratedResult {
  return {
    detected: null,
    target: "openai",
    status: "idle",
    responsePreview: null,
    translatedJson: null,
    pipelinePath: null,
    intermediateJson: null,
    errorMessage: null,
    latencyMs: null,
  };
}

describe("ResultNarrated", () => {
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
      "@/app/(dashboard)/dashboard/translator/components/ResultNarrated"
    );
    expect(typeof mod.default).toBe("function");
  });

  it("renders idle state without throwing", async () => {
    const { default: ResultNarrated } = await import(
      "@/app/(dashboard)/dashboard/translator/components/ResultNarrated"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <ResultNarrated
          result={idleResult()}
          onSeeTranslatedJson={vi.fn()}
          onSeePipeline={vi.fn()}
        />
      );
    });
    expect(container.querySelector("[data-testid='card']")).toBeTruthy();
  });

  it("idle state shows info icon", async () => {
    const { default: ResultNarrated } = await import(
      "@/app/(dashboard)/dashboard/translator/components/ResultNarrated"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <ResultNarrated
          result={idleResult()}
          onSeeTranslatedJson={vi.fn()}
          onSeePipeline={vi.fn()}
        />
      );
    });
    const icons = Array.from(container.querySelectorAll(".material-symbols-outlined")).map(
      (el) => el.textContent?.trim()
    );
    expect(icons).toContain("info");
  });

  it("translating state shows spinner and translating text", async () => {
    const { default: ResultNarrated } = await import(
      "@/app/(dashboard)/dashboard/translator/components/ResultNarrated"
    );
    const container = makeContainer();
    const root = createRoot(container);
    const result: TranslateNarratedResult = { ...idleResult(), status: "translating", target: "gemini" };
    await act(async () => {
      root.render(
        <ResultNarrated result={result} onSeeTranslatedJson={vi.fn()} onSeePipeline={vi.fn()} />
      );
    });
    const icons = Array.from(container.querySelectorAll(".material-symbols-outlined")).map(
      (el) => el.textContent?.trim()
    );
    expect(icons).toContain("progress_activity");
    // Text should contain the i18n key with Gemini substituted
    expect(container.textContent).toContain("Gemini");
  });

  it("sending state shows spinner and sending text", async () => {
    const { default: ResultNarrated } = await import(
      "@/app/(dashboard)/dashboard/translator/components/ResultNarrated"
    );
    const container = makeContainer();
    const root = createRoot(container);
    const result: TranslateNarratedResult = { ...idleResult(), status: "sending", target: "openai" };
    await act(async () => {
      root.render(
        <ResultNarrated result={result} onSeeTranslatedJson={vi.fn()} onSeePipeline={vi.fn()} />
      );
    });
    const icons = Array.from(container.querySelectorAll(".material-symbols-outlined")).map(
      (el) => el.textContent?.trim()
    );
    expect(icons).toContain("progress_activity");
    expect(container.textContent).toContain("OpenAI");
  });

  it("ok state shows success badge + narrated text + see pipeline button", async () => {
    const { default: ResultNarrated } = await import(
      "@/app/(dashboard)/dashboard/translator/components/ResultNarrated"
    );
    const container = makeContainer();
    const root = createRoot(container);
    const result: TranslateNarratedResult = {
      ...idleResult(),
      status: "ok",
      detected: "claude",
      target: "openai",
      latencyMs: 150,
      translatedJson: '{"model":"gpt-4o"}',
      responsePreview: "data: Hello",
    };
    await act(async () => {
      root.render(
        <ResultNarrated result={result} onSeeTranslatedJson={vi.fn()} onSeePipeline={vi.fn()} />
      );
    });
    // Success badge should be present
    const successBadge = container.querySelector("[data-testid='badge'][data-variant='success']");
    expect(successBadge).toBeTruthy();
    // Should contain detected format label
    expect(container.textContent).toContain("Claude");
    // See pipeline button must be present
    const btns = Array.from(container.querySelectorAll("[data-testid='btn']"));
    expect(btns.some((b) => b.getAttribute("aria-label")?.includes("pipeline"))).toBe(true);
  });

  it("ok state: 'see translated JSON' button calls onSeeTranslatedJson", async () => {
    const { default: ResultNarrated } = await import(
      "@/app/(dashboard)/dashboard/translator/components/ResultNarrated"
    );
    const container = makeContainer();
    const root = createRoot(container);
    const onSeeTranslatedJson = vi.fn();
    const result: TranslateNarratedResult = {
      ...idleResult(),
      status: "ok",
      detected: "claude",
      target: "openai",
      latencyMs: 200,
      translatedJson: '{"model":"gpt-4o"}',
      responsePreview: null,
    };
    await act(async () => {
      root.render(
        <ResultNarrated
          result={result}
          onSeeTranslatedJson={onSeeTranslatedJson}
          onSeePipeline={vi.fn()}
        />
      );
    });
    const jsonBtn = container.querySelector(
      "[data-testid='btn'][aria-label*='JSON'], [data-testid='btn'][aria-label*='json']"
    ) as HTMLButtonElement | null;
    expect(jsonBtn).toBeTruthy();
    await act(async () => {
      jsonBtn?.click();
    });
    expect(onSeeTranslatedJson).toHaveBeenCalled();
  });

  it("ok state: 'see pipeline' button calls onSeePipeline", async () => {
    const { default: ResultNarrated } = await import(
      "@/app/(dashboard)/dashboard/translator/components/ResultNarrated"
    );
    const container = makeContainer();
    const root = createRoot(container);
    const onSeePipeline = vi.fn();
    const result: TranslateNarratedResult = {
      ...idleResult(),
      status: "ok",
      detected: "openai",
      target: "gemini",
      latencyMs: 100,
      translatedJson: null,
      responsePreview: null,
    };
    await act(async () => {
      root.render(
        <ResultNarrated
          result={result}
          onSeeTranslatedJson={vi.fn()}
          onSeePipeline={onSeePipeline}
        />
      );
    });
    const pipelineBtn = container.querySelector(
      "[data-testid='btn'][aria-label*='pipeline']"
    ) as HTMLButtonElement | null;
    expect(pipelineBtn).toBeTruthy();
    await act(async () => {
      pipelineBtn?.click();
    });
    expect(onSeePipeline).toHaveBeenCalled();
  });

  it("error state shows error badge", async () => {
    const { default: ResultNarrated } = await import(
      "@/app/(dashboard)/dashboard/translator/components/ResultNarrated"
    );
    const container = makeContainer();
    const root = createRoot(container);
    const result: TranslateNarratedResult = {
      ...idleResult(),
      status: "error",
      errorMessage: "Connection refused",
    };
    await act(async () => {
      root.render(
        <ResultNarrated result={result} onSeeTranslatedJson={vi.fn()} onSeePipeline={vi.fn()} />
      );
    });
    const errorBadge = container.querySelector("[data-testid='badge'][data-variant='error']");
    expect(errorBadge).toBeTruthy();
  });

  it("SECURITY: error state with fake stack trace does NOT expose 'at /' in rendered text", async () => {
    const { default: ResultNarrated } = await import(
      "@/app/(dashboard)/dashboard/translator/components/ResultNarrated"
    );
    const container = makeContainer();
    const root = createRoot(container);
    // Simulate a message that already has trace-like content (belt-and-suspenders test)
    const result: TranslateNarratedResult = {
      ...idleResult(),
      status: "error",
      errorMessage: "fake stack at /home/x.ts:1",
    };
    await act(async () => {
      root.render(
        <ResultNarrated result={result} onSeeTranslatedJson={vi.fn()} onSeePipeline={vi.fn()} />
      );
    });
    const textContent = container.textContent ?? "";
    // The safeErrorMessage function strips "at /path" patterns
    expect(textContent).not.toMatch(/\bat\s\//);
  });

  it("SECURITY: error state does NOT leak Bearer tokens", async () => {
    const { default: ResultNarrated } = await import(
      "@/app/(dashboard)/dashboard/translator/components/ResultNarrated"
    );
    const container = makeContainer();
    const root = createRoot(container);
    const result: TranslateNarratedResult = {
      ...idleResult(),
      status: "error",
      errorMessage: "Unauthorized: Bearer sk-abc123XYZ456abcdef12",
    };
    await act(async () => {
      root.render(
        <ResultNarrated result={result} onSeeTranslatedJson={vi.fn()} onSeePipeline={vi.fn()} />
      );
    });
    const textContent = container.textContent ?? "";
    expect(textContent).not.toMatch(/sk-[A-Za-z0-9_-]{16,}/);
    expect(textContent).toContain("[REDACTED]");
  });

  it("aria-live='polite' container is present for screen-reader announcements (D20)", async () => {
    const { default: ResultNarrated } = await import(
      "@/app/(dashboard)/dashboard/translator/components/ResultNarrated"
    );
    const container = makeContainer();
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <ResultNarrated
          result={idleResult()}
          onSeeTranslatedJson={vi.fn()}
          onSeePipeline={vi.fn()}
        />
      );
    });
    const liveRegion = container.querySelector("[aria-live='polite']");
    expect(liveRegion).toBeTruthy();
  });
});
