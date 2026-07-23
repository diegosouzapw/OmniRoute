// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { vi } from "vitest";

vi.mock("remark-gfm", () => ({ default: () => {} }));
vi.mock("react-markdown", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="markdown-content">{children}</div>
  ),
}));

const { default: CompareColumn } = await import(
  "../../../src/app/(dashboard)/dashboard/playground/components/CompareColumn"
);

type ColumnStatus = "idle" | "streaming" | "done" | "error";

const BASE_METRICS = {
  ttftMs: null,
  totalMs: null,
  tokensIn: 0,
  tokensOut: 0,
  tps: null,
  costUsd: null,
};

function makeColumn(overrides: Partial<{
  id: string;
  model: string;
  status: ColumnStatus;
  metrics: typeof BASE_METRICS;
  response: string;
  errorMessage: string;
}> = {}) {
  return {
    id: "col-1",
    model: "openai/gpt-4o",
    status: "idle" as ColumnStatus,
    metrics: { ...BASE_METRICS },
    response: "",
    ...overrides,
  };
}

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function renderColumn(
  column: ReturnType<typeof makeColumn>,
  onCancel = vi.fn(),
  onRemove = vi.fn(),
): HTMLDivElement {
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(
      <CompareColumn column={column} onCancel={onCancel} onRemove={onRemove} />,
    );
  });
  containers.push({ root, el });
  return el;
}

beforeEach(() => {
  if (typeof Element.prototype.scrollIntoView === "undefined") {
    Object.defineProperty(Element.prototype, "scrollIntoView", {
      value: () => {},
      writable: true,
      configurable: true,
    });
  }
});

afterEach(() => {
  for (const { root, el } of containers) {
    act(() => root.unmount());
    el.remove();
  }
  containers.length = 0;
});

describe("CompareColumn", () => {
  it("renders model name in header", () => {
    const el = renderColumn(makeColumn({ model: "anthropic/claude-3-opus" }));
    expect(el.textContent).toContain("anthropic/claude-3-opus");
  });

  it("shows idle state with ready message", () => {
    const el = renderColumn(makeColumn({ status: "idle" }));
    expect(el.textContent).toContain("Ready to run");
  });

  it("shows streaming skeleton when status=streaming and response empty", () => {
    const el = renderColumn(makeColumn({ status: "streaming", response: "" }));
    expect(el.textContent).toContain("Waiting for response");
  });

  it("renders markdown response when streaming and response is non-empty", () => {
    const el = renderColumn(
      makeColumn({ status: "streaming", response: "Hello from model" }),
    );
    const markdown = el.querySelector("[data-testid='markdown-content']");
    expect(markdown).not.toBeNull();
    expect(markdown?.textContent).toContain("Hello from model");
  });

  it("shows error message when status=error", () => {
    const el = renderColumn(
      makeColumn({ status: "error", errorMessage: "Rate limit exceeded" }),
    );
    expect(el.textContent).toContain("Rate limit exceeded");
  });

  it("shows ProviderMetrics bar when streaming or done", () => {
    const metrics = {
      ttftMs: 234,
      totalMs: 1200,
      tokensIn: 142,
      tokensOut: 38,
      tps: 31.6,
      costUsd: 0.002,
    };
    const el = renderColumn(makeColumn({ status: "done", metrics, response: "Done." }));
    // Should show estimated
    expect(el.textContent).toContain("estimated");
    // Should show TTFT
    expect(el.textContent).toContain("TTFT");
  });

  it("calls onCancel when cancel button clicked during streaming", () => {
    const onCancel = vi.fn();
    const el = renderColumn(makeColumn({ status: "streaming" }), onCancel);
    const cancelBtn = el.querySelector("[aria-label='Cancel stream']") as HTMLButtonElement;
    expect(cancelBtn).not.toBeNull();
    act(() => cancelBtn.click());
    expect(onCancel).toHaveBeenCalledWith("col-1");
  });

  it("calls onRemove when remove button clicked", () => {
    const onRemove = vi.fn();
    const el = renderColumn(makeColumn(), vi.fn(), onRemove);
    const removeBtn = el.querySelector("[aria-label='Remove column for openai/gpt-4o']") as HTMLButtonElement;
    expect(removeBtn).not.toBeNull();
    act(() => removeBtn.click());
    expect(onRemove).toHaveBeenCalledWith("col-1");
  });

  it("updates metrics displayed when metrics change (TTFT after first chunk)", () => {
    const metricsWithTtft = { ...BASE_METRICS, ttftMs: 187 };
    const el = renderColumn(
      makeColumn({ status: "streaming", metrics: metricsWithTtft, response: "Hi" }),
    );
    expect(el.textContent).toContain("187ms");
  });
});
